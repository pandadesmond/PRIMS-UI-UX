<template>
  <div class="card_sides">
    <q-card v-if="$q.screen.width > 599" style="max-height: 100%;margin-top: 0%; border-radius: 8px">
      <q-card-section class="theme_color dialog_header header_top" style="height: 56px; padding: 14px 24px;">
          <!-- <div class="intermediate"/> -->
          <div v-if="page_function == 'SimpleReceive'" class="text-subtitle1 header_text">Simple Receive</div>
          <div v-if="page_function == 'ConvertSOtoSI'" class="text-subtitle1 header_text">Convert SO to SI</div>
          <div v-if="page_function == 'ConvertIStoSI'" class="text-subtitle1 header_text">Convert IS to SI</div>
      </q-card-section>

      <q-card-section class=" content_body_dialog"> <!--upload_container-->
        <q-form ref="save_form">
          <div class="row">
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
                class="itemtable_pagination"
                />
              </div>
          </div>
        </q-form>
      </q-card-section>

      

      <q-inner-loading
        :showing="showAddLoading"
        color="primary"
      />

    </q-card>
    <q-card-actions v-if="$q.screen.width > 599" class="dialog_action" > <!--align="right"  :text="'BACK'"-->
          <Button_icon :flat="true" :font_color="'#29292A'" :icon="'chevron_left'" :color="'white'"  :outline="true" size="14px" class="primary_navigation_button custom_primary_font" @click="back()" />
          <q-space/>
          <Button_icon :flat="true" :font_color="'white'" :color="'#1E90FF'" :text="'CREATE'" :outline="false" size="15px" class="custom_primary_button" @click="showSimpleReceive"/>
      </q-card-actions>

    <q-card v-else style="min-height: 100vh;">
      <q-card-section class="header_top">
        <Button_icon :disable="showAddLoading" :big_round="true" :flat="true" :font_color="'#928f8f'" :color="'rgba(255, 255, 255, 0.5)'" :icon="'arrow_back_ios'" :outline="true" size="12px" class="custom_back_button" @click="back()" />
        <div class="text-subtitle1 header_text" style="padding-top: 10px;">Goods Received Note</div>
      </q-card-section>

      <q-card-section class="upload_container content_body_dialog">
        <q-form ref="save_form">
          <!-- <div class="row upload_separator_first_mobile">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator q-px-sm" >
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

            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator q-px-sm" >
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
          </div> -->

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
        <Button_icon class="full-width dialog_done_button" :small_round="true" :text="'Simple Receive'" :flat="false" :font_color="'white'" :color="'primary'" :outline="false" size="16px" @click="showSimpleReceive"/>
      </q-card-actions>

      <q-inner-loading
        :showing="showAddLoading"
        color="primary"
      />

    </q-card>

    <q-dialog v-model="create_transmain" persistent :position="$q.screen.width > 599 ? 'top' : 'bottom'">
      <q-card v-if="$q.screen.width < 600" style="width: 700px; max-width: 98vw; margin-top: 5%;">
        <q-card-section class="row header_top_mobile">
          <div class="custom_close_button">
            <q-btn icon="close" flat round dense @click="close()" :disable="false"/>
          </div>
        </q-card-section>

        <q-card-section class="upload_container">
          <q-form ref="save_edit_pochild_form">
            <div class="row upload_separator_first">
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <div class="row input_wrapper_right">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div class="row dialog_separator">
                      <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 four_column_left">
                        <div class="row">
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
                            <div class="row">
                              <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                <span class="mobile_font">Invoice #</span>
                              </div>
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
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
                        </div>
                      </div>

                      <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 four_column_left">
                        <div class="row">
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
                            <div class="row">
                              <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                <span class="mobile_font">D/O #</span>
                              </div>
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </q-form>
        </q-card-section>

        <q-card-actions class="dialog_action" style="padding-left: 20px;">
          <div class="row full-width">
            <Button_icon class="full-width dialog_done_button" :small_round="true" :text="'Simple Receive'" :flat="false" :font_color="'white'" :color="'primary'" :outline="false" size="16px" @click="handleConvertPO()"/>
          </div>
        </q-card-actions>

        <q-inner-loading
          :showing="showAddLoading"
          color="primary"
        />
      </q-card>

      <q-card v-else style="width: 700px; max-width: 98vw; margin-top: 5%; border-radius:8px">
        <q-card-section class=" row theme_color dialog_header" style="height: 56px; padding: 8px 24px;">
            <div class="text-subtitle1 header_text" style="margin-top: 5px;">Simple Receive<br></div>
            <q-space />
            <q-btn icon="close" flat round dense @click="close()" :disable="false"/>
        </q-card-section>

        <q-card-section class=""><!--upload_container-->
          <q-form ref="save_edit_pochild_form">
            <div class="row upload_separator_first"> <!--bg-pink-2 -->
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <div class="row col-12" style="gap:16px; justify-items:center;">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <Input
                        :autofocusclick="true"
                        :no_label="false"
                        label="Invoice #"
                        :readonly="showAddButton"
                        v-on:change="handleChange"
                        v-model="json.InvNo"
                        :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text" />
                  </div>
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
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
            </div>
          </q-form>
        </q-card-section>

        <q-card-actions class="dialog_action" style="padding-right: 16px; padding-bottom:16px; padding-top:0px">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" align="right">
              <Button_icon :readonly="false" :flat="true" :font_color="'white'" :color="'#1E90FF'" :text="'CREATE'" class="custom_primary_button" :outline="false" size="15px"
              v-on:receiveClick="handleConvertPO()"/>
            </div>
        </q-card-actions>

        <q-inner-loading
          :showing="showAddLoading"
          color="primary"
        />
      </q-card>
    </q-dialog>
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
      session_outlet_guid: sessionStorage.getItem("session_outlet_guid") != "" && sessionStorage.getItem("session_outlet_guid") != "null" && sessionStorage.getItem("session_outlet_guid") != null ? sessionStorage.getItem("session_outlet_guid") : [],
      concat_name_fullname: sessionStorage.getItem("concat_name_fullname") != "" && sessionStorage.getItem("concat_name_fullname") != "null" && sessionStorage.getItem("concat_name_fullname") != null ? sessionStorage.getItem("concat_name_fullname") : [],
      table_column: [],
      table_data: [],
      showAddLoading: false,
      search: "",
      selected_po: {},
      page_function: this.$route.name,
      filter_status: false,
      json: {},
      agent_options: [],
      create_transmain: false,
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
      showSimpleReceive()
      {
        if(Object.keys(this.selected_po).length == 0){
          if(this.page_function == 'SimpleReceive')
          {
            this.showNotify("negative","No PO selected.");
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

        this.json = {};
        this.create_transmain = true;

      },
      close()
      {
        this.json = {};
        this.create_transmain = false;
      },
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
        var form_name = 'save_edit_pochild_form';
        var error = 0;
        await this.$refs[form_name].validate().then(valid => {
            if (!valid) {
                error = 1;
            }
        });

        var validate = error == 1 ? false : true;

        if(!validate)
        {
            this.showNotify("negative","Please make sure all field is correct.");
            this.showAddLoading = false;
            return;
        }

        if(Object.keys(this.selected_po).length == 0){
          if(this.page_function == 'SimpleReceive')
          {
            this.showNotify("negative","No PO selected.");
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
          Receivedby:this.concat_name_fullname,
          language: this.language
        };

        var data = {};

        if(this.page_function == 'SimpleReceive')
        {
          await this.$store.dispatch('purchase/trigger_simple_receive', payload).then(() => {
            data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_simple_receive']));
          });

          var response = data.response
          console.log('response',response);
          console.log('data',data);

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
        console.log('status',status);
        // var dispatch_response = dispatch_response_array.response.map(item => item.response_json);
        // var runscript_status = dispatch_response.filter((entry)=>{
        //           return entry.status === true;
        //    })
        //    console.log('runscript_status',runscript_status);
        if(status == "success")
        {
          if(this.page_function == 'SimpleReceive')
          {
            this.showNotify('positive', 'Converted Successfully.')

            var mobile = this.$q.screen.width < 600
            var generateSetQuery = (extraFields = {}) => ({
            "ERefNo": response.main.RefNo,
            "EUser":this.user_name,
            "getuser":this.user_name,
            ...extraFields,
          });

          var set_query = generateSetQuery({ "SupplierCode": response.main.Code });
          // var set_query2 = generateSetQuery({
          //   "ELine": response.child[0].Line,
          //   "Itemcode": response.child[0].Itemcode,
          //   "Itemlink": response.child[0].ItemLink,
          // });
          var childParams = response.child.map(child => {
            return generateSetQuery({
              "ELine": child.Line,
              "Itemcode": child.Itemcode,
              "Itemlink": child.ItemLink,
            });
          });
          var set_query3 = generateSetQuery();

          var params = [
            { "trans_type": 'grmain', "set_query": set_query },
            ...childParams.map((set_query, index) => ({ "trans_type": "grchild", "set_query": set_query })),
            { "trans_type": '%OnExit Simple Receive', "set_query": set_query3 },
          ];

          var json_runscript_multi = {
            params: params.map(param => ({
              "lookupdb_name": this.session_outlet_guid,
              "trans_group": 'GRN',
              ...param,
            })),
          };

          var payload_runscript_multi = {
            "pass_json": json_runscript_multi,
          };

            var dispatch_response = await this.runscript_multi(payload_runscript_multi)
            console.log('dispatch_response',dispatch_response);
            if(mobile)
            {
              this.$router.push({ name: 'confirm', query: { refno: data.response.main.RefNo, header: 'GR', type:'create' }})
            }
            else
            {

              this.$router.push({ name: 'EditGoodsReceivedNote', query: { refno: data.response.main.RefNo } })
            }
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
          this.showNotify('negative', error_response.detail);
          this.showAddLoading = false;
          // var show_error = "";
          // console.log('error_response',error_response);
          // Object.keys(error_response).forEach((loop_index)=>{
          //   if(loop_index !== 'status_code')
          //   {
          //     var temp_error = {};
          //     var error_message = "";
          //     Object.keys(error_response[loop_index]).forEach((header,cindex)=>{
          //      console.log('error_response',error_response);
          //       error_message = error_response[loop_index];
          //     });
          //     console.log('error_response',error_response);
          //     console.log('loop_index',loop_index);
          //     temp_error = loop_index + " - " + error_message;
          //     show_error += temp_error  +"<br />";
          //   }
          // });
          //close foreach error message
        //  console.log('show_error',show_error);

        }
        if(dispatch_response.status){
            console.log('Runscript : All scripts executed successfully');
           // this.showNotify('positive','All scripts executed successfully')
        }else{
            console.log('Runscript :', dispatch_response.message);
            this.showNotify('negative',dispatch_response.message)
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
        if(this.page_function == 'SimpleReceive')
        {
          this.$router.push("GoodsReceivedNote");
        }
        else if(this.page_function == 'ConvertSOtoSI')
        {
          this.$router.push("SalesInvoice");
        }
        else if(this.page_function == 'ConvertIStoSI')
        {
          this.$router.push("SalesInvoice");
        }
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

          if(this.page_function == 'SimpleReceive')
          {
            await this.$store.dispatch('purchase/trigger_read_po_list_for_convert_gr', payload).then(() => {
              data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_read_po_list_for_convert_gr']));
              var results = data.data;
              for(var i in results)
              {
                results[i].selected = false;
              }
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
        if(type == "negative")
            {
                Notify.create({
                    group: 'my-group',
                    type: type,
                    message: message,
                    html: true,
                    timeout: 99999999999,
                    position: 'top',
                    actions: [
                        { icon: 'close', color: 'white', round: true, handler: () => { /* ... */ } }
                    ],
                    badgeStyle: "opacity: 0",
                })
            }

            if(type == "positive")
            {
                Notify.create({
                    group: 'my-group',
                    type: type,
                    message: message,
                    html: true,
                    timeout: 1000,
                    position: 'top',
                    badgeStyle: "opacity: 0",

                })
            }

          // Notify.create({
          //     type: type,
          //     message: message,
          //     // timeout: 1000,
          //     position: 'center',
          //     html: true,
          //     actions: [
          //       { label: 'OK', color: 'white', handler: () => { } }
          //     ]
          // })
      },
      key_listener(event)
      {
        if(this.create_transmain)
        {
          if (event.key === "Enter") {
            this.handleConvertPO();
          }
          if(event.key === 'Escape')
          {
            this.close();
          }
        }
      },
      // async runscript_multi(payload){
      //   var object_pass = {
      //         dispatch: 'purchase/trigger_runtime_runscript_multi',
      //         getter: 'purchase/get_runscript_multi_status',
      //         app: this,
      //         payload: payload,
      //     };
      //     var dispatch_response = await this.$dispatch(object_pass);
      //    return dispatch_response
      // },
      checkResponseJsonStatus(json_response){
        var errorItems = json_response.filter(item => item.status === false);
        // If there are no items with status === false, return true with a success message
        if (errorItems.length === 0) {
          return { status: true, message: "All scripts executed successfully" };
        } else {
          // If there are items with status === false, return false with an error message
          const errorMessage = errorItems[0].message || "Error in script execution";
          return { status: false, message: errorMessage };
         //  const firstErrorMessage = errorItems[0].message || "Error in script execution";
          // Check if the error message is "run_query" or "exec_query"
          // if (firstErrorMessage.includes("run_query") || firstErrorMessage.includes("exec_query")) {
          //   return { status: false, message: "Error in script execution : " + " " + firstErrorMessage };
          // } else {
          //   return { status: false, message: firstErrorMessage };
          // }
          // const errorMessage = errorItems[0].message || "Error in script execution";
          // return { status: false, message: errorMessage };
        }
      },
      async runscript_multi(payload,seq){
         var object_pass = {
              dispatch: 'purchase/trigger_runtime_runscript_multi',
              getter: 'purchase/get_runscript_multi_status',
              app: this,
              payload: payload,
         };
         var dispatch_response_array = await this.$dispatch(object_pass);

         if(dispatch_response_array.status){
            var dispatch_response = dispatch_response_array.response.map(item => item.response_json);
            var dispatch_response2 = seq  === '1'  ? dispatch_response[0] : dispatch_response;

            if(dispatch_response2.length > 0){
              var tem_dispatch_response = this.checkResponseJsonStatus(dispatch_response2)
              // console.log('tem_dispatch_response',tem_dispatch_response);
              return tem_dispatch_response;
            }else{
              return dispatch_response2;
            }

        }else{
          return dispatch_response_array;
        }

    },
  },
  watch:{
    create_transmain(newVal)
    {
      if(newVal)
      {
        document.addEventListener("keydown", this.key_listener);
      }
      else
      {
        document.removeEventListener("keydown", this.key_listener);
      }
    },
  }
}
</script>

<style scoped>
@media screen and (max-width: 1024px) {
  .two_column_left
  {
    padding-right: 2%;
  }
}

@media screen and (min-width: 1024px) {
  .four_column_left
  {
    padding-right: 1%;
  }
}

.custom_close_button
{
  color: #928f8f;
  position: absolute;
  padding: 0;
  padding-left: 10px;
  top: 1px;
  right: 12px; /* Adjust the desired distance from the right */
  z-index: 1;
}
.custom_delete
{
  color: #C10015;
  text-decoration: none; /* Remove underline by default */
  transition: text-decoration 0.3s;
  position: absolute;
  padding:0px;
  padding-left: 10px;
  top: 8px;
  left: 10px;
  z-index: 1;
}
.custom_delete:hover {
  cursor: pointer;
  text-decoration: underline; /* Underline on hover */
}

@media screen and (max-width: 599px) {
  .header_top
  {
    background-color: white;
    position: sticky;
    z-index: 2;
    top: 0px;
    height: 57px;
    text-align: center;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 0px;
    padding-bottom: 0px;
  }

  .header_top_mobile
  {
    background-color: white;
    position: sticky;
    z-index: 2;
    top: 0px;
    text-align: center;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 0px;
    padding-bottom: 0px;
  }
}

@media screen and (min-width: 600px) {
  .header_top
  {
    position: sticky;
    top: 50px;
    z-index: 2;
    padding:0px;
  }
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
  height: 70px;
  position: static;
  padding:0px;
  /* padding-right: 30px; */
  /* padding-left: 30px; */
  /* padding-bottom: 10px; */
  padding-top: 24px;
  bottom: 0px;
  /* background-color: white; */
}
*>>>.q-card__section--vert {
    padding: 0px;
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
  font-weight: 600;
  font-size: 20px;
  font-family: InterfontSemiBold;

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
  padding-left: 24px;
  padding-right: 24px;
  padding-bottom: 24px;
}

.upload_container
{
    padding: 10px;
    padding-top: 0px;
}

* >>> .q-table__container
{
    padding: 0px;
    border-radius: 8px;
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
    /* margin: 10px; */
    /* padding-top: 10px; */
    padding: 16px;
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
.custom_primary_button {
  padding: 10px 30px;
  border-radius: 8px;
  box-shadow: 0px 1px 3.6px 0px rgba(0, 0, 0, 0.25);
  font-weight: 700;
  font-family: InterfontBold;
  width: 112px;
  height: 48px;
}

.custom_primary_font {
  color: var(--q-primary) !important;
}
*.itemtable_pagination >>>.q-field__native {
  margin-bottom: 15px;
}
.dialog_done_button {
  height: 48px;
  padding: 16px;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 1px 3.6px 0px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  font-size: 16px;
  font-family: InterfontBold;
  font-weight: 700;

}
</style>
