<template>
    <Checkbox :readonly="readonly ? true : false" :id="id" :name="name" 
    v-on:receiveChange="handleChange" :value="pass_value"/>
</template>

<script>
import Checkbox from 'src/components/Base/Checkbox';

export default {
    data() {
        return {
            pass_value: this.value,
        };
    },
    props: ['value','readonly'],
    components: {
        Checkbox,
    },
    methods:{
        handleChange: function(newVal){
            // var temp_json = [];
            // this.bind_value = "dadas"
            // this.$emit('update:pass_value', newVal)
            // temp_json.push({"tab":"supplier_profile","seq":"2","value":this.json_container});
            // this.$emit('receiveChange',temp_json)
        }
    },
    watch:{
        value(newVal)
        {
            this.pass_value = newVal;
        }
    }
}
</script>

<style scoped>
* >>> .q-checkbox__inner
{
    font-size: 28px;
}
</style>