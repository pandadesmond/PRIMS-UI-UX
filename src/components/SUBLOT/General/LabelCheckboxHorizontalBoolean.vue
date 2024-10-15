<template>
    <!-- <div class="component_div"> -->
        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                <Label class="custom_label" :text="text"  :required="required"/>
            </div>

            <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                <Checkbox :no_label="no_label" :readonly="readonly ? true : false" v-on:receiveChange="handleChange" :value="bind_value"
                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior : oridbComponentBehavior.text"  class="custom_checkbox"/>
            </div>
        </div>
    <!-- </div> -->
</template>

<script>
import Label from 'src/components/SUBLOT/Base/Label';
import Checkbox from 'src/components/SUBLOT/Base/Checkbox';

import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
    name:"LabelCheckboxHorizontal",
    data() {
        return {
            bind_value: this.pass_value
        };
    },
    props: ['text','pass_value','dbComponentBehavior','no_label','readonly', 'required'],
    computed:{
        // ...mapGetters("tta"),
        oridbComponentBehavior() {
            return this.$store.getters['dbComponentBehavior/byLanguage']('sublot')
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
            // var newVal = newVal == true ? 1 : 0;
            this.$emit('update:pass_value', newVal)
            // temp_json.push({"tab":"supplier_profile","seq":"2","value":this.json_container});
            this.$emit('receiveChange',newVal)
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
    height: 100%;/*add in  for left 4 col line break over will follow div height*/
}
*>>> .q-checkbox__inner--truthy{
 color:#273655 !important;
}

.q-checkbox{
  padding: 0px;
  min-height: 34px !important;
  height: 34px !important;
}

</style>
