<template>
  <div v-if="$q.screen.width > 599" class="login-container">
    <div class="row col-12 row-sty">
      <div class="col left-col-container">
        <div class="title-1">Announcement</div>
        <div class="subtitle" v-html="announcement_message"></div>
      </div>
      <div class="right-col-container">
        <div class="login-form">
          <div class="img-container">
            <img src="panda.png" class="logo_style" />
            <div class="title-2">Rebate Income <br/> Management System</div>
          </div>
          <div class="row" >
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 input container">
              <InputBase
                v-on:keyup.enter="Login"
                v-model="username"
                :componentBehavior="dbComponentBehavior.text"
                label="User ID or Email"
                class="input-width full-width centered-label-input"
              />
            </div>

            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 input container">
              <InputBase
                v-on:keyup.enter="Login"
                :type="isPwd ? 'password' : 'text'"
                v-model="password"
                name="new_password"
                :icon_append="eyes_display"
                v-on:password_method="passwordMethod()"
                :componentBehavior="dbComponentBehavior.text"
                label="Password"
                class="input-width full-width centered-label-input"
              />
            </div>

            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 input container">
              <q-btn @click="Login" class="login_font full-width" style="border-radius:6px"> Login </q-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="container" style="background-color: white; height: 100vh; overflow: auto;">
    <div class="content" style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh;">
        <div class="row">
          <div class="col-xs-12 col-sm-10 col-md-10 col-lg-10 col-xl-10 offset-sm-1 offset-md-1 offset-lg-1 offset-xl-1">
            <div class="row" style="gap:16px">
              <div class="col-xs-12 col-sm-8 col-md-2 col-lg-2 col-xl-2" style="gap:16px">
                <div class="row q-pb-md" :class="$q.screen.width < 600 ? 'justify-center' : ''">
                  <img src="panda.png" style="width: 30%; height: 80%;">
                </div>

                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" >
                  <div class="row col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" style="padding-bottom:16px;gap:6px;text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                    <b class="Main_title">PRIMS</b>
                    <div class="sub_title1 ">Announcement</div>
                    <div class="sub_title2" v-html="announcement_message"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row ">
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 input container">
                <InputBase v-on:keyup.enter="Login" v-model="username" :icon_prepend="'o_person'" 
                  :componentBehavior="dbComponentBehavior.text"
                  label="User ID or Email"
                  class="input-width full-width centered-label-input" />
              </div>

              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 input container">
                <InputBase v-on:keyup.enter="Login" :type="isPwd ? 'password' : 'text'" v-model="password" :icon_prepend="'o_lock'" :icon_append="eyes_display" v-on:password_method="passwordMethod()" 
                :componentBehavior="dbComponentBehavior.text"
                label="Password"
                name="new_password"
                class="input-width full-width centered-label-input"/>
              </div>

              <q-btn @click="Login" class="login_font full-width" style="border-radius:6px"> Login </q-btn>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import InputBase from 'src/components/PRIMS/Base/InputBase';
import { mapGetters, mapActions } from "vuex";
import { Notify } from "quasar";
import { ref } from "vue";

import {
  Loading,
  // optional!, for example below with custom spinner
  QSpinnerTail,
} from "quasar";

import public_key from "src/public_key.pem";

import JsEncrypt from "jsencrypt/bin/jsencrypt";

