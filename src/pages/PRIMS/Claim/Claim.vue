<template>
    <div class="row q-pa-md">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
            {{claim_type == 'edc' ? 'Event Driven Claim' : 'Promotion Claim'}}
        </div>
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-py-md">
            <div class="row q-gutter-md">
                <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-xs-12">
                    <Input
                        v-model:pass_value="search"
                        :dbComponentBehavior="dbComponentBehavior.text"
                        label="Search"
                        :filled="true"
                        @receiveChange="handleChangeSearch"
                    />
                </div>
            </div>
            <div class="row justify-end q-mt-md">
                <Button v-on:receiveClick="handleCreate"
                    pass_label="Create"
                    :pass_no_caps="true"
                    :pass_square="true"
                    :pass_dense="true"
                    class="custom_button"
                />
            </div>
        </div>
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <Table
                :row_per_page="[10,50,100,1000]"
                :table_data="table_data"
                :table_column="table_column"
                :flat_status="true"
                :bordered_status="true"
                v-on:receiveRequestTable="handleTableChange"

                :allow_print_claim="true"
                v-on:receiveHandleEdit="handleReceiveHandleEdit"
                v-on:receiveHandlePrint="handleReceivePrint"

                :filter_mode_on="filter_mode_on"
                v-on:receiveColumnRearrange="handleColumnRearrange"
                v-on:filter_column="handleFilterColumn"
                :forceLoading="forceLoading"
                :column_reordering="true"
                :row_reordering="false"
                :date_format="this.preference.dateFormat ? this.preference.dateFormat : 'YYYY-MM-DD'"
                v-on:receiveHandleClearFilter="handleClearFilter"

                :pass_visible_columns="visibleColumns"
            />
        </div>
    </div>

    <q-inner-loading
        :showing="loading"
        color="primary"
    />
</template>

<script>
import Button from 'src/components/PRIMS/Main/Button';
import Input from 'src/components/PRIMS/Main/Input';
import Table from 'src/components/PRIMS/Main/Table.vue';
import { Notify } from "quasar";

