<template>
    <TextareaBase :readonly="readonly ? true : false" :id="id" :name="name"
    :value="pass_value" :componentBehavior="dbComponentBehavior" :pass_label="pass_label" outline class="custom-textarea"/>
</template>

<script>
import TextareaBase from 'src/components/ERP/Base/TextareaBase';

export default {
    data() {
        return {
            pass_value: this.value,
        };
    },
    props: ['text', 'value', 'dbComponentBehavior', 'id', 'name', 'type','readonly','pass_label'],
    components: {
        TextareaBase,
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
.q-field--outlined.q-field--readonly >>>.q-field__control:before {
    border-style: solid;
}
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

/* * >>> .q-field__inner
{
    border-radius: 8px;
    border: 2px solid #E8E8E8;
    background: #FFF;
} */
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
    background: #ededed;
    border-bottom-style: none;
}

* >>> .q-field--filled .q-field__control:before {
    background: white !important;
}

/*make input field smaller*/
* >>> .q-field__control {
  background-color: white !important;
  min-height: 77px !important;
  height: 90px !important;
  padding: 16px 16px var(--Variant-2, 16px) 16px;
}
*>>>.q-field__prefix {
    padding-right: 0px;
}

@media screen and (min-width: 600px) {
  * >>> .q-field__native{
    padding: 0px;
    margin-top: -10px;
    min-height: 60px !important;
    height: 60px !important;
    padding-top: 10px !important;
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    font-family: InterfontMedium;
  }
  * >>> .q-field__label
{
  /* top: 10px !important; */
  font-size: 16px;
  font-weight: 500;
  color: var(--Placeholder, #72777A);
  font-family: InterfontMedium;
}
}

@media screen and (max-width: 599px) {
  * >>> .q-field__native{
    padding: 0px;
    min-height: 75px !important;
    height: 75px !important;
    padding-top: 10px !important;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    font-family: InterfontMedium;
  }
  * >>> .q-field__label
{
  /* top: 10px !important; */
  font-size: 12px;
  font-weight: 500;
  color: var(--Placeholder, #72777A);
  font-family: InterfontMedium;
}
}


.custom-textarea >>> .q-field__control {
  border-radius: 8px;
  padding: 0px 16px !important;
  /* background-color: antiquewhite; */
  overflow: hidden;
  background: white;
  height: 56px;
}
</style>
