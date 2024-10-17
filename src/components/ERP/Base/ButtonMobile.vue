<template>
  <div v-if="json.step == 1 || json.step == 3" class="dialog_mobile_detail">
    <div class="row full-height items-center">
      <div align="center" :class="{
          'col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4': (json.BillStatus == 0 && json.step == 1 && !deepEqual(ori_json, json) && (!page_function.startsWith('Edit') || page_function.startsWith('Edit'))),
          'col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6': (json.BillStatus != 0 || json.step != 1 || deepEqual(ori_json, json))
        }" >
        <Button_icon 
          :text="'PRINT'" 
          :icon="'img:icons/print.svg'" 
          :flat="true" 
          :font_color="'primary'" 
          :color="''" 
          :outline="false" 
          size="9px"
          @click="handlePrint" 
          class="mobile_nav_font mobile_nav_icons primary_button_font" 
          stack
        />
      </div>
      <!-- :icon="'add'" -->
      <div v-if="json.step==1 && json.BillStatus == 0 && page_function.startsWith('Edit') && !deepEqual(ori_json, json)" class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4" align="center">
        <Button_icon  
          :readonly="(page_function.startsWith('Edit') && deepEqual(ori_json, json)) || json.step == 3" 
          :icon="json.step === 3 ? 'add' : (page_function.startsWith('Edit') ? (deepEqual(ori_json, json) ? 'add' : 'done') : 'add')" 
          :border_radius="'30px;'" 
          :flat="false" 
          :font_color="'white'" 
          :color="'primary'" 
          :outline="false" 
          size="13px"
          
          @click="handleCreatePO"
          class="menu_add"  
          :icon-size="'2.9em'"
        />
      </div>
      <div v-if="json.step==1 && json.BillStatus == 0 && !page_function.startsWith('Edit') && !deepEqual(ori_json, json)" class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4" align="center">
        <Button_icon  
          :readonly="(page_function.startsWith('Edit') && deepEqual(ori_json, json)) || json.step == 3" 
          :icon="'add'" 
          :border_radius="'30px;'" 
          :flat="false" 
          :font_color="'white'" 
          :color="'primary'" 
          :outline="false" 
          size="13px"
          
          @click="handleCreatePO"
          class="menu_add"  
          :icon-size="'2.9em'"
        />
      </div>
      
      <!-- <div v-else class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4" align="center" >
            <Button_icon 
            v-if="json.BillStatus == 0" 
            :icon="'add'" 
            :border_radius="'30px;'" 
            :flat="false" 
            :font_color="'white'" 
            :color="'primary'" 
            :outline="false" 
            size="13px"
            v-on:receiveClick="handleConvertNew" 
            class="menu_add"  
            :icon-size="'2.9em'"/>
      </div> -->
     <div align="center" :class="{
        'col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4': (json.BillStatus == 0 && json.step == 1 && !deepEqual(ori_json, json) && (!page_function.startsWith('Edit') || page_function.startsWith('Edit'))),
        'col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6': (json.BillStatus != 0 || json.step != 1 || deepEqual(ori_json, json))
      }" >
        <Button_icon 
          v-if="json.BillStatus == 1" 
          :icon="'img:icons/post.svg'" 
          :text="$language('D0148')" 
          :flat="true" 
          :font_color="'primary'" 
          :color="''" 
          :outline="false" 
          size="9px"
          @click="confirmPost" 
          class="mobile_nav_font mobile_nav_icons primary_button_font" 
          stack
        />
        <Button_icon 
          v-else 
          :text="$language('D0019')" 
          :flat="true" 
          :font_color="'primary'" 
          :color="''" 
          :outline="false" 
          size="9px" 
          :icon="'img:icons/post.svg'"
          @click="confirmPost" 
          class="mobile_nav_font mobile_nav_icons primary_button_font" 
          stack
        />
      </div>
    </div>
  </div>
  <div v-if="json.step == 2" class="dialog_mobile_detail2">
              <div class="row full-height items-center">
                <div :class="{'col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4':json.BillStatus == 0, 'col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6':json.BillStatus == 1}" align="center"> 
                  <Button_icon :text="'PRINT'" :icon="'img:icons/print.svg'" :flat="true" :font_color="'primary'" :color="''" :outline="false" size="9px"
                  @click="handlePrint" class="mobile_nav_font mobile_nav_icons primary_button_font" stack/>
                </div>

                <div v-if="json.BillStatus == 0" class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4" align="center" >
                  <Button_icon v-if="json.BillStatus == 0" :icon="'add'" :border_radius="'30px;'" :flat="false" :font_color="'white'" :color="'primary'" :outline="false" size="13px"
                  v-on:receiveClick="handleConvertNew" class="menu_add"  :icon-size="'2.9em'"/>
                </div>

                <div :class="{'col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4':json.BillStatus == 0, 'col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6':json.BillStatus == 1}" align="center">
                  
                  <Button_icon v-if="json.BillStatus==1" :icon="'img:icons/post.svg'" :text="$language('D0148')" :border_radius="'17px;'" :flat="true" :font_color="'primary'" :color="''" :outline="false" size="9px"
                  @click="confirmPost" class="mobile_nav_font mobile_nav_icons primary_button_font" stack/>
                  <Button_icon v-else :text="$language('D0019')" :flat="true" :font_color="'primary'" :color="''" :outline="false" size="9px" :icon="'img:icons/post.svg'"
                  @click="confirmPost" class="mobile_nav_font mobile_nav_icons primary_button_font" stack/>
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
    handlePrint() {
      this.$emit('print');
    },
    handleCreatePO() {
      this.$emit('create-po');
    },
    handleConvertNew() {
        this.$emit('convert-new');
    },
    confirmPost() {
      this.$emit('confirm-post');
    },
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
  width: 21px;
  height: 21px;
}
  .menu_add >>>.q-icon {
  font-size: 2.9em !important;
}
.primary_button_font {
  color: var(--q-primary) !important;
}
</style>
