<template>
  <div class="card_sides">
    <q-card style="min-height: 100vh;">
      <q-card-section class="header_top_mobile">
        <Button_icon :disable="showAddLoading" :big_round="true" :flat="true" :font_color="'#928f8f'" :color="'rgba(255, 255, 255, 0.5)'" :icon="'arrow_back_ios'" :outline="true" size="12px" class="custom_back_button" @click="back()" />

        <Button_icon :disable="showAddLoading" :text="header=='PO' ? 'New PO' : header=='GR' ? 'New GR' : header == 'IBT' ? 'New IBT' : header == 'DN' ? 'New DN' : 'New CN'" :big_round="true" :flat="true" :font_color="'#1976D2'" :color="'#f1f8ff'" :icon="'add_circle'" :outline="false" size="15px" class="custom_more_button" @click="handleCreate()" />
      </q-card-section>

      <q-card-section class="dialog_header card_sides">
        <div class="card_ypadding">
          <div class="row justify-center q-pb-sm">
            <Button_icon :readonly="true" :big_round="true" :flat="true" :font_color="'white'" :color="'green'" :icon="'verified'" :outline="true" size="30px" />
          </div>

          <div class="row justify-center">
            <Label v-if="header=='PO' && type=='create'" :text="'Your Purchase Order is Ready'"
            style="background-color: white;"/>

            <Label v-if="header=='PO' && type=='update'" :text="'Purchase Order Updated'"
            style="background-color: white;"/>

            <Label v-if="header=='GR' && type =='create'" :text="'Your Goods Receiving is Ready'"
            style="background-color: white;"/>

            <Label v-if="header=='GR' && type =='update'" :text="'Goods Receiving Updated'"
            style="background-color: white;"/>

            <Label v-if="header=='DN' && type =='create'" :text="'Your Debit Note is Ready'"
            style="background-color: white;"/>

            <Label v-if="header=='DN' && type =='update'" :text="'Debit Note Updated'"
            style="background-color: white;"/>

            <Label v-if="header=='IBT' && type=='create'" :text="'Your InterbranchTransfer is Ready'"
            style="background-color: white;"/>

            <Label v-if="header=='IBT' && type=='update'" :text="'InterbranchTransfer Updated'"
            style="background-color: white;"/>

            <Label v-if="header=='CN' && type=='create'" :text="'Your Credit Note is Ready'"
            style="background-color: white;"/>

            <Label v-if="header=='CN' && type=='update'" :text="'Credit Note Updated'"
            style="background-color: white;"/>
          </div>
          <div class="row q-pt-lg" style="font-size: 10px;">
            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
              <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <div class="row">
                    <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5"><b>Refno</b></div>
                    <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7 col-xl-7"><b>:</b> {{ refno }}</div>
                  </div>
                  <div class="row">
                    <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5"><b>Doc Date</b></div>
                    <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7 col-xl-7" v-if="header=='PO'"><b>:</b> {{ json.PODate }}</div>
                    <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7 col-xl-7" v-if="header=='GR'"><b>:</b> {{ json.GRDate }}</div>
                    <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7 col-xl-7" v-if="header=='DN'"><b>:</b> {{ json.DocDate }}</div>
                    <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7 col-xl-7" v-if="header=='IBT'"><b>:</b> {{ json.PODate }}</div>
                    <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7 col-xl-7" v-if="header=='CN'"><b>:</b> {{ json.DocDate }}</div>
                  </div>
                  <div class="row">
                    <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5"><b>Branch</b></div>
                    <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7 col-xl-7" v-if="header=='DN' || header=='CN'"><b>:</b> {{ json.locgroup }}</div>
                    <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7 col-xl-7" v-else><b>:</b> {{ json.loc_group }}</div>
                  </div>
                  <div class="row">
                    <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5"><b>Total Price</b></div>
                    <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7 col-xl-7" v-if="header!='DN' || header !='CN' "><b>:</b> {{ json.Total }}</div>
                    <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7 col-xl-7" v-if="header =='DN'"><b>:</b> {{ json.Amount }}</div>
                    <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7 col-xl-7" v-if="header =='CN'"><b>:</b> {{ json.amount }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
              <div class="row">
                <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5"><b>Supplier Code</b></div>
                <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7 col-xl-7" v-if="header=='PO' || header == 'IBT'"><b>:</b> {{ json.SCode }}</div>
                <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7 col-xl-7" v-else><b>:</b> {{ json.Code }}</div>
              </div>
              <div class="row">
                <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5"><b>Supplier Name</b></div>
                <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7 col-xl-7" v-if="header=='PO' || header == 'IBT'"><b>:</b> {{ json.SName }}</div>
                <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7 col-xl-7" v-else><b>:</b> {{ json.Name }}</div>
              </div>
            </div>
          </div>

          <div v-if="jsonChild.length != 0" class="row q-pt-lg" style="font-size: 10px;">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <table style="width: 100%;">
                <tr>
                  <th class="center">No</th>
                  <th class="center">Itemcode</th>
                  <th class="center" style="width: 25%;">Desciption</th>
                  <th class="center">Qty</th>
                  <th v-if="type!='IS'" class="center">Total Price<br>(RM)</th>
                </tr>
                <tr v-for="(details, index) in jsonChild" :key="details">
                  <td class="rightwpadding" style="width: 3%;">{{ index+1 }}</td>
                  <td class="centerwpadding" style="width: 5%;">{{ details.Itemcode }}</td>
                  <td class="leftwpadding">{{ details.Description }}</td>
                  <td class="rightwpadding" style="width: 3%;">{{ details.Qty }}</td>
                  <td class="rightwpadding" style="width: 7%;">{{ details.TotalPrice }}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </q-card-section>

      <q-inner-loading
        :showing="showAddLoading"
        color="primary"
      />
    </q-card>
  </div>
