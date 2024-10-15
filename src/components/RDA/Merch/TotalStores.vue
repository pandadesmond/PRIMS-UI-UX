<template>
   <div class="q-pa-md test" style="overflow-x: auto;">
    <q-card class="bg-grey-3 relative-position">

    <q-card-section style="padding: 0px;">

    <!-- <span>{{formatAmount(json_data.Division_Total.Details_month_to_date.Sales.Sales_TY_amount,'%')}}</span> -->
    <q-table class="table_total_sales"
      :title="table_title"
      separator="vertical"
      :dense="true"
        :rows="rows"
      :columns="columns"
      virtual-scroll
      style="height: 82vh;"
    >

            <template v-slot:top>
        <div style="width: 100%;">
            <div class="row">

                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" style="display: flex;">
                
                    <span style="font-size: 20px; letter-spacing: 0.005em; font-weight: 400;">{{table_title}}</span>
                    
                    <div style="border: 1px solid black;margin-left: 10px;padding-left: 5px; padding-right: 5px;">
                        <span style="font-weight: bold;">RM000s</span>
                        <Checkbox
                        :disable="false"
                        :no_label="true"
                        v-model="amount_type"
                        :dbComponentBehavior="dbComponentBehavior.text"
                        style="margin-left: -10px; margin-right: -6px;padding-left: 5px;" />
                    </div>
                </div>

                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
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
            <q-th style="border: 0px;border: 0px;background-color: white;position:sticky;left: 20px;z-index:120;"></q-th>
            <q-th style="border: 0px;background-color: white;position:sticky;left: 50px;z-index:120;"></q-th>

            <q-th v-if="colspan.MonthToDate.SalesShow" style="border: 0px;border-top:1px solid black;border-bottom: 1px solid black;border-left: 1px solid black;"></q-th>
            <q-th :style="['border: 0px;border-top:1px solid black;border-bottom: 1px solid black;', colspan.MonthToDate.SalesShow ? 'border-left: 0px;' : 'border-left: 1px solid black;']"><q-btn style="float: left;" @click="SalesColumnButtonClick" square color="blue-grey-2" text-color="black" :icon="colspan.MonthToDate.SalesIcon" size="xs" padding="none"><q-badge v-if="!colspan.MonthToDate.SalesShow" color="positive" floating rounded transparent></q-badge></q-btn></q-th>
            <q-th style="border: 0px;border-top:1px solid black;border-bottom: 1px solid black;"></q-th>
            <q-th style="border: 0px;padding: 0px;border-top:1px solid black;border-bottom: 1px solid black;"></q-th>

            <q-th style="border: 0px;border-top:1px solid black;border-bottom: 1px solid black;"><q-btn style="float: left;" @click="ScanGPColumnButtonClick1" square color="blue-grey-2" text-color="black" :icon="colspan.MonthToDate.ScanGPIcon1" size="xs" padding="none"><q-badge v-if="!colspan.MonthToDate.ScanGPShow1" color="positive" floating rounded transparent></q-badge></q-btn></q-th>
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

            <q-th style="border: 0px;min-width: 10px;max-width: 10px; border-top: 0px;border-bottom:0px;background-color: white;"></q-th>

            <q-th v-if="colspan.YearToDate.SalesShow" style="border: 0px;border-top:1px solid black;border-bottom: 1px solid black;border-left: 1px solid black;"></q-th>
            <q-th :style="['border: 0px;border-top:1px solid black;border-bottom: 1px solid black;', colspan.YearToDate.SalesShow ? 'border-left: 0px;' : 'border-left: 1px solid black;']"><q-btn style="float: left;" @click="SalesColumnYearButtonClick" square color="blue-grey-2" text-color="black" :icon="colspan.YearToDate.SalesIcon" size="xs" padding="none"><q-badge v-if="!colspan.YearToDate.SalesShow" color="positive" floating rounded transparent></q-badge></q-btn></q-th>
            <q-th style="border: 0px;border-top:1px solid black;border-bottom: 1px solid black;"></q-th>
            <q-th style="border: 0px;padding: 0px;border-top:1px solid black;border-bottom: 1px solid black;"></q-th>

            <q-th style="border: 0px;border-top:1px solid black;border-bottom: 1px solid black;"><q-btn style="float: left;" @click="ScanGPColumnYearButtonClick1" square color="blue-grey-2" text-color="black" :icon="colspan.YearToDate.ScanGPIcon1" size="xs" padding="none"><q-badge v-if="!colspan.YearToDate.ScanGPShow1" color="positive" floating rounded transparent></q-badge></q-btn></q-th>
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
            <q-th style="border: 0px;border-top:1px solid black;border-bottom: 1px solid black;border-right: 1px solid black;"></q-th>

        </q-tr>

        <q-tr :props="props" style="background-color: #295fbd; color: white;">
            <q-th style="background-color: white;position: sticky; left: 0;background-color:white;z-index: 120;"></q-th>
            <q-th style="border: 0px; background-color: white;position:sticky;left: 20px;z-index:120;"></q-th>
            <q-th style="border: 0px; background-color: white;position:sticky;left: 50px;z-index:120;"></q-th>
            <q-th :colspan="colspan.MonthToDate.MonthToDate">Month-to-Date</q-th>
            <q-th style="border-top:0px;border-bottom:0px;background-color: white;"></q-th>
            <q-th :colspan="colspan.YearToDate.YearToDate" style="border-right: 1px solid black;background-color: #2f3a4d;">Year-to-Date</q-th>
        </q-tr>

        <q-tr :props="props" style="background-color: #a5c6ff; color:black;">
            <q-th style="background-color: white;position: sticky; left: 0;z-index: 120;"></q-th>
            <q-th style="border: 0px;background-color: white;position:sticky;left: 20px;z-index:120;"></q-th>
            <q-th style="border: 0px;background-color: white;position:sticky;left: 50px;z-index:120;"></q-th>
            <q-th :colspan="colspan.MonthToDate.Sales">Sales</q-th>
            <q-th style="padding: 0px;"></q-th>
            <q-th :colspan="colspan.MonthToDate.ScanGP">Scan GP</q-th>
            <q-th style="padding: 0px;"></q-th>
            <q-th :colspan="colspan.MonthToDate.Shrinkage">Shrinkage</q-th>
            <q-th style="padding: 0px;"></q-th>
            <q-th :colspan="colspan.MonthToDate.NetGP">Net GP</q-th>
            <q-th style="padding: 0px;"></q-th>
            <q-th :colspan="colspan.MonthToDate.Stock">Stock </q-th>
            <q-th style="padding: 0px;background-color: white;"></q-th>
           
            <q-th :colspan="colspan.YearToDate.Sales">Sales</q-th>
            <q-th style="padding: 0px;"></q-th>
            <q-th :colspan="colspan.YearToDate.ScanGP">Scan GP</q-th>
            <q-th style="padding: 0px;"></q-th>
            <q-th :colspan="colspan.YearToDate.Shrinkage">Shrinkage</q-th>
            <q-th style="padding: 0px;"></q-th>
            <q-th :colspan="colspan.YearToDate.NetGP">Net GP</q-th>
            <q-th style="padding: 0px;"></q-th>
            <q-th :colspan="colspan.YearToDate.Stock" style="border-right: 1px solid black;">Stock</q-th>
        </q-tr>

        <q-tr :props="props" style="background-color: #e0ebff; color:black;">

            <q-th style="background-color: white;position: sticky; left: 0;background-color:white;z-index: 120;"></q-th>
            <q-th style="min-width: 30px;max-width: 30px;border: 0px;background-color: white;position:sticky;left: 20px;z-index:120;"></q-th>
            <q-th style="min-width: 120px;max-width: 120px;border-top: 1px solid black;background-color: black; color: white;position:sticky;left: 50px;z-index:120;">Division</q-th>

            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;">TY</q-th>
            <q-th v-if="colspan.MonthToDate.SalesShow" style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;">LY</q-th>
            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;">vs LY</q-th>
            <q-th style="padding: 0px;min-width: 5px;max-width: 5px;border-top:1px solid black;border-bottom: 1px solid black;"></q-th>

            <q-th v-if="colspan.MonthToDate.ScanGPShow1" style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;">TY</q-th>
            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;">TY</q-th>
            <q-th v-if="colspan.MonthToDate.ScanGPShow2" style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;">LY</q-th>
            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;">LY</q-th>
            <q-th style="padding: 0px;min-width: 5px;max-width: 5px;border-top:1px solid black;border-bottom: 1px solid black;"></q-th>

            <q-th v-if="colspan.MonthToDate.ShrinkageShow1" style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;">TY</q-th>
            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;">TY</q-th>
            <q-th v-if="colspan.MonthToDate.ShrinkageShow2" style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;">LY</q-th>
            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;">LY</q-th>
            <q-th style="padding: 0px;min-width: 5px;max-width: 5px;border-top:1px solid black;border-bottom: 1px solid black;"></q-th>

            <q-th v-if="colspan.MonthToDate.NetGPShow1" style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;">TY</q-th>
            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;">TY</q-th>
            <q-th v-if="colspan.MonthToDate.NetGPShow2" style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;">LY</q-th>
            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;">LY</q-th>
            <q-th style="padding: 0px;min-width: 5px;max-width: 5px;border-top:1px solid black;border-bottom: 1px solid black;"></q-th>

            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;">TY</q-th>
            <q-th v-if="colspan.MonthToDate.StockShow" style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;">LY</q-th>
            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;">vs LY</q-th>
            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;">TY</q-th>
            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;">LY</q-th>

            <q-th style="min-width: 10px;max-width: 10px; border-top: 0px;border-bottom:0px;background-color: white;"></q-th>

            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;">TY</q-th>
            <q-th v-if="colspan.YearToDate.SalesShow" style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;">LY</q-th>
            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;">vs LY</q-th>
            <q-th style="padding: 0px;min-width: 5px;max-width: 5px;border-top:1px solid black;border-bottom: 1px solid black;"></q-th>

            <q-th v-if="colspan.YearToDate.ScanGPShow1" style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;">TY</q-th>
            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;">TY</q-th>
            <q-th v-if="colspan.YearToDate.ScanGPShow2" style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;">LY</q-th>
            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;">LY</q-th>
            <q-th style="padding: 0px;min-width: 5px;max-width: 5px;border-top:1px solid black;border-bottom: 1px solid black;"></q-th>

            <q-th v-if="colspan.YearToDate.ShrinkageShow1" style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;">TY</q-th>
            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;">TY</q-th>
            <q-th v-if="colspan.YearToDate.ShrinkageShow2" style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;">LY</q-th>
            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;">LY</q-th>
            <q-th style="padding: 0px;min-width: 5px;max-width: 5px;border-top:1px solid black;border-bottom: 1px solid black;"></q-th>

            <q-th v-if="colspan.YearToDate.NetGPShow1" style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;">TY</q-th>
            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;">TY</q-th>
            <q-th v-if="colspan.YearToDate.NetGPShow2" style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;">LY</q-th>
            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;">LY</q-th>
            <q-th style="padding: 0px;min-width: 5px;max-width: 5px;border-top:1px solid black;border-bottom: 1px solid black;"></q-th>

            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;">TY</q-th>
            <q-th v-if="colspan.YearToDate.StockShow" style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;">LY</q-th>
            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;">vs LY</q-th>
            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;">TY</q-th>
            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;border-right: 1px solid black;">LY</q-th>

        </q-tr>

        <q-tr :props="props">
            <q-th style="border: 0px;background-color: white;position: sticky; left: 0;z-index: 100;"></q-th>
            <q-th style="border:0px;background-color:white;position:sticky;left: 20px;z-index:100;"></q-th>
            <q-th style="border: 0px;background-color:white;position:sticky;left: 50px;z-index:100;"></q-th>

            <q-th style="border-bottom: 0px;"><span v-if="amount_type">RM'000</span> <span v-else>RM</span></q-th>
            <q-th v-if="colspan.MonthToDate.SalesShow" style="border-bottom: 0px;"><span v-if="amount_type">RM'000</span> <span v-else>RM</span></q-th>
            <q-th style="border-bottom: 0px;">%</q-th>
            <q-th style="border-bottom: 0px;padding: 0px;"></q-th>

            <q-th v-if="colspan.MonthToDate.ScanGPShow1" style="border-bottom: 0px;"><span v-if="amount_type">RM'000</span> <span v-else>RM</span></q-th>
            <q-th style="border-bottom: 0px;">%</q-th>
            <q-th v-if="colspan.MonthToDate.ScanGPShow2" style="border-bottom: 0px;"><span v-if="amount_type">RM'000</span> <span v-else>RM</span></q-th>
            <q-th style="border-bottom: 0px;">%</q-th>
            <q-th style="border-bottom: 0px;padding: 0px;"></q-th>

            <q-th v-if="colspan.MonthToDate.ShrinkageShow1" style="border-bottom: 0px;"><span v-if="amount_type">RM'000</span> <span v-else>RM</span></q-th>
            <q-th style="border-bottom: 0px;">%</q-th>
            <q-th v-if="colspan.MonthToDate.ShrinkageShow2" style="border-bottom: 0px;"><span v-if="amount_type">RM'000</span> <span v-else>RM</span></q-th>
            <q-th style="border-bottom: 0px;">%</q-th>
            <q-th style="border-bottom: 0px;padding: 0px;"></q-th>

            <q-th v-if="colspan.MonthToDate.NetGPShow1" style="border-bottom: 0px;"><span v-if="amount_type">RM'000</span> <span v-else>RM</span></q-th>
            <q-th style="border-bottom: 0px;">%</q-th>
            <q-th v-if="colspan.MonthToDate.NetGPShow2" style="border-bottom: 0px;"><span v-if="amount_type">RM'000</span> <span v-else>RM</span></q-th>
            <q-th style="border-bottom: 0px;">%</q-th>
            <q-th style="border-bottom: 0px;padding: 0px;"></q-th>

            <q-th style="border-bottom: 0px;"><span v-if="amount_type">RM'000</span> <span v-else>RM</span></q-th>
            <q-th v-if="colspan.MonthToDate.StockShow" style="border-bottom: 0px;"><span v-if="amount_type">RM'000</span> <span v-else>RM</span></q-th>
            <q-th style="border-bottom: 0px;">%</q-th>
            <q-th style="border-bottom: 0px;">Days</q-th>
            <q-th style="border-bottom: 0px;">Days</q-th>

            <q-th style=" border-top: 0px;border-bottom:0px;"></q-th>

            <q-th style="border-bottom: 0px;"><span v-if="amount_type">RM'000</span> <span v-else>RM</span></q-th>
            <q-th v-if="colspan.YearToDate.SalesShow" style="border-bottom: 0px;"><span v-if="amount_type">RM'000</span> <span v-else>RM</span></q-th>
            <q-th style="border-bottom: 0px;">%</q-th>
            <q-th style="border-bottom: 0px;padding: 0px;"></q-th>

            <q-th v-if="colspan.YearToDate.ScanGPShow1" style="border-bottom: 0px;"><span v-if="amount_type">RM'000</span> <span v-else>RM</span></q-th>
            <q-th style="border-bottom: 0px;">%</q-th>
            <q-th v-if="colspan.YearToDate.ScanGPShow2" style="border-bottom: 0px;"><span v-if="amount_type">RM'000</span> <span v-else>RM</span></q-th>
            <q-th style="border-bottom: 0px;">%</q-th>
            <q-th style="border-bottom: 0px;padding: 0px;"></q-th>

            <q-th v-if="colspan.YearToDate.ShrinkageShow1" style="border-bottom: 0px;"><span v-if="amount_type">RM'000</span> <span v-else>RM</span></q-th>
            <q-th style="border-bottom: 0px;">%</q-th>
            <q-th v-if="colspan.YearToDate.ShrinkageShow2" style="border-bottom: 0px;"><span v-if="amount_type">RM'000</span> <span v-else>RM</span></q-th>
            <q-th style="border-bottom: 0px;">%</q-th>
            <q-th style="border-bottom: 0px;padding: 0px;"></q-th>

            <q-th v-if="colspan.YearToDate.NetGPShow1" style="border-bottom: 0px;"><span v-if="amount_type">RM'000</span> <span v-else>RM</span></q-th>
            <q-th style="border-bottom: 0px;">%</q-th>
            <q-th v-if="colspan.YearToDate.NetGPShow2" style="border-bottom: 0px;"><span v-if="amount_type">RM'000</span> <span v-else>RM</span></q-th>
            <q-th style="border-bottom: 0px;">%</q-th>
            <q-th style="border-bottom: 0px;padding: 0px;"></q-th>

            <q-th style="border-bottom: 0px;"><span v-if="amount_type">RM'000</span> <span v-else>RM</span></q-th>
            <q-th v-if="colspan.YearToDate.StockShow" style="border-bottom: 0px;"><span v-if="amount_type">RM'000</span> <span v-else>RM</span></q-th>
            <q-th style="border-bottom: 0px;">%</q-th>
            <q-th style="border-bottom: 0px;">Days</q-th>
            <q-th style="border-right: 1px solid black;border-bottom: 0px;">Days</q-th>

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
            <!-- <template v-for="row_index in 10" :key="row_index">
                <q-tr :props="props">

                    <q-td>Div</q-td>
                    <q-td>Division</q-td>

                    <template v-for="index in 20" :key="index">
                        <q-td>a</q-td>
                    </template>
                    
                    <q-td style="border-top: 0px;border-bottom:0px;"></q-td>

                    <template v-for="index in 20" :key="index">
                        <q-td>a</q-td>
                    </template>
                </q-tr>
            </template> -->

