<template>
  <q-input outlined dense bg-color="white" v-on:change="handleChange" v-model="displayDate" :rules="componentBehavior.rules" :disable="readonly" :readonly="true">
    <template v-slot:append>
      <span v-if="pass_day_string && show_day == 1" class="custom_append_text">{{ pass_day_string }}</span>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">
          <q-date :navigation-min-year-month="pass_min_year" @update:model-value="handleChange"
          :navigation-max-year-month="pass_max_year"
          mask="YYYY-MM-DD" minimal v-model='date' :options="options">
            <div class="row items-center justify-end q-gutter-sm">
              <q-btn label="Clear" color="primary" flat @click="clearDate" v-close-popup/>
              <q-btn label="Today" color="primary" flat @click="todayDate" v-close-popup/>
            </div>
          </q-date>
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
  props:['daterange','componentBehavior','min_year','max_year','autoclose', 'pass_day_string','optionsFn','readonly','dateFormat'],
  computed:{
    displayDate(){
      if(this.date)
      {
        return this.formatDate(this.date,this.dateFormat)
      }
      return "";      
    }
  },
  methods: {
    clearDate()
    {
      this.handleChange("");
    },
    todayDate()
    {
      const curDate = new Date();
      var day = curDate.getDate();
      var month = curDate.getMonth() +1;
      var year = curDate.getFullYear();
      const date = `${year}-${('0' + month).slice(-2)}-${('0' + day).slice(-2)}`;
      this.handleChange(date);
    },
    handleChange(newVal) {
      this.$emit('receiveChange', newVal)

      if(this.autoclose)
      {
        this.$refs.qDateProxy.hide();
      }
    },
    formatDate(date, format)
    {
      const ddMmYyyyPattern = /^(0?[1-9]|[12][0-9]|3[01])-(0?[1-9]|1[0-2])-(\d{4})$/;
      if (ddMmYyyyPattern.test(date)) {
        var curDate = this.parseDate(date);
      }
      else
      {
        var curDate = new Date(date);
      }
      var day = curDate.getDate();
      var month = curDate.getMonth() +1;
      var year = curDate.getFullYear();

      const formatRegex = /dd|mm|yyyy|yy/g;

      const formattedDate = format.toLowerCase().replace(formatRegex, (match) => {
          switch (match) {
              case 'dd': return day;
              case 'mm': return month;
              case 'yyyy': return year;
              case 'yy': return year.slice(-2);
              default: return match;
          }
      });

      return formattedDate;
    },
    parseDate(dateString) {
      const parts = dateString.split('-');
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const year = parseInt(parts[2], 10);
      return new Date(year, month, day);
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
    border-style: none;
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

.q-field--outlined.q-field--readonly >>> .q-field__control::before {
    border-style: solid !important;
}
</style>
