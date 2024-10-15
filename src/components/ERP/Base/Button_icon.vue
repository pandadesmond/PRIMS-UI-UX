<template>
    <q-btn :class="small_round ? 'small_round' : big_round ? 'big_round' : 'square'"
    @click="handleChange" no-caps :icon="icon" :flat="flat" :disabled="readonly"
    :style="[color != '' ? 'background-color:' +color+';' : '', size != '' ? 'font-size:'+size+';':'', font_color != '' ? 'color:'+font_color+' !important;' : '', border_radius != '' ? 'border-radius:' + border_radius +';' : ''] "
    :color="color" dense :outline="outline" ripple @keyup="handleKeyUp">
        <span v-if="text">{{text}}</span>
        <q-tooltip v-if="tooltip_message" anchor="top middle" self="bottom middle">
          <strong>
            {{tooltip_message}}
          </strong>
        </q-tooltip>
    </q-btn>
</template>

<script>
export default {
    props: ['icon','color','tooltip_message','text','outline','font_color', 'flat','readonly','border_radius','big_round','small_round'],
    methods:{
        handleChange: function()
        {
            this.$emit('receiveClick');
        }
    }
}
</script>

<style scoped>
.big_round
{
  border-radius: 10px;
}
.small_round
{
  border-radius: 5px;
}
.square
{
  border-radius: 0px;
}

</style>
