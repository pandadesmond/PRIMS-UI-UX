<template>
<!-- {{payload_new}} -->
   <div class="row row_section" style="padding: 0px; margin-bottom: 10px; margin-left: 12px;">
        <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <Chip text="Setup" icon="tune"/> / <Chip text="System User" icon="person"/>
            </div>
     </div>

     <div class="row row_section">
        <q-form v-if="payload_new.add_user" ref="submit_form" class="full-width">
             <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
         <q-card>
        <q-card-section class="row bg-primary text-white">
           <Label text="Add New Records" 
            class="text-subtitle1" 
            style="background-color:transparent;"/>
        <q-space/>
        
        <!-- <q-btn  
         icon="close" 
         flat round dense 
         color="white" v-close-popup /> -->
     </q-card-section>

        <q-card-section>
        <div class="row row_section">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <div class="component_div">
               <LabelInputVertical
                 :readonly="false"
                 :no_label="true"
                 :text="'Full Name'"
                 v-model:pass_value="payload_new.fullname"
                 :dbComponentBehavior="dbComponentBehavior.address1" />
         </div>
        </div>
                 

          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div class="component_div">
              <LabelInputVertical
                :readonly="false"
                :no_label="true"
                :text="'Username'"
                v-model:pass_value="payload_new.name"
                :dbComponentBehavior="dbComponentBehavior.address1" />
         </div>
        </div>

        

          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div class="component_div">
          <LabelInputVertical
            :readonly="false"
            :no_label="true"
            :text="'Password'"
            v-model:pass_value="payload_new.pwd"
            :dbComponentBehavior="dbComponentBehavior.address1" />
         </div>
        </div>
       


         <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div class="component_div">
           <LabelSelectVertical
             :readonly="false"
             :no_label="true"
             :text="'Sub Department Code'"
             v-model:pass_value="payload_new.subdeptcode"
             :dbComponentBehavior="dbComponentBehavior.select"
             :options="subDepartCode_options" />
           </div>
         </div>
        
    
           <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div class="component_div">
         <LabelSelectVertical
           :readonly="false"
           :no_label="true"
           :text="'Group Code'"
           v-model:pass_value="payload_new.groupcode"
           :dbComponentBehavior="dbComponentBehavior.select"
           :options="groupCode_options" />
         </div>
        </div>
        </div>        
        </q-card-section>

       <q-card-section>
               <div class="row justify-end" >
                <div class=" col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                <div class="component_div"> 
            <Button
                class="button_save"
                v-on:receiveChange="callUpdate()"
                :text="'SAVE'"
                :type="'button'" />
         <!-- <Button class="button_save"   :text="'CLOSE'" :type="'button'" /> -->
          </div> 
                </div>
        <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
        <div class="component_div"> 
         <Button
            class="button_save"
            v-on:click="$router.back()"
            :text="'BACK'"
            :type="'button'" />
        </div> 
        </div>
        </div>
         </q-card-section>
         </q-card>
         </div>
       </q-form>

        <q-form v-else ref="submit_form" class="full-width">
             <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
         <q-card>
        <q-card-section class="row bg-primary text-white">
           <Label text="Edit Records" 
            class="text-subtitle1" 
            style="background-color:transparent;"/>
        <q-space/>
        
        <!-- <q-btn  
         icon="close" 
         flat round dense 
         color="white" v-close-popup /> -->
     </q-card-section>

        <q-card-section>
        <div class="row row_section">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <div class="component_div">
               <LabelInputVertical
                 :readonly="false"
                 :no_label="true"
                 :text="'Full Name'"
                 v-model:pass_value="payload_new.fullname"
                 :dbComponentBehavior="dbComponentBehavior.address1" />
         </div>
        </div>
                 

          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div class="component_div">
              <LabelInputVertical
                :readonly="false"
                :no_label="true"
                :text="'Username'"
                v-model:pass_value="payload_new.name"
                :dbComponentBehavior="dbComponentBehavior.address1" />
         </div>
        </div>

        

          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div class="component_div">
          <LabelInputVertical
            :readonly="false"
            :no_label="true"
            :text="'Password'"
            v-model:pass_value="payload_new.pwd"
            :dbComponentBehavior="dbComponentBehavior.address1" />
         </div>
        </div>
       


         <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div class="component_div">
           <LabelSelectVertical
             :readonly="false"
             :no_label="true"
             :text="'Sub Department Code'"
             v-model:pass_value="payload_new.subdeptcode"
             :dbComponentBehavior="dbComponentBehavior.select"
             :options="subDepartCode_options" />
           </div>
         </div>
        
    
           <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div class="component_div">
         <LabelSelectVertical
           :readonly="false"
           :no_label="true"
           :text="'Group Code'"
           v-model:pass_value="payload_new.groupcode"
           :dbComponentBehavior="dbComponentBehavior.select"
           :options="groupCode_options" />
         </div>
        </div>
        </div>        
        </q-card-section>

       <q-card-section>
               <div class="row justify-end" >
                <div class=" col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                <div class="component_div"> 
            <Button
                class="button_save"
                v-on:receiveChange="callUpdate()"
                :text="'SAVE'"
                :type="'button'" />
         <!-- <Button class="button_save"   :text="'CLOSE'" :type="'button'" /> -->
          </div> 
                </div>
        <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
        <div class="component_div"> 
         <Button
            class="button_save"
            v-on:click="$router.back()"
            :text="'BACK'"
            :type="'button'" />
        </div> 
        </div>
        </div>
         </q-card-section>
         </q-card>
         </div>
       </q-form>
      </div>