<!--add in-->
            <template v-for="(division_details, index) in json_data.Division" :key="division_details">
                
                <template v-for="child_details in division_details.Child" :key="child_details">
<!-- added checking need chiaw rui to remove-->
                    <q-tr v-if="child_details.Details_month_to_date.Sales" :props="props" :style="[child_details.Custom == 1 ? 'background-color: #e9e9e9;' : (child_details.Custom == 0 ? 'background-color: #c9c9c9;' : '') ]">
                        
                        <q-td style="background-color: white;position: sticky; left: 0;z-index: 100;">{{child_details.code}}</q-td>
                        <q-td style="border: 0px;background-color: white;position:sticky;left: 20px;z-index:100;"></q-td>
                        <q-td :style="[child_details ? (child_details.Custom == 1 ? 'text-align:center;font-style: italic;' : 'padding-left:15px;font-style: italic;') : '','border: 0px;','position:sticky;left: 50px;z-index:100;']">{{child_details.Title}}</q-td>
                        
                        <template v-if="child_details.Details_month_to_date.Sales">
                        <q-td style="font-style: Italic;" :class="[child_details.Details_month_to_date.Sales ? (child_details.Details_month_to_date.Sales.Sales_TY_amount < 0 ? 'negative_value' : '') : '']">{{formatAmount(child_details.Details_month_to_date.Sales.Sales_TY_amount,'$')}}</q-td>
                        <q-td v-if="colspan.MonthToDate.SalesShow" style="font-style: Italic;" :class="[child_details.Details_month_to_date.Sales ? (child_details.Details_month_to_date.Sales.Sales_LY_amount < 0 ? 'negative_value' : '') : '']">{{formatAmount(child_details.Details_month_to_date.Sales.Sales_LY_amount,'$')}}</q-td>
                        <q-td style="font-style: Italic;" :class="[child_details.Details_month_to_date.Sales ? (child_details.Details_month_to_date.Sales.Sales_vsLY_percent < 0 ? 'negative_value' : '') : '']">{{formatAmount(child_details.Details_month_to_date.Sales.Sales_vsLY_percent,'$')}}%</q-td>
                        <q-td style="background-color: white;padding: 0px;"></q-td>
                        </template>

                        <template v-if="child_details.Details_month_to_date.Scan_GP">
                            <q-td v-if="colspan.MonthToDate.ScanGPShow1" style="font-style: Italic;" :class="[child_details.Details_month_to_date.Scan_GP ? (child_details.Details_month_to_date.Scan_GP.Scan_GP_TY_amount < 0 ? 'negative_value' : '') : '']">{{formatAmount(child_details.Details_month_to_date.Scan_GP.Scan_GP_TY_amount,'$')}}</q-td>
                            <q-td style="font-style: Italic;" :class="[child_details.Details_month_to_date.Scan_GP ? (child_details.Details_month_to_date.Scan_GP.Scan_GP_TY_percent < 0 ? 'negative_value' : '') : '']">{{formatAmount(child_details.Details_month_to_date.Scan_GP.Scan_GP_TY_percent,'%')}}%</q-td>
                            <q-td v-if="colspan.MonthToDate.ScanGPShow2" style="font-style: Italic;" :class="[child_details.Details_month_to_date.Scan_GP ? (child_details.Details_month_to_date.Scan_GP.Scan_GP_LY_amount < 0 ? 'negative_value' : '') : '']">{{formatAmount(child_details.Details_month_to_date.Scan_GP.Scan_GP_LY_amount,'$')}}</q-td>
                            <q-td style="font-style: Italic;" :class="[child_details.Details_month_to_date.Scan_GP ? (child_details.Details_month_to_date.Scan_GP.Scan_GP_LY_percent < 0 ? 'negative_value' : '') : '']">{{formatAmount(child_details.Details_month_to_date.Scan_GP.Scan_GP_LY_percent,'%')}}%</q-td>
                            <q-td style="background-color: white;padding: 0px;"></q-td>
                        </template>

                        <template v-if="child_details.Details_month_to_date.Shrinkage">
                            <q-td v-if="colspan.MonthToDate.ShrinkageShow1" style="font-style: Italic;" :class="[child_details.Details_month_to_date.Shrinkage ? (child_details.Details_month_to_date.Shrinkage.Shrinkage_TY_amount < 0 ? 'negative_value' : '') : '']">{{formatAmount(child_details.Details_month_to_date.Shrinkage.Shrinkage_TY_amount,'$')}}</q-td>
                            <q-td style="font-style: Italic;" :class="[child_details.Details_month_to_date.Shrinkage ? (child_details.Details_month_to_date.Shrinkage.Shrinkage_TY_percent < 0 ? 'negative_value' : '') : '']">{{formatAmount(child_details.Details_month_to_date.Shrinkage.Shrinkage_TY_percent,'%')}}%</q-td>
                            <q-td v-if="colspan.MonthToDate.ShrinkageShow2" style="font-style: Italic;" :class="[child_details.Details_month_to_date.Shrinkage ? (child_details.Details_month_to_date.Shrinkage.Shrinkage_LY_amount < 0 ? 'negative_value' : '') : '']">{{formatAmount(child_details.Details_month_to_date.Shrinkage.Shrinkage_LY_amount,'$')}}</q-td>
                            <q-td style="font-style: Italic;" :class="[child_details.Details_month_to_date.Shrinkage ? (child_details.Details_month_to_date.Shrinkage.Shrinkage_LY_percent < 0 ? 'negative_value' : '') : '']">{{formatAmount(child_details.Details_month_to_date.Shrinkage.Shrinkage_LY_percent,'%')}}%</q-td>
                            <q-td style="background-color: white;padding: 0px;"></q-td>
                        </template>

                        <template v-if="child_details.Details_month_to_date.Net_GP">
                            <q-td v-if="colspan.MonthToDate.NetGPShow1" style="font-style: Italic;" :class="[child_details.Details_month_to_date.Net_GP ? (child_details.Details_month_to_date.Net_GP.Net_GP_TY_amount < 0 ? 'negative_value' : '') : '']">{{formatAmount(child_details.Details_month_to_date.Net_GP.Net_GP_TY_amount,'$')}}</q-td>
                            <q-td style="font-style: Italic;" :class="[child_details.Details_month_to_date.Net_GP ? (child_details.Details_month_to_date.Net_GP.Net_GP_TY_percent < 0 ? 'negative_value' : '') : '']">{{formatAmount(child_details.Details_month_to_date.Net_GP.Net_GP_TY_percent,'%')}}%</q-td>
                            <q-td v-if="colspan.MonthToDate.NetGPShow2" style="font-style: Italic;" :class="[child_details.Details_month_to_date.Net_GP ? (child_details.Details_month_to_date.Net_GP.Net_GP_LY_amount < 0 ? 'negative_value' : '') : '']">{{formatAmount(child_details.Details_month_to_date.Net_GP.Net_GP_LY_amount,'$')}}</q-td>
                            <q-td style="font-style: Italic;" :class="[child_details.Details_month_to_date.Net_GP ? (child_details.Details_month_to_date.Net_GP.Net_GP_LY_percent < 0 ? 'negative_value' : '') : '']">{{formatAmount(child_details.Details_month_to_date.Net_GP.Net_GP_LY_percent,'%')}}%</q-td>
                            <q-td style="background-color: white;padding: 0px;"></q-td>
                        </template>

                        <template v-if="child_details.Details_month_to_date.Stock">
                            <q-td style="font-style: Italic;" :class="[child_details.Details_month_to_date.Stock ? (child_details.Details_month_to_date.Stock.Stock_TY_amount < 0 ? 'negative_value' : '') : '']">{{formatAmount(child_details.Details_month_to_date.Stock.Stock_TY_amount,'$')}}</q-td>
                            <q-td v-if="colspan.MonthToDate.StockShow" style="font-style: Italic;" :class="[child_details.Details_month_to_date.Stock ? (child_details.Details_month_to_date.Stock.Stock_LY_amount < 0 ? 'negative_value' : '') : '']">{{formatAmount(child_details.Details_month_to_date.Stock.Stock_LY_amount,'$')}}</q-td>
                            <q-td style="font-style: Italic;" :class="[child_details.Details_month_to_date.Stock ? (child_details.Details_month_to_date.Stock.Stock_vsLY_percent < 0 ? 'negative_value' : '') : '']">{{formatAmount(child_details.Details_month_to_date.Stock.Stock_vsLY_percent,'%')}}%</q-td>
                            <q-td style="font-style: Italic;" :class="[child_details.Details_month_to_date.Stock ? (child_details.Details_month_to_date.Stock.Stock_TY_days < 0 ? 'negative_value' : '') : '']">{{formatAmount(child_details.Details_month_to_date.Stock.Stock_TY_days,'$')}}</q-td>
                            <q-td style="font-style: Italic;" :class="[child_details.Details_month_to_date.Stock ? (child_details.Details_month_to_date.Stock.Stock_LY_days < 0 ? 'negative_value' : '') : '']">{{formatAmount(child_details.Details_month_to_date.Stock.Stock_LY_days,'$')}}</q-td>
                        </template>

                        <q-td style="border-top: 0px;border-bottom:0px;background-color: white;"></q-td>
                        
                        <template v-if="child_details.Details_year_to_date.Sales">
                            <q-td style="font-style: Italic;" :class="[child_details.Details_month_to_date.Sales ? (child_details.Details_year_to_date.Sales.Sales_TY_amount < 0 ? 'negative_value' : '') : '']">{{formatAmount(child_details.Details_year_to_date.Sales.Sales_TY_amount,'$')}}</q-td>
                            <q-td v-if="colspan.YearToDate.SalesShow" style="font-style: Italic;" :class="[child_details.Details_year_to_date.Sales ? (child_details.Details_year_to_date.Sales.Sales_LY_amount < 0 ? 'negative_value' : '') : '']">{{formatAmount(child_details.Details_year_to_date.Sales.Sales_LY_amount,'$')}}</q-td>
                            <q-td style="font-style: Italic;" :class="[child_details.Details_year_to_date.Sales ? (child_details.Details_year_to_date.Sales.Sales_vsLY_percent < 0 ? 'negative_value' : '') : '']">{{formatAmount(child_details.Details_year_to_date.Sales.Sales_vsLY_percent,'%')}}%</q-td>
                            <q-td style="background-color: white;padding: 0px;"></q-td>
                        </template>
