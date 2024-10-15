<template>
  <div class="card_sides">
    <q-card style="max-height: 100%;">
      <q-card-section class="upload_container content_body_dialog">
        <q-form ref="save_form">
          <div class="row upload_separator_first">
            <div v-if="$q.screen.width > 599" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <q-toolbar>
              <q-tabs
                  v-model="tab"
                  dense
                  class="text-white"
                  align="justify"
                  narrow-indicator
                  @input="handleChangeTab"
                  style="max-width: 80vw;"
              >
                  <q-tab name="po" label="SI" />
                  <q-tab name="po_detail" label="SI Detail" />
                  <!-- <q-tab name="discount" label="Discount" />
                  <q-tab name="expiry" label="Expiry" /> -->
              </q-tabs>
              </q-toolbar>

              <q-tab-panels v-model="tab" :animated="false">
                  <q-tab-panel name="po">
                    <div class="row">
                      <div class="col-xs-12 col-sm-12 col-md-9 col-lg-9 col-xl-9">
                        <div class="row" align="right">
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 input_wrapper_right">
                            <Button_icon :disabled="false" :icon="'edit_note'" :color="'#094161'" :outline="false" size="12px" v-on:click="action()" class="q-mr-sm" />
                          </div>
                        </div>

                        <div class="row dialog_separator">
                          <div class="col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                            <div class="row">
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
                          </div>

                          <div class="col-xs-6 col-sm-6 col-md-8 col-lg-8 col-xl-8 input_wrapper_right">
                            <div class="row">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <Input
                                :autofocusclick="true"
                                :no_label="false"
                                label="Receivied By"
                                :readonly="true"
                                v-on:change="handleChange"
                                v-model="json.Receivedby"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                              </div>
                            </div>
                          </div>
                        </div>

                        <!-- TBC -->
                        <!-- <div v-if="page_function=='EditGoodsReceiving'" class="row dialog_separator">
                          <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                            <div class="row">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <span class="dialog_font">Sub-Dept Code</span>
                              </div>
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <SelectFilter
                                :readonly="false"
                                :no_label="true"
                                v-model:pass_value="json.Code"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.select"
                                :options="supplier_options"
                                v-on:receiveChange="handleChangeSCode"
                                />
                              </div>
                            </div>
                          </div>


                          <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 input_wrapper_right">
                            <div class="row">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <span class="dialog_font">Name</span>
                              </div>
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <SelectFilter
                                :readonly="false"
                                :no_label="true"
                                v-model:pass_value="json.Code"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.select"
                                :options="supplier_options2"
                                v-on:receiveChange="handleChangeSCode"
                                />
                              </div>
                            </div>
                          </div>
                        </div> -->

                        <div class="row dialog_separator">
                          <div class="col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                            <div class="row">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <SelectFilter
                                :readonly="true"
                                :no_label="false"
                                label="Customer"
                                v-model:pass_value="json.Code"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.select"
                                :options="supplier_options"
                                v-on:receiveChange="handleChangeSCode"
                                />
                              </div>
                            </div>
                          </div>


                          <div class="col-xs-6 col-sm-6 col-md-8 col-lg-8 col-xl-8 input_wrapper_right">
                            <div class="row">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <SelectFilter
                                :readonly="true"
                                :no_label="false"
                                label="Name"
                                v-model:pass_value="json.Code"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.select"
                                :options="supplier_options2"
                                v-on:receiveChange="handleChangeSCode"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="row dialog_separator">
                          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 input_wrapper_right">
                            <div class="row">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <Input
                                :autofocusclick="true"
                                :no_label="false"
                                label="D/O #"
                                :readonly="true"
                                v-on:change="handleChange"
                                v-model="json.DONo"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text" />
                              </div>
                            </div>
                          </div>


                          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 input_wrapper_right">
                            <div class="row">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <Input
                                :autofocusclick="true"
                                :no_label="false"
                                label="Invoice #"
                                :readonly="true"
                                v-on:change="handleChange"
                                v-model="json.InvNo"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text" />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="row dialog_separator">
                          <div class="col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                            <div class="row">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <Datepicker
                                :clickableInput="true"
                                :disable="true"
                                :no_label="false"
                                label="Invoice Date"
                                :autoclose="true"
                                v-on:receiveChange="handleChangeDocDate"
                                :daterange="json.DocDate"
                                :componentBehavior="dbComponentBehavior ? dbComponentBehavior.select : oridbComponentBehavior.text" />
                              </div>
                            </div>
                          </div>

                          <div class="col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                            <div class="row">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <Datepicker
                                :clickableInput="true"
                                :disable="true"
                                :autoclose="true"
                                :no_label="false"
                                label="Receiving Date"
                                v-on:receiveChange="handleChangeGrDate"
                                :daterange="json.GRDate"
                                :componentBehavior="dbComponentBehavior ? dbComponentBehavior.select : oridbComponentBehavior.text" />
                              </div>
                            </div>
                          </div>

                          <div class="col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                            <div class="row" :class="$q.screen.width < 1024 ? 'dialog_separator' : ''">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <SelectFilter
                                :readonly="true"
                                :no_label="false"
                                :label="'Received Location'"
                                v-model:pass_value="json.Location"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.select"
                                :options="location_options2"
                                v-on:receiveChange="handleChangeReceivingLocation"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="row dialog_separator">
                          <div class="col-xs-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 input_wrapper_right">
                            <div class="row">
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
                          </div>


                          <div class="col-xs-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 input_wrapper_right">
                            <div class="row">
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

                          <div class="col-xs-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 input_wrapper_right">
                            <div class="row" :class="$q.screen.width < 1024 ? 'dialog_separator' : ''">
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

                          <div class="col-xs-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 input_wrapper_right">
                            <div class="row" :class="$q.screen.width < 1024 ? 'dialog_separator' : ''">
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
                      </div>

                      <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
                        <div class="row dialog_separator">
                          <!-- TBC -->
                          <!-- <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 input_wrapper_right">
                            <div class="row">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <span class="dialog_font">Tax %</span>
                              </div>
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <Input
                                :autofocusclick="true"
                                :no_label="true"
                                :readonly="false"
                                v-on:change="handleChange"
                                v-model="json.gross"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.number : oridbComponentBehavior.text" />
                              </div>
                            </div>
                          </div>

                          <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 input_wrapper_right">
                            <div class="row">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <span class="dialog_font">Tax Amt</span>
                              </div>
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <Input
                                :autofocusclick="true"
                                :no_label="true"
                                :readonly="false"
                                v-on:change="handleChange"
                                v-model="json.gross"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.number : oridbComponentBehavior.text" />
                              </div>
                            </div>
                          </div>

                          <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 input_wrapper_right">
                            <div class="row">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <span class="dialog_font">Tax Adjust</span>
                              </div>
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <Input
                                :autofocusclick="true"
                                :no_label="true"
                                :readonly="false"
                                v-on:change="handleChange"
                                v-model="json.expiry_in_days"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                              </div>
                            </div>
                          </div>

                          <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 input_wrapper_right">
                            <div class="row">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <span class="dialog_font">Landed Cost</span>
                              </div>
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <Input
                                :autofocusclick="true"
                                :no_label="true"
                                :readonly="false"
                                v-on:change="handleChange"
                                v-model="json.landed_cost"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                              </div>
                            </div>
                          </div> -->
                        </div>

                        <div class="row">
                          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 input_wrapper_right">
                            <div class="row">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <Input
                                :autofocusclick="true"
                                :no_label="false"
                                label="Rounding Adjust"
                                :readonly="true"
                                v-on:change="handleChange"
                                v-model="json.rounding_adj"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right_readonly : oridbComponentBehavior.text" />
                              </div>
                            </div>
                          </div>

                          <!-- TBC -->
                          <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                            <div class="row">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <span class="dialog_font">Total after Tax</span>
                              </div>
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <Input
                                :autofocusclick="true"
                                :no_label="true"
                                :readonly="false"
                                v-on:change="handleChange"
                                v-model="json.gross"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                              </div>
                            </div>
                          </div>

                          <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                            <div class="row">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <span class="dialog_font">Cross Ref #</span>
                              </div>
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <Input
                                :autofocusclick="true"
                                :no_label="true"
                                :readonly="false"
                                v-on:change="handleChange"
                                v-model="json.expiry_in_days"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text" />
                              </div>
                            </div>
                          </div> -->
                        </div>

                        <div class="row dialog_separator q-pb-sm">
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 input_wrapper_right">
                            <div class="row">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <span class="dialog_font">Vendor Invoice</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="row dialog_separator">
                          <!-- TBC -->
                          <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                            <div class="row">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <span class="dialog_font">Exclude Tax $</span>
                              </div>
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <Input
                                :autofocusclick="true"
                                :no_label="true"
                                :readonly="false"
                                v-on:change="handleChange"
                                v-model="json.gross"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                              </div>
                            </div>
                          </div>

                          <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                            <div class="row">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <span class="dialog_font">GST $</span>
                              </div>
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <Input
                                :autofocusclick="true"
                                :no_label="true"
                                :readonly="false"
                                v-on:change="handleChange"
                                v-model="json.gross"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                              </div>
                            </div>
                          </div> -->

                          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 input_wrapper_right">
                            <div class="row">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <Input
                                :autofocusclick="true"
                                :no_label="false"
                                label="Include Tax"
                                :readonly="true"
                                v-on:change="handleChange"
                                v-model="json.total_include_tax"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="row dialog_separator">
                          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 input_wrapper_right">
                            <div class="row">
                              <div class="col-xs-7 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                                <span class="dialog_font">Consign</span>
                              </div>
                              <div class="col-xs-5 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                                <Checkbox size="xs" :disable="true" v-model="json.consign" :true-value="1" :false-value="0" />
                              </div>
                            </div>
                          </div>

                          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 input_wrapper_right">
                            <div class="row">
                              <div class="col-xs-7 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                                <span class="dialog_font">Posted</span>
                              </div>
                              <div class="col-xs-5 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                                <Checkbox size="xs" :disable="true" v-model="json.BillStatus" :true-value="1" :false-value="0" />
                              </div>
                            </div>
                          </div>

                          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 input_wrapper_right">
                            <div class="row">
                              <div class="col-xs-7 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                                <span class="dialog_font">In-kind</span>
                              </div>
                              <div class="col-xs-5 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                                <Checkbox size="xs" :disable="true" v-model="json.in_kind" :true-value="1" :false-value="0" />
                              </div>
                            </div>
                          </div>

                          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 input_wrapper_right">
                            <div class="row">
                              <div class="col-xs-7 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                                <span class="dialog_font">D/O</span>
                              </div>
                              <div class="col-xs-5 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                                <Checkbox size="xs" :disable="true" v-model="json.DOState" :true-value="1" :false-value="0" />
                              </div>
                            </div>
                          </div>

                          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 input_wrapper_right">
                            <div class="row">
                              <div class="col-xs-7 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                                <span class="dialog_font">IBT/ICT</span>
                              </div>
                              <div class="col-xs-5 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                                <Checkbox size="xs" :disable="true" v-model="json.ibt" :true-value="1" :false-value="0" />
                              </div>
                            </div>
                          </div>

                          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 input_wrapper_right">
                            <div class="row">
                              <div class="col-xs-7 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                                <span class="dialog_font">Invoice</span>
                              </div>
                              <div class="col-xs-5 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                                <Checkbox size="xs" :disable="true" v-model="json.InvState" :true-value="1" :false-value="0" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </q-tab-panel>

                  <q-tab-panel name="po_detail">
                    <div class="row" :class="$q.screen.width > 599 ? 'upload_separator' : ''">
                      <div class="card_section_two col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <PurchaseTable
                          :readonly_button="status == 1 ? true : false"
                          :row_per_page="[5,10,20,50,0]"
                          :top_button="false"
                          v-on:add_button="addButtonCreatePOChild"
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
                          :delete_button="false"
                          :flat_status="true"
                          :bordered_status="true"
                          v-on:receiveRequestTable="handleTableChange"
                          />
                      </div>
                  </div>
                  </q-tab-panel>
              </q-tab-panels>
            </div>

            <div v-else class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <q-splitter
                v-model="splitterModel"
                style="height: 250px"
              >
                <template v-slot:before>
                  <q-toolbar style="padding: 0px;">
                  <q-tabs
                      v-model="tab"
                      dense
                      vertical
                      class="text-white"
                      align="justify"
                      narrow-indicator
                      @input="handleChangeTab"
                      style="max-width: 80vw;"
                  >
                      <q-tab name="po" label="GR" />
                      <q-tab name="po_detail" label="GR Detail" />
                  </q-tabs>
                  </q-toolbar>
                </template>

                <template v-slot:after>
                  <q-tab-panels v-model="tab"
                  animated
                  swipeable
                  vertical
                  >
                      <q-tab-panel name="po">
                        <div class="row">
                          <div class="col-xs-12 col-sm-12 col-md-9 col-lg-9 col-xl-9">
                            <div class="row" align="right">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 input_wrapper_right">
                                <Button_icon :disabled="false" :icon="'edit_note'" :color="'#094161'" :outline="false" size="12px" v-on:click="action()" class="q-mr-sm" />
                              </div>
                            </div>

                            <div class="row dialog_separator">
                              <div class="col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                                <div class="row">
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
                              </div>

                              <div class="col-xs-6 col-sm-6 col-md-8 col-lg-8 col-xl-8 input_wrapper_right">
                                <div class="row">
                                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <Input
                                    :autofocusclick="true"
                                    :no_label="false"
                                    label="Receivied By"
                                    :readonly="true"
                                    v-on:change="handleChange"
                                    v-model="json.Receivedby"
                                    :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div class="row dialog_separator">
                              <div class="col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                                <div class="row">
                                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <SelectFilter
                                    :readonly="true"
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


                              <div class="col-xs-6 col-sm-6 col-md-8 col-lg-8 col-xl-8 input_wrapper_right">
                                <div class="row">
                                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <SelectFilter
                                    :readonly="true"
                                    :no_label="false"
                                    label="Name"
                                    v-model:pass_value="json.Code"
                                    :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.select"
                                    :options="supplier_options2"
                                    v-on:receiveChange="handleChangeSCode"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div class="row dialog_separator">
                              <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 input_wrapper_right">
                                <div class="row">
                                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <Input
                                    :autofocusclick="true"
                                    :no_label="false"
                                    label="D/O #"
                                    :readonly="true"
                                    v-on:change="handleChange"
                                    v-model="json.DONo"
                                    :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text" />
                                  </div>
                                </div>
                              </div>


                              <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 input_wrapper_right">
                                <div class="row">
                                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <Input
                                    :autofocusclick="true"
                                    :no_label="false"
                                    label="Invoice #"
                                    :readonly="true"
                                    v-on:change="handleChange"
                                    v-model="json.InvNo"
                                    :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text" />
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div class="row dialog_separator">
                              <div class="col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                                <div class="row">
                                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <Datepicker
                                    :clickableInput="true"
                                    :disable="true"
                                    :no_label="false"
                                    label="Invoice Date"
                                    :autoclose="true"
                                    v-on:receiveChange="handleChangeDocDate"
                                    :daterange="json.DocDate"
                                    :componentBehavior="dbComponentBehavior ? dbComponentBehavior.select : oridbComponentBehavior.text" />
                                  </div>
                                </div>
                              </div>

                              <div class="col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                                <div class="row">
                                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <Datepicker
                                    :clickableInput="true"
                                    :disable="true"
                                    :autoclose="true"
                                    :no_label="false"
                                    label="Receiving Date"
                                    v-on:receiveChange="handleChangeGrDate"
                                    :daterange="json.GRDate"
                                    :componentBehavior="dbComponentBehavior ? dbComponentBehavior.select : oridbComponentBehavior.text" />
                                  </div>
                                </div>
                              </div>

                              <div class="col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                                <div class="row" :class="$q.screen.width < 1024 ? 'dialog_separator' : ''">
                                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <SelectFilter
                                    :readonly="true"
                                    :no_label="false"
                                    :label="'Received Location'"
                                    v-model:pass_value="json.Location"
                                    :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.select"
                                    :options="location_options2"
                                    v-on:receiveChange="handleChangeReceivingLocation"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div class="row dialog_separator">
                              <div class="col-xs-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 input_wrapper_right">
                                <div class="row">
                                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
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
                              </div>


                              <div class="col-xs-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 input_wrapper_right">
                                <div class="row">
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

                              <div class="col-xs-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 input_wrapper_right">
                                <div class="row" :class="$q.screen.width < 1024 ? 'dialog_separator' : ''">
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

                              <div class="col-xs-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 input_wrapper_right">
                                <div class="row" :class="$q.screen.width < 1024 ? 'dialog_separator' : ''">
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
                          </div>

                          <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
                            <div class="row dialog_separator">
                            </div>

                            <div class="row">
                              <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 input_wrapper_right">
                                <div class="row">
                                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <Input
                                    :autofocusclick="true"
                                    :no_label="false"
                                    label="Rounding Adjust"
                                    :readonly="true"
                                    v-on:change="handleChange"
                                    v-model="json.rounding_adj"
                                    :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right_readonly : oridbComponentBehavior.text" />
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div class="row dialog_separator q-pb-sm">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 input_wrapper_right">
                                <div class="row">
                                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <span class="dialog_font">Vendor Invoice</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div class="row dialog_separator">
                              <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 input_wrapper_right">
                                <div class="row">
                                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <Input
                                    :autofocusclick="true"
                                    :no_label="false"
                                    label="Include Tax"
                                    :readonly="true"
                                    v-on:change="handleChange"
                                    v-model="json.total_include_tax"
                                    :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div class="row dialog_separator">
                              <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 input_wrapper_right">
                                <div class="row">
                                  <div class="col-xs-7 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                                    <span class="dialog_font">Consign</span>
                                  </div>
                                  <div class="col-xs-5 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                                    <Checkbox size="xs" :disable="true" v-model="json.consign" :true-value="1" :false-value="0" />
                                  </div>
                                </div>
                              </div>

                              <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 input_wrapper_right">
                                <div class="row">
                                  <div class="col-xs-7 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                                    <span class="dialog_font">Posted</span>
                                  </div>
                                  <div class="col-xs-5 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                                    <Checkbox size="xs" :disable="true" v-model="json.BillStatus" :true-value="1" :false-value="0" />
                                  </div>
                                </div>
                              </div>

                              <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 input_wrapper_right">
                                <div class="row">
                                  <div class="col-xs-7 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                                    <span class="dialog_font">In-kind</span>
                                  </div>
                                  <div class="col-xs-5 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                                    <Checkbox size="xs" :disable="true" v-model="json.in_kind" :true-value="1" :false-value="0" />
                                  </div>
                                </div>
                              </div>

                              <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 input_wrapper_right">
                                <div class="row">
                                  <div class="col-xs-7 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                                    <span class="dialog_font">D/O</span>
                                  </div>
                                  <div class="col-xs-5 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                                    <Checkbox size="xs" :disable="true" v-model="json.DOState" :true-value="1" :false-value="0" />
                                  </div>
                                </div>
                              </div>

                              <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 input_wrapper_right">
                                <div class="row">
                                  <div class="col-xs-7 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                                    <span class="dialog_font">IBT/ICT</span>
                                  </div>
                                  <div class="col-xs-5 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                                    <Checkbox size="xs" :disable="true" v-model="json.ibt" :true-value="1" :false-value="0" />
                                  </div>
                                </div>
                              </div>

                              <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 input_wrapper_right">
                                <div class="row">
                                  <div class="col-xs-7 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                                    <span class="dialog_font">Invoice</span>
                                  </div>
                                  <div class="col-xs-5 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                                    <Checkbox size="xs" :disable="true" v-model="json.InvState" :true-value="1" :false-value="0" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </q-tab-panel>

                      <q-tab-panel name="po_detail" style="padding: 0px; padding-left: 3px;">
                        <div class="row" :class="$q.screen.width > 599 ? 'upload_separator' : ''">
                          <div class="card_section_two col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <PurchaseTable
                              :readonly_button="status == 1 ? true : false"
                              :row_per_page="[5,10,20,50,0]"
                              :top_button="false"
                              v-on:add_button="addButtonCreatePOChild"
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
                              :delete_button="false"
                              :flat_status="true"
                              :bordered_status="true"
                              v-on:receiveRequestTable="handleTableChange"
                              />
                          </div>
                      </div>
                      </q-tab-panel>
                  </q-tab-panels>
                </template>
              </q-splitter>
            </div>
          </div>
        </q-form>
      </q-card-section>

      <q-card-actions class="dialog_action" align="right">
          <Button_icon :flat="true" :font_color="'black'" :color="'white'" :text="'BACK'" :outline="true" size="15px" class="custom_cancel_button" @click="back()" />
      </q-card-actions>

      <q-inner-loading
        :showing="showAddLoading"
        color="primary"
      />

    </q-card>

  </div>
