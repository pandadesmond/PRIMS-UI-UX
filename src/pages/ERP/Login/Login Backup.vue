<template>
aaaa
<div v-if="$q.screen.width > 599" class="container">
    <div class="content">
        <div class="col-md-12 logo_bar">
            <div class="row">
                <div class="col-xs-12 col-sm-10 col-md-10 col-lg-10 col-xl-10 offset-sm-1 offset-md-1 offset-lg-1 offset-xl-1">
                    <div class="row">
                        <div class="col-xs-12 col-sm-8 col-md-2 col-lg-2 col-xl-2">
                          <div class="row" :class="$q.screen.width < 600 ? 'justify-center' : ''">
                            <img src="panda.png" class="logo_style">
                          </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="col-md-12">
            <div class="bar">
            </div>
        </div> -->

        <div class="row">

            <div class="col-xs-12 col-sm-10 col-md-10 col-lg-10 col-xl-10 offset-sm-1 offset-md-1 offset-lg-1 offset-xl-1">

                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <div class="bar">
                        </div>
                    </div>

                    <div class="col-xs-12 col-sm-8 col-md-8 col-lg-8 col-xl-8 announcement_section">
                        <p class="title">Announcement</p>
                        <div class="content_child">
                          <span>System down for maintenance</span>
                            <!-- <p>System Income will be down for maintenance on
                                <b>1st June 2020</b>, from <b>12 AM</b> to <b>11 PM</b>
                            </p> -->
                            <p><br></p>
                            <p><br></p>
                            <p><br></p>
                            <p><br></p>
                        </div>
                    </div>

                    <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 col-xl-4 login_section">
                        <center class="center_style">
                            <p class="title">Inventory Management</p>
                        </center>

                        <!-- <b-alert :variant="variant" show dismissible v-if="show_message">
                                {{alert_message}}
                            </b-alert> -->

                        <Input v-on:keyup.enter="Login" v-model="username" :icon_prepend="'person'" :componentBehavior="{
                            label: 'Email Address / User ID',
                            maxlength: '100',
                            rules: [val => val.length <= 100 || 'Please use maximum 100 character'],
                            type: 'text',
                            prefix: '',
                            mask: '',
                            fill_mask: '',
                            hint: '',
                            addReadonly: true,
                            editReadonly: true
                        }" />

                        <Input v-on:keyup.enter="Login" :type="isPwd ? 'password' : 'text'" v-model="password" :icon_prepend="'lock'" :icon_append="eyes_display" v-on:password_method="passwordMethod()" :componentBehavior="{
                            label: 'Password',
                            maxlength: '100',
                            rules: [val => val.length <= 100 || 'Please use maximum 100 character'],
                            type: 'text',
                            prefix: '',
                            mask: '',
                            fill_mask: '',
                            hint: '',
                            addReadonly: true,
                            editReadonly: true
                        }" />

                        <!-- <q-input filled v-model="username" :dense="dense" style="margin:10px">
                            <template v-slot:prepend>
                                <q-icon name="person" />
                            </template>
                        </q-input>

                        <q-input v-model="password" filled :type="isPwd ? 'password' : 'text'" style="margin:10px">
                            <template v-slot:prepend>
                                <q-icon name="lock" />
                            </template>
                            <template v-slot:append>
                                <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
                            </template>
                        </q-input> -->

                        <q-btn @click="Login" class="full-width">
                            Login
                        </q-btn>
                    </div>

                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <div class="bar">
                        </div>
                    </div>
                </div>
            </div>
            <!--close row-->
        </div>

        <!-- <div class="col-md-6">
            <div class="bar" style="font-size:10px;padding-top:4px;color:#273655">
                <b class="pull-right">Ver.1.0</b>
                <b class="pull-left">Copyright &#169; Panda Software House Sdn. Bhd.</b>
            </div>
        </div> -->
    </div>

</div>

