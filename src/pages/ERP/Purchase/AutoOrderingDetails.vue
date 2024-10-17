<template>

  <div style="font-size: 10px; padding-left: 15px; padding-right: 15px;">
  <!-- {{last_enter_field}} -->

      <div class="text-subtitle1 header_text">
        Auto Ordering Details
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

                        <q-btn-group style="margin-right: 10px;" class="btn_grp2"> 
                            <q-btn-dropdown auto-close rounded color="primary" label="Action" split size="11px" no-caps>
                            
                                <q-list padding style="" class="btn_qlist"> <!--width: 100px;height:120px-->
                                    <q-item clickable style="padding: 0px">                        
                                        <q-item-section>
                                        <q-btn flat no-caps :label="'Generate item replenishment list'" color="primary" @click="handleGenerateItemReplenishmentList" class="btn_drp"/>
                                        </q-item-section>
                                    </q-item>
                                    <!-- <q-separator  /> -->
                                </q-list>
                            </q-btn-dropdown>
                        </q-btn-group>
                        
                        <Button :disable="disable_previous_button" v-on:receiveClick="handlePagination('previous')"
                        :pass_label="''"
                        :pass_no_caps="true"
                        :pass_square="true"
                        :pass_dense="true"
                        :class="['inactive_section_button']"
                        :pass_icon="'skip_previous'"
                        />

                        <Button :disable="disable_next_button" v-on:receiveClick="handlePagination('next')"
                        :pass_label="''"
                        :pass_no_caps="true"
                        :pass_square="true"
                        :pass_dense="true"
                        :class="['inactive_section_button']"
                        :pass_icon="'skip_next'"
                        />
                    </div>
                </div>

            </div>

                      <div class="step-content">
              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">

                  <div style="align-items: center; width: 100%;">
                      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-top: 10px; height: 100%;">

                      <div class="row" style="margin-bottom: 10px;">


                          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">

                              <div class="row">

                                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                      <div class="row" style="align-items: center;">
                                          <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-xs-12">
                                              <Label :pass_value="'Branch'" />
                                          </div>
                                          <div class="col-xl-10 col-lg-10 col-md-10 col-sm-12 col-xs-12">
                                              <Input :autofocusclick="true"
                                              v-model:pass_value="json.RefNo"
                                              v-on:receiveChange="handleChange"
                                              :dbComponentBehavior="dbComponentBehavior.text"/>
                                          </div>
                                      </div>
                                  </div>

                                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                      <div class="row" style="align-items: center;">
                                          <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-xs-12">
                                              <Label :pass_value="'Salesman'" />
                                          </div>
                                          <div class="col-xl-10 col-lg-10 col-md-10 col-sm-12 col-xs-12">
                                              <!-- <Input :autofocusclick="true"
                                              v-model:pass_value="json.PODate"
                                              v-on:receiveChange="handleChange('')"
                                              :dbComponentBehavior="dbComponentBehavior.text"
                                              /> -->
                                              <Datepicker class="new_input" v-on:receiveChange="handleChangePoDate" :daterange="json.PODate"
                                              :componentBehavior="dbComponentBehavior.text" :autoclose="true"/>
                                          </div>
                                      </div>
                                  </div>

                                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                      <div class="row" style="align-items: center;">
                                          <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-xs-12">
                                              <Label :pass_value="'Supplier'" />
                                          </div>
                                          <div class="col-xl-10 col-lg-10 col-md-10 col-sm-12 col-xs-12">
                                              <LabelSelectVerticalGeneral
                                                  v-model:pass_value="json.SCode"
                                                  v-on:receiveChange="handleChangeSupplier"
                                                  :dbComponentBehavior="dbComponentBehavior.text"
                                                  :options="supplier_options"
                                              />
                                          </div>
                                      </div>
                                  </div>

                                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                      <div class="row" style="align-items: center;">
                                          <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-xs-12">
                                              <Label :pass_value="'Remark'" />
                                          </div>
                                          <div class="col-xl-10 col-lg-10 col-md-10 col-sm-12 col-xs-12">
                                              <Input :autofocusclick="true"
                                                  v-model:pass_value="json.Remark"
                                                  v-on:receiveChange="handleChangeRemark"
                                                  :dbComponentBehavior="dbComponentBehavior.text"
                                              />
                                          </div>
                                      </div>
                                  </div>


                              </div>

                          </div>

                          <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-xs-12">

                              <div class="row">

                                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                      <div class="row" style="align-items: center;">
                                          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                              <Label :pass_value="'Doc Date'" />
                                          </div>
                                          <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                              <LabelSelectVerticalGeneral
                                                  v-model:pass_value="json.STerm"
                                                  v-on:receiveChange="handleChange('')"
                                                  :dbComponentBehavior="dbComponentBehavior.text"
                                                  :options="term_options"
                                                  :pass_overwrite_display="'value'"
                                              />
                                          </div>
                                      </div>
                                  </div>

                                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                      <div class="row" style="align-items: center;">
                                          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                              <Label :pass_value="'Doc No'" />
                                          </div>
                                          <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                              <LabelSelectVerticalGeneral
                                                  v-model:pass_value="json.CalDueDateby"
                                                  v-on:receiveChange="handleChange('')"
                                                  :dbComponentBehavior="dbComponentBehavior.text"
                                                  :options="cal_due_date_by_options"
                                                  :pass_overwrite_display="'value'"
                                              />
                                          </div>
                                      </div>
                                  </div>

                                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                      <div class="row" style="align-items: center;">
                                          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                              <Label :pass_value="'Delivery Date'" />
                                          </div>
                                          <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                              <Datepicker class="new_input" v-on:receiveChange="handleChangeDeliverDate" :daterange="json.DeliverDate"
                                              :componentBehavior="dbComponentBehavior.text" :autoclose="true"/>
                                          </div>
                                      </div>
                                  </div>

                                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                      <div class="row" style="align-items: center;">
                                          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                              <Label :pass_value="'Order Day'" />
                                          </div>
                                          <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                              <Datepicker class="new_input" v-on:receiveChange="handleChangeDeliverDate" :daterange="json.DeliverDate"
                                              :componentBehavior="dbComponentBehavior.text" :autoclose="true"/>
                                          </div>
                                      </div>
                                  </div>

                              </div>

                          </div>

                          <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-xs-12">

                              <div class="row">

                                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                      <div class="row" style="align-items: center;">
                                          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                              <Label :pass_value="'Stock Day (Min)'" />
                                          </div>
                                          <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                              <Input :autofocusclick="true"
                                                  v-model:pass_value="json.stockday_min"
                                                  v-on:receiveChange="handleChange('')"
                                                  :dbComponentBehavior="dbComponentBehavior.text_right"
                                              />
                                          </div>
                                      </div>
                                  </div>

                                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                      <div class="row" style="align-items: center;">
                                          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                              <Label :pass_value="'Stock Day (Max)'" />
                                          </div>
                                          <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                              <Input :autofocusclick="true"
                                                  v-model:pass_value="json.stockday_max"
                                                  v-on:receiveChange="handleChange('')"
                                                  :dbComponentBehavior="dbComponentBehavior.text_right"
                                              />
                                          </div>
                                      </div>
                                  </div>

                                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                      <div class="row" style="align-items: center;">
                                          <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                              <Label :pass_value="'In-kind'" />
                                          </div>
                                          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12" style="text-align: right;">
                                              <q-toggle
                                              :disable="true"
                                              dense
                                              style="padding-top: 7px; padding-bottom: 7px;"
                                              :false-value="0"
                                              :true-value="1"
                                              color="green"
                                              v-model="json.in_kind"
                                              />
                                          </div>
                                      </div>
                                  </div>

                                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                      <div class="row" style="align-items: center;">
                                          <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                              <Label :pass_value="'Auto Close PO'" />
                                          </div>
                                          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12" style="text-align: right;">
                                              <q-toggle
                                              :disable="true"
                                                  dense
                                                  style="padding-top: 7px; padding-bottom: 7px;"
                                                  :false-value="0"
                                                  :true-value="1"
                                                  color="green"
                                                  v-model="json.AutoClosePO"
                                              />
                                          </div>
                                      </div>
                                  </div>

                              </div>

                          </div>

                          <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-xs-12">

                              <div class="row">

                                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                      <div class="row" style="align-items: center;">
                                          <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                              <Label :pass_value="'Posted'" />
                                          </div>
                                          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12" style="text-align: right;">
                                              <q-toggle
                                              :disable="true"
                                                  dense
                                                  style="padding-top: 7px; padding-bottom: 7px;"
                                                  :false-value="0"
                                                  :true-value="1"
                                                  color="green"
                                                  v-model="json.BillStatus"
                                              />
                                          </div>
                                      </div>
                                  </div>

                                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                      <div class="row" style="align-items: center;">
                                          <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                              <Label :pass_value="'Ammended'" />
                                          </div>
                                          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12" style="text-align: right;">
                                              <q-toggle
                                              :disable="true"
                                                  dense
                                                  style="padding-top: 7px; padding-bottom: 7px;"
                                                  :false-value="0"
                                                  :true-value="1"
                                                  color="green"
                                                  v-model="json.Amendment"
                                              />
                                          </div>
                                      </div>
                                  </div>

                                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                      <div class="row" style="align-items: center;">
                                          <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                              <Label :pass_value="'Canceled'" />
                                          </div>
                                          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12" style="text-align: right;">
                                              <q-toggle
                                              :disable="true"
                                                  dense
                                                  style="padding-top: 7px; padding-bottom: 7px;"
                                                  :false-value="0"
                                                  :true-value="1"
                                                  color="green"
                                                  v-model="json.cancel"
                                              />
                                          </div>
                                      </div>
                                  </div>

                                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                      <div class="row" style="align-items: center;">
                                          <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                              <Label :pass_value="'Completed'" />
                                          </div>
                                          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12" style="text-align: right;">
                                              <q-toggle
                                              :disable="true"
                                                  dense
                                                  style="padding-top: 7px; padding-bottom: 7px;"
                                                  :false-value="0"
                                                  :true-value="1"
                                                  color="green"
                                                  v-model="json.Completed"
                                              />
                                          </div>
                                      </div>
                                  </div>

                                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                      <div class="row" style="align-items: center;">
                                          <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                              <Label :pass_value="'Issued By HQ'" />
                                          </div>
                                          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12" style="text-align: right;">
                                              <q-toggle
                                              :disable="true"
                                                  dense
                                                  style="padding-top: 7px; padding-bottom: 7px;"
                                                  :false-value="0"
                                                  :true-value="1"
                                                  color="green"
                                                  v-model="json.hq_issue"
                                              />
                                          </div>
                                      </div>
                                  </div>

                                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                      <div class="row" style="align-items: center;">
                                          <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                              <Label class="unknown_field" :pass_value="'B2B'" />
                                          </div>
                                          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12" style="text-align: right;">
                                              <q-toggle
                                              :disable="true"
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

                                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                      <div class="row" style="align-items: center;">
                                          <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                              <Label :pass_value="'Uploaded B2B Status'" />
                                          </div>
                                          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12" style="text-align: right;">
                                              <Input :autofocusclick="true"
                                              :disable="true"
                                              v-model:pass_value="json.b2b_status"
                                              v-on:receiveChange="handleChange"
                                              :dbComponentBehavior="dbComponentBehavior.text"/>
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
                          >
                              <q-tab content-class="custom_tab_font" name="Information" label="Information"/>
                              <q-tab content-class="custom_tab_font" name="Change Log" :disable="false" label="Change Log"/>
                          </q-tabs>
                      </q-toolbar>
                      <q-separator />

                      <q-tab-panels v-model="tab" :animated="false" keep-alive ref="tabs">

                        <q-tab-panel name="Information" style="padding: 0px; padding-top: 10px; color: grey; overflow: hidden">

                            <div class="row">

                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom: 3px;">

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
                                    :allow_delete="true"
                                    v-on:receiveHandleAdd="handleReceiveHandleAdd"
                                    v-on:receiveHandleEdit="handleReceiveHandleEdit"
                                    v-on:receiveHandleDelete="handleReceiveHandleDelete"

                                    :filter_mode_on="filter_mode_on"
                                    v-on:receiveColumnRearrange="handleColumnRearrange"
                                    v-on:filter_column="handleFilterColumn"
                                    :forceLoading="forceLoading"
                                    :column_reordering="false"
                                    :row_reordering="false"
                                    v-on:receiveHandleClearFilter="handleClearFilter"

                                    :pass_visible_columns="visibleColumns"
                                    />

                                </div>

                            </div>

                        </q-tab-panel>

                        <q-tab-panel name="Change Log" style="padding: 0px; padding-top: 10px; color: grey">
                        </q-tab-panel>

                      </q-tab-panels>

                  </div>
                  </div>

              </q-card-actions>
              <!-- <q-inner-loading
                  :showing="showAddLoading"
                  color="primary"
              /> -->
              </q-card-section>
          </q-card>

          </div>
      </q-form>

      <q-card-actions class="dialog_action justify-between">
          <span class="q-pl-xs">
          <Button_icon :flat="true" :font_color="'black'" :color="'white'" :text="'BACK'" :outline="true" size="15px" class="custom_cancel_button" @click="back()" />
          </span>
          <span class="q-pl-xs">
              <Button_icon :flat="true" :font_color="'white'" :color="'#094161'" :text="'SAVE'" :outline="false" size="15px"
              v-on:receiveClick="handleCreateVendor"/>
          </span>

      </q-card-actions>
  </div>



