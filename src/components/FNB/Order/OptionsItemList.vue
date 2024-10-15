<template>
  
    <!-- <div style="padding-top:10px;background-color:white;border-bottom:1px solid grey;grid-template-columns: auto auto auto auto auto auto auto auto;display: grid;">
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
    <div>5</div>
    <div>6</div>
    <div>7</div>
    <div>8</div>
    </div> -->

    <q-item
     v-touch-hold.mouse="handleHold"
     :dense="!header" @click="handleOrderItemClick" clickable v-ripple :class="header ? 'item_color item_header' : 'item_color'" 
     >

    <q-item-section style="text-align: left;" v-if="column_one == 0 || column_one">
        <q-item-label>{{column_one}}</q-item-label>
    </q-item-section>

    <q-item-section style="text-align: right;" v-if="column_two == 0 || column_two">
        <q-item-label>{{column_two}}</q-item-label>
    </q-item-section>

    <q-item-section style="text-align: left;" v-if="column_three == 0 || column_three">
        <q-item-label>{{column_three}}</q-item-label>
        <!-- <q-item-label caption lines="1"> </q-item-label> -->
    </q-item-section>

    <q-item-section style="text-align: left;" v-if="column_four == 0 || column_four">
        <q-item-label>{{column_four}}</q-item-label>
    </q-item-section>

    <q-item-section style="padding-left: 5px;" v-if="column_five == 0 || column_five">
        <q-item-label>{{column_five}}</q-item-label>
    </q-item-section>

    <q-item-section style="text-align: left;" v-if="column_six == 0 || column_six">
        <q-item-label>{{column_six}}</q-item-label>
    </q-item-section>

    <q-item-section style="text-align: left;" v-if="column_seven == 0 || column_seven">aaa
        <q-item-label>{{column_seven}}</q-item-label>
    </q-item-section>

    <q-item-section style="text-align: left;" v-if="column_eight == 0 || column_eight">
        <q-item-label>{{column_eight}}</q-item-label>
    </q-item-section>
    <!-- <q-item-section side>{{column_eight}}
        <q-icon name="chat_bubble" color="green" />
    </q-item-section> -->
</q-item>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    props: ['column_one','column_two','column_three','column_four','column_five','column_six','column_seven','column_eight','header'],
    methods:{
        handleOrderItemClick()
        {
            if(!this.header)
            {
                this.$emit('OptionsItemListClick');
            }
        },
        handleHold()
        {
            if(!this.header)
            {
                this.$emit('OptionsItemListHold');
            }
        }
    }
}
</script>

<style scoped>

.item_color
{
    background-color: white;
}

.item_header
{
    font-weight: bold;
}

@media all and (max-width: 1023px) {
/* CSS rules here for screens lower than 1023px */

    .q-item
    {
        padding-right: 5px;
        padding-left: 5px;
    }

    .q-item__label
    {
        word-break: break-all;
        font-size: 12px;
    }
}

/* Remove extra container infront of item with clickable enable*/
* >>> .q-focus-helper
{
    display: none;
}

.q-focus-helper
{
    display: none;
}

.q-item{
    padding-bottom: 1%;
    padding-top: 1%;
}

</style>