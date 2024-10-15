<template>
    <!-- <div class="q-pa-md"> -->
    <q-btn-dropdown :unelevated="true" :content-class="'profile_class'">
        <template v-slot:label>
            <div class="row items-center no-wrap">
                <q-avatar size="30px">
                    <img src="anonymous.png">
                </q-avatar>
            </div>
        </template>
        <div>
            <div class="row"
                style="background-color: #4e436a;padding-top: 20px;padding-bottom:20px;padding-left:15px;padding-right:15px;">
                <div class="column items-center">
                    <q-avatar size="72px">
                        <img src="anonymous.png">
                    </q-avatar>
                </div>

                <div class="column" style="padding-left:10px;">
                    <label style="font-size:15px;color:white;padding-top:10px;">{{ user_name }}</label>
                    <label style="font-size:15px;color:white;min-width:200px;">User ID : {{ user_id }}</label>
                    <!-- <label>Panda 01</label> -->

                    <q-btn v-if="main_user == 1" outline style="color: white;" :label="customer_code" @click="handleClickCustomerCode"/>
                </div>

                <!-- <q-separator horizontal inset class="q-mx-lg" />
        <q-list>
            <q-item clickable  @click="onItemClick">
            <q-item-section>
                <q-item-label>Photos</q-item-label>
            </q-item-section>
            </q-item>

            <q-item clickable @click="onItemClick">
            <q-item-section>
                <q-item-label>Videos</q-item-label>
            </q-item-section>
            </q-item>

            <q-item clickable @click="onItemClick">
            <q-item-section>
                <q-item-label>Articles</q-item-label>
            </q-item-section>
            </q-item>
        </q-list> -->

            </div>
            <hr style="background-color:white;margin:0px;">
            <div class="row" style="background-color: #4e436a;">
                <div class="col-7">
                    <q-btn flat @click="changePassword()" color="white" text-color="white" label="Change Password"
                        icon="lock"
                        style="background-color:#4e436a !important;float:left;font-size:12px;padding: 10px 5px 10px 5px;" />
                </div>
                <!-- <hr style="background-color:white;margin:0px;"> -->
                <div class="col-5" style="text-align:center;">
                    <q-btn flat color="white" text-color="white" label="Logout" icon="logout" @click="logout()"
                        style="background-color:#4e436a !important;font-size:12px;padding: 10px 5px 10px 5px;" />

                    <!-- <Button_icon :flat="true" :font_color="'white'" :color="'#094161'" :text="'SAVE'" :outline="false" size="15px"
                v-on:receiveClick="handleSaveChangePassword"/> -->
                </div>
            </div>
        </div>

    </q-btn-dropdown>
    <!-- </div> -->

    <q-dialog v-model="changePasswordDialog" persistent>
        <q-card style="min-width: 350px">
            <q-card-section>
                <div class="text-h6">Change Password</div>
            </q-card-section>
            <q-form ref="save_change_password_form">
                <q-card-section class="q-pt-none">
                    <q-input v-on:keyup.enter="handleSaveChangePassword" autocomplete="off" type="password" dense label="CURRENT PASSWORD" v-model="currentPassword"
                        autofocus :rules="[val => !!val || 'Field is required']" />
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <q-input v-on:keyup.enter="handleSaveChangePassword" autocomplete="off" type="password" dense label="NEW PASSWORD" v-model="newPassword"
                        :rules="[val => !!val || 'Field is required']" />
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <q-input v-on:keyup.enter="handleSaveChangePassword" autocomplete="off" type="password" dense label="RE-TYPE NEW PASSWORD"
                        v-model="retypeNewPassword"
                        :rules="[val => !!val || 'Field is required', val => val != newPassword ? 'Password Not Match' : null]" />
                </q-card-section>
            </q-form>
            <q-card-actions align="right" class="text-primary">
                <Button_icon :loading="loadingSave" :flat="true" :font_color="'white'" :color="'white'" :text="'CANCEL'" :outline="true"
                    size="15px" class="custom_cancel_button" v-close-popup style="background-color: #4e436a !important;" />

                <Button_icon :loading="loadingSave" :flat="true" :font_color="'white'" :color="'#4e436a'" :text="'SAVE'" :outline="false"
                    size="15px" v-on:receiveClick="handleSaveChangePassword"
                    style="background-color: #4e436a !important;" />
            </q-card-actions>

            <q-inner-loading :showing="showAddLoading" color="primary" />

        </q-card>
    </q-dialog>
</template>

<script>
import {
    ref
} from 'vue'

import Button_icon from 'src/components/RDA/Base/Button_icon'

import {
    Notify
} from "quasar"

