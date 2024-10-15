<template>
<!-- {{columns}}
<br/>
<br/>
{{rows}} -->
  <div class="expand_table_wrapper" style="position:relative;">
    <div class="q-pa-md table_wrapper grab-cursor">
      <q-table 
        v-if="haveRowClick"
        :separator="separator" 
        :flat="flat_status" 
        :bordered="bordered_status" 
        :class="`main_table ${pass_class != undefined ? pass_class : ''}`" 
        ref="table"
        id="#tableId"
        :title="title" 
        :rows="rows" 
        :columns="columns" 
        row-key="name" 
        rows-per-page-label="Entries" 
        :pagination-label="getPaginationLabel" 
        :rows-per-page-options="row_per_page"
        :filter="filter"
        :filter-method="filteredData"
        :hide-bottom="hide-bottom"
        @row:dragstart="dragStartRow"
        @row:dragover="dragOverRow"
        @row:dragend="dragEndRow"
        @row:touchstart="touchStartRow"
        @row:touchmove="touchMoveRow"
        @row:touchend="touchEndRow">

        <template v-slot:body="props">
            <q-tr
            :props="props"
            :draggable="true"
            @mousedown="handleMouseDown"
            @mouseup="handleMouseUp"
            @click="handleRowClick(props.row)"
            @dragstart="dragStartRow($event, props.row)"
            @dragover="dragOverRow(props.row)"
            @dragend="dragEndRow(props.row)"
            @touchstart="touchStartRow($event, props.row)"
            @touchmove="touchMoveRow($event)"
            @touchend="touchEndRow"
            >
            <q-td
                v-for="col in props.cols"
                :key="col.name"
                :props="props"
            >
            <span v-if="col.name == 'Growth'" :style="[props.row.Growth < 0 ? 'color:red;' : props.row.Growth > 0 ? 'color:green;' : '']">
                {{props.row.Growth.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
            </span>
            <span v-else-if="col.name == 'GrowthLastMonth'" :style="[props.row.GrowthLastMonth < 0 ? 'color:red;' : props.row.GrowthLastMonth > 0 ? 'color:green;' : '']">
                {{props.row.GrowthLastMonth.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
            </span>
            <span v-else-if="col.name == 'GrowthLastYear'" :style="[props.row.GrowthLastYear < 0 ? 'color:red;' : props.row.GrowthLastYear > 0 ? 'color:green;' : '']">
                {{props.row.GrowthLastYear.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
            </span>
            <span v-else-if="col.name == 'RewardItem'" :style="`text-align:${props.col.align};cursor: pointer;`">
                {{props.row.RewardItem.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
                <q-tooltip anchor="center right" self="center middle">
                    <div style="font-size: 12px">Average pack back period to redeem this reward: {{props.row.payback_period}} months</div>
                    <div style="font-size: 10px">Member's average transaction: RM {{props.row.AvgSpend}} / {{props.row.AvgTxn}} per month</div>
                </q-tooltip>                
            </span>
            <span v-else-if="col.name == 'SpendingGroup' && this.$route.name == 'business_overview' || this.$route.name == 'donut_drilldown'" style="text-align:left ;cursor: pointer">
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
            </span>
            <span v-else-if="col.name == 'CustomerGroup'" style="text-align:left ;cursor: pointer">
               <div class="row text-left">
                <div class="col">
                      <q-icon name="info" size="18px"  color="grey-7"/>
                </div>              

               <div class="col text_margin2">
                     {{props.row.CustomerGroup}}
               </div>    

               </div>
                 <q-tooltip anchor="bottom middle" self="top middle" >
                    Click for next level
                </q-tooltip>                          
            </span>
            <span v-else-if="col.name == 'DivDesc'" style="text-align:left ;cursor: pointer">
               <div class="row text-left">
                <div class="col">
                      <q-icon name="info" size="18px"  color="grey-7"/>
                </div>              

               <div class="col text_margin2">
                     {{props.row.DivDesc}}
               </div>    

               </div>
                 <q-tooltip anchor="bottom middle" self="top middle" >
                    Click for next level
                </q-tooltip>                          
            </span>
            <span v-else-if="col.name == 'DeptDesc'" style="text-align:left ;cursor: pointer">
               <div class="row text-left">
                <div class="col">
                      <q-icon name="info" size="18px"  color="grey-7"/>
                </div>              

               <div class="col text_margin2">
                     {{props.row.DeptDesc}}
               </div>    

               </div>
                 <q-tooltip anchor="bottom middle" self="top middle" >
                    Click for next level
                </q-tooltip>                          
            </span>
            <span v-else-if="col.name == 'SubDeptDesc'" style="text-align:left ;cursor: pointer">
               <div class="row text-left">
                <div class="col">
                      <q-icon name="info" size="18px"  color="grey-7"/>
                </div>              

               <div class="col text_margin2">
                     {{props.row.SubDeptDesc}}
               </div>    

               </div>
                 <q-tooltip anchor="bottom middle" self="top middle" >
                    Click for next level
                </q-tooltip>                          
            </span>
            <span v-else-if="col.name == 'CategoryDesc'" style="text-align:left ;cursor: pointer">
               <div class="row text-left">
                <div class="col">
                      <q-icon name="info" size="18px"  color="grey-7"/>
                </div>              

               <div class="col text_margin2">
                     {{props.row.CategoryDesc}}
               </div>    

               </div>
                 <q-tooltip anchor="bottom middle" self="top middle" >
                    Click for next level
                </q-tooltip>                          
            </span>
            <span v-else-if="col.name == 'Description'" style="text-align:left ;cursor: pointer">
               <div class="col text_margin text-black">
                     {{props.row.Description}}
               </div>                       
            </span>
             <span v-else>
                 {{ props.row[col.name] }}

             </span>           
            </q-td>  
            </q-tr>
        </template>

           <!--{{ rows }}-->

          <template v-slot:header="props">
              <q-tr :props="props">
              <q-th
                  v-for="col in props.cols"
                  :key="col.name"
                  :props="props"
                  :draggable="true"
                  @dragstart="dragStart(col)"
                  @dragover="dragOver(col)"
                  @drop="drop(col)"
                  @touchstart="touchStart(col)"
                  @touchmove="touchMove($event)"
                  @touchend="touchEnd"
              >
                  <q-tooltip v-if="col.tooltip" anchor="top middle" self="center middle" style="font-size: 13px;">
                  {{ col.tooltip }}
                  </q-tooltip>
                    <span class="line_break" v-html="col.label" />
              </q-th>
              </q-tr>
          </template>

          <template v-slot:top-right v-if="search_bar">
            <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-7 col-lg-7 col-xl-7">
                    <q-select :disable="shouldDisable" dense outlined square :readonly="readonly ? true : false" v-model="bind_value"
                    :options="get_arr" :value="get_arr" />
                </div>
                <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5 col-xl-5">
                    <q-input :disable="shouldDisable || shouldBindDisable" dense outlined square :hint="hint" :mask="format" reverse-fill-mask :no_label="no_label" :readonly="readonly ? true : false" v-on:change="handleChange" v-model="filter">
                      <template v-slot:append>
                        <q-icon name="search"/>
                      </template>
                    </q-input>
                </div>
            </div>

            <!-- <q-input filled borderless dense v-model="filter" placeholder="Search">
                <template v-slot:append>
                    <q-icon name="search"></q-icon>
                </template>
            </q-input> -->

             <q-btn v-if="top_button" v-on:click="header_button()" label="NEW"  dense flat ripple class="top_button q-py-none" style="background-color:#362e4b !important; font-size: 13px;color:white; ">
                  <q-tooltip>
                      Create
                  </q-tooltip>
              </q-btn>

          </template>

          <template v-slot:top-left>

            <div class="row">
                <div class="text-bold" v-if="round_off">
                    <q-checkbox left-label v-model="change_value" label="'000" 
                        @update:model-value="handleChange" style="color: #51486c"/>
                </div>
                <div class="text-bold" v-else-if="filter_info">
                    <q-chip square icon="filter_alt" class="float-right">
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

                  <q-btn icon="visibility" color="info" dense outline ripple class="q-mr-sm" v-on:click="action(props.row)"
                  v-if="action_button">
                      <q-tooltip>
                          Action
                      </q-tooltip>
                  </q-btn>

                  <q-btn icon="edit_note" style="background-color:#362e4b !important; color:white;" dense ripple class="q-mr-sm" v-on:click="edit(props.row)"
                  v-if="edit_button">
                      <q-tooltip>
                          Edit
                      </q-tooltip>
                  </q-btn>

                  <q-btn icon="view_list" color="positive" dense outline ripple class="q-mr-sm" v-on:click="list(props.row)"
                  v-if="view_button">
                      <q-tooltip>
                          View
                      </q-tooltip>
                  </q-btn>

                  <q-btn icon="delete" color="negative" dense ripple class="q-mr-sm" v-on:click="remove(props.row)"
                  v-if="delete_button">
                      <q-tooltip>
                          Delete
                      </q-tooltip>
                  </q-btn>
                  <!-- if the word is blue in @click means that it unable to detect the words; yellow color means enable to detect the wprds -->

              </q-td>
          </template>

           <template v-slot:body-cell-Store="props">
              <q-td :style="[props.row.UpdateStat > 0 ? 'color:red;' : '']">
                <!-- {{props.value}} -->
                <div v-if="props.row.UpdateStat > 0">
                  <label style="font-weight:bold;">
                    * {{props.value}}
                    <!-- Last update  -->
                    <!-- {{props.row.LastUpdatedDate}} -->
                  </label>
                </div>

                <span v-else>{{props.value}}</span>

                <q-tooltip anchor="top right" v-if="props.row.UpdateStat > 0" :style="`font-size:13px;font-weight:bold;`">
                    * Last update {{props.row.LastUpdatedDate}}
                </q-tooltip>

              </q-td>
            </template>

          <template v-slot:body-cell-isactive="props">
              <q-td >
                  {{map_isactive(props.row)}}
              </q-td>
          </template>
          <!-- :style="['font-weight:bold', 'background-color:#ededed' ]" -->

          <template v-slot:bottom-row v-if="!filter">
              <q-tr v-if="table_footer" class="table_footer">
                  <q-td>
                    <q-tooltip anchor="top middle" self="center middle" style="font-size: 11px;">
                      Division Description
                    </q-tooltip>
                  <!-- <q-td :style="[!filter ? 'font-weight:bold' : filter ? 'font-weight:thin' : '']"> -->
                      {{ table_footer.DivDesc }}
                  </q-td>
                  <q-td v-if="change_value == false" class="text-right">
                    <q-tooltip anchor="top middle" self="center middle" style="font-size: 11px;">
                      Previous Sales Amount
                    </q-tooltip>
                      {{ table_footer.SalesAmountPrevious }}
                  </q-td>
                  <q-td v-else class="text-right">
                    <q-tooltip anchor="top middle" self="center middle" style="font-size: 11px;">
                      Previous Sales Amount
                    </q-tooltip>
                      {{ sales.SalesAmountPrevious }}
                  </q-td>
                  <q-td v-if="change_value == false" class="text-right">
                    <q-tooltip anchor="top middle" self="center middle" style="font-size: 11px;">
                      Current Sales Amount
                    </q-tooltip>
                      {{ table_footer.SalesAmountCurrent }}
                  </q-td>
                  <q-td v-else class="text-right">
                    <q-tooltip anchor="top middle" self="center middle" style="font-size: 11px;">
                      Current Sales Amount
                    </q-tooltip>
                      {{ sales.SalesAmountCurrent }}
                  </q-td>         
                  <q-td :style="['text-align:right', table_footer.Growth < 0 ? 'color:red;' : table_footer.Growth > 0 ? 'color:green;' : '']">
                    <q-tooltip anchor="top middle" self="center middle" style="font-size: 11px;">
                      Growth
                    </q-tooltip>
                      {{table_footer.Growth.toFixed(1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}
                  </q-td>
              </q-tr>

              <q-tr v-if="table_footer2" class="table_footer">
                  <q-td>
                    <q-tooltip anchor="top middle" self="center middle" style="font-size: 11px;">
                      Department Description
                    </q-tooltip>
                      {{ table_footer2.DeptDesc }}
                  </q-td>
                  <q-td v-if="change_value == false" class="text-right">
                    <q-tooltip anchor="top middle" self="center middle" style="font-size: 11px;">
                      Previous Sales Amount
                    </q-tooltip>
                      {{ table_footer2.SalesAmountPrevious }}
                  </q-td>
                  <q-td v-else class="text-right">
                    <q-tooltip anchor="top middle" self="center middle" style="font-size: 11px;">
                      Previous Sales Amount
                    </q-tooltip>
                      {{ sales.SalesAmountPrevious }}
                  </q-td>
                  <q-td v-if="change_value == false" class="text-right">
                    <q-tooltip anchor="top middle" self="center middle" style="font-size: 11px;">
                      Current Sales Amount
                    </q-tooltip>
                      {{ table_footer2.SalesAmountCurrent }}
                  </q-td>      
                  <q-td v-else class="text-right">
                    <q-tooltip anchor="top middle" self="center middle" style="font-size: 11px;">
                      Current Sales Amount
                    </q-tooltip>
                      {{ sales.SalesAmountCurrent }}
                  </q-td>     
                  <q-td :style="['text-align:right', table_footer2.Growth < 0 ? 'color:red;' : table_footer2.Growth > 0 ? 'color:green;' : '']">
                    <q-tooltip anchor="top middle" self="center middle" style="font-size: 11px;">
                      Growth
                    </q-tooltip>
                      {{table_footer2.Growth.toFixed(1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}
                  </q-td>
              </q-tr>

            <q-tr v-if="table_footer3" class="table_footer">
                  <q-td>
                    <q-tooltip anchor="top middle" self="center middle" style="font-size: 11px;">
                      Sub-Department Description
                    </q-tooltip>
                      {{ table_footer3.SubDeptDesc }}
                  </q-td>
                  <q-td v-if="change_value == false" class="text-right">
                    <q-tooltip anchor="top middle" self="center middle" style="font-size: 11px;">
                      Previous Sales Amount
                    </q-tooltip>
                      {{ table_footer3.SalesAmountPrevious }}
                  </q-td>
                  <q-td v-else class="text-right">
                    <q-tooltip anchor="top middle" self="center middle" style="font-size: 11px;">
                      Previous Sales Amount
                    </q-tooltip>
                      {{ sales.SalesAmountPrevious }}
                  </q-td>
                  <q-td v-if="change_value == false" class="text-right">
                    <q-tooltip anchor="top middle" self="center middle" style="font-size: 11px;">
                      Current Sales Amount
                    </q-tooltip>
                      {{ table_footer3.SalesAmountCurrent }}
                  </q-td>      
                  <q-td v-else class="text-right">
                    <q-tooltip anchor="top middle" self="center middle" style="font-size: 11px;">
                      Current Sales Amount
                    </q-tooltip>
                      {{ sales.SalesAmountCurrent }}
                  </q-td>        
                  <q-td :style="['text-align:right', table_footer3.Growth < 0 ? 'color:red;' : table_footer3.Growth > 0 ? 'color:green;' : '']">
                    <q-tooltip anchor="top middle" self="center middle" style="font-size: 11px;">
                      Growth
                    </q-tooltip>
                      {{table_footer3.Growth.toFixed(1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}
                  </q-td>
              </q-tr>

            <q-tr v-if="table_footer4" class="table_footer">
                  <q-td>
                    <q-tooltip anchor="top middle" self="center middle" style="font-size: 11px;">
                      Category Description
                    </q-tooltip>
                      {{ table_footer4.CategoryDesc }}
                  </q-td>
                  <q-td v-if="change_value == false" class="text-right">
                    <q-tooltip anchor="top middle" self="center middle" style="font-size: 11px;">
                      Previous Sales Amount
                    </q-tooltip>
                      {{ table_footer4.SalesAmountPrevious }}
                  </q-td>
                  <q-td v-else class="text-right">
                    <q-tooltip anchor="top middle" self="center middle" style="font-size: 11px;">
                      Previous Sales Amount
                    </q-tooltip>
                      {{ sales.SalesAmountPrevious }}
                  </q-td>
                  <q-td v-if="change_value == false" class="text-right">
                    <q-tooltip anchor="top middle" self="center middle" style="font-size: 11px;">
                      Current Sales Amount
                    </q-tooltip>
                      {{ table_footer4.SalesAmountCurrent }}
                  </q-td>     
                  <q-td v-else class="text-right">
                    <q-tooltip anchor="top middle" self="center middle" style="font-size: 11px;">
                      Current Sales Amount
                    </q-tooltip>
                      {{ sales.SalesAmountCurrent }}
                  </q-td>        
                  <q-td :style="['text-align:right', table_footer4.Growth < 0 ? 'color:red;' : table_footer4.Growth > 0 ? 'color:green;' : '']">
                    <q-tooltip anchor="top middle" self="center middle" style="font-size: 11px;">
                      Growth
                    </q-tooltip>
                      {{table_footer4.Growth.toFixed(1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}
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
        ref="table"
        id="#tableId"
        :title="title" 
        :rows="rows" 
        :columns="columns" 
        row-key="name" 
        rows-per-page-label="Entries" 
        :pagination-label="getPaginationLabel" 
        :rows-per-page-options="row_per_page"
        :filter="filter"
        :filter-method="filteredData"
        :hide-bottom="hide-bottom"
        @row:dragstart="dragStartRow"
        @row:dragover="dragOverRow"
        @row:dragend="dragEndRow"
        @row:touchstart="touchStartRow"
        @row:touchmove="touchMoveRow"
        @row:touchend="touchEndRow">

        <template v-slot:body="props">
            <q-tr
            :props="props"
            :draggable="true"
            @mousedown="handleMouseDown"
            @mouseup="handleMouseUp"
            @dragstart="dragStartRow($event, props.row)"
            @dragover="dragOverRow(props.row)"
            @dragend="dragEndRow(props.row)"
            @touchstart="touchStartRow($event, props.row)"
            @touchmove="touchMoveRow($event)"
            @touchend="touchEndRow"
            >
            <q-td
                v-for="col in props.cols"
                :key="col.name"
                :props="props"
            >
            <span v-if="col.name == 'Growth'" :style="[props.row.Growth < 0 ? 'color:red;' : props.row.Growth > 0 ? 'color:green;' : '']">
                {{props.row.Growth.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
            </span>
            <span v-else-if="col.name == 'GrowthLastMonth'" :style="[props.row.GrowthLastMonth < 0 ? 'color:red;' : props.row.GrowthLastMonth > 0 ? 'color:green;' : '']">
                {{props.row.GrowthLastMonth.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
            </span>
            <span v-else-if="col.name == 'GrowthLastYear'" :style="[props.row.GrowthLastYear < 0 ? 'color:red;' : props.row.GrowthLastYear > 0 ? 'color:green;' : '']">
                {{props.row.GrowthLastYear.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
            </span>
            <span v-else-if="col.name == 'RewardItem'" ::style="`text-align:${props.col.align};cursor: pointer;`">
                {{props.row.RewardItem.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
                <q-tooltip anchor="center right" self="center middle">
                    <div style="font-size: 12px">Average pack back period to redeem this reward: {{props.row.payback_period}} months</div>
                    <div style="font-size: 10px">Member's average transaction: RM {{props.row.AvgSpend}} / {{props.row.AvgTxn}} per month</div>
                </q-tooltip>                
            </span>
             <span v-else>
                 {{ props.row[col.name] }}

             </span>           
            </q-td>  
            </q-tr>
        </template>

      <!-- {{ rows }} -->

          <template v-slot:header="props">
              <q-tr :props="props">
              <q-th
                  v-for="col in props.cols"
                  :key="col.name"
                  :props="props"
                  :draggable="true"
                  @dragstart="dragStart(col)"
                  @dragover="dragOver(col)"
                  @drop="drop(col)"
                  @touchstart="touchStart(col)"
                  @touchmove="touchMove($event)"
                  @touchend="touchEnd"
              >
                  <q-tooltip v-if="col.tooltip" anchor="top middle" self="center middle" style="font-size: 13px;">
                  {{ col.tooltip }}
                  </q-tooltip>
                <!-- <div class="row line_break">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"> -->
                    <span class="line_break" v-html="col.label" />
                  <!-- </div> -->
                   <!-- </div> -->
                  <!-- {{ col.label }} -->
              </q-th>
              </q-tr>
          </template>

          <template v-slot:top-right v-if="search_bar">
            <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-7 col-lg-7 col-xl-7">
                    <q-select :disable="shouldDisable" dense outlined square :readonly="readonly ? true : false" v-model="bind_value"
                    :options="get_arr" :value="get_arr" />
                </div>
                <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5 col-xl-5">
                    <q-input :disable="shouldDisable || shouldBindDisable" dense outlined square :hint="hint" :mask="format" reverse-fill-mask :no_label="no_label" :readonly="readonly ? true : false" v-on:change="handleChange" v-model="filter">
                      <template v-slot:append>
                        <q-icon name="search"/>
                      </template>
                    </q-input>
                </div>
            </div> 

            <!-- <q-input filled borderless dense v-model="filter" placeholder="Search">
                <template v-slot:append>
                    <q-icon name="search"></q-icon>
                </template>
            </q-input> -->

             <q-btn v-if="top_button" v-on:click="header_button()" label="NEW"  dense flat ripple class="top_button q-py-none" style="background-color:#362e4b !important; font-size: 13px;color:white; ">
                  <q-tooltip>
                      Create
                  </q-tooltip>
              </q-btn>

          </template>

          <template v-slot:top-left>

            <div class="row">
                <div class="text-bold" v-if="round_off">
                    <q-checkbox left-label v-model="change_value" label="'000" 
                        @update:model-value="handleChange" style="color: #51486c"/>
                </div>
                <div class="text-bold" v-else-if="filter_info">
                    <q-chip square icon="filter_alt" class="float-right">
                        <div class="ellipsis">
                            {{ filter_info }}
                            <q-tooltip v-if="$q.screen.lt.sm">{{ filter_info }}</q-tooltip>
                        </div>
                    </q-chip>
                </div>
    
                <!-- <span class="text-bold" style="color: #51486c; ">
                    {{extra_title}}
                    <br/>
                    {{extra_title1}}
                </span> -->
            </div>

          </template>

          <template v-slot:body-cell-action="props">
              <q-td>

                  <q-btn icon="visibility" color="info" dense outline ripple class="q-mr-sm" v-on:click="action(props.row)"
                  v-if="action_button">
                      <q-tooltip>
                          Action
                      </q-tooltip>
                  </q-btn>

                  <q-btn icon="edit_note" style="background-color:#362e4b !important; color:white;" dense ripple class="q-mr-sm" v-on:click="edit(props.row)"
                  v-if="edit_button">
                      <q-tooltip>
                          Edit
                      </q-tooltip>
                  </q-btn>

                  <q-btn icon="view_list" color="positive" dense outline ripple class="q-mr-sm" v-on:click="list(props.row)"
                  v-if="view_button">
                      <q-tooltip>
                          View
                      </q-tooltip>
                  </q-btn>

                  <q-btn icon="delete" color="negative" dense ripple class="q-mr-sm" v-on:click="remove(props.row)"
                  v-if="delete_button">
                      <q-tooltip>
                          Delete
                      </q-tooltip>
                  </q-btn>
                  <!-- if the word is blue in @click means that it unable to detect the words; yellow color means enable to detect the wprds -->

              </q-td>
          </template>

           <template v-slot:body-cell-Store="props">
              <q-td :style="[props.row.UpdateStat > 0 ? 'color:red;' : '']">
                <!-- {{props.value}} -->
                <div v-if="props.row.UpdateStat > 0">
                  <label style="font-weight:bold;">
                    * {{props.value}}
                    <!-- Last update  -->
                    <!-- {{props.row.LastUpdatedDate}} -->
                  </label>
                </div>

                <span v-else>{{props.value}}</span>

                <q-tooltip anchor="top right" v-if="props.row.UpdateStat > 0" :style="`font-size:13px;font-weight:bold;`">
                    * Last update {{props.row.LastUpdatedDate}}
                </q-tooltip>

              </q-td>
            </template>

          <template v-slot:body-cell-isactive="props">
              <q-td >
                  {{map_isactive(props.row)}}
              </q-td>
          </template>
          <!-- :style="['font-weight:bold', 'background-color:#ededed' ]" -->

          <template v-slot:bottom-row v-if="!filter">           
            <q-tr v-if="table_footer5" class="table_footer">
                  <q-td>
                    <q-tooltip anchor="top middle" self="center middle" style="font-size: 11px;">
                      Item Description
                    </q-tooltip>
                      {{ table_footer5.Description }}
                  </q-td>
                  <q-td v-if="change_value == false" class="text-right">
                    <q-tooltip anchor="top middle" self="center middle" style="font-size: 11px;">
                      Previous Sales Amount
                    </q-tooltip>
                      {{ table_footer5.SalesAmountPrevious }}
                  </q-td>
                  <q-td v-else class="text-right">
                    <q-tooltip anchor="top middle" self="center middle" style="font-size: 11px;">
                      Previous Sales Amount
                    </q-tooltip>
                      {{ sales.SalesAmountPrevious }}
                  </q-td>
                  <q-td v-if="change_value == false" class="text-right">
                    <q-tooltip anchor="top middle" self="center middle" style="font-size: 11px;">
                      Current Sales Amount
                    </q-tooltip>
                      {{ table_footer5.SalesAmountCurrent }}
                  </q-td>         
                  <q-td v-else class="text-right">
                    <q-tooltip anchor="top middle" self="center middle" style="font-size: 11px;">
                      Current Sales Amount
                    </q-tooltip>
                      {{ sales.SalesAmountCurrent }}
                  </q-td>       
                  <q-td :style="['text-align:right', table_footer5.Growth < 0 ? 'color:red;' : table_footer5.Growth > 0 ? 'color:green;' : '']">
                    <q-tooltip anchor="top middle" self="center middle" style="font-size: 11px;">
                      Growth
                    </q-tooltip>
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
    data () {
      return {
        // json_container: this.json,
        originalRows: this.table_data,
        columns: this.table_column,
        // loading: true,
        rows: [],
        filter: "",
        change_value: false,
        sales: {
         SalesAmountPrevious:'',
         SalesAmountCurrent: ''
        },
        bind_value: '',
        get_arr:[],
        get_arr1:[],
        format:'',
        isDragging: false,
        draggedCol: null,
        draggedRow: null,
        draggingCol: null,
        initialX: null,
        dragInProgress: false,
        draggingRow: null,
        initialYRow: null,
        dragInProgressRow: false,
        columnWidth: 0,
        isMouseDown: false,
        saved_column: [],
        
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
        'text',
        'pass_value',
        'dbComponentBehavior',
        'no_label',
        'readonly',
        'options',
        'mask',
        'hint',
        'isAssociation',
        'haveRowClick'
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
    shouldDisable() {
      return this.change_value ? true : false;
    },
    shouldBindDisable() {
      return this.bind_value ? false : true;
    }

    },
    methods: {

// columns desktops
      dragStart(col) {
    //    console.log(col)
       this.draggedCol = col;
      },
      dragOver(col) {
       if (col === this.draggedCol) return;

       // need to make sure toIndex will not -1; ccause -1 said they unbale to find the position (undefined)
       const fromIndex = this.columns.findIndex((c) => c.name === this.draggedCol.name);

       const toIndex = this.columns.findIndex((c) => c.name === col.name);

       this.columns.splice(toIndex, 0, this.columns.splice(fromIndex, 1)[0]);

       // Save the updated state to Local Storage
       localStorage.setItem('tableState', JSON.stringify(this.columns));
      },
      drop() {
       this.draggedCol = null;
      },

// desktop rows
      dragStartRow(event, row) {

    //    this.$emit('desktop-start-row', event, row);

       event.dataTransfer.effectAllowed = 'move';
       event.dataTransfer.setData('text/plain', JSON.stringify(row));
       this.draggedRow = row;
       this.isDragging = true;
    //    console.log(row);

      },
      dragOverRow(row){
        if (this.draggedRow && this.draggedRow !== row) {
            let fromIndex = this.rows.indexOf(this.draggedRow);
            let toIndex = this.rows.indexOf(row);

            if (fromIndex < toIndex) {
                toIndex--;
            }

            // row.sequence = fromIndex
            // this.draggedRow.sequence = toIndex

            this.rows.splice(toIndex, 0, this.rows.splice(fromIndex, 1)[0]);

            /* Save the updated state to Local Storage */
            sessionStorage.setItem('rowState', JSON.stringify(this.rows));

        }

      },
      dragEndRow(){
        this.draggedRow = null;
      },

// mobile column
     touchStart(col) {

    //   console.log('col:', col)
    //   console.log('event:', event)

      this.draggingCol = col;
      this.initialX = event.touches[0].clientX;
      this.dragInProgress = true;
    //   console.log('this.initialX:',this.initialX)
     },

     touchMove(event) {
        if (this.dragInProgress) {
        event.preventDefault();
        const currentX = event.touches[0].clientX;
        const rect = this.$refs.table.$el.getBoundingClientRect();
        const x = currentX - rect.left;
        const colCount = this.columns.length;
        const colWidth = rect.width / colCount;
        const targetColumnIndex = Math.max(0, Math.min(colCount - 1, Math.floor(x / colWidth)));
        const draggedColumnIndex = this.columns.indexOf(this.draggingCol);
        if (draggedColumnIndex !== targetColumnIndex) {
            this.columns.splice(targetColumnIndex, 0, this.columns.splice(draggedColumnIndex, 1)[0]);
        }

        localStorage.setItem('columnStateMobile', JSON.stringify(this.columns));

        }         
     },
     touchEnd() {
      this.dragInProgress = false;
      this.draggingCol = null;
      this.initialX = null;
     },

// mobile rows
      touchStartRow(event, row) {
        this.draggingRow = row;
        this.initialYRow = event.touches[0].clientY;
        this.dragInProgressRow = true;
      },
      touchMoveRow(event) {
        if (this.dragInProgressRow) {
            event.preventDefault();
            const currentY = event.touches[0].clientY;
            const rect = this.$refs.table.$el.getBoundingClientRect();
            const y = currentY - rect.top;
            const rowCount = this.rows.length;
            const rowHeight = rect.height / rowCount;
            const targetRowIndex = Math.max(0, Math.min(rowCount - 1, Math.floor(y / rowHeight)));
            const draggedRowIndex = this.rows.indexOf(this.draggingRow);
            if (draggedRowIndex !== targetRowIndex) {
            this.rows.splice(targetRowIndex, 0, this.rows.splice(draggedRowIndex, 1)[0]);
            }

            localStorage.setItem('rowStateMobile', JSON.stringify(this.rows));

        }
      },
      touchEndRow(){
      this.dragInProgressRow = false;
      this.draggingRow = null;
      this.initialYRow = null;
      },

      unformatAmount(value,type) //when user want to return value back to original
      {
        value = value.toString();

        if(type == "$")
        {
            var value = Number(value).toFixed(2);
        }
        else if(type == "%")
        {
            var value = Number(value).toFixed(1);
        }
        else if(type == "qty")
        {
            var value = Number(value).toFixed(0);
        }
        else
        {
            var value = value;
        }

        return value.replaceAll(',','')
        },
        filteredData(rows, terms) {
            var val = this.bind_value.value // in q-select only; if components Select no need
  
            var array = []

            for (var i = 0; i < rows.length; i++){
                var obj = {};
                var r = Object.keys(rows[i])

                for (var k=0; k < r.length; k++){
                    var field = r[k];
                    if(this.isAssociation){
                        obj[field] = rows[i][field]
                    } else {
                        obj[field] = this.unformatAmount(rows[i][field])
                    }
                }
                array.push(obj)

            }
            var filter = terms.toUpperCase()

            return array.filter(el => {
                return el[val].toString().toUpperCase().includes(filter);
            })

        },
        handleChangeSelect(newVal){
            this.$nextTick(()=>{
            Object.keys(this.table_column).forEach((index)=>{             
            if(this.bind_value == this.table_column[index].field){
                var mask = this.table_column[index].mask;
                this.format = mask;
            }                
            })                
            }, 300)

            this.$emit('receiveChange', newVal)
        },
        handleChange(newVal) {
            this.$emit('update:pass_value', newVal)
            this.$emit('receiveChange', newVal)
            this.$emit('change', newVal)
        },
        header_button: function(payload)
        {
            this.$emit('head_button', payload)       
        },
        action: function(payload)
        {
            this.$emit('main_action', payload)
        },
        edit: function(payload)
        {
            this.$emit('main_edit', payload)
        },
        list: function(payload)
        {
            this.$emit('main_list', payload)
        },
        remove: function(payload)
        {
            this.$emit('main_delete', payload)
        },
        handleMouseDown(row, event) {
            this.isDragging = false;
        },
        handleMouseUp() {
            if (!this.isDragging) {
                // console.log('here')
                this.handleRowClick(this.draggedRow);
            }
        },
        handleRowClick: function(row)
        {
            // console.log('row:',row)
            this.$emit('RowClick',row) 
        } 
    },
    updated(){
        this.get_arr = [];
        this.$nextTick(()=>{
            // console.log('columns in update:',this.columns)
        Object.keys(this.table_column).forEach((index)=>{
            var label = this.table_column[index].label;
            var value = this.table_column[index].field;
            var object = {
                label: label,
                value: value
            };
            this.get_arr.push(object)
        });            
        // console.log(this.get_arr)
        })
    },

    watch: {
      table_column(newVal)
      {
        const savedRows = localStorage.getItem('tableState');
        // const savedRows = sessionStorage.getItem('rowState');

        if (savedRows) { 
            this.columns = JSON.parse(savedState);
        } else {
            this.columns = newVal;
        }

        const savedColumnMobile = localStorage.getItem('columnStateMobile');

        if (savedColumnMobile) {
            this.columns = JSON.parse(savedColumnMobile);
        } else {
            this.columns = newVal;
        }

        //   console.log(newVal)
        // this.columns = newVal;
        // console.log(this.columns)
      },
      table_data(newVal)
      {
        const savedRows = localStorage.getItem('rowState');
        // const savedRows = sessionStorage.getItem('rowState');

        if (savedRows) {
            this.rows = JSON.parse(savedRows);
        } else {
            this.rows = newVal.data.results;
        }

        const savedRowMobile = localStorage.getItem('rowStateMobile');

        if (savedRowMobile) {
            this.rows = JSON.parse(savedRowMobile);
        }else {
            this.rows = newVal.data.results;
        }

        // console.log('rows in table 3 ori:',this.rows)
        // this.draggable = true
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
      json(newVal)
      {
        //   console.log(newVal)
        this.change_value = true
        this.json_container = newVal;
        // console.log(this.json_container)
        //   this.loading = false;
      },
      pass_value(newVal)
      {
        this.bind_value = newVal;
      }
    }
}
</script>

<style scoped>
* >>> .table_footer
{
  font-weight: bold;
  background-color: #ededed !important; 
}

.table_footer
{
  font-weight: bold;
  background-color: #ededed !important;
}

* >>> .table_footers
{
  background-color: white;
}

.table_footers
{
  background-color: white;
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
/* .grab-cursor {
  cursor: grab;
} */
.q-table__row:hover {
  cursor: grab;
}
/* #tableId tr[row-click="handleRowClick"] {
cursor: pointer;
}
.main_table tr {
cursor: default;
} */
/* change the size of sorting icon */
* >>> .q-table__sort-icon{
    width: 12px;
    height: 12px;
}
</style>
