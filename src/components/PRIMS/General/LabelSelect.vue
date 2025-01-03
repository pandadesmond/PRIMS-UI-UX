<template>
    <div class="row" style="align-items: center;">
        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12">
            <Label :pass_value="label"/>
        </div>
        <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-xs-12">
            <Select
                :readonly="readonly"
                v-model:pass_value="value"
                v-on:receiveChange="handleChange"
                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior : componentBehavior.select"
                :options="bind_options"
            />
        </div>
    </div>
</template>

<script>
import Label from 'src/components/PRIMS/Main/Label'
import Select from 'src/components/PRIMS/Main/Select'

export default {
    props:['label', 'dbComponentBehavior', 'pass_value', 'readonly','options'],
    data(){
        return {
            value: this.pass_value,
            bind_options: this.options,
        }
    },
    components: {
        Label,
        Select,
    },
    computed: {
        componentBehavior() {
            return this.$store.getters['dbComponentBehavior/byLanguage']('tta')
        },
    },
    methods:{
        handleChange: function(newVal){
            this.$emit('update:pass_value', newVal)
            this.$emit('receiveChange', newVal);
        }
    },
    watch: {
        pass_value(newVal){
            this.value = newVal;
        },
        options(newVal)
        {
            this.bind_options = newVal;
        }
    },
}
</script>

<style scoped>
* >>> .q-field--error
{
    padding-bottom: 5px;
}
</style>
