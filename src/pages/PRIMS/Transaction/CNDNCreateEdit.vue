<template>
    <div class="row q-pa-md">
        <div v-if="transaction_type == 'cn'"  class="text-subtitle1 header_text col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
            Credit Note
        </div>
        <div v-if="transaction_type == 'dn'"  class="text-subtitle1 header_text col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
            Debit Note
        </div>

        <q-form ref="save_form" class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 bg-white q-my-sm q-pa-md">
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12"  style="font-size: 10px;">
                <div class="row">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 q-px-sm q-py-xs">
                        <LabelInput v-if="readonlyStatus|| parentReadonlyStatus" label="Vendor Name" v-model:pass_value="json.vendor_name" :readonly="true" :dbComponentBehavior="dbComponentBehavior.text"/>
                        <LabelSelect v-else label="Vendor Name" v-model:pass_value="json.supplier_guid" :readonly="false" :options="options.supplier_list" 
                        @receiveChange="handleChangeVendor" :dbComponentBehavior="dbComponentBehavior.select_required"/>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 q-px-sm q-py-xs">
                        <LabelInput label="Vendor Code" v-model:pass_value="json.vendor_code" :readonly="true" :dbComponentBehavior="dbComponentBehavior.text"/>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 q-px-sm q-py-xs">
                        <LabelMultiselect label="Invoice" v-model:pass_value="json.invoices" :readonly="readonlyStatus || parentReadonlyStatus" :options="options.invoices" option_label="Invoices"
                        @receiveChange="handleChangeInvoices" :dbComponentBehavior="dbComponentBehavior.select_required"/>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 q-px-sm q-py-xs">
                        <LabelInput v-if="readonlyStatus || parentReadonlyStatus" label="Outlet" v-model:pass_value="json.outlet_code" :readonly="true" :dbComponentBehavior="dbComponentBehavior.text"/>
                        <LabelSelect v-else label="Outlet" v-model:pass_value="json.retailer_outlet_guid" :readonly="false" :options="options.outlet" 
                        @receiveChange="handleChangeOutlet" :dbComponentBehavior="dbComponentBehavior.select_required"/>
                    </div>
                </div>

                <q-separator class="q-my-md" inset/>

                <div class="row">
                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div class="row">
                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 q-px-sm q-py-xs">
                                <LabelInput label="Ref No" v-model:pass_value="json.refno" :readonly="true" :dbComponentBehavior="dbComponentBehavior.text"/>
                            </div>

                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 q-px-sm q-py-xs">
                                <LabelDatepicker label="Date" :daterange="json.date" :readonly="readonlyStatus" 
                                :dbComponentBehavior="dbComponentBehavior.text_required" @receiveChange="handleChangeDate"/>
                            </div>

                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 q-px-sm q-py-xs">
                                <LabelInput label="Total Amount" v-model:pass_value="json.total_amount" :readonly="true" :dbComponentBehavior="dbComponentBehavior.text"/>
                            </div>

                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 q-px-sm q-py-xs">
                                <LabelSelect label="Company" v-model:pass_value="json.company_info_guid" :readonly="page_function=='edit'" :options="options.company_list" 
                                :dbComponentBehavior="dbComponentBehavior.select_required"/>
                            </div>

                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 q-px-sm q-py-xs">
                                <LabelInput label="Total Incl Tax" v-model:pass_value="json.total_incl_tax" :readonly="true" :dbComponentBehavior="dbComponentBehavior.text"/>
                            </div>

                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 q-px-sm q-py-xs">
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
                </div>
            </div>

            <q-separator v-if="page_function == 'edit'" class="q-my-md" inset/>

            <div v-if="page_function == 'edit' && !readonlyStatus" class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-mt-lg q-mb-md"  style="font-size: 10px;">
                <div class="row justify-end">
                    <Button class="custom_add_button" pass_icon="add" :pass_square="true" :pass_dense="true" :tooltip="true" :pass_tooltip="`Add Row`" 
                    @receiveClick="handleAdd"/>
                </div>
            </div>

            <div v-if="page_function == 'edit'" class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12"  style="font-size: 10px;">
                <div class="row">
                    <Table
                        :row_per_page="[10,50,100,1000]"
                        :table_data="table_data"
                        :table_column="table_column"
                        :flat_status="true"
                        :bordered_status="true"

                        :allow_delete="true"
                        :allow_edit="true"
                        v-on:receiveRequestTable="handleTableChange"
                        v-on:receiveHandleDelete="handleDelete"
                        v-on:receiveHandleEditDetails="handleEdit"

                        :filter_mode_on="false"
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
                    <Button :pass_label="'Back'"
                        v-on:receiveClick="goBack"
                        :pass_no_caps="false"
                        :pass_square="true"
                        :pass_dense="true"
                        class="custom_cancel_button"
                    />

                    <Button v-if="!readonlyStatus" :pass_label="'Save'"
                        v-on:receiveClick="saveCNDN"
                        :pass_no_caps="false"
                        :pass_square="true"
                        :pass_dense="true"
                        class="custom_button"
                    />
                    
                    <Button v-if="page_function == 'edit'" pass_label="PRINT"
                        v-on:receiveClick="printCNDN"
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
            <q-btn flat label="Confirm" font_color="white" color="'#D81111'" size="12px" class="primary_actions_button" @click="postCNDN" />
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
            <q-btn flat label="Confirm" font_color="white" color="'#D81111'" size="12px" class="primary_actions_button" @click="cancelCNDN" />
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
import Input from 'src/components/PRIMS/Main/Input'
import LabelInput from 'src/components/PRIMS/General/LabelInput'
import LabelDatepicker from 'src/components/PRIMS/General/LabelDatepicker'
import LabelCheckbox from 'src/components/PRIMS/General/LabelCheckbox'
import LabelTextarea from 'src/components/PRIMS/General/LabelTextarea'
import LabelSelect from 'src/components/PRIMS/General/LabelSelect'
import LabelMultiselect from 'src/components/PRIMS/General/LabelMultiselect'
import Table from 'src/components/PRIMS/Main/Table.vue';
import Button from 'src/components/PRIMS/Main/Button'
import { Notify } from "quasar";

