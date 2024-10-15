<!--Back icon show in this TreeMap-->

<template>
<!-- {{ loading }} -->
    <q-card class="my_card">
        <q-card-section v-if="json_container.title">
          <div class="row justify-between">
            <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 text-h6 custom_font">
              <span @click="handleClickTitle" class="custom_title">{{json_container.title}}</span>
            </div>
            <div dir="rtl" class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                <q-icon v-if="json_container.info" class="info_icon" name="info" @click="goInfo">
                  <q-tooltip  anchor="top middle" self="bottom middle">
                    <span class="custom_tooltip">{{json_container.info}}</span>
                  </q-tooltip>
                </q-icon>

                <q-icon v-if="json_container.filter" class="filter_icon" name="filter_list" @click="goFilter">
                    <q-tooltip  anchor="top middle" self="bottom middle">
                        <span class="custom_tooltip">{{json_container.filter}}</span>
                    </q-tooltip>
                </q-icon>

                <!-- filter -->
                    <div class="row" v-if="show_filter == true">
                    <q-dialog v-model="show_filter">
                      <q-card style="width: 700px; max-width: 80vw;">
                          <q-card-section style="background-color:#362e4b" class="row items-center q-pb-none">
                            <div class="text-h6 text-white">Filter</div>
                          <q-space />
                          <!-- <q-btn class="text-white" icon="close" flat round dense v-close-popup /> -->
                        </q-card-section>

                        <q-separator color="black" />

                        <q-card-section>

                <!--card with selection-->
                <q-form ref="filter_form">
                      <div class="row">
                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
                <!--select-->
                <!--Start date-->
                <div class="row">
                  <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4" style="padding-top: 17px;">
                    <span class="dialog_font">Start Date</span>
                  </div>
                      <div class="card_section col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                        <div class="component_div">
                        <Datepicker
                          :readonly="false"
                          :no_label="false"
                          :autoclose="autoclose"
                          :min_year="min_year"
                          :max_year="max_year"
                          v-on:receiveChange="handleChange"
                          :daterange="filter_date"
                          :componentBehavior="dbComponentBehavior.text" />
                      </div>
                </div>
                </div>

                <br />

                <!--End date-->
                <div class="row row_section">
                  <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4" style="padding-top: 17px;">
                    <span class="dialog_font">End Date</span>
                  </div>
                      <div class="card_section col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                        <div class="component_div">
                        <Datepicker
                          :readonly="false"
                          :no_label="false"
                          :autoclose="autoclose"
                          :min_year="min_year"
                          :max_year="max_year"
                          v-on:receiveChange="handleChange2"
                          :daterange="filter_date1"
                          :componentBehavior="dbComponentBehavior.text" />
                      </div>
                </div>
                </div>

                <br />

                <!--Generate button-->
                <div class="row row_section justify-end">
                        <div class="card_section col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2" >
                            <div class="component_div">
                            <Button
                            class="button_save text-black"
                            style="background-color:white"
                            :forceLoading="forceLoading"
                            v-close-popup
                            :text="'CANCEL'"
                            :type="'button'" />
                            </div>
                        </div>

                        <div class="card_section col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2" >
                            <div class="component_div">
                            <Button
                            class="button_save"
                            :forceLoading="forceLoading"
                            @click="generate"
                            :text="'GENERATE'"
                            :type="'button'" />
                            </div>
                        </div>
                </div>
                      </div>
                      </div>
                </q-form>
                        </q-card-section>
                      </q-card>
                    </q-dialog>
                    </div>
                <!-- end of filter -->

                <q-icon v-if="json_container.export" class="export_icon" name="mdi-export" @click="goExport">
                    <q-tooltip  anchor="top middle" self="bottom middle">
                        <span class="custom_tooltip">{{json_container.export}}</span>
                    </q-tooltip>
                </q-icon>

              <q-icon v-if="json_container.back == true" class="back_icon" name="fas fa-arrow-alt-circle-left" @click="goBack">
                 <q-tooltip  anchor="top middle" self="bottom middle">
                        <span class="custom_tooltip">back</span>
                  </q-tooltip>
              </q-icon>
            </div>
          </div>
         </q-card-section>

        <q-separator/>

        <q-card-section>
          <apexchart @updated="animationEndhandler" @dataPointSelection="dataPointSelectionHandler" :height="json_container.chartOptions.chart.height" :options="json_container.chartOptions" :series="json_container.series"></apexchart>
        </q-card-section>

        <Loading :loading="loading" />

    </q-card>
</template>

<script>
import { ref } from 'vue'
import Loading from 'src/components/Base/Loading';
import Datepicker from 'src/components/CRMDASH/Base/Datepicker'
import Button from 'src/components/CRMDASH/Base/Button'

const currentdate = new Date();
const year = currentdate.getFullYear();
var month = ('0' + ('0' + (currentdate.getMonth()+1)).slice(-2)).slice(-2);
const min_year = (year-3)+"/01";
const max_year = year+"/"+month;

