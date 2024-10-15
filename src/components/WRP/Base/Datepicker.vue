<template>
    <q-input :disable="pass_disabled" dense bg-color="white"  v-on:change="handleChange" v-model="date" :rules="componentBehavior.rules">
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer" v-on:click="handleClickIcon">
          <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">
            <q-date :navigation-min-year-month="pass_min_year" @update:model-value="handleChange"
            :navigation-max-year-month="pass_max_year"
            mask="YYYY-MM-DD" minimal v-model='date' :options="options" :disable="disableOptions"/>
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
    props:['daterange','optionsFn','disableOptions','componentBehavior','min_year','max_year','autoclose', "pass_disabled"],
    methods: {
        handleClickIcon()
        {
            this.$emit('receiveClickIcon')
        },
        handleChange(newVal) {
            this.$emit('receiveChange', newVal)

            if(this.autoclose)
            {
              this.$refs.qDateProxy.hide();
            }
        },
    },
    watch: {
        optionsFn(newVal){
           this.options = newVal
        },
        daterange(newVal)
        {
            // var newVal = newVal == true ? 1 : 0;
            this.date = newVal;
        }
    }
}
</script>

<style scoped>
/* For dropdown padding removal */
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
  padding-left: 16px;
}

*>>>.q-icon{
  padding-right: 12px;
}
</style>
