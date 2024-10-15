<template>
<!-- <div class="q-pa-md"> -->
<q-btn-dropdown :unelevated="true" :content-class="'profile_class'">
    <template v-slot:label>
        <div class="row items-center no-wrap">
            <q-avatar size="30px">
                <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
        </div>
    </template>
    <div>
        <div class="row" style="background-color: #094161;padding-top: 20px;padding-bottom:20px;padding-left:15px;padding-right:15px;">
            <div class="column items-center">
                <q-avatar size="72px">
                    <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                </q-avatar>
            </div>

            <div class="column" style="padding-left:10px;">
                <label style="font-size:15px;color:white;min-width:200px;">User ID: {{user_id}}</label>
                <label style="font-size:15px;color:white;padding-top:10px;">Name: {{user_name}}</label>
                <label style="font-size:15px;color:white;min-width:200px;">Group: {{group}}</label>
                <label style="font-size:15px;color:white;min-width:200px;">Email: {{email}}</label>
                <label style="font-size:15px;color:white;min-width:200px;">{{company}} {{supplier_code}}</label>
                <!-- <label>Panda 01</label> -->
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
        <div class="row" style="background-color: #094161;">
            <div class="col-7">
                <q-btn color="white" @click="changePassword()" text-color="white" label="Change Password" icon="lock" style="float:left;font-size:12px;padding: 10px 5px 10px 5px;"/>
            </div>
            <!-- <hr style="background-color:white;margin:0px;"> -->
            <div class="col-5" style="text-align:center;">
                <q-btn color="white" text-color="white" label="Logout" icon="logout" @click="logout()" style="background-color:#094161 !important;font-size:12px;padding: 10px 5px 10px 5px;" />
            </div>
        </div>
    </div>

</q-btn-dropdown>


<q-dialog v-model="changePasswordDialog" persistent>
    <q-card style="min-width: 350px">
    <q-card-section>
        <div class="text-h6">Change Password</div>
    </q-card-section>
<q-form ref="save_change_password_form">
    <q-card-section class="q-pt-none">
        <q-input type="password" dense label="CURRENT PASSWORD" v-model="currentPassword" autofocus :rules="[val => !!val || 'Field is required']" />
    </q-card-section>

    <q-card-section class="q-pt-none">
        <q-input type="password" dense label="NEW PASSWORD" v-model="newPassword" :rules="[val => !!val || 'Field is required']"/>
    </q-card-section>

    <q-card-section class="q-pt-none">
        <q-input type="password" dense label="RE-TYPE NEW PASSWORD" v-model="retypeNewPassword"
        :rules="[val => !!val || 'Field is required', val => val != newPassword ? 'Password Not Match' : null ]" />
    </q-card-section>
</q-form>
    <q-card-actions align="right" class="text-primary">
        <Button_icon :flat="true" :font_color="'black'" :color="'white'" :text="'CANCEL'" :outline="true" size="15px" class="custom_cancel_button" v-close-popup/>

        <Button_icon :flat="true" :font_color="'white'" :color="'#094161'" :text="'SAVE'" :outline="false" size="15px"
        v-on:receiveClick="handleSaveChangePassword"/>
    </q-card-actions>

    <q-inner-loading
        :showing="showAddLoading"
        color="primary"
    />

    </q-card>
</q-dialog>
<!-- </div> -->
</template>

<script>
import {
    ref
} from 'vue'

import Button_icon from 'src/components/HONDA/Base/Button_icon'
import { Notify } from "quasar";

import JsEncrypt from 'jsencrypt'
import public_key from 'src/public_key.pem';

