<template>
  <div>
    <q-table
      title=""
      :rows="rows"
      :columns="columns"
      row-key="name"
      separator="cell"
      flat
      table-style="border: 1px solid #EFECEC"
      :pagination="{ rowsPerPage: 999999 }"
      hide-pagination
      :filter="filter"
    >

      <!-- :rows-per-page-options="[10,30,50,100,0]" -->
      <!-- <template v-slot:top>
        <q-space />
        <q-input  @update:model-value="handleFilterChange" borderless dense debounce="300" color="primary" v-model="filter" placeholder="Search" style="border: 1px solid #c1c1c1; padding-left: 10px;">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template> -->

      <!-- <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template> -->

      <template v-slot:top-right>
        <q-btn v-if="top_button" v-on:click="header_button()" :flat="true" label="ADD"  dense ripple class="q-py-none top_button" style="background-color:#273655 !important; font-size: 15px;color:white;"/>
      </template>


      <!-- <template v-slot:header-cell-checkbox="props">
        <q-th :props="props">
          <q-checkbox v-model="selectAll" @update:model-value="handleChangeThCheckbox"/>
        </q-th>
      </template> -->

      <template v-slot:body="props">
        <!-- <template v-for="details in props" :key="details"> -->
            <q-tr >

                <template v-for="column_details in props.cols" :key="column_details">
                  <q-td v-if="column_details.name == 'checkbox'" :style="['text-align:'+column_details.align+';', column_details.style]">
                    <q-checkbox v-model="props.row.checkbox" @update:model-value="handleCheck(props.row)"/>
                  </q-td>

                    <q-td v-else-if="column_details.name == 'action'" :style="['text-align:'+column_details.align+';', column_details.style]">
                        <q-btn size="10px" icon="edit_note" color="info" dense outline="false" ripple class="button_action" v-on:click="edit(props.row)"
                        v-if="edit_button">
                            <!-- <q-tooltip>
                                Edit
                            </q-tooltip> -->
                        </q-btn>

                        <q-btn size="10px" icon="visibility" color="primary" dense outline="false" ripple class="button_action" v-on:click="view(props.row)"
                        v-if="view_button">
                            <q-tooltip>
                                View
                            </q-tooltip>
                        </q-btn>

                        <q-btn size="10px" icon="delete" color="negative" dense outline="false" ripple class="button_action" v-on:click="xdelete(props.row)"
                        v-if="delete_button && props.row.first_group_line == 1">
                            <q-tooltip>
                                Delete
                            </q-tooltip>
                        </q-btn>

                        <q-btn size="10px" icon="print" color="grey-8" dense outline="false" ripple class="button_action" v-on:click="print(props.row)"
                        v-if="print_button">
                            <q-tooltip>
                                Print
                            </q-tooltip>
                        </q-btn>
                    </q-td>



                    <q-td v-else-if="column_details.name == 'active'" :style="['text-align:'+column_details.align+';', column_details.style]">
                            <!-- {{props.row[column_details.name]}} -->
                            <q-checkbox  v-model="props.row[column_details.name]" :true-value="1" :false-value="0" disable/>
                    </q-td>

                    <q-td v-else-if="column_details.name == 'quantity' || column_details.name == 'amount' || column_details.name == 'unit_price' || column_details.name == 'discount_value'" :style="['text-align:'+alignedValue(props.row[column_details.name])+';', column_details.style]">
                            <!-- {{props.row[column_details.name]}} -->
                            {{formatAmount(props.row[column_details.name],'$', 2)}}
                    </q-td>



                    <!-- <q-td v-else :style="['text-align:'+column_details.align+';', column_details.style]">
                        {{props.row[column_details.name]}}
                    </q-td> -->

                    <q-td v-else :style="['text-align:'+alignedValue(props.row[column_details.name])+';', column_details.style]">
                        {{props.row[column_details.name]}}
                    </q-td>

                </template>
            </q-tr>
        <!-- </template> -->

        <!-- <q-tr :props="props">

          <q-td key="action" :props="props">
            {{props}}
             <q-btn icon="edit_note" color="info" dense outline="false" ripple class="button_action" v-on:click="edit(props.row)"
              v-if="edit_button">
                  <q-tooltip>
                      Edit
                  </q-tooltip>
              </q-btn>

              <q-btn icon="visibility" color="primary" dense outline="false" ripple class="button_action" v-on:click="view(props.row)"
              v-if="view_button">
                  <q-tooltip>
                      View
                  </q-tooltip>
              </q-btn>

              <q-btn icon="delete" color="negative" dense outline="false" ripple class="button_action" v-on:click="xdelete(props.row)"
              v-if="delete_button">
                  <q-tooltip>
                      Delete
                  </q-tooltip>
              </q-btn>

              <q-btn icon="print" color="grey-8" dense outline="false" ripple class="button_action" v-on:click="print(props.row)"
              v-if="print_button">
                  <q-tooltip>
                      Print
                  </q-tooltip>
              </q-btn>

          </q-td>

          <q-td key="name" :props="props">
            {{ props.row.name }}
          </q-td>
          <q-td key="calories" :props="props">
            <q-badge color="green">
              {{ props.row.calories }}
            </q-badge>
          </q-td>
          <q-td key="fat" :props="props">
            <q-badge color="purple">
              {{ props.row.fat }}
            </q-badge>
          </q-td>
          <q-td key="carbs" :props="props">
            <q-badge color="orange">
              {{ props.row.carbs }}
            </q-badge>
          </q-td>
          <q-td key="protein" :props="props">
            <q-badge color="primary">
              {{ props.row.protein }}
            </q-badge>
          </q-td>
          <q-td key="sodium" :props="props">
            <q-badge color="teal">
              {{ props.row.sodium }}
            </q-badge>
          </q-td>
          <q-td key="calcium" :props="props">
            <q-badge color="accent">
              {{ props.row.calcium }}
            </q-badge>
          </q-td>
          <q-td key="iron" :props="props">
            <q-badge color="amber">
              {{ props.row.iron }}
            </q-badge>
          </q-td>
        </q-tr> -->
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
    }
  },
  props: ['table_column', 'table_data', 'delete_button', 'view_button', 'edit_button', 'print_button','xselectAll', 'table_title', 'top_button'],
  methods:{
    header_button()
    {
      this.$emit('receiveTopRightButton');
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
    formatAmount(value, type, xdecimal = "not_declare")
    {
        var ori_value = value;
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
// return numberPart.replace(thousands, ",") + (decimalPart ? "." + decimalPart : "");

        return numberPart.replace(thousands, ",") + (decimalPart ? "." + decimalPart : "");
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
</style>
