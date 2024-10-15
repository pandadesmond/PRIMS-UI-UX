<template>
<q-form ref="submit_form">
<div class="row row_section" style="padding: 0px; margin-bottom: 10px; margin-left: 12px;">
    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <Chip text="Item" icon="sell"/> / <Chip text="Assorted" icon="workspaces_filled"/>
    </div>

    <Title :text="'Assorted'" :noFilter="true" :filter_status="filter_status" v-on:receiveFilter="handleReceiveFilter" />
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
                <q-tab name="group" label="Group" />
                <q-tab name="item" label="Item" />
            </q-tabs>
            </q-toolbar>

            <q-tab-panels v-model="tab" :animated="false">
                <q-tab-panel name="group">
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
                    title="Group serverside table"
                    />
                </q-tab-panel>

                <q-tab-panel name="item">
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
                    title="Item serverside table"
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
                <div v-if="tab!='group'" class="row row_section">
                    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div class="component_div">
                        <LabelSelectFilterHorizontal
                        style="margin-left: 0px;"
                        :readonly="false"
                        :no_label="true"
                        :text="'Group'"
                        v-model:pass_value="json_new.assorted_main_id"
                        :dbComponentBehavior="dbComponentBehavior.text_required"
                        :options="assorted_main_options"
                        v-on:receiveChange="handleChangeGroup"
                        />
                    </div>
                    </div>
                </div>

                <div v-if="tab!='group'" class="row row_section">
                    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div class="component_div">
                        <LabelSelectFilterHorizontal
                        style="margin-left: 0px;"
                        :readonly="false"
                        :no_label="true"
                        :text="'Item'"
                        v-model:pass_value="json_new.item_id"
                        :dbComponentBehavior="dbComponentBehavior.text_required"
                        :options="item_options"
                        v-on:receiveChange="handleChangeItem"
                        />
                    </div>
                    </div>
                </div>

                <div v-if="tab!='item'" class="row row_section">
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

                <div v-if="tab!='item'" class="row row_section">
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
// import Button from 'src/components/Base/Button';
import Title from 'src/components/ERP/General/Title'

