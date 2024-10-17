<template>
  <div style="font-size: 10px; padding-left: 15px; padding-right: 15px;">
  <!-- {{last_enter_field}} -->

      <div class="text-subtitle1 header_text">
          Purchase Order
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
                        title="Hierarchy"
                        caption=""
                        icon="edit"
                        :done="done3"
                        >
                        </q-step>

                        <q-step
                        :name="4"
                        title="Inventory"
                        caption=""
                        icon="edit"
                        :done="done4"
                        >
                        </q-step>

                        <q-step
                        :name="5"
                        title="Amendment"
                        caption=""
                        icon="edit"
                        :done="done5"
                        >
                        </q-step>

                        <q-step
                        :name="6"
                        title="Allocation"
                        caption=""
                        icon="edit"
                        :done="done5"
                        >
                        </q-step>

                    </q-stepper>

                </div>

                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 top_right_button">
                    <div>
                      <Button :disable="page_function == 'create' || page_function == 'edit'" v-on:receiveClick="handleAdd"
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
                        <Button :disable="true" v-on:receiveClick="handleDelete"
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
                        <Button :disable="page_function == 'view' ? true : false" v-on:receiveClick="handleCreateVendor"
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
                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-top: 10px; height: 100%;">

                    <div class="row" style="margin-bottom: 10px;">


                      <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">

                        <div class="row">

                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                <div class="row" style="align-items: center;">
                                    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                        <Label :pass_value="'RefNo'" />
                                    </div>
                                    <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-xs-12">
                                        <Input :readonly="page_function == 'view'" :autofocusclick="true"
                                        :disable="page_function == 'create' || page_function == 'edit'"
                                        v-model:pass_value="json.RefNo"
                                        v-on:receiveChange="handleChange"
                                        :dbComponentBehavior="dbComponentBehavior.text"/>
                                    </div>
                                </div>
                            </div>

                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                <div class="row" style="align-items: center;">
                                    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                        <Label :pass_value="'Type'"/>
                                    </div>
                                    <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-xs-12">
                                        <!-- <Input :readonly="page_function == 'view'" :autofocusclick="true"
                                        v-model:pass_value="json.RefNo"
                                        v-on:receiveChange="handleChange"
                                        :dbComponentBehavior="dbComponentBehavior.text"/> -->

                                        <Select
                                        :readonly="page_function == 'view'"
                                        v-model:pass_value="jsonc.order_type"
                                        v-on:receiveChange="null"
                                        :dbComponentBehavior="dbComponentBehavior.select"
                                        label=""
                                        :options="order_type_options"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                <div class="row" style="align-items: center;">
                                    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                        <Label :pass_value="'Site'" />
                                    </div>
                                    <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-xs-12">
                                        <LabelSelectVerticalGeneral
                                        :readonly="page_function == 'view'"
                                            v-model:pass_value="json.loc_group"
                                            v-on:receiveChange="handleChangeCostCentre"
                                            :dbComponentBehavior="dbComponentBehavior.text"
                                            :options="loc_group_options"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                <div class="row" style="align-items: center;">
                                    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                        <Label :pass_value="'Location'" class="unknown_field" />
                                    </div>
                                    <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-xs-12">
                                        <LabelSelectVerticalGeneral
                                        :readonly="page_function == 'view'"
                                            v-model:pass_value="json.Location"
                                            v-on:receiveChange="handleChangeCostCentre"
                                            :dbComponentBehavior="dbComponentBehavior.text_required"
                                            :options="location_options"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                <div class="row" style="align-items: center;">
                                    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                        <Label :pass_value="'Pur Group'" class="unknown_field" />
                                    </div>
                                    <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-xs-12">
                                        <Select
                                        :readonly="page_function == 'view'"
                                        v-model:pass_value="jsonc.po_pur_group"
                                        v-on:receiveChange="null"
                                        :dbComponentBehavior="dbComponentBehavior.select"
                                        label=""
                                        :options="po_pur_group_options"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                <div class="row" style="align-items: center;">
                                    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                        <Label :pass_value="'Sub-Dept'" />
                                    </div>
                                    <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-xs-12">
                                        <LabelSelectVerticalGeneral
                                        :readonly="page_function == 'view'"
                                            v-model:pass_value="json.SubDeptCode"
                                            v-on:receiveChange="handleChangeCostCentre"
                                            :dbComponentBehavior="dbComponentBehavior.text_required"
                                            :options="cost_centre_options"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                <div class="row" style="align-items: center;">
                                    <div style="width: 12.2%;">
                                        <Label :pass_value="'Supplier'" />
                                    </div>
                                    <div style="width: 87.8%;">
                                        <LabelSelectVerticalGeneral
                                        :readonly="page_function == 'view'"
                                            v-model:pass_value="json.SCode"
                                            v-on:receiveChange="handleChangeSupplier"
                                            :dbComponentBehavior="dbComponentBehavior.text_required"
                                            :options="supplier_options"
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>

                      </div>

                      <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">

                        <div class="row">

                            <div class="row col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">

                                <div class="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-xs-12">

                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                        <div class="row" style="align-items: center;">
                                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                                <Label :pass_value="'Date'" />
                                            </div>
                                            <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                                <Datepicker :optionsFn="optionsDateEnd" class="custom_datepicker new_input" :pass_day_string="'Fri'" v-on:receiveChange="handleChangePODate" :daterange="json.PODate"
                                                :componentBehavior="dbComponentBehavior.date_required" :autoclose="true"/>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                        <div class="row" style="align-items: center;">
                                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                                <Label :pass_value="'Delivery'" />
                                            </div>
                                            <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                                <Datepicker :optionsFn="optionsDateEndNew" class="custom_datepicker new_input" :pass_day_string="'Sat'" v-on:receiveChange="handleChangeDeliverDate" :daterange="json.DeliverDate"
                                                :componentBehavior="dbComponentBehavior.date_required" :autoclose="true"/>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                        <div class="row" style="align-items: center;">
                                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                                <Label :pass_value="'Expiry'" />
                                            </div>
                                            <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                                <Datepicker :optionsFn="optionsDateEndNew" class="custom_datepicker new_input" :pass_day_string="'Sat'" v-on:receiveChange="handleChangeExpiryDate" :daterange="json.expiry_date"
                                                :componentBehavior="dbComponentBehavior.date_no_required" :autoclose="true"/>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                        <div class="row" style="align-items: center;">
                                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                                <Label :pass_value="'Pmt Due'" />
                                            </div>
                                            <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                                <Datepicker :optionsFn="optionsDateEndNew" class="custom_datepicker new_input" :pass_day_string="'Thu'" v-on:receiveChange="handleChangeDueDate" :daterange="json.DueDate"
                                                :componentBehavior="dbComponentBehavior.date_no_required" :autoclose="true"/>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div class="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-xs-12">

                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                        <div class="row" style="align-items: center;">
                                            <div class="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-xs-12">
                                                <Label :pass_value="'Gross Total'" />
                                            </div>
                                            <div class="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-xs-12">
                                                <Input :readonly="page_function == 'view'" :autofocusclick="true"
                                                v-model:pass_value="json.SubTotal1"
                                                v-on:receiveChange="handleChangeSubTotal1"
                                                :dbComponentBehavior="dbComponentBehavior.text_right"/>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                        <div class="row" style="align-items: center;">
                                            <div class="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-xs-12 unknown_field">
                                                <Label :pass_value="'Disc/Charges'" />
                                            </div>
                                            <div class="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-xs-12">
                                                <Input :readonly="page_function == 'view'" :autofocusclick="true"
                                                v-model:pass_value="json.Total"
                                                v-on:receiveChange="handleChange"
                                                :dbComponentBehavior="dbComponentBehavior.text_right"/>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                        <div class="row" style="align-items: center;">
                                            <div class="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-xs-12">
                                                <Label :pass_value="'Net Exc Tax'" />
                                            </div>
                                            <div class="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-xs-12">
                                                <Input :readonly="page_function == 'view'" :autofocusclick="true"
                                                v-model:pass_value="json.Total"
                                                v-on:receiveChange="handleChange"
                                                :dbComponentBehavior="dbComponentBehavior.text_right"/>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                        <div class="row" style="align-items: center;">
                                            <div class="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-xs-12">
                                                <Label :pass_value="'Net Inc Tax'" />
                                            </div>
                                            <div class="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-xs-12">
                                                <Input :readonly="page_function == 'view'" :autofocusclick="true"
                                                v-model:pass_value="json.total_include_tax"
                                                v-on:receiveChange="handleChangeTotalIncTax"
                                                :dbComponentBehavior="dbComponentBehavior.text_right"/>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>

                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <div class="row">

                                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-xs-12">

                                        <div class="row">

                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                                <div class="row" style="align-items: center; height: 32px;">
                                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                        <Label :pass_value="'In-kind'" />
                                                        <div>
                                                            <q-toggle
                                                            :disable="true"
                                                            dense
                                                            :false-value="0"
                                                            :true-value="1"
                                                            color="green"
                                                            v-model="json.in_kind"
                                                            />
                                                        </div>
                                                    </div>
                                                    <!-- <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12" style="text-align: right;">
                                                        <q-toggle
                                                        :disable="true"
                                                        dense
                                                        style="padding-top: 7px; padding-bottom: 7px;"
                                                        :false-value="0"
                                                        :true-value="1"
                                                        color="green"
                                                        v-model="json.in_kind"
                                                        />
                                                    </div> -->
                                                </div>
                                            </div>

                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                                <div class="row" style="align-items: center; height: 32px;">
                                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                        <Label :pass_value="'1 Delivery'" />
                                                        <div>
                                                            <q-toggle
                                                            :disable="true"
                                                            dense
                                                            :false-value="0"
                                                            :true-value="1"
                                                            color="green"
                                                            v-model="json.AutoClosePO"
                                                            />
                                                        </div>
                                                    </div>
                                                    <!-- <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12" style="text-align: right;">
                                                        <q-toggle
                                                        :disable="true"
                                                            dense
                                                            style="padding-top: 7px; padding-bottom: 7px;"
                                                            :false-value="0"
                                                            :true-value="1"
                                                            color="green"
                                                            v-model="json.AutoClosePO"
                                                        />
                                                    </div> -->
                                                </div>
                                            </div>

                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                                <div class="row" style="align-items: center; height: 32px;">
                                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                        <Label :pass_value="'HQ Issued'" />
                                                        <div>
                                                            <q-toggle
                                                            :disable="true"
                                                            dense
                                                            :false-value="0"
                                                            :true-value="1"
                                                            color="green"
                                                            v-model="json.hq_issue"
                                                            />
                                                        </div>
                                                    </div>
                                                    <!-- <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12" style="text-align: right;">
                                                        <q-toggle
                                                        :disable="true"
                                                            dense
                                                            style="padding-top: 7px; padding-bottom: 7px;"
                                                            :false-value="0"
                                                            :true-value="1"
                                                            color="green"
                                                            v-model="json.hq_issue"
                                                        />
                                                    </div> -->
                                                </div>
                                            </div>

                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                                <div class="row" style="align-items: center; height: 32px;">
                                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                        <Label class="unknown_field" :pass_value="'B2B'" />
                                                        <div>
                                                            <q-toggle
                                                            :disable="true"
                                                            dense
                                                            :false-value="0"
                                                            :true-value="1"
                                                            color="green"
                                                            v-model="json.b2b_registration"
                                                            />
                                                        </div>
                                                    </div>
                                                    <!-- <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12" style="text-align: right;">
                                                        <q-toggle
                                                        :disable="true"
                                                            dense
                                                            style="padding-top: 7px; padding-bottom: 7px;"
                                                            :false-value="0"
                                                            :true-value="1"
                                                            color="green"
                                                            v-model="json.b2b_registration"
                                                        />
                                                    </div> -->
                                                </div>
                                            </div>

                                        </div>

                                    </div>

                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">

                                        <div class="row">

                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                                <div class="row" style="align-items: center; height: 32px;">
                                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                        <Label :pass_value="'Posted'" />
                                                    </div>
                                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                        <q-toggle
                                                        :disable="true"
                                                        dense
                                                        :false-value="0"
                                                        :true-value="1"
                                                        color="green"
                                                        v-model="json.BillStatus"
                                                        />
                                                        <span class="toggle_span" v-if="json.BillStatus > 0">{{json.postdatetime}}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                                <div class="row" style="align-items: center; height: 32px;">
                                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                        <Label :pass_value="'Ammended'" class="unknown_field"/>
                                                    </div>
                                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                        <q-toggle
                                                        :disable="true"
                                                        dense
                                                        :false-value="0"
                                                        :true-value="1"
                                                        color="green"
                                                        v-model="json.Amendment"
                                                        />
                                                        <span class="toggle_span" v-if="json.Amendment > 0">2024-04-04 22:22:22</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                                <div class="row" style="align-items: center; height: 32px;">
                                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                        <Label :pass_value="'Canceled'" />
                                                    </div>
                                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                        <q-toggle
                                                        :disable="true"
                                                        dense
                                                        :false-value="0"
                                                        :true-value="1"
                                                        color="green"
                                                        v-model="json.cancel"
                                                        />
                                                        <span class="toggle_span" v-if="json.cancel > 0">{{json.cancel_at}}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                                <div class="row" style="align-items: center; height: 32px;">
                                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                        <Label :pass_value="'Completed'" />
                                                    </div>
                                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                        <q-toggle
                                                        :disable="true"
                                                        dense
                                                        :false-value="0"
                                                        :true-value="1"
                                                        color="green"
                                                        v-model="json.Completed"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                    </div>

                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                        <div class="row">
                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 5px; margin-bottom: 10px;">
                                                <div class="row" style="align-items: center;">
                                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                                        <Label :pass_value="'Created On'" />
                                                        <!-- Created On -->
                                                    </div>
                                                    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                                      <Input :autofocusclick="true"
                                                      :disable="page_function != 'view'"
                                                      :readonly="page_function == 'view'"
                                                      v-model:pass_value="json.IssueStamp"
                                                      v-on:receiveChange="handleChange('')"
                                                      :dbComponentBehavior="dbComponentBehavior.text"
                                                      />
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 5px; margin-bottom: 10px;">
                                                <div class="row" style="align-items: center;">
                                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                                        <Label :pass_value="'Created By'" />
                                                        <!-- Created By -->
                                                    </div>
                                                    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                                      <Input :autofocusclick="true"
                                                      :disable="page_function != 'view'"
                                                      :readonly="page_function == 'view'"
                                                      v-model:pass_value="json.IssuedBy"
                                                      v-on:receiveChange="handleChange('')"
                                                      :dbComponentBehavior="dbComponentBehavior.text"
                                                      />
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 5px; margin-bottom: 10px;">
                                                <div class="row" style="align-items: center;">
                                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                                        <Label :pass_value="'Updated On'" />
                                                        <!-- Updated On -->
                                                    </div>
                                                    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12" style="text-align: right;">
                                                      <Input :autofocusclick="true"
                                                      :disable="page_function != 'view'"
                                                      :readonly="page_function == 'view'"
                                                      v-model:pass_value="json.laststamp"
                                                      v-on:receiveChange="handleChange('')"
                                                      :dbComponentBehavior="dbComponentBehavior.text"
                                                      />
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 5px; margin-bottom: 10px;">
                                                <div class="row" style="align-items: center;">
                                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                                        <Label :pass_value="'Updated By'" class="unknown_field" />
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
                                <q-tab content-class="custom_tab_font" name="Hierarchy" label="Hierarchy"/>
                                <q-tab content-class="custom_tab_font" name="Inventory" :disable="false" label="Inventory"/>
                                <q-tab content-class="custom_tab_font" name="Amendment" :disable="false" label="Amendment"/>
                                <q-tab content-class="custom_tab_font" name="Allocation" :disable="false" label="Allocation"/>
                            </q-tabs>
                        </q-toolbar>
                      </div>

                      <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                        <q-toolbar class="bg-white q-pl-sm custom_toolbar">
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" align="right">
                            <Button v-on:receiveClick="handleShowCreateChild"
                            v-if="page_function == 'edit' && tab == 'Product'"
                            :pass_label="'Create'"
                            :pass_no_caps="true"
                            :pass_square="true"
                            :pass_dense="true"
                            class="custom_button"
                            />
                            <span class="q-pl-xs">
                              <!-- <Button v-on:receiveClick="handleShowSupplierItemList"
                              v-if="page_function == 'edit' && tab == 'Product'"
                              :pass_label="'Supplier Item List'"
                              :pass_no_caps="true"
                              :pass_square="true"
                              :pass_dense="true"
                              class="custom_button"
                              /> -->
                            </span>

                            <Button v-on:receiveClick="handleAllocation"
                            v-if="page_function == 'edit' && tab == 'Allocation'"
                            :pass_label="'Create'"
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
                                <!-- <div v-if="page_function == 'edit'" class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" align="right" style="padding-right: 10px; padding-bottom: 10px;">
                                    <Button v-on:receiveClick="handleShowCreateChild"
                                    :pass_label="'Create'"
                                    :pass_no_caps="true"
                                    :pass_square="true"
                                    :pass_dense="true"
                                    class="custom_button"
                                    />
                                </div> -->

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
                                        :sticky_column="true"
                                        v-on:receiveHandleAdd="handleReceiveHandleAdd"
                                        v-on:receiveHandleEditDetails="handleEditChild"
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

                        <q-tab-panel name="Hierarchy" style="padding: 0px; padding-top: 10px; color: grey; overflow: hidden">

                            <div class="row">

                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom: 10px; padding-right: 10px;">
                                    <div style="width: 100%;">

                                        <TableMerge
                                        :row_per_page="[5,10,20,50,1000]"
                                        :title="table_title_hierarchy"
                                        :table_data="table_data_hierarchy"
                                        :table_column="table_column_hierarchy"
                                        :flat_status="true"
                                        :bordered_status="true"
                                        v-on:receiveRequestTable="handleTableChangeHierarchy"
                                        :allow_add="false"
                                        :allow_edit="true"
                                        :allow_delete="false"
                                        v-on:receiveHandleAdd="handleReceiveHandleAdd"
                                        v-on:receiveHandleEditDetails="handleEdit"
                                        v-on:receiveHandleDelete="handleReceiveHandleDelete"
                                        v-on:receivehandleClickTableData="handleReceiveClickTableData"
                                        :filter_mode_on="false"
                                        v-on:receiveColumnRearrange="handleColumnRearrange"
                                        v-on:filter_column="handleFilterColumn"
                                        :forceLoading="forceLoadingHierarchy"
                                        :column_reordering="true"
                                        :row_reordering="false"
                                        v-on:receiveHandleClearFilter="handleClearFilter"
                                        :pass_visible_columns="visibleColumns"
                                        />

                                    </div>
                                </div>

                            </div>

                        </q-tab-panel>

                        <q-tab-panel name="Inventory" style="padding: 0px; padding-top: 10px; color: grey">

                            <div class="row">

                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom: 10px; padding-right: 10px;">
                                    <div style="width: 100%;">

                                        <TableMerge
                                        :row_per_page="[5,10,20,50,1000]"
                                        :title="table_title_inventory"
                                        :table_data="table_data_inventory"
                                        :table_column="table_column_inventory"
                                        :flat_status="true"
                                        :bordered_status="true"
                                        v-on:receiveRequestTable="handleTableChangeInventory"
                                        :allow_add="false"
                                        :allow_edit="true"
                                        :allow_delete="false"
                                        v-on:receiveHandleAdd="handleReceiveHandleAdd"
                                        v-on:receiveHandleEditDetails="handleEdit"
                                        v-on:receiveHandleDelete="handleReceiveHandleDelete"
                                        :filter_mode_on="false"
                                        v-on:receiveColumnRearrange="handleColumnRearrange"
                                        v-on:filter_column="handleFilterColumn"
                                        :forceLoading="forceLoadingHierarchy"
                                        :column_reordering="true"
                                        :row_reordering="false"
                                        v-on:receiveHandleClearFilter="handleClearFilter"
                                        :pass_visible_columns="visibleColumns"
                                        />

                                    </div>
                                </div>

                            </div>

                        </q-tab-panel>

                        <q-tab-panel name="Amendment" style="padding: 0px; padding-top: 10px; color: grey">

                          <div class="row">

                              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom: 10px; padding-right: 10px;">
                                  <div style="width: 100%;">
                                      <TableMerge
                                      :row_per_page="[5,10,20,50,1000]"
                                      :title="table_title_amendment"
                                      :table_data="table_data_amendment"
                                      :table_column="table_column_amendment"
                                      :flat_status="true"
                                      :bordered_status="true"
                                      v-on:receiveRequestTable="handleTableChangeAmendment"
                                      :allow_add="false"
                                      :allow_edit="true"
                                      :allow_delete="false"
                                      v-on:receiveHandleAdd="handleReceiveHandleAdd"
                                      v-on:receiveHandleEditDetails="handleEdit"
                                      v-on:receiveHandleDelete="handleReceiveHandleDelete"
                                      :filter_mode_on="false"
                                      v-on:receiveColumnRearrange="handleColumnRearrange"
                                      v-on:filter_column="handleFilterColumn"
                                      :forceLoading="forceLoadingAmendment"
                                      :column_reordering="true"
                                      :row_reordering="false"
                                      v-on:receiveHandleClearFilter="handleClearFilter"
                                      :pass_visible_columns="visibleColumns"
                                      />

                                  </div>
                              </div>

                          </div>

                          </q-tab-panel>

                        <q-tab-panel name="Allocation" style="padding: 0px; padding-top: 10px; color: grey">

                          <div class="row">

                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom: 10px; padding-right: 10px;">
                                <div style="width: 100%;">

                                  <Table
                                  :row_per_page="[5,10,20,50]"
                                  :title="table_title_allocation"
                                  :table_data="table_data_allocation"
                                  :table_column="table_column_allocation"
                                  :flat_status="true"
                                  :bordered_status="true"
                                  v-on:receiveRequestTable="handleTableChangeAllocation"
                                  :allow_add="false"
                                  :allow_edit="true"
                                  :allow_delete="true"
                                  v-on:receiveHandleAdd="handleReceiveHandleAdd"
                                  v-on:receiveHandleEditDetails="handleReceiveHandleEditBarcode"
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

      <!-- <q-card-actions class="dialog_action justify-between">
          <span class="q-pl-xs">
          <Button_icon :flat="true" :font_color="'black'" :color="'white'" :text="'BACK'" :outline="true" size="15px" class="custom_cancel_button" @click="back()" />
          </span>
          <span class="q-pl-xs">
              <Button_icon :flat="true" :font_color="'white'" :color="'#094161'" :text="'SAVE'" :outline="false" size="15px"
              v-on:receiveClick="handleCreateVendor"/>
          </span>
      </q-card-actions> -->

        <q-inner-loading
        :showing="showAddLoading"
        class="showAddLoading"
        color="primary"
        />
  </div>


  <q-dialog v-model="child_dialog" persistent position="top">
    <q-card style="width: 95vw; max-width: 950px; max-height: 90vh; margin-top: 5%;">

      <q-card-section class="row items-center dialog_header_custom">
          <div v-if="child_action == 'edit'" class="text-h6">Edit Detail</div>
          <div v-else class="text-h6">Add Detail</div>
          <q-space />
          <q-btn icon="close" flat round dense :disable="child_loading" @click="closeBranchDialog" />
      </q-card-section>

      <q-card-section>
        <q-form ref="save_child_form">
          <div class="row dialog_content">
            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 q-pl-xs">
              <div class="row">
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                    <div class="row" style="align-items: center;">
                        <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                            <Label :pass_value="'Entry Type'" />
                        </div>
                        <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                          <Select
                          :readonly="page_function == 'view'"
                          v-model:pass_value="jsonc.EntryType"
                          v-on:receiveChange="handleChange"
                          :dbComponentBehavior="dbComponentBehavior.text_required"
                          label=""
                          :options="entry_type_options"
                          />
                        </div>
                    </div>
                </div>

                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                    <div class="row" style="align-items: center;">
                        <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                            <Label :pass_value="'Pricing Type'" />
                        </div>
                        <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                          <Select
                          :readonly="page_function == 'view'"
                          v-model:pass_value="jsonc.PriceType"
                          v-on:receiveChange="handleChange"
                          :dbComponentBehavior="dbComponentBehavior.text_required"
                          label=""
                          :options="pricing_type_options"
                          />
                        </div>
                    </div>
                </div>

                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                    <div class="row" style="align-items: center;">
                        <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                            <Label :pass_value="'Itemcode'" />
                        </div>
                        <div :class="child_action == 'create' ? 'col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6' : 'col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7'">
                          <Input :autofocusclick="true"
                          :disable="page_function != 'view'"
                          :readonly="page_function == 'view'"
                          v-model:pass_value="jsonc.Itemcode"
                          v-on:receiveChange="handleChange"
                          :dbComponentBehavior="dbComponentBehavior.text_required"/>
                        </div>
                        <div v-if="child_action == 'create'" class="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-xs-1" align="right">
                          <Button :disable="false" v-on:receiveClick="showSearchDialog"
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

                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                    <div class="row" style="align-items: center;">
                        <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                            <Label :pass_value="'Description'" />
                        </div>
                        <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                          <Input :autofocusclick="true"
                          :disable="page_function != 'view'"
                          :readonly="page_function == 'view'"
                          v-model:pass_value="jsonc.Description"
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
                          <Select
                          :readonly="page_function == 'view'"
                          v-model:pass_value="jsonc.Barcode"
                          v-on:receiveChange="handleChange"
                          :dbComponentBehavior="dbComponentBehavior.select"
                          label=""
                          :options="barcode_options"
                          />
                        </div>
                    </div>
                </div>

                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                    <div class="row" style="align-items: center;">
                        <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                            <Label :pass_value="'Pack Size'" />
                        </div>
                        <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                          <Input :autofocusclick="true"
                          :disable="page_function != 'view'"
                          :readonly="page_function == 'view'"
                          v-model:pass_value="jsonc.PackSize"
                          v-on:receiveChange="handleChangePackSize"
                          :dbComponentBehavior="dbComponentBehavior.input_number"/>
                        </div>
                    </div>
                </div>

                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                    <div class="row" style="align-items: center;">
                        <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                            <Label :pass_value="'Article No'" />
                        </div>
                        <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                          <Input :autofocusclick="true"
                          :disable="page_function != 'view'"
                          :readonly="page_function == 'view'"
                          v-model:pass_value="jsonc.ArticleNo"
                          v-on:receiveChange="handleChange"
                          :dbComponentBehavior="dbComponentBehavior.text_required"/>
                        </div>
                    </div>
                </div>

                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                    <div class="row" style="align-items: center;">
                        <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                            <Label :pass_value="'Bulk Qty'" />
                        </div>
                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6">
                          <Input :autofocusclick="true"
                          :readonly="page_function == 'view'"
                          v-model:pass_value="jsonc.BulkQty"
                          v-on:receiveChange="handleChangeBulkQty"
                          :dbComponentBehavior="dbComponentBehavior.input_number"/>
                        </div>
                        <div class="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-xs-1" align="center">
                          x {{ jsonc.PackSize }}
                        </div>
                    </div>
                </div>

                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                    <div class="row" style="align-items: center;">
                        <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                            <Label :pass_value="'Qty'" />
                        </div>
                        <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                          <Input :autofocusclick="true"
                          :readonly="page_function == 'view'"
                          v-model:pass_value="jsonc.Qty"
                          v-on:receiveChange="handleChangeQty"
                          :dbComponentBehavior="dbComponentBehavior.input_number"/>
                        </div>
                    </div>
                </div>

                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                    <div class="row" style="align-items: center;">
                        <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                            <Label :pass_value="'FOC'" />
                        </div>
                        <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                          <Input :autofocusclick="true"
                          :readonly="page_function == 'view'"
                          v-model:pass_value="jsonc.Qty_foc"
                          v-on:receiveChange="handleChangeQty_foc"
                          :dbComponentBehavior="dbComponentBehavior.input_number"/>
                        </div>
                    </div>
                </div>
              </div>
            </div>
            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 q-pl-xs">
              <div class="row">
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                    <div class="row" style="align-items: center;">
                        <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                            <Label :pass_value="'Unit Price'" />
                        </div>
                        <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                          <Input :autofocusclick="true"
                          :readonly="page_function == 'view'"
                          v-model:pass_value="jsonc.UnitPrice"
                          v-on:receiveChange="handleChangeUnitPrice"
                          :dbComponentBehavior="dbComponentBehavior.input_number"/>
                        </div>
                    </div>
                </div>

                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                    <div class="row" style="align-items: center;">
                        <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                            <Label :pass_value="'Discount(+)/Surcharge(-)'" />
                        </div>
                        <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                          <Input :autofocusclick="true"
                          :readonly="page_function == 'view'"
                          v-model:pass_value="jsonc.DiscAmt"
                          v-on:receiveChange="handleChangeDiscAmt"
                          :dbComponentBehavior="dbComponentBehavior.input_number"/>
                        </div>
                    </div>
                </div>

                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                    <div class="row" style="align-items: center;">
                        <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                            <Label :pass_value="'Disc1Type'" />
                        </div>
                        <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                          <Select
                          :readonly="page_function == 'view'"
                          v-model:pass_value="jsonc.Disc1Type"
                          v-on:receiveChange="handleChange"
                          :dbComponentBehavior="dbComponentBehavior.disc1type"
                          label=""
                          :options="disctype_options"
                          />
                        </div>
                    </div>
                </div>

                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                    <div class="row" style="align-items: center;">
                        <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                            <Label :pass_value="'Disc1Value'" />
                        </div>
                        <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                          <Input :autofocusclick="true"
                          :readonly="page_function == 'view'"
                          v-model:pass_value="jsonc.Disc1Value"
                          v-on:receiveChange="handleChangeDisc1Value"
                          :dbComponentBehavior="dbComponentBehavior.input_number"/>
                        </div>
                    </div>
                </div>

                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                    <div class="row" style="align-items: center;">
                        <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                            <Label :pass_value="'Disc2Type'" />
                        </div>
                        <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                          <Select
                          :readonly="page_function == 'view'"
                          v-model:pass_value="jsonc.Disc2Type"
                          v-on:receiveChange="handleChange"
                          :dbComponentBehavior="dbComponentBehavior.disc2type"
                          label=""
                          :options="disctype_options"
                          />
                        </div>
                    </div>
                </div>

                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                    <div class="row" style="align-items: center;">
                        <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                            <Label :pass_value="'Disc2Value'" />
                        </div>
                        <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                          <Input :autofocusclick="true"
                          :readonly="page_function == 'view'"
                          v-model:pass_value="jsonc.Disc2Value"
                          v-on:receiveChange="handleChangeDisc2Value"
                          :dbComponentBehavior="dbComponentBehavior.input_number"/>
                        </div>
                    </div>
                </div>

                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                    <div class="row" style="align-items: center;">
                        <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                            <Label :pass_value="'Net Price'" />
                        </div>
                        <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                          <Input :autofocusclick="true"
                          :disable="page_function != 'view'"
                          :readonly="page_function == 'view'"
                          v-model:pass_value="jsonc.NetUnitPrice"
                          v-on:receiveChange="handleChangeNetUnitPrice"
                          :dbComponentBehavior="dbComponentBehavior.input_number"/>
                        </div>
                    </div>
                </div>

                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                    <div class="row" style="align-items: center;">
                        <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                            <Label :pass_value="'Total before Tax'" />
                        </div>
                        <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                          <Input :autofocusclick="true"
                          :disable="page_function != 'view'"
                          :readonly="page_function == 'view'"
                          v-model:pass_value="jsonc.TotalPrice"
                          v-on:receiveChange="handleChangeTotalPrice"
                          :dbComponentBehavior="dbComponentBehavior.input_number"/>
                        </div>
                    </div>
                </div>

                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                    <div class="row" style="align-items: center;">
                        <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                            <Label :pass_value="'Rebate Amount'" />
                        </div>
                        <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                          <Input :autofocusclick="true"
                          :readonly="page_function == 'view'"
                          v-model:pass_value="jsonc.rebate_value"
                          v-on:receiveChange="handleChangerebate_value"
                          :dbComponentBehavior="dbComponentBehavior.input_number"/>
                        </div>
                    </div>
                </div>

                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                    <div class="row" style="align-items: center;">
                        <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                            <Label :pass_value="'Future Price'" />
                        </div>
                        <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                          <Input :autofocusclick="true"
                          :readonly="page_function == 'view'"
                          v-model:pass_value="jsonc.price_future"
                          v-on:receiveChange="handleChangeprice_future"
                          :dbComponentBehavior="dbComponentBehavior.input_number"/>
                        </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </q-form>
      </q-card-section>

      <q-card-actions class="dialog_action" align="right">
          <Button v-on:receiveClick="closeBranchDialog"
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
                          v-on:keyup.enter="handleSearchItem"
                          v-on:receiveChange="handleChangeSearchValue"
                          :dbComponentBehavior="dbComponentBehavior.text"/>
                        </div>
                        <div class="col-xl-1 col-lg-1 col-md-1 col-sm-5 col-xs-5 q-pl-xs q-pb-sm">
                          <Button :disable="false" v-on:receiveClick="handleSearchItem"
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

  <q-dialog v-model="sup_item_list_dialog" persistent position="top">
    <q-card style="width: 95vw; max-width: 950px; max-height: 90vh; margin-top: 5%;">

      <q-card-section class="row items-center dialog_header_custom">
          <div class="text-h6">Supplier - {{ json.SCode }} - {{ json.SName }}</div>
          <q-space />
          <q-btn icon="close" flat round dense :disable="sup_item_list_loading" @click="closeSupItemListDialog" />
      </q-card-section>

      <q-card-section>
        <div class="row dialog_content">
          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pl-xs">
            <div style="width: 100%;">
              <TableMerge
              :row_per_page="[5,10,20,50,1000]"
              :title="table_title"
              :table_data="sup_item_list_table_data"
              :table_column="sup_item_list_table_column"
              :flat_status="true"
              :bordered_status="true"
              v-on:receiveRequestTable="supItemListHandleTableChange"
              :allow_add="false"
              :allow_edit="true"
              :allow_delete="false"
              :allow_select="false"
              :allow_modify="true"
              v-on:receiveHandleAdd="handleReceiveHandleAdd"
              v-on:receiveHandleEditDetails="handleEdit"
              v-on:receiveHandleDelete="handleReceiveHandleDelete"
              v-on:receiveHandleModify="handleModify"
              :filter_mode_on="false"
              v-on:receiveColumnRearrange="handleColumnRearrange"
              v-on:filter_column="handleFilterColumn"
              :forceLoading="supItemListForceLoading"
              :column_reordering="true"
              :row_reordering="false"
              v-on:receiveHandleClearFilter="handleClearFilter"
              :pass_visible_columns="visibleColumns"
              />
            </div>
          </div>
        </div>
      </q-card-section>

      <q-card-actions class="dialog_action" align="right">
          <Button v-on:receiveClick="closeSupItemListDialog"
            v-if="page_function != 'view'"
            :pass_label="'Cancel'"
            :pass_no_caps="true"
            :pass_square="true"
            :pass_dense="true"
          />

          <Button v-on:receiveClick="saveSupItemList"
            v-if="page_function != 'view'"
            :pass_label="'Save'"
            :pass_no_caps="true"
            :pass_square="true"
            :pass_dense="true"
            class="custom_button"
          />
      </q-card-actions>

      <q-inner-loading
        :showing="sup_item_list_loading"
        color="primary"
      />
    </q-card>
  </q-dialog>


