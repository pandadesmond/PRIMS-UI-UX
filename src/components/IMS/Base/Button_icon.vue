<template>
    <q-btn @click="handleChange" no-caps :icon="icon" :flat="flat" :disabled="readonly"
    :style="[color != '' ? 'background-color:' +color+';' : '', size != '' ? 'font-size:'+size+';':'', font_color != '' ? 'color:'+font_color+' !important;' : ''] "
    :color="color" dense :outline="outline" ripple>
        <span v-if="text">{{text}}</span>
        <q-tooltip v-if="tooltip_message">
            {{tooltip_message}}
        </q-tooltip>
    </q-btn>
</template>

<script>
export default {
    props: ['icon','color','tooltip_message','text','outline','font_color', 'flat','readonly'],
    methods:{
        handleChange: function()
        {
            this.$emit('receiveClick');
        }
    }
}
</script>

<style scoped>
.q-btn
{
    border-radius: 0px;
}

</style>
