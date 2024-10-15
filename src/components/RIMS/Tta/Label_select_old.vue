<template>
    <div class="component_div">
        <Label class="custom_label" :text="text" />
        <Select :id="id" :name="name" v-model="pass_value" :options="options"/>
    </div>
</template>

<script>
import Label from 'src/components/RIMS/Base/Label';
import Select from 'src/components/RIMS/Base/Select';

export default {
    name: "Label_select",
    data() {
        return {
            pass_value: this.value,
        };
    },
    props: ['text', 'value', 'dbComponentBehavior', 'options', 'id', 'name'],
    components: {
        Label,
        Select
    }
}
</script>

<style scoped>


</style>