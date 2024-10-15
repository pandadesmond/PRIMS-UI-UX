<template>
  <div>
    <q-table
        flat bordered
        separator="cell"
        title=""
        :rows="rows"
        :columns="columns"
        row-key="name"
        binary-state-sort
        :pagination="{ rowsPerPage: 999999 }"
        hide-pagination
    >
      <template v-slot:body="props">
        <q-tr :props="props">

            <q-td key="action" :props="props">
                <q-btn icon="edit_note"  dense :outline="button_no_outline" ripple class="q-mr-sm button" v-on:click="edit(props.row)"
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

                <q-btn icon="close"  :disabled="readonly_button" dense color="negative" :outline="button_no_outline" ripple class="button" v-on:click="remove(props.row)"
                v-if="props.row.posted == 1 && props.row.cancel != 1">
                    <q-tooltip>
                        Cancel
                    </q-tooltip>
                </q-btn>
            </q-td>

          <q-td key="unit_no" :props="props">
            {{ props.row.unit_no }}
          </q-td>
          <q-td key="operation_hours" :props="props"  @click="handleTdClick(props.row.operation_hours, 'operationhour_guid', props.row, 'xinputRef')" :style="[!posted && 'cursor: pointer;']">
            {{ props.row.operation_hours }}
            <q-popup-edit v-if="allow_edit && !posted" style="padding: 0px;"  @show="focusInput" v-model="props.row.operation_hours" v-slot="scope" >
                <q-card>
                    <q-card-section style="padding-bottom: 0px;">
                        <div class="text-h6">Update</div>
                    </q-card-section>

                    <q-card-section style="padding-bottom: 5px;">
                        <!-- <q-input type="text" ref="xinputRef" v-model="newValue" @keyup.enter="handlePopupSave(value,'operation_hours',index,props, scope)"/> -->

                        <SelectFilter
                        :disable="false"
                        :readonly="false"
                        :no_label="true"
                        v-model:pass_value="newValue"
                        :dbComponentBehavior="oridbComponentBehavior.select"
                        :options="operationhours_options"
                        v-on:receiveChange="handleChangeOperationHours"
                        />

                        <center>
                            <q-btn :loading="loadingPopupSave" flat style="color: #1976d2" label="CANCEL" @click.stop.prevent="scope.cancel"/>
                            <q-btn :loading="loadingPopupSave" flat style="color: #1976d2" label="SET" @click="handlePopupSave(value,'operationhour_guid',index,props, scope)"/>
                        </center>
                    </q-card-section>

                    <q-inner-loading
                        :showing="loadingPopupSave"
                        label=""
                        label-class="text-red"
                        label-style="font-size: 1.1em"
                        style="color:#1976d2"
                    />
                </q-card>
            </q-popup-edit>
          </q-td>

        <q-td key="rental_amount" :style="['text-align: right;', !posted && 'cursor: pointer;']" :props="props"  @click="handleTdClick(props.row.rental_amount, 'rental_amount', props.row, 'xxinputRef')">
            {{ props.row.rental_amount }}
            <q-popup-edit v-if="allow_edit && !posted" style="padding: 0px;"  @show="focusInput" v-model="props.row.rental_amount" v-slot="scope" >
                <q-card>
                    <q-card-section style="padding-bottom: 0px;">
                        <div class="text-h6">Update</div>
                    </q-card-section>

                    <q-card-section style="padding-bottom: 5px;">
                        <q-input type="text" input-style="text-align: right;" ref="xxinputRef" v-model="newValue" @keyup.enter="handlePopupSave(value,'rental_amount',index,props, scope)"/>

                        <center>
                            <q-btn :loading="loadingPopupSave" flat style="color: #1976d2" label="CANCEL" @click.stop.prevent="scope.cancel"/>
                            <q-btn :loading="loadingPopupSave" flat style="color: #1976d2" label="SET" @click="handlePopupSave(value,'rental_amount',index,props, scope)"/>
                        </center>
                    </q-card-section>

                    <q-inner-loading
                        :showing="loadingPopupSave"
                        label=""
                        label-class="text-red"
                        label-style="font-size: 1.1em"
                        style="color:#1976d2"
                    />
                </q-card>
            </q-popup-edit>
          </q-td>


          <q-td key="charge_type" :style="['text-align: left;', !posted && 'cursor: pointer;']" :props="props"  @click="handleTdClick(props.row.charge_type, 'charge_type', props.row, 'xxxinputRef')">
            {{ formatChargeType(props.row.charge_type) }}
            <q-popup-edit v-if="allow_edit && !posted" style="padding: 0px;"  @show="focusInput" v-model="props.row.rental_amount" v-slot="scope" >
                <q-card>
                    <q-card-section style="padding-bottom: 0px;">
                        <div class="text-h6">Update</div>
                    </q-card-section>

                    <q-card-section style="padding-bottom: 5px;">
                        
                        <MultiSelect
                        :readonly="false"
                        :no_label="true"
                        :text="'teo'"
                        :required="true"
                        v-model:pass_value="newValue"
                        :dbComponentBehavior="oridbComponentBehavior.select"
                        :options="charge_type_options"
                        v-on:receiveChangeMultiselect="handleChangeChargeType(props.row)"
                        :message="''"
                    />

                    <template v-for="details in charge_type_value" :key="details">

                        <label>{{ details.charge_type.charge_type_desc  }}</label>


                        <Input :no_label="true" :autofocusclick="true" :readonly="readonly ? true : false" v-on:change="handleChange" v-model="details.amount"
                        :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior : oridbComponentBehavior.text" :icon_append="icon_append"/>


                    </template>

                        
                        <center>
                            <q-btn :loading="loadingPopupSave" flat style="color: #1976d2" label="CANCEL" @click.stop.prevent="scope.cancel"/>
                            <q-btn :loading="loadingPopupSave" flat style="color: #1976d2" label="SET" @click="handlePopupSave(value,'charge_type',index,props, scope)"/>
                        </center>

                        
                        <!-- {{ props.row.agr_sublot_charge_type }} -->
