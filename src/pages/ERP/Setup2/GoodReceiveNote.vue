<template>

  <div class="row main_container">

      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">

          Goods Receive Note

          <div class="row top_row">

              <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-xs-12">
                  <MultipleSelect
                  v-model:pass_value="filter_value"
                  v-on:receiveChange="handleChangeFilterShowColumn"
                  :dbComponentBehavior="dbComponentBehavior.text"
                  label=""
                  :options="filter_options"
                  />
              </div>

              <div class="col-xl-10 col-lg-10 col-md-10 col-sm-12 col-xs-12 text_right">
                  <Button v-on:receiveClick="handleShowCreateItemMaster"
                  :pass_label="'Create'"
                  :pass_no_caps="true"
                  :pass_square="true"
                  :pass_dense="true"
                  class="custom_button"
                  />

                  <Button v-on:receiveClick="handleClickFilter"
                  :pass_label="'Filter'"
                  :pass_no_caps="true"
                  :pass_square="true"
                  :pass_dense="true"
                  :class="[filter_mode_on ? 'active_section_button' : 'inactive_section_button']"
                  />
              </div>
          </div>

          <Table
          :row_per_page="[5,10,20,50]"
          :title="table_title"
          :table_data="table_data"
          :table_column="table_column"
          :flat_status="true"
          :bordered_status="true"
          v-on:receiveRequestTable="handleTableChange"

          :allow_add="false"
          :allow_edit="true"
          :allow_delete="true"
          v-on:receiveHandleAdd="handleReceiveHandleAdd"
          v-on:receiveHandleEdit="handleReceiveHandleEdit"
          v-on:receiveHandleDelete="handleReceiveHandleDelete"

          :filter_mode_on="filter_mode_on"
          v-on:receiveColumnRearrange="handleColumnRearrange"
          v-on:filter_column="handleFilterColumn"
          :forceLoading="forceLoading"
          :column_reordering="true"
          :row_reordering="false"
          v-on:receiveHandleClearFilter="handleClearFilter"

          :pass_visible_columns="visibleColumns"
          :handleActionColumn="'CODE_DESC'"

          />

      </div>

      <q-dialog v-model="show_hq_dialog" persistent :position="$q.screen.width > 599 ? 'top' : 'bottom'">
      <q-card v-if="$q.screen.width < 600" style="width: 700px; max-width: 98vw; margin-top: 5%;">
        <q-card-section class="row header_top_mobile" :style="{ textAlign: (!status && edit_hq) ? 'center' : 'left' }">
          <div v-if="!status && edit_hq" class="custom_delete" @click="handleDelete(jsonHQ)">
          <Button_icon :disabled="readonly_delete" :icon="'fas fa-trash-alt'" :flat="true" :color="''" :font-color="'black'" :outline="false" size="12px" v-on:click="handleDelete(jsonBarcode)" class="q-mr-sm text-red" />
        </div>

        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div v-if="!edit_hq" class="text-subtitle1 mobile_dialog_bottom" style="padding:16px 24px;margin-top: 0px;box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);">Add Goods Receive Note Location<br></div>
          <div v-else class="text-subtitle1 mobile_dialog_bottom" style="padding:16px 24px;margin-top: 0px;box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);">Edit Goods Receive Note Location<br></div>

        <div class="custom_close_button">
          <q-btn icon="close" flat round dense @click="close()" :disable="false"/>
        </div>
        </div>
        </q-card-section>

        <q-card-section class="upload_container">
          <q-form ref="save_form">
            <div class="row upload_separator_first">
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <div class="row input_wrapper_left_right">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div class="row" style="gap:16px">
                      <!-- <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" style="gap:16px" :class="$q.screen.width > 1023 ? 'q-pl-sm': ''"> -->

                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <div class="row">
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" >
                            <div class="row">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <Input
                                  :autofocusclick="false"
                                  :no_label="false"
                                  :readonly="false"
                                  v-on:change="handleChange"
                                  v-model="json.Description "
                                  :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.text : oridbComponentBehavior.text" />
                              </div>
                            </div>
                            </div>
                          </div>
                        </div>
                    </div>

                    <!-- edit barcode dialog -->
                    <div  v-if="edit_hq" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                      <div class="row">
                        <div class="" :class="edit_child ? 'col-xs-12' : 'col-xs-10'">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" style="margin-top: -10px;">
                              <Input
                                  :autofocusclick="false"
                                  :no_label="false"
                                  :readonly="false"
                                  v-on:change="handleChange"
                                  v-model="Description "
                                  :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.text : oridbComponentBehavior.text" />
                            </div>

                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <div class="row" style="align-items: center; padding-top: 10px;" >
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                              <Label :pass_value="'Inactive'" />
                            </div>
                            <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8 q-pt-xs">
                            <Checkbox
                              :btm_padding="true"
                              size="xs"
                              :disable="false"
                              v-model="inactive"
                              :true-value="1"
                              :false-value="0"
                              v-on:receiveChangenewVal="handleChangeInactive" />
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
                </div>
          </q-form>
        </q-card-section>

        <q-card-actions  class="dialog_action" style="padding-right:24px; padding-left: 24px;">
        <div class="row full-width">
          <div class="full-width">
            <Button_icon class="full-width custom_primary_button" style="height: 30px;" :small_round="true" :text="'ADD'" :flat="false" :font_color="'white'" :color="'#1E90FF'" :outline="false" size="16px" @click="genarateAddButton"/>
          </div>
        </div>
      </q-card-actions>

      </q-card>

      <q-card v-else style="width: 95vw; max-width: 950px; max-height: 90vh; margin-top: 5%;">
      <q-card-section class="row items-center dialog_header_custom" style="padding-left: 10px;">
          <div v-if="edit_hq" class="text-h6">Edit Goods Receive Note<br></div>
          <div v-else class="text-h6">Add Goods Receive Note<br></div>
          <q-space />

          <q-btn icon="close" flat round dense :disable="loading_dialog" v-close-popup />

      </q-card-section>

      <q-card-section class="row" style="padding: 16px;">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <q-form ref="save_form">
            <div class="row dialog_content">

              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <div class="row" style="height: 100%;">

                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 " :class="!edit_child ? '': ''">

                        <div class="row">

                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" style="padding-right: 10px;">
                            <div class="row" style="align-items: center;">
                              <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                  <Label :pass_value="'Description'" />
                              </div>

                              <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                <Input
                                  :autofocusclick="false"
                                  :no_label="false"
                                  :readonly="false"
                                  v-on:change="handleChange"
                                  v-model="Description "
                                  :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.text : oridbComponentBehavior.text" />
                              </div>
                            </div>
                           </div>
                        </div>
                      </div>
                  </div>
              </div>

              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <div class="row" style="height: 100%;">

                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 " :class="!edit_child ? '': ''">

                        <div class="row">

                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" style="padding-right: 10px;">
                            <div class="row" style="align-items: center;">
                              <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                  <Label :pass_value="'Inactive'" />
                              </div>

                              <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                <Checkbox
                                  :btm_padding="true"
                                  size="xs"
                                  :disable="false"
                                  v-model="inactive"
                                  :true-value="1"
                                  :false-value="0"
                                  v-on:receiveChangenewVal="handleChangeInactive" />
                              </div>
                            </div>
                           </div>
                        </div>
                      </div>
                  </div>
              </div>


            </div>
          </q-form>
        </div>


      </q-card-section>

      <!-- <q-card-actions class="dialog_action" style="padding-bottom: 16px;padding-right:16px;padding-top:0px; margin-top: -20px;">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-pt-md" align="right">
          <Button_icon  :readonly="false" :flat="true" :font_color="'white'" :color="'#1E90FF'" :text="$language('D0024')" :outline="false" size="16px"
          v-on:receiveClick="genarateAddButton" class="custom_primary_button"/>
        </div>
      </q-card-actions> -->

      <q-card-actions class="dialog_action" align="right">
            <q-btn flat label="Cancel" color="primary" v-close-popup/>
            <q-btn flat label="Confirm" color="primary" @click="genarateAddButton" />
        </q-card-actions>

        <q-inner-loading
          :showing="loading_dialog"
          color="primary"
        />

        <q-inner-loading
        :showing="showAddLoading"
        color="primary"
      />
      </q-card>

      </q-dialog>


    <q-dialog v-model="delete_grn_dialog" persistent position="top">
    <q-card style="width: 864px; max-width: 98vw;text-align:center;margin-top: 5%;border-radius: 8px">

      <q-card-section class="theme_color row items-center" style="height:56px; padding: 8px 24px;border-bottom: 1px solid #a7bbcb;">
        <div class="confirm_title">{{ $language('D0115') }}<!--Confirmation--></div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup :disable="showAddLoading || showAddLoading2"/>
      </q-card-section>

      <q-card-section style="padding: 32px 24px">
        <span class="confirmation_line_font">Are you sure to delete this?</span>
      </q-card-section>

      <q-card-actions align="right" style="padding-top:0px;padding-bottom:16px;padding-right:16px">
        <q-btn flat :label="$language('D0116')" font_color="#29292A" color="#29292A" v-close-popup size="12px" class="dialog_confirm_cancel_button"/> <!-- CANCEL -->
        <q-btn flat :label="$language('D0156')" size="12px" font_color="'white'" color="'#D81111'" class="confirm_delete_button" @click="handleDeleteGRN" /> <!-- OK -->
      </q-card-actions>

      <q-inner-loading
        :showing="deleteLoading"
        color="primary"
      />
    </q-card>
  </q-dialog>

  </div>

