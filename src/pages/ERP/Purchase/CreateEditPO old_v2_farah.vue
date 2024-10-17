<template>
  <div v-if="$q.screen.width > 599" class="card_sides">
    <!-- <div class="chip-container">
          <Chip v-if="page_function == 'CreatePurchaseOrder'" :text="'Outlet'" v-on:receiveClick="handleNavigate('Outlet')" icon="fas fa-store" color="grey-6" class="bold-font chip_sty"/>
          <i v-if="page_function == 'CreatePurchaseOrder'" class="fas fa-chevron-right chip-icon"></i>
          <Chip v-if="page_function == 'CreatePurchaseOrder'" :text="$language('D0010')" v-on:receiveClick="handleNavigate('PurchaseOrder')" icon="fas fa-shopping-bag" color="grey-6" class="bold-font chip_sty"/>
          <i v-if="page_function == 'CreatePurchaseOrder'" class="fas fa-chevron-right chip-icon"></i>
          <Chip v-if="page_function == 'CreatePurchaseOrder'" :text="$language('D0027')" text-color="grey-10" class="bold-font chip_sty"/>
    </div> -->
    <q-card class="card-container" style="max-height: 100%;">
       <!-- Design 1 -->
      <!-- <q-card-section class="theme_color dialog_header header_top">
        <div class="intermediate"/>
        <div v-if="page_function == 'CreatePurchaseOrder'" class="text-subtitle1 header_text">Purchase Order</div>
        <div v-if="page_function == 'EditPurchaseOrder'" class="text-subtitle1 header_text">
          Purchase Order<br>
          <span class="text-caption">
            Refno: {{ json.RefNo }} | Supplier: {{ json.SCode }} - {{ json.SName }} | Branch: {{json.loc_group}}<br>
          </span>
        </div>
      </q-card-section> -->

<!-- Design 2 -->
      <q-card-section class="theme_color dialog_header header_top">
        <div class="intermediate"/>
        <!-- <div v-if="page_function == 'CreatePurchaseOrder'" class="text-subtitle1 header_text">{{ this.$language('D0010') }}</div>Purchase Order -->
        <!--Purchase Order-->
        <!-- <div v-if="page_function == 'EditPurchaseOrder'" class="text-subtitle1 header_text">
          {{ this.$language('D0010') }}<br>
          <div class="row">
            <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
              <span class="text-caption">   {{ this.$language('D0030') }}: {{ json.RefNo }} | {{ this.$language('D0026') }}: {{json.loc_group}} | {{ this.$language('D0025') }}: {{ json.SCode }} - {{ json.SName }} | <br></span>
            </div>
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 text-total">
              <span class="text-caption text-total text-bold" style="font-size:14px">{{ this.$language('D0145') }}: {{currency_sign}} {{json.Total}}<br></span>
            </div>
          </div> -->
          <!-- <span class="text-caption">
            {{ this.$language('D0030') }}: {{ json.RefNo }} | {{ this.$language('D0026') }}: {{json.loc_group}} | {{ this.$language('D0025') }}: {{ json.SCode }} - {{ json.SName }} | {{ this.$language('D0145') }}: {{currency_sign}} {{json.Total}}<br> -->
            <!-- Refno: {{ json.RefNo }} | Branch: {{json.loc_group}} | Supplier: {{ json.SCode }} - {{ json.SName }} | Total: RM {{json.Total}}<br>-->
          <!-- </span> -->
        <!-- </div> -->
      </q-card-section>

      <q-card-section class="upload_container">
        <q-form ref="save_form">
          <div v-if="page_function == 'EditPurchaseOrder' " class="intermediate_white"/>
          <div class="row upload_separator_first">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <q-stepper
                flat
                v-model="json.step"
                animated
                header-nav
                :class="page_function == 'EditPurchaseOrder'  ? 'sticky_stepper' : ''" 
                @update:model-value="handleChangeStepper"
                inactive-color="grey-7"
                done-color="primary"
              > <!--custom-stepper -->
                <q-step
                  class="no-scroll"
                  :name="1"
                  :title="$language('D0040')"
                  prefix="1"
                  :done="json.step > 1" 
                ><!--Header--><!-- icon="settings" -->
                  <div class="row first-dialog_separator">
<!-- Supplier Details -->
                    <div class="separator row col-12">
                      <div class="col-3 col3_left col3_leftFont">Supplier Details</div>
                      <div class="col-9">
                            <div class="row col-12">
                              <div :class="page_function == 'CreatePurchaseOrder' ? 'col-xs-11 col-sm-11 col-md-11 col-lg-11 col-xl-11 q-pr-md' : json.BillStatus == 0 && !supplier_readonly ? 'col-xs-11 col-sm-11 col-md-11 col-lg-11 col-xl-11 q-pr-md' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'">
                                 <SelectFilter
                                :readonly="json.BillStatus==1 ? true : supplier_readonly"
                                :no_label="false"
                                :label="$language('D0025')"
                                v-model:pass_value="json.SCode"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.select"
                                :options="supplier_options"
                                v-on:receiveChange="handleChangeSCode"
                                /><!--Supplier-->
                              </div>
                              <div v-if="json.BillStatus == 0 && !supplier_readonly" dir="rtl" class="col-xs-1 col-sm-1 col-md-1 col-lg-1 col-xl-1">
                                <Button_icon dir="rtl" :flat="true" :font_color="'primary'" :color="'white'" :icon="'search'" :outline="false" size="13px"
                                  v-on:receiveClick="addButtonCreatePOChild('supplier')" style="margin-top: 0px; height:100%" :tooltip_message="$language('D0146')"
                                  class="search_button search_icon_btn primary_button_font" :class="{ 'expanded': isHovered, 'clicked': isClicked }" @mouseover="isHovered = true"
                                  @mouseleave="isHovered = false" @click="handleClick"
                                /><!--Search Supplier-->
                              </div>
                            </div>
                            <div class="row" style="margin-top: 16px">
                              <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-md">
                                <SelectFilter
                                :readonly="json.BillStatus==1"
                                :no_label="false"
                                :label="$language('D0026')"
                                v-model:pass_value="json.loc_group"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.select"
                                :options="location_options"
                                v-on:receiveChange="handleChangeLocGroup"
                                /><!--Branch-->
                              </div>
                              <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-md">
                                <SelectFilter
                                :readonly="json.BillStatus==1"
                                :no_label="false"
                                :label="$language('D0051')"
                                v-model:pass_value="json.Location"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.select"
                                :options="location_options2"

                                /><!--Receiving Location-->
                              
                              </div>
                            </div>
                      </div>
                    </div>
                    <q-separator class="separator-style"></q-separator>
<!-- Order Details -->
                    <div class="separator row col-12">
                      <div class="col-3 col3_left col3_leftFont">Order Details</div>
                      <div class="col-9">
                        <div class="row">
                          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-md">
                            <Input
                            :autofocusclick="true"
                            :no_label="false"
                            :label="$language('D0030')"
                            :dense="true"
                            :readonly="true"
                            v-on:change="handleChange"
                            v-model="json.RefNo"
                            :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                          </div><!--Refno-->
                          <div :class="page_function == 'CreatePurchaseOrder' && $q.screen.width < 1024 ? 'col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-md' : 'col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-md'">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Datepicker
                              :clickableInput="true"
                              :no_label="false"
                              :label="$language('D0043')"
                              :disable="true"
                              :autoclose="true"
                              v-on:receiveChange="handleChangePODate"
                              :daterange="json.PODate"
                              :componentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text" />
                            </div><!--P/O Date-->
                          </div>
                        </div>
                        <div class="row" style="margin-top: 16px">
                          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-md">
                            <Datepicker
                              :clickableInput="true"
                              :no_label="false"
                              :label="$language('D0048')"
                              :disable="json.BillStatus==1"
                              :autoclose="true"
                              v-on:receiveChange="handleChangeDeliverDate"
                              :daterange="json.DeliverDate"
                              :componentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text" />
                          </div><!--Delivery Date-->
                          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-md">
                            <Input
                            :autofocusclick="true"
                            :no_label="false"
                            :dense="true"
                            :label="$language('D0047')"
                            :readonly="true"
                            v-on:change="handleChange"
                            v-model="json.CalDueDateby"
                            :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                          </div><!--Cal. Due Date by-->
                        </div>
                        <div class="row" style="margin-top: 16px">
                          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-md" :class="$q.screen.width > 599 && $q.screen.width < 1023 ? 'dialog_separator' : ''">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Datepicker
                              :clickableInput="true"
                              :no_label="false"
                              :label="$language('D0050')"
                              :disable="true"
                              :autoclose="true"
                              v-on:receiveChange="handleChangeExpiryDate"
                              :daterange="json.expiry_date"
                              :componentBehavior="dbComponentBehavior ? dbComponentBehavior.select : oridbComponentBehavior.text" />
                            </div><!--Expiry Date-->
                          </div>
                          <div v-if="page_function=='EditPurchaseOrder' " class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-md">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              :label="$language('D0045')"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="json.IssuedBy"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                            </div><!--Issued By-->
                          </div>
                          
                        </div>
                      </div>
                    </div>
                    <q-separator class="separator-style"></q-separator>
<!-- Inventory and Stock -->
                    <div class="separator row col-12">
                      <div class="col-3 col3_left col3_leftFont">Inventory and Stock</div>
                      <div class="col-9">
                        <div class="row">
                            <div v-if="$q.screen.width > 1023" class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-md">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              :label="$language('D0053')"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="json.stockday_min"
                              :dbComponentBehavior="dbComponentBehavior ? page_function == 'CreatePurchaseOrder' ? dbComponentBehavior.text_right_readonly : dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                            </div><!--Min Stock Days-->
                            <div v-if="$q.screen.width < 1024" class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-md">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              :label="$language('D0053')"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="json.stockday_min"
                              :dbComponentBehavior="dbComponentBehavior ? page_function == 'CreatePurchaseOrder' ? dbComponentBehavior.text_right_readonly :  dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                            </div><!--Min Stock Days-->
                            <div v-if="$q.screen.width > 1023" class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-md">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <Input
                                :autofocusclick="true"
                                :no_label="false"
                                :label="$language('D0054')"
                                :readonly="true"
                                v-on:change="handleChange"
                                v-model="json.stockday_max"
                                :dbComponentBehavior="dbComponentBehavior ? page_function == 'CreatePurchaseOrder' ? dbComponentBehavior.text_right_readonly : dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                              </div><!--Max Stock Days-->
                            </div>
                            <div v-if="$q.screen.width < 1024" class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-md">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <Input
                                :autofocusclick="true"
                                :no_label="false"
                                :label="$language('D0054')"
                                :readonly="true"
                                v-on:change="handleChange"
                                v-model="json.stockday_max"
                                :dbComponentBehavior="dbComponentBehavior ? page_function == 'CreatePurchaseOrder' ? dbComponentBehavior.text_right_readonly : dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                              </div><!--Max Stock Days-->
                            </div>
                        </div>
                        <div class="row" style="margin-top: 16px">
                          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-md">
                            <Input
                            :autofocusclick="true"
                            :no_label="false"
                            :label="$language('D0049')"
                            :readonly="json.BillStatus==1 ? true : page_function == 'CreatePurchaseOrder'"
                            v-on:change="handleChangeExpInDays"
                            v-model="json.pur_expiry_days"
                            :dbComponentBehavior="dbComponentBehavior ? page_function == 'CreatePurchaseOrder' ? dbComponentBehavior.text_right_readonly :  dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                          </div><!--Exp in Days-->
                          
                        </div>
                      </div>
                    </div>
                    <q-separator class="separator-style"></q-separator>
<!-- terms and tax -->
                    <div class="separator row col-12">
                      <div class="col-3 col3_left col3_leftFont">Terms and Tax</div>
                      <div class="col-9">
                        <div class="row">
                          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-md">
                            <Input
                            :autofocusclick="true"
                            :no_label="false"
                            :label="$language('D0046')"
                            :readonly="true"
                            v-on:change="handleChange"
                            v-model="json.STerm"
                            :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                          </div><!--Term (Days)-->
                          <div v-if="page_function=='EditPurchaseOrder' " class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-md">
                            <div :class="$q.screen.width<1024 ? 'dialog_separator': ''">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <Input
                                :autofocusclick="true"
                                :no_label="false"
                                :label="$language('D0052')"
                                :readonly="true"
                                v-on:change="handleChange"
                                v-model="json.tax_code_purchase"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                              </div><!--Tax Code-->
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <q-separator class="separator-style"></q-separator>
<!-- REMARKS -->
                    <div class="separator row col-12">
                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <Textarea class="ignore_height" :no_label="false" :readonly="json.BillStatus==1" v-on:receiveChange="handleChange" v-model="json.Remark"
                        :dbComponentBehavior="dbComponentBehavior.remark" :pass_label="$language('D0055')" />
                      </div><!--Remark-->
                      </div>
                  </div>
                    
<!-- not used -->
                      <!-- <div class="row dialog_separator"> -->
                        <!-- <div class="input_wrapper_right" :class="json.BillStatus == 0 && !supplier_readonly ? 'col-xs-4 col-sm-5 col-md-7 col-lg-7 col-xl-7' : 'col-xs-4 col-sm-6 col-md-8 col-lg-8 col-xl-8'">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <SelectFilter
                              :readonly="json.BillStatus==1 ? true : supplier_readonly"
                              :no_label="false"
                              :label="'Name'"
                              v-model:pass_value="json.SCode"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.select"
                              :options="supplier_options2"
                              v-on:receiveChange="handleChange"
                              />
                            </div>
                          </div>
                        </div> -->
                      <!-- </div> -->                  
                      <!-- <div class="row dialog_separator"> -->
                        <!-- <div v-if="page_function=='EditPurchaseOrder'" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
                          <div class="row ">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <div class="row ">
                                <div class="col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                                  <Input
                                  :autofocusclick="true"
                                  :no_label="false"
                                  :label="$language('D0067')"
                                  :readonly="true"
                                  v-on:change="handleChange"
                                  v-model="json.SubTotal1"
                                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />

                                </div>
                                <div class="col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                                  <Input
                                  :autofocusclick="true"
                                  :no_label="false"
                                  :label="$language('D0068')"
                                  :readonly="true"
                                  v-on:change="handleChange"
                                  v-model="json.rebate_amt"
                                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />

                                </div>

                              </div>
                          </div>
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
                              <div class="row ">
                                <div class="col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                                  <Input
                                    :autofocusclick="true"
                                    :no_label="false"
                                    :label="$language('D0069')"
                                    :readonly="true"
                                    v-on:change="handleChange"
                                    v-model="json.Total"
                                    :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />

                                </div>
                                <div class="col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                                  <Input
                                    :autofocusclick="true"
                                    :no_label="false"
                                    :label="$language('D0070')"
                                    :readonly="true"
                                    v-on:change="handleChange"
                                    v-model="json.gst_tax_sum"
                                    :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />

                                </div>
                                <div class="col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                                  <Input
                                  :autofocusclick="true"
                                  :no_label="false"
                                  :label="$language('D0071')"
                                  :readonly="true"
                                  v-on:change="handleChange"
                                  v-model="json.total_include_tax"
                                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />

                                </div>

                              </div>
                          </div>
                          </div>
                        </div> --> 
                      <!-- </div> -->
<!-- not used -->                    

<!-- checkbox bottom -->
                    <div v-if="$q.screen.width > 599 && $q.screen.width < 1024" class="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
                      <div v-if="page_function == 'CreatePurchaseOrder'">
                        <!-- <div class="row col-12 q-gutter-y-md"> -->
                          <div class="column" style="height: 100px">
                          <div class="col-6 col-md-6">
                            <Checkbox :btm_padding="true" size="md" :disable="json.BillStatus == 1" v-model="json.in_kind" :true-value="1" :false-value="0"/>
                              <span class="checkbox_InterfontMedium">{{ $language('D0056') }}</span><!--In-kind-->
                          </div>
                          <div class="col-6 col-md-6 justify-content-between">
                            <Checkbox size="md" :disable="json.BillStatus == 1" v-model="json.tax_inclusive" :true-value="1" :false-value="0" />
                            <span class="checkbox_InterfontMedium">{{ $language('D0147') }}</span><!--Tax Inclusive-->
                          </div>
                          <div class="col-6 col-md-6">
                            <Checkbox size="md" :disable="true" v-model="json.hq_issue" :true-value="1" :false-value="0" />
                            <span class="checkbox_InterfontMedium_disabled">{{ $language('D0059') }}</span><!--Issued by HQ-->
                          </div>
                          <div class="col-6 col-md-6">
                             <Checkbox size="md" :disable="true" v-model="json.b2b_registration" :true-value="1" :false-value="0" />
                              <span class="checkbox_InterfontMedium_disabled">{{ $language('D0064') }}</span><!--B2B-->
                          </div>
                          
                          <div class="col-12 col-md-12 q-pl-sm" style="width:200px">
                            <div class="col-xs-7 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                              <span class="checkbox_InterfontMedium_disabled">{{ $language('D0065') }}</span><!--B2B Status-->
                            </div>
                            <div class="col-xs-5 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                <Input
                                :autofocusclick="true"
                                :no_label="true"
                                :readonly="true"
                                :disable="true"
                                v-on:change="handleChange"
                                v-model="json.b2b_status"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" 
                                />
                            </div>
                          </div>                          
                          
                        </div>
                      <!-- </div> -->
                      </div>
<!-- edit purchase all checkbox -->
                      <div v-if="page_function == 'EditPurchaseOrder'" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">                
                        <!-- <div class="col-12 q-pa-none"> -->
                          <div class="column" style="height:200px;align-content:space-between">
                  <!-- first row -->
                            <div class="col-4 col-md-4 edit-checkbox">
                              <Checkbox :class="[json.in_kind === 1 ? 'custom_truthcheckbox' : 'custom_checkbox_disabl']" :btm_padding="true" size="md" :disable="json.BillStatus == 1" v-model="json.in_kind" :true-value="1" :false-value="0" />
                              <span class="edit_checkbox">{{ $language('D0056') }}</span><!--In-kind-->
                            </div>
                            <div class="col-4 col-md-4  edit-checkbox">
                              <Checkbox :class="[json.tax_inclusive === 1 ? 'custom_truthcheckbox' : 'custom_checkbox_disabl']" :btm_padding="true" size="md" :disable="json.BillStatus == 1" v-model="json.tax_inclusive" :true-value="1" :false-value="0" />
                              <span class="edit_checkbox">{{ $language('D0147') }}</span><!--Tax Inclusive-->
                            </div>
                              <!-- <div v-if="page_function == 'EditPurchaseOrder'" class="col-xs-6 col-sm-6 col-md-12 col-lg-12 col-xl-12 input_wrapper_right"> -->
                            <div class="col-4 col-md-4 edit-checkbox">
                                <Checkbox :class="[json.AutoClosePO === 1 ? 'custom_truthcheckbox' : 'custom_checkbox_disabl']" :btm_padding="true" size="md" :disable="true" v-model="json.AutoClosePO" :true-value="1" :false-value="0" />
                                <span class="edit_checkbox">{{ $language('D0061') }}</span><!--Auto Close PO-->
                            </div>
                            <!-- <div v-if="page_function == 'EditPurchaseOrder'" class="col-xs-6 col-sm-6 col-md-12 col-lg-12 col-xl-12 input_wrapper_right"> -->
                  <!-- second row -->
                            <!-- <div v-if="page_function == 'EditPurchaseOrder'" class="col-xs-6 col-sm-6 col-md-12 col-lg-12 col-xl-12 input_wrapper_right"> -->
                        
                            <div class="col-4 col-md-4 edit-checkbox">
                              <Checkbox :class="[json.Completed === 1 ? 'custom_truthcheckbox' : 'custom_checkbox_disabl']" :btm_padding="true" size="md" :disable="true" v-model="json.Completed" :true-value="1" :false-value="0" />
                              <span class="edit_checkbox">{{ $language('D0063') }}</span><!--Completed-->
                            </div>
                            <!-- <div v-if="page_function == 'EditPurchaseOrder'" class="col-xs-6 col-sm-6 col-md-12 col-lg-12 col-xl-12 input_wrapper_right"> -->
                            
                            <div class="col-4 col-md-4 edit-checkbox">
                              <Checkbox :class="[json.BillStatus === 1 ? 'custom_truthcheckbox' : 'custom_checkbox_disabl']" :btm_padding="true" size="md" :disable="true" v-model="json.BillStatus" :true-value="1" :false-value="0" />
                              <span class="edit_checkbox">{{ $language('D0057') }}</span><!--Posted-->
                            </div>
                            <!-- </div> -->
                            <div class="col-4 col-md-4 edit-checkbox">
                              <Checkbox :class="[json.uploaded === 1 ? 'custom_truthcheckbox' : 'custom_checkbox_disabl']" :btm_padding="true" size="md" :disable="true" v-model="json.uploaded" :true-value="1" :false-value="0" />
                              <span class="edit_checkbox">{{ $language('D0060') }}</span><!--Uploaded-->
                            </div>
                            
                          <!-- </div> -->
                  <!-- third row -->
                          <!-- <div v-if="page_function == 'EditPurchaseOrder'" class="col-xs-6 col-sm-6 col-md-12 col-lg-12 col-xl-12 input_wrapper_right"> -->
                            <div class="col-4 col-md-4 edit-checkbox">
                              <Checkbox :class="[json.hq_issue === 1 ? 'custom_truthcheckbox' : 'custom_checkbox_disabl']" :btm_padding="true" size="md" :disable="true" v-model="json.hq_issue" :true-value="1" :false-value="0" />
                              <span class="edit_checkbox">{{ $language('D0059') }}</span><!--Issued by HQ-->
                            </div>
                          <!-- </div> -->
                          <!-- <div v-if="page_function == 'EditPurchaseOrder'" class="col-xs-6 col-sm-6 col-md-12 col-lg-12 col-xl-12 input_wrapper_right"> -->
                            <div class="col-4 col-md-4 edit-checkbox">
                              <Checkbox :class="[json.Amendment === 1 ? 'custom_truthcheckbox' : 'custom_checkbox_disabl']" :btm_padding="true" size="md" :disable="true" v-model="json.Amendment" :true-value="1" :false-value="0" />
                              <span class="edit_checkbox">{{ $language('D0062') }}</span><!--Amended-->
                            </div>
                            <!-- </div> -->
                            <!-- <div v-if="page_function == 'EditPurchaseOrder'" class="col-xs-6 col-sm-6 col-md-12 col-lg-12 col-xl-12 input_wrapper_right"> -->
                            <div class="col-4 col-md-4 edit-checkbox">
                            <Checkbox :class="[json.cancel === 1 ? 'custom_truthcheckbox' : 'custom_checkbox_disabl']" :btm_padding="true" size="md" :disable="true" v-model="json.cancel" :true-value="1" :false-value="0" />
                            <span class="edit_checkbox">{{ $language('D0058') }}</span><!--Cancelled-->
                            </div>
                            <div class="col-4 col-md-4 edit-checkbox">
                              <Checkbox :class="[json.b2b_registration === 1 ? 'custom_truthcheckbox' : 'custom_checkbox_disabl']" :btm_padding="true" size="md" :disable="true" v-model="json.b2b_registration" :true-value="1" :false-value="0" />
                              <span class="edit_checkbox">{{ $language('D0064') }}</span><!--B2B-->
                            </div>
                            <div class="col-8 col-md-4 q-pl-sm">
                              <div class="col-xs-7 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                <span class="edit_checkbox">{{ $language('D0065') }}</span><!--B2B Status-->
                              <!-- </div> -->
                              <div class="col-xs-5 col-sm-6 col-md-6 col-lg-6 col-xl-6" >
                                  <Input
                                  class="b2b-padding"
                                  :autofocusclick="true"
                                  :no_label="true"
                                  :readonly="true"
                                  v-on:change="handleChange"
                                  v-model="json.b2b_status"
                                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" /> 
                              </div>
                            </div>
                          </div>
                          </div>
                        <!-- </div> -->
                        
                      </div>
                    </div>
                    <div v-if="$q.screen.width > 1023" class="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3"> <!--v -else -->
                      <div v-if="page_function == 'CreatePurchaseOrder'">
                        <!-- <div class="row col-12 q-gutter-y-md"> -->
                          <div class="column" style="height: 150px">
                          <div class="col-6 col-md-4">
                            <Checkbox :class="[json.in_kind === 1 ? 'custom_truthcheckbox' : 'custom_checkbox_disabl']" :btm_padding="true" size="md" :disable="json.BillStatus == 1" v-model="json.in_kind" :true-value="1" :false-value="0"/>
                              <span class="checkbox_InterfontMedium">{{ $language('D0056') }}</span><!--In-kind-->
                          </div>
                          <div class="col-6 col-md-4 justify-content-between">
                            <Checkbox :class="[json.tax_inclusive === 1 ? 'custom_truthcheckbox' : 'custom_checkbox_disabl']" size="md" :disable="json.BillStatus == 1" v-model="json.tax_inclusive" :true-value="1" :false-value="0" />
                            <span class="checkbox_InterfontMedium">{{ $language('D0147') }}</span><!--Tax Inclusive-->
                          </div>
                          <div class="col-6 col-md-4">
                            <Checkbox :class="[json.hq_issue === 1 ? 'custom_truthcheckbox' : 'custom_checkbox_disabl']" size="md" :disable="true" v-model="json.hq_issue" :true-value="1" :false-value="0" />
                            <span class="checkbox_InterfontMedium_disabled">{{ $language('D0059') }}</span><!--Issued by HQ-->
                          </div>
                          <div class="col-6 col-md-4">
                             <Checkbox :class="[json.b2b_registration === 1 ? 'custom_truthcheckbox' : 'custom_checkbox_disabl']" size="md" :disable="true" v-model="json.b2b_registration" :true-value="1" :false-value="0" />
                              <span class="checkbox_InterfontMedium_disabled">{{ $language('D0064') }}</span><!--B2B-->
                          </div>
                          
                          <div class="col-6 col-md-8 q-pl-sm" style="width:300px">
                            <div class="col-xs-7 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                              <span class="checkbox_InterfontMedium_disabled">{{ $language('D0065') }}</span><!--B2B Status-->
                            </div>
                            <div class="col-xs-5 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                <Input
                                :autofocusclick="true"
                                :no_label="true"
                                :readonly="true"
                                :disable="true"
                                v-on:change="handleChange"
                                v-model="json.b2b_status"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" 
                                />
                            </div>
                          </div>                          
                          
                        </div>
                      <!-- </div> -->
                      </div>
