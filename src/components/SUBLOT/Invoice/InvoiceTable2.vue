<template>
  <div class="table_wrapper">
    <q-table
      separator="cell"
      :flat="flat_status"
      :bordered="bordered_status"
      class="main_table"
      :title="title"
      :row_per_page="row_per_page"
      :rows="rows"
      :columns="columns"
      rows-per-page-label="Entries"
      :pagination-label="getPaginationLabel"
      :rows-per-page-options="row_per_page"
      :row-key="row_key"
      @request="onRequest"
      :filter="filter"
      v-model:pagination="pagination"
      binary-state-sort
      header-align="left"
      >
<!-- :loading="loading" -->
      <template v-slot:top-right >

        <q-btn v-if="top_button" v-on:click="header_button()" label="NEW"  dense ripple class="q-py-none top_button" style="background-color:#273655 !important; font-size: 15px;color:white;"/>
        <q-btn v-else-if="top_button2" :disabled="created_invoice_guid == '' ? true : false" v-on:click="header_button()" label="ADD"  dense ripple class="q-py-none top_button" style="background-color:#273655 !important; font-size: 15px;color:white;"/>

      </template>


      <template v-slot:body-cell-action="props">

        <q-td>

         <q-btn icon="edit_note"  dense :outline="button_no_outline" ripple class="q-mr-sm button" v-on:click="edit(props.row)"
            v-if="edit_button" @click.stop="btnclick">
              <q-tooltip>
                Edit
              </q-tooltip>
          </q-btn>

          <q-btn icon="print"  :disabled="readonly_button" dense color="primary" :outline="button_no_outline" ripple class="q-mr-sm" v-on:click="print(props.row)"
            v-if="print_button" @click.stop="btnclick">
                <q-tooltip>
                  Print
                </q-tooltip>
          </q-btn>

            <q-btn icon="view_list" color="positive" dense :outline="button_no_outline" ripple class="q-mr-sm" v-on:click="list(props.row)"
              v-if="view_button">
                  <q-tooltip>
                      View
                  </q-tooltip>
              </q-btn>

              <q-btn icon="delete" color="negative" dense :outline="button_no_outline" ripple class="q-mr-none" @click.stop="remove(props.row)"
              v-if="delete_button">
                  <q-tooltip>
                      Delete
                  </q-tooltip>
              </q-btn>
          </q-td>
          </template>

  <!-- if there's something change in body, header also need to add as well -->
  <template v-slot:header="props" >
      <q-tr :props="props">
        <q-th v-if="showExpand" auto-width />
      <q-th
          v-for="col in props.cols"
          :key="col.name"
          :props="props"
      >
          <q-tooltip v-if="col.tooltip" anchor="top middle" self="center middle" style="font-size: 13px;">
          {{ col.tooltip }}
          </q-tooltip>
          <!-- {{ col.label }} -->
          <span v-if="col.label !== 'Select'">{{ col.label }}</span>
          <!-- <div v-if="col.label !== 'Select'">{{ col.label }}</div> -->
          <div v-else>
          <Checkbox
          v-if="showSelectAll"
          size="sm"
          :disable="false"
          :no_label="true"
          v-model="select_all"
          :dbComponentBehavior="dbComponentBehavior.text"
          v-on:receiveChangenewVal="receiveChangethCheckbox"
          :table="true"
          />
          </div>
      </q-th>
      </q-tr>
  </template>

  <template v-slot:body-cell-select="props">
    <!-- 1 -->
    <!-- {{ props }} -->
    <q-td :style="`text-align:${props.col.align}`">
    <Checkbox
        size="sm"
        :disable="false"
        :no_label="true"
        v-model="props.row.select"
        :dbComponentBehavior="dbComponentBehavior.text"
        v-on:receiveChangenewVal="receiveChangetdCheckbox"
        :table="true"
        />
    </q-td>
  </template>
  <!-- this one no header so it will align wrongly, thus need to add something in header
    (if not it will get first column value) -->
  <template v-if="showExpand" v-slot:body="props">
    <!-- 2 -->
    <!-- {{ props }} -->
          <q-tr :props="props">
            <q-td auto-width>
              <q-btn
                size="11px"
                color="primary"
                round
                dense
                class="q-mr-sm"
                @click="props.row.expand = !props.row.expand"
                :icon="props.row.expand ? 'remove' : 'add'"
                :loading="forceLoading" >
                <q-tooltip>
                    Expand
                </q-tooltip>
              </q-btn>

                <q-btn
                  size="11.5px"
                  icon="delete"
                  color="negative"
                  dense
                  :outline="button_no_outline"
                  ripple
                  class="q-mr-none"
                  @click.stop="remove(props.row)"
                  v-if="remove_button"
                  :loading="forceLoading">
                  <q-tooltip>
                    Delete
                  </q-tooltip>
                </q-btn>

            </q-td>
            <q-td
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
            >
              {{ col.value }}
            </q-td>
          </q-tr>
          <q-tr v-show="props.row.expand" :props="props" style="background-color:#00000008;">
          <!-- 3 -->
            <!-- {{ props }} -->
            <q-td colspan="100%">
              <div class="text-left">
                <!-- {{ props.row.table_data.results }} -->
                <q-table
                  separator="cell"
                  :flat="flat_status"
                  :bordered="bordered_status"
                  class="main_table"
                  :title="title"
                  :row_per_page="row_per_page"
                  :rows="props.row.table_data.results"
                  :columns="columns_inside"
                  rows-per-page-label="Entries"
                  :pagination-label="getPaginationLabel"
                  :rows-per-page-options="row_per_page"
                  :row-key="props.row.agr_guid"
                  @request="onRequest"
                  :filter="filter"
                  v-model:pagination="pagination"
                  binary-state-sort
                  header-align="left"
                  hide-pagination
                  style="padding: 0px;"
                  dense
                >

                <template v-slot:body-cell-action="props">
                <q-td style="text-align: center;">

                    <q-btn icon="edit_note"  dense :outline="button_no_outline" ripple class="q-mr-sm button" v-on:click="edit(props.row)"
                    v-if="edit_button" @click.stop="btnclick" :loading="forceLoading">
                        <q-tooltip>
                            Edit
                        </q-tooltip>
                    </q-btn>

                  <q-btn icon="print"  :disabled="readonly_button" dense color="primary" :outline="button_no_outline" ripple class="q-mr-sm" v-on:click="print(props.row)"
                    v-if="print_button" @click.stop="btnclick" :loading="forceLoading">
                        <q-tooltip>
                            Print
                        </q-tooltip>
                    </q-btn>

                    <q-btn :disabled="props.row.invoice_agr_sublot_guid ? false : true" size="11px" icon="view_list" color="positive" dense :outline="button_no_outline" ripple class="q-mr-sm" v-on:click="list(props.row)"
                    v-if="view_button" :loading="forceLoading">
                    <!-- invoice_agr_sublot_guid -->
                        <q-tooltip>
                            View
                        </q-tooltip>
                    </q-btn>

                    <q-btn icon="delete" color="negative" dense :outline="button_no_outline" ripple class="q-mr-none" @click.stop="remove(props.row)"
                    v-if="delete_button" :loading="forceLoading">
                        <q-tooltip>
                            Delete
                        </q-tooltip>
                    </q-btn>
                </q-td>
            </template>

                </q-table>
              </div>
            </q-td>
          </q-tr>

  </template>

    </q-table>

  </div>
