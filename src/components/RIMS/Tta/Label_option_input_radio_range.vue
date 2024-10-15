<template>
    <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
            <div class="row">

                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" style="display:flex">
                    <Button_icon class="component_edit_button" v-if="edit_design" icon="edit_note" color="primary" v-on:receiveEditClick="receiveEditClick" />
                    <div class="component_div" v-if="json_container">
                        <Label class="custom_label" :text="json_container.label" />
                        <div class="row">
                            <div class="col-xs-3 col-sm-3 col-md-2 col-lg-2 col-xl-2">
                                <Select :no_label="true" :readonly="json_container.readonly ? true : false" v-on:receiveChange="handleChangePrefix1" v-model="json_container.prefix1.value" :options="json_container.prefix1.options"
                                :componentBehavior="dbComponentBehavior[json.prefix1Behaviour] ? dbComponentBehavior[json.prefix1Behaviour] : dbComponentBehavior.select"/>
                            </div>
                            <div class="col-xs-9 col-sm-9 col-md-10 col-lg-10 col-xl-10">
                                <Input :no_label="true" :readonly="json_container.readonly ? true : false" v-on:receiveChange="handleChangeValue1" v-model="json_container.input1" :componentBehavior="dbComponentBehavior.number" />
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <div class="component_div" v-if="json">
                        <div class="row container_to">
                            <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1 col-xl-1">
                                <div style="padding-top:10px;text-align:center;">
                                    <BaseLabel class="to_label" :text="'To'" />
                                </div>
                            </div>

                            <div class="col-xs-3 col-sm-3 col-md-2 col-lg-2 col-xl-2">
                                <Select :no_label="true" :readonly="json_container.readonly ? true : false" v-on:receiveChange="handleChangePrefix2" v-model="json_container.prefix2.value" :options="json_container.prefix2.options"
                                :componentBehavior="dbComponentBehavior[json.prefix1Behaviour] ? dbComponentBehavior[json.prefix1Behaviour] : dbComponentBehavior.select"/>
                            </div>
                            <div class="col-xs-8 col-sm-8 col-md-9 col-lg-9 col-xl-9">
                                <Input :no_label="true" :readonly="json_container.readonly ? true : false" v-on:receiveChange="handleChangeValue2" v-model="json_container.input2" :componentBehavior="dbComponentBehavior.number" />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <div class="component_div custom" v-if="json" style="padding-top:0px;">
                        <div class="row">
                            <div class="col-xs-3 col-sm-3 col-md-2 col-lg-2 col-xl-2">
                                <Select :no_label="true" :readonly="json_container.readonly ? true : false" v-on:receiveChange="handleChangePrefix3" v-model="json_container.prefix3.value" :options="json_container.prefix3.options"
                                :componentBehavior="dbComponentBehavior[json.prefix1Behaviour] ? dbComponentBehavior[json.prefix1Behaviour] : dbComponentBehavior.select"/>
                            </div>
                            <div class="col-xs-9 col-sm-9 col-md-10 col-lg-10 col-xl-10">
                                <Input :no_label="true" :readonly="json_container.readonly ? true : false" v-on:receiveChange="handleChangeValue3" v-model="json_container.input3" :componentBehavior="dbComponentBehavior.number" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--close row-->
            
        </div>
        <!--close col divider 8-->

        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
            <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div class="component_div">
                            <Radio :disable="json_container.readonly ? true : false" v-on:receiveChange="handleChangeRadio1" v-model="json_container.radio1.value" :options="json_container.radio1.options" />
                    </div>
                </div>
            </div>
            <!--close row-->
        </div>
        <!--close col divider 4-->
    </div>
</template>

<script>
import BaseLabel from 'src/components/Base/Label';
import Label from 'src/components/RIMS/Base/Label';
import Select from 'src/components/RIMS/Base/Select';
import Input from 'src/components/RIMS/Base/Input';
import Radio from 'src/components/RIMS/Base/Radio';
import Button_icon from 'src/components/Base/Button_icon';

