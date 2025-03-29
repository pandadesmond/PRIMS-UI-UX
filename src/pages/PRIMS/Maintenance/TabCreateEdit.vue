<template>
    <div class="row q-pa-md">
        <div class="text-subtitle1 header_text col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
            Trading Term Agreement Tab
        </div>

        <q-form ref="save_form" class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 bg-white q-my-sm q-pa-md">
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12"  style="font-size: 10px;">
                <!-- <div class="row">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 q-px-sm q-py-xs">
                        <LabelInput label="Code" v-model:pass_value="json.type" :readonly="page_function == 'edit' ? true : false" :dbComponentBehavior="dbComponentBehavior.text_required"/>
                    </div>
                </div> -->

                <div class="row">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 q-px-sm q-py-xs">
                        <LabelInput label="Sequence" v-model:pass_value="json.number" :readonly="false" :dbComponentBehavior="dbComponentBehavior.number"/>
                    </div>
                </div>

                <div class="row">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 q-px-sm q-py-xs">
                        <LabelInput label="Name" v-model:pass_value="json.name" :readonly="false" :dbComponentBehavior="dbComponentBehavior.text_required"/>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 q-px-sm q-py-xs">
                        <LabelSelect label="Type" v-model:pass_value="json.component_type" :options="componentTypeOptions"
                        :readonly="readonlyStatus" :dbComponentBehavior="dbComponentBehavior.text_required" @receiveChange="handleChangeComponentType"/>
                    </div>
                </div>

                <div class="row" v-if="json.component_type == 'tir'">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 q-px-sm q-py-xs">
                        <LabelSelect label="GL Code" v-model:pass_value="json.glcode_guid" :options="glcodeOptions"
                        :readonly="false" :dbComponentBehavior="json.component_type == 'tir' ? dbComponentBehavior.text_required : dbComponentBehavior.text"/>
                    </div>
                </div>
            </div>

            <div v-if="this.json.component_type != 'tir'" class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-py-md">
                <div class="row justify-end q-my-md">
                    <Button class="custom_add_button" pass_icon="add" :pass_square="true" :pass_dense="true" :tooltip="true" :pass_tooltip="`Add Article`" 
                    @receiveClick="handleAddArticle"/>
                </div>
                <div class="row">
                    <Table
                        :row_per_page="[10,50,100,1000]"
                        :table_data="table_data"
                        :table_column="table_column"
                        :flat_status="true"
                        :bordered_status="true"

                        :allow_remove="true"
                        @receiveRequestTable="handleTableChange"
                        @receiveHandleRemove="handleRemoveArticle"
                        @change_select="handleChangeSelect"
                        @change_input_text="handleChangeInputText"

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
                <div class="row justify-end q-gutter-md">
                    <Button :pass_label="'Cancel'"
                        v-on:receiveClick="goBack"
                        :pass_no_caps="false"
                        :pass_square="true"
                        :pass_dense="true"
                        class="custom_cancel_button"
                    />

                    <Button :pass_label="'Save'"
                        v-on:receiveClick="saveTab"
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

    <q-dialog v-model="dialog.alert" persistent position="top">
        <q-card style="width: 864px; max-width: 98vw;text-align:center;margin-top: 5%;border-radius: 8px">

        <q-card-section class="theme_color row items-center" style="height:56px; padding: 8px 24px;border-bottom: 1px solid #a7bbcb;">
            <div class="confirm_title">Confirmation</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup :disable="dialog.loading"/>
        </q-card-section>

        <q-card-section style="padding: 32px 24px">
            <span class="confirmation_line_font">{{dialog.message}}</span>
        </q-card-section>

        <q-card-actions align="right" style="padding-top:0px;padding-bottom:16px;padding-right:16px">
            <q-btn flat label="OK" font_color="white" color="'#D81111'" size="12px" class="primary_actions_button" v-close-popup />
        </q-card-actions>

        <q-inner-loading
            :showing="dialog.loading"
            color="primary"
        />
        </q-card>
    </q-dialog>
</template>

