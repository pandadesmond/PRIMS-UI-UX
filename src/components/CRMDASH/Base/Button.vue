<template>
 <q-btn :type="type" @click="handleChange" class="" style="background-color:#362e4b;">
  {{text}}
 </q-btn>
</template>

<script>
export default {
 props: ["text", "forceLoading", "forceLoading2", "forceLoading3", "forceLoading4", "forceLoading5", "forceLoading6", "type"],
 methods:{
  handleChange: function(){
   this.$emit('receiveChange');    
  }
 },
 watch:{
  forceLoading(newVal){
   if(newVal){
    this.loading = true;
   }
  },
  forceLoading2(newVal){
   if(newVal){
    this.loading = true;
    this.$emit('edit_forceLoading2'); // change false then return back to true
  }
 },
 forceLoading3(newVal){
  if(newVal){
   this.loading = true; 
   this.$emit('edit_forceLoading3'); // change false then return back to true
  }
 },
 forceLoading4(newVal){
  if(newVal){
   this.loading = true;
   this.$emit('edit_forceLoading4'); // change false then return back to true
  }
 },
forceLoading5(newVal){
 if(newVal){
  this.loading = true;
  this.$emit('edit_forceLoading5'); // change false then return back to true
 }
},
forceLoading6(newVal){
 if(newVal){
  this.loading = true;
  this.$emit('edit_forceLoading6'); // change false then return back to true
 }
},
}
}
</script>

<style scoped>
.q-btn
{
 border-radius: 0px;
}

</style>