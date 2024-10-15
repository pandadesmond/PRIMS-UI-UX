<template>
    <Button :text="text"/>
</template>

<script>
import Button from 'src/components/Base/Button';

export default {
    props: ['text'],
    components: {
        Button
    }
}
</script>

<style>

</style>