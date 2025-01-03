<template>
    <div class="row q-pa-md">
        <div class="text-subtitle1 header_text col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
            Invoice
        </div>

        <q-form ref="save_form" class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 bg-white q-my-sm q-pa-md">
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12"  style="font-size: 10px;">

                <div class="row">
                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-px-sm q-py-xs" style="padding-right: 10px;">
                        <Label :pass_value="'Vendor'" class="text-h6"/>
                    </div>
                    
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 q-px-sm q-py-xs">
                        <LabelSelect label="Vendor Name" v-model:pass_value="json.supplier_guid" :options="supplier_list" :readonly="readonlyStatus || parentReadonlyStatus" 
                        :dbComponentBehavior="dbComponentBehavior.text_required" @receiveChange="handleChangeVendor"/>
                    </div>

                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 q-px-sm q-py-xs">
                        <LabelInput label="Vendor Code" v-model:pass_value="json.vendor_code" :readonly="true" :dbComponentBehavior="dbComponentBehavior.text"/>
                    </div>
                    
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 q-px-sm q-py-xs">
                        <LabelInput label="Address 1" v-model:pass_value="json.address_1" :readonly="readonlyStatus" :dbComponentBehavior="dbComponentBehavior.text"/>
                    </div>
                    
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 q-px-sm q-py-xs">
                        <LabelInput label="Address 2" v-model:pass_value="json.address_2" :readonly="readonlyStatus" :dbComponentBehavior="dbComponentBehavior.text"/>
                    </div>

                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 q-px-sm q-py-xs">
                        <LabelInput label="Address 3" v-model:pass_value="json.address_3" :readonly="readonlyStatus" :dbComponentBehavior="dbComponentBehavior.text"/>
                    </div>
                </div>

                <q-separator class="q-my-md" inset/>

                <div class="row">
                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-px-sm q-py-xs" style="padding-right: 10px;">
                        <Label :pass_value="'TTA'" class="text-h6"/>
                    </div>
                    
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 q-px-sm q-py-xs">
                        <LabelSelect label="Ref No" v-model:pass_value="json.tta_guid" :options="tta_option_list"
                        :readonly="readonlyStatus || parentReadonlyStatus" :dbComponentBehavior="dbComponentBehavior.text_required" @receiveChange="handleChangeTTA"/>
                    </div>
                    
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 q-px-sm q-py-xs">
                        <LabelInput label="PIC" v-model:pass_value="json.tta_pic" :readonly="true" :dbComponentBehavior="dbComponentBehavior.text"/>
                    </div>
                </div>
                
                <q-separator class="q-my-md" inset/>

                <div class="row">
                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-px-sm q-py-xs" style="padding-right: 10px;">
                        <Label :pass_value="'Invoice'" class="text-h6"/>
                    </div>

                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 q-px-sm q-py-xs">
                        <LabelInput label="Invoice Ref no" v-model:pass_value="json.refno" :readonly="true" :dbComponentBehavior="dbComponentBehavior.text"/>
                    </div>

                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 q-px-sm q-py-xs">
                        <LabelDatepicker label="Invoice Date" :daterange="json.date" :readonly="readonlyStatus" 
                        :dbComponentBehavior="dbComponentBehavior.text_required" @receiveChange="handleChangeInvoiceDate"/>
                    </div>

                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 q-px-sm q-py-xs">
                        <LabelDatepicker label="Effective Date From" :daterange="json.effective_date_from" :readonly=" readonlyStatus" :optionsFn="startDateOptions"
                        :dbComponentBehavior="dbComponentBehavior.text_required" @receiveChange="handleChangeDateFrom"/>
                    </div>

                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 q-px-sm q-py-xs">
                        <LabelDatepicker label="Effective Date To" :daterange="json.effective_date_to" :readonly="readonlyStatus" :optionsFn="endDateOptions"
                        :dbComponentBehavior="dbComponentBehavior.text_required" @receiveChange="handleChangeDateTo"/>
                    </div>

                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 q-px-sm q-py-xs">
                        <LabelInput label="Total Amount" v-model:pass_value="json.total_amount" :readonly="true" :dbComponentBehavior="dbComponentBehavior.text"/>
                    </div>

                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 q-px-sm q-py-xs">
                        <LabelSelect label="Type" v-model:pass_value="json.type" :options="typeOptions"
                        :readonly="readonlyStatus" :dbComponentBehavior="dbComponentBehavior.text_required"/>
                    </div>

                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 q-px-sm q-py-xs">
                        <LabelInput label="Total Incl Tax" v-model:pass_value="json.total_incl_tax" :readonly="true" :dbComponentBehavior="dbComponentBehavior.text"/>
                    </div>

                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 q-px-sm q-py-xs">
                        <LabelSelect label="Company" v-model:pass_value="json.company_info_guid" :options="company_options"
                        :readonly="page_function=='edit'" :dbComponentBehavior="dbComponentBehavior.text_required"/>
                    </div>

                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 q-px-sm q-py-xs">
                        <LabelTextarea label="Remark" v-model:pass_value="json.remarks" :readonly="readonlyStatus" :dbComponentBehavior="dbComponentBehavior.textarea"/>
                    </div>
                </div>

                <div class="row">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 q-px-sm q-py-xs">
                        <LabelInput label="Document UUID" v-model:pass_value="json.documentuuid" :readonly="true" :dbComponentBehavior="dbComponentBehavior.text"/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 q-px-sm q-py-xs">
                        <LabelInput label="PIP Status" v-model:pass_value="json.pip_status" :readonly="true" :dbComponentBehavior="dbComponentBehavior.text"/>
                    </div>       
                                  
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 q-px-sm q-py-xs">
                        <LabelInput label="PIP at" v-model:pass_value="json.pip_at" :readonly="true" :dbComponentBehavior="dbComponentBehavior.text"/>
                    </div>
                    
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 q-px-sm q-py-xs">
                        <LabelInput label="PIP Response" v-model:pass_value="json.pip_response" :readonly="true" :dbComponentBehavior="dbComponentBehavior.text"/>
                    </div>
                    
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 q-px-sm">
                        <LabelCheckbox label="PIP" v-model:pass_value="json.pip" :readonly="true" />
                    </div>
                </div>
                <div class="row">                    
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 q-px-sm q-py-xs">
                        <LabelInput label="LHDN Validated At" v-model:pass_value="json.lhdn_validated_at" :readonly="true" :dbComponentBehavior="dbComponentBehavior.text"/>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 q-px-sm q-py-xs">
                        <LabelCheckbox label="LHDN Validate" v-model:pass_value="json.lhdn_validated" :readonly="true" />
                    </div>
                </div>
            </div>

            <div v-if="page_function == 'edit'" class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-py-md">
                <q-separator spaced/>
                <div v-if="!readonlyStatus" class="row justify-end q-pa-md">
                    <Button class="custom_add_button" pass_icon="add" :pass_square="true" :pass_dense="true" :tooltip="true" pass_tooltip="Add Child" @receiveClick="handleAdd"/>
                </div>
                <div class="row">
                    <Table
                        :row_per_page="[10,50,100,1000]"
                        :table_data="table_data"
                        :table_column="table_column"
                        :flat_status="true"
                        :bordered_status="true"

                        :allow_delete="readonlyStatus ? false : true"
                        :allow_edit="readonlyStatus ? false : true"
                        v-on:receiveRequestTable="handleTableChange"
                        v-on:receiveHandleEditDetails="handleEdit"
                        v-on:receiveHandleDelete="handleDelete"

                        :filter_mode_on="filter_mode_on"
                        v-on:receiveColumnRearrange="handleColumnRearrange"
                        v-on:filter_column="handleFilterColumn"
                        :forceLoading="forceLoading"
                        :column_reordering="true"
                        :row_reordering="false"
                        v-on:receiveHandleClearFilter="handleClearFilter"

                        :pass_visible_columns="[]"
                    />
                </div>
            </div>

            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-py-md q-px-lg">
                <div class="row justify-end q-gutter-sm">
                    <Button pass_label="Back"
                        v-on:receiveClick="goBack"
                        :pass_no_caps="false"
                        :pass_square="true"
                        :pass_dense="true"
                        class="custom_cancel_button"
                    />

                    <Button v-if="!readonlyStatus" pass_label="Save"
                        v-on:receiveClick="saveInvoice"
                        :pass_no_caps="false"
                        :pass_square="true"
                        :pass_dense="true"
                        class="custom_button"
                    />
                    
                    <Button v-if="page_function == 'edit'" pass_label="PRINT"
                        v-on:receiveClick="printInvoice"
                        :pass_no_caps="false"
                        :pass_square="true"
                        :pass_dense="true"
                        class="custom_button"
                    />
                    
                    <Button v-if="page_function == 'edit' && json.posted == 0 && json.canceled == 0" pass_label="POST"
                        v-on:receiveClick="dialog.post = true"
                        :pass_no_caps="false"
                        :pass_square="true"
                        :pass_dense="true"
                        class="custom_button"
                    />

                    <Button v-if="page_function == 'edit' && json.posted == 0 && json.canceled == 0" pass_label="CANCEL"
                        v-on:receiveClick="dialog.cancel = true"
                        :pass_no_caps="false"
                        :pass_square="true"
                        :pass_dense="true"
                        class="custom_button"
                    />
                </div>
            </div>
        </q-form>
    </div>

    <q-inner-loading
        :showing="loading"
        class="showLoading"
        color="primary"
    />

    <q-dialog v-model="dialog.child" persistent position="top">
        <q-card style="width: 864px; max-width: 98vw;text-align:center;margin-top: 5%;border-radius: 8px">

        <q-card-section class="theme_color row items-center" style="height:56px; padding: 8px 24px;border-bottom: 1px solid #a7bbcb;">
            <div class="confirm_title">Invoice: {{json.refno}}</div>
            <q-space />
            <q-btn icon="close" flat round dense @click="closeDialogChild"/>
        </q-card-section>

        <q-card-section class="text-left" style="padding: 32px 24px">
            <q-form ref="save_dialog">
                <div class="row q-gutter-sm q-px-md">
                    <div class="col-xl-10 col-lg-10 col-md-10 col-sm-10 col-xs-10">
                        <LabelSelect label="Outlet" v-model:pass_value="dialog.retailer_outlet_guid" :options="outlet_options"
                        :dbComponentBehavior="dbComponentBehavior.text_required"/>
                    </div>
                    <div class="col-xl-10 col-lg-10 col-md-10 col-sm-10 col-xs-10">
                        <LabelInput label="Description" v-model:pass_value="dialog.description" :dbComponentBehavior="dbComponentBehavior.text_required"/>
                    </div>
                    <div class="col-xl-10 col-lg-10 col-md-10 col-sm-10 col-xs-10">
                        <div class="row">
                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                <Label pass_value="Amount"/>
                            </div>
                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                <Input
                                    v-model:pass_value="dialog.amount"
                                    :dbComponentBehavior="dbComponentBehavior.number_right"
                                    :outlined="true"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-10 col-lg-10 col-md-10 col-sm-10 col-xs-10">
                        <div class="row">
                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                <Label pass_value="Quantity"/>
                            </div>
                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                <Input
                                    v-model:pass_value="dialog.qty"
                                    :dbComponentBehavior="dbComponentBehavior.number_right"
                                    :outlined="true"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </q-form>
        </q-card-section>

        <q-card-actions align="right" style="padding-top:0px;padding-bottom:16px;padding-right:16px">
            <q-btn flat label="Cancel" font_color="#29292A" color="#29292A" @click="closeDialogChild" size="12px" class="dialog_confirm_cancel_button"/>
            <q-btn flat :label="dialog.action" font_color="white" color="'#D81111'" size="12px" class="primary_actions_button" @click="handleChild(dialog.action)" />
        </q-card-actions>

        <q-inner-loading
            :showing="dialog.loading"
            color="primary"
        />
        </q-card>
    </q-dialog>

    <q-dialog v-model="dialog.confirm" persistent position="top">
        <q-card style="width: 864px; max-width: 98vw;text-align:center;margin-top: 5%;border-radius: 8px">

        <q-card-section class="theme_color row items-center" style="height:56px; padding: 8px 24px;border-bottom: 1px solid #a7bbcb;">
            <div class="confirm_title">Confirmation</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup/>
        </q-card-section>

        <q-card-section style="padding: 32px 24px">
            <span class="confirmation_line_font">Are you sure want to delete this record?</span>
        </q-card-section>

        <q-card-actions align="right" style="padding-top:0px;padding-bottom:16px;padding-right:16px">
            <q-btn flat label="Cancel" font_color="#29292A" color="#29292A" v-close-popup size="12px" class="dialog_confirm_cancel_button"/>
            <q-btn flat label="Confirm" font_color="white" color="'#D81111'" size="12px" class="primary_actions_button" @click="handleDeleteChild" />
        </q-card-actions>

        <q-inner-loading
            :showing="dialog.loading"
            color="primary"
        />
        </q-card>
    </q-dialog>

    <q-dialog v-model="dialog.post" persistent position="top">
        <q-card style="width: 864px; max-width: 98vw;text-align:center;margin-top: 5%;border-radius: 8px">

        <q-card-section class="theme_color row items-center" style="height:56px; padding: 8px 24px;border-bottom: 1px solid #a7bbcb;">
            <div class="confirm_title">Confirmation</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup/>
        </q-card-section>

        <q-card-section style="padding: 32px 24px">
            <span class="confirmation_line_font">Are you sure want to post this record?</span>
        </q-card-section>

        <q-card-actions align="right" style="padding-top:0px;padding-bottom:16px;padding-right:16px">
            <q-btn flat label="Cancel" font_color="#29292A" color="#29292A" v-close-popup size="12px" class="dialog_confirm_cancel_button"/>
            <q-btn flat label="Confirm" font_color="white" color="'#D81111'" size="12px" class="primary_actions_button" @click="postInvoice" />
        </q-card-actions>

        <q-inner-loading
            :showing="dialog.loading"
            color="primary"
        />
        </q-card>
    </q-dialog>

    <q-dialog v-model="dialog.cancel" persistent position="top">
        <q-card style="width: 864px; max-width: 98vw;text-align:center;margin-top: 5%;border-radius: 8px">

        <q-card-section class="theme_color row items-center" style="height:56px; padding: 8px 24px;border-bottom: 1px solid #a7bbcb;">
            <div class="confirm_title">Confirmation</div>
            <q-space />
            <q-btn icon="close" flat round dense @click="closeDialogCancel"/>
        </q-card-section>

        <q-card-section style="padding: 32px 24px;" class="row justify-center">
            <span class="col-12">Are you sure want to cancel this record?</span>
            <div class="col-12 q-pt-lg q-pr-xl">
                <LabelTextarea label="Reason" v-model:pass_value="dialog.reason" :readonly="false" :dbComponentBehavior="dbComponentBehavior.textarea"/>
            </div>
        </q-card-section>

        <q-card-actions align="right" style="padding-top:0px;padding-bottom:16px;padding-right:16px">
            <q-btn flat label="Cancel" font_color="#29292A" color="#29292A" @click="closeDialogCancel" size="12px" class="dialog_confirm_cancel_button"/>
            <q-btn flat label="Confirm" font_color="white" color="'#D81111'" size="12px" class="primary_actions_button" @click="cancelInvoice" />
        </q-card-actions>

        <q-inner-loading
            :showing="dialog.loading"
            color="primary"
        />
        </q-card>
    </q-dialog>
