<!-- Status: putting labels in nodes (achieved) + tooltip (need more time to research) -->
<template>
    <q-card class="my_card">
        <q-card-section>
            <div class="text-h6 custom_font" >
                
                <span class="custom_title">{{ json.title }}</span>

          <q-icon class="export_icon" name="mdi-export" @click="goExport">
              <q-tooltip anchor="top middle" self="bottom middle">
                  <span class="custom_tooltip">{{ json.export }}</span>
              </q-tooltip>
          </q-icon>
          <q-icon class="info_icon" name="info" @click="goInfo(json)">
              <q-tooltip anchor="top middle" self="bottom middle">
                  <span class="custom_tooltip">{{ json.info }}</span>
              </q-tooltip>
          </q-icon>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
           
           <!-- Checkbox and chips -->
           <div class="col">
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <q-checkbox v-model="d3ForceEnabled" color="indigo-10" label="Floating enabled" /> 
                        <q-chip square icon="mouse" class="float-right">Use mouse wheel to zoom in/out</q-chip>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <q-chip square icon="pan_tool_alt" class="float-right">Hover the mouse over a node to display info</q-chip>
                    </div>
                </div>
           </div>

           <!-- Chart starts here -->
           <div style="height: 550px">
               <v-network-graph
                    :nodes="nodes"
                    :edges="edges"
                    :configs="configs"
                    :zoom-level="zoomLevel"
                    :event-handlers="eventHandlers"
                >

                <defs>
                    <!-- Cannot use <style> directly due to restrictions of Vue. -->
                    <component :is="style">
                    .custom-label {
                        width: 100%;
                        height: 100%;
                        display: grid;
                        place-content: center;
                        word-break: break-all;
                        pointer-events: none;
                        font-size: 11px;
                    }
                    </component>
                </defs>
                    <!-- Labels in node -->
                    <template v-if="labelInNode"
                        #override-node-label="{
                            scale, text, //nodeId, //x, y, config, textAnchor, dominantBaseline
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

                            <text
                                x="0"
                                y="0"
                                :font-size="11 * scale"
                                text-anchor="middle"
                                dominant-baseline="central"
                                fill="#fff">
                                    {{ text }}
                                </text
                            > 
                    </template>

                </v-network-graph>
                
                <!-- Tooltip -->
                <div
                    ref="tooltip"
                    class="tooltip"
                    :style="{ ...tooltipPos, opacity: tooltipOpacity }"
                >
                    <div>
                        {{ nodes[targetNodeId]?.name ?? "" }}
                    </div>
                </div>
           </div>

        <!-- Chart ends here -->
      </q-card-section>

    </q-card>

</template>

<script>
import { ref, computed } from "vue"
import * as vNG from "v-network-graph"
import {
  ForceLayout,
} from "v-network-graph/lib/force-layout"

export default {
    props: ['title', 'circle', 'arrows', 'config', 'zoomLevel', 'json', 'labelInsideNode'],
    setup(){
        return {
            d3ForceEnabled: ref(true),
            tooltipOpacity: ref (0), // 0 or 1
            left: '0px',
            top: '0px'
        }
    },
    data(){
        // event handlers for tooltip on node
        const eventHandlers = {
            "node:pointerover": ({ node, event }) => {
                // console.log('pointover');
                // console.log(event);
                this.left = event.offsetX
                this.top = event.offsetY

                this.targetNodeId = node
                this.tooltipOpacity = 1 // show
            },
            "node:pointerout": _ => {
                // console.log('pointout');
                // console.log(node);
                this.tooltipOpacity = 0 // hide
            }
        }
        return {
            eventHandlers,
            nodes: this.circle,
            edges: this.arrows,
            configs: this.config,
            labelInNode: this.labelInsideNode,

            // tooltip related starting here
            targetNodeId: "",
            tooltipPos: {
                left: '',
                top: ''
            },
        }
    },
    methods: {
        goInfo(el){
            this.$q.dialog({
                title: el.title1,
                message: el.message,
                fullWidth: true,
                ok: false,
                cancel: true,
            })
        },
    },
    watch: {
        // 'Floating enabled' checkbox
        d3ForceEnabled(newVal){
            if (newVal == true){
                this.configs.view.layoutHandler = new ForceLayout()
            } else {
                this.configs.view.layoutHandler = new vNG.SimpleLayout()
            }
        },

        // update tooltip position
        tooltipOpacity() {
            this.tooltipPos = {
                left: this.left - 60 + 'px',
                top: this.top + 30 + 'px'
            }
        },
    },
}
</script>

<style scoped>
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
}
.a {
    word-break: break-all
}

.color {
    color: #51486c !important;
}
</style>