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

    <Button_icon
      v-if="json_container.export"
      tooltip_message="export"
      :icon="'mdi-export'"
      class="export_icon"
      :flat="true"
      :font_color="'#51486c'"
      :color="'white'"
      :outline="false"
      :loading="loadings"
      :readonly="disable"
      size="11px"
      v-on:receiveClick="goExport">
    </Button_icon>

    <!-- layout and header info -->
    <div class="row" v-if="show_info == true">
     <q-dialog v-model="show_info">
      <q-card style="width: 700px; max-width: 80vw;">
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

 <div v-if="json_container.name == 'test'"></div>

 <div v-else class="text-bold" style="color: #51486c; padding-left: 31px; padding-top: 10px;">
  {{json_container.extra_title}}
  <br/>
  {{json_container.extra_title1}}
  <br/>
  {{json_container.extra_title2}} 
 </div>

 <q-card-section>
  <div v-if="json_container.title != '-'">
   <apexchart @updated="updatedhandler" @animationEnd="animationEndhandler" @click="dataPointSelectionHandler" :height="json_container.chartOptions.chart.height" :options="json_container.chartOptions" :series="json_container.series"></apexchart>
  </div>
  <div v-else>
   <q-icon name="warning" size="30px" style="padding-left: 15px; padding-bottom: 10px;"/><span class="q-px-md">No Data Available</span>
  </div>
 </q-card-section>

 <Loading :loading="loading" />
 </q-card>
 </template>

<script>
import Loading from 'src/components/Base/Loading';
import Button_icon from 'src/components/CRMDASH/Base/Button_icon';

const currentdate = new Date();
const year = currentdate.getFullYear();
var month = ('0' + ('0' + (currentdate.getMonth()+1)).slice(-2)).slice(-2);
const min_year = (year-3)+"/01";
const max_year = year+"/"+month;

export default {
 name: 'RadarChart',
 props: ['json', 'forceLoading','forceLoadings', 'disables'],
 data(){
  return{
   json_container: this.json,
   loading: true,
   loadings: false, // show no loading at first time
   disable: false,
   show_filter: false,
   show_info: false,
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
 Button_icon
},
computed: {
 dbComponentBehavior() {
  return this.$store.getters['dbComponentBehavior/byLanguage']('crm')
 },
},
methods: {
 goExport(){
  this.loadings = false
  this.disable = false
  this.$emit('Export');
},
goInfo(){
  this.show_info = true
  this.$emit('Info');
},
dataPointSelectionHandler(event, chartContext, config){
  var row_index = config.seriesIndex;
  var column_index = config.dataPointIndex;

  if((row_index >= 0) && (column_index >= 0)){
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

    this.$emit('RadarChartClickHandle',json);
 }
},
animationEndhandler(){
 this.$emit('RadarChartAnimationHandle');
 this.loading = false;
},
updatedhandler(){
if(this.json_container.series === undefined){
 setTimeout(()=>{
  this.$emit('RadarChartAnimationHandle');
  this.loading = false;
 },450);

return;
}

var length = this.json_container.series.length;

if(length <= 1){
 setTimeout(()=>{
  this.$emit('RadarChartAnimationHandle');
  this.loading = false;
 },450);
}
},
},
watch: {
 json(newVal){
  this.json_container = newVal;
  this.loading = false;
},
forceLoading(newVal){
 if(newVal){
  this.loading = true;
 }
},
forceLoadings(newVal){
 if(newVal){
  this.loadings = true;
 }else{
  this.loadings = false; // return false when done generating
 }
},
disables(newVal){
 if(newVal){
  this.disable = true;
 }else{
  this.disable = false; // return false when done generating
 }
}
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
 margin-top: 3px;
 margin-left: 2px;
 /* position: absolute; */
 /* font-size: 18px; */
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

