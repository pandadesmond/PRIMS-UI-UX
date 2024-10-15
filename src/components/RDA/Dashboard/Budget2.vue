<template>
   <div class="q-pa-md test" style="overflow-x: auto;width: 100%;">
    <q-card class="bg-grey-3 relative-position">

    <q-card-section style="padding: 0px;">
        
    <!-- <span>{{formatAmount(json_data.Division_Total.Details_month_to_date.Sales.Sales_TY_amount,'%')}}</span> -->
    <q-table class="table_budget_2"
      :title="table_title"
      separator="vertical"
      :dense="true"
        :rows="rows"
      :columns="columns"
      virtual-scroll
      style="height: 82vh;"
    >

      <!-- <template v-slot:top>
        Top
      </template> -->
    <template v-slot:top>
        <div style="width: 100%;">
            <div class="row">

                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" style="display: flex;">
                
                    <span style="font-size: 20px; letter-spacing: 0.005em; font-weight: 400;">{{table_title}}</span>
                    
                    <!-- <div style="border: 1px solid black;margin-left: 10px;padding-left: 5px; padding-right: 5px;">
                        <span style="font-weight: bold;">$000s</span>
                        <Checkbox
                        :disable="false"
                        :no_label="true"
                        v-model="amount_type"
                        :dbComponentBehavior="dbComponentBehavior.text"
                        style="margin-left: -10px; margin-right: -6px;padding-left: 5px;" />
                    </div> -->
                </div>

                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" style="display: flex;">

                    <div style="border: 1px solid black;margin-left: auto; padding-left: 5px; padding-right: 5px; margin-right: 5px;">
                        <span style="font-weight: bold;">$000s</span>
                        <Checkbox
                        :disable="false"
                        :no_label="true"
                        v-model="amount_type"
                        :dbComponentBehavior="dbComponentBehavior.text"
                        style="margin-left: -10px; margin-right: -6px;padding-left: 5px;" />
                    </div>

                    <q-btn
                        color="primary"
                        icon-right="archive"
                        label="Export"
                        no-caps
                        @click="exportToExcel"
                        style="float: right;"
                    />
                </div>
            
            </div>

        </div>
      </template>

      <template v-slot:header="props">


        <q-tr :props="props" style="background-color: #295fbd; color: white;">
            <q-th style="background-color: white;position: sticky; left: 0;background-color:white;z-index: 120;color: black;"></q-th>
            <!-- <q-th style="padding: 0px;background-color: white;color: black;border: 0px;text-align: right;left: 505px;z-index: 120;">$000s</q-th> -->

            <q-th style="padding: 0px;min-width: 5px;max-width: 5px;border:0px;background-color:white;text-align: center;"></q-th>
            <q-th colspan="7"  style="border-right: 1px solid black;">Day-to-Date {{ json_data.Day_to_Date ? `( ${json_data.Day_to_Date} )` : '' }}</q-th>

            <q-th style="padding: 0px;min-width: 5px;max-width: 5px;border:0px;background-color:white;text-align: center;"></q-th>
            <q-th colspan="7"  style="border-right: 1px solid black;background-color: #2f3a4d;">Week-to-Date {{ json_data.Week_to_Date ? `( ${json_data.Week_to_Date} )` : '' }}</q-th>

            <q-th style="padding: 0px;background-color: white;border: 0px;"></q-th>
            <q-th colspan="7">Month-to-Date</q-th>
            <!-- <q-th style="border-top:0px;border-bottom:0px;background-color: white;padding: 0px;"></q-th>
            <q-th style="border-right: 1px solid black;">Outlet</q-th>
            <q-th style="border-top:0px;border-bottom:0px;background-color: white;padding: 0px;"></q-th> -->
            <q-th style="padding: 0px;background-color: white;border: 0px;"></q-th>
            <q-th colspan="7" style="border-right: 1px solid black;background-color: #2f3a4d;">Year-to-Date</q-th>
        </q-tr>



        <q-tr :props="props" style="background-color: #e0ebff; color:black; cursor: pointer;">


            <q-th style="min-width: 120px;max-width: 120px;background-color: white;border: 0px;position: sticky; left: 0;z-index: 119;"></q-th>
            <!-- <q-th style="padding: 0px;min-width: 5px;max-width: 5px;border:0px;background-color:white;text-align: center;"></q-th> -->
<!-- 
            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;text-align: center;">TY</q-th>
            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;text-align: center;">BUD</q-th>
            <q-th colspan="2" style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;text-align: center;">vs Bud</q-th>
            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;text-align: center;">LY</q-th>
            <q-th colspan="2" style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;border-right: 1px solid black;text-align: center;">vs LY</q-th> -->

            <!-- <q-th style="min-width: 120px; max-width: 120px;border-top:1px solid black;border-bottom: 1px solid black;text-align: center;">TY</q-th>
            <q-th style="min-width: 120px; max-width: 120px;border-top:1px solid black;border-bottom: 1px solid black;text-align: center;">BUD</q-th>
            <q-th colspan="2" style="min-width: 120px; max-width: 120px;border-top:1px solid black;border-bottom: 1px solid black;text-align: center;">vs BUD</q-th>
            <q-th style="min-width: 120px; max-width: 120px;border-top:1px solid black;border-bottom: 1px solid black;text-align: center;">LY</q-th>
            <q-th colspan="2" style="min-width: 120px; max-width: 120px;border-top:1px solid black;border-bottom: 1px solid black;text-align: center;">vs LY</q-th>
             -->

            <q-th style="padding: 0px;min-width: 5px;max-width: 5px;border:0px;background-color:white;text-align: center;"></q-th>

            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;text-align: center;" @click="handleSortingColumn('Details_to_date.Sales_TY_amount')">TY  <q-icon v-if="active_sorting_column == 'Details_to_date.Sales_TY_amount'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;text-align: center;" @click="handleSortingColumn('Details_to_date.Budget_TY_amount')">BUD  <q-icon v-if="active_sorting_column == 'Details_to_date.Budget_TY_amount'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th colspan="2" style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;text-align: center;" @click="handleSortingColumn('Details_to_date.vsBud')">vs Bud  <q-icon v-if="active_sorting_column == 'Details_to_date.vsBud'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;text-align: center;" @click="handleSortingColumn('Details_to_date.Sales_LY_amount')">LY  <q-icon v-if="active_sorting_column == 'Details_to_date.Sales_LY_amount'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th colspan="2" style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;border-right: 1px solid black;text-align: center;" @click="handleSortingColumn('Details_to_date.vsLY')">vs LY  <q-icon v-if="active_sorting_column == 'Details_to_date.vsLY'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>



            <q-th style="padding: 0px;min-width: 5px;max-width: 5px;border:0px;background-color:white;text-align: center;"></q-th>

            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;text-align: center;" @click="handleSortingColumn('Details_week_to_date.Sales_TY_amount')">TY  <q-icon v-if="active_sorting_column == 'Details_week_to_date.Sales_TY_amount'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;text-align: center;" @click="handleSortingColumn('Details_week_to_date.Budget_TY_amount')">BUD  <q-icon v-if="active_sorting_column == 'Details_week_to_date.Budget_TY_amount'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th colspan="2" style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;text-align: center;" @click="handleSortingColumn('Details_week_to_date.vsBud')">vs Bud  <q-icon v-if="active_sorting_column == 'Details_week_to_date.vsBud'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;text-align: center;" @click="handleSortingColumn('Details_week_to_date.Sales_LY_amount')">LY  <q-icon v-if="active_sorting_column == 'Details_week_to_date.Sales_LY_amount'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th colspan="2" style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;border-right: 1px solid black;text-align: center;" @click="handleSortingColumn('Details_week_to_date.vsLY')">vs LY  <q-icon v-if="active_sorting_column == 'Details_week_to_date.vsLY'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>



            <q-th style="padding: 0px;min-width: 5px;max-width: 5px;border:0px;background-color:white;text-align: center;"></q-th>

            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;text-align: center;" @click="handleSortingColumn('Details_month_to_date.Sales_TY_amount')">TY  <q-icon v-if="active_sorting_column == 'Details_month_to_date.Sales_TY_amount'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;text-align: center;" @click="handleSortingColumn('Details_month_to_date.Budget_TY_amount')">BUD  <q-icon v-if="active_sorting_column == 'Details_month_to_date.Budget_TY_amount'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th colspan="2" style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;text-align: center;" @click="handleSortingColumn('Details_month_to_date.vsBud')">vs Bud  <q-icon v-if="active_sorting_column == 'Details_month_to_date.vsBud'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;text-align: center;" @click="handleSortingColumn('Details_month_to_date.Sales_LY_amount')">LY  <q-icon v-if="active_sorting_column == 'Details_month_to_date.Sales_LY_amount'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th colspan="2" style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;border-right: 1px solid black;text-align: center;" @click="handleSortingColumn('Details_month_to_date.vsLY')">vs LY  <q-icon v-if="active_sorting_column == 'Details_month_to_date.vsLY'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>

            <q-th style="padding: 0px;min-width: 5px;max-width: 5px;border:0px;background-color:white;text-align: center;"></q-th>

            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;text-align: center;" @click="handleSortingColumn('Details_year_to_date.Sales_TY_amount')">TY <q-icon v-if="active_sorting_column == 'Details_year_to_date.Sales_TY_amount'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;text-align: center;" @click="handleSortingColumn('Details_year_to_date.Budget_TY_amount')">BUD <q-icon v-if="active_sorting_column == 'Details_year_to_date.Budget_TY_amount'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th colspan="2" style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;text-align: center;" @click="handleSortingColumn('Details_year_to_date.vsBud')">vs BUD <q-icon v-if="active_sorting_column == 'Details_year_to_date.vsBud'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;text-align: center;" @click="handleSortingColumn('Details_year_to_date.Sales_LY_amount')">LY <q-icon v-if="active_sorting_column == 'Details_year_to_date.Sales_LY_amount'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th colspan="2" style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;text-align: center;" @click="handleSortingColumn('Details_year_to_date.vsLY')">vs LY <q-icon v-if="active_sorting_column == 'Details_year_to_date.vsLY'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>

        </q-tr>


      </template>


      <!-- <template v-slot:top-row>
        <q-tr>
          <q-td colspan="9">
            Top row
          </q-td>
        </q-tr>
      </template> -->
      <template v-slot:body="props">

        <template  v-for="(sales_by_am_details, index) in json_data.SalesByAM" :key="sales_by_am_details">
            <q-tr :class="[index+1 == json_data.SalesByAM.length && 'last_row table_row', 'table_row']">
                <template v-if="sales_by_am_details.State">
                            <!-- <q-td style="position: sticky; left: 0px; z-index: 119; background-color: white; font-weight: bold;text-align: center;border: 0px;" ></q-td> -->
                            <!-- <q-td style="position: sticky; left: 25px; z-index: 119; background-color: white; font-weight: bold;text-align:center;" >{{sales_by_am_details.State.Outlet}}</q-td>
                            <q-td style="position: sticky; left: 145px; z-index: 119; background-color: white; font-weight: bold;text-align:center;" >{{sales_by_am_details.State.OutletName}}</q-td>
                            <q-td style="position: sticky; left: 265px; z-index: 119; background-color: white; font-weight: bold;text-align:center;" >{{sales_by_am_details.State.Cohort}}</q-td>
                            <q-td style="position: sticky; left: 385px; z-index: 119; background-color: white; font-weight: bold;text-align:center;" >{{sales_by_am_details.State.State}}</q-td> -->
                            <q-td style="position: sticky; left: 0px; z-index: 119; background-color: white; font-weight: bold;text-align:left;border: 0px;" >{{sales_by_am_details.State.AM}}</q-td>
                            <q-td style="padding: 0px;border: 0px;"></q-td>
                        </template>

                        

                        <template v-if="sales_by_am_details.Details_to_date">
                            <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(sales_by_am_details.Details_to_date.Sales_TY_amount,'$')}}</q-td>
                            <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(sales_by_am_details.Details_to_date.Budget_TY_amount,'$')}}</q-td>
                            <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(sales_by_am_details.Details_to_date.vsBud,'%')}}</q-td>
                            <q-td :style="['padding-left: 2px;padding-left: 2px;',sales_by_am_details.Details_to_date.vsBud >= -1 && sales_by_am_details.Details_to_date.vsBud <= 1 ? 'color: #f8db8f;' : (sales_by_am_details.Details_to_date.vsBud  > 1 ? 'color: green;' : sales_by_am_details.Details_to_date.vsBud < -1 && 'color:red;')]"><center><char style="font-size: 18pt;">&#x25CF;</char></center></q-td>
                            <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(sales_by_am_details.Details_to_date.Sales_LY_amount,'$')}}</q-td>
                            <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(sales_by_am_details.Details_to_date.vsLY,'%')}}</q-td>
                            <q-td :style="['padding-left: 2px;padding-left: 2px;border-right: 1px solid black;',sales_by_am_details.Details_to_date.vsBud >= -1 && sales_by_am_details.Details_to_date.vsBud <= 1 ? 'color: #f8db8f;' : (sales_by_am_details.Details_to_date.vsBud  > 1 ? 'color: green;' : sales_by_am_details.Details_to_date.vsBud < -1 && 'color:red;')]"><center><char style="font-size: 18pt;">&#x25CF;</char></center></q-td>
                            <q-td style="padding: 0px;border: 0px;"></q-td>
                        </template>



                        <template v-if="sales_by_am_details.Details_week_to_date">
                            <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(sales_by_am_details.Details_week_to_date.Sales_TY_amount,'$')}}</q-td>
                            <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(sales_by_am_details.Details_week_to_date.Budget_TY_amount,'$')}}</q-td>
                            <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(sales_by_am_details.Details_week_to_date.vsBud,'%')}}</q-td>
                            <q-td :style="['padding-left: 2px;padding-left: 2px;',sales_by_am_details.Details_week_to_date.vsBud >= -1 && sales_by_am_details.Details_week_to_date.vsBud <= 1 ? 'color: #f8db8f;' : (sales_by_am_details.Details_week_to_date.vsBud  > 1 ? 'color: green;' : sales_by_am_details.Details_week_to_date.vsBud < -1 && 'color:red;')]"><center><char style="font-size: 18pt;">&#x25CF;</char></center></q-td>
                            <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(sales_by_am_details.Details_week_to_date.Sales_LY_amount,'$')}}</q-td>
                            <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(sales_by_am_details.Details_week_to_date.vsLY,'%')}}</q-td>
                            <q-td :style="['padding-left: 2px;padding-left: 2px;border-right: 1px solid black;',sales_by_am_details.Details_week_to_date.vsBud >= -1 && sales_by_am_details.Details_week_to_date.vsBud <= 1 ? 'color: #f8db8f;' : (sales_by_am_details.Details_week_to_date.vsBud  > 1 ? 'color: green;' : sales_by_am_details.Details_week_to_date.vsBud < -1 && 'color:red;')]"><center><char style="font-size: 18pt;">&#x25CF;</char></center></q-td>
                            <q-td style="padding: 0px;border: 0px;"></q-td>
                        </template>


                        <template v-if="sales_by_am_details.Details_month_to_date">
                            <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(sales_by_am_details.Details_month_to_date.Sales_TY_amount,'$')}}</q-td>
                            <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(sales_by_am_details.Details_month_to_date.Budget_TY_amount,'$')}}</q-td>
                            <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(sales_by_am_details.Details_month_to_date.vsBud,'%')}}</q-td>
                            <q-td :style="['padding-left: 2px;padding-left: 2px;',sales_by_am_details.Details_month_to_date.vsBud >= -1 && sales_by_am_details.Details_month_to_date.vsBud <= 1 ? 'color: #f8db8f;' : (sales_by_am_details.Details_month_to_date.vsBud  > 1 ? 'color: green;' : sales_by_am_details.Details_month_to_date.vsBud < -1 && 'color:red;')]"><center><char style="font-size: 18pt;">&#x25CF;</char></center></q-td>
                            <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(sales_by_am_details.Details_month_to_date.Sales_LY_amount,'$')}}</q-td>
                            <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(sales_by_am_details.Details_month_to_date.vsLY,'%')}}</q-td>
                            <q-td :style="['padding-left: 2px;padding-left: 2px;border-right: 1px solid black;',sales_by_am_details.Details_month_to_date.vsBud >= -1 && sales_by_am_details.Details_month_to_date.vsBud <= 1 ? 'color: #f8db8f;' : (sales_by_am_details.Details_month_to_date.vsBud  > 1 ? 'color: green;' : sales_by_am_details.Details_month_to_date.vsBud < -1 && 'color:red;')]"><center><char style="font-size: 18pt;">&#x25CF;</char></center></q-td>
                            <q-td style="padding: 0px;border: 0px;"></q-td>
                        </template>
