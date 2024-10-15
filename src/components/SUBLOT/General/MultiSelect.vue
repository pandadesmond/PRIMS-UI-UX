<template>
    <!-- <div class="component_div"> -->
        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 multiselect">
                <Multiselect :no_label="no_label" :readonly="readonly ? true : false" v-on:receiveChange="handleChange"
                :options="options" v-model="bind_value"   :placeholder="placeholder" :message ="message"
                :componentBehavior="dbComponentBehavior ? dbComponentBehavior : oridbComponentBehavior.select" />
            </div>
        </div>
    <!-- </div> -->
</template>

<script>
import Label from 'src/components/SUBLOT/Base/Label';
import Multiselect from 'src/components/SUBLOT/Base/Multiselect2';

import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
    name:"LabelMultiSelectVertical",
    data() {
        return {
            bind_value: this.pass_value
        };
    },
    props: ['text','required','pass_value','message','dbComponentBehavior','no_label','readonly','options', 'placeholder'],
    computed:{
        // ...mapGetters("tta"),
        oridbComponentBehavior() {
            return this.$store.getters['dbComponentBehavior/byLanguage']('sublot')
        },
    },
    components: {
        Multiselect,
        Label
    },
    methods:{
        handleChange: function(newVal){
            // var temp_json = [];
            // this.bind_value = "dadas"

            this.$emit('update:pass_value', newVal)
            this.$emit('receiveChangeMultiselect', newVal)
            // temp_json.push({"tab":"supplier_profile","seq":"2","value":this.json_container});
            // this.$emit('receiveChange',temp_json)
        }
    },
    watch: {
        pass_value(newVal)
        {

            this.bind_value = newVal;

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

/* make scroll overflow overflow */
.multiselect >>> .q-field__control
{
    max-height: 35px;
    overflow: auto;
    border-radius: 0px;
}

/*make select dropdown bottom line grey color hover*/
* >>> .q-field--filled .q-field__control:before {
    border-bottom: none !important;
}

* >>> .q-field--filled .q-field__control:after
{
    color: white !important;
}
</style>
