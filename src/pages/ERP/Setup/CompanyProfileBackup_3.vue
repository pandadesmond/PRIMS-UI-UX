<template>
 <q-form ref="submit_form">
        <div class="row row_section" style="padding: 0px; margin-bottom: 10px; margin-left: 12px;">
            <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">

                <Chip text="Setup" icon="tune"/> / <Chip text="Company Profile" icon="business"/>

            </div>
        </div>

<q-card style="background-color: white; padding: 10px; margin-left: 10px; margin-right: 10px; margin-bottom: 10px;" >
<q-card-section>
   
<!--First column, row--> 
<div class="row row_section">
    <div class="card_section col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" >
        <div class="row row_section" style="padding: 0px; margin-bottom: 0px;">
            <div class="card_section col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">   
                <h6 style="margin-bottom: 5px; margin-top: 0px; margin-left: 5px;"><Label text="Company Info" style="background-color: transparent"/></h6>
            </div>
        </div>
<!--main 6--> 
<!--Company name-->
    <div class="row row_section">
        <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div class="component_div">
                <LabelInputVertical
                  :readonly="true"
                  :no_label="true"
                  :text="'Company Name'"
                  v-model:pass_value="json_new.companyname"
                  :dbComponentBehavior="dbComponentBehavior.companyname" /> 
            </div>
        </div>

<!--Address 1-->
    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <div class="component_div">
            <LabelInputVertical
              :readonly="false"
              :no_label="true"
              :text="'Address'"
              v-model:pass_value="json_new.address1"
              :dbComponentBehavior="dbComponentBehavior.address1" />
        </div>
    </div>

<!--Address 2-->
    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <div class="component_div">
            <Input 
                :readonly="false" 
                :no_label="true" 
                :text="'Address2'" 
                v-model="json_new.address2" 
                :dbComponentBehavior="dbComponentBehavior.address1"/>
        </div>
    </div>

<!--Address 3-->
    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <div class="component_div">
            <Input 
                :readonly="false" 
                :no_label="true" 
                :text="'Address3'" 
                v-model="json_new.address3" 
                :dbComponentBehavior="dbComponentBehavior.address1"/>
        </div>
    </div>

<!--City-->
    <div class="card_section col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
        <div class="component_div">
            <LabelInputVertical
              :readonly="false"
              :no_label="true"
              :text="'City'"
              v-model:pass_value="json_new.city"
              :dbComponentBehavior="dbComponentBehavior.City" />
        </div>
    </div> 

<!--Postal code-->
    <div class="card_section col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
        <div class="component_div">
            <LabelInputVertical
              :readonly="false"
              :no_label="true"
              :text="'Postal Code'"
              v-model:pass_value="json_new.postalcode"
              :dbComponentBehavior="dbComponentBehavior.PostalCode" />
        </div>
    </div>

<!--State-->
    <div class="card_section col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
        <div class="component_div">
            <LabelInputVertical
              :readonly="false"
              :no_label="true"
              :text="'State'"
              v-model:pass_value="json_new.state"
              :dbComponentBehavior="dbComponentBehavior.State" />
        </div>
    </div>

<!--Country-->
    <div class="card_section col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
        <div class="component_div">
            <LabelInputVertical
              :readonly="false"
              :no_label="true"
              :text="'Country'"
              v-model:pass_value="json_new.country"
              :dbComponentBehavior="dbComponentBehavior.Country" /> 
        </div>
    </div>

<!--Tel-->
    <div class="card_section col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
        <div class="component_div">
            <LabelInputVertical
              style="margin-left: 0px;"
              :readonly="false"
              :no_label="true"
              :text="'Tel'"
              v-model:pass_value="json_new.tel"
              :dbComponentBehavior="dbComponentBehavior.Tel" />
        </div> 
    </div>

<!--Fax-->
    <div class="card_section col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
        <div class="component_div">
            <LabelInputVertical
              style="margin-left: 0px;"
              :readonly="false"
              :no_label="true"
              :text="'Fax'"
              v-model:pass_value="json_new.fax"
              :dbComponentBehavior="dbComponentBehavior.Fax" />
        </div> 
    </div>