<!-- 
                        <q-td style="padding: 0px;border: 0px;"></q-td>
                            <template v-if="sales_by_am_details.Outlet">
                                <q-td style="font-size: 13px; font-weight: bold; border-right: 1px solid black;" >{{sales_by_am_details.Outlet.Outlet}}</q-td>
                            </template>
                        <q-td style="padding: 0px;border: 0px;"></q-td> -->

                        <template v-if="sales_by_am_details.Details_year_to_date">
                            <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(sales_by_am_details.Details_year_to_date.Sales_TY_amount,'$')}}</q-td>
                            <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(sales_by_am_details.Details_year_to_date.Budget_TY_amount,'$')}}</q-td>
                            <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(sales_by_am_details.Details_year_to_date.vsBud,'%')}}</q-td>
                            <q-td :style="['padding-left: 2px;padding-left: 2px;',sales_by_am_details.Details_year_to_date.vsBud >= -1 && sales_by_am_details.Details_year_to_date.vsBud <= 1 ? 'color: #f8db8f;' : (sales_by_am_details.Details_year_to_date.vsBud  > 1 ? 'color: green;' : sales_by_am_details.Details_year_to_date.vsBud < -1 && 'color:red;')]"><center><char style="font-size: 18pt;">&#x25CF;</char></center></q-td>
                            <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(sales_by_am_details.Details_year_to_date.Sales_LY_amount,'$')}}</q-td>
                            <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(sales_by_am_details.Details_year_to_date.vsLY,'%')}}</q-td>
                            <q-td :style="['padding-left: 2px;padding-left: 2px;',sales_by_am_details.Details_year_to_date.vsLY >= -1 && sales_by_am_details.Details_year_to_date.vsLY <= 1 ? 'color: #f8db8f;' : (sales_by_am_details.Details_year_to_date.vsLY  > 1 ? 'color: green;' : sales_by_am_details.Details_year_to_date.vsLY < -1 && 'color:red;')]"><center><char style="font-size: 18pt;">&#x25CF;</char></center></q-td>
                            <q-td style="padding: 0px;border: 0px;"></q-td>
                        </template>
            </q-tr>

            <q-tr v-if="(json_data.SalesByAM.length <= 0)">
                <q-td colspan="19" style="border: 1px solid black; text-align: center; font-weight: bold;">No data</q-td>
            </q-tr>
            
        </template>

        <template  v-for="(total_sales_by_am_details, index) in json_data.TotalSalesByAM" :key="total_sales_by_am_details">
            <q-tr :class="[index+1 == json_data.SalesByAM.length && 'last_row table_row', 'table_row']">
                <template v-if="total_sales_by_am_details.State">
                            <!-- <q-td style="position: sticky; left: 0px; z-index: 119; background-color: white; font-weight: bold;text-align: center;border: 0px;" ></q-td> -->
                            <!-- <q-td style="position: sticky; left: 25px; z-index: 119; background-color: white; font-weight: bold;text-align:center;" >{{total_sales_by_am_details.State.Outlet}}</q-td>
                            <q-td style="position: sticky; left: 145px; z-index: 119; background-color: white; font-weight: bold;text-align:center;" >{{total_sales_by_am_details.State.OutletName}}</q-td>
                            <q-td style="position: sticky; left: 265px; z-index: 119; background-color: white; font-weight: bold;text-align:center;" >{{total_sales_by_am_details.State.Cohort}}</q-td>
                            <q-td style="position: sticky; left: 385px; z-index: 119; background-color: white; font-weight: bold;text-align:center;" >{{total_sales_by_am_details.State.State}}</q-td> -->
                            <q-td style="position: sticky; left: 0px; z-index: 119; background-color: white; font-weight: bold;text-align:left;border: 0px;" >{{total_sales_by_am_details.State.AM}}</q-td>
                            <q-td style="padding: 0px;border: 0px;"></q-td>
                        </template>



                        <template v-if="total_sales_by_am_details.Details_to_date">
                            <q-td style="background-color: yellow;font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_sales_by_am_details.Details_to_date.Sales_TY_amount,'$')}}</q-td>
                            <q-td style="background-color: yellow;font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_sales_by_am_details.Details_to_date.Budget_TY_amount,'$')}}</q-td>
                            <q-td style="background-color: yellow;font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_sales_by_am_details.Details_to_date.vsBud,'%')}}</q-td>
                            <q-td :style="['padding-left: 2px;padding-left: 2px;',total_sales_by_am_details.Details_to_date.vsBud >= -1 && total_sales_by_am_details.Details_to_date.vsBud <= 1 ? 'color: #f8db8f;' : (total_sales_by_am_details.Details_to_date.vsBud  > 1 ? 'color: green;' : total_sales_by_am_details.Details_to_date.vsBud < -1 && 'color:red;')]"><center><char style="font-size: 18pt;">&#x25CF;</char></center></q-td>
                            <q-td style="background-color: yellow;font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_sales_by_am_details.Details_to_date.Sales_LY_amount,'$')}}</q-td>
                            <q-td style="background-color: yellow;font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_sales_by_am_details.Details_to_date.vsLY,'%')}}</q-td>
                            <q-td :style="['padding-left: 2px;padding-left: 2px;border-right: 1px solid black;',total_sales_by_am_details.Details_to_date.vsBud >= -1 && total_sales_by_am_details.Details_to_date.vsBud <= 1 ? 'color: #f8db8f;' : (total_sales_by_am_details.Details_to_date.vsBud  > 1 ? 'color: green;' : total_sales_by_am_details.Details_to_date.vsBud < -1 && 'color:red;')]"><center><char style="font-size: 18pt;">&#x25CF;</char></center></q-td>
                            <q-td style="padding: 0px;border: 0px;"></q-td>
                        </template>



                        <template v-if="total_sales_by_am_details.Details_week_to_date">
                            <q-td style="background-color: yellow;font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_sales_by_am_details.Details_week_to_date.Sales_TY_amount,'$')}}</q-td>
                            <q-td style="background-color: yellow;font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_sales_by_am_details.Details_week_to_date.Budget_TY_amount,'$')}}</q-td>
                            <q-td style="background-color: yellow;font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_sales_by_am_details.Details_week_to_date.vsBud,'%')}}</q-td>
                            <q-td :style="['padding-left: 2px;padding-left: 2px;',total_sales_by_am_details.Details_week_to_date.vsBud >= -1 && total_sales_by_am_details.Details_week_to_date.vsBud <= 1 ? 'color: #f8db8f;' : (total_sales_by_am_details.Details_week_to_date.vsBud  > 1 ? 'color: green;' : total_sales_by_am_details.Details_week_to_date.vsBud < -1 && 'color:red;')]"><center><char style="font-size: 18pt;">&#x25CF;</char></center></q-td>
                            <q-td style="background-color: yellow;font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_sales_by_am_details.Details_week_to_date.Sales_LY_amount,'$')}}</q-td>
                            <q-td style="background-color: yellow;font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_sales_by_am_details.Details_week_to_date.vsLY,'%')}}</q-td>
                            <q-td :style="['padding-left: 2px;padding-left: 2px;border-right: 1px solid black;',total_sales_by_am_details.Details_week_to_date.vsBud >= -1 && total_sales_by_am_details.Details_week_to_date.vsBud <= 1 ? 'color: #f8db8f;' : (total_sales_by_am_details.Details_week_to_date.vsBud  > 1 ? 'color: green;' : total_sales_by_am_details.Details_week_to_date.vsBud < -1 && 'color:red;')]"><center><char style="font-size: 18pt;">&#x25CF;</char></center></q-td>
                            <q-td style="padding: 0px;border: 0px;"></q-td>
                        </template>



                        <template v-if="total_sales_by_am_details.Details_month_to_date">
                            <q-td style="background-color: yellow;font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_sales_by_am_details.Details_month_to_date.Sales_TY_amount,'$')}}</q-td>
                            <q-td style="background-color: yellow;font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_sales_by_am_details.Details_month_to_date.Budget_TY_amount,'$')}}</q-td>
                            <q-td style="background-color: yellow;font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_sales_by_am_details.Details_month_to_date.vsBud,'%')}}</q-td>
                            <q-td :style="['padding-left: 2px;padding-left: 2px;',total_sales_by_am_details.Details_month_to_date.vsBud >= -1 && total_sales_by_am_details.Details_month_to_date.vsBud <= 1 ? 'color: #f8db8f;' : (total_sales_by_am_details.Details_month_to_date.vsBud  > 1 ? 'color: green;' : total_sales_by_am_details.Details_month_to_date.vsBud < -1 && 'color:red;')]"><center><char style="font-size: 18pt;">&#x25CF;</char></center></q-td>
                            <q-td style="background-color: yellow;font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_sales_by_am_details.Details_month_to_date.Sales_LY_amount,'$')}}</q-td>
                            <q-td style="background-color: yellow;font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_sales_by_am_details.Details_month_to_date.vsLY,'%')}}</q-td>
                            <q-td :style="['padding-left: 2px;padding-left: 2px;border-right: 1px solid black;',total_sales_by_am_details.Details_month_to_date.vsBud >= -1 && total_sales_by_am_details.Details_month_to_date.vsBud <= 1 ? 'color: #f8db8f;' : (total_sales_by_am_details.Details_month_to_date.vsBud  > 1 ? 'color: green;' : total_sales_by_am_details.Details_month_to_date.vsBud < -1 && 'color:red;')]"><center><char style="font-size: 18pt;">&#x25CF;</char></center></q-td>
                            <q-td style="padding: 0px;border: 0px;"></q-td>
                        </template>

                        <!-- <q-td style="padding: 0px;border: 0px;"></q-td>
                            <template v-if="total_sales_by_am_details.Outlet">
                                <q-td style="font-weight: bold; border-right: 1px solid black;" >{{total_sales_by_am_details.Outlet.Outlet}}</q-td>
                            </template>
                        <q-td style="padding: 0px;border: 0px;"></q-td> -->

                        <template v-if="total_sales_by_am_details.Details_year_to_date">
                            <q-td style="background-color: yellow;font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_sales_by_am_details.Details_year_to_date.Sales_TY_amount,'$')}}</q-td>
                            <q-td style="background-color: yellow;font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_sales_by_am_details.Details_year_to_date.Budget_TY_amount,'$')}}</q-td>
                            <q-td style="background-color: yellow;font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_sales_by_am_details.Details_year_to_date.vsBud,'%')}}</q-td>
                            <q-td :style="['padding-left: 2px;padding-left: 2px;',total_sales_by_am_details.Details_year_to_date.vsBud >= -1 && total_sales_by_am_details.Details_year_to_date.vsBud <= 1 ? 'color: #f8db8f;' : (total_sales_by_am_details.Details_year_to_date.vsBud  > 1 ? 'color: green;' : total_sales_by_am_details.Details_year_to_date.vsBud < -1 && 'color:red;')]"><center><char style="font-size: 18pt;">&#x25CF;</char></center></q-td>
                            <q-td style="background-color: yellow;font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_sales_by_am_details.Details_year_to_date.Sales_LY_amount,'$')}}</q-td>
                            <q-td style="background-color: yellow;font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_sales_by_am_details.Details_year_to_date.vsLY,'%')}}</q-td>
                            <q-td :style="['padding-left: 2px;padding-left: 2px;',total_sales_by_am_details.Details_year_to_date.vsLY >= -1 && total_sales_by_am_details.Details_year_to_date.vsLY <= 1 ? 'color: #f8db8f;' : (total_sales_by_am_details.Details_year_to_date.vsLY  > 1 ? 'color: green;' : total_sales_by_am_details.Details_year_to_date.vsLY < -1 && 'color:red;')]"><center><char style="font-size: 18pt;">&#x25CF;</char></center></q-td>
                        </template>
            </q-tr>

            <q-tr v-if="(json_data.TotalSalesByAM.length <= 0)">
                <q-td colspan="19" style="border: 1px solid black; text-align: center; font-weight: bold;">No data</q-td>
            </q-tr>
        </template>

        <q-tr  v-if="json_data.SalesByAM.length > 0">
            <q-td style="position: sticky; left: 0px; z-index: 119; background-color: white; border: 0px;"></q-td>
            <q-td style="border: 0px; padding: 0px;"></q-td>
            <q-td colspan="7" style="border-bottom: 1px solid black; border-left: 0px; "></q-td>
            <q-td colspan="1" style="border: 0px; padding: 0px;"></q-td>
            <q-td colspan="7" style="border-bottom: 1px solid black; border-left: 0px; "></q-td>
            <q-td colspan="1" style="border: 0px; padding: 0px;"></q-td>
            <q-td colspan="7" style="border-bottom: 1px solid black; border-left: 0px; "></q-td>
            <q-td colspan="1" style="border: 0px; padding: 0px;"></q-td>
            <q-td colspan="7" style="border-bottom: 1px solid black; border-left: 0px; "></q-td>
        </q-tr>

        <template  v-for="(sales_by_cohort_details, index) in json_data.SalesByCohort" :key="sales_by_cohort_details">
            <q-tr :class="[index+1 == json_data.SalesByAM.length && 'last_row table_row', 'table_row']">
                <template v-if="sales_by_cohort_details.State">
                            <!-- <q-td style="position: sticky; left: 0px; z-index: 119; background-color: white; font-weight: bold;text-align: center;border: 0px;" ></q-td> -->
                            <!-- <q-td style="position: sticky; left: 25px; z-index: 119; background-color: white; font-weight: bold;text-align:center;" >{{sales_by_cohort_details.State.Outlet}}</q-td>
                            <q-td style="position: sticky; left: 145px; z-index: 119; background-color: white; font-weight: bold;text-align:center;" >{{sales_by_cohort_details.State.OutletName}}</q-td> -->
                            <q-td style="position: sticky; left: 0px; z-index: 119; background-color: white; font-weight: bold;text-align:left; border: 0px;" >{{sales_by_cohort_details.State.Cohort}}</q-td>
                            <!-- <q-td style="position: sticky; left: 385px; z-index: 119; background-color: white; font-weight: bold;text-align:center;" >{{sales_by_cohort_details.State.State}}</q-td>
                            <q-td style="position: sticky; left: 0px; z-index: 119; background-color: white; font-weight: bold;text-align:center;border-right: 1px solid black;" >{{sales_by_cohort_details.State.AM}}</q-td> -->
                            <q-td style="padding: 0px;border: 0px;"></q-td>
                        </template>



                        <template v-if="sales_by_cohort_details.Details_to_date">
                            <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(sales_by_cohort_details.Details_to_date.Sales_TY_amount,'$')}}</q-td>
                            <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(sales_by_cohort_details.Details_to_date.Budget_TY_amount,'$')}}</q-td>
                            <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(sales_by_cohort_details.Details_to_date.vsBud,'%')}}</q-td>
                            <q-td :style="['padding-left: 2px;padding-left: 2px;',sales_by_cohort_details.Details_to_date.vsBud >= -1 && sales_by_cohort_details.Details_to_date.vsBud <= 1 ? 'color: #f8db8f;' : (sales_by_cohort_details.Details_to_date.vsBud  > 1 ? 'color: green;' : sales_by_cohort_details.Details_to_date.vsBud < -1 && 'color:red;')]"><center><char style="font-size: 18pt;">&#x25CF;</char></center></q-td>
                            <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(sales_by_cohort_details.Details_to_date.Sales_LY_amount,'$')}}</q-td>
                            <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(sales_by_cohort_details.Details_to_date.vsLY,'%')}}</q-td>
                            <q-td :style="['padding-left: 2px;padding-left: 2px;border-right: 1px solid black;',sales_by_cohort_details.Details_to_date.vsBud >= -1 && sales_by_cohort_details.Details_to_date.vsBud <= 1 ? 'color: #f8db8f;' : (sales_by_cohort_details.Details_to_date.vsBud  > 1 ? 'color: green;' : sales_by_cohort_details.Details_to_date.vsBud < -1 && 'color:red;')]"><center><char style="font-size: 18pt;">&#x25CF;</char></center></q-td>
                            <q-td style="padding: 0px;border: 0px;"></q-td>
                        </template>




                        <template v-if="sales_by_cohort_details.Details_week_to_date">
                            <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(sales_by_cohort_details.Details_week_to_date.Sales_TY_amount,'$')}}</q-td>
                            <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(sales_by_cohort_details.Details_week_to_date.Budget_TY_amount,'$')}}</q-td>
                            <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(sales_by_cohort_details.Details_week_to_date.vsBud,'%')}}</q-td>
                            <q-td :style="['padding-left: 2px;padding-left: 2px;',sales_by_cohort_details.Details_week_to_date.vsBud >= -1 && sales_by_cohort_details.Details_week_to_date.vsBud <= 1 ? 'color: #f8db8f;' : (sales_by_cohort_details.Details_week_to_date.vsBud  > 1 ? 'color: green;' : sales_by_cohort_details.Details_week_to_date.vsBud < -1 && 'color:red;')]"><center><char style="font-size: 18pt;">&#x25CF;</char></center></q-td>
                            <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(sales_by_cohort_details.Details_week_to_date.Sales_LY_amount,'$')}}</q-td>
                            <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(sales_by_cohort_details.Details_week_to_date.vsLY,'%')}}</q-td>
                            <q-td :style="['padding-left: 2px;padding-left: 2px;border-right: 1px solid black;',sales_by_cohort_details.Details_week_to_date.vsBud >= -1 && sales_by_cohort_details.Details_week_to_date.vsBud <= 1 ? 'color: #f8db8f;' : (sales_by_cohort_details.Details_week_to_date.vsBud  > 1 ? 'color: green;' : sales_by_cohort_details.Details_week_to_date.vsBud < -1 && 'color:red;')]"><center><char style="font-size: 18pt;">&#x25CF;</char></center></q-td>
                            <q-td style="padding: 0px;border: 0px;"></q-td>
                        </template>





                        <template v-if="sales_by_cohort_details.Details_month_to_date">
                            <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(sales_by_cohort_details.Details_month_to_date.Sales_TY_amount,'$')}}</q-td>
                            <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(sales_by_cohort_details.Details_month_to_date.Budget_TY_amount,'$')}}</q-td>
                            <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(sales_by_cohort_details.Details_month_to_date.vsBud,'%')}}</q-td>
                            <q-td :style="['padding-left: 2px;padding-left: 2px;',sales_by_cohort_details.Details_month_to_date.vsBud >= -1 && sales_by_cohort_details.Details_month_to_date.vsBud <= 1 ? 'color: #f8db8f;' : (sales_by_cohort_details.Details_month_to_date.vsBud  > 1 ? 'color: green;' : sales_by_cohort_details.Details_month_to_date.vsBud < -1 && 'color:red;')]"><center><char style="font-size: 18pt;">&#x25CF;</char></center></q-td>
                            <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(sales_by_cohort_details.Details_month_to_date.Sales_LY_amount,'$')}}</q-td>
                            <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(sales_by_cohort_details.Details_month_to_date.vsLY,'%')}}</q-td>
                            <q-td :style="['padding-left: 2px;padding-left: 2px;border-right: 1px solid black;',sales_by_cohort_details.Details_month_to_date.vsBud >= -1 && sales_by_cohort_details.Details_month_to_date.vsBud <= 1 ? 'color: #f8db8f;' : (sales_by_cohort_details.Details_month_to_date.vsBud  > 1 ? 'color: green;' : sales_by_cohort_details.Details_month_to_date.vsBud < -1 && 'color:red;')]"><center><char style="font-size: 18pt;">&#x25CF;</char></center></q-td>
                            <q-td style="padding: 0px;border: 0px;"></q-td>
                        </template>

                        <!-- <q-td style="padding: 0px;border: 0px;"></q-td>
                            <template v-if="sales_by_cohort_details.Outlet">
                                <q-td style="font-weight: bold; border-right: 1px solid black;" >{{sales_by_cohort_details.Outlet.Outlet}}</q-td>
                            </template>
                        <q-td style="padding: 0px;border: 0px;"></q-td> -->

                        <template v-if="sales_by_cohort_details.Details_year_to_date">
                            <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(sales_by_cohort_details.Details_year_to_date.Sales_TY_amount,'$')}}</q-td>
                            <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(sales_by_cohort_details.Details_year_to_date.Budget_TY_amount,'$')}}</q-td>
                            <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(sales_by_cohort_details.Details_year_to_date.vsBud,'%')}}</q-td>
                            <q-td :style="['padding-left: 2px;padding-left: 2px;',sales_by_cohort_details.Details_year_to_date.vsBud >= -1 && sales_by_cohort_details.Details_year_to_date.vsBud <= 1 ? 'color: #f8db8f;' : (sales_by_cohort_details.Details_year_to_date.vsBud  > 1 ? 'color: green;' : sales_by_cohort_details.Details_year_to_date.vsBud < -1 && 'color:red;')]"><center><char style="font-size: 18pt;">&#x25CF;</char></center></q-td>
                            <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(sales_by_cohort_details.Details_year_to_date.Sales_LY_amount,'$')}}</q-td>
                            <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(sales_by_cohort_details.Details_year_to_date.vsLY,'%')}}</q-td>
                            <q-td :style="['padding-left: 2px;padding-left: 2px;',sales_by_cohort_details.Details_year_to_date.vsLY >= -1 && sales_by_cohort_details.Details_year_to_date.vsLY <= 1 ? 'color: #f8db8f;' : (sales_by_cohort_details.Details_year_to_date.vsLY  > 1 ? 'color: green;' : sales_by_cohort_details.Details_year_to_date.vsLY < -1 && 'color:red;')]"><center><char style="font-size: 18pt;">&#x25CF;</char></center></q-td>
                        </template>
            </q-tr>

            <q-tr v-if="(json_data.SalesByCohort.length <= 0)">
                <q-td colspan="19" style="border: 1px solid black; text-align: center; font-weight: bold;">No data</q-td>
            </q-tr>

        </template>

        <template  v-for="(total_sales_by_cohort_details, index) in json_data.TotalSalesByCohort" :key="total_sales_by_cohort_details">
            <q-tr :class="[index+1 == json_data.SalesByAM.length && 'last_row table_row', 'table_row']">
                <template v-if="total_sales_by_cohort_details.State">
                            <!-- <q-td style="position: sticky; left: 0px; z-index: 119; background-color: white; font-weight: bold;text-align: center;border: 0px;" ></q-td> -->
                            <!-- <q-td style="position: sticky; left: 25px; z-index: 119; background-color: white; font-weight: bold;text-align:center;" >{{total_sales_by_cohort_details.State.Outlet}}</q-td>
                            <q-td style="position: sticky; left: 145px; z-index: 119; background-color: white; font-weight: bold;text-align:center;" >{{total_sales_by_cohort_details.State.OutletName}}</q-td> -->
                            <q-td style="position: sticky; left: 0px; z-index: 119; background-color: white; font-weight: bold;text-align:left; border: 0px;" >{{total_sales_by_cohort_details.State.Cohort}}</q-td>
                            <!-- <q-td style="position: sticky; left: 385px; z-index: 119; background-color: white; font-weight: bold;text-align:center;" >{{total_sales_by_cohort_details.State.State}}</q-td>
                            <q-td style="position: sticky; left: 0px; z-index: 119; background-color: white; font-weight: bold;text-align:center;border-right: 1px solid black;" >{{total_sales_by_cohort_details.State.AM}}</q-td> -->
                            <q-td style="padding: 0px;border: 0px;"></q-td>
                        </template>


                        <template v-if="total_sales_by_cohort_details.Details_to_date">
                            <q-td style="background-color: yellow; font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_sales_by_cohort_details.Details_to_date.Sales_TY_amount,'$')}}</q-td>
                            <q-td style="background-color: yellow; font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_sales_by_cohort_details.Details_to_date.Budget_TY_amount,'$')}}</q-td>
                            <q-td style="background-color: yellow; font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_sales_by_cohort_details.Details_to_date.vsBud,'%')}}</q-td>
                            <q-td :style="['padding-left: 2px;padding-left: 2px;',total_sales_by_cohort_details.Details_to_date.vsBud >= -1 && total_sales_by_cohort_details.Details_to_date.vsBud <= 1 ? 'color: #f8db8f;' : (total_sales_by_cohort_details.Details_to_date.vsBud  > 1 ? 'color: green;' : total_sales_by_cohort_details.Details_to_date.vsBud < -1 && 'color:red;')]"><center><char style="font-size: 18pt;">&#x25CF;</char></center></q-td>
                            <q-td style="background-color: yellow; font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_sales_by_cohort_details.Details_to_date.Sales_LY_amount,'$')}}</q-td>
                            <q-td style="background-color: yellow; font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_sales_by_cohort_details.Details_to_date.vsLY,'%')}}</q-td>
                            <q-td :style="['padding-left: 2px;padding-left: 2px;border-right: 1px solid black;',total_sales_by_cohort_details.Details_to_date.vsBud >= -1 && total_sales_by_cohort_details.Details_to_date.vsBud <= 1 ? 'color: #f8db8f;' : (total_sales_by_cohort_details.Details_to_date.vsBud  > 1 ? 'color: green;' : total_sales_by_cohort_details.Details_to_date.vsBud < -1 && 'color:red;')]"><center><char style="font-size: 18pt;">&#x25CF;</char></center></q-td>
                            <q-td style="padding: 0px;border: 0px;"></q-td>
                        </template>



                        <template v-if="total_sales_by_cohort_details.Details_week_to_date">
                            <q-td style="background-color: yellow; font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_sales_by_cohort_details.Details_week_to_date.Sales_TY_amount,'$')}}</q-td>
                            <q-td style="background-color: yellow; font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_sales_by_cohort_details.Details_week_to_date.Budget_TY_amount,'$')}}</q-td>
                            <q-td style="background-color: yellow; font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_sales_by_cohort_details.Details_week_to_date.vsBud,'%')}}</q-td>
                            <q-td :style="['padding-left: 2px;padding-left: 2px;',total_sales_by_cohort_details.Details_week_to_date.vsBud >= -1 && total_sales_by_cohort_details.Details_week_to_date.vsBud <= 1 ? 'color: #f8db8f;' : (total_sales_by_cohort_details.Details_week_to_date.vsBud  > 1 ? 'color: green;' : total_sales_by_cohort_details.Details_week_to_date.vsBud < -1 && 'color:red;')]"><center><char style="font-size: 18pt;">&#x25CF;</char></center></q-td>
                            <q-td style="background-color: yellow; font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_sales_by_cohort_details.Details_week_to_date.Sales_LY_amount,'$')}}</q-td>
                            <q-td style="background-color: yellow; font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_sales_by_cohort_details.Details_week_to_date.vsLY,'%')}}</q-td>
                            <q-td :style="['padding-left: 2px;padding-left: 2px;border-right: 1px solid black;',total_sales_by_cohort_details.Details_week_to_date.vsBud >= -1 && total_sales_by_cohort_details.Details_week_to_date.vsBud <= 1 ? 'color: #f8db8f;' : (total_sales_by_cohort_details.Details_week_to_date.vsBud  > 1 ? 'color: green;' : total_sales_by_cohort_details.Details_week_to_date.vsBud < -1 && 'color:red;')]"><center><char style="font-size: 18pt;">&#x25CF;</char></center></q-td>
                            <q-td style="padding: 0px;border: 0px;"></q-td>
                        </template>

                        
                        
                        <template v-if="total_sales_by_cohort_details.Details_month_to_date">
                            <q-td style="background-color: yellow; font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_sales_by_cohort_details.Details_month_to_date.Sales_TY_amount,'$')}}</q-td>
                            <q-td style="background-color: yellow; font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_sales_by_cohort_details.Details_month_to_date.Budget_TY_amount,'$')}}</q-td>
                            <q-td style="background-color: yellow; font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_sales_by_cohort_details.Details_month_to_date.vsBud,'%')}}</q-td>
                            <q-td :style="['padding-left: 2px;padding-left: 2px;',total_sales_by_cohort_details.Details_month_to_date.vsBud >= -1 && total_sales_by_cohort_details.Details_month_to_date.vsBud <= 1 ? 'color: #f8db8f;' : (total_sales_by_cohort_details.Details_month_to_date.vsBud  > 1 ? 'color: green;' : total_sales_by_cohort_details.Details_month_to_date.vsBud < -1 && 'color:red;')]"><center><char style="font-size: 18pt;">&#x25CF;</char></center></q-td>
                            <q-td style="background-color: yellow; font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_sales_by_cohort_details.Details_month_to_date.Sales_LY_amount,'$')}}</q-td>
                            <q-td style="background-color: yellow; font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_sales_by_cohort_details.Details_month_to_date.vsLY,'%')}}</q-td>
                            <q-td :style="['padding-left: 2px;padding-left: 2px;border-right: 1px solid black;',total_sales_by_cohort_details.Details_month_to_date.vsBud >= -1 && total_sales_by_cohort_details.Details_month_to_date.vsBud <= 1 ? 'color: #f8db8f;' : (total_sales_by_cohort_details.Details_month_to_date.vsBud  > 1 ? 'color: green;' : total_sales_by_cohort_details.Details_month_to_date.vsBud < -1 && 'color:red;')]"><center><char style="font-size: 18pt;">&#x25CF;</char></center></q-td>
                            <q-td style="padding: 0px;border: 0px;"></q-td>
                        </template>

                        <!-- <q-td style="padding: 0px;border: 0px;"></q-td>
                            <template v-if="total_sales_by_cohort_details.Outlet">
                                <q-td style="font-weight: bold; border-right: 1px solid black;" >{{total_sales_by_cohort_details.Outlet.Outlet}}</q-td>
                            </template>
                        <q-td style="padding: 0px;border: 0px;"></q-td> -->

                        <template v-if="total_sales_by_cohort_details.Details_year_to_date">
                            <q-td style="background-color: yellow; font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_sales_by_cohort_details.Details_year_to_date.Sales_TY_amount,'$')}}</q-td>
                            <q-td style="background-color: yellow; font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_sales_by_cohort_details.Details_year_to_date.Budget_TY_amount,'$')}}</q-td>
                            <q-td style="background-color: yellow; font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_sales_by_cohort_details.Details_year_to_date.vsBud,'%')}}</q-td>
                            <q-td :style="['padding-left: 2px;padding-left: 2px;',total_sales_by_cohort_details.Details_year_to_date.vsBud >= -1 && total_sales_by_cohort_details.Details_year_to_date.vsBud <= 1 ? 'color: #f8db8f;' : (total_sales_by_cohort_details.Details_year_to_date.vsBud  > 1 ? 'color: green;' : total_sales_by_cohort_details.Details_year_to_date.vsBud < -1 && 'color:red;')]"><center><char style="font-size: 18pt;">&#x25CF;</char></center></q-td>
                            <q-td style="background-color: yellow; font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_sales_by_cohort_details.Details_year_to_date.Sales_LY_amount,'$')}}</q-td>
                            <q-td style="background-color: yellow; font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_sales_by_cohort_details.Details_year_to_date.vsLY,'%')}}</q-td>
                            <q-td :style="['padding-left: 2px;padding-left: 2px;',total_sales_by_cohort_details.Details_year_to_date.vsLY >= -1 && total_sales_by_cohort_details.Details_year_to_date.vsLY <= 1 ? 'color: #f8db8f;' : (total_sales_by_cohort_details.Details_year_to_date.vsLY  > 1 ? 'color: green;' : total_sales_by_cohort_details.Details_year_to_date.vsLY < -1 && 'color:red;')]"><center><char style="font-size: 18pt;">&#x25CF;</char></center></q-td>
                        </template>
            </q-tr>

            <q-tr v-if="(json_data.TotalSalesByCohort.length <= 0)">
                <q-td colspan="19" style="border: 1px solid black; text-align: center; font-weight: bold;">No data</q-td>
            </q-tr>
        </template>

        <q-tr  v-if="json_data.SalesByState.length > 0">
            <q-td style="position: sticky; left: 0px; z-index: 119; background-color: white; border: 0px;"></q-td>
            <q-td style="border: 0px; padding: 0px;"></q-td>
            <q-td colspan="7" style="border-bottom: 1px solid black; border-left: 0px; "></q-td>
            <q-td colspan="1" style="border: 0px; padding: 0px;"></q-td>
            <q-td colspan="7" style="border-bottom: 1px solid black; border-left: 0px; "></q-td>
            <q-td colspan="1" style="border: 0px; padding: 0px;"></q-td>
            <q-td colspan="7" style="border-bottom: 1px solid black; border-left: 0px; "></q-td>
            <q-td colspan="1" style="border: 0px; padding: 0px;"></q-td>
            <q-td colspan="7" style="border-bottom: 1px solid black; border-left: 0px; "></q-td>
        </q-tr>

        <template  v-for="(sales_by_state_details, index) in json_data.SalesByState" :key="sales_by_state_details">
            <q-tr :class="[index+1 == json_data.SalesByAM.length && 'last_row table_row', 'table_row']">
                <template v-if="sales_by_state_details.State">
                            <!-- <q-td style="position: sticky; left: 0px; z-index: 119; background-color: white; font-weight: bold;text-align: center;border: 0px;" ></q-td> -->
                            <!-- <q-td style="position: sticky; left: 25px; z-index: 119; background-color: white; font-weight: bold;text-align:center;" >{{sales_by_state_details.State.Outlet}}</q-td>
                            <q-td style="position: sticky; left: 145px; z-index: 119; background-color: white; font-weight: bold;text-align:center;" >{{sales_by_state_details.State.OutletName}}</q-td>
                            <q-td style="position: sticky; left: 265px; z-index: 119; background-color: white; font-weight: bold;text-align:center;" >{{sales_by_state_details.State.Cohort}}</q-td> -->
                            <q-td style="position: sticky; left: 0px; z-index: 119; background-color: white; font-weight: bold;text-align:left; border: 0px;" >{{sales_by_state_details.State.State}}</q-td>
                            <!-- <q-td style="position: sticky; left: 0px; z-index: 119; background-color: white; font-weight: bold;text-align:center;border-right: 1px solid black;" >{{sales_by_state_details.State.AM}}</q-td> -->
                            <q-td style="padding: 0px;border: 0px;"></q-td>
                        </template>


                        <template v-if="sales_by_state_details.Details_to_date">
                            <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(sales_by_state_details.Details_to_date.Sales_TY_amount,'$')}}</q-td>
                            <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(sales_by_state_details.Details_to_date.Budget_TY_amount,'$')}}</q-td>
                            <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(sales_by_state_details.Details_to_date.vsBud,'%')}}</q-td>
                            <q-td :style="['padding-left: 2px;padding-left: 2px;',sales_by_state_details.Details_to_date.vsBud >= -1 && sales_by_state_details.Details_to_date.vsBud <= 1 ? 'color: #f8db8f;' : (sales_by_state_details.Details_to_date.vsBud  > 1 ? 'color: green;' : sales_by_state_details.Details_to_date.vsBud < -1 && 'color:red;')]"><center><char style="font-size: 18pt;">&#x25CF;</char></center></q-td>
                            <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(sales_by_state_details.Details_to_date.Sales_LY_amount,'$')}}</q-td>
                            <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(sales_by_state_details.Details_to_date.vsLY,'%')}}</q-td>
                            <q-td :style="['padding-left: 2px;padding-left: 2px;border-right: 1px solid black;',sales_by_state_details.Details_to_date.vsBud >= -1 && sales_by_state_details.Details_to_date.vsBud <= 1 ? 'color: #f8db8f;' : (sales_by_state_details.Details_to_date.vsBud  > 1 ? 'color: green;' : sales_by_state_details.Details_to_date.vsBud < -1 && 'color:red;')]"><center><char style="font-size: 18pt;">&#x25CF;</char></center></q-td>
                            <q-td style="padding: 0px;border: 0px;"></q-td>
                        </template>



                        <template v-if="sales_by_state_details.Details_week_to_date">
                            <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(sales_by_state_details.Details_week_to_date.Sales_TY_amount,'$')}}</q-td>
                            <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(sales_by_state_details.Details_week_to_date.Budget_TY_amount,'$')}}</q-td>
                            <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(sales_by_state_details.Details_week_to_date.vsBud,'%')}}</q-td>
                            <q-td :style="['padding-left: 2px;padding-left: 2px;',sales_by_state_details.Details_week_to_date.vsBud >= -1 && sales_by_state_details.Details_week_to_date.vsBud <= 1 ? 'color: #f8db8f;' : (sales_by_state_details.Details_week_to_date.vsBud  > 1 ? 'color: green;' : sales_by_state_details.Details_week_to_date.vsBud < -1 && 'color:red;')]"><center><char style="font-size: 18pt;">&#x25CF;</char></center></q-td>
                            <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(sales_by_state_details.Details_week_to_date.Sales_LY_amount,'$')}}</q-td>
                            <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(sales_by_state_details.Details_week_to_date.vsLY,'%')}}</q-td>
                            <q-td :style="['padding-left: 2px;padding-left: 2px;border-right: 1px solid black;',sales_by_state_details.Details_week_to_date.vsBud >= -1 && sales_by_state_details.Details_week_to_date.vsBud <= 1 ? 'color: #f8db8f;' : (sales_by_state_details.Details_week_to_date.vsBud  > 1 ? 'color: green;' : sales_by_state_details.Details_week_to_date.vsBud < -1 && 'color:red;')]"><center><char style="font-size: 18pt;">&#x25CF;</char></center></q-td>
                            <q-td style="padding: 0px;border: 0px;"></q-td>
                        </template>



                        <template v-if="sales_by_state_details.Details_month_to_date">
                            <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(sales_by_state_details.Details_month_to_date.Sales_TY_amount,'$')}}</q-td>
                            <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(sales_by_state_details.Details_month_to_date.Budget_TY_amount,'$')}}</q-td>
                            <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(sales_by_state_details.Details_month_to_date.vsBud,'%')}}</q-td>
                            <q-td :style="['padding-left: 2px;padding-left: 2px;',sales_by_state_details.Details_month_to_date.vsBud >= -1 && sales_by_state_details.Details_month_to_date.vsBud <= 1 ? 'color: #f8db8f;' : (sales_by_state_details.Details_month_to_date.vsBud  > 1 ? 'color: green;' : sales_by_state_details.Details_month_to_date.vsBud < -1 && 'color:red;')]"><center><char style="font-size: 18pt;">&#x25CF;</char></center></q-td>
                            <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(sales_by_state_details.Details_month_to_date.Sales_LY_amount,'$')}}</q-td>
                            <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(sales_by_state_details.Details_month_to_date.vsLY,'%')}}</q-td>
                            <q-td :style="['padding-left: 2px;padding-left: 2px;border-right: 1px solid black;',sales_by_state_details.Details_month_to_date.vsBud >= -1 && sales_by_state_details.Details_month_to_date.vsBud <= 1 ? 'color: #f8db8f;' : (sales_by_state_details.Details_month_to_date.vsBud  > 1 ? 'color: green;' : sales_by_state_details.Details_month_to_date.vsBud < -1 && 'color:red;')]"><center><char style="font-size: 18pt;">&#x25CF;</char></center></q-td>
                            <q-td style="padding: 0px;border: 0px;"></q-td>
                        </template>

                        <!-- <q-td style="padding: 0px;border: 0px;"></q-td>
                            <template v-if="sales_by_state_details.Outlet">
                                <q-td style="font-weight: bold; border-right: 1px solid black;" >{{sales_by_state_details.Outlet.Outlet}}</q-td>
                            </template>
                        <q-td style="padding: 0px;border: 0px;"></q-td> -->

                        <template v-if="sales_by_state_details.Details_year_to_date">
                            <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(sales_by_state_details.Details_year_to_date.Sales_TY_amount,'$')}}</q-td>
                            <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(sales_by_state_details.Details_year_to_date.Budget_TY_amount,'$')}}</q-td>
                            <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(sales_by_state_details.Details_year_to_date.vsBud,'%')}}</q-td>
                            <q-td :style="['padding-left: 2px;padding-left: 2px;',sales_by_state_details.Details_year_to_date.vsBud >= -1 && sales_by_state_details.Details_year_to_date.vsBud <= 1 ? 'color: #f8db8f;' : (sales_by_state_details.Details_year_to_date.vsBud  > 1 ? 'color: green;' : sales_by_state_details.Details_year_to_date.vsBud < -1 && 'color:red;')]"><center><char style="font-size: 18pt;">&#x25CF;</char></center></q-td>
                            <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(sales_by_state_details.Details_year_to_date.Sales_LY_amount,'$')}}</q-td>
                            <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(sales_by_state_details.Details_year_to_date.vsLY,'%')}}</q-td>
                            <q-td :style="['padding-left: 2px;padding-left: 2px;',sales_by_state_details.Details_year_to_date.vsLY >= -1 && sales_by_state_details.Details_year_to_date.vsLY <= 1 ? 'color: #f8db8f;' : (sales_by_state_details.Details_year_to_date.vsLY  > 1 ? 'color: green;' : sales_by_state_details.Details_year_to_date.vsLY < -1 && 'color:red;')]"><center><char style="font-size: 18pt;">&#x25CF;</char></center></q-td>
                        </template>
            </q-tr>

            <q-tr v-if="(json_data.SalesByState.length <= 0)">
                <q-td colspan="19" style="border: 1px solid black; text-align: center; font-weight: bold;">No data</q-td>
            </q-tr>

        </template>

        <template  v-for="(total_sales_by_state_details, index) in json_data.TotalSalesByState" :key="total_sales_by_state_details">
            <q-tr :class="[index+1 == json_data.SalesByAM.length && 'last_row table_row', 'table_row']">
                <template v-if="total_sales_by_state_details.State">
                            <!-- <q-td style="position: sticky; left: 0px; z-index: 119; background-color: white; font-weight: bold;text-align: center;border: 0px;" ></q-td> -->
                            <!-- <q-td style="position: sticky; left: 25px; z-index: 119; background-color: white; font-weight: bold;text-align:center;" >{{total_sales_by_state_details.State.Outlet}}</q-td>
                            <q-td style="position: sticky; left: 145px; z-index: 119; background-color: white; font-weight: bold;text-align:center;" >{{total_sales_by_state_details.State.OutletName}}</q-td>
                            <q-td style="position: sticky; left: 265px; z-index: 119; background-color: white; font-weight: bold;text-align:center;" >{{total_sales_by_state_details.State.Cohort}}</q-td> -->
                            <q-td style="position: sticky; left: 0px; z-index: 119; background-color: white; font-weight: bold;text-align:left; border: 0px;" >{{total_sales_by_state_details.State.State}}</q-td>
                            <!-- <q-td style="position: sticky; left: 505px; z-index: 119; background-color: white; font-weight: bold;text-align:center;border-right: 1px solid black;" >{{total_sales_by_state_details.State.AM}}</q-td> -->
                            <q-td style="padding: 0px;border: 0px;"></q-td>
                        </template>


                        <template v-if="total_sales_by_state_details.Details_to_date">
                            <q-td style="background-color: yellow; font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_sales_by_state_details.Details_to_date.Sales_TY_amount,'$')}}</q-td>
                            <q-td style="background-color: yellow; font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_sales_by_state_details.Details_to_date.Budget_TY_amount,'$')}}</q-td>
                            <q-td style="background-color: yellow; font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_sales_by_state_details.Details_to_date.vsBud,'%')}}</q-td>
                            <q-td :style="['padding-left: 2px;padding-left: 2px;',total_sales_by_state_details.Details_to_date.vsBud >= -1 && total_sales_by_state_details.Details_to_date.vsBud <= 1 ? 'color: #f8db8f;' : (total_sales_by_state_details.Details_to_date.vsBud  > 1 ? 'color: green;' : total_sales_by_state_details.Details_to_date.vsBud < -1 && 'color:red;')]"><center><char style="font-size: 18pt;">&#x25CF;</char></center></q-td>
                            <q-td style="background-color: yellow; font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_sales_by_state_details.Details_to_date.Sales_LY_amount,'$')}}</q-td>
                            <q-td style="background-color: yellow; font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_sales_by_state_details.Details_to_date.vsLY,'%')}}</q-td>
                            <q-td :style="['padding-left: 2px;padding-left: 2px;border-right: 1px solid black;',total_sales_by_state_details.Details_to_date.vsBud >= -1 && total_sales_by_state_details.Details_to_date.vsBud <= 1 ? 'color: #f8db8f;' : (total_sales_by_state_details.Details_to_date.vsBud  > 1 ? 'color: green;' : total_sales_by_state_details.Details_to_date.vsBud < -1 && 'color:red;')]"><center><char style="font-size: 18pt;">&#x25CF;</char></center></q-td>
                            <q-td style="padding: 0px;border: 0px;"></q-td>
                        </template>



                        <template v-if="total_sales_by_state_details.Details_week_to_date">
                            <q-td style="background-color: yellow; font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_sales_by_state_details.Details_week_to_date.Sales_TY_amount,'$')}}</q-td>
                            <q-td style="background-color: yellow; font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_sales_by_state_details.Details_week_to_date.Budget_TY_amount,'$')}}</q-td>
                            <q-td style="background-color: yellow; font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_sales_by_state_details.Details_week_to_date.vsBud,'%')}}</q-td>
                            <q-td :style="['padding-left: 2px;padding-left: 2px;',total_sales_by_state_details.Details_week_to_date.vsBud >= -1 && total_sales_by_state_details.Details_week_to_date.vsBud <= 1 ? 'color: #f8db8f;' : (total_sales_by_state_details.Details_week_to_date.vsBud  > 1 ? 'color: green;' : total_sales_by_state_details.Details_week_to_date.vsBud < -1 && 'color:red;')]"><center><char style="font-size: 18pt;">&#x25CF;</char></center></q-td>
                            <q-td style="background-color: yellow; font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_sales_by_state_details.Details_week_to_date.Sales_LY_amount,'$')}}</q-td>
                            <q-td style="background-color: yellow; font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_sales_by_state_details.Details_week_to_date.vsLY,'%')}}</q-td>
                            <q-td :style="['padding-left: 2px;padding-left: 2px;border-right: 1px solid black;',total_sales_by_state_details.Details_week_to_date.vsBud >= -1 && total_sales_by_state_details.Details_week_to_date.vsBud <= 1 ? 'color: #f8db8f;' : (total_sales_by_state_details.Details_week_to_date.vsBud  > 1 ? 'color: green;' : total_sales_by_state_details.Details_week_to_date.vsBud < -1 && 'color:red;')]"><center><char style="font-size: 18pt;">&#x25CF;</char></center></q-td>
                            <q-td style="padding: 0px;border: 0px;"></q-td>
                        </template>



                        <template v-if="total_sales_by_state_details.Details_month_to_date">
                            <q-td style="background-color: yellow; font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_sales_by_state_details.Details_month_to_date.Sales_TY_amount,'$')}}</q-td>
                            <q-td style="background-color: yellow; font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_sales_by_state_details.Details_month_to_date.Budget_TY_amount,'$')}}</q-td>
                            <q-td style="background-color: yellow; font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_sales_by_state_details.Details_month_to_date.vsBud,'%')}}</q-td>
                            <q-td :style="['padding-left: 2px;padding-left: 2px;',total_sales_by_state_details.Details_month_to_date.vsBud >= -1 && total_sales_by_state_details.Details_month_to_date.vsBud <= 1 ? 'color: #f8db8f;' : (total_sales_by_state_details.Details_month_to_date.vsBud  > 1 ? 'color: green;' : total_sales_by_state_details.Details_month_to_date.vsBud < -1 && 'color:red;')]"><center><char style="font-size: 18pt;">&#x25CF;</char></center></q-td>
                            <q-td style="background-color: yellow; font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_sales_by_state_details.Details_month_to_date.Sales_LY_amount,'$')}}</q-td>
                            <q-td style="background-color: yellow; font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_sales_by_state_details.Details_month_to_date.vsLY,'%')}}</q-td>
                            <q-td :style="['padding-left: 2px;padding-left: 2px;border-right: 1px solid black;',total_sales_by_state_details.Details_month_to_date.vsBud >= -1 && total_sales_by_state_details.Details_month_to_date.vsBud <= 1 ? 'color: #f8db8f;' : (total_sales_by_state_details.Details_month_to_date.vsBud  > 1 ? 'color: green;' : total_sales_by_state_details.Details_month_to_date.vsBud < -1 && 'color:red;')]"><center><char style="font-size: 18pt;">&#x25CF;</char></center></q-td>
                            <q-td style="padding: 0px;border: 0px;"></q-td>
                        </template>

                        <!-- <q-td style="padding: 0px;border: 0px;"></q-td>
                            <template v-if="total_sales_by_state_details.Outlet">
                                <q-td style="font-weight: bold; border-right: 1px solid black;" >{{total_sales_by_state_details.Outlet.Outlet}}</q-td>
                            </template>
                        <q-td style="padding: 0px;border: 0px;"></q-td> -->

                        <template v-if="total_sales_by_state_details.Details_year_to_date">
                            <q-td style="background-color: yellow; font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_sales_by_state_details.Details_year_to_date.Sales_TY_amount,'$')}}</q-td>
                            <q-td style="background-color: yellow; font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_sales_by_state_details.Details_year_to_date.Budget_TY_amount,'$')}}</q-td>
                            <q-td style="background-color: yellow; font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_sales_by_state_details.Details_year_to_date.vsBud,'%')}}</q-td>
                            <q-td :style="['padding-left: 2px;padding-left: 2px;',total_sales_by_state_details.Details_year_to_date.vsBud >= -1 && total_sales_by_state_details.Details_year_to_date.vsBud <= 1 ? 'color: #f8db8f;' : (total_sales_by_state_details.Details_year_to_date.vsBud  > 1 ? 'color: green;' : total_sales_by_state_details.Details_year_to_date.vsBud < -1 && 'color:red;')]"><center><char style="font-size: 18pt;">&#x25CF;</char></center></q-td>
                            <q-td style="background-color: yellow; font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_sales_by_state_details.Details_year_to_date.Sales_LY_amount,'$')}}</q-td>
                            <q-td style="background-color: yellow; font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_sales_by_state_details.Details_year_to_date.vsLY,'%')}}</q-td>
                            <q-td :style="['padding-left: 2px;padding-left: 2px;',total_sales_by_state_details.Details_year_to_date.vsLY >= -1 && total_sales_by_state_details.Details_year_to_date.vsLY <= 1 ? 'color: #f8db8f;' : (total_sales_by_state_details.Details_year_to_date.vsLY  > 1 ? 'color: green;' : total_sales_by_state_details.Details_year_to_date.vsLY < -1 && 'color:red;')]"><center><char style="font-size: 18pt;">&#x25CF;</char></center></q-td>
                        </template>

                        <!-- <q-tr v-if="(json_data.SalesByAM.length <= 0)">
                            <q-td colspan="24" style="border: 1px solid black; text-align: center; font-weight: bold;">No data</q-td>
                        </q-tr> -->
            </q-tr>

            <q-tr v-if="(json_data.TotalSalesByState.length <= 0)">
                <q-td colspan="19" style="border: 1px solid black; text-align: center; font-weight: bold;">No data</q-td>
            </q-tr>
            
        </template>
        
      </template>


      <!-- <template v-slot:bottom-row>
        <q-tr>
          <q-td colspan="100%">
            Bottom row
          </q-td>
        </q-tr>
      </template> -->

      <template v-slot:bottom>
        <!-- remove pagination -->
      </template>

    </q-table>

        </q-card-section>

      <q-inner-loading :showing="loading">
        <q-spinner-gears size="50px" color="primary" />
      </q-inner-loading>
    </q-card>

    
  </div>
