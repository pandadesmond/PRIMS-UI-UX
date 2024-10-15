<template>
  <div v-if="$q.screen.width > 599" class="card_sides">
    <q-card style="max-height: 100%;">
      <!-- <q-card-section class="theme_color dialog_header header_top">
        <div class="intermediate"/>
        <div v-if="page_function == 'CreateSalesInvoice'" class="text-subtitle1 header_text">Sales Invoice</div>
        <div v-if="page_function == 'EditSalesInvoice'" class="text-subtitle1 header_text">Sales Invoice
        <br>Refno: {{ json.RefNo }} Customer: {{ json.Code }} - {{ json.Name }}</div>
      </q-card-section> -->

      <q-card-section class="theme_color dialog_header header_top">
        <div class="intermediate"/>
        <div v-if="page_function == 'CreateSalesInvoice'" class="text-subtitle1 header_text">Sales Invoice</div>
        <div v-if="page_function == 'EditSalesInvoice'" class="text-subtitle1 header_text">
          Sales Invoice<br>
          <span class="text-caption">
            Refno: {{ json.RefNo }} | Customer: {{ json.Code }} - {{ json.Name }} | Branch: {{json.loc_group}}<br>
          </span>
        </div>
      </q-card-section>

      <q-card-section class="upload_container">
        <q-form ref="save_form">
          <div v-if="page_function == 'EditSalesInvoice'" class="intermediate_white"/>
          <div class="row upload_separator_first">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <q-stepper
                flat
                header-nav
                v-model="json.step"
                color="primary"
                animated
                @update:model-value="handleChangeStepper"
                :class="page_function == 'EditSalesInvoice' ? 'sticky_stepper' : ''"
              >
                <q-step
                  :name="1"
                  title="Header"
                  icon="settings"
                  :done="json.step > 1"
                >
                  <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-9 col-lg-9 col-xl-9">
                      <div v-if="page_function=='EditSalesInvoice'" class="row dialog_separator">
                        <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 input_wrapper_right">
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
                        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <SelectFilter
                              :readonly="json.BillStatus == 1 || supplier_readonly"
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
                      </div>

                      <div class="row dialog_separator">
                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 input_wrapper_right">
                          <div class="row">
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
                        </div>


                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 input_wrapper_right">
                          <div class="row">
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

                      <div class="row dialog_separator">
                        <div class="col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Datepicker
                              :clickableInput="true"
                              :disable="json.BillStatus == 1"
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
                              :disable="json.BillStatus == 1"
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
                              :readonly="json.BillStatus == 1"
                              :no_label="false"
                              :label="'Received Location'"
                              v-model:pass_value="json.loc_group"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.select"
                              :options="location_options2"
                              v-on:receiveChange="handleChangeReceivingLocation"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div v-if="page_function=='EditSalesInvoice'" class="row dialog_separator">
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

                      <div class="row dialog_separator">
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
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
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
                              <Checkbox :btm_padding="true" size="xs" :disable="true" v-model="json.consign" :true-value="1" :false-value="0" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-7 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                              <span class="dialog_font">Posted</span>
                            </div>
                            <div class="col-xs-5 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                              <Checkbox :btm_padding="true" size="xs" :disable="true" v-model="json.BillStatus" :true-value="1" :false-value="0" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-7 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                              <span class="dialog_font">In-kind</span>
                            </div>
                            <div class="col-xs-5 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                              <Checkbox :btm_padding="true" size="xs" :disable="true" v-model="json.in_kind" :true-value="1" :false-value="0" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-7 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                              <span class="dialog_font">D/O</span>
                            </div>
                            <div class="col-xs-5 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                              <Checkbox :btm_padding="true" size="xs" :disable="true" v-model="json.DOState" :true-value="1" :false-value="0" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-7 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                              <span class="dialog_font">IBT/ICT</span>
                            </div>
                            <div class="col-xs-5 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                              <Checkbox :btm_padding="true" size="xs" :disable="true" v-model="json.ibt" :true-value="1" :false-value="0" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-7 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                              <span class="dialog_font">Invoice</span>
                            </div>
                            <div class="col-xs-5 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                              <Checkbox :btm_padding="true" size="xs" :disable="true" v-model="json.InvState" :true-value="1" :false-value="0" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </q-step>

                <q-step
                  :name="2"
                  title="Detail"
                  icon="create_new_folder"
                  :done="json.step > 2"
                >
                  <div class="row upload_separator">
                      <div class="card_section_two col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <PurchaseTable
                          hide_footer
                          :readonly_button="false"
                          :row_per_page="[0]"
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
                          :delete_button="json.BillStatus == 0"
                          :flat_status="true"
                          :bordered_status="true"
                          v-on:receiveRequestTable="handleTableChange"
                          />
                      </div>
                  </div>
                </q-step>
              </q-stepper>
            </div>
          </div>
        </q-form>
      </q-card-section>

      <q-card-actions class="dialog_action justify-between">
        <div v-if="this.json.step == 1">
          <Button_icon v-if="page_function == 'EditSalesInvoice'"  :flat="true" :font_color="'white'" :color="'#094161'" :text="json.BillStatus==1 ? 'UNPOST' : 'POST'" :outline="false" size="15px"
          v-on:receiveClick="confirmPost"/>

          <span v-if="json.BillStatus == 0" class="q-pl-xs">
            <Button_icon  :flat="true" :font_color="'white'" :color="'#094161'" :text="'SAVE'" :outline="false" size="15px"
            v-on:receiveClick="handleCreatePO"/>
          </span>

          <span v-if="page_function=='EditSalesInvoice'" class="q-pl-xs">
            <Button_icon :flat="false" :font_color="'black'" :color="'white'" :text="'NEXT'" :outline="true" size="15px"
            @click="json.step = 2"/>
          </span>
        </div>

        <div v-if="this.json.step == 2">
          <Button_icon v-if="json.BillStatus == 0" :flat="true" :font_color="'white'" :color="'#094161'" :text="'SAVE'" :outline="false" size="15px"
          v-on:receiveClick="handleCreatePO"/>

          <span class="q-pl-xs">
            <Button_icon :flat="false" :font_color="'black'" :color="'white'" :text="'PREVIOUS'" :outline="true" size="15px"
            @click="json.step = 1"/>
          </span>
        </div>

          <Button_icon :flat="true" :font_color="'black'" :color="'white'" :text="'BACK'" :outline="true" size="15px" class="custom_cancel_button" @click="back()" />
      </q-card-actions>

      <q-inner-loading
        :showing="showAddLoading"
        color="primary"
      />
    </q-card>
  </div>

  <div v-else class="card_sides">
    <q-card style="min-height: 100vh;">
      <q-card-section class="header_top">
        <Button_icon :disable="showAddLoading" :big_round="true" :flat="true" :font_color="'black'" :color="'rgba(255, 255, 255, 0.5)'" :icon="'arrow_back_ios'" :outline="true" size="12px" class="custom_back_button" @click="back()" />
        <div v-if="page_function == 'CreateSalesInvoice'" class="text-subtitle1 header_text">Sales Invoice</div>
        <div v-if="page_function == 'EditSalesInvoice'" class="text-subtitle1 header_text">Sales Invoice
        <br>Refno: {{ json.RefNo }}</div>
        <!-- <q-btn-dropdown v-if="page_function == 'EditSalesInvoice'" :disable="showAddLoading" class="custom_more_button" flat dense icon="more_vert">
          <q-list>
            <q-item clickable v-close-popup>
              <q-item-section>
                <q-item-label @click="confirmPost" v-if="json.BillStatus==1">UNPOST</q-item-label>
                <q-item-label @click="confirmPost" v-else>POST</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown> -->
      </q-card-section>

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
              >
              <q-step
                  :name="1"
                  title="Header"
                  icon="settings"
                  :done="json.step > 1"
                >
                  <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-9 col-lg-9 col-xl-9">
                      <div class="row dialog_separator">
                        <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Received By</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="true"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="json.Receivedby"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="row dialog_separator">
                        <div class="input_wrapper_right" :class="json.BillStatus == 0 && !supplier_readonly ? 'col-xs-10' : 'col-xs-12'">
                          <div class="row">
                          <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                            <span class="mobile_font">Supplier</span>
                          </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <SelectFilter
                              :readonly="json.BillStatus == 1 || supplier_readonly"
                              :no_label="true"
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

                        <div v-if="json.BillStatus == 0 && !supplier_readonly" dir="rtl" class="col-xs-2 col-sm-1 col-md-1 col-lg-1 col-xl-1 input_wrapper_right" style="padding-top: 21px;">
                            <Button_icon :small_round="true" :flat="false" :font_color="'white'" :color="'primary'" :icon="'search'" :outline="false" size="13px"
                            v-on:receiveClick="addButtonCreatePOChild('supplier')" style="margin-top: 2px;"/>
                        </div>
                      </div>

                      <div class="row dialog_separator">
                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">D/O #</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="true"
                              :readonly="json.BillStatus == 1"
                              v-on:change="handleChange"
                              v-model="json.DONo"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>


                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Invoice #</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="true"
                              :readonly="json.BillStatus == 1"
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
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Invoice Date</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Datepicker
                              :clickableInput="true"
                              :disable="json.BillStatus == 1"
                              :no_label="true"
                              :autoclose="true"
                              v-on:receiveChange="handleChangeDocDate"
                              :daterange="json.DocDate"
                              :componentBehavior="dbComponentBehavior ? dbComponentBehavior.select : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Receiving Date</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Datepicker
                              :clickableInput="true"
                              :disable="json.BillStatus == 1"
                              :autoclose="true"
                              :no_label="true"
                              v-on:receiveChange="handleChangeGrDate"
                              :daterange="json.GRDate"
                              :componentBehavior="dbComponentBehavior ? dbComponentBehavior.select : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                          <div class="row" :class="$q.screen.width < 1024 ? 'dialog_separator' : ''">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Branch</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <SelectFilter
                              :readonly="json.BillStatus == 1"
                              :no_label="true"
                              v-model:pass_value="json.loc_group"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.select"
                              :options="location_options"
                              v-on:receiveChange="handleChangeLocGroup"
                              />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                          <div class="row" :class="$q.screen.width < 1024 ? 'dialog_separator' : ''">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Received Location</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <SelectFilter
                              :readonly="json.BillStatus == 1"
                              :no_label="true"
                              v-model:pass_value="json.loc_group"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.select"
                              :options="location_options2"
                              v-on:receiveChange="handleChangeLocGroup"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div v-if="page_function=='EditSalesInvoice'" class="row dialog_separator">
                        <div class="col-xs-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Term</span>
                            </div>
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
                              :no_label="true"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="json.Term"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>


                        <div class="col-xs-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Cal. Due Date by</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="true"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="json.CalDueDateby"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 input_wrapper_right">
                          <div class="row" :class="$q.screen.width < 1024 ? 'dialog_separator' : ''">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Due Date</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Datepicker
                              :clickableInput="true"
                              :no_label="true"
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
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">REBATE</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="true"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="json.rebate_amt"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 input_wrapper_right">
                          <div class="row" :class="$q.screen.width < 1024 ? 'dialog_separator' : ''">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Tax %</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="true"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="json.gst_tax_rate"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 input_wrapper_right">
                          <div class="row" :class="$q.screen.width < 1024 ? 'dialog_separator' : ''">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Tax Amt</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="true"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="json.gst_tax_sum"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 input_wrapper_right">
                          <div class="row" :class="$q.screen.width < 1024 ? 'dialog_separator' : ''">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Tax Adjust</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="true"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="json.gst_adj"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 input_wrapper_right">
                          <div class="row" :class="$q.screen.width < 1024 ? 'dialog_separator' : ''">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Landed Cost</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="true"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="json.landed_cost_total"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
                      <div class="row">
                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Rounding Adjust</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="true"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="json.rounding_adj"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Total After Tax</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="true"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="json.total_include_tax"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Cross Ref #</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="true"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="json.cross_ref"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="row dialog_separator">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                              <span class="dialog_font">GRN Total</span>
                            </div>
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                              <span class="dialog_font">Invoice Total</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Gross</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="true"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="json.Subtotal1"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Gross</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="true"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="json.InvAmount_Vendor"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Disc</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="true"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="json.Discount1"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Disc</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="true"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="json.InvSurchargeDisc_Vendor"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Nett</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="true"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="json.Total"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Nett</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="true"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="json.InvNetAmt_Vendor"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="row dialog_separator">
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
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Exclude Tax</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="true"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="json.input_amt_exc_tax"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">GST</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="true"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="json.input_gst"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="row dialog_separator">
                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Include Tax</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="true"
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
                            <div class="col-xs-7 col-sm-6 col-md-8 col-lg-8 col-xl-8">
                              <span class="dialog_font">Consign</span>
                            </div>
                            <div class="col-xs-5 col-sm-6 col-md-4 col-lg-4 col-xl-4">
                              <Checkbox :btm_padding="true" size="xs" :disable="true" v-model="json.consign" :true-value="1" :false-value="0" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-7 col-sm-6 col-md-8 col-lg-8 col-xl-8">
                              <span class="dialog_font">Posted</span>
                            </div>
                            <div class="col-xs-5 col-sm-6 col-md-4 col-lg-4 col-xl-4">
                              <Checkbox :btm_padding="true" size="xs" :disable="true" v-model="json.BillStatus" :true-value="1" :false-value="0" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-7 col-sm-6 col-md-8 col-lg-8 col-xl-8">
                              <span class="dialog_font">In-kind</span>
                            </div>
                            <div class="col-xs-5 col-sm-6 col-md-4 col-lg-4 col-xl-4">
                              <Checkbox :btm_padding="true" size="xs" :disable="true" v-model="json.in_kind" :true-value="1" :false-value="0" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-7 col-sm-6 col-md-8 col-lg-8 col-xl-8">
                              <span class="dialog_font">D/O</span>
                            </div>
                            <div class="col-xs-5 col-sm-6 col-md-4 col-lg-4 col-xl-4">
                              <Checkbox :btm_padding="true" size="xs" :disable="true" v-model="json.DOState" :true-value="1" :false-value="0" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-7 col-sm-6 col-md-8 col-lg-8 col-xl-8">
                              <span class="dialog_font">IBT/ICT</span>
                            </div>
                            <div class="col-xs-5 col-sm-6 col-md-4 col-lg-4 col-xl-4">
                              <Checkbox :btm_padding="true" size="xs" :disable="true" v-model="json.ibt" :true-value="1" :false-value="0" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-7 col-sm-6 col-md-8 col-lg-8 col-xl-8">
                              <span class="dialog_font">Invoice</span>
                            </div>
                            <div class="col-xs-5 col-sm-6 col-md-4 col-lg-4 col-xl-4">
                              <Checkbox :btm_padding="true" size="xs" :disable="true" v-model="json.InvState" :true-value="1" :false-value="0" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                              <span class="dialog_font">Exported to account</span>
                            </div>
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
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
                  </div>
                </q-step>

                <q-step
                  v-if="results.length != 0"
                  :name="2"
                  title="Detail"
                  icon="create_new_folder"
                  :done="json.step > 2"
                >
                  <div class="row">
                    <div class="card_section_two col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                      <q-card v-if="results.length != 0" flat bordered class="card_design" style="width: 100%; border-radius:6px;">
                          <q-card-section @click="handleAction(result)" v-for="(result,index) in results" :key="index" style="padding: 5px; border-bottom: 1px solid rgba(0, 0, 0, 0.12);">
                            <div class="row">
                              <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9 col-xl-9 q-pl-sm">
                                <div class="row text-subtitle2">
                                  {{ result.Description }}
                                </div>
                              </div>
                              <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 q-pr-sm text-caption" align="right">
                                {{ result.Qty }}
                                <div style="padding-top: 35px;">
                                 {{ currency_sign }} {{ result.TotalPrice }}
                                </div>
                              </div>
                            </div>
                          </q-card-section>
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

    <div v-if="json.step == 1" class="dialog_action_bottom" :style="page_function == 'EditSalesInvoice' && json.BillStatus== 0 ? 'height: 65px;' : 'height: 40px;'">
      <div v-if="page_function == 'EditSalesInvoice'" class="row q-px-sm" :class="page_function == 'EditSalesInvoice' && json.BillStatus !== 0 ? 'q-pt-sm' :''" style="font-size: 13px;">
        <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 ">
          <div class="row justify-left items-center" >
              <Button_icon class="q-pa-none q-ma-none" :flat="true" :icon="'expand_less'" v-on:receiveClick="show_summary_dialog" :font_color="'primary'" :color="'primary'" :outline="false" size="13px"/>
              <span class="" style="color:#1976D2;" @click="show_summary_dialog"> Total Amount: {{ currency_sign }} {{ json.total_include_tax }} </span>
            </div>
        </div>
        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 text-right">
           <!-- POST BUTTON -->
           <span class="q-pr-xs" :style="json.BillStatus == 1 ? 'width: 100%;' : 'width: 24%;'">
            <Button_icon v-if="json.BillStatus==1" class="full-width" style="height: 25px;" :small_round="true" :text="'UNPOST'" :flat="false" :font_color="'white'" :color="'#273655'" :outline="false" size="11px" @click="confirmPost"/>
            <Button_icon v-else class="full-width" style="height: 25px;" :small_round="true" :text="'POST'" :flat="false" :font_color="'white'" :color="'#273655'" :outline="false" size="11px" @click="confirmPost"/>
          </span>
        </div>
      </div>

      <div class="row q-px-sm q-py-xs">
        <!-- <span class="q-pr-xs" :style="json.BillStatus == 1 ? 'width: 100%;' : 'width: 24%;'">
          <Button_icon v-if="json.BillStatus==1" class="full-width" style="height: 30px;" :small_round="true" :text="'UNPOST'" :flat="false" :font_color="'white'" :color="'#273655'" :outline="false" size="13px" @click="confirmPost"/>
          <Button_icon v-else class="full-width" style="height: 30px;" :small_round="true" :text="'POST'" :flat="false" :font_color="'white'" :color="'#273655'" :outline="false" size="13px" @click="confirmPost"/>
        </span> -->
        <Button_icon v-if="json.BillStatus==0" :readonly="page_function.startsWith('Edit') && deepEqual(ori_json, json)" style="height: 30px; width: 100%" :small_round="true" :text="page_function.startsWith('Create') ? 'Generate Sales Invoice' : 'Update Sales Invoice'" :flat="false" :font_color="'white'" :color="'primary'" :outline="false" size="13px" @click="handleCreatePO"/>
      </div>
    </div>

    <div v-if="json.step == 2" class="dialog_action_bottom" :style="page_function == 'EditSalesInvoice' && json.BillStatus== 0  ? 'height: 40px;' : ''">
      <div v-if="page_function == 'EditSalesInvoice'" class="row q-px-sm q-py-sm"   style="font-size: 13px;">
        <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 ">
          <div class="row justify-left items-center" >
          <!-- <span class="" style="color:#1976D2;" @click="show_summary_dialog">View</span> -->
            <Button_icon class="q-pa-none q-ma-none" :flat="true" :icon="'expand_less'" v-on:receiveClick="show_summary_dialog" :font_color="'primary'" :color="'primary'" :outline="false" size="13px"/>
            <span class="" style="color:#1976D2;" @click="show_summary_dialog"> Total Amount: {{currency_sign}} {{ json.Total }}</span>
            <!-- Total Amount -->
            </div>
        </div>
        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 text-right">
          <!-- POST BUTTON -->
          <span class="q-pr-xs" :style="json.BillStatus == 1 ? 'width: 100%;' : 'width: 24%;'">
            <Button_icon v-if="json.BillStatus==1" class="full-width" style="height: 25px;" :small_round="true" :text="'UNPOST'" :flat="false" :font_color="'white'" :color="'#273655'" :outline="false" size="11px" @click="confirmPost"/>
            <Button_icon v-else class="full-width" style="height: 25px;" :small_round="true" :text="'POST'" :flat="false" :font_color="'white'" :color="'#273655'" :outline="false" size="11px" @click="confirmPost"/>
          </span>
        </div>
      </div>
    </div>
  </div>

  <q-dialog v-model="delete_child" persistent position="top">
    <q-card style="width: 700px; max-width: 98vw;text-align:center;margin-top: 5%;">

      <q-card-section class="row items-center" style="padding-top:1%;padding-bottom:1%;border-bottom: 1px solid #a7bbcb;">
        <div class="text-h6">Confirmation</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup :disable="showAddLoading || showAddLoading2"/>
      </q-card-section>

      <q-card-section>
        <!-- <span class="q-ml-sm custom_selection_font">{{general_body}}</span> -->
        <span>Are you sure to delete this line?</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn flat label="OK" color="primary" @click="handleDeleteLine" />
      </q-card-actions>

      <q-inner-loading
        :showing="deleteLoading"
        color="primary"
      />
    </q-card>
  </q-dialog>

  <q-dialog v-model="modify_child" persistent :position="$q.screen.width > 599 ? 'top' : 'bottom'">
    <q-card v-if="$q.screen.width < 600" style="width: 700px; max-width: 98vw; margin-top: 5%;">
      <q-card-section class="row header_top_mobile">
        <div v-if="json.BillStatus == 0 && edit_child" class="custom_delete" @click="handleDelete(jsonChild)">
          Delete
          <!-- <Button_icon :disabled="readonly_delete" :icon="'delete'" :color="'negative'" :outline="false" size="12px" v-on:click="handleDelete(jsonChild)" class="q-mr-sm" /> -->
        </div>

        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center">
          <div v-if="!edit_child" class="text-subtitle1 header_text" style="margin-top: 5px;">Sales Invoice Detail<br></div>
          <div v-else class="text-subtitle1 header_text" style="margin-top: 5px;">Edit Sales Invoice Detail<br></div>
        </div>
        <div class="custom_close_button">
          <q-btn icon="close" flat round dense @click="close()" :disable="false"/>
        </div>
      </q-card-section>

      <q-card-section class="upload_container">
        <q-form ref="save_edit_pochild_form">
          <div class="row upload_separator_first">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <div class="row input_wrapper_right">
                <div v-if="!edit_child" class="col-xs-12 col-sm-12 col-md-5 col-lg-5 col-xl-5">
                  <div class="row dialog_separator">
                    <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                      <span class="mobile_font">Search Method</span>
                    </div>
                    <div class="col-xs-4 col-sm-5 col-md-4 col-lg-4 col-xl-4 q-pr-sm">
                      <Select
                      :readonly="json.BillStatus == 1"
                      :no_label="true"
                      v-model="jsonChild.type"
                      :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.search_method : oridbComponentBehavior.select"
                      :options="search_options"
                      v-on:receiveChange="handleChangeType"
                      />
                    </div>

                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                      <Input
                      :autofocusclick="true"
                      :no_label="false"
                      placeholder="Search"
                      :readonly="json.BillStatus == 1"
                      v-on:change="handleChange"
                      v-model="jsonChild.value"
                      :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                    </div>

                    <div dir="rtl" class="button_upload_wrapper col-xs-2 col-sm-1 col-md-2 col-lg-2 col-xl-2">
                      <Button_icon :small_round="true" :flat="false" :font_color="'white'" :color="'#primary'" :icon="'search'" :outline="false" size="13px"
                      v-on:receiveClick="showSearchDialog()" style="margin-top: 2px;"/>
                    </div>
                  </div>
                </div>

                <div class="col-xs-12 col-sm-12 col-md-7 col-lg-7 col-xl-7"></div>

                <div v-if="searchItem" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <div class="row dialog_separator" style="overflow: scroll">
                    <ItemTable
                    :forceLoading="forceLoading"
                    v-on:onRowClick="handleRowClick"
                    :row_per_page="[5,10,20,50,0]"
                    :top_button="false"
                    v-on:add_button="addButtonCreate"
                    v-on:main_action="handleAction"
                    v-on:main_edit="handleEdit"
                    v-on:main_list="handleList"
                    v-on:main_delete="handleDelete"
                    :title="table_title"
                    :table_data="item_table_data"
                    :table_column="item_table_column"
                    :action_button="true"
                    :edit_button="false"
                    :view_button="false"
                    :delete_button="false"
                    :flat_status="true"
                    :bordered_status="true"
                    v-on:receiveRequestTable="handleItemTableChange"
                    style="padding: 0px;"
                    />
                  </div>
                </div>

                <div v-if="searchItem" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <div class="row dialog_separator" dir="rtl">
                      <Button_icon :small_round="true" :readonly="false" :flat="false" :font_color="'white'" :color="'primary '" :text="'ENTER'" :outline="false" size="15px" @click="handleModifyItemcode()"/>
                  </div>
                </div>

                <!-- TBC -->
                <!-- <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6"></div>

                <div class="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2" :class="$q.screen.width > 1023 ? 'q-pl-sm': ''">
                  <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
                      <div class="row">
                        <div class="col-xs-2 col-sm-2 col-md-3 col-lg-3 col-xl-3">
                          <Checkbox
                          size="xs"
                          :disable="false"
                          :no_label="true"
                          v-model="jsonChild.group"
                          v-on:receiveChange="handleChange"
                          :dbComponentBehavior="dbComponentBehavior.text"
                          :true-value="1"
                          :false-value="0"
                          />
                        </div>
                        <div class="col-xs-10 col-sm-10 col-md-9 col-lg-9 col-xl-9" style="margin-top: 3px">
                          <span class="dialog_font">Group</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> -->
              </div>

              <div class="row input_wrapper_right">
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
                              <Radio size="xs" :disable="json.BillStatus == 1" v-on:receiveChange="handleChangeEntryType" v-model="jsonChild.EntryType" :options="entry_type_options"  />
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
                              <Radio size="xs" :disable="json.BillStatus == 1" v-on:receiveChange="handleChangePriceType" v-model="jsonChild.PriceType" :options="pricing_type_options"  />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"></div>

                    <div class="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Item Code</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="true"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="jsonChild.Itemcode"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 four_column_left">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Description</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="true"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="jsonChild.Description"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="col-xs-6 col-sm-6 col-md-2 col-lg-2 col-xl-2 four_column_left two_column_left">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Barcode</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <!-- <Input
                              v-if="edit_child"
                              :autofocusclick="true"
                              :no_label="true"
                              :readonly="json.BillStatus == 1"
                              v-on:change="handleChange"
                              v-model="jsonChild.barcode"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" /> -->
                              <Select
                              :readonly="json.BillStatus == 1"
                              :no_label="true"
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

                    <div v-if="edit_child" class="col-xs-6 col-sm-6 col-md-2 col-lg-2 col-xl-2 four_column_left">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Pack Size</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="true"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="jsonChild.PackSize"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right_readonly : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="col-xs-6 col-sm-6 col-md-2 col-lg-2 col-xl-2 two_column_left">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Article No</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="true"
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

                  <div class="row dialog_separator">
                    <div v-if="edit_child" class="col-xs-6 col-sm-6 col-md-2 col-lg-2 col-xl-2 four_column_left">
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
                    </div>

                    <div class="col-xs-6 col-sm-2 col-md-1 col-lg-1 col-xl-1 four_column_left" :class="$q.screen.width>599 && $q.screen.width<1024 ? 'two_column_left' : !edit_child ? 'two_column_left' : ''">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                          <span class="mobile_font">Qty</span>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <Input
                          :autofocusclick="true"
                          :no_label="true"
                          :readonly="json.BillStatus == 1"
                          v-on:change="handleChangeQty"
                          v-model="jsonChild.SetQty"
                          :dbComponentBehavior="dbComponentBehavior ? (status==1? dbComponentBehavior.text_right_readonly : dbComponentBehavior.text_right) : oridbComponentBehavior.text" />
                        </div>
                      </div>
                    </div>

                    <div class="col-xs-6 col-sm-4 col-md-2 col-lg-2 col-xl-2 four_column_left two_column_left">
                      <div class="row" :class="$q.screen.width<599 ? 'dialog_separator': ''">
                        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                          <span class="mobile_font">Unit Price</span>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <Input
                          :autofocusclick="true"
                          :no_label="true"
                          :readonly="json.BillStatus == 1 || jsonChild.PriceType=='FOC' ? true : unit ? false : true"
                          v-on:change="handleChangeUnitPrice"
                          v-model="jsonChild.UnitPrice"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right_readonly : oridbComponentBehavior.text" />
                        </div>
                      </div>
                    </div>

                    <div class="col-xs-6 col-sm-7 col-md-3 col-lg-3 col-xl-3">
                      <div class="row" :class="$q.screen.width<1024 ? 'dialog_separator': ''">
                        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                          <span class="mobile_font">Discount(+)/Surcharge(-)</span>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <Input
                          :autofocusclick="true"
                          :no_label="true"
                          :readonly="json.BillStatus == 1 || jsonChild.PriceType=='FOC' ? true : unit ? false : true"
                          v-on:change="handleChangeDiscAmt"
                          v-model="jsonChild.DiscAmt"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row dialog_separator">
                    <div class="col-xs-6 col-sm-3 col-md-3 col-lg-3 col-xl-3 four_column_left two_column_left">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                          <span class="mobile_font">Disc1Type</span>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <Select
                          dir="rtl"
                          :readonly="json.BillStatus == 1 || jsonChild.PriceType=='FOC' ? true : unit ? false : true"
                          :no_label="true"
                          v-model="jsonChild.Disc1Type"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.disc1type : oridbComponentBehavior.select"
                          :options="disctype_options"
                          v-on:receiveChange="handleChangeDiscType"
                          />
                        </div>
                      </div>
                    </div>

                    <div class="col-xs-6 col-sm-3 col-md-3 col-lg-3 col-xl-3 four_column_left" :class="$q.screen.width >599 ? 'two_column_left' : ''">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                          <span class="mobile_font">Disc1Value</span>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <Input
                          :autofocusclick="true"
                          :no_label="true"
                          :readonly="json.BillStatus == 1 || jsonChild.PriceType=='FOC' ? true : unit ? false : true"
                          v-on:change="handleChangeDisc1Value"
                          v-model="jsonChild.Disc1Value"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                        </div>
                      </div>
                    </div>

                    <div class="col-xs-6 col-sm-3 col-md-3 col-lg-3 col-xl-3 four_column_left two_column_left">
                      <div class="row" :class="$q.screen.width<599 ? 'dialog_separator': ''">
                        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                          <span class="mobile_font">Disc2Type</span>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <Select
                          dir="rtl"
                          :readonly="json.BillStatus == 1 || jsonChild.PriceType=='FOC' ? true : unit ? false : true"
                          :no_label="true"
                          v-model="jsonChild.Disc2Type"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.disc2type : oridbComponentBehavior.select"
                          :options="disctype_options"
                          v-on:receiveChange="handleChangeDiscType"
                          />
                        </div>
                      </div>
                    </div>

                    <div class="col-xs-6 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                      <div class="row" :class="$q.screen.width<599 ? 'dialog_separator': ''">
                        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                          <span class="mobile_font">Disc2Value</span>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <Input
                          :autofocusclick="true"
                          :no_label="true"
                          :readonly="json.BillStatus == 1 || jsonChild.PriceType=='FOC' ? true : (unit ? false : true)"
                          v-on:change="handleChangeDisc2Value"
                          v-model="jsonChild.Disc2Value"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row dialog_separator">
                    <div class="col-xs-6 col-sm-6 col-md-2 col-lg-2 col-xl-2 four_column_left two_column_left">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                          <span class="mobile_font">Net Price</span>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <Input
                          :autofocusclick="true"
                          :no_label="true"
                          :readonly="true"
                          v-on:change="handleChange"
                          v-model="jsonChild.NetUnitPrice"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                        </div>
                      </div>
                    </div>

                    <div class="col-xs-6 col-sm-6 col-md-2 col-lg-2 col-xl-2 four_column_left">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                          <span class="mobile_font">Total before Tax</span>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <Input
                          :autofocusclick="true"
                          :no_label="true"
                          :readonly="json.BillStatus == 1 || jsonChild.PriceType=='FOC' ? true : unit"
                          v-on:change="handleChangeTotalPrice"
                          v-model="jsonChild.TotalPrice"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row dialog_separator">
                    <div v-if="edit_child" class="col-xs-6 col-sm-6 col-md-2 col-lg-2 col-xl-2 four_column_left two_column_left">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                          <span class="mobile_font">Rebate Amount</span>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <Input
                          :autofocusclick="true"
                          :no_label="true"
                          :readonly="json.BillStatus == 1"
                          v-on:change="handleChangeRebateValue"
                          v-model="jsonChild.rebate_value"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                        </div>
                      </div>
                    </div>

                    <div v-if="edit_child" class="col-xs-6 col-sm-6 col-md-2 col-lg-2 col-xl-2 four_column_left">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                          <span class="mobile_font">Future Price</span>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <Input
                          :autofocusclick="true"
                          :no_label="true"
                          :readonly="true"
                          v-on:change="handleChange"
                          v-model="jsonChild.price_future"
                          :dbComponentBehavior="dbComponentBehavior ? (status==1? dbComponentBehavior.text_right_readonly : dbComponentBehavior.text_right) : oridbComponentBehavior.text" />
                        </div>
                      </div>
                    </div>

                    <div class="upload_separator_second">
                      <span class="text-subtitle1">Invoice</span>

                      <div class="row dialog_separator">
                        <div class="col-xs-6 col-sm-2 col-md-1 col-lg-1 col-xl-1 four_column_left two_column_left">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Qty</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="true"
                              :readonly="json.BillStatus == 1"
                              v-on:change="handleChangeInvQty"
                              v-model="jsonChild.Inv_Qty"
                              :dbComponentBehavior="dbComponentBehavior ? (status==1? dbComponentBehavior.text_right_readonly : dbComponentBehavior.text_right) : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-2 col-md-2 col-lg-2 col-xl-2 four_column_left" :class="$q.screen.width > 599 ? 'two_column_left': ''">
                          <div class="row" >
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Unit Price</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="true"
                              :readonly="json.BillStatus ==1 ? true : unit ? false : true"
                              v-on:change="handleChangeInvUnitPrice"
                              v-model="jsonChild.Inv_UnitPrice"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right_readonly : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-2 col-md-2 col-lg-2 col-xl-2 four_column_left two_column_left">
                          <div class="row" :class="$q.screen.width<599 ? 'dialog_separator' : ''">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Disc1Type</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Select
                              dir="rtl"
                              :readonly="json.BillStatus ==1 ? true : unit ? false : true"
                              :no_label="true"
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
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Disc1Value</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="true"
                              :readonly="json.BillStatus ==1 ? true : unit ? false : true"
                              v-on:change="handleChangeInvDisc1Value"
                              v-model="jsonChild.Inv_Disc1Value"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-2 col-md-2 col-lg-2 col-xl-2 four_column_left two_column_left">
                          <div class="row" :class="$q.screen.width<599 ? 'dialog_separator': ''">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Disc2Type</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Select
                              dir="rtl"
                              :readonly="json.BillStatus ==1 ? true : jsonChild.PriceType=='FOC' ? true :  unit ? false : true"
                              :no_label="true"
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
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Disc2Value</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="true"
                              :readonly="json.BillStatus ==1 ? true : jsonChild.PriceType=='FOC' ? true :  unit ? false : true"
                              v-on:change="handleChangeInvDisc2Value"
                              v-model="jsonChild.Inv_Disc2Value"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="row dialog_separator">
                        <div class="col-xs-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 four_column_left two_column_left">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Net Price</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="true"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="jsonChild.Inv_NetUnitPrice"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 four_column_left">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Total before Tax</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="true"
                              :readonly="json.BillStatus ==1 ? true : jsonChild.PriceType=='FOC' ? true :  unit"
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
            </div>
          </div>
        </q-form>
      </q-card-section>

      <q-card-actions v-if="json.BillStatus == 0" class="dialog_action" style="padding-left: 20px;">
        <div class="row full-width">
          <div v-if="!edit_child" class="col-xs-6 q-pr-xs">
            <Button_icon class="full-width" style="height: 30px;" :small_round="true" :text="'ADD'" :flat="false" :font_color="'white'" :color="'primary'" :outline="false" size="13px" @click="handleChild('save&add')"/>
          </div>
          <div :class="!edit_child ? 'col-xs-6 q-pl-xs': 'full-width'">
            <Button_icon class="full-width" style="height: 30px;" :small_round="true" :text="'DONE'" :flat="false" :font_color="'white'" :color="'primary'" :outline="false" size="13px" @click="handleChild('save')"/>
          </div>
        </div>
      </q-card-actions>

      <q-inner-loading
        :showing="showAddLoading"
        color="primary"
      />
    </q-card>

    <q-card v-else style="width: 700px; max-width: 98vw; margin-top: 5%;">
      <q-card-section class=" row theme_color header_top_mobile dialog_header" style="padding: 0px;">
          <div class="text-subtitle1 header_text" style="margin-top: 5px;">Sales Invoice Detail<br></div>
          <q-space />
          <q-btn icon="close" flat round dense @click="close()" :disable="false"/>
      </q-card-section>

      <q-card-section class="upload_container">
        <q-form ref="save_edit_pochild_form">
          <div class="row upload_separator_first">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <div class="row input_wrapper_right">
                <div v-if="!edit_child" class="col-xs-12 col-sm-12 col-md-5 col-lg-5 col-xl-5">
                  <div class="row dialog_separator">
                    <div class="col-xs-4 col-sm-5 col-md-4 col-lg-4 col-xl-4 q-pr-sm">
                      <Select
                      :readonly="json.BillStatus == 1"
                      :no_label="false"
                      v-model="jsonChild.type"
                      :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.search_method : oridbComponentBehavior.select"
                      :options="search_options"
                      v-on:receiveChange="handleChangeType"
                      />
                    </div>

                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                      <Input
                      :autofocusclick="true"
                      :no_label="false"
                      label="Search"
                      :readonly="json.BillStatus == 1"
                      v-on:change="handleChange"
                      v-model="jsonChild.value"
                      :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                    </div>

                    <div dir="rtl" class="button_upload_wrapper col-xs-2 col-sm-1 col-md-2 col-lg-2 col-xl-2">
                      <Button_icon :flat="true" :font_color="'white'" :color="'#094161'" :icon="'search'" :outline="false" size="13px"
                      v-on:receiveClick="showSearchDialog()" style="margin-top: -2px;"/>
                    </div>
                  </div>
                </div>

                <div class="col-xs-12 col-sm-12 col-md-7 col-lg-7 col-xl-7"></div>

                <div v-if="searchItem" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <div class="row dialog_separator" style="overflow: scroll">
                    <ItemTable
                    :forceLoading="forceLoading"
                    v-on:onRowClick="handleRowClick"
                    :row_per_page="[5,10,20,50,0]"
                    :top_button="false"
                    v-on:add_button="addButtonCreate"
                    v-on:main_action="handleAction"
                    v-on:main_edit="handleEdit"
                    v-on:main_list="handleList"
                    v-on:main_delete="handleDelete"
                    :title="table_title"
                    :table_data="item_table_data"
                    :table_column="item_table_column"
                    :action_button="true"
                    :edit_button="false"
                    :view_button="false"
                    :delete_button="false"
                    :flat_status="true"
                    :bordered_status="true"
                    v-on:receiveRequestTable="handleItemTableChange"
                    style="padding: 0px;"
                    />
                  </div>
                </div>

                <div v-if="searchItem" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <div class="row dialog_separator" dir="rtl">
                      <Button_icon :readonly="json.BillStatus == 1 ? true : false" :flat="true" :font_color="'white'" :color="'#094161 '" :text="'ENTER'" :outline="false" size="15px" @click="handleModifyItemcode()"/>
                  </div>
                </div>
              </div>

              <div v-if="$q.screen.width < 1024" class="row input_wrapper_right">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <div class="row dialog_separator">
                    <div class="col-xs-10 col-sm-11 col-md-6 col-lg-6 col-xl-6" :class="$q.screen.width > 1023 ? 'q-pl-sm': ''">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
                          <div class="row">
                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                              <span class="dialog_font">Entry Type</span>
                            </div>
                            <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                              <Radio size="xs" :disable="json.BillStatus == 1" v-on:receiveChange="handleChangeEntryType" v-model="jsonChild.EntryType" :options="entry_type_options"  />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div v-if="json.BillStatus == 0 && edit_child" class="col-xs-2 col-sm-1 col-md-12 col-lg-12 col-xl-12" align="right">
                      <Button_icon :disabled="readonly_delete" :icon="'delete'" :color="'negative'" :outline="false" size="12px" v-on:click="handleDelete(jsonChild)" class="q-mr-sm" />
                    </div>

                    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6"></div>

                    <div class="col-xs-12 col-sm-11 col-md-6 col-lg-6 col-xl-6" :class="$q.screen.width > 1023 ? 'q-pl-sm': ''">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
                          <div class="row">
                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                              <span class="dialog_font">Pricing Type</span>
                            </div>
                            <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                              <Radio size="xs" :disable="json.BillStatus == 1" v-on:receiveChange="handleChangePriceType" v-model="jsonChild.PriceType" :options="pricing_type_options"  />
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

                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"></div>

                    <div class="col-xs-6 col-sm-6 col-md-2 col-lg-2 col-xl-2 four_column_left two_column_left">
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

                    <div class="col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 four_column_left">
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

                    <div class="col-xs-6 col-sm-6 col-md-2 col-lg-2 col-xl-2 four_column_left two_column_left">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <!-- <Input
                              v-if="edit_child"
                              :autofocusclick="true"
                              :no_label="false"
                              label="Barcode"
                              :readonly="json.BillStatus == 1"
                              v-on:change="handleChange"
                              v-model="jsonChild.barcode"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" /> -->
                              <Select
                              :readonly="json.BillStatus == 1"
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

                    <div v-if="edit_child" class="col-xs-6 col-sm-6 col-md-2 col-lg-2 col-xl-2 four_column_left">
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

                    <div class="col-xs-6 col-sm-6 col-md-2 col-lg-2 col-xl-2 two_column_left">
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
                  </div>

                  <div class="row dialog_separator">
                    <div v-if="edit_child" class="col-xs-6 col-sm-6 col-md-2 col-lg-2 col-xl-2 four_column_left">
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
                    </div>

                    <div class="col-xs-6 col-sm-2 col-md-1 col-lg-1 col-xl-1 four_column_left" :class="$q.screen.width>599 && $q.screen.width<1024 ? 'two_column_left' : !edit_child ? 'two_column_left' : ''">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <Input
                          :autofocusclick="true"
                          :no_label="false"
                          label="Qty"
                          :readonly="json.BillStatus == 1"
                          v-on:change="handleChangeQty"
                          v-model="jsonChild.SetQty"
                          :dbComponentBehavior="dbComponentBehavior ? (status==1? dbComponentBehavior.text_right_readonly : dbComponentBehavior.text_right) : oridbComponentBehavior.text" />
                        </div>
                      </div>
                    </div>

                    <div class="col-xs-6 col-sm-4 col-md-2 col-lg-2 col-xl-2 four_column_left" :class="!edit_child ? 'two_column_left': ''">
                      <div class="row" :class="$q.screen.width<599 ? 'dialog_separator': ''">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <Input
                          :autofocusclick="true"
                          :no_label="false"
                          label="Unit Price"
                          :readonly="json.BillStatus == 1 || jsonChild.PriceType=='FOC' ? true : unit ? false : true"
                          v-on:change="handleChangeUnitPrice"
                          v-model="jsonChild.UnitPrice"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right_readonly : oridbComponentBehavior.text" />
                        </div>
                      </div>
                    </div>

                    <div class="col-xs-8 col-sm-7 col-md-3 col-lg-3 col-xl-3 four_column_left two_column_left">
                      <div class="row" :class="$q.screen.width<1024 ? 'dialog_separator': ''">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <Input
                          :autofocusclick="true"
                          :no_label="false"
                          label="Discount(+)/Surcharge(-)"
                          :readonly="json.BillStatus == 1 || jsonChild.PriceType=='FOC' ? true : unit ? false : true"
                          v-on:change="handleChangeDiscAmt"
                          v-model="jsonChild.DiscAmt"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row dialog_separator">
                    <div class="col-xs-6 col-sm-3 col-md-3 col-lg-3 col-xl-3 four_column_left two_column_left">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <Select
                          dir="rtl"
                          :readonly="json.BillStatus == 1 || jsonChild.PriceType=='FOC' ? true : unit ? false : true"
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
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <Input
                          :autofocusclick="true"
                          :no_label="false"
                          label="Disc1Value"
                          :readonly="json.BillStatus == 1 || jsonChild.PriceType=='FOC' ? true : unit ? false : true"
                          v-on:change="handleChangeDisc1Value"
                          v-model="jsonChild.Disc1Value"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                        </div>
                      </div>
                    </div>

                    <div class="col-xs-6 col-sm-3 col-md-3 col-lg-3 col-xl-3 four_column_left two_column_left">
                      <div class="row" :class="$q.screen.width<599 ? 'dialog_separator': ''">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <Select
                          dir="rtl"
                          :readonly="json.BillStatus == 1 || jsonChild.PriceType=='FOC' ? true : unit ? false : true"
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
                      <div class="row" :class="$q.screen.width<599 ? 'dialog_separator': ''">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <Input
                          :autofocusclick="true"
                          :no_label="false"
                          label="Disc2Value"
                          :readonly="json.BillStatus == 1 || jsonChild.PriceType=='FOC' ? true : (unit ? false : true)"
                          v-on:change="handleChangeDisc2Value"
                          v-model="jsonChild.Disc2Value"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row dialog_separator">
                    <div class="col-xs-6 col-sm-6 col-md-2 col-lg-2 col-xl-2 four_column_left two_column_left">
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

                    <div class="col-xs-6 col-sm-6 col-md-2 col-lg-2 col-xl-2 four_column_left">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <Input
                          :autofocusclick="true"
                          :no_label="false"
                          label="Total before Tax"
                          :readonly="json.BillStatus == 1 || jsonChild.PriceType=='FOC' ? true : unit"
                          v-on:change="handleChangeTotalPrice"
                          v-model="jsonChild.TotalPrice"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row dialog_separator">
                    <div v-if="edit_child" class="col-xs-6 col-sm-6 col-md-2 col-lg-2 col-xl-2 four_column_left two_column_left">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <Input
                          :autofocusclick="true"
                          :no_label="false"
                          label="Rebate Amount"
                          :readonly="json.BillStatus == 1"
                          v-on:change="handleChangeRebateValue"
                          v-model="jsonChild.rebate_value"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                        </div>
                      </div>
                    </div>

                    <div v-if="edit_child" class="col-xs-6 col-sm-6 col-md-2 col-lg-2 col-xl-2 four_column_left">
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

                    <div class="upload_separator_second">
                      <span class="text-subtitle1">Invoice</span>

                      <div class="row dialog_separator">
                        <div class="col-xs-6 col-sm-2 col-md-1 col-lg-1 col-xl-1 four_column_left two_column_left">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Qty"
                              :readonly="json.BillStatus == 1"
                              v-on:change="handleChangeInvQty"
                              v-model="jsonChild.Inv_Qty"
                              :dbComponentBehavior="dbComponentBehavior ? (status==1? dbComponentBehavior.text_right_readonly : dbComponentBehavior.text_right) : oridbComponentBehavior.text" />
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
                              :readonly="json.BillStatus == 1 ? true : unit ? false : true"
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
                              :readonly="json.BillStatus == 1 ? true : unit ? false : true"
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
                              :readonly="json.BillStatus == 1 ? true : unit ? false : true"
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
                              :readonly="json.BillStatus == 1 ? true : unit ? false : true"
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
                              :readonly="json.BillStatus == 1 ? true : (unit ? false : true)"
                              v-on:change="handleChangeInvDisc2Value"
                              v-model="jsonChild.Inv_Disc2Value"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="row dialog_separator">
                        <div class="col-xs-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 four_column_left two_column_left">
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

                        <div class="col-xs-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 four_column_left">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Total before Tax"
                              :readonly="json.BillStatus == 1 || unit"
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

              <div v-if="$q.screen.width > 1023" class="row input_wrapper_right">
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
                              <Radio size="xs" :disable="json.BillStatus == 1" v-on:receiveChange="handleChangeEntryType" v-model="jsonChild.EntryType" :options="entry_type_options"  />
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
                              <Radio size="xs" :disable="json.BillStatus == 1" v-on:receiveChange="handleChangePriceType" v-model="jsonChild.PriceType" :options="pricing_type_options"  />
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
                                  <!-- <Input
                                  v-if="edit_child"
                                  :autofocusclick="true"
                                  :no_label="false"
                                  label="Barcode"
                                  :readonly="json.BillStatus == 1"
                                  v-on:change="handleChange"
                                  v-model="jsonChild.barcode"
                                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" /> -->
                                  <Select
                                  :readonly="json.BillStatus == 1"
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
                      </div>
                    </div>

                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                      <div class="row">
                        <div class="row dialog_separator">
                          <div v-if="edit_child" class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 four_column_left">
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
                          </div>

                          <div class="col-xs-6 col-sm-2 col-md-6 col-lg-6 col-xl-6" :class="$q.screen.width>599 && $q.screen.width<1024 ? 'two_column_left' : !edit_child ? 'two_column_left' : ''">
                            <div class="row">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <Input
                                :autofocusclick="true"
                                :no_label="false"
                                label="Qty"
                                :readonly="json.BillStatus == 1"
                                v-on:change="handleChangeQty"
                                v-model="jsonChild.SetQty"
                                :dbComponentBehavior="dbComponentBehavior ? (status==1? dbComponentBehavior.text_right_readonly : dbComponentBehavior.text_right) : oridbComponentBehavior.text" />
                              </div>
                            </div>
                          </div>

                          <div class="col-xs-6 col-sm-4 col-md-6 col-lg-6 col-xl-6 four_column_left" :class="!edit_child ? 'two_column_left': ''">
                            <div class="row dialog_separator">
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

                          <div class="col-xs-8 col-sm-7 col-md-6 col-lg-6 col-xl-6 two_column_left">
                            <div class="row dialog_separator">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <Input
                                :autofocusclick="true"
                                :no_label="false"
                                label="Discount(+)/Surcharge(-)"
                                :readonly="json.BillStatus == 1 || jsonChild.PriceType=='FOC' ? true : unit ? false : true"
                                v-on:change="handleChangeDiscAmt"
                                v-model="jsonChild.DiscAmt"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                              </div>
                            </div>
                          </div>

                          <div class="col-xs-6 col-sm-3 col-md-3 col-lg-3 col-xl-3 four_column_left two_column_left">
                            <div class="row dialog_separator">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <Select
                                dir="rtl"
                                :readonly="json.BillStatus == 1 || jsonChild.PriceType=='FOC' ? true : unit ? false : true"
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
                                :readonly="json.BillStatus == 1 || jsonChild.PriceType=='FOC' ? true : unit ? false : true"
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
                                :readonly="json.BillStatus == 1 || jsonChild.PriceType=='FOC' ? true : unit ? false : true"
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
                                :readonly="json.BillStatus == 1 || jsonChild.PriceType=='FOC' ? true : (unit ? false : true)"
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
                                :readonly="json.BillStatus == 1 || jsonChild.PriceType=='FOC' ? true : unit"
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
                                :readonly="json.BillStatus == 1"
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
                                :dbComponentBehavior="dbComponentBehavior ? (status==1? dbComponentBehavior.text_right_readonly : dbComponentBehavior.text_right) : oridbComponentBehavior.text" />
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
                              :readonly="json.BillStatus == 1"
                              v-on:change="handleChangeInvQty"
                              v-model="jsonChild.Inv_Qty"
                              :dbComponentBehavior="dbComponentBehavior ? (status==1? dbComponentBehavior.text_right_readonly : dbComponentBehavior.text_right) : oridbComponentBehavior.text" />
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
                              :readonly="json.BillStatus == 1 ? true : unit ? false : true"
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
                              :readonly="json.BillStatus == 1 ? true : unit ? false : true"
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
                              :readonly="json.BillStatus == 1 ? true : unit ? false : true"
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
                              :readonly="json.BillStatus == 1 ? true : unit ? false : true"
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
                              :readonly="json.BillStatus == 1 ? true : (unit ? false : true)"
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
                              :readonly="json.BillStatus == 1 || unit"
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
            </div>
          </div>
        </q-form>
      </q-card-section>

      <q-card-actions v-if="json.BillStatus == 0" class="dialog_action" style="padding-left: 20px;">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" align="right">
          <Button_icon v-if="!edit_child" :readonly="false" :flat="true" :font_color="'white'" :color="'#094161'" :text="'ADD'" :outline="false" size="15px"
          v-on:receiveClick="handleChild('save&add')"/>

          <span class="q-pl-xs" />

          <Button_icon :readonly="false" :flat="true" :font_color="'white'" :color="'#094161'" :text="'SAVE'" :outline="false" size="15px"
          v-on:receiveClick="handleChild('save')"/>
        </div>
      </q-card-actions>

      <q-inner-loading
        :showing="showAddLoading"
        color="primary"
      />
    </q-card>
  </q-dialog>

  <q-dialog v-model="view_summary" persistent :position="$q.screen.width > 599 ? 'top' : 'bottom'">
    <q-card style="text-align:left;margin-top: 5%;">
      <q-card-section class="header_top_mobile">
        <!-- <Button_icon :disable="showAddLoading" :big_round="true" :flat="true" :font_color="'#928f8f'" :color="'rgba(255, 255, 255, 0.5)'" :icon="'arrow_back_ios'" :outline="true" size="12px" class="custom_back_button" @click="back()" /> -->
      <div class="text-right">
        <q-btn icon="close" flat round dense v-close-popup :disable="showAddLoading || showAddLoading2"/>
      </div>
        <!-- <Button_icon :disable="showAddLoading" :text="header=='PO' ? 'New PO' : header=='GR' ? 'New GR' : header == 'IBT' ? 'New IBT' : 'New DN'" :big_round="true" :flat="true" :font_color="'#1976D2'" :color="'#f1f8ff'" :icon="'add_circle'" :outline="false" size="15px" class="custom_more_button" @click="handleCreate()" /> -->
      </q-card-section>

      <q-card-section class="q-pt-none card_sides">
        <div class="card_ypadding">
          <div class="row justify-center">
             <span style="font-size: 14px;"><b>Total Amount</b></span>
            <!-- <Button_icon :readonly="true" :big_round="true" :flat="true" :font_color="'white'" :color="'green'" :icon="'verified'" :outline="true" size="30px" /> -->
          </div>


          <div class="row q-pt-md q-px-xl " style="font-size: 14px; ">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-py-xs">
                <div class="row">
                  <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5"><b>Gross</b></div>
                  <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1 col-xl-1"><b>:</b></div>
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 text-right">{{currency_sign}} {{json.Subtotal1}}</div>
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-py-xs">
                <div class="row">
                  <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5"><b>Disc</b></div>
                  <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1 col-xl-1"><b>:</b></div>
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 text-right" style="color:#1976D2;">{{currency_sign}} {{json.Discount1}}</div>
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-py-xs">
                <div class="row">
                  <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5"><b>Nett</b></div>
                  <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1 col-xl-1"><b>:</b></div>
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 text-right"  style="background-color:#D3D3D3">{{currency_sign}} {{json.Total}}</div>
                </div>
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
</template>

