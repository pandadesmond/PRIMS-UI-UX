<template>
  <div v-if="$q.screen.width > 599" class="card_sides card_section">
    <div :class="page_function == 'CreatePOGroup' ? 'chip-container_2' : 'chip-container_1'">
       <div v-if="page_function == 'CreatePOGroup'" class="text-subtitle1 header_text">
         New PO Group
        </div>
        <div v-if="page_function == 'EditPOGroup'" class="text-subtitle1 header_text">
          Edit PO Group > {{ json.code_group }}
        </div>
    </div>
      <q-form ref="save_form">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div class="row col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 bg-white">
          <div class="col-xl-11 col-lg-11 col-md-11 col-sm-11 col-xs-11">

          <q-stepper
            class="custom_tab_font"
            v-model="step"
            header-nav
            ref="stepper"
            color="primary"
            animated
            header-class="custom_step"
            flat
            @update:model-value="handleStepClick"
          >
            <q-step
              :name="1"
              title="PO Group"
              icon="settings"
              :done="done1"
              style="font-size: 10px; padding-left: 15px; padding-right: 15px;"
            >
            </q-step>
           </q-stepper>
           </div>

           <div class="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-xs-1" align = "right" style="padding-top: 10px; padding-left: 15px; padding-right: 15px;">

           <Button
              v-if="page_function == 'EditPOGroup'"
              :disable="false"
              v-on:receiveClick="handleDelete"
              :pass_label="''"
              :pass_no_caps="true"
              :pass_square="true"
              :pass_dense="true"
              :pass_flat="true"
              :tooltip="true"
              :pass_tooltip="'Delete'"
              style="font-size: 12px; background-color: #C10015; color: white; margin-left: 0px; margin-right: 10px;"
              :pass_icon="'delete'"
              />

          </div>
         </div>

          <div class="step-content" style="font-size: 10px; padding-left: 15px; padding-right: 15px;">
            <div class="row" style="align-items: center; width: 100%;">
              <div style="padding-top: 10px; height: 100%;">

                <div class="row" style="margin-bottom: 10px;">
                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div class="row">

                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px; padding-top: 10px;">
                        <div class="row" style="align-items: center;">
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                              <Label :pass_value="'Code Description'" />
                            </div>
                            <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                              <Input
                                :autofocusclick="false"
                                :no_label="false"
                                :readonly="false"
                                v-on:change="handleChangeCODEDESC"
                                v-model="json.CODE_DESC "
                                :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.text : oridbComponentBehavior.text"
                              />
                            </div>
                          </div>
                      </div>

                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px; padding-top: 10px;">
                        <div class="row" style="align-items: center;">
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                              <Label :pass_value="'Master Code_GL Code'" />
                            </div>
                            <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                              <Input
                                :autofocusclick="false"
                                :no_label="false"
                                :readonly="false"
                                v-on:change="handleChangeMcodeGLcode"
                                v-model="json.mcode_glcode "
                                :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.text : oridbComponentBehavior.text"
                              />
                            </div>
                          </div>
                      </div>

                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px; padding-top: 10px;">
                        <div class="row" style="align-items: center;">
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                              <Label :pass_value="'Code Group'" />
                            </div>
                            <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                              <Input
                                :autofocusclick="false"
                                :no_label="false"
                                :readonly="false"
                                v-on:change="handleChangeCodeGroup"
                                v-model="json.code_group "
                                :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.text : oridbComponentBehavior.text"
                              />
                              <!-- <SelectFilter
                                  :readonly="false"
                                  :no_label="true"
                                  :label="Group"
                                  v-model:pass_value="json.code_group"
                                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.select"
                                  :options="code_group_options"
                                  v-on:receiveChange="handleChangeCodeGroup"
                                  :result_message ="'No results'"
                              /> -->
                            </div>
                          </div>
                      </div>

                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px; padding-top: 10px;">
                        <div class="row" style="align-items: center;">
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                              <Label :pass_value="'Inactive'" />
                            </div>
                            <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                              <Checkbox
                                :btm_padding="true"
                                size="xs"
                                :disable="false"
                                v-model="json.inactive"
                                :true-value="1"
                                :false-value="0"
                                v-on:receiveChangenewVal="handleChangeInactive"/>
                            </div>
                          </div>
                      </div>
                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px; padding-top: 10px;">
                        <div class="row" style="align-items: center;">
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                              <Label :pass_value="'Date From'" />
                            </div>
                            <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                              <Datepicker
                                :clickableInput="true"
                                :no_label="false"
                                :disable="false"
                                :autoclose="true"
                                v-on:receiveChange="handleChangeDateFrom"
                                :daterange="json.date_from"
                                :componentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required2 : oridbComponentBehavior.text_required2" />
                            </div>
                          </div>
                      </div>
                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px; padding-top: 10px;">
                        <div class="row" style="align-items: center;">
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                              <Label :pass_value="'System Generate'" />
                            </div>
                            <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                              <Checkbox
                                :btm_padding="true"
                                size="xs"
                                :disable="false"
                                v-model="json.system_generate"
                                :true-value="1"
                                :false-value="0"
                                v-on:receiveChangenewVal="handleChangeSystemGenerate"/>
                            </div>
                          </div>
                      </div>

                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px; padding-top: 10px;">
                        <div class="row" style="align-items: center;">
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                              <Label :pass_value="'Date To'" />
                            </div>
                            <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                              <Datepicker
                                :clickableInput="true"
                                :no_label="false"
                                :disable="false"
                                :autoclose="true"
                                v-on:receiveChange="handleChangeDateTo"
                                :daterange="json.date_to"
                                :componentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required2 : oridbComponentBehavior.text_required2" />
                            </div>
                          </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </q-form>

      <q-card-actions class="dialog_action justify-between" style="padding-bottom: 10px;">
        <span class="q-pl-xs">
          <Button_icon :flat="true" :font_color="'black'" :color="'white'" :text="'BACK'" :outline="true" size="15px" class="custom_cancel_button" @click="back()" />
           </span>
          <span class="q-pl-xs">
              <Button_icon :flat="true" :font_color="'white'" :color="'#094161'" :text="'SAVE'" :outline="false" size="15px"
              v-on:receiveClick="handleCreatePOGroup"/>
          </span>

      </q-card-actions>
      <!-- <q-inner-loading
        :showing="showAddLoading"
        color="primary"
      /> -->


  </div>

  <div v-else class="card_sides">

    <div :class="page_function == 'CreatePOGroup' ? 'chip-container_2' : 'chip-container_1'">
          <Chip v-if="page_function == 'CreatePOGroup'"  :label="$language('D0202')" :icon="'chevron_left'" text-color="grey-10" class="bold-font chip_sty back_chip_icon" @click="back()" />
          <Chip v-if="page_function == 'EditPOGroup'" :icon="'chevron_left'" :square="true" :label="'Edit Surcharge Code' +' / '+json.Itemcode" text-color="grey-10" class="bold-font chip_sty" v-on:receiveClick="handleNavigate('Itemmaster')"/>
      </div>
    <q-card class="card-container" style="min-height: 100vh;">
      <q-card-section class="content_body_dialog">
        <q-form ref="save_form">
          <div class="row upload_separator_first">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <q-stepper
                flat
                v-model="json.step"
                color="primary"
                animated
                class="sticky_stepper"
                header-nav
                @update:model-value="handleChangeStepper"
                inactive-color="grey-7"
                done-color="primary"
              >
                <q-step
                  :name="1"
                  title="Surcharge Code"
                  prefix="1"
                  icon="settings"
                  :done="json.step > 1"
                >
                <!--Header-->
                  <div class="row col-12" style="gap:16px;padding-top:16px">
                    <!-- <div class="col-xs-12 col-sm-12 col-md-9 col-lg-9 col-xl-9"> -->
                    <div class="row col-12" style="gap:16px">
                      <div class="row col-12 mobile_section_font">General Information</div>
                        <!--Mobile Item Code -->
                        <div class="row col-12">
                          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-sm">
                            <div class="row">

                              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px; padding-top: 10px;">
                                <div class="row" style="align-items: center;">
                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                      <Label :pass_value="'Code Description'" />
                                    </div>
                                    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                      <Input
                                        :autofocusclick="false"
                                        :no_label="false"
                                        :readonly="false"
                                        v-on:change="handleChangeCODEDESC"
                                        v-model="json.CODE_DESC "
                                        :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.text : oridbComponentBehavior.text"
                                      />
                                    </div>
                                  </div>
                              </div>

                              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px; padding-top: 10px;">
                                <div class="row" style="align-items: center;">
                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                      <Label :pass_value="'Master Code_GL Code'" />
                                    </div>
                                    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                      <Input
                                        :autofocusclick="false"
                                        :no_label="false"
                                        :readonly="false"
                                        v-on:change="handleChangeMcodeGLcode"
                                        v-model="json.mcode_glcode "
                                        :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.text : oridbComponentBehavior.text"
                                      />
                                    </div>
                                  </div>
                              </div>

                              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px; padding-top: 10px;">
                                <div class="row" style="align-items: center;">
                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                      <Label :pass_value="'Code Group'" />
                                    </div>
                                    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                      <Input
                                        :autofocusclick="false"
                                        :no_label="false"
                                        :readonly="false"
                                        v-on:change="handleChangeCodeGroup"
                                        v-model="json.code_group "
                                        :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.text : oridbComponentBehavior.text"
                                      />
                                      <!-- <SelectFilter
                                          :readonly="false"
                                          :no_label="true"
                                          :label="Group"
                                          v-model:pass_value="json.code_group"
                                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.select"
                                          :options="code_group_options"
                                          v-on:receiveChange="handleChangeCodeGroup"
                                          :result_message ="'No results'"
                                      /> -->
                                    </div>
                                  </div>
                              </div>

                              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px; padding-top: 10px;">
                                <div class="row" style="align-items: center;">
                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                      <Label :pass_value="'Inactive'" />
                                    </div>
                                    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                      <Checkbox
                                        :btm_padding="true"
                                        size="xs"
                                        :disable="false"
                                        v-model="json.inactive"
                                        :true-value="1"
                                        :false-value="0"
                                        v-on:receiveChangenewVal="handleChangeInactive"/>
                                    </div>
                                </div>
                              </div>

                              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px; padding-top: 10px;">
                                <div class="row" style="align-items: center;">
                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                      <Label :pass_value="'System Generate'" />
                                    </div>
                                    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                      <Checkbox
                                        :btm_padding="true"
                                        size="xs"
                                        :disable="false"
                                        v-model="json.system_generate"
                                        :true-value="1"
                                        :false-value="0"
                                        v-on:receiveChangenewVal="handleChangeSystemGenerate"/>
                                    </div>
                                  </div>
                              </div>

                              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px; padding-top: 10px;">
                                <div class="row" style="align-items: center;">
                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                      <Label :pass_value="'Date From'" />
                                    </div>
                                    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                      <Datepicker
                                        :clickableInput="true"
                                        :no_label="false"
                                        :disable="false"
                                        :autoclose="true"
                                        v-on:receiveChange="handleChangeDateFrom"
                                        :daterange="json.date_from"
                                        :componentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required2 : oridbComponentBehavior.text_required2" />
                                    </div>
                                  </div>
                              </div>

                              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px; padding-top: 10px;">
                                <div class="row" style="align-items: center;">
                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                      <Label :pass_value="'Date To'" />
                                    </div>
                                    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                      <Datepicker
                                        :clickableInput="true"
                                        :no_label="false"
                                        :disable="false"
                                        :autoclose="true"
                                        v-on:receiveChange="handleChangeDateTo"
                                        :daterange="json.date_to"
                                        :componentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required2 : oridbComponentBehavior.text_required2" />
                                    </div>
                                  </div>
                              </div>

                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                      </q-step>
                    </q-stepper>

              <!-- TBC -->
              <!-- <div class="row dialog_separator">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 input_wrapper_right">
                  <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                      <span class="dialog_font">Surcharge/ Discount</span>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                      <PurchaseTable
                      :readonly_button="false"
                      :row_per_page="[5,10,20,50,0]"
                      :top_button="false"
                      v-on:add_button="addButtonCreatePOChild"
                      v-on:main_action="handleAction"
                      v-on:main_edit="handleEdit"
                      v-on:main_list="handleList"
                      v-on:main_delete="handleDelete"
                      :title="table_title"
                      :table_data="table_data1"
                      :table_column="table_column1"
                      :action_button="true"
                      :edit_button="false"
                      :view_button="false"
                      :delete_button="false"
                      :flat_status="true"
                      :bordered_status="true"
                      v-on:receiveRequestTable="handleTableChange1"
                      />
                    </div>
                  </div>
                </div>
              </div> -->
            </div>
          </div>
        </q-form>
      </q-card-section>

      <q-inner-loading
        :showing="showAddLoading"
        color="primary"
        z-index="10"
      />
    </q-card>
  </div>

  <q-dialog v-model="delete_pogroup" persistent position="top">
    <q-card style="width: 95vw; max-width: 950px; max-height: 90vh; margin-top: 5%;">

      <q-card-section class="row items-center dialog_header_custom" style="padding-left: 10px;">
        <div class="text-h6">{{ $language('D0115') }}<!--Confirmation--></div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup :disable="showAddLoading || showAddLoading2"/>
      </q-card-section>

      <q-card-section style="padding: 16px;">
        <span class="dialog_content">Are you sure to delete this?</span>
      </q-card-section>

      <q-card-actions class="dialog_action" align="right">
            <q-btn flat label="Cancel" color="primary" v-close-popup/>
            <q-btn flat label="Confirm" color="primary" @click="handleDeletePOGroup" />
        </q-card-actions>

        <q-inner-loading
          :showing="loading_dialog"
          color="primary"
        />

        <q-inner-loading
        :showing="showAddLoading"
        color="primary"
      />
    </q-card>
  </q-dialog>

  <q-inner-loading
    :showing="showAddLoading"
    color="primary"
  />
