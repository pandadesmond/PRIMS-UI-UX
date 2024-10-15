<template>
<div class="q-pa-md table_wrapper">

    <q-table 
    :flat="true" 
    :bordered="true" 
    class="main_table" 
    :title="title" 
    :row_per_page="[20,40,60,80,100,0]" 
    :rows="rows" 
    :columns="columns" 
    row-key="name" 
    rows-per-page-label="Entries"
    >
    
        <template v-slot:top-right v-if="top_button">
          <Button_icon v-if="header_button_delete" :flat="true" :icon="'delete'" v-on:receiveClick="delete_button()" :font_color="'white'" :color="'red'" :text="'Delete'" :outline="false" size="12px" class="q-mr-sm"/>
          <Button_icon  v-if="header_button_add" :flat="true" :icon="'add'" v-on:receiveClick="add_button()" :font_color="'white'" :color="'green'" :text="'Add'" :outline="false" size="12px" class="q-pr-sm q-mr-sm"/>
        </template>

        <template v-slot:header="props">
            <q-tr :props="props">

            <q-th
                v-for="col in props.cols"
                :key="col.name"
                :props="props"
            >
                <q-tooltip v-if="col.tooltip" anchor="top middle" self="center middle" style="font-size: 13px;">
                {{ col.tooltip }}
                </q-tooltip>
                {{ col.label }}
            </q-th>
            </q-tr>
        </template>

        <template v-slot:body-cell-action="props">
            <q-td>
                <!-- <q-btn icon="edit_note" color="info" dense outline ripple class="q-mr-sm" :disable="showAddLoading" v-on:click="action(props.row)"
                >
                    <q-tooltip>
                        Action
                    </q-tooltip>
                </q-btn>

                <q-btn icon="visibility" color="primary" dense outline ripple class="q-mr-sm" :disable="showAddLoading" v-on:click="edit(props.row)"
                >
                    <q-tooltip>
                        Edit
                    </q-tooltip>
                </q-btn>

                <q-btn icon="view_list" color="positive" dense outline ripple class="q-mr-sm" :disable="showAddLoading" v-on:click="list(props.row)"
                >
                    <q-tooltip>
                        View
                    </q-tooltip>
                </q-btn> -->

                <q-btn icon="delete" color="negative" dense outline ripple class="q-mr-sm" :disable="showAddLoading" v-on:click="xdelete(props.row,props.rowIndex)"
                >
                    <q-tooltip>
                        Delete
                    </q-tooltip>
                </q-btn>
            </q-td>
        </template>
        
        <template v-slot:body-cell-percent="props">
          <q-td>
              <!-- <Input
              :readonly="false"
              :no_label="true"
              v-model="pass_value"
              :dbComponentBehavior="dbComponentBehavior.number"
              input-class="text-center" 
              v-on:receiveChange="handleValueChange(props)"
              /> -->
              <Input :no_label="true" :autofocusclick="true" :readonly="json_container.readonly ? true : false" v-on:receiveKeyUp="handleChangeValue(props)" v-model="props.row.percent" 
                :dbComponentBehavior="dbComponentBehavior[json_container.prefix1Behaviour] ? dbComponentBehavior[json_container.prefix1Behaviour] : dbComponentBehavior.text" />
          </q-td>
        </template>

    </q-table>
</div>

</template>

<script>
import Button_icon from 'src/components/HONDA/Base/Button_icon';
import Input from 'src/components/RIMS/Base/Input';
import Select from 'src/components/HONDA/Base/Select';
import Timepicker from 'src/components/HONDA/Base/Timepicker';
import Datepicker from 'src/components/HONDA/Base/Datepicker';

