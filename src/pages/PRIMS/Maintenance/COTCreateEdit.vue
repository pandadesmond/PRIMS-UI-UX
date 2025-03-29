<template>
    <div class="row q-pa-md">
        <div class="text-subtitle1 header_text col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
            Condition of Trade
        </div>

        <q-form ref="save_form" class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 bg-white q-my-sm q-pa-md">
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12"  style="font-size: 10px;">
                <div class="row">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 q-px-sm q-py-xs">
                        <LabelInput label="Name" v-model:pass_value="json.name" :readonly="false" :dbComponentBehavior="dbComponentBehavior.text"/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 q-px-sm q-py-xs">
                        <LabelEditor label="Description" v-model:pass_value="json.cot_value" :readonly="false" :spellcheck="true"
                        :dbComponentBehavior="dbComponentBehavior.textarea"/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 q-px-sm q-py-xs">
                        <LabelSelect label="Retailer" v-model:pass_value="json.retailer_guid" :options="retailer_list" :readonly="false" :dbComponentBehavior="dbComponentBehavior.select"/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 q-px-sm q-py-xs">
                        <LabelCheckbox label="Active" v-model:pass_value="json.isactive" :readonly="false" />
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

                    <Button :pass_label="'Save'"
                        v-on:receiveClick="saveCot"
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
import LabelEditor from 'src/components/PRIMS/General/LabelEditor'
import LabelSelect from 'src/components/PRIMS/General/LabelSelect'
import LabelCheckbox from 'src/components/PRIMS/General/LabelCheckbox'
import Button from 'src/components/PRIMS/Main/Button'
import { Notify } from "quasar";

export default {
    components: {
        LabelInput,
        LabelEditor,
        LabelSelect,
        LabelCheckbox,
        Button,
    },
    data(){
        return{
            page_function: "",
            json: {
                cot_value: "",
                name: "",
                retailer_guid: "",
                isactive: false,
            },
            retailer_list: [],
            currentCot: "",
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
        
        
        // set retailer options
        var payload = {
            params: {
                'limit': 99999,
                'ordering': 'name',
                'company_guid': this.company_guid,
            }
        }

        var pass_obj = {
            "dispatch": 'general/trigger_get_retailer_list',
            "getter": 'general/get_retailer',
            "app": this,
            "payload": payload,
        }

        var retailer_list = await this.$dispatch(pass_obj);

        if(retailer_list.status)
        {
            const retailer = retailer_list.response.data.results;
            for(var i in retailer)
            {
                retailer[i].value = retailer[i].retailer_guid;
                retailer[i].label = retailer[i].name;
            }
            this.retailer_list = retailer;
        }

        if(this.$route.name == 'editCot')
        {
            this.page_function = "edit";

            if(this.$route.query.guid)
            {
                this.currentCot = this.$route.query.guid;
            }
            
            if(this.currentCot == "")
            {
                this.showNotify('negative', 'Unable to identify Condition of Trade Guid.');
                this.$router.push({name: "cot"});
            }

            var payload = {
                'cot_guid': this.currentCot,
            }

            var pass_obj = {
                "dispatch": 'general/trigger_get_cot',
                "getter": 'general/get_cot',
                "app": this,
                "payload": payload,
            }

            var cot_details = await this.$dispatch(pass_obj);
            
            if(cot_details.status)
            {
                this.json = cot_details.response.data;
                this.json.isactive = this.json.isactive == 1 ? true : false;
            }
        }
        else if(this.$route.name == 'createCot')
        {
            this.page_function = 'create';
        }

        this.loading = false;
    },
    methods:{
        async saveCot(){
            this.loading = true;
            var payload = {
                pass_json: {
                    "name": this.json.name,
                    "cot_value": this.json.cot_value,
                    "isactive": this.json.isactive ? 1 : 0,
                    "retailer_guid": this.json.retailer_guid,
                    "company_guid": this.company_guid,
                    "updated_by": this.username,
                }
            }

            if(this.page_function == 'create')
            {
                payload.pass_json.created_by = this.username;

                var pass_obj = {
                    "dispatch": 'general/trigger_create_cot',
                    "getter": 'general/get_cot',
                    "app": this,
                    "payload": payload,
                }

                var create_response = await this.$dispatch(pass_obj);

                if(create_response.status)
                {
                    this.showNotify('positive','Create successfully.');
                    this.$router.push({name: 'cot'});
                }
                else
                {
                    this.showNotify('negative','Create fail.');
                    console.log('Create fail', create_response.response);
                }
            }
            else if(this.page_function == 'edit')
            {
                payload.cot_guid = this.json.cot_guid;

                var pass_obj = {
                    "dispatch": 'general/trigger_update_cot',
                    "getter": 'general/get_cot',
                    "app": this,
                    "payload": payload,
                }

                var update_response = await this.$dispatch(pass_obj);

                if(update_response.status)
                {
                    this.showNotify('positive','Update successfully.');
                    this.$router.push({name: 'cot'});
                }
                else
                {
                    this.showNotify('negative','Update fail.');
                    console.log('Update fail', update_response.response);
                }
            }

            this.loading = false;
        },
        goBack(){
            this.$router.push({name: 'cot'});
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
