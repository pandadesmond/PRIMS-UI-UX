<template>
  <div v-if="json.step == 1 || json.step == 3" class="dialog_mobile_detail">
    <div class="row col-12 full-height justify-center items-center">
      <!-- <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4" align="center"> -->
        <Button_icon
          class="menu_add"
          :border_radius="'30px;'"
          
          :readonly="(page_function.startsWith('Edit') && deepEqual(ori_json, json)) || json.step == 3"
          :icon="'add'"  
          :flat="false"
          :font_color="'white'"
          :color="'primary'"
          :outline="false"
          size="13px"
          @click="handleCreateIM"
          :icon-size="'2.9em'"
           />
           <!-- :icon="json.step === 3 ? 'add' : (page_function.startsWith('Edit') ? (deepEqual(ori_json, json) ? 'add' : 'done') : 'add')" -->
          <!-- :text="page_function.startsWith('Create') ? 'Generate Item Master' : 'Update Item Master'" -->
      <!-- </div> -->
      <!-- :icon="'add'" -->
      
      
    </div>
  </div>
  <div v-if="json.step == 2" class="dialog_mobile_detail2">
              <div class="row col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 full-height justify-center items-center">
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4" align="center" > 
                  <Button_icon :icon="'add'" :border_radius="'30px;'" :flat="false" :font_color="'white'" :color="'primary'" :outline="false" size="13px"
                  v-on:receiveClick="handleConvertNew" class="menu_add"  :icon-size="'2.9em'"/>
                </div>

                
              </div>
  </div>
</template>

<script>
import Button_icon from 'src/components/ERP/Base/Button_icon'
export default {
  name: 'MobileDetailDialog',
  components: {
    Button_icon,
  },
  props: {
    json: Object,
    ori_json: Object,
    page_function: String
  },
  methods: {
    // handlePrint() {
    //   this.$emit('print');
    // },
    handleCreateIM() {
      this.$emit('create-im');
    },
    handleConvertNew() {
        this.$emit('convert-new');
    },
    // confirmPost() {
    //   this.$emit('confirm-post');
    // },
    deepEqual(obj1, obj2) {
      return JSON.stringify(obj1) === JSON.stringify(obj2);
    }
  }
};
</script>

<style scoped>
.dialog_mobile_detail {
  /* Your styles here */
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 300px; /* 55%; Adjust the desired width */
  height: 60px; /* 40px; Adjust the desired height */
  padding: 8px 32px;
  justify-content: center;
  align-items: center;
  border-radius: 24px;
  background-color: white;
  box-shadow: 0px 0px 11px 0px rgba(0, 0, 0, 0.40);

}
.dialog_mobile_detail2 {
  /* Your styles here */
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 300px; /* 55%; Adjust the desired width */
  height: 60px; /* 40px; Adjust the desired height */
  padding: 8px 32px;
  justify-content: center;
  align-items: center;
  border-radius: 24px;
  background-color: white;
  box-shadow: 0px 0px 11px 0px rgba(0, 0, 0, 0.40);

}
.mobile_nav_font {
  font-family: InterfontSemiBold;
  font-size: 9px;
  font-style: normal;
  font-weight: 600;
}
.mobile_nav_icons >>>.q-icon {
  font-size: 2.0em !important;
}
  .menu_add >>>.q-icon {
  font-size: 2.9em !important;
}
.primary_button_font {
  color: var(--q-primary) !important;
}
.menu_add {
  width: 48px;
  height: 48px;
}
</style>
