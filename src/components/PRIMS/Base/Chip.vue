<template>
    <ChipBase v-on:receiveClick="handleClick" :text="pass_text" :icon="pass_icon" outline/>
</template>

<script>
import ChipBase from 'src/components/ERP/Base/ChipBase';

export default {
    data() {
        return {
            pass_text: this.text,
            pass_icon: this.icon,
        };
    },
    props: ['text','icon'],
    components: {
        ChipBase,
    },
    methods:{
        handleClick: function(newVal){
            // var temp_json = [];
            // this.bind_value = "dadas"
            // this.$emit('update:pass_value', newVal)
            // temp_json.push({"tab":"supplier_profile","seq":"2","value":this.json_container});
            // this.$emit('receiveChange',temp_json)
        }
    },
    // watch:{
    //     value(newVal)
    //     {
    //         this.pass_text = text;
    //     }
    // }
}
</script>

<style scoped>

</style>