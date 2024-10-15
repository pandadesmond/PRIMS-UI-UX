<template>
  <q-header>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="clicksidemenu"
        />

        <q-toolbar-title>
          Inventory Management
        </q-toolbar-title>

        <!-- <div>Quasar v{{ $q.version }}</div> -->
        <!-- <div><Language /></div> -->
        <!--comment due to language readiness-->
        <div><Profile /></div>
      </q-toolbar>
    </q-header>
</template>

<script>
import { ref } from 'vue'
import Profile from 'src/components/ERP/Base/Profile'
import Language from 'src/components/ERP/Base/Language'

export default {
    name: "Header",
    setup(){
        return{
            miniState: ref(true)
        }
    },
    components:{
      Profile,
      Language
    },
    props: ['miniStateMain'],
    methods: {
        clicksidemenu: function(event)
        {
            this.miniState = !this.miniState;
            this.$emit('side_menu_click', this.miniState);
        }
    },
    watch: {
      miniStateMain(newVal) {
        this.miniState = newVal
      }
  },
}
</script>

<style>

</style>
