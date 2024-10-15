<template>
 <div class="row row_section" style="padding: 0px; margin-bottom: 10px; margin-left: 12px;">
            <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">

                <Chip text="Setup" icon="tune"/> / <Chip text="Surchange/ Discount Code" icon="business"/>

            </div>
    </div>
    <div class="row row_section">
    <div class="card_section col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
        <div class="component_div">
            <LabelInputHorizontal 
            :readonly="false" 
            :no_label="true" 
            :text="'Search'" 
            v-model:pass_value="json.dayForm" 
            :dbComponentBehavior="dbComponentBehavior.dayForm"/>
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
            :edit_button="true"
            :view_button="true"
            :delete_button="true"
            />
        </div>
    </div>
</div>

<q-dialog v-model="show_add" persistent>
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section class="row bg-primary text-white">
           <Label text="Add New Records" class="text-subtitle1" style="background-color:transparent;"/>
        <q-space/>
        <q-btn  icon="close" flat round dense color="white" v-close-popup />
     </q-card-section>

        <q-card-section class="q-pt-none"> 
    
         <div class="row row_section">
            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                <div class="component_div">
              <Label  class="text-subtitle1" text="Code Type" style="background-color:transparent;"/>
            </div></div>
            <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                <div class="component_div">
                 <Select   :readonly="false"  :no_label="true"  
                  v-model="json.codeType" 
                  :dbComponentBehavior="dbComponentBehavior.select"   
                  :options="CodeType_options"/>  
            </div>
            </div>
        
      
            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                <div class="component_div">
               <Label  class="text-subtitle1" text="Code" style="background-color:transparent;"/>
            </div></div>
            <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                <div class="component_div">
               <Input :readonly="false"  
                  :no_label="true" 
                  :text="'code'" 
                  v-model="json.code" 
                  :dbComponentBehavior="dbComponentBehavior.text"/>
            </div>
            </div>
        
     
            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                <div class="component_div">
               <Label  class="text-subtitle1" text="Description" style="background-color:transparent;"/>
            </div></div>
            <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                <div class="component_div">
                 <Input :readonly="false"  
                  :no_label="true" 
                  :text="'description'" 
                  v-model="json.description" 
                  :dbComponentBehavior="dbComponentBehavior.text"/>
            </div>
            </div>
    
            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                <div class="component_div">
              <Label  
               class="text-subtitle1" 
               text="Calculater By" 
               style="background-color:transparent;"/>
            </div></div>
            <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                <div class="component_div">
                 <Select   
                  :readonly="false"  
                  :no_label="true"  
                  v-model="json.calculayeBy" 
                  :dbComponentBehavior="dbComponentBehavior.select"   
                  :options="calculayeBy_options"/>  
            </div>
            </div>
    
            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                <div class="component_div">
              <Label  class="text-subtitle1" text="Fixed Value" style="background-color:transparent;"/>
            </div></div>
            <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                <div class="component_div">
                 <Checkbox/> 
            </div>
            </div> 
      
        
            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                <div class="component_div">
               <Label  class="text-subtitle1" text="Value" style="background-color:transparent;"/>
            </div></div>
            <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                <div class="component_div">
                 <Input :readonly="false"  
                  :no_label="true" 
                  :text="'value'" 
                  v-model="json.value" 
                  :dbComponentBehavior="dbComponentBehavior.text"/>
            </div>
            </div>
      

            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                <div class="component_div">
              <Label  class="text-subtitle1" text="Surcharge/Disc Type" style="background-color:transparent;"/>
            </div></div>
            <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                <div class="component_div">
                 <Select   :readonly="false"  :no_label="true"  v-model="json.SurchargeDiscType" :dbComponentBehavior="dbComponentBehavior.select"   :options=" SurchargeDiscType_options"/>  
            </div>
            </div>
       
            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                <div class="component_div">
              <Label  class="text-subtitle1" text="Issue Debit Note" style="background-color:transparent;"/>
            </div></div>
            <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                <div class="component_div">
                 <Checkbox/> 
            </div>
            </div> 
       
        
            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                <div class="component_div">
              <Label  class="text-subtitle1" text="Issue Credit Note" style="background-color:transparent;"/>
            </div></div>
            <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                <div class="component_div">
                 <Checkbox/> 
            </div>
            </div> 
       
            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                <div class="component_div">
              <Label  class="text-subtitle1" text="Supply Tax" style="background-color:transparent;"/>
            </div></div>
            <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                <div class="component_div">
                 <Select   :readonly="false"  :no_label="true"  v-model="json.SupplyTax" :dbComponentBehavior="dbComponentBehavior.select"   :options=" SupplyTax_options"/>  
            </div>
            </div>
      
       
            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                <div class="component_div">
              <Label  class="text-subtitle1" text="Purchase Tax" style="background-color:transparent;"/>
            </div></div>
            <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                <div class="component_div">
                 <Select   :readonly="false"  :no_label="true"  v-model="json.PurchaseTax" :dbComponentBehavior="dbComponentBehavior.select"   :options="PurchaseTax_options"/>  
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

