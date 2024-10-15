<template>
    <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
            <div class="component_div" v-if="json">
                <Label class="custom_label" :text="json.label" />
            </div>
        </div>

        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
            <div class="component_div">
                    <Radio :disable="json_container.readonly ? true : false" v-model="radio1Value" :options="json.radio1.options" />
            </div>
        </div>

    </div>
    
</template>

<script>
import Label from 'src/components/RIMS/Base/Label';
import Radio from 'src/components/RIMS/Base/Radio';

// import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
    name: "Label_radio",
    data() {
        return {
            radio1Value: this.json.radio1.value
        };
    },
    props: ['json'],
    components: {
        Label,
        Radio
    },
    computed:{
        // ...mapGetters("tta"),
        // dbComponentBehavior() {
        //     return this.$store.getters['dbComponentBehavior/byLanguage']('tta')
        // },
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
/* @media only screen and (min-width: 1439px) {
    .q-option-group {
        margin-top: 27px;
        background-color: red;
    }
} */

/* .q-option-group {
    margin-top: 27px;
} */

.custom_label
{
    min-height: 32px;
    padding-top: 6px;
    margin-top: 5px;
}

/* for small then md size*/
@media only screen and (max-width: 1023px) {

    .q-field {
        padding-bottom: 0px;
    }

    .q-option-group {
        margin-top: 0px;
    }
}

</style>