<template>
 <q-card class="my_card" style="height: 1000 px;">
  <q-card-section v-if="json_container.title">
   <div class="row justify-between">
    <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 text-h6 custom_font" style="font-size: 18px;">
     <span @click="handleClickTitle" class="custom_title">{{json_container.title}}</span>
    </div>

   <div dir="rtl" class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 q-pt-xs">
    <q-icon v-if="json_container.info" class="info_icon" name="info" @click="goInfo">
     <q-tooltip  anchor="top middle" self="bottom middle">
      <span class="custom_tooltip">{{json_container.info}}</span>
     </q-tooltip>
    </q-icon>

   <Button_icon
     v-if="json_container.export"
     tooltip_message="export"
     :icon="'mdi-export'"
     class="export_icon"
     :flat="true"
     :font_color="'#51486c'"
     :color="'white'"
     :outline="false"
     :loading="loadings"
     :readonly="disable"
     size="11px"
     v-on:receiveClick="goExport">
   </Button_icon>

   <!-- layout and header info -->
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
            <div v-html="json_container.message" />
           </div>
          </div>
          <br/>
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

 <q-separator/>

 <q-card-section horizontal>
  <div class="row text-left" >
   <div class="q-px-xl q-pt-md flex-center col-xs-4 col-sm-4 col-md-3 col-lg-3 col-xl-3" style="white-space: nowrap; cursor: pointer;" v-for="option in json_container.options" :key="option">
    <q-tooltip anchor="top middle" self="center left">
     <span class="custom_tooltip_for_circular">Total Sales: {{ option.number }}</span>
     <br/>
     <span class="custom_tooltip_for_circular">Member Sales: {{ option.number1 }}</span>
    </q-tooltip>

    <div v-if="this.$q.screen.width >= 199 && this.$q.screen.width <= 298" >
    <q-circular-progress       
     show-label
     show-value
     font-size = "9px"
     :label = "label"
     :value = "option.values"
     size = "30px"
     :thickness = "0.1"
     :color = "option.color"
     track-color = "grey-3"
     class = "right-margin-phone2"
     @click="goDept(option.code)">
     {{ option.label }}
    </q-circular-progress>
    <div class="q-px-xl" style="font-size: 9px; margin-left:-50px;">
    <strong>Total Sales:</strong>
     <br/>
     <span>{{ option.value }}</span>
     <br/>
     <strong>Member Sales: </strong>
     <br/>
     <span>{{ option.value1 }}</span>
     <br/>
     <strong>Member Penetration:</strong>
      <br/>
      <span>{{ option.values }}% </span>    
    </div>
    </div>

    <div v-if="this.$q.screen.width >= 299 && this.$q.screen.width <= 499" >
    <q-circular-progress       
     show-label
     show-value
     font-size = "10px"
     :label = "label"
     :value = "option.values"
     size = "40px"
     :thickness = "0.1"
     :color = "option.color"
     track-color = "grey-3"
     class = "right-margin-phone"
     @click="goDept(option.code)">
     {{ option.label }}
    </q-circular-progress>
    <div class="q-px-xl" style="font-size: 8px; margin-left:-90px;">
     Total Sales: {{ option.value }}
     <br>
     Member Sales: {{ option.value1 }}
     <br>
     Member Penetration: {{ option.values }}%                        
    </div>
    </div>

    <div v-if="this.$q.screen.width >= 500 && this.$q.screen.width <= 654">
    <q-circular-progress       
     show-label
     show-value
     font-size = "12px"
     :label = "label"
     :value = "option.values"
     size = "80px"
     :thickness = "0.1"
     :color = "option.color"
     track-color = "grey-3"
     class = "right-margin-phone"
     @click="goDept(option.code)">
     {{ option.label }}
    </q-circular-progress>
    <div class="q-px-xs" style="font-size: 12px; margin-left: -30px;">
     Total Sales: {{ option.value }}
     <br>
     Member Sales: {{ option.value1 }}
     <br>
     Member Penetration: {{ option.values }}%                        
    </div>
    </div>

    <div v-if="this.$q.screen.width >= 655 && this.$q.screen.width <= 999"  >
    <q-circular-progress       
     show-label
     show-value
     font-size = "12px"
     :label = "label"
     :value = "option.values"
     size = "80px"
     :thickness = "0.1"
     :color = "option.color"
     track-color = "grey-3"
     class = "right-margin-phone2"
     @click="goDept(option.code)">
     {{ option.label }}
    </q-circular-progress>
    <div style="font-size: 12px; margin-left: -10px;">
     Total Sales: {{ option.value }}
    <br>
     Member Sales: {{ option.value1 }}
    <br>
     Member Penetration: {{ option.values }}%                        
    </div>
    </div>

    <div v-if="this.$q.screen.width >= 1000 && this.$q.screen.width <= 1180" >
    <q-circular-progress      
     show-label
     show-value
     font-size = "12px"
     :label = "label"
     :value = "option.values"
     size = "80px"
     :thickness = "0.1"
     :color = "option.color"
     track-color = "grey-3"
     class = "right-margin-phone2"
     @click="goDept(option.code)">
    {{ option.label }}
    </q-circular-progress>
    <div class="q-px-xs" style="font-size: 12px; margin-left:-10px;">
     Total Sales: {{ option.value }}
    <br>
     Member Sales: {{ option.value1 }}
    <br>
     Member Penetration: {{ option.values }}%                        
    </div>
    </div>

    <div v-if="this.$q.screen.width >= 1181">
    <q-circular-progress   
     show-label
     show-value
     font-size = "12px"
     :label = "label"
     :value = "option.values"
     size = "80px"
     :thickness = "0.1"
     :color = "option.color"
     track-color = "grey-3"
     class = "right-margin"
     @click="goDept(option.code)">
     {{ option.label }}
    </q-circular-progress>
    <div class="q-px-xl" style="font-size: 12px;">
     Total Sales: {{ option.value }}
    <br>
     Member Sales: {{ option.value1 }}
    <br>
     Member Penetration: {{ option.values }}%                        
    </div>
    </div>
   </div>
  </div>
 </q-card-section>

 <Loading :loading="loading" />

 <!-- <q-inner-loading :showing="loading">
  <q-spinner-gears size="50px" color="primary" />
 </q-inner-loading> -->

 </q-card>
