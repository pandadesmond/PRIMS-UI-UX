<template>
  <div style="font-size: 10px; padding-left: 15px; padding-right: 15px;">
  <!-- {{last_enter_field}} -->
      <div class="text-subtitle1 header_text">
          Price Change - {{page_function}}
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
                        title="Refno"
                        icon="edit"
                        :done="done1"
                        style="font-size: 10px; padding-left: 15px; padding-right: 15px;"
                        >
                        </q-step>

                        <q-step
                        :name="2"
                        title="Product"
                        caption=""
                        icon="edit"
                        :done="done2"
                        >
                        </q-step>

                        <q-step
                        :name="3"
                        title="Site"
                        caption=""
                        icon="edit"
                        :done="done3"
                        >
                        </q-step>

                        <q-step
                        :name="4"
                        title="Card Type"
                        caption=""
                        icon="edit"
                        :done="done4"
                        >
                        </q-step>

                        <q-step
                        :name="5"
                        title="Barcode"
                        caption=""
                        icon="edit"
                        :done="done5"
                        >
                        </q-step>
                    </q-stepper>

                </div>

                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 top_right_button">
                    <div>
                      <Button :disable="page_function == 'create' ? true : false" v-on:receiveClick="handleAdd"
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
                        <Button :disable="page_function == 'create' || page_function == 'view'" v-on:receiveClick="handleDelete"
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
                        <Button :disable="page_function == 'create' || page_function == 'edit'" v-on:receiveClick="handleEdit"
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
                        
                        <Button :disable="page_function == 'view'" v-on:receiveClick="handleCreateVendor"
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
                        <!-- <Button v-if="page_function == 'create' && this.$route.query.prev_TRANS_GUID && this.$route.query.prev_offset && this.$route.query.prev_total_row" v-on:receiveClick="handleCancel"
                        :pass_label="''"
                        :pass_no_caps="true"
                        :pass_square="true"
                        :pass_dense="true"
                        :pass_flat="true"
                        :tooltip="true"
                        :pass_tooltip="'Cancel'"
                        style="font-size: 12px; background-color: #b7b7b7; color: white; margin-left: 0px; margin-right: 10px;"
                        :pass_icon="'close'"
                        /> -->

                        <Button :disable="page_function == 'view'" v-on:receiveClick="handleCancel"
                        :pass_label="''"
                        :pass_no_caps="true"
                        :pass_square="true"
                        :pass_dense="true"
                        :pass_flat="true"
                        :tooltip="true"
                        :pass_tooltip="'Cancel'"
                        style="font-size: 12px; background-color: #C10015; color: white; margin-left: 0px; margin-right: 10px;"
                        :pass_icon="'close'"
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
                        <Button :disable="disable_previous_button || this.page_function != 'view'" v-on:receiveClick="handlePagination('previous')"
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
                        <Button :disable="disable_next_button || this.page_function != 'view'" v-on:receiveClick="handlePagination('next')"
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
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-top: 10px; height: 100%;">
                  <div class="row" style="margin-bottom: 10px;">

                    <div class="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-xs-12">
                        <div class="row">
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                <div class="row" style="align-items: center;">
                                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-xs-12">
                                        <Label :pass_value="'Refno'" />
                                    </div>
                                    <div class="col-xl-10 col-lg-10 col-md-10 col-sm-12 col-xs-12">
                                        <Input :autofocusclick="true"
                                        :disable="page_function != 'view'"
                                        :readonly="page_function == 'view'"
                                        v-model:pass_value="json.RefNo"
                                        v-on:receiveChange="handleChange"
                                        :dbComponentBehavior="dbComponentBehavior.text"/>
                                    </div>
                                </div>
                            </div>

                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                <div class="row" style="align-items: center;">
                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                        <Label :pass_value="'Outlet'" />
                                    </div>
                                    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                        <Input  :readonly="page_function == 'view'" :autofocusclick="true"
                                        v-model:pass_value="json.Location_Group"
                                        v-on:receiveChange="handleChange"
                                        :dbComponentBehavior="dbComponentBehavior.text"/>
                                    </div>
                                </div>
                            </div>

                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                <div class="row" style="align-items: center;">
                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                        <Label :pass_value="'Issued by HQ'" />
                                    </div>
                                    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                      <q-toggle
                                        dense
                                        style="padding-top: 7px; padding-bottom: 7px;"
                                        :false-value="0"
                                        :true-value="1"
                                        color="green"
                                        v-model="json.ishq"
                                      />
                                    </div>
                                </div>
                            </div>

                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                <div class="row" style="align-items: center;">
                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                        <Label :pass_value="'Effective Date'" />
                                    </div>
                                    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                      <Datepicker class="custom_datepicker" :disable="page_function == 'view'" v-on:receiveChange="handleChangeEffectiveDate" :daterange="json.EffectiveDate"
                                      :componentBehavior="dbComponentBehavior.date_required" :autoclose="true"/>
                                    </div>
                                </div>
                            </div>

                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                <div class="row" style="align-items: center;">
                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                        <Label :pass_value="'Effective Time'" />
                                    </div>
                                    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                      <Input  :readonly="page_function == 'view'" :autofocusclick="true"
                                        v-model:pass_value="json.EffectiveTime"
                                        v-on:receiveChange="handleChange"
                                        :dbComponentBehavior="dbComponentBehavior.text"/>
                                    </div>
                                </div>
                            </div>

                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                <div class="row" style="align-items: center;">
                                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-xs-12">
                                        <Label :pass_value="'Remark'" />
                                    </div>
                                    <div class="col-xl-10 col-lg-10 col-md-10 col-sm-12 col-xs-12">
                                        <Input  :readonly="page_function == 'view'" :autofocusclick="true"
                                            v-model:pass_value="json.Remark"
                                            v-on:receiveChange="handleChangeRemark"
                                            :dbComponentBehavior="dbComponentBehavior.text"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-xs-12">
                      <div class="row">
                        <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                          <div class="row">
                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12">
                              <div class="row">

                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                  <div class="row" style="align-items: center; height: 32px;">
                                    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                        <Label :pass_value="'Request Sent'" />
                                    </div>
                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12" style="text-align: right;">
                                        <q-toggle
                                        :disable="true"
                                        dense
                                        style="padding-top: 7px; padding-bottom: 7px;"
                                        :false-value="0"
                                        :true-value="1"
                                        color="green"
                                        v-model="json.Send_Req"
                                        />
                                    </div>
                                  </div>
                                </div>

                              </div>
                            </div>

                            <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-xs-12">
                              <div class="row">

                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                  <div class="row">
                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                      <div class="row" style="align-items: center;">
                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-xs-12">
                                            <Label :pass_value="'By'" />
                                            <!-- Request By -->
                                        </div>
                                        <div class="col-xl-10 col-lg-10 col-md-10 col-sm-12 col-xs-12">
                                            <Input :autofocusclick="true"
                                                :disable="page_function != 'view'"
                                                :readonly="page_function == 'view'"
                                                v-model:pass_value="json.Send_by"
                                                v-on:receiveChange="handleChange('')"
                                                :dbComponentBehavior="dbComponentBehavior.text"
                                            />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                  <div class="row">

                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                      <div class="row" style="align-items: center;">
                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-xs-12">
                                            <Label :pass_value="'On'" />
                                            <!-- Request On -->
                                        </div>
                                        <div class="col-xl-10 col-lg-10 col-md-10 col-sm-12 col-xs-12">
                                            <Input :autofocusclick="true"
                                                :disable="page_function != 'view'"
                                                :readonly="page_function == 'view'"
                                                v-model:pass_value="json.Send_Req_at"
                                                v-on:receiveChange="handleChange('')"
                                                :dbComponentBehavior="dbComponentBehavior.text"
                                            />
                                        </div>
                                      </div>
                                    </div>

                                  </div>
                                </div>

                              </div>
                            </div>

                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12">
                              <div class="row">

                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                    <div class="row" style="align-items: center; height: 32px;">
                                        <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                            <Label :pass_value="'Approved'" />
                                        </div>
                                        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12" style="text-align: right;">
                                            <q-toggle
                                            :disable="true"
                                                dense
                                                style="padding-top: 7px; padding-bottom: 7px;"
                                                :false-value="0"
                                                :true-value="1"
                                                color="green"
                                                v-model="json.Send_Approved"
                                            />
                                        </div>
                                    </div>
                                </div>

                              </div>
                            </div>

                            <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-xs-12">
                              <div class="row">

                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                  <div class="row">

                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                      <div class="row" style="align-items: center;">
                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-xs-12">
                                            <Label :pass_value="'By'" />
                                            <!-- Approved By -->
                                        </div>
                                        <div class="col-xl-10 col-lg-10 col-md-10 col-sm-12 col-xs-12">
                                            <Input :autofocusclick="true"
                                                :disable="page_function != 'view'"
                                                :readonly="page_function == 'view'"
                                                v-model:pass_value="json.Send_Approved_by"
                                                v-on:receiveChange="handleChange('')"
                                                :dbComponentBehavior="dbComponentBehavior.text"
                                            />
                                        </div>
                                      </div>
                                    </div>

                                  </div>
                                </div>

                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                  <div class="row">

                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                      <div class="row" style="align-items: center;">
                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-xs-12">
                                            <Label :pass_value="'On'" />
                                            <!-- Approved On -->
                                        </div>
                                        <div class="col-xl-10 col-lg-10 col-md-10 col-sm-12 col-xs-12">
                                            <Input :autofocusclick="true"
                                                :disable="page_function != 'view'"
                                                :readonly="page_function == 'view'"
                                                v-model:pass_value="json.Send_Approved_at"
                                                v-on:receiveChange="handleChange('')"
                                                :dbComponentBehavior="dbComponentBehavior.text"
                                            />
                                        </div>
                                      </div>
                                    </div>

                                  </div>
                                </div>


                              </div>
                            </div>

                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12">
                              <div class="row">

                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                    <div class="row" style="align-items: center; height: 32px;">
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
                                                v-model="json.Post_Req"
                                            />
                                        </div>
                                    </div>
                                </div>

                              </div>
                            </div>

                            <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-xs-12">
                              <div class="row">

                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                  <div class="row">

                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                      <div class="row" style="align-items: center;">
                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-xs-12">
                                            <Label :pass_value="'By'" />
                                            <!-- Posted By -->
                                        </div>
                                        <div class="col-xl-10 col-lg-10 col-md-10 col-sm-12 col-xs-12" style="text-align: right;">
                                          <Input :autofocusclick="true"
                                          :disable="page_function != 'view'"
                                          :readonly="page_function == 'view'"
                                          v-model:pass_value="json.Post_by"
                                          v-on:receiveChange="handleChange('')"
                                          :dbComponentBehavior="dbComponentBehavior.text"
                                          />
                                        </div>
                                      </div>
                                    </div>

                                  </div>
                                </div>

                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                  <div class="row">

                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                      <div class="row" style="align-items: center;">
                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-xs-12">
                                            <Label :pass_value="'On'" />
                                            <!-- Posted On -->
                                        </div>
                                        <div class="col-xl-10 col-lg-10 col-md-10 col-sm-12 col-xs-12" style="text-align: right;">
                                          <Input :autofocusclick="true"
                                          :disable="page_function != 'view'"
                                          :readonly="page_function == 'view'"
                                          v-model:pass_value="json.Post_Req_at"
                                          v-on:receiveChange="handleChange('')"
                                          :dbComponentBehavior="dbComponentBehavior.text"
                                          />
                                        </div>
                                      </div>
                                    </div>

                                  </div>
                                </div>

                              </div>
                            </div>

                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12">
                              <div class="row">

                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                    <div class="row" style="align-items: center; height: 32px;">
                                        <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                            <Label :pass_value="'Printed'" />
                                        </div>
                                        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12" style="text-align: right;">
                                            <q-toggle
                                            :disable="true"
                                                dense
                                                style="padding-top: 7px; padding-bottom: 7px;"
                                                :false-value="0"
                                                :true-value="1"
                                                color="green"
                                                v-model="json.Print_Req"
                                            />
                                        </div>
                                    </div>
                                </div>

                              </div>
                            </div>

                            <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-xs-12">
                              <div class="row">

                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                  <div class="row">

                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                      <div class="row" style="align-items: center;">
                                          <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-xs-12">
                                              <Label :pass_value="'By'" />
                                              <!-- Printed By -->
                                          </div>
                                          <div class="col-xl-10 col-lg-10 col-md-10 col-sm-12 col-xs-12" style="text-align: right;">
                                            <Input :autofocusclick="true"
                                              :disable="page_function != 'view'"
                                              :readonly="page_function == 'view'"
                                              v-model:pass_value="json.Print_by"
                                              v-on:receiveChange="handleChange('')"
                                              :dbComponentBehavior="dbComponentBehavior.text"
                                            />
                                          </div>
                                      </div>
                                    </div>

                                  </div>
                                </div>

                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                  <div class="row">

                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                      <div class="row" style="align-items: center;">
                                          <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-xs-12">
                                              <Label :pass_value="'On'" />
                                              <!-- Printed On -->
                                          </div>
                                          <div class="col-xl-10 col-lg-10 col-md-10 col-sm-12 col-xs-12" style="text-align: right;">
                                            <Input :autofocusclick="true"
                                              :disable="page_function != 'view'"
                                              :readonly="page_function == 'view'"
                                              v-model:pass_value="json.Print_Req_at"
                                              v-on:receiveChange="handleChange('')"
                                              :dbComponentBehavior="dbComponentBehavior.text"
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

                        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                          <div class="row">
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              <div class="row">
                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                  <div class="row" style="align-items: center;">
                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                        <Label :pass_value="'Created On'" />
                                        <!-- Created On -->
                                    </div>
                                    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                        <Input :autofocusclick="true"
                                        :disable="page_function != 'view'"
                                        :readonly="page_function == 'view'"
                                        v-model:pass_value="json.Created_at"
                                        v-on:receiveChange="handleChange('')"
                                        :dbComponentBehavior="dbComponentBehavior.text"
                                        />
                                    </div>
                                  </div>
                                </div>

                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                  <div class="row" style="align-items: center;">
                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                        <Label :pass_value="'Created By'" />
                                        <!-- Created By -->
                                    </div>
                                    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                        <Input :autofocusclick="true"
                                        :disable="page_function != 'view'"
                                        :readonly="page_function == 'view'"
                                        v-model:pass_value="json.Created_by"
                                        v-on:receiveChange="handleChange('')"
                                        :dbComponentBehavior="dbComponentBehavior.text"
                                        />
                                    </div>
                                  </div>
                                </div>

                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                  <div class="row" style="align-items: center;">
                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                        <Label :pass_value="'Updated On'" />
                                        <!-- Updated On -->
                                    </div>
                                    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12" style="text-align: right;">
                                        <Input :autofocusclick="true"
                                        :disable="page_function != 'view'"
                                        :readonly="page_function == 'view'"
                                        v-model:pass_value="json.Updated_at"
                                        v-on:receiveChange="handleChange('')"
                                        :dbComponentBehavior="dbComponentBehavior.text"
                                        />
                                    </div>
                                  </div>
                                </div>

                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                  <div class="row" style="align-items: center;">
                                      <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                          <Label :pass_value="'Updated By'" />
                                          <!-- Updated By -->
                                      </div>
                                      <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12" style="text-align: right;">
                                        <Input :autofocusclick="true"
                                        :disable="page_function != 'view'"
                                        :readonly="page_function == 'view'"
                                        v-model:pass_value="json.Updated_by"
                                        v-on:receiveChange="handleChange('')"
                                        :dbComponentBehavior="dbComponentBehavior.text"
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
                </div>
              </div>
            </div>
          </div>

          <q-card flat class="card-container" style="max-height: 100%; padding: 10px;border-radius: 0px; padding-top: 0px;padding-left: 0px;">
              <q-card-section class="upload_container" style="font-size: 10px;">

              <q-card-actions class="dialog_action justify-between row" style="padding-left: 10px; padding-right: 0px;">

                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" style="margin-top: 20px;">
                    <div class="row">
                      <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
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
                                <q-tab content-class="custom_tab_font" name="Product" label="Product"/>
                                <q-tab content-class="custom_tab_font" name="Site" label="Site"/>
                                <q-tab content-class="custom_tab_font" name="Card Type" :disable="false" label="Card Type"/>
                                <q-tab content-class="custom_tab_font" name="Barcode" :disable="false" label="Barcode"/>
                            </q-tabs>
                        </q-toolbar>
                      </div>

                      <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                        <q-toolbar class="bg-white q-pl-sm custom_toolbar">
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" align="right">
                            <Button v-on:receiveClick="showSearchDialog"
                            v-if="page_function == 'edit' && tab == 'Product'"
                            :pass_label="'Create'"
                            :pass_no_caps="true"
                            :pass_square="true"
                            :pass_dense="true"
                            class="custom_button"
                            />

                            <Button v-on:receiveClick="handleShowCreateSite"
                            v-if="page_function == 'edit' && tab == 'Site'"
                            :pass_label="'Create'"
                            :pass_no_caps="true"
                            :pass_square="true"
                            :pass_dense="true"
                            class="custom_button"
                            />

                            <Button v-on:receiveClick="handleShowCreateCardType"
                            v-if="page_function == 'edit' && tab == 'Card Type'"
                            :pass_label="'Create'"
                            :pass_no_caps="true"
                            :pass_square="true"
                            :pass_dense="true"
                            class="custom_button"
                            />

                            <!-- <Button v-on:receiveClick="handleShowCreateBarcode"
                            v-if="page_function == 'edit' && tab == 'Barcode'"
                            :pass_label="'Create'"
                            :pass_no_caps="true"
                            :pass_square="true"
                            :pass_dense="true"
                            class="custom_button"
                            /> -->
                          </div>
                        </q-toolbar>
                      </div>


                      <q-separator />

                      <q-tab-panels v-model="tab" :animated="false" keep-alive ref="tabs">
                        <q-tab-panel name="Product" style="padding: 0px; padding-top: 10px; color: grey; overflow: hidden">
                          <div class="row">
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom: 10px;">
                              <div style="width: 100%;">
                                <TableMerge
                                :row_per_page="[5,10,20,50,1000]"
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
                                v-on:receiveHandleEditDetails="handleShowEditChild"
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
                              </div>
                            </div>
                          </div>
                        </q-tab-panel>

                        <q-tab-panel name="Site" style="padding: 0px; padding-top: 10px; color: grey; overflow: hidden">
                          <div class="row">
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom: 10px; padding-right: 10px;">
                              <div style="width: 100%;">
                                <Table
                                :row_per_page="[5,10,20,50,1000]"
                                :title="table_title"
                                :table_data="site_table_data"
                                :table_column="site_table_column"
                                :flat_status="true"
                                :bordered_status="true"
                                v-on:receiveRequestTable="siteHandleTableChange"
                                :allow_add="false"
                                :allow_edit="true"
                                :allow_delete="false"
                                v-on:receiveHandleAdd="handleReceiveHandleAdd"
                                v-on:receiveHandleEditDetails="handleShowEditSite"
                                v-on:receiveHandleDelete="handleReceiveHandleDelete"
                                :filter_mode_on="false"
                                v-on:receiveColumnRearrange="handleColumnRearrange"
                                v-on:filter_column="handleFilterColumn"
                                :forceLoading="siteForceLoading"
                                :column_reordering="true"
                                :row_reordering="false"
                                v-on:receiveHandleClearFilter="handleClearFilter"
                                :pass_visible_columns="visibleColumns"
                                />
                              </div>
                            </div>
                          </div>
                        </q-tab-panel>

                        <q-tab-panel name="Card Type" style="padding: 0px; padding-top: 10px; color: grey">
                          <div class="row">
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom: 10px; padding-right: 10px;">
                              <div style="width: 100%;">
                                <TableMerge
                                :row_per_page="[5,10,20,50,1000]"
                                :title="table_title"
                                :table_data="ct_table_data"
                                :table_column="ct_table_column"
                                :flat_status="true"
                                :bordered_status="true"
                                v-on:receiveRequestTable="ctHandleTableChange"
                                :allow_add="false"
                                :allow_edit="true"
                                :allow_delete="false"
                                v-on:receiveHandleAdd="handleReceiveHandleAdd"
                                v-on:receiveHandleEditDetails="handleShowEditCardType"
                                v-on:receiveHandleDelete="handleReceiveHandleDelete"
                                :filter_mode_on="false"
                                v-on:receiveColumnRearrange="handleColumnRearrange"
                                v-on:filter_column="handleFilterColumn"
                                :forceLoading="ctForceLoading"
                                :column_reordering="true"
                                :row_reordering="false"
                                v-on:receiveHandleClearFilter="handleClearFilter"
                                :pass_visible_columns="visibleColumns"
                                />
                              </div>
                            </div>
                          </div>
                        </q-tab-panel>

                        <q-tab-panel name="Barcode" style="padding: 0px; padding-top: 10px; color: grey">
                          <div class="row">
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom: 10px; padding-right: 10px;">
                              <div style="width: 100%;">
                                <Table
                                :row_per_page="[5,10,20,50,1000]"
                                :title="table_title"
                                :table_data="barcode_table_data"
                                :table_column="barcode_table_column"
                                :flat_status="true"
                                :bordered_status="true"
                                v-on:receiveRequestTable="barcodeHandleTableChange"
                                :allow_add="false"
                                :allow_edit="true"
                                :allow_delete="false"
                                v-on:receiveHandleAdd="handleReceiveHandleAdd"
                                v-on:receiveHandleEditDetails="handleShowEditBarcode"
                                v-on:receiveHandleDelete="handleReceiveHandleDelete"
                                :filter_mode_on="false"
                                v-on:receiveColumnRearrange="handleColumnRearrange"
                                v-on:filter_column="handleFilterColumn"
                                :forceLoading="barcodeForceLoading"
                                :column_reordering="true"
                                :row_reordering="false"
                                v-on:receiveHandleClearFilter="handleClearFilter"
                                :pass_visible_columns="visibleColumns"
                                />
                              </div>
                            </div>
                          </div>
                        </q-tab-panel>
                      </q-tab-panels>
                    </div>
                  </div>

              </q-card-actions>

              </q-card-section>


          </q-card>

          </div>
      </q-form>

        <q-inner-loading
        :showing="showAddLoading"
        color="primary"
        />
  </div>


    <q-dialog v-model="child_dialog" persistent position="top">
      <q-card style="width: 95vw; max-width: 950px; max-height: 90vh; margin-top: 5%;">

        <q-card-section class="row items-center dialog_header_custom">
            <div v-if="child_action == 'edit'" class="text-h6">Edit Detail</div>
            <div v-else class="text-h6">Add Detail</div>
            <q-space />
            <q-btn icon="close" flat round dense :disable="child_loading" @click="closeChildDialog" />
        </q-card-section>

        <q-card-section>
          <q-form ref="save_child_form">
            <div class="row dialog_content">
              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pl-xs">
                <div class="row">

                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 q-pt-xs" style="padding-right: 10px;">
                      <div class="row" style="align-items: center;">
                          <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                              <Label :pass_value="'Itemcode'" />
                          </div>
                          <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                            <Input :readonly="page_function == 'view'" :autofocusclick="true"
                            :disable="true"
                            v-model:pass_value="jsonc.Itemcode"
                            v-on:receiveChange="handleChange"
                            :dbComponentBehavior="dbComponentBehavior.text_required"/>
                          </div>
                      </div>
                  </div>

                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 q-pt-xs">
                      <div class="row" style="align-items: center;">
                          <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                              <Label :pass_value="'Description'" />
                          </div>
                          <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                            <Input :readonly="page_function == 'view'" :autofocusclick="true"
                            :disable="true"
                            v-model:pass_value="jsonc.Description"
                            v-on:receiveChange="handleChange"
                            :dbComponentBehavior="dbComponentBehavior.text_required"/>
                          </div>
                      </div>
                  </div>
                  
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12" style="padding-right: 10px;">
                    <div class="row">

                      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                          <div class="row" style="align-items: center;">
                              <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                                  <Label :pass_value="'Current Selling Price Inc Tax'" />
                              </div>
                              <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                                <Input :readonly="page_function == 'view'" :autofocusclick="true"
                                :disable="true"
                                v-model:pass_value="jsonc.Current_Sell_include_tax"
                                v-on:receiveChange="handleChangeCurrent_Sell_include_tax"
                                :dbComponentBehavior="dbComponentBehavior.input_number"/>
                              </div>
                          </div>
                      </div>
                      
                      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                        <div class="row" style="align-items: center;">
                            <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                                <Label :pass_value="'Suggest Selling Price Inc Tax'" />
                            </div>
                            <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                              <Input :readonly="page_function == 'view'" :autofocusclick="true"
                              v-model:pass_value="jsonc.Suggest_Sell_include_tax"
                              v-on:receiveChange="handleChangeSellingPrice"
                              :dbComponentBehavior="dbComponentBehavior.input_number"/>
                            </div>
                        </div>
                      </div>

                      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                        <div class="row" style="align-items: center;">
                            <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                                <Label :pass_value="'Approve Selling Price Inc Tax'" />
                            </div>
                            <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                              <Input :readonly="page_function == 'view'" :autofocusclick="true"
                              :disable="true"
                              v-model:pass_value="jsonc.Approved_Sell_include_tax"
                              v-on:receiveChange="handleChangeSuggest_Sell_include_tax"
                              :dbComponentBehavior="dbComponentBehavior.input_number"/>
                            </div>
                        </div>
                      </div>

                    </div>
                  </div>

                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <div class="row">

                      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                          <div class="row" style="align-items: center;">
                              <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                                  <Label :pass_value="'Current Selling Price Exc Tax'" />
                              </div>
                              <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                                <Input :readonly="page_function == 'view'" :autofocusclick="true"
                                :disable="true"
                                v-model:pass_value="jsonc.Current_Sell"
                                v-on:receiveChange="handleChangeCurrent_Sell"
                                :dbComponentBehavior="dbComponentBehavior.input_number"/>
                              </div>
                          </div>
                      </div>

                      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                          <div class="row" style="align-items: center;">
                              <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                                  <Label :pass_value="'Suggest Selling Price Exc Tax'" />
                              </div>
                              <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                                <Input :readonly="page_function == 'view'" :autofocusclick="true"
                                v-model:pass_value="jsonc.Suggest_Sell"
                                v-on:receiveChange="handleChangeSellingPrice"
                                :dbComponentBehavior="dbComponentBehavior.input_number"/>
                              </div>
                          </div>
                      </div>

                      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                        <div class="row" style="align-items: center;">
                            <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                                <Label :pass_value="'Approve Selling Price Exc Tax'" />
                            </div>
                            <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                              <Input :readonly="page_function == 'view'" :autofocusclick="true"
                              :disable="true"
                              v-model:pass_value="jsonc.Approved_Sell"
                              v-on:receiveChange="null"
                              :dbComponentBehavior="dbComponentBehavior.input_number"/>
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

        <q-card-actions class="dialog_action" align="right">
          <Button v-on:receiveClick="closeChildDialog"
            v-if="page_function != 'view'"
            :pass_label="'Cancel'"
            :pass_no_caps="true"
            :pass_square="true"
            :pass_dense="true"
          />

          <Button v-on:receiveClick="saveChild"
            v-if="page_function != 'view'"
            :pass_label="'Save'"
            :pass_no_caps="true"
            :pass_square="true"
            :pass_dense="true"
            class="custom_button"
          />
        </q-card-actions>

        <q-inner-loading
          :showing="child_loading"
          color="primary"
        />
      </q-card>
    </q-dialog>

    <q-dialog v-model="site_dialog" persistent position="top">
      <q-card style="width: 95vw; max-width: 500px; max-height: 90vh; margin-top: 5%;">

        <q-card-section class="row items-center dialog_header_custom">
            <div v-if="site_action == 'edit'" class="text-h6">Edit Site</div>
            <div v-else class="text-h6">Add Site</div>
            <q-space />
            <q-btn icon="close" flat round dense :disable="site_loading" @click="closeSiteDialog" />
        </q-card-section>

        <q-card-section>
          <q-form ref="save_site_form">
            <div class="row dialog_content">
              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pl-xs">
                <div class="row">
                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                      <div class="row" style="align-items: center;">
                          <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                              <Label :pass_value="'Site'" />
                          </div>
                          <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                            <Select
                            :readonly="page_function == 'view'"
                            v-model:pass_value="sjson.LocGroup"
                            v-on:receiveChange="handleChange"
                            :dbComponentBehavior="dbComponentBehavior.text_required"
                            label=""
                            :options="branch_options"
                            />
                          </div>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </q-form>
        </q-card-section>

        <q-card-actions class="dialog_action" align="right">
          <Button v-on:receiveClick="closeSiteDialog"
            v-if="page_function != 'view'"
            :pass_label="'Cancel'"
            :pass_no_caps="true"
            :pass_square="true"
            :pass_dense="true"
          />

          <Button v-on:receiveClick="saveSite"
            v-if="page_function != 'view'"
            :pass_label="'Save'"
            :pass_no_caps="true"
            :pass_square="true"
            :pass_dense="true"
            class="custom_button"
          />
        </q-card-actions>

        <q-inner-loading
          :showing="site_loading"
          color="primary"
        />
      </q-card>
    </q-dialog>

    <q-dialog v-model="ct_dialog" persistent position="top">
      <q-card style="width: 50vw;max-width: 95vw; max-height: 90vh; margin-top: 5%;">

        <q-card-section class="row items-center dialog_header_custom">
            <div v-if="ct_action == 'edit'" class="text-h6">Edit Card Type</div>
            <div v-else class="text-h6">Add Card Type</div>
            <q-space />
            <q-btn icon="close" flat round dense :disable="ct_loading" @click="closeCtDialog" />
        </q-card-section>

        <q-card-section>
          <q-form ref="save_req4disc_form">
            <div class="row dialog_content">

              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="row">
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12" style="min-height: 36px; padding-right: 10px;">
                      <div class="row" style="align-items: center;">
                          <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                              <Label :pass_value="'Itemcode'" />
                          </div>
                          <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                            <Select
                            :readonly="page_function == 'view'"
                            v-model:pass_value="ctjson.CHILD_GUID"
                            v-on:receiveChange="handleChange"
                            :dbComponentBehavior="dbComponentBehavior.text_required"
                            label=""
                            :options="itemcode_options"
                            />
                          </div>
                      </div>
                  </div>

                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12" style="min-height: 36px; padding-right: 10px;">
                      <div class="row" style="align-items: center;">
                          <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                              <Label :pass_value="'Barcode'" />
                          </div>
                          <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                            <Select
                            :readonly="page_function == 'view'"
                            :disable="page_function != 'view'"
                            v-model:pass_value="ctjson.CHILD_GUID"
                            v-on:receiveChange="handleChange"
                            :dbComponentBehavior="dbComponentBehavior.text_required"
                            label=""
                            :options="barcode_options"
                            />
                          </div>
                      </div>
                  </div>

                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12" style="min-height: 36px; padding-right: 10px;">
                      <div class="row" style="align-items: center;">
                          <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                              <Label :pass_value="'Description'" />
                          </div>
                          <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                            <Select
                            :readonly="page_function == 'view'"
                            :disable="page_function != 'view'"
                            v-model:pass_value="ctjson.CHILD_GUID"
                            v-on:receiveChange="handleChange"
                            :dbComponentBehavior="dbComponentBehavior.text_required"
                            label=""
                            :options="description_options"
                            />
                          </div>
                      </div>
                  </div>

                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12" style="min-height: 36px; padding-right: 10px;">
                      <div class="row" style="align-items: center;">
                          <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                              <Label :pass_value="'Card Type'" />
                          </div>
                          <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                            <Select
                            :readonly="page_function == 'view'"
                            v-model:pass_value="ctjson.CardType"
                            v-on:receiveChange="handleChange"
                            :dbComponentBehavior="dbComponentBehavior.text_required"
                            label=""
                            :options="card_type_options"
                            />

                          </div>
                      </div>
                  </div>
                </div>
              </div>

              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <div class="row">

                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="min-height: 36px; padding-right: 10px;">
                      <div class="row" style="align-items: center;">
                          <div class="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-xs-12">
                              <Label :pass_value="'Disc1Type'" />
                          </div>
                          <div class="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-xs-12">
                            <Select
                            :readonly="page_function == 'view'"
                            v-model:pass_value="ctjson.Disc1Type"
                            v-on:receiveChange="handleChange"
                            :dbComponentBehavior="dbComponentBehavior.disc1type"
                            label=""
                            :options="disctype_options"
                            />
                          </div>
                      </div>
                  </div>

                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="min-height: 36px; padding-right: 10px;">
                      <div class="row" style="align-items: center;">
                          <div class="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-xs-12">
                              <Label :pass_value="'Current Disc1Value'" />
                          </div>
                          <div class="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-xs-12">
                            <Input :readonly="page_function == 'view'" :autofocusclick="true"
                            v-model:pass_value="ctjson.Current_Disc1Value"
                            v-on:receiveChange="handleChangeCurrent_Disc1Value"
                            :dbComponentBehavior="dbComponentBehavior.input_number"/>
                          </div>
                      </div>
                  </div>

                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px; padding-right: 10px;">
                      <div class="row" style="align-items: center;">
                          <div class="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-xs-12">
                              <Label :pass_value="'Suggest Disc1Value'" />
                          </div>
                          <div class="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-xs-12">
                            <Input :readonly="page_function == 'view'" :autofocusclick="true"
                            v-model:pass_value="ctjson.Suggest_Disc1Value"
                            v-on:receiveChange="handleChangeSuggest_Disc1Value"
                            :dbComponentBehavior="dbComponentBehavior.input_number"/>
                          </div>
                      </div>
                  </div>

                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px; padding-right: 10px;">
                      <div class="row" style="align-items: center;">
                          <div class="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-xs-12">
                              <Label :pass_value="'Approve Disc1Value'" />
                          </div>
                          <div class="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-xs-12">
                            <Input :readonly="page_function == 'view'" :autofocusclick="true"
                            v-model:pass_value="ctjson.Approved_Disc1Value"
                            v-on:receiveChange="handleChangeApproved_Disc1Value"
                            :dbComponentBehavior="dbComponentBehavior.input_number"/>
                          </div>
                      </div>
                  </div>

                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px; padding-right: 10px;">
                      <div class="row" style="align-items: center;">
                          <div class="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-xs-12">
                              <Label :pass_value="'Diff Disc1Value'" />
                          </div>
                          <div class="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-xs-12">
                            <Input :readonly="page_function == 'view'" :autofocusclick="true"
                            v-model:pass_value="ctjson.Diff_Disc1Value"
                            v-on:receiveChange="handleChangeDiff_Disc1Value"
                            :dbComponentBehavior="dbComponentBehavior.input_number_no_require"/>
                          </div>
                      </div>
                  </div>
                </div>
              </div>

              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <div class="row">
                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px; padding-right: 10px;">
                      <div class="row" style="align-items: center;">
                          <div class="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-xs-12">
                              <Label :pass_value="'Disc2Type'" />
                          </div>
                          <div class="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-xs-12">
                            <Select
                            :readonly="page_function == 'view'"
                            v-model:pass_value="ctjson.Disc2Type"
                            v-on:receiveChange="handleChange"
                            :dbComponentBehavior="dbComponentBehavior.disc2type"
                            label=""
                            :options="disctype_options"
                            />
                          </div>
                      </div>
                  </div>

                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px; padding-right: 10px;">
                      <div class="row" style="align-items: center;">
                          <div class="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-xs-12">
                              <Label :pass_value="'Current Disc2Value'" />
                          </div>
                          <div class="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-xs-12">
                            <Input :readonly="page_function == 'view'" :autofocusclick="true"
                            v-model:pass_value="ctjson.Current_Disc2Value"
                            v-on:receiveChange="handleChangeCurrent_Disc2Value"
                            :dbComponentBehavior="dbComponentBehavior.input_number"/>
                          </div>
                      </div>
                  </div>

                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px; padding-right: 10px;">
                      <div class="row" style="align-items: center;">
                          <div class="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-xs-12">
                              <Label :pass_value="'Suggest Disc2Value'" />
                          </div>
                          <div class="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-xs-12">
                            <Input :readonly="page_function == 'view'" :autofocusclick="true"
                            v-model:pass_value="ctjson.Suggest_Disc2Value"
                            v-on:receiveChange="handleChangeSuggest_Disc2Value"
                            :dbComponentBehavior="dbComponentBehavior.input_number"/>
                          </div>
                      </div>
                  </div>

                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px; padding-right: 10px;">
                      <div class="row" style="align-items: center;">
                          <div class="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-xs-12">
                              <Label :pass_value="'Approve Disc2Value'" />
                          </div>
                          <div class="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-xs-12">
                            <Input :readonly="page_function == 'view'" :autofocusclick="true"
                            v-model:pass_value="ctjson.Approved_Disc2Value"
                            v-on:receiveChange="handleChangeApproved_Disc2Value"
                            :dbComponentBehavior="dbComponentBehavior.input_number"/>
                          </div>
                      </div>
                  </div>

                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px; padding-right: 10px;">
                      <div class="row" style="align-items: center;">
                          <div class="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-xs-12">
                              <Label :pass_value="'Diff Disc2Value'" />
                          </div>
                          <div class="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-xs-12">
                            <Input :readonly="page_function == 'view'" :autofocusclick="true"
                            v-model:pass_value="ctjson.Diff_Disc2Value"
                            v-on:receiveChange="handleChangeDiff_Disc2Value"
                            :dbComponentBehavior="dbComponentBehavior.input_number_no_require"/>
                          </div>
                      </div>
                  </div>

                </div>
              </div>
            </div>
          </q-form>
        </q-card-section>

        <q-card-actions class="dialog_action" align="right">
          <Button v-on:receiveClick="closeCtDialog"
            v-if="page_function != 'view'"
            :pass_label="'Cancel'"
            :pass_no_caps="true"
            :pass_square="true"
            :pass_dense="true"
          />

          <Button v-on:receiveClick="saveCt"
            v-if="page_function != 'view'"
            :pass_label="'Save'"
            :pass_no_caps="true"
            :pass_square="true"
            :pass_dense="true"
            class="custom_button"
          />
        </q-card-actions>

        <q-inner-loading
          :showing="ct_loading"
          color="primary"
        />
      </q-card>
    </q-dialog>

    <q-dialog v-model="barcode_dialog" persistent position="top">
      <q-card style="width: 95vw; max-width: 500px; max-height: 90vh; margin-top: 5%;">

        <q-card-section class="row items-center dialog_header_custom">
            <div v-if="barcode_action == 'edit'" class="text-h6">Edit Barcode</div>
            <div v-else class="text-h6">Add Barcode</div>
            <q-space />
            <q-btn icon="close" flat round dense :disable="barcode_loading" @click="closeBarcodeDialog" />
        </q-card-section>

        <q-card-section>
          <q-form ref="save_barcode_form_barcode">
            <div class="row dialog_content">
              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pl-xs">
                <div class="row">

                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                      <div class="row" style="align-items: center;">
                          <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                              <Label :pass_value="'Itemcode'" />
                          </div>
                          <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                            <Select
                            :readonly="page_function == 'view'"
                            v-model:pass_value="bcjson.CHILD_GUID"
                            v-on:receiveChange="handleChangeItemcode"
                            :dbComponentBehavior="dbComponentBehavior.text_required"
                            label=""
                            :options="itemcode_options"
                            />
                          </div>
                      </div>
                  </div>

                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                      <div class="row" style="align-items: center;">
                          <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                              <Label :pass_value="'Description'" />
                          </div>
                          <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                            <Input
                            :disable="page_function != 'view'"
                            :readonly="page_function == 'view'"
                            :autofocusclick="true"
                            v-model:pass_value="bcjson.BarDesc"
                            v-on:receiveChange="handleChange"
                            :dbComponentBehavior="dbComponentBehavior.text_required"/>
                          </div>
                      </div>
                  </div>

                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                      <div class="row" style="align-items: center;">
                          <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                              <Label :pass_value="'Barcode'" />
                          </div>
                          <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                            <Input
                            :readonly="page_function == 'view'"
                            :autofocusclick="true"
                            v-model:pass_value="bcjson.Barcode"
                            v-on:receiveChange="handleChange"
                            :dbComponentBehavior="dbComponentBehavior.text_required"/>
                          </div>
                      </div>
                  </div>

                </div>
              </div>
            </div>
          </q-form>
        </q-card-section>

        <q-card-actions class="dialog_action" align="right">
          <Button v-on:receiveClick="closeBarcodeDialog"
            v-if="page_function != 'view'"
            :pass_label="'Cancel'"
            :pass_no_caps="true"
            :pass_square="true"
            :pass_dense="true"
          />

          <Button v-on:receiveClick="saveBarcode"
            v-if="page_function != 'view'"
            :pass_label="'Save'"
            :pass_no_caps="true"
            :pass_square="true"
            :pass_dense="true"
            class="custom_button"
          />
        </q-card-actions>

        <q-inner-loading
          :showing="barcode_loading"
          color="primary"
        />
      </q-card>
    </q-dialog>

    <q-dialog v-model="item_dialog" persistent position="top">
      <q-card style="width: 95vw; max-width: 1100px; max-height: 90vh; margin-top: 5%;">

        <q-card-section class="row items-center dialog_header_custom">
            <div class="text-h6">Item</div>
            <q-space />
            <q-btn icon="close" flat round dense :disable="item_loading" @click="closeItemDialog" />
        </q-card-section>

        <q-card-section>
          <q-form ref="save_branch_form">
            <div class="row dialog_content">
              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="row">
                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                      <div class="row" style="align-items: center;">
                          <div class="offset-md-3 col-xl-1 col-lg-1 col-md-1 col-sm-2 col-xs-2 q-pb-sm">
                              <Label :pass_value="'Search'" />
                          </div>
                          <div class="col-xl-2 col-lg-2 col-md-2 col-sm-5 col-xs-5 q-pl-xs q-pb-sm">
                            <Select
                            v-model:pass_value="search_type"
                            v-on:receiveChange="handleChangeSearchType"
                            :dbComponentBehavior="dbComponentBehavior.select"
                            label=""
                            :options="search_type_options"
                            />
                          </div>
                          <div class="col-xl-2 col-lg-2 col-md-2 col-sm-5 col-xs-5 q-pl-xs q-pb-sm">
                            <Input :autofocusclick="true"
                            v-model:pass_value="search_value"
                            v-on:keyup.enter="showSearchTable"
                            v-on:receiveChange="handleChangeSearchValue"
                            :dbComponentBehavior="dbComponentBehavior.text"/>
                          </div>
                          <div class="col-xl-1 col-lg-1 col-md-1 col-sm-5 col-xs-5 q-pl-xs q-pb-sm">
                            <Button :disable="false" v-on:receiveClick="showSearchTable"
                            :pass_label="''"
                            :pass_no_caps="true"
                            :pass_square="true"
                            :pass_dense="true"
                            :pass_flat="true"
                            :tooltip="true"
                            :pass_tooltip="'Search Item'"
                            style="font-size: 12px; background-color: #094161; color: white;"
                            :pass_icon="'search'"
                            />
                          </div>
                      </div>
                  </div>
                </div>
              </div>

              <div v-if="show_table" class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pl-xs">
                <div style="width: 100%;">
                  <Table
                  :row_per_page="[5,10,20,50,1000]"
                  :title="table_title"
                  :table_data="item_table_data"
                  :table_column="item_table_column"
                  :flat_status="true"
                  :bordered_status="true"
                  v-on:receiveRequestTable="itemHandleTableChange"
                  :allow_add="false"
                  :allow_edit="true"
                  :allow_delete="false"
                  :allow_select="true"
                  v-on:receiveHandleAdd="handleReceiveHandleAdd"
                  v-on:receiveHandleEdit="handleSelectItem"
                  v-on:receiveHandleEditDetails="handleEditBranch"
                  v-on:receiveHandleDelete="handleReceiveHandleDelete"
                  :filter_mode_on="false"
                  v-on:receiveColumnRearrange="handleColumnRearrange"
                  v-on:filter_column="handleFilterColumn"
                  :forceLoading="itemForceLoading"
                  :column_reordering="true"
                  :row_reordering="false"
                  v-on:receiveHandleClearFilter="handleClearFilter"
                  :pass_visible_columns="visibleColumns"
                  />
                </div>
              </div>
            </div>
          </q-form>
        </q-card-section>

        <q-card-actions class="dialog_action" align="right">
            <Button v-on:receiveClick="closeItemDialog"
              v-if="page_function != 'view'"
              :pass_label="'Cancel'"
              :pass_no_caps="true"
              :pass_square="true"
              :pass_dense="true"
            />

            <Button v-on:receiveClick="addItem"
              v-if="page_function != 'view'"
              :pass_label="'Save'"
              :pass_no_caps="true"
              :pass_square="true"
              :pass_dense="true"
              class="custom_button"
            />
        </q-card-actions>

        <q-inner-loading
          :showing="item_loading"
          color="primary"
        />
      </q-card>
    </q-dialog>