<div v-else class="container" style="background-color: white; height: 100vh;">
    <div class="content">
        <div class="col-md-12 logo_bar" style="background-color: #273655;">
            <div class="row">
                <div class="col-xs-12 col-sm-10 col-md-10 col-lg-10 col-xl-10 offset-sm-1 offset-md-1 offset-lg-1 offset-xl-1">
                    <div class="row">
                        <div class="col-xs-12 col-sm-8 col-md-2 col-lg-2 col-xl-2">
                          <div class="row" :class="$q.screen.width < 600 ? 'justify-center' : ''">
                            <img src="panda.png" style="width: 30%; height: 80%;">
                          </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div style="height: 20px;background-color: #273655; clip-path: polygon(100% 0, 100% 50%, 20% 50%, 15% 100%, 10% 50%, 0 50%, 0 0);">
        </div>

        <!-- <div class="col-md-12">
            <div class="bar">
            </div>
        </div> -->

        <div class="row" style="padding: 20px;">

            <div class="col-xs-12 col-sm-10 col-md-10 col-lg-10 col-xl-10 offset-sm-1 offset-md-1 offset-lg-1 offset-xl-1">

                <div class="row">
                    <!-- <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <div class="bar">
                        </div>
                    </div> -->

                    <!-- <div class="col-xs-12 col-sm-8 col-md-8 col-lg-8 col-xl-8 announcement_section">
                        <p class="title">Announcement</p>
                        <div class="content_child">
                          <span>System down for maintenance</span>
                            <p><br></p>
                            <p><br></p>
                            <p><br></p>
                            <p><br></p>
                        </div>
                    </div> -->

                    <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 col-xl-4" style="padding: 10px;">
                        <!-- <center class="center_style">
                            <p class="title">ERP</p>
                        </center> -->
                        <b style="font-size: 25px;">ERP</b>

                        <div style="font-weight: 700; font-size: 16px; color: black; margin-top: 10px;">Announcement</div>
                        <div style="padding-bottom: 30px; font-size: 12px;">
                          <span>System down for maintenance</span>
                        </div>

                        <!-- <b-alert :variant="variant" show dismissible v-if="show_message">
                                {{alert_message}}
                            </b-alert> -->

                        <Input v-on:keyup.enter="Login" v-model="username" :icon_prepend="'o_person'" :componentBehavior="{
                            label: 'Email Address / User ID',
                            maxlength: '100',
                            rules: [val => val.length <= 100 || 'Please use maximum 100 character'],
                            type: 'text',
                            prefix: '',
                            mask: '',
                            fill_mask: '',
                            hint: '',
                            addReadonly: true,
                            editReadonly: true
                        }" />

                        <Input v-on:keyup.enter="Login" :type="isPwd ? 'password' : 'text'" v-model="password" :icon_prepend="'o_lock'" :icon_append="eyes_display" v-on:password_method="passwordMethod()" :componentBehavior="{
                            label: 'Password',
                            maxlength: '100',
                            rules: [val => val.length <= 100 || 'Please use maximum 100 character'],
                            type: 'text',
                            prefix: '',
                            mask: '',
                            fill_mask: '',
                            hint: '',
                            addReadonly: true,
                            editReadonly: true
                        }" />


                            <q-btn class="full-width" @click="Login" style="padding-left: 50px; padding-right: 50px; border-radius: 20px; margin-bottom: -40px;">
                                Login
                            </q-btn>

                    </div>

                    <!-- <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <div class="bar">
                        </div>
                    </div> -->
                </div>
            </div>
            <!--close row-->
        </div>

        <!-- <div class="col-md-6">
            <div class="bar" style="font-size:10px;padding-top:4px;color:#273655">
                <b class="pull-right">Ver.1.0</b>
                <b class="pull-left">Copyright &#169; Panda Software House Sdn. Bhd.</b>
            </div>
        </div> -->
    </div>

</div>



<q-dialog v-model="changePasswordDialog" persistent>
    <q-card class="card1_style">
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

</template>

<script>
import Input from 'src/components/Base/Input';
import Button_icon from 'src/components/ERP/Base/Button_icon'

import {
    mapGetters,
    mapActions
} from "vuex";
import {
    Notify,
    date
} from "quasar"
import axios from 'axios';
import {
    ref
} from 'vue'

import {
  Loading,
  // optional!, for example below
  // with custom spinner
  QSpinnerTail
} from 'quasar'

// import CryptoJS from 'crypto-js';
// import Base64 from 'crypto-js/enc-base64'
// import Utf8 from 'crypto-js/enc-utf8'

import public_key from 'src/public_key.pem';


import JsEncrypt from 'jsencrypt/bin/jsencrypt'

