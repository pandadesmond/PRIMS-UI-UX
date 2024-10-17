<template>
  <q-input outlined dense bg-color="white" v-on:change="handleChange" v-model="date" :rules="componentBehavior.rules">
    <template v-slot:append>
      <span v-if="pass_day_string && show_day == 1" class="custom_append_text">{{ pass_day_string }}</span>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">
          <q-date :navigation-min-year-month="pass_min_year" @update:model-value="handleChange"
          :navigation-max-year-month="pass_max_year"
          mask="YYYY-MM-DD" minimal v-model='date' :options="options"/>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script>

export default {
  data () {
      return {
          options: this.optionsFn,
          date: this.daterange,
          pass_min_year: this.min_year ? this.min_year : "",
          pass_max_year: this.max_year ? this.max_year : "",
          show_day: sessionStorage.getItem("show_day") != "" && sessionStorage.getItem("show_day") != "null" && sessionStorage.getItem("show_day") != null ? sessionStorage.getItem("show_day") : [],
      }
  },
  props:['daterange','componentBehavior','min_year','max_year','autoclose', 'pass_day_string','optionsFn'],
  methods: {
      handleChange(newVal) {
          this.$emit('receiveChange', newVal)

          if(this.autoclose)
          {
            this.$refs.qDateProxy.hide();
          }
      },
  },
  watch: {
    daterange(newVal)
    {
      this.date = newVal;
    }
  }

}
</script>

<style scoped>
.custom_append_text
{
  font-size: 12px;
  color: #000000de;
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

* >>> .q-field__control
{
    height: 32px;
}

* >>> .q-field__append
{
    height: 32px;
}
</style>
