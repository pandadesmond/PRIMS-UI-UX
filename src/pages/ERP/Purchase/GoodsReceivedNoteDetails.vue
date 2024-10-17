<template>
  <div style="font-size: 10px; padding-left: 15px; padding-right: 15px;">
  <!-- {{last_enter_field}} -->

      <div class="text-subtitle1 header_text">
          Goods Received Note
      </div>

      <q-form ref="save_form" style="background-color:white;">
          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">

            <div class="row">

                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">

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

                        <!-- <q-step
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
                        </q-step> -->

                    </q-stepper>

                </div>

                <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 top_right_button">
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
                        <Button :disable="page_function == 'view' ? true : false" v-on:receiveClick="handleCreateGRN"
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
                                        <Label :pass_value="'Refno'" />
                                    </div>
                                    <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-xs-12">
                                        <Input :readonly="page_function == 'view'" :autofocusclick="true"
                                        :disable="page_function != 'view'"
                                        v-model:pass_value="json.RefNo"
                                        v-on:receiveChange="handleChange"
                                        :dbComponentBehavior="dbComponentBehavior.text"/>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                <div class="row" style="align-items: center;">
                                    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                        <Label :pass_value="'Location'"/>
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
                                        <Label :pass_value="'Sub-Dept'"/>
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

                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                <div class="row" style="align-items: center;">
                                    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                        <Label :pass_value="'D/O#'"/>
                                    </div>
                                    <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-xs-12">
                                        <Input :readonly="page_function == 'view'" :autofocusclick="true"
                                        v-model:pass_value="json.DONo"
                                        v-on:receiveChange="handleChange"
                                        :dbComponentBehavior="dbComponentBehavior.text"/>
                                    </div>
                                </div>
                            </div>

                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                <div class="row" style="align-items: center;">
                                    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                        <Label :pass_value="'Invoice #'" />
                                    </div>
                                    <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-xs-12">
                                        <Input :readonly="page_function == 'view'" :autofocusclick="true"
                                        v-model:pass_value="json.InvNo"
                                        v-on:receiveChange="handleChange"
                                        :dbComponentBehavior="dbComponentBehavior.text"/>
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
                                            v-model:pass_value="json.Code"
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
                                                <Label :pass_value="'Receiving Date'" />
                                            </div>
                                            <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                                <Datepicker class="custom_datepicker new_input" :pass_day_string="'Wed'" v-on:receiveChange="handleChangePODate" :daterange="json.GRDate"
                                                :componentBehavior="dbComponentBehavior.date_required" :autoclose="true"/>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                        <div class="row" style="align-items: center;">
                                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                                <Label :pass_value="'Invoice Date'" />
                                            </div>
                                            <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                                <Datepicker class="custom_datepicker new_input" :pass_day_string="'Sat'" v-on:receiveChange="handleChangeDeliverDate" :daterange="json.DocDate"
                                                :componentBehavior="dbComponentBehavior.date_required" :autoclose="true"/>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                        <div class="row" style="align-items: center;">
                                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                                <Label :pass_value="'Due Date'" />
                                            </div>
                                            <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                                <Datepicker class="custom_datepicker new_input" :pass_day_string="'Sat'" v-on:receiveChange="handleChangeDeliverDate" :daterange="json.DueDate"
                                                :componentBehavior="dbComponentBehavior.date_no_required" :autoclose="true"/>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                        <div class="row" style="align-items: center;">
                                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                                <Label :pass_value="'Term'" />
                                            </div>
                                            <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                                <LabelSelectVerticalGeneral
                                                :readonly="page_function == 'view'"
                                                    v-model:pass_value="json.Term"
                                                    v-on:receiveChange="handleChange"
                                                    :dbComponentBehavior="dbComponentBehavior.text_required"
                                                    :options="term_options"
                                                    :pass_overwrite_display="'value'"
                                                />
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
                                                v-model:pass_value="json.Subtotal1"
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
                                                        <Label :pass_value="'Consign'" />
                                                        <div>
                                                            <q-toggle
                                                            :disable="true"
                                                            dense
                                                            :false-value="0"
                                                            :true-value="1"
                                                            color="green"
                                                            v-model="json.consign"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

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
                                                    
                                                </div>
                                            </div>

                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                                <div class="row" style="align-items: center; height: 32px;">
                                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                        <Label :pass_value="'IBT/ICT'" />
                                                        <div>
                                                            <q-toggle
                                                            :disable="true"
                                                            dense
                                                            :false-value="0"
                                                            :true-value="1"
                                                            color="green"
                                                            v-model="json.ibt"
                                                            />
                                                        </div>
                                                    </div>
                                                    
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
                                                        <Label :pass_value="'D/O'"/>
                                                    </div>
                                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                        <q-toggle
                                                        :disable="true"
                                                        dense
                                                        :false-value="0"
                                                        :true-value="1"
                                                        color="green"
                                                        v-model="json.DOState"
                                                        />
                                                        <span class="toggle_span" v-if="json.Amendment > 0">2024-04-04 22:22:22</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                                <div class="row" style="align-items: center; height: 32px;">
                                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                        <Label :pass_value="'Invoice'"/>
                                                    </div>
                                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                        <q-toggle
                                                        :disable="true"
                                                        dense
                                                        :false-value="0"
                                                        :true-value="1"
                                                        color="green"
                                                        v-model="json.InvState"
                                                        />
                                                        <!-- <span class="toggle_span" v-if="json.cancel > 0">{{json.cancel_at}}</span> -->
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
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
                                            </div> -->

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
                                                      v-model:pass_value="json.Receivedby"
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
                                                      v-model:pass_value="json.LastStamp"
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
                                <!-- <q-tab content-class="custom_tab_font" name="Hierarchy" label="Hierarchy"/>
                                <q-tab content-class="custom_tab_font" name="Inventory" :disable="false" label="Inventory"/>
                                <q-tab content-class="custom_tab_font" name="Amendment" :disable="false" label="Amendment"/> -->
                            </q-tabs>
                        </q-toolbar>
                      </div>

                      <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                        <q-toolbar class="bg-white q-pl-sm custom_toolbar">
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" align="right">

                            <Button v-on:receiveClick="handleAddCategoryC"
                            v-if="page_function == 'edit'"
                            :pass_label="'GR Correction'"
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

