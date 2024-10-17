<template>
<q-drawer v-if="$q.screen.width > 599" v-model="drawer" show-if-above :mini="x" :width="200" :breakpoint="breakpoints" bordered>
    <!-- <q-drawer v-model="drawer" show-if-above :mini="x" :width="200" :breakpoint="500" bordered> -->
    
    <q-item-label
        header
    >
      <!-- Inventory Management -->
      <img src="panda.png" class="logo_style" />
    </q-item-label>
    <!-- <q-list>
        <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
    </q-list> -->
    <!-- <img v-if="x" src="logo_panda_inactive.png" /> -->
    <q-btn
          v-if="x"
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="clicksidemenu"
          class="menu_sty"
          style="padding-left:17px"
        />
    <q-list :key="menu_details" v-for="menu_details in new_linksList">
        <q-expansion-item
            :expand-separator="menu_details.expand_separator"
            :icon="menu_details.icon"
            :label="menu_details.label"
            :caption="menu_details.caption"
            :default-opened="menu_details.default_opened"
            :content-inset-level="menu_details.content_inset_level"
             @click="clickExpandList(menu_details.label)"
            :class="[activeMenu === menu_details.label ? 'active2' : '', menu_details.insetLevelMenu.length === 0 ? 'no-inset' : '']"
            
            class="custom_font"
            style="padding-bottom: 20px;"
             :style="{
              paddingTop: x && menu_details.label === 'Itemmaster' ? '25px' : '',
            }"   
            > 
            <!-- :active="activeMenu === menu_details.label" -->
            <!-- :class="{'active2': activeMenu === menu_details.label}" -->
        <!--@click="clickExpandList" :style="x && menu_details.label === 'Itemmaster' ? 'padding-top: 25px;' : ''"
            :style="{
              paddingTop: x && menu_details.label === 'Itemmaster' ? '25px' : '',
              color: activeMenu === menu_details.label ? 'red' : ''
            }"
          -->
              <q-list  >
                <!-- 'pad_itemmaster': menu_details.label === 'Itemmaster',
            'pad_purchase': menu_details.label === 'Purchase' -->
            <!--  paddingTop: x && menu_details.label === 'Itemmaster' ? '97px' : '' -->
                <EssentialLink v-for="link in menu_details.insetLevelMenu" :key="link.title"  v-bind="link"
                clickable v-ripple :active="activeLink === link.title" @click="setActiveLink(link.title,menu_details.label)"
                :class="[activeLink === link.title ? 'active-link' : '']" >
                </EssentialLink>
                  <!-- :class="active ? 'active' : ''" -->

