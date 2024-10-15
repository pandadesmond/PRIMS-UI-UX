<template>
  <div class="card_sides">
    <q-card v-if="$q.screen.width > 599" style="max-height: 100%;">
      <q-card-section class="theme_color dialog_header header_top">
          <div class="intermediate"/>
          <div v-if="page_function == 'CreateSalesInvoice'" class="text-subtitle1 header_text">Sales Invoice</div>
          <div v-if="page_function == 'ConvertSOtoSI'" class="text-subtitle1 header_text">Convert SO to SI</div>
          <div v-if="page_function == 'ConvertIStoSI'" class="text-subtitle1 header_text">Convert IS to SI</div>
      </q-card-section>

      <q-card-section class="upload_container content_body_dialog">
        <q-form ref="save_form">
          <div class="row upload_separator_first">
            <div v-if="page_function == 'CreateSalesInvoice'" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator q-px-sm" >
              <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
                  <Input
                  :autofocusclick="true"
                  :no_label="false"
                  label="Invoice #"
                  :readonly="showAddButton"
                  v-on:change="handleChange"
                  v-model="json.InvNo"
                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text" />
                </div>
              </div>
            </div>

            <div v-if="page_function == 'CreateSalesInvoice'" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator q-px-sm" >
              <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
                  <Input
                  :autofocusclick="true"
                  :no_label="false"
                  label="D/O #"
                  :readonly="showAddButton"
                  v-on:change="handleChange"
                  v-model="json.DONo"
                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text" />
                </div>
              </div>
            </div>

            <!-- <div v-if="page_function == 'ConvertSOtoSI' || page_function == 'ConvertIStoSI'" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator q-px-sm" >
              <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
                  <SelectFilter
                  :readonly="showAddButton"
                  :no_label="true"
                  v-model:pass_value="json.agent_guid"
                  :placeholder="json.agent_guid ? '' : 'Select Sales Person'"
                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.select"
                  :options="agent_options"
                  v-on:receiveChange="handleChangeAgent"
                  />
                </div>
              </div>
            </div>

            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator q-px-sm">
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
                      <Input
                      :icon_append="filter_status ? 'clear' : ''"
                      v-on:password_method="clear()"
                      :no_label="true"
                      :readonly="false"
                      v-on:receiveChange="handleChangeOptions"
                      v-model="search"
                      :placeholder="'Search'"
                      :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                    </div>

                    <div dir="rtl" class="a button_upload_wrapper col-xs-12 col-sm-12 col-md-1 col-lg-1 col-xl-1">
                      <Button_icon class="q-px-lg" :flat="true" :font_color="'white'" :color="'#094161'" :text="'Search'" :outline="false" size="13px"
                      v-on:receiveClick="handleChangeOptions"/>
                    </div>
                </div>
            </div> -->
          </div>

          <div class="row ">
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <ItemTable
                v-on:onRowClick="handleRowClick"
                :row_per_page="[5,10,20,50,0]"
                :top_button="false"
                v-on:add_button="addButtonCreate"
                v-on:main_action="handleAction"
                v-on:main_edit="handleEdit"
                v-on:main_list="handleList"
                v-on:main_delete="handleDelete"
                :title="table_title"
                :table_data="table_data"
                :table_column="table_column"
                :action_button="true"
                :edit_button="false"
                :view_button="false"
                :delete_button="false"
                :flat_status="true"
                :bordered_status="true"
                v-on:receiveRequestTable="handleTableChange"
                />
              </div>
          </div>
        </q-form>
      </q-card-section>

      <q-card-actions class="dialog_action" align="right">
          <Button_icon :flat="true" :font_color="'black'" :color="'white'" :text="'BACK'" :outline="true" size="15px" class="custom_cancel_button" @click="back()" />

          <Button_icon :flat="true" :font_color="'white'" :color="'#094161 '" :text="'ENTER'" :outline="false" size="15px" @click="handleConvertPO"/>
      </q-card-actions>

      <q-inner-loading
        :showing="showAddLoading"
        color="primary"
      />

    </q-card>

    <q-card v-else style="min-height: 100vh;">
      <q-card-section class="header_top_mobile">
        <Button_icon :disable="showAddLoading" :big_round="true" :flat="true" :font_color="'#928f8f'" :color="'rgba(255, 255, 255, 0.5)'" :icon="'arrow_back_ios'" :outline="true" size="12px" class="custom_back_button" @click="back()" />
        <div class="text-subtitle1 header_text" style="padding-top: 10px;">Sales Invoice</div>
      </q-card-section>

      <q-card-section class="upload_container content_body_dialog">
        <q-form ref="save_form">
          <div class="row upload_separator_first_mobile">
            <div v-if="page_function == 'CreateSalesInvoice'" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator q-px-sm" >
              <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
                  <span class="mobile_font">Invoice #</span>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
                  <Input
                  :autofocusclick="true"
                  :no_label="true"
                  :readonly="showAddButton"
                  v-on:change="handleChange"
                  v-model="json.InvNo"
                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text" />
                </div>
              </div>
            </div>

            <div v-if="page_function == 'CreateSalesInvoice'" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator q-px-sm" >
              <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
                  <span class="mobile_font">D/O #</span>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
                  <Input
                  :autofocusclick="true"
                  :no_label="true"
                  :readonly="showAddButton"
                  v-on:change="handleChange"
                  v-model="json.DONo"
                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text" />
                </div>
              </div>
            </div>
          </div>

          <div class="row ">
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <ItemTable
                v-on:onRowClick="handleRowClick"
                :row_per_page="[5,10,20,50,0]"
                :top_button="false"
                v-on:add_button="addButtonCreate"
                v-on:main_action="handleAction"
                v-on:main_edit="handleEdit"
                v-on:main_list="handleList"
                v-on:main_delete="handleDelete"
                :title="table_title"
                :table_data="table_data"
                :table_column="table_column"
                :action_button="true"
                :edit_button="false"
                :view_button="false"
                :delete_button="false"
                :flat_status="true"
                :bordered_status="true"
                v-on:receiveRequestTable="handleTableChange"
                />
              </div>
          </div>
        </q-form>
      </q-card-section>

      <q-card-actions class="dialog_action_mobile" align="right">
          <!-- <Button_icon :flat="true" :font_color="'black'" :color="'white'" :text="'BACK'" :outline="true" size="15px" class="custom_cancel_button" @click="back()" />
          <Button_icon :flat="true" :font_color="'white'" :color="'#094161 '" :text="'ENTER'" :outline="false" size="15px" @click="handleConvertPO"/> -->

              <Button_icon class="full-width" style="height: 30px;" :small_round="true" :text="'Simple Invoice'" :flat="false" :font_color="'white'" :color="'primary'" :outline="false" size="13px" @click="handleConvertPO"/>

      </q-card-actions>

      <q-inner-loading
        :showing="showAddLoading"
        color="primary"
      />

    </q-card>

  </div>