</template>

<script>
import Input from 'src/components/ERP/Base/Input'
import Select from 'src/components/ERP/Base/Select'
import Datepicker from 'src/components/ERP/Base/Datepicker'
import Checkbox from 'src/components/ERP/Base/Checkbox'
import PurchaseTable from 'src/components/ERP/Purchase/PurchaseTable'
import Button_icon from 'src/components/ERP/Base/Button_icon'
import Label from 'src/components/ERP/Base/Label';
import Radio from 'src/components/ERP/Base/Radio';
import SelectFilter from 'src/components/ERP/Base/SelectFilter'
import ItemTable from 'src/components/ERP/Purchase/ItemTable'
import SelectPlaceholder from 'src/components/ERP/Base/SelectPlaceholder'
import Textarea from'src/components/ERP/Base/Textarea' ;
import { StreamBarcodeReader } from "vue-barcode-reader";

import { Notify, exportFile } from "quasar";
import { ref } from 'vue';

export default {
  data() {
    return {
      retailer_guid: sessionStorage.getItem("retailer_guid") != "" && sessionStorage.getItem("retailer_guid") != "null" && sessionStorage.getItem("retailer_guid") != null ? sessionStorage.getItem("retailer_guid") : [],
      user_name: sessionStorage.getItem("user_name") != "" && sessionStorage.getItem("user_name") != "null" && sessionStorage.getItem("user_name") != null ? sessionStorage.getItem("user_name") : [],
      language: sessionStorage.getItem("language") != "" && sessionStorage.getItem("language") != "null" && sessionStorage.getItem("language") != null ? sessionStorage.getItem("language") : [],
      refno: this.$route.query.refno,
      header: this.$route.query.header,
      type: this.$route.query.type,
      json: {},
      jsonChild: [],
      showAddLoading: false,
    };
  },
  components: {
    // Input,
    // Select,
    // Datepicker,
    // Checkbox,
    // PurchaseTable,
    Button_icon,
    Label,
    // SelectFilter,
    // Radio,
    // ItemTable,
    // SelectPlaceholder,
    // Textarea,
  },
  methods: {
    async getFilterGrmain(payload)
    {
      return await this.$store.dispatch('purchase/trigger_read_gr_by_refno', payload).then(() => {
          var data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_read_gr_by_refno']));
          return data;
      });
    },
    async getFilterPomain(payload)
    {
      payload.language = this.language;

      return await this.$store.dispatch('purchase/trigger_read_po_by_refno', payload).then(() => {
        var data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_read_po_by_refno']));
        return data;
      });
    },
    async getFilterDnmain(payload)
    {
      return await this.$store.dispatch('purchase/trigger_read_dn_by_refno', payload).then(() => {
        var data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_read_dn_by_refno']));
        return data;
      });
    },
    async getFilterIbtmain(payload)
    {
      return await this.$store.dispatch('purchase/trigger_read_ibt_by_refno', payload).then(() => {
        var data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_read_ibt_by_refno']));
        return data;
      });
    },
    async getFilterCnmain(payload)
    {
      return await this.$store.dispatch('purchase/trigger_read_cn_by_refno', payload).then(() => {
        var data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_read_cn_by_refno']));
        return data;
      });
    },
    async getPochild(payload)
    {
      return await this.$store.dispatch('purchase/trigger_get_pochild', payload).then(() => {
          var data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_pochild']));
          return data;
      });
    },
    async getGrchild(payload)
    {
      return await this.$store.dispatch('purchase/trigger_get_grchild', payload).then(() => {
        var data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_grchild']));
        return data;
      })
    },
    async getDnchild(payload)
    {
      return await this.$store.dispatch('purchase/trigger_get_dnchild', payload).then(() => {
        var data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_dnchild']));
        return data;
      });
    },
    async getIbtchild(payload)
    {
      return await this.$store.dispatch('purchase/trigger_get_ibtchild', payload).then(() => {
          var data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_ibtchild']));
          return data;
      });
    },
    async getCnchild(payload)
    {
      return await this.$store.dispatch('purchase/trigger_read_cnchild', payload).then(() => {
        var data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_cnchild']));
        return data;
      });
    },
    back()
    {
      if(this.header == 'PO')
      {
        if(this.type == 'create')
        {
          this.$router.push({ name: 'EditPurchaseOrder', query: { refno: this.refno, step: 2 } })
        }
        else if(this.type == 'update')
        {
          this.$router.push({ name: 'EditPurchaseOrder', query: { refno: this.refno } })
        }
      }
      else if(this.header == 'GR')
      {
        // if(this.type == 'create')
        // {
        //   this.$router.push({ name: 'EditGoodsReceivedNote', query: { refno: this.refno, step: 2 } })
        // }
        // else if(this.type == 'update')
        // {
          this.$router.push({ name: 'EditGoodsReceivedNote', query: { refno: this.refno } })
        // }
      }
      else if(this.header == 'DN')
      {
        if(this.type == 'create')
        {
          this.$router.push({ name: 'EditDebitNote', query: { refno: this.refno, step: 2 } })
        }
        else if(this.type == 'update')
        {
          this.$router.push({ name: 'EditDebitNote', query: { refno: this.refno } })
        }
      }
      else if(this.header == 'IBT')
      {
        if(this.type == 'create')
        {
          this.$router.push({ name: 'EditInterbranchTransfer', query: { refno: this.refno, step: 2 } })
        }
        else if(this.type == 'update')
        {
          this.$router.push({ name: 'EditInterbranchTransfer', query: { refno: this.refno } })
        }
      }  else if(this.header == 'CN')
      {
        if(this.type == 'create')
        {
          this.$router.push({ name: 'EditCreditNote', query: { refno: this.refno, step: 2 } })
        }
        else if(this.type == 'update')
        {
          this.$router.push({ name: 'EditCreditNote', query: { refno: this.refno } })
        }
      }
    },
    handleCreate()
    {
      if(this.header == 'PO')
      {
        this.$router.push({ name: "CreatePurchaseOrder" });
      }
      else if(this.header == 'GR')
      {
        this.$router.push({ name: "SimpleReceive" });
      }
      else if(this.header == 'DN')
      {
        this.$router.push({ name: "CreateDebitNote" });
      }
      else if(this.header == 'IBT')
      {
        this.$router.push({ name: "CreateInterbranchTransfer" });
      }
      else if(this.header == 'CN')
      {
        this.$router.push({ name: "CreateCreditNote" });
      }
    },
    formatAmount(value, type)
    {
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

        var parts = value.toString().split(".");
        const numberPart = parts[0];
        const decimalPart = parts[1];
        const thousands = /\B(?=(\d{3})+(?!\d))/g;
        // return numberPart.replace(thousands, ",") + (decimalPart ? "." + decimalPart : "");

        return numberPart.replace(thousands, ",") + (decimalPart ? "." + decimalPart : "");
    },
    unformatAmount(value,type)
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

      return Number(value.replaceAll(',',''))
    },
    async validate_form(form_name = "")
    {
        var form_name = form_name;
        var error = 0;
        await this.$refs[form_name].validate().then(valid => {
            if (!valid) {
                error = 1;
            }
        });

        var error = error == 1 ? false : true;
        //true is no error false is got error

        return new Promise((resolve, reject) => {
        // setTimeout(() => {
            resolve(error);
        // }, 2000);
        });

    },
    showNotify(type, message) {
        Notify.create({
            type: type,
            message: message,
            // timeout: 1000,
            position: 'center',
            html: true,
            actions: [
              { label: 'OK', color: 'white', handler: () => { } }
            ]
        })
    },
  },
  computed: {
    dbComponentBehavior() {
      return this.$store.getters['dbComponentBehavior/byLanguage']('fnbos')
    },

    setDefaultYear(){
      var month = this.Bar1filter_month;
      var tempMonth = month_array.indexOf(month) + 1,
      mm = String(tempMonth).padStart(2, '0')
      return `${yyyy}/${mm}`
    },
  },
  async created(){
    this.showAddLoading = true;

    if(this.header == 'PO')
    {
      var cpayload =
      {
        params: {
          refno: this.$route.query.refno
        }
      }

      var cdata = await this.getPochild(cpayload);
      var cresults = cdata.data;

      this.supplier_readonly = cresults.length > 0;

      var refno = this.$route.query.refno;

      // if(refno == undefined || refno == '')
      // {
      //   this.$router.push('/ERP/purchase/PurchaseOrder')
      //   return;
      // }

      var payload = {
        RefNo: refno
      }

      var data = await this.getFilterPomain(payload);
      var filtered_transmain = data.response;

      filtered_transmain.rebate_amt = this.formatAmount(filtered_transmain.rebate_amt, '$');
      filtered_transmain.Total = this.formatAmount(filtered_transmain.Total, '$');
      filtered_transmain.total_include_tax = this.formatAmount(filtered_transmain.total_include_tax, '$');
      filtered_transmain.gst_tax_sum = this.formatAmount(filtered_transmain.gst_tax_sum, '$');
      filtered_transmain.SubTotal1 = this.formatAmount(filtered_transmain.SubTotal1, '$');
      if(filtered_transmain.stockday_min == 0.0)
      {
        filtered_transmain.stockday_min = '0';
      }
      if(filtered_transmain.stockday_max == 0.0)
      {
        filtered_transmain.stockday_max = '0';
      }
      if(filtered_transmain.pur_expiry_days == null || filtered_transmain.pur_expiry_days == 0)
      {
        filtered_transmain.pur_expiry_days = '0';
      }

      this.json = filtered_transmain;
      this.json.step = 1;
      this.json.Remark = this.json.Remark==null ? '' : this.json.Remark;
    }
    else if(this.header == 'GR')
    {
      var cpayload =
      {
        params: {
          refno: this.$route.query.refno
        }
      }

      var cdata = await this.getGrchild(cpayload);
      var cresults = cdata.data;

      this.supplier_readonly = cresults.length > 0;

      var refno = this.$route.query.refno;

      var payload = {
        RefNo: refno,
        user: this.user_name,
        language: this.language
      }

      var data = await this.getFilterGrmain(payload)

      var filtered_transmain = data.response;

      filtered_transmain.rebate_amt = this.formatAmount(filtered_transmain.rebate_amt, '$');
      filtered_transmain.Total = this.formatAmount(filtered_transmain.Total, '$');
      filtered_transmain.total_include_tax = this.formatAmount(filtered_transmain.total_include_tax, '$');
      filtered_transmain.gst_tax_sum = this.formatAmount(filtered_transmain.gst_tax_sum, '$');
      filtered_transmain.SubTotal1 = this.formatAmount(filtered_transmain.SubTotal1, '$');
      filtered_transmain.rounding_adj = this.formatAmount(filtered_transmain.rounding_adj, '$');

      this.json = filtered_transmain;
      this.json.step = 1;
      this.json.Remark = this.json.Remark==null ? '' : this.json.Remark;
    }
    else if(this.header == 'DN')
    {
      var cpayload =
      {
        RefNo: this.$route.query.refno,
        language: this.language
      }

      var cdata = await this.getDnchild(cpayload);
      var cresults = cdata.response;

      this.supplier_readonly = cresults.length > 0;

      var refno = this.$route.query.refno;

      // if(refno == undefined || refno == '')
      // {
      //   this.$router.push('/ERP/purchase/PurchaseOrder')
      //   return;
      // }

      var payload = {
        RefNo: refno,
        language: this.language
      }

      var data = await this.getFilterDnmain(payload);
      var filtered_transmain = data.response;

      filtered_transmain.Amount = this.formatAmount(filtered_transmain.Amount, '$');

      if(filtered_transmain.stockday_min == 0.0)
      {
        filtered_transmain.stockday_min = '0';
      }
      if(filtered_transmain.stockday_max == 0.0)
      {
        filtered_transmain.stockday_max = '0';
      }
      if(filtered_transmain.pur_expiry_days == null || filtered_transmain.pur_expiry_days == 0)
      {
        filtered_transmain.pur_expiry_days = '0';
      }

      this.json = filtered_transmain;
      console.log(this.json)
      this.json.step = 1;
      this.json.Remark = this.json.Remark==null ? '' : this.json.Remark;
    }
    else if(this.header == 'IBT')
    {
      var cpayload =
      {
        params: {
          refno: this.$route.query.refno,
        }
      }

      var cdata = await this.getIbtchild(cpayload);
      var cresults = cdata.data;

      this.supplier_readonly = cresults.length > 0;

      var refno = this.$route.query.refno;

      // if(refno == undefined || refno == '')
      // {
      //   this.$router.push('/ERP/purchase/PurchaseOrder')
      //   return;
      // }

      var payload = {
        RefNo: refno
      }

      var data = await this.getFilterIbtmain(payload);
      var filtered_transmain = data.response;

      filtered_transmain.rebate_amt = this.formatAmount(filtered_transmain.rebate_amt, '$');
      filtered_transmain.Total = this.formatAmount(filtered_transmain.Total, '$');
      filtered_transmain.total_include_tax = this.formatAmount(filtered_transmain.total_include_tax, '$');
      filtered_transmain.gst_tax_sum = this.formatAmount(filtered_transmain.gst_tax_sum, '$');
      filtered_transmain.SubTotal1 = this.formatAmount(filtered_transmain.SubTotal1, '$');
      if(filtered_transmain.stockday_min == 0.0)
      {
        filtered_transmain.stockday_min = '0';
      }
      if(filtered_transmain.stockday_max == 0.0)
      {
        filtered_transmain.stockday_max = '0';
      }
      if(filtered_transmain.pur_expiry_days == null || filtered_transmain.pur_expiry_days == 0)
      {
        filtered_transmain.pur_expiry_days = '0';
      }

      this.json = filtered_transmain;
      this.json.step = 1;
      this.json.Remark = this.json.Remark==null ? '' : this.json.Remark;
    }else if(this.header == 'CN')
    {
      var cpayload =
      {
        RefNo: this.$route.query.refno,
        language: this.language
      }

      var cdata = await this.getCnchild(cpayload);
      var cresults = cdata.response;

      this.supplier_readonly = cresults.length > 0;

      var refno = this.$route.query.refno;

      // if(refno == undefined || refno == '')
      // {
      //   this.$router.push('/ERP/purchase/PurchaseOrder')
      //   return;
      // }

      var payload = {
        RefNo: refno,
        language: this.language
      }

      var data = await this.getFilterCnmain(payload);
      var filtered_transmain = data.response;

      filtered_transmain.Amount = this.formatAmount(filtered_transmain.Amount, '$');

      if(filtered_transmain.stockday_min == 0.0)
      {
        filtered_transmain.stockday_min = '0';
      }
      if(filtered_transmain.stockday_max == 0.0)
      {
        filtered_transmain.stockday_max = '0';
      }
      if(filtered_transmain.pur_expiry_days == null || filtered_transmain.pur_expiry_days == 0)
      {
        filtered_transmain.pur_expiry_days = '0';
      }

      this.json = filtered_transmain;
      console.log(this.json)
      this.json.step = 1;
      this.json.Remark = this.json.Remark==null ? '' : this.json.Remark;
    }

    var cpayload = {
      params: {
        refno: refno,
      }
    }

    var cdata = {};

    if(this.header == 'PO')
    {
      cdata = await this.getPochild(cpayload);
    }
    else if(this.header == 'GR')
    {
      cdata = await this.getGrchild(cpayload);
    }
    else if(this.header == 'DN')
    {
      var dpayload = {
        RefNo: refno,
        language: this.language
      }

      cdata = await this.getDnchild(dpayload);
    }
    else if(this.header == 'IBT')
    {
      cdata = await this.getIbtchild(cpayload);
    }
    else if(this.header == 'CN')
    {
      var cpayload = {
        RefNo: refno,
        language: this.language
      }
      cdata = await this.getCnchild(cpayload);
      // console.log('cdata',cdata);
    }

    if(this.header != 'DN' && this.header != 'CN')
    {
      var results = cdata.data;

      for(var i in results)
      {
        results[i].Qty = this.formatAmount(results[i].Qty,'qty');
        results[i].TotalPrice = this.formatAmount(results[i].TotalPrice,'$');
      }

      this.jsonChild = cdata.data;
      // console.log('jsonChild',this.jsonChild);
    }
    else
    {
      var results = cdata.response;

      for(var i in results)
      {
        results[i].Qty = this.formatAmount(results[i].Qty,'qty');
        if(this.header == 'DN'){
          results[i].TotalPrice = this.formatAmount(results[i].TotalPrice,'$');
        }

      }
      // console.log('results',results);
      this.jsonChild = cdata.response;
      // console.log('jsonChild',this.jsonChild);
    }


    this.showAddLoading = false;
  },
};
</script>

