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
      :loading="loading" >
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

      <!-- <template v-slot:top-right v-if="!hide_search">
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template> -->

      <template v-slot:top-right v-if="top_button">
        <q-btn flat style="background-color: #273655;" text-color="white" label="Add" @click="handleAddClick" />
      </template>


      <!-- <template v-slot:header-cell-checkbox="props">
        <q-th :props="props">
          <q-checkbox v-model="selectAll" @update:model-value="handleChangeThCheckbox"/>
        </q-th>
      </template> -->
      <template v-slot:header="props">
        
        <q-tr :props="props" style="background-color: #295fbd; color: white;">
          <q-th>Action</q-th>
          <q-th>Lot</q-th>
          <q-th>Tenant</q-th>
          <q-th>Rental Type</q-th>
          <q-th>Date From</q-th>
          <q-th>Date To</q-th>
          <q-th>Gross</q-th>
          <q-th>Claim</q-th>
          <q-th>Total</q-th>
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
                  <!-- <template v-for="(value,header,index) in props.row" :key="index"> -->

                      <!-- <q-td :class="props.cols[index].classes" :style="['cursor: context-menu;text-align: left;','text-align:'+props.cols[index].align+';', 'background-color: #00000008;']">
                        {{props.row.lot}}
                      </q-td> -->
                      <q-td :class="props.colsMap.lot.__thClass" :style="['cursor: context-menu;text-align: left;','text-align:'+props.colsMap.lot.align+';', '']">

                        <q-btn icon="edit_note" dense :outline="button_no_outline" ripple class="q-mr-sm button" v-on:click="edit(props.row)"
                        v-if="edit_button">
                            <q-tooltip>
                                Edit
                            </q-tooltip>
                        </q-btn>

                        <q-btn icon="view_list" color="positive" dense :outline="button_no_outline" ripple class="q-mr-sm" v-on:click="list(props.row)"
                        v-if="view_button">
                            <q-tooltip>
                                View
                            </q-tooltip>
                        </q-btn>

                        <q-btn icon="delete"  :disabled="readonly_button" dense color="negative" :outline="button_no_outline" ripple class="button" v-on:click="remove(props.row)"
                          v-if="delete_button && !props.row.invoice_child_existed">
                            <q-tooltip>
                                Delete
                            </q-tooltip>
                        </q-btn>

                      </q-td>

                      <q-td :class="props.colsMap.lot.__thClass" :style="['cursor: context-menu;text-align: left;','text-align:'+props.colsMap.lot.align+';', '']">
                        {{props.row.lot}}
                      </q-td>

                      <q-td :class="props.colsMap.tenant.__thClass" :style="['cursor: context-menu;text-align: left;','text-align:'+props.colsMap.tenant.align+';', '']">
                        {{props.row.tenant}}
                      </q-td>

                      <q-td :class="props.colsMap.tenant.__thClass" :style="['cursor: context-menu;text-align: left;','text-align:'+props.colsMap.tenant.align+';', '']">
                        {{props.row.rental_type_desc}}
                      </q-td>

                      <q-td :class="props.colsMap.date_from.__thClass" :style="['cursor: context-menu;text-align: left;','text-align:'+props.colsMap.date_from.align+';', '']">
                        {{props.row.date_from}}
                      </q-td>

                      <q-td :class="props.colsMap.date_to.__thClass" :style="['cursor: context-menu;text-align: left;','text-align:'+props.colsMap.date_to.align+';', '']">
                        {{props.row.date_to}}
                      </q-td>

                      <q-td :class="props.colsMap.gross.__thClass" :style="['cursor: context-menu;text-align: left;','text-align:'+props.colsMap.gross.align+';', '']" @click="handleTdClick(props.row.gross, 'gross', props.row, 'inputRef')">

                            {{formatAmount(props.row.gross,'$',2)}}
                            <!-- <q-popup-edit style="padding: 0px;"  @show="focusInput" v-model="props.row.gross" v-slot="scope"  @save="handleSave($event,props,index)">

                                <q-card>
                                    <q-card-section style="padding-bottom: 0px;">
                                        <div class="text-h6">Update</div>
                                    </q-card-section>

                                    <q-card-section style="padding-bottom: 5px;">
                                        <q-input type="number" :class="input_field_type == 'number' && 'text_align_right'" ref="inputRef" v-model="newValue"  @input="scope.value = formattedValue" @keyup.enter="handlePopupSave(value,'gross',index,props, scope)"/>

                                        <center>
                                            <q-btn flat style="color: #1976d2" label="CANCEL" @click.stop.prevent="scope.cancel"/>
                                            <q-btn flat style="color: #1976d2" label="SET" @click="handlePopupSave(value,'gross',index,props, scope)"/>
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
                            </q-popup-edit> -->
                      </q-td>

                      <q-td :class="props.colsMap.claim.__thClass" :style="['cursor: context-menu;text-align: left;','text-align:'+props.colsMap.claim.align+';', '']">
                        {{props.row.claim}}
                      </q-td>
                      <!-- background-color: #00000008; -->
                      <q-td :class="props.colsMap.total.__thClass" :style="['cursor: context-menu;text-align: left;','text-align:'+props.colsMap.total.align+';', '']">
                        <!-- {{props.row.total}} -->
                        {{formatAmount(props.row.total,'$',2)}}
                      </q-td>
                      
                  <!-- </template> -->

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
        visible: false,
        loading: false,
    }
  },
  props: ['table_column', 'table_data', 'top_button', 'delete_button', 'view_button', 'edit_button', 'print_button','xselectAll', 'table_title', 'hide_search','electric_unit','amount_unit','utility','pass_flat_rate','pass_kwtbb','pass_icpt','forceLoading'],
  methods:{
    handleAddClick()
    {
      this.$emit('receiveAddClick');
    },
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
        const containsOnlyNumbers = str => /^-?(\d{1,3}(,\d{3})*|\d+)(\.\d+)?$/.test(str);//can detect negative and all decimal

        
        


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
            header,
        }
        
        this.$emit('receiveSave',main_json);

        // console.log(event);
        // event.cancel();

    },
    handleTdClick(value, header, payload, component)
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
              this.$refs[component].select()
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
    print : function(payload)
    {
        this.$emit('main_print', payload)
    },
    edit : function(payload)
    {
        this.$emit('main_edit', payload);
    },
    list : function(payload)
    {
        this.$emit('main_list', payload)
    },
    remove : function(payload)
    {
        this.$emit('main_delete', payload)
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
            this.loading= false;
        },
        table_title(newVal)
        {
            this.title = newVal;
        },
        xselectAll(newVal)
        {
            this.selectAll = newVal;
        },
        forceLoading(newVal)
        {
            if(newVal)
            {
                this.loading = true;
            }
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

.button{
  background-color: #273655;
  color: white;
}

</style>
