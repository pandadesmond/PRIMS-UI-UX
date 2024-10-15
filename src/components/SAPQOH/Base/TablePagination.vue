<template>



  <div class="table_wrapper">
    <q-table
      v-if="hide_footer"
      class="main_table"
      :title="title"
      :rows="rows"
      :columns="columns"
      row-key="id"
      flat
      separator="cell"
      v-model:pagination="pagination"
      :loading="loading"
      :filter="filter"
      @request="onRequest"
      binary-state-sort
      rows-per-page-label="Entries" :pagination-label="getPaginationLabel" hide-bottom :rows-per-page-options="[row_per_page]"
      @row-click="handleRowClick"
    >
       <!-- :loading="loading" -->
      <template v-slot:top-right>
       <label class="q-px-sm">Search: </label>
       <q-input borderless dense debounce="300" v-model="filter">
          <!-- <template v-slot:append>
            <q-icon name="search" />
          </template> -->
        </q-input>

        <q-btn v-if="top_button" v-on:click="header_button()" icon="add" color="green" dense outline ripple class="top_button" >
            <q-tooltip>
                Create
            </q-tooltip>
        </q-btn>

      </template>

      <template v-slot:body-cell-action="props">
        <q-td>

            <q-btn icon="edit_note" color="info" dense outline ripple class="q-mr-sm" v-on:click="action(props.row)"
            v-if="action_button">
                <q-tooltip>
                    Action
                </q-tooltip>
            </q-btn>

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

            <q-btn icon="delete" color="negative" dense outline ripple class="q-mr-sm" v-on:click="delete(props.row)"
            v-if="delete_button">
                <q-tooltip>
                    Delete
                </q-tooltip>
            </q-btn>

            <!-- <q-btn icon="delete_outline" color="negative" dense outline ripple class="q-mr-sm" @click="testdeleteRecordClick(props.row)">
                <q-tooltip>
                    Delete
                </q-tooltip>
            </q-btn> -->

        </q-td>
    </template>

           <template v-slot:header-cell-sap_qoh="props">
        <q-th :props="props" :class="[checksap_qoh  ? 'text-green': 'text-red']">

          {{ props.col.label }}
        </q-th>
      </template>
         <template v-slot:header-cell-pending_sales="props">
        <q-th :props="props" :class="[check_panda  ? 'text-green': 'text-red']">

          {{ props.col.label }}
        </q-th>
      </template>


    <template v-slot:bottom-row v-if="rows.length <= 0">
      <q-tr>
          <q-td colspan="100%">
              <q-icon size="1.9em" name="warning" />
              <span>
                  No data available
              </span>
          </q-td>
      </q-tr>
  </template>

  </q-table>

  <q-table
      v-else
      class="main_table"
      :title="title"
      :rows="rows"
      :columns="columns"
      row-key="id"
      flat
      :loading="loading"
      table-style="border: 1px solid #EFECEC"
      separator="cell"
      v-model:pagination="pagination"
      :filter="filter"
      @request="onRequest"
      binary-state-sort
      rows-per-page-label="Entries" :pagination-label="getPaginationLabel" :rows-per-page-options="row_per_page"
      @row-click="handleRowClick"
    >
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search"/>
          </template>
        </q-input>

        <q-btn v-if="top_button" v-on:click="header_button()" icon="add" color="green" dense outline ripple class="top_button" >
            <q-tooltip>
                Create
            </q-tooltip>
        </q-btn>
      </template>

      <template v-slot:body-cell-action="props">
        <q-td>

            <q-btn icon="edit_note" color="info" dense :outline="button_no_outline" ripple class="q-mr-sm" v-on:click="action(props.row)"
            v-if="action_button">
                <q-tooltip>
                    Action
                </q-tooltip>
            </q-btn>

            <q-btn icon="visibility" color="primary" dense :outline="button_no_outline" ripple class="q-mr-sm" v-on:click="edit(props.row)"
            v-if="edit_button">
                <q-tooltip>
                    Edit
                </q-tooltip>
            </q-btn>

            <q-btn icon="view_list" color="positive" dense :outline="button_no_outline" ripple class="q-mr-sm" v-on:click="list(props.row)"
            v-if="view_button">
                <q-tooltip>
                    View
                </q-tooltip>
            </q-btn>

            <q-btn icon="delete" color="negative" dense :outline="button_no_outline" ripple class="q-mr-sm" v-on:click="delete(props.row)"
            v-if="delete_button">
                <q-tooltip>
                    Delete
                </q-tooltip>
            </q-btn>

            <!-- <q-btn icon="delete_outline" color="negative" dense outline ripple class="q-mr-sm" @click="testdeleteRecordClick(props.row)">
                <q-tooltip>
                    Delete
                </q-tooltip>
            </q-btn> -->

        </q-td>
    </template>

         <template v-slot:header-cell-sap_qoh="props">
        <q-th :props="props" :class="[checksap_qoh  ? 'text-green': 'text-red']">

          {{ props.col.label }}
        </q-th>
      </template>
         <template v-slot:header-cell-pending_sales="props">
        <q-th :props="props" :class="[check_panda  ? 'text-green': 'text-red']">

          {{ props.col.label }}
        </q-th>
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

            <q-btn icon="edit_note" color="info" dense :outline="button_no_outline" ripple class="q-mr-sm" v-on:click="action(props.row)"
            v-if="action_button">
                <q-tooltip>
                    Action
                </q-tooltip>
            </q-btn>

            <q-btn icon="visibility" color="primary" dense :outline="button_no_outline" ripple class="q-mr-sm" v-on:click="edit(props.row)"
            v-if="edit_button">
                <q-tooltip>
                    Edit
                </q-tooltip>
            </q-btn>

            <q-btn icon="view_list" color="positive" dense :outline="button_no_outline" ripple class="q-mr-sm" v-on:click="list(props.row)"
            v-if="view_button">
                <q-tooltip>
                    View
                </q-tooltip>
            </q-btn>

            <q-btn icon="delete" color="negative" dense :outline="button_no_outline" ripple class="q-mr-sm" v-on:click="delete(props.row)"
            v-if="delete_button">
                <q-tooltip>
                    Delete
                </q-tooltip>
            </q-btn>

            <!-- <q-btn icon="delete_outline" color="negative" dense outline ripple class="q-mr-sm" @click="testdeleteRecordClick(props.row)">
                <q-tooltip>
                    Delete
                </q-tooltip>
            </q-btn> -->


          </q-td>

          <q-td v-else
            :test="JSON.stringify(props)"
            :style="[`text-align:${col.align}`, col.name == 'sap_qoh' ? (props.row.sap_exist ? 'background-color:#95ff95;':'background-color:#ffa8a8;') : (col.name == 'pending_sales' ? (props.row.panda_exist ? 'background-color:#95ff95;':'background-color:#ffa8a8;'):'')  ]"
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

                <q-td :class="table_footer_details.classes" :style="'text-align:'+table_footer_details.align+';'" :key="table_footer_details" v-for="table_footer_details in table_footer">
                    {{table_footer_details.value}}
                </q-td>

            </q-tr>
  </template>


  </q-table>


  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default{
  data(){
    return{
      filter:"",
       loading: true,
      originalRows: this.table_data,
      columns: this.table_column,
      //  check_panda: true,
      //  checksap_qoh: false,
      rows: [],
      pagination: {
        sortBy: '',
        descending: '',
        page: 1,
        // rowsPerPage: this.row_per_page[0] === undefined ? this.row_per_page : this.row_per_page[0],
        rowsPerPage: 0,
        rowsNumber: 0
      }
    }
  },
  props:['table_column','table_data', 'title','top_button', 'hide_footer', 'row_per_page','table_footer', "action_button", "edit_button",
    "view_button","delete_button","button_no_outline", 'check_panda', 'checksap_qoh', 'force_loading' ],
  mounted(){
    this.onRequest({
        pagination: this.pagination,
        filter: undefined
      })
  },
  methods: {
      action : function(payload)
      {
          this.$emit('action', payload)
      },
      edit : function(payload)
      {
          this.$emit('edit', payload)
      },
      list : function(payload)
      {
          this.$emit('list', payload)
      },
      delete : function(payload)
      {
          this.$emit('delete', payload)
      },
      header_button : function(payload)
      {
          this.$emit('head_button', payload)
      },
      getPaginationLabel: function(firstRowIndex,endRowIndex,totalRowsNumber )
      {
          return 'Showing '+firstRowIndex +' to '+endRowIndex+' of '+totalRowsNumber;
      },
      onRequest (props) {

        this.$emit("receiveRequestTable",props);

        this.pagination.sortBy = props.pagination.sortBy;
        this.pagination.descending = props.pagination.descending;
        this.pagination.page = props.pagination.page;
        this.pagination.rowsPerPage = props.pagination.rowsPerPage;
        this.loading = true
      },
       handleTableChange(json)
        {
          this.$emit("receiveDoChange",json)
        },
      handleRowClick(evt, row, index)
      {
          this.$emit('receiveRowClick',row)
      }
  },
  watch: {
    table_data(newVal)
    {

       this.rows = newVal.data.results;
       this.pagination.rowsNumber = newVal.data.count;

       if(this.force_loading == false)
       {
        this.loading = false;
       }
       


    },
    table_column(newVal)
    {
      this.columns = newVal;

    },
    force_loading(newVal)
    {
      if(newVal)
      {
        this.loading = newVal;
      }
    }
  }
}
</script>

<style scoped>
* >>> th
{
    /* background-color: #dee1e6; */
    background-color: #f6f9fc;
}
.q-input {
  border: 1px solid #E5DFDE;
  padding:0px 4px;
}

.q-field--dense >>> .q-field__control{
        height: 30px !important;
        min-height: 30px !important;
        padding: 0px 4px;

}

.q-field--dense >>> .q-field__append{
       height: 30px !important;
}

* >>> .q-table__top {
    padding: 12px 5px;
}

.top_button
{
  margin-left: 10px;
}

.q-btn
{
    border-radius: 0px;
}

* >>> .q-table__bottom
{
  border: 1px solid #e0e0e0;
}


</style>
