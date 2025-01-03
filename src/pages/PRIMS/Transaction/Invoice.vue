<template>
    <div class="row q-pa-md">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
            Invoice
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
                        v-model:pass_value="billing_type"
                        v-on:receiveChange="handleChangeSearch"
                        :componentBehavior="dbComponentBehavior.text"
                        label="Billing Type"
                        option_label="Types"
                        :options="options.billing_type"
                        :forceSelectAll="forceSelectAll"
                        :filled="true"
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
                        v-model:pass_value="pip_status"
                        v-on:receiveChange="handleChangeSearch"
                        :componentBehavior="dbComponentBehavior.text"
                        label="PIP Status"
                        option_label="Statuses"
                        :options="options.pip_status"
                        :forceSelectAll="forceSelectAll"
                        :filled="true"
                    />
                </div>

                <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-xs-12">
                    <Datepicker
                        :daterange="invoice_date"
                        :componentBehavior="dbComponentBehavior.text"
                        label="Invoice Date"
                        :filled="true"
                        @receiveChange="handleChangeDate"
                    />
                </div>

                <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-xs-12">
                    <MultipleSelect
                        v-model:pass_value="vendor"
                        v-on:receiveChange="handleChangeSearch"
                        :componentBehavior="dbComponentBehavior.text"
                        label="Vendor"
                        option_label="Statuses"
                        :options="options.supplier"
                        :forceSelectAll="forceSelectAll"
                        :filled="true"
                    />
                </div>
            </div>
            <div class="row justify-end">
                <Button v-on:receiveClick="handlePost"
                pass_label="Post"
                :pass_no_caps="true"
                :pass_square="true"
                :pass_dense="true"
                class="custom_button"
                />
                <Button v-on:receiveClick="handleCancel"
                pass_label="Cancel"
                :pass_no_caps="true"
                :pass_square="true"
                :pass_dense="true"
                class="custom_button"
                />
                <Button v-on:receiveClick="handleCreate"
                pass_label="Create"
                :pass_no_caps="true"
                :pass_square="true"
                :pass_dense="true"
                class="custom_button"
                />
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

                :allow_print="true"
                :allow_cancel="false"
                v-on:receiveHandleEdit="handleReceiveHandleEdit"
                v-on:receiveHandlePrint="handleReceivePrint"
                v-on:receiveHandleCancel="handleReceiveCancel"
                v-on:receiveSelectAll="handleSelectAll"

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

    <q-dialog v-model="dialog.post" persistent position="top">
        <q-card style="width: 864px; max-width: 98vw;text-align:center;margin-top: 5%;border-radius: 8px">

        <q-card-section class="theme_color row items-center" style="height:56px; padding: 8px 24px;border-bottom: 1px solid #a7bbcb;">
            <div class="confirm_title">Confirmation</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup/>
        </q-card-section>

        <q-card-section style="padding: 32px 24px">
            <span class="confirmation_line_font">Are you sure want to post these records?</span>
        </q-card-section>
        
        <q-card-section class="text-left q-py-sm q-mx-xl">
            <span>Selected Invoices:</span>
            <div style="border: 0.5px solid grey; max-height: 130px; overflow: auto;" class="q-pa-sm">
                <span v-for="(inv,index) of selectedRows" :key="index">{{index+1}} - {{inv.refno}}<br/></span>
            </div>
        </q-card-section>

        <q-card-actions align="right" style="padding-top:10px;padding-bottom:16px;padding-right:16px">
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
            <q-btn icon="close" flat round dense @click="closeDialog"/>
        </q-card-section>

        <q-card-section style="padding: 32px 24px;" class="row justify-center">
            <span class="col-12">Are you sure want to cancel this record?</span>
        </q-card-section>
        
        <q-card-section class="text-left q-py-sm q-mx-xl">
            <Label pass_value="Selected Invoices:"/>
            <div style="border: 0.5px solid grey; max-height: 130px; overflow: auto;" class="q-pa-sm q-mb-md">
                <span v-for="(inv,index) of selectedRows" :key="index">{{index+1}} - {{inv.refno}}<br/></span>
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

        <q-card-actions align="right" style="padding-top:0px;padding-bottom:16px;padding-right:16px">
            <q-btn flat label="Cancel" font_color="#29292A" color="#29292A" size="12px" class="dialog_confirm_cancel_button" @click="closeDialog"/>
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
import Button from 'src/components/PRIMS/Main/Button';
import Label from 'src/components/PRIMS/Main/Label'
import Textarea from 'src/components/PRIMS/Base/TextareaBase'
import Datepicker from 'src/components/PRIMS/Main/Datepicker';
import MultipleSelect from 'src/components/PRIMS/Main/MultipleSelect';
import Input from 'src/components/PRIMS/Main/Input';
import Table from 'src/components/PRIMS/Main/Table.vue';
import { Notify } from "quasar";

