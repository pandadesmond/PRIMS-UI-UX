<template>
    <q-item class="q-pa-none">
        <q-item-section>
            <q-item-label><Label :pass_value="label"/></q-item-label>
            <q-item-label v-if="showIcon" caption style="font-size: 11px;">{{iconTooltip}}</q-item-label>
        </q-item-section>
        <q-item-section avatar>
            <Toggle v-model:value="bind_value" :readonly="readonly" :checkbox="true" color="green" @receiveChangenewVal="handleChange" size="sm"/>
        </q-item-section>
    </q-item>
    <!-- <div class="row" style="align-items: center;">
        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3">
            <Label :pass_value="label"/>
            <br/><span v-if="showIcon" style="font-size: 9px;">{{iconTooltip}}</span>
            <q-icon v-if="showIcon" class="q-ml-sm" :name="showIcon" size="15px" @click="handleClickIcon">
                <q-tooltip anchor="center right" self="center left" :offset="[10, 10]" max-width="250px">{{iconTooltip}}</q-tooltip>
            </q-icon>
        </div>
        <div class="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-xs-1">
            <Toggle v-model:value="bind_value" :readonly="readonly" :checkbox="true" color="green" @receiveChangenewVal="handleChange" size="sm"/>
        </div>

        <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
            <span v-if="showIcon" style="font-size: 9px;">{{iconTooltip}}</span>
        </div>
    </div> -->
</template>

<script>
import Label from 'src/components/PRIMS/Main/Label'
import Toggle from 'src/components/PRIMS/Base/Toggle'

export default {
    props:['pass_value','label','readonly','showIcon','iconTooltip'],
    components: {
        Label,
        Toggle,
    },
    data() {
        return {
            bind_value: this.pass_value,
        }
    },
    methods: {
        handleClickIcon(newVal)
        {
            this.$emit('receiveClickIcon',newVal);
        },
        handleChange(newVal)
        {
            this.$emit('update:pass_value',newVal);
            this.$emit('receiveChange',newVal);
        }
    },
    watch: {
        pass_value(newVal)
        {
            this.bind_value = newVal;
        }
    },
}
</script>

<style scoped>
* >>> .q-field--error
{
    padding-bottom: 5px;
}
</style>