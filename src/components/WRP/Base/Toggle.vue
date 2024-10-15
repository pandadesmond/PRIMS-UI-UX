<template>

      <q-toggle :disable="pass_disabled" indeterminate-value="maybe" v-model="value" label="" @update:model-value="handleChange" dense/>

</template>

<script>
export default {
    // data()
    // {
    //     return{
    //        value:this.pass_value,
    //     }
    // },
    props: ['value',"pass_disabled"],
    methods: {
        handleChange(newVal)
        {
            this.$emit("receiveToggleChange", newVal);
        }
    },
    // watch: {
    //     value(newVal){
    //         this.pass_value = newVal;
    //     }
    // }
}
</script>

<style>

</style>
