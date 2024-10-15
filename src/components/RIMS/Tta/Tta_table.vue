<template>

  <div class="q-pa-md table_wrapper" style="position:relative;">
    <q-table separator="cell"
    class="main_table"
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

        <template v-slot:top-right v-if="top_button" >

            <!-- <q-btn v-on:click="header_button()"  style="background: green; color: white;font-size:11px;padding-left:10px;padding-right:10px;" dense :type="type" class="full-width">
                Create
            </q-btn> -->

            <q-btn v-if="top_button" v-on:click="header_button()" icon="add" color="green" dense outline ripple class="q-mr-sm" >
                <q-tooltip>
                    Create
                </q-tooltip>
            </q-btn>

            <q-btn v-if="export_main" v-on:click="handleExportMain()" icon="file_download" color="primary" dense outline ripple class="q-mr-sm" >
                <q-tooltip>
                    Export
                </q-tooltip>
            </q-btn>
            <!-- <q-input borderless dense debounce="300"  placeholder="Search">
                <template v-slot:append>
                    <q-icon name="search" />
                </template>
            </q-input> -->

            <!-- <q-btn icon="add" color="primary" dense outline class="float-right q-ma-sm" @click="addRecordClick"></q-btn> -->
        </template>

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

            <q-td v-if="col.name == 'action'">
                <q-btn icon="edit_note" color="info" dense outline ripple class="q-mr-sm" v-on:click="handleAction(props.row)"
                v-if="action_button">
                    <q-tooltip>
                        Action
                    </q-tooltip>
                </q-btn>

                <q-btn icon="visibility" color="primary" dense outline ripple class="q-mr-sm" v-on:click="handleEdit(props.row)"
                v-if="edit_button">
                    <q-tooltip>
                        Edit
                    </q-tooltip>
                </q-btn>

                <q-btn icon="view_list" color="positive" dense outline ripple class="q-mr-sm" v-on:click="handleList(props.row)"
                v-if="view_button">
                    <q-tooltip>
                        View
                    </q-tooltip>
                </q-btn>

                <q-btn icon="delete" color="negative" dense outline ripple class="q-mr-sm" v-on:click="handleDelete(props.row)"
                v-if="delete_button">
                    <q-tooltip>
                        Delete
                    </q-tooltip>
                </q-btn>

                <q-btn icon="update" dense outline ripple class="q-mr-sm revise_button" v-on:click="handleRevise(props.row)"
                v-if="revise_button">
                    <q-tooltip>
                        Revise
                    </q-tooltip>
                </q-btn>

                <q-btn icon="print" color="primary" dense outline ripple class="q-mr-sm revise_button" v-on:click="handlePrintInvoice(props.row)"
                v-if="print_button">
                    <q-tooltip>
                        Print
                    </q-tooltip>
                </q-btn>

                <q-btn icon="file_download" color="primary" dense outline ripple class="q-mr-sm export_button" v-on:click="handleExport(props.row)"
                v-if="export_button">
                    <q-tooltip>
                        Print
                    </q-tooltip>
                </q-btn>

                <!-- <q-btn icon="delete_outline" color="negative" dense outline ripple class="q-mr-sm" @click="testdeleteRecordClick(props.row)">
                    <q-tooltip>
                        Delete
                    </q-tooltip>
                </q-btn> -->

            </q-td>


            <q-td v-else
                :style="[col.name == 'job_status' ? `background-color:${props.row.status_color}` : '', col.style ]"
            >
                {{col.value}}
            </q-td>

          </template>
        </q-tr>


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
    props: ['title', 'table_column', 'table_data',"forceLoading","table_footer","flat_status","bordered_status","pass_row_key","action_button",
    "edit_button","view_button","delete_button","top_button","revise_button","print_button","export_button","export_main"],
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
            // alert('Table Row Click')
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
        header_button : function(payload)
        {
            this.$emit('head_button', payload)
        },
        handleAction: function(payload)
        {
            this.$emit('main_action', payload)
        },
        handleEdit: function(payload)
        {
            this.$emit('main_edit', payload)
        },
        handleList: function(payload)
        {
            this.$emit('main_list', payload)
        },
        handleDelete: function(payload)
        {
            this.$emit('main_delete', payload)
        },
        handleRevise(payload)
        {
            this.$emit('main_revise', payload);
        },
        handlePrintInvoice(payload)
        {
          this.$emit('main_print', payload);
        },
        handleExport(payload)
        {
          this.$emit('main_export', payload);
        },
        handleExportMain(payload)
        {
          this.$emit('main_export_main', {});
        }
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
        // var _this = this;
        // setTimeout(function(){
        //   _this.loading = false;
        // },150);
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

.revise_button
{
    color: #ff9800;
}

</style>
