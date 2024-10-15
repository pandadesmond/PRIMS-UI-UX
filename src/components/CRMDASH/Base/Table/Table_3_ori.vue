<template>
 <div class="expand_table_wrapper" style="position:relative;">
  <div class="q-pa-md table_wrapper grab-cursor">
   <q-table 
     v-if="haveRowClick"         
     :separator="separator" 
     :flat="flat_status" 
     :bordered="bordered_status" 
     :class="`main_table ${pass_class != undefined ? pass_class : ''}`" 
     :title="title" 
     :rows="rows" 
     :columns="columns" 
     row-key="name" 
     rows-per-page-label="Entries"   
     :pagination-label="getPaginationLabel" 
     :rows-per-page-options="row_per_page"
     @row-click="handleRowClick"
     :filter="filter"
     :filter-method="filteredData"
     binary-state-sort>
    {{ rows }}

   <template v-slot:header="props">
    <q-tr :props="props">
     <q-th
      v-for="col in props.cols"
      :key="col.name"
      :props="props"
      @click="changeColor"
      >
       <q-tooltip v-if="col.tooltip" anchor="top middle" self="center middle" style="font-size: 13px;">
        {{ col.tooltip }}   
       </q-tooltip>
       <span class="line_break" v-html="col.label" />
     </q-th>
    </q-tr>
   </template>

   <template v-slot:top-right v-if="search_bar">
    <q-input  class="small-input" :disable="change_value ? true : false" dense outlined :readonly="readonly ? true : false" v-on:change="handleChange" v-model="filter" >
     <template v-slot:append>
      <q-icon name="search"/>
     </template>
    </q-input>

    <q-btn v-if="top_button" v-on:click="header_button()" label="NEW"  dense flat ripple class="top_button q-py-none" style="background-color:#362e4b !important; font-size: 13px;color:white; ">
     <q-tooltip>
       Create
     </q-tooltip>
    </q-btn>
   </template>

   <template v-slot:top-left>
    <div class="row">
     <div class="text-bold" v-if="round_off">
      <q-checkbox 
        left-label 
        v-model="change_value" 
        label="'000" 
        @update:model-value="handleChange" 
        style="color: #51486c"/>
      </div>
    <div class="text-bold" v-if="filter_info">
   <q-chip square :icon="filter_icon" class="float-right">
    <div class="ellipsis">
      {{ filter_info }}
     <q-tooltip v-if="$q.screen.lt.sm">{{ filter_info }}</q-tooltip>
    </div>
   </q-chip>
  </div>
