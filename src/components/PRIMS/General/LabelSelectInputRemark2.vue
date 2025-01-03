<template>
    <div class="row justify-start q-my-xs">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 q-py-xs">
            <Label :pass_value="label"/>
            <q-btn v-if="allow_remove" color="red" icon="close" class="q-ml-xs" size="12px" @click="handleRemove" flat dense/>
        </div>
        <div class="col-xl-11 col-lg-11 col-md-11 col-sm-12 col-xs-12">
            <div class="row q-gutter-md" style="align-items: center;">
                <div class="col-xl-2 col-lg-2 col-md-2 col-sm-5 col-xs-12"> 
                    <div class="row">
                        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                            <Select :readonly="readonly" v-model:pass_value="value.select1" :options="options.select1"
                            :dbComponentBehavior="dbComponentBehavior.text_required" v-on:receiveChange="handleChangeSelect1"/>
                        </div>
                        <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                            <Input :readonly="readonly" v-model:pass_value="value.input1" :dbComponentBehavior="dbComponentBehavior.number" input-style="text-align: right" v-on:receiveChange="handleChangeInput1" outlined/>
                        </div>
                    </div>                    
                </div>
                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-5 col-xs-12">
                    <RadioButton v-model:pass_value="value.radio1" :options="options.radio1" v-on:receiveChange="handleChangeRadio1" :readonly="readonly"/>
                </div>
                <div v-if="is_auto" class="col-xl-2 col-lg-2 col-md-2 col-sm-5 col-xs-12">
                    <Select :readonly="readonly" v-model:pass_value="value.type" :options="options.type"
                    :dbComponentBehavior="is_auto ? dbComponentBehavior.text_required : dbComponentBehavior.text" v-on:receiveChange="handleChangeType"/>
                </div>
            </div>

            <div class="row q-gutter-md" style="align-items: center;">
                <div class="col-xl-2 col-lg-2 col-md-2 col-sm-5 col-xs-12"> 
                    <div class="row">
                        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-3">
                            <Select :readonly="readonly" v-model:pass_value="value.select2" :options="options.select2"
                            :dbComponentBehavior="dbComponentBehavior.text_required" v-on:receiveChange="handleChangeSelect2"/>
                        </div>
                        <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                            <Input :readonly="readonly" v-model:pass_value="value.input2" :dbComponentBehavior="dbComponentBehavior.number" input-style="text-align: right" v-on:receiveChange="handleChangeInput2" outlined/>
                        </div>
                    </div>                    
                </div>
                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-5 col-xs-12">
                    <RadioButton v-model:pass_value="value.radio2" :options="options.radio2" v-on:receiveChange="handleChangeRadio2" :readonly="readonly"/>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import Label from 'src/components/PRIMS/Main/Label'
import Select from 'src/components/PRIMS/Main/Select'
import Input from 'src/components/PRIMS/Main/Input'
import RadioButton from 'src/components/PRIMS/Main/RadioButton'

export default {
    components: {
        Label,
        Select,
        Input,
        RadioButton,
    },    
    computed: {
        dbComponentBehavior() {
            return this.$store.getters['dbComponentBehavior/byLanguage']('tta')
        },
    },
    props: ['label','selectOptions1', 'radioOptions1','input1','select1', 'radio1','selectOptions2', 'radioOptions2','input2','select2', 'radio2','type','typeOptions','is_auto','allow_remove','readonly'],
    data(){
        return {
            value: {
                select1: this.select1,
                select2: this.select2,
                input1: this.input1,
                input2: this.input2,
                radio1: this.radio1,
                radio2: this.radio2,
                type: this.type,
            },
            options: {
                select1: this.selectOptions1,
                select2: this.selectOptions2,
                radio1: this.radioOptions1,
                radio2: this.radioOptions2,
                type: this.typeOptions,
            }
        }
    },
    methods:{
        handleChangeSelect1(newVal){
            this.value.select1 = newVal;
            this.$emit('receiveChange',this.value);
        },
        handleChangeInput1(newVal){
            this.value.input1 = newVal;
            this.$emit('receiveChange',this.value);
        },
        handleChangeRadio1(newVal){
            this.value.radio1 = newVal;
            this.$emit('receiveChange',this.value);
        },
        handleChangeSelect2(newVal){
            this.value.select2 = newVal;
            this.$emit('receiveChange',this.value);
        },
        handleChangeInput2(newVal){
            this.value.input2 = newVal;
            this.$emit('receiveChange',this.value);
        },
        handleChangeRadio2(newVal){
            this.value.radio2 = newVal;
            this.$emit('receiveChange',this.value);
        },
        handleChangeType(newVal){
            this.value.type = newVal;
            this.$emit('receiveChange',this.value);
        },
        handleRemove()
        {
            this.$emit('receiveRemove');
        }
    },
    watch:{
        input1(newVal){
            console.log("input1",newVal)
            this.value.input1 = newVal;
        },
        select1(newVal){
            this.value.select1 = newVal;
        },
        radio1(newVal){
            this.value.radio1 = newVal;
        },
        input2(newVal){
            console.log("input2",newVal)
            this.value.input2 = newVal;
        },
        select2(newVal){
            this.value.select2 = newVal;
        },
        radio2(newVal){
            this.value.radio2 = newVal;
        },
        type(newVal){
            this.value.type = newVal;
        },
        selectOptions1(newVal){
            this.options.select1 = newVal;
        },
        radioOptions1(newVal){
            this.options.radio1 = newVal;
        },
        selectOptions2(newVal){
            this.options.select2 = newVal;
        },
        radioOptions2(newVal){
            this.options.radio2 = newVal;
        },
        typeOptions(newVal){
            this.options.type = newVal;
        },
    }
}
</script>
