<template>

    <q-card class="my_card">
        <q-card-section v-if="json_container.title">
            <div class="row justify-between">
            <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 text-h6 custom_font" style="font-size: 17px;">
                <span @click="handleClickTitle" class="custom_title">{{json_container.title}}</span>
            </div>
            <div dir="rtl" class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">

                <q-icon v-if="json_container.info" class="info_icon" name="info" @click="goInfo">
                    <q-tooltip  anchor="top middle" self="bottom middle">
                    <span class="custom_tooltip">{{json_container.info}}</span>
                    </q-tooltip>
                </q-icon>

                <Button_icon
                  v-if="json_container.export"
                  :tooltip_message="json_container.export"
                  :icon="'mdi-export'"
                  class="export_icon"
                  :flat="true"
                  :font_color="color"
                  :color="'white'"
                  :outline="false"
                  size="11px"
                  v-on:receiveClick="goExport">
                </Button_icon>

                <!-- <q-icon v-if="json_container.export" class="export_icon" name="mdi-export" @click="goExport">
                    <q-tooltip  anchor="top middle" self="bottom middle">
                        <span class="custom_tooltip">{{json_container.export}}</span>
                    </q-tooltip>
                </q-icon> -->

                <q-icon v-if="json_container.filter" class="filter_icon" name="filter_list" @click="goFilter">
                    <q-tooltip  anchor="top middle" self="bottom middle">
                        <span class="custom_tooltip">{{json_container.filter}}</span>
                    </q-tooltip>
                </q-icon>

                <q-icon v-if="json_container.hide" class="filter_icon" name="expand_less" @click="goHide">
                    <q-tooltip  anchor="top middle" self="bottom middle">
                        <span class="custom_tooltip">{{json_container.hide}}</span>
                    </q-tooltip>
                </q-icon>

                <!-- filter -->
                    <div class="row" v-if="show_filter == true">
                    <q-dialog v-model="show_filter">
                        <q-card style="width: 700px; max-width: 80vw;">
                            <q-card-section style="background-color:#362e4b" class="row items-center q-pb-none">
                            <div class="text-h6 text-white">Filter</div>
                            <q-space />
                            <!-- <q-btn class="text-white" icon="close" flat round dense v-close-popup /> -->
                        </q-card-section>

                        <q-separator color="black" />

                        <q-card-section>

                <!--card with selection-->
                <q-form ref="filter_form">
                        <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
                <!--select-->
                <!--Start date-->
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4" style="padding-top: 17px;">
                    <span class="dialog_font">Start Date</span>
                    </div>
                        <div class="card_section col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                        <div class="component_div">
                        <Datepicker
                            :readonly="false"
                            :no_label="false"
                            :autoclose="autoclose"
                            :min_year="min_year"
                            :max_year="max_year"
                            v-on:receiveChange="handleChange"
                            :daterange="filter_date"
                            :componentBehavior="dbComponentBehavior.text" />
                        </div>
                </div>
                </div>

                <br />

                <!--End date-->
                <div class="row row_section">
                    <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4" style="padding-top: 17px;">
                    <span class="dialog_font">End Date</span>
                    </div>
                        <div class="card_section col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                        <div class="component_div">
                        <Datepicker
                            :readonly="false"
                            :no_label="false"
                            :autoclose="autoclose"
                            :min_year="min_year"
                            :max_year="max_year"
                            v-on:receiveChange="handleChange"
                            :daterange="filter_date1"
                            :componentBehavior="dbComponentBehavior.text" />
                        </div>
                </div>
                </div>

                <br />

                <!--Generate button-->
                <div class="row row_section justify-end">
                        <div class="card_section col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2" >
                            <div class="component_div">
                            <Button
                            class="button_save text-black full-width"
                            style="background-color:white"
                            :forceLoading="forceLoading"
                            v-close-popup
                            :text="'CANCEL'"
                            :type="'button'" />
                            </div>
                        </div>

                        <div class="card_section col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2" >
                            <div class="component_div">
                            <Button
                            class="button_save full-width"
                            :forceLoading="forceLoading"
                            @click="generate"
                            :text="'GENERATE'"
                            :type="'button'" />
                            </div>
                        </div>
                </div>
                        </div>
                        </div>
                </q-form>
                        </q-card-section>
                        </q-card>
                    </q-dialog>
                    </div>
                <!-- end of filter -->

                <!-- info -->
                <div class="row" v-if="show_info == true">
                    <q-dialog v-model="show_info" persistent>
                        <q-card style="width: 60%; max-width: 80vw;">
                            <q-card-section style="background-color:#362e4b" class="row items-center q-pb-none">
                            <div class="text-h6 text-white">{{json_container.title1}}</div>
                            <q-space />
                            <q-btn class="text-white" icon="close" flat round dense v-close-popup />
                        </q-card-section>

                        <q-separator color="black" />

                        <q-card-section>

                <!--info-->
                <q-form ref="filter_form">
                        <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
                <!--message-->
                <div class="row" v-if="info_table == true">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" style="padding-top: 17px;">
                        <q-table
                            hide-bottom
                            :columns="json_container.info_columns"
                            :rows="json_container.info_rows"/>
                    </div>
                </div>
                <div class="row line_break">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" style="padding-top: 17px;">
                    <span v-html="json_container.message" />
                    </div>
                </div>

                <br />
                </div>
                </div>
                </q-form>
                        </q-card-section>
                        </q-card>
                    </q-dialog>
                    </div>
                <!-- end of info -->

                <q-icon v-if="json_container.back == true" class="back_icon" name="fas fa-arrow-alt-circle-left" @click="goBack">
                    <q-tooltip  anchor="top middle" self="bottom middle">
                        <span class="custom_tooltip">back</span>
                    </q-tooltip>
                </q-icon>
            </div>
            </div>
        </q-card-section>

        <q-separator/>

        <q-card-section>
            <div v-if="Object.keys(json_container.chartData).length != 0">
                <GChart 
                    type="BubbleChart" 
                    :data="json_container.chartData" 
                    :options="json_container.chartOptions"
                    :events="chartEvents"
                    ref="chart"
                    ></GChart>          
            </div>
            <div v-else>
                <q-icon name="warning" size="30px" style="padding-left: 15px; padding-bottom: 10px;"/><span class="q-px-md">No Data Available</span>
            </div>
        </q-card-section>

        <!-- data -->
        <div class="row" v-if="show_data == true">
                    <q-dialog v-model="show_data" persistent>
                        <q-card style="width: 80%; max-width: 80vw;">
                            <q-card-section style="background-color:#362e4b" class="row items-center q-pb-none">
                            <div class="text-h6 text-white">{{json_container.title2}}</div>
                            <q-space />
                            <q-btn class="text-white" icon="close" flat round dense v-close-popup />
                        </q-card-section>

                        <q-separator color="black" />

                        <q-card-section>

                <!--data-->
                <q-form ref="filter_form">
                        <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
                            <!--message-->
                            <div class="row line_break">
                                <!-- <div class="col-xs-12 col-sm-12 col-md-9 col-lg-9 col-xl-9" style="padding-top: 17px;"> -->
                                        <div class="col-xs-12 col-sm-12 col-md-9 col-lg-9 col-xl-9 q-ml-md">
                                            <span v-html="json_container.message2" />
                                        </div>
                                            <q-space />
                                        <div class="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2 q-ml-md">
                                            <q-btn
                                                color="primary"
                                                icon-right="archive"
                                                label="Export to csv"
                                                no-caps
                                                @click="goExportTable"
                                                :disable="gotRows"
                                            />
                                        </div>
                            </div>

                            <div class="row" v-if="data_table == true">
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" style="padding-top: 17px;">
                                    <Table_3_ori 
                                        style="height: 350 px;" 
                                        :row_per_page="row_per_page" 
                                        v-on:action="handleAction" 
                                        v-on:edit="handleEdit" 
                                        v-on:list="handleList" 
                                        v-on:delete="handleDelete" 
                                        v-on:RowClick="handleRowClicks" 
                                        @receiveChange="handleChange"
                                        :title="title" 
                                        :table_data="json_container.detail_rows" 
                                        :table_column="json_container.detail_columns" 
                                        :pass_class="pass_class_2" 
                                        :separator="separator_2" 
                                        :table_footer="table_footer" 
                                        :table_footer2="table_footer2" 
                                        :table_footer3="table_footer3" 
                                        :table_footer4="table_footer4" 
                                        :table_footer5="table_footer5" 
                                        :pagination-label="getPaginationLabel"
                                        :extra_title="json_container.extra_title"
                                        :extra_title1="json_container.extra_title1"
                                        :search_bar="json_container.search_bar"
                                        :round_off="json_container.round_off"
                                        :filter_info="json_container.filter_info"
                                        :filter_icon="json_container.filter_icon"
                                        :isStringHasComma= "json_container.isStringHasComma"
                                        :haveRowClick="haveRowClick"
                                        :state="json_container.state"/>

                                    <!-- <q-table
                                        :columns="json_container.detail_columns"
                                        :rows="json_container.detail_rows"
                                        :filter="filter">

                                        <template v-slot:top-left>
                                            <div class="row">
                                                <div class="text-bold">
                                                    <q-checkbox left-label v-model="change_value" label="'000" 
                                                        @update:model-value="handleChange" style="color: #51486c"/>
                                                </div>
                                            </div>
                                        </template>

                                        <template v-slot:top-right>
                                            <q-input filled borderless dense v-model="filter" placeholder="Search">
                                                <template v-slot:append>
                                                    <q-icon name="search"></q-icon>
                                                </template>
                                            </q-input>
                                        </template>
                                    </q-table> -->
                                </div>
                            </div>
                            
                            <br />
                        </div>
                    </div>
                </q-form>
                <Loading :loading="tableLoading" />
            </q-card-section>
        </q-card>
    </q-dialog>

    </div>
    <!-- end of info -->
    <Loading v-if="hide_loading" :loading="loading" />