export default {
    data() {
        return {
            username: "",
            password: "",
            variant: "success",
            show_message: false,
            alert_message: "",
            isPwd: ref(true),
            announcement: "",
            changePasswordDialog: false,
            currentPassword: "",
            newPassword: "",
            retypeNewPassword: "",
            currentKeepUserGuid:"",
            showAddLoading: false,
        }
    },
    name: "Login",
    async mounted() {
    },
    components: {
        Input,
        Button_icon
    },
    computed: {
        ...mapGetters(['userLoginDetails']),
        eyes_display: function () {
            return (this.isPwd ? 'visibility_off' : 'visibility');
        },
        dbComponentBehavior() {
          return this.$store.getters['dbComponentBehavior/byLanguage']('erp')
        },
    },
    methods: {
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
        ...mapActions(['login/loginActions']),
        showNotify(type, message) {
            Notify.create({
                type: type,
                message: message,
                timeout: 1000,
                position: 'top',
            })
        },
        Login: async function () {

            this.showLoading();

            if (this.username == '') {
                this.showNotify("negative", "Please Enter your username.", true);
                this.hideLoading();
                return;
            } else if (this.password == '') {
                this.showNotify("negative", "Please Enter your password.", true);
                this.hideLoading();
                return;
            } else {
                var payload = {
                  name: this.username,
                  pwd: this.password
                };

                var data = {};

                await this.$store.dispatch('login/trigger_get_user', payload).then(() => {
                  data = JSON.parse(JSON.stringify(this.$store.getters['login/get_user']));
                });
                 var status = data.status
                console.log(data)
                if(status == 'success'){
                  var currency_sign = data.response.currency.sign
                  var currency_format = data.response.currency.format
                  var concat_name_fullname =   data.response.user.name  + ' ' +  data.response.user.FullName
                  var user_name =data.response.user.name

                  sessionStorage.setItem("currency_sign",currency_sign);
                  sessionStorage.setItem("currency_format",currency_format);
                  sessionStorage.setItem("concat_name_fullname",concat_name_fullname);
                  sessionStorage.setItem("EUser",user_name);
                  sessionStorage.setItem("getuser",user_name);
                  sessionStorage.setItem("retailer_guid","B42468DA247A11EE889A42010A940064");//hardcode retailer guid need to change

                  sessionStorage.setItem("username",this.username);//session due to outlet click want to use this to verify
                  sessionStorage.setItem("password",this.password);//session due to outlet click want to use this to verify

                  sessionStorage.setItem("outlet_list", JSON.stringify(data.response.outlet_guid));
                  sessionStorage.setItem("branch_list", JSON.stringify(data.response.branch));

                }else{
                  this.showNotify("negative","Username or password incorrect.");
                  this.hideLoading()
                  return;
                }
                  sessionStorage.setItem("authenticated",1);
                  sessionStorage.setItem("user_name",this.username);
                  sessionStorage.setItem("company_guid", '3A0C329C85414D268FC9E8859081DB87');
                  sessionStorage.setItem("language", 'EN');
                // this.$router.push("/erp/setup/companyprofile");

                var payload = {
                    "language": "EN"
                };

                var data;

                await this.$store.dispatch('login/trigger_get_language', payload).then(() => {
                  data = JSON.parse(JSON.stringify(this.$store.getters['login/get_language']));
                });

                if(data.status == "success")
                {
                    sessionStorage.setItem('set_language_data_ori',JSON.stringify(data.response));
                }

                //this need to check whether the language type keep at where. How to determine the language use is which one. If same with EN no need to fetch twice.
                var payload = {
                    "language": "ID"
                };

                var data;

                await this.$store.dispatch('login/trigger_get_language', payload).then(() => {
                  data = JSON.parse(JSON.stringify(this.$store.getters['login/get_language']));
                });

                if(data.status == "success")
                {
                    sessionStorage.setItem('set_language_data',JSON.stringify(data.response));
                }


                var payload = {
                    "language": "EN",
                    "retailer_guid": sessionStorage.getItem('retailer_guid'),
                    "module": "",
                };

                var data;
                var outlet_selection = false;

                await this.$store.dispatch('login/trigger_get_preference', payload).then(() => {
                  data = JSON.parse(JSON.stringify(this.$store.getters['login/get_preference']));
                });

                if(data.status == "success")
                {
                    sessionStorage.setItem('preference',JSON.stringify(data.response.detail));
                    console.log(data.response.detail);

                    var filter_outlet_selection = data.response.detail.filter((entry)=>{
                        return entry.module == 'outlet_selection';
                    });

                    outlet_selection = filter_outlet_selection.length > 0 ? (filter_outlet_selection[0].enable == 1 ? true : false) : false;
                }

                if(outlet_selection)
                {
                    // console.log('outlet selection true.');
                    this.$router.push("/erp/location/outletlocation");
                }
                else
                {

                    sessionStorage.setItem("session_ip",this.$global_config.url);
                    sessionStorage.setItem("outlet_code", '');

                    // console.log('outlet selection false.');
                    this.$router.push("/erp/purchase/purchaseorder");
                }

                this.hideLoading();
                return;

                // this.$router.push("/erp/purchase/purchaseorder");
                this.$router.push("/erp/location/outletlocation");
                this.hideLoading();
            } //close checking for password and username checking


        },
        passwordMethod: function () {
            this.isPwd = !this.isPwd;
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
              var user_guid = this.currentKeepUserGuid;

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
            //   payload = {
            //     "user_guid": user_guid,
            //     "current_password": this.currentPassword,
            //     "new_password": this.newPassword,
            //     "retype_new_password": this.retypeNewPassword,
            //   }

              await this.$store.dispatch('login/trigger_main_function_reset_password', payload).then(() => {
                var data = JSON.parse(JSON.stringify(this.$store.getters['login/get_main_function_reset_password']));

                var status = data.response.status;
                var error = data.response.message;

                if(status == "True")
                {
                    sessionStorage.clear();
                    location.reload();
                //   this.$store.dispatch('login/logout').then(() => {
                //       this.$router.push('/honda/login')
                //   });
                //   this.changePasswordDialog = false;
                    // this.username = "";
                    // this.password = "";
                  this.showNotify("positive","Reset Successfully.");
                }
                else{
                  this.showNotify("negative","Failed to Reset." + error);
                  this.showAddLoading = false;
                }

              });
            }
        }

    }
}
</script>