<!-- edit purchase all checkbox -->
                      <div v-if="page_function == 'EditPurchaseOrder'" class="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">                
                        <!-- <div class="col-12 q-pa-none"> -->
                          <div class="column" style="height:200px;align-content: space-between">
                  <!-- first row -->
                            <div class="col-4 col-md-4 edit-checkbox">
                              <Checkbox :class="[json.in_kind === 1 ? 'custom_truthcheckbox' : 'custom_checkbox_disabl']" :btm_padding="true" size="md" :disable="json.BillStatus == 1" v-model="json.in_kind" :true-value="1" :false-value="0" />
                              <span class="edit_checkbox">{{ $language('D0056') }}</span><!--In-kind-->
                            </div>
                            <div class="col-4 col-md-4  edit-checkbox">
                              <Checkbox :class="[json.tax_inclusive === 1 ? 'custom_truthcheckbox' : 'custom_checkbox_disabl']" :btm_padding="true" size="md" :disable="json.BillStatus == 1" v-model="json.tax_inclusive" :true-value="1" :false-value="0" />
                              <span class="edit_checkbox">{{ $language('D0147') }}</span><!--Tax Inclusive-->
                            </div>
                              <!-- <div v-if="page_function == 'EditPurchaseOrder'" class="col-xs-6 col-sm-6 col-md-12 col-lg-12 col-xl-12 input_wrapper_right"> -->
                            <div class="col-4 col-md-4 edit-checkbox">
                                <Checkbox :class="[json.AutoClosePO === 1 ? 'custom_truthcheckbox' : 'custom_checkbox_disabl']" :btm_padding="true" size="md" :disable="true" v-model="json.AutoClosePO" :true-value="1" :false-value="0" />
                                <span class="edit_checkbox">{{ $language('D0061') }}</span><!--Auto Close PO-->
                            </div>
                            <!-- <div v-if="page_function == 'EditPurchaseOrder'" class="col-xs-6 col-sm-6 col-md-12 col-lg-12 col-xl-12 input_wrapper_right"> -->
                            
                  <!-- second row -->
                            <!-- <div v-if="page_function == 'EditPurchaseOrder'" class="col-xs-6 col-sm-6 col-md-12 col-lg-12 col-xl-12 input_wrapper_right"> -->
                            
                            <div class="col-4 col-md-4 edit-checkbox">
                              <Checkbox :class="[json.Completed === 1 ? 'custom_truthcheckbox' : 'custom_checkbox_disabl']" :btm_padding="true" size="md" :disable="true" v-model="json.Completed" :true-value="1" :false-value="0" />
                              <span class="edit_checkbox">{{ $language('D0063') }}</span><!--Completed-->
                            </div>
                            <!-- <div v-if="page_function == 'EditPurchaseOrder'" class="col-xs-6 col-sm-6 col-md-12 col-lg-12 col-xl-12 input_wrapper_right"> -->
                            
                            <div class="col-4 col-md-4 edit-checkbox">
                              <Checkbox :class="[json.BillStatus === 1 ? 'custom_truthcheckbox' : 'custom_checkbox_disabl']" :btm_padding="true" size="md" :disable="true" v-model="json.BillStatus" :true-value="1" :false-value="0" />
                              <span class="edit_checkbox">{{ $language('D0057') }}</span><!--Posted-->
                            </div>
                            <!-- </div> -->
                            <div class="col-4 col-md-4 edit-checkbox">
                              <Checkbox :class="[json.uploaded === 1 ? 'custom_truthcheckbox' : 'custom_checkbox_disabl']" :btm_padding="true" size="md" :disable="true" v-model="json.uploaded" :true-value="1" :false-value="0" />
                              <span class="edit_checkbox">{{ $language('D0060') }}</span><!--Uploaded-->
                            </div>
                            
                          <!-- </div> -->
                  <!-- third row -->
                          <!-- <div v-if="page_function == 'EditPurchaseOrder'" class="col-xs-6 col-sm-6 col-md-12 col-lg-12 col-xl-12 input_wrapper_right"> -->
                            <div class="col-4 col-md-4 edit-checkbox">
                              <Checkbox :class="[json.hq_issue === 1 ? 'custom_truthcheckbox' : 'custom_checkbox_disabl']" :btm_padding="true" size="md" :disable="true" v-model="json.hq_issue" :true-value="1" :false-value="0" />
                              <span class="edit_checkbox">{{ $language('D0059') }}</span><!--Issued by HQ-->
                            </div>
                          <!-- </div> -->
                          <!-- <div v-if="page_function == 'EditPurchaseOrder'" class="col-xs-6 col-sm-6 col-md-12 col-lg-12 col-xl-12 input_wrapper_right"> -->
                            <div class="col-4 col-md-4 edit-checkbox">
                              <Checkbox :class="[json.Amendment === 1 ? 'custom_truthcheckbox' : 'custom_checkbox_disabl']" :btm_padding="true" size="md" :disable="true" v-model="json.Amendment" :true-value="1" :false-value="0" />
                              <span class="edit_checkbox">{{ $language('D0062') }}</span><!--Amended-->
                            </div>
                            <!-- </div> -->
                            <!-- <div v-if="page_function == 'EditPurchaseOrder'" class="col-xs-6 col-sm-6 col-md-12 col-lg-12 col-xl-12 input_wrapper_right"> -->
                            <div class="col-4 col-md-4 edit-checkbox">
                            <Checkbox :class="[json.cancel === 1 ? 'custom_truthcheckbox' : 'custom_checkbox_disabl']" :btm_padding="true" size="md" :disable="true" v-model="json.cancel" :true-value="1" :false-value="0" />
                            <span class="edit_checkbox">{{ $language('D0058') }}</span><!--Cancelled-->
                            </div>
                            <div class="col-4 col-md-4 edit-checkbox">
                              <Checkbox :class="[json.b2b_registration === 1 ? 'custom_truthcheckbox' : 'custom_checkbox_disabl']" :btm_padding="true" size="md" :disable="true" v-model="json.b2b_registration" :true-value="1" :false-value="0" />
                              <span class="edit_checkbox">{{ $language('D0064') }}</span><!--B2B-->
                            </div>
                            <div class="col-4 col-md-8 q-pl-sm" style="width:300px">
                              <span class="edit_checkbox">{{ $language('D0065') }}</span><!--B2B Status-->
                                <Input
                                class="b2b-padding"
                                :autofocusclick="true"
                                :no_label="true"
                                :readonly="true"
                                v-on:change="handleChange"
                                v-model="json.b2b_status"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" /> 
                            </div>
                          </div>
                        <!-- </div> -->
                        
                      </div>
                    </div>
                
                </q-step>

                <q-step
                  v-if="page_function == 'EditPurchaseOrder'"
                  :name="2"
                  prefix="2"
                  :title="$language('D0041')"
                  icon="create_new_folder"
                  :done="json.step > 2"
                ><!--Detail-->
                  <div class="row">
                      <div class=" col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"><!--card_section_two-->
                          <PurchaseTable
                          class="step2_table"
                          hide_footer
                          :group_button="group_button"
                          :select_all="select_all"
                          :readonly_button="false"
                          :row_per_page="[0]"
                          :top_button="page_function=='EditPurchaseOrder' && json.BillStatus == 0"
                          :top_button_dropdown="page_function=='EditPurchaseOrder' && json.BillStatus == 0"
                          v-on:main_supplier_item_list="supplierItemlist()"
                          v-on:add_button="addButtonCreatePOChild('item')"
                          v-on:receiveChangeSelectAll="handleChangeSelectAll"
                          v-on:receiveChangeCheckbox="handleChangeCheckbox"
                          v-on:receiveChangeGroup="handleChangeGroup"
                          v-on:receiveChangeUngroup="handleChangeUngroup"
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
                          <!-- :forceLoading="loadingTable" -->
                      </div>
                  </div>
                </q-step>

                <q-step
                  v-if="page_function == 'EditPurchaseOrder'"
                  :name="3"
                  prefix="3"
                  :title="'Amount'"
                  icon="create_new_folder"
                  :done="json.step > 3"
                ><!--Surcharge/Discount-->
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

                  <div v-if="page_function=='EditPurchaseOrder'" class="row col-12" style="padding-top:16px"> <!--step3-->
                    <div class="row col-12" style="gap:16px"> 
                          <div class="row col-12">
                          <div class="col q-pr-md">
                          <Input
                          class="amount_custom"
                          :autofocusclick="true"
                          :no_label="false"
                          :label="$language('D0067')"
                          :readonly="true"
                          v-on:change="handleChange"
                          v-model="json.SubTotal1"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                          </div><!--GROSS-->
                        <div class="col q-pl-md">
                          <Input
                          class="amount_custom"
                          :autofocusclick="true"
                          :no_label="false"
                          :label="$language('D0068')"
                          :readonly="true"
                          v-on:change="handleChange"
                          v-model="json.rebate_amt"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                        </div><!--REBATE-->
                          </div>
                          <div class="row col-12">
                          <div class="col q-pr-md">
                          <Input
                          class="amount_custom"
                          :autofocusclick="true"
                          :no_label="false"
                          :label="$language('D0069')"
                          :readonly="true"
                          v-on:change="handleChange"
                          v-model="json.Total"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                        </div><!--Total (Exc)-->
                        <div class="col q-pl-md">
                          <Input
                          class="amount_custom"
                          :autofocusclick="true"
                          :no_label="false"
                          :label="$language('D0070')"
                          :readonly="true"
                          v-on:change="handleChange"
                          v-model="json.gst_tax_sum"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                        </div><!--Tax--></div>
                        <div class="row col-12">
                        <div class="col-6 q-pr-md">
                          <Input
                          class="amount_custom"
                          :autofocusclick="true"
                          :no_label="false"
                          :label="$language('D0071')"
                          :readonly="true"
                          v-on:change="handleChange"
                          v-model="json.total_include_tax"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                        </div><!--Total (Inc)-->
                        <div class="col"></div>
                        </div>
                    </div>
                  </div>
                  
                </q-step>

                <q-step
                  v-if="page_function == 'EditPurchaseOrder'"
                  :name="4"
                  prefix="4"
                  :title="$language('D0042')"
                  icon="create_new_folder"
                  :done="json.step > 4"
                >
                    <!-- <div class="row col-12"> -->
                      <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                        <SurchargeTable
                            hide_footer
                            :title_section = "'PO'"
                            :gross_amount="json.SubTotal1"
                            :nett_amount="json.Total"
                            :table_footer = "surcharge_table_footer"
                            :readonly_button="false"
                            :optionsFn="td_options"
                            :optionsCode="codeOptions"
                            :disableTdCheckbox='json.BillStatus != 0'
                            :disableTdClick="json.BillStatus != 0"
                            :add_button="true"
                            :top_button="false"
                            v-on:receiveAdd="showDialogAddSurcharge"
                            v-on:main_delete="showDeleteSurchargeLineConfirmDialog"
                            :title="table_title"
                            :edit_button= "true"
                            :totalDisc = "totalDisc"
                            :table_data="surcharge_table_data"
                            :table_column="surcharge_table_column"
                            :delete_button="json.BillStatus == 0"
                            :flat_status="true"
                            :bordered_status="true"
                            v-on:main_edit="showDialogEditSurcharge"
                            v-on:receiveChangeCheckbox="handleChangeSurchargeTableCheckbox"
                            v-on:receiveSave="handleChangeValueInput"
                            v-on:receiveTotalCalculatedValue="handleChangeSurchargeSubTotalValue"
                            v-on:receiveChangeCodeSelect="handleChangetdCodeSelect"
                            :forceLoading="forceLoading"
                            />
                      </div>
                    <!-- </div> -->
                </q-step>
              </q-stepper>
            </div>
          </div>
        </q-form>
      </q-card-section>

      

      <q-inner-loading
        style="z-index:4;"
        :showing="showAddLoading"
        color="primary"
      />

    </q-card>
    <q-card-actions class="dialog_action justify-between" style="padding-top:24px">
        <div v-if="this.json.step == 1">
          <!--D0020 SAVE -->
          <!-- <Button_icon v-if="page_function == 'CreatePurchaseOrder'" :flat="true" :font_color="'white'" :color="'#094161'" :text="$language('D0020')" :outline="false" size="15px"
              v-on:receiveClick="handleCreatePO"/> -->
          <span v-if="json.BillStatus == 0 " class="q-pl-xs">
          <!--D0022 Back :text="$language('D0022')"-->    
              <Button_icon v-if="page_function == 'CreatePurchaseOrder'" :flat="true" :font_color="'#29292A'" :icon="'chevron_left'" :color="'white'" :outline="true" size="14px" class="primary_navigation_button primary_button_font" @click="back()" />
          </span>
          <!-- D0021 NEXT :text="$language('D0021')"-->
          <span v-if="page_function == 'EditPurchaseOrder'" class="q-pl-xs">
            <Button_icon v-if="page_function=='EditPurchaseOrder'" :flat="true" :font_color="'#29292A'" :icon-right="'chevron_right'" :color="'white'" :outline="true" size="14px"
            @click="json.step = 2" class="primary_navigation_button primary_button_font"/>
          </span>
        </div>
        <div v-if="this.json.step == 2">
          <Button_icon :flat="true" :font_color="'#29292A'" :icon="'chevron_left'" :color="'white'"  :outline="true" size="14px"
          @click="json.step = 1" class="primary_navigation_button primary_button_font"/>

          <!-- <Button_icon :flat="false" :font_color="'black'" :color="'white'" :text="'PREVIOUS'" :outline="true" size="15px"
          @click="json.step = 1"/> -->

          <span class="q-pl-md"><!--:text="$language('D0021')" -->
            <Button_icon :flat="true" :font_color="'#29292A'" :icon-right="'chevron_right'" :color="'white'"  :outline="true" size="14px"
            @click="json.step = 3"  class="primary_navigation_button"/>

            <!-- <Button_icon :flat="false" :font_color="'black'" :color="'white'" :text="'NEXT'" :outline="true" size="15px"
            @click="json.step = 3"/> -->
          </span>
        </div >

        <div v-if="this.json.step == 3">
          <!-- <Button_icon v-if="json.BillStatus == 0" :flat="true" :font_color="'white'" :color="'#094161'" :text="$language('D0020')" :outline="false" size="15px"
          v-on:receiveClick="handleCreatePO"/> -->

          <!-- <Button_icon v-if="json.BillStatus == 0" :flat="true" :font_color="'white'" :color="'#094161'" :text="'SAVE'" :outline="false" size="15px"
          v-on:receiveClick="handleCreatePO"/> -->

          <span class="q-pl-xs"> <!--:text="$language('D0022')" -->
            <Button_icon :flat="true"  :font_color="'#29292A'" :icon="'chevron_left'" :color="'white'"  :outline="true" size="14px"
            @click="json.step = 2" class="primary_navigation_button primary_button_font"/>

            <!-- <Button_icon :flat="false" :font_color="'black'" :color="'white'" :text="'PREVIOUS'" :outline="true" size="15px"
            @click="json.step = 2"/> -->
          </span>
        </div >
        <div v-if="this.json.step == 4"><!--:text="$language('D0022')" -->
          <Button_icon :flat="true" :font_color="'#29292A'" :icon="'chevron_left'" :color="'white'"  :outline="true" size="14px" class="primary_navigation_button primary_button_font" @click="back()" />

        </div>
<!-- RIGHT SIDE -->
<!-- BACK -->
          <!-- <Button_icon v-if="page_function == 'CreatePurchaseOrder'" :flat="true" :font_color="'black'" :color="'white'" :text="$language('D0022')" :outline="true" size="15px" class="custom_cancel_button" @click="back()" /> -->
          <!-- <Button_icon v-if="page_function == 'EditPurchaseOrder'" :flat="true" :icon="'chevron_left'" :font_color="'#1E90FF'" :color="'white'" :text="$language('D0022')" :outline="true" size="14px" class="custom_cancel_button" @click="back()" /> -->
          <!-- <Button_icon :flat="true" :font_color="'black'" :color="'white'" :text="'BACK'" :outline="true" size="15px" class="custom_cancel_button" @click="back()" /> -->
<!-- D0019 POST -->
          
<!-- PRINT -->
            <span v-if="page_function == 'EditPurchaseOrder'" class="q-gutter-x-md">
              <!-- print -->
              <!-- <Button_icon v-if="page_function == 'EditPurchaseOrder' && this.json.step == 1" :flat="false" :icon="'img:icons/print.svg'" :font_color="'#1E90FF'" :color="'white'" :outline="true" size="16px"
              v-on:receiveClick="handlePrint" class="print_actions_button" /> -->
              <!-- post -->
            <Button_icon v-if="page_function == 'EditPurchaseOrder' && this.json.step == 1" :flat="true" :text="json.BillStatus==1 ? $language('D0148') : $language('D0019')" :outline="false" size="16px"
            v-on:receiveClick="confirmPost" :class="json.BillStatus === 1 ? 'primary_actions_button' : 'secondary_actions_button'"/>
            <!-- save -->
            <Button_icon v-if="json.BillStatus == 0 && (this.json.step == 1 || this.json.step == 3)" :flat="true" :font_color="'white'" :color="'#1E90FF'" :text="$language('D0020')" :outline="false" size="16px"
            v-on:receiveClick="handleCreatePO" class="primary_actions_button"/>
          </span>
<!-- SAVE -->
          <Button_icon v-if="page_function == 'CreatePurchaseOrder'" :flat="true" :font_color="'white'" :color="'#1E90FF'" :text="$language('D0020')" :outline="false" size="16px"
              v-on:receiveClick="handleCreatePO" class="primary_actions_button"/>
          
      </q-card-actions>
  </div>

  <div v-else class="card_sides">
    <div class="row col-12 justify-between q-pb-md">
    <div :class="page_function == 'CreatePurchaseOrder' ? 'chip-container_2' : 'chip-container_1'">
          <!-- <Chip v-if="page_function == 'CreatePurchaseOrder'" :text="'Outlet'" v-on:receiveClick="handleNavigate('Outlet')" icon='img:icons/outlet.svg' color="grey-6" class="bold-font chip_sty"/>
          <i v-if="page_function == 'CreatePurchaseOrder'" class="fas fa-chevron-right chip-icon"></i> -->
          <!-- <Chip v-if="page_function == 'CreatePurchaseOrder'" :text="$language('D0010')" v-on:receiveClick="handleNavigate('PurchaseOrder')" icon="img:icons/purchase.svg" color="grey-6" class="bold-font chip_sty"/>
          <i v-if="page_function == 'CreatePurchaseOrder'" class="fas fa-chevron-right chip-icon"></i> -->
          <Chip v-if="page_function == 'CreatePurchaseOrder'"  :text="$language('D0027')" :icon="'chevron_left'" text-color="grey-10" class="bold-font chip_sty back_chip_icon" v-on:receiveClick="handleNavigate('PurchaseOrder')"/>
          <Chip v-if="page_function == 'EditPurchaseOrder'" :icon="'chevron_left'" :square="true" :label="$language('D0030') +' : '+ json.RefNo" text-color="grey-10" class="bold-font chip_sty" v-on:receiveClick="handleNavigate('PurchaseOrder')"/>
          <!-- <div class="row">
          <div class="col-xs-12 q-pl-sm">
            <div class="row text_1">
              Reference Number: {{ this.json.RefNo }}
            </div>
          </div>
          </div> -->
      </div>
    <div v-if="page_function == 'EditPurchaseOrder'" class=" row" :class="page_function == 'EditPurchaseOrder' && json.BillStatus !== 0  ? 'q-pt-sm' :''" ><!--style="padding-bottom: 8px;" -->
          <!-- <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 "> -->
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
            <div class="row" ><!--$language('D0032') + ':' + -->
              <Button_icon class="summary_button q-pa-none q-ma-none" style="margin:0px;" :label="currency_sign + ' ' + json.total_include_tax" :flat="true" v-on:receiveClick="show_summary_dialog" :font_color="'primary'" :color="'primary'" :outline="false" size="13px"/>
              <!-- <span class="" style="color:#1976D2;" @click="show_summary_dialog"> {{ $language('D0032') }}:  {{ currency_sign }} {{ json.total_include_tax }} </span> -->
              <!-- Total Amount -->
              </div>
          </div>
        </div>
    </div>
    <!--Purchase Order-->
    <q-card class="card-container" style="min-height: 100vh;">
      <!-- <q-card-section class="header_top"> -->
        <!-- <Button_icon :disable="showAddLoading" :big_round="true" :flat="true" :font_color="'#928f8f'" :color="'rgba(255, 255, 255, 0.5)'" :icon="'arrow_back_ios'" :outline="true" size="12px" class="custom_back_button" @click="back()" /> -->
        <!-- <div v-if="page_function == 'CreatePurchaseOrder'" class="text-subtitle1 header_text" style="padding-top: 10px;">{{ $language('D0010') }}</div> -->
        <!-- <div v-if="page_function == 'EditPurchaseOrder'" class="text-subtitle1 header_text">{{ $language('D0010') }}
        <br>Refno: {{ json.RefNo }}</div> -->
        <!-- <q-btn-dropdown v-if="page_function == 'EditPurchaseOrder'" :disable="showAddLoading" class="custom_more_button" flat dense icon="more_vert">
          <q-list>
            <q-item clickable v-close-popup>
              <q-item-section>
                <q-item-label @click="confirmPost" v-if="json.BillStatus==1">{{ $language('D0148') }}</q-item-label>
                <q-item-label @click="confirmPost" v-else>{{ $language('D0019') }}</q-item-label>
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
                v-model="json.step"
                color="primary"
                animated
                class="sticky_stepper"
                header-nav
                @update:model-value="handleChangeStepper"
                inactive-color="grey-7"
                done-color="primary"
              >
                <q-step
                  class="no-scroll"
                  :name="1"
                  prefix="1"
                  :title="$language('D0040')"
                  icon="settings"
                  :done="json.step > 1"
                >
                <!--Header-->
                  <div class="row col-12" style="padding-top: 16px;gap:16px;">
                    <!-- <div class="" > col-xs-12 col-sm-12 col-md-9 col-lg-9 col-xl-9 -->
                      <div class="row col-12 " style="gap:16px;">
                        <div class="row col-12 mobile_section_font">Supplier Details</div>
                        <!-- <div class="col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">{{ $language('D0030') }}Refno/span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="true"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="json.RefNo"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div :class="page_function == 'CreatePurchaseOrder' ? 'col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4' : 'col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4'" class="input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">{{ $language('D0043') }}P/O Date</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Datepicker
                              :clickableInput="true"
                              :no_label="true"
                              :disable="true"
                              :autoclose="true"
                              v-on:receiveChange="handleChangePODate"
                              :daterange="json.PODate"
                              :componentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div class="input_wrapper_right" :class="page_function == 'CreatePurchaseOrder' ?  'col-xs-10' : json.BillStatus == 0 && !supplier_readonly ? 'col-xs-4' : 'col-xs-6'"> -->
                        <div class="row col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <div class="" :class="page_function == 'CreatePurchaseOrder' ?  'col-xs-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 q-pr-sm ' : json.BillStatus == 0 && !supplier_readonly ? 'col-xs-10 q-pr-sm' : 'col-xs-12'">
                          <div class="" :class="$q.screen.width < 1024 ? '' : ''">
                            <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">{{ $language('D0025') }}</span>
                            </div> --><!--Supplier-->
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <SelectFilter
                              :readonly="json.BillStatus==1 || supplier_readonly"
                              :no_label="false"
                              :label="$language('D0025')"
                              v-model:pass_value="json.SCode"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.select"
                              :options="supplier_options"
                              v-on:receiveChange="handleChangeSCode"
                              />
                            </div>
                          </div>
                        </div>

                        <div v-if="json.BillStatus == 0 && !supplier_readonly" dir="rtl" class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 q-pl-sm" style="padding-top: 0px;">
                            <Button_icon :small_round="true" :flat="false" :font_color="'primary'" :color="'white'" :icon="'search'" :outline="false" size="15px"
                            v-on:receiveClick="addButtonCreatePOChild('supplier')" style="margin-top: 0px;height:100%" class="full-width search_button search_icon_btn primary_button_font"/>
                        </div>
                      </div>
<!-- BRANCH -->
                        <div class="row col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <!-- <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"> -->
                            <!-- <div class="row"> -->
                              <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                <span class="mobile_font">{{ $language('D0026') }}</span>
                              </div> -->
                              <!--Branch-->
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <SelectFilter
                                :readonly="json.BillStatus==1"
                                :no_label="false"
                                :label="$language('D0026')"
                                v-model:pass_value="json.loc_group"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.select"
                                :options="location_options"
                                v-on:receiveChange="handleChangeLocGroup"
                                />
                              </div>
                            <!-- </div> -->
                          <!-- </div> -->
                        </div>
                      
<!-- RECEIVE LOCATION -->
                        <div class="row col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 input_wrapper_right"> -->
                            <!-- <div class="row"> -->
                              <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                <span class="mobile_font">{{ $language('D0051') }}</span>
                              </div> --><!--Receiving Location-->
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">

                                <SelectFilter
                                :readonly="json.BillStatus==1"
                                :no_label="false"
                                :label="$language('D0051')"
                                v-model:pass_value="json.loc_group"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.select"
                                :options="location_options2"
                                v-on:receiveChange="handleChangeLocGroup"
                                />
                              </div>
                            <!-- </div> -->
                          <!-- </div> -->
                        </div>
                      </div>
                      <q-separator class="separator-style"></q-separator>
                      <div class="row col-12 " style="gap:16px;">
                        <div class="row col-12 mobile_section_font">Order Details</div>
<!-- ISSUED BY -->
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <div class="row">
                            <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">{{ $language('D0045') }}</span>
                            </div> --><!--Issued By-->
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              :label="$language('D0045')"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="json.IssuedBy"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>
                        <div class="row col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
