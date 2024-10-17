<template>
  <q-badge :color="color" :transparent="transparent" :rounded="rounded" :text-color="textColor">{{text}}</q-badge>
</template>

<script>
export default {
    
    props: ["text","color", "transparent", "rounded","textColor"],

}
</script>

<style>

</style>