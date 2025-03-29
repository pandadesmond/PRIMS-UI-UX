<template>
  <div class="bg-white">
    <div class="row justify-end q-pa-md">
        <q-btn icon="print" color="primary" text-color="white" @click="handlePrint" :disable="loading"></q-btn>
    </div>
    <div v-if="!loading" id="report_print" class="flex-column">
      <div v-if="json.company" class="no_break fit-to-content">
        <div class="flex-row">
          <div style="width: 50%;">
            <div class="title">{{json.company.name}}</div>
            <div class="text-uppercase">{{json.company.address_1}}</div>
            <div class="text-uppercase">{{json.company.address_2}}</div>
            <div class="text-uppercase">{{json.company.address_3}}</div>
            <div class="text-uppercase">{{json.company.address_4}} {{json.company.address_5}}</div>
            <div><span class="bold">Business Reg. No.:</span> {{json.company.reg_no}} ({{json.company.old_reg_no}})</div>
            <div><span class="bold">Tel:</span> {{json.company.telephone}}</div>
            <div><span class="bold">Fax:</span> {{json.company.fax}}</div>
          </div>
          <div style="width: 50%; text-align: right;">
            LOGO
          </div>
        </div>
      </div>

      <div v-if="json.vendor" class="no_break fit-to-content">
        <div class="title text-center" style="padding: 20px 0px;">Invoice</div>
        <div class="flex-row" style="padding: 20px 0px;">
          <div style="width: 50%;">
            <div class="flex-row">
              <div style="width: 10%;">TO:</div>
              <div style="width: 75%">
                <div>{{json.vendor_name}}</div>
                <div>{{json.address_1}}</div>
                <div>{{json.address_2}}</div>
                <div>{{json.address_3}}</div>
                <div>{{json.vendor.postcode}} {{json.vendor.city}} {{json.vendor.country}}</div>
                <div>
                  <span class="bold">Tel No:</span><span style="padding: 0px 10px">{{json.vendor.telephone}}</span>
                  <span class="bold">Fax No:</span><span style="padding: 0px 10px">{{json.vendor.fax_no}}</span>
                </div>
              </div>
            </div>
          </div>
          <div style="width: 50%;">
            <div style="border: 1px solid grey">
              <div class="border-bottom" style="padding: 0px 10px;">
                <div><span class="bold">Invoice No. </span>{{json.refno}}</div>
                <div><span class="bold">Reference Number: </span>{{json.tta_refno}}</div>
                <div><span class="bold">Invoice Date: </span>{{displayDate(json.date,preference.dateFormat)}}</div>
                <div><span class="bold">Vendor ID: </span>{{json.vendor_code}}</div>
                <div><span class="bold">Ref ID: </span>{{json.manual_refno}}</div>
              </div>
              <div style="padding: 0px 10px;"><span class="bold">Buyer:</span></div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div class="flex-column">
          <div class="border-bottom">
            <div>Period From: {{displayDate(json.effective_date_from,preference.dateFormat)}} to {{displayDate(json.effective_date_to,preference.dateFormat)}}</div>
            <div>Promotion Details: <span v-if="json.promotion_details">{{json.promotion_details}}</span></div>
            <div>Remarks: {{json.remarks}}</div>
          </div>

          <!-- for EDC -->
          <table v-if="json.type == 'edc'">
            <tr>
              <th>Description</th>
              <th>Category</th>
              <th>Rebate Amt (MYR)</th>
            </tr>
            <template v-if="json.child.length>0">
              <tr v-for="child in json.child" :key="child">
                <td class="text-uppercase">{{child.description}}</td>
                <td class="text-uppercase"><span v-if="child.division">{{child.division}}</span></td>
                <td>{{formatAmount(child.amount,'$')}}</td>
              </tr>
            </template>
            <template v-else>
              <tr>
                <td colspan="3">No data available</td>
              </tr>
            </template>
            <tr>
              <td colspan="2">Total Amount</td>
              <td>{{formatAmount(json.total_amount,'$')}}</td>
            </tr>
          </table>

          <!-- for PD by Scan -->
          <table v-else>
            <tr>
              <th>Description</th>
              <th>Rebate Amt (MYR)</th>
            </tr>
            <template v-if="json.child.length>0">
              <tr v-for="child in json.child" :key="child">
                <td class="text-uppercase">{{child.description}}</td>
                <td>{{formatAmount(child.amount,'$')}}</td>
              </tr>
            </template>
            <template v-else>
              <tr>
                <td colspan="2">No data available</td>
              </tr>
            </template>
            <tr>
              <td colspan="2">Total Amount</td>
              <td>{{formatAmount(json.total_amount,'$')}}</td>
            </tr>
          </table>
        </div>
      </div>

      <div>
        <div style="padding: 20px 0px">E & O.E.</div>
        <div>PLEASE QUOTE THE ABOVE INVOICE NO IN YOUR CORRESPONDENCE TO US</div>
        <div class="disclaimer">This is a computer generated document. No signature is required.</div>
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
export default {
  data(){
    return {
      preference: {},
      company_guid: localStorage.getItem("company_guid") != "" && localStorage.getItem("company_guid") != "null" && localStorage.getItem("company_guid") != null ? localStorage.getItem("company_guid") : "",
      currentInv: this.$route.query.invoice_guid ? this.$route.query.invoice_guid : "",
      json: {},
      loading: true,
    }
  },
  async mounted(){
    this.loading = true;

    if(this.currentInv == "")
    {
      this.showNotify('negative', 'Unable to identify Invoice Guid.');
      this.$router.push({name: "invoice"});
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

    // get invoice details with child
    var pass_obj = {
      "dispatch": 'transaction/trigger_get_invoice',
      "getter": 'transaction/get_invoice',
      "app": this,
      "payload": {
        'invoice_guid': this.currentInv,
      },
    }

    var pass_obj_child = {
        "dispatch": 'transaction/trigger_get_invoice_child_list',
        "getter": 'transaction/get_invoice_child',
        "app": this,
        "payload": {
          "params": {
            'invoice_guid': this.currentInv,
            'ordering': 'line',
            'limit': 99999,
          }
        },
    };

    var invoice_details = await this.$dispatch(pass_obj);
    var invoice_child_list = await this.$dispatch(pass_obj_child);
    
    if(!invoice_details.status || !invoice_child_list.status)
    {
      this.showNotify('negative','Fail to retrieve invoice details.');
      this.$router.push({name: 'invoice'});
    }

    this.json = invoice_details.response.data;
    this.json.child = invoice_child_list.response.data.results;

    // get company info
    var pass_obj = {
      "dispatch": 'general/trigger_get_company_info',
      "getter": 'general/get_company_info',
      "app": this,
      "payload": {
        'company_info_guid': this.json.company_info_guid,
      },
    }

    var response = await this.$dispatch(pass_obj);

    if(response.status)
    {
      this.json.company = response.response.data;
    }

    // get vendor details
    var pass_obj = {
      "dispatch": 'general/trigger_get_supplier',
      "getter": 'general/get_supplier',
      "app": this,
      "payload": {
        'supplier_guid': this.json.supplier_guid,
      },
    }

    var response = await this.$dispatch(pass_obj);

    if(response.status)
    {
      this.json.vendor = response.response.data;
    }

    
    if(this.json.child.length>0)
    {
      // get glcode
      var glcode_guids = [...new Set(this.json.child.map(entry=>entry.glcode_guid))].filter(a=>a);
      if(glcode_guids.length>0)
      {
        var pass_obj = {
        "dispatch": 'general/trigger_get_glcode_list',
        "getter": 'general/get_glcode',
        "app": this,
        "payload": {
            "params": {
              "limit": 99999,
              "ordering": "code",
              "glcode_guid__in": glcode_guids.join(','),
            }
          },
        }

        var glcode = await this.$dispatch(pass_obj);
        this.json.promotion_details = glcode.response.data.results.map(entry=>`${entry.code} - ${entry.name}`).join(', ');
      }

      // get division list
      var division_guids = [...new Set(this.json.child.map(entry=>entry.division_guid))].filter(a=>a);
      if(division_guids.length>0)
      {
        var pass_obj = {
          "dispatch": 'general/trigger_get_division_list',
          "getter": 'general/get_division',
          "app": this,
          "payload": {
            "params": {
              "limit": 99999,
              "ordering": "name",
              "division_guid__in": division_guids.join(','),
            }
          },
        }
        var division = await this.$dispatch(pass_obj);
        this.json.division = division.response.data.results;

        for(const child of this.json.child)
        {
          child.division = this.json.division.find(entry=>entry.division_guid == child.division_guid).name;
        }
      }
    }

    console.log(this.json)
    this.loading = false;
  },
  methods: {
    handlePrint()
    {
      window.print();
    },
    displayDate(date, format)
    {
      if(!date || date == "") return "";

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
#report_print {
  font-size: 12px;
  padding: 20px;
  width: 100%;
  margin: 0 auto;
}

.flex-column {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 1px;
}

.flex-row {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.flexible-div {
  flex-grow: 1;
}

.fit-to-content {
  height: auto;
  width: auto
}

.text-center {
  text-align: center;
}

.text-uppercase {
  text-transform: uppercase;
}

.bold {
  font-weight: bold;
}

.title {
  font-size: 1.25rem;
  font-weight: bold;
}

.label-column {
  width: 25%;
}

.field-column-large {
  width: 75%;
  min-height: 20px;
}

.field-column-small {
  width: 20%;
  min-height: 20px;
}

.border-top {
  border-top: 1px solid grey;
}

.border-bottom {
  border-bottom: 1px solid grey;
}

.signature-container {
  width: 30%;
}

.signature-box {
  height: 100px;
  border-bottom: 1px solid grey;
}

.no_break{
  page-break-inside: avoid;
}

.disclaimer {
  color: red;
  font-style: italic;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

table th {
  font-weight: normal;
}

table th,
table td {
  padding: 4px;
  text-align: left;
  border-bottom: 1px solid grey;
}

table td:first-child {
  min-width: 120px;
}

table th:last-child,table td:last-child {
  text-align: right;
}

@media print{
  /* @page {margin: 0.5cm; size: landscape} */
  @page {margin: 0.5cm; size: portrait; }
  body { margin: 1.6cm; }

  table 
  {
    width: 100%;
    border-collapse: collapse; 
  }
  
  tbody
  {
    page-break-inside: avoid;
  }
  
  tr
  {
    page-break-inside: avoid;
    page-break-after: auto;
  }
}

</style>