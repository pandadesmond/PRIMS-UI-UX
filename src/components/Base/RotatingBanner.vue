<template>

  <q-carousel
    animated
    v-model="slide"
    navigation
    infinite
    :autoplay="autoplay"
    arrows
    swipeable
    transition-prev="slide-right"
    transition-next="slide-left"
    height="500px"
  >

    <q-carousel-slide
      :name="banner.image_apps"
      v-for="(banner) in banners"
      v-bind:key="banner.image_apps"
    >
      <q-img :src="banner.image_apps" />
    </q-carousel-slide>
  </q-carousel>
</template>

<script>
export default {
  created () {
    //this.rotatingBanner()
  },
  mounted () {
    this.rotatingBanner()
  },
  methods: {
    rotatingBanner() {
      this.$api
        .get('/restful_member/index.php/Api/slideshow_new', {
          params: {
            type: 'HOMEPAGE',
            template: 4
          },
          headers: {
            // "app_language": "EN",
            "X-API-KEY": "8EF1DEFC5C3111E9BA36DED0BD1483FD"
          }
        })
        .then((response) => {
          // this.data.value = response.data;
          this.banners = response.data.slideshow
          //console.log('test')
          console.log(this.banners)

        })
        .catch((e) => {
          this.showNotify('negative', JSON.stringify(e))
        })
    }
  },
  data() {
    return {
      slide: 1,
      autoplay: true,
      slide_category: 1,
      stars: 2,
      key: '565042263ED211EC93C0000D3AC7BF11',
      banners: [],
      categories: [],
      latestProducts: [],
      categoriesGroups: [],
      apiHeader: {
        "app_language": "EN",
        "X-API-KEY": "8EF1DEFC5C3111E9BA36DED0BD1483FD"
      }
    }
  },

}
</script>