<!--Reg.no-->
    <div class="card_section col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
        <div class="component_div">
            <LabelInputVertical
              style="margin-left: 0px;"
              :readonly="false"
              :no_label="true"
              :text="'Reg.No.'"
              v-model:pass_value="json_new.comp_reg_no"
              :dbComponentBehavior="dbComponentBehavior.comp_reg_no" />
        </div>
    </div> 

<!--Custom report code-->
    <div class="card_section col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
        <div class="component_div">
            <LabelInputVertical
              style="margin-left: 0px;"
              :readonly="false"
              :no_label="true"
              :text="'Custom Report Code'"
              v-model:pass_value="json_new.comp_code"
              :dbComponentBehavior="dbComponentBehavior.comp_code" />
        </div>
    </div> 

<!--Branch Location-->
    <div class="card_section col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
        <div class="component_div">
 <LabelSelectVertical
  style="margin-left: 0px;"
  :readonly="false"
  :no_label="true"
  :text="'Branch Location Group'"
  v-model:pass_value="json_new.locgroup_branch"
  :dbComponentBehavior="dbComponentBehavior.select"
  :options="branch_options" /> 
        </div>
    </div>

<!--Location group-->
    <div class="card_section col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
        <div class="component_div">
    <LabelSelectVertical
    style="margin-left: 0px;"
    :readonly="false"
    :no_label="true"
    :text="'DC Location Group'"
    v-model:pass_value="json_new.locgroup_dc"
    :dbComponentBehavior="dbComponentBehavior.select"
    :options="branch_options" />
        </div>
    </div> 
</div>
</div>

<!--Second column--> 
    <div class="card_section col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" >
        <div class="row row_section" style="padding: 0px; margin-bottom: 0px;">
            <div class="card_section col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">   
                <h6
                  style="margin-bottom: 5px; margin-top: 2px; margin-left: 5px;"><Label
                  text="Tax Info"
                  style="background-color: transparent"/></h6>
            </div>
        </div>
<!--main 6--> 
    <div class="row row_section">
        <div class="card_section col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <div class="component_div">
                <LabelDatepickerVertical 
                    :readonly="false" 
                    :no_label="true" 
                    :text="'GST Effective Date'" 
                    v-model:pass_value="json_new.gst_start_date" 
                    :dbComponentBehavior="dbComponentBehavior.gst_start_date"/>
            </div>
        </div> 

<!--Tax inclusive--> 
    <div class="card_section col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
        <div class="component_div">
            <LabelCheckboxVertical 
                :readonly="false" 
                :no_label="true" 
                :text="'Tax inclusive'" 
                v-model:pass_value="json_new.tax_inclusive" 
                :dbComponentBehavior="dbComponentBehavior.tax_inclusive"
                :true-value = "1"
                :false-value = "0"/>
        </div>
    </div> 

<!--GST submission cycle month--> 
    <div class="card_section col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
        <div class="component_div">
    <LabelSelectVertical
    style="margin-left: 0px;"
    :readonly="false"
    :no_label="true"
    :text="'GST submission cycle month'"
    v-model:pass_value="json_new.gst_submission_cycle"
    :dbComponentBehavior="dbComponentBehavior.select"
    :options="month_options" />
        </div>
    </div>

<!--GST No.-->
    <div class="card_section col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
        <div class="component_div">
            <LabelInputVertical
              style="margin-left: 0px;"
              :readonly="false"
              :no_label="true"
              :text="'GST No.'"
              v-model:pass_value="json_new.gst_no"
              :dbComponentBehavior="dbComponentBehavior.gst_no" /> 
        </div>
    </div>

<!--SST effective date-->
    <div class="card_section col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
        <div class="component_div">
            <LabelDatepickerVertical 
                :readonly="false" 
                :no_label="true" 
                :text="'SST Effective Date'" 
                v-model:pass_value="json_new.sst_start_date" 
                :dbComponentBehavior="dbComponentBehavior.sst_start_date"/>
        </div>
    </div>

