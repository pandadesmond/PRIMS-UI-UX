<template>

    <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
        <div class="component_div custom_select" v-if="json_container">
                <!-- <Radio :disable="json_container.readonly ? true : false" v-model="json_container.radio1.value" :options="json_container.radio1.options" /> -->
                <!-- <Select :readonly="json_container.readonly ? true : false" v-on:receiveChange="handleChange" v-model="json_container.prefix3.value" :options="json.prefix3.options" 
                :componentBehavior="dbComponentBehavior[json.prefix3Behaviour] ? dbComponentBehavior[json.prefix3Behaviour] : dbComponentBehavior.select"/> -->
                <Label class="custom_label" :text="json_container.label+' Options'" />
                <div class="row">
                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                        <Select :no_label="true" :readonly="json_container.readonly ? true : false" v-on:receiveChange="handleChangePrefix1" v-model="json_container.prefix1.value" :options="json_container.prefix1.options"
                        :componentBehavior="dbComponentBehavior[json.prefix1Behaviour] ? dbComponentBehavior[json.prefix1Behaviour] : dbComponentBehavior.text"/>
                    </div>
                    <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9 col-xl-9 multiselect">
                        <Select v-if="json_container.prefix1.value == 'Division'" :no_label="true" :readonly="json_container.readonly ? true : false" v-on:receiveChange="handleChangePrefix2" v-model="json_container.prefix2.value" :options="json.prefix2.options" 
                        :componentBehavior="dbComponentBehavior[json.prefix2Behaviour] ? dbComponentBehavior[json.prefix2Behaviour] : dbComponentBehavior.select"/>

                        <Multiselect v-else :readonly="json_container.readonly || json_container.prefix2_readonly ? true : false" v-on:receiveChange="handleChangePrefix2" v-model="json_container.prefix2.value" :options="json.prefix2.options" 
                        :dbComponentBehavior="dbComponentBehavior[json.prefix2Behaviour] ? dbComponentBehavior[json.prefix2Behaviour] : dbComponentBehavior.select"/>
                    </div>
                </div>
        </div>

    </div>
    
</template>

<script>
import Label from 'src/components/RIMS/Base/Label';
import Select from 'src/components/RIMS/Base/Select';
import Multiselect from 'src/components/RIMS/Base/Multiselect';
// import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
    name: "Label_option_multiselect",
    data() {
        return {
            json_container: this.json,
        };
    },
    props: ['json', 'dbComponentBehavior'],
    components: {
        Label,
        Select,
        Multiselect
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

            if(this.json.field == 'trading_group')
            {
                this.$emit('receiveChangeTradingGroup',newVal)
            }
            
            //this function to switch prefix2 value default to make it applicable for multiple and single
            if(this.json_container.prefix1.value == 'Division')
            {
                this.json_container.prefix2.value = "";
            }
            else
            {
                this.json_container.prefix2.value = [];
            }

            if(this.json.field == 'outlet')
            {
                this.$emit('receiveChangeOutlet',newVal)
            }

        },
        handleChangeValue1: function(newVal)
        {
            this.json_container.input1 = newVal;
        },
        handleChangePrefix2: function(newVal)
        {
            this.json_container.prefix2.value = newVal;
            this.$emit('receiveChangeTradingGroupValue',newVal)
        },
        handleChangeValue2: function(newVal)
        {
            this.json_container.input2 = newVal;
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

/*make select dropdown bottom line blue color*/
* >>> .q-field--filled .q-field__control:after
{
    color: white !important;
}

/* make scroll overflow overflow */
.multiselect  >>> .q-field__control
{
    max-height: 70px;
    overflow-y: auto;
}

/*make select dropdown bottom line grey color hover*/
* >>> .q-field--filled .q-field__control:before {
    border-bottom: none;
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