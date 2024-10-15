<template>
<div class="row row_section" style="padding: 0px; margin-bottom: 10px; margin-left: 12px;">
    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <Chip text="Setup" icon="tune"/> / <Chip text="Division" icon="business"/>
    </div>
</div>

<div class="row row_section">
<div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
<div class="component_div">
<q-card>
<q-card-section>
    <q-toolbar>
    <q-tabs
        v-model="tab"
        dense
        class="text-black"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
    >
        <q-tab name="department" label="Department" />
        <q-tab name="group" label="Group" />
    </q-tabs>
    </q-toolbar>

    <q-tab-panels v-model="tab" :animated="false">
        <q-tab-panel name="department">
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
            <TablePagination 
            :hide_footer="false" 
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
             :button_no_outline="true"
            title="Dept serverside table"
            />
        </q-tab-panel>

        <q-tab-panel name="group">
            <Table :row_per_page="[5,40,60,80,100,0]" 
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
            :edit_button="false"
            :view_button="false"
            :delete_button="true"
            />
            <TablePagination 
            :hide_footer="false" 
            :row_per_page="[20,40,60,80,100]"
            v-on:receiveRequestTable="handleTableChange1"
            v-on:head_button="addButton1" 
            v-on:main_action="handleAction1"
            :table_column="test_column1" 
            :table_data="test_data1" 
            :action_button="true"
            :edit_button="false"
            :view_button="false"
            :delete_button="true"
            :top_button="true"
            title="Group serverside table"
            />
        </q-tab-panel>
    </q-tab-panels>
</q-card-section>
</q-card>
</div>
</div>
</div>
</template>

<script>
// import LabelInputHorizontal from'src/components/ERP/General/LabelInputHorizontal' ;
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
// import Label from 'src/components/ERP/Base/Label';
import Table from 'src/components/ERP/Base/Table';
import TablePagination from 'src/components/ERP/Base/TablePagination';
import Chip from 'src/components/ERP/Base/Chip';
// import Input from 'src/components/ERP/Base/Input';
import { ref } from 'vue';
// import { Notify } from "quasar";
// import { Loading, QSpinnerTail } from 'quasar';
// import Button from 'src/components/Base/Button';

