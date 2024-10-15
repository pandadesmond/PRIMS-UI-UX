<template>
    <q-form ref="submit_form">
    <div class="row row_section" style="padding: 0px; margin-bottom: 10px; margin-left: 12px;">
        <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <Chip text="Setup" icon="tune" /> /
          <Chip
          :text="path=='uom' ? 'UOM' : path=='variant' ? 'Variant' : path=='size' ? 'Size' : path=='origin' ? 'Origin' : 'Weight Type'"
          :icon="path=='uom' ? 'straighten' : path=='variant' ? 'inventory' : path=='size' ? 'web_stories' : path=='origin' ? 'trip_origin' : 'scale'"
          />
        </div>

        <Title :text="path=='uom' ? 'UOM' : path=='variant' ? 'Variant' : path=='size' ? 'Size' : path=='origin' ? 'Origin' : 'Weight Type'" :noFilter="true" :filter_status="filter_status" v-on:receiveFilter="handleReceiveFilter" />
    </div>

    <!-- <q-card style="background-color: white; padding: 10px; margin-left: 10px; margin-right: 10px; margin-bottom: 10px;">
        <q-card-section> -->
        <!-- HQ Table -->
        <!--
        <div class="row row_section">
            <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div class="component_div">
                <Table
                :row_per_page="[20,40,60,80,100,0]"
                :top_button="true"
                :button_no_outline="true"
                v-on:head_button="addButton"
                v-on:main_action="handleAction"
                v-on:main_edit="handleEdit"
                v-on:main_list="handleList"
                v-on:main_delete="handleDelete"
                :title="table_title"
                :table_data="table_data_companyprofile"
                :table_column="table_column"
                :action_button="true"
                :edit_button="true"
                :view_button="true"
                :delete_button="true"
                />
            </div>
            </div>
        </div>
        -->

        <div class="row row_section">
            <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div class="component_div">
                <TablePagination
                :row_per_page="[20,40,60,80,100,0]"
                :top_button="true"
                v-on:receiveRequestTable="handleTableChange"
                v-on:head_button="addButton"
                v-on:main_action="handleAction"
                v-on:main_edit="handleEdit"
                v-on:main_list="handleList"
                v-on:main_delete="handleDelete"
                :table_data="test_data"
                :table_column="test_column"
                :action_button="true"
                :edit_button="false"
                :view_button="false"
                :delete_button="true"
                :button_no_outline="true"
                />
            </div>
            </div>
        </div>

        <!-- addButton dialog -->
        <q-dialog v-model="showAddTask" >
        <q-card style="width: 700px; max-width: 80vw;">
            <q-card-section class="row bg-primary text-white">
            <Label
                :text="path=='uom' ? (is_update ? 'Edit UOM' : 'Add UOM') : path=='weight_type' ? (is_update ? 'Edit weight type' : 'Add weight type') : (is_update ? `Edit ${path}` : `Add ${path}`)"
                class="text-subtitle1"
                style="background-color: transparent;"
            />
            <q-space />
            <q-btn v-close-popup flat round dense icon="close" />
            </q-card-section>

            <q-card-section>
                <div class="row row_section">
                    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div class="component_div">
                        <LabelInputHorizontal
                        :readonly="false"
                        :no_label="true"
                        :text="'Code'"
                        v-model:pass_value="json_new.code"
                        :dbComponentBehavior="dbComponentBehavior.text_required"
                        />
                    </div>
                    </div>
                </div>

                <div class="row row_section">
                    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div class="component_div">
                        <LabelInputHorizontal
                        :readonly="false"
                        :no_label="true"
                        :text="'Description'"
                        v-model:pass_value="json_new.description"
                        :dbComponentBehavior="dbComponentBehavior.text_required"
                        />
                    </div>
                    </div>
                </div>
            </q-card-section>

            <q-card-actions align="right" class="q-pr-lg">
                <!-- <Button
                class="button_save"
                v-close-popup
                :text="'CANCEL'"
                :type="'button'"
                /> -->
                <Button_icon :flat="true" :font_color="'black'" :color="'white'" :text="'CANCEL'" :outline="true" size="15px" class="custom_cancel_button" v-close-popup />

                <!-- <Button
                class="button_save"
                v-on:receiveChange="callUpdate()"
                :text="'SAVE'"
                :type="'button'"
                /> -->
                <Button_icon :flat="true" :font_color="'white'" :color="'#094161 '" :text="'SAVE'" :outline="false" size="15px" @click="callUpdate()"/>
            </q-card-actions>
        </q-card>
        </q-dialog>

        <q-dialog v-model="delete_confirmation" persistent position="top">
        <q-card style="width: 700px; max-width: 80vw;text-align:center;margin-top: 5%;">

            <q-card-section class="row items-center" style="padding-top:1%;padding-bottom:1%;border-bottom: 1px solid #a7bbcb;">
            <div class="text-h6">Confirmation</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup :disable="showAddLoading || showAddLoading2"/>
            </q-card-section>

            <q-card-section>
            <!-- <span class="q-ml-sm custom_selection_font">{{general_body}}</span> -->
            <span>Are you sure to delete this line?</span>
            </q-card-section>

            <q-card-actions align="right">
            <q-btn flat label="Cancel" color="primary" v-close-popup />
            <q-btn flat label="OK" color="primary" @click="handleDeleteLine" />
            </q-card-actions>

            <q-inner-loading
            :showing="deleteLoading"
            color="primary"
            />
        </q-card>
        </q-dialog>

        <!-- save button (bottom-right) -->
        <!-- <div class="row row_section justify-end">
            <div class="card_section col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
            <div class="component_div text-right">
                <Button
                class="button_save"
                v-on:receiveChange="callUpdate()"
                :text="'APPLY'"
                :type="'button'"
                />
            </div>
            </div>
        </div> -->
        <!-- </q-card-section>
    </q-card> -->
    </q-form>
