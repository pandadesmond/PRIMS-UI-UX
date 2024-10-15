<template>
  <label @click="handleClick">
      {{text}}
  </label>
</template>

<script>
export default {
    props: ['text'],
    methods:{
      handleClick(){
        this.$emit('receiveClick');
      }
    }
}
</script>

<style>

</style>
