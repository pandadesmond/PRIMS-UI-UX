<!-- Status: putting labels in nodes (achieved) + tooltip (need more time to research) -->
<template>
    <q-card class="my_card">
        <q-card-section v-if="json_container.title">
          <div class="row justify-between">
            <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 text-h6 custom_font" style="font-size: 18px;">
              <span @click="handleClickTitle" class="custom_title">{{json_container.title}}</span>
            </div>
            <div dir="rtl" class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">

                <q-icon v-if="json_container.info" class="info_icon" name="info" @click="goInfo()">
                  <q-tooltip  anchor="top middle" self="bottom middle">
                    <span class="custom_tooltip">{{json_container.info}}</span>
                  </q-tooltip>
                </q-icon>

                <q-icon v-if="json_container.export" class="export_icon" name="mdi-export" @click="goExport">
                    <q-tooltip  anchor="top middle" self="bottom middle">
                        <span class="custom_tooltip">{{json_container.export}}</span>
                        {{ json_container.export }}
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

                <!-- info -->
                <div class="row" v-if="show_info == true">
                    <q-dialog v-model="show_info">
                      <q-card style="width: 700px; max-width: 80vw;">
                          <q-card-section style="background-color:#362e4b" class="row items-center q-pb-none">
                            <div class="text-h6 text-white">{{json_container.title1}}</div>
                          <q-space />
                          <!-- <q-btn class="text-white" icon="close" flat round dense v-close-popup /> -->
                        </q-card-section>

                        <q-separator color="black" />

                        <q-card-section>

                <!--info-->
                <q-form ref="filter_form">
                      <div class="row">
                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
                <!--message-->
                <div class="row line_break">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" style="padding-top: 17px;">
                    <span v-html="json_container.message" />
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
                </div>
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
      <q-card-section>
           
            <div v-if="chart">
                <!-- Checkbox and chips -->

                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-7 col-lg-7 col-xl-7">
                        <q-checkbox v-model="d3ForceEnabled" color="indigo-10" label="Floating enabled" /> 
                        <!-- <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 q-ml-sm q-mt-sm text-justify protip-box">
                            <span>
                                <q-icon name="lightbulb" size="sm" color="indigo-10" />
                                <b>ProTip!</b> Upon first rendering, untick and tick the 'Floating enabled' checkbox to get a more readable graph layout
                            </span>
                        </div> -->
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5 col-xl-5">
                        <div class="col-3">
                            <q-chip square icon="mouse" class="float-right">Use mouse wheel to zoom in/out</q-chip>
                            <q-chip square icon="pan_tool_alt" class="float-right">Click and hold to drag the background</q-chip>
                        </div>
                    </div>
                </div>

                <!-- <div class="col">
                     <div class="row">
                         <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <div class="col-4">
                                <q-checkbox v-model="d3ForceEnabled" color="indigo-10" label="Floating enabled" /> 
                                <div class="col-3 q-ml-sm q-mt-sm">
                                    <span><b>Pro Tip!</b> Upon first rendering, click and unclick the floating checkbox to get a more readable graph layout</span>
                                </div>
                            </div>
                            <q-chip square icon="mouse" class="float-right">Use mouse wheel to zoom in/out</q-chip>
                         </div>
                     </div>
                     <div class="row">
                         <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                             
                             <div class="col-4">
                                 <q-chip square icon="pan_tool_alt" class="float-right">Click and hold to drag the background</q-chip>
                            </div>
                        </div>
                     </div>
                     
                </div> -->
     
                <!-- Legend starts here -->
                <div class="col q-my-md q-mr-lg">
                 <div class="col">
                     <div class="row wrap items-center">
                         <!-- <span class="text-weight-medium text-grey-9 q-ml-sm">Legend:</span> -->
                         <div class="row items-center">
                             <div class="dots pale-yellow q-mx-sm"></div> 
                             <span class="text-grey-9 q-mr-sm">0.00 - 2.00</span>
                         </div>
         
                         <div class="row items-center">
                             <div class="dots light-yellow q-mx-sm"></div> 
                             <span class="text-grey-9 q-mr-sm">2.01 - 4.00</span>
                         </div>
         
                         <div class="row items-center">
                             <div class="dots yellow q-mx-sm"></div> 
                             <span class="text-grey-9 q-mr-sm">4.01 - 6.00</span>
                         </div>
         
                         <div class="row items-center">
                             <div class="dots light-orange q-mx-sm"></div> 
                             <span class="text-grey-9 q-mr-sm">6.01 - 8.00</span>
                         </div>
         
                         <div class="row items-center">
                             <div class="dots orange q-mx-sm"></div> 
                             <span class="text-grey-9 q-mr-sm">8.01 - 10.00</span>
                         </div>
         
                         <div class="row items-center">
                             <div class="dots red q-mx-sm"></div> 
                             <span class="text-grey-9 q-mr-sm">10.01 - 12.00</span>
                         </div>
         
                         <div class="row items-center">
                             <div class="dots dark-red q-mx-sm"></div> 
                             <span class="text-grey-9 q-mr-sm">12.01 and above</span>
                         </div>
     
                         <q-separator vertical />
     
                         <span class="text-weight-medium text-grey-9 q-ml-sm">Arrows' size:</span>
     
                         <!-- Slider starts here -->
                         <div class="col q-ml-sm">
                             <div class="row q-ml-sm">
                                 <q-slider
                                     v-model="json_container.configs.edge.normal.width"
                                     :min="1"
                                     :max="10"
                                     :step="1"
                                     :disable="isDisabled"
                                     @click="isSliderDisabled"
                                     snap
                                     label
                                     color="indigo-10"
                                 />
                             </div>
                         </div>
                         <!-- Slider ends here -->
     
                     </div>
                 </div>
                </div>
                <!-- Legend ends here -->
     
                <!-- Chart starts here -->
                 <div style="height: 550px">
                    <v-network-graph
                         ref="graph"
                         :nodes="json_container.nodes"
                         :edges="json_container.edges"
                         :configs="json_container.configs"
                         :zoom-level="zoomLevel"
                         :event-handlers="eventHandlers"
                     >
                     
                         <!-- Labels in node -->
                         <template v-if="labelInNode"
                             #override-node-label="{
                                 scale, text //nodeId, //x, y, config, textAnchor, dominantBaseline
                             }"
                             >
     
                             <!-- apply break-all to labels inside nodes -->
                             <!-- <foreignObject
                                 :width="80 * scale" 
                                 :height="50 * scale" 
                                 :x="-30 * scale" :y="-25 * scale"
                                 :font-size="11 * scale"
                                 text-align="center"
                                 fill="#fff">
                                 <div 
                                     class="custom-label" 
                                     :style="{ zoom: `${scale * 100}%` }" 
                                     xmlns="http://www.w3.org/1999/xhtml">
                                     {{ text }}
                                 </div>
                             </foreignObject> -->
                                 <!-- <div> -->
                                     <text
                                         x="0"
                                         y="0"
                                         :font-size="13 * scale"
                                         text-anchor="middle"
                                         dominant-baseline="central">
                                         {{ concatName(text) }}
                                     </text> 
                                 <!-- </div> -->
                         </template>
     
                     </v-network-graph>
                     
                     <!-- Tooltip -->
                     <div
                         ref="tooltip"
                         class="tooltip"
                         :style="{ ...tooltipPos, opacity: tooltipOpacity }"
                     >
                         <div v-if="!json_container.nodes[targetNodeId]?.isRect">
                             {{ json_container.nodes[targetNodeId]?.label ?? "" }}
                         </div>
                         <div v-else>
                             {{ json_container.nodes[targetNodeId]?.name ?? "" }}
                         </div>
                     </div>
                </div>
             <!-- Chart ends here -->
            </div>

        <q-icon v-if="!chart" name="warning" size="30px"/><span v-if="!chart" class="q-pa-md">No Data Available</span>

      </q-card-section>
      <Loading v-if="hide_loading" :loading="loading" />
    </q-card>

