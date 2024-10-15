<template>
  <q-item
  :style="[color && 'color:'+color]"
    @click="handleClick"
    clickable
    tag="a"
    :href="link"
    :class="active ? 'active' : ''"
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :style="icon_size != '' ? 'font-size:'+icon_size : ''" :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption v-if="caption">
        {{ caption }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      default: ''
    },

    link: {
      type: String,
      default: '#'
    },

    icon: {
      type: String,
      default: ''
    },
    
    active: {
      type: Boolean,
      default: false
    },

    icon_size: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      required: true
    },
  },
  methods: {
    handleClick()
    {
      this.$emit('receiveClick');
    }
  }
})
</script>


<style scoped>
.active, .active > div > div
{
  background-color: #eee;
  color: white !important;
}

.active > .q-item__section > .q-item__label
{
  color: white !important;
}
</style>