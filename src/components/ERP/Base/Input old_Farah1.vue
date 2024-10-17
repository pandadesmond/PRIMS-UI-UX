<template>
    <InputBase @keyup="handleKeyUp" autocomplete="off" :readonly="readonly ? true : false" :id="id" :name="name" v-on:change="handleChange" v-model="pass_value" :componentBehavior="dbComponentBehavior" class="custom-input"/>
</template>

<script>
import InputBase from 'src/components/ERP/Base/InputBase';

export default {
    data() {
        return {
            pass_value: this.value,
        };
    },
    props: ['text', 'value', 'dbComponentBehavior', 'id', 'name', 'type','readonly'],
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
/* Adjust the value as needed */


.custom-input >>> .q-field__control {
  border-radius: 8px;
  /* padding: 0px 16px !important; */
  /* background-color: antiquewhite; */
  overflow: hidden;
  background: white;
  height: 32px;
}
*>>>.q-field__prefix {
    padding-right: 0px;
}
.q-field--labeled.q-field--dense >>>.q-field__native {
  padding-top: 24px;
  padding-bottom: 8px !important;
  line-height: 24px;
}
*>>>.text-right {
   text-align: left; 
}
@media (max-width: 599px) {
    .q-field--labeled >>>.q-field__native {
    line-height: 24px;
    padding-top: 18px;
    padding-bottom: 8px;
}
    .q-field--float >>>.q-field__label {
    max-width: 133%;
    transform: translateY(-40%) scale(0.75);
    transition: transform 0.36s cubic-bezier(0.4, 0, 0.2, 1), max-width 0.396s cubic-bezier(0.4, 0, 0.2, 1);
    top: 10px;
}
  .custom-input >>> .q-field__control {
    height: 40px !important;
    /* padding: 6px 16px !important; */
  }
  * >>> .q-field__label
{
  top: 10px;
  color: #535151;
  /* background-color: antiquewhite; */
  font-size: 12px !important;
  font-style: normal;
  font-weight: 500;
  font-family: InterfontMedium;
}
*>>>.q-field__native {
    /* min-height: 50px !important; */
    /* height: 50px !important; */
    /* height: 150px; */
    /* padding-top: 20px !important; */
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    font-family: InterfontMedium;
    /* background-color: #ffc6cd; */
}
}

@media (min-width: 600px) {
    .q-field--outlined.q-field--disabled >>>.q-field__control:before {
    border: 2px solid rgba(0, 0, 0, 0.24);
}

    .q-field--float >>> .q-field__label {
    max-width: 133%;
    transform: translateY(-40%) scale(0.75);
    transition: transform 0.36s cubic-bezier(0.4, 0, 0.2, 1), max-width 0.396s cubic-bezier(0.4, 0, 0.2, 1);
    padding-top: 5px;
}
    
    * >>> .q-field__label
    {
    top: 10px !important;
    color: #535151;
    /* background-color: antiquewhite; */
    font-size: 15px !important;
    font-style: normal;
    font-weight: 500;
    font-family: InterfontMedium;
    }
    *>>>.q-field__native {
    /* min-height: 50px !important; */
    /* height: 50px !important; */
    /* height: 150px; */
    /* padding-top: 20px !important; */
    font-size: 11px;
    font-style: normal;
    font-weight: 500;
    font-family: InterfontMedium;
    /* background-color: #ffc6cd; */
}
}
</style>
