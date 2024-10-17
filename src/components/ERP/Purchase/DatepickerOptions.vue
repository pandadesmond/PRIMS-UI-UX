<template>
  <q-input outlined v-if="clickableInput" class="clickableInput" @click="showPopup" :disable="pass_disabled" bg-color="white" v-on:change="handleChange" :mask="componentBehavior.mask" v-model="date" :rules="componentBehavior.rules">
    <template v-slot:append>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">
          <q-date class="clickableInput" today-btn :navigation-min-year-month="pass_min_year" @update:model-value="handleChange"
          :navigation-max-year-month="pass_max_year"
          mask="YYYY-MM-DD" minimal v-model='date' :options="options">
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
          mask="YYYY-MM-DD" minimal v-model='date'  :options="options" />
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
          options: this.optionsFn,
          pass_min_year: this.min_year ? this.min_year : "",
          pass_max_year: this.max_year ? this.max_year : "",
      }
  },
  props:['daterange','componentBehavior','min_year','max_year','autoclose', "optionsFn","pass_disabled",'clickableInput'],
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
      },
      optionsFn(newVal){
           this.options = newVal
        },
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

.clickableInput >>> .custom_link
{
color: blue;
text-decoration: none; /* Remove underline by default */
transition: text-decoration 0.3s;
padding-bottom: 16px;
}
.clickableInput >>> .custom_link:hover {
cursor: pointer;
text-decoration: underline; /* Underline on hover */
}

/* For text input padding removal */
.q-field
{
    padding-top:0px;
    padding-left:0px;
    padding-right:0px;
    padding-bottom:0px;
}

.q-field--error
{
    padding-bottom:20px;
}

* >>> .q-field__inner
{
    /* border: 2px solid #D4D4D4; */
    /* border-radius: 8px; */
}
/* hide error message when no error validation*/
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

/* when hover on text input */
.q-field--filled >>> .q-field__control:before {
    background: white;
    /* border-bottom: 1px solid rgba(0, 0, 0, 0.42);
    opacity: 0;
    transition: opacity 0.36s cubic-bezier(0.4, 0, 0.2, 1), background 0.36s cubic-bezier(0.4, 0, 0.2, 1); */
}
.clickableInput >>> .q-field__control {
  /* border-radius: 8px; */
  /* padding: 0px 16px !important; */
  /* background-color: antiquewhite; */
  overflow: hidden;
  background: white;
  height: 32px;
}



@media (min-width: 600px){
  .q-field--outlined.q-field--disabled >>>.q-field__control:before {
    border: 2px solid rgba(0, 0, 0, 0.24);
}
  .q-field--labeled.q-field--dense >>>.q-field__native {
  padding-top: 17px;
  padding-bottom: 8px;
  line-height: 24px;
}
  *>>>.q-field__marginal {
    height: 32px;
  }
  
  .q-field--dense >>>.q-field__marginal {
    height: 32px;
}
  *>>>.q-field__native {
    /* min-height: 50px !important; */
    /* height: 50px !important; */
    /* height: 150px; */
    /* padding-top: 20px !important; */
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    font-family: InterfontMedium;
    /* background-color: #ffc6cd; */
}
* >>> .q-field__label
{
  top: 10px;
  color: #535151;
  /* background-color: antiquewhite; */
  font-size: 16px !important;
  font-style: normal;
  font-weight: 500;
  font-family: InterfontMedium;
}
}

@media (max-width: 599px) {
  .q-field--outlined.q-field--disabled >>>.q-field__control:before {
    border: 2px solid rgba(0, 0, 0, 0.24);
}
  .q-field--standard.q-field--disabled >>>.q-field__control:before {
    border: 2px solid rgba(0, 0, 0, 0.24);
    transition: border-color 0.36s cubic-bezier(0.4, 0, 0.2, 1);
}
  .q-field--dense.q-field--float >>>.q-field__label {
    transform: translateY(-30%) scale(0.75);
    font-size: 12px !important;
}
  .q-field--labeled.q-field--dense >>>.q-field__native {
  padding-top: 17px;
  padding-bottom: 8px;
  line-height: 24px;
}
  .clickableInput >>> .q-field__control {
    height: 40px !important;
  }
  *>>>.q-field__native {
    /* min-height: 50px !important; */
    /* height: 50px !important; */
    /* height: 150px; */
    /* padding-top: 20px !important; */
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    font-family: InterfontMedium;
    /* background-color: #ffc6cd; */
}
* >>> .q-field__label
{
  top: 10px;
  color: #535151;
  /* background-color: antiquewhite; */
  font-size: 12px !important;
  font-style: normal;
  font-weight: 500;
  font-family: InterfontMedium;
}
}
</style>
