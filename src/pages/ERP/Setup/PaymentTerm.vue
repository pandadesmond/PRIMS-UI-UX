<template>
   <div class="row row_section" style="padding: 0px; margin-bottom: 10px; margin-left: 12px;">
            <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">

                <Chip text="Setup" icon="tune"/> / <Chip text="Payment Term" icon="business"/>

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
            :dbComponentBehavior="dbComponentBehavior.dayForm" style="background-color: transparent;"/>
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
           <Label text="Add New Records" 
            class="text-subtitle1" 
            style="background-color:transparent;"/>
        <q-space/>
        <q-btn  
         icon="close" 
         flat round dense 
         color="white" v-close-popup />
     </q-card-section>

        <q-card-section class="q-pt-none">
        <div class="row row_section">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <div class="component_div">
          <Label class="text-subtitle1"  
           text="Price Type" 
           style="background-color:transparent;"/>
             <Input :readonly="false"  
            :no_label="true" 
            :text="'Company Name'" 
            v-model="json.priceType" 
            :dbComponentBehavior="dbComponentBehavior.text"
            />
         </div>
        </div>
                 
        

          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div class="component_div">
          <Label 
          class="text-subtitle1"  
          text="Description" 
          style="background-color:transparent;"/>
           <Input 
         :readonly="false"  
         :no_label="true" 
         :text="'Description'" 
         v-model="json.priceType" 
        :dbComponentBehavior="dbComponentBehavior.text"/>
         </div>
        </div>

      

          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div class="component_div">
          <Label 
           class="text-subtitle1"  
           text="Active" style="background-color:transparent;"/>
           <Select   
           :readonly="false"  :no_label="true"  
           v-model="json.active" 
           :dbComponentBehavior="dbComponentBehavior.select"   
           :options="Active_options"/> 
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
import LabelInputHorizontal from'src/components/ERP/General/LabelInputHorizontal';
import Table from 'src/components/ERP/Base/Table';
import Label from 'src/components/ERP/Base/Label';
import Input from 'src/components/ERP/Base/Input';
import Select from 'src/components/ERP/Base/Select';
import Chip from 'src/components/ERP/Base/Chip';
export default {
   
    data() {
        return {
            table_title:"Payment Term",
            show_add:false,
            multiselect_value: [],
            Active_options: [
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
                "dayForm":"",
                "Description": "",
                "Action": "",
                "Search": "",
                "priceType":"",
                "active":0,
            },


        table_column: [
        {
         name: 'action',
         required: true,
         label: 'Actions',
         align: 'left',
         sortable: false
        },
        {name:'active', label: 'Active', field: 'active', align:'center'},
        {name:'code', label: 'Code', field: 'code', align:'left'},
        {name: 'description', label: 'Description', field: 'description',  align:'left'},
        {name: 'day_form', required: true, label: 'Day From', field: 'day_form', align: 'left'},
        {name: 'day_to', required: true, label: 'Day To', field: 'day_to', align: 'left'},
        {name: 'pay_type', label: 'Pay Type', field: 'pay_type',  align:'left'},
        {name: 'interval_day', label: 'Interval Day', field: 'interval_day',  align:'left'},
       {name: 'interval_month', label: 'Interval Month', field: 'interval_month',  align:'left'},
       
       ],
       table_data: [
                 {
                  active:'Yes',
                  code:'CASH',
                  description:'Cash',
                  day_form:'CASH',
                  day_to: 'CASH',
                  pay_type: 'CASH' ,
                  interval_day:'CASH',
                 interval_month:'CASH',
                  
                  },
                 {
                  active:'Yes',
                  code:'15',
                  description:'15 DAYS',
                  day_form:'15',
                  day_to: '15',
                  pay_type: '15' ,
                  interval_day:'15',
                  interval_month:'15',
                 
                  },
                {
                  active:'Yes',
                  code:'30',
                  description:'30 DAYS',
                  day_form:'30',
                  day_to: '30',
                  pay_type: '30' ,
                  interval_day:'30',
                  interval_month:'30',
                  
                  },
                 {
                  active:'Yes',
                  code:'45',
                  description:'45 DAYS',
                  day_form:'45',
                  day_to: '45',
                  pay_type: '45' ,
                  interval_day:'45',
                 interval_month:'45',
                  
                  },
                 {
                  active:'Yes',
                  code:'60',
                  description:'60 DAYS',
                  day_form:'60',
                  day_to: '60',
                  pay_type: '60' ,
                  interval_day:'60',
                 interval_month:'60',
                  
                  },
                 {
                  active:'Yes',
                  code:'90',
                  description:'90 DAYS',
                  day_form:'90',
                  day_to: '90',
                  pay_type: '90' ,
                  interval_day:'90',
                 interval_month:'90',
                  
                  },
                {
                 active:'Yes',
                  code:'P100',
                  description:'PPD-00.0% Due 7 days',
                  day_form:'P100',
                  day_to: 'P100',
                  pay_type: 'P100' ,
                  interval_day:'P100',
                  interval_month:'P100',
                  
                  },
                   {
                 active:'Yes',
                  code:'P104',
                  description:'PPD-2.0% Due 7 days',
                  day_form:'P104',
                  day_to: 'P104',
                  pay_type: 'P104' ,
                  interval_day:'P104',
                  interval_month:'P104',
                  },
                 {
                  active:'No',
                  code:'P200',
                  description:'PPD-00.0% Due 14 days',
                  day_form:'P200',
                  day_to: 'P200',
                  pay_type: 'P200' ,
                  interval_day:'P200',
                  interval_month:'P200', 
                  },
                  {
                  active:'Yes',
                  code:'P202',
                  description:'PPD-1.0% Due 14 days',
                  day_form:'P202',
                  day_to: 'P202',
                  pay_type: 'P202' ,
                  interval_day:'P202',
                  interval_month:'P202',
                  
                  },
                    {
                  active:'Yes',
                  code:'P204',
                  description:'PPD-2.0% Due 14 days',
                  day_form:'P204',
                  day_to: 'P204',
                  pay_type: 'P204' ,
                  interval_day:'P204',
                  interval_month:'P204',
                  
                  },
                    {
                  active:'Yes',
                  code:'P205',
                  description:'PPD-2.5% Due 14 days',
                  day_form:'P205',
                  day_to: 'P205',
                  pay_type: 'P205' ,
                  interval_day:'P205',
                  interval_month:'P205',
                  
                  },
                    {
                  active:'Yes',
                  code:'P202',
                  description:'PPD-1.0% Due 14days',
                  day_form:'P202',
                  day_to: 'P202',
                  pay_type: 'P202' ,
                  interval_day:'P202',
                  interval_month:'P202',
                  
                  },
                    {
                 active:'Yes',
                  code:'P202',
                  description:'PPD-1.0% Due 14days',
                  day_form:'P202',
                  day_to: 'P202',
                  pay_type: 'P202' ,
                  interval_day:'P202',
                  interval_month:'P202',
             }
            ]
        }
    },
    components: {
       LabelInputHorizontal,
       // LabelCheckboxHorizontal,
       Table,
       Label,
       Input,
       Select,
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
