<template>
 <q-card class="my_card">
  <q-card-section v-if="json_container.title">
   <div class="row justify-between">
    <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 text-h6 custom_font" style="font-size: 18px;">
     <span @click="handleClickTitle" class="custom_title">{{json_container.title}}</span>
    </div>

    <div dir="rtl" class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 q-pt-xs">
     <q-icon v-if="json_container.info" class="info_icon" name="info" @click="goInfo">
      <q-tooltip  anchor="top middle" self="bottom middle">
       <span class="custom_tooltip">{{ json_container.info }}</span>
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

    <q-icon v-if="json_container.filter2" class="filter_icon" name="filter_list" @click="goFilter2">
     <q-tooltip  anchor="top middle" self="bottom middle">
      <span class="custom_tooltip">{{ json_container.filter2 }}</span>
     </q-tooltip>
    </q-icon>

    <q-icon v-if="json_container.hide" class="hide_icon" name="expand_less" @click="goHide">
     <q-tooltip  anchor="top middle" self="bottom middle">
      <span class="custom_tooltip">{{json_container.hide}}</span>
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

 <div v-if="json_container.extra_title" class="text-bold" style="color: #51486c; padding-left: 31px; padding-top: 20px;">
  {{json_container.extra_title}}
  <br/>
  {{json_container.extra_title1}}
 </div>

 <div style="padding-top: 10px;" class="q-px-sm">

 <Table_3_ori 
   v-if="hide_table && json_container.name != 'Data Group'" 
   style="height: 350 px;" 
   :row_per_page="row_per_page" 
   v-on:action="handleAction" 
   v-on:edit="handleEdit" 
   v-on:list="handleList" 
   v-on:delete="handleDelete" 
   v-on:RowClick="handleRowClicks" 
   @receiveChange="handleChange"
   :title="title" 
   :table_data="table_data" 
   :table_column="table_column" 
   :pass_class="pass_class_2" 
   :separator="separator_2" 
   :table_footer="table_footer" 
   :table_footer2="table_footer2" 
   :table_footer3="table_footer3" 
   :table_footer4="table_footer4" 
   :table_footer5="table_footer5" 
   :pagination-label="getPaginationLabel"
   :extra_title="json_container.extra_title"
   :extra_title1="json_container.extra_title1"
   :search_bar="json_container.search_bar"
   :round_off="json_container.round_off"
   :filter_info="json_container.filter_info"
   :filter_icon="json_container.filter_icon"
   :isStringHasComma= "json_container.isStringHasComma"
   :haveRowClick="haveRowClick"
   @desktop-start-row="updateDesktopRow"/>
   <q-icon v-if="!hide_table" name="warning" size="30px" style="padding-left: 15px; padding-bottom: 10px;"/><span v-if="!hide_table" class="q-px-md">No Data Available</span>
  </div>

  <div style="padding-top: 10px;" class="q-px-sm">
   <Table_3_ori 
     v-if="hide_table && json_container.name == 'Data Group'"
     style="height: 427px;" 
     :row_per_page="row_per_page" 
     v-on:action="handleAction" 
     v-on:edit="handleEdit" 
     v-on:list="handleList" 
     v-on:delete="handleDelete" 
     v-on:RowClick="handleRowClicks" 
     @receiveChange="handleChange"
     :title="title" 
     :table_data="table_data" 
     :table_column="table_column" 
     :pass_class="pass_class_2" 
     :separator="separator_2" 
     :table_footer="table_footer" 
     :table_footer2="table_footer2" 
     :table_footer3="table_footer3" 
     :table_footer4="table_footer4" 
     :table_footer5="table_footer5" 
     :pagination-label="getPaginationLabel"
     :extra_title="json_container.extra_title"
     :extra_title1="json_container.extra_title1"
     :search_bar="json_container.search_bar"
     :round_off="json_container.round_off"
     :filter_info="json_container.filter_info"
     :filter_icon="json_container.filter_icon"
     :isStringHasComma= "json_container.isStringHasComma"
     :haveRowClick="haveRowClick"
     @desktop-start-row="updateDesktopRow"/>
   <q-icon v-if="!hide_table && json_container.name == 'Data Group'" name="warning" size="30px" style="padding-left: 15px; padding-bottom: 10px;"/><span v-if="!hide_table && json_container.name == 'Data Group'" class="q-px-md">No Data Available</span>
  </div>

  <Loading v-if="hide_loading" :loading="loading" />
 </q-card>

</template>

<script>
import { ref, onMounted } from 'vue'
import Loading from 'src/components/Base/Loading';
import Table_3_ori from 'src/components/CRMDASH/Base/Table/Table_3_ori'
// import Table_3_ori_swap from 'src/components/CRMDASH/Base/Table/Table_3_ori_swap'
import Button_icon from 'src/components/CRMDASH/Base/Button_icon';

