<template>
    <Label class="custom_label" :text="text" />
</template>

<script>
import Label from 'src/components/Base/Label';
export default {
    props: ['text'],
    components: {
        Label
    }
}
</script>

<style scoped>
.custom_label
{
    display: block;
    background: #DEE1E6;
    /* background-color: transparent; */
    padding-top:3px;
    padding-bottom:3px;
    padding-left:5px;
    padding-right: 5px;
    font-weight: bold;
    height: 31px;
}
</style>
