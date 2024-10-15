<template>
<div class="q-pa-md table_wrapper">


    <q-table separator="cell" :flat="flat_status" :bordered="bordered_status" class="main_table" v-if="row_click == false && normal_trip == false" :title="title" :row_per_page="row_per_page" :rows="rows" :columns="columns" row-key="name" rows-per-page-label="Entries" :pagination-label="getPaginationLabel" :rows-per-page-options="row_per_page">
        <template v-slot:top-right v-if="top_button">
          <!-- <Button_icon :disabled="readonly_button" v-if="header_button_delete" :icon="'delete'" :color="'negative'" :text="'Delete'" :outline="false" size="12px" v-on:click="delete_button()" class="q-mr-sm" /> -->
          <Button_icon :disabled="readonly_button" v-if="header_button_add_general" :flat="true"  v-on:receiveClick="add_button_open_amount()" :font_color="'white'" :icon="'add'" :text="'Add General'" :outline="false" size="13px" class="q-pr-sm q-mr-sm btn_add"/>
          <Button_icon :disabled="readonly_button" v-if="header_button_add" :flat="true"  v-on:receiveClick="add_button()" :font_color="'white'" :icon="'add'" :text="'Add'" :outline="false" size="13px" class="q-pr-sm q-mr-sm btn_add"/>
           <Button_icon :disabled="readonly_button" v-if="header_button_delete"  :color="'negative'" :text="'Delete'" :outline="false" size="13px" :icon="'delete'" v-on:click="delete_button()" />
        </template>

        <template v-slot:header="props">
            <q-tr :props="props">
            <q-th
                v-for="col in props.cols"
                :key="col.name"
                :props="props"
            >
              <template v-if="col.name == 'actions'">
                <Checkbox :readonly="readonly ? true : false" :id="id" :name="name"
                v-on:receiveChange="handleCheckAll" v-model="checkall"/>
              </template>

              <template v-else>
                <q-tooltip v-if="col.tooltip" anchor="top middle" self="center middle" style="font-size: 13px;">
                {{ col.tooltip }}
                </q-tooltip>
                {{ col.label }}
              </template>

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


        <!-- <template v-slot:body-cell-invmain_table_itemcode="props">
          <q-td>
            <Input
              :readonly="false"
              :no_label="true"
              v-model="props.row.invmain_table_itemcode"
              :dbComponentBehavior="dbComponentBehavior.text"
              input-class="text-left" />
          </q-td>
        </template> -->

        <template v-slot:body-cell-actions="props">
          <q-td>
              <Checkbox :readonly="readonly ? true : false" :id="id" :name="name"
              v-on:receiveChange="handleChange" v-model="props.row.actions"/>
          </q-td>
        </template>

        <!-- <template v-slot:body-cell-code="props">
          <q-td>
              <div class="row">

                  <Input
                    :readonly="readonly_button"
                    :no_label="true"
                    :text="'Code'"
                    v-model="props.row.code"
                    :autofocusclick="true"
                    input-class="text-center"
                    :dbComponentBehavior="dbComponentBehavior.cndn_table_code"
                    v-on:receiveChange="handleValueChangeMultiple(props)"
                   />

              </div>

          </q-td>
        </template> -->
