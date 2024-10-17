<template>
    <q-input v-if="!no_label"
   
        :maxlength="componentBehavior.maxlength"
        :type="type ? type : componentBehavior.type"
        :value="val"
        :prefix="componentBehavior.prefix"
        :label="pass_label ? pass_label : componentBehavior.label"
        :placeholder="pass_label ? pass_label : componentBehavior.label"
        :rules="componentBehavior.rules"
        :reverse-fill-mask="componentBehavior.reverse_fill_mask"
        :mask="componentBehavior.mask"
        :fill-mask="componentBehavior.fill_mask"
        :hint="componentBehavior.hint"
        :disable="componentBehavior.disable"
        :readonly="readonly"
        @change="handleChange"
        :input-class="componentBehavior.input_class"
        outlined
    />

    <q-input v-else
    color="black"
    bg-color="white"
        filled
        :maxlength="componentBehavior.maxlength"
        :type="type ? type : componentBehavior.type"
        :value="val"
        :prefix="componentBehavior.prefix"
        :placeholder="pass_label ? pass_label : componentBehavior.label"
        :rules="componentBehavior.rules"
        :reverse-fill-mask="componentBehavior.reverse_fill_mask"
        :mask="componentBehavior.mask"
        :fill-mask="componentBehavior.fill_mask"
        :hint="componentBehavior.hint"
        :disable="componentBehavior.disable"
        :readonly="readonly"
        @change="handleChange"
        :input-class="componentBehavior.input_class"
    />


</template>

<script>
export default {
    data(){
        return{
            val: this.value,
        }
    },
    props: ['value', 'componentBehavior','type','no_label','pass_label'],
   methods:{
        handleChange(newVal) {
            this.$emit('receiveChange', newVal)
        },
    },
}
</script>
