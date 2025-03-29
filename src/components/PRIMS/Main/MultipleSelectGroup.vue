<template>
  <!-- Select with grouping options -->
  <!-- Format options: { label: string, options: [], checked: boolean} -->
  <q-select v-if="!no_label"
    dense
    options-dense
    :filled="filled"
    :outlined="outlined"
    multiple
    option-value="value"
    option-label="label"
    :label="label"
    emit-value 
    map-options
    :use-chips="false"
    use-input
    input-debounce="0"
    @filter="filterFn"
    @update:model-value  ="handleChange"
    @popup-hide="handlePopupHide"
    ref="myInput"
    :options="filterOptions"
    v-model="bind_value" 
    class="multiselect custom-select"
    :display-value="displayValue"
    :rules="componentBehavior.rules"
    :disable="readonly"
    :loading="loading"
  >

    <template #before-options>
      <q-item class="bg-grey-4">
        <q-item-section>
          <q-item-label>Select All</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-checkbox v-model="all" @update:model-value="checkAll"></q-checkbox>
        </q-item-section>
      </q-item>
    </template>

    <template v-slot:option="scope">
      <div v-bind="scope.itemProps" v-on="scope.itemEvents">
        <q-item class="bg-grey-4">
          <q-item-section>
            <q-item-label>{{scope.opt.label}}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-checkbox v-model="scope.opt.checked" @update:model-value="checkGroup(scope.opt)"></q-checkbox>
          </q-item-section>
        </q-item>
        <q-item v-for="option in scope.opt.options" :key="option.value">
          <q-item-section class="q-pl-lg">
            <q-item-label>{{option.label}}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-checkbox v-model="bind_value" @update:model-value ="handleChange" :val="option.value"></q-checkbox>
          </q-item-section>
        </q-item>
      </div>
    </template>
  </q-select>

  <q-select v-else
    dense
    options-dense
    :filled="filled"
    :outlined="outlined"
    multiple
    option-value="value"
    option-label="label"   
    emit-value 
    map-options
    :use-chips="false"
    use-input
    input-debounce="0"
    @filter="filterFn"
    @update:model-value ="handleChange"
    ref="myInput"
    :options="filterOptions"
    v-model="bind_value" 
    class="multiselect custom-select"
    :display-value="displayValue"
    :rules="componentBehavior.rules"
    :disable="readonly"
    :loading="loading"
    >

    <template #before-options>
      <q-item>
        <q-item-section>
          <q-item-label>Select All</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-checkbox v-model="all" @update:model-value="checkAll"></q-checkbox>
        </q-item-section>
      </q-item>
    </template>

    <div v-bind="scope.itemProps" v-on="scope.itemEvents">
      <q-item class="bg-grey-4">
        <q-item-section>
          <q-item-label>{{scope.opt.label}}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-checkbox v-model="scope.opt.checked" @update:model-value="checkGroup(scope.opt)"></q-checkbox>
        </q-item-section>
      </q-item>
      <q-item v-for="option in scope.opt.options" :key="option.value">
        <q-item-section class="q-pl-lg">
          <q-item-label>{{option.label}}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-checkbox v-model="bind_value" @update:model-value ="handleChange" :val="option.value"></q-checkbox>
        </q-item-section>
      </q-item>
    </div>
  </q-select>
</template>

