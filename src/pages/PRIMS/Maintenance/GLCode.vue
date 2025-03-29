<template>
    <div class="row q-pa-md">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
            GL Code
        </div>
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-py-md">
            <div class="row">
                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <div class="row q-gutter-md">
                        <Input
                            v-model="search"
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
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
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
                <q-btn icon="close" flat round dense v-close-popup/>
            </q-card-section>

            <q-card-section style="padding: 32px 24px">
                <span class="confirmation_line_font">Are you sure to delete this?</span>
            </q-card-section>

            <q-card-actions align="right" style="padding-top:0px;padding-bottom:16px;padding-right:16px">
                <q-btn flat label="Cancel" font_color="#29292A" color="#29292A" v-close-popup size="12px" class="dialog_confirm_cancel_button"/>
                <q-btn flat label="Confirm" font_color="white" color="'#D81111'" size="12px" class="dialog_confirm_delete_button" @click="handleDeleteGLCode" />
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
        Button,
        Input,
        Table,
    },
    data(){
        return {
            search: "",
            table_column: [],
            table_data: [],
            visibleColumns: [],
            rearrange_column: [],
            deleteItem: {},
            delete_dialog: false,
            filter_mode_on: false,
            forceLoading: false,
        }
    },
    computed: {
        dbComponentBehavior() {
            return this.$store.getters["dbComponentBehavior/byLanguage"]("tta");
        },
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
            this.forceLoading = true;


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
                        name: 'code',
                        required: true,
                        label: 'Code',
                        align: 'center',
                        sortable: true,
                        field: 'code',
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
                        name: 'isactive',
                        required: true,
                        label: 'Status',
                        align: 'center',
                        sortable: true,
                        field: 'isactive',
                        format: val => `${ val == 1 ? 'Active' : 'Inactive'}`,
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
                payload.params.ordering = "-updated_at";
            }
            
            var pass_obj = {
                "dispatch": 'general/trigger_get_glcode_list',
                "getter": 'general/get_glcode',
                "app": this,
                "payload": payload,
            };

            var list = await this.$dispatch(pass_obj);


            if(list.status)
            {
                // console.log(list)
                var rows = list.response;
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
            
            this.forceLoading = false;
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
            this.$router.push({name: 'editGLCode', query: { guid: row.row.glcode_guid}});
        },
        handleCreate(){
            this.$router.push({name: 'createGLCode'});
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
        async handleDeleteGLCode()
        {
            this.deleteLoading = true;

            var payload = {
                "glcode_guid": this.deleteItem.glcode_guid,
            }

            var pass_obj = {
                "dispatch": 'general/trigger_delete_glcode',
                "getter": 'general/get_glcode',
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
                const valid = this.isValidJSON(delete_response.response);
                var message = 'Delete fail. Try again.';
                if(valid)
                {
                    const response = JSON.parse(delete_response.response);
                    if(response.error)
                    {
                        message = response.error;
                    }
                }
                else
                {
                    message = JSON.stringify(delete_response.response);
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
  padding: 0px 10px;
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