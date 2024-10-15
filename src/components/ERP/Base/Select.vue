<template>
    <Select :id="id" :name="name" v-model="pass_value" :options="options" :componentBehavior="dbComponentBehavior"/>
</template>

<script>
import Select from 'src/components/Base/Select';

export default {
    data() {
        return {
            pass_value: this.value,
        };
    },
    props: ['value', 'options', 'id', 'name','dbComponentBehavior'],
    components: {
        Select
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
    border: 1px solid #d2d6de;
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

@media screen and (min-width: 600px) {
  * >>> .q-field__native
  {
    margin-top: -8px;
  }
}
</style>
