<template>

  <q-card class="bg-transparent no-shadow no-border">
    <q-card-section class="q-pa-none">
          <q-item :style="`background-color: ${json_container.color}`" class="q-pa-none">
            <q-item-section  v-if="json_container.icon_position == 'left'" :style="`background-color: ${json_container.color}`"
            class=" q-pa-lg q-mr-none text-white">
              <q-icon :name="json_container.icon_position" color="white" size="24px"></q-icon>
            </q-item-section>
            <q-item-section class=" q-pa-md q-ml-none  text-white">
              <q-item-label>{{json_container.title}}</q-item-label>
              <q-item-label class="text-white text-h6 text-weight-bolder">{{json_container.value}}</q-item-label>
              <q-item-label class="text-white text-h6 text-weight-bolder">{{json_container.value2}}</q-item-label>
            </q-item-section>
            <q-item-section v-if="json_container.icon_position == 'right'" side class="q-mr-md text-white">
              <q-icon :name="json_container.icon" color="white" size="44px"></q-icon>
            </q-item-section>
          </q-item>
    </q-card-section>
    <Loading :loading="loading" />
  </q-card>
</template>

<script>
import {defineComponent} from 'vue'
import Loading from 'src/components/Base/Loading';

export default {
  data(){
    return{
      json_container: this.json,
      loading: true
    }
  },
  name: "CardSocial",
  props: ['json', "forceLoading"],
  components:{
    Loading
  },
  watch:{
    json(newVal){
      this.json_container = newVal;
      this.loading = false
    },
    forceLoading(newVal)
    {
      if(newVal)
      {
        this.loading = true;
      }
      
    }
  }
}
</script>

<style scoped>

@media all and (max-width: 1023px) {

    .q-item__section
    {
        padding-bottom: 16px;
        padding-left: 10px;
    }
}
</style>
