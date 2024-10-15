<template>
    <q-form ref="submit_form">
    <div class="row row_section" style="padding: 0px; margin-bottom: 10px; margin-left: 12px;">
        <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <Chip text="Setup" icon="tune" /> / <Chip text="Company Profile" icon="business" />
        </div>
    </div>

    <!-- <q-card style="background-color: white; padding: 10px; margin-left: 10px; margin-right: 10px; margin-bottom: 10px;">
        <q-card-section> -->
        <!-- HQ Table -->
        <!--
        <div class="row row_section">
            <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div class="component_div">
                <Table 
                :row_per_page="[20,40,60,80,100,0]"
                :top_button="true"
                :button_no_outline="true"
                v-on:head_button="addButton"
                v-on:main_action="handleAction"
                v-on:main_edit="handleEdit"
                v-on:main_list="handleList"
                v-on:main_delete="handleDelete"
                :title="table_title"
                :table_data="table_data_companyprofile"
                :table_column="table_column"
                :action_button="true"
                :edit_button="true"
                :view_button="true"
                :delete_button="true"
                />
            </div>
            </div>
        </div>
        -->

        <div class="row row_section">
            <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div class="component_div">
                <TablePagination
                :row_per_page="[20,40,60,80,100,0]"
                :top_button="true"
                v-on:receiveRequestTable="handleTableChange"
                v-on:head_button="addButton"
                v-on:main_action="handleAction"
                v-on:main_edit="handleEdit"
                v-on:main_list="handleList"
                v-on:main_delete="handleDelete"
                :table_data="test_data"
                :table_column="test_column"
                :action_button="true"
                :edit_button="false"
                :view_button="false"
                :delete_button="true"
                :button_no_outline="true"
                />
            </div>
            </div>
        </div>

        <!-- addButton dialog -->
        <q-dialog v-model="showAddTask" >
        <q-card style="width: 700px; max-width: 80vw;">
            <q-card-section class="row bg-primary text-white">
            <Label
                :text="is_update ? 'Edit HQ' : 'Add HQ'"
                class="text-subtitle1"
                style="background-color: transparent;"
            />
            <q-space />
            <q-btn v-close-popup flat round dense icon="close" />
            </q-card-section>

            <q-card-section>
                <div class="row row_section">
                    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div class="component_div">
                        <LabelInputHorizontal
                        :readonly="false"
                        :no_label="true"
                        :text="'Code'"
                        v-model:pass_value="json_new.code"
                        :dbComponentBehavior="dbComponentBehavior.text_required"
                        />
                    </div>
                    </div>
                </div>

                <!-- Company name -->
                <div class="row row_section">
                    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div class="component_div">
                        <LabelInputHorizontal
                        :readonly="false"
                        :no_label="true"
                        :text="'Description'"
                        v-model:pass_value="json_new.description"
                        :dbComponentBehavior="dbComponentBehavior.text_required"
                        />
                    </div>
                    </div>
                </div>

                <!-- Address 1 -->
                <div class="row row_section">
                    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div class="component_div">
                        <LabelInputHorizontal
                        :readonly="false"
                        :no_label="true"
                        :text="'Address'"
                        v-model:pass_value="json_new.address1"
                        :dbComponentBehavior="dbComponentBehavior.text_required"
                        />
                    </div>
                    </div>
                </div>

                <!-- Address 2 -->
                <div class="row row_section">
                    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div class="component_div">
                        <Input
                        :readonly="false"
                        :no_label="true"
                        :text="'Address2'"
                        v-model="json_new.address2"
                        :dbComponentBehavior="dbComponentBehavior.text_required"
                        />
                    </div>
                    </div>
                </div>

                <!-- Address 3 -->
                <div class="row row_section">
                    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div class="component_div">
                        <Input
                        :readonly="false"
                        :no_label="true"
                        :text="'Address3'"
                        v-model="json_new.address3"
                        :dbComponentBehavior="dbComponentBehavior.text_required"
                        />
                    </div>
                    </div>
                </div>

                <!-- Address 4 -->
                <div class="row row_section">
                    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div class="component_div">
                        <Input
                        :readonly="false"
                        :no_label="true"
                        :text="'Address4'"
                        v-model="json_new.address4"
                        :dbComponentBehavior="dbComponentBehavior.text_required"
                        />
                    </div>
                    </div>
                </div>

                <!-- Tel -->
                <div class="row row_section">
                    <div class="card_section col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <div class="component_div">
                        <LabelInputHorizontal
                        style="margin-left: 0px;"
                        :readonly="false"
                        :no_label="true"
                        :text="'Tel'"
                        v-model:pass_value="json_new.tel_no"
                        :dbComponentBehavior="dbComponentBehavior.text_required"
                        />
                    </div>
                    </div>

                    <!-- Fax -->
                    <div class="card_section col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <div class="component_div">
                        <LabelInputHorizontal
                        style="margin-left: 0px;"
                        :readonly="false"
                        :no_label="true"
                        :text="'Email'"
                        v-model:pass_value="json_new.email"
                        :dbComponentBehavior="dbComponentBehavior.email"
                        />
                    </div>
                    </div>
                </div>

                <!-- Reg.no -->
                <div class="row row_section">
                    <div class="card_section col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <div class="component_div">
                        <LabelInputHorizontal
                        style="margin-left: 0px;"
                        :readonly="false"
                        :no_label="true"
                        :text="'Reg No.'"
                        v-model:pass_value="json_new.register_no"
                        :dbComponentBehavior="dbComponentBehavior.RegNo"
                        />
                    </div>
                    </div>
                </div>
            </q-card-section>

            <q-card-actions align="right" class="q-pr-lg">
                <!-- <Button
                class="button_save"
                v-close-popup
                :text="'CANCEL'"
                :type="'button'"
                /> -->
                <Button_icon :flat="true" :font_color="'black'" :color="'white'" :text="'CANCEL'" :outline="true" size="15px" class="custom_cancel_button" v-close-popup />

                <!-- <Button
                class="button_save"
                v-on:receiveChange="callUpdate()"
                :text="'SAVE'"
                :type="'button'"
                /> -->
                <Button_icon :flat="true" :font_color="'white'" :color="'#094161 '" :text="'SAVE'" :outline="false" size="15px" @click="callUpdate()"/>
            </q-card-actions>
        </q-card>
        </q-dialog>

        <q-dialog v-model="delete_confirmation" persistent position="top">
        <q-card style="width: 700px; max-width: 80vw;text-align:center;margin-top: 5%;">

            <q-card-section class="row items-center" style="padding-top:1%;padding-bottom:1%;border-bottom: 1px solid #a7bbcb;">
            <div class="text-h6">Confirmation</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup :disable="showAddLoading || showAddLoading2"/>
            </q-card-section>

            <q-card-section>
            <!-- <span class="q-ml-sm custom_selection_font">{{general_body}}</span> -->
            <span>Are you sure to delete this line?</span>
            </q-card-section>

            <q-card-actions align="right">
            <q-btn flat label="Cancel" color="primary" v-close-popup />
            <q-btn flat label="OK" color="primary" @click="handleDeleteLine" />
            </q-card-actions>

            <q-inner-loading
            :showing="deleteLoading"
            color="primary"
            />
        </q-card>
        </q-dialog>

        <!-- save button (bottom-right) -->
        <!-- <div class="row row_section justify-end">
            <div class="card_section col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
            <div class="component_div text-right">
                <Button
                class="button_save"
                v-on:receiveChange="callUpdate()"
                :text="'APPLY'"
                :type="'button'"
                />
            </div>
            </div>
        </div> -->
        <!-- </q-card-section>
    </q-card> -->
    </q-form>
