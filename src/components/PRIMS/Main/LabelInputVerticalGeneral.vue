<template>
    <b>{{label_value}}</b>

    <q-input ref="ref_input" @click="handleClick()" v-if="dbComponentBehavior.label" class="new_input" outlined v-model="value" :dense="dense" v-on:change="handleChange"
        :maxlength="dbComponentBehavior.maxlength"
        :type="dbComponentBehavior.type"
        :prefix="dbComponentBehavior.prefix"
        :label="dbComponentBehavior.label"
        :placeholder="dbComponentBehavior.label"
        :rules="dbComponentBehavior.rules"
        :reverse-fill-mask="dbComponentBehavior.reverse_fill_mask"
        :mask="dbComponentBehavior.mask"
        :fill-mask="dbComponentBehavior.fill_mask"
        :hint="dbComponentBehavior.hint"
        :disable="disable"
        :input-class="dbComponentBehavior.input_class"
        :suffix="pass_suffix"
        :readonly="readonly"
     />

     <q-input ref="ref_input" @click="handleClick()" v-else class="new_input" outlined v-model="value" :dense="dense" v-on:change="handleChange"
        :maxlength="dbComponentBehavior.maxlength"
        :type="dbComponentBehavior.type"
        :prefix="dbComponentBehavior.prefix"
        :placeholder="dbComponentBehavior.label"
        :rules="dbComponentBehavior.rules"
        :reverse-fill-mask="dbComponentBehavior.reverse_fill_mask"
        :mask="dbComponentBehavior.mask"
        :fill-mask="dbComponentBehavior.fill_mask"
        :hint="dbComponentBehavior.hint"
        :disable="disable"
        :input-class="dbComponentBehavior.input_class"
        :suffix="pass_suffix"
        :readonly="readonly"
     />


     <!-- :readonly="readonly" -->
</template>

<script>
export default {
    data(){
        return{
            label_value: this.pass_label_value,
            value: this.pass_value,
            dense: this.pass_dense ? this.pass_dense: false,
        }
    },
    props: ['pass_label_value', 'pass_value', 'pass_dense', 'dbComponentBehavior', 'autofocusclick', 'disable', 'pass_suffix', 'readonly'],
    methods:{
        handleClick()
        {
          if(this.autofocusclick)
          {
            this.$refs.ref_input.select();
          }
        },
        handleChange: function(newVal){
            this.$emit('update:pass_value', newVal)
            this.$emit('receiveChange', newVal);
        }
    },
    watch: {
        pass_label_value(newVal){
            this.label_value = newVal;
        },
        pass_value(newVal){
            this.value = newVal;
        },
        pass_dense(newVal){
            this.dense = newVal;
        }
    }
}
</script>

<style scoped>
* >>> .q-field__control
{
  padding-left: 6px;
  padding-right: 6px;
  padding-top: 0px;
  padding-bottom: 0px;
}

* >>> .q-field__suffix
{
    padding: 0px;
}

.q-field--error >>> .q-field__inner > .q-field__bottom
{
  padding: 0px;
  padding-top: 2px;
  font-size: 10px;
}

.q-field--disabled >>> .q-field__inner > .q-field__control
{
  background-color: #ebebeb !important;
}

.remark_input >>> .q-field__inner, .remark_input >>> .q-field__inner > .q-field__control {
  height: 81px;
}
.new_input >>> .q-field__inner, .new_input >>> .q-field__inner > .q-field__control {
  height: 32px;
}
.q-textarea >>>.q-field__control {
  min-height: 81px !important;
  
}
.q-field {
    padding-top: 0px;
    padding-left: 0px;
    padding-right: 0px;
    padding-bottom: 0px;
}

.q-field--error {
    padding-bottom: 20px;
}

* >>> .q-field__label.ellipsis
{
    top: 10px;
    font-size: 14px;
}

* >>> .q-field__append
{
    height: 32px;
}

* >>> .q-field__bottom
{
    padding-left: 0px;
    padding-top: 3px;
    font-size: 11px;
}
</style>

<style>
input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0; 
}
</style>