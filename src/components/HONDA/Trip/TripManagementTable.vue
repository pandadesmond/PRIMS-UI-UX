<template>
<div class="q-pa-md table_wrapper">
    <q-table
    separator="cell"
    @request="onRequest"
    :filter="filter"
    v-model:pagination="pagination"
    binary-state-sort
    :loading="loading"
     :flat="flat_status" :bordered="bordered_status" class="main_table" v-if="row_click == true" :title="title" :row_per_page="row_per_page" :rows="rows" :columns="columns" :row-key="row_key" rows-per-page-label="Entries" :pagination-label="getPaginationLabel" :rows-per-page-options="row_per_page" @row-click="onRowClick">
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

        <template v-slot:body-cell-send_print="props" v-if="permission.includes('STL') && permission.includes('PRT')" >
            <q-td>
                <q-btn :disabled="readonly_button" icon="print" color="primary" dense ripple class="q-mr-sm" :disable="showAddLoading" v-on:click="handlePrint(props.row)"
                v-if="props.row.doc_type == 'normal' ? permission.includes('PRT') : permission.includes('PRAT') " @click.stop="btnclick">
                    <q-tooltip>
                        Print
                    </q-tooltip>
                </q-btn>

                <q-btn :disabled="readonly_button || (props.row.currentStatusSeq != 2)" icon="send" color="warning" dense ripple class="q-mr-sm" :disable="showAddLoading" v-on:click="handleSend(props.row)"
                v-if="props.row.doc_type == 'normal' ? permission.includes('STL') : permission.includes('STAL')" @click.stop="btnclick">
                    <q-tooltip>
                        Send
                    </q-tooltip>
                </q-btn>
            </q-td>
        </template>

        <!-- <template v-slot:top-right v-if="top_button">
            <q-btn v-if="top_button" v-on:click="header_button()" icon="add" color="green" dense outline ripple class="q-mr-sm" >
                <q-tooltip>
                    Create
                </q-tooltip>
            </q-btn>
        </template>

        <template v-slot:body-cell-action="props">
            <q-td>
                <q-btn icon="edit_note" color="info" dense outline ripple class="q-mr-sm" v-on:click="action(props.row)"
                v-if="action_button">
                    <q-tooltip>
                        Action
                    </q-tooltip>
                </q-btn>

                <q-btn icon="visibility" color="primary" dense outline ripple class="q-mr-sm" v-on:click="edit(props.row)"
                v-if="edit_button">
                    <q-tooltip>
                        Edit
                    </q-tooltip>
                </q-btn>

                <q-btn icon="view_list" color="positive" dense outline ripple class="q-mr-sm" v-on:click="list(props.row)"
                v-if="view_button">
                    <q-tooltip>
                        View
                    </q-tooltip>
                </q-btn>

                <q-btn icon="delete" color="negative" dense outline ripple class="q-mr-sm" v-on:click="delete(props.row)"
                v-if="delete_button">
                    <q-tooltip>
                        Delete
                    </q-tooltip>
                </q-btn>
            </q-td>
        </template>

        <template v-slot:body-cell-isactive="props">
            <q-td>
                {{map_isactive(props.row)}}
            </q-td>
        </template>

        <template v-slot:bottom-row v-if="table_footer">
            <q-tr class="table_footer">
                <q-td :class="table_footer_details.classes" :style="'text-align:'+table_footer_details.align+';'" :key="table_footer_details" v-for="table_footer_details in table_footer">
                    {{table_footer_details.value}}
                </q-td>
            </q-tr>
        </template> -->
    </q-table>

    <q-table separator="cell" :flat="flat_status" :bordered="bordered_status" class="main_table" v-if="row_click == false && normal_trip == true" :title="title" :row_per_page="row_per_page" :rows="rows" :columns="columns" row-key="name" rows-per-page-label="Entries" :pagination-label="getPaginationLabel" :rows-per-page-options="row_per_page">
        <template v-slot:top-right v-if="top_button">
          <Button_icon :disabled="readonly_button" v-if="header_button_delete" :flat="true" :icon="'delete'" v-on:receiveClick="delete_button()" :font_color="'white'" :color="'red'" :text="'Delete'" :outline="false" size="12px" class="q-mr-sm"/>
          <Button_icon :disabled="readonly_button" v-if="header_button_add && permission.includes('CTD')" :flat="true" :icon="'add'" v-on:receiveClick="add_button()" :font_color="'white'" :color="'green'" :text="'Add'" :outline="false" size="12px" class="q-pr-sm q-mr-sm"/>
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

        <template v-slot:body-cell-action="props" v-if="permission.includes('DTD')" >
            <q-td>
                <q-btn :disabled="readonly_button" icon="edit_note" color="info" dense outline ripple class="q-mr-sm" :disable="showAddLoading" v-on:click="action(props.row)"
                v-if="action_button">
                    <q-tooltip>
                        Action
                    </q-tooltip>
                </q-btn>

                <q-btn :disabled="readonly_button" icon="visibility" color="primary" dense outline ripple class="q-mr-sm" :disable="showAddLoading" v-on:click="edit(props.row)"
                v-if="edit_button">
                    <q-tooltip>
                        Edit
                    </q-tooltip>
                </q-btn>

                <q-btn :disabled="readonly_button" icon="view_list" color="positive" dense outline ripple class="q-mr-sm" :disable="showAddLoading" v-on:click="list(props.row)"
                v-if="view_button">
                    <q-tooltip>
                        View
                    </q-tooltip>
                </q-btn>

                <q-btn :disabled="readonly_button" icon="delete" color="negative" dense outline ripple class="q-mr-sm" :disable="showAddLoading" v-on:click="xdelete(props.row,props.rowIndex)"
                v-if="delete_button">
                    <q-tooltip>
                        Delete
                    </q-tooltip>
                </q-btn>
            </q-td>
        </template>

        <template v-slot:body-cell-do_number="props">
          <q-td>
            <!-- <Select
              :readonly="readonly_button"
              :no_label="true"
              v-model="props.row.do_number"
              :dbComponentBehavior="dbComponentBehavior.do_number_list"
              :options="props.row.do_number_list"
              v-on:receiveChange="handleDoChange(props)"

              /> -->

              <SelectFilter
              :readonly="readonly_button"
              :no_label="true"
              v-model:pass_value="props.row.do_number"
              :dbComponentBehavior="dbComponentBehavior.do_number_list"
              :options="props.row.do_number_list"
              v-on:receiveChange="handleDoChange(props)"

              />
          </q-td>
        </template>

        <template v-slot:body-cell-collect_date="props">
          <q-td>
            <!-- <Input
              :readonly="false"
              :no_label="true"
              v-model="props.row.collect_date"
              :dbComponentBehavior="dbComponentBehavior.text"
              input-class="text-center"
              v-on:receiveChange="handleValueChange(props)"
              /> -->

              <Datepicker :pass_disabled="readonly_button" :disabled="readonly_button" :autoclose="true" v-on:receiveChange="handleDateValueChange($event,props)" v-model:daterange="props.row.collect_date"
                    :componentBehavior="dbComponentBehavior ? dbComponentBehavior.date : oridbComponentBehavior.text" />
          </q-td>
        </template>

        <template v-slot:body-cell-collect_time="props">
          <q-td>
            <!-- <Input
              :readonly="false"
              :no_label="true"
              v-model="props.row.collect_time"
              :dbComponentBehavior="dbComponentBehavior.text"
              input-class="text-center"
              v-on:receiveChange="handleValueChange(props)"
              /> -->

              <Timepicker :pass_disabled="readonly_button"
              :componentBehavior="dbComponentBehavior ? dbComponentBehavior.time : oridbComponentBehavior.text"
               v-on:receiveChange="handleValueChange(props)" v-model:pass_value="props.row.collect_time"/>
          </q-td>
        </template>

        <template v-slot:body-cell-quantity="props">
          <q-td>
            <Input
              style="width: 100px;"
              :readonly="readonly_button"
              :no_label="true"
              v-model="props.row.quantity"
              :dbComponentBehavior="dbComponentBehavior.number_no_negative"
              input-class="text-center"
              v-on:receiveChange="handleValueChange(props)"
              />
          </q-td>
        </template>

        <template v-slot:body-cell-request_depart_time="props">
          <q-td>
            <!-- <Input
              :readonly="false"
              :no_label="true"
              v-model="props.row.request_depart_time"
              :dbComponentBehavior="dbComponentBehavior.text"
              input-class="text-center"
              v-on:receiveChange="handleValueChange(props)"
              /> -->

              <Timepicker :pass_disabled="readonly_button"
              :componentBehavior="dbComponentBehavior ? dbComponentBehavior.time : oridbComponentBehavior.text"
               v-on:receiveChange="handleValueChange(props)" v-model:pass_value="props.row.request_depart_time"/>
          </q-td>
        </template>

        <template v-slot:body-cell-request_arrive_time="props">
          <q-td>
            <!-- <Input
              :readonly="false"
              :no_label="true"
              v-model="props.row.request_arrive_time"
              :dbComponentBehavior="dbComponentBehavior.text"
              input-class="text-center"
              v-on:receiveChange="handleValueChange(props)"
              /> -->

              <Timepicker :pass_disabled="readonly_button"
              :componentBehavior="dbComponentBehavior ? dbComponentBehavior.time : oridbComponentBehavior.text"
               v-on:receiveChange="handleValueChange(props)" v-model:pass_value="props.row.request_arrive_time"/>
          </q-td>
        </template>
    </q-table>

    <q-table separator="cell" :flat="flat_status" :bordered="bordered_status" class="main_table" v-if="row_click == false && normal_trip == false" :title="title" :row_per_page="row_per_page" :rows="rows" :columns="columns" row-key="name" rows-per-page-label="Entries" :pagination-label="getPaginationLabel" :rows-per-page-options="row_per_page">
        <template v-slot:top-right v-if="top_button">
          <Button_icon :disabled="readonly_button" v-if="header_button_delete" :icon="'delete'" :color="'negative'" :text="'Delete'" :outline="false" size="12px" v-on:click="delete_button()" class="q-mr-sm" />
          <Button_icon :disabled="readonly_button" v-if="header_button_add && permission.includes('CAI')" :flat="true" :icon="'add'" v-on:receiveClick="add_button()" :font_color="'white'" :color="'green'" :text="'Add'" :outline="false" size="12px" class="q-pr-sm q-mr-sm"/>
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

                <template v-slot:body-cell-action="props" v-if="permission.includes('DAI')" >
            <q-td>
                <q-btn :disabled="readonly_button" icon="edit_note" color="info" dense outline ripple class="q-mr-sm" :disable="showAddLoading" v-on:click="action(props.row)"
                v-if="action_button">
                    <q-tooltip>
                        Action
                    </q-tooltip>
                </q-btn>

                <q-btn :disabled="readonly_button" icon="visibility" color="primary" dense outline ripple class="q-mr-sm" :disable="showAddLoading" v-on:click="edit(props.row)"
                v-if="edit_button">
                    <q-tooltip>
                        Edit
                    </q-tooltip>
                </q-btn>

                <q-btn :disabled="readonly_button" icon="view_list" color="positive" dense outline ripple class="q-mr-sm" :disable="showAddLoading" v-on:click="list(props.row)"
                v-if="view_button">
                    <q-tooltip>
                        View
                    </q-tooltip>
                </q-btn>

                <q-btn :disabled="readonly_button" icon="delete" color="negative" dense outline ripple class="q-mr-sm" :disable="showAddLoading" v-on:click="xdelete(props.row,props.rowIndex)"
                v-if="delete_button">
                    <q-tooltip>
                        Delete
                    </q-tooltip>
                </q-btn>
            </q-td>
        </template>


        <!-- <template v-slot:body-cell-job_description="props">
          <q-td>
            <Input
              :readonly="false"
              :no_label="true"
              v-model="props.row.job_description"
              :dbComponentBehavior="dbComponentBehavior.text"
              input-class="text-left" />
          </q-td>
        </template> -->

        <template v-slot:body-cell-description="props">
          <q-td>
            <!-- <Select
              :readonly="false"
              :no_label="true"
              v-model="props.row.job_description"
              :dbComponentBehavior="dbComponentBehavior.select"
              :options="props.row.job_description" /> -->

              <Input
              :readonly="readonly_button"
              :no_label="true"
              v-model="props.row.description"
              :dbComponentBehavior="dbComponentBehavior.job_description"
              input-class="text-center"
              v-on:receiveChange="handleValueChangeMultiple(props)"
              />
          </q-td>
        </template>

        <template v-slot:body-cell-item_name="props">
          <q-td>
              <Input
              :readonly="readonly_button"
              :no_label="true"
              v-model="props.row.item_name"
              :dbComponentBehavior="dbComponentBehavior.item_name"
              input-class="text-center"
              v-on:receiveChange="handleValueChangeMultiple(props)"
              />
          </q-td>
        </template>

        <template v-slot:body-cell-delivery_location="props">
          <q-td>
            <Input
              :readonly="readonly_button"
              :no_label="true"
              v-model="props.row.delivery_location"
              :dbComponentBehavior="dbComponentBehavior.delivery_location"
              input-class="text-center" />
          </q-td>
        </template>

        <template v-slot:body-cell-collect_date="props">
          <q-td>
            <!-- <Input
              :readonly="false"
              :no_label="true"
              v-model="props.row.collect_date"
              :dbComponentBehavior="dbComponentBehavior.text"
              input-class="text-center" /> -->

              <Datepicker :pass_disabled="readonly_button" :autoclose="true" v-on:receiveChange="handleDateValueChange($event,props)" v-model:daterange="props.row.collect_date"
                    :componentBehavior="dbComponentBehavior ? dbComponentBehavior.date : oridbComponentBehavior.text" />
          </q-td>
        </template>

        <template v-slot:body-cell-collect_time="props">
          <q-td>
            <!-- <Input
              :readonly="false"
              :no_label="true"
              v-model="props.row.collect_time"
              :dbComponentBehavior="dbComponentBehavior.text"
              input-class="text-center" /> -->

              <Timepicker :pass_disabled="readonly_button"
              :componentBehavior="dbComponentBehavior ? dbComponentBehavior.time : oridbComponentBehavior.text"
               v-on:receiveChange="handleValueChange(props)" v-model:pass_value="props.row.collect_time"/>
          </q-td>
        </template>

        <template v-slot:body-cell-quantity="props">
          <q-td>
            <Input
              style="width:100px;"
              :readonly="readonly_button"
              :no_label="true"
              v-model="props.row.quantity"
              :dbComponentBehavior="dbComponentBehavior.number_no_negative"
              input-class="text-center" />
          </q-td>
        </template>

        <template v-slot:body-cell-request_depart_time="props">
          <q-td>
            <!-- <Input
              :readonly="false"
              :no_label="true"
              v-model="props.row.request_depart_time"
              :dbComponentBehavior="dbComponentBehavior.text"
              input-class="text-center" /> -->

              <Timepicker :pass_disabled="readonly_button"
              :componentBehavior="dbComponentBehavior ? dbComponentBehavior.time : oridbComponentBehavior.text"
               v-on:receiveChange="handleValueChange(props)" v-model:pass_value="props.row.request_depart_time"/>
          </q-td>
        </template>

        <template v-slot:body-cell-request_arrive_time="props">
          <q-td>
            <!-- <Input
              :readonly="false"
              :no_label="true"
              v-model="props.row.request_arrive_time"
              :dbComponentBehavior="dbComponentBehavior.text"
              input-class="text-center" /> -->

              <Timepicker :pass_disabled="readonly_button"
              :componentBehavior="dbComponentBehavior ? dbComponentBehavior.time : oridbComponentBehavior.text"
               v-on:receiveChange="handleValueChange(props)" v-model:pass_value="props.row.request_arrive_time"/>
          </q-td>
        </template>
    </q-table>