<script>
export default {
  data()
  {
      return{
          filterOptions: this.options,
          stringOptions: this.options,
          all:false,
          // bind_value: [],
          bind_value: this.pass_value,
      }
  },
  props: ['pass_value', 'options', 'label', 'id', 'name','componentBehavior','no_label', 'value', 'forceSelectAll', 'option_label','readonly','loading'],
  computed:{
    displayValue()
    { 
      if(typeof this.bind_value !== 'string'){
        if(this.bind_value.length>0)
        {

          if(this.bind_value.length>2)
          {
            return `${this.bind_value.length} ${this.option_label} Selected`;
          }
          
          var selectedValue = [];
          this.stringOptions.map(group => {
            const array = group.options.filter(entry=> this.bind_value.includes(entry.value)).map(val => val.label);
            selectedValue = selectedValue.concat(array);
          });
          return selectedValue.join(',');         
        }
      }
      else
      {
        this.bind_value = [];
      }   
      return "";
    },
  },
  mounted(){
    this.all = this.forceSelectAll;
  },
  methods: {
    handlePopupHide()
    {
      this.$emit('receivePopupHide');
    },
    checkGroup(group)
    {
      if (group.checked) {
        // If the group is checked, add all options to bind_value
        group.options.forEach(option => {
          if (!this.bind_value.includes(option.value)) {
            this.bind_value.push(option.value);
          }
        });
      } else {
        // If the group is unchecked, remove all options from bind_value
        group.options.forEach(option => {
          const index = this.bind_value.indexOf(option.value);
          if (index !== -1) {
            this.bind_value.splice(index, 1);
          }
        });
      }
      this.handleChange(this.bind_value);
    },
    checkAll (v) {
      if (v) {
        console.log('check', v)
        this.filterOptions.forEach(group => {
          group.checked = true;
          this.checkGroup(group);
        })
      }
      else
      {
        this.filterOptions.forEach(group => {
          group.checked = false;
        })
        this.bind_value = [];
      }
      
      this.handleChange(this.bind_value);
    },
    async handleChange (newVal) {
      await this.filterOptions.forEach(group => {
          group.checked = group.options.every(banner => this.bind_value.includes(banner.value));
      });

      if(this.filterOptions.every(group => group.checked))
      {
        this.all = true;
        var newVal = this.bind_value;
      }
      else
      {
        this.all = false;
      }

      this.$emit('receiveChange', newVal)
      this.$emit('update:pass_value', newVal)
    },
    updateInput () {
        this.$refs.myInput.updateInputValue('')
        this.$refs.myInput.setInputValue('')
    },
    filterFn (val, update) {
      update(() => {
        // console.log(this.stringOptions);
        if (val === '') {
          this.filterOptions = this.stringOptions
        }
        else {
          const needle = val.toString().toLowerCase()
          console.log(needle)
          console.log(this.stringOptions.filter(function (entry) {
            return entry.label.toString().toLowerCase().indexOf(needle) > -1;
          }));

          this.filterOptions = this.stringOptions.filter(function (entry) {
            return entry.label.toString().toLowerCase().indexOf(needle) > -1;
          });
        }
      });
    }
  },
  watch: {
    options(newVal){
      this.stringOptions = newVal;
      //added in due to label not display. it display value instead. So in mulitple mode maybe because options only promp in after click on dropdown that trigger options inside
      this.filterOptions = newVal;
    },
    pass_value(newVal)
    {
      this.bind_value = newVal;
    },
    forceSelectAll(newVal)
    {
      this.all = newVal;
    }
  }
}
</script>

<style scoped>
* >>> .q-field__native {
  font-size: 12px;
}
/* * >>> .q-field__control
{
  padding-left: 3px;
  padding-right: 0px;
  padding-top: 0px;
  padding-bottom: 0px;
} */

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

/* @media screen and (max-width: 600px) {
  * >>> .q-field__native
  {
    padding-top: 9px;
  }
} */

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

/* readonly field
.q-field--readonly >>> .q-field__control:before
{
background: yellow ;
} */

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

/* written in ERP app.scss */
/* * >>> .q-field--float .q-field__label {
  top: 7px !important;
} */

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
  /* .space_on_top >>> .q-field__native  > span
  {
    padding-top: 5px !important;
  } */
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
/* 
* >>> .q-field__control
{
  padding: 0px !important;
} */

.q-select >>> .q-field__inner > .q-field__control > .q-field__control-container > .q-field__native > span
{
    white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>