<template>
  <div v-if="$q.screen.width > 599" class="card_sides">
    <!-- <div class="chip-container">
    </div> -->
    <q-card class="card-container" style="max-height: 100%;">

      <!-- Design 1 -->
      <!-- <q-card-section class="theme_color dialog_header header_top">
        <div class="intermediate"/>
        <div v-if="page_function == 'CreateGoodsReceivedNote'" class="text-subtitle1 header_text">Goods Received Note</div>
        <div v-if="page_function == 'EditGoodsReceivedNote'" class="text-subtitle1 header_text">
          Goods Received Note<br>
          <span class="text-caption">
            Refno: {{ json.RefNo }} | Supplier: {{ json.Code }} - {{ json.Name }} | Branch: {{json.loc_group}}<br>
          </span>
        </div>
      </q-card-section> -->

      <!-- Design 2 with #RefNo-->
      <!-- <q-card-section class="theme_color dialog_header header_top">
        <div class="intermediate"/>
        <div v-if="page_function == 'CreateGoodsReceivedNote'" class="text-subtitle1 header_text">Goods Received Note</div>
        <div v-if="page_function == 'EditGoodsReceivedNote'" class="text-subtitle1 header_text">
          Goods Received Note &nbsp;#{{ json.RefNo }}<br>
          <div class="row">
            <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
              <span class="text-caption"> Branch: {{json.loc_group}} | Supplier: {{ json.Code }} - {{ json.Name }} <br></span>
            </div>
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 text-right">
              <span class="text-caption text-right text-bold" style="font-size:14px"> Total Amount: {{ currency_sign }} {{ json.Total}}<br></span>
            </div>
          </div>
        </div>
      </q-card-section> -->
      <!-- <q-card-section class="theme_color dialog_header header_top">
        <div class="intermediate"/>
        <div v-if="page_function == 'CreateGoodsReceivedNote'" class="text-subtitle1 header_text">Goods Received Note</div>
        <div v-if="page_function == 'EditGoodsReceivedNote'" class="text-subtitle1 header_text">
          Goods Received Note<br>
          <div class="row">
            <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
              <span class="text-caption">   {{ this.$language('D0030') }}: {{ json.RefNo }} | {{ this.$language('D0026') }}: {{json.loc_group}} | {{ this.$language('D0025') }}: {{ json.Code }} - {{ json.Name }} | <br></span>
            </div>
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 text-total">
              <span class="text-caption text-total text-bold" style="font-size:14px">{{ this.$language('D0145') }}: {{currency_sign}} {{json.Total}}<br></span>
            </div>
          </div>
          
        </div>
      </q-card-section> -->
      <!-- <span class="text-caption">
            {{ this.$language('D0030') }}: {{ json.RefNo }} | {{ this.$language('D0026') }}: {{json.loc_group}} | {{ this.$language('D0025') }}: {{ json.SCode }} - {{ json.SName }} | {{ this.$language('D0145') }}: {{currency_sign}} {{json.Total}}<br> -->
            <!-- Refno: {{ json.RefNo }} | Branch: {{json.loc_group}} | Supplier: {{ json.SCode }} - {{ json.SName }} | Total: RM {{json.Total}}<br>-->
          <!-- </span> -->
      <q-card-section class="upload_container">
        <q-form ref="save_form">
          <!-- <div class="intermediate_white"/> -->
          <div class="row upload_separator_first">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
<!-- modified q-stepper -->
              <q-stepper
                flat
                header-nav
                v-model="json.step"
                color="primary"
                animated
                @update:model-value="handleChangeStepper"
                :class="page_function == 'EditGoodsReceivedNote' ? 'sticky_stepper' : ''"
                inactive-color="grey-7"
                done-color="primary"
              >
                <q-step
                  :name="1"
                  title="Header"
                  icon="settings"
                  prefix="1"
                  :done="json.step > 1"
                >
<!-- GENERAL INFORMATION -->
                  <div class="row first_dialog_separator">
                    <div class=" row col-12">
                      <div class=" col-3 left_section left_section_font">General Information</div>
                      <div class="col-9 row right_section">
                        <div class="row" style="width:100%">
                          <div :class="json.BillStatus == 0 && !supplier_readonly ? 'col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <SelectFilter
                              :readonly="json.BillStatus == 1 ? true : supplier_readonly"
                              :no_label="false"
                              label="Supplier"
                              v-model:pass_value="json.Code"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.select"
                              :options="supplier_options"
                              v-on:receiveChange="handleChangeSCode"
                              />
                            </div>
                            
                          </div>
                        </div>
                        <div class=" row" style="width:100%">
                          <div v-if="page_function=='EditGoodsReceivedNote'" class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-md">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <Input
                                :autofocusclick="true"
                                :no_label="false"
                                label="Refno"
                                :readonly="true"
                                v-on:change="handleChange"
                                v-model="json.RefNo"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text" />
                              </div>
                          </div>
                          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-md">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <Input
                                :autofocusclick="true"
                                :no_label="false"
                                label="Received By"
                                :readonly="true"
                                v-on:change="handleChange"
                                v-model="json.Receivedby"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                              </div>
                            </div>
                          </div>
                        <div class="row" style="width:100%">
                          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-md">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <SelectFilter
                                :readonly="json.BillStatus==1"
                                :no_label="false"
                                :label="'Branch'"
                                v-model:pass_value="json.loc_group"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.select"
                                :options="location_options"
                                v-on:receiveChange="handleChangeLocGroup"
                                />
                              </div>
                          </div>
                          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-md">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <SelectFilter
                                :readonly="json.BillStatus == 1"
                                :no_label="false"
                                :label="'Received Location'"
                                v-model:pass_value="json.loc_group"
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
<!-- DOCUMENT DETAILS -->
                      <div class="row col-12">
                        <div class="col-3 left_section left_section_font">Document Details</div>
                        <div class="col-9 row right_section">
                          <div class="row" style="width:100%">
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-md">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <Input
                                :autofocusclick="true"
                                :no_label="false"
                                label="D/O #"
                                :readonly="json.BillStatus == 1"
                                v-on:change="handleChange"
                                v-model="json.DONo"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text" />
                              </div>
                            </div>
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-md">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <Input
                                :autofocusclick="true"
                                :no_label="false"
                                label="Invoice #"
                                :readonly="json.BillStatus == 1"
                                v-on:change="handleChange"
                                v-model="json.InvNo"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text" />
                              </div>
                            </div>
                          </div>
                          <div class="row" style="width:100%">
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-md">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <!-- <Datepicker
                                :clickableInput="true"
                                :disable="json.BillStatus == 1"
                                :no_label="false"
                                label="Invoice Date"
                                :autoclose="true"
                                v-on:receiveChange="handleChangeDocDate"
                                :daterange="json.DocDate"
                                :componentBehavior="dbComponentBehavior ? dbComponentBehavior.select : oridbComponentBehavior.text" /> -->

                                <DatepickerOptions
                                :clickableInput="true"
                                :no_label="false"
                                label="Invoice Date"
                                :disable="json.BillStatus==1"
                                :autoclose="true"
                                v-on:receiveChange="handleChangeDocDate"
                                :daterange="json.DocDate"
                                :optionsFn="generateDatePickerOptions"
                                :componentBehavior="dbComponentBehavior ? dbComponentBehavior.select : oridbComponentBehavior.text" />
                              </div>
                            </div>
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-md">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <!-- <Datepicker
                                :clickableInput="true"
                                :disable="json.BillStatus == 1"
                                :autoclose="true"
                                :no_label="false"
                                label="Receiving Date"
                                v-on:receiveChange="handleChangeGrDate"
                                :daterange="json.GRDate"
                                :componentBehavior="dbComponentBehavior ? dbComponentBehavior.select : oridbComponentBehavior.text" /> -->
                                <DatepickerOptions
                                :clickableInput="true"
                                :no_label="false"
                                label="Receiving Date"
                                :disable="json.BillStatus==1"
                                :autoclose="true"
                                v-on:receiveChange="handleChangeGrDate"
                                :daterange="json.GRDate"
                                :optionsFn="generateDatePickerGROptions"
                                :componentBehavior="dbComponentBehavior ? dbComponentBehavior.select : oridbComponentBehavior.text" />
                              </div>
                            </div>
                          </div>
                          <div class="row" style="width:100%">
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-md">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <Input
                                :autofocusclick="true"
                                :no_label="false"
                                label="Cross Ref #"
                                :readonly="true"
                                v-on:change="handleChange"
                                v-model="json.cross_ref"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                              </div>
                          </div>
                          </div>
                        </div>
                      </div>
                      <q-separator class="separator-style"></q-separator>
<!-- PAYMENT INFORMATION -->
                      <div class="row col-12">
                        <div class="col-3 left_section left_section_font">Payment Information</div>
                        <div class="col-9 row right_section">
                          <div class="row full-width">
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-md">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <!-- <Select
                                :readonly="true"
                                :no_label="true"
                                v-model="json.Term"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.select : oridbComponentBehavior.select"
                                :options="term_options"
                                v-on:receiveChange="handleChange"
                                /> -->
                                <Input
                                :autofocusclick="true"
                                :no_label="false"
                                :label="'Term'"
                                :readonly="true"
                                v-on:change="handleChange"
                                v-model="json.Term"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                              </div>
                            </div>
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-md">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <Input
                                :autofocusclick="true"
                                :no_label="false"
                                :label="'Cal. Due Date by'"
                                :readonly="true"
                                v-on:change="handleChange"
                                v-model="json.CalDueDateby"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                              </div>
                            </div>
                          </div>
                          <div class="row full-width">
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-md">
                            <div :class="$q.screen.width < 1024 ? '' : ''">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <Datepicker
                                :clickableInput="true"
                                :no_label="false"
                                label="Due Date"
                                :disable="true"
                                :autoclose="true"
                                v-on:receiveChange="handleChangeDueDate"
                                :daterange="json.DueDate"
                                :componentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text" />
                              </div>
                            </div>
                            </div>
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-md">
                            <div :class="$q.screen.width < 1024 ? '' : ''">
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
                            </div>
                          </div>
                          <div class="row full-width">
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-md">
                            <div :class="$q.screen.width < 1024 ? '' : ''">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <Input
                                :autofocusclick="true"
                                :no_label="false"
                                label="Carton Price"
                                :readonly="true"
                                v-on:change="handleChange"
                                v-model="json.rebate_amt"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                              </div>
                            </div>
                            </div>
                          </div>
                        </div>
                      </div>
                       <q-separator class="separator-style"></q-separator>
<!-- TAX INFORMATION -->
                      <div class="row col-12">
                        <div class="col-3 left_section left_section_font">Tax Information</div>
                        <div class="col-9 row right_section">
                          <div class="row full-width">
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-md">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <Input
                                :autofocusclick="true"
                                :no_label="false"
                                label="Tax %"
                                :readonly="true"
                                v-on:change="handleChange"
                                v-model="json.gst_tax_rate"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                              </div>
                            </div>
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-md">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <Input
                                :autofocusclick="true"
                                :no_label="false"
                                label="Tax Amt"
                                :readonly="true"
                                v-on:change="handleChange"
                                v-model="json.gst_tax_sum"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                              </div>
                            </div>
                          </div>
                          <div class="row full-width">
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-md">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <Input
                                :autofocusclick="true"
                                :no_label="false"
                                label="Tax Adjust"
                                :readonly="true"
                                v-on:change="handleChange"
                                v-model="json.gst_adj"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                            </div>
                            </div>
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-md">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <Input
                                :autofocusclick="true"
                                :no_label="false"
                                label="Rounding Adjust"
                                :readonly="true"
                                v-on:change="handleChange"
                                v-model="json.rounding_adj"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                              </div>
                            
                            </div>
                          </div>
                          <div class="row full-width">
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-md">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">

                                <Input
                                :autofocusclick="true"
                                :no_label="false"
                                label="Total After Tax"
                                :readonly="true"
                                v-on:change="handleChange"
                                v-model="json.total_include_tax"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                              </div>
                            </div>
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-md">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <Input
                                :autofocusclick="true"
                                :no_label="false"
                                label="Landed Cost"
                                :readonly="true"
                                v-on:change="handleChange"
                                v-model="json.landed_cost_total"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <q-separator class="separator-style"></q-separator>
<!-- VENDOR INVOICE -->
                      <div class="row col-12">
                        <div class="col-3 left_section left_section_font">Vendor Invoice</div>
                        <div class="col-9 row right_section">
                          <div class="row full-width">
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-md">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <Input
                                :autofocusclick="true"
                                :no_label="false"
                                label="Exclude Tax"
                                :readonly="json.BillStatus == 1"
                                v-on:change="handleChangeVendorExcTax"
                                v-model="json.input_amt_exc_tax"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                              </div>
                            </div>
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-md">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <Input
                                :autofocusclick="true"
                                :no_label="false"
                                label="GST"
                                :readonly="json.BillStatus == 1"
                                v-on:change="handleChangeVendorGST"
                                v-model="json.input_gst"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                              </div>
                            </div>
                          </div>
                          <div class="row full-width">
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-md">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <Input
                                :autofocusclick="true"
                                :no_label="false"
                                label="Include Tax"
                                :readonly="true"
                                v-on:change="handleChange"
                                v-model="json.input_amt_inc_tax"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <q-separator class="separator-style"></q-separator>
<!-- GRN TOTAL -->
                      <div class="row col-12">
                        <div class="col-3 left_section left_section_font">GRN Total</div>
                        <div class="col-9 row right_section">
                          <div class="row full-width">
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-md">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <Input
                                :autofocusclick="true"
                                :no_label="false"
                                label="Gross"
                                :readonly="true"
                                v-on:change="handleChange"
                                v-model="json.Subtotal1"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                              </div>
                            </div>
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-md">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <Input
                                :autofocusclick="true"
                                :no_label="false"
                                label="Disc"
                                :readonly="true"
                                v-on:change="handleChange"
                                v-model="json.Discount1"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                              </div>
                            </div>
                          </div>
                          <div class="row full-width">
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-md">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <Input
                                :autofocusclick="true"
                                :no_label="false"
                                label="Nett"
                                :readonly="true"
                                v-on:change="handleChange"
                                v-model="json.Total"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <q-separator class="separator-style"></q-separator>
<!-- INVOICE TOTAL -->
                      <div class="row col-12">
                        <div class="col-3 left_section left_section_font">Invoice Total</div>
                        <div class="col-9 row right_section">
                          <div class="row full-width">
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-md">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <Input
                                :autofocusclick="true"
                                :no_label="false"
                                label="Gross"
                                :readonly="true"
                                v-on:change="handleChange"
                                v-model="json.InvAmount_Vendor"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                              </div>
                                
                            </div>
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-md">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <Input
                                :autofocusclick="true"
                                :no_label="false"
                                label="Disc"
                                :readonly="true"
                                v-on:change="handleChange"
                                v-model="json.InvSurchargeDisc_Vendor"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                              </div>
                            </div>
                          </div>
                          <div class="row full-width">
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-md">
                                <div class="row">
                                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <Input
                                    :autofocusclick="true"
                                    :no_label="false"
                                    label="Nett"
                                    :readonly="true"
                                    v-on:change="handleChange"
                                    v-model="json.InvNetAmt_Vendor"
                                    :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                                  </div>
                                </div>
                              </div>
                          </div>
                        </div>
                      </div>
                  
                  <q-separator class="separator-style"></q-separator>
<!-- CHECKBOX -->
                  <div v-if="$q.screen.width > 599 && $q.screen.width < 1024" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div class="column" style="height:200px;align-content: space-between">
                      <div class="col-4 col-md-4">
                        <Checkbox :class="[json.consign === 1 ? 'custom_truthcheckbox' : 'custom_checkbox_disabl']" :btm_padding="true" size="md" :disable="true" v-model="json.consign" :true-value="1" :false-value="0" />
                        <span class="checkbox_InterfontMedium_disabled">Consign</span>
                      </div>
                      <div class="col-4 col-md-4">
                        <Checkbox :class="[json.BillStatus === 1 ? 'custom_truthcheckbox' : 'custom_checkbox_disabl']" :btm_padding="true" size="md" :disable="true" v-model="json.BillStatus" :true-value="1" :false-value="0" />
                        <span class="checkbox_InterfontMedium_disabled">Posted</span>
                      </div>
                      <div class="col-4 col-md-4">
                        <Checkbox :class="[json.in_kind === 1 ? 'custom_truthcheckbox' : 'custom_checkbox_disabl']" :btm_padding="true" size="md" :disable="true" v-model="json.in_kind" :true-value="1" :false-value="0" />
                        <span class="checkbox_InterfontMedium_disabled">In-kind</span>
                      </div>
                      <div class="col-4 col-md-4">
                        <Checkbox :class="[json.DOState === 1 ? 'custom_truthcheckbox' : 'custom_checkbox_disabl']" :btm_padding="true" size="md" :disable="true" v-model="json.DOState" :true-value="1" :false-value="0" />
                        <span class="checkbox_InterfontMedium_disabled">D/O</span>
                      </div>
                      <div class="col-4 col-md-4">
                        <Checkbox :class="[json.ibt === 1 ? 'custom_truthcheckbox' : 'custom_checkbox_disabl']" :btm_padding="true" size="md" :disable="true" v-model="json.ibt" :true-value="1" :false-value="0" />
                        <span class="checkbox_InterfontMedium_disabled">IBT/ICT</span>
                      </div>
                      <div class="col-4 col-md-4">
                        <Checkbox :class="[json.InvState === 1 ? 'custom_truthcheckbox' : 'custom_checkbox_disabl']" :btm_padding="true" size="md" :disable="true" v-model="json.InvState" :true-value="1" :false-value="0" />
                        <span class="checkbox_InterfontMedium_disabled">Invoice</span>
                      </div>
                      <div v-if="json.BillStatus == 1" class="col-6 col-md-6 q-pl-sm q-pb-none">
                        <div :class="$q.screen.width > 1023 ? 'dialog_separator' : ''">
                        <div class="col-xs-7 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                            <span class="checkbox_InterfontMedium_disabled">Posted By</span>
                        </div>
                          <div class="col-xs-5 col-sm-6 col-md-6 col-lg-6 col-xl-6" style="width:200px">
                            <Input
                            :autofocusclick="true"
                            :no_label="true"
                            :readonly="true"
                            v-on:change="handleChange"
                            v-model="json.postby"
                            :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                          </div>
                        </div>
                      </div>
                      <div :class="json.BillStatus == 1 ? 'col-6 col-md-6 q-pl-sm q-pb-none' : 'col-12 col-md-12 q-pl-sm items-center justify-center q-pb-none'">
                        <div :class="$q.screen.width > 1023 ? '' : ''">
                          <div class="col-xs-7 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                            <span class="checkbox_InterfontMedium_disabled">Account Status</span>
                          </div>
                          <div class="col-xs-5 col-sm-6 col-md-6 col-lg-6 col-xl-6" style="width:200px">
                            <Input
                            :autofocusclick="true"
                            :no_label="true"
                            :readonly="true"
                            v-on:change="handleChange"
                            v-model="json.EXPORT_ACCOUNT"
                            :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div v-if="$q.screen.width > 1023" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div class="column" style="height:200px;align-content:space-between">
                      <div class="col-4 col-md-4">
                        <Checkbox :class="[json.consign === 1 ? 'custom_truthcheckbox' : 'custom_checkbox_disabl']" :btm_padding="true" size="md" :disable="true" v-model="json.consign" :true-value="1" :false-value="0" />
                        <span class="checkbox_InterfontMedium_disabled">Consign</span>
                      </div>
                      <div class="col-4 col-md-4">
                        <Checkbox :class="[json.BillStatus === 1 ? 'custom_truthcheckbox' : 'custom_checkbox_disabl']" :btm_padding="true" size="md" :disable="true" v-model="json.BillStatus" :true-value="1" :false-value="0" />
                        <span class="checkbox_InterfontMedium_disabled">Posted</span>
                      </div>
                      <div class="col-4 col-md-4">
                        <Checkbox :class="[json.in_kind === 1 ? 'custom_truthcheckbox' : 'custom_checkbox_disabl']" :btm_padding="true" size="md" :disable="true" v-model="json.in_kind" :true-value="1" :false-value="0" />
                        <span class="checkbox_InterfontMedium_disabled">In-kind</span>
                      </div>
                      <div class="col-4 col-md-4">
                        <Checkbox :class="[json.DOState === 1 ? 'custom_truthcheckbox' : 'custom_checkbox_disabl']" :btm_padding="true" size="md" :disable="true" v-model="json.DOState" :true-value="1" :false-value="0" />
                        <span class="checkbox_InterfontMedium_disabled">D/O</span>
                      </div>
                      <div class="col-4 col-md-4">
                        <Checkbox :class="[json.ibt === 1 ? 'custom_truthcheckbox' : 'custom_checkbox_disabl']" :btm_padding="true" size="md" :disable="true" v-model="json.ibt" :true-value="1" :false-value="0" />
                        <span class="checkbox_InterfontMedium_disabled">IBT/ICT</span>
                      </div>
                      <div class="col-4 col-md-4">
                        <Checkbox :class="[json.InvState === 1 ? 'custom_truthcheckbox' : 'custom_checkbox_disabl']" :btm_padding="true" size="md" :disable="true" v-model="json.InvState" :true-value="1" :false-value="0" />
                        <span class="checkbox_InterfontMedium_disabled">Invoice</span>
                      </div>
                      <div v-if="json.BillStatus == 1" class="col-6 col-md-6 q-pl-sm q-pb-none">
                        <div :class="$q.screen.width > 1023 ? 'dialog_separator' : ''">
                        <div class="col-xs-7 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                            <span class="checkbox_InterfontMedium_disabled">Posted By</span>
                        </div>
                          <div class="col-xs-5 col-sm-6 col-md-6 col-lg-6 col-xl-6" style="width:200px">
                            <Input
                            :autofocusclick="true"
                            :no_label="true"
                            :readonly="true"
                            v-on:change="handleChange"
                            v-model="json.postby"
                            :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                          </div>
                        </div>
                      </div>
                      <div :class="json.BillStatus == 1 ? 'col-6 col-md-6 q-pl-sm q-pb-none' : 'col-12 col-md-12 q-pl-sm items-center justify-center q-pb-none'">
                        <div :class="$q.screen.width > 1023 ? 'dialog_separator' : ''">
                          <div class="col-xs-7 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                            <span class="checkbox_InterfontMedium_disabled">Account Status</span>
                          </div>
                          <div class="col-xs-5 col-sm-6 col-md-6 col-lg-6 col-xl-6" style="width:200px">
                            <Input
                            :autofocusclick="true"
                            :no_label="true"
                            :readonly="true"
                            v-on:change="handleChange"
                            v-model="json.EXPORT_ACCOUNT"
                            :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                     
