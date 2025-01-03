<template>
  <b @click="handleClick()">{{ value }}</b>
</template>

<script>
export default {
    data(){
        return{
            value: this.pass_value,
        }
    },
    props: ['pass_value'],
    methods:{
        handleClick()
        {
            this.$emit('receiveClick');
        }
    },
    watch: {
        pass_value(newVal){
            this.value = newVal;
        }
    }
}
</script>

<style>

</style>