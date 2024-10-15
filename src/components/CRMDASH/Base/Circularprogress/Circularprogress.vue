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
       :font_color="'black'"
       :color="'white'"
       :outline="false"
       :loading="loadings"
       :readonly="disable"
       size="11px"
       v-on:receiveClick="goExport">
     </Button_icon>

    <q-icon v-if="json_container.filter" class="filter_icon" name="filter_list" @click="goFilter">
     <q-tooltip  anchor="top middle" self="bottom middle">
      <span class="custom_tooltip">{{json_container.filter}}</span>
     </q-tooltip>
    </q-icon>

    <q-icon v-if="json_container.hide" class="hide_icon" name="expand_less" @click="goHide">
     <q-tooltip  anchor="top middle" self="bottom middle">
      <span class="custom_tooltip">{{json_container.hide}}</span>
     </q-tooltip>
    </q-icon>

    <!-- layout and header info  -->
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

 <q-card-section>

 <div class="row justify-end">
  <q-chip square icon="pan_tool_alt" >Click for next level</q-chip>
 </div>

 <!-- overview(sales analysis) -->
 <div v-if="this.$route.name == 'Overview'" class="row" >
  <div class="q-px-xs q-pt-md col-xs-7 col-sm-4 col-md-2 col-lg-2 col-xl-2 circular_align" style="cursor: pointer;" v-for="option in json_container.options" :key="option">

    <q-circular-progress       
     v-if="this.$q.screen.width >= 600 && this.$q.screen.width <= 654"   
     show-label
     show-value
     font-size = "9px"
     :label = "label"
     :value = "option.values"
     size = "100px"
     class = "right-margin"
     :thickness = "0.1"
     :color = "option.color"
     track-color = "grey-3"
     @click="goDept(option.code)">
     {{ option.label }}
     <br/>
     RM{{ option.value }}
    </q-circular-progress>

    <q-circular-progress       
      v-else-if="this.$q.screen.width >= 655 && this.$q.screen.width <= 715"   
      show-label
      show-value
      font-size = "10px"
      :label = "label"
      :value = "option.values"
      size = "120px"
      class = "right-margin"
      :thickness = "0.1"
      :color = "option.color"
      track-color = "grey-3"
      @click="goDept(option.code)">
     {{ option.label }}
     <br/>
     RM{{ option.value }}
    </q-circular-progress>

    <q-circular-progress       
      v-else-if="this.$q.screen.width >= 1024 && this.$q.screen.width <= 1180"   
      show-label
      show-value
      font-size = "10px"
      :label = "label"
      :value = "option.values"
      size = "120px"
      class = "right-margin"
      :thickness = "0.1"
      :color = "option.color" 
      track-color = "grey-3"
      @click="goDept(option.code)">
     {{ option.label }}
     <br/>
     RM{{ option.value }}
    </q-circular-progress>

    <q-circular-progress       
      v-else
      show-label
      show-value
      font-size = "12px"
      :label = "label"
      :value = "option.values"
      size = "140px"
      class = "right-margin"
      :thickness = "0.1"
      :color = "option.color"
      track-color = "grey-3"
      @click="goDept(option.code)" 
      v-on:click="goDepts(option.label)">
      {{ option.label }}
      <br/>
      RM{{ option.value }}
    </q-circular-progress>
   </div>
  </div>

  <!-- profiles -->
  <div v-if="this.$route.name == 'profiles'" class="row" >
  <div class="q-px-xs q-pt-md col-xs-7 col-sm-4 col-md-2 col-lg-2 col-xl-2 circular_align" style="cursor: pointer;" v-for="option in json_container.options" :key="option">
   <q-tooltip anchor="top middle" self="center middle">
    <span class="custom_tooltip_for_circular">
     <span v-for="member in option.member" :key="member">
      {{ member.Gender }} : RM{{ member.SalesAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }} <br/>  
     </span>     
     <span v-for="member in option.member_race" :key="member">
      {{ member.Race }} : RM{{ member.SalesAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }} <br/>  
     </span>      
     <span v-for="member in option.member_marital" :key="member">
      {{ member.MaritalStatus }} : RM{{ member.SalesAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }} <br/>  
     </span>       
    </span>
   </q-tooltip>

   <q-circular-progress       
     v-if="this.$q.screen.width >= 600 && this.$q.screen.width <= 654"   
     show-label
     show-value
     font-size = "9px"
     :label = "label"
     :value = "option.values"
     size = "100px"
     class = "right-margin"
     :thickness = "0.1"
     :color = "option.color"
     track-color = "grey-3"
     @click="goDept(option.code)">
     {{ option.label }}
     <br/>
     RM{{ option.value }}
    </q-circular-progress>

    <q-circular-progress       
      v-else-if="this.$q.screen.width >= 655 && this.$q.screen.width <= 715"   
      show-label
      show-value
      font-size = "10px"
      :label = "label"
      :value = "option.values"
      size = "120px"
      class = "right-margin"
      :thickness = "0.1"
      :color = "option.color"
      track-color = "grey-3"
      @click="goDept(option.code)">
     {{ option.label }}
     <br/>
     RM{{ option.value }}
    </q-circular-progress>

    <q-circular-progress       
      v-else-if="this.$q.screen.width >= 1024 && this.$q.screen.width <= 1180"   
      show-label
      show-value
      font-size = "10px"
      :label = "label"
      :value = "option.values"
      size = "120px"
      class = "right-margin"
      :thickness = "0.1"
      :color = "option.color" 
      track-color = "grey-3"
      @click="goDept(option.code)">
     {{ option.label }}
     <br/>
     RM{{ option.value }}
    </q-circular-progress>

    <q-circular-progress       
      v-else
      show-label
      show-value
      font-size = "12px"
      :label = "label"
      :value = "option.values"
      size = "140px"
      class = "right-margin"
      :thickness = "0.1"
      :color = "option.color"
      track-color = "grey-3"
      @click="goDept(option.code)" 
      v-on:click="goDepts(option.label)">
      {{ option.label }}
      <br/>
      RM{{ option.value }}
    </q-circular-progress>
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
 props: ["json", "forceLoading", "forceLoading2", "forceLoading3",'forceLoadings', 'disables'],
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
  goDepts(newVal){
   this.$emit('Depts', newVal);
  },
  goExport(){
   this.loadings = false
   this.disable = false
   this.$emit('Export');
  },
  goHide(){
   this.$emit('Hide');
  },
  goInfo(){
   this.show_info = true
   this.$emit('Info');
  },
  goFilter(){
   this.$emit('Filter');
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
  forceLoading2(newVal){
   if(newVal){
    this.loading = true;
   }
  },
  forceLoading3(newVal){
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
 }
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

.hide_icon
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
 margin-left: 40px;
 /* margin-right: -50px; */
}