</template>

<script>
import LabelInputVertical from'src/components/ERP/General/LabelInputVertical' ;
import LabelSelectVertical from 'src/components/ERP/General/LabelSelectVertical';
import Label from 'src/components/ERP/Base/Label';
import Chip from 'src/components/ERP/Base/Chip';
import Button from 'src/components/Base/Button';
import {Notify} from "quasar";
import {
  Loading,
  // optional!, for example below
  // with custom spinner
  QSpinnerTail
} from 'quasar';

import { ref } from 'vue';
export default{
     data() {
        return {
            table_title:"System User",
           // payload_new:{},
            payload_new: JSON.parse(this.$route.params.data),
            json:{
                "fullNamn":"",
                "userName":"",
                "password":"",
                "subDepartCode": 0,
                "groupCode": 0,
            },
         subDepartCode_options: [
                {
                    "value": 0,
                    "label": "100"
                }
            ],
        groupCode_options:[
            {
                "value":0,
                "label": "ACCCLERK"
            },
             {
                "value":1,
                "label": "SENIOR MIS"
            },
             {
                "value":2,
                "label": "SUPPORT"
            },
              {
                "value":3,
                "label": "MGR"
            },
             {
                "value":4,
                "label": "GR MT"
            },
             {
                "value":5,
                "label": "SUPER"
            },

             {
                "value":6,
                "label": "INACTIVE"
            }
        ],
        }
    },
    components: {
      Label,
      Button,
      LabelInputVertical,
      LabelSelectVertical,
      Chip
    },
   computed: {
        dbComponentBehavior() {
            return this.$store.getters['dbComponentBehavior/byLanguage']('erp')
        },
    },
    methods: {
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
        callUpdate: function()
        {
            //do form verification before submit the form
            this.$refs['submit_form'].validate().then(valid => {

                if (!valid) {
                    //got field thats not fullfill standard
                    this.showNotify('negative', 'Please make sure all field is filled in.')
                }
                else
                {
                    //show loading icon
                   
                    this.showLoading();
                    //already verified all the field than call save value
                    this.handleSave();
                }
            })
        },
        handleSave: function()
        {
            
            var payload = {
                "primary_key": this.payload_new.name,
                "pass_json": this.payload_new  
            };

            this.$store.dispatch('setup/trigger_edit_systemusertable_data', payload).then(() => {
                var data = JSON.parse(JSON.stringify(this.$store.getters['setup/get_systemuser_data_status']));
                var status = data.status;
                var response = data.response
                console.log(data);
                if(status == 'success')
                {
                    this.$router.go(-1)
                    this.showNotify('positive', 'Successfully Update.')
                    //hide loading
                    this.hideLoading();
                }
                else
                {
                    this.$router.go(-1)
                    this.showNotify('negative', 'Fail to update. Please contact administrator for futher actions.')
                    //hide loading
                    this.hideLoading();
                }
            });

        },
          handleTableChange: function(newVal)
        {

            var new_params = this.$pluginsTableParams(newVal)

            var payload = {
                params : new_params
            };
            
            this.$store.dispatch('setup/trigger_systemuser_table_data_server_side', payload).then(() => {
                var data = JSON.parse(JSON.stringify(this.$store.getters['setup/get_systemuser_table_data_server_side']));

                this.test_data = data;
               // console.log(this.test_data);
            });

        },
    },
    created: function () {
      var payload = {};
        
         this.$store.dispatch('setup/trigger_system_user', payload).then(() => {

                 var data = JSON.parse(JSON.stringify(this.$store.getters['setup/get_system_user_table_data']));

                 this.json_new = data;

                var SystemUserTableData = JSON.parse(JSON.stringify(this.$store.getters['setup/get_system_user_table_data']));

                this.table_data = SystemUserTableData;
                console.log(this.table_data)

         });

    }
}
</script>

<style scoped>
.card_section {
    padding: 0px 0px 0px 0px;
}

.row_section
{
    padding-left: 10px;
    padding-right: 10px;
}

.custom_label
{
    /* make vertical align*/
    display: flex;
    align-items: center;
    height: 100%;/*add in  for left 4 col line break over will follow div height*/
}
.table_wrapper{
    padding-left: 0px;   
}
</style>