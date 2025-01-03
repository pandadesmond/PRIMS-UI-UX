<template>
    <SelectBase :id="id" :name="name" v-model="pass_value" :options="options" :componentBehavior="dbComponentBehavior" class="custom-select"/>
</template>

<script>
import SelectBase from 'src/components/ERP/Base/SelectBase';

export default {
    data() {
        return {
            pass_value: this.value,
        };
    },
    props: ['value', 'options', 'id', 'name','dbComponentBehavior'],
    components: {
        SelectBase
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
}

.q-field--error
{
    padding-bottom:20px;
}

/* For text input border colour */
* >>> .q-field__inner
{
    /*border: 1px solid #d2d6de;*/
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
@media (max-width: 599px) {
    .q-field--dense >>>.q-field__marginal {
    height: 40px !important;
}
    .q-field--dense.q-field--float >>>.q-field__label {
    transform: translateY(-30%) scale(0.75);
    font-size: 12px !important;
}
    .q-field--auto-height.q-field--labeled >>> .q-field__control-container {
    padding-top: 10px !important;
}
  .custom-select >>> .q-field__control {
    height: 40px !important;
    /* padding: 6px 16px !important; */
  }
  *>>>.q-field__native {
    /* min-height: 50px !important; */
    /* height: 50px !important; */
    /* height: 150px; */
    /* padding-top: 20px !important; */
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    font-family: InterfontMedium;
    /* background-color: #ffc6cd; */
}
* >>> .q-field__label
{
  margin-top: 5px;
  color: #535151;
  /* background-color: antiquewhite; */
  font-size: 12px !important;
  font-style: normal;
  font-weight: 500;
  font-family: InterfontMedium;
}
}
@media screen and (min-width: 600px) {
    .q-field--dense >>>.q-field__marginal {
    height: 42px !important;
}
    .q-field--float >>>.q-field__label {
    transform: translateY(-30%) scale(0.75);
    /* font-size: 12px !important; */
    padding-top: 0px !important;
}
  * >>> .q-field__native
  {
    /* margin-top: -8px; */
    /* background-color: aqua; */
  }
  .q-field--auto-height.q-field--labeled >>> .q-field__control-container {
  padding-top: 17px;
  padding-bottom: 8px;
  line-height: 24px;
}
*>>>.q-field__native {
    /* min-height: 50px !important; */
    /* height: 50px !important; */
    /* height: 150px; */
    /* padding-top: 20px !important; */
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    font-family: InterfontMedium;
    /* background-color: #ffc6cd; */
}
* >>> .q-field__label
{
  top: 10px !important;
  color: #535151;
  /* background-color: antiquewhite; */
  font-size: 16px !important;
  font-style: normal;
  font-weight: 500;
  font-family: InterfontMedium;
}
}
.custom-select >>> .q-field__control {
  border-radius: 8px !important;
  padding: 0px 16px !important;
  /* background-color: antiquewhite; */
  overflow: hidden;
  background: white;
  height: 42px;
}


*>>>.q-select .q-field__input {
    /* min-width: 50px !important; */
    cursor: text;
}
</style>
