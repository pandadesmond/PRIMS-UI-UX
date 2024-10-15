<template>
    <Radio :disable="disable" :class= "[options.length > 1 ? 'half_width' : '']" :options="options"/>
</template>

<script>
import Radio from 'src/components/Base/Radio';

export default {
    props: ["options","disable"],
    components: {
      Radio
    }
}
</script>

<style scoped>
/*radio button div padding*/
.q-option-group >>> div
{
    /* background-color: yellow; */
    margin-left: 0px;
}

/*radio button div padding when more only 1 options*/
.q-option-group >>> div
{
    /* background-color: yellow; */
    width: 100%;
}

.q-option-group >>> div > .q-radio, .q-option-group.test >>> div > .q-radio > .q-radio__label
{
    width: 50%;
}


/*when more than 1 options ----------------------------*/
.q-option-group.half_width >>> div
{
    /* background-color: yellow; */
    width: 50%;
}

.q-option-group.half_width >>> div > .q-radio, .q-option-group.half_width >>> div > .q-radio > .q-radio__label
{
    width: 100%;
}
/*when more than 1 options ----------------------------*/


/* wrapper around radio box*/
.q-option-group
{
    padding-left:8px;
}

/* radio label container*/
* >>> .q-radio
{
    height: 42px;
    padding-left: 5px;
    padding-right: 5px;
    font-weight: bold;
    border: 1px solid #d2d6de;
    /* min-width: 200px; */
}

/* active radio div*/
* >>> .q-radio[aria-checked="true"]
{
    background-color: #094161;
    border: 1px solid #094161;
    color: white;
}

/* not active radio label*/
* >>> .q-radio[aria-checked="false"]
{
    background-color: white;
}

/*hide the checkbox icon*/
* >>> .q-radio__inner
{
    display: none;
    background-color: green;
}

* >>> .q-radio__label
{
    width: 100%;
    text-align: center;
}

@media only screen and (max-width: 	1023px) {
    .q-option-group >>> div > .q-radio, .q-option-group.test >>> div > .q-radio > .q-radio__label
    {
        width: 100%;
    }
}

</style>