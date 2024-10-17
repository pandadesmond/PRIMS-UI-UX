<template>

  <div class="row main_container">

      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">

          System Access Right

          <div class="row top_row">

              <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-xs-12">
                  <MultipleSelect
                  v-model:pass_value="filter_value"
                  v-on:receiveChange="handleChangeFilterShowColumn"
                  :dbComponentBehavior="dbComponentBehavior.text"
                  label=""
                  :options="filter_options"
                  :forceSelectAll="forceSelectAll"

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

          <!-- :row_per_page="[10,20,50,1000]" -->
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
          :handleActionColumn="'code'"

          />

      </div>

  </div>

  <q-dialog v-model="delete_system" persistent position="top">
    <q-card style="width: 864px; max-width: 98vw;text-align:center;margin-top: 5%;border-radius: 8px">

      <q-card-section class="theme_color row items-center" style="height:56px; padding: 8px 24px;border-bottom: 1px solid #a7bbcb;">
        <div class="confirm_title">{{ $language('D0115') }}<!--Confirmation--></div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup :disable="showAddLoading || showAddLoading2"/>
      </q-card-section>

      <q-card-section style="padding: 32px 24px">
        <!-- <span class="q-ml-sm custom_selection_font">{{general_body}}</span> -->
        <span class="confirmation_line_font">Are you sure to delete this?</span>
      </q-card-section>

      <q-card-actions align="right" style="padding-top:0px;padding-bottom:16px;padding-right:16px">
        <q-btn flat :label="$language('D0116')" font_color="#29292A" color="#29292A" v-close-popup size="12px" class="dialog_confirm_cancel_button"/> <!-- CANCEL -->
        <q-btn flat :label="$language('D0156')" size="12px" font_color="'white'" color="'#D81111'" class="confirm_delete_button" @click="handleDeleteSystem" /> <!-- OK -->
      </q-card-actions>

      <q-inner-loading
        :showing="deleteLoading"
        color="primary"
      />
    </q-card>
  </q-dialog>

</template>

<script>
import Table from 'src/components/ERP/Table/Table.vue';
import Button from 'src/components/ERP/Main/Button';
import MultipleSelect from 'src/components/ERP/Main/MultipleSelect';
import { Notify } from "quasar";

