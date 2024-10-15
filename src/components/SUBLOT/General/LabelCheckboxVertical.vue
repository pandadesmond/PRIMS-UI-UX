<template>
    <!-- <div class="component_div"> -->
        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <Label class="custom_label" :text="text" />
                <Checkbox :no_label="no_label" :disable="readonly ? true : false" :readonly="readonly ? true : false" v-on:receiveChange="handleChange" :value="bind_value" 
                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior : oridbComponentBehavior.text" />
            </div>
        </div>
    <!-- </div> -->
</template>

<script>
import Label from 'src/components/HONDA/Base/Label';
import Checkbox from 'src/components/HONDA/Base/Checkbox';

import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
    name:"LabelCheckboxVertical",
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
        Checkbox
    },
    methods:{
        handleChange: function(newVal){
            // var temp_json = [];
            // this.bind_value = "dadas"
            var newVal = newVal == true ? 1 : 0;
            this.$emit('update:pass_value', newVal)
            // temp_json.push({"tab":"supplier_profile","seq":"2","value":this.json_container});
            // this.$emit('receiveChange',temp_json)
        }
    },
    watch: {
        pass_value(newVal)
        {
            var newVal = newVal == true ? 1 : 0;
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