<template>
    <Checkbox :class="[checkboxClass,checkbox == true ? 'checkbox' : table == true ? 'table' : btm_padding ? 'btm_padding' : '',
                disable ? (pass_value === 1 ? 'custom_truthcheckbox' : 'custom_checkbox_disabl') : '']" 
                :disable="disable ? true : false" :readonly="readonly" :id="id" :name="name"
                v-on:receiveChange="handleChange" :value="pass_value" :size="size" :color="color" class="checkbox_false"/> <!--class="checkbox_false" checkboxClass,{ disabled: readonly }-->
</template>

<script>
import Checkbox from 'src/components/Base/Checkbox';

export default {
    data() {
        return {
            pass_value: this.value,
        };
    },
    props: ['value','readonly','disable','checkbox','table','btm_padding','color','size'],
    components: {
        Checkbox,
    },
    // computed: {
    //     checkboxClass() {
    //   if (this.disable) {
    //     return this.pass_value === 1 ? 'custom_truthcheckbox' : 'custom-checkbox_disabl';
    //   }
    //   return '';
    // },
    // },
    methods:{
        handleChange: function(newVal){
            // var temp_json = [];
            // this.bind_value = "dadas"
            // this.$emit('update:pass_value', newVal)
            // temp_json.push({"tab":"supplier_profile","seq":"2","value":this.json_container});
            this.$emit('update:value',newVal)
            this.$emit('receiveChangenewVal',newVal)
        }
    },
    watch:{
        value(newVal)
        {
            this.pass_value = newVal;
        },
    },
}
</script>

<style scoped>
.checkbox
{
  padding-bottom: 1px;
  margin-left: -10px;
  margin-right: -10px;
  margin-top: -5px;
  margin-bottom: -5px;
}

.table
{
  margin-left: -10px;
  margin-right: -10px;
  margin-top: -10px;
  margin-bottom: -10px;
}

.btm_padding
{
  padding-bottom: 4px;
  margin-top: -4px;
}
*>>>.q-checkbox__bg {
    border-radius: 4px;
    /* border: 2px solid #BABABA; */
}

/* *.custom_truthcheckbox.disabled >>>.q-checkbox__bg {  
  border: none;
  background: #1E90FF;  
}
*.custom-checkbox_disabl.disabled >>>.q-checkbox__bg {  
  border: 2px solid #969696 ; 
  background: #C8C8C8;  
} */
*.custom_truthcheckbox.disabled >>> .q-checkbox__bg {  
  border: none !important;
  background: #1E90FF !important;  
}

*.custom_checkbox_disabl.disabled >>> .q-checkbox__bg {  
  border: 2px solid #969696; 
  background: #C8C8C8;  
}

 /* .custom-checkbox_disabl {  
  border: 2px solid #969696 ; *#BABABA*
  background: #C8C8C8;  
}
.custom_truthcheckbox {  
  border: none;
  background: #1E90FF;  
} */

*.checkbox_false >>>.q-checkbox__truthy {
    stroke: #fff;
    stroke-width: 3.12px;
    stroke-dashoffset: 29.78334;
    stroke-dasharray: 29.78334;
}  

/* checked disabled */
*.checkbox_false >>>.q-checkbox__inner--truthy path {
    stroke-dashoffset: 0;
    transition: stroke-dashoffset .18s cubic-bezier(.4,0,.6,1) 0ms;
    /* background: #1E90FF; */
}

*.checkbox_false >>>.q-checkbox__inner--truthy, .q-checkbox__inner--indet {
    color: var(--q-primary);
}
/* .custom-checkbox2 >>> .q-checkbox--disabled .q-checkbox__bg {
  background: #f89494 !important;
  border: 2px solid #db0404 !important;
}

.custom-checkbox2 >>> .q-checkbox--disabled .q-checkbox__inner {
  background-color: #e98e8e !important;
} */
</style>