<!-- P/O DATE -->                        
                        <div :class="page_function == 'CreatePurchaseOrder' ? 'col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-sm' : 'col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-sm'" class="q-pr-sm">
                          <div class="row">
                            <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">P/O Date</span>
                            </div> -->
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Datepicker
                              :clickableInput="true"
                              :no_label="false"
                              :label="$language('D0043')"
                              :disable="true"
                              :autoclose="true"
                              v-on:receiveChange="handleChangePODate"
                              :daterange="json.PODate"
                              :componentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        
 <!-- EXP DATE -->
                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-sm">
                          <div class="row">
                            <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">{{ $language('D0050') }}</span>
                            </div> --><!--Expiry Date-->
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Datepicker
                              :clickableInput="true"
                              :no_label="false"
                              :label="$language('D0050')"
                              :disable="true"
                              :autoclose="true"
                              v-on:receiveChange="handleChangeExpiryDate"
                              :daterange="json.expiry_date"
                              :componentBehavior="dbComponentBehavior ? dbComponentBehavior.select : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>  
                        </div>                     
<!-- EXP IN DAYS -->    <div class="row col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <div class="col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 q-pr-sm">
                          <div class="row">
                            <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">{{ $language('D0049') }}</span>
                            </div>--> <!--Exp in Days -->
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              :label="$language('D0049')"
                              :readonly="json.BillStatus==1 ? true : page_function == 'CreatePurchaseOrder'"
                              v-on:change="handleChangeExpInDays"
                              v-model="json.pur_expiry_days"
                              :dbComponentBehavior="dbComponentBehavior ? page_function == 'CreatePurchaseOrder' ? dbComponentBehavior.text_right_readonly :  dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>
<!-- CAL DUE DATE BY -->
                        <div class="col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 q-pl-sm">
                          <div class="row">
                            <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">{{ $language('D0047') }}</span>
                            </div> --> <!--Cal. Due Date by-->
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
                              :label="$language('D0047')"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="json.CalDueDateby"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>
                        </div>
                        <div class="row col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
<!-- DELIVERY DATE -->
                        <div class="col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 q-pr-sm">
                          <div class="row" :class="$q.screen.width<1024 ? '': ''">
                            <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">{{ $language('D0048') }}</span>
                            </div> --> <!--Delivery Date-->
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Datepicker
                              :clickableInput="true"
                              :no_label="false"
                              :label="$language('D0048')"
                              :disable="json.BillStatus==1"
                              :autoclose="true"
                              v-on:receiveChange="handleChangeDeliverDate"
                              :daterange="json.DeliverDate"
                              :componentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>
<!-- TERMS DAY -->
                        <div class="col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 q-pl-sm">
                          <div class="row">
                            <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">{{ $language('D0046') }}</span>
                            </div> --> <!--Term (Days)-->
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
                              :label="$language('D0046')"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="json.STerm"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>
                        </div>
    
<!-- min max stocks -->
                        <div v-if="page_function=='EditPurchaseOrder'" class="row col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <div v-if="page_function=='EditPurchaseOrder'" class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-sm">
                          <div class="row">
                            <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">{{ $language('D0053') }}</span>
                            </div> --><!--Min Stock Days-->
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              :label="$language('D0053')"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="json.stockday_min"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div v-if="page_function=='EditPurchaseOrder'" class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-sm">
                          <div class="row">
                            <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">{{ $language('D0054') }}</span>
                            </div> --><!--Max Stock Days-->
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              :label="$language('D0054')"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="json.stockday_max"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div> 
                        </div>
<!-- tax code -->
                        <div v-if="page_function=='EditPurchaseOrder'" class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-sm">
                          <div class="row" :class="$q.screen.width<1024 ? '': ''">
                            <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">{{ $language('D0052') }}</span>
                            </div> --><!--Tax Code-->
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              :label="$language('D0052')"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="json.tax_code_purchase"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>
                      </div>
<!-- remarks -->
                      <div class="row col-12">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                          <div class="row ">
                            <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_section_font">{{ $language('D0055') }}</span>
                            </div> --><!--Remark-->
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Textarea class="ignore_height" :no_label="false" :readonly="json.BillStatus==1" v-on:receiveChange="handleChange" v-model="json.Remark"
                              :dbComponentBehavior="dbComponentBehavior.remark" :pass_label="$language('D0055')"/>
                            </div>
                          </div>
                        </div>
                      </div>
                        

                        

                        <!-- <div class="col-xs-6 col-sm-6 col-md-8 col-lg-8 col-xl-8 input_wrapper_right" >
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Name</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <SelectFilter
                              :readonly="json.BillStatus==1 ? true : supplier_readonly"
                              :no_label="true"
                              v-model:pass_value="json.SCode"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.select"
                              :options="supplier_options2"
                              v-on:receiveChange="handleChange"
                              />
                            </div>
                          </div>
                        </div> -->
                      

                      <!-- <div class="row dialog_separator">
                        
                      </div> -->

<!-- TAX CODE, EDIT PURCHASE -->

                      
<!--mobile checkboxes -->
                      <div v-if="page_function == 'EditPurchaseOrder'" class="column col-12" style="height:200px">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <div class="row col-12">

                            <div class="" :class="page_function == 'EditPurchaseOrder' ? 'col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6': 'col-6 col-md-auto'">
                              <Checkbox :class="[json.in_kind === 1 ? 'custom_truthcheckbox' : 'custom_checkbox_disabl']" :btm_padding="true" size="xs" :disable="json.BillStatus == 1" v-model="json.in_kind" :true-value="1" :false-value="0" />
                              <span class="mobile_edit_checkbox">In-kind</span>
                            </div>
                            <div v-if="page_function == 'EditPurchaseOrder'" class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 ">
                               <Checkbox :class="[json.Amendment === 1 ? 'custom_truthcheckbox' : 'custom_checkbox_disabl']" :btm_padding="true" size="xs" :disable="true" v-model="json.Amendment" :true-value="1" :false-value="0" />
                                <span class="mobile_edit_checkbox">{{ $language('D0062') }}<!--Amended--></span>
                            </div>
                            <div class="" :class="page_function == 'EditPurchaseOrder' ? 'col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6': 'col-6 col-md-auto'">
                              <Checkbox :class="[json.tax_inclusive === 1 ? 'custom_truthcheckbox' : 'custom_checkbox_disabl']" :btm_padding="true" size="xs" :disable="json.BillStatus == 1" v-model="json.tax_inclusive" :true-value="1" :false-value="0" />
                              <span class="mobile_edit_checkbox">Tax Inclusive</span>
                            </div>
                            <div v-if="page_function == 'EditPurchaseOrder'" class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                              <Checkbox :class="[json.uploaded === 1 ? 'custom_truthcheckbox' : 'custom_checkbox_disabl']" :btm_padding="true" size="xs" :disable="true" v-model="json.uploaded" :true-value="1" :false-value="0" />
                              <span class="mobile_edit_checkbox">{{ $language('D0060') }}<!--Uploaded--></span>
                            </div>
                            <div v-if="page_function == 'EditPurchaseOrder'" class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                              <Checkbox :class="[json.BillStatus === 1 ? 'custom_truthcheckbox' : 'custom_checkbox_disabl']" :btm_padding="true" size="xs" :disable="true" v-model="json.BillStatus" :true-value="1" :false-value="0" />
                              <span class="mobile_edit_checkbox">{{ $language('D0057') }}<!--Posted--></span>
                            </div>
                            
                            <div v-if="page_function == 'EditPurchaseOrder'" class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                              <Checkbox :class="[json.cancel === 1 ? 'custom_truthcheckbox' : 'custom_checkbox_disabl']" :btm_padding="true" size="xs" :disable="true" v-model="json.cancel" :true-value="1" :false-value="0" />
                              <span class="mobile_edit_checkbox">{{ $language('D0058') }}<!--Cancelled--></span>
                            </div>

                            <div v-if="page_function == 'EditPurchaseOrder'" class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                              <Checkbox :class="[json.Completed === 1 ? 'custom_truthcheckbox' : 'custom_checkbox_disabl']" :btm_padding="true" size="xs" :disable="true" v-model="json.Completed" :true-value="1" :false-value="0" />
                              <span class="mobile_edit_checkbox">{{ $language('D0063') }}<!--Completed--></span>
                            </div>

                            <div v-if="page_function == 'EditPurchaseOrder'" class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 ">
                              <Checkbox :class="[json.hq_issue === 1 ? 'custom_truthcheckbox' : 'custom_checkbox_disabl']" :btm_padding="true" size="xs" :disable="true" v-model="json.hq_issue" :true-value="1" :false-value="0" />
                              <span class="mobile_edit_checkbox">{{ $language('D0059') }}<!--Issued by HQ--></span>
                            </div>
                            <div v-if="page_function == 'EditPurchaseOrder'" class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                              <Checkbox :class="[json.AutoClosePO === 1 ? 'custom_truthcheckbox' : 'custom_checkbox_disabl']" class="custom_truthcheckbox" :btm_padding="true" size="xs" :disable="true" v-model="json.AutoClosePO" :true-value="1" :false-value="0" />
                              <span class="mobile_edit_checkbox">Auto Close PO</span>
                            </div>
                                                
                            <div v-if="page_function == 'EditPurchaseOrder'" class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                              <Checkbox :class="[json.b2b_registration === 1 ? 'custom_truthcheckbox' : 'custom_checkbox_disabl']" :btm_padding="true" size="xs" :disable="true" v-model="json.b2b_registration" :true-value="1" :false-value="0" />
                              <span class="mobile_edit_checkbox">{{ $language('D0064') }}<!--B2B--></span>
                            </div>
                            <div v-if="page_function == 'EditPurchaseOrder'" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <div class="row">
                                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-sm">
                                  <span class="mobile_edit_checkbox">{{ $language('D0065') }}<!--B2B Status--></span>
                                </div>
                                <div class="col-xs-5 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                  <Input
                                  :autofocusclick="true"
                                  :no_label="true"
                                  :readonly="true"
                                  v-on:change="handleChange"
                                  v-model="json.b2b_status"
                                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    <!-- </div> -->
                  </div>

                </q-step>

                <q-step
                  v-if="page_function == 'EditPurchaseOrder'"
                  :name="2"
                  :title="$language('D0041')"
                  prefix="2"
                  active-icon="create_new_folder"
                  :done="json.step > 2"
                ><!--Detail-->
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
                  <div v-if="page_function == 'EditPurchaseOrder'" class="row" > <!--style="padding-top: 16px"-->
                    <div v-if="json.BillStatus == 0 && results.length != 0" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" >
                      <div class="row col-12" style="gap: 12px"><!--Select All-->
                          <!--:label="$language('D0149')" -->
                          <!-- <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4"> -->
                          <Button_icon :disabled="false" :ripple="false" :flat="false"  v-on:receiveClick="handleChangeSelectAll2" 
                          :text="$language('D0149')" :outline="true" size="12px" class=" button_selectAll"
                          @click="isSelectAllClicked = !isSelectAllClicked" :class="{ 'clicked': isSelectAllClicked, 'default': !isSelectAllClicked  }"/>
                          <!-- </div> -->
                          <!--align="right" -->
                          <!-- <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6" q-px-sm q-mr-sm>  -->
                            <Button_icon :disabled="false" :ripple="false" :flat="false" v-on:receiveClick="handleChangeGroup()" 
                            :text="$language('D0150')" :outline="true" size="12px" class="button_group " 
                            @click="isGroupClicked = !isGroupClicked" :class="{ 'clicked': isGroupClicked, 'default': !isGroupClicked }"/>
                            <!--Group-->

                          <Button_icon :loading="loading_button" :ripple="false" :disabled="false" :flat="false" v-on:receiveClick="handleChangeUngroup()"
                          :text="$language('D0151')" :outline="true" size="12px" class="button_group"
                          @click="isUngroupClicked = !isUngroupClicked" :class="{ 'clicked': isUngroupClicked, 'default': !isUngroupClicked }"/><!--Ungroup-->
                        <!-- </div> -->
                      </div>
                    </div>
<!-- @click="selectCard(index)  @click="handleAction(item)"" --> <!--v-for="item in group.items" :key="item.RefNo" @click="handleAction(item)" -->
                    <div  class=" col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" style="padding-top:16px"> 
                      <q-card flat bordered class="card_design q-mb-md" @click="selectCard(index)"  v-for="(group,index) in results" :key="index" style="width: 100%; border-radius:8px;padding:16px"
                      :class="{'selected-card': selectedCardIndex === index}">
                          <q-card-section v-for="item in group.items" :key="item.RefNo"  style="padding: 5px;" >
                            <div class="row">
                                    <!--Start Card Design 1 -->
                                <div v-if="json.BillStatus == 0" class="col-xs-1 col-sm-1 col-md-1 col-lg-1 col-xl-1 q-px-sm self-center">
                                      <Checkbox
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
                                    <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9 col-xl-9 " style="color:#29292A;font-size:14px; font-family:InterfontBold; font-weight:700">
                                       {{ item.Description }}                                   </div>
                                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 text-right" style="color:#29292A; font-family:InterfontBold; font-weight:700; font-size:14px">
                                       {{ currency_sign }} {{ item.TotalPrice }}
                                    </div>
                                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4" style="color:#757575; font-size:12px; font-weight:500; font-family: InterfontMedium">
                                       {{ item.PriceType }}
                                    </div>
                                    <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 text-right" style="font-size:14px; font-family:InterfontMedium; font-weight:500; color:#757575">
                                       {{ item.Qty }}
                                    </div>
                                </div>
                              </div>

                            </div>
                            <q-card-section v-show="selectedCardIndex === index">
                            <!-- <q-separator />"'#B22222'" -->
                            <q-card-section v-if="json.BillStatus == 0" class="text-subtitle2" align="right">
                              <q-btn no-caps flat color="primary" label="Edit"  @click="handleAction(item)" style="font-family:InterfontSemiBold; font-size: 14px;font-weight: 600;"/>
                              <q-btn no-caps flat color="red-7" label="Delete" @click="handleDelete(item)" style="font-family:InterfontSemiBold; font-size: 14px;font-weight: 600;"/>
                            </q-card-section>
                            <q-card-section v-else class="text-subtitle2" align="right">
                              <q-btn no-caps flat color="primary" label="View" v-for="item in group.items" :key="item.RefNo" @click="handleAction(item)" style="font-family:InterfontSemiBold; font-size: 14px;font-weight: 600;"/>
                              <!-- <q-btn  no-caps flat color="red-7" label="Delete" v-for="item in group.items" :key="item.RefNo" @click="handleDelete(item)" style="font-family:InterfontSemiBold; font-size: 14px;font-weight: 600;"/> -->
                            </q-card-section>
                          </q-card-section>
                          </q-card-section>
                          
                      </q-card>
                                                        <!-- col-xs-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2-->
                              <!-- End Card Design 1 -->

                              <!--Start Card Design 2 -->
                                <!-- <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1 col-xl-1 q-px-sm">
                                      <Checkbox
                                      size="xs"
                                      :disable="false"
                                      :no_label="true"
                                      v-model="item.select"
                                      :dbComponentBehavior="dbComponentBehavior.text"
                                      v-on:receiveChangenewVal="handleChangeCheckbox"
                                      :table="true"
                                      />
                                </div>
                                <div class="col-xs-11 col-sm-11 col-md-11 col-lg-11 col-xl-11 q-px-sm ">
                                <div class="row">
                                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                      <div class="text-subtitle2" style="font-size:13.5px"> {{ item.Description }} </div>
                                    </div>
                                    <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                                      <div class="text-caption q-pl-none" style="color:grey; font-size:12px">{{ item.PriceType }}</div>
                                   </div>
                                   <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 text-right">
                                     <div style="font-size:13.5px"> {{ item.Qty }} </div>
                                     <div> {{ currency_sign }} {{ item.TotalPrice }} </div>
                                   </div>
                                </div>
                                </div> -->
                              <!-- End Card Design 2 -->



                              <!-- <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-px-sm">
                                <div class="row">
                                  <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8  text-subtitle2">
                                    {{ item.Description }}
                                  </div>

                                  <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4" align="right">
                                    {{ item.Qty }}
                                  </div>
                              </div>
                              </div>
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-px-xs">
                                    <div class="text-caption" style="color:grey;">&nbsp;{{ item.PriceType }}</div>
                              </div>
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-px-sm" style="padding-top: 15px;">
                                <div class="row">
                                  <div v-if="json.BillStatus == 0" class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                                      <Checkbox
                                      size="xs"
                                      :disable="false"
                                      :no_label="true"
                                      v-model="item.select"
                                      :dbComponentBehavior="dbComponentBehavior.text"
                                      v-on:receiveChangenewVal="handleChangeCheckbox"
                                      :table="true"
                                      />

                                  </div>

                                  <div :class="json.BillStatus == 0 ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'" align="right">
                                    {{ currency_sign }} {{ item.TotalPrice }}
                                  </div>
                              </div>
                              </div> -->
                              <!-- <div v-else class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-px-sm text-right" style="padding-top: 15px;">
                                     {{ result.TotalPrice }}
                              </div> -->
                              <!-- <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9 col-xl-9 ">
                                <div class="row text-subtitle2">
                                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-pl-sm">
                                    {{ result.Description }}
                                  </div>
                                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-pl-xs">
                                    <span class="text-caption" style="color:grey;">&nbsp;{{ result.PriceType }}</span>
                                  </div>


                                </div>
                                <div v-if="json.BillStatus == 0" style="padding-top: 35px;">
                                  <Checkbox
                                  size="xs"
                                  :disable="false"
                                  :no_label="true"
                                  v-model="result.select"
                                  :dbComponentBehavior="dbComponentBehavior.text"
                                  v-on:receiveChangenewVal="handleChangeCheckbox"
                                  :table="true"
                                  />
                                </div>
                              </div>
                              <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 q-pr-sm" align="right">
                                {{ result.Qty }}
                                <div style="padding-top: 35px;">
                                  {{ result.TotalPrice }}
                                </div>
                              </div> -->
                              <!-- <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 q-pr-sm text-caption" align="right">
                                {{ result.Qty }}
                                <div style="padding-top: 35px;">
                                  {{ result.TotalPrice }}
                                </div>
                              </div> -->
                          <!-- <q-card-section v-if="json.BillStatus == 0" style="padding: 0px; border-bottom: 1px solid rgba(0, 0, 0, 0.12);">
                            <div class="row">
                              <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6" @click="addButtonCreatePOChild('item')">
                                <div class="row justify-center items-center" style="width: 100%; height: 40px;">
                                  <div class="q-px-xs">
                                    <Button_icon style="border-radius: 15px;" :flat="false" :icon="'add'" v-on:receiveClick="addButtonCreatePOChild('item')" :font_color="'white'" :color="'primary'" :outline="false" size="10px"/>
                                  </div>
                                  <div>
                                    {{ $language('D0152') }}
                                   Add Item Details
                                  </div>-->
                                 <!-- </div>
                              </div>
                              <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6" @click="supplierItemlist()" style="border-left: 1px solid #cecaca; cursor: pointer">
                                <div class="row justify-center items-center" style="width: 100%; height: 40px;">
                                  <div class="q-px-xs">
                                    <Button_icon style="border-radius: 15px;" :flat="false" :icon="'add'" v-on:receiveClick="supplierItemlist()" :font_color="'white'" :color="'primary'" :outline="false" size="10px"/>
                                  </div>
                                  <div>
                                    {{ $language('D0153') }}
                                    Supplier Item List
                                  </div>
                                </div>
                              </div>
                            </div>
                          </q-card-section> -->
                          
                      <!-- <q-card v-if="results.length != 0" flat bordered class="card_design" style="width: 100%; border-radius:6px;">
                          <q-card-section @click="handleAction(result)" v-for="(result,index) in results" :key="index" style="padding: 5px; border-bottom: 1px solid rgba(0, 0, 0, 0.12);" :style="{ backgroundColor: result.colorCode }">
                            <div class="row">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-px-sm">
                                <div class="row">
                                  <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8  text-subtitle2">
                                    {{ result.Description }}
                                  </div>

                                  <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4" align="right">
                                {{ result.Qty }}
                                  </div>
                              </div>
                              </div>
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-px-xs">
                                    <div class="text-caption" style="color:grey;">&nbsp;{{ result.PriceType }}</div>
                              </div>
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-px-sm" style="padding-top: 15px;">
                                <div class="row">
                                  <div v-if="json.BillStatus == 0" class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                                      <Checkbox
                                      size="xs"
                                      :disable="false"
                                      :no_label="true"
                                      v-model="result.select"
                                      :dbComponentBehavior="dbComponentBehavior.text"
                                      v-on:receiveChangenewVal="handleChangeCheckbox"
                                      :table="true"
                                      />
                                  </div>

                                  <div :class="json.BillStatus == 0 ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'" align="right">
                                    {{ currency_sign }} {{ result.TotalPrice }}
                                  </div>
                              </div>
                              </div>

                            </div>
                          </q-card-section>

                      </q-card> -->
                    </div>
                  </div>
                </q-step>

                <q-step
                  v-if="page_function == 'EditPurchaseOrder'"
                  :name="3"
                  prefix="3"
                  :title="$language('D0042')"
                  icon="create_new_folder"
                  :done="json.step > 3"
                ><!--Surcharge/Discount-->
                  <div class="row dialog_separator" style="padding-top: 16px;gap:8px">
                    <div v-if="page_function=='EditPurchaseOrder'" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                      <div class="row">
                        <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                          <span class="mobile_font">{{ $language('D0067') }}</span>
                        </div> -->
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"><!--GROSS-->
                          <Input
                          :autofocusclick="true"
                          :no_label="false"
                          :label="$language('D0067')"
                          :readonly="true"
                          v-on:change="handleChange"
                          v-model="json.SubTotal1"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                        </div>
                      </div>
                    </div>

                    <div v-if="page_function=='EditPurchaseOrder'" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                      <div class="row">
                        <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                          <span class="mobile_font">{{ $language('D0068') }}</span>
                        </div> -->
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"><!--REBATE-->
                          <Input
                          :autofocusclick="true"
                          :no_label="false"
                          :label="$language('D0068')"
                          :readonly="true"
                          v-on:change="handleChange"
                          v-model="json.rebate_amt"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                        </div>
                      </div>
                    </div>

                    <div v-if="page_function=='EditPurchaseOrder'" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                      <div class="row ">
                        <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                          <span class="mobile_font">{{ $language('D0069') }}</span>
                        </div> -->
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"><!--Total (Exc)-->
                          <Input
                          :autofocusclick="true"
                          :no_label="false"
                          :label="$language('D0069')"
                          :readonly="true"
                          v-on:change="handleChange"
                          v-model="json.Total"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                        </div>
                      </div>
                    </div>

                    <div v-if="page_function=='EditPurchaseOrder'" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                      <div class="row">
                        <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                          <span class="mobile_font">{{ $language('D0070') }}</span>
                        </div> -->
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"><!--Tax-->
                          <Input
                          :autofocusclick="true"
                          :no_label="false"
                          :label="$language('D0070')"
                          :readonly="true"
                          v-on:change="handleChange"
                          v-model="json.gst_tax_sum"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                        </div>
                      </div>
                    </div>

                    <div v-if="page_function=='EditPurchaseOrder'" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                      <div class="row">
                        <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                          <span class="mobile_font">{{ $language('D0071') }}</span>
                        </div> -->
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"><!--Total (Inc)-->
                          <Input
                          :autofocusclick="true"
                          :no_label="false"
                          :label="$language('D0071')"
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


    <!-- <div v-if="json.BillStatus == 0" class="dialog_action_bottom">
      <div class="q-pl-sm q-pr-lg q-pt-xs text-right" style="font-size: 13px;">
        {{ $language('D0032') }}: {{ json.total_include_tax }} -->
        <!--Total Amount:-->
      <!-- </div>
      <div class="q-px-sm q-py-xs">
        <Button_icon class="full-width" style="height: 30px;" :small_round="true" :text="page_function.startsWith('Create') ? $language('D0154') : $language('D0155')" :flat="false" :font_color="'white'" :color="'primary'" :outline="false" size="13px" @click="handleCreatePO"/> -->

        <!-- <Button_icon class="full-width" style="height: 30px;" :small_round="true" :text="page_function.startsWith('Create') ? 'Generate Purchase Order' : 'Update Purchase Order'" :flat="false" :font_color="'white'" :color="'primary'" :outline="false" size="13px" @click="handleCreatePO"/> -->


    <div v-if="json.step == 1 || json.step == 3" class="">
      <!-- <div v-if="page_function == 'EditPurchaseOrder'" class="q-pl-sm q-pr-lg q-pt-xs text-right" style="font-size: 13px;">

        {{ $language('D0032') }}: {{ currency_sign }} {{ json.total_include_tax }}
      </div> -->
      <!-- <div v-if="page_function == 'EditPurchaseOrder'" class="row q-px-sm" :class="page_function == 'EditPurchaseOrder' && json.BillStatus !== 0  ? 'q-pt-sm' :''" style="font-size: 13px;"> -->
        <!-- <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 "> -->
        <!-- <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 "> -->
          <!-- <div   class="row justify-left items-center" > -->
             <!-- <Button_icon class="q-pa-none q-ma-none" :flat="true" :icon="'expand_less'" v-on:receiveClick="show_summary_dialog" :font_color="'primary'" :color="'primary'" :outline="false" size="13px"/> -->
             <!-- <span class="" style="color:#1976D2;" @click="show_summary_dialog"> {{ $language('D0032') }}:  {{ currency_sign }} {{ json.total_include_tax }} </span> -->
             <!-- Total Amount -->
            <!-- </div> -->
        <!-- </div> -->
      <!-- </div> -->
      
      <!-- <div  class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 text-right"> -->
        <!-- POST BUTTON --><!-- <span class="q-pr-xs" :style="json.BillStatus == 1 ? 'width: 100%;' : 'width: 24%;'"> --><!-- </span> -->
        <!-- <span class="q-pr-xs" :style="json.BillStatus == 1 ? 'width: 100%;' : 'width: 24%;'"> --><!-- </span> -->
        <!-- <div  class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
           
           <div class="row">
             <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-xs">
                
                  <Button_icon v-if="json.BillStatus==1" class="full-width" style="height: 25px;" :small_round="true" :text="$language('D0148')" :flat="false" :font_color="'white'" :color="'#273655'" :outline="false" size="11px" @click="confirmPost"/>
                  <Button_icon v-else class="full-width" style="height: 25px;" :small_round="true" :text="$language('D0019')" :flat="false" :font_color="'white'" :color="'#273655'" :outline="false" size="11px" @click="confirmPost"/>
                
              </div>
              <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-xs">
                
                  <Button_icon  class="full-width" style="height: 25px;" :small_round="true" :text="'PRINT'" :flat="false" :font_color="'white'" :color="'#273655'" :outline="false" size="11px" @click="handlePrint"/>
                
              </div>

           </div>
        </div> -->


      <!-- <div class="row q-px-sm q-py-xs"> -->
        <!-- <Button_icon v-if="json.BillStatus==0" :readonly="page_function.startsWith('Edit') && deepEqual(ori_json, json)" style="height: 30px; width: 100%" :small_round="true" :text="page_function.startsWith('Create') ? $language('D0154') : $language('D0155')" :flat="false" :font_color="'white'" :color="'primary'" :outline="false" size="13px" @click="handleCreatePO"/> -->
      <!-- <div class="dialog_mobile_detail"> -->
              <!-- <div class="row full-height items-center">
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4" align="center">
                  <Button_icon :text="'PRINT'" :icon="'fa fa-print fa-xl'" :flat="true" :font_color="'primary'" :color="''" :outline="false" size="9px"
                  @click="handlePrint" class="mobile_nav_font mobile_nav_icons primary_button_font" stack/>
                </div>
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4" align="center">
                  
                  <Button_icon v-if="json.BillStatus==0" :readonly="(page_function.startsWith('Edit') && deepEqual(ori_json, json)) || (page_function.startsWith('Create') && deepEqual(ori_json, json))" :icon="'add'" :border_radius="'30px;'" :flat="false" :font_color="'white'" :color="'primary'" :outline="false" size="13px" @click="handleCreatePO"
                  class="menu_add"  :icon-size="'2.9em'"/>
                </div>
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4" align="center">
                  
                  <Button_icon v-if="json.BillStatus==1" :icon="'fa fa-paper-plane fa-xl'" :text="$language('D0148')" :flat="true" :font_color="'primary'" :color="''" :outline="false" size="9px"
                  @click="confirmPost" class="mobile_nav_font mobile_nav_icons primary_button_font" stack/>
                  <Button_icon v-else :text="$language('D0019')" :flat="true" :font_color="'primary'" :color="''" :outline="false" size="9px" :icon="'fa fa-paper-plane fa-xl'"
                  @click="confirmPost" class="mobile_nav_font mobile_nav_icons primary_button_font" stack/>
                </div>
              </div> -->
              <!-- :readonly="(page_function.startsWith('Edit') && deepEqual(ori_json, json)) || (page_function.startsWith('Create') && deepEqual(ori_json, json))" -->
        <!-- </div> -->
       <ButtonMobile
      :json="json" 
      :ori_json="ori_json" 
      :page_function="page_function"
      @print="handlePrint"
      @create-po="handleCreatePO"
      @confirm-post="confirmPost"
      @convert-new="handleConvertNew"
    />

      <!-- </div> -->
    </div>
