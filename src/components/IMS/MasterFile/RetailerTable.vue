<template>
<div class="">
  <q-table separator="cell" :flat="flat_status" :bordered="bordered_status" class="main_table" :title="title" :row_per_page="row_per_page"
  :rows="rows" :columns="columns" rows-per-page-label="Entries" :pagination-label="getPaginationLabel"
  :rows-per-page-options="row_per_page"
  :row-key="row_key"
  @request="onRequest"
  @row-click="onRowClick"
    :filter="filter"
    v-model:pagination="pagination"
    binary-state-sort
    :loading="loading"
    >

    <template v-slot:header="props" >
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

    <template v-slot:body-cell-active="props">
        <q-td :style="`text-align:${props.col.align}`">
          <Checkbox
            :disable="true"
            :no_label="true"
            v-model="props.row.active"
            :dbComponentBehavior="dbComponentBehavior.text"
            :true-value="1"
            :false-value="0"
            />
        </q-td>
    </template>

    <template v-slot:body-cell-action="props">
        <q-td style="padding-right: 0px;">
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
  </q-table>
</div>
</template>

<script>
import Button_icon from 'src/components/IMS/Base/Button_icon'
import Checkbox from 'src/components/IMS/Base/Checkbox'
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
        //   rowsPerPage: 5,
        rowsPerPage: this.row_per_page[0] === undefined ? this.row_per_page : this.row_per_page[0],
          rowsNumber: 0
        },
        permission: sessionStorage.getItem("permission") != "" && sessionStorage.getItem("permission") != "null" && sessionStorage.getItem("permission") != null ? sessionStorage.getItem("permission").split(',') : [],
      }
    },
    props: ['title', 'table_column', 'table_data','top_button', 'hide_footer', 'row_per_page','table_footer',"flat_status", "bordered_status", 'action_button','edit_button', 'view_button', 'delete_button','table_type'
    ,"pass_row_key"],
    components: {
      Button_icon,
      Checkbox
    },
    mounted(){
      this.onRequest({
        pagination: this.pagination,
        filter: undefined
      })
    },
    created() {
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
        onRowClick : function (event, row, index)
        {
          this.$emit('onRowClick', row)
        },
        // getPaginationLabel: function(firstRowIndex,endRowIndex,totalRowsNumber )
        // {
        //     return 'Showing '+firstRowIndex +' to '+endRowIndex+' of '+totalRowsNumber;
        // },
        // map_isactive: function(payload)
        // {
        //     return payload.isactive == '1' ? 'Yes' : 'No';
        // }
        onRequest (props) {
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

