<template>
    <q-select v-if="!no_label"
    class="q-pr-sm q-pt-sm"
    bg-color="white"
    dense
    options-dense
    :filled="filled"
    outlined
    emit-value
    map-options
    :value="value"
    :options="options"
    :label="componentBehavior.label"
    @update:model-value  ="handleChange"
    filter
    filter-placeholder="select"
    :for="id"
    :name="name"
    
    square
    :rules="componentBehavior.rules"
    @popup-show="handleClick"
    :disable="loading"
    >
    </q-select>

    <q-select v-else
    class="q-pr-sm q-pt-sm"
    color="black"
    bg-color="white"
    dense
    options-dense
    
    outlined
    emit-value
    map-options
    :value="value"
    :options="options"
    @update:model-value  ="handleChange"
    filter
    filter-placeholder="select"
    :for="id"
    :name="name"
    
    square
    :rules="componentBehavior.rules"
    @popup-show="handleClick"
    :disable="loading"
    >
    </q-select>

</template>

<script>
  import { QSelect } from 'quasar'

  export default {
    props: ['value', 'options', 'label', 'id', 'name','componentBehavior','no_label','loading'],
    methods: {
      handleChange (newVal) {
        this.$emit('receiveChange', newVal)
      },
      handleClick (newVal) {
        this.$emit('receiveClick', newVal)
      }
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
