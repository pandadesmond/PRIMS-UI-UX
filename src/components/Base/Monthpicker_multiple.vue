<template>
    <q-select
    dense
    options-dense
    filled 
    emit-value 
    map-options
    multiple
    :value="value"
    :options="optionsmonth"
    :loading="loading"
    style="width: 250px"
    :label="componentBehavior.label"
    :rules="componentBehavior.rules"
    use-chips
    square
    />
    
</template>

<script>
  import { QSelect } from 'quasar'

  export default {
    data() {
      return {
        optionsmonth: ['January','February','March','April','May','June','July','August','September','October','November','December'],
      }
    },
    props: ['value', 'options','componentBehavior'],
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