</template>

<script>
import { ref, computed } from "vue"
import * as vNG from "v-network-graph"
import Button from 'src/components/CRMDASH/Base/Button'
import Loading from 'src/components/Base/Loading';
import Datepicker from 'src/components/CRMDASH/Base/Datepickers/Datepicker'

import {
  ForceLayout,
} from "v-network-graph/lib/force-layout"

const currentdate = new Date();
const year = currentdate.getFullYear();
var month = ('0' + ('0' + (currentdate.getMonth()+1)).slice(-2)).slice(-2);
const min_year = (year-3)+"/01";
const max_year = year+"/"+month;

const downloadDateTime = currentdate.toLocaleString();

export default {
    props: ['zoomLevel', 'json', 'labelInsideNode', 'forceLoading', 'hide_loading', 'chart'],
    setup(){
        return {
            d3ForceEnabled: ref(true),
            tooltipOpacity: ref (0), // 0 or 1
            left: '0px',
            top: '0px',
            graph: ref(import('v-network-graph').VNetworkGraphInstance),
            isDisabled: ref(true)
        }
    },
    data(){
        // event handlers for tooltip on node
        const eventHandlers = {
            "node:pointerover": ({ node, event }) => {
                this.left = event.offsetX
                this.top = event.offsetY

                this.targetNodeId = node
                this.tooltipOpacity = 1 // show
            },
            "node:pointerout": _ => {
                this.tooltipOpacity = 0 // hide
            },
            "node:dragstart": _ => {
                this.tooltipOpacity = 0
            },
        }
        return {
            json_container: this.json,
            eventHandlers,
            nodes: this.json.nodes,
            // edges: this.json.arrows,
            // configs: this.json.configs,
            labelInNode: this.labelInsideNode,
            nodeid: '',
            show_map_dialog: false,
            loading: true,
            show_filter: false,
            show_info: false,
            min_year: min_year,
            max_year:max_year,
            filter_date: '',
            filter_date1: '',
            

            // tooltip related
            targetNodeId: "",
            tooltipPos: {
                left: '',
                top: ''
            },

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
        // this.loaded();
    },
    components: {
        Button,
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
        goInfo() {
            this.show_info = true
            // this.show_map_dialog = true
        },
        goExport() {
            if (!this.graph) return;
            const text = this.graph.getAsSvg();
            const url = URL.createObjectURL(new Blob([text], { type: "octet/stream" }));
            const a  = document.createElement("a");
            a.href = url;
            a.download = `Association Rules Chart - ${ downloadDateTime }.svg`; // filename
            a.click();
            window.URL.revokeObjectURL(url);
            this.$emit('Export');
        },
        goFilter() {
            this.show_filter = true
            this.$emit('Filter');
        },
        concatName(x) {
            var item = x.length > 20 ? x.substring(0,20) + '..' : x;
            return item
        },
        downloadAsSvg() { // try/
            if (!this.graph) return;
            const text = this.graph.getAsSvg();
            const url = URL.createObjectURL(new Blob([text], { type: "octet/stream" }));
            const a  = document.createElement("a");
            a.href = url;
            a.download = "association-rules-chart.svg"; // filename
            a.click();
            window.URL.revokeObjectURL(url);
        },
        handleClickTitle() {
            this.$emit('receiveClick');
        },
        isSliderDisabled(){
            (this.json.nodes.length == 0) ? this.isDisabled = true : this.isDisabled = false
        }
    },
    watch: {
        // 'Floating enabled' checkbox
        d3ForceEnabled(newVal) {
            (newVal == true) ? this.json_container.configs.view.layoutHandler = new ForceLayout() 
            : this.json_container.configs.view.layoutHandler = new vNG.SimpleLayout()
        },

        // update tooltip position
        tooltipOpacity() {
            this.tooltipPos = {
                left: this.left - 60 + 'px',
                top: this.top + 100 + 'px'
            }
        },

        // graph() {
        //     console.log('here');
        //     (this.json.nodes.length == 0) ? this.isDisabled = true : this.isDisabled = false
        // },

        // json(newVal){
        //     console.log('here');
        //     this.json_container = newVal;
        //     this.loading = false;
        // },

        forceLoading(newVal){
            if(newVal){
                this.loading = true;
            }
        }
    },
    updated(){
        this.isSliderDisabled()
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
    color: #51486c;
    cursor: pointer;
    font-size: 18px;
}

.export_icon
{
    color: #51486c;
    cursor: pointer;
    font-size: 18px;
}

.info_icon
{
    color: #51486c;
    cursor: pointer;
    font-size: 18px;
}

.back_icon
{
    color: #51486c;
    cursor: pointer;
    font-size: 18px;
}

.custom_tooltip
{
    font-size: 16px;
}

.chart {
  width: 100%;
  height: 500px;
}

.tooltip-wrapper {
  position: relative;
}
.tooltip {
  top: 0;
  left: 0;
  opacity: 0;
  position: absolute;
  padding: 10px;
  text-align: center;
  font-size: 12px;
  background-color: #fff0bd;
  border: 1px solid #ffb950;
  box-shadow: 2px 2px 2px #aaa;
  transition: opacity 0.2s linear;
  /* border-radius: 5px; */
}
.a {
    word-break: break-all
}

.color {
    color: #51486c !important;
}

/* .graph {
    position: relative;
    width: 50vw;
    height: 50vh;
    border: 1px solid #000;
} */

.circle {
  /* float: right; */
  height: 40px;
  width: 40px;
  clear: both;
  border-radius: 50%;
}

.dots {
  height: 12px;
  width: 12px;
  clear: both;
  border-radius: 50%;
}
.dark-red {
  background-color: #b40000;
}

.red {
  background-color: #ff1919;
}

.orange {
  background-color: #ff5029;
}

.light-orange {
  background-color: #ff8a30;
}

.yellow {
  background-color: #febc3b;
}

.light-yellow {
  background-color: #face76;
}

.pale-yellow {
  background-color: #ffdf9e;
}

*>>>thead>tr>th {
    background-color: #2f3a4d;
    color: white;
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

.line_break {
  white-space: pre-wrap;
}

.protip-box {
    border: 3px dashed #b6b4b4; 
    border-radius: 7px; 
    padding: 5px;
    margin-bottom: 5px
}
</style>