</template>

<script>
import ImageUploader from 'src/components/ERP/Base/ImageUploader'
import Chip from 'src/components/ERP/Base/Chip'
import ButtonMobile from 'src/components/ERP/Itemmaster/ButtonMobile'
// import Input from 'src/components/ERP/Base/Input'
// import Select from 'src/components/ERP/Base/Select'
// import Datepicker from 'src/components/ERP/Base/Datepicker'
import Datepicker from 'src/components/ERP/Main/Datepicker'

import Checkbox from 'src/components/ERP/Base/Checkbox'
import Toggle from 'src/components/ERP/Base/Toggle'
import PurchaseTable from 'src/components/ERP/Purchase/PurchaseTable'
import SupplierItemListTable from 'src/components/ERP/Purchase/SupplierItemListTable'
import Button_icon from 'src/components/ERP/Base/Button_icon'
import Radio from 'src/components/ERP/Base/Radio';
import { Notify } from "quasar";
import SelectFilter from 'src/components/ERP/Itemmaster/SelectFilter'
import ItemTable from 'src/components/ERP/Purchase/ItemTable'
import SearchPopUp from 'src/components/ERP/Purchase/SearchPopUp'
import SelectPlaceholder from 'src/components/ERP/Base/SelectPlaceholder'
import Textarea from'src/components/ERP/Base/Textarea' ;
import { StreamBarcodeReader } from "vue-barcode-reader";
import { get_department } from 'src/store/ERP/Itemmaster/getters'

