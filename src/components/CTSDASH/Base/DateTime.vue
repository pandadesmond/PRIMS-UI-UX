<template>
<!-- {{date}}<br>
{{time}} -->
 <q-input  dense bg-color="white" v-on:change="handleChange" :maxlength="componentBehavior.maxlength" :mask="componentBehavior.mask" filled v-model="datetime">

      <template v-slot:prepend>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-date :navigation-min-year-month="pass_min_year" @update:model-value="handleChange"
            :navigation-max-year-month="pass_max_year"
            mask="YYYY-MM-DD" minimal v-model='date'>
    <template v-slot:default>

<div class="row">
   <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
  <q-input
        v-model="time"
        type="time"
        format="HH:mm"
          @update:model-value="handleChange"
      />
      </div>
       <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
        <!-- items-center justify-end -->
            <div class="row ">
              <div class="col">
                 <q-btn @click="handleChangeTimeNow" label="Now" color="primary" flat />

            </div>
              <div class="col">
                 <q-btn v-close-popup label="Close" color="primary" flat />

            </div>


        </div>
       </div>

</div>

    </template>
              <!-- <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div> -->
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>

      <!-- <template v-slot:append>
        <q-icon name="access_time" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-time v-model="date" mask="YYYY-MM-DD HH:mm:ss" format24h  with-seconds @update:model-value="handleChange">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-time>
          </q-popup-proxy>
        </q-icon>
      </template> -->
    </q-input>
</template>

<script>
import { ref } from 'vue'

export default {
    data () {
      return {
          date: this.dateValue,
          time: this.timeValue,
          datetime:this.combinedDateTime
          // date: this.daterange,
          // pass_min_year: this.min_year ? this.min_year : "",
          // pass_max_year: this.max_year ? this.max_year : "",
          // input: this.time,
      }
    },
    //  props:['daterange','componentBehavior','min_year','max_year','autoclose', "pass_disabled","timerange"],
    props:['componentBehavior','min_year','max_year','autoclose', "pass_disabled",'combinedDateTime','dateValue','timeValue'],
    mounted(){

    },
    computed:{
      // datetime(){
      //   return this.date + " " + this.time
      // }
    },
    methods: {
      updateDate (val) {
      this.date = val++
    },

        handleChange(newVal) {
          var date = "";

          if(newVal[4]=='-')
          {
            date = newVal + " " + this.time;
          }
          else
          {
            date = this.date + " " + newVal;
          }
         // var date = this.date +" " +this.time

      //        let date = new Date(this.date);
      // var time = this.time.split(':');
      // date.setHours(time[0]);
      // date.setMinutes(time[1]);
            this.$emit('receiveChange',  date)

            if(this.autoclose)
            {
              this.$refs.qDateProxy.hide();
            }
        },
        handleChangeTimeNow(newVal){
            var currentdate = new Date();
            var dd = String(currentdate.getDate()).padStart(2, '0');
            var mm = String(currentdate.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = currentdate.getFullYear();
            var hour = ('0' + currentdate.getHours()).slice(-2)
            var minute = ('0' + currentdate.getMinutes()).slice(-2)

            this.date=  yyyy+"-"+mm+"-"+dd
            this.time= hour +":"+minute
            var tem_datetime =  this.date + " " + this.time;
          this.$emit('receiveChangeTimeNow',tem_datetime)
        },
        formatTime(e) {
        var value = e.target.value;
        if (value.length === 2) {
          this.date = value + ":";
        }
      }
    },
    created(){
    //  console.log(this.combinedDateTime);
    //  console.log(this.time);
    //  console.log(this.date);
  //     var currentdate = new Date();
  //       var dd = String(currentdate.getDate()).padStart(2, '0');
  // var mm = String(currentdate.getMonth() + 1).padStart(2, '0'); //January is 0!
  // var yyyy = currentdate.getFullYear();
  //       var hour = ('0' + currentdate.getHours()).slice(-2)
  // var minute = ('0' + currentdate.getMinutes()).slice(-2)
  // this.date =  yyyy+"-"+mm+"-"+dd;
  // this.time = hour +":"+minute
    },
    watch: {
    dateValue(newVal){
       this.date = newVal
    },
    timeValue(newVal){
       this.time = newVal
    },
    combinedDateTime(newVal){
       this.datetime = newVal

    }
      //  timerange(newVal){
      //   this.time= newVal
      //  }
    }
}
</script>
<style scoped>
.q-field
{
    padding-top:0px;
    padding-left:0px;
    padding-right:0px;
    padding-bottom:0px;
    width: 100% !important;
    /* width: 100% !important; */
}

.q-field--error
{
    padding-bottom:20px;
}

/* For text input border colour */
* >>> .q-field__inner
{
    border: 1px solid #d2d6de;
}

.q-field--filled >>> .q-field__control:before {
    background: white;
}

* >>> .q-field__control
{
    background-color: white;
}


.q-field >>> .q-field__bottom
{
    display: none;
}

.q-field--error >>> .q-field__bottom
{
    display: block;
}

* >>> .q-field__bottom {
    padding: 3px 0px 0;
}

.q-field--filled.q-field--readonly >>> .q-field__control:before {
    opacity: 1;
    background: #ccc;
    border-bottom-style: none;
    height: 100%;
    border-radius: 0px;
}

/* readonly field*/
.q-field--filled.q-field--readonly >>> .q-field__control {
    opacity: 1;
    background: #ccc;
    border-bottom-style: none;
    height: 100%;
    border-radius: 0px;
}

/* make scroll overflow overflow */
* >>> .q-field__control
{
    max-height: 335px; /*can change the size of the scroll*/
    overflow: auto;
    border-radius: 0px;
}

*>>> .q-field__native{
  /* padding-left: 10px; */
  font-size: 13px;
}

*>>> .q-field__marginal{
  height: 32px;
}

*>>> .q-field__prepend{
  padding-top: 2px;
  font-size:28px;
}

*>>> .q-field__append{
  padding-top: 2px;
  font-size:26px;
}
/* *>>>.q-icon{
  padding-right: 12px;
} */
</style>
