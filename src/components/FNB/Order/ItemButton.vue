<template>
          <Button class="custom_button_child selection_font_button" :text="text" />
</template>

<script>
import Button from 'src/components/FNB/Base/Button';

export default {
    name: "SubdeptButton",
    props:['text'],
    components: {
        Button
    }
}
</script>

<style scoped>

.custom_button_child
{
    border-radius:0px;
    background-color:#ffca40;
    border: 3px solid white;
    overflow: hidden;
}

.selection_font_button
{
  color: black;
  font-weight: bold;
  font-size: 11px;
}

</style>