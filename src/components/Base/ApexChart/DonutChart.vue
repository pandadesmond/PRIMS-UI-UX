<template>
    <q-card class="my_card">
        <q-card-section>
            <div class="text-h6 custom_font">
                {{json_container.title}}

                <q-icon v-if="json_container.info" class="info_icon" name="info" @click="goInfo">
                    <q-tooltip  anchor="top middle" self="bottom middle">
                        <span class="custom_tooltip">{{json_container.info}}</span>
                    </q-tooltip>
                </q-icon>
            </div>
        </q-card-section>
        <q-separator />

        <q-card-section>
            <apexchart @updated="animationEndhandler" @animationEnd="animationEndhandler" @dataPointSelection="dataPointSelectionHandler" :height="json_container.chartOptions.chart.height" :options="json_container.chartOptions" :series="json_container.series"></apexchart>
            <!-- {{json_container}} -->
        </q-card-section>

        <Loading :loading="loading" />
    </q-card>
</template>

<script>
import Loading from 'src/components/Base/Loading';

export default {
    name: 'DonutChart',
    props: ['json','forceLoading'],
    data () {
        return {
            json_container: this.json,
            loading: true,
        }
    },
    components:{
        Loading,
    },
    methods: {
        goInfo(){
          this.$emit('Info');
        },
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

            this.$emit('DonutChartClickHandle',json);
        },
        animationEndhandler()
        {
            var _this = this;
            setTimeout(function(){
                _this.$emit('DonutChartAnimationHandle');
                _this.loading = false;
            },150);
        },

      handleClick()
        {
          this.$emit("receiveClick")
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

.filter_icon
{
    padding-left: 10px;
    color: #51486c;
    cursor: pointer;
    position: absolute;
    right: 0;
    padding-right: 60px;
}

.export_icon
{
    padding-left: 10px;
    color: #51486c;
    cursor: pointer;
    position: absolute;
    right: 0;
    padding-right: 35px;
}

.info_icon
{
    padding-left: 10px;
    color: #51486c;
    cursor: pointer;
    position: absolute;
    right: 0;
    padding-right: 10px;
}

.custom_tooltip
{
    font-size: 16px;
}
</style>