import Label from 'src/components/ERP/Main/Label';
import Input from 'src/components/ERP/Main/Input';
import LabelInputVerticalGeneral from 'src/components/ERP/Main/LabelInputVerticalGeneral';
import LabelSelectVerticalGeneral from 'src/components/ERP/Main/LabelSelectVerticalGeneral';
import Button from 'src/components/ERP/Main/Button';
import Select from 'src/components/ERP/Main/Select'

export default{
  data() {
    return {

      json:{
        CODE_DESC: '',
        mcode_glcode: '',
        code_group: '',
        inactive: 0,
        system_generate: 0,
        date_from: '',
        date_to: ''
      },
      code_group_options:[],

      step:1,

      newColumns: [
        "CODE_DESC",
        "mcode_glcode",
        "code_group",
        "inactive",
        "system_generate",
        "date_from",
        "date_to"
      ],

      showAddLoading: false,

      delete_pogroup: false,

      deleteLoading: false,
      loading_dialog: false,

      page_function: this.$route.name,
      retailer_guid: sessionStorage.getItem("retailer_guid") != "" && sessionStorage.getItem("retailer_guid") != "null" && sessionStorage.getItem("retailer_guid") != null ? sessionStorage.getItem("retailer_guid") : [],
      user_name: sessionStorage.getItem("user_name") != "" && sessionStorage.getItem("user_name") != "null" && sessionStorage.getItem("user_name") != null ? sessionStorage.getItem("user_name") : [],
      language: sessionStorage.getItem("language") != "" && sessionStorage.getItem("language") != "null" && sessionStorage.getItem("language") != null ? sessionStorage.getItem("language") : [],
      currency_sign: sessionStorage.getItem("currency_sign") != "" && sessionStorage.getItem("currency_sign") != "null" && sessionStorage.getItem("currency_sign") != null ? sessionStorage.getItem("currency_sign") : [],
      session_outlet_guid: sessionStorage.getItem("session_outlet_guid") != "" && sessionStorage.getItem("session_outlet_guid") != "null" && sessionStorage.getItem("session_outlet_guid") != null ? sessionStorage.getItem("session_outlet_guid") : [],
    }
  },
  components:{
    Label,
    LabelInputVerticalGeneral,
    LabelSelectVerticalGeneral,
    Button,
    ImageUploader,
    Chip,
    ButtonMobile,
    Input,
    Select,
    Datepicker,
    Checkbox,
    Toggle,
    PurchaseTable,
    SupplierItemListTable,
    Button_icon,
    SelectFilter,
    Radio,
    // SelectPlaceholder,
    Textarea,
    SearchPopUp,
  },
  computed: {
    dbComponentBehavior() {
      return this.$store.getters['dbComponentBehavior/byLanguage']('erp')
    },
    categoryOptions() {
      if(this.all_category.length > 0){

       var option = this.all_category.map((item) => {
        return {
          label: item.Description,
          value: item.Code
        };
      });

      return option;
      }
      return [];
    },
  },
  async mounted()
  {
    this.showAddLoading = true;
    if(this.page_function === 'EditPOGroup'){
      await this.fetchAllData()
    }

    await this.get_code_group_options()

    setTimeout(()=>{
    this.showAddLoading = false;
   },1000)

  },
  created() {
    this.initializeDefaultFields();
  },
  methods: {
    async get_code_group_options(){
      var payload = {
        "pass_json":{
          "TRANS_TYPE": "ADJ_R_GRP",
          "outlet_guid": this.session_outlet_guid,
          "language": this.language
        }
      };

      var object_pass = {
        "dispatch": 'setup2_transactionreasoncode/trigger_get_master_code_read_master_code_by_trans_type',
        "getter": 'setup2_transactionreasoncode/get_master_code_read_master_code_by_trans_type',
        "app": this,
        "payload": payload,
      };

      var dispatch_response_code_group_options = await this.$dispatch(object_pass);

      if(dispatch_response_code_group_options.status){
        var get_code_group = dispatch_response_code_group_options.response.detail
        var arr = []
        for (var i in get_code_group){
          var obj = {
            "label": get_code_group[i].CODE_DESC,
            "value": get_code_group[i].CODE_DESC
          }
          this.code_group_options.push(obj)
        }
        // this.code_group_options = arr
      }
    },

    handleChangeCODEDESC(newVal){
      this.$nextTick(()=>{
        this.json.CODE_DESC = newVal
      })
    },
    handleChangeMcodeGLcode(newVal){
      this.$nextTick(()=>{
        this.json.mcode_glcode = newVal
      })
    },
    handleChangeCodeGroup(newVal){
      this.$nextTick(()=>{
        this.json.code_group = newVal
      })
    },
    handleChangeInactive(newVal){
      this.$nextTick(()=>{
        this.json.inactive = newVal
      })
    },
    handleChangeSystemGenerate(newVal){
      this.$nextTick(()=>{
        this.json.system_generate = newVal
      })
    },
    handleChangeDateFrom(newVal){
      this.$nextTick(()=>{
        this.json.date_from = newVal
      })
    },
    handleChangeDateTo(newVal){
      this.$nextTick(()=>{
        this.json.date_to = newVal
      })
    },

    handleDelete(pass_payload){
      // console.log('pass_payload', pass_payload);
        // console.log('handleReceiveHandleDelete');
        // this.get_code_guid = pass_payload.row.CODE_GUID
        this.delete_pogroup = true
    },
    async handleDeletePOGroup(){
        this.deleteLoading = true

        var payload = {
          "pass_json":{
            "TRANS_TYPE": "PO_GROUP",
            "outlet_guid": this.session_outlet_guid,
            "language": this.language,
            "CODE_GUID": this.$route.query.POGroupCode,
          }
        }

        var object_pass = {
          "dispatch": 'setup2_pogroup/trigger_delete_master_code_read_master_code_by_trans_type',
          "getter": 'setup2_pogroup/get_master_code_read_master_code_by_trans_type',
          "app": this,
          "payload": payload,
        };

        var dispatch_response_delete_master_code_read_master_code_by_trans_type = await this.$dispatch(object_pass);

        var status = dispatch_response_delete_master_code_read_master_code_by_trans_type.status

        if(status){
          this.showNotify('positive', 'Deleted Successfully')
          this.delete_pogroup = false
          this.deleteLoading = false
          this.$router.push({name: "pogroup", params:{data: JSON.stringify() }});
        }else{
          var get_error_message = JSON.parse(dispatch_response_delete_master_code_read_master_code_by_trans_type.response)
          if(get_error_message){
            this.showNotify('negative', get_error_message.detail);
            this.deleteLoading = false

          }else{
            this.showNotify('negative', 'Deleted Failed')
            this.deleteLoading = false
          }
        }

    },
    initializeDefaultFields() {
      // Loop through all new columns and set default value if undefined
      this.newColumns.forEach((column) => {
        if (this.json[column] === undefined) {
           this.json[column] = 1;  // Ensures reactivity
        }
      });
    },
    back(){
      this.$router.push("pogroup");
    },
    unformatAmount(value,type)
    {
      value = value.toString();

      if(type == "$")
      {
          var value = Number(value).toFixed(2);
      }
      else if(type == "%")
      {
          var value = Number(value).toFixed(1);
      }
      else if(type == "qty")
      {
          var value = Number(value).toFixed(0);
      }
      else
      {
          var value = value;
      }

      return Number(value.replaceAll(',',''))
    },
    formatAmount(value, type)
    {
        if(type == "$")
        {
            var value = Number(value).toFixed(2);
        }
        else if(type == "%")
        {
            var value = Number(value).toFixed(1);
        }
        else if(type == "qty")
        {
            var value = Number(value).toFixed(0);
        }
        else
        {
            var value = value;
        }

        var parts = value.toString().split(".");
        const numberPart = parts[0];
        const decimalPart = parts[1];
        const thousands = /\B(?=(\d{3})+(?!\d))/g;
        // return numberPart.replace(thousands, ",") + (decimalPart ? "." + decimalPart : "");

        return numberPart.replace(thousands, ",") + (decimalPart ? "." + decimalPart : "");
    },
    async validate_form(form_name)
    {
        alert(form_name)
        var form_name = form_name;
        var error = 0;
        // await this.$refs[form_name].validate().then(valid => {
        //     if (!valid) {
        //         error = 1;
        //     }
        // });

        var error = error == 1 ? false : true;
        //true is no error false is got error

        return new Promise((resolve, reject) => {
        // setTimeout(() => {
            resolve(error);
        // }, 2000);
        });
    },
    showNotify(type, message) {
      if(type == "negative")
          {
              Notify.create({
                  group: 'my-group',
                  type: type,
                  message: message,
                  html: true,
                  timeout: 99999999999,
                  position: 'top',
                  actions: [
                      { icon: 'close', color: 'white', round: true, handler: () => { /* ... */ } }
                  ],
                  badgeStyle: "opacity: 0",
              })
      }

      if(type == "positive")
      {
          Notify.create({
              group: 'my-group',
              type: type,
              message: message,
              html: true,
              timeout: 1000,
              position: 'top',
              badgeStyle: "opacity: 0",

          })
      }


      if(type == "info")
      {
              Notify.create({
              type: type,
              message: message,
              timeout: 99999999,
              position: 'top',
              badgeStyle: "opacity: 0",
              html: true,
              actions: [
                { label: 'OK', color: 'white', round: true, handler: () => { } }
              ]
          })
      }
    },
    key_listener(event)
    {
      if(this.delete_child)
      {
        if (event.key === "Enter") {
          this.handleDeleteLine();
        }
        if(event.key === 'Escape')
        {
          this.delete_child = false;
        }
      }
      else if(this.post_transmain)
      {
        if (event.key === "Enter") {
          // console.log('enter');
            this.handlePostTransmain();
        }
        if(event.key === 'Escape')
        {
          this.post_transmain = false;
        }
      }
      // else if(this.supplier_item_list_popup)
      // {
      //   if (event.key === "Enter") {
      //     this.handleSilChild();
      //   }
      //   if(event.key === 'Escape')
      //   {
      //     this.sil_close();
      //   }
      // }
      else if(this.search_item)
      {
        if (event.key === "Enter") {
          if(Object.keys(this.selected_row).length != 0)
          {
            this.handleModifyItemcode();

            setTimeout(() => {
              if (this.search_item == true) {
                this.search_item = false;
                return;
              }
            }, 100);
          }
          else
          {
            this.showSearchTable();
          }
        }
        if(event.key === 'Escape')
        {
          this.closeSearchItem();
        }
      }
      else if(this.modify_child)
      {
        if (event.key === "Enter") {
          this.handleChild('save');
        }
        if(event.key === 'Escape')
        {
          this.close();
        }
      }
    },
    async fetchAllData(){
      var payload = {
        "pass_json":{
          "outlet_guid": this.session_outlet_guid,
            "language": "EN",
            "TRANS_TYPE": "PO_GROUP",
            "CODE_GUID": this.$route.query.POGroupCode,
        },
      }

      var object_pass = {
          "dispatch": 'setup2_pogroup/trigger_get_master_code_read_master_code_by_trans_type',
          "getter": 'setup2_pogroup/get_master_code_read_master_code_by_trans_type',
          "app": this,
          "payload": payload,
        };

        var dispatch_response_get_master_code_read_master_code_by_trans_type = await this.$dispatch(object_pass);
        var status = dispatch_response_get_master_code_read_master_code_by_trans_type.status

        if(status){
          this.json.CODE_DESC = dispatch_response_get_master_code_read_master_code_by_trans_type.response.detail[0].CODE_DESC,
          this.json.mcode_glcode = dispatch_response_get_master_code_read_master_code_by_trans_type.response.detail[0].mcode_glcode,
          this.json.code_group = dispatch_response_get_master_code_read_master_code_by_trans_type.response.detail[0].code_group,
          this.json.inactive = dispatch_response_get_master_code_read_master_code_by_trans_type.response.detail[0].inactive,
          this.json.system_generate = dispatch_response_get_master_code_read_master_code_by_trans_type.response.detail[0].system_generate,
          this.json.date_from = dispatch_response_get_master_code_read_master_code_by_trans_type.response.detail[0].date_from,
          this.json.date_to = dispatch_response_get_master_code_read_master_code_by_trans_type.response.detail[0].date_to
        }
    },
    async handleCreatePOGroup(){

      var form_name = 'save_form';
        var error = 0;
        await this.$refs[form_name].validate().then(valid => {
            if (!valid) {
                error = 1;
            }
        });

        var validated = error == 1 ? false : true;

        if(!validated)
        {
            this.showNotify("negative","Please make sure all field is correct.");
            this.showAddLoading = false;
            return;
        }

      if(this.page_function == 'CreatePOGroup'){
        var payload = {
          "pass_json":{
            "outlet_guid": this.session_outlet_guid,
            "language": "EN",
            "TRANS_TYPE": "PO_GROUP",
            "CODE_DESC": this.json.CODE_DESC,
            "mcode_glcode": this.json.mcode_glcode,
            "code_group": this.json.code_group,
            "inactive": this.json.inactive ? 1 : 0,
            "system_generate": this.json.system_generate ? 1 : 0,
            "date_from": this.json.date_from,
            "date_to": this.json.date_to
          }
        }

        var object_pass = {
          "dispatch": 'setup2_pogroup/trigger_create_master_code_read_master_code_by_trans_type',
          "getter": 'setup2_pogroup/get_master_code_read_master_code_by_trans_type',
          "app": this,
          "payload": payload,
        };

        var dispatch_response_create_master_code_read_master_code_by_trans_type = await this.$dispatch(object_pass);

        var status = dispatch_response_create_master_code_read_master_code_by_trans_type.status

        if(status){
          this.showNotify('positive', 'Created Successfully')
          this.$router.push({name: "pogroup", params:{data: JSON.stringify() }});
        }else{
          var get_error_message = JSON.parse(dispatch_response_create_master_code_read_master_code_by_trans_type.response)
          if(get_error_message){
            this.showNotify('negative', get_error_message.detail);
          }else{
            this.showNotify('nagative', 'Created Failed')
          }
        }

      }else if(this.page_function == 'EditPOGroup'){
        var payload = {
          "pass_json":{
            "outlet_guid": this.session_outlet_guid,
            "language": "EN",
            "TRANS_TYPE": "PO_GROUP",
            "CODE_GUID": this.$route.query.POGroupCode,
            "CODE_DESC": this.json.CODE_DESC,
            "mcode_glcode": this.json.mcode_glcode,
            "code_group": this.json.code_group,
            "inactive": this.json.inactive ? 1 : 0,
            "system_generate": this.json.system_generate ? 1 : 0,
            "date_from": this.json.date_from,
            "date_to": this.json.date_to
          }
        }

        var object_pass = {
          "dispatch": 'setup2_pogroup/trigger_update_master_code_read_master_code_by_trans_type',
          "getter": 'setup2_pogroup/get_master_code_read_master_code_by_trans_type',
          "app": this,
          "payload": payload,
        };

        var dispatch_response_update_master_code_read_master_code_by_trans_type = await this.$dispatch(object_pass);

        var status = dispatch_response_update_master_code_read_master_code_by_trans_type.status

        if(status){
          this.showNotify('positive', 'Updated Successfully')
          // this.$router.push({name: "gsttaxcodepurchase", params:{data: JSON.stringify() }});
          // window.location.reload()
        }else{
          var get_error_message = JSON.parse(dispatch_response_update_master_code_read_master_code_by_trans_type.response)
          if(get_error_message){
            this.showNotify('negative', get_error_message.detail);
          }else{
            this.showNotify('nagative', 'Updated Failed')
          }
        }
      }




    }
  },
  watch:{
    delete_child(newVal)
    {
      if(newVal)
      {
        document.addEventListener("keydown", this.key_listener);
      }
      else
      {
        document.removeEventListener("keydown", this.key_listener);
      }
    },
    post_transmain(newVal)
    {
      if(newVal)
      {
        document.addEventListener("keydown", this.key_listener);
      }
      else
      {
        document.removeEventListener("keydown", this.key_listener);
      }
    },
    supplier_item_list_popup(newVal)
    {
      if(newVal)
      {
        document.addEventListener("keydown", this.key_listener);
      }
      else
      {
        document.removeEventListener("keydown", this.key_listener);
      }
    },
    search_item(newVal)
    {
      if(newVal)
      {
        document.addEventListener("keydown", this.key_listener);
      }
    },
    modify_child(newVal)
    {
      if(newVal)
      {
        document.addEventListener("keydown", this.key_listener);
      }
      else
      {
        document.removeEventListener("keydown", this.key_listener);
      }
    },
    action_change_selecting(newVal){
      // console.log('watch action_change_selecting',newVal);
    }
  },
}
</script>

