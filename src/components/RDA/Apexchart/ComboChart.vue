<template>
 <q-card class="my_card">
  <q-card-section v-if="json_container.title">
   <div class="row justify-between">
    <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 text-h6 custom_font" style="font-size: 17px;">
     <span @click="handleClickTitle" class="custom_title">{{json_container.title}}</span>
    </div>

    <div dir="rtl" class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 q-pt-xs">

    <q-icon v-if="json_container.info" class="info_icon" name="info" @click="goInfo">
     <q-tooltip  anchor="top middle" self="bottom middle">
      <span class="custom_tooltip">{{json_container.info}}</span>
     </q-tooltip>
    </q-icon>

    <!-- <input type="file" ref="fileInput" @change="handleFileChange"> -->
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

    <q-icon v-if="json_container.filter" class="filter_icon" name="filter_list" @click="goFilter">
     <q-tooltip  anchor="top middle" self="bottom middle">
      <span class="custom_tooltip">{{json_container.filter}}</span>
      </q-tooltip>
    </q-icon>

    <!-- info -->
    <div class="row" v-if="show_info == true">
     <q-dialog v-model="show_info" persistent>
      <q-card style="width: 700px; max-width: 80vw;">
       <q-card-section style="background-color:#362e4b" class="row items-center q-pb-none line_break">
        <div class="text-h6 text-white" v-html="json_container.title1"></div>
         <q-space />
          <q-btn class="text-white" icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-separator color="black" />

        <q-card-section>

        <!--info-->
        <q-form ref="info_form">
         <div class="row">
         <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
        <!--message-->
        <div class="row line_break">
         <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" style="padding-top: 17px;">
          <span v-html="json_container.message" />
         </div>
        </div>

        <br/>
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

 <template v-if="json_ordering">
  <q-btn 
   @click="handleClick(options_details)" 
   :key="options_details" 
   v-for="options_details in json_ordering.order_options"
   dense
   :icon-right="options_details.current_order ? 'fas fa-sort-amount-down-alt' : 'fas fa-sort-amount-down' "
   :label="options_details.key"
   :class="json_ordering.key == options_details.key ? 'active_options':'ordering_button'"
   no-caps
   :outline="json_ordering.key == options_details.key ? false : true"
  />
 </template>

 <q-separator v-if="json_container.title"/>

 <q-card-section :style="$q.screen.width >= 1366 ? '' : 'padding-left: 0px; padding-right: 0px;'">
  <apexchart @click="handleClick(options_details)" @updated="updatedhandler" @animationEnd="animationEndhandler" @dataPointSelection="dataPointSelectionHandler" :width="json_container.chartOptions.chart.width" :height="json_container.chartOptions.chart.height" :options="json_container.chartOptions" :series="json_container.series"></apexchart>
 </q-card-section>

<Loading :loading="loading" />

</q-card>
</template>

<script>
import Loading from 'src/components/Base/Loading';
import Button_icon from 'src/components/CRMDASH/Base/Button_icon';

