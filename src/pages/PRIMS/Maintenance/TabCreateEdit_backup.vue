<!-- Tab maintenance before changing component type from article to tab -->
<template>
    <div class="row q-pa-md">
        <div class="text-subtitle1 header_text col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
            Trading Term Agreement Tab
        </div>

        <q-form ref="save_form" class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 bg-white q-my-sm q-pa-md">
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12"  style="font-size: 10px;">
                <div class="row">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 q-px-sm q-py-xs">
                        <LabelInput label="Code" v-model:pass_value="json.type" :readonly="page_function == 'edit' ? true : false" :dbComponentBehavior="dbComponentBehavior.text_required"/>
                    </div>
                </div>

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
                        <LabelSelect label="Type" v-model:pass_value="json.component_type" :options="tabTypeOptions"
                        :readonly="false" :dbComponentBehavior="dbComponentBehavior.text_required" @receiveChange="handleChangeComponentType"/>
                    </div>
                </div>
            </div>

            <div v-if="this.json.component_type != 'tir' && this.json.type != 'ADH'" class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-py-md">
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
                        @receiveHandleRemove="handleReceiveRemove"
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
            componentTypeOptions: [{label:'Rate Purchase Value Date', value: 'rate_purgrossnet_date'},{label:'Rate Purchase Value', value: 'rate_purgrossnet'},{label:'Rate Cogs/Inv Date', value: 'rate_cogsinvnet_date'},
                {label:'Rate Cogs/Inv', value: 'rate_cogsinvnet'},{label:'Dollar Rate Remark', value: 'dollar_rate_remark'}, {label:'Target Rate Type Remark', value: 'target_ratetype_rate_remark'},
                {label:'Days Rate Percentage', value: 'days_rate_percentage'},{label:'Months Rate Percentage', value: 'months_rate_percentage'}
            ],
            calcTypeOptions: [{label:'Auto',value:'auto'},{label:'Manual',value:'manual'}],
            marginTypeOptions: [{label: 'Backend', value: 'backend'},{label: 'Frontend',value: 'frontend'}],
            billingTypeOptions: [{value:'monthly',label:'Monthly'},{value:'quarterly',label:'Quarterly'},{value:'half-year',label:'Half Year'},{value:'yearly',label:'Yearly'},{value:'end_of_tta',label:'End of TTA'}],
            username: localStorage.getItem("username") != "" && localStorage.getItem("username") != "null" && localStorage.getItem("username") != null ? localStorage.getItem("username") : "",
            company_guid: localStorage.getItem("company_guid") != "" && localStorage.getItem("company_guid") != "null" && localStorage.getItem("company_guid") != null ? localStorage.getItem("company_guid") : "",
            loading: false,
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
                    }
                }

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
                console.log(this.json);
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
                if(article[i].name == "" || article[i].calc_type == "" || article[i].billing_type == "" || article[i].component_type == "" || article[i].margin == "" || article[i].glcode_guid == "")
                {
                    this.showNotify('negative', 'Please fill in all article fields.');
                    this.loading = false;
                    return;
                }

                if(article[i].component_type == 'dollar_rate_remark' && (article[i].label1 == null || article[i].label1 == ""))
                {
                    this.showNotify('negative', 'Please fill in Remark 1 for article with component type Dollar Rate Remark.');
                    this.loading = false;
                    return;
                }

                if(article[i].component_type == 'target_ratetype_rate_remark' && (article[i].label1 == null || article[i].label1 == "" || article[i].label2 == null || article[i].label2 == ""))
                {
                    this.showNotify('negative', 'Please fill in Remark 1 and Remark 2 for article with component type Target Rate Type Remark.');
                    this.loading = false;
                    return;
                }
                
                if(article[i].calc_type == 'auto' && (article[i].component_type != 'rate_purgrossnet_date' && article[i].component_type != 'rate_purgrossnet'))
                {
                    this.showNotify('negative', 'Auto calculation for component type below not available: <br/> <li>Rate Cogs/Inv Date</li><li>Rate Cogs/Inv</li><li>Dollar Rate Remark</li><li>Target Rate Type Remark</li><li>Days Rate Percentage</li><li>Months Rate Percentage</li>');
                    this.loading = false;
                    return;
                }

                // if(article[i].calc_type == 'manual' && (article[i].component_type == 'rate_purgrossnet_date' || article[i].component_type == 'rate_cogsinvnet_date'))
                // {
                //     this.showNotify('negative', 'Component cannot be "Rate Purchase Value Date" or "Rate Cogs/Inv Date" for article with auto calculation.');
                //     this.loading = false;
                //     return;
                // }
            }

            var payload = {
                pass_json: {
                    "type": this.json.type,
                    "name": this.json.name,
                    "number": this.json.number,
                    "component_type": this.json.component_type,
                    "updated_by": this.username,
                    "company_guid": this.company_guid,
                }
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
                                "name": article.name,
                                "calc_type": article.calc_type,
                                "component_type": article.component_type,
                                "billing_type": article.billing_type,
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

                    if(this.json.component_type != 'tir' || this.json.type != 'ADH')
                    {
                        var original_article = this.json.tab_article;
                        var new_article = this.table_data.data.results;

                        // Delete article if it does not include in new list
                        for(const entry of original_article)
                        {
                            if(!new_article.map(entry => entry.tab_article_guid).includes(entry.tab_article_guid)){
                                console.log('delete article',entry)
                                var payload = {
                                    'tab_article_guid': entry.tab_article_guid,
                                }

                                var pass_obj = {
                                    "dispatch": 'general/trigger_delete_tab_article',
                                    "getter": 'general/get_article',
                                    "app": this,
                                    "payload": payload,
                                };

                                var data_response = await this.$dispatch(pass_obj);

                                if(!data_response.status)
                                {
                                    console.log('delete tab article',data_response);
                                    throw new Error('Edit Article Failed');
                                }
                            }
                        }

                        // Create article if it does not include in original list
                        for(const entry of new_article){
                            if(!entry.tab_article_guid){
                                console.log('create article', entry)

                                var payload = {
                                    pass_json: {
                                        "name": entry.name,
                                        "calc_type": entry.calc_type,
                                        "component_type": entry.component_type,
                                        "billing_type": entry.billing_type,
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
                                console.log("edit article",new_entry)
                                var payload = {
                                    tab_article_guid: new_entry.tab_article_guid,
                                    pass_json: {
                                        "name": new_entry.name,
                                        "calc_type": new_entry.calc_type,
                                        "component_type": new_entry.component_type,
                                        "billing_type": new_entry.billing_type,
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
                console.error(error.message);
                this.showNotify("negative", error.message);
            }
            this.loading = false;
        },
        handleAddArticle()
        {
            var index = this.table_data.data.results.length + 1;
            const article = {
                "name": "",
                "type": index,
                "component_type": "",
                "billing_type": "",
                "margin": "",
                "visible": 0,
                "calc_type": '',
                "isactive": 0,
                "glcode_guid": "",
                "label1": null,
                "label2": null,
            }
            this.table_data.data.results.push(article);
            console.log('add article',this.table_data);
        },
        handleChangeSelect(data)
        {
            console.log(data);
            if(data.col.name == 'calc_type')
            {
                if(data.col.value == 'manual')
                {
                    data.row.billing_type = 'monthly';
                    data.row.readonly_billing_type = true;
                }
                else
                {
                    data.row.readonly_billing_type = false;
                }
            }
            else if(data.col.name == 'component_type')
            {
                data.row.label1 = null;
                data.row.label2 = null;
                if(data.col.value == 'dollar_rate_remark')
                {
                    data.row.readonly_label1 = false;
                    data.row.readonly_label2 = true;
                }
                else if(data.col.value == 'target_ratetype_rate_remark')
                {
                    data.row.readonly_label1 = false;
                    data.row.readonly_label2 = false;
                }
                else
                {
                    data.row.readonly_label1 = true;
                    data.row.readonly_label2 = true;
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
        handleReceiveRemove(data)
        {
            console.log(data);

            const index = this.table_data.data.results.findIndex(entry => entry.type === data.row.type);
            if (index !== -1) {
                this.table_data.data.results.splice(index, 1);
                for(var i in this.table_data.data.results)
                {
                    this.table_data.data.results[i].tier_no = `Tier ${parseInt(i)+1}`;
                }
            }
            console.log('remove row', this.table_data.data.results);
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

            if(!this.json.tab_guid)
            {
                this.table_column = [
                    {
                        name: 'type',
                        required: true,
                        label: 'Type',
                        align: 'center',
                        sortable: true,
                        field: 'type',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    {
                        name: 'name',
                        required: true,
                        label: 'Description',
                        align: 'left',
                        sortable: true,
                        field: 'name',
                        data_type: 'input_text',
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
                        filter_type: 'input',
                        input_options: this.calcTypeOptions,
                    },
                    {
                        name: 'component_type',
                        required: true,
                        label: 'Component Type',
                        align: 'center',
                        sortable: true,
                        field: 'component_type',
                        data_type: 'select',
                        filter_type: 'input',
                        input_options: this.componentTypeOptions,
                    },
                    {
                        name: 'billing_type',
                        required: true,
                        label: 'Billing Type',
                        align: 'center',
                        sortable: true,
                        field: 'billing_type',
                        data_type: 'select',
                        filter_type: 'input',
                        input_options: this.billingTypeOptions,
                    },
                    {
                        name: 'margin',
                        required: true,
                        label: 'Margin',
                        align: 'center',
                        sortable: true,
                        field: 'margin',
                        data_type: 'select',
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
                    {
                        name: 'type',
                        required: true,
                        label: 'Type',
                        align: 'center',
                        sortable: true,
                        field: 'type',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
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
                    },
                    {
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
                        name: 'component_type',
                        required: true,
                        label: 'Component Type',
                        align: 'center',
                        sortable: true,
                        field: 'component_type',
                        data_type: 'select',
                        style: 'max-width: 250px;',
                        filter_type: 'input',
                        input_options: this.componentTypeOptions,
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
                        input_options: this.billingTypeOptions,
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
            }

            this.table_column = column;
            
            if(payload.params.ordering == "")
            {
                payload.params.ordering = "type";
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
                    rows.data.results[i].readonly_billing_type = rows.data.results[i].calc_type == 'manual' ? true : false;
                    rows.data.results[i].readonly_label1 = rows.data.results[i].component_type == 'dollar_rate_remark' || rows.data.results[i].component_type == 'target_ratetype_rate_remark' ? false : true;
                    rows.data.results[i].readonly_label2 = rows.data.results[i].component_type == 'target_ratetype_rate_remark' ? false : true;
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
