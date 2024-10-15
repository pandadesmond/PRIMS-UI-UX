<template>

  <div class="q-pa-md table_wrapper expand_table_wrapper" style="position:relative;">
    <q-table separator="cell"
      :flat="flat_status" :bordered="bordered_status"
      :title="title" :rows="rows" :columns="columns"
      :row-key="row_key"
      @request="onRequest"
      :filter="filter"
      v-model:pagination="pagination"
      binary-state-sort
      :loading="loading"
      :rows-per-page-options="[15,30,50,100,0]"
    >

      <template v-slot:header="props">
        <q-tr :props="props">
          <!-- <q-th auto-width /> -->
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            <q-tooltip v-if="col.tooltip"  anchor="top middle" self="center middle" style="font-size: 13px;">
              {{ col.tooltip }}
            </q-tooltip>
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props"  style="cursor: pointer;">
          <!-- <q-td auto-width>
            <q-btn  size="sm" style="background-color:#58cf54;color:white;" round dense @click="props.expand = !props.expand" :icon="props.expand ? 'remove' : 'add'" />
          </q-td> -->

          <template
          v-for="col in props.cols"
          :key="col.name"
          :props="props"
          >

          <q-td v-if="col.name == 'alert_status' "
            :test="JSON.stringify(props)"
            :style="col.name == 'job_status' ? `background-color:${props.row.status_color}` : '' "
          >

            <span v-if="col.value == '0'">
              <b>-</b>
            </span>

            <span v-if="col.value == '1' && permission.includes('NT1AB')">
              <Button_icon  :icon="'edit_note'" :color="'#094161'" :outline="false" size="12px" v-on:click="handleAcknowledge(props.row)" class="q-mr-sm" />
              <b>First Sent</b>
            </span>

            <span v-if="col.value == '2'">
              <b>Acknowledged</b>
            </span>

            <span v-if="col.value == '3' && permission.includes('NT2AB')">
              <Button_icon :icon="'edit_note'" :color="'#094161'" :outline="false" size="12px" v-on:click="handleAcknowledge(props.row)" class="q-mr-sm" />
              <b>Second Sent</b>
            </span>

            <span v-if="col.value == '4'">
               <b>Acknowledged</b>
            </span>


          </q-td>

          <q-td v-else @click="props.expand = !props.expand"
            :style="[col.name == 'job_status' ? `background-color:${props.row.status_color}` : '', col.style ]"
          >
            {{col.value}}
          </q-td>

          </template>

        </q-tr>

        <!-- <q-tr v-show="props.expand" :props="props" >
          <q-td auto-width>
          </q-td>
          <q-td
            v-for="(col,header) in props.row.json_expand[0]"
            :key="col.name"
            :class="props.colsMap[header].__thClass"
          >
            {{ col }}
          </q-td>
        </q-tr> -->

        <q-tr v-show="props.expand" :props="props" v-if="props.row.json_column"
        :key="row_header">

          <!-- <q-td auto-width>
          </q-td> -->

          <q-td
            colspan="100%"
          >
            <table style="width: 100%;border: 1px solid #094161;padding: 10px;"  cellspacing="0" cellpadding="0">
                <thead>
                    <tr v-show="props.expand" :props="props">
                        <th
                            v-for="(col,header, index) in props.row.json_column"
                            :key="index"
                            :style="[`text-align:${col.align}`, col.style]"
                            class="theme_color"
                        >
                            <span>{{col.label}}</span>
                        </th>

                    </tr>
                </thead>
                <tbody>
                    <tr v-show="props.expand" :props="props" v-for="(row,row_header) in props.row.json_expand"
                    :key="row_header">
                        <td
                            v-for="(col,header, index) in row"
                            :key="header"
                            :style="[`text-align:${props.row.json_column[index].align}`, 'border: 1px solid #e0e0e0;']"
                        >
                            <span v-if="header=='map'" :class="col < 0 ? 'font_red':''" >
                              <q-icon name="map" style="color:#094161;font-size: 30px;cursor: pointer;" @click="handleMapClick(row)"></q-icon>
                            </span>
                            <span v-else>{{col}}</span>
                        </td>

                    </tr>
                </tbody>
            </table>
          </q-td>

        </q-tr>


        <!-- <q-tr style="background-color:#ededed;" v-show="props.expand" :props="props" v-for="(row,row_header) in props.row.json_expand"
        :key="row_header">

          <q-td auto-width>
          </q-td>

          <q-td
            v-for="(col,header, index) in row"
            :key="header"
            :class="props.cols[index].__thClass"
          >

            <span v-if="props.cols[index].format_child" :class="col < 0 ? 'font_red':''" >{{$plugins_formatAmount(col,props.cols[index].format_child)}}</span>
            <span v-else>{{col}}</span>
          </q-td>

        </q-tr> -->

      </template>

      <template v-slot:bottom-row v-if="table_footer">
            <q-tr class="table_footer">
                <!-- <q-td colspan="100%">
                    Bottom row
                    {{table_footer}}
                </q-td> -->
                <q-td >
                </q-td>

                <q-td :style="'text-align:'+table_footer_details.align+';'" :class="table_footer_details.classes" :key="table_footer_details" v-for="table_footer_details in table_footer">
                    {{table_footer_details.value}}
                </q-td>

            </q-tr>
        </template>

    </q-table>
    <!-- <Loading :loading="loading" /> -->
  </div>

