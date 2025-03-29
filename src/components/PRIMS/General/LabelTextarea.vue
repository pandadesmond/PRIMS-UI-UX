<template>
    <div class="row items-start">
        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12 q-py-sm">
            <Label :pass_value="label"/>
        </div>
        <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-xs-12">
            <Textarea
                :readonly="readonly"
                type="textarea"
                :no_label="true"
                v-model:value="value"
                v-on:receiveChange="handleChange"
                :componentBehavior="dbComponentBehavior ? dbComponentBehavior : componentBehavior.textarea"
            />
        </div>
    </div>
</template>

<script>
import Label from 'src/components/PRIMS/Main/Label'
import Textarea from 'src/components/PRIMS/Base/TextareaBase'

export default {
    props:['pass_value','label','dbComponentBehavior','readonly'],
    data(){
        return {
            value: this.pass_value,
        }
    },
    components: {
        Label,
        Textarea,
    },
    computed: {
        componentBehavior() {
            return this.$store.getters['dbComponentBehavior/byLanguage']('tta')
        },
    },
    methods: {
        handleChange(newVal) {
            this.$emit('update:pass_value', newVal)
            this.$emit('receiveChange', newVal)
        },
    },
    watch: {
        pass_value(newVal)
        {
            this.value = newVal;
        }
    }
}
</script>

<style scoped>
* >>> .q-field__control{
    padding: 0px;
}

* >>> .q-field--error
{
    padding-bottom: 5px;
}
</style>