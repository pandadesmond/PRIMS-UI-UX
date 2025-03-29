<template>
    <div class="bg-white">
        <div class="row justify-end q-pa-md">
            <q-btn icon="print" color="primary" text-color="white" @click="handlePrint"></q-btn>
        </div>
        <div id="report_print" v-if="!loading" class="row">
            <div class="col-12">
                <div class="row">
                    <div v-if="json.company" class="col-8 border">
                        <div class="row small_text" ><span>{{transaction_name}} Issued By</span></div>
                        <div class="row text-bold q-my-md"><span>{{json.company.name}}</span></div>
                        <div class="row q-my-sm medium_text" >
                            <div class="col-9 text-uppercase">
                                <span>{{json.company.address_1}}</span><br v-if="json.company.address_2"/>
                                <span>{{json.company.address_2}}</span><br v-if="json.company.address_3"/>
                                <span>{{json.company.address_3}}</span><br v-if="json.company.address_4 || json.company.address_5"/>
                                <span>{{json.company.address_4}} {{json.company.address_5}}</span>
                            </div>
                        </div>
                        <div class="row q-my-sm medium_text" >
                            <div class="col-6">
                                <span>Tel: {{json.company.telephone}}</span><br/>
                                <span>Fax: {{json.company.fax}}</span>
                            </div>
                        </div>
                        
                        <div class="row q-mt-sm medium_text" >
                            <div class="col-9">
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
                            <div class="col-12 text-center text-bold"><span>{{transaction_name}}</span></div>
                        </div>
                        <div class="row border" style="height:60%">
                            <div class="col-12 small_text" ><span>{{transaction_name}} Refno</span></div>
                            <div class="col-12 text-center" width="100%">
                                <q-card v-if="barcode_src==''" class="q-ma-md text-center" bordered flat>{{transaction_name}} Barcode</q-card>
                                <img v-else :src="barcode_src" alt="Barcode" style="max-width: 100%; height: auto;" />
                            </div>
                            <div v-if="barcode_src==''" class="col-12 text-center"><span>{{json.refno}}</span></div>
                        </div>
                    </div>
                </div>

                <div class="row" style="align-items: stretch">
                    <div v-if="json.vendor" class="col-8 border">
                        <div class="row small_text" ><span>{{transaction_name}} Issued To</span></div>
                        <div class="row text-bold q-my-md"><span>{{json.vendor.name}}</span></div>
                        <div class="row q-my-sm medium_text" >
                            <div class="col-9 text-uppercase">
                                <span>{{json.vendor.address1}}</span><br v-if="json.vendor.address2"/>
                                <span>{{json.vendor.address2}}</span><br v-if="json.vendor.address3"/>
                                <span>{{json.vendor.address3}}</span><br v-if="json.vendor.postcode || json.vendor.city || json.vendor.country"/>
                                <span>{{json.vendor.postcode}} {{json.vendor.city}} {{json.vendor.country}}</span>
                            </div>
                        </div>
                        <div class="row q-my-sm medium_text" >
                            <div class="col-6">
                                <span>Tel: {{json.vendor.telephone}}</span><br/>
                                <span>Fax: {{json.vendor.fax_no}}</span>
                            </div>
                        </div>
                        
                        <div class="row q-mt-sm medium_text" >
                            <div class="col-9">
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
                    <div class="col-4" style="display: flex; flex-direction: column;">
                        <div class="row border small_text" style="display: flex; flex-direction: column; gap: 1px;">
                            <div class="col-12"><span>Reference: </span></div>
                            <div class="col-12"><span>{{transaction_name}} Date: {{displayDate(json.date,preference.dateFormat)}}</span></div>
                            <div class="col-12"><span>Vendor ID: {{json.vendor_code}}</span></div>
                            <div class="col-12"><span>Invoices: {{json.invoices.map(entry=>entry.refno).join(', ')}}</span></div>
                            <div class="col-12"><span>Outlet Code: {{json.outlet_code}}</span></div>
                            <div class="col-12"><span>Remarks: <span style="white-space: pre-line;">{{json.remarks}}</span></span></div>
                        </div>
                        <div class="row border" style="flex-grow: 1;">
                            <div class="col-12 small_text" ><span>Total Amount Including Tax</span></div>
                            <div class="col-12 text-center text-bold"><span>{{formatAmount(json.total_incl_tax,'$')}}</span></div>
                        </div>
                    </div>
                </div>

                <div class="column border">
                    <div v-if="json.child" class="col-8 q-my-lg">
                        <div class="row">
                            <table class="col-12">
                                <tr class="text-center header_row">
                                    <td><span>Line</span></td>
                                    <td style="width:30%"><span>Description</span></td>
                                    <td><span>Outlet</span></td>
                                    <td style="width:30%"><span>Division</span></td>
                                    <td style="width:30%"><span>GL Code</span></td>
                                    <td><span>Amount</span></td>
                                    <td><span>Qty</span></td>
                                    <td><span>Rate</span></td>
                                    <td><span>Total Price</span></td>
                                    <td><span>Tax Rate</span></td>
                                    <td><span>Tax Amount</span></td>
                                    <td><span>Total Amount Including Tax</span></td>
                                </tr>

                                <tr v-for="(child,index) in json.child" :key="index" class="text-center">
                                    <td><span>{{index+1}}</span></td>
                                    <td class="text-left"><span>{{child.description}}</span></td>
                                    <td><span>{{child.outlet_code}}</span></td>
                                    <td class="text-left"><span>{{displayDivision(child.division_guid)}}</span></td>
                                    <td class="text-left"><span>{{displayGlcode(child.glcode_guid)}}</span></td>
                                    <td><span>{{formatAmount(child.amount,'$')}}</span></td>
                                    <td><span>{{formatAmount(child.qty,'qty')}}</span></td>
                                    <td><span>{{formatAmount(child.rate,'%')}}</span></td>
                                    <td><span>{{formatAmount(child.total_amount,'$')}}</span></td>
                                    <td><span>{{formatAmount(child.tax_rate,'%')}}</span></td>
                                    <td><span>{{formatAmount(child.tax_amount,'$')}}</span></td>
                                    <td><span>{{formatAmount(child.total_incl_tax,'$')}}</span></td>
                                </tr>

                                <tr v-if="json.child.length==0" class="text-center" style="height: 15px">
                                    <td v-for="index in 10" :key="index"><span></span></td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <div class="col-4 full-width">
                        <div><span> PLEASE QUOTE THE ABOVE INVOICE NO. IN YOUR CORRESPONDENCE TO US </span></div>
                        <div class="text-italic" small_text><span> This is a computer generated document. No signature is required.</span></div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <q-inner-loading
        :showing="loading"
        class="showLoading"
        color="primary"
    />
