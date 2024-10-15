<template>
 <div class="row row_section" style="padding: 0px; margin-bottom: 10px; margin-left: 12px;">
            <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">

                <Chip text="Setup" icon="tune"/> / <Chip text="Reason Code" icon="business"/>

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
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div class="component_div">
          <Label class="text-subtitle1" text="Description" style="background-color:transparent;"/>
            <Input :readonly="false"  
            :no_label="true" 
            :text="'Description'" 
            v-model="json.description" 
            :dbComponentBehavior="dbComponentBehavior.text"
            />
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
import Chip from 'src/components/ERP/Base/Chip';
export default {
   
    data() {
        return {
            table_title:"GRN",
            show_add:false,
            json:{
                "Description": "",
            },


        table_column: [
           {
         name: 'action',
         required: true,
         label: 'Actions',
         align: 'left',
         sortable: false},
        { name: 'description', 
          label: 'Description', 
          field: 'description',  
          align: 'left',  
          sortable: true},
       ],
       table_data: [
                {description: 'FOC SHORT SUPPLIED',},
                {description: 'INVOICE SHORT SUPPLIED'},
                {description: 'ITEM NOT IN PO'}
            ]
        }
    },
    components: {
        LabelInputHorizontal,
       // LabelCheckboxHorizontal,
        Table,
        Label,
        Input,
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

.table_wrapper{
    padding-left: 0px;
}


</style>
