<template>
    <!-- <div class="row"> -->
        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
            <div class="component_div" v-if="json">
                <Label class="custom_label" :text="json.label" />
                <Checkbox :dense="true" :disable="json_container.readonly ? true : false" v-on:receiveChange="handleChange" :value="json_container.input1" 
                :dbComponentBehavior="dbComponentBehavior[json.input1Behaviour] ? dbComponentBehavior[json.input1Behaviour] : dbComponentBehavior.text" />
            </div>
        </div>
    <!-- </div> -->
</template>

<script>
import Label from 'src/components/RIMS/Base/Label';
import Checkbox from 'src/components/RIMS/Base/Checkbox';

import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
    name:"Label_checkbox",
    data() {
        return {
            json_container:this.json,
        };
    },
    props: ['json'],
    computed:{
        // ...mapGetters("tta"),
        dbComponentBehavior() {
            return this.$store.getters['dbComponentBehavior/byLanguage']('tta')
        },
    },
    components: {
        Checkbox,
        Label
    },
    methods:{
        handleChange: function(newVal){
            // var temp_json = [];
            if(this.json_container.field == 'co_reg_no' || this.json_container.field == 'supplier_address' || this.json_container.field == 'supplier_telno' || this.json_container.field == 'supplier_faxno'){
                alert('Please aware that you are manipulating the data information from backend.')
            }
                this.json_container.input1 = newVal;    
            

            // temp_json.push({"tab":"supplier_profile","seq":"2","value":this.json_container});
            this.$emit('receiveChangeTrigger')//emit for detect input change
        }
    },
    watch: {
        json(newVal)
        {
            this.json_container = newVal;
        }
    }
}
</script>

<style scoped>
.q-checkbox {
    padding-top: 7px;
    padding-bottom: 7px;
}

</style>