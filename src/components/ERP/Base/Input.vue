<template>
    <InputBase class="new_input" outlined @keyup="handleKeyUp" autocomplete="off" :readonly="readonly ? true : false" :id="id" :name="name" v-on:change="handleChange" v-model="pass_value" :componentBehavior="dbComponentBehavior" />
</template>

<script>
import InputBase from "src/components/ERP/Base/InputBase";

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
@media (max-width: 599px) {
q-field__native {
        padding: 0px;
        min-height: 0px !important;
        overflow-y: scroll;
    }
}
.q-field--outlined.q-field--readonly >>>.q-field__control:before {
    border-style: solid;
}
*>>>.q-field__native, .q-field__prefix, .q-field__suffix, .q-field__input {
  color: #000;
  font-size: 11px;
  font-style: normal;
  font-weight: 500;
  font-family: InterfontMedium;
}
*>>> .q-field__label {
    top: 8px;
}
* >>> .q-field__control
{
  padding-left: 6px;
  padding-right: 6px;
  padding-top: 0px;
  padding-bottom: 0px;
}
.new_input >>> .q-field__inner, .new_input >>> .q-field__inner > .q-field__control {
  /* height: 32px; */
}
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


/* readonly field */
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
*>>>.q-field__control {
    height: 32px !important;
}
.q-field--labeled >>>.q-field__native {
    line-height: 24px;
    padding-top: 0px;
    padding-bottom: 0px;
}
</style>
