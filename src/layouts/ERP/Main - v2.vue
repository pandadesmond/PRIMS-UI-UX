<template>
  <q-layout view="hHh Lpr lff">
    <!-- v-if="$q.screen.width > 599"  -->
    <Header 
    @side_menu_click="side_menu_click_main" 
    :miniStateMain="miniState"
    @trigger_dialog="handleDialogTrigger" />
      
    <Sidebar 
    ref="sidebar"
    v-on:clickSidebar="handleClickSidebar" 
    :miniState="miniState" 
    v-on:clicksidebarlist="onSidebarList"/>

    <q-page-container>
      <div v-if="$q.screen.width > 599" class="page-section">
        <!-- <custom-breadcrumbs :crumbs="currentBreadcrumbs" /> -->
        <div class="left-container">
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
        </div>
      </div>
      <router-view 
        @clickSidebar="handleClickSidebar" 
        :key="$route.fullPath" 
        :miniState="miniState" 
        @total-updated="updateTotal"
        @subtotal1-updated="updateSubTotal1"
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
      miniState: this.checkScreenSize(),
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
    handleDrawerToggle(miniState) {
      this.miniState = miniState;
    },
    handleDialogTrigger() {
      // Check if the sidebar is defined and drawer property is available
      if (this.$refs.sidebar && typeof this.$refs.sidebar.drawer !== 'undefined') {
        this.$refs.sidebar.drawer = true;  
      } else {
        console.error('Sidebar component or drawer property is not defined.');
      }
    },
    checkScreenSize() {
    return document.documentElement.clientWidth > 599;
  },
  
  handleResize() {
    this.miniState = this.checkScreenSize();
  },
    handleClickSidebar(value) {
      this.miniState = value;
    },
    onSidebarList() {
      this.miniState = false;
    },
    side_menu_click_main(value) {
      this.miniState = value;
    },
    updateTotal(newTotal) {
      this.total = newTotal;
    },
    updateSubTotal1(newSubTotal1) {
      this.subTotal1 = newSubTotal1;  
      this.TotalPrice = newSubTotal1; 
    },
  },
  watch: {
    $route(to, from) {
      this.refNo = to.query.refno || '';
      this.itemcode = to.query.Itemcode || '';
      this.outlet_code = sessionStorage.getItem('outlet_code');
      this.pageFunction = to.name;
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  }
};
</script>

<style>
.page-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* padding: 24px 24px; Desmond change*/
  padding: 5px 5px;
}
.left-container {
  display: flex;
  gap: 16px;
  align-items: center;
}

</style>
