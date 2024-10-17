<template>
  <q-drawer
    v-if="isDesktop"
    v-model="drawer"
    show-if-above
    :mini="x"
    :width="200"
    :breakpoint="breakpoints"
    bordered
  >
    <div v-if="!x" class="drawer-header">
      <img src="panda.png" class="logo_style" />
      <q-btn
        flat
        dense
        round
        icon="close"
        aria-label="Close"
        @click="toggleDrawer"
        class="menu-btn"
      />
    </div>

    <!-- desktop -->
    <q-list v-for="menu_details in new_linksList" :key="menu_details.label">
      <q-expansion-item
        :expand-separator="menu_details.expand_separator"
        :icon="getMenuIcon(menu_details)"
        :label="menu_details.label"
        :caption="menu_details.caption"
        :default-opened="menu_details.default_opened"
        :content-inset-level="menu_details.content_inset_level"
        @click="expandAndShow(menu_details.label)"
        :class="{ 'active-item': isActive(menu_details.label) }"
        :style="getMenuStyle(menu_details)"
      >
        <q-list>
          <EssentialLink
            v-for="link in menu_details.insetLevelMenu"
            :key="link.title"
            :title="link.title"
            :caption="link.caption"
            :link="link.link"
            :icon="link.icon"
            :icon_size="link.icon_size"
            @receiveClick="setActiveLink(link.title)"
          />
        </q-list>
      </q-expansion-item>
    </q-list>
  </q-drawer>

  <!-- mobile -->
  <q-dialog
    v-else
    v-model="drawer"
    persistent
    transition-show="slide-right"
    transition-hide="slide-left"
  >
    <q-card class="mobile-dialog">
      <q-card-section class="row header_top_mobile">
        <div class="col-12 row items-center justify-between">

          <!-- <div class="row items-center">
            <Button_icon 
              style="cursor: auto" 
              :big_round="true" 
              :icon="'widgets'" 
              :flat="false" 
              :font_color="'white'" 
              :color="'primary'" 
              :outline="false" 
              size="12px" 
            />
            <div class="text-subtitle1 header_text">Backend</div>
          </div> -->

          <div class="row items-center">
            <img src="/mobilefavicon.png" class="header-image" />
          </div>
          <q-btn 
            icon="close" 
            flat 
            round 
            dense 
            class="custom_close_button" 
            @click="close()" 
          />
        </div>
      </q-card-section>

      <q-card-section class="menu-column space-between">
        <div class="menu-container">
          <div class="row q-pt-md" v-for="menu_details in new_linksList" :key="menu_details.label">
            <div class="col-12">
              <div class="section-title" style="padding-bottom:16px;">
                <q-icon :name="menu_details.icon" class="menu-icon" />
                <div class="menu-title">{{ menu_details.label }}</div>
              </div>
              <q-list flat class="menu-list">
                <q-item
                  v-for="(link, index) in menu_details.insetLevelMenu"
                  :key="link.title"
                  :href="link.link"
                  class="menu-item"
                >

                <!-- <q-item-section avatar class="q-pa-md">
                  <q-icon size="sm" :name="link.icon" />
                </q-item-section> -->

                  <q-item-section
                    v-if="index !== 0"
                    @click="handleLinkClick(link)"
                    class="menu-section"
                  >
                    <div class="row items-center">
                      <div class="col-11">{{ link.title }}</div>
                      <div class="col-1">
                        <q-icon size="sm" name="chevron_right" />
                      </div>
                    </div>
                  </q-item-section>

                  <q-item-section class="menu-section-2" v-else @click="handleLinkClick(link)">
                    <div class="row items-center">
                      <div class="col-11">{{ link.title }}</div>
                      <div class="col-1">
                        <q-icon size="sm" name="chevron_right" />
                      </div>
                    </div>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </div>
        </div>

        <div class="logout-container">
          <Button_icon 
            @receiveClick="logout" 
            class="logout-btn"
            :small_round="true" 
            :text="'Logout'" 
            :flat="false" 
            :font_color="'white'" 
            :outline="false" 
            size="12px" 
          />
        </div>
      </q-card-section>

      <q-inner-loading :showing="showAddLoading" color="primary" />
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, ref, computed, watch } from 'vue';
import { Loading, QSpinnerTail } from 'quasar';
import EssentialLink from 'src/components/ERP/Base/EssentialLink';
import Button_icon from 'src/components/ERP/Base/Button_icon';
import Language from 'src/components/ERP/Base/Language';

