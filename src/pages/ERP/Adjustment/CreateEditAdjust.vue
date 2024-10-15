<template>
  <div v-if="$q.screen.width > 599" class="card_sides">
    <q-card style="max-height: 100%;">

      <q-card-section class="theme_color dialog_header header_top">
        <div class="intermediate"/>
        <div v-if="page_function == 'CreateAdjustment'" class="text-subtitle1 header_text">Adjustment</div>
        <div v-if="page_function == 'EditAdjustment'" class="text-subtitle1 header_text">
          Adjustment<br>
          <div class="row">
            <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
              <span class="text-caption">   {{ this.$language('D0030') }}: {{ json.RefNo }} | {{ this.$language('D0026') }}: {{json.loc_group}} | {{ this.$language('D0025') }}: {{ json.SCode }} - {{ json.SName }} | <br></span>
            </div>
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 text-right">
              <span class="text-caption text-right text-bold" style="font-size:14px">{{ this.$language('D0145') }}: {{currency_sign}} {{json.Total}}<br></span>
            </div>
          </div>
          <!-- <span class="text-caption">
            Refno: {{ json.RefNo }} | Supplier: {{ json.SCode }} - {{ json.SName }} | Branch: {{json.loc_group}}<br>
          </span> -->
        </div>
      </q-card-section>


      <!-- <q-card-section class="theme_color dialog_header header_top">
        <div class="intermediate"/>
        <div v-if="page_function == 'CreateAdjustment'" class="text-subtitle1 header_text">Adjustment</div>
        <div v-if="page_function == 'EditAdjustment'" class="text-subtitle1 header_text">
          Adjustment<br>
          <div class="row">
            <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
              <span class="text-caption">
            Refno: {{ json.RefNo }} | Branch: {{json.loc_group}}  | Supplier: {{ json.SCode }} - {{ json.SName }}
          </span>
            </div>
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 text-right">
              <span class="text-caption text-right">Total Amount: RM {{ json.Total}}<br></span>
            </div>
          </div>
        </div>
      </q-card-section> -->

      <q-card-section class="upload_container content_body_dialog">
        <q-form ref="save_form">
          <div v-if="page_function == 'EditAdjustment'" class="intermediate_white"/>
          <div class="row upload_separator_first">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <q-stepper
                flat
                header-nav
                v-model="json.step"
                color="primary"
                animated
                @update:model-value="handleChangeStepper"
                :class="page_function == 'EditAdjustment' ? 'sticky_stepper' : ''"
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
                              <Datepicker
                              :no_label="false"
                              label="P/O Date"
                              :disable="json.BillStatus == 1"
                              :autoclose="true"
                              v-on:receiveChange="handleChangePODate"
                              :daterange="json.PODate"
                              :componentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div v-if="page_function=='EditAdjustment'" class="col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                          <div class="row" :class="$q.screen.width < 1024 ? 'dialog_separator' : ''">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Issued By"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="json.IssuedBy"
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
                              :readonly="json.BillStatus == 1 ? true : supplier_readonly"
                              :no_label="false"
                              :label="'Supplier'"
                              v-model:pass_value="json.SCode"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.select"
                              :options="supplier_options"
                              v-on:receiveChange="handleChangeSCode"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="row dialog_separator">
                        <div class="col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <!-- <Select
                              :readonly="false"
                              :no_label="false"
                              v-model="json.STerm"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.term : oridbComponentBehavior.select"
                              :options="term_options"
                              v-on:receiveChange="handleChange"
                              /> -->
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              :label="'Term (Days)'"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="json.STerm"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <!-- <Select
                              :readonly="false"
                              :no_label="false"
                              v-model="json.CalDueDateby"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.cal_due_date_by : oridbComponentBehavior.select"
                              :options="term_options"
                              v-on:receiveChange="handleChange"
                              /> -->
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
                      </div>

                      <div class="row dialog_separator">
                        <div class="col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Datepicker
                              :no_label="false"
                              label="Delivery Date"
                              :disable="json.BillStatus == 1"
                              :autoclose="true"
                              v-on:receiveChange="handleChangeDeliverDate"
                              :daterange="json.DeliverDate"
                              :componentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Exp in Days"
                              :readonly="json.BillStatus == 1 ? true : page_function == 'CreateAdjustment'"
                              v-on:change="handleChangeExpInDays"
                              v-model="json.pur_expiry_days"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right_readonly : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                          <div class="row" :class="$q.screen.width > 599 && $q.screen.width < 1023 ? 'dialog_separator' : ''">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Datepicker
                              :no_label="false"
                              label="Expiry Date"
                              :disable="true"
                              :autoclose="true"
                              v-on:receiveChange="handleChangeExpiryDate"
                              :daterange="json.expiry_date"
                              :componentBehavior="dbComponentBehavior ? dbComponentBehavior.select : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="row dialog_separator">
                        <div class="col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <SelectFilter
                              :readonly="json.BillStatus == 1"
                              :no_label="false"
                              :label="'Branch'"
                              v-model:pass_value="json.loc_group"
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
                              :readonly="json.BillStatus == 1"
                              :no_label="false"
                              :label="'Receiving Location'"
                              v-model:pass_value="json.loc_group"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.select"
                              :options="location_options2"
                              v-on:receiveChange="handleChangeLocGroup"
                              />
                            </div>
                          </div>
                        </div>

                        <div v-if="page_function =='EditAdjustment'" class="col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                          <div class="row" :class="$q.screen.width<1024 ? 'dialog_separator': ''">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              :label="'Tax Code'"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="json.tax_code_purchase"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div v-if="page_function=='EditAdjustment'" class="col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                          <div class="row dialog_separator">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Min Stock Days"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="json.stockday_min"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div v-if="page_function=='EditAdjustment'" class="col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                          <div class="row dialog_separator">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Max Stock Days"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="json.stockday_max"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 input_wrapper_right">
                          <div class="row dialog_separator">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Textarea class="ignore_height" :no_label="false" :readonly="json.BillStatus == 1" v-on:receiveChange="handleChange" v-model="json.Remark"
                              :dbComponentBehavior="dbComponentBehavior.remark" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </q-step>

                <q-step
                  v-if="page_function == 'EditAdjustment'"
                  :name="2"
                  title="Detail"
                  icon="create_new_folder"
                  :done="json.step > 2"
                >
                  <div class="row upload_separator">
                      <div class="card_section_two col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <SalesTable
                          hide_footer
                          :readonly_button="false"
                          :row_per_page="[0]"
                          :top_button="page_function=='EditAdjustment' && json.BillStatus  == 0"
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

                <!-- <q-step
                  v-if="page_function == 'EditAdjustment'"
                  :name="3"
                  title="Discount"
                  icon="create_new_folder"
                  :done="json.step > 3"
                >


                  <div v-if="page_function=='EditAdjustment'" class="row dialog_separator">
                    <div class="col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
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

                    <div class="col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
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
                    </div>

                    <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 input_wrapper_right"></div>
                  </div>

                  <div v-if="page_function=='EditAdjustment'" class="row dialog_separator">
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
                          label="Tax"
                          :readonly="true"
                          v-on:change="handleChange"
                          v-model="json.gst_tax_sum"
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
                  </div>
                </q-step> -->

              </q-stepper>
            </div>
          </div>
        </q-form>
      </q-card-section>

      <q-card-actions class="dialog_action justify-between">
        <div v-if="this.json.step == 1">
          <span v-if="page_function == 'EditAdjustment'">
          <Button_icon  :flat="true" :font_color="'white'" :color="'#094161'" :text="json.BillStatus == 1 ? 'UNPOST' : 'POST'" :outline="false" size="15px"
            v-on:receiveClick="confirmPost"/>
          </span>

          <span  v-if="json.BillStatus == 0" class="q-pl-xs">
            <Button_icon  :flat="true" :font_color="'white'" :color="'#094161'" :text="'SAVE'" :outline="false" size="15px"
            v-on:receiveClick="handleCreateAdj"/>
          </span>

          <span v-if="page_function == 'EditAdjustment'" class="q-pl-xs">
            <Button_icon v-if="page_function=='EditAdjustment'" :flat="false" :font_color="'black'" :color="'white'" :text="'NEXT'" :outline="true" size="15px"
            @click="json.step = 2"/>
          </span>

          <!-- <q-btn v-if="page_function=='EditAdjustment'" @click="json.step = 2" color="primary" label="Next" />

          <span class="q-pl-xs">
            <q-btn color="primary" label="SAVE" @click="handleCreateAdj" />
          </span> -->
        </div >

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
          v-on:receiveClick="handleCreateAdj"/>

          <span class="q-pl-xs">
            <Button_icon :flat="false" :font_color="'black'" :color="'white'" :text="'PREVIOUS'" :outline="true" size="15px"
            @click="json.step = 2"/>
          </span>

          <!-- <q-btn @click="json.step = 4" color="primary" label="Next" />
          <q-btn flat @click="json.step = 2" color="primary" label="Back" class="q-ml-sm" /> -->
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
        <div v-if="page_function == 'CreateAdjustment'" class="text-subtitle1 header_text" style="padding-top: 10px;">Adjustment</div>
        <div v-if="page_function == 'EditAdjustment'" class="text-subtitle1 header_text">Adjustment
        <br>Refno: {{ json.RefNo }}</div>
        <!-- <q-btn-dropdown v-if="page_function == 'EditAdjustment'" :disable="showAddLoading" class="custom_more_button" flat dense icon="more_vert">
          <q-list>
            <q-item clickable v-close-popup>
              <q-item-section>
                <q-item-label @click="confirmPost" v-if="json.BillStatus == 1">UNPOST</q-item-label>
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
                        <div class="input_wrapper_right" :class="page_function == 'CreateAdjustment' ?  'col-xs-10' : json.BillStatus == 0 && !supplier_readonly ? 'col-xs-10' : 'col-xs-12'">
                          <div class="row" :class="$q.screen.width < 1024 ? 'dialog_separator' : ''">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Supplier</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <SelectFilter
                              :readonly="json.BillStatus == 1 || supplier_readonly"
                              :no_label="true"
                              v-model:pass_value="json.SCode"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.select"
                              :options="supplier_options"
                              v-on:receiveChange="handleChangeSCode"
                              />
                            </div>
                          </div>
                        </div>

                        <div v-if="json.BillStatus == 0 && !supplier_readonly" dir="rtl" class="col-xs-2 col-sm-1 col-md-1 col-lg-1 col-xl-1 input_wrapper_right" style="padding-top: 26px;">
                            <Button_icon :small_round="true" :flat="false" :font_color="'white'" :color="'primary'" :icon="'search'" :outline="false" size="13px"
                            v-on:receiveClick="addButtonCreatePOChild('supplier')" style="margin-top: 2px;"/>
                        </div>

                        <div :class="page_function == 'CreateAdjustment' ? 'col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4' : 'col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4'" class="input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">P/O Date</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Datepicker
                              :no_label="true"
                              :disable="json.BillStatus == 1"
                              :autoclose="true"
                              v-on:receiveChange="handleChangePODate"
                              :daterange="json.PODate"
                              :componentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Issued By</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="true"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="json.IssuedBy"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="row dialog_separator">
                        <div class="col-xs-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Term (Days)</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <!-- <Select
                              :readonly="false"
                              :no_label="false"
                              v-model="json.STerm"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.term : oridbComponentBehavior.select"
                              :options="term_options"
                              v-on:receiveChange="handleChange"
                              /> -->
                              <Input
                              :autofocusclick="true"
                              :no_label="true"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="json.STerm"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Cal. Due Date by</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <!-- <Select
                              :readonly="false"
                              :no_label="false"
                              v-model="json.CalDueDateby"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.cal_due_date_by : oridbComponentBehavior.select"
                              :options="term_options"
                              v-on:receiveChange="handleChange"
                              /> -->
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
                          <div class="row" :class="$q.screen.width<1024 ? 'dialog_separator': ''">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Delivery Date</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Datepicker
                              :no_label="true"
                              :disable="json.BillStatus == 1"
                              :autoclose="true"
                              v-on:receiveChange="handleChangeDeliverDate"
                              :daterange="json.DeliverDate"
                              :componentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                          <div class="row dialog_separator">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Exp in Days</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="true"
                              :readonly="json.BillStatus == 1 ? true : page_function == 'CreateAdjustment'"
                              v-on:change="handleChangeExpInDays"
                              v-model="json.pur_expiry_days"
                              :dbComponentBehavior="dbComponentBehavior ? page_function == 'CreateAdjustment' ? dbComponentBehavior.text_right_readonly :  dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                          <div class="row dialog_separator">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Expiry Date</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Datepicker
                              :no_label="true"
                              :disable="true"
                              :autoclose="true"
                              v-on:receiveChange="handleChangeExpiryDate"
                              :daterange="json.expiry_date"
                              :componentBehavior="dbComponentBehavior ? dbComponentBehavior.select : oridbComponentBehavior.text" />
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
                      </div>

                      <div class="row dialog_separator">
                        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Receiving Location</span>
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

                      <div class="row">
                        <div v-if="page_function=='EditAdjustment'" class="col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                          <div class="row" :class="$q.screen.width<1024 ? 'dialog_separator': ''">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Tax Code</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="true"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="json.tax_code_purchase"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div v-if="page_function=='EditAdjustment'" class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 input_wrapper_right">
                          <div class="row dialog_separator">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Min Stock Days</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="true"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="json.stockday_min"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div v-if="page_function=='EditAdjustment'" class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 input_wrapper_right">
                          <div class="row dialog_separator">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Max Stock Days</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="true"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="json.stockday_max"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 input_wrapper_right">
                          <div class="row dialog_separator">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Remark</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Textarea class="ignore_height" :no_label="true" :readonly="json.BillStatus == 1" v-on:receiveChange="handleChange" v-model="json.Remark"
                              :dbComponentBehavior="dbComponentBehavior.remark" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </q-step>

                <q-step
                  v-if="page_function == 'EditAdjustment'"
                  :name="2"
                  title="Detail"
                  icon="create_new_folder"
                  :done="json.step > 2"
                >
                  <div v-if="page_function == 'EditAdjustment'" class="row">
                    <div class="card_section_two col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                      <q-card v-if="results.length != 0" flat bordered class="card_design" style="width: 100%; border-radius:6px;">
                          <q-card-section @click="handleAction(result)" v-for="(result,index) in results" :key="index" style="padding: 5px; border-bottom: 1px solid rgba(0, 0, 0, 0.12);">
                            <div v-if="results.length != 0" class="row">
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
                          <q-card-section v-if="json.BillStatus == 0" @click="addButtonCreatePOChild('item')" style="padding: 0px; border-bottom: 1px solid rgba(0, 0, 0, 0.12);">
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
                          </q-card-section>
                      </q-card>
                    </div>
                  </div>
                </q-step>

                <q-step
                  v-if="page_function == 'EditAdjustment'"
                  :name="3"
                  title="Surcharge/Discount"
                  icon="create_new_folder"
                  :done="json.step > 3"
                >
                  <div class="row dialog_separator">
                    <div v-if="page_function=='EditAdjustment'" class="col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                      <div class="row dialog_separator">
                        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
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

                    <div v-if="page_function=='EditAdjustment'" class="col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                      <div class="row dialog_separator">
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

                    <div v-if="page_function=='EditAdjustment'" class="col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                      <div class="row dialog_separator">
                        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                          <span class="mobile_font">Total (Exc)</span>
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

                    <div v-if="page_function=='EditAdjustment'" class="col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                      <div class="row dialog_separator">
                        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
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

                    <div v-if="page_function=='EditAdjustment'" class="col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                      <div class="row dialog_separator">
                        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                          <span class="mobile_font">Total (Inc)</span>
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
                </q-step>

              </q-stepper>

              <!-- TBC -->
              <!-- <div class="row dialog_separator">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 input_wrapper_right">
                  <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                      <span class="dialog_font">Surcharge/ Discount</span>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                      <PurchaseTable
                      :readonly_button="false"
                      :row_per_page="[5,10,20,50,0]"
                      :top_button="false"
                      v-on:add_button="addButtonCreatePOChild"
                      v-on:main_action="handleAction"
                      v-on:main_edit="handleEdit"
                      v-on:main_list="handleList"
                      v-on:main_delete="handleDelete"
                      :title="table_title"
                      :table_data="table_data1"
                      :table_column="table_column1"
                      :action_button="true"
                      :edit_button="false"
                      :view_button="false"
                      :delete_button="false"
                      :flat_status="true"
                      :bordered_status="true"
                      v-on:receiveRequestTable="handleTableChange1"
                      />
                    </div>
                  </div>
                </div>
              </div> -->
            </div>
          </div>
        </q-form>
      </q-card-section>

      <q-inner-loading
        :showing="showAddLoading"
        color="primary"
        z-index="10"
      />
    </q-card>

    <div v-if="json.step == 1 || json.step == 3" class="dialog_action_bottom" :style="page_function == 'EditAdjustment'  && json.BillStatus== 0 ? 'height: 65px;' : 'height: 40px;'">
      <div v-if="page_function == 'EditAdjustment'" class="row q-px-sm" :class="page_function == 'EditAdjustment' && json.BillStatus !== 0  ? 'q-pt-sm' :''" style="font-size: 13px;">
        <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 ">
          <div class="row justify-left items-center" >
         <Button_icon class="q-pa-none q-ma-none" :flat="true" :icon="'expand_less'" v-on:receiveClick="show_summary_dialog" :font_color="'primary'" :color="'primary'" :outline="false" size="13px"/>
         <span class="" style="color:#1976D2;" @click="show_summary_dialog"> {{ $language('D0032') }}:  {{ currency_sign }} {{ json.total_include_tax }} </span>
         <!-- Total Amount -->
          </div>
        </div>
        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 text-right">
          <!-- POST BUTTON -->
          <span class="q-pr-xs" :style="json.BillStatus == 1 ? 'width: 100%;' : 'width: 24%;'">
            <Button_icon v-if="json.BillStatus==1" class="full-width" style="height: 25px;" :small_round="true" :text="$language('D0148')" :flat="false" :font_color="'white'" :color="'#273655'" :outline="false" size="11px" @click="confirmPost"/>
            <Button_icon v-else class="full-width" style="height: 25px;" :small_round="true" :text="$language('D0019')" :flat="false" :font_color="'white'" :color="'#273655'" :outline="false" size="11px" @click="confirmPost"/>
          </span>
        </div>
      </div>

      <div class="row q-px-sm q-py-xs">
        <!-- <span v-if="page_function == 'EditAdjustment'" class="q-pr-xs" :style="json.BillStatus == 1 ? 'width: 100%;' : 'width: 24%;'">
          <Button_icon v-if="json.BillStatus==1" class="full-width" style="height: 30px;" :small_round="true" :text="'UNPOST'" :flat="false" :font_color="'white'" :color="'#273655'" :outline="false" size="13px" @click="confirmPost"/>
          <Button_icon v-else class="full-width" style="height: 30px;" :small_round="true" :text="'POST'" :flat="false" :font_color="'white'" :color="'#273655'" :outline="false" size="13px" @click="confirmPost"/>
        </span> -->

        <Button_icon v-if="json.BillStatus==0" :readonly="page_function.startsWith('Edit') && deepEqual(ori_json, json)" style="height: 30px; width: 100%" :small_round="true" :text="page_function.startsWith('Create') ? 'Generate Adjustment' : 'Update Adjustment'" :flat="false" :font_color="'white'" :color="'primary'" :outline="false" size="13px" @click="handleCreateAdj"/>
      </div>
    </div>

    <div v-if="json.step == 2" class="dialog_action_bottom" :style="page_function == 'EditAdjustment' && json.BillStatus== 0  ? 'height: 65px;' : 'height: 40px;'">
      <div v-if="page_function == 'EditAdjustment'" class="row q-px-sm" :class="page_function == 'EditAdjustment' && json.BillStatus !== 0  ? 'q-pt-sm' :''"  style="font-size: 13px;">
        <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 ">
          <div class="row justify-left items-center" >
          <!-- <span class="" style="color:#1976D2;" @click="show_summary_dialog">View</span> -->
            <Button_icon class="q-pa-none q-ma-none" :flat="true" :icon="'expand_less'" v-on:receiveClick="show_summary_dialog" :font_color="'primary'" :color="'primary'" :outline="false" size="13px"/>
            <span class="" style="color:#1976D2;" @click="show_summary_dialog"> {{ $language('D0032') }}:  {{ currency_sign }} {{ json.total_include_tax }} </span>
            <!-- Total Amount -->
            </div>
        </div>
        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 text-right">
          <!-- POST BUTTON -->
          <span class="q-pr-xs" :style="json.BillStatus == 1 ? 'width: 100%;' : 'width: 24%;'">
            <Button_icon v-if="json.BillStatus==1" class="full-width" style="height: 25px;" :small_round="true" :text="$language('D0148')" :flat="false" :font_color="'white'" :color="'#273655'" :outline="false" size="11px" @click="confirmPost"/>
            <Button_icon v-else class="full-width" style="height: 25px;" :small_round="true" :text="$language('D0019')" :flat="false" :font_color="'white'" :color="'#273655'" :outline="false" size="11px" @click="confirmPost"/>
          </span>
        </div>
      </div>
      <div  v-if="json.BillStatus == 0" class="row q-pb-xs q-pr-sm">
        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6" @click="addButtonCreatePOChild('item')">
          <div class="row justify-center items-center" style="width: 100%; height: 40px;">
            <div class="q-pr-sm">
              <Button_icon style="border-radius: 15px;" :flat="false" :icon="'add'" v-on:receiveClick="addButtonCreatePOChild('item')" :font_color="'white'" :color="'primary'" :outline="false" size="10px"/>
            </div>
            <div>
              {{ $language('D0152') }}
              <!--   Add Item Details -->
            </div>
          </div>
        </div>
        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6" @click="supplierItemlist()" style="border-left: 1px solid #cecaca; cursor: pointer">
          <div class="row justify-center items-center" style="width: 100%; height: 40px;">
            <div class="q-pr-sm">
              <Button_icon style="border-radius: 15px;" :flat="false" :icon="'add'" v-on:receiveClick="supplierItemlist()" :font_color="'white'" :color="'primary'" :outline="false" size="10px"/>
            </div>
            <div>
              {{ $language('D0153') }}
              <!--  Supplier Item List  -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <q-dialog v-model="delete_child" persistent :position="$q.screen.width > 599 ? 'top' : 'bottom'">
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
        <div v-if="json.BillStatus == 0 && edit_child" class="custom_delete" @click="handleDelete(jsonChild)">
          Delete
          <!-- <Button_icon :disabled="readonly_delete" :icon="'delete'" :color="'negative'" :outline="false" size="12px" v-on:click="handleDelete(jsonChild)" class="q-mr-sm" /> -->
        </div>

        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center">
          <div v-if="!edit_child" class="text-subtitle1 header_text" style="margin-top: 5px;">Adjustment Detail<br></div>
          <div v-else class="text-subtitle1 header_text" style="margin-top: 5px;">Edit Adjustment Detail<br></div>
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

                    <div v-if="hv_item" class="col-xs-6 col-sm-6 col-md-2 col-lg-2 col-xl-2 four_column_left two_column_left">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Barcode</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Select
                              :readonly="json.BillStatus == 1"
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
                    </div>

                    <div v-if="hv_item" class="col-xs-6 col-sm-6 col-md-2 col-lg-2 col-xl-2 four_column_left">
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
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
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
                  </div>

                  <div v-if="hv_item" class="row dialog_separator">
                    <div class="col-xs-6 col-sm-5 col-md-2 col-lg-2 col-xl-2 four_column_left">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                          <span class="mobile_font">Bulk Qty</span>
                        </div>
                        <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                          <Input
                          :autofocusclick="true"
                          :no_label="true"
                          :readonly="json.BillStatus == 1"
                          v-on:change="handleChangeBulkQty"
                          v-model="jsonChild.BulkQty"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                        </div>
                        <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 q-pl-sm">
                          <span style="font-size: 13px;">x {{ jsonChild.OrderLotSize }}</span>
                        </div>
                      </div>
                    </div>

                    <div class="col-xs-6 col-sm-2 col-md-1 col-lg-1 col-xl-1 four_column_left" :class="$q.screen.width>599 && $q.screen.width<1024 ? 'two_column_left' : ''">
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
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                        </div>
                      </div>
                    </div>

                    <div class="col-xs-6 col-sm-2 col-md-2 col-lg-2 col-xl-2 four_column_left two_column_left">
                      <div class="row" :class="$q.screen.width<599 ? 'dialog_separator': ''">
                        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                          <span class="mobile_font">FOC</span>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <Input
                          :autofocusclick="true"
                          :no_label="true"
                          :readonly="json.BillStatus == 1 ? true : jsonChild.PriceType=='FOC'"
                          v-on:change="handleChangeQtyfoc"
                          v-model="jsonChild.Qty_foc"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right_readonly : oridbComponentBehavior.text" />
                        </div>
                      </div>
                    </div>

                    <div class="col-xs-6 col-sm-3 col-md-2 col-lg-2 col-xl-2 four_column_left">
                      <div class="row" :class="page_function == 'EditAdjustment' ? 'dialog_separator': ''">
                        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                          <span class="mobile_font">Unit Price</span>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <Input
                          :autofocusclick="true"
                          :no_label="true"
                          :readonly="json.BillStatus == 1 ? true : unit ? false : true"
                          v-on:change="handleChangeUnitPrice"
                          v-model="jsonChild.UnitPrice"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right_readonly : oridbComponentBehavior.text" />
                        </div>
                      </div>
                    </div>

                    <div class="col-xs-6 col-sm-7 col-md-3 col-lg-3 col-xl-3 four_column_left two_column_left">
                      <div class="row" :class="$q.screen.width<1024 ? 'dialog_separator': ''">
                        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                          <span class="mobile_font">Discount(+)/Surcharge(-)</span>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <Input
                          :autofocusclick="true"
                          :no_label="true"
                          :readonly="json.BillStatus == 1 ? true : unit ? false : true"
                          v-on:change="handleChangeDiscAmt"
                          v-model="jsonChild.DiscAmt"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div v-if="hv_item" class="row dialog_separator">
                    <div class="col-xs-6 col-sm-3 col-md-3 col-lg-3 col-xl-3 four_column_left two_column_left">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                          <span class="mobile_font">Disc1Type</span>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <Select
                          dir="rtl"
                          :readonly="json.BillStatus == 1 ? true : unit ? false : true"
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
                          :readonly="json.BillStatus == 1 ? true : unit ? false : true"
                          v-on:change="handleChangeDisc1value"
                          v-model="jsonChild.Disc1value"
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
                          :readonly="json.BillStatus == 1 ? true : unit ? false : true"
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
                          :readonly="json.BillStatus == 1 ? true : unit ? false : true"
                          v-on:change="handleChangeDisc2Value"
                          v-model="jsonChild.Disc2Value"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div v-if="hv_item" class="row dialog_separator">
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
                          :readonly="json.BillStatus == 1 ? true : unit"
                          v-on:change="handleChangeTotalPrice"
                          v-model="jsonChild.TotalPrice"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div v-if="hv_item" class="row dialog_separator">
                    <div class="col-xs-6 col-sm-6 col-md-2 col-lg-2 col-xl-2 four_column_left two_column_left">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                          <span class="mobile_font">Rebate Amount</span>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <Input
                          :autofocusclick="true"
                          :no_label="true"
                          :readonly="true"
                          v-on:change="handleChange"
                          v-model="jsonChild.rebate_value"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right_readonly : oridbComponentBehavior.text" />
                        </div>
                      </div>
                    </div>

                    <div class="col-xs-6 col-sm-6 col-md-2 col-lg-2 col-xl-2 four_column_left">
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
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right_readonly : oridbComponentBehavior.text" />
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

      <q-card-actions v-if="json.BillStatus == 0 && hv_item" class="dialog_action" style="padding-left: 20px;">
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
          <div class="text-subtitle1 header_text" style="margin-top: 5px;">Adjustment Detail<br></div>
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
                      v-on:receiveClick="showSearchDialog()" :tooltip_message="'Search Item'" />
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
                              v-model="jsonChild.Barcode"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" /> -->
                              <Select
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
                    </div>

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
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
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
                    <div class="col-xs-6 col-sm-5 col-md-2 col-lg-2 col-xl-2 four_column_left">
                      <div class="row">
                        <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                          <Input
                          :autofocusclick="true"
                          :no_label="false"
                          label="Bulk Qty"
                          :readonly="json.BillStatus == 1"
                          v-on:change="handleChangeBulkQty"
                          v-model="jsonChild.BulkQty"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                        </div>
                        <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 q-pl-sm">
                          <span style="font-size: 13px;">x {{ jsonChild.OrderLotSize }}</span>
                        </div>
                      </div>
                    </div>

                    <div class="col-xs-6 col-sm-2 col-md-1 col-lg-1 col-xl-1 four_column_left" :class="$q.screen.width>599 && $q.screen.width<1024 ? 'two_column_left' : ''">
                      <div class="row">
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
                    </div>

                    <div class="col-xs-6 col-sm-2 col-md-2 col-lg-2 col-xl-2 four_column_left two_column_left">
                      <div class="row" :class="$q.screen.width<599 ? 'dialog_separator': ''">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <Input
                          :autofocusclick="true"
                          :no_label="false"
                          label="FOC"
                          :readonly="json.BillStatus == 1 ? true : jsonChild.PriceType=='FOC'"
                          v-on:change="handleChangeQtyfoc"
                          v-model="jsonChild.Qty_foc"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right_readonly : oridbComponentBehavior.text" />
                        </div>
                      </div>
                    </div>

                    <div class="col-xs-6 col-sm-3 col-md-2 col-lg-2 col-xl-2 four_column_left">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <Input
                          :autofocusclick="true"
                          :no_label="false"
                          label="Unit Price"
                          :readonly="json.BillStatus == 1 ? true : unit ? false : true"
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
                          :readonly="json.BillStatus == 1 ? true : unit ? false : true"
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
                          :readonly="json.BillStatus == 1 ? true : unit ? false : true"
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
                          :readonly="json.BillStatus == 1 ? true : unit ? false : true"
                          v-on:change="handleChangeDisc1value"
                          v-model="jsonChild.Disc1value"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                        </div>
                      </div>
                    </div>

                    <div class="col-xs-6 col-sm-3 col-md-3 col-lg-3 col-xl-3 four_column_left two_column_left">
                      <div class="row" :class="$q.screen.width<599 ? 'dialog_separator': ''">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <Select
                          dir="rtl"
                          :readonly="json.BillStatus == 1 ? true : unit ? false : true"
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
                          :readonly="json.BillStatus == 1 ? true : unit ? false : true"
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
                          :readonly="json.BillStatus == 1 ? true : unit"
                          v-on:change="handleChangeTotalPrice"
                          v-model="jsonChild.TotalPrice"
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
                          label="Rebate Amount"
                          :readonly="true"
                          v-on:change="handleChange"
                          v-model="jsonChild.rebate_value"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right_readonly : oridbComponentBehavior.text" />
                        </div>
                      </div>
                    </div>

                    <div class="col-xs-6 col-sm-6 col-md-2 col-lg-2 col-xl-2 four_column_left">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <Input
                          :autofocusclick="true"
                          :no_label="false"
                          label="Future Price"
                          :readonly="true"
                          v-on:change="handleChange"
                          v-model="jsonChild.price_future"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right_readonly : oridbComponentBehavior.text" />
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
                          v-on:receiveClick="showSearchDialog()" :tooltip_message="'Search Item'"/>
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
                                  v-model="jsonChild.Barcode"
                                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" /> -->
                                  <Select
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
                        </div>

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
                                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
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
                          <div class="col-xs-6 col-sm-5 col-md-6 col-lg-6 col-xl-6 four_column_left">
                            <div class="row">
                              <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                                <Input
                                :autofocusclick="true"
                                :no_label="false"
                                label="Bulk Qty"
                                :readonly="json.BillStatus == 1"
                                v-on:change="handleChangeBulkQty"
                                v-model="jsonChild.BulkQty"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                              </div>
                              <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 q-pl-sm">
                                <span style="font-size: 13px;">x {{ jsonChild.OrderLotSize }}</span>
                              </div>
                            </div>
                          </div>

                          <div class="col-xs-6 col-sm-2 col-md-3 col-lg-3 col-xl-3 four_column_left" :class="$q.screen.width>599 && $q.screen.width<1024 ? 'two_column_left' : !edit_child ? 'two_column_left' : ''">
                            <div class="row">
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
                          </div>

                          <div class="col-xs-6 col-sm-2 col-md-3 col-lg-3 col-xl-3 two_column_left">
                            <div class="row" :class="$q.screen.width<599 ? 'dialog_separator': ''">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <Input
                                :autofocusclick="true"
                                :no_label="false"
                                label="FOC"
                                :readonly="json.BillStatus == 1 ? true : jsonChild.PriceType=='FOC'"
                                v-on:change="handleChangeQtyfoc"
                                v-model="jsonChild.Qty_foc"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right_readonly : oridbComponentBehavior.text" />
                              </div>
                            </div>
                          </div>

                          <div class="col-xs-6 col-sm-3 col-md-6 col-lg-6 col-xl-6 four_column_left" :class="!edit_child ? 'two_column_left': ''">
                            <div class="row dialog_separator">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <Input
                                :autofocusclick="true"
                                :no_label="false"
                                label="Unit Price"
                                :readonly="json.BillStatus == 1 ? true : unit ? false : true"
                                v-on:change="handleChangeUnitPrice"
                                v-model="jsonChild.UnitPrice"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right_readonly : oridbComponentBehavior.text" />
                              </div>
                            </div>
                          </div>

                          <div class="col-xs-8 col-sm-7 col-md-6 col-lg-6 col-xl-6">
                            <div class="row dialog_separator">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <Input
                                :autofocusclick="true"
                                :no_label="false"
                                label="Discount(+)/Surcharge(-)"
                                :readonly="json.BillStatus == 1 ? true : unit ? false : true"
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
                                :readonly="json.BillStatus == 1 ? true : unit ? false : true"
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
                                :readonly="json.BillStatus == 1 ? true : unit ? false : true"
                                v-on:change="handleChangeDisc1value"
                                v-model="jsonChild.Disc1value"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                              </div>
                            </div>
                          </div>

                          <div class="col-xs-6 col-sm-3 col-md-3 col-lg-3 col-xl-3 four_column_left two_column_left">
                            <div class="row dialog_separator" :class="$q.screen.width<599 ? 'dialog_separator': ''">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <Select
                                dir="rtl"
                                :readonly="json.BillStatus == 1 ? true : unit ? false : true"
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
                            <div class="row dialog_separator" :class="$q.screen.width<599 ? 'dialog_separator': ''">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <Input
                                :autofocusclick="true"
                                :no_label="false"
                                label="Disc2Value"
                                :readonly="json.BillStatus == 1 ? true : unit ? false : true"
                                v-on:change="handleChangeDisc2Value"
                                v-model="jsonChild.Disc2Value"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                              </div>
                            </div>
                          </div>

                          <div class="col-xs-6 col-sm-4 col-md-6 col-lg-6 col-xl-6 four_column_left two_column_left">
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
                                :readonly="json.BillStatus == 1 ? true : unit"
                                v-on:change="handleChangeTotalPrice"
                                v-model="jsonChild.TotalPrice"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                              </div>
                            </div>
                          </div>

                          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 four_column_left">
                            <div class="row dialog_separator">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <Input
                                :autofocusclick="true"
                                :no_label="false"
                                label="Rebate Amount"
                                :readonly="true"
                                v-on:change="handleChange"
                                v-model="jsonChild.rebate_value"
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
                                label="Future Price"
                                :readonly="true"
                                v-on:change="handleChange"
                                v-model="jsonChild.price_future"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right_readonly : oridbComponentBehavior.text" />
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
</template>

