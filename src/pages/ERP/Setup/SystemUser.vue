<template>
<div class="row row_section" style="padding: 0px; margin-bottom: 10px; margin-left: 12px;">
            <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">

                <Chip text="Setup" icon="tune"/> / <Chip text="System User" icon="person"/>

            </div>
        </div>
 <div class="row row_section">
    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <div class="component_div">
        <q-card>
                <q-card-section>
                <q-toolbar>
                <q-tabs
                    v-model="tab"
                    dense
                    class="text-black"
                    active-color="primary"
                    indicator-color="primary"
                    align="justify"
                    narrow-indicator
                >
                    <q-tab name="browse" label="Browse" />
                    <q-tab name="detail" label="Detail" />
                 </q-tabs>
                 </q-toolbar>
                 <q-separator/>
                 
             <q-tab-panels v-model="tab" :animated="false" >
             <q-tab-panel name="browse">
                 
<!--        <LabelInputHorizontal 
            :readonly="false" 
            :no_label="true" 
            :text="'Search'" 
            v-model:pass_value="json.dayForm" 
            :dbComponentBehavior="dbComponentBehavior.dayForm" style="background-color: transparent;"/> -->
  
          
                <Table :row_per_page="[5,40,60,80,100,0]" 
                :top_button="true" 
                v-on:head_button="addButton" 
                v-on:main_action="handleAction" 
                v-on:main_edit="handleEdit" 
                v-on:main_list="handleList" 
                v-on:main_delete="handleDelete" 
                :title="table_title" 
                :table_data="table_data" 
                :table_column="table_column"
                :action_button="true"
                :edit_button="false"
                :view_button="false"
                :delete_button="true"
            />
          
            <br>
            <br>
            <TablePagination 
            :hide_footer="false" 
            :row_per_page="[20,40,60,80,100]" 
            v-on:receiveRequestTable="handleTableChange"
            v-on:head_button="addButton"
            v-on:main_action="handleAction"   
            :table_column="test_column" 
            :table_data="test_data" 
            :action_button="true"
            :edit_button="false"
            :view_button="false"
            :delete_button="true"
            :top_button="true"
             :button_no_outline="true"
            title="System User Serverside table"
            />
   

          </q-tab-panel>
          <q-tab-panel name="detail">
        
          
          
          </q-tab-panel>
                
                </q-tab-panels>
                </q-card-section>
            </q-card>


</div>
</div>
 </div>

 <q-dialog v-model="show_add" persistent>
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section class="row bg-primary text-white">
           <Label text="Add New Records" 
            class="text-subtitle1" 
            style="background-color:transparent;"/>
        <q-space/>
        
        <q-btn  
         icon="close" 
         flat round dense 
         color="white" v-close-popup />
     </q-card-section>

        <q-card-section>
        <div class="row row_section">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <div class="component_div">
               <LabelInputVertical
                 :readonly="false"
                 :no_label="true"
                 :text="'Full Name'"
                 v-model:pass_value="json.fullName"
                 :dbComponentBehavior="dbComponentBehavior.address1" />
         </div>
        </div>
                 

          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div class="component_div">
              <LabelInputVertical
                :readonly="false"
                :no_label="true"
                :text="'Username'"
                v-model:pass_value="json.userName"
                :dbComponentBehavior="dbComponentBehavior.address1" />
         </div>
        </div>

        

          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div class="component_div">
          <LabelInputVertical
            :readonly="false"
            :no_label="true"
            :text="'Password'"
            v-model:pass_value="json.password"
            :dbComponentBehavior="dbComponentBehavior.address1" />
         </div>
        </div>
       


         <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div class="component_div">
           <LabelSelectVertical
             :readonly="false"
             :no_label="true"
             :text="'Sub Department Code'"
             v-model:pass_value="json.subDepartCode"
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
           v-model:pass_value="json.groupCode"
           :dbComponentBehavior="dbComponentBehavior.select"
           :options="groupCode_options" />
         </div>
        </div>
        </div>        
        </q-card-section>

        <q-card-actions align="right">
          <q-btn  label="SAVE" color="primary" v-close-popup />
          <q-btn  label="CLOSE" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>


  <q-dialog v-model="show_edit" persistent>
    
      <q-card style="width: 700px; max-width: 80vw;">
      <q-form ref="submit_form">
        <q-card-section class="row bg-primary text-white">
           <Label text="Edit Records" 
            class="text-subtitle1" 
            style="background-color:transparent;"/>
        <q-space/>
        <q-btn  
         icon="close" 
         flat round dense 
         color="white" v-close-popup />
     </q-card-section>

        <q-card-section>
               
        <div class="row row_section">
        <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <div class="component_div">
            <LabelInputVertical
              :readonly="false"
              :no_label="true"
              :text="'Full Name'"
              v-model:pass_value="payload_new.fullname"
              :dbComponentBehavior="dbComponentBehavior.address1" />
         
         </div>
        </div>
                 

          <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
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
          v-model:pass_value="json.subDepartCode"
          :dbComponentBehavior="dbComponentBehavior.select"
          :options="subDepartCode_options" />
      
           </div>
         </div>
        
    
           <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div class="component_div">
        <LabelSelectVertical
          :readonly="false"
          :no_label="true"
          :text="'Sub Department Code'"
          v-model:pass_value="json.groupCode"
          :dbComponentBehavior="dbComponentBehavior.select"
          :options="groupCode_options" />
       
         </div>
        </div>


          <!-- <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div class="component_div">
               <LabelInputVertical :readonly="false"  :no_label="true" :text="'System User Guid'" v-model:pass_value="payload_new.sysuser_guid" 
            :dbComponentBehavior="dbComponentBehavior.address1"/>
        
         </div>
        </div>


          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div class="component_div">
               <LabelInputVertical :readonly="false"  :no_label="true" :text="'Password Expiry Date User Guid'" v-model:pass_value="payload_new.pwd_expirydate" 
            :dbComponentBehavior="dbComponentBehavior.address1"/>
       
         </div>
        </div>
       

          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div class="component_div">
             <LabelInputVertical :readonly="false"  :no_label="true" :text="'Query Dept'" v-model:pass_value="payload_new.querydept" 
            :dbComponentBehavior="dbComponentBehavior.address1"/>
        
         </div>
        </div> -->

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
            v-close-popup
            :text="'CLOSE'"
            :type="'button'" />
        </div> 
        </div>
        </div>
         </q-card-section>
        </q-form>
      </q-card> 
    </q-dialog>
