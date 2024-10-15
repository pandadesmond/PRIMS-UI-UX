<template>
    <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
            <div class="row main_row">

                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" style="display:flex">
                    <div>
                        <Button_icon class="component_edit_button" v-if="edit_design" icon="edit_note" color="primary" v-on:receiveEditClick="receiveEditClick" />
                        <Button_icon class="component_edit_button" v-if="edit_design" icon="tune" color="positive" v-on:receiveEditClick="receiveEditAccountCode" :tooltip_message="tooltip_message" />
                    </div>
                    <div class="component_div" v-if="json_container">
                        <Label class="custom_label" :text="json_container.label" />
                        <div class="row">
                            <div class="col-xs-3 col-sm-3 col-md-2 col-lg-2 col-xl-2">
                                <Select v-if="json_container.prefix1.options.length > 1" :no_label="true" :readonly="json_container.readonly ? true : false" v-on:receiveChange="handleChangePrefix1" v-model="json_container.prefix1.value" :options="json_container.prefix1.options"
                                :componentBehavior="dbComponentBehavior[json.prefix1Behaviour] ? dbComponentBehavior[json.prefix1Behaviour] : dbComponentBehavior.select"/>

                                <Input v-else :no_label="true" readonly
                                v-on:receiveChange="handleChangeValue"
                                v-on:receiveKeyUp="handleKeyUpValue"
                                v-model="json_container.prefix1.value"
                                :dbComponentBehavior="dbComponentBehavior.text" />

                            </div>
                            <div class="col-xs-9 col-sm-9 col-md-10 col-lg-10 col-xl-10">
                                <!-- <Select v-model="input1" :options="json.input1.options"/> -->
                                <Input :autofocusclick="true" :no_label="true" :readonly="json_container.readonly ? true : false" 
                                v-on:receiveChange="handleChangeValue1"
                                v-on:receiveKeyUp="handleKeyUpValue1"
                                v-model="json_container.input1" 
                                :dbComponentBehavior="dbComponentBehavior[json.input1Behaviour] ? dbComponentBehavior[json.input1Behaviour] : dbComponentBehavior.text" />
                            </div>

                            <div class="col-xs-3 col-sm-3 col-md-2 col-lg-2 col-xl-2">
                                <Select v-if="json_container.prefix2.options.length > 1" :no_label="true" :readonly="json_container.readonly ? true : false" v-on:receiveChange="handleChangePrefix2" v-model="json_container.prefix2.value" :options="json_container.prefix2.options"
                                :componentBehavior="dbComponentBehavior[json.prefix1Behaviour] ? dbComponentBehavior[json.prefix1Behaviour] : dbComponentBehavior.select"/>

                                <Input v-else :no_label="true" readonly
                                v-on:receiveChange="handleChangeValue"
                                v-on:receiveKeyUp="handleKeyUpValue"
                                v-model="json_container.prefix2.value"
                                :dbComponentBehavior="dbComponentBehavior.text" />
                            </div>
                            <div class="col-xs-9 col-sm-9 col-md-10 col-lg-10 col-xl-10">
                                <Input :autofocusclick="true" :no_label="true" :readonly="json_container.readonly ? true : false" v-on:receiveChange="handleChangeValue2"  v-model="json_container.input2" 
                                :dbComponentBehavior="dbComponentBehavior[json.input2Behaviour] ? dbComponentBehavior[json.input2Behaviour] : dbComponentBehavior.text" />
                            </div>
                        </div>
                    </div>
                </div>

                <!-- <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div class="component_div custom" v-if="json" style="padding-top:0px;">
                        <div class="row">
                            <div class="col-xs-3 col-sm-3 col-md-2 col-lg-2 col-xl-2">
                                <Select :no_label="true" :readonly="json_container.readonly ? true : false" v-on:receiveChange="handleChangePrefix2" v-model="json_container.prefix2.value" :options="json_container.prefix2.options"
                                :componentBehavior="dbComponentBehavior[json.prefix1Behaviour] ? dbComponentBehavior[json.prefix1Behaviour] : dbComponentBehavior.select"/>
                            </div>
                            <div class="col-xs-9 col-sm-9 col-md-10 col-lg-10 col-xl-10">
                                <Input :no_label="true" :readonly="json_container.readonly ? true : false" 
                                v-on:receiveChange="handleChangeValue2"
                                v-on:receiveKeyUp="handleKeyUpValue2"
                                v-model="json_container.input2" 
                                :dbComponentBehavior="dbComponentBehavior[json.input2Behaviour] ? dbComponentBehavior[json.input2Behaviour] : dbComponentBehavior.text" />
                            </div>
                        </div>
                    </div>
                </div> -->
            </div>
            <!--close row-->
            
        </div>
        <!--close col divider 8-->

        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
            <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div class="component_div">
                            <Radio v-on:receiveChange="handleChangeRadio" :disable="json_container.readonly ? true : false" v-model="json_container.radio1.value" :options="json_container.radio1.options" />
                    </div>
                </div>
            </div>
            <!--close row-->
        </div>
        <!--close col divider 4-->
    </div>
    
