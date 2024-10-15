<template>
 <q-select
  dense
  options-dense
  filled 
  emit-value 
  map-options
  :value="value"
  :options="options"
  :loading="loading"
  @update:model-value ="handleChange" 
  :label="label"
  square
  :componentBehavior="dbComponentBehavior"
  :rules="dbComponentBehavior.rules"/>
</template>

<script>
import { QSelect } from 'quasar'

export default {
 data() {
  return {}
 },
 props: [
  'value', 
  'options', 
  'label', 
  'id', 
  'name',
  'dbComponentBehavior', 
  'options'
],
methods: {
 handleChange (newVal) {
  this.$emit('receiveChange', newVal)
 },
},
components: {
 QSelect
},
mounted() {}
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
</style>
