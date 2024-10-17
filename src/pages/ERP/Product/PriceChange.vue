<template>
    <div class="row main_container">

        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">

            Price Change

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
            name: "PriceChangeDetails",
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
                name: "PriceChangeDetailsView",
                query: { TRANS_GUID: pass_payload.row.TRANS_GUID, offset: offset, total_row: total_row}
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
              payload.ordering = "-Updated_at"
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
              "dispatch": 'purchase/trigger_post_get_price_change_req', //refer to path/function_name in store actions.js
              "getter": 'purchase/get_price_change_req', //refer to path/function_name in store getters.js
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
              this.showNotify('negative', 'Failed to get price change. Please try again.')
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
                // {
                //     name: 'action',
                //     required: true,
                //     label: this.$language('D0028'),//'Actions'
                //     align: 'center',
                //     sortable: false,
                //     field: 'action',
                //     format_child: '',
                //     tooltip: '',
                //     filter_type: 'input',
                //     filter_options: [],
                //     filter_value: '',
                // },
                {
                    name: 'RefNo',
                    required: true,
                    label: 'RefNo',
                    align: 'left',
                    sortable: true,
                    field: 'RefNo',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
                {
                    name: 'Location_Group',
                    required: true,
                    label: 'Outlet',
                    align: 'left',
                    sortable: true,
                    field: 'Location_Group',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
                {
                    name: 'ishq',
                    required: true,
                    label: 'HQ',
                    align: 'center',
                    sortable: true,
                    field: 'ishq',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'select',
                    filter_options: [
                        {
                            "label": "Not HQ",
                            "value": "0"
                        },
                        {
                            "label": "Is HQ",
                            "value": "1"
                        }
                    ],
                    filter_value: '',
                },
                {
                    name: 'EffectiveDate',
                    required: true,
                    label: 'Effective Date',
                    align: 'left',
                    sortable: true,
                    field: 'EffectiveDate',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
                {
                    name: 'EffectiveTime',
                    required: true,
                    label: 'Effective Time',
                    align: 'left',
                    sortable: true,
                    field: 'EffectiveTime',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
                {
                    name: 'Send_Req',
                    required: true,
                    label: 'Request Sent',
                    align: 'center',
                    sortable: true,
                    field: 'Send_Req',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
                {
                    name: 'Send_Req_at',
                    required: true,
                    label: 'Request On',
                    align: 'left',
                    sortable: true,
                    field: 'Send_Req_at',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
                {
                    name: 'Send_by',
                    required: true,
                    label: 'Request By',
                    align: 'left',
                    sortable: true,
                    field: 'Send_by',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
                {
                    name: 'Send_Approved',
                    required: true,
                    label: 'Approved',
                    align: 'center',
                    sortable: true,
                    field: 'Send_Approved',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
                {
                    name: 'Send_Approved_at',
                    required: true,
                    label: 'Approved On',
                    align: 'left',
                    sortable: true,
                    field: 'Send_Approved_at',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
                {
                    name: 'Send_Approved_by',
                    required: true,
                    label: 'Approved By',
                    align: 'left',
                    sortable: true,
                    field: 'Send_Approved_by',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
                {
                    name: 'Post_Req',
                    required: true,
                    label: 'Posted',
                    align: 'center',
                    sortable: true,
                    field: 'Post_Req',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
                {
                    name: 'Post_Req_at',
                    required: true,
                    label: 'Posted On',
                    align: 'left',
                    sortable: true,
                    field: 'Post_Req_at',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
                {
                    name: 'Post_by',
                    required: true,
                    label: 'Posted By',
                    align: 'left',
                    sortable: true,
                    field: 'Post_by',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
                {
                    name: 'Print_Req',
                    required: true,
                    label: 'Printed',
                    align: 'center',
                    sortable: true,
                    field: 'Print_Req',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
                {
                    name: 'Print_Req_at',
                    required: true,
                    label: 'Printed On',
                    align: 'left',
                    sortable: true,
                    field: 'Print_Req_at',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
                {
                    name: 'Print_by',
                    required: true,
                    label: 'Printed By',
                    align: 'left',
                    sortable: true,
                    field: 'Print_by',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
                {
                    name: 'Remark',
                    required: true,
                    label: 'Remark',
                    align: 'left',
                    sortable: true,
                    field: 'Remark',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
                {
                    name: 'Created_at',
                    required: true,
                    label: 'Created On',
                    align: 'left',
                    sortable: true,
                    field: 'Created_at',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
                {
                    name: 'Created_by',
                    required: true,
                    label: 'Created By',
                    align: 'left',
                    sortable: true,
                    field: 'Created_by',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
                {
                    name: 'Updated_at',
                    required: true,
                    label: 'Updated On',
                    align: 'left',
                    sortable: true,
                    field: 'Updated_at',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
                {
                    name: 'Updated_by',
                    required: true,
                    label: 'Updated By',
                    align: 'left',
                    sortable: true,
                    field: 'Updated_by',
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
                'label': 'RefNo',
                'value': 'RefNo',
            },
            {
                'label': 'Outlet',
                'value': 'Location_Group',
            },
            {
                'label': 'HQ',
                'value': 'ishq',
            },
            {
                'label': 'Effective Date',
                'value': 'EffectiveDate',
            },
            {
                'label': 'Effective Time',
                'value': 'EffectiveTime',
            },
            {
                'label': 'Request Sent',
                'value': 'Send_Req',
            },
            {
                'label': 'Request On',
                'value': 'Send_Req_at',
            },
            {
                'label': 'Request By',
                'value': 'Send_by',
            },
            {
                'label': 'Approved',
                'value': 'Send_Approved',
            },
            {
                'label': 'Approved On',
                'value': 'Send_Approved_at',
            },
            {
                'label': 'Approved By',
                'value': 'Send_Approved_by',
            },
            {
                'label': 'Posted',
                'value': 'Post_Req',
            },
            {
                'label': 'Posted On',
                'value': 'Post_Req_at',
            },
            {
                'label': 'Posted By',
                'value': 'Post_by',
            },
            {
                'label': 'Printed',
                'value': 'Print_Req',
            },
            {
                'label': 'Printed On',
                'value': 'Print_Req_at',
            },
            {
                'label': 'Printed By',
                'value': 'Print_by',
            },
            {
                'label': 'Remark',
                'value': 'Remark',
            },
            {
                'label': 'Created On',
                'value': 'Created_at',
            },
            {
                'label': 'Created By',
                'value': 'Created_by',
            },
            {
                'label': 'Updated On',
                'value': 'Updated_at',
            },
            {
                'label': 'Updated By',
                'value': 'Updated_by',
            }
        ];

        this.filter_value = ['RefNo','Location_Group','ishq','EffectiveDate','EffectiveTime','Send_Req','Send_Req_at','Send_by','Send_Approved','Send_Approved_at','Send_Approved_by','Post_Req','Post_Req_at','Post_by','Print_Req','Print_Req_at','Print_by','Remark','Created_at','Created_by','Updated_at','Updated_by'];

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
