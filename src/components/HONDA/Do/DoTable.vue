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
      :rows-per-page-options="row_per_page"
    >

      <template v-slot:header="props">
        <q-tr :props="props">
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
        <q-tr :props="props" @click="props.expand = !props.expand" :class="[props.row.alert ? 'alerts_border' : '']" :style="[props.row.alert ? 'background-color:orange;' : (props.row.expired ? 'background-color:orange;' : '') ]">
          <!-- <q-td auto-width>
            <q-btn  size="sm" style="background-color:#58cf54;color:white;" round dense @click="props.expand = !props.expand" :icon="props.expand ? 'remove' : 'add'" />
          </q-td> -->
          <template :props="props" v-for="col in props.cols" :key="col.name">


          <q-td v-if="col.name == 'action'"
          :test="JSON.stringify(props)"
          :style="[col.name == 'job_status' ? `background-color:${props.row.status_color}` : ''] "
          >
            <q-btn icon="edit" color="primary" dense ripple class="q-mr-sm" v-on:click="handleEdit(props)"
               v-if="permission.includes('EDAD') " :disable="props.row.total_qty_balance <= '0' ? true : false">
               <!-- @click.stop="btnclick" -->
               <!-- v-if="permission.includes('PRT') " -->
                  <q-tooltip>
                      Edit
                  </q-tooltip>
              </q-btn>

          </q-td>

          <q-td v-else-if="col.name == 'export'"
          :test="JSON.stringify(props)"
          :style="[col.name == 'job_status' ? `background-color:${props.row.status_color}` : ''] "
          >
            <q-checkbox v-if="permission.includes('EDDO') "
              v-model="props.row.export"
            />
          </q-td>

          <q-td v-else
          :test="JSON.stringify(props)"
          :style="[col.name == 'job_status' ? `background-color:${props.row.status_color}` : '', `text-align:${col.align}`] "
          >
            {{ col.value }}
          </q-td>


          </template>
        </q-tr>

        <!-- <q-tr v-show="props.expand" :props="props" v-if="props.row.json_column"
        :key="row_header">

          <q-td
            colspan="100%"
          >
            <table style="width: 100%;border: 1px solid #094161;padding: 10px;"  cellspacing="0" cellpadding="0">
                <thead>
                    <tr v-show="props.expand" :props="props">
                        <th
                            v-for="(col,header, index) in props.row.json_column"
                            :key="index"
                            :style="`text-align:${col.align}`"
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
                            :style="`text-align:${props.row.json_column[index].align}`"
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

        </q-tr> -->

      </template>

      <template v-slot:bottom-row v-if="table_footer">
            <q-tr class="table_footer">
                <q-td >
                </q-td>

                <q-td :style="'text-align:'+table_footer_details.align+';'" :class="table_footer_details.classes" :key="table_footer_details" v-for="table_footer_details in table_footer">
                    {{table_footer_details.value}}
                </q-td>

            </q-tr>
        </template>

    </q-table>
  </div>

</template>

<script>
// import Loading from 'src/components/Base/Loading';

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
          // rowsPerPage: 5,
          rowsPerPage: this.row_per_page[0] === undefined ? this.row_per_page : this.row_per_page[0],
          rowsNumber: 0
        },
        permission: sessionStorage.getItem("permission") != "" && sessionStorage.getItem("permission") != "null" && sessionStorage.getItem("permission") != null ? sessionStorage.getItem("permission").split(',') : [],
      }
    },
    props: ['title', 'table_column', 'table_data',"forceLoading","table_footer","flat_status","bordered_status","pass_row_key","row_per_page"],
    components: {
    //   Loading
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
        handleEdit(props)
        {
          this.$emit('receiveClickEdit',props);
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

.alerts_border {
    animation: blink 1s;
    animation-iteration-count: infinite;
}

@keyframes blink { 50% { background-color:#fff ; }  }

</style>
