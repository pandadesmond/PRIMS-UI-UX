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

      <!-- <template v-slot:top>
        Top
      </template> -->

      <template v-slot:header="props">

        <q-tr :props="props" style="background-color: #ffd966; color:black;">

            <!-- <q-th style="background-color: white;position: sticky; left: 0;background-color:white;z-index: 120;"></q-th>
            <q-th style="min-width: 30px;max-width: 30px;border: 0px;background-color: white;position:sticky;left: 20px;z-index:120;"></q-th> -->
            <q-th style="min-width: 80px;max-width: 80px; color: white;position:sticky;left: 0px;z-index:120; background-color: white; border: 0px; border-bottom: 1px solid black;"></q-th>

            <q-th style="min-width: 60px;border: 0px; border-bottom: 1px solid black;"></q-th>
            <q-th style="min-width: 100px; border: 0px; border-bottom: 1px solid black;"></q-th>
            <q-th style="min-width: 60px;border-left: 1px solid black;border-top: 1px solid black; border-bottom: 1px solid black; border-bottom: 1px solid black;">Div 2</q-th>
            <q-th style="min-width: 60px;border-left: 1px solid black;border-top: 1px solid black; border-bottom: 1px solid black;">Div 1</q-th>
            <q-th style="min-width: 60px;border-left: 1px solid black;border-top: 1px solid black; border-bottom: 1px solid black;">MTD 2021</q-th>
            <q-th style="min-width: 60px;border-left: 1px solid black;border-top: 1px solid black; border-bottom: 1px solid black;">YTD 2021</q-th>
            <q-th style="padding: 0px;min-width: 5px;max-width: 5px;background-color: white; border-left: 1px solid black; border-bottom: 0px;"></q-th>

            <q-th style="min-width: 60px;border-left: 1px solid black;border-top: 1px solid black; border-bottom: 1px solid black;">MTD 2020</q-th>
            <q-th style="min-width: 60px;border-left: 1px solid black;border-top: 1px solid black; border-bottom: 1px solid black;">YTD 2020</q-th>
            <q-th style="padding: 0px;min-width: 5px;max-width: 5px; background-color: white; border-left: 1px solid black; border-bottom: 0px;"></q-th>

            <q-th style="min-width: 60px;border-left: 1px solid black;border-top: 1px solid black; border-bottom: 1px solid black;">01/21</q-th>
            <q-th style="min-width: 60px;border-left: 1px solid black;border-top: 1px solid black; border-bottom: 1px solid black;">02/21</q-th>
            <!-- <q-th style="padding: 0px;min-width: 5px;max-width: 5px;">02/21</q-th> -->

            <q-th style="min-width: 60px;border-left: 1px solid black;border-top: 1px solid black; border-bottom: 1px solid black;">03/21</q-th>
            <q-th style="min-width: 60px;border-left: 1px solid black;border-top: 1px solid black; border-bottom: 1px solid black;">04/21</q-th>
            <q-th style="min-width: 60px;border-left: 1px solid black;border-top: 1px solid black; border-bottom: 1px solid black;">05/21</q-th>
            <q-th style="min-width: 60px;border-left: 1px solid black;border-top: 1px solid black; border-bottom: 1px solid black;">06/21</q-th>
            <q-th style="min-width: 60px;border-left: 1px solid black;border-top: 1px solid black; border-bottom: 1px solid black;">07/21</q-th>
            <!-- <q-th style="padding: 0px;min-width: 5px;max-width: 5px;">07/21</q-th> -->

            <q-th style="min-width: 60px;border-left: 1px solid black;border-top: 1px solid black; border-bottom: 1px solid black;">08/21</q-th>
            <q-th style="min-width: 60px;border-left: 1px solid black;border-top: 1px solid black; border-bottom: 1px solid black;">09/21</q-th>
            <q-th style="min-width: 60px;border-left: 1px solid black;border-top: 1px solid black; border-bottom: 1px solid black;">10/21</q-th>
            <q-th style="min-width: 60px;border-left: 1px solid black;border-top: 1px solid black; border-bottom: 1px solid black;">11/21</q-th>
            <q-th style="min-width: 60px;border-left: 1px solid black;border-top: 1px solid black; border-bottom: 1px solid black;">12/21</q-th>
            <!-- <q-th style="padding: 0px;min-width: 5px;max-width: 5px;">12/21</q-th> -->

            <q-th style="min-width: 60px;border-left: 1px solid black;border-top: 1px solid black; border-bottom: 1px solid black;">01/22</q-th>
            <q-th style="min-width: 60px;border-left: 1px solid black;border-top: 1px solid black; border-bottom: 1px solid black;">02/22</q-th>
            <q-th style="min-width: 60px;border-left: 1px solid black;border-top: 1px solid black; border-bottom: 1px solid black;">03/22</q-th>
            <q-th style="min-width: 60px;border-left: 1px solid black;border-top: 1px solid black; border-bottom: 1px solid black;">04/22</q-th>
            <q-th style="min-width: 60px;border-left: 1px solid black;border-top: 1px solid black; border-bottom: 1px solid black;">05/22</q-th>

            <!-- <q-th style="min-width: 10px;max-width: 10px; border-top: 0px;border-bottom:0px;background-color: white;"></q-th> -->

            <q-th style="min-width: 60px;border-left: 1px solid black;border-top: 1px solid black; border-bottom: 1px solid black;">06/22</q-th>
            <q-th style="min-width: 60px;border-left: 1px solid black;border-top: 1px solid black; border-bottom: 1px solid black;">07/22</q-th>
            <q-th style="min-width: 60px;border-left: 1px solid black;border-top: 1px solid black; border-bottom: 1px solid black;">08/22</q-th>
            <q-th style="min-width: 60px;border-left: 1px solid black;border-top: 1px solid black; border-bottom: 1px solid black;">09/22</q-th>
            <!-- <q-th style="padding: 0px;min-width: 5px;max-width: 5px;">09/22</q-th> -->

            <q-th style="min-width: 60px;border-left: 1px solid black;border-top: 1px solid black; border-bottom: 1px solid black;">10/22</q-th>
            <q-th style="min-width: 60px;border-left: 1px solid black;border-top: 1px solid black; border-bottom: 1px solid black;">11/22</q-th>
            <q-th style="min-width: 60px;border-left: 1px solid black;border-top: 1px solid black; border-bottom: 1px solid black;">12/22</q-th>

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