export default {
  data() {
    return {
      announcement_message: "",
      username: "",
      password: "",
      isPwd: ref(true),
      currentPassword: "",
      newPassword: "",
      retypeNewPassword: "",
      showAddLoading: false,
    };
  },
  name: "Login_New",
  async mounted() {
    var payload = {
      params: {
        "setting_key": 'announcement'
      }
    }

    var pass_obj = {
        "dispatch": 'general/trigger_get_setting',
        "getter": 'general/get_setting',
        "app": this,
        "payload": payload,
    }

    var announcement = await this.$dispatch(pass_obj);

    if(announcement.status)
    {
      if(announcement.response.data.results.length>0)
      {
        this.announcement_message = announcement.response.data.results[0].setting_value;
      }
    }
  },
  components: {
    InputBase,
  },
  computed: {
    eyes_display: function () {
      return this.isPwd ? "visibility_off" : "visibility";
    },
    dbComponentBehavior() {
      return this.$store.getters["dbComponentBehavior/byLanguage"]("tta");
    },
  },
  methods: {
    ...mapActions(["login/loginActions"]),
    showLoading() {
      // default options
      Loading.show();

      // fully customizable
      Loading.show({
        spinner: QSpinnerTail,
        // other props
      });
    },
    hideLoading() {
      setTimeout(function () {
        Loading.hide();
      }, 300);
    },
    showNotify(type, message) {
      Notify.create({
        type: type,
        message: message,
        timeout: 1000,
        position: "top",
      });
    },
    Login: async function () {
      this.showLoading();

      if (this.username == "") {
        this.showNotify("negative", "Please Enter your username.", true);
        this.hideLoading();
        return;
      } else if (this.password == "") {
        this.showNotify("negative", "Please Enter your password.", true);
        this.hideLoading();
        return;
      } else {
        var payload = {
          username: this.username,
          password: this.password,
        };

        var login_response = {};

        await this.$store.dispatch('login/trigger_login', payload).then(async () => {
          login_response = JSON.parse(JSON.stringify(this.$store.getters['login/get_user']));
        });

        if(login_response.status == "failed")
        {
          console.log(login_response.response);
          this.showNotify("negative","Fail to login. Please try again.");
          this.hideLoading();
          return;
        }

        if(!login_response.response.status)
        {
          console.log(login_response.response.message);
          this.showNotify("negative",login_response.response.message);
          this.hideLoading();
          return;
        }
        
        var user = login_response.response;
        // console.log(user);

        // get company info for preference
        var payload = {
            company_guid: user.company_guid,
        }

        var pass_obj = {
            "dispatch": 'general/trigger_get_company',
            "getter": 'general/get_company',
            "app": this,
            "payload": payload,
        }

        var company = await this.$dispatch(pass_obj);
        var preference = {};
        if(company.status)
        {
            preference.dateFormat = company.response.data.date_format_setting;
            preference.displayBanner = company.response.data.display_banner_setting == 1 ? true : false;;
            preference.default_date_to = company.response.data.date_to_setting;
            preference.banner_setting = company.response.data.banner_option_setting;
            preference.division_setting = company.response.data.division_setting == 1 ? true : false;
            preference.settlement_discount_setting = company.response.data.settlement_discount_setting == 1 ? true : false;
        }
        else
        {
            console.log("Company fail",company.response);
            this.showNotify("negative","Fail to login. Please try again.");
            this.hideLoading();
            return;
        }

        var user_retailer = [];

        if(user.retailer_list)
        {
          user_retailer = JSON.parse(JSON.stringify(user.retailer_list));
          user_retailer.sort((a,b)=>{
            if(a.code < b.code)
            {
              return -1;
            }
            if(a.code > b.code)
            {
              return 1;
            }
            return 0;
          })
        }
        
        var payload = {
          user_info_guid: user.user_info_guid,
        }

        var pass_obj = {
            "dispatch": 'user/trigger_get_user_info',
            "getter": 'user/get_user_info',
            "app": this,
            "payload": payload,
        };

        var data_response = await this.$dispatch(pass_obj);

        if(!data_response.status)
        {
          this.showNotify("negative",data_response.response.message);
          this.hideLoading();
          return;
        }

        var username = `${user.first_name} ${user.last_name}`;
        var designation = {};
        var permission_group = []; 
        
        const user_info = data_response.response.data;
        username = user_info.name;
        designation = user_info.user_designation;
        if(user_info.user_group.approved == 1)   permission_group.push("approved");
        if(user_info.user_group.authorised == 1)   permission_group.push("authorised");
        if(user_info.user_group.saved == 1)   permission_group.push("saved");
        if(user_info.user_group.renewed == 1)   permission_group.push("renewed");
        if(user_info.user_group.rejected == 1)   permission_group.push("rejected");
        if(user_info.user_group.terminated == 1)   permission_group.push("terminated");
        if(user_info.user_group.uploaded == 1)   permission_group.push("uploaded");
        if(user_info.user_group.setting == 1)   permission_group.push("setting");
                    

        localStorage.setItem("authenticated",1);
        localStorage.setItem("company_guid",user.company_guid);
        localStorage.setItem("permission",JSON.stringify(permission_group));
        localStorage.setItem("preference_setting",JSON.stringify(preference));
        localStorage.setItem("user_designation",JSON.stringify(designation));
        localStorage.setItem("user_retailer",JSON.stringify(user_retailer));
        localStorage.setItem("user_id",user.user_id);
        localStorage.setItem("username", user.username);
        localStorage.setItem("name", username);
        localStorage.setItem("email",user.email);
        localStorage.setItem("staff",user.is_staff);
        localStorage.setItem("user_info_guid",user.user_info_guid);
        this.$router.push({name:"tta"});
        this.hideLoading();
      }
    },
    passwordMethod: function () {
      this.isPwd = !this.isPwd;
    },
  },
};
</script>