<!-- until here-->
                        <template v-if="child_details.Details_year_to_date.Scan_GP">
                            <q-td v-if="colspan.YearToDate.ScanGPShow1" style="font-style: Italic;" :class=" [child_details.Details_year_to_date.Scan_GP ? (child_details.Details_year_to_date.Scan_GP.Scan_GP_TY_amount < 0 ? 'negative_value' : '' ) : '']">{{formatAmount(child_details.Details_year_to_date.Scan_GP.Scan_GP_TY_amount,'$')}}</q-td>
                            <q-td style="font-style: Italic;" :class=" [child_details.Details_year_to_date.Scan_GP ? (child_details.Details_year_to_date.Scan_GP.Scan_GP_TY_percent < 0 ? 'negative_value' : '' ) : '']">{{formatAmount(child_details.Details_year_to_date.Scan_GP.Scan_GP_TY_percent,'%')}}%</q-td>
                            <q-td v-if="colspan.YearToDate.ScanGPShow2" style="font-style: Italic;" :class=" [child_details.Details_year_to_date.Scan_GP ? (child_details.Details_year_to_date.Scan_GP.Scan_GP_LY_amount < 0 ? 'negative_value' : '' ) : '']">{{formatAmount(child_details.Details_year_to_date.Scan_GP.Scan_GP_LY_amount,'$')}}</q-td>
                            <q-td style="font-style: Italic;" :class=" [child_details.Details_year_to_date.Scan_GP ? (child_details.Details_year_to_date.Scan_GP.Scan_GP_LY_percent < 0 ? 'negative_value' : '' ) : '']">{{formatAmount(child_details.Details_year_to_date.Scan_GP.Scan_GP_LY_percent,'%')}}%</q-td>
                            <q-td style="background-color: white;padding: 0px;"></q-td>
                        </template>

                        <template v-if="child_details.Details_year_to_date.Shrinkage">
                            <q-td v-if="colspan.YearToDate.ShrinkageShow1" style="font-style: Italic;" :class="[child_details.Details_year_to_date.Shrinkage ? (child_details.Details_year_to_date.Shrinkage.Shrinkage_TY_amount < 0 ? 'negative_value' : '') : '']">{{formatAmount(child_details.Details_year_to_date.Shrinkage.Shrinkage_TY_amount,'$')}}</q-td>
                            <q-td style="font-style: Italic;" :class="[child_details.Details_year_to_date.Shrinkage ? (child_details.Details_year_to_date.Shrinkage.Shrinkage_TY_percent < 0 ? 'negative_value' : '') : '']">{{formatAmount(child_details.Details_year_to_date.Shrinkage.Shrinkage_TY_percent,'%')}}%</q-td>
                            <q-td v-if="colspan.YearToDate.ShrinkageShow2" style="font-style: Italic;" :class="[child_details.Details_year_to_date.Shrinkage ? (child_details.Details_year_to_date.Shrinkage.Shrinkage_LY_amount < 0 ? 'negative_value' : '') : '']">{{formatAmount(child_details.Details_year_to_date.Shrinkage.Shrinkage_LY_amount,'$')}}</q-td>
                            <q-td style="font-style: Italic;" :class="[child_details.Details_year_to_date.Shrinkage ? (child_details.Details_year_to_date.Shrinkage.Shrinkage_LY_percent < 0 ? 'negative_value' : '') : '']">{{formatAmount(child_details.Details_year_to_date.Shrinkage.Shrinkage_LY_percent,'%')}}%</q-td>
                            <q-td style="background-color: white;padding: 0px;"></q-td>
                        </template>

                        <template v-if="child_details.Details_year_to_date.Net_GP">
                            <q-td v-if="colspan.YearToDate.NetGPShow1" style="font-style: Italic;" :class="[child_details.Details_year_to_date.Net_GP ? (child_details.Details_year_to_date.Net_GP.Net_GP_TY_amount < 0 ? 'negative_value' : '') : '']">{{formatAmount(child_details.Details_year_to_date.Net_GP.Net_GP_TY_amount,'$')}}</q-td>
                            <q-td style="font-style: Italic;" :class="[child_details.Details_year_to_date.Net_GP ? (child_details.Details_year_to_date.Net_GP.Net_GP_TY_percent < 0 ? 'negative_value' : '') : '']">{{formatAmount(child_details.Details_year_to_date.Net_GP.Net_GP_TY_percent,'%')}}%</q-td>
                            <q-td v-if="colspan.YearToDate.NetGPShow2" style="font-style: Italic;" :class="[child_details.Details_year_to_date.Net_GP ? (child_details.Details_year_to_date.Net_GP.Net_GP_LY_amount < 0 ? 'negative_value' : '') : '']">{{formatAmount(child_details.Details_year_to_date.Net_GP.Net_GP_LY_amount,'$')}}</q-td>
                            <q-td style="font-style: Italic;" :class="[child_details.Details_year_to_date.Net_GP ? (child_details.Details_year_to_date.Net_GP.Net_GP_LY_percent < 0 ? 'negative_value' : '') : '']">{{formatAmount(child_details.Details_year_to_date.Net_GP.Net_GP_LY_percent,'%')}}%</q-td>
                            <q-td style="background-color: white;padding: 0px;"></q-td>
                        </template>

                        <template v-if="child_details.Details_year_to_date.Stock">
                            <q-td style="font-style: Italic;" :class="[child_details.Details_year_to_date.Stock ? (child_details.Details_year_to_date.Stock.Stock_TY_amount < 0 ? 'negative_value' : '') : '']">{{formatAmount(child_details.Details_year_to_date.Stock.Stock_TY_amount,'$')}}</q-td>
                            <q-td v-if="colspan.YearToDate.StockShow" style="font-style: Italic;" :class="[child_details.Details_year_to_date.Stock ? (child_details.Details_year_to_date.Stock.Stock_LY_amount < 0 ? 'negative_value' : '') : '']">{{formatAmount(child_details.Details_year_to_date.Stock.Stock_LY_amount,'$')}}</q-td>
                            <q-td style="font-style: Italic;" :class="[child_details.Details_year_to_date.Stock ? (child_details.Details_year_to_date.Stock.Stock_vsLY_percent < 0 ? 'negative_value' : '') : '']">{{formatAmount(child_details.Details_year_to_date.Stock.Stock_vsLY_percent,'%')}}%</q-td>
                            <q-td style="font-style: Italic;" :class="[child_details.Details_year_to_date.Stock ? (child_details.Details_year_to_date.Stock.Stock_TY_days < 0 ? 'negative_value' : '') : '']">{{formatAmount(child_details.Details_year_to_date.Stock.Stock_TY_days,'$')}}</q-td>
                            <q-td style="font-style: Italic;border-right: 1px solid black;" :class="[child_details.Details_year_to_date.Stock ? (child_details.Details_year_to_date.Stock.Stock_LY_days < 0 ? 'negative_value' : '') : '']">{{formatAmount(child_details.Details_year_to_date.Stock.Stock_LY_days,'$')}}</q-td>
                        </template>
                    </q-tr>
                </template>

                <q-tr :props="props">
                    <q-td style="background-color: white;position: sticky; left: 0;z-index: 100;">{{division_details.code}}</q-td>
                    <q-td style="border: 0px;background-color:white;position:sticky;left: 20px;z-index:100;"></q-td>
                    <q-td :style="[ index == 0 ? '' : '','font-weight: bold;border: 0px;','background-color:white;position:sticky;left: 50px;z-index:100;']">{{division_details.Title}}</q-td>
                    
                    <template v-if="division_details.Details_month_to_date.Sales">
                        <q-td style="font-weight: bold; font-style: italic;" :class="[division_details.Details_month_to_date.Sales.Sales_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_month_to_date.Sales.Sales_TY_amount,'$')}}</q-td>
                        <q-td v-if="colspan.MonthToDate.SalesShow" style="font-weight: bold;" :class="[division_details.Details_month_to_date.Sales.Sales_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_month_to_date.Sales.Sales_LY_amount,'$')}}</q-td>
                        <q-td style="font-weight: bold; font-style: italic;" :class="[division_details.Details_month_to_date.Sales.Sales_vsLY_percent < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_month_to_date.Sales.Sales_vsLY_percent,'%')}}%</q-td>
                        <q-td style="background-color: white;padding: 0px;"></q-td>
                    </template>

                    <template v-if="division_details.Details_month_to_date.Scan_GP">
                        <q-td v-if="colspan.MonthToDate.ScanGPShow1" style="font-weight: bold;" :class="[division_details.Details_month_to_date.Scan_GP.Scan_GP_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_month_to_date.Scan_GP.Scan_GP_TY_amount,'$')}}</q-td>
                        <q-td style="font-weight: bold; font-style: italic;" :class="[division_details.Details_month_to_date.Scan_GP.Scan_GP_TY_percent < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_month_to_date.Scan_GP.Scan_GP_TY_percent,'%')}}%</q-td>
                        <q-td v-if="colspan.MonthToDate.ScanGPShow2" style="font-weight: bold;" :class="[division_details.Details_month_to_date.Scan_GP.Scan_GP_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_month_to_date.Scan_GP.Scan_GP_LY_amount,'$')}}</q-td>
                        <q-td style="font-weight: bold; font-style: italic;" :class="[division_details.Details_month_to_date.Scan_GP.Scan_GP_LY_percent < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_month_to_date.Scan_GP.Scan_GP_LY_percent,'%')}}%</q-td>
                        <q-td style="background-color: white;padding: 0px;"></q-td>
                    </template>

                    <template v-if="division_details.Details_month_to_date.Shrinkage">
                        <q-td v-if="colspan.MonthToDate.ShrinkageShow1" style="font-weight: bold;" :class="[division_details.Details_month_to_date.Shrinkage.Shrinkage_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_month_to_date.Shrinkage.Shrinkage_TY_amount,'$')}}</q-td>
                        <q-td style="font-weight: bold; font-style: italic;" :class="[division_details.Details_month_to_date.Shrinkage.Shrinkage_TY_percent < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_month_to_date.Shrinkage.Shrinkage_TY_percent,'%')}}%</q-td>
                        <q-td v-if="colspan.MonthToDate.ShrinkageShow2" style="font-weight: bold;" :class="[division_details.Details_month_to_date.Shrinkage.Shrinkage_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_month_to_date.Shrinkage.Shrinkage_LY_amount,'$')}}</q-td>
                        <q-td style="font-weight: bold; font-style: italic;" :class="[division_details.Details_month_to_date.Shrinkage.Shrinkage_LY_percent < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_month_to_date.Shrinkage.Shrinkage_LY_percent,'%')}}%</q-td>
                        <q-td style="background-color: white;padding: 0px;"></q-td>
                    </template>

                    <template v-if="division_details.Details_month_to_date.Net_GP">
                        <q-td v-if="colspan.MonthToDate.NetGPShow1" style="font-weight: bold;" :class="[division_details.Details_month_to_date.Net_GP.Net_GP_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_month_to_date.Net_GP.Net_GP_TY_amount,'$')}}</q-td>
                        <q-td style="font-weight: bold; font-style: italic;" :class="[division_details.Details_month_to_date.Net_GP.Net_GP_TY_percent < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_month_to_date.Net_GP.Net_GP_TY_percent,'%')}}%</q-td>
                        <q-td v-if="colspan.MonthToDate.NetGPShow2" style="font-weight: bold;" :class="[division_details.Details_month_to_date.Net_GP.Net_GP_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_month_to_date.Net_GP.Net_GP_LY_amount,'$')}}</q-td>
                        <q-td style="font-weight: bold; font-style: italic;" :class="[division_details.Details_month_to_date.Net_GP.Net_GP_LY_percent < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_month_to_date.Net_GP.Net_GP_LY_percent,'%')}}%</q-td>
                        <q-td style="background-color: white;padding: 0px;"></q-td>
                    </template>

                    <template v-if="division_details.Details_month_to_date.Stock">
                        <q-td style="font-weight: bold;" :class="[division_details.Details_month_to_date.Stock.Stock_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_month_to_date.Stock.Stock_TY_amount,'$')}}</q-td>
                        <q-td v-if="colspan.MonthToDate.StockShow" style="font-weight: bold;" :class="[division_details.Details_month_to_date.Stock.Stock_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_month_to_date.Stock.Stock_LY_amount,'$')}}</q-td>
                        <q-td style="font-weight: bold; font-style: italic;" :class="[division_details.Details_month_to_date.Stock.Stock_vsLY_percent < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_month_to_date.Stock.Stock_vsLY_percent,'%')}}%</q-td>
                        <q-td style="font-weight: bold;" :class="[division_details.Details_month_to_date.Stock.Stock_TY_days < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_month_to_date.Stock.Stock_TY_days,'$')}}</q-td>
                        <q-td style="font-weight: bold;" :class="[division_details.Details_month_to_date.Stock.Stock_LY_days < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_month_to_date.Stock.Stock_LY_days,'$')}}</q-td>
                    </template>

                    <q-td style="border-top: 0px;border-bottom:0px;"></q-td>

                    <template v-if="division_details.Details_year_to_date.Sales">
                        <q-td style="font-weight: bold;" :class="[division_details.Details_year_to_date.Sales.Sales_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_year_to_date.Sales.Sales_TY_amount,'$')}}</q-td>
                        <q-td v-if="colspan.YearToDate.SalesShow" style="font-weight: bold;" :class="[division_details.Details_year_to_date.Sales.Sales_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_year_to_date.Sales.Sales_LY_amount,'$')}}</q-td>
                        <q-td style="font-weight: bold;" :class="[division_details.Details_year_to_date.Sales.Sales_vsLY_percent < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_year_to_date.Sales.Sales_vsLY_percent,'%')}}%</q-td>
                        <q-td style="background-color: white;padding: 0px;"></q-td>
                    </template>

                    <template v-if="division_details.Details_year_to_date.Scan_GP">
                        <q-td v-if="colspan.YearToDate.ScanGPShow1" style="font-weight: bold;" :class="[division_details.Details_year_to_date.Scan_GP.Scan_GP_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_year_to_date.Scan_GP.Scan_GP_TY_amount,'$')}}</q-td>
                        <q-td style="font-weight: bold; font-style: italic;" :class="[division_details.Details_year_to_date.Scan_GP.Scan_GP_TY_percent < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_year_to_date.Scan_GP.Scan_GP_TY_percent,'%')}}%</q-td>
                        <q-td v-if="colspan.YearToDate.ScanGPShow2" style="font-weight: bold;" :class="[division_details.Details_year_to_date.Scan_GP.Scan_GP_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_year_to_date.Scan_GP.Scan_GP_LY_amount,'$')}}</q-td>
                        <q-td style="font-weight: bold; font-style: italic;" :class="[division_details.Details_year_to_date.Scan_GP.Scan_GP_LY_percent < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_year_to_date.Scan_GP.Scan_GP_LY_percent,'%')}}%</q-td>
                        <q-td style="background-color: white;padding: 0px;"></q-td>
                    </template>

                    <template v-if="division_details.Details_year_to_date.Shrinkage">
                        <q-td v-if="colspan.YearToDate.ShrinkageShow1" style="font-weight: bold;" :class="[division_details.Details_year_to_date.Shrinkage.Shrinkage_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_year_to_date.Shrinkage.Shrinkage_TY_amount,'$')}}</q-td>
                        <q-td style="font-weight: bold; font-style: italic;" :class="[division_details.Details_year_to_date.Shrinkage.Shrinkage_TY_percent < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_year_to_date.Shrinkage.Shrinkage_TY_percent,'%')}}%</q-td>
                        <q-td v-if="colspan.YearToDate.ShrinkageShow2" style="font-weight: bold;" :class="[division_details.Details_year_to_date.Shrinkage.Shrinkage_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_year_to_date.Shrinkage.Shrinkage_LY_amount,'$')}}</q-td>
                        <q-td style="font-weight: bold; font-style: italic;" :class="[division_details.Details_year_to_date.Shrinkage.Shrinkage_LY_percent < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_year_to_date.Shrinkage.Shrinkage_LY_percent,'%')}}%</q-td>
                        <q-td style="background-color: white;padding: 0px;"></q-td>
                    </template>

                    <template v-if="division_details.Details_year_to_date.Net_GP">
                        <q-td v-if="colspan.YearToDate.NetGPShow1" style="font-weight: bold;" :class="[division_details.Details_year_to_date.Net_GP.Net_GP_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_year_to_date.Net_GP.Net_GP_TY_amount,'$')}}</q-td>
                        <q-td style="font-weight: bold; font-style: italic;" :class="[division_details.Details_year_to_date.Net_GP.Net_GP_TY_percent < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_year_to_date.Net_GP.Net_GP_TY_percent,'%')}}%</q-td>
                        <q-td v-if="colspan.YearToDate.NetGPShow2" style="font-weight: bold;" :class="[division_details.Details_year_to_date.Net_GP.Net_GP_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_year_to_date.Net_GP.Net_GP_LY_amount,'$')}}</q-td>
                        <q-td style="font-weight: bold; font-style: italic;" :class="[division_details.Details_year_to_date.Net_GP.Net_GP_LY_percent < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_year_to_date.Net_GP.Net_GP_LY_percent,'%')}}%</q-td>
                        <q-td style="background-color: white;padding: 0px;"></q-td>
                    </template>

                    <template v-if="division_details.Details_year_to_date.Stock">
                        <q-td style="font-weight: bold;" :class="[division_details.Details_year_to_date.Stock.Stock_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_year_to_date.Stock.Stock_TY_amount,'$')}}</q-td>
                        <q-td v-if="colspan.YearToDate.StockShow" style="font-weight: bold;" :class="[division_details.Details_year_to_date.Stock.Stock_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_year_to_date.Stock.Stock_LY_amount,'$')}}</q-td>
                        <q-td style="font-weight: bold; font-style: italic;" :class="[division_details.Details_year_to_date.Stock.Stock_vsLY_percent < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_year_to_date.Stock.Stock_vsLY_percent,'%')}}%</q-td>
                        <q-td style="font-weight: bold;" :class="[division_details.Details_year_to_date.Stock.Stock_TY_days < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_year_to_date.Stock.Stock_TY_days,'$')}}</q-td>
                        <q-td style="font-weight: bold;border-right: 1px solid black;" :class="[division_details.Details_year_to_date.Stock.Stock_LY_days < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Details_year_to_date.Stock.Stock_LY_days,'$')}}</q-td>
                    </template>

                </q-tr>
                
            </template>
            
            
            <!-- <template v-for="(division_total_details, division_index) in json_data.Division_Total" :key="division_total_details">
                <q-tr :props="props">

                    <q-td style="background-color: white;position: sticky; left: 0;;z-index: 100;"></q-td>
                    <q-td style="border: 0px;background-color:white;position:sticky;left: 20px;z-index:100;"></q-td>
                    <q-td style="font-weight: bold;text-align: center;font-size: 13px;border: 0px;background-color:white;position:sticky;left: 50px;z-index:100;">TOTAL {{division_total_details.Details_month_to_date.Sales.Sales_TY_amount}}</q-td>

                    <q-td style="font-style: Italic;border-bottom: 1px solid black;border-top: 1px solid black;" :class="[division_total_details.Details_month_to_date.Sales.Sales_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_total_details.Details_month_to_date.Sales.Sales_TY_amount,'$')}}</q-td>
                    <q-td v-if="colspan.MonthToDate.SalesShow" style="font-style: Italic;border-bottom: 1px solid black;border-top: 1px solid black;" :class="[division_total_details.Details_month_to_date.Sales.Sales_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_total_details.Details_month_to_date.Sales.Sales_LY_amount,'$')}}</q-td>
                    <q-td style="font-style: Italic;border-bottom: 1px solid black;border-top: 1px solid black;" :class="[division_total_details.Details_month_to_date.Sales.Sales_vsLY_percent < 0 ? 'negative_value' : '']">{{division_total_details.Details_month_to_date.Sales.Sales_vsLY_percent}}%</q-td>
                    <q-td style="background-color: white;padding: 0px;"></q-td>

                    <q-td v-if="colspan.MonthToDate.ScanGPShow1" style="font-style: Italic;border-bottom: 1px solid black;border-top: 1px solid black;" :class="[division_total_details.Details_month_to_date.Scan_GP.Scan_GP_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_total_details.Details_month_to_date.Scan_GP.Scan_GP_TY_amount,'$')}}</q-td>
                    <q-td style="font-style: Italic;border-bottom: 1px solid black;border-top: 1px solid black;" :class="[division_total_details.Details_month_to_date.Scan_GP.Scan_GP_TY_percent < 0 ? 'negative_value' : '']">{{division_total_details.Details_month_to_date.Scan_GP.Scan_GP_TY_percent}}%</q-td>
                    <q-td v-if="colspan.MonthToDate.ScanGPShow2" style="font-style: Italic;border-bottom: 1px solid black;border-top: 1px solid black;" :class="[division_total_details.Details_month_to_date.Scan_GP.Scan_GP_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_total_details.Details_month_to_date.Scan_GP.Scan_GP_LY_amount,'$')}}</q-td>
                    <q-td style="font-style: Italic;border-bottom: 1px solid black;border-top: 1px solid black;" :class="[division_total_details.Details_month_to_date.Scan_GP.Scan_GP_LY_percent < 0 ? 'negative_value' : '']">{{division_total_details.Details_month_to_date.Scan_GP.Scan_GP_LY_percent}}%</q-td>
                    <q-td style="background-color: white;padding: 0px;"></q-td>

                    <q-td v-if="colspan.MonthToDate.ShrinkageShow1" style="font-style: Italic;border-bottom: 1px solid black;border-top: 1px solid black;" :class="[division_total_details.Details_month_to_date.Shrinkage.Shrinkage_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_total_details.Details_month_to_date.Shrinkage.Shrinkage_TY_amount,'$')}}</q-td>
                    <q-td style="font-style: Italic;border-bottom: 1px solid black;border-top: 1px solid black;" :class="[division_total_details.Details_month_to_date.Shrinkage.Shrinkage_TY_percent < 0 ? 'negative_value' : '']">{{division_total_details.Details_month_to_date.Shrinkage.Shrinkage_TY_percent}}%</q-td>
                    <q-td v-if="colspan.MonthToDate.ShrinkageShow2" style="font-style: Italic;border-bottom: 1px solid black;border-top: 1px solid black;" :class="[division_total_details.Details_month_to_date.Shrinkage.Shrinkage_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_total_details.Details_month_to_date.Shrinkage.Shrinkage_LY_amount,'$')}}</q-td>
                    <q-td style="font-style: Italic;border-bottom: 1px solid black;border-top: 1px solid black;" :class="[division_total_details.Details_month_to_date.Shrinkage.Shrinkage_LY_percent < 0 ? 'negative_value' : '']">{{division_total_details.Details_month_to_date.Shrinkage.Shrinkage_LY_percent}}%</q-td>
                    <q-td style="background-color: white;padding: 0px;"></q-td>

                    <q-td v-if="colspan.MonthToDate.NetGPShow1" style="font-style: Italic;border-bottom: 1px solid black;border-top: 1px solid black;" :class="[division_total_details.Details_month_to_date.Net_GP.Net_GP_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_total_details.Details_month_to_date.Net_GP.Net_GP_TY_amount,'$')}}</q-td>
                    <q-td style="font-style: Italic;border-bottom: 1px solid black;border-top: 1px solid black;" :class="[division_total_details.Details_month_to_date.Net_GP.Net_GP_TY_percent < 0 ? 'negative_value' : '']">{{division_total_details.Details_month_to_date.Net_GP.Net_GP_TY_percent}}%</q-td>
                    <q-td v-if="colspan.MonthToDate.NetGPShow2" style="font-style: Italic;border-bottom: 1px solid black;border-top: 1px solid black;" :class="[division_total_details.Details_month_to_date.Net_GP.Net_GP_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_total_details.Details_month_to_date.Net_GP.Net_GP_LY_amount,'$')}}</q-td>
                    <q-td style="font-style: Italic;border-bottom: 1px solid black;border-top: 1px solid black;" :class="[division_total_details.Details_month_to_date.Net_GP.Net_GP_LY_percent < 0 ? 'negative_value' : '']">{{division_total_details.Details_month_to_date.Net_GP.Net_GP_LY_percent}}%</q-td>
                    <q-td style="background-color: white;padding: 0px;"></q-td>

                    <q-td style="font-style: Italic;border-bottom: 1px solid black;border-top: 1px solid black;" :class="[division_total_details.Details_month_to_date.Stock.Stock_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_total_details.Details_month_to_date.Stock.Stock_TY_amount,'$')}}</q-td>
                    <q-td v-if="colspan.MonthToDate.StockShow" style="font-style: Italic;border-bottom: 1px solid black;border-top: 1px solid black;" :class="[division_total_details.Details_month_to_date.Stock.Stock_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_total_details.Details_month_to_date.Stock.Stock_LY_amount,'$')}}</q-td>
                    <q-td style="font-style: Italic;border-bottom: 1px solid black;border-top: 1px solid black;" :class="[division_total_details.Details_month_to_date.Stock.Stock_vsLY_percent < 0 ? 'negative_value' : '']">{{division_total_details.Details_month_to_date.Stock.Stock_vsLY_percent}}%</q-td>
                    <q-td style="font-style: Italic;border-bottom: 1px solid black;border-top: 1px solid black;" :class="[division_total_details.Details_month_to_date.Stock.Stock_TY_days < 0 ? 'negative_value' : '']">{{formatAmount(division_total_details.Details_month_to_date.Stock.Stock_TY_days,'$')}}</q-td>
                    <q-td style="font-style: Italic;border-bottom: 1px solid black;border-top: 1px solid black;" :class="[division_total_details.Details_month_to_date.Stock.Stock_LY_days < 0 ? 'negative_value' : '']">{{formatAmount(division_total_details.Details_month_to_date.Stock.Stock_LY_days,'$')}}</q-td>

                    <q-td style="border-top: 0px;border-bottom:0px;"></q-td>

                    <q-td style="font-style: Italic;border-bottom: 1px solid black;border-top: 1px solid black;" :class="[division_total_details.Details_year_to_date.Sales.Sales_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_total_details.Details_year_to_date.Sales.Sales_TY_amount,'$')}}</q-td>
                    <q-td v-if="colspan.YearToDate.SalesShow" style="font-style: Italic;border-bottom: 1px solid black;border-top: 1px solid black;" :class="[division_total_details.Details_year_to_date.Sales.Sales_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_total_details.Details_year_to_date.Sales.Sales_LY_amount,'$')}}</q-td>
                    <q-td style="font-style: Italic;border-bottom: 1px solid black;border-top: 1px solid black;" :class="[division_total_details.Details_year_to_date.Sales.Sales_vsLY_percent < 0 ? 'negative_value' : '']">{{division_total_details.Details_year_to_date.Sales.Sales_vsLY_percent}}%</q-td>
                    <q-td style="background-color: white;padding: 0px;"></q-td>

                    <q-td v-if="colspan.YearToDate.ScanGPShow1" style="font-style: Italic;border-bottom: 1px solid black;border-top: 1px solid black;" :class="[division_total_details.Details_year_to_date.Scan_GP.Scan_GP_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_total_details.Details_year_to_date.Scan_GP.Scan_GP_TY_amount,'$')}}</q-td>
                    <q-td style="font-style: Italic;border-bottom: 1px solid black;border-top: 1px solid black;" :class="[division_total_details.Details_year_to_date.Scan_GP.Scan_GP_TY_percent < 0 ? 'negative_value' : '']">{{division_total_details.Details_year_to_date.Scan_GP.Scan_GP_TY_percent}}%</q-td>
                    <q-td v-if="colspan.YearToDate.ScanGPShow2" style="font-style: Italic;border-bottom: 1px solid black;border-top: 1px solid black;" :class="[division_total_details.Details_year_to_date.Scan_GP.Scan_GP_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_total_details.Details_year_to_date.Scan_GP.Scan_GP_LY_amount,'$')}}</q-td>
                    <q-td style="font-style: Italic;border-bottom: 1px solid black;border-top: 1px solid black;" :class="[division_total_details.Details_year_to_date.Scan_GP.Scan_GP_LY_percent < 0 ? 'negative_value' : '']">{{division_total_details.Details_year_to_date.Scan_GP.Scan_GP_LY_percent}}%</q-td>
                    <q-td style="background-color: white;padding: 0px;"></q-td>

                    <q-td v-if="colspan.YearToDate.ShrinkageShow1" style="font-style: Italic;border-bottom: 1px solid black;border-top: 1px solid black;" :class="[division_total_details.Details_year_to_date.Shrinkage.Shrinkage_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_total_details.Details_year_to_date.Shrinkage.Shrinkage_TY_amount,'$')}}</q-td>
                    <q-td style="font-style: Italic;border-bottom: 1px solid black;border-top: 1px solid black;" :class="[division_total_details.Details_year_to_date.Shrinkage.Shrinkage_TY_percent < 0 ? 'negative_value' : '']">{{division_total_details.Details_year_to_date.Shrinkage.Shrinkage_TY_percent}}%</q-td>
                    <q-td v-if="colspan.YearToDate.ShrinkageShow2" style="font-style: Italic;border-bottom: 1px solid black;border-top: 1px solid black;" :class="[division_total_details.Details_year_to_date.Shrinkage.Shrinkage_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_total_details.Details_year_to_date.Shrinkage.Shrinkage_LY_amount,'$')}}</q-td>
                    <q-td style="font-style: Italic;border-bottom: 1px solid black;border-top: 1px solid black;" :class="[division_total_details.Details_year_to_date.Shrinkage.Shrinkage_LY_percent < 0 ? 'negative_value' : '']">{{division_total_details.Details_year_to_date.Shrinkage.Shrinkage_LY_percent}}%</q-td>
                    <q-td style="background-color: white;padding: 0px;"></q-td>

                    <q-td v-if="colspan.YearToDate.NetGPShow1" style="font-style: Italic;border-bottom: 1px solid black;border-top: 1px solid black;" :class="[division_total_details.Details_year_to_date.Net_GP.Net_GP_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_total_details.Details_year_to_date.Net_GP.Net_GP_TY_amount,'$')}}</q-td>
                    <q-td style="font-style: Italic;border-bottom: 1px solid black;border-top: 1px solid black;" :class="[division_total_details.Details_year_to_date.Net_GP.Net_GP_TY_percent < 0 ? 'negative_value' : '']">{{division_total_details.Details_year_to_date.Net_GP.Net_GP_TY_percent}}%</q-td>
                    <q-td v-if="colspan.YearToDate.NetGPShow2" style="font-style: Italic;border-bottom: 1px solid black;border-top: 1px solid black;" :class="[division_total_details.Details_year_to_date.Net_GP.Net_GP_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_total_details.Details_year_to_date.Net_GP.Net_GP_LY_amount,'$')}}</q-td>
                    <q-td style="font-style: Italic;border-bottom: 1px solid black;border-top: 1px solid black;" :class="[division_total_details.Details_year_to_date.Net_GP.Net_GP_LY_percent < 0 ? 'negative_value' : '']">{{division_total_details.Details_year_to_date.Net_GP.Net_GP_LY_percent}}%</q-td>
                    <q-td style="background-color: white;padding: 0px;"></q-td>

                    <q-td style="font-style: Italic;border-bottom: 1px solid black;border-top: 1px solid black;" :class="[division_total_details.Details_year_to_date.Stock.Stock_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_total_details.Details_year_to_date.Stock.Stock_TY_amount,'$')}}</q-td>
                    <q-td v-if="colspan.YearToDate.StockShow" style="font-style: Italic;border-bottom: 1px solid black;border-top: 1px solid black;" :class="[division_total_details.Details_year_to_date.Stock.Stock_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_total_details.Details_year_to_date.Stock.Stock_LY_amount,'$')}}</q-td>
                    <q-td style="font-style: Italic;border-bottom: 1px solid black;border-top: 1px solid black;" :class="[division_total_details.Details_year_to_date.Stock.Stock_vsLY_percent < 0 ? 'negative_value' : '']">{{division_total_details.Details_year_to_date.Stock.Stock_vsLY_percent}}%</q-td>
                    <q-td style="font-style: Italic;border-bottom: 1px solid black;border-top: 1px solid black;" :class="[division_total_details.Details_year_to_date.Stock.Stock_TY_days < 0 ? 'negative_value' : '']">{{formatAmount(division_total_details.Details_year_to_date.Stock.Stock_TY_days,'$')}}</q-td>
                    <q-td style="font-style: Italic;border-bottom: 1px solid black;border-top: 1px solid black;border-right: 1px solid black;" :class="[division_total_details.Details_year_to_date.Stock.Stock_LY_days < 0 ? 'negative_value' : '']">{{formatAmount(division_total_details.Details_year_to_date.Stock.Stock_LY_days,'$')}}</q-td>
                </q-tr>
            </template> -->

            <q-tr v-if="json_data.Division_Total.Details_month_to_date" :props="props" style="font-weight: bold;">

                <q-td style="background-color: white;position: sticky; left: 0;;z-index: 100;"></q-td>
                <q-td style="border: 0px;background-color:white;position:sticky;left: 20px;z-index:100;"></q-td>
                <q-td style="font-weight: bold;text-align: center;font-size: 13px;border: 0px;background-color:white;position:sticky;left: 50px;z-index:100;">TOTAL</q-td>

                <q-td style="border-bottom: 1px solid black;border-top: 1px solid black;" :class="[json_data.Division_Total.Details_month_to_date.Sales.Sales_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_month_to_date.Sales.Sales_TY_amount,'$')}}</q-td>
                <q-td v-if="colspan.MonthToDate.SalesShow" style="border-bottom: 1px solid black;border-top: 1px solid black;" :class="[json_data.Division_Total.Details_month_to_date.Sales.Sales_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_month_to_date.Sales.Sales_LY_amount,'$')}}</q-td>
                <q-td style="font-style: Italic;border-bottom: 1px solid black;border-top: 1px solid black;" :class="[json_data.Division_Total.Details_month_to_date.Sales.Sales_vsLY_percent < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_month_to_date.Sales.Sales_vsLY_percent,'%')}}%</q-td>
                <q-td style="background-color: white;padding: 0px;"></q-td>

                <q-td v-if="colspan.MonthToDate.ScanGPShow1" style="border-bottom: 1px solid black;border-top: 1px solid black;" :class="[json_data.Division_Total.Details_month_to_date.Scan_GP.Scan_GP_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_month_to_date.Scan_GP.Scan_GP_TY_amount,'$')}}</q-td>
                <q-td style="font-style: Italic;border-bottom: 1px solid black;border-top: 1px solid black;" :class="[json_data.Division_Total.Details_month_to_date.Scan_GP.Scan_GP_TY_percent < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_month_to_date.Scan_GP.Scan_GP_TY_percent,'%')}}%</q-td>
                <q-td v-if="colspan.MonthToDate.ScanGPShow2" style="border-bottom: 1px solid black;border-top: 1px solid black;" :class="[json_data.Division_Total.Details_month_to_date.Scan_GP.Scan_GP_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_month_to_date.Scan_GP.Scan_GP_LY_amount,'$')}}</q-td>
                <q-td style="font-style: Italic;border-bottom: 1px solid black;border-top: 1px solid black;" :class="[json_data.Division_Total.Details_month_to_date.Scan_GP.Scan_GP_LY_percent < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_month_to_date.Scan_GP.Scan_GP_LY_percent,'%')}}%</q-td>
                <q-td style="background-color: white;padding: 0px;"></q-td>

                <q-td v-if="colspan.MonthToDate.ShrinkageShow1" style="border-bottom: 1px solid black;border-top: 1px solid black;" :class="[json_data.Division_Total.Details_month_to_date.Shrinkage.Shrinkage_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_month_to_date.Shrinkage.Shrinkage_TY_amount,'$')}}</q-td>
                <q-td style="font-style: italic; border-bottom: 1px solid black;border-top: 1px solid black;" :class="[json_data.Division_Total.Details_month_to_date.Shrinkage.Shrinkage_TY_percent < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_month_to_date.Shrinkage.Shrinkage_TY_percent,'%')}}%</q-td>
                <q-td v-if="colspan.MonthToDate.ShrinkageShow2" style="border-bottom: 1px solid black;border-top: 1px solid black;" :class="[json_data.Division_Total.Details_month_to_date.Shrinkage.Shrinkage_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_month_to_date.Shrinkage.Shrinkage_LY_amount,'$')}}</q-td>
                <q-td style="font-style: italic; border-bottom: 1px solid black;border-top: 1px solid black;" :class="[json_data.Division_Total.Details_month_to_date.Shrinkage.Shrinkage_LY_percent < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_month_to_date.Shrinkage.Shrinkage_LY_percent,'%')}}%</q-td>
                <q-td style="background-color: white;padding: 0px;"></q-td>

                <q-td v-if="colspan.MonthToDate.NetGPShow1" style="border-bottom: 1px solid black;border-top: 1px solid black;" :class="[json_data.Division_Total.Details_month_to_date.Net_GP.Net_GP_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_month_to_date.Net_GP.Net_GP_TY_amount,'$')}}</q-td>
                <q-td style="font-style: Italic; border-bottom: 1px solid black;border-top: 1px solid black;" :class="[json_data.Division_Total.Details_month_to_date.Net_GP.Net_GP_TY_percent < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_month_to_date.Net_GP.Net_GP_TY_percent,'%')}}%</q-td>
                <q-td v-if="colspan.MonthToDate.NetGPShow2" style="border-bottom: 1px solid black;border-top: 1px solid black;" :class="[json_data.Division_Total.Details_month_to_date.Net_GP.Net_GP_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_month_to_date.Net_GP.Net_GP_LY_amount,'$')}}</q-td>
                <q-td style="font-style: Italic; border-bottom: 1px solid black;border-top: 1px solid black;" :class="[json_data.Division_Total.Details_month_to_date.Net_GP.Net_GP_LY_percent < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_month_to_date.Net_GP.Net_GP_LY_percent,'%')}}%</q-td>
                <q-td style="background-color: white;padding: 0px;"></q-td>

                <q-td style="border-bottom: 1px solid black;border-top: 1px solid black;" :class="[json_data.Division_Total.Details_month_to_date.Stock.Stock_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_month_to_date.Stock.Stock_TY_amount,'$')}}</q-td>
                <q-td v-if="colspan.MonthToDate.StockShow" style="border-bottom: 1px solid black;border-top: 1px solid black;" :class="[json_data.Division_Total.Details_month_to_date.Stock.Stock_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_month_to_date.Stock.Stock_LY_amount,'$')}}</q-td>
                <q-td style="font-style: Italic; border-bottom: 1px solid black;border-top: 1px solid black;" :class="[json_data.Division_Total.Details_month_to_date.Stock.Stock_vsLY_percent < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_month_to_date.Stock.Stock_vsLY_percent,'%')}}%</q-td>
                <q-td style="border-bottom: 1px solid black;border-top: 1px solid black;" :class="[json_data.Division_Total.Details_month_to_date.Stock.Stock_TY_days < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_month_to_date.Stock.Stock_TY_days,'$')}}</q-td>
                <q-td style="border-bottom: 1px solid black;border-top: 1px solid black;" :class="[json_data.Division_Total.Details_month_to_date.Stock.Stock_LY_days < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_month_to_date.Stock.Stock_LY_days,'$')}}</q-td>

                <q-td style="border-top: 0px;border-bottom:0px;"></q-td>

                <q-td style="border-bottom: 1px solid black;border-top: 1px solid black;" :class="[json_data.Division_Total.Details_year_to_date.Sales.Sales_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_year_to_date.Sales.Sales_TY_amount,'$')}}</q-td>
                <q-td v-if="colspan.YearToDate.SalesShow" style="border-bottom: 1px solid black;border-top: 1px solid black;" :class="[json_data.Division_Total.Details_year_to_date.Sales.Sales_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_year_to_date.Sales.Sales_LY_amount,'$')}}</q-td>
                <q-td style="font-style: italic; border-bottom: 1px solid black;border-top: 1px solid black;" :class="[json_data.Division_Total.Details_year_to_date.Sales.Sales_vsLY_percent < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_year_to_date.Sales.Sales_vsLY_percent,'%')}}%</q-td>
                <q-td style="background-color: white;padding: 0px;"></q-td>

                <q-td v-if="colspan.YearToDate.ScanGPShow1" style="border-bottom: 1px solid black;border-top: 1px solid black;" :class="[json_data.Division_Total.Details_year_to_date.Scan_GP.Scan_GP_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_year_to_date.Scan_GP.Scan_GP_TY_amount,'$')}}</q-td>
                <q-td style="font-style: italic; border-bottom: 1px solid black;border-top: 1px solid black;" :class="[json_data.Division_Total.Details_year_to_date.Scan_GP.Scan_GP_TY_percent < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_year_to_date.Scan_GP.Scan_GP_TY_percent,'%')}}%</q-td>
                <q-td v-if="colspan.YearToDate.ScanGPShow2" style="border-bottom: 1px solid black;border-top: 1px solid black;" :class="[json_data.Division_Total.Details_year_to_date.Scan_GP.Scan_GP_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_year_to_date.Scan_GP.Scan_GP_LY_amount,'$')}}</q-td>
                <q-td style="font-style: italic; border-bottom: 1px solid black;border-top: 1px solid black;" :class="[json_data.Division_Total.Details_year_to_date.Scan_GP.Scan_GP_LY_percent < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_year_to_date.Scan_GP.Scan_GP_LY_percent,'%')}}%</q-td>
                <q-td style="background-color: white;padding: 0px;"></q-td>

                <q-td v-if="colspan.YearToDate.ShrinkageShow1" style="border-bottom: 1px solid black;border-top: 1px solid black;" :class="[json_data.Division_Total.Details_year_to_date.Shrinkage.Shrinkage_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_year_to_date.Shrinkage.Shrinkage_TY_amount,'$')}}</q-td>
                <q-td style="font-style: Italic; border-bottom: 1px solid black;border-top: 1px solid black;" :class="[json_data.Division_Total.Details_year_to_date.Shrinkage.Shrinkage_TY_percent < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_year_to_date.Shrinkage.Shrinkage_TY_percent,'%')}}%</q-td>
                <q-td v-if="colspan.YearToDate.ShrinkageShow2" style="border-bottom: 1px solid black;border-top: 1px solid black;" :class="[json_data.Division_Total.Details_year_to_date.Shrinkage.Shrinkage_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_year_to_date.Shrinkage.Shrinkage_LY_amount,'$')}}</q-td>
                <q-td style="font-style: Italic; border-bottom: 1px solid black;border-top: 1px solid black;" :class="[json_data.Division_Total.Details_year_to_date.Shrinkage.Shrinkage_LY_percent < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_year_to_date.Shrinkage.Shrinkage_LY_percent,'%')}}%</q-td>
                <q-td style="background-color: white;padding: 0px;"></q-td>

                <q-td v-if="colspan.YearToDate.NetGPShow1" style="border-bottom: 1px solid black;border-top: 1px solid black;" :class="[json_data.Division_Total.Details_year_to_date.Net_GP.Net_GP_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_year_to_date.Net_GP.Net_GP_TY_amount,'$')}}</q-td>
                <q-td style="font-style: italic; border-bottom: 1px solid black;border-top: 1px solid black;" :class="[json_data.Division_Total.Details_year_to_date.Net_GP.Net_GP_TY_percent < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_year_to_date.Net_GP.Net_GP_TY_percent,'%')}}%</q-td>
                <q-td v-if="colspan.YearToDate.NetGPShow2" style="border-bottom: 1px solid black;border-top: 1px solid black;" :class="[json_data.Division_Total.Details_year_to_date.Net_GP.Net_GP_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_year_to_date.Net_GP.Net_GP_LY_amount,'$')}}</q-td>
                <q-td style="font-style: italic; border-bottom: 1px solid black;border-top: 1px solid black;" :class="[json_data.Division_Total.Details_year_to_date.Net_GP.Net_GP_LY_percent < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_year_to_date.Net_GP.Net_GP_LY_percent,'%')}}%</q-td>
                <q-td style="background-color: white;padding: 0px;"></q-td>

                <q-td style="border-bottom: 1px solid black;border-top: 1px solid black;" :class="[json_data.Division_Total.Details_year_to_date.Stock.Stock_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_year_to_date.Stock.Stock_TY_amount,'$')}}</q-td>
                <q-td v-if="colspan.YearToDate.StockShow" style="border-bottom: 1px solid black;border-top: 1px solid black;" :class="[json_data.Division_Total.Details_year_to_date.Stock.Stock_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_year_to_date.Stock.Stock_LY_amount,'$')}}</q-td>
                <q-td style="font-style: italic; border-bottom: 1px solid black;border-top: 1px solid black;" :class="[json_data.Division_Total.Details_year_to_date.Stock.Stock_vsLY_percent < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_year_to_date.Stock.Stock_vsLY_percent,'%')}}%</q-td>
                <q-td style="border-bottom: 1px solid black;border-top: 1px solid black;" :class="[json_data.Division_Total.Details_year_to_date.Stock.Stock_TY_days < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_year_to_date.Stock.Stock_TY_days,'$')}}</q-td>
                <q-td style="border-bottom: 1px solid black;border-top: 1px solid black;border-right: 1px solid black;" :class="[json_data.Division_Total.Details_year_to_date.Stock.Stock_LY_days < 0 ? 'negative_value' : '']">{{formatAmount(json_data.Division_Total.Details_year_to_date.Stock.Stock_LY_days,'$')}}</q-td>
            </q-tr>

            <q-tr v-else>
                <q-td colspan="2"></q-td>
                <q-td colspan="50" style="border: 1px solid black; text-align: center; font-weight: bold;">No data</q-td>
            </q-tr>


            <q-tr :props="props">
                <q-td colspan="52"></q-td>
            </q-tr>
            <!-- json_data -->

            <!-- Division -->

            <q-tr :props="props">
                <q-td style="position: sticky; left: 0;background-color:white;z-index: 100;"></q-td>
                <q-td style="background-color: black; color: white;position:sticky;left: 20px;z-index:100; font-weight: bold;">Div</q-td>
                <q-td style="background-color: black; color: white;position:sticky;left: 50px;z-index:100; text-align: center; font-weight: bold;">Department</q-td>
                <q-td colspan="49"></q-td>
            </q-tr>

            <q-tr v-if="json_data.Department.length <= 0">
                <q-td colspan="1"></q-td>
                <q-td colspan="51" style="border: 1px solid black;text-align: center; font-weight: bold;">No data</q-td>
            </q-tr>

            <q-tr v-else :props="props" style="height: 10px !important;">
                <q-td colspan="52" style="height: 10px !important;"></q-td>
            </q-tr>

            <template v-for="(division_details, index) in json_data.Department" :key="division_details">
                
                <template v-for="(data_details, data_index) in division_details.Data" :key="data_index">

                    <q-tr :props="props" :style="[data_details.Summary == 1 ? 'background-color: #e9e9e9;' : (data_details.Summary == 0 ? 'background-color: #c9c9c9;' : '') ]">
                        <q-td style="position: sticky; left: 0;background-color:white;z-index: 100;">{{data_details.code}}</q-td>
                        <q-td v-if="data_index == 0" style="border: 0px;background-color:#92b9ff;position:sticky;left: 20px;z-index:100;" :rowspan="division_details.Total_Line"><span STYLE="writing-mode: vertical-lr; transform: rotate(180deg);font-weight: bold;">{{division_details.Title}}</span></q-td>
                        
                        <q-td :style="['border: 0px;','position:sticky;left: 50px;z-index:100;', data_details.Summary > 0 ? 'font-style: Italic;text-align: center;background-color: #e9e9e9;' : 'background-color: white;']">{{data_details.Title}}</q-td>

                        <template v-if="data_details.Details_month_to_date.Sales">
                            <q-td :style="[data_details.Summary == 1 && 'font-style: italic;','font-weight: bold; text-align: right;', data_index == 0 ? 'border-top: 1px solid black;' : '']" :class="[data_details.Details_month_to_date.Sales.Sales_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(data_details.Details_month_to_date.Sales.Sales_TY_amount,'$')}}</q-td>
                            <q-td v-if="colspan.MonthToDate.SalesShow" :style="[data_details.Summary == 1 && 'font-style: italic;', 'font-weight: bold;', data_index == 0 ? 'border-top: 1px solid black;' : '']" :class="[data_details.Details_month_to_date.Sales.Sales_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(data_details.Details_month_to_date.Sales.Sales_LY_amount,'$')}}</q-td>
                            <q-td :style="['font-weight: bold; font-style: italic;', data_index == 0 ? 'border-top: 1px solid black;' : '']" :class="[data_details.Details_month_to_date.Sales.Sales_vsLY_percent < 0 ? 'negative_value' : '']">{{formatAmount(data_details.Details_month_to_date.Sales.Sales_vsLY_percent,'%')}}%</q-td>
                            <q-td style="background-color: white;padding: 0px;"></q-td>
                        </template>

                        <template v-if="data_details.Details_month_to_date.Scan_GP">
                            <q-td v-if="colspan.MonthToDate.ScanGPShow1" :style="[data_details.Summary == 1 && 'font-style: italic;', 'font-weight: bold;', data_index == 0 ? 'border-top: 1px solid black;' : '']" :class="[data_details.Details_month_to_date.Scan_GP.Scan_GP_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(data_details.Details_month_to_date.Scan_GP.Scan_GP_TY_amount,'$')}}</q-td>
                            <q-td :style="['font-weight: bold; font-style: italic;', data_index == 0 ? 'border-top: 1px solid black;' : '']" :class="[data_details.Details_month_to_date.Scan_GP.Scan_GP_TY_percent < 0 ? 'negative_value' : '']">{{formatAmount(data_details.Details_month_to_date.Scan_GP.Scan_GP_TY_percent,'%')}}%</q-td>
                            <q-td v-if="colspan.MonthToDate.ScanGPShow2" :style="[data_details.Summary == 1 && 'font-style: italic;', 'font-weight: bold;', data_index == 0 ? 'border-top: 1px solid black;' : '']" :class="[data_details.Details_month_to_date.Scan_GP.Scan_GP_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(data_details.Details_month_to_date.Scan_GP.Scan_GP_LY_amount,'$')}}</q-td>
                            <q-td :style="['font-weight: bold; font-style: italic;', data_index == 0 ? 'border-top: 1px solid black;' : '']" :class="[data_details.Details_month_to_date.Scan_GP.Scan_GP_LY_percent < 0 ? 'negative_value' : '']">{{formatAmount(data_details.Details_month_to_date.Scan_GP.Scan_GP_LY_percent,'%')}}%</q-td>
                            <q-td style="background-color: white;padding: 0px;"></q-td>
                        </template>

                        <template v-if="data_details.Details_month_to_date.Shrinkage">
                            <q-td v-if="colspan.MonthToDate.ShrinkageShow1" :style="[data_details.Summary == 1 && 'font-style: italic;', 'font-weight: bold;', data_index == 0 ? 'border-top: 1px solid black;' : '']" :class="[data_details.Details_month_to_date.Shrinkage.Shrinkage_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(data_details.Details_month_to_date.Shrinkage.Shrinkage_TY_amount,'$')}}</q-td>
                            <q-td :style="['font-weight: bold; font-style: italic;', data_index == 0 ? 'border-top: 1px solid black;' : '']" :class="[data_details.Details_month_to_date.Shrinkage.Shrinkage_TY_percent < 0 ? 'negative_value' : '']">{{formatAmount(data_details.Details_month_to_date.Shrinkage.Shrinkage_TY_percent,'%')}}%</q-td>
                            <q-td v-if="colspan.MonthToDate.ShrinkageShow2" :style="[data_details.Summary == 1 && 'font-style: italic;', 'font-weight: bold;', data_index == 0 ? 'border-top: 1px solid black;' : '']" :class="[data_details.Details_month_to_date.Shrinkage.Shrinkage_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(data_details.Details_month_to_date.Shrinkage.Shrinkage_LY_amount,'$')}}</q-td>
                            <q-td :style="['font-weight: bold; font-style: italic;', data_index == 0 ? 'border-top: 1px solid black;' : '']" :class="[data_details.Details_month_to_date.Shrinkage.Shrinkage_LY_percent < 0 ? 'negative_value' : '']">{{formatAmount(data_details.Details_month_to_date.Shrinkage.Shrinkage_LY_percent,'%')}}%</q-td>
                            <q-td style="background-color: white;padding: 0px;"></q-td>
                        </template>

                        <template v-if="data_details.Details_month_to_date.Net_GP">
                            <q-td v-if="colspan.MonthToDate.NetGPShow1" :style="[data_details.Summary == 1 && 'font-style: italic;', 'font-weight: bold;', data_index == 0 ? 'border-top: 1px solid black;' : '']" :class="[data_details.Details_month_to_date.Net_GP.Net_GP_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(data_details.Details_month_to_date.Net_GP.Net_GP_TY_amount,'$')}}</q-td>
                            <q-td :style="['font-weight: bold; font-style: italic;', data_index == 0 ? 'border-top: 1px solid black;' : '']" :class="[data_details.Details_month_to_date.Net_GP.Net_GP_TY_percent < 0 ? 'negative_value' : '']">{{formatAmount(data_details.Details_month_to_date.Net_GP.Net_GP_TY_percent,'%')}}%</q-td>
                            <q-td v-if="colspan.MonthToDate.NetGPShow2" :style="[data_details.Summary == 1 && 'font-style: italic;', 'font-weight: bold;', data_index == 0 ? 'border-top: 1px solid black;' : '']" :class="[data_details.Details_month_to_date.Net_GP.Net_GP_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(data_details.Details_month_to_date.Net_GP.Net_GP_LY_amount,'$')}}</q-td>
                            <q-td :style="['font-weight: bold; font-style: italic;', data_index == 0 ? 'border-top: 1px solid black;' : '']" :class="[data_details.Details_month_to_date.Net_GP.Net_GP_LY_percent < 0 ? 'negative_value' : '']">{{formatAmount(data_details.Details_month_to_date.Net_GP.Net_GP_LY_percent,'%')}}%</q-td>
                            <q-td style="background-color: white;padding: 0px;"></q-td>
                        </template>

                        <template v-if="data_details.Details_month_to_date.Stock">
                            <q-td :style="[data_details.Summary == 1 && 'font-style: italic;', 'font-weight: bold;', data_index == 0 ? 'border-top: 1px solid black;' : '']" :class="[data_details.Details_month_to_date.Stock.Stock_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(data_details.Details_month_to_date.Stock.Stock_TY_amount,'$')}}</q-td>
                            <q-td v-if="colspan.MonthToDate.StockShow" :style="[data_details.Summary == 1 && 'font-style: italic;', 'font-weight: bold;', data_index == 0 ? 'border-top: 1px solid black;' : '']" :class="[data_details.Details_month_to_date.Stock.Stock_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(data_details.Details_month_to_date.Stock.Stock_LY_amount,'$')}}</q-td>
                            <q-td :style="['font-weight: bold; font-style: italic;', data_index == 0 ? 'border-top: 1px solid black;' : '']" :class="[data_details.Details_month_to_date.Stock.Stock_vsLY_percent < 0 ? 'negative_value' : '']">{{formatAmount(data_details.Details_month_to_date.Stock.Stock_vsLY_percent,'%')}}%</q-td>
                            <q-td :style="[data_details.Summary == 1 && 'font-style: italic;', 'font-weight: bold;', data_index == 0 ? 'border-top: 1px solid black;' : '']" :class="[data_details.Details_month_to_date.Stock.Stock_TY_days < 0 ? 'negative_value' : '']">{{formatAmount(data_details.Details_month_to_date.Stock.Stock_TY_days,'$')}}</q-td>
                            <q-td :style="[data_details.Summary == 1 && 'font-style: italic;', 'font-weight: bold;', data_index == 0 ? 'border-top: 1px solid black;' : '']" :class="[data_details.Details_month_to_date.Stock.Stock_LY_days < 0 ? 'negative_value' : '']">{{formatAmount(data_details.Details_month_to_date.Stock.Stock_LY_days,'$')}}</q-td>
                        </template>

                        <q-td style="border-top: 0px;border-bottom:0px;"></q-td>

                        <template v-if="data_details.Details_year_to_date.Sales">
                            <q-td :style="[data_details.Summary == 1 && 'font-style: italic;', 'font-weight: bold;', data_index == 0 ? 'border-top: 1px solid black;' : '']" :class="[data_details.Details_year_to_date.Sales.Sales_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(data_details.Details_year_to_date.Sales.Sales_TY_amount,'$')}}</q-td>
                            <q-td v-if="colspan.YearToDate.SalesShow" :style="[data_details.Summary == 1 && 'font-style: italic;', 'font-weight: bold;', data_index == 0 ? 'border-top: 1px solid black;' : '']" :class="[data_details.Details_year_to_date.Sales.Sales_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(data_details.Details_year_to_date.Sales.Sales_LY_amount,'$')}}</q-td>
                            <q-td :style="['font-weight: bold; font-style: italic;', data_index == 0 ? 'border-top: 1px solid black;' : '']" :class="[data_details.Details_year_to_date.Sales.Sales_vsLY_percent < 0 ? 'negative_value' : '']">{{formatAmount(data_details.Details_year_to_date.Sales.Sales_vsLY_percent,'%')}}%</q-td>
                            <q-td style="background-color: white;padding: 0px;"></q-td>
                        </template>

                        <template v-if="data_details.Details_year_to_date.Scan_GP">
                            <q-td v-if="colspan.YearToDate.ScanGPShow1" :style="[data_details.Summary == 1 && 'font-style: italic;', 'font-weight: bold;', data_index == 0 ? 'border-top: 1px solid black;' : '']" :class="[data_details.Details_year_to_date.Scan_GP.Scan_GP_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(data_details.Details_year_to_date.Scan_GP.Scan_GP_TY_amount,'$')}}</q-td>
                            <q-td :style="['font-weight: bold; font-style: italic;', data_index == 0 ? 'border-top: 1px solid black;' : '']" :class="[data_details.Details_year_to_date.Scan_GP.Scan_GP_TY_percent < 0 ? 'negative_value' : '']">{{formatAmount(data_details.Details_year_to_date.Scan_GP.Scan_GP_TY_percent,'%')}}%</q-td>
                            <q-td v-if="colspan.YearToDate.ScanGPShow2" :style="[data_details.Summary == 1 && 'font-style: italic;', 'font-weight: bold;', data_index == 0 ? 'border-top: 1px solid black;' : '']" :class="[data_details.Details_year_to_date.Scan_GP.Scan_GP_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(data_details.Details_year_to_date.Scan_GP.Scan_GP_LY_amount,'$')}}</q-td>
                            <q-td :style="['font-weight: bold; font-style: italic;', data_index == 0 ? 'border-top: 1px solid black;' : '']" :class="[data_details.Details_year_to_date.Scan_GP.Scan_GP_LY_percent < 0 ? 'negative_value' : '']">{{formatAmount(data_details.Details_year_to_date.Scan_GP.Scan_GP_LY_percent,'%')}}%</q-td>
                            <q-td style="background-color: white;padding: 0px;"></q-td>
                        </template>

                        <template v-if="data_details.Details_year_to_date.Shrinkage">
                            <q-td v-if="colspan.YearToDate.ShrinkageShow1" :style="[data_details.Summary == 1 && 'font-style: italic;', 'font-weight: bold;', data_index == 0 ? 'border-top: 1px solid black;' : '']" :class="[data_details.Details_year_to_date.Shrinkage.Shrinkage_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(data_details.Details_year_to_date.Shrinkage.Shrinkage_TY_amount,'$')}}</q-td>
                            <q-td :style="['font-weight: bold; font-style: italic;', data_index == 0 ? 'border-top: 1px solid black;' : '']" :class="[data_details.Details_year_to_date.Shrinkage.Shrinkage_TY_percent < 0 ? 'negative_value' : '']">{{formatAmount(data_details.Details_year_to_date.Shrinkage.Shrinkage_TY_percent,'%')}}%</q-td>
                            <q-td v-if="colspan.YearToDate.ShrinkageShow2" :style="[data_details.Summary == 1 && 'font-style: italic;', 'font-weight: bold;', data_index == 0 ? 'border-top: 1px solid black;' : '']" :class="[data_details.Details_year_to_date.Shrinkage.Shrinkage_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(data_details.Details_year_to_date.Shrinkage.Shrinkage_LY_amount,'$')}}</q-td>
                            <q-td :style="['font-weight: bold; font-style: italic;', data_index == 0 ? 'border-top: 1px solid black;' : '']" :class="[data_details.Details_year_to_date.Shrinkage.Shrinkage_LY_percent < 0 ? 'negative_value' : '']">{{formatAmount(data_details.Details_year_to_date.Shrinkage.Shrinkage_LY_percent,'%')}}%</q-td>
                            <q-td style="background-color: white;padding: 0px;"></q-td>
                        </template>

                        <template v-if="data_details.Details_year_to_date.Net_GP">
                            <q-td v-if="colspan.YearToDate.NetGPShow1" :style="[data_details.Summary == 1 && 'font-style: italic;', 'font-weight: bold;', data_index == 0 ? 'border-top: 1px solid black;' : '']" :class="[data_details.Details_year_to_date.Net_GP.Net_GP_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(data_details.Details_year_to_date.Net_GP.Net_GP_TY_amount,'$')}}</q-td>
                            <q-td :style="['font-weight: bold; font-style: italic;', data_index == 0 ? 'border-top: 1px solid black;' : '']" :class="[data_details.Details_year_to_date.Net_GP.Net_GP_TY_percent < 0 ? 'negative_value' : '']">{{formatAmount(data_details.Details_year_to_date.Net_GP.Net_GP_TY_percent,'%')}}%</q-td>
                            <q-td v-if="colspan.YearToDate.NetGPShow2" :style="[data_details.Summary == 1 && 'font-style: italic;', 'font-weight: bold;', data_index == 0 ? 'border-top: 1px solid black;' : '']" :class="[data_details.Details_year_to_date.Net_GP.Net_GP_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(data_details.Details_year_to_date.Net_GP.Net_GP_LY_amount,'$')}}</q-td>
                            <q-td :style="['font-weight: bold; font-style: italic;', data_index == 0 ? 'border-top: 1px solid black;' : '']" :class="[data_details.Details_year_to_date.Net_GP.Net_GP_LY_percent < 0 ? 'negative_value' : '']">{{formatAmount(data_details.Details_year_to_date.Net_GP.Net_GP_LY_percent,'%')}}%</q-td>
                            <q-td style="background-color: white;padding: 0px;"></q-td>
                        </template>
                        
                        <template v-if="data_details.Details_year_to_date.Stock">
                            <q-td :style="[data_details.Summary == 1 && 'font-style: italic;', 'font-weight: bold;', data_index == 0 ? 'border-top: 1px solid black;' : '']" :class="[data_details.Details_year_to_date.Stock.Stock_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(data_details.Details_year_to_date.Stock.Stock_TY_amount,'$')}}</q-td>
                            <q-td v-if="colspan.YearToDate.StockShow" :style="[data_details.Summary == 1 && 'font-style: italic;', 'font-weight: bold;', data_index == 0 ? 'border-top: 1px solid black;' : '']" :class="[data_details.Details_year_to_date.Stock.Stock_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(data_details.Details_year_to_date.Stock.Stock_LY_amount,'$')}}</q-td>
                            <q-td :style="['font-weight: bold; font-style: italic;', data_index == 0 ? 'border-top: 1px solid black;' : '']" :class="[data_details.Details_year_to_date.Stock.Stock_vsLY_percent < 0 ? 'negative_value' : '']">{{formatAmount(data_details.Details_year_to_date.Stock.Stock_vsLY_percent,'%')}}%</q-td>
                            <q-td :style="[data_details.Summary == 1 && 'font-style: italic;', 'font-weight: bold;', data_index == 0 ? 'border-top: 1px solid black;' : '']" :class="[data_details.Details_year_to_date.Stock.Stock_TY_days < 0 ? 'negative_value' : '']">{{formatAmount(data_details.Details_year_to_date.Stock.Stock_TY_days,'$')}}</q-td>
                            <q-td :style="[data_details.Summary == 1 && 'font-style: italic;', 'font-weight: bold;border-right: 1px solid black;', data_index == 0 ? 'border-top: 1px solid black;' : '']" :class="[data_details.Details_year_to_date.Stock.Stock_LY_days < 0 ? 'negative_value' : '']">{{formatAmount(data_details.Details_year_to_date.Stock.Stock_LY_days,'$')}}</q-td>
                        </template>

                    </q-tr>

                    <template v-for="data_details_child_details in data_details.Child" :key="data_details_child_details">

                        <q-tr :props="props" :style="[data_details_child_details.Custom == 1 ? 'background-color: #e9e9e9;' : (data_details_child_details.Custom == 0 ? 'background-color: #c9c9c9;' : '') ]">
                            
                            <q-td style="position: sticky; left: 0;background-color:white;z-index: 100;">#</q-td>
                            <!-- <q-td v-if="data_index == 0" style="border: 0px;background-color:#005cff7d;" :rowspan="division_details.Data.length+1"><span STYLE="writing-mode: vertical-lr; transform: rotate(180deg);font-weight: bold;">{{division_details.Title}}</span></q-td> -->

                            <q-td :style="[data_details_child_details ? (data_details_child_details.Custom == 1 ? 'text-align:center;font-style: italic;' : 'padding-left:15px;font-style: italic;') : '','border: 0px;','position:sticky;left: 50px;z-index:100;']">{{data_details_child_details.Title}}</q-td>

                            <q-td style="font-weight: bold;text-align: right;" :class="[data_details_child_details.Details_month_to_date.Sales.Sales_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(data_details_child_details.Details_month_to_date.Sales.Sales_TY_amount,'$')}}</q-td>
                            <q-td v-if="colspan.MonthToDate.SalesShow" style="font-weight: bold;" :class="[data_details_child_details.Details_month_to_date.Sales.Sales_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(data_details_child_details.Details_month_to_date.Sales.Sales_LY_amount,'$')}}</q-td>
                            <q-td style="font-weight: bold;" :class="[data_details_child_details.Details_month_to_date.Sales.Sales_vsLY_percent < 0 ? 'negative_value' : '']">{{formatAmount(data_details_child_details.Details_month_to_date.Sales.Sales_vsLY_percent,'%')}}%</q-td>
                            <q-td style="background-color: white;padding: 0px;"></q-td>

                            <q-td v-if="colspan.MonthToDate.ScanGPShow1" style="font-weight: bold;" :class="[data_details_child_details.Details_month_to_date.Scan_GP.Scan_GP_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(data_details_child_details.Details_month_to_date.Scan_GP.Scan_GP_TY_amount,'$')}}</q-td>
                            <q-td style="font-weight: bold;" :class="[data_details_child_details.Details_month_to_date.Scan_GP.Scan_GP_TY_percent < 0 ? 'negative_value' : '']">{{formatAmount(data_details_child_details.Details_month_to_date.Scan_GP.Scan_GP_TY_percent,'%')}}%</q-td>
                            <q-td v-if="colspan.MonthToDate.ScanGPShow2" style="font-weight: bold;" :class="[data_details_child_details.Details_month_to_date.Scan_GP.Scan_GP_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(data_details_child_details.Details_month_to_date.Scan_GP.Scan_GP_LY_amount,'$')}}</q-td>
                            <q-td style="font-weight: bold;" :class="[data_details_child_details.Details_month_to_date.Scan_GP.Scan_GP_LY_percent < 0 ? 'negative_value' : '']">{{formatAmount(data_details_child_details.Details_month_to_date.Scan_GP.Scan_GP_LY_percent,'%')}}%</q-td>
                            <q-td style="background-color: white;padding: 0px;"></q-td>

                            <q-td v-if="colspan.MonthToDate.ShrinkageShow1" style="font-weight: bold;" :class="[data_details_child_details.Details_month_to_date.Shrinkage.Shrinkage_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(data_details_child_details.Details_month_to_date.Shrinkage.Shrinkage_TY_amount,'$')}}</q-td>
                            <q-td style="font-weight: bold;" :class="[data_details_child_details.Details_month_to_date.Shrinkage.Shrinkage_TY_percent < 0 ? 'negative_value' : '']">{{formatAmount(data_details_child_details.Details_month_to_date.Shrinkage.Shrinkage_TY_percent,'%')}}%</q-td>
                            <q-td v-if="colspan.MonthToDate.ShrinkageShow2" style="font-weight: bold;" :class="[data_details_child_details.Details_month_to_date.Shrinkage.Shrinkage_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(data_details_child_details.Details_month_to_date.Shrinkage.Shrinkage_LY_amount,'$')}}</q-td>
                            <q-td style="font-weight: bold;" :class="[data_details_child_details.Details_month_to_date.Shrinkage.Shrinkage_LY_percent < 0 ? 'negative_value' : '']">{{formatAmount(data_details_child_details.Details_month_to_date.Shrinkage.Shrinkage_LY_percent,'%')}}%</q-td>
                            <q-td style="background-color: white;padding: 0px;"></q-td>
        
                            <q-td v-if="colspan.MonthToDate.NetGPShow1" style="font-weight: bold;" :class="[data_details_child_details.Details_month_to_date.Net_GP.Net_GP_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(data_details_child_details.Details_month_to_date.Net_GP.Net_GP_TY_amount,'$')}}</q-td>
                            <q-td style="font-weight: bold;" :class="[data_details_child_details.Details_month_to_date.Net_GP.Net_GP_TY_percent < 0 ? 'negative_value' : '']">{{formatAmount(data_details_child_details.Details_month_to_date.Net_GP.Net_GP_TY_percent,'%')}}%</q-td>
                            <q-td v-if="colspan.MonthToDate.NetGPShow2" style="font-weight: bold;" :class="[data_details_child_details.Details_month_to_date.Net_GP.Net_GP_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(data_details_child_details.Details_month_to_date.Net_GP.Net_GP_LY_amount,'$')}}</q-td>
                            <q-td style="font-weight: bold;" :class="[data_details_child_details.Details_month_to_date.Net_GP.Net_GP_LY_percent < 0 ? 'negative_value' : '']">{{formatAmount(data_details_child_details.Details_month_to_date.Net_GP.Net_GP_LY_percent,'%')}}%</q-td>
                            <q-td style="background-color: white;padding: 0px;"></q-td>


                            <q-td style="font-weight: bold;" :class="[data_details_child_details.Details_month_to_date.Stock.Stock_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(data_details_child_details.Details_month_to_date.Stock.Stock_TY_amount,'$')}}</q-td>
                            <q-td v-if="colspan.MonthToDate.StockShow" style="font-weight: bold;" :class="[data_details_child_details.Details_month_to_date.Stock.Stock_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(data_details_child_details.Details_month_to_date.Stock.Stock_LY_amount,'$')}}</q-td>
                            <q-td style="font-weight: bold;" :class="[data_details_child_details.Details_month_to_date.Stock.Stock_vsLY_percent < 0 ? 'negative_value' : '']">{{formatAmount(data_details_child_details.Details_month_to_date.Stock.Stock_vsLY_percent,'%')}}%</q-td>
                            <q-td style="font-weight: bold;" :class="[data_details_child_details.Details_month_to_date.Stock.Stock_TY_days < 0 ? 'negative_value' : '']">{{formatAmount(data_details_child_details.Details_month_to_date.Stock.Stock_TY_days,'$')}}</q-td>
                            <q-td style="font-weight: bold;" :class="[data_details_child_details.Details_month_to_date.Stock.Stock_LY_days < 0 ? 'negative_value' : '']">{{formatAmount(data_details_child_details.Details_month_to_date.Stock.Stock_LY_days,'$')}}</q-td>

                            <q-td style="border-top: 0px;border-bottom:0px;"></q-td>

                            <q-td style="font-weight: bold;" :class="[data_details_child_details.Details_year_to_date.Sales.Sales_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(data_details_child_details.Details_year_to_date.Sales.Sales_TY_amount,'$')}}</q-td>
                            <q-td v-if="colspan.YearToDate.SalesShow" style="font-weight: bold;" :class="[data_details_child_details.Details_year_to_date.Sales.Sales_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(data_details_child_details.Details_year_to_date.Sales.Sales_LY_amount,'$')}}</q-td>
                            <q-td style="font-weight: bold;" :class="[data_details_child_details.Details_year_to_date.Sales.Sales_vsLY_percent < 0 ? 'negative_value' : '']">{{formatAmount(data_details_child_details.Details_year_to_date.Sales.Sales_vsLY_percent,'%')}}%</q-td>
                            <q-td style="background-color: white;padding: 0px;"></q-td>

                            <q-td v-if="colspan.YearToDate.ScanGPShow1" style="font-weight: bold;" :class="[data_details_child_details.Details_year_to_date.Scan_GP.Scan_GP_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(data_details_child_details.Details_year_to_date.Scan_GP.Scan_GP_TY_amount,'$')}}</q-td>
                            <q-td style="font-weight: bold;" :class="[data_details_child_details.Details_year_to_date.Scan_GP.Scan_GP_TY_percent < 0 ? 'negative_value' : '']">{{formatAmount(data_details_child_details.Details_year_to_date.Scan_GP.Scan_GP_TY_percent,'%')}}%</q-td>
                            <q-td v-if="colspan.YearToDate.ScanGPShow2" style="font-weight: bold;" :class="[data_details_child_details.Details_year_to_date.Scan_GP.Scan_GP_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(data_details_child_details.Details_year_to_date.Scan_GP.Scan_GP_LY_amount,'$')}}</q-td>
                            <q-td style="font-weight: bold;" :class="[data_details_child_details.Details_year_to_date.Scan_GP.Scan_GP_LY_percent < 0 ? 'negative_value' : '']">{{formatAmount(data_details_child_details.Details_year_to_date.Scan_GP.Scan_GP_LY_percent,'%')}}%</q-td>
                            <q-td style="background-color: white;padding: 0px;"></q-td>

                            <q-td v-if="colspan.YearToDate.ShrinkageShow1" style="font-weight: bold;" :class="[data_details_child_details.Details_year_to_date.Shrinkage.Shrinkage_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(data_details_child_details.Details_year_to_date.Shrinkage.Shrinkage_TY_amount,'$')}}</q-td>
                            <q-td style="font-weight: bold;" :class="[data_details_child_details.Details_year_to_date.Shrinkage.Shrinkage_TY_percent < 0 ? 'negative_value' : '']">{{formatAmount(data_details_child_details.Details_year_to_date.Shrinkage.Shrinkage_TY_percent,'%')}}%</q-td>
                            <q-td v-if="colspan.YearToDate.ShrinkageShow2" style="font-weight: bold;" :class="[data_details_child_details.Details_year_to_date.Shrinkage.Shrinkage_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(data_details_child_details.Details_year_to_date.Shrinkage.Shrinkage_LY_amount,'$')}}</q-td>
                            <q-td style="font-weight: bold;" :class="[data_details_child_details.Details_year_to_date.Shrinkage.Shrinkage_LY_percent < 0 ? 'negative_value' : '']">{{formatAmount(data_details_child_details.Details_year_to_date.Shrinkage.Shrinkage_LY_percent,'%')}}%</q-td>
                            <q-td style="background-color: white;padding: 0px;"></q-td>
        
                            <q-td v-if="colspan.YearToDate.NetGPShow1" style="font-weight: bold;" :class="[data_details_child_details.Details_year_to_date.Net_GP.Net_GP_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(data_details_child_details.Details_year_to_date.Net_GP.Net_GP_TY_amount,'$')}}</q-td>
                            <q-td style="font-weight: bold;" :class="[data_details_child_details.Details_year_to_date.Net_GP.Net_GP_TY_percent < 0 ? 'negative_value' : '']">{{formatAmount(data_details_child_details.Details_year_to_date.Net_GP.Net_GP_TY_percent,'%')}}%</q-td>
                            <q-td v-if="colspan.YearToDate.NetGPShow2" style="font-weight: bold;" :class="[data_details_child_details.Details_year_to_date.Net_GP.Net_GP_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(data_details_child_details.Details_year_to_date.Net_GP.Net_GP_LY_amount,'$')}}</q-td>
                            <q-td style="font-weight: bold;" :class="[data_details_child_details.Details_year_to_date.Net_GP.Net_GP_LY_percent < 0 ? 'negative_value' : '']">{{formatAmount(data_details_child_details.Details_year_to_date.Net_GP.Net_GP_LY_percent,'%')}}%</q-td>
                            <q-td style="background-color: white;padding: 0px;"></q-td>

                            <q-td style="font-weight: bold;" :class="[data_details_child_details.Details_year_to_date.Stock.Stock_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(data_details_child_details.Details_year_to_date.Stock.Stock_TY_amount,'$')}}</q-td>
                            <q-td v-if="colspan.YearToDate.StockShow" style="font-weight: bold;" :class="[data_details_child_details.Details_year_to_date.Stock.Stock_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(data_details_child_details.Details_year_to_date.Stock.Stock_LY_amount,'$')}}</q-td>
                            <q-td style="font-weight: bold;" :class="[data_details_child_details.Details_year_to_date.Stock.Stock_vsLY_percent < 0 ? 'negative_value' : '']">{{formatAmount(data_details_child_details.Details_year_to_date.Stock.Stock_vsLY_percent,'%')}}%</q-td>
                            <q-td style="font-weight: bold;" :class="[data_details_child_details.Details_year_to_date.Stock.Stock_TY_days < 0 ? 'negative_value' : '']">{{formatAmount(data_details_child_details.Details_year_to_date.Stock.Stock_TY_days,'$')}}</q-td>
                            <q-td style="font-weight: bold;border-right: 1px solid black;" :class="[data_details_child_details.Details_year_to_date.Stock.Stock_LY_days < 0 ? 'negative_value' : '']">{{formatAmount(data_details_child_details.Details_year_to_date.Stock.Stock_LY_days,'$')}}</q-td>
                        </q-tr>
                    </template>

                </template>

                <q-tr :props="props">

                    <q-td style="position: sticky; left: 0;background-color:white;z-index: 100;"></q-td>
                    <!-- <q-td style="border: 0px;"></q-td> -->
                    <q-td style="font-weight: bold;font-size: 13px;border: 0px;position:sticky;left: 50px;z-index:100;background-color:white;">Total</q-td>

                    <q-td style="font-style: Italic;border-bottom: 1px solid black;border-top: 1px solid black;" :class="[division_details.Total.Details_month_to_date.Sales.Sales_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Total.Details_month_to_date.Sales.Sales_TY_amount,'$')}}</q-td>
                    <q-td  v-if="colspan.MonthToDate.SalesShow" style="font-style: Italic;border-bottom: 1px solid black;border-top: 1px solid black;" :class="[division_details.Total.Details_month_to_date.Sales.Sales_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Total.Details_month_to_date.Sales.Sales_LY_amount,'$')}}</q-td>
                    <q-td style="font-style: Italic;border-bottom: 1px solid black;border-top: 1px solid black;" :class="[division_details.Total.Details_month_to_date.Sales.Sales_vsLY_percent < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Total.Details_month_to_date.Sales.Sales_vsLY_percent,'%')}}%</q-td>
                    <q-td style="background-color: white;padding: 0px;"></q-td>

                    <q-td v-if="colspan.MonthToDate.ScanGPShow1" style="font-style: Italic;border-bottom: 1px solid black;border-top: 1px solid black;" :class="[division_details.Total.Details_month_to_date.Scan_GP.Scan_GP_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Total.Details_month_to_date.Scan_GP.Scan_GP_TY_amount,'$')}}</q-td>
                    <q-td style="font-style: Italic;border-bottom: 1px solid black;border-top: 1px solid black;" :class="[division_details.Total.Details_month_to_date.Scan_GP.Scan_GP_TY_percent < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Total.Details_month_to_date.Scan_GP.Scan_GP_TY_percent,'%')}}%</q-td>
                    <q-td v-if="colspan.MonthToDate.ScanGPShow2" style="font-style: Italic;border-bottom: 1px solid black;border-top: 1px solid black;" :class="[division_details.Total.Details_month_to_date.Scan_GP.Scan_GP_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Total.Details_month_to_date.Scan_GP.Scan_GP_LY_amount,'$')}}</q-td>
                    <q-td style="font-style: Italic;border-bottom: 1px solid black;border-top: 1px solid black;" :class="[division_details.Total.Details_month_to_date.Scan_GP.Scan_GP_LY_percent < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Total.Details_month_to_date.Scan_GP.Scan_GP_LY_percent,'%')}}%</q-td>
                    <q-td style="background-color: white;padding: 0px;"></q-td>

                    <q-td v-if="colspan.MonthToDate.ShrinkageShow1" style="font-style: Italic;border-bottom: 1px solid black;border-top: 1px solid black;" :class="[division_details.Total.Details_month_to_date.Shrinkage.Shrinkage_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Total.Details_month_to_date.Shrinkage.Shrinkage_TY_amount,'$')}}</q-td>
                    <q-td style="font-style: Italic;border-bottom: 1px solid black;border-top: 1px solid black;" :class="[division_details.Total.Details_month_to_date.Shrinkage.Shrinkage_TY_percent < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Total.Details_month_to_date.Shrinkage.Shrinkage_TY_percent,'%')}}%</q-td>
                    <q-td v-if="colspan.MonthToDate.ShrinkageShow2" style="font-style: Italic;border-bottom: 1px solid black;border-top: 1px solid black;" :class="[division_details.Total.Details_month_to_date.Shrinkage.Shrinkage_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Total.Details_month_to_date.Shrinkage.Shrinkage_LY_amount,'$')}}</q-td>
                    <q-td style="font-style: Italic;border-bottom: 1px solid black;border-top: 1px solid black;" :class="[division_details.Total.Details_month_to_date.Shrinkage.Shrinkage_LY_percent < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Total.Details_month_to_date.Shrinkage.Shrinkage_LY_percent,'%')}}%</q-td>
                    <q-td style="background-color: white;padding: 0px;"></q-td>

                    <q-td v-if="colspan.MonthToDate.NetGPShow1" style="font-style: Italic;border-bottom: 1px solid black;border-top: 1px solid black;" :class="[division_details.Total.Details_month_to_date.Net_GP.Net_GP_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Total.Details_month_to_date.Net_GP.Net_GP_TY_amount,'$')}}</q-td>
                    <q-td style="font-style: Italic;border-bottom: 1px solid black;border-top: 1px solid black;" :class="[division_details.Total.Details_month_to_date.Net_GP.Net_GP_TY_percent < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Total.Details_month_to_date.Net_GP.Net_GP_TY_percent,'%')}}%</q-td>
                    <q-td v-if="colspan.MonthToDate.NetGPShow2" style="font-style: Italic;border-bottom: 1px solid black;border-top: 1px solid black;" :class="[division_details.Total.Details_month_to_date.Net_GP.Net_GP_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Total.Details_month_to_date.Net_GP.Net_GP_LY_amount,'$')}}</q-td>
                    <q-td style="font-style: Italic;border-bottom: 1px solid black;border-top: 1px solid black;" :class="[division_details.Total.Details_month_to_date.Net_GP.Net_GP_LY_percent < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Total.Details_month_to_date.Net_GP.Net_GP_LY_percent,'%')}}%</q-td>
                    <q-td style="background-color: white;padding: 0px;"></q-td>

                    <q-td style="font-style: Italic;border-bottom: 1px solid black;border-top: 1px solid black;" :class="[division_details.Total.Details_month_to_date.Stock.Stock_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Total.Details_month_to_date.Stock.Stock_TY_amount,'$')}}</q-td>
                    <q-td v-if="colspan.MonthToDate.StockShow" style="font-style: Italic;border-bottom: 1px solid black;border-top: 1px solid black;" :class="[division_details.Total.Details_month_to_date.Stock.Stock_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Total.Details_month_to_date.Stock.Stock_LY_amount,'$')}}</q-td>
                    <q-td style="font-style: Italic;border-bottom: 1px solid black;border-top: 1px solid black;" :class="[division_details.Total.Details_month_to_date.Stock.Stock_vsLY_percent < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Total.Details_month_to_date.Stock.Stock_vsLY_percent,'%')}}%</q-td>
                    <q-td style="font-style: Italic;border-bottom: 1px solid black;border-top: 1px solid black;" :class="[division_details.Total.Details_month_to_date.Stock.Stock_TY_days < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Total.Details_month_to_date.Stock.Stock_TY_days,'$')}}</q-td>
                    <q-td style="font-style: Italic;border-bottom: 1px solid black;border-top: 1px solid black;" :class="[division_details.Total.Details_month_to_date.Stock.Stock_LY_days < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Total.Details_month_to_date.Stock.Stock_LY_days,'$')}}</q-td>

                    <q-td style="border-top: 0px;border-bottom:0px;"></q-td>

                    <q-td style="font-style: Italic;border-bottom: 1px solid black;border-top: 1px solid black;" :class="[division_details.Total.Details_year_to_date.Sales.Sales_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Total.Details_year_to_date.Sales.Sales_TY_amount,'$')}}</q-td>
                    <q-td v-if="colspan.YearToDate.SalesShow" style="font-style: Italic;border-bottom: 1px solid black;border-top: 1px solid black;" :class="[division_details.Total.Details_year_to_date.Sales.Sales_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Total.Details_year_to_date.Sales.Sales_LY_amount,'$')}}</q-td>
                    <q-td style="font-style: Italic;border-bottom: 1px solid black;border-top: 1px solid black;" :class="[division_details.Total.Details_year_to_date.Sales.Sales_vsLY_percent < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Total.Details_year_to_date.Sales.Sales_vsLY_percent,'%')}}%</q-td>
                    <q-td style="background-color: white;padding: 0px;"></q-td>

                    <q-td v-if="colspan.YearToDate.ScanGPShow1" style="font-style: Italic;border-bottom: 1px solid black;border-top: 1px solid black;" :class="[division_details.Total.Details_year_to_date.Scan_GP.Scan_GP_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Total.Details_year_to_date.Scan_GP.Scan_GP_TY_amount,'$')}}</q-td>
                    <q-td style="font-style: Italic;border-bottom: 1px solid black;border-top: 1px solid black;" :class="[division_details.Total.Details_year_to_date.Scan_GP.Scan_GP_TY_percent < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Total.Details_year_to_date.Scan_GP.Scan_GP_TY_percent,'%')}}%</q-td>
                    <q-td v-if="colspan.YearToDate.ScanGPShow2" style="font-style: Italic;border-bottom: 1px solid black;border-top: 1px solid black;" :class="[division_details.Total.Details_year_to_date.Scan_GP.Scan_GP_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Total.Details_year_to_date.Scan_GP.Scan_GP_LY_amount,'$')}}</q-td>
                    <q-td style="font-style: Italic;border-bottom: 1px solid black;border-top: 1px solid black;" :class="[division_details.Total.Details_year_to_date.Scan_GP.Scan_GP_LY_percent < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Total.Details_year_to_date.Scan_GP.Scan_GP_LY_percent,'%')}}%</q-td>
                    <q-td style="background-color: white;padding: 0px;"></q-td>

                    <q-td v-if="colspan.YearToDate.ShrinkageShow1" style="font-style: Italic;border-bottom: 1px solid black;border-top: 1px solid black;" :class="[division_details.Total.Details_year_to_date.Shrinkage.Shrinkage_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Total.Details_year_to_date.Shrinkage.Shrinkage_TY_amount,'$')}}</q-td>
                    <q-td style="font-style: Italic;border-bottom: 1px solid black;border-top: 1px solid black;" :class="[division_details.Total.Details_year_to_date.Shrinkage.Shrinkage_TY_percent < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Total.Details_year_to_date.Shrinkage.Shrinkage_TY_percent,'%')}}%</q-td>
                    <q-td v-if="colspan.YearToDate.ShrinkageShow2" style="font-style: Italic;border-bottom: 1px solid black;border-top: 1px solid black;" :class="[division_details.Total.Details_year_to_date.Shrinkage.Shrinkage_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Total.Details_year_to_date.Shrinkage.Shrinkage_LY_amount,'$')}}</q-td>
                    <q-td style="font-style: Italic;border-bottom: 1px solid black;border-top: 1px solid black;" :class="[division_details.Total.Details_year_to_date.Shrinkage.Shrinkage_LY_percent < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Total.Details_year_to_date.Shrinkage.Shrinkage_LY_percent,'%')}}%</q-td>
                    <q-td style="background-color: white;padding: 0px;"></q-td>

                    <q-td v-if="colspan.YearToDate.NetGPShow1" style="font-style: Italic;border-bottom: 1px solid black;border-top: 1px solid black;" :class="[division_details.Total.Details_year_to_date.Net_GP.Net_GP_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Total.Details_year_to_date.Net_GP.Net_GP_TY_amount,'$')}}</q-td>
                    <q-td style="font-style: Italic;border-bottom: 1px solid black;border-top: 1px solid black;" :class="[division_details.Total.Details_year_to_date.Net_GP.Net_GP_TY_percent < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Total.Details_year_to_date.Net_GP.Net_GP_TY_percent,'%')}}%</q-td>
                    <q-td v-if="colspan.YearToDate.NetGPShow2" style="font-style: Italic;border-bottom: 1px solid black;border-top: 1px solid black;" :class="[division_details.Total.Details_year_to_date.Net_GP.Net_GP_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Total.Details_year_to_date.Net_GP.Net_GP_LY_amount,'$')}}</q-td>
                    <q-td style="font-style: Italic;border-bottom: 1px solid black;border-top: 1px solid black;" :class="[division_details.Total.Details_year_to_date.Net_GP.Net_GP_LY_percent < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Total.Details_year_to_date.Net_GP.Net_GP_LY_percent,'%')}}%</q-td>
                    <q-td style="background-color: white;padding: 0px;"></q-td>

                    <q-td style="font-style: Italic;border-bottom: 1px solid black;border-top: 1px solid black;" :class="[division_details.Total.Details_year_to_date.Stock.Stock_TY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Total.Details_year_to_date.Stock.Stock_TY_amount,'$')}}</q-td>
                    <q-td v-if="colspan.YearToDate.StockShow" style="font-style: Italic;border-bottom: 1px solid black;border-top: 1px solid black;" :class="[division_details.Total.Details_year_to_date.Stock.Stock_LY_amount < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Total.Details_year_to_date.Stock.Stock_LY_amount,'$')}}</q-td>
                    <q-td style="font-style: Italic;border-bottom: 1px solid black;border-top: 1px solid black;" :class="[division_details.Total.Details_year_to_date.Stock.Stock_vsLY_percent < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Total.Details_year_to_date.Stock.Stock_vsLY_percent,'%')}}%</q-td>
                    <q-td style="font-style: Italic;border-bottom: 1px solid black;border-top: 1px solid black;" :class="[division_details.Total.Details_year_to_date.Stock.Stock_TY_days < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Total.Details_year_to_date.Stock.Stock_TY_days,'$')}}</q-td>
                    <q-td style="font-style: Italic;border-bottom: 1px solid black;border-top: 1px solid black;border-right: 1px solid black;" :class="[division_details.Total.Details_year_to_date.Stock.Stock_LY_days < 0 ? 'negative_value' : '']">{{formatAmount(division_details.Total.Details_year_to_date.Stock.Stock_LY_days,'$')}}</q-td>
                </q-tr>

                <q-tr :props="props">
                    <q-td colspan="52"></q-td>
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
import * as XLSX from 'xlsx';


