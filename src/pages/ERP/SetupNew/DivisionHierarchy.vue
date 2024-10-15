<template>
<q-form ref="submit_form">
<div class="row row_section" style="padding: 0px; margin-bottom: 10px; margin-left: 12px;">
    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <Chip text="Setup" icon="tune"/> / <Chip text="Division Hierarchy" icon="category"/>
    </div>

    <Title :text="'Division Hierarchy'" :noFilter="true" :filter_status="filter_status" v-on:receiveFilter="handleReceiveFilter" />
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
                style="max-width: 80vw;"
            >
                <q-tab name="division" label="Division" />
                <q-tab name="department" label="Department" />
                <q-tab name="subdept" label="Sub - Dept" />
                <q-tab name="category" label="Category" />
            </q-tabs>
            </q-toolbar>

            <q-tab-panels v-model="tab" :animated="false">
                <q-tab-panel name="division">
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
                    title="Division serverside table"
                    />
                </q-tab-panel>

                <q-tab-panel name="department">
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
                    title="Dept serverside table"
                    />
                </q-tab-panel>

                <q-tab-panel name="subdept">
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
                    title="Sub - Dept serverside table"
                    />
                </q-tab-panel>

                <q-tab-panel name="category">
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
                    title="Category serverside table"
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
                <div v-if="tab!='division'" class="row row_section">
                    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div class="component_div">
                        <LabelSelectFilterHorizontal
                        style="margin-left: 0px;"
                        :readonly="false"
                        :no_label="true"
                        :text="'Division'"
                        v-model:pass_value="json_new.division_id"
                        :dbComponentBehavior="dbComponentBehavior.text_required"
                        :options="division_options"
                        v-on:receiveChange="handleChangeDivision"
                        />
                    </div>
                    </div>
                </div>

                <div v-if="tab!='division' && tab!='department'" class="row row_section">
                    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div class="component_div">
                        <LabelSelectFilterHorizontal
                        style="margin-left: 0px;"
                        :readonly="false"
                        :no_label="true"
                        :text="'Department'"
                        v-model:pass_value="json_new.department_id"
                        :dbComponentBehavior="dbComponentBehavior.text_required"
                        :options="department_options"
                        v-on:receiveChange="handleChangeDepartment"
                        />
                    </div>
                    </div>
                </div>

                <div v-if="tab!='division' && tab!='department' && tab!='subdept'" class="row row_section">
                    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div class="component_div">
                        <LabelSelectFilterHorizontal
                        style="margin-left: 0px;"
                        :readonly="false"
                        :no_label="true"
                        :text="'Subdept'"
                        v-model:pass_value="json_new.subdept_id"
                        :dbComponentBehavior="dbComponentBehavior.text_required"
                        :options="subdept_options"
                        v-on:receiveChange="handleChangeSubdept"
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
            tab: 'division',
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
            division_options: [],
            department_options: [],
            subdept_options: [],
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
        handleChangeDivision()
        {
            if(this.tab == 'subdept')
            {
                this.json_new.department_id = '';
                this.getDepartmentoptions(this.json_new.division_id);
            }
            else if(this.tab == 'category')
            {
                this.json_new.department_id = '';
                this.json_new.subdept_id = '';
                this.getDepartmentoptions(this.json_new.division_id);
                this.subdept_options = [];
            }
        },
        handleChangeDepartment()
        {
            if(this.tab == 'category')
            {
                this.json_new.subdept_id = '';
                this.getSubdeptoptions(this.json_new.department_id);
            }
        },
        async getDivisionoptions(newVal)
        {
            var payload =
            {
                params: {
                    ordering: '-updated_at',
                    company_guid: this.company_guid
                }
            }

            await this.$store.dispatch('setup/trigger_get_mc_division', payload).then(() => {
                var data = JSON.parse(JSON.stringify(this.$store.getters['setup/get_mc_division']));
                var results = data.data.results;
                var ary = [];

                for(var i in results)
                {
                    var division = results[i];
                    var obj = {
                        label: division.code + ' - ' + division.description,
                        value: division.division_guid
                    }
                    ary.push(obj);
                }

                this.division_options = ary;
            });
        },
        async getDepartmentoptions(newVal)
        {
            var payload =
            {
                params: {
                    ordering: '-updated_at',
                    division_guid: newVal
                }
            }

            await this.$store.dispatch('setup/trigger_get_mc_department', payload).then(() => {
                var data = JSON.parse(JSON.stringify(this.$store.getters['setup/get_mc_department']));
                var results = data.data.results;
                var ary = [];

                for(var i in results)
                {
                    var department = results[i];
                    var obj = {
                        label: department.code + ' - ' + department.description,
                        value: department.department_guid
                    }
                    ary.push(obj);
                }

                this.department_options = ary;
            });
        },
        async getSubdeptoptions(newVal)
        {
            var payload =
            {
                params: {
                    ordering: '-updated_at',
                    department_guid: newVal
                }
            }

            await this.$store.dispatch('setup/trigger_get_mc_subdept', payload).then(() => {
                var data = JSON.parse(JSON.stringify(this.$store.getters['setup/get_mc_subdept']));
                var results = data.data.results;
                var ary = [];

                for(var i in results)
                {
                    var subdept = results[i];
                    var obj = {
                        label: subdept.code + ' - ' + subdept.description,
                        value: subdept.subdept_guid
                    }
                    ary.push(obj);
                }

                this.subdept_options = ary;
            });
        },
        async handleDeleteLine(){
            this.deleteLoading = true;

            var data = {};
            var payload = {};

            if(this.tab == 'division')
            {
                payload = {
                    division_guid: this.active_delete_json.guid
                }

                await this.$store.dispatch('setup/trigger_delete_mc_division', payload).then(async () => {
                    data = JSON.parse(JSON.stringify(this.$store.getters['setup/get_mc_division_status']));
                });
            }
            else if(this.tab == 'department')
            {
                payload = {
                    department_guid: this.active_delete_json.guid
                }

                await this.$store.dispatch('setup/trigger_delete_mc_department', payload).then(async () => {
                    data = JSON.parse(JSON.stringify(this.$store.getters['setup/get_mc_department_status']));
                });
            }
            else if(this.tab == 'subdept')
            {
                payload = {
                    subdept_guid: this.active_delete_json.guid
                }

                await this.$store.dispatch('setup/trigger_delete_mc_subdept', payload).then(async () => {
                    data = JSON.parse(JSON.stringify(this.$store.getters['setup/get_mc_subdept_status']));
                });
            }
            else if(this.tab == 'category')
            {
                payload = {
                    category_guid: this.active_delete_json.guid
                }

                await this.$store.dispatch('setup/trigger_delete_mc_category', payload).then(async () => {
                    data = JSON.parse(JSON.stringify(this.$store.getters['setup/get_mc_category_status']));
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
            this.active_delete_json.guid = this.tab == 'division' ? payload.division_guid
            : this.tab == 'department' ? payload.department_guid
            : this.tab == 'subdept' ? payload.subdept_guid : payload.category_guid;

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

                if(this.tab == 'division')
                {
                    payload.company_guid = this.company_guid;

                    await this.$store.dispatch('setup/trigger_create_mc_division', payload).then(() => {
                        data = JSON.parse(JSON.stringify(this.$store.getters['setup/get_mc_division_status']));
                    });
                }
                else if(this.tab == 'department')
                {
                    payload.division_guid = this.json_new.division_id;

                    await this.$store.dispatch('setup/trigger_create_mc_department', payload).then(() => {
                        data = JSON.parse(JSON.stringify(this.$store.getters['setup/get_mc_department_status']));
                    });
                }
                else if(this.tab == 'subdept')
                {
                    payload.department_guid = this.json_new.department_id;

                    await this.$store.dispatch('setup/trigger_create_mc_subdept', payload).then(() => {
                        data = JSON.parse(JSON.stringify(this.$store.getters['setup/get_mc_subdept_status']));
                    });
                }
                else if(this.tab == 'category')
                {
                    payload.subdept_guid = this.json_new.subdept_id;

                    await this.$store.dispatch('setup/trigger_create_mc_category', payload).then(() => {
                        data = JSON.parse(JSON.stringify(this.$store.getters['setup/get_mc_category_status']));
                    });
                }
            }
            else if(this.is_update)
            {
                var pass_json = template;

                if(this.tab == 'division')
                {
                    pass_json.company_guid = this.company_guid;

                    payload = {
                        division_guid: this.json_new.division_guid,
                        pass_json: pass_json
                    }

                    await this.$store.dispatch('setup/trigger_update_mc_division', payload).then(() => {
                        data = JSON.parse(JSON.stringify(this.$store.getters['setup/get_mc_division_status']));
                    });
                }
                else if(this.tab == 'department')
                {
                    pass_json.division_guid = this.json_new.division_id;

                    payload = {
                        department_guid: this.json_new.department_guid,
                        pass_json: pass_json
                    }

                    await this.$store.dispatch('setup/trigger_update_mc_department', payload).then(() => {
                        data = JSON.parse(JSON.stringify(this.$store.getters['setup/get_mc_department_status']));
                    });
                }
                else if(this.tab == 'subdept')
                {
                    pass_json.department_guid = this.json_new.department_id;

                    payload = {
                        subdept_guid: this.json_new.subdept_guid,
                        pass_json: pass_json
                    }

                    await this.$store.dispatch('setup/trigger_update_mc_subdept', payload).then(() => {
                        data = JSON.parse(JSON.stringify(this.$store.getters['setup/get_mc_subdept_status']));
                    });
                }
                else if(this.tab == 'category')
                {
                    pass_json.category_guid = this.json_new.category_id;

                    payload = {
                        category_guid: this.json_new.category_guid,
                        pass_json: pass_json
                    }

                    await this.$store.dispatch('setup/trigger_update_mc_category', payload).then(() => {
                        data = JSON.parse(JSON.stringify(this.$store.getters['setup/get_mc_category_status']));
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
        addButton: function()
        {
            this.showAddTask = true;
            this.json_new = {};
            this.division_options = [];
            this.department_options = [];
            this.subdept_options = [];
            this.is_update = false;

            if(this.tab == 'department')
            {
                this.json_new.division_id = '';
                this.getDivisionoptions(this.company_guid);
            }
            else if(this.tab == 'subdept')
            {
                this.json_new.division_id = '';
                this.json_new.department_id = '';
                this.getDivisionoptions(this.company_guid);
                this.department_options = [];
            }
            else if(this.tab == 'category')
            {
                this.json_new.division_id = '';
                this.json_new.department_id = '';
                this.json_new.subdept_id = '';
                this.getDivisionoptions(this.company_guid);
                this.department_options = [];
                this.subdept_options = [];
            }
        },
        handleAction: function(payload)
        {
            this.showLoading();
            this.json_new = {};

            var npayload = JSON.parse(JSON.stringify(payload));

            if(this.tab == 'division')
            {
                npayload.company_id = npayload.company_guid.company_guid;
            }
            else if(this.tab == 'department')
            {
                npayload.company_id = npayload.division_guid.company_guid.company_guid;
                this.getDivisionoptions(npayload.company_id)
                npayload.division_id = npayload.division_guid.division_guid;
            }
            else if(this.tab == 'subdept')
            {
                npayload.company_id = npayload.department_guid.division_guid.company_guid.company_guid;
                this.getDivisionoptions(npayload.company_id)
                npayload.division_id = npayload.department_guid.division_guid.division_guid;
                this.getDepartmentoptions(npayload.division_id)
                npayload.department_id = npayload.department_guid.department_guid;
                this.getSubdeptoptions(npayload.department_id)
            }
            else if(this.tab == 'category')
            {
                npayload.company_id = npayload.subdept_guid.department_guid.division_guid.company_guid.company_guid;
                this.getDivisionoptions(npayload.company_id)
                npayload.division_id = npayload.subdept_guid.department_guid.division_guid.division_guid;
                this.getDepartmentoptions(npayload.division_id)
                npayload.department_id = npayload.subdept_guid.department_guid.department_guid;
                this.getSubdeptoptions(npayload.department_id)
                npayload.subdept_id = npayload.subdept_guid.subdept_guid;
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
          console.log('change')
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
                    name: "division_code",
                    label: "Division Code",
                    format_child: "",
                    field: 'division_code',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;'
                },
                {
                    align: "left",
                    sortable: true,
                    name: "division_desc",
                    label: "Division Desc",
                    format_child: "",
                    field: 'division_desc',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;'
                },
                {
                    align: "left",
                    sortable: true,
                    name: "department_code",
                    label: "Department Code",
                    format_child: "",
                    field: 'department_code',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;'
                },
                {
                    align: "left",
                    sortable: true,
                    name: "department_desc",
                    label: "Department Desc",
                    format_child: "",
                    field: 'department_desc',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;'
                },
                {
                    align: "left",
                    sortable: true,
                    name: "subdept_code",
                    label: "Subdept Code",
                    format_child: "",
                    field: 'subdept_code',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;'
                },
                {
                    align: "left",
                    sortable: true,
                    name: "subdept_desc",
                    label: "Subdept Desc",
                    format_child: "",
                    field: 'subdept_desc',
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

            if(this.tab == 'division')
            {
                test_col = test_col.filter((entry)=>{
                    return entry.field != 'division_code' && entry.field != 'division_desc'
                    && entry.field != 'department_code' && entry.field != 'department_desc'
                    && entry.field != 'subdept_code' && entry.field != 'subdept_desc'
                })

                payload.params.company_guid = this.company_guid;

                await this.$store.dispatch('setup/trigger_get_mc_division', payload).then(() => {
                    data = JSON.parse(JSON.stringify(this.$store.getters['setup/get_mc_division']));
                });
            }
            else if(this.tab == 'department')
            {
                if(payload.params.ordering == "division_code")
                {
                    payload.params.ordering = "division_guid__code"
                }
                else if(payload.params.ordering == "-division_code")
                {
                    payload.params.ordering = "-division_guid__code"
                }
                else if(payload.params.ordering == "division_desc")
                {
                    payload.params.ordering = "division_guid__description"
                }
                else if(payload.params.ordering == "-division_desc")
                {
                    payload.params.ordering = "-division_guid__description"
                }

                test_col = test_col.filter((entry)=>{
                    return entry.field != 'department_code' && entry.field != 'department_desc'
                    && entry.field != 'subdept_code' && entry.field != 'subdept_desc'
                })

                payload.params.company_guid = this.company_guid;

                await this.$store.dispatch('setup/trigger_get_mc_department', payload).then(() => {
                    data = JSON.parse(JSON.stringify(this.$store.getters['setup/get_mc_department']));
                    var results = data.data.results;
                    for(var i in results)
                    {
                        var obj = results[i];
                        obj.division_code = obj.division_guid.code;
                        obj.division_desc = obj.division_guid.description;
                    }
                });
            }
            else if(this.tab == 'subdept')
            {
                if(payload.params.ordering == "division_code")
                {
                    payload.params.ordering = "department_guid__division_guid__code"
                }
                else if(payload.params.ordering == "-division_code")
                {
                    payload.params.ordering = "-department_guid__division_guid__code"
                }
                else if(payload.params.ordering == "division_desc")
                {
                    payload.params.ordering = "department_guid__division_guid__description"
                }
                else if(payload.params.ordering == "-division_desc")
                {
                    payload.params.ordering = "-department_guid__division_guid__description"
                }
                else if(payload.params.ordering == "department_code")
                {
                    payload.params.ordering = "department_guid__code"
                }
                else if(payload.params.ordering == "-department_code")
                {
                    payload.params.ordering = "-department_guid__code"
                }
                else if(payload.params.ordering == "department_desc")
                {
                    payload.params.ordering = "department_guid__description"
                }
                else if(payload.params.ordering == "-department_desc")
                {
                    payload.params.ordering = "-department_guid__description"
                }

                test_col = test_col.filter((entry)=>{
                    return entry.field != 'subdept_code' && entry.field != 'subdept_desc'
                })

                payload.params.company_guid = this.company_guid;

                await this.$store.dispatch('setup/trigger_get_mc_subdept', payload).then(() => {
                    data = JSON.parse(JSON.stringify(this.$store.getters['setup/get_mc_subdept']));
                    var results = data.data.results;
                    for(var i in results)
                    {
                        var obj = results[i];
                        obj.division_code = obj.department_guid.division_guid.code;
                        obj.division_desc = obj.department_guid.division_guid.description;
                        obj.department_code = obj.department_guid.code;
                        obj.department_desc = obj.department_guid.description;
                    }
                });
            }
            else if(this.tab == 'category')
            {
                if(payload.params.ordering == "division_code")
                {
                    payload.params.ordering = "subdept_guid__department_guid__division_guid__code"
                }
                else if(payload.params.ordering == "-division_code")
                {
                    payload.params.ordering = "-subdept_guid__department_guid__division_guid__code"
                }
                else if(payload.params.ordering == "division_desc")
                {
                    payload.params.ordering = "subdept_guid__department_guid__division_guid__description"
                }
                else if(payload.params.ordering == "-division_desc")
                {
                    payload.params.ordering = "-subdept_guid__department_guid__division_guid__description"
                }
                else if(payload.params.ordering == "department_code")
                {
                    payload.params.ordering = "subdept_guid__department_guid__code"
                }
                else if(payload.params.ordering == "-department_code")
                {
                    payload.params.ordering = "-subdept_guid__department_guid__code"
                }
                else if(payload.params.ordering == "department_desc")
                {
                    payload.params.ordering = "subdept_guid__department_guid__description"
                }
                else if(payload.params.ordering == "-department_desc")
                {
                    payload.params.ordering = "-subdept_guid__department_guid__description"
                }
                else if(payload.params.ordering == "subdept_code")
                {
                    payload.params.ordering = "subdept_guid__code"
                }
                else if(payload.params.ordering == "-subdept_code")
                {
                    payload.params.ordering = "-subdept_guid__code"
                }
                else if(payload.params.ordering == "subdept_desc")
                {
                    payload.params.ordering = "subdept_guid__description"
                }
                else if(payload.params.ordering == "-subdept_desc")
                {
                    payload.params.ordering = "-subdept_guid__description"
                }

                payload.params.company_guid = this.company_guid;

                await this.$store.dispatch('setup/trigger_get_mc_category', payload).then(() => {
                    data = JSON.parse(JSON.stringify(this.$store.getters['setup/get_mc_category']));
                    var results = data.data.results;
                    for(var i in results)
                    {
                        var obj = results[i];
                        obj.division_code = obj.subdept_guid.department_guid.division_guid.code;
                        obj.division_desc = obj.subdept_guid.department_guid.division_guid.description;
                        obj.department_code = obj.subdept_guid.department_guid.code;
                        obj.department_desc = obj.subdept_guid.department_guid.description;
                        obj.subdept_code = obj.subdept_guid.code;
                        obj.subdept_desc = obj.subdept_guid.description;
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