<q-dialog v-model="generateDialog" persistent position="top">
    <q-card style="width: 95vw; max-width: 950px; max-height: 90vh; margin-top: 5%;">

        <q-card-section class="row items-center dialog_header_custom">
            <div class="text-h6">Filter</div>
            <q-space />
            <q-btn icon="close" flat round dense :disable="loading_dialog" v-close-popup />
        </q-card-section>

        <q-card-section class="row">
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <q-form ref="save_form_dialog">
                    <div class="row dialog_content">
                        
                        <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                            <div class="row" style="height: 100%;">
                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">

                                    <div class="row">

                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px;">
                                            <div class="row" style="align-items: center;">
                                                <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-xs-12">
                                                    <Label :pass_value="'Supplier'" />
                                                </div>
                                                <div class="col-xl-10 col-lg-10 col-md-10 col-sm-12 col-xs-12">
                                                    <LabelSelectVerticalGeneral
                                                        v-model:pass_value="json.sup_code"
                                                        v-on:receiveChange="handleChange('')"
                                                        :dbComponentBehavior="dbComponentBehavior.text"
                                                        :options="supplier_options"
                                                        :pass_overwrite_display="'value'"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                </div>

                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-top: -15px;">

                                    <div class="row" style="height: 100%;">

                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom: 3px; padding-right: 10px;">
                                            
                                            <div class="weekdays_container">
                                                <Label :pass_value="'Week days'" style="margin-top: -9px; position: absolute; background-color: white;"/>
                                                
                                                <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8" style="padding-right: 10px; margin-top: 10px;">
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
                                                        v-model="all_day[0]"
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
                                                        v-model="all_day[1]"
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
                                                        v-model="all_day[2]"
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
                                                        v-model="all_day[3]"
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
                                                        v-model="all_day[4]"
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
                                                        v-model="all_day[5]"
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
                                                        v-model="all_day[6]"
                                                        @update:model-value="handleChangeAllDay($event, 6)"
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
                        </div>

                        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">

                            <div class="row">

                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">

                                    <div class="row">

                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                            <div class="row" style="align-items: center;">
                                                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                                    <Label :pass_value="'Delivery Date'" />
                                                </div>
                                                <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                                    <Datepicker class="new_input" v-on:receiveChange="handleChangePoDate" :daterange="json.delivery_date"
                                                    :componentBehavior="dbComponentBehavior.text" :autoclose="true"/>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                </div>

                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">

                                    <div class="row">

                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                            <div class="row" style="align-items: center;">
                                                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                                    <Label :pass_value="'Delv Term'" />
                                                </div>
                                                <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                                    <Datepicker class="new_input" v-on:receiveChange="handleChangePoDate" :daterange="json.DelvTerm"
                                                    :componentBehavior="dbComponentBehavior.text" :autoclose="true"/>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                </div>

                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">

                                    <div class="row">

                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                            <div class="row" style="align-items: center;">
                                                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                                    <Label :pass_value="'Increase %'" />
                                                </div>
                                                <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                                    <Datepicker class="new_input" v-on:receiveChange="handleChangePoDate" :daterange="json.IncreasePercent"
                                                    :componentBehavior="dbComponentBehavior.text" :autoclose="true"/>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                </div>

                            </div>
                        
                        </div>
                        
                    </div>
                </q-form>
            </div>
        </q-card-section>

        <q-card-actions class="dialog_action" align="right">
            <q-btn flat label="Cancel" color="primary" v-close-popup/>
            <q-btn flat label="Confirm" color="primary" @click="confirmFilter" />
        </q-card-actions>

        <q-inner-loading
        :showing="loading_dialog"
        color="primary"
        />
    </q-card>
