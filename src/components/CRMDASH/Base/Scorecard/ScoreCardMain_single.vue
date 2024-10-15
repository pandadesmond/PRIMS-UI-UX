<template>
 <q-chip style="background-color:#362e4b;margin-left: 0px;cursor: default" text-color="white" >
  <div v-if="this.$q.screen.width >= 1024 && this.$q.screen.width <= 1246" :style="`font-size:`+value_font_size6">
   {{pass_title}}
  </div>
  <div v-else-if="this.$q.screen.width >= 500 && this.$q.screen.width <= 573" :style="`font-size:`+value_font_size3">
   {{pass_title}}
  </div>
  <div v-else-if="this.$q.screen.width >= 280 && this.$q.screen.width <= 355" style="font-size:11px">
   {{pass_title}}
  </div>
  <div v-else-if="this.$q.screen.width >= 1068 && this.$q.screen.width <= 1366" style="font-size:11px">
   {{pass_title}}
  </div>
  <div v-else :style="`font-size:`+value_font_size2">
   {{pass_title}}
  </div>
 </q-chip>

 <q-card class="my_card">

 <q-card-section horizontal>

 <q-card-section style="width: 100%;padding-right: 10px;padding-left: 10px;padding-top: 8px;">
  <div style="grid-template-columns: auto;display: grid;overflow: hidden;white-space: nowrap;margin-top: -5px;" class="custom_font_family">
   <div class="text-h6 text-weight-medium text-overline phone_title" :style="[json_container.title == 'rda_no_display' ? 'visibility: visible;color: transparent;'  : '', json_container.title_style]">{{json_container.title}}</div>
    <label class="text-h6 text-weight-bold custom_font" v-bind:style="[json_container.value1_growth == 'negative' ? 'color:red;' : json_container.value1_growth == 'normal' ? '' : 'color:green;', json_container.value1_style]" >
     <div class="row">
      <template v-if="json_container.value1_icon">
       <q-icon 
        :name="json_container.value1_icon"
        :color="json_container.value1_color"
        class="icon_margin"/>
      </template>
      <template v-if="json_container.value1_arrow">
       <q-icon v-if="json_container.value1_arrow != 'normal' && json_container.value1_arrow != ''"
         :class="json_container.value1_arrow == 'positive' ? 'postive_arrow' : 'negative_arrow'"
         :name="json_container.value1_arrow == 'positive' ? 'arrow_upward' : 'arrow_downward' " />
      </template>                          
      <div style="font-size: 18px;">
       {{json_container.value1}}
      </div>   
      <q-tooltip anchor="top middle" v-if="json_container.value1_tooltip" :style="`font-size:`+tooltip_font_size">
       {{json_container.value1_tooltip}}
      </q-tooltip>                                                     
     </div>
    </label> 

    <label v-bind:style="[json_container.value1_extra_growth == 'negative' ? 'color:red;font-size: 15px;' : json_container.value1_extra_growth == 'normal' ? 'color:#51486c;font-size: 15px;' : 'color:green;font-size: 15px;', json_container.value1_extra == 'rda_no_display' ? 'visibility: visible;color: transparent;' : '', json_container.value1_extra_style]" >
     <template v-if="json_container.value1_extra_arrow">
      <q-icon v-if="json_container.value1_extra_arrow != 'normal' && json_container.value1_extra_arrow != ''" 
       :class="json_container.value1_extra_arrow == 'positive' ? 'postive_arrow' : 'negative_arrow'"
       :name="json_container.value1_extra_arrow == 'positive' ? 'arrow_upward' : 'arrow_downward' " />
     </template>
      {{json_container.value1_extra}}
     <q-tooltip anchor="top middle" v-if="json_container.value1_extra_tooltip" :style="`font-size:`+tooltip_font_size">
      {{json_container.value1_extra_tooltip}}
     </q-tooltip>
    </label> 
   </div>
  </q-card-section>

  <q-card-section style="width: 100%;padding-right: 10px;padding-left: 6px;padding-top: 0px;">
   <div style="grid-template-columns: auto;display: grid;overflow: hidden;white-space: nowrap;margin-top: 25px;" class="custom_font_family">
    <div class="text-h6 text-weight-medium text-overline location-margin" :style="[json_container.title2 == 'rda_no_display' ? 'visibility: visible;color: transparent;' : '', json_container.title2_style]">{{json_container.title2}}</div>
     <label class="text-h6 text-weight-bold custom_font" v-bind:style="[json_container.value2_growth == 'negative' ? 'color:red;' : json_container.value2_growth == 'normal' ? '' : 'color:green;', json_container.value2_style]" >
      <template v-if="json_container.value2_arrow">
       <q-icon v-if="json_container.value2_arrow != 'normal' && json_container.value2_arrow != ''"
         :class="json_container.value2_arrow == 'positive' ? 'postive_arrow' : 'negative_arrow'"
         :name="json_container.value2_arrow == 'positive' ? 'arrow_upward' : 'arrow_downward' " />
      </template>
      <div v-if="json_container.value2" class="text-h5 text-weight-bold custom_font value_title">
       <div v-if="this.$q.screen.width >= 1024 && this.$q.screen.width <= 1280" :style="`font-size:`+value_font_size">
        {{json_container.value2}}
       </div>
       <div v-else-if="this.$q.screen.width >= 1440 && this.$q.screen.width <= 1919.99" :style="`font-size:`+value_font_size5">
        {{json_container.value2}}
       </div>
       <div v-else :style="`font-size:`+value_font_size2">
        {{json_container.value2}}
       </div>   
      </div>
      <div v-if="json_container.value2_1" class="text-h6 text-weight-bold custom_font q-pt-sm value_title">
       <div v-if="this.$q.screen.width >= 1024 && this.$q.screen.width <= 1280" :style="`font-size:`+value_font_size">
        {{json_container.value2_1}} 
       </div>
       <div v-else-if="this.$q.screen.width >= 1440 && this.$q.screen.width <= 1919.99" :style="`font-size:`+value_font_size5">
        {{json_container.value2_1}} 
       </div>
       <div v-else :style="`font-size:`+value_font_size2">
        {{json_container.value2_1}} 
       </div>   
      </div>        
      <q-tooltip anchor="top middle" v-if="json_container.value2_tooltip" :style="`font-size:`+tooltip_font_size">
       {{json_container.value2_tooltip}}
      </q-tooltip>
     </label>

     <label v-bind:style="[json_container.value2_extra_growth == 'negative' ? 'color:red;font-size: 15px;' : json_container.value2_extra_growth == 'normal' ? 'color:#51486c;font-size: 15px;' : 'color:green;font-size: 15px;', json_container.value2_extra == 'rda_no_display' ? 'visibility: visible;color: transparent;' : '', json_container.value2_extra_style]" >
      <template v-if="json_container.value2_extra_arrow">
       <q-icon v-if="json_container.value2_extra_arrow != 'normal' && json_container.value2_extra_arrow != ''" 
         :class="json_container.value2_extra_arrow == 'positive' ? 'postive_arrow' : 'negative_arrow'"
         :name="json_container.value2_extra_arrow == 'positive' ? 'arrow_upward' : 'arrow_downward' " />
      </template>
       {{json_container.value2_extra}}
      <q-tooltip anchor="top middle" v-if="json_container.value2_extra_tooltip" :style="`font-size:`+tooltip_font_size">
       {{json_container.value2_extra_tooltip}}
      </q-tooltip>
     </label> 
    </div>

    <div style="grid-template-columns: auto;display: grid;overflow: hidden;white-space: nowrap;" class="custom_font_family">
     <div class="text-h6 text-weight-medium text-overline" :style="[json_container.title4 == 'rda_no_display' ? 'visibility: visible;color: transparent;' : '', json_container.title4_style]">{{json_container.title4}}</div>
      <label class="text-h6 text-weight-bold custom_font" v-bind:style="[json_container.value4_growth == 'negative' ? 'color:red;' : json_container.value4_growth == 'normal' ? '' : 'color:green;', json_container.value4_style]" >
       <template v-if="json_container.value4_arrow">
        <q-icon v-if="json_container.value4_arrow != 'normal' && json_container.value4_arrow != ''" 
         :class="json_container.value4_arrow == 'positive' ? 'postive_arrow' : 'negative_arrow'"
         :name="json_container.value4_arrow == 'positive' ? 'arrow_upward' : 'arrow_downward' " />
       </template>
       <div v-if="json_container.value4" style="font-size: 18px;">  
        {{json_container.value4}}
       </div>
       <q-tooltip anchor="top middle" v-if="json_container.value4_tooltip" :style="`font-size:`+tooltip_font_size">
        {{json_container.value4_tooltip}}
       </q-tooltip>
      </label>

      <label v-bind:style="[json_container.value4_extra_growth == 'negative' ? 'color:red;font-size: 15px;' : json_container.value4_extra_growth == 'normal' ? 'color:#51486c;font-size: 15px;' : 'color:green;font-size: 15px;', json_container.value4_extra == 'rda_no_display' ? 'visibility: visible;color: transparent;' : '', json_container.value4_extra_style]" >
       <template v-if="json_container.value4_extra_arrow">
        <q-icon v-if="json_container.value4_extra_arrow != 'normal' && json_container.value4_extra_arrow != ''" 
         :class="json_container.value4_extra_arrow == 'positive' ? 'postive_arrow' : 'negative_arrow'"
         :name="json_container.value4_extra_arrow == 'positive' ? 'arrow_upward' : 'arrow_downward' " />
       </template>
        {{json_container.value4_extra}}
       <q-tooltip anchor="top middle" v-if="json_container.value4_extra_tooltip" :style="`font-size:`+tooltip_font_size">
        {{json_container.value4_extra_tooltip}}
       </q-tooltip>
      </label> 
     </div>

     <div style="grid-template-columns: auto;display: grid;overflow: hidden;white-space: nowrap;" class="custom_font_family">
      <div class="text-h6 text-weight-medium text-overline" :style="[json_container.title6 == 'rda_no_display' ? 'visibility: visible;color: transparent;' : '', json_container.title6_style]">{{json_container.title6}}</div>
       <label class="text-h6 text-weight-bold custom_font" v-bind:style="[json_container.value6_growth == 'negative' ? 'color:red;' : json_container.value6_growth == 'normal' ? '' : 'color:green;', json_container.value6_style]" >
        <template v-if="json_container.value6_arrow">
         <q-icon v-if="json_container.value6_arrow != 'normal' && json_container.value6_arrow != ''" 
          :class="json_container.value6_arrow == 'positive' ? 'postive_arrow' : 'negative_arrow'"
          :name="json_container.value6_arrow == 'positive' ? 'arrow_upward' : 'arrow_downward' " />
        </template>
        <div v-if="json_container.value6" style="font-size: 18px;">
         {{json_container.value6}}
        </div>
        <q-tooltip anchor="top middle" v-if="json_container.value6_tooltip" :style="`font-size:`+tooltip_font_size">
         {{json_container.value6_tooltip}}
        </q-tooltip>
       </label>

       <label v-bind:style="[json_container.value6_extra_growth == 'negative' ? 'color:red;font-size: 15px;' : json_container.value6_extra_growth == 'normal' ? 'color:#51486c;font-size: 15px;' : 'color:green;font-size: 15px;', json_container.value6_extra == 'rda_no_display' ? 'visibility: visible;color: transparent;' : '', json_container.value6_extra_style]" >
        <template v-if="json_container.value6_extra_arrow">
         <q-icon v-if="json_container.value6_extra_arrow != 'normal' && json_container.value6_extra_arrow != ''" 
          :class="json_container.value6_extra_arrow == 'positive' ? 'postive_arrow' : 'negative_arrow'"
          :name="json_container.value6_extra_arrow == 'positive' ? 'arrow_upward' : 'arrow_downward' " />
        </template>
         {{json_container.value6_extra}}
        <q-tooltip anchor="top middle" v-if="json_container.value6_extra_tooltip" :style="`font-size:`+tooltip_font_size">
         {{json_container.value6_extra_tooltip}}
        </q-tooltip>
       </label> 
      </div>

     </q-card-section>
    </q-card-section>
   <Loading :loading="loading" />
  </q-card>