</template>

<script>
import LabelInputHorizontal from'src/components/ERP/General/LabelInputHorizontal' ;
//import LabelCheckboxHorizontal from'src/components/ERP/General/LabelCheckboxHorizontal' ;
import Table from 'src/components/ERP/Base/Table';
import Label from 'src/components/ERP/Base/Label';
import Input from 'src/components/ERP/Base/Input';
import Select from 'src/components/ERP/Base/Select';
import Checkbox from 'src/components/ERP/Base/Checkbox';
import Chip from 'src/components/ERP/Base/Chip';
export default {
   
    data() {
        return {
            table_title:"Surcharge/ Discount Code",
            show_add:false,
            multiselect_value: [],
            json:{
                "code":"",
                "description": "",
                "action": "",
                "search": "",
                "value":"",
                "codeType":0,
                "calculayeBy":0,
                 "SurchargeDiscType": 0,
                 "SupplyTax":0,
                 "PurchaseTax":0,
            },


        table_column: [
          {
         name: 'action',
         required: true,
         label: 'Actions',
         align: 'left',
         sortable: false
        },
        {name: 'type', required: true, label: 'Type', align: 'left', field: 'type'},
        {name: 'code', required: true, label: 'Code', field: 'code', align: 'left'},
        {name: 'description', label: 'Description', field: 'description', align: 'left'},
        {name: 'calculate', label: 'Calculate By', field: 'calculate', align: 'left'},
        {name: 'fixed_value', label: 'Fixed Value', field: 'fixed_value',align: 'center'},
        {name:'value', label: 'Value', field: 'value', align: 'right'},
        {name:'issue_debit', label: 'Issue Debit Note', field: 'issue_debit',align: 'center'},
        {name:'issue_credit', label: 'Issue Credit Note', field: 'issue_credit', align: 'center'},
        {name:'supply', label: 'Supply Tax', field: 'supply',align: 'left'},
        {name:'purchase', label: 'Purchase Tax', field: 'purchase',align: 'left'},
        {name:'created_at', label: 'Created At', field: 'created_at',align: 'left'},
        {name:'created_by', label: 'Created By', field: 'created_by',align: 'left'},
        {name:'updated_at', label: 'Updated At', field: 'updated_at',align: 'left'},
        {name:'updated_by', label: 'Updated By', field: 'updated_by',align: 'left'}

       ],
       table_data: [
                     {
                  type:'Discount',
                  code: 'Disc%',
                  description: 'Discount %' ,
                  calculate:'Gross Bill Amount',
                  fixed_value: 'Yes',
                  value:'0%',
                  issue_debit: 'No',
                  issue_credit: 'No',
                  supply:'SR-0',
                  purchase:'TX-0',
                  created_at:'2012-10-26 10:54:34',
                  created_by: 'kc',
                  updated_at:'2013-05-01 18:04:49',
                  updated_by:'kc'
                  },
                {
                  type:'Discount',
                  code: 'Disc$',
                  description: 'Discount $' ,
                  calculate:'Gross Bill Amount',
                  fixed_value: 'No',
                  value:'0$',
                  issue_debit: 'No',
                  issue_credit: 'No',
                  supply:'SR-0',
                  purchase:'TX-0',
                  created_at:'2012-10-26 10:54:34',
                  created_by: 'kc',
                  updated_at:'2013-05-01 18:04:41',
                  updated_by:'kc'
                  },
               {
                  type:'Surcharge',
                  code: 'Tran',
                  description: 'Transport RM' ,
                  calculate:'Gross Bill Amount',
                  fixed_value: 'No',
                  value:'0$',
                  issue_debit: 'No',
                  issue_credit: 'No',
                  supply:'SR-0',
                  purchase:'TX-0',
                  created_at:'2012-10-26 10:55:30',
                  created_by: 'kc',
                  updated_at:'2013-05-01 18:05:04',
                  updated_by:'kc'
                  },
                   {
                  type:'Surcharge',
                  code: 'SL-5',
                  description: 'Sales Tax 5%' ,
                  calculate:'Gross Bill Amount',
                  fixed_value: 'Yes',
                  value:'5%',
                  issue_debit: 'No',
                  issue_credit: 'No',
                  supply:'SR-0',
                  purchase:'TX-0',
                  created_at:'2018-09-04 12:11:09',
                  created_by: 'kc',
                  updated_at:'2018-09-04 12:11:09',
                  updated_by:'kc'
                  }
            ],
            CodeType_options: [
                {
                    "value": 0,
                    "label": "Discount"
                },
                {
                    "value": 1,
                    "label": "Surcharge"
                }
            ],
             calculayeBy_options: [
                {
                    "value": 0,
                    "label": "Gross Bill Amount"
                },
                {
                    "value": 1,
                    "label": "Net Value"
                }
            ],

              SurchargeDiscType_options: [
                {
                    "value": 0,
                    "label": "%"
                },
                {
                    "value": 1,
                    "label": "$"
                }
            ],
             SupplyTax_options: [
                {
                    "value": 0,
                    "label": "ZRL"
                },
                {
                    "value": 1,
                    "label": "ZRE"
                },
                  {
                    "value": 2,
                    "label": "DS"
                },
                {
                    "value": 3,
                    "label": "OS"
                },
                  {
                    "value": 4,
                    "label": "ES"
                },
                {
                    "value": 5,
                    "label": "RS"
                },
                  {
                    "value": 6,
                    "label": "GS"
                },
                  {
                    "value": 7,
                    "label": "SR-0"
                },
                {
                    "value": 8,
                    "label": "SL"
                },
                  {
                    "value": 9,
                    "label": "SL-5"
                },
                {
                    "value": 10,
                    "label": "SV"
                }
            ],
            PurchaseTax_options: [
                {
                    "value": 0,
                    "label": "IS"
                },
                {
                    "value": 1,
                    "label": "NR"
                },
                  {
                    "value": 2,
                    "label": "ZP"
                },
                {
                    "value": 3,
                    "label": "OP"
                },
                  {
                    "value": 4,
                    "label": "GP"
                },
                {
                    "value": 5,
                    "label": "IM-GDS"
                },
                  {
                    "value": 6,
                    "label": "TX-0"
                }
            ],
        }
    },
    components: {
        LabelInputHorizontal,
       // LabelCheckboxHorizontal,
        Table,
        Label,
        Input,
        Select,
        Checkbox,
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
            this.show_add = true
        }
    },
    created: function () {

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

.custom_label
{
 margin-top: 5px;
 margin-bottom: 5px;
}

.table_wrapper{
    padding-left: 0px;
   
}

</style>
