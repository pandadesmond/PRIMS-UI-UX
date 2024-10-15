<template>
  <q-input v-if="!no_label"
    color="black"
    bg-color="white"
    dense
    filled
    :maxlength="componentBehavior.maxlength"
    :type="type ? type : componentBehavior.type"
    :value="value"
    :prefix="componentBehavior.prefix"
    :label="componentBehavior.label"
    :placeholder="componentBehavior.label"
    :rules="componentBehavior.rules"
    :reverse-fill-mask="componentBehavior.reverse_fill_mask"
    :mask="componentBehavior.mask"
    :fill-mask="componentBehavior.fill_mask"
    :hint="componentBehavior.hint"
    :disable="disable ? disable :componentBehavior.disable"
    :readonly="readonly"
    @change="handleChange"
    :input-class="componentBehavior.input_class"
    :for="id"
    :name="name"
    square
    @click="handleClick();"
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


  <q-input v-else
    color="black"
    bg-color="white"
    dense
    filled
    :maxlength="componentBehavior.maxlength"
    :type="type ? type : componentBehavior.type"
    :value="value"
    :prefix="componentBehavior.prefix"
    :placeholder="componentBehavior.label"
    :rules="componentBehavior.rules"
    :reverse-fill-mask="componentBehavior.reverse_fill_mask"
    :mask="componentBehavior.mask"
    :fill-mask="componentBehavior.fill_mask"
    :hint="componentBehavior.hint"
    :disable="disable ? disable :componentBehavior.disable"
    :readonly="readonly"
    @change="handleChange"
    @keyup="handleKeyUp"
    :input-class="componentBehavior.input_class"
    :for="id"
    :name="name"
    square
    @click="handleClick();"
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


</template>

<script>
import { QInput } from 'quasar'

export default {
  data() {
    return {
      readonly: false
    }
  },

  props: ['value', 'componentBehavior', 'addEditView', 'id', 'name', 'icon_prepend', 'icon_append','type','no_label','autofocusclick', 'disable'],
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
  components: {
    QInput
  }
}
</script>

<style scoped>

/* For text input padding removal */
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
