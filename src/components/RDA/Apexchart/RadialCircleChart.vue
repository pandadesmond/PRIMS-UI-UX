<template>
 <apexchart @animationEnd="animationEndhandler" @dataPointSelection="dataPointSelectionHandler" :height="json_container.chartOptions.chart.height" :options="json_container.chartOptions" :series="json_container.series"></apexchart>
</template>

<script>
export default {
 name: 'RadialCircleChart',
 props: ['json'],
 data(){
  return{
   json_container: this.json,
  }
},
methods: {
 dataPointSelectionHandler(event, chartContext, config){
  var row_index = config.seriesIndex;
  var column_index = config.dataPointIndex;
  var parameter = '';
  var row_data = chartContext.data.w.config.series;
  var column_data = row_data[column_index];
  // var field_data = chartContext.data.w.config.xaxis.categories;
  var field = chartContext.data.w.config.labels[column_index];

  var json = {};
  json.parameter = parameter;
  json.series_data = row_data;
  json.row_index = row_index;
  json.column_index = column_index;
  json.field = field;
  json.value = column_data;

  this.$emit('RadialCircleChartClickHandle',json);
},
animationEndhandler(){
  this.$emit('RadialCircleChartAnimationHandle');
}
}

}
</script>

<style>
::v-deep .apexcharts-menu-item.exportCSV {
  display: none;
}
</style>

