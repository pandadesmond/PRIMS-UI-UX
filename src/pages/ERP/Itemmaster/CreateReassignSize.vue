<template>
  <div v-if="$q.screen.width > 599" class="card_sides card_section">
    <div :class="page_function == 'CreateGSTTaxCodePurchase' ? 'chip-container_2' : 'chip-container_1'">
       <div v-if="page_function == 'CreateGSTTaxCodePurchase'" class="text-subtitle1 header_text">
         Reassign Size
        </div>
        <div v-if="page_function == 'EditGSTTaxCodePurchase'" class="text-subtitle1 header_text">
          Reassign Size
        </div>
    </div>
      <q-form ref="save_form">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div class="row col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 bg-white">
          <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
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
              title="Reassign Size"
              icon="settings"
              :done="done1"
              style="font-size: 10px; padding-left: 15px; padding-right: 15px;"
            >
            </q-step>
           </q-stepper>
          </div>
         </div>

          <div class="step-content" style="font-size: 10px; padding-left: 15px; padding-right: 15px;">
            <div class="row" style="align-items: center; width: 100%;">
              <div style="padding-top: 10px; height: 100%;">

                <div class="row" style="margin-bottom: 10px;">

                  <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3">
                    <div class="row">

                      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; padding-top: 10px;"> 
                        <LabelInputVerticalGeneral
                          :autofocusclick="true"
                          v-model:pass_value="json.RefNo"
                          :pass_label_value="'RefNo'"
                          v-on:receiveChange="handleChange"
                          :dbComponentBehavior="dbComponentBehavior.text"
                          label="test"
                          :disable="false"
                        />                         
                      </div>

                      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; padding-top: 10px;">
                        
                        <LabelSelectVerticalGeneral
                          v-model:pass_value="json.UOM_from"
                          :pass_label_value="'Size From'"
                          v-on:receiveChange="handleChange"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.select"
                          label=""
                          :options="UOMFrom_options"                              
                        />
                         
                      </div>

                      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; padding-top: 10px;">
                            
                        <LabelSelectVerticalGeneral
                          v-model:pass_value="json.UOM_to"
                          :pass_label_value="'Size To'"
                          v-on:receiveChange="handleChange"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.select"
                          label=""
                          :options="UOMTo_options"                              
                        />
                         
                      </div>

                      <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8" style="padding-right: 10px; padding-top: 10px;">
         
                        <LabelInputVerticalGeneral
                            :autofocusclick="true"
                            v-model:pass_value="json.EffectiveDate"
                            :pass_label_value="'Effective Date'"
                            v-on:receiveChange="handleChange"
                            :dbComponentBehavior="dbComponentBehavior.text"
                            label="test"
                            :disable="false"
                          />
                           
                      </div>
                    </div>
                  </div>

                  <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3">
                    <div class="row">

                      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; padding-top: 10px;">
                        
                        <Label :pass_value="'Send'" />    
                        <Button :disable="false" v-on:receiveClick="handleShowSendUOM"
                          :pass_label="'Send'"
                          :pass_no_caps="true"
                          :pass_square="true"
                          :pass_dense="true"
                          :pass_flat="true"  
                          style="font-size: 12px; background-color: #26A69A; color: white; margin-left: 0px; margin-right: 10px;"
                          />
                          
                      </div>
                      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; padding-top: 10px;">
                        
                        <LabelInputVerticalGeneral
                        :autofocusclick="true"
                        v-model:pass_value="json.SendBy"
                        :pass_label_value="'Send By'"
                        v-on:receiveChange="handleChange"
                        :dbComponentBehavior="dbComponentBehavior.text"
                        label="test"
                        :disable="false"
                        />   
                          
                      </div>

                      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; padding-top: 10px;">
                            
                        <!-- <Datepicker
                          :clickableInput="true"
                          :no_label="false"
                          :disable="false"
                          :autoclose="true"
                          v-on:receiveChange="handleChangeSendAt"
                          :daterange="json.send_at"
                          :componentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text" /> -->
                          <LabelInputVerticalGeneral
                            :autofocusclick="true"
                            v-model:pass_value="json.SendAt"
                            :pass_label_value="'Send At'"
                            v-on:receiveChange="handleChange"
                            :dbComponentBehavior="dbComponentBehavior.text"
                            label="test"
                            :disable="false"
                            />
                            
                      </div>
                    </div>
                  </div>

                  <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3">
                    <div class="row">

                      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; padding-top: 10px;">
                        
                        <Label :pass_value="'Approved'" />    
                        <Button :disable="false" v-on:receiveClick="handleShowSendUOM"
                          :pass_label="'Approved'"
                          :pass_no_caps="true"
                          :pass_square="true"
                          :pass_dense="true"
                          :pass_flat="true"  
                          style="font-size: 12px; background-color: #26A69A; color: white; margin-left: 0px; margin-right: 10px;"
                          />
                          
                      </div>
                      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; padding-top: 10px;">
                        
                        <LabelInputVerticalGeneral
                        :autofocusclick="true"
                        v-model:pass_value="json.ApprovedBy"
                        :pass_label_value="'Approved By'"
                        v-on:receiveChange="handleChange"
                        :dbComponentBehavior="dbComponentBehavior.text"
                        label="test"
                        :disable="false"
                        />   
                          
                      </div>

                      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; padding-top: 10px;">
                            
                        <!-- <Datepicker
                          :clickableInput="true"
                          :no_label="false"
                          :disable="false"
                          :autoclose="true"
                          v-on:receiveChange="handleChangeSendAt"
                          :daterange="json.send_at"
                          :componentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text" /> -->
                          <LabelInputVerticalGeneral
                            :autofocusclick="true"
                            v-model:pass_value="json.ApprovedAt"
                            :pass_label_value="'Approved At'"
                            v-on:receiveChange="handleChange"
                            :dbComponentBehavior="dbComponentBehavior.text"
                            label="test"
                            :disable="false"
                            />
                            
                      </div>
                    </div>
                  </div>

                  <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3">
                    <div class="row">

                      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; padding-top: 10px;">
                        
                        <Label :pass_value="'Posted'" />    
                        <Button :disable="false" v-on:receiveClick="handleShowSendUOM"
                          :pass_label="'Posted'"
                          :pass_no_caps="true"
                          :pass_square="true"
                          :pass_dense="true"
                          :pass_flat="true"  
                          style="font-size: 12px; background-color: #26A69A; color: white; margin-left: 0px; margin-right: 10px;"
                          />
                          
                      </div>
                      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; padding-top: 10px;">
                        
                        <LabelInputVerticalGeneral
                        :autofocusclick="true"
                        v-model:pass_value="json.PostedBy"
                        :pass_label_value="'Posted By'"
                        v-on:receiveChange="handleChange"
                        :dbComponentBehavior="dbComponentBehavior.text"
                        label="test"
                        :disable="false"
                        />   
                          
                      </div>

                      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; padding-top: 10px;">
                            
                        <!-- <Datepicker
                          :clickableInput="true"
                          :no_label="false"
                          :disable="false"
                          :autoclose="true"
                          v-on:receiveChange="handleChangeSendAt"
                          :daterange="json.send_at"
                          :componentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text" /> -->
                          <LabelInputVerticalGeneral
                            :autofocusclick="true"
                            v-model:pass_value="json.PostedAt"
                            :pass_label_value="'Posted At'"
                            v-on:receiveChange="handleChange"
                            :dbComponentBehavior="dbComponentBehavior.text"
                            label="test"
                            :disable="false"
                            />
                            
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
              v-on:receiveClick="handleCreateSurcharge"/>
          </span>

      </q-card-actions>
      <!-- <q-inner-loading
        :showing="showAddLoading"
        color="primary"
      /> -->


  </div>

  <div v-else class="card_sides">

    <div :class="page_function == 'CreateGSTTaxCodePurchase' ? 'chip-container_2' : 'chip-container_1'">
          <Chip v-if="page_function == 'CreateGSTTaxCodePurchase'"  :label="$language('D0202')" :icon="'chevron_left'" text-color="grey-10" class="bold-font chip_sty back_chip_icon" @click="back()" />
          <Chip v-if="page_function == 'EditGSTTaxCodePurchase'" :icon="'chevron_left'" :square="true" :label="'Edit Surcharge Code' +' / '+json.Itemcode" text-color="grey-10" class="bold-font chip_sty" v-on:receiveClick="handleNavigate('Itemmaster')"/>
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
                              <Label :pass_value="'Active'" />
                            </div>
                            <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                              <Checkbox
                                :btm_padding="true"
                                size="xs"
                                :disable="false"
                                v-model="json.set_active"
                                :true-value="1"
                                :false-value="0"
                                v-on:receiveChangenewVal="handleChangeActive"/>
                            </div>
                          </div>
                      </div>

                              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px; padding-top: 10px;">
                        <div class="row" style="align-items: center;">
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                              <Label :pass_value="'Default'" />
                            </div>
                            <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                              <Checkbox
                                :btm_padding="true"
                                size="xs"
                                :disable="false"
                                v-model="json.set_default"
                                :true-value="1"
                                :false-value="0"
                                v-on:receiveChangenewVal="handleChangeDefault"/>
                            </div>
                          </div>
                              </div>

                              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px;">
                                <div class="row" style="align-items: center;">
                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                      <Label :pass_value="'Tax Type'" />
                                    </div>
                                    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                      <Input
                                        ref="selectComponent"
                                        :readonly="false"
                                        :no_label="false"
                                        v-model:pass_value="json.gst_tax_type"
                                        :dbComponentBehavior="action_change_selecting ? dbComponentBehavior.select : dbComponentBehavior.text"
                                        :options="code_options"
                                        v-on:receiveChange="handleChangeGSTTaxType"
                                        :text_italic = "false"
                                      />
                                    </div>
                                  </div>
                              </div>

                              <!-- <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px;">
                                <div class="row" style="align-items: center;">
                                  <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                    <Label :pass_value="'Seq'" />
                                  </div>
                                  <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                  <Checkbox
                                    :btm_padding="true"
                                    size="xs"
                                    :disable="false"
                                    v-model="json.seq"
                                    :true-value="1"
                                    :false-value="0"
                                    v-on:receiveChangenewVal="handleChangeSeq"/>
                                  </div>
                                  </div>
                              </div> -->

                              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px;">
                                <div class="row" style="align-items: center;">
                                  <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                    <Label :pass_value="'Exempted'" />
                                  </div>
                                  <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                  <Checkbox
                                    :btm_padding="true"
                                    size="xs"
                                    :disable="false"
                                    v-model="json.IsExempted"
                                    :true-value="1"
                                    :false-value="0"
                                    v-on:receiveChangenewVal="handleChangeExempted"/>
                                  </div>
                                  </div>
                              </div>

                              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px;">
                                <div class="row" style="align-items: center;">
                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                      <Label :pass_value="'Effective Date'" />
                                    </div>
                                    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                      <Datepicker
                                        :clickableInput="true"
                                        :no_label="false"
                                        :disable="false"
                                        :autoclose="true"
                                        v-on:receiveChange="handleChangeEffectiveDate"
                                        :daterange="json.effective_date"
                                        :componentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text" />
                                    </div>
                                  </div>
                              </div>

                              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px;">
                                <div class="row" style="align-items: center;">
                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                      <Label :pass_value="'Tax Code'" />
                                    </div>
                                    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                      <Input
                                        ref="selectComponent"
                                        :readonly="false"
                                        :no_label="false"
                                        v-model:pass_value="json.gst_tax_code"
                                        :dbComponentBehavior="action_change_selecting ? dbComponentBehavior.select : dbComponentBehavior.text"
                                        :options="code_options"
                                        v-on:receiveChange="handleChangeGSTTaxCode"
                                        :text_italic = "false"
                                      />
                                    </div>
                                  </div>
                              </div>

                              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px;">
                                <div class="row" style="align-items: center;">
                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                      <Label :pass_value="'Tax Rate %'" />
                                    </div>
                                    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                      <Input
                                          :autofocusclick="false"
                                          :no_label="false"
                                          :readonly="false"
                                          v-on:change="handleChangeGSTTaxRate"
                                          v-model="json.gst_tax_rate "
                                          :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.text : oridbComponentBehavior.text" />
                                    </div>
                                  </div>
                              </div>

                              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px;">
                                <div class="row" style="align-items: center;">
                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                      <Label :pass_value="'Map Code'" />
                                    </div>
                                    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                      <Input
                                        :autofocusclick="false"
                                        :no_label="false"
                                        :readonly="false"
                                        v-on:change="handleChangeIMMapCode"
                                        v-model="json.im_map_code "
                                        :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.text : oridbComponentBehavior.text" />
                                    </div>
                                  </div>
                              </div>

                              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px;">
                                <div class="row" style="align-items: center;">
                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                      <Label :pass_value="'Description'" />
                                    </div>
                                    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                      <Input
                                          :autofocusclick="false"
                                          :no_label="false"
                                          :readonly="false"
                                          v-on:change="handleChangeDescription"
                                          v-model="json.description "
                                          :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.text : oridbComponentBehavior.text" />
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
        set_active: 0,
        set_default: 0,
        gst_tax_type: '',
        // seq: 0,
        IsExempted: 0,
        effective_date: '',
        gst_tax_code: '',
        gst_tax_rate: '',
        im_map_code: '',
        description: ''
      },

      step:1,
      get_seq:'',

      newColumns: [
      "set_active",
      "set_default",
      "gst_tax_type",
      "seq",
      "IsExempted",
      "effective_date",
      "gst_tax_code",
      "gst_tax_rate",
      "im_map_code",
      "description"
      ],

      showAddLoading: false,

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
    if(this.page_function === 'EditGSTTaxCodePurchase'){
      await this.fetchAllData()
    }

    setTimeout(()=>{
    this.showAddLoading = false;
   },1000)

  },
  created() {
    this.initializeDefaultFields();
  },
  methods: {
    handleChangeActive(newVal){
      this.$nextTick(()=>{
        this.json.set_active = newVal
      })
    },
    handleChangeDefault(newVal){
      this.$nextTick(()=>{
        this.json.set_default = newVal
      })
    },
    handleChangeGSTTaxType(newVal){
      this.$nextTick(()=>{
        this.json.gst_tax_type = newVal
      })
    },
    // handleChangeSeq(newVal){
    //   this.$nextTick(()=>{
    //     this.json.seq = newVal
    //   })
    // },
    handleChangeExempted(newVal){
      this.$nextTick(()=>{
        this.json.IsExempted = newVal
      })
    },
    handleChangeEffectiveDate(newVal){
      this.$nextTick(()=>{
        this.json.effective_date = newVal
      })
    },
    handleChangeGSTTaxCode(newVal){
      this.$nextTick(()=>{
        this.json.gst_tax_code = newVal
      })
    },
    handleChangeGSTTaxRate(newVal){
      this.$nextTick(()=>{
        this.json.gst_tax_rate = newVal
      })
    },
    handleChangeIMMapCode(newVal){
      this.$nextTick(()=>{
        this.json.im_map_code = newVal
      })
    },
    handleChangeDescription(newVal){
      this.$nextTick(()=>{
        this.json.description = newVal
      })
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
      this.$router.push("gsttaxcodepurchase");
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
            "language": this.language,
            "gst_trans_type": "P",
            "gst_guid": this.$route.query.GSTGuid,
        },
      }

      var object_pass = {
          "dispatch": 'setup2_gsttaxcode/trigger_get_gst_read_gst',
          "getter": 'setup2_gsttaxcode/get_gst_read_gst',
          "app": this,
          "payload": payload,
        };

        var dispatch_response_get_gst_read_gst = await this.$dispatch(object_pass);
        var status = dispatch_response_get_gst_read_gst.status

        if(status){
          this.json.set_active = dispatch_response_get_gst_read_gst.response.detail[0].set_active,
          this.json.set_default = dispatch_response_get_gst_read_gst.response.detail[0].set_default,
          this.json.gst_tax_type = dispatch_response_get_gst_read_gst.response.detail[0].gst_tax_type,
          this.get_seq = dispatch_response_get_gst_read_gst.response.detail[0].seq,
          this.json.IsExempted = dispatch_response_get_gst_read_gst.response.detail[0].IsExempted,
          this.json.effective_date = dispatch_response_get_gst_read_gst.response.detail[0].effective_date,
          this.json.gst_tax_code = dispatch_response_get_gst_read_gst.response.detail[0].gst_tax_code,
          this.json.gst_tax_rate = dispatch_response_get_gst_read_gst.response.detail[0].gst_tax_rate,
          this.json.im_map_code = dispatch_response_get_gst_read_gst.response.detail[0].im_map_code,
          this.json.description = dispatch_response_get_gst_read_gst.response.detail[0].description
        }
    },
    async handleCreateSurcharge(){

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

      if(this.page_function == 'CreateGSTTaxCodePurchase'){
        var payload = {
          "pass_json":{
            "outlet_guid": this.session_outlet_guid,
            "language": "EN",
            "gst_trans_type": "P",
            // "seq": this.json.seq ? 1 : 0,
            "gst_tax_type": this.json.gst_tax_type,
            "set_active": this.json.set_active ? 1 : 0,
            "set_default": this.json.set_default ? 1 : 0,
            "gst_tax_code": this.json.gst_tax_code,
            "gst_tax_rate": this.json.gst_tax_rate,
            "description": this.json.description,
            "created_by": this.user_name,
            "updated_by": this.user_name,
            "IsExempted": this.json.IsExempted ? 1 : 0,
            "im_map_code": this.json.im_map_code,
            "effective_date": this.json.effective_date,
          }
        }

        var object_pass = {
          "dispatch": 'setup2_gsttaxcode/trigger_create_gst_read_gst',
          "getter": 'setup2_gsttaxcode/get_gst_read_gst',
          "app": this,
          "payload": payload,
        };

        var dispatch_response_create_gst_read_gst = await this.$dispatch(object_pass);

        var status = dispatch_response_create_gst_read_gst.status

        if(status){
          this.showNotify('positive', 'Created Successfully')
          this.$router.push({name: "gsttaxcodepurchase", params:{data: JSON.stringify() }});
        }else{
          var get_error_message = JSON.parse(dispatch_response_create_gst_read_gst.response)
          if(get_error_message){
            this.showNotify('negative', get_error_message.detail);
          }else{
            this.showNotify('nagative', 'Created Failed')
          }
        }

      }else if(this.page_function == 'EditGSTTaxCodePurchase'){
        var payload = {
          "pass_json":{
            "outlet_guid": this.session_outlet_guid,
            "language": "EN",
            "gst_trans_type": "P",
            "gst_guid": this.$route.query.GSTGuid,
            "seq": this.get_seq,
            "gst_tax_type": this.json.gst_tax_type,
            "set_active": this.json.set_active ? 1 : 0,
            "set_default": this.json.set_default ? 1 : 0,
            "gst_tax_code": this.json.gst_tax_code,
            "gst_tax_rate": this.json.gst_tax_rate,
            "description": this.json.description,
            "created_by": this.user_name,
            "updated_by": this.user_name,
            "IsExempted": this.json.IsExempted ? 1 : 0,
            "im_map_code": this.json.im_map_code,
            "effective_date": this.json.effective_date
          }
        }

        var object_pass = {
          "dispatch": 'setup2_gsttaxcode/trigger_patch_gst_read_gst',
          "getter": 'setup2_gsttaxcode/get_gst_read_gst',
          "app": this,
          "payload": payload,
        };

        var dispatch_response_patch_gst_read_gst = await this.$dispatch(object_pass);

        var status = dispatch_response_patch_gst_read_gst.status

        if(status){
          this.showNotify('positive', 'Updated Successfully')
          // this.$router.push({name: "gsttaxcodepurchase", params:{data: JSON.stringify() }});
          // window.location.reload()
        }else{
          var get_error_message = JSON.parse(dispatch_response_patch_gst_read_gst.response)
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
  padding-right: 80%;
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
</style>
