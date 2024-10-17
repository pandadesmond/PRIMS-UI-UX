<template>

    <div class="row main_container">

        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">

            {{title}}

            <div class="row top_row">

                <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                    <MultipleSelect
                    v-model:pass_value="filter_value"
                    v-on:receiveChange="handleChangeFilterShowColumn"
                    :dbComponentBehavior="dbComponentBehavior.text"
                    label=""
                    :options="filter_options"
                    :forceSelectAll="forceSelectAll"
                    />
                </div>

                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 text_right">
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

                    <Button v-on:receiveClick="handleShowUpload"
                    :pass_label="'Upload'"
                    :pass_no_caps="true"
                    :pass_square="true"
                    :pass_dense="true"
                    class="custom_button"
                    />

                    <Button v-on:receiveClick="handleDownload"
                    :pass_label="'Download'"
                    :pass_no_caps="true"
                    :pass_square="true"
                    :pass_dense="true"
                    class="custom_button"
                    />
                </div>
            </div>

            <Table
            :row_per_page="[10,20,50,1000]"
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
            v-on:receiveHandleView="handleReceiveHandleView"
            v-on:receiveHandleDelete="handleReceiveHandleDelete"

            :filter_mode_on="filter_mode_on"
            v-on:receiveColumnRearrange="handleColumnRearrange"
            v-on:filter_column="handleFilterColumn"
            :forceLoading="forceLoading"
            :column_reordering="true"
            :row_reordering="false"
            v-on:receiveHandleClearFilter="handleClearFilter"

            :pass_visible_columns="visibleColumns"
            :handleActionColumn="'Description'"
            />

        </div>

    </div>

    <q-dialog v-model="upload_dialog" persistent position="top">
      <q-card style="width: 95vw; max-width: 500px; max-height: 90vh; margin-top: 5%;">
        <q-card-section class="row items-center dialog_header_custom">
            <div class="text-h6">Upload</div>
            <q-space />
            <q-btn icon="close" flat round dense :disable="upload_loading" @click="closeDialog()" />
        </q-card-section>

        <q-card-section>
          <q-form ref="save_form_second">
            <q-card-section class="row">
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-pb-lg q-mb-lg">
                <!-- url="http://localhost:4444/upload" -->
                <q-uploader
                  ref="uploader"
                  hide-upload-btn
                  style="width:100%;"
                  accept=".xlsx"
                  @added="handleFileUpload"
                >
                <template v-slot:header="scope">
                  <div class="row no-wrap items-center q-pa-sm q-gutter-xs">
                    <q-btn v-if="scope.queuedFiles.length > 0" icon="clear_all" ref="clearAllButton" @click="scope.removeQueuedFiles" round dense flat >
                      <q-tooltip>Clear All</q-tooltip>
                    </q-btn>
                    <div v-if="scope.canAddFiles" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" align="right">
                      <q-btn type="a" icon="add_box" @click="scope.pickFiles" round dense flat>
                        <q-uploader-add-trigger />
                        <q-tooltip>Pick Files</q-tooltip>
                      </q-btn>
                    </div>
                  </div>
                </template>
              </q-uploader>

              </div>
              <!-- <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-pb-sm">
                <b>Upload Result</b>
              </div>
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <div v-html="upload_results"></div>
              </div> -->

            </q-card-section>
          </q-form>
        </q-card-section>

        <q-card-actions class="dialog_action" align="right">
            <q-btn flat label="Cancel" color="primary" @click="closeDialog"/>
            <q-btn flat :label="'Confirm'" color="primary" @click="saveUploadFile" />
        </q-card-actions>

        <q-inner-loading
          :showing="upload_loading"
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
            route_path_view: '',
            title: 'Flow Through',
            TransType: null,
            fileselected: null,
            upload_dialog: false,
            upload_loading: false,
            category_options:[],
            table_column: [],
            table_data: [],
            filter_mode_on: true,
            rearrange_column: [],
            forceLoading: false,
            filter_options: [],
            filter_value: [],
            visibleColumns: [],
            language: sessionStorage.getItem("language") != "" && sessionStorage.getItem("language") != "null" && sessionStorage.getItem("language") != null ? sessionStorage.getItem("language") : [],
            session_outlet_guid: sessionStorage.getItem("session_outlet_guid") != "" && sessionStorage.getItem("session_outlet_guid") != "null" && sessionStorage.getItem("session_outlet_guid") != null ? sessionStorage.getItem("session_outlet_guid") : [],
            getuser: sessionStorage.getItem("getuser") != "" && sessionStorage.getItem("getuser") != "null" && sessionStorage.getItem("getuser") != null ? sessionStorage.getItem("getuser") : [],
            forceSelectAll: false,
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
        async saveUploadFile()
        {
          this.upload_loading = true;

          if(this.fileselected == ""){
            this.showNotify("negative","No file chosen.");
            this.upload_loading = false;
            return;
          }

          var formData = new FormData();
          formData.append("file", this.fileselected[0]);

          var payload = {
            params: {
              outlet_guid: this.session_outlet_guid,
              language: this.language
            },
            pass_json: formData,
            headers: {
              "Content-Type": "multipart/form-data",
            }
          }

          var object_pass = {
              "dispatch": 'itemmaster/trigger_post_excel_upload_itemmaster',
              "getter": 'itemmaster/get_excel_upload_itemmaster',
              "app": this,
              "payload": payload,

          };

          var dispatch_response = await this.$dispatch(object_pass);
          console.log(dispatch_response)
          var response = [];

          if(dispatch_response.status)
          {
            this.showNotify("positive", 'Upload successfully.');
            this.$refs.uploader.removeQueuedFiles();
            this.fileselected = '';
            this.table_function(this.ori_params);
            this.upload_loading = false;
            this.upload_dialog = false;
          }
          else
          {
            var error_message = 'Failed to upload. Please try again.';

            var isValidJSON = this.isValidJSON(dispatch_response.response);

            if(isValidJSON)
            {
              var json_message = JSON.parse(dispatch_response.response);
              var error_message = json_message.detail ? json_message.detail : error_message;
            }
            else
            {
              var error_message = dispatch_response.response;
            }

            var show_error = "";

            show_error = error_message;

            this.showNotify('negative', show_error);
            this.upload_loading = false;
          }
        },
        handleFileUpload(file)
        {
          this.fileselected = file;
        },
        handleShowUpload()
        {
          this.fileselected = null;
          this.upload_dialog = true;
        },
        async handleDownload()
        {
          var payload = {
            pass_json: {}
          }

          var response = await fetch(`${this.$global_config.url}itemmaster/excel_download_itemmaster/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              // 'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload)
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          // Read the response as a blob
          var blob = await response.blob();

          // Create a download link for the received file
          var link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = `Upload Itemmaster.xlsx`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        },
        closeDialog()
        {
          this.upload_dialog = false;
          this.fileselected = null;
        },
        async getAllCategoryOptions(){
            var payload = {
                  language : this.language,
                  skip: 0,
                  limit: 99999999,
                  sort_by: "Description",
                  sort_type: "ASC",
            }
            var category = await this.getCategory(payload)

            var category_results = category.detail

            var category_code = [];
            var category_name = [];

            for(var i in category_results)
            {
              var sample = category_results[i];

              var obj = {
                label: sample.Code+ ' - ' + sample.Description,
                value: sample.Code
              }

              var obj1 = {
                label: sample.Description,
                value: sample.Code
              }

              category_code.push(obj);
              category_name.push(obj1);
            }

            this.category_options = category_name
    },
        handleChangeFilterShowColumn(value)
        {
            this.$nextTick(()=>{

                var visibleColumns = [];
                console.log(this.filter_value);

                for (const index in this.filter_value) {
                    visibleColumns.push(this.filter_value[index]);
                }
console.log(visibleColumns);
                this.visibleColumns = visibleColumns;
            });

        },
        handleShowCreateItemMaster(){
          this.$router.push({ name: "CreateItemmaster" });
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
            console.log('handleReceiveHandleAdd');
            console.log(pass_payload);
        },
        handleReceiveHandleEdit(pass_payload)
        {
            var params_offset = this.ori_params.params.offset;
            var rowIndex = pass_payload.rowIndex;

            var offset = Number(params_offset) + Number(rowIndex);
            var total_row = Number(this.table_data.data.count) - 1;

            this.$router.push({
                name: "FlowThroughView",
                query: { consol_guid: pass_payload.row.consol_guid, offset: offset, total_row: total_row}
            });

        },
        handleReceiveHandleView(pass_payload)
        {
          this.$router.push(
            {
              name: "ItemmasterView",
              query: { Itemcode: pass_payload.row.Itemcode}
            }
          );
        },
        handleReceiveHandleDelete(pass_payload)
        {
            console.log('handleReceiveHandleDelete');
            console.log(pass_payload);
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

          payload.limit = payload.limit;
          payload.skip = payload.offset;
          payload.language = this.language;

          for (const index in this.table_column) {

              var is_array = Array.isArray(this.table_column[index].filter_value);
              if(is_array)
              {
                  var value = '';

                  for (const value_index in this.table_column[index].filter_value) {
                      value += this.table_column[index].filter_value[value_index]+",";
                  }

                  value = value.replace(/,\s*$/, "");

                  payload[this.table_column[index].name] = value
              }
              else
              {
                  if(this.table_column[index].filter_value)
                  {
                      payload[this.table_column[index].name] = this.table_column[index].filter_value
                  }
                  else
                  {
                      delete payload[this.table_column[index].name]
                  }

              }
          }

          if(payload.ordering == "")
          {
            payload.ordering = "-updated_at"
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

          

          var payload = {
            "pass_json": payload//pass_json should be the field or data wish to be created.
          };

          var object_pass = {
            "dispatch": `inventory/trigger_post_get_ibt_consolidate`,
            "getter": `inventory/get_ibt_consolidate`,
            "app": this,
            "payload": payload
          };
          
          var dispatch_response = await this.$dispatch(object_pass);

          if(!dispatch_response.status){
              this.table_data = {
                  "data": {
                      "count": 0,
                      "next": null,
                      "previous": null,
                      "results": []
                  }
              };

          }
          else
          {
              var results = dispatch_response.response.detail;


              this.table_data =
              {
                  "data": {
                      "count": dispatch_response.response.total_row,
                      "next": null,
                      "previous": null,
                      "results": dispatch_response.response.detail
                  }
              };

              this.results = dispatch_response.response.detail;

              this.showNext = this.ori_params.params.offset + this.ori_params.params.limit >= this.table_data.data.count;
              // this.filter.total_row = this.table_dispatch_response.response.count;
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
                  //     data_type: "text",
                  //     data_decimal: "",
                  // },
                {
                  name: "refno",
                  required: true,
                  label: "Batch RefNo",
                  align: 'left',
                  sortable: true,
                  field: "refno",
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
                  data_type: "text",
                  data_decimal: "",
                },
                {
                  name: "refno",
                  required: true,
                  label: "IBT RefNo",
                  align: 'left',
                  sortable: true,
                  field: "refno",
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
                  data_type: "text",
                  data_decimal: "",
                },
                {
                  name: "date_request",
                  required: true,
                  label: "Request Date",
                  align: 'left',
                  sortable: true,
                  field: "date_request",
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
                  data_type: "text",
                  data_decimal: "",
                },
                {
                  name: "sup_code",
                  required: true,
                  label: "Supplier Code",
                  align: 'left',
                  sortable: true,
                  field: "sup_code",
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
                  data_type: "text",
                  data_decimal: "",
                },
                {
                  name: "loc_group",
                  required: true,
                  label: "Loc Group",
                  align: 'left',
                  sortable: true,
                  field: "loc_group",
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
                  data_type: "text",
                  data_decimal: "",
                },
                {
                  name: "location",
                  required: true,
                  label: "Location",
                  align: 'left',
                  sortable: true,
                  field: "location",
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
                  data_type: "text",
                  data_decimal: "",
                },
                {
                  name: "po_refno",
                  required: true,
                  label: "PO RefNo",
                  align: 'left',
                  sortable: true,
                  field: "po_refno",
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
                  data_type: "text",
                  data_decimal: "",
                },
                {
                  name: "price_change_dc_refno",
                  required: true,
                  label: "Price Change DC RefNo",
                  align: 'left',
                  sortable: true,
                  field: "price_change_dc_refno",
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
                  data_type: "text",
                  data_decimal: "",
                },
                {
                  name: "price_change_hq_refno"  ,
                  required: true,
                  label: "Price Change HQ RefNo"  ,
                  align: 'left',
                  sortable: true,
                  field: "price_change_hq_refno"  ,
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
                  data_type: "text",
                  data_decimal: "",
                },
                {
                  name: "remark",
                  required: true,
                  label: "Remark",
                  align: 'left',
                  sortable: true,
                  field: "remark",
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
                  data_type: "text",
                  data_decimal: "",
                },
                {
                  name: "posted",
                  required: true,
                  label: "Posted",
                  align: 'left',
                  sortable: true,
                  field: "posted",
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
                  data_type: "text",
                  data_decimal: "",
                },
                {
                  name: "posted_at",
                  required: true,
                  label: "Posted At",
                  align: 'left',
                  sortable: true,
                  field: "posted_at",
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
                  data_type: "text",
                  data_decimal: "",
                },
                {
                  name: "posted_by",
                  required: true,
                  label: "Posted By",
                  align: 'left',
                  sortable: true,
                  field: "posted_by",
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
                  data_type: "text",
                  data_decimal: "",
                },
                {
                  name: "created_at",
                  required: true,
                  label: "Created At",
                  align: 'left',
                  sortable: true,
                  field: "created_at",
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
                  data_type: "text",
                  data_decimal: "",
                },
                {
                  name: "created_by",
                  required: true,
                  label: "Created By",
                  align: 'left',
                  sortable: true,
                  field: "created_by",
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
                  data_type: "text",
                  data_decimal: "",
                },
                {
                  name: "updated_at",
                  required: true,
                  label: "Updated At",
                  align: 'left',
                  sortable: true,
                  field: "updated_at",
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
                  data_type: "text",
                  data_decimal: "",
                },
                {
                  name: "updated_by",
                  required: true,
                  label: "Updated By",
                  align: 'left',
                  sortable: true,
                  field: "updated_by",
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
                  data_type: "text",
                  data_decimal: "",
                },
              ];

          }


          this.table_column = table_column;

          this.forceLoading = false;
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
        isValidJSON(str) {
          // if (typeof str !== 'string') {
          //   return false;
          // }

          try {
            const parsed = JSON.parse(str);
            // Ensure the result is an object or array (valid JSON)
            return typeof parsed === 'object' && parsed !== null;
          } catch (e) {
            return false;
          }
        },
    },
    async created()
    {
    },
    async mounted()
    {
        // this.getAllCategoryOptions();
        this.filter_options = [
          {
            "label": "Batch RefNo",
            "value": "refno"
          },
          {
            "label": "IBT RefNo",
            "value": "refno"
          },
          {
            "label": "Request Date",
            "value": "date_request"
          },
          {
            "label": "Supplier Code",
            "value": "sup_code"
          },
          {
            "label": "Loc Group",
            "value": "loc_group"
          },
          {
            "label": "Location",
            "value": "location"
          },
          {
            "label": "PO RefNo",
            "value": "po_refno"
          },
          {
            "label": "Price Change DC RefNo",
            "value": "price_change_dc_refno"
          },
          {
            "label": "Price Change HQ RefNo"  ,
            "value": "price_change_hq_refno"
          },
          {
            "label": "Remark",
            "value": "remark"
          },
          {
            "label": "Posted",
            "value": "posted"
          },
          {
            "label": "Posted At",
            "value": "posted_at"
          },
          {
            "label": "Posted By",
            "value": "posted_by"
          },
          {
            "label": "Created At",
            "value": "created_at"
          },
          {
            "label": "Created By",
            "value": "created_by"
          },
          {
            "label": "Updated At",
            "value": "updated_at"
          },
          {
            "label": "Updated By",
            "value": "updated_by"
          }
        ];
        
        
        this.filter_value = ['refno','date_request','sup_code','loc_group','location','po_refno','price_change_dc_refno','price_change_hq_refno','remark','posted','posted_at','posted_by','created_at','created_by','updated_at','updated_by'];
        this.forceSelectAll = true;
        var visibleColumns = [];


        for (const index in this.filter_options) {
            visibleColumns.push(this.filter_options[index].value);
        }

        this.visibleColumns = visibleColumns;
    },

}
</script>

<style scoped>
th[colspan="2"] {
  text-align: center;
}

th:nth-child(4), th:nth-child(5) {
  display: none; /* Hide duplicate header cells */
}

th[colspan="2"]:before {
  content: 'Stock Type & Link';
  display: block;
  position: relative;
  top: -1.5em; /* Adjust to position above sub-columns */
  font-weight: bold;
}

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

</style>