export default {
    components: {
        Input,
        Button,
        Table,
    },
    computed: {
        dbComponentBehavior() {
            return this.$store.getters["dbComponentBehavior/byLanguage"]("tta");
        },
    },
    data() {
        return {
            preference: {},
            company_guid: localStorage.getItem("company_guid") != "" && localStorage.getItem("company_guid") != "null" && localStorage.getItem("company_guid") != null ? localStorage.getItem("company_guid") : "",
            claim_type: this.$route.name,
            search: "",
            table_column: [],
            table_data: [],
            visibleColumns: [],
            rearrange_column: [],
            ori_params: {},
            filter_mode_on: false,
            forceLoading: false,
            forceSelectAll: false,
            loading: false,
        }
    },
    async created(){
        if(!localStorage.getItem("preference_setting"))
        {
            var pass_obj = {
                "dispatch": 'general/trigger_get_company',
                "getter": 'general/get_company',
                "app": this,
                "payload": {
                    "company_guid": this.company_guid
                },
            }

            var company = await this.$dispatch(pass_obj);

            if(!company.status)
            {
                this.showNotify('negative', "Preference setting failed.");
                this.$router.push({name: "tta"});
            }

            this.preference = {
                "dateFormat": company.response.data.date_format_setting,
                "default_date_to": company.response.data.date_to_setting,
                "division_setting": company.response.data.division_setting == 1 ? true : false,
                "banner_setting": company.response.data.banner_option_setting,
                "displayBanner": company.response.data.display_banner_setting == 1 ? true : false,
                "settlement_discount_setting": company.response.data.settlement_discount_setting == 1 ? true : false,
            };
            localStorage.setItem("preference_setting", JSON.stringify(this.preference));
        }
        else
        {
            this.preference = JSON.parse(localStorage.getItem("preference_setting"));
        }
    },
    methods: {
        handleTableChange(newVal)
        {
            var new_params = this.$pluginsTableParams(newVal)

            var payload = {
                params : new_params
            };

            this.ori_params = payload;

            this.table_function(payload);
        },
        async table_function(payload){
            this.forceLoading = true;

            if(this.rearrange_column.length > 0)
            {
                var column = this.rearrange_column;
            }
            else
            {
                var column = [
                    {
                        name: 'action',
                        required: true,
                        label: 'Action',
                        align: 'center',
                        sortable: false,
                        field: 'action',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    // {
                    //     name: 'select',
                    //     required: true,
                    //     label: '',
                    //     align: 'center',
                    //     sortable: false,
                    //     field: 'select',
                    //     data_type: 'select_all',
                    //     headerStyle: 'text-align: center; width: 1%;',
                    //     filter_type: 'input',
                    //     filter_options: [],
                    //     filter_value: '',
                    // },
                    {
                        name: 'status',
                        required: true,
                        label: 'Status',
                        align: 'center',
                        sortable: true,
                        field: 'status',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    {
                        name: 'refno',
                        required: true,
                        label: 'Ref No',
                        align: 'center',
                        sortable: true,
                        field: 'refno',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    // {
                    //     name: 'outlet_code',
                    //     required: true,
                    //     label: 'Outlet',
                    //     align: 'center',
                    //     sortable: true,
                    //     field: 'outlet_code',
                    //     headerStyle: 'text-align: center; width: 1%;',
                    //     style: 'max-width: 250px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;',
                    //     filter_type: 'input',
                    //     filter_options: [],
                    //     filter_value: '',
                    // },
                    {
                        name: 'date',
                        required: true,
                        label: 'Date',
                        align: 'center',
                        sortable: true,
                        field: 'date',
                        data_type: 'date',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    {
                        name: 'vendor_code',
                        required: true,
                        label: 'Vendor Code',
                        align: 'center',
                        sortable: true,
                        field: 'vendor_code',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    {
                        name: 'vendor_name',
                        required: true,
                        label: 'Vendor Name',
                        align: 'left',
                        sortable: true,
                        field: 'vendor_name',
                        headerStyle: 'text-align: center; min-width: 300px;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    {
                        name: 'remarks',
                        required: true,
                        label: 'Remarks',
                        align: 'left',
                        sortable: true,
                        field: 'remarks',
                        headerStyle: 'text-align: center; width: 1%;',
                        style: 'max-width: 250px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    {
                        name: 'approved',
                        required: true,
                        label: 'Approved',
                        align: 'center',
                        sortable: true,
                        field: 'approved',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    {
                        name: 'posted',
                        required: true,
                        label: 'Posted',
                        align: 'center',
                        sortable: true,
                        field: 'posted',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    {
                        name: 'created_at',
                        required: true,
                        label: 'Create At',
                        align: 'center',
                        sortable: true,
                        field: 'created_at',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    {
                        name: 'created_by',
                        required: true,
                        label: 'Created By',
                        align: 'center',
                        sortable: true,
                        field: 'created_by',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    {
                        name: 'updated_at',
                        required: true,
                        label: 'Updated At',
                        align: 'center',
                        sortable: true,
                        field: 'updated_at',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    {
                        name: 'updated_by',
                        required: true,
                        label: 'Updated By',
                        align: 'center',
                        sortable: true,
                        field: 'updated_by',
                        headerStyle: 'text-align: center; width: 1%;',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                ];
            }

            this.table_column = column;

            payload.params.search = this.search;
            
            if(payload.params.ordering == "")
            {
                payload.params.ordering = "-updated_at";
            }

            if(this.claim_type == 'edc')
            {
                var pass_obj = {
                    "dispatch": 'claim/trigger_get_edc_list',
                    "getter": 'claim/get_edc',
                    "app": this,
                    "payload": payload,
                };
            }
            else if(this.claim_type == 'pd')
            {
                var pass_obj = {
                    "dispatch": 'claim/trigger_get_pd_list',
                    "getter": 'claim/get_pd',
                    "app": this,
                    "payload": payload,
                };
            }            

            var claim = await this.$dispatch(pass_obj);

            if(claim.status)
            {
                var rows = claim.response;
                if(rows.data.results.length > 0)
                {
                    rows.data.results.forEach(row => {
                        row.status = row.posted == 1 ? 'Posted' : row.approved == 1 ? 'Approved' : 'Pending';
                    });
                }
            }
            else
            {
                var rows = {
                    data: {
                        results: [],
                    }
                };
            }

            this.table_data = rows;
            
            this.forceLoading = false;
        },
        handleColumnRearrange(pass_payload)
        {
            this.rearrange_column = pass_payload;
        },
        handleFilterColumn(pass_payload)
        {
            this.rearrange_column = this.table_column;
            this.table_function(this.ori_params);
        },
        async handleClearFilter()
        {
            await this.clearFilterInput();
            this.rearrange_column = this.table_column;

            this.table_function(this.ori_params);
        },
        handleChangeSearch()
        {
            this.table_data = {
                data: {
                    results: [],
                }
            };
            this.forceLoading = true;
            this.table_function(this.ori_params);
        },
        handleCreate()
        {
            if(this.claim_type == 'edc')
                this.$router.push({name: 'createEDC'});
            else if(this.claim_type == 'pd')
                this.$router.push({name: 'createPD'});
        },
        handleReceiveHandleEdit(data)
        {
            console.log(data)
            if(this.claim_type == 'edc')
                this.$router.push({name: 'editEDC', query: { guid: data.row.edc_guid}});
            else if(this.claim_type == 'pd')
                this.$router.push({name: 'editPD', query: { guid: data.row.pd_guid}});
        },
        handleReceivePrint(data)
        {
            if(this.claim_type == 'edc')
            {
                var query = {
                    guid: data.row.edc_guid,
                    type: this.claim_type,
                    view: data.type,
                }

            }
                
            else if(this.claim_type == 'pd')
            {
                var query = {
                    guid: data.row.pd_guid,
                    type: this.claim_type,
                    view: data.type,
                }
            }

            this.$router.push({name:'printAgreement', query: query});
        },
        isValidJSON(str) {
            try {
                const parsed = JSON.parse(str);
                // Ensure the result is an object or array (valid JSON)
                return typeof parsed === 'object' && parsed !== null;
            } catch (e) {
                return false;
            }
        },
        formatAmount(value, type) {
            if (value === null || value === undefined) {
                return 'Loading...';
            }

            value = Number(value);
            if (isNaN(value)) {
                console.error("Invalid value:", value);
                return '';
            }

            if (type === "$") {
                value = value.toFixed(2);
            } else if (type === "%") {
                value = value.toFixed(1);
            } else if (type === "qty") {
                value = value.toFixed(0);
            }

            const parts = value.toString().split(".");
            const numberPart = parts[0];
            const decimalPart = parts[1];

            const thousands = /\B(?=(\d{3})+(?!\d))/g;
            const formattedNumber = numberPart.replace(thousands, ",");

            return formattedNumber + (decimalPart ? "." + decimalPart : "");
        },
        showNotify(type, message) 
        {
            if(type == "negative")
            {
                Notify.create({
                    group: 'my-group',
                    type: type,
                    message: message,
                    html: true,
                    timeout: 99999999999,
                    position: 'top',
                    actions: [
                        { icon: 'close', color: 'white', round: true, handler: () => { /* ... */ } }
                    ],
                    badgeStyle: "opacity: 0",
                })
            }

            if(type == "positive")
            {
                Notify.create({
                    group: 'my-group',
                    type: type,
                    message: message,
                    html: true,
                    timeout: 1000,
                    position: 'top',
                    badgeStyle: "opacity: 0",

                })
            }

            if(type == "info")
            {
                    Notify.create({
                    type: type,
                    message: message,
                    timeout: 99999999,
                    position: 'top',
                    badgeStyle: "opacity: 0",
                    html: true,
                    actions: [
                        { label: 'OK', color: 'white', round: true, handler: () => { } }
                    ]
                })
            }
        },
    },
}
</script>

<style scoped>
.custom_button
{
  font-size: 14px;
  background-color: #273655;
  color: white;
  margin-left: 5px;
  padding: 0px 10px;
}

.action_button
{
  font-size: 14px;
  background-color: #e37a05;
  color: white;
  margin-left: 5px;
  padding: 0px 10px;
}

.confirm_title {
    color: #FFF;
    text-align: center;
    font-family: InterfontSemiBold;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
}

.confirmation_line_font {
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    font-family: InterfontMedium;
}
</style>