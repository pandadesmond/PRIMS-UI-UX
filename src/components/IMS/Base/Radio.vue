<template>
  <Radio :disable="disable" :class= "[options.length > 1 ? 'half_width' : '']" :options="options"/>
</template>

<script>
import Radio from 'src/components/Base/Radio';

export default {
  props: ["options","disable"],
  components: {
    Radio
  }
}
</script>

<style scoped>

</style>
