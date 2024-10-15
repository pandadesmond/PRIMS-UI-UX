<template>
<!-- {{json_new}} -->
<!-- {{payload_new}} -->

 <div class="row row_section" style="padding: 0px; margin-bottom: 10px; margin-left: 12px;">
            <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">

                <Chip text="Setup" icon="tune"/> / <Chip text="Location" icon="business"/>

            </div>
        </div>
        
    <div class="row row_section">
    <div class="card_section col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
        <div class="component_div">
            <LabelInputHorizontal 
            :readonly="false" 
            :no_label="true" 
            :text="'Search'" 
            v-model:pass_value="json.code" 
            :dbComponentBehavior="dbComponentBehavior.text" style="background-color: transparent;"/>
        </div>
    </div>
</div>
      
<div class="row row_section">
    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <div class="component_div">
            <Table :row_per_page="[20,40,60,80,100,0]" 
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
        </div>
    </div>
</div>

<div class="row row_section">
    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <div class="component_div">
            <TablePagination 
            :hide_footer="false" 
            :row_per_page="[20,40,60,80,100]"
            v-on:head_button="addButton" 
            v-on:receiveRequestTable="handleTableChange" 
            v-on:main_action="handleAction" 
            :table_column="test_column" 
            :table_data="test_data" 
            :action_button="true"
            :edit_button="false"
            :view_button="false"
            :delete_button="true"
            :top_button="true"
            :button_no_outline="true"
            title="Location Group Serverside table"
            />
        </div>
    </div>
</div>

<div class="row row_section">
    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <div class="component_div">
            <Table :row_per_page="[20,40,60,80,100,0]" 
            :top_button="true" 
            v-on:head_button="addButton2" 
            v-on:main_action="handleAction2" 
            v-on:main_edit="handleEdit" 
            v-on:main_list="handleList" 
            v-on:main_delete="handleDelete" 
            :title="table_title2" 
            :table_data="table_data2" 
            :table_column="table_column2"
            :action_button="true"
            :edit_button="false"
            :view_button="false"
            :delete_button="true"
            />
        </div>
    </div>
</div>


<div class="row row_section">
    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <div class="component_div">
            <TablePagination 
            :hide_footer="false" 
            :row_per_page="[20,40,60,80,100]"
            v-on:head_button="addButton2" 
            v-on:receiveRequestTable="handleTable2Change" 
            v-on:main_action="handleAction2" 
            :table_column="test_column2" 
            :table_data="test_data2" 
            :action_button="true"
            :edit_button="false"
            :view_button="false"
            :delete_button="true"
            :top_button="true"
            :button_no_outline="true"
            title="Location Serverside table"
            />
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
            :text="'Code'"
            v-model:pass_value="json.code"
            :dbComponentBehavior="dbComponentBehavior.address1" />
         </div>
        </div>
                 
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div class="component_div">
            <LabelInputVertical :readonly="false"  :no_label="true" :text="'Description'" v-model:pass_value="json.description" 
        :dbComponentBehavior="dbComponentBehavior.address1"/>
         </div>
        </div>

          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div class="component_div">
          <LabelInputVertical :readonly="false"  :no_label="true" :text="'Remark'" v-model:pass_value="json.remark" 
        :dbComponentBehavior="dbComponentBehavior.address1"/>
         </div>
        </div>
       
        </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn  label="SAVE" color="primary" v-close-popup  />
          <q-btn  label="CLOSE" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

<q-dialog v-model="show_add2" persistent>
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
           <LabelInputVertical :readonly="false"  :no_label="true" :text="'Code'" v-model:pass_value="json.code" 
            :dbComponentBehavior="dbComponentBehavior.address1"/>
         </div>
        </div>
                 
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div class="component_div">
            <LabelInputVertical :readonly="false"  :no_label="true" :text="'Description'" v-model:pass_value="json.description" 
        :dbComponentBehavior="dbComponentBehavior.address1"/>
        
         </div>
        </div>

              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div class="component_div">
            <LabelCheckboxVertical :readonly="false"  
            :no_label="true" 
            :text="'Bad Stock'" 
            v-model:pass_value="payload_new2.badstock" 
            :true-value="1" :false-value="0"
            :dbComponentBehavior="dbComponentBehavior.address1"/>
            </div>
              </div>
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div class="component_div">
          <LabelInputVertical :readonly="false"  :no_label="true" :text="'Remark'" v-model:pass_value="json.remark" 
        :dbComponentBehavior="dbComponentBehavior.address1"/>
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
<!-- 
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
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <div class="component_div">
             <LabelInputVertical :readonly="true"  :no_label="true" :text="'Code'" v-model:pass_value="payload_new.code" 
            :dbComponentBehavior="dbComponentBehavior.address1"/>
         </div>
        </div>
                 
       

          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div class="component_div">
               <LabelInputVertical :readonly="false"  :no_label="true" :text="'Description'" v-model:pass_value="payload_new.code" 
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
          <Button class="button_save"  v-close-popup :text="'CLOSE'" :type="'button'" /> 
        </div> 
        </div>
        </div>
         </q-card-section>
      </q-form>
      </q-card>
     
    </q-dialog> -->


