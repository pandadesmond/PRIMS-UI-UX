<template>
    <div class="row q-pa-md">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
            User
        </div>
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-py-md">
            <div class="row">
                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <div class="row q-gutter-md">
                        <Input
                            v-model:pass_value="search"
                            :dbComponentBehavior="dbComponentBehavior.text"
                            label="Search"
                            :filled="true"
                            @receiveChange="handleChangeSearch"
                        />
                    </div>
                </div>
                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <div class="row justify-end">
                        <Button v-on:receiveClick="handleCreate"
                        :pass_label="'Create'"
                        :pass_no_caps="true"
                        :pass_square="true"
                        :pass_dense="true"
                        class="custom_button"
                        />
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-py-md">
            <Table
                :row_per_page="[10,50,100,1000]"
                :table_data="table_data"
                :table_column="table_column"
                :flat_status="true"
                :bordered_status="true"
                v-on:receiveRequestTable="handleTableChange"

                :allow_delete="true"
                v-on:receiveHandleEdit="handleReceiveHandleEdit"
                v-on:receiveHandleDelete="handleReceiveDelete"

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

    <q-dialog v-model="delete_dialog" persistent position="top">
        <q-card style="width: 864px; max-width: 98vw;text-align:center;margin-top: 5%;border-radius: 8px">

        <q-card-section class="theme_color row items-center" style="height:56px; padding: 8px 24px;border-bottom: 1px solid #a7bbcb;">
            <div class="confirm_title">Confirmation</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup :disable="showAddLoading || showAddLoading2"/>
        </q-card-section>

        <q-card-section style="padding: 32px 24px">
            <span class="confirmation_line_font">Are you sure to delete this?</span>
        </q-card-section>

        <q-card-actions align="right" style="padding-top:0px;padding-bottom:16px;padding-right:16px">
            <q-btn flat label="Cancel" font_color="#29292A" color="#29292A" v-close-popup size="12px" class="dialog_confirm_cancel_button"/>
            <q-btn flat label="Confirm" font_color="white" color="'#D81111'" size="12px" class="dialog_confirm_delete_button" @click="handleDeleteUser" />
        </q-card-actions>

        <q-inner-loading
            :showing="deleteLoading"
            color="primary"
        />
        </q-card>
    </q-dialog>
</template>

<script>
import Button from 'src/components/PRIMS/Main/Button';
import Input from 'src/components/PRIMS/Main/Input';
import Table from 'src/components/PRIMS/Main/Table.vue';
import { Notify } from "quasar";