<style scoped>
.btn_qlist.q-list.q-list--padding {
  padding: 3px 0px !important;
}

.btn_qlist >>>.q-item
{
  min-height: 30px !important;
  height: 10px;
}
.btn_drp >>>.q-btn__content
{
  justify-content: left;
  font-size: 12px;
}
.btn_drp .q-btn__content .q-btn {
  font-size: 12px !important;
}

*>>>.btn_grp2.q-btn-group {
  box-shadow: none !important;
}
.btn_grp2 >>>.q-btn >>>.q-btn-item
{
  padding: 3px 8px !important;
}
*>>>.btn_drp.q-btn.q-btn-item
{
  padding: 3px 8px !important;
}
.btn_drp_action >>>.q-btn__content
{
  justify-content: left;
  font-size: 12px;
  padding-left: 10px;
}

.no-scroll {
  overflow: hidden;
}
.step-content {
  background: white;

}
.custom_table > thead > tr > th
{
  white-space: nowrap;
}

.custom_table > tbody > tr > td
{
  white-space: nowrap;
}
.active_class_tab
{
  background-color: #e37a05;
  color: white;
}

* >>> .BarcodeTable
{
  font-size: 12px;
}


* >>> .BarcodeTable > .q-table__container > .q-table__middle > .q-table > thead
{
  position: sticky;
  top: 0;
  z-index: 1;
}

