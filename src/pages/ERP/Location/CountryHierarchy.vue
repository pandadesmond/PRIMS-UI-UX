<template>
<q-form ref="submit_form">
<div class="row row_section" style="padding: 0px; margin-bottom: 10px; margin-left: 12px;">
    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <Chip text="Location" icon="fmd_good"/> / <Chip text="Country Hierarchy" icon="public"/>
    </div>

    <Title :text="'Country Hierarchy'" :noFilter="true" :filter_status="filter_status" v-on:receiveFilter="handleReceiveFilter" />
</div>

<div class="row row_section">
<div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
<div class="component_div">
    <q-card>
        <q-card-section>
            <q-toolbar>
            <q-tabs
                v-model="tab"
                dense
                class="text-black"
                active-color="primary"
                indicator-color="primary"
                align="justify"
                narrow-indicator
                @input="handleChangeTab"
            >
                <q-tab name="country" label="Country" />
                <q-tab name="region" label="Region" />
                <q-tab name="state" label="State" />
                <q-tab name="district" label="District" />
            </q-tabs>
            </q-toolbar>

            <q-tab-panels v-model="tab" :animated="false">
                <q-tab-panel name="country">
                    <TablePagination
                    :hide_footer="false"
                    :row_per_page="[20,40,60,80,100]"
                    v-on:receiveRequestTable="handleTableChange"
                    v-on:head_button="addButton"
                    v-on:main_action="handleAction"
                    v-on:main_delete="handleDelete"
                    :table_column="test_column"
                    :table_data="test_data"
                    :action_button="true"
                    :edit_button="false"
                    :view_button="false"
                    :delete_button="true"
                    :top_button="true"
                    :button_no_outline="true"
                    title="Country serverside table"
                    />
                </q-tab-panel>

                <q-tab-panel name="region">
                    <!-- <Table :row_per_page="[5,40,60,80,100,0]"
                    :top_button="true"
                    v-on:head_button="addButton"
                    v-on:main_action="handleAction"
                    v-on:main_edit="handleEdit"
                    v-on:main_list="handleList"
                    v-on:main_delete="handleDelete"
                    :title="table_title"
                    :table_data="table_data"
                    :table_column="table_column"
                    :action_button="true"
                    :edit_button="false"
                    :view_button="false"
                    :delete_button="true"
                    /> -->
                    <TablePagination
                    :hide_footer="false"
                    :row_per_page="[20,40,60,80,100]"
                    v-on:receiveRequestTable="handleTableChange"
                    v-on:head_button="addButton"
                    v-on:main_action="handleAction"
                    v-on:main_delete="handleDelete"
                    :table_column="test_column"
                    :table_data="test_data"
                    :action_button="true"
                    :edit_button="false"
                    :view_button="false"
                    :delete_button="true"
                    :top_button="true"
                    :button_no_outline="true"
                    title="Region serverside table"
                    />
                </q-tab-panel>

                <q-tab-panel name="state">
                    <TablePagination
                    :hide_footer="false"
                    :row_per_page="[20,40,60,80,100]"
                    v-on:receiveRequestTable="handleTableChange"
                    v-on:head_button="addButton"
                    v-on:main_action="handleAction"
                    v-on:main_delete="handleDelete"
                    :table_column="test_column"
                    :table_data="test_data"
                    :action_button="true"
                    :edit_button="false"
                    :view_button="false"
                    :delete_button="true"
                    :top_button="true"
                    :button_no_outline="true"
                    title="State serverside table"
                    />
                </q-tab-panel>

                <q-tab-panel name="district">
                    <TablePagination
                    :hide_footer="false"
                    :row_per_page="[20,40,60,80,100]"
                    v-on:receiveRequestTable="handleTableChange"
                    v-on:head_button="addButton"
                    v-on:main_action="handleAction"
                    v-on:main_delete="handleDelete"
                    :table_column="test_column"
                    :table_data="test_data"
                    :action_button="true"
                    :edit_button="false"
                    :view_button="false"
                    :delete_button="true"
                    :top_button="true"
                    :button_no_outline="true"
                    title="District serverside table"
                    />
                </q-tab-panel>
            </q-tab-panels>
        </q-card-section>
    </q-card>

    <q-dialog v-model="showAddTask">
        <q-card style="width: 700px; max-width: 80vw;">
            <q-card-section class="row bg-primary text-white">
                <Label
                    :text="is_update ? `Edit ${ tab }`  : `Add ${ tab }`"
                    class="text-subtitle1"
                    style="background-color: transparent;"
                />
                <q-space />
                <q-btn v-close-popup flat round dense icon="close" />
            </q-card-section>

            <q-card-section>
                <div v-if="tab=='country'" class="row row_section">
                    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div class="component_div">
                        <LabelSelectFilterHorizontal
                        style="margin-left: 0px;"
                        :readonly="false"
                        :no_label="true"
                        :text="'Continent'"
                        v-model:pass_value="json_new.con_id"
                        :dbComponentBehavior="dbComponentBehavior.text_required"
                        :options="continent_options"
                        v-on:receiveChange="handleChange"
                        />
                    </div>
                    </div>
                </div>

                <div v-if="tab=='country'" class="row row_section">
                    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div class="component_div">
                        <LabelSelectFilterHorizontal
                        style="margin-left: 0px;"
                        :readonly="false"
                        :no_label="true"
                        :text="'Currency'"
                        v-model:pass_value="json_new.cur_id"
                        :dbComponentBehavior="dbComponentBehavior.text_required"
                        :options="currency_options"
                        v-on:receiveChange="handleChange"
                        />
                    </div>
                    </div>
                </div>

                <div v-if="tab!='country'" class="row row_section">
                    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div class="component_div">
                        <LabelSelectFilterHorizontal
                        style="margin-left: 0px;"
                        :readonly="false"
                        :no_label="true"
                        :text="'Country'"
                        v-model:pass_value="json_new.country_id"
                        :dbComponentBehavior="dbComponentBehavior.text_required"
                        :options="country_options"
                        v-on:receiveChange="handleChangeCountry"
                        />
                    </div>
                    </div>
                </div>

                <div v-if="tab!='country' && tab!='region'" class="row row_section">
                    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div class="component_div">
                        <LabelSelectFilterHorizontal
                        style="margin-left: 0px;"
                        :readonly="false"
                        :no_label="true"
                        :text="'Region'"
                        v-model:pass_value="json_new.region_id"
                        :dbComponentBehavior="dbComponentBehavior.text_required"
                        :options="region_options"
                        v-on:receiveChange="handleChangeRegion"
                        />
                    </div>
                    </div>
                </div>

                <div v-if="tab!='country' && tab!='region' && tab!='state'" class="row row_section">
                    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div class="component_div">
                        <LabelSelectFilterHorizontal
                        style="margin-left: 0px;"
                        :readonly="false"
                        :no_label="true"
                        :text="'State'"
                        v-model:pass_value="json_new.state_id"
                        :dbComponentBehavior="dbComponentBehavior.text_required"
                        :options="state_options"
                        v-on:receiveChange="handleChangeState"
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
                <Button_icon :flat="true" :font_color="'black'" :color="'white'" :text="'CANCEL'" :outline="true" size="15px" class="custom_cancel_button" v-close-popup />

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
</div>
</div>
</div>
</q-form>
</template>

