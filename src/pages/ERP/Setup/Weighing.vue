<template>
 <div class="row row_section" style="padding: 0px; margin-bottom: 10px; margin-left: 12px;">
            <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">

                <Chip text="Setup" icon="tune"/> / <Chip text="Weighing Type Module Assignment" icon="location_city"/>

            </div>
    </div>
<!--Search label-->
<div class="row row_section">
    <div class="card_section col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
        <div class="component_div">
            <LabelInputHorizontal 
            :readonly="false" 
            :no_label="true" 
            :text="'Search'" 
            v-model:pass_value="json.code" 
            :dbComponentBehavior="dbComponentBehavior.text"/>
        </div>
    </div>
</div>

<!--Full table-->
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

<!--Adjust-in table-->
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
            :title="table_title_1" 
            :table_data="table_data_1" 
            :table_column="table_column_1"
            :action_button="true"
            :edit_button="true"
            :view_button="true"
            :delete_button="true"
            />
        </div>
    </div>
</div>

<!--Adjust-out table-->
<!--<div class="row row_section">
    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <div class="component_div">
            <Table :row_per_page="[20,40,60,80,100,0]" 
            :top_button="true" 
            v-on:head_button="addButton" 
            v-on:main_action="handleAction" 
            v-on:main_edit="handleEdit" 
            v-on:main_list="handleList" 
            v-on:main_delete="handleDelete" 
            :title="table_title_2" 
            :table_data="table_data_2" 
            :table_column="table_column_1"
            :action_button="true"
            :edit_button="true"
            :view_button="true"
            :delete_button="true"
            />
</div>
</div>
</div>-->

<!--IBT Req table-->
<!--<div class="row row_section">
    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <div class="component_div">
            <Table :row_per_page="[20,40,60,80,100,0]" 
            :top_button="true" 
            v-on:head_button="addButton" 
            v-on:main_action="handleAction" 
            v-on:main_edit="handleEdit" 
            v-on:main_list="handleList" 
            v-on:main_delete="handleDelete" 
            :title="table_title_3" 
            :table_data="table_data_3" 
            :table_column="table_column_1"
            :action_button="true"
            :edit_button="true"
            :view_button="true"
            :delete_button="true"
            />
</div>
</div>
</div>-->

<!--PO table-->
<!--<div class="row row_section">
    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <div class="component_div">
            <Table :row_per_page="[20,40,60,80,100,0]" 
            :top_button="true" 
            v-on:head_button="addButton" 
            v-on:main_action="handleAction" 
            v-on:main_edit="handleEdit" 
            v-on:main_list="handleList" 
            v-on:main_delete="handleDelete" 
            :title="table_title_4" 
            :table_data="table_data_4" 
            :table_column="table_column_1"
            :action_button="true"
            :edit_button="true"
            :view_button="true"
            :delete_button="true"
            />
</div>
</div>
</div>-->

<!--POS table-->
<!--<div class="row row_section">
    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <div class="component_div">
            <Table :row_per_page="[20,40,60,80,100,0]" 
            :top_button="true" 
            v-on:head_button="addButton" 
            v-on:main_action="handleAction" 
            v-on:main_edit="handleEdit" 
            v-on:main_list="handleList" 
            v-on:main_delete="handleDelete" 
            :title="table_title_5" 
            :table_data="table_data_5" 
            :table_column="table_column_1"
            :action_button="true"
            :edit_button="true"
            :view_button="true"
            :delete_button="true"
            />
</div>
</div>
</div>-->

<!--Purchase Request table-->
<!--<div class="row row_section">
    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <div class="component_div">
            <Table :row_per_page="[20,40,60,80,100,0]" 
            :top_button="true" 
            v-on:head_button="addButton" 
            v-on:main_action="handleAction" 
            v-on:main_edit="handleEdit" 
            v-on:main_list="handleList" 
            v-on:main_delete="handleDelete" 
            :title="table_title_6" 
            :table_data="table_data_6" 
            :table_column="table_column_1"
            :action_button="true"
            :edit_button="true"
            :view_button="true"
            :delete_button="true"
            />
</div>
</div>
</div>-->

<!--Sales Order table-->
<!--<div class="row row_section">
    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <div class="component_div">
            <Table :row_per_page="[20,40,60,80,100,0]" 
            :top_button="true" 
            v-on:head_button="addButton" 
            v-on:main_action="handleAction" 
            v-on:main_edit="handleEdit" 
            v-on:main_list="handleList" 
            v-on:main_delete="handleDelete" 
            :title="table_title_7" 
            :table_data="table_data_7" 
            :table_column="table_column_1"
            :action_button="true"
            :edit_button="true"
            :view_button="true"
            :delete_button="true"
            />
</div>
</div>
</div>-->