* >>> .BarcodeTable > .q-table__container > .q-table__middle > .q-table > thead > tr > th
{
  padding: 5px 10px !important;
}
.BarcodeTable >>>.q-table th
{
  white-space: nowrap;
}
.BarcodeTable >>> .q-table thead tr
{
  height:0px;
}
.BarcodeTable >>>.q-table tbody td
{
  height:0px;
}
.BarcodeTable >>>.scroll
{
  overflow: visible;
}
* >>> .BarcodeTable > .q-table__container > .q-table__middle > .q-table > tbody > tr > td
{
  padding: 5px 10px !important;
}

* >>> .BarcodeTable > .q-table__container > .q-table__middle > .q-table > tbody > tr > td > .q-btn
{
  padding: 5px !important;
}

.new_input_custom
{
  height: calc(100% - 15px);
}

.new_input_custom >>> .q-field__inner, .new_input_custom >>> .q-field__inner > .q-field__control {
  height: 100%;
}
.active_section_button
{
  font-size: 12px;
  background-color: #e37a05;
  color: white;
  margin-left: 0px;
  margin-right: 10px;
}

.inactive_section_button
{
  font-size: 12px;
  background-color: #273655;
  color: white;
  margin-left: 0px;
  margin-right: 10px;
}

* >>> .custom_step
{
  border-bottom: 0px;
  padding-left: 10px;
  padding-right: 91%;
}

