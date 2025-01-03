<template>
    <div class="row q-pa-md">
        <div class="text-subtitle1 header_text col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
            User
        </div>

        <q-form ref="save_form" class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 bg-white q-my-sm q-pa-md">
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12"  style="font-size: 10px;">
                <div class="row">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 q-px-sm q-py-xs">
                        <LabelInput label="User ID" v-model:pass_value="json.identifier" :readonly="false" :dbComponentBehavior="dbComponentBehavior.text"/>
                    </div>
                <!-- </div>
                <div class="row"> -->
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 q-px-sm q-py-xs">
                        <LabelInput label="Name" v-model:pass_value="json.name" :readonly="false" :dbComponentBehavior="dbComponentBehavior.text"/>
                    </div>
                <!-- </div>
                <div class="row"> -->
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 q-px-sm q-py-xs">
                        <LabelInput label="Email" v-model:pass_value="json.email" :readonly="false" :dbComponentBehavior="dbComponentBehavior.text"/>
                    </div>
                <!-- </div>
                <div class="row"> -->
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 q-px-sm q-py-xs">
                        <LabelInput label="Password" v-model:pass_value="json.password" :readonly="false" :password_input="true" :dbComponentBehavior="dbComponentBehavior.text"/>
                    </div>
                <!-- </div>
                <div class="row"> -->
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 q-px-sm q-py-xs">
                        <LabelInput label="Telephone" v-model:pass_value="json.telephone" :readonly="false" :dbComponentBehavior="dbComponentBehavior.text"/>
                    </div>
                <!-- </div>
                <div class="row"> -->
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 q-px-sm q-py-xs">
                        <LabelSelect label="User Group" v-model:pass_value="json.user_group_guid" :options="user_group_list" :readonly="false" :dbComponentBehavior="dbComponentBehavior.select"/>
                    </div>
                <!-- </div>
                <div class="row"> -->
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 q-px-sm q-py-xs">
                        <LabelSelect label="Designation" v-model:pass_value="json.designation_guid" :options="designation_list" :readonly="false" :dbComponentBehavior="dbComponentBehavior.select"/>
                    </div>
                <!-- </div>
                <div class="row"> -->
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 q-px-sm q-py-xs">
                        <LabelMultiselect label="Department" v-model:pass_value="json.department" :options="department_list" option_label="Departments"
                            :forceSelectAll="forceSelectAll" :dbComponentBehavior="dbComponentBehavior.text" :manage_button="false"/>
                    </div>
                <!-- </div>
                <div class="row"> -->
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
                        v-on:receiveClick="saveUser"
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
import LabelSelect from 'src/components/PRIMS/General/LabelSelect'
import LabelCheckbox from 'src/components/PRIMS/General/LabelCheckbox'
import Button from 'src/components/PRIMS/Main/Button'
import { Notify } from "quasar";