export default defineComponent({
  name: 'Sidebar',
  props: ['miniState', 'miniStateMain'],

  components: {
    EssentialLink,
    Button_icon,
    Language,
  },
  data() {
    return {
      activeLabel: null,
      activeLink: null,
      drawer: ref(false),
      x: this.miniState,
      breakpoints: 599,
      folder_path: this.$global_config.folder_path || '',
      new_linksList: [],
      session_ip: '',
      default: 1,
      tab: { width: null },  
    };
  },
  computed: {
    isDesktop() {
      return this.$q.screen.width > this.breakpoints;
    },
    isItemMasterActive() {
      return this.$route.path.includes('/itemmaster') || 
      this.$route.path.includes('/Itemmaster');
    },
    isPurchaseActive() {
      return this.$route.path.includes('/purchase');
    },
    isActive() {
      return (label) => {
        const basePath = this.getBasePath(label);
        return this.$route.path.startsWith(basePath);
      };
    }
  },
  created() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      this.breakpoints = window.outerWidth;
    }

    this.folder_path = this.$global_config.folder_path;

    const session_ip = sessionStorage.getItem('session_ip') || '';
    this.session_ip = session_ip;

    if (this.session_ip !== "") {
      this.setupLinksList();
    }
  },
  watch: {
    '$route.fullPath': function (newPath) {
    const activeMenu = this.new_linksList.find(menu => 
      newPath.toLowerCase().startsWith(this.getBasePath(menu.label).toLowerCase())
    );
    this.activeLink = activeMenu ? activeMenu.label : null;
    console.log('Active Link:', this.activeLink); // Log the active link
  },
    miniState(newVal) {
  this.x = this.isMobile() ? false : newVal;
},
    '$route'(to, from) {
      const session_ip = sessionStorage.getItem("session_ip") || '';
      this.session_ip = session_ip;

      if (this.session_ip !== "") {
        if (this.new_linksList.length <= 0) {
          this.setupLinksList();
        }
      }
    }
  },
  methods: {
    getBasePath(label) {
    switch (label) {
      case 'Itemmaster':
        return `${this.folder_path}/#/erp/Itemmaster`.toLowerCase();
      case 'Purchase':
        return `${this.folder_path}/#/erp/purchase`.toLowerCase();
      // add other cases as needed
      default:
        return '';
    }
  },
  isLinkActive(route, label) {
    const basePath = this.getBasePath(label);
    return route.fullPath.toLowerCase().startsWith(basePath);
  },
    isMobile() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },
    toggleDrawer() {
      this.x = !this.x;
    },
    expandAndShow(label) {
      if (this.x && ['Itemmaster', 'Purchase'].includes(label)) {
        this.toggleDrawer();
      }
      this.activeLabel = label;
    },
    getMenuIcon(menu_details) {
      if (menu_details.label === 'Itemmaster') {
        return this.isItemMasterActive ? 'img:/item_master_active.svg' : 'img:/item_master.svg';
      }
      if (menu_details.label === 'Purchase') {
        return this.isPurchaseActive ? 'img:/purchase_active.svg' : 'img:/purchase.svg';
      }
      return menu_details.icon;
    },
    getMenuStyle(menu_details) {
      return {
        color: (menu_details.label === 'Itemmaster' && this.isItemMasterActive) ||
               (menu_details.label === 'Purchase' && this.isPurchaseActive)
          ? '#9DCDFF'
          : '#E7E7E7',
        paddingBottom: '8px',
        paddingTop: this.x && menu_details.label === 'Itemmaster' ? '16px' : ''
      };
    },
    setActiveLink(title) {
      this.activeLink = title;
      this.$emit('clicksidebarlist');
    },
    close() {
      this.drawer = false;
      this.$emit('clickSidebar', true);
    },
    handleLinkClick(link) {
      if (link.link) {
        this.drawer = false;
      }
    },
    setupLinksList() {
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
              // icon: 'inventory_2',
              link: `${this.folder_path}/#/erp/Itemmaster/Itemmaster`
            },
            {
              title: 'Item Master New',
              caption: '',
              link: this.folder_path+'/#/erp/Itemmaster/CreateEditIM_new?Itemcode=216733'

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
              // icon: 'edit_document',
              link: `${this.folder_path}/#/erp/purchase/purchaseorder`
            },
            {
              title: 'Goods Received Note',
              caption: '',
              // icon: 'receipt_long',
              link: `${this.folder_path}/#/erp/purchase/goodsreceivednote`
            },
            {
              title: 'Debit Note',
              caption: '',
              // icon: 'assignment_return',
              link: `${this.folder_path}/#/erp/purchase/debitnote`
            },
            {
              title: 'Credit Note',
              caption: '',
              // icon: 'request_quote',
              link: `${this.folder_path}/#/erp/purchase/creditnote`
            },
          ]
        },
      ];
    },
    handleResize() {
      this.tab.width = document.documentElement.clientWidth;

      if (this.tab.width < 599) {
        this.x = false;
        setTimeout(() => {
          this.drawer = false;
        }, 50);
      } else {
        this.x = true;
        this.$emit("clickSidebar", true);
      }
    },
    showLoading() {
      Loading.show({
        spinner: QSpinnerTail,
      });
    },
    hideLoading() {
      setTimeout(() => {
        Loading.hide();
      }, 300);
    },
    logout() {
      // // this.$store.dispatch('login/logout').then(() => {
            //     this.$router.push('/ERP/Login')
            // // });
      this.$store.dispatch('login/logout').then(() => {
        this.showLoading();
        setTimeout(() => {
          this.$router.push('/ERP/Login').then(() => {
            location.reload();
          });
          this.showNotify('positive', 'Successfully Logout.');
          this.hideLoading();
        }, 600);
      }).catch(error => {
        console.error('Logout failed:', error);
        this.hideLoading();
        this.showNotify('negative', 'Logout failed. Please try again.');
      });
    },
    showNotify(type, message) {
      this.$q.notify({
        type,
        message,
        timeout: 3000,
      });
    },
  },
  mounted() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
  },
});
</script>

