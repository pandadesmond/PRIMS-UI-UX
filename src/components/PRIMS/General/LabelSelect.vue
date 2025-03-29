<template>
    <div class="row" style="align-items: center;">
        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12">
            <Label :pass_value="label"/>
        </div>
        <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-xs-12">
            <div class="row">
                <div v-if="filter" class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                    <Select
                        :readonly="readonly"
                        v-model:pass_value="bind_type"
                        v-on:receiveChange="handleChangeType"
                        :dbComponentBehavior="filter && dbComponentBehavior ? dbComponentBehavior : componentBehavior.select"
                        :options="type_options"
                    />
                </div>
                <div :class="filter ? 'col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8' : button ? 'col-xl-9 col-lg-9 col-md-9 col-sm-9 col-xs-9' : 'col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12'">
                    <Select
                        :readonly="readonly"
                        v-model:pass_value="value"
                        v-on:receiveChange="handleChange"
                        v-on:receiveFilter="handleFilter"
                        :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior : componentBehavior.select"
                        :options="bind_options"
                        :loading="loading"
                    />
                </div>
                <div v-if="button" class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3">
                    <Button :pass_label="button" class="custom_button"
                        v-on:receiveClick="handleClickButton"
                        :pass_no_caps="true"
                        :pass_square="true"
                        :pass_dense="true"
                        :pass_flat="true"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Label from 'src/components/PRIMS/Main/Label'
import Select from 'src/components/PRIMS/Main/Select'
import Button from 'src/components/PRIMS/Main/Button'

export default {
    props:['label','dbComponentBehavior','pass_value','pass_type','readonly','options','options_type','loading','filter','button'],
    data(){
        return {
            value: this.pass_value,
            bind_options: this.options,
            bind_type: this.pass_type,
            type_options: this.options_type,
        }
    },
    components: {
        Label,
        Select,
        Button,
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
        },
        handleChangeType (newVal) {
            this.$emit('receiveChangeType', newVal)
            this.$emit('update:pass_type', newVal)
        },
        handleClickButton()
        {
            this.$emit('receiveClickButton');
        },
        handleFilter(val)
        {
            this.$emit('receiveFilter',val);
        },
    },
    watch: {
        pass_value(newVal){
            this.value = newVal;
        },
        options(newVal)
        {
            this.bind_options = newVal;
        },
        pass_type(newVal){
            this.bind_type = newVal;
        },
        options_type(newVal)
        {
            this.type_options = newVal;
        },
    },
}
</script>

<style scoped>
.custom_button
{
    font-size: 10px;
    background-color: #273655;
    color: white;
    padding: 5px;
    width: 100%;
    height: 100%;
}

* >>> .q-field--error
{
    padding-bottom: 5px;
}
</style>
