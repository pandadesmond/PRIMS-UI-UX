<template>
<div>
    <q-table
    separator="cell"
    @request="onRequest"
    :filter="filter"
    v-model:pagination="pagination"
    binary-state-sort
    :loading="loading"
     :flat="flat_status" :bordered="bordered_status" class="main_table" :title="title" :row_per_page="row_per_page" :rows="rows" :columns="columns" :row-key="row_key" rows-per-page-label="Entries" :pagination-label="getPaginationLabel" :rows-per-page-options="row_per_page" @row-click="onRowClick">
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

        <template v-slot:top-right >

            <q-btn v-if="top_button" v-on:click="header_button()" label="NEW"  dense ripple class="q-py-none top_button" style="background-color:#273655 !important; font-size: 15px;color:white;"/>
            <q-btn v-else-if="top_button2" v-on:click="header_button()" label="ADD"  dense ripple class="q-py-none top_button" style="background-color:#273655 !important; font-size: 15px;color:white;"/>

       </template>

        <template v-slot:body="props">
        <!-- <template v-for="details in props" :key="details"> -->
            <q-tr >

                <template v-for="column_details in props.cols" :key="column_details">
                  <q-td v-if="column_details.name == 'checkbox'" :style="['text-align:'+column_details.align+';', column_details.style]">
                    <q-checkbox v-model="props.row.checkbox" @update:model-value="handleCheck(props.row)"/>
                  </q-td>

                    <q-td v-else-if="column_details.name == 'action'" :style="['text-align:'+column_details.align+';', column_details.style]">
                      
                      <q-btn icon="edit_note"  dense :outline="button_no_outline" ripple class="q-mr-sm button" v-on:click="edit(props.row)"
                      v-if="edit_button" @click.stop="btnclick">
                          <q-tooltip>
                              Edit
                          </q-tooltip>
                      </q-btn>

                      <q-btn icon="list"  dense :outline="button_no_outline" ripple class="q-mr-sm button" v-on:click="listing(props.row)"
                      v-if="list_button" @click.stop="btnclick">
                          <!-- <q-tooltip>
                              To Sub-Utilities
                          </q-tooltip> -->
                      </q-btn>

                    <q-btn icon="print"  :disabled="readonly_button" dense color="primary" :outline="button_no_outline" ripple class="q-mr-sm" v-on:click="print(props.row)"
                      v-if="print_button" @click.stop="btnclick">
                          <q-tooltip>
                              Print
                          </q-tooltip>
                      </q-btn>

                      <q-btn icon="view_list" color="positive" dense :outline="button_no_outline" ripple class="q-mr-sm" v-on:click="list(props.row)"
                      v-if="view_button">
                          <q-tooltip>
                              View
                          </q-tooltip>
                      </q-btn>
<!-- {{ props.row.isinvoice }} -->
                      <q-btn icon="delete" color="negative" dense :outline="button_no_outline" ripple class="q-mr-none" @click.stop="remove(props.row)"
                      v-if="delete_button && props.row.isinvoice == 0 ">
                          <q-tooltip>
                              Delete
                          </q-tooltip>
                      </q-btn>
                    </q-td>

                    <q-td v-else-if="column_details.name == 'tenant_code'" :style="['text-align:left;', column_details.style]">
                            <!-- {{props.row[column_details.name]}} -->
                            {{props.row[column_details.name]}}
                    </q-td>
                    <q-td v-else-if="column_details.name == 'tenant_name'" :style="['text-align:left;', column_details.style]">
                            <!-- {{props.row[column_details.name]}} -->
                            {{props.row[column_details.name]}}
                    </q-td>

                    <q-td v-else-if="column_details.name == 'barcode'" :style="['text-align:'+column_details.align+';', column_details.style]">
                        <q-badge :color="[props.row.status == 'Out' ? 'grey-5' : 'green']" style="padding-top: 5px; padding-bottom: 5px;" :text-color="[props.row.status == 'Out' ? 'black' : 'white']">
                            {{props.row[column_details.name]}}
                        </q-badge>
                    </q-td>

                    <q-td v-else-if="column_details.name == 'active'" :style="['text-align:'+column_details.align+';', column_details.style]">
                            <!-- {{props.row[column_details.name]}} -->
                            <q-checkbox  v-model="props.row[column_details.name]" :true-value="1" :false-value="0" disable/>
                    </q-td>

                    <q-td v-else-if="column_details.name == 'current'" :style="['text-align:'+alignedValue(props.row[column_details.name])+';', column_details.style]">
                            <!-- {{props.row[column_details.name]}} -->
                            {{formatAmount(props.row[column_details.name],'$')}}
                    </q-td>

                    <!-- <q-td v-else :style="['text-align:'+column_details.align+';', column_details.style]">
                        {{props.row[column_details.name]}}
                    </q-td> -->
                    <q-td v-else-if="column_details.name == 'unit_no'" :style="['text-align:left;', column_details.style]">
                            <!-- {{props.row[column_details.name]}} -->
                            {{props.row[column_details.name]}}
                    </q-td>

                    <q-td v-else :style="['text-align:'+alignedValue(props.row[column_details.name])+';', column_details.style]">
                        {{props.row[column_details.name]}}
                    </q-td>

                </template>
            </q-tr>
        <!-- </template> -->

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
    "action_button", "edit_button","list_button",
    "view_button","delete_button","header_button_add","header_button_delete","pass_row_key","showAddLoading","readonly_button",'top_button2','bordered_status',],
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
      remove(props)
      {
        this.$emit('main_delete',props);
      },
      alignedValue(val) {
        if (isNaN(val)) {
          return 'left';
        } else {
          return 'right';
        }
      },
      formatAmount(value, type)
      {
          var ori_value = value;
          var amount_type = type;

          if(amount_type == '%')
          {
              // console.log('divide 1000');
              var decimal = 1;
              var value = Number(value)/1000;
          }
          else
          {
              // console.log('no divide');
              var decimal = 2;
              var value = Number(value);
          }

          if(type == "$")
          {
              var value = Number(value).toFixed(decimal);
          }
          else if(type == "%")
          {
              var value = Number(ori_value).toFixed(1);//curent change to value always decimal 1 for percent
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
console.log(parts);
          return numberPart.replace(thousands, ",") + (decimalPart ? "." + decimalPart : "");
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
        listing : function(payload)
        {
            this.$emit('main_listing', payload)
        },
        print : function(payload)
        {
            this.$emit('main_print', payload)
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
        // delete_button : function()
        // {
        //     this.$emit('delete_button')
        // },
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
         header_button : function(payload)
        {
            this.$emit('head_button', payload)
        },
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
.table_wrapper{
  padding-top: 2px;
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
.top_button {
  width:65px;
}
* >>> .q-table__top {
    padding: 0px 0px;
    padding-bottom: 15px;

}
.button{
  background-color: #273655;
  color: white;
}

/* tr td:first-child{
  width: 80px;

} */
</style>

