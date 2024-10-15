<template>
<div class="row row_section" style="padding: 0px; margin-bottom: 10px; margin-left: 12px;">
    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <Chip text="Setup" icon="tune"/> / <Chip text="Branch" icon="business"/>
    </div>
</div>

<div class="row row_section">
    <q-form v-if="json.add_branch == true"  ref="submit_form" class="q-form">
    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <q-card >
            <q-card-section class="row bg-primary text-white">
                <Label text="Add Branch" class="text-subtitle1" style="background-color:transparent;"/>
                <q-space/> 
                    <!-- <q-btn 
                        v-close-popup
                        flat 
                        round 
                        dense
                        icon="close" /> -->
            </q-card-section>

            <q-card-section class="q-pt-none">
                <div class="row row_section">
                    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <div class="component_div">
                            <LabelInputVertical 
                            :readonly="false"  
                            :no_label="true" 
                            :text="'Location Group'" 
                            v-model:pass_value="json.loc_group" 
                            :dbComponentBehavior="dbComponentBehavior.address1"/>
                        </div>

                        <div class="component_div">
                            <LabelInputVertical 
                            :readonly="false"  
                            :no_label="true" 
                            :text="'Debit Account Code'" 
                            v-model:pass_value="json.debit_acc_code" 
                            :dbComponentBehavior="dbComponentBehavior.address1"/>
                        </div>
                    
                        <div class="component_div">
                            <LabelInputVertical 
                            :readonly="false"  
                            :no_label="true" 
                            :text="'Credit Account Code'" 
                            v-model:pass_value="json.credit_acc_code" 
                            :dbComponentBehavior="dbComponentBehavior.address1"/>
                        </div>
                    
                        <div class="component_div">
                            <LabelInputVertical 
                            :readonly="false"  
                            :no_label="true" 
                            :text="'Account Code'" 
                            v-model:pass_value="json.acc_code" 
                            :dbComponentBehavior="dbComponentBehavior.address1"/>
                        </div>
                    
                        <div class="component_div">
                            <LabelCheckboxVertical 
                            :readonly="false"  
                            :no_label="true" 
                            :text="'Active'" 
                            v-model:pass_value="json.set_active" 
                            :true-value="1"
                            :false-value="0"
                            :dbComponentBehavior="dbComponentBehavior.companyname"/>
                        </div>
                    </div>
                </div>
            </q-card-section>

            <q-card-section>
                <div class="row row_section justify-end">
                    <div class="card_section col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                        <div class="component_div">
                            <Button class="button_save" v-on:receiveChange="callUpdate()" :text="'Save'" :type="'button'" />
                        </div>
                    </div>
                
                    <div class="card_section col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                        <div class="component_div">
                            <Button class="button_save" @click="goBack()" :text="'Back'" :type="'button'" />
                        </div>
                    </div>
                </div>
            </q-card-section>
        </q-card>
    </div>
    </q-form>
    
    <q-form v-else ref="submit_form" class="q-form">
    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <q-card >
            <q-card-section class="row bg-primary text-white">
                <Label text="Edit Branch" class="text-subtitle1" style="background-color:transparent;"/>
                <q-space/> 
                    <!-- <q-btn 
                        v-close-popup
                        flat 
                        round 
                        dense
                        icon="close" /> -->
            </q-card-section>

            <q-card-section class="q-pt-none">
                <div class="row row_section">
                    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <div class="component_div">
                            <LabelInputVertical 
                            :readonly="true"  
                            :no_label="true" 
                            :text="'Location Group'" 
                            v-model:pass_value="json.loc_group" 
                            :dbComponentBehavior="dbComponentBehavior.address1"/>
                        </div>

                        <div class="component_div">
                            <LabelInputVertical 
                            :readonly="false"  
                            :no_label="true" 
                            :text="'Debit Account Code'" 
                            v-model:pass_value="json.debit_acc_code" 
                            :dbComponentBehavior="dbComponentBehavior.address1"/>
                        </div>
                    
                        <div class="component_div">
                            <LabelInputVertical 
                            :readonly="false"  
                            :no_label="true" 
                            :text="'Credit Account Code'" 
                            v-model:pass_value="json.credit_acc_code" 
                            :dbComponentBehavior="dbComponentBehavior.address1"/>
                        </div>
                    
                        <div class="component_div">
                            <LabelInputVertical 
                            :readonly="false"  
                            :no_label="true" 
                            :text="'Account Code'" 
                            v-model:pass_value="json.acc_code" 
                            :dbComponentBehavior="dbComponentBehavior.address1"/>
                        </div>
                    
                        <div class="component_div">
                            <LabelCheckboxVertical 
                            :readonly="false"  
                            :no_label="true" 
                            :text="'Active'" 
                            v-model:pass_value="json.set_active" 
                            :true-value="1"
                            :false-value="0"
                            :dbComponentBehavior="dbComponentBehavior.companyname"/>
                        </div>
                    </div>
                </div>
            </q-card-section>

            <q-card-section>
                <div class="row row_section justify-end">
                    <div class="card_section col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                        <div class="component_div">
                            <Button class="button_save" v-on:receiveChange="callUpdate()" :text="'Save'" :type="'button'" />
                        </div>
                    </div>
                
                    <div class="card_section col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                        <div class="component_div">
                            <Button class="button_save" @click="goBack()" :text="'Back'" :type="'button'" />
                        </div>
                    </div>
                </div>
            </q-card-section>
        </q-card>
    </div>
    </q-form>
