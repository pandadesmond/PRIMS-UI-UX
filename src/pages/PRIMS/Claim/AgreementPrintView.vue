<template>
  <div class="bg-white">
    <div class="row justify-end q-pa-md print-hide">
        <q-btn icon="print" color="primary" text-color="white" @click="handlePrint" :disable="loading"></q-btn>
    </div>
    <div v-if="!loading" id="report_print" class="flex-column">
      <!-- header section -->
      <div v-if="json.company" class="no_break fit-to-content">
        <div class="title">{{json.company.name}} ({{json.company.old_reg_no}})</div>
        <div class="flex-row">
          <div style="width:70%">
            <div class="flex-column">
              <div>{{json.company.address_1}}</div>
              <div>{{json.company.address_2}}</div>
              <div>{{json.company.address_3}} {{json.company.address_4}} {{json.company.address_5}}</div>
            </div>
          </div>
          <div style="width:30%">
            <div class="flex-column">
              <div>GST Reg No: {{json.company.reg_no}}</div>
              <div>Ref No: {{json.refno}}</div>
              <div>Page 1/1</div>
            </div>
          </div>
        </div>
      </div>

      <!-- detail section -->
      <div class="fit-to-content">
        <div class="title text-center" style="padding: 20px 0px;">Advertisement & Promotion Agreement</div>
        <div class="flex-row">
          <div style="width: 65%; padding-right: 15px">
            <div class="flex-column">
              <div class="flex-row">
                <div class="label-column">Vendor Name:</div>
                <div class="field-column-large border-bottom">{{json.vendor_name}}</div>
              </div>
              <div class="flex-row">
                <div class="label-column">Vendor Address:</div>
                <div class="field-column-large border-bottom">{{json.address_1}} {{json.address_2}}</div>
              </div>
              <div class="flex-row">
                <div class="label-column"></div>
                <div class="field-column-large border-bottom">{{json.address_3}}</div>
              </div>
              <div class="flex-row">
                <div class="label-column">Vendor Code:</div>
                <span class="field-column-small border-bottom">{{json.vendor_code}}</span>
                <span class="flexible-div text-center">Tel:</span>
                <span class="field-column-small border-bottom">{{json.vendor_telno}}</span>
                <span class="flexible-div text-center">Fax:</span>
                <span class="field-column-small border-bottom">{{json.vendor_faxno}}</span>
              </div>
              <div class="flex-row">
                <div class="label-column">Vendor GST Reg No:</div>
                <div class="field-column-large border-bottom">{{json.vendor_gstno}}</div>
              </div>
              <div class="flex-row">
                <div class="label-column">Period From:</div>
                <span class="label-column border-bottom">{{displayDate(json.effective_date_from,preference.dateFormat)}}</span>
                <span class="fit-to-content text-center" style="padding: 0px 5px;">to</span>
                <span class="label-column border-bottom">{{displayDate(json.effective_date_to,preference.dateFormat)}}</span>
              </div>
            </div>
          </div>
          <div style="width: 35%">
            <div class="flex-column">
              <div>Date: {{displayDate(json.date,preference.dateFormat)}}</div>
              <div>Division: <span v-if="json.division" class="text-uppercase">{{json.division}}</span></div>
              <div>Payment method: <span v-if="json.payment_method">{{json.payment_method}}</span></div>
              <div>Tax Code: <span v-if="json.tax_code">{{json.tax_code}}</span></div>
            </div>
          </div>
        </div>
        <div style="padding: 20px 0px;">
          <div>Promotion details:</div>
          <div v-if="json.promotion_details">{{json.promotion_details}}</div>
        </div>
        <div>{{json.remarks}}</div>
      </div>

      <!-- table section -->
      <div class="flexible-div">
        <div class="flex-column">
          <div class="fit-to-content">All charges are in Ringgit Malaysia</div>
          <div class="flexible-div">

            <table v-if="view_type == 'store_subdept'">
              <tr>
                <th>No.</th>
                <th>Promo Name</th>
                <th>Store</th>
                <th>Categories</th>
                <th>Amount</th>
              </tr>
              <template v-if="table_data.length>0">
                <tr v-for="(child,index) in table_data" :key="index">
                  <td class="index">{{index+1}}</td>
                  <td class="description">{{child.description}}</td>
                  <td class="store text-uppercase">{{child.store}}</td>
                  <td class="category text-uppercase">{{child.category}}</td>
                  <td class="amount">{{formatAmount(child.amount,'$')}}</td>
                </tr>
              </template>
              <template v-else>
                <tr>
                  <td colspan="5">No data available</td>
                </tr>
              </template>
            </table>

            <table v-if="view_type == 'store'">
              <tr>
                <th>No.</th>
                <th>Promo Name</th>
                <th>Store</th>
                <th>Amount</th>
              </tr>
              <template v-if="table_data.length>0">
                <tr v-for="(child,index) in table_data" :key="index">
                  <td class="index">{{index+1}}</td>
                  <td class="description">{{child.description}}</td>
                  <td class="store text-uppercase">{{child.store}}</td>
                  <td class="amount">{{formatAmount(child.amount,'$')}}</td>
                </tr>
              </template>
              <template v-else>
                <tr>
                  <td colspan="5">No data available</td>
                </tr>
              </template>
            </table>

            <table v-if="view_type == 'subdept'">
              <tr>
                <th>No.</th>
                <th>Promo Name</th>
                <th>Categories</th>
                <th>Amount</th>
              </tr>
              <template v-if="table_data.length>0">
                <tr v-for="(child,index) in table_data" :key="index">
                  <td class="index">{{index+1}}</td>
                  <td class="description">{{child.description}}</td>
                  <td class="category text-uppercase">{{child.category}}</td>
                  <td class="amount">{{formatAmount(child.amount,'$')}}</td>
                </tr>
              </template>
              <template v-else>
                <tr>
                  <td colspan="5">No data available</td>
                </tr>
              </template>
            </table>
          </div>
          <div class="table_total no_break fit-to-content;">
            <table class="border-top border-bottom">
              <tr>
                <td>Total Amount Excluding GST @ 6.00%</td>
                <td>0.00</td>
              </tr>
              <tr>
                <td>GST Payable @ 6.00%</td>
                <td>0.00</td>
              </tr>
              <tr>
                <td>Total Amount Excluding GST @ 0.00%</td>
                <td>{{json.total_amount}}</td>
              </tr>
              <tr>
                <td>GST Payable @ 0.00%</td>
                <td>0.00</td>
              </tr>
              <tr class="border-top">
                <td>Total Amount Included GST</td>
                <td>{{json.total_amount}}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>

      <!-- footer section -->
      <div class="no_break fit-to-content" style="padding-left: 10px;">
        <div v-if="json.company" class="flex-row" style="justify-content: space-between; padding: 10px 0px;">
          <div style="width: 40%;">
            <div>For and on behalf of {{json.company.name}} ({{json.company.old_reg_no}})</div>
          </div>
          <div style="width: 50%;"> Terms and conditions acknowledge and accepted for and on behalf of the above named company</div>
        </div>
        <div class="flex-row" style="padding-top: 10px; gap: 10px;">
          <div class="signature-box signature-container">Issued by:</div>
          <div class="signature-box signature-container">Authorised by:</div>
          <div class="signature-box signature-container">(Company stamp & signature)</div>
        </div>
        <div class="flex-row" style="gap: 10px;">
          <div class="signature-container flex-column">
            <div>Name:</div>
            <div>Designation:</div>
            <div>Date:</div>
          </div>
          <div class="signature-container flex-column">
            <div>Name:</div>
            <div>Designation:</div>
            <div>Date:</div>
          </div>
          <div class="signature-container flex-column">
            <div>Name:</div>
            <div>Designation:</div>
            <div>Date:</div>
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
export default {
  data(){
    return {
      preference: {},
      company_guid: localStorage.getItem("company_guid") != "" && localStorage.getItem("company_guid") != "null" && localStorage.getItem("company_guid") != null ? localStorage.getItem("company_guid") : "",
      currentClaim: this.$route.query && this.$route.query.guid ? this.$route.query.guid : "",
      claim_type: this.$route.query && this.$route.query.type ? this.$route.query.type : "",
      view_type: this.$route.query && this.$route.query.view ? this.$route.query.view : "",
      json: {},
      table_data: [],
      loading: true,
    }
  },
  async mounted(){
    this.loading = true;

    if(this.currentClaim == "" || this.claim_type == "")
    {
      this.showNotify('negative', 'Unable to identify claim guid.');
      return;
    }

    // get preference setting
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

    // get claim details with child
    if(this.claim_type == 'edc')
    {
      var pass_obj = {
        "dispatch": 'claim/trigger_get_edc',
        "getter": 'claim/get_edc',
        "app": this,
        "payload": {
          "edc_guid": this.currentClaim
        },
      }
      
      var pass_obj_child = {
        "dispatch": 'claim/trigger_get_edc_child_list',
        "getter": 'claim/get_edc_child',
        "app": this,
        "payload": {
          "params": {
            "edc_guid": this.currentClaim
          }
        },
      };
    }
    else if(this.claim_type == 'pd')
    {
      var pass_obj = {
        "dispatch": 'claim/trigger_get_pd',
        "getter": 'claim/get_pd',
        "app": this,
        "payload": {
          "pd_guid": this.currentClaim
        },
      }

      var pass_obj_child = {
        "dispatch": 'claim/trigger_get_pd_child_list',
        "getter": 'claim/get_pd_child',
        "app": this,
        "payload": {
          "params": {
            "pd_guid": this.currentClaim
          }
        },
      };
    }

    var claim = await this.$dispatch(pass_obj);
    var claim_child = await this.$dispatch(pass_obj_child);

    if(!claim.status || !claim_child.status)
    {
      this.showNotify('negative', "Failed to get claim details.");
      if(this.claim_type == 'edc')
        this.$router.push({name: "edc"});
      else if(this.claim_type == 'pd')
        this.$router.push({name: "pd"});
    }

    this.json = claim.response.data;
    this.json.child = claim_child.response.data.results;

    // get company
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
      this.json.company = response.response.data
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

      // get division
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
        this.json.division = division.response.data.results.map(entry=>entry.name).join(', ');
      }

      // get tax code
      var tax_codes = [...new Set(this.json.child.map(entry=>entry.tax_code))];
      this.json.tax_code = tax_codes.filter(a=>a).join(', ');
      console.log(tax_codes);

      // agreement by store
      if(this.view_type == 'store')
      {
        if(this.claim_type == 'pd')
        {
          for(const child of this.json.child)
          {
            this.table_data.push({
              description: child.description,
              store: child.outlet_code,
              amount: child.amount,
            })
          }
        }
        else if(this.claim_type == 'edc')
        {
          for(const child of this.json.child)
          {
            for(const child_allocation of child.allocation_info)
            {
              // if(child_allocation.type == 'manual')
              // {
              //   var amount = child_allocation.amount;
              // }
              // else if(child_allocation.type == 'sales_ratio')
              // {
              //   var amount = parseFloat(child_allocation.manual_ratio)/100*parseFloat(child.amount);
              // }
              this.table_data.push({
                description: child.description,
                store: child_allocation.outlet_code,
                amount: child_allocation.amount,
              })
            }
          }
        }
      }

      // agreement by subdept
      else if(this.view_type == 'subdept')
      {
        if(this.claim_type == 'edc')
        {
          for(const child of this.json.child)
          {
            for(const child_ratio of child.ratio_info)
            {
              this.table_data.push({
                description: child.description,
                category: child_ratio.code,
                amount: parseFloat(child_ratio.ratio)/100*parseFloat(child.amount),
              })
            }
          }
        }
        else if(this.claim_type == 'pd')
        {
          const itemcode_details = await this.searchItemcode([...new Set(this.json.child.map(entry=>entry.itemcode))]);
          for(const child of this.json.child)
          {
            const category = itemcode_details.find(entry=>entry.itemcode == child.itemcode);
            this.table_data.push({
              description: child.description,
              category: category.subdept,
              amount: child.amount,
            })
          }
        }
      }

      // agreement by store by subdept
      else if(this.view_type == 'store_subdept')
      {
        if(this.claim_type == 'edc')
        {
          for(const child of this.json.child)
          {
            for(const child_allocation of child.allocation_info)
            {
              for(const child_ratio of child.ratio_info)
              {
                // if(child_allocation.type == 'manual')
                // {
                //   var amount = parseFloat(child_ratio.ratio)/100*parseFloat(child_allocation.amount);
                // }
                // else if(child_allocation.type == 'sales_ratio')
                // {
                //   const allocation_amount = parseFloat(child_allocation.manual_ratio)/100*parseFloat(child.amount);
                //   var amount = parseFloat(child_ratio.ratio)/100*parseFloat(allocation_amount);
                // }
                this.table_data.push({
                  description: child.description,
                  store: child_allocation.outlet_code,
                  category: child_ratio.code,
                  amount: parseFloat(child_ratio.ratio)/100*parseFloat(child_allocation.amount),
                })
              }
            }
          }
        }
        else if(this.claim_type == 'pd')
        {
          const itemcode_details = await this.searchItemcode([...new Set(this.json.child.map(entry=>entry.itemcode))]);
          for(const child of this.json.child)
          {
            const category = itemcode_details.find(entry=>entry.itemcode == child.itemcode);
            this.table_data.push({
              description: child.description,
              store: child.outlet_code,
              category: category.subdept,
              amount: child.amount,
            })
          }
        }
        
      }
    }
    else
    {
      this.table_data = [];
    }

    var total = 0;
    this.table_data.map(entry=>{
      total+=parseFloat(entry.amount);
    })
    console.log(total)
    console.log(this.table_data)

    console.log(this.json)
    this.loading = false;
  },
  methods: {
    handlePrint()
    {
      window.print();
    },
    async searchItemcode(itemcode)
    {
      // find itemcode
      var payload = {
        params: {
          "limit": 50,
          "itemcode": itemcode.join(','),
          "_column_": "itemcode,description,dept,subdept",
        }
      }

      var pass_obj = {
        "dispatch": 'general/trigger_get_itemcode_list',
        "getter": 'general/get_itemcode',
        "app": this,
        "payload": payload,
      }

      var item_list = await this.$dispatch(pass_obj);

      if(item_list.status)
      {
        return item_list.response.data.results;
      }
      return [];
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
  margin: auto;
}

.flex-column {
  display: flex;
  flex-direction: column;
  height: auto;
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

table {
  width: 100%;
  border-collapse: collapse;
}

td.amount, .table_total {
  text-align: right;
}

th:not(:first-child), td:not(:first-child) {
  padding: 2px 8px;
  min-width: 100px;
}

th {
  border: 1px solid grey;
}

.index, .category, .store {
  text-align: center;
}

@media print {
  .top-button {
    display: none;
  }

  @page {
    margin: 0.5cm;
    size: portrait;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  tbody {
    page-break-inside: avoid;
  }

  tr {
    page-break-inside: avoid;
    page-break-after: auto;
  }

  .flex-column {
    display: flex;
    flex-direction: column;
    height: auto;
  }

  .flex-row {
    display: flex;
    flex-direction: row;
    width: 100%;
  }

  .flexible-div {
    flex-grow: 1;
  }

  .no_break {
    page-break-inside: avoid;
  }
}

</style>