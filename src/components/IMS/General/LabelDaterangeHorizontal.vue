<template>
    <!-- <div class="component_div"> -->
        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                <Label class="custom_label" :text="text" />
            </div>
            <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                <Daterange v-on:receiveChange="handleChange" :daterange="bind_value"
                :componentBehavior="dbComponentBehavior ? dbComponentBehavior : oridbComponentBehavior.text" />
            </div>
        </div>
    <!-- </div> -->
</template>

<script>
import Label from 'src/components/IMS/Base/Label';
import Daterange from 'src/components/IMS/Base/Daterange';

import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
    name:"LabelDaterangeHorizontal",
    data() {
        return {
            bind_value: this.pass_value
        };
    },
    props: ['text','pass_value','dbComponentBehavior','no_label','readonly'],
    computed:{
        // ...mapGetters("tta"),
        oridbComponentBehavior() {
            return this.$store.getters['dbComponentBehavior/byLanguage']('erp')
        },
    },
    components: {
        Label,
        Daterange
    },
    methods:{
        handleChange: function(newVal){
            // var temp_json = [];
            // this.bind_value = "dadas"
            this.$emit('update:pass_value', newVal)
            // temp_json.push({"tab":"supplier_profile","seq":"2","value":this.json_container});
            this.$emit('receiveChange',newVal)
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

* >>> .q-field--filled .q-field__control:after {
    background: black;
}


</style>
