<template>
  <div class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center" v-if="show">
    <div>
      <div style="font-size: 30vh">
        404
      </div>

      <div class="text-h2" style="opacity:.4">
        Oops. Nothing here...
      </div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/rda/login"
        label="Go Home"
        no-caps
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  data()
  {
    return{
      show: false,
    }
  },
  name: 'Error404',
  mounted(){
    this.show = true;
    // alert(this.$route.query.page);
    // if(sessionStorage.getItem('authenticated') == "1")
    // {
    //   this.show = true;
    // }
    // else
    // {
    //   this.show = false;
    //   this.$store.dispatch('login/logout').then(() => {
    //       this.$router.push('/honda/login')
    //   });
    //   //checking for redirect if people comein without login redirect login else show 404
    // }
  }
})
</script>
