<template>
    <div class="row main_container">

        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">

            Goods Received Note

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
                    <Button v-on:receiveClick="handleShowCreateGRN"
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
            :row_per_page="[10,50,100,1000]"
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
            v-on:filter_column_range="handleFilterColumnRange"
            :forceLoading="forceLoading"
            :column_reordering="true"
            :row_reordering="false"
            v-on:receiveHandleClearFilter="handleClearFilter"

            :pass_visible_columns="visibleColumns"
            :handleActionColumn="'RefNo'"
            />

        </div>

    </div>


<q-dialog v-model="filter_dialog" persistent position="top">
    <q-card style="width: 50vw; max-width: 500px; max-height: 90vh; margin-top: 5%;">

        <q-card-section class="row items-center dialog_header_custom">
            <div class="text-h6">Filter</div>
            <q-space />
            <q-btn icon="close" flat round dense :disable="loading_dialog" v-close-popup />
        </q-card-section>

        <q-card-section class="row">
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <q-form ref="save_form_dialog">
                    <div class="row dialog_content">
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-bottom: 10px;padding-right: 2px;">
                            <div class="row" style="align-items: center;">
                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3">
                                    <Label :pass_value="'Type'" />
                                </div>
                                <div class="col-xl-9 col-lg-9 col-md-9 col-sm-9 col-xs-9">
                                    <Select
                                        v-model:pass_value="filter_type"
                                        v-on:receiveChange="handleChange"
                                        :dbComponentBehavior="dbComponentBehavior.text"
                                        label=""
                                        :options="filter_type_options"
                                    />
                                </div>
                            </div>
                        </div>


                    </div>
                </q-form>
            </div>
        </q-card-section>

        <q-card-actions class="dialog_action" align="right">
            <q-btn flat label="Cancel" color="primary" v-close-popup/>
            <q-btn flat label="Confirm" color="primary" @click="confirmFilter" />
        </q-card-actions>

        <q-inner-loading
        :showing="loading_dialog"
        color="primary"
        />
    </q-card>
</q-dialog>

</template>

