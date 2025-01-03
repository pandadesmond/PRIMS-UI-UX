<template>
    <InputBase class="new_input" @keyup="handleKeyUp" autocomplete="off" :readonly="readonly ? true : false" :id="id" :name="name" v-on:change="handleChange" v-model="pass_value" :componentBehavior="dbComponentBehavior" />
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
*>>>.q-field__control {
    height: 32px;
    max-width: 100%;
    /* outline: none; */
}
*>>>.q-field__label {
    top: 8px;
}
.q-field--float >>>.q-field__label { 
    top: 10px;
}
.q-field--with-bottom {
    padding-bottom: 0px;
}
</style>
