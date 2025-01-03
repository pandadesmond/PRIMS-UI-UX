<template>
    <div class="row" style="align-items: center;">
        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12">
            <Label :pass_value="label"/>
        </div>
        <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-xs-12">
            <Editor v-model:pass_value="value" :readonly="readonly" :spellcheck="spellcheck"
                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior : componentBehavior.textarea"
                @receiveChange="handleChange"/>
        </div>
    </div>
</template>

<script>
import Label from 'src/components/PRIMS/Main/Label'
import Editor from 'src/components/PRIMS/Main/Editor'

export default {
    props:['label', 'dbComponentBehavior', 'pass_value', 'readonly',' spellcheck'],
    data(){
        return {
            value: this.pass_value
        }
    },
    components: {
        Label,
        Editor,
    },
    computed: {
        componentBehavior() {
            return this.$store.getters['dbComponentBehavior/byLanguage']('tta')
        },
    },
    methods:{
        handleClick()
        {
          this.$emit('receiveClick');
        },
        handleChange: function(newVal){
            this.$emit('update:pass_value', newVal)
            this.$emit('receiveChange', newVal);
        }
    },
    watch: {
        pass_value(newVal){
            this.value = newVal;
        },
    },
}
</script>

<style scoped>
* >>> .q-field--error
{
    padding-bottom: 5px;
}
</style>
