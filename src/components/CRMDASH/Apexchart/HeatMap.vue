<template>
 <q-card class="my_card">
  <q-card-section v-if="json_container.title">
   <div class="row justify-between">
    <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 text-h6 custom_font" style="font-size: 17px;">
     <span @click="handleClickTitle" class="custom_title">{{json_container.title}}</span>
    </div>

   <div dir="rtl" class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
    <q-icon v-if="json_container.info" class="info_icon" name="info" @click="goInfo">
     <q-tooltip  anchor="top middle" self="bottom middle">
      <span class="custom_tooltip">{{json_container.info}}</span>
     </q-tooltip>
    </q-icon>

    <q-icon v-if="json_container.export" class="export_icon" name="mdi-export" @click="goExport">
     <q-tooltip  anchor="top middle" self="bottom middle">
      <span class="custom_tooltip">{{json_container.export}}</span>
     </q-tooltip>
    </q-icon>

    <q-icon v-if="json_container.filter" class="filter_icon" name="filter_list" @click="goFilter">
     <q-tooltip  anchor="top middle" self="bottom middle">
      <span class="custom_tooltip">{{json_container.filter}}</span>
     </q-tooltip>
    </q-icon>

    <!-- filter -->
    <div class="row" v-if="show_filter == true">
     <q-dialog v-model="show_filter">
      <q-card style="width: 700px; max-width: 80vw;">
       <q-card-section style="background-color:#362e4b" class="row items-center q-pb-none">
        <div class="text-h6 text-white">Filter</div>
        <q-space/>
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
           <br/>

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
             v-on:receiveChange="handleChange2"
             :daterange="filter_date1"
             :componentBehavior="dbComponentBehavior.text" />
           </div>
          </div>
         </div>
        <br/>
 
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
  <q-dialog v-model="show_info">
   <q-card style="width: 700px; max-width: 80vw;">
    <q-card-section style="background-color:#362e4b" class="row items-center q-pb-none">
     <div class="text-h6 text-white">{{json_container.title1}}</div>
      <q-space />
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
            :columns="json_container.info_map_columns"
            :rows="json_container.info_map_rows"/>
         </div>
        </div>
        <div class="row line_break">
         <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" style="padding-top: 17px;">
          <span v-html="json_container.message" />
         </div>
        </div>
        <br/>

        <!--Generate button-->
        <div class="row row_section justify-end">
         <div class="card_section col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2" >
          <div class="component_div">
           <Button
             class="button_save text-black full-width"
             style="background-color:white"
             :forceLoading="forceLoading"
             v-close-popup
             :text="'CLOSE'"
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
  <apexchart type="heatmap" height="450" @updated="updatedhandler" @animationEnd="animationEndhandler" @click="dataPointSelectionHandler" :options="json_container.chartOptions" :series="json_container.series"></apexchart>
 </q-card-section>

  <Loading v-if="hide_loading" :loading="loading" />
 </q-card>
</template>

<script>
import Loading from 'src/components/Base/Loading';
import Datepicker from 'src/components/CRMDASH/Base/Datepickers/Datepicker'
import Button from 'src/components/CRMDASH/Base/Button'

const currentdate = new Date();
const year = currentdate.getFullYear();
var month = ('0' + ('0' + (currentdate.getMonth()+1)).slice(-2)).slice(-2);
const min_year = (year-3)+"/01";
const max_year = year+"/"+month;

export default {
 name: 'HeatMap',
 props: ['json',"forceLoading","forceLoading2", "hide_loading", "ordering", "info_table"],
 data(){
 return {
    json_container: this.json,
    loading: true,
    json_ordering: this.ordering,
    show_filter: false,
    show_info: false,
    autoclose: true,
    min_year: min_year,
    max_year: max_year,
    filter_date: '',
    filter_date1: '',
    api_data: '',
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
  Button
 },
 computed: {
  dbComponentBehavior() {
    return this.$store.getters['dbComponentBehavior/byLanguage']('erp')
  },
 },
 methods: {
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
    dataPointSelectionHandler(event, chartContext, config) {
        var row_index = config.seriesIndex;
        var column_index = config.dataPointIndex;

        if((row_index >= 0) && (column_index >= 0))
        {
            var parameter = '';
            var row_data = chartContext.data.w.config.series[row_index];
            var column_data = row_data.data[column_index];

            var field_data = chartContext.data.w.config.xaxis.categories;
            var field = field_data[column_index];

            var json = {};
            json.parameter = parameter;
            json.series_data = row_data;
            json.row_index = row_index;
            json.column_index = column_index;
            json.field = field;
            json.value = column_data;

            this.$emit('HeatMapClickHandle',json);
        }

    },
    animationEndhandler() {
        this.$emit('HeatMapAnimationHandle');
        this.loading = false;
    },
    updatedhandler()
    {
        if(this.json_container.series === undefined)
        {
            setTimeout(()=>{
                this.$emit('HeatMapAnimationHandle');
                this.loading = false;
            },450);

            return;
        }

        var length = this.json_container.series.length;
        
        if(length <= 1)
        {
            setTimeout(()=>{
                this.$emit('HeatMapAnimationHandle');
                this.loading = false;
            },450);
        }
    }
 },
watch: {
    json(newVal) {
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

::v-deep .apexcharts-menu-item.exportCSV {
  display: none;
}
</style>
