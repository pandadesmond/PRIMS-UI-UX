<template>
  <q-input
    v-if="!no_label"
    :dense="dense"
    class="full-width-input"
    :maxlength="componentBehavior.maxlength"
    :type="type ? type : componentBehavior.type"
    :value="value"
    :prefix="componentBehavior.prefix"
    :label="componentBehavior.label"
    :rules="componentBehavior.rules"
    :reverse-fill-mask="componentBehavior.reverse_fill_mask"
    :mask="componentBehavior.mask"
    :fill-mask="componentBehavior.fill_mask"
    :hint="componentBehavior.hint"
    :disable="disable ? disable : componentBehavior.disable"
    :readonly="readonly"
    @change="handleChange"
    :input-class="componentBehavior.input_class"
    :for="id"
    :name="name"
    outlined
    @click="handleClick()"
    ref="ref_input"
    autocomplete="off"
  >
  <template v-slot:prepend v-if="icon_prepend">
        <q-icon :name="icon_prepend" />
    </template>
    <template v-slot:append v-if="icon_append" >
        <q-icon :name="icon_append" @click="this.$emit('password_method')"/>
    </template>
</q-input>

  <q-input
    v-else
    :maxlength="componentBehavior.maxlength"
    :type="type ? type : componentBehavior.type"
    :value="value"
    :prefix="componentBehavior.prefix"
    :rules="componentBehavior.rules"
    :reverse-fill-mask="componentBehavior.reverse_fill_mask"
    :mask="componentBehavior.mask"
    :fill-mask="componentBehavior.fill_mask"
    :hint="componentBehavior.hint"
    :disable="disable ? disable : componentBehavior.disable"
    :readonly="readonly"
    @change="handleChange"
    @keyup="handleKeyUp"
    :input-class="componentBehavior.input_class"
    :for="id"
    :name="name"
    outlined
    :dense="dense"
    @click="handleClick()"
    ref="ref_input"
    autocomplete="off"
    class="input-sty"
  >
    <template v-slot:prepend v-if="icon_prepend">
        <q-icon :name="icon_prepend" />
    </template>
    <template v-slot:append v-if="icon_append" >
        <q-icon :name="icon_append" @click="this.$emit('password_method')"/>
    </template>
  </q-input>
</template>

<script>

export default {
  data() {
    return {
      readonly: false
    }
  },

  props: ['dense','value', 'componentBehavior', 'addEditView', 'id', 'name', 'icon_append','type','no_label','autofocusclick', 'disable'],
  methods: {
    handleChange(newVal) {
      this.$emit('receiveChange', newVal)
    },
    handleKeyUp(newVal) {
      this.$emit('receiveKeyUp', newVal)
    },
    setReadonly() {
      if (this.addEditView == 1) {
        if (this.componentBehavior.addReadonly == true) {
          this.readonly = true
        }
        else {
          this.readonly = false
        }
      }
      else
        if (this.addEditView == 2) {
          if (this.componentBehavior.editReadonly == true) {
            this.readonly = true
          }
          else {
            this.readonly = false
          }
        }
        else
          if (this.addEditView == 3) {
            this.readonly = true
          }


    },
    handleClick()
    {
      if(this.autofocusclick)
      {
        this.$refs.ref_input.select();
      }

    }

  },
  mounted() {
    this.setReadonly()
  },
}
</script>
<style scoped>

/* Default input styles */
[data-v-505a4168] .q-field__inner {
  border: none !important;
}
.full-width-input {
  width: 100%; /* Make the input full width */
}
* >>> .q-field__label
{
  /* top: 5px; */
  font-size: 11px;
  
}
</style>
