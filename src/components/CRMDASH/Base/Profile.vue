<template>
 <q-btn-dropdown :unelevated="true" :content-class="'profile_class'">
  <template v-slot:label>
   <div class="row items-center no-wrap">
    <q-avatar size="30px">
     <img src="https://cdn.quasar.dev/img/boy-avatar.png">
    </q-avatar>
   </div>
  </template>

  <div>
   <div class="row" style="background-color:#362e4b;padding-top: 20px;padding-bottom:20px;padding-left:15px;padding-right:15px;">
    <div class="column items-center">
     <q-avatar size="72px">
      <img src="https://cdn.quasar.dev/img/boy-avatar.png">
     </q-avatar>
    </div>

    <div class="column" style="padding-left:10px;">
     <label style="font-size:15px;color:white;padding-top:10px;">{{user_email}}</label>
     <label style="font-size:15px;color:white;">User ID : {{user_id}}</label>
    </div>
  </div>

  <hr style="background-color:white;margin:0px;">
   <div class="row" style="background-color:#362e4b;">
    <div class="col-7">
     <q-btn color="white" text-color="white" label="Change Password" icon="lock" style="float:left;font-size:12px;padding: 10px 5px 10px 5px;"/>
    </div>
    <div class="col-5" style="text-align:center;">
     <q-btn color="white" text-color="white" label="Logout" icon="logout" @click="logout()" style="font-size:12px;padding: 10px 5px 10px 5px;" />
    </div>
   </div>
  </div>

 </q-btn-dropdown>
</template>

<script>
import {ref} from 'vue'

export default {
 data(){
  return{
   mobileData: ref(false),
   bluetooth: ref(false),
   user_id: sessionStorage.getItem('user_id'),
   user_name: sessionStorage.getItem('user_name'),
   user_email: sessionStorage.getItem('user_email'),
  }
 },
methods: {
 logout(){
  this.$store.dispatch('login/logout').then(() => {
  this.$router.push('/crmdash/login')
  });
 }
 }
}
</script>

<style>
.q-menu {
 border-radius: 0px;
}
</style>

<style scoped>
*>>>.q-btn {
 background-color:#362e4b !important;
 border-radius: 0px;
}
</style>