</template>

  <script>
  // import Button_icon from 'src/components/HONDA/Base/Button_icon'
  import Checkbox from 'src/components/SUBLOT/Invoice/Checkbox'
  // import Toggle from 'src/components/HONDA/Base/Toggle'

  export default {
      data(){
        return{
          columns: this.table_column,
          rows: this.table_data,
          columns_inside: this.table_column_inside,
          rows_inside: [],
          row_key: "",
          loading: false,
          filter:"",
          pagesNumber: "",
          pagination: {
            sortBy: '',
            descending: '',
            page: 1,
            // rowsPerPage: 5,
            rowsPerPage: this.row_per_page[0] === undefined ? this.row_per_page : this.row_per_page[0],
            rowsNumber: 0
          },
          showSelectAll: false,
          showExpand: false,
          showDelete: false
        }
      },
      props: [
        'title',
        'table_column',
        'table_data',
        'table_column_inside',
        // 'table_data_inside',
        'top_button',
        'top_button2',
        'hide_footer',
        'row_per_page',
        'table_footer',
        'flat_status',
        'bordered_status',
        'print_button',
        'edit_button',
        'view_button',
        'delete_button',
        'remove_button',
        'pass_row_key',
        'select_all',
        'showExpand',
        'created_invoice_guid',
        'forceLoading',
      ],
      components: {
        // Button_icon,
        Checkbox,
        // Toggle
      },
      created() {
      },
      computed: {
        dbComponentBehavior() {
          return this.$store.getters['dbComponentBehavior/byLanguage']('sublot')
        },
        // pagesNumber() {
        //  return Math.ceil(this.rows.length / this.pagination.rowsPerPage);
        // }
      },
      mounted(){
        this.onRequest({
          pagination: this.pagination,
          filter: undefined
        })
      },
      methods: {
           btnclick()
          {

          },
          handleTotalInclTaxClick(props)
          {
            this.$emit('receiveTotalInclTaxClick', props);
          },
          print : function(payload)
          {
              this.$emit('main_print', payload)
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
          gone : function(payload)
          {
              this.$emit('main_deleted', payload)
          },
          onRequest (props) {
            this.$emit("getRequestTable",props);

            this.pagination.sortBy = props.pagination.sortBy;
            this.pagination.descending = props.pagination.descending;
            this.pagination.page = props.pagination.page;
            this.pagination.rowsPerPage = props.pagination.rowsPerPage;
            this.loading = true
          },
           header_button : function(payload)
          {
              this.$emit('head_button',payload)
          },
        //    handleRowClick(payload)
        // {
        //     payload.row.rowIndex = payload.rowIndex;
        //     this.$emit('receiveRowClick',payload.row)
        // }
          onRowClick : function (event, row, index)
          {
           // console.log(event);
           // console.log(row);
          //  console.log(index);
            this.$emit('onRowClick', row)
          },
          receiveChangethCheckbox(newVal)
          {
            this.$emit('receiveChangeSelectAll', newVal)
          },
          receiveChangetdCheckbox(newVal)
          {
            this.$emit('receiveChangeCheckbox', newVal)
          },
          receiveChangetdExpand(newVal){
            this.$emit('receiveChangeExapnd', newVal)
          },
          handlePopupSave(value,header,column_index,payload, event){
            // console.log('header', header)
            // console.log('column_index', column_index)
            // console.log('payload', payload)
            // console.log('event', event)

              var row = payload.rowIndex;
              var newValue = this.newValue;
              var index = payload.row.index

            // this.rows[row][header] = this.formatAmount(newValue,'$');

            var main_json = {
                  index: index,
                  row:row,
                  header: header,
                  value: newValue,
                  event
              }

              // console.log('main_json',main_json)

            this.$emit('reupdateTable',main_json);
          },
          async handleSave(value, payload, column_index) {

            var main_json = {
                  value
              }

            this.$emit('receiveSave',main_json);
          },
          handleTdClick(value)
          {
              console.log(value)
              // this.formattedValue = this.formatValue(value);
              var newValue = value.toString().replace(',','');
              this.newValue = newValue;
              this.$nextTick(() => {
                  setTimeout(()=>{
                      this.$refs.inputRef[0].select()
                  },100);
              });
          },
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
              this.showSelectAll = true;
              this.loading = false;

          },
          table_column_inside(newVal)
          {
              this.columns_inside = newVal;
              if(this.pass_row_key)
              {
                  this.row_key = this.pass_row_key;
              }
              else
              {
                  this.row_key = newVal[0].name;
              }

          },
          // table_data_inside(newVal){
          //     // this.rows = newVal;
          //     // this.loading = false;
          //     console.log('watch')

          //     this.rows_inside = newVal.data.results;
          //     // this.rows_inside = newVal;
          //     console.log(this.rows_inside)
          //     this.pagination.rowsNumber = newVal.data.count;
          //     this.showSelectAll = true;
          //     this.loading = false;
          // },
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
  .table_wrapper{
    padding-top: 2px;
  }

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
  .top_button {
    width:65px;
  }
  * >>> .q-table__top {
      padding: 0px 0px;
      padding-bottom: 15px;

  }
  .button{
    background-color: #273655;
    color: white;
  }

  /* tr td:first-child{
    width: 80px;

  } */
  .q-table__container
  {
    padding: 0px;
  }
  </style>
