<template>
  <q-layout view="hHh Lpr lff">
    <!-- Header handles the toolbar for desktop and triggers dialog for mobile -->
    <Header @trigger_dialog="handleDialogTrigger" />
      
    <Sidebar ref="sidebar" />

    <q-page-container>
      <router-view 
        :key="$route.fullPath"       
      />
    </q-page-container>
  </q-layout>
</template>

<script>
import Header from './Header';
import Sidebar from './Sidebar';

export default {
  name: "Main",
  components: {
    Header,
    Sidebar,
  },
  data() {
    return {
      pageFunction: this.$route.name,
    };
  },
  methods: {
    handleDialogTrigger() {
      if (this.$refs.sidebar && typeof this.$refs.sidebar.drawer !== 'undefined') {
        this.$refs.sidebar.drawer = true;  
      }
    },
  },
  watch: {
    $route(to, from) {
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
