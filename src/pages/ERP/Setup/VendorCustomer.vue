"type"edit<template>
  <div style="font-size: 10px; padding-left: 15px; padding-right: 15px;">
  <!-- {{last_enter_field}} -->

      <div class="text-subtitle1 header_text">
          AR Customer Management
      </div>

      <q-form ref="save_form" style="background-color:white;">
          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">

          <div class="row">
            <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
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
                  title="Supplier"
                  icon="edit"
                  :done="done1"
                  style="font-size: 10px; padding-left: 15px; padding-right: 15px;"
                  >
                  </q-step>

                  <q-step
                  :name="2"
                  title="Status by Site"
                  caption=""
                  icon="edit"
                  :done="done2"
                  >
                  </q-step>

                  <q-step
                  :name="3"
                  title="Configuration"
                  icon="edit"
                  :done="done3"
                  >
                  </q-step>

                  <q-step
                  :name="4"
                  title="Product List"
                  icon="edit"
                  :done="done4"
                  >
                  </q-step>

                  <q-step
                  :name="5"
                  title="Replenishment"
                  icon="edit"
                  :done="done5"
                  >
                  </q-step>

                  <q-step
                  :name="6"
                  title="IBT/ICT"
                  icon="edit"
                  :done="done6"
                  >
                  </q-step>
                  
              </q-stepper>
            </div>
            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 top_right_button">
              <div>
                  <Button :disable="false" v-on:receiveClick="handleAddVendor"
                  :pass_label="''"
                  :pass_no_caps="true"
                  :pass_square="true"
                  :pass_dense="true"
                  :pass_flat="true"
                  :tooltip="true"
                  :pass_tooltip="'Add'"
                  style="font-size: 12px; background-color: #26A69A; color: white; margin-left: 0px; margin-right: 10px;"
                  :pass_icon="'add'"
                  />
                  <Button :disable="page_function == 'create' || page_function == 'edit'  ? true : false" v-on:receiveClick="handleEdit"
                  :pass_label="''"
                  :pass_no_caps="true"
                  :pass_square="true"
                  :pass_dense="true"
                  :pass_flat="true"
                  :tooltip="true"
                  :pass_tooltip="'Edit'"
                  style="font-size: 12px; background-color: #F2C037; color: white; margin-left: 0px; margin-right: 10px;"
                  :pass_icon="'edit'"
                  />
                  <Button :disable="page_function == 'view' || page_function == 'create' ? true : false" v-on:receiveClick="handleDelete"
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
                  <Button :disable="page_function == 'edit' ? true : false" v-on:receiveClick="handleCreateVendor"
                  :pass_label="''"
                  :pass_no_caps="true"
                  :pass_square="true"
                  :pass_dense="true"
                  :pass_flat="true"
                  :tooltip="true"
                  :pass_tooltip="'Save'"
                  style="font-size: 12px; background-color: #094161; color: white; margin-left: 0px; margin-right: 10px;"
                  :pass_icon="'save'"
                  />
                  <Button :disable="false" v-on:receiveClick="back()"
                  :pass_label="''"
                  :pass_no_caps="true"
                  :pass_square="true"
                  :pass_dense="true"
                  :pass_flat="true"
                  :tooltip="true"
                  :pass_tooltip="'Back'"
                  style="font-size: 12px; background-color: #00000000; color: black; margin-left: 0px; margin-right: 10px;"
                  :pass_icon="'reply_all'"
                  />
                  <Button :disable="disable_previous_button" v-on:receiveClick="handlePagination('previous')"
                  :pass_label="''"
                  :pass_no_caps="true"
                  :pass_square="true"
                  :pass_dense="true"
                  :pass_flat="true"
                  :tooltip="true"
                  :pass_tooltip="'Previous'"
                  style="font-size: 12px; background-color: #00000000; color: black; margin-left: 0px; margin-right: 5px;"
                  :pass_icon="'arrow_back'"
                  />
                  <Button :disable="disable_next_button" v-on:receiveClick="handlePagination('next')"
                  :pass_label="''"
                  :pass_no_caps="true"
                  :pass_square="true"
                  :pass_dense="true"
                  :pass_flat="true"
                  :tooltip="true"
                  :pass_tooltip="'Next'"
                  style="font-size: 12px; background-color: #00000000; color: black; margin-left: 0px; margin-right: 10px;"
                  :pass_icon="'arrow_forward'"
                  />
              </div>
          </div>
          </div>

          <div class="step-content">
              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div style="align-items: center; width: 100%;">
                      <div class="col-xl-10 col-lg-10 col-md-10 col-sm-10 col-xs-10" style="padding-top: 10px; height: 100%;">
                        <div class="row" style="margin-bottom: 10px;">
                          <div class="col-xl-5 col-lg-5 col-md-5 col-sm-6 col-xs-12" style="padding-right: 10px;">
                            <div class="row">                              
                              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <div class="row">                                  
                                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pb-sm">
                                    <div class="row" style="align-items: center;">
                                      <div class="col-xl-5 col-lg-5 col-md-5 col-sm-3 col-xs-3">
                                          <Label :pass_value="'Supplier Link'" />
                                      </div>
                                      <div class="col-xl-7 col-lg-7 col-md-7 col-sm-9 col-xs-9">
                                          <Input :autofocusclick="true" 
                                          v-model:pass_value="json.AccountCode" 
                                          v-on:receiveChange="handleChange"
                                          :dbComponentBehavior="dbComponentBehavior.text"/>
                                      </div>
                                    </div>
                                  </div>

                                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pb-sm">
                                    <div class="row" style="align-items: center;">
                                      <div class="col-xl-5 col-lg-5 col-md-5 col-sm-3 col-xs-3">
                                          <Label :pass_value="'Supplier Code'" />
                                      </div>
                                      <div class="col-xl-7 col-lg-7 col-md-7 col-sm-9 col-xs-9">
                                          <Input :autofocusclick="true"
                                          v-model:pass_value="json.Code"
                                          v-on:receiveChange="handleChange('')" 
                                          :dbComponentBehavior="dbComponentBehavior.text" 
                                          :dense="dense"
                                          />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12" :class="$q.screen.width > 1023 ? 'q-pl-xs' : ''">
                                <div class="row">
                                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pb-sm">
                                    <div class="row" style="align-items: center;">
                                      <div class="col-xl-4 col-lg-4 col-md-4 col-sm-3 col-xs-3">
                                          <Label :pass_value="'AR Customer'" />
                                      </div>
                                      <div class="col-xl-8 col-lg-8 col-md-8 col-sm-9 col-xs-9">
                                          <Input :autofocusclick="true"
                                          v-model:pass_value="json.Code" 
                                          v-on:receiveChange="handleChange('')"
                                          :dbComponentBehavior="dbComponentBehavior.text" 
                                          />
                                      </div>
                                    </div>
                                  </div>

                                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pb-sm">
                                    <div class="row" style="align-items: center;">
                                      <div class="col-xl-4 col-lg-4 col-md-4 col-sm-3 col-xs-3">
                                          <Label :pass_value="'AP Supplier'" />
                                      </div>
                                      <div class="col-xl-8 col-lg-8 col-md-8 col-sm-9 col-xs-9">
                                          <Input :autofocusclick="true"
                                          v-model:pass_value="json.AccPCredit"
                                          v-on:receiveChange="handleChange" 
                                          :dbComponentBehavior="dbComponentBehavior.text" 
                                          />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div class="row q-pb-sm" style="align-items: center;">
                              <div :style="$q.screen.width > 1023 ? 'width: 20.6%;' : 'width: 25%'">
                                <Label :pass_value="'Name'"/>
                              </div>
                              <div :style="$q.screen.width > 1023 ? 'width: 79.4%;' : 'width: 75%'">
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" >
                                  <Input :autofocusclick="true"
                                  v-model:pass_value="json.Name" 
                                  v-on:receiveChange="handleChange" 
                                  :dbComponentBehavior="dbComponentBehavior.text_required" 
                                  :dense="dense"
                                  />
                                </div>
                              </div>
                            </div>

                            <div class="row q-pb-sm" style="align-items: center;">
                              <div :style="$q.screen.width > 1023 ? 'width: 20.6%;' : 'width: 25%'">
                                <Label :pass_value="'Entity Name'"/>
                              </div>
                              <div :style="$q.screen.width > 1023 ? 'width: 79.4%;' : 'width: 75%'">
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" >
                                  <Input :autofocusclick="true"
                                  v-model:pass_value="json.name_reg" 
                                  v-on:receiveChange="handleChange('')" 
                                  :dbComponentBehavior="dbComponentBehavior.text_required" 
                                  :dense="dense"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="col-xl-2 col-lg-2 col-md-2 col-sm-6 col-xs-12" style="padding-right: 10px;">
                            <div class="row q-pb-sm" style="align-items: center;">
                              <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-3">
                                  <Label :pass_value="'ID No'"/>
                              </div>
                              <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                  <Select
                                  v-model:pass_value="json.idtype"
                                  v-on:receiveChange="handleChange"
                                  :dbComponentBehavior="dbComponentBehavior.select"
                                  label=""
                                  :options="id_options"
                                  />
                              </div>
                              <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-5" style="padding-left: 3px;">
                                  <Input :autofocusclick="true"
                                  v-model:pass_value="json.idvalue"
                                  v-on:receiveChange="handleChange('')" 
                                  :dbComponentBehavior="dbComponentBehavior.text"
                                  :dense="dense"
                                  />
                              </div>
                            </div>

                            <div class="row q-pb-sm" style="align-items: center;">
                              <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-3">
                                  <Label :pass_value="'TIN'"/>
                              </div>
                              <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-9">
                                  <Input :autofocusclick="true"
                                  v-model:pass_value="json.tin"
                                  v-on:receiveChange="handleChange('')" 
                                  :dbComponentBehavior="dbComponentBehavior.text"
                                  :dense="dense"
                                  style="border-top-right-radius: 0px;"
                                  />
                              </div>
                            </div>

                            <div class="row q-pb-sm" style="align-items: center;">
                                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-3">
                                    <Label :pass_value="'MSIC Code'"/> 
                                </div>
                                <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-9">
                                    <Input :autofocusclick="true"
                                    v-model:pass_value="json.msic_code" 
                                    v-on:receiveChange="handleChange('')" 
                                    :dbComponentBehavior="dbComponentBehavior.text" 
                                    :dense="dense"
                                    />
                                </div>
                            </div>

                            <div class="row q-pb-sm" style="align-items: center;">
                              <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-3">
                                <Label :pass_value="'E-Inv Start'"/>
                              </div>
                              <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-9">
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" >
                                  <Datepicker v-on:receiveChange="handleChangeEinvStartDate" :daterange="json.einv_start_date" 
                                  :componentBehavior="dbComponentBehavior.text" :autoclose="true"/>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="col-xl-2 col-lg-2 col-md-2 col-sm-6 col-xs-12" style="padding-right: 10px;">
                            <div class="row q-pb-sm" style="align-items: center;">
                              <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3">
                                  <Label :pass_value="'Other No'"/>
                              </div>
                              <div class="col-xl-9 col-lg-9 col-md-9 col-sm-9 col-xs-9">
                                  <Input :autofocusclick="true"
                                  v-model:pass_value="json.reg_no"
                                  v-on:receiveChange="handleChange('')"
                                  :dbComponentBehavior="dbComponentBehavior.text"
                                  :dense="dense"
                                  />
                              </div>
                            </div>

                            <div class="row q-pb-sm" style="align-items: center;">
                              <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3">
                                <Label :pass_value="'Grouping'" />
                              </div>
                              <div class="col-xl-9 col-lg-9 col-md-9 col-sm-9 col-xs-9">
                                <Input :autofocusclick="true"
                                v-model:pass_value="json.supcusGroup"
                                v-on:receiveChange="handleChange('')" 
                                :dbComponentBehavior="dbComponentBehavior.text"
                                :dense="dense"
                                style="border-top-right-radius: 0px;"
                                />
                              </div>
                            </div>

                            <div class="row q-pb-sm" style="align-items: center;">
                              <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3">
                                <Label :pass_value="'Currency'" class="unknown_field" />
                              </div>
                              <div class="col-xl-9 col-lg-9 col-md-9 col-sm-9 col-xs-9">
                                <div class="row">
                                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                    <LabelSelectVerticalGeneral
                                      v-model:pass_value="json.currency_code"
                                      v-on:receiveChange="handleChange('')" 
                                      :dbComponentBehavior="dbComponentBehavior.text"
                                      :options="currency_options"
                                      :pass_overwrite_display="'value'"
                                  />
                                  </div>
                                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-left: 3px;">
                                    <LabelSelectVerticalGeneral
                                      v-model:pass_value="json.currency2"
                                      v-on:receiveChange="handleChange('')" 
                                      :dbComponentBehavior="dbComponentBehavior.text"
                                      :options="currency_options2"
                                  />
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div class="row q-pb-sm" style="align-items: center;"> 
                              <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3">
                                <Label :pass_value="'Status'" class="unknown_field" /> 
                              </div>
                              <div class="col-xl-9 col-lg-9 col-md-9 col-sm-9 col-xs-9">
                                <div class="row">
                                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                    <LabelSelectVerticalGeneral
                                    v-model:pass_value="json.status"
                                    v-on:receiveChange="handleChange('')" 
                                    :dbComponentBehavior="dbComponentBehavior.text"
                                    :options="status2_options"
                                    />
                                  </div>
                                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-left: 3px;">
                                    <Select
                                    v-model:pass_value="json.Consign"
                                    v-on:receiveChange="handleChangeConsign"
                                    :dbComponentBehavior="dbComponentBehavior.select"
                                    label=""
                                    :options="consign_options"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-12" style="padding-right: 10px;">
                            <div class="row q-pb-sm" style="align-items: center;">
                              <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-3">
                                  <Label :pass_value="'Payment Term'"/> 
                              </div>
                              <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-9">
                                  <Input :autofocusclick="true"
                                  v-model:pass_value="json.Term" 
                                  v-on:receiveChange="handleReceiveChange" 
                                  :dbComponentBehavior="dbComponentBehavior.text" 
                                  :dense="dense"
                                  />
                              </div>
                            </div>

                            <div class="row q-pb-sm" style="align-items: center;">
                              <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-3">
                                  <Label :pass_value="'Calc Due Date By'"/> 
                              </div>
                              <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-9">
                                  <Input :autofocusclick="true"
                                  v-model:pass_value="json.CalDueDateby" 
                                  v-on:receiveChange="handleReceiveChange" 
                                  :dbComponentBehavior="dbComponentBehavior.cal_due_date_by" 
                                  :dense="dense"
                                  />
                              </div>
                            </div>

                            <div class="row q-pb-sm" style="align-items: center;">
                              <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-3">
                                  <Label :pass_value="'Credit Limit'"/> 
                              </div>
                              <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-9">
                                  <Input :autofocusclick="true"
                                  v-model:pass_value="json.CreditLimit" 
                                  v-on:receiveChange="handleChangeCreditLimit" 
                                  :dbComponentBehavior="dbComponentBehavior.input_number" 
                                  :dense="dense"
                                  />
                              </div>
                            </div>

                            <div class="row q-pb-sm" style="align-items: center;"> 
                              <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-3">
                                  <Label :pass_value="'Pay Method'"/>
                              </div>
                              <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-9">
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" >
                                  <Select
                                  v-model:pass_value="json.grn_baseon_pocost"
                                  v-on:receiveChange="handleChangePOMethod"
                                  :dbComponentBehavior="dbComponentBehavior.select"
                                  label=""
                                  :options="grn_baseon_pocost_options"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                  </div>  
              </div>
          </div>

          <q-card flat class="card-container" style="max-height: 100%; padding: 10px;border-radius: 0px; padding-top: 0px;padding-left: 0px;">
              <q-card-section class="upload_container" style="font-size: 10px;">
  
              <q-card-actions class="dialog_action justify-between row" style="padding-left: 10px; padding-right: 0px;">
  
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" style="margin-top: 20px;">
                  <div class="component_div2">
                      <q-toolbar class="bg-white q-pl-sm custom_toolbar">
                          <q-tabs
                          v-model="tab"
                          dense
                          class="bg-white q-pl-md q-pt-sm"
                          active-class="active_class_tab"
                          indicator-color="transparent"
                          align="justify"
                          narrow-indicator
                          shrink stretch
                          no-caps
                          @update:model-value="handleChangeTab"
                          >
                              <q-tab content-class="custom_tab_font" name="Information" label="Information"/> 
                              <q-tab content-class="custom_tab_font" name="Status by Site" :disable="false" label="Status by Site"/> 
                              <q-tab content-class="custom_tab_font" name="Configuration" :disable="false" label="Configuration"/>
                              <q-tab content-class="custom_tab_font" name="Product List" :disable="false" label="Product List"/> 
                              <q-tab content-class="custom_tab_font" name="Replenishment" :disable="false" label="Replenishment"/> 
                              <q-tab content-class="custom_tab_font" name="IBT/ICT" :disable="false" label="IBT/ICT"/> 
                              <q-tab content-class="custom_tab_font" name="Change Log" :disable="false" label="Change Log"/>
                          </q-tabs>
                      </q-toolbar>
                      <q-separator />
  
                      <q-tab-panels v-model="tab" :animated="false" keep-alive ref="tabs"> 
  
                        <q-tab-panel name="Information" style="padding: 0px; padding-top: 10px; color: grey; overflow: hidden">
                          <div class="row">
                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-12" style="padding-right: 10px;">
                              <div class="row">
                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pb-xs">
                                  <LabelInputVerticalGeneral
                                  :autofocusclick="true"
                                  :pass_label_value="'Address 1'"
                                  v-model:pass_value="json.Add1" 
                                  v-on:receiveChange="handleChange" 
                                  :dbComponentBehavior="dbComponentBehavior.address1" 
                                  :pass_dense="dense"
                                  />
                                </div>
                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pb-xs">
                                  <LabelInputVerticalGeneral
                                  :autofocusclick="true"
                                  :pass_label_value="'Address 2'"
                                  v-model:pass_value="json.Add2" 
                                  v-on:receiveChange="handleChange('')" 
                                  :dbComponentBehavior="dbComponentBehavior.address1" 
                                  :pass_dense="dense"
                                  />
                                </div>
                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pb-xs">
                                  <LabelInputVerticalGeneral
                                  :autofocusclick="true"
                                  :pass_label_value="'Address 3'"
                                  v-model:pass_value="json.Add3" 
                                  v-on:receiveChange="handleChange('')" 
                                  :dbComponentBehavior="dbComponentBehavior.address1" 
                                  :pass_dense="dense"
                                  />
                                </div>
                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pb-xs">
                                  <LabelInputVerticalGeneral
                                  :autofocusclick="true"
                                  :pass_label_value="'Address 4'"
                                  v-model:pass_value="json.Add4" 
                                  v-on:receiveChange="handleChange" 
                                  :dbComponentBehavior="dbComponentBehavior.address1" 
                                  :pass_dense="dense"
                                  />
                                </div>
                              </div>
                            </div>

                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-12" style="padding-right: 10px;">
                              <div class="row">
                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pb-xs">
                                  <LabelInputVerticalGeneral
                                  :autofocusclick="true"
                                  :pass_label_value="'City'"
                                  v-model:pass_value="json.City"
                                  v-on:receiveChange="handleChange('')" 
                                  :dbComponentBehavior="dbComponentBehavior.text"
                                  :pass_dense="dense"
                                  />
                                </div>
                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pb-xs">
                                  <LabelInputVerticalGeneral
                                  :autofocusclick="true"
                                  :pass_label_value="'State'"
                                  v-model:pass_value="json.State"
                                  v-on:receiveChange="handleChange" 
                                  :dbComponentBehavior="dbComponentBehavior.text"
                                  :pass_dense="dense"
                                  />
                                </div>
                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pb-xs">
                                  <div class="row">
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                      <LabelSelectVerticalGeneral
                                        v-model:pass_value="json.Country"
                                        :pass_label_value="'Country'"
                                        v-on:receiveChange="handleChangeCountry"
                                        :dbComponentBehavior="dbComponentBehavior.select"
                                        :options="country_options"
                                        :pass_overwrite_display="'value'"
                                      />
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 q-pl-xs">
                                      <LabelInputVerticalGeneral
                                        :autofocusclick="true"
                                        :pass_label_value="'Postcode'"
                                        v-model:pass_value="json.Postcode"
                                        v-on:receiveChange="handleChange('')" 
                                        :dbComponentBehavior="dbComponentBehavior.number_left"
                                        :pass_dense="dense"
                                        />
                                    </div>
                                  </div>
                                </div>
                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pb-xs">
                                  <LabelInputVerticalGeneral
                                  :autofocusclick="true"
                                  :pass_label_value="'Email'"
                                  v-model:pass_value="json.email"
                                  v-on:receiveChange="handleChange('')" 
                                  :dbComponentBehavior="dbComponentBehavior.email"
                                  :pass_dense="dense"
                                  />
                                </div>
                              </div>
                            </div>

                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                              <div class="row">
                                <div class="col-xl-8 col-lg-8 col-md-8 col-sm-6 col-xs-12" style="padding-right: 10px;">
                                  <div class="row">
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-4 col-xs-4">
                                      <div class="row">
                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pb-xs">
                                          <LabelInputVerticalGeneral
                                          :autofocusclick="true"
                                          :pass_label_value="'Tel'"
                                          v-model:pass_value="json.Tel"
                                          v-on:receiveChange="handleChange" 
                                          :dbComponentBehavior="dbComponentBehavior.text"
                                          :pass_dense="dense"
                                          />
                                        </div>
                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pb-xs">
                                          <LabelInputVerticalGeneral
                                          :autofocusclick="true"
                                          :pass_label_value="'Mobile No'"
                                          v-model:pass_value="json.Fax"
                                          v-on:receiveChange="handleChange" 
                                          :dbComponentBehavior="dbComponentBehavior.text"
                                          :pass_dense="dense"
                                          />
                                        </div>
                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pb-xs">
                                          <LabelInputVerticalGeneral
                                          :autofocusclick="true"
                                          :pass_label_value="'Contact Person'"
                                          v-model:pass_value="json.Mobile"
                                          v-on:receiveChange="handleReceiveChange" 
                                          :dbComponentBehavior="dbComponentBehavior.text"
                                          :pass_dense="dense"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-4 col-xs-4 q-pl-xs">
                                      <div class="row">
                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pb-xs">
                                          <LabelInputVerticalGeneral
                                          :autofocusclick="true"
                                          v-model:pass_value="json.gst_no"
                                          :pass_label_value="'GST Reg No'"
                                          v-on:receiveChange="handleReceiveChange"
                                          :dbComponentBehavior="dbComponentBehavior.text"
                                          label="test"
                                          />
                                        </div>
                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pb-xs">
                                          <LabelInputVerticalGeneral
                                          :autofocusclick="true"
                                          v-model:pass_value="json.tax_code"
                                          :pass_label_value="'GST Code'"
                                          v-on:receiveChange="handleChange('')"
                                          :dbComponentBehavior="dbComponentBehavior.text"
                                          :pass_dense="dense"
                                          />
                                        </div>
                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pb-xs">
                                          <b>GST Start Date</b>
                                          <Datepicker class="new_input" v-on:receiveChange="handleChangeGstStartDate" :daterange="json.gst_start_date" 
                                          :componentBehavior="dbComponentBehavior.text" :autoclose="true"/>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-4 col-xs-4 q-pl-xs">
                                      <div class="row">
                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pb-xs">
                                          <LabelInputVerticalGeneral
                                          :autofocusclick="true"
                                          v-model:pass_value="json.SSTRegNo"
                                          :pass_label_value="'SST Reg No'"
                                          v-on:receiveChange="handleReceiveChange"
                                          :dbComponentBehavior="dbComponentBehavior.text"
                                          label="test"
                                          />
                                        </div>
                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pb-xs">
                                          <LabelInputVerticalGeneral
                                          :autofocusclick="true"
                                          v-model:pass_value="json.SSTDefaultCode"
                                          :pass_label_value="'SST Code'"
                                          v-on:receiveChange="handleReceiveChange"
                                          :dbComponentBehavior="dbComponentBehavior.number_left"
                                          label="test"
                                          />
                                        </div>
                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pb-xs">
                                          <b>SST Start Date</b>
                                          <Datepicker class="new_input" v-on:receiveChange="handleChangeSstStartDate" :daterange="json.SSTEffectiveDate" 
                                          :componentBehavior="dbComponentBehavior.text" :autoclose="true"/>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="row">
                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pb-xs">
                                      <LabelInputVerticalGeneral
                                      :autofocusclick="true"
                                      class="remark_input"
                                      v-model:pass_value="json.Remark"
                                      :pass_label_value="'Remark'"
                                      v-on:receiveChange="handleReceiveChange"
                                      :dbComponentBehavior="dbComponentBehavior.text"
                                      label="test"
                                      /> 
                                    </div>
                                  </div>
                                </div>
    
                                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-12" style="padding-right: 10px;">
                                  <div class="row">
                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 unknown_field q-pb-xs">
                                      <LabelInputVerticalGeneral
                                      :autofocusclick="true"
                                      :disable="true"
                                      v-model:pass_value="json.created_on"
                                      :pass_label_value="'Created On'"
                                      v-on:receiveChange="handleChange('')"
                                      :dbComponentBehavior="dbComponentBehavior.date"
                                      label="test"
                                      />
                                    </div>
                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 unknown_field q-pb-xs">
                                      <LabelInputVerticalGeneral
                                      :autofocusclick="true"
                                      :disable="true"
                                      v-model:pass_value="json.created_by"
                                      :pass_label_value="'Created By'"
                                      v-on:receiveChange="handleChange('')"
                                      :dbComponentBehavior="dbComponentBehavior.text"
                                      :pass_dense="dense"
                                      />
                                    </div>
                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 unknown_field q-pb-xs">
                                      <LabelInputVerticalGeneral
                                      :autofocusclick="true"
                                      :disable="true"
                                      class="new_input"
                                      v-model:pass_value="json.updated_on"
                                      :pass_label_value="'Updated On'"
                                      v-on:receiveChange="handleChange('')"
                                      :dbComponentBehavior="dbComponentBehavior.date"
                                      :pass_dense="dense"
                                      />
                                    </div>
                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 unknown_field q-pb-xs">
                                      <LabelInputVerticalGeneral
                                      :autofocusclick="true"
                                      :disable="true"
                                      :pass_label_value="'Updated By'"
                                      v-model:pass_value="json.updated_by"
                                      v-on:receiveChange="handleChange('')" 
                                      :dbComponentBehavior="dbComponentBehavior.text"
                                      :pass_dense="dense"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                            
                        </q-tab-panel>
    
                        <q-tab-panel name="Status by Site" style="padding: 0px; padding-top: 10px; color: grey; overflow: hidden">
                            <div class="row">   
                                <div v-if="page_function == 'edit'" class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" align="right" style="padding-right: 10px; padding-bottom: 10px;">
                                    <Button v-on:receiveClick="handleShowCreateBranch"
                                    :pass_label="'Create'"
                                    :pass_no_caps="true"
                                    :pass_square="true"
                                    :pass_dense="true"
                                    class="custom_button"
                                    />
                                </div>

                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom: 10px; padding-right: 10px;">
                                    <div style="width: 100%;">
                                        <Table
                                        :row_per_page="[5,10,20,50]"
                                        :title="table_title"
                                        :table_data="table_data"
                                        :table_column="table_column"
                                        :flat_status="true"
                                        :bordered_status="true"
                                        v-on:receiveRequestTable="handleTableChange"
                                        :allow_add="false"
                                        :allow_edit="true"
                                        :allow_delete="false"
                                        v-on:receiveHandleAdd="handleReceiveHandleAdd"
                                        v-on:receiveHandleEdit="handleEditBranch"
                                        v-on:receiveHandleDelete="handleReceiveHandleDelete"
                                        :filter_mode_on="false"
                                        v-on:receiveColumnRearrange="handleColumnRearrange"
                                        v-on:filter_column="handleFilterColumn"
                                        :forceLoading="forceLoading"
                                        :column_reordering="true"
                                        :row_reordering="false"
                                        v-on:receiveHandleClearFilter="handleClearFilter"
                                        :pass_visible_columns="visibleColumns"
                                        />
                                    </div>
                                </div>
                            </div>
                        </q-tab-panel>
    
                        <q-tab-panel name="Configuration" style="padding: 0px; padding-top: 10px; color: grey; overflow: hidden">
                            <div class="row">    
                            <!-- row 1-->
                            <div class="row col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom: 3px;">
                                    <!-- col 1-->
                                    <div class="row col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2">
                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px">
                                        <LabelSelectVerticalGeneral
                                            v-model:pass_value="json.poprice_method"
                                            :pass_label_value="'PO Method'"
                                            v-on:receiveChange="handleChangePOMethod"
                                            :dbComponentBehavior="dbComponentBehavior.select"
                                            label=""
                                            :options="poprice_method_options"
                                        />
                                        </div>
                                    </div>

                                    <div class="row col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2">
                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 unknown_field" style="padding-right: 10px">
                                        <LabelInputVerticalGeneral
                                            :autofocusclick="true"
                                            v-model:pass_value="json.po_minimum_amount"
                                            :pass_label_value="'PO Minimum Amount'"
                                            v-on:receiveChange="handleReceiveChange"
                                            :dbComponentBehavior="dbComponentBehavior.text_right"
                                            label=""
                                        />
                                        </div>
                                    </div>
                                    
                                    <!-- col 2-->
                                    <div class="row col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2">
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                        <div>
                                        <b>One PO=One Delivery</b>
                                        </div>
                                        <div>
                                        <q-toggle
                                            dense
                                            style="padding-top: 7px; padding-bottom: 7px;"
                                            :false-value="0"
                                            :true-value="1"
                                            color="green"
                                            v-model="json.AutoClosePO"
                                        />
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                        <div>
                                        <b>Simple Receive</b>
                                        </div>
                                        <div>
                                        <q-toggle
                                            dense
                                            style="padding-top: 7px; padding-bottom: 7px;"
                                            :false-value="0"
                                            :true-value="1"
                                            color="green"
                                            v-model="json.Rec_Method_1"
                                        />
                                        </div>
                                    </div>
                                    </div>
                                    
                                    <!-- col 3-->
                                    <div class="row col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4" style="padding-right: 10px">
                                        <LabelInputVerticalGeneral
                                        :autofocusclick="true"
                                        v-model:pass_value="json.grpo_variance_qty"
                                        :pass_label_value="'GRN vs PO Tolerance Qty'"
                                        v-on:receiveChange="handleReceiveChange"
                                        :dbComponentBehavior="dbComponentBehavior.number"
                                        label=""
                                        :pass_suffix="'%'"
                                        />
                                    </div>

                                    </div>
                            </div>
                            
                            <!-- row 2-->
                            <div class="row col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom: 3px;">
                                <!-- col 1-->
                                <div class="row col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2">
                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 unknown_field" style="padding-right: 10px">

                                    <LabelSelectVerticalGeneral
                                        v-model:pass_value="json.promo_date"
                                        :pass_label_value="'PO Promotion Date (0-?, 1-?)'"
                                        v-on:receiveChange="handleChangePOMethod"
                                        :dbComponentBehavior="dbComponentBehavior.select"
                                        label=""
                                        :options="promotion_date_options"
                                    />
                                </div>
                                
                                </div>

                                <div class="row col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2">
                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 unknown_field" style="padding-right: 10px">
                                    <LabelInputVerticalGeneral
                                    :autofocusclick="true"
                                    v-model:pass_value="json.monthly_po_limit_by_store"
                                    :pass_label_value="'Monthly PO Limit by Store'"
                                    v-on:receiveChange="handleReceiveChange"
                                    :dbComponentBehavior="dbComponentBehavior.text_right"
                                    label=""
                                    />
                                </div>
                                </div>

                                <!-- col 2-->
                                <div class="row col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2">   
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px">
                                    <div>
                                        <b>Issue PO via HHT</b>
                                    </div>
                                    <div>
                                        <q-toggle
                                        dense
                                        style="padding-top: 7px; padding-bottom: 7px;"
                                        :false-value="0"
                                        :true-value="1"
                                        color="green"
                                        v-model="json.mobile_po"
                                        />
                                    </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px">
                                    <div>
                                        <b>Advance Receive</b>
                                    </div>
                                    <div>
                                        <q-toggle
                                        dense
                                        style="padding-top: 7px; padding-bottom: 7px;"
                                        :false-value="0"
                                        :true-value="1"
                                        color="green"
                                        v-model="json.Rec_Method_2"
                                        />
                                    </div>
                                    </div>           
                                            
                                </div>
    
                                <!-- col 3-->
                                <div class="row col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4" style="padding-right: 10px">
                                    <LabelInputVerticalGeneral
                                    :autofocusclick="true"
                                    v-model:pass_value="json.grpo_variance_price"
                                    :pass_label_value="'GRN vs PO Tolerance Price'"
                                    v-on:receiveChange="handleReceiveChange"
                                    :dbComponentBehavior="dbComponentBehavior.number"
                                    label=""
                                    :pass_suffix="'%'"
                                    />
                                </div>    
                                </div>
                            
                            </div>
    
                            <!-- row 3-->
                            <div class="row col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom: 3px;">
                                <!-- col 1-->
                                <div class="row col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2">
                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px">
                                    <LabelInputVerticalGeneral
                                    :autofocusclick="true"
                                    v-model:pass_value="json.poso_line_max"
                                    :pass_label_value="'PO Line Limit'"
                                    v-on:receiveChange="handleReceiveChange"
                                    :dbComponentBehavior="dbComponentBehavior.text_right"
                                    label=""
                                    />
                                    </div>
                                </div>


                                <!-- col 3-->
                                <div class="row col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2">
                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px">
                                    <div>
                                    <b>Stock Returnable</b>
                                    </div>
                                    <div>
                                    <div class="row">
                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                        <q-toggle
                                            dense
                                            style="padding-top: 7px; padding-bottom: 7px;"
                                            :false-value="0"
                                            :true-value="1"
                                            color="green"
                                            v-model="json.stock_returnable"
                                        />
                                        </div>
    
                                        <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-xs-12">
                                          <Select
                                          v-model:pass_value="json.stock_return_cost_type"
                                          v-on:receiveChange="handleChange"
                                          :dbComponentBehavior="dbComponentBehavior.select"
                                          label=""
                                          :options="stock_return_cost_type_options"
                                          />
                                        </div>
                                    </div>
    
                                    </div>
                                </div>
                                </div>

                                <!-- col 2-->
                                <div class="row col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2">
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px">
                                    <div>
                                    <b>Allow PO Qty &lt0</b>
                                    </div>
                                    <div>
                                    <q-toggle
                                        dense
                                        style="padding-top: 7px; padding-bottom: 7px;"
                                        :false-value="0"
                                        :true-value="1"
                                        color="green"
                                        v-model="json.po_negative_qty"
                                    />
                                    </div>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px">
                                    <div>
                                    <b>Receive with HHT</b>
                                    </div>
                                    <div>
                                    <q-toggle
                                        dense
                                        style="padding-top: 7px; padding-bottom: 7px;"
                                        :false-value="0"
                                        :true-value="1"
                                        color="green"
                                        v-model="json.Rec_Method_3"
                                    />
                                    </div>
                                </div>
                                </div>


                                <div class="row col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 unknown_field" style="padding-right: 10px">
                                    <LabelSelectVerticalGeneral
                                        v-model:pass_value="json.auto_price_change"
                                        :pass_label_value="'Auto Price Change (0-?, 1-?, 2-?)'"
                                        v-on:receiveChange="handleChangePOMethod"
                                        :dbComponentBehavior="dbComponentBehavior.select"
                                        label=""
                                        :options="auto_price_change_options"
                                    />
                                    </div>
                                </div>
                            </div>
                            
                            <!-- row 4-->
                            <div class="row col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom: 3px;">
                                <!-- col 1-->
                                <div class="row col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2">
                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px">
                                    <LabelInputVerticalGeneral
                                    :autofocusclick="true"
                                    v-model:pass_value="json.pur_expiry_days"
                                    :pass_label_value="'PO Expiry Day'"
                                    v-on:receiveChange="handleReceiveChange"
                                    :dbComponentBehavior="dbComponentBehavior.text_right"
                                    label="test"
                                    />
                                    </div>
                                
                                </div>

                                <!-- col 3-->
                                <div class="row col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2">
                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px">
                                    <div>
                                    <b>B2B Indicator</b>
                                </div>
                                <div>
                                    <q-toggle
                                    dense
                                    style="padding-top: 7px; padding-bottom: 7px;"
                                    :false-value="0"
                                    :true-value="1"
                                    color="green"
                                    v-model="json.b2b_registration"
                                    />
                                </div>
                                </div>
                                </div>

                                <!-- col 2-->
                                <div class="row col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2">
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px">
                                    <div>
                                    <b>Allow GRN GP% &lt0</b>
                                    </div>
                                    <div>
                                    <q-toggle
                                        dense
                                        style="padding-top: 7px; padding-bottom: 7px;"
                                        :false-value="0"
                                        :true-value="1"
                                        color="green"
                                        v-model="json.grn_allow_negative_margin"
                                    />
                                    </div>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px">
                                    <div>
                                    <b>Receive without PO</b>
                                    </div>
                                    <div>
                                    <q-toggle
                                        dense
                                        style="padding-top: 7px; padding-bottom: 7px;"
                                        :false-value="0"
                                        :true-value="1"
                                        color="green"
                                        v-model="json.auto_grn_mobile_po"
                                    />
                                    </div>
                                </div>
                                </div>
    
                                
    
                            </div>
                            </div>
                        </q-tab-panel>
    
                        <q-tab-panel name="Product List" style="padding: 0px; padding-top: 10px; color: grey; overflow: hidden">
                          <q-card>
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom: 10px; padding-right: 10px;">
                                <!-- <div style="width: 100%;">
                                  <Table
                                  :row_per_page="[5,10,20,50]"
                                  :title="table_title"
                                  :table_data="product_table_data"
                                  :table_column="product_table_column"
                                  :flat_status="true"
                                  :bordered_status="true"
                                  v-on:receiveRequestTable="productHandleTableChange"
                                  :allow_add="false"
                                  :allow_edit="true"
                                  :allow_delete="false"
                                  v-on:receiveHandleAdd="handleReceiveHandleAdd"
                                  v-on:receiveHandleEdit="handleEditBranch"
                                  v-on:receiveHandleDelete="handleReceiveHandleDelete"
                                  :filter_mode_on="false"
                                  v-on:receiveColumnRearrange="handleColumnRearrange"
                                  v-on:filter_column="handleFilterColumn"
                                  :forceLoading="productForceLoading"
                                  :column_reordering="true"
                                  :row_reordering="false"
                                  v-on:receiveHandleClearFilter="handleClearFilter"
                                  :pass_visible_columns="visibleColumns"
                                  />
                                </div> -->
                                <div style="width: 100%; height: 50vh; overflow-y: auto;">
                                  <table cell style="width: 100%; border-collapse: collapse; color: black; font-size: 11px;" class="custom_table">
                                    <thead>
                                      <tr>
                                        <th style="cursor: pointer; padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; background-color: #D7E2E9;">No</th>
                                        <th style="cursor: pointer; padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; background-color: #D7E2E9;" class="unknown_field">Priority</th>
                                        <th style="cursor: pointer; padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; background-color: #D7E2E9;" class="unknown_field">Type</th>
                                        <th style="cursor: pointer; padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; background-color: #D7E2E9;">Code</th>
                                        <th style="cursor: pointer; padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; background-color: #D7E2E9;">Name</th>
                                        <th style="cursor: pointer; padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; background-color: #D7E2E9;">
                                          Cur
                                          <q-tooltip anchor="top middle" self="center middle">
                                            Currency Code
                                          </q-tooltip>
                                        </th>
                                        <th style="cursor: pointer; padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; background-color: #D7E2E9;">Ordering UOM</th>
                                        <th style="cursor: pointer; padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; background-color: #D7E2E9;" class="unknown_field">UOM</th>
                                        <th style="cursor: pointer; padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; background-color: #D7E2E9;" class="unknown_field">Cost</th>
                                        <th style="cursor: pointer; padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; background-color: #D7E2E9;">Disc1</th>
                                        <th style="cursor: pointer; padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; background-color: #D7E2E9;">Disc2</th>
                                        <th style="cursor: pointer; padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; background-color: #D7E2E9;" class="unknown_field">Listed Cost</th>
                                        <th style="cursor: pointer; padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; background-color: #D7E2E9;">
                                          Min Order Qty
                                          <q-tooltip anchor="top middle" self="center middle">
                                            Min Order Qty
                                          </q-tooltip>
                                        </th>
                                        <th style="cursor: pointer; padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; background-color: #D7E2E9;">Order Lot Size</th>
                                        <th style="cursor: pointer; padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; background-color: #D7E2E9;" class="unknown_field">External Code</th>
                                        <th style="cursor: pointer; padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; background-color: #D7E2E9;">RSP Inc Tax</th>
                                        <th style="cursor: pointer; padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; background-color: #D7E2E9;">RSP Exc Tax</th>
                                        <th style="cursor: pointer; padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; background-color: #D7E2E9;">Department</th>
                                        <th style="cursor: pointer; padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; background-color: #D7E2E9;" class="unknown_field">Dept.Desc</th>
                                        <th style="cursor: pointer; padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; background-color: #D7E2E9;">Sub-Department</th>
                                        <th style="cursor: pointer; padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; background-color: #D7E2E9;" class="unknown_field">SubDept.Desc</th>
                                        <th style="cursor: pointer; padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; background-color: #D7E2E9;">Category</th>
                                        <th style="cursor: pointer; padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; background-color: #D7E2E9;" class="unknown_field">Category Desc</th>
                                        <th style="cursor: pointer; padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; background-color: #D7E2E9;">Updated On</th>
                                        <th style="cursor: pointer; padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; background-color: #D7E2E9;">Updated By</th>
                                        <th style="cursor: pointer; padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; background-color: #D7E2E9;">Created On</th>
                                        <th style="cursor: pointer; padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; background-color: #D7E2E9;">Created By</th>
                                        <th style="cursor: pointer; padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; background-color: #D7E2E9;" class="unknown_field">Effective Date</th>
                                      </tr>
                                    </thead>

                                    <tbody>
                                      <template v-for="(row, index) in product_table_data.data.results" :key="index">
                                        <tr>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">{{ row.unit.no }}</td>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">{{ row.unit.priority }}</td>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">{{ row.unit.type }}</td>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">{{ row.unit.Itemcode }}</td>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">{{ row.unit.ITEM_DESC }}</td>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">{{ row.unit.imsc_currency_code }}</td>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">{{ row.unit.order_uom }}</td>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">{{ row.unit.uom }}</td>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">{{ row.unit.cost }}</td>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">{{ row.unit.Disc1Value }}</td>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">{{ row.unit.Disc2Value }}</td>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">{{ row.unit.listed_cost }}</td>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">{{ row.unit.min_order_unit }}</td>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">{{ row.unit.OrderLotSize }}</td>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">{{ row.unit.external_code }}</td>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">{{ row.unit.SupRSPAfterTax }}</td>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">{{ row.unit.SupRSPBeforeTax }}</td>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">{{ row.unit.dept_code }}</td>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">{{ row.unit.dept_desc }}</td>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">{{ row.unit.subdept_code }}</td>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">{{ row.unit.subdept_desc }}</td>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">{{ row.unit.cat_code }}</td>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">{{ row.unit.cat_desc }}</td>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">{{ row.unit.Updated_at }}</td>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">{{ row.unit.Updated_by }}</td>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">{{ row.unit.Created_at }}</td>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">{{ row.unit.Created_by }}</td>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">{{ row.unit.effective_date }}</td>
                                        </tr>

                                        <tr :style="(product_table_data.length !== 1 && index !== product_table_data.length - 1) ? 
                                        'border-bottom: 2px solid #273655;' : ''">
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px;" colspan="3"/>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; border-right: 0px;">
                                            Block Order
                                            <q-toggle
                                            :disable="true"
                                            size="30px"
                                            dense
                                            color="green"
                                            v-model="row.case.block_order"
                                          />
                                          </td>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; border-left: 0px; border-right: 0px;">
                                            Non Returnable
                                            <q-toggle
                                            :disable="true"
                                            size="30px"
                                            dense
                                            color="green"
                                            v-model="row.case.none_return"
                                            />
                                          </td>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right; border-left: 0px;" colspan="2" class="unknown_field"> Case Qty = {{ row.case.order_uom }}</td>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">{{ row.case.uom }}</td>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">{{ row.case.cost }}</td>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">{{ row.case.disc1value_case }}</td>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">{{ row.case.disc2value_case }}</td>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">{{ row.case.listed_cost }}</td>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">{{ row.case.min_order_case }}</td>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">{{ row.case.orderlot_case }}</td>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px;" colspan="14"/>
                                        </tr>
                                      </template>
                                      <!-- <template v-for="(row, index) in product_table_data" :key="index">
                                        <tr>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">{{ row.unit.no }}</td>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">{{ row.unit.priority }}</td>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">{{ row.unit.type }}</td>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">{{ row.unit.code }}</td>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">{{ row.unit.name }}</td>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">{{ row.unit.currency }}</td>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">{{ row.unit.ordering_uom }}</td>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">{{ row.unit.uom }}</td>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">{{ row.unit.cost }}</td>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">{{ row.unit.disc1 }}</td>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">{{ row.unit.disc2 }}</td>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">{{ row.unit.listed_cost }}</td>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">{{ row.unit.min_order_qty }}</td>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">{{ row.unit.order_lot_size }}</td>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">{{ row.unit.external_code }}</td>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">{{ row.unit.rsp_inc_tax }}</td>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">{{ row.unit.rsp_exc_tax }}</td>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">{{ row.unit.dept_code }}</td>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">{{ row.unit.dept_desc }}</td>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">{{ row.unit.subdept_code }}</td>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">{{ row.unit.subdept_desc }}</td>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">{{ row.unit.cat_code }}</td>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">{{ row.unit.cat_desc }}</td>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">{{ row.unit.updated_at }}</td>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">{{ row.unit.updated_by }}</td>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">{{ row.unit.created_at }}</td>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">{{ row.unit.created_by }}</td>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">{{ row.unit.effective_date }}</td>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">{{ row.unit.uom2 }}</td>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">{{ row.unit.expected_cost }}</td>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">{{ row.unit.disc12 }}</td>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">{{ row.unit.disc22 }}</td>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">{{ row.unit.listed_cost2 }}</td>
                                        </tr>

                                        <tr :style="(product_table_data.length !== 1 && index !== product_table_data.length - 1) ? 
                                        'border-bottom: 2px solid #273655;' : ''">
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px;" colspan="3"/>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; border-right: 0px;">
                                            Block Order
                                            <q-toggle
                                            size="30px"
                                            dense
                                            color="green"
                                            v-model="row.case.block_order"
                                          />
                                          </td>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; border-left: 0px; border-right: 0px;">
                                            Non Returnable
                                            <q-toggle
                                              size="30px"
                                              dense
                                              color="green"
                                              v-model="row.case.non_returnable"
                                            />
                                          </td>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right; border-left: 0px;" colspan="2"> Case Qty = {{ row.case.ordering_uom }}</td>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">{{ row.case.uom }}</td>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">{{ row.case.cost }}</td>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">{{ row.case.disc1 }}</td>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">{{ row.case.disc2 }}</td>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">{{ row.case.listed_cost }}</td>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">{{ row.case.min_order_qty }}</td>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">{{ row.case.order_lot_size }}</td>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px;" colspan="14"/>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">Case Qty = {{ row.case.uom2 }}</td>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">{{ row.case.expected_cost }}</td>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">{{ row.case.disc12 }}</td>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">{{ row.case.disc22 }}</td>
                                          <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">{{ row.case.listed_cost2 }}</td>
                                        </tr>
                                      </template> -->
                                    </tbody>
                                  </table>
                                </div>
                            </div>

                            <q-inner-loading
                                :showing="productForceLoading"
                                color="primary"
                            />
                          </q-card>
                        </q-tab-panel>
    
                        <q-tab-panel name="Replenishment" style="padding: 0px; padding-top: 10px; color: grey" class="no-scroll">              
                            <div class="row">
                              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom: 10px;">
                                  <Button v-on:receiveClick="handleActiveClickSection('Supplier')"
                                  :pass_label="'Supplier'"
                                  :pass_no_caps="true"
                                  :pass_square="true"
                                  :pass_dense="true"
                                  :class="[active_section == 'Supplier' ? 'active_section_button' : 'inactive_section_button']"
                                  />
                                  <Button v-on:receiveClick="handleActiveClickSection('Banner/Site')"
                                  :pass_label="'Banner/Site'"
                                  :pass_no_caps="true"
                                  :pass_square="true"
                                  :pass_dense="true"
                                  :class="[active_section == 'Banner/Site' ? 'active_section_button' : 'inactive_section_button']"
                                  />
                              </div>
                            </div>
    
                            <div :class="['row', active_section != 'Supplier' && 'hide_section']">
                              <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-12">
                              
                                <!-- row 1-->
                                <div class="row col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom: 3px;">
                                    <!-- col 1-->
                                        <!-- <div class="row col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6"> -->
                                        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4" style="padding-right: 10px">
                                          <div>
                                            <b>Auto SOQ</b>
                                          </div>
                                          <div>
                                            <q-toggle
                                                dense
                                                style="padding-top: 7px; padding-bottom: 7px;"
                                                color="green"
                                                v-model="json.sc_auto_soq"
                                            />
                                          </div>
                                        </div>
                                        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4" style="padding-right: 10px">
                                            <LabelInputVerticalGeneral
                                            :autofocusclick="true"
                                            v-model:pass_value="json.stockday_min"
                                            :pass_label_value="'Min Day'"
                                            v-on:receiveChange="handleReceiveChange"
                                            :dbComponentBehavior="dbComponentBehavior.text_right"
                                            label="test"
                                            /> 
                                        </div>
        
                                        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4" style="padding-right: 10px">
                                            <LabelSelectVerticalGeneral
                                            v-model:pass_value="json.sc_order_freq"
                                            v-on:receiveChange="handleChangeOrderFrequency" 
                                            :pass_label_value="'Order Frequency'"
                                            :dbComponentBehavior="dbComponentBehavior.text"
                                            :options="order_frequency_options"
                                            />
                                        </div>
                                        <!-- </div> -->
        
                                
                                </div>
                                <!-- row 2-->
                                <div class="row col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom: 3px;">
                                    <!-- col 1-->
                                    
                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4" style="padding-right: 10px">
                                      <div>
                                        <b>Auto Ordering</b>
                                      </div>
                                      <div>
                                        <q-toggle
                                        dense
                                        style="padding-top: 7px; padding-bottom: 7px;"
                                        color="green"
                                        v-model="json.sc_auto_order"
                                        />
                                      </div>
                                    </div>
                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4" style="padding-right: 10px">
                                      <LabelInputVerticalGeneral
                                      :autofocusclick="true"
                                      v-model:pass_value="json.stockday_max"
                                      :pass_label_value="'Max Day'"
                                      v-on:receiveChange="handleReceiveChange"
                                      :dbComponentBehavior="dbComponentBehavior.text_right"
                                      label="test"
                                      />
                                    </div>
                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4 unknown_field" style="padding-right: 10px">
                                        
                                        <LabelInputVerticalGeneral
                                        :autofocusclick="true"
                                        :disable="true"
                                        v-model:pass_value="json.stock_day"
                                        :pass_label_value="'Stock Day'"
                                        v-on:receiveChange="handleReceiveChange"
                                        :dbComponentBehavior="dbComponentBehavior.number"
                                        label="test"
                                        />
                                    </div>
                                    
                                    <!-- </div> -->
                                    <!-- col 2-->
        
                                </div>
                                <!-- row 3-->
                                <div class="row col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom: 3px;">
                                    <!-- col 1-->
                                    <!-- <div class="row col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7"> -->
                                        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4" style="padding-right: 10px">
                                          <div>
                                            <b>Exclude from HQ Approval if DOH &lt Max Day</b>
                                          </div>
                                          <div>
                                            <q-toggle
                                                dense
                                                style="padding-top: 7px; padding-bottom: 7px;"
                                                :false-value="0"
                                                :true-value="1"
                                                color="green"
                                                v-model="json.exclude_orderqty_control"
                                            />
                                          </div>
                                        </div>
        
                                        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4 unknown_field" style="padding-right: 10px">
                                          <LabelInputVerticalGeneral
                                          :autofocusclick="true"
                                          v-model:pass_value="json.unit_weight"
                                          :pass_label_value="'Lead Time (Days)'"
                                          v-on:receiveChange="handleReceiveChange"
                                          :dbComponentBehavior="dbComponentBehavior.number"
                                          label="test"
                                          />
                                        </div>
                                    
                                        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4" style="padding-right: 10px">
                                            <LabelInputVerticalGeneral
                                            :autofocusclick="true"
                                            v-model:pass_value="json.sc_buffer_stock_day"
                                            :pass_label_value="'Buffer Stock Day'"
                                            v-on:receiveChange="handleReceiveChange"
                                            :dbComponentBehavior="dbComponentBehavior.text"
                                            label="test"
                                            />
                                        </div>
                                    <!-- </div> -->
                                    <!-- col 2-->
                                    
                                </div>
                                <!-- row 4-->
                                <!-- <div class="row col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom: 3px;"> -->
                                    <!-- col 1-->
                                    <!-- <div class="row col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7"> -->
                                        
                                        
                                        <!-- <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3" style="padding-right: 10px">
                                        
                                        </div> -->
                                    
                                    <!-- </div> -->
        
                                    <!-- col 2-->
        <!--                         
                                </div> -->
                              </div>

                              <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-12">
                                <div class="row col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom: 3px;">
                                <!-- col 1-->
                                
                                    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8" style="padding-right: 10px">
                                      <div class="row col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="align-items: center">
                                        <div class="col" style="display: flex; flex-direction: column; align-items: center;">
                                          <div>
                                            <b class="unknown_field">Mon</b>
                                          </div>
                                          <div>
                                            <q-toggle
                                            dense
                                            style="padding-top: 7px; padding-bottom: 7px;"
                                            color="green"
                                            v-model="json.all_day[0]"
                                            @update:model-value="handleChangeAllDay($event, 0)"
                                            />
                                          </div>
                                        </div>
                                        <div class="col" style="display: flex; flex-direction: column; align-items: center;">
                                          <div>
                                            <b class="unknown_field">Tue</b>
                                          </div>
                                          <div>
                                            <q-toggle
                                            dense
                                            style="padding-top: 7px; padding-bottom: 7px;"
                                            color="green"
                                            v-model="json.all_day[1]"
                                            @update:model-value="handleChangeAllDay($event, 1)"
                                            />
                                          </div>
                                        </div>
                                        <div class="col" style="display: flex; flex-direction: column; align-items: center;">
                                          <div>
                                            <b class="unknown_field">Wed</b>
                                          </div>
                                          <div>
                                            <q-toggle
                                            dense
                                            style="padding-top: 7px; padding-bottom: 7px;"
                                            color="green"
                                            v-model="json.all_day[2]"
                                            @update:model-value="handleChangeAllDay($event, 2)"
                                            />
                                          </div>
                                        </div>
                                        <div class="col" style="display: flex; flex-direction: column; align-items: center;">
                                          <div>
                                            <b class="unknown_field">Thu</b>
                                          </div>
                                          <div>
                                            <q-toggle
                                            dense
                                            style="padding-top: 7px; padding-bottom: 7px;"
                                            color="green"
                                            v-model="json.all_day[3]"
                                            @update:model-value="handleChangeAllDay($event, 3)"
                                            />
                                          </div>
                                        </div>
                                        <div class="col" style="display: flex; flex-direction: column; align-items: center;">
                                          <div>
                                            <b class="unknown_field">Fri</b>
                                          </div>
                                          <div>
                                            <q-toggle
                                            dense
                                            style="padding-top: 7px; padding-bottom: 7px;"
                                            color="green"
                                            v-model="json.all_day[4]"
                                            @update:model-value="handleChangeAllDay($event, 4)"
                                            />
                                          </div>
                                        </div>
                                        <div class="col" style="display: flex; flex-direction: column; align-items: center;">
                                          <div>
                                            <b class="unknown_field">Sat</b>
                                          </div>
                                          <div>
                                            <q-toggle
                                            dense
                                            style="padding-top: 7px; padding-bottom: 7px;"
                                            color="green"
                                            v-model="json.all_day[5]"
                                            @update:model-value="handleChangeAllDay($event, 5)"
                                            />
                                          </div>
                                        </div>
                                        <div class="col" style="display: flex; flex-direction: column; align-items: center;">
                                          <div>
                                            <b class="unknown_field">Sun</b>
                                          </div>
                                          <div>
                                            <q-toggle
                                            dense
                                            style="padding-top: 7px; padding-bottom: 7px;"
                                            color="green"
                                            v-model="json.all_day[6]"
                                            @update:model-value="handleChangeAllDay($event, 6)"
                                            />
                                          </div>
                                        </div>     
                                      </div>
                                    </div>
                                <!-- </div> -->
        
                            
                                </div>
                              </div>
                            </div>
    
                            <div :class="['row', active_section != 'Banner/Site' && 'hide_section']">
                              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom: 10px; padding-right: 10px;">
                                  <div style="width: 100%;">
                                    <Table
                                    :row_per_page="[5,10,20,50]"
                                    :title="table_title"
                                    :table_data="rpm_table_data"
                                    :table_column="rpm_table_column"
                                    :flat_status="true"
                                    :bordered_status="true"
                                    v-on:receiveRequestTable="rpmHandleTableChange"
                                    :allow_add="false"
                                    :allow_edit="true"
                                    :allow_delete="false"
                                    v-on:receiveHandleAdd="handleReceiveHandleAdd"
                                    v-on:receiveHandleEdit="handleEditBranch"
                                    v-on:receiveHandleDelete="handleReceiveHandleDelete"
                                    :filter_mode_on="false"
                                    v-on:receiveColumnRearrange="handleColumnRearrange"
                                    v-on:filter_column="handleFilterColumn"
                                    :forceLoading="rpmForceLoading"
                                    :column_reordering="true"
                                    :row_reordering="false"
                                    v-on:receiveHandleClearFilter="handleClearFilter"
                                    :pass_visible_columns="visibleColumns"
                                    />
                                  </div>
                              </div>
                            </div>
    
                            
                        </q-tab-panel>
    
                        <q-tab-panel name="IBT/ICT" style="padding: 0px; padding-top: 10px; color: grey" class="no-scroll">
                            
                            <div class="row">
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom: 10px;">
                                
                                <Button v-on:receiveClick="handleActiveClickSection2('Basic')"
                                :pass_label="'Basic'"
                                :pass_no_caps="true"
                                :pass_square="true"
                                :pass_dense="true"
                                :class="[active_section2 == 'Basic' ? 'active_section_button' : 'inactive_section_button']"
                                />
                                <Button v-on:receiveClick="handleActiveClickSection2('Banner/Site')"
                                :pass_label="'Banner/Site'"
                                :pass_no_caps="true"
                                :pass_square="true"
                                :pass_dense="true"
                                :class="[active_section2 == 'Banner/Site' ? 'active_section_button' : 'inactive_section_button']"
                                />
                            </div>
                            </div>
    
                            <div :class="['row', active_section2 != 'Basic' && 'hide_section']">
                              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom: 10px; padding-right: 10px;">
                                  <div style="width: 100%;">
                                    <Table
                                    :row_per_page="[5,10,20,50]"
                                    :title="table_title"
                                    :table_data="ibt_table_data"
                                    :table_column="ibt_table_column"
                                    :flat_status="true"
                                    :bordered_status="true"
                                    v-on:receiveRequestTable="ibtHandleTableChange"
                                    :allow_add="false"
                                    :allow_edit="true"
                                    :allow_delete="false"
                                    v-on:receiveHandleAdd="handleReceiveHandleAdd"
                                    v-on:receiveHandleEdit="handleEditBranch"
                                    v-on:receiveHandleDelete="handleReceiveHandleDelete"
                                    :filter_mode_on="false"
                                    v-on:receiveColumnRearrange="handleColumnRearrange"
                                    v-on:filter_column="handleFilterColumn"
                                    :forceLoading="ibtForceLoading"
                                    :column_reordering="true"
                                    :row_reordering="false"
                                    v-on:receiveHandleClearFilter="handleClearFilter"
                                    :pass_visible_columns="visibleColumns"
                                    />
                                  </div>
                              </div>                            
                            </div>
    
                            <div :class="['row', active_section2 != 'Banner/Site' && 'hide_section']">
                              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom: 10px; padding-right: 10px;">
                                  <div style="width: 100%;">
                                    <Table
                                    :row_per_page="[5,10,20,50]"
                                    :title="table_title"
                                    :table_data="ibt_site_table_data"
                                    :table_column="ibt_site_table_column"
                                    :flat_status="true"
                                    :bordered_status="true"
                                    v-on:receiveRequestTable="ibtSiteHandleTableChange"
                                    :allow_add="false"
                                    :allow_edit="true"
                                    :allow_delete="false"
                                    v-on:receiveHandleAdd="handleReceiveHandleAdd"
                                    v-on:receiveHandleEdit="handleEditBranch"
                                    v-on:receiveHandleDelete="handleReceiveHandleDelete"
                                    :filter_mode_on="false"
                                    v-on:receiveColumnRearrange="handleColumnRearrange"
                                    v-on:filter_column="handleFilterColumn"
                                    :forceLoading="ibtSiteForceLoading"
                                    :column_reordering="true"
                                    :row_reordering="false"
                                    v-on:receiveHandleClearFilter="handleClearFilter"
                                    :pass_visible_columns="visibleColumns"
                                    />
                                  </div>
                              </div>  
                            </div>
                        </q-tab-panel>
  
                        <q-tab-panel name="Change Log" style="padding: 0px; padding-top: 10px; color: grey">
                        </q-tab-panel>
                      </q-tab-panels>
  
                  </div>
                  </div>
  
              </q-card-actions>
              
              </q-card-section>
          </q-card>

          </div>
      </q-form>

      <q-card-actions class="dialog_action justify-between">
          <span class="q-pl-xs">
          <Button_icon :flat="true" :font_color="'black'" :color="'white'" :text="'BACK'" :outline="true" size="15px" class="custom_cancel_button" @click="back()" />
          </span>
          <span v-if="$route.name != 'VendorCustomer'" class="q-pl-xs">
              <Button_icon :flat="true" :font_color="'white'" :color="'#094161'" :text="'SAVE'" :outline="false" size="15px"
              v-on:receiveClick="handleCreateVendor"/>
          </span>
  
      </q-card-actions> 

      <q-inner-loading
          :showing="showAddLoading"
          color="primary"
      />
  </div>

  <q-dialog v-model="branch.dialog" persistent :position="$q.screen.width > 599 ? 'top' : 'bottom'">
    <q-card style="width: 500px; max-width: 70vw; margin-top: 5%; border-radius:8px">
      <q-card-section class="row theme_color dialog_header" style="padding-left: 8px; padding-right: 8px; align-items: center;">
        <div v-if="branch.action == 'edit'" class="text-subtitle1 header_text">Edit Site</div>
        <div v-else class="text-subtitle1 header_text">Add Site</div>
        <q-space />
        <q-btn icon="close" flat round dense @click="closeBranchDialog()" :disable="false"/>
      </q-card-section>

      <q-card-section class="upload_container">
        <q-form ref="save_branch_form">
          <div class="row upload_separator_first">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <div class="row input_wrapper_left_right" style="gap:16px;padding-top:16px">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <div class="row">
                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <div class="row">
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                            <div class="row" style="align-items: center;">
                                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                    <Label :pass_value="'Branch'" />
                                </div>
                                <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                  <Select
                                  v-model:pass_value="bjson.loc_group"
                                  v-on:receiveChange="handleChangeBranch"
                                  :dbComponentBehavior="dbComponentBehavior.select"
                                  label=""
                                  :options="branch_options"
                                  />
                                </div>
                            </div>
                        </div>

                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                            <div class="row" style="align-items: center;">
                                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                    <Label :pass_value="'Purchase Limit'" />
                                </div>
                                <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                  <Input :autofocusclick="true" 
                                  v-model:pass_value="bjson.limit_control_amt" 
                                  v-on:receiveChange="handleChangePurchaseLimit"
                                  :dbComponentBehavior="dbComponentBehavior.input_number"/>
                                </div>
                            </div>
                        </div>  

                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                          <div class="row" style="align-items: center;">
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                <Label :pass_value="'Active'" />
                            </div>
                            <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                <Checkbox
                                :btm_padding="true"
                                size="xs"
                                :disable="false"
                                v-model="bjson.set_active"
                                v-on:receiveChangenewVal="handleChange"/>
                            </div>
                          </div>
                        </div>

                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                            <div class="row" style="align-items: center;">
                                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                    <Label :pass_value="'Is IBT'" />
                                </div>
                                <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                  <Checkbox
                                  :btm_padding="true"
                                  size="xs"
                                  :disable="false"
                                  v-model="bjson.is_ibt"
                                  v-on:receiveChangenewVal="handleChange"/>
                                </div>
                            </div>
                        </div>

                        <!-- <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                            <div class="row" style="align-items: center;">
                                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                    <Label :pass_value="'AR Customer'" />
                                </div>
                                <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                  <Input :autofocusclick="true" 
                                  v-model:pass_value="bjson.ar_customer" 
                                  v-on:receiveChange="handleChangePurchaseLimit"
                                  :dbComponentBehavior="dbComponentBehavior.number"/>
                                </div>
                            </div>
                        </div>

                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                            <div class="row" style="align-items: center;">
                                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                    <Label :pass_value="'AP Supplier'" />
                                </div>
                                <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                  <Input :autofocusclick="true" 
                                  v-model:pass_value="bjson.ar_supplier" 
                                  v-on:receiveChange="handleChangePurchaseLimit"
                                  :dbComponentBehavior="dbComponentBehavior.number"/>
                                </div>
                            </div>
                        </div> -->
                      </div>
                    </div>
                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <div class="row">
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                            <div class="row" style="align-items: center;">
                                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                    <Label :pass_value="'IS ICT'" />
                                </div>
                                <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                  <Checkbox
                                  :btm_padding="true"
                                  size="xs"
                                  :disable="false"
                                  v-model="bjson.isICT"
                                  v-on:receiveChangenewVal="handleChange"/>
                                </div>
                            </div>
                        </div>

                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                            <div class="row" style="align-items: center;">
                                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                    <Label :pass_value="'GST'" />
                                </div>
                                <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                  <Checkbox
                                  :btm_padding="true"
                                  size="xs"
                                  :disable="false"
                                  v-model="bjson.is_gst"
                                  v-on:receiveChangenewVal="handleChange"/>
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
      </q-card-section>

      <q-card-actions class="dialog_action" style="padding-bottom: 16px;padding-right:16px;padding-top:0px">
          <div v-if="page_function != 'view'" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-pt-md" align="right">
            <Button v-on:receiveClick="saveBranch"
            :pass_label="branch.action == 'edit' ? 'Edit' : 'Add'"
            :pass_no_caps="true"
            :pass_square="true"
            :pass_dense="true"
            class="custom_button"
            />
          </div>
      </q-card-actions>

      <q-inner-loading
          :showing="branch.loading"
          color="primary"
      />
    </q-card>
  </q-dialog>
