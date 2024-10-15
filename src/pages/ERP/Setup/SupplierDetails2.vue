<template>
<!-- {{payload_new_5}} -->
<!--breadcrumbs label-->
        <div class="row row_section" style="padding: 0px; margin-bottom: 10px; margin-left: 12px;">
            <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <div class="component_div">
                <Chip text="Setup" icon="tune"/> / <Chip text="Supplier" icon="business"/>
                </div>
            </div>
       </div>

<!--Search dialog-->
<div class="row row_section">
    <q-form v-if="payload_new_3.searchbutton == true && payload_new_3.actionbutton == false" ref="submit_form" style="width: 100%;">
        <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <div class="component_div">
             <q-card>
            <q-card-section class="row bg-primary text-white">
           <Label text="Account Code Pick" class="text-subtitle1" style="background-color:transparent;"/>
          <q-space/> 
<!--       
            <q-btn
                v-close-popup
                flat 
                round 
                dense
                icon="close" /> -->
             
        </q-card-section>
        <q-card-section>
            <TablePagination 
                :row_per_page="[20,40,60,80,100,0]" 
                v-on:main_list="handleList" 
                v-on:main_delete="handleDelete" 
                v-on:receiveRequestTable="handleTableChange" 
                :title="table_title_2" 
                :table_data="test_data" 
                :table_column="test_column_2"
                :action_button="true"
                :edit_button="true"
                :view_button="true"
                :delete_button="true"
                :button_no_outline="true"
                />
        </q-card-section>   
        <q-card-actions align="right">

                <!-- <div class="card_section col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                    <div class="component_div"> 
                        <Button
                           class="button_save"
                           v-close-popup
                           :text="'ADD'"
                           :type="'button'" />
                    </div>
                </div>
            -->
  
          <div class="card_section col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
            <div class="component_div text-right">   
            <Button
            class="button_save"
            @click="goBack"
            :text="'BACK'"
            :type="'button'" />
            <!-- to="/Supplier/view/details" -->
      </div>
      </div>
 
        </q-card-actions>     
             </q-card>
         </div>
         </div>
    </q-form>

     