<q-dialog v-model="show_edit2" persistent>
    
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
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <div class="component_div">
               <LabelInputVertical :readonly="true"  :no_label="true" :text="'Code'" v-model:pass_value="payload_new2.code" 
            :dbComponentBehavior="dbComponentBehavior.address1"/>
         </div>
        </div>
                 
       

          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div class="component_div">
               <LabelInputVertical :readonly="false"  :no_label="true" :text="'Description'" v-model:pass_value="payload_new2.description" 
            :dbComponentBehavior="dbComponentBehavior.address1"/>
         </div>
        </div>

        
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div class="component_div">
            <LabelCheckboxVertical :readonly="false"  
            :no_label="true" 
            :text="'Bad Stock'" 
            v-model:pass_value="payload_new2.badstock" 
            :true-value="1" :false-value="0"
            :dbComponentBehavior="dbComponentBehavior.address1"/>
         </div>
        </div>


          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div class="component_div">
                 <LabelInputVertical :readonly="false"  :no_label="true" :text="'Remark'" v-model:pass_value="payload_new2.remark" 
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
         <!-- <Button class="button_save"   :text="'CLOSE'" :type="'button'" /> -->
          </div> 
                </div>
        <div class="card_section col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
        <div class="component_div"> 
          <Button class="button_save"  v-close-popup :text="'CLOSE'" :type="'button'" /> 
        </div> 
        </div>
        </div>
         </q-card-section>
      </q-form>
      </q-card>
    </q-dialog>
</template>

<script>
import LabelInputHorizontal from'src/components/ERP/General/LabelInputHorizontal' ;
import LabelInputVertical from 'src/components/ERP/General/LabelInputVertical';
import LabelCheckboxVertical from'src/components/ERP/General/LabelCheckboxVertical' ;
import TablePagination from 'src/components/ERP/Base/TablePagination';
import Table from 'src/components/ERP/Base/Table';
import Label from 'src/components/ERP/Base/Label';
import Chip from 'src/components/ERP/Base/Chip';
// import Input from 'src/components/ERP/Base/Input';
import Button from 'src/components/Base/Button';
// import Checkbox from 'src/components/ERP/Base/Checkbox';
//import Select from 'src/components/ERP/Base/Select';
//import {ref} from 'vue';
import {
    Notify
} from "quasar"

import {
  Loading,
  // optional!, for example below
  // with custom spinner
  QSpinnerTail
} from 'quasar'

