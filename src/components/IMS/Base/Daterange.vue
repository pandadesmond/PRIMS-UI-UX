<template>
    <Daterange :daterange="daterange" :componentBehavior="dbComponentBehavior" />
</template>

<script>
import Daterange from 'src/components/Base/Daterange';

export default {
    props: ['daterange', 'dbComponentBehavior'],
    components: {
        Daterange,
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
.q-field >>> .q-field__native {
  /* padding: 0px;
  max-height: 29px; */
  white-space: pre-wrap;
  display: block;
  max-width: 100%;
  word-wrap: break-word;

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

/* disable field*/
.q-field--filled.q-field--disabled >>> .q-field__control:before {
    opacity: 1;
    background: #ededed;
    border-bottom-style: none;
}

</style>
