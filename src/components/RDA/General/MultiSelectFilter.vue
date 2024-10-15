<template>
    <!-- <div class="component_div"> -->
        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 multiselect">
                <Multiselect :placeholder="dbComponentBehavior.label" :no_label="no_label" :readonly="readonly ? true : false" v-on:receiveChange="handleChange" v-model="bind_value"
                :options="options" :pass_value="bind_value"
                :componentBehavior="dbComponentBehavior ? dbComponentBehavior : oridbComponentBehavior.select" />
                <!-- {{dbComponentBehavior}} -->
            </div>
        </div>
    <!-- </div> -->
</template>

<script>
import Multiselect from 'src/components/RDA/Base/MultiselectNew';

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

/* For dropdown padding removal */
.q-field
{
    padding-top:0px;
    padding-left:0px;
    padding-right:0px;
    padding-bottom:0px;
    /* width: auto !important; */
}

.q-field--error
{
    padding-bottom:20px;
}

/* For text input border colour */
* >>> .q-field__inner
{
    border: 1px solid #d2d6de;
}

/* when hover on text input */
.q-field--filled >>> .q-field__control:before {
    background: transparent;
    /* border-bottom: 1px solid rgba(0, 0, 0, 0.42);
    opacity: 0;
    transition: opacity 0.36s cubic-bezier(0.4, 0, 0.2, 1), background 0.36s cubic-bezier(0.4, 0, 0.2, 1); */
}

* >>> .q-field__control
{
    background-color: transparent;
    /* overflow: hidden; */
}

/* hide error message when no error validation*/
.q-field >>> .q-field__bottom
{
    display: none;
}

.q-field--error >>> .q-field__bottom
{
    display: block;
}

* >>> .q-field__bottom {
    padding: 3px 0px 0;
}

/* * >>> .q-field__control-container
{
    padding-top: 0px !important;
} */

/* readonly field*/
.q-field--filled.q-field--readonly >>> .q-field__control:before {
    opacity: 1;
    background: #ccc;
    border-bottom-style: none;
    height: 100%;
    border-radius: 0px;
}

/* readonly field*/
.q-field--filled.q-field--readonly >>> .q-field__control {
    opacity: 1;
    background: #ccc;
    border-bottom-style: none;
    height: 100%;
    border-radius: 0px;
}

/*make select dropdown bottom line blue color*/
* >>> .q-field--filled .q-field__control:after
{
    color: transparent !important;
}

/* * >>> .q-field__native,
* >>> .q-field__control-container,
* >>> .q-field__control,
* >>> .q-field__inner,
* >>> .q-field__append
{
    max-height: 32px !important;
    min-height: 32px !important;
} */

</style>