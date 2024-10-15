<template>
   <div class="q-pa-md test" style="overflow-x: auto;">
    <q-card class="bg-grey-3 relative-position">

    <q-card-section style="padding: 0px;">

    <!-- <span>{{formatAmount(json_data.Division_Total.Details_month_to_date.Sales.Sales_TY_amount,'%')}}</span> -->
    <q-table :class="['table_total_division1 table_total_division1'+table_class]"
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
                        
                    </div>

                    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" style="display: flex;">
                        
                        <div style="border: 1px solid black;margin-left: auto;padding-left: 5px; padding-right: 5px; margin-right: 5px;">
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

        <q-tr :props="props" style="background-color: white; color:black;" v-if="show_expand">
            
            <q-th style="border: 0px;background-color: white;position: sticky; left: 0;background-color:white;z-index: 120; "></q-th>
            <q-th style="border: 0px;background-color: white;background-color:white;"></q-th>
            <q-th style="min-width: 40px;max-width: 40px; border: 0px;background-color: white;position:sticky;left: 0px;z-index:120;"></q-th>
            <q-th style="border: 0px;background-color: white;"></q-th>

            <q-th style="border: 0px;background-color: white;"></q-th>
            <q-th style="border: 0px;background-color: white;"></q-th>
            <q-th style="border: 0px;background-color: white;"></q-th>

            
            
            <q-th v-if="colspan.DayToDate.SalesShow" style="border: 0px;border-top:1px solid black;border-bottom: 1px solid black;border-left: 1px solid black;"></q-th>
            <q-th :style="['border: 0px;border-top:1px solid black;border-bottom: 1px solid black;', colspan.DayToDate.SalesShow ? 'border-left: 0px;' : 'border-left: 1px solid black;']"><q-btn style="float: left;" @click="SalesColumnDayButtonClick" square color="blue-grey-2" text-color="black" :icon="colspan.DayToDate.SalesIcon" size="xs" padding="none"><q-badge v-if="!colspan.DayToDate.SalesShow" color="positive" floating rounded transparent></q-badge></q-btn></q-th>
            <q-th style="border: 0px;border-top:1px solid black;border-bottom: 1px solid black;"></q-th>

            <q-th v-if="colspan.DayToDate.ProfitShow" style="border: 0px;border-top:1px solid black;border-bottom: 1px solid black;"></q-th>
            <q-th :style="['border: 0px;border-top:1px solid black;border-bottom: 1px solid black;', colspan.DayToDate.ProfitShow ? 'border-left: 0px;' : 'border-left: 0px;']"><q-btn style="float: left;" @click="ProfitColumnDayButtonClick" square color="blue-grey-2" text-color="black" :icon="colspan.DayToDate.ProfitIcon" size="xs" padding="none"><q-badge v-if="!colspan.DayToDate.ProfitShow" color="positive" floating rounded transparent></q-badge></q-btn></q-th>
            <q-th style="border: 0px;border-top:1px solid black;border-bottom: 1px solid black;"></q-th>
            <q-th style="border: 0px;border-top:1px solid black;border-bottom: 1px solid black;"></q-th>
            <q-th style="border: 0px;border-top:1px solid black;border-bottom: 1px solid black;"></q-th>

            <q-th style="border: 0px;padding: 0px; border-left: 1px solid black;"></q-th>



            <q-th v-if="colspan.WeekToDate.SalesShow" style="border: 0px;border-top:1px solid black;border-bottom: 1px solid black;border-left: 1px solid black;"></q-th>
            <q-th :style="['border: 0px;border-top:1px solid black;border-bottom: 1px solid black;', colspan.WeekToDate.SalesShow ? 'border-left: 0px;' : 'border-left: 1px solid black;']"><q-btn style="float: left;" @click="SalesColumnWeekButtonClick" square color="blue-grey-2" text-color="black" :icon="colspan.WeekToDate.SalesIcon" size="xs" padding="none"><q-badge v-if="!colspan.WeekToDate.SalesShow" color="positive" floating rounded transparent></q-badge></q-btn></q-th>
            <q-th style="border: 0px;border-top:1px solid black;border-bottom: 1px solid black;"></q-th>

            <q-th v-if="colspan.WeekToDate.ProfitShow" style="border: 0px;border-top:1px solid black;border-bottom: 1px solid black;"></q-th>
            <q-th :style="['border: 0px;border-top:1px solid black;border-bottom: 1px solid black;', colspan.WeekToDate.ProfitShow ? 'border-left: 0px;' : 'border-left: 0px;']"><q-btn style="float: left;" @click="ProfitColumnWeekButtonClick" square color="blue-grey-2" text-color="black" :icon="colspan.WeekToDate.ProfitIcon" size="xs" padding="none"><q-badge v-if="!colspan.WeekToDate.ProfitShow" color="positive" floating rounded transparent></q-badge></q-btn></q-th>
            <q-th style="border: 0px;border-top:1px solid black;border-bottom: 1px solid black;"></q-th>
            <q-th style="border: 0px;border-top:1px solid black;border-bottom: 1px solid black;"></q-th>
            <q-th style="border: 0px;border-top:1px solid black;border-bottom: 1px solid black;"></q-th>

            <q-th style="border: 0px;padding: 0px; border-left: 1px solid black;"></q-th>




            <q-th v-if="colspan.MonthToDate.SalesShow" style="border: 0px;border-top:1px solid black;border-bottom: 1px solid black;border-left: 1px solid black;"></q-th>
            <q-th :style="['border: 0px;border-top:1px solid black;border-bottom: 1px solid black;', colspan.MonthToDate.SalesShow ? 'border-left: 0px;' : 'border-left: 1px solid black;']"><q-btn style="float: left;" @click="SalesColumnButtonClick" square color="blue-grey-2" text-color="black" :icon="colspan.MonthToDate.SalesIcon" size="xs" padding="none"><q-badge v-if="!colspan.MonthToDate.SalesShow" color="positive" floating rounded transparent></q-badge></q-btn></q-th>
            <q-th style="border: 0px;border-top:1px solid black;border-bottom: 1px solid black;"></q-th>

            <q-th v-if="colspan.MonthToDate.ProfitShow" style="border: 0px;border-top:1px solid black;border-bottom: 1px solid black;"></q-th>
            <q-th :style="['border: 0px;border-top:1px solid black;border-bottom: 1px solid black;', colspan.MonthToDate.ProfitShow ? 'border-left: 0px;' : 'border-left: 0px;']"><q-btn style="float: left;" @click="ProfitColumnButtonClick" square color="blue-grey-2" text-color="black" :icon="colspan.MonthToDate.ProfitIcon" size="xs" padding="none"><q-badge v-if="!colspan.MonthToDate.ProfitShow" color="positive" floating rounded transparent></q-badge></q-btn></q-th>
            <q-th style="border: 0px;border-top:1px solid black;border-bottom: 1px solid black;"></q-th>
            <q-th style="border: 0px;border-top:1px solid black;border-bottom: 1px solid black;"></q-th>
            <q-th style="border: 0px;border-top:1px solid black;border-bottom: 1px solid black;"></q-th>

            <q-th style="border: 0px;padding: 0px; border-left: 1px solid black;"></q-th>

            <!-- <q-th style="border: 0px;border-top:1px solid black;border-bottom: 1px solid black;"><q-btn style="float: left;" @click="ScanGPColumnButtonClick1" square color="blue-grey-2" text-color="black" :icon="colspan.MonthToDate.ScanGPIcon1" size="xs" padding="none"><q-badge v-if="!colspan.MonthToDate.ScanGPShow1" color="positive" floating rounded transparent></q-badge></q-btn></q-th>
            <q-th v-if="colspan.MonthToDate.ScanGPShow1" style="border: 0px;border-top:1px solid black;border-bottom: 1px solid black;"></q-th>
            <q-th style="border: 0px;border-top:1px solid black;border-bottom: 1px solid black;"><q-btn style="float: left;" @click="ScanGPColumnButtonClick2" square color="blue-grey-2" text-color="black" :icon="colspan.MonthToDate.ScanGPIcon2" size="xs" padding="none"><q-badge v-if="!colspan.MonthToDate.ScanGPShow2" color="positive" floating rounded transparent></q-badge></q-btn></q-th>
            <q-th v-if="colspan.MonthToDate.ScanGPShow2" style="border: 0px;border-top:1px solid black;border-bottom: 1px solid black;"></q-th>
            <q-th style="border: 0px;padding: 0px;border-top:1px solid black;border-bottom: 1px solid black;"></q-th>

            <q-th style="border: 0px;border-top:1px solid black;border-bottom: 1px solid black;"><q-btn style="float: left;" @click="ShrinkageColumnButtonClick1" square color="blue-grey-2" text-color="black" :icon="colspan.MonthToDate.ShrinkageIcon1" size="xs" padding="none"><q-badge v-if="!colspan.MonthToDate.ShrinkageShow1" color="positive" floating rounded transparent></q-badge></q-btn></q-th>
            <q-th v-if="colspan.MonthToDate.ShrinkageShow1" style="border: 0px;border-top:1px solid black;border-bottom: 1px solid black;"></q-th>
            <q-th style="border: 0px;border-top:1px solid black;border-bottom: 1px solid black;"><q-btn style="float: left;" @click="ShrinkageColumnButtonClick2" square color="blue-grey-2" text-color="black" :icon="colspan.MonthToDate.ShrinkageIcon2" size="xs" padding="none"><q-badge v-if="!colspan.MonthToDate.ShrinkageShow2" color="positive" floating rounded transparent></q-badge></q-btn></q-th>
            <q-th v-if="colspan.MonthToDate.ShrinkageShow2" style="border: 0px;border-top:1px solid black;border-bottom: 1px solid black;"></q-th>
            <q-th style="border: 0px;padding: 0px;border-top:1px solid black;border-bottom: 1px solid black;"></q-th>

            <q-th style="border: 0px;border-top:1px solid black;border-bottom: 1px solid black;"><q-btn style="float: left;" @click="NetGPColumnButtonClick1" square color="blue-grey-2" text-color="black" :icon="colspan.MonthToDate.NetGPIcon1" size="xs" padding="none"><q-badge v-if="!colspan.MonthToDate.NetGPShow1" color="positive" floating rounded transparent></q-badge></q-btn></q-th>
            <q-th v-if="colspan.MonthToDate.NetGPShow1" style="border: 0px;border-top:1px solid black;border-bottom: 1px solid black;"></q-th>
            <q-th style="border: 0px;border-top:1px solid black;border-bottom: 1px solid black;"><q-btn style="float: left;" @click="NetGPColumnButtonClick2" square color="blue-grey-2" text-color="black" :icon="colspan.MonthToDate.NetGPIcon2" size="xs" padding="none"><q-badge v-if="!colspan.MonthToDate.NetGPShow2" color="positive" floating rounded transparent></q-badge></q-btn></q-th>
            <q-th v-if="colspan.MonthToDate.NetGPShow2" style="border: 0px;border-top:1px solid black;border-bottom: 1px solid black;"></q-th>
            <q-th style="border: 0px;padding: 0px;border-top:1px solid black;border-bottom: 1px solid black;"></q-th>

            <q-th style="border: 0px;border-top:1px solid black;border-bottom: 1px solid black;"></q-th>
            <q-th style="border: 0px;border-top:1px solid black;border-bottom: 1px solid black;"><q-btn style="float: left;" @click="StockColumnButtonClick" square color="blue-grey-2" text-color="black" :icon="colspan.MonthToDate.StockIcon" size="xs" padding="none"><q-badge v-if="!colspan.MonthToDate.StockShow" color="positive" floating rounded transparent></q-badge></q-btn></q-th>
            <q-th v-if="colspan.MonthToDate.StockShow" style="border: 0px;border-top:1px solid black;border-bottom: 1px solid black;"></q-th>
            <q-th style="border: 0px;border-top:1px solid black;border-bottom: 1px solid black;"></q-th>
            <q-th style="border: 0px;border-top:1px solid black;border-bottom: 1px solid black;border-right: 1px solid black;"></q-th>

            <q-th style="border: 0px;min-width: 10px;max-width: 10px; border-top: 0px;border-bottom:0px;background-color: white;"></q-th> -->

            

            <q-th v-if="colspan.YearToDate.SalesShow" style="border: 0px;border-top:1px solid black;border-bottom: 1px solid black;border-left: 1px solid black;"></q-th>
            <q-th :style="['border: 0px;border-top:1px solid black;border-bottom: 1px solid black;', colspan.YearToDate.SalesShow ? 'border-left: 0px;' : 'border-left: 1px solid black;']"><q-btn style="float: left;" @click="SalesColumnYearButtonClick" square color="blue-grey-2" text-color="black" :icon="colspan.YearToDate.SalesIcon" size="xs" padding="none"><q-badge v-if="!colspan.YearToDate.SalesShow" color="positive" floating rounded transparent></q-badge></q-btn></q-th>
            <q-th style="border: 0px;border-top:1px solid black;border-bottom: 1px solid black;"></q-th>
            

            <q-th v-if="colspan.YearToDate.ProfitShow" style="border: 0px;border-top:1px solid black;border-bottom: 1px solid black;"></q-th>
            <q-th :style="['border: 0px;border-top:1px solid black;border-bottom: 1px solid black;', colspan.YearToDate.ProfitShow ? 'border-left: 0px;' : 'border-left: 0px;']"><q-btn style="float: left;" @click="ProfitColumnYearButtonClick" square color="blue-grey-2" text-color="black" :icon="colspan.YearToDate.ProfitIcon" size="xs" padding="none"><q-badge v-if="!colspan.YearToDate.ProfitShow" color="positive" floating rounded transparent></q-badge></q-btn></q-th>
            <q-th style="border: 0px;border-top:1px solid black;border-bottom: 1px solid black;"></q-th>
            <q-th style="border: 0px;border-top:1px solid black;border-bottom: 1px solid black;"></q-th>
            <q-th style="border: 0px;border-top:1px solid black;border-bottom: 1px solid black;border-right:1px solid black;"></q-th>
            <!-- <q-th style="border: 0px;padding: 0px;border-top:1px solid black;border-bottom: 1px solid black;"></q-th> -->

            <!-- <q-th style="border: 0px;border-top:1px solid black;border-bottom: 1px solid black;"><q-btn style="float: left;" @click="ScanGPColumnYearButtonClick1" square color="blue-grey-2" text-color="black" :icon="colspan.YearToDate.ScanGPIcon1" size="xs" padding="none"><q-badge v-if="!colspan.YearToDate.ScanGPShow1" color="positive" floating rounded transparent></q-badge></q-btn></q-th>
            <q-th v-if="colspan.YearToDate.ScanGPShow1" style="border: 0px;border-top:1px solid black;border-bottom: 1px solid black;"></q-th>
            <q-th style="border: 0px;border-top:1px solid black;border-bottom: 1px solid black;"><q-btn style="float: left;" @click="ScanGPColumnYearButtonClick2" square color="blue-grey-2" text-color="black" :icon="colspan.YearToDate.ScanGPIcon2" size="xs" padding="none"><q-badge v-if="!colspan.YearToDate.ScanGPShow2" color="positive" floating rounded transparent></q-badge></q-btn></q-th>
            <q-th v-if="colspan.YearToDate.ScanGPShow2" style="border: 0px;border-top:1px solid black;border-bottom: 1px solid black;"></q-th>
            <q-th style="border: 0px;padding: 0px;border-top:1px solid black;border-bottom: 1px solid black;"></q-th>

            <q-th style="border: 0px;border-top:1px solid black;border-bottom: 1px solid black;"><q-btn style="float: left;" @click="ShrinkageColumnYearButtonClick1" square color="blue-grey-2" text-color="black" :icon="colspan.YearToDate.ShrinkageIcon1" size="xs" padding="none"><q-badge v-if="!colspan.YearToDate.ShrinkageShow1" color="positive" floating rounded transparent></q-badge></q-btn></q-th>
            <q-th v-if="colspan.YearToDate.ShrinkageShow1" style="border: 0px;border-top:1px solid black;border-bottom: 1px solid black;"></q-th>
            <q-th style="border: 0px;border-top:1px solid black;border-bottom: 1px solid black;"><q-btn style="float: left;" @click="ShrinkageColumnYearButtonClick2" square color="blue-grey-2" text-color="black" :icon="colspan.YearToDate.ShrinkageIcon2" size="xs" padding="none"><q-badge v-if="!colspan.YearToDate.ShrinkageShow2" color="positive" floating rounded transparent></q-badge></q-btn></q-th>
            <q-th v-if="colspan.YearToDate.ShrinkageShow2" style="border: 0px;border-top:1px solid black;border-bottom: 1px solid black;"></q-th>
            <q-th style="border: 0px;padding: 0px;border-top:1px solid black;border-bottom: 1px solid black;"></q-th>

            <q-th style="border: 0px;border-top:1px solid black;border-bottom: 1px solid black;"><q-btn style="float: left;" @click="NetGPColumnYearButtonClick1" square color="blue-grey-2" text-color="black" :icon="colspan.YearToDate.NetGPIcon1" size="xs" padding="none"><q-badge v-if="!colspan.YearToDate.NetGPShow1" color="positive" floating rounded transparent></q-badge></q-btn></q-th>
            <q-th v-if="colspan.YearToDate.NetGPShow1" style="border: 0px;border-top:1px solid black;border-bottom: 1px solid black;"></q-th>
            <q-th style="border: 0px;border-top:1px solid black;border-bottom: 1px solid black;"><q-btn style="float: left;" @click="NetGPColumnYearButtonClick2" square color="blue-grey-2" text-color="black" :icon="colspan.YearToDate.NetGPIcon2" size="xs" padding="none"><q-badge v-if="!colspan.YearToDate.NetGPShow2" color="positive" floating rounded transparent></q-badge></q-btn></q-th>
            <q-th v-if="colspan.YearToDate.NetGPShow2" style="border: 0px;border-top:1px solid black;border-bottom: 1px solid black;"></q-th>
            <q-th style="border: 0px;padding: 0px;border-top:1px solid black;border-bottom: 1px solid black;"></q-th>

            <q-th style="border: 0px;border-top:1px solid black;border-bottom: 1px solid black;"></q-th>
            <q-th style="border: 0px;border-top:1px solid black;border-bottom: 1px solid black;"><q-btn style="float: left;" @click="StockColumnYearButtonClick" square color="blue-grey-2" text-color="black" :icon="colspan.YearToDate.StockIcon" size="xs" padding="none"><q-badge v-if="!colspan.YearToDate.StockShow" color="positive" floating rounded transparent></q-badge></q-btn></q-th>
            <q-th v-if="colspan.YearToDate.StockShow" style="border: 0px;border-top:1px solid black;border-bottom: 1px solid black;"></q-th>
            <q-th style="border: 0px;border-top:1px solid black;border-bottom: 1px solid black;"></q-th>
            <q-th style="border: 0px;border-top:1px solid black;border-bottom: 1px solid black;border-right: 1px solid black;"></q-th> -->

        </q-tr>

        <q-tr :props="props">
            <q-th style="background-color: white;position: sticky; left: 0;background-color:white;z-index: 120;"></q-th>
            <q-th style="border: 0px; background-color: white;"></q-th>
            <q-th style="min-width: 40px;max-width: 40px; border: 0px; background-color: white;position:sticky;left: 0px;z-index:120;"></q-th>
            <q-th style="border: 0px; background-color: white;"></q-th>
            <q-th style="border: 0px;background-color: white;"></q-th>
            <q-th style="border: 0px;background-color: white;"></q-th>
            <q-th style="border: 0px;background-color: white;"></q-th>

            <q-th :colspan="colspan.DayToDate.DayToDate" style="background-color: #295fbd; color: white;">Day-to-Date {{ Day_to_Date }}</q-th>
            <q-th style="border-top:0px;border-bottom:0px;background-color: white;padding:0px;"></q-th>

            <q-th :colspan="colspan.WeekToDate.WeekToDate" style="background-color: #2f3a4d; color: white;">Week-to-Date {{ Week_to_Date }}</q-th>
            <q-th style="border-top:0px;border-bottom:0px;background-color: white;padding:0px;"></q-th>

            <q-th :colspan="colspan.MonthToDate.MonthToDate" style="background-color: #295fbd; color: white;">Month-to-Date</q-th>
            <q-th style="border-top:0px;border-bottom:0px;background-color: white;padding:0px;"></q-th>

            <q-th :colspan="colspan.YearToDate.YearToDate" style="border-right: 1px solid black;background-color: #2f3a4d; color: white;">Year-to-Date</q-th>
        </q-tr>

        <q-tr :props="props" >
            <q-th style="background-color: white;position: sticky; left: 0;z-index: 120;"></q-th>
            <q-th style="border: 0px;background-color: black;color: white;"></q-th>
            <q-th style="min-width: 40px;max-width: 40px; border: 0px;background-color: black;position:sticky;left: 0px;z-index:120;color: white;">
                Store
                <q-popup-edit title="Filter">

                    <q-list bordered separator dense style="margin-bottom: 10px;">
                        <q-item @click="handleSorting('ascending', 'code')" clickable v-ripple :active="active_sorting == 'ascending' && active_sorting_column == 'code' ? true : false">
                            <q-item-section>Sort Ascending</q-item-section>
                        </q-item>

                        <q-item @click="handleSorting('descending', 'code')" clickable v-ripple :active="active_sorting == 'descending' && active_sorting_column == 'code' ? true : false">
                            <q-item-section>Sort Descending</q-item-section>
                        </q-item>
                    </q-list>

                    <MultiSelectFilter
                    :disable="false"
                    :readonly="false"
                    :no_label="true"
                    :text="'Supplier'"
                    v-model:pass_value="code_value"
                    :dbComponentBehavior="dbComponentBehavior.store_select"
                    :options="code_options"
                    v-on:receiveChange="handleChangeOptions"
                    />
                </q-popup-edit>

                <q-icon v-if="active_sorting != '' && active_sorting_column == 'code'" style="font-size: 13px; color: #87ff87;" :class="[active_sorting == 'ascending' ? 'flip_down' : 'flip_up']" name="filter_list" />
                
                <q-btn v-if="code_value.length > 0" dense color="white" round icon="filter_alt" flat style="font-size: 10px;margin-top: 5px;">
                    <q-badge color="red" floating style="font-size: 8px;padding-top: 0px;padding-bottom: 0px;text-transform: none !important;">{{code_value.length == code_options.length ? 'All' : code_value.length}}</q-badge>
                </q-btn>
            </q-th>

            <q-th style="border: 0px;background-color: black;color: white;">
                Name
                <q-popup-edit title="Filter">

                    <q-list bordered separator dense style="margin-bottom: 10px;">
                        <q-item @click="handleSorting('ascending', 'Title')" clickable v-ripple :active="active_sorting == 'ascending' && active_sorting_column == 'Title' ? true : false">
                            <q-item-section>Sort Ascending</q-item-section>
                        </q-item>

                        <q-item @click="handleSorting('descending', 'Title')" clickable v-ripple :active="active_sorting == 'descending' && active_sorting_column == 'Title' ? true : false">
                            <q-item-section>Sort Descending</q-item-section>
                        </q-item>
                    </q-list>

                    <MultiSelectFilter
                    :disable="false"
                    :readonly="false"
                    :no_label="true"
                    :text="'Supplier'"
                    v-model:pass_value="store_value"
                    :dbComponentBehavior="dbComponentBehavior.store_select"
                    :options="store_options"
                    v-on:receiveChange="handleChangeOptions"
                    />
                </q-popup-edit>

                <q-icon v-if="active_sorting != '' && active_sorting_column == 'Title'" style="font-size: 13px; color: #87ff87;" :class="[active_sorting == 'ascending' ? 'flip_down' : 'flip_up']" name="filter_list" />

                <q-btn v-if="store_value.length > 0" dense color="white" round icon="filter_alt" flat style="font-size: 10px;margin-top: 5px;">
                    <q-badge color="red" floating style="font-size: 8px;padding-top: 0px;padding-bottom: 0px;text-transform: none !important;">{{store_value.length == store_options.length ? 'All' : store_value.length}}</q-badge>
                </q-btn>
            </q-th>
            <q-th style="border: 0px;background-color: black;color: white;">
                Cohort
                <q-popup-edit title="Filter">

                    <q-list bordered separator dense style="margin-bottom: 10px;">
                        <q-item @click="handleSorting('ascending', 'Cohort')" clickable v-ripple :active="active_sorting == 'ascending' && active_sorting_column == 'Cohort' ? true : false">
                            <q-item-section>Sort Ascending</q-item-section>
                        </q-item>

                        <q-item @click="handleSorting('descending', 'Cohort')" clickable v-ripple :active="active_sorting == 'descending' && active_sorting_column == 'Cohort' ? true : false">
                            <q-item-section>Sort Descending</q-item-section>
                        </q-item>
                    </q-list>
                    
                    <MultiSelectFilter
                    :disable="false"
                    :readonly="false"
                    :no_label="true"
                    :text="'Cohort'"
                    v-model:pass_value="cohort_value"
                    :dbComponentBehavior="dbComponentBehavior.store_select"
                    :options="cohort_options"
                    v-on:receiveChange="handleChangeOptions"
                    />
                </q-popup-edit>

                <q-icon v-if="active_sorting != '' && active_sorting_column == 'Cohort'" style="font-size: 13px; color: #87ff87;" :class="[active_sorting == 'ascending' ? 'flip_down' : 'flip_up']" name="filter_list" />

                <q-btn v-if="cohort_value.length > 0" dense color="white" round icon="filter_alt" flat style="font-size: 10px;margin-top: 5px;">
                    <q-badge color="red" floating style="font-size: 8px;padding-top: 0px;padding-bottom: 0px;text-transform: none !important;">{{cohort_value.length == store_options.length ? 'All' : cohort_value.length}}</q-badge>
                </q-btn>
            </q-th>
            <q-th style="border: 0px;background-color: black;color: white;">
                State
                <q-popup-edit title="Filter">

                    <q-list bordered separator dense style="margin-bottom: 10px;">
                        <q-item @click="handleSorting('ascending', 'State')" clickable v-ripple :active="active_sorting == 'ascending' && active_sorting_column == 'State' ? true : false">
                            <q-item-section>Sort Ascending</q-item-section>
                        </q-item>

                        <q-item @click="handleSorting('descending', 'State')" clickable v-ripple :active="active_sorting == 'descending' && active_sorting_column == 'State' ? true : false">
                            <q-item-section>Sort Descending</q-item-section>
                        </q-item>
                    </q-list>

                    <MultiSelectFilter
                    :disable="false"
                    :readonly="false"
                    :no_label="true"
                    :text="'State'"
                    v-model:pass_value="state_value"
                    :dbComponentBehavior="dbComponentBehavior.store_select"
                    :options="state_options"
                    v-on:receiveChange="handleChangeOptions"
                    />
                </q-popup-edit>

                <q-icon v-if="active_sorting != '' && active_sorting_column == 'State'" style="font-size: 13px; color: #87ff87;" :class="[active_sorting == 'ascending' ? 'flip_down' : 'flip_up']" name="filter_list" />

                <q-btn v-if="state_value.length > 0" dense color="white" round icon="filter_alt" flat style="font-size: 10px;margin-top: 5px;">
                    <q-badge color="red" floating style="font-size: 8px;padding-top: 0px;padding-bottom: 0px;text-transform: none !important;">{{state_value.length == store_options.length ? 'All' : state_value.length}}</q-badge>
                </q-btn>
            </q-th>
            <q-th style="border: 0px;background-color: black;color: white;">
                Am
                <q-popup-edit title="Filter">

                    <q-list bordered separator dense style="margin-bottom: 10px;">
                        <q-item @click="handleSorting('ascending', 'AM')" clickable v-ripple :active="active_sorting == 'ascending' && active_sorting_column == 'AM' ? true : false">
                            <q-item-section>Sort Ascending</q-item-section>
                        </q-item>

                        <q-item @click="handleSorting('descending', 'AM')" clickable v-ripple :active="active_sorting == 'descending' && active_sorting_column == 'AM' ? true : false">
                            <q-item-section>Sort Descending</q-item-section>
                        </q-item>
                    </q-list>

                    <MultiSelectFilter
                    :disable="false"
                    :readonly="false"
                    :no_label="true"
                    :text="'AM'"
                    v-model:pass_value="am_value"
                    :dbComponentBehavior="dbComponentBehavior.store_select"
                    :options="am_options"
                    v-on:receiveChange="handleChangeOptions"
                    />
                </q-popup-edit>

                <q-icon v-if="active_sorting != '' && active_sorting_column == 'AM'" style="font-size: 13px; color: #87ff87;" :class="[active_sorting == 'ascending' ? 'flip_down' : 'flip_up']" name="filter_list" />

                <q-btn v-if="am_value.length > 0" dense color="white" round icon="filter_alt" flat style="font-size: 10px;margin-top: 5px;">
                    <q-badge color="red" floating style="font-size: 8px;padding-top: 0px;padding-bottom: 0px;text-transform: none !important;">{{am_value.length == store_options.length ? 'All' : am_value.length}}</q-badge>
                </q-btn>
            </q-th>


            <q-th :colspan="colspan.DayToDate.Sales" style="background-color: #a5c6ff; color:black;">Sales</q-th>
            <q-th :colspan="colspan.DayToDate.Profit" style="background-color: #a5c6ff; color:black;">Profit</q-th>
            <q-th :colspan="colspan.DayToDate.ProfitMargin" style="background-color: #a5c6ff; color:black;">Profit %</q-th>
            <q-th style="padding: 0px;background-color: white;"></q-th>

            

            <q-th :colspan="colspan.WeekToDate.Sales" style="background-color: #a5c6ff; color:black;">Sales</q-th>
            <q-th :colspan="colspan.WeekToDate.Profit" style="background-color: #a5c6ff; color:black;">Profit</q-th>
            <q-th :colspan="colspan.WeekToDate.ProfitMargin" style="background-color: #a5c6ff; color:black;">Profit %</q-th>
            <q-th style="padding: 0px;background-color: white;"></q-th>



            <q-th :colspan="colspan.MonthToDate.Sales" style="background-color: #a5c6ff; color:black;">Sales</q-th>
            <q-th :colspan="colspan.MonthToDate.Profit" style="background-color: #a5c6ff; color:black;">Profit</q-th>
            <q-th :colspan="colspan.MonthToDate.ProfitMargin" style="background-color: #a5c6ff; color:black;">Profit %</q-th>
            <q-th style="padding: 0px;background-color: white;"></q-th>
            <!-- <q-th :colspan="colspan.MonthToDate.ScanGP">Scan GP</q-th>
            <q-th style="padding: 0px;"></q-th>
            <q-th :colspan="colspan.MonthToDate.Shrinkage">Shrinkage</q-th>
            <q-th style="padding: 0px;"></q-th>
            <q-th :colspan="colspan.MonthToDate.NetGP">Net GP</q-th>
            <q-th style="padding: 0px;"></q-th>
            <q-th :colspan="colspan.MonthToDate.Stock">Stock </q-th>
            <q-th style="padding: 0px;background-color: white;"></q-th> -->
            <q-th :colspan="colspan.YearToDate.Sales" style="background-color: #a5c6ff; color:black;">Sales</q-th>
            <q-th :colspan="colspan.YearToDate.Profit" style="background-color: #a5c6ff; color:black;">Profit</q-th>
            <q-th :colspan="colspan.YearToDate.ProfitMargin" style="background-color: #a5c6ff; color:black;border-right: 1px solid black;">Profit %</q-th>
            <!-- <q-th style="padding: 0px;"></q-th>
            <q-th :colspan="colspan.YearToDate.ScanGP">Scan GP</q-th>
            <q-th style="padding: 0px;"></q-th>
            <q-th :colspan="colspan.YearToDate.Shrinkage">Shrinkage</q-th>
            <q-th style="padding: 0px;"></q-th>
            <q-th :colspan="colspan.YearToDate.NetGP">Net GP</q-th>
            <q-th style="padding: 0px;"></q-th>
            <q-th :colspan="colspan.YearToDate.Stock" style="border-right: 1px solid black;">Stock</q-th> -->
        </q-tr>

        <q-tr :props="props" style="background-color: #e0ebff; color:black;">

            <q-th style="background-color: white;position: sticky; left: 0;background-color:white;z-index: 120;"></q-th>
            <q-th style="border-bottom: 1px solid black;background-color: black; color: white;"></q-th>
            <!-- <q-th style="min-width: 30px;max-width: 30px;border: 0px;background-color: white;position:sticky;left: 20px;z-index:120;"></q-th> -->
            <q-th style="min-width: 40px;max-width: 40px; border-bottom: 1px solid black;background-color: black; color: white;position:sticky;left: 0px;z-index:120;"></q-th>
            <q-th style="min-width: 120px;max-width: 120px;border-bottom: 1px solid black;background-color: black; color: white;"></q-th>

            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;background-color: black;"></q-th>
            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;background-color: black;"></q-th>
            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;background-color: black;"></q-th>
            


            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;" @click="handleSortingColumn('Details_same_day.Sales.Sales_TY_amount')">TY <q-icon v-if="active_sorting_column == 'Details_same_day.Sales.Sales_TY_amount'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th v-if="colspan.DayToDate.SalesShow" style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;" @click="handleSortingColumn('Details_same_day.Sales.Sales_LY_amount')">LY <q-icon v-if="active_sorting_column == 'Details_same_day.Sales.Sales_LY_amount'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;" @click="handleSortingColumn('Details_same_day.Sales.Sales_vsLY_percent')">vs LY <q-icon v-if="active_sorting_column == 'Details_same_day.Sales.Sales_vsLY_percent'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            
            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;background-color: #e0ebff; color:black;" @click="handleSortingColumn('Details_same_day.Profit.Profit_TY_amount')">TY <q-icon v-if="active_sorting_column == 'Details_same_day.Profit.Profit_TY_amount'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th v-if="colspan.DayToDate.ProfitShow" style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;background-color: #e0ebff; color:black;" @click="handleSortingColumn('Details_same_day.Profit.Profit_LY_amount')">LY <q-icon v-if="active_sorting_column == 'Details_same_day.Profit.Profit_LY_amount'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;background-color: #e0ebff; color:black;" @click="handleSortingColumn('Details_same_day.Profit.Profit_vsLY_percent')">vs LY <q-icon v-if="active_sorting_column == 'Details_same_day.Profit.Profit_vsLY_percent'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;background-color: #e0ebff; color:black;" @click="handleSortingColumn('Details_same_day.Profit.Profit_Margin_TY')">LY <q-icon v-if="active_sorting_column == 'Details_same_day.Profit.Profit_Margin_TY'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;background-color: #e0ebff; color:black;" @click="handleSortingColumn('Details_same_day.Profit.Profit_Margin_LY')">TY <q-icon v-if="active_sorting_column == 'Details_same_day.Profit.Profit_Margin_LY'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th style="padding: 0px;min-width: 5px;max-width: 5px;background-color: white;"></q-th>



            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;" @click="handleSortingColumn('Details_week_to_date.Sales.Sales_TY_amount')">TY <q-icon v-if="active_sorting_column == 'Details_week_to_date.Sales.Sales_TY_amount'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th v-if="colspan.WeekToDate.SalesShow" style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;" @click="handleSortingColumn('Details_week_to_date.Sales.Sales_LY_amount')">LY <q-icon v-if="active_sorting_column == 'Details_week_to_date.Sales.Sales_LY_amount'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;" @click="handleSortingColumn('Details_week_to_date.Sales.Sales_vsLY_percent')">vs LY <q-icon v-if="active_sorting_column == 'Details_week_to_date.Sales.Sales_vsLY_percent'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            
            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;background-color: #e0ebff; color:black;" @click="handleSortingColumn('Details_week_to_date.Profit.Profit_TY_amount')">TY <q-icon v-if="active_sorting_column == 'Details_week_to_date.Profit.Profit_TY_amount'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th v-if="colspan.WeekToDate.ProfitShow" style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;background-color: #e0ebff; color:black;" @click="handleSortingColumn('Details_week_to_date.Profit.Profit_LY_amount')">LY <q-icon v-if="active_sorting_column == 'Details_week_to_date.Profit.Profit_LY_amount'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;background-color: #e0ebff; color:black;" @click="handleSortingColumn('Details_week_to_date.Profit.Profit_vsLY_percent')">vs LY <q-icon v-if="active_sorting_column == 'Details_week_to_date.Profit.Profit_vsLY_percent'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;background-color: #e0ebff; color:black;" @click="handleSortingColumn('Details_week_to_date.Profit.Profit_Margin_TY')">LY <q-icon v-if="active_sorting_column == 'Details_week_to_date.Profit.Profit_Margin_TY'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;background-color: #e0ebff; color:black;" @click="handleSortingColumn('Details_week_to_date.Profit.Profit_Margin_LY')">TY <q-icon v-if="active_sorting_column == 'Details_week_to_date.Profit.Profit_Margin_LY'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th style="padding: 0px;min-width: 5px;max-width: 5px;background-color: white;"></q-th>




            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;" @click="handleSortingColumn('Details_month_to_date.Sales.Sales_TY_amount')">TY <q-icon v-if="active_sorting_column == 'Details_month_to_date.Sales.Sales_TY_amount'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th v-if="colspan.MonthToDate.SalesShow" style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;" @click="handleSortingColumn('Details_month_to_date.Sales.Sales_LY_amount')">LY <q-icon v-if="active_sorting_column == 'Details_month_to_date.Sales.Sales_LY_amount'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;" @click="handleSortingColumn('Details_month_to_date.Sales.Sales_vsLY_percent')">vs LY <q-icon v-if="active_sorting_column == 'Details_month_to_date.Sales.Sales_vsLY_percent'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            
            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;background-color: #e0ebff; color:black;" @click="handleSortingColumn('Details_month_to_date.Profit.Profit_TY_amount')">TY <q-icon v-if="active_sorting_column == 'Details_month_to_date.Profit.Profit_TY_amount'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th v-if="colspan.MonthToDate.ProfitShow" style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;background-color: #e0ebff; color:black;" @click="handleSortingColumn('Details_month_to_date.Profit.Profit_LY_amount')">LY <q-icon v-if="active_sorting_column == 'Details_month_to_date.Profit.Profit_LY_amount'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;background-color: #e0ebff; color:black;" @click="handleSortingColumn('Details_month_to_date.Profit.Profit_vsLY_percent')">vs LY <q-icon v-if="active_sorting_column == 'Details_month_to_date.Profit.Profit_vsLY_percent'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;background-color: #e0ebff; color:black;" @click="handleSortingColumn('Details_month_to_date.Profit.Profit_Margin_TY')">LY <q-icon v-if="active_sorting_column == 'Details_month_to_date.Profit.Profit_Margin_TY'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;background-color: #e0ebff; color:black;" @click="handleSortingColumn('Details_month_to_date.Profit.Profit_Margin_LY')">TY <q-icon v-if="active_sorting_column == 'Details_month_to_date.Profit.Profit_Margin_LY'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th style="padding: 0px;min-width: 5px;max-width: 5px;background-color: white;"></q-th>

            <!-- <q-th v-if="colspan.MonthToDate.ScanGPShow1" style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;" @click="handleSortingColumn('Details_month_to_date.Scan_GP.Scan_GP_TY_amount')">TY <q-icon v-if="active_sorting_column == 'Details_month_to_date.Scan_GP.Scan_GP_TY_amount'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;" @click="handleSortingColumn('Details_month_to_date.Scan_GP.Scan_GP_TY_percent')">TY <q-icon v-if="active_sorting_column == 'Details_month_to_date.Scan_GP.Scan_GP_TY_percent'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th v-if="colspan.MonthToDate.ScanGPShow2" style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;" @click="handleSortingColumn('Details_month_to_date.Scan_GP.Scan_GP_LY_amount')">LY <q-icon v-if="active_sorting_column == 'Details_month_to_date.Scan_GP.Scan_GP_LY_amount'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;" @click="handleSortingColumn('Details_month_to_date.Scan_GP.Scan_GP_LY_percent')">LY <q-icon v-if="active_sorting_column == 'Details_month_to_date.Scan_GP.Scan_GP_LY_percent'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th style="padding: 0px;min-width: 5px;max-width: 5px;border-top:1px solid black;border-bottom: 1px solid black;"></q-th>

            <q-th v-if="colspan.MonthToDate.ShrinkageShow1" style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;" @click="handleSortingColumn('Details_month_to_date.Shrinkage.Shrinkage_TY_amount')">TY <q-icon v-if="active_sorting_column == 'Details_month_to_date.Shrinkage.Shrinkage_TY_amount'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;" @click="handleSortingColumn('Details_month_to_date.Shrinkage.Shrinkage_TY_percent')">TY <q-icon v-if="active_sorting_column == 'Details_month_to_date.Shrinkage.Shrinkage_TY_percent'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th v-if="colspan.MonthToDate.ShrinkageShow2" style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;" @click="handleSortingColumn('Details_month_to_date.Shrinkage.Shrinkage_LY_amount')">LY <q-icon v-if="active_sorting_column == 'Details_month_to_date.Shrinkage.Shrinkage_LY_amount'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;" @click="handleSortingColumn('Details_month_to_date.Shrinkage.Shrinkage_LY_percent')">LY <q-icon v-if="active_sorting_column == 'Details_month_to_date.Shrinkage.Shrinkage_LY_percent'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th style="padding: 0px;min-width: 5px;max-width: 5px;border-top:1px solid black;border-bottom: 1px solid black;"></q-th>

            <q-th v-if="colspan.MonthToDate.NetGPShow1" style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;" @click="handleSortingColumn('Details_month_to_date.Net_GP.Net_GP_TY_amount')">TY <q-icon v-if="active_sorting_column == 'Details_month_to_date.Net_GP.Net_GP_TY_amount'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;" @click="handleSortingColumn('Details_month_to_date.Net_GP.Net_GP_TY_percent')">TY <q-icon v-if="active_sorting_column == 'Details_month_to_date.Net_GP.Net_GP_TY_percent'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th v-if="colspan.MonthToDate.NetGPShow2" style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;" @click="handleSortingColumn('Details_month_to_date.Net_GP.Net_GP_LY_amount')">LY <q-icon v-if="active_sorting_column == 'Details_month_to_date.Net_GP.Net_GP_LY_amount'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;" @click="handleSortingColumn('Details_month_to_date.Net_GP.Net_GP_LY_percent')">LY <q-icon v-if="active_sorting_column == 'Details_month_to_date.Net_GP.Net_GP_LY_percent'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th style="padding: 0px;min-width: 5px;max-width: 5px;border-top:1px solid black;border-bottom: 1px solid black;"></q-th>

            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;" @click="handleSortingColumn('Details_month_to_date.Stock.Stock_TY_amount')">TY <q-icon v-if="active_sorting_column == 'Details_month_to_date.Stock.Stock_TY_amount'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th v-if="colspan.MonthToDate.StockShow" style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;" @click="handleSortingColumn('Details_month_to_date.Stock.Stock_LY_amount')">LY <q-icon v-if="active_sorting_column == 'Details_month_to_date.Stock.Stock_LY_amount'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;" @click="handleSortingColumn('Details_month_to_date.Stock.Stock_vsLY_percent')">vs LY <q-icon v-if="active_sorting_column == 'Details_month_to_date.Stock.Stock_vsLY_percent'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;" @click="handleSortingColumn('Details_month_to_date.Stock.Stock_TY_days')">TY <q-icon v-if="active_sorting_column == 'Details_month_to_date.Stock.Stock_TY_days'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;" @click="handleSortingColumn('Details_month_to_date.Stock.Stock_LY_days')">LY <q-icon v-if="active_sorting_column == 'Details_month_to_date.Stock.Stock_LY_days'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th> -->

            <!-- <q-th style="min-width: 10px;max-width: 10px; border-top: 0px;border-bottom:0px;background-color: white;"></q-th> -->

            
            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;" @click="handleSortingColumn('Details_year_to_date.Sales.Sales_TY_amount')">TY <q-icon v-if="active_sorting_column == 'Details_year_to_date.Sales.Sales_TY_amount'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th v-if="colspan.YearToDate.SalesShow" style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;" @click="handleSortingColumn('Details_year_to_date.Sales.Sales_LY_amount')">LY <q-icon v-if="active_sorting_column == 'Details_year_to_date.Sales.Sales_LY_amount'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;" @click="handleSortingColumn('Details_year_to_date.Sales.Sales_vsLY_percent')">vs LY <q-icon v-if="active_sorting_column == 'Details_year_to_date.Sales.Sales_vsLY_percent'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            
            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;background-color: #e0ebff; color:black;" @click="handleSortingColumn('Details_year_to_date.Profit.Profit_TY_amount')">TY <q-icon v-if="active_sorting_column == 'Details_year_to_date.Profit.Profit_TY_amount'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th v-if="colspan.YearToDate.ProfitShow" style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;background-color: #e0ebff; color:black;" @click="handleSortingColumn('Details_year_to_date.Profit.Profit_LY_amount')">LY <q-icon v-if="active_sorting_column == 'Details_year_to_date.Profit.Profit_LY_amount'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;background-color: #e0ebff; color:black;" @click="handleSortingColumn('Details_year_to_date.Profit.Profit_vsLY_percent')">vs LY <q-icon v-if="active_sorting_column == 'Details_year_to_date.Profit.Profit_vsLY_percent'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;background-color: #e0ebff; color:black;" @click="handleSortingColumn('Details_year_to_date.Profit.Profit_Margin_TY')">LY <q-icon v-if="active_sorting_column == 'Details_year_to_date.Profit.Profit_Margin_TY'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;background-color: #e0ebff; color:black;border-right: 1px solid black;" @click="handleSortingColumn('Details_year_to_date.Profit.Profit_Margin_LY')">TY <q-icon v-if="active_sorting_column == 'Details_year_to_date.Profit.Profit_Margin_LY'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <!-- <q-th style="padding: 0px;min-width: 5px;max-width: 5px;border-top:1px solid black;border-bottom: 1px solid black;"></q-th> -->

            <!-- <q-th v-if="colspan.YearToDate.ScanGPShow1" style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;" @click="handleSortingColumn('Details_year_to_date.Scan_GP.Scan_GP_TY_amount')">TY <q-icon v-if="active_sorting_column == 'Details_year_to_date.Scan_GP.Scan_GP_TY_amount'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;" @click="handleSortingColumn('Details_year_to_date.Scan_GP.Scan_GP_TY_percent')">TY <q-icon v-if="active_sorting_column == 'Details_year_to_date.Scan_GP.Scan_GP_TY_percent'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th v-if="colspan.YearToDate.ScanGPShow2" style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;" @click="handleSortingColumn('Details_year_to_date.Scan_GP.Scan_GP_LY_amount')">LY <q-icon v-if="active_sorting_column == 'Details_year_to_date.Scan_GP.Scan_GP_LY_amount'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;" @click="handleSortingColumn('Details_year_to_date.Scan_GP.Scan_GP_LY_percent')">LY <q-icon v-if="active_sorting_column == 'Details_year_to_date.Scan_GP.Scan_GP_LY_percent'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th style="padding: 0px;min-width: 5px;max-width: 5px;border-top:1px solid black;border-bottom: 1px solid black;"></q-th>

            <q-th v-if="colspan.YearToDate.ShrinkageShow1" style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;" @click="handleSortingColumn('Details_year_to_date.Shrinkage.Shrinkage_TY_amount')">TY <q-icon v-if="active_sorting_column == 'Details_year_to_date.Shrinkage.Shrinkage_TY_amount'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;" @click="handleSortingColumn('Details_year_to_date.Shrinkage.Shrinkage_TY_percent')">TY <q-icon v-if="active_sorting_column == 'Details_year_to_date.Shrinkage.Shrinkage_TY_percent'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th v-if="colspan.YearToDate.ShrinkageShow2" style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;" @click="handleSortingColumn('Details_year_to_date.Shrinkage.Shrinkage_LY_amount')">LY <q-icon v-if="active_sorting_column == 'Details_year_to_date.Shrinkage.Shrinkage_LY_amount'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;" @click="handleSortingColumn('Details_year_to_date.Shrinkage.Shrinkage_LY_percent')">LY <q-icon v-if="active_sorting_column == 'Details_year_to_date.Shrinkage.Shrinkage_LY_percent'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th style="padding: 0px;min-width: 5px;max-width: 5px;border-top:1px solid black;border-bottom: 1px solid black;"></q-th>

            <q-th v-if="colspan.YearToDate.NetGPShow1" style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;" @click="handleSortingColumn('Details_year_to_date.Net_GP.Net_GP_TY_amount')">TY <q-icon v-if="active_sorting_column == 'Details_year_to_date.Net_GP.Net_GP_TY_amount'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;" @click="handleSortingColumn('Details_year_to_date.Net_GP.Net_GP_TY_percent')">TY <q-icon v-if="active_sorting_column == 'Details_year_to_date.Net_GP.Net_GP_TY_percent'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th v-if="colspan.YearToDate.NetGPShow2" style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;" @click="handleSortingColumn('Details_year_to_date.Net_GP.Net_GP_LY_amount')">LY <q-icon v-if="active_sorting_column == 'Details_year_to_date.Net_GP.Net_GP_LY_amount'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;" @click="handleSortingColumn('Details_year_to_date.Net_GP.Net_GP_LY_percent')">LY <q-icon v-if="active_sorting_column == 'Details_year_to_date.Net_GP.Net_GP_LY_percent'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th style="padding: 0px;min-width: 5px;max-width: 5px;border-top:1px solid black;border-bottom: 1px solid black;"></q-th>

            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;" @click="handleSortingColumn('Details_year_to_date.Stock.Stock_TY_amount')">TY <q-icon v-if="active_sorting_column == 'Details_year_to_date.Stock.Stock_TY_amount'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th v-if="colspan.YearToDate.StockShow" style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;" @click="handleSortingColumn('Details_year_to_date.Stock.Stock_LY_amount')">LY <q-icon v-if="active_sorting_column == 'Details_year_to_date.Stock.Stock_LY_amount'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;" @click="handleSortingColumn('Details_year_to_date.Stock.Stock_vsLY_percent')">vs LY <q-icon v-if="active_sorting_column == 'Details_year_to_date.Stock.Stock_vsLY_percent'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;" @click="handleSortingColumn('Details_year_to_date.Stock.Stock_TY_days')">TY <q-icon v-if="active_sorting_column == 'Details_year_to_date.Stock.Stock_TY_days'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;border-right: 1px solid black;" @click="handleSortingColumn('Details_year_to_date.Stock.Stock_LY_days')">LY <q-icon v-if="active_sorting_column == 'Details_year_to_date.Stock.Stock_LY_days'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th> -->

        </q-tr>

        <q-tr :props="props">
            <q-th style="border: 0px;background-color: white;position: sticky; left: 0;z-index: 100;"></q-th>
            <q-th :style="['border: 0px;background-color:white;', json_data.Division.length > 0 && 'border-bottom: 1px solid black;']"></q-th>
            <!-- <q-th style="border:0px;background-color:white;position:sticky;left: 20px;z-index:100;"></q-th> -->
            <q-th :style="['min-width: 40px;max-width: 40px; border: 0px;background-color:white;position:sticky;left: 0px;z-index:100;', json_data.Division.length > 0 && 'border-bottom: 1px solid black;']"></q-th>
            <q-th :style="['border: 0px;background-color:white;', json_data.Division.length > 0 && 'border-bottom: 1px solid black;']"></q-th>

            <q-th :style="['border: 0px;', json_data.Division.length > 0 && 'border-bottom: 1px solid black;']"></q-th>
            <q-th :style="['border: 0px;', json_data.Division.length > 0 && 'border-bottom: 1px solid black;']"></q-th>
            <q-th :style="['border: 0px;', json_data.Division.length > 0 && 'border-bottom: 1px solid black;']"></q-th>


            
            <q-th style="border-bottom: 0px;"><span v-if="amount_type">$'000</span><span v-else>$</span></q-th>
            <q-th v-if="colspan.DayToDate.SalesShow" style="border-bottom: 0px;"><span v-if="amount_type">$'000</span><span v-else>$</span></q-th>
            <q-th style="border-bottom: 0px;">%</q-th>

            <q-th style="border-bottom: 0px;"><span v-if="amount_type">$'000</span> <span v-else>$</span></q-th>
            <q-th v-if="colspan.DayToDate.ProfitShow" style="border-bottom: 0px;"><span v-if="amount_type">$'000</span> <span v-else>$</span></q-th>
            <q-th style="border-bottom: 0px;">%</q-th>
            <q-th style="border-bottom: 0px;">%</q-th>
            <q-th style="border-bottom: 0px;">%</q-th>

            <q-th style="border-bottom: 0px;padding: 0px;"></q-th>





            <q-th style="border-bottom: 0px;"><span v-if="amount_type">$'000</span><span v-else>$</span></q-th>
            <q-th v-if="colspan.WeekToDate.SalesShow" style="border-bottom: 0px;"><span v-if="amount_type">$'000</span><span v-else>$</span></q-th>
            <q-th style="border-bottom: 0px;">%</q-th>

            <q-th style="border-bottom: 0px;"><span v-if="amount_type">$'000</span> <span v-else>$</span></q-th>
            <q-th v-if="colspan.WeekToDate.ProfitShow" style="border-bottom: 0px;"><span v-if="amount_type">$'000</span> <span v-else>$</span></q-th>
            <q-th style="border-bottom: 0px;">%</q-th>
            <q-th style="border-bottom: 0px;">%</q-th>
            <q-th style="border-bottom: 0px;">%</q-th>

            <q-th style="border-bottom: 0px;padding: 0px;"></q-th>





            <q-th style="border-bottom: 0px;"><span v-if="amount_type">$'000</span><span v-else>$</span></q-th>
            <q-th v-if="colspan.MonthToDate.SalesShow" style="border-bottom: 0px;"><span v-if="amount_type">$'000</span><span v-else>$</span></q-th>
            <q-th style="border-bottom: 0px;">%</q-th>

            <q-th style="border-bottom: 0px;"><span v-if="amount_type">$'000</span> <span v-else>$</span></q-th>
            <q-th v-if="colspan.MonthToDate.ProfitShow" style="border-bottom: 0px;"><span v-if="amount_type">$'000</span> <span v-else>$</span></q-th>
            <q-th style="border-bottom: 0px;">%</q-th>
            <q-th style="border-bottom: 0px;">%</q-th>
            <q-th style="border-bottom: 0px;">%</q-th>

            <q-th style="border-bottom: 0px;padding: 0px;"></q-th>

            <!-- <q-th v-if="colspan.MonthToDate.ScanGPShow1" style="border-bottom: 0px;"><span v-if="amount_type">$'000</span><span v-else>$</span></q-th>
            <q-th style="border-bottom: 0px;">%</q-th>
            <q-th v-if="colspan.MonthToDate.ScanGPShow2" style="border-bottom: 0px;"><span v-if="amount_type">$'000</span><span v-else>$</span></q-th>
            <q-th style="border-bottom: 0px;">%</q-th>
            <q-th style="border-bottom: 0px;padding: 0px;"></q-th>

            <q-th v-if="colspan.MonthToDate.ShrinkageShow1" style="border-bottom: 0px;"><span v-if="amount_type">$'000</span><span v-else>$</span></q-th>
            <q-th style="border-bottom: 0px;">%</q-th>
            <q-th v-if="colspan.MonthToDate.ShrinkageShow2" style="border-bottom: 0px;"><span v-if="amount_type">$'000</span><span v-else>$</span></q-th>
            <q-th style="border-bottom: 0px;">%</q-th>
            <q-th style="border-bottom: 0px;padding: 0px;"></q-th>

            <q-th v-if="colspan.MonthToDate.NetGPShow1" style="border-bottom: 0px;"><span v-if="amount_type">$'000</span><span v-else>$</span></q-th>
            <q-th style="border-bottom: 0px;">%</q-th>
            <q-th v-if="colspan.MonthToDate.NetGPShow2" style="border-bottom: 0px;"><span v-if="amount_type">$'000</span><span v-else>$</span></q-th>
            <q-th style="border-bottom: 0px;">%</q-th>
            <q-th style="border-bottom: 0px;padding: 0px;"></q-th>

            <q-th style="border-bottom: 0px;"><span v-if="amount_type">$'000</span><span v-else>$</span></q-th>
            <q-th v-if="colspan.MonthToDate.StockShow" style="border-bottom: 0px;"><span v-if="amount_type">$'000</span><span v-else>$</span></q-th>
            <q-th style="border-bottom: 0px;">%</q-th>
            <q-th style="border-bottom: 0px;">Days</q-th>
            <q-th style="border-bottom: 0px;">Days</q-th> -->

            <!-- <q-th style=" border-top: 0px;border-bottom:0px;"></q-th> -->
            

            <q-th style="border-bottom: 0px;"><span v-if="amount_type">$'000</span><span v-else>$</span></q-th>
            <q-th v-if="colspan.YearToDate.SalesShow" style="border-bottom: 0px;"><span v-if="amount_type">$'000</span><span v-else>$</span></q-th>
            <q-th style="border-bottom: 0px;">%</q-th>

            <q-th style="border-bottom: 0px;"><span v-if="amount_type">$'000</span> <span v-else>$</span></q-th>
            <q-th v-if="colspan.YearToDate.ProfitShow" style="border-bottom: 0px;"><span v-if="amount_type">$'000</span> <span v-else>$</span></q-th>
            <q-th style="border-bottom: 0px;">%</q-th>
            <q-th style="border-bottom: 0px;">%</q-th>
            <q-th style="border-bottom: 0px;border-right: 1px solid black;">%</q-th>
            
            <!-- <q-th style="border-bottom: 0px;padding: 0px;"></q-th> -->