<style scoped>
.header-image {
  width: 75px;
  height: 35px;
  margin-right: 8px; 
}
.custom_close_button {
  color: black;
  margin-left: auto; 
}

.mobile-dialog {
  top: 0;
  left: 0;
  width: 80%;
  height: 100%; 
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 0;
  background-color: #ededed;
  border-radius: 6px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}


.menu-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0px 16px 16px 16px;
  margin: 0;
}

.menu-container {
  flex: 1;
}

.header_top_mobile {
  display: flex;
  padding: 24px;
  justify-content: space-between; 
}

.menu-list {
  width: 100%;
  border-radius: 8px;
  background-color: white;
}

.menu-item {
  height: 40px;
  padding: 0;
}

.section-title {
  display: flex;
}

.menu-section {
  border-top: 1px solid rgba(0, 0, 0, 0.12);
  padding: 0px 16px;
}

.menu-section-2 {
  padding: 0px 16px;
}

.logo_style {
  height: 80px;
  max-width: 80px;
  box-shadow: 0 0 11px rgba(0, 0, 0, 0.4);
}

.drawer-header {
  display: flex;
  padding: 24px;
  align-items: center;
  justify-content: space-between;
}

.menu-btn {
  margin-left: auto;
}

.logout-container {
  display: flex;
  width: 100%;
  height: 40px;
}

.logout-btn {
  height: 100%;
  background-color: #EF4444;
  color: white !important; 
  border-radius: 8px; 
  width: 100%; 
}

.menu-icon {
  width: 20px; 
  height: 20px;
  padding-right: 8px;
  display: inline-block; 
  vertical-align: middle; 
}

.menu-title {
  font-size: 14px;
  font-weight: 600;
  color: #757575;
  text-transform: uppercase;
}
</style>
