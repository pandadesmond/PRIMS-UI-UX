<template>
    <div class="row q-pa-md">
        <div class="text-subtitle1 header_text col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
            Banner
        </div>

        <q-form ref="save_form" class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 bg-white q-my-sm q-pa-md">
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12"  style="font-size: 10px;">
                <div class="row">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 q-px-sm q-py-xs">
                        <LabelMultiselect label="Outlet" v-model:pass_value="json.retailer_outlet" :options="retailer_outlet_list" :readonly="readonlyStatus" option_label="Outlets"
                        :dbComponentBehavior="dbComponentBehavior.select_required"/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 q-px-sm q-py-xs">
                        <LabelInput label="Code" v-model:pass_value="json.code" :readonly="readonlyStatus" :dbComponentBehavior="dbComponentBehavior.text_required"/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 q-px-sm q-py-xs">
                        <LabelInput label="Name" v-model:pass_value="json.name" :readonly="isBackend" :dbComponentBehavior="dbComponentBehavior.text_required"/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 q-px-sm q-py-xs">
                        <LabelCheckbox label="Active" v-model:pass_value="json.isactive" :readonly="isBackend" />
                    </div>
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

                    <Button v-if="!isBackend" :pass_label="'Save'"
                        v-on:receiveClick="saveBanner"
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
import LabelMultiselect from 'src/components/PRIMS/General/LabelMultiselect'
import LabelCheckbox from 'src/components/PRIMS/General/LabelCheckbox'
import Checkbox from 'src/components/PRIMS/Base/Checkbox'
import Button from 'src/components/PRIMS/Main/Button'
import { Notify } from "quasar";

export default {
    components: {
        LabelInput,
        LabelMultiselect,
        LabelCheckbox,
        Checkbox,
        Button,
    },
    data(){
        return{
            page_function: "",
            json: {
                retailer_outlet: [],
                code: "",
                name: "",
                isactive: false,
            },
            original_banner_outlet: [],
            retailer_outlet_list: [],
            currentBanner: "",
            readonlyStatus: false,
            isBackend: false,
            user_retailer: localStorage.getItem("user_retailer") != "" && localStorage.getItem("user_retailer") != "null" && localStorage.getItem("user_retailer") != null ? localStorage.getItem("user_retailer") : "",
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

        // set options for retailer outlet
        var retailers = JSON.parse(this.user_retailer).map(entry=>entry.retailer_guid).join(',');

        var payload = {
            params: {
                'limit': 99999,
                'ordering': 'code',
                'retailer_guid__in': retailers,
            }
        }

        var pass_obj = {
            "dispatch": 'general/trigger_get_retailer_outlet_list',
            "getter": 'general/get_retailer_outlet',
            "app": this,
            "payload": payload,
        }

        var retailer_outlet = await this.$dispatch(pass_obj);

        if(retailer_outlet.status)
        {
            var list = retailer_outlet.response.data.results;
            list.forEach(element => {
                element.value = element.retailer_outlet_guid;
                element.label = `${element.code} - ${element.name}`;
            });
            this.retailer_outlet_list = list;
        }

        this.isBackend = false;

        if(this.$route.name == 'editBanner')
        {
            this.page_function = "edit";
            this.readonlyStatus = true;

            if(this.$route.query.guid)
            {
                this.currentBanner = this.$route.query.guid;
            }
            
            if(this.currentBanner == "")
            {
                this.showNotify('negative', 'Unable to identify banner guid.');
                this.$router.push({name: "banner"});
            }

            var payload = {
                'company_guid': this.company_guid,
            }

            var pass_obj = {
                "dispatch": 'general/trigger_get_company',
                "getter": 'general/get_company',
                "app": this,
                "payload": payload,
            }

            var company = await this.$dispatch(pass_obj);

            if(company.status)
            {
                if(company.response.data.invoice_from == 'backend')
                {
                    this.isBackend = true;
                }
            }


            var payload = {
                'concept_guid': this.currentBanner,
            }

            var pass_obj = {
                "dispatch": 'general/trigger_get_banner',
                "getter": 'general/get_banner',
                "app": this,
                "payload": payload,
            }

            var banner_details = await this.$dispatch(pass_obj);
            
            if(banner_details.status)
            {
                this.json = banner_details.response.data;
                this.json.retailer_outlet = [];
                this.json.company_details = {};

                var payload = {
                    params: {
                        'concept_guid': this.json.concept_guid,
                    }
                }

                var pass_obj = {
                    "dispatch": 'general/trigger_get_banner_outlet_list',
                    "getter": 'general/get_banner_outlet',
                    "app": this,
                    "payload": payload,
                }

                var retailer_outlet = await this.$dispatch(pass_obj);

                if(retailer_outlet.status)
                {
                    var list = retailer_outlet.response.data.results;
                    this.json.retailer_outlet = list.map(entry=>entry.retailer_outlet_guid);
                    this.original_banner_outlet = list;
                }
            }
        }
        else
        {
            this.page_function = "create";
        }

        this.loading = false;
    },
    methods:{
        async saveBanner(){
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

            var payload = {
                pass_json: {
                    "code": this.json.code,
                    "name": this.json.name,
                    "isactive": this.json.isactive ? 1 : 0,
                    "updated_by": this.username,
                    "company_guid": this.company_guid,
                }
            }

            if(this.page_function == "create")
            {
                payload.pass_json.created_by = this.username;

                var pass_obj = {
                    "dispatch": 'general/trigger_create_banner',
                    "getter": 'general/get_banner',
                    "app": this,
                    "payload": payload,
                };

                var create_response = await this.$dispatch(pass_obj);

                if(create_response.status)
                {
                    const concept = create_response.response;
                    // create banner outlet
                    try
                    {
                        for(var guid of this.json.retailer_outlet)
                        {
                            var payload = {
                                pass_json: {
                                    "created_by": this.username,
                                    "updated_by": this.username,
                                    "concept_guid": concept.concept_guid,
                                    "retailer_outlet_guid": guid
                                }
                            }
                            var pass_obj = {
                                "dispatch": 'general/trigger_create_banner_outlet',
                                "getter": 'general/get_banner_outlet',
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
                        console.log('Error create banner outlet',error);
                        return;
                    }

                    this.showNotify("positive","Create Successfully.");
                    this.$router.push({name:"banner"});
                }
                else
                {
                    this.showNotify("negative", "Create Fail.");
                    console.log("Create fail",create_response.response);
                }
            }
            else if(this.page_function == "edit")
            {
                payload.concept_guid = this.json.concept_guid;

                var pass_obj = {
                    "dispatch": 'general/trigger_update_banner',
                    "getter": 'general/get_banner',
                    "app": this,
                    "payload": payload,
                };

                var update_response = await this.$dispatch(pass_obj);

                if(update_response.status)
                {
                    this.showNotify("positive","Update Successfully.");
                    this.$router.push({name:"banner"});
                }
                else
                {
                    this.showNotify("negative", "Update Fail.");
                    console.log("Update fail",update_response);
                }
            }
            this.loading = false;
        },
        goBack(){
            this.$router.push({name: 'banner'});
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
</style>
