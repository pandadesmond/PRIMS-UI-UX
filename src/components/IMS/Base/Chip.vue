<template>
    <Chip v-on:receiveClick="handleClick" :text="pass_text" :icon="pass_icon"/>
</template>

<script>
import Chip from 'src/components/Base/Chip';

export default {
    data() {
        return {
            pass_text: this.text,
            pass_icon: this.icon,
        };
    },
    props: ['text','icon'],
    components: {
        Chip,
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