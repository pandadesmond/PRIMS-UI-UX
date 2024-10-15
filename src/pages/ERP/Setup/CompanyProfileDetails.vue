<template>

<!--breadcrumbs label-->
        <div class="row row_section" style="padding: 0px; margin-bottom: 10px; margin-left: 12px;">
            <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <div class="component_div">
                <Chip text="Setup" icon="tune"/> / <Chip text="Company Profile" icon="business"/>
                </div>
            </div>
        </div>

<!--Add dialog-->
<div class="row row_section">
     <q-form v-if="payload_new.locgroup_dc == undefined" ref="submit_form" style="width: 100%;">
    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <div class="component_div">
          <q-card>
            <q-card-section class="row bg-primary text-white">
           <Label
             text="Add HQ"
             class="text-subtitle1"
             style="background-color:transparent;" />
          <q-space/> 
            <!-- <q-btn 
                v-close-popup
                flat 
                round 
                dense
                icon="close" /> -->
        </q-card-section>   
        <q-card-section>
           <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div class="component_div">            
       <LabelSelectVertical
         :readonly="false"
         :no_label="true"
         :text="'DC Location Group'"
         v-model:pass_value="json_new.locgroup_dc"
         :dbComponentBehavior="dbComponentBehavior.select" />
            </div>
            </div>            
        </q-card-section> 
        <q-card-actions align="right">
        <div class="card_section col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
            <div class="component_div text-right">   
       <Button
          class="button_save"
          v-on:receiveChange="callUpdate()"
          :text="'SAVE'"
          :type="'button'" />
      </div>
      </div>
        <div class="card_section col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
            <div class="component_div text-right">   
            <Button
            class="button_save"
            @click="this.$router.go(-1)"
            :text="'BACK'"
            :type="'button'" />
      </div>
      </div>
        </q-card-actions>

         </q-card>

         </div>
        </div>
</q-form>     

    <q-form v-else ref="submit_form" style="width: 100%;">
<!--Edit dialog-->
    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <div class="component_div">
          <q-card>
            <q-card-section class="row bg-primary text-white">
           <Label
             text="Edit HQ"
             class="text-subtitle1"
             style="background-color:transparent;" />
          <q-space/> 
            <!-- <q-btn 
                v-close-popup
                flat 
                round 
                dense
                icon="close" /> -->
        </q-card-section>   
        <q-card-section>
           <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div class="component_div">            
       <LabelSelectVertical
         :readonly="false"
         :no_label="true"
         :text="'DC Location Group'"
         v-model:pass_value="json_new.locgroup_dc"
         :dbComponentBehavior="dbComponentBehavior.select" />
            </div>
            </div>            
        </q-card-section> 
        <q-card-actions align="right">
        <div class="card_section col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
            <div class="component_div text-right">   
       <Button
          class="button_save"
          v-on:receiveChange="callUpdate()"
          :text="'SAVE'"
          :type="'button'" />
      </div>
      </div>
        <div class="card_section col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
            <div class="component_div text-right">   
            <Button
            class="button_save"
            @click="this.$router.go(-1)"
            :text="'BACK'"
            :type="'button'" />
      </div>
      </div>
        </q-card-actions>

         </q-card>

         </div>
        </div>
    </q-form>   
    </div>                                         
</template>

<script>
// import Input from 'src/components/ERP/Base/Input';
import Label from 'src/components/ERP/Base/Label';
// import LabelInputVertical from'src/components/ERP/General/LabelInputVertical' ;
import LabelSelectVertical from'src/components/ERP/General/LabelSelectVertical' ;
// import LabelInputHorizontal from'src/components/ERP/General/LabelInputHorizontal' ;
// import LabelSelectHorizontal from'src/components/ERP/General/LabelSelectHorizontal' ;
// import LabelDatepickerVertical from'src/components/ERP/General/LabelDatepickerVertical' ;
// // import LabelDatepickerHorizontal from'src/components/ERP/General/LabelDatepickerHorizontal' ;
// import LabelCheckboxVertical from 'src/components/ERP/General/LabelCheckboxVertical.vue';
// // import LabelCheckboxHorizontal from 'src/components/ERP/General/LabelCheckboxHorizontal.vue';
// import Table from 'src/components/ERP/Base/Table';
// import TablePagination from 'src/components/ERP/Base/TablePagination';
// // import Select from 'src/components/ERP/Base/Select';
// import Checkbox from 'src/components/ERP/Base/Checkbox';
import Button from 'src/components/Base/Button';
import Chip from 'src/components/ERP/Base/Chip';

import {
    Notify
} from "quasar"

import {
  Loading,
  // optional!, for example below
  // with custom spinner
  QSpinnerTail
} from 'quasar'

export default{
    data(){
        return{
            multiselectvalue: [],
            showAddTask: false,
            showAction: false,
            json_new:{},
            payload_new: JSON.parse(this.$route.params.data),
            test_data: [],
            test_pagination: [],
            table_data_companyprofile: [],
             table_title:"HQ Location",
             table_data: [ ],
             table_column: [
                {
                    name: 'action',
                    required: true,
                    label: 'Actions',
                    align: 'left',
                    required: true,
                    sortable: false
                },
                {
                    name: 'location',
                    required: true,
                    label: 'Location',
                    align: 'left',
                    sortable: false
                }
            ],
            test_column: [
                {
                    name: 'action',
                    required: true,
                    label: 'Actions',
                    align: 'left',
                    required: true,
                    sortable: false
                },
                {
                    name: 'location',
                    required: true,
                    label: 'Location',
                    align: 'left',
                    sortable: false
                }
            ],

        }
    },

components:{
    LabelSelectVertical, 
    Label,
    Button,
    Chip,
},

computed: {
     dbComponentBehavior() {
       return this.$store.getters['dbComponentBehavior/byLanguage']('erp')
    },
},
    methods: {
        addButton: function(payload)
        {
            this.showAddTask = true
        },

        handleAction: function(payload){
            console.log(payload);
            // alert(payload.locgroup_dc);
            this.showAction = true
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
            "primary_key": this.json_new.companyname,
            "pass_json": this.json_new  
        };

        this.$store.dispatch('setup/trigger_edit_companyprofile', payload).then(() => {
            var data = JSON.parse(JSON.stringify(this.$store.getters['setup/get_companyprofile_status']));
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


    },

// table server side
handleTableChange: function(newVal)
        {

            var new_params = this.$pluginsTableParams(newVal)

            var payload = {
                params : new_params
            };
            
            this.$store.dispatch('setup/trigger_get_ml_company', payload).then(() => {
                var data = JSON.parse(JSON.stringify(this.$store.getters['setup/get_ml_company']));

                this.test_data = data;
            });
        }

},

created: function () {
        var payload = {};
        
        this.$store.dispatch('setup/trigger_companyprofile', payload).then(() => {

        var data = JSON.parse(JSON.stringify(this.$store.getters['setup/get_companyprofile']));

        this.json_new = data;

        var CompanyProfileTableData = JSON.parse(JSON.stringify(this.$store.getters['setup/get_companyprofile_table_data']));

        this.table_data_companyprofile= CompanyProfileTableData;

         });
    }
}


</script>