export default {
    components: {
        LabelInput,
        LabelSelect,
        LabelMultiselect,
        LabelCheckbox,
        Button,
    },
    data(){
        return{
            page_function: "",
            json: {
                name: "",
                code: "",
                retailer_guid: "",
                department: [],
            },
            designation_list: [],
            department_list: [],
            user_group_list: [],
            currentDept: [],
            currentUser: "",
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

        // set designation options
        var payload = {
            params: {
                'limit': 99999,
                'ordering': 'name',
                'isactive': 1,
            }
        }

        var pass_obj = {
            "dispatch": 'user/trigger_get_designation_list',
            "getter": 'user/get_designation',
            "app": this,
            "payload": payload,
        }

        var designation_list = await this.$dispatch(pass_obj);

        if(designation_list.status)
        {
            const designation = designation_list.response.data.results;
            for(var i in designation)
            {
                designation[i].value = designation[i].designation_guid;
                designation[i].label = designation[i].name;
            }
            this.designation_list = designation;
        }

        // set department options
        var payload = {
            params: {
                'limit': 99999,
                'ordering': 'group_desc',
            }
        }

        var pass_obj = {
            "dispatch": 'general/trigger_get_dept_list',
            "getter": 'general/get_division',
            "app": this,
            "payload": payload,
        }

        var department_list = await this.$dispatch(pass_obj);

        if(department_list.status)
        {
            const department = department_list.response.data.results;
            for(var i in department)
            {
                department[i].value = department[i].dept_guid;
                department[i].label = `${department[i].code} - ${department[i].name}`;
            }
            this.department_list = department;
        }

        // set user group options
        var payload = {
            params: {
                'limit': 99999,
                'ordering': 'name',
            }
        }

        var pass_obj = {
            "dispatch": 'user/trigger_get_user_group_list',
            "getter": 'user/get_user_group',
            "app": this,
            "payload": payload,
        }

        var user_group_list = await this.$dispatch(pass_obj);

        if(user_group_list.status)
        {
            const user_group = user_group_list.response.data.results;
            for(var i in user_group)
            {
                user_group[i].value = user_group[i].user_group_guid;
                user_group[i].label = user_group[i].name;
            }
            this.user_group_list = user_group;
        }

        if(this.$route.name == 'editUser')
        {
            this.page_function = "edit";

            if(this.$route.query.guid)
            {
                this.currentUser = this.$route.query.guid;
            }
            
            if(this.currentUser == "")
            {
                this.showNotify('negative', 'Unable to identify user guid.');
                this.$router.push({name: "user"});
            }

            var payload = {
                'user_info_guid': this.currentUser,
            }

            var pass_obj = {
                "dispatch": 'user/trigger_get_user_info',
                "getter": 'user/get_user_info',
                "app": this,
                "payload": payload,
            }

            var user_details = await this.$dispatch(pass_obj);
            
            if(user_details.status)
            {
                this.json = user_details.response.data;
                this.json.department = [];
                var payload = {
                    params: {
                        'user_info_guid': this.currentUser,
                    }
                }

                var pass_obj = {
                    "dispatch": 'user/trigger_get_user_department_list',
                    "getter": 'user/get_user_department',
                    "app": this,
                    "payload": payload,
                }

                var user_department = await this.$dispatch(pass_obj);

                if(user_department.status)
                {
                    const data = user_department.response.data;
                    if(data.count > 0)
                    {
                        this.json.department = data.results.map((entry)=>{return entry.dept_guid});
                        this.currentDept =  data.results;
                    }
                }
            }
            console.log(this.json)
        }
        else if(this.$route.name == 'createUser')
        {
            this.page_function = "create";
        }

        this.loading = false;
    },
    methods:{
        async saveUser(){
            this.loading = true;

            var payload = {
                pass_json: {
                    "isactive": this.json.isactive ? 1 : 0,
                    "updated_by": this.username,
                    "identifier": this.json.identifier,
                    "password": this.json.password,
                    "name": this.json.name,
                    "email": this.json.email,
                    "telephone": this.json.telephone,
                    "designation_guid": this.json.designation_guid,
                    "user_group_guid": this.json.user_group_guid,
                    "company_guid": this.company_guid,
                }
            }

            if(this.page_function == "create")
            {
                payload.pass_json.created_by = this.username;

                var pass_obj = {
                    "dispatch": 'user/trigger_create_user_info',
                    "getter": 'user/get_user_info',
                    "app": this,
                    "payload": payload,
                };

                var create_response = await this.$dispatch(pass_obj);

                if(create_response.status)
                {
                    const data = create_response.response;

                    try{
                        for(var dept_guid of this.json.department)
                        {
                            var payload = {
                                pass_json: {
                                    'dept_guid': dept_guid,
                                    'user_info_guid': data.user_info_guid,
                                    'created_by': this.username,
                                    'updated_by': this.username,
                                }
                            }

                            var pass_obj = {
                                "dispatch": 'user/trigger_create_user_department',
                                "getter": 'user/get_user_department',
                                "app": this,
                                "payload": payload,
                            };

                            var response = await this.$dispatch(pass_obj);

                            if(!response.status)
                            {
                                throw response.response;
                            }
                        }
                    }catch(error)
                    {
                        console.log("create user dept",error);
                    }
                    this.showNotify("positive","Create Successfully.");
                    this.$router.push({name:"user"});
                }
                else
                {
                    this.showNotify("negative", "Create Fail.");
                    console.log("Create fail",create_response.response);
                }
            }
            else if(this.page_function == "edit")
            {
                payload.user_info_guid = this.json.user_info_guid;

                var pass_obj = {
                    "dispatch": 'user/trigger_update_user_info',
                    "getter": 'user/get_user_info',
                    "app": this,
                    "payload": payload,
                };

                var update_response = await this.$dispatch(pass_obj);
                console.log(update_response);

                if(update_response.status)
                {
                    try {
                        var original_user_dept = this.currentDept;
                        var new_user_dept = this.json.department;

                        // Delete user dept from original list if it does not include in new list
                        original_user_dept.filter(async (entry)=>{
                            if(!new_user_dept.includes(entry.dept_guid)){
                                console.log('delete',entry)

                                var payload = {
                                    'user_department_guid': entry.user_department_guid,
                                }
                                var pass_obj = {
                                    "dispatch": 'user/trigger_delete_user_department',
                                    "getter": 'user/get_user_department',
                                    "app": this,
                                    "payload": payload,
                                };

                                var response = await this.$dispatch(pass_obj);

                                if(!response.status)
                                {
                                    throw response.response;
                                }
                            }
                        })

                        // Create user dept if it does not include in original list
                        new_user_dept.filter(async (entry)=>{
                            if(!original_user_dept.map(entry=>entry.dept_guid).includes(entry)){
                                console.log('create', entry)

                                var payload = {
                                    pass_json: {
                                        'dept_guid': entry,
                                        'user_info_guid': this.json.user_info_guid,
                                        'created_by': this.username,
                                        'updated_by': this.username,
                                    }
                                }

                                var pass_obj = {
                                    "dispatch": 'user/trigger_create_user_department',
                                    "getter": 'user/get_user_department',
                                    "app": this,
                                    "payload": payload,
                                };

                                var response = await this.$dispatch(pass_obj);

                                if(!response.status)
                                {
                                    throw response.response;
                                }
                            }
                        })
                    }catch(error)
                    {
                        console.log('edit user dept',error);
                    }
                    this.showNotify("positive","Update Successfully.");
                    this.$router.push({name:"user"});
                }
                else
                {
                    this.showNotify("negative", "Update Fail.");
                    console.log("Update fail",update_response.response);
                }
            }
            console.log(payload);
            this.loading = false;
        },
        goBack(){
            this.$router.push({name: 'user'});
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