* >>> .custom_step > .q-stepper__tab
{
  padding: 5px;
  padding-top: 10px;
}

* >>> .custom_step > .q-stepper__tab > .q-stepper__label > .q-stepper__title
{
  font-size: 12px;
}

* >>> input[type="text"]
{
  font-size: 12px;
}

* >>> .q-field__control
{
  padding-left: 6px;
  padding-right: 6px;
  padding-top: 0px;
  padding-bottom: 0px;
}

* >>> .custom_tab_font > .q-tab__label
{
  font-size: 12px;
}

.custom_toolbar
{
  padding-left: 0px;
  height: 37px;
  min-height: 37px;
}

.custom_toolbar >>> .q-tabs
{
  padding-left: 0px;
  padding-top: 0px;
}


.new_input >>> .q-field__inner, .new_input >>> .q-field__inner > .q-field__control {
  height: 32px;
}

.new_input_select >>> .q-field__inner, .new_input_select >>> .q-field__inner > .q-field__control, .new_input_select >>> .q-field__inner > .q-field__control > .q-field__append{
  height: 32px;
  min-height: 32px;
}

.back_chip_icon >>>.q-chip__icon {
    color: rgba(0, 0, 0, 0.54);
    font-size: 1.5em;
    margin: -0.1em;
}
.chip_sty {
  padding: 11px; /* Adjust the padding as needed */
  /* border-radius: 8px; */
  background: #FFF !important;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  height: 10px;
}
.bold-font {
  font-family: InterfontBold;
  font-weight: 700;
  font-size: 16px;
}
.chip-container_1 {
  display: flex;
  align-items: center;
  /* padding-top: 16px; */
  padding-bottom: 8px;
}
.chip-container_2 {
  display: flex;
  align-items: center;
  /* padding-top: 16px; */
  /* padding-bottom: 16px; */
}
.first-dialog_separator {
  padding-top: 16px;
  padding-bottom: 16px;
  gap: 40px;
}
.rounded-outline-icon {
  border: 1px solid #8B8D8B; /* Change the color to your desired outline color */
  border-radius: 50%; /* Makes the border rounded */
  padding: 5%; /* Adjust the padding as needed */
}

