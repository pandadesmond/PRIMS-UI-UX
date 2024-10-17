<template>
    <QToggle
      :class="[checkbox == true ? 'checkbox' : table == true ? 'table' : btm_padding ? 'btm_padding' : '']"
      :readonly="readonly ? true : false"
      :id="id"
      :name="name"
      @update:model-value="handleChange"
      v-model="pass_value"
    />
</template>

<script>
import { QToggle } from 'quasar';

export default {
    data() {
        return {
            pass_value: this.value,
        };
    },
    props: ['value','readonly','checkbox','table','btm_padding','color','size'],
    components: {
        QToggle,
    },
    methods:{
        handleChange(newVal) {
            this.$emit('receiveChangenewVal', newVal);
        }
    },
    watch:{
        value(newVal) {
            this.pass_value = newVal;
        }
    }
}
</script>

<style scoped>
.checkbox {
  padding-bottom: 1px;
  margin-left: -10px;
  margin-right: -10px;
  margin-top: -5px;
  margin-bottom: -5px;
}

.table {
  margin-left: -10px;
  margin-right: -10px;
  margin-top: -10px;
  margin-bottom: -10px;
}

.btm_padding {
  padding-bottom: 4px;
  margin-top: -4px;
}
</style>