</template>

<script>
import LabelInputVertical from'src/components/ERP/General/LabelInputVertical' ;
import LabelSelectVertical from 'src/components/ERP/General/LabelSelectVertical';
import Table from 'src/components/ERP/Base/Table';
import Label from 'src/components/ERP/Base/Label';
import TablePagination from 'src/components/ERP/Base/TablePagination';
import Chip from 'src/components/ERP/Base/Chip';
// import Input from 'src/components/ERP/Base/Input';
// import Select from 'src/components/ERP/Base/Select';
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
            show_add:false,
            show_edit:false,
            json_add:{},
            table_data:[],
            payload_new:{},
            json:{
                "fullName":"",
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
        
        table_column: [
        {
         name: 'action',
         required: true,
         label: 'Actions',
         align: 'left',
         sortable: false
        },
        {name:'fullname', label: 'Full Name', field: 'fullname', align:'left',  sortable: true},
        {name: 'name', label: 'User Name', field: 'name',  align:'left', sortable: true},
        {name: 'pwd', required: true, label: 'Password', field: 'pwd', align: 'left', sortable: true}, 
        {name: 'subdeptcode', required: true, label: 'Sub Department Code', field: 'subdeptcode', align: 'right', sortable: true},       
        {name: 'groupcode', required: true, label: 'Group Code', field: 'groupcode', align: 'left', sortable: true}, 
       ],
        test_data:[],
        test_column: [
                {
                    name: 'action',
                    required: true,
                    label: 'action',
                    align: 'left',
                    field: 'action',
                    format: val => `${val}`,
                    sortable: true
                }, 
                {
                    name: 'fullname',
                    required: true,
                    label: 'Full Name',
                    align: 'left',
                    field: 'fullname',
                    format: val => `${val}`,
                    sortable: true
                },            
                {
                    name: 'name',
                    required: true,
                    label: 'Name',
                    align: 'left',
                    field: 'name',
                    format: val => `${val}`,
                    sortable: true
                },            
                {
                    name: 'pwd',
                    required: true,
                    label: 'Password',
                    align: 'left',
                    field: 'pwd',
                    format: val => `${val}`,
                    sortable: true
                },
                 {
                    name: 'subdeptcode',
                    required: true,
                    label: 'Sub Department Code',
                    align: 'right',
                    field: 'subdeptcode',
                    format: val => `${val}`,
                    sortable: true
                },            
                {
                    name: 'groupcode',
                    required: true,
                    label: 'Group Code',
                    align: 'left',
                    field: 'groupcode',
                    format: val => `${val}`,
                    sortable: true
                },                       
            ],
         
        }
    },
    components: {
       // LabelInputHorizontal,
       // LabelCheckboxHorizontal,
        Table,
        Label,
    //    Input,
    //   Select,
      Button,
      LabelInputVertical,
      LabelSelectVertical,
      TablePagination,
      Chip
    },
setup () {
    return {
      tab: ref('browse')
    }
  },
   computed: {
        dbComponentBehavior() {
            return this.$store.getters['dbComponentBehavior/byLanguage']('erp')
        },
    },
    methods: {
      addButton: function(payload)
        {
              this.json_add.add_user = true
              this.json_add.edit_user =false
              this.$router.push({name:'SystemUser/Details', params:{data: JSON.stringify(this.json_add) }})
            console.log(payload);
        },
         handleAction: function(payload)
        {
          //  this.show_edit=true
            this.payload_new = payload;
            this.$router.push({name:'SystemUser/Details', params:{data: JSON.stringify(this.payload_new) }})
            console.log(payload);
           // alert(payload.code);
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
    right: 10px;
}
/* .q-tab-panel{
    padding: 0px 0px 10px 0px;
/* } */
.table_wrapper{
    padding-top: 2px;  
    padding-left: 2px;
    padding-bottom: 2px;
    padding-right: 2px;
    
} 
* >>> .q-tab__content
{
    color: white !important;
}

* >>> .q-tab--active
{
    color: white !important;
}

* >>> .q-tab__indicator
{
    color: white !important;
}
</style>