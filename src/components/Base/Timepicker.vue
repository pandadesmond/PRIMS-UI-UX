<template>
    <q-input :disable="pass_disabled" filled v-model="bind_value" mask="time" :rules="componentBehavior.rules" @change="handleInputChange">
        <template v-slot:append>
            <q-icon name="access_time" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-time v-model="bind_value" @update:model-value="handleChange">
                <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
                </q-time>
            </q-popup-proxy>
            </q-icon>
        </template>
    </q-input>
</template>

<script>
export default {
    name: "Timepicker",
    data()
    {
        return{
            bind_value: this.pass_value
        }
    },
    props: ['pass_value', 'componentBehavior', 'addEditView', 'id', 'name', 'icon_prepend', 'icon_append','type','no_label', "pass_disabled"],
    methods:{
        handleChange(newVal) {
            this.$emit('receiveChange', newVal)
        },
        handleInputChange(newVal)
        {
            this.$emit('receiveChange', newVal)
        }
    },
    watch:{
        pass_value(newVal){
            this.bind_value = newVal
        }
    }
}
</script>

<style>

</style>