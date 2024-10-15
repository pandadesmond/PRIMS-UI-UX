<template>
    <q-select
    dense
    options-dense
    filled 
    emit-value 
    map-options
    :value="value"
    :options="optionsmonth"
    :loading="loading"
    :rules="componentBehavior.rules"
    square
    />
    
</template>

<script>
  import { QSelect } from 'quasar'

  export default {
    data() {
      return {
        optionsmonth: ['January','February','March','April','May','June','July','August','September','October','November','December']
      }
    },
    props: ['value', 'options', 'label', 'id', 'name','componentBehavior'],
    methods: {
      handleChange (newVal) {
        this.$emit('receiveChange', newVal)
      },
    },
    components: {
      QSelect
    },
    mounted() {
    }
  }
</script>

<style scoped>
/* * >>> .q-icon:before
{
  font-size: 15px;
}

* >>> .rotate-180 {
    transform: rotate(0deg);
} */
</style>
