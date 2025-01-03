<template>
    <q-btn @click="handleClick" :no-caps="pass_no_caps" :square="pass_square" :dense="pass_dense" :icon="pass_icon" :flat="pass_flat" :tooltip="tooltip">
        <div style="display: flex; align-items: center;">
            {{ label_value }}
        </div>
        <q-tooltip v-if="tooltip">
          {{ tooltip_value }}
        </q-tooltip>
    </q-btn>
</template>

<script>
export default {
    data(){
        return{
            label_value: this.pass_label,
            dense: this.pass_dense ? this.pass_dense: false,
            tooltip_value: this.pass_tooltip
        }
    },
    props: ['pass_label', 'pass_no_caps', 'pass_square', 'pass_dense', 'pass_icon', 'pass_flat', 'tooltip', 'pass_tooltip'],
    methods:{
        handleClick()
        {
            this.$emit('receiveClick');
        }
    }
}
</script>

<style>

</style>