<!--add in-->
            <template v-for="(division_details, index) in json_data.Division" :key="division_details">
                
                <q-tr :props="props" v-if="division_details.Main">

                    <q-td v-if="index == 0" :rowspan="json_data.Total_Line" style="color: white;position:sticky;left: 0px;z-index:120; background-color: #4472c4; border: 0px;text-align: center;font-size: 15px;border-bottom: 1px solid black;"><span STYLE="writing-mode: vertical-lr; transform: rotate(180deg);font-weight: bold;">TOTAL</span></q-td>

                    <q-td :style="['border: 0px;', index > 0 ? 'border-top: 1px solid black;' : '']"></q-td>
                    <q-td :style="['background-color: #92b9ff;', index > 0 ? 'border-top: 1px solid black;' : '']">{{division_details.Main.Title}}</q-td>
                    <q-td :style="[index > 0 ? 'border-top: 1px solid black;' : '']"></q-td>
                    <q-td :style="[index > 0 ? 'border-top: 1px solid black;' : '']"></q-td>
                    <q-td :style="[index > 0 ? 'border-top: 1px solid black;' : '']"></q-td>
                    <q-td :style="[index > 0 ? 'border-top: 1px solid black;' : '']"></q-td>
                    
                    <q-td></q-td>

                    <q-td :style="[index > 0 ? 'border-top: 1px solid black;' : '']"></q-td>
                    <q-td :style="[index > 0 ? 'border-top: 1px solid black;' : '']"></q-td>

                    <q-td></q-td>

                    <q-td :style="[index > 0 ? 'border-top: 1px solid black;' : '']"></q-td>
                    <q-td :style="[index > 0 ? 'border-top: 1px solid black;' : '']"></q-td>
                    <q-td :style="[index > 0 ? 'border-top: 1px solid black;' : '']"></q-td>
                    <q-td :style="[index > 0 ? 'border-top: 1px solid black;' : '']"></q-td>
                    <q-td :style="[index > 0 ? 'border-top: 1px solid black;' : '']"></q-td>
                    <q-td :style="[index > 0 ? 'border-top: 1px solid black;' : '']"></q-td>
                    <q-td :style="[index > 0 ? 'border-top: 1px solid black;' : '']"></q-td>
                    <q-td :style="[index > 0 ? 'border-top: 1px solid black;' : '']"></q-td>
                    <q-td :style="[index > 0 ? 'border-top: 1px solid black;' : '']"></q-td>
                    <q-td :style="[index > 0 ? 'border-top: 1px solid black;' : '']"></q-td>
                    <q-td :style="[index > 0 ? 'border-top: 1px solid black;' : '']"></q-td>
                    <q-td :style="[index > 0 ? 'border-top: 1px solid black;' : '']"></q-td>
                    <q-td :style="[index > 0 ? 'border-top: 1px solid black;' : '']"></q-td>
                    <q-td :style="[index > 0 ? 'border-top: 1px solid black;' : '']"></q-td>
                    <q-td :style="[index > 0 ? 'border-top: 1px solid black;' : '']"></q-td>
                    <q-td :style="[index > 0 ? 'border-top: 1px solid black;' : '']"></q-td>
                    <q-td :style="[index > 0 ? 'border-top: 1px solid black;' : '']"></q-td>
                    <q-td :style="[index > 0 ? 'border-top: 1px solid black;' : '']"></q-td>
                    <q-td :style="[index > 0 ? 'border-top: 1px solid black;' : '']"></q-td>
                    <q-td :style="[index > 0 ? 'border-top: 1px solid black;' : '']"></q-td>
                    <q-td :style="[index > 0 ? 'border-top: 1px solid black;' : '']"></q-td>
                    <q-td :style="[index > 0 ? 'border-top: 1px solid black;' : '']"></q-td>
                    <q-td :style="[index > 0 ? 'border-top: 1px solid black;' : '']"></q-td>
                    <q-td :style="[index > 0 ? 'border-top: 1px solid black;' : '']"></q-td>
                </q-tr>
                
                <template v-for="(child_details, child_index) in division_details.Child" :key="child_details">
                    <q-tr :props="props">

                        <q-td style="border: 0px;"></q-td>
                        <q-td>{{child_details.Title}}</q-td>
                        <q-td>{{child_details.Div2}}</q-td>
                        <q-td>{{child_details.Div1}}</q-td>
                        <q-td v-html="formatAmount(child_details.MTD_TY,'$')"></q-td>
                        <q-td v-html="formatAmount(child_details.MTD_LY,'$')"></q-td>

                        <q-td></q-td>

                        <q-td v-html="formatAmount(child_details.YTD_TY,'$')"></q-td>
                        <q-td v-html="formatAmount(child_details.YTD_LY,'$')"></q-td>
                        
                        <q-td></q-td>
                        
                        <q-td v-html="formatAmount(child_details.LY_01,'$')"></q-td>
                        <q-td v-html="formatAmount(child_details.LY_02,'$')"></q-td>
                        <q-td v-html="formatAmount(child_details.LY_03,'$')"></q-td>
                        <q-td v-html="formatAmount(child_details.LY_04,'$')"></q-td>
                        <q-td v-html="formatAmount(child_details.LY_05,'$')"></q-td>
                        <q-td v-html="formatAmount(child_details.LY_06,'$')"></q-td>
                        <q-td v-html="formatAmount(child_details.LY_07,'$')"></q-td>
                        <q-td v-html="formatAmount(child_details.LY_08,'$')"></q-td>
                        <q-td v-html="formatAmount(child_details.LY_09,'$')"></q-td>
                        <q-td v-html="formatAmount(child_details.LY_10,'$')"></q-td>
                        <q-td v-html="formatAmount(child_details.LY_11,'$')"></q-td>
                        <q-td v-html="formatAmount(child_details.LY_12,'$')"></q-td>
                        <q-td v-html="formatAmount(child_details.TY_01,'$')"></q-td>
                        <q-td v-html="formatAmount(child_details.TY_02,'$')"></q-td>
                        <q-td v-html="formatAmount(child_details.TY_03,'$')"></q-td>
                        <q-td v-html="formatAmount(child_details.TY_04,'$')"></q-td>
                        <q-td v-html="formatAmount(child_details.TY_05,'$')"></q-td>
                        <q-td v-html="formatAmount(child_details.TY_06,'$')"></q-td>
                        <q-td v-html="formatAmount(child_details.TY_07,'$')"></q-td>
                        <q-td v-html="formatAmount(child_details.TY_08,'$')"></q-td>
                        <q-td v-html="formatAmount(child_details.TY_09,'$')"></q-td>
                        <q-td v-html="formatAmount(child_details.TY_10,'$')"></q-td>
                        <q-td v-html="formatAmount(child_details.TY_11,'$')"></q-td>
                        <q-td v-html="formatAmount(child_details.TY_12,'$')"></q-td>

                    </q-tr>
                </template>

                <q-tr :props="props" v-if="division_details.Total" style="background-color: yellow; font-weight: bold;">

                    <q-td style="border: 0px;background-color: white; border-bottom: 1px solid black;"></q-td>
                    <q-td style="background-color: white; border-bottom: 1px solid black;"></q-td>
                    <q-td style="border-bottom: 1px solid black;">{{division_details.Total.Div2}}</q-td>
                    <q-td style="border-bottom: 1px solid black;">{{division_details.Total.Div1}}</q-td>
                    <q-td style="border-bottom: 1px solid black;" v-html="formatAmount(division_details.Total.MTD_TY,'$')"></q-td>
                    <q-td style="border-bottom: 1px solid black;" v-html="formatAmount(division_details.Total.MTD_LY,'$')"></q-td>

                    <q-td style="background-color: white;" class="remove_border"></q-td>

                    <q-td style="border-bottom: 1px solid black;" v-html="formatAmount(division_details.Total.YTD_TY,'$')"></q-td>
                    <q-td style="border-bottom: 1px solid black;" v-html="formatAmount(division_details.Total.YTD_LY,'$')"></q-td>
                    
                    <q-td style="background-color: white;" class="remove_border"></q-td>
                    
                    <q-td style="border-bottom: 1px solid black;" v-html="formatAmount(division_details.Total.LY_01,'$')"></q-td>
                    <q-td style="border-bottom: 1px solid black;" v-html="formatAmount(division_details.Total.LY_02,'$')"></q-td>
                    <q-td style="border-bottom: 1px solid black;" v-html="formatAmount(division_details.Total.LY_03,'$')"></q-td>
                    <q-td style="border-bottom: 1px solid black;" v-html="formatAmount(division_details.Total.LY_04,'$')"></q-td>
                    <q-td style="border-bottom: 1px solid black;" v-html="formatAmount(division_details.Total.LY_05,'$')"></q-td>
                    <q-td style="border-bottom: 1px solid black;" v-html="formatAmount(division_details.Total.LY_06,'$')"></q-td>
                    <q-td style="border-bottom: 1px solid black;" v-html="formatAmount(division_details.Total.LY_07,'$')"></q-td>
                    <q-td style="border-bottom: 1px solid black;" v-html="formatAmount(division_details.Total.LY_08,'$')"></q-td>
                    <q-td style="border-bottom: 1px solid black;" v-html="formatAmount(division_details.Total.LY_09,'$')"></q-td>
                    <q-td style="border-bottom: 1px solid black;" v-html="formatAmount(division_details.Total.LY_10,'$')"></q-td>
                    <q-td style="border-bottom: 1px solid black;" v-html="formatAmount(division_details.Total.LY_11,'$')"></q-td>
                    <q-td style="border-bottom: 1px solid black;" v-html="formatAmount(division_details.Total.LY_12,'$')"></q-td>
                    <q-td style="border-bottom: 1px solid black;" v-html="formatAmount(division_details.Total.TY_01,'$')"></q-td>
                    <q-td style="border-bottom: 1px solid black;" v-html="formatAmount(division_details.Total.TY_02,'$')"></q-td>
                    <q-td style="border-bottom: 1px solid black;" v-html="formatAmount(division_details.Total.TY_03,'$')"></q-td>
                    <q-td style="border-bottom: 1px solid black;" v-html="formatAmount(division_details.Total.TY_04,'$')"></q-td>
                    <q-td style="border-bottom: 1px solid black;" v-html="formatAmount(division_details.Total.TY_05,'$')"></q-td>
                    <q-td style="border-bottom: 1px solid black;" v-html="formatAmount(division_details.Total.TY_06,'$')"></q-td>
                    <q-td style="border-bottom: 1px solid black;" v-html="formatAmount(division_details.Total.TY_07,'$')"></q-td>
                    <q-td style="border-bottom: 1px solid black;" v-html="formatAmount(division_details.Total.TY_08,'$')"></q-td>
                    <q-td style="border-bottom: 1px solid black;" v-html="formatAmount(division_details.Total.TY_09,'$')"></q-td>
                    <q-td style="border-bottom: 1px solid black;" v-html="formatAmount(division_details.Total.TY_10,'$')"></q-td>
                    <q-td style="border-bottom: 1px solid black;" v-html="formatAmount(division_details.Total.TY_11,'$')"></q-td>
                    <q-td style="border-bottom: 1px solid black;" v-html="formatAmount(division_details.Total.TY_12,'$')"></q-td>
                </q-tr>

                <q-tr :props="props" v-if="(index+1) != json_data.Division.length" style="background-color: white;">
                    <q-td colspan="34"></q-td>
                </q-tr>

            </template>

            <q-tr v-if="json_data.Division.length <= 0">
                <q-td colspan="2"></q-td>
                <q-td colspan="32" style="border: 1px solid black; text-align: center; font-weight: bold;">No data</q-td>
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

      <q-inner-loading :showing="loading">
        <q-spinner-gears size="50px" color="primary" />
      </q-inner-loading>
    </q-card>

    
  </div>
