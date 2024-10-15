<template>
<div class="row row_section" style="padding: 0px; margin-bottom: 10px; margin-left: 12px;">
            <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">

                <Chip text="Setup" icon="tune"/> / <Chip text="Currency" icon="attach_money"/> 

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

<!--MYR table-->
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
            :table_column="table_column"
            :action_button="true"
            :edit_button="true"
            :view_button="true"
            :delete_button="true"
            />
        </div>
    </div>
</div>

<!--USD table-->
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
            :table_column="table_column"
            :action_button="true"
            :edit_button="true"
            :view_button="true"
            :delete_button="true"
            />
        </div>
    </div>
</div>-->

<!--AUD table-->
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
            :table_column="table_column"
            :action_button="true"
            :edit_button="true"
            :view_button="true"
            :delete_button="true"
            />
        </div>
    </div>
</div>-->

<!--EUR table-->
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
            :table_column="table_column"
            :action_button="true"
            :edit_button="true"
            :view_button="true"
            :delete_button="true"
            />
        </div>
    </div>
</div>-->

<!--NZD table-->
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
            :table_column="table_column"
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
           <Label text="Add Currency" class="text-subtitle1" style="background-color:transparent;"/>
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
          <Label text="Code" class="text-subtitle1" style="background-color:transparent;"/>
            <Input :readonly="false"  
            :no_label="true" 
            :text="'Code'" 
            v-model:pass_value="json.Code" 
            :dbComponentBehavior="dbComponentBehavior.text"/>
        
            </div>
        </div>
    
</q-card-section>

        <q-card-section class="q-pt-none">
            
                <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                     <div class="component_div">
           <Label text="Description" class="text-subtitle1" style="background-color:transparent;"/>
            <Input :readonly="false"  
            :no_label="true" 
            :text="'Description'" 
            v-model:pass_value="json.Code" 
            :dbComponentBehavior="dbComponentBehavior.text"/>
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
// import TablePagination from 'src/components/Base/TablePagination';
import Table from 'src/components/ERP/Base/Table';
import Label from 'src/components/ERP/Base/Label';
import Input from 'src/components/ERP/Base/Input';
import LabelInputHorizontal from'src/components/ERP/General/LabelInputHorizontal' ;
import Chip from 'src/components/ERP/Base/Chip';
// import Select from 'src/components/ERP/Base/Select';

export default {
    data() {
        return {
            multiselect_value: [],
            json:{
                "Code":"1234",
                "Description" : "Hi",
               
            },
            table_title:"Base Currency:MYR",
            table_data: [
                {

                    code: 'MYR',
                    description: 'Malaysia Ringgit',
                    created_at: '2019-02-25 15:10:18',
                    created_by: 'panda',
                    update_at: '2019-02-25 15:10:18',
                    update_by: 'panda',
                },
                {

                    code: 'USD',
                    description: 'US Dollar',
                    created_at: '2019-02-25 15:10:18',
                    created_by: 'panda',
                    update_at: '2019-02-25 15:10:18',
                    update_by: 'panda',
                },
                {

                    code: 'AUD',
                    description: 'Australian Dollar',
                    created_at: '2019-02-25 15:10:18',
                    created_by: 'panda',
                    update_at: '2019-02-25 15:10:18',
                    update_by: 'panda',
                },
                {

                    code: 'EUR',
                    description: 'Euro',
                    created_at: '2019-02-25 15:10:18',
                    created_by: 'panda',
                    update_at: '2019-02-25 15:10:18',
                    update_by: 'panda',
                },
                {

                    code: 'NZD',
                    description: 'New Zealand Dollar',
                    created_at: '2019-02-25 15:10:18',
                    created_by: 'panda',
                    update_at: '2019-02-25 15:10:18',
                    update_by: 'panda',
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
                    name: 'code', 
                    label: 'Code', 
                    field: 'code',
                    align: 'left', 
                    sortable: true 
                },
                { 
                    name: 'description', 
                    label: 'Description', 
                    field: 'description', 
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
                }
            ],

            table_title_1:"",
            table_data_1: [
                {

                },
                ],

           /* table_title_2:"USD",
            table_data_2: [{

            },
            ],

            table_title_3:"AUD",
            table_data_3: [{

            },
            ],

            table_title_4:"EUR",
            table_data_4: [{

            },
            ],

            table_title_5:"NZD",
            table_data_5: [{

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
        // Select,
        Input,
        Label,
        Chip,
        // TablePagination,
        Table,
        LabelInputHorizontal,
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
    padding-left: 0px;
}
</style>