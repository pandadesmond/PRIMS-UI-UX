<template>
  <div v-if="$q.screen.width > 599" class="card_sides">
    <q-card class="card-container" style="max-height: 100%;">
      <q-card-section class="">
        <q-form ref="save_form">
          <div v-if="page_function == 'EditCreditNote'"/>
          <div class="row upload_separator_first">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <q-stepper
                flat
                header-nav
                v-model="json.step"
                color="primary"
                animated
                @update:model-value="handleChangeStepper"
                :class="page_function == 'EditCreditNote' ? 'sticky_stepper' : ''"
                inactive-color="grey-7"
                done-color="primary"
              >
                <q-step
                  :name="1"
                  prefix="1"
                  title="Header"
                  icon="settings"
                  :done="json.step > 1"
                >
<!-- GENERAL INFO -->
                  <div class="row" style="align-items: center; width: 100%;">
                    <div class="col-xl-10 col-lg-10 col-md-10 col-sm-10 col-xs-10" style="padding-top: 10px; height: 100%;">
                      <div class="row" style="margin-bottom: 10px;">
                        <!--refno :label="$language('D0030')" -->
                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3" style="padding-right: 10px;">
                          <div class="row" style="align-items: center;">
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                              <Span><b> {{$language('D0030')}} </b> </span>
                            </div>
                            <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                              <!-- RefNo -->
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              
                              :readonly="false"
                              v-on:change="handleChange"
                              v-model="json.RefNo"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>
                        <!--docno :label="$language('D0086')" -->
                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3" style="padding-right: 10px;">
                          <div class="row" style="align-items: center;">
                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3">
                              <b>{{$language('D0086')}}</b>
                            </div>
                            <div class="col-xl-9 col-lg-9 col-md-9 col-sm-9 col-xs-9">
                              <!-- Doc No -->
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              
                              :readonly="json.BillStatus==1"
                              v-on:change="handleChange"
                              v-model="json.DocNo"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>
                        <!--docdate :label="$language('D0087')" -->
                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3" style="padding-right: 10px;">
                        <div class="row" style="align-items: center;">
                          <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3">
                            <b>{{$language('D0087')}}</b>
                          </div>
                          <div class="col-xl-9 col-lg-9 col-md-9 col-sm-9 col-xs-9">    
                              <DatepickerOptions
                              :clickableInput="true"
                              :no_label="false"
                              
                              :disable="json.BillStatus==1"
                              :autoclose="true"
                              v-on:receiveChange="handleChangeDocDate"
                              :daterange="json.DocDate"
                              :optionsFn="generateDatePickerOptions"
                              :componentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>
                        <!-- label="DN No" -->
                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3" style="padding-right: 10px;">
                          <div class="row" style="align-items: center;">
                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3">
                              <b>DN No</b>
                            </div>
                            <div class="col-xl-9 col-lg-9 col-md-9 col-sm-9 col-xs-9">  
                            <!-- $language('D0225') -->
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              
                              :readonly="json.BillStatus==1"
                              v-on:change="handleChange"
                              v-model="json.sup_cn_no"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="row" style="margin-bottom: 10px;">
                        <!--supplier :label="$language('D0025')" -->
                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px;">
                          <div class="row" style="align-items: center;">
                            <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2">
                              <b>{{$language('D0025')}}</b>
                            </div>
                            <div :class="json.BillStatus == 0 && !supplier_readonly ? 'col-xs-9 col-sm-9 col-md-9 col-lg-9 col-xl-9' : 'col-xs-10 col-sm-10 col-md-10 col-lg-10 col-xl-10'">
                              <!-- Supplier -->
                                <SelectFilter
                                :readonly="json.BillStatus==1 ? true : supplier_readonly"
                                :no_label="false"
                                
                                v-model:pass_value="json.Code"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.select"
                                :options="supplier_options"
                                v-on:receiveChange="handleChangeSCode"
                                />  
                            </div>
                            <div v-if="json.BillStatus == 0 && !supplier_readonly" dir="ltr" class="col-xs-1 col-sm-1 col-md-1 col-lg-1 col-xl-1">
                              <Button_icon :flat="false" :font_color="'primary'" :color="'white'" :icon="'search'" :outline="true" size="13px"
                              v-on:receiveClick="addButtonCreatePOChild('supplier')" style="margin-top: 0px;height:100%" class="full-width search_button_icon search_button_secondary primary_button_font"/>
                            </div>
                          </div>
                        </div>
                        <!--issuedby :label="$language('D0045')" -->
                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3" style="padding-right: 10px;">
                          <div class="row" style="align-items: center;">
                          <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3">
                            <b>{{$language('D0045')}}</b>
                          </div>
                          <div class="col-xl-9 col-lg-9 col-md-9 col-sm-9 col-xs-9">
                                <!-- Issued By -->
                                <Input
                                :autofocusclick="true"
                                :no_label="false"
                                
                                :readonly="false"
                                v-on:change="handleChange"
                                v-model="json.Issuedby"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text" />
                              </div>
                          </div>
                        </div> 
                        <!--dndate label="DN Date" -->
                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3" style="padding-right: 10px;">
                          <div class="row" style="align-items: center;">
                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3">
                              <b>DN Date</b>
                            </div>
                            <div class="col-xl-9 col-lg-9 col-md-9 col-sm-9 col-xs-9">  
                                <!-- $language('D0226') -->
                                <Datepicker
                                :clickableInput="true"
                                :no_label="false"
                                
                                :disable="json.BillStatus==1"
                                :autoclose="true"
                                :daterange="json.sup_cn_date"
                                :componentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text" />
                              </div>
                          </div>
                        </div>
                      </div> 
                      <div class="row" style="margin-bottom: 10px;">
                        <!--branch :label="$language('D0026')" -->
                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3" style="padding-right: 10px;">
                          <div class="row" style="align-items: center;">
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                              <b>{{$language('D0026')}}</b>
                            </div>
                            <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                <!-- Branch -->
                                <SelectFilter
                                :readonly="json.BillStatus==1"
                                :no_label="false"
                                
                                v-model:pass_value="json.locgroup"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.select"
                                :options="location_options"
                                v-on:receiveChange="handleChangeLocGroup"
                                />
                            </div>
                          </div>
                        </div>
                            <!--location :label="$language('D0090')" -->
                          <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3" style="padding-right: 10px;">
                            <div class="row" style="align-items: center;">
                              <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3">
                                <b>{{$language('D0090')}}</b>
                              </div>
                              <div class="col-xl-9 col-lg-9 col-md-9 col-sm-9 col-xs-9">
                                  <!-- Location -->
                                  <SelectFilter
                                  :readonly="json.BillStatus==1"
                                  :no_label="false"
                                  
                                  v-model:pass_value="json.Location"
                                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.select"
                                  :options="location_options2"
                                  v-on:receiveChange="handleChangeLocGroup"
                                  />
                                </div>
                              </div>
                            </div>
                      </div> 
                      <div class="row col-12"><!--REMARKS -->
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <Textarea class="ignore_height" :no_label="false" :readonly="json.BillStatus==1" v-on:receiveChange="handleChange" v-model="json.Remark"
                          :dbComponentBehavior="dbComponentBehavior.remark" :pass_label="$language('D0055')"  />
                        </div>
                      </div>
<!-- checkbox below -->
                      <div v-if="page_function == 'EditCreditNote'" class="row col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <div class="row col-12 q-col-gutter-y-md">
                          <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2" style="padding-right: 10px;">
                            <div class="row" style="align-items: center;">
                              <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                                <b>{{$language('D0082')}}</b>
                              </div>
                              <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3">
                              <Toggle :class="[json.Consign === 1 ? 'custom_truthcheckbox' : 'custom_checkbox_disabl']" :btm_padding="true" size="md" :disable="true" v-model="json.Consign" :true-value="1" :false-value="0" />
                              <!-- <span class="checkbox_InterfontMedium">{{ this.$language('D0082') }}Consign</span> -->
                              </div>
                            </div>
                          </div>
                          <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2" style="padding-right: 10px;">
                              <div class="row" style="align-items: center;">
                                <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                                  <b>{{$language('D0057')}}</b>
                                </div>
                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3">
                                  <Toggle :class="[json.BillStatus === 1 ? 'custom_truthcheckbox' : 'custom_checkbox_disabl']" :btm_padding="true" size="md" :disable="true" v-model="json.BillStatus" :true-value="1" :false-value="0" />
                                  <!-- <span class="checkbox_InterfontMedium"> {{ this.$language('D0057') }} Posted</span> -->
                                </div>
                              </div>
                          </div>
                          <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2" style="padding-right: 10px;">
                              <div class="row" style="align-items: center;">
                                <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                                  <b>{{$language('D0060')}}</b>
                                </div>
                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3">
                                  <Toggle :class="[json.uploaded === 1 ? 'custom_truthcheckbox' : 'custom_checkbox_disabl']" :btm_padding="true" size="md" :disable="true" v-model="json.uploaded" :true-value="1" :false-value="0" />
                                  <!-- <span class="checkbox_InterfontMedium"> {{ this.$language('D0060') }} Uploaded</span> -->
                                </div>
                              </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2" style="text-align:center; height: 100%;">
                      <div><b>Image Details</b></div>
                      <div style="padding-top: 10px;">
                      <q-img
                        src="product_1.png"
                        spinner-color="white"
                        style="height: 120px; max-width: 120px;"
                      />
                      </div>
                      <div style="padding-top: 10px;">
                      <!-- <q-btn unelevated square dense push style="background-color: white; color: black; font-size: 10px;" label="upload" @click="refresh" /> -->
                      <q-btn no-caps dense color="white" text-color="black" label="upload photo" style="font-size: 12px; color: black; font-weight: bold;" />
                      </div>
                    </div>
                  </div>
                </q-step>

                <q-step
                  v-if="page_function == 'EditCreditNote'"
                  :name="2"
                  prefix="2"
                  title="Detail"
                  icon="create_new_folder"
                  :done="json.step > 2"
                >
                  <div class="row">
                    <div class=" col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"><!--card_section_two-->
                        <PurchaseTable
                        hide_footer
                        :readonly_button="false"
                        :row_per_page="[0]"
                        :top_button="page_function=='EditCreditNote'  && json.BillStatus == 0"
                        v-on:add_button="addButtonCreatePOChild('item')"
                        v-on:main_action="handleAction"
                        v-on:main_edit="handleEdit"
                        v-on:main_list="handleList"
                        v-on:main_delete="handleDelete"
                        :title="table_title"
                        :table_data="table_data"
                        :table_column="table_column"
                        :action_button="true"
                        :edit_button="false"
                        :view_button="false"
                        :delete_button="json.BillStatus == 0"
                        :flat_status="true"
                        :bordered_status="true"
                        v-on:receiveRequestTable="handleTableChange"
                        />
                    </div>
                  </div>
                </q-step>

                <q-step
                  v-if="page_function == 'EditCreditNote'"
                  :name="3"
                  prefix="3"
                  title="Discount"
                  icon="create_new_folder"
                  :done="json.step > 3"
                >
                  <div class="row" style="padding-top:16px">
                    <div class="row col-12">
                      <div class="row col-12"> 
                          <div class="col-6 q-pr-md">
                          <!-- GROSS -->
                          <Input
                          :autofocusclick="true"
                          :no_label="false"
                          :label="$language('D0067')"
                          :readonly="true"
                          v-on:change="handleChange"
                          v-model="json.SubTotal1"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                        </div>
                        <div class="col-6 q-pl-md">
                         <!-- Tax -->
                          <Input
                          :autofocusclick="true"
                          :no_label="false"
                          :label="$language('D0070')"
                          :readonly="true"
                          v-on:change="handleChange"
                          v-model="json.gst_tax_sum"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                        </div>


                      </div>
                    </div>

                    

                    <!-- <div class="col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <Input
                          :autofocusclick="true"
                          :no_label="false"
                          label="REBATE"
                          :readonly="true"
                          v-on:change="handleChange"
                          v-model="json.rebate_amt"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                        </div>
                      </div>
                    </div> -->

                    <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 input_wrapper_right"></div> -->
                  </div>

                  <!-- <div v-if="page_function=='EditCreditNote'" class="row dialog_separator">
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <Input
                          :autofocusclick="true"
                          :no_label="false"
                          label="Total (Exc)"
                          :readonly="true"
                          v-on:change="handleChange"
                          v-model="json.Total"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                        </div>
                      </div>
                    </div>

                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <Input
                          :autofocusclick="true"
                          :no_label="false"
                          label="Total (Inc)"
                          :readonly="true"
                          v-on:change="handleChange"
                          v-model="json.total_include_tax"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                        </div>
                      </div>
                    </div>
                  </div> -->
                </q-step>
              </q-stepper>
            </div>
          </div>
        </q-form>
      </q-card-section>

<!-- BUTTONSS NAV/SAVE -->
      

      <q-inner-loading
        :showing="showAddLoading"
        color="primary"
      />
    </q-card>
    <q-card-actions class="dialog_action justify-between">
        <div v-if="this.json.step == 1">
            
          <span v-if="page_function=='EditCreditNote'" class="q-pl-xs">
            <!-- NEXT :text="$language('D0021')" -->
            <Button_icon :flat="true" :font_color="'#29292A'" :icon-right="'chevron_right'" :color="'white'"  :outline="true" size="14px"
            @click="json.step = 2" class="primary_navigation_button"/>
          </span>
        </div>

        <div v-if="this.json.step == 2">
          <!-- PREVIOUS -->
          <!-- <Button_icon :flat="false" :font_color="'black'" :color="'white'" :text="$language('D0023')" :outline="true" size="15px"
          @click="json.step = 1"/> -->
          <!-- Back :text="$language('D0022')"-->
          <Button_icon :flat="true" :font_color="'#29292A'" :icon="'chevron_left'" :color="'white'"  :outline="true" size="14px" 
          class="primary_navigation_button" @click="json.step = 1" />

          <span class="q-pl-xs">
          <!-- NEXT :text="$language('D0021')"-->
            <Button_icon :flat="true" :font_color="'#29292A'" :icon-right="'chevron_right'" :color="'white'"  :outline="false" size="14px"
            @click="json.step = 3" class="primary_navigation_button"/>
          </span>
        </div >

        <div v-if="this.json.step == 3">
        <!-- SAVE -->
          <!-- <Button_icon v-if="json.BillStatus == 0" :flat="true" :font_color="'white'" :color="'#094161'" :text="$language('D0020')" :outline="false" size="15px"
          v-on:receiveClick="handleCreatePO"/> -->

          <span class="q-pl-xs">
            <!-- PREVIOUS :text="$language('D0022')"-->
            <Button_icon :flat="true" :font_color="'#29292A'" :icon="'chevron_left'" :color="'white'"  :outline="false" size="15px"
            @click="json.step = 2" class="primary_navigation_button"/>
          </span>
        </div >
        <span v-if="page_function == 'EditCreditNote'" class="q-gutter-x-md">
        <!-- print -->
          <!-- <Button_icon v-if="page_function == 'EditCreditNote'&& this.json.step == 1" :flat="true" :font_color="'#1E90FF'" :color="'white'" :icon="'img:icons/print.svg'" :outline="false" size="16px"
               class="print_actions_button" v-on:receiveClick="handlePrint"/> -->

            <!-- POST -->
          <span v-if="page_function == 'EditCreditNote'&& this.json.step == 1" class="q-pl-xs">
              <Button_icon v-if="page_function == 'EditCreditNote'&& this.json.step == 1"  :flat="true" :text="json.BillStatus==1 ? $language('D0148') : $language('D0019')" :outline="false" size="16px"
               v-on:receiveClick="confirmPost" :class="{ 'primary_actions_button': json.BillStatus === 1, 'secondary_actions_button': json.BillStatus === 0 }"/>
          </span>
          <span v-if="json.BillStatus == 0 && (this.json.step == 1 || this.json.step == 3)" class="q-pl-xs">
            <Button_icon :flat="true" :font_color="'white'" :color="'rgb(9, 65, 97)'" :text="'SAVE'" :outline="false" size="16px" class="primary_actions_button"
            v-on:receiveClick="handleCreatePO"/>
          </span>
        </span>
          <Button_icon v-if="page_function == 'CreateCreditNote'" :flat="true" :font_color="'white'" :color="'#1E90FF'" :text="$language('D0020')" :outline="false" size="16px"
            v-on:receiveClick="handleCreatePO" class="primary_actions_button"/>
        
      </q-card-actions>
  </div>

  <div v-else class="card_sides">
    <div class="row col-12 justify-between q-pb-md">
    <div :class="page_function == 'CreateCreditNote' ? 'chip-container_2' : 'chip-container_1'"> <!--D0224 -->
          <Chip v-if="page_function == 'CreateCreditNote'" :icon="'chevron_left'" :text="'New CN'" text-color="grey-10" class="bold-font chip_sty" v-on:receiveClick="handleNavigate('CreditNote')"/>
          <Chip v-if="page_function == 'EditCreditNote'" :icon="'chevron_left'" :square="true" :label="'Edit CN' +' / '+ json.RefNo" text-color="#273655" class="bold-font chip_sty" v-on:receiveClick="handleNavigate('CreditNote')"/>
    </div>
    <div class="justify-left items-center" >
                  <Button_icon class="bold-font summary_button q-pa-none q-ma-none" :flat="true" :label="currency_sign + ' ' + json.SubTotal1" v-on:receiveClick="show_summary_dialog" :font_color="'#273655'" :color="'primary'" :outline="false" size="14px"/>
                  <!-- <span class="" style="color:#1976D2;" @click="show_summary_dialog"> Total Amount:  {{ currency_sign }} {{ json.SubTotal1 }} </span> -->
    </div>
    </div>      
    <q-card class="card-container" style="min-height: 100vh;">
      <!-- <q-card-section class="header_top"> -->
        <!-- <Button_icon :disable="showAddLoading" :big_round="true" :flat="true" :font_color="'#928f8f'" :color="'rgba(255, 255, 255, 0.5)'" :icon="'arrow_back_ios'" :outline="true" size="12px" class="custom_back_button" @click="back()" /> -->
        <!-- <div v-if="page_function == 'CreateCreditNote'" class="text-subtitle1 header_text" style="padding-top: 10px;">Credit Note </div> -->
        <!-- <div v-if="page_function == 'EditCreditNote'" class="text-subtitle1 header_text">Credit Note   -->
        <!-- <br>{{$language('D0030')}}: {{ json.RefNo }}</div> -->
                                   <!--Refno-->                               <!--{{$language('D0223')}}--><!--{{$language('D0223')}}-->
        <!-- <q-btn-dropdown v-if="page_function == 'EditCreditNote'" :disable="showAddLoading" class="custom_more_button" flat dense icon="more_vert">
          <q-list>
            <q-item clickable v-close-popup>
              <q-item-section>
                <q-item-label @click="confirmPost" v-if="json.BillStatus==1">UNPOST</q-item-label>
                <q-item-label @click="confirmPost" v-else>POST</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown> -->
      <!-- </q-card-section> -->

      <q-card-section class="content_body_dialog">
        <q-form ref="save_form">
          <div class="row upload_separator_first">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <q-stepper
                flat
                header-nav
                v-model="json.step"
                color="primary"
                animated
                @update:model-value="handleChangeStepper"
                class="sticky_stepper"
                inactive-color="grey-7"
                done-color="primary"
              >
                <q-step
                  class="no-scroll"
                  :name="1"
                  prefix="1"
                  title="Header"
                  icon="settings"
                  :done="json.step > 1"
                >
                  <div class="row col-12 gap-style" style="padding-top: 16px;">
                    <!-- <div class="col-xs-12 col-sm-12 col-md-9 col-lg-9 col-xl-9"> -->
                      <div class="row col-12 gap-style" >
                        <div class="row col-12 mobile_section_font">General Information</div>
                        <div class="row col-12">
                        <!-- supplier -->
                        <div class="" :class="page_function == 'CreateCreditNote' ? 'col-xs-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 q-pr-sm' : json.BillStatus == 1 ? 'col-xs-12' : json.BillStatus == 0 && !supplier_readonly ? 'col-xs-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 q-pr-sm' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'">
                          <div class="row">
                            <!-- <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <span class="mobile_font">{{ $language('D0025') }}</span>
                            </div> --><!--Supplier-->
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <SelectFilter
                              :readonly="json.BillStatus==1 ? true : supplier_readonly"
                              :no_label="false"
                              :label="$language('D0025')"
                              v-model:pass_value="json.Code"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.select"
                              :options="supplier_options"
                              v-on:receiveChange="handleChangeSCode"
                              />
                            </div>
                          </div>
                        </div>

                        <!-- <div class="col-xs-6 col-sm-6 col-md-8 col-lg-8 col-xl-8 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <span class="mobile_font">Name</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <SelectFilter
                              :readonly="json.BillStatus==1 ? true : supplier_readonly"
                              :no_label="true"
                              v-model:pass_value="json.Code"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.select"
                              :options="supplier_options2"
                              v-on:receiveChange="handleChange"
                              />
                            </div>
                          </div>
                        </div> -->
                          <!-- button search -->
                        <div v-if="json.BillStatus == 0 && !supplier_readonly" dir="rtl" class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 q-pl-sm" style="padding-top: 0px;">
                            <Button_icon :small_round="true" :flat="false" :font_color="'primary'" :color="'white'" :icon="'search'" :outline="true" size="13px"
                            v-on:receiveClick="addButtonCreatePOChild('supplier')" style="margin-top: 0px; height:100%" class="full-width full-height search_button search_button_icon primary_button_font"/>
                        </div>
                      </div>
                        <div class="row col-12">
                        <!-- BRANCH -->
                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-sm">
                          <div class="row">
                            <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">{{ $language('D0026') }}</span>
                            </div> -->
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"><!--Branch-->
                              <SelectFilter
                              :readonly="json.BillStatus==1"
                              :no_label="false"
                              :label="$language('D0026')"
                              v-model:pass_value="json.locgroup"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.select"
                              :options="location_options"
                              v-on:receiveChange="handleChangeLocGroup"
                              />
                            </div>
                          </div>
                        </div>
                        <!-- LOCATION -->
                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-sm">
                          <div class="row">
                            <!-- <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <span class="mobile_font">{{ $language('D0090') }}</span>
                            </div> -->
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"><!--Location-->
                              <SelectFilter
                              :readonly="json.BillStatus==1"
                              :no_label="false"
                              :label="$language('D0090')"
                              v-model:pass_value="json.Location"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.select"
                              :options="location_options2"
                              v-on:receiveChange="handleChangeLocGroup"
                              />
                            </div>
                          </div>
                        </div>
                        </div>
                      </div>
