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
          <!-- <q-th rowspan="3">Remarks</q-th> -->

          <q-th colspan="4">Meter <span v-if="electric_unit !=''">(</span>{{electric_unit}}<span v-if="electric_unit !=''">)</span></q-th>

          <q-th colspan="4">Utilities</q-th>

        </q-tr>

        <q-tr :props="props" style="background-color: #295fbd; color: white;">

          <q-th rowspan="2" style="border-left: 1px solid #0000001f !important;">Last</q-th>
          <q-th rowspan="2">Current</q-th>
          <q-th rowspan="2">Usage</q-th>
          <q-th rowspan="2">Total</q-th>
          <q-th >Flat Rate</q-th>
          <q-th v-if="utility == 'electricity'">KWTBB</q-th><!-- checking to show only for electricity-->
          <q-th v-if="utility == 'electricity'">ICPT</q-th><!-- checking to show only for electricity-->
          <q-th rowspan="2">Grand Total </q-th>
        </q-tr>

        <q-tr :props="props" style="background-color: #295fbd; color: white;">

          <q-th style="border-left: 1px solid #0000001f;">{{pass_flat_rate}}</q-th>
          <q-th v-if="utility == 'electricity'" style="border-left: 1px solid #0000001f;">{{pass_kwtbb}}</q-th><!-- checking to show only for electricity-->
          <q-th v-if="utility == 'electricity'">{{pass_icpt}}</q-th><!-- checking to show only for electricity-->

        </q-tr>

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

                      <q-td v-if="header == 'lot' || header == 'tenant'" :class="props.cols[index].classes" :style="['cursor: context-menu;text-align: left;','text-align:'+props.cols[index].align+';', 'background-color: #00000008;']">

                            {{props.row[header]}}
   
                      </q-td>

                      <q-td v-if="header == 'usage' || header == 'last'"  :class="props.cols[index].classes" :style="['cursor: context-menu;text-align: left;','text-align:'+props.cols[index].align+';', 'background-color: #00000008;']">
                          
                          <template v-if="props.row.utility_rate_guid == ''">
                            -
                          </template>

                          <template v-else>
                            <b v-if="props.row.estimated == 1 && header == 'last'">(Estimated) </b>{{formatAmount(props.row[header],'$',2)}}
                          </template>
                      </q-td>

                      <q-td v-if="header == 'total'"  :class="props.cols[index].classes" :style="['cursor: context-menu;text-align: left;','text-align:'+props.cols[index].align+';', 'background-color: #00000008;']">
                          
                          <template v-if="props.row.utility_rate_guid == ''">
                            -
                          </template>

                          <template v-else>
                            {{amount_unit}}{{formatAmount(props.row[header],'$',2)}}
                          </template>
                      </q-td>

                      <q-td v-if="header == 'grand_total'"  :class="props.cols[index].classes" :style="['cursor: context-menu;text-align: left;','text-align:'+props.cols[index].align+';', 'background-color: #00000008;']">
                          
                          <template v-if="props.row.utility_rate_guid == ''">
                            -
                          </template>

                          <template v-else>
                            {{amount_unit}}{{formatAmount(props.row[header],'$',2)}}
                          </template>
                      </q-td>
                      
                      <template v-if="utility == 'electricity'"> <!-- checking to show only for electricity-->
                      <q-td v-if="header == 'icpt'"  :class="props.cols[index].classes" :style="['cursor: context-menu;text-align: left;','text-align:'+props.cols[index].align+';', 'background-color: #00000008;']">
                          
                          <template v-if="props.row.utility_rate_guid == ''">
                            -
                          </template>

                          <template v-else>
                            <b v-if="pass_icpt == ''">({{formatAmount(props.row[header].rate,'$',2)}}%)</b>
                            {{amount_unit}}{{formatAmount(props.row[header].value,'$',2)}}
                          </template>
                      </q-td>

                      <q-td v-if="header == 'kwtbb'"  :class="props.cols[index].classes" :style="['cursor: context-menu;text-align: left;','text-align:'+props.cols[index].align+';', 'background-color: #00000008;']">
                          
                          <template v-if="props.row.utility_rate_guid == ''">
                            -
                          </template>

                          <template v-else>
                            <b v-if="pass_kwtbb == ''">({{formatAmount(props.row[header].rate,'$',2)}}%)</b>
                            {{amount_unit}}{{formatAmount(props.row[header].value,'$',2)}}
                          </template>
                      </q-td>
                      </template>

                      <q-td v-if="header == 'flat_rate'" :class="props.cols[index].classes" :style="['cursor: context-menu;text-align: left;','text-align:'+props.cols[index].align+';', 'background-color: #00000008;']">
                          
                          <!-- <template v-if="props.row.utility_rate_guid == ''">
                            -
                          </template>

                          <template v-else>
                            {{formatAmount(props.row[header],'$',2)}}
                          </template> -->
                          <!-- {{props.row[header]}} -->

                          <template v-if="pass_flat_rate != ''">
                            {{props.row.total}}
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
                      
                      <q-td v-if="header != 'got_opening' && header != 'lot' && header != 'tenant' && header != 'last' && header != 'usage' && header != 'flat_rate' && header != 'kwtbb' && header != 'icpt' && header != 'total' && header != 'grand_total' && header != 'utility_rate_guid' && header != 'sublot_guid' && header != 'estimated'" :style="['cursor: pointer;','text-align:'+props.cols[index].align+';']" @click="handleTdClick(props.row[header], header, props.row)">
                          <!-- {{props}} -->
                          <!-- {{props.cols[index]}} -->
                          <!-- {{header}} -->

                          <template v-if="props.row.utility_rate_guid == ''">
                            -
                          </template>

                          <template v-else>

                            <template v-if="props.row.got_opening">
                              {{formatAmount(props.row[header],'$',2)}}
                              <q-popup-edit style="padding: 0px;"  @show="focusInput" v-model="props.row[header]" v-slot="scope"  @save="handleSave($event,props,index)">
                                  <!-- <q-input type="number" v-model="scope.value" dense ref="inputRef" /> -->
                                  <!-- <q-input type="number" ref="inputRef" v-model="newValue"  @input="scope.value = formattedValue" />

                                  <q-btn flat style="color: #FF0080" label="CANCEL" @click.stop.prevent="scope.cancel"/>
                                  <q-btn flat style="color: #FF0080" label="SET" @click="handlePopupSave(value,header,index,props, scope)"/> -->
                                  <q-card>
                                      <q-card-section style="padding-bottom: 0px;">
                                          <!-- <div class="text-h6">Update</div> -->
                                          <div style="display: flex; align-items: center;">
                                            <label class="text-h6" style="font-weight: bold;">Update</label>
                                            <span style="display: flex; align-items: center; width: 100%; text-align: right;">
                                              <label class="text-h6" style="width: 100%;">Estimation</label>
                                              <q-checkbox v-model="estimation" />
                                              
                                            </span>
                                          </div>
                                      </q-card-section>

                                      <q-card-section style="padding-bottom: 5px;">
                                          <q-input :type="input_field_type" :class="input_field_type == 'number' && 'text_align_right'" ref="inputRef" v-model="newValue"  @input="scope.value = formattedValue" @keyup.enter="handlePopupSave(value,header,index,props, scope)"/>

                                          <center>
                                              <q-btn flat style="color: #1976d2" label="CANCEL" @click.stop.prevent="scope.cancel"/>
                                              <q-btn flat style="color: #1976d2" label="SET" @click="handlePopupSave(value,header,index,props, scope)"/>
                                          </center>
                                      </q-card-section>

                                      <q-inner-loading
                                          :showing="visible"
                                          label=""
                                          label-class="text-red"
                                          label-style="font-size: 1.1em"
                                          style="color:#1976d2"
                                      />
                                  </q-card>
                              </q-popup-edit>
                            </template>

                            <template v-else>
                              <b>Please ensure opening existed</b>
                            </template>

                            
                            

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
        estimation: false,
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
        const containsOnlyNumbers = str => /^-?(\d{1,3}(,\d{3})*|\d+)(\.\d{1,2})?$/.test(str);//can detect negative

        
        


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
            event,
            estimation: this.estimation,
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

        this.estimation = false;

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
