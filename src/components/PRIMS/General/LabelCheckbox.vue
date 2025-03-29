<template>
    <div class="row" style="align-items: center;">
        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12">
            <Label :pass_value="label"/>
            <q-icon v-if="showIcon" class="q-ml-sm" :name="showIcon" size="15px" @click="handleClickIcon">
                <q-tooltip anchor="center right" self="center left" :offset="[10, 10]" max-width="250px">{{iconTooltip}}</q-tooltip>
            </q-icon>
        </div>
        <div class="col-xl-1 col-lg-1 col-md-1 col-sm-12 col-xs-12">
            <Checkbox  v-model:value="bind_value" :readonly="readonly" :disable="readonly" class="text-bold" @receiveChangenewVal="handleChange"/>
        </div>
    </div>
</template>

<script>
import Label from 'src/components/PRIMS/Main/Label'
import Checkbox from 'src/components/PRIMS/Base/Checkbox'

export default {
    props:['pass_value','label','readonly','showIcon','iconTooltip'],
    components: {
        Label,
        Checkbox,
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