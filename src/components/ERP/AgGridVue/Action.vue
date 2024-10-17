<template>
  <q-btn @click="handleClick" no-caps unelevated square dense push label="Additional" />
</template>

<script>
export default {
  data(){
    return{
    }
  },
  // beforeMount() {
  //   this.bind_params = this.params;
  // },
  methods:{
    handleClick()
    {
      alert();
      // this.$emit('receiveClick');
      // this.params.onClick(params);
      // this.params.action()
      // console.log(this.bind_params);
      this.params.action(this.params);
    }
  }
}
</script>

<style>

</style>