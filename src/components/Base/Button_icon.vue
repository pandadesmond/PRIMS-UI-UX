<template>
    <q-btn @click="handleChange" :icon="icon" :color="color" dense outline ripple>
        <q-tooltip v-if="tooltip_message">
            {{tooltip_message}}
        </q-tooltip>
    </q-btn>
</template>

<script>
export default {
    props: ['icon','color','tooltip_message'],
    methods:{
        handleChange: function()
        {
            this.$emit('receiveEditClick');
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