</template>

<script>
import $ from 'jquery';
import Checkbox from 'src/components/RDA/Base/Checkbox'

export default {
    data()
    {
        return{
            loading: true,
            columns: [{}],
            rows:[{}],
            json_data: {
                SalesByAM: [],
                SalesByCohort: [],
                SalesByState: [],
                TotalSalesByAM: [],
                TotalSalesByCohort: [],
                TotalSalesByState: [],
            },
            ori_json_data: {
                SalesByAM: [],
                SalesByCohort: [],
                SalesByState: [],
                TotalSalesByAM: [],
                TotalSalesByCohort: [],
                TotalSalesByState: [],
            },
            colspan:{
                MonthToDate:
                { 
                    MonthToDate: 24,
                    Sales: 3,
                    SalesShow: true,
                    SalesIcon: 'remove',
                    ScanGP: 4,
                    ScanGPShow1: true,
                    ScanGPIcon1: 'remove',
                    ScanGPShow2: true,
                    ScanGPIcon2: 'remove',
                    Shrinkage: 4,
                    ShrinkageShow1: true,
                    ShrinkageIcon1: 'remove',
                    ShrinkageShow2: true,
                    ShrinkageIcon2: 'remove',
                    NetGP: 4,
                    NetGPShow1: true,
                    NetGPIcon1: 'remove',
                    NetGPShow2: true,
                    NetGPIcon2: 'remove',
                    Stock: 5,
                    StockShow: true,
                    StockIcon: 'remove',
                },
                YearToDate:
                { 
                    YearToDate: 24,
                    Sales: 3,
                    SalesShow: true,
                    SalesIcon: 'remove',
                    ScanGP: 4,
                    ScanGPShow1: true,
                    ScanGPIcon1: 'remove',
                    ScanGPShow2: true,
                    ScanGPIcon2: 'remove',
                    Shrinkage: 4,
                    ShrinkageShow1: true,
                    ShrinkageIcon1: 'remove',
                    ShrinkageShow2: true,
                    ShrinkageIcon2: 'remove',
                    NetGP: 4,
                    NetGPShow1: true,
                    NetGPIcon1: 'remove',
                    NetGPShow2: true,
                    NetGPIcon2: 'remove',
                    Stock: 5,
                    StockShow: true,
                    StockIcon: 'remove',
                }

            },
            first_height: '0',
            second_height: '0',
            third_height: '0',
            table_title: this.pass_table_title,
            show_expand: true,
            amount_type: true,
            active_sorting: '',
            active_sorting_column: '',
            active_sorting_column_asc: true,
        }
    },
    computed: {
        dbComponentBehavior() {
            return this.$store.getters['dbComponentBehavior/byLanguage']('rda')
        },
    },
    components: {
        Checkbox,
    },
    props: ['pass_data','forceLoading','pass_table_title'],
    methods:{
        handleSortingColumn(key)
        {
            this.active_sorting = '';

            // this.active_sorting_column_asc = sorting;

            if(this.active_sorting_column == key)
            {
                this.active_sorting_column_asc = !this.active_sorting_column_asc;
            }
            else
            {
                this.active_sorting_column_asc = true;
            }

            this.active_sorting_column = key;

            var variable = this.active_sorting_column_asc ? '>' : '<';

            var new_seq = this.ori_json_data.SalesByAM.sort((a, b) => {
                return eval(`a.${this.active_sorting_column} ${variable} b.${this.active_sorting_column} ? 1 : (a.${this.active_sorting_column} === b.${this.active_sorting_column} ? 0 : -1 )`);
            });
            this.json_data.SalesByAM = new_seq;
            

            var new_seq = this.ori_json_data.TotalSalesByAM.sort((a, b) => {
                return eval(`a.${this.active_sorting_column} ${variable} b.${this.active_sorting_column} ? 1 : (a.${this.active_sorting_column} === b.${this.active_sorting_column} ? 0 : -1 )`);
            });
            this.json_data.TotalSalesByAM = new_seq;

            
            var new_seq = this.ori_json_data.SalesByCohort.sort((a, b) => {
                return eval(`a.${this.active_sorting_column} ${variable} b.${this.active_sorting_column} ? 1 : (a.${this.active_sorting_column} === b.${this.active_sorting_column} ? 0 : -1 )`);
            });
            this.json_data.SalesByCohort = new_seq;


            var new_seq = this.ori_json_data.TotalSalesByCohort.sort((a, b) => {
                return eval(`a.${this.active_sorting_column} ${variable} b.${this.active_sorting_column} ? 1 : (a.${this.active_sorting_column} === b.${this.active_sorting_column} ? 0 : -1 )`);
            });
            this.json_data.TotalSalesByCohort = new_seq;


            var new_seq = this.ori_json_data.SalesByState.sort((a, b) => {
                return eval(`a.${this.active_sorting_column} ${variable} b.${this.active_sorting_column} ? 1 : (a.${this.active_sorting_column} === b.${this.active_sorting_column} ? 0 : -1 )`);
            });
            this.json_data.SalesByState = new_seq;


            var new_seq = this.ori_json_data.TotalSalesByState.sort((a, b) => {
                return eval(`a.${this.active_sorting_column} ${variable} b.${this.active_sorting_column} ? 1 : (a.${this.active_sorting_column} === b.${this.active_sorting_column} ? 0 : -1 )`);
            });
            this.json_data.TotalSalesByState = new_seq;

            // SalesByAM
            // TotalSalesByAM
            // SalesByCohort
            // TotalSalesByCohort
            // SalesByState
            // TotalSalesByState
            

        },
        exportToExcel() {

            var currentdate = new Date();
            var year = String(currentdate.getFullYear());
            var month = ('0' + (currentdate.getMonth()+1)).slice(-2);
            var date = ('0' + currentdate.getDate()).slice(-2);

            var final_date = year+"-"+month+"-"+date;

            this.loading = true;
            this.show_expand = false;
            

            setTimeout(()=>{

                let table = document.getElementById('table_budget_2');

                /* convert the table to a string of HTML */
                let html = table.outerHTML;

                /* create a Blob from the HTML string */
                let blob = new Blob([html], { type: 'application/vnd.ms-excel' });

                /* create a URL for the Blob */
                let url = URL.createObjectURL(blob);

                /* create a link element and trigger a download */
                let a = document.createElement('a');
                a.href = url;
                a.download = this.table_title+"_"+final_date+'.xls';
                a.click();

                setTimeout(()=>{
                    this.show_expand = true;
                    this.loading = false;
                },300);
                
            },300);

            
        },
        formatAmount(value, type)
        {
            var ori_value = value;
            var amount_type = this.amount_type;

            if(amount_type)
            {
                // console.log('divide 1000');
                var decimal = 1;
                var value = Number(value)/1000;
            }
            else
            {
                // console.log('no divide');
                var decimal = 0;
                var value = Number(value);
            }

            if(type == "$")
            {
                var value = Number(value).toFixed(decimal);
            }
            else if(type == "%")
            {
                var value = Number(ori_value).toFixed(1);//curent change to value always decimal 1 for percent
            }
            else
            {
                var value = value;
            }
           
            var parts = value.toString().split(".");
            const numberPart = parts[0];
            const decimalPart = parts[1];
            const thousands = /\B(?=(\d{3})+(?!\d))/g;
    // return numberPart.replace(thousands, ",") + (decimalPart ? "." + decimalPart : "");

            return numberPart.replace(thousands, ",") + (decimalPart ? "." + decimalPart : "");
        },
        calculateMonthColspan()
        {
            var total = 24 - (this.colspan.MonthToDate.SalesShow ? 0 : 1) - (this.colspan.MonthToDate.ScanGPShow1 ? 0 : 1) - (this.colspan.MonthToDate.ScanGPShow2? 0 : 1) - (this.colspan.MonthToDate.ShrinkageShow1 ? 0 : 1) - (this.colspan.MonthToDate.ShrinkageShow2? 0 : 1) - (this.colspan.MonthToDate.NetGPShow1 ? 0 : 1) - (this.colspan.MonthToDate.NetGPShow2? 0 : 1) - (this.colspan.MonthToDate.StockShow? 0 : 1);
            this.colspan.MonthToDate.MonthToDate = total;
        },
        calculateYearColspan()
        {
            var total = 24 - (this.colspan.YearToDate.SalesShow ? 0 : 1) - (this.colspan.YearToDate.ScanGPShow1 ? 0 : 1) - (this.colspan.YearToDate.ScanGPShow2? 0 : 1) - (this.colspan.YearToDate.ShrinkageShow1 ? 0 : 1) - (this.colspan.YearToDate.ShrinkageShow2? 0 : 1) - (this.colspan.YearToDate.NetGPShow1 ? 0 : 1) - (this.colspan.YearToDate.NetGPShow2? 0 : 1) - (this.colspan.YearToDate.StockShow? 0 : 1);
            this.colspan.YearToDate.YearToDate = total;
        },
        SalesColumnButtonClick(){

            if(this.colspan.MonthToDate.SalesShow == true)
            {
                // this.colspan.MonthToDate.MonthToDate = 23;
                this.colspan.MonthToDate.Sales = 2;
                this.colspan.MonthToDate.SalesShow = false;
                this.colspan.MonthToDate.SalesIcon = 'add';
            }
            else
            {
                // this.colspan.MonthToDate.MonthToDate = 24;
                this.colspan.MonthToDate.Sales = 3;
                this.colspan.MonthToDate.SalesShow = true;
                this.colspan.MonthToDate.SalesIcon = 'remove';
            }

            this.calculateMonthColspan();
            
        },
        ScanGPColumnButtonClick1(){
            
            if(this.colspan.MonthToDate.ScanGPShow1 == true)
            {
                this.colspan.MonthToDate.ScanGPShow1 = false;
                this.colspan.MonthToDate.ScanGPIcon1 = 'add';
            }
            else
            {
                this.colspan.MonthToDate.ScanGPShow1 = true;
                this.colspan.MonthToDate.ScanGPIcon1 = 'remove';
            }

            var totalScanGP = 4 - (this.colspan.MonthToDate.ScanGPShow1 ? 0 : 1) - (this.colspan.MonthToDate.ScanGPShow2? 0 : 1);
            this.colspan.MonthToDate.ScanGP = totalScanGP;

            this.calculateMonthColspan();
        },
        ScanGPColumnButtonClick2(){
            
            if(this.colspan.MonthToDate.ScanGPShow2 == true)
            {
                this.colspan.MonthToDate.ScanGPShow2 = false;
                this.colspan.MonthToDate.ScanGPIcon2 = 'add';
            }
            else
            {
                this.colspan.MonthToDate.ScanGPShow2 = true;
                this.colspan.MonthToDate.ScanGPIcon2 = 'remove';
            }

            var totalScanGP = 4 - (this.colspan.MonthToDate.ScanGPShow1 ? 0 : 1) - (this.colspan.MonthToDate.ScanGPShow2? 0 : 1);
            this.colspan.MonthToDate.ScanGP = totalScanGP;

            this.calculateMonthColspan();
        },
        ShrinkageColumnButtonClick1(){
            
            if(this.colspan.MonthToDate.ShrinkageShow1 == true)
            {
                this.colspan.MonthToDate.ShrinkageShow1 = false;
                this.colspan.MonthToDate.ShrinkageIcon1 = 'add';
            }
            else
            {
                this.colspan.MonthToDate.ShrinkageShow1 = true;
                this.colspan.MonthToDate.ShrinkageIcon1 = 'remove';
            }

            var totalShrinkage = 4 - (this.colspan.MonthToDate.ShrinkageShow1 ? 0 : 1) - (this.colspan.MonthToDate.ShrinkageShow2? 0 : 1);
            this.colspan.MonthToDate.Shrinkage = totalShrinkage;

            this.calculateMonthColspan();
        },
        ShrinkageColumnButtonClick2(){
            
            if(this.colspan.MonthToDate.ShrinkageShow2 == true)
            {
                this.colspan.MonthToDate.ShrinkageShow2 = false;
                this.colspan.MonthToDate.ShrinkageIcon2 = 'add';
            }
            else
            {
                this.colspan.MonthToDate.ShrinkageShow2 = true;
                this.colspan.MonthToDate.ShrinkageIcon2 = 'remove';
            }

            var totalShrinkage = 4 - (this.colspan.MonthToDate.ShrinkageShow1 ? 0 : 1) - (this.colspan.MonthToDate.ShrinkageShow2? 0 : 1);
            this.colspan.MonthToDate.Shrinkage = totalShrinkage;

            this.calculateMonthColspan();
        },
        NetGPColumnButtonClick1(){
            
            if(this.colspan.MonthToDate.NetGPShow1 == true)
            {
                this.colspan.MonthToDate.NetGPShow1 = false;
                this.colspan.MonthToDate.NetGPIcon1 = 'add';
            }
            else
            {
                this.colspan.MonthToDate.NetGPShow1 = true;
                this.colspan.MonthToDate.NetGPIcon1 = 'remove';
            }

            var totalNetGP = 4 - (this.colspan.MonthToDate.NetGPShow1 ? 0 : 1) - (this.colspan.MonthToDate.NetGPShow2? 0 : 1);
            this.colspan.MonthToDate.NetGP = totalNetGP;

            this.calculateMonthColspan();
        },
        NetGPColumnButtonClick2(){
            
            if(this.colspan.MonthToDate.NetGPShow2 == true)
            {
                this.colspan.MonthToDate.NetGPShow2 = false;
                this.colspan.MonthToDate.NetGPIcon2 = 'add';
            }
            else
            {
                this.colspan.MonthToDate.NetGPShow2 = true;
                this.colspan.MonthToDate.NetGPIcon2 = 'remove';
            }

            var totalNetGP = 4 - (this.colspan.MonthToDate.NetGPShow1 ? 0 : 1) - (this.colspan.MonthToDate.NetGPShow2? 0 : 1);
            this.colspan.MonthToDate.NetGP = totalNetGP;

            this.calculateMonthColspan();
        },
        StockColumnButtonClick(){
            
            if(this.colspan.MonthToDate.StockShow == true)
            {
                this.colspan.MonthToDate.StockShow = false;
                this.colspan.MonthToDate.StockIcon = 'add';
            }
            else
            {
                this.colspan.MonthToDate.StockShow = true;
                this.colspan.MonthToDate.StockIcon = 'remove';
            }

            var totalStock = 5 - (this.colspan.MonthToDate.StockShow? 0 : 1);
            this.colspan.MonthToDate.Stock = totalStock;

            this.calculateMonthColspan();
        },
        SalesColumnYearButtonClick()
        {
            if(this.colspan.YearToDate.SalesShow == true)
            {
                // this.colspan.YearToDate.YearToDate = 23;
                this.colspan.YearToDate.Sales = 2;
                this.colspan.YearToDate.SalesShow = false;
                this.colspan.YearToDate.SalesIcon = 'add';
            }
            else
            {
                // this.colspan.YearToDate.YearToDate = 24;
                this.colspan.YearToDate.Sales = 3;
                this.colspan.YearToDate.SalesShow = true;
                this.colspan.YearToDate.SalesIcon = 'remove';
            }

            this.calculateYearColspan();
        },
        ScanGPColumnYearButtonClick1()
        {
            if(this.colspan.YearToDate.ScanGPShow1 == true)
            {
                this.colspan.YearToDate.ScanGPShow1 = false;
                this.colspan.YearToDate.ScanGPIcon1 = 'add';
            }
            else
            {
                this.colspan.YearToDate.ScanGPShow1 = true;
                this.colspan.YearToDate.ScanGPIcon1 = 'remove';
            }

            var totalScanGP = 4 - (this.colspan.YearToDate.ScanGPShow1 ? 0 : 1) - (this.colspan.YearToDate.ScanGPShow2? 0 : 1);
            this.colspan.YearToDate.ScanGP = totalScanGP;

            this.calculateYearColspan();
        },
        ScanGPColumnYearButtonClick2()
        {
            if(this.colspan.YearToDate.ScanGPShow2 == true)
            {
                this.colspan.YearToDate.ScanGPShow2 = false;
                this.colspan.YearToDate.ScanGPIcon2 = 'add';
            }
            else
            {
                this.colspan.YearToDate.ScanGPShow2 = true;
                this.colspan.YearToDate.ScanGPIcon2 = 'remove';
            }

            var totalScanGP = 4 - (this.colspan.YearToDate.ScanGPShow1 ? 0 : 1) - (this.colspan.YearToDate.ScanGPShow2? 0 : 1);
            this.colspan.YearToDate.ScanGP = totalScanGP;

            this.calculateYearColspan();
        },
        ShrinkageColumnYearButtonClick1(){
            
            if(this.colspan.YearToDate.ShrinkageShow1 == true)
            {
                this.colspan.YearToDate.ShrinkageShow1 = false;
                this.colspan.YearToDate.ShrinkageIcon1 = 'add';
            }
            else
            {
                this.colspan.YearToDate.ShrinkageShow1 = true;
                this.colspan.YearToDate.ShrinkageIcon1 = 'remove';
            }

            var totalShrinkage = 4 - (this.colspan.YearToDate.ShrinkageShow1 ? 0 : 1) - (this.colspan.YearToDate.ShrinkageShow2? 0 : 1);
            this.colspan.YearToDate.Shrinkage = totalShrinkage;

            this.calculateYearColspan();
        },
        ShrinkageColumnYearButtonClick2(){
            
            if(this.colspan.YearToDate.ShrinkageShow2 == true)
            {
                this.colspan.YearToDate.ShrinkageShow2 = false;
                this.colspan.YearToDate.ShrinkageIcon2 = 'add';
            }
            else
            {
                this.colspan.YearToDate.ShrinkageShow2 = true;
                this.colspan.YearToDate.ShrinkageIcon2 = 'remove';
            }

            var totalShrinkage = 4 - (this.colspan.YearToDate.ShrinkageShow1 ? 0 : 1) - (this.colspan.YearToDate.ShrinkageShow2? 0 : 1);
            this.colspan.YearToDate.Shrinkage = totalShrinkage;

            this.calculateYearColspan();
        },
        NetGPColumnYearButtonClick1(){
            
            if(this.colspan.YearToDate.NetGPShow1 == true)
            {
                this.colspan.YearToDate.NetGPShow1 = false;
                this.colspan.YearToDate.NetGPIcon1 = 'add';
            }
            else
            {
                this.colspan.YearToDate.NetGPShow1 = true;
                this.colspan.YearToDate.NetGPIcon1 = 'remove';
            }

            var totalNetGP = 4 - (this.colspan.YearToDate.NetGPShow1 ? 0 : 1) - (this.colspan.YearToDate.NetGPShow2? 0 : 1);
            this.colspan.YearToDate.NetGP = totalNetGP;

            this.calculateYearColspan();
        },
        NetGPColumnYearButtonClick2(){
            
            if(this.colspan.YearToDate.NetGPShow2 == true)
            {
                this.colspan.YearToDate.NetGPShow2 = false;
                this.colspan.YearToDate.NetGPIcon2 = 'add';
            }
            else
            {
                this.colspan.YearToDate.NetGPShow2 = true;
                this.colspan.YearToDate.NetGPIcon2 = 'remove';
            }

            var totalNetGP = 4 - (this.colspan.YearToDate.NetGPShow1 ? 0 : 1) - (this.colspan.YearToDate.NetGPShow2? 0 : 1);
            this.colspan.YearToDate.NetGP = totalNetGP;

            this.calculateYearColspan();
        },
        StockColumnYearButtonClick(){
            
            if(this.colspan.YearToDate.StockShow == true)
            {
                this.colspan.YearToDate.StockShow = false;
                this.colspan.YearToDate.StockIcon = 'add';
            }
            else
            {
                this.colspan.YearToDate.StockShow = true;
                this.colspan.YearToDate.StockIcon = 'remove';
            }

            var totalStock = 5 - (this.colspan.YearToDate.StockShow? 0 : 1);
            this.colspan.YearToDate.Stock = totalStock;

            this.calculateYearColspan();
        },
    },
    created () {
        // alert('gaga');
        // window.addEventListener('scroll', this.handleScroll);
    },
    mounted()
    {
        $('.table_budget_2').find('.q-table').attr('id','table_budget_2');
        // window.document.body.onscroll = function() {
        //     console.log(123);
        //     var $el = $('.fixedElement'); 
        //     var isPositionFixed = ($el.css('position') == 'fixed');
        //     if ($(this).scrollTop() > 200 && !isPositionFixed){ 
        //         $el.css({'position': 'fixed', 'top': '0px'}); 
        //     }
        //     if ($(this).scrollTop() < 200 && isPositionFixed){
        //         $el.css({'position': 'static', 'top': '0px'}); 
        //     } 

        // }

        var $el = $('.table_budget_2').find('table').find('thead').find('tr:eq(0)'); 
        var $el2 = $('.table_budget_2').find('table').find('thead').find('tr:eq(1)'); 
        var $el3 = $('.table_budget_2').find('table').find('thead').find('tr:eq(2)'); 
        var $el4 = $('.table_budget_2').find('table').find('thead').find('tr:eq(3)'); 

        // var stickTop = $el.offset();
        
        // var headerHeight = $('.q-header').height();

        // var header_padding_top = $('.table_budget_2').find('.q-table__top').css('padding-top');
        // var header_padding_top = header_padding_top.replace('px','');
        // var header_padding_bottom = $('.table_budget_2').find('.q-table__top').css('padding-bottom');
        // var header_padding_bottom = header_padding_bottom.replace('px','');
        // var total_header_padding = Number(header_padding_top)+Number(header_padding_bottom)

        $('.q-table__middle.q-virtual-scroll').scroll((e)=>{ 
            
            this.first_height = $el.height()+'px' ;
            this.second_height = ($el.height()+$el2.height())+'px' ;
            this.third_height = ($el.height()+$el2.height()+$el3.height())+'px' ;
        //     var offset_value = $(this).scrollTop() - headerHeight - total_header_padding+2;

        //     if((($(this).scrollTop()+headerHeight) >= stickTop.top))
        //     {
        //         $el.css({'position': 'sticky', 'top': offset_value+'px', 'z-index': '110'});
        //         $el2.css({'position': 'sticky', 'top': offset_value+$el.height()+'px', 'z-index': '110'});
        //         $el3.css({'position': 'sticky', 'top': offset_value+$el.height()+$el2.height()+'px', 'z-index': '110'});
        //         $el4.css({'position': 'sticky', 'top': offset_value+$el.height()+$el2.height()+$el3.height()+'px', 'z-index': '110'}); 
        //     }

        //     if((($(this).scrollTop()+headerHeight) < stickTop.top))
        //     {
        //         $el.css({'position': 'static', 'top': '0', 'z-index': '0'}); 
        //         $el2.css({'position': 'static', 'top': '0', 'z-index': '0'});
        //         $el3.css({'position': 'sticky', 'top': '0', 'z-index': '0'});
        //         $el4.css({'position': 'sticky', 'top': '0', 'z-index': '0'}); 
        //     }

        });

    },
    watch: {
        pass_data(newVal)
        {
            this.json_data = newVal;
            this.ori_json_data = JSON.parse(JSON.stringify(newVal));
            this.loading = false;
        },
        forceLoading(newVal)
        {
            // if(newVal)
            // {
                this.loading = newVal;
            // }
        },
        pass_table_title(newVal)
        {
            this.table_title = newVal;
        }
    }
}
</script>

