<template>
    <div class="row" style="align-items: center;">
        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12">
            <Label :pass_value="label"/>
        </div>
        <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-xs-12">
            <div class="row">
                <div class="col-9">
                    <InputAutocomplete
                        :readonly="readonly"
                        v-model:pass_value="value"
                        v-on:receiveChange="handleChange"
                        v-on:receiveEnter="handleEnter"
                        :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior : componentBehavior.select"
                        :options="bind_options"
                        :loading="loading"
                    />
                </div>
                <div class="col-3">
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
import InputAutocomplete from 'src/components/PRIMS/Main/InputAutocomplete'

export default {
    props:['label', 'dbComponentBehavior', 'pass_value', 'readonly','options','loading','button'],
    data(){
        return {
            value: this.pass_value,
            bind_options: this.options,
        }
    },
    components: {
        Label,
        Button,
        InputAutocomplete,
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
        handleClickButton()
        {
            this.$emit('receiveClickButton',this.value);
        },
        handleEnter(val)
        {
            this.$emit('receiveEnter',val);
        },
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