<!-- not used -->
                      <!-- <div class="col-xs-12 col-sm-12 col-md-9 col-lg-9 col-xl-9"> -->
                        

                        <!-- <div class="row dialog_separator"> -->
                          

                          <!-- <div class="input_wrapper_right" :class="json.BillStatus == 0 && !supplier_readonly ? 'col-xs-4 col-sm-5 col-md-7 col-lg-7 col-xl-7' : 'col-xs-4 col-sm-6 col-md-8 col-lg-8 col-xl-8'">
                            <div class="row">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <SelectFilter
                                :readonly="supplier_readonly"
                                :no_label="false"
                                label="Name"
                                v-model:pass_value="json.Code"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.select"
                                :options="supplier_options2"
                                v-on:receiveChange="handleChangeSCode"
                                />
                              </div>
                            </div>
                          </div> -->

                          <div v-if="json.BillStatus == 0 && !supplier_readonly" dir="rtl" class="col-xs-2 col-sm-1 col-md-1 col-lg-1 col-xl-1 input_wrapper_right">
                            <Button_icon :flat="true" :font_color="'white'" :color="'#094161'" :icon="'search'" :outline="false" size="13px"
                            v-on:receiveClick="addButtonCreatePOChild('supplier')" style="margin-top: 0px; height:100%"/>
                          </div>
                        <!-- </div> -->

                          


                          
                        <!-- </div> -->
                  </div>
                </q-step>

                <q-step
                  :name="2"
                  title="Detail"
                  prefix="2"
                  icon="create_new_folder"
                  :done="json.step > 2"
                >
                  <div class="row">
                      <div class=" col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"> <!--card_section_two-->
                          <PurchaseTable
                          hide_footer
                          :readonly_button="false"
                          :row_per_page="[0]"
                          :top_button="true"
                          :top_button_dropdown='true'
                          :group_button="group_button"
                          :select_all="select_all"
                          v-on:main_onItemClick="handleItemClick"
                          v-on:main_action="handleAction"
                          v-on:main_edit="handleEdit"
                          v-on:main_list="handleList"
                          v-on:main_delete="handleDelete"
                          v-on:receiveChangeSelectAll="handleChangeSelectAll"
                          v-on:receiveChangeCheckbox="handleChangeCheckbox"
                          v-on:receiveChangeGroup="handleChangeGroup"
                          v-on:receiveChangeUngroup="handleChangeUngroup"
                          :title="table_title"
                          :table_data="table_data"
                          :table_column="table_column"
                          :action_button="true"
                          :edit_button="false"
                          :view_button="false"
                          :delete_button="json.BillStatus == 0"
                          :flat_status="true"
                          :btndropdownList="btnList"
                          :bordered_status="true"
                          v-on:receiveRequestTable="handleTableChange"
                          />
                      </div>
                  </div>
                </q-step>

                <q-step
                v-if="page_function == 'EditGoodsReceivedNote'"
                  :name="3"
                  prefix="3"
                  title="Surcharge/Discount"
                  icon="create_new_folder"
                  :done="json.step > 3"
                >
                <div class="row surcharge_custom" style="padding-top:16px">
                      <div class="col-12">
                         <SurchargeTable
                            hide_footer
                            :add_button= 'true'
                            :edit_button="true"
                            :title_section = "'GRN'"
                            :table_footer = "grn_table_footer"
                            :SectionTableTitle = "'GRN Amount'"
                            :gross_amount="json.Subtotal1"
                            :nett_amount="json.Total"
                            :readonly_button="false"
                            :optionsFn="td_options"
                            :disableTdCheckbox='json.BillStatus != 0'
                            :disableTdClick="json.BillStatus != 0"
                            :top_button="false"
                            v-on:receiveAdd="showDialogAddSurcharge('GRN')"
                            v-on:main_delete="showDeleteSurchargeLineConfirmDialog"
                            :title="table_title"
                            :totalDisc="totalDisc"
                            :table_data="surcharge_table_data"
                            :table_column="surcharge_table_column"
                            :delete_button="json.BillStatus == 0"
                            :flat_status="true"
                            :bordered_status="true"
                            v-on:main_edit="showDialogEditSurcharge"
                            v-on:receiveSave="handleChangeValueInput"
                            v-on:receiveTotalCalculatedValue="handleChangeGRNTotalValue"
                            :forceLoading="false"
                            />
                      </div>
                      <q-separator class="separator-style"></q-separator>
                      <div class="col-12">
                        <SurchargeTable
                            hide_footer
                            :title_section = "'GRN'"
                            :edit_button="true"
                            :table_footer = "inv_table_footer"
                            :SectionTableTitle = "'Invoice Amount'"
                            :gross_amount="json.InvAmount_Vendor"
                            :nett_amount="json.InvNetAmt_Vendor"
                            :readonly_button="false"
                            :optionsFn="td_options"
                            :disableTdCheckbox='json.BillStatus != 0'
                            :disableTdClick="json.BillStatus != 0"
                            :top_button="false"
                            v-on:receiveAdd="showDialogAddSurcharge('INV')"
                            v-on:main_delete="showDeleteINVSurchargeLineConfirmDialog"
                            :title="table_title"
                            :totalDisc="TotalInvDisc"
                            :table_data="inv_surcharge_table_data"
                            :table_column="inv_surcharge_table_column"
                            :delete_button="false"
                            :flat_status="true"
                            :bordered_status="true"
                            v-on:main_edit="showDialogEditInvSurcharge"
                            v-on:receiveChangeCheckbox="handleChangeSurchargeTableCheckbox"
                            v-on:receiveSave="handleChangeValueInput"
                            v-on:receiveTotalCalculatedValue="handleChangeINVTotalValue"
                            :forceLoading="false"
                            />

                      </div>
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
     <q-card-actions class="dialog_action justify-between" style="padding-top:24px">
        <div v-if="this.json.step == 1">
            <!-- <Button_icon :flat="true" :font_color="'black'" :color="'white'" :text="'BACK'" :outline="true" size="15px" class="custom_cancel_button" @click="back()" /> -->

          <span v-if="page_function=='EditGoodsReceivedNote'" class="q-pl-xs"><!--:text="'NEXT'"-->
            <Button_icon :flat="true" :font_color="'#29292A'" :icon-right="'chevron_right'" :color="'white'" :outline="false" size="14px"
            @click="json.step = 2" class="primary_navigation_button primary_button_font"/>
          </span>
        </div>

        <div v-if="this.json.step == 2"><!--:text="'BACK'"-->
          <Button_icon :flat="true" :font_color="'#29292A'" :icon="'chevron_left'" :color="'white'" :outline="false" size="14px" @click="json.step = 1" class="primary_navigation_button primary_button_font"/>

          <span class="q-pl-md"><!--:text="'NEXT'"-->
            <Button_icon :flat="true" :font_color="'#29292A'" :icon-right="'chevron_right'" :color="'white'"  :outline="false" size="14px"
            @click="json.step = 3" class="primary_navigation_button primary_button_font"/>
            <!-- <Button_icon :flat="false" :font_color="'black'" :color="'white'" :text="'PREVIOUS'" :outline="true" size="15px"
            @click="json.step = 1"/> -->
          </span>
        </div>
        <span v-if="page_function == 'EditGoodsReceivedNote'" class="q-gutter-x-md">
          <!-- <Button_icon v-if="page_function == 'EditGoodsReceivedNote' && this.json.step == 1" :flat="false" :font_color="'#1E90FF'" :color="'white'" :icon="'img:icons/print.svg'" :outline="false" size="16px"
              v-on:receiveClick="handlePrint"  class="print_actions_button"/> -->
         
          <span v-if="page_function == 'EditGoodsReceivedNote'" class="q-pl-xs">
               <Button_icon v-if="page_function == 'EditGoodsReceivedNote' && this.json.step == 1" :flat="true" :text="json.BillStatus==1 ? 'UNPOST' : 'POST'" :outline="false" size="16px"
                v-on:receiveClick="confirmPost" :class="{ 'primary_actions_button': json.BillStatus === 1, 'secondary_actions_button': json.BillStatus === 0 }"/>
              <Button_icon v-if="page_function == 'EditGoodsReceivedNote' && this.json.step == 3" :flat="true" :font_color="'#29292A'" :icon="'chevron_left'" :color="'white'" :outline="true" size="14px" class="primary_navigation_button primary_button_font" @click="back()" />
          </span>
        <span v-if="json.BillStatus == 0 && (this.json.step == 1 || this.json.step == 2)" class="q-pl-xs">
          <Button_icon :flat="true" :font_color="'white'" :color="'#1E90FF'" :text="'SAVE'" :outline="false" size="16px"
            v-on:receiveClick="handleCreatePO" class="primary_actions_button"/>
        </span>
        </span>
      </q-card-actions>
  </div>

  <div v-else class="card_sides">
    <div class="row col-12 justify-between q-pb-md">
    <div :class="page_function == 'CreateGoodsReceivedNote' ? 'chip-container_2' : 'chip-container_1'">
          <!-- <Chip v-if="page_function == 'CreateGoodsReceivedNote'" :text="'Outlet'" v-on:receiveClick="handleNavigate('Outlet')" icon='img:icons/outlet.svg' color="grey-6" class="bold-font custom-chip-padding"/> -->
          <!-- <i v-if="page_function == 'CreateGoodsReceivedNote'" class="fas fa-chevron-right chip-icon"></i> -->
          <!-- <Chip v-if="page_function == 'EditGoodsReceivedNote' || page_function == 'CreateGoodsReceivedNote'" :text="$language('D0123')" v-on:receiveClick="handleNavigate('GoodsReceivedNote')" icon="img:icons/purchase.svg" color="grey-6" class="bold-font custom-chip-padding"/> -->
          <!-- <i class="fas fa-chevron-right chip-icon"></i> -->
          <Chip v-if="page_function == 'CreateGoodsReceivedNote'" :text="$language('D0039')" text-color="grey-10" class="bold-font chip_sty" v-on:receiveClick="handleNavigate('GoodsReceivedNote')"/>
          <Chip v-if="page_function == 'EditGoodsReceivedNote'" :icon="'chevron_left'" :square="true" :label="$language('D0030') +' : '+ json.RefNo" text-color="grey-10" class="bold-font chip_sty" v-on:receiveClick="handleNavigate('GoodsReceivedNote')"/>
    </div>
    <div class="justify-left items-center" >
                  <Button_icon class="summary_button q-pa-none q-ma-none" :flat="true" :label="currency_sign + ' ' + json.Total"  v-on:receiveClick="show_summary_dialog" :font_color="'primary'" :color="'primary'" :outline="false" size="13px"/>
                  <!-- <span class="" style="color:#1976D2;" @click="show_summary_dialog"> Total Amount:  {{ currency_sign }} {{ json.Total }} </span> -->
    </div>
    </div>
    <q-card class="card-container" style="min-height: 100vh;">
      <!-- <q-card-section class="header_top"> -->
        <!-- <Button_icon :disable="showAddLoading" :big_round="true" :flat="true" :font_color="'black'" :color="'rgba(255, 255, 255, 0.5)'" :icon="'arrow_back_ios'" :outline="true" size="12px" class="custom_back_button" @click="back()" /> -->
        <!-- <div v-if="page_function == 'CreateGoodsReceivedNote'" class="text-subtitle1 header_text">Goods Received Note</div> -->
        <!-- <div v-if="page_function == 'EditGoodsReceivedNote'" class="text-subtitle1 header_text">Goods Received Note -->
        <!-- <br>Refno: {{ json.RefNo }}</div> -->
         <!-- <q-btn-dropdown v-if="page_function == 'EditGoodsReceivedNote' && json.step == 2" :disable="showAddLoading" class="custom_more_button" flat dense icon="more_vert"> -->
          <!-- <q-list v-for="item in btnList" :key="item"> -->
            <!-- <q-item clickable v-close-popup>
              <q-item-section>
                <q-item-label @click="confirmPost" >{{item.title}}</q-item-label>
              </q-item-section>
            </q-item> -->
          <!-- </q-list> -->
        <!-- </q-btn-dropdown> -->
        <!-- <q-btn-dropdown v-if="page_function == 'EditGoodsReceivedNote'" :disable="showAddLoading" class="custom_more_button" flat dense icon="more_vert">
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
                  <div class="row col-12" style="padding-top: 16px;gap:16px">
                    <!-- <div class="col-xs-12 col-sm-12 col-md-9 col-lg-9 col-xl-9"> -->
                      <div class="row col-12">
                        <div class="" :class="json.BillStatus == 0 && !supplier_readonly ? 'col-xs-10 q-pr-sm' : 'col-xs-12'">
                          <div class="row">
                          <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                            <span class="mobile_font">Supplier</span>
                          </div> -->
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <SelectFilter
                              :readonly="json.BillStatus == 1 || supplier_readonly"
                              :no_label="false"
                              label="Supplier"
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
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Name</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <SelectFilter
                              :readonly="supplier_readonly"
                              :no_label="true"
                              v-model:pass_value="json.Code"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.select"
                              :options="supplier_options2"
                              v-on:receiveChange="handleChangeSCode"
                              />
                            </div>
                          </div>
                        </div> -->

                        <div v-if="json.BillStatus == 0 && !supplier_readonly" dir="rtl" class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 q-pl-sm" style="padding-top: 0px;">
                            <Button_icon :small_round="true" :flat="false" :font_color="'primary'" :color="'white'" :icon="'search'" :outline="false" size="13px"
                            v-on:receiveClick="addButtonCreatePOChild('supplier')" style="margin-top: 0px;height:100%" class="full-width full-height search_button primary_button_font"/>
                        </div>
                      </div>

                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <div class="row" :class="$q.screen.width < 1024 ? '' : ''">
                            <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Branch</span>
                            </div> -->
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <SelectFilter
                              :readonly="json.BillStatus == 1"
                              :no_label="false"
                              label="Branch"
                              v-model:pass_value="json.loc_group"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.select"
                              :options="location_options"
                              v-on:receiveChange="handleChangeLocGroup"
                              />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <div class="row" :class="$q.screen.width < 1024 ? '' : ''">
                            <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Received Location</span>
                            </div> -->
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <SelectFilter
                              :readonly="json.BillStatus == 1"
                              :no_label="false"
                              label="Receive Location"
                              v-model:pass_value="json.loc_group"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.select"
                              :options="location_options2"
                              v-on:receiveChange="handleChangeLocGroup"
                              />
                            </div>
                          </div>
                        </div>
              <q-separator class="separator-style"></q-separator>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <div class="row">
                            <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Received By</span>
                            </div> -->
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Received By"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="json.Receivedby"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>
                        <div class="row col-12">
                          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-sm">
                          <div class="row">
                            <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Receiving Date</span>
                            </div> -->
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <!-- <Datepicker
                              :clickableInput="true"
                              :disable="json.BillStatus == 1"
                              :autoclose="true"
                              :no_label="true"
                              v-on:receiveChange="handleChangeGrDate"
                              :daterange="json.GRDate"
                              :componentBehavior="dbComponentBehavior ? dbComponentBehavior.select : oridbComponentBehavior.text" /> -->
                              <DatepickerOptions
                              :clickableInput="true"
                              :no_label="false"
                              label="Receiving Date"
                              :disable="json.BillStatus==1"
                              :autoclose="true"
                              v-on:receiveChange="handleChangeGrDate"
                              :daterange="json.GRDate"
                               :optionsFn="generateDatePickerGROptions"
                              :componentBehavior="dbComponentBehavior ? dbComponentBehavior.select : oridbComponentBehavior.text" />
                            </div>
                          </div>
                          </div>
                          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-sm">
                          <div class="row">
                            <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Term</span>
                            </div> -->
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <!-- <Select
                              :readonly="true"
                              :no_label="true"
                              v-model="json.Term"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.select : oridbComponentBehavior.select"
                              :options="term_options"
                              v-on:receiveChange="handleChange"
                              /> -->
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Term"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="json.Term"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                            </div>
                          </div>
                          </div>
                        </div>
                        <div class="row col-12">
                          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-sm">
                          <div class="row">
                            <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Cal. Due Date by</span>
                            </div> -->
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Cal. Due Date by"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="json.CalDueDateby"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-sm">
                          <div class="row" :class="$q.screen.width < 1024 ? '' : ''">
                            <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Due Date</span>
                            </div> -->
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Datepicker
                              :clickableInput="true"
                              :no_label="false"
                              label="Due Date"
                              :disable="true"
                              :autoclose="true"
                              v-on:receiveChange="handleChangeDueDate"
                              :daterange="json.DueDate"
                              :componentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>
                        </div>
                      <!-- D/O AND INVOICE -->
                      <div class="row col-12">
                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-sm">
                          <div class="row">
                            <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">D/O #</span>
                            </div> -->
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="D/0 #"
                              :readonly="json.BillStatus == 1"
                              v-on:change="handleChange"
                              v-model="json.DONo"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-sm">
                          <div class="row">
                            <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Invoice #</span>
                            </div> -->
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Invoice #"
                              :readonly="json.BillStatus == 1"
                              v-on:change="handleChange"
                              v-model="json.InvNo"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="row col-12">
                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-sm">
                          <div class="row">
                            <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Invoice Date</span>
                            </div> -->
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <!-- <Datepicker
                              :clickableInput="true"
                              :disable="json.BillStatus == 1"
                              :no_label="true"
                              :autoclose="true"
                              v-on:receiveChange="handleChangeDocDate"
                              :daterange="json.DocDate"
                              :componentBehavior="dbComponentBehavior ? dbComponentBehavior.select : oridbComponentBehavior.text" /> -->
                              <DatepickerOptions
                              :clickableInput="true"
                              :no_label="true"
                              :disable="json.BillStatus==1"
                              :autoclose="true"
                              v-on:receiveChange="handleChangeDocDate"
                              :daterange="json.DocDate"
                               :optionsFn="generateDatePickerOptions"
                              :componentBehavior="dbComponentBehavior ? dbComponentBehavior.select : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>
                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-sm">
                          <div class="row" :class="$q.screen.width < 1024 ? '' : ''">
                            <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">REBATE</span>
                            </div> -->
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Rebate"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="json.rebate_amt"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div v-if="page_function=='EditGoodsReceivedNote'" class="row" style="gap:16px">
                        <div class="row col-12">                     
                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-sm">
                          <div class="row" :class="$q.screen.width < 1024 ? '' : ''">
                            <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Tax %</span>
                            </div> -->
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Tax%"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="json.gst_tax_rate"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-sm">
                          <div class="row" :class="$q.screen.width < 1024 ? '' : ''">
                            <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Tax Amt</span>
                            </div> -->
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Tax Amt"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="json.gst_tax_sum"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>
                        </div>   
                        <div class="row col-12">
                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-sm">
                          <div class="row" :class="$q.screen.width < 1024 ? '' : ''">
                            <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Tax Adjust</span>
                            </div> -->
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Tax Adjust"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="json.gst_adj"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-sm">
                          <div class="row" :class="$q.screen.width < 1024 ? '' : ''">
                            <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Landed Cost</span>
                            </div> -->
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Landed Cost"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="json.landed_cost_total"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>
                        </div>
                      </div>
                    <!-- </div> -->

                    <!-- <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3"> -->
                      <div class="row col-12">
                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-sm">
                          <div class="row">
                            <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Rounding Adjust</span>
                            </div> -->
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Rounding Adjust"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="json.rounding_adj"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-sm">
                          <div class="row">
                            <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Total After Tax</span>
                            </div> -->
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Total After Tax"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="json.total_include_tax"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <div class="row">
                            <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Cross Ref #</span>
                            </div> -->
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Cross Ref #"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="json.cross_ref"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>
                      <q-separator class="separator-style"></q-separator>

                      <div class="row col-12">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <div class="row">
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                              <span class="dialog_font_checkbox">GRN Total</span>
                            </div>
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                              <span class="dialog_font_checkbox">Invoice Total</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="row col-12">
                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-sm">
                          <div class="row">
                            <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Gross</span>
                            </div> -->
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Gross"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="json.Subtotal1"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-sm">
                          <div class="row">
                            <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Gross</span>
                            </div> -->
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Gross"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="json.InvAmount_Vendor"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>
                      </div>
                        <div class="row col-12">
                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-sm">
                          <div class="row">
                            <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Disc</span>
                            </div> -->
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Disc"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="json.Discount1"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-sm">
                          <div class="row">
                            <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Disc</span>
                            </div> -->
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Disc"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="json.InvSurchargeDisc_Vendor"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>
                      </div>
                        <div class="row col-12">
                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-sm">
                          <div class="row">
                            <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Nett</span>
                            </div> -->
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Nett"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="json.Total"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-sm">
                          <div class="row">
                            <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Nett</span>
                            </div> -->
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Nett"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="json.InvNetAmt_Vendor"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <q-separator class="separator-style"></q-separator>
                      <div class="row col-12">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <span class="dialog_font_checkbox">Vendor Invoice</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="row col-12">
                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-sm">
                          <div class="row">
                            <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Exclude Tax</span>
                            </div> -->
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Exclude Tax"
                              :readonly="json.BillStatus == 1"
                              v-on:change="handleChangeVendorExcTax"
                              v-model="json.input_amt_exc_tax"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-sm">
                          <div class="row">
                            <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">GST</span>
                            </div> -->
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="GST"
                              :readonly="json.BillStatus == 1"
                              v-on:change="handleChangeVendorGST"
                              v-model="json.input_gst"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="row col-12">
                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-sm">
                          <div class="row">
                            <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Include Tax</span>
                            </div> -->
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Include Tax"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="json.input_amt_inc_tax"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="row col-12">
                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <div class="row">
                            <div class="">
                              <Checkbox :class="[json.consign === 1 ? 'custom_truthcheckbox' : 'custom_checkbox_disabl']" :btm_padding="true" size="xs" :disable="true" v-model="json.consign" :true-value="1" :false-value="0" />
                              <span class="mobile_edit_checkbox">Consign</span>
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <div class="row">
                            <div class="col-xs-7 col-sm-6 col-md-8 col-lg-8 col-xl-8">
                              <Checkbox :class="[json.BillStatus === 1 ? 'custom_truthcheckbox' : 'custom_checkbox_disabl']" :btm_padding="true" size="xs" :disable="true" v-model="json.BillStatus" :true-value="1" :false-value="0" />
                              <span class="mobile_edit_checkbox">Posted</span>
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <div class="row">
                            <div class="col-xs-7 col-sm-6 col-md-8 col-lg-8 col-xl-8">
                              <Checkbox :class="[json.in_kind === 1 ? 'custom_truthcheckbox' : 'custom_checkbox_disabl']" :btm_padding="true" size="xs" :disable="true" v-model="json.in_kind" :true-value="1" :false-value="0" />
                              <span class="mobile_edit_checkbox">In-kind</span>
                            </div>
                          
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <div class="row">
                            <div class="">
                              <Checkbox :class="[json.DOState === 1 ? 'custom_truthcheckbox' : 'custom_checkbox_disabl']" :btm_padding="true" size="xs" :disable="true" v-model="json.DOState" :true-value="1" :false-value="0" />
                              <span class="mobile_edit_checkbox">D/O</span>
                            </div>
                          
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <div class="row">
                            <div class="">
                              <Checkbox :class="[json.ibt === 1 ? 'custom_truthcheckbox' : 'custom_checkbox_disabl']" :btm_padding="true" size="xs" :disable="true" v-model="json.ibt" :true-value="1" :false-value="0" />
                              <span class="mobile_edit_checkbox">IBT/ICT</span>
                            </div>
                            
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <div class="row">
                            <div class="col-xs-7 col-sm-6 col-md-8 col-lg-8 col-xl-8">
                              <Checkbox :class="[json.InvState === 1 ? 'custom_truthcheckbox' : 'custom_checkbox_disabl']" :btm_padding="true" size="xs" :disable="true" v-model="json.InvState" :true-value="1" :false-value="0" />
                              <span class="mobile_edit_checkbox">Invoice</span>
                            </div>
                            
                          </div>
                        </div>

                        <div v-if="json.BillStatus == 1" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" style="padding: 0px 0px 16px 8px">
                          <div class="row">
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                              <span class="mobile_edit_checkbox">Posted By</span>
                            </div>
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6" style="padding: 0px 3px">
                              <Input
                              :autofocusclick="true"
                              :no_label="true"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="json.postby"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" style="padding: 0px 0px 16px 8px">
                          <div class="row ">
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                              <span class="mobile_edit_checkbox">Account Status</span>
                            </div>
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6" style="padding: 0px 3px">
                              <Input
                              :autofocusclick="true"
                              :no_label="true"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="json.EXPORT_ACCOUNT"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>
                      </div>
                    <!-- </div> -->
                  </div>
                </q-step>

                <q-step

                  :name="2"
                  prefix="2"
                  title="Detail"
                  icon="create_new_folder"
                  :done="json.step > 2"
                >
                  <div class="row">
                    <div v-if="json.BillStatus == 0 && results.length != 0" class=" col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" style="padding-top: 16px">
                      <div class="row col-12" style="gap:12px"><!--Select All-->
                        <!-- <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1 col-xl-1">
                          <Checkbox
                          size="xs"
                          :disable="false"
                          :no_label="true"
                          v-model="select_all"
                          :dbComponentBehavior="dbComponentBehavior.text"
                          v-on:receiveChangenewVal="handleChangeSelectAll"
                          />
                        </div> -->
                        <!-- :label="$language('D0149')" -->
                        <!-- <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5"> -->
                        <Button_icon :disabled="false" :ripple="false" :flat="false"  v-on:receiveClick="handleChangeSelectAll2"
                        :text="$language('D0149')" :outline="true" size="12px" class=" button_selectAll"
                        @click="isSelectAllClicked = !isSelectAllClicked" :class="{ 'clicked': isSelectAllClicked, 'default': !isSelectAllClicked  }"/>
                        <!-- </div> -->
                        <!-- :color="isClicked ? '#8C8C8C' : '#ffffff'"  -->
                        <!-- <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5" >align="right" -->
                          <Button_icon :disabled="false" :ripple="false" :flat="false" v-on:receiveClick="handleChangeGroup()"
                           :text="$language('D0150')" class="button_group" :outline="true" size="12px"
                           @click="isGroupClicked = !isGroupClicked" :class="{ 'clicked': isGroupClicked, 'default': !isGroupClicked }"/><!--Group-->

                          <Button_icon :loading="loading_button" :disabled="false" :flat="false" v-on:receiveClick="handleChangeUngroup()"
                            :text="$language('D0151')" :ripple="false" :outline="true" size="12px" class="button_group"
                           @click="isUngroupClicked = !isUngroupClicked" :class="{ 'clicked': isUngroupClicked, 'default': !isUngroupClicked }"/><!--Ungroup-->
                          
                        <!-- </div> -->
                      </div>
                    </div>
                    <div class=" col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" style="padding-top: 16px">
                      <q-card flat bordered class="card_design q-mb-md" @click="selectCard(index)"  v-for="(group,index) in results" :key="index" style="width: 100%; border-radius:8px;padding:16px;"
                      :class="{'selected-card': selectedCardIndex === index}">
                          <q-card-section v-for="item in group.items" :key="item.RefNo"  style="padding: 5px;" >
                            <div class="row q-py-sm">
                                <div v-if="json.BillStatus == 0" class="col-xs-1 col-sm-1 col-md-1 col-lg-1 col-xl-1 q-px-sm self-center">
                                      <Checkbox
                                      v-if = "item.PriceType !== 'RTV' && item.PriceType !== 'VFOC'"
                                        size="xs"
                                        :disable="false"
                                        :no_label="true"
                                        v-model="item.select"
                                        :dbComponentBehavior="dbComponentBehavior.text"
                                        v-on:receiveChangenewVal="handleChangeCheckbox"
                                        :table="true"
                                      />
                                </div>
                                <div class=" q-px-sm " :class="json.BillStatus == 0 ? 'col-xs-11 col-sm-11 col-md-11 col-lg-11 col-xl-11' :'col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'">
                                  <div class="row">
                                    <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9 col-xl-9 text-subtitle2" style="color:#29292A;font-size:14px; font-family:InterfontBold; font-weight:700">
                                       {{ item.Description }}
                                    </div>
                                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 text-right" style="color:#29292A; font-family:InterfontBold; font-weight:700; font-size:14px">
                                       {{ currency_sign }} {{ item.TotalPrice }}
                                    </div>
                                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 text-caption" style="color:#757575; font-size:12px; font-weight:500; font-family: InterfontMedium">
                                       {{ item.PriceType }}
                                    </div>
                                    <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 text-right" style="font-size:14px; font-family:InterfontMedium; font-weight:500; color:#757575">
                                       {{ item.Qty }}
                                    </div>
                                </div>
                              </div>
                            </div>
                            <q-card-section v-show="selectedCardIndex === index">
                            <!-- <q-separator /> -->
                            <q-card-section v-if="json.BillStatus == 0" class="text-subtitle2" align="right">
                              <q-btn no-caps flat color="primary" label="Edit" :key="item.RefNo" @click="handleAction(item)" style="font-family:InterfontSemiBold; font-size: 14px;font-weight: 600;"/>
                              <q-btn no-caps flat color="red-7" label="Delete" :key="item.RefNo" @click="handleDelete(item)" style="font-family:InterfontSemiBold; font-size: 14px;font-weight: 600;"/>
                            </q-card-section>
                            <q-card-section v-else class="text-subtitle2" align="right">
                              <q-btn no-caps flat color="primary" label="View" v-for="item in group.items" :key="item.RefNo" @click="handleAction(item)" style="font-family:InterfontSemiBold; font-size: 14px;font-weight: 600;"/>
                            </q-card-section>
                          </q-card-section>
                          </q-card-section><!--@click="handleAction(item)"-->
                          
                      </q-card>
                    </div>
                    <!-- <div class="card_section_two col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                      <q-card v-if="results.length != 0" flat bordered class="card_design" style="width: 100%; border-radius:6px;"> -->
                          <!-- <q-card-section  v-for="(result,index) in results" @click="handleAction(result)" :key="index" style="padding: 5px; border-bottom: 1px solid rgba(0, 0, 0, 0.12);">
                            <div class="row">
                              <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9 col-xl-9 q-pl-sm">
                                <div class="row text-subtitle2">
                                  {{ result.Description }}
                                </div>
                              </div>
                              <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 q-pr-sm text-caption" align="right">
                                {{ result.Qty }}
                                <div style="padding-top: 35px;">
                                  {{ currency_sign }}  {{ result.TotalPrice }}
                                </div>
                              </div>
                            </div>
                          </q-card-section> -->
                          <!-- <q-card-section @click="addButtonCreatePOChild" style="padding: 0px; border-bottom: 1px solid rgba(0, 0, 0, 0.12);">
                            <div class="row">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" style="color: green; width: 100%;">
                                <div class="row items-center" style="width: 100%; height: 40px;">
                                  <div class="q-pl-sm q-pr-sm">
                                    <Button_icon style="border-radius: 15px;" :flat="true" :icon="'add'" v-on:receiveClick="addButtonCreatePOChild" :font_color="'white'" :color="'green'" :outline="false" size="12px"/>
                                  </div>
                                  <div>
                                    Add Another Item
                                  </div>
                                </div>
                              </div>
                            </div>
                          </q-card-section> -->
                      <!-- </q-card>
                    </div> -->
                  </div>
                </q-step>

               <q-step
                :name="3"
                prefix="3"
                :title="$language('D0042')"
                icon="create_new_folder"
                :done="json.step > 3"
                >
                <div class="q-pa-md">
                    <q-btn-group spread  >
                      <q-btn  :color="'#273655'"  text-color="white"  label="GRN Amount" @click="sectionClick('GRN')" style="background-color:#273655"/>
                      <q-btn :color="'#273655'" text-color="white"  label="Invoice Amount"  @click="sectionClick('Inv')" style="background-color:#273655"/>
                    </q-btn-group>
                </div>
                <div class="row">
                   <div v-if="grn_surcharge" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                      <q-card flat bordered class="card_design q-mb-sm"  style="width: 100%; border-radius:6px;">
                            <q-card-section  style="padding: 8px;" >
                                <div class="row dialog_separator items-center">

                                       <div class="q-pb-sm col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 input_wrapper_right">
                                            <span class="dialog_font">GRN Amount</span>
                                        </div>
                                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 input_wrapper_right" >

                                            <span class="mobile_font" style="color:red;">Gross</span>


                                        </div>
                                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                            <Input
                                            :autofocusclick="true"
                                            :no_label="true"
                                            :readonly="true"
                                            v-on:change="handleChange"
                                            v-model="json.Subtotal1"
                                            :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                                          </div>

                                      <div class="q-pt-sm col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-right">
                                        <Button_icon :disabled="false" :flat="true" :small_round="true"  v-on:receiveClick="addNewLineSurcharge(surcharge_table_data,'GRN')" :font_color="'white'"
                                        :color="'#094161'" :icon="'add'" :outline="false" size="11px"  :class="surcharge_disc_array.length > 0? 'q-mr-sm':''"/>
                                        <Button_icon v-if = "surcharge_disc_array.length > 0" :disabled="false" :flat="true" :small_round="true"  v-on:receiveClick="addButtonSurcharge(surcharge_table_data,'GRN')" :font_color="'white'"
                                        :color="'#094161'" :icon="'save'" :outline="false" size="11px"  />
                                      </div>
                                      <div class="q-pt-sm col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" >
                                         <div class="row" style="padding:0px 10px; font-size:12px; color:#ADAEAF;">
                                          <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1 col-xl-1">

                                          </div>
                                          <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                                             Code
                                          </div>
                                          <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                                             Description
                                          </div>
                                          <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1 col-xl-1">
                                             Type
                                          </div>
                                          <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 text-right">
                                            Value
                                          </div>
                                          <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 text-right">
                                            Calculated
                                          </div>
                                         </div>
                                        <q-card flat bordered class="card_design q-mb-xs" style="width: 100%; border-radius:6px;" v-for="object_disc in surcharge_disc_array" :key="object_disc">
                                          <q-card-section style="padding:10px;">
                                        <div class="row items-center">
                                          <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1 col-xl-1 text-left q-pa-none">
                                              <q-btn flat round color="red" desen class="q-ma-none" icon="delete" @click.stop="showDeleteSurchargeLineConfirmDialog(object_disc)" size="12px"/>
                                          </div>
                                          <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                                            <Select
                                              :readonly="json.BillStatus ==1 || title_dialog == 'Invoice'"
                                              :no_label="false"
                                              v-model="surcharge_discount_json.Code"
                                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.surcharge_discount_code : oridbComponentBehavior.select"
                                              :options="codeOptions"
                                              v-on:receiveChange="handleSurchargeDiscountInputChange"
                                              emit-value
                                              />
                                            <!-- <span class="mobile_font">{{object_disc.Code}}</span> -->
                                          </div>
                                          <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 text-center">
                                            <span class="mobile_font"> {{object_disc.Description}}</span>
                                          </div>
                                          <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1 col-xl-1 text-center">
                                            <span class="mobile_font"> {{object_disc.surcharge_disc_type}}</span>
                                          </div>
                                          <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 text-right">
                                            <span class="mobile_font"> {{object_disc.surcharge_disc_value}}</span>
                                          </div>

                                           <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 text-right">
                                            <span class="mobile_font">{{object_disc.Value_Calculated}}</span>
                                          </div>

                                        </div>
                                      </q-card-section>
                                      </q-card>
                                      </div>

                                      <div class="q-pt-sm col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 input_wrapper_right" >

                                      <span class="mobile_font" style="color:red;">Nett</span>


                                      </div>
                                      <div class="q-pt-sm col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                      <Input
                                      :autofocusclick="true"
                                      :no_label="true"
                                      :readonly="true"
                                      v-on:change="handleChange"
                                      v-model="json.Total"
                                      :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                                      </div>
                                </div>
                            </q-card-section>
                      </q-card>
                   </div>
                   <div v-if="inv_surcharge" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                      <q-card flat bordered class="card_design q-mb-sm"  style="width: 100%; border-radius:6px;">
                            <q-card-section  style="padding: 8px;" >
                                <div class="row dialog_separator items-center">
                                       <div class="q-pb-sm col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 input_wrapper_right">
                                            <span class="dialog_font">Invoice Amount</span>
                                        </div>

                                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 input_wrapper_right" >
                                            <span class="mobile_font" style="color:red;">Gross</span>
                                        </div>

                                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                            <Input
                                            :autofocusclick="true"
                                            :no_label="true"
                                            :readonly="true"
                                            v-on:change="handleChange"
                                            v-model="json.InvAmount_Vendor"
                                            :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                                          </div>

                                      <div class="q-pt-sm col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-right input_wrapper_right">
                                        <Button_icon :disabled="false" :flat="true" :small_round="true"  v-on:receiveClick="addButtonSurcharge(inv_surcharge_table_data,'INV')" :font_color="'white'"
                                        :color="'#094161'" :icon="'add'" :outline="false" size="11px"  />
                                      </div>
                                      <div class="q-pt-sm col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" >
                                         <div class="row" style="padding:0px 10px; font-size:12px; color:#ADAEAF;">
                                          <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1 col-xl-1">

                                          </div>
                                          <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                                             Code
                                          </div>
                                          <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1 col-xl-1">
                                             Type
                                          </div>
                                          <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 text-right">
                                            Value
                                          </div>
                                          <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 text-right">
                                            Calculated
                                          </div>
                                         </div>
                                        <q-card flat bordered class="card_design q-mb-xs" style="width: 100%; border-radius:6px;" v-for="object_disc in inv_surcharge_disc_array" :key="object_disc"  @click="handleSurcharge('GRN',object_disc)">
                                          <q-card-section style="padding:10px;">
                                        <div class="row  items-center">
                                          <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1 col-xl-1">
                                              <q-icon name="edit" size="18px"/>
                                          </div>
                                          <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                                            <span class="mobile_font">{{object_disc.Code}}</span>
                                          </div>
                                          <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1 col-xl-1 text-center">
                                            <span class="mobile_font"> {{object_disc.surcharge_disc_type}}</span>
                                          </div>
                                          <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 text-right">
                                            <span class="mobile_font"> {{object_disc.surcharge_disc_value}}</span>
                                          </div>
                                           <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 text-right">
                                            <span class="mobile_font">{{object_disc.Value_Calculated}}</span>
                                          </div>
                                        </div>
                                      </q-card-section>
                                      </q-card>
                                      </div>

                                      <div class="q-pt-sm col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 input_wrapper_right">
                                        <span class="mobile_font" style="color:red;">Nett</span>
                                      </div>

                                      <div class="q-pt-sm col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                          <Input
                                          :autofocusclick="true"
                                          :no_label="true"
                                          :readonly="true"
                                          v-on:change="handleChange"
                                          v-model="json.InvNetAmt_Vendor"
                                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                                      </div>
                                </div>
                            </q-card-section>
                      </q-card>
                   </div>
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

    <div v-if="json.step == 1"  :style="page_function == 'EditGoodsReceivedNote' && json.BillStatus== 0 ? 'height: 65px;' : 'height: 40px;'">
    <!-- <div v-if="json.step == 1" class="dialog_action_bottom" :style="page_function == 'EditGoodsReceivedNote' && json.BillStatus== 0 ? 'height: 65px;' : 'height: 40px;'"> -->
      <!-- <div v-if="page_function == 'EditGoodsReceivedNote'" class="q-pl-sm q-pr-lg q-pt-xs text-right" style="font-size: 13px;">
        Total Amount: {{currency_sign}} {{ json.Total }}
      </div> -->
      <!-- <div v-if="page_function == 'EditGoodsReceivedNote'" class="row q-px-sm" :class="page_function == 'EditGoodsReceivedNote' && json.BillStatus !== 0 ? 'q-py-sm' :''" style="font-size: 13px;">
       <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 ">
          <div class="row justify-left items-center" >
             <Button_icon class="q-pa-none q-ma-none" :flat="true" :icon="'expand_less'" v-on:receiveClick="show_summary_dialog" :font_color="'primary'" :color="'primary'" :outline="false" size="13px"/>
             <span class="" style="color:#1966D2;" @click="show_summary_dialog"> Total Amount: {{ currency_sign }} {{ json.Total }} </span>
          </div>
        </div>
        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
           <div class="row">
            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-xs">
                <Button_icon v-if="json.BillStatus==1" class="full-width" style="height: 25px;" :small_round="true" :text="$language('D0148')" :flat="false" :font_color="'white'" :color="'#273655'" :outline="false" size="11px" @click="confirmPost"/>
                <Button_icon v-else class="full-width" style="height: 25px;" :small_round="true" :text="$language('D0019')" :flat="false" :font_color="'white'" :color="'#273655'" :outline="false" size="11px" @click="confirmPost"/>
            </div>
            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-xs">
                <Button_icon  class="full-width" style="height: 25px;" :small_round="true" :text="'PRINT'" :flat="false" :font_color="'white'" :color="'#273655'" :outline="false" size="11px" @click="handlePrint"/>
            </div>
          </div>
        </div>
        </div> -->
        <!-- <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 ">
          <div class="row justify-left items-center" >
             <Button_icon class="q-pa-none q-ma-none" :flat="true" :icon="'expand_less'" v-on:receiveClick="show_summary_dialog" :font_color="'primary'" :color="'primary'" :outline="false" size="13px"/>
             <span class="" style="color:#1966D2;" @click="show_summary_dialog"> Total Amount: {{ currency_sign }} {{ json.Total }} </span>
          </div>
        </div>
        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 text-right">
          <span class="q-pr-xs" :style="json.BillStatus == 1 ? 'width: 100%;' : 'width: 24%;'">
            <Button_icon v-if="json.BillStatus==1" class="full-width" style="height: 25px;" :small_round="true" :text="$language('D0148')" :flat="false" :font_color="'white'" :color="'#273655'" :outline="false" size="11px" @click="confirmPost"/>
            <Button_icon v-else class="full-width" style="height: 25px;" :small_round="true" :text="$language('D0019')" :flat="false" :font_color="'white'" :color="'#273655'" :outline="false" size="11px" @click="confirmPost"/>
          </span>
        </div> -->
      

      <!-- <div class="row q-px-sm q-py-xs">
        <Button_icon v-if="json.BillStatus==0" :readonly="page_function.startsWith('Edit') && deepEqual(ori_json, json)" style="height: 30px; width: 100%" :small_round="true" :text="page_function.startsWith('Create') ? '' : 'Update Goods Received Note'" :flat="false" :font_color="'white'" :color="'primary'" :outline="false" size="13px" @click="handleCreatePO"/>
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
<!-- aaa -->
    <div v-if="json.step == 2" class="" :style="page_function == 'EditGoodsReceivedNote' && json.BillStatus== 0  ? 'height: 65px;' : 'height: 40px;'">
      <!-- <div v-if="page_function == 'EditGoodsReceivedNote'" class="row q-px-sm" :class="page_function == 'EditGoodsReceivedNote' && json.BillStatus !== 0  ? 'q-pt-sm' :''"  style="font-size: 13px;">
        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 ">
          <div class="row justify-left items-center" >
             <Button_icon class="q-pa-none q-ma-none" :flat="true" :icon="'expand_less'" v-on:receiveClick="show_summary_dialog" :font_color="'primary'" :color="'primary'" :outline="false" size="13px"/>
             <span class="" style="color:#1966D2;" @click="show_summary_dialog"> Total Amount: {{ currency_sign }} {{ json.Total }} </span>
          </div>
        </div>
        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
           <div class="row">
            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-xs">
                <Button_icon v-if="json.BillStatus==1" class="full-width" style="height: 25px;" :small_round="true" :text="$language('D0148')" :flat="false" :font_color="'white'" :color="'#273655'" :outline="false" size="11px" @click="confirmPost"/>
                <Button_icon v-else class="full-width" style="height: 25px;" :small_round="true" :text="$language('D0019')" :flat="false" :font_color="'white'" :color="'#273655'" :outline="false" size="11px" @click="confirmPost"/>
            </div>
            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-xs">
                <Button_icon  class="full-width" style="height: 25px;" :small_round="true" :text="'PRINT'" :flat="false" :font_color="'white'" :color="'#273655'" :outline="false" size="11px" @click="handlePrint"/>
            </div>
          </div>
        </div>
        </div> -->
        <!-- <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 ">
          <div class="row justify-left items-center" >
             <Button_icon class="q-pa-none q-ma-none" :flat="true" :icon="'expand_less'" v-on:receiveClick="show_summary_dialog" :font_color="'primary'" :color="'primary'" :outline="false" size="13px"/>
             <span class="" style="color:#1976D2;" @click="show_summary_dialog"> {{ $language('D0032') }}:  {{ currency_sign }} {{ json.total_include_tax }} </span>
            </div>
        </div>
        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 text-right">
           <span class="q-pr-xs" :style="json.BillStatus == 1 ? 'width: 100%;' : 'width: 24%;'">
            <Button_icon v-if="json.BillStatus==1" class="full-width" style="height: 25px;" :small_round="true" :text="$language('D0148')" :flat="false" :font_color="'white'" :color="'#273655'" :outline="false" size="11px" @click="confirmPost"/>
            <Button_icon v-else class="full-width" style="height: 25px;" :small_round="true" :text="$language('D0019')" :flat="false" :font_color="'white'" :color="'#273655'" :outline="false" size="11px" @click="confirmPost"/>
          </span>
        </div> -->
     
      <div  v-if="json.BillStatus == 0" class="row q-pb-xs q-pr-sm"><!--   Add Item Details -->
        <!-- <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6" @click="handleItemClick('RTV')">
          <div class="row justify-center items-center" style="width: 100%; height: 40px;">
            <div class="q-pr-sm">
              <Button_icon style="border-radius: 15px;" :flat="false" :icon="'add'" v-on:receiveClick="handleItemClick('RTV')" :font_color="'white'" :color="'primary'" :outline="false" size="10px"/>
            </div>
            <div style="font-size: 11px;">
              RTV - Return to Vendor
              
            </div>
          </div>
        </div> -->
        <!-- <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6" @click="handleItemClick('VFOC')" style="border-left: 1px solid #cecaca; cursor: pointer">
          <div class="row justify-center items-center" style="width: 100%; height: 40px;">
            <div class="q-pr-sm">
              <Button_icon style="border-radius: 15px;" :flat="false" :icon="'add'" v-on:receiveClick="handleItemClick('VFOC')" :font_color="'white'" :color="'primary'" :outline="false" size="10px"/>
            </div>
            <div style="font-size: 11px;">
                Vendor FOC Item without PO
            </div>
          </div>
        </div> --></div>
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

    <div v-if="json.step == 3" class="dialog_action_bottom" :style="page_function == 'EditGoodsReceivedNote' && json.BillStatus== 0  ? 'height: 65px;' : 'height: 40px;'">
      <!-- <div  v-if="page_function == 'EditGoodsReceivedNote'" class="row q-px-sm" :class="page_function == 'EditGoodsReceivedNote' && json.BillStatus !== 0 ? 'q-py-sm' :''" style="font-size: 13px;">
        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 ">
          <div class="row justify-left items-center" >
             <Button_icon class="q-pa-none q-ma-none" :flat="true" :icon="'expand_less'" v-on:receiveClick="show_summary_dialog" :font_color="'primary'" :color="'primary'" :outline="false" size="13px"/>
             <span class="" style="color:#1966D2;" @click="show_summary_dialog"> Total Amount: {{ currency_sign }} {{ json.Total }} </span>
          </div>
        </div>
        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
           <div class="row">
            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-xs">
                <Button_icon v-if="json.BillStatus==1" class="full-width" style="height: 25px;" :small_round="true" :text="$language('D0148')" :flat="false" :font_color="'white'" :color="'#273655'" :outline="false" size="11px" @click="confirmPost"/>
                <Button_icon v-else class="full-width" style="height: 25px;" :small_round="true" :text="$language('D0019')" :flat="false" :font_color="'white'" :color="'#273655'" :outline="false" size="11px" @click="confirmPost"/>
            </div>
            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-xs">
                <Button_icon  class="full-width" style="height: 25px;" :small_round="true" :text="'PRINT'" :flat="false" :font_color="'white'" :color="'#273655'" :outline="false" size="11px" @click="handlePrint"/>
            </div>
          </div>
        </div>
      </div> -->
        <!-- <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 ">
          <div class="row justify-left items-center" >
             <Button_icon class="q-pa-none q-ma-none" :flat="true" :icon="'expand_less'" v-on:receiveClick="show_summary_dialog" :font_color="'primary'" :color="'primary'" :outline="false" size="13px"/>
             <span class="" style="color:#1976D2;" @click="show_summary_dialog"> Total Amount: {{currency_sign}} {{ json.Total }}</span>
            </div>
        </div>
        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 text-right">
           <span class="q-pr-xs" :style="json.BillStatus == 1 ? 'width: 100%;' : 'width: 24%;'">
            <Button_icon v-if="json.BillStatus==1" class="full-width" style="height: 25px;" :small_round="true" :text="'UNPOST'" :flat="false" :font_color="'white'" :color="'#273655'" :outline="false" size="11px" @click="confirmPost"/>
            <Button_icon v-else class="full-width" style="height: 25px;" :small_round="true" :text="'POST'" :flat="false" :font_color="'white'" :color="'#273655'" :outline="false" size="11px" @click="confirmPost"/>
          </span>
        </div> -->
      
      <!-- <div class="row q-px-sm q-py-xs">
        <Button_icon v-if="json.BillStatus==0" :readonly="page_function.startsWith('Edit') && deepEqual(ori_json, json)" style="height: 30px; width: 100%" :small_round="true" :text="page_function.startsWith('Create') ? '' : 'Update Goods Received Note'" :flat="false" :font_color="'white'" :color="'primary'" :outline="false" size="13px" @click="handleCreatePO"/>
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
    <q-card style="width: 864px; max-width: 98vw;text-align:center;margin-top: 2%;border-radius: 8px">

      <q-card-section class="theme_color row items-center" style="height:56px; padding: 8px 24px; border-bottom: 1px solid #a7bbcb;">
        <div class="text-h6">Confirmation</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup :disable="showAddLoading || showAddLoading2"/>
      </q-card-section>

      <q-card-section style="padding: 32px 24px">
        <!-- <span class="q-ml-sm custom_selection_font">{{general_body}}</span> -->
        <span class="confirmation_line_font">Are you sure to delete this line?</span>
      </q-card-section>

      <q-card-actions align="right" style="padding-top:0px;padding-bottom:16px;padding-right:16px">
        <div class="q-gutter-x-md">
        <q-btn flat label="Cancel" size="12px" font_color="#29292A" color="#29292A" v-close-popup class="dialog_confirm_cancel_button"/>
        <q-btn v-if="!edit_surcharge_action" flat :label="$language('D0156')" size="12px" font_color="'white'" color="'#D81111'" class="dialog_confirm_delete_button" @click="handleDeleteLine" />
        <q-btn v-if="edit_surcharge_action" flat :label="$language('D0117')" color="primary" @click="handleDeleteGRNSurchargeLine" />
        </div>
      </q-card-actions>

      <q-inner-loading
        :showing="deleteLoading"
        color="primary"
      />
    </q-card>
  </q-dialog>

  <q-dialog v-model="post_transmain" persistent position="top">
    <q-card style="width: 864px; max-width: 98vw;text-align:center;margin-top: 2%;border-radius: 8px">

      <q-card-section class="theme_color row items-center" style="height:56px; padding: 8px 24px; border-bottom: 1px solid #a7bbcb;">
        <div class="confirm_title">Confirmation</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup :disable="showAddLoading || showAddLoading2"/>
      </q-card-section>

      <q-card-section style="padding: 32px 24px;">
        <!-- <span class="q-ml-sm custom_selection_font">{{general_body}}</span> -->
        <span v-if="json.BillStatus == 0" class="confirmation_line_font">Are you sure to post?</span>
        <span v-if="json.BillStatus == 1" class="confirmation_line_font">Are you sure to unpost?</span>
      </q-card-section>

      <q-card-actions align="right" style="padding-top:0px; padding-bottom:16px; padding-right:24px">
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
      <q-card-section class="row header_top_mobile" :style="{ textAlign: (edit_child && json.BillStatus == 0) ? 'center' : 'left' }">
        <div v-if="edit_child && json.BillStatus == 0" class="mobile_dialog_delete_btn" @click="handleDelete(jsonChild)">
          <!-- Delete -->
          <Button_icon :disabled="readonly_delete" :icon="'fas fa-trash-alt'" :flat="true" :color="''" :font-color="'black'" :outline="false" size="12px" v-on:click="handleDelete(jsonChild)" class="q-mr-sm text-red" />
        </div>

        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center">
          <div v-if="!edit_child" class="text-subtitle1 header_text" style="margin-top: 5px;">GR Note Detail<br></div>
          <div v-else class="text-subtitle1 mobile_dialog_bottom" style="padding:16px 24px;margin-top: 0px;box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);">Edit GR Note Detail<br></div>
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
                    <div class="row col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" :class="$q.screen.width > 1023 ? 'q-pl-sm': ''" style="padding-bottom: 16px; gap: 8px">
                      <div class="row col-12">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <div class="row">
                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                              <span class="dialog_radio_title">Entry Type</span>
                            </div>
                            <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                              <Radio class="dialog_radio_options" size="xs" :disable="json.BillStatus ==1" v-on:receiveChange="handleChangeEntryType" v-model="jsonChild.EntryType" :options="entry_type_options"  />
                            </div>
                          </div>
                        </div>
                      </div>
                    <!-- </div> -->

                    <!-- <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6"></div> -->

                    <!-- <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" :class="$q.screen.width > 1023 ? 'q-pl-sm': ''"> -->
                      <div class="row col-12">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <div class="row">
                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                              <span class="dialog_radio_title">Pricing Type</span>
                            </div>
                            <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                              <Radio class="dialog_radio_options" size="xs" :disable="json.BillStatus ==1" v-on:receiveChange="handleChangePriceType" v-model="jsonChild.PriceType" :options="pricing_type_options"  />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"></div> -->
                    <div class="row col-12" style="gap:16px">
                      <div class="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
                        <div class="row">
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
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
                        </div>
                      </div>

                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
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
                      <div class="row col-12">
                      <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-sm">
                        <div class="row">
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <div class="row">
                              <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                <span class="mobile_font">Barcode</span>
                              </div> -->
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <!-- <Input
                                v-if="edit_child"
                                :autofocusclick="true"
                                :no_label="true"
                                :readonly="json.BillStatus ==1"
                                v-on:change="handleChange"
                                v-model="jsonChild.barcode"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" /> -->
                                <Select
                                :readonly="json.BillStatus ==1"
                                :no_label="false"
                                label="Barcode"
                                v-model="jsonChild.barcode"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.barcode : oridbComponentBehavior.select"
                                :options="barcode_options"
                                v-on:receiveChange="handleChange"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div v-if="edit_child" class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-sm">
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
                      </div>
                      <div class="row col-12">
                      <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-sm">
                        <div class="row">
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <!-- <div class="row">
                              <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
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
                      

                      <div v-if="edit_child" class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-sm">
                        <div class="row">
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <div class="row">
                              <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                <span class="mobile_font">Invoice vs Actual Variance</span>
                              </div> -->
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <Input
                                :autofocusclick="true"
                                :no_label="false"
                                label="Invoice vs Actual Variance"
                                :readonly="true"
                                v-on:change="handleChange"
                                v-model="jsonChild.inv_gr_variance"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right_readonly : oridbComponentBehavior.text" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      </div>
                      
                      <div class="row col-12">
                        <!-- <div v-if="edit_child" class="col-xs-4 col-sm-4 col-md-2 col-lg-2 col-xl-2 two_column_left">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Bulk Qty</span>
                            </div>
                            <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                              <Input
                              :autofocusclick="true"
                              :no_label="true"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="jsonChild.BulkQty"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right_readonly : oridbComponentBehavior.text" />
                            </div>
                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 q-pl-sm">
                              <span style="font-size: 13px;">x 1</span>
                            </div>
                          </div>
                        </div> -->

                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-sm" :class="!edit_child ? '' : ''">
                          <div class="row">
                            <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Qty</span>
                            </div> -->
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Qty"
                              :readonly="json.BillStatus ==1"
                              v-on:change="handleChangeQty"
                              v-model="jsonChild.SetQty"
                              :dbComponentBehavior="dbComponentBehavior ? (status==1? dbComponentBehavior.text_right_readonly : dbComponentBehavior.text_right) : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-sm">
                          <div class="row">
                            <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Unit Price</span>
                            </div> -->
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Unit Price"
                              :readonly="json.BillStatus ==1 ? true : jsonChild.PriceType=='FOC' ? true :  unit ? false : true"
                              v-on:change="handleChangeUnitPrice"
                              v-model="jsonChild.UnitPrice"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right_readonly : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <!-- <div class="col-xs-6 col-sm-7 col-md-3 col-lg-3 col-xl-3">
                          <div class="row" :class="$q.screen.width<1024 ? 'dialog_separator': ''">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Discount(+)/Surcharge(-)</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="true"
                              :readonly="unit ? false : true"
                              v-on:change="handleChangeDiscAmt"
                              v-model="jsonChild.DiscAmt"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div> -->
                      </div>

                      <div class="row col-12">
                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-sm">
                          <div class="row">
                            <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Disc1Type</span>
                            </div> -->
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Select
                              dir="ltr"
                              :readonly="json.BillStatus ==1 ? true : jsonChild.PriceType=='FOC' ? true :  unit ? false : true"
                              :no_label="false"
                              label="Disc1Type"
                              v-model="jsonChild.Disc1Type"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.disc1type : oridbComponentBehavior.select"
                              :options="disctype_options"
                              v-on:receiveChange="handleChangeDiscType"
                              />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-sm" :class="$q.screen.width >599 ? '' : ''">
                          <div class="row">
                            <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Disc1Value</span>
                            </div> -->
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Disc1Value"
                              :readonly="json.BillStatus ==1 ? true : jsonChild.PriceType=='FOC' ? true :  unit ? false : true"
                              v-on:change="handleChangeDisc1Value"
                              v-model="jsonChild.Disc1Value"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="row col-12">
                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-sm">
                          <div class="row" :class="$q.screen.width<599 ? '': ''">
                            <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Disc2Type</span>
                            </div> -->
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Select
                              dir="ltr"
                              :readonly="json.BillStatus ==1 ? true : jsonChild.PriceType=='FOC' ? true :  unit ? false : true"
                              :no_label="false"
                              label="Disc2Type"
                              v-model="jsonChild.Disc2Type"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.disc2type : oridbComponentBehavior.select"
                              :options="disctype_options"
                              v-on:receiveChange="handleChangeDiscType"
                              />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-sm">
                          <div class="row" :class="$q.screen.width<599 ? '': ''">
                            <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Disc2Value</span>
                            </div> -->
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Disc2Value"
                              :readonly="json.BillStatus ==1 ? true : jsonChild.PriceType=='FOC' ? true :  unit ? false : true"
                              v-on:change="handleChangeDisc2Value"
                              v-model="jsonChild.Disc2Value"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="row col-12">
                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-sm">
                          <div class="row">
                            <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Net Price</span>
                            </div> -->
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Net Price"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="jsonChild.NetUnitPrice"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-sm">
                          <div class="row">
                            <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Total before Tax</span>
                            </div> -->
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Total Before Tax"
                              :readonly="json.BillStatus ==1 ? true : jsonChild.PriceType=='FOC' ? true :  unit"
                              v-on:change="handleChangeTotalPrice"
                              v-model="jsonChild.TotalPrice"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="row col-12">
                        <div v-if="edit_child" class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-sm">
                          <div class="row">
                            <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Rebate Amount</span>
                            </div> -->
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Rebate Amount"
                              :readonly="json.BillStatus ==1"
                              v-on:change="handleChangeRebateValue"
                              v-model="jsonChild.rebate_value"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div v-if="edit_child" class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-sm">
                          <div class="row">
                            <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Future Price</span>
                            </div> -->
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Future Price"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="jsonChild.price_future"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>
                      </div>
                        <q-separator class="separator-style"></q-separator>
                        <!-- <div class="row"> -->
                          <span class="mobile_section_font">Invoice</span>

                          <div class="row col-12">
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-sm">
                              <div class="row">
                                <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                  <span class="mobile_font">Qty</span>
                                </div> -->
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                  <Input
                                  :autofocusclick="true"
                                  :no_label="false"
                                  label="Qty"
                                  :readonly="json.BillStatus ==1"
                                  v-on:change="handleChangeInvQty"
                                  v-model="jsonChild.Inv_Qty"
                                  :dbComponentBehavior="dbComponentBehavior ? (status==1? dbComponentBehavior.text_right_readonly : dbComponentBehavior.text_right) : oridbComponentBehavior.text" />
                                </div>
                              </div>
                            </div>

                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-sm" :class="$q.screen.width > 599 ? '': ''">
                              <div class="row" >
                                <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                  <span class="mobile_font">Unit Price</span>
                                </div> -->
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                  <Input
                                  :autofocusclick="true"
                                  :no_label="false"
                                  label="Unit Price"
                                  :readonly="json.BillStatus ==1 ? true : unit ? false : true"
                                  v-on:change="handleChangeInvUnitPrice"
                                  v-model="jsonChild.Inv_UnitPrice"
                                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right_readonly : oridbComponentBehavior.text" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="row col-12">
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-sm">
                              <div class="row" :class="$q.screen.width<599 ? '' : ''">
                                <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                  <span class="mobile_font">Disc1Type</span>
                                </div> -->
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                  <Select
                                  dir="ltr"
                                  :readonly="json.BillStatus ==1 ? true : unit ? false : true"
                                  :no_label="false"
                                  label="Disc1Type"
                                  v-model="jsonChild.Inv_Disc1Type"
                                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.disc1type : oridbComponentBehavior.select"
                                  :options="disctype_options"
                                  v-on:receiveChange="handleChangeInvDiscType"
                                  />
                                </div>
                              </div>
                            </div>

                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-sm" :class="$q.screen.width >599 ? '' : ''">
                              <div class="row" :class="$q.screen.width<599 ? '' : ''">
                                <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                  <span class="mobile_font">Disc1Value</span>
                                </div> -->
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                  <Input
                                  :autofocusclick="true"
                                  :no_label="false"
                                  label="Disc1Value"
                                  :readonly="json.BillStatus ==1 ? true : unit ? false : true"
                                  v-on:change="handleChangeInvDisc1Value"
                                  v-model="jsonChild.Inv_Disc1Value"
                                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="row col-12">
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-sm">
                              <div class="row" :class="$q.screen.width<599 ? '': ''">
                                <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                  <span class="mobile_font">Disc2Type</span>
                                </div> -->
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                  <Select
                                  dir="ltr"
                                  :readonly="json.BillStatus ==1 ? true : unit ? false : true"
                                  :no_label="false"
                                  label="Disc2Type"
                                  v-model="jsonChild.Inv_Disc2Type"
                                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.disc2type : oridbComponentBehavior.select"
                                  :options="disctype_options"
                                  v-on:receiveChange="handleChangeInvDiscType"
                                  />
                                </div>
                              </div>
                            </div>

                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-sm">
                              <div class="row" :class="$q.screen.width<599 ? '': ''">
                                <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                  <span class="mobile_font">Disc2Value</span>
                                </div> -->
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                  <Input
                                  :autofocusclick="true"
                                  :no_label="false"
                                  label="Disc2Value"
                                  :readonly="json.BillStatus ==1 ? true : unit ? false : true"
                                  v-on:change="handleChangeInvDisc2Value"
                                  v-model="jsonChild.Inv_Disc2Value"
                                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="row col-12">
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-sm">
                              <div class="row">
                                <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                  <span class="mobile_font">Net Price</span>
                                </div> -->
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                  <Input
                                  :autofocusclick="true"
                                  :no_label="false"
                                  label="Net Price"
                                  :readonly="true"
                                  v-on:change="handleChange"
                                  v-model="jsonChild.Inv_NetUnitPrice"
                                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                                </div>
                              </div>
                            </div>

                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-sm">
                              <div class="row">
                                <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                  <span class="mobile_font">Total before Tax</span>
                                </div> -->
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                  <Input
                                  :autofocusclick="true"
                                  :no_label="false"
                                  label="Total Before Tax"
                                  :readonly="json.BillStatus ==1 ? true : unit"
                                  v-on:change="handleChangeTotalPrice"
                                  v-model="jsonChild.Inv_TotalPrice"
                                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                                </div>
                              </div>
                            </div>
                          </div>

                        <!-- </div> -->
                          <!-- </div> -->
                      <!-- </div> -->
                    </div>
                </div>
                </div>
              </div>
            </div>
          </div>
        </q-form>
      </q-card-section>

      <q-card-actions v-if="json.BillStatus == 0" class="dialog_action" style="padding: 0px 16px 16px 16px">
        <div class="row full-width">
          <div v-if="!edit_child" class="col-xs-6 q-pr-xs">
            <Button_icon class="full-width" style="height: 30px;" :small_round="true" :text="'ADD'" :flat="false" :font_color="'white'" :color="'primary'" :outline="false" size="13px" @click="handleChild('save&add')"/>
          </div>
          <div :class="!edit_child ? 'col-xs-6 q-pl-xs': 'full-width'">
            <Button_icon class="full-width dialog_done_button" :small_round="true" :text="'DONE'" :flat="false" :font_color="'white'" :color="'primary'" :outline="false" size="13px" @click="handleChild('save')"/>
          </div>
        </div>
      </q-card-actions>

      <q-inner-loading
        :showing="showAddLoading"
        color="primary"
      />
    </q-card>

    <q-card v-else style="width: 864px; max-width: 98vw; margin-top: 2%; border-radius:8px">
      <q-card-section class=" row theme_color dialog_header" style="height: 56px; padding: 8px 24px;">
          <div class="text-subtitle1 header_text" style="margin-top: 5px;">Goods Received Note Detail<br></div>
          <q-space />
          <q-btn icon="close" flat round dense @click="close()" :disable="false"/>
      </q-card-section>

      <q-card-section class="upload_container">
        <q-form ref="save_edit_pochild_form">
          <div class="row upload_separator_first">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <div v-if="$q.screen.width < 1024" class="row input_wrapper_right">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  
                    <div v-if="edit_child && json.BillStatus == 0" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" align="right">
                      <Button_icon :disabled="readonly_delete" :icon="'fas fa-trash-alt'" :flat="true" :color="''" :outline="false" size="12px" v-on:click="handleDelete(jsonChild)" class="q-mr-sm text-red" />
                    </div>
                    <div class="row po_details_separator po_details_custom">
                    <div class="row col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" :class="$q.screen.width > 1023 ? 'q-pl-xs': ''" style="gap: 8px">
                      <div class="row col-12">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <div class="row ">
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                              <span class="dialog_radio_title">Entry Type</span>
                            </div>
                            <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                              <Radio class="dialog_radio_options" size="sm" :disable="json.BillStatus ==1" v-on:receiveChange="handleChangeEntryType" v-model="jsonChild.EntryType" :options="entry_type_options"  />
                            </div>
                          </div>
                        </div>
                      </div>
                    <!-- </div> -->
                    <!-- <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6"></div> -->

                    <!-- <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" :class="$q.screen.width > 1023 ? 'q-pl-xs': ''"> -->
                      <div class="row col-12">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <div class="row">
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                              <span class="dialog_radio_title">Pricing Type</span>
                            </div>
                            <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                              <Radio class="dialog_radio_options" size="sm" :disable="json.BillStatus ==1" v-on:receiveChange="handleChangePriceType" v-model="jsonChild.PriceType" :options="pricing_type_options"  />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- <div v-if="edit_child" class="col-xs-6 col-sm-4 col-md-2 col-lg-2 col-xl-2" :class="$q.screen.width > 1023 ? 'q-pl-sm': ''">
                      <div class="row dialog_separator">
                        <div class="col-xs-3 col-sm-2 col-md-3 col-lg-3 col-xl-3">
                          <Checkbox
                          size="xs"
                          :disable="true"
                          :no_label="true"
                          v-model="jsonChild.GroupCost"
                          v-on:receiveChange="handleChange"
                          :dbComponentBehavior="dbComponentBehavior.text"
                          :true-value="1"
                          :false-value="0"
                          />
                        </div>
                        <div class="col-xs-9 col-sm-10 col-md-9 col-lg-9 col-xl-9" style="margin-top: 3px">
                          <span class="dialog_font">Group Cost</span>
                        </div>
                      </div>
                    </div> -->

                    <!-- <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"></div> -->
