<template>
    <q-table
      :flat="flat_status"
      :bordered="bordered_status"
      :rows="rows"
      :columns="columns"
      row-key="name"
      :hide-bottom ="hide_footer"
      @request="onRequest"
      @row-click="onRowClick"
    >
      <template v-slot:body="props">

        <q-tr @click="onRowClick(props.row)" :props="props"  :style="[props.row.selected ? 'background-color: #eeeeee; font-weight: bold; color: #273655;' : '']">
          <q-td v-for="col in props.cols"
                :key="col.name"
                :props="props">
            <!-- <span v-if="col.field=='Barcode'">{{col}}{{ col.value }}</span>
            <span v-else>{{ col.value }}</span> -->
            <q-icon v-if="props.row.selected" name="play_arrow" /> {{ col.value }}
          </q-td>
        </q-tr>
     </template>
    </q-table>
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
      props: ['title', 'dense_status','table_column', 'table_data','top_button', 'top_button_dropdown', 'hide_footer', 'row_per_page','table_footer',"flat_status", "bordered_status", 'action_button','edit_button', 'view_button', 'delete_button','cancel_button','print_button', 'table_type','readonly_button','readonly_action','readonly_delete', 'sn_button'
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
          onRowClick : function (row)
          {

            // console.log('row',row);
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
      padding: 2px !important;
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

  * >>> .q-table__container
  {
      padding: 0px;
  }
  *>>>.q-table th {
    font-weight: 700;
    font-size: 12px;
    -webkit-user-select: none;
    user-select: none;
    font-family: InterfontBold;
    color: black;
    text-align: center !important;
    background-color: #D7E2E9;
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
  </style>

<style lang="sass">
.my_sticky_header_table
  /* height or max-height is important */
  max-height: 380px

  thead tr:first-child th
    background-color: #D7E2E9

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

