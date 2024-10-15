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
        <div class="row" style="background-color:  #273655;;padding-top: 20px;padding-bottom:20px;padding-left:15px;padding-right:15px;">
            <div class="column items-center">
                <q-avatar size="72px">
                    <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                </q-avatar>
            </div>

            <div class="column" style="padding-left:10px;">
                <label style="font-size:15px;color:white;padding-top:10px;">{{user_name}}</label>
                <label style="font-size:15px;color:white;min-width:200px;">User ID : {{user_id}}</label>
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
        <div class="row" style="background-color:  #273655;">
            <div class="col-7">
                <!-- <q-btn v-if="admin == '1'" color="white" @click="handleUser()" text-color="white" label="Manage User" icon="manage_accounts" style="float:left;font-size:12px;padding: 10px 5px 10px 5px;"/>
                  <q-btn v-else color="white" @click="changePassword()" text-color="white" label="Change Password" icon="lock" style="float:left;font-size:12px;padding: 10px 5px 10px 5px;"/> -->
            </div>
            <!-- <hr style="background-color:white;margin:0px;"> -->
            <div class="col-5" style="text-align:center;">
                <q-btn color="white" text-color="white" label="Logout" icon="logout" @click="logout()" style="background-color: #273655 !important;font-size:12px;padding: 10px 5px 10px 5px;" />
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
        <q-input type="password" dense label="NEW PASSWORD" v-model="newPassword" :rules="[val => !!val || 'Field is required']"/>
    </q-card-section>

    <q-card-section class="q-pt-none">
        <q-input type="password" dense label="RE-TYPE NEW PASSWORD" v-model="retypeNewPassword"
        :rules="[val => !!val || 'Field is required', val => val != newPassword ? 'Password Not Match' : null ]" />
    </q-card-section>
</q-form>


        <!-- <q-input dense label="NEW PASSWORD" v-model="address" autofocus @keyup.enter="prompt = false" />
         <q-input dense label="RE-TYPE NEW PASSWORD" v-model="address" autofocus @keyup.enter="prompt = false" /> -->


    <q-card-actions align="right" class="text-white">
        <q-btn class="primary" flat label="Cancel" v-close-popup />
        <q-btn class="primary" flat label="SAVE" @click="handleSaveChangePassword()"/>
    </q-card-actions>
    </q-card>
</q-dialog>
<!-- </div> -->
</template>

<script>
// import Button from 'src/components/Base/Button.vue'
import {Notify} from "quasar";
import {
    ref
} from 'vue'
import {Loading, QSpinnerTail} from 'quasar';
export default {
    data() {
        return {
            user_id: sessionStorage.getItem('user_id'),
            // user_name: sessionStorage.getItem('user_name'),
            // admin: sessionStorage.getItem('admin'),
            // fullname: sessionStorage.getItem('fullname'),
            newPassword: "",
            retypeNewPassword: "",
            changePasswordDialog: false,
        }
    },
    computed: {
      dbComponentBehavior() {
          return this.$store.getters['dbComponentBehavior/byLanguage']('erp')
      },

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
                resolve(error);
            });

        },
        showNotify(type, message) {
        Notify.create({
            type: type,
            message: message,
            timeout: 1000,
            position: 'top',
        })
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
        logout() {
            this.$store.dispatch('login/logout').then(() => {
                this.$router.push('/stpl/login')
            });
        },
        changePassword()
        {
            this.changePasswordDialog = true;
        },
       async handleSaveChangePassword(){
           var validated = await this.validate_form('save_change_password_form');

              if(!validated)
            {
                this.showNotify("negative","Please make sure all field is correct.");
                this.showAddLoading = false;
                return;
            }
            else {

             var payload = {
                transtype: 'UPDATE',
                username: this.user_name,
                password: this.retypeNewPassword,
                user_id:  this.user_id,
                fullname: this.fullname,
                admin: this.admin,
                active: '1',
              }
              this.showLoading();
                await this.$store.dispatch('login/trigger_reset_password', payload).then(() => {
                var data = JSON.parse(JSON.stringify(this.$store.getters['login/get_reset_password_status']));
                var status = data.status;
                var error = data.response.message;

                console.log('error',error);
                if(status == 'success')
                {

                      this.$store.dispatch('login/logout').then(() => {
                        this.$router.push('/sapqoh/login')
                  });

                    this.showNotify('positive', 'Reset Successfully.')
                    this.hideLoading();

                }
                else
                {
                    this.showNotify('negative', 'Failed to Reset.'+ error)
                    this.hideLoading();

                }
            });

            }
        }
    },
  //   components: {

  // },
}
</script>

<style>
.q-menu {
    border-radius: 0px;
}

*>>>.q-btn {
    background-color:  #273655 !important;
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
</style>