export default {
    data()
    {
        return{
            loading: true,
            columns: [{}],
            rows:[{}],
            json_data: {
                Division: [],
                Division_Total: {},
                Department: [],
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
            amount_type: true,
            show_expand: true,
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
        exportToExcel() {

            var currentdate = new Date();
            var year = String(currentdate.getFullYear());
            var month = ('0' + (currentdate.getMonth()+1)).slice(-2);
            var date = ('0' + currentdate.getDate()).slice(-2);

            var final_date = year+"-"+month+"-"+date;

            this.loading = true;
            this.show_expand = false;
            

            setTimeout(()=>{

                let table = document.getElementById('table_total_sales_id');

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
        $('.table_total_sales').find('.q-table').attr('id','table_total_sales_id');
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

        // var $el = $('.table_total_sales').find('table').find('thead').find('tr:eq(0)'); 
        // var $el2 = $('.table_total_sales').find('table').find('thead').find('tr:eq(1)'); 
        // var $el3 = $('.table_total_sales').find('table').find('thead').find('tr:eq(2)'); 
        // var $el4 = $('.table_total_sales').find('table').find('thead').find('tr:eq(3)'); 

        // var stickTop = $el.offset();
        
        // var headerHeight = $('.q-header').height();

        // var header_padding_top = $('.table_total_sales').find('.q-table__top').css('padding-top');
        // var header_padding_top = header_padding_top.replace('px','');
        // var header_padding_bottom = $('.table_total_sales').find('.q-table__top').css('padding-bottom');
        // var header_padding_bottom = header_padding_bottom.replace('px','');
        // var total_header_padding = Number(header_padding_top)+Number(header_padding_bottom)

        $('.q-table__middle.q-virtual-scroll').scroll((e)=>{ 

            var $el = $('.table_total_sales').find('table').find('thead').find('tr:eq(0)'); 
            var $el2 = $('.table_total_sales').find('table').find('thead').find('tr:eq(1)'); 
            var $el3 = $('.table_total_sales').find('table').find('thead').find('tr:eq(2)'); 
            var $el4 = $('.table_total_sales').find('table').find('thead').find('tr:eq(3)');

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

.table_total_sales > .q-table__middle > .q-table > thead > tr:nth-child(2) > th, .table_total_sales > .q-table__middle > .q-table > thead > tr:nth-child(3) > th, .table_total_sales > .q-table__middle > .q-table > thead > tr:nth-child(4) > th
{
    font-size: 11px;
    font-weight: bold;
    padding-top: 0px;
    padding-bottom: 0px;
    border-color: black;
}

.table_total_sales > .q-table__middle > .q-table > thead > tr:nth-child(5) > th
{
    font-size: 11px;
    padding-top: 0px;
    padding-bottom: 0px;
    border-color: black;
}

.table_total_sales > .q-table__middle > .q-table > tbody > tr > td
{
    padding-top: 0px;
    padding-bottom: 0px;
    padding-right: 3px;
    font-size: 11px;
    border-color: black;
}

.table_total_sales > .q-table__middle > .q-table > tbody > tr > td:nth-child(n+4) {
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

.table_total_sales > .q-table__middle > .q-table > thead > tr:nth-child(2) > th:nth-child(4),
.table_total_sales > .q-table__middle > .q-table > thead > tr:nth-child(2) > th:nth-child(6)
{
  border-top: 1px solid black !important;
}

* >>> .table_total_sales > .q-table__top
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
.table_total_sales > .q-table__middle > .q-table > thead > tr > th:nth-child(1),
.table_total_sales > .q-table__middle > .q-table > tbody > tr > td:nth-child(1)
{
    min-width: 20px;
    max-width: 20px;
    padding: 0px;
}

/* 
.table_total_sales > .q-table__middle > .q-table > tbody > tr > td:nth-child(1)
{
    background-color: red !important;
    left: 0;
    position: sticky;
}

.table_total_sales > .q-table__middle > .q-table > tbody > tr > td:nth-child(2)
{
    background-color: yellow !important;
    left: 20px;
    position: sticky;
} */

.table_total_sales > .q-table__middle > .q-table > thead > tr:nth-child(1) > th
{
    top: 0;
    position: sticky;
    z-index: 110;
}

.table_total_sales > .q-table__middle > .q-table > thead > tr:nth-child(2) > th
{
    top: v-bind(first_height);
    position: sticky;
    z-index: 110;
}

.table_total_sales > .q-table__middle > .q-table > thead > tr:nth-child(3) > th
{
    top: v-bind(second_height);
    position: sticky;
    z-index: 110;
}

.table_total_sales > .q-table__middle > .q-table > thead > tr:nth-child(4) > th
{
    top: v-bind(third_height);
    position: sticky;
    z-index: 110;
}

.q-inner-loading
{
    z-index: 200;
}


</style>