<!--
          <template v-slot:body-cell-outlet="props">
            <q-td>
              <SelectFilter
              :readonly="false"
              :no_label="true"
              v-model:pass_value="props.row.outlet"
              :dbComponentBehavior="dbComponentBehavior.cndn_table_outlet"
              :options="props.row.outlet_options"
              v-on:receiveChange="handleValueChangeOutlet(props)"
                />

          </q-td>
        </template> -->


        <template v-slot:body-cell-description="props">
            <q-td>
              <Input
              :readonly="readonly_button"
              :no_label="true"
              v-model="props.row.description"
              :dbComponentBehavior="dbComponentBehavior.cndn_description"
              input-class="text-center"
              :autofocusclick="true"
              />
          </q-td>
        </template>

        <template v-slot:body-cell-qty="props">
            <q-td>
              <Input
              :readonly="readonly_button"
              :no_label="true"
              v-model="props.row.qty"
              :dbComponentBehavior="dbComponentBehavior.cndn_qty"
              input-class="text-center"
              v-on:receiveChange="handleChangeValue(props.row)"
              :autofocusclick="true"
              />
          </q-td>
        </template>

        <template v-slot:body-cell-unit_price="props">
            <q-td>
              <Input
              :readonly="readonly_button"
              :no_label="true"
              v-model="props.row.unit_price"
              :dbComponentBehavior="dbComponentBehavior.cndn_unit_price"
              input-class="text-center"
              v-on:receiveChange="handleChangeValue(props.row)"
              :autofocusclick="true"
              />
          </q-td>
        </template>

        <template v-slot:body-cell-disc1="props">
            <q-td>
              <Input
              :readonly="readonly_button"
              :no_label="true"
              v-model="props.row.disc1"
              :dbComponentBehavior="dbComponentBehavior.cndn_disc1"
              input-class="text-center"
              v-on:receiveChange="handleChangeValue(props.row)"
              :autofocusclick="true"
              />
          </q-td>
        </template>

        <template v-slot:body-cell-tax_amt="props">
            <q-td>
              <Input
              :readonly="readonly_button"
              :no_label="true"
              v-model="props.row.tax_amt"
              :dbComponentBehavior="dbComponentBehavior.cndn_tax_amt"
              input-class="text-center"
              v-on:receiveChange="handleChangeValue(props.row)"
              :autofocusclick="true"
              />
          </q-td>
        </template>


    </q-table>
</div>
</template>

<script>
import Button_icon from 'src/components/SUBLOT/Base/Button_icon'
import Input from 'src/components/SUBLOT/Base/Input'
import Select from 'src/components/SUBLOT/Base/Select'
// import Timepicker from 'src/components/SUBLOT/Base/Timepicker';
// import Datepicker from 'src/components/SUBLOT/Base/Datepicker';
import SelectFilter from 'src/components/SUBLOT/Base/SelectFilter'
import Checkbox from 'src/components/Base/Checkbox';

export default {
    data(){
      return{
        checkall: false,
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
    "view_button","delete_button","header_button_add","header_button_add_general","header_button_delete","pass_row_key","showAddLoading","readonly_button","removeTableCheckAll"],
    components: {
      Button_icon,
      Input,
      Select,
      SelectFilter,
      Checkbox,
    },
    created() {
    },
    computed: {
      dbComponentBehavior() {
        return this.$store.getters['dbComponentBehavior/byLanguage']('sublot')
      },
    },
    mounted() {
      this.onRequest({
        pagination: this.pagination,
        filter: undefined
      })
    },
    methods: {
      handleChangeValue(payload)
      {
        this.$nextTick(()=>{
          this.$emit('receiveChangeValue',payload);
        })
      },
      handleCheckAll()
      {
        this.$nextTick(()=>{
          this.$emit('receiveCheckall',this.checkall);
        })
      },
      handleSearchItemcode()
      {
        this.$emit('receiveItemcodeClick');
      },
      handleValueChangeOutlet(props){
        this.$nextTick(()=>{
          this.$emit("receiveOutletValueChange",props);
        });
      },
      handleValueChangeInvoiceNo(props){
         this.$nextTick(()=>{
          this.$emit("receiveInvoiceNoValueChange",props);
        });
      },
      handleDisc1ValueChange(props)
      {
        this.$nextTick(()=>{
          this.$emit("receiveDisc1ValueChange",props);
        });
      },
      handleValueChangeDisc2Value(props)
      {
        this.$nextTick(()=>{
          this.$emit("receiveDisc2ValueChange",props);
        });
      },
      handleValueChangeDisc2Type(props)
      {
        this.$nextTick(()=>{
          this.$emit("receiveDisc2TypeChange",props);
        });
      },
      handleValueChangeQty(props)
      {
        this.$nextTick(()=>{
          this.$emit("receiveQtyChange",props);
        });
      },
      handleValueChangeUnitPrice(props)
      {
        this.$nextTick(()=>{
          this.$emit("receiveUnitPriceChange",props);
        });
      },
      handleValueChangeDisc1Type(props)
      {
        this.$nextTick(()=>{
          this.$emit("receiveDisc1TypeChange",props);
        });
      },
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
        add_button_open_amount()
        {
          this.$emit('add_button_open_amount')
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
        // console.log(this.pagination);
      },
      readonly_button(newVal)
      {
      },
      removeTableCheckAll(newVal)
      {
        if(newVal)
        {
          this.checkall = false;
          this.$emit('doneRemoveCheckAll');
        }
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
.btn_add{
  background-color: #273655;
  color: white;
}
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