</template>

<script>
import Input from 'src/components/ERP/Base/Input'
import Select from 'src/components/ERP/Base/Select'
import Datepicker from 'src/components/ERP/Base/Datepicker'
import Checkbox from 'src/components/ERP/Base/Checkbox'
import Button_icon from 'src/components/ERP/Base/Button_icon'
import ItemTable from 'src/components/ERP/Purchase/ItemTable'
import { Notify } from "quasar";
import SelectFilter from 'src/components/ERP/Base/SelectFilter'


export default{
  data() {
    return {
      retailer_guid: sessionStorage.getItem("retailer_guid") != "" && sessionStorage.getItem("retailer_guid") != "null" && sessionStorage.getItem("retailer_guid") != null ? sessionStorage.getItem("retailer_guid") : [],
      user_name: sessionStorage.getItem("user_name") != "" && sessionStorage.getItem("user_name") != "null" && sessionStorage.getItem("user_name") != null ? sessionStorage.getItem("user_name") : [],
      language: sessionStorage.getItem("language") != "" && sessionStorage.getItem("language") != "null" && sessionStorage.getItem("language") != null ? sessionStorage.getItem("language") : [],
      table_column: [],
      table_data: [],
      showAddLoading: false,
      search: "",
      selected_po: {},
      page_function: this.$route.name,
      filter_status: false,
      json: {},
      agent_options: [],
    }
  },
  components:{
    Input,
    ItemTable,
    Button_icon,
    // SelectFilter,
  },
  computed: {
    dbComponentBehavior() {
      return this.$store.getters['dbComponentBehavior/byLanguage']('erp')
    },
  },
  async created ()
  {},
  methods: {
      clear()
      {
        this.search = '';
        this.handleChangeOptions();
        this.filter_status = false;
      },
      async createSichild(payload)
      {
        return await this.$store.dispatch('sales/trigger_create_ts_sichild', payload).then(() => {
          var data = JSON.parse(JSON.stringify(this.$store.getters['sales/get_ts_sichild_status']))
          return data;
        });
      },
      async handleConvertPO(){
        this.showAddLoading = true;

       // var validated = await this.validate_form('save_form');
       var form_name = 'save_form';
        var error = 0;
        await this.$refs[form_name].validate().then(valid => {
            if (!valid) {
                error = 1;
            }
        });

        var validated = error == 1 ? false : true;
        if(!validated)
        {
            this.showNotify("negative","Please make sure all field is correct.");
            this.showAddLoading = false;
            return;
        }


        if(Object.keys(this.selected_po).length == 0){
          if(this.page_function == 'CreateSalesInvoice')
          {
            this.showNotify("negative","No SO selected.");
          }
          else if(this.page_function == 'ConvertSOtoSI')
          {
            this.showNotify("negative","No SO selected.");
          }
          else if(this.page_function == 'ConvertIStoSI')
          {
            this.showNotify("negative","No IS selected.");
          }

          this.showAddLoading = false;
          return;
        }

        // var results = this.table_data.data.results;

        // var filter_po = results.filter((entry) => {
        //   return entry.po_refno == this.po_refno;
        // });

        // var po = filter_po[0];
        var po = this.selected_po;

        var po_refno = this.selected_po.RefNo;
        var InvNo = this.json.InvNo;
        var DONo = this.json.DONo;
        var Location = this.selected_po.Location;

        var payload = {
          Po_RefNo: po_refno,
          InvNo: InvNo,
          DONo: DONo,
          Location: Location,
          Receivedby: this.user_name,
          language: this.language
        };

        var data = {};

        if(this.page_function == 'CreateSalesInvoice')
        {
          await this.$store.dispatch('purchase/trigger_simple_receive', payload).then(() => {
            data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_simple_receive']));
          });
        }
        else if(this.page_function == 'ConvertSOtoSI')
        {
          payload.remark = po.remark;
          payload.agent_guid = this.json.agent_guid;

          await this.$store.dispatch('sales/trigger_create_ts_simain', payload).then(() => {
            data = JSON.parse(JSON.stringify(this.$store.getters['sales/get_ts_simain_status']));
          });
        }
        else if(this.page_function == 'ConvertIStoSI')
        {
          payload.agent_guid = this.json.agent_guid;
          payload.transmain_guid = po.transmain_guid;
          console.log(payload)

          await this.$store.dispatch('sales/trigger_convert_dp_si', payload).then(async () => {
            var data = JSON.parse(JSON.stringify(this.$store.getters['sales/get_convert_dp_si']));
            console.log(data)

            if(data.status == 'success')
            {
              var new_payload = {
                transmain_guid: data.response.document,
                pass_json: {
                  agent_guid: this.json.agent_guid
                }
              }

              await this.$store.dispatch('sales/trigger_edit_ts_simain', new_payload).then(() => {
                var new_data = JSON.parse(JSON.stringify(this.$store.getters['sales/get_ts_simain_status']));
              });

              this.showAddLoading = false;
              this.showNotify('positive', data.response.message);
              this.$router.push({ name: 'EditSalesInvoice', query: { header_id: data.response.document } })
            }
            else
            {
              // console.log(data)
              var show_error = data.response.message;

              this.showNotify('negative', show_error);

              this.showAddLoading = false;
            }
          });

          return;
        }

        var status = data.status;

        if(status == "success")
        {
          if(this.page_function == 'CreateSalesInvoice')
          {
            this.showNotify('positive', 'Converted Successfully.')
            this.$router.push({ name: 'EditSalesInvoice', query: { refno: data.response.main.RefNo } })
          }
          else if(this.page_function == 'ConvertSOtoSI')
          {
            this.$router.push({ name: 'EditSalesInvoice', query: { header_id: grmain_guid } })
          }

          this.showAddLoading = false;
        }
        else
        {
          var error_response = data.response;
          var show_error = "";

          Object.keys(error_response).forEach((loop_index)=>{
            if(loop_index !== 'status_code')
            {
              var temp_error = {};
              var error_message = "";
              Object.keys(error_response[loop_index]).forEach((header,cindex)=>{
                  error_message = error_response[loop_index];
              });
              temp_error = loop_index + " - " + error_message;
              show_error += temp_error  +"<br />";
            }
          });//close foreach error message

          this.showNotify('negative', show_error);

          this.showAddLoading = false;
        }
      },
      handleChangeOptions(){
        this.table_function(this.ori_params);
      },
      async handleRowClick(payload){
          var requests = this.table_data.data.results.map(async(row, index)=>{
            row.selected = false;
          });

          await Promise.all(requests);

          payload.selected = true;
          this.selected_po = payload;
      },
      back(){
        if(this.page_function == 'CreateSalesInvoice')
        {
          this.$router.push("SalesInvoice");
        }
        // else if(this.page_function == 'ConvertSOtoSI')
        // {
        //   this.$router.push("SalesInvoice");
        // }
        // else if(this.page_function == 'ConvertIStoSI')
        // {
        //   this.$router.push("SalesInvoice");
        // }
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
      async table_function(payload){
          var table_column = [
              // {
              //     name: 'action',
              //     required: true,
              //     label: 'Actions',
              //     align: 'left',
              //     sortable: true,
              //     field: 'action',
              //     format_child: '',
              //     tooltip: ''
              // },
              {
                  name: 'RefNo',
                  required: true,
                  label: 'Refno',
                  align: 'left',
                  sortable: true,
                  field: 'RefNo',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'loc_group',
                  required: true,
                  label: 'Branch',
                  align: 'left',
                  sortable: false,
                  field: 'loc_group',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'Location',
                  required: true,
                  label: 'Location',
                  align: 'left',
                  sortable: true,
                  field: 'Location',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'SCode',
                  required: true,
                  label: 'Supplier Code',
                  align: 'left',
                  sortable: false,
                  field: 'SCode',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'SName',
                  required: true,
                  label: 'Supplier Name',
                  align: 'left',
                  sortable: false,
                  field: 'SName',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'PODate',
                  required: true,
                  label: 'P/O Date',
                  align: 'left',
                  sortable: true,
                  field: 'PODate',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'DeliverDate',
                  required: true,
                  label: 'Delv Date',
                  align: 'left',
                  sortable: true,
                  field: 'DeliverDate',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'IssueStamp',
                  required: true,
                  label: 'Issue Stamp',
                  align: 'left',
                  sortable: true,
                  field: 'IssueStamp',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'IssuedBy',
                  required: true,
                  label: 'Issued By',
                  align: 'left',
                  sortable: true,
                  field: 'IssuedBy',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'laststamp',
                  required: true,
                  label: 'Last Stamp',
                  align: 'left',
                  sortable: true,
                  field: 'laststamp',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },

          ];

          this.table_column = table_column;

          if(payload.params.ordering == "")
          {
            payload.params.ordering = "-updated_at"
          }

          if(payload.params.search != "")
          {
            this.filter_status = true;
          }

          var data = {};

          if(this.page_function == 'CreateSalesInvoice')
          {
            await this.$store.dispatch('sales/trigger_read_so_list_for_convert_si', payload).then(() => {
              data = JSON.parse(JSON.stringify(this.$store.getters['sales/get_read_so_list_for_convert_si']));
              var results = data.data;
              for(var i in results)
              {
                results[i].selected = false;
              }
              console.log('data',data)
            });
          }
          else if(this.page_function == 'ConvertSOtoSI')
          {
            await this.$store.dispatch('sales/trigger_get_ts_somain_parent', payload).then(() => {
              data = JSON.parse(JSON.stringify(this.$store.getters['sales/get_ts_somain_parent']));
              var results = data.data.results;

                Object.keys(results).forEach((index)=>{
                  results[index].selected = false;
                  var outlet = results[index].outlet_guid;
                  results[index].outlet_code = outlet.code;
                  var supplier = results[index].supcus_guid;
                  results[index].supplier_code = supplier.code;
                  results[index].supplier_name = supplier.name;
                  results[index].doc_date = results[index].transdate;
                });
            });
          }
          else if(this.page_function == 'ConvertIStoSI')
          {
            await this.$store.dispatch('sales/trigger_get_ts_dpmain_parent', payload).then(() => {
              data = JSON.parse(JSON.stringify(this.$store.getters['sales/get_ts_dpmain_parent']));
              var results = data.data.results;

                Object.keys(results).forEach((index)=>{
                  results[index].selected = false;
                  var outlet = results[index].outlet_guid;
                  results[index].outlet_code = outlet.code;
                  var supplier = results[index].supcus_guid;
                  results[index].supplier_code = supplier.code;
                  results[index].supplier_name = supplier.name;
                  // results[index].doc_date = results[index].transdate;
                });

                results = results.filter((entry)=>{
                  return entry.converted == 0;
                })

                data.data.results = results;
            });
          }

          var json2 = {};
          json2.results = data.data;
          var json3 = {};
          json3.data = json2;
          this.table_data = json3;
      },
      async validate_form(form_name = "")
      {
          var form_name = form_name;
          var error = 0;
          await this.$refs[form_name].validate().then(valid => {
              if (!valid) {
                  error = 1;
              }
          });

          var error = error == 1 ? false : true;
          //true is no error false is got error

          return new Promise((resolve, reject) => {
          // setTimeout(() => {
              resolve(error);
          // }, 2000);
          });

      },
      showNotify(type, message) {
          Notify.create({
              type: type,
              message: message,
              // timeout: 1000,
              position: 'center',
              html: true,
              actions: [
                { label: 'OK', color: 'white', handler: () => { } }
              ]
          })
      },
  },
}
</script>

<style scoped>
.header_top_mobile
{
  text-align: center;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 0px;
  padding-bottom: 0px;
}

.custom_back_button
{
  position: absolute;
  padding:0px;
  padding-left: 10px;
  top: 10px;
  left: 12px;
  z-index: 1;
}

* >>> tr
{
  cursor: pointer;
}
.dialog_action
{
  height: 55px;
  position: sticky;
  padding:0px;
  padding-right: 20px;
  padding-left: 20px;
  bottom: 0px;
  background-color: white;
}

.dialog_action_mobile
{
  height: 55px;
  position: fixed;
  left: 30px;
  right: 30px;
  padding:0px;
  bottom: 0px;
  background-color: white;
}

.header_top
{
  position: sticky;
  top: 50px;
  z-index: 2;
  padding:0px;
}

.intermediate
{
  padding: 0px;
  width: 100%;
  height: 5px;
  background-color:#ededed;
}

.header_text
{
  padding-left: 16px;
  padding-right: 16px;
  font-weight: bold;
}

@media all and (min-width: 1024px) and (max-width: 1366px){
  .a{
    margin-left: 50px;
  }
}

.button_upload_wrapper
{
    margin-top: 1px;
}

.card_sides
{
  padding-left: 10px;
  padding-right: 10px;
}

.upload_container
{
    padding: 10px;
    padding-top: 0px;
}

* >>> .q-table__container
{
    padding: 0px;
    border-radius: 0px;
    padding: 0px !important;
}

.card_section_two
{
    margin-top: 10px;
}

.card_section_second_content
{
    border: 2px solid #ababab;
    /* min-height: 60vh; */
    overflow-y: scroll;
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

/* .q-form
{
  width: 100%;
} */

.input_wrapper_right
{
  padding-right: 5px;
}

.input_wrapper_left
{
  padding-left: 5px;
}

.dialog_font
{
  font-weight: bold;
  font-size: 15px;
}

.dialog_separator
{
  padding-top: 5px;
}

.upload_separator_first
{
    /* border-bottom: 1px solid #DEE1E6; */
    margin: 10px;
    padding-top: 10px;
    padding-bottom: 0px;
}

.upload_separator_first_mobile
{
    /* border-bottom: 1px solid #DEE1E6; */
    margin: 10px;
    padding-bottom: 0px;
}

.upload_separator
{
    /* border-bottom: 1px solid #DEE1E6; */
    margin: 10px;
    /* padding-top: 10px; */
    padding-bottom: 30px;
}

.custom_cancel_button
{
    border: 1px solid black;
}

/* * >>> .q-table__top
{
  padding-right: 0px;
} */

/* .content_body_dialog
{
    height: 80vh;
    overflow-y: scroll;
} */

* >>> .q-field--disabled > .q-field__inner > .q-field__control
{
  background-color: #cccccc !important;
}
</style>