</template>

<script>
import Button from 'src/components/PRIMS/Main/Button';
import JsBarcode from 'jsbarcode';
import { Notify } from "quasar";

export default {
    components:{
        Button,
    },
    data() {
       return {
            json: {},
            preference: {},
            barcode_src: "",
            glcode_list: [],
            division_list: [],
            currentTrans: "",
            transaction_type: "",
            transaction_name: "",
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

        if(this.$route.name.endsWith('CN'))
        {
            this.transaction_type = 'cn';
            this.transaction_name = 'Credit Note';
        }
        else if(this.$route.name.endsWith('DN'))
        {
            this.transaction_type = 'dn';
            this.transaction_name = 'Debit Note';
        }

        if(this.$route.query.guid == "")
        {
            this.showNotify('negative', `Unable to identify ${this.transaction_type == "cn" ? "Credit Note" : "Debit Note"} Guid.`);
            this.$router.push({name: this.transaction_type});
        }

        if(!localStorage.getItem("preference_setting"))
        {
            var pass_obj = {
                "dispatch": 'general/trigger_get_company',
                "getter": 'general/get_company',
                "app": this,
                "payload": {
                    "company_guid": this.company_guid
                },
            }

            var company = await this.$dispatch(pass_obj);

            if(!company.status)
            {
                this.showNotify('negative', "Preference setting failed.");
                this.$router.push({name: "invoice"});
            }

            this.preference = {
                "dateFormat": company.response.data.date_format_setting,
                "default_date_to": company.response.data.date_to_setting,
                "division_setting": company.response.data.division_setting == 1 ? true : false,
                "banner_setting": company.response.data.banner_option_setting,
                "displayBanner": company.response.data.display_banner_setting == 1 ? true : false,
                "settlement_discount_setting": company.response.data.settlement_discount_setting == 1 ? true : false,
            };
            localStorage.setItem("preference_setting", JSON.stringify(this.preference));
        }
        else
        {
            this.preference = JSON.parse(localStorage.getItem("preference_setting"));
        }

        this.currentTrans = this.$route.query.guid;

        // get glcode list
        var payload = {
            params: {
                "limit": 99999,
                "ordering": "code",
            }
        }

        var pass_obj = {
            "dispatch": 'general/trigger_get_glcode_list',
            "getter": 'general/get_glcode',
            "app": this,
            "payload": payload,
        }

        var glcode = await this.$dispatch(pass_obj);

        if(glcode.status)
        {
            this.glcode_list = glcode.response.data.results;
        }

        // get division list
        var pass_obj = {
            "dispatch": 'general/trigger_get_division_list',
            "getter": 'general/get_division',
            "app": this,
            "payload": payload,
        }

        var division = await this.$dispatch(pass_obj);

        if(division.status && division.response.data.count > 0)
        {
            this.division_list = division.response.data.results;
        }

        var payload = {
            'cndn_guid': this.currentTrans,
        }

        var pass_obj = {
            "dispatch": 'transaction/trigger_get_cndn',
            "getter": 'transaction/get_cndn_note',
            "app": this,
            "payload": payload,
        }

        var cndn_details = await this.$dispatch(pass_obj);

        if(!cndn_details.status)
        {
            this.showNotify('negative', `Retrieve ${this.transaction_type == "cn" ? "Credit Note" : "Debit Note"} details failed.`);
            this.$router.push({name: this.transaction_type});
        }

        this.json = cndn_details.response.data;
        this.json.child = this.json.cndn_child;

        var invoices = this.json.cndn_invoice.map(entry=>entry.invoice_guid);

        var payload = {
            params: {
                "limit": 99999,
                "ordering": 'refno',
                "invoice_guid__in": invoices.join(','),
            }
        }

        var pass_obj = {
            "dispatch": 'transaction/trigger_get_invoice_list',
            "getter": 'transaction/get_invoice',
            "app": this,
            "payload": payload,
        };

        var invoice_list = await this.$dispatch(pass_obj);

        this.json.invoices = [];
        if(invoice_list.status)
        {
            var array_options = [];
            for(const invoice of invoice_list.response.data.results)
            {
                array_options.push(invoice);
            }
            this.json.invoices = array_options;
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
        // console.log(this.json)
        this.$nextTick(()=>{
            this.loading = false;
            setTimeout(()=>{
                this.generateBarcode();
                setTimeout(()=>{
                    this.handlePrint();
                },500)
            },500)
        })
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
                value = value == parseInt(value) ? value.toFixed(1) : value;
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
            // window.onafterprint = () => {
            //     this.$router.go(-1);
            // };
            window.print();
        },
        generateBarcode() {
            const canvas = document.createElement('canvas');
            JsBarcode(canvas, this.json.refno, {
                format: "CODE128",
                width: 2,
                height: 40,
                fontSize: 15,
                fontOptions: "bold",
                margin: 5,
                displayValue: true,
            });
            this.barcode_src = canvas.toDataURL('image/png');
        },
        displayDivision(value)
        {
            var division = this.division_list.find(entry=>entry.division_guid == value);
            return division ? `${division.code} - ${division.name}` : "-";
        },
        displayGlcode(value)
        {
            var glcode = this.glcode_list.find(entry=>entry.glcode_guid == value);
            return glcode ? `${glcode.code} - ${glcode.name}` : "-";
        },
        displayDate(date, format)
        {
            if(!date) return;

            var curDate = new Date(date);
            var day = curDate.getDate();
            var month = curDate.getMonth() +1;
            var year = curDate.getFullYear();

            const formatRegex = /dd|mm|yyyy|yy/g;

            const formattedDate = format.toLowerCase().replace(formatRegex, (match) => {
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
    font-size: 8px;
}

.medium_text{
    font-size: 10px;;
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