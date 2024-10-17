<template>
  <div class="">
    <q-table :hide-bottom="hide_footer" :separator="no_separator ? 'none' : 'cell'" :flat="flat_status" :bordered="bordered_status" class="main_table my_sticky_header_table" :title="title" :row_per_page="row_per_page"
    :rows="rows" :columns="columns" rows-per-page-label="Entries" :pagination-label="getPaginationLabel"
    :rows-per-page-options="row_per_page"
    :row-key="row_key"
    @request="onRequest"
      :filter="filter"
      v-model:pagination="pagination"
      binary-state-sort
      :loading="loading"
      >

      <template v-if="top_button" v-slot:top-right>
        <Button_icon v-if="!top_button_dropdown" :disabled="readonly_button" :flat="true" :icon="'add'" v-on:receiveClick="add_button()" :font_color="'white'" :color="'green'" :text="'Add'" :outline="false" size="12px" class="q-pr-sm q-mr-sm"/>

        <Button_icon :loading="loading_button" :disabled="readonly_button ? true : update_weight_readonly" :flat="false" v-on:receiveClick="update_weight()" :font_color="'black'" :color="'white'" :text="'Update SN'" :outline="true" size="12px" class="q-pr-sm q-mr-sm" v-if="update_weight_button" />

        <Button_icon :disabled="readonly_button ? true : generate_sn_readonly" :flat="true" v-on:receiveClick="sn()" :font_color="'white'" :color="'#094161'" :text="'Generate SN'" :outline="false" size="12px" class="q-pr-sm q-mr-sm" v-if="sn_button" />

        <q-btn-dropdown
          v-if="top_button_dropdown"
          no-caps
          dense
          split
          icon="add"
          flat
          style="background-color: #228026; color: white"
          label="Add"
          size="12px"
          @click="add_button()"
        >
          <q-list>
            <q-item dense clickable v-close-popup @click="supplier_item_list">
              <q-item-section>
                <q-item-label>Supplier Item List</q-item-label>
              </q-item-section>
            </q-item>

          </q-list>
        </q-btn-dropdown>
      </template>

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
              <!-- {{ col.label }} -->
              <span v-if="col.label !== 'Select'">{{ col.label }}</span>
              <!-- <div v-if="col.label !== 'Select'">{{ col.label }}</div> -->
              <div v-if="col.label=='Select'">
                <Checkbox
                size="xs"
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
          <q-td :style="`text-align:${props.col.align}`">
            <Checkbox
              v-if="props.row.sn == 1"
              size="xs"
              :disable="false"
              :no_label="true"
              v-model="props.row.select"
              :dbComponentBehavior="dbComponentBehavior.text"
              v-on:receiveChangenewVal="receiveChangetdCheckbox"
              :table="true"
              />
          </q-td>
      </template>

      <template v-slot:body-cell-posted="props">
          <q-td :style="`text-align:${props.col.align}`">
            <Checkbox
              size="xs"
              :disable="true"
              :no_label="true"
              v-model="props.row.posted"
              :dbComponentBehavior="dbComponentBehavior.text"
              />
          </q-td>
        </template>

      <template v-slot:body-cell-Qty="props">
          <q-td :style="`text-align:${props.col.align}`">
            <Input
            :autofocusclick="true"
            style="width:50px;"
            :readonly="false"
            :no_label="true"
            v-model="props.row.Qty"
            v-on:change="changeQuantity('Qty', props.rowIndex, props.row.Qty, props.row.FOCQty, props.row.BulkQty, props.row.BulkFOC)"
            :dbComponentBehavior="dbComponentBehavior.text_right_readonly"
            input-class="text-right" />
          </q-td>
      </template>

      <template v-slot:body-cell-FOCQty="props">
          <q-td :style="`text-align:${props.col.align}`">
            <Input
            :autofocusclick="true"
            style="width:50px;"
            :readonly="false"
            :no_label="true"
            v-model="props.row.FOCQty"
            v-on:change="changeQuantity('FOCQty', props.rowIndex, props.row.Qty, props.row.FOCQty, props.row.BulkQty, props.row.BulkFOC)"
            :dbComponentBehavior="dbComponentBehavior.text_right_readonly"
            input-class="text-right" />
          </q-td>
      </template>

      <template v-slot:body-cell-BulkQty="props">
          <q-td :style="`text-align:${props.col.align}`">
            <Input
            :autofocusclick="true"
            style="width:50px;"
            :readonly="false"
            :no_label="true"
            v-model="props.row.BulkQty"
            v-on:change="changeQuantity('BulkQty', props.rowIndex, props.row.Qty, props.row.FOCQty, props.row.BulkQty, props.row.BulkFOC)"
            :dbComponentBehavior="dbComponentBehavior.text_right_readonly"
            input-class="text-right" />
          </q-td>
      </template>

      <template v-slot:body-cell-BulkFOC="props">
          <q-td :style="`text-align:${props.col.align}`">
            <Input
            :autofocusclick="true"
            style="width:50px;"
            :readonly="false"
            :no_label="true"
            v-model="props.row.BulkFOC"
            v-on:change="changeQuantity('BulkFOC', props.rowIndex, props.row.Qty, props.row.FOCQty, props.row.BulkQty, props.row.BulkFOC)"
            :dbComponentBehavior="dbComponentBehavior.text_right_readonly"
            input-class="text-right" />
          </q-td>
      </template>

      <template v-slot:body-cell-action="props">
          <q-td style="padding-right: 0px;">
              <Button_icon :disabled="readonly_action" :icon="'edit_note'" :color="'#094161'" :outline="false" size="12px" v-on:click="action(props.row)" v-if="action_button" class="q-mr-sm" />

              <q-btn icon="visibility" color="primary" dense outline ripple class="q-mr-sm" v-on:click="edit(props.row)"
              v-if="edit_button">
                  <q-tooltip>
                      Edit
                  </q-tooltip>
              </q-btn>

              <!-- <q-btn icon="view_list" color="positive" dense outline ripple class="q-mr-sm" v-on:click="list(props.row)"
              v-if="view_button">
                  <q-tooltip>
                      View
                  </q-tooltip>
              </q-btn> -->

              <Button_icon :icon="'view_list'" :color="'positive'" :outline="false" size="12px" v-on:click="list(props.row)" v-if="view_button" class="q-mr-sm" />

              <Button_icon :disabled="readonly_delete" :icon="'delete'" :color="'negative'" :outline="false" size="12px" v-on:click="remove(props.row)" v-if="delete_button" class="q-mr-sm" />

              <Button_icon :disabled="readonly_button" icon="print" color="primary" :outline="false" size="12px" dense ripple :disable="showAddLoading" v-if="print_button" class="q-mr-sm" v-on:click="handlePrint(props.row)"
              @click.stop="btnclick"/>

              <Button_icon :icon="'clear'" :color="'#FFD580'" :outline="false" size="12px" v-on:click="cancel(props.row)" v-if="cancel_button" class="q-mr-sm" />

          </q-td>
      </template>
    </q-table>
  </div>
  </template>

  <script>
  import Button_icon from 'src/components/ERP/Base/Button_icon'
  import Checkbox from 'src/components/ERP/Base/Checkbox'
  import Input from 'src/components/ERP/Base/Input'

  export default {
      data(){
        return{
          columns: [],
          rows: [],
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
          amount: false,
          forfeited: false,
          page_function: this.$route.name,
        }
      },
      props: ['title', 'table_column', 'table_data','top_button', 'top_button_dropdown', 'hide_footer', 'row_per_page','table_footer',"flat_status", "bordered_status", 'action_button','edit_button', 'view_button', 'delete_button','cancel_button','print_button', 'table_type','readonly_button','readonly_action','readonly_delete', 'sn_button'
      ,"pass_row_key",'forceLoading','update_weight_button','loading_button','update_weight_readonly','select_all','generate_sn_readonly','no_separator','print_btn_dropdown'],
      components: {
        Button_icon,
        Checkbox,
        Input,
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
          changeQuantity(element, index, n1,n2,n3,n4)
          {
            n1 = this.unformatAmount(n1,'qty');
            n2 = this.unformatAmount(n2,'qty');
            n3 = this.unformatAmount(n3,'qty');
            n4 = this.unformatAmount(n4,'qty');
            n1 = this.formatAmount(n1,'qty');
            n2 = this.formatAmount(n2,'qty');
            n3 = this.formatAmount(n3,'qty');
            n4 = this.formatAmount(n4,'qty');
            this.$emit('onChangeQuantity', element, index, n1,n2,n3,n4);
          },
          supplier_item_list()
          {
            this.$emit('main_supplier_item_list');
          },
          handleRefno(refno)
          {
            this.$emit('onClickRefno', refno);
          },
          receivePrintSn(col, props)
          {
            this.$emit('onPrintSn',col,props);
          },
          receiveChangetdCheckbox(newVal)
          {
            this.$emit('receiveChangeCheckbox', newVal)
          },
          update_weight()
          {
            this.$emit('receiveChangeUpdateWeight');
          },
          receiveChangethCheckbox(newVal)
          {
            this.$emit('receiveChangeSelectAll', newVal)
          },
          btnclick(){

          },
          handlePrint(props)
          {
            this.$emit('handlePrint',props);
          },
          handlePrintDropdown(props,value)
          {
            console.log(props,value)
            this.$emit('handlePrintDropdown',props, value);
          },
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
          cancel : function(payload)
          {
              this.$emit('main_cancel', payload)
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
          add_button : function()
          {
              this.$emit('add_button')
          },
          sn : function()
          {
              this.$emit('sn')
          },
          formatAmount(value, type)
          {
              if(type == "$")
              {
                  var value = Number(value).toFixed(2);
              }
              else if(type == "%")
              {
                  var value = Number(value).toFixed(1);
              }
              else if(type == "qty")
              {
                  var value = Number(value).toFixed(0);
              }
              else
              {
                  var value = value;
              }

              var parts = value.toString().split(".");
              const numberPart = parts[0];
              const decimalPart = parts[1];
              const thousands = /\B(?=(\d{3})+(?!\d))/g;
              // return numberPart.replace(thousands, ",") + (decimalPart ? "." + decimalPart : "");

              return numberPart.replace(thousands, ",") + (decimalPart ? "." + decimalPart : "");
          },
          unformatAmount(value,type)
          {
            value = value.toString();

            if(type == "$")
            {
                var value = Number(value).toFixed(2);
            }
            else if(type == "%")
            {
                var value = Number(value).toFixed(1);
            }
            else if(type == "qty")
            {
                var value = Number(value).toFixed(0);
            }
            else
            {
                var value = value;
            }

            return Number(value.replaceAll(',',''))
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
              // this.loading = false;)
              this.rows = newVal.data.results;
              this.pagination.rowsNumber = newVal.data.count;
              this.loading = false;

              if(this.forceLoading == false)
              {
                this.loading = false;
              }
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
  .custom_link
  {
    color: blue;
    text-decoration: none; /* Remove underline by default */
    transition: text-decoration 0.3s;
  }
  .custom_link:hover {
    cursor: pointer;
    text-decoration: underline; /* Underline on hover */
  }
  .print_select
  {
    border: 1px solid #1976D2;
    background-color:white;
    color: grey;
  }
  .q-btn
  {
      border-radius: 0px;
  }

  * >>> thead
  {
      background-color: #dee1e6;
  }

  * >>> th
  {
      padding: 10px !important;
  }

  * >>> tr, * >>> td
  {
      padding: 0px !important;
      height: 20px !important;
  }

  * >>> td
  {
      padding: 3px !important;
      padding-left: 5px !important;
      padding-right: 5px !important;
      font-size: 12px !important;
      height: 20px !important;
  }
  *>>>.q-table th {
    font-weight: 700;
    font-size: 12px;
    -webkit-user-select: none;
    user-select: none;
    font-family: InterfontBold;
    color: black;
    text-align: center !important;
    background-color: #d7e2e9;
}
* >>> .q-table td
  {
      padding: 10px !important;
      padding-left: 20px !important;
      padding-right:  20px !important;
      font-size: 12px !important;
      height: 24px !important;
       text-align: center !important;
      font-family: InterfontMedium;
      font-weight: 500;
  }
  * >>> .q-table__container
  {
      padding: 0px;
  }
  </style>

<style lang="sass">
.my_sticky_header_table
  /* height or max-height is important */
  max-height: 380px

  thead tr:first-child th
    background-color: #d7e2e9

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px

  /* prevent scrolling behind sticky top row on focus */
  tbody
    /* height of all previous header rows */
    scroll-margin-top: 48px
</style>

