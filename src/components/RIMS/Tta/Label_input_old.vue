<template>
    <div class="component_div">
        <Label class="custom_label" :text="text" />
        <Input :id="id" :name="name" v-model="pass_value" :componentBehavior="dbComponentBehavior" />
    </div>
</template>

<script>
import Label from 'src/components/RIMS/Base/Label';
import Input from 'src/components/RIMS/Base/Input';

export default {
    name:"Label_input",
    data() {
        return {
            pass_value: this.value,
        };
    },
    props: ['text', 'value', 'dbComponentBehavior', 'id', 'name'],
    components: {
        Input,
        Label
    }
}
</script>

<style scoped>


</style>