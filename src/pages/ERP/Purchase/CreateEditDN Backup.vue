<template>
  <div v-if="$q.screen.width > 599" class="card_sides">
    <q-card style="max-height: 100%;">
      <q-card-section class="theme_color dialog_header header_top">
        <div class="intermediate"/>
        <div v-if="page_function == 'CreateDebitNote'" class="text-subtitle1 header_text">Debit Note</div>
          <div v-if="page_function == 'EditDebitNote'" class="text-subtitle1 header_text">
            Debit Note<br>
            <div class="row">
            <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
              <span class="text-caption">   Refno: {{ json.RefNo }} | Branch: {{json.locgroup}} | Supplier: {{ json.Code }} - {{ json.Name }} <br></span>
            </div>
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 text-right">
              <span class="text-caption text-right text-bold" style="font-size:14px">{{ this.$language('D0145') }}: {{ currency_sign }} {{ json.SubTotal1 }}<br></span>
            </div>
          </div>
            <!-- <span class="text-caption">
              Refno: {{ json.RefNo }} | Branch: {{json.locgroup}} | Supplier: {{ json.Code }} - {{ json.Name }} <br>
            </span> -->

          </div>
      </q-card-section>

      <q-card-section class="upload_container">
        <q-form ref="save_form">
          <div v-if="page_function == 'EditDebitNote'" class="intermediate_white"/>
          <div class="row upload_separator_first">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <q-stepper
                flat
                header-nav
                v-model="json.step"
                color="primary"
                animated
                @update:model-value="handleChangeStepper"
                :class="page_function == 'EditDebitNote' ? 'sticky_stepper' : ''"
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
                        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Refno"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="json.RefNo"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                          <div class="row" :class="$q.screen.width < 1024 ? 'dialog_separator' : ''">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Doc No"
                              :readonly="json.BillStatus==1"
                              v-on:change="handleChange"
                              v-model="json.DocNo"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                          <div class="row" :class="$q.screen.width < 1024 ? 'dialog_separator' : ''">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <DatepickerOptions
                              :clickableInput="true"
                              :no_label="false"
                              label="Doc Date"
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

                      <div class="row dialog_separator">
                        <div class="input_wrapper_right" :class="json.BillStatus == 0 && !supplier_readonly ? 'col-xs-4 col-sm-5 col-md-3 col-lg-3 col-xl-3' : 'col-xs-4 col-sm-6 col-md-4 col-lg-4 col-xl-4'">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <SelectFilter
                              :readonly="json.BillStatus==1 ? true : supplier_readonly"
                              :no_label="false"
                              :label="'Supplier'"
                              v-model:pass_value="json.Code"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.select"
                              :options="supplier_options"
                              v-on:receiveChange="handleChangeSCode"
                              />
                            </div>
                          </div>
                        </div>

                        <!-- <div class="input_wrapper_right" :class="json.BillStatus == 0 && !supplier_readonly ? 'col-xs-4 col-sm-5 col-md-7 col-lg-7 col-xl-7' : 'col-xs-4 col-sm-6 col-md-8 col-lg-8 col-xl-8'">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <SelectFilter
                              :readonly="json.BillStatus==1 ? true : supplier_readonly"
                              :no_label="false"
                              :label="'Name'"
                              v-model:pass_value="json.Code"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.select"
                              :options="supplier_options2"
                              v-on:receiveChange="handleChange"
                              />
                            </div>
                          </div>
                        </div> -->

                        <div v-if="json.BillStatus == 0 && !supplier_readonly" dir="rtl" class="col-xs-2 col-sm-1 col-md-1 col-lg-1 col-xl-1 input_wrapper_right">
                          <Button_icon :flat="true" :font_color="'white'" :color="'#094161'" :icon="'search'" :outline="false" size="13px"
                          v-on:receiveClick="addButtonCreatePOChild('supplier')" style="margin-top: -2px;"/>
                        </div>

                        <div class="col-xs-6 col-sm-3 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="CN No"
                              :readonly="json.BillStatus==1"
                              v-on:change="handleChange"
                              v-model="json.sup_cn_no"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-3 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Datepicker
                              :clickableInput="true"
                              :no_label="false"
                              label="CN Date"
                              :disable="json.BillStatus==1"
                              :autoclose="true"
                              :daterange="json.sup_cn_date"
                              :componentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="row dialog_separator">
                        <div class="col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <SelectFilter
                              :readonly="json.BillStatus==1"
                              :no_label="false"
                              :label="'Branch'"
                              v-model:pass_value="json.locgroup"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.select"
                              :options="location_options"
                              v-on:receiveChange="handleChangeLocGroup"
                              />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <SelectFilter
                              :readonly="json.BillStatus==1"
                              :no_label="false"
                              :label="'Location'"
                              v-model:pass_value="json.Location"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.select"
                              :options="location_options2"
                              v-on:receiveChange="handleChangeLocGroup"
                              />
                            </div>
                          </div>
                        </div>

                        <div v-if="page_function=='EditDebitNote'" class="col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                          <div class="row" :class="$q.screen.width < 1024 ? 'dialog_separator' : ''">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Issued By"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="json.Issuedby"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 input_wrapper_right">
                          <div class="row dialog_separator">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Textarea class="ignore_height" :no_label="false" :readonly="json.BillStatus==1" v-on:receiveChange="handleChange" v-model="json.Remark"
                              :dbComponentBehavior="dbComponentBehavior.remark" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
                      <div v-if="page_function == 'EditDebitNote'" class="row">
                        <div class="col-xs-6 col-sm-6 col-md-12 col-lg-12 col-xl-12 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-7 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                              <span class="dialog_font">Consign</span>
                            </div>
                            <div class="col-xs-5 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                              <Checkbox :btm_padding="true" size="xs" :disable="true" v-model="json.Consign" :true-value="1" :false-value="0" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-12 col-lg-12 col-xl-12 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-7 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                              <span class="dialog_font">Posted</span>
                            </div>
                            <div class="col-xs-5 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                              <Checkbox :btm_padding="true" size="xs" :disable="true" v-model="json.BillStatus" :true-value="1" :false-value="0" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-12 col-lg-12 col-xl-12 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-7 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                              <span class="dialog_font">Uploaded</span>
                            </div>
                            <div class="col-xs-5 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                              <Checkbox :btm_padding="true" size="xs" :disable="true" v-model="json.uploaded" :true-value="1" :false-value="0" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-12 col-lg-12 col-xl-12 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-7 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                              <span class="dialog_font">B2B Status</span>
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
                        </div>
                      </div>

                    </div>
                  </div>
                </q-step>

                <q-step
                  v-if="page_function == 'EditDebitNote'"
                  :name="2"
                  title="Detail"
                  icon="create_new_folder"
                  :done="json.step > 2"
                >
                  <div class="row">
                    <div class="card_section_two col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <PurchaseTable
                        hide_footer
                        :readonly_button="false"
                        :row_per_page="[0]"
                        :top_button="page_function=='EditDebitNote'  && json.BillStatus == 0"
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
                  v-if="page_function == 'EditDebitNote'"
                  :name="3"
                  title="Discount"
                  icon="create_new_folder"
                  :done="json.step > 3"
                >
                  <div class="row dialog_separator">
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <Input
                          :autofocusclick="true"
                          :no_label="false"
                          label="GROSS"
                          :readonly="true"
                          v-on:change="handleChange"
                          v-model="json.SubTotal1"
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
                          label="Tax"
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

                    <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 input_wrapper_right"></div>
                  </div>

                  <!-- <div v-if="page_function=='EditDebitNote'" class="row dialog_separator">
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

      <q-card-actions class="dialog_action justify-between">
        <div v-if="this.json.step == 1">
          <Button_icon v-if="page_function == 'EditDebitNote'"  :flat="true" :font_color="'white'" :color="'#094161'" :text="json.BillStatus==1 ? 'UNPOST' : 'POST'" :outline="false" size="15px"
            v-on:receiveClick="confirmPost"/>

          <span v-if="page_function == 'EditDebitNote'" class="q-pl-xs">
              <Button_icon :flat="true" :font_color="'white'" :color="'#094161'" :text="'PRINT'" :outline="false" size="15px"
              v-on:receiveClick="handlePrint"/>
          </span>

           <span v-if="json.BillStatus == 0" class="q-pl-xs">
            <Button_icon :flat="true" :font_color="'white'" :color="'#094161'" :text="'SAVE'" :outline="false" size="15px"
            v-on:receiveClick="handleCreatePO"/>
          </span>

          <span v-if="page_function=='EditDebitNote'" class="q-pl-xs">
            <Button_icon :flat="false" :font_color="'black'" :color="'white'" :text="'NEXT'" :outline="true" size="15px"
            @click="json.step = 2"/>
          </span>
        </div>

        <div v-if="this.json.step == 2">
          <Button_icon :flat="false" :font_color="'black'" :color="'white'" :text="'PREVIOUS'" :outline="true" size="15px"
          @click="json.step = 1"/>

          <span class="q-pl-xs">
            <Button_icon :flat="false" :font_color="'black'" :color="'white'" :text="'NEXT'" :outline="true" size="15px"
            @click="json.step = 3"/>
          </span>
        </div >

        <div v-if="this.json.step == 3">
          <Button_icon v-if="json.BillStatus == 0" :flat="true" :font_color="'white'" :color="'#094161'" :text="'SAVE'" :outline="false" size="15px"
          v-on:receiveClick="handleCreatePO"/>

          <span class="q-pl-xs">
            <Button_icon :flat="false" :font_color="'black'" :color="'white'" :text="'PREVIOUS'" :outline="true" size="15px"
            @click="json.step = 2"/>
          </span>
        </div >

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
        <Button_icon :disable="showAddLoading" :big_round="true" :flat="true" :font_color="'#928f8f'" :color="'rgba(255, 255, 255, 0.5)'" :icon="'arrow_back_ios'" :outline="true" size="12px" class="custom_back_button" @click="back()" />
        <div v-if="page_function == 'CreateDebitNote'" class="text-subtitle1 header_text" style="padding-top: 10px;">Debit Note</div>
        <div v-if="page_function == 'EditDebitNote'" class="text-subtitle1 header_text">Debit Note
        <br>Refno: {{ json.RefNo }}</div>
        <!-- <q-btn-dropdown v-if="page_function == 'EditDebitNote'" :disable="showAddLoading" class="custom_more_button" flat dense icon="more_vert">
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

                        <div class="col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                          <div class="row" :class="$q.screen.width < 1024 ? 'dialog_separator' : ''">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <span class="mobile_font">Doc No</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="true"
                              :readonly="json.BillStatus==1"
                              v-on:change="handleChange"
                              v-model="json.DocNo"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                          <div class="row" :class="$q.screen.width < 1024 ? 'dialog_separator' : ''">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <span class="mobile_font">Doc Date</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
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
                              :no_label="true"
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

                      <div class="row dialog_separator">
                        <div class="input_wrapper_right" :class="page_function == 'CreateDebitNote' ? 'col-xs-10' : json.BillStatus == 1 ? 'col-xs-12' : json.BillStatus == 0 && !supplier_readonly ? 'col-xs-10' : 'col-xs-12'">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <span class="mobile_font">Supplier</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <SelectFilter
                              :readonly="json.BillStatus==1 ? true : supplier_readonly"
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

                        <div v-if="json.BillStatus == 0 && !supplier_readonly" dir="rtl" class="col-xs-2 col-sm-1 col-md-1 col-lg-1 col-xl-1 input_wrapper_right" style="padding-top: 21px;">
                            <Button_icon :small_round="true" :flat="false" :font_color="'white'" :color="'primary'" :icon="'search'" :outline="false" size="13px"
                            v-on:receiveClick="addButtonCreatePOChild('supplier')" style="margin-top: 2px;"/>
                        </div>
                      </div>

                      <div class="row dialog_separator">
                        <div class="col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <span class="mobile_font">CN No</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="true"
                              :readonly="json.BillStatus==1"
                              v-on:change="handleChange"
                              v-model="json.sup_cn_no"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <span class="mobile_font">CN Date</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Datepicker
                              :clickableInput="true"
                              :no_label="true"
                              :disable="json.BillStatus==1"
                              :autoclose="true"
                              :daterange="json.sup_cn_date"
                              :componentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="row dialog_separator">
                        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Branch</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <SelectFilter
                              :readonly="json.BillStatus==1"
                              :no_label="true"
                              v-model:pass_value="json.locgroup"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.select"
                              :options="location_options"
                              v-on:receiveChange="handleChangeLocGroup"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="row dialog_separator">
                        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <span class="mobile_font">Location</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <SelectFilter
                              :readonly="json.BillStatus==1"
                              :no_label="true"
                              v-model:pass_value="json.Location"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.select"
                              :options="location_options2"
                              v-on:receiveChange="handleChangeLocGroup"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="row dialog_separator">
                        <div v-if="page_function=='EditDebitNote'" class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <span class="mobile_font">Issued By</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="true"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="json.Issuedby"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 input_wrapper_right">
                          <div class="row dialog_separator">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <span class="mobile_font">Remark</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Textarea class="ignore_height" :no_label="true" :readonly="json.BillStatus==1" v-on:receiveChange="handleChange" v-model="json.Remark"
                              :dbComponentBehavior="dbComponentBehavior.remark" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <div v-if="page_function == 'EditDebitNote'" class="row">
                            <div class="col-xs-6 col-sm-6 col-md-12 col-lg-12 col-xl-12 input_wrapper_right">
                              <div class="row dialog_separator">
                                <div class="col-xs-7 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                  <span class="dialog_font">Consign</span>
                                </div>
                                <div class="col-xs-5 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                  <Checkbox :btm_padding="true" size="xs" :disable="true" v-model="json.Consign" :true-value="1" :false-value="0" />
                                </div>
                              </div>
                            </div>

                            <div class="col-xs-6 col-sm-6 col-md-12 col-lg-12 col-xl-12 input_wrapper_right">
                              <div class="row dialog_separator">
                                <div class="col-xs-7 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                  <span class="dialog_font">Posted</span>
                                </div>
                                <div class="col-xs-5 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                  <Checkbox :btm_padding="true" size="xs" :disable="true" v-model="json.BillStatus" :true-value="1" :false-value="0" />
                                </div>
                              </div>
                            </div>

                            <div class="col-xs-6 col-sm-6 col-md-12 col-lg-12 col-xl-12 input_wrapper_right">
                              <div class="row">
                                <div class="col-xs-7 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                  <span class="dialog_font">Uploaded</span>
                                </div>
                                <div class="col-xs-5 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                              <Checkbox :btm_padding="true" size="xs" :disable="true" v-model="json.uploaded" :true-value="1" :false-value="0" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-12 col-lg-12 col-xl-12 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-7 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                              <span class="dialog_font">B2B Status</span>
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
                        </div>
                      </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </q-step>

                <q-step
                  v-if="page_function == 'EditDebitNote'"
                  :name="2"
                  title="Detail"
                  icon="create_new_folder"
                  :done="json.step > 2"
                >
                  <div v-if="page_function == 'EditDebitNote'" class="row">
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
                      </q-card>
                    </div>
                  </div>
                </q-step>

                <q-step
                  v-if="page_function == 'EditDebitNote'"
                  :name="3"
                  title="Discount"
                  icon="create_new_folder"
                  :done="json.step > 3"
                >
                  <div v-if="page_function=='EditDebitNote'" class="row dialog_separator">
                    <div class="col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <span class="mobile_font">GROSS</span>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <Input
                          :autofocusclick="true"
                          :no_label="true"
                          :readonly="true"
                          v-on:change="handleChange"
                          v-model="json.SubTotal1"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                        </div>
                      </div>
                    </div>

                    <div class="col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <span class="mobile_font">Tax</span>
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

    <div v-if="json.step == 1 || json.step == 3" class="dialog_action_bottom" :style="page_function == 'EditDebitNote' && json.BillStatus == 0 ? 'height: 65px;' : 'height: 40px;'">
      <!-- <div v-if="page_function == 'EditDebitNote'" class="q-pl-sm q-pr-lg q-pt-xs text-right" style="font-size: 13px;">
        Gross: {{ currency_sign }} {{ json.SubTotal1 }}
      </div> -->
      <div v-if="page_function == 'EditDebitNote'" class="row q-px-sm" :class="page_function == 'EditDebitNote' && json.BillStatus !== 0  ? 'q-pt-sm' :''" style="font-size: 13px;">
          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
              <div class="row justify-left items-center" >
                  <Button_icon class="q-pa-none q-ma-none" :flat="true" :icon="'expand_less'" v-on:receiveClick="show_summary_dialog" :font_color="'primary'" :color="'primary'" :outline="false" size="13px"/>
                  <span class="" style="color:#1976D2;" @click="show_summary_dialog"> Total Amount:  {{ currency_sign }} {{ json.SubTotal1 }} </span>
              </div>
          </div>

          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
            <div class="row">
              <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-xs">
                  <Button_icon v-if="json.BillStatus==1" class="full-width" style="height: 25px;" :small_round="true" :text="'UNPOST'" :flat="false" :font_color="'white'" :color="'#273655'" :outline="false" size="11px" @click="confirmPost"/>
                  <Button_icon v-else class="full-width" style="height: 25px;" :small_round="true" :text="'POST'" :flat="false" :font_color="'white'" :color="'#273655'" :outline="false" size="11px" @click="confirmPost"/>
             </div>
              <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-xs">
                  <Button_icon class="full-width" style="height: 25px;" :small_round="true" :text="'PRINT'" :flat="false" :font_color="'white'" :color="'#273655'" :outline="false" size="11px" @click="handlePrint"/>
             </div>

            </div>
          </div>

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
      </div>

      <div class="row q-px-sm q-py-xs">
        <Button_icon v-if="json.BillStatus==0" :readonly="page_function.startsWith('Edit') && deepEqual(ori_json, json)" style="height: 30px; width: 100%" :small_round="true" :text="page_function.startsWith('Create') ? 'Generate Debit Note' : 'Update Debit Note'" :flat="false" :font_color="'white'" :color="'primary'" :outline="false" size="13px" @click="handleCreatePO"/>
      </div>
    </div>

    <div v-if="json.step == 2" class="dialog_action_bottom" :style="page_function == 'EditDebitNote' && json.BillStatus== 0  ? 'height: 65px;' : 'height: 40px;'">
      <div v-if="page_function == 'EditDebitNote'" class="row q-px-sm" :class="page_function == 'EditDebitNote' && json.BillStatus !== 0  ? 'q-pt-sm' :''" style="font-size: 13px;">
        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
              <div class="row justify-left items-center" >
                  <Button_icon class="q-pa-none q-ma-none" :flat="true" :icon="'expand_less'" v-on:receiveClick="show_summary_dialog" :font_color="'primary'" :color="'primary'" :outline="false" size="13px"/>
                  <span class="" style="color:#1976D2;" @click="show_summary_dialog"> Total Amount:  {{ currency_sign }} {{ json.SubTotal1 }} </span>
              </div>
          </div>

          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
            <div class="row">
              <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-xs">
                  <Button_icon v-if="json.BillStatus==1" class="full-width" style="height: 25px;" :small_round="true" :text="'UNPOST'" :flat="false" :font_color="'white'" :color="'#273655'" :outline="false" size="11px" @click="confirmPost"/>
                  <Button_icon v-else class="full-width" style="height: 25px;" :small_round="true" :text="'POST'" :flat="false" :font_color="'white'" :color="'#273655'" :outline="false" size="11px" @click="confirmPost"/>
             </div>
              <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-xs">
                  <Button_icon class="full-width" style="height: 25px;" :small_round="true" :text="'PRINT'" :flat="false" :font_color="'white'" :color="'#273655'" :outline="false" size="11px" @click="handlePrint"/>
             </div>

            </div>
          </div>
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
      </div>
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

  <q-dialog v-model="post_transmain" persistent position="top">
      <q-card style="width: 700px; max-width: 80vw;text-align:center;margin-top: 5%;">

        <q-card-section class="row items-center" style="padding-top:1%;padding-bottom:1%;border-bottom: 1px solid #a7bbcb;">
          <div class="text-h6">Confirmation</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup :disable="showAddLoading || showAddLoading2"/>
        </q-card-section>

        <q-card-section>
          <!-- <span class="q-ml-sm custom_selection_font">{{general_body}}</span> -->
          <span v-if="json.BillStatus == 0">Are you sure to post?</span>
          <span v-if="json.BillStatus == 1">Are you sure to unpost?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="OK" color="primary" @click="handlePostTransmain" />
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
        <div v-if="!status && edit_child" class="custom_delete" @click="handleDelete(jsonChild)">
          Delete
          <!-- <Button_icon :disabled="readonly_delete" :icon="'delete'" :color="'negative'" :outline="false" size="12px" v-on:click="handleDelete(jsonChild)" class="q-mr-sm" /> -->
        </div>

        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center">
          <div v-if="!edit_child" class="text-subtitle1 header_text" style="margin-top: 5px;">Debit Note Detail<br></div>
          <div v-else class="text-subtitle1 header_text" style="margin-top: 5px;">Edit Debit Note Detail<br></div>
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
                              <Radio size="xs" :disable="json.BillStatus == 1 || status" v-on:receiveChange="handleChangeEntryType" v-model="jsonChild.EntryType" :options="entry_type_options"  />
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
                              <Radio size="xs" :disable="json.BillStatus == 1 || status" v-on:receiveChange="handleChangePriceType" v-model="jsonChild.PriceType" :options="pricing_type_options"  />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"></div>

                    <div class="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
                      <div class="row">
                        <div class="dialog_separator" :class="edit_child ? 'col-xs-12' : 'col-xs-10'">
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

                        <div v-if="!edit_child" dir="rtl" class="button_upload_wrapper col-xs-2 col-sm-1 col-md-2 col-lg-2 col-xl-2" style="padding-top: 26px;">
                            <Button_icon ref="searchButton" :small_round="true" :flat="false" :font_color="'white'" :color="'primary'" :icon="'search'" :outline="false" size="13px"
                            v-on:receiveClick="showSearchDialog()" style="margin-top: 2px;"/>
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

                    <div v-if="hv_item" class="col-xs-6 col-sm-6 col-md-2 col-lg-2 col-xl-2 four_column_left two_column_left">
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

                    <div v-if="hv_item" class="col-xs-6 col-sm-6 col-md-2 col-lg-2 col-xl-2 two_column_left">
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

                    <div v-if="hv_item" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Reason</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Select
                              :readonly="json.BillStatus == 1 || status"
                              :no_label="true"
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

                    <div v-if="hv_item" class="two_column_left" :class="json.BillStatus == 1 || status ? 'col-xs-6' : 'col-xs-4'">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Ori Invoice No</span>
                            </div>

                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Select
                              v-if="select_inv"
                              :readonly="json.BillStatus == 1 || status"
                              :no_label="true"
                              v-model="jsonChild.ori_inv_no"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.ori_inv_no : oridbComponentBehavior.select"
                              :options="ori_inv_no_options"
                              v-on:receiveChange="handleChangeOriInvNo"
                              />
                              <Input
                              v-else
                              :autofocusclick="true"
                              :no_label="true"
                              :readonly="json.BillStatus == 1 || status"
                              v-on:change="handleChange"
                              v-model="jsonChild.ori_inv_no"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div v-if="!status && hv_item" class="col-xs-2 col-sm-6 col-md-2 col-lg-2 col-xl-2 two_column_left" dir="rtl">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">&nbsp;</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Button_icon :small_round="true" :readonly="false" :flat="false" :font_color="'white'" :color="'primary'" :icon="select_inv ? 'playlist_add_check' : 'drive_file_rename_outline'" :outline="false" size="15px"
                              v-on:receiveClick="changeInvoiceMethod()"/>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div v-if="hv_item" class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Ori invoice Date</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Datepicker
                              :clickableInput="true"
                              :no_label="true"
                              :disable="json.BillStatus == 1 || status ? true : select_inv"
                              :autoclose="true"
                              v-on:receiveChange="handleChangePODate"
                              :daterange="jsonChild.ori_inv_date"
                              :componentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div v-if="hv_item" class="row dialog_separator">
                    <div class="col-xs-6 col-sm-2 col-md-1 col-lg-1 col-xl-1 two_column_left" :class="$q.screen.width>599 && $q.screen.width<1024 ? 'two_column_left' : ''">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                          <span class="mobile_font">Qty</span>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <Input
                          :autofocusclick="true"
                          :no_label="true"
                          :readonly="json.BillStatus == 1 || status"
                          v-on:change="handleChangeQty"
                          v-model="jsonChild.SetQty"
                          min='0'
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.input_number : oridbComponentBehavior.text" />
                        </div>
                      </div>
                    </div>

                    <div class="col-xs-6 col-sm-3 col-md-2 col-lg-2 col-xl-2 four_column_left">
                      <div class="row" :class="page_function == 'EditPurchaseOrder' && $q.screen.width<599 ? 'dialog_separator': ''">
                        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                          <span class="mobile_font">Unit Price</span>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <Input
                          :autofocusclick="true"
                          :no_label="true"
                          :readonly="json.BillStatus == 1 || jsonChild.PriceType=='FOC' ? true :  unit ? false : true"
                          v-on:change="handleChangeUnitPrice"
                          v-model="jsonChild.UnitPrice"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right_readonly : oridbComponentBehavior.text" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div v-if="hv_item" class="row dialog_separator">
                    <div class="col-xs-6 col-sm-6 col-md-2 col-lg-2 col-xl-2 two_column_left">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                          <span class="mobile_font">Total</span>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <Input
                          :autofocusclick="true"
                          :no_label="true"
                          :readonly="json.BillStatus == 1 || status ? true : jsonChild.PriceType=='FOC' ? true :  unit"
                          v-on:change="handleChangeTotalPrice"
                          v-model="jsonChild.TotalPrice"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div v-if="hv_item" class="row dialog_separator">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                          <span class="mobile_font">Remark</span>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <Textarea class="ignore_height" :no_label="true" :readonly="json.BillStatus == 1 || status ? true : json.BillStatus==1" v-on:receiveChange="handleChange" v-model="jsonChild.itemremark"
                          :dbComponentBehavior="dbComponentBehavior.remark" />
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </q-form>
      </q-card-section>

      <q-card-actions v-if="!status && hv_item" class="dialog_action" style="padding-left: 20px;">
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
      <q-card-section class=" row theme_color dialog_header" style="padding: 0px;">
          <div class="text-subtitle1 header_text" style="margin-top: 5px;">Debit Note Detail<br></div>
          <q-space />
          <q-btn icon="close" flat round dense @click="close()" :disable="false"/>
      </q-card-section>

      <q-card-section class="upload_container">
        <q-form ref="save_edit_pochild_form">
          <div class="row upload_separator_first">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <div v-if="$q.screen.width > 599 && $q.screen.width < 1024" class="row input_wrapper_right">
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

                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"></div>

                    <div class="four_column_left two_column_left" :class="edit_child ? 'col-sm-6' : 'col-sm-5'">
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

                    <div v-if="!edit_child" dir="rtl" class="four_column_left two_column_left col-xs-2 col-sm-1 col-md-2 col-lg-2 col-xl-2" style="padding-top: 5px;">
                      <Button_icon ref="searchButton" :flat="true" :font_color="'white'" :color="'#094161'" :icon="'search'" :outline="false" size="13px"
                      v-on:receiveClick="showSearchDialog()"/>
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

                    <!-- <div class="col-xs-6 col-sm-6 col-md-2 col-lg-2 col-xl-2 four_column_left two_column_left">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"> -->
                              <!-- <Input
                              v-if="edit_child"
                              :autofocusclick="true"
                              :no_label="false"
                              label="Barcode"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="jsonChild.Barcode"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" /> -->
                              <!-- <Select
                              :readonly="true"
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

                    <div class="col-xs-6 col-sm-6 col-md-2 col-lg-2 col-xl-2 four_column_left">
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

                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
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

                    <div class="four_column_left two_column_left" :class="json.BillStatus == 1 ? 'col-sm-6' : 'col-sm-5'">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
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

                    <div v-if="json.BillStatus == 0" dir="rtl" class="button_upload_wrapper dialog_separator col-xs-2 col-sm-1 col-md-2 col-lg-2 col-xl-2 four_column_left two_column_left">
                      <Button_icon :flat="true" :font_color="'white'" :color="'#094161'" :icon="select_inv ? 'playlist_add_check' : 'drive_file_rename_outline'" :outline="false" size="12px"
                      v-on:receiveClick="changeInvoiceMethod()"/>
                    </div>

                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 four_column_left">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Datepicker
                              :clickableInput="true"
                              :no_label="false"
                              label="Ori Invoive Date"
                              :disable="select_inv"
                              :autoclose="true"
                              v-on:receiveChange="handleChangePODate"
                              :daterange="jsonChild.ori_inv_date"
                              :componentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row dialog_separator">
                    <div class="col-xs-6 col-sm-4 col-md-1 col-lg-1 col-xl-1 four_column_left" :class="$q.screen.width>599 && $q.screen.width<1024 ? 'two_column_left' : ''">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <Input
                          :autofocusclick="true"
                          :no_label="false"
                          label="Qty"
                          :readonly="json.BillStatus == 1"
                          v-on:change="handleChangeQty"
                          v-model="jsonChild.SetQty"
                          min='0'
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.input_number : oridbComponentBehavior.text" />
                        </div>
                      </div>
                    </div>

                    <!-- :readonly="unit ? false : true" -->
                    <div class="col-xs-6 col-sm-4 col-md-2 col-lg-2 col-xl-2 four_column_left" :class="$q.screen.width>599 && $q.screen.width<1024 ? 'two_column_left' : ''">
                      <div class="row" :class="page_function == 'EditPurchaseOrder' && $q.screen.width<599 ? 'dialog_separator': ''">
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

                    <div class="col-xs-6 col-sm-4 col-md-4 col-lg-4 col-xl-4">
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

                  <div class="row dialog_separator">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <Textarea class="ignore_height" :no_label="false" :readonly="json.BillStatus==1" v-on:receiveChange="handleChange" v-model="jsonChild.itemremark"
                        :dbComponentBehavior="dbComponentBehavior.remark" />
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

                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"></div>

                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                      <div class="row">
                        <div class="four_column_left two_column_left" :class="edit_child ? 'col-md-12 col-lg-12 col-xl-12' : 'col-md-10 col-lg-10 col-xl-10'">
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

                        <div v-if="!edit_child" dir="rtl" class="four_column_left two_column_left col-xs-2 col-sm-1 col-md-2 col-lg-2 col-xl-2" style="padding-top: 5px;">
                          <Button_icon ref="searchButton" :flat="true" :font_color="'white'" :color="'#094161'" :icon="'search'" :outline="false" size="13px"
                          v-on:receiveClick="showSearchDialog()"/>
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
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div> -->

                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 four_column_left">
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

                           <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 four_column_left" :class="$q.screen.width>599 && $q.screen.width<1024 ? 'two_column_left' : !edit_child ? 'two_column_left' : ''">
                          <div class="row dialog_separator">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Qty"
                              :readonly="json.BillStatus == 1"
                              v-on:change="handleChangeQty"
                              v-model="jsonChild.SetQty"
                              min='0'
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.input_number : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-12 col-lg-12 col-xl-12 four_column_left two_column_left">
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

                        <div class="col-xs-6 col-sm-6 col-md-12 col-lg-12 col-xl-12 four_column_left">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
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
                      </div>
                    </div>

                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                      <div class="row">
                        <div class="two_column_left" :class="json.BillStatus == 1 ? 'col-md-12 col-lg-12 col-xl-12' : 'col-md-10 col-lg-10 col-xl-10'">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
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

                        <div v-if="json.BillStatus == 0" dir="rtl" class="button_upload_wrapper dialog_separator col-xs-2 col-sm-1 col-md-2 col-lg-2 col-xl-2 two_column_left">
                          <Button_icon :flat="true" :font_color="'white'" :color="'#094161'" :icon="select_inv ? 'playlist_add_check' : 'drive_file_rename_outline'" :outline="false" size="12px"
                          v-on:receiveClick="changeInvoiceMethod()"/>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-12 col-lg-12 col-xl-12">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
                              <div class="row">
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                  <Datepicker
                                  :clickableInput="true"
                                  :no_label="false"
                                  label="Ori Invoive Date"
                                  :disable="select_inv"
                                  :autoclose="true"
                                  v-on:receiveChange="handleChangePODate"
                                  :daterange="jsonChild.ori_inv_date"
                                  :componentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text" />
                                </div>
                              </div>
                            </div>
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

                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 four_column_left" :class="!edit_child ? 'two_column_left': ''">
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

                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <div class="row dialog_separator">
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

                      <div class="row dialog_separator">
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
    <q-card style="text-align:left;margin-top: 5%;">
      <q-card-section class="header_top_mobile">
        <div class="text-right">
          <q-btn icon="close" flat round dense v-close-popup :disable="showAddLoading || showAddLoading2"/>
        </div>
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
    </q-card>

  </q-dialog>

  <q-dialog v-model="warning_report_dialog" persistent position="top">
    <q-card style="width: 700px; max-width: 80vw;text-align:center;margin-top: 5%;">

      <q-card-section class="row items-center" style="padding-top:1%;padding-bottom:1%;border-bottom: 1px solid #a7bbcb;">
        <div class="text-h6">DN Print</div>
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
          /> -->
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

      <q-card-actions align="right">
        <q-btn flat :label="$language('D0116')" color="primary" v-close-popup />
        <q-btn flat  label="Print" color="primary" @click="handlePrintWarning" />
      </q-card-actions>

      <q-inner-loading
        :showing="printLoading"
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
        Remark: '',
        SubTotal1: '0.00',
        DocNo: ""
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
      warning_report_dialog:false,
      rows_print:[],
      columns_print:[]
    }
  },
  components:{
    Input,
    Select,
    Datepicker,
    Checkbox,
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

    var payloadS = {
      params: {
        type: 'S',
        returnable:1,
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
    console.log('loc_group',loc_group);
    this.location_options2 = loc_opt;

    if(this.page_function == 'EditDebitNote')
    {

      var cpayload =
      {
        RefNo: this.$route.query.refno,
        language: this.language
      }

      var cdata = await this.getDnchild(cpayload);
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

      var data = await this.getFilterDnmain(payload);
      var filtered_transmain = data.response;

      filtered_transmain.rebate_amt = this.formatAmount(filtered_transmain.rebate_amt, '$');
      filtered_transmain.Total = this.formatAmount(filtered_transmain.Total, '$');
      filtered_transmain.total_include_tax = this.formatAmount(filtered_transmain.total_include_tax, '$');
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

      var filter_outlet = array_logGrop.filter((entry)=>{
        return entry.value == this.json.locgroup;
      })

      this.json.ChildNo = this.formatAmount(cresults.length,'qty');
      this.json.Branch = filter_outlet[0].value;
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
        this.json.locgroup = '';
        this.json.Location = '';

        var refno = this.$route.query.refno;

        var payload = {
          RefNo: refno,
          language: this.language
        }

        var data = await this.getFilterDnmain(payload);
        var filtered_transmain = data.response;

        this.json.locgroup = filtered_transmain.locgroup;
        this.json.Code = filtered_transmain.Code;
        this.json.Location = filtered_transmain.Location;
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
        this.deleteLoading = true;
        var payload = {
          RefNo: this.$route.query.refno,
          language: this.language
        }

        var data = {};

        if(this.json.BillStatus==0)
        {
          // await this.$store.dispatch('purchase/trigger_posting_dn', payload).then(() => {
          //   data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_posting_dn']));
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
            "trans_group": 'GRDN',
            "trans_type": '#Before post',
            "set_query":set_query
          },
          {
            "lookupdb_name": this.session_outlet_guid,
            "trans_group": 'GRDN',
            "trans_type": '@After post',
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
          // await this.$store.dispatch('purchase/trigger_unposting_dn', payload).then(() => {
          //   data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_unposting_dn']));
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
            "trans_group": 'GRDN',
            "trans_type": '#Before unpost',
            "set_query":set_query
          },
          {
            "lookupdb_name": this.session_outlet_guid,
            "trans_group": 'GRDN',
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
        }


        if(dispatch_response.status)
          {
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
          }
        else{
            console.log('dispatch_response',dispatch_response.message);
            this.showNotify("negative", dispatch_response.message );
            this.post_transmain = false;
            this.deleteLoading = false;

         }
        return;
        var status = data.status;
        if(status == "success")
          {
            if(this.json.BillStatus==0)
            {
              this.showNotify("positive", "Posted Successfully.");
            }
            else
            {
              this.showNotify("positive", "Unposted Successfully.");
            }

            window.location.reload();
            this.post_transmain = false;
            this.deleteLoading = false;
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
            this.post_transmain = false;
            this.deleteLoading = false;
          }

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
        this.ori_inv_no_options = [];
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
            language: this.language
          }

          var data = {};

          if(this.page_function == 'EditDebitNote')
          {
            await this.$store.dispatch('purchase/trigger_delete_dnchild', payload).then(() => {
              data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_dnchild_status']));
            });
          }
          console.log('data',data);
          if(data.status == "success")
          {
            this.$nextTick(async ()=>{
              this.table_function(this.ori_params);
              this.showNotify("positive","Delete successfully");
              this.modify_child = false;
              this.delete_child = false;
              this.deleteLoading = false;
              this.showAddLoading2 = false;
              this.updateAmount()
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
        var Qty = this.unformatAmount(this.jsonChild.SetQty);
        var UnitPrice = this.unformatAmount(this.jsonChild.UnitPrice);
        var TotalPrice = this.unformatAmount(this.jsonChild.TotalPrice);
        var reason = this.jsonChild.reason;
        // var item_remark = this.jsonChild.item_remark;
        var itemremark = this.jsonChild.itemremark;
        var ori_inv_no = this.jsonChild.ori_inv_no;
        var ori_inv_date = this.jsonChild.ori_inv_date;
        reason = reason === undefined ? '' : reason === null ? '' : reason;

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
            "ori_inv_date": ori_inv_date == '' ? null : ori_inv_date,
            "user": this.user_name,
            "language": this.language
          }

          var data = {};
          var set_query ={};
          var dispatch_response_array = {};
          console.log('payload',payload);
          await this.$store.dispatch('purchase/trigger_create_dnchild', payload).then(async() => {
            data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_dnchild_status']));


          });

          var response = data.response
            set_query = {
              "ERefNo":response.RefNo,
              "ELine":response.Line,
              "EType":response.Type,
              "Itemcode":response.Itemcode,
              "Itemlink":response.ItemLink,
              "EUser":this.user_name,
              "getuser":this.user_name
            };

            var json_runtime_runscript_multi = {
              params:[
                {
                  "lookupdb_name": this.session_outlet_guid,
                  "trans_group": 'GRDN',
                  "trans_type": 'dbnotechild',
                  "set_query":set_query
                }
            ]
            };

            var payload_runtime_runscript_multi ={
                  "pass_json": json_runtime_runscript_multi
            }



          var status = data.status

          if(status == "success")
          {
            this.showAddLoading = false;
            this.showNotify("positive", "Created Successfully.");
            dispatch_response = await this.runscript_multi(payload_runtime_runscript_multi,'1')
            console.log('dispatch_response',dispatch_response);
            if(newVal == 'save')
            {
              this.jsonChild = {};
              this.barcode_options = [];
              this.search.showTable = false;
              this.modify_child = false;
              this.table_function(this.ori_params);
              this.updatedAmount()
            }
            else if(newVal == 'save&add')
            {
              this.jsonChild = {};
              this.barcode_options = [];
              this.search.showTable = false;
              this.modify_child = false;
              this.table_function(this.ori_params);
              this.updatedAmount()
              this.addButtonCreatePOChild('item');
            }
          }
          else
          {
            var show_error = "";

            var error_response = data.response;
            console.log('error response',data);
            if(Array.isArray(error_response)){
              Object.keys(error_response).forEach((loop_index)=>{
              console.log('loop_index',loop_index);
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
            }else{
              show_error = error_response.detail
            }

            this.showNotify('negative', show_error);
            this.showAddLoading = false;
          }

          if(dispatch_response.status){
               console.log('Runscript : All scripts executed successfully');
              //this.showNotify('positive','All scripts executed successfully')
           }else{
              console.log('Runscript :', dispatch_response.message);
              this.showNotify('negative',dispatch_response.message)
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
            "reason": reason ,
            // "item_remark": item_remark,
            "itemremark": itemremark,
            "ori_inv_no": ori_inv_no,
            "ori_inv_date": ori_inv_date == '' ? null : ori_inv_date,
            "user": this.user_name,
            "language": this.language
          }

          var data = {};
          var set_query ={};
          var dispatch_response_array = {};
          if(this.page_function == 'EditDebitNote')
          {
            payload.Barcode = this.jsonChild.Barcode;

            await this.$store.dispatch('purchase/trigger_update_dnchild', payload).then(() => {
              data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_dnchild_status']));
            });
          }

          var status = data.status;
          var response = data.response;

          var set_query = {
              "ERefNo":response.RefNo,
              "ELine":response.Line,
              "EType":response.Type,
              "Itemcode":response.Itemcode,
              "Itemlink":response.ItemLink,
              "EUser":this.user_name,
              "getuser":this.user_name
            };

            var json_runtime_runscript_multi = {
              params:[
                {
                  "lookupdb_name": this.session_outlet_guid,
                  "trans_group": 'GRDN',
                  "trans_type": 'dbnotechild',
                  "set_query":set_query
                }
            ]
            };

            var payload_runtime_runscript_multi ={
                  "pass_json": json_runtime_runscript_multi
            }


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
              this.showNotify("positive", "Updated Successfully.");
              this.table_function(this.ori_params);
              this.updatedAmount()
            }
            var dispatch_response= await this.runscript_multi(payload_runtime_runscript_multi,'1')
            console.log('dispatch_response',dispatch_response);
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


          if(dispatch_response.status){
                console.log('Runscript : All scripts executed successfully');
             //   this.showNotify('positive','All scripts executed successfully')
           }else{
              console.log('Runscript :', dispatch_response.message);
              this.showNotify('negative',dispatch_response.message)
            }
        }
      },
      async updatedAmount(){
          var payload = {
            RefNo: this.$route.query.refno,
            language: this.language
          }

          var data = await this.getFilterDnmain(payload);
          var filtered_transmain = data.response;
          console.log('filtered_transmain',filtered_transmain);

          filtered_transmain.gst_tax_sum = this.formatAmount(filtered_transmain.gst_tax_sum, '$');
          filtered_transmain.SubTotal1 = this.formatAmount(filtered_transmain.SubTotal1, '$');

          this.json.gst_tax_sum = filtered_transmain.gst_tax_sum
          this.json.SubTotal1 = filtered_transmain.SubTotal1
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
        // console.log('child edit');
        this.hv_item = true;

        this.modify_child = true;
        this.edit_child = true;
        this.showAddLoading = true;

        var cpayload = {
          RefNo: json.RefNo,
          language: this.language
        }

        var cdata = await this.getDnchild(cpayload);

        var line = json.Line;

        var filterPochild = cdata.response.filter((entry)=>{
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

        var ipayload = {
          "itemcode": filterPochild[0].Itemcode,
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
          console.log('filteredArray',filteredArray);
           // this.ori_inv_no_options = ary;
        });

        setTimeout(()=>{
          this.jsonChild = filterPochild[0];
          this.jsonChild.UnitPrice = this.formatAmount(this.jsonChild.UnitPrice,'$');
          this.jsonChild.DiscAmt = this.formatAmount(this.jsonChild.DiscAmt,'$');
          this.jsonChild.Disc1value = this.formatAmount(this.jsonChild.Disc1Value,'$');
          this.jsonChild.Disc2Value = this.formatAmount(this.jsonChild.Disc2Value,'$');
          this.jsonChild.NetUnitPrice = Number(this.jsonChild.NetUnitPrice).toFixed(4);
          this.jsonChild.TotalPrice = this.formatAmount(this.jsonChild.TotalPrice,'$');
          this.jsonChild.PackSize = this.formatAmount(this.jsonChild.Packsize,'$');
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
          // console.log('select_inv',this.select_inv);
          // console.log('jsonChild',this.jsonChild);
          // console.log('hv_item',this.hv_item);
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
        this.json.DocDate = payload;
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
      async getFilterDnmain(payload)
      {
        return await this.$store.dispatch('purchase/trigger_read_dn_by_refno', payload).then(() => {
          var data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_read_dn_by_refno']));
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
      async getDnchild(payload)
      {
        return await this.$store.dispatch('purchase/trigger_get_dnchild', payload).then(() => {
          var data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_dnchild']));
          return data;
        });
      },
      back(){
        this.$router.push("DebitNote");
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
            this.item_table_function(payload);
      },
      table_function(payload){
          var table_column = [
              {
                  name: 'action',
                  required: true,
                  label: 'Actions',
                  align: 'center',
                  sortable: true,
                  field: 'action',
                  format_child: '',
                  tooltip: ''
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
                  name: 'Packsize',
                  required: true,
                  label: 'P/Size',
                  align: 'right',
                  sortable: true,
                  field: 'Packsize',
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
                  label: 'Price',
                  align: 'right',
                  sortable: true,
                  field: 'UnitPrice',
                  format_child: '',
                  tooltip: '',
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
                  align: 'right',
                  sortable: true,
                  field: 'TotalPrice',
                  format_child: '',
                  tooltip: '',
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
              {
                  name: 'Location',
                  required: true,
                  label: 'Location',
                  align: 'left',
                  sortable: true,
                  field: 'Location',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
              },
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
              {
                  name: 'AverageCost',
                  required: true,
                  label: 'Avg Cost',
                  align: 'right',
                  sortable: true,
                  field: 'AverageCost',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
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
                  headerStyle: 'text-align: center;',
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
                  headerStyle: 'text-align: center;',
                  sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
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
                  sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
              },
              {
                  name: 'Barcode',
                  required: true,
                  label: 'Bar Code',
                  align: 'left',
                  sortable: true,
                  field: 'Barcode',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
              },
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
              {
                  name: 'WeightedAvgCost',
                  required: true,
                  label: 'Weighted Avg Cost',
                  align: 'right',
                  sortable: true,
                  field: 'WeightedAvgCost',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
              },
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

            if(this.page_function == 'CreateDebitNote')
            {
              data = {
                  "data": []
              };
            }
            else
            {
              data = await this.getDnchild(payload);
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

            // await this.$store.dispatch('purchase/trigger_get_search_item_for_dn', payload).then(() => {
            //   data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_search_item_for_dn']));
            // });
            var payload2 ={
              "pass_json": payload
            }
            console.log('payload2',payload2);
            var object_pass = {
              dispatch: 'purchase/trigger_get_search_item_for_dn',
              getter: 'purchase/get_search_item_for_dn',
              app: this,
              payload: payload2,
         };

        var dispatch_response = await this.$dispatch(object_pass);
      //  console.log('dispatch_response',dispatch_response);
            this.item_table_column = table_column;

            if(dispatch_response.status)
            {
              var results = dispatch_response.response;
              // console.log('results',results);
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

        if(this.page_function == 'CreateDebitNote')
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
          var set_query = {};
          if(this.page_function == 'CreateDebitNote')
          {
            await this.$store.dispatch('purchase/trigger_create_dn', payload).then(() => {
              data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_dn_status']));
            });
            var response = data.response
            set_query = {
              "ERefNo":response.RefNo,
              "Type":response.Type,
              "SupplierCode":response.Code,
              "EUser":this.user_name,
              "getuser":this.user_name
            };
          }
          else if(this.page_function == 'EditDebitNote')
          {
            payload.RefNo = this.json.RefNo;

            await this.$store.dispatch('purchase/trigger_update_dn', payload).then(() => {
              data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_dn_status']));
            });

            var response = data.response
            console.log('response',response);
            set_query = {
              "ERefNo":response.RefNo,
              "Type":response.Type,
              "SupplierCode":response.Code,
              "EUser":this.user_name,
              "getuser":this.user_name
            };
          }

          var json_runtime_runscript_multi = {
              params:[
              {
                "lookupdb_name": this.session_outlet_guid,
                "trans_group": 'GRDN',
                "trans_type": 'dbnotemain',
                "set_query":set_query
              }
            ]
          };

          var payload_runtime_runscript_multi ={
            "pass_json": json_runtime_runscript_multi
          }

          var dispatch_response = await this.runscript_multi(payload_runtime_runscript_multi)



          var status = data.status

          if(status == "success")
          {
            this.showAddLoading = false;

            var mobile = this.$q.screen.width < 600;

            if(this.page_function == 'CreateDebitNote')
            {
              this.showNotify("positive", "Created Successfully.");

              // if(mobile)
              // {
              //   this.$router.push({ name: 'confirm', query: { refno: data.response.RefNo, header: 'DN', type:'create' }})
              // }
              // else
              // {
                this.$router.push({ name: 'EditDebitNote', query: { refno: data.response.RefNo, step: 2 } })
              // }
            }
            else if(this.page_function == 'EditDebitNote')
            {
              if(mobile)
              {
                this.$router.push({ name: 'confirm', query: { refno: data.response.RefNo, header: 'DN', type:'update' }})
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

                var cdata = await this.getDnchild(cpayload);
                var cresults = cdata.response;

                var payload = {
                  RefNo: refno,
                  language: this.language
                }

                var data = await this.getFilterDnmain(payload);

                var filtered_transmain = data.response;

                filtered_transmain.rebate_amt = this.formatAmount(filtered_transmain.rebate_amt, '$');
                filtered_transmain.Total = this.formatAmount(filtered_transmain.Total, '$');
                filtered_transmain.total_include_tax = this.formatAmount(filtered_transmain.total_include_tax, '$');
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

                var filter_outlet = this.location_options.filter((entry)=>{
                  return entry.value == this.json.Location;
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


          if(dispatch_response.status){
               console.log('Runscript : All scripts executed successfully');
             // this.showNotify('positive','All scripts executed successfully')
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
      // async runscript_multi(payload){
      //   var object_pass = {
      //         dispatch: 'purchase/trigger_runtime_runscript_multi',
      //         getter: 'purchase/get_runscript_multi_status',
      //         app: this,
      //         payload: payload,
      //     };

      //    var dispatch_response = await this.$dispatch(object_pass);

      //    return dispatch_response
      // },
      checkResponseJsonStatus(json_response){
        var errorItems = json_response.filter(item => item.status === false);
        // If there are no items with status === false, return true with a success message
        if (errorItems.length === 0) {
          return { status: true, message: "All scripts executed successfully" };
        } else {
          // If there are items with status === false, return false with an error message
          const errorMessage = errorItems[0].message || "Error in script execution";
          return { status: false, message: errorMessage };
          //  const firstErrorMessage = errorItems[0].message || "Error in script execution";
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
              "trans_group": 'GRDN',
              "trans_type": '#Before print',
              "set_query":set_query
            },
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
            //     title: 'DN Audit List - Warning Message Details',
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
        this.$router.push({name:'PrintWarningMessage', query: { refno: refno, header: 'DN'}});
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
                  title: 'DN Audit List - Warning Message Details',
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

                var data = await this.getFilterDnmain(payload);
                var filtered_transmain = data.response;
                console.log('filtered_transmain',filtered_transmain);
                filtered_transmain.rebate_amt = this.formatAmount(filtered_transmain.rebate_amt, '$');
                filtered_transmain.Total = this.formatAmount(filtered_transmain.Total, '$');
                filtered_transmain.gst_tax_sum = this.formatAmount(filtered_transmain.gst_tax_sum, '$');
                filtered_transmain.SubTotal1 = this.formatAmount(filtered_transmain.SubTotal1, '$');
                filtered_transmain.SubTotal2 = this.formatAmount(filtered_transmain.SubTotal2, '$');
                this.json.Total = filtered_transmain.Total;
                this.json.gst_tax_sum = filtered_transmain.gst_tax_sum;
                this.json.SubTotal1 = filtered_transmain.SubTotal1;
                this.json.SubTotal2 = filtered_transmain.SubTotal2;
      },

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

