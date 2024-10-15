<template>
 <q-select
  filled
  v-model="bind_value"
  use-input
  input-debounce="0"
  :options="bind_options"
  @filter="filterFn"
  behavior="menu"
  @update:model-value ="handleChange">
 </q-select>
</template>

<script>
export default {
 data (){
  return{
   bind_options: this.options,
   bind_value: this.pass_value,
  }
 },
 props: [
  'options', 
  'pass_value', 
  'dbComponentBehavior'
],
methods:{
 handleChange(newVal){
  if(Object.keys(newVal).length >= 2){
   newVal = newVal.value;
  }
  this.$emit('receiveChange', newVal)
  this.$emit('update:pass_value', newVal)
 },
 filterFn (val, update) {
  if (val === '') {
   update(() => {
    this.bind_options = this.options
   })
  return 
 }

 update(() => {
  const needle = val.toLowerCase()
  // var filter = this.bind_options.filter((v)=>{
  //     return v.value.toLowerCase().indexOf(needle) > -1
  // });
  this.bind_options = this.options.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
 })
 }
},
 watch:{
  pass_value(newVal){
  //new add in
  var filter_value = this.options.filter((entry)=>{
  return entry.value == newVal
  });
  this.bind_value = filter_value[0]
  }
 }
}
</script>

<style scoped>
.q-field
{
 padding-top:0px;
 padding-left:0px;
 padding-right:0px;
 padding-bottom:0px;
 background: white;
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
.q-field--filled >>> .q-field__control {
 background: white;
}
.q-field >>> .q-field__native {
/* max-height: 29px; */
 overflow: auto;
}
/* when hover on text input */
.q-field--filled >>> .q-field__control:before {
 background: white;
 /* border-bottom: 1px solid rgba(0, 0, 0, 0.42);
 opacity: 0;
 transition: opacity 0.36s cubic-bezier(0.4, 0, 0.2, 1), background 0.36s cubic-bezier(0.4, 0, 0.2, 1); */
}

/* readonly field
.q-field--readonly >>> .q-field__control:before
{
background: yellow ;
} */

/* readonly field*/
.q-field--filled.q-field--readonly >>> .q-field__control:before {
 opacity: 1;
 background: #ededed;
 border-bottom-style: none;
}

/* hide error message when no error validation*/
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
/* disable field*/
.q-field--filled.q-field--disabled >>> .q-field__control:before {
 opacity: 1;
 background: #ededed;
 border-bottom-style: none;
}
</style>
