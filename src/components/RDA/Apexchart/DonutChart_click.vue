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

     <q-icon v-if="json_container.hide" class="hide_icon" name="expand_less" @click="goHide">
      <q-tooltip  anchor="top middle" self="bottom middle">
       <span class="custom_tooltip">{{json_container.hide}}</span>
      </q-tooltip>
     </q-icon>

     <!-- layout and header info -->
     <div class="row" v-if="show_info == true">
      <q-dialog v-model="show_info" persistent>
       <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section style="background-color:#362e4b" class="row items-center q-pb-none">
         <div class="text-h6 text-white">{{json_container.title1}}</div>
          <q-space/>
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

<q-separator />

 <div class="row float-right">
  <q-chip square icon="pan_tool_alt" >Click for next level</q-chip>
 </div>
 <br/>
 <q-card-section :style="$q.screen.width >= 1366 ? '' : 'padding-left: 0px; padding-right: 0px;'">
  <apexchart ref="chart" style="cursor: pointer" @updated="animationEndhandler" @animationEnd="animationEndhandler" @dataPointSelection="dataPointSelectionHandler" :height="json_container.chartOptions.chart.height" :options="json_container.chartOptions" :series="json_container.series"></apexchart>
 </q-card-section>

 <Loading :loading="loading" />
</q-card>
</template>

<script>
import Loading from 'src/components/Base/Loading';
import Button_icon from 'src/components/CRMDASH/Base/Button_icon';

export default {
 name: 'DonutChart',
 props: ['json','forceLoading','forceLoading2','forceLoading3','forceLoadings', 'disables'],
 data(){
  return{
    json_container: this.json,
    loading: true,
    loadings: false, // show no loading at first time
    disable: false,
    show_info: false,
    previous:'',
    previous_row:'',
    old_categories:'',
    current_categories:''
 }
},
    
components:{
 Loading,
 Button_icon
},
computed: {
 dbComponentBehavior(){
  return this.$store.getters['dbComponentBehavior/byLanguage']('crm')
 },
},
    methods: {
        goFilter(newVal){
          this.$emit('Filter', newVal);
        },
        goExport(){
          this.loadings = false
          this.disable = false
          this.$emit('Export');
        },
        goInfo(){
          this.show_info = true
          this.$emit('Info');
        },
        goHide(){
            this.$emit('Hide');
        },
        dataPointSelectionHandler(event, chartContext, config){
            var row_index = config.seriesIndex;
            var column_index = config.dataPointIndex;
            var parameter = '';
            var row_data = chartContext.data.w.config.series;
            var column_data = row_data[column_index];
            // var field_data = chartContext.data.w.config.xaxis.categories;
            var field = chartContext.data.w.config.labels[column_index];
            var color = chartContext.w.globals.colors;
            var active = chartContext.w.globals.selectedDataPoints // will show selected buttton without returning back after second click

            if(active[0].length == 0){
              this.$refs.chart.toggleDataPointSelection(this.previous) // 0 is seriesIndex, this.previous is dataPointIndex
            }else{
              // when change in different selection parameter
              var x_categories = chartContext.w.globals.lastXAxis.categories
              this.current_categories = x_categories
              if(this.old_categories != this.current_categories){
                this.previous = ''
                this.previous_row = ''
              }
              // when click the same bar, no trigger
              if (this.previous === column_index && this.previous_row === row_index)
              return
              this.old_categories = x_categories
              this.previous = column_index
              this.previous_row = row_index
            }  
              var json = {};
              json.parameter = parameter;
              json.series_data = row_data;
              json.row_index = row_index;
              json.column_index = column_index;
              json.field = field;
              json.value = column_data;
              json.color = color;

              this.$emit('DonutChartClickHandle',json); 
        },

        animationEndhandler(){
         var _this = this;
          setTimeout(function(){
            _this.$emit('DonutChartAnimationHandle');
            _this.loading = false;
          },150);
        },

        handleClick(){
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
      this.$emit('edit_forceLoading3'); // change false then return back to true
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
    },
    updated(){
     var active = this.$refs.chart.chart.w.globals.selectedDataPoints
     var len = active[0]?.length // used for checking; if there's any error, it will stop before the '?'; else it will continue to read the length
     if (len == 1){ // if successfully read, will continur if condition
      this.$refs.chart.chart.w.globals.selectedDataPoints[0] = undefined // if this undefined, it will stop toggle the bar (means no dark color things in barchart)
     }
    },
}
</script>

<style scoped>
.custom_font{
  display: flex;
  align-items: center;
}
.custom_title{
  cursor: grab;
}
.filter_icon{
  /* padding-left: 10px; */
  color: #51486c;
  cursor: pointer;
  /* position: absolute; */
  font-size: 18px;
  /* right: 0;
  padding-right: 75px; */
}
.export_icon{
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
.hide_icon{
  /* padding-left: 10px; */
  color: #51486c;
  cursor: pointer;
  /* position: absolute; */
  font-size: 18px;
  /* right: 0;
  padding-right: 75px; */
}
.info_icon{
  /* padding-left: 10px; */
  color: #51486c;
  cursor: pointer;
  /* position: absolute; */
  font-size: 18px;
  /* right: 0;
  padding-right: 10px; */
}
.back_icon{
  /* padding-left: 40px; */
  color: #51486c;
  cursor: pointer;
  /* position: absolute; */
  font-size: 18px;
  /* right: 10%;
  top: 25%; */
  /* padding-right: 50px; */
}
.dialog_font{
  font-weight: bold;
  font-size: 15px;
}
.custom_tooltip{
  font-size: 16px;
}
.line_break {
  white-space: pre-wrap;
}
::v-deep .apexcharts-menu-item.exportCSV {
  display: none;
}
</style>

