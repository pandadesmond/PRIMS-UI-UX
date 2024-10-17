<template>
  <Input @keyup="handleKeyUp" autocomplete="off" :readonly="readonly ? true : false" :id="id" :name="name" v-on:change="handleChange" v-model="pass_value" :componentBehavior="dbComponentBehavior" :rules="rules" />
</template>

<script>
import Input from 'src/components/Base/Input';

export default {
  data() {
      return {
          pass_value: this.value,
      };
  },
  props: ['text', 'value', 'dbComponentBehavior', 'id', 'name','rules', 'type','readonly'],
  components: {
      Input,
  },
  methods:{
      handleChange: function(newVal){
          // var temp_json = [];
          // this.bind_value = "dadas"

          this.$emit('update:pass_value', newVal)
          // temp_json.push({"tab":"supplier_profile","seq":"2","value":this.json_container});
          // this.$emit('receiveChange',temp_json)
      },
      handleKeyUp (newVal) {
        this.$emit('handlekeyup', newVal)
      }
  },
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
  background: #ededed;
  border-bottom-style: none;
}

/* disable field*/
.q-field--filled.q-field--disabled >>> .q-field__control:before {
  opacity: 1;
  background: #ededed;
  border-bottom-style: none;
}
</style>