<q-separator class="separator-style"></q-separator>

<!-- item code description -->
                    <div class="col-12">
                      <div class="row">
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-md">
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
<!-- description -->
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-md">
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
                    </div>
<!-- barcode packsize -->
                    <div class="col-12">
                      <div class="row">
<!-- barcode -->
                    <div class="col-xs-6 col-sm-6 col-md-2 col-lg-2 col-xl-2 q-pr-md">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <!-- <Input
                              v-if="edit_child"
                              :autofocusclick="true"
                              :no_label="false"
                              label="Barcode"
                              :readonly="json.BillStatus ==1"
                              v-on:change="handleChange"
                              v-model="jsonChild.barcode"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" /> -->
                              <Select
                              :readonly="json.BillStatus ==1"
                              :no_label="false"
                              v-model="jsonChild.barcode"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.barcode : oridbComponentBehavior.select"
                              :options="barcode_options"
                              v-on:receiveChange="handleChange"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
<!-- packsize -->
                    <div v-if="edit_child" class="col-xs-6 col-sm-6 col-md-2 col-lg-2 col-xl-2 q-pl-md">
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
                    </div>
<!-- article no invoice change -->
                    <div class="col-12">
                      <div class="row">
<!-- article no -->
                    <div class="col-xs-6 col-sm-6 col-md-2 col-lg-2 col-xl-2 q-pr-md">
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
<!-- invoice change -->
                    <div v-if="edit_child" class="col-xs-6 col-sm-6 col-md-2 col-lg-2 col-xl-2 q-pl-md">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Invoice vs Actual Variance"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="jsonChild.inv_gr_variance"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right_readonly : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                    </div>
                  
              
<!-- qty unit price-->
                  <div class="row col-12">
                    <!-- <div v-if="edit_child" class="col-xs-6 col-sm-6 col-md-2 col-lg-2 col-xl-2 four_column_left">
                      <div class="row">
                        <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                          <Input
                          :autofocusclick="true"
                          :no_label="false"
                          label="Bulk Qty"
                          :readonly="true"
                          v-on:change="handleChange"
                          v-model="jsonChild.BulkQty"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right_readonly : oridbComponentBehavior.text" />
                        </div>
                        <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 q-pl-sm">
                          <span style="font-size: 13px;">x 1</span>
                        </div>
                      </div>
                    </div> -->
<!-- qty -->
                    <div class="col-xs-6 col-sm-6 col-md-1 col-lg-1 col-xl-1 q-pr-md" :class="$q.screen.width>599 && $q.screen.width<1024 ? 'two_column_left' : !edit_child ? 'two_column_left' : ''">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <Input
                          :autofocusclick="true"
                          :no_label="false"
                          label="Qty"
                          :readonly="json.BillStatus ==1"
                          v-on:change="handleChangeQty"
                          v-model="jsonChild.SetQty"
                          :dbComponentBehavior="dbComponentBehavior ? (status==1? dbComponentBehavior.text_right_readonly : dbComponentBehavior.text_right) : oridbComponentBehavior.text" />
                        </div>
                      </div>
                    </div>
<!-- unit price -->
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-md" :class="!edit_child ? 'two_column_left': ''">
                      <div class="row" :class="$q.screen.width<599 ? '': ''">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <Input
                          :autofocusclick="true"
                          :no_label="false"
                          label="Unit Price"
                          :readonly="json.BillStatus ==1 ? true : jsonChild.PriceType=='FOC' ? true :  unit ? false : true"
                          v-on:change="handleChangeUnitPrice"
                          v-model="jsonChild.UnitPrice"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right_readonly : oridbComponentBehavior.text" />
                        </div>
                      </div>
                    </div>

                    <!-- <div class="col-xs-8 col-sm-7 col-md-3 col-lg-3 col-xl-3 four_column_left two_column_left">
                      <div class="row" :class="$q.screen.width<1024 ? 'dialog_separator': ''">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <Input
                          :autofocusclick="true"
                          :no_label="false"
                          label="Discount(+)/Surcharge(-)"
                          :readonly="unit ? false : true"
                          v-on:change="handleChangeDiscAmt"
                          v-model="jsonChild.DiscAmt"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                        </div>
                      </div>
                    </div> -->
                  </div>
<!-- disc1 type -->
                  <div class="row col-12">
                    <div class="col-xs-6 col-sm-3 col-md-3 col-lg-3 col-xl-3 q-pr-lg">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <Select
                          dir="ltr"
                          :readonly="json.BillStatus ==1 ? true : jsonChild.PriceType=='FOC' ? true :  unit ? false : true"
                          :no_label="false"
                          v-model="jsonChild.Disc1Type"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.disc1type : oridbComponentBehavior.select"
                          :options="disctype_options"
                          v-on:receiveChange="handleChangeDiscType"
                          />
                        </div>
                      </div>
                    </div>

                    <div class="col-xs-6 col-sm-3 col-md-3 col-lg-3 col-xl-3 q-pr-md" :class="$q.screen.width >599 ? '' : ''">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <Input
                          :autofocusclick="true"
                          :no_label="false"
                          label="Disc1Value"
                          :readonly="json.BillStatus ==1 ? true : jsonChild.PriceType=='FOC' ? true :  unit ? false : true"
                          v-on:change="handleChangeDisc1Value"
                          v-model="jsonChild.Disc1Value"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                        </div>
                      </div>
                    </div>
<!-- disc2 type -->
                    <div class="col-xs-6 col-sm-3 col-md-3 col-lg-3 col-xl-3 q-pl-md q-pr-md">
                      <div class="row" :class="$q.screen.width<599 ? '': ''">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <Select
                          dir="ltr"
                          :readonly="json.BillStatus ==1 ? true : jsonChild.PriceType=='FOC' ? true :  unit ? false : true"
                          :no_label="false"
                          v-model="jsonChild.Disc2Type"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.disc2type : oridbComponentBehavior.select"
                          :options="disctype_options"
                          v-on:receiveChange="handleChangeDiscType"
                          />
                        </div>
                      </div>
                    </div>

                    <div class="col-xs-6 col-sm-3 col-md-3 col-lg-3 col-xl-3 q-pl-md">
                      <div class="row" :class="$q.screen.width<599 ? '': ''">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <Input
                          :autofocusclick="true"
                          :no_label="false"
                          label="Disc2Value"
                          :readonly="json.BillStatus ==1 ? true : jsonChild.PriceType=='FOC' ? true :  unit ? false : true"
                          v-on:change="handleChangeDisc2Value"
                          v-model="jsonChild.Disc2Value"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                        </div>
                      </div>
                    </div>
                  </div>
<!-- net price -->
                  <div class="row col-12">
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-md">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <Input
                          :autofocusclick="true"
                          :no_label="false"
                          label="Net Price"
                          :readonly="true"
                          v-on:change="handleChange"
                          v-model="jsonChild.NetUnitPrice"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                        </div>
                      </div>
                    </div>
<!-- total before tax -->
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-md">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <Input
                          :autofocusclick="true"
                          :no_label="false"
                          label="Total before Tax"
                          :readonly="json.BillStatus ==1 ? true : jsonChild.PriceType=='FOC' ? true :  unit"
                          v-on:change="handleChangeTotalPrice"
                          v-model="jsonChild.TotalPrice"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                        </div>
                      </div>
                    </div>
                  </div>
<!-- rebate amount -->
                  <div class="row col-12">
                    <div v-if="edit_child" class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-md">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <Input
                          :autofocusclick="true"
                          :no_label="false"
                          label="Rebate Amount"
                          :readonly="json.BillStatus ==1"
                          v-on:change="handleChangeRebateValue"
                          v-model="jsonChild.rebate_value"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                        </div>
                      </div>
                    </div>
<!-- future price -->
                    <div v-if="edit_child" class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-md">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <Input
                          :autofocusclick="true"
                          :no_label="false"
                          label="Future Price"
                          :readonly="true"
                          v-on:change="handleChange"
                          v-model="jsonChild.price_future"
                          :dbComponentBehavior="dbComponentBehavior ? (status==1? dbComponentBehavior.text_right_readonly : dbComponentBehavior.text_right) : oridbComponentBehavior.text" />
                        </div>
                      </div>
                    </div>
                    </div>
<!-- invoice -->
                    <!-- <div class="upload_separator_second"> -->
                    <q-separator class="separator-style"></q-separator>
                      <span class="left_section_font">Invoice</span>
<!-- qty -->
                      <div class="row col-12">
                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-md">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Qty"
                              :readonly="json.BillStatus ==1"
                              v-on:change="handleChangeInvQty"
                              v-model="jsonChild.Inv_Qty"
                              :dbComponentBehavior="dbComponentBehavior ? (status==1? dbComponentBehavior.text_right_readonly : dbComponentBehavior.text_right) : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-md" :class="$q.screen.width > 599 ? '': ''">
                          <div class="row" >
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Unit Price"
                              :readonly="json.BillStatus ==1 ? true : unit ? false : true"
                              v-on:change="handleChangeInvUnitPrice"
                              v-model="jsonChild.Inv_UnitPrice"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right_readonly : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>
                      </div>
<!-- disc1 -->
                      <div class="row col-12">
                        <div class="col-xs-6 col-sm-3 col-md-3 col-lg-3 col-xl-3 q-pr-lg">
                          <div class="row" :class="$q.screen.width<599 ? '' : ''">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Select
                              dir="ltr"
                              :readonly="json.BillStatus ==1 ? true : unit ? false : true"
                              :no_label="false"
                              v-model="jsonChild.Inv_Disc1Type"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.disc1type : oridbComponentBehavior.select"
                              :options="disctype_options"
                              v-on:receiveChange="handleChangeInvDiscType"
                              />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-3 col-md-3 col-lg-3 col-xl-3 q-pr-md" :class="$q.screen.width >599 ? '' : ''">
                          <div class="row" :class="$q.screen.width<599 ? '' : ''">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Disc1Value"
                              :readonly="json.BillStatus ==1 ? true : unit ? false : true"
                              v-on:change="handleChangeInvDisc1Value"
                              v-model="jsonChild.Inv_Disc1Value"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-3 col-md-3 col-lg-3 col-xl-3 q-pl-md q-pr-md">
                          <div class="row" :class="$q.screen.width<599 ? '': ''">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Select
                              dir="ltr"
                              :readonly="json.BillStatus ==1 ? true : unit ? false : true"
                              :no_label="false"
                              v-model="jsonChild.Inv_Disc2Type"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.disc2type : oridbComponentBehavior.select"
                              :options="disctype_options"
                              v-on:receiveChange="handleChangeInvDiscType"
                              />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-3 col-md-3 col-lg-3 col-xl-3 q-pl-md">
                          <div class="row" :class="$q.screen.width<599 ? '': ''">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Disc2Value"
                              :readonly="json.BillStatus ==1 ? true : unit ? false : true"
                              v-on:change="handleChangeInvDisc2Value"
                              v-model="jsonChild.Inv_Disc2Value"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>
                        </div>
                      
<!-- netprice -->
                      <div class="row col-12">
                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-md">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Net Price"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="jsonChild.Inv_NetUnitPrice"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-md">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Total before Tax"
                              :readonly="json.BillStatus ==1 ? true : unit"
                              v-on:change="handleChangeTotalPrice"
                              v-model="jsonChild.Inv_TotalPrice"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>
                      </div>
                    
                </div>
                </div>
              </div>
                </div>
              <!-- DESIGN 1 -->
              <!-- DESIGN 1 -->
              <!-- <div v-if="$q.screen.width > 1023" class="row input_wrapper_right">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <div class="row dialog_separator">
                    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" :class="$q.screen.width > 1023 ? 'q-pl-sm': ''">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
                          <div class="row">
                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                              <span class="dialog_font">Entry Type</span>
                            </div>
                            <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                              <Radio size="xs" :disable="json.BillStatus ==1" v-on:receiveChange="handleChangeEntryType" v-model="jsonChild.EntryType" :options="entry_type_options"  />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6"></div>

                    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" :class="$q.screen.width > 1023 ? 'q-pl-sm': ''">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
                          <div class="row">
                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                              <span class="dialog_font">Pricing Type</span>
                            </div>
                            <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                              <Radio size="xs" :disable="json.BillStatus ==1" v-on:receiveChange="handleChangePriceType" v-model="jsonChild.PriceType" :options="pricing_type_options"  />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"></div>

                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                      <div class="row">
                        <div class="col-xs-6 col-sm-6 col-md-12 col-lg-12 col-xl-12 four_column_left two_column_left">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
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

                        <div class="col-xs-6 col-sm-6 col-md-12 col-lg-12 col-xl-12 four_column_left">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
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

                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 four_column_left two_column_left">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
                              <div class="row">
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"> -->
                                  <!-- <Input
                                  v-if="edit_child"
                                  :autofocusclick="true"
                                  :no_label="false"
                                  label="Barcode"
                                  :readonly="json.BillStatus ==1"
                                  v-on:change="handleChange"
                                  v-model="jsonChild.barcode"
                                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" /> -->
                              <!--    <Select
                                  :readonly="json.BillStatus ==1"
                                  :no_label="false"
                                  v-model="jsonChild.barcode"
                                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.barcode : oridbComponentBehavior.select"
                                  :options="barcode_options"
                                  v-on:receiveChange="handleChange"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div v-if="edit_child" class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 four_column_left">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
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

                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 four_column_left two_column_left">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
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

                        <div v-if="edit_child" class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 four_column_left">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
                              <div class="row">
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                  <Input
                                  :autofocusclick="true"
                                  :no_label="false"
                                  label="Invoice vs Actual Variance"
                                  :readonly="true"
                                  v-on:change="handleChange"
                                  v-model="jsonChild.inv_gr_variance"
                                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right_readonly : oridbComponentBehavior.text" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                      <div class="row">
                        <div class="row dialog_separator">-->
                          <!-- <div v-if="edit_child" class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 four_column_left">
                            <div class="row">
                              <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                                <Input
                                :autofocusclick="true"
                                :no_label="false"
                                label="Bulk Qty"
                                :readonly="true"
                                v-on:change="handleChange"
                                v-model="jsonChild.BulkQty"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right_readonly : oridbComponentBehavior.text" />
                              </div>
                              <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 q-pl-sm">
                                <span style="font-size: 13px;">x 1</span>
                              </div>
                            </div>
                          </div> -->
 <!--
                          <div class="col-xs-6 col-sm-2 col-md-6 col-lg-6 col-xl-6 four_column_left" :class="!edit_child ? 'two_column_left' : ''">
                            <div class="row">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <Input
                                :autofocusclick="true"
                                :no_label="false"
                                label="Qty"
                                :readonly="json.BillStatus ==1"
                                v-on:change="handleChangeQty"
                                v-model="jsonChild.SetQty"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                              </div>
                            </div>
                          </div>

                          <div class="col-xs-6 col-sm-4 col-md-6 col-lg-6 col-xl-6" :class="!edit_child ? 'two_column_left': ''">
                            <div class="row">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <Input
                                :autofocusclick="true"
                                :no_label="false"
                                label="Unit Price"
                                :readonly="json.BillStatus ==1 ? true : jsonChild.PriceType=='FOC' ? true :  unit ? false : true"
                                v-on:change="handleChangeUnitPrice"
                                v-model="jsonChild.UnitPrice"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right_readonly : oridbComponentBehavior.text" />
                              </div>
                            </div>
                          </div>

                          <div class="col-xs-6 col-sm-3 col-md-3 col-lg-3 col-xl-3 four_column_left two_column_left">
                            <div class="row dialog_separator">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <Select
                                dir="rtl"
                                :readonly="json.BillStatus ==1 ? true : jsonChild.PriceType=='FOC' ? true :  unit ? false : true"
                                :no_label="false"
                                v-model="jsonChild.Disc1Type"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.disc1type : oridbComponentBehavior.select"
                                :options="disctype_options"
                                v-on:receiveChange="handleChangeDiscType"
                                />
                              </div>
                            </div>
                          </div>

                          <div class="col-xs-6 col-sm-3 col-md-3 col-lg-3 col-xl-3 four_column_left" :class="$q.screen.width >599 ? 'two_column_left' : ''">
                            <div class="row dialog_separator">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <Input
                                :autofocusclick="true"
                                :no_label="false"
                                label="Disc1Value"
                                :readonly="json.BillStatus ==1 ? true : jsonChild.PriceType=='FOC' ? true :  unit ? false : true"
                                v-on:change="handleChangeDisc1Value"
                                v-model="jsonChild.Disc1Value"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                              </div>
                            </div>
                          </div>

                          <div class="col-xs-6 col-sm-3 col-md-3 col-lg-3 col-xl-3 four_column_left two_column_left">
                            <div class="row dialog_separator">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <Select
                                dir="rtl"
                                :readonly="json.BillStatus ==1 ? true : jsonChild.PriceType=='FOC' ? true :  unit ? false : true"
                                :no_label="false"
                                v-model="jsonChild.Disc2Type"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.disc2type : oridbComponentBehavior.select"
                                :options="disctype_options"
                                v-on:receiveChange="handleChangeDiscType"
                                />
                              </div>
                            </div>
                          </div>

                          <div class="col-xs-6 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                            <div class="row dialog_separator">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <Input
                                :autofocusclick="true"
                                :no_label="false"
                                label="Disc2Value"
                                :readonly="json.BillStatus ==1 ? true : jsonChild.PriceType=='FOC' ? true :  unit ? false : true"
                                v-on:change="handleChangeDisc2Value"
                                v-model="jsonChild.Disc2Value"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                              </div>
                            </div>
                          </div>

                          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 four_column_left two_column_left">
                            <div class="row dialog_separator">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <Input
                                :autofocusclick="true"
                                :no_label="false"
                                label="Net Price"
                                :readonly="true"
                                v-on:change="handleChange"
                                v-model="jsonChild.NetUnitPrice"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                              </div>
                            </div>
                          </div>

                          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                            <div class="row dialog_separator">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <Input
                                :autofocusclick="true"
                                :no_label="false"
                                label="Total before Tax"
                                :readonly="json.BillStatus ==1 ? true : jsonChild.PriceType=='FOC' ? true :  unit"
                                v-on:change="handleChangeTotalPrice"
                                v-model="jsonChild.TotalPrice"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                              </div>
                            </div>
                          </div>

                          <div v-if="edit_child" class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 four_column_left two_column_left">
                            <div class="row dialog_separator">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <Input
                                :autofocusclick="true"
                                :no_label="false"
                                label="Rebate Amount"
                                :readonly="json.BillStatus ==1"
                                v-on:change="handleChangeRebateValue"
                                v-model="jsonChild.rebate_value"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                              </div>
                            </div>
                          </div>

                          <div v-if="edit_child" class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                            <div class="row dialog_separator">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <Input
                                :autofocusclick="true"
                                :no_label="false"
                                label="Future Price"
                                :readonly="true"
                                v-on:change="handleChange"
                                v-model="jsonChild.price_future"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="upload_separator_second">
                      <span class="text-subtitle1">Invoice</span>

                      <div class="row dialog_separator">
                        <div class="col-xs-6 col-sm-2 col-md-2 col-lg-2 col-xl-2 four_column_left two_column_left">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Qty"
                              :readonly="json.BillStatus ==1"
                              v-on:change="handleChangeInvQty"
                              v-model="jsonChild.Inv_Qty"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-2 col-md-2 col-lg-2 col-xl-2 four_column_left" :class="$q.screen.width > 599 ? 'two_column_left': ''">
                          <div class="row" >
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Unit Price"
                              :readonly="json.BillStatus ==1 ? true : unit ? false : true"
                              v-on:change="handleChangeInvUnitPrice"
                              v-model="jsonChild.Inv_UnitPrice"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right_readonly : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-2 col-md-2 col-lg-2 col-xl-2 four_column_left two_column_left">
                          <div class="row" :class="$q.screen.width<599 ? 'dialog_separator' : ''">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Select
                              dir="rtl"
                              :readonly="json.BillStatus ==1 ? true : unit ? false : true"
                              :no_label="false"
                              v-model="jsonChild.Inv_Disc1Type"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.disc1type : oridbComponentBehavior.select"
                              :options="disctype_options"
                              v-on:receiveChange="handleChangeInvDiscType"
                              />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-2 col-md-2 col-lg-2 col-xl-2 four_column_left" :class="$q.screen.width >599 ? 'two_column_left' : ''">
                          <div class="row" :class="$q.screen.width<599 ? 'dialog_separator' : ''">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Disc1Value"
                              :readonly="json.BillStatus ==1 ? true : unit ? false : true"
                              v-on:change="handleChangeInvDisc1Value"
                              v-model="jsonChild.Inv_Disc1Value"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-2 col-md-2 col-lg-2 col-xl-2 four_column_left two_column_left">
                          <div class="row" :class="$q.screen.width<599 ? 'dialog_separator': ''">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Select
                              dir="rtl"
                              :readonly="json.BillStatus ==1 ? true : unit ? false : true"
                              :no_label="false"
                              v-model="jsonChild.Inv_Disc2Type"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.disc2type : oridbComponentBehavior.select"
                              :options="disctype_options"
                              v-on:receiveChange="handleChangeInvDiscType"
                              />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                          <div class="row" :class="$q.screen.width<599 ? 'dialog_separator': ''">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Disc2Value"
                              :readonly="json.BillStatus ==1 ? true : unit ? false : true"
                              v-on:change="handleChangeInvDisc2Value"
                              v-model="jsonChild.Inv_Disc2Value"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="row dialog_separator">
                        <div class="col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 four_column_left two_column_left">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Net Price"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="jsonChild.Inv_NetUnitPrice"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 four_column_left">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Total before Tax"
                              :readonly="json.BillStatus ==1 || unit"
                              v-on:change="handleChangeTotalPrice"
                              v-model="jsonChild.Inv_TotalPrice"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> -->

              <!-- DESIGN 2 -->
              <!-- DESIGN 2 -->
              <!-- <div v-if="$q.screen.width > 1023" class="row input_wrapper_right">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <div class="row dialog_separator">
                    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" :class="$q.screen.width > 1023 ? 'q-pl-sm': ''">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
                          <div class="row">
                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                              <span class="dialog_font">Entry Type</span>
                            </div>
                            <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                              <Radio size="xs" :disable="json.BillStatus ==1" v-on:receiveChange="handleChangeEntryType" v-model="jsonChild.EntryType" :options="entry_type_options"  />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6"></div>

                    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" :class="$q.screen.width > 1023 ? 'q-pl-sm': ''">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
                          <div class="row">
                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                              <span class="dialog_font">Pricing Type</span>
                            </div>
                            <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                              <Radio size="xs" :disable="json.BillStatus ==1" v-on:receiveChange="handleChangePriceType" v-model="jsonChild.PriceType" :options="pricing_type_options"  />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"></div>

                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                      <div class="row">
                        <div class="col-xs-6 col-sm-6 col-md-12 col-lg-12 col-xl-12 four_column_left two_column_left">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
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

                        <div class="col-xs-6 col-sm-6 col-md-12 col-lg-12 col-xl-12 four_column_left">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
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

                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 four_column_left two_column_left">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
                              <div class="row">
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">

                                  <Select
                                  :readonly="json.BillStatus ==1"
                                  :no_label="false"
                                  v-model="jsonChild.barcode"
                                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.barcode : oridbComponentBehavior.select"
                                  :options="barcode_options"
                                  v-on:receiveChange="handleChange"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div v-if="edit_child" class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 four_column_left">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
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

                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 four_column_left two_column_left">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
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

                        <div v-if="edit_child" class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 four_column_left">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
                              <div class="row">
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                  <Input
                                  :autofocusclick="true"
                                  :no_label="false"
                                  label="Invoice vs Actual Variance"
                                  :readonly="true"
                                  v-on:change="handleChange"
                                  v-model="jsonChild.inv_gr_variance"
                                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right_readonly : oridbComponentBehavior.text" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                      <div class="row">
                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6" style="padding-right: 1%; border-right: 1px solid #ededed;">
                          <div class="row dialog_separator">
                            <div class="text-body2 col-md-12 col-lg-12 col-xl-12" style="height: 33px;">
                              <div class="row items-center justify-center full-width full-height">
                                Actual Receive
                              </div>
                            </div>



                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 four_column_left">
                              <div class="row">
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                  <Input
                                  :autofocusclick="true"
                                  :no_label="false"
                                  label="Qty"
                                  :readonly="json.BillStatus ==1"
                                  v-on:change="handleChangeQty"
                                  v-model="jsonChild.SetQty"
                                  :dbComponentBehavior="dbComponentBehavior ? (status==1? dbComponentBehavior.text_right_readonly : dbComponentBehavior.text_right) : oridbComponentBehavior.text" />
                                </div>
                              </div>
                            </div>

                            <div class="col-xs-6 col-sm-4 col-md-6 col-lg-6 col-xl-6">
                              <div class="row">
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                  <Input
                                  :autofocusclick="true"
                                  :no_label="false"
                                  label="Unit Price"
                                  :readonly="json.BillStatus ==1 ? true : jsonChild.PriceType=='FOC' ? true :  unit ? false : true"
                                  v-on:change="handleChangeUnitPrice"
                                  v-model="jsonChild.UnitPrice"
                                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right_readonly : oridbComponentBehavior.text" />
                                </div>
                              </div>
                            </div>

                            <div class="col-xs-6 col-sm-3 col-md-6 col-lg-6 col-xl-6 four_column_left">
                              <div class="row dialog_separator">
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                  <Select
                                  dir="rtl"
                                  :readonly="json.BillStatus ==1 ? true : jsonChild.PriceType=='FOC' ? true :  unit ? false : true"
                                  :no_label="false"
                                  v-model="jsonChild.Disc1Type"
                                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.disc1type : oridbComponentBehavior.select"
                                  :options="disctype_options"
                                  v-on:receiveChange="handleChangeDiscType"
                                  />
                                </div>
                              </div>
                            </div>

                            <div class="col-xs-6 col-sm-3 col-md-6 col-lg-6 col-xl-6">
                              <div class="row dialog_separator">
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                  <Input
                                  :autofocusclick="true"
                                  :no_label="false"
                                  label="Disc1Value"
                                  :readonly="json.BillStatus ==1 ? true : jsonChild.PriceType=='FOC' ? true :  unit ? false : true"
                                  v-on:change="handleChangeDisc1Value"
                                  v-model="jsonChild.Disc1Value"
                                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                                </div>
                              </div>
                            </div>

                            <div class="col-xs-6 col-sm-3 col-md-6 col-lg-6 col-xl-6 four_column_left">
                              <div class="row dialog_separator">
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                  <Select
                                  dir="rtl"
                                  :readonly="json.BillStatus ==1 ? true : jsonChild.PriceType=='FOC' ? true :  unit ? false : true"
                                  :no_label="false"
                                  v-model="jsonChild.Disc2Type"
                                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.disc2type : oridbComponentBehavior.select"
                                  :options="disctype_options"
                                  v-on:receiveChange="handleChangeDiscType"
                                  />
                                </div>
                              </div>
                            </div>

                            <div class="col-xs-6 col-sm-3 col-md-6 col-lg-6 col-xl-6">
                              <div class="row dialog_separator">
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                  <Input
                                  :autofocusclick="true"
                                  :no_label="false"
                                  label="Disc2Value"
                                  :readonly="json.BillStatus ==1 ? true : jsonChild.PriceType=='FOC' ? true :  unit ? false : true"
                                  v-on:change="handleChangeDisc2Value"
                                  v-model="jsonChild.Disc2Value"
                                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                                </div>
                              </div>
                            </div>

                            <div class="col-xs-6 col-sm-6 col-md-12 col-lg-12 col-xl-12">
                              <div class="row dialog_separator">
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                  <Input
                                  :autofocusclick="true"
                                  :no_label="false"
                                  label="Net Price"
                                  :readonly="true"
                                  v-on:change="handleChange"
                                  v-model="jsonChild.NetUnitPrice"
                                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                                </div>
                              </div>
                            </div>

                            <div class="col-xs-6 col-sm-6 col-md-12 col-lg-12 col-xl-12">
                              <div class="row dialog_separator">
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                  <Input
                                  :autofocusclick="true"
                                  :no_label="false"
                                  label="Total before Tax"
                                  :readonly="json.BillStatus ==1 ? true : jsonChild.PriceType=='FOC' ? true :  unit"
                                  v-on:change="handleChangeTotalPrice"
                                  v-model="jsonChild.TotalPrice"
                                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6" style="padding-left: 1%;">
                          <div class="row dialog_separator">
                            <div class="text-body2 col-md-12 col-lg-12 col-xl-12" style="height: 33px;">
                              <div class="row items-center justify-center full-width full-height">
                                Invoice
                              </div>
                            </div>

                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 four_column_left">
                              <div class="row">
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                  <Input
                                  :autofocusclick="true"
                                  :no_label="false"
                                  label="Qty"
                                  :readonly="json.BillStatus ==1"
                                  v-on:change="handleChangeInvQty"
                                  v-model="jsonChild.Inv_Qty"
                                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                                </div>
                              </div>
                            </div>

                            <div class="col-xs-6 col-sm-4 col-md-6 col-lg-6 col-xl-6">
                              <div class="row">
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                  <Input
                                  :autofocusclick="true"
                                  :no_label="false"
                                  label="Unit Price"
                                  :readonly="json.BillStatus ==1 ? true : unit ? false : true"
                                  v-on:change="handleChangeInvUnitPrice"
                                  v-model="jsonChild.Inv_UnitPrice"
                                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right_readonly : oridbComponentBehavior.text" />
                                </div>
                              </div>
                            </div>

                            <div class="col-xs-6 col-sm-3 col-md-6 col-lg-6 col-xl-6 four_column_left">
                              <div class="row dialog_separator">
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                  <Select
                                  dir="rtl"
                                  :readonly="json.BillStatus ==1 ? true : unit ? false : true"
                                  :no_label="false"
                                  v-model="jsonChild.Inv_Disc1Type"
                                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.disc1type : oridbComponentBehavior.select"
                                  :options="disctype_options"
                                  v-on:receiveChange="handleChangeInvDiscType"
                                  />
                                </div>
                              </div>
                            </div>

                            <div class="col-xs-6 col-sm-3 col-md-6 col-lg-6 col-xl-6">
                              <div class="row dialog_separator">
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                  <Input
                                  :autofocusclick="true"
                                  :no_label="false"
                                  label="Disc1Value"
                                  :readonly="json.BillStatus ==1 ? true : unit ? false : true"
                                  v-on:change="handleChangeInvDisc1Value"
                                  v-model="jsonChild.Inv_Disc1Value"
                                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                                </div>
                              </div>
                            </div>

                            <div class="col-xs-6 col-sm-3 col-md-6 col-lg-6 col-xl-6 four_column_left">
                              <div class="row dialog_separator">
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                  <Select
                                  dir="rtl"
                                  :readonly="json.BillStatus ==1 ? true : unit ? false : true"
                                  :no_label="false"
                                  v-model="jsonChild.Inv_Disc2Type"
                                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.disc2type : oridbComponentBehavior.select"
                                  :options="disctype_options"
                                  v-on:receiveChange="handleChangeInvDiscType"
                                  />
                                </div>
                              </div>
                            </div>

                            <div class="col-xs-6 col-sm-3 col-md-6 col-lg-6 col-xl-6">
                              <div class="row dialog_separator">
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                  <Input
                                  :autofocusclick="true"
                                  :no_label="false"
                                  label="Disc2Value"
                                  :readonly="json.BillStatus ==1 ? true : unit ? false : true"
                                  v-on:change="handleChangeInvDisc2Value"
                                  v-model="jsonChild.Inv_Disc2Value"
                                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                                </div>
                              </div>
                            </div>

                            <div class="col-xs-6 col-sm-6 col-md-12 col-lg-12 col-xl-12">
                              <div class="row dialog_separator">
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                  <Input
                                  :autofocusclick="true"
                                  :no_label="false"
                                  label="Net Price"
                                  :readonly="true"
                                  v-on:change="handleChange"
                                  v-model="jsonChild.Inv_NetUnitPrice"
                                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                                </div>
                              </div>
                            </div>

                            <div class="col-xs-6 col-sm-6 col-md-12 col-lg-12 col-xl-12">
                              <div class="row dialog_separator">
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                  <Input
                                  :autofocusclick="true"
                                  :no_label="false"
                                  label="Total before Tax"
                                  :readonly="json.BillStatus ==1 ? true : unit"
                                  v-on:change="handleChangeTotalPrice"
                                  v-model="jsonChild.Inv_TotalPrice"
                                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div v-if="edit_child" class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 four_column_left">
                          <div class="row dialog_separator">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Rebate Amount"
                              :readonly="json.BillStatus ==1"
                              v-on:change="handleChangeRebateValue"
                              v-model="jsonChild.rebate_value"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div v-if="edit_child" class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <div class="row dialog_separator">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Future Price"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="jsonChild.price_future"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> -->

              <!-- DESIGN 3 -->
              <!-- DESIGN 3 -->
              <div v-if="$q.screen.width > 1023" class="row input_wrapper_right" >
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <div class="row po_details_separator po_details_custom">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" :class="$q.screen.width > 1023 ? 'q-pl-xs': ''">
                      <div class="row po_details_custom_row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
                          <div class="row">
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                              <span class="dialog_radio_title">Entry Type</span>
                            </div>
                            <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                              <Radio size="md" :disable="json.BillStatus ==1" v-on:receiveChange="handleChangeEntryType" v-model="jsonChild.EntryType" :options="entry_type_options" class="dialog_radio_options" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6"></div> -->
