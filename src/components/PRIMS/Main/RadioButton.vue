<template>
    <q-card flat bordered>
        <q-btn-toggle
            v-model="value"
            spread
            no-caps
            unelevated
            dense
            toggle-color="primary"
            color="white"
            text-color="black"
            :disable="readonly"
            :options="options"
            @update:model-value="handleChange"
        />
    </q-card>
</template>

<script>
export default {
    props:['pass_value','options','readonly'],
    data(){
        return{
            value: this.pass_value,
            bind_options: this.options,
        }
    },
    methods:{
        handleChange(newVal){
            this.$emit('update:pass_value',newVal)
            this.$emit('receiveChange',newVal)
        }
    },
    watch:{
        pass_value(newVal)
        {
            this.value = newVal;
        },
    }
}
</script>

<style scoped>
* >>> .q-btn__content
{
    font-size: 12px;
}

* >>> .q-btn__content.ellipsis
{
    top: 5px;
    font-size: 12px;
}
</style>