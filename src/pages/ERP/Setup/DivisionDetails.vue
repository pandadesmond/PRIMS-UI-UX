<template>
<div class="row row_section" style="padding: 0px; margin-bottom: 10px; margin-left: 12px;">
    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <Chip text="Setup" icon="tune"/> / <Chip text="Division" icon="business"/>
    </div>
</div>
<div class="row row_section">
    <q-form v-if="json.add_dept == true" ref="submit_form" class="q-form">
        <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <q-card class="card_design" >
            <q-card-section class="row bg-primary text-white">
                <Label text="Add New Department" class="text-subtitle1" style="background-color:transparent;"/>
                <q-space/> 
                    <!-- <q-btn 
                        v-close-popup
                        flat 
                        round 
                        dense
                        icon="close" /> -->
            </q-card-section>

            <q-card-section>
                <div class="row row_section">
                    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <div class="component_div">
                            <LabelInputVertical 
                            :readonly="false"  
                            :no_label="true" 
                            :text="'Dept Code'" 
                            v-model:pass_value="json.dept_code" 
                            :dbComponentBehavior="dbComponentBehavior.address1"/>
                        </div>

                        <div class="component_div">
                            <LabelInputVertical 
                            :readonly="false"  
                            :no_label="true" 
                            :text="'Dept Description'" 
                            v-model:pass_value="json.dept_desc" 
                            :dbComponentBehavior="dbComponentBehavior.address1"/>
                        </div>

                        <div class="component_div">
                            <LabelInputVertical 
                            :readonly="false"  
                            :no_label="true" 
                            :text="'Group'" 
                            v-model:pass_value="json.group_code" 
                            :dbComponentBehavior="dbComponentBehavior.address1"/>
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

    <q-form v-if="json.edit_dept == true" ref="submit_form" class="q-form">
        <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <q-card class="card_design" >
            <q-card-section class="row bg-primary text-white">
                <Label text="Edit Deparment" class="text-subtitle1" style="background-color:transparent;"/>
                <q-space/> 
                    <!-- <q-btn 
                        v-close-popup
                        flat 
                        round 
                        dense
                        icon="close" /> -->
            </q-card-section>

            <q-card-section>
                <div class="row row_section">
                    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <div class="component_div">
                            <LabelInputVertical 
                            :readonly="true"  
                            :no_label="true"
                            :text="'Dept Code'" 
                            v-model:pass_value="json.dept_code" 
                            :dbComponentBehavior="dbComponentBehavior.address1"/>
                        </div>

                        <div class="component_div">
                            <LabelInputVertical 
                            :readonly="false"  
                            :no_label="true" 
                            :text="'Dept Description'" 
                            v-model:pass_value="json.dept_desc" 
                            :dbComponentBehavior="dbComponentBehavior.address1"/>
                        </div>

                        <div class="component_div">
                            <LabelInputVertical 
                            :readonly="false"  
                            :no_label="true" 
                            :text="'Group'" 
                            v-model:pass_value="json.group_code" 
                            :dbComponentBehavior="dbComponentBehavior.address1"/>
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

    <q-form v-if="json.add_group == true" ref="submit_form" class="q-form">
        <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <q-card class="card_design" >
            <q-card-section class="row bg-primary text-white">
                <Label text="Add New Group" class="text-subtitle1" style="background-color:transparent;"/>
                <q-space/> 
                    <!-- <q-btn 
                        v-close-popup
                        flat 
                        round 
                        dense
                        icon="close" /> -->
            </q-card-section>

            <q-card-section>
                <div class="row row_section">
                    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <div class="component_div">
                            <LabelInputVertical 
                            :readonly="false"  
                            :no_label="true" 
                            :text="'Group Code'" 
                            v-model:pass_value="json.group_code" 
                            :dbComponentBehavior="dbComponentBehavior.address1"/>
                        </div>

                        <div class="component_div">
                            <LabelInputVertical 
                            :readonly="false"  
                            :no_label="true" 
                            :text="'Group Description'" 
                            v-model:pass_value="json.group_desc" 
                            :dbComponentBehavior="dbComponentBehavior.address1"/>
                        </div>

                        <div class="component_div">
                            <LabelInputVertical 
                            :readonly="false"  
                            :no_label="true" 
                            :text="'Group Code Account'" 
                            v-model:pass_value="json.group_code_acc" 
                            :dbComponentBehavior="dbComponentBehavior.address1"/>
                        </div>

                        <div class="component_div">
                            <LabelInputVertical 
                            :readonly="false"  
                            :no_label="true" 
                            :text="'Code Account'" 
                            v-model:pass_value="json.code_acc" 
                            :dbComponentBehavior="dbComponentBehavior.address1"/>
                        </div>
                    </div>
                </div>
            </q-card-section>

            <q-card-section>
                <div class="row row_section justify-end">
                    <div class="card_section col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                        <div class="component_div">
                            <Button class="button_save" v-on:receiveChange="callUpdate1()" :text="'Save'" :type="'button'" />
                        </div>
                    </div>
                
                    <div class="card_section col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                        <div class="component_div">
                            <Button class="button_save" @click="goBack1()" :text="'Back'" :type="'button'" />
                        </div>
                    </div>
                </div>
            </q-card-section>
        </q-card>
        </div>
    </q-form>

    <q-form v-if="json.edit_group == true" ref="submit_form" class="q-form">
        <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <q-card class="card_design" >
            <q-card-section class="row bg-primary text-white">
                <Label text="Edit Group" class="text-subtitle1" style="background-color:transparent;"/>
                <q-space/> 
                    <!-- <q-btn 
                        v-close-popup
                        flat 
                        round 
                        dense
                        icon="close" /> -->
            </q-card-section>

            <q-card-section>
                <div class="row row_section">
                    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <div class="component_div">
                            <LabelInputVertical 
                            :readonly="true"  
                            :no_label="true" 
                            :text="'Group Code'" 
                            v-model:pass_value="json.group_code" 
                            :dbComponentBehavior="dbComponentBehavior.address1"/>
                        </div>

                        <div class="component_div">
                            <LabelInputVertical 
                            :readonly="false"  
                            :no_label="true" 
                            :text="'Group Description'" 
                            v-model:pass_value="json.group_desc" 
                            :dbComponentBehavior="dbComponentBehavior.address1"/>
                        </div>

                        <div class="component_div">
                            <LabelInputVertical 
                            :readonly="false"  
                            :no_label="true" 
                            :text="'Group Code Account'" 
                            v-model:pass_value="json.group_code_acc" 
                            :dbComponentBehavior="dbComponentBehavior.address1"/>
                        </div>

                        <div class="component_div">
                            <LabelInputVertical 
                            :readonly="false"  
                            :no_label="true" 
                            :text="'Code Account'" 
                            v-model:pass_value="json.code_acc" 
                            :dbComponentBehavior="dbComponentBehavior.address1"/>
                        </div>
                    </div>
                </div>
            </q-card-section>

            <q-card-section>
                <div class="row row_section justify-end">
                    <div class="card_section col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                        <div class="component_div">
                            <Button class="button_save" v-on:receiveChange="callUpdate1()" :text="'Save'" :type="'button'" />
                        </div>
                    </div>
                
                    <div class="card_section col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                        <div class="component_div">
                            <Button class="button_save" @click="goBack1()" :text="'Back'" :type="'button'" />
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
import Label from 'src/components/ERP/Base/Label';
import Chip from 'src/components/ERP/Base/Chip';
import { ref } from 'vue';
import { Notify } from "quasar";
import { Loading, QSpinnerTail } from 'quasar';
import Button from 'src/components/Base/Button';

