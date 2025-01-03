<!-- TTA that display the tab_article based on component_type of article (set from tab maintenance) -->
<template>
    <div class="row q-pa-md">
        <div class="text-subtitle1 header_text col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
            Trading Term Agreement
        </div>

        <q-form ref="save_form" class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 bg-white q-my-sm">
            <div v-if="page_function == 'edit'" class="row justify-end q-px-md q-py-sm q-gutter-sm">
                <Button :pass_icon="'history'"
                    v-on:receiveClick="dialog.history = true"
                    :pass_no_caps="false"
                    :pass_square="true"
                    :pass_dense="true"
                    :tooltip="true"
                    pass_tooltip="History"
                    class="bg-primary text-white"
                />
                
                <q-btn-group class="btn_grp2" >
                    <q-btn-dropdown icon="print" rounded color="primary" split size="12px" no-caps>
                        <q-list padding class="btn_qlist">
                            <q-item clickable style="padding: 0px">
                                <q-item-section>
                                    <q-btn :disable="false" flat no-caps label="Proposed TTA" color="primary" @click="handlePrint('proposal')" class="btn_drp"/>
                                </q-item-section>
                            </q-item>
                            
                            <q-item clickable style="padding: 0px">
                                <q-item-section>
                                    <q-btn :disable="false" flat no-caps label="TTA" color="primary" @click="handlePrint('tta')" class="btn_drp"/>
                                </q-item-section>
                            </q-item>
                        </q-list>
                    </q-btn-dropdown>
                </q-btn-group>

                <q-btn-group v-if="permission.includes('authorised') || permission.includes('approved') || permission.includes('renewed') || permission.includes('rejected') || permission.includes('terminated')" class="btn_grp2" style="margin-right: 10px;">
                    <q-btn-dropdown icon="settings" rounded color="primary" split size="12px" no-caps>
                        <q-list padding class="btn_qlist">
                            <q-item v-if="permission.includes('authorised') && json.authorised == 0 && json.rejected == 0 && json.terminated == 0" clickable style="padding: 0px">
                                <q-item-section>
                                    <q-btn :disable="false" flat no-caps :label="'Authorise'" color="primary" @click="dialog.authorise = true" class="btn_drp"/>
                                </q-item-section>
                            </q-item>
                            
                            <q-item v-if="permission.includes('approved') && json.authorised == 1 && json.approved == 0 && json.rejected == 0 && json.terminated == 0" clickable style="padding: 0px">
                                <q-item-section>
                                    <q-btn :disable="false" flat no-caps :label="'Approve'" color="primary" @click="dialog.approve = true" class="btn_drp"/>
                                </q-item-section>
                            </q-item>
                            
                            <q-item v-if="permission.includes('renewed') && json.authorised == 1 && json.approved == 1 && json.rejected == 0 && json.terminated == 0" clickable style="padding: 0px">
                                <q-item-section>
                                    <q-btn :disable="false" flat no-caps :label="'Renew'" color="primary" @click="dialog.renewal = true" class="btn_drp"/>
                                </q-item-section>
                            </q-item>
                            
                            <q-item v-if="permission.includes('rejected') && json.rejected == 0  && json.terminated == 0" clickable style="padding: 0px">
                                <q-item-section>
                                    <q-btn :disable="false" flat no-caps :label="'Reject'" color="primary" @click="dialog.reject = true" class="btn_drp"/>
                                </q-item-section>
                            </q-item>
                            
                            <q-item v-if="permission.includes('terminated') && json.terminated == 0 && json.rejected == 0" clickable style="padding: 0px">
                                <q-item-section>
                                    <q-btn :disable="false" flat no-caps :label="'Terminate'" color="primary" @click="dialog.terminate = true" class="btn_drp"/>
                                </q-item-section>
                            </q-item>
                        </q-list>
                    </q-btn-dropdown>
                </q-btn-group>
            </div>

            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-px-md">
                <q-toolbar class="custom_toolbar">
                    <q-tabs v-model="currentTab" active-class="active_class_tab" indicator-color="transparent" align="justify" inline-label dense narrow-indicator shrink stretch no-caps>
                        <q-tab name="supplier_profile" label="Supplier Profile"></q-tab>
                        <template v-for="tab in ttaTab" :key="tab">
                            <q-tab :name="tab.type" :label="tab.tab_info ? tab.tab_info.name : tab.name">
                                <q-btn v-show="!tab.tab_article || (tab.tab_article && tab.tab_article.length==0)" icon="close" class="q-ml-xs" size="12px" @click="removeTab(tab)" flat dense/>
                            </q-tab>
                        </template>
                        <!-- <q-tab name="rebates" label="Rebates"></q-tab>
                        <q-tab name="target_incentive_rebate" label="Target Incentive Rebate"></q-tab> -->
                        <q-tab name="condition_of_trade" label="Condition of Trade"></q-tab>
                        <q-tab v-if="page_function == 'edit'" name="attachment" label="Attachment"></q-tab>
                        <Button class="custom_add_button q-mx-sm" :pass_flat="true" pass_icon="add" :pass_dense="true" :tooltip="true" pass_tooltip="Add Tab" @receiveClick="handleAddTab"/>
                    </q-tabs>
                </q-toolbar>
            </div>

            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-px-md" style="font-size: 10px;">
                <q-tab-panels v-model="currentTab" :animated="false" keep-alive ref="tabs">
                    <q-tab-panel name="supplier_profile" style="overflow: hidden">
                        <div class="row">
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 q-px-sm q-py-xs">
                                <LabelInput label="TTA No" v-model:pass_value="json.refno" :readonly="true" :dbComponentBehavior="dbComponentBehavior.text"/>
                            </div>

                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 q-px-sm q-py-xs">
                                <LabelInput label="Previous TTA No" v-model:pass_value="json.previous_refno" :readonly="true" :dbComponentBehavior="dbComponentBehavior.text"/>
                            </div>

                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 q-px-sm q-py-xs">
                                <LabelSelect label="Bill To" v-model:pass_value="json.supplier_to" :options="options.supplier_list" :readonly="readonlyStatus" :dbComponentBehavior="dbComponentBehavior.select"/>
                            </div>

                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 q-px-sm q-py-xs">
                                <LabelDatepicker label="Effective Date From" :daterange="json.effective_date_from" :optionsFn="optionsDateStart" v-on:receiveChange="handleChangeStartDate" 
                                :dbComponentBehavior="dbComponentBehavior.text_required" :readonly="readonlyStatus"/>
                            </div>

                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 q-px-sm q-py-xs">
                                <LabelMultiselect label="Trading Group" v-model:pass_value="json.division" :options="options.division_list" v-model:pass_type="json.division_group" :options_type="options.division_group" :option_label="displayGroupLabel"
                                :forceSelectAll="forceSelectAllDivision" :dbComponentBehavior="dbComponentBehavior.select_required" :filter="true" :readonly="readonlyStatus" @receiveChangeType="handleChangeDivisionType"/>
                            </div>
                            
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 q-px-sm q-py-xs">
                                <LabelMultiselect label="Distributor (Supplier)" v-model:pass_value="json.distributor" :options="options.distributor_list"  :readonly="readonlyStatus" option_label="Distributors"
                                :forceSelectAll="forceSelectAllDistributor" :dbComponentBehavior="dbComponentBehavior.text" :manage_button="true" 
                                @receiveClickManage="this.dialog.distributor = true" @receiveChange="handleChangeDistributor"/>
                            </div>

                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 q-px-sm q-py-xs">
                                <LabelDatepicker label="Effective Date To" :daterange="json.effective_date_to" :optionsFn="optionsDateEnd" v-on:receiveChange="handleChangeEndDate" 
                                :dbComponentBehavior="dbComponentBehavior.text_required" :readonly="readonlyStatus"/>
                            </div>

                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 q-px-sm q-py-xs">
                                <LabelMultiselect label="Banner/Site" v-model:pass_value="json.banner" :options="options.banner_list" :readonly="readonlyStatus" option_label="Banners/Sites"
                                :dbComponentBehavior="dbComponentBehavior.text_required"/>
                            </div>

                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 q-px-sm q-py-xs">
                                <LabelInput label="Supplier PIC" v-model:pass_value="json.supplier_pic_name" :readonly="readonlyStatus" :dbComponentBehavior="dbComponentBehavior.text_required"/>
                            </div>

                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 q-px-sm q-py-xs">
                                <LabelInput label="Designation" v-model:pass_value="json.supplier_pic_designation" :readonly="readonlyStatus" :dbComponentBehavior="dbComponentBehavior.text_required"/>
                            </div>

                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 q-px-sm q-py-xs">
                                <LabelInput label="Contact" v-model:pass_value="json.supplier_pic_contact" :readonly="readonlyStatus" :dbComponentBehavior="dbComponentBehavior.text_required"/>
                            </div>

                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 q-px-sm q-py-xs">
                                <LabelInput label="Email" v-model:pass_value="json.supplier_pic_email" :readonly="readonlyStatus" :dbComponentBehavior="dbComponentBehavior.email"/>
                            </div>

                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 q-px-sm q-py-xs">
                                <LabelInput label="Issued By" v-model:pass_value="json.issued_by" :readonly="true" :dbComponentBehavior="dbComponentBehavior.text"/>
                            </div>

                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 q-px-sm q-py-xs">
                                <LabelInput label="Authorised By" v-model:pass_value="json.authorised_by" :readonly="true" :dbComponentBehavior="dbComponentBehavior.text"/>
                            </div>

                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 q-px-sm q-py-xs">
                                <LabelInput label="Approved By" v-model:pass_value="json.approve_by" :readonly="true" :dbComponentBehavior="dbComponentBehavior.text"/>
                            </div>

                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 q-px-sm q-py-xs">
                                <LabelTextarea label="Remarks" v-model:pass_value="json.remarks" :readonly="readonlyStatus" :dbComponentBehavior="dbComponentBehavior.textarea"/>
                            </div>

                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 q-px-sm q-py-xs">
                                <LabelInput label="Agreement Status" v-model:pass_value="json.agreement_status" :readonly="true" :dbComponentBehavior="dbComponentBehavior.text"/>
                            </div>
                        </div>
                    </q-tab-panel>

                    <template v-for="tab in ttaTab" :key="tab">
                        <q-tab-panel :name="tab.type" style="overflow: hidden">
                            <div v-if="tab.type != 'TIR'" class="row justify-end">
                                <Button class="custom_add_button" pass_icon="add" :pass_square="true" :pass_dense="true" :tooltip="true" :pass_tooltip="`Add ${tab.tab_info ? tab.tab_info.name : tab.name}`" 
                                @receiveClick="handleAddField(tab)"/>
                            </div>
                                
                            <div v-if="tab.type == 'TIR'">
                                <div class="row">
                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 q-px-sm q-py-xs">
                                        <LabelSelect label="Calculation Method" v-model:pass_value="tir.calc_method" :options="options.calcMethod_list" :readonly="readonlyStatus" 
                                        v-on:receiveChange="handleChangeCalcMethod"
                                        :dbComponentBehavior="dbComponentBehavior.select"/>
                                    </div>
                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 q-px-sm q-py-xs">
                                        <LabelSelect label="Billing Type" v-model:pass_value="tir.billing_type" :options="options.billing_type_list" :readonly="readonlyStatus || tir.billing_readonly" 
                                        v-on:receiveChange="handleChangeBillingType" :dbComponentBehavior="dbComponentBehavior.select"/>
                                    </div>
                                    <!-- <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 q-px-sm q-py-xs">
                                        <LabelDatepicker label="Cut Off Date" :daterange="tir.cutoff_date" :optionsFn="daterangeOptions"
                                        v-on:receiveChange="handleChangeCutOffDate" :dbComponentBehavior="dbComponentBehavior.text_required" :readonly="readonlyStatus"/>
                                    </div> -->
                                </div>
                                <div class="row justify-end q-pa-md">
                                    <Button class="custom_add_button" pass_icon="add" :pass_square="true" :pass_dense="true" :tooltip="true" pass_tooltip="Add Tier" @receiveClick="addTier"/>
                                </div>
                                <div class="row">
                                    <Table
                                        :row_per_page="[10,50,100,1000]"
                                        :table_data="table_data.target_incentive_rebate"
                                        :table_column="table_column.target_incentive_rebate"
                                        :flat_status="true"
                                        :bordered_status="true"
                                        v-on:receiveRequestTable="handleTableChangeTargetIncentiveRebate"

                                        :allow_remove="true"
                                        v-on:receiveHandleRemove="removeTier"

                                        :filter_mode_on="false"
                                        :forceLoading="forceLoading"
                                        :column_reordering="false"
                                        :row_reordering="false"

                                        :pass_visible_columns="[]"
                                    />
                                </div>
                            </div>

                            <div v-else>
                                <template v-for="article in tab.tab_article" :key="article">

                                    <div v-if="article.component_type == 'rate_purgrossnet_date'" 
                                        class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 q-px-sm q-py-xs">
                                        <!-- ratetype/rate/pur_grossnet/daterange -->
                                        <LabelSelectInputRadioDate :label="article.name"
                                            v-model:select="article.option1"
                                            v-model:radio="article.remark1"
                                            v-model:input="article.value1"
                                            v-model:date_from="article.date_range_from"
                                            v-model:date_to="article.date_range_to"
                                            v-model:type="article.billing_type"
                                            :selectOptions="article.option1_list"
                                            :radioOptions="article.remark1_list"
                                            :dateOptions="daterangeOptions"
                                            :typeOptions="options.billing_type_list"
                                            :allow_remove="readonlyStatus ? false : true"
                                            :readonly="readonlyStatus"
                                            :is_auto="article.is_auto"
                                            @receiveRemove="removeField(article)"
                                        />
                                    </div>

                                    <div v-else-if="article.component_type == 'rate_purgrossnet'" 
                                        class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 q-px-sm q-py-xs">
                                        <!-- ratetype/rate/pur_grossnet -->
                                        <LabelSelectInputRadio :label="article.name"
                                            v-model:select="article.option1"
                                            v-model:radio="article.remark1"
                                            v-model:input="article.value1"
                                            v-model:type="article.billing_type"
                                            :selectOptions="article.option1_list"
                                            :radioOptions="article.remark1_list"
                                            :typeOptions="options.billing_type_list"
                                            :allow_remove="readonlyStatus ? false : true"
                                            :readonly="readonlyStatus"
                                            :is_auto="article.is_auto"
                                            @receiveRemove="removeField(article)"
                                        />
                                    </div>

                                    <div v-else-if="article.component_type == 'dollar_rate_remark'" 
                                        class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 q-px-sm q-py-xs">
                                        <!-- $/rate/remark -->
                                        <LabelSelectInputRadio :label="article.name"
                                            v-model:select="article.option1"
                                            v-model:radio="article.remark1"
                                            v-model:input="article.value1"
                                            v-model:type="article.billing_type"
                                            :selectOptions="article.option1_list"
                                            :radioOptions="article.remark1_list"
                                            :typeOptions="options.billing_type_list"
                                            :allow_remove="readonlyStatus ? false : true"
                                            :readonly="readonlyStatus"
                                            :is_auto="article.is_auto"
                                            @receiveRemove="removeField(article)"
                                        />
                                    </div>

                                    <div v-else-if="article.component_type == 'months_rate_percentage'" 
                                        class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 q-px-sm q-py-xs">
                                        <!-- months/rate/% -->
                                        <LabelSelectInputRemark1 :label="article.name"
                                            :select1="article.option1"
                                            :input1="article.value1"
                                            :selectOptions1="[{label:'Month',value:'month'}]"
                                            :select2="article.option2"
                                            :input2="article.value2"
                                            :selectOptions2="article.option2_list"
                                            :radio="article.remark1"
                                            :radioOptions="options.orderByMonth"
                                            :type="article.billing_type"
                                            :typeOptions="options.billing_type_list"
                                            @receiveChange="newVal => handleChangeDayMonthRate(article,newVal)"
                                            :allow_remove="readonlyStatus ? false : true"
                                            :readonly="readonlyStatus"
                                            :is_auto="article.is_auto"
                                            @receiveRemove="removeField(article)"
                                        />
                                    </div>

                                    <div v-else-if="article.component_type == 'rate_cogsinvnet_date'" 
                                        class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 q-px-sm q-py-xs">
                                        <!-- ratetype/rate/inv_grossnet/daterange -->
                                        <LabelSelectInputRadioDate :label="article.name"
                                            v-model:select="article.option1"
                                            v-model:radio="article.remark1"
                                            v-model:input="article.value1"
                                            v-model:date_from="article.date_range_from"
                                            v-model:date_to="article.date_range_to"
                                            v-model:type="article.billing_type"
                                            :selectOptions="article.option1_list"
                                            :radioOptions="article.remark1_list"
                                            :typeOptions="options.billing_type_list"
                                            :allow_remove="readonlyStatus ? false : true"
                                            :readonly="readonlyStatus"
                                            :is_auto="article.is_auto"
                                            @receiveRemove="removeField(article)"
                                        />
                                    </div>

                                    <div v-else-if="article.component_type == 'rate_cogsinvnet'" 
                                        class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 q-px-sm q-py-xs">
                                        <!-- ratetype/rate/inv_grossnet -->
                                        <LabelSelectInputRadio :label="article.name"
                                            v-model:select="article.option1"
                                            v-model:radio="article.remark1"
                                            v-model:input="article.value1"
                                            v-model:type="article.billing_type"
                                            :selectOptions="article.option1_list"
                                            :radioOptions="article.remark1_list"
                                            :typeOptions="options.billing_type_list"
                                            :allow_remove="readonlyStatus ? false : true"
                                            :readonly="readonlyStatus"
                                            :is_auto="article.is_auto"
                                            @receiveRemove="removeField(article)"
                                        />
                                    </div>

                                    <div v-else-if="article.component_type == 'target_ratetype_rate_remark'" 
                                        class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 q-px-sm q-py-xs">
                                        <!-- target/target_ratetype/ratetype/rate/remark -->
                                        <LabelSelectInputRemark2 :label="article.name"
                                            :select1="article.option1"
                                            :radio1="article.remark1"
                                            :input1="article.value1"
                                            :selectOptions1="article.option1_list"
                                            :radioOptions1="article.remark1_list"
                                            :select2="article.option2"
                                            :radio2="article.remark2"
                                            :input2="article.value2"
                                            :selectOptions2="article.option2_list"
                                            :radioOptions2="article.remark2_list"
                                            :type="article.billing_type"
                                            :typeOptions="options.billing_type_list"
                                            :allow_remove="readonlyStatus ? false : true"
                                            :readonly="readonlyStatus"
                                            :is_auto="article.is_auto"
                                            @receiveRemove="removeField(article)"
                                        />
                                    </div>

                                    <div v-else-if="article.component_type == 'days_rate_percentage'" 
                                        class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 q-px-sm q-py-xs">
                                        <!-- days/rate/% -->
                                        <LabelSelectInputRemark1 :label="article.name"
                                            :select1="article.option1"
                                            :input1="article.value1"
                                            :selectOptions1="[{label:'Day',value:'day'}]"
                                            :select2="article.option2"
                                            :input2="article.value2"
                                            :selectOptions2="article.option2_list"
                                            :radio="article.remark1"
                                            :radioOptions="options.orderByDay"
                                            :type="article.billing_type"
                                            :typeOptions="options.billing_type_list"
                                            @receiveChange="newVal => handleChangeDayMonthRate(article,newVal)"
                                            :allow_remove="readonlyStatus ? false : true"
                                            :readonly="readonlyStatus"
                                            :is_auto="article.is_auto"
                                            @receiveRemove="removeField(article)"
                                        />
                                    </div>
                                </template>
                            </div>
                            
                        </q-tab-panel>
                    </template>

                    <q-tab-panel name="condition_of_trade" style="overflow: hidden">
                        <div class="row">
                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 q-px-sm q-py-xs">
                                <LabelSelect label="Condition of Trade" v-model:pass_value="conditionTrade" :options="options.cot_list" :readonly="readonlyStatus" 
                                :dbComponentBehavior="dbComponentBehavior.select"/>
                            </div>
                        </div>
                        <div v-if="conditionTrade != ''" class="row">
                            <q-card class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pa-md q-mt-md" flat bordered>
                                <div v-html="displayCot"></div>
                            </q-card>
                        </div>
                    </q-tab-panel>

                    <q-tab-panel v-if="page_function == 'edit'" name="attachment" style="overflow: hidden">
                        <div class="row justify-end q-py-sm">
                            <Button class="custom_add_button" pass_label="UPLOAD" :pass_square="true" :pass_dense="false" :tooltip="true" pass_tooltip="Upload File" 
                            @receiveClick="dialog.upload = true"/>
                        </div>
                        <div class="row justify-center q-ma-md">
                            <Table
                                style="width: 80%"
                                :row_per_page="[10,50,100,1000]"
                                :table_data="table_data.attachment"
                                :table_column="table_column.attachment"
                                :flat_status="true"
                                :bordered_status="true"
                                v-on:receiveRequestTable="handleTableChangeAttachment"

                                :allow_delete="true"
                                :allow_download="true"
                                v-on:receiveHandleDelete="removeFile"
                                v-on:receiveHandleEdit="viewFile"
                                v-on:receiveHandleDownload="downloadFile"
                                :filter_mode_on="false"
                                :forceLoading="forceLoading"
                                :column_reordering="false"
                                :row_reordering="false"

                                :pass_visible_columns="[]"
                            />
                        </div>
                    </q-tab-panel>
                </q-tab-panels>
            </div>

            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-py-md q-px-lg">
                <div class="row justify-end q-gutter-md">
                    <Button :pass_label="'Cancel'"
                        v-on:receiveClick="goBack"
                        :pass_no_caps="false"
                        :pass_square="true"
                        :pass_dense="true"
                        class="custom_cancel_button"
                    />

                    <Button :pass_label="'Save'"
                        v-on:receiveClick="saveTTA"
                        :pass_no_caps="false"
                        :pass_square="true"
                        :pass_dense="true"
                        class="custom_button"
                    />
                </div>
            </div>
        </q-form>

    </div>

    <q-dialog v-model="dialog.distributor" persistent position="top">
        <q-card style="width: 95vw; max-width: 950px; max-height: 90vh; margin-top: 5%;">

            <q-card-section class="row items-center dialog_header_custom">
                <div class="text-h6">Manage Distributors for TTA No. {{json.refno}}</div>
                <q-space />
                <q-btn icon="close" flat round dense :disable="dialog.loading" @click="dialog.distributor = false" />
            </q-card-section>

            <q-card-section class="content_body_dialog">
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <q-toolbar class="custom_toolbar">
                        <q-tabs v-model="dialog.tab" active-class="active_class_tab" indicator-color="transparent" align="justify" dense narrow-indicator shrink stretch no-caps>
                            <q-tab name="distributor_assigned" label="Distributors Assigned"></q-tab>
                            <q-tab v-if="page_function == 'edit'" name="audit_trail" label="Audit Trail"></q-tab>
                        </q-tabs>
                    </q-toolbar>
                </div>
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="font-size: 10px;">
                    <q-tab-panels v-model="dialog.tab" :animated="false" keep-alive ref="dialogTabs" class="q-pa-md">
                        <q-tab-panel name="distributor_assigned" style="overflow: hidden">
                            <div class="row">
                                <Table
                                    :row_per_page="[10,50,100,1000]"
                                    :table_data="table_data.distributor"
                                    :table_column="table_column.distributor"
                                    :flat_status="true"
                                    :bordered_status="true"
                                    v-on:receiveRequestTable="handleTableChangeDistributor"

                                    :allow_print="true"
                                    :allow_remove="true"
                                    :allow_upload="true"
                                    v-on:receiveHandlePrint="handleReceiveHandlePrint"
                                    v-on:receiveHandleRemove="handleReceiveHandleRemove"

                                    :filter_mode_on="false"
                                    :forceLoading="forceLoading"
                                    :column_reordering="false"
                                    :row_reordering="false"

                                    :pass_visible_columns="[]"
                                />
                            </div>
                            <div v-if="json.approved == 1">
                                <div class="row text-body2 q-pt-lg q">Add New Distributor:</div>
                                <div class="row">
                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <Select
                                            :readonly="false"
                                            v-model:pass_value="dialog.distributorValue"
                                            :dbComponentBehavior="dbComponentBehavior.select"
                                            :options="distributorOptions"
                                        />
                                    </div>
                                </div>
                            </div>
                        </q-tab-panel>
                        <q-tab-panel name="audit_trail" style="overflow: hidden">
                            <div class="row">
                                <Table
                                    :row_per_page="[10,50,100,1000]"
                                    :table_data="table_data.audit_trail"
                                    :table_column="table_column.audit_trail"
                                    :flat_status="true"
                                    :bordered_status="true"
                                    v-on:receiveRequestTable="handleTableChangeAuditTrail"

                                    :allow_add="false"
                                    :allow_edit="false"
                                    :allow_delete="true"
                                    v-on:receiveHandleEditDetails="handleReceiveHandleEdit"

                                    :filter_mode_on="false"
                                    :forceLoading="forceLoading"
                                    :column_reordering="false"
                                    :row_reordering="false"

                                    :pass_visible_columns="[]"
                                />
                            </div>
                        </q-tab-panel>
                    </q-tab-panels>
                </div>
            </q-card-section>

            <q-card-actions v-show="dialog.tab == 'distributor_assigned' && json.approved == 1" class="dialog_action" align="right">
                <Button v-on:receiveClick="dialog.distributor = false"
                    :pass_label="'Cancel'"
                    :pass_no_caps="true"
                    :pass_square="true"
                    :pass_dense="true"
                    class="custom_cancel_button"
                />

                <Button v-on:receiveClick="saveDistributor"
                    :pass_label="'Save'"
                    :pass_no_caps="true"
                    :pass_square="true"
                    :pass_dense="true"
                    class="custom_button"
                />
            </q-card-actions>

            <q-inner-loading
                :showing="dialog.loading"
                color="primary"
            />
        </q-card>
    </q-dialog>

    <q-dialog v-model="dialog.add_field" persistent position="top">
        <q-card style="width: 95vw; max-width: 600px; max-height: 90vh; margin-top: 5%;">

            <q-card-section class="row items-center dialog_header_custom">
                <div class="text-h6">Add {{dialog.currentTab.tab_info ? dialog.currentTab.tab_info.name : dialog.currentTab.name}}</div>
                <q-space />
                <q-btn icon="close" flat round dense :disable="dialog.loading" @click="handleCloseAddField" />
            </q-card-section>

            <q-card-section class="content_body_dialog">
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <Select
                        :readonly="false"
                        v-model:pass_value="dialog.articleValue"
                        v-on:receiveChange="null"
                        :dbComponentBehavior="dbComponentBehavior.select"
                        :options="articleOptions"
                    />
                </div>
            </q-card-section>

            <q-card-actions class="dialog_action" align="right">
                <Button v-on:receiveClick="handleCloseAddField"
                    :pass_label="'Cancel'"
                    :pass_no_caps="true"
                    :pass_square="true"
                    :pass_dense="true"
                    class="custom_cancel_button"
                />

                <Button v-on:receiveClick="addField"
                    :pass_label="'Save'"
                    :pass_no_caps="true"
                    :pass_square="true"
                    :pass_dense="true"
                    class="custom_button"
                />
            </q-card-actions>
        </q-card>
    </q-dialog>

    <q-dialog v-model="dialog.add_tab" persistent position="top">
        <q-card style="width: 95vw; max-width: 500px; max-height: 90vh; margin-top: 5%;">

            <q-card-section class="row items-center dialog_header_custom ">
                <div class="text-h6">Add Tab</div>
                <q-space />
                <q-btn icon="close" flat round dense :disable="dialog.loading" @click="dialog.add_tab = false" />
            </q-card-section>

            <q-card-section class="content_body_dialog">
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <Select
                        :readonly="false"
                        v-model:pass_value="dialog.tabValue"
                        v-on:receiveChange="null"
                        :dbComponentBehavior="dbComponentBehavior.select"
                        :options="tabOptions"
                    />
                </div>
            </q-card-section>

            <q-card-actions class="dialog_action" align="right">
                <Button v-on:receiveClick="dialog.add_tab = false"
                    :pass_label="'Cancel'"
                    :pass_no_caps="true"
                    :pass_square="true"
                    :pass_dense="true"
                    class="custom_cancel_button"
                />

                <Button v-on:receiveClick="addTab"
                    :pass_label="'Save'"
                    :pass_no_caps="true"
                    :pass_square="true"
                    :pass_dense="true"
                    class="custom_button"
                />
            </q-card-actions>
        </q-card>
    </q-dialog>

    <q-dialog v-model="dialog.renewal" persistent position="top">
        <q-card style="width: 864px; max-width: 98vw;text-align:center;margin-top: 5%;border-radius: 8px">

        <q-card-section class="theme_color row items-center" style="height:56px; padding: 8px 24px;border-bottom: 1px solid #a7bbcb;">
            <div class="confirm_title">Renew TTA: {{json.refno}}</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup/>
        </q-card-section>

        <q-card-section class="text-left" style="padding: 32px 24px">
            <div style="width:70%">
                <LabelDatepicker label="Effective Date From" :daterange="dialog.date_from" v-on:receiveChange="handleChangeNewStartDate" :dbComponentBehavior="dbComponentBehavior.date"/>
            </div>
        </q-card-section>

        <q-card-actions align="right" style="padding-top:0px;padding-bottom:16px;padding-right:16px">
            <q-btn flat label="Cancel" font_color="#29292A" color="#29292A" v-close-popup size="12px" class="dialog_confirm_cancel_button"/>
            <q-btn flat label="RENEW" font_color="white" color="'#D81111'" size="12px" class="primary_actions_button" @click="handleRenewal" />
        </q-card-actions>

        <q-inner-loading
            :showing="dialog.loading"
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
            <span class="confirmation_line_font">Do you want to approve this TTA {{json.refno}}?</span>
        </q-card-section>

        <q-card-actions align="right" style="padding-top:0px;padding-bottom:16px;padding-right:16px">
            <q-btn flat label="Cancel" font_color="#29292A" color="#29292A" v-close-popup size="12px" class="dialog_confirm_cancel_button"/>
            <q-btn flat label="Confirm" font_color="white" color="'#D81111'" size="12px" class="primary_actions_button" @click="handleApprove" />
        </q-card-actions>

        <q-inner-loading
            :showing="dialog.loading"
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
            <span class="confirmation_line_font">Do you want to authorise this TTA {{json.refno}}?</span>
        </q-card-section>

        <q-card-actions align="right" style="padding-top:0px;padding-bottom:16px;padding-right:16px">
            <q-btn flat label="Cancel" font_color="#29292A" color="#29292A" v-close-popup size="12px" class="dialog_confirm_cancel_button"/>
            <q-btn flat label="Confirm" font_color="white" color="'#D81111'" size="12px" class="primary_actions_button" @click="handleAuthorise" />
        </q-card-actions>

        <q-inner-loading
            :showing="dialog.loading"
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
            <span class="confirmation_line_font">Do you want to reject this TTA {{json.refno}}?</span>
        </q-card-section>

        <q-card-actions align="right" style="padding-top:0px;padding-bottom:16px;padding-right:16px">
            <q-btn flat label="Cancel" font_color="#29292A" color="#29292A" v-close-popup size="12px" class="dialog_confirm_cancel_button"/>
            <q-btn flat label="Confirm" font_color="white" color="'#D81111'" size="12px" class="dialog_confirm_delete_button" @click="handleReject" />
        </q-card-actions>

        <q-inner-loading
            :showing="dialog.loading"
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
            <span class="confirmation_line_font">Do you want to terminate this TTA {{json.refno}}?</span>
        </q-card-section>

        <q-card-actions align="right" style="padding-top:0px;padding-bottom:16px;padding-right:16px">
            <q-btn flat label="Cancel" font_color="#29292A" color="#29292A" v-close-popup size="12px" class="dialog_confirm_cancel_button"/>
            <q-btn flat label="Confirm" font_color="white" color="'#D81111'" size="12px" class="dialog_confirm_delete_button" @click="handleTerminate" />
        </q-card-actions>

        <q-inner-loading
            :showing="dialog.loading"
            color="primary"
        />
        </q-card>
    </q-dialog>

    <q-dialog v-model="dialog.history" persistent position="top">
        <q-card style="width: 1000px; max-width: 120vw;text-align:center;margin-top: 5%;border-radius: 8px">

        <q-card-section class="theme_color row items-center" style="height:56px; padding: 8px 24px;border-bottom: 1px solid #a7bbcb;">
            <div class="confirm_title">History : {{json.refno}}</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup/>
        </q-card-section>

        <q-card-section style="padding: 32px 24px">
            <div class="row">
                <Table
                    :row_per_page="[10,50,100,1000]"
                    :table_data="table_data.history"
                    :table_column="table_column.history"
                    :flat_status="true"
                    :bordered_status="true"
                    v-on:receiveRequestTable="handleTableChangeHistory"

                    :filter_mode_on="false"
                    :forceLoading="forceLoading"
                    :column_reordering="false"
                    :row_reordering="false"

                    :pass_visible_columns="[]"
                />
            </div>
        </q-card-section>

        <q-card-actions align="right" style="padding-top:0px;padding-bottom:16px;padding-right:16px">
            <q-btn flat label="Close" font_color="#29292A" color="#29292A" v-close-popup size="12px" class="dialog_confirm_cancel_button"/>
        </q-card-actions>

        <q-inner-loading
            :showing="dialog.loading"
            color="primary"
        />
        </q-card>
    </q-dialog>

    <q-dialog v-model="dialog.removeFile" persistent position="top">
        <q-card style="width: 864px; max-width: 98vw;text-align:center;margin-top: 5%;border-radius: 8px">

        <q-card-section class="theme_color row items-center" style="height:56px; padding: 8px 24px;border-bottom: 1px solid #a7bbcb;">
            <div class="confirm_title">Confirmation</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup/>
        </q-card-section>

        <q-card-section style="padding: 32px 24px">
            <span class="confirmation_line_font">Do you confirm want to remove this file?</span>
        </q-card-section>

        <q-card-actions align="right" style="padding-top:0px;padding-bottom:16px;padding-right:16px">
            <q-btn flat label="Cancel" font_color="#29292A" color="#29292A" v-close-popup size="12px" class="dialog_confirm_cancel_button"/>
            <q-btn flat label="Confirm" font_color="white" color="'#D81111'" size="12px" class="dialog_confirm_delete_button" @click="handleRemoveFile" />
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
            <div class="confirm_title">Upload TTA: {{json.refno}}</div>
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

        <q-card-actions align="right" style="padding-top:0px;padding-bottom:16px;padding-right:16px">
            <q-btn flat label="Cancel" font_color="#29292A" color="#29292A" v-close-popup size="12px" class="dialog_confirm_cancel_button"/>
            <q-btn flat label="UPLOAD" font_color="white" color="'#D81111'" size="12px" class="primary_actions_button" @click="handleUploadFile" />
        </q-card-actions>

        <q-inner-loading
            :showing="dialogLoading"
            color="primary"
        />
        </q-card>
    </q-dialog>

    <q-inner-loading
        :showing="showLoading"
        class="showLoading"
        color="primary"
    />