<!-- not used gstList -->
                <!-- <q-list :key="menu_details2" v-for="menu_details2 in new_gstList">
                  <q-expansion-item
                    :expand-separator="menu_details2.expand_separator"
                    :icon="menu_details2.icon"
                    :label="menu_details2.label"
                    :caption="menu_details2.caption"
                    :default-opened="menu_details2.default_opened"
                    :content-inset-level="menu_details2.content_inset_level"
                    
                  >
                   <EssentialLink v-for="link in menu_details2.insetLevelMenu" :key="link.title" v-bind="link"
                   >

                </EssentialLink>
                       </q-expansion-item>
              </q-list> -->
            </q-list>
        </q-expansion-item>
    </q-list>
    <div class="q-mini-drawer-hide absolute" style="top: 15px; right: 1px">
          <q-btn
            dense
            round
            unelevated
            color="#E7E7E7"
            icon="close"
            @click="x = true"
          />
        </div>

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
import EssentialLink from 'src/components/ERP/Base/EssentialLink'
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
    props: ['miniState','miniStateMain'],
    components: {
        EssentialLink,
        Button_icon,
        Language,
    },
    data() {
        return {
            activeLabel: null,
            activeLink: '',
            yactive: false,
            activeMenu: '',
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
          {
                      label: "Itemmaster",
                      icon: 'img:/item_master.svg',
                      caption: "",
                      default_opened: false,
                      content_inset_level: "0.2",
                      expand_separator: true,
                      insetLevelMenu: [
                          {
                              title: 'Itemmaster',
                              caption: '',
                              // icon: 'inventory_2',
                              link: this.folder_path+'/#/erp/Itemmaster/Itemmaster'
                              // link: '/#/erp/purchase/purchaseorder'
                          },
                          {
                              title: 'Itemmaster New',
                              caption: '',
                              // icon: 'inventory_2',
                              link: this.folder_path+'/#/erp/Itemmaster/CreateEditIM_new'
                              // link: '/#/erp/purchase/purchaseorder'
                          },
                      ]
                  },
                  {
                      label: "Purchase",
                      icon: "img:/purchase.svg",   // '/icons/purchase.svg local_mall'
                      caption: "",
                      default_opened: false,
                      content_inset_level: "0.2",
                      expand_separator: true,
                      insetLevelMenu: [
                          {
                              title: 'Purchase Order',
                              caption: '',
                              // icon: 'edit_document',
                              link: this.folder_path+'/#/erp/purchase/purchaseorder'
                              // link: '/#/erp/purchase/purchaseorder'
                          },
                          {
                              title: 'Goods Received Note',
                              caption: '',
                              // icon: 'receipt_long',
                              link: this.folder_path+'/#/erp/purchase/goodsreceivednote'
                              // link: '/#/erp/purchase/goodsreceiving'
                          },
                          {
                                  title: 'Debit Note',
                                  caption: '',
                                  // icon: 'assignment_return',
                                  link: this.folder_path+'/#/erp/purchase/debitnote'
                                  // link: '/#/erp/purchase/debitnote'
                              },
                              {
                                title: 'Credit Note',
                                caption: '',
                                // icon: 'request_quote',
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
          
              {
                          label: "Itemmaster",
                          icon: 'img:/item_master.svg',
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
                          icon: "img:/purchase.svg",
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
        clickExpandList(label)
        {
          console.log("Clicked menu:", label);
          console.log("Active Menu Before:", this.activeMenu);
          this.activeMenu = label;
          console.log("Active Menu After:", this.activeMenu);
          // Set the active label
          // this.activeLabel = label;
          this.$emit("clicksidebarlist");
          // this.active = !this.active; // Toggle the active state
        },
        setActiveLink(title, parentLabel) {
          this.activeLink = title;
          this.activeMenu = parentLabel;
          this.$emit("clicksidebarlist");
        },
        close()
        {
          // this.drawer = false;

          this.$emit("clickSidebar", true);
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
        // clicksidemenu ()
        // { 
        //   // this.drawer = !this.drawer;
        //   this.x = newval;
        //     this.miniState = !this.miniState;
        //     this.$emit('side_menu_click', this.miniState);
        // }
       clicksidemenu: function(event)
        {
            this.x = !this.miniState;
            this.$emit('side_menu_click', this.miniState);
        }
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
/* icon */
:deep(.q-expansion-item.active2 .q-item__section--side .q-icon > img) {
  filter: invert(75%) sepia(20%) saturate(500%) hue-rotate(180deg) brightness(95%) contrast(90%);
}
/* menu details label */
:deep(.q-expansion-item.active2 .q-item.q-item-type .q-item__section.q-item__section--main .q-item__label) {
  color: #9DCDFF !important;
}
:deep(.q-expansion-item .q-item.q-item-type .q-item__section.q-item__section--main .q-item__label) {
  color: #e7e7e7 !important; /* Default inactive color */
}
/* menu details label */
:deep(.q-expansion-item .q-list .q-item.q-item-type .q-item__section.q-item__section--main .q-item__label) {
  color: inherit !important;
}
.active-link .q-item__label {
  color: #9DCDFF !important;
}
.active > .q-item__section > .q-item__label
{
  color: #9DCDFF !important;
}

/* .active2 > .q-item__section > .q-item__label
{
  color: #ff00c8 !important;
} */

.yactive {
  /* background-color: #f0f0f0; Example style */
  color: #ff00c8; /* Example active color */
}

/* .q-item__section--avatar {
    color: inherit;
    min-width: 41px;
} */
.red-icon > svg {
  color: red;
}
.menu_sty {
  justify-content: center;
  text-align: center;
}
/* *.q-drawer-container:not(.q-drawer--mini-animate) >>>.q-drawer--mini .q-item{
    text-align: center;
    justify-content: center;
    padding-left: 0;
    padding-right: 0;
    min-width: 0;
    margin-top: 20px;
} */
/* .pad_itemmaster >>>.q-drawer--mini {
    padding-top: 97px; 

.pad_purchase >>>.q-drawer--mini {
    padding-top: 20px; 
} */

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
.active, .active > div > div
{
  /* background-color: #eee; */
  color: #9DCDFF !important;
}


/* .yactive >.q-item__section >.column >.q-item__section--main > .q-item__label {
  color: red;
} */
 /* .active-expansion-item >.q-item__section >.q-expansion-item__header >.q-item__section--main >.q-item__label {
  color: red;
} */
.custom_font {
  font-family: InterfontSemiBold;
  font-weight: 600;
  font-size: 15px;
  color: #E7E7E7;
}
.logo_style {
  height: 100px;
  max-width: 100px;
  box-shadow: 0px 0px 11px 0px rgba(0, 0, 0, 0.4);
}
*>>>.q-item {
    min-height: 50px;
    /* padding: 8px 16px; */
    color: inherit;
    transition: color 0.3s, background-color 0.3s;
}

*.menu_custom {
    /* background-color: rgb(70, 162, 248); */
    /* border-bottom: 1px solid #CFCFCF; */
    color: #E7E7E7;
}
</style>
