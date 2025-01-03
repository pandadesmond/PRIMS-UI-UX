<template>
    <div class="row" style="align-items: center;">
        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12">
            <Label :pass_value="label"/>
        </div>
        <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-xs-12">
            <InputBase
                v-if="password_input"
                :type="isPwd ? 'password' : 'text'"
                v-model="value"
                :icon_append="eyes_display"
                v-on:password_method="passwordMethod()"
                v-on:receiveChange="handleChange"
                :componentBehavior="componentBehavior.text"
              />
            <Input
                v-else
                v-model:pass_value="value"
                v-on:receiveChange="handleChange"
                v-on:receiveClick="handleClick"
                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior : componentBehavior.text"
                :outlined="true"
                :readonly="readonly"
            />
        </div>
    </div>
</template>

<script>
import Label from 'src/components/PRIMS/Main/Label'
import Input from 'src/components/PRIMS/Main/Input'
import InputBase from 'src/components/PRIMS/Base/InputBase';

export default {
    props:['label', 'dbComponentBehavior', 'pass_value', 'readonly', 'password_input'],
    data(){
        return {
            value: this.pass_value,
            isPwd: true,
        }
    },
    components: {
        Label,
        Input,
        InputBase,
    },
    computed: {
        componentBehavior() {
            return this.$store.getters['dbComponentBehavior/byLanguage']('tta')
        },
        eyes_display: function () {
            return this.isPwd ? "visibility_off" : "visibility";
        },
    },
    methods:{
        handleClick()
        {
          this.$emit('receiveClick');
        },
        handleChange: function(newVal){
            this.$emit('update:pass_value', newVal)
            this.$emit('receiveChange', newVal);
        },
        passwordMethod: function () {
            this.isPwd = !this.isPwd;
        },
    },
    watch: {
        pass_value(newVal){
            this.value = newVal;
        },
    },
}
</script>

<style scoped>
* >>> .q-field__append, .q-field__control-container
{
    height: 32px;
}
* >>> .q-field__control
{
    padding-left: 6px;
    padding-right: 6px;
    padding-top: 0px;
    padding-bottom: 0px;
    height: 32px;
}
.q-field {
    padding-top: 0px;
    padding-left: 0px;
    padding-right: 0px;
    padding-bottom: 0px;
    background-color: white;
}

.q-field--labeled >>>.q-field__native {
    line-height: 24px;
    padding-top: 0px;
    padding-bottom: 0px;
}

* >>> .q-field--error
{
    padding-bottom: 5px;
}
</style>