export default {
  name: 'TreeMap',
  props: ["json", 'forceLoading', 'forceLoading2', 'forceLoading3', 'forceLoading4', 'forceLoading5'],
  data() {
    return {
      json_container: this.json,
      loading: true,
      show_filter: false,
      autoclose: true,
      min_year: min_year,
      max_year:max_year,
      filter_date: '',
      filter_date1: '',
      api_data:'',
    }
  },

    async created() {
        var currentdate = new Date();
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        this.filter_date = yyyy + '-' + mm + '-' + dd;
        this.filter_date1 = yyyy + '-' + mm + '-' + dd;
        this.loaded();
    },
    components:{
        Loading,
        Datepicker,
        Button
    },
    computed: {
     dbComponentBehavior() {
       return this.$store.getters['dbComponentBehavior/byLanguage']('erp')
      },
    },
  methods: {
    goFilter()
    {
      this.show_filter = true
      this.$emit('Filter');
    },
    generate(){
      // console.log(newVal)
      // alert('success')
this.$refs['filter_form'].validate().then(valid => {

      if (!valid) {
          this.showNotify('negative', 'Please make sure all the filter field is filled in.')
      } else {
          this.show_filter =false;
          // let temp_outlet = JSON.parse(JSON.stringify(this.outlet_selection));
          // let temp_cardstatus = JSON.parse(JSON.stringify(this.cardstatus_selection));
          // let temp_year = JSON.parse(JSON.stringify(this.year_selection));
          // let temp_month = JSON.parse(JSON.stringify(this.filter_month));
          let temp_date = JSON.parse(JSON.stringify(this.filter_date));
          let temp_date1 = JSON.parse(JSON.stringify(this.filter_date1));

          var payload_api = {
              "customer_guid": "EFC5E5ABFC4B11E99950DED0BD1483FD",
              // "outlet": temp_outlet,
              // "CardStatus": temp_cardstatus,
              // "year": temp_year,
              // "month": temp_month,
              "date": temp_date,
              "date1": temp_date1,
          };
          // console.log('year:', this.year_selection)
          console.log('generate_button:', payload_api)
          // this.forceLoading = true;
          // this.trigger_api(payload_api)
          //  this.goFilter()
          this.$emit('Filter');
      }
  })

    },
    loaded()
    {
    this.$nextTick(()=>{

    this.api_data={
      "filter_date": this.filter_date,
    }
    });
    },
    goExport()
    {
      this.$emit('Export');
    },

    goInfo(){
      this.$emit('Info');
    },

    goBack(){
        this.$emit('Back');
    },

    dataPointSelectionHandler(event, chartContext, config)
        {

          // alert("hi")
          // console.log("hi")
          // all see in config
          // console.log('Config:', config)
          // console.log('ChartContext: ', chartContext)
          // console.log('event: ', event)
          // console.log(this.json_container.back)
          // console.log(this.json_container)
          // console.log(chartContext.w.globals.colors)
          // console.log(chartContext.w.config.grid.padding.left)
          // console.log(chartContext.w.config.grid.padding)
            var row_index = config.seriesIndex;
            var column_index = config.dataPointIndex;
            var parameter = '';
            var row_data = chartContext.data.w.config.series;
            var column_data = row_data[column_index];

            var field = config.w.config.series[config.seriesIndex].data[config.dataPointIndex].x;
            var color = chartContext.w.globals.colors;
            var padding = chartContext.w.config.grid.padding;
            // var table = config.w.config.states.active.allowMltipleDataPointsSelection;

            var json = {};
            json.parameter = parameter;
            json.series_data = row_data;
            json.row_index = row_index;
            json.column_index = column_index;
            json.field = field;
            json.value = column_data;
            json.color = color;
            json.padding = padding;
            // json.table = table;
            this.$emit('TreeMapClickHandle',json);
            this.$emit('TreeMapClickHandle2',json);
        },

      animationEndhandler()
        {
            var _this = this;
            setTimeout(function(){
                _this.$emit('TreeMapAnimationHandle');
                _this.loading = false;
            },150);

        },

      handleClick(newVal)
        {
            this.$emit("receiveClick", newVal)
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
      },
      forceLoading2(newVal)
      {
        // console.log("forceLoading2");
          if(newVal)
          {
              this.loading = true;
              this.$emit('edit_forceLoading2'); // change false then return back to true
          }
      },
      forceLoading3(newVal)
      {
        // console.log(newVal);
          if(newVal)
          {
              this.loading = true;
              this.$emit('edit_forceLoading3'); // change false then return back to true
          }
      },
      forceLoading4(newVal)
      {
        // console.log(newVal);
          if(newVal)
          {
              this.loading = true;
              this.$emit('edit_forceLoading4'); // change false then return back to true
          }
      },
      forceLoading5(newVal)
      {
        // console.log(newVal);
          if(newVal)
          {
              this.loading = true;
              this.$emit('edit_forceLoading5'); // change false then return back to true
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
    cursor: pointer;
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

/* @media all and (max-width: 1023px) {
.back_icon
{
    padding-left: 40px;
    color: #51486c;
    cursor: pointer;
    position: absolute;
    font-size: 18px;
    right: 15%;
    top: 36%;
    padding-right: 50px;
}

} */
</style>
