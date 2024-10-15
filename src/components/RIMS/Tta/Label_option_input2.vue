<template>
    <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4" style="display:flex">
            <div>
                <Button_icon class="component_edit_button" v-if="edit_design" icon="edit_note" color="primary" v-on:receiveEditClick="receiveEditClick" />
                <Button_icon class="component_edit_button" v-if="edit_design" icon="tune" color="positive" v-on:receiveEditClick="receiveEditAccountCode" :tooltip_message="tooltip_message" />
            </div>
            <div class="row main_row">

                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" >
                    
                    <div class="component_div" v-if="json_container">
                        <Label class="custom_label" :text="json_container.label" />
                        <div class="row">
                            <div class="col-xs-3 col-sm-3 col-md-2 col-lg-2 col-xl-2">
                                <Select :no_label="true" :readonly="json_container.readonly ? true : false" v-on:receiveChange="handleChangePrefix1" v-model="json_container.prefix1.value" :options="json_container.prefix1.options"
                                :componentBehavior="dbComponentBehavior[json.prefix1Behaviour] ? dbComponentBehavior[json.prefix1Behaviour] : dbComponentBehavior.select"/>
                            </div>
                            <div class="col-xs-9 col-sm-9 col-md-10 col-lg-10 col-xl-10">
                                <!-- <Select v-model="input1" :options="json.input1.options"/> -->
                                <Input :no_label="true" :readonly="json_container.readonly ? true : false" v-on:receiveChange="handleChangeValue1"  v-model="json_container.input1" 
                                :dbComponentBehavior="dbComponentBehavior[json.input1Behaviour] ? dbComponentBehavior[json.input1Behaviour] : dbComponentBehavior.text" />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div class="component_div custom" v-if="json" style="padding-top:0px;">
                        <div class="row">
                            <div class="col-xs-3 col-sm-3 col-md-2 col-lg-2 col-xl-2">
                                <Select :no_label="true" :readonly="json_container.readonly ? true : false" v-on:receiveChange="handleChangePrefix2" v-model="json_container.prefix2.value" :options="json_container.prefix2.options"
                                :componentBehavior="dbComponentBehavior[json.prefix1Behaviour] ? dbComponentBehavior[json.prefix1Behaviour] : dbComponentBehavior.select"/>
                            </div>
                            <div class="col-xs-9 col-sm-9 col-md-10 col-lg-10 col-xl-10">
                                <Input :no_label="true" :readonly="json_container.readonly ? true : false" v-on:receiveChange="handleChangeValue2"  v-model="json_container.input2" 
                                :dbComponentBehavior="dbComponentBehavior[json.input2Behaviour] ? dbComponentBehavior[json.input2Behaviour] : dbComponentBehavior.text" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--close row-->
            
        </div>
        <!--close col divider 8-->
<!-- {{json_container.display}} -->
        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
            <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div class="component_div custom_select" :style="json_container.display ? 'display:none;' : ''">
                            <!-- <Radio :disable="json_container.readonly ? true : false" v-model="json_container.radio1.value" :options="json_container.radio1.options" /> -->
                            <!-- <Select :readonly="json_container.readonly ? true : false" v-on:receiveChange="handleChange" v-model="json_container.prefix3.value" :options="json.prefix3.options" 
                            :componentBehavior="dbComponentBehavior[json.prefix3Behaviour] ? dbComponentBehavior[json.prefix3Behaviour] : dbComponentBehavior.select"/> -->
                            <Label class="custom_label" :text="json_container.label+' Options'" />
                            <div class="row">
                                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                                    <Select :no_label="true" :readonly="json_container.prefix3_readonly ? true : false" v-on:receiveChange="handleChangePrefix3" v-model="json_container.prefix3.value" :options="json_container.prefix3.options"
                                    :componentBehavior="dbComponentBehavior[json.prefix3Behaviour] ? dbComponentBehavior[json.prefix3Behaviour] : dbComponentBehavior.select"/>
                                </div>
                                <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9 col-xl-9 multiselect">
                                    <!-- <Select :no_label="true" :readonly="json_container.prefix3_readonly ? true : false" v-on:receiveChange="handleChangePrefix4" v-model="json_container.prefix4.value" :options="json.prefix4.options" 
                                    :componentBehavior="dbComponentBehavior[json.prefix4Behaviour] ? dbComponentBehavior[json.prefix4Behaviour] : dbComponentBehavior.select"/> -->

                                     <Multiselect :no_label="true" :readonly="json_container.prefix3_readonly ? true : false" v-on:receiveChange="handleChangePrefix4" v-model="json_container.prefix4.value" :options="json.prefix4.options" 
                                    :dbComponentBehavior="dbComponentBehavior[json.prefix4Behaviour] ? dbComponentBehavior[json.prefix4Behaviour] : dbComponentBehavior.select"/>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
            <!--close row-->
        </div>
        <!--close col divider 4-->

        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
            <div class="component_div">
                    <Radio :disable="json_container.readonly ? true : false" v-on:receiveChange="handleChangeRadio" v-model="json_container.radio1.value" :options="json_container.radio1.options" />
            </div>
        </div>

    </div>
    
