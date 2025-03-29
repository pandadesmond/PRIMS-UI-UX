<template>
    <div class="row q-pa-md">
        <div v-if="transaction_type == 'cn'" class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
            Credit Note
        </div>
        <div v-if="transaction_type == 'dn'" class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
            Debit Note
        </div>
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-py-md">
            <div class="row q-gutter-md">
                <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-xs-12">
                    <Input
                        v-model:pass_value="search"
                        :dbComponentBehavior="dbComponentBehavior.text"
                        label="Search"
                        :filled="true"
                        @receiveChange="handleChangeSearch"
                    />
                </div>
                <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-xs-12">
                    <MultipleSelect
                        v-model:pass_value="status"
                        v-on:receiveChange="handleChangeSearch"
                        :componentBehavior="dbComponentBehavior.text"
                        label="Status"
                        option_label="Statuses"
                        :options="options.status"
                        :forceSelectAll="forceSelectAll"
                        :filled="true"
                    />
                </div>
                <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-xs-12">
                    <MultipleSelect
                        v-model:pass_value="outlet"
                        v-on:receiveChange="handleChangeSearch"
                        :componentBehavior="dbComponentBehavior.text"
                        label="Outlet"
                        option_label="Outlets"
                        :options="options.outlet_list"
                        :forceSelectAll="forceSelectAll"
                        :filled="true"
                    />
                </div>
                <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-xs-12" @click="getVendor">
                    <MultipleSelect
                        v-model:pass_value="vendor"
                        v-on:receiveChange="handleChangeSearch"
                        :componentBehavior="dbComponentBehavior.text"
                        label="Vendor"
                        option_label="Vendors"
                        :options="options.supplier"
                        :forceSelectAll="forceSelectAll"
                        :filled="true"
                        :loading="dialog.loading"
                    />
                </div>
                <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-xs-12">
                    <MultipleSelect
                        v-model:pass_value="company"
                        v-on:receiveChange="handleChangeSearch"
                        :componentBehavior="dbComponentBehavior.text"
                        label="Company"
                        option_label="Comapnies"
                        :options="options.company_list"
                        :forceSelectAll="forceSelectAll"
                        :filled="true"
                        :loading="dialog.loading"
                    />
                </div>
            </div>
            <div class="row justify-end q-mt-md">
                <Button v-on:receiveClick="handleReceiveReport"
                pass_label="Export"
                :pass_no_caps="true"
                :pass_square="true"
                :pass_dense="true"
                class="action_button"
                />
                <Button v-on:receiveClick="handlePost"
                pass_label="Post"
                :pass_no_caps="true"
                :pass_square="true"
                :pass_dense="true"
                class="action_button"
                />
                <Button v-on:receiveClick="handleCancel"
                pass_label="Cancel"
                :pass_no_caps="true"
                :pass_square="true"
                :pass_dense="true"
                class="action_button"
                />
                <Button v-on:receiveClick="handleCreate"
                pass_label="Create"
                :pass_no_caps="true"
                :pass_square="true"
                :pass_dense="true"
                class="custom_button"
                />
                <Button v-if="transaction_type == 'cn'" v-on:receiveClick="handleGenerate"
                pass_label="Generate"
                :pass_no_caps="true"
                :pass_square="true"
                :pass_dense="true"
                class="custom_button"
                />
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

                :allow_cancel="false"
                :allow_print="true"
                v-on:receiveHandleEdit="handleReceiveHandleEdit"
                v-on:receiveHandleCancel="handleReceiveCancel"
                v-on:receiveHandlePrint="handleReceivePrint"
                v-on:receiveSelectAll="handleSelectAll"

                :filter_mode_on="filter_mode_on"
                v-on:receiveColumnRearrange="handleColumnRearrange"
                v-on:filter_column="handleFilterColumn"
                :forceLoading="forceLoading"
                :column_reordering="true"
                :row_reordering="false"
                :date_format="this.preference.dateFormat ? this.preference.dateFormat : 'YYYY-MM-DD'"
                v-on:receiveHandleClearFilter="handleClearFilter"

                :pass_visible_columns="visibleColumns"
            />
        </div>
    </div>

    <q-inner-loading
        :showing="loading"
        color="primary"
    />

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
        
        <q-card-section class="text-left q-py-sm q-mx-xl">
            <Label :pass_value="transaction_type=='cn' ? 'Selected Credit Notes:' : 'Selected Debit Notes:'"/>
            <div style="border: 0.5px solid grey; max-height: 130px; overflow: auto;" class="q-pa-sm q-mb-md">
                <span v-for="(cndn,index) of selectedRows" :key="index">{{index+1}} - {{cndn.refno}}<br/></span>
            </div>
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
        <q-card style="width: 864px;max-width: 98vw;max-height: 95vh;text-align:center;margin-top: 1%;border-radius: 8px">

        <q-card-section class="theme_color row items-center" style="height:56px; padding: 8px 24px;border-bottom: 1px solid #a7bbcb;">
            <div class="confirm_title">Confirmation</div>
            <q-space />
            <q-btn icon="close" flat round dense @click="dialog.cancel = false"/>
        </q-card-section>

        <div style="max-height: calc(95vh - 56px - 60px); overflow-y: auto;">
            <q-card-section style="padding: 24px;" class="row justify-center">
                <span class="col-12 confirmation_line_font">Are you sure want to cancel this record?</span>
            </q-card-section>
            
            <q-card-section class="text-left q-py-sm q-mx-xl">
                <Label :pass_value="transaction_type=='cn' ? 'Selected Credit Notes:' : 'Selected Debit Notes:'"/>
                <div style="border: 0.5px solid grey; max-height: 130px; overflow: auto;" class="q-pa-sm q-mb-md">
                    <span v-for="(cndn,index) of selectedRows" :key="index">{{index+1}} - {{cndn.refno}}<br/></span>
                </div>
                <Label pass_value="Reason"/>
                <Textarea
                    :readonly="false"
                    type="textarea"
                    :no_label="true"
                    v-model:value="dialog.reason"
                    :componentBehavior="dbComponentBehavior.textarea"
                />
            </q-card-section>

        </div>

        <q-card-actions align="right" style="height:60px;padding-top:0px;padding-bottom:16px;padding-right:16px">
            <q-btn flat label="Cancel" font_color="#29292A" color="#29292A" size="12px" class="dialog_confirm_cancel_button" @click="dialog.cancel = false"/>
            <q-btn flat label="Confirm" font_color="white" color="'#D81111'" size="12px" class="primary_actions_button" @click="cancelCNDN" />
        </q-card-actions>

        <q-inner-loading
            :showing="dialog.loading"
            color="primary"
        />
        </q-card>
    </q-dialog>

    <q-dialog v-model="dialog.generate" persistent position="top">
        <q-card style="width: 864px; max-width: 98vw;text-align:center;margin-top: 5%;border-radius: 8px">

        <q-card-section class="theme_color row items-center" style="height:56px; padding: 8px 24px;border-bottom: 1px solid #a7bbcb;">
            <div class="confirm_title">Generate Credit Note</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup/>
        </q-card-section>

        <q-card-section class="text-left q-pt-lg q-mx-xl">
            <div class="row">
                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                    <Select
                        :readonly="readonly"
                        v-model:pass_value="dialog.company"
                        v-on:receiveChange="handleChangeCompany"
                        :dbComponentBehavior="dbComponentBehavior.select_required"
                        :options="dialog.company_options"
                    />
                </div>
                <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                    <MultipleSelect v-model:pass_value="dialog.invoices" :options="dialog.invoice_options" option_label="Invoices" 
                        :select_all="false" :outlined="true" :componentBehavior="dbComponentBehavior.select_required" @receiveChange="handleChangeInvoices"/>
                </div>
            </div>
        </q-card-section>

        <q-card-section class="text-left q-pt-sm q-mx-xl">
            <Label pass_value="Selected Invoices:"/>
            <div style="border: 0.5px solid grey; max-height: 130px; overflow: auto;" class="q-pa-sm">
                <span v-if="dialog.invoices.length==0">No invoice selected</span>
                <span v-else v-for="(inv,index) of dialog.selectedInvoices" :key="index">{{index+1}} - {{inv}}<br/></span>
            </div>
            <span class="text-red q-mb-md text-caption" v-if="dialog.alert">{{dialog.alert}}</span>
        </q-card-section>

        <q-card-actions align="right" style="padding-top:0px;padding-bottom:16px;padding-right:16px">
            <q-btn flat label="Cancel" font_color="#29292A" color="#29292A" v-close-popup size="12px" class="dialog_confirm_cancel_button"/>
            <q-btn flat label="Confirm" font_color="white" color="'#D81111'" size="12px" class="primary_actions_button" @click="handleGenerateCN" />
        </q-card-actions>

        <q-inner-loading
            :showing="dialog.loading"
            color="primary"
        />
        </q-card>
    </q-dialog>

    <q-dialog v-model="dialog.alert" persistent position="top">
        <q-card style="width: 780px; max-width: 98vw;max-height:95vh;text-align:center;margin-top: 5%;border-radius: 8px">
            <q-card-section class="theme_color row items-center" style="height:56px; padding: 8px 24px;border-bottom: 1px solid #a7bbcb;">
                <div class="confirm_title">Confirmation</div>
                <q-space />
                <q-btn icon="close" flat round dense v-close-popup @click="dialog.currentItem = {}"/>
            </q-card-section>

            <q-card-section v-if="dialog.currentItem.message" style="padding: 32px 40px; overflow-y: auto; max-height: calc(95vh - 56px - 70px);" align="left">
                <span class="confirmation_line_font">{{dialog.currentItem.message}}</span>
                <span v-if="dialog.currentItem.list">
                    <li class="confirmation_line_font" v-for="item in dialog.currentItem.list" :key="item">{{item}}</li>
                </span>
            </q-card-section>

            <q-card-actions align="right" style="padding-top:0px;padding-bottom:16px;padding-right:16px;height:70px">
                <q-btn flat label="Cancel" font_color="#29292A" color="#29292A" size="12px" class="dialog_confirm_cancel_button" v-close-popup @click="dialog.currentItem = {}"/>
                <q-btn flat label="Confirm" font_color="white" color="'#D81111'" size="12px" class="primary_actions_button" @click="generateCN" />
            </q-card-actions>

            <q-inner-loading
                :showing="dialog.loading"
                color="primary"
            />
        </q-card>
    </q-dialog>

    <q-dialog v-model="dialog.report" persistent position="top">
        <q-card style="width: 864px; max-width: 98vw;text-align:center;margin-top: 5%;border-radius: 8px">

        <q-card-section class="theme_color row items-center" style="height:56px; padding: 8px 24px;border-bottom: 1px solid #a7bbcb;">
            <div class="confirm_title">Generate {{transaction_type == 'cn' ? 'Credit Note' : 'Debit Note'}} Report</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup/>
        </q-card-section>

        <q-card-section class="text-left" style="padding: 32px 24px">
            <div style="width:70%" class="q-gutter-md">
                <LabelDatepicker label="Date From" :daterange="currentItem.date_from" v-on:receiveChange="(val) => currentItem.date_from = val" 
                :dbComponentBehavior="dbComponentBehavior.date" :dateFormat="preference.dateFormat"/>
                <LabelDatepicker label="Date To" :daterange="currentItem.date_to" v-on:receiveChange="(val) => currentItem.date_to = val" 
                :dbComponentBehavior="dbComponentBehavior.date" :dateFormat="preference.dateFormat"/>
            </div>
        </q-card-section>

        <q-card-actions align="right" style="padding-top:0px;padding-bottom:16px;padding-right:16px">
            <q-btn flat label="Cancel" font_color="#29292A" color="#29292A" v-close-popup size="12px" class="dialog_confirm_cancel_button"/>
            <q-btn flat label="Generate" font_color="white" color="'#D81111'" size="12px" class="primary_actions_button" @click="handleReport" />
        </q-card-actions>

        <q-inner-loading
            :showing="dialogLoading"
            color="primary"
        />
        </q-card>
    </q-dialog>
