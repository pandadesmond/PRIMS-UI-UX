<template>
    <q-card class="my_card">
        <q-card-section v-if="json_container.title">
          <div class="row justify-between">
            <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 text-h6 custom_font" style="font-size: 18px;">
              <span @click="handleClickTitle" class="custom_title">{{json_container.title}}</span>
            </div>
            <div dir="rtl" class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">

                <q-icon v-if="json_container.info" class="info_icon" name="info" @click="goInfo()">
                  <q-tooltip  anchor="top middle" self="bottom middle">
                    <span class="custom_tooltip">{{json_container.info}}</span>
                  </q-tooltip>
                </q-icon>

                <Button_icon
                  v-if="json_container.export"
                  :tooltip_message="json_container.export"
                  :icon="'mdi-export'"
                  class="export_icon"
                  :flat="true"
                  :font_color="color"
                  :color="'white'"
                  :outline="false"
                  size="11px"
                  v-on:receiveClick="goExport">
                </Button_icon>

                <!-- <q-icon v-if="json_container.export" class="export_icon" name="mdi-export" @click="goExport">
                    <q-tooltip  anchor="top middle" self="bottom middle">
                        <span class="custom_tooltip">{{json_container.export}}</span>
                    </q-tooltip>
                </q-icon> -->

                <q-icon v-if="json_container.filter" class="filter_icon" name="filter_list" @click="goFilter">
                    <q-tooltip  anchor="top middle" self="bottom middle">
                        <span class="custom_tooltip">{{json_container.filter}}</span>
                    </q-tooltip>
                </q-icon>

                <q-icon v-show="back == true && nodesLength == 0" class="back_icon q-mr-xs" name="fas fa-arrow-alt-circle-left" @click="goBack">
                 <q-tooltip anchor="top middle" self="bottom middle">
                        <span class="custom_tooltip">back</span>
                  </q-tooltip>
              </q-icon>

                <!-- info -->
                <div class="row" v-if="show_info == true">
                    <q-dialog v-model="show_info" persistent>
                      <q-card style="width: 700px; max-width: 80vw;">
                          <q-card-section style="background-color:#362e4b" class="row items-center q-pb-none">
                            <div class="text-h6 text-white">{{json_container.title1}}</div>
                          <q-space />
                          <q-btn class="text-white" icon="close" flat round dense v-close-popup />
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
                </div>
                </div>
                </q-form>
                        </q-card-section>
                      </q-card>
                    </q-dialog>
                    </div>
                <!-- end of info -->
              
            </div>
          </div>
         </q-card-section>
      <q-separator />
      <div style="padding-top: 19px;" class="q-px-md">
        <div v-if="nodesLength != 0">
           
        <!-- Checkbox and chips -->        
        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-7 col-lg-7 col-xl-7">
                <q-checkbox class="" v-model="d3ForceEnabled" color="indigo-10" label="Floating enabled" /> 
                <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 q-ml-sm q-mt-sm text-justify text-grey-10 protip-box">
                    <span>
                        <!-- <b>TIP</b> <br> Upon first rendering, untick and tick the 'Floating enabled' checkbox to get a more readable graph layout. -->
                        <b>TIP</b> <br> Click on a legend to filter based on color nodes (lift values).
                    </span>
                </div>
                <q-space />
            </div> 
            <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5 col-xl-5">
                <div class="col-3">
                    <q-chip square icon="mouse" class="float-right">
                        <div class="ellipsis">
                            {{ mouseWheel }}
                            <q-tooltip v-if="$q.screen.lt.sm">{{ mouseWheel }}</q-tooltip>
                        </div>
                    </q-chip>
                    <q-chip square icon="pan_tool_alt" class="float-right">
                        <div class="ellipsis">
                            {{ dragBackground }}
                            <q-tooltip v-if="$q.screen.lt.sm">{{ dragBackground }}</q-tooltip>
                        </div>
                    </q-chip>
                    <!-- <Button
                        class="button_save text-white float-right"
                        :forceLoading="forceLoading"
                        :text="'RESET CHART FILTER'"
                        @click="goBack"
                        :disable="back == true ? false : true"
                        :type="'button'" /> -->
                </div>
            </div>
        </div>
                
                <!-- Legend starts here -->
                <div class="col q-my-md q-mr-lg">
                    <div class="col">
                        <div class="row wrap items-center">
                            <!-- <span class="text-weight-medium text-grey-9 q-ml-sm">Lift:</span> -->
                            <div class="row items-center" v-if="json_container.liftIsHigher" @click="handleClickLegend('#fff19b', '0.00 - 2.00')">
                                <div class="dots pale-yellow q-mx-sm"></div>
                                <span class="text-grey-9 q-mr-sm" style="cursor:pointer">0.00 - 2.00</span>
                            </div>
                            
                            <div class="row items-center" @click="handleClickLegend('#ffd966', json_container.liftIsHigher ? '2.01 - 4.00' : '0.00000 - 0.20000')">
                                <div class="dots light-yellow q-mx-sm"></div>
                                <div v-if="json_container.liftIsHigher">
                                    <span class="text-grey-9 q-mr-sm" style="cursor:pointer">2.01 - 4.00</span>
                                </div>
                                <div v-else>
                                    <span class="text-grey-9 q-mr-sm" style="cursor:pointer">0.00000 - 0.20000</span>
                                </div>
                            </div>
                            
                            <div class="row items-center" @click="handleClickLegend('#febc3b', json_container.liftIsHigher ? '4.01 - 6.00' : '0.20001 - 0.40000')">
                                <div class="dots yellow q-mx-sm"></div>
                                <div v-if="json_container.liftIsHigher">
                                    <span class="text-grey-9 q-mr-sm" style="cursor:pointer">4.01 - 6.00</span>
                                </div>
                                <div v-else>
                                    <span class="text-grey-9 q-mr-sm" style="cursor:pointer">0.20001 - 0.40000</span>
                                </div>
                            </div>
                            
                            <div class="row items-center" @click="handleClickLegend('#ff8a30', json_container.liftIsHigher ? '6.01 - 8.00' : '0.40001 - 0.60000')">
                                <div class="dots light-orange q-mx-sm"></div> 
                                <div v-if="json_container.liftIsHigher">
                                    <span class="text-grey-9 q-mr-sm" style="cursor:pointer">6.01 - 8.00</span>
                                </div>
                                <div v-else>
                                    <span class="text-grey-9 q-mr-sm" style="cursor:pointer">0.40001 - 0.60000</span>
                                </div>
                            </div>
                            
                            <div class="row items-center" @click="handleClickLegend('#ff5029', json_container.liftIsHigher ? '8.01 - 10.00' : '0.60001 - 0.80000')">
                                <div class="dots orange q-mx-sm"></div>
                                <div v-if="json_container.liftIsHigher">
                                    <span class="text-grey-9 q-mr-sm" style="cursor:pointer">8.01 - 10.00</span>
                                </div>
                                <div v-else>
                                    <span class="text-grey-9 q-mr-sm" style="cursor:pointer">0.60001 - 0.80000</span>
                                </div>
                            </div>
            
                            <div class="row items-center" v-if="json_container.liftIsHigher" @click="handleClickLegend('#ff1919', '10.01 - 12.00')">
                                <div class="dots red q-mx-sm"></div>
                                <span class="text-grey-9 q-mr-sm" style="cursor:pointer">10.01 - 12.00</span>
                            </div>
            
                            <div class="row items-center" @click="handleClickLegend('#b40000', json_container.liftIsHigher ? '12.01 and above' : '0.80001 - 1.00000')">
                                <div class="dots dark-red q-mx-sm"></div>
                                <div v-if="json_container.liftIsHigher">
                                    <span class="text-grey-9 q-mr-sm" style="cursor:pointer">12.01 and above</span>
                                </div>
                                <div v-else>
                                    <span class="text-grey-9 q-mr-sm" style="cursor:pointer">0.80001 - 1.00000</span>
                                </div>
                            </div>

                            <q-separator vertical />
        
                            <span class="text-weight-medium text-grey-9 q-ml-sm">Arrows' size:</span>
        
                            <!-- Slider starts here -->
                            <div class="col q-ml-sm">
                                <div class="row q-mx-sm"> 
                                    <q-slider
                                        v-model="json_container.configs.edge.normal.width"
                                        :min="1"
                                        :max="10"
                                        :step="1"
                                        :disable="isDisabled"
                                        @click="isSliderDisabled"
                                        snap
                                        label
                                        label-always
                                        color="indigo-10"
                                    />
                                </div>
                            </div>
                            <!-- Slider ends here -->
                            <!-- style="background-color:'indigo-10'"-->
                            <q-separator vertical />
                            <Button
                                class="button_save text-white q-ml-sm"
                                :forceLoading="forceLoading"
                                :text="'RESET CHART FILTER'"
                                @click="goBack"
                                :disable="back == true ? false : true"
                                :type="'button'" />
                     </div>
                 </div>
                </div>
                <!-- Legend ends here -->
     
                <!-- Chart starts here -->
                <div style="height: 550px;">
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
                                <text
                                    x="0"
                                    y="0"
                                    :font-size="13 * scale"
                                    text-anchor="middle"
                                    dominant-baseline="central">
                                    {{ isLongName(text) }}
                                </text> 
                         </template>
     
                     </v-network-graph>

                     <div class="infoBox" v-if="showMessage">
                     <!-- <div class="infoBox" v-if="back"> -->
                        <div class="row text-grey-10">
                            <div>Currently showing:</div>
                        </div>
                        <br />
                        <div class="row">
                            <div class="info_dots q-mx-sm" :style="bg" /> 
                            <span class="text-grey-10">
                                {{ infoMessage }}
                            </span>
                        </div>
                    </div>
                     
                     <!-- Tooltip -->
                     <div
                         ref="tooltip"
                         class="tooltip"
                         :style="{ ...tooltipPos, opacity: tooltipOpacity }"
                         v-show="showTooltip"
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

               <!-- Table info -->
               <div class="row" v-if="show_table_info == true">
                    <q-dialog v-model="show_table_info" persistent>
                      <q-card style="width: 700px; max-width: 80vw;">
                          <q-card-section style="background-color:#362e4b" class="row items-center q-pb-none">
                            <div class="text-h6 text-white">{{json_container.infoTableTitle}}</div>
                          <q-space />
                          <q-btn class="text-white" icon="close" flat round dense v-close-popup />
                        </q-card-section>

                        <q-separator color="black" />

                        <q-card-section>

                <!--info-->
                <q-form ref="filter_form">
                      <div class="row">
                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
                <!--message-->
                <div class="row" >
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" style="padding-top: 17px;">
                    <q-table
                          hide-bottom
                          :columns="json_container.infoColumns"
                          :rows="infoRows"/>
                  </div>
                </div>
                <div class="row line_break">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" style="padding-top: 17px;">
                    <!-- <span v-html="json_container.message" /> -->
                  </div>
                </div>

                <br />
                </div>
                </div>
                </q-form>
                        </q-card-section>
                      </q-card>
                    </q-dialog>
                    </div>
                <!-- end of table info -->

        </div>

        <div v-else>
            <q-icon name="warning" size="30px" style="padding-left: 15px; padding-bottom: 10px;"/><span class="q-px-md">No Data Available</span>
            <!-- <q-icon name="warning" size="30px"/><span class="q-pa-md">No Data Available</span> -->
        </div>

      </div>
      <Loading v-if="hide_loading" :loading="loading" />
    </q-card>