const currentdate = new Date();
const year = currentdate.getFullYear();
var month = ('0' + ('0' + (currentdate.getMonth()+1)).slice(-2)).slice(-2);
const min_year = (year-3)+"/01";
const max_year = year+"/"+month;

export default{
 data(){
  return{
   json_container: this.json,
   loading: true,
   loadings: false, // show no loading at first time
   disable: false,
   show_filter: false,
   support_filter: '',
   lift_filter: '',
   show_info: false,
   autoclose: true,
   min_year: min_year,
   max_year:max_year,
   filter_date: '',
   filter_date1: '',
   api_data:'',
   filter:"",
   originalRows: this.table_data,
   columns: this.table_column,
   rows: [],
   previous:'',
   change_value:this.change_values,
   // columns: [],
   pagination:{
    sortBy: '',
    descending: '',
    page: 1,
    rowPerPage: this.row_per_page[0] === undefined ? this.row_per_page : this.row_per_page[0],
    rowsNumber: 0
  }
 }
},
 props:
 [
  'json',
  'table_column',
  'table_data', 
  'hide_table', 
  'hide_loading', 
  'title',
  'top_button', 
  'table_footer', 
  'table_footer2', 
  'table_footer3', 
  'table_footer4', 
  'table_footer5', 
  'hide_footer', 
  'row_per_page', 
  "action_button", 
  "edit_button",
  "view_button",
  "delete_button",
  "button_no_outline", 
  "forceLoading", 
  'pass_class_2', 
  'separator_2',
  'forceLoading2', 
  'minSupp', 
  'maxSupp', 
  'minLift', 
  'maxLift', 
  'search_bar', 
  'change_values',
  'forceLoadings',
  'haveRowClick',
  'disables'
],
mounted(){
 this.onRequest({
  pagination: this.pagination,
  // filter: undefined
 })
},

components:{
 Loading, 
 Table_3_ori,
 // Table_3_ori_swap,
 Button_icon
},

computed: {
 dbComponentBehavior() {
  return this.$store.getters['dbComponentBehavior/byLanguage']('crm')
 },
},
methods: {
 updatePassRows(){
  this.$emit('rowsswapped', this.rows);    
 },
 handleChange(newVal){
  this.$emit('receiveChange', newVal)
 },
 handleAction: function(payload){
  this.$emit('main_action', payload)
 },
 handleEdit: function(payload){
  this.$emit('main_edit', payload)
 },
 handleList: function(payload){
  this.$emit('main_list', payload)
 },
 handleDelete: function(payload){
  this.$emit('main_delete', payload)
 },
 header_button : function(payload){
  this.$emit('head_button', payload)
 },
 getPaginationLabel: function(firstRowIndex,endRowIndex,totalRowsNumber ){ 
  return 'Showing '+firstRowIndex +' to '+endRowIndex+' of '+totalRowsNumber;
 },
 onRequest(props){
  this.$emit("receiveRequestTable",props);
  this.pagination.sortBy = props.pagination.sortBy;
  this.pagination.descending = props.pagination.descending;
  this.pagination.page = props.pagination.page;
  this.pagination.rowsPerPage = props.pagination.rowsPerPage;
  this.loading = true
 },
 handleRowClicks: function(row){
  // if (this.previous === row)
  // return
  // this.previous = row  // if used this, when user wanted to click the same things when the next things got err, it unable to select
  this.$emit('receiveRowClick',row)
 },
 goHide(){
  this.$emit('Hide');
 },
 goFilter(){
  this.show_filter = true
  this.$emit('Filter');
 },
 goFilter2(){
  this.$emit('Filter2');
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
 goBack(){
  this.$emit('Back');
 },
},
watch: {
forceLoading(newVal){
 if(newVal){
  this.loading = true;
 }
},
forceLoading2(newVal){
 if(newVal){
  this.loading = true;
  this.$emit('edit_forceLoading2'); // change false then return back to true
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
},
table_column(newVal){
 this.columns = newVal;
},
table_data(newVal){
 this.rows = newVal.data.results;
 this.pagination.rowsNumber = newVal.data.count;
 this.loading = false;
},
json(newVal){
 this.json_container = newVal;
 this.change_value = true;
 this.loading = false;
},
}
}
</script>

<style scoped>
.top_button
{
 margin-left: 10px;
}
.q-btn
{
 border-radius: 0px;
}

* >>> thead
{
 background-color: #dee1e6;
}

* >>> tr, * >>> td
{
 height: 0px !important;
}
* >>> .q-table__container
{
 padding: 0px;
}

/* * >>> .q-table__bottom
{
 display: -webkit-box;
} */
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
 margin-top: 2px;
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
.line_break {
 white-space: pre-wrap;
}

</style>