<script>
import LabelInput from 'src/components/PRIMS/General/LabelInput'
import LabelTextarea from 'src/components/PRIMS/General/LabelTextarea'
import LabelCheckbox from 'src/components/PRIMS/General/LabelCheckbox'
import LabelSelect from 'src/components/PRIMS/General/LabelSelect'
import Checkbox from 'src/components/PRIMS/Base/Checkbox'
import Button from 'src/components/PRIMS/Main/Button'
import Table from 'src/components/PRIMS/Main/Table.vue';
import { Notify } from "quasar";

export default {
    components: {
        LabelInput,
        LabelTextarea,
        LabelCheckbox,
        LabelSelect,
        Checkbox,
        Button,
        Table,
    },
    data(){
        return{
            page_function: "",
            json: {
                name: "",
                number: "",
                type: "",
            },
            currentTab: "",
            table_data: [],
            table_column: [],
            rearrange_column: [],
            ori_params: {},
            glcodeOptions: [],
            tabTypeOptions: [{label:'Amount ($)', value: 'amount'},{label:'Percentage (%)', value: 'percentage'},{label:'Amount Percentage', value: 'amount_percentage'},{label:'Target Incentive Rebate', value: 'tir'},
                {label:'Period (%)', value: 'period_percentage'},{label:'Site Group (%)', value: 'sitegroup_percentage'},{label:'Period ($ / %)', value: 'period_amount_percentage'},{label:'Store Type / Period ($ / %)', value: 'storetype_period'}],
            componentTypeOptions: [{label:'Backdated Purchase Rebate', value: 'rate_purgrossnet_date'},{label:'Purchase Rebate', value: 'rate_purgrossnet'},{label:'Backdated Consignment Sales Rebate', value: 'rate_cogsinvnet_date'},
                {label:'Consignment Sales Rebate', value: 'rate_cogsinvnet'},{label:'Fixed Amount Rebate', value: 'dollar_rate_remark'},{label:'Fixed Amount Rebate Without Remark', value: 'dollar_rate'}, 
                {label:'Service Level Rebate', value: 'target_ratetype_rate_remark'},{label:'New Store (Days) Rebate', value: 'days_rate_percentage'},{label:'New Store (Months) Rebate', value: 'months_rate_percentage'},
                {label:'Target Incentive Rebate', value: 'tir'},{label:'Promotion (Months) Rebate %', value: 'promotion_percentage'},{label:'Promotion (Month) Rebates (%/$)', value: 'promotion_percentage_amount'}
            ],
            calcTypeOptions: [{label:'Auto',value:'auto'},{label:'Manual',value:'manual'}],
            optionTypeOptions: [{label:'%',value:'%'},{label:'$',value:'$'}],
            marginTypeOptions: [{label: 'Backend', value: 'backend'},{label: 'Frontend',value: 'frontend'}],
            billingTypeOptions: [{value: 'none',label:'None'},{value:'monthly',label:'Monthly'},{value:'quarterly',label:'Quarterly'},{value:'half-year',label:'Half Year'},{value:'yearly',label:'Yearly'},{value:'end_of_tta',label:'End of TTA'}],
            username: localStorage.getItem("username") != "" && localStorage.getItem("username") != "null" && localStorage.getItem("username") != null ? localStorage.getItem("username") : "",
            company_guid: localStorage.getItem("company_guid") != "" && localStorage.getItem("company_guid") != "null" && localStorage.getItem("company_guid") != null ? localStorage.getItem("company_guid") : "",
            dialog: {
                alert: false,
                message: "",
                loading: false,
            },
            forceLoading: false,
            loading: false,
            readonlyStatus: false,
        }
    },
    computed: {
        dbComponentBehavior() {
            return this.$store.getters["dbComponentBehavior/byLanguage"]("tta");
        },
    },
    async mounted(){
        this.loading = true;

        var payload = {
            params: {
                "limit": 99999,
                "ordering": "code",
                "isactive": 1,
            }
        }

        var pass_obj = {
            "dispatch": 'general/trigger_get_glcode_list',
            "getter": 'general/get_glcode',
            "app": this,
            "payload": payload,
        }

        var glcode = await this.$dispatch(pass_obj);

        if(glcode.status)
        {
            var array_options = [];
            for(var i in glcode.response.data.results)
            {
                var obj = {
                    label: `${glcode.response.data.results[i].code} - ${glcode.response.data.results[i].name}`,
                    value: glcode.response.data.results[i].glcode_guid,
                }
                array_options.push(obj);
            }
            this.glcodeOptions = array_options;            
        }

        if(this.$route.name == 'editTab')
        {
            this.page_function = "edit";

            if(this.$route.query.guid)
            {
                this.currentTab = this.$route.query.guid;
            }
            
            if(this.currentTab == "")
            {
                this.showNotify('negative', 'Unable to identify tab guid.');
                this.$router.push({name: "tab"});
            }

            var payload = {
                'tab_guid': this.currentTab,
            }

            var pass_obj = {
                "dispatch": 'general/trigger_get_tab',
                "getter": 'general/get_tab',
                "app": this,
                "payload": payload,
            }

            var tab_details = await this.$dispatch(pass_obj);
            
            if(tab_details.status)
            {
                this.json = tab_details.response.data;
                this.json.tab_article = [];

                var payload = {
                    params: {
                        tab_guid: this.currentTab,
                        ordering: "number",
                    }
                }

                // get tta with the tab
                var pass_obj = {
                    "dispatch": 'tta/trigger_get_tta_tab_list',
                    "getter": 'tta/get_tab',
                    "app": this,
                    "payload": payload,
                }

                var tta_tab = await this.$dispatch(pass_obj);

                if(tta_tab.status)
                {
                    if(tta_tab.response.data.results.length>0)
                    {
                        this.readonlyStatus = true;
                    }
                }

                // get tab articles
                var pass_obj = {
                    "dispatch": 'general/trigger_get_tab_article_list',
                    "getter": 'general/get_tab_article',
                    "app": this,
                    "payload": payload,
                }

                var tab_article = await this.$dispatch(pass_obj);

                if(tab_article.status)
                {
                    this.json.tab_article = tab_article.response.data.results;
                }
                this.table_function(this.ori_params);
                // console.log(this.json);
            }
        }
        else
        {
            this.page_function = "create";
            this.table_function(this.ori_params);
        }
        this.loading = false;
    },
    methods:{
        async saveTab(){
            this.loading = true;

            var error = 0;
            await this.$refs.save_form.validate().then(valid => {
                if (!valid) {
                    error = 1;
                }
            });

            var error = error == 1 ? false : true;

            if(!error)
            {
                this.showNotify('negative', 'Please make sure all field is correct.');
                this.loading = false;
                return;
            }

            const article = this.table_data.data.results;
            for(var i in article)
            {
                if(article[i].number == "" || article[i].name == "" || article[i].calc_type == "" || article[i].billing_type == "" || article[i].margin == "" || article[i].glcode_guid == "")
                {
                    this.showNotify('negative', 'Please fill in all article fields.');
                    this.loading = false;
                    return;
                }

                if(this.json.component_type == 'dollar_rate_remark' && (article[i].label1 == null || article[i].label1 == ""))
                {
                    this.showNotify('negative', 'Please fill in Remark 1 for article with component type Dollar Rate Remark.');
                    this.loading = false;
                    return;
                }

                if(this.json.component_type == 'target_ratetype_rate_remark' && (article[i].label1 == null || article[i].label1 == "" || article[i].label2 == null || article[i].label2 == ""))
                {
                    this.showNotify('negative', 'Please fill in Remark 1 and Remark 2 for article with component type Target Rate Type Remark.');
                    this.loading = false;
                    return;
                }
                
                if(article[i].calc_type == 'auto' && (this.json.component_type != 'rate_purgrossnet_date' && this.json.component_type != 'rate_purgrossnet' && this.json.component_type != 'rate_cogsinvnet_date' && this.json.component_type != 'rate_cogsinvnet' && this.json.component_type != 'dollar_rate'))
                {
                    this.showNotify('negative', 'Auto calculation for component type below not available: <br/> <li>Fixed Amount Rebate</li><li>Service Level Rebate</li><li>New Store (Days) Rebate</li><li>New Store (Months) Rebate</li><li>Promotion (Months) Rebate %</li><li>Promotion (Month) Rebates (%/$)</li>');
                    this.loading = false;
                    return;
                }
            }

            var payload = {
                pass_json: {
                    "name": this.json.name,
                    "number": this.json.number,
                    "component_type": this.json.component_type,
                    "updated_by": this.username,
                    "company_guid": this.company_guid,
                }
            }

            if(this.json.component_type == 'tir')
            {
                payload.pass_json.glcode_guid = this.json.glcode_guid;
            }

            try
            {

                if(this.page_function == 'create')
                {
                    payload.pass_json.created_by = this.username;

                    var pass_obj = {
                        "dispatch": 'general/trigger_create_tab',
                        "getter": 'general/get_tab',
                        "app": this,
                        "payload": payload,
                    };

                    var create_response = await this.$dispatch(pass_obj);

                    if(!create_response.status)
                    {
                        this.showNotify("negative", "Create Fail.");
                        console.log("Create fail",create_response);
                        this.loading = false;
                        return;
                    }

                    const tab = create_response.response;
                    for(var i in this.table_data.data.results)
                    {
                        const article = this.table_data.data.results[i];
                        var payload = {
                            pass_json: {
                                "number": article.number,
                                "name": article.name,
                                "calc_type": article.calc_type,
                                "option_type": article.option_type,
                                "billing_type": article.billing_type == 'none' ? null : article.billing_type,
                                "margin": article.margin,
                                "visible": article.visible,
                                "label1": article.label1,
                                "label2": article.label2,
                                "isactive": article.isactive,
                                "glcode_guid": article.glcode_guid,
                                "updated_by": this.username,
                                "created_by": this.username,
                                "company_guid": this.company_guid,
                                "tab_guid": tab.tab_guid,
                            }
                        }

                        var pass_obj = {
                            "dispatch": 'general/trigger_create_tab_article',
                            "getter": 'general/get_tab_article',
                            "app": this,
                            "payload": payload,
                        };

                        var data_response = await this.$dispatch(pass_obj);

                        if(!data_response.status)
                        {
                            console.log('create tab article',data_response);
                            this.showNotify("negative", "Create Fail.");
                            this.loading = false;
                            return;
                        }
                    }
                }
                else if(this.page_function == 'edit')
                {
                    payload.tab_guid =  this.json.tab_guid;

                    var pass_obj = {
                        "dispatch": 'general/trigger_update_tab',
                        "getter": 'general/get_tab',
                        "app": this,
                        "payload": payload,
                    };

                    var update_response = await this.$dispatch(pass_obj);

                    if(!update_response.status)
                    {
                        console.log("Update fail",update_response);
                        throw new Error('Edit Tab Failed');
                    }

                    if(this.json.component_type != 'tir')
                    {
                        var original_article = this.json.tab_article;
                        var new_article = this.table_data.data.results;

                        // Delete article if it does not include in new list
                        for(const entry of original_article)
                        {
                            if(!new_article.map(entry => entry.tab_article_guid).includes(entry.tab_article_guid)){
                                // console.log('delete article',entry)
                                var payload = {
                                    'tab_article_guid': entry.tab_article_guid,
                                }

                                var pass_obj = {
                                    "dispatch": 'general/trigger_delete_tab_article',
                                    "getter": 'general/get_tab_article',
                                    "app": this,
                                    "payload": payload,
                                };

                                var data_response = await this.$dispatch(pass_obj);

                                if(!data_response.status)
                                {
                                    console.log('delete tab article',data_response.response);
                                    const valid = this.isValidJSON(data_response.response);
                                    if(valid)
                                    {
                                        const response = JSON.parse(data_response.response);
                                        if(response.error)
                                        {
                                            var message = response.error;
                                        }
                                    }
                                    else
                                    {
                                        var message = 'Edit Article Failed';
                                    }
                                    this.table_function(this.ori_params);
                                    throw new Error(message);
                                }
                            }
                        }

                        // Create article if it does not include in original list
                        for(const entry of new_article){
                            if(!entry.tab_article_guid){
                                // console.log('create article', entry)

                                var payload = {
                                    pass_json: {
                                        "number": entry.number,
                                        "name": entry.name,
                                        "calc_type": entry.calc_type,
                                        "option_type": entry.option_type,
                                        "billing_type": entry.billing_type == 'none' ? null : entry.billing_type,
                                        "margin": entry.margin,
                                        "visible": entry.visible,
                                        "label1": entry.label1,
                                        "label2": entry.label2,
                                        "isactive": entry.isactive,
                                        "glcode_guid": entry.glcode_guid,
                                        "updated_by": this.username,
                                        "created_by": this.username,
                                        "company_guid": this.company_guid,
                                        "tab_guid": this.json.tab_guid,
                                    }
                                }

                                var pass_obj = {
                                    "dispatch": 'general/trigger_create_tab_article',
                                    "getter": 'general/get_tab_article',
                                    "app": this,
                                    "payload": payload,
                                };

                                var data_response = await this.$dispatch(pass_obj);

                                if(!data_response.status)
                                {
                                    console.log('create tab article',data_response);
                                    throw new Error('Edit Article Failed');
                                }
                            }
                        }

                        // Edit article if it already existed in original list
                        for(const new_entry of new_article){
                            const entry = original_article.find(original_entry => original_entry.tab_article_guid === new_entry.tab_article_guid);
                            if(entry){
                                // console.log("edit article",new_entry)
                                var payload = {
                                    tab_article_guid: new_entry.tab_article_guid,
                                    pass_json: {
                                        "number": new_entry.number,
                                        "name": new_entry.name,
                                        "calc_type": new_entry.calc_type,
                                        "option_type": new_entry.option_type,
                                        "billing_type": new_entry.billing_type == 'none' ? null : new_entry.billing_type,
                                        "margin": new_entry.margin,
                                        "visible": new_entry.visible,
                                        "label1": new_entry.label1,
                                        "label2": new_entry.label2,
                                        "isactive": new_entry.isactive,
                                        "glcode_guid": new_entry.glcode_guid,
                                        "updated_by": this.username,
                                        "company_guid": this.company_guid,
                                    }
                                }

                                var pass_obj = {
                                    "dispatch": 'general/trigger_update_tab_article',
                                    "getter": 'general/get_tab_article',
                                    "app": this,
                                    "payload": payload,
                                };

                                var data_response = await this.$dispatch(pass_obj);

                                if(!data_response.status)
                                {
                                    console.log('edit tab article',data_response);
                                    throw new Error('Edit Article Failed');
                                }
                            }
                        };
                    }
                }
                this.showNotify("positive","Update Successfully.");
                this.$router.push({name:"tab"});
            }
            catch(error)
            {
                this.showNotify('negative', error.message);
            }
            this.loading = false;
        },
        async handleChangeComponentType()
        {
            await this.table_function(this.ori_params);
            for(const index in this.table_data.data.results)
            {
                this.table_data.data.results[index].label1 = null;
                this.table_data.data.results[index].label2 = null;
            }
        },
        handleAddArticle()
        {
            var index = this.table_data.data.results.length + 1;
            const article = {
                "name": "",
                "index": index,
                "billing_type": "",
                "margin": "",
                "number": "",
                "visible": 0,
                "calc_type": '',
                "option_type": '',
                "isactive": 0,
                "glcode_guid": "",
                "label1": null,
                "label2": null,
            }
            this.table_data.data.results.push(article);
            // console.log('add article',this.table_data);
            for(const index in this.table_data.data.results)
            {
                this.table_data.data.results[index].input_options_billing_type = this.billingTypeOptions;
                this.table_data.data.results[index].readonly_label1 = this.json.component_type == 'dollar_rate_remark' || this.json.component_type == 'target_ratetype_rate_remark' ? false : true;
                this.table_data.data.results[index].readonly_label2 = this.json.component_type == 'target_ratetype_rate_remark' ? false : true;
            }
        },
        handleRemoveArticle(data)
        {
            const index = this.table_data.data.results.findIndex(entry => entry.index === data.row.index);
            if (index !== -1) {
                this.table_data.data.results.splice(index, 1);
                for(var i in this.table_data.data.results)
                {
                    this.table_data.data.results[i].index = parseInt(i)+1;
                }
            }
            // console.log('remove row', this.table_data.data.results);
        },
        handleChangeSelect(data)
        {
            if(data.col.name == 'calc_type')
            {
                data.row.billing_type = '';
                if(data.col.value == 'manual')
                {
                    data.row.input_options_billing_type = this.billingTypeOptions;
                    if(this.json.component_type == 'dollar_rate')
                    {
                        data.row.label1 =  null;
                    }
                }
                else
                {
                    data.row.input_options_billing_type = this.billingTypeOptions.slice(1);
                    if(this.json.component_type == 'dollar_rate')
                    {
                        data.row.label1 =  "amount_qty";
                        this.dialog.message = "Auto calculation for enabling Amount X GRN quantity calculation.";
                        this.dialog.alert = true;
                    }                    
                }
            }
        },
        handleChangeInputText(data)
        {
            if(data.col.name == 'label1')
            {
                data.row.label1 = data.row.label1.split(' ').map(word => {
                    if (word === word.toUpperCase()) {
                        return word;
                    }
                    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
                }).join(' ');
            }
            else if(data.col.name == 'label2')
            {
                data.row.label2 = data.row.label2.split(' ').map(word => {
                    if (word === word.toUpperCase()) {
                        return word;
                    }
                    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
                }).join(' ');
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
            this.forceLoading = true;

            if(!this.json.tab_guid)
            {
                var column = [
                    {
                        name: 'action',
                        required: true,
                        label: 'Action',
                        align: 'center',
                        sortable: true,
                        field: 'action',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    // {
                    //     name: 'type',
                    //     required: true,
                    //     label: 'Type',
                    //     align: 'center',
                    //     sortable: true,
                    //     field: 'type',
                    //     filter_type: 'input',
                    //     filter_options: [],
                    //     filter_value: '',
                    // },
                    {
                        name: 'number',
                        required: true,
                        label: 'Sequence',
                        align: 'center',
                        sortable: true,
                        field: 'number',
                        data_type: 'input_number',
                        style: 'max-width: 10px; width: 10px',
                        filter_type: 'input',
                    },
                    {
                        name: 'name',
                        required: true,
                        label: 'Description',
                        align: 'left',
                        sortable: true,
                        field: 'name',
                        data_type: 'input_text',
                        style: 'min-width: 450px;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    {
                        name: 'calc_type',
                        required: true,
                        label: 'Calc Type',
                        align: 'center',
                        sortable: true,
                        field: 'calc_type',
                        data_type: 'select',
                        style: 'max-width: 50px;',
                        filter_type: 'input',
                        input_options: this.calcTypeOptions,
                    },
                    {
                        name: 'billing_type',
                        required: true,
                        label: 'Billing Type',
                        align: 'center',
                        sortable: true,
                        field: 'billing_type',
                        data_type: 'select',
                        style: 'max-width: 50px;',
                        filter_type: 'input',
                        // input_options: this.billingTypeOptions,
                    },
                    {
                        name: 'margin',
                        required: true,
                        label: 'Margin',
                        align: 'center',
                        sortable: true,
                        field: 'margin',
                        data_type: 'select',
                        style: 'max-width: 50px;',
                        filter_type: 'input',
                        input_options: this.marginTypeOptions,
                    },
                    {
                        name: 'glcode_guid',
                        required: true,
                        label: 'GL Code',
                        align: 'center',
                        sortable: true,
                        field: 'glcode_guid',
                        data_type: 'select',
                        style: 'max-width: 200px;',
                        filter_type: 'input',
                        input_options: this.glcodeOptions,
                    },
                    {
                        name: 'visible',
                        required: true,
                        label: 'Visibility',
                        align: 'center',
                        sortable: true,
                        field: 'visible',
                        data_type: 'checkbox',
                        filter_type: 'input',
                    },
                    {
                        name: 'isactive',
                        required: true,
                        label: 'Active',
                        align: 'center',
                        sortable: true,
                        field: 'isactive',
                        data_type: 'checkbox',
                        filter_type: 'input',
                    },
                    {
                        name: 'updated_at',
                        required: true,
                        label: 'Updated At',
                        align: 'center',
                        sortable: true,
                        field: 'updated_at',
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
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                ];

                if(this.json.component_type != 'dollar_rate_remark' && this.json.component_type != 'dollar_rate' && this.json.component_type != 'rate_purgrossnet_date' && this.json.component_type != 'rate_purgrossnet' && this.json.component_type != 'promotion_percentage')
                {
                    var obj1 = {
                        name: 'option_type',
                        required: true,
                        label: 'Option',
                        align: 'center',
                        sortable: true,
                        field: 'option_type',
                        data_type: 'select',
                        style: 'max-width: 50px;',
                        filter_type: 'input',
                        input_options: this.optionTypeOptions,
                    }
                    column.splice(3,0,obj1);
                }
                
                if(this.json.component_type == 'dollar_rate_remark' || this.json.component_type == 'target_ratetype_rate_remark')
                {
                    var obj1 = {
                        name: 'label1',
                        required: true,
                        label: 'Remark 1',
                        align: 'center',
                        sortable: true,
                        field: 'label1',
                        data_type: 'input_text',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    }
                    var obj2 = {
                        name: 'label2',
                        required: true,
                        label: 'Remark 2',
                        align: 'center',
                        sortable: true,
                        field: 'label2',
                        data_type: 'input_text',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    }
                    column.splice(3,0,obj1,obj2);
                }

                this.table_column = column;

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
                        name: 'action',
                        required: true,
                        label: 'Action',
                        align: 'center',
                        sortable: true,
                        field: 'action',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    // {
                    //     name: 'type',
                    //     required: true,
                    //     label: 'Type',
                    //     align: 'center',
                    //     sortable: true,
                    //     field: 'type',
                    //     filter_type: 'input',
                    //     filter_options: [],
                    //     filter_value: '',
                    // },
                    {
                        name: 'number',
                        required: true,
                        label: 'Sequence',
                        align: 'center',
                        sortable: true,
                        field: 'number',
                        data_type: 'input_number',
                        style: 'max-width: 100px;',
                        filter_type: 'input',
                    },
                    {
                        name: 'name',
                        required: true,
                        label: 'Description',
                        align: 'left',
                        sortable: true,
                        field: 'name',
                        data_type: 'input_text',
                        style: 'min-width: 450px;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    {
                        name: 'calc_type',
                        required: true,
                        label: 'Calc Type',
                        align: 'center',
                        sortable: true,
                        field: 'calc_type',
                        data_type: 'select',
                        style: 'max-width: 100px;',
                        filter_type: 'input',
                        input_options: this.calcTypeOptions,
                    },
                    {
                        name: 'billing_type',
                        required: true,
                        label: 'Billing Type',
                        align: 'center',
                        sortable: true,
                        field: 'billing_type',
                        data_type: 'select',
                        style: 'max-width: 120px;',
                        filter_type: 'input',
                        // input_options: this.billingTypeOptions,
                    },
                    {
                        name: 'margin',
                        required: true,
                        label: 'Margin',
                        align: 'center',
                        sortable: true,
                        field: 'margin',
                        data_type: 'select',
                        style: 'max-width: 120px;',
                        filter_type: 'input',
                        input_options: this.marginTypeOptions,
                    },
                    {
                        name: 'glcode_guid',
                        required: true,
                        label: 'GL Code',
                        align: 'center',
                        sortable: true,
                        field: 'glcode_guid',
                        data_type: 'select',
                        style: 'max-width: 200px;',
                        filter_type: 'input',
                        input_options: this.glcodeOptions,
                    },
                    {
                        name: 'visible',
                        required: true,
                        label: 'Visibility',
                        align: 'center',
                        sortable: true,
                        field: 'visible',
                        data_type: 'checkbox',
                        filter_type: 'input',
                    },
                    {
                        name: 'isactive',
                        required: true,
                        label: 'Active',
                        align: 'center',
                        sortable: true,
                        field: 'isactive',
                        data_type: 'checkbox',
                        filter_type: 'input',
                    },
                    {
                        name: 'updated_at',
                        required: true,
                        label: 'Updated At',
                        align: 'center',
                        sortable: true,
                        field: 'updated_at',
                        style: 'min-width: 150px;',
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
                        style: 'min-width: 150px;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                ];
            }

            if(this.json.component_type != 'dollar_rate_remark' && this.json.component_type != 'dollar_rate' && this.json.component_type != 'rate_purgrossnet_date' && this.json.component_type != 'rate_purgrossnet' && this.json.component_type != 'promotion_percentage')
            {
                var obj1 = {
                    name: 'option_type',
                    required: true,
                    label: 'Option',
                    align: 'center',
                    sortable: true,
                    field: 'option_type',
                    data_type: 'select',
                    style: 'max-width: 50px;',
                    filter_type: 'input',
                    input_options: this.optionTypeOptions,
                }
                column.splice(3,0,obj1);
            }

            if(this.json.component_type == 'dollar_rate_remark' || this.json.component_type == 'target_ratetype_rate_remark')
            {
                var obj1 = {
                    name: 'label1',
                    required: true,
                    label: 'Remark 1',
                    align: 'center',
                    sortable: true,
                    field: 'label1',
                    data_type: 'input_text',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                }
                var obj2 = {
                    name: 'label2',
                    required: true,
                    label: 'Remark 2',
                    align: 'center',
                    sortable: true,
                    field: 'label2',
                    data_type: 'input_text',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                }
                column.splice(3,0,obj1,obj2);
            }

            this.table_column = column;
            
            if(payload.params.ordering == "")
            {
                payload.params.ordering = "number";
            }

            payload.params.tab_guid = this.json.tab_guid;

            var pass_obj = {
                "dispatch": 'general/trigger_get_tab_article_list',
                "getter": 'general/get_tab_article',
                "app": this,
                "payload": payload,
            }

            var tab_article = await this.$dispatch(pass_obj);

            if(tab_article.status)
            {
                var rows = tab_article.response;
                for(var i in rows.data.results)
                {
                    rows.data.results[i].index = parseInt(i)+1;
                    rows.data.results[i].billing_type = rows.data.results[i].billing_type ? rows.data.results[i].billing_type : 'none';
                    rows.data.results[i].input_options_billing_type = rows.data.results[i].calc_type == 'auto' ? this.billingTypeOptions.slice(1) : this.billingTypeOptions;
                    // rows.data.results[i].readonly_billing_type = rows.data.results[i].calc_type == 'manual' ? true : false;
                    rows.data.results[i].readonly_label1 = this.json.component_type == 'dollar_rate_remark' || this.json.component_type == 'target_ratetype_rate_remark' ? false : true;
                    rows.data.results[i].readonly_label2 = this.json.component_type == 'target_ratetype_rate_remark' ? false : true;
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

            // console.log("article",this.table_data.data.results);
            
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
        isValidJSON(str) {
            try {
                const parsed = JSON.parse(str);
                // Ensure the result is an object or array (valid JSON)
                return typeof parsed === 'object' && parsed !== null;
            } catch (e) {
                return false;
            }
        },
        goBack(){
            this.$router.push({name: 'tab'});
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

.custom_add_button
{
    font-size: 12px; 
    background-color: #26A69A; 
    color: white;
}
</style>