<q-separator class="separator-style"></q-separator>
                        <div class="row col-12 gap-style" >
                          <div class="row col-12 mobile_section_font">Details</div>
                          <div class="row col-12">
                            <!-- DOC NO -->
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-sm">
                              <div class="row" :class="$q.screen.width < 1024 ? '' : ''">
                                <!-- <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                  <span class="mobile_font">{{ $language('D0086') }}</span>
                                </div> -->
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"><!--Doc No-->
                                  <Input
                                  :autofocusclick="true"
                                  :no_label="false"
                                  :label="$language('D0086')"
                                  :readonly="json.BillStatus==1"
                                  v-on:change="handleChange"
                                  v-model="json.DocNo"
                                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text" />
                                </div>
                              </div>
                            </div>
                            <!-- DOC DATE -->
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-sm">
                              <div class="row" :class="$q.screen.width < 1024 ? '' : ''">
                                <!-- <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                  <span class="mobile_font">{{ $language('D0087') }}</span>
                                </div> -->
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"><!--Doc Date-->
                                  <!-- <Datepicker
                                  :clickableInput="true"
                                  :no_label="true"
                                  :disable="json.BillStatus==1"
                                  :autoclose="true"
                                  v-on:receiveChange="handleChangeDocDate"
                                  :daterange="json.DocDate"
                                  :componentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text" /> -->
                                  <DatepickerOptions
                                    :clickableInput="true"
                                    :no_label="false"
                                    :label="$language('D0087')"
                                    :disable="json.BillStatus==1"
                                    :autoclose="true"
                                    v-on:receiveChange="handleChangeDocDate"
                                    :daterange="json.DocDate"
                                    :optionsFn="generateDatePickerOptions"
                                    :componentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text" />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="row col-12">
                            <!-- DN NO -->
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-sm">
                              <div class="row">
                                <!-- <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                  <span class="mobile_font">DN No  </span>
                                </div> -->
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"><!--{{ $language('D0225') }}-->
                                  <Input
                                  :autofocusclick="true"
                                  :no_label="false"
                                  :label="'DN No'"
                                  :readonly="json.BillStatus==1"
                                  v-on:change="handleChange"
                                  v-model="json.sup_cn_no"
                                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                                </div>
                              </div>
                            </div>
                            <!-- DN DATE -->
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-sm">
                              <div class="row">
                                <!-- <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                  <span class="mobile_font">DN Date</span>
                                </div> -->
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"> <!-- {{ $language('D0226') }} -->
                                  <Datepicker
                                  :clickableInput="true"
                                  :no_label="false"
                                  :label="'DN Date'"
                                  :disable="json.BillStatus==1"
                                  :autoclose="true"
                                  :daterange="json.sup_cn_date"
                                  :componentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <!-- ISSUED BY -->
                            <div v-if="page_function=='EditCreditNote'" class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-sm">
                              <div class="row">
                                <!-- <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                  <span class="mobile_font">{{ $language('D0045') }}</span>
                                </div> -->
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"><!--Issued By-->
                                  <Input
                                  :autofocusclick="true"
                                  :no_label="false"
                                  :label="$language('D0045')"
                                  :readonly="true"
                                  v-on:change="handleChange"
                                  v-model="json.Issuedby"
                                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text" />
                                </div>
                              </div>
                            </div>
                      </div>
                      <q-separator class="separator-style"></q-separator>
                      <div class="row col-12">
                        <!-- REMARKS -->
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <div class="row ">
                            <!-- <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <span class="mobile_font">{{ $language('D0055') }}</span>
                            </div> -->
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"><!--Remark-->
                              <Textarea class="ignore_height" :no_label="false" :readonly="json.BillStatus==1" v-on:receiveChange="handleChange" v-model="json.Remark"
                              :dbComponentBehavior="dbComponentBehavior.remark" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div v-if="page_function == 'EditCreditNote'" class="column col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" style="height:60px">    
                        <!-- <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"> -->
                          <div  class="row">
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 "><!--Consign-->
                              <Toggle :class="[json.Consign === 1 ? 'custom_truthcheckbox' : 'custom_checkbox_disabl']" :btm_padding="true" size="xs" :disable="true" v-model="json.Consign" :true-value="1" :false-value="0" />
                              <span class="custom-checkbox-edit">{{ $language('D0082') }}</span>
                        
                              <!-- <div class="row dialog_separator">
                                <div class="col-xs-7 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                  <span class="dialog_font">{{ $language('D0082') }}</span>
                                </div>
                                <div class="col-xs-5 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                  <Checkbox :btm_padding="true" size="xs" :disable="true" v-model="json.Consign" :true-value="1" :false-value="0" />
                                </div>
                              </div> -->
                            </div>

                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6"><!--Posted-->
                              <Toggle :class="[json.BillStatus === 1 ? 'custom_truthcheckbox' : 'custom_checkbox_disabl']" :btm_padding="true" size="xs" :disable="true" v-model="json.BillStatus" :true-value="1" :false-value="0" />
                              <span class="custom-checkbox-edit">{{ $language('D0057') }}</span>
                              <!-- <div class="row dialog_separator">
                                <div class="col-xs-7 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                  <span class="dialog_font">{{ $language('D0057') }}</span>
                                </div>
                                <div class="col-xs-5 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                  <Checkbox :btm_padding="true" size="xs" :disable="true" v-model="json.BillStatus" :true-value="1" :false-value="0" />
                                </div>
                              </div> -->
                            </div>

                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6"><!--Uploaded-->
                              <Toggle :class="[json.uploaded === 1 ? 'custom_truthcheckbox' : 'custom_checkbox_disabl']" :btm_padding="true" size="xs" :disable="true" v-model="json.uploaded" :true-value="1" :false-value="0" />
                              <span class="custom-checkbox-edit">{{ $language('D0060') }}</span>
                              <!-- <div class="row">
                                <div class="col-xs-7 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                  <span class="dialog_font">{{ $language('D0060') }}</span>
                                </div>
                                <div class="col-xs-5 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                              <Checkbox :btm_padding="true" size="xs" :disable="true" v-model="json.uploaded" :true-value="1" :false-value="0" />
                            </div>
                          </div> -->
                        </div>
                        <!--B2B Status-->
                        <!-- <div class="col-xs-6 col-sm-6 col-md-12 col-lg-12 col-xl-12 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-7 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                              <span class="dialog_font">{{ $language('D0065') }}</span>
                            </div>
                            <div class="col-xs-5 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                              <Input
                              :autofocusclick="true"
                              :no_label="true"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="json.b2b_status"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div> -->
                      </div>

                        <!-- </div> -->
                      </div>
                    <!-- </div> -->
                  </div>
                </q-step>

                <q-step
                  v-if="page_function == 'EditCreditNote'"
                  :name="2"
                  prefix="2"
                  title="Detail"
                  icon="create_new_folder"
                  :done="json.step > 2"
                >
                  <div v-if="page_function == 'EditCreditNote'" class="row">
                    <div v-if="results.length != 0" class=" col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" style="padding-top: 16px"><!--card_section_two-->
                      <q-card @click="selectCard(index)" v-for="(result,index) in results" :key="index" flat bordered class="card_design q-mb-md" style="width: 100%; padding:16px; border-radius:8px;"
                      :class="{'selected-card': selectedCardIndex === index}">
                          <q-card-section  style="padding: 5px;">
                            <div class="row">
                              <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 q-pl-sm" style="color:#29292A;font-size:14px; font-family:InterfontBold; font-weight:700">
                                <div class="row text-subtitle2">
                                  {{ result.Description }}
                                </div>
                              </div>
                              <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 q-pr-sm text-caption" align="right" style="color:#29292A; font-family:InterfontBold; font-weight:700; font-size:14px">
                                {{ currency_sign }} {{ result.TotalPrice }}
                                <div style="padding-top: 12px; font-size:14px; font-family:InterfontMedium; font-weight:500; color:#757575">
                                  {{ result.Qty }}
                                </div>
                              </div>
                            </div>
                          </q-card-section>
                          <!-- <q-card-section v-if="json.BillStatus == 0" @click="addButtonCreatePOChild('item')" style="padding: 0px; border-bottom: 1px solid rgba(0, 0, 0, 0.12);">
                            <div class="row">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" style="width: 100%;">
                                <div class="row justify-center items-center" style="width: 100%; height: 40px;">
                                  <div class="q-pl-sm q-pr-sm">
                                    <Button_icon style="border-radius: 15px;" :flat="false" :icon="'add'" v-on:receiveClick="addButtonCreatePOChild('item')" :font_color="'white'" :color="'primary'" :outline="false" size="10px"/>
                                  </div>
                                  <div>
                                    Add Item Details
                                  </div>
                                </div>
                              </div>
                            </div>
                          </q-card-section> -->
                          <q-card-section v-show="selectedCardIndex === index">
                            <!-- <q-separator />"'#B22222'" -->
                            <q-card-section class="text-subtitle2" align="right">
                              <q-btn no-caps flat color="primary" :label="json.BillStatus == 0 ? 'Edit' : 'View'"  @click="handleAction(result)" style="font-family:InterfontSemiBold; font-size: 14px;font-weight: 600;"/>
                              <q-btn v-if="json.BillStatus == 0" no-caps flat color="red-7" label="Delete"  @click="handleDelete(index)" style="font-family:InterfontSemiBold; font-size: 14px;font-weight: 600;"/>
                            </q-card-section>
                          </q-card-section>
                      </q-card>
                    </div>
                  </div>
                </q-step>

                <q-step
                  v-if="page_function == 'EditCreditNote'"
                  :name="3"
                  prefix="3"
                  title="Discount"
                  icon="create_new_folder"
                  :done="json.step > 3"
                >
                  <div v-if="page_function=='EditCreditNote'" class="row col-12" style="padding-top:16px">
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-sm">
                      <div class="row">
                        <!-- <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <span class="mobile_font">{{ $language('D0067') }}</span>
                        </div> -->
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"><!--GROSS-->
                          <Input
                          :autofocusclick="true"
                          :no_label="false"
                          :label="$language('D0067')"
                          :readonly="true"
                          v-on:change="handleChange"
                          v-model="json.SubTotal1"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                        </div>
                      </div>
                    </div>

                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-sm">
                      <div class="row">
                        <!-- <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <span class="mobile_font">{{ $language('D0070') }}</span>
                        </div> -->
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"><!--Tax-->
                          <Input
                          :autofocusclick="true"
                          :no_label="false"
                          :label="$language('D0070')"
                          :readonly="true"
                          v-on:change="handleChange"
                          v-model="json.gst_tax_sum"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                        </div>
                      </div>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 input_wrapper_right"></div>
                  </div>
                </q-step>
              </q-stepper>
            </div>
          </div>
        </q-form>
      </q-card-section>

      <q-inner-loading
        :showing="showAddLoading"
        color="primary"
      />
    </q-card>

    <div v-if="json.step == 1 || json.step == 3" :style="page_function == 'EditCreditNote' && json.BillStatus == 0 ? 'height: 65px;' : 'height: 40px;'">
      <!-- <div v-if="page_function == 'EditCreditNote'" class="q-pl-sm q-pr-lg q-pt-xs text-right" style="font-size: 13px;">
        Gross: {{ currency_sign }} {{ json.SubTotal1 }}
      </div> -->
      <!-- <div v-if="page_function == 'EditCreditNote'" class="row q-px-sm" :class="page_function == 'EditCreditNote' && json.BillStatus !== 0  ? 'q-pt-sm' :''" style="font-size: 13px;"> -->
           <!-- <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
              <div class="row justify-left items-center" >
                  <Button_icon class="q-pa-none q-ma-none" :flat="true" :icon="'expand_less'" v-on:receiveClick="show_summary_dialog" :font_color="'primary'" :color="'primary'" :outline="false" size="13px"/>
                  <span class="" style="color:#1976D2;" @click="show_summary_dialog"> Total Amount:  {{ currency_sign }} {{ json.SubTotal1 }} </span>
              </div>
          </div> -->

          <!-- <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
            <div class="row">
              <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-xs">
                    <Button_icon v-if="json.BillStatus==1" class="full-width" style="height: 25px;" :small_round="true" :text="'UNPOST'" :flat="false" :font_color="'white'" :color="'#273655'" :outline="false" size="11px" @click="confirmPost"/>
                    <Button_icon v-else class="full-width" style="height: 25px;" :small_round="true" :text="'POST'" :flat="false" :font_color="'white'" :color="'#273655'" :outline="false" size="11px" @click="confirmPost"/>
              </div>
              <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-xs">
                    <Button_icon class="full-width" style="height: 25px;" :small_round="true" :text="'PRINT'" :flat="false" :font_color="'white'" :color="'#273655'" :outline="false" size="11px" @click="handlePrint"/>
              </div>
            </div>
          </div> -->
          <!-- <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
              <div class="row justify-left items-center" >
                  <Button_icon class="q-pa-none q-ma-none" :flat="true" :icon="'expand_less'" v-on:receiveClick="show_summary_dialog" :font_color="'primary'" :color="'primary'" :outline="false" size="13px"/>
                  <span class="" style="color:#1976D2;" @click="show_summary_dialog"> Total Amount:  {{ currency_sign }} {{ json.SubTotal1 }} </span>
              </div>
          </div>

          <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 text-right">
            <span class="q-pr-xs" :style="json.BillStatus == 1 ? 'width: 100%;' : 'width: 24%;'">
              <Button_icon v-if="json.BillStatus==1" class="full-width" style="height: 25px;" :small_round="true" :text="'UNPOST'" :flat="false" :font_color="'white'" :color="'#273655'" :outline="false" size="11px" @click="confirmPost"/>
              <Button_icon v-else class="full-width" style="height: 25px;" :small_round="true" :text="'POST'" :flat="false" :font_color="'white'" :color="'#273655'" :outline="false" size="11px" @click="confirmPost"/>
            </span>
          </div> -->
      <!-- </div> -->
      <!-- :readonly="(page_function.startsWith('Edit') && deepEqual(ori_json, json)) || (page_function.startsWith('Create') && deepEqual(ori_json, json))" -->
      <!-- <div class="dialog_mobile_detail">
              <div class="row full-height items-center">
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4" align="center"> 
                  <Button_icon :text="'PRINT'" :icon="'fa fa-print fa-xl'" :flat="true" :font_color="'primary'" :color="''" :outline="false" size="9px"
                  @click="handlePrint" class="mobile_nav_font mobile_nav_icons primary_button_font" stack/>
                </div>
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4" align="center">
                  
                  <Button_icon v-if="json.BillStatus==0" :icon="'add'" :readonly="page_function.startsWith('Edit') && deepEqual(ori_json, json)" :border_radius="'30px;'" :flat="false" :font_color="'white'" :color="'primary'" :outline="false" size="13px" @click="handleCreatePO"
                  class="menu_add"  :icon-size="'2.9em'"/>
                </div>
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4" align="center">
                  
                  <Button_icon v-if="json.BillStatus==1" :icon="'fa fa-paper-plane fa-xl'" :text="$language('D0148')" :flat="true" :font_color="'primary'" :color="''" :outline="false" size="9px"
                  @click="confirmPost" class="mobile_nav_font mobile_nav_icons primary_button_font" stack/>
                  <Button_icon v-else :text="$language('D0019')" :flat="true" :font_color="'primary'" :color="''" :outline="false" size="9px" :icon="'fa fa-paper-plane fa-xl'"
                  @click="confirmPost" class="mobile_nav_font mobile_nav_icons primary_button_font" stack/>
                </div>
              </div>
      </div> -->

      <ButtonMobile
      :json="json" 
      :ori_json="ori_json" 
      :page_function="page_function"
      @print="handlePrint"
      @create-po="handleCreatePO"
      @confirm-post="confirmPost"
      @convert-new="handleConvertNew"
    />

      <!-- <div class="row q-px-sm q-py-xs">
        <Button_icon v-if="json.BillStatus==0" :readonly="page_function.startsWith('Edit') && deepEqual(ori_json, json)" style="height: 30px; width: 100%" :small_round="true" :text="page_function.startsWith('Create') ? 'Generate Credit Note' : 'Update Credit Note'" :flat="false" :font_color="'white'" :color="'primary'" :outline="false" size="13px" @click="handleCreatePO"/>
      </div> -->
    </div>

    <div v-if="json.step == 2" class="dialog_action_bottom" :style="page_function == 'EditCreditNote' && json.BillStatus== 0  ? 'height: 65px;' : 'height: 40px;'">
      <!-- <div v-if="page_function == 'EditCreditNote'" class="row q-px-sm" :class="page_function == 'EditCreditNote' && json.BillStatus !== 0  ? 'q-pt-sm' :''" style="font-size: 13px;"> -->
        <!-- <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
              <div class="row justify-left items-center" >
                  <Button_icon class="q-pa-none q-ma-none" :flat="true" :icon="'expand_less'" v-on:receiveClick="show_summary_dialog" :font_color="'primary'" :color="'primary'" :outline="false" size="13px"/>
                  <span class="" style="color:#1976D2;" @click="show_summary_dialog"> Total Amount:  {{ currency_sign }} {{ json.SubTotal1 }} </span>
              </div>
          </div> -->

          <!-- <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
            <div class="row">
              <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-xs">
                    <Button_icon v-if="json.BillStatus==1" class="full-width" style="height: 25px;" :small_round="true" :text="'UNPOST'" :flat="false" :font_color="'white'" :color="'#273655'" :outline="false" size="11px" @click="confirmPost"/>
                    <Button_icon v-else class="full-width" style="height: 25px;" :small_round="true" :text="'POST'" :flat="false" :font_color="'white'" :color="'#273655'" :outline="false" size="11px" @click="confirmPost"/>
              </div>
              <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-xs">
                    <Button_icon class="full-width" style="height: 25px;" :small_round="true" :text="'PRINT'" :flat="false" :font_color="'white'" :color="'#273655'" :outline="false" size="11px" @click="handlePrint"/>
              </div>
            </div>
          </div> -->
        <!-- <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
          <div class="row justify-left items-center" >
            <Button_icon class="q-pa-none q-ma-none" :flat="true" :icon="'expand_less'" v-on:receiveClick="show_summary_dialog" :font_color="'primary'" :color="'primary'" :outline="false" size="13px"/>
            <span class="" style="color:#1976D2;" @click="show_summary_dialog">Total Amount:  {{ currency_sign }} {{ json.SubTotal1 }} </span>
          </div>
        </div>
        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 text-right">
          <span class="q-pr-xs" :style="json.BillStatus == 1 ? 'width: 100%;' : 'width: 24%;'">
            <Button_icon v-if="json.BillStatus==1" class="full-width" style="height: 25px;" :small_round="true" :text="'UNPOST'" :flat="false" :font_color="'white'" :color="'#273655'" :outline="false" size="11px" @click="confirmPost"/>
            <Button_icon v-else class="full-width" style="height: 25px;" :small_round="true" :text="'POST'" :flat="false" :font_color="'white'" :color="'#273655'" :outline="false" size="11px" @click="confirmPost"/>
          </span>
        </div> -->
      <!-- </div> -->
      <div  v-if="json.BillStatus == 0" class="row q-pb-xs items-center">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" @click="addButtonCreatePOChild('item')">
            <div class="row justify-center items-center q-pr-md" style="width: 100%; height: 40px;">
              <div class="q-px-xs">
                 <Button_icon style="border-radius: 15px;" :flat="false" :icon="'add'" v-on:receiveClick="addButtonCreatePOChild('item')" :font_color="'white'" :color="'primary'" :outline="false" size="10px"/>
              </div>
              <div>
                <!-- {{ $language('D0152') }} -->
                Add Item Details
              </div>
            </div>
          </div>
      </div>
      <!-- <div class="dialog_mobile_detail">
              <div class="row full-height items-center">
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4" align="center"> 
                  <Button_icon :text="'PRINT'" :icon="'fa fa-print fa-xl'" :flat="true" :font_color="'primary'" :color="''" :outline="false" size="9px"
                  @click="handlePrint" class="mobile_nav_font mobile_nav_icons primary_button_font" stack/>
                </div>

                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4" align="center" > 
                  <Button_icon v-if="json.BillStatus == 0" :icon="'add'" :border_radius="'30px;'" :flat="false" :font_color="'white'" :color="'primary'" :outline="false" size="13px"
                  v-on:receiveClick="handleConvertNew" class="menu_add"  :icon-size="'2.9em'"/>
                </div>

                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4" align="center">
                  
                  <Button_icon v-if="json.BillStatus==1" :icon="'fa fa-paper-plane fa-xl'" :text="$language('D0148')" :border_radius="'17px;'" :flat="true" :font_color="'primary'" :color="''" :outline="false" size="9px"
                  @click="confirmPost" class="mobile_nav_font mobile_nav_icons primary_button_font" stack/>
                  <Button_icon v-else :text="$language('D0019')" :flat="true" :font_color="'primary'" :color="''" :outline="false" size="9px" :icon="'fa fa-paper-plane fa-xl'"
                  @click="confirmPost" class="mobile_nav_font mobile_nav_icons primary_button_font" stack/>
                </div>
              </div>
        </div> -->
        <ButtonMobile
      :json="json" 
      :ori_json="ori_json" 
      :page_function="page_function"
      @print="handlePrint"
      @create-po="handleCreatePO"
      @confirm-post="confirmPost"
      @convert-new="handleConvertNew"
    />
    </div>
  </div>

  <q-dialog v-model="delete_child" persistent position="top">
    <q-card style="width: 864px; max-width: 98vw;text-align:center;margin-top: 5%;border-radius:8px;">
      <q-card-section class="theme_color row items-center" style="height:56px;padding: 8px 24px; border-bottom: 1px solid #a7bbcb;">
        <div class="confirm_title">Confirmation</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup :disable="showAddLoading || showAddLoading2"/>
      </q-card-section>

      <q-card-section  style="padding: 32px 24px">
        <!-- <span class="q-ml-sm custom_selection_font">{{general_body}}</span> -->
        <span class="confirmation_line_font">Are you sure to delete this line?</span>
      </q-card-section>

      <q-card-actions align="right" style="padding-top:0px;padding-bottom:16px;padding-right:16px">
        <div class="q-gutter-x-md">
        <q-btn flat label="Cancel" size="12px" font_color="#29292A" color="#29292A" v-close-popup class="dialog_confirm_cancel_button"/>
        <q-btn flat label="DELETE" size="12px" font_color="'white'" color="'#D81111'" class="dialog_confirm_delete_button" @click="handleDeleteLine" />
        </div>
      </q-card-actions>

      <q-inner-loading
        :showing="deleteLoading"
        color="primary"
      />
    </q-card>
  </q-dialog>

  <q-dialog v-model="post_transmain" persistent position="top">
      <q-card style="width: 864px; max-width: 80vw;text-align:center;margin-top: 2%; border-radius:8px">

        <q-card-section class="theme_color row items-center" style="height:56px; padding: 8px 24px;border-bottom: 1px solid #a7bbcb;">
          <div class="confirm_title">Confirmation</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup :disable="showAddLoading || showAddLoading2"/>
        </q-card-section>

        <q-card-section style="padding: 32px 24px">
          <!-- <span class="q-ml-sm custom_selection_font">{{general_body}}</span> -->
          <span v-if="json.BillStatus == 0" class="confirmation_line_font">Are you sure to post?</span>
          <span v-if="json.BillStatus == 1" class="confirmation_line_font">Are you sure to unpost?</span>
        </q-card-section>

        <q-card-actions align="right" style="padding-top:0px;padding-bottom:16px;padding-right:24px">
          <q-btn flat label="Cancel" size="12px" font_color="#29292A" color="#29292A" class="dialog_confirm_cancel_button" v-close-popup />
          <q-btn flat :label="json.BillStatus==1 ? 'UNPOST' : 'POST'" size="12px" text-color="white" :style="{ backgroundColor: json.BillStatus == 1 ? '#EF4444' : 'primary'}" class="dialog_confirm_print_button" @click="handlePostTransmain" />
        </q-card-actions>

        <q-inner-loading
          :showing="deleteLoading"
          color="primary"
        />
      </q-card>
    </q-dialog>

  <q-dialog v-model="modify_child" persistent :position="$q.screen.width > 599 ? 'top' : 'bottom'">
    <q-card v-if="$q.screen.width < 600" style="width: 700px; max-width: 98vw; margin-top: 5%;">
      <q-card-section class="row header_top_mobile" :style="{ textAlign: (!status && edit_child) ? 'center' : 'left' }">
        <div v-if="!status && edit_child" class="mobile_dialog_delete_btn" @click="handleDelete(jsonChild)">
          <!-- Delete -->
          <Button_icon :disabled="readonly_delete" :icon="'fas fa-trash-alt'" :flat="true" :color="''" :font-color="'black'" :outline="false" size="12px" v-on:click="handleDelete(jsonChild)" class="q-mr-sm" />
        </div>

        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div v-if="!edit_child" class="text-subtitle1 mobile_dialog_bottom" style="padding:16px 24px;margin-top: 0px;box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);">Credit Note Detail<br></div>
          <div v-else class="text-subtitle1 header_text" style="padding:16px 24px;margin-top: 0px;box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);">Edit Credit Note Detail<br></div>
        </div>
        <div class="custom_close_button">
          <q-btn icon="close" flat round dense @click="close()" :disable="false"/>
        </div>
      </q-card-section>

      <q-card-section class="upload_container">
        <q-form ref="save_edit_pochild_form">
          <div class="row upload_separator_first">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <div class="row input_wrapper_right q-pb-md">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 row gap-radio" :class="$q.screen.width > 1023 ? 'q-pl-sm': ''" style="padding-bottom: 16px">
                      <div class="row col-12">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <div class="row">
                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                              <span class="dialog_radio_title">Entry Type</span>
                            </div>
                            <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                              <Radio class="dialog_radio_options" size="xs" :disable="json.BillStatus == 1 || status" v-on:receiveChange="handleChangeEntryType" v-model="jsonChild.EntryType" :options="entry_type_options"  />
                            </div>
                          </div>
                        </div>
                      </div>
                    
                      <div class="row col-12">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <div class="row">
                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                              <span class="dialog_radio_title">Pricing Type</span>
                            </div>
                            <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                              <Radio class="dialog_radio_options" size="xs" :disable="json.BillStatus == 1 || status" v-on:receiveChange="handleChangePriceType" v-model="jsonChild.PriceType" :options="pricing_type_options"  />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"></div> -->
                    <div class="row col-12" style="gap:12px">
                    <div class="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
                      <div class="row">
                        <div class="" :class="edit_child ? 'col-xs-12' : 'col-xs-10 q-pr-sm'">
                          <div class="row">
                            <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Item Code</span>
                            </div> -->
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Item Code"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="jsonChild.Itemcode"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div v-if="!edit_child" class="button_upload_wrapper col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2" style="padding-top: 0px;">
                            <Button_icon ref="searchButton" :small_round="true" :flat="false" :font_color="'primary'" :color="'white'" :icon="'search'" :outline="true" size="15px"
                            v-on:receiveClick="showSearchDialog()" style="margin-top: 0px;height:100%" class="full-height full-width search_button_step2 search_button_icon primary_button_font"/>
                        </div>
                      </div>
                    </div>

                    <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 four_column_left">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <div class="row">
                            <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Description</span>
                            </div> -->
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Description"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="jsonChild.Description"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- <div v-if="hv_item" class="col-xs-6 col-sm-6 col-md-2 col-lg-2 col-xl-2 four_column_left two_column_left">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Barcode</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Select
                              :readonly="true"
                              :no_label="true"
                              v-model="jsonChild.Barcode"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.barcode : oridbComponentBehavior.select"
                              :options="barcode_options"
                              v-on:receiveChange="handleChange"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> -->
                    <div v-if="hv_item" class="row col-12">
                    <div v-if="hv_item" class="col-xs-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 q-pr-sm">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <div class="row">
                            <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Pack Size</span>
                            </div> -->
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Pack Size"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="jsonChild.PackSize"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right_readonly : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div v-if="hv_item" class="col-xs-6 col-sm-6 col-md-2 col-lg-2 col-xl-2 q-pl-sm">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <div class="row">
                            <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Article No</span>
                            </div> -->
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Article No"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="jsonChild.ArticleNo"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    </div>

                    <div v-if="hv_item" class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <div class="row">
                            <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Reason</span>
                            </div> -->
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Select
                              :readonly="json.BillStatus == 1 || status"
                              :no_label="false"
                              label="Reason"
                              v-model="jsonChild.reason"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.reason : oridbComponentBehavior.select"
                              :options="reason_options"
                              v-on:receiveChange="handleChangeType"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div v-if="hv_item" class="row col-12">
                    <div v-if="hv_item" class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-sm" :class="json.BillStatus == 1 || status ? 'col-xs-6' : 'col-xs-4 q-pr-sm'">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <div class="row">
                            <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Ori Invoice No</span>
                            </div> -->
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">

                              <Select
                              v-if="select_inv"
                              :readonly="json.BillStatus == 1 || status"
                              :no_label="false"
                              label="Ori Invoice No"
                              v-model="jsonChild.ori_inv_no"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.ori_inv_no : oridbComponentBehavior.select"
                              :options="ori_inv_no_options"
                              v-on:receiveChange="handleChangeOriInvNo"
                              />
                              <Input
                              v-else
                              :autofocusclick="true"
                              :no_label="false"
                              label="Ori Invoice No"
                              :readonly="json.BillStatus == 1 || status"
                              v-on:change="handleChange"
                              v-model="jsonChild.ori_inv_no"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div v-if="!status && hv_item" class="full-height col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 q-pr-sm q-pl-sm" style="height:100%">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <div class="row">
                            <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">&nbsp;</span>
                            </div> -->
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <!-- <Button_icon :small_round="true" :readonly="false" :flat="false" :font_color="'primary'" :color="'white'" :icon="select_inv ? 'playlist_add_check' : 'drive_file_rename_outline'" :outline="false" size="15px"
                              v-on:receiveClick="changeInvoiceMethod()" class="full-width search_button_secondary primary_button_font"/> -->
                              <Button_icon :small_round="true" :readonly="false" :flat="false" :font_color="'primary'" :color="'white'" :icon="select_inv ? 'playlist_add_check' : 'drive_file_rename_outline'" :outline="true" size="16px"
                              v-on:receiveClick="changeInvoiceMethod()" style="height:100%" class=" full-height full-width primary_button_font"/>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div v-if="hv_item" :class="json.BillStatus == 1 ? 'col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-sm': 'col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4'" > <!--:class="$q.screen.width>599 && $q.screen.width<1024 ? '' : ''"-->
                      <div class="row">
                        <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                          <span class="mobile_font">Qty</span>
                        </div> -->
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <Input
                          :autofocusclick="true"
                          :no_label="false"
                          label="Qty"
                          min='0'
                          :readonly="json.BillStatus == 1 || status"
                          v-on:change="handleChangeQty"
                          v-model="jsonChild.SetQty"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.input_number : oridbComponentBehavior.text" />
                        </div>
                      </div>
                    </div>
                    </div>
                  

                  <div v-if="hv_item" class="row col-12">