<!--SST No.-->
    <div class="card_section col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
        <div class="component_div">
            <LabelInputVertical
              style="margin-left: 0px;"
              :readonly="false"
              :no_label="true"
              :text="'SST No.'"
              v-model:pass_value="json_new.sst_no"
              :dbComponentBehavior="dbComponentBehavior.sst_no" />
        </div>
    </div>
</div>
</div>
</div>
      </q-card-section>
    </q-card>  

<q-card style="background-color: white; padding: 10px; margin-left: 10px; margin-right: 10px; margin-bottom: 10px;">
    <q-card-section>
        <div class="row row_section" style="padding: 0px; margin-bottom: 0px;">
            <div class="card_section col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">   
                <h6
                  style="margin-bottom: 5px; margin-top: 0px; margin-left: 5px;"><Label
                  text="HQ"
                  style="background-color: transparent"/></h6>
            </div>
        </div>
<!--HQ checkbox-->
<!--**json.HQ**-->
<div class="row row_section">
<div class="card_section col-xs-12 col-sm-12 col-md-4s col-lg-4 col-xl-4">
        <div class="component_div">
        <div>
         <q-icon name="home" size="20px"/>
            <Checkbox 
                left-label 
                v-model="json_new.ashq"  
                :dbComponentBehavior="dbComponentBehavior.ashq" 
                label="HQ" 
                class="text-bold" 
                :true-value = "1"
                :false-value = "0" />
      </div>
        </div>
    </div>
    </div>

<!--HQ Table-->
<div class="row row_section">
    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <div class="component_div">
            <Table 
            :row_per_page="[20,40,60,80,100,0]" 
            :top_button="true" 
             :button_no_outline="true"
            v-on:head_button="addButton" 
            v-on:main_action="handleAction" 
            v-on:main_edit="handleEdit" 
            v-on:main_list="handleList" 
            v-on:main_delete="handleDelete" 
            :title="table_title" 
            :table_data="table_data_companyprofile" 
            :table_column="table_column"
            :action_button="true"
            :edit_button="true"
            :view_button="true"
            :delete_button="true"
            />
</div>
</div>
</div>

<!--HQ Table(change to server)-->
<div class="row row_section">
    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <div class="component_div">
            <TablePagination 
            :row_per_page="[20,40,60,80,100,0]" 
            :top_button="true" 
            v-on:receiveRequestTable="handleTableChange" 
            v-on:head_button="addButton" 
            v-on:main_action="handleAction" 
            v-on:main_edit="handleEdit" 
            v-on:main_list="handleList" 
            v-on:main_delete="handleDelete" 
            :title="table_title" 
            :table_data="test_data" 
            :table_column="test_column"
            :action_button="true"
            :edit_button="true"
            :view_button="true"
            :delete_button="true"
            />
</div>
</div>
</div>


<!--Action dialog-->
<div class="row row_section">
    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <div class="component_div">
        <q-dialog v-model="showAction">
         <q-card style="width: 700px; max-width:80vw;">
            <q-card-section class="row bg-primary text-white">
           <Label
             text="Edit HQ"
             class="text-subtitle1"
             style="background-color:transparent;" />
          <q-space/> 
            <q-btn 
                v-close-popup
                flat 
                round 
                dense
                icon="close" />
        </q-card-section>


        <q-card-section >
        <div class="row row_section">
           <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div class="component_div">            
        <LabelSelectVertical
        :readonly="false"
        :no_label="true"
        :text="'DC Location Group'"
        v-model:pass_value="json_new.locgroup_dc"
        :dbComponentBehavior="dbComponentBehavior.select"
        :options="branch_options" />
            </div>
            </div>
            </div>
        </q-card-section>

        <q-card-actions align="right">

    <div class="row row_section">
        <div class="card_section col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
            <div class="component_div text-right">   
       <Button
          class="button_save"
          v-on:receiveChange="callUpdate()"
          :text="'SAVE'"
          :type="'button'" />
      </div>
      </div>
             
    </div>

   <div class="row row_section">
        <div class="card_section col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
            <div class="component_div text-right">   
        <Button
          class="button_save"
          v-close-popup
          :text="'CANCLE'"
          :type="'button'" />
      </div>
      </div>
             
    </div>
 
        </q-card-actions>
         </q-card>
         </q-dialog>
         </div>
        </div>
    </div>

 
