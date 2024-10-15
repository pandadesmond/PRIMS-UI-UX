<template>
    <!-- <div class="component_div"> -->
        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                <Label class="custom_label" :text="text" />
            </div>

            <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 q-pl-md q-py-sm">
              <Toggle
                  :no_label="no_label"
                  :readonly="readonly ? true : false"
                  v-on:receiveToggleChange="handleChange"
                  v-model="bind_value"
                  :false-value="0" :true-value="1"
             />
            </div>
        </div>
    <!-- </div> -->
</template>

<script>
import Label from 'src/components/SUBLOT/Base/Label';
import Toggle from 'src/components/SUBLOT/Base/Toggle';

import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
    name:"LabelCheckboxHorizontal",
    data() {
        return {
           bind_value: this.pass_value
        };
    },
    props: ['text','pass_value','no_label','readonly'],

    components: {
        Label,
        Toggle
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
    padding-bottom: 0px;
    height: 100%;/*add in  for left 4 col line break over will follow div height*/
}


</style>
