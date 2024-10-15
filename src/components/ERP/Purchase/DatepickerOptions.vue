<template>
  <q-input v-if="clickableInput" class="clickableInput" @click="showPopup" :disable="pass_disabled" dense bg-color="white" v-on:change="handleChange" :mask="componentBehavior.mask" filled v-model="date" :rules="componentBehavior.rules">
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

  <q-input v-else :disable="pass_disabled" dense bg-color="white" v-on:change="handleChange" :mask="componentBehavior.mask" filled v-model="date" :rules="componentBehavior.rules">
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
    border: 1px solid #d2d6de;
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
</style>
