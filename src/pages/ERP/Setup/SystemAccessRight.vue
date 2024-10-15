<template>
<div class="row row_section" style="padding: 0px; margin-bottom: 10px; margin-left: 12px;">
            <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">

                <Chip text="Setup" icon="tune"/> / <Chip text="System Access Right" icon="business"/> 

            </div>
</div>
    <div class="row row_section">
        <div class="card_section col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
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
            <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <q-dialog v-model="addAccessRight">
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
                                <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <div class="component_div">
                                        <Label text="Group Code" class="text-subtitle1" style="background-color:transparent;"/>
                                        <Input 
                                            :readonly="false"  
                                            :no_label="true" 
                                            :text="'Group Code'" 
                                            v-model="json.group_code" 
                                            :dbComponentBehavior="dbComponentBehavior.address1"/>
                                    </div>
                                </div>
                            
                                <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <div class="component_div">
                                        <Label text="Description" class="text-subtitle1" style="background-color:transparent;"/>
                                        <Input 
                                            :readonly="false"  
                                            :no_label="true" 
                                            :text="'Description'" 
                                            v-model="json.description" 
                                            :dbComponentBehavior="dbComponentBehavior.address1"/>
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
  
        <div class="card_section col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
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
                :top_button="false" 
                v-on:head_button="addButton1" 
                v-on:main_action="handleAction1" 
                v-on:main_edit="handleEdit1" 
                v-on:main_list="handleList1" 
                v-on:main_delete="handleDelete1" 
                :title="table_title1" 
                :table_data="table_data1" 
                :table_column="table_column1"
                :action_button="false"
                :edit_button="false"
                :view_button="false"
                :delete_button="false"
                />
            </div>
        </div>
 
        <div class="card_section col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
            <div class="component_div">
                <LabelInputHorizontal 
                :readonly="false" 
                :no_label="true" 
                :text="'Search'" 
                v-model:pass_value="json.search2" 
                :dbComponentBehavior="dbComponentBehavior.address1"/>
            </div>
        </div>

        <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div class="component_div">
                <Table :row_per_page="[5,10,15,20,25,0]" 
                :top_button="false" 
                v-on:head_button="addButton2" 
                v-on:main_action="handleAction2" 
                v-on:main_edit="handleEdit2" 
                v-on:main_list="handleList2" 
                v-on:main_delete="handleDelete2" 
                :title="table_title2" 
                :table_data="table_data2" 
                :table_column="table_column2"
                :action_button="false"
                :edit_button="false"
                :view_button="false"
                :delete_button="false"
                />
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

// import Input from 'src/components/ERP/Base/Input';