<script>
// import Input from 'src/components/ERP/Base/Input';
import Label from 'src/components/ERP/Base/Label';
import Table from 'src/components/ERP/Base/Table';
import LabelInputHorizontal from'src/components/ERP/General/LabelInputHorizontal';
import LabelSelectFilterHorizontal from'src/components/ERP/General/LabelSelectFilterHorizontal';
import SelectFilter from'src/components/ERP/Base/SelectFilter';
import Button_icon from 'src/components/ERP/Base/Button_icon'
import TablePagination from 'src/components/ERP/Base/TablePagination';
import Chip from 'src/components/ERP/Base/Chip';
// import Input from 'src/components/ERP/Base/Input';
import { ref } from 'vue';
import { Notify } from "quasar";
import { Loading, QSpinnerTail } from 'quasar';
import Title from 'src/components/ERP/General/Title'
// import Button from 'src/components/Base/Button';

export default {
    name: 'Dashboard',
    data() {
        return {
            tab: 'country',
            table_data:[],
            table_column: [
                {
                    name: 'action',
                    required: true,
                    label: 'Actions',
                    align: 'left',
                    sortable: false
                },
                {
                    align: 'right',
                    field: 'dept_code',
                    sortable: true,
                    name: 'dept_code',
                    label: 'Dept Code',
                    required: true,
                },
                {
                    align: 'left',
                    field: 'dept_desc',
                    sortable: true,
                    name: 'dept_desc',
                    label: 'Dept Description',
                    required: true,
                },
                {
                    align: 'left',
                    field: 'group_code',
                    sortable: true,
                    name: 'group_code',
                    label: 'Group',
                    required: true,
                },
                {
                    align: 'left',
                    field: 'created_at',
                    sortable: true,
                    name: 'created_at',
                    label: 'Created at',
                    required: true,
                },
                {
                    align: 'left',
                    field: 'created_by',
                    sortable: true,
                    name: 'created_by',
                    label: 'Created by',
                    required: true,
                },
                {
                    align: 'left',
                    field: 'updated_at',
                    sortable: true,
                    name: 'updated_at',
                    label: 'Updated at',
                    required: true,
                },
                {
                    align: 'left',
                    field: 'updated_by',
                    sortable: true,
                    name: 'updated_by',
                    label: 'Updated by',
                    required: true,
                },
            ],
            test_data:[],
            test_column: [],
            ori_params: {},
            showAddTask: false,
            json_new: {},
            is_update: false,
            continent_options: [],
            currency_options: [],
            country_options: [],
            region_options: [],
            state_options: [],
            active_delete_json: {},
            delete_confirmation: false,
            company_guid: sessionStorage.getItem("company_guid") != "" && sessionStorage.getItem("company_guid") != "null" && sessionStorage.getItem("company_guid") != null ? sessionStorage.getItem("company_guid") : '',
        }
    },
    components: {
        // Input,
        Label,
        // Table,
        LabelInputHorizontal,
        LabelSelectFilterHorizontal,
        TablePagination,
        Chip,
        // Input,
        Button_icon,
        Title,
    },
    computed: {
        dbComponentBehavior() {
            return this.$store.getters['dbComponentBehavior/byLanguage']('erp')
        },
    },
    async created() {},
    methods: {
        handleChangeCountry()
        {
            if(this.tab == 'state')
            {
                this.json_new.region_id = '';
                this.getRegionoptions(this.json_new.country_id);
            }
            else if(this.tab == 'district')
            {
                this.json_new.region_id = '';
                this.json_new.state_id = '';
                this.getRegionoptions(this.json_new.country_id);
                this.state_options = [];
            }
        },
        handleChangeRegion()
        {
            if(this.tab == 'district')
            {
                this.json_new.state_id = '';
                this.getStateoptions(this.json_new.region_id);
            }
        },
        async getContinentoptions()
        {
            var payload =
            {
                params: {
                    ordering: '-updated_at',
                }
            }

            await this.$store.dispatch('location/trigger_get_mc_continent', payload).then(() => {
                var data = JSON.parse(JSON.stringify(this.$store.getters['location/get_mc_continent']));
                var results = data.data.results;
                var ary = [];

                for(var i in results)
                {
                    var continent = results[i];
                    var obj = {
                        label: continent.code + ' - ' + continent.description,
                        value: continent.con_guid
                    }
                    ary.push(obj);
                }

                this.continent_options = ary;
            });
        },
        async getCurrencyoptions()
        {
            var payload =
            {
                params: {
                    ordering: '-updated_at',
                }
            }

            await this.$store.dispatch('location/trigger_get_mc_currency', payload).then(() => {
                var data = JSON.parse(JSON.stringify(this.$store.getters['location/get_mc_currency']));
                var results = data.data.results;
                var ary = [];

                for(var i in results)
                {
                    var currency = results[i];
                    var obj = {
                        label: currency.code + ' - ' + currency.description,
                        value: currency.cur_guid
                    }
                    ary.push(obj);
                }

                this.currency_options = ary;
            });
        },
        async getCountryoptions()
        {
            var payload =
            {
                params: {
                    ordering: '-updated_at',
                }
            }

            await this.$store.dispatch('location/trigger_get_mc_country', payload).then(() => {
                var data = JSON.parse(JSON.stringify(this.$store.getters['location/get_mc_country']));
                var results = data.data.results;
                var ary = [];

                for(var i in results)
                {
                    var country = results[i];
                    var obj = {
                        label: country.code + ' - ' + country.description,
                        value: country.country_guid
                    }
                    ary.push(obj);
                }

                this.country_options = ary;
            });
        },
        async getRegionoptions(newVal)
        {
            var payload =
            {
                params: {
                    ordering: '-updated_at',
                    country_guid: newVal
                }
            }

            await this.$store.dispatch('location/trigger_get_mc_region', payload).then(() => {
                var data = JSON.parse(JSON.stringify(this.$store.getters['location/get_mc_region']));
                var results = data.data.results;
                var ary = [];

                for(var i in results)
                {
                    var region = results[i];
                    var obj = {
                        label: region.code + ' - ' + region.description,
                        value: region.region_guid
                    }
                    ary.push(obj);
                }

                this.region_options = ary;
            });
        },
        async getStateoptions(newVal)
        {
            var payload =
            {
                params: {
                    ordering: '-updated_at',
                    region_guid: newVal
                }
            }

            await this.$store.dispatch('location/trigger_get_mc_state', payload).then(() => {
                var data = JSON.parse(JSON.stringify(this.$store.getters['location/get_mc_state']));
                var results = data.data.results;
                var ary = [];

                for(var i in results)
                {
                    var state = results[i];
                    var obj = {
                        label: state.code + ' - ' + state.description,
                        value: state.state_guid
                    }
                    ary.push(obj);
                }

                this.state_options = ary;
            });
        },
        async handleDeleteLine(){
            this.deleteLoading = true;

            var data = {};
            var payload = {};

            if(this.tab == 'country')
            {
                payload = {
                    country_guid: this.active_delete_json.guid
                }

                await this.$store.dispatch('location/trigger_delete_mc_country', payload).then(async () => {
                    data = JSON.parse(JSON.stringify(this.$store.getters['location/get_mc_country_status']));
                });
            }
            else if(this.tab == 'region')
            {
                payload = {
                    region_guid: this.active_delete_json.guid
                }

                await this.$store.dispatch('location/trigger_delete_mc_region', payload).then(async () => {
                    data = JSON.parse(JSON.stringify(this.$store.getters['location/get_mc_region_status']));
                });
            }
            else if(this.tab == 'state')
            {
                payload = {
                    state_guid: this.active_delete_json.guid
                }

                await this.$store.dispatch('location/trigger_delete_mc_state', payload).then(async () => {
                    data = JSON.parse(JSON.stringify(this.$store.getters['location/get_mc_state_status']));
                });
            }
            else if(this.tab == 'district')
            {
                payload = {
                    district_guid: this.active_delete_json.guid
                }

                await this.$store.dispatch('location/trigger_delete_mc_district', payload).then(async () => {
                    data = JSON.parse(JSON.stringify(this.$store.getters['location/get_mc_district_status']));
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
        handleDelete(payload){
            this.active_delete_json.guid = this.tab == 'country' ? payload.country_guid
            : this.tab == 'region' ? payload.region_guid
            : this.tab == 'state' ? payload.state_guid : payload.district_guid;

            this.delete_confirmation = true;
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
            var code = this.json_new.code;
            var description = this.json_new.description;
            var updated_by = 'test';

            var template = {
                code: code,
                description: description,
                updated_by: updated_by,
            };

            var payload = {};
            var data = {};

            if(!this.is_update)
            {
                payload = template;

                if(this.tab == 'country')
                {
                    payload.con_guid = this.json_new.con_id;
                    payload.cur_guid = this.json_new.cur_id;

                    await this.$store.dispatch('location/trigger_create_mc_country', payload).then(() => {
                        data = JSON.parse(JSON.stringify(this.$store.getters['location/get_mc_country_status']));
                    });
                }
                else if(this.tab == 'region')
                {
                    payload.country_guid = this.json_new.country_id;

                    await this.$store.dispatch('location/trigger_create_mc_region', payload).then(() => {
                        data = JSON.parse(JSON.stringify(this.$store.getters['location/get_mc_region_status']));
                    });
                }
                else if(this.tab == 'state')
                {
                    payload.region_guid = this.json_new.region_id;

                    await this.$store.dispatch('location/trigger_create_mc_state', payload).then(() => {
                        data = JSON.parse(JSON.stringify(this.$store.getters['location/get_mc_state_status']));
                    });
                }
                else if(this.tab == 'district')
                {
                    payload.state_guid = this.json_new.state_id;

                    await this.$store.dispatch('location/trigger_create_mc_district', payload).then(() => {
                        data = JSON.parse(JSON.stringify(this.$store.getters['location/get_mc_district_status']));
                    });
                }
            }
            else if(this.is_update)
            {
                var pass_json = template;

                if(this.tab == 'country')
                {
                    pass_json.con_guid = this.json_new.con_id;
                    pass_json.cur_guid = this.json_new.cur_id;

                    payload = {
                        country_guid: this.json_new.country_guid,
                        pass_json: pass_json
                    }

                    await this.$store.dispatch('location/trigger_update_mc_country', payload).then(() => {
                        data = JSON.parse(JSON.stringify(this.$store.getters['location/get_mc_country_status']));
                    });
                }
                else if(this.tab == 'region')
                {
                    pass_json.country_guid = this.json_new.country_id;

                    payload = {
                        region_guid: this.json_new.region_guid,
                        pass_json: pass_json
                    }

                    await this.$store.dispatch('location/trigger_update_mc_region', payload).then(() => {
                        data = JSON.parse(JSON.stringify(this.$store.getters['location/get_mc_region_status']));
                    });
                }
                else if(this.tab == 'state')
                {
                    pass_json.region_guid = this.json_new.region_id;

                    payload = {
                        state_guid: this.json_new.state_guid,
                        pass_json: pass_json
                    }

                    await this.$store.dispatch('location/trigger_update_mc_state', payload).then(() => {
                        data = JSON.parse(JSON.stringify(this.$store.getters['location/get_mc_state_status']));
                    });
                }
                else if(this.tab == 'district')
                {
                    pass_json.district_guid = this.json_new.district_id;

                    payload = {
                        district_guid: this.json_new.district_guid,
                        pass_json: pass_json
                    }

                    await this.$store.dispatch('location/trigger_update_mc_district', payload).then(() => {
                        data = JSON.parse(JSON.stringify(this.$store.getters['location/get_mc_district_status']));
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
                    temp_error = loop_index + " - " + error_message + "<br>";
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
        addButton: function()
        {
            this.showAddTask = true;
            this.json_new = {};
            this.country_options = [];
            this.region_options = [];
            this.state_options = [];
            this.is_update = false;

            if(this.tab == 'country')
            {
                this.json_new.country_id = '';
                this.getContinentoptions();
                this.getCurrencyoptions();
            }
            else if(this.tab == 'region')
            {
                this.json_new.country_id = '';
                this.getCountryoptions();
            }
            else if(this.tab == 'state')
            {
                this.json_new.country_id = '';
                this.json_new.region_id = '';
                this.getCountryoptions();
                this.region_options = [];
            }
            else if(this.tab == 'district')
            {
                this.json_new.country_id = '';
                this.json_new.region_id = '';
                this.json_new.state_id = '';
                this.getCountryoptions();
                this.region_options = [];
                this.state_options = [];
            }
        },
        handleAction: function(payload)
        {
            this.showLoading();
            this.json_new = {};

            var npayload = JSON.parse(JSON.stringify(payload));

            if(this.tab == 'country')
            {
                this.getContinentoptions();
                this.getCurrencyoptions();
                npayload.country_id = npayload.country_guid;
                npayload.con_id = npayload.con_guid.con_guid;
                npayload.cur_id = npayload.cur_guid.cur_guid;
            }
            else if(this.tab == 'region')
            {
                this.getCountryoptions();
                npayload.country_id = npayload.country_guid.country_guid;
                npayload.region_id = npayload.region_guid;
            }
            else if(this.tab == 'state')
            {
                this.getCountryoptions()
                npayload.country_id = npayload.region_guid.country_guid.country_guid;
                this.getRegionoptions(npayload.country_id)
                npayload.region_id = npayload.region_guid.region_guid;
                this.getStateoptions(npayload.region_id)
                npayload.state_id = npayload.state_guid;

            }
            else if(this.tab == 'district')
            {
                this.getCountryoptions()
                npayload.country_id = npayload.state_guid.region_guid.country_guid.country_guid;
                this.getRegionoptions(npayload.country_id)
                npayload.region_id = npayload.state_guid.region_guid.region_guid;
                this.getStateoptions(npayload.region_id)
                npayload.state_id = npayload.state_guid.state_guid;
            }

            this.showAddTask = true;
            setTimeout(()=>{
                this.json_new = npayload;
                this.hideLoading();
            },500)
            this.is_update = true;
        },
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

            var test_col = [
                {
                    name: 'action',
                    required: true,
                    label: 'Actions',
                    align: 'left',
                    sortable: false,
                    format: val => `${val}`,
                    headerStyle: "width: 1%; text-align: center;",
                },
                {
                    align: "left",
                    sortable: true,
                    name: "con_code",
                    label: "Continent Code",
                    format_child: "",
                    field: 'con_code',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;'
                },
                {
                    align: "left",
                    sortable: true,
                    name: "con_desc",
                    label: "Continent Desc",
                    format_child: "",
                    field: 'con_desc',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;'
                },
                {
                    align: "left",
                    sortable: true,
                    name: "cur_code",
                    label: "Currency Code",
                    format_child: "",
                    field: 'cur_code',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;'
                },
                {
                    align: "left",
                    sortable: true,
                    name: "cur_desc",
                    label: "Currency Desc",
                    format_child: "",
                    field: 'cur_desc',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;'
                },
                {
                    align: "left",
                    sortable: true,
                    name: "country_code",
                    label: "Country Code",
                    format_child: "",
                    field: 'country_code',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;'
                },
                {
                    align: "left",
                    sortable: true,
                    name: "country_desc",
                    label: "Country Desc",
                    format_child: "",
                    field: 'country_desc',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;'
                },
                {
                    align: "left",
                    sortable: true,
                    name: "region_code",
                    label: "Region Code",
                    format_child: "",
                    field: 'region_code',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;'
                },
                {
                    align: "left",
                    sortable: true,
                    name: "region_desc",
                    label: "Region Desc",
                    format_child: "",
                    field: 'region_desc',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;'
                },
                {
                    align: "left",
                    sortable: true,
                    name: "state_code",
                    label: "State Code",
                    format_child: "",
                    field: 'state_code',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;'
                },
                {
                    align: "left",
                    sortable: true,
                    name: "state_desc",
                    label: "State Desc",
                    format_child: "",
                    field: 'state_desc',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;'
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
            ];

            var data = {};

            if(this.tab == 'country')
            {
                if(payload.params.ordering == "con_code")
                {
                    payload.params.ordering = "con_guid__code"
                }
                else if(payload.params.ordering == "-con_code")
                {
                    payload.params.ordering = "-con_guid__code"
                }
                else if(payload.params.ordering == "con_desc")
                {
                    payload.params.ordering = "con_guid__description"
                }
                else if(payload.params.ordering == "-con_desc")
                {
                    payload.params.ordering = "-con_guid__description"
                }
                else if(payload.params.ordering == "cur_code")
                {
                    payload.params.ordering = "cur_guid__code"
                }
                else if(payload.params.ordering == "-cur_code")
                {
                    payload.params.ordering = "-cur_guid__code"
                }
                else if(payload.params.ordering == "cur_desc")
                {
                    payload.params.ordering = "cur_guid__description"
                }
                else if(payload.params.ordering == "-cur_desc")
                {
                    payload.params.ordering = "-cur_guid__description"
                }

                test_col = test_col.filter((entry)=>{
                    return entry.field != 'country_code' && entry.field != 'country_desc'
                    && entry.field != 'region_code' && entry.field != 'region_desc'
                    && entry.field != 'state_code' && entry.field != 'state_desc'
                })

                payload.params.company_guid = this.company_guid;

                await this.$store.dispatch('location/trigger_get_mc_country', payload).then(() => {
                    data = JSON.parse(JSON.stringify(this.$store.getters['location/get_mc_country']));
                    var results = data.data.results;
                    for(var i in results)
                    {
                        var obj = results[i];
                        obj.con_code = obj.con_guid.code;
                        obj.con_desc = obj.con_guid.description;
                        obj.cur_code = obj.cur_guid.code;
                        obj.cur_desc = obj.cur_guid.description;
                    }
                });
            }
            else if(this.tab == 'region')
            {
                if(payload.params.ordering == "country_code")
                {
                    payload.params.ordering = "country_guid__code"
                }
                else if(payload.params.ordering == "-country_code")
                {
                    payload.params.ordering = "-country_guid__code"
                }
                else if(payload.params.ordering == "country_desc")
                {
                    payload.params.ordering = "country_guid__description"
                }
                else if(payload.params.ordering == "-country_desc")
                {
                    payload.params.ordering = "-country_guid__description"
                }

                test_col = test_col.filter((entry)=>{
                    return entry.field != 'region_code' && entry.field != 'region_desc'
                    && entry.field != 'state_code' && entry.field != 'state_desc'
                    && entry.field != 'con_code' && entry.field != 'con_desc'
                    && entry.field != 'cur_code' && entry.field != 'cur_desc'
                })

                payload.params.company_guid = this.company_guid;

                await this.$store.dispatch('location/trigger_get_mc_region', payload).then(() => {
                    data = JSON.parse(JSON.stringify(this.$store.getters['location/get_mc_region']));
                    var results = data.data.results;
                    for(var i in results)
                    {
                        var obj = results[i];
                        obj.country_code = obj.country_guid.code;
                        obj.country_desc = obj.country_guid.description;
                    }
                });
            }
            else if(this.tab == 'state')
            {
                if(payload.params.ordering == "country_code")
                {
                    payload.params.ordering = "region_guid__country_guid__code"
                }
                else if(payload.params.ordering == "-country_code")
                {
                    payload.params.ordering = "-region_guid__country_guid__code"
                }
                else if(payload.params.ordering == "country_desc")
                {
                    payload.params.ordering = "region_guid__country_guid__description"
                }
                else if(payload.params.ordering == "-country_desc")
                {
                    payload.params.ordering = "-region_guid__country_guid__description"
                }
                else if(payload.params.ordering == "region_code")
                {
                    payload.params.ordering = "region_guid__code"
                }
                else if(payload.params.ordering == "-region_code")
                {
                    payload.params.ordering = "-region_guid__code"
                }
                else if(payload.params.ordering == "region_desc")
                {
                    payload.params.ordering = "region_guid__description"
                }
                else if(payload.params.ordering == "-region_desc")
                {
                    payload.params.ordering = "-region_guid__description"
                }

                test_col = test_col.filter((entry)=>{
                    return entry.field != 'state_code' && entry.field != 'state_desc'
                    && entry.field != 'con_code' && entry.field != 'con_desc'
                    && entry.field != 'cur_code' && entry.field != 'cur_desc'
                })

                payload.params.company_guid = this.company_guid;

                await this.$store.dispatch('location/trigger_get_mc_state', payload).then(() => {
                    data = JSON.parse(JSON.stringify(this.$store.getters['location/get_mc_state']));
                    var results = data.data.results;
                    for(var i in results)
                    {
                        var obj = results[i];
                        obj.country_code = obj.region_guid.country_guid.code;
                        obj.country_desc = obj.region_guid.country_guid.description;
                        obj.region_code = obj.region_guid.code;
                        obj.region_desc = obj.region_guid.description;
                    }
                });
            }
            else if(this.tab == 'district')
            {
                if(payload.params.ordering == "country_code")
                {
                    payload.params.ordering = "state_guid__region_guid__country_guid__code"
                }
                else if(payload.params.ordering == "-country_code")
                {
                    payload.params.ordering = "-state_guid__region_guid__country_guid__code"
                }
                else if(payload.params.ordering == "country_desc")
                {
                    payload.params.ordering = "state_guid__region_guid__country_guid__description"
                }
                else if(payload.params.ordering == "-country_desc")
                {
                    payload.params.ordering = "-state_guid__region_guid__country_guid__description"
                }
                else if(payload.params.ordering == "region_code")
                {
                    payload.params.ordering = "state_guid__region_guid__code"
                }
                else if(payload.params.ordering == "-region_code")
                {
                    payload.params.ordering = "-state_guid__region_guid__code"
                }
                else if(payload.params.ordering == "region_desc")
                {
                    payload.params.ordering = "state_guid__region_guid__description"
                }
                else if(payload.params.ordering == "-region_desc")
                {
                    payload.params.ordering = "-state_guid__region_guid__description"
                }
                else if(payload.params.ordering == "state_code")
                {
                    payload.params.ordering = "state_guid__code"
                }
                else if(payload.params.ordering == "-state_code")
                {
                    payload.params.ordering = "-state_guid__code"
                }
                else if(payload.params.ordering == "state_desc")
                {
                    payload.params.ordering = "state_guid__description"
                }
                else if(payload.params.ordering == "-state_desc")
                {
                    payload.params.ordering = "-state_guid__description"
                }

                test_col = test_col.filter((entry)=>{
                    return entry.field != 'con_code' && entry.field != 'con_desc'
                    && entry.field != 'cur_code' && entry.field != 'cur_desc'
                })

                payload.params.company_guid = this.company_guid;

                await this.$store.dispatch('location/trigger_get_mc_district', payload).then(() => {
                    data = JSON.parse(JSON.stringify(this.$store.getters['location/get_mc_district']));
                    var results = data.data.results;
                    for(var i in results)
                    {
                        var obj = results[i];
                        obj.country_code = obj.state_guid.region_guid.country_guid.code;
                        obj.country_desc = obj.state_guid.region_guid.country_guid.description;
                        obj.region_code = obj.state_guid.region_guid.code;
                        obj.region_desc = obj.state_guid.region_guid.description;
                        obj.state_code = obj.state_guid.code;
                        obj.state_desc = obj.state_guid.description;
                    }
                });
            }

            this.test_data = data;
            this.test_column = test_col;
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
    },
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

.card_design{
    width: 700px;
    max-width: 800vw;
}

.table_wrapper{
    padding-top: 2px;
    padding-bottom: 2px;
    padding-left: 2px;
    padding-right: 2px;
}

* >>> .q-tab__content
{
    color: white !important;
}

* >>> .q-tab--active
{
    color: white !important;
}

* >>> .q-tab__indicator
{
    color: white !important;
}

</style>
