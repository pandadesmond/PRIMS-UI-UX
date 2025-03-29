<template>
  <q-input outlined dense bg-color="white" v-on:change="handleChange" v-model="displayDateRange" :rules="componentBehavior.rules" :readonly="true" :disable="readonly">
    <template v-slot:append>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">
          <!-- <q-date 
          v-if="range"
          :navigation-min-year-month="pass_min_year" 
          :navigation-max-year-month="pass_max_year"
          @update:model-value="handleChange"
          mask="YYYY-MM-DD" 
          v-model='date' 
          :options="options" 
          minimal
          range
          />
          <q-date 
          v-else
          :navigation-min-year-month="pass_min_year" 
          :navigation-max-year-month="pass_max_year"
          @update:model-value="handleChange"
          mask="YYYY-MM-DD" 
          v-model='value' 
          :options="options" 
          minimal
          /> -->
          <q-date 
            v-if="showFrom"
            :navigation-min-year-month="pass_min_year" 
            :navigation-max-year-month="pass_max_year"
            mask="YYYY-MM-DD" 
            v-model="date.from" 
            :options="(val)=>getOptions(val,true)"
            @update:model-value="handleChangeFrom"
            minimal
          />
          <q-date 
            v-if="showTo"
            :navigation-min-year-month="pass_min_year" 
            :navigation-max-year-month="pass_max_year"
            mask="YYYY-MM-DD" 
            v-model="date.to" 
            :options="(val)=>getOptions(val,false)"
            @update:model-value="handleChangeTo"
            minimal
          />
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script>

export default {
  data () {
    return {
      showFrom: true,
      showTo: false,
      options: this.optionsFn,
      // value: this.daterange.from,
      date: {
        from: this.daterange.from,
        to: this.daterange.to,
      },
      pass_min_year: this.min_year ? this.min_year : "",
      pass_max_year: this.max_year ? this.max_year : "",
    }
  },
  props:['daterange','componentBehavior','min_year','max_year','optionsFn','end_optionsFn','readonly','range','show','dateFormat'],
  computed:{
    displayDateRange()
    {
        var return_message = '';
        if(this.date && this.date.from && this.date.to)
        {
            var from = this.formatDate(this.date.from,this.dateFormat);
            var to = this.formatDate(this.date.to,this.dateFormat);
            var return_message = from+" to "+to;
        }
        
        return return_message;
    },
  },
  mounted(){
    if(!this.range)
    {
      if(this.show == 'from')
      {
        this.showFrom = true;
        this.showTo = false;
      }
      else if(this.show == 'to')
      {
        this.showFrom = false;
        this.showTo = true;
      }
    }
  },
  methods: {
    handleChangeFrom(value) {
      if(!value)  return;

      if(this.range)
      {
        this.showFrom = false;
        this.showTo = true;
      }
      else
      {
        this.$refs.qDateProxy.hide();
      }
      this.$emit('receiveChange', this.date)
      this.$emit('update:daterange', this.date)
    },
    handleChangeTo(value) {
      if(!value)  return;

      this.$refs.qDateProxy.hide();
      this.showFrom = true;
      this.showTo = false;
      this.$emit('update:daterange', this.date)
      this.$emit('receiveChange', this.date)
    },
    getOptions(date,isFrom){
      if(this.range){
        if (isFrom) {
          return this.optionsFn(date);
        } else {
          return this.end_optionsFn(date);
        }
      }else{
        return this.options(date);
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
    // handleChange(newVal) {

    //   if (newVal) {
    //     if(this.range)
    //     {
    //       this.date = newVal;
    //     }
    //     else
    //     {
    //       this.date.from = newVal;
    //       this.date.to = this.daterange.to;
    //     }
    //   }
      
    //   this.$emit('update:daterange', this.date)
    //   this.$emit('receiveChange', this.date)

    //   if(this.autoclose && !this.range)
    //   {
    //     this.$refs.qDateProxy.hide();
    //   }
    // },
  },
  watch: {
    daterange:
    {
      immediate: true,
      deep: true,
      handler(newVal){
        // console.log('daterange update',newVal)
        this.date = newVal;
        // this.value = newVal.from;
      }
    },
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

.q-field--disabled >>> .q-field__inner > .q-field__control
{
  background-color: #ebebeb !important;
}
</style>
