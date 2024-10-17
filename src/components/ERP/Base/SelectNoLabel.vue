<template>
  <SelectBase :id="id" :name="name" :no_label="no_label" v-model="pass_value" :options="options" :componentBehavior="dbComponentBehavior" class="custom-select"/>
</template>

<script>
import SelectBase from 'src/components/ERP/Base/SelectBase';

export default {
  data() {
      return {
          pass_value: this.value,
      };
  },
  props: ['value', 'options', 'id', 'name','dbComponentBehavior', 'no_label'],
  components: {
      SelectBase
  }
}
</script>

<style scoped>
.q-field--auto-height.q-field--dense >>>.q-field__control {
  min-height: 32px;
}
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
  /* border: 1px solid #d2d6de; */
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
* >>> .q-field__control {
  border-radius: 8px;
  padding: 0px 16px !important;
  height: 32px;
  /* background-color: antiquewhite; */
}
*.q-field--square >>>.q-field__control {
    /* border-radius: 8px !important; */
}
.q-field--dense >>>.q-field__marginal {
    height: 32px;
}
*>>>.q-field--auto-height.q-field--dense .q-field__control {
    min-height: 32px;
}
</style>
