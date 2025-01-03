<template>
    <div class="row q-pa-md" v-if="company_list.length>0">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 bg-white q-my-sm q-pa-md">
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-px-md">
                <q-toolbar class="custom_toolbar">
                    <q-tabs :model-value="currentTab" @update:model-value="handleChangeTab" active-class="active_class_tab" indicator-color="transparent" align="justify" inline-label dense narrow-indicator shrink stretch no-caps>
                        <template v-for="(company_info,index) in company_list" :key="index">
                            <q-tab :name="company_info.company_info_guid" :label="`Company ${index+1}`"></q-tab>
                        </template>
                    </q-tabs>
                </q-toolbar>
            </div>
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-px-md" style="font-size: 10px;">
                <q-tab-panels v-model="currentTab" :animated="false" keep-alive ref="tabs">
                    <template v-for="(company_info,index) in company_list" :key="index">
                        <q-tab-panel :name="company_info.company_info_guid" style="overflow: hidden">
                            <q-form :ref="`save_form_${index}`">
                                <div class="row">
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 q-px-sm q-py-xs">
                                        <div class="q-px-sm q-py-xs">
                                            <LabelInput label="Code" v-model:pass_value="company_info.code" :readonly="true" :dbComponentBehavior="dbComponentBehavior.text_required"/>
                                        </div>
                                        <div class="q-px-sm q-py-xs">
                                            <LabelInput label="Name" v-model:pass_value="company_info.name" :readonly="false" :dbComponentBehavior="dbComponentBehavior.text_required"/>
                                        </div>
                                        <div class="q-px-sm q-py-xs">
                                            <LabelInput label="TIN" v-model:pass_value="company_info.tin" :readonly="false" :dbComponentBehavior="dbComponentBehavior.text_required"/>
                                        </div>
                                        <div class="q-px-sm q-py-xs">
                                            <LabelInput label="Reg No" v-model:pass_value="company_info.reg_no" :readonly="false" :dbComponentBehavior="dbComponentBehavior.text_required"/>
                                        </div>
                                        <div class="q-px-sm q-py-xs">
                                            <LabelInput label="Old Reg No" v-model:pass_value="company_info.old_reg_no" :readonly="false" :dbComponentBehavior="dbComponentBehavior.text_required"/>
                                        </div>
                                        <div class="q-px-sm q-py-xs">
                                            <LabelInput label="Telephone" v-model:pass_value="company_info.telephone" :readonly="false" :dbComponentBehavior="dbComponentBehavior.text_required"/>
                                        </div>
                                        <div class="q-px-sm q-py-xs">
                                            <LabelInput label="Fax" v-model:pass_value="company_info.fax" :readonly="false" :dbComponentBehavior="dbComponentBehavior.text_required"/>
                                        </div> 
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 q-px-sm q-py-xs">
                                        <div class="q-px-sm q-py-xs">
                                            <LabelInput label="Address 1" v-model:pass_value="company_info.address_1" :readonly="false" :dbComponentBehavior="dbComponentBehavior.text_required"/>
                                        </div>
                                        <div class="q-px-sm q-py-xs">
                                            <LabelInput label="Address 2" v-model:pass_value="company_info.address_2" :readonly="false" :dbComponentBehavior="dbComponentBehavior.text_required"/>
                                        </div>
                                        <div class="q-px-sm q-py-xs">
                                            <LabelInput label="Address 3" v-model:pass_value="company_info.address_3" :readonly="false" :dbComponentBehavior="dbComponentBehavior.text_required"/>
                                        </div>
                                        <div class="q-px-sm q-py-xs">
                                            <LabelInput label="Address 4" v-model:pass_value="company_info.address_4" :readonly="false" :dbComponentBehavior="dbComponentBehavior.text_required"/>
                                        </div>
                                        <div class="q-px-sm q-py-xs">
                                            <LabelInput label="Address 5" v-model:pass_value="company_info.address_5" :readonly="false" :dbComponentBehavior="dbComponentBehavior.text_required"/>
                                        </div>
                                    </div>
                                </div>

                                <div class="row q-py-md">
                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px;">
                                        <div class="q-px-sm q-py-xs">
                                            <Label pass_value="Banners" class="text-subtitle1"/>
                                        </div>
                                        <div class="q-px-sm q-py-xs">
                                            <Input
                                                v-model="company_info.search"
                                                @receiveKeyUp="handleKeySearch(company_info)"
                                                :dbComponentBehavior="dbComponentBehavior.text"
                                                :outlined="true"
                                                :readonly="readonly"
                                            />
                                        </div>
                                        
                                        <div style="max-height: 200px; overflow: auto;">
                                            <template v-for="banner in company_info.banner_options" :key="banner">
                                                <div v-if="banner.display" style="display: flex;align-items: center;">
                                                    <div>
                                                        <Checkbox  v-model="banner.active" :readonly="false" :disable="false" class="text-bold" @receiveChangenewVal="(val) => handleChangeBanner(val, banner, company_info)"/>
                                                    </div>
                                                    <div>
                                                        {{banner.banner}}
                                                        <q-badge v-if="!banner.active && showCompanyLabel(banner)" :label="banner.company_code" class="q-ml-md" style="background-color: #26A69A" align="middle"></q-badge>
                                                    </div>
                                                </div>
                                            </template>
                                        </div>

                                        <div class="row justify-end q-px-sm q-py-xs">
                                            {{company_info.banners.length}} Banners Selected
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="row justify-end q-gutter-md">
                                    <Button :pass_label="'Save'"
                                        v-on:receiveClick="saveCompany(index,company_info)"
                                        :pass_no_caps="false"
                                        :pass_square="true"
                                        :pass_dense="true"
                                        class="custom_button"
                                    />
                                </div>
                            </q-form>
                        </q-tab-panel>
                    </template>
                </q-tab-panels>
            </div>
        </div>
    </div>

    <q-inner-loading
        :showing="loading"
        class="showLoading"
        color="primary"
    />