<script>
import Input from 'src/components/ERP/Base/Input'
import Select from 'src/components/ERP/Base/Select'
import Datepicker from 'src/components/ERP/Base/Datepicker'
import Checkbox from 'src/components/ERP/Base/Checkbox'
import PurchaseTable from 'src/components/ERP/Purchase/PurchaseTable'
import Button_icon from 'src/components/ERP/Base/Button_icon'
import Radio from 'src/components/ERP/Base/Radio';
import { Notify } from "quasar";
import SelectFilter from 'src/components/ERP/Base/SelectFilter'
import SelectPlaceholder from 'src/components/ERP/Base/SelectPlaceholder'
import Textarea from'src/components/ERP/Base/Textarea' ;
import { StreamBarcodeReader } from "vue-barcode-reader";

export default{
  data() {
    return {
      retailer_guid: sessionStorage.getItem("retailer_guid") != "" && sessionStorage.getItem("retailer_guid") != "null" && sessionStorage.getItem("retailer_guid") != null ? sessionStorage.getItem("retailer_guid") : [],
      user_name: sessionStorage.getItem("user_name") != "" && sessionStorage.getItem("user_name") != "null" && sessionStorage.getItem("user_name") != null ? sessionStorage.getItem("user_name") : [],
      language: sessionStorage.getItem("language") != "" && sessionStorage.getItem("language") != "null" && sessionStorage.getItem("language") != null ? sessionStorage.getItem("language") : [],
      currency_sign: sessionStorage.getItem("currency_sign") != "" && sessionStorage.getItem("currency_sign") != "null" && sessionStorage.getItem("currency_sign") != null ? sessionStorage.getItem("currency_sign") : [],
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
      search_options: [
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
        },
      ],
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
      location_options: [],
      location_options2: [],
      table_column: [],
      table_data: [],
      showAddLoading: false,
      json: {
        step: 1,
        BillStatus: 0,
        consign: 0,
        posted: 0,
        in_kind: 0,
        d_o: 0,
        ibt_ict: 0,
        invoice: 0,
        total_include_tax: '0.00'
      },
      ori_json: {},
      jsonChild: {},
      all_supcus: {},
      status: "",
      page_function: this.$route.name,
      ask_member: false,
      code_scanner: false,
      cardtype_guid: "",
      delete_child: false,
      active_delete_json: {},
      modify_child: false,
      edit_child: false,
      supplier_readonly: false,
      results: [],
      hv_item: false,
      view_summary:false,
    }
  },
  components:{
    Input,
    Select,
    Datepicker,
    Checkbox,
    PurchaseTable,
    Button_icon,
    Radio,
    SelectFilter,
    // SelectPlaceholder,
    // Textarea,
    // StreamBarcodeReader,
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
          label: sample.Code + ' - ' + sample.Name,
          value: sample.Code
        }

        supcus_code.push(obj);
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
      this.location_options = loc_group;
      this.location_options2 = loc_opt;

      if(this.page_function == 'EditSalesInvoice')
      {
        var cpayload =
        {
          params: {
            refno: this.$route.query.refno
          }
        }

        var cdata = await this.getSichild(cpayload);
        var cresults = cdata.data;

        this.supplier_readonly = cresults.length > 0;

        var refno = this.$route.query.refno;

        var payload = {
          RefNo: refno,
          language: this.language,
          user: this.user_name
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
        filtered_transmain.gst_tax_rate = this.formatAmount(filtered_transmain.gst_tax_rate, '$')
        filtered_transmain.gst_adj = this.formatAmount(filtered_transmain.gst_adj, '$')
        filtered_transmain.landed_cost_total = this.formatAmount(filtered_transmain.landed_cost_total, '$')
        filtered_transmain.Discount1 = this.formatAmount(filtered_transmain.Discount1, '$')
        filtered_transmain.InvAmount_Vendor = this.formatAmount(filtered_transmain.InvAmount_Vendor, '$')
        filtered_transmain.InvSurchargeDisc_Vendor = this.formatAmount(filtered_transmain.InvSurchargeDisc_Vendor, '$')
        filtered_transmain.InvNetAmt_Vendor = this.formatAmount(filtered_transmain.InvNetAmt_Vendor, '$')


        this.json = filtered_transmain;
        this.json.step = this.$route.query.step ? Number(this.$route.query.step) : 1;
        this.json.Remark = this.json.Remark==null ? '' : this.json.Remark;
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
          user: this.user_name
        }

        var data = await this.getFilterGrmain(payload);
        var filtered_transmain = data.response;

        this.json.loc_group = filtered_transmain.loc_group;
        this.json.Code = filtered_transmain.Code;
      },
      handleChangeInvTotalPrice()
      {
        this.jsonChild.Inv_TotalPrice = this.formatAmount(this.jsonChild.Inv_TotalPrice,'$');
        this.Inv_calculation();
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
                after2Disc = after1Disc - Inv_NetUnitPriceDisc2Value;
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
          }

          var data = {};

          if(this.page_function == 'EditPurchaseOrder' || this.page_function == 'EditSalesInvoice')
          {
            await this.$store.dispatch('sales/trigger_delete_sichild', payload).then(() => {
              data = JSON.parse(JSON.stringify(this.$store.getters['sales/get_sichild_status']));
              console.log(data)
            });
          }

          if(data.status == "success")
          {
            this.$nextTick(async ()=>{
              this.table_function(this.ori_params);
              this.showNotify("positive","Delete successfully");
              this.delete_child = false;
              this.deleteLoading = false;
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
        this.hv_item = true;

        this.showAddLoading = true;

        var itemcode = this.selected_row.Itmecode;
        var supplier_code = this.json.SCode;
        var po_date = this.json.PODate;
        var outlet = this.json.loc_group;

        var payload = {
          itemcode: itemcode,
          supplier_code: supplier_code,
          po_date: po_date,
          outlet: outlet,
          user: this.user_name,
          language: this.language
        }

        await this.$store.dispatch('purchase/trigger_get_item_by_itemcode_for_po', payload).then(() => {
          var data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_item_by_itemcode_for_po']));
          var response = data.response;

          response.Disc1Value = this.formatAmount(response.Disc1Value,'$');
          response.Disc2Value = this.formatAmount(response.Disc2Value,'$');
          response.UnitPrice = this.formatAmount(response.UnitPrice,'$');
          response.NetUnitPrice = parseFloat(response.NetUnitPrice).toFixed(4);
          response.TotalPrice = this.formatAmount('0.00','$');
          response.DiscAmt = this.formatAmount('0.00','$');
          response.EntryType = 'Unit';
          response.PriceType = 'Norm';

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
          this.jsonChild = response;
          this.jsonChild.SetQty = this.jsonChild.SetQty==0 ? '0' : this.jsonChild.SetQty;
          this.jsonChild.Barcode = this.barcode_options[0].value;
        });

        this.searchItem = false;
        this.jsonChild.step = 2;
        this.showAddLoading = false;
      },
      close()
      {
        this.jsonChild = {};
        this.searchItem = false;
        this.modify_child = false;
      },
      async handleChild(){
        //this.showAddLoading = true;

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

            if(this.jsonChild.Disc1Value < 0 ){
              this.showAddLoading = false;
              this.showNotify("negative", "Disc1Value cannot less than 0.");
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

            var newVal = this.addNewAfterSave;

            await this.savePOChild(newVal);
        }
      },
      async savePOChild(newVal){
        var RefNo = this.json.RefNo;
        var EntryType = this.jsonChild.EntryType;
        var PriceType = this.jsonChild.PriceType;
        var Barcode = this.jsonChild.Barcode;
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

          if(PriceType == 'Norm')
          {
            payload.Qty_foc = this.unformatAmount(this.jsonChild.Qty_foc);
          }
          else
          {
            payload.Qty_foc = '0';
          }

          await this.$store.dispatch('purchase/trigger_create_grchild', payload).then(() => {
            data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_grchild_status']));
            console.log(data)
          });

          var status = data.status

          if(status == "success")
          {
            // this.jsonChild.barcode = "99";//refer bong side whether need pass from client side
            this.showAddLoading = false;
            this.showNotify("positive", "Created Successfully.");

            // if(newVal == 'save')
            // {
              this.jsonChild = {};
              this.searchItem = false;
              this.modify_child = false;
              this.table_function(this.ori_params);
            // }
            // else if(newVal == 'save&add')
            // {
            //   this.handleNewForm();
            // }
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
          var Barcode = this.jsonChild.Barcode
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

          if(PriceType == 'Norm')
          {
            payload.Qty_foc = this.unformatAmount(this.jsonChild.Qty_foc);
          }
          else
          {
            payload.Qty_foc = '0';
          }

          if(this.page_function == 'EditPurchaseOrder')
          {
            payload.Barcode = this.jsonChild.Barcode;
            payload.language = this.language;

            await this.$store.dispatch('purchase/trigger_update_pochild', payload).then(() => {
              data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_pochild_status']));
            });
          }
          else if(this.page_function == 'EditSalesInvoice')
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

            await this.$store.dispatch('purchase/trigger_update_grchild', payload).then(() => {
              data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_grchild_status']));
            });
          }

          var status = data.status;
          var response = data.response;

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
            var Qty = this.formatAmount(response.Qty,'qty');
            var rebate_value = this.formatAmount(response.rebate_value,'$');
            var price_future = this.formatAmount(response.price_future,'$');
            var Inv_Qty = this.formatAmount(response.Inv_Qty,'qty');
            var Inv_UnitPrice = this.formatAmount(response.Inv_UnitPrice,'$');
            var Inv_Disc1Value = this.formatAmount(response.Inv_Disc1Value,'$');
            var Inv_Disc2Value = this.formatAmount(response.Inv_Disc2Value,'$');
            var Inv_NetUnitPrice = Number(response.Inv_NetUnitPrice).toFixed(4);
            var Inv_TotalPrice = this.formatAmount(response.Inv_TotalPrice,'$');
            var PackSize = this.formatAmount(response.PackSize,'$');
            var BulkQty = this.formatAmount(response.BulkQty,'$');

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
            this.jsonChild.Inv_NetUnitPrice = Number(Inv_NetUnitPrice).toFixed(4);
            this.jsonChild.Inv_TotalPrice = Inv_TotalPrice;
            this.jsonChild.PackSize = PackSize;
            this.jsonChild.BulkQty = BulkQty;

            if(this.edit_child)
            {
              this.showAddLoading = false;
              this.showNotify("positive", "Updated Successfully.");
              this.table_function(this.ori_params);
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
        console.log(payload)
        this.active_delete_json = payload;
        this.delete_child = true;
      },
      async getSichild(payload)
      {
        return await this.$store.dispatch('sales/trigger_get_sichild', payload).then(() => {
          var data = JSON.parse(JSON.stringify(this.$store.getters['sales/get_sichild']));
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
          this.json.Code =  await this.getNonmember();
          // this.json.supplier_name = "";
          this.$nextTick(()=>{
            this.$refs.save_form.resetValidation()
            this.showAddLoading = false;
          })
        }
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
        else if(this.page_function.endsWith('SalesOrder'))
        {
          this.$router.push({name: 'SalesOrder'});
        }
        else if(this.page_function.endsWith('SalesInvoice'))
        {
          this.$router.push({name: 'SalesInvoice'});
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
      async handleAction(payload)
      {
        // var mobile = this.$q.screen.width < 600

        // if(mobile)
        // {
          this.modify_child = true;
          this.edit_child = true;
          this.showAddLoading = true;
          this.hv_item = true;

          var cpayload = {
            params: {
              refno: payload.RefNo,
            }
          }

          var cdata = {};

          await this.$store.dispatch('purchase/trigger_get_grchild', cpayload).then(() => {
            cdata = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_grchild']));
          });

          var line = payload.Line;

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
          this.jsonChild.BulkQty = this.formatAmount(this.jsonChild.BulkQty,'$');
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
          this.unit = this.jsonChild.EntryType=='Unit';

          this.jsonChild.step = 2;

          this.showAddLoading = false;
          this.modify_child = true;
          this.edit_child = true;
        // }
        // else
        // {
        //   this.$router.push({ name: 'EditSalesInvoiceDetails', query: { refno: payload.RefNo, line: payload.Line } })
        // }
      },
      async addButtonCreatePOChild(){
        if(this.json.BillStatus == 1)
        {
            this.showNotify("negative","This Doc already posted.");
            return;
        }

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
              name: "CreateSalesInvoiceDetails",
              query: { refno: this.$route.query.refno  }
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
      table_function(payload){
          var table_column = [
              {
                  name: 'action',
                  required: true,
                  label: 'Actions',
                  align: 'left',
                  sortable: true,
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


          this.table_column = table_column;

          this.$nextTick(async ()=>{
            payload.params.refno = this.$route.query.refno;

            var data = {};
            data = await this.getSichild(payload);
              //console.log(data)
            var results = data.data;

            this.supplier_readonly = results.length > 0;

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
                    "count": 0,
                    "next": null,
                    "previous": null,
                    "results": data.data
                }
            };
            this.results = data.data
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

        var validated = await this.validate_form('save_form');

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
            "Location":Location,
            "DONo":DONo,
            "InvNo":InvNo,
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
          else if(this.page_function=='CreateSalesInvoice')
          {
            await this.$store.dispatch('sales/trigger_create_simain', payload).then(() => {
              data = JSON.parse(JSON.stringify(this.$store.getters['sales/get_simain_status']));
            });
          }
          else if(this.page_function=='EditSalesInvoice')
          {
            payload.RefNo = this.json.RefNo;

            await this.$store.dispatch('sales/trigger_update_simain', payload).then(() => {
              data = JSON.parse(JSON.stringify(this.$store.getters['sales/get_simain_status']));
            });
          }

          var status = data.status

          if(status == "success")
          {
            this.showAddLoading = false;

            if(this.page_function=='CreateSalesInvoice')
            {
              this.showNotify("positive", "Created Successfully.");
              this.$router.push({ name: 'EditSalesInvoice', query: { refno: data.response.RefNo } })
            }
            else if(this.page_function=='EditSalesInvoice')
            {
              this.showNotify("positive", "Updated Successfully.");
              var refno = data.response.RefNo;

              var payload = {
                RefNo: refno,
                language: this.language,
                user: this.user_name
              }

              var data = await this.getFilterGrmain(payload)
              var filtered_transmain = data.response;

              filtered_transmain.rebate_amt = this.formatAmount(filtered_transmain.rebate_amt, '$');
              filtered_transmain.Total = this.formatAmount(filtered_transmain.Total, '$');
              filtered_transmain.total_include_tax = this.formatAmount(filtered_transmain.total_include_tax, '$');
              filtered_transmain.gst_tax_sum = this.formatAmount(filtered_transmain.gst_tax_sum, '$');
              filtered_transmain.SubTotal1 = this.formatAmount(filtered_transmain.SubTotal1, '$');
              filtered_transmain.rounding_adj = this.formatAmount(filtered_transmain.rounding_adj, '$');

              this.json = filtered_transmain;
              this.json.step = step;
              this.json.Remark = this.json.Remark==null ? '' : this.json.Remark;
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
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 0px;
    padding-bottom: 0px;
  }
}

@media screen and (min-width: 600px) {
  .sticky_stepper >>> .q-stepper__header
  {
    background-color: white;
    position: sticky;
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
    padding: 10px;
    padding-top: 0px;
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
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 10px;
    padding-top: 0px;
    padding-bottom: 10px;
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

* >>> .q-field--disabled > .q-field__inner > .q-field__control
{
  background-color: #cccccc !important;
}
</style>