</div>
</template>

 <template v-slot:body-cell-action="props">
  <q-td>
   <q-btn 
     v-if="action_button"
     icon="visibility" 
     color="info" 
     dense 
     outline 
     ripple 
     class="q-mr-sm" 
     v-on:click="action(props.row)"> 
    <q-tooltip>
      Action
    </q-tooltip>
   </q-btn>

    <q-btn 
      v-if="edit_button"
      icon="edit_note" 
      style="background-color:#362e4b !important; 
      color:white;" 
      dense 
      ripple 
      class="q-mr-sm" 
      v-on:click="edit(props.row)">
    <q-tooltip>
      Edit
    </q-tooltip>
    </q-btn>

    <q-btn 
      v-if="view_button"
      icon="view_list" 
      color="positive" 
      dense 
      outline 
      ripple 
      class="q-mr-sm" 
      v-on:click="list(props.row)">
    <q-tooltip>
      View
    </q-tooltip>
    </q-btn>

    <q-btn 
      v-if="delete_button"
      icon="delete" 
      color="negative" 
      dense 
      ripple 
      class="q-mr-sm" 
      v-on:click="remove(props.row)">
    <q-tooltip>
      Delete
    </q-tooltip>
    </q-btn>
   <!-- if the word is blue in @click means that it unable to detect the words; yellow color means enable to detect the wprds -->
   </q-td>
  </template>

  <template v-slot:body-cell-Store="props">
   <q-td :style="[props.row.UpdateStat > 0 ? 'color:red;' : '']">
    <div v-if="props.row.UpdateStat > 0">
     <label style="font-weight:bold;">
      * {{props.value}}
     </label>
    </div>

    <span v-else>{{props.value}}</span>

    <q-tooltip
      v-if="props.row.UpdateStat > 0" 
      anchor="top right" 
      :style="`font-size:13px;font-weight:bold;`">
      * Last update {{props.row.LastUpdatedDate}}
    </q-tooltip>
   </q-td>
  </template>

  <template v-slot:body-cell-Growth="props">
   <q-td 
     :style="[`text-align:${props.col.align}`, props.row.Growth < 0 ? 'color:red;' : props.row.Growth > 0 ? 'color:green;' : '']">
     {{props.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}
   </q-td>
  </template>

  <template v-slot:body-cell-GrowthLastMonth="props">
   <q-td 
     :style="[`text-align:${props.col.align}`, props.row.GrowthLastMonth < 0 ? 'color:red;' : props.row.GrowthLastMonth > 0 ? 'color:green;' : '']">
     {{props.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}
   </q-td>
  </template>

  <template v-slot:body-cell-GrowthLastYear="props">
   <q-td 
     :style="[`text-align:${props.col.align}`, props.row.GrowthLastYear < 0 ? 'color:red;' : props.row.GrowthLastYear > 0 ? 'color:green;' : '']">
    {{props.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}
   </q-td>
  </template>

  <template v-slot:body-cell-RewardItem="props">
   <q-td :style="`text-align:${props.col.align};cursor: pointer;`">
    {{props.row.RewardItem}}
   <q-tooltip anchor="center right" self="center middle">
   <div style="font-size: 12px">Average pack back period to redeem this reward: {{props.row.payback_period}} months</div>
   <div style="font-size: 10px">Member's average transaction: RM {{props.row.AvgSpend}} / {{props.row.AvgTxn}} per month</div>
  </q-tooltip>
  </q-td>
 </template>

 <!-- donut drilldown business part -->
 <template v-if="this.$route.name == 'business_overview' || this.$route.name == 'donut_drilldown'" v-slot:body-cell-SpendingGroup="props">
  <q-td style="text-align:left ;cursor: pointer">
   <div class="row text-left">
    <div class="col">
     <q-icon name="info" size="18px"  color="grey-7"/>
    </div>              
    <div class="col text_margin2">
     {{props.row.SpendingGroup}}
    </div>    
   </div>
  <q-tooltip anchor="bottom middle" self="top middle" >
   Click for next level
  </q-tooltip>
 </q-td>
 </template>
 <!-- if need page, need to change layout  -->
 <template v-slot:body-cell-CustomerGroup="props">
  <q-td style="text-align:left ;cursor: pointer">
   <div class="row text-left">
    <div class="col">
     <q-icon name="info" size="18px"  color="grey-7"/>
      {{props.row.CustomerGroup}}
    </div>    
   </div>
   <q-tooltip anchor="bottom middle" self="top middle" >
    Click for next level
   </q-tooltip>
  </q-td>
 </template>

 <!--if there's some table no need, try to use if..else condition-->
 <template v-slot:body-cell-DivDesc="props">
  <q-td style="text-align:left ;cursor: pointer">
   <div class="row text-left">
    <div class="col">
     <q-icon name="info" size="18px"  color="grey-7"/>
    </div>              

    <div class="col text_margin">
      {{props.row.DivDesc}}
    </div>    
    </div>

    <q-tooltip anchor="bottom middle" self="top middle" >
     Click for next level
    </q-tooltip>
   </q-td>
  </template>

  <template v-slot:body-cell-DeptDesc="props">
   <q-td style="text-align:left ;cursor: pointer">
    <div class="row text-left">
     <div class="col">
      <q-icon name="info" size="18px"  color="grey-7"/>
     </div>               

    <div class="col text_margin">
     {{props.row.DeptDesc}}
    </div>    
    </div>

   <q-tooltip anchor="bottom middle" self="top middle" >
     Click for next level
   </q-tooltip>
  </q-td>
 </template>

 <template v-slot:body-cell-SubDeptDesc="props">
  <q-td style="text-align:left ;cursor: pointer">
   <div class="row text-left">
    <div class="col">
     <q-icon name="info" size="18px"  color="grey-7"/>
    </div>

    <div class="col text_margin">
     {{props.row.SubDeptDesc}}
    </div>    
   </div>

   <q-tooltip anchor="bottom middle" self="top middle" >
     Click for next level
   </q-tooltip>
  </q-td>
 </template>

 <template v-slot:body-cell-CategoryDesc="props">
  <q-td style="text-align:left ;cursor: pointer">
   <div class="row text-left">
    <div class="col">
     <q-icon name="info" size="18px"  color="grey-7"/>
    </div>               

    <div class="col text_margin">
     {{props.row.CategoryDesc}}
    </div>    
   </div>

   <q-tooltip anchor="bottom middle" self="top middle" >
    Click for next level
   </q-tooltip>
  </q-td>
 </template>

 <template v-slot:body-cell-isactive="props">
  <q-td>
   {{map_isactive(props.row)}}
  </q-td>
 </template>

 <template v-slot:bottom-row v-if="!filter">
  <q-tr v-if="table_footer" class="table_footer">
   <q-td>
    {{ table_footer.DivDesc }}
   </q-td>
   <q-td v-if="change_value == false" class="text-right">
    {{ table_footer.SalesAmountPrevious }}
   </q-td>
   <q-td v-else class="text-right">
    {{ sales.SalesAmountPrevious }}
   </q-td>
   <q-td v-if="change_value == false" class="text-right">
    {{ table_footer.SalesAmountCurrent }}
   </q-td>
   <q-td v-else class="text-right">
    {{ sales.SalesAmountCurrent }}
   </q-td>         
   <q-td :style="['text-align:right', table_footer.Growth < 0 ? 'color:red;' : table_footer.Growth > 0 ? 'color:green;' : '']">
    {{table_footer.Growth.toFixed(1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}
   </q-td>
  </q-tr>

  <q-tr v-if="table_footer2" class="table_footer">
   <q-td>
    {{ table_footer2.DeptDesc }}
   </q-td>
   <q-td v-if="change_value == false" class="text-right">
    {{ table_footer2.SalesAmountPrevious }}
   </q-td>
   <q-td v-else class="text-right">
    {{ sales.SalesAmountPrevious }}
   </q-td>
   <q-td v-if="change_value == false" class="text-right">
    {{ table_footer2.SalesAmountCurrent }}
   </q-td>      
   <q-td v-else class="text-right">
    {{ sales.SalesAmountCurrent }}
   </q-td>     
   <q-td :style="['text-align:right', table_footer2.Growth < 0 ? 'color:red;' : table_footer2.Growth > 0 ? 'color:green;' : '']">
    {{table_footer2.Growth.toFixed(1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}
   </q-td>
  </q-tr>

  <q-tr v-if="table_footer3" class="table_footer">
   <q-td>
    {{ table_footer3.SubDeptDesc }}
   </q-td>
   <q-td v-if="change_value == false" class="text-right">
    {{ table_footer3.SalesAmountPrevious }}
   </q-td>
   <q-td v-else class="text-right">
    {{ sales.SalesAmountPrevious }}
   </q-td>
   <q-td v-if="change_value == false" class="text-right">
    {{ table_footer3.SalesAmountCurrent }}
   </q-td>      
   <q-td v-else class="text-right">
    {{ sales.SalesAmountCurrent }}
   </q-td>        
   <q-td :style="['text-align:right', table_footer3.Growth < 0 ? 'color:red;' : table_footer3.Growth > 0 ? 'color:green;' : '']">
    {{table_footer3.Growth.toFixed(1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}
   </q-td>
  </q-tr>

  <q-tr v-if="table_footer4" class="table_footer">
   <q-td>
    {{ table_footer4.CategoryDesc }}
   </q-td>
   <q-td v-if="change_value == false" class="text-right">
    {{ table_footer4.SalesAmountPrevious }}
   </q-td>
   <q-td v-else class="text-right">
    {{ sales.SalesAmountPrevious }}
   </q-td>
   <q-td v-if="change_value == false" class="text-right">
    {{ table_footer4.SalesAmountCurrent }}
   </q-td>     
   <q-td v-else class="text-right">
    {{ sales.SalesAmountCurrent }}
   </q-td>        
   <q-td :style="['text-align:right', table_footer4.Growth < 0 ? 'color:red;' : table_footer4.Growth > 0 ? 'color:green;' : '']">
    {{table_footer4.Growth.toFixed(1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}
   </q-td>
  </q-tr>

  <q-tr v-if="table_footer5" class="table_footer">
   <q-td>
    {{ table_footer5.Description }}
   </q-td>
   <q-td v-if="change_value == false" class="text-right">
    {{ table_footer5.SalesAmountPrevious }}
   </q-td>
   <q-td v-else class="text-right">
    {{ sales.SalesAmountPrevious }}
   </q-td>
   <q-td v-if="change_value == false" class="text-right">
    {{ table_footer5.SalesAmountCurrent }}
   </q-td>         
   <q-td v-else class="text-right">
    {{ sales.SalesAmountCurrent }}
   </q-td>       
   <q-td :style="['text-align:right', table_footer5.Growth < 0 ? 'color:red;' : table_footer5.Growth > 0 ? 'color:green;' : '']">
    {{table_footer5.Growth.toFixed(1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}
   </q-td>
  </q-tr>
 </template>
 </q-table>

 <q-table 
  v-else       
   :separator="separator" 
   :flat="flat_status" 
   :bordered="bordered_status" 
   :class="`main_table ${pass_class != undefined ? pass_class : ''}`" 
   :title="title" 
   :rows="rows" 
   :columns="columns" 
   row-key="name" 
   rows-per-page-label="Entries" 
   :pagination-label="getPaginationLabel" 
   :rows-per-page-options="row_per_page"
   :filter="filter"
   :filter-method="filteredData"
   binary-state-sort>
  <!-- {{ rows }} -->
  <template v-slot:header="props">
   <q-tr :props="props">
    <q-th
      v-for="col in props.cols"
      :key="col.name"
      :props="props"
      @click="changeColor">

     <q-tooltip v-if="col.tooltip" anchor="top middle" self="center middle" style="font-size: 13px;">
      {{ col.tooltip }}
     </q-tooltip>
     <span class="line_break" v-html="col.label" />
    </q-th>
   </q-tr>
  </template>

  <template v-slot:top-right v-if="search_bar">
   <q-input class="small-input" :disable="change_value ? true : false" dense outlined :readonly="readonly ? true : false" v-on:change="handleChange" v-model="filter" >
    <template v-slot:append>
     <q-icon name="search"/>
    </template>
   </q-input>
  <q-btn v-if="top_button" v-on:click="header_button()" label="NEW"  dense flat ripple class="top_button q-py-none" style="background-color:#362e4b !important; font-size: 13px;color:white; ">
   <q-tooltip>
     Create
   </q-tooltip>
  </q-btn>
 </template>

 <template v-slot:top-left>
  <div class="row">
   <div class="text-bold" v-if="round_off">
    <q-checkbox 
      left-label 
      v-model="change_value" 
      label="'000"    
      @update:model-value="handleChange" 
      style="color: #51486c"/>
   </div>
   <div class="text-bold" v-if="filter_info">
    <q-chip square :icon="filter_icon" class="float-right">
     <div class="ellipsis">
      {{ filter_info }}
       <q-tooltip v-if="$q.screen.lt.sm">{{ filter_info }}</q-tooltip>   
     </div>
    </q-chip>
   </div>
  </div>
 </template>

 <template v-slot:body-cell-action="props">
  <q-td>
   <q-btn 
     v-if="action_button"
     icon="visibility" 
     color="info" 
     dense 
     outline 
     ripple 
     class="q-mr-sm" 
     v-on:click="action(props.row)">
   <q-tooltip>
    Action
   </q-tooltip>
  </q-btn>

  <q-btn 
    v-if="edit_button"
    icon="edit_note" 
    style="background-color:#362e4b !important; 
    color:white;" 
    dense 
    ripple 
    class="q-mr-sm" 
    v-on:click="edit(props.row)">
  <q-tooltip>
   Edit
  </q-tooltip>
 </q-btn>

 <q-btn 
   v-if="view_button"
   icon="view_list" 
   color="positive" 
   dense 
   outline 
   ripple 
   class="q-mr-sm" 
   v-on:click="list(props.row)">
  <q-tooltip>
   View
  </q-tooltip>
 </q-btn>

 <q-btn 
   v-if="delete_button"
   icon="delete" 
   color="negative" 
   dense 
   ripple 
   class="q-mr-sm" 
   v-on:click="remove(props.row)">
  <q-tooltip>
    Delete
  </q-tooltip>
 </q-btn>
   <!-- if the word is blue in @click means that it unable to detect the words; yellow color means enable to detect the wprds -->
  </q-td>
 </template>

 <template v-slot:body-cell-Store="props">
  <q-td :style="[props.row.UpdateStat > 0 ? 'color:red;' : '']">
   <div v-if="props.row.UpdateStat > 0">
    <label style="font-weight:bold;">
      * {{props.value}}
    </label>
   </div>

 <span v-else>{{props.value}}</span>

 <q-tooltip 
  v-if="props.row.UpdateStat > 0" 
  anchor="top right" 
  :style="`font-size:13px;font-weight:bold;`">
 * Last update {{props.row.LastUpdatedDate}}
 </q-tooltip>

 </q-td>
 </template>

 <template v-slot:body-cell-Growth="props">
  <q-td 
    :style="[`text-align:${props.col.align}`, props.row.Growth < 0 ? 'color:red;' : props.row.Growth > 0 ? 'color:green;' : '']">
    {{props.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}
  </q-td>
 </template>

 <template v-slot:body-cell-GrowthLastMonth="props">
  <q-td 
    :style="[`text-align:${props.col.align}`, props.row.GrowthLastMonth < 0 ? 'color:red;' : props.row.GrowthLastMonth > 0 ? 'color:green;' : '']">
    {{props.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}
  </q-td>
 </template>

 <template v-slot:body-cell-GrowthLastYear="props">
 <q-td 
   :style="[`text-align:${props.col.align}`, props.row.GrowthLastYear < 0 ? 'color:red;' : props.row.GrowthLastYear > 0 ? 'color:green;' : '']">
   {{props.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}
 </q-td>
 </template>

 <template v-slot:body-cell-RewardItem="props">
  <q-td :style="`text-align:${props.col.align};cursor: pointer;`">
   {{props.row.RewardItem}}
  <q-tooltip anchor="center right" self="center middle">
   <div style="font-size: 12px">Average pack back period to redeem this reward: {{props.row.payback_period}} months</div>
   <div style="font-size: 10px">Member's average transaction: RM {{props.row.AvgSpend}} / {{props.row.AvgTxn}} per month</div>
  </q-tooltip>
 </q-td>
 </template>

 <!-- donut drilldown business part -->
 <template v-if="this.$route.name == 'business_overview' || this.$route.name == 'donut_drilldown'" v-slot:body-cell-SpendingGroup="props">
  <q-td style="text-align:left ;cursor: pointer">
   <div class="row text-left">
    <div class="col">
     <q-icon name="info" size="18px"  color="grey-7"/>
    </div>              

    <div class="col text_margin2">
    {{props.row.SpendingGroup}}
    </div>    
   </div>

   <q-tooltip anchor="bottom middle" self="top middle" >
    Click for next level
   </q-tooltip>
  </q-td>
 </template>

 <!-- if need page, need to change layout  -->
 <template v-slot:body-cell-CustomerGroup="props">
  <q-td style="text-align:left ;cursor: pointer">
   <div class="row text-left">
    <div class="col">
     <q-icon name="info" size="18px"  color="grey-7"/>
      {{props.row.CustomerGroup}}
    </div>    
   </div>
   <q-tooltip anchor="bottom middle" self="top middle" >
     Click for next level
   </q-tooltip>
  </q-td>
 </template>

 <!--if there's some table no need, try to use if..else condition-->
 <template v-slot:body-cell-DivDesc="props">
  <q-td style="text-align:left ;cursor: pointer">
   <div class="row text-left">
    <div class="col">
     <q-icon name="info" size="18px"  color="grey-7"/>
    </div>              
    <div class="col text_margin">
     {{props.row.DivDesc}}
    </div>    
   </div>
  <q-tooltip anchor="bottom middle" self="top middle" >
     Click for next level
  </q-tooltip>
 </q-td>
 </template>

 <template v-slot:body-cell-DeptDesc="props">
  <q-td style="text-align:left ;cursor: pointer">
   <div class="row text-left">
    <div class="col">
     <q-icon name="info" size="18px"  color="grey-7"/>
    </div>               
    <div class="col text_margin">
      {{props.row.DeptDesc}}
    </div>    
   </div>
   <q-tooltip anchor="bottom middle" self="top middle" >
     Click for next level
   </q-tooltip>
  </q-td>
 </template>

 <template v-slot:body-cell-SubDeptDesc="props">
  <q-td style="text-align:left ;cursor: pointer">
   <div class="row text-left">
    <div class="col">
     <q-icon name="info" size="18px"  color="grey-7"/>
    </div>
    <div class="col text_margin">
     {{props.row.SubDeptDesc}}
    </div>    
   </div>
   <q-tooltip anchor="bottom middle" self="top middle" >
     Click for next level
   </q-tooltip>
  </q-td>
 </template>

 <template v-slot:body-cell-CategoryDesc="props">
  <q-td style="text-align:left ;cursor: pointer">
   <div class="row text-left">
    <div class="col">
     <q-icon name="info" size="18px"  color="grey-7"/>
    </div>               
    <div class="col text_margin">
     {{props.row.CategoryDesc}}
    </div>    
   </div>
   <q-tooltip anchor="bottom middle" self="top middle" >
     Click for next level
   </q-tooltip>
  </q-td>
 </template>

 <template v-slot:body-cell-isactive="props">
  <q-td>
   {{map_isactive(props.row)}}
  </q-td>
 </template>

 <template v-slot:bottom-row v-if="!filter">
  <q-tr v-if="table_footer" class="table_footer">
   <q-td>
    {{ table_footer.DivDesc }}
   </q-td>
   <q-td v-if="change_value == false" class="text-right">
    {{ table_footer.SalesAmountPrevious }}
   </q-td>
   <q-td v-else class="text-right">
    {{ sales.SalesAmountPrevious }}
   </q-td>
   <q-td v-if="change_value == false" class="text-right">
    {{ table_footer.SalesAmountCurrent }}
   </q-td>
   <q-td v-else class="text-right">
    {{ sales.SalesAmountCurrent }}
   </q-td>         
   <q-td :style="['text-align:right', table_footer.Growth < 0 ? 'color:red;' : table_footer.Growth > 0 ? 'color:green;' : '']">
    {{table_footer.Growth.toFixed(1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}
   </q-td>
  </q-tr>

  <q-tr v-if="table_footer2" class="table_footer">
   <q-td>
    {{ table_footer2.DeptDesc }}
   </q-td>
   <q-td v-if="change_value == false" class="text-right">
    {{ table_footer2.SalesAmountPrevious }}
   </q-td>
   <q-td v-else class="text-right">
    {{ sales.SalesAmountPrevious }}
   </q-td>
   <q-td v-if="change_value == false" class="text-right">
    {{ table_footer2.SalesAmountCurrent }}
   </q-td>      
   <q-td v-else class="text-right">
    {{ sales.SalesAmountCurrent }}
   </q-td>     
   <q-td :style="['text-align:right', table_footer2.Growth < 0 ? 'color:red;' : table_footer2.Growth > 0 ? 'color:green;' : '']">
    {{table_footer2.Growth.toFixed(1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}%
   </q-td>
  </q-tr>

  <q-tr v-if="table_footer3" class="table_footer">
   <q-td>
    {{ table_footer3.SubDeptDesc }}
   </q-td>
   <q-td v-if="change_value == false" class="text-right">
    {{ table_footer3.SalesAmountPrevious }}
   </q-td>
   <q-td v-else class="text-right">
    {{ sales.SalesAmountPrevious }}
   </q-td>
   <q-td v-if="change_value == false" class="text-right">
    {{ table_footer3.SalesAmountCurrent }}
   </q-td>      
   <q-td v-else class="text-right">
    {{ sales.SalesAmountCurrent }}
   </q-td>        
   <q-td :style="['text-align:right', table_footer3.Growth < 0 ? 'color:red;' : table_footer3.Growth > 0 ? 'color:green;' : '']">
    {{table_footer3.Growth.toFixed(1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}
   </q-td>
  </q-tr>

  <q-tr v-if="table_footer4" class="table_footer">
   <q-td>
    {{ table_footer4.CategoryDesc }}
   </q-td>
   <q-td v-if="change_value == false" class="text-right">
    {{ table_footer4.SalesAmountPrevious }}
   </q-td>
   <q-td v-else class="text-right">
    {{ sales.SalesAmountPrevious }}
   </q-td>
   <q-td v-if="change_value == false" class="text-right">
    {{ table_footer4.SalesAmountCurrent }}
   </q-td>     
   <q-td v-else class="text-right">
    {{ sales.SalesAmountCurrent }}
   </q-td>        
   <q-td :style="['text-align:right', table_footer4.Growth < 0 ? 'color:red;' : table_footer4.Growth > 0 ? 'color:green;' : '']">
    {{table_footer4.Growth.toFixed(1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}
   </q-td>
  </q-tr>

  <q-tr v-if="table_footer5" class="table_footer">
   <q-td>
    {{ table_footer5.Description }}
   </q-td>
   <q-td v-if="change_value == false" class="text-right">
    {{ table_footer5.SalesAmountPrevious }}
   </q-td>
   <q-td v-else class="text-right">
    {{ sales.SalesAmountPrevious }}
   </q-td>
   <q-td v-if="change_value == false" class="text-right">
    {{ table_footer5.SalesAmountCurrent }}
   </q-td>         
   <q-td v-else class="text-right">
    {{ sales.SalesAmountCurrent }}
   </q-td>       
   <q-td :style="['text-align:right', table_footer5.Growth < 0 ? 'color:red;' : table_footer5.Growth > 0 ? 'color:green;' : '']">
    {{table_footer5.Growth.toFixed(1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}
   </q-td>
  </q-tr>
 </template>

 </q-table>
 </div>
 <!-- <Loading :loading="loading" /> -->
 </div>
 </template>

<script>
// import Table from 'src/components/Base/Table';
// import Loading from 'src/components/Base/Loading';
import Input from 'src/components/CRMDASH/Base/Input';
import Select from 'src/components/CRMDASH/Base/Selection/Select';

import { ref } from 'vue'

export default {
 setup(){
  const colorA = ref('#ffffff')
   return {
    colorA
   }
 },
 data () {
  return {
   // json_container: this.json,
   originalRows: this.table_data,
   columns: this.table_column,
   // loading: true,
   rows: [],
   filter: "",
   change_value: this.state ? true : false,
   sales: {
    SalesAmountPrevious:'',
    SalesAmountCurrent: ''
   },
   bind_value: '',
   get_arr:[],
   get_arr1:[],
   hint:'',
   buttonColor: 'primary'
   // columns: [],
  }
 },
 props:[
 'title', 
 'table_column', 
 'table_data', 
 'row_per_page', 
 'hide_footer',
 'table_footer',
 'table_footer2',
 'table_footer3',
 'table_footer4',
 'table_footer5',
 "action_button",
 "edit_button",
 "view_button",
 "delete_button",
 "top_button",
 'pass_class', 
 'separator',
 'extra_title',
 'extra_title1',
 'search_bar',
 'round_off',
 'filter_info',
 'filter_icon',
 'text',
 'pass_value',
 'dbComponentBehavior',
 'no_label',
 'readonly',
 'options',
 'mask',
 'isStringHasComma',
 'haveRowClick',
 'state'
 ],

 components:{
  // Table,
  // Loading
  // Input,
  // Label,
  // Select
 },
 computed: {
  oridbComponentBehavior() {
   return this.$store.getters['dbComponentBehavior/byLanguage']('crm')
  },
 },
 methods: {
  changeColor() {
   this.colorA = '#66bb6a';
  },
  unformatAmount(value, type) {
  value = value.toString();

  if (type === "$") {
    value = Number(value).toFixed(2);
  } else if (type === "%") {
    value = Number(value).toFixed(1);
  } else if (type === "qty") {
    value = Number(value).toFixed(0);
  } else {
    value = value;
  }
  
  return value.replaceAll(',', '');
},

filteredData(rows, terms) {
  var array = [];
  var filter = terms.toUpperCase();

  for (var i = 0; i < rows.length; i++) {
    var obj = {};
    var r = Object.keys(rows[i]);

    for (var k = 0; k < r.length; k++) {
      var field = r[k];
      if (this.isStringHasComma) {
        obj[field] = rows[i][field];
      } else {
        obj[field] = this.unformatAmount(rows[i][field]);
      }
    }
    array.push(obj);
  }

  return array.filter(el => {
    for (let j = 0; j < this.table_column.length; j++) {
      let field = this.table_column[j]?.field;
      if (field && el[field] !== undefined && el[field].toString().toUpperCase().includes(filter)) {
        return true;
      }
    }
    return false;
  });
},

  handleChangeSelect(newVal){
   Object.keys(this.table_column).forEach((index)=>{
    if(this.bind_value == this.table_column[index].field){
     var mask = this.table_column[index].mask;
     this.hint = mask;
    }                
   })
   this.$emit('receiveChange', newVal)
  },
  handleChange(newVal) {
  // this.bind_value = value; 
  // this.selectedColumn = this.options.filter(
  //     option => option.value === value
  // )[0].value;
  // this.filterTableData();

  this.$emit('update:pass_value', newVal)
  this.$emit('receiveChange', newVal)
  this.$emit('change', newVal)
 },
 header_button: function(payload){
  this.$emit('head_button', payload)       
 },
 action: function(payload){
  this.$emit('main_action', payload)
 },
 edit: function(payload){
  this.$emit('main_edit', payload)
 },
 list: function(payload){
  this.$emit('main_list', payload)
 },
 remove: function(payload){
  this.$emit('main_delete', payload)
 },
 handleRowClick: function(event, row, index){
  this.$emit('RowClick',row)
 },
},
watch: {
 table_column(newVal){ 
  this.columns = newVal;
 },
 table_data(newVal){
  this.rows = newVal.data.results;
  // this.pagination.rowsNumber = newVal.data.count;
  // this.loading = false;
 },
 table_footer(newVal){
  this.sales.SalesAmountPrevious = (this.unformatAmount(newVal.SalesAmountPrevious)/1000).toFixed(1)
  this.sales.SalesAmountCurrent = (this.unformatAmount(newVal.SalesAmountCurrent)/1000).toFixed(1)
 },
 table_footer2(newVal){
  this.sales.SalesAmountPrevious = (this.unformatAmount(newVal.SalesAmountPrevious)/1000).toFixed(1)
  this.sales.SalesAmountCurrent = (this.unformatAmount(newVal.SalesAmountCurrent)/1000).toFixed(1)
 },
 table_footer3(newVal){
  this.sales.SalesAmountPrevious = (this.unformatAmount(newVal.SalesAmountPrevious)/1000).toFixed(1)
  this.sales.SalesAmountCurrent = (this.unformatAmount(newVal.SalesAmountCurrent)/1000).toFixed(1)
 },
 table_footer4(newVal){
  this.sales.SalesAmountPrevious = (this.unformatAmount(newVal.SalesAmountPrevious)/1000).toFixed(1)
  this.sales.SalesAmountCurrent = (this.unformatAmount(newVal.SalesAmountCurrent)/1000).toFixed(1)
 },
 table_footer5(newVal){
  this.sales.SalesAmountPrevious = (this.unformatAmount(newVal.SalesAmountPrevious)/1000).toFixed(1)
  this.sales.SalesAmountCurrent = (this.unformatAmount(newVal.SalesAmountCurrent)/1000).toFixed(1)
 },
 json(newVal){
  this.change_value = true
  this.json_container = newVal;
  //   this.loading = false;
 },
 pass_value(newVal){
  this.bind_value = newVal;
 }
 }
}
</script>

<style scoped>
* >>> .table_footer
{
 font-weight: bold;
 background-color: #ededed;
}
.table_footer
{
 font-weight: bold;
 background-color: #ededed;
}
.top_button {
 width:60px;
 margin-left: 10px;
}
.line_break {
 white-space: nowrap
}
.text_margin{
 margin-left: -80px
}
.text_margin2{
 margin-left: -50px
}
.text_margin3{
 margin-left: -65px
}
* >>> .q-table__sort-icon{
 width: 12px;
 height: 12px;
 opacity : 0.3;
/* color: v-bind(colorA) */
}

/* icon + label */
* >>>.q-table th.sortable.sorted {
 color: v-bind(colorA)
}

/* only icon */
/* .q-table th.sortable.sorted >>> .q-table__sort-icon{
color: v-bind(colorA)
} */
.small-input {
 max-width: 150px;
 max-height: 50px;
 font-size: 12px;
}

</style>