.custom_more_button >>> .q-btn-dropdown__arrow
{
  display: none;
}

.dialog_action_bottom
{
  width: 95%;
  height: 65px;
  position: fixed;
  bottom: 0px;
  background-color: white;
}

.intermediate_white
{
  position: sticky;
  z-index: 2;
  top: 111px;
  padding: 0px;
  width: 100%;
  height: 12px;
  background-color:white;
}

.content_body_dialog
{
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 0px;
  padding-bottom: 46px;
}

@media screen and (max-width: 599px) {
  .dialog_detail_add_button {
  border-radius: 8px;
  background: #1E90FF;
  box-shadow: 0px 1px 3.6px 0px rgba(0, 0, 0, 0.25);
  height: 56px;
  padding: 16px;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  font-family: InterfontBold;
}
  .dialog_mobile_detail{
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
  .selected-card {
  border-radius: 8px;
  border: 2px solid #90A8D6;
  background: #FFF;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.30);
}
  .dialog_action
{
  /* height: 55px; */
  /* height: 100px; */
  position: static;
  padding:0px;
  padding-right: 20px;
  padding-left: 20px;
  margin-bottom: 24px;
  bottom: 0px;
  background-color: white;
}
  .custom_primary_button {
  padding: 0px 30px;
  border-radius: 8px;
  box-shadow: 0px 1px 3.6px 0px rgba(0, 0, 0, 0.25);
  font-weight: 700;
  font-family: InterfontBold;
  width: 112px;
  height: 48px;
}
  .input_wrapper_left_right
{
  /* padding-right: 2%; */
  /* padding-left: 2%; */
  padding: 24px;
}
  .sticky_stepper >>> .q-stepper__tab
  {
    padding: 0px;
  }

  .sticky_stepper >>> .q-stepper__title
  {
    font-size: 12px;
  }

  .sticky_stepper >>> .q-stepper__header
  {
    background-color: white;
    position: sticky;
    z-index: 2;
    top: 56px;
    padding-bottom: 5px;
    /* margin-left: -10px; */
    /* margin-right: -10px; */
  }

  .header_top
  {
    background-color: white;
    position: sticky;
    z-index: 2;
    top: 0px;
    height: 57px;
    text-align: center;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 0px;
    padding-bottom: 0px;
  }

  .header_top_mobile
  {
    background-color: white;
    position: sticky;
    z-index: 2;
    top: 0px;
    text-align: center;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 0px;
    padding-bottom: 0px;
  }
}

@media screen and (min-width: 600px) {
  .dialog_action
{
  /* height: 55px; */
  /* height: 100px; */
  position: sticky;
  padding:0px;
  padding-right: 20px;
  padding-left: 20px;
  /* margin-bottom: 20px; */
  bottom: 0px;
  background-color: white;
}
  .custom_primary_button {
  padding: 10px 30px;
  border-radius: 8px;
  box-shadow: 0px 1px 3.6px 0px rgba(0, 0, 0, 0.25);
  font-weight: 700;
  font-family: InterfontBold;
  width: 112px;
  height: 48px;
}
  .input_wrapper_left_right
{
  padding-right: 2%;
  padding-left: 2%;
}
  .sticky_stepper >>> .q-stepper__header
  {
    background-color: white;
    position: static;
    z-index: 2;
    top: 123px;
    margin-left: -10px;
    margin-right: -10px;
  }

  .header_top
  {
    position: sticky;
    top: 50px;
    z-index: 2;
    padding:0px;
  }
}

.custom_delete
{
  color: #C10015;
  text-decoration: none; /* Remove underline by default */
  transition: text-decoration 0.3s;
  position: absolute;
  padding:0px;
  padding-left: 10px;
  top: 8px;
  left: 10px;
  z-index: 1;
}
.custom_delete:hover {
  cursor: pointer;
  text-decoration: underline; /* Underline on hover */
}

.custom_close_button
{
  color: #928f8f;
  position: absolute;
  padding: 0;
  padding-left: 10px;
  top: 1px;
  right: 12px; /* Adjust the desired distance from the right */
  z-index: 1;
}

.custom_back_button
{
  position: absolute;
  padding:0px;
  padding-left: 10px;
  top: 10px;
  left: 12px;
  z-index: 1;
}

.custom_more_button
{
  color: #928f8f;
  position: absolute;
  padding: 0;
  padding-left: 10px;
  top: 10px;
  right: 12px; /* Adjust the desired distance from the right */
  z-index: 1;
}
@media screen and (min-width: 1024px) {
  .four_column_left
  {
    padding-right: 1%;
  }
}
* >>> .q-stepper__step-inner
{
  padding: 0px;
}

@media screen and (min-width: 1024px) and (max-width: 1560px){
 .padding_right
  {
    padding-right: 10px;
  }
}



.intermediate
{
  padding: 0px;
  width: 100%;
  height: 5px;
  background-color:#ededed;
}

.header_text
{
  padding-left: 0px;
  padding-right: 16px;
  font-weight: 500;
  font-size: 14px;
  /* font-family: InterfontSemiBold; */

}
.card_sides
{
  padding-left: 24px;
  padding-right: 24px;
  background-color: #F4F7FE;
}
*>>>.q-card__section--vert {
    padding: 0px;
}
.upload_container
{
    /* padding: 10px; */
    padding-top: 0px;
}
.upload_container2
{
    padding: 24px;
    /* padding-top: 0px; */
}

* >>> .q-table__container
{
    padding: 0px;
    border-radius: 0px;
    padding: 0px !important;
}

.card_section_two
{
    margin-top: 10px;
}

.card_section_second_content
{
    border: 2px solid #ababab;
    /* min-height: 60vh; */
    overflow-y: scroll;
}

.section_separator{
  border: 1px solid #ababab;
}
/* width */
.card_section_second_content::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

/* Track */
.card_section_second_content::-webkit-scrollbar-track {
  /* box-shadow: inset 0 0 5px grey;  */
  border-radius: 10px;
}

/* Handle */
.card_section_second_content::-webkit-scrollbar-thumb {
  /* background: #8070d4; */
  background: #ababab;
  border-radius: 10px;
}

/* Handle on hover */
.card_section_second_content::-webkit-scrollbar-thumb:hover {
  background: #ababab;
}

/* .q-form
{
  width: 100%;
} */

/* @media screen and (min-width: 1024px) { */

.input_wrapper_right
{
  padding-right: 10px;
}
.input_wrapper_center
{
  padding-right: 10px;
}
/* } */

@media screen and (max-width: 1024px) {
  .two_column_left
  {
    padding-right: 2%;
  }
}

.dialog_font
{
  font-weight: bold;
  font-size: 13px;
}

.dialog_separator
{
  padding-top: 5px;
}

.upload_separator_first
{
    /* border-bottom: 1px solid #DEE1E6; */
    /* margin-left: 10px;
    margin-right: 10px; */
    /* margin-bottom: 10px; */
    padding-top: 0px;
    /* padding-bottom: 10px; */
}

.upload_separator
{
    /* border-bottom: 1px solid #DEE1E6; */
    margin: 10px;
    /* padding-top: 10px; */
    /* padding-bottom: 30px; */
}

.custom_cancel_button
{
    border: 1px solid black;
}

/* * >>> .q-table__top
{
  padding-right: 0px;
} */

* >>> .q-field--disabled > .q-field__inner > .q-field__control
{
  background-color: #cccccc !important;
}
.custom_nav_button
{
    /* border: 1px solid black; */
  padding: 8px 16px 8px 16px;
  border-radius: 8px;
  border: 2px solid #1E90FF;
  font-family: InterfontMedium;
  width: 100px;
  height: 40px;
  justify-content: center;
  align-items: center;
}

.custom_primary_font {
  color: var(--q-primary) !important;
}
.chip-container {
  display: flex;
  align-items: center;
  padding-top: 32px;
  padding-bottom: 32px;
}
.supplier_item_font {
  font-family: InterfontMedium;
  font-size: 16px;
  font-weight: 500;
}
* >>> .q-field--readonly > .q-field__inner > .q-field__control
{
  background-color: #E8E8E8 !important;
  border-radius: 8px !important;
  border: 2px solid #BABABA;
}
*>>>.q-field--outlined.q-field--readonly .q-field__control:before {
    border-style: none;
}
.confirmation_line_font {
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  font-family: InterfontMedium;
}
.confirm_title {
  color: #FFF;
  text-align: center;
  font-family: InterfontSemiBold;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
}
.confirm_cancel_button {
  padding: 16px;
  justify-content: center;
  align-items: center;
  font-size: 16px !important;
  font-style: normal;
  font-weight: 700;
  font-family: InterfontBold;
  border: 2px solid #1E90FF;
  border-radius: 8px;
  box-shadow: 0px 1px 3.6px 0px rgba(0, 0, 0, 0.25);
  width: 112px;
  height: 48px;
}
.confirm_delete_button {
  padding: 16px;
  justify-content: center;
  align-items: center;
  font-size: 16px !important;
  font-style: normal;
  font-weight: 700;
  font-family: InterfontBold;
  border-radius: 8px;
  color: #FFFFFF;
  background-color: #D81111;
  box-shadow: 0px 1px 3.6px 0px rgba(0, 0, 0, 0.25);
  width: 112px;
  height: 48px;
}
.button-padding2 {
  padding: 17px 16px;
  border-radius: 8px;
  border: 2px solid #1E90FF;
  /* margin-top: 1px; */
  width: 100%;
  height:100%;
  /* font-size: 2em;   */
}
.separator-style {
  border-top: 1px solid #BFBFBF;
  width: 100%;
}
.col-3-font {
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  font-family: InterfontSemiBold;
}
.edit_IM_checkbox {
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  font-family: InterfontMedium;
  color: #000000;
}
.dialog_action
{
/* height: 55px; */
/* height: 100px; */
position: static;
padding:0px;
padding-right: 20px;
padding-left: 20px;
bottom: 0px;
background-color: white;
}

@media screen and (min-width: 600px) {
.dialog_action
{
/* height: 55px; */
/* height: 100px; */
position: static;
padding:0px;
padding-right: 20px;
padding-left: 20px;
padding-bottom: 20px;
bottom: 0px;
background-color: white;
}
}
</style>
