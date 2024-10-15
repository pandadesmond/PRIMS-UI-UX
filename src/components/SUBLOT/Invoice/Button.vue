<template>
    <q-btn :type="type" @click="handleChange">
        {{text}}
    </q-btn>
</template>

<script>
export default {
    props: ["text", "type"],
    methods:{
        handleChange: function()
        {
            this.$emit('receiveChange');
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
