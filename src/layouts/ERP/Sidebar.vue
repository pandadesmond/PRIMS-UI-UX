<template>
<q-drawer v-if="$q.screen.width > 599" v-model="drawer" show-if-above :mini="x" :width="200" :breakpoint="breakpoints" bordered>
    <!-- <q-drawer v-model="drawer" show-if-above :mini="x" :width="200" :breakpoint="500" bordered> -->
    <q-item-label
        header
    >
      Inventory Management
    </q-item-label>
    <!-- <q-list>
        <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
    </q-list> -->

    <q-list :key="menu_details" v-for="menu_details in new_linksList">
        <q-expansion-item
            :expand-separator="menu_details.expand_separator"
            :icon="menu_details.icon"
            :label="menu_details.label"
            :caption="menu_details.caption"
            :default-opened="menu_details.default_opened"
            :content-inset-level="menu_details.content_inset_level"
            @click="clickExpandList"
        >
              <q-list  >

                <EssentialLink v-for="link in menu_details.insetLevelMenu" :key="link.title" v-bind="link">

                </EssentialLink>
                <q-list :key="menu_details2" v-for="menu_details2 in new_gstList">
                  <q-expansion-item
                    :expand-separator="menu_details2.expand_separator"
                    :icon="menu_details2.icon"
                    :label="menu_details2.label"
                    :caption="menu_details2.caption"
                    :default-opened="menu_details2.default_opened"
                    :content-inset-level="menu_details2.content_inset_level"
                  >
                   <EssentialLink v-for="link in menu_details2.insetLevelMenu" :key="link.title" v-bind="link">

                </EssentialLink>
                       </q-expansion-item>
              </q-list>
            </q-list>
        </q-expansion-item>
    </q-list>

</q-drawer>

<q-dialog v-else v-model="drawer" maximized persistent transition-show="slide-up" transition-hide="slide-down">
  <q-card style="margin-top: 5%; background-color: #ededed">
    <q-card-section class="row header_top_mobile">
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <div class="row items-center">
          <span>
            <Button_icon style="cursor: auto" :big_round="true" :icon="'widgets'" :flat="false" :font_color="'white'" :color="'primary'" :outline="false" size="12px"/>
          </span>

          <div class="text-subtitle1 header_text" style="margin-top: 5px;">Backend</div>

          <!-- <div class="col-xs-6" align="right" style="margin-top: 5px;"><Language /></div> -->
          <!--comment due to language readiness-->
        </div>
      </div>
      <div class="custom_close_button">
        <q-btn icon="close" flat round dense @click="close()" :disable="false"/>
      </div>
    </q-card-section>

    <q-card-section style="padding: 0px 25px 0px 20px;">
      <div class="row q-pt-sm" :key="menu_details" v-for="menu_details in new_linksList">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <span class="text-subtitle1">{{ menu_details.label }}</span>

          <q-list flat style="width: 100%; border-radius:6px; background-color: white;">
            <!-- :href="link.link" -->
            <q-item :href="link.link" v-for="(link, index) in menu_details.insetLevelMenu" :key="link.title" style="height: 40px;padding: 0px;">
              <q-item-section @click="handleLinkClick(link)" avatar class="q-pa-md">
                  <q-icon size="sm" :name="link.icon" />
              </q-item-section>

              <q-item-section v-if="index != 0" @click="handleLinkClick(link)" style="border-top: 1px solid rgba(0, 0, 0, 0.12);">
                  <div class="row">
                      <div class="col-xs-11 col-sm-11 col-md-11 col-lg-11 col-xl-11">
                          {{ link.title }}
                      </div>
                      <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1 col-xl-1">
                          <q-icon style="margin-left: -10px;" size="sm" name="chevron_right" />
                      </div>
                  </div>
              </q-item-section>

              <q-item-section v-else @click="handleLinkClick(link)">
                  <div class="row">
                      <div class="col-xs-11 col-sm-11 col-md-11 col-lg-11 col-xl-11">
                          {{ link.title }}
                      </div>
                      <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1 col-xl-1">
                          <q-icon style="margin-left: -10px;" size="sm" name="chevron_right" />
                      </div>
                  </div>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>

      <div class="q-py-sm">
        <Button_icon v-on:receiveClick="logout()" class="full-width" :small_round="true" :text="'Logout'" :flat="false" :font_color="'white'" :color="'negative'" :outline="false" size="12px"/>
      </div>
    </q-card-section>

    <q-inner-loading
      :showing="showAddLoading"
      color="primary"
    />
  </q-card>
