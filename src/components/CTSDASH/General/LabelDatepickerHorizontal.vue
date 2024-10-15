<template>
    <!-- <div class="component_div"> -->
        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                <Label class="custom_label" :text="text" :required="required" />
            </div>
            <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                <Datepicker v-on:receiveChange="handleChange" :pass_disabled="readonly" :daterange="bind_value" :optionsFn="options"
                :componentBehavior="dbComponentBehavior ? dbComponentBehavior : oridbComponentBehavior.text" :disableOptions="disable"/>
            </div>
        </div>
    <!-- </div> -->
</template>

<script>
import Label from 'src/components/CTSDASH/Base/Label';
import Datepicker from 'src/components/CTSDASH/Base/Datepicker';

// import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
    name:"LabelDatepickerHorizontal",
    data() {
        return {
            bind_value: this.pass_value,
            options: this.optionsFn
        };
    },
    props: ['text','disable','required','pass_value','readonly','optionsFn','dbComponentBehavior','no_label','readonly'],
    computed:{
        // ...mapGetters("tta"),
        oridbComponentBehavior() {
            return this.$store.getters['dbComponentBehavior/byLanguage']('erp')
        },
    },
    components: {
        Label,
        Datepicker
    },
    methods:{
        handleChange: function(newVal){
            // var temp_json = [];
            // this.bind_value = "dadas"
            this.$emit('update:pass_value', newVal)
            this.$emit('receiveChange', newVal)
            // temp_json.push({"tab":"supplier_profile","seq":"2","value":this.json_container});
            // this.$emit('receiveChange',temp_json)
        }
    },
    watch: {
        pass_value(newVal)
        {
            this.bind_value = newVal;
        },
        options(newVal){
            this.optionsFn = newVal;
        }
    }
}
</script>

<style scoped>
.custom_label
{
    /* make vertical align*/
    display: flex;
    align-items: center;
    padding-left: 6px;
    height: 100%;/*add in  for left 4 col line break over will follow div height*/
}

/* For text input padding removal */
.q-field
{
    height: 100%;/*when overflow label input will also follow height*/
}

* >>> .q-field__control
{
    height: 100%;/*when overflow label input will also follow height*/
}

* >>> .q-field--filled .q-field__control:after {
    background: black;
}


</style>
