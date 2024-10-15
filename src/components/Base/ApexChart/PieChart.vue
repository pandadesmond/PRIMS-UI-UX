<template>
    <q-card class="my_card">
        <q-card-section>
            <apexchart ref="demoChart" @updated="animationEndhandler" @animationEnd="animationEndhandler" @dataPointSelection="dataPointSelectionHandler" :height="json_container.chartOptions.chart.height" :options="json_container.chartOptions" :series="json_container.series"></apexchart>
            <!-- {{json_container}} -->
        </q-card-section>

        <Loading :loading="loading" />
    </q-card>
</template>

<script>
import Loading from 'src/components/Base/Loading';


export default {
    name: 'PieChart',
    props: ['json',"forceLoading"],
    data () {
        return {
            json_container: this.json,
            loading: true,
        }
    },

    components: {
        Loading
    },
    methods: {
        dataPointSelectionHandler(event, chartContext, config)
        {
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

            this.$emit('PieChartClickHandle',json);
        },
        animationEndhandler()
        {
            var _this = this;
            setTimeout(function(){
                _this.$emit('PieChartAnimationHandle');
                _this.loading = false;
            },150);

        },
        handleClickTitle()
        {
            this.$emit('receiveClick');
        }
    },
    watch: {
        json(newVal)
        {
            this.json_container = newVal;
            this.loading = false;
        },
        forceLoading(newVal)
        {
            if(newVal)
            {
                this.loading = true;
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
    cursor: grab;
}

.custom_title2
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
    cursor: grab;
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

.line_break {
  white-space: pre-wrap;
}
</style>
