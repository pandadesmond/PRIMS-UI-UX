<template>
  <SelectFilter
    :readonly="readonly"
    :no_label="no_label"
    :dbComponentBehavior="dbComponentBehavior"
    :options="options"
    :label="label"
    v-on:receiveChange="handleChange"
    v-model:pass_value="bind_value"
    class="custom-select"
  />
</template>

<script>
import SelectFilter from "src/components/ERP/Base/SelectFilter";

import { mapState, mapMutations, mapGetters } from "vuex";

export default {
  name: "LabelSelectFilterHorizontal",
  data() {
    return {
      bind_value: this.pass_value,
    };
  },
  props: [
    "text",
    "pass_value",
    "dbComponentBehavior",
    "no_label",
    "readonly",
    "options",
    "long_label",
    "longer_label",
    "no_padding_top",
    "label",
  ],
  computed: {
    // ...mapGetters("tta"),
    oridbComponentBehavior() {
      return this.$store.getters["dbComponentBehavior/byLanguage"]("erp");
    },
  },
  components: {
    SelectFilter,
  },
  methods: {
    handleChange: function (newVal) {
      // var temp_json = [];
      // this.bind_value = "dadas"
      this.$emit("update:pass_value", newVal);
      // temp_json.push({"tab":"supplier_profile","seq":"2","value":this.json_container});
      this.$emit("receiveChange", newVal);
    },
  },
  watch: {
    pass_value(newVal) {
      this.bind_value = newVal;
    },
  },
};
</script>

<style scoped>
.custom_label {
  /* make vertical align*/
  display: flex;
  align-items: center;
  height: 34px; /*add in  for left 4 col line break over will follow div height*/
}

* >>> .q-field__control {
  height: 100%; /*when overflow label input will also follow height*/
}

.q-field {
  padding-top: 0px;
  padding-left: 0px;
  padding-right: 0px;
  padding-bottom: 0px;
  background: white;
}

.q-field--error {
  padding-bottom: 20px;
}

/* For text input border colour */
* >>> .q-field__inner {
  /* border: 1px solid #d2d6de; */
}

.q-field--filled >>> .q-field__control {
  background: white;
}

.q-field >>> .q-field__native {
  /* max-height: 29px; */
  overflow: auto;
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
.q-field >>> .q-field__bottom {
  display: none;
}

.q-field--error >>> .q-field__bottom {
  display: block;
}

* >>> .q-field__bottom {
  padding: 3px 0px 0;
}

/* disable field*/
.q-field--filled.q-field--disabled >>> .q-field__control:before {
  opacity: 1;
  background: #ededed;
  border-bottom-style: none;
}

/* new style added Farah */
.q-field--outlined {
    overflow: hidden; /* Add this to clip the background */
    border-radius: 8px; /* Ensure the background is applied to the right element */
    /* background: white; */
}
/* *>>>.q-field--outlined .q-field__control {
    border-radius: 8px !important;
    padding: 0 16px;
    height: 60px;
    
} */
.custom-select >>> .q-field__control {
  border-radius: 8px;
  padding: 0px 16px !important;
  /* background-color: antiquewhite; */
  /* overflow: hidden; */
}



/* * >>> .q-field--labeled .q-field__control {
  align-items: center;
  justify-content: center;
}

* >>> .q-field--labeled .q-field__label {
  text-align: center; 
  left: 50%;
  transform: translateX(-50%);
}
*[data-v-028d6966] .q-field__label {
    top: 0;
    left: 50%;
  transform: translate(-50%, -50%);
  font-size: 14px;
  text-align: center;
}
.q-field--float .q-field__label {
    max-width: 133%;
    transform: translateY(-50%) scale(0.75);
    transition: transform 0.36s cubic-bezier(0.4, 0, 0.2, 1), max-width 0.396s cubic-bezier(0.4, 0, 0.2, 1);
} */
</style>
