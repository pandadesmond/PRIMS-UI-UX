<template>
    <q-item>
        <q-item-section avatar>
            <!-- <q-item-section top avatar> -->
            <q-avatar :color="json_container.color" :text-color="json_container.textColor" :icon="json_container.icon"/>
        </q-item-section>
        <q-item-section>
            <q-item-label :class="`text-h6 text-${json_container.color} text-bold`">{{json_container.value}}</q-item-label>
            <q-item-label caption>{{json_container.value2}}</q-item-label>
        </q-item-section>
        <Loading :loading="loading" />
    </q-item>
</template>

<script>
import Loading from 'src/components/Base/Loading';

export default {
    data(){
        return{
            json_container: this.json,
            loading: true
        }
    },
    name: "IconLabel",
    props: ['json', "forceLoading"],
    components:{
        Loading
    },
    watch:{
        json(newVal){
            this.json_container = newVal;
            this.loading = false
        },
        forceLoading(newVal)
        {
            if(newVal)
            {
                this.loading = true;
            }
        }
    }
}
</script>

<style>

</style>