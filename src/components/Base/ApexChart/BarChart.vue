<template>

    <q-card class="my_card">
        <q-card-section>
            <div class="text-h6 custom_font" >

                <span @click="handleClickTitle" class="custom_title">{{json_container.title}}</span>

                <template v-if="json_ordering">
                    <q-btn @click="handleClick(options_details)" :key="options_details" v-for="options_details in json_ordering.order_options"
                    dense
                    :icon-right="options_details.current_order ? 'fas fa-sort-amount-down-alt' : 'fas fa-sort-amount-down' "
                    :label="options_details.key"
                    :class="json_ordering.key == options_details.key ? 'active_options':'ordering_button'"
                    no-caps
                    :outline="json_ordering.key == options_details.key ? false : true"
                    />

                    <!-- <q-btn-dropdown outline :label="'Sort By: '+'TotalSales'" style="border-radius: 0px;margin-left: 10px;">
                        <q-list>
                            <q-item clickable v-close-popup @click="onItemClick">
                            <q-item-section>
                                <q-item-label>Photos</q-item-label>
                            </q-item-section>
                            </q-item>

                            <q-item clickable v-close-popup @click="onItemClick">
                            <q-item-section>
                                <q-item-label>Videos</q-item-label>
                            </q-item-section>
                            </q-item>

                            <q-item clickable v-close-popup @click="onItemClick">
                            <q-item-section>
                                <q-item-label>Articles</q-item-label>
                            </q-item-section>
                            </q-item>
                        </q-list>
                    </q-btn-dropdown> -->

                </template>
                  <q-icon v-if="json_container.info" class="info_icon" name="info" @click="goInfo">
                    <q-tooltip  anchor="top middle" self="bottom middle">
                        <span class="custom_tooltip">{{json_container.info}}</span>
                    </q-tooltip>
                </q-icon>


            </div>
        </q-card-section>
        <q-separator />

        <q-card-section>
            <apexchart @updated="updatedhandler" @animationEnd="animationEndhandler" @dataPointSelection="dataPointSelectionHandler" :height="json_container.chartOptions.chart.height" :options="json_container.chartOptions" :series="json_container.series"></apexchart>
            <!-- {{json_container}} -->
        </q-card-section>

        <Loading :loading="loading" />

    </q-card>

<br/>

</template>

<script>
import Loading from 'src/components/Base/Loading';

const currentdate = new Date();
const year = currentdate.getFullYear();
var month = ('0' + ('0' + (currentdate.getMonth()+1)).slice(-2)).slice(-2);
const min_year = (year-3)+"/01";
const max_year = year+"/"+month;

export default {
    name: 'BarChart',
    props: ['json',"forceLoading","ordering"],
    data () {
        return {
            json_container: this.json,
            loading: true,
            json_ordering: this.ordering,
        }
    },
    components: {
        Loading,
    },
    methods: {
         goInfo()
        {
          this.$emit('Info');
        },
        dataPointSelectionHandler(event, chartContext, config)
        {
          // console.log('Config:', config)
          // console.log('ChartContext: ', chartContext)
            var row_index = config.seriesIndex;
            var column_index = config.dataPointIndex;
            var parameter = chartContext.data.w.config.series[row_index].parameter;
            var row_data = chartContext.data.w.config.series[row_index].data;
            var column_data = row_data[column_index];

            var field_data = chartContext.data.w.config.xaxis.categories;
            var field = field_data[column_index];

            var json = {};
            json.parameter = parameter;
            json.series_data = row_data;
            json.row_index = row_index;
            json.column_index = column_index;
            json.field = field;
            json.value = column_data;

            this.$emit('BarChartClickHandle',json);
        },
        animationEndhandler()
        {
            this.$emit('BarChartAnimationHandle');
            this.loading = false;
        },
        updatedhandler()
        {
            if(this.json_container.chartOptions.labels === undefined)
            {
                setTimeout(()=>{
                    this.$emit('BarChartAnimationHandle');
                    this.loading = false;
                },450);

                return;
            }

            var length = this.json_container.chartOptions.labels.length;

            if(length <= 1)
            {
                setTimeout(()=>{
                    this.$emit('BarChartAnimationHandle');
                    this.loading = false;
                },450);
            }
        },
        handleClick(newVal)
        {
            console.log(newVal);
            var key = newVal.key;
            var current_order = !newVal.current_order;

            newVal.current_order = current_order;

            this.json_ordering.key = key;
            this.json_ordering.order = current_order;

            this.$emit('BarChartDataOrdering');
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

@media all and (max-width: 1023px) {
/* CSS rules here for screens lower than 750px */
    .custom_font > button:nth-child(3)
    {
        margin-right: 20px;
    }
}

</style>
