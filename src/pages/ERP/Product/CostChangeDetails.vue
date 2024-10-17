<template>
  <div style="font-size: 10px; padding-left: 15px; padding-right: 15px;">
  <!-- {{last_enter_field}} -->

      <div class="text-subtitle1 header_text">
          Cost Change
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
                    </q-stepper>

                </div>

                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 top_right_button">
                  <div>
                      <Button :disable="false" v-on:receiveClick="handleAdd"
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
                      
                      <Button :disable="page_function == 'view' ? true : false" v-on:receiveClick="handleSave"
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
                      <!-- <Button v-if="page_function == 'create' && this.$route.query.prev_cost_guid && this.$route.query.prev_offset && this.$route.query.prev_total_row" v-on:receiveClick="handleCancel"
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

                      <Button :disable="false" v-on:receiveClick="goBack()"
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
                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                        <div class="row">
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                <div class="row" style="align-items: center;">
                                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-xs-12">
                                        <Label :pass_value="'Refno'" />
                                    </div>
                                    <div class="col-xl-10 col-lg-10 col-md-10 col-sm-12 col-xs-12">
                                        <Input :autofocusclick="true" :readonly="page_function == 'view' ? true : false"
                                        :disable="page_function == 'view' ? false : true"
                                        v-model:pass_value="json.refno"
                                        v-on:receiveChange="handleChange"
                                        :dbComponentBehavior="dbComponentBehavior.text"/>
                                    </div>
                                </div>
                            </div>

                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                <div class="row" style="align-items: center;">
                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                        <Label :pass_value="'Doc Date'" />
                                    </div>
                                    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                      <Datepicker class="custom_datepicker" :disable="page_function == 'view' ? true : false" v-on:receiveChange="handleChangeDocDate" :daterange="json.date_doc"
                                      :componentBehavior="dbComponentBehavior.text" :autoclose="true"/>
                                    </div>
                                </div>
                            </div>

                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                <div class="row" style="align-items: center;">
                                    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                        <Label :pass_value="'Doc No'" />
                                    </div>
                                    <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-xs-12">
                                      <Input :autofocusclick="true" :readonly="page_function == 'view' ? true : false"
                                        v-model:pass_value="json.docno"
                                        v-on:receiveChange="handleChange"
                                        :dbComponentBehavior="dbComponentBehavior.text"/>
                                    </div>
                                </div>
                            </div>

                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                <div class="row" style="align-items: center;">
                                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-xs-12">
                                        <Label :pass_value="'Supplier'" />
                                    </div>

                                    <div class="col-xl-10 col-lg-10 col-md-10 col-sm-12 col-xs-12">
                                        <Select :readonly="page_function == 'view' ? true : false"
                                        v-model:pass_value="json.vendor_code"
                                        v-on:receiveChange="handleChangeVendorCode"
                                        :dbComponentBehavior="dbComponentBehavior.text_required"
                                        label=""
                                        :options="vendor_options"
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
                                        <Input :autofocusclick="true" :readonly="page_function == 'view' ? true : false"
                                            v-model:pass_value="json.remark"
                                            v-on:receiveChange="handleChangeRemark"
                                            :dbComponentBehavior="dbComponentBehavior.text"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                      <div class="row">
                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-xs-12">
                          <div class="row">
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                              <div class="row" style="align-items: center; height: 32px;">
                                <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                    <Label :pass_value="'Request Sent'" />
                                </div>
                                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12" style="text-align: right;">
                                    <q-toggle
                                    :disable="page_function == 'view' ? false : true"
                                    dense
                                    style="padding-top: 7px; padding-bottom: 7px;"
                                    :false-value="0"
                                    :true-value="1"
                                    color="green"
                                    v-model="json.request"
                                    />
                                </div>
                              </div>
                            </div>

                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                <div class="row" style="align-items: center; height: 32px;">
                                    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                        <Label :pass_value="'Approved'" />
                                    </div>
                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12" style="text-align: right;">
                                        <q-toggle
                                        :disable="page_function == 'view' ? false : true"
                                            dense
                                            style="padding-top: 7px; padding-bottom: 7px;"
                                            :false-value="0"
                                            :true-value="1"
                                            color="green"
                                            v-model="json.approve"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                <div class="row" style="align-items: center; height: 32px;">
                                    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                        <Label :pass_value="'Posted'" />
                                    </div>
                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12" style="text-align: right;">
                                        <q-toggle
                                        :disable="page_function == 'view' ? false : true"
                                            dense
                                            style="padding-top: 7px; padding-bottom: 7px;"
                                            :false-value="0"
                                            :true-value="1"
                                            color="green"
                                            v-model="json.posted"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                <div class="row" style="align-items: center; height: 32px;">
                                    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                        <Label :pass_value="'Printed'" class="unknown_field" />
                                    </div>
                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12" style="text-align: right;">
                                        <q-toggle
                                        :disable="page_function == 'view' ? false : true"
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

                        <div class="col-xl-10 col-lg-10 col-md-10 col-sm-12 col-xs-12">
                          <div class="row">
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                              <div class="row">
                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                  <div class="row" style="align-items: center;">
                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                        <Label :pass_value="'Request By'" />
                                    </div>
                                    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                        <Input :autofocusclick="true" :readonly="page_function == 'view' ? true : false"
                                            :disable="page_function == 'view' ? false : true"
                                            v-model:pass_value="json.request_by"
                                            v-on:receiveChange="handleChange('')"
                                            :dbComponentBehavior="dbComponentBehavior.text"
                                        />
                                    </div>
                                  </div>
                                </div>

                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                  <div class="row" style="align-items: center;">
                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                        <Label :pass_value="'Approved By'" />
                                    </div>
                                    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                        <Input :autofocusclick="true" :readonly="page_function == 'view' ? true : false"
                                            :disable="page_function == 'view' ? false : true"
                                            v-model:pass_value="json.approve_by"
                                            v-on:receiveChange="handleChange('')"
                                            :dbComponentBehavior="dbComponentBehavior.text"
                                        />
                                    </div>
                                  </div>
                                </div>

                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                  <div class="row" style="align-items: center;">
                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                        <Label :pass_value="'Posted By'" />
                                    </div>
                                    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12" style="text-align: right;">
                                      <Input :autofocusclick="true" :readonly="page_function == 'view' ? true : false"
                                      :disable="page_function == 'view' ? false : true"
                                      v-model:pass_value="json.posted_by"
                                      v-on:receiveChange="handleChange('')"
                                      :dbComponentBehavior="dbComponentBehavior.text"
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                  <div class="row" style="align-items: center;">
                                      <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                          <Label :pass_value="'Printed By'" class="unknown_field" />
                                      </div>
                                      <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12" style="text-align: right;">
                                        <Input :autofocusclick="true" :readonly="page_function == 'view' ? true : false"
                                          :disable="page_function == 'view' ? false : true"
                                          v-model:pass_value="json.Print_by"
                                          v-on:receiveChange="handleChange('')"
                                          :dbComponentBehavior="dbComponentBehavior.text"
                                        />
                                      </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                              <div class="row">
                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                  <div class="row" style="align-items: center;">
                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                        <Label :pass_value="'Request On'" />
                                    </div>
                                    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                        <Input :autofocusclick="true" :readonly="page_function == 'view' ? true : false"
                                            :disable="page_function == 'view' ? false : true"
                                            v-model:pass_value="json.request_at"
                                            v-on:receiveChange="handleChange('')"
                                            :dbComponentBehavior="dbComponentBehavior.text"
                                        />
                                    </div>
                                  </div>
                                </div>

                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                  <div class="row" style="align-items: center;">
                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                        <Label :pass_value="'Approved On'" />
                                    </div>
                                    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                        <Input :autofocusclick="true" :readonly="page_function == 'view' ? true : false"
                                            :disable="page_function == 'view' ? false : true"
                                            v-model:pass_value="json.approve_at"
                                            v-on:receiveChange="handleChange('')"
                                            :dbComponentBehavior="dbComponentBehavior.text"
                                        />
                                    </div>
                                  </div>
                                </div>

                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                  <div class="row" style="align-items: center;">
                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                        <Label :pass_value="'Posted On'" />
                                    </div>
                                    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12" style="text-align: right;">
                                      <Input :autofocusclick="true" :readonly="page_function == 'view' ? true : false"
                                      :disable="page_function == 'view' ? false : true"
                                      v-model:pass_value="json.posted_at"
                                      v-on:receiveChange="handleChange('')"
                                      :dbComponentBehavior="dbComponentBehavior.text"
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                  <div class="row" style="align-items: center;">
                                      <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                          <Label :pass_value="'Printed On'" class="unknown_field"/>
                                      </div>
                                      <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12" style="text-align: right;">
                                        <Input :autofocusclick="true" :readonly="page_function == 'view' ? true : false"
                                          :disable="page_function == 'view' ? false : true"
                                          v-model:pass_value="json.Print_Req_at"
                                          v-on:receiveChange="handleChange('')"
                                          :dbComponentBehavior="dbComponentBehavior.text"
                                        />
                                      </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                              <div class="row">
                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                  <div class="row" style="align-items: center;">
                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                        <Label :pass_value="'Created On'" />
                                    </div>
                                    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                        <Input :autofocusclick="true" :readonly="page_function == 'view' ? true : false"
                                            :disable="page_function == 'view' ? false : true"
                                            v-model:pass_value="json.created_at"
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
                                    </div>
                                    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                        <Input :autofocusclick="true" :readonly="page_function == 'view' ? true : false"
                                            :disable="page_function == 'view' ? false : true"
                                            v-model:pass_value="json.created_by"
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
                                    </div>
                                    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12" style="text-align: right;">
                                      <Input :autofocusclick="true" :readonly="page_function == 'view' ? true : false"
                                      :disable="page_function == 'view' ? false : true"
                                      v-model:pass_value="json.updated_at"
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
                                      </div>
                                      <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12" style="text-align: right;">
                                        <Input :autofocusclick="true" :readonly="page_function == 'view' ? true : false"
                                          :disable="page_function == 'view' ? false : true"
                                          v-model:pass_value="json.updated_by"
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
                      <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
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
                            </q-tabs>
                        </q-toolbar>
                      </div>

                      <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                        <q-toolbar class="bg-white q-pl-sm custom_toolbar">
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" align="right">
                            <Button v-on:receiveClick="handleShowCreateChild"
                            v-if="page_function == 'edit' && tab == 'Product'"
                            :pass_label="'Supplier Item List'"
                            :pass_no_caps="true"
                            :pass_square="true"
                            :pass_dense="true"
                            class="custom_button"
                            />
                          </div>
                        </q-toolbar>
                      </div>


                      <q-separator />

                      <q-tab-panels v-model="tab" :animated="false" keep-alive ref="tabs">
                        <q-tab-panel name="Product" style="padding: 0px; padding-top: 10px; color: grey; overflow: hidden">
                          <div class="row">
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom: 10px; padding-right: 10px;">
                              <div style="width: 100%;">
                                <TableMerge
                                :row_per_page="[5,10,20,50,1000]"
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
                                v-on:receiveHandleEditDetails="handleShowEditChild"
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
          <q-form ref="save_branch_form">
            <div class="row dialog_content">
              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pl-xs">
                <div style="width: 100%;">
                  <Table
                  :row_per_page="[5,10,20,50,1000]"
                  :title="table_title"
                  :table_data="item_table_data"
                  :table_column="item_table_column"
                  :flat_status="true"
                  :bordered_status="true"
                  v-on:receiveRequestTable="getItemHandleTableChange"
                  :allow_add="false"
                  :allow_edit="true"
                  :allow_delete="false"
                  :allow_select="true"
                  v-on:receiveHandleAdd="handleReceiveHandleAdd"
                  v-on:receiveHandleEdit="handleSelectItem"
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
    <q-dialog v-model="show_costchange_dialog" persistent :position="$q.screen.width > 599 ? 'top' : 'bottom'">

        <q-card style="width:70vw; max-width: 95vw; max-height: 90vh; margin-top: 5%;">
          <q-card-section class="row items-center dialog_header_custom">
              <div v-if="edit_costchange" class="text-h6">Edit Detail</div>
              <div v-else class="text-h6">Add Detail</div>
              <q-space />
              <q-btn icon="close" flat round dense @click="close()" :disable="costchange_loading"/>
          </q-card-section>

          <q-card-section class="upload_container">
            <q-form ref="save_barcode_form">
              <div class="row upload_separator_first">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <div class="row dialog_content">
                      
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 four_column_left" :class="!edit_child ? 'two_column_left': ''">
                        <div class="row dialog_separator">
                          <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                            <Label :pass_value="'Itemcode'" />
                          </div>
                          <!-- :disable="edit_costchange" -->
                          <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                            <Input
                            :autofocusclick="true"
                            :disable="edit_costchange"
                            :no_label="false"
                            :readonly="page_function == 'view'"
                            v-on:change="handleChange"
                            v-model="cosjson.itemcode"
                            :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text_required" />
                          </div>
                        </div>
                    </div>
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 four_column_left" :class="!edit_child ? 'two_column_left': ''">
                  <div class="row dialog_separator">

                      
                    <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                      <Label :pass_value="'Description'" />
                    </div>
                    
                    <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                      <Input
                      :autofocusclick="true"
                      :no_label="false"
                      :disable="edit_costchange"
                      :readonly="page_function == 'view'"
                      v-on:change="handleChange"
                      v-model="cosjson.description"
                      :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text_required" />
                    </div>

                </div>
                    </div>
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 four_column_left" :class="!edit_child ? 'two_column_left': ''">
                        <div class="row dialog_separator">
                          <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                            <Label :pass_value="'Pack Size'" />
                          </div>
                          
                          <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                            <Input
                            :autofocusclick="true"
                            :no_label="false"
                            :disable="edit_costchange"
                            :readonly="page_function == 'view'"
                            v-on:change="handleChange"
                            v-model="cosjson.packsize"
                            :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text_required" />
                          </div>


                      </div>
                    </div>
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 four_column_left" :class="!edit_child ? 'two_column_left': ''">
                        <div class="row dialog_separator">
                          <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                            <Label :pass_value="'Ordering UOM'" />
                          </div>
                          
                          <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                            <Input
                            :autofocusclick="true"
                            :no_label="false"
                            :disable="edit_costchange"
                            :readonly="page_function == 'view'"
                            v-on:change="handleChange"
                            v-model="cosjson.um"
                            :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text_required" />
                          </div>

                      </div>
                    </div>

                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 four_column_left" :class="!edit_child ? 'two_column_left': ''">
                        <div class="row dialog_separator">
                            <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                            <Label :pass_value="'New-Unit Cost Exc Tax Cost'" />
                          </div>
                          
                          <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                            <Input
                            :autofocusclick="true"
                            :no_label="false"
                            :readonly="page_function == 'view'"
                            v-on:change="handleChange"
                            v-model="cosjson.SupStdPrice"
                            :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text_required" />
                          </div>

                      </div>
                    </div>
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 four_column_left" :class="!edit_child ? 'two_column_left': ''">
                        <div class="row dialog_separator">
                            <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                            <Label :pass_value="'New-Case Cost Exc Tax Cost'" />
                          </div>
                          
                          <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                            <Input
                            :autofocusclick="true"
                            :no_label="false"
                            :readonly="page_function == 'view'"
                            v-on:change="handleChange"
                            v-model="cosjson.CartonPrice"
                            :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text_required" />
                          </div>

                      </div>
                    </div>

                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 four_column_left" :class="!edit_child ? 'two_column_left': ''">
                        <div class="row dialog_separator">
                            <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                            <Label :pass_value="'New-Unit Cost Exc Tax Type'" />
                          </div>
                          
                          <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                            <!-- <Input
                            :autofocusclick="true"
                            :no_label="false"
                            :readonly="page_function == 'view'"
                            v-on:change="handleChange"
                            v-model="cosjson.Disc1Type"
                            :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text_required" /> -->
                            <Select
                            :readonly="page_function == 'view'"
                            v-model:pass_value="cosjson.Disc1Type"
                            v-on:receiveChange="handleChange"
                            :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.select"
                            label=""
                            :options="discType_options"
                            />
                          </div>

                      </div>
                    </div>
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 four_column_left" :class="!edit_child ? 'two_column_left': ''">
                        <div class="row dialog_separator">
                            <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                            <Label :pass_value="'New-Case Cost Exc Tax Type'" />
                          </div>
                          
                          <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                            <!-- <Input
                            :autofocusclick="true"
                            :no_label="false"
                            :readonly="page_function == 'view'"
                            v-on:change="handleChange"
                            v-model="cosjson.Disc1Type_c"
                            :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text_required" /> -->
                            <Select
                            :readonly="page_function == 'view'"
                            v-model:pass_value="cosjson.Disc1Type_c"
                            v-on:receiveChange="handleChange"
                            :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.select"
                            label=""
                            :options="discType_options"
                            />
                          </div>

                      </div>
                    </div>

                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 four_column_left" :class="!edit_child ? 'two_column_left': ''">
                        <div class="row dialog_separator">
                            <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                            <Label :pass_value="'New-Unit Cost Exc Tax Disc1'" />
                          </div>
                          
                          <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                            <Input
                            :autofocusclick="true"
                            :no_label="false"
                            :readonly="page_function == 'view'"
                            v-on:change="handleChange"
                            v-model="cosjson.Disc1Value"
                            :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text_required" />
                          </div>

                      </div>
                    </div>
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 four_column_left" :class="!edit_child ? 'two_column_left': ''">
                        <div class="row dialog_separator">

                            <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                            <Label :pass_value="'New-Case Cost Exc Tax Disc1'" />
                          </div>
                          
                          <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                            <Input
                            :autofocusclick="true"
                            :no_label="false"
                            :readonly="page_function == 'view'"
                            v-on:change="handleChange"
                            v-model="cosjson.Disc1Value_c"
                            :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text_required" />
                          </div>

                      </div>
                    </div>

                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 four_column_left" :class="!edit_child ? 'two_column_left': ''">
                        <div class="row dialog_separator">

                            <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                            <Label :pass_value="'New-Unit Cost Exc Tax Type'" />
                          </div>
                          
                          <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                            <!-- <Input
                            :autofocusclick="true"
                            :no_label="false"
                            :readonly="page_function == 'view'"
                            v-on:change="handleChange"
                            v-model="cosjson.Disc2Type"
                            :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text_required" /> -->
                            <Select
                            :readonly="page_function == 'view'"
                            v-model:pass_value="cosjson.Disc2Type"
                            v-on:receiveChange="handleChange"
                            :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.select"
                            label=""
                            :options="discType_options"
                            />
                          </div>

                      </div>
                    </div>
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 four_column_left" :class="!edit_child ? 'two_column_left': ''">
                        <div class="row dialog_separator">

                           <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                            <Label :pass_value="'New-Case Cost Exc Tax Type'" />
                          </div>
                          
                          <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                            <!-- <Input
                            :autofocusclick="true"
                            :no_label="false"
                            :readonly="page_function == 'view'"
                            v-on:change="handleChange"
                            v-model="cosjson.Disc2Type_c"
                            :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text_required" /> -->
                            <Select
                            :readonly="page_function == 'view'"
                            v-model:pass_value="cosjson.Disc2Type_c"
                            v-on:receiveChange="handleChange"
                            :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.select"
                            label=""
                            :options="discType_options"
                            />
                          </div>

                      </div>
                    </div>

                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 four_column_left" :class="!edit_child ? 'two_column_left': ''">
                        <div class="row dialog_separator">

                            <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                            <Label :pass_value="'New-Unit Cost Exc Tax Disc2'" />
                          </div>
                          
                          <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                            <Input
                            :autofocusclick="true"
                            :no_label="false"
                            :readonly="page_function == 'view'"
                            v-on:change="handleChange"
                            v-model="cosjson.Disc2Value"
                            :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text_required" />
                          </div>

                      </div>
                    </div>
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 four_column_left" :class="!edit_child ? 'two_column_left': ''">
                        <div class="row dialog_separator">

                          <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                            <Label :pass_value="'New-Case Cost Exc Tax Disc2'" />
                          </div>
                          
                          <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                            <Input
                            :autofocusclick="true"
                            :no_label="false"
                            :readonly="page_function == 'view'"
                            v-on:change="handleChange"
                            v-model="cosjson.Disc2Value_c"
                            :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text_required" />
                          </div>

                      </div>
                    </div>

                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 four_column_left" :class="!edit_child ? 'two_column_left': ''">
                        <div class="row dialog_separator">

                          <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                            <Label :pass_value="'New-Unit Cost Exc Tax Net'" />
                          </div>
                          
                          <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                            <Input
                            :autofocusclick="true"
                            :no_label="false"
                            :readonly="page_function == 'view'"
                            v-on:change="handleChange"
                            v-model="cosjson.NetUnitPrice"
                            :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text_required" />
                          </div>

                      </div>
                    </div>
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 four_column_left" :class="!edit_child ? 'two_column_left': ''">
                        <div class="row dialog_separator">

                            <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                            <Label :pass_value="'New-Case Cost Exc Tax Net'" />
                          </div>
                          
                          <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                            <Input
                            :autofocusclick="true"
                            :no_label="false"
                            :readonly="page_function == 'view'"
                            v-on:change="handleChange"
                            v-model="cosjson.NetUnitPrice_c"
                            :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text_required" />
                          </div>

                      </div>
                    </div>

                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 four_column_left" :class="!edit_child ? 'two_column_left': ''">
                        <div class="row dialog_separator">

                            <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                            <Label :pass_value="'Rsp Before tax'" />
                          </div>
                          
                          <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                            <Input
                            :autofocusclick="true"
                            :no_label="false"
                            :readonly="page_function == 'view'"
                            v-on:change="handleChange"
                            v-model="cosjson.SupRSPBeforeTax"
                            :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text_required" />
                          </div>

                      </div>
                    </div>
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 four_column_left" :class="!edit_child ? 'two_column_left': ''">
                        <div class="row dialog_separator">

                            <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                            <Label :pass_value="'RSP After Tax'" />
                          </div>
                          
                          <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                            <Input
                            :autofocusclick="true"
                            :no_label="false"
                            :readonly="page_function == 'view'"
                            v-on:change="handleChange"
                            v-model="cosjson.SupRSPAfterTax"
                            :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text_required" />
                          </div>

                      </div>
                    </div>
                            

                              
                              


                      </div>
                </div>
              </div>
            </q-form>
          </q-card-section>

          <q-card-actions class="dialog_action" align="right">
            <Button v-on:receiveClick="close"
              v-if="page_function != 'view'"
              :pass_label="'Cancel'"
              :pass_no_caps="true"
              :pass_square="true"
              :pass_dense="true"
              v-close-popup
            />
            <Button v-on:receiveClick="saveCostchange"
              v-if="page_function != 'view'"
              :pass_label="'Save'"
              :pass_no_caps="true"
              :pass_square="true"
              :pass_dense="true"
              class="custom_button"
            />

          </q-card-actions>


          <q-inner-loading
            :showing="costchange_loading"
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
import TableMerge from 'src/components/ERP/Table/TableMerge.vue';
import Table from 'src/components/ERP/Table/Table.vue';
import Checkbox from 'src/components/ERP/Base/Checkbox'
import Datepicker from 'src/components/ERP/Main/Datepicker'