</template>

<script>
import $ from 'jquery';

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
        }
    },
    props: ['pass_data','forceLoading','pass_table_title'],
    methods:{
        formatAmount(value, type)
        {
            var ori_value = value;

            if(type == "$")
            {
                var value = Number(value).toFixed(0);
            }
            else if(type == "%")
            {
                var value = Number(value).toFixed(0);
            }
            else
            {
                var value = value;
            }

            if(isNaN(value))
            {
                return ori_value;
            }//when value given is (-) dash or number that cannot be identified


            var html = '';

            var parts = value.toString().split(".");
            const numberPart = parts[0];
            const decimalPart = parts[1];
            const thousands = /\B(?=(\d{3})+(?!\d))/g;
    // return numberPart.replace(thousands, ",") + (decimalPart ? "." + decimalPart : "");
    
            if(value < 0)
            {
                var value = (numberPart.replace(thousands, ",") + (decimalPart ? "." + decimalPart : "")).replace(/-/, '');
                html += '<span style="float: left;">-</span>'+value;
            }
            else
            {
                html += '<span>'+numberPart.replace(thousands, ",") + (decimalPart ? "." + decimalPart : "")+'</span>';
            }

            return html;
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

        var $el = $('.table_total_sales').find('table').find('thead').find('tr:eq(0)'); 
        var $el2 = $('.table_total_sales').find('table').find('thead').find('tr:eq(1)'); 
        var $el3 = $('.table_total_sales').find('table').find('thead').find('tr:eq(2)'); 
        var $el4 = $('.table_total_sales').find('table').find('thead').find('tr:eq(3)'); 

        // var stickTop = $el.offset();
        
        // var headerHeight = $('.q-header').height();

        // var header_padding_top = $('.table_total_sales').find('.q-table__top').css('padding-top');
        // var header_padding_top = header_padding_top.replace('px','');
        // var header_padding_bottom = $('.table_total_sales').find('.q-table__top').css('padding-bottom');
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

.table_total_sales > .q-table__middle > .q-table > tbody > tr > td:nth-child(n+5) {
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

.table_total_sales > .q-table__middle > .q-table > tbody > tr:last-child > td:not(.remove_border)
{
    border-bottom: 1px solid black !important;
}


</style>