export default {
    data() {
        return {
            mobileData: ref(false),
            bluetooth: ref(false),
            session_user_id: sessionStorage.getItem('user_id'),
            user_id: "",
            user_name: sessionStorage.getItem('user_name'),
            changePasswordDialog: false,
            currentPassword: "",
            newPassword: "",
            retypeNewPassword: "",
            session_email: sessionStorage.getItem("email") != "" && sessionStorage.getItem("email") != "null" && sessionStorage.getItem("email") != null ? sessionStorage.getItem("email") : '',
            session_company: sessionStorage.getItem("company") != "" && sessionStorage.getItem("company") != "null" && sessionStorage.getItem("company") != null ? sessionStorage.getItem("company") : '',
            session_supplier_code: sessionStorage.getItem("supplier_code") != "" && sessionStorage.getItem("supplier_code") != "null" && sessionStorage.getItem("supplier_code") != null ? sessionStorage.getItem("supplier_code") : '',
            email: "",
            company: "",
            supplier_code: "",
            group: "",
            showAddLoading: false,
            user_group_name: sessionStorage.getItem("user_group_name") != "" && sessionStorage.getItem("user_group_name") != "null" && sessionStorage.getItem("user_group_name") != null ? sessionStorage.getItem("user_group_name") : '',
        }
    },
    components: {
        Button_icon
    },
    async created()
    {
    //   console.log(sessionStorage);
        this.$nextTick(()=>{
            this.user_id = this.session_user_id;
            this.email = this.session_email;
            this.company = this.session_company;
            this.supplier_code = this.session_supplier_code != "" ? " - "+this.session_supplier_code : "";
        });

        var payload = {};

        // payload.params = {
        //     user_group_guid : sessionStorage.getItem("user_group_guid")
        // }

        // await this.$store.dispatch('login/trigger_ml_user_group', payload).then(() => {
        //     var data = JSON.parse(JSON.stringify(this.$store.getters['login/get_ml_user_group']));
        //     this.group = data.data.results[0].name;
        // });

        this.group = this.user_group_name;
    },
    methods: {
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
                timeout: 1000,
                position: 'top',
                html: true,
            })
        },
        logout() {
            this.$store.dispatch('login/logout').then(() => {
                this.$router.push('/honda/login')
            });
        },
        changePassword()
        {
            this.currentPassword = "";
            this.newPassword = "";
            this.retypeNewPassword = "";

            this.changePasswordDialog = true;
        },
        async handleSaveChangePassword()
        {
            this.showAddLoading = true;
            var validated = await this.validate_form('save_change_password_form');

            if(!validated)
            {
                this.showNotify("negative","Please make sure all field is correct.");
                this.showAddLoading = false;
                return;
            }
            else {
              var payload = {};
              var user_guid = sessionStorage.getItem('user_guid')

            JsEncrypt.prototype.setPublicKey(public_key)
            var new_currentPassword = JsEncrypt.prototype.encrypt(this.currentPassword)

            JsEncrypt.prototype.setPublicKey(public_key)
            var new_new_password = JsEncrypt.prototype.encrypt(this.newPassword)

            JsEncrypt.prototype.setPublicKey(public_key)
            var new_retype_new_password = JsEncrypt.prototype.encrypt(this.retypeNewPassword)

            //   payload = {
            //     "user_guid": user_guid,
            //     "current_password": this.currentPassword,
            //     "new_password": this.newPassword,
            //     "retype_new_password": this.retypeNewPassword,
            //   }

              payload = {
                "user_guid": user_guid,
                "current_password": new_currentPassword,
                "new_password": new_new_password,
                "retype_new_password": new_retype_new_password,
              }

            //   console.log(payload);
              await this.$store.dispatch('login/trigger_main_function_reset_password', payload).then(() => {
                var data = JSON.parse(JSON.stringify(this.$store.getters['login/get_main_function_reset_password']));
                // console.log(data);
                var status = data.response.status;
                var error = data.response.message;

                if(status == "True")
                {
                  this.$store.dispatch('login/logout').then(() => {
                      this.$router.push('/honda/login')
                  });
                  this.showNotify("positive","Reset Successfully.");

                }
                else{
                  this.showNotify("negative","Failed to Reset." + error);
                }

                this.showAddLoading = false;
              });
            }
        }
    }
}
</script>

<style>
.q-menu {
    border-radius: 0px;
}
</style><style scoped>
*>>>.q-btn:not([class*="custom_cancel_button"]) {
    background-color: #094161 !important;
    border-radius: 0px;
}

.password_cancel
{
    background-color: white !important;
}

.password_confirm
{
    background-color: white !important;
}

.custom_cancel_button {
    border: 1px solid black;
}
</style>
