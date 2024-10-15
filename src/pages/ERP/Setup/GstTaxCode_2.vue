<template>
<div class="row row_section" style="padding: 0px; margin-bottom: 10px; margin-left: 12px;">
            <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <Chip text="Setup" icon="tune"/> / <Chip text="Currency" icon="person"/> 
            </div>
</div>
<div class="row row_section">
    <div class="card_section col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
        <div class="row row_section">
            <div class="card_section col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                <div class="component_div">
                    <LabelInputHorizontal 
                    :readonly="false" 
                    :no_label="true" 
                    :text="'Search'" 
                    v-model:pass_value="json.search" 
                    :dbComponentBehavior="dbComponentBehavior.address1"/>
                </div>
            </div>
        
            <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <div class="component_div">
                    <Table :row_per_page="[5,10,15,20,25,0]" 
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
            <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <q-dialog v-model="addPurchase">
                    <q-card class="q-card" >
                        <q-card-section class="row bg-primary text-white">
                            <Label text="Add New Records" class="text-subtitle1" style="background-color:transparent;"/>
                            <q-space/> 
                                <q-btn 
                                    v-close-popup
                                    flat 
                                    round 
                                    dense
                                    icon="close" />
                        </q-card-section>

                        <q-card-section>
                            <div class="row row_section">
                                <div class="card_section col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                    <div class="component_div">
                                        <Label text="Sequence" class="text-subtitle1" style="background-color:transparent;"/>
                                    </div>
                                </div>
                                <div class="card_section col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                                    <div class="component_div">
                                        <Input 
                                            :readonly="false"  
                                            :no_label="true" 
                                            :text="'Sequence'" 
                                            v-model="json.seq" 
                                            :dbComponentBehavior="dbComponentBehavior.address1"/>
                                    </div>
                                </div>

                            
                                <div class="card_section col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                    <div class="component_div">
                                        <Label text="Tax Type" class="text-subtitle1" style="background-color:transparent;"/>
                                    </div>
                                </div>
                                <div class="card_section col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                                    <div class="component_div">
                                        <Select 
                                            style="background-color:transparent;" 
                                            :readonly="false"  
                                            :no_label="true" 
                                            :text="'Tax Type'" 
                                            v-model="json.tax_type" 
                                            :dbComponentBehavior="dbComponentBehavior.select"
                                            :options="tax_type_options"
                                        />
                                    </div>
                                </div>  

                            
                                <div class="card_section col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                    <div class="component_div">
                                        <Label text="Tax Code" class="text-subtitle1" style="background-color:transparent;"/>
                                    </div>
                                </div>
                                <div class="card_section col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                                    <div class="component_div">
                                        <Input 
                                            :readonly="false"  
                                            :no_label="true" 
                                            :text="'Tax Code'" 
                                            v-model="json.tax_code" 
                                            :dbComponentBehavior="dbComponentBehavior.address1"/>
                                    </div>
                                </div>

                            
                                <div class="card_section col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                    <div class="component_div">
                                        <Label text="Tax Rate" class="text-subtitle1" style="background-color:transparent;"/>
                                    </div>
                                </div>
                                <div class="card_section col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                                    <div class="component_div">
                                        <Input 
                                            :readonly="false"  
                                            :no_label="true" 
                                            :text="'Tax Rate'" 
                                            v-model="json.tax_rate" 
                                            :dbComponentBehavior="dbComponentBehavior.address1"/>
                                    </div>
                                </div>

                        
                                <div class="card_section col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                    <div class="component_div">
                                        <Label text="Map Code" class="text-subtitle1" style="background-color:transparent;"/>
                                    </div>
                                </div>
                                <div class="card_section col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                                    <div class="component_div">
                                        <Input 
                                            :readonly="false"  
                                            :no_label="true" 
                                            :text="'Map Code'" 
                                            v-model="json.map_code" 
                                            :dbComponentBehavior="dbComponentBehavior.address1"/>
                                    </div>
                                </div>

                        
                                <div class="card_section col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                    <div class="component_div">
                                        <Label text="Description" class="text-subtitle1" style="background-color:transparent;"/>
                                    </div>
                                </div>
                                <div class="card_section col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                                    <div class="component_div">
                                        <Input 
                                            :readonly="false"  
                                            :no_label="true" 
                                            :text="'Description'" 
                                            v-model="json.description" 
                                            :dbComponentBehavior="dbComponentBehavior.address1"/>
                                    </div>
                                </div>

                        
                                <div class="card_section col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                    <div class="component_div">
                                        <Label text="Active" class="text-subtitle1" style="background-color:transparent;"/>
                                    </div>
                                </div>
                                <div class="card_section col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                                    <div class="component_div">
                                        <!-- <Select 
                                            style="background-color:transparent;" 
                                            :readonly="false"  
                                            :no_label="true" 
                                            :text="'Active'" 
                                            v-model="json.active" 
                                            :dbComponentBehavior="dbComponentBehavior.select"
                                            :options="active_options"
                                        /> -->
                                        <Checkbox
                                            :readonly="false"
                                            :no_label="true"
                                            :text="'Active'"
                                            v-model="json.active"
                                            :dbComponentBehavior="dbComponentBehavior.address1" />
                                    </div>
                                </div>

                        
                                <div class="card_section col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                    <div class="component_div">
                                        <Label text="Default" class="text-subtitle1" style="background-color:transparent;"/>
                                    </div>
                                </div>
                                <div class="card_section col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                                    <div class="component_div">
                                        <Checkbox
                                            :readonly="false"
                                            :no_label="true"
                                            :text="'Default'"
                                            v-model="json.default"
                                            :dbComponentBehavior="dbComponentBehavior.address1" />
                                    </div>
                                </div>

                            
                                <div class="card_section col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                    <div class="component_div">
                                        <Label text="Exempted" class="text-subtitle1" style="background-color:transparent;"/>
                                    </div>
                                </div>
                                <div class="card_section col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                                    <div class="component_div">
                                        <Checkbox
                                            :readonly="false"
                                            :no_label="true"
                                            :text="'Exempted'"
                                            v-model="json.exempted"
                                            :dbComponentBehavior="dbComponentBehavior.address1" />
                                    </div>
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
    <div class="card_section col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
        <div class="row row_section">
            <div class="card_section col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                <div class="component_div">
                    <LabelInputHorizontal 
                    :readonly="false" 
                    :no_label="true" 
                    :text="'Search'" 
                    v-model:pass_value="json.search1" 
                    :dbComponentBehavior="dbComponentBehavior.address1"/>
                </div>
            </div>
            <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <div class="component_div">
                    <Table :row_per_page="[5,10,15,20,25,0]" 
                    :top_button="true" 
                    v-on:head_button="addButton1" 
                    v-on:main_action="handleAction1" 
                    v-on:main_edit="handleEdit1" 
                    v-on:main_list="handleList1" 
                    v-on:main_delete="handleDelete1" 
                    :title="table_title1" 
                    :table_data="table_data1" 
                    :table_column="table_column1"
                    :action_button="true"
                    :edit_button="true"
                    :view_button="true"
                    :delete_button="true"
                    />
                </div>
            </div>
            <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <q-dialog v-model="addSupply">
                    <q-card class="q-card" >
                        <q-card-section class="row bg-primary text-white">
                            <Label text="Add New Records" class="text-subtitle1" style="background-color:transparent;"/>
                            <q-space/> 
                                <q-btn 
                                    v-close-popup
                                    flat 
                                    round 
                                    dense
                                    icon="close" />
                        </q-card-section>

                        <q-card-section>
                            <div class="row row_section">
                                <div class="card_section col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                    <div class="component_div">
                                        <Label text="Sequence" class="text-subtitle1" style="background-color:transparent;"/>
                                    </div>
                                </div>
                                <div class="card_section col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                                    <div class="component_div">
                                        <Input 
                                            :readonly="false"  
                                            :no_label="true" 
                                            :text="'Sequence'" 
                                            v-model="json.seq1" 
                                            :dbComponentBehavior="dbComponentBehavior.address1"/>
                                    </div>
                                </div>

                            
                                <div class="card_section col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                    <div class="component_div">
                                        <Label text="Tax Type" class="text-subtitle1" style="background-color:transparent;"/>
                                    </div>
                                </div>
                                <div class="card_section col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                                    <div class="component_div">
                                        <Select 
                                            style="background-color:transparent;" 
                                            :readonly="false"  
                                            :no_label="true" 
                                            :text="'Tax Type'" 
                                            v-model="json.tax_type1" 
                                            :dbComponentBehavior="dbComponentBehavior.select"
                                            :options="tax_type_options1"
                                        />
                                    </div>
                                </div> 

                            
                                <div class="card_section col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                    <div class="component_div">
                                        <Label text="Tax Code" class="text-subtitle1" style="background-color:transparent;"/>
                                    </div>
                                </div>
                                <div class="card_section col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                                    <div class="component_div">
                                        <Input 
                                            :readonly="false"  
                                            :no_label="true" 
                                            :text="'Tax Code'" 
                                            v-model="json.tax_code1" 
                                            :dbComponentBehavior="dbComponentBehavior.address1"/>
                                    </div>
                                </div>

                            
                                <div class="card_section col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                    <div class="component_div">
                                        <Label text="Tax Rate" class="text-subtitle1" style="background-color:transparent;"/>
                                    </div>
                                </div>
                                <div class="card_section col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                                    <div class="component_div">
                                        <Input 
                                            :readonly="false"  
                                            :no_label="true" 
                                            :text="'Tax Rate'" 
                                            v-model="json.tax_rate1" 
                                            :dbComponentBehavior="dbComponentBehavior.address1"/>
                                    </div>
                                </div>

                            
                                <div class="card_section col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                    <div class="component_div">
                                        <Label text="Map Code" class="text-subtitle1" style="background-color:transparent;"/>
                                    </div>
                                </div>
                                <div class="card_section col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                                    <div class="component_div">
                                        <Input 
                                            :readonly="false"  
                                            :no_label="true" 
                                            :text="'Map Code'" 
                                            v-model="json.map_code1" 
                                            :dbComponentBehavior="dbComponentBehavior.address1"/>
                                    </div>
                                </div>

                            
                                <div class="card_section col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                    <div class="component_div">
                                        <Label text="Description" class="text-subtitle1" style="background-color:transparent;"/>
                                    </div>
                                </div>
                                <div class="card_section col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                                    <div class="component_div">
                                        <Input 
                                            :readonly="false"  
                                            :no_label="true" 
                                            :text="'Description'" 
                                            v-model="json.description1" 
                                            :dbComponentBehavior="dbComponentBehavior.address1"/>
                                    </div>
                                </div>

                            
                                <div class="card_section col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                    <div class="component_div">
                                        <Label text="Active" class="text-subtitle1" style="background-color:transparent;"/>
                                    </div>
                                </div>
                                <div class="card_section col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                                    <div class="component_div">
                                        <Checkbox
                                            :readonly="false"
                                            :no_label="true"
                                            :text="'Active'"
                                            v-model="json.active1"
                                            :dbComponentBehavior="dbComponentBehavior.address1" />
                                    </div>
                                </div>

                        
                                <div class="card_section col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                    <div class="component_div">
                                        <Label text="Default" class="text-subtitle1" style="background-color:transparent;"/>
                                    </div>
                                </div>
                                <div class="card_section col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                                    <div class="component_div">
                                        <Checkbox
                                            :readonly="false"
                                            :no_label="true"
                                            :text="'Default'"
                                            v-model="json.default1"
                                            :dbComponentBehavior="dbComponentBehavior.address1" />
                                    </div>
                                </div>
                            
                                <div class="card_section col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                    <div class="component_div">
                                        <Label text="Exempted" class="text-subtitle1" style="background-color:transparent;"/>
                                    </div>
                                </div>
                                <div class="card_section col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                                    <div class="component_div">
                                        <Checkbox
                                            :readonly="false"
                                            :no_label="true"
                                            :text="'Exempted'"
                                            v-model="json.exempted1"
                                            :dbComponentBehavior="dbComponentBehavior.address1" />
                                    </div>
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
</div>