</template>

<script>
import { ref } from 'vue'
import Loading from 'src/components/Base/Loading';

export default {
 data(){
  return{
   json_container: this.json,
   loading: true,
   tooltip_font_size: "13px;",
   value_font_size6: "calc(10px + (13.5 - 10) * ((100vw - 1024px) / (1246 - 1024))); ",
   value_font_size: "calc(11px + (15 - 11) * ((100vw - 1024px) / (1246 - 1024))); ",
   value_font_size4: "calc(10px + (12 - 10) * ((100vw - 1024px) / (1246 - 1024))); ",
   value_font_size3: "calc(10px + (15 - 10) * ((100vw - 500px) / (573 - 500))); ",
   value_font_size5: "calc(15px + (17 - 15) * ((100vw - 1440px) / (1919.99 - 1440))); ",
   value_font_size2: "15px", // default
   size:{},
  }
 },
 components: {
  Loading
 },
 methods: {
  ScoreCardClick: function(){
   this.$emit("receiveClick");
  }
 },
 name: "ScoreCardMain2",
 props: [
  "json", 
  "forceLoading",
  "pass_title"
 ],
 watch: {
  json(newVal){
   this.json_container = newVal;
   this.loading = false;
  },
  forceLoading(newVal){
   if(newVal){
    this.loading = true;
   }
  }
 }
}
</script>

