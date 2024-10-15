<template>
    <q-item  style="background-color:#f8f8f7;margin: 10px;border-radius:10px;" clickable v-ripple @click="handleClick">
        <q-item-section avatar>
            <q-avatar style="background-color: #fec93f" text-color="white">
                {{logo_value}}
            </q-avatar>
        </q-item-section>

        <q-item-section>
            <q-item-label>
                <span class="selection_font disable-select">{{description}}</span>
            </q-item-label>
        </q-item-section>

        <q-item-section side>
            <!-- <q-icon v-if="status" name="check_circle" color="green" /> -->
            <q-icon v-if="status==1" name="circle" color="green" />
            <q-icon v-if="status==99" name="circle" color="white" />
            <q-icon v-if="status==0" name="circle" color="orange" />
            <!-- <q-icon v-else name="block" color="red" /> -->
        </q-item-section>
    </q-item>
</template>

<script>
export default {
    name: "TableCard",
    data(){
        return{

        }
    },
    props:['logo_value','description','status','total_length','current_index'],
    methods:{
        handleClick(){
            this.$emit('receiveClick',this.logo_value);
        }
    },
    mounted()
    {
        if((parseInt(this.current_index)+1) == this.total_length)
        {
            this.$emit('lastIndex');
        }
    }
}
</script>

<style scoped>
.selection_font
{
    
    font-weight: bold;
    font-size: 25px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
</style>