<!-- radio pricing type -->
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" :class="$q.screen.width > 1023 ? 'q-pl-xs': ''">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
                          <div class="row">
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                              <span class="dialog_radio_title">Pricing Type</span>
                            </div>
                            <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                              <Radio size="md" :disable="json.BillStatus ==1" v-on:receiveChange="handleChangePriceType" v-model="jsonChild.PriceType" :options="pricing_type_options" class="dialog_radio_options" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"></div> -->
                    <q-separator class="separator-style"></q-separator>
                    <div class="po_details_custom row">
                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <div class="row po_details_custom_row">

  <!--Item Code & Description  -->
                          <div class="col-12 row">
  <!-- item code -->
                          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-md">
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
  <!-- Descriptions -->                       
                          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-md">
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
  <!-- barcode & Pack size -->
                          <div class="col-12 row">
  <!-- Barcode -->
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-md">
                              <div class="row">
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
                                  <div class="row">
                                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                      <!-- <Input
                                      v-if="edit_child"
                                      :autofocusclick="true"
                                      :no_label="false"
                                      label="Barcode"
                                      :readonly="json.BillStatus ==1"
                                      v-on:change="handleChange"
                                      v-model="jsonChild.barcode"
                                      :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" /> -->
                                      <Select
                                      :readonly="json.BillStatus ==1"
                                      :no_label="false"
                                      v-model="jsonChild.barcode"
                                      :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.barcode : oridbComponentBehavior.select"
                                      :options="barcode_options"
                                      v-on:receiveChange="handleChange"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
  <!-- pack size -->
                            <div v-if="edit_child" class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-md">
                              <div class="row">
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
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
  <!-- article no & Invoice vs Actual Variance -->
                          <div class="row col-12">
  <!-- Article no -->
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-md">
                              <div class="row">
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
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
  <!-- Invoice vs Actual Variance -->
                            <div v-if="edit_child" class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-md">
                            <div class="row">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
                                <div class="row">
                                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <Input
                                    :autofocusclick="true"
                                    :no_label="false"
                                    label="Invoice vs Actual Variance"
                                    :readonly="true"
                                    v-on:change="handleChange"
                                    v-model="jsonChild.inv_gr_variance"
                                    :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right_readonly : oridbComponentBehavior.text" />
                                  </div>
                                </div>
                              </div>
                            </div>
                            </div>
                          </div>
                        </div>
                      </div>
  <!-- Actual Receive -->
  <q-separator class="separator-style"></q-separator>
                      <div class="po_details_custom row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <div class="row po_details_custom_row">
                            <div class="left_section_font col-md-12 col-lg-12 col-xl-12" style="height: 33px;">
                              <div class="row items-center justify-center full-width full-height">
                                Actual Receive
                              </div>
                            </div>

                            <!-- <div v-if="edit_child" class="col-xs-6 col-sm-6 col-md-8 col-lg-8 col-xl-8">
                              <div class="row">
                                <div class="col-xs-9 col-sm-9 col-md-8 col-lg-8 col-xl-8">
                                  <Input
                                  :autofocusclick="true"
                                  :no_label="false"
                                  label="Bulk Qty"
                                  :readonly="true"
                                  v-on:change="handleChange"
                                  v-model="jsonChild.BulkQty"
                                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right_readonly : oridbComponentBehavior.text" />
                                </div>
                                <div class="col-xs-3 col-sm-3 col-md-4 col-lg-4 col-xl-4 q-pl-xs">
                                  <span style="font-size: 13px;">x 1</span>
                                </div>
                              </div>
                            </div> -->
                            
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <div class="row">
                                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-md">
                                    <Input
                                    :autofocusclick="true"
                                    :no_label="false"
                                    label="Qty"
                                    :readonly="json.BillStatus ==1"
                                    v-on:change="handleChangeQty"
                                    v-model="jsonChild.SetQty"
                                    :dbComponentBehavior="dbComponentBehavior ? (status==1? dbComponentBehavior.text_right_readonly : dbComponentBehavior.text_right) : oridbComponentBehavior.text" />
                                  </div>
                                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-md q-pr-md">
                                    <Input
                                    :autofocusclick="true"
                                    :no_label="false"
                                    label="Unit Price"
                                    :readonly="json.BillStatus ==1 ? true : jsonChild.PriceType=='FOC' ? true :  unit ? false : true"
                                    v-on:change="handleChangeUnitPrice"
                                    v-model="jsonChild.UnitPrice"
                                    :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right_readonly : oridbComponentBehavior.text" />
                                  </div>
                                </div>
                              </div>
                              <div class="row col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                                <div class="row col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                  <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 q-pr-md">
                                    <Select
                                    dir="ltr"
                                    :readonly="json.BillStatus ==1 ? true : jsonChild.PriceType=='FOC' ? true :  unit ? false : true"
                                    :no_label="false"
                                    v-model="jsonChild.Disc1Type"
                                    :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.disc1type : oridbComponentBehavior.select"
                                    :options="disctype_options"
                                    v-on:receiveChange="handleChangeDiscType"
                                    />
                                  </div>
                                
                                  <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 q-pr-md">
                                    <Input
                                    :autofocusclick="true"
                                    :no_label="false"
                                    label="Disc1Value"
                                    :readonly="json.BillStatus ==1 || jsonChild.PriceType=='FOC' ? true :  unit ? false : true"
                                    v-on:change="handleChangeDisc1Value"
                                    v-model="jsonChild.Disc1Value"
                                    :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                                  </div>
                                  </div>
                                  <div class="row col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                  <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 q-pl-md">
                                    <Select
                                    dir="ltr"
                                    :readonly="json.BillStatus ==1 ? true : jsonChild.PriceType=='FOC' ? true :  unit ? false : true"
                                    :no_label="false"
                                    v-model="jsonChild.Disc2Type"
                                    :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.disc2type : oridbComponentBehavior.select"
                                    :options="disctype_options"
                                    v-on:receiveChange="handleChangeDiscType"
                                    />
                                  </div>
                                  <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 q-pl-md q-pr-md">
                                    <Input
                                    :autofocusclick="true"
                                    :no_label="false"
                                    label="Disc2Value"
                                    :readonly="json.BillStatus ==1 ? true : jsonChild.PriceType=='FOC' ? true :  unit ? false : true"
                                    v-on:change="handleChangeDisc2Value"
                                    v-model="jsonChild.Disc2Value"
                                    :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                                  </div>
                                </div>
                              </div>
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                                <div class="row">
                                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-md">
                                    <Input
                                    :autofocusclick="true"
                                    :no_label="false"
                                    label="Net Price"
                                    :readonly="true"
                                    v-on:change="handleChange"
                                    v-model="jsonChild.NetUnitPrice"
                                    :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                                  </div>
                                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-md q-pr-md">
                                    <Input
                                    :autofocusclick="true"
                                    :no_label="false"
                                    label="Total before Tax"
                                    :readonly="json.BillStatus ==1 ? true : jsonChild.PriceType=='FOC' ? true :  unit"
                                    v-on:change="handleChangeTotalPrice"
                                    v-model="jsonChild.TotalPrice"
                                    :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                                  </div>
                                </div>
                              </div>
                          </div>
                        </div>
  <q-separator class="separator-style"></q-separator>
    <!-- Invoice -->    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <div class="row po_details_custom_row">
                            <div class="left_section_font col-md-12 col-lg-12 col-xl-12" style="height: 33px;">
                              <div class="row items-center justify-center full-width full-height">
                                Invoice
                              </div>
                            </div>
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                                  <div class="row">
                                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-md">
                                      <Input
                                      :autofocusclick="true"
                                      :no_label="false"
                                      label="Qty"
                                      :readonly="json.BillStatus ==1"
                                      v-on:change="handleChangeInvQty"
                                      v-model="jsonChild.Inv_Qty"
                                      :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                                    </div>
                                
                                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-md">
                                      <Input
                                      :autofocusclick="true"
                                      :no_label="false"
                                      label="Unit Price"
                                      :readonly="json.BillStatus ==1 ? true : unit ? false : true"
                                      v-on:change="handleChangeInvUnitPrice"
                                      v-model="jsonChild.Inv_UnitPrice"
                                      :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right_readonly : oridbComponentBehavior.text" />
                                    </div>
                                  </div>
                                </div>
                                
                                <div class="row col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                  <div class="row col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 q-pr-md">
                                      <Select
                                      dir="ltr"
                                      :readonly="json.BillStatus ==1 ? true : unit ? false : true"
                                      :no_label="false"
                                      v-model="jsonChild.Inv_Disc1Type"
                                      :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.disc1type : oridbComponentBehavior.select"
                                      :options="disctype_options"
                                      v-on:receiveChange="handleChangeInvDiscType"
                                      />
                                    </div>
                                  
                                    <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 q-pr-md">
                                      <Input
                                      :autofocusclick="true"
                                      :no_label="false"
                                      label="Disc1Value"
                                      :readonly="json.BillStatus ==1 ? true : unit ? false : true"
                                      v-on:change="handleChangeInvDisc1Value"
                                      v-model="jsonChild.Inv_Disc1Value"
                                      :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                                    </div>
                                  </div>
                                  <div class="row col col-xs-6 col-sm-3 col-md-6 col-lg-6 col-xl-6">
                                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 q-pl-md">
                                      <Select
                                      dir="ltr"
                                      :readonly="json.BillStatus ==1 ? true : unit ? false : true"
                                      :no_label="false"
                                      v-model="jsonChild.Inv_Disc2Type"
                                      :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.disc2type : oridbComponentBehavior.select"
                                      :options="disctype_options"
                                      v-on:receiveChange="handleChangeInvDiscType"
                                      />
                                    </div>
                                  
                                    <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 q-pl-md">
                                      <Input
                                      :autofocusclick="true"
                                      :no_label="false"
                                      label="Disc2Value"
                                      :readonly="json.BillStatus ==1 ? true : unit ? false : true"
                                      v-on:change="handleChangeInvDisc2Value"
                                      v-model="jsonChild.Inv_Disc2Value"
                                      :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                                    </div>
                                  </div>
                                </div>
                                
                                
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                  <div class="row">
                                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-md">
                                      <Input
                                      :autofocusclick="true"
                                      :no_label="false"
                                      label="Net Price"
                                      :readonly="true"
                                      v-on:change="handleChange"
                                      v-model="jsonChild.Inv_NetUnitPrice"
                                      :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                                    </div>
                                  
                                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-md">
                                      <Input
                                      :autofocusclick="true"
                                      :no_label="false"
                                      label="Total before Tax"
                                      :readonly="json.BillStatus ==1 ? true : unit"
                                      v-on:change="handleChangeTotalPrice"
                                      v-model="jsonChild.Inv_TotalPrice"
                                      :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                                    </div>
                                  </div>
                                </div>
                          </div>
                        </div>
                      </div>
                        
  
  <!-- last row -->
  <q-separator class="separator-style"></q-separator>
                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <div class="row po_details_custom_row">
                          <div v-if="edit_child" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <div class="row">
                              <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-md">
                                <Input
                                :autofocusclick="true"
                                :no_label="false"
                                label="Rebate Amount"
                                :readonly="json.BillStatus ==1"
                                v-on:change="handleChangeRebateValue"
                                v-model="jsonChild.rebate_value"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                              </div>
                              <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-md">
                                <Input
                                :autofocusclick="true"
                                :no_label="false"
                                label="Future Price"
                                :readonly="true"
                                v-on:change="handleChange"
                                v-model="jsonChild.price_future"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
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

      <q-card-actions v-if="json.BillStatus == 0" class="dialog_action" style="padding-right: 16px;padding-bottom:16px">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" align="right">
            <Button_icon v-if="!edit_child" :readonly="false" :flat="true" :font_color="'white'" :color="'#1E90FF'" :text="'ADD'" :outline="false" size="16px"
            v-on:receiveClick="handleChild('save&add')" class="primary_actions_button"/>

            <span class="q-pl-md" />

            <Button_icon :readonly="false" :flat="true" :font_color="'white'" :color="'#1E90FF'" :text="'SAVE'" :outline="false" size="16px"
            v-on:receiveClick="handleChild('save')" class="primary_actions_button q-pb-md"/>
          </div>
      </q-card-actions>
                                              
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
<!-- aaa -->
  <q-dialog v-model="receiving_methods" persistent :position="$q.screen.width > 599 ? 'top' : 'bottom'">
    <q-card style="text-align:left;margin-top: 5%; height:180px">
      <q-card-section class="header_top_mobile">
        <!-- <Button_icon :disable="showAddLoading" :big_round="true" :flat="true" :font_color="'#928f8f'" :color="'rgba(255, 255, 255, 0.5)'" :icon="'arrow_back_ios'" :outline="true" size="12px" class="custom_back_button" @click="back()" /> -->
      <div class="text-right">
        <q-btn icon="close" flat round dense v-close-popup :disable="showAddLoading || showAddLoading2"/>
      </div>

      </q-card-section>

      <q-card-section class="q-pt-none card_sides">
        <div  v-if="json.BillStatus == 0" class="row q-pt-xs q-pl-md q-pr-md" style="gap:10px; ">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" @click="handleItemClick('RTV')">
          <div class="row justify-center items-center" style="width: 100%; height: 60px;">
            <div class="q-pr-sm">
              <Button_icon :flat="false" :icon="'add'" v-on:receiveClick="handleItemClick('RTV')" :font_color="'white'" :color="'primary'" :outline="false" size="16px"
              :text="'RTV - Return to Vendor'" class="dialog_detail_add_button"/><!--   RTV - Return to Vendor $language('D0241') -->
            </div>
            <!-- <div>
              {{ $language('D0152') }}
              
            </div> -->
          </div>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" @click="handleItemClick('VFOC')" > <!--style="border-left: 1px solid #cecaca; cursor: pointer" -->
          <div class="row justify-center items-center" style="width: 100%; height: 60px;">
            <div class="q-pr-sm">
              <Button_icon :flat="false" :icon="'add'" v-on:receiveClick="handleItemClick('VFOC')" :font_color="'white'" :color="'primary'" :outline="false" size="16px"
              :text="'Vendor FOC Item without PO'" class="dialog_detail_add_button"/><!--  Supplier Item List  $language('D0242')-->
            </div>
            <!-- <div>
              {{ $language('D0153') }}
              
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

  <q-dialog v-model="view_summary" persistent :position="$q.screen.width > 599 ? 'top' : 'bottom'">
    <ViewSummaryDialog 
      :page_function="page_function" 
      :json="json"
    />

  </q-dialog>

  <q-dialog v-model="edit_surcharge" persistent :position="$q.screen.width > 599 ? 'top' : 'bottom'">
    <q-card style="text-align:left;margin-top: 5%;">
      <q-card-section class="row header_top_mobile">
        <div class="mobile_dialog_delete_btn" @click="handleDelete(jsonChild)">
          {{ $language('D0156') }}
          <!-- Delete -->
          <!-- <Button_icon :disabled="readonly_delete" :icon="'delete'" :color="'negative'" :outline="false" size="12px" v-on:click="handleDelete(jsonChild)" class="q-mr-sm" /> -->
        </div>

        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center">
          <div class="text-subtitle1 header_text" style="margin-top: 5px;">Edit Surcharge / Discount</div>
        </div>
        <div class="custom_close_button">
          <q-btn icon="close" flat round dense v-close-popup :disable="false"/>
        </div>
      </q-card-section>



      <q-card-section class="q-pt-md upload_container">
        <q-form ref="save_edit_surcharge_form">
          <div class="row upload_separator_first">
            <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
              <div class="row">
                            <div class="col-xs-4 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Shared</span>
                            </div>
                            <div class="col-xs-8 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Checkbox
                                size="xs"
                                :disable="false"
                                :no_label="true"
                                v-model="surchargeChild.shared"
                                :dbComponentBehavior="dbComponentBehavior.text"
                                v-on:receiveChangenewVal="receiveChangetdCheckbox"
                                :table="true"
                                :true-value="1"
                                :false-value="0"
                                />
                            </div>
               </div>
             </div>
             <div class="q-pt-sm col-xs-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
              <div class="row">
                            <div class="col-xs-4 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">DN</span>
                            </div>
                            <div class="col-xs-8 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Checkbox
                                size="xs"
                                :disable="false"
                                :no_label="true"
                                v-model="surchargeChild.dn"
                                :dbComponentBehavior="dbComponentBehavior.text"
                                v-on:receiveChangenewVal="receiveChangetdCheckbox"
                                :table="true"
                                :true-value="1"
                                :false-value="0"
                                />
                            </div>
               </div>
             </div>
            <div class="q-pt-sm col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
              <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Code</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="true"
                              :readonly="false"
                              v-on:change="handleChange"
                              v-model="surchargeChild.code"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text" />
                            </div>
               </div>
             </div>
             <div class="q-pt-sm col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
              <div class="row">
                  <div class="col-xs-2 col-sm-4 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                      <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                               <span class="mobile_font">Price Type</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Select
                                :readonly="false"
                                :no_label="true"
                                v-model="surchargeChild.type"
                                :dbComponentBehavior="dbComponentBehavior.text"
                                :options="optionsPriceType"
                                v-on:receiveChange="handleChangetdSelect"
                              />
                            </div>
                      </div>
                  </div>
                  <div class="col-xs-10 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                      <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                               <span class="mobile_font">Value</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="true"
                              :readonly="false"
                              v-on:change="handleChange"
                              v-model="surchargeChild.value"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                            </div>
                      </div>
                  </div>
               </div>
             </div>
             <div class="q-pt-sm col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
              <div class="row">
                  <div class="col-xs-6 col-sm-4 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                      <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                               <span class="mobile_font">Calculated</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="true"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="surchargeChild.calculated"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                            </div>
                      </div>
                  </div>
                  <div class="col-xs-6 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                      <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                               <span class="mobile_font">Value After</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="true"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="surchargeChild.value_after"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                            </div>
                      </div>
                  </div>
               </div>
             </div>
           </div>

        </q-form>
      </q-card-section>

      <q-card-actions class="dialog_action" style="padding-left: 20px;">
          <div class="full-width">
            <Button_icon class="full-width" style="height: 30px;" :small_round="true" :text="$language('D0159')"
            :flat="false" :font_color="'white'" :color="'primary'" :outline="false" size="13px" @click="handleChild('save')"/><!--DONE-->
        </div>
      </q-card-actions>
      <q-inner-loading
        :showing="showAddLoading"
        color="primary"
      />
    </q-card>
  </q-dialog>

  <q-dialog v-model="rtv_dialog" persistent :position="$q.screen.width > 599 ? 'top' : 'bottom'">

      <q-card  v-if="$q.screen.width < 600" style="width: 700px; max-width: 98vw; margin-top: 5%; border-radius:8px">
        <q-card-section class="row header_top_mobile">
          <div v-if="json.BillStatus == 0 && this.edit_child" class="mobile_dialog_delete_btn" @click="handleDelete(jsonChild)">
            Delete
            <!-- <Button_icon :disabled="readonly_delete" :icon="'delete'" :color="'negative'" :outline="false" size="12px" v-on:click="handleDelete(jsonChild)" class="q-mr-sm" /> -->
          </div>

          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div v-if="rtv" class="text-subtitle1 mobile_dialog_bottom" style="padding:16px 24px;margin-top: 0px;box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);">RTV - Return to Vendor<br></div>
            <div v-if="vfoc" class="text-subtitle1 mobile_dialog_bottom" style="padding:16px 24px;margin-top: 0px;box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);">Vendor FOC Item without PO<br></div>
          </div>
          <div class="custom_close_button">
            <q-btn icon="close" flat round dense @click="grnChildclose()" :disable="false"/>
          </div>
        </q-card-section>

        <q-card-section class="upload_container">
          <q-form ref="save_edit_pochild_form">
            <div class="row upload_separator_first">
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <div class="row input_wrapper_right q-pb-md">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div class="row " style="gap:16px">
                      <div class="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
                        <div class="row">
                          <div class="" :class="edit_child ? 'col-xs-12' : 'col-xs-10 q-pr-sm'">
                            <div class="row">
                              <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                <span class="mobile_font">{{ $language('D0097') }}</span>
                              </div> -->
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"><!--Item Code-->
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

                          <div v-if="!edit_child" dir="rtl" class="button_upload_wrapper col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2" style="padding-top: 0px;">
                              <Button_icon ref="searchButton" :small_round="true" :flat="false" :font_color="'primary'" :color="'white'" :icon="'search'" :outline="false" size="16px"
                              v-on:receiveClick="showSearchDialog()" style="margin-top: 0px;height:100%" class="search_button primary_button_font"/>
                          </div>
                        </div>
                      </div>

                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <div class="row">
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <div class="row">
                              <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                <span class="mobile_font">Reason</span>
                              </div> -->
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <Select
                                :readonly="json.BillStatus ==1"
                                :no_label="false"
                                label="Reason"
                                v-model="jsonChild.reason"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.barcode : oridbComponentBehavior.select"
                                :options="reason_options"
                                v-on:receiveChange="handleChange"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
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
                                :readonly="json.BillStatus ==1"
                                v-on:change="handleChange"
                                v-model="jsonChild.Description"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    

                    <div v-if='rtv' class="row" style="gap:16px">
                      <div class="row col-12">
                      <div  class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-sm">
                        <div class="row">
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <div class="row">
                              <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                <span class="mobile_font">Qty</span>
                              </div> -->
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                                :autofocusclick="true"
                                :no_label="false"
                                label="Qty"
                                :readonly="json.BillStatus ==1"
                                v-on:change="handleChange"
                                v-model="jsonChild.Inv_Qty"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-sm">
                        <div class="row">
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <div class="row">
                              <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                <span class="mobile_font">Unit Price</span>
                              </div> -->
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <Input
                                :autofocusclick="true"
                                :no_label="false"
                                label="Unit Price"
                                :readonly="json.BillStatus ==1"
                                v-on:change="handleChange"
                                v-model="jsonChild.Inv_UnitPrice"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      </div>
                      <div class="row col-12">
                      <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-sm">
                        <div class="row">
                          <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                            <span class="mobile_font">Disc1Type</span>
                          </div> -->
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <Select
                            dir="ltr"
                            :readonly="json.BillStatus ==1"
                            :no_label="false"
                            label="Disc1Type"
                            v-model="jsonChild.Inv_Disc1Type"
                            :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.disc1type : oridbComponentBehavior.select"
                            :options="disctype_options"
                            v-on:receiveChange="handleChangeDiscType"
                            />
                          </div>
                        </div>
                      </div>

                      <div class="col-xs-6 col-sm-3 col-md-3 col-lg-3 col-xl-3 q-pl-sm">
                        <div class="row">
                          <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                            <span class="mobile_font">Disc1Value</span>
                          </div> -->
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <Input
                            :autofocusclick="true"
                            :no_label="false"
                            label="Disc1Value"
                            :readonly="json.BillStatus ==1"
                            v-on:change="handleChangeDisc1Value"
                            v-model="jsonChild.Inv_Disc1Value"
                            :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                          </div>
                        </div>
                      </div>
                      </div>
                      <div class="row col-12">
                      <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-sm">
                        <div class="row" :class="$q.screen.width<599 ? '': ''">
                          <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                            <span class="mobile_font">Disc2Type</span>
                          </div> -->
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <Select
                            dir="ltr"
                            :readonly="json.BillStatus ==1"
                            label="Disc2Type"
                            :no_label="false"
                            v-model="jsonChild.Inv_Disc2Type"
                            :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.disc2type : oridbComponentBehavior.select"
                            :options="disctype_options"
                            v-on:receiveChange="handleChangeDiscType"
                            />
                          </div>
                        </div>
                      </div>

                      <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-sm">
                        <div class="row" :class="$q.screen.width<599 ? '': ''">
                          <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                            <span class="mobile_font">Disc2Value</span>
                          </div> -->
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <Input
                            :autofocusclick="true"
                            :no_label="false"
                            label="Disc2Value"
                            :readonly="json.BillStatus ==1"
                            v-on:change="handleChangeDisc2Value"
                            v-model="jsonChild.Inv_Disc2Value"
                            :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                          </div>
                        </div>
                      </div>
                      </div>
                      <div class="row col-12">
                      <div class="col-xs-6 col-sm-6 col-md-2 col-lg-2 col-xl-2 q-pr-sm">
                        <div class="row">
                          <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                            <span class="mobile_font">Total Price</span>
                          </div> -->
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <Input
                            :autofocusclick="true"
                            :no_label="false"
                            label="Total Price"
                            :readonly="json.BillStatus ==1"
                            v-on:change="handleChange"
                            v-model="jsonChild.Inv_TotalPrice"
                            :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                          </div>
                        </div>
                      </div>

                      <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6  q-pl-sm">
                        <div class="row">
                          <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                            <span class="mobile_font">Tax Code</span>
                          </div> -->
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <Select
                            :readonly="json.BillStatus ==1"
                            :no_label="false"
                            label="Tax Code"
                            v-model="jsonChild.gst_tax_code"
                            :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.tax_code : oridbComponentBehavior.select"
                            :options="tax_options"
                            v-on:receiveChange="handleChangeDiscType"
                            />
                          </div>
                        </div>
                      </div>
                      </div>

                      <div class="col-xs-6 col-sm-6 col-md-2 col-lg-2 col-xl-2">
                        <div class="row items-center">
                          <div class="" style="padding-top:0.6%">
                            <Checkbox
                                size="xs"
                                :disable="false"
                                :no_label="true"
                                v-model="jsonChild.GroupCost"
                                v-on:receiveChange="handleChange"
                                :dbComponentBehavior="dbComponentBehavior.text"
                                :true-value="1"
                                :false-value="0"
                                />
                            <span class="mobile_edit_checkbox">Group Cost</span>
                          </div>
                          <!-- <div class="col-xs-8 col-sm-8 col-md-12 col-lg-12 col-xl-12" style="padding-top:1.2%">
                              
                          </div> -->
                        </div>
                      </div>
                      </div>

                    
                    <div v-if='vfoc' class="row col-12">
                      <div  class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-sm">
                        <div class="row">
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <div class="row">
                              <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                <span class="mobile_font">Qty</span>
                              </div> -->
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                                :autofocusclick="true"
                                :no_label="false"
                                label="Qty"
                                :readonly="json.BillStatus ==1"
                                v-on:change="handleChange"
                                v-model="jsonChild.SetQty"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>


                      <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-sm">
                        <div class="row items-center" style="padding-top:0%">
                          <div class="" style="padding-top:0.6%">
                            <Checkbox
                                size="xs"
                                :disable="false"
                                :no_label="true"
                                v-model="jsonChild.GroupCost"
                                v-on:receiveChange="handleChange"
                                :dbComponentBehavior="dbComponentBehavior.text"
                                :true-value="1"
                                :false-value="0"
                                />
                            <span class="mobile_edit_checkbox">Group Cost</span>
                          </div>
                          <!-- <div class="col-xs-8 col-sm-8 col-md-12 col-lg-12 col-xl-12" style="padding-top:1.2%">
                              
                          </div> -->
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

        <q-card-actions v-if="json.BillStatus == 0" class="dialog_action" style="padding: 0px 16px 16px 16px;">
          <div class="row full-width">
            <div v-if="!edit_child" class="col-xs-6 q-pr-xs">
              <Button_icon class="full-width dialog_done_button" :small_round="true" :text="'ADD'" :flat="false" :font_color="'white'" :color="'primary'" :outline="false" size="16px" @click="handleGrnChild('save&add')"/>
            </div>
            <div :class="!edit_child ? 'col-xs-6 q-pl-xs': 'full-width'">
              <Button_icon class="full-width dialog_done_button" :small_round="true" :text="'DONE'" :flat="false" :font_color="'white'" :color="'primary'" :outline="false" size="16px" @click="handleGrnChild('save')"/>
            </div>
          </div>
        </q-card-actions>

        <q-inner-loading
          :showing="showAddLoading"
          color="primary"
        />
      </q-card>

