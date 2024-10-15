<template>
    <q-card class="my_card" style="border-left: 3px solid #362e4b;">

        <q-card-section style="width: 100%;padding-right: 3px;padding-left: 10px;">
            <div class="text-h6 text-weight-medium text-overline">Test</div>
            <div class="text-h6 text-weight-bold custom_font">gaga</div>
        </q-card-section>
        <Loading :loading="loading" />
    </q-card>
</template>

<script>
import Loading from 'src/components/Base/Loading'
export default {
    data()
    {
        return{
            json_container: this.json,
            loading: true
        }
    },
    name: "NormalScoreCard",
    props: ["json"],
    components:{
        Loading
    },
    watch: {
        json(newVal)
        {
            this.json_container = newVal;
            this.loading = false;
        }
    }
}
</script>

<style>

</style>