</template>

<script>
import Label from 'src/components/PRIMS/Main/Label'
import Select from 'src/components/PRIMS/Main/Select'
import Input from 'src/components/PRIMS/Main/Input'
import LabelSelect from 'src/components/PRIMS/General/LabelSelect'
import LabelInput from 'src/components/PRIMS/General/LabelInput'
import LabelDatepicker from 'src/components/PRIMS/General/LabelDatepicker'
import LabelCheckbox from 'src/components/PRIMS/General/LabelCheckbox'
import LabelTextarea from 'src/components/PRIMS/General/LabelTextarea'
import Table from 'src/components/PRIMS/Main/Table.vue';
import Button from 'src/components/PRIMS/Main/Button'
import { Notify } from "quasar";

export default {
    components: {
        Label,
        Select,
        Input,
        LabelInput,
        LabelSelect,
        LabelDatepicker,
        LabelCheckbox,
        LabelTextarea,
        Table,
        Button,
    },
    data(){
        return{
            json: {
                refno: "",
                date: "",
                supplier_guid: "",
                vendor_code: "",
                address_1: "",
                address_2: "",
                address_3: "",
                type: "",
                total_amount: 0.00,
                total_incl_tax: 0.00,
                remarks: "",
                documentuuid: "",
                pip_status: "",
                pip_at: "",
                pip_response: "",
                pip: 0,
                lhdn_validated_at: "",
                lhdn_validated: 0,
                tta_guid: "",
                tta_pic: "",
                effective_date_from: "",
                effective_date_to: "",
            },
            ori_params: {},
            table_column: [],
            table_data: [],
            rearrange_column: [],
            currentInv: "",
            dialog: {
                child: false,
                confirm: false,
                post: false,
                cancel: false,
                loading: false,
                amount: 0,
                description: "",
                qty: 1,
                invoice_child_guid: "",
                reason: "",
            },
            page_function: "",
            username: localStorage.getItem("username") != "" && localStorage.getItem("username") != "null" && localStorage.getItem("username") != null ? localStorage.getItem("username") : "",
            company_guid: localStorage.getItem("company_guid") != "" && localStorage.getItem("company_guid") != "null" && localStorage.getItem("company_guid") != null ? localStorage.getItem("company_guid") : "",
            supplier_list: [],
            tta_list: [],
            tta_option_list: [],
            outlet_list: [],
            outlet_options: [],
            company_options: [],
            type_list: [{label:'TTA',value:'tta'},{label:'Adhoc', value: 'adhoc'},{label:'Auto Calculation', value: 'auto_calc'},,{label:'Auto Tier Calculation', value: 'tier'}],
            loading: false,
            readonlyStatus: false,
            parentReadonlyStatus: false,
        }
    },
    computed: {
        dbComponentBehavior() {
            return this.$store.getters["dbComponentBehavior/byLanguage"]("tta");
        },
        ttaOptions(){
            var options = this.tta_list;
            if(this.json.supplier_guid != "")
            {
                options = this.tta_list.filter(entry => entry.supplier_to == this.json.supplier_guid);
            }
            return options;
        },
        typeOptions(){
            var options = this.type_list;
            if(this.json.type != 'auto_calc' && this.json.type != 'tier')
            {
                options = this.type_list.filter(entry => entry.value != 'auto_calc' && entry.value != 'tier');
            }
            return options;
        },
        startDateOptions(){
            return (date) => {
                if(this.json.tta_guid != "")
                {
                    const tta = this.tta_list.find(entry => entry.tta_guid == this.json.tta_guid);
                    var start_date = `${tta.effective_date_from.split('-')[0]}-01-01`;
                    start_date = start_date.replaceAll('-','/');
                    var end_date = tta.effective_date_to.split(' ')[0];
                    end_date = end_date.replaceAll('-','/');
                    return date >= start_date && date < end_date;
                }
                return date;
            };
        },
        endDateOptions(){
            return (date) => {
                if(this.json.tta_guid != "")
                {
                    const tta = this.tta_list.find(entry => entry.tta_guid == this.json.tta_guid);

                    var end_date = tta.effective_date_to.split(' ')[0];
                    end_date = end_date.replaceAll('-','/');
                    
                    if(this.json.effective_date_from != "")
                    {
                        var start_date = this.json.effective_date_from.split(' ')[0];
                        start_date = start_date.replaceAll('-','/');
                    }
                    else
                    {
                        var start_date = `${tta.effective_date_from.split('-')[0]}-01-01`;
                        start_date = start_date.replaceAll('-','/');
                    }
                    return date > start_date && date <= end_date;
                }
                return date;
            };
        }
    },
    async mounted(){
        this.loading = true;

        // set tta options
        var payload = {
            params: {
                "limit": 99999,
            }
        }

        var pass_obj = {
            "dispatch": 'tta/trigger_get_tta_list',
            "getter": 'tta/get_tta',
            "app": this,
            "payload": payload,
        }

        var tta_list = await this.$dispatch(pass_obj);

        if(tta_list.status)
        {
            var array_options = [];
            for(var i in tta_list.response.data.results)
            {
                var obj = tta_list.response.data.results[i];
                obj.value = tta_list.response.data.results[i].tta_guid;
                obj.label = tta_list.response.data.results[i].refno;
                array_options.push(obj);
            }
            this.tta_list = array_options;
        }

        // set supplier options
        var pass_obj = {
            "dispatch": 'general/trigger_get_supplier_list',
            "getter": 'general/get_supplier',
            "app": this,
            "payload": payload,
        }

        var supplier_list = await this.$dispatch(pass_obj);

        if(supplier_list.status)
        {
            var array_options = [];
            for(var i in supplier_list.response.data.results)
            {
                var obj = supplier_list.response.data.results[i];
                obj.value = obj.supplier_guid;
                obj.label = `${obj.code} - ${obj.name}`;
                array_options.push(obj);
            }
            this.supplier_list = array_options;
        }

        // set company options
        var pass_obj = {
            "dispatch": 'general/trigger_get_company_info_list',
            "getter": 'general/get_company_info',
            "app": this,
            "payload": {},
        }

        var company = await this.$dispatch(pass_obj);

        if(company.status)
        {
            var array_options = [];
            for(var i in company.response.data.results)
            {
                var obj = company.response.data.results[i];
                obj.value = obj.company_info_guid;
                obj.label = `${obj.code} - ${obj.name}`;
                array_options.push(obj);
            }
            this.company_options = array_options;
        }

        if(this.$route.name == 'createInvoice')
        {
            this.page_function = 'create';
            this.readonlyStatus = false;

            var current_date = new Date();
            current_date = `${current_date.getFullYear()}-${('0' + (current_date.getMonth() + 1)).slice(-2)}-${('0' + current_date.getDate()).slice(-2)}`;
            this.json.date = current_date
        }
        else if(this.$route.name == 'editInvoice')
        {
            this.page_function = 'edit';
            
            if(this.$route.query.guid)
            {
                this.currentInv = this.$route.query.guid;
            }
            
            if(this.currentInv == "")
            {
                this.showNotify('negative', 'Unable to identify Invoice Guid.');
                this.$router.push({name: "invoice"});
            }

            var pass_obj = {
                "dispatch": 'general/trigger_get_banner_outlet_list',
                "getter": 'general/get_banner_outlet',
                "app": this,
                "payload": payload,
            }

            var outlet_list = await this.$dispatch(pass_obj);

            if(outlet_list.status)
            {
                var array_options = [];
                for(var i in outlet_list.response.data.results)
                {
                    var obj = outlet_list.response.data.results[i].retailer_outlet;
                    obj.value = obj.retailer_outlet_guid;
                    obj.label = `${obj.code} - ${obj.name}`;
                    obj.concept_guid = outlet_list.response.data.results[i].concept_guid;
                    array_options.push(obj);
                }
                this.outlet_list = array_options;
            }

            var payload = {
                'invoice_guid': this.currentInv,
            }

            var pass_obj = {
                "dispatch": 'transaction/trigger_get_invoice',
                "getter": 'transaction/get_invoice',
                "app": this,
                "payload": payload,
            }

            var invoice_details = await this.$dispatch(pass_obj);
            
            if(invoice_details.status)
            {
                console.log(invoice_details)
                this.json = invoice_details.response.data;
                this.json.remarks = this.json.remarks ? this.json.remarks : "";
                this.json.invoice_child = [];

                if(this.json.type == 'auto_calc' || this.json.type == 'tier' || this.json.posted == 1 || this.json.canceled == 1)
                {
                    this.readonlyStatus = true;
                }
                this.tta_option_list = this.ttaOptions;
                this.table_function(this.ori_params);
            }
        }       

        this.loading = false;
    },
    methods:{
        handleChangeInvoiceDate(newVal)
        {
            this.json.date = newVal;
        },
        handleChangeDateFrom(newVal)
        {
            this.json.effective_date_from = newVal;
            console.log(newVal)
        },
        handleChangeDateTo(newVal)
        {
            this.json.effective_date_to = newVal;
            console.log(newVal)
        },
        handleChangeVendor(newVal)
        {
            this.tta_option_list = this.ttaOptions;
            var vendor = this.supplier_list.filter(entry => entry.supplier_guid == newVal);
            if(vendor.length>0)
            {
                this.json.vendor_code = vendor[0].code ? vendor[0].code : "";
                this.json.address_1 = vendor[0].address1 ? vendor[0].address1 : "";
                this.json.address_2 = vendor[0].address2 ? vendor[0].address2 : "";
                this.json.address_3 = vendor[0].address3 ? vendor[0].address3 : "";
            }
            this.json.tta_guid = "";
            this.json.tta_pic = "";
        },
        handleChangeTTA(newVal)
        {
            var tta = this.tta_list.filter(entry => entry.tta_guid == newVal);
            if(tta.length>0)
            {
                this.json.tta_pic = tta[0].authorised_by ? tta[0].authorised_by : "";
            }
        },
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

            if(!this.json.invoice_guid)
            {
                this.table_column = [
                    {
                        name: 'line',
                        required: true,
                        label: 'Line',
                        align: 'center',
                        sortable: true,
                        field: 'line',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    {
                        name: 'description',
                        required: true,
                        label: 'Description',
                        align: 'center',
                        sortable: true,
                        field: 'description',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    {
                        name: 'purchase_value',
                        required: true,
                        label: 'Purchase Value',
                        align: 'center',
                        sortable: true,
                        field: 'purchase_value',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    {
                        name: 'qty',
                        required: true,
                        label: 'Qty',
                        align: 'center',
                        sortable: true,
                        field: 'qty',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    {
                        name: 'rate',
                        required: true,
                        label: 'Rate',
                        align: 'center',
                        sortable: true,
                        field: 'rate',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    {
                        name: 'type',
                        required: true,
                        label: 'Type',
                        align: 'center',
                        sortable: true,
                        field: 'type',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    {
                        name: 'totalprice',
                        required: true,
                        label: 'Total Price',
                        align: 'center',
                        sortable: true,
                        field: 'totalprice',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    {
                        name: 'tax_code',
                        required: true,
                        label: 'Tax Code',
                        align: 'center',
                        sortable: true,
                        field: 'tax_code',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    {
                        name: 'tax_rate',
                        required: true,
                        label: 'Tax Rate',
                        align: 'center',
                        sortable: true,
                        field: 'tax_rate',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    {
                        name: 'tax_amount',
                        required: true,
                        label: 'Tax Amount',
                        align: 'center',
                        sortable: true,
                        field: 'tax_amount',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    {
                        name: 'total_incl_tax',
                        required: true,
                        label: 'Total Incl Tax',
                        align: 'center',
                        sortable: true,
                        field: 'total_incl_tax',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    {
                        name: 'created_at',
                        required: true,
                        label: 'Create At',
                        align: 'center',
                        sortable: true,
                        field: 'created_at',
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
                ];

                this.table_data = {
                    data: {
                        results: [],
                    }
                };
                return;
            }


            if(this.rearrange_column.length > 0)
            {
                var column = this.rearrange_column;
            }
            else
            {
                var column = [
                    {
                        name: 'line',
                        required: true,
                        label: 'Line',
                        align: 'center',
                        sortable: true,
                        field: 'line',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    {
                        name: 'description',
                        required: true,
                        label: 'Description',
                        align: 'center',
                        sortable: true,
                        field: 'description',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    {
                        name: 'outlet_code',
                        required: true,
                        label: 'Outlet',
                        align: 'center',
                        sortable: true,
                        field: 'outlet_code',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    {
                        name: 'calc_method',
                        required: true,
                        label: 'Calc Method',
                        align: 'center',
                        sortable: true,
                        field: 'calc_method',
                        format: (val)=> (!!val && val != '-') ? val.toUpperCase() : val,
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    {
                        name: 'amount',
                        required: true,
                        label: 'Amount',
                        align: 'center',
                        sortable: true,
                        field: 'amount',
                        format: (val) => this.formatAmount(val,'$'),
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    {
                        name: 'qty',
                        required: true,
                        label: 'Qty',
                        align: 'center',
                        sortable: true,
                        field: 'qty',
                        format: (val) => this.formatAmount(val,'qty'),
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    {
                        name: 'rate',
                        required: true,
                        label: 'Rate',
                        align: 'center',
                        sortable: true,
                        field: 'rate',
                        format: (val) => this.formatAmount(val,'%'),
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    {
                        name: 'type',
                        required: true,
                        label: 'Type',
                        align: 'center',
                        sortable: true,
                        field: 'type',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    {
                        name: 'totalprice',
                        required: true,
                        label: 'Total Price',
                        align: 'center',
                        sortable: true,
                        field: 'totalprice',
                        format: (val) => this.formatAmount(val,'$'),
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    {
                        name: 'tax_code',
                        required: true,
                        label: 'Tax Code',
                        align: 'center',
                        sortable: true,
                        field: 'tax_code',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    {
                        name: 'tax_rate',
                        required: true,
                        label: 'Tax Rate',
                        align: 'center',
                        sortable: true,
                        field: 'tax_rate',
                        format: (val) => this.formatAmount(val,'%'),
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    {
                        name: 'tax_amount',
                        required: true,
                        label: 'Tax Amount',
                        align: 'center',
                        sortable: true,
                        field: 'tax_amount',
                        format: (val) => this.formatAmount(val,'$'),
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    {
                        name: 'total_incl_tax',
                        required: true,
                        label: 'Total Incl Tax',
                        align: 'center',
                        sortable: true,
                        field: 'total_incl_tax',
                        format: (val) => this.formatAmount(val,'$'),
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    {
                        name: 'created_at',
                        required: true,
                        label: 'Create At',
                        align: 'center',
                        sortable: true,
                        field: 'created_at',
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
                ];
            }

            if(!this.readonlyStatus)
            {
                const obj = {
                    name: 'action',
                    required: true,
                    label: 'Action',
                    align: 'center',
                    sortable: true,
                    field: 'action',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                }
                column.unshift(obj);
            }

            this.table_column = column;

            payload.params.invoice_guid = this.json.invoice_guid;
            
            if(payload.params.ordering == "")
            {
                payload.params.ordering = "line";
            }

            var pass_obj = {
                "dispatch": 'transaction/trigger_get_invoice_child_list',
                "getter": 'transaction/get_invoice_child',
                "app": this,
                "payload": payload,
            };

            var invoice_child_list = await this.$dispatch(pass_obj);


            if(invoice_child_list.status)
            {
                console.log("inv child",invoice_child_list)
                var rows = invoice_child_list.response;
                this.json.invoice_child = rows.data.results;
                var invoice_child = [];
                for(var i in this.json.invoice_child)
                {
                    const obj = {
                        invoice_child_guid: this.json.invoice_child[i].invoice_child_guid,
                        amount: parseFloat(this.json.invoice_child[i].amount),
                        qty: parseInt(this.json.invoice_child[i].qty),
                        description: this.json.invoice_child[i].description,
                        retailer_outlet_guid: this.json.invoice_child[i].retailer_outlet_guid,
                    }

                    invoice_child.push(obj);
                }
                this.json.invoice_child = invoice_child;
            }
            else
            {
                var rows = {
                    data: {
                        results: [],
                    }
                };
            }

            this.parentReadonlyStatus = this.json.invoice_child.length>0 ? true : false;

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
        async handleAdd()
        {
            this.dialog.action = "ADD";
            this.outlet_options = await this.filterOutlet();
            this.dialog.child = true;
        },
        async handleEdit(payload)
        {
            this.dialog.action = "EDIT";
            this.dialog.amount = payload.row.amount;
            this.dialog.qty = payload.row.qty;
            this.dialog.description = payload.row.description;
            this.dialog.retailer_outlet_guid = payload.row.retailer_outlet_guid;
            this.dialog.invoice_child_guid = payload.row.invoice_child_guid;
            this.outlet_options = await this.filterOutlet();
            this.dialog.child = true;
        },
        handleDelete(payload)
        {
            this.dialog.invoice_child_guid = payload.row.invoice_child_guid;
            this.dialog.confirm = true;
        },
        async handleDeleteChild()
        {
            this.dialog.loading = true;

            var payload = {
                invoice_child_guid: this.dialog.invoice_child_guid,
            }

            var pass_obj = {
                "dispatch": 'transaction/trigger_delete_invoice_child',
                "getter": 'transaction/get_invoice_child',
                "app": this,
                "payload": payload,
            };

            var data_response = await this.$dispatch(pass_obj);
            if(!data_response.status)
            {
                this.showNotify('negative','Delete failed.');
                this.dialog.loading = false;
                console.log(data_response);
                return ;
            }

            this.showNotify('positive','Successfully deleted.');
            await this.reloadInvoice();
            this.dialog.loading = false;
            this.dialog.confirm = false;
        },
        async handleChild(){
            this.dialog.loading = true;
            var error = 0;
            await this.$refs.save_dialog.validate().then(valid => {
                if (!valid) {
                    error = 1;
                }
            });

            var error = error == 1 ? false : true;
            // console.log(error, this.json)

            if(!error)
            {
                this.showNotify('negative', 'Please make sure all field is correct.');
                this.dialog.loading = false;
                return;
            }

            if(this.dialog.action == "ADD")
            {
                const new_child = {
                    "description": this.dialog.description,
                    "amount": parseFloat(this.dialog.amount),
                    "qty": parseInt(this.dialog.qty),
                    "retailer_outlet_guid": this.dialog.retailer_outlet_guid,
                }
                this.json.invoice_child.push(new_child);
            }
            else if(this.dialog.action == "EDIT"){
                this.json.invoice_child.map((entry)=>{
                    if(entry.invoice_child_guid == this.dialog.invoice_child_guid)
                    {
                        entry.amount = parseFloat(this.dialog.amount);
                        entry.qty = parseInt(this.dialog.qty);
                        entry.description = this.dialog.description;
                        entry.retailer_outlet_guid = this.dialog.retailer_outlet_guid;
                    }
                })
            }            

            var payload = {
                pass_json: {
                    "invoice_guid": this.json.invoice_guid,
                    "company_guid": this.company_guid,
                    "tta_guid": this.json.tta_guid,
                    "supplier_guid": this.json.supplier_guid,
                    "date": this.json.date,
                    "type": this.json.type,
                    "effective_date_from": this.json.effective_date_from,
                    "effective_date_to": this.json.effective_date_to,
                    "remarks": this.json.remarks,
                    "created_by": this.username,
                    "updated_by": this.username,
                    "invoice_child": this.json.invoice_child,
                }
            }

            var pass_obj = {
                "dispatch": 'transaction/trigger_update_invoice_bulk',
                "getter": 'transaction/get_invoice',
                "app": this,
                "payload": payload,
            };

            var data_response = await this.$dispatch(pass_obj);
            if(!data_response.status)
            {
                this.showNotify('negative','Update failed.');
                this.dialog.loading = false;
                console.log(data_response);
                return ;
            }

            this.showNotify('positive','Successfully updated.');
            await this.reloadInvoice();
            this.dialog.loading = false;
            this.closeDialogChild();


            // var line = this.table_data.data.results.length + 1;

            // var payload = {
            //     pass_json: {
            //         "line": line,
            //         "description": this.dialog.description,
            //         "amount": this.dialog.amount,
            //         "qty": this.dialog.qty,
            //         "retailer_outlet_guid": this.dialog.retailer_outlet_guid,
            //         "type": "$",
            //         "created_by": this.username,
            //         "updated_by": this.username,
            //         "company_guid": this.company_guid,
            //         "tta_guid": this.json.tta_guid,
            //         "invoice_guid": this.json.invoice_guid,
            //     }
            // }

            // var pass_obj = {
            //     "dispatch": 'transaction/trigger_create_invoice_child',
            //     "getter": 'transaction/get_invoice_child',
            //     "app": this,
            //     "payload": payload,
            // };

            // var data_response = await this.$dispatch(pass_obj);

            // if(!data_response.status)
            // {
            //     this.showNotify('negative','Create failed.');
            //     this.loading = false;
            //     console.log(data_response);
            //     return ;
            // }

            // this.showNotify('positive','Successfully created.');
        },
        async postInvoice()
        {
            this.dialog.loading = true;

            var payload = {
                pass_json: {
                    "invoice_guid": this.json.invoice_guid,
                }
            }
            console.log(payload);

            var pass_obj = {
                "dispatch": 'transaction/trigger_post_invoice',
                "getter": 'transaction/get_invoice',
                "app": this,
                "payload": payload,
            };

            var data_response = await this.$dispatch(pass_obj);

            if(!data_response.status)
            {
                this.showNotify('negative','Post invoice failed.');
                console.log(data_response.response);
                this.dialog.loading = false;
                return
            }

            this.showNotify('positive','Post invoice successfully.');
            this.dialog.loading = false;
            this.dialog.post = false;
            this.$router.push({name: 'invoice'});
        },
        async cancelInvoice()
        {
            this.dialog.loading = true;

            if(this.dialog.reason == "")
            {
                this.showNotify("Please fill in the reason of cancellation.");
                this.dialog.loading = false;
                return;
            }

            var payload = {
                pass_json: {
                    invoices: [
                        {
                            "invoice_guid": this.json.invoice_guid,
                            "cancel_reason": this.dialog.reason,
                        },
                    ]
                }
            }

            var pass_obj = {
                "dispatch": 'transaction/trigger_cancel_invoice_bulk',
                "getter": 'transaction/get_invoice',
                "app": this,
                "payload": payload,
            };

            var data_response = await this.$dispatch(pass_obj);
            if(!data_response.status)
            {
                console.log(data_response);
                const valid = this.isValidJSON(data_response.response);
                var message = 'Cancel failed.';
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
                this.dialog.loading = false;
                return ;
            }

            this.showNotify('positive','Successfully cancelled.');
            this.dialog.loading = false;
            this.closeDialogCancel();
            this.$router.push({name: 'invoice'});
        },
        printInvoice(){
            this.$router.push({name: 'printInvoice',query:{invoice_guid: this.json.invoice_guid}});
        },
        async saveInvoice()
        {
            this.loading = true;
            var error = 0;
            await this.$refs.save_form.validate().then(valid => {
                if (!valid) {
                    error = 1;
                }
            });

            var error = error == 1 ? false : true;
            // console.log(error, this.json)

            if(!error)
            {
                this.showNotify('negative', 'Please make sure all field is correct.');
                this.loading = false;
                return;
            }

            var payload = {
                pass_json: {
                    "company_guid": this.company_guid,
                    "company_info_guid": this.json.company_info_guid,
                    "tta_guid": this.json.tta_guid,
                    "supplier_guid": this.json.supplier_guid,
                    "date": this.json.date,
                    "type": this.json.type,
                    "effective_date_from": this.json.effective_date_from,
                    "effective_date_to": this.json.effective_date_to,
                    "remarks": this.json.remarks,
                    "updated_by": this.username,
                    "invoice_child": this.json.invoice_child,
                }
            }

            if(this.page_function == 'create')
            {
                payload.pass_json.created_by = this.username;

                var pass_obj = {
                    "dispatch": 'transaction/trigger_create_invoice_bulk',
                    "getter": 'transaction/get_invoice',
                    "app": this,
                    "payload": payload,
                };

                var data_response = await this.$dispatch(pass_obj);

                if(!data_response.status)
                {
                    this.showNotify('negative','Create failed.');
                    this.loading = false;
                    console.log(data_response);
                    return ;
                }

                this.showNotify('positive','Successfully created.');
                this.$router.push({name: 'editInvoice', query: { guid: data_response.response.invoice_guid }});
            }
            else if(this.page_function == 'edit')
            {
                payload.pass_json.invoice_guid = this.json.invoice_guid;

                var pass_obj = {
                    "dispatch": 'transaction/trigger_update_invoice_bulk',
                    "getter": 'transaction/get_invoice',
                    "app": this,
                    "payload": payload,
                };

                var data_response = await this.$dispatch(pass_obj);
                if(!data_response.status)
                {
                    this.showNotify('negative','Update failed.');
                    this.loading = false;
                    console.log(data_response);
                    return ;
                }

                this.showNotify('positive','Successfully updated.');
                this.$router.push({name: 'invoice'});
            }
            this.loading = false;
        },
        async reloadInvoice()
        {
            var payload = {
                'invoice_guid': this.currentInv,
            }

            var pass_obj = {
                "dispatch": 'transaction/trigger_get_invoice',
                "getter": 'transaction/get_invoice',
                "app": this,
                "payload": payload,
            }

            var invoice_details = await this.$dispatch(pass_obj);
            
            if(invoice_details.status)
            {
                this.json = invoice_details.response.data;
                this.json.remarks = this.json.remarks ? this.json.remarks : "";
            }
            this.table_function(this.ori_params);
        },
        closeDialogChild()
        {
            this.dialog.amount = 0;
            this.dialog.qty = 1;
            this.dialog.description = "";
            this.dialog.retailer_outlet_guid = "";
            this.dialog.invoice_child_guid = "";
            this.dialog.child = false;
        },
        closeDialogCancel()
        {
            this.dialog.reason = "";
            this.dialog.cancel = false;
        },
        async filterOutlet()
        {
            var options = [];

            var payload = {
                params: {
                    "limit": 99999,
                    "tta_guid": this.json.tta_guid,
                }
            }

            var pass_obj = {
                "dispatch": 'tta/trigger_get_tta_banner_list',
                "getter": 'tta/get_banner',
                "app": this,
                "payload": payload,
            }

            var banner = await this.$dispatch(pass_obj);

            var banner_list = [];

            if(banner.status)
            {
                banner_list = banner.response.data.results;
            }

            if(banner_list.length>0)
            {
                options = this.outlet_list.filter((entry)=>{
                    return banner_list.map(entry=>entry.concept_guid).includes(entry.concept_guid);
                });
            };
            console.log(options);

            return options
        },
        formatAmount(value, type) {
            if (value === null || value === undefined) {
                return 'Loading...';
            }

            value = Number(value);
            if (isNaN(value)) {
                console.error("Invalid value:", value);
                return '';
            }

            if (type === "$") {
                value = value.toFixed(2);
            } else if (type === "%") {
                value = value.toFixed(1);
            } else if (type === "qty") {
                value = value.toFixed(0);
            }

            const parts = value.toString().split(".");
            const numberPart = parts[0];
            const decimalPart = parts[1];

            const thousands = /\B(?=(\d{3})+(?!\d))/g;
            const formattedNumber = numberPart.replace(thousands, ",");

            return formattedNumber + (decimalPart ? "." + decimalPart : "");
        },
        goBack(){
            this.$router.push({name: 'invoice'});
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
.header_text
{
    padding-left: 0px;
    padding-right: 16px;
    font-weight: 500;
    font-size: 14px;
    /* font-family: InterfontSemiBold; */

}

.custom_add_button
{
    font-size: 12px; 
    background-color: #26A69A; 
    color: white;
}

.custom_cancel_button
{
    font-size: 14px;
    padding: 5px;
    min-width: 100px;
}

.custom_button
{
    font-size: 14px;
    background-color: #273655;
    color: white;
    padding: 5px;
    min-width: 100px;
}

.showLoading
{
  z-index: 3;
}

* >>> .q-field--outlined.q-field--readonly .q-field__control:before {
    border-style: solid;
}


* >>> input[type="text"]
{
    font-size: 12px;
}

* >>> .q-field__control
{
    padding-left: 6px;
    padding-right: 6px;
    padding-top: 0px;
    padding-bottom: 0px;
}

* >>> .custom_tab_font > .q-tab__label
{
    font-size: 12px;
    overflow: hidden;
}

.q-textarea >>>.q-field__control {
    min-height: 81px !important;
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
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    font-family: InterfontMedium;
}
</style>