<!-- 
            <q-th v-if="colspan.YearToDate.ScanGPShow1" style="border-bottom: 0px;"><span v-if="amount_type">$'000</span><span v-else>$</span></q-th>
            <q-th style="border-bottom: 0px;">%</q-th>
            <q-th v-if="colspan.YearToDate.ScanGPShow2" style="border-bottom: 0px;"><span v-if="amount_type">$'000</span><span v-else>$</span></q-th>
            <q-th style="border-bottom: 0px;">%</q-th>
            <q-th style="border-bottom: 0px;padding: 0px;"></q-th>

            <q-th v-if="colspan.YearToDate.ShrinkageShow1" style="border-bottom: 0px;"><span v-if="amount_type">$'000</span><span v-else>$</span></q-th>
            <q-th style="border-bottom: 0px;">%</q-th>
            <q-th v-if="colspan.YearToDate.ShrinkageShow2" style="border-bottom: 0px;"><span v-if="amount_type">$'000</span><span v-else>$</span></q-th>
            <q-th style="border-bottom: 0px;">%</q-th>
            <q-th style="border-bottom: 0px;padding: 0px;"></q-th>

            <q-th v-if="colspan.YearToDate.NetGPShow1" style="border-bottom: 0px;"><span v-if="amount_type">$'000</span><span v-else>$</span></q-th>
            <q-th style="border-bottom: 0px;">%</q-th>
            <q-th v-if="colspan.YearToDate.NetGPShow2" style="border-bottom: 0px;"><span v-if="amount_type">$'000</span><span v-else>$</span></q-th>
            <q-th style="border-bottom: 0px;">%</q-th>
            <q-th style="border-bottom: 0px;padding: 0px;"></q-th>

            <q-th style="border-bottom: 0px;"><span v-if="amount_type">$'000</span><span v-else>$</span></q-th>
            <q-th v-if="colspan.YearToDate.StockShow" style="border-bottom: 0px;"><span v-if="amount_type">$'000</span><span v-else>$</span></q-th>
            <q-th style="border-bottom: 0px;">%</q-th>
            <q-th style="border-bottom: 0px;">Days</q-th>
            <q-th style="border-right: 1px solid black;border-bottom: 0px;">Days</q-th> -->

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

            <template v-for="(division_details, index) in json_data.Division" :key="division_details">
                
                <q-tr style="cursor: pointer;" @click="handleTrClick(division_details)" :props="props">
                    <q-td style="background-color: white;position: sticky; left: 0;z-index: 100;"></q-td>
                    <q-td :style="[ index == 0 ? '' : '','border: 0px;','background-color:white;', 'border-left: 1px solid black; border-right: 1px solid black;']">{{division_details.no}}</q-td>
                    <q-td :style="[ index == 0 ? '' : '','border: 0px;','background-color:white;position:sticky;left: 0px;z-index:100;', 'min-width: 40px;max-width: 40px; text-align: left;']">{{division_details.code}}</q-td>
                    <q-td :style="[ index == 0 ? '' : '','border: 0px;','background-color:white;text-align: left;', '']">{{division_details.Title}}</q-td>



                    <q-td style="font-style: normal;text-align: left;" >{{division_details.Cohort}}</q-td>
                    <q-td style="font-style: normal;text-align: left;" >{{division_details.State}}</q-td>
                    <q-td style="font-style: normal;text-align: left;" >{{division_details.AM}}</q-td>


                    
                    

                    <q-td style="font-size: 13px; font-style: normal;" :class="[division_details.Details_same_day.Sales.Sales_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_same_day.Sales.Sales_TY_amount,'$')}}</q-td>
                    <q-td v-if="colspan.DayToDate.SalesShow" style="font-size: 13px; font-style: normal;" :class="[division_details.Details_same_day.Sales.Sales_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_same_day.Sales.Sales_LY_amount,'$')}}</q-td>
                    <q-td style="font-size: 13px; font-style: normal;" :class="[division_details.Details_same_day.Sales.Sales_vsLY_percent < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_same_day.Sales.Sales_vsLY_percent,'%')}}%</q-td>
                    
                    <q-td style="font-size: 13px; font-style: normal;" :class="[division_details.Details_same_day.Profit.Profit_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_same_day.Profit.Profit_TY_amount,'$')}}</q-td>
                    <q-td v-if="colspan.DayToDate.ProfitShow" style="font-size: 13px; font-style: normal;" :class="[division_details.Details_same_day.Profit.Profit_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_same_day.Profit.Profit_LY_amount,'$')}}</q-td>
                    <q-td style="font-size: 13px; font-style: normal;" :class="[division_details.Details_same_day.Profit.Profit_vsLY_percent < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_same_day.Profit.Profit_vsLY_percent,'%')}}%</q-td>
                    <q-td style="font-size: 13px; font-style: normal;" :class="[division_details.Details_same_day.Profit.Profit_Margin_TY < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_same_day.Profit.Profit_Margin_TY,'%')}}%</q-td>
                    <q-td style="font-size: 13px; font-style: normal;" :class="[division_details.Details_same_day.Profit.Profit_Margin_LY < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_same_day.Profit.Profit_Margin_LY,'%')}}%</q-td>
                    <q-td style="font-size: 13px; background-color: white;padding: 0px;"></q-td>





                    <q-td style="font-size: 13px; font-style: normal;" :class="[division_details.Details_week_to_date.Sales.Sales_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_week_to_date.Sales.Sales_TY_amount,'$')}}</q-td>
                    <q-td v-if="colspan.WeekToDate.SalesShow" style="font-size: 13px; font-style: normal;" :class="[division_details.Details_week_to_date.Sales.Sales_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_week_to_date.Sales.Sales_LY_amount,'$')}}</q-td>
                    <q-td style="font-size: 13px; font-style: normal;" :class="[division_details.Details_week_to_date.Sales.Sales_vsLY_percent < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_week_to_date.Sales.Sales_vsLY_percent,'%')}}%</q-td>
                    
                    <q-td style="font-size: 13px; font-style: normal;" :class="[division_details.Details_week_to_date.Profit.Profit_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_week_to_date.Profit.Profit_TY_amount,'$')}}</q-td>
                    <q-td v-if="colspan.WeekToDate.ProfitShow" style="font-size: 13px; font-style: normal;" :class="[division_details.Details_week_to_date.Profit.Profit_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_week_to_date.Profit.Profit_LY_amount,'$')}}</q-td>
                    <q-td style="font-size: 13px; font-style: normal;" :class="[division_details.Details_week_to_date.Profit.Profit_vsLY_percent < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_week_to_date.Profit.Profit_vsLY_percent,'%')}}%</q-td>
                    <q-td style="font-size: 13px; font-style: normal;" :class="[division_details.Details_week_to_date.Profit.Profit_Margin_TY < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_week_to_date.Profit.Profit_Margin_TY,'%')}}%</q-td>
                    <q-td style="font-size: 13px; font-style: normal;" :class="[division_details.Details_week_to_date.Profit.Profit_Margin_LY < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_week_to_date.Profit.Profit_Margin_LY,'%')}}%</q-td>
                    <q-td style="font-size: 13px; background-color: white;padding: 0px;"></q-td>





                    <q-td style="font-size: 13px; font-style: normal;" :class="[division_details.Details_month_to_date.Sales.Sales_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_month_to_date.Sales.Sales_TY_amount,'$')}}</q-td>
                    <q-td v-if="colspan.MonthToDate.SalesShow" style="font-size: 13px; font-style: normal;" :class="[division_details.Details_month_to_date.Sales.Sales_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_month_to_date.Sales.Sales_LY_amount,'$')}}</q-td>
                    <q-td style="font-size: 13px; font-style: normal;" :class="[division_details.Details_month_to_date.Sales.Sales_vsLY_percent < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_month_to_date.Sales.Sales_vsLY_percent,'%')}}%</q-td>
                    
                    <q-td style="font-size: 13px; font-style: normal;" :class="[division_details.Details_month_to_date.Profit.Profit_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_month_to_date.Profit.Profit_TY_amount,'$')}}</q-td>
                    <q-td v-if="colspan.MonthToDate.ProfitShow" style="font-size: 13px; font-style: normal;" :class="[division_details.Details_month_to_date.Profit.Profit_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_month_to_date.Profit.Profit_LY_amount,'$')}}</q-td>
                    <q-td style="font-size: 13px; font-style: normal;" :class="[division_details.Details_month_to_date.Profit.Profit_vsLY_percent < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_month_to_date.Profit.Profit_vsLY_percent,'%')}}%</q-td>
                    <q-td style="font-size: 13px; font-style: normal;" :class="[division_details.Details_month_to_date.Profit.Profit_Margin_TY < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_month_to_date.Profit.Profit_Margin_TY,'%')}}%</q-td>
                    <q-td style="font-size: 13px; font-style: normal;" :class="[division_details.Details_month_to_date.Profit.Profit_Margin_LY < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_month_to_date.Profit.Profit_Margin_LY,'%')}}%</q-td>
                    <q-td style="font-size: 13px; background-color: white;padding: 0px;"></q-td>

                    <!-- <q-td v-if="colspan.MonthToDate.ScanGPShow1" style="font-size: 13px; font-style: normal;" :class="[division_details.Details_month_to_date.Scan_GP.Scan_GP_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_month_to_date.Scan_GP.Scan_GP_TY_amount,'$')}}</q-td>
                    <q-td style="font-size: 13px; font-style: normal;" :class="[division_details.Details_month_to_date.Scan_GP.Scan_GP_TY_percent < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_month_to_date.Scan_GP.Scan_GP_TY_percent,'%')}}%</q-td>
                    <q-td v-if="colspan.MonthToDate.ScanGPShow2" style="font-size: 13px; font-style: normal;" :class="[division_details.Details_month_to_date.Scan_GP.Scan_GP_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_month_to_date.Scan_GP.Scan_GP_LY_amount,'$')}}</q-td>
                    <q-td style="font-size: 13px; font-style: normal;" :class="[division_details.Details_month_to_date.Scan_GP.Scan_GP_LY_percent < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_month_to_date.Scan_GP.Scan_GP_LY_percent,'%')}}%</q-td>
                    <q-td style="font-size: 13px; background-color: white;padding: 0px;"></q-td>

                    <q-td v-if="colspan.MonthToDate.ShrinkageShow1" style="font-size: 13px; font-style: normal;" :class="[division_details.Details_month_to_date.Shrinkage.Shrinkage_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_month_to_date.Shrinkage.Shrinkage_TY_amount,'$')}}</q-td>
                    <q-td style="font-size: 13px; font-style: normal;" :class="[division_details.Details_month_to_date.Shrinkage.Shrinkage_TY_percent < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_month_to_date.Shrinkage.Shrinkage_TY_percent,'%')}}%</q-td>
                    <q-td v-if="colspan.MonthToDate.ShrinkageShow2" style="font-size: 13px; font-style: normal;" :class="[division_details.Details_month_to_date.Shrinkage.Shrinkage_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_month_to_date.Shrinkage.Shrinkage_LY_amount,'$')}}</q-td>
                    <q-td style="font-size: 13px; font-style: normal;" :class="[division_details.Details_month_to_date.Shrinkage.Shrinkage_LY_percent < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_month_to_date.Shrinkage.Shrinkage_LY_percent,'%')}}%</q-td>
                    <q-td style="font-size: 13px; background-color: white;padding: 0px;"></q-td>
 
                    <q-td v-if="colspan.MonthToDate.NetGPShow1" style="font-size: 13px; font-style: normal;" :class="[division_details.Details_month_to_date.Net_GP.Net_GP_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_month_to_date.Net_GP.Net_GP_TY_amount,'$')}}</q-td>
                    <q-td style="font-size: 13px; font-style: normal;" :class="[division_details.Details_month_to_date.Net_GP.Net_GP_TY_percent < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_month_to_date.Net_GP.Net_GP_TY_percent,'%')}}%</q-td>
                    <q-td v-if="colspan.MonthToDate.NetGPShow2" style="font-size: 13px; font-style: normal;" :class="[division_details.Details_month_to_date.Net_GP.Net_GP_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_month_to_date.Net_GP.Net_GP_LY_amount,'$')}}</q-td>
                    <q-td style="font-size: 13px; font-style: normal;" :class="[division_details.Details_month_to_date.Net_GP.Net_GP_LY_percent < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_month_to_date.Net_GP.Net_GP_LY_percent,'%')}}%</q-td>
                    <q-td style="font-size: 13px; background-color: white;padding: 0px;"></q-td>


                    <q-td style="font-size: 13px; font-style: normal;" :class="[division_details.Details_month_to_date.Stock.Stock_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_month_to_date.Stock.Stock_TY_amount,'$')}}</q-td>
                    <q-td v-if="colspan.MonthToDate.StockShow" style="font-size: 13px; font-style: normal;" :class="[division_details.Details_month_to_date.Stock.Stock_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_month_to_date.Stock.Stock_LY_amount,'$')}}</q-td>
                    <q-td style="font-size: 13px; font-style: normal;" :class="[division_details.Details_month_to_date.Stock.Stock_vsLY_percent < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_month_to_date.Stock.Stock_vsLY_percent,'%')}}%</q-td>
                    <q-td style="font-size: 13px; font-style: normal;" :class="[division_details.Details_month_to_date.Stock.Stock_TY_days < 0 ? 'negative_value' : '']">{{division_details.Details_month_to_date.Stock.Stock_TY_days}}</q-td>
                    <q-td style="font-size: 13px; font-style: normal;" :class="[division_details.Details_month_to_date.Stock.Stock_LY_days < 0 ? 'negative_value' : '']">{{division_details.Details_month_to_date.Stock.Stock_LY_days}}</q-td>

                    <q-td style="border-top: 0px;border-bottom:0px;"></q-td> -->
                    

                    <q-td style="font-size: 13px; font-style: normal;" :class="[division_details.Details_year_to_date.Sales.Sales_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_year_to_date.Sales.Sales_TY_amount,'$')}}</q-td>
                    <q-td v-if="colspan.YearToDate.SalesShow" style="font-size: 13px; font-style: normal;" :class="[division_details.Details_year_to_date.Sales.Sales_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_year_to_date.Sales.Sales_LY_amount,'$')}}</q-td>
                    <q-td style="font-size: 13px; font-style: normal;" :class="[division_details.Details_year_to_date.Sales.Sales_vsLY_percent < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_year_to_date.Sales.Sales_vsLY_percent,'%')}}%</q-td>

                    <q-td style="font-size: 13px; font-style: normal;" :class="[division_details.Details_year_to_date.Profit.Profit_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_year_to_date.Profit.Profit_TY_amount,'$')}}</q-td>
                    <q-td v-if="colspan.YearToDate.ProfitShow" style="font-size: 13px; font-style: normal;" :class="[division_details.Details_year_to_date.Profit.Profit_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_year_to_date.Profit.Profit_LY_amount,'$')}}</q-td>
                    <q-td style="font-size: 13px; font-style: normal;" :class="[division_details.Details_year_to_date.Profit.Profit_vsLY_percent < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_year_to_date.Profit.Profit_vsLY_percent,'%')}}%</q-td>
                    <q-td style="font-size: 13px; font-style: normal;" :class="[division_details.Details_year_to_date.Profit.Profit_Margin_TY < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_year_to_date.Profit.Profit_Margin_TY,'%')}}%</q-td>
                    <q-td style="font-size: 13px; font-style: normal;border-right: 1px solid black;" :class="[division_details.Details_year_to_date.Profit.Profit_Margin_LY < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_year_to_date.Profit.Profit_Margin_LY,'%')}}%</q-td>

                    
                    <!-- <q-td style="font-size: 13px; background-color: white;padding: 0px;"></q-td> -->

                    <!-- <q-td v-if="colspan.YearToDate.ScanGPShow1" style="font-size: 13px; font-style: normal;" :class="[division_details.Details_year_to_date.Scan_GP.Scan_GP_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_year_to_date.Scan_GP.Scan_GP_TY_amount,'$')}}</q-td>
                    <q-td style="font-size: 13px; font-style: normal;" :class="[division_details.Details_year_to_date.Scan_GP.Scan_GP_TY_percent < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_year_to_date.Scan_GP.Scan_GP_TY_percent,'%')}}%</q-td>
                    <q-td v-if="colspan.YearToDate.ScanGPShow2" style="font-size: 13px; font-style: normal;" :class="[division_details.Details_year_to_date.Scan_GP.Scan_GP_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_year_to_date.Scan_GP.Scan_GP_LY_amount,'$')}}</q-td>
                    <q-td style="font-size: 13px; font-style: normal;" :class="[division_details.Details_year_to_date.Scan_GP.Scan_GP_LY_percent < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_year_to_date.Scan_GP.Scan_GP_LY_percent,'%')}}%</q-td>
                    <q-td style="font-size: 13px; background-color: white;padding: 0px;"></q-td>

                    <q-td v-if="colspan.YearToDate.ShrinkageShow1" style="font-size: 13px; font-style: normal;" :class="[division_details.Details_year_to_date.Shrinkage.Shrinkage_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_year_to_date.Shrinkage.Shrinkage_TY_amount,'$')}}</q-td>
                    <q-td style="font-size: 13px; font-style: normal;" :class="[division_details.Details_year_to_date.Shrinkage.Shrinkage_TY_percent < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_year_to_date.Shrinkage.Shrinkage_TY_percent,'%')}}%</q-td>
                    <q-td v-if="colspan.YearToDate.ShrinkageShow2" style="font-size: 13px; font-style: normal;" :class="[division_details.Details_year_to_date.Shrinkage.Shrinkage_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_year_to_date.Shrinkage.Shrinkage_LY_amount,'$')}}</q-td>
                    <q-td style="font-size: 13px; font-style: normal;" :class="[division_details.Details_year_to_date.Shrinkage.Shrinkage_LY_percent < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_year_to_date.Shrinkage.Shrinkage_LY_percent,'%')}}%</q-td>
                    <q-td style="font-size: 13px; background-color: white;padding: 0px;"></q-td>
 
                    <q-td v-if="colspan.YearToDate.NetGPShow1" style="font-size: 13px; font-style: normal;" :class="[division_details.Details_year_to_date.Net_GP.Net_GP_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_year_to_date.Net_GP.Net_GP_TY_amount,'$')}}</q-td>
                    <q-td style="font-size: 13px; font-style: normal;" :class="[division_details.Details_year_to_date.Net_GP.Net_GP_TY_percent < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_year_to_date.Net_GP.Net_GP_TY_percent,'%')}}%</q-td>
                    <q-td v-if="colspan.YearToDate.NetGPShow2" style="font-size: 13px; font-style: normal;" :class="[division_details.Details_year_to_date.Net_GP.Net_GP_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_year_to_date.Net_GP.Net_GP_LY_amount,'$')}}</q-td>
                    <q-td style="font-size: 13px; font-style: normal;" :class="[division_details.Details_year_to_date.Net_GP.Net_GP_LY_percent < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_year_to_date.Net_GP.Net_GP_LY_percent,'%')}}%</q-td>
                    <q-td style="font-size: 13px; background-color: white;padding: 0px;"></q-td>

                    <q-td style="font-size: 13px; font-style: normal;" :class="[division_details.Details_year_to_date.Stock.Stock_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_year_to_date.Stock.Stock_TY_amount,'$')}}</q-td>
                    <q-td v-if="colspan.YearToDate.StockShow" style="font-size: 13px; font-style: normal;" :class="[division_details.Details_year_to_date.Stock.Stock_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_year_to_date.Stock.Stock_LY_amount,'$')}}</q-td>
                    <q-td style="font-size: 13px; font-style: normal;" :class="[division_details.Details_year_to_date.Stock.Stock_vsLY_percent < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_year_to_date.Stock.Stock_vsLY_percent,'%')}}%</q-td>
                    <q-td style="font-size: 13px; font-style: normal;" :class="[division_details.Details_year_to_date.Stock.Stock_TY_days < 0 ? 'negative_value' : '']">{{division_details.Details_year_to_date.Stock.Stock_TY_days}}</q-td>
                    <q-td style="font-size: 13px; font-style: normal;border-right: 1px solid black;" :class="[division_details.Details_year_to_date.Stock.Stock_LY_days < 0 ? 'negative_value' : '']">{{division_details.Details_year_to_date.Stock.Stock_LY_days}}</q-td> -->

                </q-tr>
                
            </template>

            <template v-if="json_data.Division_Total">
                <q-tr v-if="json_data.Division_Total.Details_month_to_date" :props="props" style="font-weight: bold;">

                    <q-td style="background-color: white !important;position: sticky; left: 0;z-index: 100;"></q-td>
                    <q-td style="font-weight: bold;text-align: left;font-size: 13px;border: 0px;background-color:white !important;border-left: 1px solid black;border-right: 1px solid black;border-top: bottom solid black; border-bottom: 1px solid black; border-top: 1px solid black;"></q-td>
                    <q-td style="min-width: 40px;max-width: 40px; font-weight: bold;text-align: left;font-size: 13px;border: 0px;background-color:white !important;position:sticky;left: 0px;z-index:100;border-right: 1px solid black;border-top: bottom solid black;border-top: 1px solid black; border-bottom: 1px solid black; border-top: 1px solid black;"></q-td>
                    <q-td style="font-weight: bold;text-align: left;font-size: 13px;border: 0px;background-color:white !important;border-top: bottom solid black; border-top: 1px solid black; border-bottom: 1px solid black; border-top: 1px solid black;">TOTAL</q-td>

                    <q-td style="border: 0px; background-color:white !important; border-top: 1px solid black; border-bottom: 1px solid black; border-top: 1px solid black;"></q-td>
                    <q-td style="border: 0px; background-color:white !important; border-top: 1px solid black; border-bottom: 1px solid black; border-top: 1px solid black;"></q-td>
                    <q-td style="border: 0px; background-color:white !important; border-top: 1px solid black; border-bottom: 1px solid black; border-top: 1px solid black;"></q-td>



                    <template v-if="json_data.Division_Total.Details_same_day.Sales">
                        <q-td style="font-size: 13px; background-color:white !important; font-style: normal;border-top: bottom solid black; border-bottom: 1px solid black; border-top: 1px solid black;" :class="[json_data.Division_Total.Details_same_day.Sales.Sales_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_same_day.Sales.Sales_TY_amount,'$')}}</q-td>
                        <q-td v-if="colspan.DayToDate.SalesShow" style="font-size: 13px; background-color:white !important; font-style: normal;border-top: bottom solid black; border-bottom: 1px solid black; border-top: 1px solid black;" :class="[json_data.Division_Total.Details_same_day.Sales.Sales_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_same_day.Sales.Sales_LY_amount,'$')}}</q-td>
                        <q-td style="font-size: 13px; background-color:white !important; font-style: normal;border-top: bottom solid black; border-bottom: 1px solid black; border-top: 1px solid black;" :class="[json_data.Division_Total.Details_same_day.Sales.Sales_vsLY_percent < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_same_day.Sales.Sales_vsLY_percent,'%')}}%</q-td>
                    </template>

                    <template v-if="json_data.Division_Total.Details_same_day.Profit">
                        <q-td style="font-size: 13px; background-color:white !important; font-style: normal;border-top: bottom solid black; border-bottom: 1px solid black; border-top: 1px solid black;" :class="[json_data.Division_Total.Details_same_day.Profit.Profit_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_same_day.Profit.Profit_TY_amount,'$')}}</q-td>
                        <q-td v-if="colspan.DayToDate.ProfitShow" style="font-size: 13px; background-color:white !important; font-style: normal;border-top: bottom solid black; border-bottom: 1px solid black; border-top: 1px solid black;" :class="[json_data.Division_Total.Details_same_day.Profit.Profit_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_same_day.Profit.Profit_LY_amount,'$')}}</q-td>
                        <q-td style="font-size: 13px; background-color:white !important; font-style: normal;border-top: bottom solid black; border-bottom: 1px solid black; border-top: 1px solid black;" :class="[json_data.Division_Total.Details_same_day.Profit.Profit_vsLY_percent < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_same_day.Profit.Profit_vsLY_percent,'%')}}%</q-td>
                        <q-td style="font-size: 13px; background-color:white !important; font-style: normal;border-top: bottom solid black; border-bottom: 1px solid black; border-top: 1px solid black;" :class="[json_data.Division_Total.Details_same_day.Profit.Profit_Margin_TY < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_same_day.Profit.Profit_Margin_TY,'%')}}%</q-td>
                        <q-td style="font-size: 13px; background-color:white !important; font-style: normal;border-top: bottom solid black; border-bottom: 1px solid black; border-top: 1px solid black;" :class="[json_data.Division_Total.Details_same_day.Profit.Profit_Margin_LY < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_same_day.Profit.Profit_Margin_LY,'%')}}%</q-td>
                        <q-td style="font-size: 13px; background-color:white !important; background-color: white !important;padding: 0px; border-bottom: 1px solid black; border-top: 1px solid black;"></q-td>
                    </template>



                    
                    
                    <template v-if="json_data.Division_Total.Details_week_to_date.Sales">
                        <q-td style="font-size: 13px; background-color:white !important; font-style: normal;border-top: bottom solid black; border-bottom: 1px solid black; border-top: 1px solid black;" :class="[json_data.Division_Total.Details_week_to_date.Sales.Sales_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_week_to_date.Sales.Sales_TY_amount,'$')}}</q-td>
                        <q-td v-if="colspan.WeekToDate.SalesShow" style="font-size: 13px; background-color:white !important; font-style: normal;border-top: bottom solid black; border-bottom: 1px solid black; border-top: 1px solid black;" :class="[json_data.Division_Total.Details_week_to_date.Sales.Sales_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_week_to_date.Sales.Sales_LY_amount,'$')}}</q-td>
                        <q-td style="font-size: 13px; background-color:white !important; font-style: normal;border-top: bottom solid black; border-bottom: 1px solid black; border-top: 1px solid black;" :class="[json_data.Division_Total.Details_week_to_date.Sales.Sales_vsLY_percent < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_week_to_date.Sales.Sales_vsLY_percent,'%')}}%</q-td>
                    </template>

                    <template v-if="json_data.Division_Total.Details_week_to_date.Profit">
                        <q-td style="font-size: 13px; background-color:white !important; font-style: normal;border-top: bottom solid black; border-bottom: 1px solid black; border-top: 1px solid black;" :class="[json_data.Division_Total.Details_week_to_date.Profit.Profit_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_week_to_date.Profit.Profit_TY_amount,'$')}}</q-td>
                        <q-td v-if="colspan.WeekToDate.ProfitShow" style="font-size: 13px; background-color:white !important; font-style: normal;border-top: bottom solid black; border-bottom: 1px solid black; border-top: 1px solid black;" :class="[json_data.Division_Total.Details_week_to_date.Profit.Profit_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_week_to_date.Profit.Profit_LY_amount,'$')}}</q-td>
                        <q-td style="font-size: 13px; background-color:white !important; font-style: normal;border-top: bottom solid black; border-bottom: 1px solid black; border-top: 1px solid black;" :class="[json_data.Division_Total.Details_week_to_date.Profit.Profit_vsLY_percent < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_week_to_date.Profit.Profit_vsLY_percent,'%')}}%</q-td>
                        <q-td style="font-size: 13px; background-color:white !important; font-style: normal;border-top: bottom solid black; border-bottom: 1px solid black; border-top: 1px solid black;" :class="[json_data.Division_Total.Details_week_to_date.Profit.Profit_Margin_TY < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_week_to_date.Profit.Profit_Margin_TY,'%')}}%</q-td>
                        <q-td style="font-size: 13px; background-color:white !important; font-style: normal;border-top: bottom solid black; border-bottom: 1px solid black; border-top: 1px solid black;" :class="[json_data.Division_Total.Details_week_to_date.Profit.Profit_Margin_LY < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_week_to_date.Profit.Profit_Margin_LY,'%')}}%</q-td>
                        <q-td style="font-size: 13px; background-color:white !important; background-color: white !important;padding: 0px; border-bottom: 1px solid black; border-top: 1px solid black;"></q-td>
                    </template>






                    <template v-if="json_data.Division_Total.Details_month_to_date.Sales">
                        <q-td style="font-size: 13px; background-color:white !important; font-style: normal;border-top: bottom solid black; border-bottom: 1px solid black; border-top: 1px solid black;" :class="[json_data.Division_Total.Details_month_to_date.Sales.Sales_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_month_to_date.Sales.Sales_TY_amount,'$')}}</q-td>
                        <q-td v-if="colspan.MonthToDate.SalesShow" style="font-size: 13px; background-color:white !important; font-style: normal;border-top: bottom solid black; border-bottom: 1px solid black; border-top: 1px solid black;" :class="[json_data.Division_Total.Details_month_to_date.Sales.Sales_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_month_to_date.Sales.Sales_LY_amount,'$')}}</q-td>
                        <q-td style="font-size: 13px; background-color:white !important; font-style: normal;border-top: bottom solid black; border-bottom: 1px solid black; border-top: 1px solid black;" :class="[json_data.Division_Total.Details_month_to_date.Sales.Sales_vsLY_percent < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_month_to_date.Sales.Sales_vsLY_percent,'%')}}%</q-td>
                    </template>

                    <template v-if="json_data.Division_Total.Details_month_to_date.Profit">
                        <q-td style="font-size: 13px; background-color:white !important; font-style: normal;border-top: bottom solid black; border-bottom: 1px solid black; border-top: 1px solid black;" :class="[json_data.Division_Total.Details_month_to_date.Profit.Profit_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_month_to_date.Profit.Profit_TY_amount,'$')}}</q-td>
                        <q-td v-if="colspan.MonthToDate.ProfitShow" style="font-size: 13px; background-color:white !important; font-style: normal;border-top: bottom solid black; border-bottom: 1px solid black; border-top: 1px solid black;" :class="[json_data.Division_Total.Details_month_to_date.Profit.Profit_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_month_to_date.Profit.Profit_LY_amount,'$')}}</q-td>
                        <q-td style="font-size: 13px; background-color:white !important; font-style: normal;border-top: bottom solid black; border-bottom: 1px solid black; border-top: 1px solid black;" :class="[json_data.Division_Total.Details_month_to_date.Profit.Profit_vsLY_percent < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_month_to_date.Profit.Profit_vsLY_percent,'%')}}%</q-td>
                        <q-td style="font-size: 13px; background-color:white !important; font-style: normal;border-top: bottom solid black; border-bottom: 1px solid black; border-top: 1px solid black;" :class="[json_data.Division_Total.Details_month_to_date.Profit.Profit_Margin_TY < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_month_to_date.Profit.Profit_Margin_TY,'%')}}%</q-td>
                        <q-td style="font-size: 13px; background-color:white !important; font-style: normal;border-top: bottom solid black; border-bottom: 1px solid black; border-top: 1px solid black;" :class="[json_data.Division_Total.Details_month_to_date.Profit.Profit_Margin_LY < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_month_to_date.Profit.Profit_Margin_LY,'%')}}%</q-td>
                        <q-td style="font-size: 13px; background-color:white !important; background-color: white !important;padding: 0px; border-bottom: 1px solid black; border-top: 1px solid black;"></q-td>
                    </template>

                    <!-- <template v-if="json_data.Division_Total.Details_month_to_date.Scan_GP">
                        <q-td v-if="colspan.MonthToDate.ScanGPShow1" style="font-size: 13px; background-color:white !important; font-style: normal;border-top: bottom solid black; border-bottom: 1px solid black; border-top: 1px solid black;" :class="[json_data.Division_Total.Details_month_to_date.Scan_GP.Scan_GP_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_month_to_date.Scan_GP.Scan_GP_TY_amount,'$')}}</q-td>
                        <q-td style="font-size: 13px; background-color:white !important; font-style: normal;border-top: bottom solid black; border-bottom: 1px solid black; border-top: 1px solid black;" :class="[json_data.Division_Total.Details_month_to_date.Scan_GP.Scan_GP_TY_percent < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_month_to_date.Scan_GP.Scan_GP_TY_percent,'%')}}%</q-td>
                        <q-td v-if="colspan.MonthToDate.ScanGPShow2" style="font-size: 13px; background-color:white !important; font-style: normal;border-top: bottom solid black; border-bottom: 1px solid black; border-top: 1px solid black;" :class="[json_data.Division_Total.Details_month_to_date.Scan_GP.Scan_GP_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_month_to_date.Scan_GP.Scan_GP_LY_amount,'$')}}</q-td>
                        <q-td style="font-size: 13px; background-color:white !important; font-style: normal;border-top: bottom solid black; border-bottom: 1px solid black; border-top: 1px solid black;" :class="[json_data.Division_Total.Details_month_to_date.Scan_GP.Scan_GP_LY_percent < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_month_to_date.Scan_GP.Scan_GP_LY_percent,'%')}}%</q-td>
                        <q-td style="font-size: 13px; background-color:white !important; background-color: white !important;padding: 0px; border-bottom: 1px solid black; border-top: 1px solid black;"></q-td>
                    </template>

                    <template v-if="json_data.Division_Total.Details_month_to_date.Shrinkage">
                        <q-td v-if="colspan.MonthToDate.ShrinkageShow1" style="font-size: 13px; background-color:white !important; font-style: normal;border-top: bottom solid black; border-bottom: 1px solid black; border-top: 1px solid black;" :class="[json_data.Division_Total.Details_month_to_date.Shrinkage.Shrinkage_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_month_to_date.Shrinkage.Shrinkage_TY_amount,'$')}}</q-td>
                        <q-td style="font-size: 13px; background-color:white !important; font-style: normal;border-top: bottom solid black; border-bottom: 1px solid black; border-top: 1px solid black;" :class="[json_data.Division_Total.Details_month_to_date.Shrinkage.Shrinkage_TY_percent < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_month_to_date.Shrinkage.Shrinkage_TY_percent,'%')}}%</q-td>
                        <q-td v-if="colspan.MonthToDate.ShrinkageShow2" style="font-size: 13px; background-color:white !important; font-style: normal;border-top: bottom solid black; border-bottom: 1px solid black; border-top: 1px solid black;" :class="[json_data.Division_Total.Details_month_to_date.Shrinkage.Shrinkage_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_month_to_date.Shrinkage.Shrinkage_LY_amount,'$')}}</q-td>
                        <q-td style="font-size: 13px; background-color:white !important; font-style: normal;border-top: bottom solid black; border-bottom: 1px solid black; border-top: 1px solid black;" :class="[json_data.Division_Total.Details_month_to_date.Shrinkage.Shrinkage_LY_percent < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_month_to_date.Shrinkage.Shrinkage_LY_percent,'%')}}%</q-td>
                        <q-td style="font-size: 13px; background-color:white !important; background-color: white !important;padding: 0px; border-bottom: 1px solid black; border-top: 1px solid black;"></q-td>
                    </template>

                    <template v-if="json_data.Division_Total.Details_month_to_date.Net_GP">
                        <q-td v-if="colspan.MonthToDate.NetGPShow1" style="font-size: 13px; background-color:white !important; font-style: normal;border-top: bottom solid black; border-bottom: 1px solid black; border-top: 1px solid black;" :class="[json_data.Division_Total.Details_month_to_date.Net_GP.Net_GP_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_month_to_date.Net_GP.Net_GP_TY_amount,'$')}}</q-td>
                        <q-td style="font-size: 13px; background-color:white !important; font-style: normal;border-top: bottom solid black; border-bottom: 1px solid black; border-top: 1px solid black;" :class="[json_data.Division_Total.Details_month_to_date.Net_GP.Net_GP_TY_percent < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_month_to_date.Net_GP.Net_GP_TY_percent,'%')}}%</q-td>
                        <q-td v-if="colspan.MonthToDate.NetGPShow2" style="font-size: 13px; background-color:white !important; font-style: normal;border-top: bottom solid black; border-bottom: 1px solid black; border-top: 1px solid black;" :class="[json_data.Division_Total.Details_month_to_date.Net_GP.Net_GP_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_month_to_date.Net_GP.Net_GP_LY_amount,'$')}}</q-td>
                        <q-td style="font-size: 13px; background-color:white !important; font-style: normal;border-top: bottom solid black; border-bottom: 1px solid black; border-top: 1px solid black;" :class="[json_data.Division_Total.Details_month_to_date.Net_GP.Net_GP_LY_percent < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_month_to_date.Net_GP.Net_GP_LY_percent,'%')}}%</q-td>
                        <q-td style="font-size: 13px; background-color:white !important; background-color: white !important;padding: 0px; border-bottom: 1px solid black; border-top: 1px solid black;"></q-td>
                    </template>

                    <template v-if="json_data.Division_Total.Details_month_to_date.Stock">
                        <q-td style="font-size: 13px; background-color:white !important; font-style: normal;border-top: bottom solid black; border-bottom: 1px solid black; border-top: 1px solid black;" :class="[json_data.Division_Total.Details_month_to_date.Stock.Stock_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_month_to_date.Stock.Stock_TY_amount,'$')}}</q-td>
                        <q-td v-if="colspan.MonthToDate.StockShow" style="font-size: 13px; background-color:white !important; font-style: normal;border-top: bottom solid black; border-bottom: 1px solid black; border-top: 1px solid black;" :class="[json_data.Division_Total.Details_month_to_date.Stock.Stock_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_month_to_date.Stock.Stock_LY_amount,'$')}}</q-td>
                        <q-td style="font-size: 13px; background-color:white !important; font-style: normal;border-top: bottom solid black; border-bottom: 1px solid black; border-top: 1px solid black;" :class="[json_data.Division_Total.Details_month_to_date.Stock.Stock_vsLY_percent < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_month_to_date.Stock.Stock_vsLY_percent,'%')}}%</q-td>
                        <q-td style="font-size: 13px; background-color:white !important; font-style: normal;border-top: bottom solid black; border-bottom: 1px solid black; border-top: 1px solid black;" :class="[json_data.Division_Total.Details_month_to_date.Stock.Stock_TY_days < 0 ? 'negative_value' : '']">{{json_data.Division_Total.Details_month_to_date.Stock.Stock_TY_days}}</q-td>
                        <q-td style="font-size: 13px; background-color:white !important; font-style: normal;border-top: bottom solid black; border-bottom: 1px solid black; border-top: 1px solid black;" :class="[json_data.Division_Total.Details_month_to_date.Stock.Stock_LY_days < 0 ? 'negative_value' : '']">{{json_data.Division_Total.Details_month_to_date.Stock.Stock_LY_days}}</q-td>
                    </template>

                    <q-td style="background-color:white !important; border-top: 0px;border-bottom:0px; border-bottom: 1px solid black; border-top: 1px solid black;"></q-td> -->
                    

                    <template v-if="json_data.Division_Total.Details_year_to_date.Sales">
                        <q-td style="font-size: 13px; background-color:white !important; font-style: normal;border-top: bottom solid black; border-bottom: 1px solid black; border-top: 1px solid black;" :class="[json_data.Division_Total.Details_year_to_date.Sales.Sales_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_year_to_date.Sales.Sales_TY_amount,'$')}}</q-td>
                        <q-td v-if="colspan.YearToDate.SalesShow" style="font-size: 13px; background-color:white !important; font-style: normal;border-top: bottom solid black; border-bottom: 1px solid black; border-top: 1px solid black;" :class="[json_data.Division_Total.Details_year_to_date.Sales.Sales_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_year_to_date.Sales.Sales_LY_amount,'$')}}</q-td>
                        <q-td style="font-size: 13px; background-color:white !important; font-style: normal;border-top: bottom solid black; border-bottom: 1px solid black; border-top: 1px solid black;" :class="[json_data.Division_Total.Details_year_to_date.Sales.Sales_vsLY_percent < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_year_to_date.Sales.Sales_vsLY_percent,'%')}}%</q-td>
                    </template>

                    <template v-if="json_data.Division_Total.Details_year_to_date.Profit">
                        <q-td style="font-size: 13px; background-color:white !important; font-style: normal;border-top: bottom solid black; border-bottom: 1px solid black; border-top: 1px solid black;" :class="[json_data.Division_Total.Details_year_to_date.Profit.Profit_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_year_to_date.Profit.Profit_TY_amount,'$')}}</q-td>
                        <q-td v-if="colspan.YearToDate.ProfitShow" style="font-size: 13px; background-color:white !important; font-style: normal;border-top: bottom solid black; border-bottom: 1px solid black; border-top: 1px solid black;" :class="[json_data.Division_Total.Details_year_to_date.Profit.Profit_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_year_to_date.Profit.Profit_LY_amount,'$')}}</q-td>
                        <q-td style="font-size: 13px; background-color:white !important; font-style: normal;border-top: bottom solid black; border-bottom: 1px solid black; border-top: 1px solid black;" :class="[json_data.Division_Total.Details_year_to_date.Profit.Profit_vsLY_percent < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_year_to_date.Profit.Profit_vsLY_percent,'%')}}%</q-td>
                        <q-td style="font-size: 13px; background-color:white !important; font-style: normal;border-top: bottom solid black; border-bottom: 1px solid black; border-top: 1px solid black;" :class="[json_data.Division_Total.Details_year_to_date.Profit.Profit_Margin_TY < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_year_to_date.Profit.Profit_Margin_TY,'%')}}%</q-td>
                        <q-td style="font-size: 13px; background-color:white !important; font-style: normal;border-top: bottom solid black; border-bottom: 1px solid black; border-top: 1px solid black;border-right: 1px solid black;" :class="[json_data.Division_Total.Details_year_to_date.Profit.Profit_Margin_LY < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_year_to_date.Profit.Profit_Margin_LY,'%')}}%</q-td>
                        <!-- <q-td style="font-size: 13px; background-color:white !important; background-color: white !important;padding: 0px; border-bottom: 1px solid black; border-top: 1px solid black;"></q-td> -->
                    </template>
                    
                    <!-- <template v-if="json_data.Division_Total.Details_year_to_date.Scan_GP">
                        <q-td v-if="colspan.YearToDate.ScanGPShow1" style="font-size: 13px; background-color:white !important; font-style: normal;border-top: bottom solid black; border-bottom: 1px solid black; border-top: 1px solid black;" :class="[json_data.Division_Total.Details_year_to_date.Scan_GP.Scan_GP_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_year_to_date.Scan_GP.Scan_GP_TY_amount,'$')}}</q-td>
                        <q-td style="font-size: 13px; background-color:white !important; font-style: normal;border-top: bottom solid black; border-bottom: 1px solid black; border-top: 1px solid black;" :class="[json_data.Division_Total.Details_year_to_date.Scan_GP.Scan_GP_TY_percent < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_year_to_date.Scan_GP.Scan_GP_TY_percent,'%')}}%</q-td>
                        <q-td v-if="colspan.YearToDate.ScanGPShow2" style="font-size: 13px; background-color:white !important; font-style: normal;border-top: bottom solid black; border-bottom: 1px solid black; border-top: 1px solid black;" :class="[json_data.Division_Total.Details_year_to_date.Scan_GP.Scan_GP_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_year_to_date.Scan_GP.Scan_GP_LY_amount,'$')}}</q-td>
                        <q-td style="font-size: 13px; background-color:white !important; font-style: normal;border-top: bottom solid black; border-bottom: 1px solid black; border-top: 1px solid black;" :class="[json_data.Division_Total.Details_year_to_date.Scan_GP.Scan_GP_LY_percent < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_year_to_date.Scan_GP.Scan_GP_LY_percent,'%')}}%</q-td>
                        <q-td style="font-size: 13px; background-color:white !important; background-color: white !important;padding: 0px; border-bottom: 1px solid black; border-top: 1px solid black;"></q-td>
                    </template>

                    <template v-if="json_data.Division_Total.Details_year_to_date.Shrinkage">
                        <q-td v-if="colspan.YearToDate.ShrinkageShow1" style="font-size: 13px; background-color:white !important; font-style: normal;border-top: bottom solid black; border-bottom: 1px solid black; border-top: 1px solid black;" :class="[json_data.Division_Total.Details_year_to_date.Shrinkage.Shrinkage_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_year_to_date.Shrinkage.Shrinkage_TY_amount,'$')}}</q-td>
                        <q-td style="font-size: 13px; background-color:white !important; font-style: normal;border-top: bottom solid black; border-bottom: 1px solid black; border-top: 1px solid black;" :class="[json_data.Division_Total.Details_year_to_date.Shrinkage.Shrinkage_TY_percent < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_year_to_date.Shrinkage.Shrinkage_TY_percent,'%')}}%</q-td>
                        <q-td v-if="colspan.YearToDate.ShrinkageShow2" style="font-size: 13px; background-color:white !important; font-style: normal;border-top: bottom solid black; border-bottom: 1px solid black; border-top: 1px solid black;" :class="[json_data.Division_Total.Details_year_to_date.Shrinkage.Shrinkage_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_year_to_date.Shrinkage.Shrinkage_LY_amount,'$')}}</q-td>
                        <q-td style="font-size: 13px; background-color:white !important; font-style: normal;border-top: bottom solid black; border-bottom: 1px solid black; border-top: 1px solid black;" :class="[json_data.Division_Total.Details_year_to_date.Shrinkage.Shrinkage_LY_percent < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_year_to_date.Shrinkage.Shrinkage_LY_percent,'%')}}%</q-td>
                        <q-td style="font-size: 13px; background-color:white !important; background-color: white !important;padding: 0px; border-bottom: 1px solid black; border-top: 1px solid black;"></q-td>
                    </template>

                    <template v-if="json_data.Division_Total.Details_year_to_date.Net_GP">
                        <q-td v-if="colspan.YearToDate.NetGPShow1" style="font-size: 13px; background-color:white !important; font-style: normal;border-top: bottom solid black; border-bottom: 1px solid black; border-top: 1px solid black;" :class="[json_data.Division_Total.Details_year_to_date.Net_GP.Net_GP_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_year_to_date.Net_GP.Net_GP_TY_amount,'$')}}</q-td>
                        <q-td style="font-size: 13px; background-color:white !important; font-style: normal;border-top: bottom solid black; border-bottom: 1px solid black; border-top: 1px solid black;" :class="[json_data.Division_Total.Details_year_to_date.Net_GP.Net_GP_TY_percent < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_year_to_date.Net_GP.Net_GP_TY_percent,'%')}}%</q-td>
                        <q-td v-if="colspan.YearToDate.NetGPShow2" style="font-size: 13px; background-color:white !important; font-style: normal;border-top: bottom solid black; border-bottom: 1px solid black; border-top: 1px solid black;" :class="[json_data.Division_Total.Details_year_to_date.Net_GP.Net_GP_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_year_to_date.Net_GP.Net_GP_LY_amount,'$')}}</q-td>
                        <q-td style="font-size: 13px; background-color:white !important; font-style: normal;border-top: bottom solid black; border-bottom: 1px solid black; border-top: 1px solid black;" :class="[json_data.Division_Total.Details_year_to_date.Net_GP.Net_GP_LY_percent < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_year_to_date.Net_GP.Net_GP_LY_percent,'%')}}%</q-td>
                        <q-td style="font-size: 13px; background-color:white !important; background-color: white !important;padding: 0px; border-bottom: 1px solid black; border-top: 1px solid black;"></q-td>
                    </template>

                    <template v-if="json_data.Division_Total.Details_year_to_date.Stock">
                        <q-td style="font-size: 13px; background-color:white !important; font-style: normal;border-top: bottom solid black; border-bottom: 1px solid black; border-top: 1px solid black;" :class="[json_data.Division_Total.Details_year_to_date.Stock.Stock_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_year_to_date.Stock.Stock_TY_amount,'$')}}</q-td>
                        <q-td v-if="colspan.YearToDate.StockShow" style="font-size: 13px; background-color:white !important; font-style: normal;border-top: bottom solid black; border-bottom: 1px solid black; border-top: 1px solid black;" :class="[json_data.Division_Total.Details_year_to_date.Stock.Stock_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_year_to_date.Stock.Stock_LY_amount,'$')}}</q-td>
                        <q-td style="font-size: 13px; background-color:white !important; font-style: normal;border-top: bottom solid black; border-bottom: 1px solid black; border-top: 1px solid black;" :class="[json_data.Division_Total.Details_year_to_date.Stock.Stock_vsLY_percent < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_year_to_date.Stock.Stock_vsLY_percent,'%')}}%</q-td>
                        <q-td style="font-size: 13px; background-color:white !important; font-style: normal;border-top: bottom solid black; border-bottom: 1px solid black; border-top: 1px solid black;" :class="[json_data.Division_Total.Details_year_to_date.Stock.Stock_TY_days < 0 ? 'negative_value' : '']">{{json_data.Division_Total.Details_year_to_date.Stock.Stock_TY_days}}</q-td>
                        <q-td style="font-size: 13px; background-color:white !important; font-style: normal;border-bottom: 1px solid black;border-right: 1px solid black; border-bottom: 1px solid black; border-top: 1px solid black;" :class="[json_data.Division_Total.Details_year_to_date.Stock.Stock_LY_days < 0 ? 'negative_value' : '']">{{json_data.Division_Total.Details_year_to_date.Stock.Stock_LY_days}}</q-td>
                    </template> -->

                </q-tr>
            </template>
            
            <template v-if="json_data.Division_Total_LFL">
                <q-tr v-if="json_data.Division_Total_LFL.Details_month_to_date" :props="props" style="font-weight: bold;">

                    <q-td style="background-color: white;position: sticky; left: 0;z-index: 100;"></q-td>
                    <q-td style="font-weight: bold;text-align: left;font-size: 13px;border: 0px;background-color:white;border-left: 1px solid black;border-right: 1px solid black;"></q-td>
                    <q-td style="min-width: 40px;max-width: 40px; font-weight: bold;text-align: left;font-size: 13px;border: 0px;background-color:white;position:sticky;left: 0px;z-index:100;border-right: 1px solid black;"></q-td>
                    <q-td style="font-weight: bold;text-align: left;font-size: 13px;border: 0px;background-color:white;">TOTAL LFL</q-td>

                    <q-td style="border: 0px; "></q-td>
                    <q-td style="border: 0px; "></q-td>
                    <q-td style="border: 0px; "></q-td>



                    <template v-if="json_data.Division_Total_LFL.Details_same_day.Sales">
                        <q-td style="font-size: 13px; font-style: normal;" :class="[json_data.Division_Total_LFL.Details_same_day.Sales.Sales_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_LFL.Details_same_day.Sales.Sales_TY_amount,'$')}}</q-td>
                        <q-td v-if="colspan.DayToDate.SalesShow" style="font-size: 13px; font-style: normal;" :class="[json_data.Division_Total_LFL.Details_same_day.Sales.Sales_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_LFL.Details_same_day.Sales.Sales_LY_amount,'$')}}</q-td>
                        <q-td style="font-size: 13px; font-style: normal;" :class="[json_data.Division_Total_LFL.Details_same_day.Sales.Sales_vsLY_percent < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_LFL.Details_same_day.Sales.Sales_vsLY_percent,'%')}}%</q-td>
                    </template>

                    <template v-if="json_data.Division_Total_LFL.Details_same_day.Profit">
                        <q-td style="font-size: 13px; font-style: normal;" :class="[json_data.Division_Total_LFL.Details_same_day.Profit.Profit_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_LFL.Details_same_day.Profit.Profit_TY_amount,'$')}}</q-td>
                        <q-td v-if="colspan.DayToDate.ProfitShow" style="font-size: 13px; font-style: normal;" :class="[json_data.Division_Total_LFL.Details_same_day.Profit.Profit_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_LFL.Details_same_day.Profit.Profit_LY_amount,'$')}}</q-td>
                        <q-td style="font-size: 13px; font-style: normal;" :class="[json_data.Division_Total_LFL.Details_same_day.Profit.Profit_vsLY_percent < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_LFL.Details_same_day.Profit.Profit_vsLY_percent,'%')}}%</q-td>
                        <q-td style="font-size: 13px; font-style: normal;" :class="[json_data.Division_Total_LFL.Details_same_day.Profit.Profit_Margin_TY < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_LFL.Details_same_day.Profit.Profit_Margin_TY,'%')}}%</q-td>
                        <q-td style="font-size: 13px; font-style: normal;" :class="[json_data.Division_Total_LFL.Details_same_day.Profit.Profit_Margin_LY < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_LFL.Details_same_day.Profit.Profit_Margin_LY,'%')}}%</q-td>
                        <q-td style="font-size: 13px; background-color: white;padding: 0px;"></q-td>
                    </template>



                    

                    <template v-if="json_data.Division_Total_LFL.Details_week_to_date.Sales">
                        <q-td style="font-size: 13px; font-style: normal;" :class="[json_data.Division_Total_LFL.Details_week_to_date.Sales.Sales_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_LFL.Details_week_to_date.Sales.Sales_TY_amount,'$')}}</q-td>
                        <q-td v-if="colspan.WeekToDate.SalesShow" style="font-size: 13px; font-style: normal;" :class="[json_data.Division_Total_LFL.Details_week_to_date.Sales.Sales_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_LFL.Details_week_to_date.Sales.Sales_LY_amount,'$')}}</q-td>
                        <q-td style="font-size: 13px; font-style: normal;" :class="[json_data.Division_Total_LFL.Details_week_to_date.Sales.Sales_vsLY_percent < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_LFL.Details_week_to_date.Sales.Sales_vsLY_percent,'%')}}%</q-td>
                    </template>

                    <template v-if="json_data.Division_Total_LFL.Details_week_to_date.Profit">
                        <q-td style="font-size: 13px; font-style: normal;" :class="[json_data.Division_Total_LFL.Details_week_to_date.Profit.Profit_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_LFL.Details_week_to_date.Profit.Profit_TY_amount,'$')}}</q-td>
                        <q-td v-if="colspan.WeekToDate.ProfitShow" style="font-size: 13px; font-style: normal;" :class="[json_data.Division_Total_LFL.Details_week_to_date.Profit.Profit_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_LFL.Details_week_to_date.Profit.Profit_LY_amount,'$')}}</q-td>
                        <q-td style="font-size: 13px; font-style: normal;" :class="[json_data.Division_Total_LFL.Details_week_to_date.Profit.Profit_vsLY_percent < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_LFL.Details_week_to_date.Profit.Profit_vsLY_percent,'%')}}%</q-td>
                        <q-td style="font-size: 13px; font-style: normal;" :class="[json_data.Division_Total_LFL.Details_week_to_date.Profit.Profit_Margin_TY < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_LFL.Details_week_to_date.Profit.Profit_Margin_TY,'%')}}%</q-td>
                        <q-td style="font-size: 13px; font-style: normal;" :class="[json_data.Division_Total_LFL.Details_week_to_date.Profit.Profit_Margin_LY < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_LFL.Details_week_to_date.Profit.Profit_Margin_LY,'%')}}%</q-td>
                        <q-td style="font-size: 13px; background-color: white;padding: 0px;"></q-td>
                    </template>





                    <template v-if="json_data.Division_Total_LFL.Details_month_to_date.Sales">
                        <q-td style="font-size: 13px; font-style: normal;" :class="[json_data.Division_Total_LFL.Details_month_to_date.Sales.Sales_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_LFL.Details_month_to_date.Sales.Sales_TY_amount,'$')}}</q-td>
                        <q-td v-if="colspan.MonthToDate.SalesShow" style="font-size: 13px; font-style: normal;" :class="[json_data.Division_Total_LFL.Details_month_to_date.Sales.Sales_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_LFL.Details_month_to_date.Sales.Sales_LY_amount,'$')}}</q-td>
                        <q-td style="font-size: 13px; font-style: normal;" :class="[json_data.Division_Total_LFL.Details_month_to_date.Sales.Sales_vsLY_percent < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_LFL.Details_month_to_date.Sales.Sales_vsLY_percent,'%')}}%</q-td>
                    </template>

                    <template v-if="json_data.Division_Total_LFL.Details_month_to_date.Profit">
                        <q-td style="font-size: 13px; font-style: normal;" :class="[json_data.Division_Total_LFL.Details_month_to_date.Profit.Profit_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_LFL.Details_month_to_date.Profit.Profit_TY_amount,'$')}}</q-td>
                        <q-td v-if="colspan.MonthToDate.ProfitShow" style="font-size: 13px; font-style: normal;" :class="[json_data.Division_Total_LFL.Details_month_to_date.Profit.Profit_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_LFL.Details_month_to_date.Profit.Profit_LY_amount,'$')}}</q-td>
                        <q-td style="font-size: 13px; font-style: normal;" :class="[json_data.Division_Total_LFL.Details_month_to_date.Profit.Profit_vsLY_percent < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_LFL.Details_month_to_date.Profit.Profit_vsLY_percent,'%')}}%</q-td>
                        <q-td style="font-size: 13px; font-style: normal;" :class="[json_data.Division_Total_LFL.Details_month_to_date.Profit.Profit_Margin_TY < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_LFL.Details_month_to_date.Profit.Profit_Margin_TY,'%')}}%</q-td>
                        <q-td style="font-size: 13px; font-style: normal;" :class="[json_data.Division_Total_LFL.Details_month_to_date.Profit.Profit_Margin_LY < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_LFL.Details_month_to_date.Profit.Profit_Margin_LY,'%')}}%</q-td>
                        <q-td style="font-size: 13px; background-color: white;padding: 0px;"></q-td>
                    </template>

                    <!-- <template v-if="json_data.Division_Total_LFL.Details_month_to_date.Scan_GP">
                        <q-td v-if="colspan.MonthToDate.ScanGPShow1" style="font-size: 13px; font-style: normal;" :class="[json_data.Division_Total_LFL.Details_month_to_date.Scan_GP.Scan_GP_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_LFL.Details_month_to_date.Scan_GP.Scan_GP_TY_amount,'$')}}</q-td>
                        <q-td style="font-size: 13px; font-style: normal;" :class="[json_data.Division_Total_LFL.Details_month_to_date.Scan_GP.Scan_GP_TY_percent < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_LFL.Details_month_to_date.Scan_GP.Scan_GP_TY_percent,'%')}}%</q-td>
                        <q-td v-if="colspan.MonthToDate.ScanGPShow2" style="font-size: 13px; font-style: normal;" :class="[json_data.Division_Total_LFL.Details_month_to_date.Scan_GP.Scan_GP_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_LFL.Details_month_to_date.Scan_GP.Scan_GP_LY_amount,'$')}}</q-td>
                        <q-td style="font-size: 13px; font-style: normal;" :class="[json_data.Division_Total_LFL.Details_month_to_date.Scan_GP.Scan_GP_LY_percent < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_LFL.Details_month_to_date.Scan_GP.Scan_GP_LY_percent,'%')}}%</q-td>
                        <q-td style="font-size: 13px; background-color: white;padding: 0px;"></q-td>
                    </template>

                    <template v-if="json_data.Division_Total_LFL.Details_month_to_date.Shrinkage">
                        <q-td v-if="colspan.MonthToDate.ShrinkageShow1" style="font-size: 13px; font-style: normal;" :class="[json_data.Division_Total_LFL.Details_month_to_date.Shrinkage.Shrinkage_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_LFL.Details_month_to_date.Shrinkage.Shrinkage_TY_amount,'$')}}</q-td>
                        <q-td style="font-size: 13px; font-style: normal;" :class="[json_data.Division_Total_LFL.Details_month_to_date.Shrinkage.Shrinkage_TY_percent < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_LFL.Details_month_to_date.Shrinkage.Shrinkage_TY_percent,'%')}}%</q-td>
                        <q-td v-if="colspan.MonthToDate.ShrinkageShow2" style="font-size: 13px; font-style: normal;" :class="[json_data.Division_Total_LFL.Details_month_to_date.Shrinkage.Shrinkage_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_LFL.Details_month_to_date.Shrinkage.Shrinkage_LY_amount,'$')}}</q-td>
                        <q-td style="font-size: 13px; font-style: normal;" :class="[json_data.Division_Total_LFL.Details_month_to_date.Shrinkage.Shrinkage_LY_percent < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_LFL.Details_month_to_date.Shrinkage.Shrinkage_LY_percent,'%')}}%</q-td>
                        <q-td style="font-size: 13px; background-color: white;padding: 0px;"></q-td>
                    </template>

                    <template v-if="json_data.Division_Total_LFL.Details_month_to_date.Net_GP">
                        <q-td v-if="colspan.MonthToDate.NetGPShow1" style="font-size: 13px; font-style: normal;" :class="[json_data.Division_Total_LFL.Details_month_to_date.Net_GP.Net_GP_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_LFL.Details_month_to_date.Net_GP.Net_GP_TY_amount,'$')}}</q-td>
                        <q-td style="font-size: 13px; font-style: normal;" :class="[json_data.Division_Total_LFL.Details_month_to_date.Net_GP.Net_GP_TY_percent < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_LFL.Details_month_to_date.Net_GP.Net_GP_TY_percent,'%')}}%</q-td>
                        <q-td v-if="colspan.MonthToDate.NetGPShow2" style="font-size: 13px; font-style: normal;" :class="[json_data.Division_Total_LFL.Details_month_to_date.Net_GP.Net_GP_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_LFL.Details_month_to_date.Net_GP.Net_GP_LY_amount,'$')}}</q-td>
                        <q-td style="font-size: 13px; font-style: normal;" :class="[json_data.Division_Total_LFL.Details_month_to_date.Net_GP.Net_GP_LY_percent < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_LFL.Details_month_to_date.Net_GP.Net_GP_LY_percent,'%')}}%</q-td>
                        <q-td style="font-size: 13px; background-color: white;padding: 0px;"></q-td>
                    </template>

                    <template v-if="json_data.Division_Total_LFL.Details_month_to_date.Stock">
                        <q-td style="font-size: 13px; font-style: normal;" :class="[json_data.Division_Total_LFL.Details_month_to_date.Stock.Stock_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_LFL.Details_month_to_date.Stock.Stock_TY_amount,'$')}}</q-td>
                        <q-td v-if="colspan.MonthToDate.StockShow" style="font-size: 13px; font-style: normal;" :class="[json_data.Division_Total_LFL.Details_month_to_date.Stock.Stock_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_LFL.Details_month_to_date.Stock.Stock_LY_amount,'$')}}</q-td>
                        <q-td style="font-size: 13px; font-style: normal;" :class="[json_data.Division_Total_LFL.Details_month_to_date.Stock.Stock_vsLY_percent < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_LFL.Details_month_to_date.Stock.Stock_vsLY_percent,'%')}}%</q-td>
                        <q-td style="font-size: 13px; font-style: normal;" :class="[json_data.Division_Total_LFL.Details_month_to_date.Stock.Stock_TY_days < 0 ? 'negative_value' : '']">{{json_data.Division_Total_LFL.Details_month_to_date.Stock.Stock_TY_days}}</q-td>
                        <q-td style="font-size: 13px; font-style: normal;" :class="[json_data.Division_Total_LFL.Details_month_to_date.Stock.Stock_LY_days < 0 ? 'negative_value' : '']">{{json_data.Division_Total_LFL.Details_month_to_date.Stock.Stock_LY_days}}</q-td>
                    </template>

                    <q-td style="border-top: 0px;border-bottom:0px;"></q-td> -->
                    <template v-if="json_data.Division_Total_LFL.Details_year_to_date.Sales">
                        <q-td style="font-size: 13px; font-style: normal;" :class="[json_data.Division_Total_LFL.Details_year_to_date.Sales.Sales_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_LFL.Details_year_to_date.Sales.Sales_TY_amount,'$')}}</q-td>
                        <q-td v-if="colspan.YearToDate.SalesShow" style="font-size: 13px; font-style: normal;" :class="[json_data.Division_Total_LFL.Details_year_to_date.Sales.Sales_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_LFL.Details_year_to_date.Sales.Sales_LY_amount,'$')}}</q-td>
                        <q-td style="font-size: 13px; font-style: normal;" :class="[json_data.Division_Total_LFL.Details_year_to_date.Sales.Sales_vsLY_percent < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_LFL.Details_year_to_date.Sales.Sales_vsLY_percent,'%')}}%</q-td>
                    </template>
                    
                    <template v-if="json_data.Division_Total_LFL.Details_year_to_date.Profit">
                        <q-td style="font-size: 13px; font-style: normal;" :class="[json_data.Division_Total_LFL.Details_year_to_date.Profit.Profit_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_LFL.Details_year_to_date.Profit.Profit_TY_amount,'$')}}</q-td>
                        <q-td v-if="colspan.YearToDate.ProfitShow" style="font-size: 13px; font-style: normal;" :class="[json_data.Division_Total_LFL.Details_year_to_date.Profit.Profit_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_LFL.Details_year_to_date.Profit.Profit_LY_amount,'$')}}</q-td>
                        <q-td style="font-size: 13px; font-style: normal;" :class="[json_data.Division_Total_LFL.Details_year_to_date.Profit.Profit_vsLY_percent < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_LFL.Details_year_to_date.Profit.Profit_vsLY_percent,'%')}}%</q-td>
                        <q-td style="font-size: 13px; font-style: normal;" :class="[json_data.Division_Total_LFL.Details_year_to_date.Profit.Profit_Margin_TY < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_LFL.Details_year_to_date.Profit.Profit_Margin_TY,'%')}}%</q-td>
                        <q-td style="font-size: 13px; font-style: normal;border-right: 1px solid black;" :class="[json_data.Division_Total_LFL.Details_year_to_date.Profit.Profit_Margin_LY < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_LFL.Details_year_to_date.Profit.Profit_Margin_LY,'%')}}%</q-td>
                        <!-- <q-td style="font-size: 13px; background-color: white;padding: 0px;"></q-td> -->
                    </template>

                    <!-- <template v-if="json_data.Division_Total_LFL.Details_year_to_date.Scan_GP">
                        <q-td v-if="colspan.YearToDate.ScanGPShow1" style="font-size: 13px; font-style: normal;" :class="[json_data.Division_Total_LFL.Details_year_to_date.Scan_GP.Scan_GP_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_LFL.Details_year_to_date.Scan_GP.Scan_GP_TY_amount,'$')}}</q-td>
                        <q-td style="font-size: 13px; font-style: normal;" :class="[json_data.Division_Total_LFL.Details_year_to_date.Scan_GP.Scan_GP_TY_percent < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_LFL.Details_year_to_date.Scan_GP.Scan_GP_TY_percent,'%')}}%</q-td>
                        <q-td v-if="colspan.YearToDate.ScanGPShow2" style="font-size: 13px; font-style: normal;" :class="[json_data.Division_Total_LFL.Details_year_to_date.Scan_GP.Scan_GP_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_LFL.Details_year_to_date.Scan_GP.Scan_GP_LY_amount,'$')}}</q-td>
                        <q-td style="font-size: 13px; font-style: normal;" :class="[json_data.Division_Total_LFL.Details_year_to_date.Scan_GP.Scan_GP_LY_percent < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_LFL.Details_year_to_date.Scan_GP.Scan_GP_LY_percent,'%')}}%</q-td>
                        <q-td style="font-size: 13px; background-color: white;padding: 0px;"></q-td>
                    </template>

                    <template v-if="json_data.Division_Total_LFL.Details_year_to_date.Shrinkage">
                        <q-td v-if="colspan.YearToDate.ShrinkageShow1" style="font-size: 13px; font-style: normal;" :class="[json_data.Division_Total_LFL.Details_year_to_date.Shrinkage.Shrinkage_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_LFL.Details_year_to_date.Shrinkage.Shrinkage_TY_amount,'$')}}</q-td>
                        <q-td style="font-size: 13px; font-style: normal;" :class="[json_data.Division_Total_LFL.Details_year_to_date.Shrinkage.Shrinkage_TY_percent < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_LFL.Details_year_to_date.Shrinkage.Shrinkage_TY_percent,'%')}}%</q-td>
                        <q-td v-if="colspan.YearToDate.ShrinkageShow2" style="font-size: 13px; font-style: normal;" :class="[json_data.Division_Total_LFL.Details_year_to_date.Shrinkage.Shrinkage_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_LFL.Details_year_to_date.Shrinkage.Shrinkage_LY_amount,'$')}}</q-td>
                        <q-td style="font-size: 13px; font-style: normal;" :class="[json_data.Division_Total_LFL.Details_year_to_date.Shrinkage.Shrinkage_LY_percent < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_LFL.Details_year_to_date.Shrinkage.Shrinkage_LY_percent,'%')}}%</q-td>
                        <q-td style="font-size: 13px; background-color: white;padding: 0px;"></q-td>
                    </template>

                    <template v-if="json_data.Division_Total_LFL.Details_year_to_date.Net_GP">
                        <q-td v-if="colspan.YearToDate.NetGPShow1" style="font-size: 13px; font-style: normal;" :class="[json_data.Division_Total_LFL.Details_year_to_date.Net_GP.Net_GP_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_LFL.Details_year_to_date.Net_GP.Net_GP_TY_amount,'$')}}</q-td>
                        <q-td style="font-size: 13px; font-style: normal;" :class="[json_data.Division_Total_LFL.Details_year_to_date.Net_GP.Net_GP_TY_percent < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_LFL.Details_year_to_date.Net_GP.Net_GP_TY_percent,'%')}}%</q-td>
                        <q-td v-if="colspan.YearToDate.NetGPShow2" style="font-size: 13px; font-style: normal;" :class="[json_data.Division_Total_LFL.Details_year_to_date.Net_GP.Net_GP_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_LFL.Details_year_to_date.Net_GP.Net_GP_LY_amount,'$')}}</q-td>
                        <q-td style="font-size: 13px; font-style: normal;" :class="[json_data.Division_Total_LFL.Details_year_to_date.Net_GP.Net_GP_LY_percent < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_LFL.Details_year_to_date.Net_GP.Net_GP_LY_percent,'%')}}%</q-td>
                        <q-td style="font-size: 13px; background-color: white;padding: 0px;"></q-td>
                    </template>

                    <template v-if="json_data.Division_Total_LFL.Details_year_to_date.Stock">
                        <q-td style="font-size: 13px; font-style: normal;" :class="[json_data.Division_Total_LFL.Details_year_to_date.Stock.Stock_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_LFL.Details_year_to_date.Stock.Stock_TY_amount,'$')}}</q-td>
                        <q-td v-if="colspan.YearToDate.StockShow" style="font-size: 13px; font-style: normal;" :class="[json_data.Division_Total_LFL.Details_year_to_date.Stock.Stock_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_LFL.Details_year_to_date.Stock.Stock_LY_amount,'$')}}</q-td>
                        <q-td style="font-size: 13px; font-style: normal;" :class="[json_data.Division_Total_LFL.Details_year_to_date.Stock.Stock_vsLY_percent < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_LFL.Details_year_to_date.Stock.Stock_vsLY_percent,'%')}}%</q-td>
                        <q-td style="font-size: 13px; font-style: normal;" :class="[json_data.Division_Total_LFL.Details_year_to_date.Stock.Stock_TY_days < 0 ? 'negative_value' : '']">{{json_data.Division_Total_LFL.Details_year_to_date.Stock.Stock_TY_days}}</q-td>
                        <q-td style="font-size: 13px; font-style: normal;border-right: 1px solid black;" :class="[json_data.Division_Total_LFL.Details_year_to_date.Stock.Stock_LY_days < 0 ? 'negative_value' : '']">{{json_data.Division_Total_LFL.Details_year_to_date.Stock.Stock_LY_days}}</q-td>
                    </template> -->

                </q-tr>
            </template>

            <template v-if="json_data.Division_Total_New">
                <q-tr v-if="json_data.Division_Total_New.Details_month_to_date" :props="props" style="font-weight: bold;">

                    <q-td style="background-color: white;position: sticky; left: 0;z-index: 100;"></q-td>
                    <q-td style="font-weight: bold;text-align: left;font-size: 13px;border: 0px;background-color:white;border-left: 1px solid black; border-bottom: 1px solid black;border-right: 1px solid black;"></q-td>
                    <q-td style="min-width: 40px;max-width: 40px; font-weight: bold;text-align: left;font-size: 13px;border: 0px;background-color:white;position:sticky;left: 0px;z-index:100;border-bottom: 1px solid black;border-right: 1px solid black;"></q-td>
                    <q-td style="font-weight: bold;text-align: left;font-size: 13px;border: 0px;background-color:white; border-bottom: 1px solid black;">TOTAL NEW STORES</q-td>
                    
                    <q-td style="border: 0px; border-bottom: 1px solid black;"></q-td>
                    <q-td style="border: 0px; border-bottom: 1px solid black;"></q-td>
                    <q-td style="border: 0px; border-bottom: 1px solid black;"></q-td>



                    <template v-if="json_data.Division_Total_New.Details_same_day.Sales">
                        <q-td style="font-size: 13px; font-style: normal;border-bottom: 1px solid black;" :class="[json_data.Division_Total_New.Details_same_day.Sales.Sales_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_New.Details_same_day.Sales.Sales_TY_amount,'$')}}</q-td>
                        <q-td v-if="colspan.DayToDate.SalesShow" style="font-size: 13px; font-style: normal;border-bottom: 1px solid black;" :class="[json_data.Division_Total_New.Details_same_day.Sales.Sales_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_New.Details_same_day.Sales.Sales_LY_amount,'$')}}</q-td>
                        <q-td style="font-size: 13px; font-style: normal;border-bottom: 1px solid black;" :class="[json_data.Division_Total_New.Details_same_day.Sales.Sales_vsLY_percent < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_New.Details_same_day.Sales.Sales_vsLY_percent,'%')}}%</q-td>
                    </template>


                    <template v-if="json_data.Division_Total_New.Details_same_day.Profit">
                        <q-td style="font-size: 13px; font-style: normal;border-bottom: 1px solid black;" :class="[json_data.Division_Total_New.Details_same_day.Profit.Profit_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_New.Details_same_day.Profit.Profit_TY_amount,'$')}}</q-td>
                        <q-td v-if="colspan.DayToDate.ProfitShow" style="font-size: 13px; font-style: normal;border-bottom: 1px solid black;" :class="[json_data.Division_Total_New.Details_same_day.Profit.Profit_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_New.Details_same_day.Profit.Profit_LY_amount,'$')}}</q-td>
                        <q-td style="font-size: 13px; font-style: normal;border-bottom: 1px solid black;" :class="[json_data.Division_Total_New.Details_same_day.Profit.Profit_vsLY_percent < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_New.Details_same_day.Profit.Profit_vsLY_percent,'%')}}%</q-td>
                        <q-td style="font-size: 13px; font-style: normal;border-bottom: 1px solid black;" :class="[json_data.Division_Total_New.Details_same_day.Profit.Profit_Margin_TY < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_New.Details_same_day.Profit.Profit_Margin_TY,'%')}}%</q-td>
                        <q-td style="font-size: 13px; font-style: normal;border-bottom: 1px solid black;" :class="[json_data.Division_Total_New.Details_same_day.Profit.Profit_Margin_LY < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_New.Details_same_day.Profit.Profit_Margin_LY,'%')}}%</q-td>
                        <q-td style="font-size: 13px; background-color: white;padding: 0px;"></q-td>
                    </template>




                    <template v-if="json_data.Division_Total_New.Details_week_to_date.Sales">
                        <q-td style="font-size: 13px; font-style: normal;border-bottom: 1px solid black;" :class="[json_data.Division_Total_New.Details_week_to_date.Sales.Sales_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_New.Details_week_to_date.Sales.Sales_TY_amount,'$')}}</q-td>
                        <q-td v-if="colspan.WeekToDate.SalesShow" style="font-size: 13px; font-style: normal;border-bottom: 1px solid black;" :class="[json_data.Division_Total_New.Details_week_to_date.Sales.Sales_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_New.Details_week_to_date.Sales.Sales_LY_amount,'$')}}</q-td>
                        <q-td style="font-size: 13px; font-style: normal;border-bottom: 1px solid black;" :class="[json_data.Division_Total_New.Details_week_to_date.Sales.Sales_vsLY_percent < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_New.Details_week_to_date.Sales.Sales_vsLY_percent,'%')}}%</q-td>
                    </template>


                    <template v-if="json_data.Division_Total_New.Details_week_to_date.Profit">
                        <q-td style="font-size: 13px; font-style: normal;border-bottom: 1px solid black;" :class="[json_data.Division_Total_New.Details_week_to_date.Profit.Profit_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_New.Details_week_to_date.Profit.Profit_TY_amount,'$')}}</q-td>
                        <q-td v-if="colspan.WeekToDate.ProfitShow" style="font-size: 13px; font-style: normal;border-bottom: 1px solid black;" :class="[json_data.Division_Total_New.Details_week_to_date.Profit.Profit_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_New.Details_week_to_date.Profit.Profit_LY_amount,'$')}}</q-td>
                        <q-td style="font-size: 13px; font-style: normal;border-bottom: 1px solid black;" :class="[json_data.Division_Total_New.Details_week_to_date.Profit.Profit_vsLY_percent < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_New.Details_week_to_date.Profit.Profit_vsLY_percent,'%')}}%</q-td>
                        <q-td style="font-size: 13px; font-style: normal;border-bottom: 1px solid black;" :class="[json_data.Division_Total_New.Details_week_to_date.Profit.Profit_Margin_TY < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_New.Details_week_to_date.Profit.Profit_Margin_TY,'%')}}%</q-td>
                        <q-td style="font-size: 13px; font-style: normal;border-bottom: 1px solid black;" :class="[json_data.Division_Total_New.Details_week_to_date.Profit.Profit_Margin_LY < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_New.Details_week_to_date.Profit.Profit_Margin_LY,'%')}}%</q-td>
                        <q-td style="font-size: 13px; background-color: white;padding: 0px;"></q-td>
                    </template>






                    <template v-if="json_data.Division_Total_New.Details_month_to_date.Sales">
                        <q-td style="font-size: 13px; font-style: normal;border-bottom: 1px solid black;" :class="[json_data.Division_Total_New.Details_month_to_date.Sales.Sales_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_New.Details_month_to_date.Sales.Sales_TY_amount,'$')}}</q-td>
                        <q-td v-if="colspan.MonthToDate.SalesShow" style="font-size: 13px; font-style: normal;border-bottom: 1px solid black;" :class="[json_data.Division_Total_New.Details_month_to_date.Sales.Sales_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_New.Details_month_to_date.Sales.Sales_LY_amount,'$')}}</q-td>
                        <q-td style="font-size: 13px; font-style: normal;border-bottom: 1px solid black;" :class="[json_data.Division_Total_New.Details_month_to_date.Sales.Sales_vsLY_percent < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_New.Details_month_to_date.Sales.Sales_vsLY_percent,'%')}}%</q-td>
                    </template>

                    <template v-if="json_data.Division_Total_New.Details_month_to_date.Profit">
                        <q-td style="font-size: 13px; font-style: normal;border-bottom: 1px solid black;" :class="[json_data.Division_Total_New.Details_month_to_date.Profit.Profit_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_New.Details_month_to_date.Profit.Profit_TY_amount,'$')}}</q-td>
                        <q-td v-if="colspan.MonthToDate.ProfitShow" style="font-size: 13px; font-style: normal;border-bottom: 1px solid black;" :class="[json_data.Division_Total_New.Details_month_to_date.Profit.Profit_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_New.Details_month_to_date.Profit.Profit_LY_amount,'$')}}</q-td>
                        <q-td style="font-size: 13px; font-style: normal;border-bottom: 1px solid black;" :class="[json_data.Division_Total_New.Details_month_to_date.Profit.Profit_vsLY_percent < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_New.Details_month_to_date.Profit.Profit_vsLY_percent,'%')}}%</q-td>
                        <q-td style="font-size: 13px; font-style: normal;border-bottom: 1px solid black;" :class="[json_data.Division_Total_New.Details_month_to_date.Profit.Profit_Margin_TY < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_New.Details_month_to_date.Profit.Profit_Margin_TY,'%')}}%</q-td>
                        <q-td style="font-size: 13px; font-style: normal;border-bottom: 1px solid black;" :class="[json_data.Division_Total_New.Details_month_to_date.Profit.Profit_Margin_LY < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_New.Details_month_to_date.Profit.Profit_Margin_LY,'%')}}%</q-td>
                        <q-td style="font-size: 13px; background-color: white;padding: 0px;"></q-td>
                    </template>

                    <!-- <template v-if="json_data.Division_Total_New.Details_month_to_date.Scan_GP">
                        <q-td v-if="colspan.MonthToDate.ScanGPShow1" style="font-size: 13px; font-style: normal;border-bottom: 1px solid black;" :class="[json_data.Division_Total_New.Details_month_to_date.Scan_GP.Scan_GP_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_New.Details_month_to_date.Scan_GP.Scan_GP_TY_amount,'$')}}</q-td>
                        <q-td style="font-size: 13px; font-style: normal;border-bottom: 1px solid black;" :class="[json_data.Division_Total_New.Details_month_to_date.Scan_GP.Scan_GP_TY_percent < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_New.Details_month_to_date.Scan_GP.Scan_GP_TY_percent,'%')}}%</q-td>
                        <q-td v-if="colspan.MonthToDate.ScanGPShow2" style="font-size: 13px; font-style: normal;border-bottom: 1px solid black;" :class="[json_data.Division_Total_New.Details_month_to_date.Scan_GP.Scan_GP_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_New.Details_month_to_date.Scan_GP.Scan_GP_LY_amount,'$')}}</q-td>
                        <q-td style="font-size: 13px; font-style: normal;border-bottom: 1px solid black;" :class="[json_data.Division_Total_New.Details_month_to_date.Scan_GP.Scan_GP_LY_percent < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_New.Details_month_to_date.Scan_GP.Scan_GP_LY_percent,'%')}}%</q-td>
                        <q-td style="font-size: 13px; background-color: white;padding: 0px;"></q-td>
                    </template>

                    <template v-if="json_data.Division_Total_New.Details_month_to_date.Shrinkage">
                        <q-td v-if="colspan.MonthToDate.ShrinkageShow1" style="font-size: 13px; font-style: normal;border-bottom: 1px solid black;" :class="[json_data.Division_Total_New.Details_month_to_date.Shrinkage.Shrinkage_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_New.Details_month_to_date.Shrinkage.Shrinkage_TY_amount,'$')}}</q-td>
                        <q-td style="font-size: 13px; font-style: normal;border-bottom: 1px solid black;" :class="[json_data.Division_Total_New.Details_month_to_date.Shrinkage.Shrinkage_TY_percent < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_New.Details_month_to_date.Shrinkage.Shrinkage_TY_percent,'%')}}%</q-td>
                        <q-td v-if="colspan.MonthToDate.ShrinkageShow2" style="font-size: 13px; font-style: normal;border-bottom: 1px solid black;" :class="[json_data.Division_Total_New.Details_month_to_date.Shrinkage.Shrinkage_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_New.Details_month_to_date.Shrinkage.Shrinkage_LY_amount,'$')}}</q-td>
                        <q-td style="font-size: 13px; font-style: normal;border-bottom: 1px solid black;" :class="[json_data.Division_Total_New.Details_month_to_date.Shrinkage.Shrinkage_LY_percent < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_New.Details_month_to_date.Shrinkage.Shrinkage_LY_percent,'%')}}%</q-td>
                        <q-td style="font-size: 13px; background-color: white;padding: 0px;"></q-td>
                    </template>

                    <template v-if="json_data.Division_Total_New.Details_month_to_date.Net_GP">
                        <q-td v-if="colspan.MonthToDate.NetGPShow1" style="font-size: 13px; font-style: normal;border-bottom: 1px solid black;" :class="[json_data.Division_Total_New.Details_month_to_date.Net_GP.Net_GP_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_New.Details_month_to_date.Net_GP.Net_GP_TY_amount,'$')}}</q-td>
                        <q-td style="font-size: 13px; font-style: normal;border-bottom: 1px solid black;" :class="[json_data.Division_Total_New.Details_month_to_date.Net_GP.Net_GP_TY_percent < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_New.Details_month_to_date.Net_GP.Net_GP_TY_percent,'%')}}%</q-td>
                        <q-td v-if="colspan.MonthToDate.NetGPShow2" style="font-size: 13px; font-style: normal;border-bottom: 1px solid black;" :class="[json_data.Division_Total_New.Details_month_to_date.Net_GP.Net_GP_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_New.Details_month_to_date.Net_GP.Net_GP_LY_amount,'$')}}</q-td>
                        <q-td style="font-size: 13px; font-style: normal;border-bottom: 1px solid black;" :class="[json_data.Division_Total_New.Details_month_to_date.Net_GP.Net_GP_LY_percent < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_New.Details_month_to_date.Net_GP.Net_GP_LY_percent,'%')}}%</q-td>
                        <q-td style="font-size: 13px; background-color: white;padding: 0px;"></q-td>
                    </template>

                    <template v-if="json_data.Division_Total_New.Details_month_to_date.Stock">
                        <q-td style="font-size: 13px; font-style: normal;border-bottom: 1px solid black;" :class="[json_data.Division_Total_New.Details_month_to_date.Stock.Stock_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_New.Details_month_to_date.Stock.Stock_TY_amount,'$')}}</q-td>
                        <q-td v-if="colspan.MonthToDate.StockShow" style="font-size: 13px; font-style: normal;border-bottom: 1px solid black;" :class="[json_data.Division_Total_New.Details_month_to_date.Stock.Stock_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_New.Details_month_to_date.Stock.Stock_LY_amount,'$')}}</q-td>
                        <q-td style="font-size: 13px; font-style: normal;border-bottom: 1px solid black;" :class="[json_data.Division_Total_New.Details_month_to_date.Stock.Stock_vsLY_percent < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_New.Details_month_to_date.Stock.Stock_vsLY_percent,'%')}}%</q-td>
                        <q-td style="font-size: 13px; font-style: normal;border-bottom: 1px solid black;" :class="[json_data.Division_Total_New.Details_month_to_date.Stock.Stock_TY_days < 0 ? 'negative_value' : '']">{{json_data.Division_Total_New.Details_month_to_date.Stock.Stock_TY_days}}</q-td>
                        <q-td style="font-size: 13px; font-style: normal;border-bottom: 1px solid black;" :class="[json_data.Division_Total_New.Details_month_to_date.Stock.Stock_LY_days < 0 ? 'negative_value' : '']">{{json_data.Division_Total_New.Details_month_to_date.Stock.Stock_LY_days}}</q-td>
                    </template>

                    <q-td style="border-top: 0px;border-bottom:0px;"></q-td> -->

                    <template v-if="json_data.Division_Total_New.Details_year_to_date.Sales">
                        <q-td style="font-size: 13px; font-style: normal;border-bottom: 1px solid black;" :class="[json_data.Division_Total_New.Details_year_to_date.Sales.Sales_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_New.Details_year_to_date.Sales.Sales_TY_amount,'$')}}</q-td>
                        <q-td v-if="colspan.YearToDate.SalesShow" style="font-size: 13px; font-style: normal;border-bottom: 1px solid black;" :class="[json_data.Division_Total_New.Details_year_to_date.Sales.Sales_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_New.Details_year_to_date.Sales.Sales_LY_amount,'$')}}</q-td>
                        <q-td style="font-size: 13px; font-style: normal;border-bottom: 1px solid black;" :class="[json_data.Division_Total_New.Details_year_to_date.Sales.Sales_vsLY_percent < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_New.Details_year_to_date.Sales.Sales_vsLY_percent,'%')}}%</q-td>
                    </template>

                    <template v-if="json_data.Division_Total_New.Details_year_to_date.Profit">
                        <q-td style="font-size: 13px; font-style: normal;border-bottom: 1px solid black;" :class="[json_data.Division_Total_New.Details_year_to_date.Profit.Profit_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_New.Details_year_to_date.Profit.Profit_TY_amount,'$')}}</q-td>
                        <q-td v-if="colspan.YearToDate.ProfitShow" style="font-size: 13px; font-style: normal;border-bottom: 1px solid black;" :class="[json_data.Division_Total_New.Details_year_to_date.Profit.Profit_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_New.Details_year_to_date.Profit.Profit_LY_amount,'$')}}</q-td>
                        <q-td style="font-size: 13px; font-style: normal;border-bottom: 1px solid black;" :class="[json_data.Division_Total_New.Details_year_to_date.Profit.Profit_vsLY_percent < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_New.Details_year_to_date.Profit.Profit_vsLY_percent,'%')}}%</q-td>
                        <q-td style="font-size: 13px; font-style: normal;border-bottom: 1px solid black;" :class="[json_data.Division_Total_New.Details_year_to_date.Profit.Profit_Margin_TY < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_New.Details_year_to_date.Profit.Profit_Margin_TY,'%')}}%</q-td>
                        <q-td style="font-size: 13px; font-style: normal;border-bottom: 1px solid black;border-right: 1px solid black;" :class="[json_data.Division_Total_New.Details_year_to_date.Profit.Profit_Margin_LY < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_New.Details_year_to_date.Profit.Profit_Margin_LY,'%')}}%</q-td>
                        <!-- <q-td style="font-size: 13px; background-color: white;padding: 0px;"></q-td> -->
                    </template>

                    <!-- <template v-if="json_data.Division_Total_New.Details_year_to_date.Scan_GP">
                        <q-td v-if="colspan.YearToDate.ScanGPShow1" style="font-size: 13px; font-style: normal;border-bottom: 1px solid black;" :class="[json_data.Division_Total_New.Details_year_to_date.Scan_GP.Scan_GP_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_New.Details_year_to_date.Scan_GP.Scan_GP_TY_amount,'$')}}</q-td>
                        <q-td style="font-size: 13px; font-style: normal;border-bottom: 1px solid black;" :class="[json_data.Division_Total_New.Details_year_to_date.Scan_GP.Scan_GP_TY_percent < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_New.Details_year_to_date.Scan_GP.Scan_GP_TY_percent,'%')}}%</q-td>
                        <q-td v-if="colspan.YearToDate.ScanGPShow2" style="font-size: 13px; font-style: normal;border-bottom: 1px solid black;" :class="[json_data.Division_Total_New.Details_year_to_date.Scan_GP.Scan_GP_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_New.Details_year_to_date.Scan_GP.Scan_GP_LY_amount,'$')}}</q-td>
                        <q-td style="font-size: 13px; font-style: normal;border-bottom: 1px solid black;" :class="[json_data.Division_Total_New.Details_year_to_date.Scan_GP.Scan_GP_LY_percent < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_New.Details_year_to_date.Scan_GP.Scan_GP_LY_percent,'%')}}%</q-td>
                        <q-td style="font-size: 13px; background-color: white;padding: 0px;"></q-td>
                    </template>

                    <template v-if="json_data.Division_Total_New.Details_year_to_date.Shrinkage">
                        <q-td v-if="colspan.YearToDate.ShrinkageShow1" style="font-size: 13px; font-style: normal;border-bottom: 1px solid black;" :class="[json_data.Division_Total_New.Details_year_to_date.Shrinkage.Shrinkage_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_New.Details_year_to_date.Shrinkage.Shrinkage_TY_amount,'$')}}</q-td>
                        <q-td style="font-size: 13px; font-style: normal;border-bottom: 1px solid black;" :class="[json_data.Division_Total_New.Details_year_to_date.Shrinkage.Shrinkage_TY_percent < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_New.Details_year_to_date.Shrinkage.Shrinkage_TY_percent,'%')}}%</q-td>
                        <q-td v-if="colspan.YearToDate.ShrinkageShow2" style="font-size: 13px; font-style: normal;border-bottom: 1px solid black;" :class="[json_data.Division_Total_New.Details_year_to_date.Shrinkage.Shrinkage_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_New.Details_year_to_date.Shrinkage.Shrinkage_LY_amount,'$')}}</q-td>
                        <q-td style="font-size: 13px; font-style: normal;border-bottom: 1px solid black;" :class="[json_data.Division_Total_New.Details_year_to_date.Shrinkage.Shrinkage_LY_percent < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_New.Details_year_to_date.Shrinkage.Shrinkage_LY_percent,'%')}}%</q-td>
                        <q-td style="font-size: 13px; background-color: white;padding: 0px;"></q-td>
                    </template>
                    
                    <template v-if="json_data.Division_Total_New.Details_year_to_date.Net_GP">
                        <q-td v-if="colspan.YearToDate.NetGPShow1" style="font-size: 13px; font-style: normal;border-bottom: 1px solid black;" :class="[json_data.Division_Total_New.Details_year_to_date.Net_GP.Net_GP_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_New.Details_year_to_date.Net_GP.Net_GP_TY_amount,'$')}}</q-td>
                        <q-td style="font-size: 13px; font-style: normal;border-bottom: 1px solid black;" :class="[json_data.Division_Total_New.Details_year_to_date.Net_GP.Net_GP_TY_percent < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_New.Details_year_to_date.Net_GP.Net_GP_TY_percent,'%')}}%</q-td>
                        <q-td v-if="colspan.YearToDate.NetGPShow2" style="font-size: 13px; font-style: normal;border-bottom: 1px solid black;" :class="[json_data.Division_Total_New.Details_year_to_date.Net_GP.Net_GP_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_New.Details_year_to_date.Net_GP.Net_GP_LY_amount,'$')}}</q-td>
                        <q-td style="font-size: 13px; font-style: normal;border-bottom: 1px solid black;" :class="[json_data.Division_Total_New.Details_year_to_date.Net_GP.Net_GP_LY_percent < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_New.Details_year_to_date.Net_GP.Net_GP_LY_percent,'%')}}%</q-td>
                        <q-td style="font-size: 13px; background-color: white;padding: 0px;"></q-td>
                    </template>

                    <template v-if="json_data.Division_Total_New.Details_year_to_date.Stock">
                        <q-td style="font-size: 13px; font-style: normal;border-bottom: 1px solid black;" :class="[json_data.Division_Total_New.Details_year_to_date.Stock.Stock_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_New.Details_year_to_date.Stock.Stock_TY_amount,'$')}}</q-td>
                        <q-td v-if="colspan.YearToDate.StockShow" style="font-size: 13px; font-style: normal;border-bottom: 1px solid black;" :class="[json_data.Division_Total_New.Details_year_to_date.Stock.Stock_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_New.Details_year_to_date.Stock.Stock_LY_amount,'$')}}</q-td>
                        <q-td style="font-size: 13px; font-style: normal;border-bottom: 1px solid black;" :class="[json_data.Division_Total_New.Details_year_to_date.Stock.Stock_vsLY_percent < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total_New.Details_year_to_date.Stock.Stock_vsLY_percent,'%')}}%</q-td>
                        <q-td style="font-size: 13px; font-style: normal;border-bottom: 1px solid black;" :class="[json_data.Division_Total_New.Details_year_to_date.Stock.Stock_TY_days < 0 ? 'negative_value' : '']">{{json_data.Division_Total_New.Details_year_to_date.Stock.Stock_TY_days}}</q-td>
                        <q-td style="font-size: 13px; font-style: normal;border-bottom: 1px solid black;border-right: 1px solid black;" :class="[json_data.Division_Total_New.Details_year_to_date.Stock.Stock_LY_days < 0 ? 'negative_value' : '']">{{json_data.Division_Total_New.Details_year_to_date.Stock.Stock_LY_days}}</q-td>
                    </template>
                     -->
                </q-tr>
            </template>

            <q-tr v-if="json_data.Division.length <= 0">
                <q-td colspan="1"></q-td>
                <q-td colspan="41" style="border: 1px solid black; text-align: center; font-weight: bold;">No data</q-td>
            </q-tr>

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

      <q-inner-loading :showing="closeLoading ? false : loading">
        <q-spinner-gears size="50px" color="primary" />
      </q-inner-loading>
    </q-card>

    
  </div>
