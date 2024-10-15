<template>
  <div>
    <q-table
        flat bordered
        :title="title"
        :rows="rows"
        :columns="columns"
        row-key="name"
        binary-state-sort
        :pagination="{ rowsPerPage: 999999 }"
        hide-pagination
    >

    <template v-slot:header-cell-selected="props">
        <q-th :style="[`text-align:${props.col.align}`]">
            <q-checkbox v-model="selected_all"  @click="handleSelectAll(props)"/>
        </q-th>
    </template>

      <template v-slot:body="props">
        <q-tr :props="props">

        <q-td key="selected" :props="props">
            <q-checkbox v-model="props.row.selected"  @click="handleClickCheckbox($event, props)"/>
        </q-td>

        <q-td key="action" :props="props">
            <!-- <q-btn icon="edit_note"  dense :outline="button_no_outline" ripple class="q-mr-sm button" v-on:click="edit(props.row)"
            v-if="edit_button">
                <q-tooltip>
                    Edit
                </q-tooltip>
            </q-btn> -->

            <q-btn icon="view_list" color="positive" dense :outline="button_no_outline" ripple class="q-mr-sm" v-on:click="list(props.row)"
            v-if="view_button">
                <q-tooltip>
                    View
                </q-tooltip>
            </q-btn>
            
            <q-btn icon="delete"  :disabled="readonly_button" dense color="negative" :outline="button_no_outline" ripple class="button" v-on:click="remove(props.row)"
               v-if="delete_button && !props.row.payment_existed">
                <q-tooltip>
                    Delete
                </q-tooltip>
            </q-btn>
        </q-td>

        <q-td key="agr_refno" :props="props" style="cursor: pointer;" @click="handleClickPaymentStatus(props.row)">
            <b :style="[props.row.posted ? 'color: green;' : (props.row.payment_existed ? 'color: orange;' : '-')]">{{ props.row.agr_refno == "" ? '-' : props.row.agr_refno }}</b>
        </q-td>

        <q-td key="refno" :props="props" style="cursor: pointer;" @click="handleClickPaymentStatus(props.row)">
            <b :style="[props.row.posted ? 'color: green;' : (props.row.payment_existed ? 'color: orange;' : '-')]">{{ props.row.refno == "" ? '-' : props.row.refno }}</b>
        </q-td>

        <q-td key="payment_status" :props="props">
            <b :style="[props.row.posted ? 'color: green;' : (props.row.payment_existed ? 'color: orange;' : '-')]">{{ props.row.payment_status }}</b>
          </q-td>
        
        <q-td key="refund_allow" :props="props">
            {{ props.row.refund_allow }}
        </q-td>
        
        <q-td key="refund_value" :props="props">
            {{ props.row.refund_value }}
        </q-td>

          <q-td key="name" :props="props">
            {{ props.row.name }}
          </q-td>

            <q-td key="month" :props="props">
                {{formatAmount(props.row.month,'$')}}
            </q-td>

            <q-td key="amount" :props="props">
                {{formatAmount(props.row.amount,'$',2)}}
            </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
import { ref } from 'vue'
import Checkbox from 'src/components/SUBLOT/Base/Checkbox'

export default {
    data() {
        return {
            columns: this.table_column,
            rows: this.table_data,
            newValue: '',
            selected_all: this.selected_all_deposit,
            table_title: this.title ? this.title : '',
        }
    },
    components: {
      Checkbox,
    },
    computed: {
        dbComponentBehavior() {
            return this.$store.getters['dbComponentBehavior/byLanguage']('sublot')
        },
    },
    methods:{
        handleClickPaymentStatus(payload)
        {
            this.$nextTick(()=>{
                this.$emit('receiveTablePaymentStatusClick', payload);
            });
        },
        handleSelectAll()
        {
            this.$nextTick(()=>{
                this.$emit('receiveCheckAll');
            });
        },
        edit : function(payload)
        {
            this.$emit('main_edit', payload)
        },
        list : function(payload)
        {
            this.$emit('main_list', payload)
        },
        remove : function(payload)
        {
            this.$emit('main_delete', payload)
        },
        formatAmount(value, type, xdecimal = "not_declare")
        {
            var ori_value = value;

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

            var value = value == null || value == '' || value == 'null' ? '' : value;

            var newValue = value.toString().replace(',','');
            this.newValue = newValue;
            
            this.$nextTick(() => {
                setTimeout(()=>{
                        
                        this.$refs[component].select()

                    
                },100);
            });
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
        }
    },
    props: ['table_column','table_data','edit_button', 'view_button', 'delete_button', 'selected_all_deposit','title'],
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

        },
        table_data(newVal){
         // console.log('newVal', newVal)
            // this.rows = newVal;
            // this.loading = false;

            this.rows = newVal;
            this.loading = false;

        },
        forceLoading(newVal)
        {
            if(newVal)
            {
                this.loading = true;
            }
        },
        selected_all_deposit(newVal)
        {
            this.selected_all = newVal
        },
        title(newVal)
        {
            this.table_title = newVal
        }
    }
}
</script>

<style scoped>
.button{
  background-color: #273655;
  color: white;
}

* >>> .q-table__top
{
    padding-left: 0px;
}

* >>> .q-table__container
{
    border: 0;
}
</style>