<!--Simple SO table-->
<!--<div class="row row_section">
    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <div class="component_div">
            <Table :row_per_page="[20,40,60,80,100,0]" 
            :top_button="true" 
            v-on:head_button="addButton" 
            v-on:main_action="handleAction" 
            v-on:main_edit="handleEdit" 
            v-on:main_list="handleList" 
            v-on:main_delete="handleDelete" 
            :title="table_title_8" 
            :table_data="table_data_8" 
            :table_column="table_column_1"
            :action_button="true"
            :edit_button="true"
            :view_button="true"
            :delete_button="true"
            />
</div>
</div>
</div>-->

<!--SKU_Markdown table-->
<!--<div class="row row_section">
    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <div class="component_div">
            <Table :row_per_page="[20,40,60,80,100,0]" 
            :top_button="true" 
            v-on:head_button="addButton" 
            v-on:main_action="handleAction" 
            v-on:main_edit="handleEdit" 
            v-on:main_list="handleList" 
            v-on:main_delete="handleDelete" 
            :title="table_title_9" 
            :table_data="table_data_9" 
            :table_column="table_column_1"
            :action_button="true"
            :edit_button="true"
            :view_button="true"
            :delete_button="true"
            />
</div>
</div>
</div>-->

<!--Stock Cycle Count table-->
<!--<div class="row row_section">
    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <div class="component_div">
            <Table :row_per_page="[20,40,60,80,100,0]" 
            :top_button="true" 
            v-on:head_button="addButton" 
            v-on:main_action="handleAction" 
            v-on:main_edit="handleEdit" 
            v-on:main_list="handleList" 
            v-on:main_delete="handleDelete" 
            :title="table_title_10" 
            :table_data="table_data_10" 
            :table_column="table_column_1"
            :action_button="true"
            :edit_button="true"
            :view_button="true"
            :delete_button="true"
            />
</div>
</div>
</div>-->

<!--Stock Take table-->
<!--<div class="row row_section">
    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <div class="component_div">
            <Table :row_per_page="[20,40,60,80,100,0]" 
            :top_button="true" 
            v-on:head_button="addButton" 
            v-on:main_action="handleAction" 
            v-on:main_edit="handleEdit" 
            v-on:main_list="handleList" 
            v-on:main_delete="handleDelete" 
            :title="table_title_11" 
            :table_data="table_data_11" 
            :table_column="table_column_1"
            :action_button="true"
            :edit_button="true"
            :view_button="true"
            :delete_button="true"
            />
</div>
</div>
</div>-->

<!--addButton dialog-->
<div class="row row_section">
    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <div class="component_div">
        <q-dialog v-model="showAddTask">
         <q-card style="width: 700px; max-width:80vw;">
            <q-card-section class="row bg-primary text-white">
           <Label text="Add New Record" class="text-subtitle1" style="background-color:transparent;"/>
          <q-space/> 
            <q-btn 
                v-close-popup
                flat 
                round 
                dense
                icon="close" />
        </q-card-section>
     
        <q-card-section class="q-pt-none">
            
                <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                     <div class="component_div">
          <Label text="Default" class="text-subtitle1" style="background-color:transparent;"/>
            <Select 
                style="background-color:transparent;" 
                :readonly="false"  
                :no_label="true" 
                :text="'Default'" 
                v-model="json.Default" 
                :dbComponentBehavior="dbComponentBehavior.select"
                :options="default_options"
            />
                 </div>
            </div>
        
    </q-card-section>

        <q-card-section class="q-pt-none">
           
                <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div class="component_div">
           <Label text="Weighing Type" class="text-subtitle1" style="background-color:transparent;"/>
            <Select 
                style="background-color:transparent;" 
                :readonly="false"  
                :no_label="true" 
                :text="'Weighing Type'" 
                v-model="json.WeighingType" 
                :dbComponentBehavior="dbComponentBehavior.select"
                :options="weighing_options"
            />
                 </div>
            </div>
                  
        </q-card-section>

        <q-card-actions align="right">
           <q-btn 
            label="Save" 
            color="primary" 
            v-close-popup />
 
          <q-btn 
            label="Close" 
            color="primary" 
            v-close-popup /> 
    
        </q-card-actions>
         </q-card>
         </q-dialog>

        </div>
    </div>
</div>

</template>

