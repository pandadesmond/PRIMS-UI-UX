<template>

    <q-select v-if="!no_label"
        ref="mySelect"
        :class="!no_padding_top ? 'space_on_top' : ''"
        class="custom-select"
        :label="label"
        outlined
        v-model="value"
        use-input
        input-debounce="0"
        :options="bind_options"
        @filter="filterFn"
        :rules="dbComponentBehavior.rules"
        @update:model-value ="handleChange"
        :display-value="`${handleDisplayValue(value)}`"
        popup-content-class="custom_select_menu"
        :loading="loading"
        @virtual-scroll="onScroll"
    >
    <!-- :display-value="`${pass_overwrite_display ? (value ? value[pass_overwrite_display] : '') : (value ? value.label : '')}`" -->
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
        :class="!no_padding_top ? 'space_on_top' : ''"
        outlined
        class="custom-select"
        v-model="value"
        use-input
        input-debounce="0"
        :options="bind_options"
        @filter="filterFn"
        :rules="dbComponentBehavior.rules"
        @update:model-value ="handleChange"
        :display-value="`${handleDisplayValue(value)}`"
        popup-content-class="custom_select_menu"
        :loading="loading"
        @virtual-scroll="onScroll"
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
        label_value: this.pass_label_value,
        value: this.pass_value,
        dense: this.pass_dense ? this.pass_dense: false,
        loading: false,
        nextPage: 0,
        pageSize: 5,
        lastPage: 99999999,
    }
},
props: ['options', 'pass_value', 'dbComponentBehavior','no_label','label','no_padding_top', 'pass_overwrite_display','dropdown_total'],
methods:{
    onScroll ({ to, ref }) {
      console.log('hhhhh');
      
      const lastIndex = this.bind_options.length - 1;

      console.log('this.nextPage', this.nextPage);
      console.log('this.lastPage', this.lastPage);
      console.log('to',to);
      console.log('lastIndex', lastIndex);
      console.log('Math.ceil(this.options.length / this.pageSize)', Math.ceil(this.options.length / this.pageSize));

      if (this.loading !== true && this.nextPage < this.lastPage && to === lastIndex) {
        this.loading = true

        setTimeout(() => {
          this.nextPage++
          this.$nextTick(() => {
            this.$emit('receiveTriggerLoad');
            this.loading = false
          })
        }, 500)
      }
    },
    handleDisplayValue(pass_payload)
    {
      if(!this.bind_options)
      {
        return '';
      }
      var filter = this.bind_options.filter((entry)=>{
        return entry.value == pass_payload
      });

      if(pass_payload !== null && pass_payload !== undefined && pass_payload !== '')
      {
        if(this.pass_overwrite_display)
        {
          if(pass_payload.value !== null && pass_payload.value !== undefined && pass_payload.value !== '')
          {
            return pass_payload[this.pass_overwrite_display]
          }
          else
          {
            return filter.length > 0 ? filter[0][this.pass_overwrite_display] : '';
          } 
        }
        else
        {
          if(pass_payload.value !== null && pass_payload.value !== undefined && pass_payload.value !== '')
          {
            return pass_payload.label
          }
          else
          {
            if(filter.length > 0)
            {
              return filter[0].label;
            }
            else
            {

              if(pass_payload.label !== null && pass_payload.label !== undefined && pass_payload.label !== '')
              {
                return pass_payload.label;
              }
              else
              {
                return 'Not found';
              }

            }
            
          } 
        }
      }
      else
      {
        return '';
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

        if(Object.keys(newVal).length >= 2)
        {
            newVal = newVal.value;
            this.$emit('receiveChange', newVal)
            this.$emit('update:pass_value', newVal)
        }

        setTimeout(() => {
          this.$refs.mySelect.$el.querySelector('input').blur();
        }, 100);

    },
    filterFn (val, update) {
        if (val === '') {
            update(() => {
                this.bind_options = this.options
            })
            return
        }

        update(() => {
            const needle = val.toLowerCase()
            // var filter = this.bind_options.filter((v)=>{
            //     return v.value.toLowerCase().indexOf(needle) > -1
            // });
            // console.log(filter);
            this.bind_options = this.options.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
        })
    }
},
components: {
  QSelect
},
watch:{
    pass_value(newVal)
    {
        //new add in
        var filter_value = this.options.filter((entry)=>{
            return entry.value == newVal
        });

        this.value = filter_value[0]
    },
    pass_label_value(newVal){
        this.label_value = newVal;
    },
    // pass_value(newVal){
    //     this.value = newVal;
    // },
    pass_dense(newVal){
        this.dense = newVal;
    },
    dropdown_total(newVal)
    {
      this.lastPage = newVal;
    }
}
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

/* * >>> .q-field__control
{
  padding-left: 3px;
  padding-right: 0px;
  padding-top: 0px;
  padding-bottom: 0px;
} */

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

/* For text input border colour */
* >>> .q-field__inner
{
/* border: 1px solid #d2d6de; */
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