<style scoped>
td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

.center
{
  /* border: none; */
  text-align: center;
}
.right
{
  text-align: right;
}

.leftwpadding
{
  padding-top:6px;
  padding-bottom:6px;
}

.leftwopadding
{
  padding-left: 15px;
  text-align: left;
}

.rightwopadding
{
  padding-right: 20px;
  text-align: right;
}

.centerwpadding
{
  padding-top:6px;
  padding-bottom:6px;
  text-align: center;
  padding-right: 10px;
}

.rightwpadding
{
  padding-top:6px;
  padding-bottom:6px;
  text-align: right;
  padding-right: 10px;
}
.card_ypadding
{
  padding-top: 20%;
  padding-bottom: 20%;
}
.custom_delete
{
  color: #C10015;
  text-decoration: none; /* Remove underline by default */
  transition: text-decoration 0.3s;
  position: absolute;
  padding:0px;
  padding-left: 10px;
  top: 8px;
  left: 10px;
  z-index: 1;
}
.custom_delete:hover {
  cursor: pointer;
  text-decoration: underline; /* Underline on hover */
}

.custom_close_button
{
  color: #928f8f;
  position: absolute;
  padding: 0;
  padding-left: 10px;
  top: 1px;
  right: 12px; /* Adjust the desired distance from the right */
  z-index: 1;
}

