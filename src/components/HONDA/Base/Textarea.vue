<template>
    <Textarea :readonly="readonly ? true : false" :id="id" :name="name" 
    :value="pass_value" :componentBehavior="dbComponentBehavior"/>
</template>

<script>
import Textarea from 'src/components/Base/Textarea';

export default {
    data() {
        return {
            pass_value: this.value,
        };
    },
    props: ['text', 'value', 'dbComponentBehavior', 'id', 'name', 'type','readonly'],
    components: {
        Textarea,
    },
    methods:{
    },
    watch:{
        value(newVal)
        {
            this.pass_value = newVal;
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
* >>> .q-field--filled >>> .q-field__control:before {
    background: white;
    /* border-bottom: 1px solid rgba(0, 0, 0, 0.42);
    opacity: 0;
    transition: opacity 0.36s cubic-bezier(0.4, 0, 0.2, 1), background 0.36s cubic-bezier(0.4, 0, 0.2, 1); */
}


/* readonly field*/
.q-field--filled.q-field--readonly >>> .q-field__control:before {
    opacity: 1;
    background: #ccc;
    border-bottom-style: none;
}

* >>> .q-field--filled .q-field__control:before {
    background: white !important;
}


/*make input field smaller*/
* >>> .q-field__control {
    background-color: aliceblue !important;
    min-height: 100px !important;
    height: 100px !important;
    border-radius: 0px;
}


* >>> .q-field__native
{
    padding: 0px;
    min-height: 100px !important;
    height: 100px !important;
}
</style>