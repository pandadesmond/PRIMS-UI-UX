<template>
    <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4" style="display:flex">
            <div>
                <Button_icon class="component_edit_button" v-if="edit_design" icon="edit_note" color="primary" v-on:receiveEditClick="receiveEditClick" />
                <Button_icon class="component_edit_button" v-if="edit_design" icon="tune" color="positive" v-on:receiveEditClick="receiveEditAccountCode" :tooltip_message="tooltip_message" />
            </div>
            <div class="component_div" v-if="json">
                <Label class="custom_label" :text="json.label" />
                <Select :no_label="true" :readonly="json_container.readonly ? true : false" v-on:receiveChange="handleChange" v-model="json_container.prefix1.value" :options="json.prefix1.options" 
                :componentBehavior="dbComponentBehavior[json.prefix1Behaviour] ? dbComponentBehavior[json.prefix1Behaviour] : dbComponentBehavior.select"/>
            </div>
        </div>
    </div>
</template>

<script>
// import { mapState, mapMutations, mapGetters } from 'vuex'
import Label from 'src/components/RIMS/Base/Label';
import Select from 'src/components/RIMS/Base/Select';
import Button_icon from 'src/components/Base/Button_icon';

import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
    name: "Label_select_row",
    data() {
        return {
            json_container: this.json,
        };
    },
    props: ['json', 'edit_design', 'tooltip_message'],
    components: {
        Label,
        Select,
        Button_icon
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

            if(this.json.field == 'supplier_name')
            {
                this.$emit('receiveChangeSupplier',newVal)
            }
            if(this.json.field == 'trading_group')
            {
                this.$emit('receiveChangeTradingGroup',newVal)
            }

            this.json_container.prefix1.value = newVal;
            // temp_json.push({"tab":"supplier_profile","seq":"2","value":this.json_container});
            this.$emit('receiveChangeTrigger')
        },
        receiveEditClick: function(){
            this.$emit('receiveEditClick')
        },
        receiveEditAccountCode: function(){
            this.$emit('receiveEditAccountCode')
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