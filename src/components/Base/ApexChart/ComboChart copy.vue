<template>
    <q-card class="my_card">
        <q-card-section v-if="json_container.title">
            <div class="text-h6 custom_font">
                <span @click="handleClickTitle" class="custom_title">{{json_container.title}}</span>
                <q-icon v-if="json_container.info" class="info_icon" name="info">
                    <q-tooltip  anchor="top middle" self="bottom middle">
                        <span class="custom_tooltip">{{json_container.info}}</span>
                    </q-tooltip>
                </q-icon>
            </div>
        </q-card-section>

        <template v-if="json_ordering">

            <!-- <q-btn @click="handleClick(options_details)" :key="options_details" v-for="options_details in json_ordering.order_options"
            
            :icon-right="options_details.current_order ? 'fas fa-sort-amount-down-alt' : 'fas fa-sort-amount-down' "
            :label="options_details.key"
            :class="json_ordering.key == options_details.key ? 'active_options':'ordering_button'"
            no-caps
            :outline="json_ordering.key == options_details.key ? false : false" 
            /> -->
            
            
             <q-btn @click="handleClick(options_details)" :key="options_details" v-for="options_details in json_ordering.order_options" 
             round 
             :class="json_ordering.key == options_details.key ? 'active_options':'ordering_button'"
             :icon="options_details.current_order ? 'fas fa-sort-amount-down-alt' : 'fas fa-sort-amount-down' ">
                <q-tooltip  anchor="top middle" self="bottom middle">
                    <span class="custom_tooltip">{{options_details.key  }}</span>
                </q-tooltip>
             </q-btn>
        </template>


        <q-separator v-if="json_container.title"/>

        <q-card-section>
            <apexchart @click="handleClick(options_details)" @animationEnd="animationEndhandler" @dataPointSelection="dataPointSelectionHandler" :width="json_container.chartOptions.chart.width" :height="json_container.chartOptions.chart.height" :options="json_container.chartOptions" :series="json_container.series"></apexchart>
            <!-- {{json_container}} -->
        </q-card-section>
        
        <Loading :loading="loading" />
        
    </q-card>
</template>

<script>
import Loading from 'src/components/Base/Loading';

export default {
    name: 'ComboChart',
    props: ["json","no_header","forceLoading","ordering"],
    data () {
        return {
            json_container: this.json,
            loading: true,
            json_ordering: this.ordering,
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
        animationEndhandler()
        {
            this.$emit('ComboChartAnimationHandle');
            this.loading = false;
        },
        handleClick(newVal)
        {
            console.log(newVal);
            var key = newVal.key;
            var current_order = !newVal.current_order;

            newVal.current_order = current_order;
            
            this.json_ordering.key = key;
            this.json_ordering.order = current_order;

            this.$emit('ComboChartDataOrdering');
        },
        handleClickTitle()
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

.custom_title
{
    cursor: pointer;
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

.ordering_button
{
    margin-left:10px;
    background-color: white;
    /* color: #2f3a4d;  */
    color: #5e72e4;
    border: 1px solid #5e72e4;
    /* border-radius: 0px; */
}

.active_options
{
    margin-left:10px;
    /* background-color: #2f3a4d; */
    background-color: #5e72e4;
    color: white; 
    /* border-radius: 0px; */
    /* border-left: 5px solid #00e396;  */
}
</style>
