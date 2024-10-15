<template>
  <div id="report_print" style="padding-left: 25px; padding-right:25px; padding-bottom:25px;">
    <div class="footer full-width">
         <span> Report printed on {{datetime}} </span>
         <span class="text-right">Page {{count}} of {{count}}</span>
    </div>
    <!-- <div class="card_section"> -->
      <!-- <div class="row">
        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
            GRN Audit List - Warning Message Details
        </div>
        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 text-right">
          {{refno}}
        </div>
      </div> -->
    <!-- </div> -->
    <div class="row" style="margin-top: 0px;">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <table style="width: 100%;border-collapse: collapse;">
            <!--place holder for the fixed-position header-->
            <!-- <thead>
              <tr>
                <td>

                  <div class="page-header-space"></div>
                </td>
              </tr>
            </thead> -->
            <tbody>
            <tr>
              <td colspan="5" style="padding-top:20px; padding-bottom: 10px;">
                 <div class="row">
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                      {{header}} Audit List - Warning Message Details
                  </div>
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 text-right">
                    {{refno}}
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th style="border: 1px solid black;text-align: center; width: 10%; font-size: 12px;">No</th>
              <th v-if="header == 'GRN'" style="border: 1px solid black;text-align: center; width: 10%; font-size: 12px;">GR Line</th>
              <th v-if="header == 'PO'" style="border: 1px solid black;text-align: center; width: 10%; font-size: 12px;">PO Line</th>
              <th v-if="header == 'DN'" style="border: 1px solid black;text-align: center; width: 10%; font-size: 12px;">DN Line</th>
              <th v-if="header == 'CN'" style="border: 1px solid black;text-align: center; width: 10%; font-size: 12px;">CN Line</th>
              <th style="border: 1px solid black;text-align: center; width: 20%; font-size: 12px;">Refno /Itemcode</th>
              <th style="border: 1px solid black;text-align: center; width: 40%; font-size: 12px;">Description</th>
              <!-- <th style="padding-left: 5px; padding-right: 5px; border: 1px solid black;text-align: right; font-size: 12px;">Discount Type</th> -->
              <th style="border: 1px solid black;text-align: center; width: 20%; font-size: 12px;">Remarks</th>
            </tr>
            <template  v-for="(data, index) in test" :key="data">
              <tr style="line-height: 1.0;border: 1px solid black; background-color:#E1FDE4;">
                <td style="padding:5px;" class="change_font" colspan="2"></td>
                <td style="padding:5px;" class="change_font" colspan="3">{{ data.message }}</td>
              </tr>
              <template  v-for="item_details in data.item" :key="item_details">
                <tr style="line-height: 1.0;">
                  <td style="border: 1px solid black; padding:5px; font-size: 10px;text-align:right;">{{item_details.no}}</td>
                  <td style="border: 1px solid black; padding:5px; font-size: 10px;text-align:right;">{{item_details.gr_line}}</td>
                  <td style="border: 1px solid black; padding:5px; font-size: 10px;text-align:left;">{{item_details.itemcode}}</td>
                  <td style="border: 1px solid black; padding:5px; font-size: 10px;text-align:left;">{{item_details.description}}</td>
                  <td style="border: 1px solid black; padding:5px; font-size: 10px;text-align:center;">{{item_details.Remarks}}</td>
                </tr>
              </template>
            </template>

          </tbody>
          <tfoot>
            <tr>
              <td>
                <!--place holder for the fixed-position footer-->
                <div class="page-footer-space"></div>
              </td>
            </tr>
          </tfoot>
          </table>
        </div>
    </div>

  </div>
  <div class="row justify-end button_print">
         <Button
           id="myCheck"
           class="button q-pa-sm"
           :text="'Print'"
           :type="'button'"
           v-print="report_print_obj"/>
  </div>
 </template>
 <script>
 import Button from 'src/components/Base/Button';
 import {Loading, QSpinnerTail} from 'quasar';
 import { Notify } from "quasar";
 export default{
   data(){
     return{
      refno:this.$route.query.refno,
      header: this.$route.query.header,
      count:1,
      json: {},
      datetime:"",
      test:[
        {
          message: "SKU Below Cost exist in GRN",
          item:[
            {
              no:"1",
              gr_line:"1",
              itemcode:"100996",
              description:"FARM'S BEST CHICKEN FRANKFURTER GARLIC 3",
              Remarks:"P: 1 C: 2.82"
            },
            {
              no:"2",
              gr_line:"2",
              itemcode:"100996",
              description:"FARM'S BEST CHICKEN FRANKFURTER GARLIC 3",
              Remarks:"P: 1 C: 2.82"
            }
          ]
        },
        {
          message: "SKU Below Cost exist in GRN - with Yield Ratio",
          item:[
            {
              no:"1",
              gr_line:"1",
              itemcode:"100996",
              description:"FARM'S BEST CHICKEN FRANKFURTER GARLIC 3",
              Remarks:"P: 1 C: 2.82"
            }
          ]
        },
        {
          message: "SKU Not Within Pre-set Category Profit Margin Range",
          item:[
            {
              no:"1",
              gr_line:"1",
              itemcode:"100996",
              description:"FARM'S BEST CHICKEN FRANKFURTER GARLIC 3 -- 182.1% (Cat %:5)",
              Remarks:"MLKGR24030004"
            }
          ]
        },
      ],
      report_print_obj: {
             id: "report_print",
             popTitle: '',
             closeCallback (vue) {
               // alert('关闭了打印工具')
               // console.log(vue.trip_guid.trip_guid);
               // vue.$router.push({name: 'TripManagement/DeliveryPlan'});
               // vue.$router.push({
               //     name: "ReplacementPartMilkRun",
               //     params: {  data: JSON.stringify(vue.trip_guid)  },
               // });
               vue.redirectFunction();
             }
       },
     }
   },
   components: {
       Button,
   },
   methods: {
     showLoading()
     {
         // default options
         Loading.show()

         // fully customizable
         Loading.show({
             spinner: QSpinnerTail,
         // other props
         })
     },
     hideLoading()
     {
         setTimeout(function(){
             Loading.hide();
         },300);
     },
     showNotify(type, message) {
             Notify.create({
                 type: type,
                 message: message,
                 timeout: 1000,
                 position: 'top',
                 html: true,
             })
     },
     redirectFunction()
     {
         document.title = 'ERP'
         var  refno =this.$route.query.refno
         if(this.header == 'PO'){
           this.$router.push({name:'EditPurchaseOrder', query: { refno: refno}});
         }else if(this.header == 'GRN'){
           this.$router.push({name:'EditGoodsReceivedNote', query: { refno: refno}});
         }else if(this.header == 'DN'){
           this.$router.push({name:'EditDebitNote', query: { refno: refno}});
         }else if(this.header == 'CN'){
          this.$router.push({name:'EditCreditNote', query: { refno: refno}});
         }

        // sessionStorage.removeItem("printPayload");

         window.close()
   },
   },
   async mounted(){
         this.showLoading();
         var now = new Date();
         var year = now.getFullYear().toString().slice(-2); // Get last two digits of the year
         var month = ('0' + (now.getMonth() + 1)).slice(-2); // Get month with leading zero if necessary
         var day = ('0' + now.getDate()).slice(-2); // Get day with leading zero if necessary
         var hours = ('0' + now.getHours()).slice(-2); // Get hours with leading zero if necessary
         var minutes = ('0' + now.getMinutes()).slice(-2); // Get minutes with leading zero if necessary
         var seconds = ('0' + now.getSeconds()).slice(-2); // Get seconds with leading zero if necessary
         this.datetime =  `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

         await this.$nextTick(() => {
           setTimeout(async()=>{
             if(this.$q.screen.width <  450){
                 var userAgent = navigator.userAgent || navigator.vendor || window.opera;
                 if (/android/i.test(userAgent)) {
                   document.getElementById("myCheck").click();
                   let e = document.getElementById("vue-pirnt-nb-previewBox");
                   setTimeout(()=>{
                     e.querySelector(".previewBodyUtilPrintBtn").click()
                 },350)

                 }

                 if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
                   document.getElementById("myCheck").click();
                   let e = document.getElementById("vue-pirnt-nb-previewBox")
                   setTimeout(()=>{
                     e.querySelector(".previewBodyUtilPrintBtn").click()
                   },350)
                 }
                 //  document.getElementById('myCheck').click();
                 // let e = document.getElementById("vue-pirnt-nb-previewBox");
                 // setTimeout(()=>{
                 // e.querySelector(".previewBodyUtilPrintBtn").click()
                 // },100)

             }else {
               setTimeout(()=>{
                 document.getElementById("myCheck").click();
               },350)
             }

           this.hideLoading();
         },2000);
       });


   }
 }
 </script>
 <style scoped>
 @media print{
  @page {
    margin: 0.5cm ;
  }
  body  {margin: 1.6cm;}

}

/* *>>> table { page-break-inside:auto }
*>>> tr    { page-break-inside:auto; page-break-after:auto;}
*>>> thead { display:table-header-group }
*>>> tfoot { display:table-footer-group } */

/* .page_counter {
  page-break-before: always;
  counter-increment: total;
  content: counter(total) " Pages";
} */

/* .page_num:after{
  counter-increment: page;
  content: "Page " counter(page) " of 1";
} */

.header {
  position: fixed;
  right:0;
  top: 0mm;
  display: flex;
  padding-top: 10px;
  padding-left:25px;
  padding-right:25px;
  justify-content: space-between;
}

.footer {
  position: fixed;
  right:0;
  bottom: 0;
  display: flex;
  padding-top: 10px;
  padding-left:25px;
  padding-right:25px;
  justify-content: space-between;
}
.header, .page-header-space {
  height: 40px;
}
.footer, .page-footer-space {
  height: 40px;
}
 .button_print{
   position: absolute;
   bottom: 20;
   right: 0;
   padding-top: 5px;
   padding-right: 15px;
   padding-bottom: 5px;
   /* position: absolute; */
 }
 </style>