</template>

<script>
import Input from 'src/components/ERP/Base/Input';
import Label from 'src/components/ERP/Base/Label';
import LabelSelectVertical from'src/components/ERP/General/LabelSelectVertical' ;
import LabelInputHorizontal from'src/components/ERP/General/LabelInputHorizontal' ;
import Button_icon from 'src/components/ERP/Base/Button_icon'
import LabelSelectFilterHorizontal from'src/components/ERP/General/LabelSelectFilterHorizontal';
import LabelSelectHorizontal from'src/components/ERP/General/LabelSelectHorizontal' ;
import Table from 'src/components/ERP/Base/Table';
import TablePagination from 'src/components/ERP/Base/TablePagination';
import Select from 'src/components/ERP/Base/Select';
import Checkbox from 'src/components/ERP/Base/Checkbox';
import Button from 'src/components/Base/Button';
import Chip from 'src/components/ERP/Base/Chip';
import { Notify } from "quasar"
import { Loading, QSpinnerTail } from 'quasar'
import Title from 'src/components/ERP/General/Title'

export default{
    data(){
        return{
            company_guid: sessionStorage.getItem("company_guid") != "" && sessionStorage.getItem("company_guid") != "null" && sessionStorage.getItem("company_guid") != null ? sessionStorage.getItem("company_guid") : '',
            json_new: {},
            test_data: [],
            table_data_companyprofile: [],
            table_title:"HQ Location",
            table_data: [
                {
                    "action":"",
                    "Outlet":""
                }
            ],
            table_column: [
                {
                    name: 'action',
                    required: true,
                    label: 'Actions',
                    align: 'left',
                    sortable: false
                },
                {
                    "align": "center",
                    "field": "Outlet",
                    "sortable": true,
                    "name": "Outlet",
                    "label": "Location",
                    "format_child": "$",
                }
            ],
            test_column: [
                {
                    name: 'action',
                    required: true,
                    label: 'Action',
                    align: 'left',
                    sortable: false,
                    field: 'action',
                    format_child: '',
                    tooltip: '',
                    "headerStyle": "max-width: 70px; text-align: center;",
                },
                {
                    align: "left",
                    sortable: true,
                    name: "code",
                    label: "Code",
                    format_child: "",
                    field: 'code',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;'
                },
                {
                    align: "left",
                    sortable: true,
                    name: "description",
                    label: "Description",
                    format_child: "",
                    field: 'description',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;'
                },
                {
                    name: 'created_at',
                    required: true,
                    label: 'Created At',
                    align: 'left',
                    sortable: true,
                    field: 'created_at',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                },
                {
                    name: 'created_by',
                    required: true,
                    label: 'Created By',
                    align: 'left',
                    sortable: true,
                    field: 'created_by',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                },
                {
                    name: 'updated_at',
                    required: true,
                    label: 'Updated At',
                    align: 'left',
                    sortable: true,
                    field: 'updated_at',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                },
                {
                    name: 'updated_by',
                    required: true,
                    label: 'Updated By',
                    align: 'left',
                    sortable: true,
                    field: 'updated_by',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                },
            ],
            showAddTask: false,
            ori_params: {},
            is_update: false,
            active_delete_json: {},
            delete_confirmation: false,
            path: this.$route.name,
        }
    },
    components:{
        // Input,
        Label,
        // LabelSelectVertical,
        LabelInputHorizontal,
        // LabelSelectFilterHorizontal,
        // LabelSelectHorizontal,
        // LabelDatepickerHorizontal,
        // LabelCheckboxHorizontal,
        // Table,
        // Select,
        // Checkbox,
        // Button,
        Button_icon,
        TablePagination,
        Chip,
        Title,
    },
    computed: {
        dbComponentBehavior() {
        return this.$store.getters['dbComponentBehavior/byLanguage']('erp')
        },
    },
    methods: {
        addButton: function(payload)
        {
            this.json_new = {};
            this.showAddTask = true;
            this.is_update = false;
        },
        handleAction: function(payload){
            this.showLoading();
            this.json_new = {};
            this.showAddTask = true;
            var npayload = JSON.parse(JSON.stringify(payload));
            this.json_new = npayload;
            this.hideLoading();
            this.is_update = true;
        },
        handleDelete(payload){
            this.active_delete_json.guid = this.path=='uom' ?  payload.uom_guid : this.path=='variant' ? payload.variant_guid : this.path=='size' ? payload.size_guid : this.path=='origin' ? payload.origin_guid : payload.weight_type_guid;
            this.delete_confirmation = true;
        },
        async handleDeleteLine(){
            this.deleteLoading = true;

            var data = {};

            if(this.path=='uom')
            {
              var payload = {
                  uom_guid: this.active_delete_json.guid
              }

              await this.$store.dispatch('setup/trigger_delete_mc_uom', payload).then(async () => {
                  data = JSON.parse(JSON.stringify(this.$store.getters['setup/get_mc_uom_status']));
              });
            }
            else if(this.path=='variant')
            {
              var payload = {
                  variant_guid: this.active_delete_json.guid
              }

              await this.$store.dispatch('setup/trigger_delete_mc_variant', payload).then(async () => {
                  data = JSON.parse(JSON.stringify(this.$store.getters['setup/get_mc_variant_status']));
              });
            }
            else if(this.path=='size')
            {
              var payload = {
                  size_guid: this.active_delete_json.guid
              }

              await this.$store.dispatch('setup/trigger_delete_mc_size', payload).then(async () => {
                  data = JSON.parse(JSON.stringify(this.$store.getters['setup/get_mc_size_status']));
              });
            }
            else if(this.path=='origin')
            {
              var payload = {
                  origin_guid: this.active_delete_json.guid
              }

              await this.$store.dispatch('setup/trigger_delete_mc_origin', payload).then(async () => {
                  data = JSON.parse(JSON.stringify(this.$store.getters['setup/get_mc_origin_status']));
              });
            }
            else if(this.path=='weight_type')
            {
              var payload = {
                  weight_type_guid: this.active_delete_json.guid
              }

              await this.$store.dispatch('setup/trigger_delete_mc_weighing_type', payload).then(async () => {
                  data = JSON.parse(JSON.stringify(this.$store.getters['setup/get_mc_weighing_type_status']));
              });
            }

            if(data.status == "success")
            {
                this.table_function(this.ori_params);
                this.showNotify("positive","Delete successfully");
                this.delete_confirmation = false;
                this.deleteLoading = false;
            }
            else
            {
                this.showNotify("negative","Please try again.");
                this.deleteLoading = false;
            }
        },
        showNotify(type, message) {
            Notify.create({
                type: type,
                message: message,
                timeout: 1000,
                position: 'top',
                html: true,
            })
        },
        showLoading()
        {
            // default options
            Loading.show()

            // fully customizable
            Loading.show({
                spinner: QSpinnerTail,
            // other props
            })
        },
        hideLoading()
        {
            setTimeout(function(){
                Loading.hide();
            },300);
        },
        callUpdate: function()
        {
            //do form verification before submit the form
            this.$refs['submit_form'].validate().then(valid => {

                if (!valid) {
                    //got field thats not fullfill standard
                    this.showNotify('negative', 'Please make sure all field is filled in.')
                }
                else
                {
                    //show loading icon
                    this.showLoading();
                    //already verified all the field than call save value
                    this.handleSave();
                }
            })
        },
        async handleSave()
        {
            this.showLoading();

            var code = this.json_new.code;
            var description = this.json_new.description;
            var company_guid = this.company_guid;
            var updated_by = 'test';

            var template = {
                code: code,
                description: description,
                company_guid: company_guid,
                updated_by: updated_by,
            };

            var payload = {};
            var data = {};

            if(!this.is_update)
            {
                payload = template;
                if(this.path=='uom')
                {
                  await this.$store.dispatch('setup/trigger_create_mc_uom', payload).then(() => {
                      data = JSON.parse(JSON.stringify(this.$store.getters['setup/get_mc_uom_status']));
                  });
                }
                else if(this.path=='variant')
                {
                  await this.$store.dispatch('setup/trigger_create_mc_variant', payload).then(() => {
                      data = JSON.parse(JSON.stringify(this.$store.getters['setup/get_mc_variant_status']));
                  });
                }
                else if(this.path=='size')
                {
                  await this.$store.dispatch('setup/trigger_create_mc_size', payload).then(() => {
                      data = JSON.parse(JSON.stringify(this.$store.getters['setup/get_mc_size_status']));
                  });
                }
                else if(this.path=='origin')
                {
                  await this.$store.dispatch('setup/trigger_create_mc_origin', payload).then(() => {
                      data = JSON.parse(JSON.stringify(this.$store.getters['setup/get_mc_origin_status']));
                  });
                }
                else if(this.path=='weight_type')
                {
                  await this.$store.dispatch('setup/trigger_create_mc_weighing_type', payload).then(() => {
                      data = JSON.parse(JSON.stringify(this.$store.getters['setup/get_mc_weighing_type_status']));
                  });
                }
            }
            else if(this.is_update)
            {
                var pass_json = template;

                if(this.path=='uom')
                {
                  payload = {
                      uom_guid: this.json_new.uom_guid,
                      pass_json: pass_json
                  }

                  await this.$store.dispatch('setup/trigger_update_mc_uom', payload).then(() => {
                      data = JSON.parse(JSON.stringify(this.$store.getters['setup/get_mc_uom_status']));
                  });
                }
                else if(this.path=='variant')
                {
                  payload = {
                      variant_guid: this.json_new.variant_guid,
                      pass_json: pass_json
                  }

                  await this.$store.dispatch('setup/trigger_update_mc_variant', payload).then(() => {
                      data = JSON.parse(JSON.stringify(this.$store.getters['setup/get_mc_variant_status']));
                  });
                }
                else if(this.path=='size')
                {
                  payload = {
                      size_guid: this.json_new.size_guid,
                      pass_json: pass_json
                  }

                  await this.$store.dispatch('setup/trigger_update_mc_size', payload).then(() => {
                      data = JSON.parse(JSON.stringify(this.$store.getters['setup/get_mc_size_status']));
                  });
                }
                else if(this.path=='origin')
                {
                  payload = {
                      origin_guid: this.json_new.origin_guid,
                      pass_json: pass_json
                  }

                  await this.$store.dispatch('setup/trigger_update_mc_origin', payload).then(() => {
                      data = JSON.parse(JSON.stringify(this.$store.getters['setup/get_mc_origin_status']));
                  });
                }
                else if(this.path=='weight_type')
                {
                  payload = {
                      weight_type_guid: this.json_new.weight_type_guid,
                      pass_json: pass_json
                  }

                  await this.$store.dispatch('setup/trigger_update_mc_weighing_type', payload).then(() => {
                      data = JSON.parse(JSON.stringify(this.$store.getters['setup/get_mc_weighing_type_status']));
                  });
                }
            }

            var status = data.status;

            if(status == 'success')
            {
                if(!this.is_update)
                {
                    this.showNotify('positive', 'Create Successfully.');
                }
                else if(this.is_update)
                {
                    this.showNotify('positive', 'Update Successfully.');
                }
                this.showAddTask = false;
                this.table_function(this.ori_params);
                this.hideLoading();
            }
            else
            {
                var error_response = data.response;
                var show_error = "";

                if(typeof error_response == 'object')
                {
                    Object.keys(error_response).forEach((loop_index)=>{
                    if(loop_index !== 'status_code')
                    {
                        var temp_error = {};
                        var error_message = "";
                        Object.keys(error_response[loop_index]).forEach((header,cindex)=>{
                            error_message = error_response[loop_index][header];
                        });
                        temp_error = loop_index + " - " + error_message;
                        show_error += temp_error;
                    }
                    });//close foreach error message
                }
                else if(typeof error_response == 'string')
                {
                    show_error = error_response
                }

                this.showNotify('negative', show_error);
                this.hideLoading();
            }
        },
        // table server side
        handleTableChange: function(newVal)
        {
            var new_params = this.$pluginsTableParams(newVal)

            var payload = {
                params : new_params
            };

            this.ori_params = payload;

            this.table_function(payload);
        },
        async table_function(payload){
            if(payload.params.ordering == "")
            {
                payload.params.ordering = "-updated_at"
            }

            if(this.path=='uom')
            {
              payload.params.company_guid = this.company_guid;

              await this.$store.dispatch('setup/trigger_get_mc_uom', payload).then(() => {
                  var data = JSON.parse(JSON.stringify(this.$store.getters['setup/get_mc_uom']));
                  this.test_data = data;
              });
            }
            else if(this.path=='variant')
            {
              payload.params.company_guid = this.company_guid;

              await this.$store.dispatch('setup/trigger_get_mc_variant', payload).then(() => {
                  var data = JSON.parse(JSON.stringify(this.$store.getters['setup/get_mc_variant']));
                  this.test_data = data;
              });
            }
            else if(this.path=='size')
            {
              payload.params.company_guid = this.company_guid;

              await this.$store.dispatch('setup/trigger_get_mc_size', payload).then(() => {
                  var data = JSON.parse(JSON.stringify(this.$store.getters['setup/get_mc_size']));
                  this.test_data = data;
              });
            }
            else if(this.path=='origin')
            {
              payload.params.company_guid = this.company_guid;

              await this.$store.dispatch('setup/trigger_get_mc_origin', payload).then(() => {
                  var data = JSON.parse(JSON.stringify(this.$store.getters['setup/get_mc_origin']));
                  this.test_data = data;
              });
            }
            else if(this.path=='weight_type')
            {
              payload.params.company_guid = this.company_guid;

              await this.$store.dispatch('setup/trigger_get_mc_weighing_type', payload).then(() => {
                  var data = JSON.parse(JSON.stringify(this.$store.getters['setup/get_mc_weighing_type']));
                  this.test_data = data;
              });
            }
        },
    },
    async created() {}
}


</script>

<style scoped>
.custom_cancel_button
{
    border: 1px solid black;
}
.card_section {
    padding: 0px 0px 0px 0px;
}

.row_section
{
    padding-left: 10px;
    right: 10px;
}

.row_section_dialog
{
    padding: 10px;
    right: 10px;
}
.table_wrapper
{
    padding-left: 0px;
    padding-right: 5px;
}
</style>
