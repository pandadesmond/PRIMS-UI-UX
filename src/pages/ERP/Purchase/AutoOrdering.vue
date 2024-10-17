<template>

    <div class="row main_container">

        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">

            Auto Ordering
            
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
                    <Button v-on:receiveClick="handleShowCreateVendor"
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
            />

        </div>

    </div>

</template>

<script>
import Table from 'src/components/ERP/Table/Table.vue';
import Button from 'src/components/ERP/Main/Button';
import MultipleSelect from 'src/components/ERP/Main/MultipleSelect';

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
        handleChangeFilterShowColumn(value)
        {
            this.$nextTick(()=>{

                var visibleColumns = [];
                console.log(this.filter_value);

                for (const index in this.filter_value) {
                    visibleColumns.push(this.filter_value[index]);
                }
                this.visibleColumns = visibleColumns;
            });

        },
        handleShowCreateVendor(){
          this.$router.push({ name: "PurchaseOrderDetails" });
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
            var total_row = this.table_data.data.count;

            this.$router.push({
                // name: 'CreateEditIM_new',
                name: "AutoOrderingDetails",
                query: { poex_guid: pass_payload.row.poex_guid, offset: offset, total_row: total_row}
            });
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
            
            payload.skip = payload.offset;
            payload.limit = payload.limit;
            payload.outlet_guid = this.session_outlet_guid;//session
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

            var data = {};

            payload.language = this.language;
                    
            var payload = {
              "pass_json": payload//pass_json should be the field or data wish to be created.
            };

            var object_pass = {
              "dispatch": 'purchase/trigger_get_po_ex', //refer to path/function_name in store actions.js
              "getter": 'purchase/get_po_ex', //refer to path/function_name in store getters.js
              "app": this, //compulsory passed variable
              "payload": payload //payload that needed to use in store actions.js
            };

            var dispatch_response = await this.$dispatch(object_pass);

            if(dispatch_response.status)
            {
              //success condition
                var results = dispatch_response.response.detail;

                this.table_data =
                {
                  "data": {
                      "count": dispatch_response.response.total_row,
                      "next": null,
                      "previous": null,
                      "results": results
                  }
                };

                this.results = results;
              
            }else
            {
              //fail condition
              this.table_data = {
                "data": {
                    "count": 0,
                    "next": null,
                    "previous": null,
                    "results": []
                }
              };
            }

            if(this.rearrange_column.length > 0)
            {
                var table_column = this.rearrange_column;
            }
            else
            {
                var table_column = [
                    {
                        name: 'action',
                        required: true,
                        label: this.$language('D0028'),//'Actions'
                        align: 'center',
                        sortable: false,
                        field: 'action',
                        format_child: '',
                        tooltip: '',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    {
                        name: 'branch',
                        required: true,
                        label: 'Branch',
                        align: 'left',
                        sortable: true,
                        field: 'branch',
                        format_child: '',
                        tooltip: '',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    {
                        name: 'sup_code',
                        required: true,
                        label: 'S.Code',
                        align: 'left',
                        sortable: true,
                        field: 'sup_code',
                        format_child: '',
                        tooltip: '',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    {
                        name: 'sup_name',
                        required: true,
                        label: 'Supplier Name',
                        align: 'left',
                        sortable: true,
                        field: 'sup_name',
                        format_child: '',
                        tooltip: '',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    {
                        name: 'docdate',
                        required: true,
                        label: 'Doc Date',
                        align: 'left',
                        sortable: true,
                        field: 'docdate',
                        format_child: '',
                        tooltip: '',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    {
                        name: 'doc_no',
                        required: true,
                        label: 'Doc No',
                        align: 'left',
                        sortable: true,
                        field: 'doc_no',
                        format_child: '',
                        tooltip: '',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    {
                        name: 'delivery_date',
                        required: true,
                        label: 'Delivery Date',
                        align: 'left',
                        sortable: true,
                        field: 'delivery_date',
                        format_child: '',
                        tooltip: '',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    {
                        name: 'remark',
                        required: true,
                        label: 'Remarks',
                        align: 'left',
                        sortable: true,
                        field: 'remark',
                        format_child: '',
                        tooltip: '',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    {
                        name: 'salesman',
                        required: true,
                        label: 'Salesman',
                        align: 'left',
                        sortable: true,
                        field: 'salesman',
                        format_child: '',
                        tooltip: '',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    {
                        name: 'created_at',
                        required: true,
                        label: 'Created at',
                        align: 'left',
                        sortable: true,
                        field: 'created_at',
                        format_child: '',
                        tooltip: '',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    {
                        name: 'created_by',
                        required: true,
                        label: 'Created By',
                        align: 'left',
                        sortable: true,
                        field: 'created_by',
                        format_child: '',
                        tooltip: '',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    {
                        name: 'updated_at',
                        required: true,
                        label: 'Updated at',
                        align: 'left',
                        sortable: true,
                        field: 'updated_at',
                        format_child: '',
                        tooltip: '',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    {
                        name: 'updated_by',
                        required: true,
                        label: 'Updated by',
                        align: 'left',
                        sortable: true,
                        field: 'updated_by',
                        format_child: '',
                        tooltip: '',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    {
                        name: 'posted',
                        required: true,
                        label: 'Posted',
                        align: 'left',
                        sortable: true,
                        field: 'posted',
                        format_child: '',
                        tooltip: '',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    {
                        name: 'posted_at',
                        required: true,
                        label: 'Posted',
                        align: 'left',
                        sortable: true,
                        field: 'posted_at',
                        format_child: '',
                        tooltip: '',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    {
                        name: 'posted_by',
                        required: true,
                        label: 'Posted by',
                        align: 'left',
                        sortable: true,
                        field: 'posted_by',
                        format_child: '',
                        tooltip: '',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    {
                        name: 'cancel',
                        required: true,
                        label: 'Cancel',
                        align: 'left',
                        sortable: true,
                        field: 'cancel',
                        format_child: '',
                        tooltip: '',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    {
                        name: 'cancel_at',
                        required: true,
                        label: 'Cancel at',
                        align: 'left',
                        sortable: true,
                        field: 'cancel_at',
                        format_child: '',
                        tooltip: '',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    {
                        name: 'cancel_by',
                        required: true,
                        label: 'Cancel by',
                        align: 'left',
                        sortable: true,
                        field: 'cancel_by',
                        format_child: '',
                        tooltip: '',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                ];

            }
            
            this.table_column = table_column;

            this.forceLoading = false;
        },
    },
    mounted()
    {
        this.filter_options = [
            {
                'label': 'Action',
                'value': 'action',
            },
            {
                'label': 'Branch',
                'value': 'branch',
            },
            {
                'label': 'S.Code',
                'value': 'sup_code',
            },
            {
                'label': 'Supplier Name',
                'value': 'sup_name',
            },
            {
                'label': 'Doc Date',
                'value': 'docdate',
            },
            {
                'label': 'Doc No',
                'value': 'doc_no',
            },
            {
                'label': 'Delivery Date',
                'value': 'delivery_date',
            },
            {
                'label': 'Order Day',
                'value': 'remark',
            },
            {
                'label': 'Salesman',
                'value': 'salesman',
            },
            {
                'label': 'Created at',
                'value': 'created_at',
            },
            {
                'label': 'Created by',
                'value': 'created_by',
            },
            {
                'label': 'Updated at',
                'value': 'updated_at',
            },
            {
                'label': 'Updated by',
                'value': 'updated_by',
            },
            {
                'label': 'Posted',
                'value': 'posted',
            },
            {
                'label': 'Posted at',
                'value': 'posted_at',
            },
            {
                'label': 'Posted by',
                'value': 'posted_by',
            },
            {
                'label': 'Cancel',
                'value': 'cancel',
            },
            {
                'label': 'Cancel at',
                'value': 'cancel_at',
            },
            {
                'label': 'Cancel by',
                'value': 'cancel_by',
            }
        ];

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

</style>