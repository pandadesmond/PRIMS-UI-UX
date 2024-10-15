<template>
  <div>
    <!-- {{utility}} -->
    <q-table
      title=""
      :rows="rows"
      :columns="columns"
      row-key="name"
      separator="cell"
      flat
      table-style="border: 1px solid #EFECEC"
      :pagination="{ rowsPerPage: 0}"
      :rows-per-page-options="[10, 25, 50, 100, 0]"
      :filter="filter"
      hide-pagination
    >
      <!-- hide-pagination -->
      <!-- :rows-per-page-options="[10,30,50,100,0]" -->
      <!-- <template v-slot:top>
        <q-space />
        <q-input  @update:model-value="handleFilterChange" borderless dense debounce="300" color="primary" v-model="filter" placeholder="Search" style="border: 1px solid #c1c1c1; padding-left: 10px;">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template> -->

      <template v-slot:top-right v-if="!hide_search">
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>


      <!-- <template v-slot:header-cell-checkbox="props">
        <q-th :props="props">
          <q-checkbox v-model="selectAll" @update:model-value="handleChangeThCheckbox"/>
        </q-th>
      </template> -->
      <template v-slot:header="props">
        
        <q-tr :props="props" style="background-color: #295fbd; color: white;">
          <q-th rowspan="3">Lot</q-th>
          <q-th rowspan="3">Tenant</q-th>
          <q-th rowspan="3">Type</q-th>
          <q-th rowspan="3">Date</q-th>
          <!-- <q-th rowspan="3">Remarks</q-th> -->

          <q-th colspan="4">Meter <span v-if="electric_unit !=''">(</span>{{electric_unit}}<span v-if="electric_unit !=''">)</span></q-th>

          <q-th colspan="4">Utilities</q-th>

        </q-tr>

        <q-tr :props="props" style="background-color: #295fbd; color: white;">

          <q-th  style="border-left: 1px solid #0000001f !important;">Last</q-th>
          <q-th >Current</q-th>
          <q-th >Usage</q-th>
          <q-th >Total</q-th>
          <q-th >Flat Rate</q-th>
          <q-th v-if="utility == 'electricity'">KWTBB</q-th><!-- checking to show only for electricity-->
          <q-th v-if="utility == 'electricity'">ICPT</q-th><!-- checking to show only for electricity-->
          <q-th >Grand Total </q-th>
        </q-tr>

        <!-- <q-tr :props="props" style="background-color: #295fbd; color: white;">

          <q-th style="border-left: 1px solid #0000001f;">{{pass_flat_rate}}</q-th>
          <q-th v-if="utility == 'electricity'" style="border-left: 1px solid #0000001f;">{{pass_kwtbb}}</q-th>
          <q-th v-if="utility == 'electricity'">{{pass_icpt}}</q-th>

        </q-tr> -->

        <!-- <q-tr :props="props" style="background-color: #295fbd; color: white;">

          <q-th>Flat Rate</q-th>
          <q-th>Flat Rate</q-th>
          <q-th>Flat Rate</q-th>


        </q-tr> -->




      </template>

      <template v-slot:body="props">

          <!-- <template v-for="details in rows" :key="details"> -->

              <q-tr :props="props">
                  <template v-for="(value,header,index) in props.row" :key="index">

                      <q-td v-if="header == 'lot' || header == 'tenant'" :class="props.cols[index].classes" :style="['cursor: context-menu;text-align: left;','text-align:'+props.cols[index].align+';']">

                            {{props.row[header]}}
   
                      </q-td>

                      <q-td v-if="header == 'utility_rate_name'" :class="props.cols[index].classes" :style="['cursor: context-menu;text-align: left;','text-align:'+props.cols[index].align+';']">

                        {{props.row[header]}}

                      </q-td>

                      <q-td v-if="header == 'dateto'" :class="props.cols[index].classes" :style="['cursor: context-menu;text-align: left;','text-align:'+props.cols[index].align+';']">
                        {{props.row[header]}}
                      </q-td>

                      <q-td v-if="header == 'usage' || header == 'last'"  :class="props.cols[index].classes" :style="['cursor: context-menu;text-align: left;','text-align:'+props.cols[index].align+';']">
                          
                          <template v-if="props.row.utility_rate_guid == ''">
                            -
                          </template>

                          <template v-else>
                            {{formatAmount(props.row[header],'$',2)}}
                          </template>
                      </q-td>

                      <q-td v-if="header == 'total'"  :class="props.cols[index].classes" :style="['cursor: context-menu;text-align: left;','text-align:'+props.cols[index].align+';']">
                          
                          <template v-if="props.row.utility_rate_guid == ''">
                            -
                          </template>

                          <template v-else>
                            <span v-if="props.row[header] != '' && props.row[header] != 'null' && props.row[header] != null ">{{amount_unit}}</span>{{formatAmount(props.row[header],'$',2)}}
                          </template>
                      </q-td>

                      <q-td v-if="header == 'grand_total'"  :class="props.cols[index].classes" :style="['cursor: context-menu;text-align: left;','text-align:'+props.cols[index].align+';']">
                          
                          <template v-if="props.row.utility_rate_guid == ''">
                            -
                          </template>

                          <template v-else>
                            <span v-if="props.row[header] != '' && props.row[header] != 'null' && props.row[header] != null ">{{amount_unit}}</span>{{formatAmount(props.row[header],'$',2)}}
                          </template>
                      </q-td>
                      
                      <template v-if="utility == 'electricity'"> <!-- checking to show only for electricity-->
                      <q-td v-if="header == 'icpt'"  :class="props.cols[index].classes" :style="['cursor: context-menu;text-align: left;','text-align:'+props.cols[index].align+';']">
                          
                          <template v-if="props.row.utility_rate_guid == ''">
                            -
                          </template>

                          <template v-else>
                            <b v-if="pass_icpt == ''">({{formatAmount(props.row[header].rate,'$',2)}}%)</b>
                            {{amount_unit}}{{formatAmount(props.row[header].value,'$',2)}}
                          </template>
                      </q-td>

                      <q-td v-if="header == 'kwtbb'"  :class="props.cols[index].classes" :style="['cursor: context-menu;text-align: left;','text-align:'+props.cols[index].align+';']">
                          
                          <template v-if="props.row.utility_rate_guid == ''">
                            -
                          </template>

                          <template v-else>
                            <b v-if="pass_kwtbb == ''">({{formatAmount(props.row[header].rate,'$',2)}}%)</b>
                            {{amount_unit}}{{formatAmount(props.row[header].value,'$',2)}}
                          </template>
                      </q-td>
                      </template>

                      <q-td v-if="header == 'flat_rate'" :class="props.cols[index].classes" :style="['cursor: context-menu;text-align: left;','text-align:'+props.cols[index].align+';']">
                          
                          <!-- <template v-if="props.row.utility_rate_guid == ''">
                            -
                          </template>

                          <template v-else>
                            {{formatAmount(props.row[header],'$',2)}}
                          </template> -->
                          <!-- {{props.row[header]}} -->

                          <template v-if="pass_flat_rate != ''">
                            <b v-if="pass_kwtbb == ''">({{formatAmount(props.row[header],'%',2)}}%)</b>
                            {{formatAmount(props.row.total,'$',2)}}
                          </template>

                          <template v-else>

                            <template v-if="props.row[header].length > 0">

                              <template v-for="(level_details, xindex) in props.row[header]" :key="xindex">

                                <span v-if="props.row[header].length == (xindex+1)">
                                  <b>Above</b> {{formatAmount(level_details.value,'$',2)}}%
                                </span>

                                <span v-else>
                                  <b>&lt; {{level_details.counter}}</b> - {{formatAmount(level_details.value,'$',2)}}%
                                  <br>
                                </span>

                              </template>

                            </template>

                            <template v-else>
                              -
                            </template>

                          </template>


                          
                          


                      </q-td>
                      
                      <q-td v-if="header != 'utility_rate_name' && header != 'dateto' && header != 'lot' && header != 'tenant' && header != 'last' && header != 'usage' && header != 'flat_rate' && header != 'kwtbb' && header != 'icpt' && header != 'total' && header != 'grand_total' && header != 'utility_rate_guid' && header != 'sublot_guid' && header != 'estimated'" :style="['cursor: pointer;','text-align:'+props.cols[index].align+';']" @click="handleTdClick(props.row[header], header, props.row)">
                          <!-- {{props}} -->
                          <!-- {{props.cols[index]}} -->
                          <!-- {{header}} -->

                          <template v-if="props.row.utility_rate_guid == ''">
                            -
                          </template>

                          <template v-else>
                            <b v-if="props.row.estimated == 1 && header == 'current'">(Estimated) </b>{{formatAmount(props.row[header],'$',2)}}
                          </template>

                      </q-td>
                  </template>

              </q-tr>

          <!-- </template> -->

      </template>

    </q-table>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  data()
  {
    return{
        columns: [],
        rows: [],
        filter: '',
        selectAll: false,
        title: this.table_title,
        checked_false: false,
        formattedValue: '',
        newValue: '',
        input_field_type: '',
    }
  },
  props: ['table_column', 'table_data', 'delete_button', 'view_button', 'edit_button', 'print_button','xselectAll', 'table_title', 'hide_search','electric_unit','amount_unit','utility','pass_flat_rate','pass_kwtbb','pass_icpt'],
  methods:{
    computedFormatValue: {
        get() {
            return this.formatValue(scope.value);
        },
        set(value) {
            this.formattedValue = value;
        }
    },
    formatAmount(value, type, xdecimal = "not_declare")
    {
        var ori_value = value;
// console.log(value);
// console.log('until here, need to defined back all using rate one using rate. For example, flat rate using dollar sign for data formatting. Maybe can correct previous data type first with previous method see work or no formatting');
        // if(value != '')
        // {
        //   console.log(value);
        //   if(type == "$")
        //   {
        //     var decimal = xdecimal == "not_declare" ? 2 : xdecimal;
        //     var value = Number(value).toFixed(decimal);
            
        //   }

        //   if(type == "%")
        //   {
        //     if(xdecimal == "not_declare")
        //     {
        //       var value = value;
        //     }
        //     else
        //     {
        //       var value = Number(value).toFixed(xdecimal);
        //     }
        //   }
        // }

  

        // console.log(value);

        //capture  1,234 or 123.00 or 1,234.00 or 1,234.00 or 1,234,567.00 or 1,234,567
        // const containsOnlyNumbers = str => /^(\d{1,3}(,\d{3})*|\d+)(\.\d{2})?$/.test(str);
        // const containsOnlyNumbers = str => /^(\d{1,3}(,\d{3})*|\d+)(\.\d{1,2}|\.\d+)?$/g.test(str);
        // const containsOnlyNumbers = str => /^(\d{1,3}(,\d{3})*|\d+)(\.\d{1,2})?$/.test(str);//cannot detect decimal
        // const containsOnlyNumbers = str => /^-?(\d{1,3}(,\d{3})*|\d+)(\.\d{1,2})?$/.test(str);//can detect negative
        const containsOnlyNumbers = str => /^-?(\d{1,3}(,\d{3})*|\d+)(\.\d+)?$/.test(str);

        // alert('until checking amount, when click string on table cannot show value yet. save function dont have yet because need emit parent and parent save and hide popup. Waiting jimmy give utility name and need control one lot can only one type of each');
        var is_number = containsOnlyNumbers(value);

        if(is_number)
        {
        
          var amount_type = this.amount_type;

          if(type == "%")
          {
              // console.log('divide 1000');
              var decimal = xdecimal == "not_declare" ? 1 : xdecimal;
              var value = Number(value)/1000;
          }
          else
          {
              // console.log('no divide');
              var decimal = xdecimal == "not_declare" ? 0 : xdecimal;
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

          return numberPart.replace(thousands, ",") + (decimalPart ? "." + decimalPart : "");
        }
        else
        {
          return value;
        }

        
    },
    handlePopupSave(value,header,column_index,payload, event)
    {
        var row = payload.rowIndex;
        var column = column_index;

        var newValue = this.newValue;

        // console.log(this.formatAmount(newValue,'$'));

        // this.rows[row][header] = newValue;

        var main_json = {
            value:newValue,
            payload,
            event
        }
        
        this.$emit('receiveSave',main_json);

        // console.log(event);
        // event.cancel();

    },
    handleTdClick(value, header, payload)
    {
        if(payload.utility_rate_guid == '')
        {
          return;
        }

        if(header == "remarks")
        {
          this.input_field_type = "text";
        }
        else
        {
          this.input_field_type = "number";
        }

        // this.formattedValue = this.formatValue(value);
        var newValue = value.toString().replace(',','');
        this.newValue = newValue;
        
        this.$nextTick(() => {
            setTimeout(()=>{
                this.$refs.inputRef[0].select()
            },100);
        });
    },
    handleFilterChange(newVal)
    {
      this.$nextTick(()=>{
        this.$emit('receiveFilterChange',this.filter);
      });
      
    },
    handleCheck(payload)
    {
      // var total = this.table_data.length;
      // var checked = this.table_data.filter((entry)=>{
      //   return entry.checkbox;
      // });

      // if(total == checked.length){
      //   this.selectAll = true;
      // }
      // else
      // {
      //   this.selectAll = false;
      // }

      // this.$emit('receiveCheck');

      Object.keys(this.table_data).forEach((index)=>{
        
        if(this.table_data[index].utility_rate_transaction_guid == payload.utility_rate_transaction_guid)
        {
          this.table_data[index].checkbox = true;
        }
        else
        {
          this.table_data[index].checkbox = false;
        }
      });

      // this.$emit('receiveCheckbox',payload);
    },

    handleChangeThCheckbox(newVal){
      this.$emit('receiveChangeThCheckbox', newVal)
    },
    print(payload){
      this.$emit('receivePrint', payload);
    },
    xdelete(payload){
      this.$emit('receiveDelete', payload);
    },
    edit(payload){
      this.$emit('receiveEdit', payload);
    },
    view(payload){
      this.$emit('receiveView', payload);
    },
    alignedValue(val) {
      if (isNaN(val)) {
        return 'left';
      } else {
        return 'right';
      }
    }
  },
  watch:{
        table_column(newVal)
        {
            this.columns = newVal;
        },
        table_data(newVal)
        {
            this.rows = newVal;
            this.$emit('finishLoading');
        },
        table_title(newVal)
        {
            this.title = newVal;
        },
        xselectAll(newVal)
        {
            this.selectAll = newVal;
        }
  },
}
</script>

<style scoped>
* >>> .q-table__card {
    color: #000;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: unset;
}

.button_action{
  padding-left: 5px;
  padding-right: 5px;
  padding-top: 5px;
  padding-bottom: 5px;
  margin-left: 5px;
}

* >>> thead
{
    /* background-color: #dee1e6; */
    background-color: #dee1e6;
}

* >>> tr, * >>> td
{
    height: 35px !important;
}

* >>> .q-table__top {
    border-bottom: 0px;
}

* >>> .q-table__bottom
{
  border: 1px solid #0000001f;
}

.text_align_right >>> .q-field__inner > .q-field__control > .q-field__control-container > .q-field__native 
{
  text-align: right;
}

thead > tr
{
  background-color: #dee1e6 !important;
}


thead > tr > th
{
  color: black;
}

</style>
