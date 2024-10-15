<template>
    <div class="component_div" v-if="json">
        <Select :readonly="json_container.readonly ? true : false" v-on:receiveChange="handleChangePrefix1" v-model="json_container.prefix1.value" :options="json_container.prefix1.options"
        :componentBehavior="dbComponentBehavior[json_container.prefix1Behaviour] ? dbComponentBehavior[json_container.prefix1Behaviour] : dbComponentBehavior.select"/>

        <!-- <Label class="custom_label" :text="json.label" /> -->
        <!-- <Editor v-model="input1" /> -->

        <div style="padding:10px;" v-html="input1" /> 

    </div>
</template>

<script>
// import Label from 'src/components/RIMS/Base/Label';
// import Editor from 'src/components/Base/Editor';
import Select from 'src/components/RIMS/Base/Select';
import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
    name:"Label_editor",
    data() {
        return {
            json_container: this.json,
            input1: this.$store.getters['tta/cot_list'] ? (this.$store.getters['tta/cot_list'].filter((entry) => {
                return entry.cot_guid === this.json.prefix1.value;
            }).length > 0 ?  this.$store.getters['tta/cot_list'].filter((entry) => {
                return entry.cot_guid === this.json.prefix1.value;
            })[0].cot_value : "") : "",

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
        // Editor,
        // Label,
        Select
    },
    methods: {
        handleChangePrefix1: function(newVal)
        {
            // console.log(this.$store.getters['tta/cot_list']);

            var cot_list = this.$store.getters['tta/cot_list'];

            var input1 = cot_list.filter(function (entry) {
                return entry.cot_guid === newVal;
            });
            
            this.json_container.prefix1.value = newVal;

            this.input1 = input1[0].cot_value;
        }
    },
    watch: {
        json(newVal)
        {
            alert('kk');
            this.json_container = newVal;

            var cot_list = this.$store.getters['tta/cot_list'];

            var input1 = cot_list.filter(function (entry) {
                return entry.cot_guid === newVal.prefix1.value;
            });

            this.input1 = input1[0].cot_value;
        }
    }
}
</script>

<style scoped>


</style>