</template>

<script>
import Select from 'src/components/PRIMS/Main/Select';
import Button from 'src/components/PRIMS/Main/Button';
import Table from 'src/components/PRIMS/Main/Table';
import LabelInput from 'src/components/PRIMS/General/LabelInput';
import LabelSelect from 'src/components/PRIMS/General/LabelSelect';
import LabelMultiselect from 'src/components/PRIMS/General/LabelMultiselect';
import LabelDatepicker from 'src/components/PRIMS/General/LabelDatepicker';
import LabelDaterange from 'src/components/PRIMS/General/LabelDaterange';
import LabelTextarea from 'src/components/PRIMS/General/LabelTextarea';
import LabelSelectInputRadio from 'src/components/PRIMS/General/LabelSelectInputRadio';
import LabelSelectInputRemark1 from 'src/components/PRIMS/General/LabelSelectInputRemark1';
import LabelSelectInputRemark2 from 'src/components/PRIMS/General/LabelSelectInputRemark2';
import LabelSelectInputRadioDate from 'src/components/PRIMS/General/LabelSelectInputRadioDate';
import { Notify } from "quasar";

export default {
    components: {
        Select,
        Button,
        Table,
        LabelInput,
        LabelSelect,
        LabelMultiselect,
        LabelDatepicker,
        LabelDaterange,
        LabelTextarea,
        LabelSelectInputRadio,
        LabelSelectInputRemark1,
        LabelSelectInputRemark2,
        LabelSelectInputRadioDate,
    },
    data() {
        return {
            page_function: "",
            user_info_guid: localStorage.getItem("user_info_guid") != "" && localStorage.getItem("user_info_guid") != "null" && localStorage.getItem("user_info_guid") != null ? localStorage.getItem("user_info_guid") : "",
            username: localStorage.getItem("username") != "" && localStorage.getItem("username") != "null" && localStorage.getItem("username") != null ? localStorage.getItem("username") : "",
            company_guid: localStorage.getItem("company_guid") != "" && localStorage.getItem("company_guid") != "null" && localStorage.getItem("company_guid") != null ? localStorage.getItem("company_guid") : "",
            permission: localStorage.getItem("permission") != "" && localStorage.getItem("permission") != "null" && localStorage.getItem("permission") != null ? localStorage.getItem("permission") : "",
            currentTab: "supplier_profile",
            currentTTA: "",
            readonlyStatus: false,
            original_ttaTab: [],
            ttaTab: [],
            conditionTrade: "",
            tir: {
                calc_method: "",
                billing_type: "",
                // cutoff_date: "",
                billing_readonly: false,
            },
            original_json: {},
            json: {
                refno: "",
                previous_refno: "",
                supplier_to: "",
                distributor: [],
                distributor_list: [],
                division: [],
                division_group: "division",
                banner: [],
                effective_date_from: "",
                effective_date_to: "",
                retailer_outlet_guid: "",
                issued_by: "",
                authorised_by: "",
                approve_by: "",
                supplier_pic_name: "",
                supplier_pic_designation: "",
                supplier_pic_contact: "",
                supplier_pic_email: "",
                remarks: "",
                agreement_status: "Pending",
            },
            options: {
                supplier_list: [],
                distributor_list: [],
                division_list: [],
                banner_list: [],
                cot_list: [],
                tab_list: [],
                tabArticle_list: [],
                orderByDay: [{label:'Order Within X Days',value:'OrderWithinXDays'}],
                orderByMonth: [{label:'Order Within X Months',value:'OrderWithinXMonths'}],
                billing_type_list: [{value:'monthly',label:'Monthly'},{value:'quarterly',label:'Quarterly'},{value:'half-year',label:'Half Year'},{value:'yearly',label:'Yearly'},{value:'end_of_tta',label:'End of TTA'}],
                inv_grossnet_list: [{value: 'cogs_value', label: 'COGS Value'},{value: 'net_inv_value', label: 'Net Inv Value'}],
                pur_grossnet_list: [{value: 'gpv', label: 'Gross Purchase Value'},{value: 'npv', label: 'Net Purchase Value'}],
                calcType_list: [{value: '%', label: '%'},{value: '$', label: '$'}],
                calcMethod_list: [{value: 'gpv', label: 'Gross Purchase Value'},{value: 'npv', label: 'Net Purchase Value'},{value: 'consignment', label: 'Cost of Goods Sold (Consignment)'},{value: 'growth_percent', label: 'Growth %'},{value: 'growth_amt', label: 'Growth Amount'}],
                division_group: [{value:'division',label:'Division'},{value:'dept',label:'Department'},{value:'subdept',label:'SubDept'},{value:'category',label:'Category'}]
            },
            table_data:{
                distributor: [],
                audit_trail: [],
                target_incentive_rebate: [],
                history: [],
                attachment: [],
            },
            table_column:{
                distributor: [],
                audit_trail: [],
                target_incentive_rebate: [],
                history: [],
                attachment: [],
            },
            ori_params:{
                distributor: {},
                audit_trail: {},
                target_incentive_rebate: {},
                history: {},
                attachment: [],
            },
            dialog: {
                tab: 'distributor_assigned',
                distributor: false,
                distributorValue: "",
                add_field: false,
                articleValue: "",
                add_tab: false,
                tabValue: "",
                loading: false,
                currentTab: {},
                renewal: false,
                reject: false,  
                approve: false,
                authorise: false,
                terminate: false,
                date_from: "",
                history: false,
                upload: false,
                removeFile: false,
                currentItem: {},
            },
            forceSelectAllDistributor: false,
            forceSelectAllDivision: false,
            showLoading: false,
        }
    },
    computed: {
        dbComponentBehavior() {
            return this.$store.getters['dbComponentBehavior/byLanguage']('tta')
        },
        displayCot(){
            const conditionTrade = this.options.cot_list.filter((entry)=>{ return entry.cot_guid == this.conditionTrade});
            return conditionTrade[0].cot_value;
        },
        displayGroupLabel()
        {
            if(this.json.division_group == 'category')
            {
                return "Categories";
            }
            else
            {
                return `${this.json.division_group.charAt(0).toUpperCase() + this.json.division_group.slice(1)}s`;
            }
        },
        tabOptions(){
            var options = this.options.tab_list.filter((entry)=>{ return entry.tab_guid != '724A476DB18643F4BF886A603AC80E4A'});

            if(this.ttaTab.length>0)
            {
                const existing_tab = new Set(this.ttaTab.map((val)=>val.tab_guid));
                return options.filter(entry => !existing_tab.has(entry.tab_guid));
            }
            return options;
        },
        articleOptions(){
            var options = this.options.tabArticle_list.filter((entry)=>{ 
                return entry.tab_guid == this.dialog.currentTab.tab_guid
            });

            if(this.dialog.currentTab.tab_article && this.dialog.currentTab.tab_article.length>0)
            {
                const existing_article = new Set(this.dialog.currentTab.tab_article.map((val)=>val.tab_article_guid));
                return options.filter(entry => !existing_article.has(entry.tab_article_guid));
            }
            return options;
        },
        distributorOptions(){
            var options = this.options.distributor_list.filter((entry)=>{
                return !this.json.distributor.includes(entry.value);
            })
            return options;
        },
        async divisionOptions()
        {
            // set options for division
            var payload = {
                params: {
                    "limit": "99999",
                    "ordering": "code"
                }
            }

            var options = [];
            
            if(this.json.division_group == "division")
            {
                // division options
                var pass_obj = {
                    "dispatch": 'general/trigger_get_division_list',
                    "getter": 'general/get_division',
                    "app": this,
                    "payload": payload,
                }

                var division_list = await this.$dispatch(pass_obj);

                if(division_list.status)
                {
                    var list = division_list.response.data.results;
                    list.forEach(element => {
                        element.value = element.division_guid;
                        element.label = `${element.code} - ${element.name}`;
                    });
                    var options = list;
                }
            }
            else if(this.json.division_group == "dept")
            {
                // dept options
                var pass_obj = {
                    "dispatch": 'general/trigger_get_dept_list',
                    "getter": 'general/get_division',
                    "app": this,
                    "payload": payload,
                }

                var dept_list = await this.$dispatch(pass_obj);

                if(dept_list.status)
                {
                    var list = dept_list.response.data.results;
                    list.forEach(element => {
                        element.value = element.dept_guid;
                        element.label = `${element.code} - ${element.name}`;
                    });
                    var options = list;
                }
            }
            else if(this.json.division_group == "subdept")
            {
                // subdpt options
                var pass_obj = {
                    "dispatch": 'general/trigger_get_subdept_list',
                    "getter": 'general/get_division',
                    "app": this,
                    "payload": payload,
                }

                var subdept_list = await this.$dispatch(pass_obj);

                if(subdept_list.status)
                {
                    var list = subdept_list.response.data.results;
                    list.forEach(element => {
                        element.value = element.subdept_guid;
                        element.label = `${element.code} - ${element.name}`;
                    });
                    var options = list;
                }
            }
            else if(this.json.division_group == "category")
            {
                // category options
                var pass_obj = {
                    "dispatch": 'general/trigger_get_category_list',
                    "getter": 'general/get_division',
                    "app": this,
                    "payload": payload,
                }

                var category_list = await this.$dispatch(pass_obj);

                if(category_list.status)
                {
                    var list = category_list.response.data.results;
                    list.forEach(element => {
                        element.value = element.category_guid;
                        element.label = `${element.code} - ${element.name}`;
                    });
                    var options = list;
                }
            }

            return options;
        },
        displayTierRebate()
        {
            if(this.tir.calc_method != '')
            {
                if(this.tir.calc_method != 'growth_percent' && this.tir.calc_method != 'growth_amt')
                {
                    return `% of ${this.tir.calc_method}`;
                }
                else if(this.tir.calc_method == 'growth_percent' || this.tir.calc_method == 'growth_amt')
                {
                    return `% of Growth`;
                }
            }
            return "%";            
        },
        daterangeOptions() {
            return (date) => {
                var start_date = `${this.json.effective_date_from.split('-')[0]}-01-01`;
                start_date = start_date.replaceAll('-','/');
                var end_date = this.json.effective_date_to.split(' ')[0];
                end_date = end_date.replaceAll('-','/');

                return date >= start_date && date <= end_date;
            };
        },
        // cutOffStartOptions(){
        //     return (date) => {
        //         const day = new Date(date).getDate();
        //         return day === 1;
        //     };
        // },
        // cutOffEndOptions(){
        //     return (date) => {
        //         const startDate = new Date(this.tir.cutoff_date.from);
        //         startDate.setFullYear(startDate.getFullYear() + 1);
        //         startDate.setMonth(startDate.getMonth() + 1);
        //         startDate.setDate(0);
        //         startDate.setHours(0);

        //         const pass_date = new Date(date);
        //         const lastDay = new Date(pass_date.getFullYear(),pass_date.getMonth()+1,0);
                
        //         return pass_date >= startDate && pass_date.getTime() == lastDay.getTime();
        //     };
        // },
        optionsDateStart(){
            return (date) => {
                const current_date = new Date();
                const current_date_string = `${current_date.getFullYear()}/01/01`;
                return date >= current_date_string;
            }
        },
        optionsDateEnd(){
            return (date) => {
                if(this.json.effective_date_from != "")
                {
                    var start_date = this.json.effective_date_from.split(' ')[0];
                    start_date = start_date.replaceAll('-','/');
                }
                else
                {
                    const current_date = new Date();
                    var start_date = `${current_date.getFullYear()}/${('0' + (current_date.getMonth() + 1)).slice(-2)}/${('0' + current_date.getDate()).slice(-2)}`;
                }
                return date > start_date;
            }
        },
    },
    async mounted(){
        this.showLoading = true;

        // set options for tab
        var pass_obj = {
            "dispatch": 'general/trigger_get_tab_list',
            "getter": 'general/get_tab',
            "app": this,
            "payload": {},
        }

        var tab_list = await this.$dispatch(pass_obj);

        if(tab_list.status)
        {
            var list = tab_list.response.data.results;
            list.forEach(element => {
                element.value = element.tab_guid;
                element.label = element.name;
            });
            this.options.tab_list = list;
        }

        // set options for tab article
        var pass_obj = {
            "dispatch": 'general/trigger_get_tab_article_list',
            "getter": 'general/get_tab_article',
            "app": this,
            "payload": {
                "params": {
                    "isactive": 1,
                }
            },
        }

        var tab_article_list = await this.$dispatch(pass_obj);

        if(tab_article_list.status)
        {
            var list = tab_article_list.response.data.results;
            list.forEach(element => {
                element.value = element.tab_article_guid;
                element.label = element.name;
            });
            this.options.tabArticle_list = list;
        }

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
            this.options.supplier_list = list;
        }

        // set options for distributor
        var payload = {
            params: {
                "limit": "99999",
                "ordering": "code",
                "type": "S",
            }
        }

        var pass_obj = {
            "dispatch": 'general/trigger_get_supplier_list',
            "getter": 'general/get_supplier',
            "app": this,
            "payload": payload,
        }

        var distributor_list = await this.$dispatch(pass_obj);

        if(distributor_list.status)
        {
            var list = distributor_list.response.data.results;
            list.forEach(element => {
                element.value = element.supplier_guid;
                element.label = `${element.code} - ${element.name}`;
            });
            this.options.distributor_list = list;
        }

        // set options for condition of trade
        var pass_obj = {
            "dispatch": 'general/trigger_get_cot_list',
            "getter": 'general/get_cot',
            "app": this,
            "payload": {},
        }

        var cot_list = await this.$dispatch(pass_obj);

        if(cot_list.status)
        {
            var list = cot_list.response.data.results;
            list.forEach(element => {
                element.value = element.cot_guid;
                element.label = element.name;
            });
            this.options.cot_list = list;
        }
        
        // set options for banner
        var payload = {
            params: {
                "limit": "99999",
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
            var list = banner_list.response.data.results;
            list.forEach(element => {
                element.value = element.concept_guid;
                element.label = element.banner;
            });
            this.options.banner_list = list;
        }

        if(this.$route.name == 'editTTA')
        {
            this.page_function = 'edit';

            if(this.$route.query.guid)
            {
                this.currentTTA = this.$route.query.guid;
            }
            
            if(this.currentTTA == "")
            {
                this.showNotify('negative', 'Unable to identify TTA Guid.');
                this.$router.push({name: "tta"});
            }

            // get tta details
            var payload = {
                'tta_guid': this.currentTTA,
            }

            var pass_obj = {
                "dispatch": 'tta/trigger_get_tta',
                "getter": 'tta/get_tta',
                "app": this,
                "payload": payload,
            }

            var tta_details = await this.$dispatch(pass_obj);

            if(tta_details.status)
            {
                this.json = tta_details.response.data;
                this.json.distributor = [];
                this.json.division = [];
                this.json.distributor_list = [];
                this.json.banner = [];
                this.json.division_group = "division";
                this.original_json = JSON.parse(JSON.stringify(this.json));

                if(this.json.terminated == 1 || this.json.renewed == 1 || this.json.approved == 1 || this.json.rejected == 1)
                {
                    this.readonlyStatus = true;
                }

                if(this.json.effective_date_from && this.json.effective_date_from.length > 0)
                {
                    this.json.effective_date_from = this.json.effective_date_from.split(' ')[0];
                }

                if(this.json.effective_date_to && this.json.effective_date_to.length > 0)
                {
                    this.json.effective_date_to = this.json.effective_date_to.split(' ')[0];
                }

                // get distributor value
                var payload = {
                    params: {
                        'tta_guid': this.currentTTA,
                    }
                }

                var pass_obj = {
                    "dispatch": 'tta/trigger_get_tta_distributor_list',
                    "getter": 'tta/get_distributor',
                    "app": this,
                    "payload": payload,
                }

                var distributor = await this.$dispatch(pass_obj);


                if(distributor.status)
                {
                    const data = distributor.response.data;
                    if( data.count > 0)
                    {
                        this.json.distributor = data.results.map((entry)=>{return entry.supplier_guid});
                        this.json.distributor_list = data.results;
                        this.original_json.distributor = data.results;
                    }
                }

                // get division value
                var payload = {
                    params: {
                        'tta_guid': this.currentTTA,
                    }
                }

                var pass_obj = {
                    "dispatch": 'tta/trigger_get_tta_division_list',
                    "getter": 'tta/get_division',
                    "app": this,
                    "payload": payload,
                }

                var division = await this.$dispatch(pass_obj);


                if(division.status)
                {
                    const data = division.response.data;
                    if( data.count > 0)
                    {
                        this.json.division = data.results.map((entry)=>{
                            return entry.type == 'division' ? entry.division_guid : entry.type == 'dept' ? entry.dept_guid : entry.type == 'subdept' ? entry.subdept_guid : entry.category_guid;
                        });
                        this.original_json.division = data.results;
                        this.json.division_group = data.results[0].type;
                    }
                }

                // get banner value
                var payload = {
                    params: {
                        'tta_guid': this.currentTTA,
                    }
                }

                var pass_obj = {
                    "dispatch": 'tta/trigger_get_tta_banner_list',
                    "getter": 'tta/get_banner',
                    "app": this,
                    "payload": payload,
                }

                var banner = await this.$dispatch(pass_obj);

                if(banner.status)
                {
                    const data = banner.response.data;
                    if( data.count > 0)
                    {
                        this.json.banner = data.results.map((entry)=>{return entry.concept_guid});
                        this.original_json.banner = data.results;
                    }
                }
            }

            this.$nextTick(async ()=>{
                this.options.division_list = await this.divisionOptions;

                // get tab for tta
                var payload = {
                    params: {
                        'tta_guid': this.currentTTA,
                    }
                }

                var pass_obj = {
                    "dispatch": 'tta/trigger_get_tta_tab_list',
                    "getter": 'tta/get_tab',
                    "app": this,
                    "payload": payload,
                }

                var tta_tab = await this.$dispatch(pass_obj);

                if(tta_tab.status)
                {
                    this.ttaTab = tta_tab.response.data.results;
                    this.ttaTab.sort((a,b)=> a.tab_info.number - b.tab_info.number);
                    for(var i in this.ttaTab)
                    {
                        this.ttaTab[i].tab_article = [];
                        if(this.ttaTab[i].type == "TIR")
                        {
                            // get tier
                            var payload = {
                                params: {
                                    'tta_guid': this.currentTTA,
                                }
                            }

                            var pass_obj = {
                                "dispatch": 'tta/trigger_get_tta_tir_list',
                                "getter": 'tta/get_tir',
                                "app": this,
                                "payload": payload,
                            }

                            var tier = await this.$dispatch(pass_obj);
                            this.ttaTab[i].tab_article = [];
                            if(tier.status)
                            {
                                this.ttaTab[i].tab_article = tier.response.data.results;
                                if(this.ttaTab[i].tab_article.length>0)
                                {
                                    this.tir.billing_type = this.ttaTab[i].tab_article[0].billing_type;
                                    this.tir.calc_method = this.ttaTab[i].tab_article[0].calc_method;
                                    // this.tir.cutoff_date = this.ttaTab[i].tab_article[0].cutoff_date;
                                    this.tir.billing_readonly = this.tir.calc_method == 'growth_percent' || this.tir.calc_method == 'growth_amt' ? true : false;
                                }
                            }
                            this.table_function_target_incentive_rebate(this.ori_params.target_incentive_rebate);
                        }
                        else
                        {
                            // get article for tta tab
                            var payload = {
                                params: {
                                    'tta_tab_guid': this.ttaTab[i].tta_tab_guid,
                                }
                            }

                            var pass_obj = {
                                "dispatch": 'tta/trigger_get_tta_tab_article_list',
                                "getter": 'tta/get_article',
                                "app": this,
                                "payload": payload,
                            }

                            var tab_article = await this.$dispatch(pass_obj);
                            
                            if(tab_article.status)
                            {
                                var tab_article_list = tab_article.response.data.results;
                                for(var x in tab_article_list)
                                {
                                    const article = tab_article_list[x];
                                    if(article.component_type == "rate_purgrossnet_date" || article.component_type == "rate_purgrossnet")
                                    {
                                        article.option1_list = this.options.calcType_list;
                                        article.remark1_list = this.options.pur_grossnet_list;
                                    }
                                    else if(article.component_type == "rate_cogsinvnet_date" || article.component_type == "rate_cogsinvnet")
                                    {
                                        article.option1_list = this.options.calcType_list;
                                        article.remark1_list = this.options.inv_grossnet_list;
                                    }
                                    else if(article.component_type == "dollar_rate_remark")
                                    {
                                        article.option1_list = [this.options.calcType_list[1]];
                                        article.remark1_list = [{value: article.remark1, label: this.toNormalCase(article.remark1)}];
                                    }
                                    else if(article.component_type == "target_ratetype_rate_remark")
                                    {
                                        article.option1_list = this.options.calcType_list;
                                        article.remark1_list = [{value: article.remark1, label: this.toNormalCase(article.remark1)}];
                                        article.option2_list = this.options.calcType_list;
                                        article.remark2_list = [{value: article.remark2, label: this.toNormalCase(article.remark2)}];
                                    }
                                    else if(article.component_type == "months_rate_percentage" || article.component_type == "days_rate_percentage")
                                    {
                                        article.option2_list = this.options.calcType_list;
                                    }

                                    article.is_auto = article.tab_article_info.calc_type == 'auto' ? true : false;
                                }
                                this.ttaTab[i].tab_article = tab_article_list;
                            }
                        }
                        
                    }
                }
                this.original_ttaTab = JSON.parse(JSON.stringify(this.ttaTab));

                // get condition of trade for tta
                var payload = {
                    params: {
                        'tta_guid': this.currentTTA,
                    }
                }

                var pass_obj = {
                    "dispatch": 'tta/trigger_get_tta_cot_list',
                    "getter": 'tta/get_cot',
                    "app": this,
                    "payload": payload,
                }

                var tta_cot = await this.$dispatch(pass_obj);

                if(tta_cot.status)
                {
                    console.log("cot",tta_cot)
                    if(tta_cot.response.data.count > 0)
                    {
                        this.conditionTrade = tta_cot.response.data.results[0].cot_guid;
                        this.original_json.conditionTrade = tta_cot.response.data.results[0];
                    }                
                }

                this.ori_params.attachment = {
                    params: {
                        "ordering": "",
                    }
                }
                this.table_function_attachment(this.ori_params.attachment);
                console.log("tta tab", this.ttaTab);
                console.log("tta", this.json);
            });
            
        }
        else if(this.$route.name == 'createTTA')
        {
            this.page_function = 'create';
            this.currentTTA = "";
            this.readonlyStatus = false;
            this.options.division_list = await this.divisionOptions;
        }
        
        this.showLoading = false;
    },
    methods:{
        handleChangeStartDate(newVal)
        {
            this.json.effective_date_from = newVal;
        },
        handleChangeEndDate(newVal)
        {
            this.json.effective_date_to = newVal;
            // this.ttaTab.forEach(tab => {
            //     if(tab.tab_article)
            //     {
            //         tab.tab_article.forEach(article => {
            //             if((article.tab_article_info && (article.tab_article_info.calc_type == 'auto'))
            //             || article.calc_type == 'auto')
            //             {
            //                 article.date_range_to = this.json.effective_date_to;
            //             }
            //         })
            //     }                
            // })
            // console.log('change date end',this.ttaTab);
        },
        // handleChangeCutOffDate(newVal)
        // {
        //     this.tir.cutoff_date = newVal;
        //     this.table_data.target_incentive_rebate.data.results.map((entry)=>{
        //         entry.cutoff_date = this.tir.cutoff_date;
        //     });
        // },
        handleChangeDayMonthRate(article,newVal)
        {
            article.value1 = newVal.input1;
            article.value2 = newVal.input2;
            article.option1 = newVal.select1;
            article.option2 = newVal.select2;
        },
        handleChangeDistributor(newVal)
        {
            const distributor = this.json.distributor_list.filter(entry=>newVal.includes(entry.supplier_guid));
            
            const new_distributor = this.options.distributor_list.filter(entry=>{
                if(newVal.includes(entry.supplier_guid) && !distributor.map(entry=>entry.supplier_guid).includes(entry.supplier_guid))
                {
                    distributor.push(entry);
                }
            });
            this.json.distributor_list = distributor;
            console.log("change distributor",this.json.distributor_list)
        },
        handleChangeDivisionType()
        {
            this.json.division = [];
            this.$nextTick(async ()=>{
                this.options.division_list = await this.divisionOptions;
            });
        },
        async handleChangeCalcMethod(newVal)
        {
            if(newVal == 'growth_percent' || newVal == 'growth_amt')
            {
                this.tir.billing_type = 'yearly';
                this.tir.billing_readonly = true;
            }
            else
            {
                this.tir.billing_readonly = false;
            }

            await this.table_function_target_incentive_rebate(this.ori_params.target_incentive_rebate);
            this.table_data.target_incentive_rebate.data.results.map((entry)=>{
                entry.calc_method = newVal;
                entry.billing_type = this.tir.billing_type;
            });
        },
        async handleChangeBillingType(newVal)
        {
            this.table_data.target_incentive_rebate.data.results.map((entry)=>{
                entry.billing_type = newVal;
            });
        },
        handleCloseAddField()
        {
            this.dialog.add_field = false;
            this.dialog.articleValue = "";
        },
        addTab(){
            if(!this.dialog.tabValue) return;
            const tab = this.options.tab_list.filter((entry)=>{ return entry.tab_guid == this.dialog.tabValue; });
            this.ttaTab.push(tab[0]);
            console.log("add tab", this.ttaTab);
            this.currentTab = tab[0].type;
            this.dialog.tabValue = "";
            this.dialog.add_tab = false;
        },
        handleAddTab()
        {
            if(this.readonlyStatus) return;
            this.dialog.add_tab = true;
        },
        removeTab(tab){
            if(this.readonlyStatus) return;
            const ttaTab = this.ttaTab.filter((entry)=>{ 
                return entry.tab_guid != tab.tab_guid; 
            });
            this.ttaTab = ttaTab;
            console.log("remove tab", this.ttaTab);
        },
        addField(){
            if(!this.dialog.articleValue) return;

            var article = this.options.tabArticle_list.filter((entry)=>{ return entry.tab_article_guid == this.dialog.articleValue; });
            article = article[0];

            if(article.calc_type == 'auto')
            {
                if(this.json.effective_date_from == "" || this.json.effective_date_to == "")
                {
                    this.showNotify('negative','Please select TTA effective start date and effective end date.');
                    return;
                }
            }

            for(var i in this.ttaTab)
            {
                if(this.ttaTab[i].tab_guid == this.dialog.currentTab.tab_guid)
                {
                    article.value1 = 0;
                    article.value2 = 0;
                    article.option1 = "";
                    article.option2 = "";
                    article.remark1 = "";
                    article.remark2 = "";
                    article.date_range_from = "";
                    article.date_range_to = "";

                    if(article.calc_type == 'auto')
                    {
                        article.is_auto = true;
                        article.date_range_from = this.json.effective_date_from;
                        article.date_range_to = this.json.effective_date_to;
                    }
                    else
                    {
                        article.is_auto = false;
                    }

                    if(article.component_type == "rate_purgrossnet_date" || article.component_type == "rate_purgrossnet")
                    {
                        if(article.component_type == "rate_purgrossnet_date")
                        {
                            article.date_range_from = this.json.effective_date_from;
                            article.date_range_to = this.json.effective_date_to;
                        }
                        article.option1_list = this.options.calcType_list;
                        article.remark1_list = this.options.pur_grossnet_list;
                        article.option1 = article.option1_list[0].value;
                        article.remark1 = article.remark1_list[0].value;
                    }
                    else if(article.component_type == "rate_cogsinvnet_date" || article.component_type == "rate_cogsinvnet")
                    {
                        if(article.component_type == "rate_cogsinvnet_date")
                        {
                            article.date_range_from = this.json.effective_date_from;
                            article.date_range_to = this.json.effective_date_to;
                        }
                        article.option1_list = this.options.calcType_list;
                        article.remark1_list = this.options.inv_grossnet_list;
                        article.option1 = article.option1_list[0].value;
                        article.remark1 = article.remark1_list[0].value;
                    }
                    else if(article.component_type == "dollar_rate_remark")
                    {
                        article.option1_list = [this.options.calcType_list[1]];
                        article.remark1_list = [{value: this.toCamelCase(article.label1), label: article.label1}];
                        article.option1 = article.option1_list[0].value;
                        article.remark1 = article.remark1_list[0].value;
                    }
                    else if(article.component_type == "target_ratetype_rate_remark")
                    {
                        article.option1_list = this.options.calcType_list;
                        article.remark1_list = [{value: this.toCamelCase(article.label1), label: article.label1}];
                        article.option2_list = this.options.calcType_list;
                        article.remark2_list = [{value: this.toCamelCase(article.label2), label: article.label2}];
                        article.option1 = article.option1_list[0].value;
                        article.remark1 = article.remark1_list[0].value;
                        article.option2 = article.option2_list[0].value;
                        article.remark2 = article.remark2_list[0].value;
                    }
                    else if(article.component_type == "months_rate_percentage")
                    {
                        article.option2_list = this.options.calcType_list;
                        article.option1 = "month";
                        article.option2 = article.option2_list[0].value;
                        article.remark1 = "OrderWithinXMonths";
                    }
                    else if(article.component_type == "days_rate_percentage")
                    {
                        article.option2_list = this.options.calcType_list;
                        article.option1 = "day";
                        article.option2 = article.option2_list[0].value;
                        article.remark1 = "OrderWithinXDays";
                    }

                    console.log('article', article);

                    if(this.ttaTab[i].tab_article)
                    {
                        this.ttaTab[i].tab_article.push(article);
                    }
                    else
                    {
                        this.ttaTab[i].tab_article = [article];
                    }
                }
            }
            console.log("add article", this.ttaTab);
            this.dialog.articleValue = "";
            this.dialog.add_field = false;
        },
        removeField(article)
        {
            console.log(article)
            var tab = this.ttaTab.filter((entry)=>{ 
                return entry.tab_guid == article.tab_guid || (article.tta_tab_info && entry.tab_guid == article.tta_tab_info.tab_guid); 
            });

            const tab_article = tab[0].tab_article.filter((entry)=>{
                return entry.tab_article_guid != article.tab_article_guid;
            })

            tab[0].tab_article = tab_article;
            
            console.log('remove article', this.ttaTab);
        },
        handleAddField(curTab)
        {
            if(this.readonlyStatus) return;
            this.dialog.currentTab = curTab;
            this.dialog.add_field = true;
        },
        addTier()
        {
            if(this.readonlyStatus) return;

            if(!this.tir.calc_method)
            {
                this.showNotify('negative','Please select calculation method.');
                return;
            }

            if(!this.tir.billing_type)
            {
                this.showNotify('negative','Please select billing type.');
                return;
            }

            // if(this.tir.cutoff_date == "")
            // {
            //     this.showNotify('negative','Please select cut off date range.');
            //     return;
            // }

            var tier_no = this.table_data.target_incentive_rebate.data.results.length + 1;
            const tier = {
                "calc_method": this.tir.calc_method,
                "billing_type": this.tir.billing_type,
                // "cutoff_date": this.tir.cutoff_date,
                "tier_no": `Tier ${tier_no}`,
                "rate": "",
                "rebate_from": "",
                "rebate_to": "",
            }
            this.table_data.target_incentive_rebate.data.results.push(tier);
            console.log('add tier',this.table_data.target_incentive_rebate);
        },
        removeTier(tier)
        {
            if(this.readonlyStatus) return;

            const index = this.table_data.target_incentive_rebate.data.results.findIndex(entry => entry.tier_no === tier.row.tier_no);
            if (index !== -1) {
                this.table_data.target_incentive_rebate.data.results.splice(index, 1);
                for(var i in this.table_data.target_incentive_rebate.data.results)
                {
                    this.table_data.target_incentive_rebate.data.results[i].tier_no = `Tier ${parseInt(i)+1}`;
                }
            }
            console.log('remove tier', this.table_data.target_incentive_rebate.data.results);
            // update tier no after remove
        },
        async handleReceiveHandleRemove(data){
            this.dialog.loading = true;

            var payload = {
                'tta_distributor_guid': data.row.tta_distributor_guid,
            }
            var pass_obj = {
                "dispatch": 'tta/trigger_delete_tta_distributor',
                "getter": 'tta/get_distributor',
                "app": this,
                "payload": payload,
            };

            var data_response = await this.$dispatch(pass_obj);

            if(!data_response.status)
            {
                this.showNotify('negative','Delete distributor fail.');
                console.log('delete tta distributor fail',data_response);
                this.dialog.loading = false;
                return;
            }

            const new_distributor = this.json.distributor.filter(entry=>{return entry != data.row.supplier_guid});
            this.json.distributor = new_distributor;

            this.showNotify('positive','Distributor has been removed.');
            this.table_function_distributor(this.ori_params.distributor);
            this.table_function_audit_trail(this.ori_params.audit_trail);
            this.dialog.loading = false;
        },
        handleTableChangeDistributor(newVal)
        {
            var new_params = this.$pluginsTableParams(newVal)

            var payload = {
                params : new_params
            };

            this.ori_params.distributor = payload;

            this.table_function_distributor(payload);
        },
        async table_function_distributor(payload)
        {
            this.showLoading = true;
            if(this.json.approved == 1)
            {
                var table_column = [
                    {
                        name: 'action',
                        required: true,
                        label: 'Action',
                        align: 'center',
                        sortable: true,
                        field: 'action',
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
                        name: 'code',
                        required: true,
                        label: 'Code',
                        align: 'center',
                        sortable: true,
                        field: 'code',
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
                        name: 'name',
                        required: true,
                        label: 'Name',
                        align: 'left',
                        sortable: true,
                        field: 'name',
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
                        data_type: 'input_text',
                    },
                ];

                // get tta distributor
                payload.params.tta_guid = this.currentTTA;

                if(payload.params.ordering == "")
                {
                    payload.params.ordering = 'code'
                }

                var pass_obj = {
                    "dispatch": 'tta/trigger_get_tta_distributor_list',
                    "getter": 'tta/get_distributor',
                    "app": this,
                    "payload": payload,
                }

                var distributor = await this.$dispatch(pass_obj);

                if(distributor.status)
                {
                    var table_data = distributor.response;
                }
                else
                {
                    var table_data = {
                        data: {
                            results: []
                        }
                    };
                }
            }
            else
            {
                var table_column = [
                    {
                        name: 'code',
                        required: true,
                        label: 'Code',
                        align: 'center',
                        sortable: true,
                        field: 'code',
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
                        name: 'name',
                        required: true,
                        label: 'Name',
                        align: 'left',
                        sortable: true,
                        field: 'name',
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
                        data_type: 'input_text',
                    },
                ];

                if(this.json.distributor_list == [])
                {
                    var table_data = {
                        data: {
                            results: []
                        }
                    };
                }
                else
                {
                    const count = this.json.distributor_list.length;
                    const hasNext = payload.params.offset + payload.params.limit < count;
                    const hasPrev = payload.params.offset > 0;
                    var table_data = {
                        data: {
                            count: count,
                            next: hasNext ? payload.params.offset + payload.params.limit : null,
                            prev: hasPrev ? payload.params.offset - payload.params.limit : null,
                            results: this.json.distributor_list.slice(payload.params.offset, payload.params.offset + payload.params.limit),
                        }
                    };
                }
            }
            
            this.table_column.distributor = table_column;            
            this.table_data.distributor = table_data;
            
            this.showLoading = false;
        },
        handleTableChangeAuditTrail(newVal)
        {
            var new_params = this.$pluginsTableParams(newVal)

            var payload = {
                params : new_params
            };

            this.ori_params.audit_trail = payload;

            this.table_function_audit_trail(payload);
        },
        async table_function_audit_trail(payload)
        {
            this.showLoading = true;
            var table_column = [
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
                    align: 'center',
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

            this.table_column.audit_trail = table_column;

            // get tta audit trails
            payload.params.tta_guid = this.currentTTA;

            if(payload.params.ordering == "")
            {
                payload.params.ordering = '-updated_at'
            }

            var pass_obj = {
                "dispatch": 'tta/trigger_get_audit_trail_list',
                "getter": 'tta/get_audit_trail',
                "app": this,
                "payload": payload,
            }

            var audit_trail = await this.$dispatch(pass_obj);

            if(audit_trail.status)
            {
                var table_data = audit_trail.response;
                for(var i in table_data.data.results)
                {
                    table_data.data.results[i].changes_action = table_data.data.results[i].action;
                }
            }
            else
            {
                var table_data = {
                    data: {
                        results: []
                    }
                };
            }
            this.table_data.audit_trail = table_data;
            
            this.showLoading = false;
        },
        handleTableChangeTargetIncentiveRebate(newVal)
        {
            var new_params = this.$pluginsTableParams(newVal)

            var payload = {
                params : new_params
            };

            this.ori_params.target_incentive_rebate = payload;

            this.table_function_target_incentive_rebate(payload);
        },
        async table_function_target_incentive_rebate(payload)
        {
            if(!this.currentTTA || this.currentTTA == "")
            {
                this.table_column.target_incentive_rebate = [
                    {
                        name: 'action',
                        required: true,
                        label: 'Action',
                        align: 'center',
                        sortable: false,
                        field: 'action',
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
                        name: 'tier_no',
                        required: true,
                        label: 'Tier',
                        align: 'center',
                        sortable: true,
                        field: 'tier_no',
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
                        name: 'rebate_from',
                        required: true,
                        label: 'From',
                        align: 'center',
                        sortable: true,
                        field: 'rebate_from',
                        data_type: this.readonlyStatus ? '' : 'input_number',
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
                        name: 'rebate_to',
                        required: true,
                        label: 'To',
                        align: 'center',
                        sortable: true,
                        field: 'rebate_to',
                        data_type: this.readonlyStatus ? '' : 'input_number',
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
                        name: 'rate',
                        required: true,
                        label: `Rebate (${this.displayTierRebate})`,
                        align: 'center',
                        sortable: true,
                        field: 'rate',
                        data_type: this.readonlyStatus ? '' : 'input_number',
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
                this.table_data.target_incentive_rebate = {
                    data: {
                        results: []
                    }
                };
                return;
            }

            this.showLoading = true;

            var table_column = [
                {
                    name: 'action',
                    required: true,
                    label: 'Action',
                    align: 'center',
                    sortable: false,
                    field: 'action',
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
                    name: 'tier_no',
                    required: true,
                    label: 'Tier',
                    align: 'center',
                    sortable: true,
                    field: 'tier_no',
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
                    name: 'rebate_from',
                    required: true,
                    label: 'From',
                    align: 'center',
                    sortable: true,
                    field: 'rebate_from',
                    data_type: this.readonlyStatus ? 'number' : 'input_number',
                    data_decimal: 2,
                    prefix: this.tir.calc_method == 'growth_percent' ? '%' : '$',
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
                    name: 'rebate_to',
                    required: true,
                    label: 'To',
                    align: 'center',
                    sortable: true,
                    field: 'rebate_to',
                    data_type: this.readonlyStatus ? 'number' : 'input_number',
                    data_decimal: 2,
                    prefix: this.tir.calc_method == 'growth_percent' ? '%' : '$',
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
                    name: 'rate',
                    required: true,
                    label: `Rebate (${this.displayTierRebate})`,
                    align: 'center',
                    sortable: true,
                    field: 'rate',
                    data_type: this.readonlyStatus ? '' : 'input_number',
                    data_decimal: 2,
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

            this.table_column.target_incentive_rebate = table_column;

            // get tier
            var payload = {
                params: {
                    'tta_guid': this.currentTTA,
                }
            }

            var pass_obj = {
                "dispatch": 'tta/trigger_get_tta_tir_list',
                "getter": 'tta/get_tir',
                "app": this,
                "payload": payload,
            }

            var tier = await this.$dispatch(pass_obj);

            if(tier.status)
            {
                var table_data = tier.response;
            }
            else
            {
                var table_data = {
                    data: {
                        results: []
                    }
                };
            }
            
            this.table_data.target_incentive_rebate = table_data;
            this.showLoading = false;
        },
        handleTableChangeHistory(newVal)
        {
            var new_params = this.$pluginsTableParams(newVal)

            var payload = {
                params : new_params
            };

            this.ori_params.history = payload;

            this.table_function_history(payload);
        },
        async table_function_history(payload)
        {
            this.dialog.loading = true;
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

            this.table_column.history = column;

            if(payload.params.ordering == "")
            {
                payload.params.ordering = "-date_time";
            }
            
            payload.params.tta_guid = this.json.tta_guid;

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

            this.table_data.history = rows;
            
            this.dialog.loading = false;
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
        async table_function_attachment(payload)
        {
            this.table_column.attachment = [
                {
                    name: 'action',
                    required: true,
                    label: 'Action',
                    align: 'center',
                    sortable: true,
                    field: 'action',
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
                    name: 'filename',
                    required: true,
                    label: 'Filename',
                    align: 'left',
                    sortable: true,
                    field: 'filename',
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

            if(payload.params.ordering == "")
            {
                payload.params.ordering = "-updated_at";
            }
            
            payload.params.tta_guid = this.json.tta_guid;

            var pass_obj = {
                "dispatch": 'tta/trigger_get_tta_upload_list',
                "getter": 'tta/get_upload',
                "app": this,
                "payload": payload,
            }

            var tta_upload = await this.$dispatch(pass_obj);

            if(tta_upload.status)
            {
                var rows = tta_upload.response;

                for(const row of rows.data.results)
                {
                    var url = row.file;
                    var filename = url.split('/').pop();
                    row.filename = filename;
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

            this.table_data.attachment = rows;
        },
        async saveDistributor(){
            this.dialog.loading = true;

            if(this.dialog.distributorValue == "")
            {
                this.showNotify('negative', "Please select distributor.");
                this.dialog.loading = false;
                return;
            }

            var payload = {
                pass_json: {
                    "created_by": this.username,
                    "updated_by": this.username,
                    "supplier_guid": this.dialog.distributorValue,
                    "company_guid": this.company_guid,
                    "tta_guid": this.currentTTA
                }
            }
            
            var pass_obj = {
                "dispatch": 'tta/trigger_create_tta_distributor',
                "getter": 'tta/get_distributor',
                "app": this,
                "payload": payload,
            }

            var data_response = await this.$dispatch(pass_obj);

            if(!data_response.status)
            {
                this.showNotify('negative','Add distributor fail.');
                console.log('create tta distributor fail', data_response.response);
                this.dialog.loading = false;
                return;
            }

            
            this.showNotify('positive','Distributor has been added.');
            this.table_function_distributor(this.ori_params.distributor);
            this.table_function_audit_trail(this.ori_params.audit_trail);
            this.dialog.loading = false;
            this.$nextTick(()=>{
                this.json.distributor.push(this.dialog.distributorValue);
                this.dialog.distributorValue = "";
                console.log(this.json.distributor);
            });
        },
        async saveCOT(tta_guid)
        {
            var payload = {
                pass_json: {
                    "updated_by": this.username,
                    "company_guid": this.company_guid,
                    "cot_guid": this.conditionTrade,
                    "tta_guid": tta_guid,
                }
            }

            if(this.original_json.conditionTrade && this.original_json.conditionTrade.tta_cot_guid)
            {   
                payload.tta_cot_guid = this.original_json.conditionTrade.tta_cot_guid;

                var pass_obj = {
                    "dispatch": 'tta/trigger_update_tta_cot_list',
                    "getter": 'tta/get_cot',
                    "app": this,
                    "payload": payload,
                }

                var data_response = await this.$dispatch(pass_obj);
            }
            else
            {
                payload.pass_json.created_by = this.username;

                var pass_obj = {
                    "dispatch": 'tta/trigger_create_tta_cot_list',
                    "getter": 'tta/get_cot',
                    "app": this,
                    "payload": payload,
                }

                var data_response = await this.$dispatch(pass_obj);
            }
            return data_response;
        },
        async saveTab(tta_guid)
        {
            try{
                var original_tab = this.original_ttaTab
                var new_tab = this.ttaTab;

                console.log(original_tab);
                console.log(new_tab);

                // Delete tta tab from original list if it does not include in new list
                const deleteTask = original_tab.map(async (entry)=>{
                    if(!new_tab.map(entry => entry.tab_guid).includes(entry.tab_guid)){
                        console.log('delete tab',entry)

                        // delete tab article or tier first
                        if(entry.type == 'TIR')
                        {
                            // delete tier
                            if(entry.tab_article.length > 0)
                            {
                                var deleted_tier = [];
                                for(const i in entry.tab_article)
                                {
                                    const obj = {
                                        "tta_tier_guid": entry.tab_article[i].tta_tier_guid,
                                    }
                                    deleted_tier.push(obj);
                                }
                                console.log('delete tier', deleted_tier);

                                var payload = {
                                    pass_json: deleted_tier,
                                }

                                var pass_obj = {
                                    "dispatch": 'tta/trigger_delete_tta_tir_bulk',
                                    "getter": 'tta/get_tir',
                                    "app": this,
                                    "payload": payload,
                                };

                                var data_response = await this.$dispatch(pass_obj);

                                if(!data_response.status)
                                {
                                    return data_response;
                                }
                            }
                        }
                        else
                        {
                            if(entry.tab_article.length > 0)
                            {
                                for(const i in entry.tab_article)
                                {
                                    console.log('delete article', entry.tab_article[i]);
                                    var payload = {
                                        'tta_tab_article_guid': entry.tab_article[i].tta_tab_article_guid,
                                    }

                                    var pass_obj = {
                                        "dispatch": 'tta/trigger_delete_tta_tab_article',
                                        "getter": 'tta/get_article',
                                        "app": this,
                                        "payload": payload,
                                    };

                                    var data_response = await this.$dispatch(pass_obj);

                                    if(!data_response.status)
                                    {
                                        return data_response;
                                    }
                                }
                            }
                        }
                        
                        // delete tab
                        var payload = {
                            'tta_tab_guid': entry.tta_tab_guid,
                        }

                        var pass_obj = {
                            "dispatch": 'tta/trigger_delete_tta_tab',
                            "getter": 'tta/get_tab',
                            "app": this,
                            "payload": payload,
                        };

                        var data_response = await this.$dispatch(pass_obj);

                        if(!data_response.status)
                        {
                            return data_response;
                        }
                    }
                })

                var results = await Promise.all(deleteTask);
                if (results.some(result => result && result.status === false)) {
                    return { status: false, response: "Delete tab error" };
                }

                // Create tta tab if it does not include in original list
                const createTask = new_tab.map(async (entry)=>{
                    if(!original_tab.map(entry=>entry.tab_guid).includes(entry.tab_guid)){
                        console.log('create tab', entry)

                        // create tab first
                        var payload = {
                            pass_json: {
                                "created_by": this.username,
                                "updated_by": this.username,
                                "tab_guid": entry.tab_guid,
                                "tta_guid": tta_guid,
                            }
                        }
                        var pass_obj = {
                            "dispatch": 'tta/trigger_create_tta_tab',
                            "getter": 'tta/get_tab',
                            "app": this,
                            "payload": payload,
                        }

                        var data_response = await this.$dispatch(pass_obj);

                        if(!data_response.status)
                        {
                            return data_response;
                        }

                        console.log('create tta tab success', data_response);

                        // create tab article or tier
                        if(entry.type == 'TIR')
                        {
                            // create tier
                            if(this.table_data.target_incentive_rebate.data.results.length > 0)
                            {
                                var created_tier = [];
                                for(const i in this.table_data.target_incentive_rebate.data.results)
                                {
                                    const obj = this.table_data.target_incentive_rebate.data.results[i];
                                    obj.tta_guid = tta_guid;
                                    obj.company_guid = this.company_guid;
                                    obj.created_by = this.username;
                                    obj.updated_by = this.username;
                                    obj.rebate_to = obj.rebate_to == "" ? null : obj.rebate_to;
                                    created_tier.push(obj);
                                }
                                console.log('create tier', created_tier);

                                var payload = {
                                    pass_json: created_tier,
                                }

                                var pass_obj = {
                                    "dispatch": 'tta/trigger_create_tta_tir_bulk',
                                    "getter": 'tta/get_tir',
                                    "app": this,
                                    "payload": payload,
                                };

                                var data_response = await this.$dispatch(pass_obj);

                                if(!data_response.status)
                                {
                                    return data_response;
                                }
                            }
                        }
                        else
                        {
                            if(entry.tab_article && entry.tab_article.length > 0)
                            {
                                for(const i in entry.tab_article)
                                {
                                    console.log('create article', entry.tab_article[i]);

                                    var payload = {
                                        pass_json: {
                                            "date_range_from": entry.tab_article[i].date_range_from == "" ? null : entry.tab_article[i].date_range_from,
                                            "date_range_to": entry.tab_article[i].date_range_to == "" ? null : entry.tab_article[i].date_range_to,
                                            "option1": entry.tab_article[i].option1,
                                            "option2": entry.tab_article[i].option2,
                                            "value1": entry.tab_article[i].value1,
                                            "value2": entry.tab_article[i].value2,
                                            "remark1": entry.tab_article[i].remark1,
                                            "remark2": entry.tab_article[i].remark2,
                                            "billing_type": entry.tab_article[i].billing_type,
                                            "component_type": entry.tab_article[i].component_type,
                                            "created_by": this.username,
                                            "updated_by": this.username,
                                            "tab_article_guid": entry.tab_article[i].tab_article_guid,
                                            "tta_tab_guid": data_response.response.tta_tab_guid,
                                            "tta_guid": tta_guid,
                                        }
                                    }

                                    var pass_obj = {
                                        "dispatch": 'tta/trigger_create_tta_tab_article',
                                        "getter": 'tta/get_article',
                                        "app": this,
                                        "payload": payload,
                                    };

                                    var data_response = await this.$dispatch(pass_obj);

                                    if(!data_response.status)
                                    {
                                        return data_response;
                                    }
                                }
                            }
                        }
                        
                    }
                })

                var results = await Promise.all(createTask);
                if (results.some(result => result && result.status === false)) {
                    return { status: false, response: "Create tab error" };
                }
                
                // Edit tta tab if it already existed in original list
                const editTask = new_tab.map(async (new_entry)=>{
                    const entry = original_tab.find(original_entry => original_entry.tab_guid === new_entry.tab_guid);
                    if(entry){
                        console.log("edit tab",new_entry)
                        
                        // edit tab article or tier
                        if(new_entry.type=='TIR')
                        {
                            const original_tier = new_entry.tab_article;
                            const new_tier = this.table_data.target_incentive_rebate.data.results;
                            console.log("ori tier", original_tier);
                            console.log("new tier", new_tier);

                            // delete tier if not listed in new tier list
                            var deleted_tier = [];
                            original_tier.filter(async (entry)=>{
                                if(!new_tier.map(entry => entry.tta_tier_guid).includes(entry.tta_tier_guid)){
                                    const obj = {
                                        "tta_tier_guid": entry.tta_tier_guid,
                                    }
                                    deleted_tier.push(obj);
                                }
                            });

                            if(deleted_tier.length>0)
                            {
                                console.log('delete tier', deleted_tier);
                                var payload = {
                                    pass_json: deleted_tier,
                                }

                                var pass_obj = {
                                    "dispatch": 'tta/trigger_delete_tta_tir_bulk',
                                    "getter": 'tta/get_tir',
                                    "app": this,
                                    "payload": payload,
                                };

                                var data_response = await this.$dispatch(pass_obj);

                                if(!data_response.status)
                                {
                                    return data_response;
                                }
                            }                            

                            // create tier if not listed in old tier list
                            var created_tier = [];
                            new_tier.filter(async (entry)=>{
                                if(!entry.tta_tier_guid){
                                    const obj = entry;
                                    obj.tta_guid = tta_guid;
                                    obj.company_guid = this.company_guid;
                                    obj.created_by = this.username;
                                    obj.updated_by = this.username;
                                    obj.rebate_to = obj.rebate_to == "" ? null : obj.rebate_to;
                                    created_tier.push(obj);
                                }
                            });

                            if(created_tier.length>0)
                            {
                                console.log('create tier', created_tier);
                                var payload = {
                                    pass_json: created_tier,
                                }

                                var pass_obj = {
                                    "dispatch": 'tta/trigger_create_tta_tir_bulk',
                                    "getter": 'tta/get_tir',
                                    "app": this,
                                    "payload": payload,
                                };

                                var data_response = await this.$dispatch(pass_obj);

                                if(!data_response.status)
                                {
                                    return data_response;
                                }
                            }                            

                            // edit tier if listed in both old and new tier list
                            var edit_tier = [];
                            new_tier.filter(async (new_entry)=>{
                                const entry = original_tier.find(original_entry => original_entry.tta_tier_guid === new_entry.tta_tier_guid);
                                if(entry){
                                    const obj = new_entry;
                                    obj.updated_by = this.username;
                                    obj.rebate_to = obj.rebate_to == "" ? null : obj.rebate_to;
                                    edit_tier.push(obj);
                                }
                            });

                            if(edit_tier.length>0)
                            {
                                console.log("edit tier",edit_tier);
                                var payload = {
                                    pass_json: edit_tier,
                                }

                                var pass_obj = {
                                    "dispatch": 'tta/trigger_update_tta_tir_bulk',
                                    "getter": 'tta/get_tir',
                                    "app": this,
                                    "payload": payload,
                                };

                                var data_response = await this.$dispatch(pass_obj);

                                if(!data_response.status)
                                {
                                    return data_response;
                                }
                            }                            
                        }
                        else
                        {
                            const original_article = entry.tab_article;
                            const new_article = new_entry.tab_article;

                            // Delete article from original list if it does not include in new list
                            const deleteTask = original_article.map(async (entry)=>{
                                if(!new_article.map(entry => entry.tab_article_guid).includes(entry.tab_article_guid)){
                                    console.log('delete article',entry);

                                    var payload = {
                                        'tta_tab_article_guid': entry.tta_tab_article_guid,
                                    }

                                    var pass_obj = {
                                        "dispatch": 'tta/trigger_delete_tta_tab_article',
                                        "getter": 'tta/get_article',
                                        "app": this,
                                        "payload": payload,
                                    };

                                    var data_response = await this.$dispatch(pass_obj);

                                    if(!data_response.status)
                                    {
                                        return data_response;
                                    }
                                }
                            });

                            var results = await Promise.all(deleteTask);
                            if (results.some(result => result && result.status === false)) {
                                return { status: false, response: "Delete article error" };
                            }

                            // Create article if it does not include in original list
                            const createTask = new_article.map(async (entry)=>{
                                if(!original_article.map(entry=>entry.tab_article_guid).includes(entry.tab_article_guid)){
                                    console.log('create article', entry)

                                    var payload = {
                                        pass_json: {
                                            "date_range_from": entry.date_range_from == "" ? null : entry.date_range_from,
                                            "date_range_to": entry.date_range_to == "" ? null : entry.date_range_to,
                                            "option1": entry.option1,
                                            "option2": entry.option2,
                                            "value1": entry.value1,
                                            "value2": entry.value2,
                                            "remark1": entry.remark1,
                                            "remark2": entry.remark2,
                                            "billing_type": entry.billing_type,
                                            "component_type": entry.component_type,
                                            "created_by": this.username,
                                            "updated_by": this.username,
                                            "tab_article_guid": entry.tab_article_guid,
                                            "tta_tab_guid": new_entry.tta_tab_guid,
                                            "tta_guid": tta_guid,
                                        }
                                    }

                                    var pass_obj = {
                                        "dispatch": 'tta/trigger_create_tta_tab_article',
                                        "getter": 'tta/get_article',
                                        "app": this,
                                        "payload": payload,
                                    };

                                    var data_response = await this.$dispatch(pass_obj);

                                    if(!data_response.status)
                                    {
                                        return data_response;
                                    }
                                }
                            });

                            var results = await Promise.all(createTask);
                            if (results.some(result => result && result.status === false)) {
                                return { status: false, response: "Create article error" };
                            }

                            // Edit article if it already existed in original list
                            const editTask = new_article.map(async (new_entry)=>{
                                const entry = original_article.find(original_entry => original_entry.tab_article_guid === new_entry.tab_article_guid);
                                if(entry && new_entry.tta_tab_article_guid){
                                    console.log("edit article 1",new_entry);

                                    var payload = {
                                        tta_tab_article_guid: new_entry.tta_tab_article_guid,
                                        pass_json: {
                                            "date_range_from": new_entry.date_range_from == "" ? null : new_entry.date_range_from,
                                            "date_range_to": new_entry.date_range_to == "" ? null : new_entry.date_range_to,
                                            "option1": new_entry.option1,
                                            "option2": new_entry.option2,
                                            "value1": new_entry.value1,
                                            "value2": new_entry.value2,
                                            "remark1": new_entry.remark1,
                                            "remark2": new_entry.remark2,
                                            "billing_type": new_entry.billing_type,
                                            "component_type": new_entry.component_type,
                                            "updated_by": this.username,
                                            "tab_article_guid": new_entry.tab_article_guid,
                                            "tta_tab_guid": new_entry.tta_tab_guid,
                                            "tta_guid": tta_guid,
                                        }
                                    }

                                    console.log(payload);

                                    var pass_obj = {
                                        "dispatch": 'tta/trigger_update_tta_tab_article',
                                        "getter": 'tta/get_article',
                                        "app": this,
                                        "payload": payload,
                                    };

                                    var data_response = await this.$dispatch(pass_obj);

                                    if(!data_response.status)
                                    {
                                        return data_response;
                                    }
                                }
                                else if(entry && entry.tta_tab_article_guid)
                                {
                                    console.log("edit article 2",new_entry);

                                    var payload = {
                                        tta_tab_article_guid: entry.tta_tab_article_guid,
                                        pass_json: {
                                            "date_range_from": new_entry.date_range_from == "" ? null : new_entry.date_range_from,
                                            "date_range_to": new_entry.date_range_to == "" ? null : new_entry.date_range_to,
                                            "option1": new_entry.option1,
                                            "option2": new_entry.option2,
                                            "value1": new_entry.value1,
                                            "value2": new_entry.value2,
                                            "remark1": new_entry.remark1,
                                            "remark2": new_entry.remark2,
                                            "billing_type": new_entry.billing_type,
                                            "component_type": new_entry.component_type,
                                            "updated_by": this.username,
                                            "tab_article_guid": new_entry.tab_article_guid,
                                            "tta_tab_guid": entry.tta_tab_guid,
                                            "tta_guid": tta_guid,
                                        }
                                    }

                                    console.log(payload);

                                    var pass_obj = {
                                        "dispatch": 'tta/trigger_update_tta_tab_article',
                                        "getter": 'tta/get_article',
                                        "app": this,
                                        "payload": payload,
                                    };

                                    var data_response = await this.$dispatch(pass_obj);

                                    if(!data_response.status)
                                    {
                                        return data_response;
                                    }
                                }
                            });

                            var results = await Promise.all(editTask);
                            if (results.some(result => result && result.status === false)) {
                                return { status: false, response: "Edit article error" };
                            }
                        }
                    }
                });

                var results = await Promise.all(editTask);
                if (results.some(result => result && result.status === false)) {
                    return { status: false, response: "Edit tab error" };
                }
                else
                {
                    return { status: true };
                }

            }catch(error){
                console.log("error",error)
                return { status: false, response: error };
            }
        },
        async saveTTA(){
            this.showLoading = true;

            // validate form
            var error = 0;
            await this.$refs.save_form.validate().then(valid => {
                if (!valid) {
                    error = 1;
                }
            });

            var error = error == 1 ? false : true;
            console.log(error, this.json)

            if(!error)
            {
                this.showNotify('negative', 'Please make sure all field is correct.');
                this.showLoading = false;
                return;
            }

            // validate TIR table
            if(this.ttaTab.map(entry=>entry.type).includes('TIR'))
            {
                const tier = this.table_data.target_incentive_rebate.data.results;
                
                for(var i in tier)
                {
                    // if(tier[i].cutoff_date_from < `${this.json.effective_date_from.split('-')[0]}-01-01`)
                    // {
                    //     this.showNotify('negative','Cut off start date must within the same year as TTA effective start date.');
                    //     this.showLoading = false;
                    //     return;
                    // }

                    // if(tier[i].cutoff_date_to > this.json.effective_date_to)
                    // {
                    //     this.showNotify('negative','Cut off end date must lesser than TTA effective end date.');
                    //     this.showLoading = false;
                    //     return;
                    // }
                    
                    if(i == (tier.length-1))
                    {
                        if(tier[i].rate == "" || tier[i].rebate_from == "")
                        {
                            this.showNotify('negative', 'Please fill in rate and start rebate for the last tier.');
                            this.showLoading = false;
                            return;
                        }
                    }
                    else
                    {
                        if(tier[i].rate == "" || tier[i].rebate_from == "" || tier[i].rebate_to == "")
                        {
                            this.showNotify('negative', 'Please fill in all target incentive rebate tier fields.');
                            this.showLoading = false;
                            return;
                        }
                    }

                    if((tier[i].calc_method == 'growth_percent' && (tier[i].rebate_from > 100 || tier[i].rebate_to > 100)) || tier[i].rate > 100)
                    {
                        this.showNotify('negative', 'Percentage cannot more than 100.');
                        this.showLoading = false;
                        return;
                    }
                }
            }

            console.log(this.json);

            var payload = {
                pass_json: {
                    "supplier_pic_name": this.json.supplier_pic_name,
                    "supplier_pic_designation": this.json.supplier_pic_designation,
                    "supplier_pic_contact": this.json.supplier_pic_contact,
                    "supplier_pic_email": this.json.supplier_pic_email,
                    "effective_date_from": this.json.effective_date_from,
                    "effective_date_to": this.json.effective_date_to,
                    "updated_by": this.username,
                    "authorised_by": this.json.authorised_by,
                    "approve_by": this.json.approve_by,
                    "issued_by": this.json.issued_by,
                    "agreement_status": this.json.agreement_status,
                    "remarks": this.json.remarks,
                    "supplier_to": this.json.supplier_to,
                    "company_guid": this.company_guid,
                }
            }

            // create tta process
            if(this.page_function == 'create')
            {
                payload.pass_json.created_by = this.username;
                payload.pass_json.issued_user = this.user_info_guid;

                var pass_obj = {
                    "dispatch": 'tta/trigger_create_tta',
                    "getter": 'tta/get_tta',
                    "app": this,
                    "payload": payload,
                }

                var create_response = await this.$dispatch(pass_obj);

                if(create_response.status)
                {
                    const tta = create_response.response;

                    // create tta distributor
                    try
                    {
                        for(var obj of this.json.distributor_list)
                        {
                            var payload = {
                                pass_json: {
                                    "created_by": this.username,
                                    "updated_by": this.username,
                                    "supplier_guid": obj.supplier_guid,
                                    "remarks": obj.remarks,
                                    "company_guid": this.company_guid,
                                    "tta_guid": tta.tta_guid,
                                }
                            }
                            var pass_obj = {
                                "dispatch": 'tta/trigger_create_tta_distributor',
                                "getter": 'tta/get_distributor',
                                "app": this,
                                "payload": payload,
                            }

                            var data_response = await this.$dispatch(pass_obj);

                            if(!data_response.status)
                            {
                                throw data_response.response;
                            }
                        }
                    }
                    catch(error)
                    {
                        this.showNotify('negative','Create fail.');
                        console.log('Error create tta distributor',error);
                        return;
                    }

                    // create tta division
                    try
                    {
                        for(var guid of this.json.division)
                        {
                            var payload = {
                                pass_json: {
                                    "created_by": this.username,
                                    "updated_by": this.username,
                                    "type": this.json.division_group,
                                    "tta_guid": tta.tta_guid,
                                    "company_guid": this.company_guid,
                                }
                            }

                            this.json.division_group == 'division' 
                                ? payload.pass_json.division_guid = guid : this.json.division_group == 'dept' 
                                ? payload.pass_json.dept_guid = guid : this.json.division_group == 'subdept' 
                                ? payload.pass_json.subdept_guid = guid : payload.pass_json.category_guid = guid;
                            
                            var pass_obj = {
                                "dispatch": 'tta/trigger_create_tta_division',
                                "getter": 'tta/get_division',
                                "app": this,
                                "payload": payload,
                            }

                            var data_response = await this.$dispatch(pass_obj);

                            if(!data_response.status)
                            {
                                throw data_response.response;
                            }
                        }
                    }
                    catch(error)
                    {
                        this.showNotify('negative','Create fail.');
                        console.log('Error create tta division',error);
                        return;
                    }

                    // create tta banner
                    try
                    {
                        for(var guid of this.json.banner)
                        {
                            var payload = {
                                pass_json: {
                                    "created_by": this.username,
                                    "updated_by": this.username,
                                    "concept_guid": guid,
                                    "tta_guid": tta.tta_guid,
                                    "company_guid": this.company_guid,
                                }
                            }
                            var pass_obj = {
                                "dispatch": 'tta/trigger_create_tta_banner',
                                "getter": 'tta/get_banner',
                                "app": this,
                                "payload": payload,
                            }

                            var data_response = await this.$dispatch(pass_obj);

                            if(!data_response.status)
                            {
                                throw data_response.response;
                            }
                        }
                    }
                    catch(error)
                    {
                        this.showNotify('negative','Create fail.');
                        console.log('Error create tta banner',error);
                        return;
                    }

                    // create cot
                    try{
                        if(this.conditionTrade != "")
                        {
                            var data_response = await this.saveCOT(tta.tta_guid);
                            if(!data_response.status)
                            {
                                throw data_response.response;
                            }
                        }                        
                    }
                    catch(error)
                    {
                        this.showNotify('negative','Create fail.');
                        console.log('create tta cot',error);
                        return;
                    }

                    // create tab and tab_article
                    var data_response = await this.saveTab(tta.tta_guid);
                    if(!data_response.status)
                    {
                        console.log('create tta tab',data_response)
                        this.showNotify('negative','Create fail.');
                        this.showLoading = false;
                        return;
                    }
                    
                    this.showNotify('positive','Create successfully.');
                    this.$router.push({name:'tta'});
                }
                else
                {
                    this.showNotify('negative','Create fail.');
                    console.log("Create tta fail",create_response.response);
                }
            }

            // edit tta process
            else if(this.page_function == 'edit')
            {
                payload.tta_guid = this.json.tta_guid;

                var pass_obj = {
                    "dispatch": 'tta/trigger_update_tta',
                    "getter": 'tta/get_tta',
                    "app": this,
                    "payload": payload,
                }

                var update_response = await this.$dispatch(pass_obj);

                if(update_response.status)
                {
                    const tta = update_response.response;
                    
                    // edit tta distributor
                    try {
                        var original_distributor = this.original_json.distributor;
                        var new_distributor = this.json.distributor_list;

                        // Delete tta distributor from original list if it does not include in new list
                        const deleteTask = original_distributor.map(async (entry)=>{
                            if(!new_distributor.map(entry=>entry.supplier_guid).includes(entry.supplier_guid)){
                                console.log('delete distributor',entry)

                                var payload = {
                                    'tta_distributor_guid': entry.tta_distributor_guid,
                                }
                                var pass_obj = {
                                    "dispatch": 'tta/trigger_delete_tta_distributor',
                                    "getter": 'tta/get_distributor',
                                    "app": this,
                                    "payload": payload,
                                };

                                var data_response = await this.$dispatch(pass_obj);

                                if(!data_response.status)
                                {
                                    return data_response.response;
                                }
                            }
                        })

                        var results = await Promise.all(deleteTask);
                        if (results.some(result => result && result.status === false)) {
                            throw  "Delete distributor error";
                        }
                        
                        // Create tta distributor if it does not include in original list
                        const createTask = new_distributor.map(async (entry)=>{
                            if(!original_distributor.map(entry=>entry.supplier_guid).includes(entry.supplier_guid)){
                                console.log('create distributor', entry)

                                var payload = {
                                    pass_json: {
                                        "created_by": this.username,
                                        "updated_by": this.username,
                                        "supplier_guid": entry.supplier_guid,
                                        "remarks": entry.remarks,
                                        "company_guid": this.company_guid,
                                        "tta_guid": tta.tta_guid,
                                    }
                                }
                                var pass_obj = {
                                    "dispatch": 'tta/trigger_create_tta_distributor',
                                    "getter": 'tta/get_distributor',
                                    "app": this,
                                    "payload": payload,
                                }

                                var data_response = await this.$dispatch(pass_obj);

                                if(!data_response.status)
                                {
                                    return data_response.response;
                                }
                            }
                        })

                        var results = await Promise.all(createTask);
                        if (results.some(result => result && result.status === false)) {
                            throw  "Create distributor error";
                        }

                        // Edit tta distributor if it does include in original list
                        const editTask = new_distributor.map(async (new_entry)=>{
                            const entry = original_distributor.find(original_entry => original_entry.supplier_guid === new_entry.supplier_guid);
                            if(entry){
                                console.log('edit distributor', new_entry)

                                var payload = {
                                    tta_distributor_guid: new_entry.tta_distributor_guid,
                                    pass_json: {
                                        "updated_by": this.username,
                                        "supplier_guid": new_entry.supplier_guid,
                                        "remarks": new_entry.remarks,
                                        "company_guid": this.company_guid,
                                        "tta_guid": tta.tta_guid,
                                    }
                                }
                                var pass_obj = {
                                    "dispatch": 'tta/trigger_update_tta_distributor',
                                    "getter": 'tta/get_distributor',
                                    "app": this,
                                    "payload": payload,
                                }

                                var data_response = await this.$dispatch(pass_obj);

                                if(!data_response.status)
                                {
                                    return data_response.response;
                                }
                            }
                        })

                        var results = await Promise.all(editTask);
                        if (results.some(result => result && result.status === false)) {
                            throw  "Edit distributor error";
                        }
                    }
                    catch(error)
                    {
                        this.showNotify('negative','Update fail.');
                        console.log('edit tta distributor',error);
                        return;
                    }

                    // edit tta division
                    try {
                        var original_division = this.original_json.division;
                        var new_division = this.json.division;

                        // Delete tta division from original list if it does not include in new list
                        const deleteTask = original_division.map(async (entry)=>{
                            if(!new_division.includes(entry.dept_guid)){
                                console.log('delete division',entry)

                                var payload = {
                                    'tta_group_guid': entry.tta_group_guid,
                                }
                                var pass_obj = {
                                    "dispatch": 'tta/trigger_delete_tta_division',
                                    "getter": 'tta/get_division',
                                    "app": this,
                                    "payload": payload,
                                };

                                var data_response = await this.$dispatch(pass_obj);

                                if(!data_response.status)
                                {
                                    throw data_response.response;
                                }
                            }
                        })

                        var results = await Promise.all(deleteTask);
                        if (results.some(result => result && result.status === false)) {
                            throw  "Delete trading group error";
                        }

                        // Create tta division if it does not include in original list
                        const createTask = new_division.map(async (entry)=>{
                            if(!original_division.map(entry=>entry.dept_guid).includes(entry)){
                                console.log('create division', entry)

                                var payload = {
                                    pass_json: {
                                        "created_by": this.username,
                                        "updated_by": this.username,
                                        "type": this.json.division_group,
                                        "tta_guid": tta.tta_guid,
                                        "company_guid": this.company_guid,
                                    }
                                }

                                this.json.division_group == 'division' 
                                    ? payload.pass_json.division_guid = entry : this.json.division_group == 'dept' 
                                    ? payload.pass_json.dept_guid = entry : this.json.division_group == 'subdept' 
                                    ? payload.pass_json.subdept_guid = entry : payload.pass_json.category_guid = entry;

                                var pass_obj = {
                                    "dispatch": 'tta/trigger_create_tta_division',
                                    "getter": 'tta/get_division',
                                    "app": this,
                                    "payload": payload,
                                }

                                var data_response = await this.$dispatch(pass_obj);

                                if(!data_response.status)
                                {
                                    throw data_response.response;
                                }
                            }
                        })

                        var results = await Promise.all(createTask);
                        if (results.some(result => result && result.status === false)) {
                            throw  "Create trading group error";
                        }
                    }
                    catch(error)
                    {
                        this.showNotify('negative','Update fail.');
                        console.log('edit tta division',error);
                        return;
                    }

                    // edit tta banner
                    try {
                        var original_banner = this.original_json.banner;
                        var new_banner = this.json.banner;

                        // Delete tta banner from original list if it does not include in new list
                        original_banner.map(async (entry)=>{
                            if(!new_banner.includes(entry.dept_guid)){
                                console.log('delete banner',entry)

                                var payload = {
                                    'tta_concept_guid': entry.tta_concept_guid,
                                }
                                var pass_obj = {
                                    "dispatch": 'tta/trigger_delete_tta_banner',
                                    "getter": 'tta/get_banner',
                                    "app": this,
                                    "payload": payload,
                                };

                                var data_response = await this.$dispatch(pass_obj);

                                if(!data_response.status)
                                {
                                    throw data_response.response;
                                }
                            }
                        })

                        // Create tta banner if it does not include in original list
                        new_banner.map(async (entry)=>{
                            if(!original_banner.map(entry=>entry.dept_guid).includes(entry)){
                                console.log('create banner', entry)

                                var payload = {
                                    pass_json: {
                                        "created_by": this.username,
                                        "updated_by": this.username,
                                        "concept_guid": entry,
                                        "tta_guid": tta.tta_guid,
                                        "company_guid": this.company_guid,
                                    }
                                }
                                var pass_obj = {
                                    "dispatch": 'tta/trigger_create_tta_banner',
                                    "getter": 'tta/get_banner',
                                    "app": this,
                                    "payload": payload,
                                }

                                var data_response = await this.$dispatch(pass_obj);

                                if(!data_response.status)
                                {
                                    throw data_response.response;
                                }
                            }
                        })
                    }
                    catch(error)
                    {
                        this.showNotify('negative','Update fail.');
                        console.log('edit tta banner',error);
                        return;
                    }

                    // edit cot
                    try{
                        if(this.conditionTrade != "")
                        {
                            var data_response = await this.saveCOT(tta.tta_guid);
                            if(!data_response.status)
                            {
                                console.log(data_response)
                                throw data_response.response;
                            }
                        }                        
                    }
                    catch(error)
                    {
                        this.showNotify('negative','Update fail.');
                        console.log('edit tta cot',error);
                        return;
                    }

                    // edit tab and tab article
                    var data_response = await this.saveTab(tta.tta_guid);
                    console.log('edit tta tab',data_response)
                    if(!data_response.status)
                    {
                        this.showNotify('negative','Update fail.');
                        this.showLoading = false;
                        return;
                    }
                    
                    this.showNotify('positive','Update successfully.');
                    this.$router.push({name:'tta'});
                }
                else
                {
                    this.showNotify('negative','Update fail.');
                    console.log("Update tta fail",update_response.response);
                }
            }
            this.showLoading = false;
        },
        async handleRenewal()
        {
            this.dialog.loading = true;

            if(this.dialog.date_from == "")
            {
                this.showNotify('negative','Please choose effective start date.');
                this.dialog.loading = false;
                return;
            }

            if(this.dialog.date_from < this.json.effective_date_to)
            {
                this.showNotify('negative','Please ensure new effective start date later than previous effective end date.');
                this.dialog.loading = false;
                return;
            }

            var payload = {
                tta_guid: this.json.tta_guid,
                pass_json: {
                    "effective_date_from":this.dialog.date_from,
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

            if(!response.status)
            {;
                this.dialog.loading = false;
                this.showNotify('negative','Renew TTA fail.');
                console.log(response)
                return;
            }

            this.dialog.renewal = false;
            this.showNotify('positive','Renew TTA successfully.');
            this.$router.push({name: 'tta'})
        },
        async handleApprove()
        {
            this.dialog.loading = true;

            var payload = {
                tta_guid: this.json.tta_guid,
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

            if(!response.status)
            {
                this.dialog.loading = false;
                this.showNotify('negative','Approve TTA fail.');
                console.log(response)
                return;
            }

            this.dialog.approve = false;
            this.showNotify('positive','Approve TTA successfully.');
            this.$router.push({name: 'tta'});
        },
        async handleAuthorise()
        {
            this.dialog.loading = true;

            if(this.json.supplier_to == "")
            {
                this.showNotify('negative','Please select vendor before authorising TTA.');
                this.dialog.loading = false;
                this.dialog.authorise = false;
                return;
            }

            if(this.json.distributor.length <= 0)
            {
                this.showNotify('negative','Please select distributor before authorising TTA.');
                this.dialog.loading = false;
                this.dialog.authorise = false;
                return;
            }

            if(this.conditionTrade == "")
            {
                this.showNotify('negative','Please select condition of trade before authorising TTA.');
                this.dialog.loading = false;
                this.dialog.authorise = false;
                return;
            }

            var payload = {
                tta_guid: this.json.tta_guid,
                pass_json: {
                    "authorised_user": this.user_info_guid,
                    "authorised": 1,
                }
            }

            var pass_obj = {
                "dispatch": 'tta/trigger_update_tta',
                "getter": 'tta/get_tta',
                "app": this,
                "payload": payload,
            }

            var response = await this.$dispatch(pass_obj);

            if(!response.status)
            {
                this.showNotify('negative','Authorise TTA fail.');
                console.log(response)
                this.dialog.loading = false;
                return;
            }

            this.dialog.authorise = false;
            this.showNotify('positive','Authorise TTA successfully.');
            this.$router.push({name: 'tta'});
        },
        async handleReject()
        {
            this.dialog.loading = true;

            var payload = {
                tta_guid: this.json.tta_guid,
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

            if(!response.status)
            {
                this.dialog.loading = false;
                this.showNotify('negative','Reject TTA fail.');
                console.log(response)
                return;
            }

            this.dialog.reject = false;
            this.showNotify('positive','Reject TTA successfully.');
            this.$router.push({name: 'tta'});
        },
        async handleTerminate()
        {
            this.dialog.loading = true;

            var payload = {
                tta_guid: this.json.tta_guid,
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

            if(!response.status)
            {
                this.dialog.loading = false;
                this.showNotify('negative','Terminate TTA fail.');
                console.log(response)
            }

            this.dialog.terminate = false;
            this.showNotify('positive','Terminate TTA successfully.');
            this.$router.push({name: 'tta'});
        },
        handlePrint(type)
        {
            this.$router.push({name: 'printTTA', query: {tta_guid: this.currentTTA, type: type}});
        },
        viewFile(payload){
            console.log(payload.row)
            console.log(payload.row.file)
            window.open(payload.row.file, '_blank')
        },
        removeFile(payload)
        {
            this.dialog.currentItem = payload.row;
            this.dialog.removeFile = true;
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
        async handleRemoveFile()
        {
            var payload = {
                tta_upload_guid: this.dialog.currentItem.tta_upload_guid,
            };

            var pass_obj = {
                "dispatch": 'tta/trigger_delete_tta_upload',
                "getter": 'tta/get_upload',
                "app": this,
                "payload": payload,
            };

            var data_response = await this.$dispatch(pass_obj);

            if(!data_response.status)
            {
                this.showNotify('negative','Delete file failed.');
                console.log(data_response);
                return;
            }

            this.showNotify('positive','Delete file successfully.');
            this.table_function_attachment(this.ori_params.attachment);
            this.dialog.currentItem = {};
            this.dialog.removeFile = false;
        },
        async handleUploadFile()
        {
            this.dialog.loading = true;
            
            if(this.dialog.currentItem.length <= 0)
            {
                this.showNotify("negative","No file chosen.");
                this.dialog.loading = false;
                return;
            }

            for(const file of this.dialog.currentItem)
            {
                var formData = new FormData();
                formData.append("file", file);
                formData.append("tta_guid", this.json.tta_guid);

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
            this.table_function_attachment(this.ori_params.attachment);            
        },
        handleFileUpload(files)
        {
            this.dialog.currentItem = files;
        },
        toCamelCase(str) {
            return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
        },
        toNormalCase(str) {
            return str.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/([A-Z])([A-Z][a-z])/g, '$1 $2');
        },
        goBack(){
            this.$router.push({name: 'tta'});
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
* >>> .q-table__sort-icon
{
  display: none;
}

.q-btn.disabled {
  opacity: 0.2 !important;
}

.showLoading
{
  z-index: 3;
}

* >>> .sticky_column .q-table thead tr:first-child th:nth-child(6),
* >>> .sticky_column .q-table td:nth-child(6) {
  position: sticky;
  left: 0px;
  z-index: 2;
}

* >>> .sticky_column .q-table thead tr:first-child th:nth-child(7),
* >>> .sticky_column .q-table td:nth-child(7) {
  position: sticky;
  /* left: 85.84px; */
  left: 80px;
  z-index: 2;
}

* >>> .sticky_column .q-table thead tr:first-child th:nth-child(8),
* >>> .sticky_column .q-table td:nth-child(8) {
  position: sticky;
  /* left: 174.12px; */
  left: 160px;
  z-index: 2;
}

* >>> .sticky_column .q-table thead tr:first-child th:nth-child(6)
{background-color: #DEE1E6;}
* >>> .sticky_column .q-table td:nth-child(6)
{background-color: white;}
* >>> .sticky_column .q-table thead tr:first-child th:nth-child(7)
{background-color: #DEE1E6;}
* >>> .sticky_column .q-table td:nth-child(7)
{background-color: white;}
* >>> .sticky_column .q-table thead tr:first-child th:nth-child(8)
{background-color: #DEE1E6;}
* >>> .sticky_column .q-table td:nth-child(8)
{background-color: white;}

.toggle_span
{
    padding-left: 5px;
}

.q-tab-panels
{
  width: 100%;
}

.top_right_button
{
    text-align: right;
    padding-top: 5px;
}

.custom_button
{
    font-size: 14px;
    background-color: #273655;
    color: white;
    padding: 5px;
    min-width: 100px;
}

.step-content{
    padding-left: 10px;
    padding-right: 10px
}
.unknown_field
{
    color: red;
}

.hide_section
{
    display: none;
}

.q-textarea >>>.q-field__control {
    min-height: 81px !important;
}

.rem_size >>> .q-field__inner, .rem_size >>> .q-field__inner > .q-field__control {
    height: 56px !important;
}
.no-scroll {
    overflow: hidden;
}
.custom_table > thead > tr > th
{
    white-space: nowrap;
}

.custom_table > tbody > tr > td
{
    white-space: nowrap;
}
.active_class_tab
{
    background-color: #e37a05;
    color: white;
}

.btn_qlist.q-list.q-list--padding {
  padding: 3px 0px !important;
}

.btn_qlist >>>.q-item 
{
  min-height: 30px !important;
  height: 10px;
}

.btn_drp >>>.q-btn__content
{
  justify-content: left;
  font-size: 12px;
}
.btn_drp .q-btn__content .q-btn {
  font-size: 12px !important;
}

*>>>.btn_drp.q-btn.q-btn-item
{
  padding: 3px 8px !important;
}

* >>> .BarcodeTable
{
    font-size: 12px;
}


* >>> .BarcodeTable > .q-table__container > .q-table__middle > .q-table > thead
{
    position: sticky;
    top: 0;
    z-index: 1;
}

* >>> .BarcodeTable > .q-table__container > .q-table__middle > .q-table > thead > tr > th
{
    padding: 10px !important;
}

* >>> .BarcodeTable > .q-table__container > .q-table__middle > .q-table > tbody > tr > td
{
    padding: 5px !important;
}

* >>> .BarcodeTable > .q-table__container > .q-table__middle > .q-table > tbody > tr > td > .q-btn
{
    padding: 5px !important;
}

.new_input_custom
{
    height: calc(100% - 15px);
}

.new_input_custom >>> .q-field__inner, .new_input_custom >>> .q-field__inner > .q-field__control {
    height: 100%;
}
.active_section_button
{
    font-size: 12px;
    background-color: #e37a05;
    color: white;
    margin-left: 0px;
    margin-right: 10px;
}

.inactive_section_button
{
    font-size: 12px;
    background-color: #273655;
    color: white;
    margin-left: 0px;
    margin-right: 10px;
}

* >>> .custom_step
{
    display:flex;
}


* >>> .custom_step > .q-stepper__tab > .q-stepper__label > .q-stepper__title
{
    font-size: 12px;
    width:100%
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


.custom_toolbar
{
    padding-left: 0px;
    height: 37px;
    min-height: 37px;
}

.custom_toolbar >>> .q-tabs
{
    padding-left: 0px;
    padding-top: 0px;
}

.new_input_select >>> .q-field__inner, .new_input_select >>> .q-field__inner > .q-field__control, .new_input_select >>> .q-field__inner > .q-field__control > .q-field__append{
    height: 32px;
    min-height: 32px;
}

.back_chip_icon >>>.q-chip__icon {
    color: rgba(0, 0, 0, 0.54);
    font-size: 1.5em;
    margin: -0.1em;
}
.chip_sty {
    padding: 11px;
    border-radius: 8px;
    background: #FFF !important;
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
    height: 43px;
}
.bold-font {
    font-family: InterfontBold;
    font-weight: 700;
    font-size: 16px;
}
.chip-container_1 {
    display: flex;
    align-items: center;
    /* padding-top: 16px; */
    padding-bottom: 8px;
}
.chip-container_2 {
    display: flex;
    align-items: center;
    /* padding-top: 16px; */
    padding-bottom: 16px;
}
.first-dialog_separator {
    padding-top: 16px;
    padding-bottom: 16px;
    gap: 40px;
}
.rounded-outline-icon {
    border: 1px solid #8B8D8B;
    border-radius: 50%;
    padding: 5%;
}

.custom_more_button >>> .q-btn-dropdown__arrow
{
    display: none;
}

.dialog_action_bottom
{
    width: 95%;
    height: 65px;
    position: fixed;
    bottom: 0px;
    background-color: white;
}

.intermediate_white
{
    position: sticky;
    z-index: 2;
    top: 111px;
    padding: 0px;
    width: 100%;
    height: 12px;
    background-color:white;
}

.content_body_dialog
{
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 30px;
    padding-bottom: 30px;
}

@media screen and (max-width: 599px) {
    .dialog_detail_add_button {
        border-radius: 8px;
        background: #1E90FF;
        box-shadow: 0px 1px 3.6px 0px rgba(0, 0, 0, 0.25);
        height: 56px;
        padding: 16px;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        font-family: InterfontBold;
    }
    .dialog_mobile_detail{
        position: fixed;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);
        width: 300px;
        height: 60px;
        padding: 8px 32px;
        justify-content: center;
        align-items: center;
        border-radius: 24px;
        background-color: white;
        box-shadow: 0px 0px 11px 0px rgba(0, 0, 0, 0.40);
    }
    .selected-card {
        border-radius: 8px;
        border: 2px solid #90A8D6;
        background: #FFF;
        box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.30);
    }
    .dialog_action
    {
        /* height: 55px; */
        /* height: 100px; */
        position: static;
        padding:0px;
        padding-right: 20px;
        padding-left: 20px;
        bottom: 0px;
        background-color: white;
    }
    .custom_primary_button {
        padding: 0px 30px;
        border-radius: 8px;
        box-shadow: 0px 1px 3.6px 0px rgba(0, 0, 0, 0.25);
        font-weight: 700;
        font-family: InterfontBold;
        width: 112px;
        height: 48px;
    }
    .input_wrapper_left_right
    {
        /* padding-right: 2%; */
        /* padding-left: 2%; */
        padding: 24px;
    }
    .sticky_stepper >>> .q-stepper__tab
    {
        padding: 0px;
    }

    .sticky_stepper >>> .q-stepper__title
    {
        font-size: 12px;
    }

    .sticky_stepper >>> .q-stepper__header
    {
        background-color: white;
        position: sticky;
        z-index: 2;
        top: 56px;
        padding-bottom: 5px;
        /* margin-left: -10px; */
        /* margin-right: -10px; */
    }

    .header_top
    {
        background-color: white;
        position: sticky;
        z-index: 2;
        top: 0px;
        height: 57px;
        text-align: center;
        padding-left: 10px;
        padding-right: 10px;
        padding-top: 0px;
        padding-bottom: 0px;
    }

    .header_top_mobile
    {
        background-color: white;
        position: sticky;
        z-index: 2;
        top: 0px;
        text-align: center;
        padding-left: 10px;
        padding-right: 10px;
        padding-top: 0px;
        padding-bottom: 0px;
    }
}

@media screen and (min-width: 600px) {
    .dialog_action
    {
        /* height: 55px; */
        /* height: 100px; */
        position: static;
        padding:0px;
        padding-right: 20px;
        padding-left: 20px;
        padding-bottom: 20px;
        bottom: 0px;
        background-color: white;
    }
    .custom_primary_button {
        padding: 10px 30px;
        border-radius: 8px;
        box-shadow: 0px 1px 3.6px 0px rgba(0, 0, 0, 0.25);
        font-weight: 700;
        font-family: InterfontBold;
        width: 112px;
        height: 48px;
    }
    .input_wrapper_left_right
    {
        padding-right: 2%;
        padding-left: 2%;
    }
    .sticky_stepper >>> .q-stepper__header
    {
        background-color: white;
        position: static;
        z-index: 2;
        top: 123px;
    }

    .header_top
    {
    position: sticky;
    top: 50px;
    z-index: 2;
    padding:0px;
    }
}

*>>>.btn_grp2.q-btn-group {
  box-shadow: none !important;
}

.btn_grp2 >>>.q-btn {
  padding: 0px 5px;
}

.custom_delete
{
    color: #C10015;
    text-decoration: none;
    transition: text-decoration 0.3s;
    position: absolute;
    padding:0px;
    padding-left: 10px;
    top: 8px;
    left: 10px;
    z-index: 1;
}
.custom_delete:hover {
    cursor: pointer;
    text-decoration: underline;
}

.custom_add_button
{
    font-size: 12px; 
    background-color: #26A69A; 
    color: white;
}

.custom_close_button
{
    color: #928f8f;
    position: absolute;
    padding: 0;
    padding-left: 10px;
    top: 1px;
    right: 12px;
    z-index: 1;
}

.custom_back_button
{
    position: absolute;
    padding:0px;
    padding-left: 10px;
    top: 10px;
    left: 12px;
    z-index: 1;
}

.custom_more_button
{
    color: #928f8f;
    position: absolute;
    padding: 0;
    padding-left: 10px;
    top: 10px;
    right: 12px;
    z-index: 1;
}
@media screen and (min-width: 1024px) {
    .four_column_left
    {
        padding-right: 1%;
    }
}
* >>> .q-stepper__step-inner
{
    padding: 0px;
}

@media screen and (min-width: 1024px) and (max-width: 1560px){
.padding_right
{
    padding-right: 10px;
}
}

.intermediate
{
    padding: 0px;
    width: 100%;
    height: 5px;
    background-color:#ededed;
}

.header_text
{
    padding-left: 0px;
    padding-right: 16px;
    font-weight: 500;
    font-size: 14px;
    /* font-family: InterfontSemiBold; */

}
.card_sides
{
    padding-left: 24px;
    padding-right: 24px;
    background-color: #F4F7FE;
}

* >>> .q-table__container
{
  padding: 0px;
  border-radius: 0px;
  padding: 0px !important;
}

.card_section_two
{
  margin-top: 10px;
}

.card_section_second_content
{
  border: 2px solid #ababab;
  /* min-height: 60vh; */
  overflow-y: scroll;
}

.section_separator{
    border: 1px solid #ababab;
}
/* width */
.card_section_second_content::-webkit-scrollbar {
    width: 10px;
    height: 10px;
}

/* Track */
.card_section_second_content::-webkit-scrollbar-track {
    /* box-shadow: inset 0 0 5px grey;  */
    border-radius: 10px;
}

/* Handle */
.card_section_second_content::-webkit-scrollbar-thumb {
    /* background: #8070d4; */
    background: #ababab;
    border-radius: 10px;
}

/* Handle on hover */
.card_section_second_content::-webkit-scrollbar-thumb:hover {
    background: #ababab;
}

.input_wrapper_right
{
    padding-right: 10px;
}
.input_wrapper_center
{
    padding-right: 10px;
}

@media screen and (max-width: 1024px) {
    .two_column_left
    {
        padding-right: 2%;
    }
}

.dialog_font
{
    font-weight: bold;
    font-size: 13px;
}

.dialog_separator
{
    padding-top: 5px;
}

.upload_separator_first
{
  /* border-bottom: 1px solid #DEE1E6; */
  /* margin-left: 10px;
  margin-right: 10px; */
  /* margin-bottom: 10px; */
  padding-top: 0px;
  /* padding-bottom: 10px; */
}

.upload_separator
{
  /* border-bottom: 1px solid #DEE1E6; */
  margin: 10px;
  /* padding-top: 10px; */
  /* padding-bottom: 30px; */
}

.custom_cancel_button
{
    font-size: 14px;
    padding: 5px;
    min-width: 100px;
}

.custom_nav_button
{
    padding: 8px 16px 8px 16px;
    border-radius: 8px;
    border: 2px solid #1E90FF;
    font-family: InterfontMedium;
    width: 100px;
    height: 40px;
    justify-content: center;
    align-items: center;
}

.custom_primary_font {
    color: var(--q-primary) !important;
}

.chip-container {
    display: flex;
    align-items: center;
    padding-top: 32px;
    padding-bottom: 32px;
}
.supplier_item_font {
    font-family: InterfontMedium;
    font-size: 16px;
    font-weight: 500;
}

* >>> .q-field--outlined.q-field--readonly .q-field__control:before {
    border-style: solid;
}


.confirmation_line_font {
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    font-family: InterfontMedium;
}
.confirm_title {
    color: #FFF;
    text-align: center;
    font-family: InterfontSemiBold;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
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
.confirm_delete_button {
    padding: 16px;
    justify-content: center;
    align-items: center;
    font-size: 16px !important;
    font-style: normal;
    font-weight: 700;
    font-family: InterfontBold;
    border-radius: 8px;
    color: #FFFFFF;
    background-color: #D81111;
    box-shadow: 0px 1px 3.6px 0px rgba(0, 0, 0, 0.25);
    width: 112px;
    height: 48px;
}
.button-padding2 {
    padding: 17px 16px;
    border-radius: 8px;
    border: 2px solid #1E90FF;
    /* margin-top: 1px; */
    width: 100%;
    height:100%;
    /* font-size: 2em;   */
}
.separator-style {
    border-top: 1px solid #BFBFBF;
    width: 100%;
}
.col-3-font {
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    font-family: InterfontSemiBold;
}
.edit_IM_checkbox {
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    font-family: InterfontMedium;
    color: #000000;
}
</style>