<template>
   <div class="q-pa-md">
    <q-table
      title="Gold Pricing"
      :rows="rows"
      :columns="columns"
      row-key="name"
      :bordered="true"
      separator="cell"
      dense
      :visible-columns="visibleColumns"
      :rows-per-page-options="[0]"
    >
    <template v-slot:body="props">

        <!-- <template v-for="details in rows" :key="details"> -->

            <q-tr :props="props">
                <template v-for="(value,header,index) in props.row" :key="index">

                    <q-td v-if="header == 'purity'" :class="props.cols[index].classes" style="cursor: context-menu;text-align: left;">
                        {{props.row[header]}}
                    </q-td>

                    <q-td style="cursor: pointer;" v-if="header != 'purity_guid' && header != 'purity'" :class="header != 'purity_guid' && props.cols[index].classes" @click="handleTdClick(props.row[header])">
                        <!-- {{props}} -->
                        <!-- {{props.cols[index]}} -->
                        <!-- {{header}} -->
                        {{props.row[header]}}
                        <q-popup-edit style="padding: 0px;"  @show="focusInput" v-model="props.row[header]" v-slot="scope"  @save="handleSave($event,props,index)">
                            <!-- <q-input type="number" v-model="scope.value" dense ref="inputRef" /> -->
                            <!-- <q-input type="number" ref="inputRef" v-model="newValue"  @input="scope.value = formattedValue" />

                            <q-btn flat style="color: #FF0080" label="CANCEL" @click.stop.prevent="scope.cancel"/>
                            <q-btn flat style="color: #FF0080" label="SET" @click="handlePopupSave(value,header,index,props, scope)"/> -->
                            <q-card>
                                <q-card-section style="padding-bottom: 0px;">
                                    <div class="text-h6">Update Price</div>
                                </q-card-section>

                                <q-card-section style="padding-bottom: 5px;">
                                    <q-input type="number" ref="inputRef" v-model="newValue"  @input="scope.value = formattedValue" />

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
                    </q-td>
                </template>

            </q-tr>

        <!-- </template> -->

    </template>
    </q-table>
  </div>
  <!-- {{columns}}
  <br>
  <br>
  {{rows}} -->
</template>

<script>
export default {
    data(){
        return{
            columns: [],
            rows: [],
            visibleColumns: [ 'purity', 'Non-Member', 'STAFF', 'SILVER', 'MEMBER'],
            username: sessionStorage.getItem('user_name'),
            formattedValue: '',
            newValue: '',
            visible: false,
        }
    },
    props: ['pass_columns', 'pass_rows','forceLoading'],
    computed: {
        computedFormatValue: {
            get() {
                return this.formatValue(scope.value);
            },
            set(value) {
                this.formattedValue = value;
            }
        }
    },
    methods: {
        formatAmount(value, type){

            if(type == "$")
            {
                var value = Number(value).toFixed(2);
            }
            else if(type == "%")
            {
                var value = Number(value).toFixed(2);
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
        handlePopupSave(value,header,column_index,payload, event)
        {
            var row = payload.rowIndex;
            var column = column_index;

            var newValue = this.newValue;

            this.rows[row][header] = this.formatAmount(newValue,'$');

            var retailer_guid = payload.cols[column_index].retailer_guid;
            var cardtype_guid = payload.cols[column_index].cardtype_guid;
            var purity_guid = payload.row.purity_guid;

            var filter_payload = {
                params: {
                    retailer_guid,
                    purity_guid,
                    cardtype_guid,
                }
            };

            var main_json = {
                retailer_guid,
                purity_guid,
                cardtype_guid,
                value:newValue,
                event
            }

            this.$emit('receiveSave',main_json);

            // console.log(event);
            // event.cancel();

        },
        handleTdClick(value)
        {
            // this.formattedValue = this.formatValue(value);
            var newValue = value.toString().replace(',','');
            this.newValue = newValue;
            this.$nextTick(() => {
                setTimeout(()=>{
                    this.$refs.inputRef[0].select()
                },100);
            });
        },
        formatValue(value) {
            return value.replace(',', '')
        },
        focusInput() {
            // this.$nextTick(() => {
            //     this.$refs.inputRef[0].select()
            // })
        },
        async handleSave(value, payload, column_index) {

            var retailer_guid = payload.cols[column_index].retailer_guid;
            var cardtype_guid = payload.cols[column_index].cardtype_guid;
            var purity_guid = payload.row.purity_guid;

            var filter_payload = {
                params: {
                    retailer_guid,
                    purity_guid,
                    cardtype_guid,
                }
            };

            var main_json = {
                retailer_guid,
                purity_guid,
                cardtype_guid,
                value,
            }

            this.$emit('receiveSave',main_json);

            return;
            await this.$store.dispatch('maintenance/trigger_get_ml_member_special_pricing_child', filter_payload).then(async () => {
                var data = JSON.parse(JSON.stringify(this.$store.getters['maintenance/get_ml_member_special_pricing_child']));

                var results = data.data.results;

                if(results.length > 0)
                {
                    var payload = {
                        mem_price_guid: results[0].mem_price_guid,
                        pass_json: {
                            'retailer_guid': retailer_guid,
                            'cardtype_guid': cardtype_guid,
                            'purity_guid': purity_guid,
                            'price_per_gram': value,
                            'created_by': this.username,
                            'updated_by': this.username
                        }
                    };

                    await this.$store.dispatch('maintenance/trigger_patch_ml_member_special_pricing', payload).then(() => {
                        var data = JSON.parse(JSON.stringify(this.$store.getters['maintenance/get_ml_member_special_pricing_status']));
                        var response = data;

                        console.log(response.status);

                        if(response.status == 'success')
                        {
                            alert('update successfully');
                        }
                        else
                        {
                            alert('update failed');
                        }
                    });
                }
                else
                {
                    var payload = {
                        json: {
                            'retailer_guid': retailer_guid,
                            'cardtype_guid': cardtype_guid,
                            'purity_guid': purity_guid,
                            'price_per_gram': value,
                            'created_by': this.username,
                            'updated_by': this.username
                        }
                    };

                    await this.$store.dispatch('maintenance/trigger_put_ml_member_special_pricing', payload).then(() => {
                        var data = JSON.parse(JSON.stringify(this.$store.getters['maintenance/get_ml_member_special_pricing_status']));
                        var response = data;
                        if(response.status == 'success')
                        {
                            alert('create successfully');
                        }
                        else
                        {
                            alert('create failed');
                        }
                    });
                }

                this.$emit('reupdateTable');
            });//close checking for exist or not
        },
    },
    watch:{
        pass_columns(newVal)
        {
            this.columns = newVal;
            // if(this.pass_row_key)
            // {
            //     this.row_key = this.pass_row_key;
            // }
            // else
            // {
            //     this.row_key = newVal[0].name;
            // }

        },
        pass_rows(newVal)
        {
            this.rows = newVal;
            this.visible = false;
        },
        forceLoading(newVal)
        {
            if(newVal)
            {
                this.visible = newVal;
            }
        }
    }
}
</script>

<style scoped>
.alignright
{
    text-align: right;
}

.alignleft
{
    text-align: left;
}
</style>