<!-- ORI INVOICE DAATE -->
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-sm">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <div class="row">
                            <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Ori invoice Date</span>
                            </div> -->
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Datepicker
                              :clickableInput="true"
                              :no_label="false"
                              label="Ori Invoice Date"
                              :disable="json.BillStatus == 1 || status ? true : select_inv"
                              :autoclose="true"
                              v-on:receiveChange="handleChangeInvoiveDate"
                              :daterange="jsonChild.ori_inv_date"
                              :componentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
<!-- UNIT PRICE -->
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-sm">
                      <div class="row" :class="page_function == 'EditPurchaseOrder' && $q.screen.width<599 ? '': ''">
                        <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                          <span class="mobile_font">Unit Price</span>
                        </div> -->
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <Input
                          :autofocusclick="true"
                          :no_label="false"
                          label="Unit Price"
                          :readonly="json.BillStatus == 1 || jsonChild.PriceType=='FOC' ? true :  unit ? false : true"
                          v-on:change="handleChangeUnitPrice"
                          v-model="jsonChild.UnitPrice"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right_readonly : oridbComponentBehavior.text" />
                        </div>
                      </div>
                    </div>
                  </div>
<!-- TOTAL -->
                  <div v-if="hv_item" class="row col-12">
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-sm">
                      <div class="row">
                        <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                          <span class="mobile_font">Total</span>
                        </div> -->
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <Input
                          :autofocusclick="true"
                          :no_label="false"
                          label="Total"
                          :readonly="json.BillStatus == 1 || status ? true : jsonChild.PriceType=='FOC' ? true :  unit"
                          v-on:change="handleChangeTotalPrice"
                          v-model="jsonChild.TotalPrice"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <q-separator v-if="hv_item" class="separator-style"></q-separator>
<!-- REMARKS -->
                  <div v-if="hv_item" class="row col-12">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                          <span class="mobile_font">Remark</span>
                        </div> -->
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <Textarea class="ignore_height" :no_label="false" :readonly="json.BillStatus == 1 || status ? true : json.BillStatus==1" v-on:receiveChange="handleChange" v-model="jsonChild.itemremark"
                          :dbComponentBehavior="dbComponentBehavior.remark" />
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
      </q-card-section>

      <q-card-actions v-if="!status && hv_item" class="dialog_action" style="padding: 0px 16px 16px 16px">
        <div class="row full-width">
          <div v-if="!edit_child" class="col-xs-6 q-pr-xs">
            <Button_icon class="full-width" style="height: 30px;" :small_round="true" :text="'ADD'" :flat="false" :font_color="'white'" :color="'primary'" :outline="false" size="13px" @click="handleChild('save&add')"/>
          </div>
          <div :class="!edit_child ? 'col-xs-6 q-pl-xs': 'full-width'">
            <Button_icon class="dialog_done_button full-width" style="height: 30px;" :small_round="true" :text="'DONE'" :flat="false" :font_color="'white'" :color="'primary'" :outline="false" size="16px" @click="handleChild('save')"/>
          </div>
        </div>
      </q-card-actions>

      <q-inner-loading
        :showing="showAddLoading"
        color="primary"
      />
    </q-card>

    <q-card v-else style="width: 864px; max-width: 98vw; margin-top: 5%; border-radius:8px">
      <q-card-section class=" row theme_color dialog_header" style="height:56px; padding: 8px 24px;">
          <div class="text-subtitle1 header_text" style="margin-top: 5px;">Credit Note Detail<br></div>
          <q-space />
          <q-btn icon="close" flat round dense @click="close()" :disable="false"/>
      </q-card-section>

      <q-card-section class="upload_container">
        <q-form ref="save_edit_pochild_form">
          <div class="row upload_separator_first">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
<!-- credit note detail not complete -->
              <div v-if="$q.screen.width > 599 && $q.screen.width < 1024" class="row input_wrapper_right">
              <div v-if="json.BillStatus == 0 && edit_child" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" align="right">
                <Button_icon :disabled="readonly_delete" :icon="'fas fa-trash-alt'" :flat="true" :color="''" :font-color="'black'" :outline="false" size="12px" v-on:click="handleDelete(jsonChild)" class="text-red q-mr-sm" />
              </div>
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <div class="row po_details_separator po_details_custom">
                    <div class="row col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 gap-radio" :class="$q.screen.width > 1023 ? 'q-pl-xs': ''">
                      <div class="row col-12">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <div class="row">
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                              <span class="dialog_radio_title">Entry Type</span>
                            </div>
                            <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                              <Radio class="dialog_radio_options" size="sm" :disable="json.BillStatus == 1" v-on:receiveChange="handleChangeEntryType" v-model="jsonChild.EntryType" :options="entry_type_options"  />
                            </div>
                          </div>
                        </div>
                      </div>
                    
                            <div class="row col-12">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <div class="row">
                                  <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                                    <span class="dialog_radio_title">Pricing Type</span>
                                  </div>
                                  <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                                    <Radio class="dialog_radio_options" size="sm" :disable="json.BillStatus == 1" v-on:receiveChange="handleChangePriceType" v-model="jsonChild.PriceType" :options="pricing_type_options"  />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <!-- <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"></div> -->
                    <q-separator class="separator-style"></q-separator>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                      <div class="row gap-style">
                        <div class="row col-12">
                          <div class="q-pr-md" :class="edit_child ? 'col-sm-6' : 'col-sm-5'">
                            <div class="row">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <div class="row">
                                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <Input
                                    :autofocusclick="true"
                                    :no_label="false"
                                    label="Item Code"
                                    :readonly="true"
                                    v-on:change="handleChange"
                                    v-model="jsonChild.Itemcode"
                                    :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div v-if="!edit_child" dir="rtl" class="col-xs-2 col-sm-1 col-md-2 col-lg-2 col-xl-2 q-pr-md" style="padding-top: 0px;">
                            <Button_icon ref="searchButton" :flat="false" :font_color="'primary'" :color="'white'" :icon="'search'" :outline="true" size="12px"
                            v-on:receiveClick="showSearchDialog()" class="full-width search_button search_button_icon primary_button_font" style="height:100%"/>
                          </div>

                          <div class="col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 q-pl-md">
                            <div class="row">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <div class="row">
                                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <Input
                                    :autofocusclick="true"
                                    :no_label="false"
                                    label="Description"
                                    :readonly="true"
                                    v-on:change="handleChange"
                                    v-model="jsonChild.Description"
                                    :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <!-- <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 four_column_left two_column_left">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
                              <div class="row">
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                   <Input
                                  v-if="edit_child"
                                  :autofocusclick="true"
                                  :no_label="false"
                                  label="Barcode"
                                  :readonly="true"
                                  v-on:change="handleChange"
                                  v-model="jsonChild.Barcode"
                                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                                   <Select
                                  :readonly="true"
                                  :no_label="false"
                                  v-model="jsonChild.Barcode"
                                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.barcode : oridbComponentBehavior.select"
                                  :options="barcode_options"
                                  v-on:receiveChange="handleChange"
                                  /> 
                                </div>
                              </div>
                            </div>
                          </div>
                        </div> -->

                        <div class="row col-12">
                          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-md">
                            <div class="row">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <div class="row">
                                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <Input
                                    :autofocusclick="true"
                                    :no_label="false"
                                    label="Article No"
                                    :readonly="true"
                                    v-on:change="handleChange"
                                    v-model="jsonChild.ArticleNo"
                                    :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-md">
                            <div class="row">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <div class="row">
                                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <Input
                                    :autofocusclick="true"
                                    :no_label="false"
                                    label="Pack Size"
                                    :readonly="true"
                                    v-on:change="handleChange"
                                    v-model="jsonChild.PackSize"
                                    :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right_readonly : oridbComponentBehavior.text" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="row col-12">
                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-md"><!--reason -->
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <div class="row">
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                  <Select
                                  :readonly="json.BillStatus == 1"
                                  :no_label="false"
                                  v-model="jsonChild.reason"
                                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.reason : oridbComponentBehavior.select"
                                  :options="reason_options"
                                  v-on:receiveChange="handleChangeType"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-md" :class="$q.screen.width>599 && $q.screen.width<1024 ? '' : ''">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Qty"
                              min='0'
                              :readonly="json.BillStatus == 1"
                              v-on:change="handleChangeQty"
                              v-model="jsonChild.SetQty"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.input_number : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>
                        </div>
                        <div class="row col-12">
                        <div class="q-pr-md" :class="json.BillStatus == 1 ? 'col-sm-6' : 'col-sm-5'">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <div class="row">
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                  <!-- <SelectFilter
                                  v-if="select_inv"
                                  :readonly="false"
                                  :no_label="false"
                                  :label="'Ori Invoice No'"
                                  v-model:pass_value="jsonChild.ori_inv_no"
                                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.select"
                                  :options="ori_inv_no_options"
                                  v-on:receiveChange="handleChangeOriInvNo"
                                  /> -->
                                  <Select
                                  v-if="select_inv"
                                  :readonly="json.BillStatus == 1"
                                  :no_label="false"
                                  v-model="jsonChild.ori_inv_no"
                                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.ori_inv_no : oridbComponentBehavior.select"
                                  :options="ori_inv_no_options"
                                  v-on:receiveChange="handleChangeOriInvNo"
                                  />
                                  <Input
                                  v-else
                                  :autofocusclick="true"
                                  :no_label="false"
                                  label="Ori Invoice No"
                                  :readonly="json.BillStatus == 1"
                                  v-on:change="handleChange"
                                  v-model="jsonChild.ori_inv_no"
                                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div v-if="json.BillStatus == 0" dir="rtl" class="button_upload_wrapper col-xs-2 col-sm-1 col-md-2 col-lg-2 col-xl-2 q-pr-md">
                          <Button_icon :flat="true" :font_color="'primary'" :color="'white'" :icon="select_inv ? 'playlist_add_check' : 'drive_file_rename_outline'" :outline="false" size="14px"
                          v-on:receiveClick="changeInvoiceMethod()" class="full-width search_button search_button_icon primary_button_font" style="height:100%"/>
                        </div>
                        <!-- :readonly="unit ? false : true" -->
                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-md" :class="$q.screen.width>599 && $q.screen.width<1024 ? '' : ''">
                          <div class="row" :class="page_function == 'EditPurchaseOrder' && $q.screen.width<599 ? '': ''">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Unit Price"
                              :readonly="json.BillStatus == 1 || jsonChild.PriceType=='FOC' ? true :  unit ? false : true"
                              v-on:change="handleChangeUnitPrice"
                              v-model="jsonChild.UnitPrice"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right_readonly : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>
                        </div>
                        
                        <div class="row col-12">
                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-md">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <div class="row">
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">

                                  <Datepicker
                                  :clickableInput="true"
                                  :no_label="false"
                                  label="Ori Invoive Date"
                                  :disable="select_inv"
                                  :autoclose="true"
                                  v-on:receiveChange="handleChangeInvoiveDate"
                                  :daterange="jsonChild.ori_inv_date"
                                  :componentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                          
                          

                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-md">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Total"
                              :readonly="jsonChild.PriceType=='FOC' ? true :  unit"
                              v-on:change="handleChangeTotalPrice"
                              v-model="jsonChild.TotalPrice"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <q-separator class="separator-style"></q-separator>
                      <div class="row col-12">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <Textarea class="ignore_height" :no_label="false" :readonly="json.BillStatus==1" v-on:receiveChange="handleChange" v-model="jsonChild.itemremark"
                            :dbComponentBehavior="dbComponentBehavior.remark" />
                        </div>
                      </div>
                  </div>
                    </div>
                    </div>
              </div>
              </div>
              </div>