export default {
    components: {
        Input,
        Button,
        Table,
    },
    computed: {
        dbComponentBehavior() {
            return this.$store.getters["dbComponentBehavior/byLanguage"]("tta");
        },
    },
    data() {
        return {
            search: "",
            table_column: [],
            table_data: [],
            visibleColumns: [],
            rearrange_column: [],
            ori_params: {},
            deleteItem: {},
            delete_dialog: false,
            deleteLoading: false,
            filter_mode_on: false,
            forceLoading: false,
        }
    },
    methods: {
        handleTableChange(newVal)
        {
            var new_params = this.$pluginsTableParams(newVal)

            var payload = {
                params : new_params
            };

            this.ori_params = payload;

            this.table_function(payload);
        },
        async table_function(payload){
            this.showLoading = true;


            if(this.rearrange_column.length > 0)
            {
                var column = this.rearrange_column;
            }
            else
            {
                var column = [
                    {
                        name: 'action',
                        required: true,
                        label: 'Action',
                        align: 'center',
                        sortable: false,
                        field: 'action',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    {
                        name: 'identifier',
                        required: true,
                        label: 'User ID',
                        align: 'center',
                        sortable: true,
                        field: 'identifier',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    {
                        name: 'name',
                        required: true,
                        label: 'Name',
                        align: 'left',
                        sortable: true,
                        field: 'name',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    {
                        name: 'user_designation',
                        required: true,
                        label: 'Designation',
                        align: 'center',
                        sortable: true,
                        field: 'user_designation',
                        format: (val) => `${val ? val.name : ''}`,
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    {
                        name: 'user_group',
                        required: true,
                        label: 'User Group',
                        align: 'center',
                        sortable: true,
                        field: 'user_group',
                        format: (val) => `${val ? val.name : ''}`,
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    {
                        name: 'department',
                        required: true,
                        label: 'Department',
                        align: 'center',
                        sortable: true,
                        field: 'department',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    {
                        name: 'isactive',
                        required: true,
                        label: 'Status',
                        align: 'center',
                        sortable: true,
                        field: 'isactive',
                        format: (val) => `${val == 1 ? 'Active' : 'Inactive'}`,
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    {
                        name: 'created_by',
                        required: true,
                        label: 'Created By',
                        align: 'center',
                        sortable: true,
                        field: 'created_by',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    {
                        name: 'created_at',
                        required: true,
                        label: 'Created At',
                        align: 'center',
                        sortable: true,
                        field: 'created_at',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    {
                        name: 'updated_by',
                        required: true,
                        label: 'Updated By',
                        align: 'center',
                        sortable: true,
                        field: 'updated_by',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    {
                        name: 'updated_at',
                        required: true,
                        label: 'Updated At',
                        align: 'center',
                        sortable: true,
                        field: 'updated_at',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                ];
            }

            this.table_column = column;

            payload.params.search = this.search;
            
            if(payload.params.ordering == "")
            {
                payload.params.ordering = "user_id";
            }

            var pass_obj = {
                "dispatch": 'user/trigger_get_user_info_list',
                "getter": 'user/get_user_info',
                "app": this,
                "payload": payload,
            };

            var user_list = await this.$dispatch(pass_obj);


            if(user_list.status)
            {
                console.log(user_list)
                var rows = user_list.response;
            }
            else
            {
                var rows = {
                    data: {
                        results: [],
                    }
                };
            }

            this.table_data = rows;
            
            this.showLoading = false;
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
        async handleClearFilter()
        {
            await this.clearFilterInput();
            this.rearrange_column = this.table_column;

            this.table_function(this.ori_params);
        },
        handleReceiveHandleEdit(row)
        {
            this.$router.push({name: 'editUser', query: { guid: row.row.user_info_guid}});
        },
        handleCreate(){
            this.$router.push({name: 'createUser'});
        },
        handleChangeSearch()
        {
            this.forceLoading = true;
            this.table_function(this.ori_params);
        },
        handleReceiveDelete(item)
        {
            this.deleteItem = item.row;
            this.delete_dialog = true;
        },
        async handleDeleteUser()
        {
            this.deleteLoading = true;
            console.log(this.deleteItem)
            
            var payload = {
                params: {
                    'user_info_guid': this.deleteItem.user_info_guid,
                }
            }

            var pass_obj = {
                "dispatch": 'user/trigger_get_user_department_list',
                "getter": 'user/get_user_department',
                "app": this,
                "payload": payload,
            }

            var user_department = await this.$dispatch(pass_obj);

            if(!user_department.status)
            {
                this.showNotify('negative','Delete fail. Try again.');
                console.log("Delete fail",user_department.response);
                this.deleteLoading = false;
                return;
            }

            const data = user_department.response.data;
            if(data.count > 0)
            {
                try
                {
                    const user_dept = data.results.map((entry)=>{return entry.user_department_guid});
                    for(var guid of user_dept)
                    {
                        var payload = {
                            'user_department_guid': guid,
                        }
                        var pass_obj = {
                            "dispatch": 'user/trigger_delete_user_department',
                            "getter": 'user/get_user_department',
                            "app": this,
                            "payload": payload,
                        };

                        var response = await this.$dispatch(pass_obj);

                        if(!response.status)
                        {
                            throw response.response;
                        }
                    }
                }
                catch(error)
                {
                    console.log("delete user_dept",error);
                    this.deleteLoading = false;
                    return;
                }
            }

            var payload = {
                "user_info_guid": this.deleteItem.user_info_guid,
            }

            var pass_obj = {
                "dispatch": 'user/trigger_delete_user_info',
                "getter": 'user/get_user_info',
                "app": this,
                "payload": payload,
            };

            var delete_response = await this.$dispatch(pass_obj);

            if(delete_response.status)
            {
                this.showNotify('positive','Delete Successfully.');
                this.delete_dialog = false;
                this.table_function(this.ori_params);
            }
            else
            {
                console.log("Delete fail",delete_response.response);
                const valid = this.isValidJSON(data_response.response);
                var message = 'Delete fail. Try again.';
                console.log(valid)
                if(valid)
                {
                    const response = JSON.parse(data_response.response);
                    if(response.error)
                    {
                        message = response.error;
                    }
                }
                else
                {
                    message = JSON.stringify(data_response.response);
                }
                this.showNotify('negative', message);
            }

            this.deleteLoading = false;
        },
        isValidJSON(str) {
            try {
                const parsed = JSON.parse(str);
                // Ensure the result is an object or array (valid JSON)
                return typeof parsed === 'object' && parsed !== null;
            } catch (e) {
                return false;
            }
        },
        showNotify(type, message) 
        {
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
    }
}
</script>

<style scoped>
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

.confirm_title {
    color: #FFF;
    text-align: center;
    font-family: InterfontSemiBold;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
}

.confirmation_line_font {
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    font-family: InterfontMedium;
}
</style>