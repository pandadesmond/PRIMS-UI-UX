<template>
<!-- {{all}} -->
<!-- {{bind_value}} -->

<q-select
         dense
        options-dense
        filled
        multiple
        style="width: 250px"
        option-value="value"
        option-label="label"
        :label="label"
        emit-value
        map-options
        use-chips
        use-input
        input-debounce="0"
        :placeholder="bind_value.length > 0 ? '' : placeholder"
        @filter="filterFn"
        @update:model-value ="handleChange"
        ref="myInput"
        :options="filterOptions"
        v-model="bind_value"
        class="multiselect"
>

   <template #before-options>
          <q-item
          clickable v-ripple
          @click="selectAll('selectAll')"
          dense
          >
            <q-item-section >
              <q-item-label>Select All</q-item-label>
            </q-item-section>
            <q-item-section side>
               <!-- <q-icon size="xs" name="close" @click.stop="profileCleared" class="cursor-pointer" /> -->
               <span @click.stop="profileCleared">Clear</span>

            </q-item-section>

          </q-item>
           <q-separator />
 </template>
<!-- 
 <template v-slot:option="scope">
          <q-item
            v-bind="scope.itemProps"
            v-on="scope.itemEvents"
            @click ="handleChange(scope.opt.label)"
            >
            <q-item-section>
              <q-item-label  v-html="scope.opt.label"></q-item-label>
            </q-item-section>

          </q-item>
        </template> -->

        
 <template v-slot:option="scope">
          <q-item
            v-bind="scope.itemProps"
            v-on="scope.itemEvents"
            >
            <q-item-section>
              <q-item-label  v-html="scope.opt.label"></q-item-label>
            </q-item-section>
            <!-- <q-item-section side>
              <q-checkbox v-model="bind_value" @update:model-value ="handleChange" :val="scope.opt.value"></q-checkbox>
            </q-item-section> -->
          </q-item>
        </template>
        <template v-slot:no-option>
<q-item>
<q-item-section class="text-italic text-grey">
No options slot
</q-item-section>
</q-item>
</template>

 <!-- :rules="componentBehavior.rules" -->
   <!-- <template v-slot:no-option>
       <q-item>
            <q-item-section class="text-grey">
                No Business Categories Found
            </q-item-section>
        </q-item>
    </template>
    <template v-slot:selected-item="scope">
        {{ scope.opt.label }}
    </template> -->
</q-select>
</template>

<script>
import { QSelect } from 'quasar'
import $ from 'jquery'

export default {
    data()
    {
        return{
            bind_value: this.pass_value ? this.pass_value : [],
            // bind_value: this.pass_value,
            filterOptions: this.options,
            stringOptions: this.options,
            all: false
        }
    },
    props: ['pass_value', 'options', 'placeholder','label', 'id', 'name','componentBehavior','no_label'],
    methods: {
      selectAll(v){
           if (v == 'selectAll'){
             // this.all = true;
              this.bind_value = this.filterOptions.filter(v => v.label !== 'Select All').map(i => i.value)
             // console.log(this.bind_value)
              this.handleChange();
              return
           }
          this.profileCleared();
      },
        handleChange (newVal) {
         // console.log(newVal)
           this.$nextTick(()=>{
              newVal = this.bind_value;
            console.log(this.bind_value.length);
            this.$emit('receiveChange', newVal)
           });

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
                    // this.filterOptions = this.stringOptions.filter(
                    //     v => v.toString().toLowerCase().indexOf(needle) > -1
                    // )
                }
            })
        },
      profileCleared (v) {
    //  if(v == 'clear'){
         this.bind_value = [];
     this.handleChange();
      this.all = false;
    //  }
    //  console.log(v);

    },
    },
    components: {
        QSelect
    },
    mounted() {

    },
    watch: {
        options(newVal){
            this.stringOptions = newVal
        },

        //  pass_value(newVal)
        // {

        //      if(this.stringOptions.length ==  newVal.length){
        //          this.all = true
        //      }
        //     // if(this.all = false) {
        //     //   this.bind_value = [];
        //     // }
        //       this.bind_value = newVal;
        // },



    }
}
</script>

<style scoped>
.q-field
{
    padding-top:0px;
    padding-left:0px;
    padding-right:0px;
    padding-bottom:0px;
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

/* when hover on text input */
.q-field--filled >>> .q-field__control:before {
    background: white;
    /* border-bottom: 1px solid rgba(0, 0, 0, 0.42);
    opacity: 0;
    transition: opacity 0.36s cubic-bezier(0.4, 0, 0.2, 1), background 0.36s cubic-bezier(0.4, 0, 0.2, 1); */
}

* >>> .q-field__control
{
     background: white;
     max-height: 35px;
     overflow: auto;
     border-radius: 0px;
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

/* * >>> .q-field__control-container
{
    padding-top: 0px !important;
} */

/* readonly field*/
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

/*make select dropdown bottom line blue color*/
* >>> .q-field--filled .q-field__control:after
{
    color: white !important;
}
</style>