// import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
    name: "Label_option_input_radio_range",
    data() {
        return {
            json_container: this.json,
        };
    },
    props: ['json','dbComponentBehavior','edit_design'],
    components: {
        Label,
        Select,
        Input,
        Radio,
        BaseLabel,
        Button_icon
    },
    computed:{
        // ...mapGetters("tta"),
        // dbComponentBehavior() {
        //     return this.$store.getters['dbComponentBehavior/byLanguage']('tta')
        // },
    },
    methods:{
        handleChangePrefix1: function(newVal)
        {
            this.json_container.prefix1.value = newVal;
        },
        handleChangeValue1: function(newVal)
        {
            this.json_container.input1 = newVal;
        },
        handleChangePrefix2: function(newVal)
        {
            this.json_container.prefix2.value = newVa2;
        },
        handleChangeValue2: function(newVal)
        {
            this.json_container.input2 = newVal;
        },
        handleChangePrefix3: function(newVal)
        {
            this.json_container.prefix3.value = newVal;
        },
        handleChangeValue3: function(newVal)
        {
            this.json_container.input3 = newVal;
        },
        handleChangeRadio1: function(newVal)
        {
            this.json_container.radio1.value = newVal;
        },
        receiveEditClick: function(){
            this.$emit('receiveEditClick')
        }
    },
    watch:{
        json(newVal)
        {
            // console.log(newVal);
            this.json_container = newVal
        }
    }
    
}
</script>

<style scoped>
.container_to
{
    margin-top: 27px;
}

.to_label
{
    font-weight: bold;
}

/*make radio button margin-top range*/
.q-option-group
{
    margin-top: 68px;
}

.q-field {
    padding-bottom: 10px;
}

/* when hover on text input */


.component_div > div > div:first-child >>> .q-field__control
{
    background-color: #094161 !important;
    padding-right: 0px;
}

.component_div > div.container_to > div:nth-child(2) >>> .q-field__control
{
    background-color: #094161 !important;
    padding-right: 0px;
}

* >>> .q-field--filled .q-field__control:after
{
    color: #094161 !important;
}


.component_div > div > div:first-child >>> .q-field__control > .q-field__control-container > .q-field__native
{
    color:white !important;
}

.component_div > div > div:first-child >>> .q-field__control > .q-field__append
{
    color:white;
}

.component_div > div.container_to > div:nth-child(2) >>> .q-field__control > .q-field__control-container > .q-field__native
{
    color:white !important;
}

.component_div > div.container_to > div:nth-child(2) >>> .q-field__control > .q-field__append
{
    color:white !important;
}

.component_div > div > div:first-child  >>> .q-field__control:before {
    background:#094161;
    /* border-bottom: 1px solid rgba(0, 0, 0, 0.42);
    opacity: 0;
    transition: opacity 0.36s cubic-bezier(0.4, 0, 0.2, 1), background 0.36s cubic-bezier(0.4, 0, 0.2, 1); */
}

.component_div > div.container_to > div:nth-child(2)  >>> .q-field__control:before {
    background:#094161;
    /* border-bottom: 1px solid rgba(0, 0, 0, 0.42);
    opacity: 0;
    transition: opacity 0.36s cubic-bezier(0.4, 0, 0.2, 1), background 0.36s cubic-bezier(0.4, 0, 0.2, 1); */
}

/* .component_div > div > div:first-child  >>> .q-field__label
{
    display: none;
}

.component_div > div > div:first-child >>> .q-field__control-container
{
    padding-top: 5px !important;
}

.component_div > div.container_to > div:nth-child(2)  >>> .q-field__label
{
    display: none;
}

.component_div > div.container_to > div:nth-child(2) >>> .q-field__control-container
{
    padding-top: 5px !important;
} */


@media only screen and (max-width: 1023px) {
    
    .q-field {
        padding-bottom: 0px;
    }

    .q-option-group {
        margin-top: 0px;
    }

    .container_to
    {
        margin-top: 0px;
    }

    .component_div.custom
    {
        padding-top:8px !important;
    }
}

</style>