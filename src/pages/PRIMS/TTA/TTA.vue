<template>
    <div class="row q-pa-md">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
            Trading Term Agreement
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
                        
                        <MultiSelect
                            v-model:pass_value="status"
                            v-on:receiveChange="handleChangeSearch"
                            :componentBehavior="dbComponentBehavior.text"
                            label="Status"
                            option_label="Statuses"
                            :options="status_options"
                            :forceSelectAll="forceSelectAll"
                            :filled="true"
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

                :allow_print_tta="true"
                :allow_history="true"
                :allow_upload="permission.includes('uploaded')"
                :allow_action="permission.includes('authorised') || permission.includes('approved') || permission.includes('renewed') || permission.includes('rejected') || permission.includes('terminated') ? true : false"
                v-on:receiveHandleEdit="handleReceiveHandleEdit"
                v-on:receiveHandleHistory="handleReceiveHandleHistory"
                v-on:receiveHandleUpload="handleReceiveUpload"
                v-on:receiveHandleRenewal="handleReceiveRenewal"
                v-on:receiveHandlePrint="handleReceivePrint"
                v-on:receiveHandleReject="handleReceiveReject"
                v-on:receiveHandleApprove="handleReceiveApprove"
                v-on:receiveHandleAuthorise="handleReceiveAuthorise"
                v-on:receiveHandleTerminate="handleReceiveTerminate"

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

    <q-inner-loading
        :showing="loading"
        color="primary"
    />

    <q-dialog v-model="dialog.renewal" persistent position="top">
        <q-card style="width: 864px; max-width: 98vw;text-align:center;margin-top: 5%;border-radius: 8px">

        <q-card-section class="theme_color row items-center" style="height:56px; padding: 8px 24px;border-bottom: 1px solid #a7bbcb;">
            <div class="confirm_title">Renew TTA: {{currentItem.refno}}</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup/>
        </q-card-section>

        <q-card-section class="text-left" style="padding: 32px 24px">
            <div style="width:70%" class="q-gutter-md">
                <LabelDatepicker label="Effective Date From" :daterange="dialog.date_from" v-on:receiveChange="handleChangeStartDate" :dbComponentBehavior="dbComponentBehavior.date"/>
                <LabelDatepicker label="Effective Date To" :daterange="dialog.date_to" v-on:receiveChange="handleChangeEndDate" :dbComponentBehavior="dbComponentBehavior.date"/>
            </div>
        </q-card-section>

        <q-card-actions align="right" style="padding-top:0px;padding-bottom:16px;padding-right:16px">
            <q-btn flat label="Cancel" font_color="#29292A" color="#29292A" v-close-popup size="12px" class="dialog_confirm_cancel_button"/>
            <q-btn flat label="RENEW" font_color="white" color="'#D81111'" size="12px" class="primary_actions_button" @click="handleRenewal" />
        </q-card-actions>

        <q-inner-loading
            :showing="dialogLoading"
            color="primary"
        />
        </q-card>
    </q-dialog>

    <q-dialog v-model="dialog.approve" persistent position="top">
        <q-card style="width: 864px; max-width: 98vw;text-align:center;margin-top: 5%;border-radius: 8px">

        <q-card-section class="theme_color row items-center" style="height:56px; padding: 8px 24px;border-bottom: 1px solid #a7bbcb;">
            <div class="confirm_title">Confirmation</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup/>
        </q-card-section>

        <q-card-section style="padding: 32px 24px">
            <span class="confirmation_line_font">Do you want to approve this TTA {{currentItem.refno}}?</span>
        </q-card-section>

        <q-card-actions align="right" style="padding-top:0px;padding-bottom:16px;padding-right:16px">
            <q-btn flat label="Cancel" font_color="#29292A" color="#29292A" v-close-popup size="12px" class="dialog_confirm_cancel_button"/>
            <q-btn flat label="Confirm" font_color="white" color="'#D81111'" size="12px" class="primary_actions_button" @click="handleApprove" />
        </q-card-actions>

        <q-inner-loading
            :showing="dialogLoading"
            color="primary"
        />
        </q-card>
    </q-dialog>

    <q-dialog v-model="dialog.authorise" persistent position="top">
        <q-card style="width: 864px; max-width: 98vw;text-align:center;margin-top: 5%;border-radius: 8px">

        <q-card-section class="theme_color row items-center" style="height:56px; padding: 8px 24px;border-bottom: 1px solid #a7bbcb;">
            <div class="confirm_title">Confirmation</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup/>
        </q-card-section>

        <q-card-section style="padding: 32px 24px">
            <span class="confirmation_line_font">Do you want to authorise this TTA {{currentItem.refno}}?</span>
        </q-card-section>

        <q-card-actions align="right" style="padding-top:0px;padding-bottom:16px;padding-right:16px">
            <q-btn flat label="Cancel" font_color="#29292A" color="#29292A" v-close-popup size="12px" class="dialog_confirm_cancel_button"/>
            <q-btn flat label="Confirm" font_color="white" color="'#D81111'" size="12px" class="primary_actions_button" @click="handleAuthorise" />
        </q-card-actions>

        <q-inner-loading
            :showing="dialogLoading"
            color="primary"
        />
        </q-card>
    </q-dialog>

    <q-dialog v-model="dialog.reject" persistent position="top">
        <q-card style="width: 864px; max-width: 98vw;text-align:center;margin-top: 5%;border-radius: 8px">

        <q-card-section class="theme_color row items-center" style="height:56px; padding: 8px 24px;border-bottom: 1px solid #a7bbcb;">
            <div class="confirm_title">Confirmation</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup/>
        </q-card-section>

        <q-card-section style="padding: 32px 24px">
            <span class="confirmation_line_font">Do you want to reject this TTA {{currentItem.refno}}?</span>
        </q-card-section>

        <q-card-actions align="right" style="padding-top:0px;padding-bottom:16px;padding-right:16px">
            <q-btn flat label="Cancel" font_color="#29292A" color="#29292A" v-close-popup size="12px" class="dialog_confirm_cancel_button"/>
            <q-btn flat label="Confirm" font_color="white" color="'#D81111'" size="12px" class="dialog_confirm_delete_button" @click="handleReject" />
        </q-card-actions>

        <q-inner-loading
            :showing="dialogLoading"
            color="primary"
        />
        </q-card>
    </q-dialog>

    <q-dialog v-model="dialog.terminate" persistent position="top">
        <q-card style="width: 864px; max-width: 98vw;text-align:center;margin-top: 5%;border-radius: 8px">

        <q-card-section class="theme_color row items-center" style="height:56px; padding: 8px 24px;border-bottom: 1px solid #a7bbcb;">
            <div class="confirm_title">Confirmation</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup/>
        </q-card-section>

        <q-card-section style="padding: 32px 24px">
            <span class="confirmation_line_font">Do you want to terminate this TTA {{currentItem.refno}}?</span>
        </q-card-section>

        <q-card-actions align="right" style="padding-top:0px;padding-bottom:16px;padding-right:16px">
            <q-btn flat label="Cancel" font_color="#29292A" color="#29292A" v-close-popup size="12px" class="dialog_confirm_cancel_button"/>
            <q-btn flat label="Confirm" font_color="white" color="'#D81111'" size="12px" class="dialog_confirm_delete_button" @click="handleTerminate" />
        </q-card-actions>

        <q-inner-loading
            :showing="dialogLoading"
            color="primary"
        />
        </q-card>
    </q-dialog>

    <q-dialog v-model="dialog.history" persistent position="top">
        <q-card style="width: 1000px; max-width: 120vw;text-align:center;margin-top: 5%;border-radius: 8px">

        <q-card-section class="theme_color row items-center" style="height:56px; padding: 8px 24px;border-bottom: 1px solid #a7bbcb;">
            <div class="confirm_title">History : {{currentItem.refno}}</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup/>
        </q-card-section>

        <q-card-section style="padding: 32px 24px">
            <div class="row">
                <Table
                    :row_per_page="[10,50,100,1000]"
                    :table_data="dialog.table_data"
                    :table_column="dialog.table_column"
                    :flat_status="true"
                    :bordered_status="true"
                    v-on:receiveRequestTable="handleTableChangeHistory"

                    :filter_mode_on="filter_mode_on"
                    v-on:receiveColumnRearrange="handleColumnRearrangeDialog"
                    :forceLoading="forceLoading"
                    :column_reordering="true"
                    :row_reordering="false"

                    :pass_visible_columns="[]"
                />
            </div>
        </q-card-section>

        <q-card-actions align="right" style="padding-top:0px;padding-bottom:16px;padding-right:16px">
            <q-btn flat label="Close" font_color="#29292A" color="#29292A" v-close-popup size="12px" class="dialog_confirm_cancel_button"/>
        </q-card-actions>

        <q-inner-loading
            :showing="dialogLoading"
            color="primary"
        />
        </q-card>
    </q-dialog>

    <q-dialog v-model="dialog.upload" persistent position="top">
        <q-card style="width: 864px; max-width: 98vw;text-align:center;margin-top: 5%;border-radius: 8px">

        <q-card-section class="theme_color row items-center" style="height:56px; padding: 8px 24px;border-bottom: 1px solid #a7bbcb;">
            <div class="confirm_title">Upload TTA: {{currentItem.refno}}</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup/>
        </q-card-section>

        <q-card-section class="text-left" style="padding: 32px 24px">
            <q-uploader
                ref="uploader"
                style="width:100%;"
                hide-upload-btn
                accept=".pdf"
                multiple
                @added="handleFileUpload"
                >
                <template v-slot:header="scope">
                    <div class="row no-wrap items-center justify-between q-pa-sm q-gutter-xs">
                        <div v-if="scope.queuedFiles.length > 0" class="col" align="left">
                            <q-btn icon="clear_all" @click="scope.removeQueuedFiles" round dense flat>
                                <q-tooltip>Clear All</q-tooltip>
                            </q-btn>
                        </div>
                        <div v-if="scope.canAddFiles" class="col" align="right">
                            <q-btn type="a" icon="add_box" @click="scope.pickFiles" round dense flat>
                                <q-uploader-add-trigger />
                                <q-tooltip>Pick Files</q-tooltip>
                            </q-btn>
                        </div>
                    </div>
                </template>
            </q-uploader>
        </q-card-section>

        <!-- <q-card-section class="text-left q-gutter-sm" style="padding: 32px 24px">
            <Label pass_value="Files:"/>
            <q-list v-if="currentItem.files.length>0" bordered>
                <q-item v-for="data in currentItem.files" :key="data" clickable v-ripple>
                    <q-item-section>{{data.filename}}</q-item-section>
                    <q-item-section avatar>
                        <q-icon color="red" name="delete" @click="removeFile(data.tta_upload_guid)"/>
                    </q-item-section>
                </q-item>
            </q-list>
            <q-list v-else bordered>
                <q-item clickable v-ripple>
                    <q-item-section>No file uploaded.</q-item-section>
                </q-item>
            </q-list>
        </q-card-section> -->

        <q-card-actions align="right" style="padding-top:0px;padding-bottom:16px;padding-right:16px">
            <q-btn flat label="Cancel" font_color="#29292A" color="#29292A" v-close-popup size="12px" class="dialog_confirm_cancel_button"/>
            <q-btn flat label="UPLOAD" font_color="white" color="'#D81111'" size="12px" class="primary_actions_button" @click="handleUpload" />
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
import MultiSelect from 'src/components/PRIMS/Main/MultipleSelect';
import Input from 'src/components/PRIMS/Main/Input';
import Table from 'src/components/PRIMS/Main/Table.vue';
import Label from 'src/components/PRIMS/Main/Label.vue';
import LabelDatepicker from 'src/components/PRIMS/General/LabelDatepicker';
import { Notify } from "quasar";

