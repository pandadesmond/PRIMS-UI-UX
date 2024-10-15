<template>
 <q-btn 
  @click="handleChange" 
  no-caps
  :icon="icon" 
  :flat="flat" 
  :disable="readonly"
  :style="[color != '' ? 'background-color:' +color+';' : '', size != '' ? 'font-size:'+size+';':'', font_color != '' ? 'color:'+font_color+' !important;' : ''] "
  :color="color" dense :outline="outline" ripple>
  <span v-if="text">{{text}}</span>
  <q-tooltip v-if="tooltip_message" anchor="top middle" self="bottom middle">
   <span class="custom_tooltip">{{tooltip_message}}</span> 
  </q-tooltip>
  <q-inner-loading v-if="loading" :showing="loading">
   <q-spinner />
  </q-inner-loading>
 </q-btn>
</template>

<script>
export default {
 props: ['icon','color','tooltip_message','text','outline','font_color', 'flat','readonly', 'loading'],

 methods:{
  handleChange: function(){
   this.$emit('receiveClick');
  }
 }
}
</script>

<style scoped>
.q-btn
{
 border-radius: 0px;
}
.custom_tooltip
{
 font-size: 16px;
}
</style>