</template>

<script>
import Table from 'src/components/ERP/Table/Table.vue';
import Button from 'src/components/ERP/Main/Button';
import MultipleSelect from 'src/components/ERP/Main/MultipleSelect';
import Input from 'src/components/ERP/Main/Input';
import Checkbox from 'src/components/ERP/Base/Checkbox'
import Label from 'src/components/ERP/Main/Label';
import Button_icon from 'src/components/ERP/Base/Button_icon'

import { Notify } from "quasar";

export default {
  data(){
      return{
          table_column: [],
          table_data: [],
          filter_mode_on: false,
          rearrange_column: [],
          forceLoading: false,
          filter_options: [],
          filter_value: [],
          visibleColumns: [],

          Description:'',
          inactive: 0,
          get_code_guid:'',

          show_hq_dialog: false,
          edit_hq:false,

          delete_grn_dialog: false,
          deleteLoading: false,

          showAddLoading: false,
          loading_dialog: false,

          language: sessionStorage.getItem("language") != "" && sessionStorage.getItem("language") != "null" && sessionStorage.getItem("language") != null ? sessionStorage.getItem("language") : [],
          session_outlet_guid: sessionStorage.getItem("session_outlet_guid") != "" && sessionStorage.getItem("session_outlet_guid") != "null" && sessionStorage.getItem("session_outlet_guid") != null ? sessionStorage.getItem("session_outlet_guid") : [],
      }
  },
  components: {
      Table,
      Button,
      MultipleSelect,
      Input,
      Checkbox,
      Label,
      Button_icon
  },
  computed: {
      dbComponentBehavior() {
          return this.$store.getters['dbComponentBehavior/byLanguage']('erp')
      },
  },
  methods:{
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
        if(type == "info")
        {
                Notify.create({
                type: type,
                message: message,
                timeout: 99999999,
                position: 'top',
                badgeStyle: "opacity: 0",
                html: true,
                actions: [
                  { label: 'OK', color: 'white', round: true, handler: () => { } }
                ]
            })
        }
      },

      handleChangeFilterShowColumn(value)
      {
          this.$nextTick(()=>{

              var visibleColumns = [];

              for (const index in this.filter_value) {
                  visibleColumns.push(this.filter_value[index]);
              }
              this.visibleColumns = visibleColumns;
          });

      },
      handleShowCreateItemMaster(){
        this.showAddLoading = true;

        this.show_hq_dialog = true
        this.edit_hq = false

        this.Description = ''
        this.inactive = 0

        setTimeout(()=>{
          this.showAddLoading = false;
        }, 1500)

        // this.$router.push({ name: "CreateGoodReceiveNote" });
      },
      async clearFilterInput()
      {
          for (const index in this.table_column) {

              var is_array = Array.isArray(this.table_column[index].filter_value);
              if(is_array)
              {
                  this.table_column[index].filter_value = [];
              }
              else
              {
                  this.table_column[index].filter_value = '';
              }

          }

          return;

      },
      async handleClearFilter()
      {
          await this.clearFilterInput();
          this.rearrange_column = this.table_column;

          this.table_function(this.ori_params);
      },
      handleReceiveHandleAdd(pass_payload)
      {
          // console.log('handleReceiveHandleAdd');
          // console.log(pass_payload);
      },
      handleReceiveHandleEdit(pass_payload)
      {
        this.showAddLoading = true;

        this.get_code_guid = pass_payload.row.CODE_GUID

        this.edit_hq = true
        this.show_hq_dialog = true

        this.Description = pass_payload.row.CODE_DESC
        this.inactive = pass_payload.row.inactive ? 1 : 0

        setTimeout(()=>{
            this.showAddLoading = false;
        }, 1500)

        // this.$router.push({
        //     // name: 'CreateEditIM_new',
        //     name: "EditGoodReceiveNote",
        //     query: { POGroupCode: pass_payload.row.CODE_GUID}
        // });
      },
      handleReceiveHandleDelete(pass_payload)
      {
        this.get_code_guid = pass_payload.row.CODE_GUID
        // this.delete_grn_dialog = true
      },
      async handleDeleteGRN(){
        this.deleteLoading = true

        var payload = {
          "pass_json":{
            "TRANS_TYPE": "GRN_REASON",
            "outlet_guid": this.session_outlet_guid,
            "language": this.language,
            "CODE_GUID": this.get_code_guid,
          }
        }

        console.log('payload', payload);

        var object_pass = {
          "dispatch": 'setup2_pogroup/trigger_delete_master_code_read_master_code_by_trans_type',
          "getter": 'setup2_pogroup/get_master_code_read_master_code_by_trans_type',
          "app": this,
          "payload": payload,
        };

        console.log('object_pass', object_pass);

        var dispatch_response_delete_master_code_read_master_code_by_trans_type = await this.$dispatch(object_pass);
        console.log('dispatch_response_delete_master_code_read_master_code_by_trans_type', dispatch_response_delete_master_code_read_master_code_by_trans_type);

        var status = dispatch_response_delete_master_code_read_master_code_by_trans_type.status

        if(status){
          this.showNotify('positive', 'Deleted Successfully')
          this.delete_grn_dialog = false
          this.deleteLoading = false
          this.table_function(this.ori_params)
        }else{
          var get_error_message = JSON.parse(dispatch_response_delete_master_code_read_master_code_by_trans_type.response)
          if(get_error_message){
            this.showNotify('negative', get_error_message.detail);
            this.deleteLoading = false
          }else{
            this.showNotify('negative', 'Deleted Failed')
            this.deleteLoading = false
          }
        }
      },
      async handleClickFilter()
      {
          this.filter_mode_on = !this.filter_mode_on;

          if(!this.filter_mode_on)
          {

              await this.clearFilterInput();

              this.rearrange_column = this.table_column;

          }

          this.table_function(this.ori_params);

      },
      handleColumnRearrange(pass_payload)
      {
          this.rearrange_column = pass_payload;
      },
      handleFilterColumn(pass_payload)
      {
          this.rearrange_column = this.table_column;
          this.table_function(this.ori_params);
      },
      handleChangeInactive(newVal){
        this.$nextTick(()=>{
          this.inactive = newVal;
        });
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

          this.forceLoading = true;
          var payload = ori_payload.params

          payload.skip = payload.offset;
          // payload.Itemcode = '';
          // payload.vendor_code = '';
          // payload.Description = '';
          // payload.Dept = '';

          for (const index in this.table_column) {

              var is_array = Array.isArray(this.table_column[index].filter_value);
              if(is_array)
              {
                  var value = '';

                  for (const value_index in this.table_column[index].filter_value) {
                      value += this.table_column[index].filter_value[value_index]+",";
                  }

                  value = value.replace(/,\s*$/, "");

                  payload[this.table_column[index].field] = value
              }
              else
              {
                  if(this.table_column[index].filter_value)
                  {
                      payload[this.table_column[index].field] = this.table_column[index].filter_value
                  }
                  else
                  {
                      delete payload[this.table_column[index].field]
                  }

              }
          }

          var mobile = this.$q.screen.width < 600;
          // if(mobile)
          // {
          //   payload.limit = this.filter.pagination;
          // }

          if(payload.ordering == "")
          {
            payload.ordering = "-CODE_DESC"
          }


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

          var xpayload = {
            "pass_json":{
              "TRANS_TYPE": "GRN_REASON",
              "outlet_guid": this.session_outlet_guid,
              "language": this.language,
              "limit": this.ori_params.params.limit,
              "skip": this.ori_params.params.skip,
              "sort_by": payload.sort_by == "" ? "CODE_DESC" : payload.sort_by,
              "sort_type": payload.sort_type == "" ? "Asc" : payload.sort_type
            }
          }

          // if(this.table_column.length != 0){
          //   xpayload.pass_json.CODE_DESC = this.table_column[1].filter_value;
          //   if(this.table_column[2].filter_value != ''){
          //     xpayload.pass_json.inactive = Number(this.table_column[2].filter_value);
          //   }
          // }

          if(this.table_column.length != 0){
            xpayload.pass_json.CODE_DESC = this.table_column[0].filter_value;
            if(this.table_column[1].filter_value != ''){
              xpayload.pass_json.inactive = Number(this.table_column[1].filter_value);
            }
          }

          // if(this.table_column.length != 0){
          //   xpayload.pass_json.CODE_DESC = this.table_column[1].filter_value;
          //   if(this.table_column[2].filter_value != ''){
          //     xpayload.pass_json.mcode_glcode = this.table_column[2].filter_value;
          //   }
          //   if(this.table_column[3].filter_value != ''){
          //     xpayload.pass_json.code_group = this.table_column[3].filter_value;
          //   }
          //   if(this.table_column[4].filter_value != ''){
          //     xpayload.pass_json.inactive = this.table_column[4].filter_value;
          //   }
          //   if(this.table_column[5].filter_value != ''){
          //     xpayload.pass_json.system_generate = this.table_column[5].filter_value;
          //   }
          //   if(this.table_column[6].filter_value != ''){
          //     xpayload.pass_json.date_from = this.table_column[6].filter_value;
          //   }
          //   if(this.table_column[7].filter_value != ''){
          //     xpayload.pass_json.date_to = this.table_column[7].filter_value;
          //   }
          // }


          var object_pass = {
            "dispatch": 'setup2_transactionreasoncode/trigger_get_master_code_read_master_code_by_trans_type',
            "getter": 'setup2_transactionreasoncode/get_master_code_read_master_code_by_trans_type',
            "app": this,
            "payload": xpayload,
          };

          var dispatch_response_get_master_code_read_master_code_by_trans_type = await this.$dispatch(object_pass);
          var status = dispatch_response_get_master_code_read_master_code_by_trans_type.status

          if(status == "failed"){
            this.table_data = {
              "data": {
                  "count": 0,
                  "next": null,
                  "previous": null,
                  "results": []
              }
          };

          }else{
              var results = dispatch_response_get_master_code_read_master_code_by_trans_type.response.detail;

              for(var i in results){
                results[i].inactive = results[i].inactive == 1;
                // results[i].system_generate = results[i].system_generate == 1;
              }

              this.table_data =
              {
                  "data": {
                      "count": dispatch_response_get_master_code_read_master_code_by_trans_type.response.total_row,
                      "next": null,
                      "previous": null,
                      "results": dispatch_response_get_master_code_read_master_code_by_trans_type.response.detail
                  }
              };

              this.results = dispatch_response_get_master_code_read_master_code_by_trans_type.response.detail;

              this.showNext = this.ori_params.params.offset + this.ori_params.params.limit >= this.table_data.data.count;
              // this.filter.total_row = this.table_data.data.count;
              var from = this.ori_params.params.offset+1;
              var to = this.ori_params.params.offset + this.table_data.data.results.length;
              // this.filter.from = from;
              // this.filter.to = to;
          }

          if(this.rearrange_column.length > 0)
          {
              var table_column = this.rearrange_column;
          }
          else
          {
            var table_column = [
              // {
              //   name: 'action',
              //   required: true,
              //   label: this.$language('D0028'),
              //   header_align: 'center',
              //   align: 'center',
              //   sortable: true,
              //   field: 'action',
              //   format_child: '',
              //   tooltip: '',
              //   headerStyle:'text-align: center; width: 1%;',
              //   // "headerStyle": "max-width: 50px; text-align: center;",
              //   filter_type: 'input',
              //   filter_options: [],
              //   filter_value: '',
              // },
              {
                name: 'CODE_DESC',
                required: true,
                label: 'Description',
                header_align: 'center',
                align: 'left',
                sortable: true,
                field: 'CODE_DESC',
                format_child: '',
                tooltip: '',
                headerStyle:'text-align: center; width: 1%;',
                // "headerStyle": "max-width: 50px; text-align: center;",
                filter_type: 'input',
                filter_options: [],
                filter_value: '',
              },
              {
                name: 'inactive',
                required: true,
                label: 'Inactive',
                header_align: 'center',
                align: 'center',
                sortable: true,
                field: 'inactive',
                format_child: '',
                tooltip: '',
                headerStyle:'text-align: center; width: 1%;',
                // "headerStyle": "max-width: 50px; text-align: center;",
                filter_type: 'input',
                filter_options: [],
                filter_value: '',
              }
            ]

            // var table_column = [
            // {
            //     name: 'action',
            //     required: true,
            //     label: this.$language('D0028'),
            //     header_align: 'center',
            //     align: 'center',
            //     sortable: false,
            //     field: 'action',
            //     format_child: '',
            //     tooltip: '',
            //     headerStyle:'text-align: center; width: 1%;',
            // // "headerStyle": "max-width: 50px; text-align: center;",
            //     filter_type: 'input',
            //     filter_options: [],
            //     filter_value: '',
            // },
            // {
            //     name: 'CODE_DESC',
            //     required: true,
            //     label: 'Code Description',
            //     header_align: 'center',
            //     align: 'left',
            //     sortable: true,
            //     field: 'CODE_DESC',
            //     format_child: '',
            //     tooltip: '',
            //     filter_type: 'input',
            //     filter_options: [],
            //     filter_value: '',
            // },
            // {
            //     name: 'mcode_glcode',
            //     required: true,
            //     label: 'Master Code_GL Code',
            //     header_align: 'center',
            //     align: 'left',
            //     sortable: true,
            //     field: 'mcode_glcode',
            //     format_child: '',
            //     tooltip: '',
            //     headerStyle:'width: 20%;',
            //     filter_type: 'input',
            //     filter_options: [],
            //     filter_value: '',
            // },
            // {
            //     name: 'code_group',
            //     required: true,
            //     label: 'Code Group',
            //     header_align: 'center',
            //     align: 'left',
            //     sortable: true,
            //     field: 'code_group',
            //     format_child: '',
            //     tooltip: '',
            //     headerStyle:'width: 20%;',
            //     filter_type: 'input',
            //     filter_options: [],
            //     filter_value: '',
            // },
            // {
            //     name: 'inactive',
            //     required: true,
            //     label:  'Inactive',
            //     header_align: 'center',
            //     align: 'center',
            //     sortable: true,
            //     field: 'inactive',
            //     format_child: '',
            //     tooltip: '',
            //     filter_type: 'input',
            //     filter_options: [],
            //     filter_value: '',
            // },
            // {
            //     name: 'system_generate',
            //     required: true,
            //     label: 'System Generate',
            //     header_align: 'center',
            //     align: 'center',
            //     sortable: true,
            //     field: 'system_generate',
            //     format_child: '',
            //     tooltip: '',
            //     filter_type: 'input',
            //     filter_options: [],
            //     filter_value: '',
            // },
            // {
            //     name: 'date_from',
            //     required: true,
            //     label: 'Date From',
            //     header_align: 'center',
            //     align: 'left',
            //     sortable: true,
            //     field: 'date_from',
            //     format_child: '',
            //     tooltip: '',
            //     filter_type: 'input',
            //     filter_options: [],
            //     filter_value: '',
            // },
            // {
            //     name: 'date_to',
            //     required: true,
            //     label: 'Date To',
            //     header_align: 'center',
            //     align: 'left',
            //     sortable: true,
            //     field: 'date_to',
            //     format_child: '',
            //     tooltip: '',
            //     filter_type: 'input',
            //     filter_options: [],
            //     filter_value: '',
            // }
            // ];
          }

          this.table_column = table_column;

          this.forceLoading = false;
      },
      async genarateAddButton(){

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

      if(!this.edit_hq){
        var payload = {
          "pass_json":{
            "TRANS_TYPE": "GRN_REASON",
            "outlet_guid": this.session_outlet_guid,
            "language": this.language,
            "CODE_DESC": this.Description,
            // "code_group": this.,
            "inactive": this.inactive ? 1 : 0
          }
        }

        var object_pass = {
          "dispatch": 'setup2_transactionreasoncode/trigger_create_master_code_read_master_code_by_trans_type',
          "getter": 'setup2_transactionreasoncode/get_master_code_read_master_code_by_trans_type',
          "app": this,
          "payload": payload,
        };

        var dispatch_response_create_master_code_read_master_code_by_trans_type = await this.$dispatch(object_pass);

        var status = dispatch_response_create_master_code_read_master_code_by_trans_type.status
        if(status){
            this.showNotify('positive', 'Created Successfully')
            this.show_hq_dialog = false;
            this.table_function(this.ori_params)
        }else{
          var get_error_message = JSON.parse(dispatch_response_create_master_code_read_master_code_by_trans_type.response)
          if(get_error_message){
            this.showNotify('negative', get_error_message.detail);
          }else{
            this.showNotify('nagative', 'Created Failed')
          }
        }
      }
      else{
        // if(typeof(this.json.Code) === "string"){
        //   var test = this.hqloc_options.filter((entry)=>{
        //     return entry.label == this.json.Code || entry.value == this.json.Code
        //   })

        //   this.json.Code = test[0].value
        // }

        var payload = {
          "pass_json":{
            "TRANS_TYPE": "GRN_REASON",
            "outlet_guid": this.session_outlet_guid,
            "language": this.language,
            "CODE_GUID": this.get_code_guid,
            "CODE_DESC": this.Description,
            "code_group": "",
            "inactive": this.inactive ? 1 : 0
          }
        }

        var object_pass = {
          "dispatch": 'setup2_transactionreasoncode/trigger_patch_master_code_read_master_code_by_trans_type',
          "getter": 'setup2_transactionreasoncode/get_master_code_read_master_code_by_trans_type',
          "app": this,
          "payload": payload,
        };

        var dispatch_response_patch_master_code_read_master_code_by_trans_type = await this.$dispatch(object_pass);

        var status = dispatch_response_patch_master_code_read_master_code_by_trans_type.status
        if(status){
          // if(dispatch_response_patch_master_code_read_master_code_by_trans_type.response.includes('Duplicated')){
            // this.showNotify('negative', dispatch_response_patch_master_code_read_master_code_by_trans_type.response.details)
          // }else{
            this.showNotify('positive', 'Updated Successfully')
            this.show_hq_dialog = false;
            this.table_function(this.ori_params)
          // }
        }else{
          var get_error_message = JSON.parse(dispatch_response_patch_master_code_read_master_code_by_trans_type.response)
              if(get_error_message){
                this.showNotify('negative', get_error_message.detail);
              }else{
                this.showNotify('nagative', 'Updated Failed')
              }
        }
      }
      },

      close(){
      this.show_hq_dialog = false;
      // this.jsonBarcode = {};
      // this.show_barcode_dialog = false;
    },
  },
  mounted()
  {
    this.showAddLoading = true;

    this.filter_options = [
      // {
      //     label: 'action',
      //     value: 'action',
      // },
      {
          label: 'Code Description',
          value: 'CODE_DESC',
      },
      {
          label: 'Inactive',
          value: 'inactive',
      }
    ];

    // this.filter_options = [
    //   {
    //       label: 'action',
    //       value: 'action',
    //   },
    //   {
    //       label: 'Code Description',
    //       value: 'CODE_DESC',
    //   },
    //   {
    //       label: 'Master Code_GL Code',
    //       value: 'mcode_glcode',
    //   },
    //   {
    //       label: 'Code Group',
    //       value: 'code_group',
    //   },
    //   {
    //       label: 'Inactive',
    //       value: 'inactive',
    //   },
    //   {
    //       label: 'System Generate',
    //       value: 'system_generate',
    //   },
    //   {
    //       label: 'Date From',
    //       value: 'date_from',
    //   },
    //   {
    //       label: 'Date To',
    //       value: 'date_to',
    //   }
    // ];

      var visibleColumns = [];

      for (const index in this.filter_options) {
          visibleColumns.push(this.filter_options[index].value);
      }

      this.visibleColumns = visibleColumns;

      setTimeout(()=>{
        this.showAddLoading = false;
      },2500)
  }
}
</script>