</template>

<script>
import $ from 'jquery';
import Checkbox from 'src/components/RDA/Base/Checkbox'
import MultiSelectFilter from 'src/components/RDA/General/MultiSelectFilter';

export default {
    data()
    {
        return{
            table_class: this.index ? this.index : '',
            loading: true,
            columns: [{}],
            rows:[{}],
            json_data: {
                Division: [],
                Division_Total: {},
                Department: [],
            },
            ori_json_data: {
                Division: [],
                Division_Total: {},
                Department: [],
            },
            colspan:{
                DayToDate:
                { 
                    DayToDate: 8,
                    Sales: 3,
                    SalesShow: true,
                    SalesIcon: 'remove',
                    Profit: 3,
                    ProfitShow: true,
                    ProfitIcon: 'remove',
                    ProfitMargin: 2,
                    ProfitMarginShow: true,
                    ProfitMarginIcon: 'remove',
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
                WeekToDate:
                { 
                    WeekToDate: 8,
                    Sales: 3,
                    SalesShow: true,
                    SalesIcon: 'remove',
                    Profit: 3,
                    ProfitShow: true,
                    ProfitIcon: 'remove',
                    ProfitMargin: 2,
                    ProfitMarginShow: true,
                    ProfitMarginIcon: 'remove',
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
                MonthToDate:
                { 
                    MonthToDate: 8,
                    Sales: 3,
                    SalesShow: true,
                    SalesIcon: 'remove',
                    Profit: 3,
                    ProfitShow: true,
                    ProfitIcon: 'remove',
                    ProfitMargin: 2,
                    ProfitMarginShow: true,
                    ProfitMarginIcon: 'remove',
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
                    YearToDate: 8,
                    Sales: 3,
                    SalesShow: true,
                    SalesIcon: 'remove',
                    Profit: 3,
                    ProfitShow: true,
                    ProfitIcon: 'remove',
                    ProfitMargin: 2,
                    ProfitMarginShow: true,
                    ProfitMarginIcon: 'remove',
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
            amount_type: typeof(this.overwrite_amount_type) !== "undefined" ? this.overwrite_amount_type : true,
            show_expand: true,
            store_value: [],
            store_options: this.pass_store_options,
            code_value: [],
            code_options: this.pass_store_options,
            cohort_value: [],
            cohort_options: this.pass_cohort_options,
            state_value: [],
            state_options: this.pass_state_options,
            am_value: [],
            am_options: this.pass_am_options,
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
    components:{
        Checkbox,
        MultiSelectFilter
    },
    props: ['pass_data','forceLoading','pass_table_title','pass_store_options','pass_cohort_options','pass_state_options','pass_am_options', 'multiple_json', 'closeLoading','index','Day_to_Date','Week_to_Date','overwrite_amount_type'],
    methods:{
        handleTrClick(payload)
        {
            this.$emit("receiveTrClick", payload);
        },
        calculateWeekColspan()
        {
            var total = 8 - (this.colspan.WeekToDate.SalesShow ? 0 : 1) - (this.colspan.WeekToDate.ProfitShow ? 0 : 1);
            this.colspan.WeekToDate.WeekToDate = total;
        },
        SalesColumnWeekButtonClick(){

            if(this.colspan.WeekToDate.SalesShow == true)
            {
                // this.colspan.WeekToDate.WeekToDate = 23;
                this.colspan.WeekToDate.Sales = 2;
                this.colspan.WeekToDate.SalesShow = false;
                this.colspan.WeekToDate.SalesIcon = 'add';
            }
            else
            {
                // this.colspan.WeekToDate.WeekToDate = 24;
                this.colspan.WeekToDate.Sales = 3;
                this.colspan.WeekToDate.SalesShow = true;
                this.colspan.WeekToDate.SalesIcon = 'remove';
            }

            this.calculateWeekColspan();

        },
        ProfitColumnWeekButtonClick(){

            if(this.colspan.WeekToDate.ProfitShow == true)
            {
                // this.colspan.WeekToDate.WeekToDate = 23;
                this.colspan.WeekToDate.Profit = 2;
                this.colspan.WeekToDate.ProfitShow = false;
                this.colspan.WeekToDate.ProfitIcon = 'add';
            }
            else
            {
                // this.colspan.WeekToDate.WeekToDate = 24;
                this.colspan.WeekToDate.Profit = 3;
                this.colspan.WeekToDate.ProfitShow = true;
                this.colspan.WeekToDate.ProfitIcon = 'remove';
            }

            this.calculateWeekColspan();
            
        },
        calculateDayColspan()
        {
            var total = 8 - (this.colspan.DayToDate.SalesShow ? 0 : 1) - (this.colspan.DayToDate.ProfitShow ? 0 : 1);
            this.colspan.DayToDate.DayToDate = total;
        },
        SalesColumnDayButtonClick(){

            if(this.colspan.DayToDate.SalesShow == true)
            {
                // this.colspan.DayToDate.DayToDate = 23;
                this.colspan.DayToDate.Sales = 2;
                this.colspan.DayToDate.SalesShow = false;
                this.colspan.DayToDate.SalesIcon = 'add';
            }
            else
            {
                // this.colspan.DayToDate.DayToDate = 24;
                this.colspan.DayToDate.Sales = 3;
                this.colspan.DayToDate.SalesShow = true;
                this.colspan.DayToDate.SalesIcon = 'remove';
            }

            this.calculateDayColspan();

        },
        ProfitColumnDayButtonClick(){

                if(this.colspan.DayToDate.ProfitShow == true)
                {
                    // this.colspan.DayToDate.DayToDate = 23;
                    this.colspan.DayToDate.Profit = 2;
                    this.colspan.DayToDate.ProfitShow = false;
                    this.colspan.DayToDate.ProfitIcon = 'add';
                }
                else
                {
                    // this.colspan.DayToDate.DayToDate = 24;
                    this.colspan.DayToDate.Profit = 3;
                    this.colspan.DayToDate.ProfitShow = true;
                    this.colspan.DayToDate.ProfitIcon = 'remove';
                }

                this.calculateDayColspan();
                
            },
        ProfitColumnButtonClick(){

            if(this.colspan.MonthToDate.ProfitShow == true)
            {
                // this.colspan.MonthToDate.MonthToDate = 23;
                this.colspan.MonthToDate.Profit = 2;
                this.colspan.MonthToDate.ProfitShow = false;
                this.colspan.MonthToDate.ProfitIcon = 'add';
            }
            else
            {
                // this.colspan.MonthToDate.MonthToDate = 24;
                this.colspan.MonthToDate.Profit = 3;
                this.colspan.MonthToDate.ProfitShow = true;
                this.colspan.MonthToDate.ProfitIcon = 'remove';
            }

            this.calculateMonthColspan();
            
        },
        ProfitColumnYearButtonClick()
        {
            if(this.colspan.YearToDate.ProfitShow == true)
            {
                // this.colspan.YearToDate.YearToDate = 23;
                this.colspan.YearToDate.Profit = 2;
                this.colspan.YearToDate.ProfitShow = false;
                this.colspan.YearToDate.ProfitIcon = 'add';
            }
            else
            {
                // this.colspan.YearToDate.YearToDate = 24;
                this.colspan.YearToDate.Profit = 3;
                this.colspan.YearToDate.ProfitShow = true;
                this.colspan.YearToDate.ProfitIcon = 'remove';
            }

            this.calculateYearColspan();
        },
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

            var new_seq = this.ori_json_data.Division.sort((a, b) => {
                return eval(`a.${this.active_sorting_column} ${variable} b.${this.active_sorting_column} ? 1 : (a.${this.active_sorting_column} === b.${this.active_sorting_column} ? 0 : -1 )`);
            });

            var new_seq = new_seq.filter((entry)=>{
                return (this.store_value.length > 0 ? this.store_value.includes(entry.Title) : entry) &&
                (this.code_value.length > 0 ? this.code_value.includes(entry.Title) : entry) &&
                (this.cohort_value.length > 0 ? this.cohort_value.includes(entry.Cohort) : entry) &&
                (this.state_value.length > 0 ? this.state_value.includes(entry.State) : entry) &&
                (this.am_value.length > 0 ? this.am_value.includes(entry.AM) : entry);
            });

            this.json_data.Division = new_seq;
            


        },
        handleSorting(sorting, key)
        {
            this.active_sorting_column = key;
            this.active_sorting = sorting;


            var new_seq = this.ori_json_data.Division.sort((a, b) => {
                if(sorting == 'ascending')
                {
                    return a[this.active_sorting_column] > b[this.active_sorting_column] ? 1 : (a[this.active_sorting_column] === b[this.active_sorting_column] ? 0 : -1 );
                }
                else
                {
                    return a[this.active_sorting_column] < b[this.active_sorting_column] ? 1 : (a[this.active_sorting_column] === b[this.active_sorting_column] ? 0 : -1 );
                }
            });

            var new_seq = new_seq.filter((entry)=>{
                return (this.store_value.length > 0 ? this.store_value.includes(entry.Title) : entry) &&
                (this.code_value.length > 0 ? this.code_value.includes(entry.Title) : entry) &&
                (this.cohort_value.length > 0 ? this.cohort_value.includes(entry.Cohort) : entry) &&
                (this.state_value.length > 0 ? this.state_value.includes(entry.State) : entry) &&
                (this.am_value.length > 0 ? this.am_value.includes(entry.AM) : entry);
            });

            this.json_data.Division = new_seq

        },
        handleChangeOptions(){


            this.active_sorting = '';
            this.active_sorting_column = '';
            this.active_sorting_column_asc = '';

            var filter_details = this.ori_json_data.Division.filter((entry)=>{
                return (this.store_value.length > 0 ? this.store_value.includes(entry.Title) : entry) &&
                (this.code_value.length > 0 ? this.code_value.includes(entry.Title) : entry) &&
                (this.cohort_value.length > 0 ? this.cohort_value.includes(entry.Cohort) : entry) &&
                (this.state_value.length > 0 ? this.state_value.includes(entry.State) : entry) &&
                (this.am_value.length > 0 ? this.am_value.includes(entry.AM) : entry);
            });

            console.log(this.json_data);

            // this.json_data.Division_Total = {};
            

            var object = {};
            var object_year = {};

            Object.keys(filter_details).forEach((index)=>{
                
                object.Sales_TY_amount = Number(filter_details[index].Details_month_to_date.Sales.Sales_TY_amount) + (isNaN(object.Sales_TY_amount) ? Number(0) : Number(object.Sales_TY_amount));
                object.Sales_LY_amount = Number(filter_details[index].Details_month_to_date.Sales.Sales_LY_amount) + (isNaN(object.Sales_LY_amount) ? Number(0) : Number(object.Sales_LY_amount));
                object.Sales_vsLY_percent = Number(filter_details[index].Details_month_to_date.Sales.Sales_vsLY_percent) + (isNaN(object.Sales_vsLY_percent) ? Number(0) : Number(object.Sales_vsLY_percent));

                // object.Scan_GP_TY_amount = Number(filter_details[index].Details_month_to_date.Scan_GP.Scan_GP_TY_amount) + (isNaN(object.Scan_GP_TY_amount) ? Number(0) : Number(object.Scan_GP_TY_amount));
                // object.Scan_GP_TY_percent = Number(filter_details[index].Details_month_to_date.Scan_GP.Scan_GP_TY_percent) + (isNaN(object.Scan_GP_TY_percent) ? Number(0) : Number(object.Scan_GP_TY_percent));
                // object.Scan_GP_LY_amount = Number(filter_details[index].Details_month_to_date.Scan_GP.Scan_GP_LY_amount) + (isNaN(object.Scan_GP_LY_amount) ? Number(0) : Number(object.Scan_GP_LY_amount));
                // object.Scan_GP_LY_percent = Number(filter_details[index].Details_month_to_date.Scan_GP.Scan_GP_LY_percent) + (isNaN(object.Scan_GP_LY_percent) ? Number(0) : Number(object.Scan_GP_LY_percent));

                // object.Shrinkage_TY_amount = Number(filter_details[index].Details_month_to_date.Shrinkage.Shrinkage_TY_amount) + (isNaN(object.Shrinkage_TY_amount) ? Number(0) : Number(object.Shrinkage_TY_amount));
                // object.Shrinkage_TY_percent = Number(filter_details[index].Details_month_to_date.Shrinkage.Shrinkage_TY_percent) + (isNaN(object.Shrinkage_TY_percent) ? Number(0) : Number(object.Shrinkage_TY_percent));
                // object.Shrinkage_LY_amount = Number(filter_details[index].Details_month_to_date.Shrinkage.Shrinkage_LY_amount) + (isNaN(object.Shrinkage_LY_amount) ? Number(0) : Number(object.Shrinkage_LY_amount));
                // object.Shrinkage_LY_percent = Number(filter_details[index].Details_month_to_date.Shrinkage.Shrinkage_LY_percent) + (isNaN(object.Shrinkage_LY_percent) ? Number(0) : Number(object.Shrinkage_LY_percent));

                // object.Net_GP_TY_amount = Number(filter_details[index].Details_month_to_date.Net_GP.Net_GP_TY_amount) + (isNaN(object.Net_GP_TY_amount) ? Number(0) : Number(object.Net_GP_TY_amount));
                // object.Net_GP_TY_percent = Number(filter_details[index].Details_month_to_date.Net_GP.Net_GP_TY_percent) + (isNaN(object.Net_GP_TY_percent) ? Number(0) : Number(object.Net_GP_TY_percent));
                // object.Net_GP_LY_amount = Number(filter_details[index].Details_month_to_date.Net_GP.Net_GP_LY_amount) + (isNaN(object.Net_GP_LY_amount) ? Number(0) : Number(object.Net_GP_LY_amount));
                // object.Net_GP_LY_percent = Number(filter_details[index].Details_month_to_date.Net_GP.Net_GP_LY_percent) + (isNaN(object.Net_GP_LY_percent) ? Number(0) : Number(object.Net_GP_LY_percent));

                // object.Stock_TY_amount = Number(filter_details[index].Details_month_to_date.Stock.Stock_TY_amount) + (isNaN(object.Stock_TY_amount) ? Number(0) : Number(object.Stock_TY_amount));
                // object.Stock_LY_amount = Number(filter_details[index].Details_month_to_date.Stock.Stock_LY_amount) + (isNaN(object.Stock_LY_amount) ? Number(0) : Number(object.Stock_LY_amount));
                // object.Stock_vsLY_percent = Number(filter_details[index].Details_month_to_date.Stock.Stock_vsLY_percent) + (isNaN(object.Stock_vsLY_percent) ? Number(0) : Number(object.Stock_vsLY_percent));
                // object.Stock_TY_days = Number(filter_details[index].Details_month_to_date.Stock.Stock_TY_days) + (isNaN(object.Stock_TY_days) ? Number(0) : Number(object.Stock_TY_days));
                // object.Stock_LY_days = Number(filter_details[index].Details_month_to_date.Stock.Stock_LY_days) + (isNaN(object.Stock_LY_days) ? Number(0) : Number(object.Stock_LY_days));

                object.Profit_TY_amount = Number(filter_details[index].Details_month_to_date.Profit.Profit_TY_amount) + (isNaN(object.Profit_TY_amount) ? Number(0) : Number(object.Profit_TY_amount));
                object.Profit_LY_amount = Number(filter_details[index].Details_month_to_date.Profit.Profit_LY_amount) + (isNaN(object.Profit_LY_amount) ? Number(0) : Number(object.Profit_LY_amount));
                object.Profit_vsLY_percent = Number(filter_details[index].Details_month_to_date.Profit.Profit_vsLY_percent) + (isNaN(object.Profit_vsLY_percent) ? Number(0) : Number(object.Profit_vsLY_percent));
                object.Profit_Margin_TY = Number(filter_details[index].Details_month_to_date.Profit.Profit_Margin_TY) + (isNaN(object.Profit_Margin_TY) ? Number(0) : Number(object.Profit_Margin_TY));
                object.Profit_Margin_LY = Number(filter_details[index].Details_month_to_date.Profit.Profit_Margin_LY) + (isNaN(object.Profit_Margin_LY) ? Number(0) : Number(object.Profit_Margin_LY));


                object_year.Sales_TY_amount = Number(filter_details[index].Details_year_to_date.Sales.Sales_TY_amount) + (isNaN(object_year.Sales_TY_amount) ? Number(0) : Number(object_year.Sales_TY_amount));
                object_year.Sales_LY_amount = Number(filter_details[index].Details_year_to_date.Sales.Sales_LY_amount) + (isNaN(object_year.Sales_LY_amount) ? Number(0) : Number(object_year.Sales_LY_amount));
                object_year.Sales_vsLY_percent = Number(filter_details[index].Details_year_to_date.Sales.Sales_vsLY_percent) + (isNaN(object_year.Sales_vsLY_percent) ? Number(0) : Number(object_year.Sales_vsLY_percent));


                object_year.Profit_TY_amount = Number(filter_details[index].Details_month_to_date.Profit.Profit_TY_amount) + (isNaN(object_year.Profit_TY_amount) ? Number(0) : Number(object_year.Profit_TY_amount));
                object_year.Profit_LY_amount = Number(filter_details[index].Details_month_to_date.Profit.Profit_LY_amount) + (isNaN(object_year.Profit_LY_amount) ? Number(0) : Number(object_year.Profit_LY_amount));
                object_year.Profit_vsLY_percent = Number(filter_details[index].Details_month_to_date.Profit.Profit_vsLY_percent) + (isNaN(object_year.Profit_vsLY_percent) ? Number(0) : Number(object_year.Profit_vsLY_percent));
                object_year.Profit_Margin_TY = Number(filter_details[index].Details_month_to_date.Profit.Profit_Margin_TY) + (isNaN(object_year.Profit_Margin_TY) ? Number(0) : Number(object_year.Profit_Margin_TY));
                object_year.Profit_Margin_LY = Number(filter_details[index].Details_month_to_date.Profit.Profit_Margin_LY) + (isNaN(object_year.Profit_Margin_LY) ? Number(0) : Number(object_year.Profit_Margin_LY));
                
                // object_year.Scan_GP_TY_amount = Number(filter_details[index].Details_year_to_date.Scan_GP.Scan_GP_TY_amount) + (isNaN(object_year.Scan_GP_TY_amount) ? Number(0) : Number(object_year.Scan_GP_TY_amount));
                // object_year.Scan_GP_TY_percent = Number(filter_details[index].Details_year_to_date.Scan_GP.Scan_GP_TY_percent) + (isNaN(object_year.Scan_GP_TY_percent) ? Number(0) : Number(object_year.Scan_GP_TY_percent));
                // object_year.Scan_GP_LY_amount = Number(filter_details[index].Details_year_to_date.Scan_GP.Scan_GP_LY_amount) + (isNaN(object_year.Scan_GP_LY_amount) ? Number(0) : Number(object_year.Scan_GP_LY_amount));
                // object_year.Scan_GP_LY_percent = Number(filter_details[index].Details_year_to_date.Scan_GP.Scan_GP_LY_percent) + (isNaN(object_year.Scan_GP_LY_percent) ? Number(0) : Number(object_year.Scan_GP_LY_percent));

                // object_year.Shrinkage_TY_amount = Number(filter_details[index].Details_year_to_date.Shrinkage.Shrinkage_TY_amount) + (isNaN(object_year.Shrinkage_TY_amount) ? Number(0) : Number(object_year.Shrinkage_TY_amount));
                // object_year.Shrinkage_TY_percent = Number(filter_details[index].Details_year_to_date.Shrinkage.Shrinkage_TY_percent) + (isNaN(object_year.Shrinkage_TY_percent) ? Number(0) : Number(object_year.Shrinkage_TY_percent));
                // object_year.Shrinkage_LY_amount = Number(filter_details[index].Details_year_to_date.Shrinkage.Shrinkage_LY_amount) + (isNaN(object_year.Shrinkage_LY_amount) ? Number(0) : Number(object_year.Shrinkage_LY_amount));
                // object_year.Shrinkage_LY_percent = Number(filter_details[index].Details_year_to_date.Shrinkage.Shrinkage_LY_percent) + (isNaN(object_year.Shrinkage_LY_percent) ? Number(0) : Number(object_year.Shrinkage_LY_percent));

                // object_year.Net_GP_TY_amount = Number(filter_details[index].Details_year_to_date.Net_GP.Net_GP_TY_amount) + (isNaN(object_year.Net_GP_TY_amount) ? Number(0) : Number(object_year.Net_GP_TY_amount));
                // object_year.Net_GP_TY_percent = Number(filter_details[index].Details_year_to_date.Net_GP.Net_GP_TY_percent) + (isNaN(object_year.Net_GP_TY_percent) ? Number(0) : Number(object_year.Net_GP_TY_percent));
                // object_year.Net_GP_LY_amount = Number(filter_details[index].Details_year_to_date.Net_GP.Net_GP_LY_amount) + (isNaN(object_year.Net_GP_LY_amount) ? Number(0) : Number(object_year.Net_GP_LY_amount));
                // object_year.Net_GP_LY_percent = Number(filter_details[index].Details_year_to_date.Net_GP.Net_GP_LY_percent) + (isNaN(object_year.Net_GP_LY_percent) ? Number(0) : Number(object_year.Net_GP_LY_percent));

                // object_year.Stock_TY_amount = Number(filter_details[index].Details_year_to_date.Stock.Stock_TY_amount) + (isNaN(object_year.Stock_TY_amount) ? Number(0) : Number(object_year.Stock_TY_amount));
                // object_year.Stock_LY_amount = Number(filter_details[index].Details_year_to_date.Stock.Stock_LY_amount) + (isNaN(object_year.Stock_LY_amount) ? Number(0) : Number(object_year.Stock_LY_amount));
                // object_year.Stock_vsLY_percent = Number(filter_details[index].Details_year_to_date.Stock.Stock_vsLY_percent) + (isNaN(object_year.Stock_vsLY_percent) ? Number(0) : Number(object_year.Stock_vsLY_percent));
                // object_year.Stock_TY_days = Number(filter_details[index].Details_year_to_date.Stock.Stock_TY_days) + (isNaN(object_year.Stock_TY_days) ? Number(0) : Number(object_year.Stock_TY_days));
                // object_year.Stock_LY_days = Number(filter_details[index].Details_year_to_date.Stock.Stock_LY_days) + (isNaN(object_year.Stock_LY_days) ? Number(0) : Number(object_year.Stock_LY_days));

            });//close object loop

            var Details_month_to_date_json = {
                "Profit": {
                    "Profit_TY_amount": object.Profit_TY_amount,
                    "Profit_LY_amount": object.Profit_LY_amount,
                    "Profit_vsLY_percent": object.Profit_vsLY_percent,
                    "Profit_Margin_TY": object.Profit_Margin_TY,
                    "Profit_Margin_LY": object.Profit_Margin_LY,
                },
                "Sales": {
                    "Sales_TY_amount": object.Sales_TY_amount,
                    "Sales_LY_amount": object.Sales_LY_amount,
                    "Sales_vsLY_percent": object.Sales_vsLY_percent,
                },
                "Scan_GP": {
                    "Scan_GP_TY_amount": object.Scan_GP_TY_amount,
                    "Scan_GP_TY_percent": object.Scan_GP_TY_percent,
                    "Scan_GP_LY_amount": object.Scan_GP_LY_amount,
                    "Scan_GP_LY_percent": object.Scan_GP_LY_percent,
                },
                "Shrinkage": {
                    "Shrinkage_TY_amount": object.Shrinkage_TY_amount,
                    "Shrinkage_TY_percent": object.Shrinkage_TY_percent,
                    "Shrinkage_LY_amount": object.Shrinkage_LY_amount,
                    "Shrinkage_LY_percent": object.Shrinkage_LY_percent,
                },
                "Net_GP": {
                    "Net_GP_TY_amount": object.Net_GP_TY_amount,
                    "Net_GP_TY_percent": object.Net_GP_TY_percent,
                    "Net_GP_LY_amount": object.Net_GP_LY_amount,
                    "Net_GP_LY_percent": object.Net_GP_LY_percent,
                },
                "Stock": {
                    "Stock_TY_amount": object.Stock_TY_amount,
                    "Stock_LY_amount": object.Stock_LY_amount,
                    "Stock_vsLY_percent": object.Stock_vsLY_percent,
                    "Stock_TY_days": object.Stock_TY_days,
                    "Stock_LY_days": object.Stock_LY_days,
                }
            }


            var Details_year_to_date_json = {
                "Profit": {
                    "Profit_TY_amount": object_year.Profit_TY_amount,
                    "Profit_LY_amount": object_year.Profit_LY_amount,
                    "Profit_vsLY_percent": object_year.Profit_vsLY_percent,
                    "Profit_Margin_TY": object_year.Profit_Margin_TY,
                    "Profit_Margin_LY": object_year.Profit_Margin_LY,
                },
                "Sales": {
                    "Sales_TY_amount": object_year.Sales_TY_amount,
                    "Sales_LY_amount": object_year.Sales_LY_amount,
                    "Sales_vsLY_percent": object_year.Sales_vsLY_percent,
                },
                "Scan_GP": {
                    "Scan_GP_TY_amount": object_year.Scan_GP_TY_amount,
                    "Scan_GP_TY_percent": object_year.Scan_GP_TY_percent,
                    "Scan_GP_LY_amount": object_year.Scan_GP_LY_amount,
                    "Scan_GP_LY_percent": object_year.Scan_GP_LY_percent,
                },
                "Shrinkage": {
                    "Shrinkage_TY_amount": object_year.Shrinkage_TY_amount,
                    "Shrinkage_TY_percent": object_year.Shrinkage_TY_percent,
                    "Shrinkage_LY_amount": object_year.Shrinkage_LY_amount,
                    "Shrinkage_LY_percent": object_year.Shrinkage_LY_percent,
                },
                "Net_GP": {
                    "Net_GP_TY_amount": object_year.Net_GP_TY_amount,
                    "Net_GP_TY_percent": object_year.Net_GP_TY_percent,
                    "Net_GP_LY_amount": object_year.Net_GP_LY_amount,
                    "Net_GP_LY_percent": object_year.Net_GP_LY_percent,
                },
                "Stock": {
                    "Stock_TY_amount": object_year.Stock_TY_amount,
                    "Stock_LY_amount": object_year.Stock_LY_amount,
                    "Stock_vsLY_percent": object_year.Stock_vsLY_percent,
                    "Stock_TY_days": object_year.Stock_TY_days,
                    "Stock_LY_days": object_year.Stock_LY_days,
                }
            }


            this.json_data.Division = filter_details;
            this.json_data.Division_Total.Details_month_to_date = Details_month_to_date_json;
            this.json_data.Division_Total.Details_year_to_date = Details_year_to_date_json;

            if(filter_details.length != this.ori_json_data.Division.length)
            {
                this.json_data.Division_Total_LFL = {};
                this.json_data.Division_Total_New = {};
            }
            else
            {
                this.json_data.Division_Total_LFL = this.ori_json_data.Division_Total_LFL;
                this.json_data.Division_Total_New = this.ori_json_data.Division_Total_New;
            }
            

            if(this.store_value.length > 0)
            {
                var filter_status = true;
            }
            else
            {
                var filter_status = false;
            }

            this.$emit('receiveFilterStatus', filter_status);


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

                var table_class = '';

                if(this.index)
                {
                    table_class = this.index;
                }
                else
                {
                    table_class = '';
                }

                let table = document.getElementById('table_total_division1_id'+table_class);

                // let table = document.getElementById('table_total_division1_id');

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
            var total = 8 - (this.colspan.MonthToDate.SalesShow ? 0 : 1) - (this.colspan.MonthToDate.ProfitShow ? 0 : 1);
            this.colspan.MonthToDate.MonthToDate = total;
        },
        calculateYearColspan()
        {
            var total = 8 - (this.colspan.YearToDate.SalesShow ? 0 : 1) - (this.colspan.YearToDate.ProfitShow ? 0 : 1);
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
        var table_class = '';

        if(this.index)
        {
            table_class = this.index;
        }
        else
        {
            table_class = '';
        }

        $('.table_total_division1'+table_class).find('.q-table').attr('id','table_total_division1_id'+table_class);
        // $('.table_total_division1').find('.q-table').attr('id','table_total_division1_id');
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

        // var $el = $('.table_total_division1').find('table').find('thead').find('tr:eq(0)'); 
        // var $el2 = $('.table_total_division1').find('table').find('thead').find('tr:eq(1)'); 
        // var $el3 = $('.table_total_division1').find('table').find('thead').find('tr:eq(2)'); 
        // var $el4 = $('.table_total_division1').find('table').find('thead').find('tr:eq(3)'); 

        // var stickTop = $el.offset();
        
        // var headerHeight = $('.q-header').height();

        // var header_padding_top = $('.table_total_division1').find('.q-table__top').css('padding-top');
        // var header_padding_top = header_padding_top.replace('px','');
        // var header_padding_bottom = $('.table_total_division1').find('.q-table__top').css('padding-bottom');
        // var header_padding_bottom = header_padding_bottom.replace('px','');
        // var total_header_padding = Number(header_padding_top)+Number(header_padding_bottom)

        $('.q-table__middle.q-virtual-scroll').scroll((e)=>{ 
            
            var $el = $('.table_total_division1').find('table').find('thead').find('tr:eq(0)'); 
            var $el2 = $('.table_total_division1').find('table').find('thead').find('tr:eq(1)'); 
            var $el3 = $('.table_total_division1').find('table').find('thead').find('tr:eq(2)'); 
            var $el4 = $('.table_total_division1').find('table').find('thead').find('tr:eq(3)'); 

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

        if(this.multiple_json)
        {
            this.json_data = this.multiple_json.pass_data;
            this.ori_json_data = JSON.parse(JSON.stringify(this.multiple_json.pass_data));
            this.loading = false;

            this.active_sorting = '';
            this.active_sorting_column = '';
            this.active_sorting_column_asc = '';

            this.code_value = [];
            this.store_value = [];
            this.cohort_value = [];
            this.state_value = [];
            this.am_value = [];
        }

    },
    watch: {
        pass_cohort_options(newVal)
        {
            this.cohort_options = newVal;
            // this.loading = false;
        },
        pass_state_options(newVal)
        {
            this.state_options = newVal;
            // this.loading = false;
        },
        pass_am_options(newVal)
        {
            this.am_options = newVal;
            // this.loading = false;
        },
        pass_store_options(newVal)
        {
            this.store_options = newVal;
            this.code_options = newVal;
            // this.loading = false;
        },
        pass_data(newVal)
        {
            this.json_data = newVal;
            this.ori_json_data = JSON.parse(JSON.stringify(newVal));
            this.loading = false;

            this.active_sorting = '';
            this.active_sorting_column = '';
            this.active_sorting_column_asc = '';

            this.code_value = [];
            this.store_value = [];
            this.cohort_value = [];
            this.state_value = [];
            this.am_value = [];

        },
        forceLoading(newVal)
        {
            // alert(newVal);
            // if(newVal)
            // {
                this.loading = newVal;
            // }
        },
        pass_table_title(newVal)
        {
            this.table_title = newVal;
        },
        overwrite_amount_type(newVal)
        {
            this.amount_type = newVal;
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

.table_total_division1 > .q-table__middle > .q-table > thead > tr:nth-child(2) > th, .table_total_division1 > .q-table__middle > .q-table > thead > tr:nth-child(3) > th, .table_total_division1 > .q-table__middle > .q-table > thead > tr:nth-child(4) > th
{
    font-size: 11px;
    font-weight: bold;
    padding-top: 0px;
    padding-bottom: 0px;
    border-color: black;
}

.table_total_division1 > .q-table__middle > .q-table > thead > tr:nth-child(5) > th
{
    font-size: 11px;
    padding-top: 0px;
    padding-bottom: 0px;
    border-color: black;
}

.table_total_division1 > .q-table__middle > .q-table > tbody > tr > td
{
    padding-top: 0px;
    padding-bottom: 0px;
    padding-right: 3px;
    font-size: 11px;
    border-color: black;
}

.table_total_division1 > .q-table__middle > .q-table > tbody > tr > td:nth-child(n+3) {
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

.table_total_division1 > .q-table__middle > .q-table > thead > tr:nth-child(2) > th:nth-child(4),
.table_total_division1 > .q-table__middle > .q-table > thead > tr:nth-child(2) > th:nth-child(6)
{
  /* border-top: 1px solid black !important; */
}

* >>> .table_total_division1 > .q-table__top
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
.table_total_division1 > .q-table__middle > .q-table > thead > tr > th:nth-child(1),
.table_total_division1 > .q-table__middle > .q-table > tbody > tr > td:nth-child(1)
{
    min-width: 20px;
    max-width: 20px;
    padding: 0px;
}

/* 
.table_total_division1 > .q-table__middle > .q-table > tbody > tr > td:nth-child(1)
{
    background-color: red !important;
    left: 0;
    position: sticky;
}

.table_total_division1 > .q-table__middle > .q-table > tbody > tr > td:nth-child(2)
{
    background-color: yellow !important;
    left: 20px;
    position: sticky;
} */

.table_total_division1 > .q-table__middle > .q-table > thead > tr:nth-child(1) > th
{
    top: 0;
    position: sticky;
    z-index: 110;
}

.table_total_division1 > .q-table__middle > .q-table > thead > tr:nth-child(2) > th
{
    top: v-bind(first_height);
    position: sticky;
    z-index: 110;
}

.table_total_division1 > .q-table__middle > .q-table > thead > tr:nth-child(3) > th
{
    top: v-bind(second_height);
    position: sticky;
    z-index: 110;
}

.table_total_division1 > .q-table__middle > .q-table > thead > tr:nth-child(4) > th
{
    top: v-bind(third_height);
    position: sticky;
    z-index: 110;
}

.q-inner-loading
{
    z-index: 200;
}


li:nth-child(odd) {
    color: #777;
}

.table_total_division1 > .q-table__middle > .q-table > tbody > tr:nth-child(even):not(:nth-last-child(-n+2)) > td:nth-child(n+2)
{
    background-color: #dbdbdb !important;
}

.flip_up {
  transform: scaleY(1);
}

.flip_down {
  transform: scaleY(-1);
}


* >>> thead > tr:nth-child(3) > th:nth-child(-n+7) 
{
    cursor: pointer;
}

* >>> thead > tr:nth-child(4) > th:nth-child(n+8) 
{
    cursor: pointer;
}

</style>