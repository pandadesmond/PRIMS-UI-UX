<template>
    <div class="bg-white">
        <div class="row justify-end q-pa-md">
            <q-btn icon="print" color="primary" text-color="white" @click="handlePrint"></q-btn>
        </div>
        <div id="report_print" v-if="!loading" class="row">
            <div class="col-12">
                <div class="row">
                    <div v-if="json.company" class="col-8 border">
                        <div class="row small_text" ><span>Invoice Issued By</span></div>
                        <div class="row text-bold q-my-md"><span>{{json.company.name}}</span></div>
                        <div class="row q-my-sm medium_text" >
                            <div class="col-6">
                                <span>{{json.company.address_1}}</span><br/>
                                <span>{{json.company.address_2}}</span><br/>
                                <span>{{json.company.address_3}}</span><br/>
                                <span>{{json.company.address_4}}</span>
                            </div>
                        </div>
                        <div class="row q-my-sm medium_text" >
                            <div class="col-6">
                                <span>Tel: {{json.company.telephone}}</span><br/>
                                <span>Fax: {{json.company.fax}}</span>
                            </div>
                        </div>
                        
                        <div class="row q-mt-sm medium_text" >
                            <div class="col-12">
                                <div class="row">
                                    <div class="col-6">
                                        <span>TIN: {{json.company.tin}}</span>
                                    </div>
                                    <div class="col-6">
                                        <span>SST No: {{json.company.sst}}</span>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-6">
                                        <span>BRN: {{json.company.old_reg_no}}</span>
                                    </div>
                                    <div class="col-6">
                                        <span>MSIC Code: {{json.company.fax}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="row border" style="height:40%">
                            <div class="col-12 small_text" ><span>Document Type</span></div>
                            <div class="col-12 text-center text-bold"><span>Invoice</span></div>
                        </div>
                        <div class="row border" style="height:60%">
                            <div class="col-12 small_text" ><span>Invoice Refno</span></div>
                            <div class="col-12">
                                <q-card class="q-ma-md text-center" bordered flat>Invoice Bardcode</q-card>
                            </div>
                            <div class="col-12 text-center"><span>{{json.refno}}</span></div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div v-if="json.vendor" class="col-8 border">
                        <div class="row small_text" ><span>Invoice Issued To</span></div>
                        <div class="row text-bold q-my-md"><span>{{json.vendor.name}}</span></div>
                        <div class="row q-my-sm medium_text" >
                            <div class="col-6">
                                <span>{{json.vendor.address1}}</span><br/>
                                <span>{{json.vendor.address2}}</span><br/>
                                <span>{{json.vendor.address3}}</span><br/>
                                <span>{{json.vendor.postcode}} {{json.vendor.city}}</span>
                            </div>
                        </div>
                        <div class="row q-my-sm medium_text" >
                            <div class="col-6">
                                <span>Tel: {{json.vendor.telephone}}</span><br/>
                                <span>Fax: {{json.vendor.fax_no}}</span>
                            </div>
                        </div>
                        
                        <div class="row q-mt-sm medium_text" >
                            <div class="col-12">
                                <div class="row">
                                    <div class="col-6">
                                        <span>TIN: {{json.vendor.tin}}</span>
                                    </div>
                                    <div class="col-6">
                                        <span>SST No: {{json.vendor.sst_no}}</span>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-6">
                                        <span>BRN: {{json.vendor.old_brn}}</span>
                                    </div>
                                    <div class="col-6">
                                        <span>MSIC Code: {{json.vendor.lhdn_msic_code}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="row border" style="display: flex; flex-direction: column; gap: 8px; font-size: 10px;">
                            <div class="col-12"><span>Reference: </span></div>
                            <div class="col-12"><span>Invoice Date: {{displayDate(json.date,'yyyy-mm-dd')}}</span></div>
                            <div class="col-12"><span>Calculation Period: {{displayDate(json.effective_date_from,'yyyy-mm-dd')}} to {{displayDate(json.effective_date_to,'yyyy-mm-dd')}}</span></div>
                            <div class="col-12"><span>Vendor ID: {{json.vendor_code}}</span></div>
                            <div class="col-12"><span>TTA No: {{json.tta_refno}}</span></div>
                            <div class="col-12"><span>TTA PIC: {{json.tta_pic}}</span></div>
                            <div class="col-12"><span>Remarks: <span style="white-space: pre-line;">{{json.remarks}}</span></span></div>
                        </div>
                        <div class="row border" style="flex-grow: 1;">
                            <div class="col-12 small_text" ><span>Total Amount Including Tax</span></div>
                            <div class="col-12 text-center text-bold"><span>{{formatAmount(json.total_incl_tax,'$')}}</span></div>
                        </div>
                    </div>
                </div>

                <div class="column border">
                    <div v-if="json.child" class="col-8">
                        <div class="q-my-lg">
                            <table class="col-12">
                                <tr class="text-center">
                                    <td><span>Line</span></td>
                                    <td style="width:30%"><span>Description</span></td>
                                    <td><span>Outlet</span></td>
                                    <td><span>Amount</span></td>
                                    <td><span>Qty</span></td>
                                    <td><span>Rate</span></td>
                                    <td><span>Type</span></td>
                                    <td><span>Total Price</span></td>
                                    <td><span>Tax Rate</span></td>
                                    <td><span>Tax Amount</span></td>
                                    <td><span>Total Amount Including Tax</span></td>
                                </tr>

                                <tr v-for="(child,index) in json.child" :key="index" class="text-center">
                                    <td><span>{{index+1}}</span></td>
                                    <td class="text-left"><span>{{child.description}}</span></td>
                                    <td><span>{{child.outlet_code}}</span></td>
                                    <td><span>{{formatAmount(child.amount,'$')}}</span></td>
                                    <td><span>{{formatAmount(child.qty,'qty')}}</span></td>
                                    <td><span>{{formatAmount(child.rate,'%')}}</span></td>
                                    <td><span>{{child.type}}</span></td>
                                    <td><span>{{formatAmount(child.totalprice,'$')}}</span></td>
                                    <td><span>{{formatAmount(child.tax_rate,'%')}}</span></td>
                                    <td><span>{{formatAmount(child.tax_amount,'$')}}</span></td>
                                    <td><span>{{formatAmount(child.total_incl_tax,'$')}}</span></td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <div class="col-4">
                        <div><span> PLEASE QUOTE THE ABOVE INVOICE NO. IN YOUR CORRESPONDENCE TO US </span></div>
                        <div class="text-italic" small_text><span> This is a computer generated document. No signature is required.</span></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Button from 'src/components/PRIMS/Main/Button';
import { Notify } from "quasar";

export default {
    components:{
        Button,
    },
    data() {
       return {
            json: {},
            currentInv: "",
            loading: true,
            report_print_obj: {
                id: 'report_print',
                popTitle: 'test',
                closeCallback (vue) {
                    console.log('close1')
                    vue.redirectFunction();
                }
            },
            report_print_obj_preview: {
                id: 'report_print',
                preview: true,
                previewTitle: 'Preview',
                previewPrintBtnLabel: 'Print',
                popTitle: 'test',
                previewOpenCallback (vue) {
                    let e = document.getElementById("vue-print-nb-previewBox");
                    let previewCloseButton = e.querySelector(".previewClose");
                    previewCloseButton.addEventListener("click", vue.redirectFunction());
                }
            },
       } 
    },
    async mounted(){
        this.loading = true;

        if(this.$route.query.invoice_guid == "")
        {
            this.showNotify('negative', 'Unable to identify Invoice Guid.');
            this.$router.push({name: "invoice"});
        }

        this.currentInv = this.$route.query.invoice_guid;

        var payload = {
            'invoice_guid': this.currentInv,
        }

        var pass_obj = {
            "dispatch": 'transaction/trigger_get_invoice',
            "getter": 'transaction/get_invoice',
            "app": this,
            "payload": payload,
        }

        var invoice_details = await this.$dispatch(pass_obj);
        
        if(invoice_details.status)
        {
            this.json = invoice_details.response.data;

            var payload = {
                params: {
                    'invoice_guid': this.json.invoice_guid,
                    'ordering': 'line',
                    'limit': 99999,
                }
            }
            var pass_obj = {
                "dispatch": 'transaction/trigger_get_invoice_child_list',
                "getter": 'transaction/get_invoice_child',
                "app": this,
                "payload": payload,
            };

            var invoice_child_list = await this.$dispatch(pass_obj);

            if(invoice_child_list.status)
            {
                this.json.child = invoice_child_list.response.data.results;
            }

            var payload = {
                'company_info_guid': this.json.company_info_guid,
            }

            var pass_obj = {
                "dispatch": 'general/trigger_get_company_info',
                "getter": 'general/get_company_info',
                "app": this,
                "payload": payload,
            }

            var response = await this.$dispatch(pass_obj);

            if(response.status)
            {
                this.json.company = response.response.data;
            }

            var payload = {
                'supplier_guid': this.json.supplier_guid,
            }

            var pass_obj = {
                "dispatch": 'general/trigger_get_supplier',
                "getter": 'general/get_supplier',
                "app": this,
                "payload": payload,
            }

            var response = await this.$dispatch(pass_obj);

            if(response.status)
            {
                this.json.vendor = response.response.data;
            }

        }
        console.log(this.json)
        this.$nextTick(()=>{
            setTimeout(()=>{
                this.handlePrint();
            },500)
        })
        this.loading = false;
    },
    methods:{
        formatAmount(value, type) {
            if (value === null || value === undefined) {
                return 'Loading...';
            }

            value = Number(value);
            if (isNaN(value)) {
                console.error("Invalid value:", value);
                return '';
            }

            if (type === "$") {
                value = value.toFixed(2);
            } else if (type === "%") {
                value = value.toFixed(1);
            } else if (type === "qty") {
                value = value.toFixed(0);
            }

            const parts = value.toString().split(".");
            const numberPart = parts[0];
            const decimalPart = parts[1];

            const thousands = /\B(?=(\d{3})+(?!\d))/g;
            const formattedNumber = numberPart.replace(thousands, ",");

            return formattedNumber + (decimalPart ? "." + decimalPart : "");
        },
        handlePrint()
        {
            window.onafterprint = () => {
                this.$router.go(-1);
            };
            window.print();
        },
        displayDate(date, format)
        {
            var curDate = new Date(date);
            var day = curDate.getDate();
            var month = curDate.getMonth() +1;
            var year = curDate.getFullYear();

            const formatRegex = /dd|mm|yyyy|yy/g;

            const formattedDate = format.replace(formatRegex, (match) => {
                switch (match) {
                    case 'dd': return day;
                    case 'mm': return month;
                    case 'yyyy': return year;
                    case 'yy': return year.slice(-2);
                    default: return match;
                }
            });

            return formattedDate;
        },
        showNotify(type, message) 
        {
            if(type == "negative")
            {
                Notify.create({
                    group: 'my-group',
                    type: type,
                    message: message,
                    html: true,
                    timeout: 99999999999,
                    position: 'top',
                    actions: [
                        { icon: 'close', color: 'white', round: true, handler: () => { /* ... */ } }
                    ],
                    badgeStyle: "opacity: 0",
                })
            }

            if(type == "positive")
            {
                Notify.create({
                    group: 'my-group',
                    type: type,
                    message: message,
                    html: true,
                    timeout: 1000,
                    position: 'top',
                    badgeStyle: "opacity: 0",

                })
            }

            if(type == "info")
            {
                    Notify.create({
                    type: type,
                    message: message,
                    timeout: 99999999,
                    position: 'top',
                    badgeStyle: "opacity: 0",
                    html: true,
                    actions: [
                        { label: 'OK', color: 'white', round: true, handler: () => { } }
                    ]
                })
            }
        },
    }
}
</script>

<style scoped>
table
{
    font-size: 10px;
    width: 100%;
    border-collapse: collapse;
    background-color:white;
}

td {
    border: 1px solid #b2b5ba;
    padding: 2px 8px;
}

.small_text{
    font-size: 10px;
}

.medium_text{
    font-size: 11px;;
}

.border {
    border: 1px solid #b2b5ba;
    padding: 20px;
}

@media print{
  /* @page {margin: 0.5cm; size: landscape} */
  @page {margin: 0.5cm; size: portrait; }
  body { margin: 1.6cm; }

  table tr:first-child {
    background-color: #e6e6e6;
    -webkit-print-color-adjust: exact; /* Ensures background color is printed */
  }

  .header_row
  {
    padding: 3px !important;
    max-height: 15px;
  }

  .wider_col
  {
    width: 18%
  }
}
</style>