<!-- credit note detail -->
              <div v-if="$q.screen.width > 1023" class="row">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <div class="row gap-radio">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" :class="$q.screen.width > 1023 ? 'q-pl-xs': ''">
                      <div class="row po_details_custom_row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <div class="row">
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                              <span class="dialog_radio_title">Entry Type</span>
                            </div>
                            <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                              <Radio class="dialog_radio_options" size="sm" :disable="json.BillStatus == 1" v-on:receiveChange="handleChangeEntryType" v-model="jsonChild.EntryType" :options="entry_type_options"  />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6"></div> -->

                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" :class="$q.screen.width > 1023 ? 'q-pl-xs': ''">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                          <div class="row">
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                              <span class="dialog_radio_title">Pricing Type</span>
                            </div>
                            <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                              <Radio class="dialog_radio_options" size="md" :disable="json.BillStatus == 1" v-on:receiveChange="handleChangePriceType" v-model="jsonChild.PriceType" :options="pricing_type_options"  />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    </div>

                    <!-- <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"></div> -->
                    
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                      <div class="row gap-style">
                        <q-separator class="separator-style"></q-separator>
                        <div class="row col-12">
                          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-md">
                            <div class="row">
                            <div class="" :class="edit_child ? 'col-md-12 col-lg-12 col-xl-12' : 'col-md-10 col-lg-10 col-xl-10 q-pr-md'">
                              
                                      <Input
                                      :autofocusclick="true"
                                      :no_label="false"
                                      label="Item Code"
                                      :readonly="true"
                                      v-on:change="handleChange"
                                      v-model="jsonChild.Itemcode"
                                      :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text" />
                                    
                              </div>

                        <div v-if="!edit_child" dir="rtl" class=" col-xs-2 col-sm-1 col-md-2 col-lg-2 col-xl-2" style="padding-top: 0px;">
                          <Button_icon ref="searchButton" :flat="false" :font_color="'primary'" :color="'white'" :icon="'search'" :outline="true" size="13px"
                          v-on:receiveClick="showSearchDialog()" class="full-width search_button search_button_icon primary_button_font" style="height:100%"/>
                        </div>
                        </div>
                        </div>
                        
                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-md">
                          
                                  <Input
                                  :autofocusclick="true"
                                  :no_label="false"
                                  label="Description"
                                  :readonly="true"
                                  v-on:change="handleChange"
                                  v-model="jsonChild.Description"
                                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                                
                        </div>
                          </div>
                        <!-- <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 four_column_left two_column_left">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
                              <div class="row">
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"> -->
                                  <!-- <Input
                                  v-if="edit_child"
                                  :autofocusclick="true"
                                  :no_label="false"
                                  label="Barcode"
                                  :readonly="json.BillStatus == 1"
                                  v-on:change="handleChange"
                                  v-model="jsonChild.Barcode"
                                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" /> -->
                                  <!-- <Select
                                  :readonly="json.BillStatus == 1"
                                  :no_label="false"
                                  v-model="jsonChild.Barcode"
                                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.barcode : oridbComponentBehavior.select"
                                  :options="barcode_options"
                                  v-on:receiveChange="handleChange"
                                  /> -->
                                <!-- </div>
                              </div>
                            </div>
                          </div>
                        </div> -->

                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <div class="row col-12">
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-md">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Pack Size"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="jsonChild.PackSize"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right_readonly : oridbComponentBehavior.text" />
                            </div>
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-md" :class="$q.screen.width>599 && $q.screen.width<1024 ? 'two_column_left' : !edit_child ? 'two_column_left' : ''">
                                <Input
                                :autofocusclick="true"
                                :no_label="false"
                                label="Qty"
                                min='0'
                                :readonly="json.BillStatus == 1"
                                v-on:change="handleChangeQty"
                                v-model="jsonChild.SetQty"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.input_number : oridbComponentBehavior.text" />
                          </div>
                          </div>
                        </div>
                        
                        <div class="row col-12">
                          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-md">
                            
                                    <Input
                                    :autofocusclick="true"
                                    :no_label="false"
                                    label="Article No"
                                    :readonly="true"
                                    v-on:change="handleChange"
                                    v-model="jsonChild.ArticleNo"
                                    :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                          </div>
                          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-md">
                            
                                    <Select
                                    :readonly="json.BillStatus == 1"
                                    :no_label="false"
                                    v-model="jsonChild.reason"
                                    :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.reason : oridbComponentBehavior.select"
                                    :options="reason_options"
                                    v-on:receiveChange="handleChangeType"
                                    />
                          </div>
                        </div>
                            
  <!-- <q-separator class="separator-style"></q-separator>                       -->
<!-- invoice no -->
                    <div class="row col-12">
                      
                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-md">
                          <div class="row">
                            <div class="" :class="json.BillStatus == 1 ? 'col-md-12 col-lg-12 col-xl-12' : 'col-md-10 col-lg-10 col-xl-10 q-pr-md'">
                                  <!-- <SelectFilter
                                  v-if="select_inv"
                                  :readonly="false"
                                  :no_label="false"
                                  :label="'Ori Invoice No'"
                                  v-model:pass_value="jsonChild.ori_inv_no"
                                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.select"
                                  :options="ori_inv_no_options"
                                  v-on:receiveChange="handleChangeOriInvNo"
                                  /> -->

                                  <Select
                                  v-if="select_inv"
                                  :readonly="json.BillStatus == 1"
                                  :no_label="false"
                                  v-model="jsonChild.ori_inv_no"
                                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.ori_inv_no : oridbComponentBehavior.select"
                                  :options="ori_inv_no_options"
                                  v-on:receiveChange="handleChangeOriInvNo"
                                  />

                                  <Input
                                  v-else
                                  :autofocusclick="true"
                                  :no_label="false"
                                  label="Ori Invoice No"
                                  :readonly="json.BillStatus == 1"
                                  v-on:change="handleChange"
                                  v-model="jsonChild.ori_inv_no"
                                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text" />
                             
                            </div>

                        <div v-if="json.BillStatus == 0" dir="rtl" class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                          <Button_icon :flat="false" :font_color="'primary'" :color="'white'" :icon="select_inv ? 'playlist_add_check' : 'drive_file_rename_outline'" :outline="true" size="13px"
                          v-on:receiveClick="changeInvoiceMethod()" class="full-width search_button_icon search_button primary_button_font" style="height:100%"/>
                        </div>
                        </div>
                        </div>
                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-md">
                          
                            
                                  <Datepicker
                                  :clickableInput="true"
                                  :no_label="false"
                                  label="Ori Invoive Date"
                                  :disable="select_inv"
                                  :autoclose="true"
                                  v-on:receiveChange="handleChangeInvoiveDate"
                                  :daterange="jsonChild.ori_inv_date"
                                  :componentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text" />
                                
                        </div>
                    </div>    
                        <!-- <div class="col-xs-6 col-sm-2 col-md-4 col-lg-4 col-xl-4 four_column_left" :class="$q.screen.width>599 && $q.screen.width<1024 ? 'two_column_left' : !edit_child ? 'two_column_left' : ''">
                          <div class="row dialog_separator">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Qty"
                              :readonly="json.BillStatus == 1"
                              v-on:change="handleChangeQty"
                              v-model="jsonChild.SetQty"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div> -->
                        <div class="row col-12">
                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-md" :class="!edit_child ? 'two_column_left': ''">
                          
                            
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Unit Price"
                              :readonly="json.BillStatus == 1 || jsonChild.PriceType=='FOC' ? true :  unit ? false : true"
                              v-on:change="handleChangeUnitPrice"
                              v-model="jsonChild.UnitPrice"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right_readonly : oridbComponentBehavior.text" />
                        </div>
                          
                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-md">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Total"
                              :readonly="jsonChild.PriceType=='FOC' ? true :  unit"
                              v-on:change="handleChangeTotalPrice"
                              v-model="jsonChild.TotalPrice"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                           
                        </div>
                      </div>
                      <q-separator class="separator-style"></q-separator>
                      <div class="row col-12">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" :class="$q.screen.width>599 && $q.screen.width<1024 ? 'two_column_left' : !edit_child ? 'two_column_left' : ''">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Textarea class="ignore_height" :no_label="false" :readonly="json.BillStatus==1" v-on:receiveChange="handleChange" v-model="jsonChild.itemremark"
                              :dbComponentBehavior="dbComponentBehavior.remark" />
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
      </q-card-section>

      <q-card-actions v-if="json.BillStatus == 0" class="" style="padding-top:0px;padding-right: 16px;padding-bottom: 16px">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" align="right">
          <Button_icon :readonly="false" :flat="true"   :text="'SAVE'" :outline="false" size="15px"
          v-on:receiveClick="handleChild('save')" :class="{ 'primary_actions_button': edit_child, 'secondary_actions_button': !edit_child }"/>
          

          <span class="q-pl-md" v-if="!edit_child"/>
          <!-- secondary_primary button :font_color="'white'" :color="'#1E90FF'" -->
          <Button_icon v-if="!edit_child" :readonly="false" :flat="true" :font_color="'white'" :color="'rgb(9, 65, 97)'"  :text="'ADD'" :outline="false" size="15px"
          v-on:receiveClick="handleChild('save&add')" class="primary_actions_button"/>
        </div>
      </q-card-actions>

      <q-inner-loading
        :showing="showAddLoading"
        color="primary"
      />
    </q-card>
  </q-dialog>

  <!-- receiving methods -->
  <q-dialog v-model="receiving_methods" persistent :position="$q.screen.width > 599 ? 'top' : 'bottom'">
    <q-card style="text-align:left;margin-top: 5%; height:150px">
      <q-card-section class="header_top_mobile">
        <!-- <Button_icon :disable="showAddLoading" :big_round="true" :flat="true" :font_color="'#928f8f'" :color="'rgba(255, 255, 255, 0.5)'" :icon="'arrow_back_ios'" :outline="true" size="12px" class="custom_back_button" @click="back()" /> -->
      <div class="text-right">
        <q-btn icon="close" flat round dense v-close-popup :disable="showAddLoading || showAddLoading2"/>
      </div>

      </q-card-section>

      <q-card-section class="q-pt-none card_sides">
        <div  v-if="json.BillStatus == 0" class="row q-pt-xs q-pl-md q-pr-md" style="gap:10px; ">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" @click="addButtonCreatePOChild('item')">
          <div class="row justify-center items-center" style="width: 100%; height: 60px;">
            <div class="q-pr-sm">
              <Button_icon :flat="false" :icon="'add'" v-on:receiveClick="addButtonCreatePOChild('item')" :font_color="'white'" :color="'primary'" :outline="false" size="16px"
              :text="$language('D0152')" class="dialog_detail_add_button"/><!--   Add Item Details -->
            </div>
            <!-- <div>
              {{ $language('D0152') }}
              
            </div> -->
          </div>
        </div>
        </div>

      </q-card-section>

      <q-inner-loading
        :showing="showAddLoading"
        color="primary"
      />
    </q-card>

  </q-dialog>

  <q-dialog v-model="search_item" persistent :position="$q.screen.width > 599 ? 'top' : 'bottom'">
    <SearchPopUp
      :select_row="Object.keys(selected_row).length != 0"
      :title="search_supplier ? 'Supplier' : 'Item'"
      :pass_value="search"
      v-on:show_table="showSearchTable"
      :forceLoading="forceLoading"
      :showAddLoading="showAddLoading"
      v-on:onRowClick="handleRowClick"
      :row_per_page="[5,10,20,50,0]"
      :top_button="false"
      v-on:add_button="addButtonCreate"
      v-on:main_action="handleAction"
      v-on:main_edit="handleEdit"
      v-on:main_list="handleList"
      v-on:main_delete="handleDelete"
      :table_title="table_title"
      :table_data="item_table_data"
      :table_column="item_table_column"
      :action_button="true"
      :edit_button="false"
      :view_button="false"
      :delete_button="false"
      :flat_status="true"
      :bordered_status="true"
      v-on:receive_request_table="handleItemTableChange"
      v-on:onClickModify="handleModifyItemcode"
      v-on:onCloseDialog="closeSearchItem"
    />
  </q-dialog>

  <q-dialog v-model="view_summary" persistent :position="$q.screen.width > 599 ? 'top' : 'bottom'">
    <!-- <q-card style="text-align:left;margin-top: 5%;">
      <q-card-section class="header_top_mobile">
        <div class="text-right">
          <q-btn icon="close" flat round dense v-close-popup :disable="showAddLoading || showAddLoading2"/>
        </div>
      </q-card-section>
      <q-card-section class="q-pt-none card_sides">
        <div class="card_ypadding">
          <div class="row justify-center">
             <span style="font-size: 14px;"><b>Total Amount</b></span>
            <Button_icon :readonly="true" :big_round="true" :flat="true" :font_color="'white'" :color="'green'" :icon="'verified'" :outline="true" size="30px" />
          </div>


          <div class="row q-pt-md q-px-xl " style="font-size: 14px; ">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-py-xs">
                <div class="row">
                  <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5"><b>GROSS</b></div>
                  <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1 col-xl-1"><b>:</b></div>
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 text-right">{{currency_sign}} {{json.SubTotal1}}</div>
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-py-xs">
                <div class="row">
                  <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5"><b>Tax</b></div>
                  <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1 col-xl-1"><b>:</b></div>
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 text-right" style="color:#1976D2;">{{currency_sign}} {{json.gst_tax_sum}}</div>
                </div>
            </div>

          </div>


        </div>
      </q-card-section>

      <q-inner-loading
        :showing="showAddLoading"
        color="primary"
      />
    </q-card> -->
    <ViewSummaryDialog 
      :page_function="page_function" 
      :json="json"
    />
  </q-dialog>

  <q-dialog v-model="warning_report_dialog" persistent position="top">
    <q-card style="width: 864px; max-width: 80vw;text-align:center;margin-top: 5%;border-radius:8px">

      <q-card-section class="theme_color row items-center" style="height:56px; padding: 8px 24px;border-bottom: 1px solid #a7bbcb;">
        <div class="confirm_title">CN Print</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup :disable="showAddLoading"/>
      </q-card-section>

      <q-card-section>
        <!-- <span class="q-ml-sm custom_selection_font">{{general_body}}</span> -->

        <!-- <q-table
            flat
            dense
            bordered
            :rows="rows_print"
            :columns="columns_print"
            row-key="name"
            hide-bottom
          />
        -->

        <PrintListTable
              hide_footer
              :group_button="group_button"
              :select_all="select_all"
              :readonly_button="false"
              :row_per_page="[0]"
              :top_button="false"
              :top_button_dropdown="false"
              :title="table_title"
              :table_data="rows_print"
              :table_column="columns_print"
              :action_button="false"
              :edit_button="false"
              :view_button="false"
              :delete_button="json.BillStatus == 0"
              :flat_status="true"
              :bordered_status="true"
              v-on:receiveRequestTable="handlePrintTableChange"
              v-on:onRowClick = "handlePrintSelect"
          />
      </q-card-section>

      <q-card-actions align="right" style="padding: 16px 24px">
        <q-btn flat outline size="12px" :label="$language('D0116')" font_color="#29292A" color="#29292A" class="dialog_confirm_cancel_button" v-close-popup />
        <q-btn :flat="false"  size="12px" label="Print" font_color="white" :color="'#1E90FF'" class="dialog_confirm_print_button" @click="handlePrintWarning" />
      </q-card-actions>

      <q-inner-loading
        :showing="printLoading"
        color="primary"
      />
    </q-card>
  </q-dialog>
</template>

<script>
import ViewSummaryDialog from 'src/components/ERP/Base/ViewSummaryDialog'
import ButtonMobile from 'src/components/ERP/Base/ButtonMobile'
import Chip from 'src/components/ERP/Base/Chip';
import Input from 'src/components/ERP/Base/Input'
import Select from 'src/components/ERP/Base/Select'
import Datepicker from 'src/components/ERP/Base/Datepicker'
import Checkbox from 'src/components/ERP/Base/Checkbox'
import Toggle from 'src/components/ERP/Base/Toggle'
import PurchaseTable from 'src/components/ERP/Purchase/PurchaseTable'
import Button_icon from 'src/components/ERP/Base/Button_icon'
import Radio from 'src/components/ERP/Base/Radio';
import { Notify } from "quasar";
import SelectFilter from 'src/components/ERP/Base/SelectFilter'
import ItemTable from 'src/components/ERP/Purchase/ItemTable'
import SearchPopUp from 'src/components/ERP/Purchase/SearchPopUp'
import SelectPlaceholder from 'src/components/ERP/Base/SelectPlaceholder'
import Textarea from'src/components/ERP/Base/Textarea' ;
import { StreamBarcodeReader } from "vue-barcode-reader";
import DatepickerOptions from 'src/components/ERP/Purchase/DatepickerOptions';
import { Loading, QSpinnerTail} from 'quasar'
import PrintListTable from 'src/components/ERP/Purchase/PrintListTable'