</template>

<script>
import Label from 'src/components/RIMS/Base/Label';
import Select from 'src/components/RIMS/Base/Select';
import Input from 'src/components/RIMS/Base/Input';
import Radio from 'src/components/RIMS/Base/Radio';
import Multiselect from 'src/components/RIMS/Base/Multiselect';
// import { mapState, mapMutations, mapGetters } from 'vuex'
import Button_icon from 'src/components/Base/Button_icon';

export default {
    name: "Label_option_input2",
    data() {
        return {
            json_container: this.json,
        };
    },
    props: ['json', 'dbComponentBehavior','edit_design'],
    components: {
        Label,
        Select,
        Input,
        Radio,
        Multiselect,
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
            this.json_container.prefix2.value = newVal;
        },
        handleChangeValue2: function(newVal)
        {
            this.json_container.input2 = newVal;
        },
        handleChangePrefix3: function(newVal)
        {
            this.json_container.prefix3.value = newVal;

            if(this.json.field == 'target_growth_tier1')
            {
                this.$emit('receiveChangeTargetGrowthTierOneOptions',newVal)
            }

            if(this.json.field == 'target_growth_tier2')
            {
                this.$emit('receiveChangeTargetGrowthTierTwoOptions',newVal)
            }

            if(this.json.field == 'target_growth_tier3')
            {
                this.$emit('receiveChangeTargetGrowthTierThreeOptions',newVal)
            }
        },
        handleChangePrefix4: function(newVal)
        {
            if(this.json.field == 'target_growth_tier1')
            {
                this.$emit('receiveChangeTargetGrowthTierOneOptionsValue',newVal)
            }
        },
        receiveEditClick: function(){
            this.$emit('receiveEditClick')
        },
        receiveEditAccountCode: function(){
            this.$emit('receiveEditAccountCode')
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
    margin-top: 79px;
}

.q-field {
    padding-bottom: 10px;
    height: 100%;/*make side select will follow hight of right dropdown 2*/
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
    height: 100%;/*make side select will follow hight of right dropdown 1*/
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

/* .custom_select >>> .q-select
{
    margin-top: 79px;
} */

/* .custom_select > div > div > .q-select > .q-field__inner > .q-field__control
{
    padding-right: 0px;
    background-color: red !important;
} */

/* .custom_select > div > div:first-child >>> .q-field__control
{
    background-color: white !important;
    padding-right: 0px;
} */

/* when hover on custome select text input */
/* .custom_select > div > div:first-child  >>> .q-field__control:before {
    background:white;
} */

/* when hover on custome select text input */
/* .custom_select > div > div:first-child >>> .q-field__control > .q-field__control-container > .q-field__native
{
    color:black !important;
} */

/* make scroll overflow overflow */
.multiselect  >>> .q-field__control
{
    max-height: 70px;
    overflow-y: auto;
}

/*make select dropdown bottom line blue color*/
* >>> .q-field--filled .q-field__control:after
{
    color: white !important;
}

/*make select dropdown bottom line grey color hover*/
* >>> .q-field--filled .q-field__control:before {
    border-bottom: none;
}


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