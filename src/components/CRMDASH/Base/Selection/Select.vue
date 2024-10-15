<template>
 <q-select 
  v-if="!no_label"
  class="q-pr-sm q-pt-sm" 
  color="black" 
  bg-color="white"  
  dense
  options-dense
  filled 
  emit-value 
  map-options
  :value="value" 
  :options="options"
  :label="label"
  v-model="pass_value"
  @update:model-value  ="handleChange" 
  filter 
  filter-placeholder="select"
  :for="id"
  :name="name"
  dropdown-icon="arrow_drop_down"
  square
  @popup-show="handleClick"
  :loading="loading"
  :componentBehavior="dbComponentBehavior"
  :rules="dbComponentBehavior.rules">
 </q-select>

 <q-select 
   v-else
   class="q-pr-sm q-pt-sm" 
   color="black" 
   bg-color="white"  
   dense
   options-dense
   filled 
   emit-value 
   map-options
   :value="value" 
   :options="options"
   v-model="pass_value"
   @update:model-value  ="handleChange" 
   filter 
   filter-placeholder="select"
   :for="id"
   :name="name"
   dropdown-icon="arrow_drop_down"
   square
   @popup-show="handleClick"
   :loading="loading"
   :componentBehavior="dbComponentBehavior"
   :rules="dbComponentBehavior.rules">
 </q-select>
</template>

<script>
import { QSelect } from 'quasar'

export default {
 data(){
  return {
   pass_value: this.value
  }
 },
 props: [
  'value', 
  'options', 
  'label', 
  'id', 
  'name',
  'dbComponentBehavior',
  'no_label',
  'loading'
],
 methods: {
  handleChange (newVal) {
   this.$emit('receiveChange', newVal)
   this.$emit('update:value', newVal)
  },
  handleClick (newVal) {
   this.$emit('receiveClick', newVal)
  }
 },
 components: {
  QSelect
 },
 watch: {
  value(newVal){
   this.pass_value = newVal;
 },
 // options(newVal){
 //     // alert('A')
 //     if(newVal){
 //        this.loading = true 
 //     }

 // },
 }
}
</script>

<style scoped>
/* For dropdown padding removal */
.q-field
{
 padding-top:0px;
 padding-left:0px;
 padding-right:0px;
 padding-bottom:0px;
}
.q-field--error
{
 padding-bottom:20px;
}
* >>> .q-field__inner
{
 border: 1px solid #d2d6de;
}

/* when hover on text input */
.q-field--filled >>> .q-field__control:before { 
 background: white;
 /* border-bottom: 1px solid rgba(0, 0, 0, 0.42);
 opacity: 0;
 transition: opacity 0.36s cubic-bezier(0.4, 0, 0.2, 1), background 0.36s cubic-bezier(0.4, 0, 0.2, 1); */
}

/* readonly field*/
.q-field--filled.q-field--readonly >>> .q-field__control:before {
 opacity: 1;
 background: #ccc;
 border-bottom-style: none;
}

</style>