<style scoped>
.main_container
{
  padding: 10px;
}

.top_row
{
  /* padding-top: 10px; */
  padding-bottom: 10px;
  padding-right: 0px;
}

.text_right
{
  text-align: right;
}

.custom_button
{
font-size: 14px;
background-color: #273655;
color: white;
margin-left: 5px;
}

.active_section_button
{
font-size: 14px;
background-color: #e37a05;
color: white;
margin-left: 5px;
}

.inactive_section_button
{
font-size: 14px;
background-color: #273655;
color: white;
margin-left: 5px;
}
.confirmation_line_font {
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  font-family: InterfontMedium;
}
.confirm_title {
  color: #FFF;
  text-align: center;
  font-family: InterfontSemiBold;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
}
.confirm_delete_button {
  padding: 16px;
  justify-content: center;
  align-items: center;
  font-size: 16px !important;
  font-style: normal;
  font-weight: 700;
  font-family: InterfontBold;
  border-radius: 8px;
  color: #FFFFFF;
  background-color: #D81111;
  box-shadow: 0px 1px 3.6px 0px rgba(0, 0, 0, 0.25);
  width: 112px;
  height: 48px;
}
.dialog_action
{
/* height: 55px; */
/* height: 100px; */
position: static;
padding:0px;
padding-right: 20px;
padding-left: 20px;
bottom: 0px;
background-color: white;
}

@media screen and (min-width: 600px) {
.dialog_action
{
/* height: 55px; */
/* height: 100px; */
position: static;
padding:0px;
padding-right: 20px;
padding-left: 20px;
padding-bottom: 20px;
bottom: 0px;
background-color: white;
}
}
</style>
