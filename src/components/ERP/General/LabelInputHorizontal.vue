<template>
    <!-- <div class="component_div"> -->
        <div class="row" v-if="long_label">
            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                <Label class="custom_label" :text="text" />
            </div>
            <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                <Input :no_label="no_label" :readonly="readonly ? true : false" v-on:change="handleChange" v-model="bind_value"
                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior : oridbComponentBehavior.text" />
            </div>
        </div>

        <div class="row" v-if="longer_label">
            <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5 col-xl-5">
                <Label class="custom_label" :text="text" />
            </div>
            <div class="col-xs-12 col-sm-12 col-md-7 col-lg-7 col-xl-7">
                <Input :no_label="no_label" :readonly="readonly ? true : false" v-on:change="handleChange" v-model="bind_value"
                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior : oridbComponentBehavior.text" />
            </div>
        </div>


        <div class="row" v-if="!long_label && !longer_label">
            <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
                <Label class="custom_label" :text="text" />
            </div>
            <div class="col-xs-12 col-sm-12 col-md-9 col-lg-9 col-xl-9">
                <Input :no_label="no_label" :readonly="readonly ? true : false" v-on:change="handleChange" v-model="bind_value"
                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior : oridbComponentBehavior.text" />
            </div>
        </div>
    <!-- </div> -->
</template>

<script>
import Label from 'src/components/ERP/Base/Label';
import Input from 'src/components/ERP/Base/Input';

import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
    name:"LabelInputHorizontal",
    data() {
        return {
            bind_value: this.pass_value
        };
    },
    props: ['text','pass_value','dbComponentBehavior','no_label','readonly','long_label','longer_label'],
    computed:{
        // ...mapGetters("tta"),
        oridbComponentBehavior() {
            return this.$store.getters['dbComponentBehavior/byLanguage']('erp')
        },
    },
    components: {
        Input,
        Label
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
    height: 34.62px;
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

</style>