<q-dialog v-model="allocationDialog" persistent position="top">
  <q-card style="width: 95vw; max-width: 950px; max-height: 90vh; margin-top: 5%;">

    <q-card-section class="row items-center dialog_header_custom">
        <div class="text-h6">Supplier - {{ json.SCode }} - {{ json.SName }}</div>
        <q-space />
        <q-btn icon="close" flat round dense :disable="sup_item_list_loading" @click="closeSupItemListDialog" />
    </q-card-section>

    <q-card-section>
      <div class="row dialog_content">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pl-xs">
          <div style="width: 100%;">
            {{table_data_allocation_dialog}}

            <Table
            :row_per_page="[5,10,20,50,1000]"
            :title="table_title_allocation_dialog"
            :table_data="table_data_allocation_dialog"
            :table_column="table_column_allocation_dialog"
            :flat_status="true"
            :bordered_status="true"
            v-on:receiveRequestTable="allocationDialogHandleTableChange"
            :allow_add="false"
            :allow_edit="true"
            :allow_delete="false"
            :allow_select="false"
            :allow_modify="true"
            v-on:receiveHandleAdd="handleReceiveHandleAdd"
            v-on:receiveHandleEditDetails="handleEdit"
            v-on:receiveHandleDelete="handleReceiveHandleDelete"
            v-on:receiveHandleModify="handleModify"
            :filter_mode_on="false"
            v-on:receiveColumnRearrange="handleColumnRearrange"
            v-on:filter_column="handleFilterColumn"
            :forceLoading="supItemListForceLoading"
            :column_reordering="true"
            :row_reordering="false"
            v-on:receiveHandleClearFilter="handleClearFilter"
            :pass_visible_columns="visibleColumns"
            />
          </div>
        </div>
      </div>
    </q-card-section>

    <q-card-actions class="dialog_action" align="right">
        <Button v-on:receiveClick="closeSupItemListDialog"
          v-if="page_function != 'view'"
          :pass_label="'Cancel'"
          :pass_no_caps="true"
          :pass_square="true"
          :pass_dense="true"
        />

        <Button v-on:receiveClick="saveSupItemList"
          v-if="page_function != 'view'"
          :pass_label="'Save'"
          :pass_no_caps="true"
          :pass_square="true"
          :pass_dense="true"
          class="custom_button"
        />
    </q-card-actions>

    <q-inner-loading
      :showing="sup_item_list_loading"
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
import TableMerge from 'src/components/ERP/Table/TableMerge.vue';
import { FacebookAuthProvider } from 'firebase/auth'

