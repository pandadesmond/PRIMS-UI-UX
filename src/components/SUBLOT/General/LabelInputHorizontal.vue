<template>
    <!-- <div class="component_div"> -->
        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                <Label class="custom_label" :text="text" :required="required"/>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                <!-- <Input :no_label="no_label" :autofocusclick="autofocusclick ?true :false" :readonly="readonly ? true : false" v-on:change="handleChange" v-model="bind_value"
                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior : oridbComponentBehavior.text" :icon_append="icon_append" :rules="rules" :maxlength="maxlength" :placeholder="placeholder"/> -->

                <Input :no_label="no_label" :autofocusclick="autofocusclick ?true :false" :readonly="readonly ? true : false" v-on:change="handleChange" v-model="bind_value"
                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior : oridbComponentBehavior.text" :icon_append="icon_append"/>
            </div>
            <!-- :input-class="align" -->
        </div>
    <!-- </div> -->
</template>

<script>
import Label from 'src/components/SUBLOT/Base/Label';
import Input from 'src/components/SUBLOT/Base/Input';

export default {
    name:"LabelInputHorizontal",
    data() {
        return {
            bind_value: this.pass_value
        };
    },
    props: ['text','required','pass_value','dbComponentBehavior','no_label','autofocusclick','readonly', 'icon_append', 'rules', 'maxlength'],
    computed:{
        oridbComponentBehavior() {
            return this.$store.getters['dbComponentBehavior/byLanguage']('sublot')
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
            this.$emit('receiveChange', newVal)
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
    padding-left: 8px;
}

</style>