</template>

<script>
import Loading from 'src/components/Base/Loading';
import Button_icon from 'src/components/CRMDASH/Base/Button_icon';

export default {
 name: "Circularprogress",
 props: [
  "json", 
  "forceLoading",
  'forceLoadings',
  'disables'
],
 data() {
  return {
   json_container: this.json,
   loading: true,
   loadings: false, // show no loading at first time
   disable: false,
   show_info: false,
   testcolor: [
    "#20aeb9", 
    "#20D4D4", 
    "#c0f3eb",
    "#f8e273",
    "#facc1a",
    "#4dd9af",
    "#58595b"
   ],
  }
 },
computed: {
 dbComponentBehavior() {
  return this.$store.getters['dbComponentBehavior/byLanguage']('crm')
 },
},
components: {
 Loading,
 Button_icon
},

methods:{
 goDept(newVal){
  this.$emit('Dept', newVal);
 },
 goExport(){
  this.loadings = false
  this.disable = false
  this.$emit('Export');
 },
 goInfo(){
  this.show_info = true
  this.$emit('Info');
 },
},
watch: {
 json(newVal){
  this.json_container = newVal;
  this.loading = false;
 },
 forceLoading(newVal){
  if(newVal){
   this.loading = true;
  }
 },
 forceLoadings(newVal){
  if(newVal){
   this.loadings = true;
  }else{
   this.loadings = false; // return false when done generating
  }
 },
 disables(newVal){
  if(newVal){
   this.disable = true;
  }else{
   this.disable = false; // return false when done generating
  }
}
 },
}
</script>

<style lang="sass" scoped>
.my_card
 width: 100%
 background-color: #fafbfc
 word-break: break-all
 height: 100%
 cursor: pointer
 border-radius: 0px 0px 0px 0px
</style>

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
 cursor: pointer;
 margin-top: 3px;
 margin-left: 2px;
 /* position: absolute; */
 /* font-size: 18px; */
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
.custom_tooltip_for_circular
{
 font-size: 12px;
}
.right-margin
{
 margin-left: 70px;
 /* margin-right: -50px; */
}
.right-margin-phone
{
 margin-left: -20px;
 /* margin-right: -50px; */
}
.right-margin-phone2
{
 margin-left: 20px;
 /* margin-right: -50px; */
}
.line_break {
 white-space: pre-wrap;
}

</style>