</q-card>
</template>
    
<script>
import Loading from 'src/components/Base/Loading';
import Datepicker from 'src/components/CRMDASH/Base/Datepickers/Datepicker'
import Button from 'src/components/CRMDASH/Base/Button';
import Table_3_ori from 'src/components/CRMDASH/Base/Table/Table_3_ori'
import Button_icon from 'src/components/CRMDASH/Base/Button_icon';
import { GChart } from 'vue-google-charts'

const currentdate = new Date();
const year = currentdate.getFullYear();
var month = ('0' + ('0' + (currentdate.getMonth()+1)).slice(-2)).slice(-2);
const min_year = (year-3)+"/01";
const max_year = year+"/"+month;

export default {
    name: 'GBubbleChart',
    props: ['json',"forceLoading","forceLoading2", "hide_loading", "ordering", "info_table", "data_table", "tableLoading"],
    data () {
        return {
            json_container: this.json,
            isEmpty: false,
            chartEvents: {
                'click': ({ targetID }) => {
                    let text = targetID;
                    // console.log(targetID); //bubble#0#4

                    if (this.json_container.show_detail) {

                        // let result = text.indexOf("#");
                        let result = text.indexOf("bubble#");
                        // console.log(result);

                        if (result != -1) {
                            let chartName = this.json_container.chartName;
                            let payload = {}, segment = ''

                            if (chartName != "BubbleChart0"){
                                segment = this.json_container.segment
                                this.show_data = true
                            }
                            else {
                                let id = parseInt(text.substring(text.lastIndexOf("#") + 1));
                                segment = this.json_container.chartData[id+1][0]
                            }
                            
                            payload.text = text
                            payload.chart = chartName
                            payload.segment = segment
                            
                            this.$emit('ShowWho', payload);
                        }

                    }

                }, 
                'error': ({ id, message }) => {
                    new google.visualization.errors.removeError(id)
                }
            },
            loading: true,
            loading2: true,
            json_ordering: this.ordering,
            show_filter: false,
            show_info: false,
            show_data: false,
            autoclose: true,
            isDisabled: false,
            change_value: false,
            min_year: min_year,
            max_year: max_year,
            filter_date: '',
            filter_date1: '',
            api_data: '',
            filter: '',
            color: '#51486c',
        }
    },
    async created() {
        var currentdate = new Date();
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        this.filter_date = yyyy + '-' + mm + '-' + dd;
        this.filter_date1 = yyyy + '-' + mm + '-' + dd;
        // this.loaded();
    },
    components: {
        Loading,
        Datepicker,
        Button,
        Table_3_ori,
        GChart,
        Button_icon
    },
    computed: {
        dbComponentBehavior() {
            return this.$store.getters['dbComponentBehavior/byLanguage']('crm')
        },
        gotRows() {
            var length = (this.json_container.detail_rows?.data?.results)?.length
            return length != 0 ? false : true
        },
    },
    methods: {
        handleChange(newVal) {
            this.$emit('receiveChange', newVal, this.json_container.chartName)
        },

        goExport() {
            this.$emit('Export');
        },
        goInfo() {
            this.show_info = true
            this.$emit('Info');
        },
        goFilter() {
            this.show_filter = true
            this.$emit('Filter');
        },
        goHide(){
            this.$emit('Hide');
        },
        goExportTable(){
            this.$emit('ExportTable', this.json_container.chartName, this.json_container.title2)
        },
        generate() {
            this.$refs['filter_form'].validate().then(valid => {

                if (!valid) {
                    this.showNotify('negative', 'Please make sure all the filter field is filled in.')
                } else {
                this.show_filter =false;
                    let temp_date = JSON.parse(JSON.stringify(this.filter_date));
                    let temp_date1 = JSON.parse(JSON.stringify(this.filter_date1));

                    var payload_api = {
                        "customer_guid": "EFC5E5ABFC4B11E99950DED0BD1483FD",
                        // "outlet": temp_outlet,
                        // "CardStatus": temp_cardstatus,
                        // "year": temp_year,
                        // "month": temp_month,
                        "date": temp_date,
                        "date1": temp_date1,
                    };
                    // console.log('year:', this.year_selection)
                    console.log('generate_button:', payload_api)
                    // this.forceLoading = true;
                    // this.trigger_api(payload_api)
                    //  this.goFilter()
                    this.$emit('Filter');
                }
            })
        }
    },
    watch: {
        json(newVal) {
            this.change_value = true;
            this.json_container = newVal;
            this.loading = false;
        },
        forceLoading(newVal) {
            if(newVal)
            {
                this.loading = true;
            }
        },
        forceLoading2(newVal)
        {
            // console.log("forceLoading2");
            if(newVal)
            {
                this.loading = true;
                this.$emit('edit_forceLoading2'); // change false then return back to true
            }
        },
    }

}
</script>

