<template>

    <apexchart @animationEnd="animationEndhandler" @dataPointSelection="dataPointSelectionHandler" :width="json_container.chartOptions.chart.width" :height="json_container.chartOptions.chart.height" :options="json_container.chartOptions" :series="json_container.series"></apexchart>
    <!-- {{json_container}} -->

</template>

<script>
export default {
    name: 'TimelineChart',
    props: ['json'],
    data () {
        return {
            json_container: this.json,
        }
    },
    methods: {
        dataPointSelectionHandler(event, chartContext, config)
        {
            var row_index = config.seriesIndex;
            var column_index = config.dataPointIndex;
            var parameter = chartContext.data.w.config.series[row_index].parameter;
            var row_data = chartContext.data.w.config.series[row_index].data;
            var column_data = row_data[column_index];

            var field = column_data.x;

            var json = {};
            json.parameter = parameter;
            json.series_data = row_data;
            json.row_index = row_index;
            json.column_index = column_index;
            json.field = field;
            json.value = column_data.y;

            this.$emit('TimelineChartClickHandle',json);
        },
        animationEndhandler()
        {
            this.$emit('TimelineChartAnimationHandle');
        }
    }
    
}
</script>

<style>
</style>
