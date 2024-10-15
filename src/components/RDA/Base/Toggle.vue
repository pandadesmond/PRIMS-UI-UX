<template>

      <Toggle :pass_value="bind_value" label="" />

</template>

<script>
import Toggle from 'src/components/Base/Toggle';

export default {
    data()
    {
        return{
            bind_value: this.pass_value,
        }
    },
    props: ["pass_value","label"],
    components: {
        Toggle
    },
    watch: {
        pass_value(newVal)
        {
            this.bind_value = newVal
        }
    }
}
</script>

<style>

</style>