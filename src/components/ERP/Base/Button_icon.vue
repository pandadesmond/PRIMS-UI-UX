<template>
    <q-btn :class="small_round ? 'small_round' : big_round ? 'big_round' : 'square'"
    @click="handleChange" no-caps :icon="icon" :flat="flat" :disabled="readonly"
    :style="[buttonStyle, color != '' ? 'background-color:' +color+';' : '', size != '' ? 'font-size:'+size+';':'', font_color != '' ? 'color:'+font_color+' !important;' : '', border_radius != '' ? 'border-radius:' + border_radius +';' : '',] "
    :color="color" dense :outline="outline" ripple @keyup="handleKeyUp" 
    :padding="padding">
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
    },
computed: {
    buttonStyle() {
      return {
        backgroundColor: this.color,
        // '--hover-background': this.icon === 'add' ? 'linear-gradient(0deg, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.15) 100%), #1E90FF' : this.color
        '--hover-background': this.hoverColor || this.color
      };
    }
  },
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
  /* border-radius: 0px; */
}
.q-btn {
  transition: background-color 0.3s;
}

.q-btn:hover {
  background: var(--hover-background);
}
</style>
