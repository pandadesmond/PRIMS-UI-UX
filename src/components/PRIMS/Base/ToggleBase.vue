<template>
    <q-toggle
      :readonly="readonly"
      @update:model-value="handleChange"
      v-model="val"
      :dense="dense"
    />
</template>

<script>
export default {
    data(){
        return {
            val: this.value == 1 ? true : false,
        }
    },
    props: ["value", "readonly", "dense"],
    methods: {
        handleChange(newVal) {
            this.$emit('receiveChange', newVal ? 1 : 0);  
        },
    },
    watch: {
        value(newVal) {
            this.val = newVal == 1 ? true : false;
        }
    }
}
</script>

<style>
</style>