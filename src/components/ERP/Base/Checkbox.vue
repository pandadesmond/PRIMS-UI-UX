<template>
    <Checkbox :class="[checkbox == true ? 'checkbox' : table == true ? 'table' : btm_padding ? 'btm_padding' : '']" :readonly="readonly ? true : false" :id="id" :name="name"
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
    props: ['value','readonly','checkbox','table','btm_padding'],
    components: {
        Checkbox,
    },
    methods:{
        handleChange: function(newVal){
            // var temp_json = [];
            // this.bind_value = "dadas"
            // this.$emit('update:pass_value', newVal)
            // temp_json.push({"tab":"supplier_profile","seq":"2","value":this.json_container});
            this.$emit('receiveChangenewVal',newVal)
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
.checkbox
{
  padding-bottom: 1px;
  margin-left: -10px;
  margin-right: -10px;
  margin-top: -5px;
  margin-bottom: -5px;
}

.table
{
  margin-left: -10px;
  margin-right: -10px;
  margin-top: -10px;
  margin-bottom: -10px;
}

.btm_padding
{
  padding-bottom: 4px;
  margin-top: -4px;
}
</style>
