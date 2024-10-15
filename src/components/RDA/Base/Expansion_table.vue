<template>

  <div class="expand_table_wrapper" style="position:relative;">
    <q-table
      :title="title" :rows="rows" :columns="columns"
      :row-key="row_key"
      :hide-bottom="true"
      :rows-per-page-options="row_per_page"
      v-model:pagination="pagination"
    >

      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th auto-width />
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
        <q-tr :props="props">
          <q-td auto-width>
            <!-- <q-btn v-if="(props.rowIndex+1) < rows.length" size="sm" style="background-color:#58cf54;color:white;" round dense @click="props.expand = !props.expand" :icon="props.expand ? 'remove' : 'add'" /> -->
            <q-btn :disabled="props.row.loading" size="sm" style="background-color:#58cf54;color:white;" round dense @click="props.expand = !props.expand;handleClickExpand(props);" :icon="props.expand ? 'remove' : 'add'" />
          </q-td>
          <q-td
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
          <!-- {{rows.length}}
          {{props.rowIndex}} -->
            {{ col.value }}
          </q-td>
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

        <q-tr style="background-color:#ededed;" v-show="props.expand" :props="props" v-for="(row,row_header) in props.row.json_expand"
        :key="row_header">

          <template v-if="props.row.loading">
            <q-td v-if="row_header == 0" :colspan="columns.length + 1">
              <q-inner-loading :showing="true">
                <q-spinner-gears size="50px" color="primary" />
              </q-inner-loading>
            </q-td>
          </template>

          <template v-else>

            <q-td auto-width>
            </q-td>

            <q-td
              v-for="(col,header, index) in row"
              :key="header"
              :class="props.cols[index].__thClass"
            >
            <!-- {{col}} -->
              <span v-if="props.cols[index].format_child" :class="col < 0 ? 'font_red':''" >{{$plugins_formatAmount(col,props.cols[index].format_child)}}</span>
              <span v-else>{{col}}</span>
            </q-td>

          </template>

          

        </q-tr>

      </template>

      <template v-slot:bottom-row v-if="table_footer">

        <q-tr :class="['table_footer', table_footer_two ? 'extra_row_added' : '']">
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

        <q-tr class="table_footer2 extra_row_added" v-if="table_footer_two">
          <!-- <q-td colspan="100%">
              Bottom row
              {{table_footer}}
          </q-td> -->
          <q-td >
          </q-td>

          <q-td :style="'text-align:'+table_footer_details.align+';'" :class="table_footer_details.classes" :key="table_footer_details" v-for="table_footer_details in table_footer_two">
              {{table_footer_details.value}}
          </q-td>
        </q-tr>

        
      </template>

    </q-table>
    <Loading :loading="loading" />
  </div>

</template>

<script>
import Loading from 'src/components/Base/Loading';

export default {
    data(){
      return{
        columns: this.table_column,
        rows: this.table_data,
        row_key: "",
        loading: true,
        row_per_page: [0],
        pagination: {
          sortBy: '',
          descending: '',
          page: 1,
          // rowsPerPage: 5,
          rowsPerPage: 0,
          rowsNumber: 0
        },
      }
    },
    props: ['title', 'table_column', 'table_data',"forceLoading","table_footer","table_footer_two","table_data_month_show_date_change"],
    components: {
      Loading
    },
    created() {
    },
    computed: {
      columns_rows() {
        return [this.columns && this.rows];
      },
    },
    methods: {
      handleClickExpand(payload)
      {
        this.$nextTick(()=>{
          this.$emit("receiveClickExpand",payload);
        });
      }
    },
    watch:{
      table_column(newVal)
      {
        this.columns = newVal;
        this.row_key = newVal.length > 0 ? newVal[0].name : '';
      },
      table_data(newVal){
        this.rows = newVal;
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
      },
      table_data_month_show_date_change(newVal)
      {

        var pass_key = newVal.pass_key;
        if(newVal[0])
        {
          var value = newVal[0][pass_key];
          console.log(value)
          this.rows.filter((entry)=>{
            return entry[pass_key] == value;
          })[0].json_expand = newVal[0].json_expand;
        }
        else
        {
          // this.rows.filter((entry)=>{
          //   return entry[pass_key] == value;
          // })[0].json_expand = [];

          // this.rows = {
          //   0: {
          //     json_expand: [],
          //   }
          // }
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

.table_footer2
{
  font-weight: bold;
  background-color: #ededed;
}
</style>