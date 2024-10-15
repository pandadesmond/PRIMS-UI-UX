<template>
    <q-inner-loading :showing="loading">
        <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>
</template>

<script>
export default {
    name: "Loading",
    props: ["loading"],

}
</script>

<style>

</style>