<style scoped>
/* 
html::-webkit-scrollbar {
    display: none;
}

body::-webkit-scrollbar {
    display: none;
} */

.table_budget_2 > .q-table__middle > .q-table > thead > tr:nth-child(2) > th, 
.table_budget_2 > .q-table__middle > .q-table > thead > tr:nth-child(3) > th, 
.table_budget_2 > .q-table__middle > .q-table > thead > tr:nth-child(4) > th
{
    font-size: 11px;
    font-weight: bold;
    padding-top: 0px;
    padding-bottom: 0px;
    border-color: black;
}

.table_budget_2 > .q-table__middle > .q-table > thead > tr:nth-child(5) > th
{
    font-size: 11px;
    padding-top: 0px;
    padding-bottom: 0px;
    border-color: black;
}

.table_budget_2 > .q-table__middle > .q-table > tbody > tr > td
{
    padding-top: 0px;
    padding-bottom: 0px;
    padding-right: 3px;
    font-size: 11px;
    border-color: black;
}

.table_budget_2 > .q-table__middle > .q-table > tbody > tr > td:nth-child(n+4) {
    text-align: right;
}

/* * >>> .q-table > thead > tr:nth-child(1) > th:nth-child(4)
{
  border: 1px solid black !important;
  min-width: 30px !important;
  max-width: 30px !important;
  overflow: hidden;
}

* >>> .q-table > thead > tr:nth-child(2) > th:nth-child(8)
{
  border: 1px solid black !important;
  min-width: 30px !important;
  max-width: 30px !important;
  overflow: hidden;
}

* >>> .q-table > thead > tr:nth-child(3) > th:nth-child(23)
{
  border: 1px solid blue !important;
  min-width: 30px !important;
  max-width: 30px !important;
  overflow: hidden;
}

* >>> .q-table > thead > tr:nth-child(4) > th:nth-child(22)
{
  border: 5px solid orange !important;
  min-width: 30px !important;
  max-width: 30px !important;
  overflow: hidden;
}



* >>> .q-table > tbody > tr > td:nth-child(23) {
  border: 1px solid yellow !important;
  width: 100px;
  overflow: hidden;
} */

