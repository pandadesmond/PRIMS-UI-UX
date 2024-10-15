<template>
<div class="q-pa-md table_wrapper">
      <template v-if="permission.includes('EPUM')">
      <div class="row justify-end" style="padding-bottom: 10px;" >
      <q-btn
        v-if="export_button"
        color="primary"
        icon-right="archive"
        label="Export"
        no-caps
        @click="exportTable"
      />
      </div>
    </template>
  <q-table separator="cell" :flat="flat_status" :bordered="bordered_status" class="main_table" :title="title" :row_per_page="row_per_page"
  :rows="rows" :columns="columns" rows-per-page-label="Entries" :pagination-label="getPaginationLabel"
  :rows-per-page-options="row_per_page"
  :row-key="row_key"
  @request="onRequest"
    :filter="filter"
    v-model:pagination="pagination"
    binary-state-sort
    :loading="loading"
  >

    <template v-slot:header="props">
        <q-tr :props="props">
        <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
        >
            <q-tooltip v-if="col.tooltip" anchor="top middle" self="center middle" style="font-size: 13px;">
            {{ col.tooltip }}
            </q-tooltip>
            {{ col.label }}
        </q-th>
        </q-tr>
    </template>
    <template v-slot:body-cell-action="props">
        <q-td>
            <Button_icon :icon="'edit_note'" :color="'#094161'" :outline="false" size="12px" v-on:click="action(props.row)" v-if="action_button" class="q-mr-sm" />

            <q-btn icon="visibility" color="primary" dense outline ripple class="q-mr-sm" v-on:click="edit(props.row)"
            v-if="edit_button">
                <q-tooltip>
                    Edit
                </q-tooltip>
            </q-btn>

            <q-btn icon="view_list" color="positive" dense outline ripple class="q-mr-sm" v-on:click="list(props.row)"
            v-if="view_button">
                <q-tooltip>
                    View
                </q-tooltip>
            </q-btn>

            <Button_icon :icon="'delete'" :color="'negative'" :outline="false" size="12px" v-on:click="remove(props.row)" v-if="delete_button" class="q-mr-sm" />
        </q-td>
    </template>

    <template v-slot:body-cell-active="props">
        <q-td :style="`text-align:${props.col.align}`">
          <Toggle
            :pass_disabled="true"
            :pass_value="props.row.active"
            label=""
            v-on:receiveToggleChange="handleToggleChange" />
        </q-td>
    </template>

    <template v-slot:body-cell-first_lv_pic="props">
        <q-td :style="`text-align:${props.col.align}`">
          <!-- <Toggle
            :pass_disabled="true"
            :pass_value="props.row.first_lv_pic"
            label=""
            v-on:receiveToggleChange="handleToggleChange" /> -->
             <Checkbox :no_label="true" disable :readonly="true" v-on:receiveChange="handleChangeModuleFunctionValue" v-model="props.row.first_lv_pic" />
        </q-td>
    </template>

    <template v-slot:body-cell-second_lv_pic="props">
        <q-td :style="`text-align:${props.col.align}`">
          <!-- <Toggle
            :pass_disabled="true"
            :pass_value="props.row.second_lv_pic"
            label=""
            v-on:receiveToggleChange="handleToggleChange" /> -->
            <Checkbox :no_label="true" disable :readonly="true" v-on:receiveChange="handleChangeModuleFunctionValue" v-model="props.row.second_lv_pic" />
        </q-td>
    </template>

    <template v-slot:body-cell-status="props">
        <q-td :style="`text-align:${props.col.align}`">
          <Toggle
            :pass_value="props.row.status"
            label=""
            v-on:receiveToggleChange="handleToggleChange" />
        </q-td>
    </template>
  </q-table>
</div>
</template>

