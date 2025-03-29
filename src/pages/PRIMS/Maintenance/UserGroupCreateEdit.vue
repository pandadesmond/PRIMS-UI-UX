<template>
    <div class="row q-pa-md">
        <div class="text-subtitle1 header_text col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
            User Group
        </div>

        <q-form ref="save_form" class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 bg-white q-my-sm q-pa-md">
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12"  style="font-size: 10px;">
                <div class="row">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 q-px-sm q-py-xs">
                        <LabelInput label="Name" v-model:pass_value="json.name" :readonly="false" :dbComponentBehavior="dbComponentBehavior.text_required"/>
                    </div>
                <!-- </div>
                <div class="row"> -->
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 q-px-sm q-py-xs">
                        <LabelCheckbox label="Active" v-model:pass_value="json.isactive" :readonly="false" />
                    </div>
                </div>

                <q-separator inset class="q-my-md"/>

                <div class="row">
                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-px-sm q-py-xs">
                        <Label :pass_value="'Permission'" class="text-h6"/>
                    </div>
                    <div class="col-xl-10 col-lg-10 col-md-10 col-sm-10 col-xs-12 q-px-sm q-py-xs">
                        <div class="row">
                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <LabelCheckbox label="TTA Approval" v-model:pass_value="json.approved" :readonly="false" />
                            </div>
                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <LabelCheckbox label="TTA Authorisation" v-model:pass_value="json.authorised" :readonly="false" />
                            </div>
                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <LabelCheckbox label="TTA Draft" v-model:pass_value="json.saved" :readonly="false" />
                            </div>
                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <LabelCheckbox label="TTA Renewal" v-model:pass_value="json.renewed" :readonly="false" />
                            </div>
                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <LabelCheckbox label="TTA Rejection" v-model:pass_value="json.rejected" :readonly="false" />
                            </div>
                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <LabelCheckbox label="TTA Termination" v-model:pass_value="json.terminated" :readonly="false" />
                            </div>
                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <LabelCheckbox label="TTA Upload" v-model:pass_value="json.uploaded" :readonly="false" />
                            </div>
                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <LabelCheckbox label="Setting" v-model:pass_value="json.setting" :readonly="false" />
                            </div>
                        </div>
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
                        v-on:receiveClick="saveUserGroup"
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
import Label from 'src/components/PRIMS/Main/Label'
import LabelInput from 'src/components/PRIMS/General/LabelInput'
import LabelSelect from 'src/components/PRIMS/General/LabelSelect'
import LabelCheckbox from 'src/components/PRIMS/General/LabelCheckbox'
import Button from 'src/components/PRIMS/Main/Button'
import { Notify } from "quasar";

export default {
    components: {
        Label,
        LabelInput,
        LabelSelect,
        LabelCheckbox,
        Button,
    },
    data(){
        return{
            page_function: "",
            json: {
                name: "",
                isactive: 0,
                approved: 0,
                authorised: 0,
                saved: 0,
                rejected: 0,
                terminated: 0,
                setting: 0,
            },
            designation_list: [],
            department_list: [],
            user_group_list: [],
            currentDept: [],
            currentUserGroup: "",
            username: localStorage.getItem("username") != "" && localStorage.getItem("username") != "null" && localStorage.getItem("username") != null ? localStorage.getItem("username") : "",
            company_guid: localStorage.getItem("company_guid") != "" && localStorage.getItem("company_guid") != "null" && localStorage.getItem("company_guid") != null ? localStorage.getItem("company_guid") : "",
            loading: false,
            forceSelectAll: false,
        }
    },
    computed: {
        dbComponentBehavior() {
            return this.$store.getters["dbComponentBehavior/byLanguage"]("tta");
        },
    },
    async mounted(){
        this.loading = true;

        if(this.$route.name == 'editUserGroup')
        {
            this.page_function = "edit";

            if(this.$route.query.guid)
            {
                this.currentUserGroup = this.$route.query.guid;
            }
            
            if(this.currentUserGroup == "")
            {
                this.showNotify('negative', 'Unable to identify user group guid.');
                this.$router.push({name: "userGroup"});
            }

            var payload = {
                'user_group_guid': this.currentUserGroup,
            }

            var pass_obj = {
                "dispatch": 'user/trigger_get_user_group',
                "getter": 'user/get_user_group',
                "app": this,
                "payload": payload,
            }

            var group_details = await this.$dispatch(pass_obj);

            if(group_details.status)
            {
                this.json = group_details.response.data;
            }
            // console.log(this.json)
        }
        else if(this.$route.name == 'createUserGroup')
        {
            this.page_function = "create";
        }

        this.loading = false;
    },
    methods:{
        async saveUserGroup(){
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
                    "name": this.json.name,
                    "saved": this.json.saved ? 1 : 0,
                    "authorised": this.json.authorised ? 1 : 0,
                    "approved": this.json.approved ? 1 : 0,
                    "renewed": this.json.renewed ? 1 : 0,
                    "rejected": this.json.rejected ? 1 : 0,
                    "terminated": this.json.terminated ? 1 : 0,
                    "uploaded": this.json.uploaded ? 1 : 0,
                    "setting": this.json.setting ? 1 : 0,
                    "isactive": this.json.isactive ? 1 : 0,
                    "updated_by": this.username,
                }
            }

            if(this.page_function == "create")
            {
                payload.pass_json.created_by = this.username;

                var pass_obj = {
                    "dispatch": 'user/trigger_create_user_group',
                    "getter": 'user/get_user_group',
                    "app": this,
                    "payload": payload,
                };

                var data_response = await this.$dispatch(pass_obj);
                // console.log(data_response);

                if(data_response.status)
                {
                    this.showNotify("positive","Create Successfully.");
                    this.$router.push({name:"userGroup"});
                }
                else
                {
                    this.showNotify("negative", "Create Fail.");
                    console.log("Create fail",data_response.response);
                }
            }
            else if(this.page_function == "edit")
            {
                payload.user_group_guid = this.json.user_group_guid;

                var pass_obj = {
                    "dispatch": 'user/trigger_update_user_group',
                    "getter": 'user/get_user_group',
                    "app": this,
                    "payload": payload,
                };

                var data_response = await this.$dispatch(pass_obj);
                // console.log(data_response);

                if(data_response.status)
                {
                    this.showNotify("positive","Update Successfully.");
                    this.$router.push({name:"userGroup"});
                }
                else
                {
                    this.showNotify("negative", "Update Fail.");
                    console.log("Update fail",data_response.response);
                }
            }
            this.loading = false;
        },
        goBack(){
            this.$router.push({name: 'userGroup'});
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
