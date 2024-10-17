<template>
    <!-- <div class="component_div"> -->
        <div class="row" v-if="long_label">
            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                <Label class="custom_label" :text="text" />
            </div>

            <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                <SelectFilter
                :readonly="readonly"
                :no_label="no_label"
                :dbComponentBehavior="dbComponentBehavior"
                :options="options"
                v-on:receiveChange="handleChange"
                v-model:pass_value="bind_value"
                />
            </div>
        </div>

        <div class="row" v-if="longer_label">
            <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5 col-xl-5">
                <Label class="custom_label" :text="text" />
            </div>

            <div class="col-xs-12 col-sm-12 col-md-7 col-lg-7 col-xl-7">
                <SelectFilter
                :readonly="readonly"
                :no_label="no_label"
                :dbComponentBehavior="dbComponentBehavior"
                :options="options"
                v-on:receiveChange="handleChange"
                v-model:pass_value="bind_value"
                />
            </div>
        </div>


        <div class="row" v-if="!long_label && !longer_label">
            <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
                <Label class="custom_label" :text="text" />
            </div>

            <div class="col-xs-12 col-sm-12 col-md-9 col-lg-9 col-xl-9">
                <SelectFilter
                :no_padding_top="true"
                :readonly="readonly"
                :no_label="no_label"
                :dbComponentBehavior="dbComponentBehavior"
                :options="options"
                v-on:receiveChange="handleChange"
                v-model:pass_value="bind_value"
                />
            </div>
        </div>
    <!-- </div> -->
</template>

<script>
import Label from 'src/components/ERP/Base/Label';
import SelectFilter from 'src/components/ERP/Base/SelectFilter';

import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
    name:"LabelSelectFilterHorizontal",
    data() {
        return {
            bind_value: this.pass_value
        };
    },
    props: ['text','pass_value','dbComponentBehavior','no_label','readonly','options','long_label','longer_label','no_padding_top'],
    computed:{
        // ...mapGetters("tta"),
        oridbComponentBehavior() {
            return this.$store.getters['dbComponentBehavior/byLanguage']('erp')
        },
    },
    components: {
        SelectFilter,
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
    height: 34px;/*add in  for left 4 col line break over will follow div height*/
}

* >>> .q-field__control
{
    height: 100%;/*when overflow label input will also follow height*/
}

.q-field
{
padding-top:0px;
padding-left:0px;
padding-right:0px;
padding-bottom:0px;
background: white;
}

.q-field--error
{
padding-bottom:20px;
}

/* For text input border colour */
* >>> .q-field__inner
{
/* border: 1px solid #d2d6de; */
}

.q-field--filled >>> .q-field__control {
background: white;
}

.q-field >>> .q-field__native {
  /* max-height: 29px; */
  overflow: auto;
}


/* when hover on text input */
.q-field--filled >>> .q-field__control:before {
background: white;
/* border-bottom: 1px solid rgba(0, 0, 0, 0.42);
opacity: 0;
transition: opacity 0.36s cubic-bezier(0.4, 0, 0.2, 1), background 0.36s cubic-bezier(0.4, 0, 0.2, 1); */
}

/* readonly field
.q-field--readonly >>> .q-field__control:before
{
background: yellow ;
} */

/* readonly field*/
.q-field--filled.q-field--readonly >>> .q-field__control:before {
opacity: 1;
background: #ededed;
border-bottom-style: none;
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

/* disable field*/
.q-field--filled.q-field--disabled >>> .q-field__control:before {
    opacity: 1;
    background: #ededed;
    border-bottom-style: none;
}

</style>