export default {
  data(){
      return{
          table_column: [],
          table_data: [],
          // filter_mode_on: true,
          filter_mode_on: false,

          rearrange_column: [],
          forceLoading: false,
          filter_options: [],
          filter_value: [],
          visibleColumns: [],

          get_code:'',
          delete_system: false,
          forceSelectAll: false,

          user_name: sessionStorage.getItem("user_name") != "" && sessionStorage.getItem("user_name") != "null" && sessionStorage.getItem("user_name") != null ? sessionStorage.getItem("user_name") : [],
          language: sessionStorage.getItem("language") != "" && sessionStorage.getItem("language") != "null" && sessionStorage.getItem("language") != null ? sessionStorage.getItem("language") : [],
          session_outlet_guid: sessionStorage.getItem("session_outlet_guid") != "" && sessionStorage.getItem("session_outlet_guid") != "null" && sessionStorage.getItem("session_outlet_guid") != null ? sessionStorage.getItem("session_outlet_guid") : [],
      }
  },
  components: {
      Table,
      Button,
      MultipleSelect,
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
        this.$router.push({ name: "CreateSystemAccessRight" });
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
          this.$router.push({
              // name: 'CreateEditIM_new',
              name: "EditSystemAccessRight",
              query: { SystemAccessCode: pass_payload.row.code}
          });
      },
      handleReceiveHandleDelete(pass_payload)
      {
        this.get_code = pass_payload.row.code
        // this.delete_system = true
      },
      async handleDeleteSystem(){
        this.deleteLoading = true

        var payload = {
          "pass_json":{
            "outlet_guid": this.session_outlet_guid,
            "language": this.language,
            "code": this.get_code,
          }
        }

        var object_pass = {
          "dispatch": 'setup2_systemaccessright/trigger_delete_xgmain_get_xgmain',
          "getter": 'setup2_systemaccessright/get_xgmain_get_xgmain',
          "app": this,
          "payload": payload,
        };

        var dispatch_response_delete_xgmain_get_xgmain = await this.$dispatch(object_pass);

        var status = dispatch_response_delete_xgmain_get_xgmain.status

        if(status){
          this.showNotify('positive', 'Deleted Successfully')
          this.delete_system = false
          this.deleteLoading = false
          this.table_function(this.ori_params)
        }else{
          var get_error_message = JSON.parse(dispatch_response_delete_xgmain_get_xgmain.response)
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
            payload.ordering = "-code"
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

          var data = {};

          var xpayload = {
          "pass_json":{
            "outlet_guid": this.session_outlet_guid,
            "language": this.language,
            "limit": this.ori_params.params.limit,
            "skip": this.ori_params.params.skip,
            // "ordering": this.ori_params.params.ordering == "" ? "-Updated_at" : this.ori_params.params.ordering,
            "sort_by": payload.sort_by == "" ? "code" : payload.sort_by,
            "sort_type": payload.sort_type == "" ? "Desc" : payload.sort_type
          }
        }

        // if(this.table_column.length != 0){
        //   xpayload.pass_json.code = this.table_column[1].filter_value;
        //   xpayload.pass_json.description = this.table_column[2].filter_value;
        // }

        if(this.table_column.length != 0){
          xpayload.pass_json.code = this.table_column[0].filter_value;
          xpayload.pass_json.description = this.table_column[1].filter_value;
        }

        var object_pass = {
          "dispatch": 'setup2_systemaccessright/trigger_get_xgmain_get_xgmain',
          "getter": 'setup2_systemaccessright/get_xgmain_get_xgmain',
          "app": this,
          "payload": xpayload,
        };

        var dispatch_response_get_xgmain_get_xgmain = await this.$dispatch(object_pass);

        var status = dispatch_response_get_xgmain_get_xgmain.status

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
              var results = dispatch_response_get_xgmain_get_xgmain.response.detail;

              this.table_data =
              {
                  "data": {
                      "count": dispatch_response_get_xgmain_get_xgmain.response.total_row,
                      "next": null,
                      "previous": null,
                      "results": dispatch_response_get_xgmain_get_xgmain.response.detail
                  }
              };

              this.results = dispatch_response_get_xgmain_get_xgmain.response.detail;

              // this.showNext = this.ori_params.params.offset + this.ori_params.params.limit >= this.table_data.data.count;
              // // this.filter.total_row = this.table_data.data.count;
              // var from = this.ori_params.params.offset+1;
              // var to = this.ori_params.params.offset + this.table_data.data.results.length;
              // // this.filter.from = from;
              // // this.filter.to = to;
          }

          if(this.rearrange_column.length > 0)
          {
              var table_column = this.rearrange_column;
          }
          else
          {
              var table_column = [
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
                  {
                      name: 'code',
                      required: true,
                      label: 'Group Code',
                      header_align: 'center',
                      headerStyle:'text-align: center; width: 1%;',
                      align: 'left',
                      sortable: true,
                      field: 'code',
                      format_child: '',
                      tooltip: '',
                      filter_type: 'input',
                      filter_options: [],
                      filter_value: '',
                  },
                  {
                      name: 'description',
                      required: true,
                      label: this.$language('D0098'),
                      header_align: 'center',
                      align: 'left',
                      sortable: true,
                      field: 'description',
                      format_child: '',
                      tooltip: '',
                      headerStyle:'width: 20%;',
                      filter_type: 'input',
                      filter_options: [],
                      filter_value: '',
                  }
              ];
          }

          this.table_column = table_column;

          this.forceLoading = false;
      },
  },
  mounted()
  {
      this.filter_options = [
          // {
          //     label: 'action',
          //     value: 'action',
          // },
          {
              label: 'Group Code',
              value: 'code',
          },
          {
              label: 'Description',
              value: 'description',
          }
      ];

      // this.filter_value = this.filter_options.map(option => option.value);
      // this.forceSelectAll = true;


      var visibleColumns = [];

      for (const index in this.filter_options) {
          visibleColumns.push(this.filter_options[index].value);
      }

      this.visibleColumns = visibleColumns;
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
.confirm_cancel_button {
  padding: 16px;
  justify-content: center;
  align-items: center;
  font-size: 16px !important;
  font-style: normal;
  font-weight: 700;
  font-family: InterfontBold;
  border: 2px solid #1E90FF;
  border-radius: 8px;
  box-shadow: 0px 1px 3.6px 0px rgba(0, 0, 0, 0.25);
  width: 112px;
  height: 48px;
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
</style>