export default {
 name: 'ComboChart',
 props: ["json","no_header","forceLoading","forceLoading2","forceLoading3", "forceLoading4", "forceLoading5", "ordering",'forceLoadings', 'disables'],
 data(){
  return{
    json_container: this.json,
    loading: true,
    loadings: false, // show no loading at first time
    disable: false,
    json_ordering: this.ordering,
    show_info: false,
    api_data:'',
  }
 },
 components:{
   Loading,
   Button_icon
 },
 computed: {
   dbComponentBehavior() {
    return this.$store.getters['dbComponentBehavior/byLanguage']('crm')
   },
 },
methods: {
  goFilter(){
   this.$emit('Filter');
  },
  goExport(event) {
  this.loadings = false;
  this.disable = false

  // Check if a file is available
  if (this.file) {
    const fileSize = this.file.size;

    // Display the confirmation dialog
    if (confirm(`File size: ${fileSize} bytes. Are you sure you want to proceed with the export?`)) {
      // User clicked "OK" in the dialog, proceed with the export
      this.$emit('Export');
    }
  } else {
    // No file selected, directly trigger the export process
    this.$emit('Export');
  }
  },
  handleFileSelected(file) {
  // Store the selected file
  this.file = file;
  },
  goInfo(){
   this.show_info = true
   this.$emit('Info');
  },
  dataPointSelectionHandler(event, chartContext, config){
   var row_index = config.seriesIndex;
   var column_index = config.dataPointIndex;
   var parameter = chartContext.data.w.config.series[row_index].parameter;
   var row_data = chartContext.data.w.config.series[row_index].data;
   var column_data = row_data[column_index];

   var field_data = config.w.globals.labels.map((i) => {
    return config.w.config.xaxis.labels.formatter(i)
   });
   var field = field_data[column_index];

   var json = {};
   json.parameter = parameter;
   json.series_data = row_data;
   json.row_index = row_index;
   json.column_index = column_index;
   json.field = field;
   json.value = column_data;

   this.$emit('ComboChartClickHandle',json);
  },
  updatedhandler(){
   if(this.json_container.chartOptions.labels === undefined){
    setTimeout(()=>{
     this.$emit('ComboChartAnimationHandle');
     this.loading = false;
    },450);

   return;
   }

   var length = this.json_container.chartOptions.labels.length;

   if(length <= 1){
    setTimeout(()=>{
     this.$emit('ComboChartAnimationHandle');
     this.loading = false;
    },450);
   }
  },
  animationEndhandler(){
   this.$emit('ComboChartAnimationHandle');
   this.loading = false;
  },
  handleClick(newVal){
  // var key = newVal.key;
  // var current_order = !newVal.current_order;

  // newVal.current_order = current_order;

  // this.json_ordering.key = key;
  // this.json_ordering.order = current_order;

  this.$emit('ComboChartDataOrdering');
 },
 handleClickTitle(){
  this.$emit("receiveClick")
 }
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
 forceLoading2(newVal){
 if(newVal){
  this.loading = true;
  this.$emit('edit_forceLoading2'); // change false then return back to true
 }
 },
 forceLoading3(newVal){
 if(newVal){
  this.loading = true;
  // this.$emit('edit_forceLoading3'); // change false then return back to true
 }else{
  this.loading = false;
  // this.$emit('edit_forceLoading3');
 }
 },
 forceLoading4(newVal){
 if(newVal){
  this.loading = true;
  this.$emit('edit_forceLoading4'); // change false then return back to true
 }
 },
 forceLoading5(newVal){
 if(newVal){
  this.loading = true;
  this.$emit('edit_forceLoading5'); // change false then return back to true
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
.custom_font {
 display: flex;
 align-items: center;
}
.custom_title {
 cursor: grab;
}
.custom_title2 {
 cursor: pointer;
}
.filter_icon {
 /* padding-left: 10px; */
 color: #51486c;
 cursor: pointer;
 /* position: absolute; */
 font-size: 18px;
 /* right: 0;
 padding-right: 75px; */
}
.export_icon {
 /* padding-left: 10px; */
 color: #51486c;
 cursor: pointer;
 margin-top: 2px;
 margin-left: 2px;
 /* position: absolute; */
 /* font-size: 18px; */
 /* right: 0;
 padding-right: 35px; */
}
.info_icon {
 /* padding-left: 10px; */
 color: #51486c;
 cursor: pointer;
 /* position: absolute; */
 font-size: 18px;
 /* right: 0;
 padding-right: 10px; */
}
.back_icon {
 /* padding-left: 40px; */
 color: #51486c;
 cursor: pointer;
 /* position: absolute; */
 font-size: 18px;
 /* right: 10%;
 top: 25%; */
 /* padding-right: 50px; */
}
.custom_tooltip {
 font-size: 16px;
}
.ordering_button {
 margin-left:10px;
 /* background-color: #2f3a4d; */
 color: #2f3a4d;
 border-radius: 0px;
}
.active_options {
 margin-left:10px;
 background-color: #2f3a4d;
 color: white;
 border-radius: 0px;
 /* border-left: 5px solid #00e396;  */
}
.line_break {
  white-space: pre-wrap;
}
::v-deep .apexcharts-menu-item.exportCSV {
  display: none;
}
</style>