<script>
import TableMerge from 'src/components/ERP/Table/TableMerge.vue';
import Button from 'src/components/ERP/Main/Button';
import MultipleSelect from 'src/components/ERP/Main/MultipleSelect';
import Table from 'src/components/ERP/Table/Table.vue';
import Label from 'src/components/ERP/Main/Label';
import Select from 'src/components/ERP/Main/Select';

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
            filter_dialog: false,
            filter_type_options: [],
            filter_type: '',
            forceSelectAll: false,
        }
    },
    components: {
        TableMerge,
        Button,
        MultipleSelect,
        Table,
        Label,
        Select,
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
        handleShowCreateGRN(){
          this.$router.push({
            name: "GoodsReceivedNoteDetails",
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
                name: "GoodsReceivedNoteDetailsView",
                query: { RefNo: pass_payload.row.RefNo, offset: offset, total_row: total_row}
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
        handleFilterColumnRange(pass_payload)
        {
            this.filter_dialog = true;
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

            var payload = {
              "pass_json": payload//pass_json should be the field or data wish to be created.
            };

            var object_pass = {
              "dispatch": 'purchase/trigger_post_get_read_grmain_new', //refer to path/function_name in store actions.js
              "getter": 'purchase/get_read_grmain', //refer to path/function_name in store getters.js
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
                    main_column: false,
                    main_column_name: 'PODate',
                    index: '',
                    colspan: '',
                    colspan_name: '',
                    start_index: '',
                    end_index: '',
                    rowspan: '0',
                },
                {
                    name: 'InvNo',
                    required: true,
                    label: 'InvNo',
                    align: 'left',
                    sortable: true,
                    field: 'InvNo',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: false,
                    main_column_name: 'PODate',
                    index: '',
                    colspan: '',
                    colspan_name: '',
                    start_index: '',
                    end_index: '',
                    rowspan: '0',
                },
                {
                    name: 'DONo',
                    required: true,
                    label: 'DONo',
                    align: 'left',
                    sortable: true,
                    field: 'DONo',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: false,
                    main_column_name: 'PODate',
                    index: '',
                    colspan: '',
                    colspan_name: '',
                    start_index: '',
                    end_index: '',
                    rowspan: '0',
                },
                {
                    name: 'DocDate',
                    required: true,
                    label: 'Invoice Date',
                    align: 'left',
                    sortable: true,
                    field: 'DocDate',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 5,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 6,
                    end_index: 6,
                    rowspan: '2',
                },
                {
                    name: 'GRDate',
                    required: true,
                    label: 'Rec.Date',
                    align: 'left',
                    sortable: true,
                    field: 'GRDate',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 5,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 6,
                    end_index: 6,
                    rowspan: '2',
                },
                {
                    name: 'Term',
                    required: true,
                    label: 'Term',
                    align: 'left',
                    sortable: true,
                    field: 'Term',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 5,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 6,
                    end_index: 6,
                    rowspan: '2',
                }, 
                
                {
                    name: 'DueDate',
                    required: true,
                    label: 'Due Date',
                    align: 'left',
                    sortable: true,
                    field: 'DueDate',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 5,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 6,
                    end_index: 6,
                    rowspan: '2',
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
                    main_column: true,
                    main_column_name: '',
                    index: 5,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 6,
                    end_index: 6,
                    rowspan: '2',
                },
                {
                    name: 'Code',
                    required: true,
                    label: 'Code',
                    align: 'left',
                    sortable: true,
                    field: 'Code',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 7,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 8,
                    end_index: 8,
                    rowspan: '2',
                },
                {
                    name: 'Name',
                    required: true,
                    label: 'Name',
                    align: 'left',
                    sortable: true,
                    field: 'Name',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 8,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 9,
                    end_index: 9,
                    rowspan: '2',
                },
                {
                    name: 'loc_group',
                    required: true,
                    label: 'Location',
                    align: 'left',
                    sortable: true,
                    field: 'loc_group',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 6,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 7,
                    end_index: 7,
                    rowspan: '2',
                },
                {
                    name: 'BillStatus',
                    required: true,
                    label: 'Posted',
                    align: 'left',
                    sortable: true,
                    field: 'BillStatus',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 17,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 18,
                    end_index: 18,
                    rowspan: '2',
                },
                {
                    name: 'Receivedby',
                    required: true,
                    label: 'Received By',
                    align: 'left',
                    sortable: true,
                    field: 'Receivedby',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 6,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 7,
                    end_index: 7,
                    rowspan: '2',
                },
                
                {
                    name: 'AccStatus',
                    required: true,
                    label: 'Account Status',
                    align: 'left',
                    sortable: true,
                    field: 'AccStatus',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 6,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 7,
                    end_index: 7,
                    rowspan: '2',
                },
                
                {
                    name: 'Closed',
                    required: true,
                    label: 'Closed',
                    align: 'left',
                    sortable: true,
                    field: 'Closed',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 6,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 7,
                    end_index: 7,
                    rowspan: '2',
                },
                {
                    name: 'Total',
                    required: true,
                    label: 'Total',
                    align: 'right',
                    sortable: true,
                    field: 'Total',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 11,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 12,
                    end_index: 12,
                    rowspan: '2',
                },
                {
                    name: 'rebate_amt',
                    required: true,
                    label: 'Rebate Amount',
                    align: 'right',
                    sortable: true,
                    field: 'rebate_amt',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 12,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 13,
                    end_index: 13,
                    rowspan: '2',
                },
                {
                    name: 'postby',
                    required: true,
                    label: 'Post By',
                    align: 'left',
                    sortable: true,
                    field: 'postby',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 13,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 14,
                    end_index: 14,
                    rowspan: '2',
                },
                
                {
                    name: 'unpostdatetime',
                    required: true,
                    label: 'Unpost At',
                    align: 'left',
                    sortable: true,
                    field: 'unpostdatetime',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 0,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 0,
                    end_index: 0,
                    rowspan: '2',
                },
                
                
                {
                    name: 'IssueStamp',
                    required: true,
                    label: 'Created On',
                    align: 'left',
                    sortable: true,
                    field: 'IssueStamp',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 21,
                    colspan: 2,
                    colspan_name: 'IssueStamp',
                    start_index: 22,
                    end_index: 23,
                    rowspan: '0',
                },
                
                {
                    name: 'LastStamp',
                    required: true,
                    label: 'Updated On',
                    align: 'left',
                    sortable: true,
                    field: 'LastStamp',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 20,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 21,
                    end_index: 21,
                    rowspan: '2',
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
                label: 'RefNo',
                value: 'RefNo'
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
                label: 'Term',
                value: 'Term'
            },
            {
                label: 'Remark',
                value: 'Remark'
            },
            {
                label: 'Rec.Date',
                value: 'GRDate'
            },
            {
                label: 'Invoice Date',
                value: 'DocDate'
            },
            {
                label: 'Due Date',
                value: 'DueDate'
            },
            {
                label: 'Location',
                value: 'loc_group'
            },
            
            {
                label: 'Received By',
                value: 'Receivedby'
            },
            
            {
                label: 'Account Status',
                value: 'AccStatus'
            },
            {
                label: 'Closed',
                value: 'Closed'
            },
            {
                label: 'Code',
                value: 'Code'
            },
            {
                label: 'Name',
                value: 'Name'
            },
            {
                label: 'Total',
                value: 'Total'
            },
            {
                label: 'Rebate Amount',
                value: 'rebate_amt'
            },
            {
                label: 'Posted',
                value: 'BillStatus'
            },
            {
                label: 'Post By',
                value: 'postby'
            },
            
            {
                label: 'Unpost At',
                value: 'unpostdatetime'
            },
            {
                label: 'Created On',
                value: 'IssueStamp'
            },
            
            {
                label: 'Updated On',
                value: 'LastStamp'
            }
        ];

        this.filter_value = ['RefNo','GRDate','InvNo','DONo','DocDate','Term','Remark','Receivedby','AccStatus','Closed','DueDate','loc_group','Code','Name','Total','rebate_amt','BillStatus','postby','unpostdatetime','IssueStamp','LastStamp'];

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