</template>

<script>
import { ref } from "vue"
import * as vNG from "v-network-graph"
import Button from 'src/components/CRMDASH/Base/Button'
import Loading from 'src/components/Base/Loading';
import Button_icon from 'src/components/CRMDASH/Base/Button_icon';
import Datepicker from 'src/components/CRMDASH/Base/Datepickers/Datepicker'
import { Notify } from "quasar";
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
            showTooltip: ref(true),
            left: '0px',
            top: '0px',
            graph: ref(import('v-network-graph').VNetworkGraphInstance),
            isDisabled: ref(true),
            back: ref(false),
            showMessage: ref(false)

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
                this.showTooltip = true
            },
            "node:pointerout": _ => {
                this.tooltipOpacity = 0 // hide
                this.showTooltip = false
            },
            "node:dragstart": _ => {
                this.tooltipOpacity = 0
                this.showTooltip = false
            },
            "node:click": ({ node }) => {
                if (!this.json_container.nodes[node].isRect){
                    // console.log('value');
                    this.show_table_info = true
                    this.infoRows = [
                        {
                            "antecedents": this.json_container.nodes[node].antecedents,
                            "consequents": this.json_container.nodes[node].consequents,
                            "support": this.json_container.nodes[node].support,
                            "lift": this.json_container.nodes[node].lift
                        }
                    ]
                }
            }
        }
        return {
            json_container: this.json,
            nodes: {},
            edges: {},
            nodesFiltered: {},
            edgesFiltered: {},
            eventHandlers,
            labelInNode: this.labelInsideNode,
            nodeid: '',
            show_map_dialog: false,
            loading: true,
            show_filter: false,
            show_info: false,
            show_table_info: false,
            min_year: min_year,
            max_year:max_year,
            filter_date: '',
            filter_date1: '',
            mouseWheel: "Use mouse wheel to zoom in/out",
            dragBackground: "Click and hold to drag the background",
            infoRows: [],
            color: '#51486c',
            // showMessage: this.json.showMessage,
            colorDot: '',
            isFiltered: false,

            // tooltip related
            targetNodeId: "",
            tooltipPos: {
                left: '',
                top: ''
            },
        }
    },
    async created() {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        this.filter_date = yyyy + '-' + mm + '-' + dd;
        this.filter_date1 = yyyy + '-' + mm + '-' + dd;
    },
    components: {
        Button,
        Loading,
        Button_icon
    },
    computed: {
        dbComponentBehavior() {
            return this.$store.getters['dbComponentBehavior/byLanguage']('erp')
        },
        nodesLength(){
            return Object.keys(this.json_container.nodes).length
        },
        bg() {
            return 'background-color: ' + this.colorDot
        },
    },
    methods: {
        goInfo() {
            this.show_info = true
        },

        goExport() {
            if (!this.graph) return;
            const text = this.graph.getAsSvg();
            const url = URL.createObjectURL(new Blob([text], { type: "octet/stream" }));
            const a  = document.createElement("a");
            a.href = url;
            a.download = `AssociationRulesChart - ${ downloadDateTime }.svg`; // filename
            a.click();
            window.URL.revokeObjectURL(url);
            this.$emit('Export');
        },

        isLongName(x) {
            var item = x.length > 20 ? x.substring(0,20) + '..' : x;
            return item
        },

        showNotify(type, message, time) {
            Notify.create({
                type: type,
                message: message,
                timeout: time,
                position: 'top',
            })
        },

        handleClickTitle() {
            this.$emit('receiveClick');
        },

        isSliderDisabled(){
            this.isDisabled = false
        },

        handleClickLegend(x, message) {
            // this.back = true;
            this.loading = true;
            this.isDisabled = true;
            this.checkNodes();

            var node = {}, edge = {};

            
            if (this.json_container.filterApplied){
                node = this.nodesFiltered
                edge = this.edgesFiltered
            } else {
                node = this.nodes
                edge = this.edges
            }

            let tempNodes = [], tempEdges = [], n = {}, link = {}, tempItem = [], item = {};
            // console.log(node);
            
            Object.keys(node).forEach((i) => {
                let color = node[i].color
                if (color == x){
                    tempNodes.push(i)
                    n[i] = JSON.parse(JSON.stringify(node[i]))
                }
            })

            Object.keys(edge).forEach((i) => {
                let source = edge[i].source,
                target = edge[i].target,
                len = tempNodes.length
                
                for (var j = 0; j < len; j++) {
                    if (source == tempNodes[j] || target == tempNodes[j]) {
                        tempItem.push(source)
                        tempItem.push(target)
                        tempEdges.push(i);
                        link[i] = JSON.parse(JSON.stringify(edge[i]))
                    }
                }
            })

            var uniqueItems = [...new Set(tempItem)]
            let len = uniqueItems.length
            
            for (var k = 0; k < len; k++) {
                var key = uniqueItems[k]
                item[key] = JSON.parse(JSON.stringify(node[key]))
            }

            if (Object.keys(item).length == 0 || Object.keys(link).length == 0){
                this.showNotify('negative', `There are no data for ${ message }.`, 2000)
            }
            else {
                this.back = true;
                this.showMessage = true;
                this.infoMessage = message;
                this.colorDot = x;
                this.json_container.nodes = item;
                this.json_container.edges = link;
            }
            this.loading = false;
            this.isDisabled = false;
        },
        goBack() {
            // console.log(this.json_container.filterApplied);
            if (this.json_container.filterApplied){
                this.json_container.nodes = this.nodesFiltered
                this.json_container.edges = this.edgesFiltered
            } else {
                this.json_container.nodes = this.nodes
                this.json_container.edges = this.edges
            }

            this.back = false;
            this.infoMessage = '';
            this.showMessage = false;
        },
        checkNodes() {
            if (this.json_container.filterApplied){
                if (Object.keys(this.nodesFiltered).length == 0) {
                    this.nodesFiltered = JSON.parse(JSON.stringify(this.json_container.nodes))
                    this.edgesFiltered = JSON.parse(JSON.stringify(this.json_container.edges))
                }
            } else {
                if (Object.keys(this.nodes).length == 0) {
                    this.nodes = JSON.parse(JSON.stringify(this.json.nodes))
                    this.edges = JSON.parse(JSON.stringify(this.json.edges))
                }
            }

            /* if (Object.keys(this.nodes).length == 0){
                this.nodes = JSON.parse(JSON.stringify(this.json.nodes))
                this.edges = JSON.parse(JSON.stringify(this.json.edges))
            } */
        }
    },
    watch: {
        // 'Floating enabled' checkbox
        d3ForceEnabled(newVal) {
            (newVal) ? this.json_container.configs.view.layoutHandler = new ForceLayout() 
            : this.json_container.configs.view.layoutHandler = new vNG.SimpleLayout()
        },

        // update tooltip position
        tooltipOpacity() {
            this.tooltipPos = {
                left: this.left - 90 + 'px',
                top: this.top + 200 + 'px'
            }
        },

        forceLoading(newVal){
            if (newVal) {
                this.loading = true;
                this.isDisabled = true;
            } else {
                this.isDisabled = false;
            } 
        },

        json: {
            immediate: true,
            deep: true,
            handler(newVal){

                if (newVal.reset){
                    this.nodesFiltered = {}
                    this.edgesFiltered = {}
                }
                
                if (newVal.filterApplied != this.isFiltered){
                    this.isFiltered = newVal.filterApplied
                    this.showMessage = false
                    this.back = false // disabled [RESET FILTER] button
                }
            }
        }

    },
    updated(){ 
        this.nodes = JSON.parse(JSON.stringify(this.json.nodes))
        this.edges = JSON.parse(JSON.stringify(this.json.edges))
        this.infoMessage = '';
        this.showMessage = false;
        this.back = false
    },
    mounted(){
        // this.nodes = JSON.parse(JSON.stringify(this.json.nodes))
        // this.edges = JSON.parse(JSON.stringify(this.json.edges))
        this.isDisabled = false;
        this.infoMessage = '';
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
  cursor: pointer;
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
  background-color: #ffd966;
  /* background-color: #face76; */
}

.pale-yellow {
  background-color: #fff19b;
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
    border: 5px #1a237e/*#b6b4b4*/; 
    border-style: none none none solid;
    /* border-radius: 5px;  */
    padding: 5px;
    padding-left: 10px;
    margin-bottom: 5px;
}

.infoBox { 
  position: absolute;
  inset: auto 20px 500px auto;
  margin-left: 10px;
  padding: 10px;
  /* background: #ffff0044; */
  /* background: #51486c70; */
  background: #5e585844;
  border-radius: 4px;
  font-size: 13px;
  /* font-family: monospace; */
  line-height: 11px;
  pointer-events: none;
  /* color: white; */
}
.info_dots {
  height: 12px;
  width: 12px;
  clear: both;
  border-radius: 50%;
  cursor: pointer;
  border-style: solid;
  border-color: #92898944;
  border-width: 3px;
}
.infoBox div {
  word-break: break-all;
}

</style>