<template>
    <div class="row justify-start q-my-xs">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 q-py-xs">
            <Label :pass_value="label"/>
            <q-btn v-if="allow_remove" color="red" icon="close" class="q-ml-xs" size="12px" @click="handleRemove" flat dense/>
        </div>
        <div class="col-xl-11 col-lg-11 col-md-11 col-sm-12 col-sm-12">
            <div class="row q-gutter-md" style="align-items: center;"> 
                <div class="col-xl-2 col-lg-2 col-md-2 col-sm-5 col-xs-12">
                    <div class="row">
                        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                            <Select :readonly="readonly" v-model:pass_value="value.select" :options="options.select"
                            :dbComponentBehavior="dbComponentBehavior.text_required" v-on:receiveChange="handleChangeSelect"/>
                        </div>
                        <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                            <Input :readonly="readonly" v-model:pass_value="value.input" :dbComponentBehavior="dbComponentBehavior.number" input-style="text-align: right" v-on:receiveChange="handleChangeInput" outlined/>
                        </div>
                    </div>                    
                </div>
                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-5 col-xs-12">
                    <RadioButton :readonly="readonly" v-model:pass_value="value.radio" :options="options.radio" v-on:receiveChange="handleChangeRadio"/>
                </div>
                <div class="col-xl-2 col-lg-2 col-md-2 col-sm-5 col-xs-12">
                    <Daterange v-model:daterange="value.date" :optionsFn="options.date" :componentBehavior="dbComponentBehavior.text_required" 
                    v-on:receiveChange="handleChangeDate" :readonly="readonly" :range="false" show="from" :dateFormat="dateFormat"/>
                </div>
                <div v-if="is_auto" class="col-xl-2 col-lg-2 col-md-2 col-sm-5 col-xs-12">
                    <Select :readonly="readonly" v-model:pass_value="value.type" :options="options.type"
                        :dbComponentBehavior="is_auto ? dbComponentBehavior.text_required : dbComponentBehavior.text" v-on:receiveChange="handleChangeType"/>
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
import Daterange from 'src/components/PRIMS/Main/Daterange'

export default {
    components: {
        Label,
        Select,
        Input,
        RadioButton,
        Daterange,
    },    
    computed: {
        dbComponentBehavior() {
            return this.$store.getters['dbComponentBehavior/byLanguage']('tta')
        },
    },
    props: ['label','selectOptions', 'radioOptions', 'dateOptions','typeOptions','input','select', 'radio', 'date_from', 'date_to','type',
    'allow_remove','readonly','is_auto','dateFormat'],
    data(){
        return {
            value: {
                select: this.select,
                input: this.input,
                radio: this.radio,
                date: {
                    from: this.date_from,
                    to: this.date_to,
                },
                type: this.type,
            },
            options: {
                select: this.selectOptions,
                radio: this.radioOptions,
                date: this.dateOptions,
                type: this.typeOptions,
            }
        }
    },
    methods:{
        handleChangeSelect(newVal){
            this.value.select = newVal;
            this.$emit('update:select',newVal);
            this.$emit('receiveChange',this.value);
        },
        handleChangeInput(newVal){
            this.value.input = newVal;
            this.$emit('update:input',newVal);
            this.$emit('receiveChange',this.value);
        },
        handleChangeRadio(newVal){
            this.value.radio = newVal;
            this.$emit('update:radio',newVal);
            this.$emit('receiveChange',this.value);
        },
        handleChangeDate(newVal){
            this.value.date = newVal;
            this.$emit('update:date_from',newVal.from);
            this.$emit('update:date_to',newVal.to);
            this.$emit('receiveChange',this.value);
        },
        handleChangeType(newVal){
            this.value.type = newVal;
            this.$emit('update:type',newVal);
            this.$emit('receiveChange',this.value);
        },
        handleRemove(){
            this.$emit('receiveRemove');
        }
    },
    watch:{
        input(newVal){
            this.value.input = newVal;
        },
        select(newVal){
            this.value.select = newVal;
        },
        radio(newVal){
            this.value.radio = newVal;
        },
        date_from(newVal){
            this.value.date.from = newVal;
        },
        date_to(newVal){
            this.value.date.to = newVal;
        },
        type(newVal){
            this.value.type = newVal;
        },
    }
}
</script>
