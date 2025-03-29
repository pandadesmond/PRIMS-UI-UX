<template>
    <div class="row" style="align-items: center;">
        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12">
            <Label :pass_value="label"/>
        </div>
        <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-xs-12">
            <Daterange v-model:daterange="date" :optionsFn="options_start" :end_optionsFn="options_end" 
                :componentBehavior="dbComponentBehavior ? dbComponentBehavior : componentBehavior.text" 
                v-on:receiveChange="handleChange" :readonly="readonly" :range="true" :dateFormat="dateFormat"/>
        </div>
    </div>
</template>

<script>
import Label from 'src/components/PRIMS/Main/Label'
import Daterange from 'src/components/PRIMS/Main/Daterange'

export default {
    props:['options_start','options_end','daterange','label','dbComponentBehavior','readonly','dateFormat'],
    data(){
        return {
            date: this.daterange,
        }
    },
    components: {
        Label,
        Daterange,
    },
    computed: {
        componentBehavior() {
            return this.$store.getters['dbComponentBehavior/byLanguage']('tta')
        },
    },
    methods: {
        handleChange(newVal) {
            this.$emit('receiveChange', newVal)
        },
    },
    watch: {
        daterange(newVal)
        {
            this.date = newVal;
        },
    }
}
</script>

<style scoped>
* >>> .q-field--disabled.custom_datepicker > .q-field__inner
{
  cursor: text;
}

.new_input >>> .q-field__inner, .new_input >>> .q-field__inner > .q-field__control {
    height: 32px;
}

* >>> .q-field--error
{
    padding-bottom: 5px;
}

</style>