import Table from 'src/components/ERP/Base/Table';
import Label from 'src/components/ERP/Base/Label';
import Input from 'src/components/ERP/Base/Input';
import Chip from 'src/components/ERP/Base/Chip';
export default {
    name: 'Dashboard',
    data() {
        return {
            addAccessRight: false,
            multiselect_value: [],
            json:{
                "search":"",
                "group_code": "",
                "description": "",
                "search1":"",
                "search2":"",
            },
            table_title:"System Access Right Assignment",
            table_data: [
                // {
                //     "action":"",
                //     "Outlet":"HQ"
                // },
                {
                    "group_code": "ACCCLERK",
                    "description": "ACCOUNT CLERK",
                },
                {
                    "group_code": "ADMASST",
                    "description": "ADMIN ASSISTANT",
                },
                {
                    "group_code": "ASSTMGR",
                    "description": "ASSISTANT MANAGER",
                },
                {
                    "group_code": "EXE",
                    "description": "EXECUTIVE",
                },
                {
                    "group_code": "GR MT",
                    "description": "GOOD RECEIVING MANAGEMENT TRAINEE",
                },
                {
                    "group_code": "INACTIVE",
                    "description": "NOT ACTIVE",
                },
                {
                    "group_code": "M.TRAINEE",
                    "description": "MANAGEMENT TRAINEE",
                },
                {
                    "group_code": "M.TRAINEE2",
                    "description": "MANAGEMENT TRAINEE 2",
                },
                {
                    "group_code": "MASTER",
                    "description": "CO-SUPERUSER",
                },
                {
                    "group_code": "MGR",
                    "description": "MANAGER",
                },
                {
                    "group_code": "MIS CLERK",
                    "description": "MIS CLERK",
                },
                {
                    "group_code": "PO",
                    "description": "PO CLERK",
                },
                {
                    "group_code": "S.EXE",
                    "description": "SENIOR EXECUTIVE",
                },
                {
                    "group_code": "SENIOR MIS",
                    "description": "SENIOR MIS",
                },
                {
                    "group_code": "SUPER",
                    "description": "System generated. All access right were granted",
                },
                {
                    "group_code": "SUPPORT",
                    "description": "TEAM SUPPORT",
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
                    "field": "group_code",
                    "sortable": true,
                    "name": "group_code",
                    "label": "Group Code",
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
            // table_title1:"Table Title",
            table_data1: [
                // {
                //     "action":"",
                //     "Outlet":"HQ"
                // },
                {
                    "module": "Setup",
                    "type": "Account Code",
                },
                {
                    "module": "Housekeeping",
                    "type": "Accounting Manager",
                },
                {
                    "module": "Setup",
                    "type": "Accounting System",
                },
                {
                    "module": "Application",
                    "type": "Application related to KC IMS",
                },
                {
                    "module": "Item Master",
                    "type": "Assorted Item",
                },
                {
                    "module": "Stock",
                    "type": "Bill of Material",
                },
                {
                    "module": "Setup",
                    "type": "Closing Period",
                },
                {
                    "module": "Setup",
                    "type": "Color",
                },
                {
                    "module": "Setup",
                    "type": "Company Profile",
                },
                {
                    "module": "Setup",
                    "type": "Country",
                },
                {
                    "module": "Purchase",
                    "type": "CPO",
                },
                {
                    "module": "Sales",
                    "type": "Credit Note",
                },
                {
                    "module": "Setup",
                    "type": "Customer",
                },
                {
                    "module": "Housekeeping",
                    "type": "Database Manager",
                },
                {
                    "module": "Purchase",
                    "type": "Debit Note",
                },
                {
                    "module": "Setup",
                    "type": "Department",
                },
                {
                    "module": "Promotion",
                    "type": "Display Incentive Scheme",
                },
                {
                    "module": "Item Master",
                    "type": "Download Center",
                },
                {
                    "module": "Item Master",
                    "type": "Enquiry",
                },
                {
                    "module": "Stock",
                    "type": "Exchanged Note",
                },
            ],
            table_column1: [
                // {
                //     name: 'action',
                //     required: true,
                //     label: 'Actions',
                //     align: 'left',
                //     sortable: false
                // },
                {
                    "align": "left",
                    "field": "module",
                    "sortable": true,
                    "name": "module",
                    "label": "Module",
                    "format_child": "$",
                },
                {
                    "align": "left",
                    "field": "type",
                    "sortable": true,
                    "name": "type",
                    "label": "Type",
                    "format_child": "$",
                },
            ],
            // table_title2:"Table Title",
            table_data2: [
                // {
                //     "action":"",
                //     "Outlet":"HQ"
                // }
                {
                    "active": "no",
                    "name": "Add",
                    "description": "Add record",
                },
                {
                    "active": "no",
                    "name": "Browse",
                    "description": "Browse record",
                },
                {
                    "active": "no",
                    "name": "Delete",
                    "description": "Delete record",
                },
                {
                    "active": "no",
                    "name": "Edit",
                    "description": "Modify record",
                }
            ],
            table_column2: [
                // {
                //     name: 'action',
                //     required: true,
                //     label: 'Actions',
                //     align: 'left',
                //     sortable: false
                // },
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
                    "field": "name",
                    "sortable": true,
                    "name": "name",
                    "label": "Name",
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
        Input,
        Table,
        Label,
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
            this.addAccessRight = true
        },
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
.q-card{
    width: 700px;
    max-width: 800vw;
}

.table_wrapper{
    padding-left: 0px;
}
</style>
