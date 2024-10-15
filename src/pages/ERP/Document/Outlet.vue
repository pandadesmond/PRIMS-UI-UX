<template>
  <div v-if="$q.screen.width > 599" class="row card_section card_section_second">

    <Title :text="'Outlet (Not Record Excel Yet)'" :filter_status="filter_status" v-on:receiveFilter="handleReceiveFilter" />
    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
      <div class="row">
        
        <div class="card_section_two card_section_second_content col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">

          <div class="q-pr-xs q-pt-xs q-pb-md row items-center">
            <div class="row full-width">
              <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 col-xl-4 q-pl-xs">
                <LabelInputHorizontal
                :readonly="false"
                :no_label="true"
                :text="'Outlet(Not record in excel yet)'"
                v-model:pass_value="search"
                :dbComponentBehavior="dbComponentBehavior.text"
                v-on:receiveChange="handleChangeOptions"
                />
              </div>

              <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 col-xl-4 q-pl-xs" style="visibility:hidden;">

              </div>

              <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 col-xl-4" align="right">
                <Button_icon :flat="false" :font_color="'white'" :color="'#2F3A4D'" :text="$language('D0024')" :outline="false" size="15px"
                v-on:receiveClick="handleShowCreatePurchaseOrder"/>
              </div>
            </div>
          </div>

          <Table
          :row_per_page="[5,10,20,50,0]"
          :search_input="true"
          :top_button="false"
          v-on:onClickRefno="handleClickRefno"
          v-on:add_button="handleShowCreatePurchaseOrder"
          v-on:main_action="handleAction"
          v-on:main_edit="handleEdit"
          v-on:main_list="handleList"
          v-on:main_delete="handleDelete"
          v-on:main_cancel="handleCancel"
          v-on:handlePrint="handlePrint"
          v-on:handlePrintDropdown="handlePrintDropdown"
          :title="table_title"
          :table_data="table_data"
          :table_column="table_column"
          :action_button="true"
          :edit_button="false"
          :view_button="false"
          :delete_button="false"
          :print_button="false"
          :print_btn_dropdown="false"
          :cancel_button="false"
          :flat_status="true"
          :bordered_status="true"
          v-on:receiveRequestTable="handleTableChange"
          v-on:onPrintSn="handlePrintSnMain"
          />

        </div>
      </div>
    </div>
  </div>


  <q-dialog v-model="show_outlet_dialog" persistent position="top">
    <q-card style="width: 700px; max-width: 98vw;text-align:center;margin-top: 5%;">

      <q-card-section class=" row theme_color dialog_header" style="padding: 0px;">
          <div class="text-subtitle1 header_text" style="margin-top: 5px;">Outlet (Not Record Excel Yet)<br></div><!--Purchase Order Detail-->
          <q-space />
          <q-btn icon="close" flat round dense @click="close()" :disable="false"/>
      </q-card-section>

      <q-card-section>
        <!-- <span class="q-ml-sm custom_selection_font">{{general_body}}</span> -->
        <!-- <span>Are you sure to delete this line?</span> -->

        <!-- {{ this.active_payload }} -->
        <div class="row">
          <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6" style="padding-right: 5px;">

            <Input
            :autofocusclick="true"
            :label="'Outlet (Not Record Excel Yet)'"
            :no_label="false"
            :readonly="true"
            v-on:change="handleChange"
            v-model="active_payload.outlet"
            :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text" />

          </div>

          <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6" style="padding-left: 5px;">

            <Input
            :autofocusclick="true"
            :label="'IP (Not Record Excel Yet)'"
            :no_label="false"
            :readonly="true"
            v-on:change="handleChange"
            v-model="active_payload.ip"
            :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text" />

          </div>


        </div>
        

        
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn flat label="OK" color="primary" @click="handleDeleteLine" />
      </q-card-actions>

      <q-inner-loading
        :showing="deleteLoading"
        color="primary"
      />
    </q-card>
  </q-dialog>


</template>

