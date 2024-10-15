<template>
    <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
            <div class="component_div" v-if="json_container">
                <Label class="custom_label" :text="json_container.label" />
                <div class="row">
                    <div class="col-xs-3 col-sm-3 col-md-2 col-lg-2 col-xl-2">
                        <Select :no_label="true" :readonly="json_container.readonly ? true : false" v-on:receiveChange="handleChangePrefix" v-model="json_container.prefix1.value" :options="json_container.prefix1.options"
                        :componentBehavior="dbComponentBehavior[json.prefix1Behaviour] ? dbComponentBehavior[json.prefix1Behaviour] : dbComponentBehavior.select"/>
                    </div>
                    <div class="col-xs-9 col-sm-9 col-md-10 col-lg-10 col-xl-10">
                        <Input :no_label="true" :readonly="json_container.readonly ? true : false" v-on:receiveChange="handleChangeValue"  v-model="json_container.input1" 
                        :dbComponentBehavior="dbComponentBehavior[json.input1Behaviour] ? dbComponentBehavior[json.input1Behaviour] : dbComponentBehavior.text" />
                    </div>
                </div>
            </div>
        </div>

        <div :class="['col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3',offset]">
            <div class="component_div">
                    <Radio :disable="json_container.readonly ? true : false" v-on:receiveChange="handleChangeRadio" v-model="json_container.radio1.value" :options="json_container.radio1.options" />
            </div>
        </div>

        <div :class="['col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3',offset]">
            <div class="component_div">
                    <Radio :disable="json_container.readonly ? true : false" v-on:receiveChange="handleChangeRadio2" v-model="json_container.radio2.value" :options="json_container.radio2.options" />
            </div>
        </div>

        <div :class="['col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2',offset]" v-if="json_container.daterange">
            <div class="component_div">
                {{json_container.readonly}}
                <Daterange v-on:receiveChange="handleChangeDatePicker"  :daterange="json_container.daterange"
                :componentBehavior="dbComponentBehavior[json.daterangeBehavior] ? dbComponentBehavior[json.daterangeBehavior] : dbComponentBehavior.date" />
            </div>
        </div>
    </div>
</template>

<script>
import Label from 'src/components/RIMS/Base/Label';
import Select from 'src/components/RIMS/Base/Select';
import Input from 'src/components/RIMS/Base/Input';
import Radio from 'src/components/RIMS/Base/Radio';
import Daterange from 'src/components/RIMS/Base/Daterange';

// import { mapState, mapMutations, mapGetters } from 'vuex'
const originalRadio1Options = "";
const originalRadio1Value= "";

export default {
    name: "LabelOptionInputRadioMultiple.vue",
    data() {
        return {
            json_container: this.json,
            originalRadio1Options: this.json.radio1.options,
            originalRadio1Value: this.json.radio1.value,
            date: "",
        };
    },
    props: ['json','offset','dbComponentBehavior'],
    components: {
        Label,
        Select,
        Input,
        Radio,
        Daterange
    },
    computed:{
        // ...mapGetters("tta"),
        // dbComponentBehavior() {
        //     return this.$store.getters['dbComponentBehavior/byLanguage']('tta')
        // },
    },
    methods: {
        handleChangePrefix: function(newVal){
            
            if(newVal == 'RM')
            {
                var options = [{"label":"Yearly","value":"Yearly"},{"label":"Monthly","value":"Monthly"}];
                var value = 'Yearly';
                this.json_container.radio1.options = options;
                this.json_container.radio1.value = value;
            }
            else if(newVal == '%')
            {
                this.json_container.radio1.options = this.originalRadio1Options;
                this.json_container.radio1.value = this.originalRadio1Value;
            }
            else
            {
                this.json_container.radio1.options = this.originalRadio1Options;
                this.json_container.radio1.value = this.originalRadio1Value;
            }
            
            this.json_container.prefix1.value = newVal;

        },
        handleChangeValue: function(newVal)
        {
            this.json_container.input1 = newVal;
        },
        handleChangeRadio: function(newVal)
        {
            this.json_container.radio1.value = newVal;
        },
        handleChangeDatePicker(newVal)
        {
            if((newVal != "") && (newVal != null) && (newVal != 'null'))
            {
                this.json_container.daterange  =newVal
            }
        }
    },
    computed:{
        displayDateRange()
        {
            var return_message = '';
            if(this.json_container.daterange != undefined)
            {
                var from = this.json_container.daterange.from;
                var to = this.json_container.daterange.to;
                var return_message = from+" - "+to;
            }
            
            return return_message;
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
/* @media only screen and (min-width: 1439px) {
    .q-option-group {
        margin-top: 27px;
        background-color: red;
    }
} */

.q-option-group {
    margin-top: 27px;
}

/* when hover on text input */
.component_div > div > div:first-child  >>> .q-field__control:before {
    background:#094161;
    /* border-bottom: 1px solid rgba(0, 0, 0, 0.42);
    opacity: 0;
    transition: opacity 0.36s cubic-bezier(0.4, 0, 0.2, 1), background 0.36s cubic-bezier(0.4, 0, 0.2, 1); */
}

.component_div > div > div:first-child >>> .q-field__control
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

.component_div > div > div:first-child  >>> .q-field__label
{
    display: none;
}

/* .component_div > div > div:first-child >>> .q-field__control-container
{
    padding-top: 5px !important;
} */

/* q-field__control-container
q-field__native */
/* for small then md size*/
@media only screen and (max-width: 1023px) {

    .q-field {
        padding-bottom: 0px;
    }

    .q-option-group {
        margin-top: 0px;
    }
}

</style>