<!-- Edit RTV - Return to Vendor -->
      <q-card v-else style="width: 700px; max-width: 98vw; margin-top: 5%;border-radius:8px">
        <q-card-section class=" row theme_color dialog_header" style="padding: 0px;">
            <div v-if="rtv" class="text-subtitle1 header_text" style="margin-top: 15px; height: 56px; padding: 8px 24px;">RTV - Return to Vendor<br></div>
            <div v-if="vfoc" class="text-subtitle1 header_text" style="margin-top: 15px;height:56px;padding:8px 24px;">Vendor FOC Item without PO<br></div>
            <q-space />
            <q-btn icon="close" flat round dense :disable="false"  @click="close_RTV_VFOC_Dialog"/>
        </q-card-section>

        <q-card-section class="upload_container">
          <q-form ref="save_edit_pochild_form">
            <div class="row upload_separator_first">
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <div v-if="$q.screen.width > 599 && $q.screen.width < 1024" class="input_wrapper_right">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div class="row" style="gap:16px">
                      <div class="row col-12">
                          <div :class="edit_child ? 'col-sm-6' : 'col-sm-5 q-pr-md '">
                              <div class="row">
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                  <div class="row">
                                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                      <Input
                                      :autofocusclick="true"
                                      :no_label="false"
                                      :label="$language('D0097')"
                                      :readonly="true"
                                      v-on:change="handleChange"
                                      v-model="jsonChild.Itemcode"
                                      :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text" />
                                    </div><!--Item Code-->
                                  </div>
                                </div>
                              </div>
                          </div>

                          <div v-if="!edit_child" dir="rtl" class="col-xs-2 col-sm-1 col-md-2 col-lg-2 col-xl-2" style="padding-top: 0px;">

                            <Button_icon ref="searchButton" :flat="true" :font_color="primary" :color="'white'" :icon="'search'" :outline="true" size="12px"
                            v-on:receiveClick="showSearchDialog()" :tooltip_message="'Search Item'" class="full-width search_button primary_button_font" style="height:100%"/>
                          </div>

                          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-md">
                                <div class="row">
                                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" >
                                            <Select
                                              :readonly="json.BillStatus == 1"
                                              :no_label="false"
                                              v-model="jsonChild.reason"
                                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.reason : oridbComponentBehavior.select"
                                              :options="reason_options"
                                              v-on:receiveChange="handleChangeType"
                                              />
                                            <!--  <Input
                                              :autofocusclick="true"
                                              :no_label="false"
                                              :label="'Reason'"
                                              :readonly="false"
                                              v-on:change="handleChange"
                                              v-model="jsonChild.Reason"
                                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text" />
                                            -->
                                      </div>
                                </div>
                          </div>
                            </div>
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <div class="row">
                              <div class=" col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                                    <Input
                                    :autofocusclick="true"
                                    :no_label="false"
                                    label="Description"
                                    :readonly="false"
                                    v-on:change="handleChange"
                                    v-model="jsonChild.Description"
                                    :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                              </div>
                            </div>
                          </div>

                          <div v-if='rtv' class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <div class="row">
                              <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-md">
                                    <Input
                                    :autofocusclick="true"
                                    :no_label="false"
                                    label="Qty"
                                    :readonly="false"
                                    v-on:change="handleChange"
                                    v-model="jsonChild.SetQty"
                                    :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                                  </div>
                                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-md">
                                    <Input
                                    :autofocusclick="true"
                                    :no_label="false"
                                    label="Unit Price"
                                    :readonly="false"
                                    v-on:change="handleChange"
                                    v-model="jsonChild.unit_price"
                                    :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                                  </div>
                                </div>
                          </div>
                          <div  v-if="rtv" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <div class="row">
                                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-md">
                                    <div class="row">
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 q-pr-md">
                                          <SelectNoLabel
                                          :readonly="json.BillStatus ==1"
                                          :no_label="true"
                                          v-model="jsonChild.discount1_price_type"
                                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.price_type_select : oridbComponentBehavior.select"
                                          :options="optionsPriceType"
                                          v-on:receiveChange="handleChange" />
                                        </div>
                                        <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                                          <Input
                                          :autofocusclick="true"
                                          :no_label="false"
                                          label="Discount 1"
                                          :readonly="false"
                                          v-on:change="handleChange"
                                          v-model="jsonChild.discount_1"
                                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                                        </div>
                                      </div>
                                  </div>
                                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-md">
                                    <div class="row">
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 q-pr-md">
                                          <SelectNoLabel
                                          :readonly="json.BillStatus ==1"
                                          :no_label="true"
                                          v-model="jsonChild.discount2_price_type"
                                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.price_type_select : oridbComponentBehavior.select"
                                          :options="optionsPriceType"
                                          v-on:receiveChange="handleChange" />
                                        </div>
                                        <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                                          <Input
                                          :autofocusclick="true"
                                          :no_label="false"
                                          label="Discount 2"
                                          :readonly="false"
                                          v-on:change="handleChange"
                                          v-model="jsonChild.discount_2"
                                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                                        </div>
                                      </div>
                                  </div>
                                </div>
                          </div>
                          <div v-if='rtv' class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <div class="row">
                                  <div  class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-md">
                                          <Input
                                              :autofocusclick="true"
                                              :no_label="false"
                                              :label="'Total Price'"
                                              :readonly="false"
                                              v-on:change="handleChange"
                                              v-model="jsonChild.TotalPrice"
                                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                                  </div>
                                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-md">
                                    <Select
                                    :readonly="json.BillStatus ==1"
                                    :no_label="false"
                                    v-model="jsonChild.gst_tax_code"
                                    :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.tax_code : oridbComponentBehavior.select"
                                    :options="tax_options"
                                    v-on:receiveChange="handleChange"
                                    />
                                  </div>
                                </div>
                          </div>

                          <div v-if='rtv' class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6  four_column_left">
                                <div class="row items-center">
                                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" style="padding-top:2px;">
                                    <Checkbox
                                      size="sm"
                                      :disable="false"
                                      :no_label="true"
                                      v-model="jsonChild.GroupCost"
                                      v-on:receiveChange="handleChange"
                                      :dbComponentBehavior="dbComponentBehavior.text"
                                      :true-value="1"
                                      :false-value="0"
                                      />
                                    <span class="checkbox_InterfontMedium">Group Cost</span>
                                  </div>
                                  <!-- <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6" style="padding-top:5px;">
                                    
                                  </div> -->
                                </div>
                          </div>
                          <div v-if='vfoc' class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <div class="row">
                              <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-md">
                                    <Input
                                    :autofocusclick="true"
                                    :no_label="false"
                                    label="Qty"
                                    :readonly="false"
                                    v-on:change="handleChange"
                                    v-model="jsonChild.SetQty"
                                    :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                              </div>
                                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 ">
                                    <div class="row items-center">
                                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" style="padding-top:2px;" >
                                        <Checkbox
                                          size="sm"
                                          :disable="false"
                                          :no_label="true"
                                          v-model="jsonChild.GroupCost"
                                          v-on:receiveChange="handleChange"
                                          :dbComponentBehavior="dbComponentBehavior.text"
                                          :true-value="1"
                                          :false-value="0"
                                          />
                                        <span class="checkbox_InterfontMedium">Group Cost</span>
                                      </div>
                                      <!-- <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6" style="padding-top:5px;">
                                        
                                      </div> -->
                                    </div>
                                  </div>
                                </div>
                          </div>
                        
                      
                    </div>
                  </div>
                </div>

                <div v-if="$q.screen.width > 1023" class="row q-px-sm input_wrapper_right">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div class="row">
                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <div class="row" style="gap:20px">
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <div class="row">
                              <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                <div class="row">
                                    <div :class="edit_child ? 'col-xs-12 col-md-12 col-lg-12 col-xl-12' : 'col-xs-10 col-md-10 col-lg-10 col-xl-10 q-pr-md'">
                                              <Input
                                              :autofocusclick="true"
                                              :no_label="false"
                                              :label="$language('D0097')"
                                              :readonly="true"
                                              v-on:change="handleChange"
                                              v-model="jsonChild.Itemcode"
                                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text" />
                                    </div><!--Item Code-->
                                    <div v-if="!edit_child" dir="rtl" class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                                      <Button_icon ref="searchButton" :flat="true" :font_color="primary" :color="'white'" :icon="'search'" :outline="false" size="16px"
                                      v-on:receiveClick="showSearchDialog()" :tooltip_message="'Search Item'" class="fill-width search_button primary_button_font" style="height:100%"/>
                                    </div>
                                </div>
                              </div>

                              <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-md">
                                <div class="row">
                                    <div class="two_column_left col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" >
                                             <Select
                                              :readonly="json.BillStatus == 1"
                                              :no_label="false"
                                              v-model="jsonChild.reason"
                                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.reason : oridbComponentBehavior.select"
                                              :options="reason_options"
                                              v-on:receiveChange="handleChangeType"
                                              />
                                              <!--
                                              <Input
                                              :autofocusclick="true"
                                              :no_label="false"
                                              :label="'Reason'"
                                              :readonly="false"
                                              v-on:change="handleChange"
                                              v-model="jsonChild.Reason"
                                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text" />-->
                                            </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <div class="row">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                                    <Input
                                    :autofocusclick="true"
                                    :no_label="false"
                                    label="Description"
                                    :readonly="false"
                                    v-on:change="handleChange"
                                    v-model="jsonChild.Description"
                                    :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                              </div>
                            </div>
                          </div>

                          <div v-if='rtv' class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                            <div class="row">
                              <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-md">
                                    <Input
                                    :autofocusclick="true"
                                    :no_label="false"
                                    label="Qty"
                                    :readonly="false"
                                    v-on:change="handleChangeInvQty"
                                    v-model="jsonChild.Inv_Qty"
                                    :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                                  </div>
                                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-md">
                                    <Input
                                    :autofocusclick="true"
                                    :no_label="false"
                                    label="Unit Price"
                                    :readonly="false"
                                    v-on:change="handleChangeInvUnitPrice"
                                    v-model="jsonChild.Inv_UnitPrice"
                                    :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                                  </div>
                            </div>
                          </div>
                          <div  v-if="rtv" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                                <div class="row">
                                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-md">
                                    <div class="row">
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 q-pr-md">
                                          <SelectNoLabel
                                          :readonly="json.BillStatus ==1"
                                          :no_label="true"
                                          v-model="jsonChild.Inv_Disc1Type"
                                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.price_type_select : oridbComponentBehavior.select"
                                          :options="disctype_options"
                                          v-on:receiveChange="handleChangeInvDiscType" />
                                        </div>
                                        <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                                          <Input
                                          :autofocusclick="true"
                                          :no_label="false"
                                          label="Discount 1"
                                          :readonly="false"
                                          v-on:change="handleChangeInvDisc1Value"
                                          v-model="jsonChild.Inv_Disc1Value"
                                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                                        </div>
                                      </div>
                                  </div>
                                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-md">
                                    <div class="row">
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 q-pr-md">
                                          <SelectNoLabel
                                          :readonly="json.BillStatus ==1"
                                          :no_label="true"
                                          v-model="jsonChild.Inv_Disc2Type"
                                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.price_type_select : oridbComponentBehavior.select"
                                          :options="disctype_options"
                                          v-on:receiveChange="handleChangeInvDiscType" />
                                        </div>
                                        <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                                          <Input
                                          :autofocusclick="true"
                                          :no_label="false"
                                          label="Discount 2"
                                          :readonly="false"
                                          v-on:change="handleChangeInvDisc2Value"
                                          v-model="jsonChild.Inv_Disc2Value"
                                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                                        </div>
                                      </div>
                                  </div>
                                </div>
                          </div>
                          <div v-if='rtv' class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <div class="row">
                                  <div  class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-md">
                                          <Input
                                              :autofocusclick="true"
                                              :no_label="false"
                                              :label="'Total Price'"
                                              :readonly="true"
                                              v-on:change="handleChange"
                                              v-model="jsonChild.Inv_TotalPrice"
                                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                                  </div>
                                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-md">
                                    <Select
                                    :readonly="json.BillStatus ==1"
                                    :no_label="false"
                                    v-model="jsonChild.gst_tax_code"
                                    :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.tax_code : oridbComponentBehavior.select"
                                    :options="tax_options"
                                    v-on:receiveChange="handleChange"
                                    />
                                  </div>
                                </div>
                          </div>

                          <div v-if='rtv' class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6  four_column_left">
                                <div class="row items-center">
                                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" style="padding-top:2px;">
                                    <Checkbox
                                      size="sm"
                                      :disable="false"
                                      :no_label="true"
                                      v-model="jsonChild.GroupCost"
                                      v-on:receiveChange="handleChange"
                                      :dbComponentBehavior="dbComponentBehavior.text"
                                      :true-value="1"
                                      :false-value="0"
                                      />
                                    <span class="checkbox_InterfontMedium">Group Cost</span>
                                  </div>
                                  <!-- <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6" style="padding-top:5px;">
                                    
                                  </div> -->
                                </div>
                          </div>
                          <div v-if='vfoc' class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12  four_column_left">
                            <div class="row">
                              <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9 col-xl-9 q-pr-md">
                                    <Input
                                    :autofocusclick="true"
                                    :no_label="false"
                                    label="Qty"
                                    :readonly="false"
                                    v-on:change="handleChange"
                                    v-model="jsonChild.SetQty"
                                    :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                              </div>
                                  <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 ">
                                    <div class="row items-center">
                                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" style="padding-top:2px;" >
                                        <Checkbox
                                          size="sm"
                                          :disable="false"
                                          :no_label="true"
                                          v-model="jsonChild.GroupCost"
                                          v-on:receiveChange="handleChange"
                                          :dbComponentBehavior="dbComponentBehavior.text"
                                          :true-value="1"
                                          :false-value="0"
                                          />
                                        <span class="checkbox_InterfontMedium">Group Cost</span>
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
          </q-form>
        </q-card-section>

        <q-card-actions v-if="json.BillStatus == 0" class="dialog_action" style="padding-right:16px;padding-bottom: 16px">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" align="right">
              <Button_icon :readonly="false" :flat="true" :text="'SAVE'" :outline="false" size="15px"
              v-on:receiveClick="handleGrnChild('save')" :class="{ 'primary_actions_button': edit_child, 'secondary_actions_button': !edit_child }"/>

              <span class="q-pl-md" />

              
              <Button_icon v-if="!edit_child" :readonly="false" :flat="true" :font_color="'white'" :color="'#1E90FF'" :text="'ADD'" :outline="false" size="15px"
              v-on:receiveClick="handleGrnChild('save&add')" class="primary_actions_button"/>
            </div>
        </q-card-actions>

        <q-inner-loading
          :showing="showAddLoading"
          color="primary"
        />
      </q-card>

  </q-dialog>

  <q-dialog v-model="remove_all_grLine_dialog" persistent :position="$q.screen.width > 599 ? 'top' : 'bottom'">
      <q-card style="width: 700px; max-width: 98vw; margin-top: 5%;">
        <q-card-section class=" row theme_color dialog_header" style="padding: 0px;">
            <div class="text-subtitle1 header_text" style="margin-top: 5px;">Remove All GR Line<br></div>

            <q-space />
            <q-btn icon="close" flat round dense v-close-popup :disable="false"/>
        </q-card-section>

        <q-card-section style="text-align:center;">
        <span>Are you sure you want to remove all GR lines?</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn flat label="OK" color="primary" @click="handleRemoveAllGRLine" />
      </q-card-actions>

      <q-inner-loading
        :showing="deleteLoading"
        color="primary"
      />
      </q-card>

  </q-dialog>

  <q-dialog v-model="warning_report_dialog" persistent position="top">
    <q-card style="width: 700px; max-width: 80vw;text-align:center;margin-top: 5%;">

      <q-card-section class="row items-center" style="padding-top:1%;padding-bottom:1%;border-bottom: 1px solid #a7bbcb;">
        <div class="text-h6">GRN Print</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup :disable="showAddLoading"/>
      </q-card-section>

      <q-card-section>
        <!--  <q-table
            flat
            dense
            bordered
            :rows="rows_print"
            :columns="columns_print"
            row-key="name"
            hide-bottom
            @row-click="onRowClick"
          />-->
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
        <q-btn flat size="12px" label="Print" font_color="white" :color="'#1E90FF'" class="dialog_confirm_print_button" @click="handlePrintWarning" />
      </q-card-actions>

      <q-inner-loading
        :showing="printLoading"
        color="primary"
      />
    </q-card>
  </q-dialog>


  <q-dialog  v-model="surcharge_discount_dialog" persistent position="top">
    <q-card  style="width: 700px; max-width: 98vw; margin-top: 5%;border-radius: 8px;">
      <q-card-section class=" row theme_color dialog_header" style="overflow: hidden; height: 56px; padding: 8px 24px;">
          <div class="text-subtitle1 header_text" style="margin-top: 5px;">{{ title_dialog }} Surcharge/Discount<br></div>
          <q-space />
          <q-btn icon="close" flat round dense :disable="false" @click="closeDialogSurcharge"/>
      </q-card-section>

      <q-card-section class="upload_container">
        <q-form ref="save_surcharge_discount_form">
          <div class="row upload_separator_first">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <div v-if="$q.screen.width > 599 && $q.screen.width < 1024" class="row input_wrapper_right q-pb-md">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <div class="row po_details_separator">
                    <div v-if="edit_child && json.BillStatus == 0" class="col-xs-2 col-sm-1 col-md-12 col-lg-12 col-xl-12" align="right">
                      <Button_icon :disabled="readonly_delete" :icon="'fas fa-trash-alt'" :flat="true" :color="''" :font-color="'black'" :outline="false" size="12px" v-on:click="handleDelete(jsonChild)" class="q-mr-sm text-red" />
                    </div>
                    <div class="row col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" :class="$q.screen.width > 1023 ? 'q-pl-sm': ''" style="gap: 8px;padding-bottom: 16px">
                      <!-- <div class="row po_details_custom_row q-pb-md"> -->
                        <!-- <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"> -->
                          <div class="row col-12">
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                              <span class="dialog_radio_title">{{ $language('D0091') }}</span><!--Entry Type-->
                            </div>
                            <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                              <Radio class="dialog_radio_options" size="md" :disable="json.BillStatus==1" v-on:receiveChange="handleChangeEntryType" v-model="jsonChild.EntryType" :options="entry_type_options"  />
                            </div>
                          </div>
                    <!-- <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6"></div> -->
                          <!-- <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"> -->
                            <div class="row col-12">
                              <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                                <span class="dialog_radio_title">{{ $language('D0094') }}</span><!--Pricing Type-->
                              </div>
                              <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                                <Radio class="dialog_radio_options" size="md" :disable="json.BillStatus==1" v-on:receiveChange="handleChangePriceType" v-model="jsonChild.PriceType" :options="pricing_type_options"  />
                              </div>
                          </div>
                        <!-- </div> -->
                          
                        <!-- </div> -->
                      <!-- </div> -->
                    </div>

                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                      <div class="row" style="gap:16px">
                        <div class="row col-12">
                          <div class="q-pr-md" :class="edit_child ? 'col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6' : 'col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4'">
                            <div class="row">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <div class="row">
                                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <Input
                                    :autofocusclick="true"
                                    :no_label="false"
                                    :label="$language('D0097')"
                                    :readonly="true"
                                    v-on:change="handleChange"
                                    v-model="jsonChild.Itemcode"
                                    :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text" />
                                  </div><!--Item Code-->
                                </div>
                              </div>
                            </div>
                          </div>

                          <div v-if="!edit_child" dir="rtl" class="q-pr-md col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2" style="padding-top: 0px;">

                            <Button_icon ref="searchButton" :flat="true" :font_color="'primary'" :color="'white'" :icon="'search'" :outline="true" size="12px"
                            v-on:receiveClick="showSearchDialog()" :tooltip_message="'Search Item'" class="full-width search_button primary_button_font" style="height:100%"/>
                          </div>
                        

                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-md">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              :label="$language('D0098')"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="jsonChild.Description"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                            </div><!--Description-->
                          </div>
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
                              <!-- <Input
                              v-if="edit_child"
                              :autofocusclick="true"
                              :no_label="false"
                              :label="$language('D0099')"
                              :readonly="json.BillStatus==1"
                              v-on:change="handleChange"
                              v-model="jsonChild.Barcode"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" /> -->
                              <Select
                              :readonly="json.BillStatus==1"
                              :no_label="false"
                              v-model="jsonChild.Barcode"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.barcode : oridbComponentBehavior.select"
                              :options="barcode_options"
                              v-on:receiveChange="handleChange"
                              />
                            </div><!--Barcode-->
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
                              :label="$language('D0100')"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="jsonChild.PackSize"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                            </div><!--Pack Size-->
                          </div>
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
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              :label="$language('D0101')"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="jsonChild.ArticleNo"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                            </div><!--Article No-->
                          </div>
                        </div>
                        </div>
                      </div>
                    </div>
                   <q-separator class="separator-style"></q-separator>

                  <div class="row col-12">
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-md">
                          <Input
                          :autofocusclick="true"
                          :no_label="false"
                          :label="`${$language('D0102')}  (x${jsonChild.OrderLotSize})`"
                          :readonly="json.BillStatus==1"
                          v-on:change="handleChangeBulkQty"
                          v-model="jsonChild.BulkQty"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                        </div><!--Bulk Qty-->
                        <!-- <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 q-pl-sm">
                          <span style="font-size: 13px;">x {{ jsonChild.OrderLotSize }}</span>
                        </div> -->
                      

                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 q-pl-md" :class="$q.screen.width>599 && $q.screen.width<1024 ? 'two_column_left' : ''">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <Input
                          :autofocusclick="true"
                          :no_label="false"
                          :label="$language('D0103')"
                          :readonly="json.BillStatus==1"
                          v-on:change="handleChangeQty"
                          v-model="jsonChild.SetQty"
                          min='0'
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.input_number : oridbComponentBehavior.text" />
                        </div><!--Qty-->
                      </div>
                    </div>

                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 q-pl-md">
                      <div class="row" :class="$q.screen.width<599 ? '': ''">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <Input
                          :autofocusclick="true"
                          :no_label="false"
                          :label="$language('D0096')"
                          :readonly="json.BillStatus==1 || jsonChild.PriceType=='FOC'"
                          v-on:change="handleChangeQtyfoc"
                          v-model="jsonChild.Qty_foc"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right_readonly : oridbComponentBehavior.text" />
                        </div><!--FOC-->
                      </div>
                    </div>
                  </div>
                  <div class="row col-12">
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-md">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <Input
                          :autofocusclick="true"
                          :no_label="false"
                          :label="$language('D0092')"
                          :readonly="json.BillStatus==1 || jsonChild.PriceType=='FOC' ? true : unit ? false : true"
                          v-on:change="handleChangeUnitPrice"
                          v-model="jsonChild.UnitPrice"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right_readonly : oridbComponentBehavior.text" />
                        </div><!--Unit Price-->
                      </div>
                    </div>

                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-md">
                      <div class="row" :class="$q.screen.width<1024 ? '': ''">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <Input
                          :autofocusclick="true"
                          :no_label="false"
                          :label="$language('D0104')"
                          :readonly="json.BillStatus==1 || jsonChild.PriceType=='FOC' ? true : unit ? false : true"
                          v-on:change="handleChangeDiscAmt"
                          v-model="jsonChild.DiscAmt"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                        </div><!--Discount(+)/Surcharge(-)-->
                      </div>
                    </div>
                  </div>
                    
                  <div class="row col-12">
                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 q-pr-md">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <Select
                          dir="ltr"
                          :readonly="json.BillStatus==1 || jsonChild.PriceType=='FOC' ? true : unit ? jsonChild.DiscAmt != '0.00' : true"
                          :no_label="false"
                          v-model="jsonChild.Disc1Type"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.disc1type : oridbComponentBehavior.select"
                          :options="disctype_options"
                          v-on:receiveChange="handleChangeDiscType"
                          />
                        </div>
                      </div>
                    </div>

                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 q-pr-md" :class="$q.screen.width >599 ? '' : ''">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <Input
                          :autofocusclick="true"
                          :no_label="false"
                          :label="$language('D0106')"
                          :readonly="json.BillStatus==1 || jsonChild.PriceType=='FOC' ? true : unit ? false : true"
                          v-on:change="handleChangeDisc1value"
                          v-model="jsonChild.Disc1value"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                        </div><!--Disc1Value-->
                      </div>
                    </div>

                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 q-pl-md">
                      <div class="row" :class="$q.screen.width<599 ? '': ''">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <Select
                          dir="ltr"
                          :readonly="json.BillStatus==1 || jsonChild.PriceType=='FOC' ? true : unit ? false : true"
                          :no_label="false"
                          v-model="jsonChild.Disc2Type"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.disc2type : oridbComponentBehavior.select"
                          :options="disctype_options"
                          v-on:receiveChange="handleChangeDiscType"
                          />
                        </div>
                      </div>
                    </div>

                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 q-pl-md">
                      <div class="row" :class="$q.screen.width<599 ? 'dialog_separator': ''">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <Input
                          :autofocusclick="true"
                          :no_label="false"
                          :label="$language('D0108')"
                          :readonly="json.BillStatus==1 || jsonChild.PriceType=='FOC' ? true : unit ? false : true"
                          v-on:change="handleChangeDisc2Value"
                          v-model="jsonChild.Disc2Value"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                        </div><!--Disc2Value-->
                      </div>
                    </div>
                  </div>

                  <div class="row col-12">
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-md">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <Input
                          :autofocusclick="true"
                          :no_label="false"
                          :label="$language('D0109')"
                          :readonly="true"
                          v-on:change="handleChange"
                          v-model="jsonChild.NetUnitPrice"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                        </div><!--Net Price-->
                      </div>
                    </div>

                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-md">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <Input
                          :autofocusclick="true"
                          :no_label="false"
                          :label="$language('D0110')"
                          :readonly="json.BillStatus==1 || jsonChild.PriceType=='FOC' ? true : unit"
                          v-on:change="handleChangeTotalPrice"
                          v-model="jsonChild.TotalPrice"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                        </div><!--Total before Tax-->
                      </div>
                    </div>
                  </div>

<!--Rebate Amount-->
                  <div class="row col-12">
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-md">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <Input
                          :autofocusclick="true"
                          :no_label="false"
                          :label="$language('D0112')"
                          :readonly="json.BillStatus==1"
                          v-on:change="handleChangeFuturePrice"
                          v-model="jsonChild.price_future"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                        </div><!--Future Price-->
                      </div>
                    </div>
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-md">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <!-- <Input
                          :autofocusclick="true"
                          :no_label="false"
                          :label="$language('D0111')"
                          :readonly="json.BillStatus==1"
                          v-on:change="handleChangeRebateAmount"
                          v-model="jsonChild.rebate_value"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" /> -->
                          <InputRules
                            :autofocusclick="true"
                            :no_label="false"
                            :label="$language('D0111')"
                            :readonly="json.BillStatus==1"
                            v-on:change="handleChangeRebateAmount"
                            v-model="jsonChild.rebate_value"
                            :rules="[validateRebateAmount]"
                            :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />

                        </div><!--Rebate Amount-->
                      </div>
                    </div>

                    
                </div>
                </div>
              </div>
              </div>
              </div>
              </div>
              
              <div v-if="$q.screen.width > 1023" class="row input_wrapper_right">
                <div class="row col-12 q-pb-md " style="gap:8px">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <div class="row">
                                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 q-pl-sm">
                                  <span class="dialog_radio_title">Cost</span>
                                </div>

                                <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                                    <Checkbox
                                          size="md"
                                          :disable="false"
                                          :no_label="true"
                                          v-model="surcharge_discount_json.build_into_cost"
                                          :dbComponentBehavior="dbComponentBehavior.text"
                                          v-on:receiveChangenewVal="handleChangeCheckbox"
                                          :table="true"
                                          class="dialog_radio_options"
                                          />
                                </div>


                          </div>
                    </div>
                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <div class="row">
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 q-pl-sm">
                              <span class="dialog_radio_title">DN</span>
                            </div>

                            <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                                 <Checkbox
                                      size="md"
                                      :disable="false"
                                      :no_label="true"
                                      v-model="surcharge_discount_json.dn"
                                      :dbComponentBehavior="dbComponentBehavior.text"
                                      v-on:receiveChangenewVal="handleChangeCheckbox"
                                      :table="true"
                                      />
                            </div>
                        </div>
                      </div>
                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <div class="row">
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 q-pl-sm">
                              <span class="dialog_radio_title">Prorate by Unit Volume</span>
                            </div>

                            <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                                 <Checkbox
                                      size="md"
                                      :disable="false"
                                      :no_label="true"
                                      v-model="surcharge_discount_json.prorate_by_unit_volume"
                                      :dbComponentBehavior="dbComponentBehavior.text"
                                      v-on:receiveChangenewVal="handleChangeCheckbox"
                                      :table="true"
                                      />
                            </div>
                        </div>
                      </div>
                </div>
                      <div class="row col-12" style="gap: 16px">
                        <div class="row col-12">
                          <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 q-pr-md">
                            <Select
                                  :readonly="json.BillStatus ==1 || title_dialog == 'Invoice'"
                                  :no_label="false"
                                  v-model="surcharge_discount_json.Code"
                                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.surcharge_discount_code : oridbComponentBehavior.select"
                                  :options="codeOptions"
                                  v-on:receiveChange="handleSurchargeDiscountInputChange"
                                  emit-value
                                  />
                          </div>
                          
                          <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 q-pl-md">
                            <Input
                                  :autofocusclick="true"
                                  :no_label="false"
                                  label="Description"
                                  :readonly="true"
                                  v-on:change="handleChange"
                                  v-model="surcharge_discount_json.Description"
                                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                          </div>
                          </div>
                          <div class="row col-12">
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 q-pr-md">
                              <Input
                                    :autofocusclick="true"
                                    :no_label="false"
                                    label="Price Type"
                                    :readonly="true"
                                    v-on:change="handleChange"
                                    v-model="surcharge_discount_json.surcharge_disc_type"
                                    :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />

                            </div>

                            <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 q-pl-md">

                              <Input
                                    :autofocusclick="true"
                                    :no_label="false"
                                    label="Value"
                                    :readonly="false"
                                    v-on:change="handleChangeSurchargeValue"
                                    v-model="surcharge_discount_json.surcharge_disc_value"
                                    :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.surcharge_value : oridbComponentBehavior.text" />

                            </div>
                            </div>
                            <div class="row col-12">
                                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 q-pr-md">
                                  <Input
                                        :autofocusclick="true"
                                        :no_label="false"
                                        label="Calculated"
                                        :readonly="true"
                                        v-on:change="handleChange"
                                        v-model="surcharge_discount_json.Value_Calculated"
                                        :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.surcharge_value : oridbComponentBehavior.text" />
                                </div>

                                <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 q-pl-md">
                                  <Input
                                        :autofocusclick="true"
                                        :no_label="false"
                                        label="Value After"
                                        :readonly="true"
                                        v-on:change="handleChange"
                                        v-model="surcharge_discount_json.Value_After"
                                        :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.surcharge_value : oridbComponentBehavior.text" />
                                </div>
                            </div>


                              <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 q-pr-md">
                                <Input
                                      :autofocusclick="true"
                                      :no_label="false"
                                      label="Landed Cost"
                                      :readonly="false"
                                      v-on:change="handleChange"
                                      v-model="surcharge_discount_json.landed_cost"
                                      :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.surcharge_value : oridbComponentBehavior.text" />
                              </div>
                      </div>
              </div>
            </div>
          </div>
        </q-form>
      </q-card-section>

      <q-card-actions v-if="json.BillStatus == 0" class="dialog_action" style="padding-right: 16px;padding-bottom: 16px">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" align="right">
            <Button_icon :readonly="false" :flat="true" :text="$language('D0020')" :outline="false" size="15px"
            v-on:receiveClick="addButtonSurcharge('save')" :class="{ 'primary_actions_button': edit_surcharge_action, 'secondary_actions_button': !edit_surcharge_action }"/><!--SAVE-->
            

            <span class="q-pl-md" />
            <Button_icon v-if="!edit_surcharge_action" :readonly="false" :flat="true" :font_color="'white'" :color="'#1E90FF'" :text="$language('D0024')" :outline="false" size="15px"
            v-on:receiveClick="addButtonSurcharge('save&add')" class="primary_actions_button"/><!--ADD-->

            
          </div>
      </q-card-actions>

      <q-inner-loading
        :showing="showAddLoading"
        color="primary"
      />
    </q-card>
  </q-dialog>
</template>

<script>
import ViewSummaryDialog from 'src/components/ERP/Base/ViewSummaryDialog'
import ButtonMobile from 'src/components/ERP/Base/ButtonMobile'
import Chip from 'src/components/ERP/Base/Chip'
import Input from 'src/components/ERP/Base/Input'
import Select from 'src/components/ERP/Base/Select'
import Datepicker from 'src/components/ERP/Base/Datepicker'
import Checkbox from 'src/components/ERP/Base/Checkbox'
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
import SurchargeTable from 'src/components/ERP/Purchase/SurchargeTable';
import SelectNoLabel from 'src/components/ERP/Base/SelectNoLabel';
import { Loading, QSpinnerTail} from 'quasar'
import PrintListTable from 'src/components/ERP/Purchase/PrintListTable'

