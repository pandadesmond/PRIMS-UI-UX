<template>
    <!-- <div class="row"> -->
        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 multiselect">
            <div class="component_div" v-if="json">
                <Label class="custom_label" :text="json.label" />
                <Multiselect :readonly="json_container.readonly ? true : false" v-on:receiveChange="handleChange" v-model="json_container.prefix1.value" :options="json.prefix1.options" 
                :dbComponentBehavior="dbComponentBehavior[json.prefix1Behaviour] ? dbComponentBehavior[json.prefix1Behaviour] : dbComponentBehavior.select"/>
            </div>
        </div>
    <!-- </div> -->
</template>

<script>
// import { mapState, mapMutations, mapGetters } from 'vuex'
import Label from 'src/components/RIMS/Base/Label';
import Multiselect from 'src/components/RIMS/Base/Multiselect';

import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
    name: "Label_select",
    data() {
        return {
            json_container: this.json,
        };
    },
    props: ['json'],
    components: {
        Label,
        Multiselect
    },
    computed:{
        // ...mapGetters("tta"),
        dbComponentBehavior() {
            return this.$store.getters['dbComponentBehavior/byLanguage']('tta')
        },
    },
    methods:{
        handleChange: function(newVal){
            // var temp_json = [];

            if(this.json.field == 'banner')
            {
                this.$emit('receiveChangeBanner',newVal)
            }

            this.json_container.prefix1.value = newVal;
            // temp_json.push({"tab":"supplier_profile","seq":"2","value":this.json_container});
            // this.$emit('receiveChange',temp_json)
            this.$emit('receiveChangeTrigger')
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
.container_to
{
    margin-top: 27px;
}

.to_label
{
    font-weight: bold;
}

/*make radio button margin-top range*/
.q-option-group
{
    margin-top: 27px;
}


/* make scroll overflow overflow */
.multiselect >>> .q-field__control
{
    max-height: 70px;
    overflow: auto;
    border-radius: 0px;
}

/*make select dropdown bottom line blue color*/
* >>> .q-field--filled .q-field__control:after
{
    color: white !important;
}


/*make select dropdown bottom line grey color hover*/
* >>> .q-field--filled .q-field__control:before {
    border-bottom: none;
}

@media only screen and (max-width: 1023px) {
    
    .q-field {
        padding-bottom: 0px;
    }

    .q-option-group {
        margin-top: 0px;
    }

    .container_to
    {
        margin-top: 0px;
    }

    .component_div.custom
    {
        padding-top:8px !important;
    }
}

</style>