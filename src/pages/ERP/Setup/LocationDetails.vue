<template>
 <!-- {{payload_new}} -->
   <div class="row row_section" style="padding: 0px; margin-bottom: 10px; margin-left: 12px;">
            <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">

                <Chip text="Setup" icon="tune"/> / <Chip text="Location" icon="location_city"/>

            </div>
        </div>
        
    <div class="row row_section">
         <q-form v-if="payload_new.add_locationgroup == true" ref="submit_form" class="full-width">
             <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <q-card>
        <q-card-section class="row bg-primary text-white">
           <Label text="Add Location Group New Records" 
            class="text-subtitle1" 
            style="background-color:transparent;"/>
        <!-- <q-space/>
        <q-btn  
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
            :text="'Code'"
            v-model:pass_value="payload_new.code"
            :dbComponentBehavior="dbComponentBehavior.address1" />
         </div>
        </div>
                 
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div class="component_div">
            <LabelInputVertical :readonly="false"  :no_label="true" :text="'Description'" v-model:pass_value="payload_new.description" 
        :dbComponentBehavior="dbComponentBehavior.address1"/>
         </div>
        </div>

          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div class="component_div">
          <LabelInputVertical :readonly="false"  :no_label="true" :text="'Remark'" v-model:pass_value="payload_new.remark" 
        :dbComponentBehavior="dbComponentBehavior.address1"/>
         </div>
        </div>
       
        </div>
        </q-card-section>

     <q-card-section>
               <div class="row row_section justify-end" >
                <div class="card_section col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                <div class="component_div"> 
          <Button class="button_save"  v-on:receiveChange="callUpdate()" :text="'SAVE'" :type="'button'" />
       
          </div> 
                </div>
        <div class="card_section col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
        <div class="component_div"> 
          <Button class="button_save" v-on:click="goBack()" :text="'BACK'" :type="'button'" /> 
        </div> 
        </div>
        </div>
         </q-card-section>
           </q-card>
           </div>
         </q-form>

         <q-form v-if="payload_new.edit_locationgroup == true" ref="submit_form" class="full-width">
        <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <q-card>
            
                <q-card-section class="row bg-primary text-white">
                <Label text="Edit Location Group Records" 
                    class="text-subtitle1" 
                    style="background-color:transparent;"/>
                <!-- <q-space/>
                <q-btn  
                icon="close" 
                flat round dense 
                color="white" v-close-popup /> -->
            </q-card-section>

                <q-card-section>
                <div class="row row_section">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <div class="component_div">
                    <LabelInputVertical :readonly="true"  :no_label="true" :text="'Code'" v-model:pass_value="payload_new.code" 
                    :dbComponentBehavior="dbComponentBehavior.address1"/>
                </div>
                </div>
                        
            

                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <div class="component_div">
                    <LabelInputVertical :readonly="false"  :no_label="true" :text="'Description'" v-model:pass_value="payload_new.description" 
                    :dbComponentBehavior="dbComponentBehavior.address1"/>
                </div>
                </div>

            

                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <div class="component_div">
                        <LabelInputVertical :readonly="false"  :no_label="true" :text="'Remark'" v-model:pass_value="payload_new.remark" 
                    :dbComponentBehavior="dbComponentBehavior.address1"/>
                </div>
                </div>
                </div>
                </q-card-section>

                <q-card-section>
                    <div class="row row_section justify-end" >
                        <div class="card_section col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                        <div class="component_div"> 
                <Button class="button_save" v-on:receiveChange="callUpdate()" :text="'SAVE'" :type="'button'" />
                </div> 
                        </div>
                <div class="card_section col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                <div class="component_div"> 
                <Button class="button_save"   v-on:click="goBack()" :text="'BACK'" :type="'button'" /> 
                </div> 
                </div>
                </div>
                </q-card-section>
        
            </q-card> 
            </div>
         </q-form>
    
         <q-form v-if="payload_new.add_location == true" ref="submit_form"   class="full-width">
               <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                   <q-card>
                        <q-card-section class="row bg-primary text-white">
           <Label text="Add Location New Records" 
            class="text-subtitle1" 
            style="background-color:transparent;"/>
        <!-- <q-space/>
        <q-btn  
         icon="close" 
         flat round dense 
         color="white" v-close-popup /> -->
     </q-card-section>

        <q-card-section>
        <div class="row row_section">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <div class="component_div">
               <LabelInputVertical :readonly="false"  :no_label="true" :text="'Code'" v-model:pass_value="payload_new.code" 
            :dbComponentBehavior="dbComponentBehavior.address1"/>
         </div>
        </div>
                 
       

          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div class="component_div">
               <LabelInputVertical :readonly="false"  :no_label="true" :text="'Description'" v-model:pass_value="payload_new.description" 
            :dbComponentBehavior="dbComponentBehavior.address1"/>
         </div>
        </div>

        
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div class="component_div">
            <LabelCheckboxVertical :readonly="false"  
            :no_label="true" 
            :text="'Bad Stock'" 
            v-model:pass_value="payload_new.badstock" 
            :true-value="1" :false-value="0"
            :dbComponentBehavior="dbComponentBehavior.address1"/>
         </div>
        </div>


          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div class="component_div">
                 <LabelInputVertical :readonly="false"  :no_label="true" :text="'Remark'" v-model:pass_value="payload_new.remark" 
            :dbComponentBehavior="dbComponentBehavior.address1"/>
         </div>
        </div>
        </div>
        </q-card-section>

         <q-card-section>
               <div class="row row_section justify-end" >
                <div class="card_section col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                <div class="component_div"> 
          <Button class="button_save" v-on:receiveChange="callUpdate2()" :text="'SAVE'" :type="'button'" />
           </div> 
           </div>
        <div class="card_section col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
        <div class="component_div"> 
          <Button class="button_save"   v-on:click="goBack()" :text="'BACK'" :type="'button'" /> 
           </div> 
          </div>
          </div>
          </q-card-section>
          </q-card>
          </div>
         </q-form>

         <q-form v-if="payload_new.edit_location == true" ref="submit_form"   class="full-width">
             <q-card-section class="row bg-primary text-white">
                <Label text="Edit Location Records" 
                    class="text-subtitle1" 
                    style="background-color:transparent;"/>
                <!-- <q-space/>
                <q-btn  
                icon="close" 
                flat round dense 
                color="white" v-close-popup /> -->
            </q-card-section>

               <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                   <q-card>
                  
        <q-card-section>
        <div class="row row_section">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <div class="component_div">
               <LabelInputVertical :readonly="true"  :no_label="true" :text="'Code'" v-model:pass_value="payload_new.code" 
            :dbComponentBehavior="dbComponentBehavior.address1"/>
         </div>
        </div>
                 
       

          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div class="component_div">
               <LabelInputVertical :readonly="false"  :no_label="true" :text="'Description'" v-model:pass_value="payload_new.description" 
            :dbComponentBehavior="dbComponentBehavior.address1"/>
         </div>
        </div>

        
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div class="component_div">
            <LabelCheckboxVertical :readonly="false"  
            :no_label="true" 
            :text="'Bad Stock'" 
            v-model:pass_value="payload_new.badstock" 
            :true-value="1" :false-value="0"
            :dbComponentBehavior="dbComponentBehavior.address1"/>
         </div>
        </div>


          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div class="component_div">
                 <LabelInputVertical :readonly="false"  :no_label="true" :text="'Remark'" v-model:pass_value="payload_new.remark" 
            :dbComponentBehavior="dbComponentBehavior.address1"/>
         </div>
        </div>
        </div>
        </q-card-section>

         <q-card-section>
               <div class="row row_section justify-end" >
                <div class="card_section col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                <div class="component_div"> 
          <Button class="button_save" v-on:receiveChange="callUpdate2()" :text="'SAVE'" :type="'button'" />
           </div> 
           </div>
        <div class="card_section col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
        <div class="component_div"> 
          <Button class="button_save"   v-on:click="goBack()" :text="'BACK'" :type="'button'" /> 
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
import LabelInputVertical from 'src/components/ERP/General/LabelInputVertical';
import LabelCheckboxVertical from 'src/components/ERP/General/LabelCheckboxVertical'
import Label from 'src/components/ERP/Base/Label';
import Button from 'src/components/Base/Button';
import {
    Notify
} from "quasar"