<style scoped>

.custom_font
{
    display: flex;
    align-items: center;
}

.custom_title
{
    cursor: pointer;
}

.filter_icon
{
    /* padding-left: 10px; */
    color: #51486c;
    cursor: pointer;
    /* position: absolute; */
    font-size: 18px;
    /* right: 0;
    padding-right: 75px; */
}

.export_icon
{
    /* padding-left: 10px; */
    color: #51486c;
    cursor: pointer;
    /* position: absolute; */
    font-size: 18px;
    /* right: 0;
    padding-right: 35px; */
}

.info_icon
{
    /* padding-left: 10px; */
    color: #51486c;
    cursor: pointer;
    /* position: absolute; */
    font-size: 18px;
    /* right: 0;
    padding-right: 10px; */
}

.back_icon
{
    /* padding-left: 40px; */
    color: #51486c;
    cursor: pointer;
    /* position: absolute; */
    font-size: 18px;
    /* right: 10%;
    top: 25%; */
    /* padding-right: 50px; */
}

.custom_tooltip
{
    font-size: 16px;
}

.ordering_button
{
    margin-left:10px;
    /* background-color: #2f3a4d; */
    color: #2f3a4d;
    border-radius: 0px;
}

.active_options
{
    margin-left:10px;
    background-color: #2f3a4d;
    color: white;
    border-radius: 0px;
    /* border-left: 5px solid #00e396;  */
}

