<template>
  <q-header>
    <q-toolbar>
      <q-btn
        flat
        dense
        round
        icon="menu"
        color="grey"
        aria-label="Menu"
        @click="toggleDrawer"
        class="menu_sty"
        style="padding: 4px"
      />
      <q-toolbar-title>
        Product Management
      </q-toolbar-title>
      <div v-if="$q.screen.width > 599"><Profile /><img class="vertical_align_middle" src="panda_profile.png"></div>
    </q-toolbar>
  </q-header>
</template>

<script>
import Profile from 'src/components/ERP/Base/Profile'

export default {
  name: "Header",
  components: {
    Profile,
  },
  props: {
    miniStateMain: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      miniState: this.miniStateMain,
    };
  },
  methods: {
    toggleDrawer() {
  if (this.$q.screen.width > 599) {
    this.miniState = !this.miniState;
    this.$emit('side_menu_click', this.miniState);
  } else {
    this.$emit('trigger_dialog');
  }
},
  },
  watch: {
    miniStateMain(newVal) {
      this.miniState = newVal;
    }
  }
};
</script>

<style scoped>
.vertical_align_middle
{
  vertical-align: middle;
}

.menu_sty {
  justify-content: center;
  text-align: center;
  padding: 16px;
}
</style>