<!--Addbutton dialog-->
<!--no pass value occur, can type data without return to edit-->
    <q-form v-if="payload_new_3.searchbutton == false && payload_new_3.actionbutton == false" ref="submit_form" style="width: 100%;">
        <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <div class="component_div">
        <q-card >
        <q-card-section class="row bg-primary text-white">
        <Label text="Add New Record" class="text-subtitle1" style="background-color:transparent;"/>
        <q-space/> 
        <!-- <q-btn 
        v-close-popup
        flat 
        round 
        dense
        icon="close" /> -->
        </q-card-section>
        <q-card-section >
            <!--Branch-->
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <div class="component_div"> 
                <LabelInputVertical 
                style="margin-left: 0px; max-height: 1px; display:inline;" 
                :readonly="false" 
                :no_label="true" 
                :text="'Branch'" 
                v-model="payload_new_3.code"
                :dbComponentBehavior="dbComponentBehavior.text"
                />
                </div>
                </div>

            <!--Purchase Limit-->
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <div class="component_div"> 
                <LabelInputVertical
                style="margin-left: 0px; max-height: 1px; display:inline;" 
                :readonly="false" 
                :no_label="true" 
                :text="'Purchase Limit($)'" 
                v-model="payload_new_3.creditlimit" 
                :dbComponentBehavior="dbComponentBehavior.text"
                />
                </div>
                </div>
        </q-card-section>

        <q-card-section>
            <Label
            text="Information"
            class="text-subtitle1"
            style="background-color:transparent; margin-top: -5px;" />
    

           <!--Address 1-->

            <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div class="component_div">
            <LabelInputVertical
            :readonly="false"
            :no_label="true"
            :text="'Address'"
            v-model="payload_new_3.dadd1"
            :dbComponentBehavior="dbComponentBehavior.text"
            style="margin-left: 0px;" />
            </div>
            </div>

            <!--Address 2-->
            <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div class="component_div">
            <Input 
            style="margin-left: 0px;"
            :readonly="false" 
            :no_label="true"
            :text="'Address'" 
            v-model="payload_new_3.dadd2" 
            :dbComponentBehavior="dbComponentBehavior.text"/>
            </div>
            </div>

            <!--Address 3-->
            <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div class="component_div">
            <Input 
            style="margin-left: 0px;"
            :readonly="false" 
            :no_label="true" 
            :text="'Address'" 
            v-model="payload_new_3.dadd3" 
            :dbComponentBehavior="dbComponentBehavior.text"/>
            </div>
            </div>

            <!--Address 4-->
            <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div class="component_div">
            <Input 
            style="margin-left: 0px;"
            :readonly="false" 
            :no_label="true"
            :text="'Address'" 
            v-model="payload_new_3.dadd4" 
            :dbComponentBehavior="dbComponentBehavior.text"/>
            </div>
            </div>

            <!--Tel-->
            <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div class="component_div">
            <LabelInputVertical
            :readonly="false"
            :no_label="true"
            :text="'Tel'"
            v-model="payload_new_3.dtel"
            :dbComponentBehavior="dbComponentBehavior.text"
            style="margin-left: 0px;" /> 
            </div>
            </div>

            <!--Fax-->
            <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div class="component_div">
            <LabelInputVertical
            :readonly="false"
            :no_label="true"
            :text="'Fax'"
            v-model="payload_new_3.dfax"
            :dbComponentBehavior="dbComponentBehavior.text"
            style="margin-left: 0px;" /> 
            </div>
            </div>
        </q-card-section>
        <!--dialog bottom button-->
        <q-card-actions align="right">
            <div class="card_section col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
            <div class="component_div"> 
            <Button
            class="button_save"
            v-on:receiveChange="callUpdate()"
            :text="'ADD'"
            :type="'button'" />
            </div>
            </div>
            <div class="card_section col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
            <div class="component_div text-right"> 
            <Button
            class="button_save"
            @click="goBack"
            :text="'BACK'"
            :type="'button'" />
            </div>
            </div>
        </q-card-actions>
              
        </q-card>
        </div>
        </div>
            
    </q-form>

<q-form v-if="payload_new_3.actionbutton == true" ref="submit_form" style="width: 100%;">
       
    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <div class="component_div">
         <q-card >
            <q-card-section class="row bg-primary text-white">
           <Label text="Edit Record" class="text-subtitle1" style="background-color:transparent;"/>
          <q-space/> 
            <!-- <q-btn 
                v-close-popup
                flat 
                round 
                dense
                icon="close" /> -->
        </q-card-section> 
        <q-card-section class="q-pt-none">
            <!--Branch-->
           <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div class="component_div">             
                <LabelSelectVertical 
                    style="margin-left: 0px; max-height: 1px; display:inline;" 
                    :readonly="false" 
                    :no_label="true" 
                    :text="'Branch'" 
                    v-model:pass_value="payload_new_3.code"
                    :dbComponentBehavior="dbComponentBehavior.select"
                    :options="json_new"
                    option-label="code"/>                    
            </div>
            </div>
            <!--Purchase Limit-->
           <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <div class="component_div">     
                     <LabelInputVertical
                        style="margin-left: 0px; max-height: 1px; display:inline;" 
                        :readonly="false" 
                        :no_label="true" 
                        :text="'Purchase Limit($)'" 
                        v-model:pass_value="payload_new_3.creditlimit" 
                        :dbComponentBehavior="dbComponentBehavior.text"
/>

            </div>
            </div>

    <!--save button(bottom-right)-->
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

    <!--close button(bottom-right)-->
        <div class="card_section col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
            <div class="component_div text-right">   
            <Button
            class="button_save"
            @click="goBack"
            :text="'BACK'"
            :type="'button'" />
      </div>
      </div> 
      </q-card-actions>    
        </q-card-section>
        </q-card>
        </div>
        </div>
</q-form>
</div> 

</template>
<!--save button(bottom-right)-->
<!-- <div class="row row_section justify-end">
<div class="card_section col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
<div class="component_div text-right"> 
<Button
class="button_save"
v-on:receiveChange="callUpdate()"
:text="'SAVE'"
:type="'button'" />
</div>
</div>
</div>  -->