export default {
    name: 'Dashboard',
    setup () {
        return {
        tab: ref('department')
        }
    },
    data() {
        return {
            empty: {},
            empty1: {},
            table_data:[],
            table_column: [
                {
                    name: 'action',
                    required: true,
                    label: 'Actions',
                    align: 'left',
                    sortable: false
                },
                {
                    align: 'right',
                    field: 'dept_code',
                    sortable: true,
                    name: 'dept_code',
                    label: 'Dept Code',
                    required: true,
                },
                {
                    align: 'left',
                    field: 'dept_desc',
                    sortable: true,
                    name: 'dept_desc',
                    label: 'Dept Description',
                    required: true,
                },
                {
                    align: 'left',
                    field: 'group_code',
                    sortable: true,
                    name: 'group_code',
                    label: 'Group',
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
            test_data:[],
            test_column: [
                {
                    name: 'action',
                    required: true,
                    label: 'Actions',
                    align: 'left',
                    sortable: false,
                    format: val => `${val}`,
                },
                {
                    align: 'right',
                    field: 'dept_code',
                    sortable: true,
                    name: 'dept_code',
                    label: 'Dept Code',
                    required: true,
                    format: val => `${val}`,
                },
                {
                    align: 'left',
                    field: 'dept_desc',
                    sortable: true,
                    name: 'dept_desc',
                    label: 'Dept Description',
                    required: true,
                    format: val => `${val}`,
                },
                {
                    align: 'left',
                    field: 'group_code',
                    sortable: true,
                    name: 'group_code',
                    label: 'Group',
                    required: true,
                    format: val => `${val}`,
                },
                {
                    align: 'left',
                    field: 'created_at',
                    sortable: true,
                    name: 'created_at',
                    label: 'Created at',
                    required: true,
                    format: val => `${val}`,
                },
                {
                    align: 'left',
                    field: 'created_by',
                    sortable: true,
                    name: 'created_by',
                    label: 'Created by',
                    required: true,
                    format: val => `${val}`,
                },
                {
                    align: 'left',
                    field: 'updated_at',
                    sortable: true,
                    name: 'updated_at',
                    label: 'Updated at',
                    required: true,
                    format: val => `${val}`,
                },
                {
                    align: 'left',
                    field: 'updated_by',
                    sortable: true,
                    name: 'updated_by',
                    label: 'Updated by',
                    required: true,
                    format: val => `${val}`,
                },
            ],
            table_data1: [],
            table_column1: [
                {
                    name: 'action',
                    required: true,
                    label: 'Actions',
                    align: 'left',
                    sortable: false
                },
                {
                    align: 'left',
                    field: 'group_code',
                    sortable: true,
                    name: 'group_code',
                    label: 'Group Code',
                    required: true,
                },
                {
                    align: 'left',
                    field: 'group_desc',
                    sortable: true,
                    name: 'group_desc',
                    label: 'Group Description',
                    required: true,
                },
                {
                    align: 'right',
                    field: 'group_code_acc',
                    sortable: true,
                    name: 'group_code_acc',
                    label: 'Group Code Account',
                    required: true,
                },
                {
                    align: 'right',
                    field: 'code_acc',
                    sortable: true,
                    name: 'code_acc',
                    label: 'Code Account',
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
            test_data1:[],
            test_column1:[
                {
                    name: 'action',
                    required: true,
                    label: 'Actions',
                    align: 'left',
                    sortable: false,
                    format: val => `${val}`,
                },
                {
                    align: 'left',
                    field: 'group_code',
                    sortable: true,
                    name: 'group_code',
                    label: 'Group Code',
                    required: true,
                    format: val => `${val}`,
                },
                {
                    align: 'left',
                    field: 'group_desc',
                    sortable: true,
                    name: 'group_desc',
                    label: 'Group Description',
                    required: true,
                    format: val => `${val}`,
                },
                {
                    align: 'right',
                    field: 'group_code_acc',
                    sortable: true,
                    name: 'group_code_acc',
                    label: 'Group Code Account',
                    required: true,
                },
                {
                    align: 'right',
                    field: 'code_acc',
                    sortable: true,
                    name: 'code_acc',
                    label: 'Code Account',
                    required: true,
                },
                {
                    align: 'left',
                    field: 'created_at',
                    sortable: true,
                    name: 'created_at',
                    label: 'Created at',
                    required: true,
                    format: val => `${val}`,
                },
                {
                    align: 'left',
                    field: 'created_by',
                    sortable: true,
                    name: 'created_by',
                    label: 'Created by',
                    required: true,
                    format: val => `${val}`,
                },
                {
                    align: 'left',
                    field: 'updated_at',
                    sortable: true,
                    name: 'updated_at',
                    label: 'Updated at',
                    required: true,
                    format: val => `${val}`,
                },
                {
                    align: 'left',
                    field: 'updated_by',
                    sortable: true,
                    name: 'updated_by',
                    label: 'Updated by',
                    required: true,
                    format: val => `${val}`,
                },
            ]
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
        // Input,
        // Label,
        Table,
        TablePagination,
        Chip,
        // Input,
        // Button
    },
    computed: {
        dbComponentBehavior() {
            return this.$store.getters['dbComponentBehavior/byLanguage']('erp')
        },
    },
    methods: {
        addButton: function()
        {
            this.empty.add_dept=true
            this.empty.edit_dept=false
            this.$router.push({
                name: "DivisionDetails",
                params: {  data: JSON.stringify(this.empty)  },
            });
        },
        handleAction: function(payload)
        {
            this.payload1= payload
            this.payload1.add_dept=false
            this.payload1.edit_dept=true
            this.$router.push({
                name: "DivisionDetails",
                params: {  data: JSON.stringify(this.payload1)  },
            });
        },
        addButton1: function()
        {
            this.empty1.add_group=true
            this.empty1.edit_group=false
            this.$router.push({
                name: "DivisionDetails",
                params: {  data: JSON.stringify(this.empty1)  },
            });
        },
        handleAction1: function(payload)
        {
            this.payload1= payload
            this.payload1.add_group=false
            this.payload1.edit_group=true
            this.$router.push({
                name: "DivisionDetails",
                params: {  data: JSON.stringify(this.payload1)  },
            });
        },
        handleTableChange: function(newVal)
        {
            var new_params = this.$pluginsTableParams(newVal)

            var payload = {
                params : new_params
            };
            
            this.$store.dispatch('setup/trigger_dept_table_data_server_side', payload).then(() => {
                var data = JSON.parse(JSON.stringify(this.$store.getters['setup/get_dept_table_data_server_side']));

                this.test_data = data;
            });
        },
        handleTableChange1: function(newVal)
        {
            var new_params = this.$pluginsTableParams(newVal)

            var payload = {
                params : new_params
            };
            
            this.$store.dispatch('setup/trigger_group_table_data_server_side', payload).then(() => {
                var data = JSON.parse(JSON.stringify(this.$store.getters['setup/get_group_table_data_server_side']));

                this.test_data1 = data;
            });
        },
    },
    created: function () {
        var payload = {};
        this.$store.dispatch('setup/trigger_dept_table_data', payload).then(() => {
            var DeptTableData = JSON.parse(JSON.stringify(this.$store.getters['setup/get_dept_table_data']));
            this.table_data = DeptTableData;
        });
        this.$store.dispatch('setup/trigger_group_table_data', payload).then(() => {
            var GroupTableData = JSON.parse(JSON.stringify(this.$store.getters['setup/get_group_table_data']));
            this.table_data1 = GroupTableData;
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

.card_design{
    width: 700px;
    max-width: 800vw;
}

.table_wrapper{
    padding-top: 2px;
    padding-bottom: 2px;
    padding-left: 2px;
    padding-right: 2px;
}

* >>> .q-tab__content
{
    color: white !important;
}

* >>> .q-tab--active
{
    color: white !important;
}

* >>> .q-tab__indicator
{
    color: white !important;
}

</style>
