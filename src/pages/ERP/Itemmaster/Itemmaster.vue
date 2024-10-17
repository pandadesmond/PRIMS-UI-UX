<template>

    <div class="row main_container">

        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">

            Product Master

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
                // name: 'CreateEditIM_new',
                name: "ItemmasterView",
                query: { Itemcode: pass_payload.row.Itemcode, offset: offset, total_row: total_row}

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
            // payload.Itemcode = '';
            // payload.vendor_code = '';
            // payload.Description = '';
            // payload.Dept = '';
            payload.hierarchy = '1';

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

            var mobile = this.$q.screen.width < 600;
            // if(mobile)
            // {
            //   payload.limit = this.filter.pagination;
            // }

            if(payload.ordering == "")
            {
              payload.ordering = "-LastStamp"
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

            payload.language = this.language;

            await this.$store.dispatch('itemmaster/trigger_read_item_all', payload).then(() => {
               data = JSON.parse(JSON.stringify(this.$store.getters['itemmaster/get_itemmaster']));

            });

            // if(this.page_function != 'DebitNote')
            // {
            var status = data.status
           // var results = data.data.detail;
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
                var results = data.data.detail;

                for (const index in results) {

                    if(results[index].Disable == "0")
                    {
                        var Disable = "Active";
                    }
                    else if(results[index].Disable == "1")
                    {
                        var Disable = "Disable";
                    }
                    else if(results[index].Disable == "2")
                    {
                        var Disable = "Delisted";
                    }
                    else if(results[index].Disable == "3")
                    {
                        var Disable = "Non-Listed";
                    }

                    results[index].Disable = Disable;

                    if(results[index].SoldByWeight == "0")
                    {
                        var SoldByWeight = "Non-Weight";
                    }
                    else if(results[index].SoldByWeight == "1")
                    {
                        var SoldByWeight = "Weight";
                    }

                    results[index].SoldByWeight = SoldByWeight;


                    if(results[index].BarcodeType == "0")
                    {
                        var BarcodeType = "NA";
                    }
                    else if(results[index].BarcodeType == "P")
                    {
                        var BarcodeType = "By Weight";
                    }
                    else if(results[index].BarcodeType == "Q")
                    {
                        var BarcodeType = "By Qty";
                    }

                    results[index].BarcodeType = BarcodeType;

                    if(results[index].stock_type == "0")
                    {
                        var stock_type = "Basic";
                    }
                    else if(results[index].stock_type == "1")
                    {
                        var stock_type = "Premium";
                    }

                    results[index].stock_type = stock_type;

                    if(results[index].Consign == "0")
                    {
                        var Consign = "Outright";
                    }
                    else if(results[index].Consign == "1")
                    {
                        var Consign = "Consign";
                    }

                    results[index].Consign = Consign;

                    if(results[index].inv_type == "0")
                    {
                        var inv_type = "Finished Goods";
                    }
                    else if(results[index].inv_type == "1")
                    {
                        var inv_type = "Semi-Finished Goods";
                    }
                    else if(results[index].inv_type == "2")
                    {
                        var inv_type = "Raw Material";
                    }
                    else if(results[index].inv_type == "3")
                    {
                        var inv_type = "Services";
                    }
                    else if(results[index].inv_type == "")
                    {
                        var inv_type = "";
                    }

                    results[index].inv_type = inv_type;

                    results[index].Category_description = results[index].Category +" - "+ results[index].category__Description;
                }

                this.table_data =
                {
                    "data": {
                        "count": data.data.total_row,
                        "next": null,
                        "previous": null,
                        "results": data.data.detail
                    }
                };

                this.results = data.data.detail;

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

                    {
                        name: 'ItemLink',
                        required: true,
                        label: 'Link Code',
                        header_align: 'center',
                        align: 'left',
                        sortable: true,
                        field: 'ItemLink',
                        format_child: '',
                        tooltip: '',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                        data_type: "text",
                        data_decimal: "",
                    },
                    {
                        name: 'Itemcode',
                        required: true,
                        label: 'Itemcode',
                        header_align: 'center',
                        align: 'left',
                        sortable: true,
                        field: 'Itemcode',
                        format_child: '',
                        tooltip: '',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                        data_type: "text",
                        data_decimal: "",
                    },

                    {
                        name: 'ItemBarcode',
                        required: true,
                        label: 'Barcode',
                        header_align: 'center',
                        align: 'left',
                        sortable: true,
                        field: 'ItemBarcode',
                        format_child: '',
                        tooltip: '',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                        data_type: "text",
                        data_decimal: "",
                    },

                    {
                        name: 'Description',
                        required: true,
                        label: 'Description',
                        header_align: 'center',
                        align: 'left',
                        sortable: true,
                        field: 'Description',
                        format_child: '',
                        tooltip: '',
                        headerStyle:'width: 20%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                        data_type: "text",
                        data_decimal: "",
                    },
                    {
                        name: 'PackSize',
                        required: true,
                        label:  'PackSize',
                        header_align: 'center',
                        align: 'right',
                        sortable: true,
                        field: 'PackSize',
                        format_child: '',
                        tooltip: '',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                        data_type: "number",
                        data_decimal: "",
                    },
                    {
                        name: 'UM',
                        required: true,
                        label: this.$language('D0173'),
                        header_align: 'center',
                        align: 'left',
                        sortable: true,
                        field: 'UM',
                        format_child: '',
                        tooltip: '',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                        data_type: "text",
                        data_decimal: "",
                    },

                    {
                        name: 'BulkQty',
                        required: true,
                        label: 'Case Qty',  // this.$language('D0228')
                        header_align: 'center',
                        align: 'right',
                        sortable: true,
                        field: 'BulkQty',
                        format_child: '',
                        tooltip: '',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                        data_type: "number",
                        data_decimal: "",
                    },

                    {
                        name: 'UMBulk',
                        required: true,
                        label: 'Bulk UOM',  //Bulk UOM
                        header_align: 'center',
                        align: 'left',
                        sortable: true,
                        field: 'UMBulk',
                        format_child: '',
                        tooltip: '',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                        data_type: "text",
                        data_decimal: "",
                    },

                    {
                        name: 'SellingPrice',
                        required: true,
                        label: 'Price', // this.$language('D0231')
                        header_align: 'center',
                        align: 'right',
                        sortable: true,
                        field: 'SellingPrice',
                        format: (val) => {return val ? parseFloat(val).toFixed(2) : '0.00';},
                        format_child: '',
                        tooltip: '',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                        data_type: "number",
                        data_decimal: "",
                    },
                    {
                        name: 'Division',
                        required: true,
                        label: 'Division', //Dept
                        header_align: 'center',
                        align: 'left',
                        sortable: true,
                        field: 'Division',
                        format_child: '',
                        tooltip: '',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                        data_type: "text",
                        data_decimal: "",
                    },
                    {
                        name: 'Dept',
                        required: true,
                        label: this.$language('D0194'), //Dept
                        header_align: 'center',
                        align: 'left',
                        sortable: true,
                        field: 'Dept',
                        format_child: '',
                        tooltip: '',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                        data_type: "text",
                        data_decimal: "",
                    },
                    {
                        name: 'SubDept',
                        required: true,
                        label: this.$language('D0195'), //SubDept
                        header_align: 'center',
                        align: 'left',
                        sortable: true,
                        field: 'SubDept',
                        format_child: '',
                        tooltip: '',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                        data_type: "text",
                        data_decimal: "",
                    },
                    {
                        name: 'Category',
                        required: true,
                        label:  this.$language('D0196'), // Category
                        header_align: 'center',
                        align: 'left',
                        sortable: true,
                        field: 'Category_description',
                        // field: row => `${row.Category} - ${row.category__Description}`,
                        // format: (val) => {
                        //     var category = this.category_options.find(option => option.value === val);
                        //     return category ? `${category.value} - ${category.label}` : val; },
                        format_child: '',
                        tooltip: '',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                        data_type: "text",
                        data_decimal: "",
                    },
                    {
                        name: 'Manufacturer',
                        required: true,
                        label: 'Manufacturer', //Manufacturer
                        header_align: 'center',
                        align: 'left',
                        sortable: true,
                        field: 'Manufacturer',
                        format_child: '',
                        tooltip: '',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                        data_type: "text",
                        data_decimal: "",
                    },
                    {
                        name: 'Brand',
                        required: true,
                        label: 'Brand', //Brand
                        header_align: 'center',
                        align: 'left',
                        sortable: true,
                        field: 'Brand',
                        format_child: '',
                        tooltip: '',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                        data_type: "text",
                        data_decimal: "",
                    },
                    {
                        name: 'vendor_code',
                        required: true,
                        label: 'Supplier', //  Colour
                        header_align: 'center',
                        align: 'left',
                        sortable: true,
                        field: 'vendor_code',
                        format_child: '',
                        tooltip: '',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                        data_type: "text",
                        data_decimal: "",
                    },
                    {
                        name: 'Disable',
                        required: true,
                        label: 'Status', //  Colour
                        header_align: 'center',
                        align: 'left',
                        sortable: true,
                        field: 'Disable',
                        format_child: '',
                        tooltip: '',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                        data_type: "text",
                        data_decimal: "",
                    },
                    // {
                    //     name: 'Disable',
                    //     required: true,
                    //     label: 'Status', //  Colour
                    //     header_align: 'center',
                    //     align: 'left',
                    //     sortable: true,
                    //     field: 'Disable',
                    //     format: val => {
                    //         const statusMap = {
                    //         0: 'Active',
                    //         1: 'Disable',
                    //         2: 'Delisted',
                    //         3: 'Non-Listed'
                    //     };
                    //     return `${statusMap[val] || 'Unknown'}`; // default to 'Unknown' if value is not mapped
                    //     },
                    //     format_child: '',
                    //     tooltip: '',
                    //     filter_type: 'input',
                    //     filter_options: [],
                    //     filter_value: '',
                    // },
                    {
                        name: 'price_type',
                        required: true,
                        label: 'Price Type', //  Colour
                        header_align: 'center',
                        align: 'left',
                        sortable: true,
                        field: 'price_type',
                        format_child: '',
                        tooltip: '',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                        data_type: "text",
                        data_decimal: "",
                    },
                    {
                        name: 'ItemType',
                        required: true,
                        label: 'Item Type', //  Colour
                        header_align: 'center',
                        align: 'left',
                        sortable: true,
                        field: 'ItemType',
                        format_child: '',
                        tooltip: '',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                        data_type: "text",
                        data_decimal: "",
                    },
                    {
                        name: 'SoldByWeight',
                        required: true,
                        label: 'Weight', //  Colour
                        header_align: 'center',
                        align: 'left',
                        sortable: true,
                        field: 'SoldByWeight',
                        format_child: '',
                        tooltip: '',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                        data_type: "text",
                        data_decimal: "",
                    },
                    // {
                    //     name: 'SoldByWeight',
                    //     required: true,
                    //     label: 'Weight', //  Colour
                    //     header_align: 'center',
                    //     align: 'left',
                    //     sortable: true,
                    //     field: 'SoldByWeight',
                    //     format: val => {
                    //         const weightMap = {
                    //         0: 'Non-Weight',
                    //         1: 'Weight',
                    //     };
                    //     return `${weightMap[val] || 'Unknown'}`; // default to 'Unknown' if value is not mapped
                    //     },
                    //     format_child: '',
                    //     tooltip: '',
                    //     filter_type: 'input',
                    //     filter_options: [],
                    //     filter_value: '',
                    // },
                    {
                        name: 'BarcodeType',
                        required: true,
                        label: 'Weight Type', //  Colour
                        header_align: 'center',
                        align: 'left',
                        sortable: true,
                        field: 'BarcodeType',
                        format_child: '',
                        tooltip: '',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                        data_type: "text",
                        data_decimal: "",
                    },
                    // {
                    //     name: 'BarcodeType',
                    //     required: true,
                    //     label: 'Weight Type', //  Colour
                    //     header_align: 'center',
                    //     align: 'left',
                    //     sortable: true,
                    //     field: 'BarcodeType',
                    //     format: val => {
                    //         const weightTypeMap = {
                    //         0: 'Na',
                    //         P: 'By weight',
                    //         Q: 'By Qty'
                    //     };
                    //     return `${weightTypeMap[val] || 'Unknown'}`; // default to 'Unknown' if value is not mapped
                    //     // return `${val}-${weightTypeMap[val] || 'Unknown'}`; // default to 'Unknown' if value is not mapped
                    //     },
                    //     format_child: '',
                    //     tooltip: '',
                    //     filter_type: 'input',
                    //     filter_options: [],
                    //     filter_value: '',
                    // },

                    {
                        name: 'stock_type',
                        required: true,
                        label: 'Stock Type', //  Colour
                        header_align: 'center',
                        align: 'left',
                        sortable: true,
                        field: 'stock_type',
                        format_child: '',
                        tooltip: '',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                        data_type: "text",
                        data_decimal: "",
                    },
                    // {
                    //     name: 'stock_type',
                    //     required: true,
                    //     label: 'Stock Type', //  Colour
                    //     header_align: 'center',
                    //     align: 'left',
                    //     sortable: true,
                    //     field: 'stock_type',
                    //     format: val => {
                    //         const StockTypeMap = {
                    //         0: 'Basic',
                    //         P: 'Premium',

                    //     };
                    //     return `${StockTypeMap[val] || 'Unknown'}`; // default to 'Unknown' if value is not mapped
                    //     // return `${val}-${weightTypeMap[val] || 'Unknown'}`; // default to 'Unknown' if value is not mapped
                    //     },
                    //     format_child: '',
                    //     tooltip: '',
                    //     filter_type: 'input',
                    //     filter_options: [],
                    //     filter_value: '',
                    // },
                    {
                        name: 'basic_link',
                        required: true,
                        label: 'Stock Link', //  Colour
                        header_align: 'center',
                        align: 'left',
                        sortable: true,
                        field: 'basic_link',
                        format_child: '',
                        tooltip: '',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                        data_type: "text",
                        data_decimal: "",
                    },
                    // {
                    //     name: 'stock_type',
                    //     required: true,
                    //     label: 'Stock Type & Link', //  Colour
                    //     header_align: 'center',
                    //     align: 'left',
                    //     sortable: true,
                    //     field: 'stock_type',
                    //     format_child: '',
                    //     tooltip: '',
                    //     filter_type: 'input',
                    //     filter_options: [],
                    //     filter_value: '',
                    // },
                    // {
                    //     name: 'basic_link',
                    //     required: true,
                    //     label: 'Stock Type & Link (Link)', //  Colour
                    //     header_align: 'center',
                    //     align: 'left',
                    //     sortable: true,
                    //     field: 'basic_link',
                    //     format_child: '',
                    //     tooltip: '',
                    //     filter_type: 'input',
                    //     filter_options: [],
                    //     filter_value: '',
                    // },
                    {
                        name: 'Consign',
                        required: true,
                        label: 'Inventory', //  Colour
                        header_align: 'center',
                        align: 'left',
                        sortable: true,
                        field: 'Consign',
                        format_child: '',
                        tooltip: '',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                        data_type: "text",
                        data_decimal: "",
                    },
                    // {
                    //     name: 'Consign',
                    //     required: true,
                    //     label: 'Inventory', //  Colour
                    //     header_align: 'center',
                    //     align: 'left',
                    //     sortable: true,
                    //     field: 'Consign',
                    //     format: val => {
                    //         const InventoryMap = {
                    //         0: 'Outright',
                    //         P: 'Consign',
                    //     };
                    //     return `${InventoryMap[val] || 'Unknown'}`; // default to 'Unknown' if value is not mapped
                    //     },
                    //     format_child: '',
                    //     tooltip: '',
                    //     filter_type: 'input',
                    //     filter_options: [],
                    //     filter_value: '',
                    // },
                    {
                        name: 'inv_type',
                        required: true,
                        label: 'Inventory Type', //  Colour
                        header_align: 'center',
                        align: 'left',
                        sortable: true,
                        field: 'inv_type',
                        format_child: '',
                        tooltip: '',
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
    async mounted()
    {
        // this.getAllCategoryOptions();
        this.filter_options = [
            // {
            //     label: 'Stock Type & Link',
            //     value: 'stock_type',
            // },
            // {
            // label: 'Inventory Type',
            // value: 'inventory_type_consign', // Concatenated field for stock_type and basic_link
            // },
            // {
            //     label: 'action',
            //     value: 'action',
            // },
            {
                label: 'Itemcode',
                value: 'Itemcode',
            },
             {
                label: 'Barcode',
                value: 'ItemBarcode',
            },
            {
                label: 'Link Code',
                value: 'ItemLink',
            },
            {
                label: 'Description',
                value: 'Description',
                filter_value: '',
            },
            {
                label: 'PackSize',
                value: 'PackSize',
            },
            // {
            //     label: 'UM',
            //     value: 'UM',
            // },
            // {
            //     label: 'BestBuy',
            //     value: 'BestBuy',
            // },
            {
                label: 'Bulk UOM',
                value: 'UMBulk',
            },
            {
                label: 'Case Qty',
                value: 'BulkQty',
            },
            // {
            //     label: 'OnHandQty',
            //     value: 'OnHandQty',
            // },
            // {
            //     label: 'SafetyLevel',
            //     value: 'SafetyLevel',
            // },
            // {
            //     label: 'ReorderLevel',
            //     value: 'ReorderLevel',
            // },
            {
                label: 'Price',
                value: 'SellingPrice',
            },
            {
                label: 'Dept',
                value: 'Dept',
            },
            {
                label: 'SubDept',
                value: 'SubDept',
            },
            {
                label: 'Category',
                value: 'Category',
            },
            {
                label: 'Manufacturer',
                value: 'Manufacturer',
            },
            {
                label: 'Brand',
                value: 'Brand',
            },
            // {
            //     label: 'Colour',
            //     value: 'Colour',
            // },
            {
                label: 'Division',
                value: 'Division',
            },
            {
                label: 'Supplier',
                value: 'vendor_code',
            },
            {
                label: 'Status',
                value: 'Disable',
            },
            {
                label: 'Price Type',
                value: 'price_type',
            },
            {
                label: 'Item Type',
                value: 'ItemType',
            },
            {
                label: 'Weight',
                value: 'SoldByWeight',
            },
            {
                label: 'Weight Type',
                value: 'BarcodeType',
            },
            {
                label: 'Stock Type',
                value: 'stock_type',
            },
            {
                label: 'Stock Link',
                value: 'basic_link',
            },
            {
                label: 'Inventory',
                value: 'Consign',
            },
            {
                label: 'Inventory Type',
                value: 'inv_type',
            }
        ];
        this.filter_value = ['Itemcode','ItemBarcode','ItemLink','Description','PackSize','UMBulk','BulkQty','SellingPrice','Dept','SubDept','Category','Manufacturer','Brand','Division','vendor_code','Disable','price_type','ItemType','SoldByWeight','BarcodeType','stock_type','basic_link','Consign','inv_type'];
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