* >>> .q-btn-dropdown__arrow
{
  display: none;
}
.custom_back_button
{
  position: absolute;
  padding:0px;
  padding-left: 10px;
  top: 10px;
  left: 12px;
  z-index: 1;
}

.custom_more_button
{
  color: #928f8f;
  position: absolute;
  padding: 8px;
  padding-right: 10px;
  top: 10px;
  right: 12px; /* Adjust the desired distance from the right */
  z-index: 1;
}

.header_top_mobile
{
  color: #a5d2ff;
  text-align: center;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 0px;
  padding-bottom: 0px;
}
@media screen and (min-width: 1024px) {
  .four_column_left
  {
    padding-right: 1%;
  }
}
* >>> .q-stepper__step-inner
{
  padding: 0px;
  padding-left: 5px;
  padding-right: 5px;
}

@media screen and (min-width: 1024px) and (max-width: 1560px){
 .padding_right
  {
    padding-right: 10px;
  }
}

.dialog_action
{
  height: 55px;
  position: sticky;
  padding:0px;
  padding-right: 20px;
  padding-left: 20px;
  bottom: 0px;
  background-color: white;
}
.header_top
{
  position: sticky;
  top: 50px;
  z-index: 2;
  padding:0px;
}
.intermediate
{
  padding: 0px;
  width: 100%;
  height: 5px;
  background-color:#ededed;
}