export default {
data() {
  return{
    item_ori_params: {},
    itemForceLoading: false,
    item_table_column: [],
    item_table_data: [],
    ori_payload: {},
    child_dialog: false,
    child_loading: false,
    show_costchange_dialog: false,
    costchange_loading: false,
    edit_costchange: false,
    child_action: 'create',
    item_guid: '',
    jsonc: {},
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
    cost_guid: '',
    page_function: null,
    rearrange_column: [],
    original_vendor_list: [],
    vendor_options: [],
    discType_options: [
        {
          "label": "$",
          "value": "$",
        },
        {
          "label": "%",
          "value": "%",
        },
      ],
    trans_type: null,
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
  TableMerge,
  Table,
  Datepicker,
},
computed: {
  dbComponentBehavior() {
   return this.$store.getters['dbComponentBehavior/byLanguage']('erp')
  },
},
async created()
{
    // console.log(this.$route);
  var cost_guid = this.$route.query.cost_guid;

  this.trans_type = 'ByVendor';//ByItem

  if(cost_guid)
  {
    if(this.$route.name == 'CostChangeDetailsView')
    {
      this.page_function = 'view'

      var json = {
        name: this.$route.name,
        query: this.$route.query,
      };

      sessionStorage.setItem("original_route", JSON.stringify(json));
    }
    else
    {
      this.page_function = 'edit'
    }

    this.cost_guid = cost_guid;
  }
  else
  {
    if(this.$route.name == 'CostChangeDetails')
    {
      this.page_function = 'create'
      this.showAddLoading = false;
    }
    else
    {
      alert('Parameter incorrect');
      this.goBack();
      return;
    }


  }
},
async mounted(){

  this.showAddLoading = true;
  // this.location_options = await this.getLocation();
  // this.cost_centre_options = await this.getSubDept();
  // this.branch_options = await this.getBranch();
  // this.currency_options = await this.getCurrencyOptions();
  var active_tab = JSON.parse(JSON.stringify(this.tab));

  await this.discoverTabs(active_tab, 'hide');

  var offset = Number(this.$route.query.offset);
  var total_row = Number(this.$route.query.total_row);

  await this.call_vendor_options();

  if(this.cost_guid)
  {
    await this.trigger_search_supcus()
  }

  if(offset !== null && offset !== undefined && offset !== '' && total_row !== null && total_row !== undefined && total_row !== '')
  {
      this.offset = offset;
      this.total_row = total_row;

      this.disable_previous_button = offset <= '0' ? true : false;
      this.disable_next_button = offset >= total_row ? true : false;
  }

  this.showAddLoading = false;

},
methods:{
    // handleCancel()
    // {
    //   var cost_guid = this.$route.query.prev_cost_guid;
    //   var offset = this.$route.query.prev_offset;
    //   var total_row = this.$route.query.prev_total_row;

    //   this.$router.push({
    //     name: 'CostChangeDetailsView',
    //     query: { cost_guid: cost_guid, offset: offset, total_row: total_row }
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
    async saveChild()
      {
          var selected_row = this.item_table_data.data.results.find(row => row.select === true);

          if(!selected_row)
          {
            this.showNotify('negative', 'Please select row to continue');
            return;
          }

          this.showAddLoading = true;
          this.child_loading = true;
          this.jsonc = selected_row;
          console.log(this.jsonc)
          var itemcode = this.jsonc.Itemcode;
          var barcode = this.jsonc.itemmaster.ItemBarcode;
          var description = this.jsonc.ITEM_DESC;
          var packsize = this.jsonc.packsize; //no_pass
          var SupStdPrice = this.jsonc.SupStdPrice;
          var Disc1Value = this.jsonc.Disc1Value;
          var Disc1Type = this.jsonc.Disc1Type;
          var Disc2Value = this.jsonc.Disc2Value;
          var Disc2Type = this.jsonc.Disc2Type;
          var NetUnitPrice = this.jsonc.NetUnitPrice;
          var CartonPrice = this.jsonc.cartonprice;
          var Disc1Value_c = this.jsonc.disc1value_case;
          var Disc1Type_c = this.jsonc.disc1type_case;
          var Disc2Value_c = this.jsonc.disc2value_case;
          var Disc2Type_c = this.jsonc.disc2type_case;
          var NetUnitPrice_c = this.jsonc.netunitprice_case;
          var um = this.jsonc.um; //no_pass
          var new_ordering_uom = this.jsonc.new_ordering_uom; //no_pass
          var SupBulkQty = this.jsonc.SupBulkQty;
          var new_case_qty = this.jsonc.new_case_qty; //no_pass
          var current_min_order_qty = this.jsonc.current_min_order_qty; //no_pass
          var new_min_order_qty = this.jsonc.new_min_order_qty; //no_pass
          var current_order_lot_size = this.jsonc.current_order_lot_size; //no_pass
          var new_order_lot_size = this.jsonc.new_order_lot_size; //no_pass
          var current_currency = this.jsonc.current_currency; //no_pass
          var new_currency = this.jsonc.new_currency; //no_pass
          var current_unit_cost = this.jsonc.current_unit_cost; //no_pass
          var current_unit_disc1 = this.jsonc.current_unit_disc1; //no_pass
          var current_unit_disc1type = this.jsonc.current_unit_disc1type; //no_pass
          var current_unit_disc2 = this.jsonc.current_unit_disc2; //no_pass
          var current_unit_disc2type = this.jsonc.current_unit_disc2type; //no_pass
          var current_unit_net = this.jsonc.current_unit_net; //no_pass
          var current_case_cost = this.jsonc.current_case_cost; //no_pass
          var current_case_disc1 = this.jsonc.current_case_disc1; //no_pass
          var current_case_disc1type = this.jsonc.current_case_disc1type; //no_pass
          var current_case_disc2 = this.jsonc.current_case_disc2; //no_pass
          var current_case_disc2type = this.jsonc.current_case_disc2type; //no_pass
          var current_case_net = this.jsonc.current_case_net; //no_pass
          var current_external_code = this.jsonc.current_external_code; //no_pass
          var new_external_code = this.jsonc.new_external_code; //no_pass
          var SupRSPAfterTax = this.jsonc.SupRSPAfterTax;
          var new_rsp_inc_tax = this.jsonc.new_rsp_inc_tax; //no_pass
          var SupRSPBeforeTax = this.jsonc.SupRSPBeforeTax;
          var new_rsp_exc_tax = this.jsonc.new_rsp_exc_tax; //no_pass
          var updated_by = this.getuser;

          var payload = {
              pass_json: {
                outlet_guid: this.session_outlet_guid,
                cost_guid: this.cost_guid,
                itemcode: itemcode,
                barcode: barcode,
                description: description,
                packsize: packsize,
                SupStdPrice: SupStdPrice,
                Disc1Value: Disc1Value,
                Disc1Type: Disc1Type,
                Disc2Value: Disc2Value,
                Disc2Type: Disc2Type,
                NetUnitPrice: NetUnitPrice,
                CartonPrice: CartonPrice,
                Disc1Value_c: Disc1Value_c,
                Disc1Type_c: Disc1Type_c,
                Disc2Value_c: Disc2Value_c,
                Disc2Type_c: Disc2Type_c,
                NetUnitPrice_c: NetUnitPrice_c,
                um: um,
                new_ordering_uom: new_ordering_uom,
                SupBulkQty: SupBulkQty,
                new_case_qty: new_case_qty,
                current_min_order_qty: current_min_order_qty,
                new_min_order_qty: new_min_order_qty,
                current_order_lot_size: current_order_lot_size,
                new_order_lot_size: new_order_lot_size,
                current_currency: current_currency,
                new_currency: new_currency,
                current_unit_cost: current_unit_cost,
                current_unit_disc1: current_unit_disc1,
                current_unit_disc1type: current_unit_disc1type,
                current_unit_disc2: current_unit_disc2,
                current_unit_disc2type: current_unit_disc2type,
                current_unit_net: current_unit_net,
                current_case_cost: current_case_cost,
                current_case_disc1: current_case_disc1,
                current_case_disc1type: current_case_disc1type,
                current_case_disc2: current_case_disc2,
                current_case_disc2type: current_case_disc2type,
                current_case_net: current_case_net,
                current_external_code: current_external_code,
                new_external_code: new_external_code,
                SupRSPAfterTax: SupRSPAfterTax,
                new_rsp_inc_tax: new_rsp_inc_tax,
                SupRSPBeforeTax: SupRSPBeforeTax,
                new_rsp_exc_tax: new_rsp_exc_tax,
                updated_by: updated_by,
              }
          }

          var object_pass = {};

          if(this.child_action == 'create')
          {
              payload.pass_json.created_by = this.getuser;

              object_pass = {
                "dispatch": 'product/trigger_post_create_cost_price_change_item',  // endpoint hardcoded
                "getter": 'product/get_cost_price_change_item_status',             // getter hardcoded
                "app": this,
                "payload": payload,
              };
          }
          else if(this.child_action == 'edit')
          {
              payload.pass_json.item_guid = this.item_guid;

              object_pass = {
                "dispatch": 'product/trigger_post_update_cost_price_change_item',  // endpoint hardcoded
                "getter": 'product/get_cost_price_change_item_status',             // getter hardcoded
                "app": this,
                "payload": payload,
              };
          }

          var dispatch_response = await this.$dispatch(object_pass);

          if (dispatch_response.status) {
              // success condition
              var success_message = this.child_action == 'create' ? 'Created Successfully.' : 'Edited Successfully.';
              this.showNotify("positive", success_message);
              this.table_function(this.ori_params);
              this.showAddLoading = false;
              this.child_loading = false;
              this.child_action = null;
              this.child_dialog = false;
              this.jsonc = {};
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
    async saveCostchange()
      {          
          this.showAddLoading = true;
          this.costchange_loading = true;
          var itemcode = this.cosjson.itemcode;
          
          var Disc1Value = this.cosjson.Disc1Value;
          var Disc1Type = this.cosjson.Disc1Type;
          var Disc2Value = this.cosjson.Disc2Value;
          var Disc2Type = this.cosjson.Disc2Type;
          var Disc1Value_c = this.cosjson.Disc1Value_c;
          var Disc1Type_c = this.cosjson.Disc1Type_c;
          var Disc2Value_c = this.cosjson.Disc2Value_c;
          var Disc2Type_c = this.cosjson.Disc2Type_c;
          var NetUnitPrice = this.cosjson.NetUnitPrice;
          var NetUnitPrice_c = this.cosjson.NetUnitPrice_c;
          var SupStdPrice = this.cosjson.SupStdPrice;
          var CartonPrice = this.cosjson.cartonprice;   
          var SupRSPAfterTax = this.cosjson.SupRSPAfterTax;
          var SupRSPBeforeTax = this.cosjson.SupRSPBeforeTax;
          var um = this.cosjson.um;
          var packsize = this.json.packsize;
          var updated_by = this.getuser;

          var payload = {
              pass_json: {
                outlet_guid: this.session_outlet_guid,
                cost_guid: this.cost_guid,
                itemcode: itemcode,
                Disc1Value_c: Disc1Value_c,
                Disc1Type_c: Disc1Type_c,
                Disc2Value_c: Disc2Value_c,
                Disc2Type_c: Disc2Type_c,
                NetUnitPrice: NetUnitPrice,
                NetUnitPrice_c: NetUnitPrice_c,
               
                SupStdPrice: SupStdPrice,
                Disc1Value: Disc1Value,
                Disc1Type: Disc1Type,
                Disc2Value: Disc2Value,
                Disc2Type: Disc2Type,
                CartonPrice: CartonPrice,
                SupRSPAfterTax: SupRSPAfterTax,
                SupRSPBeforeTax: SupRSPBeforeTax,
                um: um,
                packsize: packsize,
                updated_by: updated_by,
              }
          }

          var object_pass = {};
    
          if(this.edit_costchange)
          {
              payload.pass_json.item_guid = this.item_guid;

              object_pass = {
                "dispatch": 'product/trigger_post_update_cost_price_change_item',  // endpoint hardcoded
                "getter": 'product/get_cost_price_change_item_status',             // getter hardcoded
                "app": this,
                "payload": payload,
              };
          }

          var dispatch_response = await this.$dispatch(object_pass);

          if(dispatch_response.status){
                var success_message = 'Cost change Edited Successfully.';
                this.showNotify("positive", success_message);
                this.table_function(this.ori_params);
                this.showAddLoading = false;
                this.costchange_loading = false;
                this.edit_costchange = null;
                this.show_costchange_dialog = false;
                this.cosjson = {};
                this.costchange_loading = false;
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
              this.costchange_loading = false;
          }
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
    getItemHandleTableChange: function(newVal)
    {
        var new_params = this.$pluginsTableParams(newVal)

        var payload = {
            params : new_params
        };

        this.item_ori_params = payload;

        this.item_table_function(payload);
    },
    async item_table_function(ori_payload){
      this.itemForceLoading = true;

      var payload = ori_payload.params
      payload.outlet_guid = this.session_outlet_guid;//session
      payload.language = this.language;
      payload.Code = this.json.vendor_code;

      if(payload.ordering == "" || !payload.ordering)
      {
          payload.ordering = "Name"
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


      var n_payload = {
          "pass_json": payload//pass_json should be the field or data wish to be created.
      };

      var object_pass = {
          "dispatch": 'setup/trigger_post_get_itemmastersupcode', //refer to path/function_name in store actions.js
          "getter": 'setup/get_itemmastersupcode', //refer to path/function_name in store getters.js
          "app": this, //compulsory passed variable
          "payload": n_payload //payload that needed to use in store actions.js
      };

      var dispatch_response = await this.$dispatch(object_pass);
      console.log(dispatch_response)

      if(dispatch_response.status)
      {
          //success condition
          var results = dispatch_response.response.detail;
          if(results.length > 0)
          {
              for(var i in results)
              {
                results[i].select = false;
              }
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
          this.showNotify('negative', 'Failed to get product. Please try again.')
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
              name: 'PackSize',
              required: true,
              label: 'Pack Size',
              align: 'left',
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
              name: 'UM',
              required: true,
              label: 'UOM',
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
              name: 'SupStdPrice',
              required: true,
              label: 'Listed Cost',
              align: 'left',
              sortable: true,
              field: 'SupStdPrice',
              format_child: '',
              tooltip: '',
              headerStyle: 'text-align: center; width: 1%;',
              filter_type: 'input',
              filter_options: [],
              filter_value: '',
          },
          {
              name: 'Disc1Type',
              required: true,
              label: 'Disc 1',
              align: 'left',
              sortable: true,
              field: 'Disc1Type',
              format_child: '',
              tooltip: '',
              headerStyle: 'text-align: center; width: 1%;',
              filter_type: 'input',
              filter_options: [],
              filter_value: '',
          },
          {
              name: 'Disc1Value',
              required: true,
              label: 'Discount 1',
              align: 'left',
              sortable: true,
              field: 'Disc1Value',
              format_child: '',
              tooltip: '',
              headerStyle: 'text-align: center; width: 1%;',
              filter_type: 'input',
              filter_options: [],
              filter_value: '',
          },
          {
              name: 'Disc2Type',
              required: true,
              label: 'Disc 2',
              align: 'left',
              sortable: true,
              field: 'Disc2Type',
              format_child: '',
              tooltip: '',
              headerStyle: 'text-align: center; width: 1%;',
              filter_type: 'input',
              filter_options: [],
              filter_value: '',
          },
          {
              name: 'Disc2Value',
              required: true,
              label: 'Discount 2',
              align: 'left',
              sortable: true,
              field: 'Disc2Value',
              format_child: '',
              tooltip: '',
              headerStyle: 'text-align: center; width: 1%;',
              filter_type: 'input',
              filter_options: [],
              filter_value: '',
          },
          {
              name: 'NetUnitPrice',
              required: true,
              label: 'Net Cost',
              align: 'left',
              sortable: true,
              field: 'NetUnitPrice',
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
              label: 'Carton Price',
              align: 'left',
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
              name: 'future_EffDate',
              required: true,
              label: 'Future Cost Effective Date',
              align: 'left',
              sortable: true,
              field: 'future_EffDate',
              format_child: '',
              tooltip: '',
              headerStyle: 'text-align: center; width: 1%;',
              filter_type: 'input',
              filter_options: [],
              filter_value: '',
          },
          {
              name: 'future_NetUnitPrice',
              required: true,
              label: 'Future Net Cost',
              align: 'left',
              sortable: true,
              field: 'future_NetUnitPrice',
              format_child: '',
              tooltip: '',
              headerStyle: 'text-align: center; width: 1%;',
              filter_type: 'input',
              filter_options: [],
              filter_value: '',
          },
          {
              name: 'future_CartonPrice',
              required: true,
              label: 'Future Carton Cost',
              align: 'left',
              sortable: true,
              field: 'future_CartonPrice',
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

      this.item_table_column = table_column;
      this.itemForceLoading = false;
    },
    handleShowEditChild_beforethis(row)
    {
      this.child_dialog = true;
      this.child_action = 'edit';
      this.child_loading = true;
      this.item_guid = row.row.item_guid;
      this.child_loading = false;
    },
    handleShowEditChild(row)
    {
      this.item_guid = row.row.item_guid;
      this.show_costchange_dialog = true;
      this.edit_costchange = true;
      this.costchange_loading = true;
      this.edit_child = true;
      var result = JSON.parse(JSON.stringify(row.row));
      this.cosjson = result;
      this.costchange_loading = false;
      
    },
    
    closeChildDialog()
    {
      this.child_dialog = false;
      this.child_action = null;
      this.jsonc = {
        set_active: false,
        branch_guid: '',
        is_ibt: false,
        isICT: false,
        is_gst: false,
        limit_control_amt: '0.00'
      };
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
        Current_Sell_include_tax: '',
        Suggest_Sell_include_tax: '',
        Approved_Sell_include_tax: '',
        Own_calculate: '',
        Dept: '',
        SubDept: '',
        Category: '',
        Consign: '',
        SoldbyWeight: '',
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
  async handleEdit()
  {
    this.$router.push({
      name: "CostChangeDetails",
      query: { cost_guid: this.cost_guid, offset: this.offset, total_row: this.total_row}
    });
  },
  async handleChangeDocDate(newVal)
  {
    this.$nextTick(()=>{
      this.json.date_doc = newVal;
    });
  },
  async handleChangeVendorCode(newVal)
  {
    this.$nextTick(()=>{
      var filter = this.original_vendor_list.filter((entry)=>{
        return entry.Code == newVal;
      });

      this.json.vendor_name = filter.length > 0 ? filter[0].Name : '';

    });
  },
  async createSaveFunction()
  {
    var payload = {
      "pass_json": {
        "outlet_guid": this.session_outlet_guid,
        "language": this.language,
        // "cost_guid": "string",
        "branch": 'HQ',
        // "refno": "string",
        "docno": this.json.docno,
        "date_doc": this.json.date_doc,
        "date_effective": this.json.date_doc,
        "remark": this.json.remark,
        // "created_at": "2024-10-01T04:03:44.342Z",
        "created_by": this.getuser,
        // "updated_at": "2024-10-01T04:03:44.342Z",
        "updated_by": this.getuser,
        // "posted": 0,
        // "posted_at": "2024-10-01T04:03:44.342Z",
        // "posted_by": "string",
        // "request": 0,
        // "request_by": "string",
        // "request_at": "2024-10-01T04:03:44.342Z",
        // "approve": 0,
        // "approve_by": "string",
        // "approve_at": "2024-10-01T04:03:44.342Z",
        "isHQ": 1,
        "group_guid": "NA",
        "group_name": "NA",
        "trans_type": this.trans_type,
        "vendor_code": this.json.vendor_code,
        "vendor_name": this.json.vendor_name
      }
    };

    var object_pass = {
      "dispatch": 'product/trigger_post_create_cost_price_change',
      "getter": 'product/get_cost_price_change_status',
      "app": this,
      "payload": payload
    };

    var dispatch_response = await this.$dispatch(object_pass);

    return dispatch_response;
  },
  async editSaveFunction()
  {
      var payload = {
        "pass_json": {
          "cost_guid": this.cost_guid,
          "docno": this.json.docno,
          "date_doc": this.json.date_doc,
          "date_effective": this.json.date_doc,
          "remark": this.json.remark,
          "updated_by": this.getuser,
          "vendor_code": this.json.vendor_code,
          "vendor_name": this.json.vendor_name
        }
      };

      var object_pass = {
        "dispatch": 'product/trigger_post_update_cost_price_change', //refer to path/function_name in store actions.js
        "getter": 'product/get_cost_price_change_status', //refer to path/function_name in store getters.js
        "app": this, //compulsory passed variable
        "payload": payload //payload that needed to use in store actions.js
      };

      var dispatch_response = await this.$dispatch(object_pass);

      return dispatch_response;
  },
  async handleSave()
  {
    if(this.json.posted == 1)
    {
        this.showNotify("negative","This Doc already posted.");
        return;
    }

    var validate = await this.validate_form("save_form");

    if(!validate)
    {
        this.showNotify("negative","Please make sure all field is correct.");
        this.showAddLoading = false;
        return;
    }

    this.showAddLoading = true;

    if(this.page_function == 'create')
    {
      var dispatch_response = await this.createSaveFunction();

      if(dispatch_response.status)
      {
        this.showNotify("positive","Created Successfully.");

        this.$router.push({
          name: "CostChangeDetails",
          query: { cost_guid: dispatch_response.response.cost_guid, offset: 0, total_row: this.total_row}
        });

        this.page_function = 'edit';
      }else
      {
        this.showNotify("negative","Fail to create.");
      }
    }
    else
    {
      var dispatch_response = await this.editSaveFunction();

      if(dispatch_response.status)
      {
        this.showNotify("positive","Update Successfully.");

      }else
      {
        this.showNotify("negative","Fail to update.");
      }
    }//close else checking

    this.showAddLoading = false;
  },
  async call_vendor_options()
  {
		var payload = {
      "pass_json": {
        "outlet_guid": this.session_outlet_guid,
        "language": this.language,
        "skip": 0,
        "limit": 99999999,
        "sort_by": "Code",
        "sort_type": "asc",
        "Type": "S"
      }//pass_json should be the field or data wish to be created.
    };

		var object_pass = {
      "dispatch": 'product/trigger_get_supcus_dropdown', //refer to path/function_name in store actions.js
      "getter": 'product/get_supcus_dropdown', //refer to path/function_name in store getters.js
      "app": this, //compulsory passed variable
      "payload": payload //payload that needed to use in store actions.js
    };

    var dispatch_response = await this.$dispatch(object_pass);

    if(dispatch_response.status)
    {
      //success condition
      var results = dispatch_response.response;

      this.original_vendor_list = results.detail;

      var vendor_options = [];

      for (const index in this.original_vendor_list) {
        var object = {
          "label": this.original_vendor_list[index].Code + " - " +  this.original_vendor_list[index].Name,
          "value": this.original_vendor_list[index].Code
        };
        vendor_options.push(object);
      }

      this.vendor_options = vendor_options;

    }

  },
  async handleAdd()
  {
    this.$router.push({
      name: "CostChangeDetails",
      query: { prev_cost_guid: this.cost_guid, prev_offset: this.offset, prev_total_row: this.total_row}
    });
    this.page_function = 'create'
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
            "ordering": "-updated_at",
            "sort_by": "updated_at",
            "sort_type": "Desc",
            "trans_type": 'ByVendor'
        }
    };

    var new_cost_guid = await this.getCostGuid(payload);
    //here should call api and refetch data

    this.offset = offset;
    this.disable_previous_button = this.offset <= '0' ? true : false;
    this.disable_next_button = this.offset >= this.total_row ? true : false;

    if(this.page_function == 'edit')
    {
      this.$router.push({
        name: 'CostChangeDetails',
        query: { cost_guid: new_cost_guid, offset: offset, total_row: this.total_row }
      })
    }
    else if(this.page_function == 'view')
    {
      this.$router.push({
        name: 'CostChangeDetailsView',
        query: { cost_guid: new_cost_guid, offset: offset, total_row: this.total_row }
      })
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
  async table_function(ori_params){

      this.forceLoading = true;

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
                name: 'itemcode',
                required: true,
                label: 'Itemcode',
                align: 'left',
                sortable: true,
                field: 'itemcode',
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
                sortable: true,
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
                name: 'description',
                required: true,
                label: 'Description',
                align: 'left',
                sortable: true,
                field: 'description',
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
                name: 'packsize',
                required: true,
                label: 'Pack Size',
                align: 'right',
                sortable: true,
                field: 'packsize',
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
                name: 'SupStdPrice',
                required: true,
                label: 'Cost',
                align: 'right',
                sortable: true,
                field: 'SupStdPrice',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;',
                filter_type: 'input',
                filter_options: [],
                filter_value: '',
                main_column: true,
                main_column_name: '',
                index: 4,
                colspan: 6,
                colspan_name: 'New - Unit Cost Exc Tax',
                start_index: 4,
                end_index: 9,
                rowspan: '0',
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
                headerStyle: 'text-align: center;',
                filter_type: 'input',
                filter_options: [],
                filter_value: '',
                main_column: false,
                main_column_name: 'SupStdPrice',
                index: 0,
                colspan: 0,
                colspan_name: '',
                start_index: 0,
                end_index: 0,
                rowspan: '0',
            },
            {
                name: 'Disc1Value',
                required: true,
                label: 'Disc 1',
                align: 'right',
                sortable: true,
                field: 'Disc1Value',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;',
                filter_type: 'input',
                filter_options: [],
                filter_value: '',
                main_column: false,
                main_column_name: 'SupStdPrice',
                index: 0,
                colspan: 0,
                colspan_name: '',
                start_index: 0,
                end_index: 0,
                rowspan: '0',
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
                headerStyle: 'text-align: center;',
                filter_type: 'input',
                filter_options: [],
                filter_value: '',
                main_column: false,
                main_column_name: 'SupStdPrice',
                index: 0,
                colspan: 0,
                colspan_name: '',
                start_index: 0,
                end_index: 0,
                rowspan: '0',
            },
            {
                name: 'Disc2Value',
                required: true,
                label: 'Disc 2',
                align: 'right',
                sortable: true,
                field: 'Disc2Value',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;',
                filter_type: 'input',
                filter_options: [],
                filter_value: '',
                main_column: false,
                main_column_name: 'SupStdPrice',
                index: 0,
                colspan: 0,
                colspan_name: '',
                start_index: 0,
                end_index: 0,
                rowspan: '0',
            },
            {
                name: 'NetUnitPrice',
                required: true,
                label: 'Net',
                align: 'right',
                sortable: true,
                field: 'NetUnitPrice',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;',
                filter_type: 'input',
                filter_options: [],
                filter_value: '',
                main_column: false,
                main_column_name: 'SupStdPrice',
                index: 0,
                colspan: 0,
                colspan_name: '',
                start_index: 0,
                end_index: 0,
                rowspan: '0',
            },
            {
                name: 'CartonPrice',
                required: true,
                label: 'Cost',
                align: 'right',
                sortable: true,
                field: 'CartonPrice',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;',
                filter_type: 'input',
                filter_options: [],
                filter_value: '',
                main_column: true,
                main_column_name: '',
                index: 5,
                colspan: 6,
                colspan_name: 'New - Case Cost Exc Tax',
                start_index: 11,
                end_index: 16,
                rowspan: '0',
            },
            {
                name: 'Disc1Type_c',
                required: true,
                label: 'Type',
                align: 'right',
                sortable: true,
                field: 'Disc1Type_c',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;',
                filter_type: 'input',
                filter_options: [],
                filter_value: '',
                main_column: false,
                main_column_name: 'CartonPrice',
                index: 0,
                colspan: 0,
                colspan_name: '',
                start_index: 0,
                end_index: 0,
                rowspan: '0',
            },
            {
                name: 'Disc1Value_c',
                required: true,
                label: 'Disc 1',
                align: 'right',
                sortable: true,
                field: 'Disc1Value_c',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;',
                filter_type: 'input',
                filter_options: [],
                filter_value: '',
                main_column: false,
                main_column_name: 'CartonPrice',
                index: 0,
                colspan: 0,
                colspan_name: '',
                start_index: 0,
                end_index: 0,
                rowspan: '0',
            },
            {
                name: 'Disc2Type_c',
                required: true,
                label: 'Type',
                align: 'right',
                sortable: true,
                field: 'Disc2Type_c',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;',
                filter_type: 'input',
                filter_options: [],
                filter_value: '',
                main_column: false,
                main_column_name: 'CartonPrice',
                index: 0,
                colspan: 0,
                colspan_name: '',
                start_index: 0,
                end_index: 0,
                rowspan: '0',
            },
            {
                name: 'Disc2Value_c',
                required: true,
                label: 'Disc 2',
                align: 'right',
                sortable: true,
                field: 'Disc2Value_c',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;',
                filter_type: 'input',
                filter_options: [],
                filter_value: '',
                main_column: false,
                main_column_name: 'CartonPrice',
                index: 0,
                colspan: 0,
                colspan_name: '',
                start_index: 0,
                end_index: 0,
                rowspan: '0',
            },
            {
                name: 'NetUnitPrice_c',
                required: true,
                label: 'Net',
                align: 'right',
                sortable: true,
                field: 'NetUnitPrice_c',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;',
                filter_type: 'input',
                filter_options: [],
                filter_value: '',
                main_column: false,
                main_column_name: 'CartonPrice',
                index: 0,
                colspan: 0,
                colspan_name: '',
                start_index: 0,
                end_index: 0,
                rowspan: '0',
            },
            {
                name: 'um',
                required: true,
                label: 'Current',
                align: 'left',
                sortable: true,
                field: 'um',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center; color:red;',
                filter_type: 'input',
                filter_options: [],
                filter_value: '',
                main_column: true,
                main_column_name: '',
                index: 6,
                colspan: 2,
                colspan_name: 'Ordering UOM',
                start_index: 17,
                end_index: 18,
                rowspan: '0',
            },
            {
                name: 'new_ordering_uom',
                required: true,
                label: 'New',
                align: 'left',
                sortable: true,
                field: 'new_ordering_uom',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center; color:red;',
                filter_type: 'input',
                filter_options: [],
                filter_value: '',
                main_column: false,
                main_column_name: 'current_ordering_uom',
                index: 0,
                colspan: 0,
                colspan_name: '',
                start_index: 0,
                end_index: 0,
                rowspan: '0',
            },
            {
                name: 'SupBulkQty',
                required: true,
                label: 'Current',
                align: 'right',
                sortable: true,
                field: 'SupBulkQty',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center; color:red;',
                filter_type: 'input',
                filter_options: [],
                filter_value: '',
                main_column: true,
                main_column_name: '',
                index: 7,
                colspan: 2,
                colspan_name: 'Case Qty',
                start_index: 19,
                end_index: 20,
                rowspan: '0',
            },
            {
                name: 'new_case_qty',
                required: true,
                label: 'New',
                align: 'right',
                sortable: true,
                field: 'new_case_qty',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center; color:red;',
                filter_type: 'input',
                filter_options: [],
                filter_value: '',
                main_column: false,
                main_column_name: 'current_case_qty',
                index: 0,
                colspan: 0,
                colspan_name: '',
                start_index: 0,
                end_index: 0,
                rowspan: '0',
            },
            {
                name: 'current_min_order_qty',
                required: true,
                label: 'Current',
                align: 'right',
                sortable: true,
                field: 'current_min_order_qty',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center; color:red;',
                filter_type: 'input',
                filter_options: [],
                filter_value: '',
                main_column: true,
                main_column_name: '',
                index: 8,
                colspan: 2,
                colspan_name: 'Min Order Qty',
                start_index: 21,
                end_index: 22,
                rowspan: '0',
            },
            {
                name: 'new_min_order_qty',
                required: true,
                label: 'New',
                align: 'right',
                sortable: true,
                field: 'new_min_order_qty',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center; color:red;',
                filter_type: 'input',
                filter_options: [],
                filter_value: '',
                main_column: false,
                main_column_name: 'current_min_order_qty',
                index: 0,
                colspan: 0,
                colspan_name: '',
                start_index: 0,
                end_index: 0,
                rowspan: '0',
            },
            {
                name: 'current_order_lot_size',
                required: true,
                label: 'Current',
                align: 'right',
                sortable: true,
                field: 'current_order_lot_size',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center; color:red;',
                filter_type: 'input',
                filter_options: [],
                filter_value: '',
                main_column: true,
                main_column_name: '',
                index: 9,
                colspan: 2,
                colspan_name: 'Order Lot Size',
                start_index: 23,
                end_index: 24,
                rowspan: '0',
            },
            {
                name: 'new_order_lot_size',
                required: true,
                label: 'New',
                align: 'right',
                sortable: true,
                field: 'new_order_lot_size',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center; color:red;',
                filter_type: 'input',
                filter_options: [],
                filter_value: '',
                main_column: false,
                main_column_name: 'current_order_lot_size',
                index: 0,
                colspan: 0,
                colspan_name: '',
                start_index: 0,
                end_index: 0,
                rowspan: '0',
            },
            {
                name: 'current_currency',
                required: true,
                label: 'Current',
                align: 'left',
                sortable: true,
                field: 'current_currency',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center; color:red;',
                filter_type: 'input',
                filter_options: [],
                filter_value: '',
                main_column: true,
                main_column_name: '',
                index: 10,
                colspan: 2,
                colspan_name: 'Currency',
                start_index: 25,
                end_index: 26,
                rowspan: '0',
            },
            {
                name: 'new_currency',
                required: true,
                label: 'New',
                align: 'left',
                sortable: true,
                field: 'new_currency',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center; color:red;',
                filter_type: 'input',
                filter_options: [],
                filter_value: '',
                main_column: false,
                main_column_name: 'current_currency',
                index: 0,
                colspan: 0,
                colspan_name: '',
                start_index: 0,
                end_index: 0,
                rowspan: '0',
            },
            {
                name: 'current_unit_cost',
                required: true,
                label: 'Cost',
                align: 'left',
                sortable: true,
                field: 'current_unit_cost',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center; color:red;',
                filter_type: 'input',
                filter_options: [],
                filter_value: '',
                main_column: true,
                main_column_name: '',
                index: 11,
                colspan: 6,
                colspan_name: 'Current - Unit Cost Exc Tax',
                start_index: 27,
                end_index: 32,
                rowspan: '0',
            },
            {
                name: 'current_unit_disc1type',
                required: true,
                label: 'Type',
                align: 'left',
                sortable: true,
                field: 'current_unit_disc1type',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center; color:red;',
                filter_type: 'input',
                filter_options: [],
                filter_value: '',
                main_column: false,
                main_column_name: 'current_unit_cost',
                index: 0,
                colspan: 0,
                colspan_name: '',
                start_index: 0,
                end_index: 0,
                rowspan: '0',
            },
            {
                name: 'current_unit_disc1',
                required: true,
                label: 'Disc 1',
                align: 'left',
                sortable: true,
                field: 'current_unit_disc1',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center; color:red;',
                filter_type: 'input',
                filter_options: [],
                filter_value: '',
                main_column: false,
                main_column_name: 'current_unit_cost',
                index: 0,
                colspan: 0,
                colspan_name: '',
                start_index: 0,
                end_index: 0,
                rowspan: '0',
            },
            {
                name: 'current_unit_disc2type',
                required: true,
                label: 'Type',
                align: 'left',
                sortable: true,
                field: 'current_unit_disc2type',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center; color:red;',
                filter_type: 'input',
                filter_options: [],
                filter_value: '',
                main_column: false,
                main_column_name: 'current_unit_cost',
                index: 0,
                colspan: 0,
                colspan_name: '',
                start_index: 0,
                end_index: 0,
                rowspan: '0',
            },
            {
                name: 'current_unit_disc2',
                required: true,
                label: 'Disc 2',
                align: 'left',
                sortable: true,
                field: 'current_unit_disc2',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center; color:red;',
                filter_type: 'input',
                filter_options: [],
                filter_value: '',
                main_column: false,
                main_column_name: 'current_unit_cost',
                index: 0,
                colspan: 0,
                colspan_name: '',
                start_index: 0,
                end_index: 0,
                rowspan: '0',
            },
            {
                name: 'current_unit_net',
                required: true,
                label: 'Net',
                align: 'left',
                sortable: true,
                field: 'current_unit_net',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center; color:red;',
                filter_type: 'input',
                filter_options: [],
                filter_value: '',
                main_column: false,
                main_column_name: 'current_unit_cost',
                index: 0,
                colspan: 0,
                colspan_name: '',
                start_index: 0,
                end_index: 0,
                rowspan: '0',
            },
            {
                name: 'current_case_cost',
                required: true,
                label: 'Cost',
                align: 'left',
                sortable: true,
                field: 'current_case_cost',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center; color:red;',
                filter_type: 'input',
                filter_options: [],
                filter_value: '',
                main_column: true,
                main_column_name: '',
                index: 12,
                colspan: 6,
                colspan_name: 'Current - Case Cost Exc Tax',
                start_index: 33,
                end_index: 38,
                rowspan: '0',
            },
            {
                name: 'current_case_disc1type',
                required: true,
                label: 'Type',
                align: 'left',
                sortable: true,
                field: 'current_case_disc1type',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center; color:red;',
                filter_type: 'input',
                filter_options: [],
                filter_value: '',
                main_column: false,
                main_column_name: 'current_case_cost',
                index: 0,
                colspan: 0,
                colspan_name: '',
                start_index: 0,
                end_index: 0,
                rowspan: '0',
            },
            {
                name: 'current_case_disc1',
                required: true,
                label: 'Disc 1',
                align: 'left',
                sortable: true,
                field: 'current_case_disc1',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center; color:red;',
                filter_type: 'input',
                filter_options: [],
                filter_value: '',
                main_column: false,
                main_column_name: 'current_case_cost',
                index: 0,
                colspan: 0,
                colspan_name: '',
                start_index: 0,
                end_index: 0,
                rowspan: '0',
            },
            {
                name: 'current_case_disc2type',
                required: true,
                label: 'Type',
                align: 'left',
                sortable: true,
                field: 'current_case_disc2type',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center; color:red;',
                filter_type: 'input',
                filter_options: [],
                filter_value: '',
                main_column: false,
                main_column_name: 'current_case_cost',
                index: 0,
                colspan: 0,
                colspan_name: '',
                start_index: 0,
                end_index: 0,
                rowspan: '0',
            },
            {
                name: 'current_case_disc2',
                required: true,
                label: 'Disc 2',
                align: 'left',
                sortable: true,
                field: 'current_case_disc2',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center; color:red;',
                filter_type: 'input',
                filter_options: [],
                filter_value: '',
                main_column: false,
                main_column_name: 'current_case_cost',
                index: 0,
                colspan: 0,
                colspan_name: '',
                start_index: 0,
                end_index: 0,
                rowspan: '0',
            },
            {
                name: 'current_case_net',
                required: true,
                label: 'Net',
                align: 'left',
                sortable: true,
                field: 'current_case_net',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center; color:red;',
                filter_type: 'input',
                filter_options: [],
                filter_value: '',
                main_column: false,
                main_column_name: 'current_case_cost',
                index: 0,
                colspan: 0,
                colspan_name: '',
                start_index: 0,
                end_index: 0,
                rowspan: '0',
            },
            {
                name: 'current_external_code',
                required: true,
                label: 'Current',
                align: 'left',
                sortable: true,
                field: 'current_external_code',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center; color:red;',
                filter_type: 'input',
                filter_options: [],
                filter_value: '',
                main_column: true,
                main_column_name: '',
                index: 13,
                colspan: 2,
                colspan_name: 'External Code',
                start_index: 39,
                end_index: 40,
                rowspan: '0',
            },
            {
                name: 'new_external_code',
                required: true,
                label: 'New',
                align: 'left',
                sortable: true,
                field: 'new_external_code',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center; color:red;',
                filter_type: 'input',
                filter_options: [],
                filter_value: '',
                main_column: false,
                main_column_name: 'current_external_code',
                index: 0,
                colspan: 0,
                colspan_name: '',
                start_index: 0,
                end_index: 0,
                rowspan: '0',
            },
            {
                name: 'SupRSPAfterTax',
                required: true,
                label: 'Current',
                align: 'right',
                sortable: true,
                field: 'SupRSPAfterTax',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;',
                filter_type: 'input',
                filter_options: [],
                filter_value: '',
                main_column: true,
                main_column_name: '',
                index: 14,
                colspan: 2,
                colspan_name: 'RSP Include Tax',
                start_index: 41,
                end_index: 42,
                rowspan: '0',
            },
            {
                name: 'new_rsp_inc_tax',
                required: true,
                label: 'New (unknown_field)',
                align: 'right',
                sortable: true,
                field: 'new_rsp_inc_tax',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;',
                filter_type: 'input',
                filter_options: [],
                filter_value: '',
                main_column: false,
                main_column_name: 'SupRSPAfterTax',
                index: 0,
                colspan: 0,
                colspan_name: '',
                start_index: 0,
                end_index: 0,
                rowspan: '0',
            },
            {
                name: 'SupRSPBeforeTax',
                required: true,
                label: 'Current',
                align: 'right',
                sortable: true,
                field: 'SupRSPBeforeTax',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;',
                filter_type: 'input',
                filter_options: [],
                filter_value: '',
                main_column: true,
                main_column_name: '',
                index: 15,
                colspan: 2,
                colspan_name: 'RSP Exclude Tax',
                start_index: 43,
                end_index: 44,
                rowspan: '0',
            },
            {
                name: 'new_rsp_exc_tax',
                required: true,
                label: 'New (unknown_field)',
                align: 'right',
                sortable: true,
                field: 'new_rsp_exc_tax',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;',
                filter_type: 'input',
                filter_options: [],
                filter_value: '',
                main_column: false,
                main_column_name: 'SupRSPBeforeTax',
                index: 0,
                colspan: 0,
                colspan_name: '',
                start_index: 0,
                end_index: 0,
                rowspan: '0',
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
                headerStyle: 'text-align: center;',
                filter_type: 'input',
                filter_options: [],
                filter_value: '',
                main_column: true,
                main_column_name: '',
                index: 16,
                colspan: 0,
                colspan_name: '',
                start_index: 16,
                end_index: 16,
                rowspan: '2',
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
                headerStyle: 'text-align: center;',
                filter_type: 'input',
                filter_options: [],
                filter_value: '',
                main_column: true,
                main_column_name: '',
                index: 17,
                colspan: 0,
                colspan_name: '',
                start_index: 17,
                end_index: 17,
                rowspan: '2',
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
                headerStyle: 'text-align: center;',
                filter_type: 'input',
                filter_options: [],
                filter_value: '',
                main_column: true,
                main_column_name: '',
                index: 18,
                colspan: 0,
                colspan_name: '',
                start_index: 18,
                end_index: 18,
                rowspan: '2',
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
                headerStyle: 'text-align: center;',
                filter_type: 'input',
                filter_options: [],
                filter_value: '',
                main_column: true,
                main_column_name: '',
                index: 19,
                colspan: 0,
                colspan_name: '',
                start_index: 19,
                end_index: 19,
                rowspan: '2',
            },
        ];

        // if(this.page_function == 'create')
        // {
        //     table_column = table_column.filter((entry)=>{
        //         return entry.name != 'action'
        //     })
        // }
        if(this.page_function == 'create' || this.page_function == 'view')
          {
            // alert('barcode')
              table_column = table_column.filter((entry)=>{
                  return entry.name != 'action'
              })
          }

      }

      this.table_column = table_column;

      if(this.page_function == 'create')
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

        this.forceLoading = false;
        return;
      }

      var payload = ori_params.params
      payload.skip = payload.offset;
      payload.limit = payload.limit;
      payload.outlet_guid = this.session_outlet_guid;//session
      payload.language = this.language;
      payload.cost_guid = this.cost_guid;

      for (const index in this.table_column) {
        var is_array = Array.isArray(this.table_column[index].filter_value);
        if(is_array)
        {
            var value = '';

            for (const value_index in this.table_column[index].filter_value) {
                value += this.table_column[index].filter_value[value_index]+",";
            }

            value = value.replace(/,\s*$/, "");

            payload[this.table_column[index].field] = value
        }
        else
        {
            if(this.table_column[index].filter_value)
            {
                payload[this.table_column[index].field] = this.table_column[index].filter_value
            }
            else
            {
                delete payload[this.table_column[index].field]
            }
        }
      }

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
          "dispatch": 'product/trigger_post_get_cost_price_change_item', //refer to path/function_name in store actions.js
          "getter": 'product/get_cost_price_change_item', //refer to path/function_name in store getters.js
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

          this.results = results;

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

      this.forceLoading = false;
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
          this.tab = 'Product';
      }
      if(this.step == '2')
      {
          this.tab = 'Product';
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
    });
  },
  handleChange(newVal){
  // console.log('newVal',newVal);
  // console.log('colour',this.color_options);
  },
  async trigger_search_supcus(payload){

    if(payload)
    {
      var payload = payload;
    }
    else
    {
      var payload = {
        "pass_json": {
          "skip": 0,
          "limit": 1,
          "outlet_guid": this.session_outlet_guid,
          "language": this.language,
          "cost_guid": this.cost_guid,
          "ordering": "-updated_at",
          "sort_by": "updated_at",
          "sort_type": "Desc",
          "trans_type": 'ByVendor'
        },
      };

    }

    this.ori_payload = JSON.parse(JSON.stringify(payload))

    var object_pass = {
        "dispatch": 'product/trigger_post_get_cost_price_change', //refer to path/function_name in store actions.js
        "getter": 'product/get_cost_price_change', //refer to path/function_name in store getters.js
        "app": this, //compulsory passed variable
        "payload": payload //payload that needed to use in store actions.js
    };

    var dispatch_response = await this.$dispatch(object_pass);
    // console.log('dispatch_response', dispatch_response);

    if(dispatch_response.status){

      if(dispatch_response.response.detail.length > 0)
      {
        var results = dispatch_response.response.detail[0];
        this.json = results;
      }
      else
      {
        this.showNotify('negative', 'Failed to get cost change result')
        this.goBack();
        return;
      }
    }


    this.showAddLoading = false;

  },
  async getCostGuid(payload){

    var object_pass = {
        "dispatch": 'product/trigger_post_get_cost_price_change', //refer to path/function_name in store actions.js
        "getter": 'product/get_cost_price_change', //refer to path/function_name in store getters.js
        "app": this, //compulsory passed variable
        "payload": payload //payload that needed to use in store actions.js
    };

    var dispatch_response = await this.$dispatch(object_pass);
    // console.log('dispatch_response', dispatch_response);

    if(dispatch_response.status){
      if(dispatch_response.response.detail)
      {
        return dispatch_response.response.detail[0].cost_guid
      }else
      {
        this.showNotify('negative', 'Failed to get cost change result')
        this.$router.push('CostChange')
        return '';
      }
    }
    else
    {
      this.showNotify('negative', 'Failed to get cost change result')
      this.$router.push('CostChange')
      return '';
    }

    },
  goBack(){
    this.$router.push("CostChange");
  },
  async validate_form(form_name = "")
  {
      var form_name = form_name;
      var error = 0;
      console.log(form_name)
      console.log(this.$refs[form_name])
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
}
*>>>.q-field--outlined.q-field--readonly .q-field__control:before {
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