.table_budget_2 > .q-table__middle > .q-table > thead > tr:nth-child(2) > th:nth-child(4),
.table_budget_2 > .q-table__middle > .q-table > thead > tr:nth-child(2) > th:nth-child(6)
{
  /* border-top: 1px solid black !important; */
}

* >>> .table_budget_2 > .q-table__top
{
    border-bottom:0px;
}

.negative_value
{
    color: red;
}

.rotate {
  -webkit-transform: rotate(-90deg);
  transform: rotate(-90deg);
  width: 1%;
}

/* table thead tr:nth-child(1) {
    position: sticky;
    top: 0px;
} */

/* table thead tr:nth-child(1) {
    background-color: #c0c0c0;
    position:fixed;
    top:60px;
    width:100%;
    z-index:100;
} */
.table_budget_2 > .q-table__middle > .q-table > thead > tr > th:nth-child(1),
.table_budget_2 > .q-table__middle > .q-table > tbody > tr > td:nth-child(1)
{
    min-width: 20px;
    max-width: 20px;
    padding: 0px;
}

/* 
.table_budget_2 > .q-table__middle > .q-table > tbody > tr > td:nth-child(1)
{
    background-color: red !important;
    left: 0;
    position: sticky;
}

.table_budget_2 > .q-table__middle > .q-table > tbody > tr > td:nth-child(2)
{
    background-color: yellow !important;
    left: 20px;
    position: sticky;
} */

.table_budget_2 > .q-table__middle > .q-table > thead > tr:nth-child(1) > th
{
    top: 0;
    position: sticky;
    z-index: 110;
}

.table_budget_2 > .q-table__middle > .q-table > thead > tr:nth-child(2) > th
{
    top: v-bind(first_height);
    position: sticky;
    z-index: 110;
}

/* .table_budget_2 > .q-table__middle > .q-table > thead > tr:nth-child(3) > th
{
    top: v-bind(second_height);
    position: sticky;
    z-index: 110;
} */

.table_budget_2 > .q-table__middle > .q-table > thead > tr:nth-child(4) > th
{
    top: v-bind(third_height);
    position: sticky;
    z-index: 110;
}

.q-inner-loading
{
    z-index: 200;
}

/* tr.table_row:nth-last-child(5) > td
{
    background-color: red;
    border-bottom: 1px solid black;
} */

/* .last_row > td
{
    border-bottom: 1px solid black;
} */

.table_row > td
{
    border-bottom: 1px solid black;
}

.table_row_second > td
{
    border-bottom: 1px solid black;
    background-color: yellow;
}

.table_row_third > td
{
    border-bottom: 1px solid black;
    background-color: yellow;
}


</style>