<script>
import Input from 'src/components/ERP/Base/Input'
import SelectFilter from 'src/components/ERP/Base/SelectFilter'
import LabelInputHorizontal from 'src/components/ERP/General/LabelInputHorizontal'
import SalesTable from 'src/components/ERP/Sales/SalesTable'
import Title from 'src/components/ERP/General/Title'
import LabelSelectHorizontal from 'src/components/ERP/General/LabelSelectHorizontal'
import LabelMultiSelectHorizontal from 'src/components/ERP/General/LabelMultiSelectHorizontal'
import LabelDatepickerHorizontal from 'src/components/ERP/General/LabelDatepickerHorizontal'
import LabelSelectFilterHorizontal from 'src/components/ERP/General/LabelSelectFilterHorizontal'
import Button_icon from 'src/components/ERP/Base/Button_icon'
import { Notify } from "quasar";
import Select from 'src/components/ERP/Base/Select'
import Radio from 'src/components/ERP/Base/Radio';
import Table from 'src/components/ERP/Document/Table'

export default{
  data(){
    return{
      filter_status: false,
      search: "",
      supcus: "",
      status: "",
      status_options: [
        {
          label: "All",
          value: [1,0]
        },
        {
          label: "Posted",
          value: [1]
        },
        {
          label: "Pending",
          value: [0]
        },
      ],
      sort_type_options: [
        {
          label: "Ascending",
          value: "Asc"
        },
        {
          label: "Descending",
          value: "Desc"
        }
      ],
      sort_by_options: [],
      outlet_options: [],
      outlet_guid: [],
      select_options: [],
      filter_options: [],
      filter: {
        pagination: 5,
      },
      retailer_guid: sessionStorage.getItem("retailer_guid") != "" && sessionStorage.getItem("retailer_guid") != "null" && sessionStorage.getItem("retailer_guid") != null ? sessionStorage.getItem("retailer_guid") : [],
      user_name: sessionStorage.getItem("user_name") != "" && sessionStorage.getItem("user_name") != "null" && sessionStorage.getItem("user_name") != null ? sessionStorage.getItem("user_name") : [],
      language: sessionStorage.getItem("language") != "" && sessionStorage.getItem("language") != "null" && sessionStorage.getItem("language") != null ? sessionStorage.getItem("language") : [],
      currency_sign: sessionStorage.getItem("currency_sign") != "" && sessionStorage.getItem("currency_sign") != "null" && sessionStorage.getItem("currency_sign") != null ? sessionStorage.getItem("currency_sign") : [],
      table_column: [],
      table_data: [],
      active_delete_json: {},
      delete_confirmation: false,
      deleteLoading: false,
      page_function: this.$route.name,
      results: [],
      filter_transmain: false,
      miniState_main: false,
      showNext: true,
      supcus_options: [],
      show_outlet_dialog: false,
      active_payload: {},
    }
  },
  components:{
      Input,
      SelectFilter,
      LabelInputHorizontal,
      SalesTable,
      Title,
      // LabelSelectHorizontal,
      // LabelMultiSelectHorizontal,
      // LabelDatepickerHorizontal,
      LabelSelectFilterHorizontal,
      Button_icon,
      Select,
      Radio,
      Table,
  },
  computed: {
    dbComponentBehavior() {
      return this.$store.getters['dbComponentBehavior/byLanguage']('erp')
    },
  },
  methods: {
    handleShowSidebar()
      {
        this.miniState_main = !this.miniState_main;
        this.$emit("clickSidebar", this.miniState_main);
      },
      handleShowFilter()
      {
        this.filter_transmain = true;
        this.filter = {
          pagination: this.filter.pagination,
          sort_type: this.ori_params.params.sort_type,
          sort_by: this.ori_params.params.sort_by,
          total_row: this.table_data.data.count,
          from: this.ori_params.params.offset + 1,
          to: this.ori_params.params.offset + this.table_data.data.results.length,
          pagination_options: [
            {
              label: 5,
              value: 5,
            },
            {
              label: 10,
              value: 10,
            },
            {
              label: 20,
              value: 20,
            },
            {
              label: 50,
              value: 50,
            },
            {
              label: 'All',
              value: 9999999,
            },
          ],
        }
      },
      handleClickRefno(refno)
      {
        console.log('page_function',this.page_function)
        this.$router.push({
            name: "View" + this.page_function,
            query: {  refno: refno  },
        });
      },
      handleList(newVal)
      {
        this.$router.push({
            name: "View" + this.page_function,
            // query: {  header_id: payload.transmain_guid  },
        });
      },
      async handlePrintSnMain(col, props)
      {
        var main_id = props.transmain_guid;
        var outlet_guid = props.outlet_guid.outlet_guid;

        var payload = {
          params: {
            outlet_guid: outlet_guid,
            trans_main: main_id,
            complete: 0
          }
        }

        var row = await this.getSn(payload);

        if(row.length == 0)
        {
          this.showNotify('negative', 'No SN under this itemcode')
          return;
        }

        var lot_numbers = [];

        for(var index in row)
        {
            lot_numbers.push(row[index].lot_number)
        }

        this.$router.push({
          name: "PrintSn",
          query: {
            from: 'gr',
            id: lot_numbers,
            col: col
          }
        });
      },
      handleCancel(){
        console.log('handleCancel');
      },
      async handleDeleteLine(){
        this.deleteLoading = true;

        var payload = {
          RefNo: this.active_delete_json.RefNo,
          language: this.language
        }

        var data = {};

        if(this.page_function == 'Adjustment')
        {

          await this.$store.dispatch('adjustment/trigger_delete_adj', payload).then(() => {
            data = JSON.parse(JSON.stringify(this.$store.getters['adjustment/get_adj_status']));
          });
        }
        else if(this.page_function == 'SalesInvoice')
        {
          await this.$store.dispatch('purchase/trigger_delete_grmain', payload).then(() => {
            data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_grmain_status']));
          });
        }
        else if(this.page_function == 'DebitNote')
        {
          await this.$store.dispatch('purchase/trigger_delete_dn', payload).then(() => {
            data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_dn_status']));
          });
        }

        if(data.status == "success")
        {
          this.table_function(this.ori_params);
          this.showNotify("positive","Delete successfully");
          this.delete_confirmation = false;
          this.deleteLoading = false;
        }
        else
        {
          var show_error = "";

          var error_response = data.response;

          Object.keys(error_response).forEach((loop_index)=>{
            if(loop_index !== 'status_code')
            {
              var temp_error = {};
              var error_message = "";
              Object.keys(error_response[loop_index]).forEach((header,cindex)=>{
                  error_message = error_response[loop_index];
              });
              temp_error = loop_index + " - " + error_message + '<br>';
              show_error += temp_error;
            }
          });//close foreach error message

          this.showNotify('negative', show_error);
          this.deleteLoading = false;
        }
      },
      handleDelete(payload){
        this.active_delete_json = payload;
        this.delete_confirmation = true;
      },
      handlePrint(newVal){
        this.$router.push({
          name: "Print",
          query: {
            from: 'Header',
            type: (this.page_function == 'Adjustment' ? 'SO' : this.page_function == 'SalesInvoice' ? 'SI' : this.page_function == 'Adjustment' ? 'SO' : this.page_function == 'SalesInvoice' ? 'SI' : 'IS'),
            id: newVal.transmain_guid
          }
        });
      },
      handlePrintDropdown(newVal,value)
      {
        this.$router.push({
          name: "Print",
          query: {
            from: 'Header',
            type: value,
            id: newVal.transmain_guid
          }
        });
      },
      handleConvert(){

        if(this.page_function == 'SalesInvoice')
        {
          this.$router.push("CreateSalesInvoice");
        }
        else if(this.page_function == 'SalesInvoice')
        {
          if(newVal == 'SO')
          {
            this.$router.push({ name: "ConvertSOtoSI" });
          }
          else if(newVal == 'IS')
          {
            this.$router.push({ name: "ConvertIStoSI" });
          }
        }
      },
      handleShowCreateAdjustment(){
        this.$router.push({ name: "Create" + this.page_function });
      },

      handleAction: function(payload)
      {

        this.active_payload = payload;
        this.show_outlet_dialog = true;
        
        // this.$router.push({
        //     name: "Edit" + this.page_function,
        //     query: {  refno: payload.RefNo  },
        // });
      },
      handleFilter()
      {
        if(this.filter.sort_type=='Desc')
        {
          this.ori_params.params.ordering = '-' + this.filter.sort_by;
        }
        else
        {
          this.ori_params.params.ordering = this.filter.sort_by;
        }

        this.table_function(this.ori_params);
        this.filter_transmain = false;
      },
      changePagination(newVal)
      {
        var offset = this.ori_params.params.offset;
        var limit = this.ori_params.params.limit;

        if(newVal == 'next')
        {
          offset = offset + limit;
        }
        else if(newVal == 'back')
        {
          offset = offset - limit;
        }

        if(offset < 0)
        {
          offset = 0;
        }

        this.showNext = this.ori_params.params.offset + this.ori_params.params.limit >= this.table_data.data.count

        this.ori_params.params.offset = offset;
        this.ori_params.params.limit = limit;

        this.table_function(this.ori_params);
      },
      handleTableChange: function(newVal)
      {
            var new_params = this.$pluginsTableParams(newVal)

            var payload = {
                params : new_params
            };

            this.ori_params = payload;
            this.table_function(payload);
      },
      async table_function(ori_payload){

          this.showAddLoading = true;
          var payload = ori_payload.params;
          var offset = payload.offset;
          payload.skip = offset;
          payload.RefNo = this.search;
          payload.language = this.language;

          if(payload.ordering[0] == "-")
          {
            payload.sort_by = payload.ordering.slice(1);
            payload.sort_type = "Desc"
          }
          else
          {
            payload.sort_by = payload.ordering
            payload.sort_type = "Asc"
          }

          if(payload.RefNo != "" || this.supcus != "")
          {
            this.filter_status = true;
          }
          else
          {
            this.filter_status = false;
          }


          var table_column = [
              {
                  name: 'action',
                  required: true,
                  label: 'Action (Not Record Excel Yet)',
                  align: 'center',
                  sortable: false,
                  field: 'action',
                  format_child: '',
                  tooltip: '',
                  "headerStyle": "max-width: 70px; text-align: center;",
              },
              {
                  name: 'Outlet',
                  required: true,
                  label: 'Outlet (Not Record Excel Yet)',
                  align: 'left',
                  sortable: false,
                  field: 'outlet',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'IP',
                  required: true,
                  label: 'IP (Not Record Excel Yet)',
                  align: 'left',
                  sortable: false,
                  field: 'ip',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
          ];

          this.table_column = table_column;

          var data = {};

          payload.language = this.language;

            
          var count = 3;
          var results = [
            {
              outlet: 'Outlet A',
              ip: '127.0.0.1'
            },
            {
              outlet: 'Outlet B',
              ip: '127.0.0.1'
            },
            {
              outlet: 'Outlet C',
              ip: '127.0.0.1'
            }
          ]


          this.table_data = {
              "data": {
                    "count": data.data ? data.data.total_row : count,
                    "next": null,
                    "previous": null,
                    "results": data.data ? data.data.detail : results
                }
            };

            this.results = data.data.detail;
            this.showNext = this.ori_params.params.offset + this.ori_params.params.limit >= this.table_data.data.count;
            this.filter.total_row = this.table_data.data.count;
            var from = this.ori_params.params.offset+1;
            var to = this.ori_params.params.offset + this.table_data.data.results.length;
            this.filter.from = from;
            this.filter.to = to;
            this.showAddLoading = false;


      },
      async getSn(payload)
      {
        return await this.$store.dispatch('masterfile/trigger_ts_sn_parent', payload).then(() => {
          var data = JSON.parse(JSON.stringify(this.$store.getters['masterfile/get_ts_sn_parent']));
          var results = data.data.results;
          return results;
        });
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
      handleReceiveFilter(newVal)
      {
        if(!newVal)
        {
            this.search = "";
            this.supcus = "";

            this.filter_status = false;

            this.table_function(this.ori_params);
        }
      },
      handleChangeOptions(){
        this.table_function(this.ori_params);
      },
      showNotify(type, message) {
          Notify.create({
              type: type,
              message: message,
              timeout: 1000,
              position: 'top',
              html: true,
          })
      },
  },
  async created() {
    var sort_by_options = [];

    if(this.page_function == 'Adjustment')
    {
      sort_by_options = [
        {
          label: 'Posted',
          value: 'BillStatus'
        },
        {
          label: 'RefNo',
          value: 'RefNo'
        },
        {
          label: 'P/O Date',
          value: 'PODate'
        },
        {
          label: 'Delv Date',
          value: 'DeliverDate'
        },
        {
          label: 'Total Amount',
          value: 'Total'
        },
        {
          label: 'Supplier Code',
          value: 'SCode'
        },
        {
          label: 'Supplier Name',
          value: 'SName'
        },
        {
          label: 'Location',
          value: 'Location'
        },
        {
          label: 'Remark',
          value: 'Remark'
        },
        {
          label: 'Last Stamp',
          value: this.page_function == 'PurchaseOrder' ? 'laststamp' : 'LastStamp'
        },
      ]
    }
    else if(this.page_function == 'GoodsReceiving')
    {
      sort_by_options = [
        {
          label: 'RefNo',
          value: 'RefNo'
        },
        {
          label: 'GRDate',
          value: 'GRDate'
        },
        {
          label: 'Doc Date',
          value: 'DocDate'
        },
        {
          label: 'Total Amount',
          value: 'Total'
        },
        {
          label: 'Supplier Code',
          value: 'Code'
        },
        {
          label: 'Supplier Name',
          value: 'Name'
        },
        {
          label: 'InvNo',
          value: 'InvNo'
        },
        {
          label: 'DONo',
          value: 'DONo'
        },
        {
          label: 'CalcCost',
          value: 'CalcCost'
        },
        {
          label: 'consign',
          value: 'consign'
        },
        {
          label: 'InvRefno',
          value: 'InvRefno'
        },
        {
          label: 'SubDeptCode',
          value: 'SubDeptCode'
        },
        {
          label: 'Remark',
          value: 'Remark'
        },
        {
          label: 'Location',
          value: 'Location'
        },
        {
          label: 'Received by',
          value: 'Receivedby'
        },
        {
          label: 'Posted by',
          value: 'postby'
        },
        {
          label: 'Posted on',
          value: 'postdatetime'
        },
        {
          label: 'Last Stamp',
          value: 'LastStamp'
        }
      ]
    }
    else if(this.page_function == 'DebitNote')
    {
      sort_by_options = [
        {
          label: 'RefNo',
          value: 'RefNo'
        },
        {
          label: 'SubDeptCode',
          value: 'SubDeptCode'
        },
        {
          label: 'Doc Date',
          value: 'DocDate'
        },
        {
          label: 'Location',
          value: 'Location'
        },
        {
          label: 'Amount',
          value: 'Amount'
        },
        {
          label: 'Supplier Code',
          value: 'Code'
        },
        {
          label: 'Supplier Name',
          value: 'Name'
        },
        {
          label: 'Doc No',
          value: 'DocNo'
        },
        {
          label: 'CN #',
          value: 'sup_cn_no'
        },
        {
          label: 'CN Date',
          value: 'sup_cn_date'
        },
        {
          label: 'Remark',
          value: 'Remark'
        },
        {
          label: 'Issued by',
          value: 'Issued by'
        },
        {
          label: 'Posted by',
          value: 'postby'
        },
        {
          label: 'Posted on',
          value: 'postdatetime'
        },
        {
          label: 'Last Stamp',
          value: 'LastStamp'
        }
      ]
    }

    this.sort_by_options = sort_by_options;

    var mobile = this.$q.screen.width < 600;

    if(mobile)
    {
      var table_newVal = {
        filter: undefined,
        pagination: {
          descending: "",
          page: 1,
          rowsNumber: 100,
          rowsPerPage: 0,
          sortBy: ""
        }
      }

      this.handleTableChange(table_newVal);
    }

    var supcus_ary = [];

    var payload = {
      params: {
        type: 'S',
        skip: '0',
        limit: 999999,
        language: this.language,
      }
    }

    await this.$store.dispatch('purchase/trigger_read_supcus_all', payload).then(() => {
      var data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_read_supcus_all']));

      console.log(data)

      for(var i in data.data)
      {
        var result = data.data[i];

        var obj = {
          label: result.Code + ' - ' + result.Name,
          value: result.Code,
          type: payload.params.type
        }

        supcus_ary.push(obj)
      }

      this.supcus_options = supcus_ary;
    });
  }
}

</script>


<style scoped>
.dialog_action1
{
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 55%; /* Adjust the desired width */
  height: 40px; /* Adjust the desired height */
  border-radius: 15px;
  background-color: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}
.header_text
{
  padding-left: 16px;
  padding-right: 16px;
  font-weight: bold;
}

* >>> .q-btn-dropdown__arrow
{
  display: none;
}

.card_design
{
  height: 100px;
  background-color: white;
  color:black;
}

@media all and (max-width: 1023px) {
  .card_design
  {
    min-width: 100%;
  }
}
.button_upload_wrapper
{
    margin-top: 1px;
    float: right;
}

.create_group_button
{
    padding-left: 10px;
    padding-right: 10px;
}

.upload_container
{
    padding: 10px;
    padding-top: 0px;
}

.card_section_two
{
    margin-top: 10px;
}

@media all and (min-width: 600px) {
  .card_section_second
  {
      padding-left: 20px;
      padding-right: 20px;
  }
}

@media all and (max-width: 599px) {
  .card_section_second
  {
      padding: 10px;
  }
}

.card_section_second_content
{
    border: 2px solid #ababab;
    /* height: 60vh; */
    min-height: 60vh;
    /* overflow-y: scroll; */
}

/* width */
.card_section_second_content::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

/* Track */
.card_section_second_content::-webkit-scrollbar-track {
  /* box-shadow: inset 0 0 5px grey;  */
  border-radius: 10px;
}

/* Handle */
.card_section_second_content::-webkit-scrollbar-thumb {
  /* background: #8070d4; */
  background: #ababab;
  border-radius: 10px;
}

/* Handle on hover */
.card_section_second_content::-webkit-scrollbar-thumb:hover {
  background: #ababab;
}

.table_wrapper
{
    padding: 18px;
}

* >>> .q-table__container
{
    padding: 0px;
    border-radius: 0px;
    padding: 0px !important;
}

/* .q-form
{
  width: 100%;
} */

.q-card
{
  width: 700px;
  max-width: 80vw;
}

@media all and (min-width: 1023px) {

    .custom_dialog
    {
        margin-top: 30px !important;
    }
}

.input_wrapper
{
  margin-top:2px;
}

.input_wrapper_right
{
  padding-right: 5px;
}

.dialog_font
{
  font-weight: bold;
  font-size: 15px;
}

.dialog_separator
{
  padding-top: 10px;
}

.upload
{
    margin: 10px;
    padding-top: 10px;
    padding-bottom: 0px;
}

.upload_separator_first
{
    border-bottom: 1px solid #DEE1E6;
    margin: 10px;
    padding-top: 10px;
    padding-bottom: 0px;
}

.upload_separator
{
    border-bottom: 1px solid #DEE1E6;
    margin: 10px;
    padding-top: 10px;
    padding-bottom: 30px;
}

.custom_cancel_button
{
    border: 1px solid black;
}
</style>