.dialog_separator
{
    padding-top: 10px;
}

.dialog_font
{
    font-weight: bold;
    font-size: 15px;
}

.line_break {
    white-space: pre-wrap;
}

*>>>thead>tr>th {
    background-color: #2f3a4d;
    color: white;
}

/* width */
.q-table__middle::-webkit-scrollbar {
    width: 10px;
    height: 10px;
}

/* Track */
.q-table__middle::-webkit-scrollbar-track {
    /* box-shadow: inset 0 0 5px grey;  */
    border-radius: 10px;
}

/* Handle */
.q-table__middle::-webkit-scrollbar-thumb {
    /* background: #8070d4; */
    background: #ababab;
    border-radius: 10px;
}

/* Handle on hover */
.q-table__middle::-webkit-scrollbar-thumb:hover {
    background: #ababab;
}

* >>> .q-table__middle::-webkit-scrollbar {
    width: 10px;
    height: 10px;
}

/* Track */
* >>> .q-table__middle::-webkit-scrollbar-track {
    /* box-shadow: inset 0 0 5px grey;  */
    border-radius: 10px;
}

/* Handle */
* >>> .q-table__middle::-webkit-scrollbar-thumb {
    /* background: #8070d4; */
    background: #ababab;
    border-radius: 10px;
}

/* Handle on hover */
* >>> .q-table__middle::-webkit-scrollbar-thumb:hover {
    background: #ababab;
}

@media all and (max-width: 1023px) {
/* CSS rules here for screens lower than 750px */
    .custom_font > button:nth-child(3)
    {
        margin-right: 20px;
    }
}

</style>
    