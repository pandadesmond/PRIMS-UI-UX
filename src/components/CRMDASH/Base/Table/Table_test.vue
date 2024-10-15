<template>
 <Table_3_ori
  v-if="hide_table"
  style="height: 350 px;"
  :row_per_page="row_per_page"
  v-on:head_button="addButton"
  v-on:main_action="handleAction"
  v-on:main_edit="handleEdit"
  v-on:main_list="handleList"
  v-on:main_delete="handleDelete"
  :top_button="top_button"
  :edit_button="edit_button"
  :delete_button="delete_button"
  :action_button="action_button"
  :view_button="view_button"
  :title="title"
  :table_data="table_data"
  :table_column="table_column"
  :pass_class="pass_class_2"
  :separator="separator_2" 
  :search_bar="json_container.search_bar"/>

  <Loading v-if="hide_loading" :loading="loading" />
</template>

<script>
import { ref } from 'vue'
import Table_3_ori from 'src/components/CRMDASH/Base/Table/Table_3_ori'
import Loading from 'src/components/Base/Loading';

export default {
 props:[
  'json',
  'table_column',
  'table_data', 
  'hide_table', 
  'hide_loading', 
  'title',
  'top_button', 
  'hide_footer', 
  'row_per_page',
  'table_footer',
  'action_button', 
  'edit_button',
  'view_button',
  'delete_button',
  'button_no_outline', 
  'forceLoading', 
  'forceLoading2',
  'forceLoading3',
  'forceLoading4',
  'forceLoading5',
  'forceLoading6',
  'pass_class_2', 
  'separator_2',
  'search_bar',
],
 data () {
  return {
   originalRows: this.table_data,
   columns: this.table_column,
   rows: [],
   loading: true,
   json_container: this.json,
  }
 },
 components:{
  Loading,
  Table_3_ori
 },
 computed: {
  dbComponentBehavior() {
   return this.$store.getters['dbComponentBehavior/byLanguage']('crm')
  },
 },
 methods: {
  addButton: function(payload){
   this.$emit('head_button', payload)
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
  onRequest (props) {
   this.$emit("receiveRequestTable",props);

   // this.pagination.sortBy = props.pagination.sortBy;
   // this.pagination.descending = props.pagination.descending;
   // this.pagination.page = props.pagination.page;
   // this.pagination.rowsPerPage = props.pagination.rowsPerPage;
   this.loading = true
 },
 handleRowClick(evt, row, index){
  this.$emit('receiveRowClick',row)
 },
},
mounted(){
 this.onRequest({
  // pagination: this.pagination,
  // filter: undefined
 })
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
 }
},
forceLoading3(newVal){
 if(newVal){
  this.loading = true;
 }
},
forceLoading4(newVal){
 if(newVal){
  this.loading = true; 
 }
},
forceLoading5(newVal){
 if(newVal){
  this.loading = true;
 }
},
forceLoading6(newVal){
 if(newVal){
  this.loading = true;
 }
},
table_column(newVal){
 this.columns = newVal;
},
table_data(newVal){ 
 this.rows = newVal.data.results;
 // this.pagination.rowsNumber = newVal.data.count;
 this.loading = false;
},
json(newVal){
 this.json_container = newVal;
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
 cursor: grab;
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
.line_break {
 white-space: pre-wrap;
}

</style>

