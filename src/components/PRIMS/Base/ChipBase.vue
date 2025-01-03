<template>
    <q-chip clickable @click="onClick" :color="color" :square="square" :text-color="text-color" :icon="icon" outline>
        {{text}}
    </q-chip>
</template>

<script>
export default {
    name: "Chip",
    props: ["text","icon"],
    data(){
        return{
        }
    },
    methods: {
        onClick: function(newVal)
        {
            this.$emit('receiveClick', newVal)
        }
    }
}
</script>