</template>

<script>
import LabelInputHorizontal from'src/components/ERP/General/LabelInputHorizontal' ;
// import LabelInputVertical from'src/components/ERP/General/LabelInputVertical' ;
// import LabelSelectHorizontal from'src/components/ERP/General/LabelSelectHorizontal' ;
// import LabelSelectVertical from'src/components/ERP/General/LabelSelectVertical' ;
// import LabelMultiSelectHorizontal from'src/components/ERP/General/LabelMultiSelectHorizontal' ;
// import LabelMultiSelectVertical from'src/components/ERP/General/LabelMultiSelectVertical' ;
// import LabelDatepickerHorizontal from'src/components/ERP/General/LabelDatepickerHorizontal' ;
// import LabelDatepickerVertical from'src/components/ERP/General/LabelDatepickerVertical' ;
// import LabelCheckboxHorizontal from'src/components/ERP/General/LabelCheckboxHorizontal' ;
// import LabelCheckboxVertical from'src/components/ERP/General/LabelCheckboxVertical' ;
// import LabelTextAreaHorizontal from'src/components/ERP/General/LabelTextAreaHorizontal' ;
// import LabelTextAreaVertical from'src/components/ERP/General/LabelTextAreaVertical' ;
import Chip from 'src/components/ERP/Base/Chip';
import Input from 'src/components/ERP/Base/Input';
import Label from 'src/components/ERP/Base/Label';
import Table from 'src/components/ERP/Base/Table';
import Select from 'src/components/ERP/Base/Select';
import Checkbox from 'src/components/ERP/Base/Checkbox';