export default {
   
    data() {
        return {
            table_title:"Location Group",
            table_title2:"Location",
            show_add:false,
            show_add2: false,
            show_edit:false,
            show_edit2:false,
            json_new :{},
            payload_new:{},
            payload_new2:{},
            json_locationgroup:{
                code:"",
                description: "",
                action: "",
                remark:""
                },
            json_location:{
                code:"",
                description: "",
                badstock:"",
                remark:""
                },
            multiselect_value: [],
            table_data:[],
            table_data2:[],
            badstock_options: [
                {
                    "value": 0,
                    "label": "Yes"
                },
                {
                    "value": 1,
                    "label": "No"
                }
            ],
            json:{
                "code":"",
                "description": "",
                "action": "",
                "remark":"",
            },


        table_column: [
        {
         name: 'action',
         required: true,
         label: 'Actions',
         align: 'left',
         sortable: false
        },
        {name:'code', label: 'Code', field: 'code', align:'left', required: true, sortable: true},
        {name: 'description', label: 'Description', field: 'description',  required: true,align:'left', sortable: true},
        {name: 'remark', required: true, label: 'Remark', field: 'remark',required: true,  align: 'left', sortable: true},       
       ],


        table_column2: [
             {
         name: 'action',
         required: true,
         label: 'Actions',
         align: 'left',
         sortable: false
        },
        {name:'code', label: 'Code', field: 'code', align:'left',  sortable: true},
        {name: 'description', label: 'Description', field: 'description',  align:'left', sortable: true},
        {name:'badstock', label:'Bad Stock', field:'badstock', align:'left', sortable: true},
        {name: 'remark', required: true, label: 'Remark', field: 'remark', align: 'left'},       
       ],
     test_column: [
                {
                    name: 'action',
                    required: true,
                    label: 'Actions',
                    align: 'left',
                    field: 'action',
                    format: val => `${val}`,
                    sortable: true
                }, 
                {
                    name: 'code',
                    required: true,
                    label: 'Code',
                    align: 'left',
                    field: 'code',
                    format: val => `${val}`,
                    sortable: true
                },            
                {
                    name: 'description',
                    required: true,
                    label: 'Description',
                    align: 'left',
                    field: 'description',
                    format: val => `${val}`,
                    sortable: true
                },            
                {
                    name: 'remark',
                    required: true,
                    label: 'Remark',
                    align: 'left',
                    field: 'remark',
                    format: val => `${val}`,
                    sortable: true
                },            
            ],
            test_data: [],
            test_pagination: [],
            test_data2: [],
            test_column2: [
                {
                    name: 'action',
                    required: true,
                    label: 'Actions',
                    align: 'left',
                    field: 'action',
                    format: val => `${val}`,
                    sortable: true
                }, 
                {
                    name: 'code',
                    required: true,
                    label: 'Code',
                    align: 'left',
                    field: 'code',
                    format: val => `${val}`,
                    sortable: true
                },            
                {
                    name: 'description',
                    required: true,
                    label: 'Description',
                    align: 'left',
                    field: 'description',
                    format: val => `${val}`,
                    sortable: true
                },   
                  {
                    name: 'badstock',
                    required: true,
                    label: 'Bad Stock',
                    align: 'left',
                    field: 'badstock',
                    format: val => `${val}`,
                    sortable: true
                },           
                {
                    name: 'remark',
                    required: true,
                    label: 'Remark',
                    align: 'left',
                    field: 'remark',
                    format: val => `${val}`,
                    sortable: true
                },            
            ]
        }
         
        
    },
    components: {
        LabelInputHorizontal,
       LabelCheckboxVertical,
        Table,
        Label,
       Button,
       LabelInputVertical,
       TablePagination,
       Chip
       
    },
    computed: {
        dbComponentBehavior() {
            return this.$store.getters['dbComponentBehavior/byLanguage']('erp')
        },
    },
    methods: {
        addButton: function(payload)
        {
           // this.show_add = true
           this.json_locationgroup.add_locationgroup = true
           this.json_locationgroup.edit_locationgroup = false
           this.$router.push({name:'Location/Details', params:{data: JSON.stringify(this.json_locationgroup) }})
            console.log(payload);
        },
         addButton2: function(payload)
        {
            this.json_location.add_location = true
            this.json_location.edit_location = false
            this.json_locationgroup.add_locationgroup =false
            this.$router.push({name:'Location/Details', params:{data: JSON.stringify(this.json_location) }})
              console.log(payload);
        },
        handleAction: function(payload)
        {
           this.payload_new = payload;
           this.payload_new.add_locationgroup = false
           this.payload_new.edit_locationgroup = true
           this.$router.push({name:'Location/Details', params:{data: JSON.stringify(this.payload_new) } })
          
           // this.show_edit=true

          //  console.log(payload);
           // alert(payload.code);
        },
         handleAction2: function(payload)
        {
           // this.show_edit2=true
            this.payload_new= payload;
            this.payload_new.add_location = false
            this.payload_new.edit_location = true
            this.$router.push({name:'Location/Details', params:{data: JSON.stringify(this.payload_new) }})
           // console.log(payload);
            //alert(payload.code);

           // alert(payload.code);
        },
          handleChange: function(newVal){
            var newVal = newVal == true ? 1 : 0;
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
            // this.payload_new = payload;
            // console.log(payload);
            // alert(payload.code);

        },
         handleSave2: function()
        {
            
            var payload2 = {
                "primary_key": this.payload_new2.code,
                "pass_json": this.payload_new2  
            };

            this.$store.dispatch('setup/trigger_edit_locationtable2_data', payload2).then(() => {
                var data2 = JSON.parse(JSON.stringify(this.$store.getters['setup/get_locationtable2_data_status']));
                var status2 = data2.status;
                var response = data2.response
                console.log(data2);
                if(status2 == 'success')
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
            
            this.$store.dispatch('setup/trigger_locationgroup_table_data_server_side', payload).then(() => {
                var data = JSON.parse(JSON.stringify(this.$store.getters['setup/get_locationgroup_table_data_server_side']));

                this.test_data = data;
            });
        },
         handleTable2Change: function(newVal)
        {

            var new_params = this.$pluginsTableParams(newVal)

            var payload = {
                params2 : new_params
            };
            
            this.$store.dispatch('setup/trigger_location_table_data_server_side', payload).then(() => {
                var data = JSON.parse(JSON.stringify(this.$store.getters['setup/get_location_table_data_server_side']));

                this.test_data2 = data;
            });
        }
    },
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
    right: 10px;
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