</template>

<script>
import Chip from 'src/components/ERP/Base/Chip'
import ButtonMobile from 'src/components/ERP/Itemmaster/ButtonMobile'
import PurchaseTable from 'src/components/ERP/Purchase/PurchaseTable'
import SupplierItemListTable from 'src/components/ERP/Purchase/SupplierItemListTable'
import Button_icon from 'src/components/ERP/Base/Button_icon'
import { Notify } from "quasar";
import SelectFilter from 'src/components/ERP/Itemmaster/SelectFilter'
import Textarea from'src/components/ERP/Base/Textarea' ;
import Label from 'src/components/ERP/Main/Label';
import Input from 'src/components/ERP/Main/Input';
import LabelSelectVerticalGeneral from 'src/components/ERP/Main/LabelSelectVerticalGeneral';
import LabelInputVerticalGeneral from 'src/components/ERP/Main/LabelInputVerticalGeneral';
import Button from 'src/components/ERP/Main/Button';
import Select from 'src/components/ERP/Main/Select'
import Table from 'src/components/ERP/Table/Table.vue';
import Checkbox from 'src/components/ERP/Base/Checkbox'
import Datepicker from 'src/components/ERP/Main/Datepicker'

export default {
data() {
  return{
    scb_delv_freq_options: [],
    ori_payload: {},
    page_count: 1,
    disable_previous_button: false,
    disable_next_button: false,
    offset: 0,
    total_row: 0,
    showAddLoading: false,
    order_frequency_options: [],
    country_options: [],
    branch_options: [],
    consign_options: [
      {
        label: 'Outright',
        value: 0
      },
      {
        label: 'Consign',
        value: 1
      },
    ],
    branch: {
      dialog: false,
      loading: false,
      action: null,
    },
    ori_params: {},
    table_column: [],
    table_data: [],
    product_ori_params: {},
    product_table_column: [],
    product_table_data: {
        "data": {
            "count": 0,
            "next": null,
            "previous": null,
            "results": []
        }
    },
    rpm_ori_params: {},
    rpm_table_column: [],
    rpm_table_data: [],
    log_ori_params: {},
    log_table_column: [],
    log_table_data: {},
    ibt_ori_params: {},
    ibt_table_column: [],
    ibt_table_data: [],
    ibt_site_ori_params: {},
    ibt_site_table_column: [],
    ibt_site_table_data: [],
    forceLoading: false,
    productForceLoading: false,
    rpmForceLoading: false,
    logForceLoading: false,
    ibtForceLoading: false,
    ibtSiteForceLoading: false,
    visibleColumns: [],
    replenish_date_options: [
      {
        "label": "NA",
        "value": "NA"
      },
      {
        "label": "Single Date",
        "value": "Single Date"
      },
      {
        "label": "Date Range",
        "value": "Date Range"
      }
    ],
    promotion_date_options: [
      {
        "label": "By PO Delivery Date",
        "value": 0
      },
      {
        "label": "By PO Issuing Date",
        "value": 1
      },
    ],
    grn_baseon_pocost_options:[
      {
        "label": "Pay By Invoice",
        "value": "0"
      },
      {
        "label": "Pay By GRN",
        "value": "1"
      }
    ],
    auto_price_change_options:[
      {
        "label": "No Price Change",
        "value": "0"
      },
      {
        "label": "Auto Create Price Change @ GRN Date + 0",
        "value": "1"
      },
      {
        "label": "Auto Create Price Change @ GRN Date + 1",
        "value": "2"
      },
    ],
    stock_return_cost_type_options:[
      {
        "label": "Last Cost",
        "value": "LASTCOST"
      },
      {
        "label": "Listed Cost",
        "value": "STDCOST"
      },
    ],
    poprice_method_options:[
      {
        "label": "By Vendor Listed Cost",
        "value": "VLISTED"
      },
      {
        "label": "By Vendor Last Cost",
        "value": "VLAST"
      },
      {
        "label": "By Item Listed Cost",
        "value": "ILISTED"
      },
      {
        "label": "By Item Last Cost",
        "value": "ILAST"
      },
    ],
    type_options: [
      {
        "label": "Consign",
        "value": "Consign"
      },
      {
        "label": "Outright",
        "value": "Outright"
      }
    ],
    status2_options: [
      {
        "label": "Active",
        "value": 0
      },
      {
        "label": "Inactive",
        "value": 1
      }
    ],
    id_options: [
      {
        "label": "NRIC",
        "value": "NRIC"
      },
      {
        "label": "Passport",
        "value": "Passport"
      },
      {
        "label": "BRN",
        "value": "BRN"
      },
      {
        "label": "Army",
        "value": "Army"
      },
      {
        "label": "Gov",
        "value": "Gov"
      },
    ],
    currency_options2: [
      {
        "label": "Local",
        "value": "Local"
      },
      {
        "label": "Indent",
        "value": "Indent"
      },
      
    ],
    currency_options: [],
    cost_value: "By Weight",
    pending_wording: 'KIV',
    active_section: 'Supplier',
    active_section2: 'Basic',
    step: 1,
    done1: false,
    done2: false,
    done3: false,
    done4: false,
    done5: false,
    done6: false,
    redModel: false,
    tab: 'Information',
    receiving_methods: false,
    // pending_wording: 'KIV',
    json:{
      all_day: [true, true, true, true, true, true, true],
      // step: 1,
      Consign: '',
      Add1: '',
      Type:'',
      Name: '',
      Code: '',
      mobile: '',
      idtype: '',
      idvalue: '',
      Fax: '',
      Contact:'',
      email: '',
      Add2: '',
      Add3: '',
      Add4: '',
      Tel:'',
      City: '',
      State:'',
      Country: '',
      CreditLimit: '',
      reg_no: '',
      SSTRegNo: '',
      gst_start_date: '',
      gst_no: '',
      Postcode:'',
      poprice_method: '',
      promo_date: '',
      currency_code: '',
    },
    bjson: {
      set_active: false,
      // ar_customer: '',
      // ap_supplier: '',
      loc_group: '',
      is_ibt: false,
      isICT: false,
      is_gst: false,
      limit_control_amt: '0.00',
      scb_delv_freq: '',
    },
    language: sessionStorage.getItem("language") != "" && sessionStorage.getItem("language") != "null" && sessionStorage.getItem("language") != null ? sessionStorage.getItem("language") : [],
    session_outlet_guid: sessionStorage.getItem("session_outlet_guid") != "" && sessionStorage.getItem("session_outlet_guid") != "null" && sessionStorage.getItem("session_outlet_guid") != null ? sessionStorage.getItem("session_outlet_guid") : [],
    getuser: sessionStorage.getItem("getuser") != "" && sessionStorage.getItem("getuser") != "null" && sessionStorage.getItem("getuser") != null ? sessionStorage.getItem("getuser") : [],
    supcus_guid: null,
    scb_delv_freq_options: [],
    sup_rep_site_dialog: false,
    sup_rep_site_dialog_action: null,
    sup_rep_site_dialog_loading: false,
    all_day: [true, true, true, true, true, true, true],
    page_function: null,
  }
},
components:{
  // Chip,
  // ButtonMobile,
  Input,
  Select,
  Checkbox,
  // PurchaseTable,
  // SupplierItemListTable,
  Button_icon,
  // SelectFilter,
  // Radio,
  // SelectPlaceholder,
  Textarea,
  // SearchPopUp,
  Label,
  LabelSelectVerticalGeneral,
  LabelInputVerticalGeneral,
  Button,
  Table,
  Datepicker,
},
computed: {
  dbComponentBehavior() {
   return this.$store.getters['dbComponentBehavior/byLanguage']('erp')
  },
},
async mounted(){
  this.$nextTick(async ()=>{
    this.showAddLoading = true;

    this.country_options = await this.getCountry();
    this.branch_options = await this.getBranch();
    this.order_frequency_options = await this.getOrderFrequency('OD');
    this.currency_options = await this.getCurrencyOptions();
    this.scb_delv_freq_options = await this.getOrderFrequency('DV');
    // console.log(this.$route);
    var supcus_guid = this.$route.query.supcus_guid;

    if(supcus_guid)
    {
      if(this.$route.name == 'VendorCustomer')
      {
        this.page_function = 'view'
      }
      else
      {
        this.page_function = 'edit'
      }

        this.supcus_guid = supcus_guid;
        await this.trigger_search_supcus()
    }
    else
    {
        this.page_function = 'create'
        this.showAddLoading = false;
    }

    var offset = this.$route.query.offset;
    var total_row = this.$route.query.total_row;

    if(offset !== null && offset !== undefined && offset !== '' && total_row !== null && total_row !== undefined && total_row !== '')
    {
        this.offset = offset;
        this.total_row = total_row;
        this.disable_previous_button = offset <= '0' ? true : false;
        this.disable_next_button = offset >= total_row ? true : false;
    }

    var active_tab = JSON.parse(JSON.stringify(this.tab));
    
    await this.discoverTabs(active_tab, 'hide');

    this.showAddLoading = false;    
  })

},
methods:{
  handleShowCreateSupRepSite()
  {
    this.sup_rep_site_dialog = true;
  },
  handleEdit()
  {
    var offset = this.$route.query.offset;
    var total_row = this.$route.query.total_row;
    
    this.$router.push({
        name: "VendorCustomer",
        query: { supcus_guid: this.supcus_guid, offset: offset, total_row: total_row}
    });

  },
  handleAddVendor()
  {
    this.$router.push({ name: "VendorCustomer" });
    
    this.table_data = {
        "data": {
            "count": 0,
            "next": null,
            "previous": null,
            "results": []
        }
    };

    this.product_table_data = {
        "data": {
            "count": 0,
            "next": null,
            "previous": null,
            "results": []
        }
    };
    
    this.rpm_table_data = {
        "data": {
            "count": 0,
            "next": null,
            "previous": null,
            "results": []
        }
    };
    
    this.log_table_data = {
        "data": {
            "count": 0,
            "next": null,
            "previous": null,
            "results": []
        }
    };
    
    this.ibt_table_data = {
        "data": {
            "count": 0,
            "next": null,
            "previous": null,
            "results": []
        }
    };
    
    this.ibt_site_table_data = {
        "data": {
            "count": 0,
            "next": null,
            "previous": null,
            "results": []
        }
    };
    
  },

  handleChangePOPromotionDate(newVal)
  {
    this.json.promo_date = newVal
  },

  handleChangeTab(newVal)
  {
    if(newVal == 'Product List')
    {
      this.productForceLoading = true;
      this.product_table_function();
    }
  },
  handleChangeAllDay(newVal, index)
  {
    this.json.all_day[index] = newVal;
    const updatedAllDay = [...this.json.all_day];
    updatedAllDay[index] = newVal;

    const trueCount = updatedAllDay.filter(item => item === true).length;

    if (trueCount > this.json.stock_day) {
      this.json.all_day[index] = false;
      this.showNotify('negative', 'The number of selected days exceeds stock_day limit.');
    } else {
      this.json.all_day = updatedAllDay;
    }
  },
  handleChangeOrderFrequency(newVal)
  {
    this.json.sc_order_freq = newVal;
    var filter_stock_day = this.order_frequency_options.filter((entry)=>{
      return entry.value == newVal;
    })

    if(filter_stock_day.length == 1)
    {
      this.json.stock_day = filter_stock_day[0].freq_stock_day;
    }
    else
    {
      this.json.stock_day = '';
    }
    this.json.all_day = [false, false, false, false, false, false, false]
  },
  handleChangeCreditLimit(newVal)
  {
    this.json.CreditLimit = this.formatAmount(newVal, '$')
  },
  handleChangeEinvStartDate(newVal)
  {
    this.json.einv_start_date = newVal;
  },
  handleChangeGstStartDate(newVal)
  {
    this.json.gst_start_date = newVal;
  },
  handleChangeSstStartDate(newVal)
  {
    this.json.SSTEffectiveDate = newVal;
  },
  handleChangeConsign(newVal)
  {
    this.json.Consign = newVal;
  },
  handleChangeCountry(newVal)
  {
    this.json.Country = newVal;
  },
  handleChangeBranch(newVal)
  {
    this.bjson.loc_group = newVal;
  },
  async handlePagination(action)
    {   
        if(action == 'next')
        {
            var offset = Number(this.offset) + 1;
        }
        else if(action == 'previous')
        {
            var offset = Number(this.offset) - 1;
        }

        var payload = {
          pass_json: {
                "type": "C",
                "skip": offset,
                "limit": 1,
                "outlet_guid": this.session_outlet_guid,
                "language": this.language,
                "ordering": ' -Laststamp',
            }
        };

        await this.trigger_search_supcus(payload);

        this.offset = offset;
        this.disable_previous_button = this.offset <= '0' ? true : false;
        this.disable_next_button = this.offset >= this.total_row ? true : false;
    },
  async getCountry()
  {
    var payload = {
      "pass_json": {
        "outlet_guid": this.session_outlet_guid,
        "language": this.language,
        "limit": 9999999,
        "sort_by": "Printable_Name",
        "sort_type": "asc",
      },
    };


    var object_pass = {
      "dispatch": 'setup/trigger_post_get_country',
      "getter": 'setup/get_country',
      "app": this,
      "payload": payload,
    };

    var dispatch_response = await this.$dispatch(object_pass);
    var ary = [];

    if(dispatch_response.status){
      if(dispatch_response.response.detail && dispatch_response.response.detail.length > 0)
      {
        for(var i in dispatch_response.response.detail)
        {
          var new_row = dispatch_response.response.detail[i]
          var obj = {
            label: new_row.Printable_Name,
            value: new_row.CodeISO3,
          }

          ary.push(obj)
        }
      }
    }
    else
    {
      var error_message = 'Failed to get country. Please try again.';
      this.showNotify("negative", error_message);
    }

    return ary;
  },
  async getBranch()
  {
    var payload = {
      "pass_json": {
        "outlet_guid": this.session_outlet_guid,
        "language": this.language,
        "limit": 9999999,
        "sort_by": "BRANCH_CODE",
        "sort_type": "asc",
      },
    };


    var object_pass = {
      "dispatch": 'setup2_companyprofile/trigger_get_cp_set_branch',
      "getter": 'setup2_companyprofile/get_cp_set_branch',
      "app": this,
      "payload": payload,
    };

    var dispatch_response = await this.$dispatch(object_pass);
    var ary = [];

    if(dispatch_response.status){
      if(dispatch_response.response.detail && dispatch_response.response.detail.length > 0)
      {
        for(var i in dispatch_response.response.detail)
        {
          var new_row = dispatch_response.response.detail[i]
          var obj = {
            label: new_row.BRANCH_CODE + ' - ' + new_row.BRANCH_NAME,
            value: new_row.BRANCH_CODE,
            code: new_row.BRANCH_CODE,
            name: new_row.BRANCH_NAME
          }

          ary.push(obj)
        }
      }
      else
      {
        ary = [];
      }
    }
    else
    {
      var error_message = 'Failed to get branch. Please try again.';
      this.showNotify("negative", error_message);
    }

    return ary;
  },
  async getOrderFrequency(type)
  {
    var payload = {
      "pass_json": {
        "outlet_guid": this.session_outlet_guid,
        "language": this.language,
        "limit": 9999999,
        "sort_by": "freq_description",
        "sort_type": "asc",
        "freq_type": type
      },
    };

    var object_pass = {
      "dispatch": 'setup/trigger_post_get_set_rep_freq',
      "getter": 'setup/get_set_rep_freq',
      "app": this,
      "payload": payload,
    };

    var dispatch_response = await this.$dispatch(object_pass);
    var ary = [];

    if(dispatch_response.status){
      if(dispatch_response.response.detail && dispatch_response.response.detail.length > 0)
      {
        for(var i in dispatch_response.response.detail)
        {
          var new_row = dispatch_response.response.detail[i]
          var obj = {
            label: new_row.freq_description,
            value: new_row.freq_code,
            freq_stock_day: new_row.freq_stock_day
          }

          ary.push(obj)
        }
      }
      else
      {
        ary = [];
      }
    }
    else
    {
      var error_message = 'Failed to get order frequency. Please try again.';
      this.showNotify("negative", error_message);
    }

    return ary;
  },
  async saveBranch()
  {
    if(this.json.BillStatus == 1)
    {
        this.showNotify("negative","This Doc already posted.");
        return;
    }

    var validate = await this.validate_form("save_branch_form");

    if(!validate)
    {
        this.showNotify("negative","Please make sure all field is correct.");
        this.showAddLoading = false;
        return;
    }

    this.showAddLoading = true;
    this.branch.loading = true;

    var set_active = this.bjson.set_active;
    
    var loc_group = this.bjson.loc_group;
    var is_ibt = this.bjson.is_ibt;
    // var ar_customer = this.bjson.ar_customer;
    // var ar_supplier = this.bjson.ar_supplier;
    var isICT = this.bjson.isICT;
    var is_gst = this.bjson.is_gst;
    var limit_control_amt = this.unformatAmount(this.bjson.limit_control_amt);

    var payload = {
        pass_json: {
          updated_by: this.getuser,
          supcus_guid: this.supcus_guid,
          loc_group: loc_group,
          language: this.language,
          set_active: set_active,
          is_ibt: is_ibt, 
          // ar_customer: ar_customer, 
          // ar_supplier: ar_supplier, 
          isICT: isICT, 
          is_gst: is_gst, 
          limit_control_amt: limit_control_amt,
          scb_delv_freq: this.bjson.scb_delv_freq,
        }
    }

      var object_pass = {};

      if(this.branch.action == 'create')
      {
        payload.pass_json.created_by = this.getuser;

        object_pass = {
            "dispatch": 'setup/trigger_post_create_supcus_branch',  // endpoint hardcoded
            "getter": 'setup/get_supcus_branch_status',             // getter hardcoded 
            "app": this,
            "payload": payload,
        };
      }
      else if(this.branch.action == 'edit')
      {
        payload.pass_json.branch_guid = this.bjson.branch_guid;

        object_pass = {
          "dispatch": 'setup/trigger_post_update_supcus_branch',  // endpoint hardcoded
          "getter": 'setup/get_supcus_branch_status',             // getter hardcoded 
          "app": this,
          "payload": payload,
        };
      }

      var dispatch_response = await this.$dispatch(object_pass);

      if (dispatch_response.status) {
          // success condition
          var success_message = this.branch.action == 'create' ? 'Branch Created Successfully.' : 'Branch Edited Successfully.';
          this.showNotify("positive", success_message);
          this.table_function(this.ori_params);
          this.showAddLoading = false;
          this.branch.loading = false;
          this.branch.action = null;
          this.branch.dialog = false;
          this.bjson = {
            set_active: false,
            // ar_customer: '',
            // ap_supplier: '',
            loc_group: '',
            is_ibt: false,
            isICT: false,
            is_gst: false,
            limit_control_amt: '0.00'
          };
      } else {
        var error_message = 'Failed. Please try again.';

        var isValidJSON = this.isValidJSON(dispatch_response.response);

        if(isValidJSON)
        {
          var json_message = JSON.parse(dispatch_response.response);
          var error_message = json_message.detail ? json_message.detail : error_message;
        }
        else
        {
          var error_message = dispatch_response.response;
        }

        var show_error = "";

        show_error = error_message;

        this.showNotify('negative', show_error);
        this.showAddLoading = false;
        this.branch.loading = false;
      }
  },
  handleChangePurchaseLimit(newVal)
  {
    this.bjson.limit_control_amt = this.formatAmount(newVal, '$');
  },
  closeBranchDialog()
  {
    this.branch.dialog = false;
    this.branch.action = null;
    this.bjson = {
      set_active: false,
      // ar_customer: '',
      // ap_supplier: '',
      loc_group: '',
      is_ibt: false,
      isICT: false,
      is_gst: false,
      limit_control_amt: '0.00'
    };
  },
  handleShowCreateBranch()
  {
    this.branch.dialog = true;
    this.branch.action = 'create';
    console.log(this.bjson)
  },
  async handleEditBranch(row)
  {
    this.branch.dialog = true;
    this.branch.action = 'edit';
    this.branch.loading = true;
    console.log(row)

    var result = JSON.parse(JSON.stringify(row.row));
    this.branch.loading = false;
    result.isICT = result.isICT == 1;
    result.is_gst = result.is_gst == 1;
    result.is_ibt = result.is_ibt == 1;
    result.set_active = result.set_active == 1;
    result.limit_control_amt = this.formatAmount(result.limit_control_amt, '$')
    this.bjson = result;
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
  async table_function(ori_payload){

      this.forceLoading = true;

      var payload = ori_payload.params
      payload.skip = payload.offset;
      payload.limit = payload.limit;
      payload.outlet_guid = this.session_outlet_guid;//session
      payload.language = this.language;
      payload.Name = payload.Name;
      payload.supcus_guid = this.supcus_guid;

      if(payload.ordering == "")
      {
          payload.ordering = "-updated_at"
      }

      if(payload.ordering[0] == "-")
      {
          payload.sort_by = payload.ordering.slice(1);
          payload.sort_type = "Desc"
      }
      else
      {
          payload.sort_by = payload.ordering
          payload.sort_type = "Asc"
      }

      payload.language = this.language;
              
      var payload = {
          "pass_json": payload//pass_json should be the field or data wish to be created.
      };

      var object_pass = {
          "dispatch": 'setup/trigger_post_get_supcus_branch', //refer to path/function_name in store actions.js
          "getter": 'setup/get_supcus_branch', //refer to path/function_name in store getters.js
          "app": this, //compulsory passed variable
          "payload": payload //payload that needed to use in store actions.js
      };

      var dispatch_response = await this.$dispatch(object_pass);

      if(dispatch_response.status)
      {
          //success condition
          var results = dispatch_response.response.detail;
          if(results.length > 0)
          {
              for(var i in results)
              {
                results[i].number = Number(i) + 1;
                results[i].set_active = results[i].set_active == 1;
                results[i].is_ibt = results[i].is_ibt == 1;
                results[i].isICT = results[i].isICT == 1;
                results[i].is_gst = results[i].is_gst == 1;
                results[i].limit_control_amt = this.formatAmount(results[i].limit_control_amt,'$');
                results[i].PO_min_amt = this.formatAmount(results[i].PO_min_amt,'$');
                var matchingBranch = this.branch_options.find(branch => branch.value === results[i].loc_group);
                if (matchingBranch) {
                  results[i].site_name = matchingBranch.name;
                } else {
                  results[i].site_name = 'Unknown'; // Optional: Set a default value if no match is found
                }
              }
          }

          this.table_data =
          {
              "data": {
                  "count": dispatch_response.response.total_row,
                  "next": null,
                  "previous": null,
                  "results": results
              }
          };
      
      }else
      {
          //fail condition
          this.table_data = {
              "data": {
                  "count": 0,
                  "next": null,
                  "previous": null,
                  "results": []
              }
          };
      }

      // if(this.rearrange_column.length > 0)
      // {
      //     var table_column = this.rearrange_column;
      // }
      // else
      // {
          var table_column = [
              {
                  name: 'action',
                  required: true,
                  label: this.$language('D0028'),//'Actions'
                  align: 'center',
                  sortable: false,
                  field: 'action',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center; width: 1%;',
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
              },
              {
                  name: 'number',
                  required: true,
                  label: 'No',
                  align: 'right',
                  sortable: false,
                  field: 'number',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center; width: 1%;',
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
              },
              {
                  name: 'set_active',
                  required: true,
                  label: 'Active',
                  align: 'center',
                  sortable: false,
                  field: 'set_active',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center; width: 1%;',
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
              },
              {
                  name: 'loc_group',
                  required: true,
                  label: 'Site',
                  align: 'left',
                  sortable: true,
                  field: 'loc_group',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center; width: 2%;',
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
              },
              {
                  name: 'site_name',
                  required: true,
                  label: 'Name',
                  align: 'left',
                  sortable: false,
                  field: 'site_name',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center; width: 2%;',
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
              },
              {
                  name: 'block_po',
                  required: true,
                  label: 'Block PO',
                  align: 'center',
                  sortable: true,
                  field: 'block_po',
                  format_child: '',
                  tooltip: '',
                  headerStyle:'text-align: center; width: 1%;',
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
              },
              {
                  name: 'PO_min_amt',
                  required: true,
                  label: 'Minimum PO Amount',
                  align: 'right',
                  sortable: true,
                  field: 'PO_min_amt',
                  format_child: '',
                  tooltip: '',
                  headerStyle:'text-align: center; width: 1%;',
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
              },
              {
                  name: 'limit_control_amt',
                  required: true,
                  label: 'Monthly PO Limit',
                  align: 'right',
                  sortable: true,
                  field: 'limit_control_amt',
                  format_child: '',
                  tooltip: '',
                  headerStyle:'text-align: center; width: 1%;',
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
              },
              {
                  name: 'is_ibt',
                  required: true,
                  label: 'IBT',
                  align: 'center',
                  sortable: false,
                  field: 'is_ibt',
                  format_child: '',
                  tooltip: '',
                  headerStyle:'text-align: center; width: 1%;',
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
              },
              {
                  name: 'isICT',
                  required: true,
                  label: 'ICT',
                  align: 'center',
                  sortable: false,
                  field: 'isICT',
                  format_child: '',
                  tooltip: '',
                  headerStyle:'text-align: center; width: 1%;',
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
              },
              {
                  name: 'is_gst',
                  required: true,
                  label: 'GST',
                  align: 'center',
                  sortable: false,
                  field: 'is_gst',
                  format_child: '',
                  tooltip: '',
                  headerStyle:'text-align: center; width: 1%;',
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
              },
              {
                  name: 'credit_acc_code',
                  required: true,
                  label: 'AP Supplier',
                  align: 'left',
                  sortable: true,
                  field: 'credit_acc_code',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
              },
              {
                  name: 'debit_acc_code',
                  required: true,
                  label: 'AR Customer',
                  align: 'left',
                  sortable: true,
                  field: 'debit_acc_code',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
              },
              {
                  name: 'sc_delv_freq',
                  required: true,
                  label: 'Delivery Frequency',
                  align: 'left',
                  sortable: true,
                  field: 'sc_delv_freq',
                  format_child: '',
                  tooltip: '',
                  headerStyle:'text-align: center; width: 1%;',
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
              },
              {
                  name: 'created_at',
                  required: true,
                  label: 'Created On',
                  align: 'left',
                  sortable: true,
                  field: 'created_at',
                  format_child: '',
                  tooltip: '',
                  headerStyle:'text-align: center; width: 1%;',
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
              },
              {
                  name: 'created_by',
                  required: true,
                  label: 'Created By',
                  align: 'left',
                  sortable: true,
                  field: 'created_by',
                  format_child: '',
                  tooltip: '',
                  headerStyle:'text-align: center; width: 1%;',
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
              },
              {
                  name: 'updated_at',
                  required: true,
                  label: 'Updated On',
                  align: 'left',
                  sortable: true,
                  field: 'updated_at',
                  format_child: '',
                  tooltip: '',
                  headerStyle:'text-align: center; width: 1%;',
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
              },
              {
                  name: 'updated_by',
                  required: true,
                  label: 'Updated By',
                  align: 'left',
                  sortable: true,
                  field: 'updated_by',
                  format_child: '',
                  tooltip: '',
                  headerStyle:'text-align: center; width: 1%;',
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
              },
          ];

          if(this.page_function == 'create')
          {
              table_column = table_column.filter((entry)=>{
                  return entry.name != 'action'
              })
          }

      // }

      this.table_column = table_column;

      this.forceLoading = false;
  },
  rpmHandleTableChange: function(newVal)
  {
      var new_params = this.$pluginsTableParams(newVal)

      var payload = {
          params : new_params
      };

      this.rpm_ori_params = payload;

      this.rpm_table_function(payload);
  },
  async rpm_table_function(ori_payload){

      this.rpmForceLoading = true;

      var payload = ori_payload.params
      payload.skip = payload.offset;
      payload.limit = payload.limit;
      payload.outlet_guid = this.session_outlet_guid;//session
      payload.language = this.language;
      payload.Name = payload.Name;
      payload.supcus_guid = this.supcus_guid;

      if(payload.ordering == "")
      {
          payload.ordering = "-rs_sup_code"
      }

      if(payload.ordering[0] == "-")
      {
          payload.sort_by = payload.ordering.slice(1);
          payload.sort_type = "Desc"
      }
      else
      {
          payload.sort_by = payload.ordering
          payload.sort_type = "Asc"
      }

      payload.language = this.language;
              
      var payload = {
          "pass_json": payload//pass_json should be the field or data wish to be created.
      };

      var object_pass = {
          "dispatch": 'setup/trigger_post_get_sup_rep_site', //refer to path/function_name in store actions.js
          "getter": 'setup/get_sup_rep_site', //refer to path/function_name in store getters.js
          "app": this, //compulsory passed variable
          "payload": payload //payload that needed to use in store actions.js
      };

      var dispatch_response = await this.$dispatch(object_pass);

      if(dispatch_response.status)
      {
          //success condition
          var results = dispatch_response.response.detail;
          if(results.length > 0)
          {
              for(var i in results)
              {
                results[i].number = Number(i) + 1;
                // results[i].rs_manual_soq = results[i].rs_manual_soq == 1;
                // results[i].rs_manual_order = results[i].rs_manual_order == 1;
                // results[i].rs_ord_D1 = results[i].rs_ord_D1 == 1;
                // results[i].rs_ord_D2 = results[i].rs_ord_D2 == 1;
                // results[i].rs_ord_D3 = results[i].rs_ord_D3 == 1;
                // results[i].rs_ord_D4 = results[i].rs_ord_D4 == 1;
                // results[i].rs_ord_D5 = results[i].rs_ord_D5 == 1;
                // results[i].rs_ord_D6 = results[i].rs_ord_D6 == 1;
                // results[i].rs_ord_D7 = results[i].rs_ord_D7 == 1;
                // results[i].limit_control_amt = this.formatAmount(results[i].limit_control_amt,'$');
              }
          }

          this.rpm_table_data =
          {
              "data": {
                  "count": dispatch_response.response.total_row,
                  "next": null,
                  "previous": null,
                  "results": results
              }
          };
      
      }else
      {
          //fail condition
          this.rpm_table_data = {
              "data": {
                  "count": 0,
                  "next": null,
                  "previous": null,
                  "results": []
              }
          };
      }

      var table_column = [
          // {
          //     name: 'action',
          //     required: true,
          //     label: this.$language('D0028'),//'Actions'
          //     align: 'center',
          //     sortable: false,
          //     field: 'action',
          //     format_child: '',
          //     tooltip: '',
          //     headerStyle: 'text-align: center; width: 1%;',
          //     filter_type: 'input',
          //     filter_options: [],
          //     filter_value: '',
          // },
          {
              name: 'number',
              required: true,
              label: 'No',
              align: 'right',
              sortable: false,
              field: 'number',
              format_child: '',
              tooltip: '',
              headerStyle: 'text-align: center; width: 1%;',
              filter_type: 'input',
              filter_options: [],
              filter_value: '',
          },
          {
              name: 'rs_banner',
              required: true,
              label: 'Banner/Site',
              align: 'left',
              sortable: true,
              field: 'rs_banner',
              format_child: '',
              tooltip: '',
              headerStyle: 'text-align: center; width: 1%;',
              filter_type: 'input',
              filter_options: [],
              filter_value: '',
          },
          {
              name: 'rs_dept',
              required: true,
              label: 'Dept',
              align: 'left',
              sortable: true,
              field: 'rs_dept',
              format_child: '',
              tooltip: '',
              headerStyle: 'text-align: center; width: 1%;',
              filter_type: 'input',
              filter_options: [],
              filter_value: '',
          },
          {
              name: 'rs_subdept',
              required: true,
              label: 'Sub-Dept',
              align: 'left',
              sortable: true,
              field: 'rs_subdept',
              format_child: '',
              tooltip: '',
              headerStyle: 'text-align: center; width: 1%;',
              filter_type: 'input',
              filter_options: [],
              filter_value: '',
          },
          {
              name: 'rs_manual_soq',
              required: true,
              label: 'Manual SOQ',
              align: 'center',
              sortable: true,
              field: 'rs_manual_soq',
              format_child: '',
              tooltip: '',
              headerStyle: 'text-align: center; width: 1%;',
              filter_type: 'input',
              filter_options: [],
              filter_value: '',
          },
          {
              name: 'rs_manual_order',
              required: true,
              label: 'Manual Ordering',
              align: 'center',
              sortable: true,
              field: 'rs_manual_order',
              format_child: '',
              tooltip: '',
              headerStyle: 'text-align: center; width: 1%;',
              filter_type: 'input',
              filter_options: [],
              filter_value: '',
          },
          {
              name: 'rs_lead_time',
              required: true,
              label: 'Lead Time (Days)',
              align: 'right',
              sortable: true,
              field: 'rs_lead_time',
              format_child: '',
              tooltip: '',
              headerStyle: 'text-align: center; width: 1%;',
              filter_type: 'input',
              filter_options: [],
              filter_value: '',
          },
          
          {
              name: 'rs_order_freq',
              required: true,
              label: 'Order Frequency',
              align: 'left',
              sortable: true,
              field: 'rs_order_freq',
              format_child: '',
              tooltip: '',
              headerStyle: 'text-align: center; width: 1%;',
              filter_type: 'input',
              filter_options: [],
              filter_value: '',
          },
          {
              name: 'stock_day',
              required: true,
              label: 'Stock Day',
              align: 'left',
              sortable: true,
              field: 'stock_day',
              format_child: '',
              tooltip: '',
              headerStyle: 'text-align: center; width: 1%; color: red;',
              filter_type: 'input',
              filter_options: [],
              filter_value: '',
          },
          {
              name: 'rs_buffer_stock_day',
              required: true,
              label: 'Buffer Stock Day',
              align: 'right',
              sortable: true,
              field: 'rs_buffer_stock_day',
              format_child: '',
              tooltip: '',
              headerStyle: 'text-align: center; width: 1%;',
              filter_type: 'input',
              filter_options: [],
              filter_value: '',
          },
          {
              name: 'rs_min_day',
              required: true,
              label: 'Min Day',
              align: 'right',
              sortable: true,
              field: 'rs_min_day',
              format_child: '',
              tooltip: '',
              headerStyle: 'text-align: center; width: 1%;',
              filter_type: 'input',
              filter_options: [],
              filter_value: '',
          },
          {
              name: 'rs_max_day',
              required: true,
              label: 'Max Day',
              align: 'right',
              sortable: true,
              field: 'rs_max_day',
              format_child: '',
              tooltip: '',
              headerStyle: 'text-align: center; width: 1%;',
              filter_type: 'input',
              filter_options: [],
              filter_value: '',
          },
          {
              name: 'rs_ord_D1',
              required: true,
              label: 'Mon',
              align: 'center',
              sortable: true,
              field: 'rs_ord_D1',
              format_child: '',
              tooltip: '',
              headerStyle: 'text-align: center; width: 1%;',
              filter_type: 'input',
              filter_options: [],
              filter_value: '',
          },
          {
              name: 'rs_ord_D2',
              required: true,
              label: 'Tue',
              align: 'center',
              sortable: true,
              field: 'rs_ord_D2',
              format_child: '',
              tooltip: '',
              headerStyle: 'text-align: center; width: 1%;',
              filter_type: 'input',
              filter_options: [],
              filter_value: '',
          },
          {
              name: 'rs_ord_D3',
              required: true,
              label: 'Wed',
              align: 'center',
              sortable: true,
              field: 'rs_ord_D3',
              format_child: '',
              tooltip: '',
              headerStyle: 'text-align: center; width: 1%;',
              filter_type: 'input',
              filter_options: [],
              filter_value: '',
          },
          {
              name: 'rs_ord_D4',
              required: true,
              label: 'Thu',
              align: 'center',
              sortable: true,
              field: 'rs_ord_D4',
              format_child: '',
              tooltip: '',
              headerStyle: 'text-align: center; width: 1%;',
              filter_type: 'input',
              filter_options: [],
              filter_value: '',
          },
          {
              name: 'rs_ord_D5',
              required: true,
              label: 'Fri',
              align: 'center',
              sortable: true,
              field: 'rs_ord_D5',
              format_child: '',
              tooltip: '',
              headerStyle: 'text-align: center; width: 1%;',
              filter_type: 'input',
              filter_options: [],
              filter_value: '',
          },
          {
              name: 'rs_ord_D6',
              required: true,
              label: 'Sat',
              align: 'center',
              sortable: true,
              field: 'rs_ord_D6',
              format_child: '',
              tooltip: '',
              headerStyle: 'text-align: center; width: 1%;',
              filter_type: 'input',
              filter_options: [],
              filter_value: '',
          },
          {
              name: 'rs_ord_D7',
              required: true,
              label: 'Sun',
              align: 'center',
              sortable: true,
              field: 'rs_ord_D7',
              format_child: '',
              tooltip: '',
              headerStyle: 'text-align: center; width: 1%;',
              filter_type: 'input',
              filter_options: [],
              filter_value: '',
          },
          {
              name: 'rs_delv_freq',
              required: true,
              label: 'Delivery Frequency',
              align: 'left',
              sortable: true,
              field: 'rs_delv_freq',
              format_child: '',
              tooltip: '',
              headerStyle: 'text-align: center; width: 1%;',
              filter_type: 'input',
              filter_options: [],
              filter_value: '',
          },
          {
              name: 'rs_ft_buffer_day',
              required: true,
              label: 'Flow-through Buffer Day',
              align: 'right',
              sortable: true,
              field: 'rs_ft_buffer_day',
              format_child: '',
              tooltip: '',
              headerStyle: 'text-align: center; width: 1%;',
              filter_type: 'input',
              filter_options: [],
              filter_value: '',
          },
          // {
          //     name: 'created_at',
          //     required: true,
          //     label: 'Created On',
          //     align: 'left',
          //     sortable: true,
          //     field: 'created_at',
          //     format_child: '',
          //     tooltip: '',
          //     headerStyle: 'text-align: center; width: 1%; color: red;',
          //     filter_type: 'input',
          //     filter_options: [],
          //     filter_value: '',
          // },
          // {
          //     name: 'created_by',
          //     required: true,
          //     label: 'Created By',
          //     align: 'left',
          //     sortable: true,
          //     field: 'created_by',
          //     format_child: '',
          //     tooltip: '',
          //     headerStyle: 'text-align: center; width: 1%; color: red;',
          //     filter_type: 'input',
          //     filter_options: [],
          //     filter_value: '',
          // },
          // {
          //     name: 'updated_at',
          //     required: true,
          //     label: 'Updated On',
          //     align: 'left',
          //     sortable: true,
          //     field: 'updated_at',
          //     format_child: '',
          //     tooltip: '',
          //     headerStyle: 'text-align: center; width: 1%; color: red;',
          //     filter_type: 'input',
          //     filter_options: [],
          //     filter_value: '',
          // },
          // {
          //     name: 'updated_by',
          //     required: true,
          //     label: 'Updated By',
          //     align: 'left',
          //     sortable: true,
          //     field: 'updated_by',
          //     format_child: '',
          //     tooltip: '',
          //     headerStyle: 'text-align: center; width: 1%; color: red;',
          //     filter_type: 'input',
          //     filter_options: [],
          //     filter_value: '',
          // },
      ];

      if(this.page_function == 'create')
      {
        table_column = table_column.filter((entry)=>{
            return entry.name != 'action'
        })
      }

      this.rpm_table_column = table_column;

      this.rpmForceLoading = false;
  },
  logHandleTableChange: function(newVal)
  {
      var new_params = this.$pluginsTableParams(newVal)

      var payload = {
          params : new_params
      };

      this.log_ori_params = payload;

      this.log_table_function(payload);
  },

  async log_table_function(ori_payload){

this.logForceLoading = true;

var payload = ori_payload.params
payload.skip = payload.offset;
payload.limit = payload.limit;
payload.outlet_guid = this.session_outlet_guid;//session
payload.language = this.language;
payload.table_name = "backend.supcus";
payload.linkcode1 = this.json.Code;

if(payload.ordering == "")
{
    payload.ordering = "-created_at"
}

if(payload.ordering[0] == "-")
{
    payload.sort_by = payload.ordering.slice(1);
    payload.sort_type = "Desc"
}
else
{
    payload.sort_by = payload.ordering
    payload.sort_type = "Asc"
}

payload.language = this.language;
        
var payload = {
    "pass_json": payload//pass_json should be the field or data wish to be created.
};

var object_pass = {
    "dispatch": 'setup/trigger_post_get_log', //refer to path/function_name in store actions.js
    "getter": 'setup/get_log', //refer to path/function_name in store getters.js
    "app": this, //compulsory passed variable
    "payload": payload //payload that needed to use in store actions.js
};

var dispatch_response = await this.$dispatch(object_pass);

if(dispatch_response.status)
{
    //success condition
    var results = dispatch_response.response.detail;
    if(results.length > 0)
    {
        for(var i in results)
        {
          results[i].number = Number(i) + 1;
        }
    }

    this.log_table_data =
    {
        "data": {
            "count": dispatch_response.response.total_row,
            "next": null,
            "previous": null,
            "results": results
        }
    };

    if(this.page_function == 'create')
    {
      this.log_table_data = {
        "data": {
            "count": 0,
            "next": null,
            "previous": null,
            "results": []
        }
    };
    }

}else
{
    //fail condition
    this.log_table_data = {
        "data": {
            "count": 0,
            "next": null,
            "previous": null,
            "results": []
        }
    };
}

var table_column = [
    // {
    //     name: 'action',
    //     required: true,
    //     label: this.$language('D0028'),//'Actions'
    //     align: 'center',
    //     sortable: false,
    //     field: 'action',
    //     format_child: '',
    //     tooltip: '',
    //     headerStyle: 'text-align: center; width: 1%;',
    //     filter_type: 'input',
    //     filter_options: [],
    //     filter_value: '',
    // },
    {
        name: 'number',
        required: true,
        label: 'No',
        align: 'right',
        sortable: false,
        field: 'number',
        format_child: '',
        tooltip: '',
        headerStyle: 'text-align: center; width: 1%;',
        filter_type: 'input',
        filter_options: [],
        filter_value: '',
    },
    {
        name: 'logseq',
        required: true,
        label: 'Log Seq',
        align: 'right',
        sortable: true,
        field: 'logseq',
        format_child: '',
        tooltip: '',
        headerStyle: 'text-align: center; width: 1%;',
        filter_type: 'input',
        filter_options: [],
        filter_value: '',
    },
    {
        name: 'module_name',
        required: true,
        label: 'Module Name',
        align: 'left',
        sortable: true,
        field: 'module_name',
        format_child: '',
        tooltip: '',
        headerStyle: 'text-align: center; width: 1%;',
        filter_type: 'input',
        filter_options: [],
        filter_value: '',
    },
    {
        name: 'log_type',
        required: true,
        label: 'Type',
        align: 'left',
        sortable: true,
        field: 'log_type',
        format_child: '',
        tooltip: '',
        headerStyle: 'text-align: center; width: 1%;',
        filter_type: 'input',
        filter_options: [],
        filter_value: '',
    },
    {
        name: 'log_desc',
        required: true,
        label: 'Description',
        align: 'left',
        sortable: true,
        field: 'log_desc',
        format_child: '',
        tooltip: '',
        headerStyle: 'text-align: center; width: 1%;',
        filter_type: 'input',
        filter_options: [],
        filter_value: '',
    },
    {
        name: 'linkcode1',
        required: true,
        label: 'Linkcode1',
        align: 'left',
        sortable: true,
        field: 'linkcode1',
        format_child: '',
        tooltip: '',
        headerStyle: 'text-align: center; width: 1%;',
        filter_type: 'input',
        filter_options: [],
        filter_value: '',
    },
    {
        name: 'linkcode2',
        required: true,
        label: 'Linkcode2',
        align: 'left',
        sortable: true,
        field: 'linkcode2',
        format_child: '',
        tooltip: '',
        headerStyle: 'text-align: center; width: 1%;',
        filter_type: 'input',
        filter_options: [],
        filter_value: '',
    },
    {
        name: 'cross_refno',
        required: true,
        label: 'Cross RefNo',
        align: 'left',
        sortable: true,
        field: 'cross_refno',
        format_child: '',
        tooltip: '',
        headerStyle: 'text-align: center; width: 1%;',
        filter_type: 'input',
        filter_options: [],
        filter_value: '',
    },
    {
        name: 'created_at',
        required: true,
        label: 'Created On',
        align: 'left',
        sortable: true,
        field: 'created_at',
        format_child: '',
        tooltip: '',
        headerStyle: 'text-align: center; width: 1%;',
        filter_type: 'input',
        filter_options: [],
        filter_value: '',
    },
    {
        name: 'created_by',
        required: true,
        label: 'Created By',
        align: 'left',
        sortable: true,
        field: 'created_by',
        format_child: '',
        tooltip: '',
        headerStyle: 'text-align: center; width: 1%;',
        filter_type: 'input',
        filter_options: [],
        filter_value: '',
    },
    {
        name: 'updated_at',
        required: true,
        label: 'Updated On',
        align: 'left',
        sortable: true,
        field: 'updated_at',
        format_child: '',
        tooltip: '',
        headerStyle: 'text-align: center; width: 1%;',
        filter_type: 'input',
        filter_options: [],
        filter_value: '',
    },
    {
        name: 'updated_by',
        required: true,
        label: 'Updated By',
        align: 'left',
        sortable: true,
        field: 'updated_by',
        format_child: '',
        tooltip: '',
        headerStyle: 'text-align: center; width: 1%;',
        filter_type: 'input',
        filter_options: [],
        filter_value: '',
    },
];

if(this.page_function == 'create')
{
  table_column = table_column.filter((entry)=>{
      return entry.name != 'action'
  })
}

this.log_table_column = table_column;

this.logForceLoading = false;
},

  ibtHandleTableChange: function(newVal)
  {
      var new_params = this.$pluginsTableParams(newVal)

      var payload = {
          params : new_params
      };

      this.ibt_ori_params = payload;

      this.ibt_table_function(payload);
  },
  async ibt_table_function(ori_payload){

      this.ibtSiteForceLoading = true;

      var payload = ori_payload.params
      payload.skip = payload.offset;
      payload.limit = payload.limit;
      payload.outlet_guid = this.session_outlet_guid;//session
      payload.language = this.language;
      payload.Name = payload.Name;
      payload.supcus_guid = this.supcus_guid;

      if(payload.ordering == "")
      {
          payload.ordering = "-sibt_dc_code"
      }

      if(payload.ordering[0] == "-")
      {
          payload.sort_by = payload.ordering.slice(1);
          payload.sort_type = "Desc"
      }
      else
      {
          payload.sort_by = payload.ordering
          payload.sort_type = "Asc"
      }

      payload.language = this.language;
              
      var payload = {
          "pass_json": payload//pass_json should be the field or data wish to be created.
      };

      var object_pass = {
          "dispatch": 'setup/trigger_post_get_sup_ibt', //refer to path/function_name in store actions.js
          "getter": 'setup/get_sup_ibt', //refer to path/function_name in store getters.js
          "app": this, //compulsory passed variable
          "payload": payload //payload that needed to use in store actions.js
      };

      var dispatch_response = await this.$dispatch(object_pass);

      if(dispatch_response.status)
      {
          //success condition
          var results = dispatch_response.response.detail;
          if(results.length > 0)
          {
              for(var i in results)
              {
                results[i].sibt_rep_type = results[i].sibt_rep_type == 0 ? 'NA' : results[i].sibt_rep_type == 1 ? 'Conventional' : results[i].sibt_rep_type == 1 ? 'Flowthrough' : '';
              }
          }

          this.ibt_table_data =
          {
              "data": {
                  "count": dispatch_response.response.total_row,
                  "next": null,
                  "previous": null,
                  "results": results
              }
          };
      
      }else
      {
          //fail condition
          this.ibt_table_data = {
              "data": {
                  "count": 0,
                  "next": null,
                  "previous": null,
                  "results": []
              }
          };
      }

      var table_column = [
          // {
          //     name: 'action',
          //     required: true,
          //     label: this.$language('D0028'),//'Actions'
          //     align: 'center',
          //     sortable: false,
          //     field: 'action',
          //     format_child: '',
          //     tooltip: '',
          //     headerStyle: 'text-align: center; width: 1%;',
          //     filter_type: 'input',
          //     filter_options: [],
          //     filter_value: '',
          // },
          {
              name: 'sibt_dc_code',
              required: true,
              label: 'Site',
              align: 'left',
              sortable: true,
              field: 'sibt_dc_code',
              format_child: '',
              tooltip: '',
              headerStyle: 'text-align: center; width: 1%;',
              filter_type: 'input',
              filter_options: [],
              filter_value: '',
          },
          {
              name: 'sibt_rep_type',
              required: true,
              label: 'Type',
              align: 'left',
              sortable: true,
              field: 'sibt_rep_type',
              format_child: '',
              tooltip: '',
              headerStyle: 'text-align: center; width: 1%;',
              filter_type: 'input',
              filter_options: [],
              filter_value: '',
          },
          {
              name: 'sibt_sup_code',
              required: true,
              label: 'Supplier',
              align: 'left',
              sortable: true,
              field: 'sibt_sup_code',
              format_child: '',
              tooltip: '',
              headerStyle: 'text-align: center; width: 1%;',
              filter_type: 'input',
              filter_options: [],
              filter_value: '',
          },
          {
              name: 'sibt_dept',
              required: true,
              label: 'Department',
              align: 'left',
              sortable: true,
              field: 'sibt_dept',
              format_child: '',
              tooltip: '',
              headerStyle: 'text-align: center; width: 1%;',
              filter_type: 'input',
              filter_options: [],
              filter_value: '',
          },
          {
              name: 'sibt_subdept',
              required: true,
              label: 'Sub-Department',
              align: 'left',
              sortable: true,
              field: 'sibt_subdept',
              format_child: '',
              tooltip: '',
              headerStyle: 'text-align: center; width: 1%;',
              filter_type: 'input',
              filter_options: [],
              filter_value: '',
          },
      ];

      if(this.page_function == 'create')
      {
        table_column = table_column.filter((entry)=>{
            return entry.name != 'action'
        })
      }

      this.ibt_table_column = table_column;

      this.ibtForceLoading = false;
  },
  ibtSiteHandleTableChange: function(newVal)
  {
      var new_params = this.$pluginsTableParams(newVal)

      var payload = {
          params : new_params
      };

      this.ibt_site_ori_params = payload;

      this.ibt_site_table_function(payload);
  },
  async ibt_site_table_function(ori_payload){

      this.ibtSiteForceLoading = true;

      var payload = ori_payload.params
      payload.skip = payload.offset;
      payload.limit = payload.limit;
      payload.outlet_guid = this.session_outlet_guid;//session
      payload.language = this.language;
      payload.Name = payload.Name;
      payload.supcus_guid = this.supcus_guid;

      if(payload.ordering == "")
      {
          payload.ordering = "-sibt_site_dc_code"
      }

      if(payload.ordering[0] == "-")
      {
          payload.sort_by = payload.ordering.slice(1);
          payload.sort_type = "Desc"
      }
      else
      {
          payload.sort_by = payload.ordering
          payload.sort_type = "Asc"
      }

      payload.language = this.language;
              
      var payload = {
          "pass_json": payload//pass_json should be the field or data wish to be created.
      };

      var object_pass = {
          "dispatch": 'setup/trigger_post_get_sup_ibt_site', //refer to path/function_name in store actions.js
          "getter": 'setup/get_sup_ibt_site', //refer to path/function_name in store getters.js
          "app": this, //compulsory passed variable
          "payload": payload //payload that needed to use in store actions.js
      };

      var dispatch_response = await this.$dispatch(object_pass);

      if(dispatch_response.status)
      {
          //success condition
          var results = dispatch_response.response.detail;

          if(results.length > 0)
          {
              for(var i in results)
              {
                results[i].sibt_site_rep_type = results[i].sibt_site_rep_type == 0 ? 'NA' : results[i].sibt_site_rep_type == 1 ? 'Conventional' : results[i].sibt_site_rep_type == 1 ? 'Flowthrough' : '';
              }
          }

          this.ibt_site_table_data =
          {
              "data": {
                  "count": dispatch_response.response.total_row,
                  "next": null,
                  "previous": null,
                  "results": results
              }
          };
      
      }else
      {
          //fail condition
          this.ibt_site_table_data = {
              "data": {
                  "count": 0,
                  "next": null,
                  "previous": null,
                  "results": []
              }
          };
      }

      var table_column = [
          // {
          //     name: 'action',
          //     required: true,
          //     label: this.$language('D0028'),//'Actions'
          //     align: 'center',
          //     sortable: false,
          //     field: 'action',
          //     format_child: '',
          //     tooltip: '',
          //     headerStyle: 'text-align: center; width: 1%;',
          //     filter_type: 'input',
          //     filter_options: [],
          //     filter_value: '',
          // },
          {
              name: 'sibt_site_banner',
              required: true,
              label: 'Banner',
              align: 'left',
              sortable: true,
              field: 'sibt_site_banner',
              format_child: '',
              tooltip: '',
              headerStyle: 'text-align: center; width: 1%;',
              filter_type: 'input',
              filter_options: [],
              filter_value: '',
          },
          {
              name: 'sibt_site_dc_code',
              required: true,
              label: 'Site',
              align: 'left',
              sortable: true,
              field: 'sibt_site_dc_code',
              format_child: '',
              tooltip: '',
              headerStyle: 'text-align: center; width: 1%;',
              filter_type: 'input',
              filter_options: [],
              filter_value: '',
          },
          {
              name: 'sibt_site_rep_type',
              required: true,
              label: 'Type',
              align: 'left',
              sortable: true,
              field: 'sibt_site_rep_type',
              format_child: '',
              tooltip: '',
              headerStyle: 'text-align: center; width: 1%;',
              filter_type: 'input',
              filter_options: [],
              filter_value: '',
          },
          {
              name: 'sibt_site_sup_code',
              required: true,
              label: 'Supplier',
              align: 'left',
              sortable: true,
              field: 'sibt_site_sup_code',
              format_child: '',
              tooltip: '',
              headerStyle: 'text-align: center; width: 1%;',
              filter_type: 'input',
              filter_options: [],
              filter_value: '',
          },
          {
              name: 'sibt_site_dept',
              required: true,
              label: 'Department',
              align: 'left',
              sortable: true,
              field: 'sibt_site_dept',
              format_child: '',
              tooltip: '',
              headerStyle: 'text-align: center; width: 1%;',
              filter_type: 'input',
              filter_options: [],
              filter_value: '',
          },
          {
              name: 'sibt_site_subdept',
              required: true,
              label: 'Sub-Department',
              align: 'left',
              sortable: true,
              field: 'sibt_site_subdept',
              format_child: '',
              tooltip: '',
              headerStyle: 'text-align: center; width: 1%;',
              filter_type: 'input',
              filter_options: [],
              filter_value: '',
          },
      ];

      if(this.page_function == 'create')
      {
        table_column = table_column.filter((entry)=>{
            return entry.name != 'action'
        })
      }

      this.ibt_site_table_column = table_column;

      this.ibtSiteForceLoading = false;
  },
  productHandleTableChange: function(newVal)
  {
      var new_params = this.$pluginsTableParams(newVal)

      var payload = {
          params : new_params
      };

      this.product_ori_params = payload;

      this.product_table_function(payload);
  },
  async product_table_function(ori_payload){
    this.productForceLoading = true;

    // var payload = ori_payload.params
    var payload = {};
    payload.skip = '0';
    payload.limit = '1000';
    payload.outlet_guid = this.session_outlet_guid;//session
    payload.language = this.language;
    payload.Name = payload.Name;
    payload.supcus_guid = this.supcus_guid;

    if(payload.ordering == "")
    {
        payload.ordering = "Updated_at"
    }

    // if(payload.ordering[0] == "-")
    // {
    //     payload.sort_by = payload.ordering.slice(1);
    //     payload.sort_type = "Desc"
    // }
    // else
    // {
    //     payload.sort_by = payload.ordering
    //     payload.sort_type = "Asc"
    // }
            
    var payload = {
        "pass_json": payload//pass_json should be the field or data wish to be created.
    };

    var object_pass = {
        "dispatch": 'setup/trigger_post_get_itemmastersupcode', //refer to path/function_name in store actions.js
        "getter": 'setup/get_itemmastersupcode', //refer to path/function_name in store getters.js
        "app": this, //compulsory passed variable
        "payload": payload //payload that needed to use in store actions.js
    };

    var dispatch_response = await this.$dispatch(object_pass);
    console.log(dispatch_response)

    // this.product_table_data = [
    //   {
    //     unit: {
    //       no: '1',
    //       priority: 'Priority',
    //       type: 'Type',
    //       code: 'A001',
    //       name: '23456789 223456789 323456789 423456789 523456789 623456789',
    //       currency: 'RM',
    //       ordering_uom: 'Unit/Case',
    //       uom: 'Unit',
    //       cost: '0',
    //       disc1: '0',
    //       disc2: '0',
    //       listed_cost: '0',
    //       min_order_qty: '0',
    //       order_lot_size: '0',
    //       external_code: '0',
    //       rsp_inc_tax: '0',
    //       rsp_exc_tax: '0',
    //       dept_code: 'dept_code',
    //       dept_desc: 'dept_desc',
    //       subdept_code: 'subdept_code',
    //       subdept_desc: 'subdept_desc',
    //       cat_code: 'cat_code',
    //       cat_desc: 'cat_desc',
    //       updated_at: '2024-08-29 10:00:00',
    //       updated_by: 'test user',
    //       created_at: '2024-08-29 10:00:00',
    //       created_by: 'test user',
    //       effective_date: '2024-08-30',
    //       uom2: 'Unit/Case',
    //       expected_cost: '0',
    //       disc12: '0',
    //       disc22: '0',
    //       listed_cost2: '0',
    //     },
    //     case: {
    //       block_order: true,
    //       non_returnable: true,
    //       ordering_uom: '1',
    //       uom: 'Unit',
    //       cost: '0',
    //       disc1: '0',
    //       disc2: '0',
    //       listed_cost: '0',
    //       min_order_qty: '0',
    //       order_lot_size: '0',
    //       uom2: '1',
    //       expected_cost: '0',
    //       disc12: '0',
    //       disc22: '0',
    //       listed_cost2: '0',
    //     }
    //   },
    //   {
    //     unit: {
    //       no: '2',
    //       priority: 'Priority',
    //       type: 'Type',
    //       code: 'A002',
    //       name: 'Test Supplier 2',
    //       currency: 'RM',
    //       ordering_uom: 'Unit/Case',
    //       uom: 'Unit',
    //       cost: '0',
    //       disc1: '0',
    //       disc2: '0',
    //       listed_cost: '0',
    //       min_order_qty: '0',
    //       order_lot_size: '0',
    //       external_code: '0',
    //       rsp_inc_tax: '0',
    //       rsp_exc_tax: '0',
    //       dept_code: 'dept_code',
    //       dept_desc: 'dept_desc',
    //       subdept_code: 'subdept_code',
    //       subdept_desc: 'subdept_desc',
    //       cat_code: 'cat_code',
    //       cat_desc: 'cat_desc',
    //       updated_at: '2024-08-29 10:00:00',
    //       updated_by: 'test user',
    //       created_at: '2024-08-29 10:00:00',
    //       created_by: 'test user',
    //       effective_date: '2024-08-30',
    //       uom2: 'Unit/Case',
    //       expected_cost: '0',
    //       disc12: '0',
    //       disc22: '0',
    //       listed_cost2: '0',
    //     },
    //     case: {
    //       block_order: true,
    //       non_returnable: true,
    //       ordering_uom: '12',
    //       uom: 'Unit',
    //       cost: '0',
    //       disc1: '0',
    //       disc2: '0',
    //       listed_cost: '0',
    //       min_order_qty: '0',
    //       order_lot_size: '0',
    //       uom2: '1',
    //       expected_cost: '0',
    //       disc12: '0',
    //       disc22: '0',
    //       listed_cost2: '0',
    //     }
    //   },
    // ]
    
    if(dispatch_response.status)
    {
        //success condition
        var results = dispatch_response.response.detail;
        if(results.length > 0)
        {
            for(var i in results)
            {
              results[i].block_order = results[i].block_order == 1;
              results[i].none_return = results[i].none_return == 1;

              results[i].unit = {
                no: Number(i) + 1,
                priority: 'Priority',
                type: 'Type',
                Itemcode: results[i].Itemcode,
                ITEM_DESC: results[i].ITEM_DESC,
                imsc_currency_code: results[i].imsc_currency_code,
                order_uom: results[i].order_uom == 0 ? 'Unit' : 'Case', 
                uom: 'Unit',
                cost: '0',
                Disc1Value: this.formatAmount(results[i].Disc1Value, '$'),
                Disc2Value: this.formatAmount(results[i].Disc2Value, '$'),
                listed_cost: '0',
                min_order_unit: this.formatAmount(results[i].min_order_unit, 'qty'),
                OrderLotSize: this.formatAmount(results[i].OrderLotSize, '$'),
                external_code: '0',
                SupRSPAfterTax: this.formatAmount(results[i].SupRSPAfterTax, '$'),
                SupRSPBeforeTax: this.formatAmount(results[i].SupRSPBeforeTax, '$'),
                dept_code: results[i].itemmaster && results[i].itemmaster.Dept ? results[i].itemmaster.Dept : ' - ',
                dept_desc: 'dept_desc',
                subdept_code: results[i].itemmaster && results[i].itemmaster.SubDept ? results[i].itemmaster.SubDept : ' - ',
                subdept_desc: 'subdept_desc',
                cat_code: results[i].itemmaster && results[i].itemmaster.Category ? results[i].itemmaster.Category : ' - ',
                cat_desc: 'cat_desc',
                Updated_at: results[i].Updated_at,
                Updated_by: results[i].Updated_by,
                Created_at: results[i].Created_at,
                Created_by: results[i].Created_by,
                effective_date: '2024-08-30',
                uom2: 'Unit/Case',
                expected_cost: '0',
                disc12: '0',
                disc22: '0',
                listed_cost2: '0',
              };
              results[i].case = {
                block_order: results[i].block_order,
                none_return: results[i].none_return,
                order_uom: '1', 
                uom_case: 'Unit',
                cost: '0',
                disc1value_case: this.formatAmount(results[i].disc1value_case, '$'),
                disc2value_case: this.formatAmount(results[i].disc2value_case, '$'),
                listed_cost: '0',
                min_order_case: this.formatAmount(results[i].min_order_case, 'qty'),
                orderlot_case: this.formatAmount(results[i].orderlot_case, '$'),
                uom2: '1',
                expected_cost: '0',
                disc12: '0',
                disc22: '0',
                listed_cost2: '0',
              };
            }
        }
        
        this.product_table_data =
        {
            "data": {
                "count": dispatch_response.response.total_row,
                "next": null,
                "previous": null,
                "results": results
            }
        };

    }else
    {
        //fail condition
        this.product_table_data = {
            "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
            }
        };
    }

    var table_column = [
        // {
        //     name: 'action',
        //     required: true,
        //     label: this.$language('D0028'),//'Actions'
        //     align: 'center',
        //     sortable: false,
        //     field: 'action',
        //     format_child: '',
        //     tooltip: '',
        //     headerStyle: 'text-align: center; width: 1%;',
        //     filter_type: 'input',
        //     filter_options: [],
        //     filter_value: '',
        // },
        {
            name: 'block_order',
            required: true,
            label: 'Block Order',
            align: 'left',
            sortable: false,
            field: 'block_order',
            format_child: '',
            tooltip: '',
            headerStyle: 'text-align: center; width: 1%;',
            filter_type: 'input',
            filter_options: [],
            filter_value: '',
        },
        {
            name: 'none_return',
            required: true,
            label: 'None Returnable',
            align: 'left',
            sortable: false,
            field: 'none_return',
            format_child: '',
            tooltip: '',
            headerStyle: 'text-align: center; width: 1%;',
            filter_type: 'input',
            filter_options: [],
            filter_value: '',
        },
        {
            name: 'priority_vendor',
            required: true,
            label: 'Priority',
            align: 'left',
            sortable: true,
            field: 'priority_vendor',
            format_child: '',
            tooltip: '',
            headerStyle: 'text-align: center; width: 1%;',
            filter_type: 'input',
            filter_options: [],
            filter_value: '',
        },
        {
            name: 'item_type',
            required: true,
            label: 'Item Type',
            align: 'left',
            sortable: true,
            field: 'item_type',
            format_child: '',
            tooltip: '',
            headerStyle: 'text-align: center; width: 1%;',
            filter_type: 'input',
            filter_options: [],
            filter_value: '',
        },
        {
            name: 'Itemcode',
            required: true,
            label: 'Item Code',
            align: 'left',
            sortable: true,
            field: 'Itemcode',
            format_child: '',
            tooltip: '',
            headerStyle: 'text-align: center; width: 1%;',
            filter_type: 'input',
            filter_options: [],
            filter_value: '',
        },
        {
            name: 'ITEM_DESC',
            required: true,
            label: 'Description',
            align: 'left',
            sortable: true,
            field: 'ITEM_DESC',
            format_child: '',
            tooltip: '',
            headerStyle: 'text-align: center; width: 1%;',
            filter_type: 'input',
            filter_options: [],
            filter_value: '',
        },
        {
            name: 'supplier_item_code',
            required: true,
            label: 'Supplier Item Code',
            align: 'left',
            sortable: true,
            field: 'supplier_item_code',
            format_child: '',
            tooltip: '',
            headerStyle: 'text-align: center; width: 1%;',
            filter_type: 'input',
            filter_options: [],
            filter_value: '',
        },
        {
            name: 'listed_cost',
            required: true,
            label: 'Listed Cost',
            align: 'left',
            sortable: true,
            field: 'listed_cost',
            format_child: '',
            tooltip: '',
            headerStyle: 'text-align: center; width: 1%;',
            filter_type: 'input',
            filter_options: [],
            filter_value: '',
        },
        {
            name: 'percentage',
            required: true,
            label: '',
            align: 'left',
            sortable: true,
            field: 'percentage',
            format_child: '',
            tooltip: '',
            headerStyle: 'text-align: center; width: 1%;',
            filter_type: 'input',
            filter_options: [],
            filter_value: '',
        },
        {
            name: 'discount_1',
            required: true,
            label: 'Discount 1',
            align: 'left',
            sortable: true,
            field: 'discount_1',
            format_child: '',
            tooltip: '',
            headerStyle: 'text-align: center; width: 1%;',
            filter_type: 'input',
            filter_options: [],
            filter_value: '',
        },
        {
            name: 'percentage',
            required: true,
            label: '',
            align: 'left',
            sortable: true,
            field: 'percentage',
            format_child: '',
            tooltip: '',
            headerStyle: 'text-align: center; width: 1%;',
            filter_type: 'input',
            filter_options: [],
            filter_value: '',
        },
        {
            name: 'discount_2',
            required: true,
            label: 'Discount 2',
            align: 'left',
            sortable: true,
            field: 'discount_2',
            format_child: '',
            tooltip: '',
            headerStyle: 'text-align: center; width: 1%;',
            filter_type: 'input',
            filter_options: [],
            filter_value: '',
        },
        {
            name: 'percentage',
            required: true,
            label: '',
            align: 'left',
            sortable: true,
            field: 'percentage',
            format_child: '',
            tooltip: '',
            headerStyle: 'text-align: center; width: 1%;',
            filter_type: 'input',
            filter_options: [],
            filter_value: '',
        },
        {
            name: 'net_cost',
            required: true,
            label: 'Net Cost',
            align: 'left',
            sortable: true,
            field: 'net_cost',
            format_child: '',
            tooltip: '',
            headerStyle: 'text-align: center; width: 1%;',
            filter_type: 'input',
            filter_options: [],
            filter_value: '',
        },
        {
            name: 'carton_price',
            required: true,
            label: 'Carton Price',
            align: 'left',
            sortable: true,
            field: 'carton_price',
            format_child: '',
            tooltip: '',
            headerStyle: 'text-align: center; width: 1%;',
            filter_type: 'input',
            filter_options: [],
            filter_value: '',
        },
        {
            name: 'last_cost',
            required: true,
            label: 'Last Cost',
            align: 'left',
            sortable: true,
            field: 'last_cost',
            format_child: '',
            tooltip: '',
            headerStyle: 'text-align: center; width: 1%;',
            filter_type: 'input',
            filter_options: [],
            filter_value: '',
        },
        {
            name: 'carton_qty',
            required: true,
            label: 'Carton Qty',
            align: 'left',
            sortable: true,
            field: 'carton_qty',
            format_child: '',
            tooltip: '',
            headerStyle: 'text-align: center; width: 1%;',
            filter_type: 'input',
            filter_options: [],
            filter_value: '',
        },
        {
            name: 'rsp_after_tax',
            required: true,
            label: 'RSP After Tax',
            align: 'left',
            sortable: true,
            field: 'rsp_after_tax',
            format_child: '',
            tooltip: '',
            headerStyle: 'text-align: center; width: 1%;',
            filter_type: 'input',
            filter_options: [],
            filter_value: '',
        },
        {
            name: 'rsp_before_tax',
            required: true,
            label: 'RSP Before Tax',
            align: 'left',
            sortable: true,
            field: 'rsp_before_tax',
            format_child: '',
            tooltip: '',
            headerStyle: 'text-align: center; width: 1%;',
            filter_type: 'input',
            filter_options: [],
            filter_value: '',
        },
        {
            name: 'dept_code',
            required: true,
            label: 'Dept Code',
            align: 'left',
            sortable: false,
            field: 'dept_code',
            format_child: '',
            tooltip: '',
            headerStyle: 'text-align: center; width: 1%;',
            filter_type: 'input',
            filter_options: [],
            filter_value: '',
        },
        {
            name: 'dept_name',
            required: true,
            label: 'Dept Name',
            align: 'left',
            sortable: true,
            field: 'dept_name',
            format_child: '',
            tooltip: '',
            headerStyle: 'text-align: center; width: 1%;',
            filter_type: 'input',
            filter_options: [],
            filter_value: '',
        },
        {
            name: 'subdept_code',
            required: true,
            label: 'Sub-Dept Code',
            align: 'left',
            sortable: false,
            field: 'subdept_code',
            format_child: '',
            tooltip: '',
            headerStyle: 'text-align: center; width: 1%;',
            filter_type: 'input',
            filter_options: [],
            filter_value: '',
        },
        {
            name: 'subdept_name',
            required: true,
            label: 'Sub-Dept Name',
            align: 'left',
            sortable: true,
            field: 'subdept_name',
            format_child: '',
            tooltip: '',
            headerStyle: 'text-align: center; width: 1%;',
            filter_type: 'input',
            filter_options: [],
            filter_value: '',
        },
        {
            name: 'category_code',
            required: true,
            label: 'Category Code',
            align: 'left',
            sortable: false,
            field: 'category_code',
            format_child: '',
            tooltip: '',
            headerStyle: 'text-align: center; width: 1%;',
            filter_type: 'input',
            filter_options: [],
            filter_value: '',
        },
        {
            name: 'category_name',
            required: true,
            label: 'Category Name',
            align: 'left',
            sortable: true,
            field: 'category_name',
            format_child: '',
            tooltip: '',
            headerStyle: 'text-align: center; width: 1%;',
            filter_type: 'input',
            filter_options: [],
            filter_value: '',
        },
        {
            name: 'Created_at',
            required: true,
            label: 'Created at',
            align: 'left',
            sortable: true,
            field: 'Created_at',
            format_child: '',
            tooltip: '',
            headerStyle:'text-align: center; width: 1%;',
            filter_type: 'input',
            filter_options: [],
            filter_value: '',
        },
        {
            name: 'Created_by',
            required: true,
            label: 'Created by',
            align: 'left',
            sortable: true,
            field: 'Created_by',
            format_child: '',
            tooltip: '',
            headerStyle:'text-align: center; width: 1%;',
            filter_type: 'input',
            filter_options: [],
            filter_value: '',
        },
        {
            name: 'Updated_at',
            required: true,
            label: 'Updated at',
            align: 'left',
            sortable: true,
            field: 'Updated_at',
            format_child: '',
            tooltip: '',
            headerStyle:'text-align: center; width: 1%;',
            filter_type: 'input',
            filter_options: [],
            filter_value: '',
        },
        {
            name: 'Updated_by',
            required: true,
            label: 'Updated by',
            align: 'left',
            sortable: true,
            field: 'Updated_by',
            format_child: '',
            tooltip: '',
            headerStyle:'text-align: center; width: 1%;',
            filter_type: 'input',
            filter_options: [],
            filter_value: '',
        },
    ];

    if(this.page_function == 'create')
    {
        table_column = table_column.filter((entry)=>{
            return entry.name != 'action'
        })
    }

    this.product_table_column = table_column;
    this.productForceLoading = false;
  },
  async getCurrencyOptions()
  {
      var payload = {
          "pass_json":{}
      }

      var object_pass = {
          "dispatch": 'setup2_currency/trigger_get_currency_read_currency',
          "getter": 'setup2_currency/get_currency_read_currency',
          "app": this,
          "payload": payload,
      };

      var dispatch_response= await this.$dispatch(object_pass);
      var status = dispatch_response.status

      var ary = [];
      if(status){
          if(dispatch_response.response.detail.length > 0)
          {
              for(var i in dispatch_response.response.detail)
              {
                  var each_row = dispatch_response.response.detail[i]
                  var obj = {
                      label: each_row.currency_desc,
                      value: each_row.currency_code
                  }

                  ary.push(obj)
              }
          }
          else
          {
              ary = [];
          }
      }
      else
      {
          ary = [];
      }

      return ary
  },
  async discoverTabs(active_tab = null, hide_loading = null) {
    // traverse the tabs to discover its content
    var tabNames = ["Information","Status by Site","Configuration","Product List" ,"Replenishment","IBT/ICT"];

    let traversal = tabNames.reduce((promiseChain, item) => {
        return promiseChain.then(() => new Promise(resolve => {
            // console.log("done with", item)
            resolve()
          //   console.log(item);
            this.$refs.tabs.goTo(item)
            })
        )
    }, Promise.resolve())

    traversal.then(() => {
      // console.log("done")
      if(active_tab == null)
      {
        this.$refs.tabs.goTo(tabNames[0])
      }
      else
      {
        this.$refs.tabs.goTo(active_tab)
      }

      if(hide_loading == 'hide')
      {
        this.loading = false;
      }

    })

    return true;
  },
  handleStepClick(newVal)
  {
    if(newVal == 4)
    {
      this.productForceLoading = true;
      this.product_table_function();
    }

    this.$nextTick(()=>{
      if(this.step == '1')
      {
        this.tab = 'Information';
      }
      if(this.step == '2')
      {
        this.tab = 'Status by Site';
      }
      if(this.step == '3')
      {
        this.tab = 'Configuration'
      }
      if(this.step == '4')
      {
        this.tab = 'Product List'
      }
      if(this.step == '5')
      {
        this.tab = 'Replenishment'
        this.active_section = 'Supplier';
      }
      if(this.step == '6')
      {
        this.tab = 'IBT/ICT'
        this.active_section = 'Basic';
      }
    });
    
  },
  handleActiveClickSection(section)
  {
    this.active_section = section;
  },
  handleActiveClickSection2(section)
  {
    this.active_section2 = section;
  },
  handleActiveClickSection3(section)
  {
    this.active_section3 = section;
  },
  handleActiveClickSection4(section)
  {
    this.active_section4 = section;
  },
  handleActiveClickSection5(section)
  {
    this.active_section5 = section;
  },
  handleActiveClickSection6(section)
  {
    this.active_section6 = section;
  },
  handleActiveClickSection7(section)
  {
    this.active_section7 = section;
  },
  handleActiveClickSection8(section)
  {
    this.active_section8 = section;
  },
  handleChange(newVal){
   // console.log('newVal',newVal);
   // console.log('colour',this.color_options);
  },
  async handlePagination(action)
    {   
        if(action == 'next')
        {
            var offset = Number(this.offset) + 1;
        }
        else if(action == 'previous')
        {
            var offset = Number(this.offset) - 1;
        }

        var payload = {
          pass_json: {
                "type": "C",
                "skip": offset,
                "limit": 1,
                "outlet_guid": this.session_outlet_guid,
                "language": this.language,
                "ordering": ' -Laststamp',
            }
        };

        await this.trigger_search_supcus(payload);

        this.offset = offset;
        this.disable_previous_button = this.offset <= '0' ? true : false;
        this.disable_next_button = this.offset >= this.total_row ? true : false;
    },
    async trigger_search_supcus(){
    var payload = {
      "pass_json": {
        "type": "C",
        "value": "",
        "language": this.language,
        "supcus_guid": this.supcus_guid, 
        "branch": this.branch_list,      
        "outlet_guid": this.session_outlet_guid, 

      },
    };

    var object_pass = {
      "dispatch": 'setup/trigger_post_read_supcus_all',
      "getter": 'setup/get_read_supcus_all',
      "app": this,
      "payload": payload,
    };

    var dispatch_response_supcus_vendor = await this.$dispatch(object_pass);
    // console.log('dispatch_response_supcus_vendor', dispatch_response_supcus_vendor);

    if(dispatch_response_supcus_vendor.status){
      
      // console.log(this.$route);
      var supcus_guid = this.$route.query.supcus_guid;
      // var query_params = thjis.l

      var filter = dispatch_response_supcus_vendor.response.detail.filter((entry)=>{
        return entry.supcus_guid == supcus_guid
      });

      console.log(filter[0])
      this.json.Name = filter[0].Name,
      this.json.Code = filter[0].Code,
      this.json.Mobile = filter[0].Mobile,
      this.json.Tel = filter[0].Tel,
      this.json.Fax = filter[0].Fax,
      this.json.Contact = filter[0].Contact,
      this.json.supcusGroup = filter[0].supcusGroup,
      this.json.email = filter[0].email,
      this.json.Add1 = filter[0].Add1,
      this.json.Add2 = filter[0].Add2, 
      this.json.Add3 = filter[0].Add3,
      this.json.Add4 = filter[0].Add4,
      this.json.City = filter[0].City,
      this.json.Country = filter[0].Country,
      this.json.State = filter[0].State,
      this.json.Postcode = filter[0].Postcode,
      this.json.CreditLimit = filter[0].CreditLimit,
      this.json.gst_no = filter[0].gst_no,
      this.json.gst_start_date = filter[0].gst_start_date,
      this.json.SSTRegNo = filter[0].SSTRegNo,        
      this.json.reg_no = filter[0].reg_no
      this.json.Remark = filter[0].Remark
      this.json.poprice_method = filter[0].poprice_method;
      this.json.poso_line_max = filter[0].poso_line_max;
      this.json.pur_expiry_days = filter[0].pur_expiry_days;
      this.json.AutoClosePO = filter[0].AutoClosePO;
      this.json.mobile_po = filter[0].mobile_po;
      this.json.po_negative_qty = filter[0].po_negative_qty;
      this.json.grn_allow_negative_margin = filter[0].grn_allow_negative_margin;
      this.json.SSTEffectiveDate = filter[0].SSTEffectiveDate;
      this.json.Rec_Method_1 = filter[0].Rec_Method_1;
      this.json.Rec_Method_2 = filter[0].Rec_Method_2;
      this.json.Rec_Method_3 = filter[0].Rec_Method_3;
      this.json.auto_grn_mobile_po = filter[0].auto_grn_mobile_po;
      this.json.stock_returnable = filter[0].stock_returnable;
      this.json.b2b_registration = filter[0].b2b_registration;
      this.json.stock_return_cost_type = filter[0].stock_return_cost_type;
      this.json.Consign = filter[0].Consign;
      this.json.grpo_variance_qty = filter[0].grpo_variance_qty;
      this.json.grpo_variance_price = filter[0].grpo_variance_price;
      this.json.auto_price_change = filter[0].auto_price_change;
      this.json.sc_auto_soq = filter[0].sc_auto_soq == 1;
      this.json.sc_auto_order = filter[0].sc_auto_order == 1;
      this.json.sc_order_freq = filter[0].sc_order_freq;
      this.handleChangeOrderFrequency(this.json.sc_order_freq);
      this.json.sc_buffer_stock_day = filter[0].sc_buffer_stock_day;
      this.json.stockday_min = filter[0].stockday_min;
      this.json.stockday_max = filter[0].stockday_max;

      this.json.exclude_orderqty_control = filter[0].exclude_orderqty_control;
      this.json.AccountCode = filter[0].AccountCode;
      this.json.AccPCredit = filter[0].AccPCredit;

      this.json.Term = filter[0].Term;
      this.json.CalDueDateby = filter[0].CalDueDateby;
      this.json.tax_code = filter[0].tax_code;
      this.json.SSTDefaultCode = filter[0].SSTDefaultCode;

      this.json.reg_no = filter[0].reg_no;
      this.json.name_reg = filter[0].name_reg;

      this.json.grn_baseon_pocost = filter[0].grn_baseon_pocost;

      this.json.promo_date = filter[0].promo_date;

      this.json.replenish_date = filter[0].replenish_date;

      this.json.idtype = filter[0].idtype
      this.json.idvalue = filter[0].idvalue
      this.json.tin = filter[0].tin
      this.json.msic_code = filter[0].msic_code
      this.json.einv_start_date = filter[0].einv_start_date
      this.json.currency_code = filter[0].currency_code
      this.json.created_by = 'waiting backend add in';
      this.json.created_at = 'waiting backend add in';
      this.json.updated_by = 'waiting backend add in';
      this.json.updated_at = 'waiting backend add in';
      // this.json.Name = dispatch_response_supcus_vendor.response.detail[0].Name,
      // this.json.Code = dispatch_response_supcus_vendor.response.detail[0].Code,
      // this.json.Mobile = dispatch_response_supcus_vendor.response.detail[3].Mobile,
      // this.json.Tel = dispatch_response_supcus_vendor.response.detail[0].Tel,
      // this.json.Fax = dispatch_response_supcus_vendor.response.detail[0].Fax,
      // this.json.Contact = dispatch_response_supcus_vendor.response.detail[0].Contact,
      
      // this.json.email = dispatch_response_supcus_vendor.response.detail[0].email,
      // this.json.Add1 = dispatch_response_supcus_vendor.response.detail[0].Add1,
      // this.json.Add2 = dispatch_response_supcus_vendor.response.detail[0].Add2, 
      // this.json.Add3 = dispatch_response_supcus_vendor.response.detail[3].Add3,
      // this.json.Add4 = dispatch_response_supcus_vendor.response.detail[0].Add4,
      // this.json.City = dispatch_response_supcus_vendor.response.detail[0].City,
      // this.json.Country = dispatch_response_supcus_vendor.response.detail[0].Country,
      // this.json.State = dispatch_response_supcus_vendor.response.detail[0].State,
      // this.json.Postcode = dispatch_response_supcus_vendor.response.detail[0].Postcode,
      // this.json.CreditLimit = dispatch_response_supcus_vendor.response.detail[0].CreditLimit,
      // this.json.gst_no = dispatch_response_supcus_vendor.response.detail[0].gst_no,
      // this.json.gst_start_date = dispatch_response_supcus_vendor.response.detail[0].gst_start_date,
      // this.json.SSTRegNo = dispatch_response_supcus_vendor.response.detail[0].SSTRegNo,        
      // this.json.reg_no = dispatch_response_supcus_vendor.response.detail[0].reg_no

    }

  },

  back(){        
        this.$router.push("VendorMasterCustomer");
    },

    async handleCreateVendor(){
      if(this.json.BillStatus == 1)
      {
          this.showNotify("negative","This Doc already posted.");
          return;
      }

      this.showAddLoading = true;
      // var validate = await this.validate_form("save_form");
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

      if (this.$route.query.supcus_guid) {
      // Existing vendor: Call saveVendor (update)
      await this.saveVendor();
      } else {
          // New vendor: Call createVendor (create)
          await this.createVendor();
      }
    },

    async createVendor() {
      var sc_created_by = this.getuser
      var sc_updated_by = this.getuser
      var sc_auto_soq = this.json.sc_auto_soq ? 1 : 0
      var sc_auto_order = this.json.sc_auto_order ? 1 : 0
      var sc_order_freq = this.json.sc_order_freq
      var stock_day = this.json.stock_day
      var sc_buffer_stock_day = this.json.sc_buffer_stock_day
      var Consign = this.json.Consign
      var AccountCode = this.json.AccountCode
      var Code = this.json.Code
      var id_no = this.json.id_no
      var idvalue = this.json.idvalue
      var reg_no = this.json.reg_no
      var AccPCredit = this.json.AccPCredit
      var tin = this.json.tin
      var currency_code = this.json.currency_code
      var currency2 = this.json.currency2
      var Name = this.json.Name
      var msic_code = this.json.msic_code
      var supcusGroup = this.json.supcusGroup
      var name_reg = this.json.name_reg
      var einv_start_date = this.json.einv_start_date
      var Block = this.json.Block
      var Add1 = this.json.Add1
      var Postcode = this.json.Postcode
      var Tel = this.json.Tel
      var Term = this.json.Term
      var gst_no = this.json.gst_no
      var SSTRegNo = this.json.SSTRegNo
      var Add2 = this.json.Add2
      var City = this.json.City
      var Fax = this.json.Fax
      var CalDueDateby = this.json.CalDueDateby
      var tax_code = this.json.tax_code
      var SSTDefaultCode = this.json.SSTDefaultCode
      var Add3 = this.json.Add3
      var State = this.json.State
      var Mobile = this.json.Mobile
      var CreditLimit = this.unformatAmount(this.json.CreditLimit)
      var gst_start_date = this.json.gst_start_date
      var SSTEffectiveDate = this.json.SSTEffectiveDate
      var Add4 = this.json.Add4
      var Country = this.json.Country
      var email = this.json.email
      var grn_baseon_pocost = this.json.grn_baseon_pocost
      var Remark = this.json.Remark
      var poprice_method = this.json.poprice_method
      var AutoClosePO = this.json.AutoClosePO
      var Rec_Method_1 = this.json.Rec_Method_1
      var grpo_variance_qty = this.json.grpo_variance_qty
      var auto_price_change = this.json.auto_price_change
      var promotion_date = this.json.promotion_date
      var mobile_po = this.json.mobile_po
      var Rec_Method_2 = this.json.Rec_Method_2
      var grpo_variance_price = this.json.grpo_variance_price
      var poso_line_max = this.json.poso_line_max
      var po_negative_qty = this.json.po_negative_qty
      var Rec_Method_3 = this.json.Rec_Method_3
      var stock_returnable = this.json.stock_returnable
      var stock_return_cost_type = this.json.stock_return_cost_type
      var pur_expiry_days = this.json.pur_expiry_days
      var grn_allow_negative_margin = this.json.grn_allow_negative_margin
      var auto_grn_mobile_po = this.json.auto_grn_mobile_po
      var b2b_registration = this.json.b2b_registration
      var stockday_min = this.json.stockday_min
      var stockday_max = this.json.stockday_max
      var lead_time = this.json.lead_time
      var ads_parameter = this.json.ads_parameter
      var exclude_orderqty_control = this.json.exclude_orderqty_control

      var payload = {
          pass_json: {
              Type: 'C',
              sc_created_by: sc_created_by,
              sc_updated_by: sc_updated_by,
              sc_auto_soq: sc_auto_soq,
              sc_auto_order: sc_auto_order,
              sc_order_freq: sc_order_freq,
              stock_day: stock_day,
              sc_buffer_stock_day: sc_buffer_stock_day,
              Consign: Consign,
              // created_on: created_on, //no_need_pass
              // updated_on: updated_on, //no_need_pass
              currency2: currency2,//no_pass
              Block: Block,
              SSTEffectiveDate: SSTEffectiveDate,
              id_no: id_no,
              idvalue: idvalue,
              reg_no: reg_no,
              tin: tin,
              msic_code: msic_code,
              name_reg: name_reg,
              einv_start_date: einv_start_date,
              grn_baseon_pocost: grn_baseon_pocost,
              promotion_date: promotion_date, //no_pass
              lead_time: lead_time, //no_pass
              ads_parameter: ads_parameter, //no_pass
              AccountCode: AccountCode,
              Code: Code,
              AccPCredit: AccPCredit,
              currency_code: currency_code,
              Name: Name,
              supcusGroup: supcusGroup,
              Add1: Add1,
              Postcode: Postcode,
              Tel: Tel,
              Term: Term,
              gst_no: gst_no,
              SSTRegNo: SSTRegNo,
              Add2: Add2,
              City: City,
              Fax: Fax,
              CalDueDateby: CalDueDateby,
              tax_code: tax_code,
              SSTDefaultCode: SSTDefaultCode,
              Add3: Add3,
              State: State,
              Mobile: Mobile,
              CreditLimit: CreditLimit,
              gst_start_date: gst_start_date,
              Add4: Add4,
              Country: Country,
              email: email,
              Remark: Remark,
              poprice_method: poprice_method,
              AutoClosePO: AutoClosePO,
              Rec_Method_1: Rec_Method_1,
              grpo_variance_qty: grpo_variance_qty,
              auto_price_change: auto_price_change,
              mobile_po: mobile_po,
              Rec_Method_2: Rec_Method_2,
              grpo_variance_price: grpo_variance_price,
              poso_line_max: poso_line_max,
              po_negative_qty: po_negative_qty,
              Rec_Method_3: Rec_Method_3,
              stock_returnable: stock_returnable,
              stock_return_cost_type: stock_return_cost_type,
              pur_expiry_days: pur_expiry_days,
              grn_allow_negative_margin: grn_allow_negative_margin,
              auto_grn_mobile_po: auto_grn_mobile_po,
              b2b_registration: b2b_registration,
              stockday_min: stockday_min,
              stockday_max: stockday_max,
              exclude_orderqty_control: exclude_orderqty_control,
          }
      }

      console.log('create_vendor_payload', payload);

      var object_pass = {
          "dispatch": 'setup/trigger_post_create_supcus',  // endpoint hardcoded
          "getter": 'setup/get_new_supcus',             // getter hardcoded 
          "app": this,
          "payload": payload,
      };

      var dispatch_response = await this.$dispatch(object_pass);
      console.log('create_dispatch_response', dispatch_response);

      if (dispatch_response.status) {
          // success condition
          this.showAddLoading = false;
          this.showNotify("positive", "Vendor Created Successfully.");
          this.$router.push({ name: 'VendorMaster' });
      } else {
          // fail condition
          var error_response = dispatch_response.detail;
          this.showNotify('negative', JSON.stringify(error_response));
          this.showAddLoading = false;
      }
    },

    async saveVendor(){
      var sc_updated_by = this.getuser
      var sc_auto_soq = this.json.sc_auto_soq ? 1 : 0
      var sc_auto_order = this.json.sc_auto_order ? 1 : 0
      var sc_order_freq = this.json.sc_order_freq
      var stock_day = this.json.stock_day
      var sc_buffer_stock_day = this.json.sc_buffer_stock_day
      var Consign = this.json.Consign
      var AccountCode = this.json.AccountCode
      var Code = this.json.Code
      var id_no = this.json.id_no
      var idvalue = this.json.idvalue
      var reg_no = this.json.reg_no
      var AccPCredit = this.json.AccPCredit
      var tin = this.json.tin
      var currency_code = this.json.currency_code
      var currency2 = this.json.currency2
      var Name = this.json.Name
      var msic_code = this.json.msic_code
      var supcusGroup = this.json.supcusGroup
      var name_reg = this.json.name_reg
      var einv_start_date = this.json.einv_start_date
      var Block = this.json.Block
      var Add1 = this.json.Add1
      var Postcode = this.json.Postcode
      var Tel = this.json.Tel
      var Term = this.json.Term
      var gst_no = this.json.gst_no
      var SSTRegNo = this.json.SSTRegNo
      var Add2 = this.json.Add2
      var City = this.json.City
      var Fax = this.json.Fax
      var CalDueDateby = this.json.CalDueDateby
      var tax_code = this.json.tax_code
      var SSTDefaultCode = this.json.SSTDefaultCode
      var Add3 = this.json.Add3
      var State = this.json.State
      var Mobile = this.json.Mobile
      var CreditLimit = this.unformatAmount(this.json.CreditLimit)
      var gst_start_date = this.json.gst_start_date
      var SSTEffectiveDate = this.json.SSTEffectiveDate
      var Add4 = this.json.Add4
      var Country = this.json.Country
      var email = this.json.email
      var grn_baseon_pocost = this.json.grn_baseon_pocost
      var Remark = this.json.Remark
      var poprice_method = this.json.poprice_method
      var AutoClosePO = this.json.AutoClosePO
      var Rec_Method_1 = this.json.Rec_Method_1
      var grpo_variance_qty = this.json.grpo_variance_qty
      var auto_price_change = this.json.auto_price_change
      var promotion_date = this.json.promotion_date
      var mobile_po = this.json.mobile_po
      var Rec_Method_2 = this.json.Rec_Method_2
      var grpo_variance_price = this.json.grpo_variance_price
      var poso_line_max = this.json.poso_line_max
      var po_negative_qty = this.json.po_negative_qty
      var Rec_Method_3 = this.json.Rec_Method_3
      var stock_returnable = this.json.stock_returnable
      var stock_return_cost_type = this.json.stock_return_cost_type
      var pur_expiry_days = this.json.pur_expiry_days
      var grn_allow_negative_margin = this.json.grn_allow_negative_margin
      var auto_grn_mobile_po = this.json.auto_grn_mobile_po
      var b2b_registration = this.json.b2b_registration
      var stockday_min = this.json.stockday_min
      var stockday_max = this.json.stockday_max
      var lead_time = this.json.lead_time
      var ads_parameter = this.json.ads_parameter
      var exclude_orderqty_control = this.json.exclude_orderqty_control

      var payload = {
          pass_json: {
              Type: 'C',
              // created_on: created_on, //no_need_pass
              // created_by: created_by, //no_need_pass
              // updated_on: updated_on, //no_need_pass
              sc_updated_by: sc_updated_by, //no_pass
              sc_auto_soq: sc_auto_soq,
              sc_auto_order: sc_auto_order,
              sc_order_freq: sc_order_freq,
              stock_day: stock_day,
              sc_buffer_stock_day: sc_buffer_stock_day,
              Consign: Consign,
              currency2: currency2,//no_pass
              Block: Block,
              SSTEffectiveDate: SSTEffectiveDate,
              id_no: id_no, //no_pass
              idvalue: idvalue,
              reg_no: reg_no, 
              tin: tin, //no_pass
              msic_code: msic_code, //no_pass
              name_reg: name_reg,
              einv_start_date: einv_start_date, //no_pass
              grn_baseon_pocost: grn_baseon_pocost,
              promotion_date: promotion_date, //no_pass
              lead_time: lead_time, //no_pass
              ads_parameter: ads_parameter, //no_pass
              AccountCode: AccountCode,
              Code: Code,
              AccPCredit: AccPCredit,
              currency_code: currency_code,
              Name: Name, 
              supcusGroup: supcusGroup, 
              Add1: Add1,
              Postcode: Postcode,
              Tel: Tel,
              Term: Term,
              gst_no: gst_no,
              SSTRegNo: SSTRegNo,
              Add2: Add2,
              City: City,
              Fax: Fax,
              CalDueDateby: CalDueDateby,
              tax_code: tax_code,
              SSTDefaultCode: SSTDefaultCode,
              Add3: Add3,
              State: State,
              Mobile: Mobile,
              CreditLimit: CreditLimit,
              gst_start_date: gst_start_date,
              Add4: Add4,
              Country: Country,
              email: email,
              Remark: Remark,
              poprice_method: poprice_method,
              AutoClosePO: AutoClosePO,
              Rec_Method_1: Rec_Method_1,
              grpo_variance_qty: grpo_variance_qty,
              auto_price_change: auto_price_change,
              mobile_po: mobile_po,
              Rec_Method_2: Rec_Method_2,
              grpo_variance_price: grpo_variance_price,
              poso_line_max: poso_line_max,
              po_negative_qty: po_negative_qty,
              Rec_Method_3: Rec_Method_3,
              stock_returnable: stock_returnable,
              stock_return_cost_type: stock_return_cost_type,
              pur_expiry_days: pur_expiry_days,
              grn_allow_negative_margin: grn_allow_negative_margin, 
              auto_grn_mobile_po: auto_grn_mobile_po,
              b2b_registration: b2b_registration,
              stockday_min: stockday_min,
              stockday_max: stockday_max,
              exclude_orderqty_control: exclude_orderqty_control,
          }
      }

    console.log('this.pass_json',this.payload);
    var object_pass = {
      "dispatch": 'setup/trigger_post_update_edit_supcus',
      "getter": 'setup/get_update_supcus',
      "app": this,
      "payload": payload,
    };

    var dispatch_response = await this.$dispatch(object_pass);
    console.log('dispatch_response', dispatch_response);
    if(dispatch_response.status)
      {
          //success condition
          this.showAddLoading = false;
          console.log(this.ori_payload)
          this.trigger_search_supcus(this.ori_payload);
          this.showNotify("positive", "Update Successfully.");
          
      }else
      {
          //fail condition
          var error_response = dispatch_response.detail;
              var show_error = "";
              this.showNotify('negative', JSON.stringify(error_response));

              this.showAddLoading = false;
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

    formatAmount(value, type)
    {
        if(type == "$")
        {
            var value = Number(value).toFixed(2);
            if(value == 'NaN')
            {
            value = '0.00'
            }
        }
        else if(type == "%")
        {
            var value = Number(value).toFixed(1);
            if(value == 'NaN')
            {
            value = '0.0'
            }
        }
        else if(type == "qty")
        {
            var value = Number(value).toFixed(0);
            if(value == 'NaN')
            {
            value = '0'
            }
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
        // var number = numberPart.replace(thousands, ",") + (decimalPart ? "." + decimalPart : "");

        return numberPart.replace(thousands, ",") + (decimalPart ? "." + decimalPart : "");
    },

    unformatAmount(value,type)
      {
        console.log(value);
        if(value !== null && value !== 'null' && value !== '')
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
        }
        else
        {
          return value;
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
          console.log('enter');
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
}
}
</script>

<style scoped>

.top_right_button
{
    text-align: right;
    padding-top: 5px;
}

.hide_section
{
  display: none;
}

.custom_button
{
font-size: 14px;
background-color: #273655;
color: white;
margin-left: 5px;
}

.step-content{
padding-left: 10px;
padding-right: 10px
}
.unknown_field
{
color: red;
}

.hide_section
{
display: none;
}

.q-textarea >>>.q-field__control {
min-height: 81px !important;

}

.rem_size >>> .q-field__inner, .rem_size >>> .q-field__inner > .q-field__control {
height: 56px !important;
}
.no-scroll {
overflow: hidden;
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
padding: 10px !important;
}

* >>> .BarcodeTable > .q-table__container > .q-table__middle > .q-table > tbody > tr > td
{
padding: 5px !important;
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
display:flex;
}



* >>> .custom_step > .q-stepper__tab > .q-stepper__label > .q-stepper__title
{
font-size: 12px;
width:100%
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
overflow: hidden;
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
padding: 11px; 
border-radius: 8px;
background: #FFF !important;
box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
height: 43px;
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
padding-bottom: 16px;
}
.first-dialog_separator {
padding-top: 16px;
padding-bottom: 16px;
gap: 40px;
}
.rounded-outline-icon {
border: 1px solid #8B8D8B; 
border-radius: 50%; 
padding: 5%; 
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
width: 300px; 
height: 60px; 
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
position: static;
padding:0px;
padding-right: 20px;
padding-left: 20px;
padding-bottom: 20px; 
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
text-decoration: none; 
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
text-decoration: underline; 
}

.custom_close_button
{
color: #928f8f;
position: absolute;
padding: 0;
padding-left: 10px;
top: 1px;
right: 12px;
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
right: 12px; 
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