.line_break {
 white-space: pre-wrap;
}

@media all and (max-width: 1262px) {
.circular_align{
 margin-right: 0px;
 margin-left: -10px
}
}

@media all and (max-width: 599px) {
.circular_align{
 margin-right: -50px;
}
}

@media all and (max-width: 595px) {
.circular_align{
 margin-right: -40px;
}
}

@media all and (max-width: 580px) {
.circular_align{
 margin-right: -30px;
}
}

@media all and (max-width: 560px) {
.circular_align{
 margin-right: -20px;
}
}

@media all and (max-width: 540px) {
.circular_align{
 margin-right: 0px;
 margin-left: -25px;
}
}

@media (min-width: 415px) and (max-width: 530px) {
.circular_align{
 margin-right: 0px;
 margin-left: 0px;
}
}

@media all and (max-width: 414px) {
.circular_align{
 margin-right: 0px;
 margin-left: -35px
}
}

@media all and (max-width: 412px) {
.circular_align{ 
 margin-right: 0px;
 margin-left: -30px
}
}

@media all and (max-width: 375px) {
.circular_align{
 margin-right: -30px;
 margin-left: -18px
}
}

@media all and (max-width: 360px) {
.circular_align{
 margin-right: -20px;
 margin-left: -10px
}
}

@media all and (max-width: 280px) {
.circular_align{
 margin-right: 0px;
 margin-left: 0px
}
}
</style>
