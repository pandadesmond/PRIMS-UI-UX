<template>
    <q-input v-if="!no_label"
        :maxlength="componentBehavior.maxlength"
        :type="type ? type : componentBehavior.type"
        v-model="val"
        :prefix="componentBehavior.prefix"
        :label="pass_label ? pass_label : componentBehavior.label"
        :placeholder="pass_label ? pass_label : componentBehavior.label"
        :rules="componentBehavior.rules"
        :reverse-fill-mask="componentBehavior.reverse_fill_mask"
        :mask="componentBehavior.mask"
        :fill-mask="componentBehavior.fill_mask"
        :hint="componentBehavior.hint"
        :disable="readonly"
        :readonly="readonly"
        @change="handleChange"
        :input-class="componentBehavior.input_class"
    />

    <q-input v-else
        color="black"
        bg-color="white"
        :maxlength="componentBehavior.maxlength"
        :type="type ? type : componentBehavior.type"
        v-model="val"
        :prefix="componentBehavior.prefix"
        :placeholder="pass_label ? pass_label : componentBehavior.label"
        :rules="componentBehavior.rules"
        :reverse-fill-mask="componentBehavior.reverse_fill_mask"
        :mask="componentBehavior.mask"
        :fill-mask="componentBehavior.fill_mask"
        :hint="componentBehavior.hint"
        :disable="readonly"
        :readonly="readonly"
        @change="handleChange"
        :input-class="componentBehavior.input_class"
        outlined
    />


</template>

<script>
export default {
    data(){
        return{
            val: this.value,
        }
    },
    props: ['value', 'componentBehavior','type','no_label','pass_label','readonly'],
   methods:{
        handleChange(newVal) {
            this.$emit('update:value', newVal)
            this.$emit('receiveChange', newVal)
        },
    },
    watch:{
        value(newVal)
        {
            this.val = newVal;
        }
    }
}
</script>