export default {
    components: {
        Input,
        Label,
        Textarea,
        Datepicker,
        MultipleSelect,
        Button,
        Table,
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
            search: "",
            invoice_date: "",
            vendor: [],
            billing_type: [],
            status: [],
            pip_status: [],
            options: {
                supplier: [],
                company: [],
                billing_type: [{label: 'Auto',value: 'Auto'},{label: 'Manual',value: 'Manual'}],
                status: [{label: 'Posted',value: '1'},{label: 'Unposted',value: '0'},{label: 'Cancelled',value: 'cancel'}],
                pip_status: [{label: 'Submitted',value: 'submitted'},{label: 'Unsubmitted',value: 'unsubmitted'},{label: 'Valid',value: 'valid'},{label: 'Completed',value: 'completed'},{label: 'Error',value: 'error'}],
            },
            table_column: [],
            table_data: [],
            visibleColumns: [],
            rearrange_column: [],
            ori_params: {},
            filter_mode_on: false,
            forceLoading: false,
            forceSelectAll: false,
            currentItem: {},
            dialog: {
                post: false,
                loading: false,
                reason: "",
            }
        }
    },
    async mounted(){
        // set options for supplier
        var payload = {
            params: {
                "limit": "99999",
                "ordering": "code",
                "type": "P",
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

        // get company list
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
                array_options.push(company.response.data.results[i]);
            }
            this.options.company = array_options;
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
                        headerStyle: 'text-align: center;',
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
                        name: 'tta_refno',
                        required: true,
                        label: 'TTA Ref No',
                        align: 'center',
                        sortable: true,
                        field: 'tta_refno',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    {
                        name: 'billing_type',
                        required: true,
                        label: 'Billing Type',
                        align: 'center',
                        sortable: true,
                        field: 'billing_type',
                        headerStyle: 'text-align: center; width: 1%;',
                        style: 'text-capitalize',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    {
                        name: 'date',
                        required: true,
                        label: 'Invoice Date',
                        align: 'center',
                        sortable: true,
                        field: 'date',
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
                        headerStyle: 'text-align: center; min-width: 200px;',
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
                        headerStyle: 'text-align: left;',
                        style: 'max-width: 400px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;',
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
                        name: 'posted',
                        required: true,
                        label: 'Posted',
                        align: 'center',
                        sortable: true,
                        field: 'posted',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    {
                        name: 'canceled',
                        required: true,
                        label: 'Canceled',
                        align: 'center',
                        sortable: true,
                        field: 'canceled',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
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

            payload.params.date = this.invoice_date;

            payload.params.supplier_guid__in = this.vendor.length == this.options.supplier.length ? "" : this.vendor.join(',');

            payload.params.billing_type_filter = this.billing_type.length == this.options.billing_type.length ? "" : this.billing_type.join(',');

            if(payload.params.ordering == "")
            {
                payload.params.ordering = "-updated_at";
            }

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
                      

            var pip_status_string = '';
            for (const index in this.pip_status) {
                if(this.pip_status[index] == 'unsubmitted')
                {
                    pip_status_string += 'null,false,';
                }
                else
                {
                    pip_status_string += this.pip_status[index]+',';
                }         
            }
            payload.params.pip_status_filter = pip_status_string.replace(/,\s*$/, "");

            if(payload.params.pip__in && payload.params.pip_status__in != '')
            {
                payload.params.pip__in = '1,0';
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
                console.log(invoice_list)
                var rows = invoice_list.response;
                for(var i in rows.data.results)
                {
                    if(rows.data.results[i].canceled != 1)
                    {
                        rows.data.results[i].select = false;
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
        handleReceivePrint(row){
            this.$router.push({name: 'printInvoice',query:{invoice_guid: row.row.invoice_guid}});
        },
        handleReceiveHandleEdit(row)
        {
            this.$router.push({name: 'editInvoice', query: { guid: row.row.invoice_guid}});
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
        handleReceiveCancel(row){
            this.dialog.cancel = true;
            this.currentItem = row.row;
        },
        handleCancel(){
            if(this.selectedRows.length<=0)
            {
                this.showNotify('negative','Please select at least one record.');
                return;
            }
            this.dialog.cancel = true;
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

            var invoice_list = [];
            
            this.selectedRows.map(entry=>{
                const obj = {
                    "invoice_guid": entry.invoice_guid,
                    "cancel_reason": this.dialog.reason,
                }
                invoice_list.push(obj);
            })

            var payload = {
                pass_json: {
                    invoices: invoice_list
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
        async postInvoice()
        {
            this.dialog.loading = true;

            console.log(this.selectedRows);
            var payload = {
                pass_json: {
                    "invoices": this.selectedRows.map(entry=>entry.invoice_guid),
                }
            }
            console.log(payload);

            var pass_obj = {
                "dispatch": 'transaction/trigger_post_invoice_bulk',
                "getter": 'transaction/get_invoice',
                "app": this,
                "payload": payload,
            };

            var data_response = await this.$dispatch(pass_obj);

            if(!data_response.status)
            {
                console.log(data_response);
                const valid = this.isValidJSON(data_response.response);
                var message = 'Post invoice failed.';
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

            console.log(data_response);
            this.showNotify('positive','Post invoice successfully.');
            this.table_function(this.ori_params);
            this.dialog.loading = false;
            this.dialog.post = false;
        },
        handleCreate()
        {
            this.$router.push({name: 'createInvoice'});
        },
        handleChangeSearch()
        {
            this.$nextTick(()=>{
                this.forceLoading = true;
                this.table_function(this.ori_params);
            })            
        },
        handleChangeDate(newVal)
        {
            this.invoice_date = newVal;
            this.forceLoading = true;
            this.table_function(this.ori_params);
        },
        closeDialog()
        {
            this.currentItem = {};
            this.dialog.reason = "";
            this.dialog.cancel = false;
        },
        displayCompany(guid)
        {
            var company = this.options.company.find(entry=>entry.company_info_guid == guid)
            if(company)
            {
                console.log(company)
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

.q-field >>> .q-field__bottom {
    padding: 0px 0px !important;
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

.confirm_cancel_button {
    padding: 16px;
    justify-content: center;
    align-items: center;
    font-size: 16px !important;
    font-style: normal;
    font-weight: 700;
    font-family: InterfontBold;
    border: 2px solid #1E90FF;
    border-radius: 8px;
    box-shadow: 0px 1px 3.6px 0px rgba(0, 0, 0, 0.25);
    width: 112px;
    height: 48px;
}
</style>