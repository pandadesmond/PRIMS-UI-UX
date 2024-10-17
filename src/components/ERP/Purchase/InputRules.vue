<template>
  <InputBase @keyup="handleKeyUp" autocomplete="off" :readonly="readonly ? true : false" :id="id" :name="name" v-on:change="handleChange" v-model="pass_value" :componentBehavior="dbComponentBehavior" :rules="rules" class="custom-input" />
</template>

<script>
import InputBase from 'src/components/ERP/Base/InputBase';

export default {
  data() {
      return {
          pass_value: this.value,
      };
  },
  props: ['text', 'value', 'dbComponentBehavior', 'id', 'name','rules', 'type','readonly'],
  components: {
      InputBase,
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
  /* border: 1px solid #d2d6de; */
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
.q-field--labeled.q-field--dense >>>.q-field__native {
  line-height: 24px;
  padding-top: 24px;
  padding-bottom: 8px !important;
}

*>>>.text-right {
    text-align: left;
}
*>>>.q-field__prefix {
    padding-right: 0px;
}
@media (max-width: 599px) {
  *>>>.q-field__native {
    /* min-height: 50px !important; */
    /* height: 50px !important; */
    /* height: 150px; */
    padding-top: 20px !important;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    font-family: InterfontMedium;
    /* background-color: #ffc6cd; */
}
.custom-input >>> .q-field__control {
  /* border-radius: 8px; */
  padding: 0px 16px !important;
  /* background-color: antiquewhite; */
  overflow: hidden;
  background: white;
  height: 32px;
}
* >>> .q-field__label
{
  top: 10px;
  color: #535151;
  /* background-color: antiquewhite; */
  font-size: 10px !important;
  font-style: normal;
  font-weight: 500;
  font-family: InterfontMedium;
}
}

@media (min-width: 600px) {
  *>>>.q-field__native {
    /* min-height: 50px !important; */
    /* height: 50px !important; */
    /* height: 150px; */
    /* padding-top: 20px !important; */
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    font-family: InterfontMedium;
    /* background-color: #ffc6cd; */
}
.custom-input >>> .q-field__control {
  /* border-radius: 8px; */
  /* padding: 0px 16px !important; */
  /* background-color: antiquewhite; */
  overflow: hidden;
  background: white;
  height: 32px;
}
* >>> .q-field__label
{
  top: 11px;
  color: #535151;
  /* background-color: antiquewhite; */
  font-size: 11px !important;
  font-style: normal;
  font-weight: 500;
  font-family: InterfontMedium;
}
.q-field--dense.q-field--float >>> .q-field__label {
    transform: translateY(-30%) scale(0.75);
    font-size: 12px !important;
}

}
</style>
