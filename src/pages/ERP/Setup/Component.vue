<template>
<div class="row row_section">
    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <div class="component_div">
            <TablePagination 
            :hide_footer="false" 
            :row_per_page="[20,40,60,80,100]"
            v-on:receiveRequestTable="handleTableChange" 
            :table_column="test_column" 
            :table_data="test_data" 
            :action_button="true"
            :edit_button="true"
            :view_button="true"
            :delete_button="true"
            :top_button="true"
            title="test serverside table"
            :button_no_outline="true"
            />
        </div>
    </div>
</div>

<br>
<br>
<br>
<!-- {{test_data}}
{{multiselect_value}} -->

<div class="row row_section">
    <div class="card_section col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
        <div class="component_div">
            <LabelInputHorizontal 
            :readonly="false" 
            :no_label="true" 
            :text="'Company Name'" 
            v-model:pass_value="json.companyname" 
            :dbComponentBehavior="dbComponentBehavior.companyname"/>
        </div>
    </div>
</div>


<div class="row row_section">
    <div class="card_section col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
        <div class="component_div">
            <LabelSelectHorizontal :readonly="false"  
            :no_label="true" 
            :text="'asHQ'" 
            v-model:pass_value="json.asHQ" 
            :dbComponentBehavior="dbComponentBehavior.select"
            :options="branch_options"
            />
        </div>
    </div>
</div>

<div class="row row_section">
    <div class="card_section col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
        <div class="component_div">
            <LabelMultiSelectHorizontal 
            :readonly="false"  
            :no_label="true" 
            :text="'asHQ'" 
            v-model:pass_value="multiselect_value" 
            :dbComponentBehavior="dbComponentBehavior.select"
            :options="branch_options"
            />
        </div>
    </div>
</div>


<div class="row row_section">
    <div class="card_section col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
        <div class="component_div">
            <LabelDatepickerHorizontal 
            :readonly="false"  
            :no_label="true" 
            :text="'Datepicker'" 
            v-model:pass_value="json.system_start_date" 
            :dbComponentBehavior="dbComponentBehavior.companyname"/>
        </div>
    </div>
</div>


<div class="row row_section">
    <div class="card_section col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
        <div class="component_div">
            <LabelCheckboxHorizontal
            :readonly="false" 
            :no_label="true"
            :text="'Checkbox'"
            v-model:pass_value="json.asHQ" 
            :dbComponentBehavior="dbComponentBehavior.companyname"/>
        </div>
    </div>
</div>


<div class="row row_section">
    <div class="card_section col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
        <div class="component_div">
            <LabelTextAreaHorizontal :readonly="false"  :no_label="true" :text="'Textarea'" v-model:pass_value="json.companyname" 
            :dbComponentBehavior="dbComponentBehavior.textarea"/>
        </div>
    </div>
</div>

<hr>

<div class="row row_section">
    <div class="card_section col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
        <div class="component_div">
            <LabelInputVertical :readonly="false"  :no_label="true" :text="'Company Name'" v-model:pass_value="json.companyname" 
            :dbComponentBehavior="dbComponentBehavior.companyname"/>
        </div>
    </div>
</div>

<div class="row row_section">
    <div class="card_section col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
        <div class="component_div">
            <LabelSelectVertical :readonly="false"  :no_label="true" :text="'asHQ'" v-model:pass_value="json.asHQ" 
            :dbComponentBehavior="dbComponentBehavior.select"
            :options="branch_options"
            />
        </div>
    </div>
</div>

<div class="row row_section">
    <div class="card_section col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
        <div class="component_div">
            <LabelMultiSelectVertical :readonly="false"  
            :no_label="true" :text="'asHQ'" 
            v-model:pass_value="multiselect_value" 
            :dbComponentBehavior="dbComponentBehavior.select"
            :options="branch_options"
            />
        </div>
    </div>
</div>

