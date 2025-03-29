<template>
    <q-btn-dropdown :unelevated="true" icon="person" :content-class="'profile_class'">
        <!-- <template v-slot:label>
            <div class="row items-center no-wrap">
                <q-avatar size="30px">
                    <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                </q-avatar>
            </div>
        </template> -->
        <div style="width: 200px;">
            <!-- <div class="row">
                <q-btn 
                no-caps 
                flat 
                @click="changePassword()" 
                text-color="#000000" 
                style="height: 40px;"
                label="Change Password" 
                icon="lock" 
                class="custom-btn" 
                />
            </div>
            <q-separator class="separator-style"></q-separator> -->
            <div class="row">
                <q-btn 
                no-caps 
                flat 
                color="white" 
                text-color="red" 
                style="height: 40px;"
                label="Logout" 
                icon="fa fa-sign-out-alt"
                class="custom-btn" 
                @click="logout()" 
                />
            </div>
            <div class="row" v-if="outlet_code">
                <q-btn class="full-width" outline style="color: black;" :label="outlet_code" @click="handleClickOutlet"/>
            </div>
        </div>
    
    </q-btn-dropdown>
    
    
    <q-dialog v-model="changePasswordDialog" persistent>
        <q-card style="min-width: 450px">
            <q-card-section>
                <div class="text-h6">Change Password</div>
            </q-card-section>
            <q-form ref="save_change_password_form">
                <q-card-section class="q-pt-none q-mx-md">
                    <q-input type="password" dense label="CURRENT PASSWORD" v-model="currentPassword" autofocus :rules="[val => !!val || 'Field is required']" />
                </q-card-section>

                <q-card-section class="q-pt-none q-mx-md">
                    <q-input type="password" dense label="NEW PASSWORD" v-model="newPassword" :rules="[val => !!val || 'Field is required']"/>
                </q-card-section>

                <q-card-section class="q-pt-none q-mx-md">
                    <q-input type="password" dense label="RE-TYPE NEW PASSWORD" v-model="retypeNewPassword"
                    :rules="[val => !!val || 'Field is required', val => val != newPassword ? 'Password Not Match' : null ]" />
                </q-card-section>
            </q-form>
            <q-card-actions align="right" class="text-primary">
                <Button_icon :flat="true" font_color="black" color="white" text="CANCEL" :outline="true" size="12px" class="dialog_confirm_cancel_button" v-close-popup/>

                <Button_icon :flat="true" font_color="white" color="#2f3a4d" text="SAVE" :outline="false" size="12px" class="primary_actions_button"
                v-on:receiveClick="handleSaveChangePassword"/>
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>
    
    <script>
    import {
        ref
    } from 'vue'
    
    import Button_icon from 'src/components/ERP/Base/Button_icon'
    import { Notify } from "quasar";
    import {Loading, QSpinnerTail} from 'quasar';
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
                outlet_code: sessionStorage.getItem('outlet_code'),
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
                this.supplier_code = this.session_supplier_code != "" ? this.session_supplier_code : "";
            });
    
            var payload = {};
    
            payload.params = {
                user_group_guid : sessionStorage.getItem("user_group_guid")
            }
    
            // await this.$store.dispatch('login/trigger_ml_user_group', payload).then(() => {
            //     var data = JSON.parse(JSON.stringify(this.$store.getters['login/get_ml_user_group']));
            //     this.group = data.data.results[0].name;
            // });
        },
        methods: {
            handleClickOutlet(){
                this.$router.push("/erp/location/outletlocation");
            },
          showLoading()
            {
                // default options
                Loading.show()
    
                // fully customizable
                Loading.show({
                    spinner: QSpinnerTail,
                // other props
                })
            },
            hideLoading()
            {
                setTimeout(function(){
                    Loading.hide();
                },300);
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
                    timeout: 1000,
                    position: 'top',
                    html: true,
                })
            },
            logout() {
                this.showLoading();
                this.$store.dispatch('login/logout').then(() => {
                    setTimeout(()=>{
                        this.$router.push('/PRIMS/Login');
                        this.hideLoading();
                        this.showNotify('positive', 'Successfully Logout.')
                    },500);
    
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
                  payload = {
                    "user_guid": user_guid,
                    "current_password": this.currentPassword,
                    "new_password": this.newPassword,
                    "retype_new_password": this.retypeNewPassword,
                  }
    
                  console.log(payload);
                  await this.$store.dispatch('login/trigger_main_function_reset_password', payload).then(() => {
                    var data = JSON.parse(JSON.stringify(this.$store.getters['login/get_main_function_reset_password']));
                    console.log(data);
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
                  });
                }
            }
        },
        watch: {
            '$route'(to, from) {
                
                this.outlet_code = sessionStorage.getItem('outlet_code')
    
            }
        }
    }
    </script>
    
    <style scoped>
    .q-menu {
        border-radius: 8px !important;
    }
    .custom-btn {
        display: flex;
        justify-content: flex-start; 
        text-align: left;
        width: 100%;
        font-size:13px; 
        font-weight:500;

    }
    .custom-btn .q-btn__content {
        justify-content: flex-start; 
    }
    
    .custom-btn .q-icon {
        color: #203755; 
    }

    .custom-btn .q-icon {
        font-size: 20px; 
    }

    .password_cancel
    {
        background-color: white !important;
    }
    
    .password_confirm
    {
        background-color: white !important;
    }
    
    .separator-style {
      border-top: 1px solid #BFBFBF;
      width: 100%;
    }
    .custom-icon >>> .q-icon{
      color: #203755; /* Change this to your desired color */
    }
    </style>