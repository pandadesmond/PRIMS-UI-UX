<template>
    <div class="row q-pa-md">
        <div class="text-subtitle1 header_text col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
            {{claim_type == 'edc' ? 'Event Driven Claim' : 'Promotion Claim'}}
        </div>
        <q-form ref="save_form" class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 bg-white q-my-sm q-pa-md">
            
            <div v-if="page_function == 'edit'" class="row justify-end q-px-md q-py-sm q-gutter-sm">
                <q-btn-group class="btn_grp2" >
                    <q-btn-dropdown icon="print" rounded color="primary" split size="12px" no-caps>
                        <q-list padding class="btn_qlist">
                            <q-item clickable>
                                <q-item-section>
                                    <q-btn :disable="false" flat no-caps label="By Store" color="primary" @click="handlePrint('store')" class="btn_drp"/>
                                </q-item-section>
                            </q-item>
                            <q-item clickable>
                                <q-item-section>
                                    <q-btn :disable="false" flat no-caps label="By Subdept" color="primary" @click="handlePrint('subdept')" class="btn_drp"/>
                                </q-item-section>
                            </q-item>
                            <q-item clickable>
                                <q-item-section>
                                    <q-btn :disable="false" flat no-caps label="By Store by Subdept" color="primary" @click="handlePrint('store_subdept')" class="btn_drp"/>
                                </q-item-section>
                            </q-item>
                        </q-list>
                    </q-btn-dropdown>
                </q-btn-group>

                
                <q-btn-group v-if="json.posted == 0" class="btn_grp2" >
                    <q-btn-dropdown icon="settings" rounded color="primary" split size="12px" no-caps>
                        <q-list padding class="btn_qlist">
                            <q-item v-if="json.approved == 0" clickable>
                                <q-item-section>
                                    <q-btn :disable="false" flat no-caps label="Approve" color="primary" @click="handleStatus('approve')" class="btn_drp"/>
                                </q-item-section>
                            </q-item>
                            
                            <q-item v-if="json.rejected == 0" clickable>
                                <q-item-section>
                                    <q-btn :disable="false" flat no-caps label="Reject" color="primary" @click="handleStatus('reject')" class="btn_drp"/>
                                </q-item-section>
                            </q-item>
                        </q-list>
                    </q-btn-dropdown>
                </q-btn-group>
            </div>

            <div class="form col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="row">
                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-px-sm q-py-xs">
                        <Label pass_value="Vendor" class="text-h6"/>
                    </div>
                    
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 q-px-sm q-py-xs">
                        <LabelSelect label="Vendor Name" v-model:pass_value="json.supplier_guid" :options="options.supplier" :readonly="readonlyStatus" 
                        :dbComponentBehavior="dbComponentBehavior.text_required" @receiveChange="handleChangeVendor" @click="getSupplier" :loading="loading.vendor"/>
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
                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-px-sm q-py-xs">
                        <Label pass_value="TTA" class="text-h6"/>
                    </div>  
                    
                    <div v-if="claim_type=='pd'" class="row full-width">
                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 q-px-sm q-py-xs">
                            <LabelOptionGroup label="Claim Type" v-model:pass_value="json.type" :options="options.claim_type" :readonly="false" @receiveChange="this.hasChanges = true"/>
                        </div>
                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 q-px-sm q-py-xs q-gutter-y-sm">
                            <LabelSelect label="Ref No" v-model:pass_value="json.tta_guid" :options="options.tta" :loading="loading.tta"
                            :readonly="readonlyStatus" :dbComponentBehavior="dbComponentBehavior.text" @receiveChange="handleChangeTTA"/>

                            <LabelInput label="PIC" v-model:pass_value="json.tta_pic" :readonly="true" :dbComponentBehavior="dbComponentBehavior.text"/>

                            <LabelInput label="Designation" v-model:pass_value="json.tta_designation" :readonly="true" :dbComponentBehavior="dbComponentBehavior.text"/>
                        </div>
                    </div>
                    <div v-else class="row full-width">
                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 q-px-sm q-py-xs q-gutter-y-sm">
                            <LabelSelect label="Ref No" v-model:pass_value="json.tta_guid" :options="options.tta" :loading="loading.tta"
                            :readonly="readonlyStatus || parentReadonlyStatus" :dbComponentBehavior="dbComponentBehavior.text" @receiveChange="handleChangeTTA"/>
                        </div>
                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 q-px-sm q-py-xs q-gutter-y-sm">
                            <LabelInput label="PIC" v-model:pass_value="json.tta_pic" :readonly="true" :dbComponentBehavior="dbComponentBehavior.text"/>
                        </div>
                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 q-px-sm q-py-xs q-gutter-y-sm">
                            <LabelInput label="Designation" v-model:pass_value="json.tta_designation" :readonly="true" :dbComponentBehavior="dbComponentBehavior.text"/>
                        </div>
                    </div>
                </div>

                <q-separator class="q-my-md" inset/>

                <div class="row">
                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-px-sm q-py-xs">
                        <Label pass_value="Claim Detail" class="text-h6"/>
                    </div>
                    
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 q-px-sm q-py-xs">
                        <LabelInput label="Refno" v-model:pass_value="json.refno" :readonly="true" :dbComponentBehavior="dbComponentBehavior.text"/>
                    </div>
                    
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 q-px-sm q-py-xs">
                        <LabelDatepicker label="Doc Date" :daterange="json.date" :readonly="readonlyStatus" :dateFormat="preference.dateFormat"
                        :dbComponentBehavior="dbComponentBehavior.text_required" @receiveChange="(val)=>handleChangeDate('date',val)"/>
                    </div>

                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 q-px-sm q-py-xs">
                        <LabelDatepicker label="Effective Date From" :daterange="json.effective_date_from" :readonly="readonlyStatus || parentReadonlyStatus" :optionsFn="startDateOptions"
                        :dbComponentBehavior="dbComponentBehavior.text_required" @receiveChange="(val)=>handleChangeDate('effective_date_from',val)" :dateFormat="preference.dateFormat"/>
                    </div>

                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 q-px-sm q-py-xs">
                        <LabelDatepicker label="Effective Date To" :daterange="json.effective_date_to" :readonly="readonlyStatus || parentReadonlyStatus" :optionsFn="endDateOptions"
                        :dbComponentBehavior="dbComponentBehavior.text_required" @receiveChange="(val)=>handleChangeDate('effective_date_to',val)" :dateFormat="preference.dateFormat"/>
                    </div>

                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 q-px-sm q-py-xs">
                        <LabelInput label="Total Amount" v-model:pass_value="json.total_amount" :readonly="true" :dbComponentBehavior="dbComponentBehavior.text"/>
                    </div>

                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 q-px-sm q-py-xs">
                        <LabelSelect label="Company" v-model:pass_value="json.company_info_guid" :options="options.company"
                        :readonly="page_function=='edit'" :dbComponentBehavior="dbComponentBehavior.text_required"/>
                    </div>

                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 q-px-sm q-py-xs">
                        <LabelTextarea label="Remark" v-model:pass_value="json.remarks" :readonly="readonlyStatus" :dbComponentBehavior="dbComponentBehavior.textarea" @receiveChange="this.hasChanges = true"/>
                    </div>

                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 q-px-sm q-py-xs">
                        <LabelSelect label="Billing Type" v-model:pass_value="json.billing_type" :options="options.billing_type"
                        :readonly="readonlyStatus" :dbComponentBehavior="dbComponentBehavior.text_required" @receiveChange="this.hasChanges = true"/>
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
                        :table_data="table_data.child"
                        :table_column="table_column.child"
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

            <div v-if="page_function == 'edit' && json.posted == 1">
                <q-separator spaced/>
                <div class="row justify-between q-px-sm q-py-xs">
                    <Label pass_value="Attachments" class="text-h6"/>
                    <Button class="custom_add_button justify-end" pass_label="Upload" :pass_square="true" :pass_dense="false" :tooltip="true" pass_tooltip="Upload attachments" @receiveClick="dialog.upload = true"/>      
                </div>
                <div class="row q-py-md">
                    <div class="col-xl-8 col-lg-8 col-md-6 col-sm-12 col-xs-12">
                        <Table
                            :row_per_page="[10,50,100,1000]"
                            :table_data="table_data.attachment"
                            :table_column="table_column.attachment"
                            :flat_status="true"
                            :bordered_status="true"

                            :allow_delete="true"
                            :allow_download="true"
                            v-on:receiveRequestTable="handleTableChangeAttachment"
                            v-on:receiveHandleDelete="deleteFile"
                            v-on:receiveHandleEdit="viewFile"
                            v-on:receiveHandleDownload="downloadFile"
                            :pass_visible_columns="[]"
                        />
                    </div>
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
                        v-on:receiveClick="saveEDC"
                        :pass_no_caps="false"
                        :pass_square="true"
                        :pass_dense="true"
                        class="custom_button"
                    />

                    <Button v-if="page_function == 'edit' && json.posted == 0" pass_label="POST"
                        v-on:receiveClick="handleStatus('post')"
                        :pass_no_caps="false"
                        :pass_square="true"
                        :pass_dense="true"
                        class="action_button"
                    />
                </div>
            </div>
        </q-form>

    </div>

    <q-inner-loading
        :showing="loading.page"
        class="showLoading"
        color="primary"
    />

    <q-dialog v-model="dialog.child" maximized persistent position="top" @hide="this.currentItem = {}">
        <q-card class="dialog-card">
            <q-card-section class="dialog-header theme_color row items-center">
                <div class="confirm_title">Invoice: {{json.refno}}</div>
                <q-space />
                <q-btn icon="close" flat round dense v-close-popup/>
            </q-card-section>

            <q-card-section class="dialog-body text-left">
                <q-form ref="save_child">
                    <div v-if="json.type == 'edc'" class="row q-px-md">
                        <div class="col-xl-9 col-lg-9 col-md-9 col-sm-9 col-xs-9 q-gutter-y-sm">
                            <LabelSelect label="Description" v-model:pass_value="currentItem.description" :options="options.description" 
                            :dbComponentBehavior="dbComponentBehavior.text_required" @receiveChange="handleChangeDescription"/>
                            
                            <LabelInput label="Amount" v-model:pass_value="currentItem.amount" :dbComponentBehavior="dbComponentBehavior.number_right" @receiveChange="table_data.allocation=[]"/>

                            <LabelOptionGroup label="Ratio By" v-model:pass_value="currentItem.ratio_type" :options="options.ratio_type" :readonly="false" @receiveChange="handleChangeRatioType"/>
                            
                            <LabelMultiselect label="Division" v-model:pass_value="currentItem.ratio" :options="options.ratio" 
                            v-model:pass_type="currentItem.division_guid" :options_type="options.division" :option_label="currentItem.ratio_type" 
                            :select_all="false" button="Ratio" :filter="true" :loading="loading.ratio" :dbComponentBehavior="dbComponentBehavior.select_required"
                            @receiveChange="table_data.ratio=[]" @receiveChangeType="handleChangeDivision" @receiveClickButton="handleRatio"/>

                            <LabelOptionGroup label="Allocation" v-model:pass_value="currentItem.allocation_type" :options="options.allocation_type" :readonly="false" @receiveChange="handleChangeAllocationType"/>

                            <LabelMultiselect label="Outlet" v-model:pass_value="currentItem.outlet" :options="options.outlet" 
                            v-model:pass_type="currentItem.banner" :options_type="options.banner" option_label="Outlets" 
                            :select_all="false" button="Allocation" :filter="true" :dbComponentBehavior="dbComponentBehavior.select_required"
                            @receiveChange="table_data.allocation=[]" @receiveChangeType="handleChangeBanner" @receiveClickButton="handleAllocation"/>
                        </div>
                    </div>
                    <div v-else class="row q-px-md">
                        <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8 q-gutter-y-sm">
                            <LabelInputAutocomplete label="Item Code" v-model:pass_value="currentItem.itemcode" :options="options.itemcode" button="Search" :loading="loading.itemcode"
                            :dbComponentBehavior="dbComponentBehavior.text_required" @receiveEnter="searchItemcode" @receiveClickButton="searchItemcode" @receiveChange="handleChangeItemcode"/>
                            
                            <LabelInput label="Description" v-model:pass_value="currentItem.description" :dbComponentBehavior="dbComponentBehavior.text" :readonly="true"/>

                            <LabelInput label="Amount" v-model:pass_value="currentItem.amount" :dbComponentBehavior="dbComponentBehavior.number_right"/>
                            
                            <LabelMultiselect v-if="currentItem.action == 'add'" label="Outlet" v-model:pass_value="currentItem.outlet" :options="options.outlet" 
                            v-model:pass_type="currentItem.banner" :options_type="options.banner" option_label="Outlets" 
                            :select_all="false" :filter="true" :dbComponentBehavior="dbComponentBehavior.select_required" @receiveChangeType="handleChangeBanner"/>

                            <LabelSelect v-if="currentItem.action == 'edit'" label="Outlet" v-model:pass_value="currentItem.outlet" :options="options.outlet" 
                            v-model:pass_type="currentItem.banner" :options_type="options.banner"
                            :dbComponentBehavior="dbComponentBehavior.text_required" :filter="true" @receiveChangeType="handleChangeBanner"/>
                        </div>
                    </div>
                </q-form>
            </q-card-section>

            <q-card-actions class="dialog-footer" align="right">
                <q-btn flat label="Cancel" font_color="#29292A" color="#29292A" v-close-popup size="12px" class="dialog_confirm_cancel_button"/>
                <q-btn flat :label="currentItem.action" font_color="white" color="'#D81111'" size="12px" class="primary_actions_button" @click="handleChild" />
            </q-card-actions>

            <q-inner-loading
                :showing="loading.dialog"
                color="primary"
            />
        </q-card>
    </q-dialog>

    <q-dialog v-model="dialog.table" maximized persistent position="top">
        <q-card class="dialog-card">
            <q-card-section class="dialog-header theme_color row items-center">
                <div class="confirm_title"><span class="text-capitalize">{{currentItem.table}}:</span> {{json.refno}}</div>
            </q-card-section>

            <q-card-section class="dialog-body text-left">
                <div v-if="currentItem.table == 'allocation'" class="row justify-center text-bold q-py-sm">
                    <span v-if="currentItem.allocation_type == 'manual'">Manual</span>
                    <div v-if="currentItem.allocation_type == 'sales_ratio'" class="col-6">
                        <LabelSelect label="Period Code" v-model:pass_value="currentItem.periodcode" :options="options.period_code"
                            :dbComponentBehavior="dbComponentBehavior.text_required" @receiveChange="handleChangePeriodCode"/>
                    </div>
                </div>
                <Table
                    :row_per_page="[999]"
                    :table_data="table_data[currentItem.table]"
                    :table_column="table_column[currentItem.table]"
                    :flat_status="true"
                    :bordered_status="true"
                    v-on:receiveRequestTable="handleTableChangeTable"
                    v-on:change_input_number="handleChangeInputNumber"
                    :filter_mode_on="false"
                    :forceLoading="false"
                    :column_reordering="true"
                    :row_reordering="false"
                    :pass_visible_columns="[]"
                    :hide_footer="true"
                    :bottom_row="currentItem.total"
                />
            </q-card-section>

            <q-card-actions class="dialog-footer" align="right">
                <q-btn flat label="Done" font_color="white" color="'#D81111'" size="12px" class="primary_actions_button" @click="handleCloseTable"/>
            </q-card-actions>

            <q-inner-loading
                :showing="loading.dialog"
                color="primary"
            />
        </q-card>
    </q-dialog>

    <q-dialog v-model="dialog.confirm" persistent position="top">
        <q-card class="dialog-card">
            <q-card-section class="dialog-header theme_color row items-center">
                <div class="confirm_title">Confirmation</div>
                <q-space />
                <q-btn icon="close" flat round dense v-close-popup/>
            </q-card-section>

            <q-card-section class="dialog-body">
                <span class="confirmation_line_font">{{currentItem.message}}</span>
            </q-card-section>

            <q-card-actions class="dialog-footer" align="right">
                <q-btn flat label="Cancel" font_color="#29292A" color="#29292A" v-close-popup size="12px" class="dialog_confirm_cancel_button"/>
                <q-btn v-if="currentItem.action == 'delete'" flat label="Confirm" font_color="white" color="'#D81111'" size="12px" class="primary_actions_button" @click="handleDeleteChild" />
                <q-btn v-else-if="currentItem.action == 'deleteFile'" flat label="Confirm" font_color="white" color="'#D81111'" size="12px" class="primary_actions_button" @click="handleDeleteFile" />
                <q-btn v-else flat label="Confirm" font_color="white" color="'#D81111'" size="12px" class="primary_actions_button" @click="updateStatus(currentItem.action)" />
            </q-card-actions>

            <q-inner-loading
                :showing="loading.dialog"
                color="primary"
            />
        </q-card>
    </q-dialog>

    <q-dialog v-model="dialog.upload" persistent position="top">
        <q-card class="dialog-card">

        <q-card-section class="dialog-header theme_color row items-center">
            <div class="confirm_title">Upload Claim: {{json.refno}}</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup/>
        </q-card-section>

        <q-card-section class="dialog-body text-left">
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

        <q-card-actions class="dialog-footer" align="right">
            <q-btn flat label="Cancel" font_color="#29292A" color="#29292A" v-close-popup size="12px" class="dialog_confirm_cancel_button"/>
            <q-btn flat label="UPLOAD" font_color="white" color="'#D81111'" size="12px" class="primary_actions_button" @click="uploadClaim" />
        </q-card-actions>

        <q-inner-loading
            :showing="loading.dialog"
            color="primary"
        />
        </q-card>
    </q-dialog>
