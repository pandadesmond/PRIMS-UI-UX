<template>
  <div>
    <q-table
        flat bordered
        title=""
        :rows="rows"
        :columns="columns"
        row-key="name"
        :pagination="{ rowsPerPage: 999999 }"
        hide-pagination
        separator="cell"
        table-style="border: 1px solid #EFECEC"
    >

    <template v-slot:header-cell-sequence="props">
      <q-th :props="props" style="text-align: center;">
        No
      </q-th>
    </template>

    <template v-slot:header-cell-type="props">
      <q-th :props="props" style="text-align: center;">
        Type
      </q-th>
    </template>

    <template v-slot:header-cell-value="props">
      <q-th :props="props" style="text-align: center;">
        Charge
      </q-th>
    </template>

    <template v-slot:header-cell-quantity="props">
      <q-th :props="props" style="text-align: center;">
        Amount
      </q-th>
    </template>





      <template v-slot:body="props">
        <q-tr :props="props">

          <q-td key="action" :props="props">
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

                <q-btn icon="delete" color="negative" dense :outline="button_no_outline" ripple class="q-mr-none" @click.stop="xdelete(props.row)"
                v-if="delete_button">
                    <q-tooltip>
                        Delete
                    </q-tooltip>
                </q-btn>
          </q-td>

          <q-td key="sequence" :props="props">
            {{ props.row.sequence }}
          </q-td>

          <q-td key="type" :props="props">
            <!-- {{ props.row.type }} -->
            <span v-if="props.row.type == 'base'">Base</span>
            <span v-if="props.row.type == 'sale_percent'">Sales %</span>
          </q-td>

          <q-td :style="[props.row.type == 'sale_percent' && 'cursor:pointer;']" key="value" :props="props" @click="handleTdClick(props.row.value, header, props.row, 'xinputRef')">
            {{ props.row.value }}
            <q-popup-edit v-if="props.row.type == 'sale_percent'"  style="padding: 0px;"  @show="focusInput" v-model="props.row.value" v-slot="scope">
              <q-card>
                  <q-card-section style="padding-bottom: 0px;">
                      <div class="text-h6">Update</div>
                  </q-card-section>

                  <q-card-section style="padding-bottom: 5px;">
                      <q-input type="number" input-style="text-align: right;" ref="xinputRef" v-model="newValue" @keyup.enter="handlePopupSave(value,'value',index,props, scope)"/>

                      <center>
                          <q-btn flat style="color: #1976d2" label="CANCEL" @click.stop.prevent="scope.cancel"/>
                          <q-btn flat style="color: #1976d2" label="SET" @click="handlePopupSave(value,'value',index,props, scope)"/>
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
          </q-td>

          <q-td :style="[props.row.type == 'sale_percent' && 'cursor:pointer;']" key="quantity" :props="props"  @click="handleTdClick(props.row.quantity, header, props.row, 'xxinputRef')">
            {{ props.row.quantity }}
            <q-popup-edit v-if="props.row.type == 'sale_percent'" style="padding: 0px;"  @show="focusInput" v-model="props.row.quantity" v-slot="scope">
              <q-card>
                  <q-card-section style="padding-bottom: 0px;">
                      <div class="text-h6">Update</div>
                  </q-card-section>

                  <q-card-section style="padding-bottom: 5px;">
                      <q-input type="number" input-style="text-align: right;" ref="xxinputRef" v-model="newValue" @keyup.enter="handlePopupSave(value,'quantity',index,props, scope)"/>

                      <center>
                          <q-btn flat style="color: #1976d2" label="CANCEL" @click.stop.prevent="scope.cancel"/>
                          <q-btn flat style="color: #1976d2" label="SET" @click="handlePopupSave(value,'quantity',index,props, scope)"/>
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
          </q-td>
          <!-- <q-td key="operation_hours" :props="props"  @click="handleTdClick(props.row.operation_hours, header, props.row, 'xinputRef')">
            {{ props.row.operation_hours }}
            <q-popup-edit style="padding: 0px;"  @show="focusInput" v-model="props.row.operation_hours" v-slot="scope">
                <q-card>
                    <q-card-section style="padding-bottom: 0px;">
                        <div class="text-h6">Update</div>
                    </q-card-section>

                    <q-card-section style="padding-bottom: 5px;">
                        <q-input type="text" ref="xinputRef" v-model="newValue" @keyup.enter="handlePopupSave(value,header,index,props, scope)"/>

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
          </q-td> -->
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
    data() {
        return {
            columns: this.table_column,
            rows: this.table_data,
            newValue: '',
        }
    },
    methods:{
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
      handleTdClick(value, header, payload, component)
      {
          // this.formattedValue = this.formatValue(value);
          var newValue = value.toString().replace(',','');
          this.newValue = newValue;
          
          this.$nextTick(() => {
              setTimeout(()=>{
                

                if(this.$refs[component] != undefined && this.$refs[component] != "undefined")
                {
                  this.$refs[component].select()
                }
                
                  
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
    props: ['table_column','table_data', 'delete_button', 'view_button', 'edit_button', 'print_button'],
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
        }
    }
}
</script>

<style scoped>
*>>> thead{
  background-color: #dee1e6;
}
</style>