export default{
  data() {
    return {
      selectedCardIndex: null,
      retailer_guid: sessionStorage.getItem("retailer_guid") != "" && sessionStorage.getItem("retailer_guid") != "null" && sessionStorage.getItem("retailer_guid") != null ? sessionStorage.getItem("retailer_guid") : [],
      user_name: sessionStorage.getItem("user_name") != "" && sessionStorage.getItem("user_name") != "null" && sessionStorage.getItem("user_name") != null ? sessionStorage.getItem("user_name") : [],
      language: sessionStorage.getItem("language") != "" && sessionStorage.getItem("language") != "null" && sessionStorage.getItem("language") != null ? sessionStorage.getItem("language") : [],
      currency_sign: sessionStorage.getItem("currency_sign") != "" && sessionStorage.getItem("currency_sign") != "null" && sessionStorage.getItem("currency_sign") != null ? sessionStorage.getItem("currency_sign") : [],
      session_outlet_guid: sessionStorage.getItem("session_outlet_guid") != "" && sessionStorage.getItem("session_outlet_guid") != "null" && sessionStorage.getItem("session_outlet_guid") != null ? sessionStorage.getItem("session_outlet_guid") : [],
      concat_name_fullname: sessionStorage.getItem("concat_name_fullname") != "" && sessionStorage.getItem("concat_name_fullname") != "null" && sessionStorage.getItem("concat_name_fullname") != null ? sessionStorage.getItem("concat_name_fullname") : [],
      outlet_options: [],
      supplier_options: [],
      term_options: [
        {
          label: 1,
          value: 1,
        },
        {
          label: 2,
          value: 2,
        },
        {
          label: 3,
          value: 3,
        },
        {
          label: 4,
          value: 4,
        },
      ],
      entry_type_options: [
        {
          label: "Unit Price",
          value: "Unit"
        },
        {
          label: "Total Price",
          value: "total"
        }
      ],
      pricing_type_options: [
        {
          label: "Normal",
          value: "Norm"
        },
        {
          label: "FOC",
          value: "FOC"
        }
      ],
      reason_options: [
      {
          label: "BUY 1 FREE 1",
          value: "BUY 1 FREE 1"
        },
        {
          label: "CHANGE OF PACKAGING",
          value: "CHANGE OF PACKAGING"
        },
        {
          label: "DAMAGED",
          value: "DAMAGED"
        },
        {
          label: "END OF PROMOTION",
          value: "END OF PROMOTION"
        },
        {
          label: "EXPIRED",
          value: "EXPIRED"
        },
        {
          label: "PRODUCT RECALL",
          value: "PRODUCT RECALL"
        },
        {
          label: "SHORT SUPPLY",
          value: "SHORT SUPPLY"
        },
      ],
      barcode_options: [],
      supplier_options2: [],
      table_column: [],
      table_data: [],
      table_column1: [],
      table_data1: [],
      item_table_column: [],
      item_table_data: [],
      showAddLoading: false,
      showAddLoading2: false,
      json: {
        BillStatus: 0,
        step: 1,
        sup_cn_no: '',
        in_kind: 0,
        AutoClosePO: 0,
        posted: 0,
        amended: 0,
        canceled: 0,
        completed: 0,
        issued_by_hq: 0,
        b2b: 0,
        uploaded: 0,
        DocNo:"",
        Remark: '',
        SubTotal1: '0.00'
      },
      ori_json: {},
      search: {
        options: [],
        type: "",
        value: "",
        showTable: false
      },
      jsonChild: {},
      all_supcus: {},
      all_location: {},
      status: "",
      page_function: this.$route.name,
      cardtype_guid: "",
      location_options: [],
      location_options2: [],
      active_delete_json: {},
      delete_child: false,
      modify_child: false,
      edit_child: false,
      post_transmain: false,
      supplier_readonly: false,
      ori_params: {},
      ori_params1: {},
      item_ori_params: {},
      unit: false,
      selected_row: {},
      deleteLoading: false,
      results: [],
      select_inv: true,
      ori_inv_no_options: [],
      search_item: false,
      search_supplier: false,
      hv_item: false,
      view_summary:false,
      optionsDate:[],
      warning_report_dialog:false,
      rows_print:[],
      columns_print:[],
      receiving_methods: false,
    }
  },
  components:{
    ViewSummaryDialog,
    ButtonMobile,
    Chip,
    Input,
    Select,
    Datepicker,
    Checkbox,
    Toggle,
    PurchaseTable,
    Button_icon,
    SelectFilter,
    Radio,
    SearchPopUp,
    // ItemTable,
    // SelectPlaceholder,
    Textarea,
    DatepickerOptions,
    PrintListTable

  },
  computed: {
    dbComponentBehavior() {
      return this.$store.getters['dbComponentBehavior/byLanguage']('erp')
    },
  },
  async created () {
    this.showAddLoading = true;

    var currentdate = new Date();

    var current_date_format = currentdate.getFullYear()+"-"+('0' + (currentdate.getMonth()+1)).slice(-2)+"-"+('0' + currentdate.getDate()).slice(-2);

    this.json.DocDate = current_date_format;
    this.json.sup_cn_date = current_date_format;

    var payload = {
      params: {
        type: 'S',
        skip: 0,
        limit: 99999999,
        language: this.language
      }
    }



    var lpayload = {}


    var location = await this.getLocation(lpayload);
    var location_results = location.data;
    // console.log('location',location);
    // console.log('location_results',location_results);
    var payloadS = {
      params: {
        type: 'S',
        branch: location_results[0].LocGroup,
        active:1,
        skip: 0,
        limit: 99999999,
        language: this.language
      }
    }
    var supcus = await this.getSupcus(payloadS);
    var supcus_results = supcus.data;


    this.all_supcus = supcus_results;
    this.all_location = location_results;
    var supcus_code = [];
    var supcus_name = [];
    var loc_group = [];
    var loc_opt = [];

    for(var i in supcus_results)
    {
      var sample = supcus_results[i];

      var obj = {
        label: sample.Code + ' - ' + sample.Name,
        value: sample.Code
      }

      var obj1 = {
        label: sample.Name,
        value: sample.Code
      }

      supcus_code.push(obj);
      supcus_name.push(obj1);
    }

    for(var i in location_results)
    {
      var lsample = location_results[i];

      // var obj2 = {
      //   label: lsample.LocGroup + ' - ' + lsample.Description,
      //   value: lsample.LocGroup
      // }

      var obj3 = {
        label: lsample.Code + ' - ' + lsample.Description,
        value: lsample.Code
      }

      // loc_group.push(obj2);
      loc_opt.push(obj3);
    }

    var uniqueLocGroupObj = {}; // Use an object to store unique keys

    // Use a for loop to iterate over 'location_results'
    for (let i = 0; i < location_results.length; i++) {
        const item = location_results[i];
        if (!uniqueLocGroupObj[item.LocGroup]) {
            uniqueLocGroupObj[item.LocGroup] = {
                label: item.LocGroup + ' - ' + item.LocGroup_description,
                value: item.LocGroup
            };
        }
    }

    var array_logGrop = Object.values(uniqueLocGroupObj); // Convert object values to an array
    this.supplier_options = supcus_code;
    this.supplier_options2 = supcus_name;
    this.location_options = array_logGrop;
    this.location_options2 = loc_opt;

    if(this.page_function == 'EditCreditNote')
    {
      var cpayload =
      {
        RefNo: this.$route.query.refno,
        language: this.language
      }

      var cdata = await this.getCnchild(cpayload);
      var cresults = cdata.response;

      this.supplier_readonly = cresults.length > 0;
      var refno = this.$route.query.refno;

      // if(refno == undefined || refno == '')
      // {
      //   this.$router.push('/ERP/purchase/PurchaseOrder')
      //   return;
      // }

      var payload = {
        RefNo: refno,
        language: this.language
      }

      var data = await this.getFilterCnmain(payload);
      var filtered_transmain = data.response;
   // console.log('filtered_transmain',filtered_transmain);
   // filtered_transmain.rebate_amt = this.formatAmount(filtered_transmain.rebate_amt, '$');
      filtered_transmain.Total = this.formatAmount(filtered_transmain.Total, '$');
      filtered_transmain.CN_Total_Inc_Tax = this.formatAmount(filtered_transmain.CN_Total_Inc_Tax, '$');
      filtered_transmain.gst_tax_sum = this.formatAmount(filtered_transmain.gst_tax_sum, '$');
      filtered_transmain.SubTotal1 = this.formatAmount(filtered_transmain.SubTotal1, '$');
      if(filtered_transmain.stockday_min == 0.0)
      {
        filtered_transmain.stockday_min = '0';
      }
      if(filtered_transmain.stockday_max == 0.0)
      {
        filtered_transmain.stockday_max = '0';
      }
      if(filtered_transmain.pur_expiry_days == null || filtered_transmain.pur_expiry_days == 0)
      {
        filtered_transmain.pur_expiry_days = '0';
      }
      // var numericPart = filtered_transmain.Code.substring(2);
      this.json = filtered_transmain;
      this.status = this.json.BillStatus == 1;

      var filter_outlet = array_logGrop.filter((entry)=>{
        return entry.value == this.json.locgroup;
      })

      this.json.ChildNo = this.formatAmount(cresults.length,'qty');
      this.json.Branch = filter_outlet[0].value;
      this.json.step = this.$route.query.step ? Number(this.$route.query.step) : 1;
      this.json.Remark = this.json.Remark==null ? '' : this.json.Remark;
      // this.json.Code = numericPart
      this.ori_json = JSON.parse(JSON.stringify(this.json))
    }

    var table_newVal = {
      filter: undefined,
      pagination: {
        descending: "",
        page: 1,
        rowsNumber: 100,
        rowsPerPage: 0,
        sortBy: ""
      }
    }

    this.handleTableChange(table_newVal);
    this.showAddLoading = false;
  },
  methods: {
      selectCard(index) {
      this.selectedCardIndex = this.selectedCardIndex === index ? null : index;
      },
      handleConvertNew(){
        this.receiving_methods = true;
      },
      handleNavigate (type) {
          if(type =='CreditNote')
        {
          this.$router.push("CreditNote");
          // this.$router.push({ name: "Create" + this.page_function });
        }
        else if (type =='Outlet') {
          this.$router.push("/erp/location/outletlocation");
        }
      },
      deepEqual(ori_json, json)
      {
        var ori_keys = Object.keys(ori_json);
        var json_keys = Object.keys(json);

        if (ori_keys.length !== json_keys.length) {
          return false;
        }

        for (let key of ori_keys) {
          if(key != 'step')
          {
            var val1 = ori_json[key];
            var val2 = json[key];
            var areObjects = this.isObject(val1) && this.isObject(val2);
            if (
              (areObjects && !deepEqual(val1, val2)) ||
              (!areObjects && val1 !== val2)
            ) {
              return false;
            }
          }
        }

        return true;
      },
      isObject(obj)
      {
        return obj != null && typeof obj === 'object';
      },
      async handleChangeStepper()
      {
        this.json.Code = '';
        this.json.locgroup = '';
        this.json.Location = '';
        var refno = this.$route.query.refno;

        var payload = {
          RefNo: refno,
          language: this.language
        }

        var data = await this.getFilterCnmain(payload);
        var filtered_transmain = data.response;
        // var numericPart = filtered_transmain.Code.substring(2);
        this.json.locgroup = filtered_transmain.locgroup;
        this.json.Code = filtered_transmain.Code;
        this.json.Location = filtered_transmain.Location;
        // this.json.Code = numericPart;
      },
      closeSearchItem()
      {
        // this.jsonChild = {};
        this.search.showTable = false;
        this.search_item = false;
      },
      handleChangeOriInvNo(newVal)
      {
        var options = this.ori_inv_no_options;
        var filter_inv = options.filter((entry)=>{
          return entry.label == newVal;
        })

        if(filter_inv.length > 0)
        {
          this.jsonChild.ori_inv_date = filter_inv[0].date;
          this.jsonChild.ori_inv_no = newVal;
          this.select_inv = true;
        }
        else
        {
          this.select_inv = false;
        }
      },
      changeInvoiceMethod()
      {
        this.select_inv = !this.select_inv;
        this.jsonChild.ori_inv_date = "";
        this.jsonChild.ori_inv_no = "";
        this.$refs.save_edit_pochild_form.resetValidation();

        if(!this.select_inv)
        {
          var currentdate = new Date();

          var current_date_format = currentdate.getFullYear()+"-"+('0' + (currentdate.getMonth()+1)).slice(-2)+"-"+('0' + currentdate.getDate()).slice(-2);

          this.jsonChild.ori_inv_date = current_date_format;
        }
      },
      handleChangePriceType(newVal)
      {
        if(newVal == 'FOC')
        {
          this.jsonChild.UnitPrice = '0.00'
          this.jsonChild.TotalPrice = '0.00'
        }
      },
      handleChangeQtyfoc(newVal)
      {
        this.jsonChild.Qty_foc = this.formatAmount(newVal,'qty');
      },
      async confirmPost(){
        this.post_transmain = true;
      },
      async handlePostTransmain()
      {
        // var payload = {
        //   RefNo: this.$route.query.refno,
        //   language: this.language
        // }
        this.deleteLoading = true;
        var data = {};
        var set_query = {
          "ERefNo":this.json.RefNo,
          "EUser":this.user_name,
          "getuser":this.user_name
          };
        var json_runscript_multi = {};
        var payload_runscript_multi ={}
        if(this.json.BillStatus==0)
        {
          // await this.$store.dispatch('purchase/trigger_posting_cn', payload).then(() => {
          //   data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_posting_cn']));
          // });
            json_runscript_multi = {
              params:[
                  {
                    "lookupdb_name": this.session_outlet_guid,
                    "trans_group": 'CN',
                    "trans_type": '#Before post',
                    "set_query":set_query
                  },
                  {
                    "lookupdb_name": this.session_outlet_guid,
                    "trans_group": 'CN',
                    "trans_type": '@After post',
                    "set_query":set_query
                  }
              ]
            };

            payload_runscript_multi ={
              "pass_json": json_runscript_multi
            }
          var  dispatch_response = await this.runscript_multi(payload_runscript_multi);
          console.log('dispatch_response',dispatch_response);
        }
        else if(this.json.BillStatus==1)
        {
            json_runscript_multi = {
                params:[
                  {
                    "lookupdb_name": this.session_outlet_guid,
                    "trans_group": 'CN',
                    "trans_type": '#Before unpost',
                    "set_query":set_query
                  },
                  {
                    "lookupdb_name": this.session_outlet_guid,
                    "trans_group": 'CN',
                    "trans_type": '@After unpost',
                    "set_query":set_query
                  }
              ]
            };

            var payload_runscript_multi ={
              "pass_json": json_runscript_multi
            }

            var  dispatch_response = await this.runscript_multi(payload_runscript_multi)
            console.log('dispatch_response',dispatch_response);

          // await this.$store.dispatch('purchase/trigger_unposting_cn', payload).then(() => {
          //   data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_unposting_cn']));
          // });
        }
        console.log('dispatch_response',dispatch_response);
        if(dispatch_response.status){
        if(this.json.BillStatus==0)
          {
            this.showNotify("positive", "Posted Successfully.");
          }
          else
          {
            this.showNotify("positive", "Unposted Successfully.");
          }
            this.post_transmain = false;
            this.deleteLoading = false;
            window.location.reload();

       }else{
        this.showNotify("negative", dispatch_response.message );
        this.post_transmain = false;
        this.deleteLoading = false;
       }


        // var status = data.status;
        // if(status == "success")
        //   {
        //     if(this.json.BillStatus==0)
        //     {
        //       this.showNotify("positive", "Posted Successfully.");
        //     }
        //     else
        //     {
        //       this.showNotify("positive", "Unposted Successfully.");
        //     }

        //    // window.location.reload();
        //     this.post_transmain = false;
        //     this.deleteLoading = false;
        //   }
        //   else
        //   {
        //     var show_error = "";

        //     var error_response = data.response;

        //     Object.keys(error_response).forEach((loop_index)=>{
        //       if(loop_index !== 'status_code')
        //       {
        //         var temp_error = {};
        //         var error_message = "";
        //         Object.keys(error_response[loop_index]).forEach((header,cindex)=>{
        //             error_message = error_response[loop_index];
        //         });
        //         temp_error = loop_index + " - " + error_message + '<br>';
        //         show_error += temp_error;
        //       }
        //     });//close foreach error message

        //     this.showNotify('negative', show_error);
        //     this.post_transmain = false;
        //     this.deleteLoading = false;
        //   }

      },
      handleChangeDiscAmt()
      {
        this.jsonChild.DiscAmt = this.formatAmount(this.jsonChild.DiscAmt,'$');
        this.calculation();
      },
      handleChangeTotalPrice()
      {
        this.jsonChild.TotalPrice = this.formatAmount(this.jsonChild.TotalPrice,'$');
        this.calculation();
      },
      handleChangeDisc2Value()
      {
        this.jsonChild.Disc2Value = this.formatAmount(this.jsonChild.Disc2Value,'$');
        this.calculation();
      },
      handleChangeDisc1value()
      {
        this.jsonChild.Disc1value = this.formatAmount(this.jsonChild.Disc1value,'$');
        this.calculation();
      },
      handleChangeDiscType()
      {
        this.calculation();
      },
      handleChangeUnitPrice()
      {
        this.jsonChild.UnitPrice = this.formatAmount(this.jsonChild.UnitPrice,'$');
        this.calculation();
      },
      handleChangeQty(newVal)
      {
        this.jsonChild.SetQty = this.formatAmount(newVal,'qty');
        this.calculation();
      },
      calculation(){
        this.$nextTick(()=>{
          var SetQty = this.unformatAmount(this.jsonChild.SetQty);
          // console.log(this.jsonChild.SetQty);
          // var weight = this.unformatAmount(this.jsonChild.weight);
          // console.log(this.jsonChild.weight);
          var TotalPrice = this.unformatAmount(this.jsonChild.TotalPrice);
          // console.log(this.jsonChild.TotalPrice);
          // var Disc1value = this.unformatAmount(this.jsonChild.Disc1Value);
          // console.log(this.jsonChild.Disc1value);
          // var Disc2Value = this.unformatAmount(this.jsonChild.Disc2Value);
          // console.log(this.jsonChild.Disc2Value);
          // var round_adj = this.unformatAmount(this.jsonChild.round_adj);
          // console.log(this.jsonChild.round_adj);
          // var DiscAmt = this.unformatAmount(this.jsonChild.DiscAmt);
          // console.log(this.jsonChild.DiscAmt);
          // var sst_rate = this.unformatAmount(this.jsonChild.sst_rate);
          // console.log(this.jsonChild.sst_rate);
          var UnitPrice = this.unformatAmount(this.jsonChild.UnitPrice);

          // if(this.jsonChild.ws_cost == 'NaN' || this.jsonChild.ws_cost == 'Infinity')
          // {
          //   this.jsonChild.ws_cost = '0.00'
          // }
          // var ws_cost = this.unformatAmount(this.jsonChild.ws_cost);

          if(this.jsonChild.EntryType == 'total')
          {
              // calculate netprice, price & round_adj
              // var parameter = this.jsonChild.by_weight == 1 ? weight : SetQty;
              var parameter = SetQty;

              var UnitPrice = (parseFloat(TotalPrice/ parameter)).toFixed(2);
              var NetUnitPrice = (parseFloat(TotalPrice/ parameter)).toFixed(4);
              var calculate_total_price = (parseFloat(NetUnitPrice* parameter)).toFixed(2);
              this.jsonChild.UnitPrice = this.formatAmount(UnitPrice,'$');
              this.jsonChild.NetUnitPrice = parseFloat(NetUnitPrice).toFixed(4);
              // var round_adj = (parseFloat(TotalPrice - calculate_total_price)).toFixed(2);
              // this.jsonChild.round_adj = this.formatAmount(round_adj);

              if(this.jsonChild.UnitPrice == 'NaN' || this.jsonChild.UnitPrice == 'Infinity')
              {
                this.jsonChild.UnitPrice = '0.00'
              }

              if(this.jsonChild.NetUnitPrice == 'NaN' || this.jsonChild.NetUnitPrice == 'Infinity')
              {
                this.jsonChild.NetUnitPrice = '0.0000'
              }

              // if(this.jsonChild.round_adj == 'NaN' || this.jsonChild.round_adj == 'Infinity')
              // {
              //   this.jsonChild.round_adj = '0.00'
              // }
          } // total price entry
          else
          {
              // var result = (SetQty * after2Disc)+(round_adj-DiscAmt);
              // var result = (SetQty * after2Disc)+(-DiscAmt);
              var result = SetQty * UnitPrice;
              this.jsonChild.TotalPrice = this.formatAmount(result,'$');
              TotalPrice = result;
          } //if unit price entry

          // // calculate sst & totalamt
          // var sst = this.unformatAmount(this.jsonChild.TotalPrice)*sst_rate/100;
          // var total_amt = this.jsonChild.EntryType == 'total' ? (parseFloat(parseFloat(this.unformatAmount(this.jsonChild.total_price))+parseFloat(sst)+parseFloat(ws_cost))).toFixed(2) : sst+total_price+ws_cost;
          // this.jsonChild.sst = this.formatAmount(sst,'$');
          // this.jsonChild.total_amt = this.formatAmount(total_amt,'$');
        });
      },
      close()
      {
        this.jsonChild = {};
        this.barcode_options = [];
        this.ori_inv_no_options =[]
        this.search.showTable = false;
        this.modify_child = false;
      },
      async handleDeleteLine(){
        this.deleteLoading = true;
        this.showAddLoading2 = true;

        if(this.json.BillStatus == 1)
        {
            this.showNotify("negative","This Doc already posted.");
            this.deleteLoading = false;
            this.showAddLoading2 = false;
            return;
        }
        else
        {
          var payload = {
            RefNo: this.active_delete_json.RefNo,
            Line: this.active_delete_json.Line,
            language: this.language,
            user: this.user_name
          }

          var data = {};

          if(this.page_function == 'EditCreditNote')
          {
            await this.$store.dispatch('purchase/trigger_delete_cnchild', payload).then(() => {
              data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_cnchild_status']));
            });
          }

          if(data.status == "success")
          {
            this.$nextTick(async ()=>{
              this.table_function(this.ori_params);
              this.showNotify("positive","Delete successfully");
              this.modify_child = false;
              this.delete_child = false;
              this.deleteLoading = false;
              this.showAddLoading2 = false;
              this.updateAmount();
            });
          }
          else
          {
            this.showNotify("negative","Please try again.");
            this.deleteLoading = false;
            this.showAddLoading2 = false;
          }
        }
      },
      async handleRowClick(payload){
        var requests = this.item_table_data.data.results.map(async(row, index)=>{
          row.selected = false;
        });

        await Promise.all(requests);

        payload.selected = true;

        this.selected_row = payload;
      },
      async handleChild(newVal){
        this.showAddLoading = true;

        if(this.json.BillStatus == 1)
        {
            this.showNotify("negative","This Doc already posted.");
            this.showAddLoading = false;
            return;
        }
        else
        {
            // var validated = await this.validate_form('save_edit_pochild_form');

            var form_name = 'save_edit_pochild_form';
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

            if(this.jsonChild.SetQty <= 0 ){
              this.showAddLoading = false;
              this.showNotify("negative", "Qty cannot less than or equal to 0.");
              return;
            }

            if(this.jsonChild.PriceType =='Norm' && this.jsonChild.UnitPrice <= 0 )
            {
              this.showAddLoading = false;
              this.showNotify("negative", "Price cannot less than or equal to 0.");
              return;
            }

            if(this.jsonChild.Disc1value < 0 ){
              this.showAddLoading = false;
              this.showNotify("negative", "Disc1value cannot less than 0.");
              return;
            }

            if(this.jsonChild.Disc2Value < 0 ){
              this.showAddLoading = false;
              this.showNotify("negative", "Disc2Value cannot less than 0.");
              return;
            }

            if(this.jsonChild.DiscAmt < 0 ){
              this.showAddLoading = false;
              this.showNotify("negative", "Disc Amt cannot less than 0.");
              return;
            }

            if(this.jsonChild.PriceType =='Norm' && this.jsonChild.TotalPrice <= 0 )
            {
              this.showAddLoading = false;
              this.showNotify("negative", "Total Price cannot less than or equal to 0.");
              return;
            }

            await this.savePOChild(newVal);
        }
      },
      async savePOChild(newVal){
        var RefNo = this.json.RefNo;
        var EntryType = this.jsonChild.EntryType;
        var PriceType = this.jsonChild.PriceType;
        var Itemcode = this.jsonChild.Itemcode;
        var Qty = this.jsonChild.SetQty;
        var UnitPrice = this.jsonChild.UnitPrice;
        var TotalPrice = this.jsonChild.TotalPrice;
        var reason = this.jsonChild.reason;
        // var item_remark = this.jsonChild.item_remark;
        var itemremark = this.jsonChild.itemremark;
        var ori_inv_no = this.jsonChild.ori_inv_no;
        var ori_inv_date = this.jsonChild.ori_inv_date;
        reason = reason === undefined ? '' : reason === null ? '' : reason;
        ori_inv_date = ori_inv_date === '' ?  null :ori_inv_date
        if(!this.edit_child)
        {
          var payload = {
            "RefNo": RefNo,
            "EntryType": EntryType,
            "PriceType": PriceType,
            "Itemcode": Itemcode,
            "Qty": Qty,
            "UnitPrice": UnitPrice,
            "TotalPrice": TotalPrice,
            "reason": reason,
            // "item_remark": item_remark,
            "itemremark": itemremark,
            "ori_inv_no": ori_inv_no,
            "ori_inv_date": ori_inv_date,
            "user": this.user_name,
            "language": this.language
          }

          var data = {};
           console.log('payload',payload);
          await this.$store.dispatch('purchase/trigger_create_cnchild', payload).then(() => {
            data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_cnchild_status']));
          });

          var status = data.status
          console.log('data',data);
          if(status == "success")
          {
            this.showAddLoading = false;
            this.showNotify("positive", "Created Successfully.");

            this.$emit('subtotal1-updated', response.TotalPrice || 0); //update the total amount

            if(newVal == 'save')
            {
              this.jsonChild = {};
              this.barcode_options = [];
               this.ori_inv_no_options =[];
              this.search.showTable = false;
              this.modify_child = false;
              this.table_function(this.ori_params);
              this.updatedAmount()
            }
            else if(newVal == 'save&add')
            {
              this.jsonChild = {};
              this.barcode_options = [];
              this.ori_inv_no_options =[]
              this.search.showTable = false;
              this.modify_child = false;
              this.table_function(this.ori_params);
              this.addButtonCreatePOChild('item');
              this.updatedAmount()
            }

            console.log('data',data.response);
            var set_query = {
              "ERefNo":data.response.RefNo,
              "ELine":data.response.Line,
              "EType":'CN',
              "Itemcode":data.response.Itemcode,
              "Itemlink":data.response.ItemLink,
              "EUser":this.user_name,
              "getuser":this.user_name
            };
            // console.log('jsonChild',this.jsonChild);
            // console.log('set_query',set_query);
            var json_runtime_runscript_multi = {
              params:[
                {
                  "lookupdb_name": this.session_outlet_guid,
                  "trans_group": 'CN',
                  "trans_type": 'cnnotechild',
                  "set_query":set_query
                }
             ]
           };

            var payload_runtime_runscript_multi ={
                  "pass_json": json_runtime_runscript_multi
            }
          var dispatch_response = await this.runscript_multi(payload_runtime_runscript_multi,'1')

          console.log('dispatch_response',dispatch_response);

          if(dispatch_response.status){
                console.log('Runscript : All scripts executed successfully');
             //   this.showNotify('positive','All scripts executed successfully')
           }else{
              console.log('Runscript :', dispatch_response.message);
              this.showNotify('negative',dispatch_response.message)
            }


          }
          else
          {
            var show_error = "";

            var error_response = data.response;

            Object.keys(error_response).forEach((loop_index)=>{
              if(loop_index !== 'status_code')
              {
                var temp_error = {};
                var error_message = "";
                Object.keys(error_response[loop_index]).forEach((header,cindex)=>{
                    error_message = error_response[loop_index];
                });
                temp_error = loop_index + " - " + error_message + '<br>';
                show_error += temp_error;
              }
            });//close foreach error message

            this.showNotify('negative', show_error);

            this.showAddLoading = false;
          }
        }
        else
        {
          var Line = this.jsonChild.Line;

          var payload = {
            "RefNo": RefNo,
            "Line": Line,
            "EntryType": EntryType,
            "PriceType": PriceType,
            "Itemcode": Itemcode,
            "Qty": Qty,
            "UnitPrice": UnitPrice,
            "TotalPrice": TotalPrice,
            "reason": reason,
            // "item_remark": item_remark,
            "itemremark": itemremark,
            "ori_inv_no": ori_inv_no,
            "ori_inv_date": ori_inv_date,
            "user": this.user_name,
            "language": this.language
          }

          var data = {};

          if(this.page_function == 'EditCreditNote')
          {
            // payload.Barcode = this.jsonChild.Barcode;
            console.log('PAYLOAD',payload);
            await this.$store.dispatch('purchase/trigger_update_cnchild', payload).then(() => {
              data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_cnchild_status']));
            });
          }

          var status = data.status;
          var response = data.response;

          if(status == "success")
          {
            this.jsonChild = response;

            var TotalPrice = this.formatAmount(response.TotalPrice,'$')
            var UnitPrice = this.formatAmount(response.UnitPrice,'$')
            var Qty = this.formatAmount(response.Qty,'qty');

            this.jsonChild.TotalPrice = TotalPrice;
            this.jsonChild.UnitPrice = UnitPrice;
            this.jsonChild.SetQty = Qty;

            if(this.edit_child)
            {
              this.showAddLoading = false;
              this.modify_child =false;
              this.showNotify("positive", "Updated Successfully.");
              this.table_function(this.ori_params);
              this.updatedAmount()
            }

            var set_query = {
              "ERefNo":response.RefNo,
              "ELine":response.Line,
              "EType":response.Type,
              "Itemcode":response.Itemcode,
              "Itemlink":response.ItemLink,
              "EUser":this.user_name,
              "getuser":this.user_name
            };
            console.log('set_query',set_query);
            var json_runtime_runscript_multi = {
              params:[
                {
                  "lookupdb_name": this.session_outlet_guid,
                  "trans_group": 'CN',
                  "trans_type": 'cnnotechild',
                  "set_query":set_query
                }
             ]
           };

           var payload_runtime_runscript_multi ={
                  "pass_json": json_runtime_runscript_multi
            }
           var dispatch_response = await this.runscript_multi(payload_runtime_runscript_multi)


          if(dispatch_response.status){
                console.log('Runscript : All scripts executed successfully');
             //   this.showNotify('positive','All scripts executed successfully')
           }else{
              console.log('Runscript :', dispatch_response.message);
              this.showNotify('negative',dispatch_response.message)
            }

          }
          else
          {
            var error_response = data.response;
            var show_error = "";

            Object.keys(error_response).forEach((loop_index)=>{
              if(loop_index !== 'status_code')
              {
                var temp_error = {};
                var error_message = "";
                Object.keys(error_response[loop_index]).forEach((header,cindex)=>{
                    error_message = error_response[loop_index];
                });
                temp_error = loop_index + " - " + error_message;
                show_error += temp_error  +"<br />";
              }
            });//close foreach error message

            this.showNotify('negative', show_error);
            this.showAddLoading = false;
          }
        }
      },
     async updatedAmount(){
          var payload = {
          RefNo: this.$route.query.refno,
          language: this.language
        }

        var data = await this.getFilterCnmain(payload);
        var filtered_transmain = data.response;


        filtered_transmain.gst_tax_sum = this.formatAmount(filtered_transmain.gst_tax_sum, '$');
        filtered_transmain.SubTotal1 = this.formatAmount(filtered_transmain.SubTotal1, '$');
        this.json.SubTotal1 = filtered_transmain.SubTotal1
        this.json.gst_tax_sum = filtered_transmain.gst_tax_sum
      },
      handleChangeEntryType(payload){
        if(payload == "Unit")
        {
          this.unit = true;
        }
        else if(payload == "total")
        {
          this.unit = false;
        }

        this.jsonChild.UnitPrice = "0.00";

        this.$nextTick(()=>{
          this.$refs.save_edit_pochild_form.resetValidation()
        });
      },
      showSearchDialog()
      {
        if(this.json.BillStatus == 1)
        {
            this.showNotify("negative","This Doc already posted.");
            return;
        }

        this.search_item = true;
        this.search_supplier = false;
        this.selected_row = {};
        this.search.value = '';
        this.search.type = 'Barcode';

      },
      async addButtonCreatePOChild(newVal){
        if(this.json.BillStatus == 1)
        {
            this.showNotify("negative","This Doc already posted.");
            return;
        }

        this.selected_row = {};
        this.search.value = '';
        this.modify_child = newVal=='item';
        this.search_item = newVal=='supplier';
        this.search_supplier = newVal=='supplier';
        this.edit_child = false;
        this.hv_item = false;
        this.select_inv = true;
        if(this.modify_child)
        {
          this.jsonChild = {
            step: 1,
            type: 'Itemcode',
            EntryType: "Unit",
            PriceType: "Norm",
            group: 0,
            group_cost: 0,
            SetQty: "0",
            Qty_foc: "0",
            BulkQty: "0",
            UnitPrice: "0.00",
            TotalPrice: "0.00",
            OrderLotSize: 1,
          }
          this.handleChangeEntryType('Unit')
        }

        this.search.options = newVal!='supplier' ?
        [
          {
            label: "Itemcode",
            value: "Itemcode"
          },
          {
            label: "Barcode",
            value: "Barcode"
          },
          {
            label: "Description",
            value: "Description"
          },
          {
            label: "ArticleNo",
            value: "ArticleNo"
          }
        ] :
        [
          {
            label: "Code",
            value: "Code"
          },
          {
            label: "Name",
            value: "Name"
          },
        ];

        this.search.type = newVal=='item' ? 'Barcode' : 'Code';
      },
      async handleModifyItemcode(){
        this.hv_item = true;

        if(Object.keys(this.selected_row).length == 0)
        {
          this.showNotify('negative', 'No item selected');
          return;
        }

        this.search_item = false;

        if(!this.search_supplier)
        {
          this.modify_child = true;
          this.edit_child = false;
          this.jsonChild = {
            step: 1,
            type: 'Itemcode',
            EntryType: "Unit",
            PriceType: "Norm",
            group: 0,
            group_cost: 0,
            SetQty: "0",
            BulkQty: "0",
            TotalPrice: "0.00",
            UnitPrice: "0.00",
            OrderLotSize: 1,
            itemremark: "",
          }

          this.barcode_options = [];
          this.handleChangeEntryType('Unit')

          this.showAddLoading = true;

          var itemcode = this.selected_row.Itemcode;
          var supplier_code = this.json.Code;
          var po_date = this.json.DocDate;
          var outlet = this.json.locgroup;

          var payload = {
            itemcode: itemcode,
            supplier_code: supplier_code,
            po_date: po_date,
            outlet: outlet,
            user: this.user_name,
            language: this.language
          }

          await this.$store.dispatch('purchase/trigger_get_item_by_itemcode_for_po', payload).then(async () => {
            var data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_item_by_itemcode_for_po']));
            var response = data.response;

            response.Disc1value = this.formatAmount(response.Disc1value,'$');
            response.Disc2Value = this.formatAmount(response.Disc2Value,'$');
            response.UnitPrice = this.formatAmount(response.UnitPrice,'$');
            response.NetUnitPrice = parseFloat(response.NetUnitPrice).toFixed(4);
            response.TotalPrice = this.formatAmount('0.00','$');
            response.DiscAmt = this.formatAmount('0.00','$');
            response.EntryType ="Unit";
            response.PriceType = "Norm";
            response.Qty_foc = "0";
            response.SetQty = "0";



            this.jsonChild = response;
            this.jsonChild.SetQty = this.jsonChild.SetQty==0 ? '0' : this.jsonChild.SetQty;
            this.jsonChild.itemremark = "";
            this.jsonChild.ori_inv_no = "";
            this.jsonChild.ori_inv_date = "";

            if(response.barcode.length > 0)
            {
              var ary = [];

              for(var i in response.barcode)
              {
                var bc = response.barcode[i];

                var obj = {
                  label: bc,
                  value: bc
                }

                ary.push(obj);
              }

              this.barcode_options = ary;
              this.jsonChild.Barcode = this.barcode_options[0].value;

            }
            else
            {
              this.jsonChild.Barcode = '';
            }

            var ipayload = {
              "itemcode": this.jsonChild.Itemcode,
              "Code": this.json.Code,
              "language": this.language
            };

            await this.$store.dispatch('purchase/trigger_get_invoice', ipayload).then(() => {
              var data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_invoice']));

              var results = data.response;
              var ary = [];

              if(results.length > 0)
              {
                for(var i in results)
                {
                  var temp = results[i];
                  var obj = {
                    label: temp.InvNo,
                    value: temp.InvNo,
                    date: temp.DocDate,
                  }

                  ary.push(obj)
                }
              }
              else
              {
                ary = [];
              }

              const uniqueObjects = new Set();
            const filteredArray = ary.filter((obj) => {
              const key = obj.value; // Change the key based on the property you want to check for uniqueness
              if (!uniqueObjects.has(key)) {
                uniqueObjects.add(key);
                return true;
              }
              return false;
            });

            this.ori_inv_no_options = filteredArray
            //  this.ori_inv_no_options = ary;

              this.$nextTick(()=>{
                this.$refs.save_edit_pochild_form.resetValidation()
              });
            });
          });

          this.select_inv = true;
          this.search.showTable = false;
          this.jsonChild.step = 2;
          this.showAddLoading = false;
        }
        else
        {
          this.showAddLoading = true;

          // var itemcode = this.selected_row;
          this.json.Code = this.selected_row.Code;
          this.json.Name = this.selected_row.Name;
          this.search.showTable = false;
          this.jsonChild.step = 1;
          this.showAddLoading = false;
        }
      },
      // async handleModifyItemcode(){
      //   this.hv_item = true;

      //   if(Object.keys(this.selected_row).length == 0)
      //   {
      //     this.showNotify('negative', 'No item selected');
      //     return;
      //   }

      //   this.search_item = false;

      //   if(!this.search_supplier)
      //   {
      //     this.modify_child = true;
      //     this.edit_child = false;
      //     this.jsonChild = {
      //       step: 1,
      //       type: 'Itemcode',
      //       EntryType: "Unit",
      //       PriceType: "Norm",
      //       group: 0,
      //       group_cost: 0,
      //       SetQty: "0",
      //       BulkQty: "0",
      //       TotalPrice: "0.00",
      //       UnitPrice: "0.00",
      //       OrderLotSize: 1,
      //       itemremark: "",
      //     }

      //     this.barcode_options = [];
      //     this.handleChangeEntryType('Unit')

      //     this.showAddLoading = true;

      //     var itemcode = this.selected_row.Itemcode;
      //     console.log('this.selected_row',this.selected_row);
      //     var supplier_code = this.json.Code;
      //     var po_date = this.json.DocDate;
      //     // var outlet = this.json.locgroup;

      //     var payload = {
      //       itemcode: itemcode,
      //       // supplier_code: supplier_code,
      //       // po_date: po_date,
      //       // outlet: outlet,
      //       user: this.user_name,
      //       language: this.language
      //     }

      //     await this.$store.dispatch('sales/trigger_post_read_barcode_by_itemcode', payload).then(async () => {
      //       var data = JSON.parse(JSON.stringify(this.$store.getters['sales/get_post_read_barcode_by_itemcode']));
      //       console.log('data',data);
      //       var response = data.response;
      //        if(response.length > 0)
      //       {
      //         var ary = [];

      //         for(var i in response)
      //         {
      //           var bc = response[i].Barcode;

      //           var obj = {
      //             label: bc,
      //             value: bc
      //           }

      //           ary.push(obj);
      //         }

      //         this.barcode_options = ary;
      //         this.selected_row.Barcode = this.barcode_options[0].value;
      //       }else{
      //         this.selected_row.Barcode =''
      //       }

      //     });

      //     // await this.$store.dispatch('sales/trigger_post_read_item_all', payload).then(async () => {
      //     //   var data = JSON.parse(JSON.stringify(this.$store.getters['sales/get_post_read_item_all']));
      //     //   console.log('data',data);
      //     //   var response = data.detail;

      //     //   response.Disc1value = this.formatAmount(response.Disc1value,'$');
      //     //   response.Disc2Value = this.formatAmount(response.Disc2Value,'$');
      //     //   response.UnitPrice = this.formatAmount(response.UnitPrice,'$');
      //     //   response.NetUnitPrice = parseFloat(response.NetUnitPrice).toFixed(4);
      //     //   response.TotalPrice = this.formatAmount('0.00','$');
      //     //   response.DiscAmt = this.formatAmount('0.00','$');
      //     //   response.EntryType = "Unit";
      //     //   response.PriceType = "Norm";
      //     //   response.Qty_foc = "0";
      //     //   response.SetQty = "0";

      //     //   this.jsonChild = response;
      //     //   this.jsonChild.SetQty = this.jsonChild.SetQty==0 ? '0' : this.jsonChild.SetQty;
      //     //   this.jsonChild.itemremark = "";
      //     //   this.jsonChild.ori_inv_no = "";
      //     //   this.jsonChild.ori_inv_date = "";
      //     //   console.log('response',response);
      //       // if(response.detail.length > 0)
      //       // {
      //       //   var ary = [];

      //       //   for(var i in response.detail)
      //       //   {
      //       //     var bc = response.detail[i];

      //       //     var obj = {
      //       //       label: bc,
      //       //       value: bc
      //       //     }

      //       //     ary.push(obj);
      //       //   }

      //       //   this.barcode_options = ary;
      //       //   this.jsonChild.Barcode = this.barcode_options[0].value;
      //       // }
      //       // else
      //       // {
      //       //   this.jsonChild.Barcode = '';
      //       // }


      //       this.selected_row.Disc1value = this.formatAmount(this.selected_row.Disc1value,'$');
      //       this.selected_row.Disc2Value = this.formatAmount(this.selected_row.Disc2Value,'$');
      //       this.selected_row.UnitPrice = this.formatAmount(this.selected_row.SellingPrice,'$');
      //       this.selected_row.NetUnitPrice = parseFloat(this.selected_row.NetUnitPrice).toFixed(4);
      //       this.selected_row.TotalPrice = this.formatAmount('0.00','$');
      //       this.selected_row.DiscAmt = this.formatAmount('0.00','$');
      //       this.selected_row.EntryType = "Unit";
      //       this.selected_row.PriceType = "Norm";
      //       this.selected_row.Qty_foc = "0";
      //       this.selected_row.SetQty = "0";

      //       this.jsonChild = this.selected_row;
      //       this.jsonChild.SetQty = this.jsonChild.SetQty==0 ? '0' : this.jsonChild.SetQty;
      //       this.jsonChild.itemremark = "";
      //       this.jsonChild.ori_inv_no = "";
      //       this.jsonChild.ori_inv_date = "";
      //       console.log('jsonChild',this.jsonChild);
      //       var ipayload = {
      //         "itemcode": this.jsonChild.Itemcode,
      //         "Code": this.json.Code,
      //         "language": this.language
      //       };

      //       await this.$store.dispatch('purchase/trigger_get_invoice', ipayload).then(() => {
      //         var data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_invoice']));

      //         var results = data.response;
      //         var ary = [];

      //         if(results.length > 0)
      //         {
      //           for(var i in results)
      //           {
      //             var temp = results[i];
      //             var obj = {
      //               label: temp.InvNo,
      //               value: temp.InvNo,
      //               date: temp.DocDate,
      //             }

      //             ary.push(obj)
      //           }
      //         }
      //         else
      //         {
      //           ary = [];
      //         }


      //         const uniqueObjects = new Set();
      //         const filteredArray = ary.filter((obj) => {
      //           const key = obj.value; // Change the key based on the property you want to check for uniqueness
      //           if (!uniqueObjects.has(key)) {
      //             uniqueObjects.add(key);
      //             return true;
      //           }
      //           return false;
      //         });

      //         this.ori_inv_no_options = filteredArray;

      //         this.$nextTick(()=>{
      //           this.$refs.save_edit_pochild_form.resetValidation()
      //         });
      //       });
      //    // });

      //     this.select_inv = true;
      //     this.search.showTable = false;
      //     this.jsonChild.step = 2;
      //     this.showAddLoading = false;
      //   }
      //   else
      //   {
      //     this.showAddLoading = true;

      //     // var itemcode = this.selected_row;
      //     this.json.Code = this.selected_row.Code;
      //     this.json.Name = this.selected_row.Name;
      //     this.search.showTable = false;
      //     this.jsonChild.step = 1;
      //     this.showAddLoading = false;
      //   }
      // },
      showSearchTable(){
        if(this.search.value != null && this.search.value != '' && this.search.value != undefined)
        {
          this.search.showTable = true;
          this.item_table_function(this.item_ori_params);
        }
        else
        {

          this.showNotify('negative', 'Please enter search value.')
        }
      },
      handleDelete(payload){
        this.active_delete_json = payload;
        this.delete_child = true;
      },

      async handleAction(json){
        console.log('edit child');
        this.hv_item = true;

        this.modify_child = true;
        this.edit_child = true;
        this.showAddLoading = true;

        var cpayload = {
          RefNo: json.RefNo,
          language: this.language
        }

        var cdata = await this.getCnchild(cpayload);

        var line = json.Line;

        var filterPochild = cdata.response.filter((entry)=>{
          return entry.Line == line;
        })

        var barcode_ary = [];
         console.log('filterPochild',filterPochild);
        var payload = {
            itemcode: filterPochild[0].Itemcode,
            language: this.language
        }

        var data = await this.getBarcodeoptions(payload);
        console.log('data',data);
        for(var i in data.response)
        {
          var res = data.response[i];
          var obj = {
            label: res.Barcode,
            value: res.Barcode
          }

          barcode_ary.push(obj);
        }

        this.barcode_options = barcode_ary;
        console.log('barcode_options',this.barcode_options);

        var ipayload = {
          "itemcode": filterPochild[0].Itemcode,
          "Code": this.json.Code,
          "language": this.language
        };


          var data2 = await this.getOriInvoiceoptions(ipayload)

          var results = data2.response;
          var ary = [];

          if(results.length > 0)
          {
            for(var i in results)
            {
              var temp = results[i];
              var obj = {
                label: temp.InvNo,
                value: temp.InvNo,
                date: temp.DocDate,
              }

              ary.push(obj)
            }
          }
          else
          {
            ary = [];
          }

            const uniqueObjects = new Set();
            const filteredArray = ary.filter((obj) => {
              const key = obj.value; // Change the key based on the property you want to check for uniqueness
              if (!uniqueObjects.has(key)) {
                uniqueObjects.add(key);
                return true;
              }
              return false;
            });

           // console.log('ary', filteredArray);
          this.ori_inv_no_options = filteredArray;

        setTimeout(()=>{
          this.jsonChild = filterPochild[0];
          this.jsonChild.UnitPrice = this.formatAmount(this.jsonChild.UnitPrice,'$');
          this.jsonChild.DiscAmt = this.formatAmount(this.jsonChild.DiscAmt,'$');
          this.jsonChild.Disc1value = this.formatAmount(this.jsonChild.Disc1Value,'$');
          this.jsonChild.Disc2Value = this.formatAmount(this.jsonChild.Disc2Value,'$');
          this.jsonChild.NetUnitPrice = Number(this.jsonChild.NetUnitPrice).toFixed(4);
          this.jsonChild.TotalPrice = this.formatAmount(this.jsonChild.TotalPrice,'$');
          this.jsonChild.PackSize = this.formatAmount(this.jsonChild.PackSize,'$');
          this.jsonChild.BulkQty = this.formatAmount(this.jsonChild.BulkQty,'$');
          this.jsonChild.rebate_value = this.formatAmount(this.jsonChild.rebate_value,'$');
          this.jsonChild.price_future = this.formatAmount(this.jsonChild.price_future,'$');
          this.jsonChild.SetQty = this.formatAmount(this.jsonChild.Qty,'qty');
          this.unit = this.jsonChild.EntryType=='Unit';
          this.jsonChild.step = 2;
          this.handleChangeOriInvNo(this.jsonChild.ori_inv_no)
          if(this.jsonChild.ori_inv_no == ''){
            this.select_inv = true;
          }
          this.showAddLoading = false;

        },1000)
      },
      handleChangeSCode(payload)
      {

        if(payload)
        {
          var filtered_supcus = this.all_supcus.filter((entry)=>{
            return entry.Code == payload
          })

          this.json.Name = filtered_supcus[0].Name;
        }

      },
      handleChangeLocGroup(payload)
      {
        if(payload)
        {
          var filtered_location = this.all_location.filter((entry)=>{
            return entry.LocGroup == payload
          })

          this.json.Location = filtered_location[0].location;
        }
      },
      handleChangeDeliverDate(payload)
      {
        this.json.DeliverDate = payload;
      },
      handleChangeExpiryDate(payload)
      {
        this.json.expiry_date = payload;
      },
      handleChangeDocDate(payload)
      {
        // console.log('payload',payload);
        this.json.DocDate = payload;
      },
      async getBarcodeoptions(payload)
      {
        return await this.$store.dispatch('sales/trigger_post_read_barcode_by_itemcode', payload).then(() => {
          var data = JSON.parse(JSON.stringify(this.$store.getters['sales/get_post_read_barcode_by_itemcode']));
          return data;
        });
      },
      async getOriInvoiceoptions(payload)
      {
        return  await this.$store.dispatch('purchase/trigger_get_invoice', payload).then(() => {
          var data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_invoice']));
          return data;
        });
      },
      async getSupcus(payload)
      {
        return await this.$store.dispatch('purchase/trigger_read_supcus_all', payload).then(() => {
          var data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_read_supcus_all']));
          return data;
        });
      },
      async getLocation(payload)
      {
        return await this.$store.dispatch('purchase/trigger_read_location_list', payload).then(() => {
          var data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_read_location_list']));
          return data;
        });
      },
      async getFilterCnmain(payload)
      {

        return await this.$store.dispatch('purchase/trigger_read_cn_by_refno', payload).then(() => {
          var data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_read_cn_by_refno']));
          return data;
        });
      },
      async getGrmain(payload)
      {
        payload.params.retailer_guid = this.retailer_guid;

        return await this.$store.dispatch('purchase/trigger_ts_grmain', payload).then(() => {
            var data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_ts_grmain']));
            return data;
        });
      },
      async getSomain(payload)
      {
        payload.params.retailer_guid = this.retailer_guid;

        return await this.$store.dispatch('sales/trigger_get_ts_somain_parent', payload).then(async () => {
            var data = JSON.parse(JSON.stringify(this.$store.getters['sales/get_ts_somain_parent']));
            return data;
        });
      },
      async getSimain(payload)
      {
        payload.params.retailer_guid__retailer_guid = this.retailer_guid;

        return await this.$store.dispatch('sales/trigger_get_ts_simain_parent', payload).then(() => {
          var data = JSON.parse(JSON.stringify(this.$store.getters['sales/get_ts_simain_parent']));
          return data;
        });
      },
      async getCnchild(payload)
      {
        return await this.$store.dispatch('purchase/trigger_read_cnchild', payload).then(() => {
          var data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_cnchild']));
          return data;
        });
      },
      back(){
        this.$router.push("CreditNote");
      },
      handleTableChange: function(newVal)
      {
            var new_params = this.$pluginsTableParams(newVal)

            var payload = {
                params : new_params
            };

            this.ori_params = payload;
            this.table_function(payload);
      },
      handleTableChange1: function(newVal)
      {
            var new_params = this.$pluginsTableParams(newVal)

            var payload = {
                params : new_params
            };

            this.ori_params1 = payload;
            this.table_function1(payload);
      },
      handleItemTableChange: function(newVal)
      {
            var new_params = this.$pluginsTableParams(newVal)

            var payload = {
                params : new_params
            };

            this.item_ori_params = payload;
            console.log('payload',payload);
            this.item_table_function(payload);
      },
      table_function(payload){
        var table_column = [
              {
                  name: 'action',
                  required: true,
                  label: 'Actions',
                  align: 'center',
                  sortable: false,
                  field: 'action',
                  format_child: '',
                  tooltip: '',

              },
              {
                  name: 'Line',
                  required: true,
                  label: 'Line',
                  align: 'center',
                  sortable: true,
                  field: 'Line',
                  format_child: '',
                  tooltip: '',
                  classes:"text-right",
                  sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
              },
              {
                  name: 'EntryType',
                  required: true,
                  label: 'Entry Type',
                  align: 'center',
                  sortable: true,
                  field: 'EntryType',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  classes:"text-left",
              },
              {
                  name: 'PriceType',
                  required: true,
                  label: 'Price Type',
                  align: 'left',
                  sortable: true,
                  field: 'PriceType',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'Itemcode',
                  required: true,
                  label: 'Itemcode',
                  align: 'left',
                  sortable: true,
                  field: 'Itemcode',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'Description',
                  required: true,
                  label: 'Description',
                  align: 'left',
                  sortable: true,
                  field: 'Description',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'PackSize',
                  required: true,
                  label: 'P/Size',
                  align: 'center',
                  sortable: true,
                  field: 'PackSize',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  classes:"text-right",
                  sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
              },
              {
                  name: 'Qty',
                  required: true,
                  label: 'Qty',
                  align: 'center',
                  sortable: true,
                  field: 'Qty',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  classes:"text-right",
                  sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
              },
              {
                  name: 'UM',
                  required: true,
                  label: 'UOM',
                  align: 'center',
                  sortable: true,
                  field: 'UM',
                  format_child: '',
                  tooltip: '',
                  classes:"text-left",
                  // headerStyle: 'text-align: center;'
              },
              {
                  name: 'UnitPrice',
                  required: true,
                  label: 'Price',
                  align: 'center',
                  sortable: true,
                  field: 'UnitPrice',
                  format_child: '',
                  tooltip: '',
                  classes:"text-right",
                  headerStyle: 'text-align: center;',
                  sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
              },
              // {
              //     name: 'sst',
              //     required: true,
              //     label: 'SST',
              //     align: 'left',
              //     sortable: true,
              //     field: 'sst',
              //     format_child: '',
              //     tooltip: '',
              //     headerStyle: 'text-align: center;'
              // },
              // {
              //     name: 'sst_value',
              //     required: true,
              //     label: 'SST Value',
              //     align: 'right',
              //     sortable: true,
              //     field: 'sst_value',
              //     format_child: '',
              //     tooltip: '',
              //     headerStyle: 'text-align: center;',
              //     sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
              // },
              // {
              //     name: 'sst_amt',
              //     required: true,
              //     label: 'SST Amt',
              //     align: 'right',
              //     sortable: true,
              //     field: 'sst_amt',
              //     format_child: '',
              //     tooltip: '',
              //     headerStyle: 'text-align: center;',
              //     sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
              // },
              // {
              //     name: 'sst_variance',
              //     required: true,
              //     label: 'SST Variance',
              //     align: 'right',
              //     sortable: true,
              //     field: 'sst_variance',
              //     format_child: '',
              //     tooltip: '',
              //     headerStyle: 'text-align: center;',
              //     sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
              // },
              {
                  name: 'TotalPrice',
                  required: true,
                  label: 'Total',
                  align: 'center',
                  sortable: true,
                  field: 'TotalPrice',
                  format_child: '',
                  tooltip: '',
                  classes:"text-right",
                  headerStyle: 'text-align: center;',
                  sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
              },
              // {
              //     name: 'TaxCode',
              //     required: true,
              //     label: 'Tax Code',
              //     align: 'left',
              //     sortable: true,
              //     field: 'TaxCode',
              //     format_child: '',
              //     tooltip: '',
              //     headerStyle: 'text-align: center;',
              // },
              // {
              //     name: 'TaxManual',
              //     required: true,
              //     label: 'Tax Manual',
              //     align: 'center',
              //     sortable: true,
              //     field: 'TaxManual',
              //     format_child: '',
              //     tooltip: '',
              //     headerStyle: 'text-align: center;',
              // },
              // {
              //     name: 'Location',
              //     required: true,
              //     label: 'Location',
              //     align: 'left',
              //     sortable: true,
              //     field: 'Location',
              //     format_child: '',
              //     tooltip: '',
              //     headerStyle: 'text-align: center;',
              // },
              {
                  name: 'reason',
                  required: true,
                  label: 'Reason',
                  align: 'left',
                  sortable: true,
                  field: 'reason',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              // {
              //     name: 'AverageCost',
              //     required: true,
              //     label: 'Avg Cost',
              //     align: 'right',
              //     sortable: true,
              //     field: 'AverageCost',
              //     format_child: '',
              //     tooltip: '',
              //     headerStyle: 'text-align: center;',
              //     sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
              // },
              // {
              //     name: 'Lastcost',
              //     required: true,
              //     label: 'Last Cost',
              //     align: 'right',
              //     sortable: true,
              //     field: 'Lastcost',
              //     format_child: '',
              //     tooltip: '',
              //     headerStyle: 'text-align: center;',
              //     sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
              // },
              // {
              //     name: 'stdcost',
              //     required: true,
              //     label: 'Std Cost',
              //     align: 'right',
              //     sortable: true,
              //     field: 'stdcost',
              //     format_child: '',
              //     tooltip: '',
              //     headerStyle: 'text-align: center;',
              //     sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
              // },
              // {
              //     name: 'Sellingprice',
              //     required: true,
              //     label: 'Selling Price',
              //     align: 'right',
              //     sortable: true,
              //     field: 'Sellingprice',
              //     format_child: '',
              //     tooltip: '',
              //     headerStyle: 'text-align: center;',
              //     sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
              // },
              //  {
              //     name: 'Barcode',
              //     required: true,
              //     label: 'Bar Code',
              //     align: 'left',
              //     sortable: true,
              //     field: 'Barcode',
              //     format_child: '',
              //     tooltip: '',
              //     headerStyle: 'text-align: center;',
              // },
              // {
              //     name: 'QOHBefore',
              //     required: true,
              //     label: 'QOH Before',
              //     align: 'right',
              //     sortable: true,
              //     field: 'QOHBefore',
              //     format_child: '',
              //     tooltip: '',
              //     headerStyle: 'text-align: center;',
              //     sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
              // },
              // {
              //     name: 'QOHAfter',
              //     required: true,
              //     label: 'QOH After',
              //     align: 'right',
              //     sortable: true,
              //     field: 'QOHAfter',
              //     format_child: '',
              //     tooltip: '',
              //     headerStyle: 'text-align: center;',
              //     sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
              // },
              // {
              //     name: 'AvgBefore',
              //     required: true,
              //     label: 'Avg Before',
              //     align: 'right',
              //     sortable: true,
              //     field: 'AvgBefore',
              //     format_child: '',
              //     tooltip: '',
              //     headerStyle: 'text-align: center;',
              //     sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
              // },
              // {
              //     name: 'AvgAfter',
              //     required: true,
              //     label: 'Avg After',
              //     align: 'right',
              //     sortable: true,
              //     field: 'AvgAfter',
              //     format_child: '',
              //     tooltip: '',
              //     headerStyle: 'text-align: center;',
              //     sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
              // },
              // {
              //     name: 'WeightedAvgCost',
              //     required: true,
              //     label: 'Weighted Avg Cost',
              //     align: 'right',
              //     sortable: true,
              //     field: 'WeightedAvgCost',
              //     format_child: '',
              //     tooltip: '',
              //     headerStyle: 'text-align: center;',
              //     sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
              // },
              {
                  name: 'ori_inv_no',
                  required: true,
                  label: 'Original Invoice No',
                  align: 'left',
                  sortable: true,
                  field: 'ori_inv_no',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'ori_inv_date',
                  required: true,
                  label: 'Original Invoice Date',
                  align: 'left',
                  sortable: true,
                  field: 'ori_inv_date',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'itemremark',
                  required: true,
                  label: 'Remark',
                  align: 'left',
                  sortable: true,
                  field: 'itemremark',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
          ];
          // var table_column = [
          //     {
          //         name: 'action',
          //         required: true,
          //         label: 'Actions',
          //         align: 'center',
          //         sortable: true,
          //         field: 'action',
          //         format_child: '',
          //         tooltip: ''
          //     },
          //     {
          //         name: 'Line',
          //         required: true,
          //         label: 'Line',
          //         align: 'right',
          //         sortable: true,
          //         field: 'Line',
          //         format_child: '',
          //         tooltip: '',
          //         headerStyle: 'text-align: center;',
          //         sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
          //     },
          //     {
          //         name: 'Itemcode',
          //         required: true,
          //         label: 'Itemcode',
          //         align: 'left',
          //         sortable: true,
          //         field: 'Itemcode',
          //         format_child: '',
          //         tooltip: '',
          //         headerStyle: 'text-align: center;'
          //     },
          //     {
          //         name: 'Description',
          //         required: true,
          //         label: 'Description',
          //         align: 'left',
          //         sortable: true,
          //         field: 'Description',
          //         format_child: '',
          //         tooltip: '',
          //         headerStyle: 'text-align: center;'
          //     },
          //     {
          //         name: 'Packsize',
          //         required: true,
          //         label: 'P/Size',
          //         align: 'right',
          //         sortable: true,
          //         field: 'Packsize',
          //         format_child: '',
          //         tooltip: '',
          //         headerStyle: 'text-align: center;',
          //         sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
          //     },
          //     {
          //         name: 'Qty',
          //         required: true,
          //         label: 'Qty',
          //         align: 'right',
          //         sortable: true,
          //         field: 'Qty',
          //         format_child: '',
          //         tooltip: '',
          //         headerStyle: 'text-align: center;',
          //         sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
          //     },
          //     {
          //         name: 'UM',
          //         required: true,
          //         label: 'UOM',
          //         align: 'left',
          //         sortable: true,
          //         field: 'UM',
          //         format_child: '',
          //         tooltip: '',
          //         headerStyle: 'text-align: center;'
          //     },
          //     {
          //         name: 'UnitPrice',
          //         required: true,
          //         label: 'Price',
          //         align: 'right',
          //         sortable: true,
          //         field: 'UnitPrice',
          //         format_child: '',
          //         tooltip: '',
          //         headerStyle: 'text-align: center;',
          //         sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
          //     },
          //     // {
          //     //     name: 'sst',
          //     //     required: true,
          //     //     label: 'SST',
          //     //     align: 'left',
          //     //     sortable: true,
          //     //     field: 'sst',
          //     //     format_child: '',
          //     //     tooltip: '',
          //     //     headerStyle: 'text-align: center;'
          //     // },
          //     // {
          //     //     name: 'sst_value',
          //     //     required: true,
          //     //     label: 'SST Value',
          //     //     align: 'right',
          //     //     sortable: true,
          //     //     field: 'sst_value',
          //     //     format_child: '',
          //     //     tooltip: '',
          //     //     headerStyle: 'text-align: center;',
          //     //     sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
          //     // },
          //     // {
          //     //     name: 'sst_amt',
          //     //     required: true,
          //     //     label: 'SST Amt',
          //     //     align: 'right',
          //     //     sortable: true,
          //     //     field: 'sst_amt',
          //     //     format_child: '',
          //     //     tooltip: '',
          //     //     headerStyle: 'text-align: center;',
          //     //     sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
          //     // },
          //     // {
          //     //     name: 'sst_variance',
          //     //     required: true,
          //     //     label: 'SST Variance',
          //     //     align: 'right',
          //     //     sortable: true,
          //     //     field: 'sst_variance',
          //     //     format_child: '',
          //     //     tooltip: '',
          //     //     headerStyle: 'text-align: center;',
          //     //     sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
          //     // },
          //     {
          //         name: 'TotalPrice',
          //         required: true,
          //         label: 'Total',
          //         align: 'right',
          //         sortable: true,
          //         field: 'TotalPrice',
          //         format_child: '',
          //         tooltip: '',
          //         headerStyle: 'text-align: center;',
          //         sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
          //     },
          //     // {
          //     //     name: 'TaxCode',
          //     //     required: true,
          //     //     label: 'Tax Code',
          //     //     align: 'left',
          //     //     sortable: true,
          //     //     field: 'TaxCode',
          //     //     format_child: '',
          //     //     tooltip: '',
          //     //     headerStyle: 'text-align: center;',
          //     // },
          //     // {
          //     //     name: 'TaxManual',
          //     //     required: true,
          //     //     label: 'Tax Manual',
          //     //     align: 'center',
          //     //     sortable: true,
          //     //     field: 'TaxManual',
          //     //     format_child: '',
          //     //     tooltip: '',
          //     //     headerStyle: 'text-align: center;',
          //     // },
          //     {
          //         name: 'Location',
          //         required: true,
          //         label: 'Location',
          //         align: 'left',
          //         sortable: true,
          //         field: 'Location',
          //         format_child: '',
          //         tooltip: '',
          //         headerStyle: 'text-align: center;',
          //     },
          //     {
          //         name: 'reason',
          //         required: true,
          //         label: 'Reason',
          //         align: 'left',
          //         sortable: true,
          //         field: 'reason',
          //         format_child: '',
          //         tooltip: '',
          //         headerStyle: 'text-align: center;'
          //     },
          //     {
          //         name: 'AverageCost',
          //         required: true,
          //         label: 'Avg Cost',
          //         align: 'right',
          //         sortable: true,
          //         field: 'AverageCost',
          //         format_child: '',
          //         tooltip: '',
          //         headerStyle: 'text-align: center;',
          //         sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
          //     },
          //     {
          //         name: 'LastCost',
          //         required: true,
          //         label: 'Last Cost',
          //         align: 'right',
          //         sortable: true,
          //         field: 'LastCost',
          //         format_child: '',
          //         tooltip: '',
          //         headerStyle: 'text-align: center;',
          //         sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
          //     },
          //     {
          //         name: 'StdCost',
          //         required: true,
          //         label: 'Std Cost',
          //         align: 'right',
          //         sortable: true,
          //         field: 'StdCost',
          //         format_child: '',
          //         tooltip: '',
          //         headerStyle: 'text-align: center;',
          //         sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
          //     },
          //     {
          //         name: 'SellingPrice',
          //         required: true,
          //         label: 'Selling Price',
          //         align: 'right',
          //         sortable: true,
          //         field: 'SellingPrice',
          //         format_child: '',
          //         tooltip: '',
          //         headerStyle: 'text-align: center;',
          //         sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
          //     },
          //     {
          //         name: 'Barcode',
          //         required: true,
          //         label: 'Bar Code',
          //         align: 'left',
          //         sortable: true,
          //         field: 'Barcode',
          //         format_child: '',
          //         tooltip: '',
          //         headerStyle: 'text-align: center;',
          //     },
          //     // {
          //     //     name: 'QOHBefore',
          //     //     required: true,
          //     //     label: 'QOH Before',
          //     //     align: 'right',
          //     //     sortable: true,
          //     //     field: 'QOHBefore',
          //     //     format_child: '',
          //     //     tooltip: '',
          //     //     headerStyle: 'text-align: center;',
          //     //     sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
          //     // },
          //     // {
          //     //     name: 'QOHAfter',
          //     //     required: true,
          //     //     label: 'QOH After',
          //     //     align: 'right',
          //     //     sortable: true,
          //     //     field: 'QOHAfter',
          //     //     format_child: '',
          //     //     tooltip: '',
          //     //     headerStyle: 'text-align: center;',
          //     //     sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
          //     // },
          //     // {
          //     //     name: 'AvgBefore',
          //     //     required: true,
          //     //     label: 'Avg Before',
          //     //     align: 'right',
          //     //     sortable: true,
          //     //     field: 'AvgBefore',
          //     //     format_child: '',
          //     //     tooltip: '',
          //     //     headerStyle: 'text-align: center;',
          //     //     sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
          //     // },
          //     // {
          //     //     name: 'AvgAfter',
          //     //     required: true,
          //     //     label: 'Avg After',
          //     //     align: 'right',
          //     //     sortable: true,
          //     //     field: 'AvgAfter',
          //     //     format_child: '',
          //     //     tooltip: '',
          //     //     headerStyle: 'text-align: center;',
          //     //     sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
          //     // },
          //     {
          //         name: 'WeightedAvgCost',
          //         required: true,
          //         label: 'Weighted Avg Cost',
          //         align: 'right',
          //         sortable: true,
          //         field: 'WeightedAvgCost',
          //         format_child: '',
          //         tooltip: '',
          //         headerStyle: 'text-align: center;',
          //         sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
          //     },
          //     {
          //         name: 'ori_inv_no',
          //         required: true,
          //         label: 'Original Invoice No',
          //         align: 'left',
          //         sortable: true,
          //         field: 'ori_inv_no',
          //         format_child: '',
          //         tooltip: '',
          //         headerStyle: 'text-align: center;'
          //     },
          //     {
          //         name: 'ori_inv_date',
          //         required: true,
          //         label: 'Original Invoice Date',
          //         align: 'left',
          //         sortable: true,
          //         field: 'ori_inv_date',
          //         format_child: '',
          //         tooltip: '',
          //         headerStyle: 'text-align: center;'
          //     },
          //     {
          //         name: 'itemremark',
          //         required: true,
          //         label: 'Remark',
          //         align: 'left',
          //         sortable: true,
          //         field: 'itemremark',
          //         format_child: '',
          //         tooltip: '',
          //         headerStyle: 'text-align: center;'
          //     },
          // ];

          var table_column1 = [
              {
                  name: 'no',
                  required: true,
                  label: 'No',
                  align: 'right',
                  sortable: true,
                  field: 'no',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'code',
                  required: true,
                  label: 'Code',
                  align: 'left',
                  sortable: true,
                  field: 'code',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  // sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
              },
              {
                  name: 'DN',
                  required: true,
                  label: 'DN',
                  align: 'left',
                  sortable: true,
                  field: 'DN',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  // sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
              },
              {
                  name: 'value',
                  required: true,
                  label: 'Value',
                  align: 'left',
                  sortable: true,
                  field: 'value',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
          ];

          this.table_column = table_column;
          this.table_column1 = table_column1;

          this.$nextTick(async ()=>{
            payload.RefNo = this.$route.query.refno;
            payload.language = this.language;

            var data = {};

            if(this.page_function == 'CreateCreditNote')
            {
              data = {
                  "data": []
              };
            }
            else
            {
              data = await this.getCnchild(payload);
              var results = data.response;

              this.supplier_readonly = results.length > 0;

              for(var i in results)
              {
                var obj = results[i];
                obj.Line = this.formatAmount(obj.Line,'qty');
                obj.Packsize = this.formatAmount(obj.Packsize,'qty');
                obj.Qty = this.formatAmount(obj.Qty,'qty');
                obj.UnitPrice = this.formatAmount(obj.UnitPrice,'$');
                obj.TotalPrice = this.formatAmount(obj.TotalPrice,'$');
                obj.AverageCost = this.formatAmount(obj.AverageCost,'$');
                obj.LastCost = this.formatAmount(obj.LastCost,'$');
                obj.StdCost = this.formatAmount(obj.StdCost,'$');
                obj.SellingPrice = this.formatAmount(obj.SellingPrice,'$');
                obj.WeightedAvgCost = this.formatAmount(obj.WeightedAvgCost,'$');
              }
            }

            // if(payload.params.ordering == "")
            // {
            //   payload.params.ordering = "-updated_at"
            // }

            this.table_data1 = {
                "data": {
                    "count": 0,
                    "next": null,
                    "previous": null,
                    "results": []
                }
            };

            this.table_data = {
              "data": {
                    "count": 100,
                    "next": null,
                    "previous": null,
                    "results": data.response
                }
            };

            this.results = data.response;
          });
      },
      table_function1(payload){;

          var table_column1 = [
              {
                  name: 'no',
                  required: true,
                  label: 'No',
                  align: 'right',
                  sortable: true,
                  field: 'no',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'code',
                  required: true,
                  label: 'Code',
                  align: 'left',
                  sortable: true,
                  field: 'code',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  // sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
              },
              {
                  name: 'DN',
                  required: true,
                  label: 'DN',
                  align: 'left',
                  sortable: true,
                  field: 'DN',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  // sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
              },
              {
                  name: 'value',
                  required: true,
                  label: 'Value',
                  align: 'left',
                  sortable: true,
                  field: 'value',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
          ];

          this.table_column1 = table_column1;
          this.table_data1 = {
              "data": {
                  "count": 0,
                  "next": null,
                  "previous": null,
                  "results": []
              }
          };

      },
      async item_table_function(payload){
          this.forceLoading = true;

          if(this.search_supplier != true)
          {
            var table_column = [
                {
                    name: 'Itemcode',
                    required: true,
                    label: 'Itemcode',
                    align: 'left',
                    sortable: true,
                    field: 'Itemcode',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                },
                {
                    name: 'Description',
                    required: true,
                    label: 'Description',
                    align: 'left',
                    sortable: true,
                    field: 'Description',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 2%;',
                },
                {
                    name: 'ItemBarcode',
                    required: true,
                    label: 'Barcode',
                    align: 'left',
                    sortable: true,
                    field: 'ItemBarcode',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;'
                },
                {
                    name: 'ArticleNo',
                    required: true,
                    label: 'Article No',
                    align: 'left',
                    sortable: true,
                    field: 'ArticleNo',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;'
                },
                {
                    name: 'SellingPrice',
                    required: true,
                    label: 'Selling Price',
                    align: 'right',
                    sortable: true,
                    field: 'SellingPrice',
                    format_child: '',
                    tooltip: '',
                    headerStyle:'text-align: center; width: 1%;',
                    sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
                },
                {
                    name: 'StdCost',
                    required: true,
                    label: 'Std Cost',
                    align: 'right',
                    sortable: true,
                    field: 'StdCost',
                    format_child: '',
                    tooltip: '',
                    headerStyle:'text-align: center; width: 1%;',
                    sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
                },
                {
                    name: 'LastCost',
                    required: true,
                    label: 'Last Cost',
                    align: 'right',
                    sortable: true,
                    field: 'LastCost',
                    format_child: '',
                    tooltip: '',
                    headerStyle:'text-align: center; width: 1%;',
                    sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
                },
                {
                    name: 'Dept',
                    required: true,
                    label: 'Dept',
                    align: 'left',
                    sortable: true,
                    field: 'Dept',
                    format_child: '',
                    tooltip: '',
                    headerStyle:'text-align: center; width: 1%;',
                },
                {
                    name: 'SubDept',
                    required: true,
                    label: 'SubDept',
                    align: 'left',
                    sortable: true,
                    field: 'SubDept',
                    format_child: '',
                    tooltip: '',
                    headerStyle:'text-align: center; width: 1%;',
                },
                {
                    name: 'Category',
                    required: true,
                    label: 'Category',
                    align: 'left',
                    sortable: true,
                    field: 'Category',
                    format_child: '',
                    tooltip: '',
                    headerStyle:'text-align: center; width: 1%;',
                },
            ];

            var type = this.search.type;
            var value = this.search.value;
            var user = this.user_name;
            var supplier_code = this.json.Code;
            console.log('suppliercode',supplier_code);
            var offset = payload.params.offset;

            if(payload.Barcode)
            {
              delete payload.Barcode;
            }
            if(payload.Itemcode)
            {
              delete payload.Itemcode;
            }
            if(payload.ArticleNo)
            {
              delete payload.ArticleNo;
            }
            if(payload.Description)
            {
              delete payload.Description;
            }

            payload.limit = payload.params.limit;
            payload.skip = offset;
            payload[`${type}`] = value;
            payload.user = user;
            payload.supplier_code = supplier_code;
            payload.language = this.language;
            payload.branch = this.json.Branch;
            var data = {};

            // await this.$store.dispatch('sales/trigger_post_read_item_all', payload).then(() => {
            //   data = JSON.parse(JSON.stringify(this.$store.getters['sales/get_post_read_item_all']));
            //   console.log('data',data);
            // });
            console.log('payload',payload);
            var payload2 ={
                "pass_json": payload
            }
            // await this.$store.dispatch('purchase/trigger_search_item_for_po', payload).then(() => {
            //   data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_search_item_for_po']));
            // });
            var object_pass = {
              dispatch: 'purchase/trigger_get_search_item_for_cn',
              getter: 'purchase/get_search_item_for_cn',
              app: this,
              payload: payload2,
            };

            var dispatch_response = await this.$dispatch(object_pass);

            this.item_table_column = table_column;

            if(dispatch_response.status)
            {
              var results = dispatch_response.response;

              for(var i in results.detail)
              {

                var obj = results.detail[i];
                obj.SellingPrice = this.formatAmount(obj.SellingPrice,'$');
                obj.StdCost = this.formatAmount(obj.StdCost,'$');
                obj.LastCost = this.formatAmount(obj.LastCost,'$');
                obj.selected = false;
              }

              this.item_table_data = {
                  "data": {
                      "count": results.total_row,
                      "next": null,
                      "previous": null,
                      "results": results.detail
                  }
              };
            }
            else
            {
              this.item_table_data = {
                  "data": {
                      "count": 0,
                      "next": null,
                      "previous": null,
                      "results": []
                  }
              };
            }

            this.forceLoading = false;
          }
          else
          {
            var table_column = [
                {
                    name: 'Code',
                    required: true,
                    label: 'Code',
                    align: 'left',
                    sortable: true,
                    field: 'Code',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                },
                {
                    name: 'Name',
                    required: true,
                    label: 'Name',
                    align: 'left',
                    sortable: true,
                    field: 'Name',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 2%;',
                },
                {
                    name: 'Mobile',
                    required: true,
                    label: 'Mobile',
                    align: 'left',
                    sortable: true,
                    field: 'Mobile',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;'
                },
                {
                    name: 'Fax',
                    required: true,
                    label: 'Fax',
                    align: 'left',
                    sortable: true,
                    field: 'Fax',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;'
                },
                {
                    name: 'email',
                    required: true,
                    label: 'Email',
                    align: 'left',
                    sortable: true,
                    field: 'email',
                    format_child: '',
                    tooltip: '',
                    headerStyle:'text-align: center; width: 1%;',
                },
                {
                    name: 'Add1',
                    required: true,
                    label: 'Address 1',
                    align: 'left',
                    sortable: true,
                    field: 'Add1',
                    format_child: '',
                    tooltip: '',
                    headerStyle:'text-align: center; width: 1%;',
                },
                {
                    name: 'Add2',
                    required: true,
                    label: 'Address 2',
                    align: 'left',
                    sortable: true,
                    field: 'Add2',
                    format_child: '',
                    tooltip: '',
                    headerStyle:'text-align: center; width: 1%;',
                },
                {
                    name: 'Add3',
                    required: true,
                    label: 'Address 3',
                    align: 'left',
                    sortable: true,
                    field: 'Add3',
                    format_child: '',
                    tooltip: '',
                    headerStyle:'text-align: center; width: 1%;',
                },
                {
                    name: 'Add4',
                    required: true,
                    label: 'Address 4',
                    align: 'left',
                    sortable: true,
                    field: 'Add4',
                    format_child: '',
                    tooltip: '',
                    headerStyle:'text-align: center; width: 1%;',
                },
            ];

            var type = 'S'  //C
            var search_type = this.search.type;
            var value = this.search.value;
            var user = this.user_name;

            var offset = payload.params.offset;
            payload.params.skip = offset;
            payload.type = type;
            payload.search_type = search_type;
            payload.value = value;
            payload.user = user;

            var data = {};

            await this.$store.dispatch('purchase/trigger_search_supcus', payload).then(() => {
              data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_search_supcus']));
            });

            this.item_table_column = table_column;

            if(data.status == 'success')
            {
              var results = data.response;

              for(var i in results.detail)
              {
                var obj = results.detail[i];
                obj.selected = false;
              }

              this.item_table_data = {
                  "data": {
                      "count": results.total_row,
                      "next": null,
                      "previous": null,
                      "results": results.detail
                  }
              };
            }
            else
            {
              this.item_table_data = {
                  "data": {
                      "count": 0,
                      "next": null,
                      "previous": null,
                      "results": []
                  }
              };
            }

            this.forceLoading = false;
          }
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
      async handleCreatePO(){
        this.showAddLoading = true;

        // var validated = await this.validate_form('save_form');

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

        if(this.page_function == 'CreateCreditNote')
        {
          var currentdate = new Date();
          var current_date_format = currentdate.getFullYear()+"-"+('0' + (currentdate.getMonth()+1)).slice(-2)+"-"+('0' + currentdate.getDate()).slice(-2)
          +" "+('0' + currentdate.getHours()).slice(-2) + ":" + ('0' + currentdate.getMinutes()).slice(-2) + ":" + ('0' + currentdate.getSeconds()).slice(-2);

          if((this.json.DeliverDate+" :00:00:00:00") < current_date_format)
          {
            this.showNotify("negative","Delivery date cannot earlier than current date.")
            this.showAddLoading = false;
            return;
          }//checking for delivery date cannot smaller than current date.
        }


        await this.savePO();
      },
      async savePO(){
          var step = this.json.step;

          var currentdate = new Date();
          var year = currentdate.getFullYear();
          var month = ('0' + (currentdate.getMonth() + 1)).slice(-2);
          var day = ('0' + currentdate.getDate()).slice(-2);
          var hours = ('0' + currentdate.getHours()).slice(-2);
          var minutes = ('0' + currentdate.getMinutes()).slice(-2);
          var seconds = ('0' + currentdate.getSeconds()).slice(-2);
          var milliseconds = currentdate.getMilliseconds();

          var current_date_format = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;

          var Code = this.json.Code;
          var DocNo = this.json.DocNo;
          var DocDate = this.json.DocDate;
          var Location = this.json.Location;
          var sup_cn_date = this.json.sup_cn_date;
          var sup_cn_no = this.json.sup_cn_no;
          var Remark = this.json.Remark;

          var payload = {
            "Code":Code,
            "DocNo":DocNo,
            "DocDate":DocDate,
            "sup_cn_date": sup_cn_date,
            "sup_cn_no": sup_cn_no,
            "Location":Location,
            "Remark": Remark,
            "Issuedby": this.concat_name_fullname,
            "doc_type": 'Purchase',
            "PONo": '',
            "SCType": 'S',
            "language": this.language
          };

          var data = {};

          if(this.page_function == 'CreateCreditNote')
          {
            console.log('payload',payload);
            await this.$store.dispatch('purchase/trigger_create_cn', payload).then(() => {
              data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_cn_status']));
            });

          }
          else if(this.page_function == 'EditCreditNote')
          {
            payload.RefNo = this.json.RefNo;

            await this.$store.dispatch('purchase/trigger_update_cn', payload).then(() => {
              data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_cn_status']));
            });
          }

          var status = data.status

          if(status == "success")
          {
            this.showAddLoading = false;

            var mobile = this.$q.screen.width < 600;


           var set_query = {
              "ERefNo":data.response.RefNo,
              "EType":data.response.Type,
              "SupCusType":data.response.SCType,
              "SupCusCode":data.response.Code,
              "EUser":this.user_name,
              "getuser":this.user_name
            };
            // console.log('set_query',set_query);
           var json_runtime_runscript_multi = {
                params:[
                {
                  "lookupdb_name": this.session_outlet_guid,
                  "trans_group": 'CN',
                  "trans_type": 'cnnotemain',
                  "set_query":set_query
                }
              ]
            };

            var payload_runtime_runscript_multi ={
              "pass_json": json_runtime_runscript_multi
            }

            var dispatch_response = await this.runscript_multi(payload_runtime_runscript_multi)


              if(this.page_function == 'CreateCreditNote')
              {
                this.showNotify("positive", "Created Successfully.");

                // if(mobile)
                // {
                //   this.$router.push({ name: 'confirm', query: { refno: data.response.RefNo, header: 'DN', type:'create' }})
                // }
                // else
                // {
                  this.$router.push({ name: 'EditCreditNote', query: { refno: data.response.RefNo, step: 2 } })
                // }
              }
              else if(this.page_function == 'EditCreditNote')
              {
                if(mobile)
                {
                  this.$router.push({ name: 'confirm', query: { refno: data.response.RefNo, header: 'CN', type:'update' }})
                }
                else
                {
                  this.showNotify("positive", "Updated Successfully.");
                  var refno = data.response.RefNo;

                  var cpayload =
                  {
                      RefNo: this.$route.query.refno,
                      language: this.language
                  }

                  var cdata = await this.getCnchild(cpayload);
                  var cresults = cdata.response;

                  var payload = {
                    RefNo: refno,
                    language: this.language
                  }

                  var data = await this.getFilterCnmain(payload);

                  var filtered_transmain = data.response;

              //   filtered_transmain.rebate_amt = this.formatAmount(filtered_transmain.rebate_amt, '$');
                  filtered_transmain.Total = this.formatAmount(filtered_transmain.Total, '$');
                  filtered_transmain.CN_Total_Inc_Tax = this.formatAmount(filtered_transmain.CN_Total_Inc_Tax, '$');
                  filtered_transmain.gst_tax_sum = this.formatAmount(filtered_transmain.gst_tax_sum, '$');
                  filtered_transmain.SubTotal1 = this.formatAmount(filtered_transmain.SubTotal1, '$');
                  if(filtered_transmain.stockday_min == 0.0)
                  {
                    filtered_transmain.stockday_min = '0';
                  }
                  if(filtered_transmain.stockday_max == 0.0)
                  {
                    filtered_transmain.stockday_max = '0';
                  }
                  if(filtered_transmain.pur_expiry_days == null || filtered_transmain.pur_expiry_days == 0)
                  {
                    filtered_transmain.pur_expiry_days = '0';
                  }

                  this.json = filtered_transmain;
                  this.status = this.json.BillStatus == 1;

                  // var numericPart = filtered_transmain.Code.substring(2);
                  var filter_outlet = this.location_options.filter((entry)=>{
                    return entry.value == this.json.Location;
                  })

                  this.json.ChildNo = this.formatAmount(cresults.length,'qty');
                  this.json.Branch = filter_outlet[0].value;
                  // this.json.Code = numericPart
                  this.json.step = step;
                  this.json.Remark = this.json.Remark==null ? '' : this.json.Remark;

                }

              }
            }else{
              var error_response = data.response;
              var show_error = "";

              Object.keys(error_response).forEach((loop_index)=>{
                if(loop_index !== 'status_code')
                {
                  var temp_error = {};
                  var error_message = "";
                  Object.keys(error_response[loop_index]).forEach((header,cindex)=>{
                      error_message = error_response[loop_index];
                  });
                  temp_error = loop_index + " - " + error_message;
                  show_error += temp_error  +"<br />";
                }
              });//close foreach error message

              this.showNotify('negative', show_error);

              this.showAddLoading = false;
            }

            if(dispatch_response.status){
               console.log('Runscript : All scripts executed successfully');
              //  this.showNotify('positive','All scripts executed successfully')
           }else{
              console.log('Runscript :', dispatch_response.message);
              this.showNotify('negative',dispatch_response.message)
            }

      },
      async validate_form(form_name = "")
      {
          var form_name = form_name;
          var error = 0;
          await this.$refs[form_name].validate().then(valid => {
              if (!valid) {
                  error = 1;
              }
          });

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
          // Notify.create({
          //     type: type,
          //     message: message,
          //     // timeout: 1000,
          //     position: 'center',
          //     html: true,
          //     actions: [
          //       { label: 'OK', color: 'white', handler: () => { } }
          //     ]
          // })
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
            this.handlePostTransmain();
          }
          if(event.key === 'Escape')
          {
            this.post_transmain = false;
          }
        }
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
      show_summary_dialog(){
        this.view_summary = true;
      },
      handleChangeInvoiveDate(newVal){
        this.jsonChild.ori_inv_date = newVal
        console.log('ori invoice date',newVal);
      },
      checkResponseJsonStatus(json_response){
        var errorItems = json_response.filter(item => item.status === false);
        // If there are no items with status === false, return true with a success message
        if (errorItems.length === 0) {
          return { status: true, message: "All scripts executed successfully" };
        } else {
          // If there are items with status === false, return false with an error message
          const errorMessage = errorItems[0].message || "Error in script execution";
          return { status: false, message: errorMessage };

         //const firstErrorMessage = errorItems[0].message || "Error in script execution";
          // Check if the error message is "run_query" or "exec_query"
          // if (firstErrorMessage.includes("run_query") || firstErrorMessage.includes("exec_query")) {
          //   return { status: false, message: "Error in script execution : " + " " + firstErrorMessage };
          // } else {
          //   return { status: false, message: firstErrorMessage };
          // }
          // const errorMessage = errorItems[0].message || "Error in script execution";
          // return { status: false, message: errorMessage };
        }
      },
      async runscript_multi(payload,seq){
         var object_pass = {
              dispatch: 'purchase/trigger_runtime_runscript_multi',
              getter: 'purchase/get_runscript_multi_status',
              app: this,
              payload: payload,
         };
         var dispatch_response_array = await this.$dispatch(object_pass);

         if(dispatch_response_array.status){
            var dispatch_response = dispatch_response_array.response.map(item => item.response_json);
            var dispatch_response2 = seq  === '1'  ? dispatch_response[0] : dispatch_response;

            if(dispatch_response2.length > 0){
              var tem_dispatch_response = this.checkResponseJsonStatus(dispatch_response2)
              // console.log('tem_dispatch_response',tem_dispatch_response);
              return tem_dispatch_response;
            }else{
              return dispatch_response2;
            }

        }else{
          return dispatch_response_array;
        }

    },
   generateDatePickerOptions(date){
    var currentdate = new Date();
     var current_date_format = currentdate.getFullYear()+"/"+('0' + (currentdate.getMonth()+1)).slice(-2)+"/"+('0' + currentdate.getDate()).slice(-2);
      console.log('current_date_format',current_date_format);
       if(this.json.DocDate){
          /* change date format yyyy-mm-dd to yyyy/mm/dd */
          //  console.log('date',date)

          var DocDate =  this.json.DocDate.replace(/-/g,"/");
          if(DocDate !== current_date_format){
            console.log('not current date');
            return date <= current_date_format
          }else{
            return date <= DocDate
          }

        }else{
          return date
        }

      },
      showLoading()
      {
            // default options
            Loading.show()

            // fully customizable
            Loading.show({
                spinner: QSpinnerTail,
                // spinnerColor: 'primary',

            // other props
            })
      },
      hideLoading()
      {
          // setTimeout(function(){
                Loading.hide();
          // },1000);
      },
      async handlePrint(){
        this.showLoading();
        var RefNo = this.json.RefNo;
        console.log('RefNo',RefNo);
        var set_query = {
          "ERefNo" : RefNo,
          "EUser":this.user_name,
          "getuser":this.user_name
        };

        var json_runtime_runscript_multi = {
            params:[
              {
                "lookupdb_name": this.session_outlet_guid,
                "trans_group": 'CN',
                "trans_type": '#Before print',
                "set_query":set_query
              }
            ]
        };

        var payload_runtime_runscript_multi ={
          "pass_json": json_runtime_runscript_multi
        }


        var dispatch_response = await this.runscript_multi(payload_runtime_runscript_multi,'1')

        if(dispatch_response.status){
            this.hideLoading();
            this.warning_report_dialog = true;
            console.log('runtime script:',dispatch_response.message);
            //   this.columns_print = [
            //   {
            //     name: 'title',
            //     required: true,
            //     label: 'Title',
            //     align: 'left',
            //     field: row => row.title,
            //     format: val => `${val}`,
            //     sortable: false
            //   },
            // ]
            // this.rows_print =[
            //   {
            //     title: 'CN Audit List - Warning Message Details',
            //   }
            // ]
        }else{
          this.hideLoading();
          this.showNotify('negative',dispatch_response.message)
          console.log('runtime script:',dispatch_response.message);
        }
        // this.$router.push({
        //   name: "Print",
        //   query: {
        //     from: 'Header',
        //     type: (this.page_function == 'PurchaseOrder' ? 'PO' : this.page_function == 'GoodsReceivedNote' ? 'GR' : this.page_function == 'SalesOrder' ? 'SO' : this.page_function == 'SalesInvoice' ? 'SI' : 'IS'),
        //     id: newVal.transmain_guid
        //   }
        // });
      },
      handlePrintWarning(){
        var refno = this.json.RefNo
        // this.$router.push('/erp/purchase/printTest?refno='+refno)
        this.$router.push({name:'PrintWarningMessage', query: { refno: refno, header: 'CN'}});
      },
       async handlePrintSelect(row){
        var requests = this.rows_print.data.results.map(async(row, index)=>{
            row.selected = false;
          });
          await Promise.all(requests);
          row.selected = true;
      },
      handlePrintTableChange(){

          this.columns_print = [
              {
                name: 'title',
                required: true,
                label: 'Title',
                align: 'left',
                field: row => row.title,
                format: val => `${val}`,
                sortable: false
              },
            ]
          this.rows_print =
            {
              data:{
              results:[
                {
                  title: 'CN Audit List - Warning Message Details',
                },
                {
                  title: 'Report',
                },
              ]
              }
            }
      },
        async updateAmount(){
        var payload = {
                  RefNo: this.$route.query.refno
                }

                var data = await this.getFilterCnmain(payload);
                var filtered_transmain = data.response;
              //  console.log('filtered_transmain',filtered_transmain);
                filtered_transmain.rebate_amt = this.formatAmount(filtered_transmain.rebate_amt, '$');
                filtered_transmain.Total = this.formatAmount(filtered_transmain.Total, '$');
                filtered_transmain.gst_tax_sum = this.formatAmount(filtered_transmain.gst_tax_sum, '$');
                filtered_transmain.SubTotal1 = this.formatAmount(filtered_transmain.SubTotal1, '$');
                filtered_transmain.SubTotal2 = this.formatAmount(filtered_transmain.SubTotal2, '$');
                this.json.Total = filtered_transmain.Total;
                this.json.gst_tax_sum = filtered_transmain.gst_tax_sum;
                this.json.SubTotal1 = filtered_transmain.SubTotal1;

      },

      // async runscript_multi(payload){
      //    var object_pass = {
      //         dispatch: 'purchase/trigger_runtime_runscript_multi',
      //         getter: 'purchase/get_runscript_multi_status',
      //         app: this,
      //         payload: payload,
      //    };
      //    var dispatch_response = await this.$dispatch(object_pass);
      //    return dispatch_response
      // }，
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
  },
}
</script>

<style scoped>
*>>>.q-card__section--vert {
    padding: 0px;
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
.dialog_action_bottom
{
  width: 95%;
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
    /* margin-left: -10px;
    margin-right: -10px; */
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
    /* padding-left: 10px; */
    /* padding-right: 10px; */
    padding-top: 0px;
    padding-bottom: 0px;
  }
}

@media screen and (min-width: 600px) {
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

@media screen and (min-width: 1024px) {
  .four_column_left
  {
    padding-right: 1%;
  }
}

@media screen and (max-width: 1024px) {
  .two_column_left
  {
    padding-right: 2%;
  }
}

* >>> .q-stepper__step-inner
{
  padding: 0px;
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

* >>> .q-btn-dropdown__arrow
{
  display: none;
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


@media screen and (min-width: 1024px) and (max-width: 1560px){
 .padding_right
  {
    padding-right: 10px;
  }
}

.dialog_action
{
  height: 55px;
  position: static;
  padding:0px;
  padding-right: 20px;
  padding-left: 20px;
  bottom: 0px;
  /* background-color: white; */
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
  padding-left: 16px;
  padding-right: 16px;
  font-weight: bold;
}
.card_sides
{
  padding-left: 10px;
  padding-right: 10px;
}

.upload_container
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
  padding-right: 1%;
}
.input_wrapper_center
{
  padding-right: 1%;
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
    /* margin-left: 10px; */
    /* margin-right: 10px; */
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
</style>