</div>
</template>

<script>
import LabelInputVertical from'src/components/ERP/General/LabelInputVertical' ;
import LabelCheckboxVertical from'src/components/ERP/General/LabelCheckboxVertical' ;
import Label from 'src/components/ERP/Base/Label';
import Chip from 'src/components/ERP/Base/Chip';
import { Notify } from "quasar";
import { Loading, QSpinnerTail } from 'quasar';
import Button from 'src/components/Base/Button';

export default {
    name: 'Dashboard',
    data() {
        return {
            json: JSON.parse(this.$route.params.data),
        }
    },
    components: {
        LabelInputVertical,
        LabelCheckboxVertical,
        Label,
        Chip,
        Button,
    },
    computed: {
        dbComponentBehavior() {
            return this.$store.getters['dbComponentBehavior/byLanguage']('erp')
        },
    },
    methods: {
        showNotify(type, message) {
        Notify.create({
            type: type,
            message: message,
            timeout: 1000,
            position: 'top',
        })
        },
        showLoading(){
            Loading.show()
            Loading.show({
                spinner: QSpinnerTail,
            })
        },
        hideLoading(){
            setTimeout(function(){
                Loading.hide();
            },300);
        },
        callUpdate: function(){
            this.$refs['submit_form'].validate().then(valid => {

                if (!valid) {
                    this.showNotify('negative', 'Please make sure all field is filled in.')
                }
                else
                {
                    this.showLoading();
                    this.handleSave();
                }
            })
        },
        handleSave: function(){            
            var payload = {
                "primary_key": this.json.branch_guid,
                "pass_json": this.json
            };

            this.$store.dispatch('setup/trigger_edit_branch_table_data', payload).then(() => {
                var data = JSON.parse(JSON.stringify(this.$store.getters['setup/get_branchtabledata_status']));
                var status = data.status;
                var response = data.response
                console.log(data);
                if(status == 'success')
                {
                    this.json.add_branch=false
                    this.json.edit_branch=false
                    this.$router.go(-1)
                    this.showNotify('positive', 'Successfully Update.')
                    this.hideLoading();
                }
                else
                {
                    this.showNotify('negative', 'Fail to update. Please contact administrator for futher actions.')
                    this.hideLoading();
                }
            });
        },
        goBack: function(){
            this.json.add_branch=false
            this.json.edit_branch=false
            this.$router.go(-1)
        }
    },
}
</script>

<style scoped>
.card_section {
    padding: 0px 0px 0px 0px;
}

.row_section
{
    padding-left: 10px;
    padding-right: 10px;
}

.q-form{
    width: 100%
}

</style>