<!--Action dialog(edit data)-->       

<script>
// import Table from 'src/components/ERP/Base/Table';
import TablePagination from 'src/components/ERP/Base/TablePagination';
import Label from 'src/components/ERP/Base/Label';
import Input from 'src/components/ERP/Base/Input';
import LabelInputVertical from'src/components/ERP/General/LabelInputVertical' ;
import LabelSelectVertical from'src/components/ERP/General/LabelSelectVertical' ;
// import LabelInputHorizontal from'src/components/ERP/General/LabelInputHorizontal' ;
// import Select from 'src/components/ERP/Base/Select';
// import LabelCheckboxHorizontal from 'src/components/ERP/General/LabelCheckboxHorizontal.vue';
// import Checkbox from 'src/components/ERP/Base/Checkbox';
// import LabelCheckboxVertical from 'src/components/ERP/General/LabelCheckboxVertical.vue';
// import LabelDatepickerVertical from'src/components/ERP/General/LabelDatepickerVertical' ;
// import LabelTextAreaVertical from'src/components/ERP/General/LabelTextAreaVertical' ;
import { ref } from 'vue'
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


export default {
    // beforeRouteEnter(to, from, next) {
    //     next(vm => {
    //         vm.prevRoute = from;
    //     });
    // },
    data() {
        return {
            multiselect_value: [],
            json_new: {},
            payload_new_3: JSON.parse(this.$route.params.data),
            table_data_supplier_browser: [],
            table_data_supplier: [],
            test_data: [],
            test_pagination: [],
            showAddTask: false,
            showAction: false,
            showSearchTask: false,
            // showListTask: false,
            json:{   

                },

            table_title:"Browse",
            table_data: [],
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
                   name: 'code', 
                   label: 'Code', 
                   field: 'code',
                   align: 'right',
                   required: true,  
                   sortable: true
                },
               { 
                   name: 'name', 
                   label: 'Name', 
                   field: 'name',
                   align: 'left',
                   required: true,  
                   sortable: true
                },
               { 
                   name: 'reg_no', 
                   label: 'Reg No', 
                   field: 'reg_no',
                   align: 'right', 
                   sortable: true
                },
               { 
                   name: 'gst_no', 
                   label: 'GST No', 
                   field: 'gst_no',
                   align: 'right',
                   required: true, 
                   sortable: true
                },
               { 
                   name: 'tax_code', 
                   label: 'Tax Code', 
                   field: 'tax_code',
                   align: 'left', 
                   sortable: true
                },
               { 
                   name: 'term', 
                   label: 'Term', 
                   field: 'term',
                   align: 'left',
                   required: true, 
                   sortable: true
                },
               { 
                   name: 'contact', 
                   label: 'Contact', 
                   field: 'contact',
                   align: 'right',
                   required: true, 
                   sortable: true
                },
                { 
                   name: 'mobile', 
                   label: 'Mobile', 
                   field: 'mobile',
                   align: 'right', 
                   required: true,
                   sortable: true
                },
                { 
                   name: 'tel', 
                   label: 'Tel', 
                   field: 'tel',
                   align: 'right',
                   required: true, 
                   sortable: true
                },
                { 
                   name: 'fax', 
                   label: 'Fax', 
                   field: 'fax',
                   align: 'right',
                   required: true, 
                   sortable: true
                },
                { 
                   name: 'acc_no', 
                   label: 'Account No', 
                   field: 'acc_no',
                   align: 'right', 
                   required: true,
                   sortable: true
                }
            ],
// table server
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
                   name: 'code', 
                   label: 'Code', 
                   field: 'code',
                   align: 'left',
                   required: true,  
                   sortable: true
                },
               { 
                   name: 'name', 
                   label: 'Name', 
                   field: 'name',
                   align: 'left',
                   required: true,  
                   sortable: true
                },
               { 
                   name: 'reg_no', 
                   label: 'Reg No', 
                   field: 'reg_no',
                   align: 'right', 
                   sortable: true
                },
               { 
                   name: 'gst_no', 
                   label: 'GST No', 
                   field: 'gst_no',
                   align: 'right',
                   required: true, 
                   sortable: true
                },
               { 
                   name: 'tax_code', 
                   label: 'Tax Code', 
                   field: 'tax_code',
                   align: 'left', 
                   sortable: true
                },
               { 
                   name: 'term', 
                   label: 'Term', 
                   field: 'term',
                   align: 'left',
                   required: true, 
                   sortable: true
                },
               { 
                   name: 'contact', 
                   label: 'Contact', 
                   field: 'contact',
                   align: 'right',
                   required: true, 
                   sortable: true
                },
                { 
                   name: 'mobile', 
                   label: 'Mobile', 
                   field: 'mobile',
                   align: 'right', 
                   required: true,
                   sortable: true
                },
                { 
                   name: 'tel', 
                   label: 'Tel', 
                   field: 'tel',
                   align: 'right',
                   required: true, 
                   sortable: true
                },
                { 
                   name: 'fax', 
                   label: 'Fax', 
                   field: 'fax',
                   align: 'right',
                   required: true, 
                   sortable: true
                },
                { 
                   name: 'acc_no', 
                   label: 'Account No', 
                   field: 'acc_no',
                   align: 'right', 
                   required: true,
                   sortable: true
                }
            ],

            table_title_1:"",
            table_data_1: [ ],
            table_column_1: [
                {
                    name: 'action',
                    required: true,
                    label: 'Actions',
                    align: 'left',
                    sortable: false
                },

               { 
                   name: 'code', 
                   label: 'Branch',
                   field: 'code', 
                   align: 'left', 
                   required: true, 
                   sortable: true
                },

               { 
                   name: 'creditlimit', 
                   label: 'Purchase Limit($)', 
                   field: 'creditlimit',
                   align: 'right',
                   required: true, 
                   sortable: true
                },

            ],

            test_column_1: [
                {
                    name: 'action',
                    required: true,
                    label: 'Actions',
                    align: 'left',
                    sortable: false
                },

               { 
                   name: 'code', 
                   label: 'Branch',
                   field: 'code', 
                   align: 'left', 
                   required: true, 
                   sortable: true
                },

               { 
                   name: 'creditlimit', 
                   label: 'Purchase Limit($)', 
                   field: 'creditlimit',
                   align: 'right',
                   required: true, 
                   sortable: true
                },

            ],

            table_title_2:"",
            table_data_2: [],
            table_column_2: [
                {
                    name: 'action',
                    required: true,
                    label: 'Actions',
                    align: 'left',
                    sortable: false
                },
               { 
                    name: 'acc_no', 
                    label: 'Account Code', 
                    field: 'acc_no', 
                    align: 'right',
                    sortable: true 
                },
               { 
                   name: 'name', 
                   label: 'Name', 
                   field: 'name',
                   align: 'left',  
                   sortable: true
                }
            ],
