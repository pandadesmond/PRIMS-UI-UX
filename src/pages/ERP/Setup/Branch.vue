<template>
<div class="row row_section" style="padding: 0px; margin-bottom: 10px; margin-left: 12px;">
    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <Chip text="Setup" icon="tune"/> / <Chip text="Branch" icon="business"/>
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
            :dbComponentBehavior="dbComponentBehavior.text"/>
        </div>
    </div>

    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <div class="component_div">
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
        </div>
    </div>

    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <div class="component_div">
            <TablePagination 
            :hide_footer="false" 
             :button_no_outline="true"
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
            title="Branch serverside table"
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
// import Label from 'src/components/ERP/Base/Label';
import TablePagination from 'src/components/ERP/Base/TablePagination';
import Chip from 'src/components/ERP/Base/Chip';
// import Select from 'src/components/ERP/Base/Select';
// import Checkbox from 'src/components/ERP/Base/Checkbox';
import { Notify } from "quasar";
import { Loading, QSpinnerTail } from 'quasar';
// import Button from 'src/components/Base/Button';

export default {
    name: 'Dashboard',
    data() {
        return {
            addBranch: false,
            editBranch: false,
            json:{},
            empty:{},
            table_title:"Setup-Branch",
            table_data: [],
            table_column: [
                {
                    name: 'action',
                    required: true,
                    label: 'Actions',
                    align: 'left',
                    sortable: false
                },
                {
                    align: 'left',
                    field: 'loc_group',
                    sortable: true,
                    name: 'loc_group',
                    label: 'Location Group',
                    required: true,
                },
                {
                    align: 'right',
                    field: 'set_active',
                    sortable: true,
                    name: 'set_active',
                    label: 'Active',
                    required: true,
                },
                {
                    align: 'right',
                    field: 'debit_acc_code',
                    sortable: true,
                    name: 'debit_acc_code',
                    label: 'Debit Account Code',
                    required: true,
                },
                {
                    align: 'right',
                    field: 'credit_acc_code',
                    sortable: true,
                    name: 'credit_acc_code',
                    label: 'Credit Account Code',
                    required: true,
                },
                {
                    align: 'right',
                    field: 'acc_code',
                    sortable: true,
                    name: 'acc_code',
                    label: 'Account Code',
                    required: true,
                },
                {
                    align: 'left',
                    field: 'created_at',
                    sortable: true,
                    name: 'created_at',
                    label: 'Created at',
                    required: true,
                },
                {
                    align: 'left',
                    field: 'created_by',
                    sortable: true,
                    name: 'created_by',
                    label: 'Created by',
                    required: true,
                },
                {
                    align: 'left',
                    field: 'updated_at',
                    sortable: true,
                    name: 'updated_at',
                    label: 'Updated at',
                    required: true,
                },
                {
                    align: 'left',
                    field: 'updated_by',
                    sortable: true,
                    name: 'updated_by',
                    label: 'Updated by',
                    required: true,
                },
            ],
            test_data: [],
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
                    name: 'loc_group',
                    required: true,
                    label: 'Location Group',
                    align: 'left',
                    field: 'loc_group',
                    format: val => `${val}`,
                    sortable: true
                },            
                {
                    name: 'set_active',
                    required: true,
                    label: 'Active',
                    align: 'right',
                    field: 'set_active',
                    format: val => `${val}`,
                    sortable: true
                },     
                {
                    name: 'debit_acc_code',
                    required: true,
                    label: 'Debit Account Code',
                    align: 'right',
                    field: 'debit_acc_code',
                    format: val => `${val}`,
                    sortable: true
                },            
                {
                    name: 'credit_acc_code',
                    required: true,
                    label: 'Credit Account Code',
                    align: 'right',
                    field: 'credit_acc_code',
                    format: val => `${val}`,
                    sortable: true
                },         
                {
                    name: 'acc_code',
                    required: true,
                    label: 'Account Code',
                    align: 'right',
                    field: 'acc_code',
                    format: val => `${val}`,
                    sortable: true
                },       
                {
                    name: 'created_at',
                    required: true,
                    label: 'Created at',
                    align: 'left',
                    field: 'created_at',
                    format: val => `${val}`,
                    sortable: true
                },            
                {
                    name: 'created_by',
                    required: true,
                    label: 'Created by',
                    align: 'left',
                    field: 'created_by',
                    format: val => `${val}`,
                    sortable: true
                },            
                {
                    name: 'updated_at',
                    required: true,
                    label: 'Updated at',
                    align: 'left',
                    field: 'updated_at',
                    format: val => `${val}`,
                    sortable: true
                },            
                {
                    name: 'updated_by',
                    required: true,
                    label: 'Updated by',
                    align: 'left',
                    field: 'updated_by',
                    format: val => `${val}`,
                    sortable: true
                },                     
            ],
            payload1: {},
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
        // Label,
        TablePagination,
        Chip,
        // Select,
        // Checkbox,
        // Button,
    },
    computed: {
        dbComponentBehavior() {
            return this.$store.getters['dbComponentBehavior/byLanguage']('erp')
        },
    },
    methods: {
        addButton: function()
        {
            this.empty.add_branch=true
            this.empty.edit_branch=false
            this.$router.push({
                name: "BranchDetails",
                params: {  data: JSON.stringify(this.empty)  }, 
            });
        },
        handleAction: function(payload)
        {
            this.payload1= payload
            this.payload1.add_branch=false
            this.payload1.edit_branch=true
            this.$router.push({
                name: "BranchDetails",
                params: {  data: JSON.stringify(this.payload1)  },
            });
        },
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
        }
    },
    created: function () {
        var payload = {};
        this.$store.dispatch('setup/trigger_branch_table_data', payload).then(() => {
            var BranchTableData = JSON.parse(JSON.stringify(this.$store.getters['setup/get_branch_table_data']));
            this.table_data = BranchTableData;
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
    padding-right: 10px;
}

.table_wrapper{
    padding-left: 0px;
    padding-right: 0px;
}
</style>