<style scoped>
*>>>.alert {
    padding-right: 15px;
}

*>>>.alert>.close {
    background-color: transparent;
    border: 0;
    float: right;
    top: 0;
    right: 0;
    z-index: 2;
    -webkit-appearance: button;
    color: inherit;
}

.remember_section {
    margin-bottom: 30px;
    margin-top: 20px;
}

.title {
    font-weight: 700;
    font-size: 25px;
    color: gray;
}

.content_child {
    color: gray;
}

.btn-darkblue {
    width: 100%;
}

*>>>.input-group-text {
    background-color: white;
    height: 34px;
    border-radius: 0px;
}

.logo_bar {
    padding-top: 30px;
    padding-bottom: 30px;
}

.bar {
    width: 100%;
    height: 20px;
    background: #273655;
    color: gray;
    padding: 1px 5px;
    box-shadow: 2px 4px 4px grey;
}

.right_line {
    border-right: 1px solid grey;
}

@media only screen and (max-width : 991px) {
    .right_line {
        border-right: 0px;
        border-bottom: 1px solid grey;
    }
}

.custom-password-eye {
    position: absolute;
    right: 3%;
    top: 7px;
    z-index: 5;
    cursor: pointer;
}

.help-block {
    color: red;
}

*>>>[type="checkbox"] {
    vertical-align: middle;
    height: 18px;
    width: 18px;
}

/*make input field no margin*/
.q-field {
    margin: 0px !important;
    margin-bottom: 10px !important;
}

/*login section*/
.login_section {
    padding: 10px;
    margin-bottom: 30px;
}

@media screen and (min-width: 1024px) {
  .announcement_section {
    min-height: 270px;
  }
}

@media screen and (max-width: 600px) {
  .announcement_section {
    height: 100px;
  }
}

/*announcement_section*/
.announcement_section {
    margin-top: 30px;
    position: relative;
    padding: 10px;
}

/*container*/
.content {
    margin-top: 10vh;
}

/*input field black border*/
@media only screen and (min-width: 599px) {
    *>>>.q-field__inner {
        border: 1px solid #d2d6de;
    }

    /*icon in field*/
    *>>>.q-field__prepend {
        border-right: 1px solid #d2d6de;
        padding-right: 12px;
    }

    /*icon*/
    *>>>.q-icon {
        color: black;
    }
}

@media only screen and (max-width: 599px) {
    *>>>.q-field__inner {
        border-bottom: 1px solid #d2d6de;
    }

}






/*append icon*/
*>>>.q-field__append>.q-icon {
    cursor: pointer;
}

/*button*/
*>>>.q-btn {
    background-color: #273655;
    color: white;
    border-radius: 0px;
}

/*make internal pic break up when md size above*/
@media only screen and (max-width: 1023px) {
    .content
    {
        margin-top:0px !important;
    }

    .announcement_section
    {
        margin-top:0px !important;
    }

    .login_section > center
    {
        margin-top:0px !important;
    }
}

/* change prepend icon of input field to smaller height*/
*>>> .q-field__prepend
{
    height: 32px;
}

.logo_style
{
    width:40%;
    height:90%;
}

.center_style
{
    padding: 30px 10px;
    padding-bottom:10px;
}

.card1_style
{
    min-width: 350px
}

/*make input field smaller*/
 * >>> .q-field__control {
    min-height: 32px !important;
    height: 32px !important;
}

* >>> .q-field__native {
    min-height: 32px !important;
    height: 32px !important;
}
</style>