</template>

<script>
import Button from 'src/components/PRIMS/Main/Button';
import Label from 'src/components/PRIMS/Main/Label';
import Textarea from 'src/components/PRIMS/Base/TextareaBase'
import Input from 'src/components/PRIMS/Main/Input';
import MultipleSelect from 'src/components/PRIMS/Main/MultipleSelect';
import Table from 'src/components/PRIMS/Main/Table.vue';
import Select from 'src/components/PRIMS/Main/Select.vue';
import LabelMultiselect from 'src/components/PRIMS/General/LabelMultiselect.vue';
import LabelDatepicker from 'src/components/PRIMS/General/LabelDatepicker.vue';
import { Notify } from "quasar";

export default {
    components: {
        Input,
        Label,
        Textarea,
        MultipleSelect,
        Button,
        Table,
        Select,
        LabelMultiselect,
        LabelDatepicker,
    },
    computed: {
        dbComponentBehavior() {
            return this.$store.getters["dbComponentBehavior/byLanguage"]("tta");
        },
        selectedRows(){
            return this.table_data.data.results.filter((entry)=>entry.select == true);
        }
    },
    data() {
        return {
            preference: {},
            company_guid: localStorage.getItem("company_guid") != "" && localStorage.getItem("company_guid") != "null" && localStorage.getItem("company_guid") != null ? localStorage.getItem("company_guid") : "",
            user_retailer: localStorage.getItem("user_retailer") != "" && localStorage.getItem("user_retailer") != "null" && localStorage.getItem("user_retailer") != null ? localStorage.getItem("user_retailer") : "",
            search: "",
            status: [],
            outlet: [],
            vendor: [],
            company: [],
            transaction_type: "",
            table_column: [],
            table_data: [],
            visibleColumns: [],
            rearrange_column: [],
            ori_params: {},
            currentItem: {},
            dialog: {
                post: false,
                cancel: false,
                loading: false,
                generate: false,
                reason: "",
            },
            options: {
                company_list: [],
                outlet_list: [],
                invoice_list: [],
                supplier: [],
                status: [{label: 'Posted',value: '1'},{label: 'Unposted',value: '0'},{label: 'Cancelled',value: 'cancel'}],
            },
            filter_mode_on: false,
            forceLoading: false,
            forceSelectAll: false,
            loading: false,
        }
    },
    async created(){
        if(!localStorage.getItem("preference_setting"))
        {
            var pass_obj = {
                "dispatch": 'general/trigger_get_company',
                "getter": 'general/get_company',
                "app": this,
                "payload": {
                    "company_guid": this.company_guid
                },
            }

            var company = await this.$dispatch(pass_obj);

            if(!company.status)
            {
                this.showNotify('negative', "Preference setting failed.");
                this.$router.push({name: "tta"});
            }

            this.preference = {
                "dateFormat": company.response.data.date_format_setting,
                "default_date_to": company.response.data.date_to_setting,
                "division_setting": company.response.data.division_setting == 1 ? true : false,
                "banner_setting": company.response.data.banner_option_setting,
                "displayBanner": company.response.data.display_banner_setting == 1 ? true : false,
                "settlement_discount_setting": company.response.data.settlement_discount_setting == 1 ? true : false,
            };
            localStorage.setItem("preference_setting", JSON.stringify(this.preference));
        }
        else
        {
            this.preference = JSON.parse(localStorage.getItem("preference_setting"));
        }


        // set invoice list
        var payload = {
            params: {
                limit: 99999,
                ordering: "refno",
            }
        }

        var pass_obj = {
            "dispatch": 'transaction/trigger_get_invoice_list',
            "getter": 'transaction/get_invoice',
            "app": this,
            "payload": payload,
        };

        var invoice = await this.$dispatch(pass_obj);

        if(invoice.status)
        {
            invoice.response.data.results.map(entry=>{
                entry.label = entry.refno;
                entry.value = entry.invoice_guid;
            });
            this.options.invoice_list = invoice.response.data.results;
        }

        // set company list
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
                var obj = {
                    value: company.response.data.results[i].company_info_guid,
                    label: company.response.data.results[i].name,
                    company_info_guid: company.response.data.results[i].company_info_guid,
                    name: company.response.data.results[i].name,
                };
                array_options.push(obj);
            }
            this.options.company_list = array_options;
        }
    },
    async mounted(){
        this.loading = true;

        this.transaction_type = this.$route.name;
        if(this.transaction_type != 'cn' && this.transaction_type != 'dn')
        {
            this.showNotify('negative','Incorrect Path');
            this.$router.push({name: 'tta'});
        }

        // set retailers options
        var retailers = JSON.parse(this.user_retailer).map(entry=>entry.retailer_guid).join(',');

        var payload = {
            params: {
                "limit": 99999,
                "ordering": "code",
                "retailer_guid__in": retailers,
            }
        }

        var pass_obj = {
            "dispatch": 'general/trigger_get_retailer_outlet_list',
            "getter": 'general/get_retailer_outlet',
            "app": this,
            "payload": payload,
        }

        var outlet_list = await this.$dispatch(pass_obj);

        if(outlet_list.status)
        {
            var array_options = [];
            for(var i in outlet_list.response.data.results)
            {
                var obj = {
                    value: outlet_list.response.data.results[i].retailer_outlet_guid,
                    label: `${outlet_list.response.data.results[i].code} - ${outlet_list.response.data.results[i].name}`,
                };
                
                array_options.push(obj);
            }
            this.options.outlet_list = array_options;
        }

        this.table_function(this.ori_params);
        this.loading = false;
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

            if(this.transaction_type == "")
            {
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
                        name: 'select',
                        required: true,
                        label: '',
                        align: 'center',
                        sortable: false,
                        field: 'select',
                        data_type: 'select_all',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    {
                        name: 'status',
                        required: true,
                        label: 'Status',
                        align: 'center',
                        sortable: true,
                        field: 'status',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    {
                        name: 'refno',
                        required: true,
                        label: 'Ref No',
                        align: 'center',
                        sortable: true,
                        field: 'refno',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    {
                        name: 'cndn_invoice',
                        required: true,
                        label: 'Invoices',
                        align: 'left',
                        sortable: true,
                        field: 'cndn_invoice',
                        format: (val)=> this.displayInvoices(val.map(entry=>entry.invoice_guid)),
                        headerStyle: 'text-align: center;',
                        style: 'max-width: 250px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;',
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
                        style: 'max-width: 250px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    {
                        name: 'date',
                        required: true,
                        label: 'Date',
                        align: 'center',
                        sortable: true,
                        field: 'date',
                        data_type: 'date',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    {
                        name: 'company_info_guid',
                        required: true,
                        label: 'Company',
                        align: 'left',
                        sortable: true,
                        field: 'company_info_guid',
                        headerStyle: 'text-align: center; min-width:200px',
                        format: (val) => this.displayCompany(val),
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    {
                        name: 'vendor_code',
                        required: true,
                        label: 'Vendor Code',
                        align: 'center',
                        sortable: true,
                        field: 'vendor_code',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    {
                        name: 'vendor_name',
                        required: true,
                        label: 'Vendor Name',
                        align: 'left',
                        sortable: true,
                        field: 'vendor_name',
                        headerStyle: 'text-align: center; min-width: 300px;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    {
                        name: 'remarks',
                        required: true,
                        label: 'Remarks',
                        align: 'left',
                        sortable: true,
                        field: 'remarks',
                        headerStyle: 'text-align: center; width: 1%;',
                        style: 'max-width: 250px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;',
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
                    // {
                    //     name: 'posted',
                    //     required: true,
                    //     label: 'Posted',
                    //     align: 'center',
                    //     sortable: true,
                    //     field: 'posted',
                    //     headerStyle: 'text-align: center; width: 1%;',
                    //     filter_type: 'input',
                    //     filter_options: [],
                    //     filter_value: '',
                    // },
                    // {
                    //     name: 'canceled',
                    //     required: true,
                    //     label: 'Canceled',
                    //     align: 'center',
                    //     sortable: true,
                    //     field: 'canceled',
                    //     headerStyle: 'text-align: center; width: 1%;',
                    //     filter_type: 'input',
                    //     filter_options: [],
                    //     filter_value: '',
                    // },
                    {
                        name: 'cancel_reason',
                        required: true,
                        label: 'Cancel Reason',
                        align: 'left',
                        sortable: true,
                        field: 'cancel_reason',
                        headerStyle: 'text-align: center;',
                        style: 'max-width: 250px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    {
                        name: 'isapprove',
                        required: true,
                        label: 'Approved',
                        align: 'center',
                        sortable: true,
                        field: 'isapprove',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    {
                        name: 'p2a_navision',
                        required: true,
                        label: 'P2A',
                        align: 'center',
                        sortable: true,
                        field: 'p2a_navision',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    {
                        name: 'lhdn_validated',
                        required: true,
                        label: 'LHDN Validated',
                        align: 'center',
                        sortable: true,
                        field: 'lhdn_validated',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    {
                        name: 'pip',
                        required: true,
                        label: 'PIP',
                        align: 'center',
                        sortable: true,
                        field: 'pip',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    {
                        name: 'pip_status',
                        required: true,
                        label: 'PIP Status',
                        align: 'center',
                        sortable: true,
                        field: 'pip_status',
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

            this.table_column = column;

            payload.params.search = this.search;

            payload.params.retailer_outlet_guid = this.outlet.length == this.options.outlet_list.length ? "" : this.outlet.join(',');

            payload.params.supplier_guid__in = this.vendor.length == this.options.supplier.length ? "" : this.vendor.join(',');

            payload.params.company_info_guid__in = this.company.length == this.options.company_list.length ? "" : this.company.join(',');

            if(this.status.includes('cancel'))
            {
                const cancel_index = this.status.indexOf('cancel');
                var array = JSON.parse(JSON.stringify(this.status));
                if (cancel_index > -1) {
                    array.splice(cancel_index, 1);
                }
                payload.params.posted__in = array.join(',');
                payload.params.canceled__in = this.status.includes("0") ? "0,1" :  1;
            }
            else
            {
                payload.params.canceled__in = this.status.includes("0") ? 0 : "";
                payload.params.posted__in = this.status.join(',');
            }
            
            if(payload.params.ordering == "")
            {
                payload.params.ordering = "-updated_at";
            }

            payload.params.doctype = this.transaction_type;

            var pass_obj = {
                "dispatch": 'transaction/trigger_get_cndn_list',
                "getter": 'transaction/get_cndn_note',
                "app": this,
                "payload": payload,
            };

            var cndn = await this.$dispatch(pass_obj);


            if(cndn.status)
            {
                var rows = cndn.response;
                for(var i in rows.data.results)
                {
                    if(rows.data.results[i].canceled != 1)
                    {
                        rows.data.results[i].select = false;
                    
                        rows.data.results[i].status = "Unposted";
                        if(rows.data.results[i].posted)
                        {
                            rows.data.results[i].status = "Posted";
                        }
                    }
                    else
                    {
                        rows.data.results[i].status = "Cancelled";
                    }

                    if(rows.data.results[i].outlet_code == null)
                    {
                        var outlet_code = rows.data.results[i].cndn_child.length>0 ? rows.data.results[i].cndn_child.map(entry=>entry.outlet_code) : [];
                        outlet_code = [...new Set(outlet_code)].join(', ');
                        rows.data.results[i].outlet_code = outlet_code;
                    }
                }
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
        handleSelectAll(newVal)
        {
            for (const index in this.table_data.data.results) {
                if(this.table_data.data.results[index].canceled != 1)
                {
                    this.table_data.data.results[index].select = newVal;
                }
            }
        },
        handleReceiveHandleEdit(row)
        {
            if(this.transaction_type == 'cn')
            {
                this.$router.push({name: 'editCN', query: { guid: row.row.cndn_guid}});
            }
            else if(this.transaction_type == 'dn')
            {
                this.$router.push({name: 'editDN', query: { guid: row.row.cndn_guid}});
            }            
        },
        handleReceivePrint(row)
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
        handleChangeSearch()
        {
            this.table_data = {
                data: {
                    results: [],
                }
            };
            this.forceLoading = true;
            this.table_function(this.ori_params);
        },
        handleCreate()
        {
            if(this.transaction_type == 'cn')
            {
                this.$router.push({name: 'createCN'});
            }
            else if(this.transaction_type == 'dn')
            {
                this.$router.push({name: 'createDN'});
            }
            
        },
        handleChangeCompany(newVal)
        {
            var company = this.dialog.company_options.find(entry=>entry.company_info_guid == newVal);
            this.dialog.invoice_options = company.options; 
        },
        handleChangeInvoices(newVal)
        {
            this.dialog.selectedInvoices = this.options.invoice_list.filter(entry=>newVal.includes(entry.invoice_guid)).map(entry=>entry.refno);
        },
        handleGenerate()
        {
            if(this.options.company_list.length<=0 || this.options.company_list.length<=0) return;

            this.dialog.invoices = [];
            this.dialog.selectedInvoices = [];
            this.dialog.company_options = this.options.company_list;
            this.dialog.company_options.map(entry=>{
                entry.options = this.options.invoice_list.filter(inv=>inv.company_info_guid == entry.company_info_guid && inv.posted==1 && inv.canceled==0);
            });
            this.dialog.company = this.dialog.company_options[0].value;
            this.dialog.invoice_options = this.dialog.company_options[0].options;
            // console.log(this.dialog.company_options)
            this.dialog.generate = true;
        },
        async handleGenerateCN()
        {
            if(this.dialog.invoices.length<=0)
            {
                this.showNotify('negative','Please select at least one invoice.');
                return;
            }

            var payload = {
                params: {
                    "invoice_guid__in": this.dialog.invoices.join(','),
                }
            }

            var pass_obj = {
                "dispatch": 'transaction/trigger_get_cndn_invoice_list',
                "getter": 'transaction/get_cndn_note',
                "app": this,
                "payload": payload,
            };

            var cndn = await this.$dispatch(pass_obj);

            if(!cndn.status)
            {
                this.showNotify('negative', "Credit note generation failed. Please try again.");
            }

            if(cndn.response.data.results.length > 0)
            {
                var message = "Do you confirm want to generate credit note? The following invoices already have credit note generated:";
                var existing_invoices = [...new Set(cndn.response.data.results.map(entry=>entry.invoice_guid))];
                var list = this.options.invoice_list.filter(entry=>existing_invoices.includes(entry.invoice_guid)).map(entry=>entry.refno);
                this.dialog.currentItem = {
                    message: message,
                    list: list,
                }
                this.dialog.alert = true;
                return;
            }
        },
        async generateCN()
        {
            this.dialog.loading = true;

            var payload = {
                pass_json: this.dialog.invoices.map(entry=>({invoice_guid:entry}))
            }

            var pass_obj = {
                "dispatch": 'transaction/trigger_generate_cndn',
                "getter": 'transaction/get_cndn_note',
                "app": this,
                "payload": payload,
            };

            var data_response = await this.$dispatch(pass_obj);

            if(!data_response.status)
            {
                console.log(data_response);
                const valid = this.isValidJSON(data_response.response);
                var message = 'Generate credit note failed.';
                if(valid)
                {
                    const response = JSON.parse(data_response.response);
                    var message = '';

                    if(response && response.errors)
                    {
                        for (const index in response.errors) {
                            message += response.errors[index]+"<br>";
                        }
                    }
                }
                else
                {
                    message = JSON.stringify(data_response.response);
                }
                this.showNotify('negative', message);
                this.dialog.loading = false;
                return
            }

            this.showNotify('positive','Credit note generated successfully.');
            this.table_function(this.ori_params);
            this.dialog.loading = false;
            this.dialog.alert = false;
            this.dialog.generate = false;
        },
        handleReceiveCancel(pass_payload)
        {
            this.currentItem = pass_payload.row;
            this.dialog.cancel = true;
        },
        handleCancel()
        {
            if(this.selectedRows.length<=0)
            {
                this.showNotify('negative','Please select at least one record.');
                return;
            }
            this.dialog.reason = "";
            this.dialog.cancel = true;
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

            var cndn_list = [];
            
            this.selectedRows.map(entry=>{
                const obj = {
                    "cndn_guid": entry.cndn_guid,
                    "cancel_reason": this.dialog.reason,
                }
                cndn_list.push(obj);
            })

            var payload = {
                pass_json: {
                    cndn: cndn_list,
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
                if(valid)
                {
                    const response = JSON.parse(data_response.response);
                    var message = response.message ? response.message : '';
                    var data_message = '';

                    if(response && response.data && response.data.errors)
                    {
                        for (const index in response.data.errors) {
                            data_message += "<br>"+response.data.errors[index];
                        }
                    }
                    message = message + data_message
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
            this.dialog.cancel = false;
            this.table_function(this.ori_params);
        },
        async handlePost()
        {
            if(this.selectedRows.length<=0)
            {
                this.showNotify('negative','Please select at least one record.');
                return;
            }
            this.dialog.post = true;
        },
        async postCNDN()
        {
            this.dialog.loading = true;

            var payload = {
                pass_json: {
                    "cndn_guids": this.selectedRows.map(entry=>entry.cndn_guid),
                }
            }

            var pass_obj = {
                "dispatch": 'transaction/trigger_post_cndn_bulk',
                "getter": 'transaction/get_cndn_note',
                "app": this,
                "payload": payload,
            };

            var data_response = await this.$dispatch(pass_obj);

            if(!data_response.status)
            {
                console.log(data_response);
                const valid = this.isValidJSON(data_response.response);
                var message = `Post ${this.transaction_type=='cn'?'credit note':'debit note'} failed.`;
                if(valid)
                {
                    const response = JSON.parse(data_response.response);
                    var message = '';

                    if(response && response.errors)
                    {
                        for (const index in response.errors) {
                            message += response.errors[index]+"<br>";
                        }
                    }
                }
                else
                {
                    message = JSON.stringify(data_response.response);
                }
                this.showNotify('negative', message);
                this.dialog.loading = false;
                return
            }

            this.showNotify('positive',`Post ${this.transaction_type=='cn'?'credit note':'debit note'} successfully.`);
            this.table_function(this.ori_params);
            this.dialog.loading = false;
            this.dialog.post = false;
        },
        handleReceiveReport()
        {
            this.currentItem.date_from = '';
            this.currentItem.date_to = '';
            this.dialog.report = true;
        },
        async handleReport()
        {
            this.dialogLoading = true;

            var payload = {
                params: {
                    'type': 'cndn',
                    'choice': this.transaction_type,
                    'date_from': this.currentItem.date_from,
                    'date_to': this.currentItem.date_to,
                }
            }

            var pass_obj = {
                "dispatch": "general/trigger_generate_report",
                "getter": 'general/get_results',
                "app": this,
                "payload": payload,
            }

            var data_response = await this.$dispatch(pass_obj);

            if(!data_response.status)
            {
                var message = `Generate ${this.transaction_type == 'cn' ? 'credit note' : 'debit note'} report failed. Please try again.`;
                const valid = this.isValidJSON(data_response.response);
                if(valid)
                {
                    const response = JSON.parse(data_response.response);
                    if(response.message)
                    {
                        var message = response.message;
                    }
                }
                else
                {
                    var message = data_response.response;
                }   
                this.showNotify('negative', message);
                this.dialogLoading = false;
                return;
            }

            var url = new URL(this.$global_config.url+"generate_report/");
            url.search = new URLSearchParams(payload.params).toString();

            var url = url.toString();
            var link = document.createElement('a');
            link.href = url;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            this.showNotify('positive',`Generate ${this.transaction_type == 'cn' ? 'credit note' : 'debit note'} report successfully.`);
            this.dialog.report = false;
            this.dialogLoading = false;
        },
        async getVendor()
        {
            if(this.options.supplier.length > 0) return;
            
            this.dialog.loading = true;

            // set options for supplier
            var payload = {
                params: {
                    "limit": "99999",
                    "ordering": "code",
                    "type__in": "S,P",
                }
            }

            var pass_obj = {
                "dispatch": 'general/trigger_get_supplier_list',
                "getter": 'general/get_supplier',
                "app": this,
                "payload": payload,
            }

            var sup_list = await this.$dispatch(pass_obj);

            if(sup_list.status)
            {
                var list = sup_list.response.data.results;
                list.forEach(element => {
                    element.value = element.supplier_guid;
                    element.label = `${element.code} - ${element.name}`;
                });
                this.options.supplier = list;
            }

            this.dialog.loading = false;
        },
        displayInvoices(invoices){
            const invoice_details = this.options.invoice_list.filter(entry=>invoices.includes(entry.invoice_guid));
            if(invoice_details.length>0)
            {
                return invoice_details.map(entry=>entry.refno).join(', ');
            }
            return "";
        },
        displayCompany(guid)
        {
            var company = this.options.company_list.find(entry=>entry.company_info_guid == guid)
            if(company)
            {
                return company.name;
            }
            return "";
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

.action_button
{
  font-size: 14px;
  background-color: #e37a05;
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