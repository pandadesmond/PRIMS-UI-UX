<template>
<div class="q-pa-md table_wrapper">


    <q-table separator="cell" :flat="flat_status" :bordered="bordered_status" class="main_table" v-if="row_click == false && normal_trip == false" :title="title" :row_per_page="row_per_page" :rows="rows" :columns="columns" row-key="name" rows-per-page-label="Entries" :pagination-label="getPaginationLabel" :rows-per-page-options="row_per_page">
        <template v-slot:top-right v-if="top_button">
          <!-- <Button_icon :disabled="readonly_button" v-if="header_button_delete" :icon="'delete'" :color="'negative'" :text="'Delete'" :outline="false" size="12px" v-on:click="delete_button()" class="q-mr-sm" /> -->
          <Button_icon :disabled="readonly_button" v-if="header_button_add" :flat="true" :icon="'add'" v-on:receiveClick="add_button()" :font_color="'white'" :color="'green'" :text="'Add'" :outline="false" size="12px" class="q-pr-sm q-mr-sm"/>
           <Button_icon :disabled="readonly_button" v-if="header_button_delete" :icon="'delete'" :color="'negative'" :text="'Delete'" :outline="false" size="12px" v-on:click="delete_button()" class="q-mr-sm" />
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
        <template v-slot:body-cell-line="props">
          <q-td style="text-align:right">

              {{props.row.line}}
          </q-td>
        </template>
             <template v-slot:body-cell-description="props">
          <q-td style="text-align:left">

              {{props.row.description}}
          </q-td>
        </template>
        <template v-slot:body-cell-itemcode="props">
          <q-td>
            <!-- <Select
              :readonly="false"
              :no_label="true"
              v-model="props.row.invmain_table_itemcode"
              :dbComponentBehavior="dbComponentBehavior.select"
              :options="props.row.invmain_table_itemcode" /> -->
              <div class="row">
                <!-- <div class="col-xs-12 col-sm-12 col-md-9 col-lg-9 col-xl-9"> -->
                  <Input
                  :readonly="readonly_button"
                  :no_label="true"
                  v-model="props.row.itemcode"
                  :dbComponentBehavior="dbComponentBehavior.invmain_table_itemcode"
                  input-class="text-center"
                  v-on:receiveChange="handleValueChangeMultiple(props)"
                  :autofocusclick="true"
                  />
                <!-- </div> -->

                <!-- <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3" style="text-align: right;">
                  <Button_icon
                  class="custom_create_user"
                  :flat="true" :font_color="'white'"
                  v-on:receiveClick="handleSearchItemcode"
                  :icon="'search'"
                  :color="'#1976d2'"
                  :text="''"
                  :outline="false"
                  size="15px"/>
                </div> -->
              </div>

          </q-td>
        </template>

        <template v-slot:body-cell-pricetype="props">
          <q-td>
              <!-- <Input
              :readonly="readonly_button"
              :no_label="true"
              v-model="props.row.pricetype"
              :dbComponentBehavior="dbComponentBehavior.invmain_table_pricetype"
              input-class="text-center"
              v-on:receiveChange="handleValueChangeMultiple(props)"
              /> -->

              <!-- <Select
              :readonly="false"
              :no_label="true"
              v-model="props.row.pricetype"
              :dbComponentBehavior="dbComponentBehavior.invmain_table_pricetype"
              :options="props.row.pricetype_options"
              v-on:receiveChange="handleValueChangeDisc1Type(props)"
              /> -->
              {{props.row.pricetype}}
          </q-td>
        </template>

        <!-- <template v-slot:body-cell-description="props">
          <q-td>
              <Input
              :readonly="readonly_button"
              :no_label="true"
              v-model="props.row.description"
              :dbComponentBehavior="dbComponentBehavior.invmain_table_itemcode"
              input-class="text-center"
              v-on:receiveChange="handleValueChangeMultiple(props)"
              />
          </q-td>
        </template> -->


        <template v-slot:body-cell-qty="props">
            <q-td style="text-align:right">
              {{formatAmount(props.row.qty,'$',2)}}
              <!-- <Input
              :readonly="readonly_button"
              :no_label="true"
              v-model="props.row.qty"
              :dbComponentBehavior="dbComponentBehavior.invmain_table_qty"
              input-class="text-center"
              v-on:receiveChange="handleValueChangeQty(props)"
              /> -->
          </q-td>
        </template>

        <template v-slot:body-cell-unit_price="props">
        <q-td :style="'text-align :right'">
            <!-- <q-td :style="'text-align :'+props.col.align"> -->
              {{formatAmount(props.row.unit_price,'$',2)}}
              <!-- <Input
              :readonly="readonly_button"
              :no_label="true"
              v-model="props.row.unit_price"
              :dbComponentBehavior="dbComponentBehavior.invmain_table_unit_price"
              input-class="text-center"
              v-on:receiveChange="handleValueChangeUnitPrice(props)"
              /> -->
          </q-td>
        </template>

        <template v-slot:body-cell-disc1type="props">
            <q-td>

              <Select
              :readonly="false"
              :no_label="true"
              v-model="props.row.disc1type"
              :dbComponentBehavior="dbComponentBehavior.invmain_table_disc1type"
              :options="props.row.disc1type_options"
              v-on:receiveChange="handleValueChangeDisc1Type(props)"
              />

              <!-- <Input
              :readonly="readonly_button"
              :no_label="true"
              v-model="props.row.disc1type"
              :dbComponentBehavior="dbComponentBehavior.invmain_table_disc1type"
              input-class="text-center"
              v-on:receiveChange="handleValueChangeMultiple(props)"
              /> -->
          </q-td>
        </template>

        <template v-slot:body-cell-disc1value="props">
            <q-td>
              <Input
              :readonly="readonly_button"
              :no_label="true"
              v-model="props.row.disc1value"
              :dbComponentBehavior="dbComponentBehavior.invmain_table_disc1value"
              input-class="text-center"
              v-on:receiveChange="handleDisc1ValueChange(props)"
              />
          </q-td>
        </template>

        <template v-slot:body-cell-disc2type="props">
            <q-td>
              <!-- <Input
              :readonly="readonly_button"
              :no_label="true"
              v-model="props.row.disc2type"
              :dbComponentBehavior="dbComponentBehavior.invmain_table_disc2type"
              input-class="text-center"
              v-on:receiveChange="handleValueChangeMultiple(props)"
              /> -->

              <Select
              :readonly="false"
              :no_label="true"
              v-model="props.row.disc2type"
              :dbComponentBehavior="dbComponentBehavior.invmain_table_disc2type"
              :options="props.row.disc2type_options"
              v-on:receiveChange="handleValueChangeDisc2Type(props)"
              />
          </q-td>
        </template>

        <template v-slot:body-cell-disc2value="props">
            <q-td>
              <Input
              :readonly="readonly_button"
              :no_label="true"
              v-model="props.row.disc2value"
              :dbComponentBehavior="dbComponentBehavior.invmain_table_disc2value"
              input-class="text-center"
              v-on:receiveChange="handleValueChangeDisc2Value(props)"
              />
          </q-td>
        </template>

        <template v-slot:body-cell-total_incl_tax="props">
           <q-td style="text-align:left ;cursor: pointer" @click="handleTotalInclTaxClick(props)">
            <!-- <q-td :style="`text-align:${props.col.align};cursor: pointer;`" @click="handleTotalInclTaxClick(props)"> -->
               <div class="row text-left">
                <div class="col">
                      <q-icon name="info" size="18px"  color="grey-7"/>
                </div>
               <div class="col">
                     {{formatAmount(props.row.total_incl_tax,'%',2)}}
               </div>
               </div>


                 <q-tooltip anchor="bottom middle" self="top middle" >
                   <!-- <div class="text-white q-gutter-md" style="font-size: 2em"> -->

                    Details
                  <!-- <q-icon name="info"/> -->
                  <!-- </div> -->
                </q-tooltip>
              <!-- <Input
              :readonly="readonly_button"
              :no_label="true"
              v-model="props.row.totalprice"
              :dbComponentBehavior="dbComponentBehavior.invmain_table_itemcode"
              input-class="text-center"
              v-on:receiveChange="handleValueChangeMultiple(props)"
              /> -->
          </q-td>
        </template>
         <!-- <template v-slot:body-cell-totalprice="props">
            <q-td>
              <Input
              :readonly="readonly_button"
              :no_label="true"
              v-model="props.row.totalprice"
              :dbComponentBehavior="dbComponentBehavior.invmain_table_itemcode"
              input-class="text-center"
              v-on:receiveChange="handleValueChangeMultiple(props)"
              />
          </q-td>
        </template> -->

        <template v-slot:body-cell-totalprice="props">
            <q-td class="text-right">
                {{props.row.totalprice}}
          </q-td>
        </template>

        <template v-slot:body-cell-gst_tax_code="props">
            <q-td>
              <!-- <Input
              :readonly="readonly_button"
              :no_label="true"
              v-model="props.row.gst_tax_code"
              :dbComponentBehavior="dbComponentBehavior.invmain_table_tax_code"
              input-class="text-center"
              v-on:receiveChange="handleValueChangeMultiple(props)"
              /> -->
              {{props.row.gst_tax_code}}
              <!-- <Select
              :readonly="false"
              :no_label="true"
              v-model="props.row.gst_tax_code"
              :dbComponentBehavior="dbComponentBehavior.invmain_table_tax_code"
              :options="props.row.gst_tax_code_options"
              v-on:receiveChange="handleValueChange(props)"
              /> -->
          </q-td>
        </template>

        <template v-slot:body-cell-gst_tax_rate="props">
             <q-td style="text-align: right">
            <!-- <q-td :style="'text-align :'+props.col.align"> -->

              {{formatAmount(props.row.gst_tax_rate,'%',2)}}

              <!-- <Input
              :readonly="readonly_button"
              :no_label="true"
              v-model="props.row.gst_tax_rate"
              :dbComponentBehavior="dbComponentBehavior.invmain_table_gst_tax_rate"
              input-class="text-center"
              v-on:receiveChange="handleValueChangeMultiple(props)"
              /> -->
          </q-td>
        </template>

        <template v-slot:body-cell-gst_tax_amount="props">
            <q-td style="text-align: right">
              <!-- <q-td :style="'text-align :'+props.col.align"> -->
              {{formatAmount(props.row.gst_tax_amount,'$',2)}}

              <!-- <Input
              :readonly="readonly_button"
              :no_label="true"
              v-model="props.row.gst_tax_amount"
              :dbComponentBehavior="dbComponentBehavior.invmain_table_tax_amount"
              input-class="text-center"
              v-on:receiveChange="handleValueChangeMultiple(props)"
              /> -->
          </q-td>
        </template>

        <!-- <template v-slot:body-cell-total_incl_tax="props">
            <q-td>
              <Input
              :readonly="readonly_button"
              :no_label="true"
              v-model="props.row.total_incl_tax"
              :dbComponentBehavior="dbComponentBehavior.invmain_table_itemcode"
              input-class="text-center"
              v-on:receiveChange="handleValueChangeMultiple(props)"
              />
          </q-td>
        </template> -->

        <!-- <template v-slot:body-cell-created_at="props">
            <q-td>
              <Input
              :readonly="readonly_button"
              :no_label="true"
              v-model="props.row.created_at"
              :dbComponentBehavior="dbComponentBehavior.invmain_table_itemcode"
              input-class="text-center"
              v-on:receiveChange="handleValueChangeMultiple(props)"
              />
          </q-td>
        </template>

        <template v-slot:body-cell-created_by="props">
            <q-td>
              <Input
              :readonly="readonly_button"
              :no_label="true"
              v-model="props.row.created_by"
              :dbComponentBehavior="dbComponentBehavior.invmain_table_itemcode"
              input-class="text-center"
              v-on:receiveChange="handleValueChangeMultiple(props)"
              />
          </q-td>
        </template>

        <template v-slot:body-cell-updated_at="props">
            <q-td>
              <Input
              :readonly="readonly_button"
              :no_label="true"
              v-model="props.row.updated_at"
              :dbComponentBehavior="dbComponentBehavior.invmain_table_itemcode"
              input-class="text-center"
              v-on:receiveChange="handleValueChangeMultiple(props)"
              />
          </q-td>
        </template>

        <template v-slot:body-cell-updated_by="props">
            <q-td>
              <Input
              :readonly="readonly_button"
              :no_label="true"
              v-model="props.row.updated_by"
              :dbComponentBehavior="dbComponentBehavior.invmain_table_itemcode"
              input-class="text-center"
              v-on:receiveChange="handleValueChangeMultiple(props)"
              />
          </q-td>
        </template> -->





    </q-table>
