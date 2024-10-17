<template>
    <q-input ref="ref_input" @click="handleClick()" v-if="dbComponentBehavior.label" class="new_input" outlined v-model="value" :dense="dense"  v-on:change="handleChange"
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
        :disable="dbComponentBehavior.disable"
        :input-class="dbComponentBehavior.input_class"
    />

    <q-input ref="ref_input" @click="handleClick()" v-else class="new_input" outlined v-model="value" :dense="dense"  v-on:change="handleChange"
        :maxlength="dbComponentBehavior.maxlength"
        :type="dbComponentBehavior.type"
        :prefix="dbComponentBehavior.prefix"
        :placeholder="dbComponentBehavior.label"
        :rules="dbComponentBehavior.rules"
        :reverse-fill-mask="dbComponentBehavior.reverse_fill_mask"
        :mask="dbComponentBehavior.mask"
        :fill-mask="dbComponentBehavior.fill_mask"
        :hint="dbComponentBehavior.hint"
        :disable="dbComponentBehavior.disable"
        :input-class="dbComponentBehavior.input_class"
    />
</template>

<script>
export default {
    data(){
        return{
            value: this.pass_value,
            dense: this.pass_dense ? this.pass_dense: false,
        }
    },
    props: ['pass_value', 'pass_dense', 'dbComponentBehavior', 'autofocusclick'],
    methods:{
        handleClick()
        {
          if(this.autofocusclick)
          {
            this.$refs.ref_input.select();
          }

          this.$emit('receiveClick');
        },
        handleChange: function(newVal){
            this.$emit('update:pass_value', newVal)
            this.$emit('receiveChange', newVal);
        }
    },
    watch: {
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

* >>> .q-field__append
{
    height: 32px;
}

.new_input >>> .q-field__inner, .new_input >>> .q-field__inner > .q-field__control {
  height: 32px;
}

.q-field {
    padding-top: 0px;
    padding-left: 0px;
    padding-right: 0px;
    padding-bottom: 0px;
    background-color: white;
}

.q-field--error {
    padding-bottom: 20px;
}

* >>> .q-field__label.ellipsis
{
    top: 10px;
    font-size: 14px;
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
