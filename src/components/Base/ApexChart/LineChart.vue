<template>

    <apexchart @animationEnd="animationEndhandler" @dataPointSelection="dataPointSelectionHandler" :width="json_container.chartOptions.chart.width" :height="json_container.chartOptions.chart.height" :options="json_container.chartOptions" :series="json_container.series"></apexchart>
    <!-- {{json_container}} -->

</template>

<script>
export default {
    name: 'LineChart',
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

            this.$emit('LineChartClickHandle',json);
        },
        animationEndhandler()
        {
            this.$emit('LineChartAnimationHandle');
        }
    }
    
}
</script>

<style>
</style>