<!--addButton dialog-->
<div class="row row_section">
    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <div class="component_div">
        <q-dialog v-model="showAddTask">
         <q-card style="width: 700px; max-width:80vw;">
            <q-card-section class="row bg-primary text-white">
           <Label
             text="Add HQ"
             class="text-subtitle1"
             style="background-color:transparent;" />
          <q-space/> 
            <q-btn 
                v-close-popup
                flat 
                round 
                dense
                icon="close" />
        </q-card-section>


        <q-card-section >
        <div class="row row_section">
           <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div class="component_div">            
        <LabelSelectVertical
        :readonly="false"
        :no_label="true"
        :text="'DC Location Group'"
        v-model:pass_value="json_new.locgroup_dc"
        :dbComponentBehavior="dbComponentBehavior.select"
        :options="branch_options" />
            </div>
            </div>
            </div>
        </q-card-section>

        <q-card-actions align="right">

    <div class="row row_section">
        <div class="card_section col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
            <div class="component_div text-right">   
        <Button
          class="button_save"
          v-on:receiveChange="callUpdate()"
          :text="'SAVE'"
          :type="'button'" />
      </div>
      </div>
             
    </div>

   <div class="row row_section">
        <div class="card_section col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
            <div class="component_div text-right">   
        <Button
          class="button_save"
          v-close-popup
          :text="'CANCLE'"
          :type="'button'" />
      </div>
      </div>
             
    </div>
 
        </q-card-actions>
         </q-card>
         </q-dialog>
         </div>
        </div>
    </div>




<!--save button(bottom-right)-->
    <div class="row row_section justify-end">
        <div class="card_section col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
            <div class="component_div text-right">   
        <Button
          class="button_save"
          v-on:receiveChange="callUpdate()"
          :text="'APPLY'"
          :type="'button'" />
      </div>
      </div>
             
    </div>

        </q-card-section>
</q-card>
</q-form>
</template>