</template>

<script>
// import Loading from 'src/components/Base/Loading';
import Button_icon from 'src/components/HONDA/Base/Button_icon'

export default {
    data(){
      return{
        columns: this.table_column,
        rows: this.table_data,
        row_key: "",
        loading: true,
        filter:"",
        pagination: {
          sortBy: '',
          descending: '',
          page: 1,
          rowsPerPage: 15,
          rowsNumber: 0
        },
        permission: sessionStorage.getItem("permission") != "" && sessionStorage.getItem("permission") != "null" && sessionStorage.getItem("permission") != null ? sessionStorage.getItem("permission").split(',') : [],
      }
    },
    props: ['title', 'table_column', 'table_data',"forceLoading","table_footer","flat_status","bordered_status","pass_row_key"],
    components: {
    //   Loading
      Button_icon,
    },
    created() {
    },
    computed: {
      columns_rows() {
        return [this.columns && this.rows];
      },
    },
    mounted(){
      this.onRequest({
        pagination: this.pagination,
        filter: undefined
      })
    },
    methods: {
        handleAcknowledge(props)
        {
          this.$emit('receiveAcknowledgeClick', props);
        },
        handleTableRowClick()
        {
            alert('Table Row Click')
        },
        handleMapClick(json)
        {
          this.$emit('receiveMapClick',json);
        },
        onRequest (props) {
          // console.log(props);
          this.$emit("receiveRequestTable",props);

          this.pagination.sortBy = props.pagination.sortBy;
          this.pagination.descending = props.pagination.descending;
          this.pagination.page = props.pagination.page;
          this.pagination.rowsPerPage = props.pagination.rowsPerPage;
          this.loading = true
        },
    },
    watch:{
      table_column(newVal)
      {
        this.columns = newVal;
        if(this.pass_row_key)
        {
          this.row_key = this.pass_row_key;
        }
        else
        {
          this.row_key = newVal[0].name;
        }

      },
      table_data(newVal){
        // this.rows = newVal;
        // this.loading = false;

        this.rows = newVal.data.results;
        this.pagination.rowsNumber = newVal.data.count;
        this.loading = false;

      },
      columns_rows()
      {
        var _this = this;
        setTimeout(function(){
          _this.loading = false;
        },150);
      },
      forceLoading(newVal)
      {
        if(newVal)
        {
          this.loading = true;
        }
      }
    }
}
</script>

<style scoped>
.table_footer
{
  font-weight: bold;
  background-color: #ededed;
}

* >>> thead
{
    background-color: #dee1e6;
}

* >>> tr, * >>> td
{
    height: 35px !important;
}

* >>> .q-table__container
{
    padding: 10px;
}

* >>> .q-table__bottom
{
   padding: 0px;
   height: 35px !important;
   min-height: 35px !important;
}

</style>