<style lang="sass" scoped>
.my_card
 width: 100%
 background-color: #fafbfc
 word-break: break-all
 height: 75%
 cursor: default
</style>

<style scoped>
.custom_font_family {
 font-family: "Roboto", "-apple-system", "Helvetica Neue", Helvetica, Arial, sans-serif;
 font-weight: 500;
 /* letter-spacing: 0.16667em; */
}
.postive_arrow{
 /* font-size:20px; */
 color:green;
 margin-top:-5px;
}
.negative_arrow{
 /* font-size:20px; */
 color:red;
 margin-top:-1px;
}
.location-margin{
 margin-top: 3px;
}
.wr{
 word-break: break-all
}
.value_title{
 font-size: 11px;
}  
.card_padding{
 width: 100%;
 padding-right: 10px;
 padding-left: 6px;
 padding-top: 5px;
}  
.card_padding2{
 width: 100%;
 padding-right: 10px;
 padding-left: 10px;
 padding-top: 8px;
} 
.icon_margin{
 padding-top: 0px;
 padding-left: 0px;
 font-size: 25px;
}

@media all and (max-width: 1023px){
.text-font{
 font-size: 16px; 
 white-space: nowrap;
} 
}

/* laptop screen*/
@media all and (max-width: 1294px){
.phone_title{
 font-size: 11px;
}  
.value_title{
 font-size: 11px;
} 
.card_padding{
 width: 100%;
 padding-right: 10px;
 padding-left: 1px;
 padding-top: 5px;
}  
.card_padding2{
 width: 100%;
 padding-right: 5px;
 padding-left: 1px;
 padding-top: 8px;
}  
}

/* minimize screen */
@media all and (max-width: 1280px){
.phone_title{
 font-size: 11px;
}  
.value_title{
 font-size: 11px;
}  
}

/* phone screen */
@media all and (max-width: 970px){
.phone_title{
 font-size: 11px;
}  
.value_title{
 font-size: 11px;
}  
}

/* super-small screen */
@media all and (max-width: 280px){
.phone_title{
 font-size: 11px;
 /* white-space: pre-wrap; */
}  
.value_title{
 font-size: 11px;
}  
}
/* .text-overline {
font-size: 0.68rem;
} */

@media (min-width: 1024px) and (max-width: 1280px){
.phone_title{
 font-size: calc(9px + (11 - 9) * ((100vw - 1024px) / (1246 - 1024))); 
 /* font-size: 10px; */
}
}
@media (min-width: 1440px) and (max-width: 1919.99px){
.phone_title{
 /* font-size: calc(10px + (15 - 10) * ((100vw - 1024px) / (1246 - 1024)));  */
 font-size: 11px;
}
}
.line_break {
 white-space: pre-wrap;
}
</style>