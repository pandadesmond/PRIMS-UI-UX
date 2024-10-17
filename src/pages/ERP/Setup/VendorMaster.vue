<template>

    <div class="row main_container">

        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">

            AP
            <span v-if="supcus_type == 'S'">Supplier</span> 
            <span v-else-if="supcus_type == 'C'">Customer</span>
            
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
            :allow_view="true"
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
            :handleActionColumn="'Name'"
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
            supcus_type: null,
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
                console.log(this.filter_value);

                for (const index in this.filter_value) {
                    visibleColumns.push(this.filter_value[index]);
                }
                this.visibleColumns = visibleColumns;
            });

        },
        handleShowCreateVendor(){
          this.$router.push({
            name: "Vendor",
            query: { total_row: this.table_data.data.count  }
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
            var params_offset = this.ori_params.params.offset;
            var rowIndex = pass_payload.rowIndex;

            var offset = Number(rowIndex);
            var total_row = Number(this.table_data.data.count) - 1;

            if(this.supcus_type == 'S')
            {
                var view_name = 'VendorView';
            }
            else if(this.supcus_type == 'C')
            {
                var view_name = 'CustomerView';
            }
            else
            {
                var view_name = 'Vendor';
            }

            this.$router.push({
                name: view_name,
                query: { supcus_guid: pass_payload.row.supcus_guid, offset: offset, total_row: total_row}
            });
        },
        handleReceiveHandleView(pass_payload)
        {

            if(this.supcus_type == 'S')
            {
                var view_name = 'VendorView';
            }
            else if(this.supcus_type == 'C')
            {
                var view_name = 'CustomerView';
            }
            else
            {
                var view_name = 'Vendor';
            }

            this.$router.push(
                {
                name: view_name,
                query: { supcus_guid: pass_payload.row.supcus_guid}
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
          console.log(ori_payload)
            this.forceLoading = true;

            var payload = ori_payload.params
            
            payload.Type= this.supcus_type;
            // payload.returnable = '0';
            // payload.branch = this.branch_list;
            // payload.active = '0';
            // payload.block = '0';
            payload.skip = payload.offset;
            payload.limit = payload.limit;
            payload.outlet_guid = this.session_outlet_guid;//session
            payload.language = this.language;
            // payload.Code =  payload.Code;
            // payload.Name = payload.Name;
            // payload.Mobile = payload.Mobile;
            // payload.Fax = payload.Fax;
            // payload.email = payload.email;
            // payload.Add1 = payload.Add1;
            // payload.Add2 = payload.Add2;
            // payload.Add3 = payload.Add3;
            // payload.Add4 = payload.Add4;
            // payload.supcus_guid = payload.supcus_guid;
            // payload.sort_by = "IssuedStamp";
            // payload.sort_type = "Desc";
            // payload.search_type= "Name";
            // payload.user = "panda";//session

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
              "dispatch": 'setup/trigger_post_read_supcus_all', //refer to path/function_name in store actions.js
              "getter": 'setup/get_read_supcus_all', //refer to path/function_name in store getters.js
              "app": this, //compulsory passed variable
              "payload": payload //payload that needed to use in store actions.js
            };

            var dispatch_response = await this.$dispatch(object_pass);

            if(dispatch_response.status)
            {
              //success condition
                var results = dispatch_response.response.detail;

                for (const index in results) {

                    if(results[index].poprice_method == "VLISTED")
                    {
                        var poprice_method = "By Vendor Listed Cost";
                    }
                    else if(results[index].poprice_method == "VLAST")
                    {
                        var poprice_method = "By Vendor Last Cost";
                    }
                    else if(results[index].poprice_method == "ILISTED")
                    {
                        var poprice_method = "By Item Listed Cost";
                    }
                    else if(results[index].poprice_method == "ILAST")
                    {
                        var poprice_method = "By Item Last Cost";
                    }
                    else
                    {
                        var poprice_method = '';
                    }

                    results[index].poprice_method = poprice_method;

                    if(results[index].grn_baseon_pocost == "0")
                    {
                        var grn_baseon_pocost = "Pay By Invoice";
                    }
                    else if(results[index].grn_baseon_pocost == "1")
                    {
                        var grn_baseon_pocost = "Pay By GRN";
                    }

                    results[index].grn_baseon_pocost = grn_baseon_pocost;


                    if(results[index].Block == "0")
                    {
                        var Block = "Active";
                    }
                    else if(results[index].Block == "1")
                    {
                        var Block = "Inactive";
                    }
                    
                    results[index].Block = Block;
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
              var error_message = 'Failed to get supplier. Please try again.';
              this.showNotify("negative", error_message);

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
                    name: 'AccountCode',
                    required: true,
                    label: 'Link Code',
                    align: 'left',
                    sortable: true,
                    field: 'AccountCode',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
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
                },
                {
                    name: 'idvalue',
                    required: true,
                    label: 'ID No',
                    align: 'left',
                    sortable: true,
                    field: 'idvalue',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
                {
                    name: 'Block',
                    required: true,
                    label: 'Status',
                    align: 'left',
                    sortable: true,
                    field: 'Block',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
                {
                    name: 'Consign',
                    required: true,
                    label: 'Consignment',
                    align: 'left',
                    sortable: true,
                    field: 'Consign',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
                {
                    name: 'Consign_diplay',
                    required: true,
                    label: 'Type',
                    align: 'left',
                    sortable: true,
                    field: 'Consign_diplay',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
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
                },
                {
                    name: 'grn_baseon_pocost',
                    required: true,
                    label: 'Pay Method',
                    align: 'left',
                    sortable: true,
                    field: 'grn_baseon_pocost',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
                {
                    name: 'poprice_method',
                    required: true,
                    label: 'PO Method',
                    align: 'left',
                    sortable: true,
                    field: 'poprice_method',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
                {
                    name: 'pur_expiry_days',
                    required: true,
                    label: 'PO Expiry',
                    align: 'left',
                    sortable: true,
                    field: 'pur_expiry_days',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
                {
                    name: 'stock_returnable',
                    required: true,
                    label: 'Returnable',
                    align: 'left',
                    sortable: true,
                    field: 'stock_returnable',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
                {
                    name: 'b2b_registration',
                    required: true,
                    label: 'B2B',
                    align: 'left',
                    sortable: true,
                    field: 'b2b_registration',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
                {
                    name: 'deliveryterm',
                    required: true,
                    label: 'Lead Time',
                    align: 'left',
                    sortable: true,
                    field: 'deliveryterm',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
                {
                    name: 'set_rep_freq__freq_description',
                    required: true,
                    label: 'Order Frequency',
                    align: 'left',
                    sortable: true,
                    field: 'set_rep_freq__freq_description',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
                {
                    name: 'set_rep_freq__freq_stock_day',
                    required: true,
                    label: 'Stock Day',
                    align: 'left',
                    sortable: true,
                    field: 'set_rep_freq__freq_stock_day',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
                {
                    name: 'sc_buffer_stock_day',
                    required: true,
                    label: 'Buffer Stock',
                    align: 'left',
                    sortable: true,
                    field: 'sc_buffer_stock_day',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
                {
                    name: 'stockday_min',
                    required: true,
                    label: 'Min Day',
                    align: 'left',
                    sortable: true,
                    field: 'stockday_min',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
                {
                    name: 'stockday_max',
                    required: true,
                    label: 'Max Day',
                    align: 'left',
                    sortable: true,
                    field: 'stockday_max',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
                {
                    name: 'dcity',
                    required: true,
                    label: 'City',
                    align: 'left',
                    sortable: true,
                    field: 'dcity',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
                {
                    name: 'dstate',
                    required: true,
                    label: 'State',
                    align: 'left',
                    sortable: true,
                    field: 'dstate',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
                {
                    name: 'dcountry',
                    required: true,
                    label: 'Country',
                    align: 'left',
                    sortable: true,
                    field: 'dcountry',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
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
    created()
    {

        if(this.$route.name == 'VendorMaster')
        {
            this.supcus_type = 'S';
        }
        else if(this.$route.name == 'CustomerMaster')
        {
            this.supcus_type = 'C';
        }

    },
    mounted()
    {
        this.filter_options = [
            {
                label: 'Link Code',
                value: 'AccountCode',
            },
            {
                label: 'Code',
                value: 'Code',
            },
            {
                label: 'Name',
                value: 'Name',
            },
            {
                label: 'ID No',
                value: 'idvalue',
            },
            {
                label: 'Status',
                value: 'Block',
            },
            {
                label: 'Consignment',
                value: 'Consign',
            },
            {
                label: 'Type',
                value: 'Consign_diplay',
            },
            {
                label: 'Term',
                value: 'Term',
            },
            {
                label: 'Pay Method',
                value: 'grn_baseon_pocost',
            },
            {
                label: 'PO Method',
                value: 'poprice_method',
            },
            {
                label: 'PO Expiry',
                value: 'pur_expiry_days',
            },
            {
                label: 'Returnable',
                value: 'stock_returnable',
            },
            {
                label: 'B2B',
                value: 'b2b_registration',
            },
            {
                label: 'Lead Time',
                value: 'deliveryterm',
            },
            {
                label: 'Order Frequency',
                value: 'set_rep_freq__freq_description',
            },
            {
                label: 'stock_day_display',
                value: 'set_rep_freq__freq_stock_day',
            },
            {
                label: 'Buffer Stock',
                value: 'sc_buffer_stock_day',
            },
            {
                label: 'Min Day',
                value: 'stockday_min',
            },
            {
                label: 'Max Day',
                value: 'stockday_max',
            },
            {
                label: 'City',
                value: 'dcity',
            },
            {
                label: 'State',
                value: 'dstate',
            },
            {
                label: 'Country',
                value: 'dcountry',
            }
        ];

        this.filter_value = ['AccountCode','Code','Name','idvalue','Block','Consign','Consign_diplay','Term','grn_baseon_pocost','poprice_method','pur_expiry_days','stock_returnable','b2b_registration','deliveryterm','set_rep_freq__freq_description','set_rep_freq__freq_stock_day','sc_buffer_stock_day','stockday_min','stockday_max','dcity','dstate','dcountry'];

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