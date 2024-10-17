<template>

    <div class="row main_container">

        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">

            AP Supplier
            
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
          this.$router.push({ name: "Vendor" });
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
            this.$router.push({
                // name: 'CreateEditIM_new',
                name: "Vendor",
                query: { supcus_guid: pass_payload.row.supcus_guid} // sini
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
            
            payload.type= "S";
            payload.returnable = '0';
            // payload.branch = this.branch_list;
            // payload.active = '0';
            // payload.block = '0';
            payload.skip = payload.offset;
            payload.limit = payload.limit;
            payload.outlet_guid = this.session_outlet_guid;//session
            payload.language = this.language;
            // payload.Code =  payload.Code;
            payload.Name = payload.Name;
            // payload.Mobile = payload.Mobile;
            // payload.Fax = payload.Fax;
            // payload.email = payload.email;
            // payload.Add1 = payload.Add1;
            // payload.Add2 = payload.Add2;
            // payload.Add3 = payload.Add3;
            // payload.Add4 = payload.Add4;
            payload.supcus_guid = payload.supcus_guid;
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
                    headerStyle: 'text-align: center; width: 2%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
                {
                    name: 'Mobile',
                    required: true,
                    label: 'Mobile',
                    align: 'left',
                    sortable: true,
                    field: 'Mobile',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
                {
                    name: 'Fax',
                    required: true,
                    label: 'Fax',
                    align: 'left',
                    sortable: true,
                    field: 'Fax',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
                {
                    name: 'email',
                    required: true,
                    label: 'Email',
                    align: 'left',
                    sortable: true,
                    field: 'email',
                    format_child: '',
                    tooltip: '',
                    headerStyle:'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
                {
                    name: 'Add1',
                    required: true,
                    label: 'Address 1',
                    align: 'left',
                    sortable: true,
                    field: 'Add1',
                    format_child: '',
                    tooltip: '',
                    headerStyle:'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
                {
                    name: 'Add2',
                    required: true,
                    label: 'Address 2',
                    align: 'left',
                    sortable: true,
                    field: 'Add2',
                    format_child: '',
                    tooltip: '',
                    headerStyle:'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
                {
                    name: 'Add3',
                    required: true,
                    label: 'Address 3',
                    align: 'left',
                    sortable: true,
                    field: 'Add3',
                    format_child: '',
                    tooltip: '',
                    headerStyle:'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
                {
                    name: 'Add4',
                    required: true,
                    label: 'Address 4',
                    align: 'left',
                    sortable: true,
                    field: 'Add4',
                    format_child: '',
                    tooltip: '',
                    headerStyle:'text-align: center; width: 1%;',
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
              label: 'action',
              value: 'action',
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
              label: 'Mobile',
              value: 'Mobile',
          },
          {
              label: 'Fax',
              value: 'Fax',
          },
          {
              label: 'email',
              value: 'email',
          },
          {
              label: 'Add1',
              value: 'Add1',
          },
          {
              label: 'Add2',
              value: 'Add2',
          },
          {
              label: 'Add3',
              value: 'Add3',
          },
          {
              label: 'Add4',
              value: 'Add4',
          },
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