<template>
<!-- {{model}} -->
<!-- {{bind_value}} -->
<!-- {{all}} -->
<!-- {{checkAll}} -->
    <q-select v-if="!no_label"
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
        @filter="filterFn"
        @update:model-value  ="handleChange"
        @popup-hide="handlePopupHide"
        ref="myInput"
        :options="filterOptions"
        v-model="bind_value" 
        class="multiselect"
    >
<!-- v-on:update:model-value  ="profileSelected" -->    
<!-- :label="componentBehavior.label" -->
<!-- :rules="componentBehavior.rules" -->
<!-- v-model="pass_value" -->
     <template #before-options>
          <q-item            
          >
            <q-item-section>
              <q-item-label>Select All</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-checkbox v-model="all" @update:model-value="checkAll"></q-checkbox>
            </q-item-section>
          </q-item>
        </template>

    <template v-slot:option="scope">
          <q-item
            v-bind="scope.itemProps"
            v-on="scope.itemEvents"
            
            >
            <q-item-section>
              <q-item-label v-html="scope.opt.label"></q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-checkbox v-model="bind_value" @update:model-value ="handleChange" :val="scope.opt.value"></q-checkbox>
            </q-item-section>
          </q-item>
        </template>
        <!-- <template v-slot:append>
        <q-icon name="close" @click.stop="profileCleared" class="cursor-pointer" />
    </template> -->

</q-select>

    <q-select v-else
        dense
        options-dense
        filled
        multiple   
        style="width: 250px"
        option-value="value"
        option-label="label"   
        emit-value 
        map-options
        use-chips
        use-input
        input-debounce="0"
        @filter="filterFn"
        @update:model-value ="handleChange"
        ref="myInput"
        :options="filterOptions"
        v-model="bind_value" 
        class="multiselect"
    >

    <!-- v-model:pass_value="bind_value" change to v-model="bind_value" due to front multiple select when default prop value incorrect. it show value instead label. show infront add no_label = "true to make it flow into this select block"   -->
  <!-- v-on:update:model-value  ="profileSelected" -->   
 <!-- :rules="componentBehavior.rules" -->    
<!-- v-model="pass_value" -->
        <template #before-options>
          <q-item
          
          >
            <q-item-section>
              <q-item-label>Select All</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-checkbox v-model="all" @update:model-value="checkAll"></q-checkbox>
            </q-item-section>
          </q-item>
        </template>

     <template v-slot:option="scope">
          <q-item
            v-bind="scope.itemProps"
            v-on="scope.itemEvents"
            
            >
            <q-item-section>
              <q-item-label v-html="scope.opt.label"></q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-checkbox v-model="bind_value" @update:model-value ="handleChange" :val="scope.opt.value"></q-checkbox>
            </q-item-section>
          </q-item>
        </template>
        <!-- <template v-slot:append>
        <q-icon name="close" @click.stop="profileCleared" class="cursor-pointer" />
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
            filterOptions: this.options,
            stringOptions: this.options,
            all:false,
            // bind_value: [],
            bind_value: this.pass_value,
        }
    },
    props: ['pass_value', 'options', 'label', 'id', 'name','componentBehavior','no_label', 'value'],
    
    methods: {
        handlePopupHide()
        {
            this.$emit('receivePopupHide');
        },
        checkAll (v) {
        
        if (v) {
            console.log('check', v)
            
            this.bind_value = this.filterOptions.filter(v => v.label !== 'Select All').map(i => i.value)
//             var bind_value = [];
// console.log(this.filterOptions)
//             Object.keys(this.filterOptions).forEach((index)=>{

//                 var bind_value_object = {}
//                 bind_value_object.label = this.filterOptions[index].label;
//                 bind_value_object.value = this.filterOptions[index].value;
//                 bind_value.push(bind_value_object);
//                 console.log("test:", bind_value)
//             });

//             this.bind_value = bind_value
//             console.log('test');
//             console.log(bind_value);
            this.handleChange()
            return
        }
        this.bind_value = []
        },

        // profileSelected (newVal) {
          
        //     this.$emit('receiveChange', newVal)
       
        //     this.$emit('update:pass_value', newVal)
        // if (this.bind_value.length == this.filterOptions.length) {
        //     this.all = true
        // } else {
        //     this.all = false
        // }
        
        // },

        // profileCleared () {
        // this.all = false
        // this.bind_value = []
        // this.profileSelected()
        // },     

        handleChange (newVal) {
            // this.$refs.myInput.hidePopup();
            
            // this.$refs.myInput.updateInputValue('');
            
            // console.log(this.bind_value)
            // console.log(this.bind_value.length)
            // console.log(this.filterOptions.length)

            if (this.bind_value.length == this.filterOptions.length) {
                if(this.all = true){
                    var newVal = this.bind_value;
                //     var newVal = {}
                //     var bind_value = []
                
                //     Object.keys(this.bind_value).forEach((index)=>{

                //     var bind_value_object = {}
                //     bind_value_object.label = this.bind_value[index];
                //     bind_value_object.value = this.bind_value[index];
                //     bind_value.push(bind_value_object);
                //     // console.log("test:", bind_value)
                // });
                // newVal= bind_value
                // console.log('new:', newVal)
                // // this.bind_value = newVal
                }
                this.all = true 
            } else {
                this.all = false              
            }

            this.$emit('receiveChange', newVal)
            this.$emit('update:pass_value', newVal)
            // setTimeout(()=>{
            //     this.$refs.myInput.updateInputValue('');
            //     this.$refs.myInput.focus();
            //     this.$refs.myInput.showPopup();
            // },100);
            
            // $('.q-field__input').css('background-color','red');
            // $('.q-field__input').focus();
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
        }
    },
    components: {
        QSelect
    },
    mounted() {
    },
    watch: {
        options(newVal){
            this.stringOptions = newVal;
            //added in due to label not display. it display value instead. So in mulitple mode maybe because options only promp in after click on dropdown that trigger options inside
            this.filterOptions = newVal;
        },
        pass_value(newVal)
        {
            if(this.stringOptions.length == newVal.length)
            {
                if(newVal.length <= 0)
                {
                    this.all = false;
                }
                else
                {
                    this.all = true;
                }
                
            }

            this.bind_value = newVal;
        },
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
/* * >>> .q-field__inner
{
    border: 1px solid #d2d6de;
} */

.q-field--filled >>> .q-field__control:before {
    background: white;
    border-bottom: transparent;
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
    max-height: 70px;
    overflow: auto;
    border-radius: 0px;
}

/* .q-field--filled .q-field__control:before {
    background: rgba(0, 0, 0, 0.05);
    border-bottom: 1px solid rgba(0, 0, 0, 0.42);
    opacity: 0;
    transition: opacity 0.36s cubic-bezier(0.4, 0, 0.2, 1), background 0.36s cubic-bezier(0.4, 0, 0.2, 1);
} */


</style>

