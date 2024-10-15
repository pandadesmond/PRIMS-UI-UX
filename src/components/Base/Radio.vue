<template>
     <!-- <div class="q-pa-lg"> -->
        <q-option-group
          :options="options"
          color="primary"
          inline
          @update:model-value="handleChange"
          :disable="disable ? true : false"
        />
      <!-- </div> -->
</template>

<script>
// import { QRadio } from 'quasar'

  export default {
    props: ['value', 'options', 'label', 'disable'],
    methods: {
      handleChange (newVal) {
        this.$emit('receiveChange', newVal)
      }
    },
    components: {
      // QRadio
    }
  }
</script>
