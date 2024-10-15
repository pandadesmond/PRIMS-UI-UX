<template>
    <!-- <div class="component_div"> -->
        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 multiselect">
                <Label class="custom_label" :text="text" />
                <Multiselect :no_label="no_label" :readonly="readonly ? true : false" v-on:receiveChange="handleChange" v-model="bind_value"
                :options="options" 
                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior : oridbComponentBehavior.select" />
            </div>
        </div>
    <!-- </div> -->
</template>

<script>
import Label from 'src/components/ERP/Base/Label';
import Multiselect from 'src/components/ERP/Base/Multiselect';

import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
    name:"LabelMultiSelectVertical",
    data() {
        return {
            bind_value: this.pass_value
        };
    },
    props: ['text','pass_value','dbComponentBehavior','no_label','readonly','options'],
    computed:{
        // ...mapGetters("tta"),
        oridbComponentBehavior() {
            return this.$store.getters['dbComponentBehavior/byLanguage']('erp')
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
}

/* make scroll overflow overflow */
.multiselect >>> .q-field__control
{
    max-height: 70px;
    overflow: auto;
    border-radius: 0px;
}

/*make select dropdown bottom line grey color hover*/
* >>> .q-field--filled .q-field__control:before {
    border-bottom: none;
}


</style>