export default {
    data() {
        return {
            mobileData: ref(false),
            bluetooth: ref(false),
            user_id: sessionStorage.getItem('user_id'),
            user_name: sessionStorage.getItem('user_name'),
            changePasswordDialog: false,
            currentPassword: '',
            newPassword: '',
            retypeNewPassword: '',
            user_email: sessionStorage.getItem('user_email'),
            sessionUserGuid: sessionStorage.getItem("user_guid") != "" && sessionStorage.getItem("user_guid") != "null" && sessionStorage.getItem("user_guid") != null ? sessionStorage.getItem("user_guid") : '',
            customer_guid: sessionStorage.getItem("customer_guid"),
            session_user_id: sessionStorage.getItem("user_id"),
            session_module_group_guid: sessionStorage.getItem("module_group_guid"),
            sessionGroupId: sessionStorage.getItem("usergroup_id") != "" && sessionStorage.getItem("usergroup_id") != "null" && sessionStorage.getItem("usergroup_id") != null ? sessionStorage.getItem("usergroup_id") : '',
            sessionIsactive: sessionStorage.getItem("isactive") != "" && sessionStorage.getItem("isactive") != "null" && sessionStorage.getItem("isactive") != null ? sessionStorage.getItem("isactive") : '',
            sessionUserEmail: sessionStorage.getItem("user_email") != "" && sessionStorage.getItem("user_email") != "null" && sessionStorage.getItem("user_email") != null ? sessionStorage.getItem("user_email") : '',
            loadingSave: false,
            customer_code: sessionStorage.getItem('customer_code'),
            main_user: sessionStorage.getItem("main_user") != "" && sessionStorage.getItem("main_user") != "null" && sessionStorage.getItem("main_user") != null ? sessionStorage.getItem("main_user") : '',

        }
    },
    components: {
        Button_icon
    },
    methods: {
        handleClickCustomerCode()
        {
            this.$router.push("/rda/dashboard/outlet");
        },
        logout() {
            this.$store.dispatch('login/logout').then(() => {

                //comment remove state due to too slow
                // this.$store.dispatch('login/reset_state',this.$store).then(() => {

                    this.$router.push('/rda/login').then(()=>{
                        location.reload();
                    });

                // });

                
                
                // location.href = "/RDA/#/rda/login";
            });
        },
        changePassword() {
            this.changePasswordDialog = true;
        },
        async validate_form(form_name = "")
        {
            var form_name = form_name;
            var error = 0;
            await this.$refs[form_name].validate().then(valid => {
                if (!valid) {
                    error = 1;
                }
            });

            var error = error == 1 ? false : true;
            //true is no error false is got error

            return new Promise((resolve, reject) => {
            // setTimeout(() => {
                resolve(error);
            // }, 2000);
            });
        },
        showNotify(type, message) {
            Notify.create({
                type: type,
                message: message,
                timeout: 3000,
                position: 'top',
            })
        },
        async handleSaveChangePassword() {
            
            this.loadingSave = true;

            var validated = await this.validate_form('save_change_password_form');

            if(!validated)
            {
                this.showNotify("negative","Please make sure all field is filled in and correct.");
                this.loadingSave = false;
                return;
            }

            var payload = {
                username: this.user_email,
                password: this.currentPassword,
                module_group_guid: 'EA73A07DB32311EDB7D5000D3AA16CAB',
            };

            var status;

            await this.$store.dispatch('login/login_function_by_token_checking', payload).then(() => {
                var data = JSON.parse(JSON.stringify(this.$store.getters['login/get_login_checking_status']));
                status = data.status;
            });//close await

            if (status != "success") {
                this.showNotify('negative', 'Password incorrect.');
                // this.logout();
                this.loadingSave = false;
                return;
            }

            var payload = {
              "acc_guid": [],
              "branch_guid": [],
              "module_group_guid": [this.session_module_group_guid],
              "user_group_guid": [],
              // "user_guid": [this.sessionUserGuid],
              "user_guid": [this.sessionUserGuid],
              "isactive": [],
              "user_id": []
            };

            // if(this.sessionGroupId != '4FA7FF02D9CA11EDA4DD000D3AA16CAB' && this.sessionGroupId != 'A267A6E0BCCC11EDA4CB000D3AA16CAB')
            // {
            //   payload.user_guid = [this.sessionUserGuid];
            // }
            var phone_no = '-';

            await this.$store.dispatch('maintenance/trigger_get_set_user', payload).then(() => {
                // this.cur_tta = {};
                var data = JSON.parse(JSON.stringify(this.$store.getters['maintenance/get_set_user']));
                var status = data.status;
   
                if(status == "success")
                {
                    if(data.response.output.length > 0)
                    {
                        phone_no = data.response.output[0].phone_no
                    }
                    
                }
            });
            
            var payload = {
                "inputs": [
                    {
                        "edit_userid": 0,
                        "acc_guid": this.customer_guid,
                        "branch_guid": "",
                        "module_group_guid": this.session_module_group_guid,
                        "user_group_guid": this.sessionGroupId,
                        "isactive": this.sessionIsactive,
                        "user_guid": this.sessionUserGuid,
                        "user_id": this.session_user_id,
                        "user_password": this.retypeNewPassword != '' ? this.retypeNewPassword : '',
                        "user_name": this.user_name,
                        "created_by": this.session_user_id,
                        "updated_by": this.session_user_id,
                        "mobile_status": 0,
                        "user_email": this.sessionUserEmail,
                        "phone_no": phone_no,
                    }
                ]
            }

            // if(this.editUserData.password != '')
            // {
            //     payload.inputs[0].user_password = this.editUserData.password
            // }

            var payload = {
                pass_json: payload,
            }

            var status = 'failed';
            var error_message = "Fail to update details. Please try again.";

            await this.$store.dispatch('maintenance/trigger_update_set_user', payload).then(async () => {
                var data = JSON.parse(JSON.stringify(this.$store.getters['maintenance/get_set_user_status']));
                status = data.status;
                console.log(data);
                
                if(status != "success")
                {
                    if(JSON.parse(data.result))
                    {
                        var json = JSON.parse(data.result)
                        if(json.detail)
                        {
                            error_message = json.detail;
                        }
                    }
                }

            });//close dispatch create


            if (status != "success") {
                this.showNotify("negative", error_message);
                // this.logout();
                this.loadingSave = false;

                return;
            }
            
            this.showNotify("positive", "Update successfully.");
            this.logout();
            // this.loadingSave = false;
            
        }
    },
    watch: {
        '$route'(to, from) {
            
            this.customer_code = sessionStorage.getItem('customer_code')

        }
    }
}
</script>

<style>
.q-menu {
    border-radius: 0px;
}
</style>
<style scoped>
/* *>>>.q-btn {
    background-color: #094161 !important;
    border-radius: 0px;
} */
</style>