</div>
</template>

<script>
import Button_icon from 'src/components/HONDA/Base/Button_icon'
import Input from 'src/components/HONDA/Base/Input'
import Select from 'src/components/HONDA/Base/Select'
import Timepicker from 'src/components/HONDA/Base/Timepicker';
import Datepicker from 'src/components/HONDA/Base/Datepicker';
import SelectFilter from 'src/components/HONDA/Base/SelectFilter'

export default {
    data(){
      return{
        columns: this.table_column,
        rows: this.table_data,
        loading: true,
        filter:"",
        row_key: "",
        pagination: {
          sortBy: '',
          descending: '',
          page: 1,
          // rowsPerPage: 5,
          rowsPerPage: this.row_per_page[0] === undefined ? this.row_per_page : this.row_per_page[0],
          rowsNumber: 0
        },
        permission: sessionStorage.getItem("permission") != "" && sessionStorage.getItem("permission") != "null" && sessionStorage.getItem("permission") != null ? sessionStorage.getItem("permission").split(',') : [],
      }
    },
    props: ['title', 'table_column', 'table_data','top_button', 'hide_footer', 'row_click', 'row_per_page','table_footer','normal_trip',"flat_status", "bordered_status",
    "action_button", "edit_button",
    "view_button","delete_button","header_button_add","header_button_delete","pass_row_key","showAddLoading","readonly_button"],
    components: {
      Button_icon,
      Input,
      Select,
      Timepicker,
      Datepicker,
      SelectFilter
    },
    created() {
    },
    computed: {
      dbComponentBehavior() {
        return this.$store.getters['dbComponentBehavior/byLanguage']('honda')
      },
    },
    mounted() {
      this.onRequest({
        pagination: this.pagination,
        filter: undefined
      })
    },
    methods: {
        btnclick()
        {

        },
        handlePrint(props)
        {
          this.$emit('handlePrint',props);
        },
        handleSend(props)
        {
          this.$emit('handleSend',props);
        },
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
          console.log(event);
          console.log(row);
          console.log(index);
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

        }
    },
    watch: {
      table_column(newVal)
      {
        this.columns = newVal;

        if(this.pass_row_key)
        {
          this.row_key = this.pass_row_key;
        }
        else
        {
          this.row_key = newVal[0].name;
        }
        // this.row_key = newVal[0].name;
      },
      table_data(newVal){
        // this.rows = newVal;
        // this.loading = false;
        this.rows = newVal.data.results;
        this.pagination.rowsNumber = newVal.data.count;
        this.loading = false;
        // console.log('last');
        // console.log(newVal);
        // console.log(this.pagination);
      },
      readonly_button(newVal)
      {
      }
        // table_data(newVal)
        // {
        //     this.rows = newVal
        // },
        // table_column(newVal)
        // {
        //     this.columns = newVal
        // },
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
</style>

