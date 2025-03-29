<template>
    <q-select v-if="!no_label"
        ref="mySelect"
        class="custom-select"
        popup-content-class="custom_select_menu"
        v-model="value"
        input-debounce="300"
        :label="label"
        :options="suggestions"
        :rules="dbComponentBehavior.rules"
        :disable="readonly"
        :loading="loadingStatus"
        @filter="filterFn"
        @update:model-value="handleChange"
        @input-value="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
        @keydown.enter="handleEnter"
        hide-dropdown-icon
        dense
        outlined
        use-input
        fill-input
        hide-selected
    >
      <template v-slot:no-option>
          <q-item>
              <q-item-section class="text-grey">
              No results
              </q-item-section>
          </q-item>
      </template>
    </q-select>

    <q-select v-else
        ref="mySelect"
        class="custom-select"
        popup-content-class="custom_select_menu"
        v-model="value"
        input-debounce="300"
        :options="suggestions"
        :rules="dbComponentBehavior.rules"
        :disable="readonly"
        :loading="loadingStatus"
        @filter="filterFn"
        @update:model-value="handleChange"
        @input-value="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
        @keydown.enter="handleEnter"
        hide-dropdown-icon
        dense
        outlined
        use-input
        fill-input
        hide-selected
    >
      <template v-slot:no-option>
          <q-item>
              <q-item-section class="text-grey">
              No results
              </q-item-section>
          </q-item>
      </template>
    </q-select>
</template>

<script>
import { QSelect } from 'quasar'

export default {
data ()
{
    return{
        bind_options: this.options,
        suggestions: [],
        tempValue: this.pass_value,
        value: this.pass_value,
        loadingStatus: this.loading,
    }
},
props: ['options', 'pass_value', 'dbComponentBehavior','no_label','label', 'readonly', 'loading'],
methods:{
    handleInput(val)
    {
      this.tempValue = val;
    },
    handleEnter()
    {
      this.$emit('receiveEnter',this.tempValue);
    },
    handleBlur()
    {
      if(this.tempValue && this.tempValue != "" && !this.bind_options.map(entry=>entry.label).includes(this.tempValue))
      {
        this.handleChange(this.tempValue);
      }
      else
      {
        this.handleChange(null);
      }
    },
    handleChange(newVal)
    {
      if(newVal == null)
      {
        this.$emit('receiveChange', newVal)
        this.$emit('update:pass_value', newVal)
        return
      }

      if(newVal)
      {
        this.$emit('receiveChange', newVal)
        this.$emit('update:pass_value', newVal)
      }
    },
    filterFn (val, update) 
    {
      if (val === '') {        
        update(() => {
          this.suggestions = this.bind_options;
        })
        return
      }

      update(() => {
          const needle = val.toLowerCase()
          this.suggestions = this.bind_options.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
          if(this.suggestions.length==0) this.loadingStatus = false;
      })
    }
  },
  components: {
    QSelect
  },
  watch:{
      pass_value(newVal)
      {
        this.value = newVal;
        this.tempValue = newVal;
      },
      options(newVal)
      {
        this.bind_options = newVal;
        this.suggestions = newVal;
      },
      loading(newVal)
      {
        this.loadingStatus = newVal;
      }
  },
}
</script>

<style>
.custom_select_menu > .q-virtual-scroll__content > .q-item > .q-item__section > .q-item__label
{
  font-size: 12px;
}

.custom_select_menu > .q-virtual-scroll__content > .q-item
{
  padding: 4px 8px;
  height: 32px;
  min-height: 32px;
}
</style>

<style scoped>
* >>> .q-field__native {
  font-size: 12px;
}

* >>> .q-field__after, * >>> .q-field__append {
    padding-left: 0px;
}

.q-field--error >>> .q-field__inner > .q-field__bottom
{
  padding: 0px;
  padding-top: 2px;
  font-size: 10px;
}

.q-field--disabled >>> .q-field__inner > .q-field__control
{
  background-color: #ebebeb !important;
}

@media screen and (max-width: 599px) {
  .q-field--auto-height >>>.q-field__control {
    min-height: 32px;
  }
  .q-field--auto-height >>>.q-field__control {
    height: 35px;
}
.q-field--auto-height.q-field--labeled >>>.q-field__native {
  padding-top: 10px;
}

}
.q-field--outlined.q-field--readonly >>>.q-field__control:before {
    border-style: solid;
}
* >>> .q-field__native
{
  flex-wrap: unset;
  align-items: flex-start;
}

.q-field
{
/* padding-top:0px; */
padding-left:0px;
padding-right:0px;
padding-bottom:0px;
background: white;
}

.q-field--error
{
padding-bottom:20px;
}

.q-field--filled >>> .q-field__control {
background: white;
}

.q-field >>> .q-field__native {
  max-height: 42px;
  overflow-y: scroll !important;
}

.q-field >>> .q-field__native::-webkit-scrollbar {
  width: 0; /* This will hide the vertical scrollbar */
  height: 0; /* This will hide the horizontal scrollbar (if applicable) */
}

/* when hover on text input */
.q-field--filled >>> .q-field__control:before {
background: white;
/* border-bottom: 1px solid rgba(0, 0, 0, 0.42);
opacity: 0;
transition: opacity 0.36s cubic-bezier(0.4, 0, 0.2, 1), background 0.36s cubic-bezier(0.4, 0, 0.2, 1); */
}

/* readonly field*/
.q-field--filled.q-field--readonly >>> .q-field__control:before {
opacity: 1;
background: #ededed;
border-bottom-style: none;
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

/* disable field*/
.q-field--filled.q-field--disabled >>> .q-field__control:before {
    opacity: 1;
    background: #ededed;
    border-bottom-style: none;
}

* >>> .q-field__label
{
  top: 5px;
  font-size: 14px;
}

* >>> .q-field__control-container
{
  padding-top: 0px !important;
}

@media screen and (min-width: 600px) {
  *>>>.q-field__marginal {
    height: 32px;
    color: rgba(0, 0, 0, 0.54);
    font-size: 24px;
}
  .q-field--auto-height >>>.q-field__control {
    min-height: 32px;
}

  .custom-select >>> .q-field__control {
  /* border-radius: 8px; */
  height: 32px;
  /* background-color: antiquewhite; */
}
  .q-select >>>.q-field__input {
    min-width: 0px !important;
    cursor: text;
}
}

* >>> .q-field__native
{
  align-items: center;
  padding-bottom: 0px;
}

.q-select >>> .q-field__inner > .q-field__control > .q-field__control-container > .q-field__native > span
{
    white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