<script>
import Input from 'src/components/ERP/Base/Input'
import Select from 'src/components/ERP/Base/Select'
import Datepicker from 'src/components/ERP/Base/Datepicker'
import Checkbox from 'src/components/ERP/Base/Checkbox'
import SalesTable from 'src/components/ERP/Sales/SalesTable'
import Button_icon from 'src/components/ERP/Base/Button_icon'
import Radio from 'src/components/ERP/Base/Radio';
import { Notify } from "quasar";
import SelectFilter from 'src/components/ERP/Base/SelectFilter'
import ItemTable from 'src/components/ERP/Purchase/ItemTable'
import SelectPlaceholder from 'src/components/ERP/Base/SelectPlaceholder'
import Textarea from'src/components/ERP/Base/Textarea' ;
import { StreamBarcodeReader } from "vue-barcode-reader";
import SearchPopUp from 'src/components/ERP/Purchase/SearchPopUp'
export default{
  data() {
    return {
      retailer_guid: sessionStorage.getItem("retailer_guid") != "" && sessionStorage.getItem("retailer_guid") != "null" && sessionStorage.getItem("retailer_guid") != null ? sessionStorage.getItem("retailer_guid") : [],
      user_name: sessionStorage.getItem("user_name") != "" && sessionStorage.getItem("user_name") != "null" && sessionStorage.getItem("user_name") != null ? sessionStorage.getItem("user_name") : [],
      language: sessionStorage.getItem("language") != "" && sessionStorage.getItem("language") != "null" && sessionStorage.getItem("language") != null ? sessionStorage.getItem("language") : [],
      currency_sign: sessionStorage.getItem("currency_sign") != "" && sessionStorage.getItem("currency_sign") != "null" && sessionStorage.getItem("currency_sign") != null ? sessionStorage.getItem("currency_sign") : [],
      outlet_options: [],
      customer_options: [],
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
      barcode_options: [],
      customer_options2: [],
      table_column: [],
      table_data: [],
      table_column1: [],
      table_data1: [],
      item_table_column: [],
      item_table_data: [],
      sil_table_data: [],
      sil_table_column: [],
      showAddLoading: false,
      showAddLoading2: false,
      json: {
        BillStatus: 0,
        step: 1,
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
        hq_issue:0,
        b2b_registration:0,
        b2b_status:0,
        total_include_tax: '0.00'
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
      status: false,
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
      search_item: false,
      search_supplier: false,
      child_no: '',
      hv_item: false,
    }
  },
  components:{
    Input,
    Select,
    Datepicker,
    // Checkbox,
    SalesTable,
    Button_icon,
    SelectFilter,
    Radio,
    // ItemTable,
    // SelectPlaceholder,
    Textarea,
    SearchPopUp
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
        limit: 99999999,
        lamguage: this.language
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

    if(this.page_function == 'EditAdjustment')
    {
      var cpayload =
      {
        params: {
          refno: this.$route.query.refno
        }
      }


        var cdata = await this.getAdjchild(cpayload);
        var cresults = cdata.data;
        this.supplier_readonly = cresults.length > 0;

        var refno = this.$route.query.refno;

      // if(refno == undefined || refno == '')
      // {
      //   this.$router.push('/ERP/purchase/PurchaseOrder')
      //   return;
      // }

      var payload = {
        RefNo: refno,
      }

      var data = await this.getFilterPomain(payload);
      var filtered_transmain = data.response;

      filtered_transmain.rebate_amt = this.formatAmount(filtered_transmain.rebate_amt, '$');
      filtered_transmain.Total = this.formatAmount(filtered_transmain.Total, '$');
      filtered_transmain.total_include_tax = this.formatAmount(filtered_transmain.total_include_tax, '$');
      filtered_transmain.gst_tax_sum = this.formatAmount(filtered_transmain.gst_tax_sum, '$');
      filtered_transmain.SubTotal1 = this.formatAmount(filtered_transmain.SubTotal1, '$');
      filtered_transmain.pur_expiry_days = this.formatAmount(filtered_transmain.pur_expiry_days, 'qty');

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

      var filter_outlet = loc_group.filter((entry)=>{
        return entry.value == this.json.loc_group;
      })

      this.json.ChildNo = this.formatAmount(cresults.length,'qty');
      this.json.Branch = filter_outlet[0].label;
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
      handleChangeExpInDays(newVal)
      {
        this.json.pur_expiry_days = this.formatAmount(newVal, 'qty')
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
        this.json.SCode = '';
        this.json.loc_group = '';

        var refno = this.$route.query.refno;

        var payload = {
          RefNo: refno,
          user: this.user_name
        }

        var data = await this.getFilterPomain(payload);
        var filtered_transmain = data.response;

        this.json.loc_group = filtered_transmain.loc_group;
        this.json.SCode = filtered_transmain.SCode;
      },
      handleChangePriceType(newVal)
      {
        if(newVal == 'FOC')
        {
          this.jsonChild.Qty_foc = '0';
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
        var payload = {
          RefNo: this.$route.query.refno,
          language: this.language
        }

        var data = {};

        if(this.json.BillStatus==0)
        {
          await this.$store.dispatch('purchase/trigger_posting_po', payload).then(() => {
            data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_posting_po']));
          });
        }
        else if(this.json.BillStatus == 1)
        {
          await this.$store.dispatch('purchase/trigger_unposting_po', payload).then(() => {
            data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_unposting_po']));
          });
        }

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
          var Disc1value = this.unformatAmount(this.jsonChild.Disc1value);
          // console.log(this.jsonChild.Disc1value);
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
                var percentage = Number(Disc1value)/100;
                var after1Disc = UnitPrice - (UnitPrice*percentage);
              }
              else if(this.jsonChild.Disc1Type == "$")
              {
                var after1Disc = UnitPrice - Disc1value;
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
      close()
      {
        this.jsonChild = {};
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
          }

          var data = {};

          if(this.page_function == 'EditAdjustment')
          {
            payload.language = this.language;

            await this.$store.dispatch('purchase/trigger_delete_pochild', payload).then(() => {
              data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_pochild_status']));
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
      async handleRowClick(payload){
        var requests = this.item_table_data.data.results.map(async(row, index)=>{
          row.selected = false;
        });

        await Promise.all(requests);

        payload.selected = true;

        this.selected_row = payload;
      },
      async handleChild(){
        this.showAddLoading = true;

        if(this.json.BillStatus == 1)
        {
            this.showNotify("negative","This Doc already posted.");
            this.showAddLoading = false;
            return;
        }
        else
        {
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
        var BulkQty = this.unformatAmount(this.jsonChild.BulkQty);
        var UnitPrice = this.unformatAmount(this.jsonChild.UnitPrice);
        var Disc1Type = this.jsonChild.Disc1Type;
        var Disc1value = this.unformatAmount(this.jsonChild.Disc1value);
        var Disc2Type = this.jsonChild.Disc2Type;
        var Disc2Value = this.unformatAmount(this.jsonChild.Disc2Value);
        var NetUnitPrice = this.unformatAmount(this.jsonChild.NetUnitPrice);
        var DiscAmt = this.unformatAmount(this.jsonChild.DiscAmt);
        var TotalPrice = this.unformatAmount(this.jsonChild.TotalPrice);

        if(!this.edit_child)
        {
          var payload = {
            "RefNo": RefNo,
            "EntryType": EntryType,
            "PriceType": PriceType,
            "Barcode": Barcode,
            "Itemcode": Itemcode,
            "Qty": Qty,
            "BulkQty": BulkQty,
            "UnitPrice": UnitPrice,
            "Disc1Type": Disc1Type,
            "Disc1Value": Disc1value,
            "Disc2Type": Disc2Type,
            "Disc2Value": Disc2Value,
            "NetUnitPrice": NetUnitPrice,
            "DiscAmt": DiscAmt,
            "TotalPrice": TotalPrice,
            "user": this.user_name
          }

          if(PriceType == 'Norm')
          {
            payload.Qty_foc = this.unformatAmount(this.jsonChild.Qty_foc);
          }else{
            payload.Qty_foc = '0';
          }

          var data = {};

          payload.language = this.language;

          await this.$store.dispatch('purchase/trigger_create_pochild', payload).then(() => {
            data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_pochild_status']));
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
            "BulkQty": BulkQty,
            "UnitPrice": UnitPrice,
            "Disc1Type": Disc1Type,
            "Disc1Value": Disc1value,
            "Disc2Type": Disc2Type,
            "Disc2Value": Disc2Value,
            "NetUnitPrice": NetUnitPrice,
            "DiscAmt": DiscAmt,
            "TotalPrice": TotalPrice,
            "user": this.user_name
          }

          var data = {};


            if(PriceType == 'Norm')
            {
              payload.Qty_foc = this.unformatAmount(this.jsonChild.Qty_foc);
            }else{
              payload.Qty_foc = '0';
            }

            payload.Barcode = this.jsonChild.Barcode;
            payload.language = this.language;

            await this.$store.dispatch('purchase/trigger_update_adjchild', payload).then(() => {
              data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_adjchild_status']));
            });


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
            var NetUnitPrice = this.formatAmount(NetUnitPrice);
            var BulkQty = this.formatAmount(response.BulkQty,'qty');
            var Qty = this.formatAmount(response.Qty,'qty');
            var Qty_foc = this.formatAmount(response.Qty_foc,'qty');
            var Qty_foc = this.formatAmount(response.Qty_foc,'qty');
            var price_future = this.formatAmount(response.price_future,'$');
            var rebate_value = this.formatAmount(response.rebate_value,'$');

            this.jsonChild.Disc1Type = Disc1Type;
            this.jsonChild.Disc1value = Disc1Value;
            this.jsonChild.Disc2Type = Disc2Type;
            this.jsonChild.Disc2Value = Disc2Value;
            this.jsonChild.DiscAmt = DiscAmt;
            this.jsonChild.TotalPrice = TotalPrice;
            this.jsonChild.UnitPrice = UnitPrice;
            this.jsonChild.NetUnitPrice = NetUnitPrice;
            this.jsonChild.BulkQty = BulkQty;
            this.jsonChild.SetQty = Qty;
            this.jsonChild.Qty_foc = Qty_foc;
            this.jsonChild.price_future = price_future;
            this.jsonChild.rebate_value = rebate_value;

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
        this.jsonChild.Disc1value = "0.00";
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
            Qty_foc: "0",
            BulkQty: "0",
            TotalPrice: "0.00",
            OrderLotSize: 1,
          }
          this.handleChangeEntryType('Unit')

          this.showAddLoading = true;

          var itemcode = this.selected_row.Itemcode;
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

            response.Disc1value = this.formatAmount(response.Disc1value,'$');
            response.Disc2Value = this.formatAmount(response.Disc2Value,'$');
            response.UnitPrice = this.formatAmount(response.UnitPrice,'$');
            response.NetUnitPrice = parseFloat(response.NetUnitPrice).toFixed(4);
            response.NetUnitPrice = this.formatAmount(response.NetUnitPrice);
            response.TotalPrice = this.formatAmount('0.00','$');
            response.DiscAmt = this.formatAmount('0.00','$');
            response.EntryType = 'Unit';
            response.PriceType = 'Norm';
            response.Qty_foc = "0";
            response.SetQty = "0";
            response.BulkQty = '0';
            response.OrderLotSize = 1;


            this.jsonChild = response;
            this.jsonChild.SetQty = this.jsonChild.SetQty==0 ? '0' : this.jsonChild.SetQty;

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
          });

          this.search.showTable = false;
          this.jsonChild.step = 2;
          this.showAddLoading = false;
        }
        else
        {
          this.showAddLoading = true;

          // var itemcode = this.selected_row;
          this.json.SCode = this.selected_row.Code;
          this.json.SName = this.selected_row.Name;
          this.search.showTable = false;
          this.jsonChild.step = 1;
          this.showAddLoading = false;
        }
      },
      showSearchDialog(){
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
        }
      ,
      handleDelete(payload){
        this.active_delete_json = payload;
        this.delete_child = true;
      },
      async handleAction(payload){
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

          var cdata = await this.getAdjchild(cpayload);

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
          this.jsonChild.Disc1value = this.formatAmount(this.jsonChild.Disc1Value,'$');
          this.jsonChild.Disc2Value = this.formatAmount(this.jsonChild.Disc2Value,'$');
          this.jsonChild.NetUnitPrice = Number(this.jsonChild.NetUnitPrice).toFixed(4);
          this.jsonChild.NetUnitPrice = this.formatAmount(this.jsonChild.NetUnitPrice);
          this.jsonChild.TotalPrice = this.formatAmount(this.jsonChild.TotalPrice,'$');
          this.jsonChild.PackSize = this.formatAmount(this.jsonChild.PackSize,'$');
          this.jsonChild.BulkQty = this.formatAmount(this.jsonChild.BulkQty,'qty');
          this.jsonChild.rebate_value = this.formatAmount(this.jsonChild.rebate_value,'$');
          this.jsonChild.price_future = this.formatAmount(this.jsonChild.price_future,'$');
          this.jsonChild.OrderLotSize = this.formatAmount(this.jsonChild.OrderLotSize,'qty');
          this.jsonChild.SetQty = this.formatAmount(this.jsonChild.Qty,'qty');
          this.unit = this.jsonChild.EntryType=='Unit';

          this.jsonChild.step = 2;

          this.showAddLoading = false;
        // }
        // else
        // {
        //   this.$router.push({ name: 'EditAdjustmentDetails', query: { refno: payload.RefNo, line: payload.Line } })
        // }
      },
      handleChangeSCode(payload)
      {
        if(payload)
        {
          var filtered_supcus = this.all_supcus.filter((entry)=>{
            return entry.Code == payload
          })

          this.json.SName = filtered_supcus[0].Name;
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
      handleChangePODate(payload)
      {
        this.json.PODate = payload;
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
      async getFilterPomain(payload)
      {
        payload.language = this.language;

        return await this.$store.dispatch('purchase/trigger_read_po_by_refno', payload).then(() => {
          var data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_read_po_by_refno']));
          return data;
        });
      },
      async getAdjchild(payload)
      {
        return await this.$store.dispatch('adjustment/trigger_get_adjchild', payload).then(() => {
            var data = JSON.parse(JSON.stringify(this.$store.getters['adjustment/get_adjchild']));
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
      back(){
        if(this.page_function.endsWith('Adjustment'))
        {
          this.$router.push("Adjustment");
        }
        // else if(this.page_function.endsWith('GoodsReceiving'))
        // {
        //   this.$router.push("GoodsReceiving");
        // }
        // else if(this.page_function.endsWith('SalesOrder'))
        // {
        //   this.$router.push({name: 'SalesOrder'});
        // }
        // else if(this.page_function.endsWith('SalesInvoice'))
        // {
        //   this.$router.push({name: 'SalesInvoice'});
        // }
        // else if(this.page_function.endsWith('Instalment'))
        // {
        //   this.$router.push({name: 'Instalment'});
        // }
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
              {
                  name: 'TempItem',
                  required: true,
                  label: 'Tmp',
                  align: 'center',
                  sortable: true,
                  field: 'TempItem',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'Amendment',
                  required: true,
                  label: 'Amd',
                  align: 'center',
                  sortable: true,
                  field: 'Amendment',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
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
                  label: 'Item code',
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
                  label: 'Bar Code',
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
                  name: 'PackSize',
                  required: true,
                  label: 'Pack Size',
                  align: 'right',
                  sortable: true,
                  field: 'PackSize',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
              },
              {
                  name: 'rebate_value',
                  required: true,
                  label: 'Rebate Value',
                  align: 'right',
                  sortable: true,
                  field: 'rebate_value',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
              },
              {
                  name: 'Qty',
                  required: true,
                  label: 'Ord.',
                  align: 'right',
                  sortable: true,
                  field: 'Qty',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
              },
              {
                  name: 'ReceivedQty',
                  required: true,
                  label: 'Received Qty',
                  align: 'right',
                  sortable: true,
                  field: 'ReceivedQty',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
              },
              {
                  name: 'TempRecvQty',
                  required: true,
                  label: 'Tmp Rcv Qty',
                  align: 'right',
                  sortable: true,
                  field: 'TempRecvQty',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
              },
              {
                  name: 'AmendQty',
                  required: true,
                  label: 'Amend',
                  align: 'right',
                  sortable: true,
                  field: 'AmendQty',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
              },
              {
                  name: 'BalanceQty',
                  required: true,
                  label: 'Bal.',
                  align: 'right',
                  sortable: true,
                  field: 'BalanceQty',
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
                  label: 'Net Unit Price',
                  align: 'right',
                  sortable: true,
                  field: 'NetUnitPrice',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
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
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'sst',
                  required: true,
                  label: 'SST',
                  align: 'right',
                  sortable: true,
                  field: 'sst',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'sst_value',
                  required: true,
                  label: 'SST Value',
                  align: 'right',
                  sortable: true,
                  field: 'sst_value',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'sst_amt',
                  required: true,
                  label: 'SST Amt',
                  align: 'right',
                  sortable: true,
                  field: 'sst_amt',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'TotalPrice',
                  required: true,
                  label: 'Total (Exc)',
                  align: 'right',
                  sortable: true,
                  field: 'TotalPrice',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
              },
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
                  name: 'gst_tax_rate',
                  required: true,
                  label: 'GST Rate',
                  align: 'right',
                  sortable: true,
                  field: 'gst_tax_rate',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
              },
              {
                  name: 'gst_tax_amount',
                  required: true,
                  label: 'GST',
                  align: 'right',
                  sortable: true,
                  field: 'gst_tax_amount',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
              },
              {
                  name: 'TotalPrice_include_tax',
                  required: true,
                  label: 'Total (Inc)',
                  align: 'right',
                  sortable: true,
                  field: 'TotalPrice_include_tax',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
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
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'UMBulk',
                  required: true,
                  label: 'Bulk UOM',
                  align: 'left',
                  sortable: true,
                  field: 'UMBulk',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'BQty',
                  required: true,
                  label: 'BQty',
                  align: 'right',
                  sortable: true,
                  field: 'BQty',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'PQty',
                  required: true,
                  label: 'PQty',
                  align: 'right',
                  sortable: true,
                  field: 'PQty',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
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
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'stockday_min_qty',
                  required: true,
                  label: 'Min Qty',
                  align: 'right',
                  sortable: true,
                  field: 'stockday_min_qty',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
              },
              {
                  name: 'stockday_max_qty',
                  required: true,
                  label: 'Max Qty',
                  align: 'right',
                  sortable: true,
                  field: 'stockday_max_qty',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
              },
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
              {
                  name: 'AvgPESalesQty',
                  required: true,
                  label: 'Avg Qty',
                  align: 'right',
                  sortable: true,
                  field: 'AvgPESalesQty',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
              },
              {
                  name: 'LastPESalesQty',
                  required: true,
                  label: 'Period Qty',
                  align: 'right',
                  sortable: true,
                  field: 'LastPESalesQty',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
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
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'OnHandQty',
                  required: true,
                  label: 'QoH',
                  align: 'right',
                  sortable: true,
                  field: 'OnHandQty',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
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
                  headerStyle: 'text-align: center;',
                  sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
              },
              {
                  name: 'stockday_first_grn_date',
                  required: true,
                  label: 'stockday_first_grn_date',
                  align: 'left',
                  sortable: true,
                  field: 'stockday_first_grn_date',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'stockday_interval_days',
                  required: true,
                  label: 'stockday_interval_days',
                  align: 'right',
                  sortable: true,
                  field: 'stockday_interval_days',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'stockday_pos_qty_avg',
                  required: true,
                  label: 'stockday_pos_qty_avg',
                  align: 'right',
                  sortable: true,
                  field: 'stockday_pos_qty_avg',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'stockday_pos_qty_sum',
                  required: true,
                  label: 'stockday_pos_qty_sum',
                  align: 'right',
                  sortable: true,
                  field: 'stockday_pos_qty_sum',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'cost_manual',
                  required: true,
                  label: 'Manual Cost',
                  align: 'center',
                  sortable: true,
                  field: 'cost_manual',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'cost_manual_value',
                  required: true,
                  label: 'Manual Cost Value',
                  align: 'right',
                  sortable: true,
                  field: 'cost_manual_value',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
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
            payload.params.refno = this.$route.query.refno;

            var data = {};

            if(this.page_function == 'CreateAdjustment')
            {
              data = {
                  "data": []
              };
            }
            else
            {
                data = await this.getAdjchild(payload);
                var results = data.data;

                this.supplier_readonly = results.length > 0;

                for(var i in results)
                {
                  var obj = results[i];
                obj.UnitPrice = this.formatAmount(obj.UnitPrice,'$');
                obj.Disc1Value = this.formatAmount(obj.Disc1Value,'$');
                obj.Disc2Value = this.formatAmount(obj.Disc2Value,'$');
                obj.NetUnitPrice = parseFloat(obj.NetUnitPrice).toFixed(4);
                obj.NetUnitPrice = this.formatAmount(obj.NetUnitPrice);
                obj.TotalPrice = this.formatAmount(obj.TotalPrice,'$');
                obj.gst_tax_rate = this.formatAmount(obj.gst_tax_rate,'%');
                obj.TotalPrice_include_tax = this.formatAmount(obj.TotalPrice_include_tax);
                obj.GroupNo = this.formatAmount(obj.GroupNo,'qty');
                obj.Line = this.formatAmount(obj.Line,'qty');
                obj.PackSize = this.formatAmount(obj.PackSize,'qty');
                obj.rebate_value = this.formatAmount(obj.rebate_value,'$');
                obj.Qty = this.formatAmount(obj.Qty,'qty');
                obj.ReceivedQty = this.formatAmount(obj.ReceivedQty,'qty');
                obj.TempRecvQty = this.formatAmount(obj.TempRecvQty,'qty');
                obj.AmendQty = this.formatAmount(obj.AmendQty , 'qty')
                obj.BalanceQty = this.formatAmount(obj.BalanceQty , 'qty')
                obj.price_future = this.formatAmount(obj.price_future , '$')
                obj.stockday_min_qty = this.formatAmount(obj.stockday_min_qty , 'qty')
                obj.stockday_max_qty = this.formatAmount(obj.stockday_max_qty , 'qty')
                obj.AvgPESalesQty = this.formatAmount(obj.AvgPESalesQty , 'qty')
                obj.LastPESalesQty = this.formatAmount(obj.LastPESalesQty , 'qty')
                obj.OnHandQty = this.formatAmount(obj.OnHandQty , 'qty')
                obj.SellingPrice = this.formatAmount(obj.SellingPrice , '$')
                obj.cost_manual_value = this.formatAmount(obj.cost_manual_value , '$')
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
                    "count":  data.data.length,
                    "next": null,
                    "previous": null,
                    "results": data.data
                }
            };
            this.results = data.data;
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
          var supplier_code = this.json.SCode
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
        }else{
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
      async handleCreateAdj(){
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

        var currentdate = new Date();
        var current_date_format = currentdate.getFullYear()+"-"+('0' + (currentdate.getMonth()+1)).slice(-2)+"-"+('0' + currentdate.getDate()).slice(-2)
        +" "+('0' + currentdate.getHours()).slice(-2) + ":" + ('0' + currentdate.getMinutes()).slice(-2) + ":" + ('0' + currentdate.getSeconds()).slice(-2);

        if((this.json.DeliverDate+" :00:00:00:00") < current_date_format)
        {
          this.showNotify("negative","Delivery date cannot earlier than current date.")
          this.showAddLoading = false;
          return;
        }//checking for delivery date cannot smaller than current date.


        await this.saveAdj();
      },
      async saveAdj(){
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

          var SCode = this.json.SCode;
          var SName = this.json.SName;
          var PODate = this.json.PODate;
          var DeliverDate = this.json.DeliverDate;
          var Location = this.json.Location;
          var loc_group = this.json.loc_group;
          var IssueStamp = this.json.IssueStamp;
          var IssueStamp = this.json.IssueStamp;
          var Remark = this.json.Remark;
          var expiry_date = this.json.expiry_date;

          var payload = {
            "SCode":SCode,
            "SName":SName,
            "PODate":PODate,
            "DeliverDate":DeliverDate,
            "Location":Location,
            "loc_group":loc_group,
            "Remark": Remark,
            "laststamp":current_date_format,
            "IssuedBy": this.user_name,
            "expiry_date": expiry_date,
          };

          var data = {};

          if(this.page_function == 'CreateAdjustment')
          {
            payload.IssueStamp = current_date_format;
            payload.language = this.language;

            await this.$store.dispatch('adjustment/trigger_create_adj', payload).then(() => {
              data = JSON.parse(JSON.stringify(this.$store.getters['adjustment/get_adj_status']));
            });
          }
          else if(this.page_function == 'EditAdjustment')
          {
            payload.RefNo = this.json.RefNo;
            payload.IssueStamp = IssueStamp;
            payload.language = this.language;
            payload.pur_expiry_days = this.unformatAmount(this.json.pur_expiry_days);

            await this.$store.dispatch('adjustment/trigger_update_adj', payload).then(() => {
              data = JSON.parse(JSON.stringify(this.$store.getters['adjustment/get_adj_status']));
            });
          }

          var status = data.status

          if(status == "success")
          {
            this.showAddLoading = false;

            var mobile = this.$q.screen.width < 600

            if(this.page_function == 'CreateAdjustment')
            {
              this.showNotify("positive", "Created Successfully.");

              // if(mobile){
              //    this.$router.push({ name: 'AdjConfirm', query: { refno: data.response.RefNo, header: 'ADJ', type:'create' }})
              // }else{
                 this.$router.push({ name: 'EditAdjustment', query: { refno: data.response.RefNo, step: 2 }})
              // }

            }
            else if(this.page_function == 'EditAdjustment')
            {
              if(mobile)
              {
                  this.$router.push({ name: 'AdjConfirm', query: { refno: data.response.RefNo, header: 'ADJ', type:'update' }})
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

                var cdata = await this.getAdjchild(cpayload);
                var cresults = cdata.data;

                  var payload = {
                    RefNo: refno
                  }

                  var data = await this.getFilterPomain(payload);
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

                  this.json.ChildNo = this.formatAmount(cresults.length,'qty');
                  this.json.Branch = filter_outlet[0].label;
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
          Notify.create({
              type: type,
              message: message,
              timeout: 1000,
              position: 'top',
              html: true,
          })
      },
      closeSearchItem()
      {
        this.search.showTable = false;
        this.search_item = false;
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
