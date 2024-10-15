<template>
    <q-select
    dense
    options-dense
    filled 
    emit-value 
    map-options
    :value="value"
    :options="optionsyear"
    :loading="loading"
    @update:model-value  ="handleChange" 
    @virtual-scroll="onScroll"
    :label="componentBehavior.label"
    :rules="componentBehavior.rules"
    square
    />
    
</template>

<script>
  import { ref, computed, nextTick } from 'vue'
  import { QSelect } from 'quasar'

const allOptions = []
for (let i = 2003; i <= 3003; i++) {
  allOptions.push(i)
}

const pageSize = 30
const lastPage = Math.ceil(allOptions.length / pageSize)
const loading = ref(false)
const nextPage = ref(2)
const optionsyear = computed(() => allOptions.slice(0, pageSize * (nextPage.value - 1)))

  export default {
    data() {
      return {
        loading,
        nextPage,
        optionsyear: this.optionsyear_pass ? this.optionsyear_pass : optionsyear,
      }
    },
    props: ['value', 'options', 'label', 'id', 'name','componentBehavior','optionsyear_pass'],
    methods: {
      handleChange (newVal) {
        this.$emit('receiveChange', newVal)
      },
      onScroll ({ to, ref }) {
            const lastIndex = optionsyear.value.length - 1

            if (loading.value !== true && nextPage.value < lastPage && to === lastIndex) {
            loading.value = true

            setTimeout(() => {
                nextPage.value++
                nextTick(() => {
                ref.refresh()
                loading.value = false
                })
            }, 500)
            }
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
