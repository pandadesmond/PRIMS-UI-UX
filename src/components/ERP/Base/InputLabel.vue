<template>
  <InputBase
    :icon_append="icon_append"
    @keyup="handleKeyUp"
    :no_label="no_label"
    autocomplete="off"
    :readonly="readonly ? true : false"
    :id="id"
    :name="name"
    v-on:change="handleChange"
    v-model="bind_value"
    :componentBehavior="dbComponentBehavior ? dbComponentBehavior : oridbComponentBehavior.text"
    :label="dbComponentBehavior.label"
    class="full-width-input custom-input"
  />
</template>

<script>
import InputBase from "src/components/ERP/Base/InputBase";
import { colors } from "quasar";

export default {
  data() {
    return {
      bind_value: this.pass_value,
      inputClasses: ["custom-input"], // Example CSS classes
      inputStyles: {
        // padding: "5px", // Example padding
        fontSize: "16px", // Example font size
        // height: "60px",
        // backgroundColor: "lightblue",
      },
    };
  },
  props: [
    "text",
    "value",
    "dbComponentBehavior",
    "id",
    "name",
    "type",
    "readonly",
    "icon_append",
    "pass_value",
    "no_label",
    "long_label",
    "longer_label",
  ],
  // props: {
  //   text: String,
  //   value: [String, Number],
  //   dbComponentBehavior: Object,
  //   id: String,
  //   name: String,
  //   type: String,
  //   readonly: Boolean,
  //   icon_append: String,
  //   pass_value: [String, Number],
  //   no_label: Boolean,
  //   long_label: Boolean,
  //   longer_label: Boolean,
  // },
  computed: {
    oridbComponentBehavior() {
      return this.$store.getters['dbComponentBehavior/byLanguage']('erp');
    },
  },
  components: {
    InputBase,
  },
  methods: {
    handleChange(newVal) {
      this.$emit('update:pass_value', newVal);
      this.$emit('receiveChange', newVal);
    },
    handleKeyUp(newVal) {
      this.$emit("handlekeyup", newVal);
    }
  },
  watch: {
    pass_value(newVal) {
      this.bind_value = newVal;
    }
  }
};
</script>


<style scoped>
/* For text input padding removal */
.q-field {
  padding-top: 0px;
  padding-left: 0px;
  padding-right: 0px;
  padding-bottom: 0px;
  /* background: white; */

}

.q-field--error {
  padding-bottom: 20px;
}

* >>> .q-field__inner {
  /* border: 3px solid #2c8d3c; */
}
[data-v-505a4168] .q-field__inner {
  border: none !important;
}
/* hide error message when no error validation*/
.q-field >>> .q-field__bottom {
  display: none;
}

.q-field--error >>> .q-field__bottom {
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

/* readonly field*/
.q-field--filled.q-field--readonly >>> .q-field__control:before {
  opacity: 0;
  background: #ededed;
  border-bottom-style: none;
}

/* disable field*/
.q-field--filled.q-field--disabled >>> .q-field__control:before {
  opacity: 0;
  background: #ededed;
  border-bottom-style: none;
}

.full-width-input {
  width: 100%; /* Make the input full width */
}
*>>> .q-field--labeled .q-field__native, .q-field--labeled .q-field__prefix, .q-field--labeled .q-field__suffix {
    /* line-height: 32px; */
    padding-top: 30px;
    padding-bottom: 8px;
    align-items: center;
    justify-content: center;
}
*>>> .q-field__native .q-placeholder {
    padding-top: 0px;
}
/* padding for label */
/* *>>> .q-field__label {
    
    padding: 6px 16px;
} */
/* .q-field--float .q-field__label */

*>>>.q-field__native {
    /* min-height: 50px !important; */
    /* height: 50px !important; */
    /* height: 150px; */
    padding-top: 20px !important;
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    font-family: InterfontMedium;
    /* background-color: #ffc6cd; */
}
* >>> .q-field__label
{
  top: 5px;
  color: #535151;
  /* background-color: antiquewhite; */
  font-size: 12px !important;
  font-style: normal;
  font-weight: 500;
  font-family: InterfontMedium;
}

*>>>.q-field__marginal {
    height: 32px !important;
    color: rgba(0, 0, 0, 0.54);
    font-size: 24px;
}

@media screen and (min-width: 600px) {
  .q-field--float >>>.q-field__label {
    top: 10px !important;
  }
  .custom-input >>> .q-field__control {
  border-radius: 8px;
  padding: 0px 16px !important;
  /* background-color: antiquewhite; */
  overflow: hidden;
  background: white;
  height: 32px;
}
*>>>.q-field__prefix {
    padding-right: 0px;
}
}
 @media screen and (max-width: 599px) {
  *>>>.q-field__prefix {
    padding-right: 0px;
}
  .custom-input >>> .q-field__control {
  /* border-radius: 8px; */
  padding: 0px 16px !important;
  /* background-color: antiquewhite; */
  overflow: hidden;
  background: white;
  height: 35px;
}
 }
</style>