export default {
    name: 'Dashboard',
    data() {
        return {
            company_guid: sessionStorage.getItem("company_guid") != "" && sessionStorage.getItem("company_guid") != "null" && sessionStorage.getItem("company_guid") != null ? sessionStorage.getItem("company_guid") : '',
            tab: 'group',
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
            company_options: [],
            assorted_main_options: [],
            item_options: [],
            active_delete_json: {},
            delete_confirmation: false,
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
    async created(){},
    methods: {
        async getGroupoptions()
        {
            var payload =
            {
                params: {
                    ordering: '-updated_at',
                    company_guid: this.company_guid
                }
            }

            await this.$store.dispatch('item/trigger_get_ml_item_assorted_main', payload).then(() => {
                var data = JSON.parse(JSON.stringify(this.$store.getters['item/get_ml_item_assorted_main']));
                var results = data.data.results;
                var ary = [];

                for(var i in results)
                {
                    var group = results[i];
                    var obj = {
                        label: group.code + ' - ' + group.description,
                        value: group.assorted_main_guid
                    }
                    ary.push(obj);
                }

                this.assorted_main_options = ary;
            });
        },
        async getItemoptions()
        {
            var payload =
            {
                params: {
                    ordering: '-updated_at',
                    company_guid: this.company_guid
                }
            }

            await this.$store.dispatch('item/trigger_get_ml_itemmaster', payload).then(() => {
                var data = JSON.parse(JSON.stringify(this.$store.getters['item/get_ml_itemmaster']));
                var results = data.data.results;
                var ary = [];

                for(var i in results)
                {
                    var item = results[i];
                    var obj = {
                        label: item.itemcode + ' - ' + item.description,
                        value: item.item_guid
                    }
                    ary.push(obj);
                }

                this.item_options = ary;
            });
        },
        async handleDeleteLine(){
            this.deleteLoading = true;

            var data = {};
            var payload = {};

            if(this.tab == 'group')
            {
                payload = {
                    assorted_main_guid: this.active_delete_json.guid
                }

                await this.$store.dispatch('item/trigger_delete_ml_item_assorted_main', payload).then(async () => {
                    data = JSON.parse(JSON.stringify(this.$store.getters['item/get_ml_item_assorted_main_status']));
                });
            }
            else if(this.tab == 'item')
            {
                payload = {
                    assorted_child_guid: this.active_delete_json.guid
                }

                await this.$store.dispatch('item/trigger_delete_ml_item_assorted_child', payload).then(async () => {
                    data = JSON.parse(JSON.stringify(this.$store.getters['item/get_ml_item_assorted_child_status']));
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
          console.log(payload)
            this.active_delete_json.guid = this.tab == 'group' ? payload.assorted_main_guid : payload.assorted_child_guid;

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

                if(this.tab == 'group')
                {
                    payload.company_guid = this.company_guid;

                    await this.$store.dispatch('item/trigger_create_ml_item_assorted_main', payload).then(() => {
                        data = JSON.parse(JSON.stringify(this.$store.getters['item/get_ml_item_assorted_main_status']));
                    });
                }
                else if(this.tab == 'item')
                {
                    payload.assorted_main_guid = this.json_new.assorted_main_id;
                    payload.item_guid = this.json_new.item_id;

                    await this.$store.dispatch('item/trigger_create_ml_item_assorted_child', payload).then(() => {
                        data = JSON.parse(JSON.stringify(this.$store.getters['item/get_ml_item_assorted_child_status']));
                    });
                }
            }
            else if(this.is_update)
            {
                var pass_json = template;

                if(this.tab == 'group')
                {
                    pass_json.company_guid = this.company_guid;

                    payload = {
                        assorted_main_guid: this.json_new.assorted_main_guid,
                        pass_json: pass_json
                    }

                    await this.$store.dispatch('item/trigger_update_ml_item_assorted_main', payload).then(() => {
                        data = JSON.parse(JSON.stringify(this.$store.getters['item/get_ml_item_assorted_main_status']));
                    });
                }
                else if(this.tab == 'item')
                {
                    pass_json.assorted_main_guid = this.json_new.assorted_main_id;
                    pass_json.item_guid = this.json_new.item_id;

                    payload = {
                        assorted_child_guid: this.json_new.assorted_child_guid,
                        pass_json: pass_json
                    }

                    await this.$store.dispatch('item/trigger_update_ml_item_assorted_child', payload).then(() => {
                        data = JSON.parse(JSON.stringify(this.$store.getters['item/get_ml_item_assorted_child_status']));
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
            this.assorted_main_options = [];
            this.item_options = [];
            this.is_update = false;

            if(this.tab == 'item')
            {
                this.json_new.assorted_main_id = '';
                this.getGroupoptions(this.company_guid);
                this.getItemoptions(this.company_guid);
            }
        },
        handleAction: function(payload)
        {
            this.showLoading();
            this.json_new = {};

            var npayload = JSON.parse(JSON.stringify(payload));

            if(this.tab == 'group')
            {
                npayload.company_id = npayload.company_guid.company_guid;
            }
            else if(this.tab == 'item')
            {
                npayload.company_id = npayload.assorted_main_guid.company_guid.company_guid;
                this.getGroupoptions(npayload.company_id)
                this.getItemoptions(npayload.company_id)
                npayload.assorted_main_id = npayload.assorted_main_guid.assorted_main_guid;
                npayload.item_id = npayload.item_guid.item_guid;
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
                    name: "assorted_main_code",
                    label: "Group Code",
                    format_child: "",
                    field: 'assorted_main_code',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;'
                },
                {
                    align: "left",
                    sortable: true,
                    name: "assorted_main_desc",
                    label: "Group Desc",
                    format_child: "",
                    field: 'assorted_main_desc',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;'
                },,
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

            if(this.tab == 'group')
            {
                test_col = test_col.filter((entry)=>{
                    return entry.field != 'assorted_main_code' && entry.field != 'assorted_main_desc'
                })

                payload.params.company_guid = this.company_guid;

                await this.$store.dispatch('item/trigger_get_ml_item_assorted_main', payload).then(() => {
                    data = JSON.parse(JSON.stringify(this.$store.getters['item/get_ml_item_assorted_main']));
                    var results = data.data.results;
                    for(var i in results)
                    {
                        var obj = results[i];
                        obj.company_code = obj.company_guid.code;
                        obj.company_desc = obj.company_guid.description;
                    }
                });
            }
            else if(this.tab == 'item')
            {
                if(payload.params.ordering == "assorted_main_code")
                {
                    payload.params.ordering = "assorted_main_guid__code"
                }
                else if(payload.params.ordering == "-assorted_main_code")
                {
                    payload.params.ordering = "-assorted_main_guid__code"
                }
                else if(payload.params.ordering == "assorted_main_desc")
                {
                    payload.params.ordering = "assorted_main_guid__description"
                }
                else if(payload.params.ordering == "-assorted_main_desc")
                {
                    payload.params.ordering = "-assorted_main_guid__description"
                }

                payload.params.company_guid = this.company_guid;

                await this.$store.dispatch('item/trigger_get_ml_item_assorted_child', payload).then(() => {
                    data = JSON.parse(JSON.stringify(this.$store.getters['item/get_ml_item_assorted_child']));
                    var results = data.data.results;
                    for(var i in results)
                    {
                        var obj = results[i];
                        obj.assorted_main_code = obj.assorted_main_guid.code;
                        obj.assorted_main_desc = obj.assorted_main_guid.description;
                        obj.code = obj.item_guid.itemcode;
                        obj.description = obj.item_guid.description;
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