</template>

<script>
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
import TableMerge from 'src/components/ERP/Table/TableMerge.vue';

export default {
data() {
  return{
    dept_options: [],
    subdept_options: [],
    category_options: [],
    item_dialog: false,
    show_table: false,
    item_loading: false,
    item_ori_params: {},
    item_table_data: [],
    item_table_column: [],
    itemForceLoading: false,
    card_type_options: [
      {
        label: 'MEMBER',
        value: 'MEMBER',
      },
      {
        label: 'STAFF',
        value: 'STAFF',
      }
    ],
    itemcode_options: [],
    disctype_options: [
    {
        label: "%",
        value: "%"
      },
      {
        label: "$",
        value: "$"
      },
    ],
    search_type_options: [
      {
        label: 'ArticleNo',
        value: 'ArticleNo'
      },
      {
        label: 'Barcode',
        value: 'Barcode'
      },
      // {
      //   label: 'Description',
      //   value: 'Description'
      // },
      {
        label: 'Itemcode',
        value: 'Itemcode'
      },
    ],
    branch_options: [],
    jsonc: {
      Itemcode: '',
      barcode: '',
      Description: '',
      Approved: 0,
      Rejected: 0,
      Current_Sell_include_tax: '0.00',
      Suggest_Sell_include_tax: '0.00',
      Approved_Sell_include_tax: '0.00',
      Own_calculate: '',
      Dept: '',
      SubDept: '',
      Category: '',
      Consign: 0,
      SoldbyWeight: 0,
      Current_Sell: '',
      Suggest_Sell: '',
      Approved_Sell: '',
      listed_cur_gp: '',
      listed_sug_gp: '',
      listed_app_gp: '',
      avg_cur_gp: '',
      avg_sug_gp: '',
      avg_app_gp: '',
      last_cur_gp: '',
      last_sug_gp: '',
      last_app_gp: '',
      CREATED_AT: '',
      CREATED_BY: '',
      UPDATED_AT: '',
      UPDATED_BY: '',
    },
    site_dialog: false,
    site_action: null,
    site_loading: false,
    sjson: {
      LocGroup: '',
      name: '',
    },
    barcode_dialog: false,
    barcode_action: null,
    barcode_loading: false,
    bcjson: {},
    ct_dialog: false,
    ct_action: null,
    ct_loading: false,
    ctjson: {},
    page_count: 1,
    ori_payload: {},
    child_dialog: false,
    child_loading: false,
    child_action: 'create',
    showAddLoading: false,
    visibleColumns: [],
    step: 1,
    tab: 'Product',
    json: {},
    forceLoading: false,
    ori_params: {},
    table_column: [],
    table_data: [],
    siteForceLoading: false,
    site_ori_params: {},
    site_table_column: [],
    site_table_data: [],
    productForceLoading: false,
    product_ori_params: {},
    product_table_column: [],
    product_table_data: [],
    ctForceLoading: false,
    ct_ori_params: {},
    ct_table_column: [],
    ct_table_data: [],
    barcodeForceLoading: false,
    barcode_ori_params: {},
    barcode_table_column: [],
    barcode_table_data: [],
    language: sessionStorage.getItem("language") != "" && sessionStorage.getItem("language") != "null" && sessionStorage.getItem("language") != null ? sessionStorage.getItem("language") : [],
    session_outlet_guid: sessionStorage.getItem("session_outlet_guid") != "" && sessionStorage.getItem("session_outlet_guid") != "null" && sessionStorage.getItem("session_outlet_guid") != null ? sessionStorage.getItem("session_outlet_guid") : [],
    getuser: sessionStorage.getItem("getuser") != "" && sessionStorage.getItem("getuser") != "null" && sessionStorage.getItem("getuser") != null ? sessionStorage.getItem("getuser") : [],
    offset: 0,
    total_row: 0,
    page_function: null,
    disable_previous_button: true,
    disable_next_button: true,
    RefNo: '',
    TRANS_GUID: '',
    rearrange_column: [],
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
  TableMerge,
},
computed: {
  dbComponentBehavior() {
   return this.$store.getters['dbComponentBehavior/byLanguage']('erp')
  },
},
async created(){

  // console.log(this.$route);
  var TRANS_GUID = this.$route.query.TRANS_GUID;

  if(TRANS_GUID)
  {
      this.page_function = 'edit'
      this.TRANS_GUID = TRANS_GUID;
  }
  else
  {
      this.page_function = 'create'
      this.showAddLoading = false;
  }

  var TRANS_GUID = this.$route.query.TRANS_GUID;

  if(TRANS_GUID)
  {
    if(this.$route.name == 'PriceChangeDetailsView')
    {
      this.page_function = 'view'
      
      var json = {
        name: this.$route.name,
        query: this.$route.query,
      };

      sessionStorage.setItem("original_route", JSON.stringify(json));
    }
    else if(this.$route.name == 'PriceChangeDetails')
    {
      this.page_function = 'edit'
    }

    this.TRANS_GUID = TRANS_GUID;

  }
  else
  {
    if(this.$route.name == 'PriceChangeDetails')
    {
      this.page_function = 'create'
      this.showAddLoading = false;
    }
    else
    {
      alert('Parameter incorrect');
      this.$router.push("Itemmaster");
      return;
    }
  }


},
async mounted(){
  this.showAddLoading = true;
  this.branch_options = await this.getBranch();
  var active_tab = JSON.parse(JSON.stringify(this.tab));

  await this.discoverTabs(active_tab, 'hide');

  var offset = Number(this.$route.query.offset);
  var total_row = Number(this.$route.query.total_row);

  if(this.TRANS_GUID)
  {
    if(this.$route.name == 'PriceChangeDetailsView')
    {
      this.page_function = 'view'
    }
    else
    {
      this.page_function = 'edit'
    }

    await this.trigger_search_supcus()
  }
  else
  {
    this.page_function = 'create'
    this.showAddLoading = false;
  }

    if(offset !== null && offset !== undefined && offset !== '' && total_row !== null && total_row !== undefined && total_row !== '')
    {
        this.offset = offset;
        this.total_row = total_row;

        this.disable_previous_button = offset <= '0' ? true : false;
        this.disable_next_button = offset >= total_row ? true : false;
    }

},
methods:{
    handleChangeSellingPrice()
    {

      var Suggest_Sell_include_tax = jsonc.Suggest_Sell_include_tax;
      var Suggest_Sell = jsonc.Suggest_Sell;

    },
    handleChangeCurrent_Disc1Value(newVal)
    {
      this.ctjson.Current_Disc1Value = this.formatAmount(newVal, '$');
      // console.log(this.ctjson.Current_Disc1Value)
    },
    handleChangeSuggest_Disc1Value(newVal)
    {
      this.ctjson.Suggest_Disc1Value = this.formatAmount(newVal, '$');
    },
    handleChangeApproved_Disc1Value(newVal)
    {
      this.ctjson.Approved_Disc1Value = this.formatAmount(newVal, '$');
    },
    handleChangeDiff_Disc1Value(newVal)
    {
      this.ctjson.Diff_Disc1Value = this.formatAmount(newVal, '$');
    },
    handleChangeCurrent_Disc2Value(newVal)
    {
      this.ctjson.Current_Disc2Value = this.formatAmount(newVal, '$');
    },
    handleChangeSuggest_Disc2Value(newVal)
    {
      this.ctjson.Suggest_Disc2Value = this.formatAmount(newVal, '$');
    },
    handleChangeApproved_Disc2Value(newVal)
    {
      this.ctjson.Approved_Disc2Value = this.formatAmount(newVal, '$');
    },
    handleChangeDiff_Disc2Value(newVal)
    {
      this.ctjson.Diff_Disc2Value = this.formatAmount(newVal, '$');
    },
    // handleCancel()
    // {
    //   var TRANS_GUID = this.$route.query.prev_TRANS_GUID;
    //   var offset = this.$route.query.prev_offset;
    //   var total_row = this.$route.query.prev_total_row;

    //   this.$router.push({
    //     name: 'PriceChangeDetailsView',
    //     query: { TRANS_GUID: TRANS_GUID, offset: offset, total_row: total_row }
    //   })

    //   this.page_function == 'view';
    // },
    handleCancel()
    {
      var route = JSON.parse(sessionStorage.getItem("original_route"));
      
      this.$router.push({
        name: route.name,
        query: route.query
      });
      
    },
    handleSelectItem(row)
    {
      this.$nextTick(()=>{
        for(var i in this.item_table_data.data.results)
        {
          var new_row =  this.item_table_data.data.results[i]
          new_row.select = false;
        }

        row.row.select = true;
      })
    },
    handleChangeItemcode(newVal)
    {
      var filter = this.itemcode_options.filter((entry)=>{
        return entry.value == newVal
      })

      this.bcjson.Barcode = filter[0].barcode;
      this.bcjson.BarDesc = filter[0].Description;
    },
    handleChangeEffectiveDate(newVal)
    {
      this.json.EffectiveDate = newVal;
    },
    handleChangeCurrent_Sell_include_tax(newVal)
    {
      this.jsonc.Current_Sell_include_tax = this.formatAmount(newVal,'$');
    },
    handleChangeSuggest_Sell_include_tax(newVal)
    {
      this.jsonc.Suggest_Sell_include_tax = this.formatAmount(newVal,'$');
    },
    handleChangeApproved_Sell_include_tax(newVal)
    {
      this.jsonc.Approved_Sell_include_tax = this.formatAmount(newVal,'$');
    },
    handleChangeOwn_calculate(newVal)
    {
      this.jsonc.Own_calculate = this.formatAmount(newVal,'$');
    },
    handleChangeCurrent_Sell(newVal)
    {
      this.jsonc.Current_Sell = this.formatAmount(newVal,'$');
    },
    handleChangeSuggest_Sell(newVal)
    {
      this.jsonc.Suggest_Sell = this.formatAmount(newVal,'$');
    },
    handleChangeApproved_Sell(newVal)
    {
      this.jsonc.Approved_Sell = this.formatAmount(newVal,'$');
    },
    handleChangelisted_cur_gp(newVal)
    {
      this.jsonc.listed_cur_gp = this.formatAmount(newVal,'$');
    },
    handleChangelisted_sug_gp(newVal)
    {
      this.jsonc.listed_sug_gp = this.formatAmount(newVal,'$');
    },
    handleChangelisted_app_gp(newVal)
    {
      this.jsonc.listed_app_gp = this.formatAmount(newVal,'$');
    },
    handleChangeavg_cur_gp(newVal)
    {
      this.jsonc.avg_cur_gp = this.formatAmount(newVal,'$');
    },
    handleChangeavg_sug_gp(newVal)
    {
      this.jsonc.avg_sug_gp = this.formatAmount(newVal,'$');
    },
    handleChangeavg_app_gp(newVal)
    {
      this.jsonc.avg_app_gp = this.formatAmount(newVal,'$');
    },
    handleChangelast_cur_gp(newVal)
    {
      this.jsonc.last_cur_gp = this.formatAmount(newVal,'$');
    },
    handleChangelast_sug_gp(newVal)
    {
      this.jsonc.last_sug_gp = this.formatAmount(newVal,'$');
    },
    handleChangelast_app_gp(newVal)
    {
      this.jsonc.last_app_gp = this.formatAmount(newVal,'$');
    },
    handleEdit()
    {
      var offset = this.$route.query.offset;
      var total_row = this.$route.query.total_row;

      this.$router.push({
          name: "PriceChangeDetails",
          query: { TRANS_GUID: this.TRANS_GUID, offset: offset, total_row: total_row}
      });

    },
    handleAdd()
    {
      this.$router.push({
        name: "PriceChangeDetails",
        query: { prev_TRANS_GUID: this.TRANS_GUID, prev_offset: this.offset, prev_total_row: this.total_row}
      });
      this.page_function = 'create'

    },
    handleChangePackSize(newVal)
    {
      this.jsonc.PackSize = this.formatAmount(newVal, '$')
    },
    handleChangeBulkQty(newVal)
    {
      this.jsonc.BulkQty = this.formatAmount(newVal, 'qty')
    },
    handleChangeQty(newVal)
    {
      this.jsonc.Qty = this.formatAmount(newVal, 'qty')
    },
    handleChangeQty_foc(newVal)
    {
      this.jsonc.Qty_foc = this.formatAmount(newVal, 'qty')
    },
    handleChangeUnitPrice(newVal)
    {
      this.jsonc.UnitPrice = this.formatAmount(newVal, '$')
    },
    handleChangeDiscAmt(newVal)
    {
      this.jsonc.DiscAmt = this.formatAmount(newVal, '$')
    },
    handleChangeDisc1Value(newVal)
    {
      this.jsonc.Disc1Value = this.formatAmount(newVal, '$')
    },
    handleChangeDisc2Value(newVal)
    {
      this.jsonc.Disc2Value = this.formatAmount(newVal, '$')
    },
    handleChangeNetUnitPrice(newVal)
    {
      this.jsonc.NetUnitPrice = this.formatAmount(newVal, '$')
    },
    handleChangeTotalPrice(newVal)
    {
      this.jsonc.TotalPrice = this.formatAmount(newVal, '$')
    },
    handleChangerebate_value(newVal)
    {
      this.jsonc.rebate_value = this.formatAmount(newVal, '$')
    },
    handleChangeprice_future(newVal)
    {
      this.jsonc.price_future = this.formatAmount(newVal, '$')
    },
    handleChangeCostCentre(newVal)
    {
      this.json.SubDeptCode = newVal;
    },
    handleChangeGross(newVal)
    {
      this.json.gross = this.formatAmount(newVal, '$');
    },
    handleChangeRebate(newVal)
    {
      this.json.rebate_amt = this.formatAmount(newVal, '$');
    },
    handleChangeTotalExcTax(newVal)
    {
      this.json.total_exclude_tax = this.formatAmount(newVal, '$');
    },
    handleChangeTax(newVal)
    {
      this.json.tax = this.formatAmount(newVal, '$');
    },
    handleChangeTotalIncTax(newVal)
    {
      this.json.total_include_tax = this.formatAmount(newVal, '$');
    },
    handleChangeExpiryDate(newVal)
    {
      this.json.expiry_date = newVal;
    },
    handleChangeRemark(newVal)
    {
      this.json.Remark = newVal;
    },
    handleChangeSupplier(newVal)
    {
      this.json.SCode = newVal;

      var filter = this.supplier_options.filter((entry)=>{
        return entry.value == newVal
      })

      this.json.SName = filter[0].name
    },
    handleChangeDeliverDate(newVal)
    {
      this.json.DeliverDate = newVal;
    },
    handleChangePoDate(newVal)
    {
      this.json.PODate = newVal;
    },
    async getDept()
    {
      var payload = {
        "pass_json": {
          "language": this.language,
          "outlet_guid": this.session_outlet_guid,
          "limit": '9999999',
          "sort_by": "Code",
          "sort_type": "asc",
        },
      };

      var ary = [];

      var object_pass = {
          "dispatch": 'setup/trigger_post_read_department', //refer to path/function_name in store actions.js
          "getter": 'setup/get_read_department', //refer to path/function_name in store getters.js
          "app": this, //compulsory passed variable
          "payload": payload //payload that needed to use in store actions.js
      };

      var dispatch_response = await this.$dispatch(object_pass);
      var ary = [];

      if(dispatch_response.status)
      {
        var results = dispatch_response.response.detail;
        if(results && results.length > 0)
        {
          for(var i in results)
          {
            var new_row = results[i]
            var obj = {
              label: new_row.Code + ' - ' + new_row.Description,
              value: new_row.Code,
            }

            ary.push(obj)
          }
        }
        return ary;
      }
      else
      {
        var error_message = 'Failed to get Dept. Please try again.';
        this.showNotify("negative", error_message);
        return ary;
      }
    },
    async getSubDept()
    {
      var payload = {
        "pass_json": {
          "language": this.language,
          "outlet_guid": this.session_outlet_guid,
          "limit": '9999999',
          "sort_by": "Code",
          "sort_type": "asc",
          "MCode": this.jsonc.Dept
        },
      };

      var ary = [];

      var object_pass = {
          "dispatch": 'setup/trigger_post_read_subdept', //refer to path/function_name in store actions.js
          "getter": 'setup/get_read_subdept', //refer to path/function_name in store getters.js
          "app": this, //compulsory passed variable
          "payload": payload //payload that needed to use in store actions.js
      };

      var dispatch_response = await this.$dispatch(object_pass);
      var ary = [];

      if(dispatch_response.status)
      {
        var results = dispatch_response.response.detail;
        if(results && results.length > 0)
        {
          for(var i in results)
          {
            var new_row = results[i]
            var obj = {
              label: new_row.Code + ' - ' + new_row.Description,
              value: new_row.Code,
            }

            ary.push(obj)
          }
        }
        return ary;
      }
      else
      {
        var error_message = 'Failed to get SubDept. Please try again.';
        this.showNotify("negative", error_message);
        return ary;
      }
    },
    async getCategory()
    {
      var payload = {
        "pass_json": {
          "language": this.language,
          "outlet_guid": this.session_outlet_guid,
          "limit": '9999999',
          "sort_by": "Code",
          "sort_type": "asc",
          "MCode": this.jsonc.SubDept
        },
      };

      var ary = [];

      var object_pass = {
          "dispatch": 'setup/trigger_post_read_category', //refer to path/function_name in store actions.js
          "getter": 'setup/get_read_category', //refer to path/function_name in store getters.js
          "app": this, //compulsory passed variable
          "payload": payload //payload that needed to use in store actions.js
      };

      var dispatch_response = await this.$dispatch(object_pass);
      var ary = [];

      if(dispatch_response.status)
      {
        var results = dispatch_response.response.detail;
        if(results && results.length > 0)
        {
          for(var i in results)
          {
            var new_row = results[i]
            var obj = {
              label: new_row.Code + ' - ' + new_row.Description,
              value: new_row.Code,
            }

            ary.push(obj)
          }
        }
        return ary;
      }
      else
      {
        var error_message = 'Failed to get Category. Please try again.';
        this.showNotify("negative", error_message);
        return ary;
      }
    },
    async getLocation(payload)
    {
      var payload = {
        "pass_json": {
          "type": "S",
          "language": this.language,
          "outlet_guid": this.session_outlet_guid,
          "limit": '9999999',
          "sort_by": "Code",
          "sort_type": "asc"
        },
      };

      var ary = [];

      return await this.$store.dispatch('purchase/trigger_read_location_list', payload).then(() => {
        var data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_read_location_list']));
        // console.log(data)
        if(data.data && data.data.length > 0)
        {
          for(var i in data.data)
          {
            var new_row = data.data[i]
            var obj = {
              label: new_row.Code + ' - ' + new_row.Description,
              value: new_row.Code,
            }

            ary.push(obj)
          }
        }
        else
        {
          ary = [];
        }
        // console.log(ary)
        return ary;
      });
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
                "skip": offset,
                "limit": 1,
                "outlet_guid": this.session_outlet_guid,
                "language": this.language,
                "ordering": "-Updated_at",
                "sort_by": "Updated_at",
                "sort_type": "Desc",
            }
        };

        var new_TRANS_GUID = await this.getTRANSGUID(payload);
        //here should call api and refetch data

        this.offset = offset;
        this.disable_previous_button = this.offset <= '0' ? true : false;
        this.disable_next_button = this.offset >= this.total_row ? true : false;

        if(this.page_function == 'edit')
        {
          this.$router.push({
            name: 'PriceChangeDetails',
            query: { TRANS_GUID: new_TRANS_GUID, offset: offset, total_row: this.total_row }
          })
        }
        else if(this.page_function == 'view')
        {
          this.$router.push({
            name: 'PriceChangeDetailsView',
            query: { TRANS_GUID: new_TRANS_GUID, offset: offset, total_row: this.total_row }
          })
        }
    },
    handleChangeBranch(newVal)
    {
      var filter = this.branch_options.filter((entry)=>{
        return entry.value == newVal
      })

      this.json.loc_group = filter[0].value;
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
                value: new_row.BRANCH_CODE,
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
                value: new_row.BRANCH_CODE,
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
    async saveChild()
    {
        if(this.json.Post_Req == 1)
        {
            this.showNotify("negative","This Doc already posted.");
            return;
        }

        var validate = await this.validate_form("save_child_form");

        if(!validate)
        {
            this.showNotify("negative","Please make sure all field is correct.");
            this.showAddLoading = false;
            return;
        }

        this.showAddLoading = true;
        this.child_loading = true;

        var Itemcode = this.jsonc.Itemcode;
        var barcode = this.jsonc.barcode;
        var Description = this.jsonc.Description;
        var Approved = this.jsonc.Approved;
        var Rejected = this.jsonc.Rejected;
        var Current_Sell_include_tax = this.unformatAmount(this.jsonc.Current_Sell_include_tax);
        var Suggest_Sell_include_tax = this.unformatAmount(this.jsonc.Suggest_Sell_include_tax);
        var Approved_Sell_include_tax = this.unformatAmount(this.jsonc.Approved_Sell_include_tax);
        var Own_calculate = this.unformatAmount(this.jsonc.Own_calculate);
        var Dept = this.jsonc.Dept;
        var SubDept = this.jsonc.SubDept;
        var Category = this.jsonc.Category;
        var Consign = this.jsonc.Consign;
        var SoldbyWeight = this.jsonc.SoldbyWeight;
        var Current_Sell = this.unformatAmount(this.jsonc.Current_Sell);
        var Suggest_Sell = this.unformatAmount(this.jsonc.Suggest_Sell);
        var Approved_Sell = this.unformatAmount(this.jsonc.Approved_Sell);
        var listed_cur_gp = this.unformatAmount(this.jsonc.listed_cur_gp);
        var listed_sug_gp = this.unformatAmount(this.jsonc.listed_sug_gp);
        var listed_app_gp = this.unformatAmount(this.jsonc.listed_app_gp);
        var avg_cur_gp = this.unformatAmount(this.jsonc.avg_cur_gp);
        var avg_sug_gp = this.unformatAmount(this.jsonc.avg_sug_gp);
        var avg_app_gp = this.unformatAmount(this.jsonc.avg_app_gp);
        var last_cur_gp = this.unformatAmount(this.jsonc.last_cur_gp);
        var last_sug_gp = this.unformatAmount(this.jsonc.last_sug_gp);
        var last_app_gp = this.unformatAmount(this.jsonc.last_app_gp);
        var UPDATED_BY = this.getuser;

        var payload = {
            pass_json: {
              outlet_guid: this.session_outlet_guid,
              TRANS_GUID: this.TRANS_GUID,
              Itemcode: Itemcode,
              barcode: barcode,
              Description: Description,
              Approved: Approved,
              Rejected: Rejected,
              Current_Sell_include_tax: Current_Sell_include_tax,
              Suggest_Sell_include_tax: Suggest_Sell_include_tax,
              Approved_Sell_include_tax: Approved_Sell_include_tax,
              Own_calculate: Own_calculate,
              Dept: Dept,
              SubDept: SubDept,
              Category: Category,
              Consign: Consign,
              SoldbyWeight: SoldbyWeight,
              Current_Sell: Current_Sell,
              Suggest_Sell: Suggest_Sell,
              Approved_Sell: Approved_Sell,
              listed_cur_gp: listed_cur_gp,
              listed_sug_gp: listed_sug_gp,
              listed_app_gp: listed_app_gp,
              avg_cur_gp: avg_cur_gp,
              avg_sug_gp: avg_sug_gp,
              avg_app_gp: avg_app_gp,
              last_cur_gp: last_cur_gp,
              last_sug_gp: last_sug_gp,
              last_app_gp: last_app_gp,
              UPDATED_BY: UPDATED_BY,
            }
        }

        var object_pass = {};

        if(this.child_action == 'create')
        {
            // payload.pass_json.CREATED_BY = this.getuser;

            object_pass = {
              "dispatch": 'product/trigger_post_create_price_change_req2item',
              "getter": 'product/get_price_change_req2item_status',
              "app": this,
              "payload": payload,
            };
        }
        else if(this.child_action == 'edit')
        {
            payload.pass_json.CHILD_GUID = this.jsonc.CHILD_GUID;

            object_pass = {
              "dispatch": 'product/trigger_post_update_price_change_req2item',
              "getter": 'product/get_price_change_req2item_status',
              "app": this,
              "payload": payload,
            };
        }

        var dispatch_response = await this.$dispatch(object_pass);

        if (dispatch_response.status) {
            // success condition
            var success_message = this.child_action == 'create' ? 'Created Successfully.' : 'Edited Successfully.';
            this.showNotify("positive", success_message);
            this.product_table_function(this.product_ori_params);
            this.showAddLoading = false;
            this.child_loading = false;
            this.child_action = null;
            this.child_dialog = false;
            this.jsonc = {
              Itemcode: '',
              Description: '',
              Barcode: '',
              PackSize: '',
              ArticleNo: '',
              BulkQty: '',
              OrderLotSize: '',
              Qty: '',
              Qty_foc: '',
              UnitPrice: '',
              DiscAmt: '',
              Disc1Type: '',
              Disc1Value: '',
              Disc2Type: '',
              Disc2Value: '',
              NetUnitPrice: '',
              TotalPrice: '',
              rebate_value: '',
              price_future: '',
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
            this.child_loading = false;
        }
    },
    async saveSite()
    {
        if(this.json.Post_Req == 1)
        {
            this.showNotify("negative","This Doc already posted.");
            return;
        }

        var validate = await this.validate_form("save_site_form");

        if(!validate)
        {
            this.showNotify("negative","Please make sure all field is correct.");
            this.showAddLoading = false;
            return;
        }

        this.showAddLoading = true;
        this.site_loading = true;

        var LocGroup = this.sjson.LocGroup;
        var name = this.sjson.name;
        var posted_by = this.getuser;

        var payload = {
            pass_json: {
              outlet_guid: this.session_outlet_guid,
              TRANS_GUID: this.TRANS_GUID,
              LocGroup: LocGroup,
              name: name,
              posted_by: posted_by,
            }
        }

        var object_pass = {};

        if(this.site_action == 'create')
        {
            payload.pass_json.CREATED_BY = this.getuser;

            object_pass = {
              "dispatch": 'product/trigger_post_create_price_change_req1loc',  // endpoint hardcoded
              "getter": 'product/get_price_change_req1loc_status',             // getter hardcoded
              "app": this,
              "payload": payload,
            };
        }
        else if(this.site_action == 'edit')
        {
            payload.pass_json.LOC_GUID = this.sjson.LOC_GUID;

            object_pass = {
              "dispatch": 'product/trigger_post_update_price_change_req1loc',  // endpoint hardcoded
              "getter": 'product/get_price_change_req1loc_status',             // getter hardcoded
              "app": this,
              "payload": payload,
            };
        }

        var dispatch_response = await this.$dispatch(object_pass);

        if (dispatch_response.status) {
            // success condition
            var success_message = this.site_action == 'create' ? 'Created Successfully.' : 'Edited Successfully.';
            this.showNotify("positive", success_message);
            this.site_table_function(this.site_ori_params);
            this.showAddLoading = false;
            this.site_loading = false;
            this.site_action = null;
            this.site_dialog = false;
            this.sjson = {
              LocGroup: '',
              name: '',
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
            this.site_loading = false;
        }
    },
    async saveCt()
    {
        if(this.json.Post_Req == 1)
        {
            this.showNotify("negative","This Doc already posted.");
            return;
        }

        var validate = await this.validate_form("save_req4disc_form");

        if(!validate)
        {
            this.showNotify("negative","Please make sure all field is correct.");
            this.showAddLoading = false;
            return;
        }

        this.showAddLoading = true;
        this.ct_loading = true;
        var CHILD_GUID = this.ctjson.CHILD_GUID;
        var barcode = this.ctjson.barcode;
        var Description = this.ctjson.Description;
        var CardType = this.ctjson.CardType;
        var Disc1Type = this.ctjson.Disc1Type;
        var Current_Disc1Value = this.unformatAmount(this.ctjson.Current_Disc1Value);
        var Suggest_Disc1Value = this.unformatAmount(this.ctjson.Suggest_Disc1Value);
        var Approved_Disc1Value = this.unformatAmount(this.ctjson.Approved_Disc1Value);
        // var Diff_Disc1Value = this.unformatAmount(this.ctjson.Diff_Disc1Value);
        var Disc2Type = this.ctjson.Disc2Type;
        var Current_Disc2Value = this.unformatAmount(this.ctjson.Current_Disc2Value);
        var Suggest_Disc2Value = this.unformatAmount(this.ctjson.Suggest_Disc2Value);
        var Approved_Disc2Value = this.unformatAmount(this.ctjson.Approved_Disc2Value);
        // var Diff_Disc2Value = this.unformatAmount(this.ctjson.Diff_Disc2Value);
        var Updated_by = this.getuser;

        var payload = {
            pass_json: {
              outlet_guid: this.session_outlet_guid,
              TRANS_GUID: this.TRANS_GUID,
              CHILD_GUID: CHILD_GUID,
              barcode: barcode,
              Description: Description,
              CardType: CardType,
              Disc1Type: Disc1Type,
              Current_Disc1Value: Current_Disc1Value,
              Suggest_Disc1Value: Suggest_Disc1Value,
              Approved_Disc1Value: Approved_Disc1Value,
              // Diff_Disc1Value: Diff_Disc1Value,
              Disc2Type: Disc2Type,
              Current_Disc2Value: Current_Disc2Value,
              Suggest_Disc2Value: Suggest_Disc2Value,
              Approved_Disc2Value: Approved_Disc2Value,
              // Diff_Disc2Value: Diff_Disc2Value,
              Updated_by: Updated_by,
            }
        }

        var object_pass = {};

        if(this.ct_action == 'create')
        {
            payload.pass_json.Created_by = this.getuser;

            object_pass = {
              "dispatch": 'product/trigger_post_create_price_change_req4disc',  // endpoint hardcoded
              "getter": 'product/get_price_change_req4disc_status',             // getter hardcoded
              "app": this,
              "payload": payload,
            };
        }
        else if(this.ct_action == 'edit')
        {
            payload.pass_json.DISC_GUID = this.ctjson.DISC_GUID;

            object_pass = {
              "dispatch": 'product/trigger_post_update_price_change_req4disc',  // endpoint hardcoded
              "getter": 'product/get_price_change_req4disc_status',             // getter hardcoded
              "app": this,
              "payload": payload,
            };
        }

        var dispatch_response = await this.$dispatch(object_pass);

        if (dispatch_response.status) {
            // success condition
            var success_message = this.ct_action == 'create' ? 'Created Successfully.' : 'Edited Successfully.';
            this.showNotify("positive", success_message);
            this.ct_table_function(this.ct_ori_params);
            this.showAddLoading = false;
            this.ct_loading = false;
            this.ct_action = null;
            this.ct_dialog = false;
            this.jsonc = {
              Itemcode: '',
              Description: '',
              Barcode: '',
              PackSize: '',
              ArticleNo: '',
              BulkQty: '',
              OrderLotSize: '',
              Qty: '',
              Qty_foc: '',
              UnitPrice: '',
              DiscAmt: '',
              Disc1Type: '',
              Disc1Value: '',
              Disc2Type: '',
              Disc2Value: '',
              NetUnitPrice: '',
              TotalPrice: '',
              rebate_value: '',
              price_future: '',
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
            this.ct_loading = false;
        }
    },
    async saveBarcode()
    {
        if(this.json.Post_Req == 1)
        {
            this.showNotify("negative","This Doc already posted.");
            return;
        }

        var validate = await this.validate_form("save_barcode_form_barcode");

        if(!validate)
        {
            this.showNotify("negative","Please make sure all field is correct.");
            this.showAddLoading = false;
            return;
        }

        this.showAddLoading = true;
        this.barcode_loading = true;
        var CHILD_GUID = this.bcjson.CHILD_GUID;
        var Barcode = this.bcjson.Barcode;
        var BarDesc = this.bcjson.BarDesc;
        var Updated_by = this.getuser;

        var payload = {
            pass_json: {
              outlet_guid: this.session_outlet_guid,
              TRANS_GUID: this.TRANS_GUID,
              CHILD_GUID: CHILD_GUID,
              Barcode: Barcode,
              BarDesc: BarDesc,
              Updated_by: Updated_by,
            }
        }

        var object_pass = {};

        if(this.barcode_action == 'create')
        {
            payload.pass_json.Created_by = this.getuser;

            object_pass = {
              "dispatch": 'product/trigger_post_create_price_change_req3bar',  // endpoint hardcoded
              "getter": 'product/get_price_change_req3bar_status',             // getter hardcoded
              "app": this,
              "payload": payload,
            };
        }
        else if(this.barcode_action == 'edit')
        {
            payload.pass_json.BAR_GUID = this.bcjson.BAR_GUID;

            object_pass = {
              "dispatch": 'product/trigger_post_update_price_change_req3bar',  // endpoint hardcoded
              "getter": 'product/get_price_change_req3bar_status',             // getter hardcoded
              "app": this,
              "payload": payload,
            };
        }

        var dispatch_response = await this.$dispatch(object_pass);

        if (dispatch_response.status) {
            // success condition
            var success_message = this.barcode_action == 'create' ? 'Created Successfully.' : 'Edited Successfully.';
            this.showNotify("positive", success_message);
            this.barcode_table_function(this.barcode_ori_params);
            this.showAddLoading = false;
            this.barcode_loading = false;
            this.barcode_action = null;
            this.barcode_dialog = false;
            this.bcjson = {
              Barcode: '',
              BarDesc: ''
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
            this.barcode_loading = false;
        }
    },
    handleChangePurchaseLimit(newVal)
    {
        this.jsonc.limit_control_amt = this.formatAmount(newVal, '$');
    },
    closeChildDialog()
    {
      this.child_dialog = false;
      this.child_action = null;
    },
    closeSiteDialog()
    {
      this.site_dialog = false;
      this.site_action = null;
      this.sjson = {
        LocGroup: '',
        name: '',
      };
    },
    closeCtDialog()
    {
      this.ct_dialog = false;
      this.ct_action = null;
    },
    closeBarcodeDialog()
    {
      this.barcode_dialog = false;
      this.barcode_action = null;
      this.bcjson = {
        Barcode: '',
        BarDesc: ''
      };
    },
    handleChangeSearchValue()
    {
      this.item_table_data = [];
      this.show_table = false;
    },
    handleChangeSearchType()
    {
      this.$nextTick(()=>{
        this.item_table_data = [];
        this.show_table = false;

        setTimeout(()=>{
          if(this.search_value)
          {
            this.show_table = true;
          }
        }, 500)
      })
    },
    handleShowCreateChild()
    {
        this.child_dialog = true;
        this.child_action = 'create';
        this.jsonc = {
          Itemcode: '',
          barcode: '',
          Description: '',
          Approved: 0,
          Rejected: 0,
          Current_Sell_include_tax: '0.00',
          Suggest_Sell_include_tax: '0.00',
          Approved_Sell_include_tax: '0.00',
          Own_calculate: '',
          Dept: '',
          SubDept: '',
          Category: '',
          Consign: 0,
          SoldbyWeight: 0,
          Current_Sell: '',
          Suggest_Sell: '',
          Approved_Sell: '',
          listed_cur_gp: '',
          listed_sug_gp: '',
          listed_app_gp: '',
          avg_cur_gp: '',
          avg_sug_gp: '',
          avg_app_gp: '',
          last_cur_gp: '',
          last_sug_gp: '',
          last_app_gp: '',
          CREATED_AT: '',
          CREATED_BY: '',
          UPDATED_AT: '',
          UPDATED_BY: '',
        }
    },
    showSearchTable()
    {
      if(!this.search_value)
      {
        this.showNotify('negative', 'Please enter search value.')
        this.show_table = false;
        return;
      }

      this.show_table = true;
    },
    showSearchDialog()
    {
      if(this.json.Post_Req == 1)
      {
          this.showNotify("negative",this.$language('C0012'));//"This Doc already posted."
          return;
      }

      this.item_dialog = true;
      this.search_supplier = false;
      this.search_value = '';
      this.search_type = 'Barcode';
      this.show_table = false;

        // this.child_dialog = true;
        // this.child_action = 'create';
        this.jsonc = {
          Itemcode: '',
          barcode: '',
          Description: '',
          Approved: 0,
          Rejected: 0,
          Current_Sell_include_tax: '0.00',
          Suggest_Sell_include_tax: '0.00',
          Approved_Sell_include_tax: '0.00',
          Own_calculate: '',
          Dept: '',
          SubDept: '',
          Category: '',
          Consign: 0,
          SoldbyWeight: 0,
          Current_Sell: '',
          Suggest_Sell: '',
          Approved_Sell: '',
          listed_cur_gp: '',
          listed_sug_gp: '',
          listed_app_gp: '',
          avg_cur_gp: '',
          avg_sug_gp: '',
          avg_app_gp: '',
          last_cur_gp: '',
          last_sug_gp: '',
          last_app_gp: '',
          CREATED_AT: '',
          CREATED_BY: '',
          UPDATED_AT: '',
          UPDATED_BY: '',
        }
    },
    itemHandleTableChange: function(newVal)
    {
          var new_params = this.$pluginsTableParams(newVal)

          var payload = {
              params : new_params
          };

          this.item_ori_params = payload;
          this.item_table_function(payload);
    },
    async item_table_function(ori_params){
      this.itemForceLoading = true;
        var payload = ori_params.params
        payload.skip = payload.offset;
        payload.limit = payload.limit;
        payload.outlet_guid = this.session_outlet_guid;//session
        payload.language = this.language;
        payload.user = this.getuser;
        payload[this.search_type] = this.search_value;

                // if(this.rearrange_column.length > 0)
        // {
        //     var table_column = this.rearrange_column;
        // }
        // else
        // {
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
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
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
                  headerStyle: 'text-align: center; width: 1%;',
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
              },
              {
                  name: 'cat_desc',
                  required: true,
                  label: 'Cat.Desc',
                  align: 'left',
                  sortable: true,
                  field: 'cat_desc',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center; width: 1%; color: red;',
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
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
                  headerStyle: 'text-align: center; width: 1%;',
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
              },
              {
                  name: 'PackSize',
                  required: true,
                  label: 'P/Size',
                  align: 'right',
                  sortable: true,
                  field: 'PackSize',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center; width: 1%;',
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
              },
              {
                  name: 'LastCost',
                  required: true,
                  label: 'L/Cost',
                  align: 'right',
                  sortable: true,
                  field: 'LastCost',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center; width: 1%;',
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
              },
              {
                  name: 'StdCost',
                  required: true,
                  label: 'List Cost',
                  align: 'right',
                  sortable: true,
                  field: 'StdCost',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center; width: 1%;',
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
              },
              {
                  name: 'AverageCost',
                  required: true,
                  label: 'A/Cost',
                  align: 'right',
                  sortable: true,
                  field: 'AverageCost',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center; width: 1%;',
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
              },
              {
                  name: 'SellingPrice',
                  required: true,
                  label: 'S/Price',
                  align: 'right',
                  sortable: true,
                  field: 'SellingPrice',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center; width: 1%;',
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
              },
              {
                  name: 'mrank',
                  required: true,
                  label: 'Rank',
                  align: 'left',
                  sortable: true,
                  field: 'mrank',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center; width: 1%;',
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
              },
              {
                  name: 'mavg',
                  required: true,
                  label: 'Avg Qty',
                  align: 'right',
                  sortable: true,
                  field: 'mavg',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center; width: 1%;',
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
              },
              {
                  name: 'period_qty',
                  required: true,
                  label: 'Period Qty',
                  align: 'right',
                  sortable: true,
                  field: 'period_qty',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center; width: 1%; color: red;',
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
              },
              {
                  name: 'OnHandQty',
                  required: true,
                  label: 'QoH',
                  align: 'left',
                  sortable: true,
                  field: 'OnHandQty',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center; width: 1%;',
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
              },
              {
                  name: 'cartonprice',
                  required: true,
                  label: 'Ctn Price',
                  align: 'right',
                  sortable: true,
                  field: 'cartonprice',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center; width: 1%;',
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
              },
              {
                  name: 'UM',
                  required: true,
                  label: 'UM',
                  align: 'left',
                  sortable: true,
                  field: 'UM',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center; width: 1%;',
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
              },
              {
                  name: 'Size',
                  required: true,
                  label: 'Size',
                  align: 'left',
                  sortable: true,
                  field: 'Size',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center; width: 1%;',
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
              },
              {
                  name: 'Colour',
                  required: true,
                  label: 'Color',
                  align: 'left',
                  sortable: true,
                  field: 'Colour',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center; width: 1%;',
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
              },
              {
                  name: 'Brand',
                  required: true,
                  label: 'Brand',
                  align: 'left',
                  sortable: true,
                  field: 'Brand',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center; width: 1%;',
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
              },
              {
                  name: 'BulkQty',
                  required: true,
                  label: 'Bulk Qty',
                  align: 'right',
                  sortable: true,
                  field: 'BulkQty',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center; width: 1%;',
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
              },
              {
                  name: 'UMBulk',
                  required: true,
                  label: 'Bulk UM',
                  align: 'left',
                  sortable: true,
                  field: 'UMBulk',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center; width: 1%;',
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
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
                  headerStyle: 'text-align: center; width: 1%;',
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
              },
              // {
              //     name: 'dept_desc',
              //     required: true,
              //     label: 'Dept.Desc',
              //     align: 'left',
              //     sortable: true,
              //     field: 'dept_desc',
              //     format_child: '',
              //     tooltip: '',
              //     headerStyle: 'text-align: center; width: 1%; color: red;',
              //     filter_type: 'input',
              //     filter_options: [],
              //     filter_value: '',
              // },
              {
                  name: 'SubDept',
                  required: true,
                  label: 'SubDept',
                  align: 'left',
                  sortable: true,
                  field: 'SubDept',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center; width: 1%;',
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
              },
              // {
              //     name: 'subdept_desc',
              //     required: true,
              //     label: 'Subdept.Desc',
              //     align: 'left',
              //     sortable: true,
              //     field: 'subdept_desc',
              //     format_child: '',
              //     tooltip: '',
              //     headerStyle: 'text-align: center; width: 1%; color: red;',
              //     filter_type: 'input',
              //     filter_options: [],
              //     filter_value: '',
              // },
              {
                  name: 'Category',
                  required: true,
                  label: 'Category',
                  align: 'left',
                  sortable: true,
                  field: 'Category',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center; width: 1%;',
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
              },
              {
                  name: 'ItemLink',
                  required: true,
                  label: 'ItemLink',
                  align: 'left',
                  sortable: true,
                  field: 'ItemLink',
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
                this.item_table_data = {
                  "data": {
                      "count": 0,
                      "next": null,
                      "previous": null,
                      "results": []
                  }
                };
            }

        // }

        this.item_table_column = table_column;

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
            payload.ordering = "Itemcode"
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
            "dispatch": 'product/trigger_post_get_itemmaster_for_price_change', //refer to path/function_name in store actions.js
            "getter": 'product/get_itemmaster_for_price_change', //refer to path/function_name in store getters.js
            "app": this, //compulsory passed variable
            "payload": payload //payload that needed to use in store actions.js
        };

        var dispatch_response = await this.$dispatch(object_pass);

        if(dispatch_response.status)
        {
            //success condition
            var results = dispatch_response.response.detail;

            for(var i in results)
            {
              results[i].select = false;
            }

            this.item_table_data =
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

            //fail condition
            this.item_table_data = {
                "data": {
                    "count": 0,
                    "next": null,
                    "previous": null,
                    "results": []
                }
            };
        }


        this.itemForceLoading = false;
    },
    async addItem()
    {

      if(!this.item_table_data.data)
      {
        this.showNotify('negative', 'Please select row to continue');
        return;
      }

      var selected_row = this.item_table_data.data.results.find(row => row.select === true);

      if(!selected_row)
      {
        this.showNotify('negative', 'Please select row to continue');
        return;
      }

      this.item_loading = true;
      // if(!this.json.PODate)
      // {
      //   this.showNotify('negative', 'Please fill in PO date to continue');
      //   return;
      // }

      console.log(selected_row)
      var VendorCode = selected_row.vendor_code;
      var Itemcode = selected_row.Itemcode;
      var barcode = selected_row.barcode;
      var Description = selected_row.Description;
      var Approved = selected_row.Approved;
      var Rejected = selected_row.Rejected;
      var Current_Sell_include_tax = selected_row.Current_Sell_include_tax;
      var Suggest_Sell_include_tax = selected_row.Suggest_Sell_include_tax;
      var Approved_Sell_include_tax = selected_row.Approved_Sell_include_tax;
      var Own_calculate = selected_row.Own_calculate;
      var Dept = selected_row.Dept;
      var SubDept = selected_row.SubDept;
      var Category = selected_row.Category;
      var Consign = selected_row.Consign;
      var SoldbyWeight = selected_row.SoldbyWeight;
      var Current_Sell = selected_row.Current_Sell;
      var Suggest_Sell = selected_row.Suggest_Sell;
      var Approved_Sell = selected_row.Approved_Sell;
      var listed_cur_gp = selected_row.listed_cur_gp;
      var listed_sug_gp = selected_row.listed_sug_gp;
      var listed_app_gp = selected_row.listed_app_gp;
      var avg_cur_gp = selected_row.avg_cur_gp;
      var avg_sug_gp = selected_row.avg_sug_gp;
      var avg_app_gp = selected_row.avg_app_gp;
      var last_cur_gp = selected_row.last_cur_gp;
      var last_sug_gp = selected_row.last_sug_gp;
      var last_app_gp = selected_row.last_app_gp;
      var CREATED_BY = this.getuser;
      var UPDATED_BY = this.getuser;

      var payload = {
        pass_json: {
          VendorCode: VendorCode,
          TRANS_GUID: this.TRANS_GUID,
          Itemcode: Itemcode,
          barcode: barcode,
          Description: Description,
          Approved: Approved,
          Rejected: Rejected,
          Current_Sell_include_tax: Current_Sell_include_tax,
          Suggest_Sell_include_tax: Suggest_Sell_include_tax,
          Approved_Sell_include_tax: Approved_Sell_include_tax,
          Own_calculate: Own_calculate,
          Dept: Dept,
          SubDept: SubDept,
          Category: Category,
          Consign: Consign,
          SoldbyWeight: SoldbyWeight,
          Current_Sell: Current_Sell,
          Suggest_Sell: Suggest_Sell,
          Approved_Sell: Approved_Sell,
          listed_cur_gp: listed_cur_gp,
          listed_sug_gp: listed_sug_gp,
          listed_app_gp: listed_app_gp,
          avg_cur_gp: avg_cur_gp,
          avg_sug_gp: avg_sug_gp,
          avg_app_gp: avg_app_gp,
          last_cur_gp: last_cur_gp,
          last_sug_gp: last_sug_gp,
          last_app_gp: last_app_gp,
          CREATED_BY: CREATED_BY,
          UPDATED_BY: UPDATED_BY,
        }
      }

      // var payload = {
      //   "pass_json": {
      //     "itemcode": selected_row.Itemcode,
      //     "outlet": this.outlet_code,
      //     "user": this.getuser,
      //     "outlet_guid": this.session_outlet_guid,
      //     "skip": 0,
      //     "limit": 1,
      //     "language": this.language,
      //   },
      // };

      var object_pass = {
        "dispatch": 'product/trigger_post_create_price_change_req2item',
        "getter": 'product/get_price_change_req2item_status',
        "app": this,
        "payload": payload,
      };

      var dispatch_response = await this.$dispatch(object_pass);

      if(dispatch_response.status){
        var success_message = 'Created Successfully.';
        this.showNotify("positive", success_message);
        this.product_table_function(this.product_ori_params);
        this.showAddLoading = false;
        this.item_loading = false;
        this.item_dialog = false;
        this.search_supplier = false;
        this.search_value = '';
        this.search_type = 'Barcode';
        this.item_table_data = [];
        this.item_table_column = [];
      }
      else
      {
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
        this.item_loading = false;
      }

    },
    closeItemDialog()
    {
      this.item_dialog = false;
      this.search_supplier = false;
      this.search_value = '';
      this.search_type = 'Barcode';
      this.item_table_data = [];
      this.item_table_column = [];
    },
    handleShowCreateSite()
    {
      this.site_dialog = true;
      this.site_action = 'create';
      this.sjson = {
        LocGroup: '',
        name: '',
      }
    },
    handleShowCreateCardType()
    {
        this.ct_dialog = true;
        this.ct_action = 'create';
        this.ctjson = {
          Itemcode: '',
          barcode: '',
          Description: '',
          CardType: '',
          Disc1Type: '%',
          Current_Disc1Value: '0.00',
          Suggest_Disc1Value: '0.00',
          Approved_Disc1Value: '0.00',
          // Diff_Disc1Value: '0.00',
          Disc2Type: '%',
          Current_Disc2Value: '0.00',
          Suggest_Disc2Value: '0.00',
          Approved_Disc2Value: '0.00',
          // Diff_Disc2Value: '0.00',
        };
    },
    handleShowCreateBarcode()
    {
      this.barcode_dialog = true;
      this.barcode_action = 'create';
      this.bcjson = {
        Barcode: '',
        BarDesc: ''
      }
    },
    async handleShowEditChild(row)
    {
      this.child_dialog = true;
      this.child_action = 'edit';
      this.child_loading = true;
      this.jsonc = JSON.parse(JSON.stringify(row.row));

      this.dept_options = await this.getDept();
      this.subdept_options = await this.getSubDept();
      this.category_options = await this.getCategory();
      this.child_loading = false;
    },
    handleShowEditSite(row)
    {
      this.site_dialog = true;
      this.site_action = 'edit';
      this.site_loading = true;
      this.sjson = JSON.parse(JSON.stringify(row.row));
      this.site_loading = false;
    },
    handleShowEditCardType(row)
    {
      this.ct_dialog = true;
      this.ct_action = 'edit';
      this.ct_loading = true;
      this.ctjson = JSON.parse(JSON.stringify(row.row));
      this.ct_loading = false;
    },
    handleShowEditBarcode(row)
    {
      this.barcode_dialog = true;
      this.barcode_action = 'edit';
      this.barcode_loading = true;
      this.bcjson = JSON.parse(JSON.stringify(row.row));
      this.barcode_loading = false;
    },
    productHandleTableChange: function(newVal)
    {
        var new_params = this.$pluginsTableParams(newVal)

        var payload = {
            params : new_params
        };


        this.product_ori_params = JSON.parse(JSON.stringify(payload));

        this.product_table_function(payload);
    },
    async product_table_function(ori_params){

        this.productForceLoading = true;

        if(this.$route.query.TRANS_GUID)
        {
          var payload = ori_params.params
          payload.skip = payload.offset;
          payload.limit = payload.limit;
          payload.outlet_guid = this.session_outlet_guid;//session
          payload.language = this.language;
          payload.TRANS_GUID = this.TRANS_GUID;

          var table_column = [
            {
              name: 'action',
              required: true,
              label: this.$language('D0028'),
              align: 'center',
              sortable: true,
              field: 'action',
              format_child: '',
              tooltip: '',
              headerStyle: 'text-align: center; width: 1%;',
              filter_type: 'input',
              filter_options: [],
              filter_value: '',
              main_column: true,
              main_column_name: '',
              index: '',
              colspan: 0,
              colspan_name: '',
              start_index: 0,
              end_index: 0,
              rowspan: '2',
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
              headerStyle: 'text-align: center; width: 1%;',
              filter_type: 'input',
              filter_options: [],
              filter_value: '',
              main_column: true,
              main_column_name: '',
              index: '',
              colspan: 0,
              colspan_name: '',
              start_index: 0,
              end_index: 0,
              rowspan: '2',
            },
            {
              name: 'barcode',
              required: true,
              label: 'Barcode',
              align: 'left',
              sortable: true,
              field: 'barcode',
              format_child: '',
              tooltip: '',
              headerStyle: 'text-align: center; width: 1%;',
              filter_type: 'input',
              filter_options: [],
              filter_value: '',
              main_column: true,
              main_column_name: '',
              index: '',
              colspan: 0,
              colspan_name: '',
              start_index: 0,
              end_index: 0,
              rowspan: '2',
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
              headerStyle: 'text-align: center; width: 1%;',
              filter_type: 'input',
              filter_options: [],
              filter_value: '',
              main_column: true,
              main_column_name: '',
              index: '',
              colspan: 0,
              colspan_name: '',
              start_index: 0,
              end_index: 0,
              rowspan: '2',
            },
            {
              name: 'Approved',
              required: true,
              label: 'Approve',
              align: 'center',
              sortable: true,
              field: 'Approved',
              format_child: '',
              tooltip: '',
              headerStyle: 'text-align: center; width: 1%;',
              filter_type: 'input',
              filter_options: [],
              filter_value: '',
              main_column: true,
              main_column_name: '',
              index: '',
              colspan: 0,
              colspan_name: '',
              start_index: 0,
              end_index: 0,
              rowspan: '2',
            },
            {
              name: 'Rejected',
              required: true,
              label: 'Reject',
              align: 'center',
              sortable: true,
              field: 'Rejected',
              format_child: '',
              tooltip: '',
              headerStyle: 'text-align: center; width: 1%;',
              filter_type: 'input',
              filter_options: [],
              filter_value: '',
              main_column: true,
              main_column_name: '',
              index: '',
              colspan: 0,
              colspan_name: '',
              start_index: 0,
              end_index: 0,
              rowspan: '2',
            },
            {
              name: 'Current_Sell_include_tax',
              required: true,
              label: 'Current',
              align: 'right',
              sortable: true,
              field: 'Current_Sell_include_tax',
              format_child: '',
              tooltip: '',
              headerStyle: 'text-align: center; width: 1%;',
              filter_type: 'input',
              filter_options: [],
              filter_value: '',
              main_column: true,
              main_column_name: '',
              index: '',
              colspan: 4,
              colspan_name: 'Selling Price Inc Tax',
              start_index: 0,
              end_index: 0,
              rowspan: '',
            },
            {
              name: 'Suggest_Sell_include_tax',
              required: true,
              label: 'Suggest',
              align: 'right',
              sortable: true,
              field: 'Suggest_Sell_include_tax',
              format_child: '',
              tooltip: '',
              headerStyle: 'text-align: center; width: 1%;',
              filter_type: 'input',
              filter_options: [],
              filter_value: '',
              main_column: false,
              main_column_name: '',
              index: '',
              colspan: 0,
              colspan_name: '',
              start_index: '',
              end_index: '',
              rowspan: '',
            },
            {
              name: 'Approved_Sell_include_tax',
              required: true,
              label: 'Approve',
              align: 'right',
              sortable: true,
              field: 'Approved_Sell_include_tax',
              format_child: '',
              tooltip: '',
              headerStyle: 'text-align: center; width: 1%;',
              filter_type: 'input',
              filter_options: [],
              filter_value: '',
              main_column: false,
              main_column_name: '',
              index: '',
              colspan: 0,
              colspan_name: '',
              start_index: '',
              end_index: '',
              rowspan: '',
            },
            {
              name: 'Own_calculate',
              required: true,
              label: 'Diff (NA)',
              align: 'right',
              sortable: true,
              field: 'Own_calculate',
              format_child: '',
              tooltip: '',
              headerStyle: 'text-align: center; width: 1%; color: red',
              filter_type: 'input',
              filter_options: [],
              filter_value: '',
              main_column: false,
              main_column_name: '',
              index: '',
              colspan: 0,
              colspan_name: '',
              start_index: '',
              end_index: '',
              rowspan: '',
            },
            {
              name: 'table_Dept',
              required: true,
              label: 'Dept',
              align: 'left',
              sortable: true,
              field: 'table_Dept',
              format_child: '',
              tooltip: '',
              headerStyle: 'text-align: center; width: 1%;',
              filter_type: 'input',
              filter_options: [],
              filter_value: '',
              main_column: true,
              main_column_name: '',
              index: '',
              colspan: 3,
              colspan_name: 'Hierarchy',
              start_index: 0,
              end_index: 0,
              rowspan: '',
            },
            {
              name: 'table_SubDept',
              required: true,
              label: 'Sub-Dept',
              align: 'left',
              sortable: true,
              field: 'table_SubDept',
              format_child: '',
              tooltip: '',
              headerStyle: 'text-align: center; width: 1%;',
              filter_type: 'input',
              filter_options: [],
              filter_value: '',
              main_column: false,
              main_column_name: '',
              index: '',
              colspan: 0,
              colspan_name: '',
              start_index: '',
              end_index: '',
              rowspan: '',
            },
            {
              name: 'table_Category',
              required: true,
              label: 'Category',
              align: 'left',
              sortable: true,
              field: 'table_Category',
              format_child: '',
              tooltip: '',
              headerStyle: 'text-align: center; width: 1%;',
              filter_type: 'input',
              filter_options: [],
              filter_value: '',
              main_column: false,
              main_column_name: '',
              index: '',
              colspan: 0,
              colspan_name: '',
              start_index: '',
              end_index: '',
              rowspan: '',
            },
            {
              name: 'Consign',
              required: true,
              label: 'Consign',
              align: 'center',
              sortable: true,
              field: 'Consign',
              format_child: '',
              tooltip: '',
              headerStyle: 'text-align: center; width: 1%;',
              filter_type: 'input',
              filter_options: [],
              filter_value: '',
              main_column: true,
              main_column_name: '',
              index: '',
              colspan: 0,
              colspan_name: '',
              start_index: 0,
              end_index: 0,
              rowspan: '2',
            },
            {
              name: 'SoldbyWeight',
              required: true,
              label: 'Catch Weight',
              align: 'center',
              sortable: true,
              field: 'SoldbyWeight',
              format_child: '',
              tooltip: '',
              headerStyle: 'text-align: center; width: 1%;',
              filter_type: 'input',
              filter_options: [],
              filter_value: '',
              main_column: true,
              main_column_name: '',
              index: '',
              colspan: 0,
              colspan_name: '',
              start_index: 0,
              end_index: 0,
              rowspan: '2',
            },
            {
              name: 'Current_Sell',
              required: true,
              label: 'Current',
              align: 'right',
              sortable: true,
              field: 'Current_Sell',
              format_child: '',
              tooltip: '',
              headerStyle: 'text-align: center; width: 1%;',
              filter_type: 'input',
              filter_options: [],
              filter_value: '',
              main_column: true,
              main_column_name: '',
              index: '',
              colspan: 3,
              colspan_name: 'Selling Price Exc Tax',
              start_index: 0,
              end_index: 0,
              rowspan: '',
            },
            {
              name: 'Suggest_Sell',
              required: true,
              label: 'Suggest',
              align: 'right',
              sortable: true,
              field: 'Suggest_Sell',
              format_child: '',
              tooltip: '',
              headerStyle: 'text-align: center; width: 1%;',
              filter_type: 'input',
              filter_options: [],
              filter_value: '',
              main_column: false,
              main_column_name: 'Current_Sell',
              index: '',
              colspan: 0,
              colspan_name: '',
              start_index: '',
              end_index: '',
              rowspan: '',
            },
            {
              name: 'Approved_Sell',
              required: true,
              label: 'Approve',
              align: 'right',
              sortable: true,
              field: 'Approved_Sell',
              format_child: '',
              tooltip: '',
              headerStyle: 'text-align: center; width: 1%;',
              filter_type: 'input',
              filter_options: [],
              filter_value: '',
              main_column: false,
              main_column_name: 'Current_Sell',
              index: '',
              colspan: 0,
              colspan_name: '',
              start_index: '',
              end_index: '',
              rowspan: '',
            },
            {
              name: 'listed_cur_gp',
              required: true,
              label: 'Cur GP%',
              align: 'right',
              sortable: true,
              field: 'listed_cur_gp',
              format_child: '',
              tooltip: '',
              headerStyle: 'text-align: center; width: 1%; color: red',
              filter_type: 'input',
              filter_options: [],
              filter_value: '',
              main_column: true,
              main_column_name: '',
              index: '',
              colspan: 3,
              colspan_name: 'Listed Cost',
              start_index: 0,
              end_index: 0,
              rowspan: '',
            },
            {
              name: 'listed_sug_gp',
              required: true,
              label: 'Sug GP%',
              align: 'right',
              sortable: true,
              field: 'listed_sug_gp',
              format_child: '',
              tooltip: '',
              headerStyle: 'text-align: center; width: 1%; color: red',
              filter_type: 'input',
              filter_options: [],
              filter_value: '',
              main_column: false,
              main_column_name: '',
              index: '',
              colspan: 0,
              colspan_name: '',
              start_index: '',
              end_index: '',
              rowspan: '',
            },
            {
              name: 'listed_app_gp',
              required: true,
              label: 'App GP%',
              align: 'right',
              sortable: true,
              field: 'listed_app_gp',
              format_child: '',
              tooltip: '',
              headerStyle: 'text-align: center; width: 1%; color: red',
              filter_type: 'input',
              filter_options: [],
              filter_value: '',
              main_column: false,
              main_column_name: '',
              index: '',
              colspan: 0,
              colspan_name: '',
              start_index: '',
              end_index: '',
              rowspan: '',
            },
            {
              name: 'avg_cur_gp',
              required: true,
              label: 'Cur GP%',
              align: 'right',
              sortable: true,
              field: 'avg_cur_gp',
              format_child: '',
              tooltip: '',
              headerStyle: 'text-align: center; width: 1%; color: red',
              filter_type: 'input',
              filter_options: [],
              filter_value: '',
              main_column: true,
              main_column_name: '',
              index: '',
              colspan: 3,
              colspan_name: 'Average Cost',
              start_index: 0,
              end_index: 0,
              rowspan: '',
            },
            {
              name: 'avg_sug_gp',
              required: true,
              label: 'Sug GP%',
              align: 'right',
              sortable: true,
              field: 'avg_sug_gp',
              format_child: '',
              tooltip: '',
              headerStyle: 'text-align: center; width: 1%; color: red',
              filter_type: 'input',
              filter_options: [],
              filter_value: '',
              main_column: false,
              main_column_name: '',
              index: '',
              colspan: 0,
              colspan_name: '',
              start_index: '',
              end_index: '',
              rowspan: '',
            },
            {
              name: 'avg_app_gp',
              required: true,
              label: 'App GP%',
              align: 'right',
              sortable: true,
              field: 'avg_app_gp',
              format_child: '',
              tooltip: '',
              headerStyle: 'text-align: center; width: 1%; color: red',
              filter_type: 'input',
              filter_options: [],
              filter_value: '',
              main_column: false,
              main_column_name: '',
              index: '',
              colspan: 0,
              colspan_name: '',
              start_index: '',
              end_index: '',
              rowspan: '',
            },
            {
              name: 'last_cur_gp',
              required: true,
              label: 'Cur GP%',
              align: 'right',
              sortable: true,
              field: 'last_cur_gp',
              format_child: '',
              tooltip: '',
              headerStyle: 'text-align: center; width: 1%; color: red',
              filter_type: 'input',
              filter_options: [],
              filter_value: '',
              main_column: true,
              main_column_name: '',
              index: '',
              colspan: 3,
              colspan_name: 'Last Cost',
              start_index: 0,
              end_index: 0,
              rowspan: '',
            },
            {
              name: 'last_sug_gp',
              required: true,
              label: 'Sug GP%',
              align: 'right',
              sortable: true,
              field: 'last_sug_gp',
              format_child: '',
              tooltip: '',
              headerStyle: 'text-align: center; width: 1%; color: red',
              filter_type: 'input',
              filter_options: [],
              filter_value: '',
              main_column: false,
              main_column_name: '',
              index: '',
              colspan: 0,
              colspan_name: '',
              start_index: '',
              end_index: '',
              rowspan: '',
            },
            {
              name: 'last_app_gp',
              required: true,
              label: 'App GP%',
              align: 'right',
              sortable: true,
              field: 'last_app_gp',
              format_child: '',
              tooltip: '',
              headerStyle: 'text-align: center; width: 1%; color: red',
              filter_type: 'input',
              filter_options: [],
              filter_value: '',
              main_column: false,
              main_column_name: '',
              index: '',
              colspan: 0,
              colspan_name: '',
              start_index: '',
              end_index: '',
              rowspan: '',
            },
            {
              name: 'CREATED_AT',
              required: true,
              label: 'Created On',
              align: 'left',
              sortable: true,
              field: 'CREATED_AT',
              format_child: '',
              tooltip: '',
              headerStyle: 'text-align: center; width: 1%;',
              filter_type: 'input',
              filter_options: [],
              filter_value: '',
              main_column: true,
              main_column_name: '',
              index: '',
              colspan: 0,
              colspan_name: '',
              start_index: 0,
              end_index: 0,
              rowspan: '2',
            },
            {
              name: 'CREATED_BY',
              required: true,
              label: 'Created By',
              align: 'left',
              sortable: true,
              field: 'CREATED_BY',
              format_child: '',
              tooltip: '',
              headerStyle: 'text-align: center; width: 1%;',
              filter_type: 'input',
              filter_options: [],
              filter_value: '',
              main_column: true,
              main_column_name: '',
              index: '',
              colspan: 0,
              colspan_name: '',
              start_index: 0,
              end_index: 0,
              rowspan: '2',
            },
            {
              name: 'UPDATED_AT',
              required: true,
              label: 'Updated On',
              align: 'left',
              sortable: true,
              field: 'UPDATED_AT',
              format_child: '',
              tooltip: '',
              headerStyle: 'text-align: center; width: 1%;',
              filter_type: 'input',
              filter_options: [],
              filter_value: '',
              main_column: true,
              main_column_name: '',
              index: '',
              colspan: 0,
              colspan_name: '',
              start_index: 0,
              end_index: 0,
              rowspan: '2',
            },
            {
              name: 'UPDATED_BY',
              required: true,
              label: 'Updated By',
              align: 'left',
              sortable: true,
              field: 'UPDATED_BY',
              format_child: '',
              tooltip: '',
              headerStyle: 'text-align: center; width: 1%;',
              filter_type: 'input',
              filter_options: [],
              filter_value: '',
              main_column: true,
              main_column_name: '',
              index: '',
              colspan: 0,
              colspan_name: '',
              start_index: 0,
              end_index: 0,
              rowspan: '2',
            },
          ];

          if(this.page_function == 'create' || this.page_function == 'view')
          {
              table_column = table_column.filter((entry)=>{
                  return entry.name != 'action'
              })
          }

          this.product_table_column = table_column;

          if(payload.ordering == "")
          {
            payload.ordering = "-UPDATED_AT"
          }
          else if(payload.ordering == "table_Dept")
          {
            payload.ordering = "Dept"
          }
          else if(payload.ordering == "-table_Dept")
          {
            payload.ordering = "-Dept"
          }
          else if(payload.ordering == "table_SubDept")
          {
            payload.ordering = "SubDept"
          }
          else if(payload.ordering == "-table_SubDept")
          {
            payload.ordering = "-SubDept"
          }
          else if(payload.ordering == "table_Category")
          {
            payload.ordering = "Category"
          }
          else if(payload.ordering == "-table_Category")
          {
            payload.ordering = "-Category"
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
              "dispatch": 'purchase/trigger_post_get_price_change_req2item', //refer to path/function_name in store actions.js
              "getter": 'purchase/get_price_change_req2item', //refer to path/function_name in store getters.js
              "app": this, //compulsory passed variable
              "payload": payload //payload that needed to use in store actions.js
          };

          var dispatch_response = await this.$dispatch(object_pass);
          var ary = [];
          var barcode_ary = [];
          var description_ary = [];

          if(dispatch_response.status)
          {
              //success condition
              var results = dispatch_response.response.detail;

              if(results.length > 0)
              {

                for (const index in results) {
                  results[index].table_Dept = results[index].Dept + ' - ' + results[index].Desc_Dept;
                  results[index].table_SubDept = results[index].SubDept + ' - ' + results[index].Desc_SubDept;
                  results[index].table_Category = results[index].Category + ' - ' + results[index].Desc_Cat;
                  results[index].listed_cur_gp = '9988';
                  results[index].listed_sug_gp = '9988';
                  results[index].listed_app_gp = '9988';
                  results[index].avg_cur_gp = '9988';
                  results[index].avg_sug_gp = '9988';
                  results[index].avg_app_gp = '9988';
                  results[index].last_cur_gp = '9988';
                  results[index].last_sug_gp = '9988';
                  results[index].last_app_gp = '9988';
                  results[index].Own_calculate = '9988';
                  results[index].Current_Sell_include_tax = this.formatAmount(results[index].Current_Sell_include_tax, '$');
                  results[index].Suggest_Sell_include_tax = this.formatAmount(results[index].Suggest_Sell_include_tax, '$');
                  results[index].Approved_Sell_include_tax = this.formatAmount(results[index].Approved_Sell_include_tax, '$');
                  results[index].Own_calculate = this.formatAmount(results[index].Own_calculate, '$');
                  results[index].Current_Sell = this.formatAmount(results[index].Current_Sell, '$');
                  results[index].Suggest_Sell = this.formatAmount(results[index].Suggest_Sell, '$');
                  results[index].Approved_Sell = this.formatAmount(results[index].Approved_Sell, '$');
                  results[index].listed_cur_gp = this.formatAmount(results[index].listed_cur_gp, '$');
                  results[index].listed_sug_gp = this.formatAmount(results[index].listed_sug_gp, '$');
                  results[index].listed_app_gp = this.formatAmount(results[index].listed_app_gp, '$');
                  results[index].avg_cur_gp = this.formatAmount(results[index].avg_cur_gp, '$');
                  results[index].avg_sug_gp = this.formatAmount(results[index].avg_sug_gp, '$');
                  results[index].avg_app_gp = this.formatAmount(results[index].avg_app_gp, '$');
                  results[index].last_cur_gp = this.formatAmount(results[index].last_cur_gp, '$');
                  results[index].last_sug_gp = this.formatAmount(results[index].last_sug_gp, '$');
                  results[index].last_app_gp = this.formatAmount(results[index].last_app_gp, '$');

                  var obj = {
                    label: results[index].Itemcode,
                    value: results[index].CHILD_GUID,
                    barcode: results[index].barcode,
                    Description: results[index].Description,
                  }
                  var obj1 = {
                    label: results[index].barcode,
                    value: results[index].CHILD_GUID,
                  }
                  var obj2 = {
                    label: results[index].Description,
                    value: results[index].CHILD_GUID,
                  }
                  ary.push(obj)
                  barcode_ary.push(obj1)
                  description_ary.push(obj2)
                }

              }

              this.itemcode_options = ary;
              this.barcode_options = barcode_ary;
              this.description_options = description_ary;
              this.product_table_data =
              {
                  "data": {
                      "count": dispatch_response.response.total_count,
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
        }
        else
        {
          this.product_table_data = {
              "data": {
                  "count": 0,
                  "next": null,
                  "previous": null,
                  "results": []
              }
          };
        }



        this.productForceLoading = false;
    },
    siteHandleTableChange: function(newVal)
    {
        var new_params = this.$pluginsTableParams(newVal)

        var payload = {
            params : new_params
        };

        this.site_ori_params = payload;

        this.site_table_function(payload);
    },
    async site_table_function(ori_params){

        this.siteForceLoading = true;

        if(this.$route.query.TRANS_GUID)
        {
          var payload = ori_params.params
          payload.skip = payload.offset;
          payload.limit = payload.limit;
          payload.outlet_guid = this.session_outlet_guid;//session
          payload.language = this.language;
          payload.TRANS_GUID = this.TRANS_GUID;

          if(payload.ordering == "")
          {
              payload.ordering = "-posted_at"
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

          var payload = {
              "pass_json": payload//pass_json should be the field or data wish to be created.
          };

          var object_pass = {
            "dispatch": 'product/trigger_post_get_price_change_req1loc', //refer to path/function_name in store actions.js
            "getter": 'product/get_price_change_req1loc', //refer to path/function_name in store getters.js
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
                  results[i].group_status = results[i].group_status == 1;
                  results[i].TempItem = results[i].TempItem == 1;
                  results[i].Amendment = results[i].Amendment == 1;
                  results[i].cost_manual = results[i].cost_manual == 1;
                  results[i].limit_control_amt = this.formatAmount(results[i].limit_control_amt,'$');
              }
            }

            this.site_table_data =
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
              this.site_table_data = {
                  "data": {
                      "count": 0,
                      "next": null,
                      "previous": null,
                      "results": []
                  }
              };
          }
        }
        else
        {
          this.site_table_data = {
              "data": {
                  "count": 0,
                  "next": null,
                  "previous": null,
                  "results": []
              }
          };
        }

        if(this.rearrange_column.length > 0)
        {
          var table_column = this.rearrange_column;
        }
        else
        {
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
                name: 'LocGroup',
                required: true,
                label: 'Code',
                align: 'left',
                sortable: true,
                field: 'LocGroup',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;',
                filter_type: 'input',
                filter_options: [],
                filter_value: '',
            },
            {
                name: 'name',
                required: true,
                label: 'Name',
                align: 'left',
                sortable: true,
                field: 'name',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;',
                filter_type: 'input',
                filter_options: [],
                filter_value: '',
            },
          ];

          if(this.page_function == 'create' || this.page_function == 'view')
          {
              table_column = table_column.filter((entry)=>{
                  return entry.name != 'action'
              })
          }

        }

        this.site_table_column = table_column;

        this.siteForceLoading = false;
    },
    barcodeHandleTableChange: function(newVal)
    {
        var new_params = this.$pluginsTableParams(newVal)

        var payload = {
            params : new_params
        };

        this.barcode_ori_params = payload;

        this.barcode_table_function(payload);
    },
    async barcode_table_function(ori_params){

        this.barcodeForceLoading = true;

        var payload = ori_params.params
        payload.skip = payload.offset;
        payload.limit = payload.limit;
        payload.outlet_guid = this.session_outlet_guid;//session
        payload.language = this.language;
        payload.TRANS_GUID = this.TRANS_GUID;

        if(payload.ordering == "")
        {
            payload.ordering = "Barcode"
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
            "dispatch": 'product/trigger_post_get_price_change_req3bar', //refer to path/function_name in store actions.js
            "getter": 'product/get_price_change_req3bar', //refer to path/function_name in store getters.js
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
                    results[i].Itemcode = results[i].price_change_req2item.Itemcode;
                }
            }

            this.barcode_table_data =
            {
                "data": {
                    "count": dispatch_response.response.total_row,
                    "next": null,
                    "previous": null,
                    "results": results
                }
            };

            this.results = results;

        }else
        {
            //fail condition
            this.barcode_table_data = {
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
              // {
              //     name: 'action',
              //     required: true,
              //     label: this.$language('D0028'),//'Actions'
              //     align: 'center',
              //     sortable: false,
              //     field: 'action',
              //     format_child: '',
              //     tooltip: '',
              //     filter_type: 'input',
              //     filter_options: [],
              //     filter_value: '',
              // },
              {
                  name: 'Itemcode',
                  required: true,
                  label: 'Itemcode',
                  align: 'left',
                  sortable: false,
                  field: 'Itemcode',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
              },
              {
                  name: 'Barcode',
                  required: true,
                  label: 'Barcode',
                  align: 'left',
                  sortable: true,
                  field: 'Barcode',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
              },
              {
                  name: 'BarDesc',
                  required: true,
                  label: 'Description',
                  align: 'left',
                  sortable: true,
                  field: 'BarDesc',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
              },
            ];

            if(this.page_function == 'create' || this.page_function == 'view')
            {
                table_column = table_column.filter((entry)=>{
                    return entry.name != 'action'
                })
            }

        // }

        this.barcode_table_column = table_column;

        this.barcodeForceLoading = false;
    },
    ctHandleTableChange: function(newVal)
    {
        var new_params = this.$pluginsTableParams(newVal)

        var payload = {
            params : new_params
        };

        this.ct_ori_params = payload;

        this.ct_table_function(payload);
    },
    async ct_table_function(ori_params){

        this.ctForceLoading = true;

        var payload = ori_params.params
        payload.skip = payload.offset;
        payload.limit = payload.limit;
        payload.outlet_guid = this.session_outlet_guid;//session
        payload.language = this.language;
        payload.TRANS_GUID = this.TRANS_GUID;

        if(payload.ordering == "")
        {
            payload.ordering = "-Updated_at"
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
            "dispatch": 'product/trigger_post_get_price_change_req4disc', //refer to path/function_name in store actions.js
            "getter": 'product/get_price_change_req4disc', //refer to path/function_name in store getters.js
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
                results[i].Current_Disc1Value = this.formatAmount(results[i].Current_Disc1Value, '$');
                results[i].Suggest_Disc1Value = this.formatAmount(results[i].Suggest_Disc1Value, '$');
                results[i].Approved_Disc1Value = this.formatAmount(results[i].Approved_Disc1Value, '$');
                results[i].Diff_Disc1Value = this.formatAmount(results[i].Diff_Disc1Value, '$');
                results[i].Current_Disc2Value = this.formatAmount(results[i].Current_Disc2Value, '$');
                results[i].Suggest_Disc2Value = this.formatAmount(results[i].Suggest_Disc2Value, '$');
                results[i].Approved_Disc2Value = this.formatAmount(results[i].Approved_Disc2Value, '$');
                results[i].Diff_Disc2Value = this.formatAmount(results[i].Diff_Disc2Value, '$');
                results[i].Itemcode = results[i].price_change_req2item.Itemcode;
                results[i].barcode = results[i].price_change_req2item.barcode;
                results[i].Description = results[i].price_change_req2item.Description;

              }
            }

            this.ct_table_data =
            {
                "data": {
                    "count": dispatch_response.response.total_row,
                    "next": null,
                    "previous": null,
                    "results": results
                }
            };

            this.results = results;

        }else
        {
            //fail condition
            this.ct_table_data = {
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
                  label: this.$language('D0028'),
                  align: 'center',
                  sortable: false,
                  field: 'action',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
                  main_column: true,
                  main_column_name: '',
                  index: 0,
                  colspan: 0,
                  colspan_name: '',
                  start_index: 0,
                  end_index: 0,
                  rowspan: '2',
              },
              {
                  name: 'Itemcode',
                  required: true,
                  label: 'Itemcode',
                  align: 'left',
                  sortable: false,
                  field: 'Itemcode',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
                  main_column: true,
                  main_column_name: '',
                  index: 0,
                  colspan: 0,
                  colspan_name: '',
                  start_index: 0,
                  end_index: 0,
                  rowspan: '2',
              },
              {
                  name: 'barcode',
                  required: true,
                  label: 'Barcode',
                  align: 'left',
                  sortable: false,
                  field: 'barcode',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
                  main_column: true,
                  main_column_name: '',
                  index: 1,
                  colspan: 0,
                  colspan_name: '',
                  start_index: 1,
                  end_index: 1,
                  rowspan: '2',
              },
              {
                  name: 'Description',
                  required: true,
                  label: 'Description',
                  align: 'left',
                  sortable: false,
                  field: 'Description',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
                  main_column: true,
                  main_column_name: '',
                  index: 2,
                  colspan: 0,
                  colspan_name: '',
                  start_index: 2,
                  end_index: 2,
                  rowspan: '2',
              },
              {
                  name: 'CardType',
                  required: true,
                  label: 'Card Type',
                  align: 'left',
                  sortable: true,
                  field: 'CardType',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
                  main_column: true,
                  main_column_name: '',
                  index: 3,
                  colspan: 0,
                  colspan_name: '',
                  start_index: 3,
                  end_index: 3,
                  rowspan: '2',
              },
              {
                  name: 'Disc1Type',
                  required: true,
                  label: 'Type',
                  align: 'right',
                  sortable: true,
                  field: 'Disc1Type',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center; width: 1%;',
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
                  main_column: true, //normalcol/1stcolofmerge = true, restcolofmerge = false
                  main_column_name: '', //normalcol/1stcolofmerge = '', restcolofmerge = '1st_col_name'
                  index: 4, //normalcol/1stcolofmerge = 'header_index', restcolofmerge = ''
                  colspan: 5, //normalcol = '', colneedmerge = 'col_span_value'
                  colspan_name: 'Discount 1', //1stcolofmerge = 'header_name', rest = ''
                  start_index: 4,
                  end_index: 8,
                  rowspan: '0', //normalcol = 'total_row', colneedmerge = ''
              },
              {
                  name: 'Current_Disc1Value',
                  required: true,
                  label: 'Current',
                  align: 'right',
                  sortable: true,
                  field: 'Current_Disc1Value',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center; width: 1%;',
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
                  main_column: false, //normalcol/1stcolofmerge = true, restcolofmerge = false
                  main_column_name: 'disc1type', //normalcol/1stcolofmerge = '', restcolofmerge = '1st_col_name'
                  index: '', //normalcol/1stcolofmerge = 'header_index', restcolofmerge = ''
                  colspan: '', //normalcol = '', colneedmerge = 'col_span_value'
                  colspan_name: '', //1stcolofmerge = 'header_name', rest = ''
                  start_index: 0,
                  end_index: 0,
                  rowspan: '0', //normalcol = 'total_row', colneedmerge = ''
              },
              {
                  name: 'Suggest_Disc1Value',
                  required: true,
                  label: 'Suggest',
                  align: 'right',
                  sortable: true,
                  field: 'Suggest_Disc1Value',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center; width: 1%;',
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
                  main_column: false, //normalcol/1stcolofmerge = true, restcolofmerge = false
                  main_column_name: 'disc1type', //normalcol/1stcolofmerge = '', restcolofmerge = '1st_col_name'
                  index: '', //normalcol/1stcolofmerge = 'header_index', restcolofmerge = ''
                  colspan: '', //normalcol = '', colneedmerge = 'col_span_value'
                  colspan_name: '', //1stcolofmerge = 'header_name', rest = ''
                  start_index: 0,
                  end_index: 0,
                  rowspan: '0', //normalcol = 'total_row', colneedmerge = ''
              },
              {
                  name: 'Approved_Disc1Value',
                  required: true,
                  label: 'Approve',
                  align: 'right',
                  sortable: true,
                  field: 'Approved_Disc1Value',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center; width: 1%;',
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
                  main_column: false, //normalcol/1stcolofmerge = true, restcolofmerge = false
                  main_column_name: 'disc1type', //normalcol/1stcolofmerge = '', restcolofmerge = '1st_col_name'
                  index: '', //normalcol/1stcolofmerge = 'header_index', restcolofmerge = ''
                  colspan: '', //normalcol = '', colneedmerge = 'col_span_value'
                  colspan_name: '', //1stcolofmerge = 'header_name', rest = ''
                  start_index: 0,
                  end_index: 0,
                  rowspan: '0', //normalcol = 'total_row', colneedmerge = ''
              },
              {
                  name: 'disc1diff',
                  required: true,
                  label: 'Diff (unknown_field)',
                  align: 'left',
                  sortable: true,
                  field: 'disc1diff',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center; width: 1%;',
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
                  main_column: false, //normalcol/1stcolofmerge = true, restcolofmerge = false
                  main_column_name: 'disc1type', //normalcol/1stcolofmerge = '', restcolofmerge = '1st_col_name'
                  index: '', //normalcol/1stcolofmerge = 'header_index', restcolofmerge = ''
                  colspan: '', //normalcol = '', colneedmerge = 'col_span_value'
                  colspan_name: '', //1stcolofmerge = 'header_name', rest = ''
                  start_index: 0,
                  end_index: 0,
                  rowspan: '0', //normalcol = 'total_row', colneedmerge = ''
              },
              {
                  name: 'Disc2Type',
                  required: true,
                  label: 'Type',
                  align: 'right',
                  sortable: true,
                  field: 'Disc2Type',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center; width: 1%;',
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
                  main_column: true, //normalcol/1stcolofmerge = true, restcolofmerge = false
                  main_column_name: '', //normalcol/1stcolofmerge = '', restcolofmerge = '1st_col_name'
                  index: 5, //normalcol/1stcolofmerge = 'header_index', restcolofmerge = ''
                  colspan: 5, //normalcol = '', colneedmerge = 'col_span_value'
                  colspan_name: 'Discount 2', //1stcolofmerge = 'header_name', rest = ''
                  start_index: 10,
                  end_index: 14,
                  rowspan: '0', //normalcol = 'total_row', colneedmerge = ''
              },
              {
                  name: 'Current_Disc2Value',
                  required: true,
                  label: 'Current',
                  align: 'right',
                  sortable: true,
                  field: 'Current_Disc2Value',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center; width: 1%;',
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
                  main_column: false, //normalcol/1stcolofmerge = true, restcolofmerge = false
                  main_column_name: 'disc2type', //normalcol/1stcolofmerge = '', restcolofmerge = '1st_col_name'
                  index: '', //normalcol/1stcolofmerge = 'header_index', restcolofmerge = ''
                  colspan: '', //normalcol = '', colneedmerge = 'col_span_value'
                  colspan_name: '', //1stcolofmerge = 'header_name', rest = ''
                  start_index: 0,
                  end_index: 0,
                  rowspan: '0', //normalcol = 'total_row', colneedmerge = ''
              },
              {
                  name: 'Suggest_Disc2Value',
                  required: true,
                  label: 'Suggest',
                  align: 'right',
                  sortable: true,
                  field: 'Suggest_Disc2Value',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center; width: 1%;',
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
                  main_column: false, //normalcol/1stcolofmerge = true, restcolofmerge = false
                  main_column_name: 'disc2type', //normalcol/1stcolofmerge = '', restcolofmerge = '1st_col_name'
                  index: '', //normalcol/1stcolofmerge = 'header_index', restcolofmerge = ''
                  colspan: '', //normalcol = '', colneedmerge = 'col_span_value'
                  colspan_name: '', //1stcolofmerge = 'header_name', rest = ''
                  start_index: 0,
                  end_index: 0,
                  rowspan: '0', //normalcol = 'total_row', colneedmerge = ''
              },
              {
                  name: 'Approved_Disc2Value',
                  required: true,
                  label: 'Approve',
                  align: 'right',
                  sortable: true,
                  field: 'Approved_Disc2Value',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center; width: 1%;',
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
                  main_column: false, //normalcol/1stcolofmerge = true, restcolofmerge = false
                  main_column_name: 'disc2type', //normalcol/1stcolofmerge = '', restcolofmerge = '1st_col_name'
                  index: '', //normalcol/1stcolofmerge = 'header_index', restcolofmerge = ''
                  colspan: '', //normalcol = '', colneedmerge = 'col_span_value'
                  colspan_name: '', //1stcolofmerge = 'header_name', rest = ''
                  start_index: 0,
                  end_index: 0,
                  rowspan: '0', //normalcol = 'total_row', colneedmerge = ''
              },
              {
                  name: 'disc2diff',
                  required: true,
                  label: 'Diff (unknown_field)',
                  align: 'left',
                  sortable: true,
                  field: 'disc2diff',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center; width: 1%;',
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
                  main_column: false, //normalcol/1stcolofmerge = true, restcolofmerge = false
                  main_column_name: 'disc2type', //normalcol/1stcolofmerge = '', restcolofmerge = '1st_col_name'
                  index: '', //normalcol/1stcolofmerge = 'header_index', restcolofmerge = ''
                  colspan: '', //normalcol = '', colneedmerge = 'col_span_value'
                  colspan_name: '', //1stcolofmerge = 'header_name', rest = ''
                  start_index: 0,
                  end_index: 0,
                  rowspan: '0', //normalcol = 'total_row', colneedmerge = ''
              },
              {
                  name: 'Created_at',
                  required: true,
                  label: 'Created On',
                  align: 'left',
                  sortable: true,
                  field: 'Created_at',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
                  main_column: true, //normalcol/1stcolofmerge = true, restcolofmerge = false
                  main_column_name: '', //normalcol/1stcolofmerge = '', restcolofmerge = '1st_col_name'
                  index: 6, //normalcol/1stcolofmerge = 'header_index', restcolofmerge = ''
                  colspan: '', //normalcol = '', colneedmerge = 'col_span_value'
                  colspan_name: '', //1stcolofmerge = 'header_name', rest = ''
                  start_index: 6,
                  end_index: 6,
                  rowspan: 2, //normalcol = 'total_row', colneedmerge = ''
              },
              {
                  name: 'Created_by',
                  required: true,
                  label: 'Created By',
                  align: 'left',
                  sortable: true,
                  field: 'Created_by',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
                  main_column: true, //normalcol/1stcolofmerge = true, restcolofmerge = false
                  main_column_name: '', //normalcol/1stcolofmerge = '', restcolofmerge = '1st_col_name'
                  index: 7, //normalcol/1stcolofmerge = 'header_index', restcolofmerge = ''
                  colspan: '', //normalcol = '', colneedmerge = 'col_span_value'
                  colspan_name: '', //1stcolofmerge = 'header_name', rest = ''
                  start_index: 7,
                  end_index: 7,
                  rowspan: 2, //normalcol = 'total_row', colneedmerge = ''
              },
              {
                  name: 'Updated_at',
                  required: true,
                  label: 'Updated On',
                  align: 'left',
                  sortable: true,
                  field: 'Updated_at',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
                  main_column: true, //normalcol/1stcolofmerge = true, restcolofmerge = false
                  main_column_name: '', //normalcol/1stcolofmerge = '', restcolofmerge = '1st_col_name'
                  index: 8, //normalcol/1stcolofmerge = 'header_index', restcolofmerge = ''
                  colspan: '', //normalcol = '', colneedmerge = 'col_span_value'
                  colspan_name: '', //1stcolofmerge = 'header_name', rest = ''
                  start_index: 8,
                  end_index: 8,
                  rowspan: 2, //normalcol = 'total_row', colneedmerge = ''
              },
              {
                  name: 'Updated_by',
                  required: true,
                  label: 'Updated By',
                  align: 'left',
                  sortable: true,
                  field: 'Updated_by',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
                  main_column: true, //normalcol/1stcolofmerge = true, restcolofmerge = false
                  main_column_name: '', //normalcol/1stcolofmerge = '', restcolofmerge = '1st_col_name'
                  index: 9, //normalcol/1stcolofmerge = 'header_index', restcolofmerge = ''
                  colspan: '', //normalcol = '', colneedmerge = 'col_span_value'
                  colspan_name: '', //1stcolofmerge = 'header_name', rest = ''
                  start_index: 9,
                  end_index: 9,
                  rowspan: 2, //normalcol = 'total_row', colneedmerge = ''
              },
            ];

            if(this.page_function == 'create' || this.page_function == 'view')
            {
                table_column = table_column.filter((entry)=>{
                    return entry.name != 'action'
                })
            }

        // }

        this.ct_table_column = table_column;

        this.ctForceLoading = false;
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
        var tabNames = ["Refno","Product","Site","Card Type" ,"Barcode"];

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
              this.tab = 'Product';
          }
          if(this.step == '2')
          {
              this.tab = 'Product';
          }
          if(this.step == '3')
          {
              this.tab = 'Site'
          }
          if(this.step == '4')
          {
              this.tab = 'Card Type'
          }
          if(this.step == '5')
          {
              this.tab = 'Barcode'
          }
        });
    },
    handleChangeTab(newVal)
    {
      this.$nextTick(()=>{
        if(newVal == 'Product')
        {
            this.step = 1
        }
        if(newVal == 'Product')
        {
            this.step = 2
        }
        if(newVal == 'Site')
        {
            this.step = 3
        }
        if(newVal == 'Card Type')
        {
            this.step = 4
        }
        if(newVal == 'Barcode')
        {
            this.step = 5
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
    async trigger_search_supcus(payload){
      this.showAddLoading = true;

      if(payload)
      {
        var payload = payload;
      }
      else
      {
        var payload = {
            "pass_json": {
                "skip": this.offset,
                "limit": 1,
                "outlet_guid": this.session_outlet_guid,
                "language": this.language,
                "TRANS_GUID": this.TRANS_GUID,
            },
        };

      }

      this.ori_payload = JSON.parse(JSON.stringify(payload))

        var object_pass = {
            "dispatch": 'purchase/trigger_post_get_price_change_req', //refer to path/function_name in store actions.js
            "getter": 'purchase/get_price_change_req', //refer to path/function_name in store getters.js
            "app": this, //compulsory passed variable
            "payload": payload //payload that needed to use in store actions.js
        };

        var dispatch_response = await this.$dispatch(object_pass);
        // console.log('dispatch_response', dispatch_response);

        if(dispatch_response.status){


          if(dispatch_response.response.detail.length == 1)
          {
            var filter = dispatch_response.response.detail[0];
            this.json = filter;
            this.RefNo = filter.RefNo;
            this.TRANS_GUID = filter.TRANS_GUID;
            if(this.page_count > 1)
            {
              this.product_table_function(this.product_ori_params)
              this.site_table_function(this.site_ori_params)
              // this.ibt_table_function(this.ibt_ori_params)
              // this.ibt_site_table_function(this.ibt_site_ori_params)
              // this.log_table_function(this.log_ori_params);
            }
            else
            {
              this.product_table_function(this.product_ori_params)
            }
            this.page_count += 1;
            this.showAddLoading = false;
          }
          else
          {
            this.showNotify('negative', 'Failed to get price change result')
            this.showAddLoading = false;
          }
        }

    },
    async getTRANSGUID(payload){
        var object_pass = {
            "dispatch": 'purchase/trigger_post_get_price_change_req', //refer to path/function_name in store actions.js
            "getter": 'purchase/get_price_change_req', //refer to path/function_name in store getters.js
            "app": this, //compulsory passed variable
            "payload": payload //payload that needed to use in store actions.js
        };

        var dispatch_response = await this.$dispatch(object_pass);

          if(dispatch_response.status){
            if(dispatch_response.response.detail)
            {
              return dispatch_response.response.detail[0].TRANS_GUID
            }else
            {
              this.showNotify('negative', 'Failed to get price change result')
              this.$router.push('PriceChange')
              return '';
            }
          }
          else
          {
            this.showNotify('negative', 'Failed to get price change result')
            this.$router.push('PriceChange')
            return '';
          }

    },
  back(){
        this.$router.push("PriceChange");
    },

  async handleCreateVendor(){
      var validate = await this.validate_form("save_form");

      if(!validate)
      {
          this.showNotify("negative","Please make sure all field is correct.");
          return;
      }

      if (this.$route.query.TRANS_GUID) {
        // Existing vendor: Call saveVendor (update)
        await this.saveVendor();
      } else {
        // New vendor: Call createVendor (create)
        await this.createVendor();
      }
    },

    async createVendor() {

      var RefNo = this.json.RefNo;
      var Location_Group = this.json.Location_Group;
      var ishq = this.json.ishq;
      var EffectiveDate = this.json.EffectiveDate;
      var EffectiveTime = this.json.EffectiveTime;
      var Remark = this.json.Remark;
      var Send_Req = this.json.Send_Req;
      var Send_Approved = this.json.Send_Approved;
      var Post_Req = this.json.Post_Req;
      var Print_Req = this.json.Print_Req;
      var Send_by = this.json.Send_by;
      var Send_Approved_by = this.json.Send_Approved_by;
      var Post_by = this.json.Post_by;
      var Print_by = this.json.Print_by;
      var Send_Req_at = this.json.Send_Req_at;
      var Send_Approved_at = this.json.Send_Approved_at;
      var Post_Req_at = this.json.Post_Req_at;
      var Print_Req_at = this.json.Print_Req_at;
      var Created_by = this.getuser;
      var Updated_by = this.getuser;

      var payload = {
        pass_json: {
          RefNo: RefNo,
          Location_Group: Location_Group,
          ishq: ishq,
          EffectiveDate: EffectiveDate,
          EffectiveTime: EffectiveTime,
          Remark: Remark,
          Send_Req: Send_Req,
          Send_Approved: Send_Approved,
          Post_Req: Post_Req,
          Print_Req: Print_Req,
          Send_by: Send_by,
          Send_Approved_by: Send_Approved_by,
          Post_by: Post_by,
          Print_by: Print_by,
          Send_Req_at: Send_Req_at,
          Send_Approved_at: Send_Approved_at,
          Post_Req_at: Post_Req_at,
          Print_Req_at: Print_Req_at,
          Created_by: Created_by,
          Updated_by: Updated_by,
        }
      }

      var object_pass = {
          "dispatch": 'purchase/trigger_create_price_change_req',  // endpoint hardcoded
          "getter": 'purchase/get_price_change_req_status',             // getter hardcoded
          "app": this,
          "payload": payload,
      };

      var dispatch_response = await this.$dispatch(object_pass);

      if (dispatch_response.status) {
          // success condition
          this.showAddLoading = false;
          this.showNotify("positive", "Created Successfully.");
          this.$router.push({
            name: 'PriceChangeDetails',
            query: { TRANS_GUID: dispatch_response.response.TRANS_GUID, offset: 0, total_row: this.total_row}
          });

          this.page_function = 'edit';
      } else {
          // fail condition
          var error_response = dispatch_response.detail;
          this.showNotify('negative', JSON.stringify(error_response));
          this.showAddLoading = false;
      }
    },

    async saveVendor(){
      var TRANS_GUID = this.json.TRANS_GUID;
      var RefNo = this.json.RefNo;
      var Location_Group = this.json.Location_Group;
      var ishq = this.json.ishq;
      var EffectiveDate = this.json.EffectiveDate;
      var EffectiveTime = this.json.EffectiveTime;
      var Remark = this.json.Remark;
      var Send_Req = this.json.Send_Req;
      var Send_Approved = this.json.Send_Approved;
      var Post_Req = this.json.Post_Req;
      var Print_Req = this.json.Print_Req;
      var Send_by = this.json.Send_by;
      var Send_Approved_by = this.json.Send_Approved_by;
      var Post_by = this.json.Post_by;
      var Print_by = this.json.Print_by;
      var Send_Req_at = this.json.Send_Req_at;
      var Send_Approved_at = this.json.Send_Approved_at;
      var Post_Req_at = this.json.Post_Req_at;
      var Print_Req_at = this.json.Print_Req_at;
      var Created_by = this.getuser;
      var Updated_by = this.getuser;


      var payload = {
        pass_json: {
          TRANS_GUID: TRANS_GUID,
          RefNo: RefNo,
          Location_Group: Location_Group,
          ishq: ishq,
          EffectiveDate: EffectiveDate,
          EffectiveTime: EffectiveTime,
          Remark: Remark,
          Send_Req: Send_Req,
          Send_Approved: Send_Approved,
          Post_Req: Post_Req,
          Print_Req: Print_Req,
          Send_by: Send_by,
          Send_Approved_by: Send_Approved_by,
          Post_by: Post_by,
          Print_by: Print_by,
          Send_Req_at: Send_Req_at,
          Send_Approved_at: Send_Approved_at,
          Post_Req_at: Post_Req_at,
          Print_Req_at: Print_Req_at,
          Created_by: Created_by,
          Updated_by: Updated_by,
        }
      }

      var object_pass = {
          "dispatch": 'purchase/trigger_update_price_change_req',  // endpoint hardcoded
          "getter": 'purchase/get_price_change_req_status',             // getter hardcoded
          "app": this,
          "payload": payload,
      };

      var dispatch_response = await this.$dispatch(object_pass);

      if(dispatch_response.status)
      {
          //success condition
          this.showAddLoading = false;
          this.trigger_search_supcus(this.ori_payload);
          this.showNotify("positive", "Updated Successfully.");

      }else
      {
          //fail condition
          var error_response = dispatch_response.detail;
              var show_error = "";
              this.showNotify('negative', JSON.stringify(error_response));

              this.showAddLoading = false;
      }
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
    isValidJSON(str) {
      // if (typeof str !== 'string') {
      //   return false;
      // }

      try {
        const parsed = JSON.parse(str);
        // Ensure the result is an object or array (valid JSON)
        return typeof parsed === 'object' && parsed !== null;
      } catch (e) {
        return false;
      }
    },
}
}
</script>

<style scoped>
.q-btn.disabled {
    opacity: 0.2 !important;
}

.q-tab-panels
{
  width: 100%;
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
/* * >>> .q-field--readonly > .q-field__inner > .q-field__control
{
background-color: #E8E8E8 !important;
border-radius: 8px !important;
border: 2px solid #BABABA;
} */
/* *>>>.q-field--outlined.q-field--readonly .q-field__control:before {
  border-style: none;
} */
* >>> .q-field--outlined.q-field--readonly .q-field__control:before {
    border-style: solid;
}

* >>> .q-field--disabled.custom_datepicker > .q-field__inner
{
  cursor: text;
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

