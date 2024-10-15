<template>
    <Editor :pass_value="bind_value" />
</template>

<script>
import Editor from 'src/components/Base/Editor';

export default {
    data()
    {
        return{
            bind_value: this.pass_value,
        }
    },
    props: ["pass_value"],
    components:{
        Editor
    },
    watch:{
        pass_value(newVal){
            this.bind_value = newVal;
        }
    }
}
</script>

<style>

</style>