export default {
    name: 'Dashboard',
    data() {
        return {
            json: JSON.parse(this.$route.params.data)
        }
    },
    components: {
        LabelInputVertical,
        Label,
        Chip,
        Button
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
                "primary_key": this.json.dept_code,
                "pass_json": this.json  
            };

            this.$store.dispatch('setup/trigger_edit_dept_table_data', payload).then(() => {
                var data = JSON.parse(JSON.stringify(this.$store.getters['setup/get_depttabledata_status']));
                var status = data.status;
                var response = data.response
                console.log(data);
                if(status == 'success')
                {
                    this.json.add_dept=false
                    this.json.edit_dept=false
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
            this.json.add_dept=false
            this.json.edit_dept=false
            this.$router.go(-1)
        
        },
        callUpdate1: function(){
            this.$refs['submit_form'].validate().then(valid => {

                if (!valid) {
                    this.showNotify('negative', 'Please make sure all field is filled in.')
                }
                else
                {
                    this.showLoading();
                    this.handleSave1();
                }
            })
        },
        handleSave1: function(){            
            var payload = {
                "primary_key": this.json.group_code,
                "pass_json": this.json
            };

            this.$store.dispatch('setup/trigger_edit_group_table_data', payload).then(() => {
                var data = JSON.parse(JSON.stringify(this.$store.getters['setup/get_grouptabledata_status']));
                var status = data.status;
                var response = data.response
                console.log(data);
                if(status == 'success')
                {
                    this.json.add_group=false
                    this.json.edit_group=false
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
        goBack1: function(){
            this.json.add_group=false
            this.json.edit_group=false
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

.q-form {
    width: 100%
}
</style>