export default {
    name: 'Dashboard',
    data() {
        return {
            addPurchase: false,
            addSupply: false,
            multiselect_value: [],
            json:{
                "search":"",
                "seq":"",
                "tax_type": 1001,
                "tax_code": "",
                "tax_rate": "",
                "map_code": "",
                "description": "",
                "active": false,
                "default": false,
                "exempted": false,
                "search1":"",
                "seq1":"",
                "tax_type1": 1001,
                "tax_code1": "",
                "tax_rate1": "",
                "map_code1": "",
                "description1": "",
                "active1": false,
                "default1": false,
                "exempted1": false,
            },
            tax_type_options: [
                {
                    "value": 1001,
                    "label": "GST"
                },
                {
                    "value": 1002,
                    "label": "GST*"
                },
                {
                    "value": 1003,
                    "label": "SST"
                },
            ],
            // active_options: [
            //     {
            //         "value": "yes",
            //         "label": "yes"
            //     },
            //     {
            //         "value": "no",
            //         "label": "no"
            //     },
            // ],
            // default_options: [
            //     {
            //         "value": "yes",
            //         "label": "yes"
            //     },
            //     {
            //         "value": "no",
            //         "label": "no"
            //     },
            // ],
            // exempted_options: [
            //     {
            //         "value": "yes",
            //         "label": "yes"
            //     },
            //     {
            //         "value": "no",
            //         "label": "no"
            //     },
            // ],
            tax_type_options1: [
                {
                    "value": 1001,
                    "label": "GST"
                },
                {
                    "value": 1002,
                    "label": "GST*"
                },
                {
                    "value": 1003,
                    "label": "SST"
                },
            ],
            // active_options1: [
            //     {
            //         "value": "yes",
            //         "label": "yes"
            //     },
            //     {
            //         "value": "no",
            //         "label": "no"
            //     },
            // ],
            // default_options1: [
            //     {
            //         "value": "yes",
            //         "label": "yes"
            //     },
            //     {
            //         "value": "no",
            //         "label": "no"
            //     },
            // ],
            // exempted_options1: [
            //     {
            //         "value": "yes",
            //         "label": "yes"
            //     },
            //     {
            //         "value": "no",
            //         "label": "no"
            //     },
            // ],
            table_title:"Purchase",
            table_data: [
                {
                    "action":"",
                    "active":"yes",
                    "default":"no",
                    "tax_type": "GST",
                    "seq": "3",
                    "exempted": "yes",
                    "effective_date": "3",
                    "tax_code": "IS",
                    "tax_rate": "0",
                    "map_code": "",
                    "description": "Imports under special scheme with no GST incurred (e.g. Approved Trader Scheme,  ATMS Scheme",
                },
                {
                    "action":"",
                    "active":"yes",
                    "default":"no",
                    "tax_type": "GST*",
                    "seq": "4",
                    "exempted": "yes",
                    "effective_date": "4",
                    "tax_code": "BL",
                    "tax_rate": "6",
                    "map_code": "",
                    "description": "Purchases with GST incurred but not claimable (Disallowance of Input Tax) (e.g. medical expenses for staff)",
                },
                {
                    "action":"",
                    "active":"yes",
                    "default":"no",
                    "tax_type": "GST",
                    "seq": "5",
                    "exempted": "yes",
                    "effective_date": "5",
                    "tax_code": "NR",
                    "tax_rate": "0",
                    "map_code": "A1",
                    "description": "Purchase from non GST-registered supplier with no GST incurred",
                },
                {
                    "action":"",
                    "active":"yes",
                    "default":"no",
                    "tax_type": "GST",
                    "seq": "6",
                    "exempted": "yes",
                    "effective_date": "6",
                    "tax_code": "ZP",
                    "tax_rate": "0",
                    "map_code": "A2",
                    "description": "Purchase from GST-registered supplier with no GST incurred. (e.g. supplier provides transportation of goods that qualify as international services)",
                },
                {
                    "action":"",
                    "active":"yes",
                    "default":"no",
                    "tax_type": "EP",
                    "seq": "7", 
                    "exempted": "yes",
                    "effective_date": "7",
                    "tax_code": "NR",
                    "tax_rate": "0",
                    "map_code": "",
                    "description": "Purchases exempted from GST. E.g purchase of residential property or financial services",
                },
                {
                    "action":"",
                    "active":"yes",
                    "default":"no",
                    "tax_type": "OP",
                    "seq": "8",
                    "exempted": "yes",
                    "effective_date": "8",
                    "tax_code": "NR",
                    "tax_rate": "0",
                    "map_code": "P4",
                    'description': "Purchase transactions which is out of the scope of GST legislation (e.g. purchase of goods overseas)",
                },
                {
                    "action":"",
                    "active":"yes",
                    "default":"no",
                    "tax_type": "GP",
                    "seq": "12",
                    "exempted": "yes",
                    "effective_date": "12",
                    "tax_code": "NR",
                    "tax_rate": "0",
                    "map_code": "",
                    "description": "Purchase transactions which disregarded under GST legislation (e.g. purchase within GST group registration)",
                },
                {
                    "action":"",
                    "active":"yes",
                    "default":"no",
                    "tax_type": "AJP",
                    "seq": "13",
                    "exempted": "yes",
                    "effective_date": "13",
                    "tax_code": "NR",
                    "tax_rate": "0",
                    "map_code": "",
                    "description": "Any adjustment made to Input Tax e.g : Bad Debt Relief, Debit Note * other input tax adjustment",
                },
                {
                    "action":"",
                    "active":"yes",
                    "default":"no",
                    "tax_type": "IM-GDS",
                    "seq": "14",
                    "exempted": "yes",
                    "effective_date": "14",
                    "tax_code": "NR",
                    "tax_rate": "0",
                    "map_code": "",
                    "description": "GST code used for Import for AutoCount Financial Accounting",
                },
                {
                    "action":"",
                    "active":"yes",
                    "default":"no",
                    "tax_type": "TX-0",
                    "seq": "16",
                    "exempted": "yes",
                    "effective_date": "16",
                    "tax_code": "TX-0",
                    "tax_rate": "0",
                    "map_code": "A1",
                    "description": "Purchases with GST incurred at 0% and directly attributable to taxable supplies",
                },
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
                    "align": "left",
                    "field": "active",
                    "sortable": true,
                    "name": "active",
                    "label": "Active",
                    "format_child": "$",
                },
                {
                    "align": "left",
                    "field": "default",
                    "sortable": true,
                    "name": "default",
                    "label": "Default",
                    "format_child": "$",
                },
                {
                    "align": "left",
                    "field": "tax_type",
                    "sortable": true,
                    "name": "tax_type",
                    "label": "Tax Type",
                    "format_child": "$",
                },
                {
                    "align": "right",
                    "field": "seq",
                    "sortable": true,
                    "name": "seq",
                    "label": "Seq",
                    "format_child": "$",
                },
                {
                    "align": "left",
                    "field": "exempted",
                    "sortable": true,
                    "name": "exempted",
                    "label": "Exempted",
                    "format_child": "$",
                },
                {
                    "align": "right",
                    "field": "effective_date",
                    "sortable": true,
                    "name": "effective_date",
                    "label": "Effective Date",
                    "format_child": "$",
                },
                {
                    "align": "left",
                    "field": "tax_code",
                    "sortable": true,
                    "name": "tax_code",
                    "label": "Tax Code",
                    "format_child": "$",
                },
                {
                    "align": "right",
                    "field": "tax_rate",
                    "sortable": true,
                    "name": "tax_rate",
                    "label": "Tax Rate",
                    "format_child": "$",
                },
                {
                    "align": "left",
                    "field": "map_code",
                    "sortable": true,
                    "name": "map_code",
                    "label": "Map Code",
                    "format_child": "$",
                },
                {
                    "align": "left",
                    "field": "description",
                    "sortable": true,
                    "name": "description",
                    "label": "Description",
                    "format_child": "$",
                },
            ],
            table_title1:"Supply",
            table_data1: [
                {
                    "action":"",
                    "active":"yes",
                    "default":"no",
                    "tax_type": "GST",
                    "seq": "1",
                    "exempted": "yes",
                    "effective_date": "1",
                    "tax_code": "SR",
                    "tax_rate": "6",
                    "map_code": "Q0",
                    "description": "Standard-rated supplies with GST charged",
                },
                {
                    "action":"",
                    "active":"yes",
                    "default":"no",
                    "tax_type": "GST",
                    "seq": "2",
                    "exempted": "yes",
                    "effective_date": "2",
                    "tax_code": "ZRL",
                    "tax_rate": "0",
                    "map_code": "P0",
                    "description": "Zero rated supplies",
                },
                {
                    "action":"",
                    "active":"yes",
                    "default":"no",
                    "tax_type": "GST*",
                    "seq": "4",
                    "exempted": "yes",
                    "effective_date": "4",
                    "tax_code": "ES43",
                    "tax_rate": "0",
                    "map_code": "",
                    "description": "Non incidental Exempt supplies",
                },
                {
                    "action":"",
                    "active":"yes",
                    "default":"no",
                    "tax_type": "GST",
                    "seq": "5",
                    "exempted": "yes",
                    "effective_date": "5",
                    "tax_code": "DS",
                    "tax_rate": "6",
                    "map_code": "",
                    "description": "Deemed supplies (e.g. transfer or disposal of business assets without consideration)",
                },
                {
                    "action":"",
                    "active":"yes",
                    "default":"no",
                    "tax_type": "GST",
                    "seq": "6",
                    "exempted": "yes",
                    "effective_date": "6",
                    "tax_code": "OS",
                    "tax_rate": "0",
                    "map_code": "A4",
                    "description": "Out-of-scope supplies",
                },
                {
                    "action":"",
                    "active":"yes",
                    "default":"no",
                    "tax_type": "ES",
                    "seq": "7",
                    "exempted": "yes",
                    "effective_date": "7",
                    "tax_code": "ES43",
                    "tax_rate": "0",
                    "map_code": "",
                    "description": "Exempt supplies under GST",
                },
                {
                    "action":"",
                    "active":"yes",
                    "default":"no",
                    "tax_type": "RS",
                    "seq": "8",
                    "exempted": "yes",
                    "effective_date": "8",
                    "tax_code": "ES43",
                    "tax_rate": "0",
                    "map_code": "",
                    "description": "Relief supply under GST",
                },
                {
                    "action":"",
                    "active":"yes",
                    "default":"no",
                    "tax_type": "GST",
                    "seq": "9",
                    "exempted": "yes",
                    "effective_date": "9",
                    "tax_code": "GS",
                    "tax_rate": "0",
                    "map_code": "",
                    "description": "Disregarded supplies",
                },
                {
                    "action":"",
                    "active":"yes",
                    "default":"no",
                    "tax_type": "AJS",
                    "seq": "10",
                    "exempted": "yes",
                    "effective_date": "10",
                    "tax_code": "ES43",
                    "tax_rate": "6",
                    "map_code": "",
                    "description": "Any adjustment made to Output Tax e.g:Longer period adjustment, Bad Debt recover & other output tax adjustment",
                },
                {
                    "action":"",
                    "active":"yes",
                    "default":"no",
                    "tax_type": "GST",
                    "seq": "3",
                    "exempted": "yes",
                    "effective_date": "3",
                    "tax_code": "ZRE",
                    "tax_rate": "0",
                    "map_code": "",
                    "description": "Exportation of goods or services which are subject to zero rated supplies",
                },
                {
                    "action":"",
                    "active":"yes",
                    "default":"no",
                    "tax_type": "GST",
                    "seq": "15",
                    "exempted": "yes",
                    "effective_date": "15",
                    "tax_code": "SR-0",
                    "tax_rate": "0",
                    "map_code": "SR-0",
                    "description": "Standard-Rated Supplies with 0% GST",
                },
                {
                    "action":"",
                    "active":"yes",
                    "default":"no",
                    "tax_type": "SST",
                    "seq": "17",
                    "exempted": "yes",
                    "effective_date": "17",
                    "tax_code": "SL",
                    "tax_rate": "10",
                    "map_code": "",
                    "description": "Sales Tax 10%",
                },
                {
                    "action":"",
                    "active":"yes",
                    "default":"no",
                    "tax_type": "SST",
                    "seq": "18",
                    "exempted": "yes",
                    "effective_date": "18",
                    "tax_code": "SL-5",
                    "tax_rate": "5",
                    "map_code": "",
                    "description": "Sales Tax 5%",
                },
                {
                    "action":"",
                    "active":"yes",
                    "default":"no",
                    "tax_type": "SST",
                    "seq": "19",
                    "exempted": "yes",
                    "effective_date": "19",
                    "tax_code": "SV",
                    "tax_rate": "6",
                    "map_code": "",
                    "description": "Sales Tax 6%",
                },
            ],
            table_column1: [
                {
                    name: 'action',
                    required: true,
                    label: 'Actions',
                    align: 'left',
                    sortable: false
                },
                 {
                    "align": "left",
                    "field": "active",
                    "sortable": true,
                    "name": "active",
                    "label": "Active",
                    "format_child": "$",
                },
                {
                    "align": "left",
                    "field": "default",
                    "sortable": true,
                    "name": "default",
                    "label": "Default",
                    "format_child": "$",
                },
                {
                    "align": "left",
                    "field": "tax_type",
                    "sortable": true,
                    "name": "tax_type",
                    "label": "Tax Type",
                    "format_child": "$",
                },
                {
                    "align": "right",
                    "field": "seq",
                    "sortable": true,
                    "name": "seq",
                    "label": "Seq",
                    "format_child": "$",
                },
                {
                    "align": "left",
                    "field": "exempted",
                    "sortable": true,
                    "name": "exempted",
                    "label": "Exempted",
                    "format_child": "$",
                },
                {
                    "align": "right",
                    "field": "effective_date",
                    "sortable": true,
                    "name": "effective_date",
                    "label": "Effective Date",
                    "format_child": "$",
                },
                {
                    "align": "left",
                    "field": "tax_code",
                    "sortable": true,
                    "name": "tax_code",
                    "label": "Tax Code",
                    "format_child": "$",
                },
                {
                    "align": "right",
                    "field": "tax_rate",
                    "sortable": true,
                    "name": "tax_rate",
                    "label": "Tax Rate",
                    "format_child": "$",
                },
                {
                    "align": "left",
                    "field": "map_code",
                    "sortable": true,
                    "name": "map_code",
                    "label": "Map Code",
                    "format_child": "$",
                },
                {
                    "align": "left",
                    "field": "description",
                    "sortable": true,
                    "name": "description",
                    "label": "Description",
                    "format_child": "$",
                },
            ],
        }
    },
    components: {
        LabelInputHorizontal,
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
        // Input,
        Table,
        Label,
        Select,
        Input,
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
            this.addPurchase = true
        },
        addButton1: function(payload)
        {
            this.addSupply = true
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

.q-card{
    width: 700px;
    max-width: 800vw;
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
