<template>

    <apexchart @animationEnd="animationEndhandler" @click="dataPointSelectionHandler" :height="json_container.chartOptions.chart.height" :options="json_container.chartOptions" :series="json_container.series"></apexchart>
    <!-- {{json_container}} -->

</template>

<script>
export default {
    name: 'RadarChart',
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

                this.$emit('RadarChartClickHandle',json);
            }

        },
        animationEndhandler()
        {
            this.$emit('RadarChartAnimationHandle');
        }
    }
    
}
</script>

<style>
</style>