export default {
    components: {
        Button,
        MultiSelect,
        Input,
        Table,
        Label,
        LabelDatepicker,
    },
    data(){
        return {
            search: "",
            username: localStorage.getItem("username") != "" && localStorage.getItem("username") != "null" && localStorage.getItem("username") != null ? localStorage.getItem("username") : "",
            user_info_guid: localStorage.getItem("user_info_guid") != "" && localStorage.getItem("user_info_guid") != "null" && localStorage.getItem("user_info_guid") != null ? localStorage.getItem("user_info_guid") : "",
            company_guid: localStorage.getItem("company_guid") != "" && localStorage.getItem("company_guid") != "null" && localStorage.getItem("company_guid") != null ? localStorage.getItem("company_guid") : "",
            permission: localStorage.getItem("permission") != "" && localStorage.getItem("permission") != "null" && localStorage.getItem("permission") != null ? localStorage.getItem("permission") : "",
            table_column: [],
            table_data: [],
            ori_params: {},
            visibleColumns: [],
            rearrange_column: [],
            status: [],
            status_options: [{label:"Pending",value:'pending'},{label:"Revision",value:'revision'},{label:"Authorised",value:'authorised'},{label:"Approved",value:'approved'},
                            {label:"Renewed",value:'renewed'},{label: "Rejected", value: 'rejected'},{label: "Terminated", value: 'terminated'}],
            currentItem: {},
            dialog: {
                renewal: false,
                reject: false,  
                approve: false,
                authorise: false,
                terminate: false,
                history: false,
                upload: false,
                date_from: "",
                date_to: "",
                guid: "",
                table_data: [],
                table_column: [],
                rearrange_column: [],
                ori_params: {},
                files: [],
            },
            forceSelectAll: false,
            filter_mode_on: false,
            forceLoading: false,
            loading: false,
            dialogLoading: false,
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
                        format_child: '',
                        tooltip: '',
                        headerStyle: 'text-align: center;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                        main_column: false,
                        main_column_name: '',
                        index: '',
                        colspan: '',
                        colspan_name: '',
                        start_index: '',
                        end_index: '',
                        rowspan: '0',
                    },
                    {
                        name: 'agreement_status',
                        required: true,
                        label: 'Status',
                        align: 'center',
                        sortable: true,
                        field: 'agreement_status',
                        format_child: '',
                        tooltip: '',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                        main_column: false,
                        main_column_name: '',
                        index: '',
                        colspan: '',
                        colspan_name: '',
                        start_index: '',
                        end_index: '',
                        rowspan: '0',
                    },
                    {
                        name: 'refno',
                        required: true,
                        label: 'Ref No',
                        align: 'center',
                        sortable: true,
                        field: 'refno',
                        format_child: '',
                        tooltip: '',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                        main_column: false,
                        main_column_name: '',
                        index: '',
                        colspan: '',
                        colspan_name: '',
                        start_index: '',
                        end_index: '',
                        rowspan: '0',
                    },
                    {
                        name: 'supplier_ref',
                        required: true,
                        label: 'Supplier',
                        align: 'left',
                        sortable: true,
                        field: 'supplier_ref',
                        format_child: '',
                        tooltip: '',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                        main_column: false,
                        main_column_name: '',
                        index: '',
                        colspan: '',
                        colspan_name: '',
                        start_index: '',
                        end_index: '',
                        rowspan: '0',
                    },
                    {
                        name: 'effective_date_from',
                        required: true,
                        label: 'Period From',
                        align: 'center',
                        sortable: true,
                        field: 'effective_date_from',
                        format_child: '',
                        tooltip: '',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                        main_column: false,
                        main_column_name: '',
                        index: '',
                        colspan: '',
                        colspan_name: '',
                        start_index: '',
                        end_index: '',
                        rowspan: '0',
                    },
                    {
                        name: 'effective_date_to',
                        required: true,
                        label: 'Period To',
                        align: 'center',
                        sortable: true,
                        field: 'effective_date_to',
                        format_child: '',
                        tooltip: '',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                        main_column: false,
                        main_column_name: '',
                        index: '',
                        colspan: '',
                        colspan_name: '',
                        start_index: '',
                        end_index: '',
                        rowspan: '0',
                    },
                    {
                        name: 'issued_by',
                        required: true,
                        label: 'Issue By',
                        align: 'center',
                        sortable: true,
                        field: 'issued_by',
                        format_child: '',
                        tooltip: '',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                        main_column: false,
                        main_column_name: '',
                        index: '',
                        colspan: '',
                        colspan_name: '',
                        start_index: '',
                        end_index: '',
                        rowspan: '0',
                    },
                    {
                        name: 'authorised_by',
                        required: true,
                        label: 'Authorised By',
                        align: 'center',
                        sortable: true,
                        field: 'authorised_by',
                        format_child: '',
                        tooltip: '',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                        main_column: false,
                        main_column_name: '',
                        index: '',
                        colspan: '',
                        colspan_name: '',
                        start_index: '',
                        end_index: '',
                        rowspan: '0',
                    },
                    {
                        name: 'approve_by',
                        required: true,
                        label: 'Approved By',
                        align: 'center',
                        sortable: true,
                        field: 'approve_by',
                        format_child: '',
                        tooltip: '',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                        main_column: false,
                        main_column_name: '',
                        index: '',
                        colspan: '',
                        colspan_name: '',
                        start_index: '',
                        end_index: '',
                        rowspan: '0',
                    },
                    {
                        name: 'supplier_pic_name',
                        required: true,
                        label: 'Supplier PIC',
                        align: 'center',
                        sortable: true,
                        field: 'supplier_pic_name',
                        format_child: '',
                        tooltip: '',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                        main_column: false,
                        main_column_name: '',
                        index: '',
                        colspan: '',
                        colspan_name: '',
                        start_index: '',
                        end_index: '',
                        rowspan: '0',
                    },
                    {
                        name: 'supplier_pic_designation',
                        required: true,
                        label: 'Designation',
                        align: 'center',
                        sortable: true,
                        field: 'supplier_pic_designation',
                        format_child: '',
                        tooltip: '',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                        main_column: false,
                        main_column_name: '',
                        index: '',
                        colspan: '',
                        colspan_name: '',
                        start_index: '',
                        end_index: '',
                        rowspan: '0',
                    },
                    {
                        name: 'remarks',
                        required: true,
                        label: 'Remarks',
                        align: 'left',
                        sortable: true,
                        field: 'remarks',
                        format_child: '',
                        tooltip: '',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                        main_column: false,
                        main_column_name: '',
                        index: '',
                        colspan: '',
                        colspan_name: '',
                        start_index: '',
                        end_index: '',
                        rowspan: '0',
                    },
                    {
                        name: 'created_by',
                        required: true,
                        label: 'Created By',
                        align: 'center',
                        sortable: true,
                        field: 'created_by',
                        format_child: '',
                        tooltip: '',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                        main_column: false,
                        main_column_name: '',
                        index: '',
                        colspan: '',
                        colspan_name: '',
                        start_index: '',
                        end_index: '',
                        rowspan: '0',
                    },
                    {
                        name: 'created_at',
                        required: true,
                        label: 'Created At',
                        align: 'center',
                        sortable: true,
                        field: 'created_at',
                        format_child: '',
                        tooltip: '',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                        main_column: false,
                        main_column_name: '',
                        index: '',
                        colspan: '',
                        colspan_name: '',
                        start_index: '',
                        end_index: '',
                        rowspan: '0',
                    },
                    {
                        name: 'updated_by',
                        required: true,
                        label: 'Updated By',
                        align: 'center',
                        sortable: true,
                        field: 'updated_by',
                        format_child: '',
                        tooltip: '',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                        main_column: false,
                        main_column_name: '',
                        index: '',
                        colspan: '',
                        colspan_name: '',
                        start_index: '',
                        end_index: '',
                        rowspan: '0',
                    },
                    {
                        name: 'updated_at',
                        required: true,
                        label: 'Updated At',
                        align: 'center',
                        sortable: true,
                        field: 'updated_at',
                        format_child: '',
                        tooltip: '',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                        main_column: false,
                        main_column_name: '',
                        index: '',
                        colspan: '',
                        colspan_name: '',
                        start_index: '',
                        end_index: '',
                        rowspan: '0',
                    },
                ];
            }

            this.table_column = column;

            payload.params.search = this.search;

            payload.params.agreement_status__in = this.status.join(',');

            if(payload.params.ordering == "")
            {
                payload.params.ordering = "-updated_at";
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
                var rows = tta_list.response;
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
        handleTableChangeHistory(newVal)
        {
            var new_params = this.$pluginsTableParams(newVal)

            var payload = {
                params : new_params
            };

            this.dialog.ori_params = payload;

            this.table_function_history(payload);
        },
        async table_function_history(payload)
        {
            this.dialogLoading = true;

            if(this.rearrange_column.length > 0)
            {
                var column = this.dialog.rearrange_column;
            }
            else
            {
                var column = [
                    {
                        name: 'date_time',
                        required: true,
                        label: 'Date Time',
                        align: 'center',
                        sortable: true,
                        field: 'date_time',
                        format_child: '',
                        tooltip: '',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                        main_column: false,
                        main_column_name: '',
                        index: '',
                        colspan: '',
                        colspan_name: '',
                        start_index: '',
                        end_index: '',
                        rowspan: '0',
                    },
                    {
                        name: 'username',
                        required: true,
                        label: 'User',
                        align: 'center',
                        sortable: true,
                        field: 'username',
                        format_child: '',
                        tooltip: '',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                        main_column: false,
                        main_column_name: '',
                        index: '',
                        colspan: '',
                        colspan_name: '',
                        start_index: '',
                        end_index: '',
                        rowspan: '0',
                    },
                    {
                        name: 'changes_action',
                        required: true,
                        label: 'Action',
                        align: 'left',
                        sortable: true,
                        field: 'changes_action',
                        format_child: '',
                        tooltip: '',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                        main_column: false,
                        main_column_name: '',
                        index: '',
                        colspan: '',
                        colspan_name: '',
                        start_index: '',
                        end_index: '',
                        rowspan: '0',
                    },
                    {
                        name: 'description',
                        required: true,
                        label: 'Details',
                        align: 'left',
                        sortable: true,
                        field: 'description',
                        format_child: '',
                        tooltip: '',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                        main_column: false,
                        main_column_name: '',
                        index: '',
                        colspan: '',
                        colspan_name: '',
                        start_index: '',
                        end_index: '',
                        rowspan: '0',
                    },
                ];
            }

            this.dialog.table_column = column;

            if(payload.params.ordering == "")
            {
                payload.params.ordering = "-date_time";
            }
            
            payload.params.tta_guid = this.currentItem.tta_guid;

            var pass_object = {
                "dispatch": 'tta/trigger_get_tta_history_list',
                "getter": 'tta/get_history',
                "app": this,
                "payload": payload,
            }

            var history = await this.$dispatch(pass_object);

            if(history.status)
            {
                var rows = history.response;
                for(var i in rows.data.results)
                {
                    rows.data.results[i].changes_action = rows.data.results[i].action;
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

            this.dialog.table_data = rows;
            
            this.dialogLoading = false;
        },
        handleColumnRearrangeDialog(pass_payload)
        {
            this.dialog.rearrange_column = pass_payload;
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
            this.$router.push({name: 'editTTA', query: { guid: row.row.tta_guid}});
        },
        handleReceiveHandleHistory(data)
        {
            this.loading = true;
            this.currentItem = data.row;
            this.dialog.history = true;
            this.loading = false;
        },
        async handleReceiveUpload(data)
        {
            // var payload = {
            //     params: {
            //         "tta_guid": data.row.tta_guid,
            //     }
            // };

            // var pass_obj = {
            //     "dispatch": 'tta/trigger_get_tta_upload_list',
            //     "getter": 'tta/get_upload',
            //     "app": this,
            //     "payload": payload,
            // };

            // var data_response = await this.$dispatch(pass_obj);

            // if(!data_response.status)
            // {
            //     this.showNotify('negative', 'Cannot retrieve uploaded files.');
            //     return;
            // }

            // for(const row of data_response.response.data.results)
            // {
            //     var url = row.file;
            //     var filename = url.split('/').pop();
            //     row.filename = filename;
            // }

            this.currentItem = data.row;
            // this.currentItem.files = data_response.response.data.results;
            this.dialog.upload = true;
        },
        async handleUpload()
        {
            this.dialog.loading = true;
            
            if(this.dialog.files.length <= 0)
            {
                this.showNotify("negative","No file chosen.");
                this.dialog.loading = false;
                return;
            }

            for(const file of this.dialog.files)
            {
                var formData = new FormData();
                formData.append("file", file);
                formData.append("tta_guid", this.currentItem.tta_guid);

                var payload = {
                    pass_json: formData,
                };

                console.log("payload",payload)

                var pass_obj = {
                    "dispatch": 'tta/trigger_create_tta_upload',
                    "getter": 'tta/get_upload',
                    "app": this,
                    "payload": payload,
                };

                var data_response = await this.$dispatch(pass_obj);

                if(!data_response.status)
                {
                    this.showNotify('positive','Upload files failed. Try again.');
                    console.log(data_response.response);
                    this.dialog.loading = false;
                    return;
                }
            }

            this.showNotify('positive','Upload files successfully.');
            this.dialog.loading = false;
            this.dialog.upload = false;
            this.table_function(this.ori_params);            
        },
        handleFileUpload(files)
        {
            console.log(files)
            this.dialog.files = files;
        },
        handleReceiveRenewal(data)
        {
            this.currentItem = data.row;
            this.dialog.renewal = true;
        },
        async handleRenewal()
        {
            this.dialogLoading = true;

            if(this.dialog.date_from == "")
            {
                this.showNotify('negative','Please choose effective start date.');
                this.dialogLoading = false;
                return;
            }

            if(this.dialog.date_to == "")
            {
                this.showNotify('negative','Please choose effective end date.');
                this.dialogLoading = false;
                return;
            }

            // if(this.dialog.date_from < this.currentItem.effective_date_to)
            // {
            //     this.showNotify('negative','Please ensure new effective start date later than previous effective end date.');
            //     this.dialogLoading = false;
            //     return;
            // }

            if(this.dialog.date_from > this.dialog.date_to)
            {
                this.showNotify('negative','Please ensure effective start date later than effective end date.');
                this.dialogLoading = false;
                return;
            }

            var payload = {
                tta_guid: this.currentItem.tta_guid,
                pass_json: {
                    "updated_by": this.username,
                    "created_by": this.username,
                    "renewed": 1,
                }
            }

            var pass_obj = {
                "dispatch": 'tta/trigger_update_tta',
                "getter": 'tta/get_tta',
                "app": this,
                "payload": payload,
            }

            var response = await this.$dispatch(pass_obj);

            if(response.status)
            {
                var payload = {
                    tta_guid: response.response.new_tta_guid,
                    pass_json: {
                        "effective_date_from":this.dialog.date_from,
                        "effective_date_to":this.dialog.date_to,
                    }
                }

                var pass_obj = {
                    "dispatch": 'tta/trigger_update_tta',
                    "getter": 'tta/get_tta',
                    "app": this,
                    "payload": payload,
                }

                var data_response = await this.$dispatch(pass_obj);
                
                if(!data_response.status)
                {
                    console.log(data_response)
                    var message = 'Update TTA effective date fail.';
                    const valid = this.isValidJSON(data_response.response);
                    if(valid)
                    {
                        const response = JSON.parse(data_response.response);
                        if(response.detail)
                        {
                            var message = response.detail;
                        }
                        else if(response.error)
                        {
                            var message = response.error;
                            if(response.details)
                            {
                                message = message + "<br/>" + response.details;
                            }
                        }
                        else if(!response.error && !response.detail)
                        {
                            var message = JSON.stringify(response)
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

                this.dialog.renewal = false;
                this.table_function(this.ori_params);
                this.showNotify('positive','Renew TTA successfully.');
            }
            else
            {
                var message = 'Renew TTA fail.';
                const valid = this.isValidJSON(data_response.response);
                if(valid)
                {
                    const response = JSON.parse(data_response.response);
                    if(response.error)
                    {
                        var message = response.error;
                    }
                    
                    if(response.details)
                    {
                        message = message + "<br/>" + response.details;
                    }
                    else
                    {
                        var message = JSON.stringify(response)
                    }
                }
                else
                {
                    var message = data_response.response;
                }   
                this.showNotify('negative', message);
                console.log(response)
            }

            this.dialogLoading = false;
        },
        handleReceiveApprove(data)
        {
            this.currentItem = data.row;
            this.dialog.approve = true;
        },
        async handleApprove()
        {
            this.dialogLoading = true;

            var payload = {
                tta_guid: this.currentItem.tta_guid,
                pass_json: {
                    "approved_user": this.user_info_guid,
                    "approved": 1,
                }
            }

            var pass_obj = {
                "dispatch": 'tta/trigger_update_tta',
                "getter": 'tta/get_tta',
                "app": this,
                "payload": payload,
            }

            var response = await this.$dispatch(pass_obj);

            if(response.status)
            {
                this.dialog.approve = false;
                this.table_function(this.ori_params);
                this.showNotify('positive','Approve TTA successfully.');
            }
            else
            {
                this.showNotify('negative','Approve TTA fail.');
                console.log(response)
            }

            this.dialogLoading = false;
        },
        handleReceiveAuthorise(data)
        {
            console.log(data)
            this.currentItem = data.row;
            this.dialog.authorise = true;
        },
        async handleAuthorise()
        {
            this.dialogLoading = true;

            // get distributor value
            var payload = {
                params: {
                    'tta_guid': this.currentItem.tta_guid,
                }
            }

            var pass_obj = {
                "dispatch": 'tta/trigger_get_tta_distributor_list',
                "getter": 'tta/get_distributor',
                "app": this,
                "payload": payload,
            }

            var distributor = await this.$dispatch(pass_obj);
            this.currentItem.distributor = [];
            if(distributor.status)
            {
                const data = distributor.response.data;
                if( data.count > 0)
                {
                    this.currentItem.distributor = data.results.map((entry)=>{return entry.supplier_guid});
                }
            }

            var pass_obj = {
                "dispatch": 'tta/trigger_get_tta_cot_list',
                "getter": 'tta/get_cot',
                "app": this,
                "payload": payload,
            }

            var tta_cot = await this.$dispatch(pass_obj);
            this.currentItem.conditionTrade = "";
            if(tta_cot.status)
            {
                if(tta_cot.response.data.count > 0)
                {
                    this.currentItem.conditionTrade = tta_cot.response.data.results[0].cot_guid;
                }                
            }

            console.log(this.currentItem)

            if(!this.currentItem.supplier_to || this.currentItem.supplier_to == "")
            {
                this.showNotify('negative','Please select vendor before authorising TTA.');
                this.dialogLoading = false;
                this.dialog.authorise = false;
                return;
            }

            if(this.currentItem.distributor.length <= 0)
            {
                this.showNotify('negative','Please select distributor before authorising TTA.');
                this.dialogLoading = false;
                this.dialog.authorise = false;
                return;
            }

            if(this.currentItem.conditionTrade == "")
            {
                this.showNotify('negative','Please select condition of trade before authorising TTA.');
                this.dialogLoading = false;
                this.dialog.authorise = false;
                return;
            }

            var payload = {
                tta_guid: this.currentItem.tta_guid,
                pass_json: {
                    "authorised": 1,
                    "authorised_user": this.user_info_guid,
                }
            }

            var pass_obj = {
                "dispatch": 'tta/trigger_update_tta',
                "getter": 'tta/get_tta',
                "app": this,
                "payload": payload,
            }

            var response = await this.$dispatch(pass_obj);

            if(response.status)
            {
                this.dialog.authorise = false;
                this.table_function(this.ori_params);
                this.showNotify('positive','Authorise TTA successfully.');
            }
            else
            {
                this.showNotify('negative','Authorise TTA fail.');
                console.log(response)
            }

            this.dialogLoading = false;
        },
        handleReceiveReject(data)
        {
            this.currentItem = data.row;
            this.dialog.reject = true;
        },
        async handleReject()
        {
            this.dialogLoading = true;

            var payload = {
                tta_guid: this.currentItem.tta_guid,
                pass_json: {
                    "rejected": 1,
                    "reject_by": this.username,
                }
            }

            var pass_obj = {
                "dispatch": 'tta/trigger_update_tta',
                "getter": 'tta/get_tta',
                "app": this,
                "payload": payload,
            }

            var response = await this.$dispatch(pass_obj);

            if(response.status)
            {
                this.dialog.reject = false;
                this.table_function(this.ori_params);
                this.showNotify('positive','Reject TTA successfully.');
            }
            else
            {
                this.showNotify('negative','Reject TTA fail.');
                console.log(response)
            }

            this.dialogLoading = false;
        },
        handleReceiveTerminate(data)
        {
            this.currentItem = data.row;
            this.dialog.terminate = true;
        },
        async handleTerminate()
        {
            this.dialogLoading = true;

            var payload = {
                tta_guid: this.currentItem.tta_guid,
                pass_json: {
                    "terminated": 1,
                    "terminated_by": this.username,
                }
            }

            var pass_obj = {
                "dispatch": 'tta/trigger_update_tta',
                "getter": 'tta/get_tta',
                "app": this,
                "payload": payload,
            }

            var response = await this.$dispatch(pass_obj);

            if(response.status)
            {
                this.dialog.terminate = false;
                this.table_function(this.ori_params);
                this.showNotify('positive','Terminate TTA successfully.');
            }
            else
            {
                this.showNotify('negative','Terminate TTA fail.');
                console.log(response)
            }

            this.dialogLoading = false;
        },
        handleReceivePrint(data){
            this.$router.push({name:'printTTA', query: {tta_guid: data.row.tta_guid, type: data.type}});
        },
        handleCreate(){
            this.$router.push({name: 'createTTA'});
        },
        handleChangeSearch()
        {
            this.$nextTick(()=>{
                this.forceLoading = true;
                this.table_function(this.ori_params);
            })            
        },
        handleChangeStartDate(newVal)
        {
            this.dialog.date_from = newVal;
        },
        handleChangeEndDate(newVal)
        {
            this.dialog.date_to = newVal;
        },
        handleChangeEndDate(newVal)
        {
            this.dialog.date_to = newVal;
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
    },
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