</q-dialog>


</template>

<script>
import Chip from 'src/components/ERP/Base/Chip'
import ButtonMobile from 'src/components/ERP/Itemmaster/ButtonMobile'
// import Datepicker from 'src/components/ERP/Base/Datepicker'
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
        generateDialog : false,
        loading_dialog: false,
        step: 1,
        tab: 'Information',
        json: {},
        location_options: [],
        supplier_options: [],
        language: sessionStorage.getItem("language") != "" && sessionStorage.getItem("language") != "null" && sessionStorage.getItem("language") != null ? sessionStorage.getItem("language") : [],
        session_outlet_guid: sessionStorage.getItem("session_outlet_guid") != "" && sessionStorage.getItem("session_outlet_guid") != "null" && sessionStorage.getItem("session_outlet_guid") != null ? sessionStorage.getItem("session_outlet_guid") : [],
        getuser: sessionStorage.getItem("getuser") != "" && sessionStorage.getItem("getuser") != "null" && sessionStorage.getItem("getuser") != null ? sessionStorage.getItem("getuser") : [],
        supcus_guid: null,
        offset: 0,
        total_row: 0,
        page_function: null,
        disable_previous_button: true,
        disable_next_button: true,
        table_column: [],
        table_data: [],
        filter_mode_on: false,
        rearrange_column: [],
        forceLoading: false,
        filter_options: [],
        filter_value: [],
        visibleColumns: [],
        poex_guid: null,
        all_day: [true, true, true, true, true, true, true],
  }
},
components:{
  // Chip,
  // ButtonMobile,
  Input,
  Select,
  // Datepicker,
  Checkbox,
  // PurchaseTable,
  // SupplierItemListTable,
  Button_icon,
  SelectFilter,
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

    this.branch_options = await this.getBranch();
    this.currency_options = await this.getCurrencyOptions();
    var active_tab = JSON.parse(JSON.stringify(this.tab));

    await this.discoverTabs(active_tab, 'hide');

    // console.log(this.$route);
    var poex_guid = this.$route.query.poex_guid;

    var offset = this.$route.query.offset;
    var total_row = this.$route.query.total_row;

    if(poex_guid)
    {
        this.page_function = 'edit'
        this.poex_guid = poex_guid;
        await this.trigger_search()
    }
    else
    {
        this.page_function = 'create'
    }
    
    // alert(this.page_function);

    if(offset !== null && offset !== undefined && offset !== '' && total_row !== null && total_row !== undefined && total_row !== '')
    {
        this.offset = offset;
        this.total_row = total_row;

        this.disable_previous_button = offset <= '0' ? true : false;
        this.disable_next_button = offset >= total_row ? true : false;
    }


    this.filter_options = [
        {
            'label': 'Action',
            'value': 'action',
        },
        {
            'label': 'Convert PO',
            'value': 'convert_po',
        },
        {
            'label': 'Seq',
            'value': 'seq',
        },
        {
            'label': 'Item Code',
            'value': 'itemcode',
        },
        {
            'label': 'Bar Code',
            'value': 'barcode',
        },
        {
            'label': 'Description',
            'value': 'description',
        },
        {
            'label': 'UOM',
            'value': 'um',
        },
        {
            'label': 'Pack Size',
            'value': 'packsize',
        },
        {
            'label': 'Bulk Qty',
            'value': 'bulkqty',
        },
        {
            'label': 'Bulk UOM',
            'value': 'umbulk',
        },
        {
            'label': 'Qty.Bal',
            'value': 'qty_balance',
        },
        {
            'label': 'ADS',
            'value': 'ads',
        },
        {
            'label': 'AWS',
            'value': 'aws',
        },
        {
            'label': 'AMS',
            'value': 'ams',
        },
        {
            'label': 'DOH',
            'value': 'doh',
        },
        {
            'label': 'Qty Need',
            'value': 'qty_need',
        },
        {
            'label': 'Days',
            'value': 'days',
        },
        {
            'label': 'Qty Actual',
            'value': 'qty_actual',
        },
        {
            'label': 'Qty Foc Actual',
            'value': 'qty_foc_actual',
        },
        {
            'label': 'Price Actual',
            'value': 'price_actual',
        },
        {
            'label': 'Amount Actual',
            'value': 'amount_actual',
        },
        {
            'label': 'Qty Propose',
            'value': 'qty_propose',
        },
        {
            'label': 'Qty Foc Propose',
            'value': 'qty_foc_propose',
        },
        {
            'label': 'Price Propose',
            'value': 'price_propose',
        },
        {
            'label': 'Amount Propose',
            'value': 'amount_propose',
        },
        {
            'label': 'Dept',
            'value': 'dept',
        },
        {
            'label': 'Sub Dept',
            'value': 'subdept',
        },
        {
            'label': 'Category',
            'value': 'category',
        },
        {
            'label': 'Manufacturer',
            'value': 'manufacturer',
        },
        {
            'label': 'Brand',
            'value': 'brand',
        },
        {
            'label': 'Created By',
            'value': 'created_by',
        },
        {
            'label': 'Created at',
            'value': 'created_at',
        },
        {
            'label': 'Updated by',
            'value': 'updated_by',
        },
        {
            'label': 'Updated at',
            'value': 'updated_at',
        }
    ];

    var visibleColumns = [];

    for (const index in this.filter_options) {
        visibleColumns.push(this.filter_options[index].value);
    }

    this.visibleColumns = visibleColumns;

},
methods:{
    handlePagination(action)
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
            params: {
                "skip": offset,
                "limit": 1,
                // "sort_by": "IssueStamp",
                // "sort_type": "Desc",
                "outlet_guid": this.session_outlet_guid,
                "language": "EN"
            }
        };
        
        //here should call api and refetch data

        this.offset = offset;
        this.disable_previous_button = this.offset <= '0' ? true : false;
        this.disable_next_button = this.offset >= this.total_row ? true : false;
    },
    handleGenerateItemReplenishmentList()
    {
        this.generateDialog = true;
    },
    handleChangeBranch(newVal)
    {
        this.bjson.branch_guid = newVal;
    },
    async getCountry()
    {
        var payload = {
        "pass_json": {
            "outlet_guid": this.session_outlet_guid,
            "language": this.language,
            "limit": 1000
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
                label: new_row.BRANCH_CODE + ' - ' + new_row.BRANCH_NAME,
                value: new_row.BRANCH_GUID,
                code: new_row.BRANCH_CODE
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
            "limit": 9999999
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
                value: new_row.BRANCH_GUID,
                code: new_row.BRANCH_CODE
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
        var branch_guid = this.bjson.branch_guid;
        var is_ibt = this.bjson.is_ibt;
        // var ar_customer = this.bjson.ar_customer;
        // var ar_supplier = this.bjson.ar_supplier;
        var isICT = this.bjson.isICT;
        var is_gst = this.bjson.is_gst;
        var limit_control_amt = this.unformatAmount(this.bjson.limit_control_amt);
        var filter_loc_group = this.branch_options.filter((entry)=>{
        return entry.value == this.bjson.branch_guid
        })
        var loc_group = filter_loc_group[0].code;

        var payload = {
            pass_json: {
            updated_by: this.getuser,
            supcus_guid: this.supcus_guid,
            language: this.language,
            set_active: set_active,
            branch_guid: branch_guid,
            is_ibt: is_ibt,
            // ar_customer: ar_customer,
            // ar_supplier: ar_supplier,
            isICT: isICT,
            is_gst: is_gst,
            limit_control_amt: limit_control_amt,
            loc_group: loc_group
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
                branch_guid: '',
                is_ibt: false,
                isICT: false,
                is_gst: false,
                limit_control_amt: '0.00'
            };
        } else {
            // fail condition
            var error_response = dispatch_response.detail;
            this.showNotify('negative', JSON.stringify(error_response));
            this.showAddLoading = false;
            this.branch.loading = false;
        }
    },
    handleChangePurchaseLimit(newVal)
    {
        this.bjson.limit_control_amt = this.formatAmount(newVal, '$');
        console.log(this.bjson.limit_control_amt)
    },
    closeBranchDialog()
    {
        this.branch.dialog = false;
        this.branch.action = null;
        this.bjson = {
        set_active: false,
        // ar_customer: '',
        // ap_supplier: '',
        branch_guid: '',
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
        console.log('this.branch_options', this.branch_options)
        this.branch.dialog = true;
        this.branch.action = 'edit';
        this.branch.loading = true;

        var payload = {};
        payload.outlet_guid = this.session_outlet_guid;//session
        payload.language = this.language;
        payload.supcus_guid = this.supcus_guid;
        payload.branch_guid = row.row.branch_guid;

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
            this.branch.loading = false;
            var result = results[0]
            result.isICT = result.isICT == 1;
            result.is_gst = result.is_gst == 1;
            result.is_ibt = result.is_ibt == 1;
            result.set_active = result.set_active == 1;
            result.limit_control_amt = this.formatAmount(result.limit_control_amt, '$')
            this.bjson = result;
            console.log('this.bjson.branch_guid', this.bjson.branch_guid)
        }
        else
        {
            var error_message = 'Failed. Please try again.';
            this.showNotify("negative", error_message);
            this.branch.dialog = false;
            this.branch.action = null;
            this.branch.loading = false;
        }
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

        // for (const index in this.table_column) {

        // var is_array = Array.isArray(this.table_column[index].filter_value);
        // if(is_array)
        // {
        //     var value = '';

        //     for (const value_index in this.table_column[index].filter_value) {
        //         value += this.table_column[index].filter_value[value_index]+",";
        //     }

        //     value = value.replace(/,\s*$/, "");

        //     payload[this.table_column[index].field] = value
        // }
        // else
        // {
        //     if(this.table_column[index].filter_value)
        //     {
        //         payload[this.table_column[index].field] = this.table_column[index].filter_value
        //     }
        //     else
        //     {
        //         delete payload[this.table_column[index].field]
        //     }
        // }
        // }

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

        // var payload = {
        //     "pass_json": payload//pass_json should be the field or data wish to be created.
        // };

        // var object_pass = {
        //     "dispatch": 'setup/trigger_post_get_supcus_branch', //refer to path/function_name in store actions.js
        //     "getter": 'setup/get_supcus_branch', //refer to path/function_name in store getters.js
        //     "app": this, //compulsory passed variable
        //     "payload": payload //payload that needed to use in store actions.js
        // };

        // var dispatch_response = await this.$dispatch(object_pass);

        // if(dispatch_response.status)
        // {
        //     //success condition
        //     var results = dispatch_response.response.detail;
        //     if(results.length > 0)
        //     {
        //         for(var i in results)
        //         {
        //             results[i].set_active = results[i].set_active == 1;
        //             results[i].is_ibt = results[i].is_ibt == 1;
        //             results[i].isICT = results[i].isICT == 1;
        //             results[i].is_gst = results[i].is_gst == 1;
        //             results[i].limit_control_amt = this.formatAmount(results[i].limit_control_amt,'$');
        //         }
        //     }

        //     this.table_data =
        //     {
        //         "data": {
        //             "count": dispatch_response.response.total_row,
        //             "next": null,
        //             "previous": null,
        //             "results": results
        //         }
        //     };

        //     this.results = results;

        // }else
        // {
        //     //fail condition
            this.table_data = {
                "data": {
                    "count": 0,
                    "next": null,
                    "previous": null,
                    "results": []
                }
            };
        // }

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
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
                {
                    name: 'convert_po',
                    required: true,
                    label: 'PO Created',
                    align: 'left',
                    sortable: true,
                    field: 'convert_po',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
                {
                    name: 'seq',
                    required: true,
                    label: 'Seq',
                    align: 'left',
                    sortable: true,
                    field: 'seq',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
                {
                    name: 'itemcode',
                    required: true,
                    label: 'Item Code',
                    align: 'left',
                    sortable: true,
                    field: 'itemcode',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
                {
                    name: 'barcode',
                    required: true,
                    label: 'Bar Code',
                    align: 'left',
                    sortable: true,
                    field: 'barcode',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
                {
                    name: 'description',
                    required: true,
                    label: 'Description',
                    align: 'left',
                    sortable: true,
                    field: 'description',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
                {
                    name: 'um',
                    required: true,
                    label: 'UOM',
                    align: 'left',
                    sortable: true,
                    field: 'um',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
                {
                    name: 'packsize',
                    required: true,
                    label: 'Pack Size',
                    align: 'left',
                    sortable: true,
                    field: 'packsize',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
                {
                    name: 'bulkqty',
                    required: true,
                    label: 'Bulk Qty',
                    align: 'left',
                    sortable: true,
                    field: 'bulkqty',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
                {
                    name: 'umbulk',
                    required: true,
                    label: 'Bulk UOM',
                    align: 'left',
                    sortable: true,
                    field: 'umbulk',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
                {
                    name: 'qty_balance',
                    required: true,
                    label: 'Qty.Bal',
                    align: 'left',
                    sortable: true,
                    field: 'qty_balance',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
                {
                    name: 'ads',
                    required: true,
                    label: 'ADS',
                    align: 'left',
                    sortable: true,
                    field: 'ads',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
                {
                    name: 'aws',
                    required: true,
                    label: 'AWS',
                    align: 'left',
                    sortable: true,
                    field: 'aws',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
                {
                    name: 'ams',
                    required: true,
                    label: 'AMS',
                    align: 'left',
                    sortable: true,
                    field: 'ams',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
                {
                    name: 'doh',
                    required: true,
                    label: 'DOH',
                    align: 'left',
                    sortable: true,
                    field: 'doh',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
                {
                    name: 'qty_need',
                    required: true,
                    label: 'Qty Need',
                    align: 'left',
                    sortable: true,
                    field: 'qty_need',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
                {
                    name: 'days',
                    required: true,
                    label: 'Days',
                    align: 'left',
                    sortable: true,
                    field: 'days',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
                {
                    name: 'qty_actual',
                    required: true,
                    label: 'Qty Actual',
                    align: 'left',
                    sortable: true,
                    field: 'qty_actual',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
                {
                    name: 'qty_foc_actual',
                    required: true,
                    label: 'Qty Foc Actual',
                    align: 'left',
                    sortable: true,
                    field: 'qty_foc_actual',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
                {
                    name: 'price_actual',
                    required: true,
                    label: 'Price Actual',
                    align: 'left',
                    sortable: true,
                    field: 'price_actual',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
                {
                    name: 'amount_actual',
                    required: true,
                    label: 'Amount Actual',
                    align: 'left',
                    sortable: true,
                    field: 'amount_actual',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
                {
                    name: 'qty_propose',
                    required: true,
                    label: 'Qty Propose',
                    align: 'left',
                    sortable: true,
                    field: 'qty_propose',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
                {
                    name: 'qty_foc_propose',
                    required: true,
                    label: 'Qty FOC Propose',
                    align: 'left',
                    sortable: true,
                    field: 'qty_foc_propose',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
                {
                    name: 'price_propose',
                    required: true,
                    label: 'Price Propose',
                    align: 'left',
                    sortable: true,
                    field: 'price_propose',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
                {
                    name: 'amount_propose',
                    required: true,
                    label: 'Amount Propose',
                    align: 'left',
                    sortable: true,
                    field: 'amount_propose',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
                {
                    name: 'dept',
                    required: true,
                    label: 'Dept',
                    align: 'left',
                    sortable: true,
                    field: 'dept',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
                {
                    name: 'subdept',
                    required: true,
                    label: 'Sub Dept',
                    align: 'left',
                    sortable: true,
                    field: 'subdept',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
                {
                    name: 'category',
                    required: true,
                    label: 'Category',
                    align: 'left',
                    sortable: true,
                    field: 'category',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
                {
                    name: 'manufacturer',
                    required: true,
                    label: 'Manufacturer',
                    align: 'left',
                    sortable: true,
                    field: 'manufacturer',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; width: 1%;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                },
                {
                    name: 'brand',
                    required: true,
                    label: 'Brand',
                    align: 'left',
                    sortable: true,
                    field: 'brand',
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
                    label: 'Created by',
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
                    name: 'created_at',
                    required: true,
                    label: 'Created at',
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
                    name: 'updated_by',
                    required: true,
                    label: 'Updated by',
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
                {
                    name: 'updated_at',
                    required: true,
                    label: 'Updated at',
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
    async trigger_search(){

        var payload = {
            "pass_json": {
                "skip": 0,
                "limit": 99999999,
                "poex_guid": this.poex_guid,
                "language": this.language,
                "RefNo": "",
            },
        };

        var object_pass = {
            "dispatch": 'purchase/trigger_get_po_ex', //refer to path/function_name in store actions.js
            "getter": 'purchase/get_po_ex', //refer to path/function_name in store getters.js
            "app": this, //compulsory passed variable
            "payload": payload //payload that needed to use in store actions.js
        };

        var dispatch_response = await this.$dispatch(object_pass);
        console.log('dispatch_response', dispatch_response);
        
        if(dispatch_response.status){

            // console.log(this.$route);
            this.json = dispatch_response.response.detail[0];

        }

    },

  back(){
        this.$router.push("PurchaseOrder");
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
      var created_by = this.getuser
      var updated_by = this.getuser
      var RefNo = this.json.RefNo
      var PODate = this.json.PODate
      var Location = this.json.Location
      var SCode = this.json.SCode
      var Remark = this.json.Remark
      var STerm = this.json.STerm
      var CalDueDateby = this.json.CalDueDateby
      var DeliverDate = this.json.DeliverDate
      var Branch = this.json.Branch
      var ReceivingLocation = this.json.ReceivingLocation
      var tax_code_purchase = this.json.tax_code_purchase
      var pur_expiry_days = this.json.pur_expiry_days
      var DeliverDate = this.json.DeliverDate
      var stockday_min = this.json.stockday_min
      var stockday_max = this.json.stockday_max
      var in_kind = this.json.in_kind
      var AutoClosePO = this.json.AutoClosePO
      var BillStatus = this.json.BillStatus
      var Amendment = this.json.Amendment
      var cancel = this.json.cancel
      var Completed = this.json.Completed
      var hq_issue = this.json.hq_issue
      var b2b_registration = this.json.b2b_registration
      var b2b_status = this.json.b2b_status
      var gross = this.json.gross
      var rebate_amt = this.json.rebate_amt
      var total_exclude_tax = this.json.total_exclude_tax
      var tax = this.json.tax
      var total_include_tax = this.json.total_include_tax

      var payload = {
          pass_json: {
            created_by: created_by,
            updated_by: updated_by,
            RefNo: RefNo,
            PODate: PODate,
            Location: Location,
            SCode: SCode,
            Remark: Remark,
            STerm: STerm,
            CalDueDateby: CalDueDateby,
            DeliverDate: DeliverDate,
            Branch: Branch,
            ReceivingLocation: ReceivingLocation,
            tax_code_purchase: tax_code_purchase,
            pur_expiry_days: pur_expiry_days,
            DeliverDate: DeliverDate,
            stockday_min: stockday_min,
            stockday_max: stockday_max,
            in_kind: in_kind,
            AutoClosePO: AutoClosePO,
            BillStatus: BillStatus,
            Amendment: Amendment,
            cancel: cancel,
            Completed: Completed,
            hq_issue: hq_issue,
            b2b_registration: b2b_registration,
            b2b_status: b2b_status,
            gross: gross,
            rebate_amt: rebate_amt,
            total_exclude_tax: total_exclude_tax,
            tax: tax,
            total_include_tax: total_include_tax,
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
      var updated_by = this.getuser
      var RefNo = this.json.RefNo
      var PODate = this.json.PODate
      var Location = this.json.Location
      var SCode = this.json.SCode
      var Remark = this.json.Remark
      var STerm = this.json.STerm
      var CalDueDateby = this.json.CalDueDateby
      var DeliverDate = this.json.DeliverDate
      var Branch = this.json.Branch
      var ReceivingLocation = this.json.ReceivingLocation
      var tax_code_purchase = this.json.tax_code_purchase
      var pur_expiry_days = this.json.pur_expiry_days
      var DeliverDate = this.json.DeliverDate
      var stockday_min = this.json.stockday_min
      var stockday_max = this.json.stockday_max
      var in_kind = this.json.in_kind
      var AutoClosePO = this.json.AutoClosePO
      var BillStatus = this.json.BillStatus
      var Amendment = this.json.Amendment
      var cancel = this.json.cancel
      var Completed = this.json.Completed
      var hq_issue = this.json.hq_issue
      var b2b_registration = this.json.b2b_registration
      var b2b_status = this.json.b2b_status


      var payload = {
        pass_json: {
          updated_by: updated_by, //no_pass
          RefNo: RefNo,
          PODate: PODate,
          Location: Location,
          SCode: SCode,
          Remark: Remark,
          STerm: STerm,
          CalDueDateby: CalDueDateby,
          DeliverDate: DeliverDate,
          Branch: Branch,
          ReceivingLocation: ReceivingLocation,
          tax_code_purchase: tax_code_purchase,
          pur_expiry_days: pur_expiry_days,
          DeliverDate: DeliverDate,
          stockday_min: stockday_min,
          stockday_max: stockday_max,
          in_kind: in_kind,
          AutoClosePO: AutoClosePO,
          BillStatus: BillStatus,
          Amendment: Amendment,
          cancel: cancel,
          Completed: Completed,
          hq_issue: hq_issue,
          b2b_registration: b2b_registration,
          b2b_status: b2b_status,
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
          this.showNotify("positive", "Update Successfully.");

      }else
      {
          //fail condition
          var error_response = dispatch_response.detail;
              var show_error = "";
              this.showNotify('negative', JSON.stringify(error_response));

              this.showAddLoading = false;
      }




    // if (dispatch_response_supcus_vendor && dispatch_response_supcus_vendor.status) {
    //   const responseDetail = dispatch_response_supcus_vendor.response?.detail;

    //   if (responseDetail && Array.isArray(responseDetail)) {
    //     // Find the vendor data with the matching supcus_guid
    //     const supcus_guid = this.$route.query.supcus_guid;
    //     const updatedVendor = responseDetail.find((entry) => entry.supcus_guid == supcus_guid);

    //     if (updatedVendor) {
    //       // Update the JSON object with new data
    //       this.json = { ...this.json, ...updatedVendor };

    //       // Display success message
    //       this.showNotify("positive", "Data updated successfully.");

    //       // Push the updated data to the vendor route with the updated supcus_guid
    //       this.$router.push({
    //         name: 'Vendor',
    //         query: { supcus_guid: updatedVendor.supcus_guid }
    //             });
    //           } else {
    //             // Handle case where no matching vendor was found
    //             this.showNotify("negative", "Vendor data not found.");
    //           }
    //         } else {
    //           // Handle invalid response
    //           this.showNotify("negative", "Invalid response data.");
    //         }
    // } else {
    //   // Handle failed save operation
    //   this.showNotify("negative", "Error updating data.");
    // }

    // // Hide loading spinner or indicator
    // this.showAddLoading = false;

    },
    // async validate_form(form_name)
    // {
    //     alert(form_name)
    //     var form_name = form_name;
    //     var error = 0;


    //     var error = error == 1 ? false : true;
    //     //true is no error false is got error

    //     return new Promise((resolve, reject) => {
    //     // setTimeout(() => {
    //         resolve(error);
    //     // }, 2000);
    //     });
    // },
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

.weekdays_container
{
    border: 1px solid #cfcfcf;
    height: 100%;
}

.top_right_button
{
    text-align: right;
    padding-top: 5px;
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
/* *>>>.q-card__section--vert {
  padding: 0px;
} */
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