import {
  Loading,
  // optional!, for example below
  // with custom spinner
  QSpinnerTail
} from 'quasar'
import Chip from 'src/components/ERP/Base/Chip';
export default {
   
    data() {
        return {
            json_new :{},
            payload_new: JSON.parse(this.$route.params.data),
           // payload_new2: {},
            json:{
                "code":"",
                "description": "",
                "action": "",
                "remark":"",
            },
        }
    },
    components: {
       Label,
       Button,
       LabelInputVertical,
       LabelCheckboxVertical,
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
           callUpdate2: function()
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
                    this.handleSave2();
                }
            })
        },
        handleSave: function()
        {
            
            var payload = {
                "primary_key": this.payload_new.code,
                "pass_json": this.payload_new 
            };

            this.$store.dispatch('setup/trigger_edit_locationtable_data', payload).then(() => {
                var data = JSON.parse(JSON.stringify(this.$store.getters['setup/get_locationtable_data_status']));
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
                    this.showNotify('negative', 'Fail to update. Please contact administrator for futher actions.')
                    //hide loading
                    this.hideLoading();
                }
            });
        
          }
        ,
        handleSave2: function()
        {
            
            var payload2 = {
                "primary_key": this.payload_new.code,
                "pass_json": this.payload_new 
            };

            this.$store.dispatch('setup/trigger_edit_locationtable2_data', payload2).then(() => {
                var data2 = JSON.parse(JSON.stringify(this.$store.getters['setup/get_locationtable2_data_status']));
                var status2 = data2.status;
                var response = data2.response
                console.log(data2);
                if(status2 == 'success')
                {
                    this.$router.go(-1)
                    this.showNotify('positive', 'Successfully Update.')
                    //hide loading
                    this.hideLoading();
                }
                else
                {
                    this.showNotify('negative', 'Fail to update. Please contact administrator for futher actions.')
                    //hide loading
                    this.hideLoading();
                }
            });

        },
         goBack: function(){
            this.$router.go(-1)
        },
        // Editdata(){
        //     if (this.payload_new !== 'undefined' && !payload_new.badstock) {
        //        this.payload_new  =JSON.parse(this.$route.params.data);
                
        //       }
        //       else{
        //            this.payload_new2 ={}
        //          console.log('Add New Data')
        //       }
              
        // }
     
     },
    // mounted() {
    //     this.Editdata()
    // },
    created: function () {
        var payload = {};
         this.$store.dispatch('setup/trigger_locationgroup', payload).then(() => {
               var LocationTableData = JSON.parse(JSON.stringify(this.$store.getters['setup/get_location_table_data2']));

                this.table_data = LocationTableData;
             
         });

        this.$store.dispatch('setup/trigger_location', payload).then(() => {

                
                var LocationTableData2 = JSON.parse(JSON.stringify(this.$store.getters['setup/get_location_table_data']));

                this.table_data2 = LocationTableData2;

         });
    },
     
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