export default {
    components: {
        Label,
        Input,
        LabelInput,
        LabelDatepicker,
        LabelCheckbox,
        LabelTextarea,
        LabelSelect,
        LabelMultiselect,
        Table,
        Button,
    },
    data(){
        return{
            transaction_type: "",
            page_function: "",
            username: localStorage.getItem("username") != "" && localStorage.getItem("username") != "null" && localStorage.getItem("username") != null ? localStorage.getItem("username") : "",
            company_guid: localStorage.getItem("company_guid") != "" && localStorage.getItem("company_guid") != "null" && localStorage.getItem("company_guid") != null ? localStorage.getItem("company_guid") : "",
            json: {
                remarks: "",
                supplier_guid: "",
                retailer_outlet_guid: "",
                invoices: [],
                total_amount: 0.00,
                total_incl_tax: 0.00,
            },
            dialog: {
                child: false,
                confirm: false,
                cancel: false,
                post: false,
                loading: false,
                amount: 0,
                qty: 1,
                description: "",
                cndn_child_guid: "",
                action: "",
                reason: "",
            },
            ori_params: {},
            table_column: [],
            table_data: [],
            rearrange_column: [],
            options: {
                supplier_list: [],
                invoice_list: [],
                outlet_list: [],
                outlet: [],
                invoices: [],
                invoices_child: [],
                company_list: [],
            },            
            currentTrans: "",
            readonlyStatus: false,
            parentReadonlyStatus: false,
            loading: false,
        }
    },
    computed: {
        dbComponentBehavior() {
            return this.$store.getters["dbComponentBehavior/byLanguage"]("tta");
        },
        invoiceOptions()
        {
            var options = [];
            if(this.json.supplier_guid != "")
            {
                options = this.options.invoice_list.filter((entry)=>entry.supplier_guid == this.json.supplier_guid);
            }
            return options;
        },
        // invoiceChildOptions()   // filter invoice options for table row (based on selected invoices)
        // {
        //     var options = [];
        //     if(this.json.invoices.length>0)
        //     {
        //         options = this.options.invoice_list.filter((entry)=> this.json.invoices.includes(entry.invoice_guid));
        //         options = JSON.parse(JSON.stringify(options));
        //         for(const option of options)
        //         {
        //             option.value = option.label;
        //         }
        //     }
        //     return options;
        // },
    },
    async mounted(){
        this.loading = true;

        if(this.$route.name.endsWith('CN'))
        {
            this.transaction_type = 'cn';
        }
        else if(this.$route.name.endsWith('DN'))
        {
            this.transaction_type = 'dn';
        }

        // set supplier options
        var payload = {
            params: {
                "limit": 99999,
                "ordering": 'name',
            }
        }

        var pass_obj = {
            "dispatch": 'general/trigger_get_supplier_list',
            "getter": 'general/get_supplier',
            "app": this,
            "payload": payload,
        };

        var supplier_list = await this.$dispatch(pass_obj);

        if(supplier_list.status)
        {
            var array_options = [];
            for(const supplier of supplier_list.response.data.results)
            {
                const obj = {
                    "label": `${supplier.code} - ${supplier.name}`,
                    "value": supplier.supplier_guid,
                }
                array_options.push(obj);
            }
            this.options.supplier_list = array_options;
        }

        // set invoice options
        var payload = {
            params: {
                "limit": 99999,
                "ordering": 'refno',
            }
        }

        var pass_obj = {
            "dispatch": 'transaction/trigger_get_invoice_list',
            "getter": 'transaction/get_invoice',
            "app": this,
            "payload": payload,
        };

        var invoice_list = await this.$dispatch(pass_obj);

        if(invoice_list.status)
        {
            var array_options = [];
            for(const invoice of invoice_list.response.data.results)
            {
                var obj = invoice;
                obj.label = invoice.refno;
                obj.value = invoice.invoice_guid;
                array_options.push(obj);
            }
            this.options.invoice_list = array_options;
        }

        // set outlet options
        var payload = {
            params: {
                "limit": 99999,
            }
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
            this.options.outlet_list = array_options;
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
            this.options.company_list = array_options;
        }

        if(this.$route.name.startsWith('edit'))
        {
            this.page_function = 'edit';

            if(this.$route.query.guid)
            {
                this.currentTrans = this.$route.query.guid;
            }
            
            if(this.currentTrans == "")
            {
                this.showNotify('negative', 'Unable to identify Transaction Guid.');
                this.$router.push({name: this.transaction_type});
            }

            var payload = {
                'cndn_guid': this.currentTrans,
            }

            var pass_obj = {
                "dispatch": 'transaction/trigger_get_cndn',
                "getter": 'transaction/get_cndn_note',
                "app": this,
                "payload": payload,
            }

            var cndn_details = await this.$dispatch(pass_obj);
            
            if(cndn_details.status)
            {
                var obj = cndn_details.response.data;

                if(obj.posted == 1 || obj.canceled == 1)
                {
                    this.readonlyStatus = true;
                }

                var payload = {
                    params: {
                        'cndn_guid': this.currentTrans,
                    }
                }

                var pass_obj = {
                    "dispatch": 'transaction/trigger_get_cndn_invoice_list',
                    "getter": 'transaction/get_cndn_note',
                    "app": this,
                    "payload": payload,
                }

                var cndn_invoices = await this.$dispatch(pass_obj);

                obj.invoices = [];
                
                if(cndn_invoices.status)
                {
                    obj.invoices = cndn_invoices.response.data.results.map(entry=>entry.invoice_guid);
                }
                await this.handleChangeInvoices(obj.invoices);
                this.json = obj;
                this.handleChangeVendor();
            }            

            console.log(this.json)
            this.table_function(this.ori_params);
        }
        else if(this.$route.name.startsWith('create'))
        {
            this.page_function = 'create';
            this.table_column = [
                {
                    name: 'action',
                    required: true,
                    label: 'Action',
                    align: 'center',
                    sortable: false,
                    field: 'action',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
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
                // {
                //     name: 'inv_no',
                //     required: true,
                //     label: 'Invoice No',
                //     align: 'center',
                //     sortable: true,
                //     field: 'inv_no',
                //     data_type: 'select',
                //     headerStyle: 'text-align: center; width: 1%;',
                //     filter_type: 'input',
                //     filter_options: [],
                //     filter_value: '',
                // },
                {
                    name: 'description',
                    required: true,
                    label: 'Description',
                    align: 'left',
                    sortable: true,
                    field: 'description',
                    data_type: 'input_text',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
                {
                    name: 'purchase_value',
                    required: true,
                    label: 'Amount',
                    align: 'center',
                    sortable: true,
                    field: 'purchase_value',
                    data_type: 'input_number',
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
                    format: (val) => this.formatAmount(val,'$'),
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
            ];
            this.table_data = {
                data: {
                    results: [],
                }
            };
        }

        this.loading = false;
    },
    methods:{
        handleAdd()
        {
            if(this.json.retailer_outlet_guid == "")
            {
                this.showNotify('negative','Please select outlet before adding child.');
                return;
            }
            // console.log(this.options.invoices_child)
            this.dialog.action = "ADD";
            this.dialog.child = true;
            // const line = this.table_data.data.results.length + 1;
            // const obj = {
            //     "line": line,
            //     "invoice_guid": "",
            //     "amount": "",
            //     "tax_code": "GST",
            //     "qty": 1,
            //     "tax_rate": 0,
            //     "tax_amount": 0,
            // }
            // this.table_data.data.results.push(obj);
            // console.log('add row',this.table_data.data.results);
            // const existing_invoice_no = this.table_data.data.results.map(row=>row.inv_no);
            // for(var i in this.table_data.data.results)
            // {
            //     if(!this.table_data.data.results[i].inv_no || this.table_data.data.results[i].inv_no == "")
            //     {
            //         this.table_data.data.results[i].input_options_inv_no = this.options.invoices_child.filter(entry => {
            //             return !existing_invoice_no.includes(entry.value)
            //         });
            //     }
            //     else
            //     {
            //         this.table_data.data.results[i].input_options_inv_no = this.options.invoices_child.filter(entry => {
            //             return !existing_invoice_no.includes(entry.value) || entry.value == this.table_data.data.results[i].inv_no
            //         });
            //     }
            // }
        },
        handleEdit(payload)
        {
            this.dialog.action = "EDIT";
            this.dialog.amount = payload.row.amount;
            this.dialog.qty = payload.row.qty;
            this.dialog.description = payload.row.description;
            this.dialog.cndn_child_guid = payload.row.cndn_child_guid;
            this.dialog.child = true;
        },
        handleDelete(payload)
        {
            this.dialog.cndn_child_guid = payload.row.cndn_child_guid;
            this.dialog.confirm = true;
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
                    "retailer_outlet_guid": this.json.retailer_outlet_guid,
                }
                this.json.cndn_child.push(new_child);
            }
            else if(this.dialog.action == "EDIT"){
                this.json.cndn_child.map((entry)=>{
                    if(entry.cndn_child_guid == this.dialog.cndn_child_guid)
                    {
                        entry.amount = parseFloat(this.dialog.amount);
                        entry.qty = parseInt(this.dialog.qty);
                        entry.description = this.dialog.description;
                        entry.retailer_outlet_guid = this.json.retailer_outlet_guid;
                    }
                })
            }

            var cndn_invoices = [];
            for(var guid of this.json.invoices)
            {
                var obj = {
                    'invoice_guid': guid,
                }
                cndn_invoices.push(obj);
            }

            var payload = {
                pass_json: {
                    "cndn_guid": this.json.cndn_guid,
                    "company_guid": this.company_guid,
                    "retailer_outlet_guid": this.json.retailer_outlet_guid,
                    "supplier_guid": this.json.supplier_guid,
                    "date": this.json.date,
                    "doctype": this.transaction_type,
                    "type": `${this.transaction_type}amt`,
                    "remarks": this.json.remarks,
                    "updated_by": this.username,
                    "created_by": this.username,
                    "cndn_invoice": cndn_invoices,
                    "cndn_child": this.json.cndn_child,
                }
            }
            console.log(payload);

            var pass_obj = {
                "dispatch": 'transaction/trigger_update_cndn_bulk',
                "getter": 'transaction/get_cndn_note',
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
            await this.reloadCNDN();
            this.dialog.loading = false;
            this.closeDialogChild();
        },
        async handleDeleteChild()
        {
            this.dialog.loading = true;

            var payload = {
                cndn_child_guid: this.dialog.cndn_child_guid,
            }

            var pass_obj = {
                "dispatch": 'transaction/trigger_delete_cndn_child',
                "getter": 'transaction/get_cndn_child_note',
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
            await this.reloadCNDN();
            this.dialog.loading = false;
            this.dialog.confirm = false;
        },
        // handleRemoveRow(pass_payload)
        // {
        //     console.log(pass_payload.row)
        //     // if(this.readonlyStatus) return;

        //     const index = this.table_data.data.results.findIndex(entry => entry.line === pass_payload.row.line);
        //     if (index !== -1) {
        //         this.table_data.data.results.splice(index, 1);
        //         for(var i in this.table_data.data.results)
        //         {
        //             this.table_data.data.results[i].line = parseInt(i)+1;
        //         }
        //     }
        //     console.log('remove row', this.table_data.data.results);
        // },
        handleChangeVendor()
        {
            this.options.invoices = this.invoiceOptions;
        },
        async handleChangeInvoices(newVal)    
        {
            this.json.invoices = newVal;
            this.options.outlet = await this.filterOutlet();
            // // change options for table row
            // this.options.invoices_child = this.invoiceChildOptions;
            // for(var i of this.table_data.data.results)
            // {
            //     this.table_data.data.results[i].input_options_inv_no = this.options.invoices_child;
            // }
        },
        // handleChangeSelect(pass_data)
        // {
        //     console.log(pass_data);
        // },
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
                        align: 'left',
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
                        name: 'amount',
                        required: true,
                        label: 'Amount',
                        align: 'center',
                        sortable: true,
                        field: 'amount',
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
                        format: (val) => this.formatAmount(val,'$'),
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
                        name: 'total_amount',
                        required: true,
                        label: 'Total Amount',
                        align: 'center',
                        sortable: true,
                        field: 'total_amount',
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
                var obj = {
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
                };
                column.unshift(obj);
            }

            this.table_column = column;

            payload.params.cndn_guid = this.currentTrans;
            
            if(payload.params.ordering == "")
            {
                payload.params.ordering = "line";
            }

            var pass_obj = {
                "dispatch": 'transaction/trigger_get_cndn_child_list',
                "getter": 'transaction/get_cndn_child_note',
                "app": this,
                "payload": payload,
            };

            var cndn_child_list = await this.$dispatch(pass_obj);

            if(cndn_child_list.status)
            {
                console.log("cndn child",cndn_child_list.response.data.results)
                var rows = cndn_child_list.response;
                var child = [];
                for(var i in rows.data.results)
                {
                    const obj = {
                        amount: parseFloat(rows.data.results[i].amount),
                        qty: parseInt(rows.data.results[i].qty),
                        description: rows.data.results[i].description,
                        retailer_outlet_guid: rows.data.results[i].retailer_outlet_guid,
                        cndn_child_guid: rows.data.results[i].cndn_child_guid,
                    }
                    child.push(obj);
                }
                this.json.cndn_child = child;
                // const existing_invoice_no = rows.data.results.map(row=>row.inv_no);

                // for(var i in rows.data.results)
                // {
                //     if(!rows.data.results[i].inv_no || rows.data.results[i].inv_no == "")
                //     {
                //         rows.data.results[i].input_options_inv_no = this.options.invoices_child.filter(entry => {
                //             return !existing_invoice_no.includes(entry.value)
                //         });
                //     }
                //     else
                //     {
                //         rows.data.results[i].input_options_inv_no = this.options.invoices_child.filter(entry => {
                //             return !existing_invoice_no.includes(entry.value) || entry.value == rows.data.results[i].inv_no
                //         });
                //     }
                    
                // }
            }
            else
            {
                var rows = {
                    data: {
                        results: [],
                    }
                };
            }

            this.parentReadonlyStatus = this.json.cndn_child.length>0 ? true : false;

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
        async saveCNDN()
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

            var cndn_invoices = [];
            for(var guid of this.json.invoices)
            {
                var obj = {
                    'invoice_guid': guid,
                }
                cndn_invoices.push(obj);
            }

            var payload = {
                pass_json: {
                    "company_guid": this.company_guid,
                    "company_info_guid": this.json.company_info_guid,
                    "retailer_outlet_guid": this.json.retailer_outlet_guid,
                    "supplier_guid": this.json.supplier_guid,
                    "date": this.json.date,
                    "doctype": this.transaction_type,
                    "type": `${this.transaction_type}amt`,
                    "remarks": this.json.remarks,
                    "updated_by": this.username,
                    "created_by": this.username,
                    "cndn_invoice": cndn_invoices,
                    "cndn_child": this.json.cndn_child,
                }
            }

            if(this.page_function == 'create')
            {
                var pass_obj = {
                    "dispatch": 'transaction/trigger_create_cndn_bulk',
                    "getter": 'transaction/get_cndn_note',
                    "app": this,
                    "payload": payload,
                };

                var data_response = await this.$dispatch(pass_obj);
                console.log(data_response)
                if(data_response.status)
                {
                    this.showNotify('positive','Successfully created.');
                    if(this.transaction_type == 'cn')
                    {
                        this.$router.push({name:'editCN', query: { guid: data_response.response.cndn_guid}});
                    }
                    else if(this.transaction_type == 'dn')
                    {
                        this.$router.push({name:'editDN', query: { guid: data_response.response.cndn_guid}});
                    }                    
                }
                else
                {
                    this.showNotify('negative','Creation failed.');
                    console.log("create fail",data_response.response);
                }
            }
            else if(this.page_function == 'edit')
            {
                payload.pass_json.cndn_guid = this.json.cndn_guid;

                var pass_obj = {
                    "dispatch": 'transaction/trigger_update_cndn_bulk',
                    "getter": 'transaction/get_cndn_note',
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
                this.$router.push({name: this.transaction_type});
            }
            console.log(payload);
            
            this.loading = false;
        },
        async cancelCNDN()
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
                    cndn: [
                        {
                            "cndn_guid": this.json.cndn_guid,
                            "cancel_reason": this.dialog.reason,
                        },
                    ]
                }
            }

            var pass_obj = {
                "dispatch": 'transaction/trigger_cancel_cndn_bulk',
                "getter": 'transaction/get_cndn_note',
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
            this.$router.push({name: this.transaction_type});
        },
        async postCNDN()
        {
            this.dialog.loading = true;

            var payload = {
                pass_json: {
                    "cndn_guid": this.json.cndn_guid,
                }
            }
            console.log(payload);

            var pass_obj = {
                "dispatch": 'transaction/trigger_post_cndn',
                "getter": 'transaction/get_cndn_note',
                "app": this,
                "payload": payload,
            };

            var data_response = await this.$dispatch(pass_obj);

            if(!data_response.status)
            {
                this.showNotify('negative',`Post ${this.transaction_type=='cn'?'credit note':'debit note'} failed.`);
                console.log(data_response.response);
                this.dialog.loading = false;
                return
            }

            this.showNotify('positive',`Post ${this.transaction_type=='cn'?'credit note':'debit note'} successfully.`);
            this.dialog.loading = false;
            this.dialog.post = false;
            this.$router.push({name: this.transaction_type});
        },
        async reloadCNDN()
        {
            var payload = {
                'cndn_guid': this.currentTrans,
            }

            var pass_obj = {
                "dispatch": 'transaction/trigger_get_cndn',
                "getter": 'transaction/get_cndn_note',
                "app": this,
                "payload": payload,
            }

            var cndn_details = await this.$dispatch(pass_obj);
            
            if(cndn_details.status)
            {
                var obj = cndn_details.response.data;

                var payload = {
                    params: {
                        'cndn_guid': this.currentTrans,
                    }
                }

                var pass_obj = {
                    "dispatch": 'transaction/trigger_get_cndn_invoice_list',
                    "getter": 'transaction/get_cndn_note',
                    "app": this,
                    "payload": payload,
                }

                var cndn_invoices = await this.$dispatch(pass_obj);

                obj.invoices = [];
                
                if(cndn_invoices.status)
                {
                    obj.invoices = cndn_invoices.response.data.results.map(entry=>entry.invoice_guid);
                }
                this.json = obj;
            }
            this.table_function(this.ori_params);
        },
        printCNDN()
        {
            if(this.transaction_type == 'cn')
            {
                this.$router.push({name: 'printCN', query: { guid: row.row.cndn_guid }});
            }
            else if(this.transaction_type == 'dn')
            {
                this.$router.push({name: 'printDN', query: { guid: row.row.cndn_guid }});
            }
        },
        closeDialogChild()
        {
            this.dialog.amount = 0;
            this.dialog.qty = 1;
            this.dialog.description = "";
            this.dialog.cndn_child_guid = "";
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

            var tta = this.options.invoice_list.filter(entry=>this.json.invoices.includes(entry.invoice_guid)).map(entry=>entry.tta_guid);

            var payload = {
                params: {
                    "limit": 99999,
                    "tta_guid__in": tta.join(','),
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
                options = this.options.outlet_list.filter((entry)=>{
                    return banner_list.map(entry=>entry.concept_guid).includes(entry.concept_guid);
                });
            };
            console.log(options)

            return options
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
            this.$router.push({name: this.transaction_type});
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
    },
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

.custom_cancel_button
{
    font-size: 14px;
    padding: 5px;
    min-width: 100px;
}

.custom_add_button
{
    font-size: 12px; 
    background-color: #26A69A; 
    color: white;
}

.custom_delete_button
{
    font-size: 12px; 
    background-color: red; 
    color: white;
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
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    font-family: InterfontMedium;
}
</style>