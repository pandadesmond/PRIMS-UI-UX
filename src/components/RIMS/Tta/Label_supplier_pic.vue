<template>
    <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
        <div class="component_div" v-if="json">
            <Label
            text="Supplier PIC"
            />

            <Input :readonly="json_container.readonly ? true : false"
            id="supplier_pic_name"
            name="supplier_pic_name"
            type="text"
            v-model="json_container.input1" 
            :dbComponentBehavior="dbComponentBehavior.supplier_pic_name"
            v-on:change="handleChange1"
            />

            <Input :readonly="json_container.readonly ? true : false"
            id="supplier_pic_name"
            name="supplier_pic_name"
            type="text"
            v-model="json_container.input2" 
            :dbComponentBehavior="dbComponentBehavior.supplier_pic_position"
            v-on:change="handleChange2"
            />

            <Input :readonly="json_container.readonly ? true : false"
            id="supplier_pic_contact"
            name="supplier_pic_contact"
            type="text"
            v-model="json_container.input3" 
            :dbComponentBehavior="dbComponentBehavior.supplier_pic_contact"
            v-on:change="handleChange3"
            />

            <Input :readonly="json_container.readonly ? true : false"
            id="supplier_pic_email"
            name="supplier_pic_email"
            type="text"
            v-model="json_container.input4" 
            :dbComponentBehavior="dbComponentBehavior.supplier_pic_email"
            v-on:change="handleChange4"
            />

        </div>
    </div>
</template>

<script>
import Label from 'src/components/RIMS/Base/Label';
import Input from 'src/components/RIMS/Base/Input';

import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
    name:"Label_supplier_pic",
    data() {
        return {
            json_container: this.json,
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
        Input,
        Label
    },
    methods:{
        handleChange1: function(newVal){
            this.json_container.input1 = newVal;
            this.$emit('receiveChangeTrigger');
        },
        handleChange2: function(newVal){
            this.json_container.input2 = newVal;
            this.$emit('receiveChangeTrigger');
        },
        handleChange3: function(newVal){
            this.json_container.input3 = newVal;
            this.$emit('receiveChangeTrigger');
        },
        handleChange4: function(newVal){
            this.json_container.input4 = newVal;
            this.$emit('receiveChangeTrigger');
        }
    },
    watch:{
        json(newVal)
        {
            // console.log(newVal);
            this.json_container = newVal
        }
    }
}
</script>

<style scoped>


</style>