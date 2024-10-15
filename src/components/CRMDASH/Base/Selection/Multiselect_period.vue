<template>
 <q-select 
   v-if="!no_label"
   dense
   options-dense
   filled
   multiple   
   style="width: 250px"
   option-value="value"
   option-label="label"
   :label="label"
   emit-value 
   map-options
   use-chips
   use-input
   input-debounce="0"
   @filter="filterFn"
   @update:model-value  ="handleChange"
   ref="myInput"
   :options="filterOptions"
   v-model="bind_value" 
   class="multiselect"
   :componentBehavior="dbComponentBehavior"
   :rules="dbComponentBehavior.rules">

 <template v-slot:option="scope">
  <q-item
   v-bind="scope.itemProps"
   v-on="scope.itemEvents">
   <q-item-section>
    <q-item-label v-html="scope.opt.label"></q-item-label>
   </q-item-section>
   <q-item-section side>
    <q-checkbox v-model="bind_value" @update:model-value ="handleChange" :val="scope.opt.value"  v-bind:disable="scope.opt.disable"></q-checkbox>
   </q-item-section>
  </q-item>
 </template>

 </q-select>

 <q-select 
   v-else
   dense
   options-dense
   filled
   multiple   
   style="width: 250px"
   option-value="value"
   option-label="label"   
   emit-value 
   map-options
   use-chips
   use-input
   input-debounce="0"
   @filter="filterFn"
   @update:model-value ="handleChange"
   ref="myInput"
   :options="filterOptions"
   v-model:pass_value="bind_value" 
   class="multiselect"
   :componentBehavior="dbComponentBehavior"
   :rules="dbComponentBehavior.rules">

 <template v-slot:option="scope">
  <q-item
   v-bind="scope.itemProps"
   v-on="scope.itemEvents">
   <q-item-section>
    <q-item-label v-html="scope.opt.label"></q-item-label>
   </q-item-section>
   <q-item-section side>
    <q-checkbox v-model="bind_value" @update:model-value ="handleChange" :val="scope.opt.value" v-bind:disable="scope.opt.disable"></q-checkbox>
   </q-item-section>
  </q-item>
 </template>
 </q-select>

</template>

<script>
import { QSelect } from 'quasar'
import $ from 'jquery'

export default {
 data(){
  return{
   filterOptions: this.options,
   stringOptions: this.options,
   all:false,
   // bind_value: [],
   bind_value: this.pass_value,
  }
 },
 props: [
  'pass_value', 
  'options', 
  'label', 
  'id', 
  'name',
  'dbComponentBehavior',
  'no_label', 
  'value', 
  'disable', 
  'select_required'
],

methods: {
 handleChange (newVal) {
  this.$emit('receiveChange', newVal)
  this.$emit('update:pass_value', newVal)
 },
 updateInput () {
  this.$refs.myInput.updateInputValue('')
  this.$refs.myInput.setInputValue('')
 },
 filterFn (val, update) {
  update(() => {
  if (val === '') {
   this.filterOptions = this.stringOptions
  }else{
   const needle = val.toString().toLowerCase()
   this.filterOptions = this.stringOptions.filter(function (entry) {
   return entry.label.toString().toLowerCase().indexOf(needle) > -1;
   });
  }
 })
 }
 },
 components: {
  QSelect
 },
watch: {
 options(newVal){
  this.stringOptions = newVal
 },
 pass_value(newVal){
  this.bind_value = newVal;
 },
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
 width: 100% !important;
 /* width: 100% !important; */
}
.q-field--error
{
 padding-bottom:20px;
}

/* For text input border colour */
* >>> .q-field__inner
{
 border: 1px solid #d2d6de;
}
.q-field--filled >>> .q-field__control:before {
 background: white;
}

* >>> .q-field__control
{
 background-color: white;
}

.q-field >>> .q-field__bottom
{
 display: none;
}
.q-field--error >>> .q-field__bottom
{
 display: block;
}
* >>> .q-field__bottom {
 padding: 3px 0px 0;
}
.q-field--filled.q-field--readonly >>> .q-field__control:before {
 opacity: 1;
 background: #ccc;
 border-bottom-style: none;
 height: 100%;
 border-radius: 0px;
}

/* readonly field*/
.q-field--filled.q-field--readonly >>> .q-field__control {
 opacity: 1;
 background: #ccc;
 border-bottom-style: none; 
 height: 100%;
 border-radius: 0px;
}

/* make scroll overflow overflow */
* >>> .q-field__control
{
 max-height: 35px; /*can change the size of the scroll*/
 overflow: auto;
 border-radius: 0px;
}

</style>

