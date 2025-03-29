<template>
    <div class="row items-start">
        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12 q-py-sm">
            <Label :pass_value="label"/>
        </div>
        <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-xs-12">
            <q-option-group
                v-model="value"
                :options="bind_options"
                type="radio"
                color="primary"
                size="sm"
                :disable="readonly"
                @update:model-value="handleChange"
            />
        </div>
    </div>
</template>

<script>
import Label from 'src/components/PRIMS/Main/Label'

export default {
    components: {
        Label,
    },
    props: ['label','pass_value','options','readonly'],
    data(){
        return {
            value: this.pass_value,
            bind_options: this.options,
            bind_type: this.pass_type,
        }
    },
    computed: {
        componentBehavior() {
            return this.$store.getters['dbComponentBehavior/byLanguage']('tta')
        },
    },
    methods: {
        handleChange(newVal){
            this.$emit('update:pass_value',newVal);
            this.$emit('receiveChange',newVal);
        }
    },
    watch: {
        pass_value(newVal){
            this.value = newVal;
        },
        options(newVal)
        {
            this.bind_options = newVal;
        },
    },
}
</script>

<style>

</style>