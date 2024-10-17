<template>
  <q-layout view="lHh Lpr lFf">
    <Header v-if="$q.screen.width > 599" @side_menu_click="side_menu_click_main" :miniStateMain="miniState" />
    <Sidebar v-on:clickSidebar="handleClickSidebar" :miniState="miniState" v-on:clicksidebarlist="onSidebarList"/>

    <q-page-container>
      <router-view v-on:clickSidebar="handleClickSidebar" :key="$route.fullPath" :miniState="miniState" />
    </q-page-container>

    <!-- <Footer /> -->

  </q-layout>
</template>

<script>
import Header from './Header';
import Sidebar from './Sidebar';
// import Footer from './Footer';
// import Sidebar from './Sidebar.vue';
import { ref } from 'vue'


export default {
    name: "Main",
    setup()
    {
        return{
            miniState: ref(false),
            tab: {
              width: null,
              height: null,
            }
        }
    },
    components: {
        Header,
        Sidebar,
        // Footer
    },
    methods: {
        onSidebarList()
        {
          this.miniState = false;
        },
        handleClickSidebar(value)
        {
            var newVal = value;
            this.miniState = newVal;
        },
        side_menu_click_main : function(value)
        {
            this.miniState = value;
        },
        handleResize() {
          this.tab.width = document.documentElement.clientWidth;

          if(this.tab.width > 599)
          {
            this.miniState = true;
          }
          else
          {
            this.miniState = false;
          }
        },
    },
    mounted()
    {
      window.addEventListener('resize', this.handleResize);
    },
    beforeUnmount() {
      window.removeEventListener('resize', this.handleResize);
    },
}
</script>

<style>

</style>
