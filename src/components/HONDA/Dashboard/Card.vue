<template>

  <q-card class="bg-transparent no-shadow no-border" :style="'color:'+json_container.fontcolor+'!important;'">
    <q-card-section class="q-pa-none">
          <q-item :style="`background-color: ${json_container.color};border-radius: 20px;`" class="q-pa-none">
            <!-- <q-item-section  v-if="json_container.icon_position == 'left'" :style="`background-color: ${json_container.color}`"
            class=" q-pa-lg q-mr-none text-white">
              <q-icon :name="json_container.icon_position" :color="json_container.fontcolor" size="24px"></q-icon>
            </q-item-section> -->
            <q-item-section class=" text-white" :style="'color:'+json_container.fontcolor+'!important;'">
              <q-item-label class="custom_title custom_title_first">{{json_container.title}}</q-item-label>
              <q-item-label class="text-white text-h6 text-weight-bolder custom_title" :style="'color:'+json_container.fontcolor+'!important;'">{{json_container.value}}</q-item-label>
              <q-item-label class="text-white text-h6 text-weight-bolder custom_value" :style="'color:'+json_container.fontcolor+'!important;'">{{json_container.value2}}</q-item-label>
              <br>
            </q-item-section>
            <!-- <q-item-section v-if="json_container.icon_position == 'right'" side class="q-mr-md text-white" :style="'color:'+json_container.fontcolor+'!important;'">
              <q-icon :name="json_container.icon" :color="json_container.fontcolor" size="44px"></q-icon>
            </q-item-section> -->
            <div class="absolute-bottom text-subtitle2 text-center" 
            style="border-bottom-left-radius: 20px;border-bottom-right-radius: 20px;cursor:pointer;"
            @click="handleClickMoreInfo">
              More Info
            </div>
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
  name: "Card",
  props: ['json', "forceLoading"],
  components:{
    Loading
  },
  methods:{
    handleClickMoreInfo()
    {
      this.$emit('receiveMoreInfoClick');
    }
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

.absolute-bottom
{
  background-color: rgb(0 0 0 / 40%);
}

.custom_title_first
{
  margin-top: 10px;
}

.custom_title
{
  font-weight: bold;
  font-size: 20px;
  text-align: center;
}

.custom_value
{
  font-weight: bold;
  font-size: 30px;
  text-align: center;
  margin-bottom: 10px;
}
</style>
