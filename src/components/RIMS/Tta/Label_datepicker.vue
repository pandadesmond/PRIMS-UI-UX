<template>
    <!-- <div class="row"> -->
        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4" style="display:flex">
            <div>
                <Button_icon class="component_edit_button" v-if="edit_design" icon="edit_note" color="primary" v-on:receiveEditClick="receiveEditClick" />
            </div>
            <div class="component_div" v-if="json">
                <Label class="custom_label" :text="json.label" />
                <Datepicker :disable="json.readonly" v-on:receiveChange="handleChange" :daterange="json_container.daterange" 
                :componentBehavior="dbComponentBehavior[json.input1Behaviour] ? dbComponentBehavior[json.input1Behaviour] : dbComponentBehavior.text" :autoclose="autoclose" />
            </div>
        </div>
    <!-- </div> -->
</template>

<script>
import Label from 'src/components/RIMS/Base/Label';
import Datepicker from 'src/components/RIMS/Base/Datepicker';
import Button_icon from 'src/components/Base/Button_icon';

import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
    name:"Label_datepicker",
    data() {
        return {
            json_container:this.json,
        };
    },
    props: ['json', 'edit_design', "autoclose"],
    computed:{
        // ...mapGetters("tta"),
        dbComponentBehavior() {
            return this.$store.getters['dbComponentBehavior/byLanguage']('tta')
        },
    },
    components: {
        Datepicker,
        Label,
        Button_icon
    },
    methods:{
        handleChange: function(newVal){
            this.json_container.daterange = newVal;
            this.$emit('receiveChangeTrigger')
        },
        receiveEditClick: function(){
            this.$emit('receiveEditClick')
        },
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

* >>> .q-field--disabled > .q-field__inner
{
    background-color: #dbdbdb !important;
    color: black;
}

* >>> .q-field--disabled > .q-field__inner > .q-field__control
{
    background-color: #dbdbdb !important;
    color: black;
}

* >>> .q-field--disabled > .q-field__inner > .q-field__control > .q-field__control-container
{
    opacity: 1 !important;
}


</style>