export default{
  data() {
    return {
      isSelectAllClicked: false,
      isGroupClicked: false,
      isUngroupClicked: false,
      selectedCardIndex: null,
      retailer_guid: sessionStorage.getItem("retailer_guid") != "" && sessionStorage.getItem("retailer_guid") != "null" && sessionStorage.getItem("retailer_guid") != null ? sessionStorage.getItem("retailer_guid") : [],
      user_name: sessionStorage.getItem("user_name") != "" && sessionStorage.getItem("user_name") != "null" && sessionStorage.getItem("user_name") != null ? sessionStorage.getItem("user_name") : [],
      language: sessionStorage.getItem("language") != "" && sessionStorage.getItem("language") != "null" && sessionStorage.getItem("language") != null ? sessionStorage.getItem("language") : [],
      currency_sign: sessionStorage.getItem("currency_sign") != "" && sessionStorage.getItem("currency_sign") != "null" && sessionStorage.getItem("currency_sign") != null ? sessionStorage.getItem("currency_sign") : [],
      session_outlet_guid: sessionStorage.getItem("session_outlet_guid") != "" && sessionStorage.getItem("session_outlet_guid") != "null" && sessionStorage.getItem("session_outlet_guid") != null ? sessionStorage.getItem("session_outlet_guid") : [],
      outlet_options: [],
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
      search: {
        options: [],
        type: "",
        value: "",
        showTable: false
      },
      barcode_options: [],
      supplier_options: [
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
      item_table_column: [],
      item_table_data: [],
      supplier_options2: [],
      location_options: [],
      location_options2: [],
      table_column: [],
      table_data: [],
      showAddLoading: false,
      showAddLoading2: false,
      select_all: false,
      json: {
        step: 1,
        BillStatus: 0,
        consign: 0,
        posted: 0,
        in_kind: 0,
        d_o: 0,
        ibt_ict: 0,
        invoice: 0,
        total_include_tax: '0.00',
        Code: '',
        loc_group: '',
      },
      ori_json: {},
      jsonChild: {},
      all_supcus: {},
      selected_row: {},
      status: "",
      page_function: this.$route.name,
      ask_member: false,
      code_scanner: false,
      cardtype_guid: "",
      delete_child: false,
      active_delete_json: {},
      modify_child: false,
      edit_child: false,
      search_item: false,
      supplier_readonly: false,
      results: [],
      item_ori_params: {},
      post_transmain: false,
      view_summary:false,
      group_button: true,
      surcharge_table_data:[],
      surcharge_table_column:[],
      inv_surcharge_table_column:[],
      inv_surcharge_table_data:[],
      td_options:[
        {
          "label":"$",
          "value":"$"
        },

        {
          "label":"%",
          "value":"%"
        }
      ],
      grn_table_footer:true,
      inv_table_footer: true,
      deleteLoading:false,
      surcharge_disc_array:[],
      inv_surcharge_disc_array:[],
      edit_surcharge:false,
      surchargeChild:'',
      grn_surcharge:true,
      inv_surcharge:false,
      rtv_dialog:false,
      optionsPriceType:[
        {
          "label":"%",
          "value":"%"
        },
        {
          "label":"$",
          "value":"$"
        }
      ],
      vfoc:false,
      rtv:false,
      btnList:[],
      remove_all_grLine_dialog:false,
      warning_report_dialog:false,
      rows_print:[],
      columns_print:[],
      surcharge_discount_dialog:false,
      surcharge_discount_json:{},
      edit_surcharge_action:false,
      title_dialog:'',
      reason_options: [
        // {
        //   label: "FOC SHORT SUPPLIED",
        //   value: "FOC SHORT SUPPLIED"
        // },
        // {
        //   label: "INVOICE SHORT SUPPLIED",
        //   value: "INVOICE SHORT SUPPLIED"
        // },
        // {
        //   label: "ITEM NOT IN PO",
        //   value: "ITEM NOT IN PO"
        // },
        // {
        //   label: "REJECTED -EXPIRED",
        //   value: "REJECTED -EXPIRED"
        // },
        // {
        //   label: "REJECTED -POOR QUALITY",
        //   value: "REJECTED -POOR QUALITY"
        // },
        // {
        //   label: "WRONG BARCODE",
        //   value: "WRONG BARCODE"
        // }
      ],
      totalDisc:'0.00',
      TotalInvDisc:'0.00',
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
    PurchaseTable,
    Button_icon,
    Radio,
    SelectFilter,
    SelectNoLabel,
    // ItemTable,
    SearchPopUp,
    // SelectPlaceholder,
    // Textarea,
    // StreamBarcodeReader,
    DatepickerOptions,
    SurchargeTable,
    PrintListTable
  },
  computed: {
    dbComponentBehavior() {
      return this.$store.getters['dbComponentBehavior/byLanguage']('erp')
    },

  },
  async mounted(){


  },
  async created () {
      this.showAddLoading = true;

      var currentdate = new Date();

      var current_date_format = currentdate.getFullYear()+"-"+('0' + (currentdate.getMonth()+1)).slice(-2)+"-"+('0' + currentdate.getDate()).slice(-2);

      this.json.DocDate = current_date_format;
      this.json.GRDate = current_date_format;

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
      var payloadS = {
        params: {
          type: 'S',
          skip: 0,
          block:0,
          branch: location.data[0].LocGroup,
          active:1,
          limit: 99999999,
          language: this.language
        }
      }

      var location_results = location.data;


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
          label: sample.Code + ' - ' +  sample.Name,
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

        var obj2 = {
          label: lsample.LocGroup + ' - ' + lsample.Description,
          value: lsample.LocGroup
        }

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
      console.log('array_logGrop',array_logGrop);

      this.supplier_options = supcus_code;
      this.supplier_options2 = supcus_name;
      this.location_options = array_logGrop;
      this.location_options2 = loc_opt;

      if(this.page_function == 'EditGoodsReceivedNote')
      {
        var cpayload =
        {
          params: {
            refno: this.$route.query.refno
          }
        }

        var cdata = await this.getGrchild(cpayload);
        var cresults = cdata.data;

        this.supplier_readonly = cresults.length > 0;

        var refno = this.$route.query.refno;

        var payload = {
          RefNo: refno,
          user: this.user_name,
          language: this.language
        }

        var data = await this.getFilterGrmain(payload)

        var filtered_transmain = data.response;

        filtered_transmain.rebate_amt = this.formatAmount(filtered_transmain.rebate_amt, '$');
        filtered_transmain.Total = this.formatAmount(filtered_transmain.Total, '$');
        filtered_transmain.total_include_tax = this.formatAmount(filtered_transmain.total_include_tax, '$');
        filtered_transmain.gst_tax_sum = this.formatAmount(filtered_transmain.gst_tax_sum, '$');
        filtered_transmain.Subtotal1 = this.formatAmount(filtered_transmain.Subtotal1, '$');
        filtered_transmain.rounding_adj = this.formatAmount(filtered_transmain.rounding_adj, '$');
        filtered_transmain.input_amt_exc_tax = this.formatAmount(filtered_transmain.input_amt_exc_tax, '$')
        filtered_transmain.input_gst = this.formatAmount(filtered_transmain.input_gst, '$')
        filtered_transmain.input_amt_inc_tax = this.formatAmount(filtered_transmain.input_amt_inc_tax, '$')
        filtered_transmain.gst_tax_rate = this.formatAmount(filtered_transmain.gst_tax_rate, '$')
        filtered_transmain.gst_adj = this.formatAmount(filtered_transmain.gst_adj, '$')
        filtered_transmain.landed_cost_total = this.formatAmount(filtered_transmain.landed_cost_total, '$')
        filtered_transmain.Discount1 = this.formatAmount(filtered_transmain.Discount1, '$')
        filtered_transmain.InvAmount_Vendor = this.formatAmount(filtered_transmain.InvAmount_Vendor, '$')
        filtered_transmain.InvSurchargeDisc_Vendor = this.formatAmount(filtered_transmain.InvSurchargeDisc_Vendor, '$')
        filtered_transmain.InvNetAmt_Vendor = this.formatAmount(filtered_transmain.InvNetAmt_Vendor, '$')

        // created
        this.json = filtered_transmain;

        var filter_outlet = array_logGrop.filter((entry)=>{
          return entry.value == this.json.loc_group;
        })

        this.json.ChildNo = this.formatAmount(cresults.length,'qty');
        this.json.Branch = filter_outlet[0].value;
        this.json.step = this.$route.query.step ? Number(this.$route.query.step) : 1;
        this.json.Remark = this.json.Remark==null ? '' : this.json.Remark;
        this.ori_json = JSON.parse(JSON.stringify(this.json))

        this.btnList =[
          {
            "title": "RTV (Return To Vendor)",
            "section": "RTV"
          },
          {
            "title": "Vendor FOC Item without PO",
            "section": "VFOC"
          },
          // {
          //   "title": "Remove All GR Line",
          //   "section": "REMOVE"
          // }
        ]
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
    handleConvertNew()
    {
      this.receiving_methods = true;
    },
     handleChangeSelectAll2() {
        this.select_all = !this.select_all;
        const results = this.table_data.data.results;

        if (this.select_all) {
          results.forEach(result => {
            result.select = true;
          });
          this.handleChangeCheckbox();
        } else {
          this.generate_sn_readonly = true;

          results.forEach(result => {
            result.select = false;
          });

          // this.update_weight.readonly = true;
        }
    },
    handleNavigate (type) {
        if(type =='GoodsReceivedNote')
      {
        this.$router.push("GoodsReceivedNote");
        // this.$router.push({ name: "Create" + this.page_function });
      }
      else if (type =='Outlet') {
        this.$router.push("/erp/location/outletlocation");
      }
      },
      handleChangeVendorExcTax(newVal)
      {
        this.json.input_amt_exc_tax = this.formatAmount(newVal, '$')
        var total = Number(newVal) + Number(this.unformatAmount(this.json.input_gst))
        this.json.input_amt_inc_tax = this.formatAmount(total, '$')
      },
      handleChangeVendorGST(newVal)
      {
        this.json.input_gst = this.formatAmount(newVal, '$')
        var total = Number(this.unformatAmount(this.json.input_amt_exc_tax)) + Number(newVal);
        this.json.input_amt_inc_tax = this.formatAmount(total, '$')
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
        this.json.loc_group = '';

        var refno = this.$route.query.refno;

        var payload = {
          RefNo: refno,
          user: this.user_name,
          language: this.language
        }

        var data = await this.getFilterGrmain(payload)
        var filtered_transmain = data.response;
        var rebate_amt = filtered_transmain.rebate_amt;
        this.json.rebate_amt = this.formatAmount(rebate_amt, '$');
        this.json.loc_group = filtered_transmain.loc_group;
        this.json.Code = filtered_transmain.Code;

        if(this.json.step == 3){
           var payload ={
              "pass_json":{
                outlet_guid:this.session_outlet_guid,
                language: this.language
              }
            }
            var surchargeTypeOptionsList =await this.getSurchargeTypeOptions(payload)
            var surcharge_Type_OptionsList =[];
             for(var i in  surchargeTypeOptionsList){
               var obj_surchargeType = surchargeTypeOptionsList[i];
               var obj = {
                label: obj_surchargeType.Code + " - " + obj_surchargeType.Description,
                value: obj_surchargeType.Code,
                code_Type: obj_surchargeType.code_Type,
                surcharge_disc_type: obj_surchargeType.surcharge_disc_type,
                Description: obj_surchargeType.Description,
                code_Type:obj_surchargeType.code_Type
               };
               surcharge_Type_OptionsList.push(obj);
             }

             surcharge_Type_OptionsList.sort((a, b) => {
                const aValue = a.value;
                const bValue = b.value;

                const aIsNumber = !isNaN(Number(aValue));
                const bIsNumber = !isNaN(Number(bValue));

                if (!aIsNumber && !bIsNumber) {
                  // Both are strings, sort alphabetically (case-insensitive)
                  return aValue.localeCompare(bValue, undefined, { sensitivity: 'base' });
                } else if (aIsNumber && bIsNumber) {
                  // Both are numbers, sort numerically
                  return Number(aValue) - Number(bValue);
                } else {
                  // Strings come before numbers
                  return aIsNumber ? 1 : -1;
                }
             });

             console.log('surchargeTypeOptionsList',surchargeTypeOptionsList);
             this.codeOptions =  surcharge_Type_OptionsList
            this.surcharge_table_function();
            this.surcharge_IVNtable_function();
          //console.log('surcharge_disc_array',this.surcharge_disc_array);
        }

      },
      async confirmPost(){
        this.post_transmain = true;
      },
      handleChangePriceType(newVal)
      {
        if(newVal == 'FOC')
        {
          this.jsonChild.UnitPrice = '0.00'
          this.jsonChild.DiscAmt = '0.00'
          this.jsonChild.Disc1Type = '%'
          this.jsonChild.Disc1Value = '0.00'
          this.jsonChild.Disc2Type = '%'
          this.jsonChild.Disc2Value = '0.00'
          this.jsonChild.NetUnitPrice = '0.0000'
          this.jsonChild.TotalPrice = '0.00'
        }
      },
      async handlePostTransmain()
      {
        this.deleteLoading = true;
        var payload = {
          RefNo: this.$route.query.refno,
          user: this.user_name,
          language: this.language
        }

        var data = {};

        if(this.json.BillStatus==0)
        {
          // await this.$store.dispatch('purchase/trigger_posting_gr', payload).then(() => {
          //   data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_posting_gr']));
          // });

          var set_query = {
              "ERefNo":this.json.RefNo,
              "EUser":this.user_name,
              "getuser":this.user_name
          };

          var json_runscript_multi = {
              params:[
                {
                  "lookupdb_name": this.session_outlet_guid,
                  "trans_group": 'GRN',
                  "trans_type": '#Before post (DO & Invoice)',
                  "set_query":set_query
                },
                {
                  "lookupdb_name": this.session_outlet_guid,
                  "trans_group": 'GRN',
                  "trans_type": '@After post (DO & Invoice)',
                  "set_query":set_query
                }
            ]
          };

          var payload_runscript_multi ={
             "pass_json": json_runscript_multi
          }

          var dispatch_response = await this.runscript_multi(payload_runscript_multi)
          console.log('dispatch_response',dispatch_response);

        }
        else if(this.json.BillStatus==1)
        {
          // await this.$store.dispatch('purchase/trigger_unposting_gr', payload).then(() => {
          //   data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_unposting_gr']));
          // });
          var set_query = {
              "ERefNo":this.json.RefNo,
              "EUser":this.user_name,
              "getuser":this.user_name
          };

          var json_runscript_multi = {
              params:[
                {
                  "lookupdb_name": this.session_outlet_guid,
                  "trans_group": 'GRN',
                  "trans_type": '#Before Unpost (DO & Invoice)',
                  "set_query":set_query
                },
                {
                  "lookupdb_name": this.session_outlet_guid,
                  "trans_group": 'GRN',
                  "trans_type": '@After Unpost (DO & Invoice)',
                  "set_query":set_query
                }
            ]
          };

          var payload_runscript_multi ={
             "pass_json": json_runscript_multi
          }

          var dispatch_response = await this.runscript_multi(payload_runscript_multi)

          console.log('dispatch_response',dispatch_response);

        }

        // var status = data.status;
        // var dispatch_response = dispatch_response_array.response.map(item => item.response_json);
        // var dispatch_response_status = dispatch_response.filter((entry)=>{
        //           return entry.status === true;
        //    })
          //  console.log('dispatch_response',dispatch_response);
          //  console.log('dispatch_response_status',dispatch_response_status);



       if (dispatch_response.status) {
        if(this.json.BillStatus==0)
            {
              this.showNotify("positive", "Posted Successfully.");
            }
            else
            {
              this.showNotify("positive", "Unposted Successfully.");
            }
           // window.location.reload();
            this.post_transmain = false;
            this.deleteLoading = false;

          }else{
            this.showNotify('negative', dispatch_response.message);
            this.post_transmain = false;
            this.deleteLoading = false;

          }

        // if(status == "success")
        // {
        //   if(this.json.BillStatus==0)
        //   {
        //     this.showNotify("positive", "Posted Successfully.");
        //   }
        //   else
        //   {
        //     this.showNotify("positive", "Unposted Successfully.");
        //   }

        //   window.location.reload();
        //   this.post_transmain = false;
        //   this.deleteLoading = false;
        // }
        // else
        // {
        //   var show_error = "";

        //   var error_response = data.response;

        //   Object.keys(error_response).forEach((loop_index)=>{
        //     if(loop_index !== 'status_code')
        //     {
        //       var temp_error = {};
        //       var error_message = "";
        //       Object.keys(error_response[loop_index]).forEach((header,cindex)=>{
        //           error_message = error_response[loop_index];
        //       });
        //       temp_error = loop_index + " - " + error_message + '<br>';
        //       show_error += temp_error;
        //     }
        //   });//close foreach error message

        //   this.showNotify('negative', show_error);
        //   this.post_transmain = false;
        //   this.deleteLoading = false;
        // }
      },
      async handleRowClick(payload){
        var requests = this.item_table_data.data.results.map(async(row, index)=>{
          row.selected = false;
        });

        await Promise.all(requests);

        payload.selected = true;

        this.selected_row = payload;
      },
      showSearchTable(){
        if(this.search.value != null && this.search.value != '' && this.search.value != undefined)
        {
          this.search.showTable = true;
          setTimeout(()=>{
            this.item_table_function(this.item_ori_params);
          },200)
        }
        else
        {
          this.showNotify('negative', 'Please enter search value.')
        }
      },
      handleItemTableChange: function(newVal)
      {
            var new_params = this.$pluginsTableParams(newVal)

            var payload = {
                params : new_params
            };

            this.item_ori_params = payload;
            this.item_table_function(payload);
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
            var supplier_code = this.json.Code
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
            payload.branch = this.json.Branch

            var data = {};

            await this.$store.dispatch('purchase/trigger_search_item_for_po', payload).then(() => {
              data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_search_item_for_po']));
            });

            this.item_table_column = table_column;

            if(data.status == 'success')
            {
              var results = data.response;

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

            var type = 'S'
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
      closeSearchItem()
      {
        this.jsonChild = {};
        this.search.showTable = false;
        this.search_item = false;
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
      handleChangeRebateValue()
      {
        this.jsonChild.rebate_value = this.formatAmount(this.jsonChild.rebate_value,'$');
      },
      handleChangeInvTotalPrice()
      {
        this.jsonChild.Inv_TotalPrice = this.formatAmount(this.jsonChild.Inv_TotalPrice,'$');
        this.Inv_calculation();
      },
      handleChangeInvDisc2Value()
      {
        this.jsonChild.Inv_Disc2Value = this.formatAmount(this.jsonChild.Inv_Disc2Value,'$');
        this.Inv_calculation();
      },
      handleChangeInvDisc1Value()
      {
        this.jsonChild.Inv_Disc1Value = this.formatAmount(this.jsonChild.Inv_Disc1Value,'$');
        this.Inv_calculation();
      },
      handleChangeInvDiscType()
      {
        console.log('changePrice');
        this.Inv_calculation();
      },
      handleChangeInvUnitPrice()
      {
        this.jsonChild.Inv_UnitPrice = this.formatAmount(this.jsonChild.Inv_UnitPrice,'$');
        this.Inv_calculation();
      },
      handleChangeInvQty(newVal)
      {
        this.jsonChild.Inv_Qty = this.formatAmount(newVal,'qty');
        this.Inv_calculation();
      },
      Inv_calculation(){
        this.$nextTick(()=>{
          var Inv_Qty = this.unformatAmount(this.jsonChild.Inv_Qty);
          var Inv_TotalPrice = this.unformatAmount(this.jsonChild.Inv_TotalPrice);
          var Inv_Disc1Value = this.unformatAmount(this.jsonChild.Inv_Disc1Value);
          var Inv_Disc2Value = this.unformatAmount(this.jsonChild.Inv_Disc2Value);
          var Inv_UnitPrice = this.unformatAmount(this.jsonChild.Inv_UnitPrice);

          if(this.jsonChild.EntryType == 'total')
          {
              var parameter = Inv_Qty;

              var Inv_UnitPrice = (parseFloat(Inv_TotalPrice/ parameter)).toFixed(2);
              var Inv_NetUnitPrice = (parseFloat(Inv_TotalPrice/ parameter)).toFixed(0);
              var calculate_total_price = (parseFloat(Inv_NetUnitPrice* parameter)).toFixed(2);
              this.jsonChild.Inv_UnitPrice = this.formatAmount(Inv_UnitPrice,'$');
              this.jsonChild.Inv_NetUnitPrice = this.formatAmount(Inv_NetUnitPrice);

              if(this.jsonChild.Inv_UnitPrice == 'NaN' || this.jsonChild.Inv_UnitPrice == 'Infinity')
              {
                this.jsonChild.Inv_UnitPrice = '0.00'
              }

              if(this.jsonChild.Inv_NetUnitPrice == 'NaN' || this.jsonChild.Inv_NetUnitPrice == 'Infinity')
              {
                this.jsonChild.Inv_NetUnitPrice = '0.00'
              }
          } // total price entry
          else
          {
              // calculate netprice
              if(this.jsonChild.Inv_Disc1Type == "%")
              {
                var percentage = Number(Inv_Disc1Value)/100;
                var after1Disc = Inv_UnitPrice - (Inv_UnitPrice*percentage);
              }
              else if(this.jsonChild.Inv_Disc1Type == "$")
              {
                var after1Disc = Inv_UnitPrice - Inv_Disc1Value;
              }

              var after2Disc = 0;

              if(this.jsonChild.Inv_Disc2Type == "%")
              {
                after2Disc = after1Disc - (after1Disc*Inv_Disc2Value/100);
                var Inv_NetUnitPrice = (parseFloat(after2Disc)).toFixed(4);
                this.jsonChild.Inv_NetUnitPrice = this.formatAmount(Inv_NetUnitPrice);
              }
              else if(this.jsonChild.Inv_Disc2Type == "$")
              {
                after2Disc = after1Disc - Inv_Disc2Value;
                var Inv_NetUnitPrice = (parseFloat(after2Disc)).toFixed(4);
                this.jsonChild.Inv_NetUnitPrice = this.formatAmount(Inv_NetUnitPrice);
              }

              var Inv_TotalPrice = 0;

              // calculate totalprice
              if(this.jsonChild.by_weight == 1)
              {
                var result = (weight * after2Disc)+(round_adj-DiscAmt);
                this.jsonChild.Inv_TotalPrice = this.formatAmount(result,'$');
                Inv_TotalPrice = result;
              }
              else
              {
                // var result = (Inv_Qty * after2Disc)+(round_adj-DiscAmt);
                var result = (Inv_Qty * after2Disc);
                this.jsonChild.Inv_TotalPrice = this.formatAmount(result,'$');
                Inv_TotalPrice = result;
              }
          } //if unit price entry
        });
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
      handleChangeDisc1Value()
      {
        this.jsonChild.Disc1Value = this.formatAmount(this.jsonChild.Disc1Value,'$');
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
          var Disc1Value = this.unformatAmount(this.jsonChild.Disc1Value);
          // console.log(this.jsonChild.Disc1Value);
          var Disc2Value = this.unformatAmount(this.jsonChild.Disc2Value);
          // console.log(this.jsonChild.Disc2Value);
          // var round_adj = this.unformatAmount(this.jsonChild.round_adj);
          // console.log(this.jsonChild.round_adj);
          var DiscAmt = this.unformatAmount(this.jsonChild.DiscAmt);
          // console.log(this.jsonChild.DiscAmt);
          // var sst_rate = this.unformatAmount(this.jsonChild.sst_rate);
          // console.log(this.jsonChild.sst_rate);

          var UnitPrice = this.unformatAmount(this.jsonChild.UnitPrice);
          // console.log(UnitPrice);

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
              // calculate netprice
              if(this.jsonChild.Disc1Type == "%")
              {
                var percentage = Number(Disc1Value)/100;
                var after1Disc = UnitPrice - (UnitPrice*percentage);
              }
              else if(this.jsonChild.Disc1Type == "$")
              {
                var after1Disc = UnitPrice - Disc1Value;
              }

              var after2Disc = 0;

              if(this.jsonChild.Disc2Type == "%")
              {
                after2Disc = after1Disc - (after1Disc*Disc2Value/100);
                var NetUnitPrice = (parseFloat(after2Disc)).toFixed(4);
                this.jsonChild.NetUnitPrice = this.formatAmount(NetUnitPrice);
              }
              else if(this.jsonChild.Disc2Type == "$")
              {
                after2Disc = after1Disc - Disc2Value;
                var NetUnitPrice = (parseFloat(after2Disc)).toFixed(4);
                this.jsonChild.NetUnitPrice = this.formatAmount(NetUnitPrice);
              }

              var TotalPrice = 0;

              // calculate totalprice
              if(this.jsonChild.by_weight == 1)
              {
                var result = (weight * after2Disc)+(round_adj-DiscAmt);
                this.jsonChild.TotalPrice = this.formatAmount(result,'$');
                TotalPrice = result;
              }
              else
              {
                // var result = (SetQty * after2Disc)+(round_adj-DiscAmt);
                var result = (SetQty * after2Disc)+(-DiscAmt);
                this.jsonChild.TotalPrice = this.formatAmount(result,'$');
                TotalPrice = result;
              }
          } //if unit price entry

          // // calculate sst & totalamt
          // var sst = this.unformatAmount(this.jsonChild.TotalPrice)*sst_rate/100;
          // var total_amt = this.jsonChild.EntryType == 'total' ? (parseFloat(parseFloat(this.unformatAmount(this.jsonChild.total_price))+parseFloat(sst)+parseFloat(ws_cost))).toFixed(2) : sst+total_price+ws_cost;
          // this.jsonChild.sst = this.formatAmount(sst,'$');
          // this.jsonChild.total_amt = this.formatAmount(total_amt,'$');
        });
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
            language: this.language
          }

          var data = {};

          if(this.page_function == 'EditPurchaseOrder' || this.page_function == 'EditGoodsReceivedNote')
          {
            await this.$store.dispatch('purchase/trigger_delete_grchild', payload).then(() => {
              data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_grchild_status']));
            });
          }

          if(data.status == "success")
          {
            this.$nextTick(async ()=>{
              console.log('data',data);
              this.table_function(this.ori_params);
              this.showNotify("positive","Delete successfully");
              this.modify_child = false;
              this.delete_child = false;
              this.deleteLoading = false;
              this.showAddLoading2 = false;
              this.json.InvAmount_Vendor = this.formatAmount(data.response.InvAmount_Vendor,'$');
              this.json.InvNetAmt_Vendor = this.formatAmount(data.response.InvNetAmt_Vendor,'$')
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
        this.jsonChild.Disc1Type = "%";
        this.jsonChild.Disc1Value = "0.00";
        this.jsonChild.Disc2Type = "%";
        this.jsonChild.Disc2Value = "0.00";
        this.jsonChild.NetUnitPrice = "0.0000";
        // this.jsonChild.round_adj = "0.00";
        this.jsonChild.DiscAmt = "0.00";

        this.$nextTick(()=>{
          this.$refs.save_edit_pochild_form.resetValidation()
        });
      },
      async handleModifyItemcode(){
        console.log('modify item');
        this.hv_item = true;

        if(Object.keys(this.selected_row).length == 0)
        {
          this.showNotify('negative', this.$language('C0006'));//'No item selected'
          return;
        }



        this.search_item = false;

        if(!this.search_supplier)
        {
          // this.modify_child = true;
          this.edit_child = false;
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
            TotalPrice: "0.00",
            rebate_value: "0.00",
            price_future: "0.00",
            OrderLotSize: 1,
          }
          this.handleChangeEntryType('Unit')

          this.showAddLoading = true;

          var itemcode = this.selected_row.Itemcode;
          var supplier_code = this.json.Code;
          var po_date = this.json.GRDate;
          var outlet = this.json.loc_group;

          var payload = {
            itemcode: itemcode,
            supplier_code: supplier_code,
            outlet: outlet,
            po_date:po_date,
            user: this.user_name,
            language: this.language
          }

          await this.$store.dispatch('purchase/trigger_get_item_by_itemcode_for_po', payload).then(() => {
            var data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_item_by_itemcode_for_po']));

            var response = data.response;
            console.log('response',response);
            response.Disc1value = this.formatAmount(response.Disc1value,'$');
            response.Disc2Value = this.formatAmount(response.Disc2Value,'$');
            response.UnitPrice = this.formatAmount(response.UnitPrice,'$');
            response.NetUnitPrice = parseFloat(response.NetUnitPrice).toFixed(4);
            response.NetUnitPrice = this.formatAmount(response.NetUnitPrice);
            response.TotalPrice = this.formatAmount('0.00','$');
            response.DiscAmt = this.formatAmount('0.00','$');
            response.rebate_value = this.formatAmount('0.00','$');
            response.price_future = this.formatAmount('0.00','$');
            response.EntryType =  "Unit";
            response.PriceType ="Norm" ;
            response.Qty_foc = "0";
            response.SetQty = "0";
            response.BulkQty = '0';
            response.OrderLotSize = 1;
            response.GroupCost = 0;
            response.Inv_Qty = 1;
            response.Inv_UnitPrice = response.UnitPrice;
            response.Inv_TotalPrice = response.TotalPrice
            response.Inv_Disc1Type = "%";
            response.Inv_Disc1Value = "0.00";
            response.Inv_Disc2Type = "%";
            response.Inv_Disc2Value = "0.00";
            console.log('response',response);
            this.jsonChild = response;
            this.jsonChild.SetQty = this.jsonChild.SetQty==0 ? 1 : this.jsonChild.SetQty;
            this.jsonChild.Inv_TotalPrice = this.jsonChild.Inv_TotalPrice== '0.00' ? (this.jsonChild.Inv_Qty * this.jsonChild.Inv_UnitPrice) : this.jsonChild.Inv_TotalPrice;
            console.log(' this.jsonChild', this.jsonChild);

          });

          this.search.showTable = false;
          // this.jsonChild.step = 2;
          this.showAddLoading = false;
        }
        else
        {
          this.showAddLoading = true;

          // var itemcode = this.selected_row;
          this.json.Code = this.selected_row.Code;
          this.json.SName = this.selected_row.Name;
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
      //       Qty_foc: "0",
      //       BulkQty: "0",
      //       TotalPrice: "0.00",
      //       OrderLotSize: 1,
      //     }
      //     this.handleChangeEntryType('Unit')

      //     this.showAddLoading = true;

      //     var itemcode = this.selected_row.Itemcode;
      //     var supplier_code = this.json.SCode;
      //     var po_date = this.json.PODate;
      //     var outlet = this.json.loc_group;

      //     var payload = {
      //       itemcode: itemcode,
      //       supplier_code: supplier_code,
      //       po_date: po_date,
      //       outlet: outlet,
      //       user: this.user_name,
      //       language: this.language
      //     }

      //     await this.$store.dispatch('purchase/trigger_get_item_by_itemcode_for_po', payload).then(() => {
      //       var data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_item_by_itemcode_for_po']));

      //       var response = data.response;

      //       response.Disc1value = this.formatAmount(response.Disc1value,'$');
      //       response.Disc2Value = this.formatAmount(response.Disc2Value,'$');
      //       response.UnitPrice = this.formatAmount(response.UnitPrice,'$');
      //       response.NetUnitPrice = parseFloat(response.NetUnitPrice).toFixed(4);
      //       response.NetUnitPrice = this.formatAmount(response.NetUnitPrice);
      //       response.TotalPrice = this.formatAmount('0.00','$');
      //       response.DiscAmt = this.formatAmount('0.00','$');
      //       response.EntryType = 'Unit';
      //       response.PriceType = 'Norm';
      //       response.Qty_foc = "0";
      //       response.SetQty = "0";
      //       response.BulkQty = '0';
      //       response.OrderLotSize = 1;


      //       this.jsonChild = response;
      //       this.jsonChild.SetQty = this.jsonChild.SetQty==0 ? '0' : this.jsonChild.SetQty;

      //       if(response.barcode.length > 0)
      //       {
      //         var ary = [];

      //         for(var i in response.barcode)
      //         {
      //           var bc = response.barcode[i];

      //           var obj = {
      //             label: bc,
      //             value: bc
      //           }

      //           ary.push(obj);
      //         }

      //         this.barcode_options = ary;
      //         this.jsonChild.Barcode = this.barcode_options[0].value;
      //       }
      //       else
      //       {
      //         this.jsonChild.Barcode = '';
      //       }
      //     });

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
      close()
      {
        this.jsonChild = {};
        this.search.showTable = false;
        this.modify_child = false;
        this.edit_child = false;
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

            if(this.jsonChild.PriceType =='Norm' && this.jsonChild.SetQty <= 0 ){
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

            // if(this.jsonChild.Disc1Value < 0 ){
            //   this.showAddLoading = false;
            //   this.showNotify("negative", "Disc1Value cannot less than 0.");
            //   return;
            // }

            // if(this.jsonChild.Disc2Value < 0 ){
            //   this.showAddLoading = false;
            //   this.showNotify("negative", "Disc2Value cannot less than 0.");
            //   return;
            // }

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

            var newVal = this.addNewAfterSave;

            await this.savePOChild(newVal);
        }
      },
      async savePOChild(newVal){
        var RefNo = this.json.RefNo;
        var EntryType = this.jsonChild.EntryType;
        var PriceType = this.jsonChild.PriceType;
        var Barcode = this.jsonChild.barcode;
        var Itemcode = this.jsonChild.Itemcode;
        var Qty = this.unformatAmount(this.jsonChild.SetQty);
        var UnitPrice = this.unformatAmount(this.jsonChild.UnitPrice);
        var Disc1Type = this.jsonChild.Disc1Type;
        var Disc1Value = this.unformatAmount(this.jsonChild.Disc1Value);
        var Disc2Type = this.jsonChild.Disc2Type;
        var Disc2Value = this.unformatAmount(this.jsonChild.Disc2Value);
        var NetUnitPrice = this.unformatAmount(this.jsonChild.NetUnitPrice);
        var DiscAmt = this.unformatAmount(this.jsonChild.DiscAmt);
        var TotalPrice = this.unformatAmount(this.jsonChild.TotalPrice);
        var rebate_value = this.unformatAmount(this.jsonChild.rebate_value);

        if(!this.edit_child)
        {
          var payload = {
            "RefNo": RefNo,
            "EntryType": EntryType,
            "PriceType": PriceType,
            "Barcode": Barcode,
            "Itemcode": Itemcode,
            "Qty": Qty,
            "UnitPrice": UnitPrice,
            "Disc1Type": Disc1Type,
            "Disc1Value": Disc1Value,
            "Disc2Type": Disc2Type,
            "Disc2Value": Disc2Value,
            "NetUnitPrice": NetUnitPrice,
            "DiscAmt": DiscAmt,
            "TotalPrice": TotalPrice,
            "rebate_value": rebate_value,
            "user": this.user_name,
            "language": this.language
          }
          var data = {};

          if(!this.edit_child)
          {
            await this.$store.dispatch('purchase/trigger_create_grchild', payload).then(() => {
              data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_grchild_status']));
            });
          }

          var status = data.status

          if(status == "success")
          {
            this.showAddLoading = false;
            this.showNotify("positive", "Created Successfully.");

            if(newVal == 'save')
            {
              this.jsonChild = {};
              this.search.showTable = false;
              this.modify_child = false;
              this.table_function(this.ori_params);
            }
            else if(newVal == 'save&add')
            {
              this.jsonChild = {};
              this.search.showTable = false;
              this.modify_child = false;
              this.table_function(this.ori_params);
              this.addButtonCreatePOChild('item');
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
          var Barcode = this.jsonChild.barcode
          var Line = this.jsonChild.Line;

          var payload = {
            "RefNo": RefNo,
            "Line": Line,
            "EntryType": EntryType,
            "PriceType": PriceType,
            "Barcode": Barcode,
            "Itemcode": Itemcode,
            "Qty": Qty,
            "UnitPrice": UnitPrice,
            "Disc1Type": Disc1Type,
            "Disc1Value": Disc1Value,
            "Disc2Type": Disc2Type,
            "Disc2Value": Disc2Value,
            "NetUnitPrice": NetUnitPrice,
            "DiscAmt": DiscAmt,
            "TotalPrice": TotalPrice,
            "rebate_value": rebate_value,
            "user": this.user_name
          }

          var data = {};

          if(this.page_function == 'EditPurchaseOrder')
          {
            payload.Barcode = this.jsonChild.barcode;
            payload.language = this.language;

            await this.$store.dispatch('purchase/trigger_update_pochild', payload).then(() => {
              data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_pochild_status']));
            });
          }
          else if(this.page_function == 'EditGoodsReceivedNote')
          {
            payload.barcode = this.jsonChild.barcode;
            payload.Inv_Qty = this.unformatAmount(this.jsonChild.Inv_Qty);
            payload.Inv_UnitPrice = this.unformatAmount(this.jsonChild.Inv_UnitPrice);
            payload.Inv_Disc1Type = this.jsonChild.Inv_Disc1Type;
            payload.Inv_Disc1Value = this.unformatAmount(this.jsonChild.Inv_Disc1Value);
            payload.Inv_Disc2Type = this.jsonChild.Inv_Disc2Type;
            payload.Inv_Disc2Value = this.unformatAmount(this.jsonChild.Inv_Disc2Value);
            payload.Inv_NetUnitPrice = this.unformatAmount(this.jsonChild.Inv_NetUnitPrice);
            payload.Inv_TotalPrice = this.unformatAmount(this.jsonChild.Inv_TotalPrice);
            payload.language = this.language;
          console.log('payload',payload);
            await this.$store.dispatch('purchase/trigger_update_grchild', payload).then(() => {
              data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_grchild_status']));
            });
         console.log('update gr child',data);
           var response = data.response
            var set_query = {
              "ERefNo":response.RefNo,
              "ELine": response.Line,
              "Itemcode":response.Itemcode,
              "Itemlink":response.ItemLink,
              "EUser":this.user_name,
              "getuser":this.user_name
            };

          var json_runscript_multi = {
          params:[
          {
            "lookupdb_name": this.session_outlet_guid,
            "trans_group": 'GRN',
            "trans_type": 'grchild',
             "set_query":set_query
          },

        ]
          };

          var payload_runscript_multi ={
          "pass_json": json_runscript_multi
         }


          }

          var status = data.status;
          // var dispatch_response = dispatch_response_array.response.map(item => item.response_json);
          // var runscript_status = dispatch_response.filter((entry)=>{
          //         return entry.status === true;
          //  })
          var response = data.response;
          //  console.log('runscript_status',runscript_status);
          //  console.log('dispatch_response',dispatch_response);
          if(status == "success")
          {
            this.jsonChild = response;

            var Disc1Type = response.Disc1Type;
            var Disc1Value = this.formatAmount(response.Disc1Value,'$')
            var Disc2Type = response.Disc2Type;
            var Disc2Value = this.formatAmount(response.Disc2Value,'$')
            var DiscAmt = this.formatAmount(response.DiscAmt,'$')
            var TotalPrice = this.formatAmount(response.TotalPrice,'$')
            var UnitPrice = this.formatAmount(response.UnitPrice,'$')
            var NetUnitPrice = Number(response.NetUnitPrice).toFixed(4);
            NetUnitPrice = this.formatAmount(NetUnitPrice);
            var Qty = this.formatAmount(response.Qty,'qty');
            var rebate_value = this.formatAmount(response.rebate_value,'$');
            var price_future = this.formatAmount(response.price_future,'$');
            var Inv_Qty = this.formatAmount(response.Inv_Qty,'qty');
            var Inv_UnitPrice = this.formatAmount(response.Inv_UnitPrice,'$');
            var Inv_Disc1Value = this.formatAmount(response.Inv_Disc1Value,'$');
            var Inv_Disc2Value = this.formatAmount(response.Inv_Disc2Value,'$');
            var Inv_NetUnitPrice = Number(response.Inv_NetUnitPrice).toFixed(4);
            var Inv_NetUnitPrice = this.formatAmount(Inv_NetUnitPrice);
            var Inv_TotalPrice = this.formatAmount(response.Inv_TotalPrice,'$');
            var PackSize = this.formatAmount(response.PackSize,'$');
            var BulkQty = this.formatAmount(response.BulkQty,'qty');
            var InvAmount_Vendor = this.formatAmount(response.InvAmount_Vendor,'$');
            var InvNetAmt_Vendor = this.formatAmount(response.InvNetAmt_Vendor,'$');
            var SubTotal1 = this.formatAmount(response.SubTotal1,'$');
            var Total = this.formatAmount(response.Total,'$');
            var total_include_tax = this.formatAmount(response.total_include_tax,'$');

            this.jsonChild.Disc1Type = Disc1Type;
            this.jsonChild.Disc1Value = Disc1Value;
            this.jsonChild.Disc2Type = Disc2Type;
            this.jsonChild.Disc2Value = Disc2Value;
            this.jsonChild.DiscAmt = DiscAmt;
            this.jsonChild.TotalPrice = TotalPrice;
            this.jsonChild.UnitPrice = UnitPrice;
            this.jsonChild.NetUnitPrice = NetUnitPrice;
            this.jsonChild.SetQty = Qty;
            this.jsonChild.rebate_value = rebate_value;
            this.jsonChild.price_future = price_future;
            this.jsonChild.Inv_Qty = Inv_Qty;
            this.jsonChild.Inv_UnitPrice = Inv_UnitPrice;
            this.jsonChild.Inv_Disc1Value = Inv_Disc1Value;
            this.jsonChild.Inv_Disc2Value = Inv_Disc2Value;
            this.jsonChild.Inv_NetUnitPrice = Inv_NetUnitPrice;
            this.jsonChild.Inv_TotalPrice = Inv_TotalPrice;
            this.jsonChild.PackSize = PackSize;
            this.jsonChild.BulkQty = BulkQty;
            this.json.InvAmount_Vendor = InvAmount_Vendor;
            this.json.InvNetAmt_Vendor = InvNetAmt_Vendor;
            this.json.SubTotal1 = SubTotal1;
            this.json.Total = Total;
            this.json.total_include_tax = total_include_tax;
            var dispatch_response = await this.runscript_multi(payload_runscript_multi,'1')
            if(dispatch_response.status){
               console.log('Runscript : All scripts executed successfully');
               this.showNotify('positive','All scripts executed successfully')
            }else{
               console.log('Runscript :', dispatch_response.message);
               this.showNotify('negative',dispatch_response.message);
            }

            if(this.edit_child)
            {
              this.showAddLoading = false;
              this.showNotify("positive", "Updated Successfully.");
              this.$emit('total-updated', Total); //amount updated
              this.table_function(this.ori_params);
              // var payloadGrMain = {
              //     RefNo: this.$route.query.refno,
              //     user: this.user_name,
              //     language: this.language
              //   }
               // var data =await this.getFilterGrmain(payloadGrMain)

                // var filtered_transmain = data.response;


                // filtered_transmain.Total = this.formatAmount(filtered_transmain.Total, '$');
                // filtered_transmain.Subtotal1 = this.formatAmount(filtered_transmain.Subtotal1, '$');
                // filtered_transmain.Discount1 = this.formatAmount(filtered_transmain.Discount1, '$');
                // filtered_transmain.InvAmount_Vendor = this.formatAmount(filtered_transmain.InvAmount_Vendor, '$');
                // filtered_transmain.InvSurchargeDisc_Vendor = this.formatAmount(filtered_transmain.InvSurchargeDisc_Vendor, '$');
                // filtered_transmain.InvNetAmt_Vendor = this.formatAmount(filtered_transmain.InvNetAmt_Vendor, '$');
                // filtered_transmain.total_include_tax = this.formatAmount(filtered_transmain.total_include_tax, '$');

                // this.json.Total = filtered_transmain.Total;
                // this.json.Subtotal1 = filtered_transmain.Subtotal1;
                // this.json.Discount1 = filtered_transmain.Discount1;
                // this.json.InvAmount_Vendor = filtered_transmain.InvAmount_Vendor;
                // this.json.InvSurchargeDisc_Vendor = filtered_transmain.InvSurchargeDisc_Vendor;
                // this.json.InvNetAmt_Vendor = filtered_transmain.InvNetAmt_Vendor;
                // this.json.total_include_tax = filtered_transmain.total_include_tax;


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
      handleDelete(payload){
        this.active_delete_json = payload;
        this.delete_child = true;
      },
      async getGrchild(payload)
      {
        return await this.$store.dispatch('purchase/trigger_get_grchild', payload).then(() => {
          var data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_grchild']));
          return data;
        })
      },
      async getMembercardtype(payload)
      {
        return await this.$store.dispatch('sales/trigger_get_mc_member_card_type', payload).then(() => {
          var data = JSON.parse(JSON.stringify(this.$store.getters['sales/get_member_card_type']));
          return data;
        });
      },
      async getMemberinfo(payload)
      {
        return await this.$store.dispatch('sales/trigger_get_member_info_api', payload).then(async () => {
          var data = JSON.parse(JSON.stringify(this.$store.getters['sales/get_member_info_api']));
          return data;
        });
      },
      async getBarcodeoptions(payload)
      {
        return await this.$store.dispatch('purchase/trigger_read_barcode_by_itemcode', payload).then(() => {
          var data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_read_barcode_by_itemcode']));
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
      async getPomain(payload)
      {
        payload.params.retailer_guid = this.retailer_guid;

        return await this.$store.dispatch('purchase/trigger_ts_pomain', payload).then(() => {
            var data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_ts_pomain']));
            return data;
        });
      },
      async getFilterGrmain(payload)
      {
        return await this.$store.dispatch('purchase/trigger_read_gr_by_refno', payload).then(() => {
            var data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_read_gr_by_refno']));
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
      async getInstalment(payload)
      {
        payload.params.retailer_guid__retailer_guid = this.retailer_guid;

        return await this.$store.dispatch('sales/trigger_get_ts_dpmain_parent', payload).then(() => {
          var data = JSON.parse(JSON.stringify(this.$store.getters['sales/get_ts_dpmain_parent']));
          return data;
        });
      },
      async getItem(payload)
      {
        payload.params.retailer_guid = this.retailer_guid;
        payload.params.limit = '999999';

        return await this.$store.dispatch('purchase/trigger_ml_itemmaster', payload).then(() => {
            var data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_ml_itemmaster']));
            return data;
        });
      },
      handleChangeOutlet(outlet_guid){
        this.json.outlet_id = outlet_guid;
      },
      back(){
        if(this.page_function.endsWith('PurchaseOrder'))
        {
          this.$router.push("PurchaseOrder");
        }
        else if(this.page_function.endsWith('GoodsReceivedNote'))
        {
          this.$router.push("GoodsReceivedNote");
        }
        else if(this.page_function.endsWith('SalesOrder'))
        {
          this.$router.push({name: 'SalesOrder'});
        }
        else if(this.page_function.endsWith('SalesInvoice'))
        {
          this.$router.push({name: 'SalesInvoice'});
        }
        else if(this.page_function.endsWith('Instalment'))
        {
          this.$router.push({name: 'Instalment'});
        }
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
      handleChangeDeliveryDate(delivery_date)
      {
        this.json.delivery_date = delivery_date;
      },
      handleChangeDocDate(doc_date){
        this.json.DocDate = doc_date;
      },
      handleChangeGrDate(gr_date)
      {
        this.json.GRDate = gr_date;
      },
      async handleAction(json)
      {
          this.showAddLoading = true;
          if(json.PriceType == 'RTV'){

          }else if(json.PriceType == 'VFOC'){

          }else{
            this.modify_child = true;
          }
          // this.modify_child = true;
          this.edit_child = true;

          var cpayload = {
            params: {
              refno: json.RefNo,
            }
          }

          var cdata = await this.getGrchild(cpayload);
          var line = json.Line;

          var filterPochild = cdata.data.filter((entry)=>{
            return entry.Line == line;
          })

          var barcode_ary = [];

          var payload = {
            params: {
              itemcode: filterPochild[0].Itemcode,
              language: this.language
            }
          }

          var data = await this.getBarcodeoptions(payload);

          for(var i in data.data)
          {
            var res = data.data[i];
            var obj = {
              label: res.Barcode,
              value: res.Barcode
            }

            barcode_ary.push(obj);
          }

          this.barcode_options = barcode_ary;

          this.jsonChild = filterPochild[0];
          this.jsonChild.UnitPrice = this.formatAmount(this.jsonChild.UnitPrice,'$');
          this.jsonChild.DiscAmt = this.formatAmount(this.jsonChild.DiscAmt,'$');
          this.jsonChild.Disc1Value = this.formatAmount(this.jsonChild.Disc1Value,'$');
          this.jsonChild.Disc2Value = this.formatAmount(this.jsonChild.Disc2Value,'$');
          this.jsonChild.NetUnitPrice = Number(this.jsonChild.NetUnitPrice).toFixed(4);
          this.jsonChild.NetUnitPrice = this.formatAmount(this.jsonChild.NetUnitPrice);
          this.jsonChild.TotalPrice = this.formatAmount(this.jsonChild.TotalPrice,'$');
          this.jsonChild.PackSize = this.formatAmount(this.jsonChild.PackSize,'$');
          this.jsonChild.BulkQty = this.formatAmount(this.jsonChild.BulkQty,'qty');
          this.jsonChild.rebate_value = this.formatAmount(this.jsonChild.rebate_value,'$');
          this.jsonChild.price_future = this.formatAmount(this.jsonChild.price_future,'$');
          this.jsonChild.SetQty = this.formatAmount(this.jsonChild.Qty,'qty');
          this.jsonChild.barcode = this.jsonChild.barcode;
          this.jsonChild.Inv_Qty = this.formatAmount(this.jsonChild.Inv_Qty,'qty');
          this.jsonChild.Inv_UnitPrice = this.formatAmount(this.jsonChild.Inv_UnitPrice,'$');
          this.jsonChild.Inv_Disc1Value = this.formatAmount(this.jsonChild.Inv_Disc1Value,'$');
          this.jsonChild.Inv_Disc2Value = this.formatAmount(this.jsonChild.Inv_Disc2Value,'$');
          this.jsonChild.Inv_NetUnitPrice = Number(this.jsonChild.Inv_NetUnitPrice).toFixed(4);
          this.jsonChild.Inv_NetUnitPrice = this.formatAmount(this.jsonChild.Inv_NetUnitPrice);
          this.jsonChild.Inv_TotalPrice = this.formatAmount(this.jsonChild.Inv_TotalPrice,'$');
          this.jsonChild.inv_gr_variance = this.calculate_variance(filterPochild[0].TotalPrice, filterPochild[0].Inv_TotalPrice);
          this.unit = this.jsonChild.EntryType=='Unit';

          this.jsonChild.step = 2;

          this.showAddLoading = false;
          if(json.PriceType == 'RTV'){
             this.rtv_dialog = true;
             this.rtv = true;
             this.get_tax_options();
             this.grn_reason_options();

          }else if(json.PriceType == 'VFOC'){
             this.rtv_dialog = true;
             this.vfoc = true;

          }else{
            this.modify_child = true;
          }
          // this.modify_child = true;
          this.edit_child = true;

        // }
        // else
        // {
        //   this.$router.push({ name: 'EditGoodsReceivedNoteDetails', query: { refno: payload.RefNo, line: payload.Line } })
        // }
      },
      calculate_variance(grTotal, invTotal)
      {
        var gr_total = this.unformatAmount(grTotal);
        var inv_total = this.unformatAmount(invTotal);
        var inv_gr_variance = this.formatAmount(gr_total - inv_total, '$')
        return inv_gr_variance;
      },
      async addButtonCreatePOChild(newVal){
        if(this.json.BillStatus == 1)
        {
            this.showNotify("negative","This Doc already posted.");
            return;
        }

        this.selected_row = {};
        this.search.value = '';
        this.search_item = newVal=='item' || newVal=='supplier';
        this.search_supplier = newVal=='supplier';

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
      handleTableChange: function(newVal)
      {
            var new_params = this.$pluginsTableParams(newVal)

            var payload = {
                params : new_params
            };

            this.ori_params = payload;
            this.table_function(payload);
      },
     async table_function(payload){
          var table_column = [
          {
                  name: 'select',
                  required: true,
                  label: this.$language('D0160'),//'Select'
                  align: 'center',
                  sortable: false,
                  field: 'select',
                  format_child: '',
                  tooltip: ''
              },
              {
                  name: 'action',
                  required: true,
                  label: 'Actions',
                  align: 'left',
                  sortable: false,
                  field: 'action',
                  format_child: '',
                  tooltip: ''
              },
              // {
              //     name: 'Posted',
              //     required: true,
              //     label: 'Posted',
              //     align: 'center',
              //     sortable: true,
              //     field: 'Posted',
              //     format_child: '',
              //     tooltip: '',
              //     headerStyle: 'text-align: center;'
              // },
              {
                  name: 'group_status',
                  required: true,
                  label: 'G',
                  align: 'center',
                  sortable: true,
                  field: 'group_status',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'GroupNo',
                  required: true,
                  label: 'G.Seq',
                  align: 'right',
                  sortable: true,
                  field: 'GroupNo',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
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
                  headerStyle: 'text-align: center;',
                  sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
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
              // {
              //     name: 'PORefNo',
              //     required: true,
              //     label: 'PO Refno',
              //     align: 'left',
              //     sortable: true,
              //     field: 'PORefNo',
              //     format_child: '',
              //     tooltip: '',
              //     headerStyle: 'text-align: center;'
              // },
              // {
              //     name: 'POLine',
              //     required: true,
              //     label: 'POLine',
              //     align: 'right',
              //     sortable: true,
              //     field: 'POLine',
              //     format_child: '',
              //     tooltip: '',
              //     headerStyle: 'text-align: center;'
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
                  headerStyle: 'text-align: center;'
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
                  name: 'rebate_value',
                  required: true,
                  label: 'Rebate',
                  align: 'right',
                  sortable: true,
                  field: 'rebate_value',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
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
                  headerStyle: 'text-align: center;',
                  sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
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
                  sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
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
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'UnitPrice',
                  required: true,
                  label: 'Unit Price',
                  align: 'right',
                  sortable: true,
                  field: 'UnitPrice',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
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
                  sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
              },
              {
                  name: 'Disc1Type',
                  required: true,
                  label: 'Disc 1 Type',
                  align: 'right',
                  sortable: true,
                  field: 'Disc1Type',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
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
                  sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
              },
              {
                  name: 'Disc2Type',
                  required: true,
                  label: 'Disc 2 Type',
                  align: 'right',
                  sortable: true,
                  field: 'Disc2Type',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'NetUnitPrice',
                  required: true,
                  label: 'Net U/Price',
                  align: 'right',
                  sortable: true,
                  field: 'NetUnitPrice',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
              },
              // {
              //     name: 'sst_code',
              //     required: true,
              //     label: 'SST Code',
              //     align: 'left',
              //     sortable: true,
              //     field: 'sst_code',
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
              //     headerStyle: 'text-align: center;'
              // },
              // {
              //     name: 'sst_amount',
              //     required: true,
              //     label: 'SST Amount',
              //     align: 'right',
              //     sortable: true,
              //     field: 'sst_amount',
              //     format_child: '',
              //     tooltip: '',
              //     headerStyle: 'text-align: center;'
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
              //     headerStyle: 'text-align: center;'
              // },
              {
                  name: 'TotalPrice',
                  required: true,
                  label: 'Total Price',
                  align: 'right',
                  sortable: true,
                  field: 'TotalPrice',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
              },
              {
                  name: 'EntryType',
                  required: true,
                  label: 'Entry Type',
                  align: 'left',
                  sortable: true,
                  field: 'EntryType',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
              },
              // {
              //     name: 'unit_landed_cost',
              //     required: true,
              //     label: 'Unit Landed Cost',
              //     align: 'right',
              //     sortable: true,
              //     field: 'unit_landed_cost',
              //     format_child: '',
              //     tooltip: '',
              //     headerStyle: 'text-align: center;'
              // },
              // {
              //     name: 'unit_volume',
              //     required: true,
              //     label: 'Unit Volume',
              //     align: 'right',
              //     sortable: true,
              //     field: 'unit_volume',
              //     format_child: '',
              //     tooltip: '',
              //     headerStyle: 'text-align: center;'
              // },
              // {
              //     name: 'unit_volume_total',
              //     required: true,
              //     label: 'Unit Volume Total',
              //     align: 'right',
              //     sortable: true,
              //     field: 'unit_volume_total',
              //     format_child: '',
              //     tooltip: '',
              //     headerStyle: 'text-align: center;'
              // },
              // {
              //     name: 'gst_manual',
              //     required: true,
              //     label: 'GST Manual',
              //     align: 'center',
              //     sortable: true,
              //     field: 'gst_manual',
              //     format_child: '',
              //     tooltip: '',
              //     headerStyle: 'text-align: center;'
              // },
              {
                  name: 'gst_tax_code',
                  required: true,
                  label: 'GST Code',
                  align: 'left',
                  sortable: true,
                  field: 'gst_tax_code',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
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
                  sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
              },
              // {
              //     name: 'expiry_date',
              //     required: true,
              //     label: 'Expiry Date',
              //     align: 'left',
              //     sortable: true,
              //     field: 'expiry_date',
              //     format_child: '',
              //     tooltip: '',
              //     headerStyle: 'text-align: center;'
              // },
              {
                  name: 'Colour',
                  required: true,
                  label: 'Colour',
                  align: 'left',
                  sortable: true,
                  field: 'Colour',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
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
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'ArticleNo',
                  required: true,
                  label: 'ArticleNo',
                  align: 'left',
                  sortable: true,
                  field: 'ArticleNo',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
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
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'CostAftDisc',
                  required: true,
                  label: 'CostAftDisc',
                  align: 'right',
                  sortable: true,
                  field: 'CostAftDisc',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
              },
              {
                  name: 'CostFactor',
                  required: true,
                  label: 'CostFactor',
                  align: 'right',
                  sortable: true,
                  field: 'CostFactor',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
              },
              {
                  name: 'DiscValue',
                  required: true,
                  label: 'DiscValue',
                  align: 'right',
                  sortable: true,
                  field: 'DiscValue',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
              },
              {
                  name: 'InvActCost',
                  required: true,
                  label: 'InvActCost',
                  align: 'right',
                  sortable: true,
                  field: 'InvActCost',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
              },
              {
                  name: 'InvActTotCost',
                  required: true,
                  label: 'InvActTotCost',
                  align: 'right',
                  sortable: true,
                  field: 'InvActTotCost',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
              },
              {
                  name: 'RefNo',
                  required: true,
                  label: 'RefNo',
                  align: 'left',
                  sortable: true,
                  field: 'RefNo',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'SysAvgCost',
                  required: true,
                  label: 'SysAvgCost',
                  align: 'right',
                  sortable: true,
                  field: 'SysAvgCost',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
              },
              {
                  name: 'SysQOH',
                  required: true,
                  label: 'SysQOH',
                  align: 'right',
                  sortable: true,
                  field: 'SysQOH',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
              },
              {
                  name: 'WeightAvgCost',
                  required: true,
                  label: 'WeightAvgCost',
                  align: 'right',
                  sortable: true,
                  field: 'WeightAvgCost',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
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
                  headerStyle: 'text-align: center;'
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
                  headerStyle: 'text-align: center;'
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
                  headerStyle: 'text-align: center;'
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
                  headerStyle: 'text-align: center;'
              },
              // {
              //     name: 'AutoClosePO',
              //     required: true,
              //     label: 'Auto Close PO',
              //     align: 'center',
              //     sortable: true,
              //     field: 'AutoClosePO',
              //     format_child: '',
              //     tooltip: '',
              //     headerStyle: 'text-align: center;'
              // },
              // {
              //     name: 'BasketQty',
              //     required: true,
              //     label: 'BasketQty',
              //     align: 'right',
              //     sortable: true,
              //     field: 'BasketQty',
              //     format_child: '',
              //     tooltip: '',
              //     headerStyle: 'text-align: center;'
              // },
          ];

          if(this.json.BillStatus == 1)
          {
            table_column = table_column.filter((entry)=>{
              return entry.field != 'select';
            })
          }

          this.table_column = table_column;

          this.$nextTick(async ()=>{
            payload.params.RefNo = this.$route.query.refno;
            if(payload.params.ordering == "")
            {
              payload.params.ordering = "Line"
            }

            if(payload.params.ordering[0] == "-")
            {
              payload.params.sort_by = payload.params.ordering.slice(1);
              payload.params.sort_type = "Desc"
            }
            else
            {
              payload.params.sort_by = payload.params.ordering
              payload.params.sort_type = "Asc"
            }

            var data = {};

            if(this.page_function == 'CreateGoodsReceivedNote')
            {
              data = {
                  "data": []
              };
            }else{
              console.log('payload',payload);
              data = await this.getGrchild(payload);
              console.log('data',data);
              var results = data.data;

              this.supplier_readonly = results.length > 0;

              for(var i in results)
              {
                var obj = results[i];

                obj.select = false;
                obj.GroupNo = this.formatAmount(obj.GroupNo ,'qty');
                obj.Line = this.formatAmount(obj.Line ,'qty');
                obj.rebate_value = this.formatAmount(obj.rebate_value ,'$');
                obj.PackSize = this.formatAmount(obj.PackSize ,'qty');
                obj.Qty = this.formatAmount(obj.Qty ,'qty');
                obj.UnitPrice = this.formatAmount(obj.UnitPrice ,'$');
                obj.Disc1Value = this.formatAmount(obj.Disc1Value ,'$');
                obj.Disc2Value = this.formatAmount(obj.Disc2Value ,'$');
                obj.NetUnitPrice = this.formatAmount(obj.NetUnitPrice ,'$');
                obj.TotalPrice = this.formatAmount(obj.TotalPrice ,'$');
                obj.price_future = this.formatAmount(obj.price_future ,'$');
                obj.CostAftDisc = this.formatAmount(obj.CostAftDisc ,'$');
                obj.CostFactor = this.formatAmount(obj.CostFactor ,'$');
                obj.DiscValue = this.formatAmount(obj.DiscValue ,'$');
                obj.InvActCost = this.formatAmount(obj.InvActCost ,'$');
                obj.InvActTotCost = this.formatAmount(obj.InvActTotCost ,'$');
                obj.SysAvgCost = this.formatAmount(obj.SysAvgCost ,'$');
                obj.SysQOH = this.formatAmount(obj.SysQOH ,'qty');
                obj.WeightAvgCost = this.formatAmount(obj.WeightAvgCost ,'$');
              }
            }

            // if(payload.params.ordering == "")
            // {
            //   payload.params.ordering = "-updated_at"
            // }

            this.table_data = {
              "data": {
                    "count": 100,
                    "next": null,
                    "previous": null,
                    "results": data.data
                }
            };

            if(data.data.length == 0)
            {
              this.group_button = false;
            }
            else
            {
              this.group_button = true;
            }

            var mobile = this.$q.screen.width < 600

            if(mobile){

            var mobile_child_data = data.data
            const groupsObject = {};

            const Nogroup = {};
            const NogroupList = [];

            mobile_child_data.forEach((item) => {
            // console.log('item',item);
            // Extract the group name from the item
              const groupName = item.GroupNo;

              // If the group doesn't exist, create it
              if (!groupsObject[groupName] && groupName != 0) {
                groupsObject[groupName] = { name: groupName, items: [],Line:item.Line};
              }
              if ( groupName == 0) {
                Nogroup[groupName] = { name: groupName, items: [] };
              }

            // Add the item to the corresponding group
            if(groupsObject[groupName] !== undefined){
              // groupsObject[groupName].Line = item.Line
              groupsObject[groupName].items.push(item);
            }
            if(Nogroup[groupName] !== undefined){
              Nogroup[groupName].Line = item.Line
              Nogroup[groupName].items.push(item);
              NogroupList.push(Nogroup[groupName])
            }
            });

            // Convert the groupsObject into an array
            var groups = Object.values(groupsObject);
            var ungroup = NogroupList

            var combinedArray = [...groups, ...ungroup];
             combinedArray.sort((a, b) => (a.Line < b.Line ? -1 : 1));
              // console.log('groups',groups);
              this.results = combinedArray
          }

        });
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

        // if(this.page_function == 'CreatePurchaseOrder')
        // {
        //   var currentdate = new Date();
        //   var current_date_format = currentdate.getFullYear()+"-"+('0' + (currentdate.getMonth()+1)).slice(-2)+"-"+('0' + currentdate.getDate()).slice(-2)
        //   +" "+('0' + currentdate.getHours()).slice(-2) + ":" + ('0' + currentdate.getMinutes()).slice(-2) + ":" + ('0' + currentdate.getSeconds()).slice(-2);

        //   if((this.json.delivery_date+" :00:00:00:00") < current_date_format)
        //   {
        //     this.showNotify("negative","Delivery date cannot earlier than current date.")
        //     this.showAddLoading = false;
        //     return;
        //   }//checking for delivery date cannot smaller than current date.
        // }

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
          var Name = this.json.Name;
          var GRDate = this.json.GRDate;
          var DocDate = this.json.DocDate;
          var loc_group = this.json.loc_group;
          var Location = this.json.Location;
          var DONo = this.json.DONo;
          var InvNo = this.json.InvNo;
          // var IssueStamp = this.json.IssueStamp;
          // var Remark = this.json.Remark;

          var payload = {
            "Code":Code,
            "Name":Name,
            "GRDate":GRDate,
            "DocDate":DocDate,
            "loc_group":loc_group,
            "Location":Location,
            "DONo":DONo,
            "InvNo":InvNo,
            "language": this.language,
            // "Remark": Remark,
            // "laststamp":current_date_format,
            // "IssuedBy": this.user_name
          };

          var data = {};

          if(this.page_function.endsWith('PurchaseOrder'))
          {
            payload.doc_date = this.json.doc_date;
            payload.delivery_date = this.json.delivery_date;
            payload.type = 'P';

            await this.$store.dispatch('purchase/trigger_create_ts_pomain', payload).then(() => {
              data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_ts_pomain_status']));
            });
          }
          else if(this.page_function=='CreateGoodsReceivedNote')
          {
            await this.$store.dispatch('purchase/trigger_create_grmain', payload).then(() => {
              data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_grmain_status']));
            });
          }
          else if(this.page_function=='EditGoodsReceivedNote')
          {
            payload.RefNo = this.json.RefNo;
            payload.vendor_amt_exc_tax = this.unformatAmount(this.json.input_amt_exc_tax);
            payload.vendor_gst = this.unformatAmount(this.json.input_gst);

            await this.$store.dispatch('purchase/trigger_update_grmain', payload).then(() => {
              data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_grmain_status']));
            });
          }

          var status = data.status

          if(status == "success")
          {
            this.showAddLoading = false;
            var mobile = this.$q.screen.width < 600

            if(this.page_function=='CreateGoodsReceivedNote')
            {
              this.showNotify("positive", "Created Successfully.");

              if(mobile)
              {
                this.$router.push({ name: 'confirm', query: { refno: data.response.RefNo, header: 'GR', type:'create' }})
              }
              else
              {
                this.$router.push({ name: 'EditGoodsReceivedNote', query: { refno: data.response.RefNo } })
              }
            }
            else if(this.page_function=='EditGoodsReceivedNote')
            {
              if(mobile)
              {
                this.$router.push({ name: 'confirm', query: { refno: data.response.RefNo, header: 'GR', type:'update' }})
              }
              else
              {
                this.showNotify("positive", "Updated Successfully.");
                var refno = data.response.RefNo;

                var cpayload =
                {
                  params: {
                    refno: this.$route.query.refno
                  }
                }

                var cdata = await this.getGrchild(cpayload);
                var cresults = cdata.data;

                var payload = {
                  RefNo: refno,
                  user: this.user_name,
                  language: this.language
                }

                var data = await this.getFilterGrmain(payload)
                var filtered_transmain = data.response;

                filtered_transmain.rebate_amt = this.formatAmount(filtered_transmain.rebate_amt, '$');
                filtered_transmain.Total = this.formatAmount(filtered_transmain.Total, '$');
                filtered_transmain.total_include_tax = this.formatAmount(filtered_transmain.total_include_tax, '$');
                filtered_transmain.gst_tax_sum = this.formatAmount(filtered_transmain.gst_tax_sum, '$');
                filtered_transmain.Subtotal1 = this.formatAmount(filtered_transmain.Subtotal1, '$');
                filtered_transmain.rounding_adj = this.formatAmount(filtered_transmain.rounding_adj, '$');
                filtered_transmain.input_amt_exc_tax = this.formatAmount(filtered_transmain.input_amt_exc_tax, '$')
                filtered_transmain.input_gst = this.formatAmount(filtered_transmain.input_gst, '$')
                filtered_transmain.input_amt_inc_tax = this.formatAmount(filtered_transmain.input_amt_inc_tax, '$')
                filtered_transmain.gst_tax_rate = this.formatAmount(filtered_transmain.gst_tax_rate, '$')
                filtered_transmain.gst_adj = this.formatAmount(filtered_transmain.gst_adj, '$')
                filtered_transmain.landed_cost_total = this.formatAmount(filtered_transmain.landed_cost_total, '$')
                filtered_transmain.Discount1 = this.formatAmount(filtered_transmain.Discount1, '$')
                filtered_transmain.InvAmount_Vendor = this.formatAmount(filtered_transmain.InvAmount_Vendor, '$')
                filtered_transmain.InvSurchargeDisc_Vendor = this.formatAmount(filtered_transmain.InvSurchargeDisc_Vendor, '$')
                filtered_transmain.InvNetAmt_Vendor = this.formatAmount(filtered_transmain.InvNetAmt_Vendor, '$')

                this.json = filtered_transmain;

                var filter_outlet = this.location_options.filter((entry)=>{
                  return entry.value == this.json.loc_group;
                })

                this.json.ChildNo = this.formatAmount(cresults.length,'qty');
                this.json.Branch = filter_outlet[0].value;
                this.json.step = step;
                this.json.Remark = this.json.Remark==null ? '' : this.json.Remark;
              }
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


      return;
       new Promise(resolve => {
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
                    onDismiss: resolve,
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
                    onDismiss: resolve,
                })
            }
          });

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

        console.log('jsonChild',this.jsonChild);
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
          // const firstErrorMessage = errorItems[0].message || "Error in script execution";
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
      // async runscript_multi(payload){
      //   var object_pass = {
      //         dispatch: 'purchase/trigger_runtime_runscript_multi',
      //         getter: 'purchase/get_runscript_multi_status',
      //         app: this,
      //         payload: payload,
      //     };
      //     var dispatch_response = await this.$dispatch(object_pass);
      //    return dispatch_response
      // },

      generateDatePickerOptions(date){
        var currentdate = new Date();
        var current_date_format = currentdate.getFullYear()+"/"+('0' + (currentdate.getMonth()+1)).slice(-2)+"/"+('0' + currentdate.getDate()).slice(-2);
          if(this.json.DocDate){
              /* change date format yyyy-mm-dd to yyyy/mm/dd */
              var DocDate =  this.json.DocDate.replace(/-/g,"/");
              if(DocDate !== current_date_format){
                return date <= current_date_format
              }else{
                return date <= DocDate
              }
            }else{
              return date
            }

      },
      generateDatePickerGROptions(date){
        var currentdate = new Date();
        var current_date_format = currentdate.getFullYear()+"/"+('0' + (currentdate.getMonth()+1)).slice(-2)+"/"+('0' + currentdate.getDate()).slice(-2);
          if(this.json.GRDate){
              /* change date format yyyy-mm-dd to yyyy/mm/dd */
              var GRDate =  this.json.GRDate.replace(/-/g,"/");
              if(GRDate !== current_date_format){
                return date <= current_date_format
              }else{
                return date <= GRDate
              }
            }else{
              return date
            }
      },
      async handleChangeCheckbox()
      {
        this.$nextTick(async ()=>{
          var row = this.table_data.data.results;
          var select_list = [];

          for(var index in row)
          {
            select_list.push(row[index].select);
          }

          this.generate_sn_readonly = !select_list.includes(true);
          this.select_all = (select_list.length > 0) ? (!select_list.includes(false)) : false;
        });

        if(this.json.BillStatus !== 1)
        {
          // this.update_weight.loading = true;

          this.$nextTick(async ()=>{
            var have_sn = [];
            var row = this.table_data.data.results;

            for(var index in row)
            {
              if(row[index].select == true)
              {
                var transchild_guid = row[index].transchild_guid;

                var payload = {
                  params: {
                    trans_child: transchild_guid
                  }
                }

                // var data = await this.getSn(payload);
                // var results = data.data.results;
                // if(results.length > 0)
                // {
                //   have_sn.push(true);
                // }
                // else
                // {
                //   have_sn.push(false);
                // }

                have_sn = ['false'];
              }
            }

            // this.update_weight.readonly = (have_sn.length > 0) ? (have_sn.includes(false)) : true;
            // this.update_weight.loading = false;
          });
        }

        this.showAddLoading = false;
      },
      handleChangeSelectAll(newVal){
        this.select_all = newVal;
        var results = this.table_data.data.results;

        if(this.select_all)
        {
          for(var index in results)
          {
              results[index].select = true;
          }

          this.handleChangeCheckbox();
        }
        else
        {
          this.generate_sn_readonly = true;

          for(var index in results)
          {
            results[index].select = false;
          }

          // this.update_weight.readonly = true;
        }
      },
      async handleChangeGroup()
      {
           console.log('Group');
           var RefNo = this.json.RefNo;

        var Line = [];
        if(this.$q.screen.width > 599){
           var row =this.table_data.data.results;
           var allSelectFalse = row.every(item => item.select === false);
           if (allSelectFalse) {
              this.showNotify('negative', this.$language('C0006'));//No item select
              return;
           }
          for(var index in row)
          {
            if(row[index].select)
            {
              Line.push(row[index].Line);
            }
          }
        }else{
          var row = this.results
          var allSelectFalse = row.every(group => group.items.every (item=> item.select === false));
          if (allSelectFalse) {
            this.showNotify('negative', this.$language('C0006'));//No item select
            return;
          }
          for(var index in row)
          {
             var items = row[index].items
            for(var i in items){
              if(items[i].select)
              {
                Line.push(items[i].Line);
              }
            }
          }
        }

        var payload = {
          "pass_json":{
              RefNo: RefNo,
              Line: Line,
              language: this.language
          }
        };
        this.showAddLoading = true;

        var object_pass = {
              dispatch: 'purchase/trigger_post_grn_item_tagging',
              getter: 'purchase/get_grn_item_tagging_status',
              app: this,
              payload: payload,
         };
         var dispatch_response = await this.$dispatch(object_pass);
        console.log('dispatch_response',dispatch_response);


        if(dispatch_response.status)
        {

            var response_msg = dispatch_response.response.msg
            this.showNotify("positive", response_msg);
            this.table_data = {
                "data": {
                      "count": 100,
                      "next": null,
                      "previous": null,
                      "results": []
                  }
              };

            this.$nextTick(async()=>{
              await this.table_function(this.ori_params);
              this.showAddLoading = false;
            });
            // this.table_function(this.ori_params);
            // this.showAddLoading = false;

        }
        else
        {
          console.log('dispatch_response',dispatch_response);
          this.showAddLoading = false;
          var response = JSON.parse(dispatch_response.response)

          this.showNotify('negative', response.detail);

        }
      },
      async handleChangeUngroup()
      {
           var RefNo = this.json.RefNo;
           var Line = [];

        if(this.$q.screen.width > 599){
          var row = this.table_data.data.results;
          var allSelectFalse = row.every(item => item.select === false);
           console.log('allSelectFalse',allSelectFalse);
          if (allSelectFalse) {
          this.showNotify('negative', this.$language('C0006'));//No item select
          return;
        }

        for(var index in row)
        {
          if(row[index].select)
          {
            Line.push(row[index].Line);
          }
        }

        }else{
          var row = this.results
          var allSelectFalse = row.every(group => group.items.every (item=> item.select === false));
          if (allSelectFalse) {
          this.showNotify('negative', this.$language('C0006'));//No item select
          return;
        }

        for(var index in row)
        {
            var items = row[index].items
            for(var i in items){
            if(items[i].select)
          {
            Line.push(items[i].Line);
          }
          }

        }

        }

        var payload = {
          "pass_json":{
            RefNo: RefNo,
            Line: Line,
            language: this.language
          }
        }


        var object_pass = {
              dispatch: 'purchase/trigger_post_grn_item_untagging',
              getter: 'purchase/get_grn_item_untagging_status',
              app: this,
              payload: payload,
         };



        var dispatch_response = await this.$dispatch(object_pass);


        console.log('dispatch_response',dispatch_response);

        if(dispatch_response.status)
        {
          this.showAddLoading = false;
          this.table_data = {
              "data": {
                    "count": 100,
                    "next": null,
                    "previous": null,
                    "results": []
                }
            };
          this.table_function(this.ori_params)
          console.log('dispatch_response',dispatch_response);
          this.showNotify("positive", dispatch_response.response.msg);
        }
        else
        {
          var response = JSON.parse(dispatch_response.response)

          this.showNotify('negative', response.detail);

          this.showAddLoading = false;
        }
      },
      async surcharge_table_function(){
        var mobile = this.$q.screen.width < 600
        var surcharge_table_column = [

              {
                  name: 'action',
                  required: true,
                  label: 'Actions',
                  align: 'center',
                  sortable: false,
                  field: 'action',
                  format_child: '',
                  tooltip: ''
              },
              {
                name: 'sequence',
                required: true,
                label: 'No',
                align: 'right',
                sortable: false,
                field: 'sequence',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center; min-width:45px;'
              },
              {
                name: 'build_into_cost',
                required: true,
                label: 'Shared',
                align: 'center',
                sortable: false,
                field: 'build_into_cost',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center; min-width:45px;'
            },
              {
                  name: 'Code',
                  required: true,
                  label: 'Code',
                  align: 'left',
                  sortable: true,
                  field: 'Code',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: left; min-width:100px;',
                  sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
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
                  headerStyle: 'text-align: left; min-width:200px;',
                  sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
              },
              {
                  name: 'dn',
                  required: true,
                  label: 'DN',
                  align: 'center',
                  sortable: false,
                  field: 'dn',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center; min-width:45px',
                  sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
              },
              {
                name: 'surcharge_disc_type',
                required: true,
                label: '',
                align: 'center',
                sortable: false,
                field: 'surcharge_disc_type',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center; width: 35px;',
                sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
              },
              {
                name: 'surcharge_disc_value',
                required: true,
                label: 'Value',
                align: 'right',
                sortable: true,
                field: 'surcharge_disc_value',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
              {
                  name: 'Value_Calculated',
                  required: true,
                  label: 'Calculated',
                  align: 'right',
                  sortable: true,
                  field: 'Value_Calculated',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  value:'0.00'
              },
              {
                  name: 'Value_After',
                  required: true,
                  label: 'Value After',
                  align: 'right',
                  sortable: true,
                  field: 'Value_After',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'landed_cost',
                  required: true,
                  label: 'Landed Cost',
                  align: 'right',
                  sortable: false,
                  field: 'landed_cost',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'prorate_by_unit_volume',
                  required: true,
                  label: 'Prorate by Unit Volume',
                  align: 'right',
                  sortable: false,
                  field: 'prorate_by_unit_volume',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;width:40px'
              }
          ];

          if(this.json.BillStatus == 1)
          {
            surcharge_table_column = surcharge_table_column.filter((entry)=>{
              return entry.field != 'action';
            })
          }
          this.surcharge_table_column = surcharge_table_column;
          this.inv_surcharge_table_column = surcharge_table_column;
          this.$nextTick(async ()=>{
            var data = {};
            if(this.page_function == 'CreateGoodsReceivedNote')
            {
              data = {
                  "data": []
              };
            }else{
              var payload = {
                "pass_json": {
                  refno: this.json.RefNo,
                  trans_type: 'GRN'
                }
              };

              var object_pass = {
                  "dispatch": 'purchase/trigger_post_get_surcharge_discount', //refer to path/function_name in store actions.js
                  "getter": 'purchase/get_surcharge_discount', //refer to path/function_name in store getters.js
                  "app": this, //compulsory passed variable
                  "payload": payload //payload that needed to use in store actions.js
              };

              var dispatch_response = await this.$dispatch(object_pass);
              if(dispatch_response.status)
              {
                data = dispatch_response
                var results = data.response;
                this.totalDisc = this.json.Discount1
                for(var i in results)
                {
                  var obj = results[i];
                  obj.sequence = this.formatAmount(obj.sequence ,'qty');
                  obj.Value_Calculated = this.formatAmount(obj.Value_Calculated ,'$');
                  obj.surcharge_disc_value = this.formatAmount(obj.surcharge_disc_value ,'$');
                  obj.Value_After = this.formatAmount(obj.Value_After ,'$');
                  obj.landed_cost = this.formatAmount(obj.landed_cost ,'$');
                  obj.build_into_cost = obj.build_into_cost  == 0 ? false:true;
                  obj.dn = obj.dn  == 0 ? false:true;
                  obj.prorate_by_unit_volume = obj.prorate_by_unit_volume  == 0 ? false:true;
                }

              }else
              {
                //fail condition
                  data = {
                    "data": []
                };

              }

            }

            this.surcharge_table_data = {
              "data": {
                    "count": 100,
                    "next": null,
                    "previous": null,
                    "results": data.response
                }
            };

            if(data.response.length == 0)
            {
              this.group_button = false;
            }
            else
            {
              this.group_button = true;
            }

            if(mobile){
              this.surcharge_disc_array =data.response
            }


        });
      },
      async surcharge_IVNtable_function(){
        var mobile = this.$q.screen.width < 600
        var surcharge_table_column = [
            {
                name: 'action',
                required: true,
                label: 'Actions',
                align: 'center',
                sortable: false,
                field: 'action',
                format_child: '',
                tooltip: ''
            },
            {
              name: 'sequence',
              required: true,
              label: 'No',
              align: 'right',
              sortable: false,
              field: 'sequence',
              format_child: '',
              tooltip: '',
              headerStyle: 'text-align: center; min-width:45px;'
            },
            {
              name: 'build_into_cost',
              required: true,
              label: 'Shared',
              align: 'center',
              sortable: false,
              field: 'build_into_cost',
              format_child: '',
              tooltip: '',
              headerStyle: 'text-align: center; min-width:45px;'
            },
            {
                name: 'Code',
                required: true,
                label: 'Code',
                align: 'left',
                sortable: true,
                field: 'Code',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: left; min-width:100px;',
                sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
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
                headerStyle: 'text-align: left; min-width:200px;',
                sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
            },
            {
                name: 'dn',
                required: true,
                label: 'DN',
                align: 'center',
                sortable: false,
                field: 'dn',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center; min-width:45px',
                sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
            },
            {
              name: 'surcharge_disc_type',
              required: true,
              label: '',
              align: 'center',
              sortable: false,
              field: 'surcharge_disc_type',
              format_child: '',
              tooltip: '',
              headerStyle: 'text-align: center; width: 35px;',
              sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
            },
            {
              name: 'surcharge_disc_value',
              required: true,
              label: 'Value',
              align: 'right',
              sortable: true,
              field: 'surcharge_disc_value',
              format_child: '',
              tooltip: '',
              headerStyle: 'text-align: center;'
            },
            {
                name: 'Value_Calculated',
                required: true,
                label: 'Calculated',
                align: 'right',
                sortable: true,
                field: 'Value_Calculated',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;',
                value:'0.00'
            },
            {
                name: 'Value_After',
                required: true,
                label: 'Value After',
                align: 'right',
                sortable: true,
                field: 'Value_After',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            {
                name: 'landed_cost',
                required: true,
                label: 'Landed Cost',
                align: 'right',
                sortable: false,
                field: 'landed_cost',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            {
                name: 'prorate_by_unit_volume',
                required: true,
                label: 'Prorate by Unit Volume',
                align: 'right',
                sortable: false,
                field: 'prorate_by_unit_volume',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;width:40px'
            }
          ];

          if(this.json.BillStatus == 1)
          {
            surcharge_table_column = surcharge_table_column.filter((entry)=>{
              return entry.field != 'action';
            })
          }

          this.inv_surcharge_table_column = surcharge_table_column;
          this.$nextTick(async ()=>{
            var data = {};
            if(this.page_function == 'CreateGoodsReceivedNote')
            {
              data = {
                  "data": []
              };
            }else{
              var payload = {
                "pass_json": {
                  refno: this.json.RefNo,
                  trans_type: 'GRNInv'
                }
              };

              var object_pass = {
                  "dispatch": 'purchase/trigger_post_get_surcharge_discount', //refer to path/function_name in store actions.js
                  "getter": 'purchase/get_surcharge_discount', //refer to path/function_name in store getters.js
                  "app": this, //compulsory passed variable
                  "payload": payload //payload that needed to use in store actions.js
              };

              var dispatch_response = await this.$dispatch(object_pass);
              if(dispatch_response.status)
              {
                data = dispatch_response
                var results = data.response;
                this.TotalInvDisc = this.json.InvSurchargeDisc_Vendor
                for(var i in results)
                {
                  var obj = results[i];
                  obj.sequence = this.formatAmount(obj.sequence ,'qty');
                  obj.sequence = this.formatAmount(obj.sequence ,'qty');
                  obj.Value_Calculated = this.formatAmount(obj.Value_Calculated ,'$');
                  obj.surcharge_disc_value = this.formatAmount(obj.surcharge_disc_value ,'$');
                  obj.Value_After = this.formatAmount(obj.Value_After ,'$');
                  obj.landed_cost = this.formatAmount(obj.landed_cost ,'$');
                  obj.build_into_cost = obj.build_into_cost  == 0 ? false:true;
                  obj.dn = obj.dn  == 0 ? false:true;
                  obj.prorate_by_unit_volume = obj.prorate_by_unit_volume == 0 ? false:true;
                }

              }else
              {
                //fail condition

              }
            }

            this.inv_surcharge_table_data = {
              "data": {
                    "count": 100,
                    "next": null,
                    "previous": null,
                    "results": data.response
                }
            };




            if(data.response.length == 0)
            {
              this.group_button = false;
            }
            else
            {
              this.group_button = true;
            }

            if(mobile){
              this.inv_surcharge_disc_array =data.response
               console.log('this.inv_surcharge_disc_array',this.inv_surcharge_disc_array);
            }


        });
      },
      // addButtonSurcharge(table_data,table_footer){
      //   console.log('table_data',table_data);
      //     var results = table_data.data.results

      //     var no = results.length == 0 ? 1 :parseInt(results[results.length-1].no) + 1
      //     var object = {
      //       no: no,
      //       shared:0,
      //       code:'',
      //       dn:0,
      //       type:'$',
      //       value:'0.00',
      //       calculated:'0.00',
      //       value_after:'0.00'
      //     }

      //     results.push(object)
      //     if(results.length > 0){
      //       if(table_footer == 'GRN'){
      //         this.grn_table_footer = true
      //       }else{
      //         this.inv_table_footer = true
      //       }

      //     }

      // },

      handleChangeValueInput(xpayload){
        console.log('xpayload',xpayload);
        xpayload.payload.row['value'] = xpayload.value;
        var row =xpayload.payload.row
        var type =xpayload.payload.row.type
        console.log('type',type);
        if(type == '$'){
          xpayload.payload.row.calculated = xpayload.value
        }else{
          xpayload.payload.row.calculated = '-' + (parseFloat(this.json.Subtotal1) * parseFloat(xpayload.payload.row.value)).toFixed(2)
          console.log('%');
        }
        if(row.no == '1'){
          row.value_after = (parseFloat(this.json.Subtotal1) + parseFloat(row.calculated)).toFixed(2)
        }else{
          console.log('value_after',row.value_after);

          console.log('row',row);
        }
        xpayload.event.cancel();
        // if(newVal === ''){
        //   console.log('emty');
        //   obj.value = '0.00'
        // }
        // obj.calculated = obj.value
        // obj.value_after = parseFloat(this.json.Subtotal1) + parseFloat(obj.calculated)
        // console.log('calculated',this.surcharge_table_column);


        // this.json.Total = parse
      },
      handleChangeGRNTotalValue(newVal){
        console.log('newVal',newVal);
        // this.json.Total = (parseFloat(this.json.Subtotal1) + parseFloat(newVal)).toFixed(2);
      },
      handleChangeINVTotalValue(newVal){
        this.json.InvNetAmt_Vendor = (parseFloat(this.json.InvAmount_Vendor) + parseFloat(newVal)).toFixed(2);
      },
      handleSurcharge(section,obj){
        console.log('obj',obj);
        console.log('section',section);
        this.edit_surcharge = true
        this.surchargeChild = obj;
      },
      sectionClick(type){
        if(type=='GRN'){
          this.grn_surcharge = true;
          this.inv_surcharge = false;
        }else{
          this.grn_surcharge = false;
          this.inv_surcharge = true;
        }
          console.log('click',type);
      },
      handleItemClick(section){
        if(this.json.BillStatus == 1)
        {
            this.showNotify("negative",this.$language('C0012'));//"This Doc already posted."
            return;
        }

       this.$nextTick (()=>{

        if(section === "RTV"){
          this.jsonChild = {
                 Itemcode:"",
                 reason:"",
                 Description:"",
                 GroupCost:0,
                 Inv_Qty:1,
                 Inv_UnitPrice:"0.00",
                 Inv_Disc1Type: "%",
                 Inv_Disc1Value: "0.00",
                 Inv_Disc2Type: "%",
                 Inv_Disc2Value: "0.00",
                 Inv_TotalPrice: "0.00"
              };
          this.rtv_dialog =true;
          this.vfoc = false;
          this.rtv= true;
          this.get_tax_options();
          this.grn_reason_options();
        }else if(section === "VFOC"){
           this.rtv_dialog =true;
           this.vfoc = true;
           this.rtv = false;
           this.jsonChild = {
                 Itemcode:"",
                 reason:"",
                 Description:"",
                 GroupCost:0,
                 Qty: 2
              };
              this.grn_reason_options();
        }else if(section === "REMOVE"){
           this.remove_all_grLine_dialog = true;
        }

        this.search.options =
        [
          {
            label: this.$language('D0097'),//"Itemcode"
            value: "Itemcode"
          },
          {
            label: this.$language('D0099'),//"Barcode"
            value: "Barcode"
          },
          {
            label: this.$language('D0098'),//"Description"
            value: "Description"
          },
          {
            label: this.$language('D0101'),//"ArticleNo"
            value: "ArticleNo"
          }
        ]
      })
      },
      grnChildclose(){
        this.rtv_dialog =false;
        this.jsonChild = {};
        this.jsonChild.GroupCost = 0;
      },
     async handleRemoveAllGRLine(){
        this.deleteLoading = true;

        var set_query = {
              "ERefNo":this.json.RefNo,
              "SupplierCode":this.json.Code,
              "EUser":this.user_name,
              "getuser":this.user_name
          };

          var set_query2 = {
              "ERefNo":this.json.RefNo,
              "EUser":this.user_name,
              "getuser":this.user_name
          };

          var json_runscript_multi = {
              params:[
                {
                  "lookupdb_name": this.session_outlet_guid,
                  "trans_group": 'GRN',
                  "trans_type": 'grmain',
                  "set_query":set_query
                },
                {
                  "lookupdb_name": this.session_outlet_guid,
                  "trans_group": 'GRN',
                  "trans_type": '@Remove all rec',
                  "set_query":set_query2
                }
            ]
          };

          var payload_runscript_multi ={
             "pass_json": json_runscript_multi
          }

          var dispatch_response = await this.runscript_multi(payload_runscript_multi)
          console.log('dispatch_response',dispatch_response);
          if(dispatch_response.status){
             this.deleteLoading = false
             this.remove_all_grLine_dialog = false;
          }else{
             this.deleteLoading = false
          }
        console.log('remove All GR Line');
      },
      async handlePrint(){
          this.showLoading();
          var RefNo = this.json.RefNo;
                var set_query = {
                  "ERefNo" : RefNo,
                  "EUser":this.user_name,
                  "getuser":this.user_name
                };

          var json_runtime_runscript_multi = {
              params:[
                {
                  "lookupdb_name": this.session_outlet_guid,
                  "trans_group": 'GRN',
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
            // this.columns_print = [
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
            //     title: 'GRN Audit List - Warning Message Details',
            //   }
            // ]
            console.log('runtime script:',dispatch_response.message);
          }else{
            this.hideLoading();
            this.showNotify('negative',dispatch_response.message)
            console.log('runtime script:',dispatch_response.message);
          }
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
                  title: 'GRN Audit List - Warning Message Details',
               },
               {
                  title: 'Report',
               },
              ]
              }
            }
      },
      async handlePrintSelect(row){
        var requests = this.rows_print.data.results.map(async(row, index)=>{
            row.selected = false;
          });
          await Promise.all(requests);
          row.selected = true;
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
      handlePrintWarning(){
        var refno = this.json.RefNo
        // this.$router.push('/erp/purchase/printTest?refno='+refno)
        this.$router.push({name:'PrintWarningMessage', query: { refno: refno, header: 'GRN'}});
      },
      showDialogEditInvSurcharge(payload){
        this.title_dialog = 'Invoice'
        this.surcharge_discount_dialog = true;
        payload.build_into_cost = payload.build_into_cost == 0 ? false:true;
        payload.dn = payload.dn == 0 ? false:true;
        payload.prorate_by_unit_volume = payload.prorate_by_unit_volume == 0 ? false:true;
        this.surcharge_discount_json = JSON.parse(JSON.stringify(payload)) ;
        this.edit_surcharge_action = true;
      },
      showDialogEditSurcharge(payload){
        this.title_dialog = 'GRN'
        this.surcharge_discount_dialog = true;
        payload.build_into_cost = payload.build_into_cost == 0 ? false:true;
        payload.dn = payload.dn == 0 ? false:true;
        payload.prorate_by_unit_volume = payload.prorate_by_unit_volume == 0 ? false:true;
        this.surcharge_discount_json = JSON.parse(JSON.stringify(payload)) ;
        this.edit_surcharge_action = true;
      },
      async addButtonSurcharge(type){
            // console.log('type',type);
            // console.log('title',this.title_dialog);
            this.showAddLoading = true;

            var form_name = 'save_surcharge_discount_form';
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
           console.log('this.surcharge_discount_json.surcharge_disc_value',this.surcharge_discount_json.surcharge_disc_value);
            if(Number(this.surcharge_discount_json.surcharge_disc_value) <= 0 ){
              this.showAddLoading = false;
              this.showNotify("negative", "Value cannot less than 0.");
              return;
            }

            var payload = {
              "pass_json": {
                code_Type:  this.surcharge_discount_json.code_Type,
                Code: this.surcharge_discount_json.Code,
                Description: this.surcharge_discount_json.Description,
                surcharge_disc_type: this.surcharge_discount_json.surcharge_disc_type,
                surcharge_disc_value: this.surcharge_discount_json.surcharge_disc_value,
                Value_Before: this.json.Total,
                trans_type: this.title_dialog  == 'GRN' ? "GRN" : "GRNInv",
                landed_cost:this.surcharge_discount_json.landed_cost,
                prorate_by_unit_volume:this.surcharge_discount_json.prorate_by_unit_volume == true ? 1 : 0,
                dn:this.surcharge_discount_json.dn == true ? 1 : 0,
                build_into_cost:this.surcharge_discount_json.build_into_cost == true ? 1 : 0,
                language: this.language,
                refno: this.json.RefNo
              }
            };
            console.log('this.surcharge_discount_json',this.surcharge_discount_json);
            if(!this.edit_surcharge_action){
              var object_pass = {
                            "dispatch": 'purchase/trigger_post_create_surcharge_discount',
                            "getter": 'purchase/get_create_surcharge_discount_status',
                            "app": this,
                            "payload": payload
                        };


            }else{
              payload.pass_json.surcharge_disc_guid = this.surcharge_discount_json.surcharge_disc_guid;
              var object_pass = {
                            "dispatch": 'purchase/trigger_post_edit_surcharge_discount',
                            "getter": 'purchase/get_edit_surcharge_discount_status',
                            "app": this,
                            "payload": payload
                        };
            }

           var dispatch_response = await this.$dispatch(object_pass);
           console.log('dispatch_response',dispatch_response);

           if(dispatch_response.status)
            {
              //success condition
               if(type == 'save'){
                  var Total  = dispatch_response.response.Total
                  this.surcharge_discount_json = {};
                  this.surcharge_discount_dialog = false;
                  this.edit_surcharge_action =false;
                  this.showAddLoading= false;
                  if(this.title_dialog == 'GRN'){
                    this.surcharge_table_function();
                    this.surcharge_IVNtable_function()
                    this.json.Total =  this.formatAmount(Total, '$');
                    this.json.total_include_tax =  this.formatAmount(dispatch_response.response.total_include_tax, '$');
                    this.json.Discount1 =  this.formatAmount(dispatch_response.response.Discount1, '$');
                    this.totalDisc =  this.formatAmount(dispatch_response.response.Discount1, '$');
                    this.json.InvAmount_Vendor =  this.formatAmount(dispatch_response.response.InvAmount_Vendor, '$');
                    this.json.InvNetAmt_Vendor =  this.formatAmount(dispatch_response.response.InvNetAmt_Vendor, '$');
                    this.json.InvSurchargeDisc_Vendor =  this.formatAmount(dispatch_response.response.InvSurchargeDisc_Vendor, '$');
                  }else if(this.title_dialog == 'Invoice'){
                    this.json.InvAmount_Vendor =  this.formatAmount(dispatch_response.response.InvAmount_Vendor, '$');
                    this.json.InvNetAmt_Vendor =  this.formatAmount(dispatch_response.response.InvNetAmt_Vendor, '$');
                    this.json.InvSurchargeDisc_Vendor =  this.formatAmount(dispatch_response.response.InvSurchargeDisc_Vendor, '$');
                    this.TotalInvDisc =  this.formatAmount(dispatch_response.response.InvSurchargeDisc_Vendor, '$');
                    this.surcharge_IVNtable_function()
                  }

               }else if(type == 'save&add'){
                  var Total  = dispatch_response.response.Total
                  this.surcharge_discount_json = {
                    build_into_cost: false,
                    dn:false,
                    prorate_by_unit_volume:false,
                    Code: "",
                    Description: "",
                    surcharge_disc_type:"",
                    surcharge_disc_value: 0.00,
                    landed_cost:0.00
                  };
                  this.showAddLoading = false;

                  if(this.title_dialog == 'GRN'){
                    this.json.Total =  this.formatAmount(Total, '$');
                    this.json.total_include_tax =  this.formatAmount(dispatch_response.response.total_include_tax, '$');
                    this.json.Discount1 =  this.formatAmount(dispatch_response.response.Discount1, '$');
                    this.json.InvAmount_Vendor =  this.formatAmount(dispatch_response.response.InvAmount_Vendor, '$');
                    this.json.InvNetAmt_Vendor =  this.formatAmount(dispatch_response.response.InvNetAmt_Vendor, '$');
                    this.json.InvSurchargeDisc_Vendor =  this.formatAmount(dispatch_response.response.InvSurchargeDisc_Vendor, '$');
                    this.surcharge_table_function();
                    this.surcharge_IVNtable_function();
                  }else if(this.title_dialog == 'Invoice'){
                    this.json.InvAmount_Vendor =  this.formatAmount(dispatch_response.response.InvAmount_Vendor, '$');
                    this.json.InvNetAmt_Vendor =  this.formatAmount(dispatch_response.response.InvNetAmt_Vendor, '$');
                    this.json.InvSurchargeDisc_Vendor =  this.formatAmount(dispatch_response.response.InvSurchargeDisc_Vendor, '$');
                    this.surcharge_IVNtable_function()
                  }
                }
            }else
            {
              //fail condition
            }

      },
      showDialogAddSurcharge(section){
        if(section == 'INV'){
          this.title_dialog = 'Invoice'
        }else if(section == 'GRN'){
          this.title_dialog = 'GRN'
        }

        this.surcharge_discount_dialog = true;
        this.surcharge_discount_json ={
            build_into_cost: 0 ? true : false,
            dn:0 ? true : false,
            prorate_by_unit_volume: 0 ? true : false,
            surcharge_disc_value:"0.00"

          }
     },
     closeDialogSurcharge(){
         this.surcharge_discount_dialog =false;
         this.surcharge_discount_json = {};
         this.edit_surcharge_action = false;
      },
      getPreviousAmount(array, currentObj) {
        // Iterate through the array to find the current object and its previous object
        for (let i = 0; i < array.length; i++) {
          if (array[i].sequence === currentObj) {
            // Check if there's a previous object
            if (i > 0) {
              return array[i - 1].Value_After;
            } else {
              console.log('title_dialog',this.title_dialog);
              if(this.title_dialog == 'GRN'){
                return Number(this.json.Subtotal1)
              }else{
                return Number(this.json.InvAmount_Vendor)
              }

            }
          }
        }
        return null; // Current object not found
      },
      handleChangeSurchargeValue(newVal){

        var surcharge_disc_type = this.surcharge_discount_json.surcharge_disc_type
        var code_Type = this.surcharge_discount_json.code_Type
        var sequence = this.surcharge_discount_json.sequence

        if(surcharge_disc_type == '$'){
           var amount = newVal
        }else if (surcharge_disc_type == '%'){
           var amount = (this.json.Subtotal1 * newVal) / 100
          //  console.log('amount',amount);
        }

        var table_data = [];
        this.surcharge_discount_json.Value_Calculated = amount
         if(this.title_dialog == 'GRN'){
           table_data = this.surcharge_table_data.data.results
         }else{
           table_data = this.inv_surcharge_table_data.data.results
         }


        var previousAmount = this.getPreviousAmount(table_data, sequence);
        console.log('previousAmount',previousAmount);
        if(code_Type == 'Surcharge'){
          this.surcharge_discount_json.Value_Calculated = amount
          this.surcharge_discount_json.Value_After = Number(previousAmount) + Number(this.surcharge_discount_json.Value_Calculated)
        }else if(code_Type == 'Discount'){
          this.surcharge_discount_json.Value_Calculated = -(amount)
          this.surcharge_discount_json.Value_After = Number(previousAmount)  + (Number(this.surcharge_discount_json.Value_Calculated))
        }

      },
      async getSurchargeTypeOptions(payload)
      {
        var object_pass = {
              dispatch: 'purchase/trigger_get_surcharge_discount_list',
              getter: 'purchase/get_surcharge_discount_list',
              app: this,
              payload: payload,
          };
          var dispatch_response = await this.$dispatch(object_pass);
           if(dispatch_response.status){
            return dispatch_response.response
           }else{
            console.log('error',dispatch_response);
           }
      },
      handleSurchargeDiscountInputChange(newVal)
      {
         var obj = this.codeOptions.filter((entry)=>{
            return entry.value == newVal
         })
         this.surcharge_discount_json.surcharge_disc_type = obj[0].surcharge_disc_type;
         this.surcharge_discount_json.Description = obj[0].Description;
         this.surcharge_discount_json.code_Type = obj[0].code_Type
      },
      showDeleteSurchargeLineConfirmDialog(obj){
          this.delete_child = true;
          this.edit_surcharge_action =true;
          this.surcharge_discount_json = obj
          this.title_dialog = 'GRN'
    },
    showDeleteINVSurchargeLineConfirmDialog(obj){
          this.delete_child = true;
          this.edit_surcharge_action =true;
          this.surcharge_discount_json = obj
          this.title_dialog = 'Invoice'
    },
    async handleDeleteGRNSurchargeLine(){
       this.showAddLoading = true;
       var payload = {
          "pass_json":{
            language:this.language,
            surcharge_disc_guid: this.surcharge_discount_json.surcharge_disc_guid,
          }
        }

        var object_pass = {
            "dispatch": 'purchase/trigger_post_delete_surcharge_discount', //refer to path/function_name in store actions.js
            "getter": 'purchase/get_delete_surcharge_discount_status', // refer to path/function_name in store getters.js
            "app": this, //compulsory passed variable
            "payload": payload //payload that needed to use in store actions.js
        };

        var dispatch_response = await this.$dispatch(object_pass);
        //  console.log('dispatch_response',dispatch_response);
        if(dispatch_response.status)
        {

			      //success condition
              // this.showAddLoading = false;
              if(this.title_dialog == 'GRN'){
                var Total  = dispatch_response.response.Total
                var Discount1  = dispatch_response.response.Discount1
                var total_include_tax  = dispatch_response.response.total_include_tax
                var InvSurchargeDisc_Vendor  = dispatch_response.response.InvSurchargeDisc_Vendor
                var InvNetAmt_Vendor  = dispatch_response.response.InvNetAmt_Vendor
                this.json.Total =  this.formatAmount(Total, '$');
                this.json.Discount1 =  this.formatAmount(Discount1, '$');
                this.json.total_include_tax =  this.formatAmount(total_include_tax, '$');
                this.json.InvSurchargeDisc_Vendor =  this.formatAmount(InvSurchargeDisc_Vendor, '$');
                this.json.InvNetAmt_Vendor =  this.formatAmount(InvNetAmt_Vendor, '$');
                await this.surcharge_table_function();
                await this.surcharge_IVNtable_function();
              }else if (this.title_dialog == 'Invoice'){
                var InvSurchargeDisc_Vendor  = dispatch_response.response.InvSurchargeDisc_Vendor
                var InvNetAmt_Vendor  = dispatch_response.response.InvNetAmt_Vendor
                this.json.InvSurchargeDisc_Vendor =  this.formatAmount(InvSurchargeDisc_Vendor, '$');
                this.json.InvNetAmt_Vendor =  this.formatAmount(InvNetAmt_Vendor, '$');
                await this.surcharge_IVNtable_function();
              }


              // setTimeout(async()=>{

                this.edit_surcharge_action = false;
                this.surcharge_discount_json  ={};
                this.delete_child= false;
                this.showAddLoading = false;
              // },50)

        }else
        {
       		//fail condition
        }
        return;
        var removeNo = obj.no
        var indexToRemove = surcharge_table_data.data.results.findIndex(entry => entry.no === removeNo);
        if (indexToRemove !== -1) {
          surcharge_table_data.data.results.splice(indexToRemove, 1);
            // Reset the no property for the remaining items
            for (let i = 0; i <surcharge_table_data.data.results.length; i++) {
              surcharge_table_data.data.results[i].no = i + 1;
            }
          }

          if(surcharge_table_data.data.results.length == 0){
            this.grn_table_footer = false
          }
      },
      showSearchDialog()
      {
        if(this.json.BillStatus == 1)
        {
            this.showNotify("negative",this.$language('C0012'));//"This Doc already posted."
            return;
        }

        this.search_item = true;
        this.search_supplier = false;
        this.selected_row = {};
        this.search.value = '';
        this.search.type = 'Barcode';

      },
    async get_tax_options(){
        var payload = {
          "pass_json":{
            skip:0,
            limit:9999999,
            sort_by: "gst_tax_code",
            sort_type: "ASC",
            language:this.language,
            gst_trans_type: "P",
          }
        }

        var object_pass = {
            "dispatch": 'purchase/trigger_post_gst_read_gst', //refer to path/function_name in store actions.js
            "getter": 'purchase/get_post_gst_read_gst', // refer to path/function_name in store getters.js
            "app": this, //compulsory passed variable
            "payload": payload //payload that needed to use in store actions.js
        };

        var dispatch_response = await this.$dispatch(object_pass);
       //  console.log('dispatch_response',dispatch_response);
         if(dispatch_response.status){
          var results = dispatch_response.response.detail
          var tax_code_options = [];
          for(var i in results)
            {
              var lsample = results[i];

              var obj = {
                label: lsample.gst_tax_code ,
                value: lsample.gst_tax_code
              }

              tax_code_options.push(obj);
            }
            this.tax_options =tax_code_options;
         }else{

         }


    },
    async grn_reason_options(){
        var payload = {
          "pass_json":{
            language:this.language,
            TRANS_TYPE: "grn_reason",
          }
        }

        var object_pass = {
            "dispatch": 'purchase/trigger_post_master_code_read_master_code_by_trans_type', //refer to path/function_name in store actions.js
            "getter": 'purchase/get_post_master_code_read_master_code_by_trans_type', // refer to path/function_name in store getters.js
            "app": this, //compulsory passed variable
            "payload": payload //payload that needed to use in store actions.js
        };

        var dispatch_response = await this.$dispatch(object_pass);
         console.log('dispatch_response',dispatch_response);
         if(dispatch_response.status){
          var results = dispatch_response.response
          var grn_reason_options = [];
          for(var i in results)
            {
              var lsample = results[i];

              var obj = {
                label: lsample.CODE_DESC ,
                value: lsample.CODE_DESC
              }

              grn_reason_options.push(obj);
            }
            console.log('grn_reason_options',grn_reason_options);
           this.reason_options =grn_reason_options;
         }else{

         }


    },
    async handleGrnChild(newVal){
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

            await this.saveGrnChild(newVal);
        }
    },
    async saveGrnChild(newVal){
    //  console.log('child',this.jsonChild);
    //  console.log('rtv',this.rtv);
     var PriceType = this.rtv && !this.vfoc ? 'RTV' : 'VFOC'
    //  console.log('PriceType',PriceType);
    //  console.log('edit',this.edit_child);

    if(this.rtv){
      if(!this.edit_child){
        var json_payload ={
        user:this.user_name,
        RefNo:this.json.RefNo,
        EntryType: this.jsonChild.EntryType,
        PriceType: PriceType,
        Itemcode: this.jsonChild.Itemcode,
        reason: this.jsonChild.reason,
        Description:this.jsonChild.Description,
        GroupCost: this.jsonChild.GroupCost,
        gst_tax_code:this.jsonChild.gst_tax_code,
        Inv_Qty: this.jsonChild.SetQty,
        Inv_UnitPrice: this.jsonChild.UnitPrice,
        Inv_Disc1Type: this.jsonChild.Disc1Type,
        Inv_Disc1Value: this.jsonChild.Disc1Value,
        Inv_Disc2Type: this.jsonChild.Disc2Type,
        Inv_Disc2Value: this.jsonChild.Disc2Value,
        Inv_TotalPrice: this.jsonChild.TotalPrice,
      }
      var payload = {
        	"pass_json": json_payload
        };
        var object_pass = {
            "dispatch": 'purchase/trigger_post_grn_create_grchild',
            "getter": 'purchase/get_post_grn_grchild_status',
            "app": this,
          	"payload": payload
        };

        var dispatch_response = await this.$dispatch(object_pass);
       console.log('dispatch_response',dispatch_response);
        if(dispatch_response.status)
        {
          var result =dispatch_response.response
          this.showNotify("positive", "Created Successfully.");
          this.showAddLoading = false;
          this.json.InvAmount_Vendor =  this.formatAmount(result.InvAmount_Vendor, '$');
          this.json.InvNetAmt_Vendor =  this.formatAmount(result.InvNetAmt_Vendor, '$');
          if(newVal == 'save')
            {
              this.jsonChild = {};
              this.search.showTable = false;
              this.rtv_dialog = false;
              this.rtv = false;
              this.table_function(this.ori_params);

            }
            else if(newVal == 'save&add')
            {
              this.jsonChild = {};
              this.search.showTable = false;
              this.rtv_dialog = false;
              this.table_function(this.ori_params);
              this.handleItemClick('RTV')
            }
        }else
        {

        }
      }else{
      //   var json_payload ={
      //   user:this.user_name,
      //   RefNo:this.json.RefNo,
      //   Line:this.jsonChild.Line,
      //   EntryType: this.jsonChild.EntryType,
      //   PriceType: PriceType,
      //   Itemcode: this.jsonChild.Itemcode,
      //   reason: this.jsonChild.reason,
      //   Description:this.jsonChild.Description,
      //   GroupCost: this.jsonChild.GroupCost,
      //   Inv_Qty: this.jsonChild.SetQty,
      //   Inv_UnitPrice: this.jsonChild.UnitPrice,
      //   Inv_Disc1Type: this.jsonChild.Disc1Type,
      //   Inv_Disc1Value: this.jsonChild.Disc1Value,
      //   Inv_Disc2Type: this.jsonChild.Disc2Type,
      //   Inv_Disc2Value: this.jsonChild.Disc2Value,
      //   Inv_TotalPrice: this.jsonChild.TotalPrice,
      // }
      var payload = {
        	"pass_json": this.jsonChild
        };
       payload.pass_json.user = this.user_name

        payload.pass_json.user = this.user_name
        var object_pass = {
            "dispatch": 'purchase/trigger_post_grn_update_grchild',
            "getter": 'purchase/get_post_grn_grchild_status',
            "app": this,
          	"payload": payload
        };

        var dispatch_response = await this.$dispatch(object_pass);
        console.log('dispatch_response',dispatch_response);
        if(dispatch_response.status)
        {
          var result = dispatch_response.response
          this.showNotify("positive", "Updated Successfully.");
          this.showAddLoading = false;
          this.json.InvAmount_Vendor =  this.formatAmount(result.InvAmount_Vendor, '$');
          this.json.InvNetAmt_Vendor =  this.formatAmount(result.InvNetAmt_Vendor, '$');
          if(newVal == 'save')
            {
              this.jsonChild = {};
              this.search.showTable = false;
              this.rtv_dialog = false;
              this.table_function(this.ori_params);
            }
        }else
        {

        }

      }
    }else if(this.vfoc){
      if(!this.edit_child){
        var json_payload ={
        user:this.user_name,
        RefNo:this.json.RefNo,
        EntryType: this.jsonChild.EntryType,
        PriceType: PriceType,
        Itemcode: this.jsonChild.Itemcode,
        reason: this.jsonChild.reason,
        Description:this.jsonChild.Description,
        GroupCost: this.jsonChild.GroupCost,
        Qty: this.jsonChild.SetQty,
        Inv_Qty:this.jsonChild.SetQty,
      }
      var payload = {
        	"pass_json": json_payload
        };
        var object_pass = {
            "dispatch": 'purchase/trigger_post_grn_create_grchild',
            "getter": 'purchase/get_post_grn_grchild_status',
            "app": this,
          	"payload": payload
        };

        var dispatch_response = await this.$dispatch(object_pass);
       console.log('dispatch_response',dispatch_response);
        if(dispatch_response.status)
        {
          this.showNotify("positive", "Created Successfully.");
          this.showAddLoading = false;
          if(newVal == 'save')
            {
              this.jsonChild = {};
              this.search.showTable = false;
              this.rtv_dialog = false;
              this.vfoc = false
              this.table_function(this.ori_params);

            }
            else if(newVal == 'save&add')
            {
              this.jsonChild = {};
              this.search.showTable = false;
              this.rtv_dialog = false;
              this.table_function(this.ori_params);
              this.handleItemClick('VFOC');
            }
        }else
        {

        }
      }else{

      var payload = {
        	"pass_json": this.jsonChild
        };
       payload.pass_json.user = this.user_name
       payload.pass_json.Qty = payload.pass_json.SetQty
       payload.pass_json.Inv_Qty = payload.pass_json.SetQty
        payload.pass_json.user = this.user_name
        var object_pass = {
            "dispatch": 'purchase/trigger_post_grn_update_grchild',
            "getter": 'purchase/get_post_grn_grchild_status',
            "app": this,
          	"payload": payload
        };

        var dispatch_response = await this.$dispatch(object_pass);
        console.log('dispatch_response',dispatch_response);
        if(dispatch_response.status)
        {
          this.showNotify("positive", "Updated Successfully.");
          this.showAddLoading = false;
          if(newVal == 'save')
            {
              this.jsonChild = {};
              this.search.showTable = false;
              this.rtv_dialog = false;

              this.table_function(this.ori_params);

            }


        }else
        {

        }

      }
    }
    },
    close_RTV_VFOC_Dialog(){
      this.rtv_dialog = false;
      this.rtv  = false;
      this.vfoc = false;
      this.jsonChild = {};
      this.edit_child = false;
    },
    addNewLineSurcharge(table_data,table_footer){
         // console.log('table_data',table_data);
          var results = table_data.data.results
          var sequence = results.length == 0 ? 1 :parseInt(results[results.length-1].sequence) + 1
          var object = {
            sequence: sequence,
            shared:0,
            code:'',
            dn:0,
            surcharge_disc_type:'$',
            surcharge_disc_value:'0.00',
            Value_Calculated:'0.00',
            Value_After:'0.00'
          }

          results.push(object)
          if(results.length > 0){
            if(table_footer == 'GRN'){
              this.grn_table_footer = true
            }else{
              this.inv_table_footer = true
            }
          }
          this.surcharge_disc_array = results
         console.log('results',results);
    },
    handleDeleteSurcharge(){
      console.log('delete Line Surcharge');
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
.text-red {
  color: #B22222;
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

.custom_more_button >>> .q-btn-dropdown__arrow
{
  display: none;
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
  position: static;
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
/* farah */
@media screen and (max-width: 599px) {
  .mobile_dialog_bottom {
    font-family: InterfontSemiBold;
    font-size: 16px;
    font-weight: 600;
  }
  .dialog_radio_title {
  font-weight: 600;
  font-family: InterfontSemiBold;
  font-size: 14px;
}
  .dialog_radio_options {
  font-weight: 500;
  font-family: InterfontMedium;
  font-size: 14px;
  padding: 0px;
  gap: 10px;
}
  
  .mobile_edit_checkbox {
  font-weight: 600;
  font-size: 12px !important;
  font-family: InterfontSemiBold;
  align-items: center;
  justify-items: center;
  justify-content: center;
}
  .summary_button {
    border-radius: 8px;
    border: 1px solid #1E90FF;
    background: #FFF;
    box-shadow: 0px 0px 3.9px 0px rgba(0, 0, 0, 0.25);
    padding: 11px 8px;
    font-size: 13px;
    font-weight: 700;
    font-family: InterfontBold;
    height: 43px !important;
  }
  .selected-card {
  border-radius: 8px;
  border: 2px solid #90A8D6;
  background: #FFF;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.30);
}
  .dialog_done_button {
  height: 30px;
  padding: 16px;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 1px 3.6px 0px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  font-size: 16px;
  font-family: InterfontBold;
  font-weight: 700;

}
  .mobile_section_font {
  color: #29292A;
  font-family: InterfontSemiBold;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
}
*>>>.q-btn--outline:before {
    border: none;
}
  .button_group {
  padding: 2px 9px;
  border-radius: 8px;
  /* border: 1px solid #54656F; */
  /* background: #FFFFFF; */
  font-family: InterfontSemiBold;
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  text-align: center;
  width: 55px;
  height: 30px;
}
.default {
  background-color: #ffffff;
  color: #54656F;
  border: 1px solid #54656F;
}

.clicked {
  background-color: #8C8C8C !important;
  color: #ffffff;
}
  .button_selectAll {
  padding: 2px 9px;
  border-radius: 8px;
  /* background: #FFFFFF; */
  font-family: InterfontSemiBold;
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  text-align: center;
  width: 90px !important;
  height: 30px;
}
  .no-scroll {
  overflow: hidden;
}
  .chip-icon {
  margin: 0 8px;
  font-size: 16px; /* Adjust the size as needed */
  /* padding: 8px 16px; */
}
.chip_sty {
  padding: 11px 10px 11px 10px; /* Adjust the padding as needed */
  border-radius: 8px;
  background: #FFF !important;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  height: 43px;
}
.chip_sty.q-chip {
  margin: 0px !important;
}

/* font */
.bold-font {
  font-family: InterfontBold;
  font-weight: 700;
  font-size: 16px;
}
  .chip-container_1 {
  display: flex;
  align-items: center;
  /* padding-top: 16px; */
  /* padding-bottom: 8px; */
}
  .chip-container_2 {
  display: flex;
  align-items: center;
  padding-top: 16px;
  padding-bottom: 16px;
}
/* above is newly added style */
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
    position: static;
    z-index: 2;
    top: 56px;
    /* padding-bottom: 5px; */
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
    /* text-align: center; */
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 0px;
    padding-bottom: 0px;
  }
  .input_wrapper_right
{
  /* padding-right: 2%;
  padding-left: 2%; */
  padding: 16px;
}
}

@media screen and (min-width: 600px) {
  .dialog_radio_title {
  font-weight: 600;
  font-family: InterfontSemiBold;
  font-size: 14px;
}
  .input_wrapper_right
{
  /* padding-right: 1%; */
  /* padding-left: 1%; */
  padding: 16px;
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
    position: static;
    top: 50px;
    z-index: 2;
    padding:0px;
  }
}

.mobile_dialog_delete_btn
{
  color: #C10015;
  text-decoration: none; /* Remove underline by default */
  transition: text-decoration 0.3s;
  position: absolute;
  padding:0px;
  /* padding-left: 10px; */
  top: 24%;
  left: 8%;
  z-index: 1;
}
.mobile_dialog_delete_btn:hover {
  cursor: pointer;
  text-decoration: underline; /* Underline on hover */
}
.custom_close_button
{
  color: #928f8f;
  position: absolute;
  padding: 0;
  padding-left: 10px;
  top: 20%;
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

@media screen and (min-width: 1024px) {
  .column > .col-md-4 {
        height: 33.3333%;
        width: auto;
        align-items: center;
        align-content: center;
    }
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

.dialog_action
{
  /* height: 70px; */
  /* position: sticky; */
  padding:0px;
  /* padding-right: 24px; */
  /* padding-left: 20px; */
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
  /* padding-left: 16px;
  padding-right: 16px; */
  font-weight: 600;
  font-size: 20px;
  font-family: InterfontSemiBold;

}


.upload_container
{
    
    padding-top: 0px;
}

* >>> .q-table__container
{
    padding: 0px;
    border-radius: 8px;
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


.input_wrapper_center
{
  padding-right: 1%;
}
/* } */

.input_wrapper_left
{
  padding-left: 1%;
}
@media screen and (max-width: 1024px) {
  .two_column_left
  {
    padding-right: 2%;
  }
}

.dialog_font
{
  font-family: InterfontBold;
  font-size: 13px;
}
.dialog_font_checkbox
{
  font-family: InterfontBold;
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
*>>>.q-card__section--vert {
    padding: 0px;
}

.upload_separator_second
{
    border-top: 1px solid #DEE1E6;
    margin-top: 5px;
    padding-top: 0px;
    padding-bottom: 30px;
}

.upload_separator_third
{
    border-top: 1px solid #DEE1E6;
    margin-top: 5px;
    padding-top: 0px;
    padding-bottom: 5px;
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

/* newly added/modified/updated css */
* >>> .q-field--disabled > .q-field__inner > .q-field__control
{
  background-color: #E8E8E8 !important;
  border-radius: 8px;
  /* border: 2px solid #BABABA; */
  padding: 6px 16px;
}
*>>>.q-field--outlined.q-field--readonly .q-field__control:before {
    border-style: none;
}
* >>> .q-field--readonly > .q-field__inner > .q-field__control
{
  background-color: #E8E8E8 !important;
  border-radius: 8px !important;
  border: 2px solid #BABABA;
}
.surcharge_custom {
  gap: 16px;
}
.separator-style {
  border-top: 1px solid #BFBFBF;
  width: 100%;
}
*>>>.q-stepper__title {
    font-size: 14px;
    font-weight: 500;
    font-family: InterfontMedium;
}

.print_actions_button
{
    /* border: 1px solid black; */
  /* padding: 8px 10px; */
  border-radius: 8px;
  border: 2px solid #1E90FF;
  font-family: InterfontMedium;
  width: 48px;
  height: 48px;
  justify-content: center;
  align-items: center;
}



/* *>>>.q-btn--outline:before {
    border: none;
} */
/* .card-container {
  border-radius: 8px;
  background: #FFF;
  box-shadow: 0px 1px 11.3px 0px rgba(0, 0, 0, 0.09);
  padding: 16px 24px;
  margin-top: 10px;
} */
.chip-container {
  display: flex;
  align-items: center;
  padding-top: 32px;
  padding-bottom: 32px;
}
.left_section {
  justify-content: center;
  align-content: top;
  align-items: center;
}
.left_section_font {
  font-family: InterfontSemiBold;
  font-size: 18px;
  font-weight: 600;
}
.first_dialog_separator {
  padding-top: 16px;
  /* padding-bottom: 40px; */
  gap: 20px;
}
.right_section {
  gap: 16px;
}
/* *>>>.q-field__native {
    min-height: 50px !important;
    height: 50px !important;
    padding-top: 25px;
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    font-family: InterfontMedium;
    
} */
/* *[data-v-505a4168] >>> .q-field__label {
    margin-top: 10px;
} */
*>>>.q-field--dense .q-field__label {
    /* top: 5px !important; */
}
/* * >>> .q-field__label
{
  top: 5px;
  color: #535151;
  background-color: antiquewhite;
  font-size: 16px !important;
  font-style: normal;
  font-weight: 500;
  font-family: InterfontMedium;
} */
@media screen and (min-width: 600px) {
  .column > .col-4, .column > .col-xs-4 {
        height: 33.3333%;
        width: auto;
        align-items: center;
        align-content: center;
    }  
  .dialog_radio_options {
  font-weight: 500;
  font-family: InterfontMedium;
  font-size: 16px;
  padding: 0px;
  gap: 10px;
}
  .card_sides
{
  padding-left: 24px;
  padding-right: 24px;
  background-color: #F4F7FE;
  padding-bottom: 24px;
}
    .q-field__native {
        padding: 0px;
        min-height: 26px !important;
        /* height: 26px !important; */
    }
}
*>>>.q-field--labeled.q-field--dense .q-field__native, .q-field--labeled.q-field--dense .q-field__prefix, .q-field--labeled.q-field--dense .q-field__suffix {
    /* padding-top: 14px; */
    padding-bottom: 2px;
}
.checkbox_InterfontMedium {
  font-family: InterfontMedium;
  font-size: 16px;
  font-weight: 500;
}
.checkbox_InterfontMedium_disabled {
  font-family: InterfontMedium;
  font-size: 16px;
  font-weight: 500;
  color: #72777A;
}
/* *>>>.text-right {
    text-align: left;
} */
/* *>>>.text-left {
    text-align: left;
} */
.text-total {
  text-align: right;
}
.confirm_title {
  color: #FFF;
  text-align: center;
  font-family: InterfontSemiBold;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
}
.confirmation_line_font {
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  font-family: InterfontMedium;
}


/* *.custom_truthcheckbox.disabled >>>.q-checkbox__bg {  
  border: none;
  background: #1E90FF;  
} */


.po_details_custom {
  gap: 16px;
}
.po_details_custom_row {
  gap: 16px;
}
.po_details_separator {
  /* padding-top: 24px; */
  /* padding-bottom: 24px; */
}
.button-padding {
  padding: 17px 16px;
  border-radius: 8px;
  border: 2px solid #1E90FF;
  width: 100%;
  height: 90%;
  
  /* margin-top: 1px; */
}
.button-padding >>>.q-icon {
  font-size: 2.2em !important;
}
.search_button {
  /* padding: 17px 16px; */
  border-radius: 8px;
  border: 2px solid #1E90FF;
  /* margin-top: 1px; */
  width: 100%;
  /* height:95%; */
  /* font-size: 2em;   */
}
.search_button >>>.q-icon {
    transition: transform 0.3s ease; /* Smooth transition */
}

.search_button:hover >>> .q-icon{
    transform: scale(1.1); /* Enlarge the button on hover */
}

.search_button:active >>> .q-icon{
    transform: scale(0.9); /* Slightly shrink the button on click */
}
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
</style>
