<template>
    <q-chip clickable @click="onClick" color="primary" text-color="white" :icon="icon">
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
