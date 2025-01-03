<template>
    <q-input outlined v-if="clickableInput" class="clickableInput" @click="showPopup" :disable="pass_disabled" bg-color="white" v-on:change="handleChange" :mask="componentBehavior.mask" v-model="date" :rules="componentBehavior.rules">
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">
            <q-date class="clickableInput" today-btn :navigation-min-year-month="pass_min_year" @update:model-value="handleChange"
            :navigation-max-year-month="pass_max_year"
            mask="YYYY-MM-DD" minimal v-model='date'>
          <div align="center" class="custom_link" @click="onCurrentDate">Today</div>
          </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>

    <q-input v-else outlined :disable="pass_disabled" bg-color="white" v-on:change="handleChange" :mask="componentBehavior.mask" v-model="date" :rules="componentBehavior.rules">
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">
            <q-date :navigation-min-year-month="pass_min_year" @update:model-value="handleChange"
            :navigation-max-year-month="pass_max_year"
            mask="YYYY-MM-DD" minimal v-model='date'/>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>

</template>

<script>

export default {
    data () {
        return {
            date: this.daterange,
            pass_min_year: this.min_year ? this.min_year : "",
            pass_max_year: this.max_year ? this.max_year : "",
        }
    },
    props:['daterange','componentBehavior','min_year','max_year','autoclose', "pass_disabled",'clickableInput'],
    methods: {
        onCurrentDate()
        {
          var currentdate = new Date();

          var current_date_format = currentdate.getFullYear()+"-"+('0' + (currentdate.getMonth()+1)).slice(-2)+"-"+('0' + currentdate.getDate()).slice(-2);

          this.date = current_date_format;

          this.$emit('receiveChange', current_date_format)
        },
        handleChange(newVal) {
            this.$emit('receiveChange', newVal)

            if(this.autoclose)
            {
              this.$refs.qDateProxy.hide();
            }
        },
        showPopup()
        {
          this.$refs.qDateProxy.show()
        },
    },
    watch: {
        daterange(newVal)
        {
            // var newVal = newVal == true ? 1 : 0;
            this.date = newVal;
        }
    }
}
</script>

<style scoped>
.clickableInput >>> input
{
  cursor: pointer;
}
.clickableInput >>> .q-date__actions
{
  padding: 0px;
}
.clickableInput >>> .q-date__view
{
  padding: 16px 16px 0px 16px;
  min-height: 250px;
}

/* Remove underline by default */
/* .clickableInput >>> .custom_link
{
  color: blue;
  text-decoration: none; 
  transition: text-decoration 0.3s;
  padding-bottom: 16px;
} */

/* Underline on hover */
/* .clickableInput >>> .custom_link:hover {
  cursor: pointer;
  text-decoration: underline; 
} */
</style>
