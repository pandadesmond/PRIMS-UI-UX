<template>
    <!-- <div class="component_div"> -->
        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <Label class="custom_label" :text="text" :required="required"/>
                <Datepicker :autoclose="autoclose"
                  v-on:receiveChange="handleChange"
                  :daterange="bind_value"
                  :optionsFn="options"
                  :componentBehavior="dbComponentBehavior ? dbComponentBehavior : oridbComponentBehavior.text"
                  :disableOptions="disable"
                  :pass_disabled="readonly" />
            </div>
        </div>
    <!-- </div> -->
</template>

<script>
import Label from 'src/components/SUBLOT/Base/Label';
import Datepicker from 'src/components/SUBLOT/Base/Datepicker';

// import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
    name:"LabelDatepickerHorizontal",
    data() {
        return {
            bind_value: this.pass_value,
            options: this.optionsFn
        };
    },
    props: [
      'text',
      'disable',
      'required',
      'pass_value',
      'optionsFn',
      'dbComponentBehavior',
      'no_label',
      'readonly',
      'autoclose'
    ],
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
            // if(this.autoclose)
            // {
            //   this.$refs.qDateProxy.hide();
            // }
        }
    },
    watch: {
        pass_value(newVal)
        {
            this.bind_value = newVal;
        },
        options(newVal){
            this.optionsFn = newVal;
        },
        daterange(newVal)
        {
            // var newVal = newVal == true ? 1 : 0;
            this.date = newVal;
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
}

/* For text input padding removal */
* >>> .q-field--filled .q-field__control:after {
    background: black;
}
</style>