<script>
import Checkbox from 'src/components/HONDA/Base/Checkbox';
import Button_icon from 'src/components/HONDA/Base/Button_icon'
import Toggle from 'src/components/HONDA/Base/Toggle'
import { exportFile } from 'quasar'
function wrapCsvValue(val, formatFn, row){
          let formatted = formatFn !== void 0
            ? formatFn(val, row)
            : val

          formatted = formatted === void 0 || formatted === null
            ? ''
            : String(formatted)

          formatted = formatted.split('"').join('""')
          /**
           * Excel accepts \n and \r in strings, but some other CSV parsers do not
           * Uncomment the next two lines to escape new lines
           */
          // .split('\n').join('\\n')
          // .split('\r').join('\\r')

          return `"${formatted}"`
}
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
        new_columns: {},
        permission: sessionStorage.getItem("permission") != "" && sessionStorage.getItem("permission") != "null" && sessionStorage.getItem("permission") != null ? sessionStorage.getItem("permission").split(',') : [],
        sessionCompanyType: sessionStorage.getItem("company") != "" && sessionStorage.getItem("company") != "null" && sessionStorage.getItem("company") != null ? sessionStorage.getItem("company") : '',
        supplierCodeSession: sessionStorage.getItem("supplier_code") != "" && sessionStorage.getItem("supplier_code") != "null" && sessionStorage.getItem("supplier_code") != null ? sessionStorage.getItem("supplier_code") : '',
      }
    },
    props: ['title', 'table_column', 'table_data','top_button', 'export_button', 'hide_footer', 'row_per_page','table_footer',"flat_status", "bordered_status", 'action_button','edit_button', 'view_button', 'delete_button'
    ,"pass_row_key"],
    components: {
      Button_icon,
      Toggle,
      Checkbox,
    },
    created() {
    },
    mounted(){
        this.onRequest({
            pagination: this.pagination,
            filter: undefined
        });
    },
    computed: {
      dbComponentBehavior() {
        return this.$store.getters['dbComponentBehavior/byLanguage']('erp')
      },
    },
    methods: {
        action : function(payload)
        {
            this.$emit('main_action', payload)
        },
        edit : function(payload)
        {
            this.$emit('main_edit', payload)
        },
        list : function(payload)
        {
            this.$emit('main_list', payload)
        },
        remove : function(payload)
        {
            this.$emit('main_delete', payload)
        },
        onRequest (props) {
          this.$emit("receiveRequestTable",props);

          this.pagination.sortBy = props.pagination.sortBy;
          this.pagination.descending = props.pagination.descending;
          this.pagination.page = props.pagination.page;
          this.pagination.rowsPerPage = props.pagination.rowsPerPage;
          this.loading = true
        },
        // getPaginationLabel: function(firstRowIndex,endRowIndex,totalRowsNumber )
        // {
        //     return 'Showing '+firstRowIndex +' to '+endRowIndex+' of '+totalRowsNumber;
        // },
        // map_isactive: function(payload)
        // {
        //     return payload.isactive == '1' ? 'Yes' : 'No';
        // }
        exportTable : async function(){
          // naive encoding to csv format
          // this.new_columns = this.columns.slice(1,12);
          // console.log(this.new_columns);
          // const content = [this.new_columns.map(col => wrapCsvValue(col.label))].concat(
          //   this.rows.map(row => this.new_columns.map(col => wrapCsvValue(
          //     typeof col.field === 'function'
          //       ? col.field(row)
          //       : row[ col.field === void 0 ? col.name : col.field ],
          //     col.format,
          //     row
          //   )).join(','))
          // ).join('\r\n')

          // const status = exportFile(
          //   'table-export.csv',
          //   content,
          //   'text/csv'
          // )

          // if (status !== true) {
          //   $q.notify({
          //     message: 'Browser denied file download...',
          //     color: 'negative',
          //     icon: 'warning'
          //   })
          // }

          this.$emit("export_excel");
          // var payload = {};
          
          // if(this.sessionCompanyType == "Supplier")
          // {
          //   payload.type = "supplier/"+this.supplierCodeSession;
          // }
          // else if(this.sessionCompanyType == "HMSB")
          // {
          //   payload.type = "user/honda";
          // }
          // else
          // {
          //   payload.type = "user/honda";
          // }
          
          // await this.$store.dispatch('user/trigger_export_excel', payload).then(() => {
          // });
          
        }
    },
    watch: {
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
.q-btn
{
    border-radius: 0px;
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
</style>