<!-- sini dialog  -->
    <div v-if="json.step == 2" class="">
      <!-- <div v-if="page_function == 'EditPurchaseOrder'" class="row q-px-sm" :class="page_function == 'EditPurchaseOrder' && json.BillStatus !== 0  ? '' :''"  style="font-size: 13px;"> -->
         <!-- <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 "> -->
        <!-- <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 "> -->
          <!-- <div class="row justify-left items-center" > -->
          <!-- <span class="" style="color:#1976D2;" @click="show_summary_dialog">View</span> -->
             <!-- <Button_icon class="q-pa-none q-ma-none" :flat="true" :icon="'expand_less'" v-on:receiveClick="show_summary_dialog" :font_color="'primary'" :color="'primary'" :outline="false" size="13px"/> -->
             <!-- <span class="" style="color:#1976D2;" @click="show_summary_dialog"> {{ $language('D0032') }}:  {{ currency_sign }} {{ json.total_include_tax }} </span> -->
             <!-- Total Amount -->
            <!-- </div> -->
        <!-- </div> -->
        <!-- <div  class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 text-right"> -->
        <!-- <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6"> -->
           <!-- POST BUTTON -->
           <!-- <div class="row"> -->
             <!-- <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-xs"> -->
                <!-- <span class="q-pr-xs" :style="json.BillStatus == 1 ? 'width: 100%;' : 'width: 24%;'"> -->
                  <!-- <Button_icon v-if="json.BillStatus==1" class="full-width" style="height: 25px;" :small_round="true" :text="$language('D0148')" :flat="false" :font_color="'white'" :color="'#273655'" :outline="false" size="11px" @click="confirmPost"/> -->
                  <!-- <Button_icon v-else class="full-width" style="height: 25px;" :small_round="true" :text="$language('D0019')" :flat="false" :font_color="'white'" :color="'#273655'" :outline="false" size="11px" @click="confirmPost"/> -->
                <!-- </span> -->
              <!-- </div> -->
              <!-- <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-xs"> -->
                  <!-- <Button_icon class="full-width" style="height: 25px;" :small_round="true" :text="'PRINT'" :flat="false" :font_color="'white'" :color="'#273655'" :outline="false" size="11px" @click="handlePrint"/> -->
              <!-- </div> -->

            <!-- </div> -->
        <!-- </div> -->
      <!-- </div> -->
      
      <!--   Add Item Details --><!--  Supplier Item List  -->
      <div  v-if="json.BillStatus == 0" class="row q-pb-xs q-pr-sm">
        <!-- <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6" @click="addButtonCreatePOChild('item')">
          <div class="row justify-center items-center" style="width: 100%; height: 40px;">
            <div class="q-pr-sm">
              <Button_icon style="border-radius: 15px;" :flat="false" :icon="'add'" v-on:receiveClick="addButtonCreatePOChild('item')" :font_color="'white'" :color="'primary'" :outline="false" size="10px"/>
            </div>
            <div>
              {{ $language('D0152') }}
              
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
              
            </div>
          </div>
        </div> -->
        <!-- <div class="dialog_mobile_detail">
              <div class="row full-height items-center">
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4" align="center"> 
                  <Button_icon :text="'PRINT'" :icon="'fa fa-print fa-xl'" :flat="true" :font_color="'primary'" :color="''" :outline="false" size="9px"
                  @click="handlePrint" class="mobile_nav_font mobile_nav_icons primary_button_font" stack/>
                </div>

                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4" align="center" >
                  <Button_icon v-if="json.BillStatus == 0" :icon="'add'" :border_radius="'30px;'" :flat="false" :font_color="'white'" :color="'primary'" :outline="false" size="13px"
                  v-on:receiveClick="handleConvertNew" class="menu_add"  :icon-size="'2.9em'"/>
                </div>

                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4" align="center">
                  
                  <Button_icon v-if="json.BillStatus==1" :icon="'print'" :text="$language('D0148')" :border_radius="'17px;'" :flat="true" :font_color="'primary'" :color="''" :outline="false" size="13px"
                  @click="confirmPost" class="mobile_nav_font mobile_nav_icons primary_button_font" />
                  <Button_icon v-else :text="$language('D0019')" :flat="true" :font_color="'primary'" :color="''" :outline="false" size="9px" :icon="'fa fa-paper-plane fa-xl'"
                  @click="confirmPost" class="mobile_nav_font mobile_nav_icons primary_button_font" stack/>
                </div>
              </div>
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
      <div v-else>
        <ButtonMobile
      :json="json" 
      :ori_json="ori_json" 
      :page_function="page_function"
      @print="handlePrint"
      @create-po="handleCreatePO"
      @confirm-post="confirmPost"
      @convert-new="handleConvertNew"
    />
        <!-- <div class="dialog_mobile_detail">
              <div class="row full-height items-center">
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4" align="center">
                  <Button_icon :text="'PRINT'" :icon="'fa fa-print fa-xl'" :flat="true" :font_color="'primary'" :color="''" :outline="false" size="9px"
                  @click="handlePrint" class="mobile_nav_font mobile_nav_icons primary_button_font" stack/>
                </div>
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4" align="center">
                  <Button_icon v-if="json.BillStatus==0" :readonly="(page_function.startsWith('Edit') && deepEqual(ori_json, json)) || (page_function.startsWith('Create'))" :icon="'add'" :border_radius="'30px;'" :flat="false" :font_color="'white'" :color="'primary'" :outline="false" size="13px" @click="handleCreatePO"
                  class="menu_add"  :icon-size="'2.9em'"/>
                </div>
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4" align="center">
                  
                  <Button_icon v-if="json.BillStatus==1" :icon="'fa fa-paper-plane fa-xl'" :text="$language('D0148')" :flat="true" :font_color="'primary'" :color="''" :outline="false" size="9px"
                  @click="confirmPost" class="mobile_nav_font mobile_nav_icons primary_button_font" stack/>
                  <Button_icon v-else :text="$language('D0019')" :flat="true" :font_color="'primary'" :color="''" :outline="false" size="9px" :icon="'fa fa-paper-plane fa-xl'"
                  @click="confirmPost" class="mobile_nav_font mobile_nav_icons primary_button_font" stack/>
                </div>
              </div>
        </div> -->
      </div>
    </div>
  </div>

  <q-dialog v-model="delete_child" persistent position="top">
    <q-card style="width: 864px; max-width: 98vw;text-align:center;margin-top: 2%;border-radius: 8px">

      <q-card-section class="theme_color row items-center" style="height:56px; padding: 8px 24px; border-bottom: 1px solid #a7bbcb;"> <!--padding-top:1%;padding-bottom:1%;-->
        <div class="dialog_confirmation_title">{{ $language('D0115') }}</div><!--Confirmation-->
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup :disable="showAddLoading || showAddLoading2"/>
      </q-card-section>

      <q-card-section style="padding: 32px 24px">
        <!-- <span class="q-ml-sm custom_selection_font">{{general_body}}</span> -->
        <span class="dialog_confirmation_question_font">{{ $language('C0001') }}</span><!--Are you sure to delete this line?-->
      </q-card-section>

      <q-card-actions align="right" style="padding-top:0;padding-right: 16px;padding-bottom:16px">
        <div class="q-gutter-x-md">
        <q-btn outline :label="$language('D0116')" size="12px" font_color="#29292A" color="#29292A" v-close-popup class="dialog_confirm_cancel_button"/><!--Cancel-->
        <q-btn v-if="!edit_surcharge_action" flat :label="$language('D0156')" size="12px" font_color="'white'" color="'#D81111'" class="dialog_confirm_delete_button" @click="handleDeleteLine" /><!--replace OK to delete-->
        <q-btn v-if="edit_surcharge_action" flat :label="$language('D0117')" color="primary" @click="handleDeleteSurchargeLine" />
        </div>
      </q-card-actions>

      <q-inner-loading
        :showing="deleteLoading"
        color="primary"
      />
    </q-card>
  </q-dialog>

  <q-dialog v-model="post_transmain" persistent position="top">
    <q-card class="dialog-style"
      :style="{
        width: $q.screen.width > 599 ? '864px' : '350px',
        maxWidth: '98vw',
        textAlign: 'center',
        marginTop: $q.screen.width > 599 ? '2%' : '30%',
        borderRadius: '8px'
      }"
    >
      <q-card-section class="theme_color row items-center" style="height:56px; padding: 8px 24px; border-bottom: 1px solid #a7bbcb;">
        <div class="dialog_confirmation_title">{{ $language('D0115') }}</div><!--Confirmation-->
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup :disable="showAddLoading || showAddLoading2"/>
      </q-card-section>

      <q-card-section style="padding: 32px 24px">
        <!-- <span class="q-ml-sm custom_selection_font">{{general_body}}</span> -->
        <span v-if="json.BillStatus == 0" class="dialog_confirmation_question_font">{{ $language('C0002') }}</span><!--Are you sure to post?-->
        <span v-if="json.BillStatus == 1" class="dialog_confirmation_question_font">{{ $language('C0005') }}</span><!--Are you sure to unpost    :text-color="json.BillStatus==1 ? 'white' : 'primary'" :color="json.BillStatus==1 ? '#EF4444' : 'white'"--> 
      </q-card-section>

      <q-card-actions align="right" style="padding-top:0px; padding-right: 24px; padding-bottom:24px">
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
    <q-card v-if="$q.screen.width < 600" style="width: 700px; max-width: 98vw; margin-top: 0%;">
      <q-card-section class="row col-12 header_top_mobile" :style="{ textAlign: (!status && edit_child) ? 'center' : 'left' }">
        <div v-if="!status && edit_child" class="mobile_dialog_delete_btn" @click="handleDelete(jsonChild)">
          <!-- {{ $language('D0156') }} -->
          <!-- Delete -->
          <Button_icon :disabled="readonly_delete" :icon="'fas fa-trash-alt'" :flat="true" :color="''" :font-color="'black'" :outline="false" size="12px" v-on:click="handleDelete(jsonChild)" class="q-mr-sm text-red" 
              style="border-radius: 16px;transition: all 0.3s;" @mouseover="isHovered = true" @mouseleave="isHovered = false" :class="{ 'hover-style': isHovered }"/>
          <!-- <Button_icon :disabled="readonly_delete" :icon="'fa-solid fa-trash-can'" :color="'negative'" :outline="false" size="12px" v-on:click="handleDelete(jsonChild)" class="q-mr-sm" /> -->
        </div>

        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div v-if="!edit_child" class="text-subtitle1 mobile_dialog_bottom" style="padding:16px 24px;margin-top: 0px;box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);">{{ $language('D0157') }}<br></div><!--Purchase Order Details-->
          <div v-else class="text-subtitle1 mobile_dialog_bottom" style="padding:16px 24px;margin-top: 0px;box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);">{{ $language('D0158') }}<br></div><!--Edit Purchase Order Details-->
        </div>
        <div class="custom_close_button">
          <q-btn icon="close" flat round dense @click="close()" :disable="false"/>
        </div>
      </q-card-section>

      <q-card-section class="upload_container">
        <q-form ref="save_edit_pochild_form">
          <div class="row upload_separator_first">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <div class="row input_wrapper_right " style="padding-top:16px">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <div class="row col-12">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" :class="$q.screen.width > 1023 ? 'q-pl-sm': ''" style="padding-bottom:16px">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <!-- <div class="bg-pink-2 row"> -->
                            <div class="row">
                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                              <span class="dialog_radio_title">{{ $language('D0091') }}</span><!--Entry Type-->
                            </div>
                            <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9 col-xl-9" style="full-height">
                              <Radio class="full-height dialog_radio_options" size="sm" :disable="status" v-on:receiveChange="handleChangeEntryType" v-model="jsonChild.EntryType" :options="entry_type_options"  />
                            </div>
                          </div>
                          <!-- </div> -->
                        </div>
                      
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <div class="row">
                            <!-- <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"> -->
                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                              <span class="dialog_radio_title">{{ $language('D0094') }}</span><!--Pricing Type-->
                            </div>
                            <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                              <Radio stack class="dialog_radio_options" size="sm" :disable="status" v-on:receiveChange="handleChangePriceType" v-model="jsonChild.PriceType" :options="pricing_type_options"  />
                            </div>
                            <!-- </div> -->
                          </div>
                        </div>
                    </div>
                    </div>
                    
                    <div class="row col-12" style="gap:16px;">
                      <q-separator class="separator-style"></q-separator>
                    <!-- <div class="" > col-xs-12 col-sm-12 col-md-9 col-lg-9 col-xl-9 -->
                    <div class="row col-12 " style="gap:16px;">
                    <div class="row col-12 mobile_section_font">Item Details</div>
                    <div class="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
                      <div class="row">
                        <div class="" :class="edit_child ? 'col-xs-12' : 'col-xs-10 q-pr-sm'">
                          <div class="row">
                            <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">{{ $language('D0097') }}</span>
                            </div> --><!--Item Code-->
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              :label="$language('D0097')"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="jsonChild.Itemcode"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div v-if="!edit_child" dir="rtl" class="button_upload_wrapper col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2" style="padding-top: 0px;">
                            <Button_icon ref="searchButton" :small_round="true" :flat="false" :font_color="'primary'" :color="'white'" :icon="'search'" :outline="false" size="16px"
                            v-on:receiveClick="showSearchDialog()" style="margin-top: 0px;height:100%" class="search_button_dialog search_icon_btn primary_button_font"/>
                        </div>
                      </div>
                    </div>

                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <div class="row">
                            <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">{{ $language('D0098') }}</span>
                            </div> --><!--Description-->
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              :label="$language('D0098')"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="jsonChild.Description"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div v-if="hv_item" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <div class="row">
                            <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">{{ $language('D0099') }}</span>
                            </div> -->
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"><!--Barcode-->
                              <Select
                              :readonly="json.BillStatus==1"
                              :no_label="false"
                              :label="$language('D0099')"
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
                    
                    <div v-if="hv_item" class="row col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                      
                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-sm">
                          <div class="row">
                            <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">{{ $language('D0100') }}</span>
                            </div> -->
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"><!--Pack Size-->
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              :label="$language('D0100')"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="jsonChild.PackSize"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>
                     
                  
                      
                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-sm">
                          <div class="row">
                            <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">{{ $language('D0101') }}</span>
                            </div> -->
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"><!--Article No-->
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              :label="$language('D0101')"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="jsonChild.ArticleNo"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>
                     
                    </div>
                  </div>
                  <q-separator v-if="hv_item" class="separator-style"></q-separator>
                  <div v-if="hv_item" class="row" style="gap:16px">
                    <div class="row col-12 mobile_section_font">Quantity Details</div>
                    <div class="row col-12">
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-sm">
                      <div class="row">
                        <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                          <span class="mobile_font">{{ $language('D0102') }}</span>
                        </div> -->
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"><!--Bulk Qty-->
                          <Input
                          :autofocusclick="true"
                          :no_label="false"
                          :label="`${$language('D0102')}  (x${jsonChild.OrderLotSize})`"
                          :readonly="status"
                          v-on:change="handleChangeBulkQty"
                          v-model="jsonChild.BulkQty"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                        </div>
                        <!-- <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 q-pl-sm">
                          <span style="font-size: 13px;">x {{ jsonChild.OrderLotSize }}</span>
                        </div> -->
                      </div>
                    </div>

                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-sm" :class="$q.screen.width>599 && $q.screen.width<1024 ? '' : ''">
                      <div class="row">
                        <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                          <span class="mobile_font">{{ $language('D0103') }}</span>
                        </div> -->
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"><!--Qty-->
                          <Input
                          :autofocusclick="true"
                          :no_label="false"
                          :label="$language('D0103')"
                          :readonly="status"
                          v-on:change="handleChangeQty"
                          v-model="jsonChild.SetQty"
                          min='0'
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.input_number : oridbComponentBehavior.text" />
                        </div>
                      </div>
                    </div>
                    </div>
                    <div class="row col-12">
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-sm">
                      <div class="row" :class="$q.screen.width<599 ? '': ''">
                        <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                          <span class="mobile_font">{{ $language('D0096') }}</span>
                        </div> -->
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"><!--FOC-->
                          <Input
                          :autofocusclick="true"
                          :no_label="false"
                          :label="$language('D0096')"
                          :readonly="status ? true : jsonChild.PriceType=='FOC'"
                          v-on:change="handleChangeQtyfoc"
                          v-model="jsonChild.Qty_foc"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right_readonly : oridbComponentBehavior.text" />
                        </div>
                      </div>
                    </div>

                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-sm">
                      <div class="row" :class="page_function == 'EditPurchaseOrder' ? '': ''">
                        <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                          <span class="mobile_font">{{ $language('D0092') }}</span>
                        </div> -->
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"><!--Unit Price-->
                          <Input
                          :autofocusclick="true"
                          :no_label="false"
                          :label="$language('D0092')"
                          :readonly="status ? true : jsonChild.PriceType=='FOC' ? true : unit ? false : true"
                          v-on:change="handleChangeUnitPrice"
                          v-model="jsonChild.UnitPrice"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right_readonly : oridbComponentBehavior.text" />
                        </div>
                      </div>
                    </div>
                    </div>
                    <div v-if="hv_item" class="row col-12">
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-sm">
                      <div class="row" :class="$q.screen.width<1024 ? '': ''">
                        <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                          <span class="mobile_font">{{ $language('D0104') }}</span>
                        </div> -->
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"><!--Discount(+)/Surcharge(-)-->
                          <Input
                          :autofocusclick="true"
                          :no_label="false"
                          :label="$language('D0104')"
                          :readonly="status ? true : jsonChild.PriceType=='FOC' ? true : unit ? false : true"
                          v-on:change="handleChangeDiscAmt"
                          v-model="jsonChild.DiscAmt"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                        </div>
                      </div>
                    </div>
                    <!-- <div v-if="hv_item" class="row col-12"> -->
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6  q-pl-sm">
                      <div class="row">
                        <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                          <span class="mobile_font">{{ $language('D0109') }}</span>
                        </div> -->
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"><!--Net Price-->
                          <Input
                          :autofocusclick="true"
                          :no_label="false"
                          :label="$language('D0109')"
                          :readonly="true"
                          v-on:change="handleChange"
                          v-model="jsonChild.NetUnitPrice"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                        </div>
                      </div>
                    </div>
                    </div>

                    
                  
                  </div>

                  <div v-if="hv_item" class="row col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-sm">
                      <div class="row">
                        <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                          <span class="mobile_font">{{ $language('D0105') }}</span>
                        </div> -->
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"><!--Disc1Type-->
                          <Select
                          dir="ltr"
                          :readonly="status ? true : jsonChild.PriceType=='FOC' ? true : unit ? jsonChild.DiscAmt != '0.00' : true"
                          :no_label="false"
                          :label="$language('D0105')"
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
                          <span class="mobile_font">{{ $language('D0106') }}</span>
                        </div> -->
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"><!--Disc1Value-->
                          <Input
                          :autofocusclick="true"
                          :no_label="false"
                          :label="$language('D0106')"
                          :readonly="status ? true : jsonChild.PriceType=='FOC' ? true : unit ? false : true"
                          v-on:change="handleChangeDisc1value"
                          v-model="jsonChild.Disc1value"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-if="hv_item" class="row col-12">
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-sm">
                      <div class="row" :class="$q.screen.width<599 ? '': ''">
                        <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                          <span class="mobile_font">{{ $language('D0107') }}</span>
                        </div> -->
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"><!--Disc2Type-->
                          <Select
                          dir="ltr"
                          :readonly="status ? true : jsonChild.PriceType=='FOC' ? true : unit ? false : true"
                          :no_label="false"
                          :label="$language('D0107')"
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
                          <span class="mobile_font">{{ $language('D0108') }}</span>
                        </div> -->
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"><!--Disc2Value-->
                          <Input
                          :autofocusclick="true"
                          :no_label="false"
                          :label="$language('D0108')"
                          :readonly="status ? true : jsonChild.PriceType=='FOC' ? true : unit ? false : true"
                          v-on:change="handleChangeDisc2Value"
                          v-model="jsonChild.Disc2Value"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                        </div>
                      </div>
                    </div>
                  </div>

                  

                  <div v-if="hv_item" class="row col-12">
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-sm">
                      <div class="row">
                        <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                          <span class="mobile_font">{{ $language('D0111') }}</span>
                        </div> -->
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"><!--Rebate Amount-->

                          <!-- <Input
                          :autofocusclick="true"
                          :no_label="true"
                          :readonly="status"
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
                        </div>
                      </div>
                    </div>

                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-sm">
                      <div class="row">
                        <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                          <span class="mobile_font">{{ $language('D0112') }}</span>
                        </div> -->
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"><!--Future Price-->
                          <Input
                          :autofocusclick="true"
                          :no_label="false"
                          :label="$language('D0112')"
                          :readonly="status"
                          v-on:change="handleChangeFuturePrice"
                          v-model="jsonChild.price_future"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                        </div>
                      </div>
                    </div>
                    </div>
                    <div v-if="hv_item" class="row col-12">
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-sm">
                      <div class="row">
                        <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                          <span class="mobile_font">{{ $language('D0110') }}</span>
                        </div> -->
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"><!--Total before Tax-->
                          <Input
                          :autofocusclick="true"
                          :no_label="false"
                          :label="$language('D0110')"
                          :readonly="status ? true : jsonChild.PriceType=='FOC' ? true : unit"
                          v-on:change="handleChangeTotalPrice"
                          v-model="jsonChild.TotalPrice"
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

      <q-card-actions v-if="!status && hv_item" class="dialog_action" style="padding: 0px 16px 16px 16px;">
        <div class="row full-width">
          <div v-if="!edit_child" class="col-xs-6 q-pr-xs">
            <Button_icon class="full-width" style="height: 30px;" :small_round="true" :text="$language('D0024')"
            :flat="false" :font_color="'white'" :color="'primary'" :outline="false" size="13px" @click="handleChild('save&add')"/><!--ADD-->
          </div>
          <div :class="!edit_child ? 'col-xs-6 q-pl-xs': 'full-width'">
            <Button_icon class="full-width dialog_done_button" :small_round="true" :text="$language('D0159')"
            :flat="false" :font_color="'white'" :color="'primary'" :outline="false" size="16px" @click="handleChild('save')"/><!--DONE-->
          </div>
        </div>
      </q-card-actions>

      <q-inner-loading
        :showing="showAddLoading"
        color="primary"
      />
    </q-card>

    <q-card v-else style="width: 864px; max-width: 98vw; margin-top: 2%;border-radius: 8px">
      <q-card-section class=" row theme_color dialog_header" style="height: 56px; padding: 8px 24px;">
          <div class="text-subtitle1 header_text" style="margin-top: 5px;">{{ $language('D0157') }}<br></div><!--Purchase Order Detail-->
          <q-space />
          <q-btn icon="close" flat round dense @click="close()" :disable="false"/>
      </q-card-section>

      <q-card-section class="upload_container">
        <q-form ref="save_edit_pochild_form">
          <div class="row upload_separator_first">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