<div class="row row_section">
    <div class="card_section col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
        <div class="component_div">
            <LabelDatepickerVertical :readonly="false"  
            :no_label="true" 
            :text="'Datepicker'" 
            v-model:pass_value="json.system_start_date" 
            :dbComponentBehavior="dbComponentBehavior.companyname"/>
        </div>
    </div>
</div>

<div class="row row_section">
    <div class="card_section col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
        <div class="component_div">
            <LabelCheckboxVertical :readonly="false"  
            :no_label="true" 
            :text="'Checkbox'" 
            v-model:pass_value="json.asHQ" 
            :dbComponentBehavior="dbComponentBehavior.companyname"/>
        </div>
    </div>
</div>

<div class="row row_section">
    <div class="card_section col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
        <div class="component_div">
            <LabelTextAreaVertical 
            :readonly="false"  
            :no_label="true" 
            :text="'Textarea'" 
            v-model:pass_value="json.companyname" 
            :dbComponentBehavior="dbComponentBehavior.textarea"/>
        </div>
    </div>
</div>


<div class="row row_section">
    <div class="card_section col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
        <div class="component_div">
            <Input :readonly="false"  
            :no_label="true" 
            :text="'Company Name'" 
            v-model:pass_value="json.address1" 
            :dbComponentBehavior="dbComponentBehavior.address1"/>
        </div>
    </div>
</div>

<hr>


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

{{table_data}}


</template>

<script>
import LabelInputHorizontal from'src/components/ERP/General/LabelInputHorizontal' ;
import LabelInputVertical from'src/components/ERP/General/LabelInputVertical' ;
import LabelSelectHorizontal from'src/components/ERP/General/LabelSelectHorizontal' ;
import LabelSelectVertical from'src/components/ERP/General/LabelSelectVertical' ;
import LabelMultiSelectHorizontal from'src/components/ERP/General/LabelMultiSelectHorizontal' ;
import LabelMultiSelectVertical from'src/components/ERP/General/LabelMultiSelectVertical' ;
import LabelDatepickerHorizontal from'src/components/ERP/General/LabelDatepickerHorizontal' ;
import LabelDatepickerVertical from'src/components/ERP/General/LabelDatepickerVertical' ;
import LabelCheckboxHorizontal from'src/components/ERP/General/LabelCheckboxHorizontal' ;
import LabelCheckboxVertical from'src/components/ERP/General/LabelCheckboxVertical' ;
import LabelTextAreaHorizontal from'src/components/ERP/General/LabelTextAreaHorizontal' ;
import LabelTextAreaVertical from'src/components/ERP/General/LabelTextAreaVertical' ;
import TablePagination from 'src/components/ERP/Base/TablePagination';

import Input from 'src/components/ERP/Base/Input';

import Table from 'src/components/ERP/Base/Table';

