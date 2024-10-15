<template>
    <!-- <div class="component_div"> -->
        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <Label class="custom_label" :text="text" />
                <Select :no_label="no_label" :readonly="readonly ? true : false" v-on:receiveChange="handleChange" v-model="bind_value"
                :options="options"
                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior : oridbComponentBehavior.select" />
            </div>
        </div>
    <!-- </div> -->
</template>

<script>
import Label from 'src/components/HONDA/Base/Label';
import Select from 'src/components/HONDA/Base/Select';

import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
    name:"LabelSelectVertical",
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
        Select,
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


</style>
