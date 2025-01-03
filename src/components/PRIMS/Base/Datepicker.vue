<template>
    <DatepickerBase outlined :daterange="daterange" :componentBehavior="dbComponentBehavior" class="custom-inputDate"/>
</template>

<script>
import DatepickerBase from 'src/components/ERP/Base/DatepickerBase';

export default {
    props: ['daterange', 'dbComponentBehavior'],
    components: {
        DatepickerBase,
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
    /* font-size: 16px !important; */
}

.q-field--error
{
    padding-bottom:20px;
}

/* remove the double outlined of date input */
* >>> .q-field__inner
{
    /* border: 1px solid #d2d6de; */
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
/* .q-field--outlined .q-field__control {
    border-radius: 8px;
    padding: 0 12px;
    border: 1px solid #E8E8E8;
    background: #FFF;
    
} */
/* add space on top of label */


.custom-inputDate >>> .q-field__control {
  /* border-radius: 8px; */
  /* padding: 0px 16px !important; */
  /* background-color: antiquewhite; */
  /* overflow: hidden; */
  height: 32px;
}

@media (max-width: 599px) {
    .q-field--outlined.q-field--disabled >>>.q-field__control:before {
    border: 2px solid rgba(0, 0, 0, 0.24);
}
    /* .q-field--outlined >>>.q-field__control:before {
    border: 0px solid rgba(0, 0, 0, 0.24);
    transition: border-color 0.36s cubic-bezier(0.4, 0, 0.2, 1);
} */
    
    .q-field--labeled >>>.q-field__native{
        padding-top: 18px;
        padding-bottom: 8px !important;
        line-height: 24px;
    }
    .q-field--labeled.q-field--dense >>>.q-field__native {
  padding-top: 18px;
  padding-bottom: 8px !important;
  line-height: 24px;
}
    .q-field--dense.q-field--float >>>.q-field__label {
    transform: translateY(-30%) scale(0.75);
    font-size: 12px !important;
}
  .custom-inputDate >>> .q-field__control {
    height: 40px !important;
  }
  * >>> .q-field__label
{
  top: 10px;
  color: #535151;
  /* background-color: antiquewhite; */
  font-size: 12px !important;
  font-style: normal;
  font-weight: 500;
  font-family: InterfontMedium;
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
}

@media (min-width: 600px) {
    .q-field--outlined.q-field--disabled >>>.q-field__control:before {
    border: 1px solid rgba(0, 0, 0, 0.24);
}
    *>>>.q-field__marginal {
    height: 32px;
    color: rgba(0, 0, 0, 0.54);
    font-size: 24px;
}
    .q-field--labeled >>>.q-field__native {
    line-height: 24px;
    padding-top: 17px;
    padding-bottom: 8px;
}
     /* .q-field--outlined >>>.q-field__control:before {
    border: 0px solid rgba(0, 0, 0, 0.24);
    transition: border-color 0.36s cubic-bezier(0.4, 0, 0.2, 1);
} */
    .q-field--labeled.q-field--dense >>>.q-field__native {
  padding-top: 24px;
  padding-bottom: 8px !important;
  line-height: 24px;
}
    .q-field--dense >>>.q-field__marginal {
    height: 32px !important;
}
    * >>> .q-field__label
{
  top: 10px;
  color: #535151;
  /* background-color: antiquewhite; */
  font-size: 15px !important;
  font-style: normal;
  font-weight: 500;
  font-family: InterfontMedium;
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
    
}
</style>
