<template>

      <q-toggle :disable="pass_disabled" indeterminate-value="maybe" v-model="bindValue" label="" @update:model-value="handleChange" dense/>

</template>

<script>
export default {
    data()
    {
        return{
            bindValue: this.pass_value,
        }
    },
    props: ['pass_value',"pass_disabled"],
    methods: {
        handleChange(newVal)
        {
            this.$emit("receiveToggleChange", newVal);
        }
    },
    watch: {
        pass_value(newVal){
            this.bindValue = newVal;
        }
    }
}
</script>

<style>

</style>