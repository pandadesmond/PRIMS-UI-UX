<template>
    <div class="row" style="align-items: center;">
        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12">
            <Label :pass_value="label"/>
        </div>
        <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-xs-12">
            <Datepicker class="custom_datepicker new_input"
                v-on:receiveChange="handleChange" 
                :optionsFn="optionsFn" 
                :daterange="date"
                :componentBehavior="dbComponentBehavior ? dbComponentBehavior : componentBehavior.date" 
                :readonly="readonly"
                :autoclose="true"
                :dateFormat="dateFormat"
            />
        </div>
    </div>
</template>

<script>
import Label from 'src/components/PRIMS/Main/Label'
import Datepicker from 'src/components/PRIMS/Main/Datepicker'

export default {
    props:['optionsFn','daterange','label','dbComponentBehavior','readonly','dateFormat'],
    data(){
        return {
            date: this.daterange,
        }
    },
    components: {
        Label,
        Datepicker,
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
        }
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