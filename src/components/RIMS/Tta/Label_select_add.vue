<template>
    <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4" style="display:flex">
            <div>
                <Button_icon class="component_edit_button" v-if="edit_design" icon="edit_note" color="primary" v-on:receiveEditClick="receiveEditClick" />
                <Button_icon class="component_edit_button" v-if="edit_design" icon="tune" color="positive" v-on:receiveEditClick="receiveEditAccountCode" :tooltip_message="tooltip_message" />
            </div>
            <div class="component_div" v-if="json_container">
                <Label class="custom_label" :text="json.label" />
                <Select :no_label="true" :readonly="json_container.readonly ? true : false" v-on:receiveChange="handleChange" v-model="json_container.prefix1.value" :options="json.prefix1.options" 
                :componentBehavior="dbComponentBehavior[json.prefix1Behaviour] ? dbComponentBehavior[json.prefix1Behaviour] : dbComponentBehavior.select"/>
            </div>
        </div>

        <div :class="['col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4',offset]">
            <div class="component_div">
                    <!-- <Radio :disable="json_container.readonly ? true : false" v-on:receiveChange="handleChangeRadio" v-model="json_container.radio1.value" :options="json_container.radio1.options" /> -->
                    <Button style="width:50% !important;" class="button_add" v-on:receiveChange="handleAddButton()" :text="'Add'" :type="'button'" />
            </div>
        </div>

        <div :class="['col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4',offset]" v-if="json_container.daterange">
            <div class="component_div">
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
import Button_icon from 'src/components/Base/Button_icon';
import Button from 'src/components/Base/Button';


// import { mapState, mapMutations, mapGetters } from 'vuex'
const originalRadio1Options = "";
const originalRadio1Value= "";

export default {
    name: "Label_select_add",
    data() {
        return {
            json_container: this.json,
            lastKeep: "",
            lastKeepByAmount: "",
            date: "",
        };
    },
    props: ['json','offset','dbComponentBehavior','edit_design','tooltip_message'],
    components: {
        Label,
        Select,
        Input,
        Radio,
        Daterange,
        Button_icon,
        Button,
    },
    methods: {
        handleChange(newVal)
        {
            // if(this.json_container.field == "display_incentive_outlet")
            // {
            //     this.$emit('receiveDisplayIncentiveOutletChange',newVal);
            // }//close else
        },
        handleAddButton()
        {
            if(this.json_container.field == "display_incentive_outlet")
            {
                this.$emit('receiveDisplayIncentiveOutletAdd',this.json_container);
            }//close else
        },
        handleChangeDatePicker(newVal)
        {
            if((newVal != "") && (newVal != null) && (newVal != 'null'))
            {
                this.json_container.daterange  =newVal
            }

            //told parent something changing
            this.$emit('receiveChangeTrigger');
        },
        receiveEditClick: function(){
            this.$emit('receiveEditClick')
        },
        receiveEditAccountCode: function(){
            this.$emit('receiveEditAccountCode')
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

.button_add
{
    background-color: #094161;
    margin-top: 27px;
    min-height: 32px;
    max-height: 32px;
    color: white;
}

</style>