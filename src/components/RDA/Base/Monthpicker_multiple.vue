<template>
    <!-- <q-select
    dense
    options-dense
    filled 
    emit-value 
    map-options
    multiple
    :value="bind_value"
    :options="optionsmonth"
    :loading="loading"
    style="width: 250px"
    :label="componentBehavior.label"
    :rules="componentBehavior.rules"
    use-chips
    square
    > -->

    <q-select
      dense
      options-dense
      filled 
      emit-value 
      map-options
      option-value="value"
      option-label="label"
      multiple
      :max-values='max_selection'
      v-model="bind_value"
      :options="optionsmonth"
      :loading="loading"
      style="width: 250px"
      :label="componentBehavior.label"
      :rules="componentBehavior.rules"
      @update:model-value ="handleChange"
      use-chips
      square
      class="multiselect"
    >

    <template #before-options v-if="max_selection > 0 ? false : true ">
      <q-item            
      >
        <q-item-section>
          <q-item-label>Select All</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-checkbox v-model="all" @update:model-value="checkAll"></q-checkbox>
        </q-item-section>
      </q-item>
    </template>

    <template v-slot:option="scope">
      <q-item
        v-bind="scope.itemProps"
        v-on="scope.itemEvents"
        >
        <q-item-section>
          <q-item-label v-html="scope.opt.label"></q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-checkbox v-model="bind_value" @update:model-value ="handleChange" :val="scope.opt.value"></q-checkbox>
        </q-item-section>
      </q-item>
    </template>

    </q-select>
    
</template>

<script>
  import { QSelect } from 'quasar'

  export default {
    data() {
      return {
        all:false,
        bind_value: this.pass_value,
        // optionsmonth: ['January','February','March','April','May','June','July','August','September','October','November','December'],
        optionsmonth: [
          {
            label: 'January',
            value: 'January'
          },
          {
            label: 'February',
            value: 'February'
          },
          {
            label: 'March',
            value: 'March'
          },
          {
            label: 'April',
            value: 'April'
          },
          {
            label: 'May',
            value: 'May'
          },
          {
            label: 'June',
            value: 'June'
          },
          {
            label: 'July',
            value: 'July'
          },
          {
            label: 'August',
            value: 'August'
          },
          {
            label: 'September',
            value: 'September'
          },
          {
            label: 'October',
            value: 'October'
          },
          {
            label: 'November',
            value: 'November'
          },
          {
            label: 'December',
            value: 'December'
          },
        ],
      }
    },
    props: ['value', 'options','componentBehavior','pass_value','max_selection'],
    methods: {
      checkAll (v) {
        
        if (v) {
            this.bind_value = this.optionsmonth.filter(v => v.label !== 'Select All').map(i => i.value)
            this.handleChange()
            return
        }
        this.bind_value = []
      },
      handleChange (newVal) {
        if (this.bind_value.length == this.optionsmonth.length) {
          if(this.all = true){
            var newVal = this.bind_value;
          }
          this.all = true 
        } else {
          this.all = false              
        }
        this.$emit('receiveChange', newVal)
        this.$emit('update:pass_value', newVal)
      },
    },
    components: {
      QSelect
    },
    mounted() {
    },
    watch: {

        pass_value(newVal)
        {
          console.log(this.optionsmonth.length);
          console.log(newVal);
          console.log(newVal.length);
            if(this.optionsmonth.length == newVal.length)
            {
                this.all = true;
            }

            this.bind_value = newVal;
        },
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

/* make scroll overflow overflow */
* >>> .q-field__control
{
    max-height: 70px;
    overflow: auto;
    border-radius: 0px;
}

</style>