<script>
import Table from 'src/components/ERP/Base/Table';
import Label from 'src/components/ERP/Base/Label';
// import Input from 'src/components/ERP/Base/Input';
import LabelInputHorizontal from'src/components/ERP/General/LabelInputHorizontal' ;
import Select from 'src/components/ERP/Base/Select';
// import LabelCheckboxHorizontal from 'src/components/ERP/General/LabelCheckboxHorizontal.vue';
// import Checkbox from 'src/components/ERP/Base/Checkbox';
import Chip from 'src/components/ERP/Base/Chip';
export default {
    data() {
        return {
            multiselect_value: [],
            json:{
                "Default": 1,
                "WeighingType" : 1,
               
            },
            default_options: [
                {
                    "value": 0,
                    "label": "Yes"
                },
                {
                    "value": 1,
                    "label": "No"
                },
                ],
            weighing_options: [
                {
                    "value": 0,
                    "label": "13 Digit Scale Label"
                },
                {
                    "value": 1,
                    "label": "18 Digit Scale Label"
                },
                ],
            table_title:"Setup - Weighing Type Module Assignment",
            table_data: [
                {
                    module_name: 'Adjust-In',
                    created_at: '2014-06-12 12:26:51',
                    created_by: 'kc',
                    update_at: '2014-06-12 12:26:51',
                    update_by: 'kc',
                },
                {
                    module_name: 'Adjust-Out',
                    created_at: '2014-06-12 12:26:48',
                    created_by: 'kc',
                    update_at: '2014-06-12 12:26:48',
                    update_by: 'kc',
                },
                {
                    module_name: 'IBT Req',
                    created_at: '2014-06-12 12:27:09',
                    created_by: 'kc',
                    update_at: '2014-06-12 12:27:09',
                    update_by: 'kc',
                },
                {
                    module_name: 'PO',
                    created_at: '2014-06-11 12:11:58',
                    created_by: 'kc',
                    update_at: '2014-06-11 12:11:58',
                    update_by: 'kc',
                },
                {
                    module_name: 'POS',
                    created_at: '2014-06-12 12:26:58',
                    created_by: 'kc',
                    update_at: '2014-06-12 12:26:58',
                    update_by: 'kc',
                },
                {
                    module_name: 'Purchase Request',
                    created_at: '2014-06-12 12:27:27',
                    created_by: 'kc',
                    update_at: '2014-06-12 12:27:27',
                    update_by: 'kc',
                },
                {
                    module_name: 'Sales Order',
                    created_at: '2014-06-12 12:27:01',
                    created_by: 'kc',
                    update_at: '2014-06-12 12:27:01',
                    update_by: 'kc',
                },
                {
                    module_name: 'Simple SO',
                    created_at: '2014-06-12 12:26:54',
                    created_by: 'kc',
                    update_at: '2014-06-12 12:26:54',
                    update_by: 'kc',
                },
                {
                    module_name: 'SKU_Markdown',
                    created_at: '2014-06-12 12:27:27',
                    created_by: 'kc',
                    update_at: '2014-06-12 12:27:27',
                    update_by: 'kc',
                },
                {
                    module_name: 'Stock Cycle Count',
                    created_at: '2014-06-12 12:27:27',
                    created_by: 'kc',
                    update_at: '2014-06-12 12:27:27',
                    update_by: 'kc',
                },
                {
                    module_name: 'Stock Take',
                    created_at: '2014-06-12 12:27:22',
                    created_by: 'kc',
                    update_at: '2014-06-12 12:27:22',
                    update_by: 'kc',
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
                    name: 'module_name', 
                    label: 'Module name', 
                    field: 'module_name', 
                    align: 'left',
                    sortable: true 
                },
               { 
                   name: 'created_at', 
                   label: 'Created at', 
                   field: 'created_at',
                   align: 'left',  
                   sortable: true
                },
               { 
                   name: 'created_by', 
                   label: 'Cretaed by', 
                   field: 'created_by',
                   align: 'left',  
                   sortable: true
                },
               { 
                   name: 'update_at', 
                   label: 'Update at', 
                   field: 'update_at',
                   align: 'left', 
                   sortable: true
                },
               { 
                   name: 'update_by', 
                   label: 'Update by', 
                   field: 'update_by',
                   align: 'left', 
                   sortable: true
                },
            ],

            table_title_1:"",
            table_data_1: [
                {
                    default: '',
                    weighing_type: '',
                    created_at: '',
                    created_by: '',
                    update_at: '',
                    update_by: '',

                   // default: 'Yes',
                   // weighing_type: '13 Digit Scale Label',
                   // created_at: '2014-06-12 12:33:32',
                   // created_by: 'kc',
                    // update_at: '2014-06-12 12:33:32',
                    // update_by: 'kc',
                },
                ],
                table_column_1: [
                {
                    name: 'action',
                    required: true,
                    label: 'Actions',
                    align: 'left',
                    sortable: false
                },
                {
                    name: 'default',
                    required: true,
                    label: 'Default',
                    align: 'left',
                    field: 'default',
                },
                { 
                    name: 'weighing_type', 
                    label: 'Weighing Type', 
                    field: 'weighing_type', 
                    align: 'left',
                    sortable: true 
                },
               { 
                   name: 'created_at', 
                   label: 'Created at', 
                   field: 'created_at',
                   align: 'left',  
                   sortable: true
                },
               { 
                   name: 'created_by', 
                   label: 'Cretaed by', 
                   field: 'created_by',
                   align: 'left',  
                   sortable: true
                },
               { 
                   name: 'update_at', 
                   label: 'Update at', 
                   field: 'update_at',
                   align: 'left', 
                   sortable: true
                },
               { 
                   name: 'update_by', 
                   label: 'Update by', 
                   field: 'update_by',
                   align: 'left', 
                   sortable: true
                },
            ],
            /*table_title_2:"Adjust-Out",
            table_data_2: [
                {
                    default: 'Yes',
                    weighing_type: '13 Digit Scale Label',
                    created_at: '2014-06-12 12:33:41',
                    created_by: 'kc',
                    update_at: '2014-06-12 12:33:41',
                    update_by: 'kc',
                },
                ],
            table_title_3:"IBT Req",
            table_data_3: [
                {
                    default: 'Yes',
                    weighing_type: '13 Digit Scale Label',
                    created_at: '2014-06-12 12:33:50',
                    created_by: 'kc',
                    update_at: '2014-06-12 12:33:50',
                    update_by: 'kc',
                },
                ],
            table_title_4:"PO",
            table_data_4: [
                {
                    default: 'Yes',
                    weighing_type: '13 Digit Scale Label',
                    created_at: '2014-06-12 12:26:34',
                    created_by: 'kc',
                    update_at: '2014-06-12 12:26:34',
                    update_by: 'kc',
                },
                ],
            table_title_5:"POS",
            table_data_5: [
                {
                    default: 'Yes',
                    weighing_type: '13 Digit Scale Label',
                    created_at: '2014-06-12 12:34:11',
                    created_by: 'kc',
                    update_at: '2014-06-12 12:34:11',
                    update_by: 'kc',
                },
                ],
            table_title_6:"Purchase Request",
            table_data_6: [
                {
                    default: 'Yes',
                    weighing_type: '13 Digit Scale Label',
                    created_at: '2014-06-12 12:34:23',
                    created_by: 'kc',
                    update_at: '2014-06-12 12:34:23',
                    update_by: 'kc',
                },
                ],
            table_title_7:"Sales Order",
            table_data_7: [
                {
                    default: 'Yes',
                    weighing_type: '13 Digit Scale Label',
                    created_at: '2014-06-12 12:34:31',
                    created_by: 'kc',
                    update_at: '2014-06-12 12:34:31',
                    update_by: 'kc',
                },
                ],
            table_title_8:"Simple SO",
            table_data_8: [
                {
                    default: 'Yes',
                    weighing_type: '13 Digit Scale Label',
                    created_at: '2014-06-12 12:34:44',
                    created_by: 'kc',
                    update_at: '2014-06-12 12:34:44',
                    update_by: 'kc',
                },
                ],
            table_title_9:"SKU_Markdown",
            table_data_9: [
                {
                    default: '',
                    weighing_type: '',
                    created_at: '',
                    created_by: '',
                    update_at: '',
                    update_by: '',
                },
                ],
            table_title_10:"Stock Cycle Count",
            table_data_10: [
                {
                    default: 'Yes',
                    weighing_type: '18 Digit Scale Label',
                    created_at: '2014-06-12 12:27:27',
                    created_by: 'kc',
                    update_at: '2014-06-12 12:27:27',
                    update_by: 'kc',
                },
                ],
            table_title_11:"Stock Take",
            table_data_11: [
                {
                    default: 'Yes',
                    weighing_type: '13 Digit Scale Label',
                    created_at: '2014-06-12 12:34:51',
                    created_by: 'kc',
                    update_at: '2014-06-12 12:34:51',
                    update_by: 'kc',
                },
                ],*/

            showAddTask: false,
        }
    },
    components: {
    // LabelInputHorizontal,
    // LabelInputVertical,
    // LabelSelectHorizontal,
    // LabelSelectVertical,
    // LabelMultiSelectHorizontal,
    // LabelMultiSelectVertical,
    // LabelDatepickerHorizontal,
    // LabelDatepickerVertical,
    // LabelCheckboxHorizontal,
    // LabelCheckboxVertical,
    // LabelTextAreaHorizontal,
    // LabelTextAreaVertical,
    Select,
    // Input,
    Label,
    Table,
    LabelInputHorizontal,
    Chip
    // Checkbox
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
    },
    created: function () {

    }
}
</script>

<style>
.card_section {
    padding: 0px 0px 0px 0px;
}

.row_section
{
    padding-left: 10px;
    right: 10px;
}

.table_wrapper{
    padding-left: 0px;
}
</style>