<!-- detail edit Entry -->
              <div v-if="$q.screen.width > 599 && $q.screen.width < 1024" class="row input_wrapper_right">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <div class="row po_details_separator " style="gap:8px; padding-bottom: 16px">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" :class="$q.screen.width > 1023 ? 'q-pl-sm': ''">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                          <div v-if="edit_child && json.BillStatus == 0" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" align="right">
                            <Button_icon :disabled="readonly_delete" :icon="'fas fa-trash-alt'" :flat="true" :color="''" :font-color="'black'" :outline="false" size="12px" v-on:click="handleDelete(jsonChild)" class="q-mr-sm text-red" />
                          </div>
                          <div class="row">
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                              <span class="dialog_radio_title">{{ $language('D0091') }}</span><!--Entry Type-->
                            </div>
                            <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                              <Radio class="dialog_radio_options" size="md" :disable="json.BillStatus==1" v-on:receiveChange="handleChangeEntryType" v-model="jsonChild.EntryType" :options="entry_type_options"  />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" :class="$q.screen.width > 1023 ? 'q-pl-sm': ''">
                                  <div class="row">
                                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                      <div class="row">
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                                          <span class="dialog_radio_title">{{ $language('D0094') }}</span><!--Pricing Type-->
                                        </div>
                                        <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                                          <Radio class="dialog_radio_options" size="md" :disable="json.BillStatus==1" v-on:receiveChange="handleChangePriceType" v-model="jsonChild.PriceType" :options="pricing_type_options"  />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                    </div>
                    </div>
                    <!-- <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6"></div> -->

                    <div class="po_details_custom row">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div class="row po_details_custom_row">
                      <div class="row col-12">
                      <div class="" :class="edit_child ? 'col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-md' : 'col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 q-pr-md'">
                                <Input
                                :autofocusclick="true"
                                :no_label="false"
                                :label="$language('D0097')"
                                :readonly="true"
                                v-on:change="handleChange"
                                v-model="jsonChild.Itemcode"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text" />
                              <!--Item Code-->
                            
                      </div>
                      

                      <div v-if="!edit_child" class="col-xs-1 col-sm-1 col-md-1 col-lg-1 col-xl-1 q-pr-md" style="padding-top: 0px;">
<!-- search po details -->
                        <Button_icon ref="searchButton" :flat="true" :font_color="'primary'" :color="'white'" :icon="'search'" :outline="false" size="17px" style="height:100%"
                        v-on:receiveClick="showSearchDialog()" :tooltip_message="'Search Item'" class="full-width search_button_dialog search_icon_btn primary_button_font"/>
                      </div>
                      
                      <div class="col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 q-pl-md">
                        <div class="row">
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
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
                      <div class="col-xs-6 col-sm-6 col-md-2 col-lg-2 col-xl-2 q-pr-md">
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

                      <div class="col-xs-6 col-sm-6 col-md-2 col-lg-2 col-xl-2 q-pl-md">
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

                      <div class="col-xs-6 col-sm-6 col-md-2 col-lg-2 col-xl-2 q-pr-md">
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
                    </div>
                  <q-separator class="separator-style"></q-separator>
<!-- bulk -->
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div class="row po_details_custom_row">
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
                          

                        <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 q-pl-md" :class="$q.screen.width>599 && $q.screen.width<1024 ? '' : ''">
                          
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
                          

                        <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 q-pl-md">
                          <div class="row" :class="$q.screen.width<599 ? 'dialog_separator': ''">
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
                          <div class="row" :class="$q.screen.width<599 ? '': ''">
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

                      <div class="row col-12">
                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-md">
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

                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-md">
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
                      </div>
                    </div>
                  </div>
                    </div>
                  
                </div>
              </div>
<!-- detail edit Entry -->
              <div v-if="$q.screen.width > 1023" class="row input_wrapper_right">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <div class="row po_details_separator po_details_custom">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" :class="$q.screen.width > 1023 ? 'q-pl-sm': ''">
                      <div class="row po_details_custom_row ">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
                          <div class="row">
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                              <span class="dialog_radio_title">{{ $language('D0091') }}</span>
                            </div><!--Entry Type-->
                            <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                              <Radio class="dialog_radio_options" size="md" :disable="json.BillStatus==1" v-on:receiveChange="handleChangeEntryType" v-model="jsonChild.EntryType" :options="entry_type_options"  />
                            </div>
                          </div>
                        </div>
                      

                    <!-- <div class="bg-yellow col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6"></div> -->

                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" :class="$q.screen.width > 1023 ? '': ''">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <div class="row">
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                              <span class="dialog_radio_title">{{ $language('D0094') }}</span>
                            </div><!--Pricing Type-->
                            <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                              <Radio class="dialog_radio_options" size="md" :disable="json.BillStatus==1" v-on:receiveChange="handleChangePriceType" v-model="jsonChild.PriceType" :options="pricing_type_options"  />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    </div>
                    </div>
                    <div class="po_details_custom row">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                      <div class="row po_details_custom_row">
                        <div class="" :class="edit_child ? 'col-md-12 col-lg-12 col-xl-12' : 'col-md-12 col-lg-12 col-xl-12'">   
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <div class="row">
                                <div class="col-xs-11 col-sm-11 col-md-11 col-lg-11 col-xl-11 q-pr-md">
                                  <Input
                                  :autofocusclick="true"
                                  :no_label="false"
                                  :label="$language('D0097')"
                                  :readonly="true"
                                  v-on:change="handleChange"
                                  v-model="jsonChild.Itemcode"
                                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text" />
                                </div><!--Item Code-->
                                <div dir="rtl" class="col-xs-1 col-sm-1 col-md-1 col-lg-1 col-xl-1"> <!-- v-if="!edit_child" -->
                                  <Button_icon :disabled="false" ref="searchButton" :flat="true" :font_color="'primary'" :color="'white'" :icon="'search'" :outline="false" size="17px"
                                  v-on:receiveClick="showSearchDialog()" :tooltip_message="'Search Item'" style="height:100%" class="search_button_dialog search_icon_btn primary_button_font"/>
                              </div>
                              </div>
                            </div>
                        </div>
                        <div class="col-xs-6 col-sm-6 col-md-12 col-lg-12 col-xl-12">
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <div class="row">
                              <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-md">
                                <Input
                                :autofocusclick="true"
                                :no_label="false"
                                :label="$language('D0098')"
                                :readonly="true"
                                v-on:change="handleChange"
                                v-model="jsonChild.Description"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                              </div><!--Description-->
                              <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-md">
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
                        <div class="col-xs-6 col-sm-6 col-md-12 col-lg-12 col-xl-12">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                              <div class="row">
                                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-md">
                                  <Input
                                  :autofocusclick="true"
                                  :no_label="false"
                                  :label="$language('D0101')"
                                  :readonly="true"
                                  v-on:change="handleChange"
                                  v-model="jsonChild.ArticleNo"
                                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                                </div><!--Article No-->
                                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-md">
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
                                  /><!--Barcode-->
                                </div>
                        </div>
                      </div>
                    </div>
                    </div>
                    </div>
                    <q-separator class="separator-style"></q-separator>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <div class="row po_details_custom_row">
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <div class="row">
<!--Bulk Qty-->
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
<!--Qty-->
                              <div class="col-xs-6 col-sm-2 col-md-3 col-lg-3 col-xl-3 q-pl-md" :class="$q.screen.width>599 && $q.screen.width<1024 ? 'two_column_left' : !edit_child ? 'two_column_left' : ''">                                
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
                                
<!--FOC-->
                              <div class="col-xs-6 col-sm-2 col-md-3 col-lg-3 col-xl-3 q-pl-md">
                                <div class="row" :class="$q.screen.width<599 ? 'dialog_separator': ''">
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
                          </div>
                          <div class="row col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-md" :class="!edit_child ? 'two_column_left': ''">
                            <div class="row ">
<!--Unit Price--> 
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
<!--Discount(+)/Surcharge(-)-->
                          <div class="col-xs-8 col-sm-7 col-md-6 col-lg-6 col-xl-6 q-pl-md">
                            <div class="row">
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

                        <div class="row col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <div class="col-xs-6 col-sm-3 col-md-3 col-lg-3 col-xl-3 q-pr-md">
                            <div class="row ">
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
                              </div> <!--Disc1Type -->
                            </div>
                          </div>

                          <div class="col-xs-6 col-sm-3 col-md-3 col-lg-3 col-xl-3 q-pr-md" :class="$q.screen.width >599 ? 'two_column_left' : ''">
                            <div class="row ">
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

                          <div class="col-xs-6 col-sm-3 col-md-3 col-lg-3 col-xl-3 q-pl-md">
                            <div class="row" :class="$q.screen.width<599 ? 'dialog_separator': ''">
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
                              </div><!--Disc2Type -->
                            </div>
                          </div>

                          <div class="col-xs-6 col-sm-3 col-md-3 col-lg-3 col-xl-3 q-pl-md">
                            <div class="row " :class="$q.screen.width<599 ? 'dialog_separator': ''">
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
                        <div class="row col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <div class="col-xs-6 col-sm-4 col-md-6 col-lg-6 col-xl-6 q-pr-md">
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
                        <div class="row col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-md">
                            <div class="row">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <!--Rebate Amount-->
                                <!-- <Input
                                :autofocusclick="true"
                                :no_label="false"
                                :label="$language('D0111')"
                                :readonly="json.BillStatus==1"
                                v-on:change="handleChangeRebateAmount"
                                v-model="jsonChild.rebate_value"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" /> -->

                                <!--Place the rules on the main pages because they need to perform a check,
                                   ensuring that it cannot exceed the value of 'NetUnitPrice'. -->
                                <InputRules
                                :autofocusclick="true"
                                :no_label="false"
                                :label="$language('D0111')"
                                :readonly="json.BillStatus==1"
                                v-on:change="handleChangeRebateAmount"
                                v-model="jsonChild.rebate_value"
                                :rules="[validateRebateAmount]"
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
                                :label="$language('D0112')"
                                :readonly="json.BillStatus==1"
                                v-on:change="handleChangeFuturePrice"
                                v-model="jsonChild.price_future"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                              </div><!--Future Price-->
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
<!-- when add the new PO DETAIL -->
      <q-card-actions v-if="json.BillStatus == 0" class="dialog_action" style="margin-bottom:16px; padding-right: 16px;">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" align="right">
            <Button_icon v-if="!edit_child" :readonly="false" :flat="true" :font_color="'white'" :color="'#1E90FF'" :text="$language('D0024')" :outline="false" size="15px"
            v-on:receiveClick="handleChild('save&add')" class="primary_actions_button"/><!--ADD-->

            <span v-if="edit_child" class="q-pl-xs" />
            <!--SAVE-->
            <Button_icon v-if="edit_child" :readonly="false" :flat="true" :font_color="'white'" :color="'#1E90FF'" :text="$language('D0020')" :outline="false" size="15px"
            v-on:receiveClick="handleChild('save')" class="primary_actions_button"/>
          </div>
      </q-card-actions>

      <q-inner-loading
        :showing="showAddLoading"
        color="primary"
      />
    </q-card>
  </q-dialog>

  <q-dialog v-model="search_item" persistent :position="$q.screen.width > 599 ? 'top' : 'bottom'">
    <!-- :title="search_supplier ? 'Supplier' : 'Item'" -->
    <SearchPopUp
      :select_row="Object.keys(selected_row).length != 0"
      :title="search_supplier ? $language('D0025') : $language('D0044')"
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
      custom_pagination
      customStyle="margin-bottom: 10px;"
    />
  </q-dialog>
  <!-- dialog for add and edit  -->
  <q-dialog v-model="receiving_methods" persistent :position="$q.screen.width > 599 ? 'top' : 'bottom'">
    <q-card style="text-align:left;margin-top: 5%; height:180px">
      <q-card-section class="header_top_mobile">
        <!-- <Button_icon :disable="showAddLoading" :big_round="true" :flat="true" :font_color="'#928f8f'" :color="'rgba(255, 255, 255, 0.5)'" :icon="'arrow_back_ios'" :outline="true" size="12px" class="custom_back_button" @click="back()" /> -->
      <div class="text-right">
        <q-btn icon="close" flat round dense v-close-popup :disable="showAddLoading || showAddLoading2"/>
      </div>

      </q-card-section>

      <q-card-section class="q-pt-none card_sides">
        <div  v-if="json.BillStatus == 0" class="row q-pl-md q-pr-md" style="gap:10px; ">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" @click="addButtonCreatePOChild('item')">
          <div class="row justify-center items-center" style="width: 100%; height: 60px;">
            <div class="q-pr-sm">
              <Button_icon :flat="false" :icon="'add'" v-on:receiveClick="addButtonCreatePOChild('item')" :font_color="'white'" :color="'primary'" :outline="false" size="16px"
              :text="$language('D0152')" class="dialog_detail_add_button"/><!--   Add Item Details -->
            </div>
            <!-- <div>
              {{ $language('D0152') }}
              
            </div> -->
          </div>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" @click="supplierItemlist()" > <!--style="border-left: 1px solid #cecaca; cursor: pointer" -->
          <div class="row justify-center items-center" style="width: 100%; height: 60px;">
            <div class="q-pr-sm">
              <Button_icon :flat="false" :icon="'add'" v-on:receiveClick="supplierItemlist()" :font_color="'white'" :color="'primary'" :outline="false" size="16px"
              :text="$language('D0153')" class="dialog_detail_add_button"/><!--  Supplier Item List  -->
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
  <q-dialog v-model="supplier_item_list_popup" persistent :position="$q.screen.width > 599 ? 'top' : 'bottom'">
    <q-card style="width: 864px; max-width: 98vw;margin-top: 3%;border-radius: 8px"><!--;text-align:center-->
      <q-card-section v-if="$q.screen.width < 600" class="row header_top_mobile">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div class="text-subtitle1 mobile_dialog_bottom" style="padding:16px 24px;margin-top: 0px;box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);">{{ $language('D0153') }}<br></div><!--Supplier Item List-->
        </div>
        <div class="custom_close_button">
          <q-btn icon="close" flat round dense @click="sil_close()" :disable="false"/>
        </div>
      </q-card-section>

      <q-card-section v-else class=" row theme_color dialog_header" style="height:56px;padding: 8px 24px; border-bottom: 1px solid #a7bbcb;">
          <div class="text-subtitle1 header_text" style="margin-top: 5px;">{{ $language('D0153') }}<br></div><!--Supplier Item List-->
          <q-space />
          <q-btn icon="close" flat round dense @click="sil_close()" :disable="false"/>
      </q-card-section>

      <q-card-section class="upload_container">
        <q-form ref="save_bulk_edit_pochild_form">
          <div class="row upload_separator_first">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <div class="row input_wrapper_right q-pt-md">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                      <SupplierItemListTable
                        hide_footer
                        :readonly_button="false"
                        :row_per_page="[0]"
                        :top_button="page_function=='EditDebitNote'"
                        v-on:add_button="addButtonCreatePOChild('item')"
                        v-on:main_action="handleAction"
                        v-on:main_edit="handleEdit"
                        v-on:main_list="handleList"
                        v-on:main_delete="handleDelete"
                        v-on:onChangeQuantity="handleSilQuantity"
                        :title="table_title"
                        :table_data="sil_table_data"
                        :table_column="sil_table_column"
                        :action_button="true"
                        :edit_button="false"
                        :view_button="false"
                        :delete_button="true"
                        :flat_status="true"
                        :bordered_status="true"
                        v-on:receiveRequestTable="handleSilTableChange"
                        />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </q-form>
      </q-card-section>

      <q-card-actions v-if="$q.screen.width < 600" class="dialog_action" style="padding: 0px 16px 16px 16px;">
        <div class="row full-width">
          <Button_icon class="full-width dialog_done_button" :small_round="true" :text="$language('D0159')"
          :flat="false" :font_color="'white'" :color="'primary'" :outline="false" size="16px" @click="handleSilChild()"/><!--DONE-->
        </div>
      </q-card-actions>

<!-- supplier item list SAVE -->
      <q-card-actions v-if="$q.screen.width > 599" class="dialog_action" style="padding-bottom: 16px; padding-right: 16px;">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" align="right">
            <Button_icon :readonly="false" :flat="true" :font_color="'white'" :color="'#1E90FF'" :text="$language('D0020')" :outline="false" size="15px"
            v-on:receiveClick="handleSilChild()" class="primary_actions_button"/><!--SAVE-->
          </div>
      </q-card-actions>

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

  <q-dialog v-model="warning_report_dialog" persistent position="top">
    <q-card style="width: 864px; max-width: 98vw;text-align:center;margin-top: 2%;border-radius: 8px">

      <q-card-section :class="$q.screen.width > 599 ? 'theme_color row items-center' : 'theme_color row items-center'" style="height:56px; padding: 8px 24px; border-bottom: 1px solid #a7bbcb;">
        <div class="dialog_confirmation_title">PO Print</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup :disable="showAddLoading"/>
      </q-card-section>

      <q-card-section>
        <!-- <span class="q-ml-sm custom_selection_font">{{general_body}}</span> -->

        <!--  <q-table
            flat
            dense
            bordered
            :table_data="rows_print"
            :table_column="columns_print"
            row-key="name"
            hide-bottom
          />  -->

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
                  :action_button="true"
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
        <q-btn outline size="12px" flat :label="$language('D0116')" font_color="#29292A" color="#29292A" class="dialog_confirm_cancel_button" v-close-popup />
        <q-btn size="12px" :flat="false" :outline="false" label="Print" font_color="white" :color="'primary'" class="dialog_confirm_print_button" @click="handlePrintWarning" />
      </q-card-actions>

      <q-inner-loading
        :showing="printLoading"
        color="primary"
      />
    </q-card>
  </q-dialog>

  <q-dialog  v-model="surcharge_discount_dialog" persistent position="top">
    <q-card  style="width: 700px; max-width: 98vw;margin-top: 5%;border-radius: 8px">
      <q-card-section class=" row theme_color dialog_header" style="height: 56px; padding: 8px 24px;">
          <div class="text-subtitle1 header_text" style="margin-top: 5px;">Surcharge/Discount<br></div>
          <q-space />
          <q-btn icon="close" flat round dense :disable="false" @click="closeDialogSurcharge"/>
      </q-card-section>

      <q-card-section class="upload_container">
        <q-form ref="save_edit_pochild_form">
          <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <div v-if="$q.screen.width > 599 && $q.screen.width < 1024" class="row input_wrapper_right">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <div class="row po_details_separator">
                    <div v-if="edit_child && json.BillStatus == 0" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" align="right">
                      <Button_icon :disabled="readonly_delete" :icon="'fas fa-trash-alt'" :flat="true" :color="''" :font-color="'black'" :outline="false" size="12px" v-on:click="handleDelete(jsonChild)" class="q-mr-sm text-red" />
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-pb-md" :class="$q.screen.width > 1023 ? 'q-pl-sm': ''">
                      <div class="row po_details_custom_row ">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <div class="row col-12">
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                              <span class="dialog_radio_title">{{ $language('D0091') }}</span><!--Entry Type-->
                            </div>
                            <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                              <Radio class="dialog_radio_options" size="md" :disable="json.BillStatus==1" v-on:receiveChange="handleChangeEntryType" v-model="jsonChild.EntryType" :options="entry_type_options"  />
                            </div>
                        
                    

                    <!-- <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6"></div> -->
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <div class="row">
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                              <span class="dialog_radio_title">{{ $language('D0094') }}</span><!--Pricing Type-->
                            </div>
                            <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                              <Radio class="dialog_radio_options" size="md" :disable="json.BillStatus==1" v-on:receiveChange="handleChangePriceType" v-model="jsonChild.PriceType" :options="pricing_type_options"  />
                            </div>
                          </div>
                        </div>
                          </div>
                        </div>
                      </div>
                    </div>
<!-- screen size 599 - 1023 step4 -->
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" >
                      <div class="row" style="gap:16px">
                        <div class="row col-12">
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <div class="row">
                              <div class="" :class="edit_child ? 'col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12' : 'col-xs-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 q-pr-md'">
                                    <!-- <div class="col-xs-11 col-sm-11 col-md-11 col-lg-11 col-xl-11 q-pr-md"> -->
                                      <Input
                                      :autofocusclick="true"
                                      :no_label="false"
                                      :label="$language('D0097')"
                                      :readonly="true"
                                      v-on:change="handleChange"
                                      v-model="jsonChild.Itemcode"
                                      :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text" />
                                    <!-- </div>Item Code -->
                              </div>
                              <div v-if="!edit_child" dir="rtl" class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2" style="padding-top: 0px;">
                                <Button_icon ref="searchButton" :flat="true" :font_color="'primary'" :color="'white'" :icon="'search'" :outline="false" size="16px"
                                v-on:receiveClick="showSearchDialog()" :tooltip_message="'Search Item'" style="height:100%" class="full-width search_button_dialog search_icon_btn primary_button_font"/>
                              </div>
                            </div>
                          </div>
                        </div>
