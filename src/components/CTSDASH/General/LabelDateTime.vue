<template>
    <!-- <div class="component_div"> -->
        <div class="row">
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                <Label class="custom_label" :text="text"  style="padding-left: 6px;"/>
             </div>
               <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                <DateTime v-on:receiveChange="handleChange" :combinedDateTime="bind_value"
                :dateValue="dateSelect" :timeValue="timeSelect"
                v-on:receiveChangeTimeNow="handleChangeTimeNow"
                :componentBehavior="dbComponentBehavior" />
             </div>
 <!-- :timerange="timeinput" -->
        </div>
    <!-- </div> -->
</template>

<script>
import Label from 'src/components/CTSDASH/Base/Label';
import DateTime from 'src/components/CTSDASH/Base/DateTime';

// import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
    name:"LabelInputHorizontal",
    data() {
        return {
            bind_value: this.pass_value,
            dateSelect:this.date,
            timeSelect:this.time,
            // timeinput:this.time
        };
    },
    props: ['text','pass_value','dbComponentBehavior','no_label','readonly','time','date'],
    computed:{
        // ...mapGetters("tta"),
        oridbComponentBehavior() {
            return this.$store.getters['dbComponentBehavior/byLanguage']('cts')
        },
    },
    components: {
        Label,
        DateTime
    },
    methods:{
        handleChangeTimeNow: function(newVal){
             this.$emit('receiveChangeTimeNow',newVal)
        },
        handleChange: function(newVal){
          this.bind_value = newVal

          // console.log(newVal);
            // var temp_json = [];
            // this.bind_value = "dadas"
            this.$emit('update:pass_value', newVal)
            // temp_json.push({"tab":"supplier_profile","seq":"2","value":this.json_container});
            this.$emit('receiveChange',newVal)
        },
    },
    watch: {
        pass_value(newVal)
        {
            this.bind_value = newVal;
        },
         date(newVal)
        {
            this.dateSelect = newVal;
        },
         time(newVal)
        {
            this.timeSelect = newVal;
        }
    }
}
</script>

<style scoped>
.custom_label
{
    /* make vertical align*/
     font-weight: bold;
    display: flex;
    align-items: center;
    font-size: 13px;
    height: 100%;/*add in  for left 4 col line break over will follow div height*/
}

/* For text input padding removal */
.q-field
{
    height: 100%;/*when overflow label input will also follow height*/
}

* >>> .q-field__control
{
    height: 100%;/*when overflow label input will also follow height*/
    padding-left: 8px;
}


</style>