<q-dialog v-model="item_dialog" persistent position="top">
  <q-card style="width: 95vw; max-width: 1100px; max-height: 90vh; margin-top: 5%;">

    <q-card-section class="row items-center dialog_header_custom">
        <div class="text-h6">GR Correction</div>
        <q-space />
        <q-btn icon="close" flat round dense :disable="item_loading" v-close-popup/>
    </q-card-section>

    <q-card-section>


      <div class="row dialog_content">

        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pl-xs">
          <div style="width: 100%;">
            <Table
            :row_per_page="[5,10,20,50,1000]"
            :title="item_table_title"
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
            v-on:receiveSelectAll="handleSelectAllItemTable"
            />
          </div>
        </div>
      </div>

    </q-card-section>

    <q-card-actions class="dialog_action" align="right">
        <Button v-close-popup
          v-if="page_function != 'view'"
          :pass_label="'Cancel'"
          :pass_no_caps="true"
          :pass_square="true"
          :pass_dense="true"
        />

        <Button v-on:receiveClick="handleSaveDialogItem"
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
    location_options: [],
    loc_group_options: [],
    term_options: [],
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
    if(this.$route.name == 'GoodsReceivedNoteDetailsView')
    {
      this.page_function = 'view'
      
      var json = {
        name: this.$route.name,
        query: this.$route.query,
      };

      sessionStorage.setItem("original_route", JSON.stringify(json));

    }
    else if(this.$route.name == 'GoodsReceivedNoteDetails')
    {
      this.page_function = 'edit'
    }

    this.RefNo = RefNo;

  }
  else
  {
    if(this.$route.name == 'GoodsReceivedNoteDetails')
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
    this.term_options = await this.getPaymentTermOptions();

    var active_tab = JSON.parse(JSON.stringify(this.tab));

    await this.discoverTabs(active_tab, 'hide');


    var offset = Number(this.$route.query.offset);
    var total_row = Number(this.$route.query.total_row);

    if(this.RefNo)
    {
      if(this.$route.name == 'GoodsReceivedNoteDetailsView')
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

    this.showAddLoading = false;

},
methods:{
    handleAddCategoryC()
    {
      this.item_dialog = true;
    },
    handleCancel()
    {
      var route = JSON.parse(sessionStorage.getItem("original_route"));
      
      this.$router.push({
        name: route.name,
        query: route.query
      });
      
    },
    // handleCancel()
    // {
    //   var RefNo = this.$route.query.prev_RefNo;
    //   var offset = this.$route.query.prev_offset;
    //   var total_row = this.$route.query.prev_total_row;

    //   this.$router.push({
    //     name: 'GoodsReceivedNoteDetails',
    //     query: { RefNo: RefNo, offset: offset, total_row: total_row }
    //   })

    //   this.page_function == 'view';
    // },
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
    async getPaymentTermOptions()
  {
      var payload = {
      "pass_json": {
        "outlet_guid": this.session_outlet_guid,
        "language": this.language,
        "limit": 100,
        "sort_by": "Code",
        "sort_type": "asc",
      },
    };

      var object_pass = {
          "dispatch": 'setup/trigger_post_get_pay_term',
          "getter": 'setup/get_pay_term',
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
                      label: each_row.Code + ' - ' + each_row.Description,
                      value: each_row.Code
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
          name: "GoodsReceivedNoteDetails",
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
          "dispatch": 'purchase/trigger_post_grn_read_grchild', //refer to path/function_name in store actions.js
          "getter": 'purchase/get_post_grn_grchild_status', //refer to path/function_name in store getters.js
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

        // if(this.rearrange_column.length > 0)
        // {
        //     var table_column = this.rearrange_column;
        // }
        // else
        // {
            var table_column = [
              {
                name: "RefNo",
                required: true,
                label: "RefNo",
                align: 'center',
                sortable: false,
                field: "RefNo",
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
                name: "Line",
                required: true,
                label: "Line",
                align: 'center',
                sortable: false,
                field: "Line",
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
                name: "EntryType",
                required: true,
                label: "EntryType",
                align: 'center',
                sortable: false,
                field: "EntryType",
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
                name: "PriceType",
                required: true,
                label: "PriceType",
                align: 'center',
                sortable: false,
                field: "PriceType",
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
                name: "Itemcode",
                required: true,
                label: "Itemcode",
                align: 'center',
                sortable: false,
                field: "Itemcode",
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
                name: "Description",
                required: true,
                label: "Description",
                align: 'center',
                sortable: false,
                field: "Description",
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
                name: "Qty",
                required: true,
                label: "Qty",
                align: 'center',
                sortable: false,
                field: "Qty",
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
                name: "UnitPrice",
                required: true,
                label: "UnitPrice",
                align: 'center',
                sortable: false,
                field: "UnitPrice",
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
                name: "POQty",
                required: true,
                label: "POQty",
                align: 'center',
                sortable: false,
                field: "POQty",
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
        name: "GoodsReceivedNoteDetails",
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
      this.json.Subtotal1 = this.formatAmount(newVal, '$');
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
      this.json.Code = newVal;

      var filter = this.supplier_options.filter((entry)=>{
        return entry.value == newVal
      })

      this.json.Name = filter[0].name
    },
    handleChangePODate(newVal)
    {
      this.json.GRDate = newVal;
    },
    handleChangeDeliverDate(newVal)
    {
      this.json.DocDate = newVal;
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
                "ordering": "-LastStamp",
                "sort_by": "LastStamp",
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
            name: 'GoodsReceivedNoteDetails',
            query: { RefNo: new_refno, offset: offset, total_row: this.total_row }
          })
        }
        else if(this.page_function == 'view')
        {
          this.$router.push({
            name: 'GoodsReceivedNoteDetailsView',
            query: { RefNo: new_refno, offset: offset, total_row: this.total_row }
          })
        }

    },
    async getRefNo(payload)
    {
      payload.user = this.getuser;
      var object_pass = {
          "dispatch": 'purchase/trigger_post_get_read_grmain_new', //refer to path/function_name in store actions.js
          "getter": 'purchase/get_read_grmain', //refer to path/function_name in store getters.js
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
          this.showNotify('negative', 'Failed to get GRN result')
          this.$router.push('GoodsReceivedNote')
          return '';
        }
      }
      else
      {
        this.showNotify('negative', 'Failed to get grn result')
        this.$router.push('GoodsReceivedNote')
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
            "dispatch": 'purchase/trigger_post_grn_read_grchild', //refer to path/function_name in store actions.js
            "getter": 'purchase/get_post_grn_grchild_status', //refer to path/function_name in store getters.js
            "app": this, //compulsory passed variable
            "payload": payload //payload that needed to use in store actions.js
        };

        var dispatch_response = await this.$dispatch(object_pass);

        if(dispatch_response.status)
        {
            //success condition
            var results = dispatch_response.response.detail;

            // if(results.length > 0)
            // {
            //     for(var i in results)
            //     {
            //         // results[i].group_status = results[i].group_status == 1;
            //         // results[i].TempItem = results[i].TempItem == 1;
            //         // results[i].Amendment = results[i].Amendment == 1;
            //         // results[i].cost_manual = results[i].cost_manual == 1;
            //         results[i].limit_control_amt = this.formatAmount(results[i].limit_control_amt,'$');
            //     }
            // }

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
                    data_type: "checkbox",
                    data_decimal: "",
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
                    index: 3,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 3,
                    end_index: 3,
                    rowspan: '2',
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
                    name: 'POLine',
                    required: true,
                    label: 'PO Line',
                    align: 'left',
                    sortable: true,
                    field: 'POLine',
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
                    index: 6,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 6,
                    end_index: 6,
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
                    index: 7,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 7,
                    end_index: 7,
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
                    index: 8,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 8,
                    end_index: 8,
                    rowspan: '2',
                },
                {
                    name: 'rebate',
                    required: true,
                    label: 'Rebate',
                    align: 'rebate',
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
                    index: 9,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 9,
                    end_index: 9,
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
                    index: 10,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 10,
                    end_index: 10,
                    rowspan: '2',
                },
                {
                    name: 'UMBulk',
                    required: true,
                    label: 'UOM',
                    align: 'left',
                    sortable: true,
                    field: 'UMBulk',
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
                    index: 12,
                    colspan: 3,
                    colspan_name: 'Unit',
                    start_index: 12,
                    end_index: 14,
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
                    index: 13,
                    colspan: 3,
                    colspan_name: 'Case',
                    start_index: 15,
                    end_index: 17,
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
                    index: 14,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 18,
                    end_index: 18,
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
                    index: 15,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 19,
                    end_index: 19,
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
                    index: 16,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 20,
                    end_index: 20,
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
                    index: 17,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 21,
                    end_index: 21,
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
                    index: 18,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 22,
                    end_index: 22,
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
                    index: 19,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 23,
                    end_index: 23,
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
                    index: 20,
                    colspan: 3,
                    colspan_name: 'Gross Unit Cost with Discount',
                    start_index: 24,
                    end_index: 26,
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
                    index: 21,
                    colspan: 3,
                    colspan_name: 'GST',
                    start_index: 27,
                    end_index: 29,
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
                    index: 22,
                    colspan: 3,
                    colspan_name: 'SST',
                    start_index: 30,
                    end_index: 32,
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
                    name: 'total_include_tax',
                    required: true,
                    label: 'Total Inc Tax',
                    align: 'right',
                    sortable: true,
                    field: 'total_include_tax',
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
                },
                {
                    name: 'TotalPrice',
                    required: true,
                    label: 'TotalPrice',
                    align: 'left',
                    sortable: true,
                    field: 'TotalPrice',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    filter_type: 'input',
                    filter_options: [],
                    filter_value: '',
                    main_column: true,
                    main_column_name: '',
                    index: 24,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 34,
                    end_index: 34,
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
                    index: 25,
                    colspan: 0,
                    colspan_name: '',
                    start_index: 35,
                    end_index: 35,
                    rowspan: '2',
                },
                // {
                //     name: 'EntryType',
                //     required: true,
                //     label: 'EntryType',
                //     align: 'left',
                //     sortable: true,
                //     field: 'EntryType',
                //     format_child: '',
                //     tooltip: '',
                //     headerStyle: 'text-align: center;',
                //     filter_type: 'input',
                //     filter_options: [],
                //     filter_value: '',
                //     main_column: true,
                //     main_column_name: '',
                //     index: 23,
                //     colspan: 0,
                //     colspan_name: '',
                //     start_index: 33,
                //     end_index: 33,
                //     rowspan: '2',
                // },
                // {
                //     name: 'UnitLandedCost',
                //     required: true,
                //     label: 'UnitLandedCost',
                //     align: 'left',
                //     sortable: true,
                //     field: 'UnitLandedCost',
                //     format_child: '',
                //     tooltip: '',
                //     headerStyle: 'text-align: center;',
                //     filter_type: 'input',
                //     filter_options: [],
                //     filter_value: '',
                //     main_column: true,
                //     main_column_name: '',
                //     index: 23,
                //     colspan: 0,
                //     colspan_name: '',
                //     start_index: 33,
                //     end_index: 33,
                //     rowspan: '2',
                // },
                // {
                //     name: 'UnitVolume',
                //     required: true,
                //     label: 'UnitVolume',
                //     align: 'left',
                //     sortable: true,
                //     field: 'UnitVolume',
                //     format_child: '',
                //     tooltip: '',
                //     headerStyle: 'text-align: center;',
                //     filter_type: 'input',
                //     filter_options: [],
                //     filter_value: '',
                //     main_column: true,
                //     main_column_name: '',
                //     index: 23,
                //     colspan: 0,
                //     colspan_name: '',
                //     start_index: 33,
                //     end_index: 33,
                //     rowspan: '2',
                // },
                // {
                //     name: 'UnitVolumeTotal',
                //     required: true,
                //     label: 'UnitVolumeTotal',
                //     align: 'left',
                //     sortable: true,
                //     field: 'UnitVolumeTotal',
                //     format_child: '',
                //     tooltip: '',
                //     headerStyle: 'text-align: center;',
                //     filter_type: 'input',
                //     filter_options: [],
                //     filter_value: '',
                //     main_column: true,
                //     main_column_name: '',
                //     index: 23,
                //     colspan: 0,
                //     colspan_name: '',
                //     start_index: 33,
                //     end_index: 33,
                //     rowspan: '2',
                // },
                // {
                //     name: 'Manual',
                //     required: true,
                //     label: 'Manual',
                //     align: 'left',
                //     sortable: true,
                //     field: 'Manual',
                //     format_child: '',
                //     tooltip: '',
                //     headerStyle: 'text-align: center;',
                //     filter_type: 'input',
                //     filter_options: [],
                //     filter_value: '',
                //     main_column: true,
                //     main_column_name: '',
                //     index: 20,
                //     colspan: 3,
                //     colspan_name: 'GST',
                //     start_index: 26,
                //     end_index: 28,
                //     rowspan: '',
                // },
                // {
                //     name: 'Code',
                //     required: true,
                //     label: 'Code',
                //     align: 'right',
                //     sortable: true,
                //     field: 'Code',
                //     format_child: '',
                //     tooltip: '',
                //     headerStyle: 'text-align: center;',
                //     filter_type: 'input',
                //     filter_options: [],
                //     filter_value: '',
                //     main_column: false,
                //     main_column_name: 'gst_tax_code',
                //     index: 0,
                //     colspan: 0,
                //     colspan_name: '',
                //     start_index: '',
                //     end_index: '',
                //     rowspan: '',
                // },
                // {
                //     name: 'expirydate',
                //     required: true,
                //     label: 'Expirydate',
                //     align: 'left',
                //     sortable: true,
                //     field: 'expirydate',
                //     format_child: '',
                //     tooltip: '',
                //     headerStyle: 'text-align: center;',
                //     filter_type: 'input',
                //     filter_options: [],
                //     filter_value: '',
                //     main_column: true,
                //     main_column_name: '',
                //     index: 23,
                //     colspan: 0,
                //     colspan_name: '',
                //     start_index: 33,
                //     end_index: 33,
                //     rowspan: '2',
                // },
                // {
                //     name: 'Color',
                //     required: true,
                //     label: 'Colour',
                //     align: 'left',
                //     sortable: true,
                //     field: 'Color',
                //     format_child: '',
                //     tooltip: '',
                //     headerStyle: 'text-align: center;',
                //     filter_type: 'input',
                //     filter_options: [],
                //     filter_value: '',
                //     main_column: true,
                //     main_column_name: '',
                //     index: 23,
                //     colspan: 0,
                //     colspan_name: '',
                //     start_index: 33,
                //     end_index: 33,
                //     rowspan: '2',
                // },
                // {
                //     name: 'Size',
                //     required: true,
                //     label: 'Size',
                //     align: 'left',
                //     sortable: true,
                //     field: 'Size',
                //     format_child: '',
                //     tooltip: '',
                //     headerStyle: 'text-align: center;',
                //     filter_type: 'input',
                //     filter_options: [],
                //     filter_value: '',
                //     main_column: true,
                //     main_column_name: '',
                //     index: 23,
                //     colspan: 0,
                //     colspan_name: '',
                //     start_index: 33,
                //     end_index: 33,
                //     rowspan: '2',
                // },
                // {
                //     name: 'ArticleNo',
                //     required: true,
                //     label: 'ArticleNo',
                //     align: 'left',
                //     sortable: true,
                //     field: 'ArticleNo',
                //     format_child: '',
                //     tooltip: '',
                //     headerStyle: 'text-align: center;',
                //     filter_type: 'input',
                //     filter_options: [],
                //     filter_value: '',
                //     main_column: true,
                //     main_column_name: '',
                //     index: 23,
                //     colspan: 0,
                //     colspan_name: '',
                //     start_index: 33,
                //     end_index: 33,
                //     rowspan: '2',
                // },
                // {
                //     name: 'Brand',
                //     required: true,
                //     label: 'Brand',
                //     align: 'left',
                //     sortable: true,
                //     field: 'Brand',
                //     format_child: '',
                //     tooltip: '',
                //     headerStyle: 'text-align: center;',
                //     filter_type: 'input',
                //     filter_options: [],
                //     filter_value: '',
                //     main_column: true,
                //     main_column_name: '',
                //     index: 23,
                //     colspan: 0,
                //     colspan_name: '',
                //     start_index: 33,
                //     end_index: 33,
                //     rowspan: '2',
                // },
                // {
                //     name: 'CostAftDisc',
                //     required: true,
                //     label: 'CostAftDisc',
                //     align: 'left',
                //     sortable: true,
                //     field: 'CostAftDisc',
                //     format_child: '',
                //     tooltip: '',
                //     headerStyle: 'text-align: center;',
                //     filter_type: 'input',
                //     filter_options: [],
                //     filter_value: '',
                //     main_column: true,
                //     main_column_name: '',
                //     index: 23,
                //     colspan: 0,
                //     colspan_name: '',
                //     start_index: 33,
                //     end_index: 33,
                //     rowspan: '2',
                // },
                // {
                //     name: 'CostFactor',
                //     required: true,
                //     label: 'CostFactor',
                //     align: 'left',
                //     sortable: true,
                //     field: 'CostFactor',
                //     format_child: '',
                //     tooltip: '',
                //     headerStyle: 'text-align: center;',
                //     filter_type: 'input',
                //     filter_options: [],
                //     filter_value: '',
                //     main_column: true,
                //     main_column_name: '',
                //     index: 23,
                //     colspan: 0,
                //     colspan_name: '',
                //     start_index: 33,
                //     end_index: 33,
                //     rowspan: '2',
                // },
                // {
                //     name: 'DiscValue',
                //     required: true,
                //     label: 'DiscValue',
                //     align: 'left',
                //     sortable: true,
                //     field: 'DiscValue',
                //     format_child: '',
                //     tooltip: '',
                //     headerStyle: 'text-align: center;',
                //     filter_type: 'input',
                //     filter_options: [],
                //     filter_value: '',
                //     main_column: true,
                //     main_column_name: '',
                //     index: 23,
                //     colspan: 0,
                //     colspan_name: '',
                //     start_index: 33,
                //     end_index: 33,
                //     rowspan: '2',
                // },
                //  {
                //     name: 'InvActCost',
                //     required: true,
                //     label: 'InvActCost',
                //     align: 'left',
                //     sortable: true,
                //     field: 'InvActCost',
                //     format_child: '',
                //     tooltip: '',
                //     headerStyle: 'text-align: center;',
                //     filter_type: 'input',
                //     filter_options: [],
                //     filter_value: '',
                //     main_column: true,
                //     main_column_name: '',
                //     index: 23,
                //     colspan: 0,
                //     colspan_name: '',
                //     start_index: 33,
                //     end_index: 33,
                //     rowspan: '2',
                // },
                // {
                //     name: 'InvActToCost',
                //     required: true,
                //     label: 'InvActToCost',
                //     align: 'left',
                //     sortable: true,
                //     field: 'InvActToCost',
                //     format_child: '',
                //     tooltip: '',
                //     headerStyle: 'text-align: center;',
                //     filter_type: 'input',
                //     filter_options: [],
                //     filter_value: '',
                //     main_column: true,
                //     main_column_name: '',
                //     index: 23,
                //     colspan: 0,
                //     colspan_name: '',
                //     start_index: 33,
                //     end_index: 33,
                //     rowspan: '2',
                // },
                // {
                //     name: 'RefNo',
                //     required: true,
                //     label: 'RefNo',
                //     align: 'left',
                //     sortable: true,
                //     field: 'RefNo',
                //     format_child: '',
                //     tooltip: '',
                //     headerStyle: 'text-align: center;',
                //     filter_type: 'input',
                //     filter_options: [],
                //     filter_value: '',
                //     main_column: true,
                //     main_column_name: '',
                //     index: 23,
                //     colspan: 0,
                //     colspan_name: '',
                //     start_index: 33,
                //     end_index: 33,
                //     rowspan: '2',
                // },
                // {
                //     name: 'SysAvgCost',
                //     required: true,
                //     label: 'SysAvgCost',
                //     align: 'left',
                //     sortable: true,
                //     field: 'SysAvgCost',
                //     format_child: '',
                //     tooltip: '',
                //     headerStyle: 'text-align: center;',
                //     filter_type: 'input',
                //     filter_options: [],
                //     filter_value: '',
                //     main_column: true,
                //     main_column_name: '',
                //     index: 23,
                //     colspan: 0,
                //     colspan_name: '',
                //     start_index: 33,
                //     end_index: 33,
                //     rowspan: '2',
                // },
                // {
                //     name: 'SysQOH',
                //     required: true,
                //     label: 'SysQOH',
                //     align: 'left',
                //     sortable: true,
                //     field: 'SysQOH',
                //     format_child: '',
                //     tooltip: '',
                //     headerStyle: 'text-align: center;',
                //     filter_type: 'input',
                //     filter_options: [],
                //     filter_value: '',
                //     main_column: true,
                //     main_column_name: '',
                //     index: 23,
                //     colspan: 0,
                //     colspan_name: '',
                //     start_index: 33,
                //     end_index: 33,
                //     rowspan: '2',
                // },
                // {
                //     name: 'WeightAvgCost',
                //     required: true,
                //     label: 'Weight Avg Cost',
                //     align: 'left',
                //     sortable: true,
                //     field: 'WeightAvgCost',
                //     format_child: '',
                //     tooltip: '',
                //     headerStyle: 'text-align: center;',
                //     filter_type: 'input',
                //     filter_options: [],
                //     filter_value: '',
                //     main_column: true,
                //     main_column_name: '',
                //     index: 23,
                //     colspan: 0,
                //     colspan_name: '',
                //     start_index: 33,
                //     end_index: 33,
                //     rowspan: '2',
                // },
                
                // {
                //     name: 'Dept',
                //     required: true,
                //     label: 'Dept',
                //     align: 'right',
                //     sortable: true,
                //     field: 'Dept',
                //     format_child: '',
                //     tooltip: '',
                //     headerStyle: 'text-align: center;',
                //     filter_type: 'input',
                //     filter_options: [],
                //     filter_value: '',
                //     main_column: true,
                //     main_column_name: '',
                //     index: 22,
                //     colspan: 0,
                //     colspan_name: '',
                //     start_index: 32,
                //     end_index: 32,
                //     rowspan: '2',
                // },
                // {
                //     name: 'SubDept',
                //     required: true,
                //     label: 'SubDept',
                //     align: 'right',
                //     sortable: true,
                //     field: 'SubDept',
                //     format_child: '',
                //     tooltip: '',
                //     headerStyle: 'text-align: center;',
                //     filter_type: 'input',
                //     filter_options: [],
                //     filter_value: '',
                //     main_column: true,
                //     main_column_name: '',
                //     index: 22,
                //     colspan: 0,
                //     colspan_name: '',
                //     start_index: 32,
                //     end_index: 32,
                //     rowspan: '2',
                // },
                // {
                //     name: 'Category',
                //     required: true,
                //     label: 'Category',
                //     align: 'right',
                //     sortable: true,
                //     field: 'Category',
                //     format_child: '',
                //     tooltip: '',
                //     headerStyle: 'text-align: center;',
                //     filter_type: 'input',
                //     filter_options: [],
                //     filter_value: '',
                //     main_column: true,
                //     main_column_name: '',
                //     index: 22,
                //     colspan: 0,
                //     colspan_name: '',
                //     start_index: 32,
                //     end_index: 32,
                //     rowspan: '2',
                // },
                // {
                //     name: 'AutoClosePO',
                //     required: true,
                //     label: 'Auto Close PO',
                //     align: 'right',
                //     sortable: true,
                //     field: 'AutoClosePO',
                //     format_child: '',
                //     tooltip: '',
                //     headerStyle: 'text-align: center;',
                //     filter_type: 'input',
                //     filter_options: [],
                //     filter_value: '',
                //     main_column: true,
                //     main_column_name: '',
                //     index: 22,
                //     colspan: 0,
                //     colspan_name: '',
                //     start_index: 32,
                //     end_index: 32,
                //     rowspan: '2',
                // },
                // {
                //     name: 'BasketQty',
                //     required: true,
                //     label: 'Basket Qty',
                //     align: 'left',
                //     sortable: true,
                //     field: 'BasketQty',
                //     format_child: '',
                //     tooltip: '',
                //     headerStyle: 'text-align: center;',
                //     filter_type: 'input',
                //     filter_options: [],
                //     filter_value: '',
                //     main_column: true,
                //     main_column_name: '',
                //     index: 23,
                //     colspan: 0,
                //     colspan_name: '',
                //     start_index: 33,
                //     end_index: 33,
                //     rowspan: '2',
                // }
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
        var tabNames = ["Product"];

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
            "dispatch": 'purchase/trigger_post_get_read_grmain_new', //refer to path/function_name in store actions.js
            "getter": 'purchase/get_read_grmain', //refer to path/function_name in store getters.js
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
            filter.Subtotal1 = this.formatAmount(filter.Subtotal1, '$');
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
        this.$router.push("Goodsreceivednote");
    },

  async handleCreateGRN(){
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

      if (this.$route.query.RefNo) {
      // Existing vendor: Call saveVendor (update)
      await this.saveGRN();
      } else {
          // New vendor: Call createVendor (create)
          await this.createGRN();
      }
    },

    async createGRN() {
      var Receivedby = this.getuser
      var RefNo = this.json.RefNo
      var GRDate = this.json.GRDate
      var SubDeptCode = this.json.SubDeptCode
      var Location = this.json.Location
      var Code = this.json.Code
      var Name = this.json.Name
      var Remark = this.json.Remark
      var Term = this.json.Term
      // var CalDueDateby = this.json.CalDueDateby
      var DocDate = this.json.DocDate
      var loc_group = this.json.loc_group
      // var tax_code_purchase = this.json.tax_code_purchase
      var DueDate = this.json.DueDate
      var DONo = this.json.DONo
      var InvNo = this.json.InvNo
      var in_kind = this.json.in_kind
      var consign = this.json.consign
      var BillStatus = this.json.BillStatus
      var ibt = this.json.ibt
      var DOState = this.json.DOState
      var InvState = this.json.InvState
      var Subtotal1 = this.unformatAmount(this.json.Subtotal1)
      var total_include_tax = this.unformatAmount(this.json.total_include_tax)
      var Total = this.unformatAmount(this.json.Total)

      var payload = {
          pass_json: {
            Receivedby: Receivedby,
            RefNo: RefNo,
            GRDate: GRDate,
            SubDeptCode: SubDeptCode, //no_pass
            Code: Code,
            // Name: Name,
            Remark: Remark,
            Term: Term,
            // CalDueDateby: CalDueDateby,
            DocDate: DocDate,
            loc_group: loc_group,
            Location: Location,
            // tax_code_purchase: tax_code_purchase, //no_pass
            DueDate: DueDate,
            DONo: DONo,
            InvNo: InvNo, //no_pass
            consign: consign, //no_pass
            in_kind: in_kind,
            ibt: ibt,
            BillStatus: BillStatus,
            DOState: DOState,
            Subtotal1: Subtotal1,
            Total: Total,
            InvState: InvState,
            total_include_tax: total_include_tax, //no_pass
            Remark: 'test', //hardcode
            // tax_code_purchase: 'T0001', //hardcode
            
          }
      }

      console.log('create_GRMAIN_payload', payload);

      var object_pass = {
          "dispatch": 'purchase/trigger_post_create_grmain_new',
          "getter": 'purchase/get_read_grmain',
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
            name: 'GoodsReceivedNoteDetails',
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

    async saveGRN(){
      var Receivedby = this.getuser
      var RefNo = this.json.RefNo
      var GRDate = this.json.GRDate
      var SubDeptCode = this.json.SubDeptCode
      var Location = this.json.Location
      var Code = this.json.Code
      // var SName = this.json.SName
      var Remark = this.json.Remark
      var Term = this.json.Term
      // var CalDueDateby = this.json.CalDueDateby
      var DocDate = this.json.DocDate
      var loc_group = this.json.loc_group
      var Location = this.json.Location
      // var tax_code_purchase = this.json.tax_code_purchase
      var DueDate = this.json.DueDate
      var DONo = this.json.DONo
      var InvNo = this.json.InvNo
      var consign = this.json.consign
      var in_kind = this.json.in_kind
      var ibt = this.json.ibt
      var BillStatus = this.json.BillStatus
      var DOState = this.json.DOState
      var InvState = this.json.InvState
      var Subtotal1 = this.unformatAmount(this.json.Subtotal1)
      var total_include_tax = this.unformatAmount(this.json.total_include_tax)
      var Total = this.unformatAmount(this.json.Total)

      var payload = {
        pass_json: {
          Receivedby: Receivedby, //no_need_pass
          // laststamp: '2024-09-23 17:22:09', //no_need_pass
          // IssueStamp: '2024-09-23 17:22:09', //no_need_pass
          RefNo: RefNo,
          GRDate: GRDate,
          Location: Location,
          SubDeptCode: SubDeptCode,
          Code: Code,
          // SName: SName,
          Remark: Remark,
          Term: Term,
          // CalDueDateby: CalDueDateby,
          DocDate: DocDate,
          loc_group: loc_group,
          Location: Location,
          // tax_code_purchase: tax_code_purchase,
          DueDate: DueDate,
          DONo: DONo,
          InvNo: InvNo,
          consign: consign,
          in_kind: in_kind,
          DOState: DOState,
          BillStatus: BillStatus,
          ibt: ibt,
          InvState: InvState,
          Total: Total,
          Subtotal1: Subtotal1,
          total_include_tax: total_include_tax,
          Remark: 'test', //hardcode
        }
      }

    console.log('this.pass_json', payload);
    var object_pass = {
      "dispatch": 'purchase/trigger_post_update_grmain_new',
      "getter": 'purchase/get_read_grmain',
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

.showAddLoading
{
  z-index: 3;
}

* >>> .sticky_column .q-table thead tr:first-child th:nth-child(7),
* >>> .sticky_column .q-table td:nth-child(7) {
  position: sticky;
  left: 0px;
  z-index: 2;
}

* >>> .sticky_column .q-table thead tr:first-child th:nth-child(8),
* >>> .sticky_column .q-table td:nth-child(8) {
  position: sticky;
  left: 85.84px;
  z-index: 2;
}

* >>> .sticky_column .q-table thead tr:first-child th:nth-child(9),
* >>> .sticky_column .q-table td:nth-child(9) {
  position: sticky;
  left: 174.12px;
  z-index: 2;
}

* >>> .sticky_column .q-table thead tr:first-child th:nth-child(8)
{background-color: #DEE1E6;}
* >>> .sticky_column .q-table td:nth-child(8)
{background-color: white;}
* >>> .sticky_column .q-table thead tr:first-child th:nth-child(8)
{background-color: #DEE1E6;}
* >>> .sticky_column .q-table td:nth-child(8)
{background-color: white;}
* >>> .sticky_column .q-table thead tr:first-child th:nth-child(9)
{background-color: #DEE1E6;}
* >>> .sticky_column .q-table td:nth-child(9)
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
