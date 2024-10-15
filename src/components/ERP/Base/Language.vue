<template>
<!-- <div class="q-pa-md"> -->
<q-btn-dropdown :unelevated="true" outline v-model="open_state" size="11px">
    <template v-slot:label>
        <div class="row items-center no-wrap">
            {{ session_language }}
        </div>
    </template>
    <div>
      <span v-for="opt in language_options" :key="opt">
        <div class="row" :style="$q.screen.width < 601 ? 'background-color: #ededed; border: solid 1px black;' : 'background-color: #2f3a4d; border: solid 1px white;'">
            <div class="col-12" style="text-align:center; cursor:pointer;" :style="$q.screen.width < 601 ? 'color: black' : 'color: white'" @click="changeLanguage(opt)">
              {{ opt }}
              <!-- <q-btn color="white" text-color="white" label="CH" style="background-color:#2f3a4d !important;font-size:12px;padding: 10px 5px 10px 5px;" /> -->
            </div>
        </div>
      </span>
    </div>

</q-btn-dropdown>
</template>

<script>
import {
    ref
} from 'vue'

import Button_icon from 'src/components/ERP/Base/Button_icon'
import { Notify } from "quasar";

import {
  Loading,
  // optional!, for example below
  // with custom spinner
  QSpinnerTail
} from 'quasar'

export default {
    data() {
        return {
            session_language: '',
            language_options: [],
            open_state: false,
        }
    },
    components: {
        // Button_icon
    },
    async created()
    {
      var session_language = sessionStorage.getItem("language") != "" && sessionStorage.getItem("language") != "null" && sessionStorage.getItem("language") != null ? sessionStorage.getItem("language") : '';
      this.session_language = session_language;
    //   this.changeLanguage(session_language)

        var language_options = this.$global_config.language;

        var language_options = this.$global_config.language.filter((entry)=>{
            return entry != this.session_language;
        });

        //   if (language_options.includes(newVal)) {
        //     language_options.splice(language_options.indexOf(newVal), 1);
        //   }

        //   console.log(this.language_options)

        this.language_options = language_options;
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
        async changeLanguage(newVal)
        {
            
            this.showLoading();

            var language_options = this.$global_config.language.filter((entry)=>{
                return entry != newVal;
            });

            this.language_options = language_options;

          this.session_language = newVal;
          this.open_state = false;

          sessionStorage.setItem("language",newVal);
            

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
            
          var payload = {
                "language": newVal
            };

            var data;

            await this.$store.dispatch('login/trigger_get_language', payload).then(() => {
                data = JSON.parse(JSON.stringify(this.$store.getters['login/get_language']));
            });

            if(data.status == "success")
            {
                sessionStorage.setItem('set_language_data',JSON.stringify(data.response));
            }

            location.reload();
            
            this.hideLoading();

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
    }
}
</script>

<style>
.q-menu {
    border-radius: 0px;
}
</style><style scoped>
*>>>.q-btn:not([class*="custom_cancel_button"]) {
    background-color: #2f3a4d !important;
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