<style scoped>
@media screen and (max-width: 599px) {
  .q-field__control {
    border-radius: 5px;
    /* padding: 4px !important; */
    padding-top: 0px !important;
    min-height: 35px !important;
    height: 35px !important;
  }
  
  * >>> .q-field__inner {
    /* border-bottom: 1px solid #d2d6de; */
    padding: 0px !important; /* Added to remove padding */
  }
  .content{
    padding: 0px 16px;
  }

  .sub_title1 {
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    font-family: InterfontBold;
    color: #203755;
  }
  .sub_title2 {
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    font-family: InterfontMedium;
    color: #203755;
  }
}

/*make input field no margin*/
@media only screen and (min-width: 600px) {
  .q-field {
    margin: 0px !important;
    margin-bottom: 10px !important;
    height: 100%;
    font-size: 16px !important;
  }
  
  /*icon in field*/
  * >>> .q-field__append {
    padding-top: 5px;
    padding-right: 5px;
  }

  /*icon*/
  * >>> .q-icon {
    color: black;
  }
}

.q-field--dense .q-field__label
{
  top: 20px !important;
}

/*append icon*/
* >>> .q-field__append > .q-icon {
  cursor: pointer;
}

/*button*/
* >>> .q-btn {
  background-color: #203755;
  color: white;
  border-radius: 0px;
  font-size: 12px;  /* Adjust font size */
  padding: 4px 8px; /* Adjust padding */
  height: 32px;     /* Adjust height */
  width: 32px;
}

/*make internal pic break up when md size above*/
@media only screen and (max-width: 1023px) {
  .content {
    margin-top: 0px !important;
  }

  .login_section > center {
    margin-top: 0px !important;
  }
}

/* change prepend icon of input field to smaller height*/
* >>> .q-field__prepend {
  height: 32px;
}

.logo_style {
  height: 130px;
  max-width: 130px;
  /* box-shadow: 0px 0px 11px 0px rgba(0, 0, 0, 0.4); */
}

/*make input field smaller*/
* >>> .q-field__control {
  min-height: 45px !important;
  height: 56px !important;
  align-items: center;
  /* border-radius: 8px; */
  /* border: 1px solid red; */

}
*>>>.centered-label-input.q-field--outlined .q-field__control {
  border-radius: 8px;
  /* border: 2px solid #E8E8E8; */
  padding: 0 12px;
}

* >>> .q-field__native {
  /* min-height: 50px !important; */
  font-size: 13px;
    font-style: normal;
    font-weight: 500;
    font-family: InterfontMedium;

}
* >>> .q-field__label {
  font-family: InterfontMedium;
  font-weight: 500;
  font-size: 16px;
  color: var(--Placeholder, #72777A);

}
/* used for the label filled */
/* .q-field--filled .q-field__label {
  padding-top: 16px;
} */

/* new login style*/
.login-container {
  height: 100vh;
  display: flex;

}

.row-sty {
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
}

.left-col-container {
  width: 65% !important;
  background: linear-gradient(
    180deg,
    rgba(87, 164, 206, 0.75) 0%,
    #051830 100%
  );
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  padding: 80px;
}

.right-col-container {
  width: 35% !important;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0px 40px;
}
.title-1{
  color: #FFF;
  font-family: InterfontBold;
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 8px;
}

.subtitle{
  color: #FFF;
  font-family: InterfontRegular;
  font-size: 16px;
  font-weight: 400;
}

.title-2{
  color: #757575;
  text-align: center;
  font-family: InterfontSemiBold;
  font-size: 26px;
  font-weight: 600;

}
.login-form{
  display: flex;
  justify-content: center;
  gap: 32px;
  width: 100%;
  flex-direction: column;
}
.img-container {
  gap: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

}
.input-container {
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.input-width{
  /* padding: 10px; */
  justify-content: center;
}
.custom-input {
  width: 344px;
}
.login_font {
  font-family: InterfontBold;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
}

*>>>.q-field__prefix {
    padding-right: 0px !important;
}
.q-field--labeled.q-field--dense >>>.q-field__native {
  padding-top: 17px;
  padding-bottom: 8px;
  line-height: 24px;
}
</style>