</template>

<script>
import Input from 'src/components/ERP/Base/Input'
import Select from 'src/components/ERP/Base/Select'
import Datepicker from 'src/components/ERP/Base/Datepicker'
import Checkbox from 'src/components/ERP/Base/Checkbox'
import PurchaseTable from 'src/components/ERP/Purchase/PurchaseTable'
import Button_icon from 'src/components/ERP/Base/Button_icon'
import { Notify } from "quasar";
import SelectFilter from 'src/components/ERP/Base/SelectFilter'
import SelectPlaceholder from 'src/components/ERP/Base/SelectPlaceholder'
import Textarea from'src/components/ERP/Base/Textarea' ;
import { StreamBarcodeReader } from "vue-barcode-reader";

export default{
  data() {
    return {
      tab: 'po',
      retailer_guid: sessionStorage.getItem("retailer_guid") != "" && sessionStorage.getItem("retailer_guid") != "null" && sessionStorage.getItem("retailer_guid") != null ? sessionStorage.getItem("retailer_guid") : [],
      user_name: sessionStorage.getItem("user_name") != "" && sessionStorage.getItem("user_name") != "null" && sessionStorage.getItem("user_name") != null ? sessionStorage.getItem("user_name") : [],
      language: sessionStorage.getItem("language") != "" && sessionStorage.getItem("language") != "null" && sessionStorage.getItem("language") != null ? sessionStorage.getItem("language") : [],
      outlet_options: [],
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
      supplier_options2: [],
      table_column: [],
      table_data: [],
      table_column1: [],
      table_data1: [],
      showAddLoading: false,
      json: {
        step: 1,
        in_kind: 0,
        auto_close_po: 0,
        posted: 0,
        amended: 0,
        canceled: 0,
        completed: 0,
        issued_by_hq: 0,
        b2b: 0,
        uploaded: 0,
      },
      all_supcus: {},
      status: "",
      page_function: this.$route.name,
      ask_member: false,
      code_scanner: false,
      cardtype_guid: "",
    }
  },
  components:{
    Input,
    // Select,
    Datepicker,
    Checkbox,
    PurchaseTable,
    Button_icon,
    SelectFilter,
    // SelectPlaceholder,
    // Textarea,
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

    this.json.PODate = current_date_format;
    this.json.DeliverDate = current_date_format;

    var payload = {
      params: {
        type: 'S',
        skip: 0,
        limit: 99999999
      }
    }

    var lpayload = {}

    var supcus = await this.getSupcus(payload);
    var location = await this.getLocation(lpayload);

    var supcus_results = supcus.data;
    var location_results = location.data;

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
        label: sample.Code,
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
        label: lsample.location + ' - ' + lsample.Description,
        value: lsample.LocGroup
      }

      loc_group.push(obj2);
      loc_opt.push(obj3);
    }

    this.supplier_options = supcus_code;
    this.supplier_options2 = supcus_name;
    this.location_options = loc_group;
    this.location_options2 = loc_opt;


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

    var data = await this.getGrmain(payload)
    var filtered_pomain = {};
    filtered_pomain = data.response;

    filtered_pomain.rebate_amt = this.formatAmount(filtered_pomain.rebate_amt, '$');
    filtered_pomain.Total = this.formatAmount(filtered_pomain.Total, '$');
    filtered_pomain.total_include_tax = this.formatAmount(filtered_pomain.total_include_tax, '$');
    filtered_pomain.gst_tax_sum = this.formatAmount(filtered_pomain.gst_tax_sum, '$');
    filtered_pomain.SubTotal1 = this.formatAmount(filtered_pomain.SubTotal1, '$');

    this.json = filtered_pomain;
    console.log(this.json)
    this.json.Remark = this.json.Remark==null ? '' : this.json.Remark;

    this.showAddLoading = false;
  },
  methods: {
      handleAction(payload){
        this.$router.push({ name: 'EditPurchaseOrderDetails', query: { refno: payload.RefNo, line: payload.Line } })
      },
      action()
      {
        this.$router.push({
            name: "EditSalesInvoice",
            query: {  refno: this.$route.query.refno  },
        });
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
      async onDecode(code){
        this.showAddLoading = true;

        var payload = {
          "retailer_guid": this.retailer_guid,
          "cardno": code,
          "request_by": this.user_name
        }

        var data = await this.getMemberinfo(payload);
        var iresults = data.results;
        var status = data.status;

        if(status == "success")
        {
          this.code_scanner = false;
          this.cardtype_guid = iresults.cardtype_guid;
          this.json.member = "";
          this.handleChangeMember(iresults);
          this.showAddLoading = false;
        }
        else
        {
          this.code_scanner = false;
          this.showNotify('negative', 'Member Not Found');
          this.cardtype_guid = "";
          this.json.member = "";
          this.json.card = "Non-Member";
          this.json.supplier_id =  await this.getNonmember();
          // this.json.supplier_name = "";
          this.$nextTick(()=>{
            this.$refs.save_form.resetValidation()
            this.showAddLoading = false;
          })
        }
      },
      async getNonmember()
      {
        var payload = {
          params: {
            retailer_guid: this.retailer_guid,
            name: 'Cash Customer'
          }
        }

        var data = await this.getSupcus(payload);
        var result = data.data.results[0];
        return result.supcus_guid;
      },
      async handleChangeMember(results)
      {
        this.showAddLoading = true;

        var code = results.cardno!== undefined ? results.cardno: results;

        var payload = {
          params: {
            code: code,
            retailer_guid: this.retailer_guid
          }
        };

        var data = await this.getSupcus(payload);
        var checkLength = data.data.results;

        if(checkLength.length == 0)
        {
          this.showAddLoading = true;
          this.showNotify('negative','Member Not Found')
          this.cardtype_guid = "";
          this.json.member = "";
          this.json.card = "Non-Member";
          this.json.supplier_id =  await this.getNonmember();
          this.$nextTick(()=>{
            this.$refs.save_form.resetValidation()
            this.showAddLoading = false;
          })
          return;
        }

        this.showNotify('positive','Account exists');
        var results = data.data.results[0];
        var supcus_guid = results.supcus_guid;

        this.json.supplier_id = supcus_guid;

        this.handleChangeSupplier(supcus_guid);
      },
      async getPomain(payload)
      {
        return await this.$store.dispatch('purchase/trigger_read_po_by_refno', payload).then(() => {
            var data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_read_po_by_refno']));
            return data;
        });
      },
      async getGrmain(payload)
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
      async checkSupcus(supcus_guid)
      {
        if(supcus_guid == null)
        {
          return 'Non-Member';
        }

        if(typeof(supcus_guid) == 'string')
        {
          var payload = {
            params: {
              supcus_guid: supcus_guid,
              retailer_guid: this.retailer_guid
            }
          }

          var data = await this.getSupcus(payload);
          var results = data.data.results[0];
          supcus_guid = results;
        }

        var cardno = supcus_guid.code;

        var ipayload = {
          retailer_guid: this.retailer_guid,
          cardno: cardno,
          request_by: this.user_name,
        }

        var idata = await this.getMemberinfo(ipayload);
        var status = idata.status;

        if(status == "success")
        {
          var cardtype_guid = idata.results.cardtype_guid;

          var cpayload = {
            params: {
              cardtype_guid: cardtype_guid
            }
          }

          this.have_member = true;

          var cdata = await this.getMembercardtype(cpayload);
          return cdata.data.results[0].cardtype;
        }
        else
        {
          // this.showNotify('negative', idata.results.message);
          return 'Non-Member';
        }
      },
      handleChangeOutlet(outlet_guid){
        this.json.outlet_id = outlet_guid;
      },
      back(){
        if(this.page_function.endsWith('PurchaseOrder'))
        {
          this.$router.push("PurchaseOrder");
        }
        else if(this.page_function.endsWith('GoodsReceiving'))
        {
          this.$router.push("GoodsReceiving");
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
      async handleChangeSupplier(supcus_guid){
        var supplier_name = "";
        var card = "";

        if(this.page_function.endsWith('SalesInvoice') || this.page_function.endsWith('Instalment'))
        {
          this.showAddLoading = true;

          if(this.cardtype_guid == '')
          {
            if(supcus_guid !== null)
            {
              var selected_supcus = this.all_supcus.filter((entry)=>{
                return entry.supcus_guid == supcus_guid;
              });

              supplier_name = selected_supcus[0].name;

              var cardno = selected_supcus[0].code

              var payload = {
                retailer_guid: this.retailer_guid,
                cardno: cardno,
                request_by: this.user_name
              }

              var data = await this.getMemberinfo(payload);
              var cardtype_guid = data.results.cardtype_guid;

              var cpayload = {
                params: {
                  cardtype_guid: cardtype_guid
                }
              }

              var cdata = await this.getMembercardtype(cpayload);
              var cresults = cdata.data.results[0];
              card = cresults.cardtype;
              this.cardtype_guid = "";
              this.json.member = "";
            }
            else
            {
              this.json.supplier_id = "";
            }
          }
          else
          {
            var selected_supcus = this.all_supcus.filter((entry)=>{
              return entry.supcus_guid == supcus_guid;
            });

            supplier_name = selected_supcus[0].name;

            var cardtype_guid = this.cardtype_guid;

            var payload = {
              params: {
                cardtype_guid: cardtype_guid,
              }
            }

            var data = await this.getMembercardtype(payload);
            var results = data.data.results[0];

            card = results.cardtype

            this.cardtype_guid = "";
          }
        }
        else
        {
          var selected_supcus = this.all_supcus.filter((entry)=>{
            return entry.supcus_guid == supcus_guid;
          });

          supplier_name = selected_supcus[0].name;
        }

        this.json.supplier_name = supplier_name;
        this.json.card = card;
        this.showAddLoading = false;

        this.$nextTick(()=>{
          this.$refs.save_form.resetValidation();
        })
      },
      handleChangeDeliveryDate(delivery_date)
      {
        this.json.delivery_date = delivery_date;
      },
      handleChangeDocDate(doc_date){
        this.json.doc_date = doc_date;
      },
      async addButtonCreatePOChild(){

        // if(this.status == 1)
        // {
        //     this.showNotify("negative","This Doc already posted..");
        //     return;
        // }

        if(this.page_function.endsWith('PurchaseOrder'))
        {
          this.$router.push({
              name: "CreatePurchaseOrderDetails",
              // query: {header_id: this.$route.query.header_id  }
          });
        }
        else if(this.page_function.endsWith('GoodsReceiving'))
        {
          this.$router.push({
              name: "CreateGoodsReceivingDetails",
              query: {header_id: this.$route.query.header_id  }
          });
        }
        else if(this.page_function.endsWith('SalesOrder'))
        {
          this.$router.push({
              name: "CreateSalesOrderDetails",
              query: {header_id: this.$route.query.header_id  }
          });
        }
        else if(this.page_function.endsWith('SalesInvoice'))
        {
          this.$router.push({
              name: "CreateSalesInvoiceDetails",
              query: {header_id: this.$route.query.header_id  }
          });
        }
        else if(this.page_function.endsWith('Instalment'))
        {
          this.$router.push({
              name: "CreateInstalmentDetails",
              query: {header_id: this.$route.query.header_id  }
          });
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
      handleTableChange1: function(newVal)
      {
            var new_params = this.$pluginsTableParams(newVal)

            var payload = {
                params : new_params
            };

            this.ori_params1 = payload;
            this.table_function1(payload);
      },
      table_function(payload){
          var table_column = [
              // {
              //     name: 'action',
              //     required: true,
              //     label: 'Actions',
              //     align: 'left',
              //     sortable: true,
              //     field: 'action',
              //     format_child: '',
              //     tooltip: ''
              // },
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
                  name: 'Barcode',
                  required: true,
                  label: 'Barcode',
                  align: 'left',
                  sortable: true,
                  field: 'Barcode',
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
            payload.params.refno = this.$route.query.refno;

            var data = {};

            await this.$store.dispatch('purchase/trigger_get_grchild', payload).then(() => {
              data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_grchild']));
              var results = data.data;

              for(var i in results)
              {
                var obj = results[i];
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
            });

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

            this.table_data =  {
                "data": {
                    "count": 0,
                    "next": null,
                    "previous": null,
                    "results": data.data
                }
            };
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

        var validated = await this.validate_form('save_form');

        if(!validated)
        {
            this.showNotify("negative","Please make sure all field is correct.");
            this.showAddLoading = false;
            return;
        }

        if(this.page_function == 'CreatePurchaseOrder')
        {
          var currentdate = new Date();
          var current_date_format = currentdate.getFullYear()+"-"+('0' + (currentdate.getMonth()+1)).slice(-2)+"-"+('0' + currentdate.getDate()).slice(-2)
          +" "+('0' + currentdate.getHours()).slice(-2) + ":" + ('0' + currentdate.getMinutes()).slice(-2) + ":" + ('0' + currentdate.getSeconds()).slice(-2);

          if((this.json.delivery_date+" :00:00:00:00") < current_date_format)
          {
            this.showNotify("negative","Delivery date cannot earlier than current date.")
            this.showAddLoading = false;
            return;
          }//checking for delivery date cannot smaller than current date.
        }

        await this.savePO();
      },
      async savePO(){
          var outlet_guid = this.json.outlet_id;
          if(this.json.supplier_id == null)
          {
            this.json.supplier_id = "";
          }
          var supcus_guid = this.json.supplier_id;

          var invoice_no = this.json.invoice_no;
          var weight = this.json.weight;
          var amount = this.json.amount;
          var knockoff_balance = this.json.knockoff_balance;
          var sst_rate = this.json.sst_rate;
          var sst = this.json.sst;
          var total_amt = this.json.total_amt;
          var remark = this.json.remark;

          var payload = {
            "retailer_guid": this.retailer_guid,
            "outlet_guid": outlet_guid,
            "supcus_guid": supcus_guid,
            "invoice_no": invoice_no,
            "weight": weight,
            "amount": amount,
            "knockoff_balance": knockoff_balance,
            "sst_rate": sst_rate,
            "sst": sst,
            "total_amt": total_amt,
            "remark": remark,
            "updated_by": this.user_name
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
          else if(this.page_function.endsWith('GoodsReceiving'))
          {
            // payload.trade_in = this.json.trade_in;
            payload.transdate = this.json.doc_date;
            payload.type = 'G';

            await this.$store.dispatch('purchase/trigger_create_ts_grmain', payload).then(() => {
              data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_ts_grmain_status']));
            });
          }
          else if(this.page_function.endsWith('SalesOrder'))
          {
            payload.transdate = this.json.doc_date;
            payload.type = 'O';

            await this.$store.dispatch('sales/trigger_create_ts_somain', payload).then(() => {
              data = JSON.parse(JSON.stringify(this.$store.getters['sales/get_ts_somain_status']));
            });
          }
          else if(this.page_function.endsWith('SalesInvoice'))
          {
            payload.agent_guid = this.json.agent_guid;
            payload.transdate = this.json.doc_date;
            payload.type = 'I';

            await this.$store.dispatch('sales/trigger_create_ts_simain', payload).then(() => {
              data = JSON.parse(JSON.stringify(this.$store.getters['sales/get_ts_simain_status']));
            });
          }
          else if(this.page_function.endsWith('Instalment'))
          {
            payload.target_amt = this.json.target_amt;

            await this.$store.dispatch('sales/trigger_create_ts_dpmain', payload).then(() => {
              data = JSON.parse(JSON.stringify(this.$store.getters['sales/get_ts_dpmain_status']));
            });
          }

          var status = data.status

          if(status == "success")
          {
            this.showAddLoading = false;
            this.showNotify("positive", "Created Successfully.");

            if(this.page_function.endsWith('PurchaseOrder'))
            {
              this.$router.push({ name: 'EditPurchaseOrder', query: { header_id: data.response.transmain_guid } })
            }
            else if(this.page_function.endsWith('GoodsReceiving'))
            {
              this.$router.push({ name: 'EditGoodsReceiving', query: { header_id: data.response.transmain_guid } })
            }
            else if(this.page_function.endsWith('SalesOrder'))
            {
              this.$router.push({ name: 'EditSalesOrder', query: { header_id: data.response.transmain_guid } })
            }
            else if(this.page_function.endsWith('SalesInvoice'))
            {
              this.$router.push({ name: 'EditSalesInvoice', query: { header_id: data.response.transmain_guid } })
            }
            else if(this.page_function.endsWith('Instalment'))
            {
              this.$router.push({ name: 'EditInstalment', query: { header_id: data.response.transmain_guid } })
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
                    error_message = error_response[loop_index][header];
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
          Notify.create({
              type: type,
              message: message,
              // timeout: 1000,
              position: 'center',
              html: true,
              actions: [
                { label: 'OK', color: 'white', handler: () => { } }
              ]
          })
      },
  },

}
</script>

<style scoped>
* >>> .q-tab--active
{
  color: #273655;
}
* >>> .q-tab--inactive
{
  color: #cccccc;
}

* >>> .q-toolbar
{
  background-color: white;
  border-bottom: 1px #cccccc solid;
}
* >>> .q-tab-panel
{
  padding: 0px;
  padding-top: 10px;
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
  position: sticky;
  padding:0px;
  padding-right: 20px;
  padding-left: 20px;
  bottom: 0px;
  background-color: white;
}
.header_top
{
  position: sticky;
  top: 50px;
  z-index: 2;
  padding:0px;
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

@media screen and (max-width: 600px){
  .upload_container
  {
      padding: 0px;
  }
}

@media screen and (min-width: 600px){
  .upload_container
  {
      padding: 10px;
      padding-top: 0px;
  }
}

/* .upload_container
{
    padding: 10px;
    padding-top: 0px;
} */

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
    margin: 10px;
    padding-top: 10px;
    padding-bottom: 0px;
}

.upload_separator
{
    /* border-bottom: 1px solid #DEE1E6; */
    margin: 10px;
    /* padding-top: 10px; */
    padding-bottom: 30px;
}

.custom_cancel_button
{
    border: 1px solid black;
}

/* * >>> .q-table__top
{
  padding-right: 0px;
} */

/* .content_body_dialog
{
    height: 80vh;
    overflow-y: scroll;
} */

* >>> .q-field--disabled > .q-field__inner > .q-field__control
{
  background-color: #cccccc !important;
}
</style>
