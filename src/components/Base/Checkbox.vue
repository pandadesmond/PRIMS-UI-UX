<template>

    <q-checkbox 

    :readonly="readonly"

    @update:model-value="handleChange" v-model="val" :dense="dense"/>




</template>




<script>

export default {

    data(){

        return{

            val: this.value == 1 ? true : false,

        }

    },

    props:["value","checkchange","readonly","dense"],

    methods:{

        handleChange(newVal) {

            this.$emit('receiveChange', newVal)

        },

    },

    watch: {

        value(newVal)

        {

            var newVal = newVal == 1 ? true : false;

            this.val = newVal;

        }

    }

}

</script>




<style>



</style>