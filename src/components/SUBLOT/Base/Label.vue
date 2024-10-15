<template>
  <label class="custom_label" @click="handleClick">
      {{text}} <span v-if="required" style="color:red; padding-left: 5px;"> *</span>
  </label>
</template>

<script>
export default {
    props: ['text', 'required'],
    methods:{
      handleClick(){
        this.$emit('receiveClick');
      }
    }
}
</script>

<style scoped>
.custom_label
{
    display: block;
    background-color: #DEE1E6;
    /* background-color: transparent; */
    padding-top:3px;
    padding-bottom:3px;
    padding-left:5px;
    font-weight: bold;
}
</style>



<!-- <template>
    <Label class="custom_label" :text="text" />
</template>

<script>
import Label from 'src/components/Base/Label';
export default {
    props: ['text'],
    components: {
        Label
    }
}
</script>

<style scoped>
.custom_label
{
    display: block;
    background-color: #DEE1E6;
    /* background-color: transparent; */
    padding-top:3px;
    padding-bottom:3px;
    padding-left:5px;
    font-weight: bold;
}
</style> -->