<!-- description -->      
                        <div class="row col-12">
                          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-md">
                            <Input
                            :autofocusclick="true"
                            :no_label="false"
                            :label="$language('D0098')"
                            :readonly="true"
                            v-on:change="handleChange"
                            v-model="jsonChild.Description"
                            :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                          </div><!--Description-->
    <!-- pack size -->
                          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-md">
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
                          
            <!-- artci no -->
                        <div class="row col-12">
                          <div class="col-xs-6 col-sm-6 col-md-2 col-lg-2 col-xl-2 q-pr-md">
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
                                  
          <!-- barcode -->
                          <div class="col-xs-6 col-sm-6 col-md-2 col-lg-2 col-xl-2 q-pl-md">
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
                        </div>
                            <q-separator class="separator-style"></q-separator>
            <!-- bulk -->
                              
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
                                  
                                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 q-pl-md">
                                  <div class="row" :class="$q.screen.width<599 ? 'dialog_separator': ''">
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
                              
            <!-- disc1 -->
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

                                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 q-pr-md" :class="$q.screen.width >599 ? 'two_column_left' : ''">
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
                                  <div class="row" :class="$q.screen.width<599 ? 'dialog_separator': ''">
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
            <!-- net -->
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
            <!-- rebate -->
                              <div class="row col-12">
                                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-md">
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

                                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-md">
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
                            </div>
                            
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="$q.screen.width > 1023" class="row input_wrapper_right q-pb-md">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-pb-md q-pl-sm q-gutter-y-sm">
                          <div class="row col-12">
                                <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                                  <span class="dialog_radio_title">Cost</span>
                                </div>

                                <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
                                    <Checkbox
                                          size="md"
                                          :disable="false"
                                          :no_label="true"
                                          v-model="surcharge_discount_json.build_into_cost"
                                          :dbComponentBehavior="dbComponentBehavior.text"
                                          v-on:receiveChangenewVal="handleChangeCheckbox"
                                          :table="true"
                                          />
                                </div>
                          </div>
                          <div class="row col-12">
                            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                              <span class="dialog_radio_title">DN</span>
                            </div>

                            <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
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
                    <div class="row col-12 q-gutter-y-md">
                      <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 q-pr-md">
                        <Select
                              :readonly="json.BillStatus == 1"
                              :no_label="false"
                              v-model="surcharge_discount_json.Code"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.surcharge_discount_code : oridbComponentBehavior.select"
                              :options="codeOptions"
                              v-on:receiveChange="handleSurchargeDiscountInputChange"
                              emit-value
                              />
                      </div>

                      <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                        <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Description"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="surcharge_discount_json.Description"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                      </div>

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

                      <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                        <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Value"
                              :readonly="false"
                              v-on:change="handleChange"
                              v-model="surcharge_discount_json.surcharge_disc_value"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.surcharge_value : oridbComponentBehavior.text" />
                      </div>
                    </div>
              </div>
            </div>
          </div>
        </q-form>
      </q-card-section>

      <q-card-actions v-if="json.BillStatus == 0" class="dialog_action" style="padding-right: 16px; padding-bottom: 16px">
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
import Input from 'src/components/ERP/Base/Input'
import Select from 'src/components/ERP/Base/Select'
import Datepicker from 'src/components/ERP/Base/Datepicker'
import Checkbox from 'src/components/ERP/Base/Checkbox'
import PurchaseTable from 'src/components/ERP/Purchase/PurchaseTable'
import SupplierItemListTable from 'src/components/ERP/Purchase/SupplierItemListTable'
import Button_icon from 'src/components/ERP/Base/Button_icon'
import Radio from 'src/components/ERP/Base/Radio';
import { Notify } from "quasar";
import SelectFilter from 'src/components/ERP/Base/SelectFilter'
import SearchPopUp from 'src/components/ERP/Purchase/SearchPopUp'
import SelectPlaceholder from 'src/components/ERP/Base/SelectPlaceholder'
import Textarea from'src/components/ERP/Base/Textarea' ;
import { StreamBarcodeReader } from "vue-barcode-reader";
import InputRules from 'src/components/ERP/Purchase/InputRules';
import { Loading, QSpinnerTail} from 'quasar';
import PrintListTable from 'src/components/ERP/Purchase/PrintListTable'
import SurchargeTable from 'src/components/ERP/Purchase/SurchargeTable';
import Chip from 'src/components/ERP/Base/Chip'
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
          label: this.$language('D0092'),//"Unit Price"
          value: "Unit"
        },
        {
          label: this.$language('D0093'),//"Total Price"
          value: "total"
        }
      ],
      pricing_type_options: [
        {
          label: this.$language('D0095'),//"Normal"
          value: "Norm"
        },
        {
          label: this.$language('D0096'),//"FOC"
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
      supplier_options2: [],
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
      header:'PO',
      json: {
        step: 1,
        in_kind: 0,
        tax_inclusive: 0,
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
        BillStatus: 0,
        b2b_registration:0,
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
      sil_ori_params: {},
      unit: false,
      selected_row: {},
      deleteLoading: false,
      results: [],
      search_item: false,
      search_supplier: false,
      child_no: '',
      supplier_item_list_popup: false,
      select_all: false,
      group_button: true,
      hv_item: false,
      colors: [],
      view_summary:false,
      summary:[],
      warning_report_dialog:false,
      rows_print:[],
      columns_print:[],
      surcharge_table_data:[],
      surcharge_table_column:[],
      codeOptions:[],
      surcharge_table_footer:true,
      surcharge_discount_dialog:false,
      surcharge_discount_json:{},
      edit_surcharge_action:false,
      totalDisc:"0.00",
      receiving_methods: false,
    }
  },
  components:{
    ViewSummaryDialog,
    ButtonMobile,
    Input,
    Select,
    Datepicker,
    Checkbox,
    PurchaseTable,
    SupplierItemListTable,
    Button_icon,
    SelectFilter,
    Radio,
    // SelectPlaceholder,
    Textarea,
    SearchPopUp,
    InputRules,
    PrintListTable,
    SurchargeTable,
    Chip,
  },
  computed: {
    // chipText() {
    //   return `${this.$language('D0030')} query: {  refno: payload.RefNo  }`;
    // },
    dbComponentBehavior() {
      return this.$store.getters['dbComponentBehavior/byLanguage']('erp')
    },
  },
  mounted() {
    // var bbbb = this.$route.query.refno;
    var bbbb = this.json.RefNo;
  },

  async created () {
    this.showAddLoading = true;
    var currentdate = new Date();
    // console.log('currency_sign',this.currency_sign);
    // console.log('session_outlet_guid',this.session_outlet_guid);
    var current_date_format = currentdate.getFullYear()+"-"+('0' + (currentdate.getMonth()+1)).slice(-2)+"-"+('0' + currentdate.getDate()).slice(-2);

    this.json.PODate = current_date_format;
    this.json.DeliverDate = current_date_format;

    var payload = {
      params: {
        type: 'S',
        skip: 0,
        limit: 99999999,
        language: this.language
      }
    }

    var lpayload = {
      params: {
        language: this.language
      }
    }


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

    var supcus = await this.getSupcus(payloadS);


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
        label: sample.Code+ ' - ' + sample.Name,
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
    this.location_options2 = loc_opt;
    this.json.loc_group = array_logGrop[0].value
    this.json.Location = loc_opt[0].value


    if(this.page_function == 'EditPurchaseOrder')
    {
      var cpayload =
      {
        params: {
          refno: this.$route.query.refno
        }
      }

      var cdata = await this.getPochild(cpayload);
      var cresults = cdata.data;

      this.supplier_readonly = cresults.length > 0;

      var refno = this.$route.query.refno;

      // if(refno == undefined || refno == '')
      // {
      //   this.$router.push('/ERP/purchase/PurchaseOrder')
      //   return;
      // }

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

      // created
      this.json = filtered_transmain;
      this.status = this.json.BillStatus == 1;

      var filter_outlet = array_logGrop.filter((entry)=>{
        return entry.value == this.json.loc_group;
      })
      console.log('filter_outlet',filter_outlet);
      this.json.ChildNo = this.formatAmount(cresults.length,'qty');
      this.json.Branch = filter_outlet[0].value;
      this.json.step = this.$route.query.step ? Number(this.$route.query.step) : 1;
      console.log(' this.json', this.json);
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
    await this.handleSurchargeTableChange();
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
          this.json.Location = '';
          var refno = this.$route.query.refno;

          var payload = {
            RefNo: refno
          }

          var data = await this.getFilterPomain(payload);
          var filtered_transmain = data.response;

         // console.log('filtered_transmain',filtered_transmain.BillStatus);
          var rebate_amt = filtered_transmain.rebate_amt;
          var total_include_tax = filtered_transmain.total_include_tax;
          var Total = filtered_transmain.Total;
          var SubTotal1 = filtered_transmain.SubTotal1;
          this.json.loc_group = filtered_transmain.loc_group;
          this.json.Location = filtered_transmain.Location;
          this.json.SCode = filtered_transmain.SCode;
          this.json.rebate_amt = this.formatAmount(rebate_amt, '$');
          this.json.total_include_tax = this.formatAmount(total_include_tax, '$');
          this.json.Total = this.formatAmount(Total, '$');
          this.json.SubTotal1 = this.formatAmount(SubTotal1, '$');



   //       console.log('this.json.step',this.json.step);
          if(this.json.step == 4){
            this.handleSurchargeTableChange()
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


          }

      },
      async handleChangeGroup()
      {

      //  this.loadingTable =false;
        var RefNo = this.json.RefNo;
        console.log('this.table_data.data.results',this.table_data.data.results);
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

        var data = {};

        // await this.$store.dispatch('purchase/trigger_item_tagging', payload).then(() => {
        //   data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_item_tagging']));
        // });
        this.showAddLoading = true;
        var object_pass = {
              dispatch: 'purchase/trigger_item_tagging',
              getter: 'purchase/get_item_tagging',
              app: this,
              payload: payload,
         };

        var dispatch_response = await this.$dispatch(object_pass);
        console.log('dispatch_response',dispatch_response);


        if(dispatch_response.status)
        {
          this.showAddLoading = false;
          this.table_function(this.ori_params)
          var response_msg = dispatch_response.response.msg

          this.showNotify("positive", response_msg);
        }
        else
        {
          this.showAddLoading = false;
          // var show_error = "";
          // var error_response = dispatch_response.response;
          // console.log('error_response',error_response);

          // Object.keys(error_response).forEach((loop_index)=>{
          //   if(loop_index !== 'status_code')
          //   {
          //     var temp_error = {};
          //     var error_message = "";
          //     Object.keys(error_response[loop_index]).forEach((header,cindex)=>{
          //         error_message = error_response[loop_index];
          //     });
          //     temp_error = loop_index + " - " + error_message + '<br>';
          //     show_error += temp_error;
          //   }
          // });
          //close foreach error message
       //   console.log('dispatch_response',dispatch_response);
          var response = JSON.parse(dispatch_response.response)

          this.showNotify('negative', response.detail);
          this.showAddLoading = false;
        }
      },
      async handleChangeUngroup()
      {
        var RefNo = this.json.RefNo;
        var Line = [];
        console.log('this.table_data.data.results',this.table_data.data.results);
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

        var data = {};

        // await this.$store.dispatch('purchase/trigger_item_untagging', payload).then(() => {
        //   data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_item_untagging']));
        // });
        var object_pass = {
              dispatch: 'purchase/trigger_item_untagging',
              getter: 'purchase/get_item_untagging',
              app: this,
              payload: payload,
         };

        console.log('payload',payload);

        var dispatch_response = await this.$dispatch(object_pass);
        var status = data.status;

       // console.log('dispatch_response',dispatch_response);

        if(dispatch_response.status)
        {
          this.showAddLoading = false;
          this.table_function(this.ori_params)
          console.log('dispatch_response',dispatch_response);
          this.showNotify("positive", dispatch_response.response.msg);
        }
        else
        {
          // var show_error = "";
          // var error_response = data.response;
          // Object.keys(error_response).forEach((loop_index)=>{
          //   if(loop_index !== 'status_code')
          //   {
          //     var temp_error = {};
          //     var error_message = "";
          //     Object.keys(error_response[loop_index]).forEach((header,cindex)=>{
          //         error_message = error_response[loop_index];
          //     });
          //     temp_error = loop_index + " - " + error_message + '<br>';
          //     show_error += temp_error;
          //   }
          // });
          //close foreach error message
          var response = JSON.parse(dispatch_response.response)

          this.showNotify('negative', response.detail);

          this.showAddLoading = false;
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
      handleSilQuantity(element, index, Qty, FOCQty, BulkQty, BulkFOC)
      {
        if(element == 'Qty')
        {
          if((Qty != 0 && Qty != '0') && (BulkQty != 0 && BulkQty != '0'))
          {
            this.showNotify('negative', this.$language('C0007'))//Bulk Qty already has value.
            Qty = 0;
          }
        }
        else if(element == 'FOCQty')
        {
          if((FOCQty != 0 && FOCQty != '0') && (BulkFOC != 0 && BulkFOC != '0'))
          {
            this.showNotify('negative', this.$language('C0008'))//Bulk FOC already has value.
            FOCQty = 0;
          }
        }
        else if(element == 'BulkQty')
        {
          if((Qty != 0 && Qty != '0') && (BulkQty != 0 && BulkQty != '0'))
          {
            this.showNotify('negative', this.$language('C0009'))//'Qty already has value.'
            BulkQty = 0;
          }
        }
        else if(element == 'BulkFOC')
        {
          if((FOCQty != 0 && FOCQty != '0') && (BulkFOC != 0 && BulkFOC != '0'))
          {
            this.showNotify('negative', this.$language('C0010'))//'FOC Qty already has value.'
            BulkFOC = 0;
          }
        }

        this.sil_table_data.data.results[index].Qty = Qty;
        this.sil_table_data.data.results[index].FOCQty = FOCQty;
        this.sil_table_data.data.results[index].BulkQty = BulkQty;
        this.sil_table_data.data.results[index].BulkFOC = BulkFOC;
      },
      supplierItemlist()
      {
        this.supplier_item_list_popup = true;
      },
      handleChangePriceType(newVal)
      {
        if(newVal == 'FOC')
        {
          this.jsonChild.Qty_foc = '0';
          this.jsonChild.UnitPrice = '0.00'
          this.jsonChild.DiscAmt = '0.00'
          this.jsonChild.Disc1Type = '%'
          this.jsonChild.Disc1value = '0.00'
          this.jsonChild.Disc2Type = '%'
          this.jsonChild.Disc2Value = '0.00'
          this.jsonChild.NetUnitPrice = '0.0000'
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

       // console.log('table_data',this.table_data);
        var currentdate = new Date();
        var current_date_format = currentdate.getFullYear()+"-"+('0' + (currentdate.getMonth()+1)).slice(-2)+"-"+('0' + currentdate.getDate()).slice(-2)
        +" "+('0' + currentdate.getHours()).slice(-2) + ":" + ('0' + currentdate.getMinutes()).slice(-2) + ":" + ('0' + currentdate.getSeconds()).slice(-2);
        if(this.json.BillStatus==0)
        {
          if(this.table_data.data.results.length == 0){
            this.showNotify('negative','No Item exist, not allowed to post')
            this.deleteLoading =false;
          // console.log('No Item exist, not allowed to post');
            return;
          }else if(current_date_format > this.json.expiry_date){
            this.deleteLoading =false;
            this.showNotify('negative','Doc has already expired. Not allowed to post')
          // console.log('No Item exist, not allowed to post');
            return;
          }
        }
        var payload = {
          RefNo: this.$route.query.refno,
          language: this.language
        }

        var data = {};

        if(this.json.BillStatus==0)
        {
          // await this.$store.dispatch('purchase/trigger_posting_po', payload).then(() => {
          //   data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_posting_po']));
          // });

          var set_query = {
          "ERefNo":this.json.RefNo,
          // "EUser":this.user_name,
          // "getuser":this.user_name
          };

          var json_runscript_multi = {
          params:[
          {
            "lookupdb_name": this.session_outlet_guid,
            "trans_group": 'PO',
            "trans_type": 'Supplier White List',
             "set_query":set_query
          },
           {
            "lookupdb_name": this.session_outlet_guid,
            "trans_group": 'PO',
            "trans_type": '#Before post',
             "set_query":set_query
          },
          {
            "lookupdb_name": this.session_outlet_guid,
            "trans_group": 'PO',
            "trans_type": '@After post',
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
        else if(this.json.BillStatus==1)
        {
          // await this.$store.dispatch('purchase/trigger_unposting_po', payload).then(() => {
          //   data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_unposting_po']));
          // });

          var set_query = {
            "ERefNo":this.json.RefNo,
            "EUser":this.user_name,
            "getuser":this.user_name
          };

        var json_runtime_runscript_multi = {
          params:[
           {
            "lookupdb_name": this.session_outlet_guid,
            "trans_group": 'PO',
            "trans_type": '#Before unpost',
             "set_query":set_query
          },
          {
            "lookupdb_name": this.session_outlet_guid,
            "trans_group": 'PO',
            "trans_type": '@After unpost',
             "set_query":set_query
          }
        ]
      };

        var payload_runtime_runscript_multi ={
          "pass_json": json_runtime_runscript_multi
        }

          var dispatch_response = await this.runscript_multi(payload_runtime_runscript_multi)
          console.log('dispatch_response',dispatch_response);
        }

       if(dispatch_response.status){
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

       }else{
        this.showNotify("negative", dispatch_response.message );
        this.post_transmain = false;
        this.deleteLoading = false;

       }


      },
      handleChangeDiscAmt()
      {
        var discAmt = this.jsonChild.DiscAmt;

        if (!discAmt.match(/^[\d%.+\-]+$/)) {
          this.showNotify('negative', this.$language('C0011'));//"Invalid Discount(+)/Surcharge(-)"
          this.jsonChild.DiscAmt = '0.00'
          return;
        };

        this.jsonChild.Disc1Type = '%';
        this.jsonChild.Disc1value = '0.00';
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

        if(this.jsonChild.Disc1value != '0.00' && this.jsonChild.Disc1value != 'NaN')
        {
          this.jsonChild.DiscAmt = '0.00'
        }

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
      validateRebateAmount(val){
        console.log('run validateRebateAmount');
        const isValid = !!val ;
        const isValid2 = parseFloat(val) <= parseFloat(this.jsonChild.NetUnitPrice);

        if (!isValid) {
          return 'Field is required';
        } else if (!isValid2) {
          return 'The value cannot be greater than Net Price.';
        } else {
          return true; // Return true if both conditions are satisfied
        }
      },
      handleChangeRebateAmount(newVal)
      {

        this.jsonChild.rebate_value = this.formatAmount(this.jsonChild.rebate_value,'$');

        // var NetUnitPrice =  this.formatAmount(this.jsonChild.NetUnitPrice,'$');
        // var key_amount =  this.formatAmount(newVal,'$');
      //  console.log('key_amount',key_amount);
      //   console.log('NetUnitPrice',NetUnitPrice);
        // if( parseFloat(key_amount) > parseFloat(NetUnitPrice)){
        //   // console.log('check');
        //   //  this.jsonChild.rebate_value = 0;
        //    this.showNotify('negative','Rebate Amount cannot larger than Net Price');
        //    return ;
        // }
      },
      handleChangeFuturePrice()
      {
        this.jsonChild.price_future = this.formatAmount(this.jsonChild.price_future,'$');
      },
     async handleChangeQty(newVal)
      {
        this.jsonChild.SetQty = this.formatAmount(newVal,'qty');
        this.calculation();
      },
      handleChangeBulkQty(newVal)
      {
        this.jsonChild.BulkQty = this.formatAmount(newVal,'qty');
        var OrderLotSize = this.unformatAmount(this.jsonChild.OrderLotSize);
        this.jsonChild.SetQty = this.formatAmount(newVal*OrderLotSize,'qty');
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
          var DiscAmt = this.jsonChild.DiscAmt;
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
            if(DiscAmt != '0.00')
            {
              var deductValue = 0;
              DiscAmt = DiscAmt.replace(/([+\-])/g, ' $1');

              var operations = DiscAmt.split(' ');

              operations = operations.filter(op => op.trim() !== '');

              for (var element of operations) {
                if (element.includes('%')) {
                  var discountPercentage = parseFloat(element.replace('%', '')) / 100;
                  var discountAmount = UnitPrice * discountPercentage;

                  deductValue += discountAmount;
                } else {
                  var amountToDeduct = parseFloat(element);

                  deductValue += amountToDeduct;
                }
              }

              this.jsonChild.Disc1Type = '$';
              this.jsonChild.Disc1value = this.formatAmount(deductValue, '$');
              Disc1value = deductValue;
            }

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

            // var result = (SetQty * after2Disc)+(round_adj-DiscAmt);
            var result = (SetQty * after2Disc);
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
      sil_close()
      {
        this.supplier_item_list_popup = false;
      },
      close()
      {
        this.jsonChild = {};
        this.barcode_options = []
        this.search.showTable = false;
        this.modify_child = false;
      },
      closeSearchItem()
      {
        this.search.showTable = false;
        this.search_item = false;
      },
      async handleDeleteLine(){
        this.deleteLoading = true;
        this.showAddLoading2 = true;

        if(this.json.BillStatus == 1)
        {
            this.showNotify("negative",this.$language('C0012'));//"This Doc already posted."
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

          if(this.page_function == 'EditPurchaseOrder')
          {
            payload.language = this.language;

            await this.$store.dispatch('purchase/trigger_delete_pochild', payload).then(() => {
              data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_pochild_status']));
            });
          }
          console.log('data',data);
          if(data.status == "success")
          {
            var response = data.response
            var Total = this.formatAmount(response.Total,'$');
            var SubTotal1 = this.formatAmount(response.SubTotal1,'$');
            var total_include_tax = this.formatAmount(response.total_include_tax,'$');

            this.json.Total = Total;
            this.json.total_include_tax = total_include_tax;
            this.json.SubTotal1 = SubTotal1;

            this.$nextTick(async ()=>{
              this.showNotify("positive",this.$language('C0004'));//"Delete successfully"
              this.modify_child = false;
              this.delete_child = false;
              this.deleteLoading = false;
              this.showAddLoading2 = false;
              this.table_function(this.ori_params);


            });
          }
          else
          {
            this.showNotify("negative",this.$language('C0013'));//"Please try again."
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
      async handleSilChild()
      {
        this.showAddLoading = true;
        var results = this.sil_table_data.data.results;
        var hv_qty = false;
        console.log('results',results);
        console.log('sil_table_data', this.sil_table_data);
        var bulk_data_create_pochild =[];
        for(var i in results)
        {
          var obj = results[i];
          if((obj.Qty != 0 && obj.Qty != '0') ||
          (obj.FOCQty != 0 && obj.FOCQty != '0') ||
          (obj.BulkQty != 0 && obj.BulkQty != '0') ||
          (obj.BulkFOC != 0 && obj.BulkFOC != '0'))
          {
            var Qty_foc = '';
            var PriceType = (obj.Qty != 0 && obj.Qty != '0') || (obj.BulkQty != 0 && obj.BulkQty != '0') ? 'Norm' : 'FOC';
            var BulkQty = '';
            var Qty = '';

            if(PriceType == 'Norm')
            {
              if(obj.BulkQty != 0 && obj.BulkQty != '0')
              {
                Qty = this.unformatAmount(obj.BulkQty) * this.unformatAmount(obj.PackSize);
                BulkQty = this.unformatAmount(obj.BulkQty);
              }
              else
              {
                Qty = this.unformatAmount(obj.Qty);
                BulkQty = '0';
              }

              if(obj.BulkFOC != 0 && obj.BulkFOC != '0')
              {
                Qty_foc = this.unformatAmount(obj.BulkFOC) * this.unformatAmount(obj.PackSize);
              }
              else
              {
                Qty_foc = this.unformatAmount(obj.FOCQty);
              }
            }
            else if(PriceType == 'FOC')
            {
              Qty_foc = '0';
              BulkQty = '0';

              if(obj.BulkFOC != 0 && obj.BulkFOC != '0')
              {
                Qty = this.unformatAmount(obj.BulkFOC) * this.unformatAmount(obj.PackSize);
              }
              else
              {
                Qty = this.unformatAmount(obj.FOCQty);
              }
            }

            var RefNo = this.json.RefNo;
            var PriceType = PriceType;
            var Barcode = obj.barcode;
            var Itemcode = obj.Itemcode;
            var Qty = Qty;
            var BulkQty = BulkQty;
            var Qty_foc = Qty_foc;
            var UnitPrice = this.unformatAmount(obj.v_netunitprice);
            var Disc1Type = obj.v_disc1type;
            var Disc1Value = obj.v_disc1value;
            var Disc2Type = obj.v_disc2type;
            var Disc2Value = obj.v_disc2value;
            var NetUnitPrice = this.unformatAmount(obj.v_netunitprice);
            var DiscAmt = '0';
            var TotalPrice = this.unformatAmount(obj.v_netunitprice) * Qty;

            var itemobj = {
              "RefNo": RefNo,
              "EntryType": "Unit",
              "PriceType": PriceType,
              "Barcode": Barcode,
              "Itemcode": Itemcode,
              "Qty": Qty,
              "BulkQty": BulkQty,
              "Qty_foc": Qty_foc,
              "UnitPrice": UnitPrice,
              "Disc1Type": Disc1Type,
              "Disc1Value": Disc1Value,
              "Disc2Type": Disc2Type,
              "Disc2Value": Disc2Value,
              "NetUnitPrice": NetUnitPrice,
              "DiscAmt": DiscAmt,
              "TotalPrice": TotalPrice,
              "user": this.user_name,
              "language": this.language,
            }

            itemobj.Description = obj.Description;
            bulk_data_create_pochild.push(itemobj);


          }

          if(!hv_qty)
          {
            if((obj.Qty != 0 && obj.Qty != '0') ||
            (obj.FOCQty != 0 && obj.FOCQty != '0') ||
            (obj.BulkQty != 0 && obj.BulkQty != '0') ||
            (obj.BulkFOC != 0 && obj.BulkFOC != '0'))
            {
              hv_qty = true;
            }
          }
        }


        var payload = {
        	"pass_json": {
             user: this.user_name,
             language:this.language,
             data: bulk_data_create_pochild,
          }//pass_json should be the field or data wish to be created.
        };
        console.log('payload',payload);
        var object_pass = {
            "dispatch": 'purchase/trigger_post_bulk_create_pochild',
            "getter": 'purchase/get_bulk_create_pochild',
            "app": this,
          	"payload": payload
        };

        var dispatch_response = await this.$dispatch(object_pass);
        console.log('dispatch_response',dispatch_response);

       // console.log('bulk_data_create_pochild',bulk_data_create_pochild);
        if(dispatch_response.status){
            this.showAddLoading = false;
            this.showNotify("positive", this.$language('C0014'));//"Created Successfully."
            this.jsonChild = {};
            this.search.showTable = false;
            this.modify_child = false;
            this.supplier_item_list_popup = false;
            this.table_function(this.ori_params);
        }else{
         //  console.log('dispatch_response',dispatch_response);
           var response = JSON.parse(dispatch_response.response);
           this.showNotify("negative",response.detail);
           //this.showNotify("negative",this.$language('C0013')); //Please Try Again
           this.showAddLoading = false;
        }
        if(!hv_qty)
        {
          this.showNotify('negative', 'No qty key in.')
        }
      },
      // async handleSilChild()
      // {
      //   var results = this.sil_table_data.data.results;
      //   var hv_qty = false;
      //   console.log('results',results);
      //   console.log('sil_table_data', this.sil_table_data);
      //   for(var i in results)
      //   {
      //     var obj = results[i];
      //     if((obj.Qty != 0 && obj.Qty != '0') ||
      //     (obj.FOCQty != 0 && obj.FOCQty != '0') ||
      //     (obj.BulkQty != 0 && obj.BulkQty != '0') ||
      //     (obj.BulkFOC != 0 && obj.BulkFOC != '0'))
      //     {
      //       var Qty_foc = '';
      //       var PriceType = (obj.Qty != 0 && obj.Qty != '0') || (obj.BulkQty != 0 && obj.BulkQty != '0') ? 'Norm' : 'FOC';
      //       var BulkQty = '';
      //       var Qty = '';

      //       if(PriceType == 'Norm')
      //       {
      //         if(obj.BulkQty != 0 && obj.BulkQty != '0')
      //         {
      //           Qty = this.unformatAmount(obj.BulkQty) * this.unformatAmount(obj.PackSize);
      //           BulkQty = this.unformatAmount(obj.BulkQty);
      //         }
      //         else
      //         {
      //           Qty = this.unformatAmount(obj.Qty);
      //           BulkQty = '0';
      //         }

      //         if(obj.BulkFOC != 0 && obj.BulkFOC != '0')
      //         {
      //           Qty_foc = this.unformatAmount(obj.BulkFOC) * this.unformatAmount(obj.PackSize);
      //         }
      //         else
      //         {
      //           Qty_foc = this.unformatAmount(obj.FOCQty);
      //         }
      //       }
      //       else if(PriceType == 'FOC')
      //       {
      //         Qty_foc = '0';
      //         BulkQty = '0';

      //         if(obj.BulkFOC != 0 && obj.BulkFOC != '0')
      //         {
      //           Qty = this.unformatAmount(obj.BulkFOC) * this.unformatAmount(obj.PackSize);
      //         }
      //         else
      //         {
      //           Qty = this.unformatAmount(obj.FOCQty);
      //         }
      //       }

      //       var RefNo = this.json.RefNo;
      //       var PriceType = PriceType;
      //       var Barcode = obj.barcode;
      //       var Itemcode = obj.Itemcode;
      //       var Qty = Qty;
      //       var BulkQty = BulkQty;
      //       var Qty_foc = Qty_foc;
      //       var UnitPrice = this.unformatAmount(obj.v_netunitprice);
      //       var Disc1Type = obj.v_disc1type;
      //       var Disc1Value = obj.v_disc1value;
      //       var Disc2Type = obj.v_disc2type;
      //       var Disc2Value = obj.v_disc2value;
      //       var NetUnitPrice = this.unformatAmount(obj.v_netunitprice);
      //       var DiscAmt = '0';
      //       var TotalPrice = this.unformatAmount(obj.v_netunitprice) * Qty;

      //       var payload = {
      //         "RefNo": RefNo,
      //         "EntryType": "Unit",
      //         "PriceType": PriceType,
      //         "Barcode": Barcode,
      //         "Itemcode": Itemcode,
      //         "Qty": Qty,
      //         "BulkQty": BulkQty,
      //         "Qty_foc": Qty_foc,
      //         "UnitPrice": UnitPrice,
      //         "Disc1Type": Disc1Type,
      //         "Disc1Value": Disc1Value,
      //         "Disc2Type": Disc2Type,
      //         "Disc2Value": Disc2Value,
      //         "NetUnitPrice": NetUnitPrice,
      //         "DiscAmt": DiscAmt,
      //         "TotalPrice": TotalPrice,
      //         "user": this.user_name,
      //         "language": this.language,
      //       }

      //       payload.Description = obj.Description;

      //       var data = {};

      //       await this.$store.dispatch('purchase/trigger_create_pochild', payload).then(() => {
      //         data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_pochild_status']));
      //       });

      //       var status = data.status;


      //       if(status == "success")
      //       {
      //         this.showAddLoading = false;
      //         this.showNotify("positive", this.$language('C0014'));//"Created Successfully."

      //         this.jsonChild = {};
      //         this.search.showTable = false;
      //         this.modify_child = false;
      //         this.supplier_item_list_popup = false;
      //         this.table_function(this.ori_params);
      //       }
      //       else
      //       {
      //         var show_error = "";

      //         var error_response = data.response;
      //         Object.keys(error_response).forEach((loop_index)=>{
      //           if(loop_index !== 'status_code')
      //           {
      //             var temp_error = {};
      //             var error_message = "";
      //             Object.keys(error_response[loop_index]).forEach((header,cindex)=>{
      //                 error_message = error_response[loop_index];
      //             });
      //             temp_error = loop_index + " - " + payload.Itemcode + " - " + payload.Description + " - " + error_message + '<br>';
      //             show_error += temp_error;
      //           }
      //         });//close foreach error message

      //         this.showNotify('negative', show_error);

      //         this.showAddLoading = false;
      //       }

      //     }

      //     if(!hv_qty)
      //     {
      //       if((obj.Qty != 0 && obj.Qty != '0') ||
      //       (obj.FOCQty != 0 && obj.FOCQty != '0') ||
      //       (obj.BulkQty != 0 && obj.BulkQty != '0') ||
      //       (obj.BulkFOC != 0 && obj.BulkFOC != '0'))
      //       {
      //         hv_qty = true;
      //       }
      //     }
      //   }

      //   if(!hv_qty)
      //   {
      //     this.showNotify('negative', 'No qty key in.')
      //   }
      // },
      async handleChild(newVal){
        this.showAddLoading = true;

        if(this.json.BillStatus == 1)
        {
            this.showNotify("negative",this.$language('C0012'));//"This Doc already posted."
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
                this.showNotify("negative",this.$language('C0015'));//"Please make sure all field is correct."
                this.showAddLoading = false;
                return;
            }

            if(this.jsonChild.SetQty <= 0 ){
              this.showAddLoading = false;
              this.showNotify("negative", this.$language('C0016'));//"Qty cannot less than or equal to 0."
              return;
            }

            if(this.jsonChild.PriceType =='Norm' && this.jsonChild.UnitPrice <= 0 )
            {
              this.showAddLoading = false;
              this.showNotify("negative", this.$language('C0017'));//"Price cannot less than or equal to 0."
              return;
            }

            // if(this.jsonChild.Disc1value < 0 ){
            //   this.showAddLoading = false;
            //   this.showNotify("negative", this.$language('C0018'));//"Disc1value cannot less than 0."
            //   return;
            // }

            // if(this.jsonChild.Disc2Value < 0 ){
            //   this.showAddLoading = false;
            //   this.showNotify("negative", this.$language('C0019'));//"Disc2Value cannot less than 0."
            //   return;
            // }

            // if(this.jsonChild.DiscAmt < 0 ){
            //   this.showAddLoading = false;
            //   this.showNotify("negative", this.$language('C0020'));//"Disc Amt cannot less than 0."
            //   return;
            // }

            if(this.jsonChild.PriceType =='Norm' && this.jsonChild.TotalPrice <= 0 )
            {
              this.showAddLoading = false;
              this.showNotify("negative", this.$language('C0021'));//"Total Price cannot less than or equal to 0."
              return;
            }


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
        // console.log(this.jsonChild.DiscAmt)
        var DiscAmt = '0.00';
        var TotalPrice = this.unformatAmount(this.jsonChild.TotalPrice);
        var rebate_value = this.unformatAmount(this.jsonChild.rebate_value);
        var price_future = this.unformatAmount(this.jsonChild.price_future);
        this.showAddLoading =true
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
            "rebate_value": rebate_value,
            "price_future": price_future,
            "user": this.user_name
          }

          if(PriceType == 'Norm')
          {
            payload.Qty_foc = this.unformatAmount(this.jsonChild.Qty_foc);
          }
          else
          {
            payload.Qty_foc = '0';
          }

          var data = {};

          payload.language = this.language;

          await this.$store.dispatch('purchase/trigger_create_pochild', payload).then(() => {
            data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_pochild_status']));
          });
          var response = data.response
          // console.log('response',response);
          var set_query = {
            "ERefNo": response.RefNo,
            "ELine": response.Line,
            "Itemcode":response.Itemcode,
            "Itemlink":response.ItemLink,
            "EUser":this.user_name,
            "getuser":this.user_name
          };

          var json_runtime_runscript_multi = {
              params:[
              {
                "lookupdb_name": this.session_outlet_guid,
                "trans_group": 'PO',
                "trans_type": 'pochild',
                "set_query":set_query
              }
            ]
          };

          var payload_runtime_runscript_multi ={
            "pass_json": json_runtime_runscript_multi
          }

          var status = data.status

          console.log('response',response);
          if(status == "success")
          {

            var dispatch_response = await this.runscript_multi(payload_runtime_runscript_multi,'1')
            // console.log('dispatch_response',dispatch_response);
            var Total = this.formatAmount(response.Total,'$');
            var SubTotal1 = this.formatAmount(response.SubTotal1,'$');
            var total_include_tax = this.formatAmount(response.total_include_tax,'$');

            this.json.Total = Total;
            this.json.total_include_tax = total_include_tax;
            this.json.SubTotal1 = SubTotal1;
            this.showNotify("positive", "Created Successfully.");
            if(newVal == 'save')
            {
              this.jsonChild = {};
              this.barcode_options = [];
              this.search.showTable = false;
              this.modify_child = false;

              this.table_function(this.ori_params);
              // this.updateAmount()

            }
            else if(newVal == 'save&add')
            {
              this.jsonChild = {};
              this.barcode_options = [];
              this.search.showTable = false;
              this.modify_child = false;
              this.table_function(this.ori_params);
              this.addButtonCreatePOChild('item');
            }
          }
          else
          {
            var show_error = "";

            var error_response = data.response.detail;
            //var error_response = data.response;

            // Object.keys(error_response).forEach((loop_index)=>{
            //   if(loop_index !== 'status_code')
            //   {
            //     var temp_error = {};
            //     var error_message = "";
            //     Object.keys(error_response[loop_index]).forEach((header,cindex)=>{
            //         error_message = error_response[loop_index];
            //     });
            //     temp_error = loop_index + " - " + error_message + '<br>';
            //     show_error += temp_error;
            //   }
            // });//close foreach error message
            this.showNotify('negative', error_response);
            this.showAddLoading = false;
          }

          if(dispatch_response.status){
            this.showAddLoading = false;
               console.log('Runscript : All scripts executed successfully');
              //  this.showNotify('positive','All scripts executed successfully')
           }else{
            this.showAddLoading = false;
              console.log('Runscript :', dispatch_response.message);
              this.showNotify('negative',dispatch_response.message)
            }
        }
        else
        {
          var Barcode = this.jsonChild.Barcode
          var Line = this.jsonChild.Line;
         // var lineString = Line.toString();

          // console.log('Line',lineString);
          var payload = {
            "RefNo": RefNo,
            "Line": Line.toString(),
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
            "rebate_value": rebate_value,
            "price_future": price_future,
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

          payload.Barcode = this.jsonChild.Barcode;
          payload.language = this.language;

          await this.$store.dispatch('purchase/trigger_update_pochild', payload).then(() => {
            data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_pochild_status']));
          });
          var response = data.response;
       //   console.log('response',response);
          var set_query = {
            "ERefNo": response.RefNo,
            "ELine": response.Line,
            "Itemcode":response.Itemcode,
            "Itemlink":response.ItemLink,
            // "EUser":this.user_name,
            // "getuser":this.user_name
          };

          var json_runtime_runscript_multi = {
              params:[
              {
                "lookupdb_name": this.session_outlet_guid,
                "trans_group": 'PO',
                "trans_type": 'pochild',
                "set_query":set_query
              }
            ]
          };

          var payload_runtime_runscript_multi ={
            "pass_json": json_runtime_runscript_multi
          }



          var status = data.status;
          console.log('response',response);
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
            var Total = this.formatAmount(response.Total,'$');
            var SubTotal1 = this.formatAmount(response.SubTotal1,'$');
            var total_include_tax = this.formatAmount(response.total_include_tax,'$');

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

            this.json.Total = Total;
            this.json.total_include_tax = total_include_tax;
            this.json.SubTotal1 = SubTotal1;

            var dispatch_response = await this.runscript_multi(payload_runtime_runscript_multi,'1')
            console.log('dispatch_response',dispatch_response);
            this.showNotify("positive", this.$language('C0022'));//"Updated Successfully."

            this.$emit('total-updated', Total); //update amount//
            this.$store.dispatch('purchase/trigger_read_po_by_refno', { RefNo: this.json.RefNo }); //update total amount//
            this.table_function(this.ori_params);
            this.modify_child = false;


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
               this.showAddLoading = false;
              //  this.showNotify('positive','All scripts executed successfully')
           }else{
              console.log('Runscript :', dispatch_response.message);
              this.showAddLoading = false;
              this.showNotify('negative',dispatch_response.message)
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
      async addButtonCreatePOChild(newVal){
        if(this.json.BillStatus == 1)
        {
            this.showNotify("negative",this.$language('C0012'));//"This Doc already posted."
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
            rebate_value: "0.00",
            price_future: "0.00",
            OrderLotSize: 1,
          }
          this.handleChangeEntryType('Unit')
        }

        this.search.options = newVal!='supplier' ?
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
        ] :
        [
          {
            label: this.$language('D0066'),//"Code"
            value: "Code"
          },
          {
            label: this.$language('D0006'),//"Name"
            value: "Name"
          },
        ];

        this.search.type = newVal=='item' ? 'Barcode' : 'Code';

      },
      async handleModifyItemcode(){
        this.hv_item = true;

        if(Object.keys(this.selected_row).length == 0)
        {
          this.showNotify('negative', this.$language('C0006'));//'No item selected'
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
            rebate_value: "0.00",
            price_future: "0.00",
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
     async showSearchTable(){
        console.log(this.search.value)
        if(this.search.value != null && this.search.value != '' && this.search.value != undefined)
        {
          this.search.showTable = true;
          setTimeout(async()=>{
          await this.item_table_function(this.item_ori_params);
          },200)
        }
        else
        {
          this.showNotify('negative', this.$language('C0023'))//'Please enter search value.'
        }
      },
      handleDelete(payload){
        this.active_delete_json = payload;
        this.delete_child = true;
      },
      async handleAction(payload){
        var mobile = this.$q.screen.width < 600
          // if(!mobile)
          // {
          //   if(this.json.BillStatus == 1)
          //   {
          //       this.showNotify("negative",this.$language('C0012'));//"This Doc already posted."
          //       return;
          //   }
          // }

          this.hv_item = true;

          this.modify_child = true;
          this.edit_child = true;
          this.showAddLoading = true;

          var cpayload = {
            params: {
              refno: payload.RefNo,
            }
          }

          var cdata = await this.getPochild(cpayload);

          var line = payload.Line;

          var filterPochild = cdata.data.filter((entry)=>{
            return entry.Line == line;
          })

          var barcode_ary = [];

          var payload2 = {
            params: {
              itemcode: filterPochild[0].Itemcode,
              language: this.language
            }
          }

          var data = await this.getBarcodeoptions(payload2);

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
      async getPochild(payload)
      {
        return await this.$store.dispatch('purchase/trigger_get_pochild', payload).then(() => {
            var data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_pochild']));
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
      handleSilTableChange: function(newVal)
      {
            var new_params = this.$pluginsTableParams(newVal)
            var payload = {
                params : new_params
            };
            this.sil_ori_params = payload;
            this.sil_table_function(payload);
      },
      table_function(payload){
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
                  label: this.$language('D0028'),//'Actions'
                  align: 'center',
                  sortable: false,
                  field: 'action',
                  format_child: '',
                  tooltip: ''
              },
              {
                  name: 'group_status',
                  required: true,
                  label: this.$language('D0161'),//'G'
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
                  label: this.$language('D0162'),//'G.Seq'
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
                  label: this.$language('D0163'),//'Price Type'
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
                  label: this.$language('D0164'),//'Tmp'
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
                  label: this.$language('D0165'),//'Amd'
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
                  label: this.$language('D0166'),//'Line'
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
                  label: this.$language('D0097'),//Item code
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
                  label: this.$language('D0099'),// Bar Code
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
                  label: this.$language('D0098'),//Description
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
                  label: this.$language('D0100'),//Pack Size
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
                  label: this.$language('D0167'),//Rebate Value
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
                  label: this.$language('D0168'),//Ord.
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
                  label: this.$language('D0169'),//Received Qty
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
                  label: this.$language('D0170'),//Tmp Rcv Qty
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
                  label: this.$language('D0171'),//Amend
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
                  label: this.$language('D0172'),//Bal.
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
                  label: this.$language('D0173'),//UOM
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
                  label: this.$language('D0092'),//Unit Price
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
                  label: this.$language('D0174'),//Disc 1
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
                  label: this.$language('D0175'),//Disc 1 Type
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
                  label: this.$language('D0176'),//Disc 2
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
                  label: this.$language('D0176'),//Disc 2 Type
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
                  label: this.$language('D0178'),//Net Unit Price
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
                  label: this.$language('D0112'),//Future Price
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
                  label: this.$language('D0179'),//SST
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
                  label: this.$language('D0180'),//SST Value
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
                  label: this.$language('D0181'),//SST Amt
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
                  label: this.$language('D0069'),//Total (Exc)
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
                  label: this.$language('D0182'),//GST Code
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
                  label: this.$language('D0183'),//GST Rate
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
                  label: this.$language('D0184'),//GST
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
                  label: this.$language('D0071'),//Total (Inc)
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
                  label: this.$language('D0102'),//Bulk Qty
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
                  label: this.$language('D0185'),//Bulk UOM
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
                  label: this.$language('D0186'),//BQty
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
                  label: this.$language('D0187'),//PQty
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
                  label: this.$language('D0091'),//Entry Type
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
                  label: this.$language('D0188'),//Min Qty
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
                  label: this.$language('D0189'),//Max Qty
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
                  label: this.$language('D0190'),//Colour
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
                  label: this.$language('D0191'),//Size
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
                  label: this.$language('D0101'),//ArticleNo
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
                  label: this.$language('D0192'),//Brand
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
                  label: this.$language('D0193'),//Item Remark
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
                  label: this.$language('D0194'),//Dept
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
                  label: this.$language('D0195'),//SubDept
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
                  label: this.$language('D0196'),//Category
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
                  label: this.$language('D0197'),//Avg Qty
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
                  label: this.$language('D0198'),//Period Qty
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
                  label: this.$language('D0199'),//Rank
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
                  label: this.$language('D0200'),//QoH
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
                  label: this.$language('D0201'),//S/Price
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
                  label: 'stockday_first_grn_date',//pending here
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

          if(this.json.BillStatus == 1)
          {
            table_column = table_column.filter((entry)=>{
              return entry.field != 'select';
            })
          }

          this.table_column = table_column;
          this.table_column1 = table_column1;

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

            if(this.page_function == 'CreatePurchaseOrder')
            {
              data = {
                  "data": []
              };
            }
            else
            {
              data = await this.getPochild(payload);
              // console.log('data',data);
              var results = data.data;

              this.supplier_readonly = results.length > 0;

              for(var i in results)
              {
                var obj = results[i];
                obj.select = false;
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
                    "count": data.data.length,
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
            // console.log('combinedArray',combinedArray);

            this.results = combinedArray
            this.summary = mobile_child_data
            console.log('group_button',this.group_button);
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
      async sil_table_function(payload){
          this.forceLoading = true;

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
                  name: 'ArticleNo',
                  required: true,
                  label: 'Article #',
                  align: 'left',
                  sortable: true,
                  field: 'ArticleNo',
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
                  headerStyle: 'text-align: center; width: 1%;',
              },
              // {
              //     name: 'Seq',
              //     required: true,
              //     label: 'Seq',
              //     align: 'left',
              //     sortable: true,
              //     field: 'Seq',
              //     format_child: '',
              //     tooltip: '',
              //     headerStyle: 'text-align: center; width: 2%;',
              // },
              {
                  name: 'priority_vendor',
                  required: true,
                  label: 'Priority',
                  align: 'right',
                  sortable: true,
                  field: 'priority_vendor',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center; width: 2%;',
                  sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, '')),
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
                  headerStyle: 'text-align: center; width: 2%;',
                  sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
              },
              {
                  name: 'FOCQty',
                  required: true,
                  label: 'FOC Qty',
                  align: 'right',
                  sortable: true,
                  field: 'FOCQty',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center; width: 2%;',
                  sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
              },
              {
                  name: 'v_disc1type',
                  required: true,
                  label: 'Disc1 Type',
                  align: 'right',
                  sortable: true,
                  field: 'v_disc1type',
                  format_child: '',
                  tooltip: '',
                  headerStyle:'text-align: center; width: 1%;',
              },
              {
                  name: 'v_disc1value',
                  required: true,
                  label: 'Disc1 Value',
                  align: 'right',
                  sortable: true,
                  field: 'v_disc1value',
                  format_child: '',
                  tooltip: '',
                  headerStyle:'text-align: center; width: 1%;',
                  sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
              },
              {
                  name: 'v_disc2type',
                  required: true,
                  label: 'Disc2 Type',
                  align: 'right',
                  sortable: true,
                  field: 'v_disc2type',
                  format_child: '',
                  tooltip: '',
                  headerStyle:'text-align: center; width: 1%;',
              },
              {
                  name: 'v_disc2value',
                  required: true,
                  label: 'Disc2 Value',
                  align: 'right',
                  sortable: true,
                  field: 'v_disc2value',
                  format_child: '',
                  tooltip: '',
                  headerStyle:'text-align: center; width: 1%;',
                  sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
              },
              {
                  name: 'v_netunitprice',
                  required: true,
                  label: 'Net Price',
                  align: 'right',
                  sortable: true,
                  field: 'v_netunitprice',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
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
                  headerStyle: 'text-align: center;',
                  sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
              },
              {
                  name: 'BulkFOC',
                  required: true,
                  label: 'Bulk FOC',
                  align: 'right',
                  sortable: true,
                  field: 'BulkFOC',
                  format_child: '',
                  tooltip: '',
                  headerStyle:'text-align: center; width: 1%;',
                  sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
              },
              // {
              //     name: 'BulkPrice',
              //     required: true,
              //     label: 'Bulk Price',
              //     align: 'right',
              //     sortable: true,
              //     field: 'BulkPrice',
              //     format_child: '',
              //     tooltip: '',
              //     headerStyle:'text-align: center; width: 1%;',
              //     sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
              // },
              // {
              //     name: 'FuturePrice',
              //     required: true,
              //     label: 'Future Price',
              //     align: 'right',
              //     sortable: true,
              //     field: 'FuturePrice',
              //     format_child: '',
              //     tooltip: '',
              //     headerStyle:'text-align: center; width: 1%;',
              //     sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
              // },
              // {
              //     name: 'TotalQty',
              //     required: true,
              //     label: 'Total Qty',
              //     align: 'left',
              //     sortable: true,
              //     field: 'TotalQty',
              //     format_child: '',
              //     tooltip: '',
              //     headerStyle:'text-align: center; width: 1%;',
              // },
              // {
              //     name: 'Amount',
              //     required: true,
              //     label: 'Amount',
              //     align: 'left',
              //     sortable: true,
              //     field: 'Amount',
              //     format_child: '',
              //     tooltip: '',
              //     headerStyle:'text-align: center; width: 1%;',
              // },
              // {
              //     name: 'BulkQty',
              //     required: true,
              //     label: 'Bulk Qty',
              //     align: 'left',
              //     sortable: true,
              //     field: 'BulkQty',
              //     format_child: '',
              //     tooltip: '',
              //     headerStyle:'text-align: center; width: 1%;',
              // },
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
                  name: 'barcode',
                  required: true,
                  label: 'Bar Code',
                  align: 'left',
                  sortable: true,
                  field: 'barcode',
                  format_child: '',
                  tooltip: '',
                  headerStyle:'text-align: center; width: 1%;',
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
                  headerStyle:'text-align: center; width: 1%;',
                  sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
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
                  headerStyle:'text-align: center; width: 1%;',
                  sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
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
                  headerStyle:'text-align: center; width: 1%;',
                  sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
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
                  headerStyle:'text-align: center; width: 1%;',
                  sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
              },
              // {
              //     name: 'Invoice',
              //     required: true,
              //     label: 'Invoice',
              //     align: 'left',
              //     sortable: true,
              //     field: 'Invoice',
              //     format_child: '',
              //     tooltip: '',
              //     headerStyle:'text-align: center; width: 1%;',
              // },
              {
                  name: 'CreditQty',
                  required: true,
                  label: 'CN',
                  align: 'right',
                  sortable: true,
                  field: 'CreditQty',
                  format_child: '',
                  tooltip: '',
                  headerStyle:'text-align: center; width: 1%;',
                  sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
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
                  headerStyle:'text-align: center; width: 1%;',
                  sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
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
                  headerStyle:'text-align: center; width: 1%;',
                  sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
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
                  headerStyle:'text-align: center; width: 1%;',
                  sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
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
                  headerStyle:'text-align: center; width: 1%;',
                  sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
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
                  headerStyle:'text-align: center; width: 1%;',
                  sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
              },
              {
                  name: 'SupStdPrice',
                  required: true,
                  label: 'Std Price',
                  align: 'right',
                  sortable: true,
                  field: 'SupStdPrice',
                  format_child: '',
                  tooltip: '',
                  headerStyle:'text-align: center; width: 1%;',
                  sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
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
                  headerStyle:'text-align: center; width: 1%;',
                  sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
              },
              {
                  name: 'SupLastPrice',
                  required: true,
                  label: 'Last Price',
                  align: 'right',
                  sortable: true,
                  field: 'SupLastPrice',
                  format_child: '',
                  tooltip: '',
                  headerStyle:'text-align: center; width: 1%;',
                  sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
              },
              // {
              //     name: 'BasedOnStd',
              //     required: true,
              //     label: 'Based On Std',
              //     align: 'left',
              //     sortable: true,
              //     field: 'BasedOnStd',
              //     format_child: '',
              //     tooltip: '',
              //     headerStyle:'text-align: center; width: 1%;',
              // },
              // {
              //     name: 'PackSize',
              //     required: true,
              //     label: 'Pack Size',
              //     align: 'left',
              //     sortable: true,
              //     field: 'PackSize',
              //     format_child: '',
              //     tooltip: '',
              //     headerStyle:'text-align: center; width: 1%;',
              // },
              {
                  name: 'ReorderLevel',
                  required: true,
                  label: 'Reorder Level',
                  align: 'right',
                  sortable: true,
                  field: 'ReorderLevel',
                  format_child: '',
                  tooltip: '',
                  headerStyle:'text-align: center; width: 1%;',
                  sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
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
                  headerStyle:'text-align: center; width: 1%;',
                  sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
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
                  headerStyle:'text-align: center; width: 1%;',
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
          ];

          var po_date = this.json.PODate;
          var outlet = this.json.loc_group;
          var supplier_code = this.json.SCode

          var payload = {
            "supplier_code": supplier_code,
            "po_date": po_date,
            "outlet": outlet,
            "user": this.user_name,
            "language": this.language
          }

          var data = {};

          await this.$store.dispatch('purchase/trigger_read_po_supplier_itemlist', payload).then(() => {
            data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_read_po_supplier_itemlist']));
          });

          this.sil_table_column = table_column;

          if(data.status == 'success')
          {
            var results = data.response;

            for(var i in results)
            {
              var obj = results[i];

              // obj.Sellingprice = this.formatAmount(obj.Sellingprice,'$');
              // obj.StdCost = this.formatAmount(obj.StdCost,'$');
              // obj.LastCost = this.formatAmount(obj.LastCost,'$');
              obj.priority_vendor =  this.formatAmount(obj.priority_vendor,'qty');
              obj.v_netunitprice =  this.formatAmount(obj.v_netunitprice,'$');
              obj.PackSize =  this.formatAmount(obj.PackSize,'qty');
              obj.BulkPrice =  this.formatAmount(obj.BulkPrice,'$');
              obj.SellingPrice  =  this.formatAmount(obj.SellingPrice ,'$');
              obj.SalesTempQty =  this.formatAmount(obj.SalesTempQty,'qty');
              obj.OnHandQty =  this.formatAmount(obj.OnHandQty,'qty');
              obj.OpeningQty =  this.formatAmount(obj.OpeningQty,'qty');
              obj.ReceivedQty =  this.formatAmount(obj.ReceivedQty,'qty');
              obj.CreditQty =  this.formatAmount(obj.CreditQty,'qty');
              obj.DebitQty =  this.formatAmount(obj.DebitQty,'qty');
              obj.AdjustInQty =  this.formatAmount(obj.AdjustInQty,'qty');
              obj.AdjustOutQty =  this.formatAmount(obj.AdjustOutQty,'qty');
              obj.TransInQty =  this.formatAmount(obj.TransInQty,'qty');
              obj.TransOutQty =  this.formatAmount(obj.TransOutQty,'qty');
              obj.SupStdPrice =  this.formatAmount(obj.SupStdPrice,'$');
              obj.NetUnitPrice =  this.formatAmount(obj.NetUnitPrice,'$');
              obj.SupLastPrice =  this.formatAmount(obj.SupLastPrice,'$');
              obj.ReorderLevel =  this.formatAmount(obj.ReorderLevel,'qty');
              obj.MaxLevel =  this.formatAmount(obj.MaxLevel,'qty');
              obj.SellingPrice =  this.formatAmount(obj.SellingPrice,'$');
              obj.v_disc1value =  this.formatAmount(obj.v_disc1value,'$');
              obj.v_disc2value =  this.formatAmount(obj.v_disc2value,'$');
              obj.Qty = 0;
              obj.FOCQty = 0;
              obj.BulkQty = 0;
              obj.BulkFOC = 0;
              obj.selected = false;
            }

            this.sil_table_data = {
                "data": {
                    "count": results.length,
                    "next": null,
                    "previous": null,
                    "results": results
                }
            };
          }
          else
          {
            this.sil_table_data = {
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
      unformatAmount(value,type)
      {

        if(value === undefined)
        {
          value = 0;//need to back 5509 line to continue language translate
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

          var SCode = this.json.SCode;
          var SName = this.json.SName;
          var PODate = this.json.PODate;
          var DeliverDate = this.json.DeliverDate;
          var Location = this.json.Location;
          var loc_group = this.json.loc_group;
          var IssueStamp = this.json.IssueStamp;
          var Remark = this.json.Remark;

          var expiry_date = this.json.expiry_date;
          var in_kind = this.json.in_kind;
          var tax_inclusive = this.json.tax_inclusive;

          var payload = {
            "SCode":SCode,
            "SName":SName,
            "PODate":PODate,
            "DeliverDate":DeliverDate,
            "Location":Location,
            "loc_group":loc_group,
            "Remark": Remark,
            "laststamp":current_date_format,
            "IssuedBy": this.concat_name_fullname,
            "expiry_date": expiry_date,
            "in_kind": in_kind,
            "tax_inclusive": tax_inclusive,
          };

          var data = {};
          var set_query ={};
          if(this.page_function == 'CreatePurchaseOrder')
          {
            payload.IssueStamp = current_date_format;
            payload.language = this.language;

            await this.$store.dispatch('purchase/trigger_create_pomain', payload).then(() => {
              data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_pomain_status']));
            });

            var response = data.response
            console.log('response',response);
            set_query = {
              "ERefNo":response.RefNo,
              "SupplierCode":response.SCode,
              "EUser":this.user_name,
              "getuser":this.user_name
            };
          }
          else if(this.page_function == 'EditPurchaseOrder')
          {
            payload.RefNo = this.json.RefNo;
            payload.IssueStamp = IssueStamp;
            payload.language = this.language;
            payload.pur_expiry_days = this.unformatAmount(this.json.pur_expiry_days);
            // payload.IssuedBy = this.concat_name_fullname

            await this.$store.dispatch('purchase/trigger_update_pomain', payload).then(() => {
              data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_pomain_status']));
            });
            set_query = {
              "ERefNo":this.json.RefNo,
              "SupplierCode":this.json.SCode,
              "EUser":this.user_name,
              "getuser":this.user_name
            };
          }


            var json_runtime_runscript_multi = {
              params:[
              {
                "lookupdb_name": this.session_outlet_guid,
                "trans_group": 'PO',
                "trans_type": 'pomain',
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

              var mobile = this.$q.screen.width < 600
              var dispatch_response = await this.runscript_multi(payload_runtime_runscript_multi,'1')
              console.log('dispatch_response',dispatch_response);
              if(this.page_function == 'CreatePurchaseOrder')
              {
                this.showNotify("positive", "Created Successfully.");

                // if(mobile)
                // {
                //   this.$router.push({ name: 'confirm', query: { refno: data.response.RefNo, header: 'PO', type:'create' }})
                // }
                // else
                // {
                  this.$router.push({ name: 'EditPurchaseOrder', query: { refno: data.response.RefNo, step: 2 } })
                // }
              }
              else if(this.page_function == 'EditPurchaseOrder')
              {
                if(mobile)
                {
                  this.$router.push({ name: 'confirm', query: { refno: data.response.RefNo, header: 'PO', type:'update' }})
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

                  var cdata = await this.getPochild(cpayload);
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
                  this.status = this.json.BillStatus == 1;

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

            if(dispatch_response.status){
               console.log('Runscript : All scripts executed successfully');
              //  this.showNotify('positive','All scripts executed successfully')
           }else{
              console.log('Runscript :', dispatch_response.message);
              this.showNotify('negative',dispatch_response.message)
            }

      },
      async validate_form(form_name)
      {
          alert(form_name)
          var form_name = form_name;
          var error = 0;
          // await this.$refs[form_name].validate().then(valid => {
          //     if (!valid) {
          //         error = 1;
          //     }
          // });

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
      async key_listener(event)
      {
        if(this.delete_child)
        {
          if(this.edit_surcharge_action){
            if (event.key === "Enter") {
             await this.handleDeleteSurchargeLine();
             this.edit_surcharge_action = false
           }
           if(event.key === 'Escape')
           {
            this.delete_child = false;
            this.edit_surcharge_action = false;
           }
          }else{
            if (event.key === "Enter") {
             await this.handleDeleteLine();
            }
            if(event.key === 'Escape')
            {
             this.delete_child = false;
            }
          }

        }
        else if(this.post_transmain)
        {
          if (event.key === "Enter") {
           await this.handlePostTransmain();
          }
          if(event.key === 'Escape')
          {
            this.post_transmain = false;
          }
        }
        else if(this.supplier_item_list_popup)
        {
          if (event.key === "Enter") {
           await this.handleSilChild();
          }
          // if(event.key === 'Escape')
          // {
          //   this.sil_close();
          // }
        }
        else if(this.search_item)
        {
          if (event.key === "Enter") {
            if(Object.keys(this.selected_row).length != 0)
            {
             await this.handleModifyItemcode();

              setTimeout(() => {
                if (this.search_item == true) {
                  this.search_item = false;
                  return;
                }
              }, 100);
            }
            else
            {
              await this.showSearchTable();
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
            await this.handleChild('save');
          }
          if(event.key === 'Escape')
          {
            this.close();
          }
        }else if(this.surcharge_discount_dialog){
          console.log('event',event.key);
          if (event.key === "Enter") {
            await this.addButtonSurcharge('save');
          }
          if(event.key === 'Escape')
          {
            this.surcharge_discount_dialog=false;
          }
        }
      },
      show_summary_dialog(){
        this.view_summary = true;

        console.log('jsonChild',this.jsonChild);
      },
      async runscript_multi2(payload){

        var object_pass = {
              dispatch: 'purchase/trigger_runtime_runscript_multi',
              getter: 'purchase/get_runscript_multi_status',
              app: this,
              payload: payload,
          };
          var dispatch_response = await this.$dispatch(object_pass);

         return dispatch_response
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

        //  const firstErrorMessage = errorItems[0].message || "Error in script execution";

        //  Check if the error message is "run_query" or "exec_query"
          // if (firstErrorMessage.includes("run_query") || firstErrorMessage.includes("exec_query")) {
          //   // return { status: false, message: "Please try again." + " " + firstErrorMessage };
          //      return { status: false, message: "Error in script execution : " + " " + firstErrorMessage };
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
          var set_query = {
            "ERefNo" : RefNo,
            "EUser":this.user_name,
            "getuser":this.user_name
          };

          var json_runtime_runscript_multi = {
              params:[
              {
                "lookupdb_name": this.session_outlet_guid,
                "trans_group": 'PO',
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
            console.log('runtime script:',dispatch_response.message);

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
        // this.$router.push({ name: 'confirm', query: { refno: data.response.RefNo, header: 'PO', type:'create' }})
        this.$router.push({name:'PrintWarningMessage', query: { refno: refno, header: 'PO'}});
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
                title: 'PO Audit List - Warning Message Details',
               },
               {
                title: 'Report',
               },
              ]
              }
            }
      },
     async handleSurchargeTableChange(){
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
                tooltip: '',
                headerStyle: 'text-align: center; width:60px'
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
                headerStyle: 'text-align: center; width:45px;'
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
                headerStyle: 'text-align: center; width:50px;'
            },
            {
                name: 'Code',
                required: true,
                label: 'Code',
                align: 'left',
                sortable: false,
                field: 'Code',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center; width:100px',
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
                headerStyle: 'text-align: center; width:180px;'
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
                headerStyle: 'text-align: center;',
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
              }


            ];

            if(this.json.BillStatus == 1)
            {
            surcharge_table_column = surcharge_table_column.filter((entry)=>{
            return entry.field != 'action';
            })
            }
            this.surcharge_table_column = surcharge_table_column;

            this.$nextTick(async ()=>{
            // payload.params.refno = this.$route.query.refno;

            var data = {};

            if(this.page_function == 'CreatePurchaseOrder')
            {
                data = {
                    "data": []
                };
            }else{

              // data ={
              //   data:[
              //     {
              //       no:'1',
              //       shared:1,
              //       code:'SL-5',
              //       dn:0,
              //       disctype:'%',
              //       value:'0',
              //       Desc:'Sales Tax 5%'
              //     },
              //     {
              //       no:'2',
              //       shared:1,
              //       code:'Tran',
              //       dn:0,
              //       disctype:'$',
              //       value:'0',
              //       Desc:'Transport RM'
              //     }
              //   ]
              //   }
              var payload = {
                "pass_json": {
                  refno: this.json.RefNo,
                  trans_type: 'PO'
                }
              };

              var object_pass = {
                  "dispatch": 'purchase/trigger_post_get_surcharge_discount', //refer to path/function_name in store actions.js
                  "getter": 'purchase/get_surcharge_discount', //refer to path/function_name in store getters.js
                  "app": this, //compulsory passed variable
                  "payload": payload //payload that needed to use in store actions.js
              };

              var dispatch_response = await this.$dispatch(object_pass);
             // console.log('dispatch_response',dispatch_response);
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
                  obj.build_into_cost = obj.build_into_cost  == 0 ? false:true;
                  obj.dn = obj.dn  == 0 ? false:true;
                }
            //success condition
              }else
              {
                //fail condition

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

            if(mobile){
            this.surcharge_disc_array =data.response

            }


            });
      },
      handleChangetdCodeSelect(mainjson){
        console.log('MAIN',mainjson);
        var surcharge_table_data = this.surcharge_table_data.data.results
        var filter_Desc = this.codeOptions.filter((entry)=>{
          return entry.value == mainjson.value
        });

        mainjson.payload.row.Desc= filter_Desc[0].Description
        mainjson.payload.row.code= mainjson.value
        mainjson.payload.row.disctype = filter_Desc[0].surcharge_disc_type

      },
      // addButtonSurcharge(table_data){
      //   var results = table_data.data.results

      //   var no = results.length == 0 ? 1 :parseInt(results[results.length-1].no) + 1
      //   var object =
      //      {
      //               no: no,
      //               shared:0,
      //               code:'',
      //               dn:0,
      //               disctype:'',
      //               value:'0',
      //               Desc:''
      //      }

      //   results.push(object)

      //   if(results.length > 0){
      //       this.surcharge_table_footer = true
      //   }
      // },
    showDeleteSurchargeLineConfirmDialog(obj){
       this.delete_child = true;
       this.edit_surcharge_action =true;
       this.surcharge_discount_json = obj
    },
    async handleDeleteSurchargeLine(){

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
         console.log('dispatch_response',dispatch_response);
        if(dispatch_response.status)
        {
			      //success condition
              // this.showAddLoading = false;
              var Total              = dispatch_response.response.Total;
              var total_include_tax  = dispatch_response.response.total_include_tax;
              var Discount1  = dispatch_response.response.Discount1;

              this.json.Total =  this.formatAmount(Total, '$');
              this.json.total_include_tax = this.formatAmount(total_include_tax, '$');
              this.json.Discount1 = this.formatAmount(Discount1, '$');
              this.totalDisc = this.formatAmount(Discount1, '$')

              // setTimeout(async()=>{
                await this.handleSurchargeTableChange();
                this.edit_surcharge_action = false;
                this.surcharge_discount_json  ={};
                this.delete_child= false;
                this.showAddLoading = false;
              // },50)

        }else
        {
       		//fail condition
        }
        // var removeNo = obj.no
        // var indexToRemove = surcharge_table_data.data.results.findIndex(entry => entry.no === removeNo);
        // if (indexToRemove !== -1) {
        //   surcharge_table_data.data.results.splice(indexToRemove, 1);
        //     // Reset the no property for the remaining items
        //     for (let i = 0; i <surcharge_table_data.data.results.length; i++) {
        //       surcharge_table_data.data.results[i].no = i + 1;
        //     }
        //   }

        //   if(surcharge_table_data.data.results.length == 0){
        //     setTimeout(()=>{
        //       this.surcharge_table_footer = false
        //     },50)

        //   }
      },
      handleChangeSurchargeSubTotalValue(newVal){
        console.log('subtotal',newVal);
        this.json.Total = (parseFloat(this.json.SubTotal1) + parseFloat(newVal)).toFixed(2);
      },
     async handlePrintSelect(row){
        var requests = this.rows_print.data.results.map(async(row, index)=>{
            row.selected = false;
          });

          await Promise.all(requests);

          row.selected = true;
        //  this.selected_po = payload;
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
      showDialogEditSurcharge(payload){
        console.log('payload');
        this.surcharge_discount_dialog = true;
        payload.build_into_cost = payload.build_into_cost == 0 ? false:true;
        payload.dn = payload.dn == 0 ? false:true;
        this.surcharge_discount_json = payload
        this.edit_surcharge_action = true;
     },
     showDialogAddSurcharge(){
        this.surcharge_discount_dialog = true;
        this.surcharge_discount_json ={
          build_into_cost: 0 ? true : false,
          dn:0 ? true : false
        }
     },
     async addButtonSurcharge(type){
            console.log('type',type);
            this.showAddLoading = true;
            var payload = {
              "pass_json": {
                code_Type:  this.surcharge_discount_json.code_Type,
                Code: this.surcharge_discount_json.Code,
                Description: this.surcharge_discount_json.Description,
                surcharge_disc_type: this.surcharge_discount_json.surcharge_disc_type,
                surcharge_disc_value: this.surcharge_discount_json.surcharge_disc_value,
                Value_Before: this.json.Total,
                trans_type: "PO",
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
              console.log('dispatch_response',dispatch_response);
              var Total  = dispatch_response.response.Total;
              var Discount1  = dispatch_response.response.Discount1;
              var total_include_tax  = dispatch_response.response.total_include_tax;
              this.json.Total =  this.formatAmount(Total, '$');
              this.json.total_include_tax =  this.formatAmount(total_include_tax, '$');
              this.json.Discount1 = this.formatAmount(Discount1,'$')
              if(type == 'save'){
                  this.handleSurchargeTableChange();
                  this.surcharge_discount_json = {};
                  this.surcharge_discount_dialog = false;
                  this.edit_surcharge_action =false;
                  this.showAddLoading= false;
               }else if(type == 'save&add'){
                  this.handleSurchargeTableChange();
                  this.surcharge_discount_json = {
                    build_into_cost: false,
                    dn:false,
                    Code: "",
                    Description: "",
                    surcharge_disc_type:"",
                    surcharge_disc_value: 0,
                  };
                  this.showAddLoading = false;
                }
            }else
            {
              //fail condition
            }

      },
      handleSurchargeDiscountInputChange(newVal)
      {
         console.log('newVal',newVal);
         console.log('codeOptions',this.codeOptions);
         var obj = this.codeOptions.filter((entry)=>{
            return entry.value == newVal
         })
         console.log('obj',obj);
         this.surcharge_discount_json.surcharge_disc_type = obj[0].surcharge_disc_type;
         this.surcharge_discount_json.Description = obj[0].Description;
         this.surcharge_discount_json.code_Type = obj[0].code_Type
      },
      closeDialogSurcharge(){
         this.surcharge_discount_dialog =false;
         this.surcharge_discount_json = {};
         this.edit_surcharge_action = false;
      },
    handleNavigate (type) {
        if(type =='PurchaseOrder')
      {
        this.$router.push("PurchaseOrder");
        // this.$router.push({ name: "Create" + this.page_function });
      }
      else if (type =='Outlet') {
        this.$router.push("/erp/location/outletlocation");
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
    supplier_item_list_popup(newVal)
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
    surcharge_discount_dialog(newVal){
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
.step2_table >>> th {
  padding: 10px 10px !important;
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

/* .intermediate_white
{
  position: sticky;
  z-index: 2;
  top: 111px;
  padding: 0px;
  width: 100%;
  height: 12px;
  background-color:white;
} */

.content_body_dialog
{
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 0px;
  padding-bottom: 46px;
}
/* .card_design
{
  height: 120px;
  background-color: white;
  color:black;
  padding: 16px;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.30) !important;

} */

@media screen and (max-width: 599px) {
  .mobile_dialog_bottom {
    font-family: InterfontSemiBold;
    font-size: 16px;
    font-weight: 600;
  }
  .selected-card {
  border-radius: 8px;
  border: 2px solid #90A8D6;
  background: #FFF;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.30);
}
  .search_button {
  /* padding: 17px 16px; */
  border-radius: 8px;
  border: 2px solid #1E90FF;
  width: 100%;
  /* height: 81%; */
  
  /* margin-top: 1px; */
}
  .back_chip_icon >>>.q-chip__icon {
    color: rgba(0, 0, 0, 0.54);
    font-size: 1.5em;
    margin: -0.1em;
}
  .input_wrapper_right
{
  padding-right: 16px;
  padding-left: 16px;
  padding-bottom: 16px;
}
  .hover-style {
    background: rgba(215, 232, 250, 0.50);
  }
.text-red {
  color: #B22222;
}
  *>>>.q-separator--horizontal {
    display: block;
    height: 0px;
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
    position:static;
    z-index: 2;
    top: 56px;
    /* padding-bottom: 24px; */
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
    /* text-align: center; */
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 0px;
    padding-bottom: 0px;
  }

  td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

.center
{
  /* border: none; */
  text-align: center;
}

.right
{
  text-align: right;
}
.leftwpadding
{
  padding-top:6px;
  padding-bottom:6px;
}

.leftwopadding
{
  padding-left: 15px;
  text-align: left;
}

.rightwopadding
{
  padding-right: 20px;
  text-align: right;
}

.centerwpadding
{
  padding-top:6px;
  padding-bottom:6px;
  text-align: center;
  padding-right: 10px;
}

.rightwpadding
{
  padding-top:6px;
  padding-bottom:6px;
  text-align: right;
  padding-right: 10px;
}

.mobile_section_font {
  color: #29292A;
  font-family: InterfontSemiBold;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
}
.mobile_edit_checkbox {
  font-weight: 600;
  font-size: 12px !important;
  font-family: InterfontSemiBold;
  align-items: center;
  justify-items: center;
  justify-content: center;
}
.dialog_confirmation_title {
  color: #fff;
  text-align: center;
  font-family: InterfontSemiBold;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
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
  /* border: 1px solid #54656F; */
  /* background: #FFFFFF; */
  font-family: InterfontSemiBold;
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  text-align: center;
  width: 90px !important;
  height: 30px;
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
  display: block;
  /* margin-bottom: 8px; */
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
}
/* screen more than 600 */
@media screen and (min-width: 600px) {
    .column > .col-4, .column > .col-xs-4 {
        height: 33.3333%;
        width: auto;
        align-items: center;
        align-content: center;
    }  
  *>>>.q-field__native, .q-field__prefix, .q-field__suffix, .q-field__input {
  color: #000;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  font-family: InterfontMedium;
}
  .input_wrapper_right
{
  padding: 16px;
  /* padding-right: 1%; */
  /* padding-left: 1%; */
}
  .search_button {
  /* padding: 17px 16px; */
  border-radius: 8px;
  border: 2px solid #1E90FF;
  width: 100%;
  /* height: 90%; */
  
  /* margin-top: 1px; */
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
    position: sticky;
    top: 50px;
    z-index: 2;
    padding:0px;
  }
  .card_sides
{
  padding-left: 24px;
  padding-right: 24px;
  background-color: #F4F7FE;
  padding-bottom: 24px;
  /* padding-top: 24px; */
}
.edit_checkbox {
  font-weight: 600;
  font-size: 16px !important;
  font-family: InterfontSemiBold;
  align-items: center;
  justify-items: center;
  justify-content: center;
}
/* .card_sides
{
  padding-left: 10px;
  padding-right: 10px;
} */
.dialog_confirmation_title {
  color: #FFF;
  text-align: center;
  font-family: InterfontSemiBold;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
}

.dialog_radio_title {
  font-weight: 600;
  font-family: InterfontSemiBold;
  font-size: 16px;
}
.dialog_radio_options {
  font-weight: 500;
  font-family: InterfontMedium;
  font-size: 16px;
  padding: 0px;
  gap: 10px;
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
  left: 4%;
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
@media (min-width: 1024px) {
    .column > .col-md-4 {
        height: 33.3333%;
        width: auto;
        align-items: center;
        align-content: center;
    }
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
  /* height: 70px; */
  position: static;
  padding:0px;
  /* padding-right: 24px; */
  /* padding-left: 20px; */
  bottom: 0px;
  /* background-color: white; */
}

/* .intermediate
{
  padding: 0px;
  width: 100%;
  height: 5px;
  background-color:#ededed;
} */

.header_text
{
  /* padding-left: 16px; */
  /* padding-right: 16px; */
  font-weight: 600;
  font-size: 20px;
  font-family: InterfontSemiBold;

}


/* .upload_container
{
    padding: 10px;
    padding-top: 0px;
} */

* >>> .q-table__container
{
    padding: 0px;
    border-radius: 8px;    /*adjust for the search supplier -supplier item list table */
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

/* .upload_separator_first
{
    border-bottom: 1px solid #DEE1E6; 
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 10px;
    padding-top: 0px;
    padding-bottom: 10px;
} */

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

/* newly added css */
/* .card-container {
  border-radius: 8px;
  background: #FFF;
  box-shadow: 0px 1px 11.3px 0px rgba(0, 0, 0, 0.09);
  padding: 16px 24px;
  margin-top: 10px;
} */

.intermediate
{
  padding: 0px;
  /* width: 100%;
  height: 5px;
  background-color:#ededed; */
}
.chip-container_1 {
  display: flex;
  align-items: center;
  /* padding-top: 16px; */
  /* padding-bottom: 16px; */
}
.chip-container_2 {
  display: flex;
  align-items: center;
  /* padding-top: 16px; */
  padding-bottom: 16px;
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
.col3_leftFont {
  font-family: InterfontSemiBold;
  font-size: 18px;
  font-weight: 600;
}
/* ^font */


.upload_container
{
    /* padding: 10px; */
    padding-top: 0px;
    /* background-color: #C10015; */
}
.upload_container_PO_details {
    padding: 0px;
    padding-top: 0px;
}
.upload_separator_first
{
    /* border-bottom: 1px solid #DEE1E6; */
    /* margin-left: 10px;
    margin-right: 10px; */
    /* margin-bottom: 10px; */
    padding-top: 0px;
    /* padding-bottom: 30px; */
    /* padding: 0px 16px; */
}
*>>>.q-card__section--vert {
    padding: 0px;
}
.first-dialog_separator {
  padding-top: 16px;
  padding-bottom: 16px;
  gap: 20px;
}
.col3_left {
  justify-content: center;
  align-content: top;
  align-items: center;
}
.custom-margin{
  margin-right: 16px;
  /* background-color: rgb(96, 228, 9); */
}

/* search button */

/* .search_button >>>.q-icon {
  font-size: 2.2em !important;
} */
.search_button_dialog {
  /* padding: 17px 16px; */
  border-radius: 8px;
  border: 2px solid #1E90FF;
  /* margin-top: 1px; */
  width: 100%;
  /* height:95%; */
  /* font-size: 2em;   */
}
.search_button_dialog >>>.q-icon {
  /* font-size: 20px !important; */
  /* font-size: 2.2em !important; */
}
.search_icon_btn .q-icon {
  transition: transform 0.3s ease;
}
.search_icon_btn.expanded .q-icon {
  transform: scale(1.1); /* This will scale the icon from 20px to 22px assuming 1.1 times the original size */
}
.separator-style {
  border-top: 1px solid #BFBFBF;
  width: 100%;
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
* >>> .q-field--disabled > .q-field__inner > .q-field__control
{
  background-color: #E8E8E8 !important;
  border-radius: 8px;
  /* border: 2px solid #BABABA; */
  padding: 6px 16px;
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
/* .edit_checkbox {
  font-weight: 600;
  font-size: 16px !important;
  font-family: InterfontSemiBold;
  align-items: center;
  justify-items: center;
  justify-content: center;
} */

*>>>.q-btn--outline:before {
    border: none;
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

.primary_actions_button:hover {
  background: #1E90FF; /* Maintain the same background color on hover */
}

*.amount_custom >>> .q-field__label {
  /* top: 5px !important; */
  /* background-color: #D81111 !important; */
}

/* *.q-field__label no-pointer-events absolute ellipsis {
  font-size: 11px;
  font-weight: 500;
  font-family: InterfontMedium;
} */
/* select filter input */
*.space_on_top[data-v-028d6966] .q-field__native > span {
  padding-top: 5px !important;
  font-weight: 500;
  font-family: InterfontMedium;
}


*[data-v-505a4168] >>> .q-field__label {
    /* margin-top: 10px; */
}
/* * >>>.q-field--dense .q-field__control, .q-field--dense .q-field__marginal {
    height: 60px;
} */
/* Targeting the specific element with a combination of classes and attributes */
.b2b-padding >>> .q-field__native {
  padding-top: 0 !important; /* Adjust padding as needed */
  padding-bottom: 10px;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
   /* Set the background color */
}



.scroll-x {
  overflow: hidden;
}
.border-container {
  /* border: 1px solid #ababab;
    border-radius: 8px; */
     /*padding: 10px;*/
    width: 100%; 
}
.step3_col_padding {
  gap: 24px;
}
/* *>>>.q-stepper__title {
    font-size: 14px;
    font-weight: 500;
    font-family: InterfontMedium;
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


.mobile_dialog_delete_btn:hover {
  cursor: pointer;
  text-decoration: underline; /* Underline on hover */
}



/* .custom-stepper >>> .q-stepper__tab {
  border: 2px solid black; 
} */
.no-scroll {
  overflow: hidden;
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
.dialog-style {
  width: 864px; 
  max-width: 98vw;
  text-align:center;
  margin-top: 2%;
  border-radius: 8px 8px 8px;
}
/* *.custom_truthcheckbox.disabled >>>.q-checkbox__bg {  
  border: none;
  background: #1E90FF;  
} */
/* .dialog_mobile
{
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 320px; 
  height: 60px; 
  padding: 8px 32px;
  justify-content: center;
  align-items: center;
  border-radius: 24px;
  background-color: white;
  box-shadow: 0px 0px 11px 0px rgba(0, 0, 0, 0.40);
} */
/* .dialog_mobile_detail{
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
} */
/* .menu_add >>>.q-icon {
  font-size: 2.9em !important;
} */
/* .mobile_nav_font {
  font-family: InterfontSemiBold;
  font-size: 9px;
  font-style: normal;
  font-weight: 600;
}
.mobile_nav_icons >>>.q-icon {
  font-size: 2.0em !important;
} */

.dialog_totalAmount_container {
  padding: 8px 24px 32px 24px;
  gap: 10px;
}
.dialog_totalAmount {
  padding: 16px 24px;
}
.dialog_totalAmount_title_font {
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  font-family: InterfontSemiBold;
}
.dialog_totalAmount_item_font {
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  font-family: InterfontMedium;
  color: #72777A;
}
.dialog_totalAmount_value_font {
  color: #1E90FF;
  font-family: InterfontSemiBold;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
}
.dialog_totalAmount_total_font {
  color: #FFFFFF;
  font-family: InterfontSemiBold;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
}
.dialog_totalAmount_total_inc_bg {
  border-radius: 8px;
  background: #1E90FF;
  padding: 4px 16px;
  justify-content: center;
  align-items: center;
}
/* .custom_truthcheckbox.disabled >>> .q-checkbox__bg {  
  border: none !important;
  background: #1E90FF !important;  
}

.custom_checkbox_disabl.disabled >>> .q-checkbox__bg {  
  border: 2px solid #969696; 
  background: #C8C8C8;  
} */


</style>
