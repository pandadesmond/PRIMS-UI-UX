<template>
  <div>
    <label class="custom_title" @click="handleClick" >{{text}}</label>
    <span class="icon_with_label_wrapper">
        <q-icon name="filter_alt" class="custom_icon" :style="`color:${filter_status_color}`" @click="handleClick" ></q-icon>
        <span class="custom_filter_text" :style="`color:${filter_status_color}`" @click="handleClick" >{{filter_status_word}}</span>
    </span>
  </div>

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
    props:['text','filter_status'],
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

.icon_with_label_wrapper
{
    position: absolute;
}
</style>
