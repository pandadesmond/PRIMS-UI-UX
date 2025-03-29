<template>
    <div class="row">
        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12">
            <Label :pass_value="label"/>
        </div>
        <template v-if="filter && button">
            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3">
                <Select
                    :readonly="readonly"
                    v-model:pass_value="bind_type"
                    v-on:receiveChange="handleChangeType"
                    :dbComponentBehavior="filter && dbComponentBehavior ? dbComponentBehavior : componentBehavior.select"
                    :options="type_options"
                />
            </div>
            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                <MultipleSelect
                    :readonly="readonly"
                    v-model:pass_value="bind_value"
                    v-on:receiveChange="handleChange"
                    v-on:receivePopupHide="handlePopupHide"
                    :componentBehavior="dbComponentBehavior ? dbComponentBehavior : componentBehavior.select"
                    :options="bind_options"
                    :forceSelectAll="forceSelectAll"
                    :outlined="true"
                    :option_label="option_label"
                    :loading="loading"
                    :select_all="select_all" 
                />
            </div>
            <div class="col">
                <Button :pass_label="button" class="custom_button"
                    v-on:receiveClick="handleClickButton"
                    :pass_no_caps="true"
                    :pass_square="true"
                    :pass_dense="true"
                    :pass_flat="true"
                />
            </div>
        </template>
        <div v-else class="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-xs-12">
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
                <div :class="button ? 'col-xl-9 col-lg-9 col-md-9 col-sm-9 col-xs-9' : filter ? 'col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8' : 'col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12'">
                    <MultipleSelect
                        :readonly="readonly"
                        v-model:pass_value="bind_value"
                        v-on:receiveChange="handleChange"
                        v-on:receivePopupHide="handlePopupHide"
                        :componentBehavior="dbComponentBehavior ? dbComponentBehavior : componentBehavior.select"
                        :options="bind_options"
                        :forceSelectAll="forceSelectAll"
                        :outlined="true"
                        :option_label="option_label"
                        :loading="loading"
                        :select_all="select_all" 
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
import Button from 'src/components/PRIMS/Main/Button'
import Select from 'src/components/PRIMS/Main/Select'
import MultipleSelect from 'src/components/PRIMS/Main/MultipleSelect'

export default {
    props:['label', 'dbComponentBehavior', 'pass_value','pass_type', 'readonly','options','options_type','select_all','forceSelectAll', 'button', 'option_label','filter','loading'],
    data(){
        return {
            bind_type: this.pass_type,
            bind_value: this.pass_value,
            bind_options: this.options,
            type_options: this.options_type,
            all: false,
        }
    },
    components: {
        Label,
        Button,
        Select,
        MultipleSelect,
    },
    computed: {
        componentBehavior() {
            return this.$store.getters['dbComponentBehavior/byLanguage']('tta')
        },
    },
    methods:{
        handlePopupHide()
        {
            this.$emit('receivePopupHide');
        },
        handleChange (newVal) {
            this.$emit('update:pass_value', newVal)
            this.$emit('receiveChange', newVal)
        },
        handleChangeType (newVal) {
            this.$emit('receiveChangeType', newVal)
            this.$emit('update:pass_type', newVal)
        },
        handleClickButton()
        {
            this.$emit('receiveClickButton');
        }
    },
    watch: {
        pass_value(newVal){
            this.bind_value = newVal;
        },
        pass_type(newVal){
            this.bind_type = newVal;
        },
        options(newVal)
        {
            this.bind_options = newVal;
        },
        options_type(newVal)
        {
            this.type_options = newVal;
        }
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

.flex_button {
    flex-grow: 1;
}
</style>