// table server
            test_column_2: [
                {
                    name: 'action',
                    required: true,
                    label: 'Actions',
                    align: 'left',
                    sortable: false
                },
               { 
                    name: 'acc_no', 
                    label: 'Account Code', 
                    field: 'acc_no', 
                    align: 'right',
                    sortable: true 
                },
               { 
                   name: 'name', 
                   label: 'Name', 
                   field: 'name',
                   align: 'left',  
                   sortable: true
                }
            ],


    }
    
},

setup () {
    return {
        tab: ref('browse')
    }
},
        
    components: {
    // LabelInputHorizontal,
    LabelInputVertical,
    // LabelSelectHorizontal,
    LabelSelectVertical,
    // LabelMultiSelectHorizontal,
    // LabelMultiSelectVertical,
    // LabelDatepickerHorizontal,
    // LabelDatepickerVertical,
    // LabelCheckboxHorizontal,
    // LabelCheckboxVertical,
    // LabelTextAreaHorizontal,
    // LabelTextAreaVertical,
    // Select,
    Input,
    Label,
    // Table,
    TablePagination,
    // LabelInputHorizontal,
    // Checkbox,
    Button,
    Chip,
},
    computed: {
        // prevRoutePath() {return this.prevRoute ? this.prevRoute.path : '/' },
        dbComponentBehavior() {
            return this.$store.getters['dbComponentBehavior/byLanguage']('erp')
        },
    },
    methods: {
        goBack () {
            // to="/Supplier/view/details"

            // this.$router.go(-2)

            // Unexpected token u in JSON at position 0
            // this.$router.push({name: "Supplier/view/details" })

           // push 4(details) , get 3(viewdetails)
            this.payload_new_4=this.payload_new_3;
            this.payload_new_4.searchbutton = false;
            this.payload_new_4.actionbutton = false;
            this.$router.push({name: "Supplier", params: {data: JSON.stringify(this.payload_new_4) } })

            // unable to push back//err// Unexpected token u in JSON at position 0
            // this.$router.back()
        },
        saveGoBack: function() {
            // this.$router.go(-2)
             this.payload_new_4=this.payload_new_3;
             this.$router.push({name: "Supplier", params: {data: JSON.stringify(this.payload_new_4) } })
        },
        addButton: function()
        {
            this.showAddTask = true
            // this.$router.push('supplier/details')
        },
        searchButton: function()
        {
            this.showSearchTask = true
            this.payload_new_4=this.payload_new_3;
            this.$router.push({name: "Supplier", params: {data: JSON.stringify(this.payload_new_4) } })
        },

        handleAction: function(payload){
            console.log(payload);
            // alert(payload.locgroup_dc);
            this.showAction = true;
            this.payload_new_4=payload;
            this.$router.push({name: "Supplier", params: {data: JSON.stringify(this.payload_new_4) } })
        },

        handleEdit: function(payload){
            console.log(payload);
            this.showEdit = true;
            this.payload_new=payload;
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
        
        handleSave: function(){

//all supplier(include table and form)
            var payload = {
                "primary_key": this.payload_new_3.code,
                "pass_json": this.payload_new_3
            };

                this.$store.dispatch('setup/trigger_edit_supplier_table', payload).then(() => {
                var data = JSON.parse(JSON.stringify(this.$store.getters['setup/get_supplier_status_table']));
                var status = data.status;
                var response = data.response
                console.log(data);
                if(status == 'success')
                {
                    // Unable to return back the data, it's blank
                    // have tried using payload_new & payload_new_3 as well 
                    // Successfully get back to supplier page as I change the $router.go into $router.push in supplierviewdetails
                    // this.payload_new_2=payload;
                    // this.$router.push({name: "Supplier/view/details", params: {data: JSON.stringify(this.payload_new_2) } })
                    
                    // err // Unexpected token u in JSON at position 0
                    // this.$router.push("/erp/setup/Supplier/view/details")

                    // err //no output // SyntaxError: Unexpected token u in JSON at position 0
                    // this.$router.push({name: "Supplier/view/details"})

                    this.saveGoBack()
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
            
            this.$store.dispatch('setup/trigger_supplier_table_data_server_side', payload).then(() => {
                var data = JSON.parse(JSON.stringify(this.$store.getters['setup/get_supplier_table_data_server_side']));

                this.test_data = data;
            });
        },
     

    }, 

created: function () {
        var payload = {};

        this.$store.dispatch('setup/trigger_supplier', payload).then (() => {

        var data = JSON.parse(JSON.stringify(this.$store.getters['setup/get_supplier']));

        this.json_new = data;

        var SupplierTableDataBrowser = JSON.parse(JSON.stringify(this.$store.getters['setup/get_supplier_table_data_browser']));

        this.table_data_supplier_browser = SupplierTableDataBrowser;

        var SupplierTableData = JSON.parse(JSON.stringify(this.$store.getters['setup/get_supplier_table_data']));

        this.table_data_supplier = SupplierTableData;

        var SupplierTableSearchData = JSON.parse(JSON.stringify(this.$store.getters['setup/get_supplier_table_data']));

        this.table_data_supplier_search = SupplierTableSearchData;
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

.table_wrapper{
    padding-left: 2px;
    padding-right: 2px;
    padding-bottom: 2px;
    padding-top: 2px;
}

</style>
