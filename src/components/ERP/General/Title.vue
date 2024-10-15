<template>
    <label v-if="smaller_label" class="custom_small_title" @click="handleClick" >{{text}}</label>
    <label v-if="!smaller_label" class="custom_title" @click="handleClick" >{{text}}</label>
    <q-icon v-if="!noFilter" name="filter_alt" class="custom_icon" :style="`color:${filter_status_color}`" @click="handleClick" ></q-icon>
    <span v-if="!noFilter" class="custom_filter_text" :style="`color:${filter_status_color}`" @click="handleClick" >{{filter_status_word}}</span>
</template>

<script>
export default {
    name: "Title",
    data(){
        return{
            filter_status_word: "Off",
            filter_status_color: "black",
        }
    },
    props:['text','filter_status','noFilter','smaller_label'],
    methods: {
        handleClick()
        {
            var status = this.filter_status;
            this.$emit("receiveFilter",!status);
        }
    },
    watch:{
        filter_status(newVal)
        {
            if(newVal)
            {
                this.filter_status_word = "On";
                this.filter_status_color = "green";
            }
            else
            {
                this.filter_status_word = "Off";
                this.filter_status_color = "black";
            }
        }
    }
}
</script>

<style scoped>
.custom_small_title
{
    font-weight: bold;
    font-size: 25px;
    cursor: pointer;
}

.custom_title
{
    font-weight: bold;
    font-size: 30px;
    cursor: pointer;
}

.custom_icon
{
    font-size: 19px;
    cursor: pointer;
}

.custom_filter_text
{
    font-size: 13px;
    cursor: pointer;
}
</style>
