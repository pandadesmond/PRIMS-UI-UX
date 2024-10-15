<template>
<!-- {{model}} -->
<!-- {{bind_value}} -->
<!-- {{all}} -->
<!-- {{checkAll}} -->

<!-- {{filterOptions}} -->

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
        ref="myInput"
        :options="filterOptions"
        v-model="bind_value" 
        class="multiselect"
    >

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
        v-model:pass_value="bind_value" 
        class="multiselect"
    >

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
            this.$emit('receiveChange', newVal)
            this.$emit('update:pass_value', newVal)

            setTimeout(()=>{
                this.$refs.myInput.updateInputValue('');
                this.$refs.myInput.focus();
                this.$refs.myInput.showPopup();
            },100);
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
            this.stringOptions = newVal
            this.filterOptions = newVal
        },
        pass_value(newVal)
        {
            if(this.stringOptions.length == newVal.length)
            {
                this.all = true;
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