export default {
data() {
  return{
    ori_params_allocation_dialog: {},
    table_title_allocation_dialog: '',
    table_data_allocation_dialog: [],
    table_column_allocation_dialog: [],
    allocationDialog: false,
    ori_params_allocation: {},
    table_title_allocation: '',
    table_data_allocation: [],
    table_column_allocation: [],
    first_run_search: true,
    order_type_options: [
      {"label": "NA", "value": '0'},
      {"label": "Conventional", "value": '1'},
      {"label": "Flowthrough", "value": '2'},
    ],
    po_pur_group_options: [],
    barcode_options: [],
    sup_item_list_loading: false,
    sup_item_list_dialog: false,
    supItemListForceLoading: false,
    sup_item_list_ori_params: {},
    sup_item_list_table_data: [],
    sup_item_list_table_column: [],
    show_table: false,
    item_loading: false,
    item_ori_params: {},
    item_table_data: [],
    item_table_column: [],
    itemForceLoading: false,
    search_type_options: [
      {
        label: 'ArticleNo',
        value: 'ArticleNo'
      },
      {
        label: 'Barcode',
        value: 'Barcode'
      },
      {
        label: 'Description',
        value: 'Description'
      },
      {
        label: 'Itemcode',
        value: 'Itemcode'
      },
    ],
    item_dialog: false,
    search_supplier: false,
    search_type: '',
    search_value: '',
    table_data_amendment: [],
    table_column_amendment: [],
    ori_params_amendment: {},
    forceLoadingAmendment: false,
    location_options: [],
    loc_group_options: [],
    ori_payload: {},
    child_dialog: false,
    child_loading: false,
    child_action: null,
    page_count: 1,
    showAddLoading: false,
    visibleColumns: [],
    step: 1,
    tab: 'Product',
    json: {},
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
    cost_centre_options: [],
    supplier_options: [],
    term_options: [],
    cal_due_date_by_options: [],
    receiving_location_options: [],
    forceLoading: false,
    ori_params: {},
    table_column: [],
    table_data: [],
    language: sessionStorage.getItem("language") != "" && sessionStorage.getItem("language") != "null" && sessionStorage.getItem("language") != null ? sessionStorage.getItem("language") : [],
    session_outlet_guid: sessionStorage.getItem("session_outlet_guid") != "" && sessionStorage.getItem("session_outlet_guid") != "null" && sessionStorage.getItem("session_outlet_guid") != null ? sessionStorage.getItem("session_outlet_guid") : [],
    outlet_code: sessionStorage.getItem("outlet_code") != "" && sessionStorage.getItem("outlet_code") != "null" && sessionStorage.getItem("outlet_code") != null ? sessionStorage.getItem("outlet_code") : [],
    getuser: sessionStorage.getItem("getuser") != "" && sessionStorage.getItem("getuser") != "null" && sessionStorage.getItem("getuser") != null ? sessionStorage.getItem("getuser") : [],
    offset: 0,
    total_row: 0,
    page_function: null,
    disable_previous_button: true,
    disable_next_button: true,
    RefNo: '',
    jsonc: {
      Itemcode: '',
      Description: '',
      Barcode: '',
      PackSize: '',
      ArticleNo: '',
      BulkQty: '',
      PackSize: '',
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
    },
    table_title_hierarchy: '',
    table_data_hierarchy: [],
    table_column_hierarchy: [],
    ori_params_hierarchy: {},
    forceLoadingHierarchy: false,
    table_title_inventory: '',
    table_data_inventory: [],
    table_column_inventory: [],
    ori_params_inventory: {},
    forceLoadingInventory: false,
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

  var RefNo = this.$route.query.RefNo;

  if(RefNo)
  {
    if(this.$route.name == 'PurchaseOrderDetailsView')
    {
      this.page_function = 'view'

      var json = {
        name: this.$route.name,
        query: this.$route.query,
      };

      sessionStorage.setItem("original_route", JSON.stringify(json));
    }
    else if(this.$route.name == 'PurchaseOrderDetails')
    {
      this.page_function = 'edit'
    }

    this.RefNo = RefNo;

  }
  else
  {
    if(this.$route.name == 'PurchaseOrderDetails')
    {
      this.page_function = 'create'
      this.showAddLoading = false;
    }
    else
    {
      alert('Parameter incorrect');
      this.$router.push("GoodsReceivedNote");
      return;
    }
  }

},
async mounted(){

    this.showAddLoading = true;
    this.location_options = await this.getLocation();
    this.cost_centre_options = await this.getSubDept();
    this.supplier_options = await this.getSupplier();
    this.currency_options = await this.getCurrencyOptions();

    // this.location_options = await this.getBranch();
    this.loc_group_options = await this.getBranch();

    var active_tab = JSON.parse(JSON.stringify(this.tab));

    await this.discoverTabs(active_tab, 'hide');


    var offset = Number(this.$route.query.offset);
    var total_row = Number(this.$route.query.total_row);

    // if(this.RefNo)
    // {
    //   if(this.$route.name == 'PurchaseOrderDetailsView')
    //   {
    //     this.page_function = 'view'
    //   }
    //   else
    //   {
    //     this.page_function = 'edit'
    //   }

    //   await this.trigger_search_supcus()
    // }
    // else
    // {
    //   this.page_function = 'create'
    //   this.showAddLoading = false;
    // }

    if(this.page_function == 'view' || this.page_function == 'edit')
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
    allocationDialogHandleTableChange(newVal)
    {
      var new_params = this.$pluginsTableParams(newVal)

      var payload = {
          params : new_params
      };

      this.ori_params_allocation_dialog = payload;

      if(this.tab != 'Allocation')
      {
        return;
      }
      this.table_function_allocation_dialog(payload);
    },
    async table_function_allocation_dialog(ori_payload){

      var payload = ori_payload;

      var table_column = [
        {
          name: "itemcode",
          required: true,
          label: "Itemcode",
          align: 'left',
          sortable: true,
          field: "itemcode",
          format_child: '',
          tooltip: '',
          headerStyle: 'text-align: center;',
          filter_type: 'input',
          filter_options: [],
          filter_value: '',
          data_type: "text",
          data_decimal: "",
        },
        {
          name: "qty_po",
          required: true,
          label: "Qty PO",
          align: 'right',
          sortable: true,
          field: "qty_po",
          format_child: '',
          tooltip: '',
          headerStyle: 'text-align: center;',
          filter_type: 'input',
          filter_options: [],
          filter_value: '',
          data_type: "input_number",
          data_decimal: "",
        },
        {
          name: "created_at",
          required: true,
          label: "Created At",
          align: 'left',
          sortable: true,
          field: "created_at",
          format_child: '',
          tooltip: '',
          headerStyle: 'text-align: center;',
          filter_type: 'input',
          filter_options: [],
          filter_value: '',
          data_type: "text",
          data_decimal: "",
        },
        {
          name: "created_by",
          required: true,
          label: "Created By",
          align: 'left',
          sortable: true,
          field: "created_by",
          format_child: '',
          tooltip: '',
          headerStyle: 'text-align: center;',
          filter_type: 'input',
          filter_options: [],
          filter_value: '',
          data_type: "text",
          data_decimal: "",
        },
        {
          name: "updated_at",
          required: true,
          label: "Updated At",
          align: 'left',
          sortable: true,
          field: "updated_at",
          format_child: '',
          tooltip: '',
          headerStyle: 'text-align: center;',
          filter_type: 'input',
          filter_options: [],
          filter_value: '',
          data_type: "text",
          data_decimal: "",
        },
        {
          name: "updated_by",
          required: true,
          label: "Updated By",
          align: 'left',
          sortable: true,
          field: "updated_by",
          format_child: '',
          tooltip: '',
          headerStyle: 'text-align: center;',
          filter_type: 'input',
          filter_options: [],
          filter_value: '',
          data_type: "text",
          data_decimal: "",
        }
      ];

      this.table_column_allocation_dialog = table_column;

      //put return here
      if(this.page_function == 'create' || this.page_function == 'view')
      {
        // alert('barcode')
          table_column = table_column.filter((entry)=>{
              return entry.name != 'action'
          })
      }

      if(this.page_function == 'create'){
          this.table_data_allocation_dialog = {
          "data": {
            "count": 0,
            "next": null,
            "previous": null,
            "results": []
          }
        };
        return;
      }

      var payload = ori_payload.params;

      payload.limit = payload.limit;
      payload.skip = payload.offset;
      payload.hierarchy = '0';
      payload.Itemcode = '1108306';

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

      var payload = {
        pass_json: payload
      };

      this.ori_params_allocation_dialog = JSON.parse(JSON.stringify(payload))
      var object_pass = {
        "dispatch": 'inventory/trigger_post_get_ibt_consolidate_c', //refer to path/function_name in store actions.js
        "getter": 'inventory/get_get_ibt_consolidate_c', //refer to path/function_name in store getters.js
        "app": this, //compulsory passed variable
        "payload": payload //payload that needed to use in store actions.js
      };

      var dispatch_response_barcode = await this.$dispatch(object_pass);

      var status = dispatch_response_barcode.status

      if(status == "failed"){
        this.table_data_allocation_dialog = {
          "data": {
            "count": 0,
            "next": null,
            "previous": null,
            "results": []
          }
        };
      }else{
        var results = dispatch_response_barcode.response.detail;

        // else if(this.page_function == 'EditItemmaster'){
            this.table_data_allocation_dialog = {
            "data": {
              "count": dispatch_response_barcode.response.total_row,
              "next": null,
              "previous": null,
              "results": dispatch_response_barcode.response.detail
            }
          };
        // }

      }
    },
    handleAllocation()
    {
      this.allocationDialog = true;
    },
    handleTableChangeAllocation: function(newVal)
    {
      var new_params = this.$pluginsTableParams(newVal)

      var payload = {
          params : new_params
      };

      this.ori_params_allocation = payload;

      if(this.tab != 'Allocation')
      {
        return;
      }
      this.table_function_allocation(payload);
    },
    async table_function_allocation(ori_payload){

        var payload = ori_payload;

        var table_column = [
          {
            name: "itemcode",
            required: true,
            label: "Itemcode",
            align: 'left',
            sortable: true,
            field: "itemcode",
            format_child: '',
            tooltip: '',
            headerStyle: 'text-align: center;',
            filter_type: 'input',
            filter_options: [],
            filter_value: '',
            data_type: "text",
            data_decimal: "",
          },
          {
            name: "created_at",
            required: true,
            label: "Created At",
            align: 'left',
            sortable: true,
            field: "created_at",
            format_child: '',
            tooltip: '',
            headerStyle: 'text-align: center;',
            filter_type: 'input',
            filter_options: [],
            filter_value: '',
            data_type: "text",
            data_decimal: "",
          },
          {
            name: "created_by",
            required: true,
            label: "Created By",
            align: 'left',
            sortable: true,
            field: "created_by",
            format_child: '',
            tooltip: '',
            headerStyle: 'text-align: center;',
            filter_type: 'input',
            filter_options: [],
            filter_value: '',
            data_type: "text",
            data_decimal: "",
          },
          {
            name: "updated_at",
            required: true,
            label: "Updated At",
            align: 'left',
            sortable: true,
            field: "updated_at",
            format_child: '',
            tooltip: '',
            headerStyle: 'text-align: center;',
            filter_type: 'input',
            filter_options: [],
            filter_value: '',
            data_type: "text",
            data_decimal: "",
          },
          {
            name: "updated_by",
            required: true,
            label: "Updated By",
            align: 'left',
            sortable: true,
            field: "updated_by",
            format_child: '',
            tooltip: '',
            headerStyle: 'text-align: center;',
            filter_type: 'input',
            filter_options: [],
            filter_value: '',
            data_type: "text",
            data_decimal: "",
          }
        ];

        this.table_column_allocation = table_column;

        //put return here
        if(this.page_function == 'create' || this.page_function == 'view')
        {
          // alert('barcode')
            table_column = table_column.filter((entry)=>{
                return entry.name != 'action'
            })
        }

        if(this.page_function == 'create'){
            this.table_data_allocation = {
            "data": {
              "count": 0,
              "next": null,
              "previous": null,
              "results": []
            }
          };
          return;
        }

        var payload = ori_payload.params;

        payload.limit = payload.limit;
        payload.skip = payload.offset;
        payload.hierarchy = '0';
        payload.Itemcode = '1108306';

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

        var payload = {
          pass_json: payload
        };

        this.ori_params_allocation = JSON.parse(JSON.stringify(payload))
        var object_pass = {
          "dispatch": 'inventory/trigger_post_get_ibt_consolidate_c', //refer to path/function_name in store actions.js
          "getter": 'inventory/get_get_ibt_consolidate_c', //refer to path/function_name in store getters.js
          "app": this, //compulsory passed variable
          "payload": payload //payload that needed to use in store actions.js
        };

        var dispatch_response_barcode = await this.$dispatch(object_pass);

        var status = dispatch_response_barcode.status

        if(status == "failed"){
          this.table_data_allocation = {
            "data": {
              "count": 0,
              "next": null,
              "previous": null,
              "results": []
            }
          };
        }else{
          var results = dispatch_response_barcode.response.detail;

          // else if(this.page_function == 'EditItemmaster'){
              this.table_data_allocation = {
              "data": {
                "count": dispatch_response_barcode.response.total_row,
                "next": null,
                "previous": null,
                "results": dispatch_response_barcode.response.detail
              }
            };
          // }

        }
    },
    optionsDateEndNew(date)
    {
      // var start_date = this.outlet_master_lease_start.replaceAll('-','/');
      // var end_date = this.outlet_master_lease_end.replaceAll('-','/');

      var start_date = this.json.PODate.replaceAll('-','/');
      var end_date = "99999999/12/31";

      return date >= start_date && date <= end_date;
    },
    optionsDateEnd(date)
    {
      // var start_date = this.outlet_master_lease_start.replaceAll('-','/');
      // var end_date = this.outlet_master_lease_end.replaceAll('-','/');
        
      const today = new Date();

      const year = today.getFullYear(); // Get the full year (YYYY)
      const month = String(today.getMonth() + 1).padStart(2, '0'); // Get the month (0-11), so add 1, and pad with '0'
      const day = String(today.getDate()).padStart(2, '0'); // Get the day of the month and pad with '0'

      var formattedDate = `${year}/${month}/${day}`;

      var start_date = formattedDate;
      var end_date = "99999999/12/31";

      return date >= start_date && date <= end_date;
    },
    handleSearchItem()
    {
      if(!this.search_value)
      {
        this.showNotify('negative', 'Please enter search value.')
        this.show_table = false;
        return;
      }

      this.show_table = true;

      if(this.first_run_search)
      {
        this.first_run_search = false;
      }
      else
      {
        delete this.item_ori_params.params['ArticleNo'];
        delete this.item_ori_params.params['Barcode'];
        delete this.item_ori_params.params['Description'];
        delete this.item_ori_params.params['Itemcode'];
        this.item_table_function(this.item_ori_params);
      }

    },
    // handleCancel()
    // {
    //   var RefNo = this.$route.query.prev_RefNo;
    //   var offset = this.$route.query.prev_offset;
    //   var total_row = this.$route.query.prev_total_row;

    //   this.$router.push({
    //     name: 'PurchaseOrderDetailsView',
    //     query: { RefNo: RefNo, offset: offset, total_row: total_row }
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
    async call_dept(code)
    {
      var payload = {
        "pass_json": {
          "Code": code,
          "skip": 0,
          "limit": 99999999,
          "sort_by": "Code",
          "sort_type": "Asc",
          "outlet_guid": this.session_outlet_guid,
          "language": this.language,
        }//pass_json should be the field or data wish to be created.
      };

      var object_pass = {
          "dispatch": 'setup/trigger_post_read_department', //refer to path/function_name in store actions.js
          "getter": 'setup/get_read_department', //refer to path/function_name in store getters.js
          "app": this, //compulsory passed variable
          "payload": payload //payload that needed to use in store actions.js
      };

      var dispatch_response = await this.$dispatch(object_pass);
      var array = '';

      if(dispatch_response.status)
      {
        var results = dispatch_response.response.detail;
        array = results[0].Description;
      }
      else
      {
        var error_message = 'Failed to get Dept. Please try again.';
        this.showNotify("negative", error_message);
      }

      return array;
    },
    async call_sub_dept(code)
    {
      var payload = {
        "pass_json": {
          "Code": code,
          "skip": 0,
          "limit": 99999999,
          "sort_by": "Code",
          "sort_type": "Asc",
          "outlet_guid": this.session_outlet_guid,
          "language": this.language
        }//pass_json should be the field or data wish to be created.
      };

      var object_pass = {
          "dispatch": 'setup/trigger_post_read_subdept', //refer to path/function_name in store actions.js
          "getter": 'setup/get_read_subdept', //refer to path/function_name in store getters.js
          "app": this, //compulsory passed variable
          "payload": payload //payload that needed to use in store actions.js
      };

      var dispatch_response = await this.$dispatch(object_pass);
      var array = '';

      if(dispatch_response.status)
      {
        var results = dispatch_response.response.detail;
        array = results[0].Description;
      }
      else
      {
        var error_message = 'Failed to get SubDept. Please try again.';
        this.showNotify("negative", error_message);
      }

      return array;

    },
    async call_category(code)
    {
      var payload = {
        "pass_json": {
          "Code": code,
          "skip": 0,
          "limit": 99999999,
          "sort_by": "Code",
          "sort_type": "Asc",
          "outlet_guid": this.session_outlet_guid,
          "language": this.language
        }//pass_json should be the field or data wish to be created.
      };

      var object_pass = {
          "dispatch": 'setup/trigger_post_read_category', //refer to path/function_name in store actions.js
          "getter": 'setup/get_read_category', //refer to path/function_name in store getters.js
          "app": this, //compulsory passed variable
          "payload": payload //payload that needed to use in store actions.js
      };

      var dispatch_response = await this.$dispatch(object_pass);
      var array = '';

      if(dispatch_response.status)
      {
        var results = dispatch_response.response.detail;
        array = results[0].Description;
      }
      else
      {
        var error_message = 'Failed to get SubDept. Please try again.';
        this.showNotify("negative", error_message);
      }

      return array;

    },
    async handleReceiveClickTableData(row, col_name)
    {
      this.showAddLoading = true;

      if(col_name == 'Dept')
      {
        row.row.dept_desc = await this.call_dept(row.row.Dept);
        this.showAddLoading = false;
      }
      else if(col_name == 'SubDept')
      {
        row.row.subdept_desc = await this.call_sub_dept(row.row.SubDept);
        this.showAddLoading = false;
      }
      else if(col_name == 'Category')
      {
        row.row.category_desc = await this.call_category(row.row.Category);
        this.showAddLoading = false;
      }
    },
    handleEdit()
    {
      var offset = this.$route.query.offset;
      var total_row = this.$route.query.total_row;

      this.$router.push({
          name: "PurchaseOrderDetails",
          query: { RefNo: this.RefNo, offset: offset, total_row: total_row}
      });

    },
    handleModify(col_value, col_name, row)
    {
      row.Qty = this.unformatAmount(row.Qty);
      row.Qty_foc = this.unformatAmount(row.Qty_foc);
      row.BulkQty = this.unformatAmount(row.BulkQty);
      row.BulkFOC = this.unformatAmount(row.BulkFOC);

      if(col_name.startsWith('Qty'))
      {
        if(row.BulkQty != 0 || row.BulkFOC != 0)
        {
          row[col_name] = 0
        }
      }
      else if(col_name.startsWith('Bulk'))
      {
        row.Qty = 0;
        row.Qty_foc = 0;
      }
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
    async addItem()
    {
      this.item_loading = true;

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

      if(!this.json.PODate)
      {
        this.showNotify('negative', 'Please fill in PO date to continue');
        return;
      }

      var payload = {
        "pass_json": {
          "itemcode": selected_row.Itemcode,
          "supplier_code": this.json.SCode,
          "po_date": this.json.PODate,
          "outlet": this.outlet_code,
          "user": this.getuser,
          "outlet_guid": this.session_outlet_guid,
          "skip": 0,
          "limit": 1,
          "language": this.language,
        },
      };

      var object_pass = {
          "dispatch": 'purchase/trigger_post_get_item_by_itemcode_for_po', //refer to path/function_name in store actions.js
          "getter": 'purchase/get_item_by_itemcode_for_po', //refer to path/function_name in store getters.js
          "app": this, //compulsory passed variable
          "payload": payload //payload that needed to use in store actions.js
      };

      var dispatch_response = await this.$dispatch(object_pass);

      if(dispatch_response.status){
        if(dispatch_response.response)
        {
          var result = dispatch_response.response;
          var ary = [];
          for(var i in result.barcode)
          {
            var obj = {
              label: result.barcode[i],
              value: result.barcode[i]
            }
            ary.push(obj)
          }
          this.barcode_options = ary;
          setTimeout(()=>{
            result.EntryType = 'Unit'; //hardcode
            result.PriceType = 'Norm'; //hardcode
            result.Qty = this.formatAmount(result.SetQty, 'qty');
            result.Disc1Value = this.formatAmount(result.Disc1value, '$');
            result.DiscAmt = '0.00'; //hardcode
            result.TotalPrice = '0.00'; //hardcode
            result.DiscAmt = '0.00'; //hardcode
            result.BulkQty = '0'; //hardcode
            result.rebate_value = '0.00'; //hardcode
            result.price_future = '0.00'; //hardcode
            result.Qty_foc = this.formatAmount(result.SetQtyFoc, 'qty');
            result.Qty_foc = this.formatAmount(result.SetQtyFoc, 'qty');
            this.jsonc = result;
            this.jsonc.Barcode = this.barcode_options[0].value;
          }, 100)
        }
        else
        {
          this.showNotify('negative', 'Failed to get item result')
          return;
        }
      }

      this.showAddLoading = false;
      this.jsonc = selected_row;
      this.item_loading = false;
      this.item_dialog = false;
      this.search_supplier = false;
      this.search_value = '';
      this.search_type = 'Barcode';
      this.item_table_data = [];
      this.item_table_column = [];
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
    handleSelectSupItemList(row)
    {
      this.$nextTick(()=>{
        for(var i in this.sup_item_list_table_data.data.results)
        {
          var new_row =  this.sup_item_list_table_data.data.results[i]
          new_row.select = false;
        }

        row.row.select = true;
      })
    },
    closeSupItemListDialog()
    {
      this.sup_item_list_dialog = false;
      this.sup_item_list_table_data = [];
      this.sup_item_list_table_column = [];
    },
    handleShowSupplierItemList()
    {
      if(this.json.BillStatus == 1)
      {
          this.showNotify("negative","This Doc already posted.");
          return;
      }

      if(!this.json.SCode)
      {
        this.showNotify('negative', 'Please select supplier for doc.')
        this.sup_item_list_dialog = false;
        return;
      }

      this.sup_item_list_dialog = true;
    },
    showSearchTable()
    {
      if(!this.json.SCode)
      {
        this.showNotify('negative', 'Please select supplier for doc.')
        this.show_table = false;
        return;
      }

      if(!this.search_value)
      {
        this.showNotify('negative', 'Please enter search value.')
        this.show_table = false;
        return;
      }

      this.show_table = true;
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
        payload.supplier_code = this.json.SCode;
        payload.user = this.getuser;
        payload[this.search_type] = this.search_value;

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
            "dispatch": 'purchase/trigger_post_search_item_for_po', //refer to path/function_name in store actions.js
            "getter": 'purchase/get_search_item_for_po', //refer to path/function_name in store getters.js
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
              results[i].PackSize = this.formatAmount(results[i].PackSize, '$')
              results[i].LastCost = this.formatAmount(results[i].LastCost, '$')
              results[i].list_cost = this.formatAmount(results[i].list_cost, '$')
              results[i].AverageCost = this.formatAmount(results[i].AverageCost, '$')
              results[i].SellingPrice = this.formatAmount(results[i].SellingPrice, '$')
              results[i].cartonprice = this.formatAmount(results[i].cartonprice, '$')
              results[i].avg_qty = this.formatAmount(results[i].avg_qty, 'qty')
              results[i].period_qty = this.formatAmount(results[i].period_qty, 'qty')
              results[i].BulkQty = this.formatAmount(results[i].BulkQty, 'qty')
            }

            this.item_table_data =
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
                  name: 'list_cost',
                  required: true,
                  label: 'List Cost',
                  align: 'right',
                  sortable: true,
                  field: 'list_cost',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center; width: 1%; color: red;',
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
                  name: 'rank',
                  required: true,
                  label: 'Rank',
                  align: 'left',
                  sortable: true,
                  field: 'rank',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center; width: 1%; color: red;',
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
              },
              {
                  name: 'avg_qty',
                  required: true,
                  label: 'Avg Qty',
                  align: 'right',
                  sortable: true,
                  field: 'avg_qty',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center; width: 1%; color: red;',
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
                  name: 'qoh',
                  required: true,
                  label: 'QoH',
                  align: 'left',
                  sortable: true,
                  field: 'qoh',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center; width: 1%; color: red;',
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
              {
                  name: 'dept_desc',
                  required: true,
                  label: 'Dept.Desc',
                  align: 'left',
                  sortable: true,
                  field: 'dept_desc',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center; width: 1%; color: red;',
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
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
                  headerStyle: 'text-align: center; width: 1%;',
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
              },
              {
                  name: 'subdept_desc',
                  required: true,
                  label: 'Subdept.Desc',
                  align: 'left',
                  sortable: true,
                  field: 'subdept_desc',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center; width: 1%; color: red;',
                  filter_type: 'input',
                  filter_options: [],
                  filter_value: '',
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
        this.itemForceLoading = false;
    },
    showSearchDialog()
    {
      if(this.json.BillStatus == 1)
      {
          this.showNotify("negative",this.$language('C0012'));//"This Doc already posted."
          return;
      }

      this.item_dialog = true;
      this.search_supplier = false;
      this.search_value = '';
      this.search_type = 'Barcode';
      this.show_table = false;
      this.barcode_options = [];

    },
    supItemListHandleTableChange: function(newVal)
    {
          var new_params = this.$pluginsTableParams(newVal)

          var payload = {
              params : new_params
          };

          this.sup_item_list_ori_params = payload;
          this.sup_item_list_table_function(payload);
    },
    async sup_item_list_table_function(ori_params){
      this.supItemListForceLoading = true;

        var payload = ori_params.params
        payload.skip = payload.offset;
        payload.limit = payload.limit;
        payload.outlet_guid = this.session_outlet_guid;//session
        payload.language = this.language;
        payload.supplier_code = this.json.SCode;
        payload.user = this.getuser;
        payload.po_date = this.json.PODate;
        payload.outlet = this.outlet_code;
        payload[this.search_type] = this.search_value;

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
            payload.ordering = "LastStamp"
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
            "dispatch": 'purchase/trigger_post_read_po_supplier_list', //refer to path/function_name in store actions.js
            "getter": 'purchase/get_po_supplier_list', //refer to path/function_name in store getters.js
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
              results[i].Qty = 0;
              results[i].Qty_foc = 0;
              results[i].BulkQty = 0;
              results[i].BulkFOC = 0;
            }

            this.sup_item_list_table_data =
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
            this.sup_item_list_table_data = {
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
                    sortable: true,
                    field: 'Itemcode',
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
                    name: 'ArticleNo',
                    required: true,
                    label: 'Article #',
                    align: 'left',
                    sortable: true,
                    field: 'ArticleNo',
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
                    name: 'Description',
                    required: true,
                    label: 'Description',
                    align: 'left',
                    sortable: true,
                    field: 'Description',
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
                    name: 'priority',
                    required: true,
                    label: 'Priority',
                    align: 'left',
                    sortable: true,
                    field: 'priority',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; color: red;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 5,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 5,
                    end_index: 5,
                    rowspan: '2',
                },
                {
                    name: 'Qty',
                    required: true,
                    label: 'Qty',
                    align: 'left',
                    sortable: true,
                    field: 'Qty',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; color: red;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 6,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 6,
                    end_index: 6,
                    rowspan: '2',
                },
                {
                    name: 'Qty_foc',
                    required: true,
                    label: 'FOC Qty',
                    align: 'left',
                    sortable: true,
                    field: 'Qty_foc',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; color: red;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 7,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 7,
                    end_index: 7,
                    rowspan: '2',
                },
                {
                    name: 'Disc1Value',
                    required: true,
                    label: 'Disc1Value',
                    align: 'right',
                    sortable: true,
                    field: 'Disc1Value',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 8,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 8,
                    end_index: 8,
                    rowspan: '2',
                },
                {
                    name: 'Disc1Type',
                    required: true,
                    label: '',
                    align: 'right',
                    sortable: true,
                    field: 'Disc1Type',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 9,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 9,
                    end_index: 9,
                    rowspan: '2',
                },
                {
                    name: 'Disc2Value',
                    required: true,
                    label: 'Disc2Value',
                    align: 'right',
                    sortable: true,
                    field: 'Disc2Value',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 10,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 10,
                    end_index: 10,
                    rowspan: '2',
                },
                {
                    name: 'Disc2Type',
                    required: true,
                    label: '',
                    align: 'right',
                    sortable: true,
                    field: 'Disc2Type',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 11,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 11,
                    end_index: 11,
                    rowspan: '2',
                },
                {
                    name: 'NetUnitPrice',
                    required: true,
                    label: 'Net Price',
                    align: 'right',
                    sortable: true,
                    field: 'NetUnitPrice',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 12,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 12,
                    end_index: 12,
                    rowspan: '2',
                },
                {
                    name: 'PackSize',
                    required: true,
                    label: 'Order Lot Size',
                    align: 'right',
                    sortable: true,
                    field: 'PackSize',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 13,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 13,
                    end_index: 13,
                    rowspan: '2',
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
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 14,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 14,
                    end_index: 14,
                    rowspan: '2',
                },
                {
                    name: 'BulkFOC',
                    required: true,
                    label: 'Bulk FOC',
                    align: 'left',
                    sortable: true,
                    field: 'BulkFOC',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; color: red;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 15,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 15,
                    end_index: 15,
                    rowspan: '2',
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
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 21,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 21,
                    end_index: 21,
                    rowspan: '2',
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
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 22,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 22,
                    end_index: 22,
                    rowspan: '2',
                },
                {
                    name: 'SalesTempQty',
                    required: true,
                    label: 'POS',
                    align: 'right',
                    sortable: true,
                    field: 'SalesTempQty',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 23,
                    colspan: 11,
                    colspan_name: 'Stock Movement',
                    start_index: 23,
                    end_index: 33,
                    rowspan: '0',
                },
                {
                    name: 'OnHandQty',
                    required: true,
                    label: 'QOH',
                    align: 'right',
                    sortable: true,
                    field: 'OnHandQty',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: false,
                    main_column_name: 'SalesTempQty',
                    index: 0,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 0,
                    end_index: 0,
                    rowspan: '0',
                },
                {
                    name: 'OpeningQty',
                    required: true,
                    label: 'Opening',
                    align: 'right',
                    sortable: true,
                    field: 'OpeningQty',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: false,
                    main_column_name: 'SalesTempQty',
                    index: 0,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 0,
                    end_index: 0,
                    rowspan: '0',
                },
                {
                    name: 'ReceivedQty',
                    required: true,
                    label: 'GRN',
                    align: 'right',
                    sortable: true,
                    field: 'ReceivedQty',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: false,
                    main_column_name: 'SalesTempQty',
                    index: 0,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 0,
                    end_index: 0,
                    rowspan: '0',
                },
                {
                    name: 'Invoice',
                    required: true,
                    label: 'Invoice (unknown_field)',
                    align: 'left',
                    sortable: true,
                    field: 'Invoice',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: false,
                    main_column_name: 'SalesTempQty',
                    index: 0,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 0,
                    end_index: 0,
                    rowspan: '0',
                },
                {
                    name: 'CreditQty',
                    required: true,
                    label: 'CN',
                    align: 'right',
                    sortable: true,
                    field: 'CreditQty',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: false,
                    main_column_name: 'SalesTempQty',
                    index: 0,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 0,
                    end_index: 0,
                    rowspan: '0',
                },
                {
                    name: 'DebitQty',
                    required: true,
                    label: 'DN',
                    align: 'right',
                    sortable: true,
                    field: 'DebitQty',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: false,
                    main_column_name: 'SalesTempQty',
                    index: 0,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 0,
                    end_index: 0,
                    rowspan: '0',
                },
                {
                    name: 'AdjustInQty',
                    required: true,
                    label: 'Adj.In',
                    align: 'right',
                    sortable: true,
                    field: 'AdjustInQty',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: false,
                    main_column_name: 'SalesTempQty',
                    index: 0,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 0,
                    end_index: 0,
                    rowspan: '0',
                },
                {
                    name: 'AdjustOutQty',
                    required: true,
                    label: 'Adj.Out',
                    align: 'right',
                    sortable: true,
                    field: 'AdjustOutQty',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: false,
                    main_column_name: 'SalesTempQty',
                    index: 0,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 0,
                    end_index: 0,
                    rowspan: '0',
                },
                {
                    name: 'TransInQty',
                    required: true,
                    label: 'Trans.In',
                    align: 'right',
                    sortable: true,
                    field: 'TransInQty',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: false,
                    main_column_name: 'SalesTempQty',
                    index: 0,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 0,
                    end_index: 0,
                    rowspan: '0',
                },
                {
                    name: 'TransOutQty',
                    required: true,
                    label: 'Trans.Out',
                    align: 'right',
                    sortable: true,
                    field: 'TransOutQty',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: false,
                    main_column_name: 'SalesTempQty',
                    index: 0,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 0,
                    end_index: 0,
                    rowspan: '0',
                },
                {
                    name: 'StdCost',
                    required: true,
                    label: 'Std Price',
                    align: 'right',
                    sortable: true,
                    field: 'StdCost',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 24,
                    colspan: 3,
                    colspan_name: 'Supplier Info',
                    start_index: 34,
                    end_index: 36,
                    rowspan: '0',
                },
                {
                    name: 'net_price',
                    required: true,
                    label: 'Net Price (unknown_field)',
                    align: 'left',
                    sortable: true,
                    field: 'net_price',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; color: red;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: false,
                    main_column_name: 'StdCost',
                    index: 0,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 0,
                    end_index: 0,
                    rowspan: '0',
                },
                {
                    name: 'LastCost',
                    required: true,
                    label: 'Last Price',
                    align: 'right',
                    sortable: true,
                    field: 'LastCost',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: false,
                    main_column_name: 'StdCost',
                    index: 0,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 0,
                    end_index: 0,
                    rowspan: '0',
                },
                {
                    name: 'base_on_std',
                    required: true,
                    label: 'Base On Std (unknown_field)',
                    align: 'left',
                    sortable: true,
                    field: 'base_on_std',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 25,
                    colspan: 5,
                    colspan_name: 'Order',
                    start_index: 37,
                    end_index: 41,
                    rowspan: '0',
                },
                {
                    name: 'pack_size',
                    required: true,
                    label: 'Pack Size (unknown_field)',
                    align: 'left',
                    sortable: true,
                    field: 'pack_size',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: false,
                    main_column_name: 'base_on_std',
                    index: 0,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 0,
                    end_index: 0,
                    rowspan: '0',
                },
                {
                    name: 'ReorderLevel',
                    required: true,
                    label: 'Reorder Level',
                    align: 'right',
                    sortable: true,
                    field: 'ReorderLevel',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: false,
                    main_column_name: 'base_on_std',
                    index: 0,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 0,
                    end_index: 0,
                    rowspan: '0',
                },
                {
                    name: 'ReorderQty',
                    required: true,
                    label: 'Reorder Qty',
                    align: 'right',
                    sortable: true,
                    field: 'ReorderQty',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: false,
                    main_column_name: 'base_on_std',
                    index: 0,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 0,
                    end_index: 0,
                    rowspan: '0',
                },
                {
                    name: 'MaxLevel',
                    required: true,
                    label: 'Max Level',
                    align: 'right',
                    sortable: true,
                    field: 'MaxLevel',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: false,
                    main_column_name: 'base_on_std',
                    index: 0,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 0,
                    end_index: 0,
                    rowspan: '0',
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
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 26,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 42,
                    end_index: 42,
                    rowspan: '2',
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
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 27,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 43,
                    end_index: 43,
                    rowspan: '2',
                },
            ];

            if(this.page_function == 'create')
            {
                this.sup_item_list_table_data = {
                  "data": {
                      "count": 0,
                      "next": null,
                      "previous": null,
                      "results": []
                  }
                };
            }

        // }

        this.sup_item_list_table_column = table_column;
        this.supItemListForceLoading = false;
    },
    handleAdd()
    {
      this.$router.push({
        name: "PurchaseOrderDetails",
        query: { prev_RefNo: this.RefNo, prev_offset: this.offset, prev_total_row: this.total_row }
      });
      this.page_function = 'create'

      this.table_data = {
          "data": {
              "count": 0,
              "next": null,
              "previous": null,
              "results": []
          }
      };
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
    handleChangeSubTotal1(newVal)
    {
      this.json.SubTotal1 = this.formatAmount(newVal, '$');
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
    handleChangePODate(newVal)
    {
      this.json.PODate = newVal;
    },
    handleChangeDeliverDate(newVal)
    {
      this.json.DeliverDate = newVal;
    },
    handleChangeExpiryDate(newVal)
    {
      this.json.expiry_date = newVal;
    },
    handleChangeDueDate(newVal)
    {
      this.json.DueDate = newVal;
    },
    async getSupplier(){
      var payload = {
        "pass_json": {
          "Type": "S",
          "language": this.language,
          "outlet_guid": this.session_outlet_guid,
          "limit": '9999999',
          "sort_by": "Code",
          "sort_type": "asc"
        },
      };

      var object_pass = {
        "dispatch": 'setup/trigger_post_get_supcus_dropdown',
        "getter": 'setup/get_read_supcus_all',
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
              label: new_row.Code + ' - ' + new_row.Name,
              value: new_row.Code,
              name: new_row.Name,
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
        var error_message = 'Failed to get supplier. Please try again.';
        this.showNotify("negative", error_message);
      }

      return ary;
    },
    async getSubDept()
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

      return await this.$store.dispatch('itemmaster/trigger_read_subdept', payload).then(() => {
        var data = JSON.parse(JSON.stringify(this.$store.getters['itemmaster/get_sub_dept']));
          if(data.detail && data.detail.length > 0)
          {
            for(var i in data.detail)
            {
              var new_row = data.detail[i]
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
          return ary;
        });
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
                "ordering": "-laststamp",
                "sort_by": "laststamp",
                "sort_type": "Desc",
            }
        };

        var new_refno = await this.getRefNo(payload);
        //here should call api and refetch data

        this.offset = offset;
        this.disable_previous_button = this.offset <= '0' ? true : false;
        this.disable_next_button = this.offset >= this.total_row ? true : false;

        if(this.page_function == 'edit')
        {
          this.$router.push({
            name: 'PurchaseOrderDetails',
            query: { RefNo: new_refno, offset: offset, total_row: this.total_row }
          })
        }
        else if(this.page_function == 'view')
        {
          this.$router.push({
            name: 'PurchaseOrderDetailsView',
            query: { RefNo: new_refno, offset: offset, total_row: this.total_row }
          })
        }

    },
    async getRefNo(payload)
    {
      var object_pass = {
          "dispatch": 'purchase/trigger_get_po_read_po', //refer to path/function_name in store actions.js
          "getter": 'purchase/get_po_read_po', //refer to path/function_name in store getters.js
          "app": this, //compulsory passed variable
          "payload": payload //payload that needed to use in store actions.js
      };

      var dispatch_response = await this.$dispatch(object_pass);

      if(dispatch_response.status){
        if(dispatch_response.response.detail)
        {
          return dispatch_response.response.detail[0].RefNo
        }else
        {
          this.showNotify('negative', 'Failed to get po result')
          this.$router.push('PurchaseOrder')
          return '';
        }
      }
      else
      {
        this.showNotify('negative', 'Failed to get po result')
        this.$router.push('PurchaseOrder')
        return '';
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
    async saveSupItemList()
    {
      var results = this.sup_item_list_table_data.data.results;
      var data = [];

      for(var i in results)
      {
        var row = results[i]
        row.RefNo = this.RefNo;
        row.EntryType = "Unit"
        row.PriceType = row.Qty > 0 || row.BulkQty > 0 ? 'Norm' : 'FOC';
        row.Qty = this.unformatAmount(row.Qty);
        row.Qty_foc = this.unformatAmount(row.Qty_foc);
        row.BulkQty = this.unformatAmount(row.BulkQty);
        row.BulkFOC = this.unformatAmount(row.BulkFOC);
        row.DiscAmt = '0';
        row.TotalPrice = '0';
        row.Barcode = row.ItemBarcode;

        if(row.Qty > 0)
        {
          data.push(row)
        }
        else if(row.Qty_foc > 0)
        {
          data.push(row)
        }
        else if(row.BulkQty > 0)
        {
          data.push(row)
        }
        else if(row.BulkFOC > 0)
        {
          data.push(row)
        }
      }

      if(data.length == 0)
      {
        this.showNotify("negative","Please insert quantity.");
        return;
      }

      this.sup_item_list_loading = true;
      this.showAddLoading = true;

      var payload = {
        pass_json: {
          "user": this.getuser,
          "outlet_guid": this.session_outlet_guid,
          "language": this.language,
          "data": data
        }
      }

      var object_pass = {
        "dispatch": 'purchase/trigger_post_bulk_create_pochild',
        "getter": 'purchase/get_bulk_create_pochild_status',
        "app": this,
        "payload": payload,
      };

      var dispatch_response = await this.$dispatch(object_pass);

      if (dispatch_response.status) {
          // success condition
          var success_message = 'Created Successfully.';
          this.showNotify("positive", success_message);
          this.table_function(this.ori_params);
          this.table_function_hierarchy(this.ori_params_hierarchy);
          this.table_function_amendment(this.ori_params_amendment);
          this.table_function_inventory(this.ori_params_inventory);
          this.showAddLoading = false;
          this.sup_item_list_loading = true;
          this.sup_item_list_dialog = true;
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
          this.sup_item_list_loading = false;
      }
    },
    async saveChild()
    {
        if(this.json.BillStatus == 1)
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

        var EntryType = this.jsonc.EntryType;
        var PriceType = this.jsonc.PriceType;
        var Itemcode = this.jsonc.Itemcode;
        var Description = this.jsonc.Description;
        var Barcode = this.jsonc.Barcode;
        var Barcode = this.jsonc.Barcode;
        var PackSize = this.jsonc.PackSize;
        var ArticleNo = this.jsonc.ArticleNo;
        var BulkQty = this.jsonc.BulkQty;
        var Qty = this.jsonc.Qty;
        var Qty_foc = this.jsonc.Qty_foc;
        var UnitPrice = this.jsonc.UnitPrice;
        var DiscAmt = this.jsonc.DiscAmt;
        var Disc1Type = this.jsonc.Disc1Type;
        var Disc1Value = this.jsonc.Disc1Value;
        var Disc2Type = this.jsonc.Disc2Type;
        var Disc2Value = this.jsonc.Disc2Value;
        var NetUnitPrice = '0'; //harcode
        var TotalPrice = '0'; //harcode
        var rebate_value = this.jsonc.rebate_value;
        var price_future = this.jsonc.price_future;

        var payload = {
            pass_json: {
              RefNo: this.RefNo,
              language: this.language,
              outlet_guid: this.outlet_guid,
              user: this.getuser,
              EntryType: EntryType,
              PriceType: PriceType,
              Itemcode: Itemcode,
              Description: Description,
              Barcode: Barcode,
              Barcode: Barcode,
              PackSize: PackSize,
              ArticleNo: ArticleNo,
              BulkQty: BulkQty,
              Qty: Qty,
              Qty_foc: Qty_foc,
              UnitPrice: UnitPrice,
              DiscAmt: DiscAmt,
              Disc1Type: Disc1Type,
              Disc1Value: Disc1Value,
              Disc2Type: Disc2Type,
              Disc2Value: Disc2Value,
              NetUnitPrice: NetUnitPrice,
              TotalPrice: TotalPrice,
              rebate_value: rebate_value,
              price_future: price_future,
            }
        }

        var object_pass = {};

        if(this.child_action == 'create')
        {
          object_pass = {
            "dispatch": 'purchase/trigger_create_pochild_general',
            "getter": 'purchase/get_pochild_status',
            "app": this,
            "payload": payload,
          };
        }
        else if(this.child_action == 'edit')
        {
          payload.pass_json.Qty_foc = '0'; //hardcode
          payload.pass_json.Line = JSON.stringify(this.jsonc.Line);

          object_pass = {
            "dispatch": 'purchase/trigger_update_pochild_general',
            "getter": 'purchase/get_pochild_status',
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
            this.table_function_hierarchy(this.ori_params_hierarchy);
            this.table_function_amendment(this.ori_params_amendment);
            this.table_function_inventory(this.ori_params_inventory);
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
              PackSize: '',
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
    handleChangePurchaseLimit(newVal)
    {
        this.jsonc.limit_control_amt = this.formatAmount(newVal, '$');
        console.log(this.jsonc.limit_control_amt)
    },
    closeBranchDialog()
    {
        this.child_dialog = false;
        this.child_action = null;
        this.jsonc = {
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
    handleShowCreateChild()
    {
      if(this.json.BillStatus == 1)
      {
          this.showNotify("negative","This Doc already posted.");
          return;
      }

      this.child_dialog = true;
      this.child_action = 'create';
    },
    async handleEditChild(row)
    {
      this.child_loading = true;

      var payload = {
        "pass_json": {
          "itemcode": row.row.Itemcode,
          "outlet_guid": this.session_outlet_guid,
          "language": this.language,
        },
      };

      var object_pass = {
          "dispatch": 'purchase/trigger_post_read_barcode_by_itemcode', //refer to path/function_name in store actions.js
          "getter": 'purchase/get_barcode_by_itemcode', //refer to path/function_name in store getters.js
          "app": this, //compulsory passed variable
          "payload": payload //payload that needed to use in store actions.js
      };

      var dispatch_response = await this.$dispatch(object_pass);

      if(dispatch_response.status){
        if(dispatch_response.response)
        {
          var results = dispatch_response.response.detail;

          var ary = [];
          for(var i in results)
          {
            var obj = {
              label: results[i].Barcode,
              value: results[i].Barcode
            }
            ary.push(obj)
          }
          this.barcode_options = ary;
        }
        else
        {
          this.showNotify('negative', 'Failed to get item result')
          return;
        }
      }

      this.child_dialog = true;
      this.child_action = 'edit';
      this.jsonc = JSON.parse(JSON.stringify(row.row));
      this.child_loading = false;
    },
    handleTableChangeInventory(newVal)
    {
        var new_params = this.$pluginsTableParams(newVal)

        var payload = {
            params : new_params
        };

        this.ori_params_inventory = payload;

        this.table_function_inventory(payload);
    },
    async table_function_inventory(ori_params){

        this.forceLoadingInventory = true;

        var payload = ori_params.params
        payload.skip = payload.offset;
        payload.limit = payload.limit;
        payload.outlet_guid = this.session_outlet_guid;//session
        payload.language = this.language;
        payload.RefNo = this.RefNo;

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
            payload.ordering = "RefNo"
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
            "dispatch": 'purchase/trigger_post_read_pochild_general', //refer to path/function_name in store actions.js
            "getter": 'purchase/get_pochild', //refer to path/function_name in store getters.js
            "app": this, //compulsory passed variable
            "payload": payload //payload that needed to use in store actions.js
        };

        var dispatch_response = await this.$dispatch(object_pass);

        if(dispatch_response.status)
        {
            //success condition
            var results = dispatch_response.response.detail;

            this.table_data_inventory =
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
            this.table_data_inventory = {
                "data": {
                    "count": 0,
                    "next": null,
                    "previous": null,
                    "results": []
                }
            };
        }

        var currentDate = new Date();

        // Calculate 'from' month (current month - 3 months)
        var fromDate = new Date();
        fromDate.setMonth(fromDate.getMonth() - 3);

        // Format dates as YYYY-MM
        var fromMonth = fromDate.getFullYear() + '-' + String(fromDate.getMonth() + 1).padStart(2, '0');
        var toMonth = currentDate.getFullYear() + '-' + String(currentDate.getMonth() + 1).padStart(2, '0');
        var month_label = fromMonth + ' to ' + toMonth;

        // if(this.rearrange_column.length > 0)
        // {
        //     var table_column = this.rearrange_column;
        // }
        // else
        // {
            var table_column = [
                {
                    name: 'Line',
                    required: true,
                    label: 'Line',
                    align: 'right',
                    sortable: true,
                    field: 'Line',
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
                    sortable: true,
                    field: 'Itemcode',
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
                    name: 'Description',
                    required: true,
                    label: 'Description',
                    align: 'left',
                    sortable: true,
                    field: 'Description',
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
                    name: 'Qty',
                    required: true,
                    label: 'Unit',
                    align: 'right',
                    sortable: true,
                    field: 'Qty',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 4,
                    colspan: 2,
                    colspan_name: 'Qty Ordered',
                    start_index: 4,
                    end_index: 5,
                    rowspan: '',
                },
                {
                    name: 'Case',
                    required: true,
                    label: 'Case (Unknown)',
                    align: 'left',
                    sortable: true,
                    field: 'Case',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; color: red;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: false,
                    main_column_name: 'Qty',
                    index: 0,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 0,
                    end_index: 0,
                    rowspan: '',
                },
                {
                    name: 'Opn',
                    required: true,
                    label: 'Opn',
                    align: 'left',
                    sortable: true,
                    field: 'Opn',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 5,
                    colspan: 12,
                    colspan_name: month_label,
                    start_index: 6,
                    end_index: 17,
                    rowspan: 0,
                },
                {
                    name: 'GRN',
                    required: true,
                    label: 'GRN',
                    align: 'left',
                    sortable: true,
                    field: 'GRN',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: false,
                    main_column_name: 'Opn',
                    index: 0,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 0,
                    end_index: 0,
                    rowspan: '0',
                },
                {
                    name: 'POS',
                    required: true,
                    label: 'POS',
                    align: 'left',
                    sortable: true,
                    field: 'POS',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: false,
                    main_column_name: 'Opn',
                    index: 0,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 0,
                    end_index: 0,
                    rowspan: '0',
                },
                {
                    name: 'SI',
                    required: true,
                    label: 'SI',
                    align: 'left',
                    sortable: true,
                    field: 'SI',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: false,
                    main_column_name: 'Opn',
                    index: 0,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 0,
                    end_index: 0,
                    rowspan: '0',
                },
                {
                    name: 'Other',
                    required: true,
                    label: 'Other',
                    align: 'left',
                    sortable: true,
                    field: 'Other',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: false,
                    main_column_name: 'Opn',
                    index: 0,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 0,
                    end_index: 0,
                    rowspan: '0',
                },
                {
                    name: 'TBR',
                    required: true,
                    label: 'TBR',
                    align: 'left',
                    sortable: true,
                    field: 'TBR',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: false,
                    main_column_name: 'Opn',
                    index: 0,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 0,
                    end_index: 0,
                    rowspan: '0',
                },
                {
                    name: 'OHB',
                    required: true,
                    label: 'OHB',
                    align: 'left',
                    sortable: true,
                    field: 'OHB',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: false,
                    main_column_name: 'Opn',
                    index: 0,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 0,
                    end_index: 0,
                    rowspan: '0',
                },
                {
                    name: 'DOH',
                    required: true,
                    label: 'DOH',
                    align: 'left',
                    sortable: true,
                    field: 'DOH',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: false,
                    main_column_name: 'Opn',
                    index: 0,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 0,
                    end_index: 0,
                    rowspan: '0',
                },
                {
                    name: 'ADS',
                    required: true,
                    label: 'ADS',
                    align: 'left',
                    sortable: true,
                    field: 'ADS',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: false,
                    main_column_name: 'Opn',
                    index: 0,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 0,
                    end_index: 0,
                    rowspan: '0',
                },
                {
                    name: 'AWS',
                    required: true,
                    label: 'AWS',
                    align: 'left',
                    sortable: true,
                    field: 'AWS',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: false,
                    main_column_name: 'Opn',
                    index: 0,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 0,
                    end_index: 0,
                    rowspan: '0',
                },
                {
                    name: 'AMS',
                    required: true,
                    label: 'AMS',
                    align: 'left',
                    sortable: true,
                    field: 'AMS',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: false,
                    main_column_name: 'Opn',
                    index: 0,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 0,
                    end_index: 0,
                    rowspan: '0',
                },
                {
                    name: 'promo_qty_day',
                    required: true,
                    label: 'Promo Qty & Day',
                    align: 'left',
                    sortable: true,
                    field: 'promo_qty_day',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: false,
                    main_column_name: 'Opn',
                    index: 0,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 0,
                    end_index: 0,
                    rowspan: '0',
                },
                {
                    name: 'os_po_qty',
                    required: true,
                    label: 'OS PO Qty',
                    align: 'left',
                    sortable: true,
                    field: 'os_po_qty',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 6,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 18,
                    end_index: 18,
                    rowspan: '2',
                },
                {
                    name: 'os_ibt_qty',
                    required: true,
                    label: 'OS IBT Qty',
                    align: 'left',
                    sortable: true,
                    field: 'os_ibt_qty',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 7,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 19,
                    end_index: 19,
                    rowspan: '2',
                },
                {
                    name: 'sales_order',
                    required: true,
                    label: 'Sales Order',
                    align: 'left',
                    sortable: true,
                    field: 'sales_order',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 8,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 20,
                    end_index: 20,
                    rowspan: '2',
                },
                {
                    name: 'qty_available',
                    required: true,
                    label: 'Qty Available',
                    align: 'left',
                    sortable: true,
                    field: 'qty_available',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 9,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 21,
                    end_index: 21,
                    rowspan: '2',
                },
                {
                    name: 'date_start',
                    required: true,
                    label: 'Date Start',
                    align: 'left',
                    sortable: true,
                    field: 'date_start',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 10,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 22,
                    end_index: 22,
                    rowspan: '2',
                },
                {
                    name: 'date_end',
                    required: true,
                    label: 'Date End',
                    align: 'left',
                    sortable: true,
                    field: 'date_end',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 11,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 23,
                    end_index: 23,
                    rowspan: '2',
                },
                {
                    name: 'first_grn',
                    required: true,
                    label: 'First GRN',
                    align: 'left',
                    sortable: true,
                    field: 'first_grn',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 12,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 24,
                    end_index: 24,
                    rowspan: '2',
                },
                {
                    name: 'day_analyse',
                    required: true,
                    label: 'Day Analyse',
                    align: 'left',
                    sortable: true,
                    field: 'day_analyse',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 13,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 25,
                    end_index: 25,
                    rowspan: '2',
                },
                {
                    name: 'last_gr_date',
                    required: true,
                    label: 'Last GR Date',
                    align: 'left',
                    sortable: true,
                    field: 'last_gr_date',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 14,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 26,
                    end_index: 26,
                    rowspan: '2',
                },
                {
                    name: 'last_gr_qty',
                    required: true,
                    label: 'Last GR Qty',
                    align: 'left',
                    sortable: true,
                    field: 'last_gr_qty',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 15,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 27,
                    end_index: 27,
                    rowspan: '2',
                },
                {
                    name: 'last_gr_refno',
                    required: true,
                    label: 'Last GR Refno',
                    align: 'left',
                    sortable: true,
                    field: 'last_gr_refno',
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
                    start_index: 28,
                    end_index: 28,
                    rowspan: '2',
                },
                {
                    name: 'last_gr_supplier',
                    required: true,
                    label: 'Last GR Supplier',
                    align: 'left',
                    sortable: true,
                    field: 'last_gr_supplier',
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
                    start_index: 29,
                    end_index: 29,
                    rowspan: '2',
                },
                {
                    name: 'last_po_date',
                    required: true,
                    label: 'Last PO Date',
                    align: 'left',
                    sortable: true,
                    field: 'last_po_date',
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
                    start_index: 30,
                    end_index: 30,
                    rowspan: '2',
                },
                {
                    name: 'last_po_qty',
                    required: true,
                    label: 'Last PO Qty',
                    align: 'left',
                    sortable: true,
                    field: 'last_po_qty',
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
                    start_index: 31,
                    end_index: 31,
                    rowspan: '2',
                },
                {
                    name: 'last_po_refno',
                    required: true,
                    label: 'Last PO Refno',
                    align: 'left',
                    sortable: true,
                    field: 'last_po_refno',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 20,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 32,
                    end_index: 32,
                    rowspan: '2',
                },
                {
                    name: 'last_po_supplier',
                    required: true,
                    label: 'Last PO Supplier',
                    align: 'left',
                    sortable: true,
                    field: 'last_po_supplier',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 21,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 33,
                    end_index: 33,
                    rowspan: '2',
                },
                {
                    name: 'ibt_sales',
                    required: true,
                    label: 'IBT Sales',
                    align: 'left',
                    sortable: true,
                    field: 'ibt_sales',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 22,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 34,
                    end_index: 34,
                    rowspan: '2',
                },
                {
                    name: 'ibt_receive',
                    required: true,
                    label: 'IBT Receive',
                    align: 'left',
                    sortable: true,
                    field: 'ibt_receive',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 23,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 35,
                    end_index: 35,
                    rowspan: '2',
                },
            ];

            if(this.page_function == 'create')
            {
                table_column = table_column.filter((entry)=>{
                    return entry.name != 'action'
                })

                this.table_data_inventory = {
                  "data": {
                      "count": 0,
                      "next": null,
                      "previous": null,
                      "results": []
                  }
                };
            }

        // }

        this.table_column_inventory = table_column;

        this.forceLoadingInventory = false;
    },
    handleTableChangeAmendment(newVal)
    {
        var new_params = this.$pluginsTableParams(newVal)

        var payload = {
            params : new_params
        };

        this.ori_params_amendment = payload;

        this.table_function_amendment(payload);
    },
    async table_function_amendment(ori_params){

        this.forceLoadingAmendment = true;

        var payload = ori_params.params
        payload.skip = payload.offset;
        payload.limit = payload.limit;
        payload.outlet_guid = this.session_outlet_guid;//session
        payload.language = this.language;
        payload.RefNo = this.RefNo;

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
            payload.ordering = "RefNo"
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
            "dispatch": 'purchase/trigger_post_read_pochild_general', //refer to path/function_name in store actions.js
            "getter": 'purchase/get_pochild', //refer to path/function_name in store getters.js
            "app": this, //compulsory passed variable
            "payload": payload //payload that needed to use in store actions.js
        };

        var dispatch_response = await this.$dispatch(object_pass);

        if(dispatch_response.status)
        {
            //success condition
            var results = dispatch_response.response.detail;

            this.table_data_amendment =
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
            this.table_data_amendment = {
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
                    name: 'Line',
                    required: true,
                    label: 'Line',
                    align: 'right',
                    sortable: true,
                    field: 'Line',
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
                    sortable: true,
                    field: 'Itemcode',
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
                    name: 'Description',
                    required: true,
                    label: 'Description',
                    align: 'left',
                    sortable: true,
                    field: 'Description',
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
                    name: 'pack_size',
                    required: true,
                    label: 'Pack Size',
                    align: 'left',
                    sortable: true,
                    field: 'pack_size',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 4,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 4,
                    end_index: 4,
                    rowspan: '2',
                },
                {
                    name: 'case_qty',
                    required: true,
                    label: 'Case Qty',
                    align: 'left',
                    sortable: true,
                    field: 'case_qty',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 5,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 5,
                    end_index: 5,
                    rowspan: '2',
                },
                {
                    name: 'ordering_uom',
                    required: true,
                    label: 'Ordering UOM',
                    align: 'left',
                    sortable: true,
                    field: 'ordering_uom',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 6,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 6,
                    end_index: 6,
                    rowspan: '2',
                },
                {
                    name: 'existing_unit_qty',
                    required: true,
                    label: 'Qty',
                    align: 'right',
                    sortable: true,
                    field: 'existing_unit_qty',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 7,
                    colspan: 3,
                    colspan_name: 'Unit (Existing)',
                    start_index: 7,
                    end_index: 9,
                    rowspan: '',
                },
                {
                    name: 'existing_unit_cost',
                    required: true,
                    label: 'Cost',
                    align: 'right',
                    sortable: true,
                    field: 'existing_unit_cost',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: false,
                    main_column_name: 'existing_unit_qty',
                    index: 0,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 0,
                    end_index: 0,
                    rowspan: '0',
                },
                {
                    name: 'existing_unit_total',
                    required: true,
                    label: 'Total',
                    align: 'right',
                    sortable: true,
                    field: 'existing_unit_total',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: false,
                    main_column_name: 'existing_unit_qty',
                    index: 0,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 0,
                    end_index: 0,
                    rowspan: '0',
                },
                {
                    name: 'new_unit_qty',
                    required: true,
                    label: 'Qty',
                    align: 'right',
                    sortable: true,
                    field: 'new_unit_qty',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 8,
                    colspan: 3,
                    colspan_name: 'Unit (New)',
                    start_index: 10,
                    end_index: 12,
                    rowspan: '',
                },
                {
                    name: 'new_unit_cost',
                    required: true,
                    label: 'Cost',
                    align: 'right',
                    sortable: true,
                    field: 'new_unit_cost',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: false,
                    main_column_name: 'new_unit_qty',
                    index: 0,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 0,
                    end_index: 0,
                    rowspan: '0',
                },
                {
                    name: 'new_unit_total',
                    required: true,
                    label: 'Total',
                    align: 'right',
                    sortable: true,
                    field: 'new_unit_total',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: false,
                    main_column_name: 'new_unit_qty',
                    index: 0,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 0,
                    end_index: 0,
                    rowspan: '0',
                },
                {
                    name: 'existing_case_qty',
                    required: true,
                    label: 'Qty',
                    align: 'right',
                    sortable: true,
                    field: 'existing_case_qty',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 9,
                    colspan: 3,
                    colspan_name: 'Case (Existing)',
                    start_index: 13,
                    end_index: 15,
                    rowspan: '',
                },
                {
                    name: 'existing_case_cost',
                    required: true,
                    label: 'Cost',
                    align: 'right',
                    sortable: true,
                    field: 'existing_case_cost',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: false,
                    main_column_name: 'existing_case_qty',
                    index: 0,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 0,
                    end_index: 0,
                    rowspan: '0',
                },
                {
                    name: 'existing_case_total',
                    required: true,
                    label: 'Total',
                    align: 'right',
                    sortable: true,
                    field: 'existing_case_total',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: false,
                    main_column_name: 'existing_case_qty',
                    index: 0,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 0,
                    end_index: 0,
                    rowspan: '0',
                },
                {
                    name: 'new_case_qty',
                    required: true,
                    label: 'Qty',
                    align: 'right',
                    sortable: true,
                    field: 'new_case_qty',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 10,
                    colspan: 3,
                    colspan_name: 'Case (New)',
                    start_index: 16,
                    end_index: 18,
                    rowspan: '',
                },
                {
                    name: 'new_case_cost',
                    required: true,
                    label: 'Cost',
                    align: 'right',
                    sortable: true,
                    field: 'new_case_cost',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: false,
                    main_column_name: 'new_case_qty',
                    index: 0,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 0,
                    end_index: 0,
                    rowspan: '0',
                },
                {
                    name: 'new_case_total',
                    required: true,
                    label: 'Total',
                    align: 'right',
                    sortable: true,
                    field: 'new_case_total',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: false,
                    main_column_name: 'new_case_qty',
                    index: 0,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 0,
                    end_index: 0,
                    rowspan: '0',
                },
                {
                    name: 'existing_rebate_cn',
                    required: true,
                    label: 'Rebate CN (Existing)',
                    align: 'right',
                    sortable: true,
                    field: 'existing_rebate_cn',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 11,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 19,
                    end_index: 19,
                    rowspan: '2',
                },
                {
                    name: 'new_rebate_cn',
                    required: true,
                    label: 'Rebate CN (New)',
                    align: 'right',
                    sortable: true,
                    field: 'new_rebate_cn',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 12,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 20,
                    end_index: 20,
                    rowspan: '2',
                },
                {
                    name: 'existing_actual_cost',
                    required: true,
                    label: 'Actual Cost (Existing)',
                    align: 'right',
                    sortable: true,
                    field: 'existing_actual_cost',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 13,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 21,
                    end_index: 21,
                    rowspan: '2',
                },
                {
                    name: 'new_actual_cost',
                    required: true,
                    label: 'Actual Cost (New)',
                    align: 'right',
                    sortable: true,
                    field: 'new_actual_cost',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 14,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 22,
                    end_index: 22,
                    rowspan: '2',
                },
                {
                    name: 'existing_disc1',
                    required: true,
                    label: 'Discount 1',
                    align: 'right',
                    sortable: true,
                    field: 'existing_disc1',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 15,
                    colspan: 3,
                    colspan_name: 'Gross Unit Cost with Discount (Existing)',
                    start_index: 23,
                    end_index: 25,
                    rowspan: '',
                },
                {
                    name: 'existing_disc2',
                    required: true,
                    label: 'Discount 2',
                    align: 'right',
                    sortable: true,
                    field: 'existing_disc2',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: false,
                    main_column_name: 'existing_disc1',
                    index: 0,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 0,
                    end_index: 0,
                    rowspan: '0',
                },
                {
                    name: 'existing_g_cost',
                    required: true,
                    label: 'G.Cost',
                    align: 'right',
                    sortable: true,
                    field: 'existing_g_cost',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: false,
                    main_column_name: 'existing_disc1',
                    index: 0,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 0,
                    end_index: 0,
                    rowspan: '0',
                },
                {
                    name: 'new_disc1',
                    required: true,
                    label: 'Discount 1',
                    align: 'right',
                    sortable: true,
                    field: 'new_disc1',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 16,
                    colspan: 3,
                    colspan_name: 'Gross Unit Cost with Discount (New)',
                    start_index: 26,
                    end_index: 28,
                    rowspan: '',
                },
                {
                    name: 'new_disc2',
                    required: true,
                    label: 'Discount 2',
                    align: 'right',
                    sortable: true,
                    field: 'new_disc2',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: false,
                    main_column_name: 'new_disc1',
                    index: 0,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 0,
                    end_index: 0,
                    rowspan: '0',
                },
                {
                    name: 'new_g_cost',
                    required: true,
                    label: 'G.Cost',
                    align: 'right',
                    sortable: true,
                    field: 'new_g_cost',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: false,
                    main_column_name: 'new_disc1',
                    index: 0,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 0,
                    end_index: 0,
                    rowspan: '0',
                },
                {
                    name: 'existing_total_inc_tax',
                    required: true,
                    label: 'Total Inc Tax (Existing)',
                    align: 'right',
                    sortable: true,
                    field: 'existing_total_inc_tax',
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
                    start_index: 29,
                    end_index: 29,
                    rowspan: '2',
                },
                {
                    name: 'new_total_inc_tax',
                    required: true,
                    label: 'Total Inc Tax (New)',
                    align: 'right',
                    sortable: true,
                    field: 'new_total_inc_tax',
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
                    start_index: 30,
                    end_index: 30,
                    rowspan: '2',
                },
            ];

            if(this.page_function == 'create')
            {
                table_column = table_column.filter((entry)=>{
                    return entry.name != 'action'
                })

                this.table_data_amendment = {
                  "data": {
                      "count": 0,
                      "next": null,
                      "previous": null,
                      "results": []
                  }
                };
            }

        // }

        this.table_column_amendment = table_column;

        this.forceLoadingAmendment = false;
    },
    handleTableChangeHierarchy(newVal)
    {
        var new_params = this.$pluginsTableParams(newVal)

        var payload = {
            params : new_params
        };

        this.ori_params_hierarchy = payload;

        this.table_function_hierarchy(payload);
    },
    async table_function_hierarchy(ori_params){

        this.forceLoadingHierarchy = true;

        var payload = ori_params.params
        payload.skip = payload.offset;
        payload.limit = payload.limit;
        payload.outlet_guid = this.session_outlet_guid;//session
        payload.language = this.language;
        payload.RefNo = this.RefNo;

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
            payload.ordering = "RefNo"
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
            "dispatch": 'purchase/trigger_post_read_pochild_general', //refer to path/function_name in store actions.js
            "getter": 'purchase/get_pochild', //refer to path/function_name in store getters.js
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
              results[i].dept_desc = null;
              results[i].subdept_desc = null;
              results[i].category_desc = null;
            }

            this.table_data_hierarchy =
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
            this.table_data_hierarchy = {
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
                    name: 'Line',
                    required: true,
                    label: 'Line',
                    align: 'right',
                    sortable: true,
                    field: 'Line',
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
                    sortable: true,
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
                    name: 'Description',
                    required: true,
                    label: 'Description',
                    align: 'left',
                    sortable: true,
                    field: 'Description',
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
                    name: 'Qty',
                    required: true,
                    label: 'Qty',
                    align: 'right',
                    sortable: true,
                    field: 'Qty',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 0,
                    colspan: 2,
                    colspan_name: 'Qty Ordered',
                    start_index: 0,
                    end_index: 0,
                    rowspan: '',
                },
                {
                    name: 'Case',
                    required: true,
                    label: 'Case (Unknown)',
                    align: 'left',
                    sortable: true,
                    field: 'Case',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; color: red;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: false,
                    main_column_name: 'Qty',
                    index: 0,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 0,
                    end_index: 0,
                    rowspan: '',
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
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 0,
                    colspan: 3,
                    colspan_name: 'Hierarchy',
                    start_index: 0,
                    end_index: 0,
                    rowspan: '',
                },
                {
                    name: 'SubDept',
                    required: true,
                    label: 'Sub-Dept',
                    align: 'left',
                    sortable: true,
                    field: 'SubDept',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: false,
                    main_column_name: 'Dept',
                    index: 0,
                    colspan: 0,
                    colspan_name: '',
                    start_index: '',
                    end_index: '',
                    rowspan: '',
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
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: false,
                    main_column_name: 'Dept',
                    index: 0,
                    colspan: 0,
                    colspan_name: '',
                    start_index: '',
                    end_index: '',
                    rowspan: '',
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
            ];

            if(this.page_function == 'create')
            {
                table_column = table_column.filter((entry)=>{
                    return entry.name != 'action'
                })

                this.table_data_hierarchy = {
                  "data": {
                      "count": 0,
                      "next": null,
                      "previous": null,
                      "results": []
                  }
                };
            }

        // }

        this.table_column_hierarchy = table_column;

        this.forceLoadingHierarchy = false;
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

        var payload = ori_params.params
        payload.skip = payload.offset;
        payload.limit = payload.limit;
        payload.outlet_guid = this.session_outlet_guid;//session
        payload.language = this.language;
        payload.RefNo = this.RefNo;

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
            payload.ordering = "RefNo"
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
            "dispatch": 'purchase/trigger_post_read_pochild_general', //refer to path/function_name in store actions.js
            "getter": 'purchase/get_pochild', //refer to path/function_name in store getters.js
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
                    // results[i].group_status = results[i].group_status == 1;
                    // results[i].TempItem = results[i].TempItem == 1;
                    // results[i].Amendment = results[i].Amendment == 1;
                    // results[i].cost_manual = results[i].cost_manual == 1;
                    results[i].limit_control_amt = this.formatAmount(results[i].limit_control_amt,'$');
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
                    sortable: true,
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
                    name: 'group_status',
                    required: true,
                    label: 'Group',
                    align: 'left',
                    sortable: true,
                    field: 'group_status',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; padding: 7px 8px;',
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
                    name: 'GroupNo',
                    required: true,
                    label: 'Group Seq',
                    align: 'left',
                    sortable: true,
                    field: 'GroupNo',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; padding: 7px 8px;',
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
                    name: 'PriceType',
                    required: true,
                    label: 'Cost Type',
                    align: 'left',
                    sortable: true,
                    field: 'PriceType',
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
                    name: 'Line',
                    required: true,
                    label: 'Line',
                    align: 'right',
                    sortable: true,
                    field: 'Line',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center; padding: 7px 8px;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 4,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 4,
                    end_index: 4,
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
                    headerStyle: 'text-align: center; min-width: 80px;max-width: 80px;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 5,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 5,
                    end_index: 5,
                    rowspan: '2',
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
                    headerStyle: 'text-align: center; min-width: 80px;max-width: 80px;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 6,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 6,
                    end_index: 6,
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
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 7,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 7,
                    end_index: 7,
                    rowspan: '2',
                },
                {
                    name: 'PackSize',
                    required: true,
                    label: 'Pack Size',
                    align: 'right',
                    sortable: true,
                    field: 'PackSize',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 8,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 8,
                    end_index: 8,
                    rowspan: '2',
                },
                {
                    name: 'BQty',
                    required: true,
                    label: 'Case Qty',
                    align: 'right',
                    sortable: true,
                    field: 'BQty',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 9,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 9,
                    end_index: 9,
                    rowspan: '2',
                },
                {
                    name: 'Ordering_uom',
                    required: true,
                    label: 'Ordering UOM (unknown)',
                    align: 'left',
                    sortable: true,
                    field: 'Ordering_uom',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 10,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 10,
                    end_index: 10,
                    rowspan: '2',
                },
                {
                    name: 'Qty',
                    required: true,
                    label: 'Qty',
                    align: 'right',
                    sortable: true,
                    field: 'Qty',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 11,
                    colspan: 3,
                    colspan_name: 'Unit',
                    start_index: 11,
                    end_index: 13,
                    rowspan: '',
                },
                {
                    name: 'UnitPrice',
                    required: true,
                    label: 'Cost',
                    align: 'right',
                    sortable: true,
                    field: 'UnitPrice',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: false,
                    main_column_name: 'Qty',
                    index: 0,
                    colspan: 0,
                    colspan_name: '',
                    start_index: '',
                    end_index: '',
                    rowspan: '',
                },
                {
                    name: 'TotalPrice',
                    required: true,
                    label: 'Total',
                    align: 'right',
                    sortable: true,
                    field: 'TotalPrice',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: false,
                    main_column_name: 'Qty',
                    index: 0,
                    colspan: 0,
                    colspan_name: '',
                    start_index: '',
                    end_index: '',
                    rowspan: '',
                },
                {
                    name: 'BulkQty',
                    required: true,
                    label: 'Qty',
                    align: 'right',
                    sortable: true,
                    field: 'BulkQty',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 12,
                    colspan: 3,
                    colspan_name: 'Case',
                    start_index: 14,
                    end_index: 16,
                    rowspan: '',
                },
                {
                    name: 'BulkCost',
                    required: true,
                    label: 'Cost (unknown)',
                    align: 'right',
                    sortable: true,
                    field: 'BulkCost',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: false,
                    main_column_name: 'BulkQty',
                    index: 0,
                    colspan: 0,
                    colspan_name: '',
                    start_index: '',
                    end_index: '',
                    rowspan: '',
                },
                {
                    name: 'BulkTotal',
                    required: true,
                    label: 'Total (unknown)',
                    align: 'right',
                    sortable: true,
                    field: 'BulkTotal',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: false,
                    main_column_name: 'BulkQty',
                    index: 0,
                    colspan: 0,
                    colspan_name: '',
                    start_index: '',
                    end_index: '',
                    rowspan: '',
                },
                {
                    name: 'rebate_value',
                    required: true,
                    label: 'Rebate CN',
                    align: 'right',
                    sortable: true,
                    field: 'rebate_value',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 13,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 17,
                    end_index: 17,
                    rowspan: '2',
                },
                {
                    name: 'InvActCost',
                    required: true,
                    label: 'Actual Cost',
                    align: 'right',
                    sortable: true,
                    field: 'InvActCost',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 14,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 18,
                    end_index: 18,
                    rowspan: '2',
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
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 15,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 19,
                    end_index: 19,
                    rowspan: '2',
                },
                {
                    name: 'SellingPrice_gp',
                    required: true,
                    label: 'GP% (unknown)',
                    align: 'right',
                    sortable: true,
                    field: 'SellingPrice_gp',
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
                    start_index: 20,
                    end_index: 20,
                    rowspan: '2',
                },
                {
                    name: 'price_future',
                    required: true,
                    label: 'Future Price',
                    align: 'right',
                    sortable: true,
                    field: 'price_future',
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
                    start_index: 21,
                    end_index: 21,
                    rowspan: '2',
                },
                {
                    name: 'price_future_gp',
                    required: true,
                    label: 'Future GP% (unknown)',
                    align: 'right',
                    sortable: true,
                    field: 'price_future_gp',
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
                    start_index: 22,
                    end_index: 22,
                    rowspan: '2',
                },
                {
                    name: 'gross_unit_cost_discount1',
                    required: true,
                    label: 'Discount 1 (unknown)',
                    align: 'right',
                    sortable: true,
                    field: 'gross_unit_cost_discount1',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 19,
                    colspan: 3,
                    colspan_name: 'Gross Unit Cost with Discount',
                    start_index: 23,
                    end_index: 25,
                    rowspan: '',
                },
                {
                    name: 'gross_unit_cost_discount2',
                    required: true,
                    label: 'Discount 2 (unknown)',
                    align: 'right',
                    sortable: true,
                    field: 'gross_unit_cost_discount2',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: false,
                    main_column_name: 'gross_unit_cost_discount1',
                    index: 0,
                    colspan: 0,
                    colspan_name: '',
                    start_index: '',
                    end_index: '',
                    rowspan: '',
                },
                {
                    name: 'gross_unit_cost',
                    required: true,
                    label: 'G.Cost (unknown)',
                    align: 'right',
                    sortable: true,
                    field: 'gross_unit_cost',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: false,
                    main_column_name: 'gross_unit_cost_discount1',
                    index: 0,
                    colspan: 0,
                    colspan_name: '',
                    start_index: '',
                    end_index: '',
                    rowspan: '',
                },
                {
                    name: 'gst_tax_code',
                    required: true,
                    label: 'Code',
                    align: 'left',
                    sortable: true,
                    field: 'gst_tax_code',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 20,
                    colspan: 3,
                    colspan_name: 'GST',
                    start_index: 26,
                    end_index: 28,
                    rowspan: '',
                },
                {
                    name: 'gst_tax_rate',
                    required: true,
                    label: 'Rate',
                    align: 'right',
                    sortable: true,
                    field: 'gst_tax_rate',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: false,
                    main_column_name: 'gst_tax_code',
                    index: 0,
                    colspan: 0,
                    colspan_name: '',
                    start_index: '',
                    end_index: '',
                    rowspan: '',
                },
                {
                    name: 'gst_tax_amount',
                    required: true,
                    label: 'Amount',
                    align: 'right',
                    sortable: true,
                    field: 'gst_tax_amount',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: false,
                    main_column_name: 'gst_tax_code',
                    index: 0,
                    colspan: 0,
                    colspan_name: '',
                    start_index: '',
                    end_index: '',
                    rowspan: '',
                },
                {
                    name: 'TaxCodeMap',
                    required: true,
                    label: 'Code',
                    align: 'left',
                    sortable: true,
                    field: 'TaxCodeMap',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 21,
                    colspan: 3,
                    colspan_name: 'SST',
                    start_index: 29,
                    end_index: 31,
                    rowspan: '',
                },
                {
                    name: 'TaxValue',
                    required: true,
                    label: 'Rate',
                    align: 'right',
                    sortable: true,
                    field: 'TaxValue',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: false,
                    main_column_name: 'TaxCodeMap',
                    index: 0,
                    colspan: 0,
                    colspan_name: '',
                    start_index: '',
                    end_index: '',
                    rowspan: '',
                },
                {
                    name: 'TaxAmount',
                    required: true,
                    label: 'Amount',
                    align: 'right',
                    sortable: true,
                    field: 'TaxAmount',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: false,
                    main_column_name: 'TaxCodeMap',
                    index: 0,
                    colspan: 0,
                    colspan_name: '',
                    start_index: '',
                    end_index: '',
                    rowspan: '',
                },
                {
                    name: 'TotalPrice_include_tax',
                    required: true,
                    label: 'Total Inc Tax',
                    align: 'right',
                    sortable: true,
                    field: 'TotalPrice_include_tax',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 22,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 32,
                    end_index: 32,
                    rowspan: '2',
                },
                {
                    name: 'ItemRemark',
                    required: true,
                    label: 'Item Remark',
                    align: 'left',
                    sortable: true,
                    field: 'ItemRemark',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 23,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 33,
                    end_index: 33,
                    rowspan: '2',
                }
            ];

            if(this.page_function == 'create')
            {
                table_column = table_column.filter((entry)=>{
                    return entry.name != 'action'
                })

                this.table_data = {
                  "data": {
                      "count": 0,
                      "next": null,
                      "previous": null,
                      "results": []
                  }
                };
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
        var tabNames = ["Hierarchy","Status by Site","Configuration","Product List" ,"Replenishment","IBT/ICT"];

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
              this.tab = 'Hierarchy'
          }
          if(this.step == '4')
          {
              this.tab = 'Inventory'
          }
          if(this.step == '5')
          {
              this.tab = 'Amendment'
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
        if(newVal == 'Hierarchy')
        {
            this.step = 3
        }
        if(newVal == 'Inventory')
        {
            this.step = 4
        }
        if(newVal == 'Amendment')
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
                "RefNo": this.RefNo,
            },
        };

      }

      this.ori_payload = JSON.parse(JSON.stringify(payload))

        var object_pass = {
            "dispatch": 'purchase/trigger_get_po_read_po', //refer to path/function_name in store actions.js
            "getter": 'purchase/get_po_read_po', //refer to path/function_name in store getters.js
            "app": this, //compulsory passed variable
            "payload": payload //payload that needed to use in store actions.js
        };

        var dispatch_response = await this.$dispatch(object_pass);
        // console.log('dispatch_response', dispatch_response);

        if(dispatch_response.status){

        // console.log(this.$route);
        var RefNo = this.$route.query.RefNo;
        // var query_params = thjis.l


          if(dispatch_response.response.detail.length == 1)
          {
            var filter = dispatch_response.response.detail[0];
            filter.SubTotal1 = this.formatAmount(filter.SubTotal1, '$');
            filter.Total = this.formatAmount(filter.Total, '$');
            filter.total_include_tax = this.formatAmount(filter.total_include_tax, '$');
            this.json = filter;
            this.RefNo = filter.RefNo;
            this.$route.query.RefNo = filter.RefNo;
            if(this.page_count > 1)
            {
              this.table_function(this.ori_params)
            }
            this.page_count += 1;
            this.showAddLoading = false;
          }
          else
          {
            this.showNotify('negative', 'Failed to get po result')
            this.showAddLoading = false;
          }
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
      
      const today = new Date();

      const year = today.getFullYear(); // Get the full year (YYYY)
      const month = String(today.getMonth() + 1).padStart(2, '0'); // Get the month (0-11), so add 1, and pad with '0'
      const day = String(today.getDate()).padStart(2, '0'); // Get the day of the month and pad with '0'

      var formattedDate = `${year}-${month}-${day}`;

      var PODate = this.json.PODate
      var DeliverDate = this.json.DeliverDate
      var expiry_date = this.json.expiry_date
      var DueDate = this.json.DueDate

      if(PODate < formattedDate)
      {
        this.showNotify("negative","Date cannot smaller than current date.");
        this.showAddLoading = false;
        return;
      }
      
      if(DeliverDate < PODate)
      {
        this.showNotify("negative","Delivery Date cannot smaller than PO date.");
        this.showAddLoading = false;
        return;
      }

      if(expiry_date < PODate)
      {
        this.showNotify("negative","Expiry Date cannot smaller than PO date.");
        this.showAddLoading = false;
        return;
      }

      if(DueDate < PODate)
      {
        this.showNotify("negative","Pmt Date cannot smaller than PO date.");
        this.showAddLoading = false;
        return;
      }


      if (this.$route.query.RefNo) {
      // Existing vendor: Call saveVendor (update)
      await this.saveVendor();
      } else {
          // New vendor: Call createVendor (create)
          await this.createVendor();
      }
    },

    async createVendor() {
      var IssuedBy = this.getuser
      var RefNo = this.json.RefNo
      var PODate = this.json.PODate
      var SubDeptCode = this.json.SubDeptCode
      var Location = this.json.Location
      var SCode = this.json.SCode
      var SName = this.json.SName
      var Remark = this.json.Remark
      var STerm = this.json.STerm
      var CalDueDateby = this.json.CalDueDateby
      var DeliverDate = this.json.DeliverDate
      var loc_group = this.json.loc_group
      var Location = this.json.Location
      var tax_code_purchase = this.json.tax_code_purchase
      var pur_expiry_days = this.json.pur_expiry_days
      var expiry_date = this.json.expiry_date
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
      var SubTotal1 = this.unformatAmount(this.json.SubTotal1)
      var total_include_tax = this.unformatAmount(this.json.total_include_tax)
      var order_type = this.json.order_type;
      var DueDate = this.json.DueDate;

      var payload = {
          pass_json: {
            IssuedBy: IssuedBy,
            RefNo: RefNo,
            PODate: PODate,
            SubDeptCode: SubDeptCode, //no_pass
            SCode: SCode,
            SName: SName,
            Remark: Remark,
            STerm: STerm,
            CalDueDateby: CalDueDateby,
            DeliverDate: DeliverDate,
            loc_group: loc_group,
            Location: Location,
            tax_code_purchase: tax_code_purchase, //no_pass
            pur_expiry_days: pur_expiry_days,
            expiry_date: expiry_date,
            stockday_min: stockday_min, //no_pass
            stockday_max: stockday_max, //no_pass
            in_kind: in_kind,
            AutoClosePO: AutoClosePO,
            BillStatus: BillStatus,
            Amendment: Amendment,
            cancel: cancel,
            Completed: Completed,
            hq_issue: hq_issue,
            b2b_registration: b2b_registration,
            b2b_status: b2b_status,
            SubTotal1: SubTotal1,
            total_include_tax: total_include_tax, //no_pass
            Remark: 'test', //hardcode
            tax_code_purchase: 'T0001', //hardcode
            rebate_amt: 0, //hardcode
            order_type: order_type,
            DueDate: DueDate,
          }
      }

      console.log('create_vendor_payload', payload);

      var object_pass = {
          "dispatch": 'purchase/trigger_create_pomain',
          "getter": 'purchase/get_pomain_status',
          "app": this,
          "payload": payload,
      };

      var dispatch_response = await this.$dispatch(object_pass);
      console.log('create_dispatch_response', dispatch_response);

      if (dispatch_response.status) {
          // success condition
          this.showAddLoading = false;
          this.showNotify("positive", "Created Successfully.");
          this.$router.push({
            name: 'PurchaseOrderDetails',
            query: { RefNo: dispatch_response.response.RefNo, offset: 0, total_row: this.total_row}
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
      var IssuedBy = this.getuser
      var RefNo = this.json.RefNo
      var PODate = this.json.PODate
      var SubDeptCode = this.json.SubDeptCode
      var Location = this.json.Location
      var SCode = this.json.SCode
      var SName = this.json.SName
      var Remark = this.json.Remark
      var STerm = this.json.STerm
      var CalDueDateby = this.json.CalDueDateby
      var DeliverDate = this.json.DeliverDate
      var loc_group = this.json.loc_group
      var Location = this.json.Location
      var tax_code_purchase = this.json.tax_code_purchase
      var pur_expiry_days = this.json.pur_expiry_days
      var expiry_date = this.json.expiry_date
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
      var SubTotal1 = this.unformatAmount(this.json.SubTotal1)
      var total_include_tax = this.unformatAmount(this.json.total_include_tax)
      var order_type = this.json.order_type;
      var DueDate = this.json.DueDate;

      var payload = {
        pass_json: {
          IssuedBy: IssuedBy, //no_need_pass
          // laststamp: '2024-09-23 17:22:09', //no_need_pass
          // IssueStamp: '2024-09-23 17:22:09', //no_need_pass
          RefNo: RefNo,
          PODate: PODate,
          Location: Location,
          SubDeptCode: SubDeptCode,
          SCode: SCode,
          SName: SName,
          Remark: Remark,
          STerm: STerm,
          CalDueDateby: CalDueDateby,
          DeliverDate: DeliverDate,
          loc_group: loc_group,
          Location: Location,
          tax_code_purchase: tax_code_purchase,
          pur_expiry_days: pur_expiry_days,
          expiry_date: expiry_date,
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
          SubTotal1: SubTotal1,
          total_include_tax: total_include_tax,
          Remark: 'test', //hardcode
          order_type: order_type,
          DueDate: DueDate,
        }
      }

    console.log('this.pass_json', payload);
    var object_pass = {
      "dispatch": 'purchase/trigger_update_pomain',
      "getter": 'purchase/get_pomain_status',
      "app": this,
      "payload": payload,
    };

    var dispatch_response = await this.$dispatch(object_pass);
    console.log('dispatch_response', dispatch_response);
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
          if(!value)
          {
            value = '0';
          }

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
      else if(this.item_dialog)
      {
        if (event.key === "Enter") {
          if(Object.keys(this.selected_item).length != 0)
          {
            this.handleModifyItemcode();

            setTimeout(() => {
              if (this.item_dialog == true) {
                this.item_dialog = false;
                return;
              }
            }, 100);
          }
          else
          {
            this.handleSearchItem();
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
* >>> .q-table__sort-icon
{
  display: none;
}

.q-btn.disabled {
  opacity: 0.2 !important;
}

.showAddLoading
{
  z-index: 3;
}

* >>> .sticky_column .q-table thead tr:first-child th:nth-child(6),
* >>> .sticky_column .q-table td:nth-child(6) {
  position: sticky;
  left: 0px;
  z-index: 2;
}

* >>> .sticky_column .q-table thead tr:first-child th:nth-child(7),
* >>> .sticky_column .q-table td:nth-child(7) {
  position: sticky;
  /* left: 85.84px; */
  left: 80px;
  z-index: 2;
}

* >>> .sticky_column .q-table thead tr:first-child th:nth-child(8),
* >>> .sticky_column .q-table td:nth-child(8) {
  position: sticky;
  /* left: 174.12px; */
  left: 160px;
  z-index: 2;
}

* >>> .sticky_column .q-table thead tr:first-child th:nth-child(6)
{background-color: #DEE1E6;}
* >>> .sticky_column .q-table td:nth-child(6)
{background-color: white;}
* >>> .sticky_column .q-table thead tr:first-child th:nth-child(7)
{background-color: #DEE1E6;}
* >>> .sticky_column .q-table td:nth-child(7)
{background-color: white;}
* >>> .sticky_column .q-table thead tr:first-child th:nth-child(8)
{background-color: #DEE1E6;}
* >>> .sticky_column .q-table td:nth-child(8)
{background-color: white;}

* >>> .q-field--disabled.custom_datepicker > .q-field__inner
{
  cursor: text;
}

.toggle_span
{
    padding-left: 5px;
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

/* * >>> .q-field--disabled > .q-field__inner > .q-field__control
{
background-color: #cccccc !important;
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
