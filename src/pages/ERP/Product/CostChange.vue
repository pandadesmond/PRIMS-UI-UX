<template>

    <div class="row main_container">

        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">

            Cost Change

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
            v-on:receiveHandleDelete="handleReceiveHandleDelete"

            :filter_mode_on="filter_mode_on"
            v-on:receiveColumnRearrange="handleColumnRearrange"
            v-on:filter_column="handleFilterColumn"
            :forceLoading="forceLoading"
            :column_reordering="true"
            :row_reordering="false"
            v-on:receiveHandleClearFilter="handleClearFilter"

            :pass_visible_columns="visibleColumns"
            :handleActionColumn="'RefNo'"
            />

        </div>

    </div>

</template>

<script>
import Table from 'src/components/ERP/Table/Table.vue';
import Button from 'src/components/ERP/Main/Button';
import MultipleSelect from 'src/components/ERP/Main/MultipleSelect';
import { Notify } from "quasar";
import BranchDetailsVue from '../Setup/BranchDetails.vue';

export default {
    data(){
        return{
            table_column: [],
            table_data: [],
            filter_mode_on: true,
            rearrange_column: [],
            forceLoading: false,
            filter_options: [],
            filter_value: [],
            visibleColumns: [],
            forceSelectAll: false,
            language: sessionStorage.getItem("language") != "" && sessionStorage.getItem("language") != "null" && sessionStorage.getItem("language") != null ? sessionStorage.getItem("language") : [],
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

                for (const index in this.filter_value) {
                    visibleColumns.push(this.filter_value[index]);
                }
                this.visibleColumns = visibleColumns;
            });

        },
        handleShowCreateVendor(){
          this.$router.push({
            name: "CostChangeDetails",
            query: { total_row: this.table_data.data.count }
          });
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
            // var params_offset = this.ori_params.params.offset;
            var rowIndex = pass_payload.rowIndex;

            var offset = Number(rowIndex);
            var total_row = Number(this.table_data.data.count) - 1;

            this.$router.push({
                name: "CostChangeDetailsView",
                query: { cost_guid: pass_payload.row.cost_guid, offset: offset, total_row: total_row}
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
            payload.trans_type = 'ByVendor';



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
              "dispatch": 'product/trigger_post_get_cost_price_change', //refer to path/function_name in store actions.js
              "getter": 'product/get_cost_price_change', //refer to path/function_name in store getters.js
              "app": this, //compulsory passed variable
              "payload": payload //payload that needed to use in store actions.js
            };

            var dispatch_response = await this.$dispatch(object_pass);

            if(dispatch_response.status)
            {
                //success condition
                var results = dispatch_response.response.detail;



                for(var i in results)
                {
                    results[i].Print_Req = results[i].Print_Req == 0 ? 0 : 1;
                }

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
                this.showNotify('negative', 'Failed to get cost change. Please try again.')
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
                    name: 'branch',
                    required: true,
                    label: 'Branch',
                    align: 'center',
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
                    name: 'refno',
                    required: true,
                    label: 'RefNo',
                    align: 'center',
                    sortable: true,
                    field: 'refno',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
                {
                    name: 'date_doc',
                    required: true,
                    label: 'Date',
                    align: 'center',
                    sortable: true,
                    field: 'date_doc',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
                {
                    name: 'docno',
                    required: true,
                    label: 'Doc No',
                    align: 'center',
                    sortable: true,
                    field: 'docno',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
                {
                    name: 'vendor_code',
                    required: true,
                    label: 'SCode',
                    align: 'center',
                    sortable: true,
                    field: 'vendor_code',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
                {
                    name: 'vendor_name',
                    required: true,
                    label: 'SName',
                    align: 'center',
                    sortable: true,
                    field: 'vendor_name',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
                {
                    name: 'group_name',
                    required: true,
                    label: 'Group',
                    align: 'center',
                    sortable: true,
                    field: 'group_name',
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
                    label: 'Remark',
                    align: 'center',
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
                    name: 'posted',
                    required: true,
                    label: 'Posted',
                    align: 'center',
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
                    label: 'Posted At',
                    align: 'center',
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
                    align: 'center',
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
                    name: 'request',
                    required: true,
                    label: 'Request',
                    align: 'center',
                    sortable: true,
                    field: 'request',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
                {
                    name: 'request_by',
                    required: true,
                    label: 'Request by',
                    align: 'center',
                    sortable: true,
                    field: 'request_by',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
                {
                    name: 'request_at',
                    required: true,
                    label: 'Request at',
                    align: 'center',
                    sortable: true,
                    field: 'request_at',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
                {
                    name: 'approve',
                    required: true,
                    label: 'Approved',
                    align: 'center',
                    sortable: true,
                    field: 'approve',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
                {
                    name: 'approve_by',
                    required: true,
                    label: 'Approved by',
                    align: 'center',
                    sortable: true,
                    field: 'approve_by',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
                {
                    name: 'approved_at',
                    required: true,
                    label: 'Approved at',
                    align: 'center',
                    sortable: true,
                    field: 'approved_at',
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
                    align: 'center',
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
                    label: 'Created by',
                    align: 'center',
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
                    align: 'center',
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
                    align: 'center',
                    sortable: true,
                    field: 'updated_by',
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
    },
    mounted()
    {
        this.filter_options = [
            {
                label: 'Branch',
                value: 'branch'
            },
            {
                label: 'RefNo',
                value: 'refno'
            },
            {
                label: 'Date',
                value: 'date_doc'
            },
            {
                label: 'Doc No',
                value: 'docno'
            },
            {
                label: 'SCode',
                value: 'vendor_code'
            },
            {
                label: 'SName',
                value: 'vendor_name'
            },
            {
                label: 'Group',
                value: 'group_name'
            },
            {
                label: 'Remark',
                value: 'remark'
            },
            {
                label: 'Posted',
                value: 'posted'
            },
            {
                label: 'Posted At',
                value: 'posted_at'
            },
            {
                label: 'Posted by',
                value: 'posted_by'
            },
            {
                label: 'Request',
                value: 'request'
            },
            {
                label: 'Request by',
                value: 'request_by'
            },
            {
                label: 'Request at',
                value: 'request_at'
            },
            {
                label: 'Approved',
                value: 'approve'
            },
            {
                label: 'Approved by',
                value: 'approve_by'
            },
            {
                label: 'Approved at',
                value: 'approved_at'
            },
            {
                label: 'Created at',
                value: 'created_at'
            },
            {
                label: 'Created by',
                value: 'created_by'
            },
            {
                label: 'Updated at',
                value: 'updated_at'
            },
            {
                label: 'Updated by',
                value: 'updated_by'
            },
        ];

        this.filter_value = ['branch','refno','date_doc','docno','vendor_code','vendor_name','group_name','remark','posted','posted_at','posted_by','request','request_by','request_at','approve','approve_by','approved_at','created_at','created_by','updated_at','updated_by'];

        this.forceSelectAll = true;

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