</template>

<script>
import LabelInput from 'src/components/PRIMS/General/LabelInput'
import LabelSelect from 'src/components/PRIMS/General/LabelSelect'
import LabelCheckbox from 'src/components/PRIMS/General/LabelCheckbox'
import Checkbox from 'src/components/PRIMS/Base/Checkbox'
import Button from 'src/components/PRIMS/Main/Button'
import Label from 'src/components/PRIMS/Main/Label'
import Input from 'src/components/PRIMS/Main/Input'
import { Notify } from "quasar";

export default {
    components: {
        LabelInput,
        LabelSelect,
        LabelCheckbox,
        Checkbox,
        Button,
        Label,
        Input,
    },
    data(){
        return{
            currentTab: "",
            company_list: [],
            banner_options: [],
            active_banner: [],
            username: localStorage.getItem("username") != "" && localStorage.getItem("username") != "null" && localStorage.getItem("username") != null ? localStorage.getItem("username") : "",
            company_guid: localStorage.getItem("company_guid") != "" && localStorage.getItem("company_guid") != "null" && localStorage.getItem("company_guid") != null ? localStorage.getItem("company_guid") : "",
            loading: false,
            edited: false,
        }
    },
    computed: {
        dbComponentBehavior() {
            return this.$store.getters["dbComponentBehavior/byLanguage"]("tta");
        },
    },
    async mounted(){
        this.loading = true;
            
            if(this.company_guid == "")
            {
                this.showNotify('negative', 'Unable to identify company guid.');
                this.$router.push({name: "tta"});
            }
            
            var pass_obj = {
                "dispatch": 'general/trigger_get_banner_list',
                "getter": 'general/get_banner',
                "app": this,
                "payload": {
                    "params": {
                        'limit': 99999,
                        'isactive': 1,
                    }
                },
            }

            var banner = await this.$dispatch(pass_obj);

            if(banner.status)
            {
                this.banner_options = banner.response.data.results;
            }

            var pass_obj = {
                "dispatch": 'general/trigger_get_company_info_list',
                "getter": 'general/get_company_info',
                "app": this,
                "payload": {},
            }

            var company = await this.$dispatch(pass_obj);
            
            if(company.status)
            {
                for(const company_info of company.response.data.results)
                {
                    company_info.search = "";

                    var payload = {
                        params: {
                            "company_info_guid": company_info.company_info_guid,
                        }
                    }
                    var pass_obj = {
                        "dispatch": 'general/trigger_get_banner_list',
                        "getter": 'general/get_banner',
                        "app": this,
                        "payload": payload,
                    }

                    var banner = await this.$dispatch(pass_obj);

                    company.banners = [];

                    if(banner.status)
                    {
                        company_info.banners = banner.response.data.results.map(entry=>entry.concept_guid);
                        company_info.old_banners = banner.response.data.results.map(entry=>entry.concept_guid);
                        company_info.banner_options = JSON.parse(JSON.stringify(this.banner_options));
                        for(const option of company_info.banner_options)
                        {
                            option.active = company_info.banners.includes(option.concept_guid);
                            option.display = true;
                        }
                    }
                    this.active_banner = this.active_banner.concat(company_info.banners);
                    this.company_list.push(company_info);
                    console.log(company_info.code, company_info.banners.length)
                }
                console.log('selected banners',this.active_banner.length)
                console.log('total banners',this.banner_options.length)
            }
            console.log(this.company_list)
            this.currentTab = this.company_list.length>0 ? this.company_list[0].company_info_guid : "";
            

        this.loading = false;
    },
    methods:{
        async saveCompany(index,company_info){
            this.loading = true;

            const form = this.$refs[`save_form_${index}`][0];
            
            var error = 0;
            await form.validate().then(valid => {
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
                company_info_guid: company_info.company_info_guid,
                pass_json: {
                    "name": company_info.name,
                    "code": company_info.code,
                    "reg_no": company_info.reg_no,
                    "old_reg_no": company_info.old_reg_no,
                    "telephone": company_info.telephone,
                    "fax": company_info.fax,
                    "address_1": company_info.address_1,
                    "address_2": company_info.address_2,
                    "address_3": company_info.address_3,
                    "address_4": company_info.address_4,
                    "address_5": company_info.address_5,
                    "tin": company_info.tin,
                }
            }

            var pass_obj = {
                "dispatch": 'general/trigger_update_company_info',
                "getter": 'general/get_company_info',
                "app": this,
                "payload": payload,
            };

            var data_response = await this.$dispatch(pass_obj);

            if(!data_response.status)
            {
                this.showNotify("negative", "Update Fail.");
                console.log("Update fail",data_response);
                this.loading = false;
                return;
            }

            // Remove banner if it does not include in new list
            var remove_banner = [];
            company_info.old_banners.map(async (entry)=>{
                if(!company_info.banners.includes(entry)){
                    const obj = this.banner_options.find(banner=>banner.concept_guid == entry);
                    obj.company_info_guid = null;
                    remove_banner.push(obj);
                }
            });

            if(remove_banner.length>0)
            {
                console.log("remove",remove_banner)
                var payload = {
                    pass_json: remove_banner,
                }

                var pass_obj = {
                    "dispatch": 'general/trigger_update_banner_bulk',
                    "getter": 'general/get_banner',
                    "app": this,
                    "payload": payload,
                };

                var data_response = await this.$dispatch(pass_obj);

                if(!data_response.status)
                {
                    this.showNotify("negative", "Update Fail.");
                    console.log("Remove banner fail", data_response);
                    this.loading = false;
                    return;
                }
            }
            
            // Add banner if it does not include in original list
            var add_banner = [];
            company_info.banners.map(async (entry)=>{
                if(!company_info.old_banners.includes(entry)){
                    const obj = this.banner_options.find(banner=>banner.concept_guid == entry);
                    obj.company_info_guid = company_info.company_info_guid;
                    add_banner.push(obj);
                }
            });

            if(add_banner.length>0)
            {
                console.log("add",add_banner)
                var payload = {
                    pass_json: add_banner,
                }

                var pass_obj = {
                    "dispatch": 'general/trigger_update_banner_bulk',
                    "getter": 'general/get_banner',
                    "app": this,
                    "payload": payload,
                };

                var data_response = await this.$dispatch(pass_obj);

                if(!data_response.status)
                {
                    this.showNotify("negative", "Update Fail.");
                    console.log("Add banner fail", data_response);
                    this.loading = false;
                    return;
                }
            }

            this.showNotify("positive","Update Successfully.");
            this.edited = false;
            this.loading = false;
            location.reload();
        },
        handleKeySearch(company_info)
        {
            this.$nextTick(()=>{
                var searchValue = company_info.search.toString().toLowerCase();

                company_info.banner_options.forEach(option => {
                    option.display = option.banner.toLowerCase().includes(searchValue);
                });

            });
        },
        handleChangeBanner(newVal, banner, company_info)
        {
            if(newVal)
            {
                console.log("add banner")
                // Check if the banner is already in another company's list
                if (this.active_banner.includes(banner.concept_guid)) {
                    const company = this.company_list.find(entry=>entry.banners.includes(banner.concept_guid));     // Find the company name
                    this.showNotify('negative', `The banner ${banner.banner} is already assigned to ${company.name}.`);
                    this.$nextTick(()=>{
                        company_info.banner_options.map(entry=>{
                            if(entry.concept_guid == banner.concept_guid)
                            {
                                entry.active = !newVal;
                            }
                        });
                    })
                    return;
                }

                company_info.banners.push(banner.concept_guid); // Add the banner to the company's banner list
                this.active_banner.push(banner.concept_guid);   // Add the banner to the selected banner list (tracker)
            }
            else
            {
                console.log('remove banner')
                // Remove banner from company list
                var index = company_info.banners.indexOf(banner.concept_guid);
                if (index !== -1) {
                    company_info.banners.splice(index, 1);
                }
                // Remove banner from the selected banner list (tracker)
                var index = this.active_banner.indexOf(banner.concept_guid);
                if (index !== -1) {
                    this.active_banner.splice(index, 1);
                }
            }
            this.$nextTick(()=>{
                company_info.banner_options.map(entry=>{
                    if(entry.concept_guid == banner.concept_guid)
                    {
                        entry.active = newVal;
                    }
                });
                this.edited = true;
                console.log(company_info.code,company_info.banners.length)
                console.log("selected banners",this.active_banner.length)
            })
        },
        handleChangeTab(tab)
        {
            if(this.edited)
            {
                this.showNotify('negative','Please save this company details.');
                return;
            }
            this.currentTab = tab;
        },
        showCompanyLabel(banner)
        {
            const company_info = this.company_list.find(entry=>entry.company_info_guid == banner.company_info_guid);
            if(company_info)
            {
                banner.company_code = company_info.code;
                return true
            }
            else
            {
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

.active_class_tab
{
    background-color: #e37a05;
    color: white;
}
</style>