export default {
    data(){
      return{
        columns: [],
        rows: [],
        loading: true,
        filter:"",
        row_key: "",
        pagination: {
          sortBy: '',
          descending: '',
          page: 1,
          rowsPerPage: 5,
          rowsNumber: 0
        },
        json_container:this.json,
        pass_value: 0,
      }
    },
    props: ['title', 'table_column', 'table_data','top_button', 'hide_footer', 'row_click', 'row_per_page','table_footer','normal_trip',"flat_status", "bordered_status",
    "action_button", "edit_button",
    "view_button","delete_button","header_button_add","header_button_delete","pass_row_key","showAddLoading","json"],
    components: {
      Button_icon,
      Input,
      Select,
      Timepicker,
      Datepicker
    },
    created() {
    },
    computed: {
      dbComponentBehavior() {
        return this.$store.getters['dbComponentBehavior/byLanguage']('tta')
      },
    },
    mounted() {
        
        this.columns = this.json_container.prefix1.options;
        this.rows = this.json_container.prefix1.value;

    },
    methods: {
        action : function(payload)
        {
            this.$emit('main_action', payload)
        },
        edit : function(payload)
        {
            this.$emit('main_edit', payload)
        },
        list : function(payload)
        {
            this.$emit('main_list', payload)
        },
        xdelete : function(payload, index)
        {
            var json = {
              payload: payload,
              index:index
            }
            this.$emit('main_delete', json)
        },
        onRowClick : function (event, row, index)
        {
          this.$emit('onRowClick', row)
        },
        add_button : function()
        {
            this.$emit('add_button')
        },
        delete_button : function()
        {
            this.$emit('delete_button')
        },
        // getPaginationLabel: function(firstRowIndex,endRowIndex,totalRowsNumber )
        // {
        //     return 'Showing '+firstRowIndex +' to '+endRowIndex+' of '+totalRowsNumber;
        // },
        // map_isactive: function(payload)
        // {
        //     return payload.isactive == '1' ? 'Yes' : 'No';
        // }
        onRequest (props) {
          this.$emit("receiveRequestTable",props);
          
          this.pagination.sortBy = props.pagination.sortBy;
          this.pagination.descending = props.pagination.descending;
          this.pagination.page = props.pagination.page;
          this.pagination.rowsPerPage = props.pagination.rowsPerPage;
          this.loading = true

          // console.log(this.pagination);
          // console.log('hhh');
        },
        handleDoChange(json)
        {
          var new_json = {};
          new_json.old_json = JSON.parse(JSON.stringify(json));//make it take previous value

          setTimeout(()=>{
            new_json.new_json = json;

            this.$emit("receiveDoChange",new_json);
          },300);
        },
        handleValueChange(json)
        {
          this.$emit("receiveValueChange",json);
        },
        handleValueChangeMultiple(json)
        {
          var new_json = {};
          new_json.old_json = JSON.parse(JSON.stringify(json));//make it take previous value

          setTimeout(()=>{
            new_json.new_json = json;

            this.$emit("receiveValueChange",new_json);
          },300);
        },
        handleDateValueChange(value, json)
        {
          var rowIndex = json.rowIndex;

          var new_json = {};
          new_json.old_json = JSON.parse(JSON.stringify(json));//make it take previous value

          this.rows[rowIndex].collect_date = value;

          setTimeout(()=>{
            new_json.new_json = json;

            this.$emit("receiveValueChange",new_json);
          },300);

        },
        handleChangeValue: function(payload)
        {
          var index = payload.rowIndex;
          var value = payload.value;

          this.json_container.prefix1.value[index].percent = this.$pluginsRimsFormatNumberKeyup(value);

          // props.row.percent
            // this.json_container.prefix1.input1 = this.$pluginsRimsFormatNumber(newVal);
            // told parent something changing
            // this.$emit('receiveChangeTrigger');
        },
    },
    watch:{
        json:{
            handler: function(newVal, oldVal) { // watch it

                this.json_container = newVal;

                var options = this.json_container.prefix1.options;//table_header
                var value = this.json_container.prefix1.value;//table_data

                this.columns = options;
                this.rows = value;
                this.pass_value = 88;
            },
            deep: true
        },
    }
}
</script>

<style scoped>
.q-btn
{
    border-radius: 0px;
}

* >>> thead
{
    background-color: #dee1e6;
}

* >>> tr, * >>> td
{
    height: 35px !important;
}

* >>> .q-table__container
{
    padding: 10px;
}

.table_wrapper
{
    padding: 0px;
    padding-top: 15px;
}
</style>