<!-- {{ props.row.agr_sublot_charge_type }}

<br><br>
{{ charge_type_value }} -->
                        

                    </q-card-section>

                    <q-inner-loading
                        :showing="loadingPopupSave"
                        label=""
                        label-class="text-red"
                        label-style="font-size: 1.1em"
                        style="color:#1976d2"
                    />
                </q-card>
            </q-popup-edit>
          </q-td>


          <q-td key="sublot_utility" :props="props">
            {{ props.row.sublot_utility }}
          </q-td>

          <q-td key="cancel_reason" :props="props">
            {{ props.row.cancel_reason == "" || props.row.cancel_reason == "null" || props.row.cancel_reason == null ? '-' : props.row.cancel_reason }}
          </q-td>

        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
import { ref } from 'vue'
import MultiSelect from 'src/components/SUBLOT/General/MultiSelect';
import Input from 'src/components/SUBLOT/Base/Input';
import SelectFilter from 'src/components/SUBLOT/Base/SelectFilter'

export default {
    data() {
        return {
            columns: this.table_column,
            rows: this.table_data,
            newValue: '',
            charge_type_value: [],
            ori_charge_type_value: [],
        }
    },
    components: {
        MultiSelect,
        Input,
        SelectFilter,
    },
    computed:{
        // ...mapGetters("tta"),
        oridbComponentBehavior() {
            return this.$store.getters['dbComponentBehavior/byLanguage']('sublot')
        },
    },
    methods:{
        handleChangeChargeType(payload)
        {
            var filter_not_created = this.newValue.filter((entry)=>{

                var filter_sublot_charge_type = payload.agr_sublot_charge_type.filter((xentry)=>{
                    return xentry.charge_type_guid != entry;
                });

                return filter_sublot_charge_type.length > 0 ? true : false;
            });

            var new_charge_type = [];
            
            for (const index in this.newValue) {
                
                var filter_existed = this.ori_charge_type_value.filter((entry)=>{
                    return entry.charge_type_guid == this.newValue[index];
                });
                
                var filter = this.charge_type_options.filter((entry)=>{
                    return entry.value == this.newValue[index];
                });

                if(filter_existed.length > 0)
                {
                    var amount = filter_existed[0].amount
                    var description = filter_existed[0].charge_type.charge_type_desc
                }
                else
                {
                    var amount = filter.length > 0 ? filter[0].amount : 0;
                    var description = filter.length > 0 ? filter[0].label : 0;
                }

                var object = {
                    charge_type: {charge_type_desc: description},
                    amount: amount,
                    charge_type_guid: this.newValue[index],
                    agr_sublot_guid: payload.agr_sublot_guid
                };

                console.log(object);
                new_charge_type.push(object);
            }

            this.charge_type_value = new_charge_type;

            var filter_remain = this.ori_charge_type_value.filter((entry)=>{
 
                var filter = this.newValue.filter((xentry)=>{

                    return xentry == entry.charge_type_guid;
                });
                return filter.length > 0 ? true : false;
            });

            this.ori_charge_type_value = filter_remain
            
        },
        remove(payload)
        {
            this.$emit('receiveDelete', payload);
        },
        formatChargeType(value)
        {
            var string = '';

            for (const index in value) {
                var filter_details = this.charge_type_options.filter((entry)=>{
                    return entry.value == value[index];
                });

                string += filter_details.length > 0 ? ' '+filter_details[0].label+',' : '';
            }//close for loop
            
            string = string.replace(/,*$/, '');

            return string;
        },
        handleChange: function(event, newVal){
            // var temp_json = [];
            // this.bind_value = "dadas"
            newVal.row.charge_type = event;
            // this.$emit('update:pass_value', newVal)
            // this.$emit('receiveChangeMultiselect', newVal)
            // temp_json.push({"tab":"supplier_profile","seq":"2","value":this.json_container});
            // this.$emit('receiveChange',temp_json)
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
            else if(header == "charge_type")
            {
                this.charge_type_value = JSON.parse(JSON.stringify(payload.agr_sublot_charge_type));
                this.ori_charge_type_value = JSON.parse(JSON.stringify(payload.agr_sublot_charge_type))
            }
            else
            {
            this.input_field_type = "number";
            }

            // this.formattedValue = this.formatValue(value);

            var value = value == null || value == '' || value == 'null' ? '' : value;
            
            var newValue = value.toString().replace(',','');

            if(header == 'charge_type')
            {
                var value = value == null || value == '' || value == 'null' ? [] : value;
                var newValue = value;
            }
            else
            {
                var value = value == null || value == '' || value == 'null' ? '' : value;
                var newValue = value.toString().replace(',','');
            }

            this.newValue = newValue;
            
            this.$nextTick(() => {

                if(header != "charge_type")
                {
                    setTimeout(()=>{
                        this.$refs[component].select(); 
                    },100);
                }//becasue header charge type is dropdown no need autoselect
                
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
                charge_type_value: this.charge_type_value,
            }
            
            this.$emit('receiveSave',main_json);
        }
    },
    props: ['table_column','table_data','edit_button', 'view_button', 'delete_button','charge_type_options', 'loadingPopupSave','posted','operationhours_options','allow_edit'],
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