export default {
    name: 'Dashboard',
    data() {
        return {
            multiselect_value: [],
            json:{
                "CompanyName":"PASARAYA PANDA SDN BHD",
                "Address1": "NO 28-1 & 30-1, JALAN PPM13,",
                "Address2": "PLAZA PANDAN MALIM BUSINESS PARK,",
                "Tel": "06-332 3966",
                "Fax": "06-332 3566",
                "asHQ": 1,
                "locgroup_branch":"PGHQ",
                "system_start_date": "2016-01-01",
            },
            branch_options: [
                {
                    "value": 0,
                    "label": "No"
                },
                {
                    "value": 1,
                    "label": "Yes"
                }
            ],
            table_title:"Table Title",
            table_data: [
                {
                    "action":"",
                    "Outlet":"HQ"
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
                    name: 'companyname',
                    required: true,
                    label: 'companyname',
                    field: 'companyname',
                    align: 'left',
                    sortable: false
                },
                {
                    name: 'address1',
                    required: true,
                    label: 'address1',
                    field: 'address1',
                    align: 'left',
                    sortable: false
                },
                {
                    name: 'address2',
                    required: true,
                    label: 'address2',
                    field: 'address2',
                    align: 'left',
                    sortable: false
                },
                {
                    name: 'tel',
                    required: true,
                    label: 'tel',
                    field: 'tel',
                    align: 'left',
                    sortable: false
                },
                {
                    name: 'fax',
                    required: true,
                    label: 'fax',
                    field: 'fax',
                    align: 'left',
                    sortable: false
                },
                {
                    name: 'ashq',
                    required: true,
                    label: 'ashq',
                    field: 'ashq',
                    align: 'left',
                    sortable: false
                },
                {
                    name: 'locgroup_bran',
                    required: true,
                    label: 'locgroup_branch',
                    field: 'locgroup_branch',
                    align: 'left',
                    sortable: false
                },
                {
                    name: 'locgroup_dc',
                    required: true,
                    label: 'locgroup_dc',
                    field: 'locgroup_dc',
                    align: 'left',
                    sortable: false
                },
                {
                    name: 'comp_code',
                    required: true,
                    label: 'comp_code',
                    field: 'comp_code',
                    align: 'left',
                    sortable: false
                },
                {
                    name: 'system_start_',
                    required: true,
                    label: 'system_start_date',
                    field: 'system_start_date',
                    align: 'left',
                    sortable: false
                },
                {
                    name: 'gst_no',
                    required: true,
                    label: 'gst_no',
                    field: 'gst_no',
                    align: 'left',
                    sortable: false
                },
                {
                    name: 'address3',
                    required: true,
                    label: 'address3',
                    field: 'address3',
                    align: 'left',
                    sortable: false
                },
                {
                    name: 'city',
                    required: true,
                    label: 'city',
                    field: 'city',
                    align: 'left',
                    sortable: false
                },
                {
                    name: 'postalcode',
                    required: true,
                    label: 'postalcode',
                    field: 'postalcode',
                    align: 'left',
                    sortable: false
                },
                {
                    name: 'state',
                    required: true,
                    label: 'state',
                    field: 'state',
                    align: 'left',
                    sortable: false
                },
                {
                    name: 'country',
                    required: true,
                    label: 'country',
                    field: 'country',
                    align: 'left',
                    sortable: false
                },
                {
                    name: 'gst_start_dat',
                    required: true,
                    label: 'gst_start_date',
                    field: 'gst_start_date',
                    align: 'left',
                    sortable: false
                },
                {
                    name: 'comp_reg_no',
                    required: true,
                    label: 'comp_reg_no',
                    field: 'comp_reg_no',
                    align: 'left',
                    sortable: false
                },
                {
                    name: 'tax_inclusive',
                    required: true,
                    label: 'tax_inclusive',
                    field: 'tax_inclusive',
                    align: 'left',
                    sortable: false
                },
                {
                    name: 'gst_submissio',
                    required: true,
                    label: 'gst_submission_cycle',
                    field: 'gst_submission_cycle',
                    align: 'left',
                    sortable: false
                },
                {
                    name: 'item_runningn',
                    required: true,
                    label: 'item_runningno_type',
                    field: 'item_runningno_type',
                    align: 'left',
                    sortable: false
                },
                {
                    name: 'item_runningn',
                    required: true,
                    label: 'item_runningno_digit',
                    field: 'item_runningno_digit',
                    align: 'left',
                    sortable: false
                },
                {
                    name: 'sst_start_dat',
                    required: true,
                    label: 'sst_start_date',
                    field: 'sst_start_date',
                    align: 'left',
                    sortable: false
                },
                {
                    name: 'gst_end_date',
                    required: true,
                    label: 'gst_end_date',
                    field: 'gst_end_date',
                    align: 'left',
                    sortable: false
                },
                {
                    name: 'sst_no',
                    required: true,
                    label: 'sst_no',
                    field: 'sst_no',
                    align: 'left',
                    sortable: false
                },
                {
                    name: 'sst_end_date',
                    required: true,
                    label: 'sst_end_date',
                    field: 'sst_end_date',
                    align: 'left',
                    sortable: false
                },
                {
                    name: 'item_runningn',
                    required: true,
                    label: 'item_runningno_itemlinkrunno',
                    field: 'item_runningno_itemlinkrunno',
                    align: 'left',
                    sortable: false
                },
                {
                    name: 'company_guid',
                    required: true,
                    label: 'company_guid',
                    field: 'company_guid',
                    align: 'left',
                    sortable: false
                },
                {
                    name: 'outlet_guid',
                    required: true,
                    label: 'outlet_guid',
                    field: 'outlet_guid',
                    align: 'left',
                    sortable: false
                }

            ],
            json_new:{},
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
                    name: 'branch_guid',
                    required: true,
                    label: 'branch_guid',
                    align: 'left',
                    field: 'branch_guid',
                    format: val => `${val}`,
                    sortable: true
                },            
                {
                    name: 'supcus_guid',
                    required: true,
                    label: 'supcus_guid',
                    align: 'left',
                    field: 'supcus_guid',
                    format: val => `${val}`,
                    sortable: true
                },            
                {
                    name: 'loc_group',
                    required: true,
                    label: 'loc_group',
                    align: 'left',
                    field: 'loc_group',
                    format: val => `${val}`,
                    sortable: true
                },            
                {
                    name: 'set_active',
                    required: true,
                    label: 'set_active',
                    align: 'left',
                    field: 'set_active',
                    format: val => `${val}`,
                    sortable: true
                },            
                {
                    name: 'created_at',
                    required: true,
                    label: 'created_at',
                    align: 'left',
                    field: 'created_at',
                    format: val => `${val}`,
                    sortable: true
                },            
                {
                    name: 'created_by',
                    required: true,
                    label: 'created_by',
                    align: 'left',
                    field: 'created_by',
                    format: val => `${val}`,
                    sortable: true
                },            
                {
                    name: 'updated_at',
                    required: true,
                    label: 'updated_at',
                    align: 'left',
                    field: 'updated_at',
                    format: val => `${val}`,
                    sortable: true
                },            
                {
                    name: 'updated_by',
                    required: true,
                    label: 'updated_by',
                    align: 'left',
                    field: 'updated_by',
                    format: val => `${val}`,
                    sortable: true
                },            
                {
                    name: 'is_ibt',
                    required: true,
                    label: 'is_ibt',
                    align: 'left',
                    field: 'is_ibt',
                    format: val => `${val}`,
                    sortable: true
                },            
                {
                    name: 'limit_control_amt',
                    required: true,
                    label: 'limit_control_amt',
                    align: 'left',
                    field: 'limit_control_amt',
                    format: val => `${val}`,
                    sortable: true
                },            
                {
                    name: 'debit_acc_code',
                    required: true,
                    label: 'debit_acc_code',
                    align: 'left',
                    field: 'debit_acc_code',
                    format: val => `${val}`,
                    sortable: true
                },            
                {
                    name: 'credit_acc_code',
                    required: true,
                    label: 'credit_acc_code',
                    align: 'left',
                    field: 'credit_acc_code',
                    format: val => `${val}`,
                    sortable: true
                },            
                {
                    name: 'isict',
                    required: true,
                    label: 'isict',
                    align: 'left',
                    field: 'isict',
                    format: val => `${val}`,
                    sortable: true
                },            
                {
                    name: 'acc_code',
                    required: true,
                    label: 'acc_code',
                    align: 'left',
                    field: 'acc_code',
                    format: val => `${val}`,
                    sortable: true
                },            
                {
                    name: 'is_gst',
                    required: true,
                    label: 'is_gst',
                    align: 'left',
                    field: 'is_gst',
                    format: val => `${val}`,
                    sortable: true
                },            
                {
                    name: 'supbulkqty',
                    required: true,
                    label: 'supbulkqty',
                    align: 'left',
                    field: 'supbulkqty',
                    format: val => `${val}`,
                    sortable: true
                },            
                {
                    name: 'outlet_ord_d1',
                    required: true,
                    label: 'outlet_ord_d1',
                    align: 'left',
                    field: 'outlet_ord_d1',
                    format: val => `${val}`,
                    sortable: true
                },            
                {
                    name: 'outlet_ord_d2',
                    required: true,
                    label: 'outlet_ord_d2',
                    align: 'left',
                    field: 'outlet_ord_d2',
                    format: val => `${val}`,
                    sortable: true
                },            
                {
                    name: 'outlet_ord_d3',
                    required: true,
                    label: 'outlet_ord_d3',
                    align: 'left',
                    field: 'outlet_ord_d3',
                    format: val => `${val}`,
                    sortable: true
                },            
                {
                    name: 'outlet_ord_d4',
                    required: true,
                    label: 'outlet_ord_d4',
                    align: 'left',
                    field: 'outlet_ord_d4',
                    format: val => `${val}`,
                    sortable: true
                },            
                {
                    name: 'outlet_ord_d5',
                    required: true,
                    label: 'outlet_ord_d5',
                    align: 'left',
                    field: 'outlet_ord_d5',
                    format: val => `${val}`,
                    sortable: true
                },            
                {
                    name: 'outlet_ord_d6',
                    required: true,
                    label: 'outlet_ord_d6',
                    align: 'left',
                    field: 'outlet_ord_d6',
                    format: val => `${val}`,
                    sortable: true
                },            
                {
                    name: 'outlet_ord_d7',
                    required: true,
                    label: 'outlet_ord_d7',
                    align: 'left',
                    field: 'outlet_ord_d7',
                    format: val => `${val}`,
                    sortable: true
                },            
                {
                    name: 'po_min_amt',
                    required: true,
                    label: 'po_min_amt',
                    align: 'left',
                    field: 'po_min_amt',
                    format: val => `${val}`,
                    sortable: true
                },            
                {
                    name: 'block_po',
                    required: true,
                    label: 'block_po',
                    align: 'left',
                    field: 'block_po',
                    format: val => `${val}`,
                    sortable: true
                }

            ],
            test_data: [],
            test_pagination: [],
        }
    },
    components: {
        LabelInputHorizontal,
        LabelInputVertical,
        LabelSelectHorizontal,
        LabelSelectVertical,
        LabelMultiSelectHorizontal,
        LabelMultiSelectVertical,
        LabelDatepickerHorizontal,
        LabelDatepickerVertical,
        LabelCheckboxHorizontal,
        LabelCheckboxVertical,
        LabelTextAreaHorizontal,
        LabelTextAreaVertical,
        Input,
        Table,
        TablePagination,
    },
    computed: {
        dbComponentBehavior() {
            return this.$store.getters['dbComponentBehavior/byLanguage']('erp')
        },
    },
    methods: {
        handleTableChange: function(newVal)
        {

            var new_params = this.$pluginsTableParams(newVal)

            var payload = {
                params : new_params
            };
            
            this.$store.dispatch('setup/trigger_branch_table_data_server_side', payload).then(() => {
                var data = JSON.parse(JSON.stringify(this.$store.getters['setup/get_branch_table_data_server_side']));

                this.test_data = data;
            });

            // {
            //     "sortBy": "desc",
            //     "descending": false,
            //     "page": 1,
            //     "rowsPerPage": 5,
            //     "rowsNumber": 10
            // }

        }
    },
    created: function () {
        
        var payload = {};
        
         this.$store.dispatch('setup/trigger_companyprofile', payload).then(() => {

                var data = JSON.parse(JSON.stringify(this.$store.getters['setup/get_companyprofile']));

                this.json_new = data;

                var CompanyProfileTableData = JSON.parse(JSON.stringify(this.$store.getters['setup/get_companyprofile_table_data']));

                this.table_data = CompanyProfileTableData;

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

</style>
