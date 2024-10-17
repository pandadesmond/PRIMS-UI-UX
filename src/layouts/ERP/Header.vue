<template>
  <q-header>
    <q-toolbar class="toolbar-container"  >
      <!-- mobile hamburger -->
      <q-btn
        v-if="$q.screen.lt.sm"
        flat
        dense
        round
        icon="menu"
        aria-label="Menu"
        @click="toggleDrawer"
      />

      <div class="row col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="justify-content: space-between;">
        <div class="row items-center">

          <MenuItem
            v-for="item in menuItems"
            :key="item.name"
            :item="item"
            :activeItem="activeItem"
            @set-active="setActiveMenu"
          />

        </div>
        <div v-if="$q.screen.width > 599" class="profile-logo-container">
        <Profile />
        <img class="header-logo" src="panda_profile.png" />
      </div>
      </div>


    </q-toolbar>
  </q-header>
</template>



<script>
import Profile from 'src/components/ERP/Base/Profile';
import MenuItem from 'src/components/ERP/Base/MenuItem';
import EssentialLink from 'src/components/ERP/Base/EssentialLink';

export default {
  name: "Header",
  components: {
    Profile,
    MenuItem
  },
  data() {
    return {
      menuItems: [
        {
          name: 'Configuration',
          child: [
            {
              name: 'Site Management',
              child: [
                { name: 'Organisation Profile' },
                { name: 'Concept/Banner' },
                { name: 'Outlet & Location' },
                { name: 'Preference' },
                { name: 'Closing Period' }
              ]
            },
            {
              name: 'AP/AR Management',

              child: [
                { name: 'Payment Term' },
                { name: 'AP Supplier',  link: `/erp/setup/VendorMaster`},
                { name: 'Principle' },
                { name: 'AR Customer', link: `/erp/setup/CustomerMaster`},
                { name: 'Sales Agent' }
              ]
            },
            {
              name: 'Hierarchy',
              child: [
                { name: 'Division' },
                { name: 'Department' },
                { name: 'Principle' },
                { name: 'Manufacturer' },
                { name: 'Brand' }
              ]
            },
            {
              name: 'Product',
              child: [
                { name: 'Stock Type' },
                { name: 'Inventory Type' },
                { name: 'Item Type' },
                { name: 'Price Type' },
                { name: 'Unit of Measurement' },
                { name: 'Colour and Size' },
                { name: 'Country of Origin' },
                { name: 'Purchase Group' },
                { name: 'GST Tax Code' },
                { name: 'SST Tax Code' },
                { name: 'Miscellaneous Group' },
              ]
            },
            {
              name: 'Transaction',
              child: [
                { name: 'Surcharge/Discount Code' },
                { name: 'Transaction Reason Code' },
                { name: 'CN By Amount Group' },
                { name: 'DN By Amount Group' },
                { name: 'Promotion Theme' },
                { name: 'Promotion Template' }
              ]
            },
            {
              name: 'Financial Account',
              child: [
                { name: 'Closing Period' },
                { name: 'Transaction GL Code' },
                { name: 'Currency' },
              ]
            },
            {
              name: 'System',
              child: [
                { name: 'User Access Right' },
                { name: 'User Management' },
                { name: 'System Running' },
                { name: 'Manufacturer' },
                { name: 'Currency' }
              ]
            }
          ]
        },
        {
          name: 'Product',
          child: [
            {
              name: 'Product Master',
              link: `/erp/Itemmaster/Itemmaster`,
            },
            {
              name: 'Selling Price Change',
              link: `/erp/Product/PriceChange`,
            },
            {
              name: 'Supplier Cost Change',
              child: [
                { 
                  name: 'Update by Supplier',
                  link: `/erp/Product/CostChange`,
                 },
                { name: 'Update by Item' },
              ]
            },
            {
              name: 'Configuration by Site',
              child: [
                { name: 'Product Status' },
                { name: 'Replenishment' },
                { name: 'Restriction' },
              ]
            },
            {
              name: 'Request',
              child: [
                { name: 'New Listing/Update Info' },
                { name: 'Product Attribute' },
                { name: 'Product Assortment' },
                { name: 'Change Item Link' },
                { name: 'Change Pack Size' },
                { name: 'Change Item Listed Cost' },
                { name: 'Change Last Received Cost' },
                { name: 'Change GST Tax Code' },
                { name: 'Change Permanent Promotion' },
                {
                  name: 'Reassign Item Type',
                  link:  `/erp/Configuration/ReassignItemType`
                }
              ]
            },
            {
              name: 'Item Master New',
              link: `/erp/Itemmaster/CreateEditIM_new?Itemcode=216733`
            },
          ]
        },
        {
          name: 'AP Purchase',
          child: [
            {
              name: 'CPO - Central Purchase Order',
              link: `/erp/Purchase/PurchaseOrder`,
            },
            {
              name: 'SPO - Store Purchase Order',
            },
            {
              name: 'GRN - Goods Received Note',
              link: `/erp/Purchase/GoodsReceivedNote`,
            },
            {
              name: 'PRDN - Purchase Return Debit Note',
            },
            {
              name: 'PRCN - Purchase Return Credit Note',
            },
            {
              name: 'PDN - Purchase DN By Amount',
            },
            {
              name: 'PCN - Purchase CN By Amount',
            },
            {
              name: 'Purchase Promotion',
            },
            {
              name: 'Auto Ordering',
              link: `/erp/Purchase/AutoOrdering`,
            },
          ]
        },
        {
          name: 'AR Sales',
          child: [
            {
              name: 'SO - Sales Order',
            },
            {
              name: 'SI - Sales Invoice',
            },
            {
              name: 'SICN - Sales Return Credit Note',
            },
            {
              name: 'SIDN - Sales Return Debit Note',
            },
            {
              name: 'SCN - Sales CN By Amount',
            },
            {
              name: 'SDN - Sales DN By Amount',
            }
          ]
        },
        {
          name: 'Inventory',
          child: [
            {
              name: 'IBT/ICT Request',
              child: [
                {
                  name: 'Purchase',
                },
                {
                  name: 'Return',
                },
                {
                  name: 'Flow Through',
                  link: `/erp/Inventory/FlowThrough`,
                }
              ]
            },
            {
              name: 'IBT/ICT Delivery',
            },
            {
              name: 'Stock Disposal',
            },
            {
              name: 'Stock Adjustment',
            },
            {
              name: 'Stock Transform',
              child: [
                {
                  name: 'BOM Maintenance',
                },
                {
                  name: 'Production',
                },
                {
                  name: 'Hamper',
                }
              ]
            },
            {
              name: 'Location Transfer',
            }
          ]
        },
        {
          name: 'Promotion',
          child: [
            {
              name: 'Direct Discount',
              child: [
                {
                  name: 'Product',
                },
                {
                  name: 'Department',
                },
                {
                  name: 'Sub-Dept',
                },
                {
                  name: 'Category',
                },
                {
                  name: 'Manufacturer',
                },
                {
                  name: 'Brand',
                },
                {
                  name: 'Item Type',
                },
                {
                  name: 'Price Type',
                }
              ]
            },
            {
              name: 'Multi Buy',
              child: [
                {
                  name: 'Type',
                }
              ]
            },
            {
              name: 'Mix & Match',
            }
          ]
        },
        {
          name: 'Setup',
          child: [
            {
              name: 'Company Profile',
              link: `/erp/setup2/companyprofile`,
            },
            {
              name: 'Currency',
              link:  `/erp/setup2/currency`
            },
            {
              name: 'Weighing Type Module Assignment',
              link:  `/erp/setup2/weighingtypemoduleassignment`
            },
            {
              name: 'Payment Term',
              link:  `/erp/setup2/paymentterm`
            },
            {
              name: 'Surcharge code / Discount',
              link:  `/erp/setup2/surchargecode`
            },
            {
              name: 'Transaction Reason Code',
              child:[
                { name: 'Goods Receive Note',  link: `/erp/setup2/goodreceivenote`},
                { name: 'Debit Note',  link: `/erp/setup2/debitnote`},
                { name: 'Adjustment',  link: `/erp/setup2/adjustment`},
                { name: 'Credit Note',  link: `/erp/setup2/creditnote`},
                { name: 'Transform',  link: `/erp/setup2/transform`},
                { name: 'IBT Picking',  link: `/erp/setup2/ibtpicking`},
                { name: 'PO Cancellation',  link: `/erp/setup2/pocancellation`},
                { name: 'SO Cancellation',  link: `/erp/setup2/socancellation`},
                { name: 'Reduce to Clear',  link: `/erp/setup2/reducetoclear`},
                { name: 'PO Group', link:  `/erp/setup2/pogroup`},

              ]
            },
            {
              name: 'System Access Right',
              link:  `/erp/setup2/systemaccessright`
            },
            {
              name: 'Branch',
              link:  `/erp/setup2/branch`
            },
            {
              name: 'GST Tax Code',
              child:[
              { name: 'Purchase',  link: `/erp/setup2/gsttaxcodepurchase`},
              { name: 'Supply',  link: `/erp/setup2/gsttaxcodesupply`},
              ]
            },
          ]
        },
      ],
      activeItem: ''
    };
  },

  methods: {
    setActiveMenu(name) {
      this.activeItem = name;
    },
    toggleDrawer() {
      this.$emit('trigger_dialog');
    }
  }
};
</script>

<style scoped>

.toolbar-container {
  color: #29292A;
  box-shadow: 0 1px 12px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
}

.menu-label {
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
}

.profile-logo-container {
  display: flex;
  align-items: center;
}

.header-logo {
  padding-right: 6px;
}


</style>
