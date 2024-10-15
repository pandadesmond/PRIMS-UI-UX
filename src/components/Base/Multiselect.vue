<template>

    <!-- <q-select
    class="q-pr-sm q-pt-sm"
    color="black"
    bg-color="white"
    dense
    filled
    emit-value
    map-options
    :value="value"
    :options="options"
    :label="label"
    @update:model-value  ="handleChange"
    filter
    filter-placeholder="select"
    :for="id"
    :name="name"
    dropdown-icon="arrow_drop_down"
    square
    :rules="componentBehavior.rules"
    /> -->

    <!-- <q-select v-if="!no_label"
        dense
        options-dense
        filled
        multiple
        :value="value"
        :options="options"
        :label="componentBehavior.label"
        style="width: 250px"
        option-value="value"
        option-label="label"
        @update:model-value  ="handleChange"
        :rules="componentBehavior.rules"
        emit-value
        map-options
        use-chips
    /> -->

    <!-- <q-select v-else
        dense
        options-dense
        filled
        multiple
        :value="value"
        :options="options"
        style="width: 250px"
        option-value="value"
        option-label="label"
        @update:model-value  ="handleChange"
        :rules="componentBehavior.rules"
        emit-value
        map-options
        use-chips
    /> -->

    <q-select v-if="!no_label"
        dense
        options-dense
        filled
        multiple
        v-model="value"
        :label="componentBehavior.label"
        style="width: 250px"
        option-value="value"
        option-label="label"
        :rules="componentBehavior.rules"
        emit-value
        map-options
        use-chips
        use-input
        input-debounce="0"
        @filter="filterFn"
        @update:model-value  ="handleChange"
        ref="myInput"
        :options="filterOptions"
    />

    <q-select v-else
        dense
        options-dense
        filled
        multiple
        v-model="value"
        style="width: 250px"
        option-value="value"
        option-label="label"
        :rules="componentBehavior.rules"
        emit-value
        map-options
        use-chips
        use-input
        input-debounce="0"
        @filter="filterFn"
        @update:model-value  ="handleChange"
        ref="myInput"
        :options="filterOptions"
    />

    <!-- <q-select
        ref="myInput"
        filled
        v-model="value"
        use-input
        use-chips
        multiple
        input-debounce="0"
        @new-value="createValue"
        :options="filterOptions"
        @filter="filterFn"
        @update:model-value="updateInput"
    /> -->

</template>

<script>
import { QSelect } from 'quasar'
import $ from 'jquery'

export default {
    data()
    {
        return{
            filterOptions: this.options,
            stringOptions: this.options,
        }
    },
    props: ['value', 'options', 'label', 'id', 'name','componentBehavior','no_label'],
    methods: {
        handleChange (newVal) {
            this.$refs.myInput.hidePopup();

            // this.$refs.myInput.updateInputValue('');

            this.$emit('receiveChange', newVal)

            setTimeout(()=>{
                this.$refs.myInput.updateInputValue('');
                this.$refs.myInput.focus();
                this.$refs.myInput.showPopup();
            },100);

            // $('.q-field__input').css('background-color','red');
            // $('.q-field__input').focus();
        },
        updateInput () {
            this.$refs.myInput.updateInputValue('')
            this.$refs.myInput.setInputValue('')
        },
        filterFn (val, update) {

            update(() => {
                // console.log(this.stringOptions);
                if (val === '') {
                    this.filterOptions = this.stringOptions
                }
                else {
                    const needle = val.toString().toLowerCase()
                    console.log(needle)
                    console.log(this.stringOptions.filter(function (entry) {
                            return entry.label.toString().toLowerCase().indexOf(needle) > -1;
                        }));

                    this.filterOptions = this.stringOptions.filter(function (entry) {
                        return entry.label.toString().toLowerCase().indexOf(needle) > -1;
                    });
                    // this.filterOptions = this.stringOptions.filter(
                    //     v => v.toString().toLowerCase().indexOf(needle) > -1
                    // )
                }
            })
        }
    },
    components: {
        QSelect
    },
    mounted() {
    },
    watch: {
        options(newVal){
            this.stringOptions = newVal
        }
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