</template>

<script>
import Label from 'src/components/PRIMS/Main/Label'
import LabelMultiselect from 'src/components/PRIMS/General/LabelMultiselect'
import LabelSelect from 'src/components/PRIMS/General/LabelSelect'
import LabelInput from 'src/components/PRIMS/General/LabelInput'
import LabelDatepicker from 'src/components/PRIMS/General/LabelDatepicker'
import LabelTextarea from 'src/components/PRIMS/General/LabelTextarea'
import LabelOptionGroup from 'src/components/PRIMS/General/LabelOptionGroup'
import LabelInputAutocomplete from 'src/components/PRIMS/General/LabelInputAutocomplete'
import Table from 'src/components/PRIMS/Main/Table.vue';
import Button from 'src/components/PRIMS/Main/Button'
import { Notify } from "quasar";

export default {
    components: {
        Label,
        LabelMultiselect,
        LabelInput,
        LabelSelect,
        LabelDatepicker,
        LabelTextarea,
        LabelOptionGroup,
        LabelInputAutocomplete,
        Table,
        Button,
    },
    data(){
        return {
            preference: {},
            company_guid: localStorage.getItem("company_guid") != "" && localStorage.getItem("company_guid") != "null" && localStorage.getItem("company_guid") != null ? localStorage.getItem("company_guid") : "",
            username: localStorage.getItem("username") != "" && localStorage.getItem("username") != "null" && localStorage.getItem("username") != null ? localStorage.getItem("username") : "",
            page_function: "",
            claim_type: this.$route.name.endsWith('EDC') ? 'edc' : 'pd',
            currentClaim: "",
            json: {
                refno: "",
                date: "",
                supplier_guid: "",
                vendor_code: "",
                address_1: "",
                address_2: "",
                address_3: "",
                type: "",
                billing_type: "",
                total_amount: 0.00,
                remarks: "",
                tta_guid: "",
                tta_pic: "",
                tta_designation: "",
                effective_date_from: "",
                effective_date_to: "",
                company_info_guid: "",
            },
            prev_json: {},
            ori_params: {
                child: {},
                attachment: {},
            },
            table_column: {
                child: [],
                ratio: [],
                allocation: [],
                attachment: [],
            },
            table_data: {
                child: [],
                ratio: [],
                allocation: [],
            },
            rearrange_column: [],
            list: {
                outlet: [],
                banner: [],
                subdept: [],
            },
            options: {
                tta: [],
                supplier: [],
                company: [],
                division: [],
                description: [],
                period_code: [],
                banner: [],
                ratio: [],
                outlet: [],
                itemcode: [],
                billing_type: [{label: 'Monthly',value: 'monthly'},{label: 'End of Agreement',value: 'end_of_tta'}],
                claim_type: [{label: 'PD by Scan Sales',value: 'pd_sales'},{label: 'PD by Purchase',value: 'pd_purchase'}],
                allocation_type: [{label: 'Manual',value: 'manual'},{label: 'Sales Ratio',value: 'sales_ratio'}],
                ratio_type: [{label: 'Sub Department',value: 'subdept'},{label: 'Category',value: 'category'}],
            },
            dialog: {
                child: false,
                table: false,
                confirm: false,
                upload: false,
            },
            currentItem: {},
            readonlyStatus: false,
            parentReadonlyStatus: false,
            loading: {
                page: false,
                vendor: false,
                tta: false,
                dialog: false,
                ratio: false,
                itemcode: false,
            },
            hasChanges: false,            
        }
    },
    computed: {
        dbComponentBehavior() {
            return this.$store.getters["dbComponentBehavior/byLanguage"]("tta");
        },
        startDateOptions(){
            return (date) => {
                if(this.json.tta_guid && this.json.tta_guid != "")
                {
                    const tta = this.options.tta.find(entry => entry.tta_guid == this.json.tta_guid);
                    var start_date = `${tta.effective_date_from.split('-')[0]}-01-01`;
                    start_date = start_date.replaceAll('-','/');
                    var end_date = tta.effective_date_to.split(' ')[0];
                    end_date = end_date.replaceAll('-','/');
                    return date >= start_date && date <= end_date;
                }
                else if(this.json.effective_date_to != "")
                {
                    var end_date = this.json.effective_date_to.split(' ')[0];
                    end_date = end_date.replaceAll('-','/');
                    return date <= end_date;
                }
                return true;
            };
        },
        endDateOptions(){
            return (date) => {
                if(this.json.tta_guid && this.json.tta_guid != "")
                {
                    const tta = this.options.tta.find(entry => entry.tta_guid == this.json.tta_guid);

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
                    return date >= start_date && date <= end_date;
                }
                else if(this.json.effective_date_from != "")
                {
                    var start_date = this.json.effective_date_from.split(' ')[0];
                    start_date = start_date.replaceAll('-','/');
                    return date >= start_date;
                }
                return true;
            };
        },
    },
    async mounted(){
        this.loading.page = true;

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
            this.options.company = array_options;
        }

        this.json.type = this.claim_type == 'pd' ? 'pd_scan_sales' : 'edc';

        if(this.$route.name.startsWith('create'))
        {
            this.page_function = 'create';
            this.readonlyStatus = false;

            var current_date = new Date();
            current_date = `${current_date.getFullYear()}-${('0' + (current_date.getMonth() + 1)).slice(-2)}-${('0' + current_date.getDate()).slice(-2)}`;
            this.json.date = current_date;
            this.getSupplier();
        }
        else if(this.$route.name.startsWith('edit'))
        {
            this.page_function = 'edit';

            if(!this.$route.query.guid)
            {
                this.showNotify('negative', "Unable to identidy claim guid.");
                if(this.claim_type == 'edc')
                    this.$router.push({name: "edc"});
                else if(this.claim_type == 'pd')
                    this.$router.push({name: "pd"});
            }

            this.currentClaim = this.$route.query.guid;

            await this.getClaim();
        }

        this.loading.page = false;
    },
    methods: {
        handleTableChange(newVal)
        {
            var new_params = this.$pluginsTableParams(newVal)

            var payload = {
                params : new_params
            };

            this.ori_params.child = payload;

            this.table_function(payload);
        },
        async table_function(payload){
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
                        headerStyle: 'text-align: center; min-width: 250px;',
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

            if(this.claim_type == 'pd')
            {
                const obj = {
                    name: 'outlet_code',
                    required: true,
                    label: 'Outlet Code',
                    align: 'center',
                    sortable: true,
                    field: 'outlet_code',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                }
                column.splice(3,0,obj);
            }

            this.table_column.child = column;

            if(payload.params.ordering == "")
            {
                payload.params.ordering = "line";
            }

            if(this.claim_type == 'edc')
            {
                payload.params.edc_guid = this.currentClaim;

                var pass_obj = {
                    "dispatch": 'claim/trigger_get_edc_child_list',
                    "getter": 'claim/get_edc_child',
                    "app": this,
                    "payload": payload,
                };
            }
            else if(this.claim_type == 'pd')
            {
                payload.params.pd_guid = this.currentClaim;

                var pass_obj = {
                    "dispatch": 'claim/trigger_get_pd_child_list',
                    "getter": 'claim/get_pd_child',
                    "app": this,
                    "payload": payload,
                };
            }

            var claim_child_list = await this.$dispatch(pass_obj);


            if(claim_child_list.status)
            {
                console.log("child",claim_child_list)
                var rows = claim_child_list.response;
                for(const i in rows.data.results)
                {
                    rows.data.results[i].line = parseInt(i)+1;
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

            this.table_data.child = rows;
            this.parentReadonlyStatus = this.table_data.child.data.results.length > 0 ? true : false;
        },
        handleColumnRearrange(pass_payload)
        {
            this.rearrange_column = pass_payload;
        },
        handleFilterColumn(pass_payload)
        {
            this.rearrange_column = this.table_column.child;
            this.table_function(this.ori_params.child);
        },
        async handleClearFilter()
        {
            await this.clearFilterInput();
            this.rearrange_column = this.table_column.child;

            this.table_function(this.ori_params.child);
        },
        handleTableChangeTable(newVal)
        {
            var new_params = this.$pluginsTableParams(newVal)

            var payload = {
                params : new_params
            };

            if(this.currentItem.table == 'allocation')
            {
                this.table_function_allocation(payload);
            }
            else if(this.currentItem.table == 'ratio')
            {
                this.table_function_ratio(payload);
            }
        },
        handleChangeInputNumber(payload)
        {
            if(payload.col.name == 'ratio')
            {
                var total = 0;
                this.table_data.ratio.data.results.map(entry=>total+=parseFloat(entry.ratio));
                this.currentItem.total.map(entry=> {
                    if(entry.name == 'total') entry.data = total;
                });
            }
            else if(payload.col.name == 'amount')
            {
                var total = 0;
                this.table_data.allocation.data.results.map(entry=>total+=parseFloat(entry.amount));
                this.currentItem.total.map(entry=> {
                    if(entry.name == 'total') entry.data = total;
                });
            }
            else if(payload.col.name == 'sales_ratio')
            {
                var total = 0;
                this.table_data.allocation.data.results.map(entry=>total+=parseFloat(entry.sales_ratio));
                this.currentItem.total.map(entry=> {
                    if(entry.name == 'total_sales') entry.data = total;
                });
            }
            else if(payload.col.name == 'manual_ratio')
            {
                var total = 0;
                this.table_data.allocation.data.results.map(entry=>total+=parseFloat(entry.manual_ratio));
                this.currentItem.total.map(entry=> {
                    if(entry.name == 'total_manual') entry.data = total;
                });
            }
        },
        handleTableChangeAttachment(newVal)
        {
            var new_params = this.$pluginsTableParams(newVal)

            var payload = {
                params : new_params
            };

            this.ori_params.attachment = payload;

            this.table_function_attachment(payload);
        },
        async table_function_attachment(payload){
            var column = [
                {
                    name: 'action',
                    required: true,
                    label: 'Action',
                    align: 'center',
                    sortable: true,
                    field: 'action',
                    headerStyle: 'text-align: center; width: 150px; max-width: 150px;',
                },
                {
                    name: 'filename',
                    required: true,
                    label: 'Filename',
                    align: 'left',
                    sortable: true,
                    field: 'filename',
                    headerStyle: 'text-align: center; min-width: 100px;',
                    style: 'text-transform: capitalize'
                },
            ];

            if(this.claim_type == 'pd')
            {
                payload.params.pd_guid = this.currentClaim;

                var pass_obj = {
                    "dispatch": 'claim/trigger_get_pd_upload',
                    "getter": 'claim/get_pd',
                    "app": this,
                    "payload": payload,
                };
            }
            else if(this.claim_type == 'edc')
            {
                payload.params.edc_guid = this.currentClaim;

                var pass_obj = {
                    "dispatch": 'claim/trigger_get_edc_upload',
                    "getter": 'claim/get_edc',
                    "app": this,
                    "payload": payload,
                };
            }
            
            const attachment = await this.$dispatch(pass_obj);

            if(attachment.status)
            {
                var rows = attachment.response;
                for(const obj of rows.data.results)
                {
                    obj.filename = obj.file.split('/').pop();
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

            this.table_column.attachment = column;
            this.table_data.attachment = rows;
        },
        async table_function_ratio()
        {
            var column = [
                {
                    name: 'code',
                    required: true,
                    label: 'Code',
                    align: 'center',
                    sortable: true,
                    field: 'code',
                    headerStyle: 'text-align: center; min-width: 100px;',
                },
                {
                    name: 'name',
                    required: true,
                    label: 'Name',
                    align: 'left',
                    sortable: true,
                    field: 'name',
                    headerStyle: 'text-align: center; min-width: 100px;',
                },
                {
                    name: 'ratio',
                    required: true,
                    label: 'Ratio',
                    align: 'left',
                    sortable: true,
                    field: 'ratio',
                    headerStyle: 'text-align: center; min-width: 50px; max-width: 100px',
                    data_type: this.readonlyStatus ? '' : 'input_number',
                    data_decimal: 2,
                },
            ];

            this.table_column.ratio = column;

            var rows = {
                data: {
                    results: [],
                }
            };

            var total = 0;
            if(this.currentItem.ratio.length > 0)
            {
                var subdept_category = this.options.ratio.filter(entry => this.currentItem.ratio.includes(entry.value));
                for(var obj of subdept_category)
                {
                    const match_ratio = this.currentItem.ratio_info 
                        ? this.currentItem.ratio_info.find(entry=>entry.subdept_guid == obj.value || entry.category_guid == obj.value) 
                        : false;
                    
                    if(match_ratio)
                    {
                        obj.ratio = match_ratio.ratio;
                        obj.edc_child_ratio_guid = match_ratio.edc_child_ratio_guid;
                    }
                    else
                    {
                        obj.ratio = obj.ratio ? obj.ratio : 0;
                    }
                    rows.data.results.push(obj);
                    total+=parseFloat(obj.ratio);
                }
            }

            this.table_data.ratio = rows;
            this.currentItem.total = [
                {
                    name: 'label',
                    style: 'font-weight: bold; text-align: center;',
                    colspan: 2,
                    data: "Total",
                },
                {
                    name: 'total',
                    style: 'font-weight: bold; text-align: center;',
                    colspan: 1,
                    data: total,
                },
            ];
            console.log('ratio',this.table_data.ratio);
        },
        async table_function_allocation()
        {
            var columns = [];
            var rows = {
                data: {
                    results: [],
                }
            };

            if(this.currentItem.outlet.length > 0)
            {
                var outlet = this.options.banner[0].options.filter(entry => this.currentItem.outlet.includes(entry.value));
                if(this.currentItem.allocation_type == 'manual')
                {
                    columns.push(
                        ...[{
                            name: 'banner',
                            required: true,
                            label: 'Banner',
                            align: 'center',
                            sortable: true,
                            field: 'banner',
                            headerStyle: 'text-align: center; min-width: 150px;',
                            filter_type: 'input',
                            filter_options: [],
                            filter_value: '',
                        },
                        {
                            name: 'code',
                            required: true,
                            label: 'Outlet Code',
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
                            label: 'Outlet Name',
                            align: 'left',
                            sortable: true,
                            field: 'name',
                            headerStyle: 'text-align: center; min-width: 250px',
                            filter_type: 'input',
                            filter_options: [],
                            filter_value: '',
                        },
                        {
                            name: 'amount',
                            required: true,
                            label: 'Amount',
                            align: 'left',
                            sortable: true,
                            field: 'amount',
                            headerStyle: 'text-align: center; min-width: 50px; max-width: 100px',
                            data_type: this.readonlyStatus ? '' : 'input_number',
                        },]
                    );

                    var total = 0;
                    for(var obj of outlet)
                    {
                        const match_allocation = this.currentItem.allocation_info 
                            ? this.currentItem.allocation_info.find(entry=>entry.concept_guid == obj.concept_guid && entry.retailer_outlet_guid == obj.retailer_outlet_guid) 
                            : false;
                        
                        if(match_allocation)
                        {
                            obj.amount = match_allocation.amount;
                            obj.edc_child_allocation_guid = match_allocation.edc_child_allocation_guid;
                        }
                        else
                        {
                            obj.amount = obj.amount ? obj.amount : 0;
                        }
                        total+=parseFloat(obj.amount);
                        
                        obj.banner = obj.concept ? `${obj.concept.code} - ${obj.concept.name}` : '';
                        rows.data.results.push(obj);
                    }

                    this.currentItem.total = [
                        {
                            name: 'label',
                            style: 'font-weight: bold; text-align: center;',
                            colspan: 3,
                            data: "Total",
                        },
                        {
                            name: 'total',
                            style: 'font-weight: bold; text-align: center;',
                            colspan: 1,
                            data: total,
                        },
                    ];
                }
                else if(this.currentItem.allocation_type == 'sales_ratio')
                {
                    columns.push(
                        ...[{
                            name: 'banner',
                            required: true,
                            label: 'Banner',
                            align: 'center',
                            sortable: true,
                            field: 'banner',
                            headerStyle: 'text-align: center; min-width: 150px;',
                            filter_type: 'input',
                            filter_options: [],
                            filter_value: '',
                        },
                        {
                            name: 'code',
                            required: true,
                            label: 'Outlet Code',
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
                            label: 'Outlet Name',
                            align: 'left',
                            sortable: true,
                            field: 'name',
                            headerStyle: 'text-align: center; min-width: 250px',
                            filter_type: 'input',
                            filter_options: [],
                            filter_value: '',
                        },
                        {
                            name: 'sales_ratio',
                            required: true,
                            label: 'Sales Ratio (%)',
                            align: 'left',
                            sortable: true,
                            field: 'sales_ratio',
                            headerStyle: 'text-align: center; min-width: 50px; max-width: 100px',
                            data_type: this.readonlyStatus ? '' : 'input_number',
                        },
                        {
                            name: 'manual_ratio',
                            required: true,
                            label: 'Manual Ratio (%)',
                            align: 'left',
                            sortable: true,
                            field: 'manual_ratio',
                            headerStyle: 'text-align: center; min-width: 50px; max-width: 100px',
                            data_type: this.readonlyStatus ? '' : 'input_number',
                        },]
                    );

                    var totalSales = 0;
                    var totalManual = 0;
                    for(var obj of outlet)
                    {
                        const match_allocation = this.currentItem.allocation_info 
                            ? this.currentItem.allocation_info.find(entry=>entry.concept_guid == obj.concept_guid && entry.retailer_outlet_guid == obj.retailer_outlet_guid) 
                            : false;
                        
                        if(match_allocation)
                        {
                            obj.sales_ratio = match_allocation.sales_ratio;
                            obj.manual_ratio = match_allocation.manual_ratio;
                            obj.edc_child_allocation_guid = match_allocation.edc_child_allocation_guid;
                        }
                        else
                        {
                            obj.sales_ratio = obj.sales_ratio ? obj.sales_ratio : 0;
                            obj.manual_ratio = obj.manual_ratio ? obj.manual_ratio : 0;
                        }
                        totalSales+=parseFloat(obj.sales_ratio);
                        totalManual+=parseFloat(obj.manual_ratio);
                        
                        obj.banner = obj.concept ? `${obj.concept.code} - ${obj.concept.name}` : '';
                        rows.data.results.push(obj);
                    }
                    // var results = this.currentItem.temp_allocation.filter(entry=>entry.periodcode == this.currentItem.periodcode);
                    // console.log(results)

                    // for(const obj of results)
                    // {
                    //     totalSales += parseFloat(obj.sales_ratio);
                    //     totalManual += parseFloat(obj.manual_ratio);
                    //     obj.banner = obj.concept ? `${obj.concept.code} - ${obj.concept.name}` : '';
                    // }

                    // rows.data.results = results;

                    this.currentItem.total = [
                        {
                            name: 'label',
                            style: 'font-weight: bold; text-align: center;',
                            colspan: 3,
                            data: "Total",
                        },
                        {
                            name: 'total_sales',
                            style: 'font-weight: bold; text-align: center;',
                            colspan: 1,
                            data: totalSales,
                        },
                        {
                            name: 'total_manual',
                            style: 'font-weight: bold; text-align: center;',
                            colspan: 1,
                            data: totalManual,
                        },
                    ];
                }                

                rows.data.results.sort((a,b)=>{
                    const alphaA = a.banner.match(/([A-Za-z]+)\s*-\s*/);
                    const alphaB = b.banner.match(/([A-Za-z]+)\s*-\s*/);
                    const numA = a.banner.match(/(\d+)\s*-\s*/);
                    const numB = b.banner.match(/(\d+)\s*-\s*/);
                    
                    if (alphaA != null && alphaB != null) {
                        return alphaA[0].localeCompare(alphaB[0]); // Sort alphabetically
                    } else if (alphaA != null) {
                        return -1; // a is alphabetic, b is numeric
                    } else if (alphaB != null) {
                        return 1; // b is alphabetic, a is numeric
                    } else if (numA != null && numB != null) {
                        return parseInt(numA[0]) - parseInt(numB[0]); // Sort numerically
                    }

                    return 0;
                });
            }

            this.table_column.allocation = columns;
            this.table_data.allocation = rows;
            console.log('allocation',this.table_data.allocation);
        },
        handleStatus(status)
        {
            if(this.hasChanges)
            {
                this.showNotify('negative', 'Changes have been made. Please save the changes first.');
                return;
            }

            if(status == 'approve')
            {
                this.currentItem.action = 'approve';
                this.currentItem.message = `Are you sure want to approve ${this.json.refno} ?`
            }
            else if(status == 'reject')
            {
                this.currentItem.action = 'reject';
                this.currentItem.message = `Are you sure want to reject ${this.json.refno} ?`
            }
            else if(status == 'post')
            {
                if((!this.json.tta_guid || this.json.tta_guid == "") && this.json.approved == 0)
                {
                    this.showNotify('negative','Claim without TTA must be approved before posting.');
                    this.dialog.confirm = false;
                    return;
                }
                this.currentItem.action = 'post';
                this.currentItem.message = `Are you sure want to post ${this.json.refno} ?`
            }
            
            this.dialog.confirm = true;
        },
        handleFileUpload(files)
        {
            this.currentItem.files = files;
        },
        handlePrint(type)
        {
            this.$router.push({name: 'printAgreement', query: { guid: this.currentClaim, type: this.claim_type, view: type}});
        },
        handleChangeDate(field,newVal)
        {
            this.json[field] = newVal;
            this.hasChanges = true
        },
        async handleChangeVendor(newVal)
        {
            this.json.supplier_guid = newVal;
            var vendor = this.options.supplier.filter(entry => entry.supplier_guid == newVal);
            if(vendor.length>0)
            {
                this.json.vendor_code = vendor[0].code ? vendor[0].code : "";
                this.json.address_1 = vendor[0].address1 ? vendor[0].address1 : "";
                this.json.address_2 = vendor[0].address2 ? vendor[0].address2 : "";
                this.json.address_3 = vendor[0].address3 ? vendor[0].address3 : "";
            }
            else
            {
                this.json.vendor_code = "";
                this.json.address_1 = "";
                this.json.address_2 = "";
                this.json.address_3 = "";
            }

            if(this.page_function == 'edit' && Object.keys(this.prev_json).length>0) this.hasChanges = true;
            this.json.tta_guid = "";
            this.json.tta_pic = "";
            this.json.tta_designation = "";
            this.getTTA();
        },
        async handleChangeTTA(newVal)
        {
            this.json.tta_guid = newVal;
            var tta = this.options.tta.filter(entry => entry.tta_guid == newVal);
            if(tta.length>0)
            {
                this.json.tta_pic = tta[0].supplier_pic_name ? tta[0].supplier_pic_name : "";
                this.json.tta_designation = tta[0].supplier_pic_designation ? tta[0].supplier_pic_designation : "";
            }
            else
            {
                this.json.tta_pic = "";
                this.json.tta_designation = "";
            }
            this.hasChanges = true
            this.json.company_info_guid = "";
        },
        async handleChangeDescription(newVal)
        {
            this.currentItem.description = newVal;
            if(this.json.tta_guid && this.json.tta_guid != "")
            {
                const service_article = this.options.description.find(entry => entry.value == newVal);
                if(service_article)
                {
                    this.currentItem.glcode_guid = service_article.tab_article_info ? service_article.tab_article_info.glcode_guid : null;
                    this.currentItem.amount = service_article.option1 == '$' ? service_article.value1 : service_article.option2 == '$' ? service_article.value2 : 0;
                }
            }
            else
            {
                const service_article = this.options.description.find(entry => entry.value == newVal);
                if(service_article)
                {
                    this.currentItem.glcode_guid = service_article.glcode_guid ? service_article.glcode_guid : null;
                }
            }
        },
        // handleChangePeriodCode()
        // {
        //     if(!this.currentItem.periodcode) return;
        //     this.table_function_allocation();
        // },
        handleChangeItemcode(newVal)
        {
            if(typeof newVal == 'object')
            {
                this.currentItem.itemcode = newVal.value;
                this.currentItem.description = newVal.description;
                var pass_obj = {
                    "dispatch": 'general/trigger_get_subdept_list',
                    "getter": 'general/get_division',
                    "app": this,
                    "payload": {
                        "params": {
                            code: newVal.subdept,
                        }
                    },
                };

                this.$dispatch(pass_obj).then((subdept)=>{
                    const result = subdept.response.data.results[0];
                    const match_division = this.options.division.find(entry=>entry.departments.includes(result.dept_guid));
                    this.currentItem.division_guid = match_division.division_guid;
                });                
            }            
        },
        handleChangeBanner(newVal)
        {
            if(this.dialog.action == 'EDIT') this.dialog.outlet = "";

            this.currentItem.banner = newVal;

            if(newVal == 'all' || !newVal)
            {
                if(!newVal) this.$nextTick(() => this.currentItem.banner = 'all');
                var options = this.options.banner[0].options;
                // console.log('all', options);
            }
            else if(newVal == 'else')
            {
                var options = this.options.banner[0].options.filter(entry=>entry.concept_guid==entry.code);
                // console.log('else', options);
            }
            else
            {
                var options = this.options.banner[0].options.filter(entry=>entry.concept_guid==newVal);
                // console.log(newVal, options);
            }

            // remove duplicate outlet
            options = options.filter((obj, index, self) => index === self.findIndex((entry) => (entry.value === obj.value)));

            // sort outlet
            options.sort((a,b)=>{
                const alphaA = a.label.match(/([A-Za-z]+)\s*-\s*/);
                const alphaB = b.label.match(/([A-Za-z]+)\s*-\s*/);
                const numA = a.label.match(/(\d+)\s*-\s*/);
                const numB = b.label.match(/(\d+)\s*-\s*/);
                
                if (alphaA != null && alphaB != null) {
                    return alphaA[0].localeCompare(alphaB[0]); // Sort alphabetically
                } else if (alphaA != null) {
                    return -1; // a is alphabetic, b is numeric
                } else if (alphaB != null) {
                    return 1; // b is alphabetic, a is numeric
                } else if (numA != null && numB != null) {
                    return parseInt(numA[0]) - parseInt(numB[0]); // Sort numerically
                }

                return 0;
            });
            this.options.outlet = options;
            // console.log(this.outlet_options);
        },
        async handleChangeRatioType(newVal)
        {
            this.currentItem.ratio_type = newVal;
            this.currentItem.ratio = [];
            this.table_data.ratio = [];

            this.loading.ratio = true;

            if(this.list.subdept.length >0 && this.currentItem.ratio_type == 'category')
            {
                const subdepartment = this.list.subdept.map(entry => entry.subdept_guid);
                
                var pass_obj = {
                    "dispatch": 'general/trigger_get_category_list',
                    "getter": 'general/get_division',
                    "app": this,
                    "payload": {
                        params: {
                            subdept_guid__in: subdepartment.join(','),
                        }
                    },
                };

                var category = await this.$dispatch(pass_obj);

                var options = [];
                if(category.status)
                {
                    console.log("category");
                    for(var i in category.response.data.results)
                    {
                        var obj = category.response.data.results[i];
                        obj.value = obj.category_guid;
                        obj.label = `${obj.code} - ${obj.name}`;
                        options.push(obj);
                    }
                }
                this.options.ratio = options;
            }
            else if(this.list.subdept.length >0 && this.currentItem.ratio_type == 'subdept')
            {
                this.options.ratio = this.list.subdept;
            }

            this.loading.ratio = false;
        },
        async handleChangeDivision(newVal)
        {
            this.currentItem.division_guid = newVal;
            this.currentItem.ratio = [];
            this.table_data.ratio = [];

            if(!this.currentItem.division_guid || this.currentItem.division_guid == "") return;

            this.loading.ratio = true;

            // get subdept for division selected
            const department = this.options.division.find(entry => entry.value == this.currentItem.division_guid).departments;

            var pass_obj = {
                "dispatch": 'general/trigger_get_subdept_list',
                "getter": 'general/get_division',
                "app": this,
                "payload": {
                    params: {
                        dept_guid__in: department.join(','),
                    }
                },
            };

            var subdept = await this.$dispatch(pass_obj);
            
            var options = [];
            if(subdept.status)
            {
                console.log("subdept")
                for(var i in subdept.response.data.results)
                {
                    var obj = subdept.response.data.results[i];
                    obj.value = obj.subdept_guid;
                    obj.label = `${obj.code} - ${obj.name}`;
                    options.push(obj);
                }
            }
            this.list.subdept = options;
            if(this.currentItem.ratio_type == 'subdept') 
                this.options.ratio = options;

            else if (this.currentItem.ratio_type == 'category') 
                this.handleChangeRatioType('category');

            this.loading.ratio = false;
        },
        handleRatio()
        {
            if(!this.currentItem.division_guid || this.currentItem.division_guid == "")
            {
                this.showNotify('negative', "Please select division.");
                return;
            }

            if(this.currentItem.ratio.length == 0)
            {
                this.showNotify('negative', `Please select at least one ${this.currentItem.ratio_type}.`);
                return;
            }

            this.currentItem.table = "ratio";
            this.dialog.table = true;
        },
        handleChangeAllocationType(newVal)
        {
            this.currentItem.periodcode = this.options.period_code[0].value;
            this.currentItem.outlet = [];
        },
        handleAllocation()
        {
            if(this.currentItem.outlet.length == 0)
            {
                this.showNotify('negative', "Please select outlet.");
                return;
            }

            // // to allocate each outlet selected to each periocode
            // if(this.currentItem.allocation_type == 'sales_ratio')
            // {
            //     var outlet = this.options.banner[0].options.filter(entry => this.currentItem.outlet.includes(entry.value));
            //     this.currentItem.periodcode = this.options.period_code[0].value;
            //     var allocation = [];
            //     if(this.currentItem.action == 'add')
            //     {
            //         for(var obj of outlet)
            //         {
            //             obj.sales_ratio = obj.sales_ratio ? obj.sales_ratio : 0;
            //             obj.manual_ratio = obj.manual_ratio ? obj.manual_ratio : 0;
            //             allocation.push(obj);
            //         }

            //         // add periodcode for new allocation
            //         let newAllocation = [];
            //         for (const period of this.options.period_code) {
            //             allocation.forEach(entry => {
            //                 newAllocation.push({ ...entry, periodcode: period.value });
            //             });
            //         }
            //         allocation = newAllocation;
            //     }
            //     else if(this.currentItem.action == 'edit')
            //     {
            //         if(!this.currentItem.temp_allocation) this.currentItem.temp_allocation = [];
            //         for(var obj of outlet)
            //         {
            //             allocation.push(obj);
            //         }

            //         let newAllocation = [];
            //         for (const period of this.options.period_code) {
            //             allocation.forEach(entry => {
            //                 newAllocation.push({ ...entry, periodcode: period.value });
            //             });
            //         }
            //         allocation = newAllocation;

            //         for(const item of allocation)
            //         {
            //             const match = this.currentItem.temp_allocation.find(entry=>entry.concept_guid == item.concept_guid && entry.retailer_outlet_guid == item.retailer_outlet_guid && entry.periodcode == item.periodcode);
            //             if(match)
            //             {
            //                 item.sales_ratio = match.sales_ratio;
            //                 item.manual_ratio = match.manual_ratio;
            //                 item.edc_child_allocation_guid = match.edc_child_allocation_guid;
            //                 item.periodcode = match.periodcode;
            //             }
            //             else
            //             {
            //                 item.sales_ratio = item.sales_ratio ? item.sales_ratio : 0;
            //                 item.manual_ratio = item.manual_ratio ? item.manual_ratio : 0;
            //             }
            //         }
            //     }                

            //     this.currentItem.temp_allocation = allocation;
            // }
            this.currentItem.table = "allocation";
            this.dialog.table = true;
        },
        handleCloseTable()
        {
            if(this.currentItem.table == 'ratio')
            {
                var total = this.currentItem.total.find(entry=>entry.name == 'total').data;
                if(total != 100)
                {
                    this.showNotify('negative','Total ratio must equal to 100.');
                    return;
                }
            }
            else if(this.currentItem.table == 'allocation')
            {

                if(this.currentItem.allocation_type == 'manual')
                {
                    var total = this.currentItem.total.find(entry=>entry.name == 'total').data;
                    if(total != parseFloat(this.currentItem.amount))
                    {
                        this.showNotify('negative',`Total allocation must equal to ${this.currentItem.amount}.`);
                        return;
                    }
                }
                else if(this.currentItem.allocation_type == 'sales_ratio')
                {
                    if(!this.currentItem.periodcode || this.currentItem.periodcode == "")
                    {
                        this.showNotify('negative','Please select period code.');
                        return;
                    }
                    // for(const period of this.options.period_code)
                    // {
                    //     var totalSales = 0;
                    //     var totalManual = 0;
                    //     const period_allocation = this.currentItem.temp_allocation.filter(entry=>entry.periodcode == period.value);
                    //     period_allocation.map(entry=>{
                    //         totalSales+=parseFloat(entry.sales_ratio);
                    //         totalManual+=parseFloat(entry.manual_ratio);
                    //     })

                    //     if(totalSales != 100)
                    //     {
                    //         this.showNotify('negative',`Total sales ratio for ${period.label} must equal to 100.`);
                    //         return;
                    //     }
                    //     if(totalManual != 100)
                    //     {
                    //         this.showNotify('negative',`Total manual ratio for ${period.label} must equal to 100.`);
                    //         return;
                    //     }
                    // }
                    var totalSales = this.currentItem.total.find(entry=>entry.name == 'total_sales').data;
                    if(totalSales != 100)
                    {
                        this.showNotify('negative',`Total sales ratio must equal to 100`);
                        return;
                    }

                    var totalManual = this.currentItem.total.find(entry=>entry.name == 'total_manual').data;
                    if(totalManual != 100)
                    {
                        this.showNotify('negative',`Total manual ratio must equal to 100`);
                        return;
                    }
                }
            }
            this.dialog.table = false;
        },
        handleAdd()
        {
            this.currentItem.action = "add";
            this.currentItem.amount = "0.00";
            this.currentItem.description = "";
            this.currentItem.outlet = [];
            this.getOutlet();
            this.getDivision();
            if(this.json.type == 'edc')
            {
                this.options.period_code = this.generatePeriodCode();
                if(!this.options.period_code) return;

                this.currentItem.division_guid = "";
                this.currentItem.periodcode = this.options.period_code[0].value;
                this.currentItem.allocation_type = 'manual';
                this.currentItem.ratio_type = "subdept";
                this.currentItem.ratio = [];
                this.table_data.ratio = [];
                this.table_data.allocation = [];
                this.getDescription();
            }
            else
            {
                this.currentItem.itemcode = "";
            }
            this.dialog.child = true;
        },
        async handleEdit(payload)
        {
            this.loading.page = true;

            await this.getOutlet();
            await this.getDivision();

            if(this.json.type == 'edc')
            {
                // get all fields options
                this.options.period_code = this.generatePeriodCode();
                if(!this.options.period_code) return;

                this.getDescription();
                await this.handleChangeDivision(payload.row.division_guid);

                const ratio_type = payload.row.ratio_info.length > 0 ? payload.row.ratio_info[0].type : "subdept";
                await this.handleChangeRatioType(ratio_type);

                // assign all fields value
                this.currentItem = JSON.parse(JSON.stringify(payload.row));
                this.currentItem.ratio_type = ratio_type;
                this.currentItem.banner = "all";
                this.currentItem.periodcode = payload.row.allocation_info.length > 0 ? payload.row.allocation_info[0].periodcode : this.options.period_code[0].value;

                // assign subdept_guid if ratio type is subdept and category_guid if ratio type is category
                if(payload.row.ratio_info.length > 0 && ratio_type == 'subdept')
                {
                    this.currentItem.ratio = payload.row.ratio_info.map(entry=>entry.subdept_guid);
                }                
                else if(payload.row.ratio_info.length > 0 && ratio_type == 'category')
                {
                    this.currentItem.ratio = payload.row.ratio_info.map(entry=>entry.category_guid);
                }                
                else
                {
                    this.currentItem.ratio = [];
                }
                this.table_function_ratio();

                // assign concept_outlet_guid (value of outlet options) to outlet field
                var match_option = [];
                // if(this.currentItem.allocation_type == 'manual')
                // {
                    for(const item of this.currentItem.allocation_info)
                    {
                        const match = this.options.outlet.find(entry=>entry.concept_guid == item.concept_guid && entry.retailer_outlet_guid == item.retailer_outlet_guid);
                        if(match) match_option.push(match);
                    }
                // }
                // else if(this.currentItem.allocation_type == 'sales_ratio')
                // {
                //     const allocation = JSON.parse(JSON.stringify(payload.row.allocation_info));
                //     for(const item of allocation)
                //     {
                //         const match = this.options.outlet.find(entry=>entry.concept_guid == item.concept_guid && entry.retailer_outlet_guid == item.retailer_outlet_guid);
                //         if(match)
                //         {
                //             var obj = JSON.parse(JSON.stringify(match));
                //             obj.sales_ratio = item.sales_ratio;
                //             obj.manual_ratio = item.manual_ratio;
                //             obj.edc_child_allocation_guid = item.edc_child_allocation_guid;
                //             obj.periodcode = item.periodcode;
                //             match_option.push(obj);
                //         };
                //     }
                //     this.currentItem.temp_allocation = match_option;
                // }
                
                this.currentItem.outlet = match_option.length > 0 ? [...new Set(match_option.map(entry=>entry.value))] : [];
                this.table_function_allocation();

                console.log(this.currentItem)
            }
            else
            {
                this.currentItem = JSON.parse(JSON.stringify(payload.row));
                this.currentItem.banner = "all";
                this.currentItem.outlet = this.currentItem.retailer_outlet_guid;
                console.log(this.currentItem)
            }
            this.currentItem.action = "edit";
            this.dialog.child = true;
            this.loading.page = false;
        },
        handleDelete(payload)
        {
            this.currentItem.allocation_info = payload.row.allocation_info;
            this.currentItem.ratio_info = payload.row.ratio_info;
            this.currentItem.claim_child_guid = this.claim_type == 'edc' ? payload.row.edc_child_guid : payload.row.pd_child_guid;
            this.currentItem.message = "Are you sure want to delete this record?";
            this.currentItem.action = 'delete';
            this.dialog.confirm = true;
        },
        async handleDeleteChild()
        {
            this.loading.dialog = true;

            if(this.claim_type == 'edc')
            {
                // delete child ratio
                if(this.currentItem.ratio_info.length>0)
                {
                    var payload = {
                        pass_json: this.currentItem.ratio_info.map(entry=>({edc_child_ratio_guid: entry.edc_child_ratio_guid})),
                    }

                    var pass_obj = {
                        "dispatch": 'claim/trigger_delete_edc_child_ratio_bulk',
                        "getter": 'claim/get_edc_child_ratio',
                        "app": this,
                        "payload": payload,
                    };

                    var data_response = await this.$dispatch(pass_obj);

                    if(!data_response.status)
                    {
                        console.log(data_response);
                        this.showNotify('negative', 'Delete ratio failed.');
                        return false;
                    }
                }

                // delete child allocation
                if(this.currentItem.allocation_info.length>0)
                {
                    var payload = {
                        pass_json: this.currentItem.allocation_info.map(entry=>({edc_child_allocation_guid: entry.edc_child_allocation_guid})),
                    }

                    var pass_obj = {
                        "dispatch": 'claim/trigger_delete_edc_child_allocation_bulk',
                        "getter": 'claim/get_edc_child_allocation',
                        "app": this,
                        "payload": payload,
                    };

                    var data_response = await this.$dispatch(pass_obj);

                    if(!data_response.status)
                    {
                        console.log(data_response);
                        this.showNotify('negative', 'Delete allocation failed.');
                        return false;
                    }
                }

                // delete EDC child
                var payload = {
                    edc_child_guid: this.currentItem.claim_child_guid,
                }

                var pass_obj = {
                    "dispatch": 'claim/trigger_delete_edc_child',
                    "getter": 'claim/get_edc_child',
                    "app": this,
                    "payload": payload,
                };
            }
            else if(this.claim_type == 'pd')
            {
                // delete PD child
                var payload = {
                    pd_child_guid: this.currentItem.claim_child_guid,
                }

                var pass_obj = {
                    "dispatch": 'claim/trigger_delete_pd_child',
                    "getter": 'claim/get_pd_child',
                    "app": this,
                    "payload": payload,
                };
            }            

            var data_response = await this.$dispatch(pass_obj);
            if(!data_response.status)
            {
                this.showNotify('negative','Delete failed.');
                this.loading.dialog = false;
                console.log(data_response);
                return ;
            }

            this.showNotify('positive','Successfully deleted.');
            this.getClaim();
            this.loading.dialog = false;
            this.dialog.confirm = false;
        },
        async handleChild()
        {
            this.loading.dialog = true;
            
            const valid = await this.$refs.save_child.validate();
            console.log(valid)
            if(!valid)
            {
                this.showNotify('negative', "Please fill in all required fields.");
                this.loading.dialog = false;
                return;
            }

            if(this.claim_type == 'edc')
            {
                if(Array.isArray(this.table_data.ratio))
                {
                    this.showNotify('negative', `Please click Ratio button to fill in ${this.currentItem.ratio_type} ratio.`);
                    this.loading.dialog = false;
                    return;
                }

                if(Array.isArray(this.table_data.allocation))
                {
                    this.showNotify('negative', `Please click Allocation button to fill in outlet allocation.`);
                    this.loading.dialog = false;
                    return;
                }

                var payload = {
                    pass_json: {
                        "allocation_type": this.currentItem.allocation_type,
                        "description": this.currentItem.description,
                        "amount": parseFloat(this.currentItem.amount),
                        "total_amount": parseFloat(this.currentItem.amount),
                        "total_incl_tax": parseFloat(this.currentItem.amount),
                        "qty": 1,
                        "rate": 1,
                        "type": "RM",
                        "tax_code": "",
                        "tax_rate": "0.00",
                        "tax_amount": "0.00",
                        "updated_by": this.username,
                        "edc_guid": this.currentClaim,
                        "division_guid": this.currentItem.division_guid,
                        "glcode_guid": this.currentItem.glcode_guid,
                    }
                }

                // handle create edc child processs
                if(this.currentItem.action == 'add')
                {
                    payload.pass_json.created_by = this.username;
                    payload.pass_json.line = this.table_data.child.data.results.length + 1;

                    var pass_obj = {
                        "dispatch": 'claim/trigger_create_edc_child',
                        "getter": 'claim/get_edc_child',
                        "app": this,
                        "payload": payload,
                    };

                    var data_response = await this.$dispatch(pass_obj);

                    if(!data_response.status)
                    {
                        console.log(data_response);
                        this.showNotify('negative', 'Add failed.');
                        this.loading.dialog = false;
                        return;
                    }

                    console.log(data_response);
                    const edc_child_guid = data_response.response.edc_child_guid;

                    const response = await this.saveRatioAllocation(edc_child_guid);
                    if(!response)
                    {
                        this.loading.dialog = false;
                        return;
                    }

                    this.showNotify('positive','Successfully added.');
                }

                // handle edit edc child process
                else if(this.currentItem.action == 'edit')
                {
                    payload.edc_child_guid = this.currentItem.edc_child_guid;
                    payload.pass_json.line = this.currentItem.line;
                    console.log(payload)
                    var pass_obj = {
                        "dispatch": 'claim/trigger_update_edc_child',
                        "getter": 'claim/get_edc_child',
                        "app": this,
                        "payload": payload,
                    };

                    var data_response = await this.$dispatch(pass_obj);

                    if(!data_response.status)
                    {
                        console.log(data_response);
                        this.showNotify('negative', 'Edit failed.');
                        this.loading.dialog = false;
                        return;
                    }
                    console.log(data_response);

                    const response = await this.saveRatioAllocation(this.currentItem.edc_child_guid);
                    if(!response)
                    {
                        this.loading.dialog = false;
                        return;
                    }

                    this.showNotify('positive','Successfully updated.');
                }
                this.getClaim();
                this.dialog.child = false;
            }
            else if(this.claim_type == 'pd')
            {
                var payload = {
                    pass_json: [],
                }
                
                if(this.currentItem.action == 'add')
                {
                    var outlet =  this.options.banner[0].options.filter(entry => this.currentItem.outlet.includes(entry.value)).filter((obj, index, self) => index === self.findIndex((entry) => (entry.value === obj.value)));
                            
                    for(const obj of outlet)
                    {
                        payload.pass_json.push({
                            "outlet_code": obj.code,
                            "line": this.table_data.child.data.results.length + 1,
                            "itemcode": this.currentItem.itemcode,
                            "description": this.currentItem.description,
                            "total_amount": parseFloat(this.currentItem.amount),
                            "total_incl_tax": parseFloat(this.currentItem.amount),
                            "amount": parseFloat(this.currentItem.amount),
                            "qty": 1,
                            "rate": 1,
                            "type": "RM",
                            "tax_code": "",
                            "tax_rate": "0.00",
                            "tax_amount": "0.00",
                            "created_by": this.username,
                            "updated_by": this.username,
                            "pd_guid": this.currentClaim,
                            "retailer_outlet_guid": obj.retailer_outlet_guid,
                            "division_guid": this.currentItem.division_guid,
                        })
                    }

                    var pass_obj = {
                        "dispatch": 'claim/trigger_create_pd_child_bulk',
                        "getter": 'claim/get_pd_child',
                        "app": this,
                        "payload": payload,
                    };
                }
                else if(this.currentItem.action == 'edit')
                {
                    var outlet = this.options.banner[0].options.find(entry => this.currentItem.outlet == entry.value);
                    var payload = {
                        pd_child_guid: this.currentItem.pd_child_guid,
                        pass_json: {
                            "outlet_code": outlet.code,
                            "line": this.currentItem.line,
                            "itemcode": this.currentItem.itemcode,
                            "description": this.currentItem.description,
                            "total_amount": parseFloat(this.currentItem.amount),
                            "total_incl_tax": parseFloat(this.currentItem.amount),
                            "amount": parseFloat(this.currentItem.amount),
                            "qty": 1,
                            "rate": 1,
                            "type": "RM",
                            "tax_code": "",
                            "tax_rate": "0.00",
                            "tax_amount": "0.00",
                            "updated_by": this.username,
                            "pd_guid": this.currentClaim,
                            "retailer_outlet_guid": outlet.retailer_outlet_guid,
                            "division_guid": this.currentItem.division_guid,
                        }
                    }

                    var pass_obj = {
                        "dispatch": 'claim/trigger_update_pd_child',
                        "getter": 'claim/get_pd_child',
                        "app": this,
                        "payload": payload,
                    };
                }

                var data_response = await this.$dispatch(pass_obj);

                if(!data_response.status)
                {
                    console.log(data_response);
                    this.showNotify('negative', 'Create failed.');
                    this.loading.dialog = false;
                    return;
                }

                this.showNotify('positive',`Successfully ${this.currentItem.action == 'add' ? 'created' : 'updated'}.`);
                this.getClaim();
                this.dialog.child = false;
            }
            this.loading.dialog = false;
        },
        async saveRatioAllocation(child_guid)
        {
            if(this.currentItem.action == 'add')
            {
                // CREATE RATIO
                var payload = {
                    pass_json: [],
                }

                for(var obj of this.table_data.ratio.data.results)
                {
                    payload.pass_json.push({
                        "type": this.currentItem.ratio_type,
                        "code": obj.code,
                        "ratio": parseFloat(obj.ratio),
                        "created_by": this.username,
                        "updated_by": this.username,
                        "subdept_guid": this.currentItem.ratio_type == 'subdept' ? obj.subdept_guid : null,
                        "category_guid": this.currentItem.ratio_type == 'category' ? obj.category_guid : null,
                        "company_guid": this.company_guid,
                        "edc_child_guid": child_guid,
                    });
                }

                var pass_obj = {
                    "dispatch": 'claim/trigger_create_edc_child_ratio_bulk',
                    "getter": 'claim/get_edc_child_ratio',
                    "app": this,
                    "payload": payload,
                };

                var data_response = await this.$dispatch(pass_obj);

                if(!data_response.status)
                {
                    console.log(data_response);
                    this.showNotify('negative', 'Add ratio failed.');
                    return false;
                }

                // CREATE ALLOCATION
                var payload = {
                    pass_json: [],
                }

                // const allocation = this.currentItem.allocation_type == 'manual' ? this.table_data.allocation.data.results : this.currentItem.temp_allocation;
                const allocation = this.table_data.allocation.data.results;

                for(var obj of allocation)
                {
                    payload.pass_json.push({
                        "outlet_code": obj.code,
                        "outlet_name": obj.name,
                        "type": this.currentItem.allocation_type,
                        "periodcode": this.currentItem.periodcode,
                        "amount": obj.amount ? parseFloat(obj.amount) : null,
                        "sales_ratio": obj.sales_ratio ? parseFloat(obj.sales_ratio) : null,
                        "manual_ratio": obj.manual_ratio ? parseFloat(obj.manual_ratio) : null,
                        "created_by": this.username,
                        "updated_by": this.username,
                        "edc_child_guid": child_guid,
                        "retailer_outlet_guid": obj.retailer_outlet_guid,
                        "concept_guid": obj.concept_guid,
                    });
                }

                var pass_obj = {
                    "dispatch": 'claim/trigger_create_edc_child_allocation_bulk',
                    "getter": 'claim/get_edc_child_allocation',
                    "app": this,
                    "payload": payload,
                };

                var data_response = await this.$dispatch(pass_obj);

                if(!data_response.status)
                {
                    console.log(data_response);
                    this.showNotify('negative', 'Add allocation failed.');
                    return false;
                }
            }
            else if(this.currentItem.action == 'edit')
            {
                // EDIT RATIO
                var original_ratio = this.currentItem.ratio_info;
                var new_ratio = this.table_data.ratio.data.results;

                // console.log("original",original_ratio)
                // console.log("new",new_ratio)

                // delete existing ratio that not included in new ratio
                var deleteTask = this.currentItem.ratio_type == 'subdept' 
                    ? original_ratio.filter(entry => !new_ratio.map(entry=>entry.subdept_guid).includes(entry.subdept_guid))
                    : this.currentItem.ratio_type == 'category' 
                    ? original_ratio.filter(entry => !new_ratio.map(entry=>entry.category_guid).includes(entry.category_guid))
                    : [];

                if(deleteTask.length>0)
                {
                    console.log('delete',deleteTask);
                    var payload = {
                        pass_json: deleteTask.map(entry=>({edc_child_ratio_guid: entry.edc_child_ratio_guid})),
                    }

                    var pass_obj = {
                        "dispatch": 'claim/trigger_delete_edc_child_ratio_bulk',
                        "getter": 'claim/get_edc_child_ratio',
                        "app": this,
                        "payload": payload,
                    };

                    var data_response = await this.$dispatch(pass_obj);

                    if(!data_response.status)
                    {
                        console.log(data_response);
                        this.showNotify('negative', 'Delete ratio failed.');
                        return false;
                    }
                }

                // create new ratio which does not have edc_child_ratio_guid yet
                var createTask = new_ratio.filter(entry => !entry.edc_child_ratio_guid);

                if(createTask.length>0)
                {
                    console.log('create',createTask);
                    var payload = {
                        pass_json: [],
                    }

                    for(const obj of createTask)
                    {
                        payload.pass_json.push({
                            "type": this.currentItem.ratio_type,
                            "code": obj.code,
                            "ratio": parseFloat(obj.ratio),
                            "created_by": this.username,
                            "updated_by": this.username,
                            "subdept_guid": this.currentItem.ratio_type == 'subdept' ? obj.subdept_guid : null,
                            "category_guid": this.currentItem.ratio_type == 'category' ? obj.category_guid : null,
                            "company_guid": this.company_guid,
                            "edc_child_guid": child_guid,
                        })
                    }

                    var pass_obj = {
                        "dispatch": 'claim/trigger_create_edc_child_ratio_bulk',
                        "getter": 'claim/get_edc_child_ratio',
                        "app": this,
                        "payload": payload,
                    };

                    var data_response = await this.$dispatch(pass_obj);

                    if(!data_response.status)
                    {
                        console.log(data_response);
                        this.showNotify('negative', 'Create ratio failed.');
                        return false;
                    }
                }

                // edit ratio that included in both old and new ratio
                var editTask = this.currentItem.ratio_type == 'subdept' 
                    ? new_ratio.filter(new_entry => original_ratio.map(original_entry=>original_entry.subdept_guid).includes(new_entry.subdept_guid))
                    : this.currentItem.ratio_type == 'category'
                    ? new_ratio.filter(new_entry => original_ratio.map(original_entry=>original_entry.category_guid).includes(new_entry.category_guid))
                    : [];

                if(editTask.length>0)
                {
                    console.log("edit",editTask);
                    var payload = {
                        pass_json: [],
                    }

                    for(const obj of editTask)
                    {
                        payload.pass_json.push({
                            "type": this.currentItem.ratio_type,
                            "code": obj.code,
                            "ratio": parseFloat(obj.ratio),
                            "created_by": this.username,
                            "updated_by": this.username,
                            "subdept_guid": this.currentItem.ratio_type == 'subdept' ? obj.subdept_guid : null,
                            "category_guid": this.currentItem.ratio_type == 'category' ? obj.category_guid : null,
                            "company_guid": this.company_guid,
                            "edc_child_guid": child_guid,
                            "edc_child_ratio_guid": obj.edc_child_ratio_guid,
                        })
                    }

                    var pass_obj = {
                        "dispatch": 'claim/trigger_update_edc_child_ratio_bulk',
                        "getter": 'claim/get_edc_child_ratio',
                        "app": this,
                        "payload": payload,
                    };

                    var data_response = await this.$dispatch(pass_obj);

                    if(!data_response.status)
                    {
                        console.log(data_response);
                        this.showNotify('negative', 'Update ratio failed.');
                        return false;
                    }
                }

                // EDIT ALLOCATION
                var original_allocation = this.currentItem.allocation_info;
                // var new_allocation = this.currentItem.allocation_type == 'manual' ? this.table_data.allocation.data.results : this.currentItem.temp_allocation;
                var new_allocation = this.table_data.allocation.data.results;

                // console.log("original",original_allocation)
                // console.log("new",new_allocation)

                // delete existing allocation that not included in new allocation
                // var deleteTask = original_allocation.filter(original_entry => !new_allocation.find(new_entry => new_entry.concept_guid == original_entry.concept_guid && new_entry.retailer_outlet_guid == original_entry.retailer_outlet_guid && new_entry.periodcode == original_entry.periodcode));
                var deleteTask = original_allocation.filter(original_entry => !new_allocation.find(new_entry => new_entry.concept_guid == original_entry.concept_guid && new_entry.retailer_outlet_guid == original_entry.retailer_outlet_guid ));

                if(deleteTask.length>0)
                {
                    console.log('delete',deleteTask);
                    var payload = {
                        pass_json: deleteTask.map(entry=>({edc_child_allocation_guid: entry.edc_child_allocation_guid})),
                    }

                    var pass_obj = {
                        "dispatch": 'claim/trigger_delete_edc_child_allocation_bulk',
                        "getter": 'claim/get_edc_child_allocation',
                        "app": this,
                        "payload": payload,
                    };

                    var data_response = await this.$dispatch(pass_obj);

                    if(!data_response.status)
                    {
                        console.log(data_response);
                        this.showNotify('negative', 'Delete allocation failed.');
                        return false;
                    }
                }

                // create new allocation which does not have edc_child_allocation_guid yet
                var createTask = new_allocation.filter(entry => !entry.edc_child_allocation_guid);;

                if(createTask.length>0)
                {
                    console.log('create',createTask)
                    var payload = {
                        pass_json: [],
                    }

                    for(const obj of createTask)
                    {
                        payload.pass_json.push({
                            "outlet_code": obj.code,
                            "outlet_name": obj.name,
                            "type": this.currentItem.allocation_type,
                            "periodcode": this.currentItem.periodcode,
                            "amount": obj.amount ? parseFloat(obj.amount) : null,
                            "sales_ratio": obj.sales_ratio ? parseFloat(obj.sales_ratio) : null,
                            "manual_ratio": obj.manual_ratio ? parseFloat(obj.manual_ratio) : null,
                            "created_by": this.username,
                            "updated_by": this.username,
                            "edc_child_guid": child_guid,
                            "retailer_outlet_guid": obj.retailer_outlet_guid,
                            "concept_guid": obj.concept_guid,
                        })
                    }

                    var pass_obj = {
                        "dispatch": 'claim/trigger_create_edc_child_allocation_bulk',
                        "getter": 'claim/get_edc_child_allocation',
                        "app": this,
                        "payload": payload,
                    };

                    var data_response = await this.$dispatch(pass_obj);

                    if(!data_response.status)
                    {
                        console.log(data_response);
                        this.showNotify('negative', 'Create allocation failed.');
                        return false;
                    }
                }

                // edit allocation that included in both old and new allocation
                // var editTask = new_allocation.filter(new_entry => original_allocation.find(original_entry=> original_entry.concept_guid == new_entry.concept_guid && original_entry.retailer_outlet_guid == new_entry.retailer_outlet_guid && new_entry.periodcode == original_entry.periodcode));
                var editTask = new_allocation.filter(new_entry => original_allocation.find(original_entry=> original_entry.concept_guid == new_entry.concept_guid && original_entry.retailer_outlet_guid == new_entry.retailer_outlet_guid));

                if(editTask.length>0)
                {
                    console.log("edit",editTask);
                    var payload = {
                        pass_json: [],
                    }

                    for(const obj of editTask)
                    {
                        payload.pass_json.push({
                            "outlet_code": obj.code,
                            "outlet_name": obj.name,
                            "type": this.currentItem.allocation_type,
                            "periodcode": this.currentItem.periodcode,
                            "amount": obj.amount ? parseFloat(obj.amount) : null,
                            "sales_ratio": obj.sales_ratio ? parseFloat(obj.sales_ratio) : null,
                            "manual_ratio": obj.manual_ratio ? parseFloat(obj.manual_ratio) : null,
                            "created_by": this.username,
                            "updated_by": this.username,
                            "edc_child_guid": child_guid,
                            "retailer_outlet_guid": obj.retailer_outlet_guid,
                            "concept_guid": obj.concept_guid,
                            "edc_child_allocation_guid": obj.edc_child_allocation_guid,
                        })
                    }

                    var pass_obj = {
                        "dispatch": 'claim/trigger_update_edc_child_allocation_bulk',
                        "getter": 'claim/get_edc_child_allocation',
                        "app": this,
                        "payload": payload,
                    };

                    var data_response = await this.$dispatch(pass_obj);

                    if(!data_response.status)
                    {
                        console.log(data_response);
                        this.showNotify('negative', 'Update allocation failed.');
                        return false;
                    }
                }
            }
            return true;
        },
        async saveEDC()
        {
            this.loading.page = true;

            const valid = await this.$refs.save_form.validate();
            if(!valid)
            {
                this.showNotify('negative', "Please fill in all required fields.");
                return;
            }

            var payload = {
                pass_json: {
                    "date": this.json.date,
                    "pic": this.json.tta_pic,
                    "pic_designation": this.json.tta_designation,
                    "effective_date_from": this.json.effective_date_from,
                    "effective_date_to": this.json.effective_date_to,
                    "billing_type": this.json.billing_type,
                    "remarks": this.json.remarks,
                    "vendor_code": this.json.vendor_code,
                    "address_1": this.json.address_1,
                    "address_2": this.json.address_2,
                    "address_3": this.json.address_3,
                    "updated_by": this.username,
                    "supplier_guid": this.json.supplier_guid,
                    "tta_guid": this.json.tta_guid,
                    "company_info_guid": this.json.company_info_guid,
                    "company_guid": this.company_guid,
                },
            }

            if(this.claim_type == 'pd') payload.pass_json.type = this.json.type;

            if(this.page_function == 'create')
            {
                payload.pass_json.created_by = this.username;

                if(this.claim_type == 'pd')
                {
                    var pass_obj = {
                        "dispatch": 'claim/trigger_create_pd',
                        "getter": 'claim/get_pd',
                        "app": this,
                        "payload": payload,
                    };
                }
                else if(this.claim_type == 'edc')
                {
                    var pass_obj = {
                        "dispatch": 'claim/trigger_create_edc',
                        "getter": 'claim/get_edc',
                        "app": this,
                        "payload": payload,
                    };
                }                

                var data_response = await this.$dispatch(pass_obj);

                if(!data_response.status)
                {
                    console.log(data_response);
                    if(data_response.response.message)
                    {
                        this.showNotify('negative', data_response.response.message);
                    }
                    else
                    {
                        this.showNotify('negative', 'Create failed.');
                    }
                    this.loading.page = false;
                    return ;
                }

                this.showNotify('positive','Successfully created.');
                if(this.claim_type == 'edc')
                    this.$router.push({name: 'editEDC', query: { guid: data_response.response.edc_guid }});

                else if(this.claim_type == 'pd')
                    this.$router.push({name: 'editPD', query: { guid: data_response.response.pd_guid }});
            }
            else if(this.page_function == 'edit')
            {
                if(this.claim_type == 'pd')
                {
                    payload.pd_guid = this.json.pd_guid;

                    var pass_obj = {
                        "dispatch": 'claim/trigger_update_pd',
                        "getter": 'claim/get_pd',
                        "app": this,
                        "payload": payload,
                    };
                }
                else if(this.claim_type == 'edc')
                {
                    payload.edc_guid = this.json.edc_guid;

                    var pass_obj = {
                        "dispatch": 'claim/trigger_update_edc',
                        "getter": 'claim/get_edc',
                        "app": this,
                        "payload": payload,
                    };
                }

                var data_response = await this.$dispatch(pass_obj);

                if(!data_response.status)
                {
                    console.log(data_response);
                    if(data_response.response.message)
                    {
                        this.showNotify('negative', data_response.response.message);
                    }
                    else
                    {
                        this.showNotify('negative', 'Update failed.');
                    }
                    this.loading.page = false;
                    return ;
                }

                this.showNotify('positive','Successfully updated.');
                if(this.claim_type == 'edc')
                    this.$router.push({name: 'edc'});

                else if(this.claim_type == 'pd')
                    this.$router.push({name: 'pd'});
            }
        },
        async updateStatus(status)
        {
            this.loading.dialog = true;

            if(status == 'post')
            {
                var payload = {
                    pass_json: {
                        posted: 1,
                        posted_by: this.username,
                    }
                }
            }
            else if(status == 'reject')
            {
                var payload = {
                    pass_json: {
                        rejected: 1,
                        reject_by: this.username,
                    }
                }
            }
            else if(status == 'approve')
            {
                var payload = {
                    pass_json: {
                        approved: 1,
                        approved_by: this.username,
                    }
                }
            }

            if(this.claim_type == 'pd')
            {
                payload.pd_guid = this.currentClaim;

                var pass_obj = {
                    "dispatch": 'claim/trigger_update_pd',
                    "getter": 'claim/get_pd',
                    "app": this,
                    "payload": payload,
                };
            }
            else if(this.claim_type == 'edc')
            {
                payload.edc_guid = this.currentClaim;

                var pass_obj = {
                    "dispatch": 'claim/trigger_update_edc',
                    "getter": 'claim/get_edc',
                    "app": this,
                    "payload": payload,
                };
            }

            var data_response = await this.$dispatch(pass_obj);
            
            if(!data_response.status)
            {
                console.log(data_response);
                this.showNotify('negative', 'Update status failed.');
                return;
            }

            this.showNotify('positive','Update status successfully');
            this.$router.push({name: this.claim_type})
            this.dialog.confirm = false;
            this.loading.dialog = false;
        },
        async uploadClaim()
        {
            this.loading.dialog = true;
            
            if(this.currentItem.files.length <= 0)
            {
                this.showNotify("negative","No file chosen.");
                this.loading.dialog = false;
                return;
            }

            var payload = {
                pass_json: [],
            };

            if(this.claim_type == 'edc')
            {
                for(const file of this.currentItem.files)
                {
                    var formData = new FormData();
                    formData.append("file", file);
                    formData.append("edc_guid", this.currentClaim);
                    formData.append("updated_by", this.username);
                    formData.append("created_by", this.username);
                    formData.append("company_guid", this.company_guid);
                    payload.pass_json = formData;
                    
                    var pass_obj = {
                        "dispatch": 'claim/trigger_create_edc_upload',
                        "getter": 'claim/get_edc',
                        "app": this,
                        "payload": payload,
                    };
                    var data_response = await this.$dispatch(pass_obj);
                    if(!data_response.status)
                    {
                        this.showNotify('negative','Upload files failed. Try again.');
                        console.log(data_response.response);
                        this.loading.dialog = false;
                        return;
                    }
                }
            }
            else if(this.claim_type == 'pd')
            {
                for(const file of this.currentItem.files)
                {
                    var formData = new FormData();
                    formData.append("file", file);
                    formData.append("pd_guid", this.currentClaim);
                    formData.append("updated_by", this.username);
                    formData.append("created_by", this.username);
                    formData.append("company_guid", this.company_guid);
                    payload.pass_json = formData;
                    
                    var pass_obj = {
                        "dispatch": 'claim/trigger_create_pd_upload',
                        "getter": 'claim/get_pd',
                        "app": this,
                        "payload": payload,
                    };

                    var data_response = await this.$dispatch(pass_obj);
                    if(!data_response.status)
                    {
                        this.showNotify('negative','Upload files failed. Try again.');
                        console.log(data_response.response);
                        this.loading.dialog = false;
                        return;
                    }
                }
            }

            this.showNotify('positive','Upload files successfully.');
            this.table_function_attachment(this.ori_params.attachment);
            this.loading.dialog = false;
            this.dialog.upload = false;
        },
        viewFile(payload){
            window.open(payload.row.file, '_blank')
        },
        downloadFile(payload)
        {
            // Specify the HTTP URL of the image to download
            var url = payload.row.file; 
            var filename = url.split('/').pop();

            // Create an XHR to fetch the image data as a Blob
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.responseType = 'blob';
            xhr.onload = () => {
                if (xhr.status === 200) {
                var blob = new Blob([xhr.response]); // Set the MIME type of the image
                var url = URL.createObjectURL(blob);
                // Create an anchor element to trigger the download
                var link = document.createElement('a');
                link.href = url;
                link.download = filename; // Specify the filename for the download
                link.click();
                // Clean up the Blob and anchor element
                URL.revokeObjectURL(url);
                }
            };
            xhr.send();
        },
        deleteFile(payload)
        {
            this.currentItem = payload.row;
            this.currentItem.action = 'deleteFile';
            this.currentItem.message = `Are you sure want to delete ${payload.row.filename} attachment?`;
            this.dialog.confirm = true;
        },
        async handleDeleteFile()
        {
            if(this.claim_type == 'pd')
            {
                var pass_obj = {
                    "dispatch": 'claim/trigger_delete_pd_upload',
                    "getter": 'claim/get_pd',
                    "app": this,
                    "payload": {
                        "pd_upload_guid": this.currentItem.pd_upload_guid,
                    },
                };
            }
            else if(this.claim_type == 'edc')
            {
                var pass_obj = {
                    "dispatch": 'claim/trigger_delete_edc_upload',
                    "getter": 'claim/get_edc',
                    "app": this,
                    "payload": {
                        "edc_upload_guid": this.currentItem.edc_upload_guid,
                    },
                };
            }

            var data_response = await this.$dispatch(pass_obj);

            if(!data_response.status)
            {
                this.showNotify('negative','Delete file failed.');
                console.log(data_response);
                return;
            }

            this.showNotify('positive','Delete file successfully.');
            this.table_function_attachment(this.ori_params.attachment);
            this.currentItem = {};
            this.dialog.confirm = false;
        },
        async getClaim()
        {
            if(this.claim_type == 'edc')
            {
                var pass_obj = {
                    "dispatch": 'claim/trigger_get_edc',
                    "getter": 'claim/get_edc',
                    "app": this,
                    "payload": {
                        "edc_guid": this.currentClaim
                    },
                }
            }
            else if(this.claim_type == 'pd')
            {
                var pass_obj = {
                    "dispatch": 'claim/trigger_get_pd',
                    "getter": 'claim/get_pd',
                    "app": this,
                    "payload": {
                        "pd_guid": this.currentClaim
                    },
                }
            }

            var claim = await this.$dispatch(pass_obj);

            if(!claim.status)
            {
                this.showNotify('negative', "Failed to get claim details.");
                if(this.claim_type == 'edc')
                    this.$router.push({name: "edc"});
                else if(this.claim_type == 'pd')
                    this.$router.push({name: "pd"});
            }

            var json = claim.response.data;
            if(this.claim_type == 'edc') json.type = 'edc';
            
            if(json.posted == 1 || json.approved == 1)
            {
                this.readonlyStatus = true;
            }

            this.options.supplier.push({
                label: `${json.vendor_code} - ${json.vendor_name}`,
                value: json.supplier_guid,
                supplier_guid: json.supplier_guid,
            })

            this.handleChangeVendor(json.supplier_guid);
            this.table_function(this.ori_params.child);
            this.json = json;
            this.prev_json = JSON.parse(JSON.stringify(json));
        },
        async getTTA(){
            if(!this.json.supplier_guid || this.json.supplier_guid == "")
            {
                return [];
            }

            this.loading.tta = true;
            console.log('get tta list');

            var payload = {
                params: {
                    "limit": 99999,
                    "ordering": 'refno',
                    "supplier_to": this.json.supplier_guid,
                    "approved": 1,
                    "terminated": 0,
                    "renewed": 0,
                }
            }

            var pass_obj = {
                "dispatch": 'tta/trigger_get_tta_list',
                "getter": 'tta/get_tta',
                "app": this,
                "payload": payload,
            }

            var tta_list = await this.$dispatch(pass_obj);

            var array_options = [];
            if(tta_list.status)
            {
                for(var i in tta_list.response.data.results)
                {
                    var obj = tta_list.response.data.results[i];
                    obj.value = tta_list.response.data.results[i].tta_guid;
                    obj.label = tta_list.response.data.results[i].refno;
                    array_options.push(obj);
                }
            }
            this.options.tta = array_options;
            this.loading.tta = false;
        },
        async getSupplier()
        {
            if(this.options.supplier.length>1) return;

            this.loading.vendor = true;

            var payload = {
                params: {
                    "limit": 99999,
                    "type__in": "S,P",
                }
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
                this.options.supplier = array_options;
            }

            this.loading.vendor = false;
        },
        async getDivision()
        {
            if(this.options.division.length>0) return;

            // set division options
            var payload = {
                params: {
                    "limit": 99999,
                    "ordering": "code",
                }
            }

            var pass_obj = {
                "dispatch": 'general/trigger_get_division_list',
                "getter": 'general/get_division',
                "app": this,
                "payload": payload,
            }

            var division = await this.$dispatch(pass_obj);

            if(division.status && division.response.data.count > 0)
            {
                var array_options = [];
                for(var i in division.response.data.results)
                {
                    var obj = division.response.data.results[i];
                    obj.value = obj.division_guid;
                    obj.label = `${obj.code} - ${obj.name}`;
                    array_options.push(obj);
                }

                // get deparment list for each division
                var pass_obj = {
                    "dispatch": 'general/trigger_get_dept_list',
                    "getter": 'general/get_division',
                    "app": this,
                    "payload": payload,
                }

                var dept = await this.$dispatch(pass_obj);
                
                if(dept.status && dept.response.data.count > 0)
                {
                    array_options.forEach((entry) => {
                        entry.departments = dept.response.data.results.filter(dept => dept.division_guid == entry.division_guid).map(entry=>entry.dept_guid);
                    });
                }
                this.options.division = array_options;
            }
        },
        async getDescription()
        {
            if(this.options.description.length>0) return;

            var payload = {
                params: {
                    "limit": 99999,
                    "ordering": "name",
                    "calc_type": 'manual'
                }
            }
            
            if(this.json.tta_guid && this.json.tta_guid != "")
            {
                payload.params.tta_guid = this.json.tta_guid;

                var pass_obj = {
                    "dispatch": 'tta/trigger_get_tta_tab_article_list',
                    "getter": 'tta/get_article',
                    "app": this,
                    "payload": payload,
                }
            }
            else
            {
                var pass_obj = {
                    "dispatch": 'general/trigger_get_tab_article_list',
                    "getter": 'general/get_tab_article',
                    "app": this,
                    "payload": payload,
                }
            }

            var service_article = await this.$dispatch(pass_obj);

            if(service_article.status && service_article.response.data.count > 0)
            {
                for(var i in service_article.response.data.results)
                {
                    var obj = service_article.response.data.results[i];
                    obj.value = obj.name;
                    obj.label = obj.name;
                    this.options.description.push(obj);
                }
            }
        },
        async getOutlet()
        {
            // get all outlets only once
            if(this.list.outlet.length == 0)
            {
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
                        obj.value = this.claim_type == 'edc' ? outlet_list.response.data.results[i].concept_outlet_guid : outlet_list.response.data.results[i].retailer_outlet_guid;
                        obj.label = `${obj.code} - ${obj.name}`;
                        obj.concept_guid = outlet_list.response.data.results[i].concept_guid;
                        obj.concept = outlet_list.response.data.results[i].concept;
                        array_options.push(obj);
                    }
                    this.list.outlet = array_options;
                }
            }

            if(this.list.banner.length == 0)
            {
                var payload = {
                    params: {
                        "limit": 99999,
                        "company_info_guid": this.json.company_info_guid,
                        "isactive": 1,
                    }
                }

                var pass_obj = {
                    "dispatch": 'general/trigger_get_banner_list',
                    "getter": 'general/get_banner',
                    "app": this,
                    "payload": payload,
                }

                var banner_list = await this.$dispatch(pass_obj);

                if(banner_list.status)
                {
                    var array_options = [];
                    for(var i in banner_list.response.data.results)
                    {
                        var obj = banner_list.response.data.results[i];
                        obj.value = obj.concept_guid;
                        obj.label = `${obj.code} - ${obj.name}`;
                        obj.company_info_guid = banner_list.response.data.results[i].company_info_guid;
                        array_options.push(obj);
                    }
                    this.list.banner = array_options;
                }
            }
            
            // filter outlet based on banner list
            var options = JSON.parse(JSON.stringify(this.list.outlet.filter(entry => this.list.banner.map(banner => banner.concept_guid).includes(entry.concept_guid))));

            // get major banner included in outlet list
            const major_banner = this.list.banner
                .filter(entry => entry.concept_guid !== entry.code)
                .map(entry => [entry.concept_guid, { label: `${entry.code} - ${entry.name}`, value: entry.concept_guid }]);
            
            // make major banner unique
            const unique_banner = [...new Map(major_banner).values()].sort((a, b) => a.label.localeCompare(b.label));

            // concat major banner to banner options
            var banner_options = [{label:'Select All',value:'all'},{label:'Others',value:'else'}];
            banner_options.splice(1,0,...unique_banner);
            this.options.banner = banner_options;

            this.options.banner[0].options = options;
            // console.log(this.options.banner)
            // console.log('outlet',this.list.outlet.length);
            this.handleChangeBanner('all');
        },
        async searchItemcode(keyword)
        {
            this.loading.itemcode = true;
            console.log('itemcode',keyword);
            
            // find match itemcode
            var payload = {
                params: {
                    "limit": 50,
                    "itemcode": keyword,
                    "_column_": "itemcode,description,subdept,dept",
                }
            }

            var pass_obj = {
                "dispatch": 'general/trigger_get_itemcode_list',
                "getter": 'general/get_itemcode',
                "app": this,
                "payload": payload,
            }

            var item_list = await this.$dispatch(pass_obj);

            if(item_list.status)
            {
                var array_options = [];
                for(var item of item_list.response.data.results)
                {
                    array_options.push({
                        description: item.description,
                        itemcode: item.itemcode,
                        dept: item.dept,
                        subdept: item.subdept,
                        label: `${item.itemcode} - ${item.description}`,
                        value: item.itemcode,
                    });
                }
                this.options.itemcode = array_options;
            }
            this.loading.itemcode = false;
        },
        generatePeriodCode()
        {
            if(this.json.effective_date_from && this.json.effective_date_from != "" && this.json.effective_date_to && this.json.effective_date_to != "")
            {
                var start_date = new Date(this.json.effective_date_from);
                var end_date = new Date(this.json.effective_date_to);

                var options = [];
                var current_date = start_date;
                while(current_date <= end_date)
                {
                    const date = `${current_date.getFullYear()}-${('0' + (current_date.getMonth() + 1)).slice(-2)}`;
                    options.push({
                        label: date,
                        value: date,
                    });
                    current_date.setMonth(current_date.getMonth() + 1);
                }
                console.log("periodcode options",options)
                return options;
            }
            else
            {
                this.showNotify('negative', 'Please choose effective start date and end date.');
                return false;
            }
        },
        goBack()
        {
            if(this.claim_type == 'edc')
                this.$router.push({name: "edc"});
            else if(this.claim_type == 'pd')
                this.$router.push({name: "pd"});
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
.form
{
    font-size: 10px;
}

.header_text
{
    padding-left: 0px;
    padding-right: 16px;
    font-weight: 500;
    font-size: 14px;
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

.action_button
{
    font-size: 14px;
    background-color: #e37a05;
    color: white;
    padding: 5px;
    min-width: 100px;
}

.showLoading
{
  z-index: 3;
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

.btn_grp2 .q-btn-group {
    box-shadow: none !important;
}

.btn_grp2 .q-btn {
    padding: 0px 5px;
}

.btn_qlist {
    padding: 3px 0px !important;
}

.btn_qlist .q-item 
{
    min-height: 30px !important;
    height: 10px;
    padding: 0px;
}

.btn_drp .q-btn__content
{
    justify-content: left;
    font-size: 12px;
}

.btn_drp .q-btn .q-btn-item
{
    padding: 3px 8px !important;
}

.dialog-card {
    width: 864px !important;
    max-width: 98vw;
    text-align: center;
    margin-top: 5%;
    border-radius: 8px;
    max-height: 95vh;
}

.dialog-header {
    height: 56px;
    padding: 8px 24px;
    border-bottom: 1px solid #a7bbcb;
}

.dialog-body {
    padding: 32px 24px;
    overflow-y: auto;
    max-height: calc(85vh - 56px - 60px)
}

.dialog-footer {
    height: 60px;
    padding-top:0px;
    padding-bottom:16px;
    padding-right:16px;
}
</style>