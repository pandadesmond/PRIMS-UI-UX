<template>
    <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4" style="display:flex">
            <Button_icon class="component_edit_button" v-if="edit_design" icon="edit_note" color="primary" v-on:receiveEditClick="receiveEditClick" />
            <div class="component_div" v-if="json_container">
                <Label class="custom_label" :text="json_container.label" />
                <div class="row">
                    <div class="col-xs-3 col-sm-3 col-md-2 col-lg-2 col-xl-2">
                        <Select :no_label="true" :readonly="json_container.readonly ? true : false" v-on:receiveChange="handleChangePrefix" v-model="json_container.prefix1.value" :options="json_container.prefix1.options"
                        :componentBehavior="dbComponentBehavior[json.prefix1Behaviour] ? dbComponentBehavior[json.prefix1Behaviour] : dbComponentBehavior.select"/>
                    </div>
                    <div class="col-xs-9 col-sm-9 col-md-10 col-lg-10 col-xl-10">
                        <Input :no_label="true" :readonly="json_container.readonly ? true : false" v-on:receiveChange="handleChangeValue"  v-model="json_container.input1" :dbComponentBehavior="dbComponentBehavior[json.input1Behaviour] ? dbComponentBehavior[json.input1Behaviour] : dbComponentBehavior.text" />
                    </div>
                </div>
            </div>
        </div>


    </div>
</template>

<script>
import Label from 'src/components/RIMS/Base/Label';
import Select from 'src/components/RIMS/Base/Select';
import Input from 'src/components/RIMS/Base/Input';
import Button_icon from 'src/components/Base/Button_icon';

// import { mapState, mapMutations, mapGetters } from 'vuex'
const originalRadio1Options = "";
const originalRadio1Value= "";

export default {
    name: "Label_option_input",
    data() {
        return {
            json_container: this.json,
        };
    },
    props: ['json','offset','dbComponentBehavior','edit_design'],
    components: {
        Label,
        Select,
        Input,
        Button_icon
    },
    computed:{
        // ...mapGetters("tta"),
        // dbComponentBehavior() {
        //     return this.$store.getters['dbComponentBehavior/byLanguage']('tta')
        // },
    },
    methods: {
        handleChangePrefix: function(newVal){

            // this.json_container.prefix1.value = newVal;

        },
        handleChangeValue: function(newVal)
        {
            this.json_container.input1 = newVal;
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

/* .component_div > div > div:first-child  >>> .q-field__label
{
    display: none;
}

.component_div > div > div:first-child >>> .q-field__control-container
{
    padding-top: 8px !important;
} */

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