<template>
    <Datepicker :pass_disabled="bind_disabled" :autoclose="autoclose" :daterange="daterange" :componentBehavior="dbComponentBehavior" />
</template>

<script>
import Datepicker from 'src/components/Base/Datepicker';

export default {
    data (){
        return{
            bind_disabled: this.pass_disabled,
        }
    },
    props: ['daterange', 'dbComponentBehavior', 'autoclose', "pass_disabled"],
    components: {
        Datepicker,
    },
    watch: {
        pass_disabled(newVal)
        {
            this.bind_disabled = newVal;
        }
    }
}
</script>

<style scoped>
/* For text input padding removal */
.q-field
{
    padding-top:0px;
    padding-left:0px;
    padding-right:0px;
    padding-bottom:0px;
}

.q-field--error
{
    padding-bottom:20px;
}

* >>> .q-field__inner
{
    border: 1px solid #d2d6de;
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

/* when hover on text input */
.q-field--filled >>> .q-field__control:before {
    background: white;
    /* border-bottom: 1px solid rgba(0, 0, 0, 0.42);
    opacity: 0;
    transition: opacity 0.36s cubic-bezier(0.4, 0, 0.2, 1), background 0.36s cubic-bezier(0.4, 0, 0.2, 1); */
}
</style>