</template>

<script>
import Input from 'src/components/ERP/Base/Input';
import Label from 'src/components/ERP/Base/Label';
import LabelSelectVertical from'src/components/ERP/General/LabelSelectVertical' ;
import LabelInputHorizontal from'src/components/ERP/General/LabelInputHorizontal' ;
import Button_icon from 'src/components/ERP/Base/Button_icon'
import LabelSelectHorizontal from'src/components/ERP/General/LabelSelectHorizontal' ;
import Table from 'src/components/ERP/Base/Table';
import TablePagination from 'src/components/ERP/Base/TablePagination';
import Select from 'src/components/ERP/Base/Select';
import Checkbox from 'src/components/ERP/Base/Checkbox';
import Button from 'src/components/Base/Button';
import Chip from 'src/components/ERP/Base/Chip';
import { Notify } from "quasar"
import { Loading, QSpinnerTail } from 'quasar'

export default{
    data(){
        return{
            multiselectvalue: [],
            json_new: {},
            payload_new: {},
            test_data: [],
            test_pagination: [],
            table_data_companyprofile: [],
            table_title:"HQ Location",
            table_data: [
                {
                    "action":"",
                    "Outlet":""
                }
            ],
            table_column: [
                {
                    name: 'action',
                    required: true,
                    label: 'Actions',
                    align: 'left',
                    sortable: false
                },
                {
                    "align": "center",
                    "field": "Outlet",
                    "sortable": true,
                    "name": "Outlet",
                    "label": "Location",
                    "format_child": "$",
                }
            ],
            test_column: [
                {
                    name: 'action',
                    required: true,
                    label: 'Action',
                    align: 'left',
                    sortable: false,
                    field: 'action',
                    format_child: '',
                    tooltip: '',
                    "headerStyle": "max-width: 70px; text-align: center;",
                },
                {
                    align: "left",
                    sortable: true,
                    name: "code",
                    label: "Code",
                    format_child: "",
                    field: 'code',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;'
                },
                {
                    align: "left",
                    sortable: true,
                    name: "description",
                    label: "Description",
                    format_child: "",
                    field: 'description',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;'
                },
                {
                    align: "left",
                    sortable: true,
                    name: "register_no",
                    label: "Reg No",
                    format_child: "",
                    field: 'register_no',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;'
                },
                {
                    align: "left",
                    sortable: true,
                    name: "address1",
                    label: "Address1",
                    format_child: "",
                    field: 'address1',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;'
                },
                {
                    align: "left",
                    sortable: true,
                    name: "address2",
                    label: "Address2",
                    format_child: "",
                    field: 'address2',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;'
                },
                {
                    align: "left",
                    sortable: true,
                    name: "address3",
                    label: "Address3",
                    format_child: "",
                    field: 'address3',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;'
                },
                {
                    align: "left",
                    sortable: true,
                    name: "address4",
                    label: "Address4",
                    format_child: "",
                    field: 'address4',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;'
                },
                {
                    name: 'created_at',
                    required: true,
                    label: 'Created At',
                    align: 'left',
                    sortable: true,
                    field: 'created_at',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
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
                    headerStyle: 'text-align: center;',
                },
                {
                    name: 'updated_at',
                    required: true,
                    label: 'Updated At',
                    align: 'left',
                    sortable: true,
                    field: 'updated_at',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                },
                {
                    name: 'updated_by',
                    required: true,
                    label: 'Updated By',
                    align: 'left',
                    sortable: true,
                    field: 'updated_by',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                },
            ],
            showAddTask: false,
            ori_params: {},
            is_update: false,
            active_delete_json: {},
            delete_confirmation: false,
        }
    },
    components:{
        Input,
        Label,
        // LabelSelectVertical,
        LabelInputHorizontal,
        // LabelSelectHorizontal,
        // LabelDatepickerHorizontal,
        // LabelCheckboxHorizontal,
        // Table,
        // Select,
        // Checkbox,
        // Button,
        Button_icon,
        TablePagination,
        Chip,
    },
    computed: {
        dbComponentBehavior() {
        return this.$store.getters['dbComponentBehavior/byLanguage']('erp')
        },
    },
    methods: {
        addButton: function(payload)
        {
            this.json_new = {};
            this.showAddTask = true;
            this.is_update = false;
        },
        handleAction: function(payload){
            this.json_new = payload;
            this.showAddTask = true;
            this.is_update = true;
        },
        handleDelete(payload){
            this.active_delete_json.guid = payload.company_guid;
            this.delete_confirmation = true;
        },
        async handleDeleteLine(){
            this.deleteLoading = true;

            var data = {};

            var payload = {
                company_guid: this.active_delete_json.guid
            }

            await this.$store.dispatch('setup/trigger_delete_ml_company', payload).then(async () => {
                data = JSON.parse(JSON.stringify(this.$store.getters['setup/get_ml_company_status']));
            });

            if(data.status == "success")
            {
                this.table_function(this.ori_params);
                this.showNotify("positive","Delete successfully");
                this.delete_confirmation = false;
                this.deleteLoading = false;
            }
            else
            {
                this.showNotify("negative","Please try again.");
                this.deleteLoading = false;
            }
        },
        showNotify(type, message) {
            Notify.create({
                type: type,
                message: message,
                timeout: 1000,
                position: 'top',
                html: true,
            })
        },
        showLoading()
        {
            // default options
            Loading.show()

            // fully customizable
            Loading.show({
                spinner: QSpinnerTail,
            // other props
            })
        },
        hideLoading()
        {
            setTimeout(function(){
                Loading.hide();
            },300);
        },
        callUpdate: function()
        {
            //do form verification before submit the form
            this.$refs['submit_form'].validate().then(valid => {

                if (!valid) {
                    //got field thats not fullfill standard
                    this.showNotify('negative', 'Please make sure all field is filled in.')
                }
                else
                {
                    //show loading icon
                    this.showLoading();
                    //already verified all the field than call save value
                    this.handleSave();
                }
            })
        },
        async handleSave()
        {
            var retailer_guid = '1234';
            var code = this.json_new.code;
            var description = this.json_new.description;
            var register_no = this.json_new.register_no;
            var address1 = this.json_new.address1;
            var address2 = this.json_new.address2;
            var address3 = this.json_new.address3;
            var address4 = this.json_new.address4;
            var email = this.json_new.email;
            var tel_no = this.json_new.tel_no;
            var updated_by = 'test';

            var template = {
                retailer_guid: retailer_guid,
                code: code,
                description: description,
                register_no: register_no,
                address1: address1,
                address2: address2,
                address3: address3,
                address4: address4,
                email: email,
                tel_no: tel_no,
                updated_by: updated_by,
            };

            var payload = {};
            var data = {};

            if(!this.is_update)
            {
                payload = template;
                await this.$store.dispatch('setup/trigger_create_ml_company', payload).then(() => {
                    data = JSON.parse(JSON.stringify(this.$store.getters['setup/get_ml_company_status']));
                });
            }
            else if(this.is_update)
            {
                var pass_json = template;

                payload = {
                    company_guid: this.json_new.company_guid,
                    pass_json: pass_json
                }

                await this.$store.dispatch('setup/trigger_update_ml_company', payload).then(() => {
                    data = JSON.parse(JSON.stringify(this.$store.getters['setup/get_ml_company_status']));
                });
            }

            var status = data.status;

            if(status == 'success')
            {
                if(!this.is_update)
                {
                    this.showNotify('positive', 'Create Successfully.');
                }
                else if(this.is_update)
                {
                    this.showNotify('positive', 'Update Successfully.');
                }      
                this.showAddTask = false;
                this.table_function(this.ori_params);
                this.hideLoading();
            }
            else
            {
            var error_response = data.response;
            var show_error = "";

            if(typeof error_response == 'object')
            {
                Object.keys(error_response).forEach((loop_index)=>{
                if(loop_index !== 'status_code')
                {
                    var temp_error = {};
                    var error_message = "";
                    Object.keys(error_response[loop_index]).forEach((header,cindex)=>{
                        error_message = error_response[loop_index][header];
                    });
                    temp_error = loop_index + " - " + error_message;
                    show_error += temp_error;
                }
                });//close foreach error message
            }
            else if(typeof error_response == 'string')
            {
                show_error = error_response
            }

            this.showNotify('negative', show_error);
            this.hideLoading();
            }
        },
        // table server side
        handleTableChange: function(newVal)
        {
            var new_params = this.$pluginsTableParams(newVal)

            var payload = {
                params : new_params
            };

            this.ori_params = payload;

            this.table_function(payload);
        },
        async table_function(payload){
            if(payload.params.ordering == "")
            {
                payload.params.ordering = "-updated_at"
            }

            await this.$store.dispatch('setup/trigger_get_ml_company', payload).then(() => {
                var data = JSON.parse(JSON.stringify(this.$store.getters['setup/get_ml_company']));

                this.test_data = data;
            });
        },
    },
    created: function () {}
}


</script>

<style scoped>
.custom_cancel_button
{
    border: 1px solid black;
}
.card_section {
    padding: 0px 0px 0px 0px;
}

.row_section
{
    padding-left: 10px;
    right: 10px;
}

.row_section_dialog
{
    padding: 10px;
    right: 10px;
}
.table_wrapper
{
    padding-left: 0px;  
    padding-right: 5px;
}
</style>