</template>

<script>
import Label from 'src/components/RIMS/Base/Label';
import Select from 'src/components/RIMS/Base/Select';
import Input from 'src/components/RIMS/Base/Input';
import Radio from 'src/components/RIMS/Base/Radio';
import Button_icon from 'src/components/Base/Button_icon';

// import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
    name: "Label_option_input_radio2",
    data() {
        return {
            json_container: this.json,
            original_json: JSON.parse(JSON.stringify(this.json))
        };
    },
    props: ['json', 'dbComponentBehavior','edit_design', 'tooltip_message'],
    components: {
        Label,
        Select,
        Input,
        Radio,
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

            if(this.json.field == 'new_item_first_order_discount' || this.json.field == 'new_store_first_order_discount')
            {
                // var radio_label = this.json_container.radio1.options[0].label;
                var radio_label = this.original_json.radio1.options[0].label;
                var new_radio_label = radio_label.replace(" X ", " "+parseFloat(this.json_container.input1).toFixed(0)+" ");
                var label_after = radio_label.substr(radio_label.indexOf('X ')+2);
                var new_radio_label = new_radio_label.replace(label_after, " "+ this.json_container.prefix1.value+" ");
                
                this.json_container.radio1.options[0].label = new_radio_label;
            }

            //told parent something changing
            this.$emit('receiveChangeTrigger');
        },
        handleChangeValue1: function(newVal)
        {
            // this.json_container.input1 = newVal;
            this.json_container.input1 = this.$pluginsRimsFormatNumber(newVal);
            if(this.json.field == 'new_item_first_order_discount' || this.json.field == 'new_store_first_order_discount')
            {
                // var radio_label = this.json_container.radio1.options[0].label;
                var radio_label = this.original_json.radio1.options[0].label;
                var new_radio_label = radio_label.replace(" X ", " "+newVal+" ");
                var label_after = radio_label.substr(radio_label.indexOf('X ')+2);
                var new_radio_label = new_radio_label.replace(label_after, " "+ this.json_container.prefix1.value+" ");
                
                this.json_container.radio1.options[0].label = new_radio_label;
            }
            
            //told parent something changing
            this.$emit('receiveChangeTrigger');

        },
        handleKeyUpValue1: function(newVal)
        {
            var value = this.json_container.input1;
            this.json_container.input1 = this.$pluginsRimsFormatNumberKeyup(value);
        },
        handleChangePrefix2: function(newVal)
        {
            this.json_container.prefix2.value = newVal;
            //told parent something changing
            this.$emit('receiveChangeTrigger');
        },
        handleChangeValue2: function(newVal)
        {
            this.json_container.input2 = this.$pluginsRimsFormatNumber(newVal);
            // this.json_container.input2 = newVal;
            //told parent something changing
            this.$emit('receiveChangeTrigger');
        },
        handleKeyUpValue2: function(newVal)
        {
            var value = this.json_container.input2;
            this.json_container.input2 = this.$pluginsRimsFormatNumberKeyup(value);
        },
        receiveEditClick: function(){
            this.$emit('receiveEditClick')
        },
        receiveEditAccountCode: function(){
            this.$emit('receiveEditAccountCode')
        },
        handleChangeRadio(newVal){
            //told parent something changing
            this.$emit('receiveChangeTrigger');
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
    margin-top: 73px;
}

.q-field {
    padding-bottom: 10px;
}

/* when hover on text input */
.component_div > div > div:nth-child(odd) >>> .q-field__control:before {
    background:#094161;
    /* border-bottom: 1px solid rgba(0, 0, 0, 0.42);
    opacity: 0;
    transition: opacity 0.36s cubic-bezier(0.4, 0, 0.2, 1), background 0.36s cubic-bezier(0.4, 0, 0.2, 1); */
}

.component_div > div > div:nth-child(odd) >>> .q-field__control
{
    background-color: #094161 !important;
    padding-right: 0px;
}

* >>> .q-field--filled .q-field__control:after
{
    color: #094161 !important;
}

.component_div > div > div:nth-child(odd) >>> .q-field__control > .q-field__control-container > .q-field__native
{
    color:white !important;
}

.component_div > div > div:nth-child(odd) >>> .q-field__control > .q-field__append
{
    color:white;
}

/* .main_row > div:first-child > .component_div > div > div:first-child  >>> .q-field__label
{
    display: none;
}

.main_row > div:first-child > .component_div > div > div:first-child  >>> .q-field__control-container
{
    padding-top: 8px !important;
}


.main_row > div:nth-child(2) > .component_div > div > div:first-child  >>> .q-field__label
{
    display: none;
}

.main_row > div:nth-child(2) > .component_div > div > div:first-child  >>> .q-field__control-container
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