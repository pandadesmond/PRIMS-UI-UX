<template>
  <!-- mobile -->
  <q-dialog v-model="drawer" persistent transition-show="slide-right" transition-hide="slide-left">
    <q-card class="mobile-dialog">
      <q-card-section class="row header_top_mobile">
        <div class="col-12 row items-center justify-between">
          <div class="row items-center">
            <img src="/mobilefavicon.png" class="header-image" />
          </div>
          <q-btn icon="close" flat round dense class="custom_close_button" @click="closeDialog"/>
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
                <q-item v-for="link in menu_details.insetLevelMenu" :key="link.title"
                  :href="link.link"
                  class="menu-item">
                  <q-item-section class="menu-section">
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
import { ref } from 'vue'
import EssentialLink from 'src/components/PRIMS/Base/EssentialLink';
import Button_icon from 'src/components/PRIMS/Base/Button_icon';

export default {
  name: 'Sidebar',
  components: {
    EssentialLink,
    Button_icon,
  },
  data() {
    return {
      drawer: ref(false),
      new_linksList: [], 
      folder_path: this.$global_config.folder_path || '',
    };
  },
  created() {
    this.setupLinksList();
  },
  methods: {
    closeDialog() {
      this.drawer = false;
    },
    setupLinksList() {
      this.new_linksList = [
        {
          label: "TTA",
          icon: 'img:/item_master.svg',
          caption: "",
          insetLevelMenu: [
            {
              title: 'Trading Term Agreement',
              caption: '',
              link: `${this.folder_path}/#/PRIMS/TTA/`
            },
          ]
        },
      ];
    },
    logout() {
      this.$router.push('/PRIMS/Login');
      this.$q.notify({
        type: 'positive',
        message: 'Successfully Logout.',
        timeout: 3000,
      });
    },
  },
};
</script>

<style scoped>
.header-image {
  width: 5rem; 
  height: 2.5rem; 
  margin-right: 0.5rem; 
}
.custom_close_button {
  color: black;
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

.btn {
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