</div>
</template>

<script>
import Button_icon from 'src/components/HONDA/Base/Button_icon'
import Input from 'src/components/RIMS/Base/Input'
import Select from 'src/components/HONDA/Base/Select'
import Timepicker from 'src/components/HONDA/Base/Timepicker';
import Datepicker from 'src/components/HONDA/Base/Datepicker';
import SelectFilter from 'src/components/HONDA/Base/SelectFilter'
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
    "view_button","delete_button","header_button_add","header_button_delete","pass_row_key","showAddLoading","readonly_button","removeTableCheckAll"],
    components: {
      Button_icon,
      Input,
      Select,
      Timepicker,
      Datepicker,
      SelectFilter,
      Checkbox,
    },
    created() {
    },
    computed: {
      dbComponentBehavior() {
        return this.$store.getters['dbComponentBehavior/byLanguage']('tta')
      },
    },
    mounted() {
      this.onRequest({
        pagination: this.pagination,
        filter: undefined
      })
    },
    methods: {
      formatAmount(value, type, decimal)
      {
          if(type == "$")
          {
              var value = Number(value).toFixed(decimal);
          }
          else if(type == "%")
          {
              var value = Number(value).toFixed(decimal);
          }
          else
          {
              var value = value;
          }

          var parts = value.toString().split(".");
          const numberPart = parts[0];
          const decimalPart = parts[1];
          const thousands = /\B(?=(\d{3})+(?!\d))/g;
  // return numberPart.replace(thousands, ",") + (decimalPart ? "." + decimalPart : "");

          return numberPart.replace(thousands, ",") + (decimalPart ? "." + decimalPart : "");
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
      handleTotalInclTaxClick(props)
      {
        this.$emit('receiveTotalInclTaxClick', props);
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

* >>> .q-table > tbody > tr > td:nth-child(1)
{
  border-left: 1px solid #0000001f;
}

* >>> .q-table > tbody > tr > td:last-child
{
  border-right: 1px solid #0000001f;
}
</style>

