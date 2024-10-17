<template>
  <q-layout view="hHh Lpr lff">
    <!-- Header handles the toolbar for desktop and triggers dialog for mobile -->
    <Header @trigger_dialog="handleDialogTrigger" />
      
    <Sidebar ref="sidebar" />

    <q-page-container>
      <div v-if="$q.screen.width > 599" ><!--class="page-section"-->
        <!-- <custom-breadcrumbs :crumbs="currentBreadcrumbs" />  -->
        <!-- <div class="left-container">
          <PrintContainer :pageFunction="pageFunction" :json="json" />
          <TotalPurchase 
            v-if="showTotalPurchase" 
            :refno="refNo" 
            :total="total" 
            :subTotal1="subTotal1"
            :pageFunction="pageFunction" 
            @total-updated="updateTotal"
            @subtotal1-updated="updateSubTotal1"
          />
        </div> -->
      </div>
      <router-view 
        :key="$route.fullPath" 
       
      />
    </q-page-container>
  </q-layout>
</template>

<script>
import Header from './Header';
import Sidebar from './Sidebar';
import CustomBreadcrumbs from 'src/components/Base/CustomBreadcrumbs.vue';
import TotalPurchase from 'src/components/Base/TotalPurchase.vue';  
import PrintContainer from 'src/components/Base/PrintContainer.vue';

export default {
  name: "Main",
  components: {
    Header,
    Sidebar,
    CustomBreadcrumbs,
    TotalPurchase,
    PrintContainer
  },
  data() {
    return {
      outlet_code: sessionStorage.getItem('outlet_code') || '',
      refNo: this.$route.query.refno || '',
      itemcode: this.$route.query.Itemcode || '',
      pageFunction: this.$route.name,
      total: 0,
      subTotal1: 0,
      TotalPrice: 0,
    };
  },
  computed: {
    currentBreadcrumbs() {
      const crumbs = this.$route.meta.breadcrumb || [];
      return crumbs.map((crumb, index) => {
        let label = crumb.label;
        if (label === 'Outlet' && this.outlet_code) {
          label = `${label} / ${this.outlet_code}`;
        }
        if (label === 'Edit Item Master' && this.itemcode) {
          label = `${label} / ${this.itemcode}`;
        }
        if (['Edit Purchase Order', 'Edit Goods Received Note', 'Edit Debit Note', 'Edit Credit Note'].includes(label) && this.refNo) {
          label = `${label} / ${this.refNo}`;
        }
        return {
          ...crumb, 
          label,
          active: index === crumbs.length - 1,
        };
      });
    },
    showTotalPurchase() {
      return ['EditPurchaseOrder', 'EditGoodsReceivedNote', 'EditDebitNote', 'EditCreditNote'].includes(this.pageFunction);
    },
    json() {
      return {
        RefNo: this.refNo,
        user_name: sessionStorage.getItem("user_name") || '',  
        session_outlet_guid: sessionStorage.getItem("session_outlet_guid") || '',
      };
    }
  },
  methods: {
    handleDialogTrigger() {
      if (this.$refs.sidebar && typeof this.$refs.sidebar.drawer !== 'undefined') {
        this.$refs.sidebar.drawer = true;  
      }
    },
    // updateTotal(newTotal) {
    //   this.total = newTotal;
    // },
    // updateSubTotal1(newSubTotal1) {
    //   this.subTotal1 = newSubTotal1;  
    //   this.TotalPrice = newSubTotal1; 
    // },
  },
  watch: {
    $route(to, from) {
      this.refNo = to.query.refno || '';
      this.itemcode = to.query.Itemcode || '';
      this.outlet_code = sessionStorage.getItem('outlet_code');
      this.pageFunction = to.name;
    }
  },
};
</script>

<style>
.page-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 5px;
}
.left-container {
  display: flex;
  gap: 16px;
  align-items: center;
}
</style>