.header_text
{
  padding-left: 16px;
  padding-right: 16px;
  font-weight: bold;
}
.card_sides
{
  padding-left: 10px;
  padding-right: 10px;
}

.upload_container
{
    padding: 10px;
    padding-top: 0px;
}

* >>> .q-table__container
{
    padding: 0px;
    border-radius: 0px;
    padding: 0px !important;
}

.card_section_two
{
    margin-top: 10px;
}

.card_section_second_content
{
    border: 2px solid #ababab;
    /* min-height: 60vh; */
    overflow-y: scroll;
}

/* width */
.card_section_second_content::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

/* Track */
.card_section_second_content::-webkit-scrollbar-track {
  /* box-shadow: inset 0 0 5px grey;  */
  border-radius: 10px;
}

/* Handle */
.card_section_second_content::-webkit-scrollbar-thumb {
  /* background: #8070d4; */
  background: #ababab;
  border-radius: 10px;
}

/* Handle on hover */
.card_section_second_content::-webkit-scrollbar-thumb:hover {
  background: #ababab;
}

/* .q-form
{
  width: 100%;
} */

/* @media screen and (min-width: 1024px) { */

.input_wrapper_right
{
  padding-right: 1%;
}
.input_wrapper_center
{
  padding-right: 1%;
}
/* } */

@media screen and (max-width: 1024px) {
  .two_column_left
  {
    padding-right: 2%;
  }
}

.dialog_font
{
  font-weight: bold;
  font-size: 13px;
}

.dialog_separator
{
  padding-top: 8px;
}

.upload_separator_first
{
    /* border-bottom: 1px solid #DEE1E6; */
    margin: 10px;
    padding-top: 0px;
    padding-bottom: 10px;
}

.upload_separator
{
    /* border-bottom: 1px solid #DEE1E6; */
    margin: 10px;
    /* padding-top: 10px; */
    /* padding-bottom: 30px; */
}

.custom_cancel_button
{
    border: 1px solid black;
}

/* * >>> .q-table__top
{
  padding-right: 0px;
} */

/* .content_body_dialog
{
    height: 80vh;
    overflow-y: scroll;
} */

* >>> .q-field--disabled > .q-field__inner > .q-field__control
{
  background-color: #cccccc !important;
}
</style>
