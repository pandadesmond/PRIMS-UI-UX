<template>
  <q-btn
    :label="item.name"
    class="menu-label"
    :style="buttonStyle" 
    @click="setActive"
    unelevated
  >
    <q-menu>
      <q-list dense style="min-width: 100px">
        <template v-for="(child, index) in item.child" :key="index">
          <q-item @click.stop="handleClick(child)" :style="getChildStyle(child)" clickable>
            <q-item-section>{{ child.name }}</q-item-section>

            <q-item-section side v-if="child.child && child.child.length > 0">
              <q-icon name="keyboard_arrow_right" />
            </q-item-section>

            <!-- dropdown 2 -->
            <q-menu v-if="child.child && child.child.length > 0" anchor="top end" self="top start">
              <q-list dense>
                  <q-item
                  v-for="(subChild, subIndex) in child.child"
                  :key="subIndex"
                  @click.stop="handleClick(subChild)"
                  :style="getChildStyle(subChild)"
                  clickable
                >
                  <q-item-section>{{ subChild.name }}</q-item-section>

                  <q-item-section side v-if="subChild.child && subChild.child.length > 0">
                    <q-icon name="keyboard_arrow_right" />
                  </q-item-section>

                  <q-menu v-if="subChild.child && subChild.child.length > 0" anchor="top end" self="top start">
                    <q-list dense>
                        <q-item
                        v-for="(xsubChild, xsubIndex) in subChild.child"
                        :key="xsubIndex"
                        @click.stop="handleClick(xsubChild)"
                        :style="getChildStyle(xsubChild)"
                        clickable
                      >
                        <q-item-section>{{ xsubChild.name }}</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>


                </q-item>
              </q-list>
            </q-menu>
          </q-item>
          <q-separator v-if="index !== item.child.length - 1" />
        </template>
      </q-list>
    </q-menu>
  </q-btn>
</template>
  
<script>
export default {
  name: "MenuItem",
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    buttonStyle() {
        return this.isActiveParent
        ? {
            backgroundColor: "#ecf8fc", 
            color: "#273655" 
          }
        : {}; 
    },
    isActiveParent() {
      const currentPath = this.$route.path.toLowerCase();
      if (this.item.name === "TTA") {
        return currentPath.includes('tta');
      }
      if (this.item.name === "Transaction") {
        return currentPath.includes('transaction');
      }
      if (this.item.name === "Setting") {
        return currentPath.includes('setting');
      }
      
      return false;
    }
  },
  methods: {
    getChildStyle(item) {
      return this.isActiveChild(item)
        ? {
            backgroundColor: "#ecf8fc", 
            color: "#273655",
            fontWeight: "bold", 
            padding: "8px 10px" 
          }
        : {
            padding: "8px 10px"
        };
    },
    
    isActiveChild(item) {
      const currentPath = this.$route.path.toLowerCase();
      if (item.link) {
        return currentPath === item.link.toLowerCase();
      }
      return false;
    },

    handleClick(menuItem) {
      if (menuItem.link) {
        this.$router.push(menuItem.link); 
      }
    }
  }
};
</script>
  
<style scoped>
.menu-label {
  display: flex;
  align-items: center;
  gap: 18px;
  position: relative;
  text-transform: none;
}
</style>
  