<script>
import Input from 'src/components/ERP/Base/Input';
import Label from 'src/components/ERP/Base/Label';
import LabelInputVertical from'src/components/ERP/General/LabelInputVertical' ;
import LabelSelectVertical from'src/components/ERP/General/LabelSelectVertical' ;
// import LabelInputHorizontal from'src/components/ERP/General/LabelInputHorizontal' ;
// import LabelSelectHorizontal from'src/components/ERP/General/LabelSelectHorizontal' ;
import LabelDatepickerVertical from'src/components/ERP/General/LabelDatepickerVertical' ;
// import LabelDatepickerHorizontal from'src/components/ERP/General/LabelDatepickerHorizontal' ;
import LabelCheckboxVertical from 'src/components/ERP/General/LabelCheckboxVertical.vue';
// import LabelCheckboxHorizontal from 'src/components/ERP/General/LabelCheckboxHorizontal.vue';
import Table from 'src/components/ERP/Base/Table';
import TablePagination from 'src/components/ERP/Base/TablePagination';
// import Select from 'src/components/ERP/Base/Select';
import Checkbox from 'src/components/ERP/Base/Checkbox';
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
            showAction: false,
            json_new: {},
            payload_new: {},
            test_data: [],
            test_pagination: [],
            table_data_companyprofile: [],
            // json:{
            //     "CompanyName":"PASARAYA PANDA SDN BHD",
            //     "Address1": "NO 28-1 & 30-1, JALAN PPM13,",
            //     "Address2": "PLAZA PANDAN MALIM BUSINESS PARK,",
            //     "Address3": "BALAI PANJANG,75250 MELAKA.",
            //     "City": "BALAI PANJANG",
            //     "PostalCode": "75250",
            //     "State": "MELAKA",
            //     "Country": "MALAYSIA",  
            //     "Tel": "06-332 3966",
            //     "Fax": "06-332 3566",
            //     "RegNo": "(854073-K)",
            //     "BranchLocationGroup": 0,
            //     "DCLocationGroup": 0,
            //     "CustomReportCode": "PANDA",
            //     "GST Effective Date": "2015-04-01",
            //     "GSTSubmissionCycleMonth": 0,
            //     "GSTNo": "001934909440",
            //     "SST Effective Date": "2222-01-28",
            //     "SSTNo": "Custom Report Code",                
            // },
            //   branch_options: [
            //     {
            //         "value": 0,
            //         "label": "PGHQ PANDA SDN BND-HQ"
            //     },
            //     {
            //         "value": 1,
            //         "label": "1001 PANDA SDN BHD"
            //     },
            //     {
            //         "value": 2,
            //         "label": "1002 PANDA SDN BHD"
            //     },
            //     {
            //         "value": 3,
            //         "label": "1003 PANDA SDN BHD"
            //     },
            //     {
            //         "value": 4,
            //         "label": "1004 PANDA SDN BHD"
            //     },
            //     {
            //         "value": 5,
            //         "label": "1006 PANDA SDN BHD"
            //     },
            //     {
            //         "value": 6,
            //         "label": "1005 PANDA SDN BHD"
            //     },
            //     {
            //         "value": 7,
            //         "label": "1008 PANDA SDN BHD"
            //     },
            //     {
            //         "value": 8,
            //         "label": "1010 PANDA SDN BHD"
            //     },
            //     {
            //         "value": 9,
            //         "label": "1012 PANDA SDN BHD"
            //     },
            //     {
            //         "value": 10,
            //         "label": "1013 PANDA SDN BHD"
            //     },
            //     {
            //         "value": 11,
            //         "label": "1014 PANDA SDN BHD"
            //     },
            //     {
            //         "value": 12,
            //         "label": "1018 PANDA SDN BHD"
            //     },
            //     {
            //         "value": 13,
            //         "label": "1020 PANDA SDN BHD"
            //     },
            //     {
            //         "value": 14,
            //         "label": "1023 PANDA SDN BHD"
            //     },
            //     {
            //         "value": 15,
            //         "label": "1024 PANDA SDN BHD"
            //     },
            //     {
            //         "value": 16,
            //         "label": "1034 PANDA SDN BHD"
            //     },
            //     {
            //         "value": 17,
            //         "label": "1026 PANDA SDN BHD"
            //     },
            //     {
            //         "value": 18,
            //         "label": "9981 PANDA FRESH"
            //     },
            //     {
            //         "value": 19,
            //         "label": "1028 PANDA SDN BHD"
            //     },  
            //     {
            //         "value": 20,
            //         "label": "1033 PANDA SDN BHD"
            //     }, 
            //     {
            //         "value": 21,
            //         "label": "1035 PANDA SDN BHD"
            //     },
            //     {
            //         "value": 22,
            //         "label": "1036 PANDA SDN BHD"
            //     }, 
            //     {
            //         "value": 23,
            //         "label": "1038 PANDA SDN BHD"
            //     }, 
            //     {
            //         "value": 24,
            //         "label": "1039 PANDA SDN BHD"
            //     }, 
            //     {
            //         "value": 25,
            //         "label": "9980 PANDA FRESH"
            //     },  
            //     {
            //         "value": 26,
            //         "label": "MYD01 PANDA SDN BHD"
            //     },  
            //     {
            //         "value": 27,
            //         "label": "1017 PANDA SDN BHD"
            //     },    
            //     {
            //         "value": 28,
            //         "label": "1019 PANDA SDN BHD"
            //     },
            //     {
            //         "value": 29,
            //         "label": "1021 PANDA SDN BHD"
            //     },
            //     {
            //         "value": 30,
            //         "label": "1029 PANDA SDN BHD"
            //     },
            //     {
            //         "value": 31,
            //         "label": "1016 PANDA SDN BHD"
            //     },  
            //     {
            //         "value": 32,
            //         "label": "1030 PANDA SDN BHD"
            //     },  
            //     {
            //         "value": 33,
            //         "label": "2001 PANDA SDN BHD"
            //     },  
            //     {
            //         "value": 34,
            //         "label": "1022 PANDA SDN BHD"
            //     },  
            //     {
            //         "value": 35,
            //         "label": "1015 PANDA SDN BHD"
            //     },  
            //     {
            //         "value": 36,
            //         "label": "1040 PANDA SDN BHD"
            //     }, 
            //     {
            //         "value": 37,
            //         "label": "1031 PANDA SDN BHD"
            //     }, 
            //     {
            //         "value": 38,
            //         "label": "1032 PANDA SDN BHD"
            //     }, 
            //     {
            //         "value": 39,
            //         "label": "1037 PANDA SDN BHD"
            //     },
            //     {
            //         "value": 40,
            //         "label": "1011 PANDA SDN BHD"
            //     },
            //     {
            //         "value": 41,
            //         "label": "1007 PANDA SDN BHD"
            //     }, 
            //     {
            //         "value": 42,
            //         "label": "1009 PANDA SDN BHD"
            //     },    
            //     {
            //         "value": 43,
            //         "label": "1027 PANDA SDN BHD"
            //     },   
            //     {
            //         "value": 44,
            //         "label": "1025 PANDA SDN BHD"
            //     },
            //     {
            //         "value": 45,
            //         "label": "1041 PANDA SDN BHD"
            //     }, 
            //     {
            //         "value": 46,
            //         "label": "NJWH NINSO"
            //     }                
            // ],
            //  month_options: [
            //     {
            //         "value": 0,
            //         "label": "1"
            //     },
            //     {
            //         "value": 1,
            //         "label": "3"
            //     }
            // ],
             table_title:"HQ Location",
             table_data: [
                {
                    "action":"",
                    "Outlet":""
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
                {
                    "align": "center",
                    "field": "Outlet",
                    "sortable": true,
                    "name": "Outlet",
                    "label": "Location",
                    "format_child": "$",
                }
            ],

             test_column: [
                {
                    name: 'action',
                    required: true,
                    label: 'Actions',
                    align: 'left',
                    sortable: false
                },
                {
                    "align": "center",
                    "field": "Outlet",
                    "sortable": true,
                    "name": "Outlet",
                    "label": "Location",
                    "format_child": "$",
                }
            ],
            showAddTask: false,
        }
    },

components:{
    Input,
    Label,
    LabelInputVertical,
    LabelSelectVertical,
    // LabelInputHorizontal,
    // LabelSelectHorizontal,
    LabelDatepickerVertical,
    // LabelDatepickerHorizontal,
    LabelCheckboxVertical,
    // LabelCheckboxHorizontal,
    Table,
    // Select,
    Checkbox,
    Button,
    TablePagination,
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
            //this.showAddTask = true
            this.$router.push({name: "CompanyProfileBackup_3/details", params: {data: JSON.stringify(this.payload_new) } })
        },
        addButton1: function(payload)
        {
            this.showAddTask = true
            
        },
        handleAction: function(payload){
            console.log(payload);
            // alert(payload.locgroup_dc);
            this.showAction = true
            this. payload_new=payload
            this.$router.push({name: "CompanyProfileBackup_3/details", params: {data: JSON.stringify(this.payload_new) } })
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

        this.table_data_companyprofile = CompanyProfileTableData;

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

.row_section_dialog
{
    padding: 10px;
    right: 10px;
}
.table_wrapper
{
    padding-left: 0px;  
    padding-right: 5px;
}
</style>
