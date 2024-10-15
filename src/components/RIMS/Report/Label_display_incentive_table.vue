<template>
<div class="row" style="margin:2px;margin-right:5px;">
    <div class="col-xs-4">
        <Label text="Outlet" style="text-align:center;background-color:white;" />
    </div>
    <div class="col-xs-8">
        <Label text="Amount / Percent" style="text-align:center;" />
    </div>
    <!-- <div class="col-xs-2">
        <Label text="Percentage" style="margin-right:3px;text-align:center;padding-right:10px;" />
    </div>
    <div class="col-xs-2">
        <Label text="Remark" style="margin-right:3px;text-align:center;" />
    </div>
    <div class="col-xs-2">
        <Label text="Add-on" style="text-align:center;" />
    </div> -->
</div>

<div class="row" style="margin:2px;" v-for="details in json_container.prefix1.value" :key="details">
    <!-- {{json_container.prefix1.value}} -->
    <!-- {{json_container}} -->
    <div class="col-4">
        <Label class="label_title" style="word-break: break-word;" :text="details.code" />
    </div>
    <!-- <div class="col8" style="text-align:right;">
        <Basiclabel :text="formatlabel(json_container)" style="margin-right:3px;padding-right:10px;" />
    </div> -->
    <div class="col-8" style="text-align:right;">
        <Basiclabel :text="formatpercentage(details)" style="margin-right:3px;padding-right:10px;" />
    </div>
</div>
</template>

<script>
import Label from 'src/components/RIMS/Base/Label';
import Basiclabel from 'src/components/Base/Label';
// import Input from 'src/components/RIMS/Base/Input';

export default {
    name: "Label_display_incentive_table",
    data() {
        return {
            json_container: this.json,
        };
    },
    props: ['json'],
    computed: {

    },
    components: {
        Label,
        Basiclabel
    },
    methods: {
        formatlabel(val) {
            var returnval = ''
            if (val.label == 'Unfulfilled Penalty') {
                returnval = '   i. ' + val.label
            } else if (val.label == 'Lost of Profit Penalty') {
                returnval = '   ii. ' + val.label
            } else if (val.label == 'Lead Time Penalty') {
                returnval = '   i. ' + val.label
            }
            else if ((val.field == 'target_growth_tier1')) {

                // var json_object = val.prefix4.options;
                // var string = '';
                // Object.keys(json_object).forEach((key,header) => {
                //     string += json_object[key].value+',';
                // });
                // var string = string.replace(/,\s*$/, "");
                // var array = val.prefix4.value.split(",");
                var string = val.prefix4.value.join();
                returnval = '('+val.prefix3.options[0].value+' - '+string+')\n'+val.label;
            } else {
                returnval = val.label
            }
            return returnval
        },
        formatamountdays(val) {
            var returnval = ''
            if (val.component == 'Label_option_input_radio' || val.component == 'Label_option_input' || val.component == 'Label_option_input_radio2') {
                if (val.prefix1.value == 'RM') {
                    for (var temp in val.prefix1.options) {
                        if (val.prefix1.options[temp].value == val.prefix1.value) {
                            if (val.input1 != '' && val.input1 != '0') {
                                returnval = val.prefix1.options[temp].label + ' ' + val.input1
                            } else {
                                returnval = '-'
                            }
                        }
                    }
                } else if (val.prefix1.value == 'Days') {
                    for (var temp in val.prefix1.options) {
                        if (val.prefix1.options[temp].value == val.prefix1.value) {
                            if (val.input1 != '' && val.input1 != '0') {
                                returnval = val.input1 + ' ' + val.prefix1.options[temp].label
                            } else {
                                returnval = '-'
                            }
                        }
                    }
                } else {
                    returnval = '-'
                }
            } else if (val.component == 'Label_option_input_radio_range') {
                if (val.input1 != '' && val.input2 != '' && val.input1 != '0' && val.input2 != '0') {
                    for (var temp in val.prefix1.options) {
                        if (val.prefix1.options[temp].value == val.prefix1.value) {
                            returnval = val.prefix1.options[temp].label + ' ' + val.input1
                        }
                    }
                    for (var temp in val.prefix2.options) {
                        if (val.prefix2.options[temp].value == val.prefix2.value) {
                            returnval += ' to ' + val.prefix2.options[temp].label + ' ' + val.input2
                        }
                    }
                } else {
                    returnval = '-'
                }
            } else if (val.component == 'Label_option_input2') {
                for (var temp in val.prefix2.options) {
                    if (val.prefix2.options[temp].value == val.prefix2.value) {
                        if (val.prefix2.options[temp].label != '' && val.input2 != '0') {
                            returnval = val.prefix2.options[temp].label + ' ' + val.input2
                        } else {
                            returnval = '-'
                        }
                    }
                }
            } else {
                returnval = '-'
            }
            return returnval
        },
        formatpercentage(val) {
            var returnval = ''

            if(val == "")
            {
                var returnval = "-";
            }
            else
            {
                var returnval = val.percent + "%";
            }

            return returnval
        },
        formatremark(val) {
            var returnval = ''
            if (val.component == 'Label_option_input_radio' || val.component == 'Label_option_input_radio_range') {
                for (var temp in val.radio1.options) {
                    if (val.radio1.options[temp].value == val.radio1.value) {
                        if (val.radio1.options[temp].label != '') {
                            returnval = val.radio1.options[temp].label
                        } else {
                            returnval = '-'
                        }

                    }
                }
            } else if (val.component == 'Label_option_input_radio2') {
                for (var temp in val.radio1.options) {
                    if (val.radio1.options[temp].value == val.radio1.value) {
                        if (val.radio1.value == 'ODXD') {
                            if(val.input1 != '' && val.input1 != '0'){
                                returnval = (val.radio1.options[temp].label).replace("X", val.input1)
                            } else {
                                returnval = val.radio1.options[temp].label
                            }
                        } else {
                            if (val.radio1.options[temp].label != '') {
                                returnval = val.radio1.options[temp].label
                            } else {
                                returnval = '-'
                            }
                        }
                    }
                }
            } else if (val.component == 'Label_select_row') {
                for (var temp in val.prefix1.options) {
                    if (val.prefix1.options[temp].value == val.prefix1.value) {
                        if (val.prefix1.options[temp].label != '') {
                            returnval = val.prefix1.options[temp].label
                        } else {
                            returnval = '-'
                        }
                    }
                }
            } else if (val.component == 'Label_option_input2') {
                for (var temp in val.radio1.options) {
                    if (val.radio1.options[temp].value == val.radio1.value) {
                        if (val.radio1.options[temp].label != '') {
                            returnval = val.radio1.options[temp].label
                        } else {
                            returnval = '-'
                        }
                    }
                }
            } else {
                returnval = ''
            }
            return returnval
        },
        formatdaterange(val){
            
            var returnval = ''
            if (val.component == 'Label_option_input2') {

                if(!val.daterange)
                {
                    return '-';
                }

                for (var temp in val.prefix4.options) {
                    if (val.prefix4.options[temp].value == val.prefix4.value) {
                        if (val.prefix4.options[temp].label != '' && val.input1 != '0') {
                            returnval = val.prefix4.options[temp].label
                        } else {
                            returnval = '-'
                        }
                    }
                }
            } else if(val.daterange != undefined) {
                returnval = val.daterange.from + ' - ' + val.daterange.to
            } else {
                returnval = '-'
            }
            return returnval
        }
    },
    watch: {

    }
}
</script>

<style scoped>
.label_title {
    height: 100%;
    word-break: break-all;
}
</style>