</q-dialog>
</template>

<script>
import EssentialLink from 'src/components/Base/EssentialLink'
import Button_icon from 'src/components/ERP/Base/Button_icon'
import Language from 'src/components/ERP/Base/Language'
import {
    defineComponent,
    ref
} from 'vue'

import {
  Loading,
  // optional!, for example below
  // with custom spinner
  QSpinnerTail
} from 'quasar'

export default defineComponent({
    name: 'Sidebar',
    // props: {
    //     miniState: Boolean
    // },
    props: ['miniState'],
    components: {
        EssentialLink,
        Button_icon,
        Language,
    },
    data() {
        return {
            new_essential_links: this.new_linksList,
            // new_gstList     : gstList,
            // essentialLinks: linksList,
            drawer: ref(false),
            x: this.miniState,
            default: 1,
            breakpoints: 500,
            folder_path: '',
            new_linksList: [],
            tab: {
              width: null,
            },
            session_ip: sessionStorage.getItem("session_ip") != "" && sessionStorage.getItem("session_ip") != "null" && sessionStorage.getItem("session_ip") != null ? sessionStorage.getItem("session_ip") : "",
        }
    },
    created()
    {
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            this.breakpoints = window.outerWidth;
        }


        this.folder_path = this.$global_config.folder_path;

        if(this.session_ip != "")
        {

          this.new_linksList = [
          // {
          //             label: "Setup",
          //             icon: "tune",
          //             caption: "",
          //             default_opened: false,
          //             content_inset_level: "0.2",
          //             expand_separator: true,
          //             insetLevelMenu: [
          //                 // {
          //                 //     title: 'main',
          //                 //     caption: '',
          //                 //     icon: 'list',
          //                 //     link: '/#/erp/setup/component'
          //                 // },
          //                 {
          //                     title: 'Company Profile',
          //                     caption: '',
          //                     icon: 'business',
          //                     link: this.folder_path+'/#/erp/setup/companyprofile'
          //                 },
          //                 // {
          //                 //     title: 'Company Profile Backup',
          //                 //     caption: '',
          //                 //     icon: 'widgets',
          //                 //     link: '/#/erp/setup/companyprofilebackup'
          //                 // },
          //                 // {
          //                 //     title: 'Company Profile Backup_2',
          //                 //     caption: '',
          //                 //     icon: 'widgets',
          //                 //     link: '/#/erp/setup/companyprofilebackup_2'
          //                 // },
          //                 // {
          //                 //     title: 'Company Profile Backup_3',
          //                 //     caption: '',
          //                 //     icon: 'widgets',
          //                 //     link: '/#/erp/setup/companyprofilebackup_3'
          //                 // },
          //                 // {
          //                 //     title: 'Company Profile Backup_4',
          //                 //     caption: '',
          //                 //     icon: 'widgets',
          //                 //     link: '/#/erp/setup/companyprofilebackup_4'
          //                 // },
          //                 // {
          //                 //     title: 'Currency',
          //                 //     caption: '',
          //                 //     icon: 'widgets',
          //                 //     link: '/#/erp/setup/currency'
          //                 // },
          //                 // {
          //                 //     title: 'Weighing Type Module Assignment',
          //                 //     caption: '',
          //                 //     icon: 'widgets',
          //                 //     link: '/#/erp/setup/weighing'
          //                 // },
          //                 // {
          //                 //     title: 'Supplier',
          //                 //     caption: '',
          //                 //     icon: 'widgets',
          //                 //     link: '/#/erp/setup/supplier'
          //                 // },
          //                 // {
          //                 //     title: 'Branch',
          //                 //     caption: '',
          //                 //     icon: 'widgets',
          //                 //     link: '/#/erp/setup/branch'
          //                 // },
          //                 // // {
          //                 // //     title: 'GST Tax Code',
          //                 // //     caption: '',
          //                 // //     icon: 'widgets',
          //                 // //     link: '/#/erp/setup/gsttaxcode'
          //                 // // },
          //                 // // {
          //                 // //     title: 'GST Tax Code_2',
          //                 // //     caption: '',
          //                 // //     icon: 'widgets',
          //                 // //     link: '/#/erp/setup/gsttaxcode_2'
          //                 // // },

          //                 // {
          //                 //     title: 'System Access Right',
          //                 //     caption: '',
          //                 //     icon: 'widgets',
          //                 //     link: '/#/erp/setup/systemaccessright'
          //                 // },
          //                 // // {
          //                 // //     title: 'System Access Right_2',
          //                 // //     caption: '',
          //                 // //     icon: 'widgets',
          //                 // //     link: '/#/erp/setup/systemaccessright_2'
          //                 // // },
          //                 // {
          //                 //     title: 'Payment Term',
          //                 //     caption: '',
          //                 //     icon: 'widgets',
          //                 //     link: '/#/erp/setup/PaymentTerm'
          //                 // },
          //                 // {
          //                 //     title: 'Reason Code',
          //                 //     caption: '',
          //                 //     icon: 'widgets',
          //                 //     link: '/#/erp/setup/ReasonCode'
          //                 // },
          //                 // {
          //                 //     title: 'Surcharge /Discount Code',
          //                 //     caption: '',
          //                 //     icon: 'widgets',
          //                 //     link: '/#/erp/setup/SurchargeDiscountCode'
          //                 // },
          //                 {
          //                     title: 'Division Hierarchy',
          //                     caption: '',
          //                     icon: 'category',
          //                     link: this.folder_path+'/#/erp/setup/divisionhierarchy'
          //                 },
          //                 {
          //                     title: 'UOM',
          //                     caption: '',
          //                     icon: 'straighten',
          //                     link: this.folder_path+'/#/erp/setup/uom'
          //                 },
          //                 {
          //                     title: 'Manufacturer Hierarchy',
          //                     caption: '',
          //                     icon: 'flag',
          //                     link: this.folder_path+'/#/erp/setup/manufacturerhierarchy'
          //                 },
          //                 {
          //                     title: 'Variant',
          //                     caption: '',
          //                     icon: 'inventory',
          //                     link: this.folder_path+'/#/erp/setup/variant'
          //                 },
          //                 {
          //                     title: 'Size',
          //                     caption: '',
          //                     icon: 'web_stories',
          //                     link: this.folder_path+'/#/erp/setup/size'
          //                 },
          //                 {
          //                     title: 'Origin',
          //                     caption: '',
          //                     icon: 'trip_origin',
          //                     link: this.folder_path+'/#/erp/setup/origin'
          //                 },
          //                 {
          //                     title: 'Weight Type',
          //                     caption: '',
          //                     icon: 'scale',
          //                     link: this.folder_path+'/#/erp/setup/weight_type'
          //                 },
          //                 // {
          //                 //     title: 'Location',
          //                 //     caption: '',
          //                 //     icon: 'widgets',
          //                 //     link: '/#/erp/setup/Location'
          //                 // },
          //                 // {
          //                 //     title: 'System User',
          //                 //     caption: '',
          //                 //     icon: 'widgets',
          //                 //     link: '/#/erp/setup/SystemUser'
          //                 // },
          //             ]
          //         },
          //         {
          //             label: "Item",
          //             icon: "sell",
          //             caption: "",
          //             default_opened: false,
          //             content_inset_level: "0.2",
          //             expand_separator: true,
          //             insetLevelMenu: [
          //                 {
          //                     title: 'Itemmaster',
          //                     caption: '',
          //                     icon: 'storage',
          //                     link: this.folder_path+'/#/erp/item/itemmaster'
          //                 },
          //                 {
          //                     title: 'Assorted',
          //                     caption: '',
          //                     icon: 'workspaces_filled',
          //                     link: this.folder_path+'/#/erp/item/assorted'
          //                 },
          //             ]
          //         },
          //         {
          //             label: "Location",
          //             icon: "fmd_good",
          //             caption: "",
          //             default_opened: false,
          //             content_inset_level: "0.2",
          //             expand_separator: true,
          //             insetLevelMenu: [
          //                 {
          //                     title: 'Continent',
          //                     caption: '',
          //                     icon: 'south_america',
          //                     link: this.folder_path+'/#/erp/location/continent'
          //                 },
          //                 {
          //                     title: 'Currency',
          //                     caption: '',
          //                     icon: 'attach_money',
          //                     link: this.folder_path+'/#/erp/location/currency'
          //                 },
          //                 {
          //                     title: 'Country Hierarchy',
          //                     caption: '',
          //                     icon: 'public',
          //                     link: this.folder_path+'/#/erp/location/countryhierarchy'
          //                 },
          //             ]
          //         },
          {
                      label: "Itemmaster",
                      // icon: "receipt",
                      caption: "",
                      default_opened: false,
                      content_inset_level: "0.2",
                      expand_separator: true,
                      insetLevelMenu: [
                          {
                              title: 'Item Master',
                              caption: '',
                              icon: 'inventory_2',
                              link: this.folder_path+'/#/erp/Itemmaster/Itemmaster'
                              // link: '/#/erp/purchase/purchaseorder'
                          },
                      ]
                  },
                  {
                      label: "Purchase",
                      // icon: "receipt",
                      caption: "",
                      default_opened: false,
                      content_inset_level: "0.2",
                      expand_separator: true,
                      insetLevelMenu: [
                          {
                              title: 'Purchase Order',
                              caption: '',
                              icon: 'edit_document',
                              link: this.folder_path+'/#/erp/purchase/purchaseorder'
                              // link: '/#/erp/purchase/purchaseorder'
                          },
                          {
                              title: 'Goods Received Note',
                              caption: '',
                              icon: 'receipt_long',
                              link: this.folder_path+'/#/erp/purchase/goodsreceivednote'
                              // link: '/#/erp/purchase/goodsreceiving'
                          },
                          {
                                  title: 'Debit Note',
                                  caption: '',
                                  icon: 'assignment_return',
                                  link: this.folder_path+'/#/erp/purchase/debitnote'
                                  // link: '/#/erp/purchase/debitnote'
                              },
                              {
                                title: 'Credit Note',
                                caption: '',
                                icon: 'request_quote',
                                link: this.folder_path+'/#/erp/purchase/creditnote'
                                // link: '/#/erp/purchase/debitnote'
                            },

                          // {
                          //     title: 'Interbranch Transfer',
                          //     caption: '',
                          //     icon: 'local_shipping',
                          //     link: this.folder_path+'/#/erp/purchase/interbranchtransfer'
                          // },
                      ]
                  },
                  // {
                  //     label: "Sales",
                  //     // icon: "request_quote",
                  //     caption: "",
                  //     default_opened: false,
                  //     content_inset_level: "0.2",
                  //     expand_separator: true,
                  //     insetLevelMenu: [
                  //     {
                  //               title: 'Debit Note',
                  //               caption: '',
                  //               icon: 'assignment_return',
                  //               link: this.folder_path+'/#/erp/purchase/debitnote'
                  //               // link: '/#/erp/purchase/debitnote'
                  //           },
                  //           {
                  //             title: 'Credit Note',
                  //             caption: '',
                  //             icon: 'request_quote',
                  //             link: this.folder_path+'/#/erp/purchase/creditnote'
                  //             // link: '/#/erp/purchase/debitnote'
                  //         },
                  //         // {
                  //         //     title: 'Sales Order',
                  //         //     caption: '',
                  //         //     icon: 'edit_document',
                  //         //     link: this.folder_path+'/#/erp/sales/salesorder'
                  //         // },
                  //         // {
                  //         //     title: 'Sales Invoice',
                  //         //     caption: '',
                  //         //     icon: 'receipt_long',
                  //         //     link: this.folder_path+'/#/erp/sales/salesinvoice'
                  //         // },

                  //     ]
                  // },
                  // {
                  //     label: "Adjustment",
                  //     // icon: "build",
                  //     caption: "",
                  //     default_opened: false,
                  //     content_inset_level: "0.2",
                  //     expand_separator: true,
                  //     insetLevelMenu: [
                  //         {
                  //             title: 'Adjustment',
                  //             caption: '',
                  //             icon: 'adjust',
                  //             link: this.folder_path+'/#/erp/adjustment/adjustment'
                  //         },
                  //     ]
                  // },
                //   {
                //       label: "Document",
                //       // icon: "build",
                //       caption: "",
                //       default_opened: false,
                //       content_inset_level: "0.2",
                //       expand_separator: true,
                //       insetLevelMenu: [
                //           {
                //               title: 'Outlet',
                //               caption: '',
                //               icon: 'adjust',
                //               link: this.folder_path+'/#/erp/document/outlet'
                //           },
                //       ]
                //   },

          ];

        }

    },
    watch: {
        miniState(newVal) {

            if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                this.x = false;
                if(this.default == 1)
                {
                    this.drawer = true;
                    this.default = 0;
                }
                else
                {
                    this.drawer = !this.drawer;
                }
            }
            else{
                this.x = newVal;
            }
        },
        '$route'(to, from) {

//until here doing sidebar changes

          var session_ip = sessionStorage.getItem("session_ip") != "" && sessionStorage.getItem("session_ip") != "null" && sessionStorage.getItem("session_ip") != null ? sessionStorage.getItem("session_ip") : "";

          this.session_ip = session_ip;

          if(this.session_ip != "")
          {
            if(this.new_linksList.length <= 0)
            {

              this.new_linksList = [
              // {
              //             label: "Setup",
              //             icon: "tune",
              //             caption: "",
              //             default_opened: false,
              //             content_inset_level: "0.2",
              //             expand_separator: true,
              //             insetLevelMenu: [
              //                 // {
              //                 //     title: 'main',
              //                 //     caption: '',
              //                 //     icon: 'list',
              //                 //     link: '/#/erp/setup/component'
              //                 // },
              //                 {
              //                     title: 'Company Profile',
              //                     caption: '',
              //                     icon: 'business',
              //                     link: this.folder_path+'/#/erp/setup/companyprofile'
              //                 },
              //                 // {
              //                 //     title: 'Company Profile Backup',
              //                 //     caption: '',
              //                 //     icon: 'widgets',
              //                 //     link: '/#/erp/setup/companyprofilebackup'
              //                 // },
              //                 // {
              //                 //     title: 'Company Profile Backup_2',
              //                 //     caption: '',
              //                 //     icon: 'widgets',
              //                 //     link: '/#/erp/setup/companyprofilebackup_2'
              //                 // },
              //                 // {
              //                 //     title: 'Company Profile Backup_3',
              //                 //     caption: '',
              //                 //     icon: 'widgets',
              //                 //     link: '/#/erp/setup/companyprofilebackup_3'
              //                 // },
              //                 // {
              //                 //     title: 'Company Profile Backup_4',
              //                 //     caption: '',
              //                 //     icon: 'widgets',
              //                 //     link: '/#/erp/setup/companyprofilebackup_4'
              //                 // },
              //                 // {
              //                 //     title: 'Currency',
              //                 //     caption: '',
              //                 //     icon: 'widgets',
              //                 //     link: '/#/erp/setup/currency'
              //                 // },
              //                 // {
              //                 //     title: 'Weighing Type Module Assignment',
              //                 //     caption: '',
              //                 //     icon: 'widgets',
              //                 //     link: '/#/erp/setup/weighing'
              //                 // },
              //                 // {
              //                 //     title: 'Supplier',
              //                 //     caption: '',
              //                 //     icon: 'widgets',
              //                 //     link: '/#/erp/setup/supplier'
              //                 // },
              //                 // {
              //                 //     title: 'Branch',
              //                 //     caption: '',
              //                 //     icon: 'widgets',
              //                 //     link: '/#/erp/setup/branch'
              //                 // },
              //                 // // {
              //                 // //     title: 'GST Tax Code',
              //                 // //     caption: '',
              //                 // //     icon: 'widgets',
              //                 // //     link: '/#/erp/setup/gsttaxcode'
              //                 // // },
              //                 // // {
              //                 // //     title: 'GST Tax Code_2',
              //                 // //     caption: '',
              //                 // //     icon: 'widgets',
              //                 // //     link: '/#/erp/setup/gsttaxcode_2'
              //                 // // },

              //                 // {
              //                 //     title: 'System Access Right',
              //                 //     caption: '',
              //                 //     icon: 'widgets',
              //                 //     link: '/#/erp/setup/systemaccessright'
              //                 // },
              //                 // // {
              //                 // //     title: 'System Access Right_2',
              //                 // //     caption: '',
              //                 // //     icon: 'widgets',
              //                 // //     link: '/#/erp/setup/systemaccessright_2'
              //                 // // },
              //                 // {
              //                 //     title: 'Payment Term',
              //                 //     caption: '',
              //                 //     icon: 'widgets',
              //                 //     link: '/#/erp/setup/PaymentTerm'
              //                 // },
              //                 // {
              //                 //     title: 'Reason Code',
              //                 //     caption: '',
              //                 //     icon: 'widgets',
              //                 //     link: '/#/erp/setup/ReasonCode'
              //                 // },
              //                 // {
              //                 //     title: 'Surcharge /Discount Code',
              //                 //     caption: '',
              //                 //     icon: 'widgets',
              //                 //     link: '/#/erp/setup/SurchargeDiscountCode'
              //                 // },
              //                 {
              //                     title: 'Division Hierarchy',
              //                     caption: '',
              //                     icon: 'category',
              //                     link: this.folder_path+'/#/erp/setup/divisionhierarchy'
              //                 },
              //                 {
              //                     title: 'UOM',
              //                     caption: '',
              //                     icon: 'straighten',
              //                     link: this.folder_path+'/#/erp/setup/uom'
              //                 },
              //                 {
              //                     title: 'Manufacturer Hierarchy',
              //                     caption: '',
              //                     icon: 'flag',
              //                     link: this.folder_path+'/#/erp/setup/manufacturerhierarchy'
              //                 },
              //                 {
              //                     title: 'Variant',
              //                     caption: '',
              //                     icon: 'inventory',
              //                     link: this.folder_path+'/#/erp/setup/variant'
              //                 },
              //                 {
              //                     title: 'Size',
              //                     caption: '',
              //                     icon: 'web_stories',
              //                     link: this.folder_path+'/#/erp/setup/size'
              //                 },
              //                 {
              //                     title: 'Origin',
              //                     caption: '',
              //                     icon: 'trip_origin',
              //                     link: this.folder_path+'/#/erp/setup/origin'
              //                 },
              //                 {
              //                     title: 'Weight Type',
              //                     caption: '',
              //                     icon: 'scale',
              //                     link: this.folder_path+'/#/erp/setup/weight_type'
              //                 },
              //                 // {
              //                 //     title: 'Location',
              //                 //     caption: '',
              //                 //     icon: 'widgets',
              //                 //     link: '/#/erp/setup/Location'
              //                 // },
              //                 // {
              //                 //     title: 'System User',
              //                 //     caption: '',
              //                 //     icon: 'widgets',
              //                 //     link: '/#/erp/setup/SystemUser'
              //                 // },
              //             ]
              //         },
              //         {
              //             label: "Item",
              //             icon: "sell",
              //             caption: "",
              //             default_opened: false,
              //             content_inset_level: "0.2",
              //             expand_separator: true,
              //             insetLevelMenu: [
              //                 {
              //                     title: 'Itemmaster',
              //                     caption: '',
              //                     icon: 'storage',
              //                     link: this.folder_path+'/#/erp/item/itemmaster'
              //                 },
              //                 {
              //                     title: 'Assorted',
              //                     caption: '',
              //                     icon: 'workspaces_filled',
              //                     link: this.folder_path+'/#/erp/item/assorted'
              //                 },
              //             ]
              //         },
              //         {
              //             label: "Location",
              //             icon: "fmd_good",
              //             caption: "",
              //             default_opened: false,
              //             content_inset_level: "0.2",
              //             expand_separator: true,
              //             insetLevelMenu: [
              //                 {
              //                     title: 'Continent',
              //                     caption: '',
              //                     icon: 'south_america',
              //                     link: this.folder_path+'/#/erp/location/continent'
              //                 },
              //                 {
              //                     title: 'Currency',
              //                     caption: '',
              //                     icon: 'attach_money',
              //                     link: this.folder_path+'/#/erp/location/currency'
              //                 },
              //                 {
              //                     title: 'Country Hierarchy',
              //                     caption: '',
              //                     icon: 'public',
              //                     link: this.folder_path+'/#/erp/location/countryhierarchy'
              //                 },
              //             ]
              //         },
              {
                          label: "Itemmaster",
                          // icon: "receipt",
                          caption: "",
                          default_opened: false,
                          content_inset_level: "0.2",
                          expand_separator: true,
                          insetLevelMenu: [
                              {
                                  title: 'Item Master',
                                  caption: '',
                                  icon: 'inventory_2',
                                  link: this.folder_path+'/#/erp/Itemmaster/Itemmaster'
                                  // link: '/#/erp/purchase/purchaseorder'
                              },
                          ]
                      },
                      {
                          label: "Purchase",
                          // icon: "receipt",
                          caption: "",
                          default_opened: false,
                          content_inset_level: "0.2",
                          expand_separator: true,
                          insetLevelMenu: [
                              {
                                  title: 'Purchase Order',
                                  caption: '',
                                  icon: 'edit_document',
                                  link: this.folder_path+'/#/erp/purchase/purchaseorder'
                                  // link: '/#/erp/purchase/purchaseorder'
                              },
                              {
                                  title: 'Goods Received Note',
                                  caption: '',
                                  icon: 'receipt_long',
                                  link: this.folder_path+'/#/erp/purchase/goodsreceivednote'
                                  // link: '/#/erp/purchase/goodsreceiving'
                              },
                              {
                                  title: 'Debit Note',
                                  caption: '',
                                  icon: 'assignment_return',
                                  link: this.folder_path+'/#/erp/purchase/debitnote'
                                  // link: '/#/erp/purchase/debitnote'
                              },
                              {
                                title: 'Credit Note',
                                caption: '',
                                icon: 'request_quote',
                                link: this.folder_path+'/#/erp/purchase/creditnote'
                                // link: '/#/erp/purchase/debitnote'
                            },

                              // {
                              //     title: 'Interbranch Transfer',
                              //     caption: '',
                              //     icon: 'local_shipping',
                              //     link: this.folder_path+'/#/erp/purchase/interbranchtransfer'
                              // },
                          ]
                      },
                      // {
                      //     label: "Sales",
                      //     // icon: "request_quote",
                      //     caption: "",
                      //     default_opened: false,
                      //     content_inset_level: "0.2",
                      //     expand_separator: true,
                      //     insetLevelMenu: [
                      //     {
                      //             title: 'Debit Note',
                      //             caption: '',
                      //             icon: 'assignment_return',
                      //             link: this.folder_path+'/#/erp/purchase/debitnote'
                      //             // link: '/#/erp/purchase/debitnote'
                      //         },
                      //         {
                      //           title: 'Credit Note',
                      //           caption: '',
                      //           icon: 'request_quote',
                      //           link: this.folder_path+'/#/erp/purchase/creditnote'
                      //           // link: '/#/erp/purchase/debitnote'
                      //       },
                      //         // {
                      //         //     title: 'Sales Order',
                      //         //     caption: '',
                      //         //     icon: 'edit_document',
                      //         //     link: this.folder_path+'/#/erp/sales/salesorder'
                      //         // },
                      //         // {
                      //         //     title: 'Sales Invoice',
                      //         //     caption: '',
                      //         //     icon: 'receipt_long',
                      //         //     link: this.folder_path+'/#/erp/sales/salesinvoice'
                      //         // },

                      //     ]
                      // },
                      // {
                      //     label: "Adjustment",
                      //     // icon: "build",
                      //     caption: "",
                      //     default_opened: false,
                      //     content_inset_level: "0.2",
                      //     expand_separator: true,
                      //     insetLevelMenu: [
                      //         {
                      //             title: 'Adjustment',
                      //             caption: '',
                      //             icon: 'adjust',
                      //             link: this.folder_path+'/#/erp/adjustment/adjustment'
                      //         },
                      //     ]
                      // },
                      // {
                      //     label: "Document",
                      //     // icon: "build",
                      //     caption: "",
                      //     default_opened: false,
                      //     content_inset_level: "0.2",
                      //     expand_separator: true,
                      //     insetLevelMenu: [
                      //         {
                      //             title: 'Outlet',
                      //             caption: '',
                      //             icon: 'adjust',
                      //             link: this.folder_path+'/#/erp/document/outlet'
                      //         },
                      //     ]
                      // },

              ];

            }
          }

        }
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
        handleLinkClick(link)
        {
          if (link.link) {
            this.drawer = false;
          }
        },
        logout() {
            // // this.$store.dispatch('login/logout').then(() => {
            //     this.$router.push('/ERP/Login')
            // // });

            this.$store.dispatch('login/logout').then(() => {
             this.showLoading();
             setTimeout(()=>{
                this.$router.push('/ERP/Login').then(() => {
                    location.reload();//add in to enforce after logout taking new config.json as login url instead of last cached outlet url
                });
                this.showNotify('positive', 'Successfully Logout.')
                this.hideLoading();
             },600);

            });
        },
        clickExpandList()
        {
          this.$emit("clicksidebarlist");
        },
        close()
        {
          // this.drawer = false;

          this.$emit("clickSidebar", false);
        },
        mouseover() {
            if (this.miniState == true) {
                this.x = false
            }
        },
        mouseout() {
            if (this.miniState == true) {
                this.x = true
            }
        },
        handleResize() {
          this.tab.width = document.documentElement.clientWidth;

          if(this.tab.width < 599)
          {
            this.x = false;
            setTimeout(()=>{
              this.drawer = false;
            },50)
          }
          else
          {
            this.x = true;
            this.$emit("clickSidebar", true);
          }
        },
    },
    mounted()
    {
      window.addEventListener('resize', this.handleResize);
      this.handleResize();
    },
    beforeUnmount() {
      window.removeEventListener('resize', this.handleResize);
    },
})
</script>

<style scoped>
.title_style
{
    width: 80%;
    margin: 0 auto; /* Center the border horizontally */
}
.custom_close_button
{
  color: #928f8f;
  position: absolute;
  padding: 0;
  padding-left: 10px;
  right: 12px; /* Adjust the desired distance from the right */
  z-index: 1;
}

.header_top_mobile
{
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5px;
  padding-bottom: 0px;
}
.header_text
{
  padding-left: 16px;
  padding-right: 16px;
  font-weight: bold;
}
.q-item__label--header
{
    text-align: center;
    font-weight: bold;
    color: white;
}

/* * >>> .q-expansion-item__content
{
    background-color: #ebebeb80 !important;
} */

</style>
