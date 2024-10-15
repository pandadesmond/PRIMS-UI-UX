<template>
  <div v-if="$q.screen.width > 599" class="card_sides">
<!-- {{last_enter_field}} -->
    <q-card style="max-height: 100%;">

      <q-card-section class="theme_color dialog_header header_top">
        <div class="intermediate"/>
        <div v-if="page_function == 'CreateItemmaster'" class="text-subtitle1 header_text">
          {{ this.$language('D0202') }}
          <!-- Item Master -->
        </div>
        <div v-if="page_function == 'EditItemmaster'" class="text-subtitle1 header_text">
          {{ this.$language('D0202') }} <!-- Item Master--><br>
          <span class="text-caption">

             {{ this.$language('D0203') }}<!-- Item Code -->: {{ json.Itemcode }} | <!--{{ this.$language('D0216') }} -->Department: {{ json.Dept }} | <!--{{ this.$language('D0217') }} -->Sub-Department: {{json.SubDept}} | {{ this.$language('D0196') }}<!--Category-->: {{json.Category}}<br>
          </span>
        </div>
      </q-card-section>

      <q-card-section class="upload_container">
        <q-form ref="save_form">
          <div v-if="page_function == 'EditItemmaster' " class="intermediate_white"/>
          <div class="row upload_separator_first">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <q-stepper
                flat
                header-nav
                v-model="json.step"
                color="primary"
                animated
                :class="page_function == 'EditItemmaster'  ? 'sticky_stepper' : ''"
                @update:model-value="handleChangeStepper"
              >
                <q-step
                  :name="1"
                  :title="$language('D0040')"
                  icon="settings"
                  :done="json.step > 1"
                >
                  <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                      <div class="row dialog_separator">
                        <!-- <div class="col-xs-6 col-sm-4 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">

                              <SelectFilter
                              :readonly="false"
                              :no_label="false"
                              :label="'Supplier'"
                              v-model:pass_value="json.vendor_code"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.select"
                              :options="supplier_options"
                              v-on:receiveChange="handleChangeVCode"
                              />
                            </div>
                          </div>
                        </div> -->

                        <div :class="[item_calculation ? 'col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ', 'input_wrapper_right']">
                          <div class="row">
                            <div :class="[item_calculation ? 'col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6' : 'col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3']" style="padding-bottom: 10px; padding-left: 10px;">
                              <!-- page_function !== 'EditItemmaster' && json.vendor_code != '' && json.vendor_code != null ?  false : true -->
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              :label="$language('D0203')"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="json.Itemcode"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                            </div>

                            <div :class="[item_calculation ? 'col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6' : 'col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3']" style="padding-bottom: 10px; padding-left: 10px;">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Item link"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="json.ItemLink"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                            </div>

                            <div :class="[item_calculation ? 'col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6' : 'col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3']" style="padding-bottom: 10px; padding-left: 10px;">
                              <!-- Supplier -->
                              <SelectFilter
                              :readonly="page_function=='EditItemmaster' ? true: false"
                              :no_label="false"
                              :label="$language('D0025')"
                              v-model:pass_value="json.vendor_code"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.select"
                              :options="supplier_options"
                              v-on:receiveChange="handleChangeVCode"
                              />
                            </div>

                            <div :class="[item_calculation ? 'col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6' : 'col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3']" style="padding-bottom: 10px; padding-left: 10px;">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              :label="$language('D0098')"
                              :readonly="false"
                              v-on:change="handleChange"
                              v-model="json.Description"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_desc : oridbComponentBehavior.text" />
                            </div>

                            <div :class="[item_calculation ? 'col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6' : 'col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3']" style="padding-bottom: 10px; padding-left: 10px;">
                                <!-- $language('D0219') -->
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              :label="'Short Description'"
                              :readonly="false"
                              v-on:change="handleChange"
                              v-model="json.DesShort"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                            </div>

                            <div :class="[item_calculation ? 'col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6' : 'col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3']" style="padding-bottom: 10px; padding-left: 10px;">
                             <!-- $language('D0216') -->
                              <SelectFilter
                              :readonly="false"
                              :no_label="false"
                              :label="'Department'"
                              v-model:pass_value="json.Dept"
                              :dbComponentBehavior="action_change_selecting ? dbComponentBehavior.select : dbComponentBehavior.text_required"
                              :options="dept_options"
                              v-on:receiveChange="handleChangeDept"
                              />
                            </div>

                            <div :class="[item_calculation ? 'col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6' : 'col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3']" style="padding-bottom: 10px; padding-left: 10px;">
                              <q-card flat>
                                <q-card-section style="padding: 0px;">
                                  <!-- $language('D0217') -->
                                  <SelectFilter
                                  :readonly="false"
                                  :no_label="false"
                                  :label="'Sub-Department'"
                                  v-model:pass_value="json.SubDept"
                                  :dbComponentBehavior="action_change_selecting ? dbComponentBehavior.select : dbComponentBehavior.text_required"
                                  :options="sub_dept_options"
                                  v-on:receiveChange="handleChangeSubDept"
                                  :text_italic = "true"
                                  :result_message = "json.Dept == '' ? 'Please Select Department First': 'No results'"
                                  />
                                </q-card-section>

                                <q-inner-loading :showing="loading_sub_dept">
                                  <q-spinner-gears size="50px" color="primary" />
                                </q-inner-loading>
                              </q-card>
                            </div>



                            <div :class="[item_calculation ? 'col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6' : 'col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3']" style="padding-bottom: 10px; padding-left: 10px;">
                              <q-card flat>
                                <q-card-section style="padding: 0px;">

                                  <!-- Category -->
                                    <SelectFilter
                                      ref="selectComponent"
                                      :readonly="false"
                                      :no_label="false"
                                      :label="$language('D0196')"
                                      v-model:pass_value="json.Category"
                                      :dbComponentBehavior="action_change_selecting ? dbComponentBehavior.select : dbComponentBehavior.text_required"
                                      :options="category_options"
                                      v-on:receiveChange="handleChangeCategory"
                                      :text_italic = "true"
                                      :result_message = "json.Dept == '' ||  json.SubDept == ''  ? 'Please select Department and Sub-Department First':'No results'"
                                    />
                                </q-card-section>

                                <q-inner-loading :showing="loading_category">
                                  <q-spinner-gears size="50px" color="primary" />
                                </q-inner-loading>
                              </q-card>
                            </div>

                            <div :class="[item_calculation ? 'col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6' : 'col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3']" style="padding-bottom: 10px; padding-left: 10px;">
                              <!-- UOM -->
                              <SelectFilter
                              :readonly="false"
                              :no_label="false"
                              :label="$language('D0173')"
                              v-model:pass_value="json.UM"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.select"
                              :options="um_options"
                              v-on:receiveChange="handleChange"
                              />
                            </div>

                            <div :class="[item_calculation ? 'col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6' : 'col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3']" style="padding-bottom: 10px; padding-left: 10px;">
                              <!-- Bulk UOM -->
                              <SelectFilter
                              :readonly="false"
                              :no_label="false"
                              :label="$language('D0185')"
                              v-model:pass_value="json.UMBulk"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.select"
                              :options="um_options"
                              v-on:receiveChange="handleChange"
                              />
                            </div>

                            <div :class="[item_calculation ? 'col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6' : 'col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3']" style="padding-bottom: 10px; padding-left: 10px;">
                              <!-- Pack Size -->
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              :label="$language('D0100')"
                              :readonly="page_function  == 'EditItemmaster' ? true : false"
                              v-on:change="handleChange"
                              v-model="json.PackSize"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.input_number : oridbComponentBehavior.text" />
                            </div>


                            <div :class="[item_calculation ? 'col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6' : 'col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3']" style="padding-bottom: 10px; padding-left: 10px;">
                             <!-- Article No -->
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              :label="$language('D0101')"
                              :readonly="false"
                              v-on:change="handleChange"
                              v-model="json.ArticleNo"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                            </div>

                            <div :class="[item_calculation ? 'col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6' : 'col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3']" style="padding-bottom: 10px; padding-left: 10px;">
                              <q-card flat>
                                <q-card-section style="padding: 0px;">
                                  <!-- Brand -->
                                  <SelectFilter
                                      :readonly="false"
                                      :no_label="false"
                                      :label="$language('D0192')"
                                      v-model:pass_value="json.Brand"
                                      :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.select"
                                      :options="brand_options"
                                      v-on:receiveChange="handleChangeBrand"
                                      :text_italic = "true"
                                      :result_message = "json.Manufacturer == '' ? 'Please select Manufacturer First':'No results'"
                                      />
                                    </q-card-section>

                                  <q-inner-loading :showing="loading_brand">
                                    <q-spinner-gears size="50px" color="primary" />
                                  </q-inner-loading>
                              </q-card>
                            </div>

                            <div :class="[item_calculation ? 'col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6' : 'col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3']" style="padding-bottom: 10px; padding-left: 10px;">
                              <!-- Manufacturer -->
                              <SelectFilter
                                  :readonly="false"
                                  :no_label="false"
                                  :label="$language('D0207')"
                                  v-model:pass_value="json.Manufacturer"
                                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.select"
                                  :options="manufacturer_options"
                                  v-on:receiveChange="handleChangeManufacturer"
                                  :text_italic = "false"
                                  :result_message = "'No results'"
                                  />
                            </div>




                            <div :class="[item_calculation ? 'col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6' : 'col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3']" style="padding-bottom: 10px; padding-left: 10px;">
                             <!-- Origin -->
                              <SelectFilter
                              :readonly="false"
                              :no_label="false"
                              :label="$language('D0208')"
                              v-model:pass_value="json.Origin"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.select : oridbComponentBehavior.select"
                              :options="origin_options"
                              v-on:receiveChange="handleChange"
                              />
                            </div>


                            <div :class="[item_calculation ? 'col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6' : 'col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3']" style="padding-bottom: 10px; padding-left: 10px;">
                              <!-- Points -->
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              :label="$language('D0209')"
                              :readonly="false"
                              v-on:change="handleChange"
                              v-model="json.Point"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.input_number : oridbComponentBehavior.text" />
                            </div>

                            <div :class="[item_calculation ? 'col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6' : 'col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3']" style="padding-bottom: 10px; padding-left: 10px;">
                              <!-- $language('D0220') -->
                              <SelectFilter
                              :readonly="false"
                              :no_label="false"
                              :label="'Variant'"
                              v-model:pass_value="json.Colour"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.select"
                              :options="color_options"
                              v-on:receiveChange="handleChange"
                              :result_message = "'No results'"
                              />

                            </div>


                            <div :class="[item_calculation ? 'col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6' : 'col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3']" style="padding-bottom: 10px; padding-left: 10px;">
                            <!-- Size -->
                              <SelectFilter
                              :readonly="false"
                              :no_label="false"
                              :label="$language('D0191')"
                              v-model:pass_value="json.Size"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.select"
                              :options="size_options"
                              v-on:receiveChange="handleChange"
                              :result_message ="'No results'"
                              />
                            </div>


                            <div :class="[item_calculation ? 'col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6' : 'col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3']" style="padding-bottom: 10px; padding-left: 10px;">
                              <SelectFilter
                              :readonly="false"
                              :no_label="false"
                              :label="$language('D0210')"
                              v-model:pass_value="json.ItemType"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.select"
                              :options="item_type_options"
                              v-on:receiveChange="handleChange"
                              :result_message ="'No results'"
                              />
                            </div>


                            <div :class="[item_calculation ? 'col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6' : 'col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3']" style="padding-bottom: 10px; padding-left: 10px;">
                              <!-- Price Type -->
                              <SelectFilter
                              :readonly="false"
                              :no_label="false"
                              :label="$language('D0163')"
                              v-model:pass_value="json.price_type"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.select"
                              :options="price_type_options"
                              v-on:receiveChange="handleChange"
                              :result_message ="'No results'"
                              />
                            </div>

                            <div :class="[item_calculation ? 'col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6' : 'col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3']" style="padding-bottom: 10px; padding-left: 10px;">
                              <!-- Yield Ratio -->
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              :label="$language('D0211')"
                              :readonly="false"
                              v-on:change="handleChange"
                              v-model="json.YieldRatio"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.input_number : oridbComponentBehavior.text" />
                            </div>


                            <div :class="[item_calculation ? 'col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6' : 'col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3']" style="padding-bottom: 10px; padding-left: 10px;">
                            <!-- Old Code -->
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              :label="$language('D0212')"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="json.ItemBarcode "
                              :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.text : oridbComponentBehavior.text" />
                            </div>

                            <div :class="[item_calculation ? 'col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12' : 'col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6']" style="padding-bottom: 10px; padding-left: 10px;">
                              <!-- Tax -->
                              <SelectFilter
                              :readonly="false"
                              :no_label="false"
                              :label="'Tax (SST)'"
                              v-model:pass_value="json.TaxCode"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.select"
                              :options="tax_options"
                              v-on:receiveChange="handleChange"
                              :result_message ="'No results'"
                              />
                            </div>


                            <div :class="[item_calculation ? 'col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12' : 'col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6']" style="padding-bottom: 10px; padding-left: 10px;">
                              <!-- Tax -->
                              <SelectFilter
                              :readonly="false"
                              :no_label="false"
                              :label="'Tax Purchase'"
                              v-model:pass_value="json.tax_code_purchase"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.select"
                              :options="tax_purchase_options"
                              v-on:receiveChange="handleChange"
                              :result_message ="'No results'"
                              />
                            </div>

                            <div :class="[item_calculation ? 'col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12' : 'col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6']" style="padding-bottom: 10px; padding-left: 10px;">
                              <!-- Tax -->
                              <SelectFilter
                              :readonly="false"
                              :no_label="false"
                              :label="'Tax Supply'"
                              v-model:pass_value="json.tax_code_supply"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.select"
                              :options="tax_supply_options"
                              v-on:receiveChange="handleChange"
                              :result_message ="'No results'"
                              />
                            </div>


                            <!-- <div :class="[item_calculation ? 'col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6' : 'col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3']" style="padding-bottom: 10px; padding-left: 10px;">

                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Selling Price"
                              :readonly="page_function == 'EditItemmaster' ? true: false"
                              v-on:change="handleChange"
                              v-model="json.SellingPrice "
                              :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.input_number : oridbComponentBehavior.text" />
                            </div> -->

                            <div :class="[item_calculation ? 'col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12' : 'col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3']" style="padding-bottom: 10px; padding-left: 10px;">
                               <!-- $language('D0221') -->
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="RSP Inc Tax"
                              :readonly="page_function == 'EditItemmaster' ? true: false"
                              v-on:change="handleChange"
                              v-model="json.RSP_inc_tax "
                              :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.input_number : oridbComponentBehavior.text" />
                            </div>


                            <div :class="[item_calculation ? 'col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6' : 'col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3']" style="padding-bottom: 10px; padding-left: 10px;">
                                <!-- $language('D0222') -->
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="StdCost"
                              :readonly="page_function == 'EditItemmaster' ? true: false"
                              v-on:change="handleChange"
                              v-model="json.StdCost "
                              :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.input_number : oridbComponentBehavior.text" />
                            </div>


                            <div :class="[item_calculation ? 'col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6' : 'col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3']" style="padding-bottom: 10px; padding-left: 10px;">
                                <!-- $language('D0222') -->
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Avg Cost"
                              :readonly="page_function == 'EditItemmaster' ? true: false"
                              v-on:change="handleChange"
                              v-model="json.AverageCost "
                              :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.input_number : oridbComponentBehavior.text" />
                            </div>


                            <div :class="[item_calculation ? 'col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6' : 'col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3']" style="padding-bottom: 10px; padding-left: 10px;">
                                <!-- $language('D0222') -->
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Last Cost"
                              :readonly="page_function == 'EditItemmaster' ? true: false"
                              v-on:change="handleChange"
                              v-model="json.LastCost "
                              :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.input_number : oridbComponentBehavior.text" />
                            </div>


                            <div :class="[item_calculation ? 'col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6' : 'col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3']" style="padding-bottom: 10px; padding-left: 10px;">
                                <!-- $language('D0222') -->
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="FIFO Cost"
                              :readonly="page_function == 'EditItemmaster' ? true: false"
                              v-on:change="handleChange"
                              v-model="json.FIFOCost "
                              :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.input_number : oridbComponentBehavior.text" />
                            </div>

                            <div :class="[item_calculation ? 'col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6' : 'col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3']" style="padding-bottom: 10px; padding-left: 10px;">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              :label="'Ctn Qty (Isi Karton)'"
                              :readonly="false"
                              v-on:change="handleChangeCalculationNew"
                              v-model="json.BulkQty"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.input_number : oridbComponentBehavior.number" />
                            </div>

                            <div :class="[item_calculation ? 'col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6' : 'col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3']" style="padding-bottom: 10px;padding-left: 10px;">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              :label="'Ctn Price (H.Karton)'"
                              :readonly="true"
                              v-on:change="handleChangeCalculationNew"
                              v-model="json.cartonprice"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.input_number : oridbComponentBehavior.number" />
                            </div>

                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" style="padding-bottom: 10px; padding-left: 10px;">
                              <!-- Remarks -->
                              <Textarea class="ignore_height" :no_label="false" :readonly="json.BillStatus==1" v-on:receiveChange="handleChange" v-model="json.remark"
                              :dbComponentBehavior="dbComponentBehavior.remark" :pass_label="$language('D0055')" />
                            </div>

                          </div>
                        </div>


                        <div v-if="item_calculation" class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" style="padding-bottom: 10px;">
                              <Input
                              :autofocusclick="true"
                              :label="'Carton Cost (newly added) H.PriceList'"
                              :no_label="false"
                              :readonly="false"
                              v-on:change="handleChangeCalculation('carton_cost')"
                              v-model="json.carton_cost"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.input_number : oridbComponentBehavior.number" />
                            </div>

                            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" style="padding-bottom: 10px;padding-left: 10px;">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              :label="'Ctn Price (H.Karton)'"
                              :readonly="true"
                              v-on:change="handleChangeCalculationNew"
                              v-model="json.cartonprice"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.input_number : oridbComponentBehavior.number" />
                            </div>

                            <!-- <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" style="padding-bottom: 10px;padding-left: 10px;">
                              <Input
                              :autofocusclick="true"
                              :label="'Carton Price each unit (newly added) H.Karton'"
                              :no_label="false"
                              :readonly="true"
                              v-on:change="handleChangeCalculationNew"
                              v-model="json.carton_price"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.input_number : oridbComponentBehavior.number" />
                            </div> -->

                            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" style="padding-bottom: 10px;">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              :label="'Ctn Qty (Isi Karton)'"
                              :readonly="false"
                              v-on:change="handleChangeCalculationNew"
                              v-model="json.BulkQty"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.input_number : oridbComponentBehavior.number" />
                            </div>

                            <!-- <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" style="padding-bottom: 10px;">
                              <Input
                              :autofocusclick="true"
                              :label="'Carton Qty (newly added) Isi Karton'"
                              :no_label="false"
                              :readonly="true"
                              v-on:change="handleChangeCalculationNew"
                              v-model="json.carton_qty"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.input_number : oridbComponentBehavior.number" />
                            </div> -->

                            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" style="padding-bottom: 10px;padding-left: 10px;">
                              <Input
                              :autofocusclick="true"
                              :label="'Disc 1 (newly added) Disc.Reg 1'"
                              :no_label="false"
                              :readonly="false"
                              v-on:change="handleChangeCalculationNew"
                              v-model="json.disc_1"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.input_number : oridbComponentBehavior.number" />
                            </div>

                            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" style="padding-bottom: 10px;">
                              <Input
                              :autofocusclick="true"
                              :label="'Disc 2 (newly added) Disc.Reg 1'"
                              :no_label="false"
                              :readonly="false"
                              v-on:change="handleChangeCalculationNew"
                              v-model="json.disc_2"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.input_number : oridbComponentBehavior.number" />
                            </div>


                            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" style="padding-bottom: 10px;padding-left: 10px;">
                              <Input
                              :autofocusclick="true"
                              :label="'Discount By Amount (newly added) Disc RP'"
                              :no_label="false"
                              :readonly="false"
                              v-on:change="handleChangeCalculationNew"
                              v-model="json.disc_by_amount"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.input_number : oridbComponentBehavior.number" />
                            </div>

                            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" style="padding-bottom: 10px;">
                              <Input
                              :autofocusclick="true"
                              :label="'Price Per Unit (newly added) Harga Beli/Unit'"
                              :no_label="false"
                              :readonly="true"
                              v-on:change="handleChangeCalculationNew"
                              v-model="json.price_per_unit"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.input_number : oridbComponentBehavior.number" />
                            </div>

                            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" style="padding-bottom: 10px;padding-left: 10px;">
                              <Input
                              :autofocusclick="true"
                              :label="'Without tax (newly added) DPP'"
                              :no_label="false"
                              :readonly="true"
                              v-on:change="handleChangeCalculationNew"
                              v-model="json.without_tax"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.input_number : oridbComponentBehavior.number" />
                            </div>

                            <div class="col-xs-12 col-sm-12 col-md-1 col-lg-1 col-xl-1" style="padding-bottom: 10px;">
                              <Input
                              :autofocusclick="true"
                              :label="'Tax (newly added) PPN'"
                              :no_label="false"
                              :readonly="false"
                              v-on:change="handleChangeCalculationNew"
                              v-model="json.tax"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.input_number : oridbComponentBehavior.number" />
                            </div>

                            <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5 col-xl-5" style="padding-bottom: 10px;">
                              <Input
                              :autofocusclick="true"
                              :label="'Tax Amount (newly added)'"
                              :no_label="false"
                              :readonly="true"
                              v-on:change="handleChangeCalculationNew"
                              v-model="json.tax_amount"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.input_number : oridbComponentBehavior.number" />
                            </div>

                            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" style="padding-bottom: 10px;padding-left: 10px;">
                              <Input
                              :autofocusclick="true"
                              :label="'Amount with tax (newly added) Harga+PPN'"
                              :no_label="false"
                              :readonly="true"
                              v-on:change="handleChangeCalculationNew"
                              v-model="json.amount_with_tax"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.input_number : oridbComponentBehavior.number" />
                            </div>


                            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" style="padding-bottom: 10px;">
                              <Input
                              :autofocusclick="true"
                              :label="'Margin (newly added) Margin'"
                              :no_label="false"
                              :readonly="false"
                              v-on:change="handleChangeCalculationNew"
                              v-model="json.margin"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.input_number : oridbComponentBehavior.number" />
                            </div>

                            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" style="padding-bottom: 10px;padding-left: 10px;">
                              <Input
                              :autofocusclick="true"
                              :label="'Rounding (newly added) Pembulatan'"
                              :no_label="false"
                              :readonly="false"
                              v-on:change="handleChangeCalculationNew"
                              v-model="json.rounding"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.input_number : oridbComponentBehavior.number" />
                            </div>


                            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" style="padding-bottom: 10px;">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Selling Price (newly added) Harga Jual Standard"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="json.SellingPrice "
                              :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.input_number : oridbComponentBehavior.number" />
                            </div>
                            <!-- :readonly="page_function == 'EditItemmaster' ? true: false" -->

                            <!-- <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" style="padding-bottom: 10px;">
                              <Input
                              :autofocusclick="true"
                              :label="'Selling Price each unit (newly added) Harga Jual Standard'"
                              :no_label="false"
                              :readonly="true"
                              v-on:change="handleChangeCalculationNew"
                              v-model="json.selling_price_each_unit"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.input_number : oridbComponentBehavior.number" />
                            </div> -->


                            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" style="padding-bottom: 10px;padding-left: 10px;">
                              <Input
                              :autofocusclick="true"
                              :label="'Amount Include Tax (newly added) Kalkulasi Include'"
                              :no_label="false"
                              :readonly="false"
                              v-on:change="handleChangeCalculationReverse('amount_include_tax')"
                              v-model="json.amount_include_tax"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.input_number : oridbComponentBehavior.number" />
                            </div>
                            <!-- handleChangeCalculationReverse -->
                            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                              <b>Receive (pending save to web trans c)</b>
                              <Checkbox size="xs" v-model="is_receiving" style="padding-bottom: 4px;" />
                            </div>

                          </div>
                        </div>





                        <!-- <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 input_wrapper_right ">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Item Code"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="json.Itemcode"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div> -->


                        <!-- <div class="input_wrapper_right" :class="page_function == 'CreateItemmaster' ? 'col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 ': 'col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 '">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Item link"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="json.ItemLink"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div> -->

                      </div>

                      <!-- <div class="row dialog_separator">
                        <div class="col-xs-6 col-sm-6 col-md-2 col-lg-2 col-xl-2 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              :label="'Pack Size'"
                              :readonly="page_function  == 'EditItemmaster' ? true : false"
                              v-on:change="handleChange"
                              v-model="json.PackSize"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.input_number : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-2 col-lg-2 col-xl-2 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <SelectFilter
                              :readonly="false"
                              :no_label="false"
                              :label="'UOM'"
                              v-model:pass_value="json.UM"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.select"
                              :options="um_options"
                              v-on:receiveChange="handleChange"
                              />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              :label="'Ctn Qty'"
                              :readonly="false"
                              v-on:change="handleChange"
                              v-model="json.BulkQty"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.input_number : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-2 col-lg-2 col-xl-2 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <SelectFilter
                              :readonly="false"
                              :no_label="false"
                              :label="'Bulk UOM'"
                              v-model:pass_value="json.UMBulk"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.select"
                              :options="um_options"
                              v-on:receiveChange="handleChange"
                              />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              :label="'Ctn Price'"
                              :readonly="false"
                              v-on:change="handleChange"
                              v-model="json.cartonprice"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.input_number : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>
                      </div> -->

                      <!-- <div class="row dialog_separator">
                        <div class="col-xs-6 col-sm-6 col-md-8 col-lg-8 col-xl-8 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              :label="'Description'"
                              :readonly="false"
                              v-on:change="handleChange"
                              v-model="json.Description"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_desc : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              :label="'Short Description'"
                              :readonly="false"
                              v-on:change="handleChange"
                              v-model="json.DesShort"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_desc : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>


                      </div> -->

                      <!-- <div class="row dialog_separator">
                        <div class="col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <SelectFilter
                              :readonly="false"
                              :no_label="false"
                              :label="'Department'"
                              v-model:pass_value="json.Dept"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.select"
                              :options="dept_options"
                              v-on:receiveChange="handleChangeDept"
                              />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <q-card flat>
                                <q-card-section style="padding: 0px;">
                                  <SelectFilter
                                  :readonly="false"
                                  :no_label="false"
                                  :label="'Sub-Department'"
                                  v-model:pass_value="json.SubDept"
                                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.select"
                                  :options="sub_dept_options"
                                  v-on:receiveChange="handleChangeSubDept"
                                  :text_italic = "true"
                                  :result_message = "json.Dept == '' ? 'Please Select Department First': 'No results'"
                                  />
                                </q-card-section>

                                <q-inner-loading :showing="loading_sub_dept">
                                  <q-spinner-gears size="50px" color="primary" />
                                </q-inner-loading>
                              </q-card>
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-3 col-md-2 col-lg-2 col-xl-2 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <q-card flat>
                                <q-card-section style="padding: 0px;">
                                    <SelectFilter
                                    :readonly="false"
                                    :no_label="false"
                                    :label="'Category'"
                                    v-model:pass_value="json.Category"
                                    :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.select"
                                    :options="category_options"
                                    v-on:receiveChange="handleChangeCategory"
                                    :text_italic = "true"
                                    :result_message = "json.Dept == '' ||  json.SubDept == ''  ? 'Please select Department and Sub-Department First':'No results'"
                                    />
                                </q-card-section>

                                <q-inner-loading :showing="loading_category">
                                  <q-spinner-gears size="50px" color="primary" />
                                </q-inner-loading>
                              </q-card>
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-3 col-md-2 col-lg-2 col-xl-2 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Article No"
                              :readonly="false"
                              v-on:change="handleChange"
                              v-model="json.ArticleNo"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>
                      </div> -->

                      <!-- <div class="row dialog_separator">
                        <div class="col-xs-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <SelectFilter
                                  :readonly="false"
                                  :no_label="false"
                                  :label="'Manufacturer'"
                                  v-model:pass_value="json.Manufacturer"
                                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.select"
                                  :options="manufacturer_options"
                                  v-on:receiveChange="handleChangeManufacturer"
                                  :text_italic = "false"
                                  :result_message = "'No results'"
                                  />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <q-card flat>
                                <q-card-section style="padding: 0px;">
                                  <SelectFilter
                                      :readonly="false"
                                      :no_label="false"
                                      :label="'Brand'"
                                      v-model:pass_value="json.Brand"
                                      :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.select"
                                      :options="brand_options"
                                      v-on:receiveChange="handleChangeBrand"
                                      :text_italic = "true"
                                      :result_message = "json.Manufacturer == '' ? 'Please select Manufacturer First':'No results'"
                                      />
                                    </q-card-section>

                                  <q-inner-loading :showing="loading_brand">
                                    <q-spinner-gears size="50px" color="primary" />
                                  </q-inner-loading>
                              </q-card>

                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-3 col-md-3 col-lg-3 col-xl-3 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <SelectFilter
                              :readonly="false"
                              :no_label="false"
                              :label="'Origin'"
                              v-model:pass_value="json.Origin"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.select"
                              :options="origin_options"
                              v-on:receiveChange="handleChange"
                              />
                            </div>
                          </div>
                        </div>
                        <div class="col-xs-6 col-sm-3 col-md-3 col-lg-3 col-xl-3 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Points"
                              :readonly="false"
                              v-on:change="handleChange"
                              v-model="json.Point"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.input_number : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>
                      </div> -->

                      <!-- <div class="row dialog_separator">
                        <div class="col-xs-6 col-sm-3 col-md-3 col-lg-3 col-xl-3 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <SelectFilter
                              :readonly="false"
                              :no_label="false"
                              :label="'Supplier'"
                              v-model:pass_value="json.vendor_code"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.select"
                              :options="supplier_options"
                              v-on:receiveChange="handleChangeVCode"
                              />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <SelectFilter
                              :readonly="false"
                              :no_label="false"
                              :label="'Variant'"
                              v-model:pass_value="json.Colour"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.select"
                              :options="color_options"
                              v-on:receiveChange="handleChange"
                              :result_message = "'No results'"
                              />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <SelectFilter
                              :readonly="false"
                              :no_label="false"
                              :label="'Size'"
                              v-model:pass_value="json.Size"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.select"
                              :options="size_options"
                              v-on:receiveChange="handleChange"
                              :result_message ="'No results'"
                              />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 input_wrapper_right">
                          <div class="row" :class="$q.screen.width > 599 && $q.screen.width < 1023 ? 'dialog_separator' : ''">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <SelectFilter
                              :readonly="false"
                              :no_label="false"
                              :label="'Item Type'"
                              v-model:pass_value="json.ItemType"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.select"
                              :options="item_type_options"
                              v-on:receiveChange="handleChange"
                              :result_message ="'No results'"
                              />
                            </div>
                          </div>
                        </div>


                      </div> -->

                      <!-- <div class="row dialog_separator">
                        <div class="col-xs-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 input_wrapper_right">
                          <div class="row" :class="$q.screen.width > 599 && $q.screen.width < 1023 ? 'dialog_separator' : ''">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <SelectFilter
                              :readonly="false"
                              :no_label="false"
                              :label="'Price Type'"
                              v-model:pass_value="json.price_type"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.select"
                              :options="price_type_options"
                              v-on:receiveChange="handleChange"
                              :result_message ="'No results'"
                              />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              :label="'Yield Ratio'"
                              :readonly="false"
                              v-on:change="handleChange"
                              v-model="json.YieldRatio"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.input_number : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Old Code"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="json.ItemBarcode "
                              :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.text : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                      </div> -->



                      <!-- <div class="row dialog_separator">
                        <div class="col-xs-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Selling Price"
                              :readonly="page_function == 'EditItemmaster' ? true: false"
                              v-on:change="handleChange"
                              v-model="json.SellingPrice "
                              :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.input_number : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="RSP Inc Tax"
                              :readonly="page_function == 'EditItemmaster' ? true: false"
                              v-on:change="handleChange"
                              v-model="json.RSP_inc_tax "
                              :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.input_number : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="StdCost"
                              :readonly="page_function == 'EditItemmaster' ? true: false"
                              v-on:change="handleChange"
                              v-model="json.StdCost "
                              :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.input_number : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>


                      </div> -->

                      <div class="row dialog_separator">
                        <!-- <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 input_wrapper_right">
                          <div class="row" :class="$q.screen.width > 599 && $q.screen.width < 1023 ? 'dialog_separator' : ''">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Textarea class="ignore_height" :no_label="false" :readonly="json.BillStatus==1" v-on:receiveChange="handleChange" v-model="json.remark"
                              :dbComponentBehavior="dbComponentBehavior.remark" :pass_label="'Remarks'" />
                            </div>
                          </div>
                        </div> -->




                        <!-- <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 input_wrapper_right">
                              <Input
                              :autofocusclick="true"
                              :label="'Carton Cost (newly added) H.PriceList'"
                              :no_label="false"
                              :readonly="false"
                              v-on:change="handleChangeCalculation('carton_cost')"
                              v-model="json.carton_cost"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.input_number : oridbComponentBehavior.text" />
                            </div>

                            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 input_wrapper_right">
                              <Input
                              :autofocusclick="true"
                              :label="'Carton Price each unit (newly added) H.Karton'"
                              :no_label="false"
                              :readonly="true"
                              v-on:change="handleChangeCalculation"
                              v-model="json.carton_price"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.input_number : oridbComponentBehavior.text" />
                            </div>

                            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 input_wrapper_right">
                              <Input
                              :autofocusclick="true"
                              :label="'Carton Qty (newly added) Isi Karton'"
                              :no_label="false"
                              :readonly="true"
                              v-on:change="handleChangeCalculation"
                              v-model="json.carton_qty"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.input_number : oridbComponentBehavior.text" />
                            </div>

                            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 input_wrapper_right">
                              <Input
                              :autofocusclick="true"
                              :label="'Disc 1 (newly added) Disc.Reg 1'"
                              :no_label="false"
                              :readonly="false"
                              v-on:change="handleChangeCalculation"
                              v-model="json.disc_1"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.input_number : oridbComponentBehavior.text" />
                            </div>

                            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 input_wrapper_right">
                              <Input
                              :autofocusclick="true"
                              :label="'Disc 2 (newly added) Disc.Reg 1'"
                              :no_label="false"
                              :readonly="false"
                              v-on:change="handleChangeCalculation"
                              v-model="json.disc_2"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.input_number : oridbComponentBehavior.text" />
                            </div>


                            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 input_wrapper_right">
                              <Input
                              :autofocusclick="true"
                              :label="'Discount By Amount (newly added) Disc RP'"
                              :no_label="false"
                              :readonly="false"
                              v-on:change="handleChangeCalculation"
                              v-model="json.disc_by_amount"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.input_number : oridbComponentBehavior.text" />
                            </div>

                            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 input_wrapper_right">
                              <Input
                              :autofocusclick="true"
                              :label="'Price Per Unit (newly added) Harga Beli/Unit'"
                              :no_label="false"
                              :readonly="true"
                              v-on:change="handleChangeCalculation"
                              v-model="json.price_per_unit"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.input_number : oridbComponentBehavior.text" />
                            </div>

                            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 input_wrapper_right">
                              <Input
                              :autofocusclick="true"
                              :label="'Without tax (newly added) DPP'"
                              :no_label="false"
                              :readonly="true"
                              v-on:change="handleChangeCalculation"
                              v-model="json.without_tax"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.input_number : oridbComponentBehavior.text" />
                            </div>

                            <div class="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2 input_wrapper_right">
                              <Input
                              :autofocusclick="true"
                              :label="'Tax (newly added) PPN'"
                              :no_label="false"
                              :readonly="false"
                              v-on:change="handleChangeCalculation"
                              v-model="json.tax"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.input_number : oridbComponentBehavior.text" />
                            </div>

                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                              <Input
                              :autofocusclick="true"
                              :label="'Tax Amount (newly added)'"
                              :no_label="false"
                              :readonly="true"
                              v-on:change="handleChangeCalculation"
                              v-model="json.tax_amount"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.input_number : oridbComponentBehavior.text" />
                            </div>

                            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 input_wrapper_right">
                              <Input
                              :autofocusclick="true"
                              :label="'Amount with tax (newly added) Harga+PPN'"
                              :no_label="false"
                              :readonly="true"
                              v-on:change="handleChangeCalculation"
                              v-model="json.amount_with_tax"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.input_number : oridbComponentBehavior.text" />
                            </div>


                            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 input_wrapper_right">
                              <Input
                              :autofocusclick="true"
                              :label="'Margin (newly added) Margin'"
                              :no_label="false"
                              :readonly="false"
                              v-on:change="handleChangeCalculation"
                              v-model="json.margin"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.input_number : oridbComponentBehavior.text" />
                            </div>

                            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 input_wrapper_right">
                              <Input
                              :autofocusclick="true"
                              :label="'Rounding (newly added) Pembulatan'"
                              :no_label="false"
                              :readonly="false"
                              v-on:change="handleChangeCalculation"
                              v-model="json.rounding"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.input_number : oridbComponentBehavior.text" />
                            </div>

                            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 input_wrapper_right">
                              <Input
                              :autofocusclick="true"
                              :label="'Selling Price each unit (newly added) Harga Jual Standard'"
                              :no_label="false"
                              :readonly="true"
                              v-on:change="handleChangeCalculation"
                              v-model="json.selling_price_each_unit"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.input_number : oridbComponentBehavior.text" />
                            </div>


                            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 input_wrapper_right">
                              <Input
                              :autofocusclick="true"
                              :label="'Amount Include Tax (newly added) Kalkulasi Include'"
                              :no_label="false"
                              :readonly="false"
                              v-on:change="handleChangeCalculation"
                              v-model="json.amount_include_tax"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.input_number : oridbComponentBehavior.text" />
                            </div>


                          </div>
                        </div> -->

                      </div>
                    </div>
                  </div>
                </q-step>
               <q-step
                  v-if="page_function == 'EditItemmaster'"
                  :name="2"
                  title="Barcode"
                  icon="create_new_folder"
                  :done="json.step > 2"
                >
                  <div class="row">
                      <div class="card_section_two col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <PurchaseTable
                          hide_footer
                          :group_button="false"
                          :select_all="false"
                          :readonly_button="false"
                          :row_per_page="[0]"
                          :top_button="page_function=='EditItemmaster'"
                          :top_button_dropdown="false"
                          v-on:main_supplier_item_list="supplierItemlist()"
                          v-on:add_button="addButtonBarcode"
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
                          :delete_button="true"
                          :flat_status="true"
                          :bordered_status="true"
                          v-on:receiveRequestTable="handleTableChange"
                          />
                      </div>
                  </div>
                </q-step>
                <q-step
                  v-if="page_function == 'EditItemmaster'"
                  :name="3"
                  title="Branch Info"
                  icon="mdi-information-variant"
                  :done="json.step > 3"
                >
                  <div class="row">
                      <div class="card_section_two col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <PurchaseTable
                          hide_footer
                          :readonly_button="false"
                          :row_per_page="[0]"
                          :top_button_dropdown="false"
                          :title="table_title"
                          :table_data="branch_table_data"
                          :table_column="branch_table_column"
                          :action_button="true"
                          :edit_button="false"
                          :view_button="false"
                          :delete_button="true"
                          :flat_status="true"
                          :bordered_status="true"
                          v-on:receiveRequestTable="handleBranchTableChange"
                          />
                      </div>
                  </div>
                </q-step>
                <q-step
                  v-if="page_function == 'EditItemmaster'"
                  :name="4"
                  title="Supplier Item"
                  icon="create_new_folder"
                  :done="json.step > 4"
                >
                  <div class="row">
                      <div class="card_section_two col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <PurchaseTable
                          hide_footer
                          :group_button="false"
                          :select_all="false"
                          :readonly_button="false"
                          :row_per_page="[0]"
                          :top_button="page_function=='EditItemmaster'"
                          :top_button_dropdown="false"
                          v-on:add_button="addButtonSupplierItem"
                          v-on:main_action="handleEditSupplierItem"
                          v-on:main_delete="handleDeleteSupplierItem"
                          :title="table_title"
                          :table_data="supplier_item_table_data"
                          :table_column="supplier_item_table_column"
                          :action_button="true"
                          :edit_button="false"
                          :view_button="false"
                          :delete_button="true"
                          :flat_status="true"
                          :bordered_status="true"
                          v-on:receiveRequestTable="handleSupplierItemTableChange"
                          />
                      </div>
                  </div>
                </q-step>
                <!-- && page_function !== 'CreateItemmaster' -->
               <!-- <q-step
                  v-if="page_function == 'EditItemmaster'"
                  :name="3"
                  title="Price/Cost"
                  icon="create_new_folder"
                  :done="json.step > 3"
                >

                  <div v-if="page_function=='EditItemmaster'">
                   <div class="row dialog_separator">
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                       <div class="row">
                          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 input_wrapper_right">
                            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2  dialog_separator">
                              <div class="dialog_font text-center">Inc.Tax</div>
                              </div>
                              <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2  dialog_separator">
                                <Input
                                :autofocusclick="true"
                                :no_label="false"
                                label="Selling Price"
                                :readonly="false"
                                v-on:change="handleChange"
                                v-model="json.SubTotal1"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                              </div>
                              <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2  dialog_separator">
                                <Input
                                :autofocusclick="true"
                                :no_label="false"
                                label="RSP"
                                :readonly="false"
                                v-on:change="handleChange"
                                v-model="json.RSP_inc_tax"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                              </div>
                              <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2  dialog_separator">
                                <Input
                                :autofocusclick="true"
                                :no_label="false"
                                label="T.Margin %"
                                :readonly="false"
                                v-on:change="handleChange"
                                v-model="json.SubTotal1"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                              </div>
                              <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2  dialog_separator">
                                <Input
                                :autofocusclick="true"
                                :no_label="false"
                                label="Listed Cost"
                                :readonly="false"
                                v-on:change="handleChange"
                                v-model="json.SubTotal1"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                              </div>
                              <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2  dialog_separator">
                                <Input
                                :autofocusclick="true"
                                :no_label="false"
                                label="Avg Cost"
                                :readonly="false"
                                v-on:change="handleChange"
                                v-model="json.SubTotal1"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                              </div>
                              <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2  dialog_separator">
                                <Input
                                :autofocusclick="true"
                                :no_label="false"
                                label="Last Cost"
                                :readonly="false"
                                v-on:change="handleChange"
                                v-model="json.SubTotal1"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                              </div>
                              <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2  dialog_separator">
                                <Input
                                :autofocusclick="true"
                                :no_label="false"
                                label="FIFO Cost"
                                :readonly="true"
                                v-on:change="handleChange"
                                v-model="json.FIFOCost"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                              </div>

                          </div>

                          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 input_wrapper_right">
                            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2  dialog_separator">
                              <div class="dialog_font text-center">Exc.Tax</div>
                              </div>
                              <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2  dialog_separator">
                                <Input
                                :autofocusclick="true"
                                :no_label="false"
                                label="Selling Price"
                                :readonly="false"
                                v-on:change="handleChange"
                                v-model="json.SubTotal1"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                              </div>
                              <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2  dialog_separator">
                                <Input
                                :autofocusclick="true"
                                :no_label="false"
                                label="RSP"
                                :readonly="false"
                                v-on:change="handleChange"
                                v-model="json.SubTotal1"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                              </div>
                              <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2  dialog_separator">
                                <Input
                                :autofocusclick="true"
                                :no_label="false"
                                label="G.Margin %"
                                :readonly="false"
                                v-on:change="handleChange"
                                v-model="json.SubTotal1"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                              </div>
                              <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2  dialog_separator">
                                <Input
                                :autofocusclick="true"
                                :no_label="false"
                                label="Listed Cost"
                                :readonly="false"
                                v-on:change="handleChange"
                                v-model="json.SubTotal1"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                              </div>
                              <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2  dialog_separator">
                                <Input
                                :autofocusclick="true"
                                :no_label="false"
                                label="Avg Cost"
                                :readonly="false"
                                v-on:change="handleChange"
                                v-model="json.SubTotal1"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                              </div>
                              <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2  dialog_separator">
                                <Input
                                :autofocusclick="true"
                                :no_label="false"
                                label="Last Cost"
                                :readonly="false"
                                v-on:change="handleChange"
                                v-model="json.SubTotal1"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                              </div>
                              <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2  dialog_separator">
                                <Input
                                :autofocusclick="true"
                                :no_label="false"
                                label="FIFO Cost"
                                :readonly="true"
                                v-on:change="handleChange"
                                v-model="json.SubTotal1"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                              </div>

                          </div>
                        </div>

                     </div>
                     <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                      <div class="row">
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12   ">
                              <div class="dialog_font">Consign Cost Margin</div>
                              </div>

                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12  dialog_separator">
                                <div class="row">
                                    <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 input_wrapper_right">
                                      <Checkbox size="xs" :disable="false" v-model="json.costmargin" :true-value="1" :false-value="0" />
                                    </div>
                                    <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 input_wrapper_right">
                                      <Input
                                      :autofocusclick="true"
                                      :no_label="false"
                                      label=""
                                      :readonly="false"
                                      v-on:change="handleChange"
                                      v-model="json.costmarginvalue"
                                      :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                                    </div>
                                    <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                                      <SelectFilter
                                        :readonly="false"
                                        :no_label="false"
                                        :label="''"
                                        v-model:pass_value="json.CostMarginType"
                                        :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.select"
                                        :options="prc_type_options"
                                        v-on:receiveChange="handleChange"
                                        :result_message ="'No results'"
                                        />
                                    </div>
                                  </div>


                              </div>
                            </div>
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
                                <div class="row">
                                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                                      <SelectFilter
                                        :readonly="false"
                                        :no_label="false"
                                        :label="'GST Supply'"
                                        v-model:pass_value="json.tax_code_supply"
                                        :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.select"
                                        :options="tax_supply_options"
                                        v-on:receiveChange="handleChange"
                                        :result_message ="'No results'"
                                        />
                                    </div>
                                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 input_wrapper_right" >
                                      <SelectFilter
                                        :readonly="false"
                                        :no_label="false"
                                        :label="'GST Purchase'"
                                        v-model:pass_value="json.tax_code_purchase"
                                        :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.select"
                                        :options="tax_purchase_options"
                                        v-on:receiveChange="handleChange"
                                        :result_message ="'No results'"
                                        />
                                    </div>
                                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                                      <SelectFilter
                                        :readonly="false"
                                        :no_label="false"
                                        :label="'SST'"
                                        v-model:pass_value="json.TaxCode"
                                        :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.select"
                                        :options="tax_sst_options"
                                        v-on:receiveChange="handleChange"
                                        :result_message ="'No results'"
                                        />
                                    </div>
                                  </div>


                              </div>
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12  dialog_separator">
                                <div class="dialog_font">Status</div>
                                <Radio size="xs" :disable="status" v-on:receiveChange="handleChangeEntryType" v-model="json.status" :options="status_options"  />
                              </div>
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12  dialog_separator">
                              <div class="dialog_font">Weighing Item</div>
                              </div>
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12  dialog_separator">
                                <div class="row">
                                    <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 input_wrapper_right">
                                      <Checkbox size="xs" :disable="false" v-model="json.weighing_chk" :true-value="1" :false-value="0" />
                                    </div>
                                    <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 input_wrapper_right">
                                      <SelectFilter
                                        :readonly="false"
                                        :no_label="false"
                                        :label="''"
                                        v-model:pass_value="json.weighing_item"
                                        :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.select"
                                        :options="prc_type_options"
                                        v-on:receiveChange="handleChange"
                                        :result_message ="'No results'"
                                        />
                                    </div>
                                    <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5">
                                      <Input
                                      :autofocusclick="true"
                                      :no_label="false"
                                      label="Use by"
                                      :readonly="false"
                                      v-on:change="handleChange"
                                      v-model="json.use_by"
                                      :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                                    </div>
                                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 input_wrapper_right">
                                      <SelectFilter
                                        :readonly="false"
                                        :no_label="false"
                                        :label="'Trace by Qty'"
                                        v-model:pass_value="json.WeightTraceQty"
                                        :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.select"
                                        :options="prc_type_options"
                                        v-on:receiveChange="handleChange"
                                        :result_message ="'No results'"
                                        />
                                    </div>
                                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                      <Input
                                      :autofocusclick="true"
                                      :no_label="false"
                                      label="Tolerence"
                                      :readonly="false"
                                      v-on:change="handleChange"
                                      v-model="json.use_by"
                                      :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                                    </div>

                                  </div>


                              </div>
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12  dialog_separator">
                                <div class="dialog_font">Point Method</div>
                                <Radio size="xs" :disable="false" v-on:receiveChange="handleChangeEntryType" v-model="json.point_method" :options="point_options"  />
                              </div>

                      </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">

                        <div class="row">
                          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 input_wrapper_right">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-pl-sm">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
                                <Input
                                :autofocusclick="true"
                                :no_label="false"
                                label="Weight"
                                :readonly="false"
                                v-on:change="handleChange"
                                v-model="json.SubTotal1"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                              </div>
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
                                <Input
                                :autofocusclick="true"
                                :no_label="false"
                                label="Length"
                                :readonly="false"
                                v-on:change="handleChange"
                                v-model="json.SubTotal1"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                              </div>
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
                                <Input
                                :autofocusclick="true"
                                :no_label="false"
                                label="Width"
                                :readonly="false"
                                v-on:change="handleChange"
                                v-model="json.SubTotal1"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                              </div>
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
                                <Input
                                :autofocusclick="true"
                                :no_label="false"
                                label="Height"
                                :readonly="false"
                                v-on:change="handleChange"
                                v-model="json.SubTotal1"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                              </div>
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
                                <Input
                                :autofocusclick="true"
                                :no_label="false"
                                label="Volume"
                                :readonly="false"
                                v-on:change="handleChange"
                                v-model="json.SubTotal1"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                              </div>
                            </div>
                          </div>

                          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 section_separator">
                              <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                                  <div class="row">
                                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                                      <Checkbox size="xs" :disable="false" v-model="json.hamper" :true-value="1" :false-value="0" />
                                    </div>
                                    <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 dialog_separator">
                                     Hamper
                                    </div>
                                  </div>
                              </div>
                              <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                                  <div class="row">
                                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                                      <Checkbox size="xs" :disable="false" v-model="json.OpenItem" :true-value="1" :false-value="0" />
                                    </div>
                                    <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 dialog_separator">
                                      Open Item
                                    </div>
                                  </div>
                              </div>
                              <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                                  <div class="row">
                                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                                      <Checkbox size="xs" :disable="false" v-model="json.item_package" :true-value="1" :false-value="0" />
                                    </div>
                                    <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 dialog_separator">
                                      Package
                                    </div>
                                  </div>
                              </div>
                              <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                                  <div class="row">
                                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                                      <Checkbox size="xs" :disable="false" v-model="json.serial_no" :true-value="1" :false-value="0" />
                                    </div>
                                    <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 dialog_separator">
                                      Serial No.
                                    </div>
                                  </div>
                              </div>
                              <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                                  <div class="row">
                                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                                      <Checkbox size="xs" :disable="false" v-model="json.Consign" :true-value="1" :false-value="0" />
                                    </div>
                                    <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 dialog_separator">
                                     Consignment
                                    </div>
                                  </div>
                              </div>
                              <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                                  <div class="row">
                                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                                      <Checkbox size="xs" :disable="false" v-model="json.non_inventory" :true-value="1" :false-value="0" />
                                    </div>
                                    <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 dialog_separator">
                                      Non Inventory
                                    </div>
                                  </div>
                              </div>
                              <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                                  <div class="row">
                                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                                      <Checkbox size="xs" :disable="false" v-model="json.no_promotion" :true-value="1" :false-value="0" />
                                    </div>
                                    <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 dialog_separator">
                                      No Promotion
                                    </div>
                                  </div>
                              </div>
                              <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                                  <div class="row">
                                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                                      <Checkbox size="xs" :disable="false" v-model="json.zero_price" :true-value="1" :false-value="0" />
                                    </div>
                                    <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 dialog_separator">
                                      Zero Price
                                    </div>
                                  </div>
                              </div>
                            </div>
                          </div>
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
          <!-- <Button_icon v-if="page_function == 'EditItemmaster'"  :flat="true" :font_color="'white'" :color="'#094161'" :text="json.BillStatus==1 ? 'UNPOST' : 'POST'" :outline="false" size="15px"
            v-on:receiveClick="confirmPost"/> -->

          <span class="q-pl-xs">
              <Button_icon :flat="true" :font_color="'white'" :color="'#094161'" :text="'SAVE'" :outline="false" size="15px"
              v-on:receiveClick="handleCreateIM"/>
          </span>

          <span v-if="page_function == 'EditItemmaster'" class="q-pl-xs">
            <Button_icon v-if="page_function=='EditItemmaster'" :flat="false" :font_color="'black'" :color="'white'" :text="'NEXT'" :outline="true" size="15px"
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
          v-on:receiveClick="handleCreateIM"/>
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
        <div v-if="page_function == 'CreateItemmaster'" class="text-subtitle1 header_text" style="padding-top: 10px;">{{ $language('D0202') }}<!-- Item Master --></div>
        <div v-if="page_function == 'EditItemmaster'" class="text-subtitle1 header_text">{{ $language('D0202') }} <!--Item Master-->
        <br>{{ $language('D0203') }} <!--Item Code -->: {{ json.Itemcode }}</div>
        <!-- <q-btn-dropdown v-if="page_function == 'EditItemmaster'" :disable="showAddLoading" class="custom_more_button" flat dense icon="more_vert">
          <q-list>
            <q-item clickable v-close-popup>
              <q-item-section>
                <q-item-label @click="confirmPost" v-if="json.BillStatus==1"> {{ $language('D0148') }}UNPOST</q-item-label>
                <q-item-label @click="confirmPost" v-else>{{ $language('D0019') }}  POST </q-item-label>
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
                v-model="json.step"
                color="primary"
                animated
                class="sticky_stepper"
                header-nav
                @update:model-value="handleChangeStepper"
              >
                <q-step
                  :name="1"
                  :title="$language('D0040')"
                  icon="settings"
                  :done="json.step > 1"
                >
                <!--Header-->
                  <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-9 col-lg-9 col-xl-9">
                      <div class="row dialog_separator">

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

                        <div :class="page_function == 'CreateItemmaster' ? 'col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4' : 'col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4'" class="input_wrapper_right">
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

                        <div class="input_wrapper_right" :class="page_function == 'CreateItemmaster' ?  'col-xs-10' : json.BillStatus == 0 && !supplier_readonly ? 'col-xs-4' : 'col-xs-6'"> -->

                        <!-- <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 input_wrapper_right" >

                          <div class="row" :class="$q.screen.width < 1024 ? 'dialog_separator' : ''">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Supplier</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <SelectFilter
                              :readonly="json.BillStatus==1 || supplier_readonly"
                              :no_label="true"
                              v-model:pass_value="json.vendor_code"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.select"
                              :options="supplier_options"
                              v-on:receiveChange="handleChangeSCode"
                              />
                            </div>
                          </div>
                        </div> -->



                        <div :class="page_function == 'CreateItemmaster' ? 'col-xs-12 col-sm-10 col-md-5 col-lg-5 col-xl-5' : 'col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-4'" class="input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">{{$language('D0203')}}<!--Item Code --></span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="true"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="json.Itemcode"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>
                        <!-- <div v-if="page_function== 'CreateItemmaster'" dir="rtl" class="col-xs-2 col-sm-1 col-md-1 col-lg-1 col-xl-1 input_wrapper_right" style="padding-top: 22px;">
                            <Button_icon :small_round="true" :flat="false" :font_color="'white'" :color="'primary'" :icon="'search'" :outline="false" size="13px"
                            v-on:receiveClick="searchItemCode" style="margin-top: 2px;"/>
                        </div> -->
                        <div class="col-xs-6 col-sm-5 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Item Link</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="true"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="json.ItemLink"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>
                        <div class="col-xs-6 col-sm-12 col-md-3 col-lg-3 col-xl-3 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">{{$language('D0100')}}<!-- Pack Size --></span>
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
                              :readonly="page_function == 'EditItemmaster'? true :false"
                              v-on:change="handleChange"
                              v-model="json.PackSize"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.input_number : oridbComponentBehavior.text" />
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
                      </div>

                      <div class="row dialog_separator">


                        <div class="col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">{{$language('D0173')}}<!--UOM --></span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <SelectFilter
                              :readonly="false"
                              :no_label="true"
                              v-model:pass_value="json.UM"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.select"
                              :options="um_options"
                              v-on:receiveChange="handleChange"
                              />
                            </div>
                          </div>
                        </div>


                        <!--Ctn Qty-->
                        <!-- <div class="col-xs-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 input_wrapper_right">
                          <div class="row" :class="$q.screen.width<1024 ? 'dialog_separator': ''">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">{{$language('D0205')}}</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="true"
                              :readonly="false"
                              v-on:change="handleChange"
                              v-model="json.BulkQty"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.input_number : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div> -->

                        <div class="col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                          <div class="row dialog_separator">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">{{$language('D0185')}} <!-- Bulk UOM--></span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <SelectFilter
                              :readonly="false"
                              :no_label="true"
                              v-model:pass_value="json.UMBulk"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.select"
                              :options="um_options"
                              v-on:receiveChange="handleChange"
                              />
                            </div>
                          </div>
                        </div>
<!--
                        <div class="col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                          <div class="row dialog_separator">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Ctn Price</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="true"
                              :readonly="false"
                              v-on:change="handleChangeCalculation"
                              v-model="json.cartonprice"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.input_number : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div> -->
                      </div>

                      <div class="row dialog_separator">
                        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">{{$language('D0098')}} <!--Description--></span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="true"
                              :readonly="false"
                              v-on:change="handleChange"
                              v-model="json.Description"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_desc : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="row dialog_separator">
                        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Short Description</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="true"
                              :readonly="false"
                              v-on:change="handleChange"
                              v-model="json.DesShort"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 input_wrapper_right">
                          <div class="row" :class="$q.screen.width<1024 ? 'dialog_separator': ''">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Department</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <SelectFilter
                              :readonly="false"
                              :no_label="true"
                              v-model:pass_value="json.Dept"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.select"
                              :options="dept_options"
                              v-on:receiveChange="handleChangeDept"
                              />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-12 col-lg-12 col-xl-12 input_wrapper_right">
                          <div class="row" :class="$q.screen.width<1024 ? 'dialog_separator': ''">
                            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                              <span class="mobile_font">Sub-Department</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                              <SelectFilter
                                  :readonly="false"
                                  :no_label="true"
                                  v-model:pass_value="json.SubDept"
                                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.select"
                                  :options="sub_dept_options"
                                  v-on:receiveChange="handleChangeSubDept"
                                  :text_italic = "true"
                                  :result_message = "json.Dept == '' ? 'Please Select Department First': 'No results'" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 input_wrapper_right">
                          <div class="row dialog_separator">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">{{$language('D0196')}} <!--Category--></span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <SelectFilter
                                    :readonly="false"
                                    :no_label="true"
                                    v-model:pass_value="json.Category"
                                    :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.select"
                                    :options="category_options"
                                    v-on:receiveChange="handleChangeCategory"
                                    :text_italic = "true"
                                    :result_message = "json.SubDept == '' || json.Dept == ''? 'Please select Department and Sub-Department First':'No results'"
                                    />
                            </div>
                          </div>
                        </div>

                        <div  class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 input_wrapper_right">
                          <div class="row dialog_separator">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">{{$language('D0101')}}<!--Article No--></span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="true"
                              :readonly="false"
                              v-on:change="handleChange"
                              v-model="json.ArticleNo"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div  class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 input_wrapper_right">
                          <div class="row dialog_separator">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">{{$language('D0192')}}<!--Brand--></span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <SelectFilter
                                      :readonly="false"
                                      :no_label="true"
                                      v-model:pass_value="json.Brand"
                                      :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.select"
                                      :options="brand_options"
                                      v-on:receiveChange="handleChangeBrand"
                                      :text_italic = "true"
                                      :result_message = "json.Manufacturer == '' ? 'Please select Manufacturer First':'No results'"
                                      />
                            </div>
                          </div>
                        </div>

                        <div  class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 input_wrapper_right">
                          <div class="row dialog_separator">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">{{$language('D0207')}}<!--Manufacturer--></span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <SelectFilter
                                  :readonly="false"
                                  :no_label="true"
                                  v-model:pass_value="json.Manufacturer"
                                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.select"
                                  :options="manufacturer_options"
                                  v-on:receiveChange="handleChangeManufacturer"
                                  :text_italic = "false"
                                  :result_message = "'No results'"
                                  />
                            </div>
                          </div>
                        </div>



                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 input_wrapper_right">
                          <div class="row dialog_separator">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">{{$language('D0208')}}<!--Origin--></span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <SelectFilter
                              :readonly="false"
                              :no_label="true"
                              v-model:pass_value="json.Origin"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.select : oridbComponentBehavior.select"
                              :options="origin_options"
                              v-on:receiveChange="handleChange"
                              />
                            </div>
                          </div>
                        </div>

                        <div  class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 input_wrapper_right">
                          <div class="row dialog_separator">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">{{$language('D0209')}}<!--Points--></span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="true"
                              :readonly="false"
                              v-on:change="handleChange"
                              v-model="json.Point"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.input_number : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 input_wrapper_right" >

                          <div class="row" :class="$q.screen.width < 1024 ? 'dialog_separator' : ''">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">{{ $language('D0025') }}<!--Supplier--></span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <SelectFilter
                              :readonly="page_function=='EditItemmaster' ? true: false"
                              :no_label="true"
                              v-model:pass_value="json.vendor_code"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.select"
                              :options="supplier_options"
                              v-on:receiveChange="handleChangeSCode"
                              />
                            </div>
                          </div>
                          </div>

                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 input_wrapper_right">
                          <div class="row dialog_separator">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Variant</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <SelectFilter
                              :readonly="false"
                              :no_label="false"
                              :label="'Variant'"
                              v-model:pass_value="json.Colour"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.select"
                              :options="color_options"
                              v-on:receiveChange="handleChange"
                              :result_message = "'No results'"
                              />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 input_wrapper_right">
                          <div class="row dialog_separator">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">{{ $language('D0191') }}<!--Size--></span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <SelectFilter
                              :readonly="false"
                              :no_label="true"
                              v-model:pass_value="json.Size"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.select"
                              :options="size_options"
                              v-on:receiveChange="handleChange"
                              :result_message ="'No results'"
                              />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 input_wrapper_right">
                          <div class="row dialog_separator">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">{{ $language('D0210') }}<!--Item Type--></span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <SelectFilter
                              :readonly="false"
                              :no_label="true"
                              v-model:pass_value="json.ItemType"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.select"
                              :options="item_type_options"
                              v-on:receiveChange="handleChange"
                              :result_message ="'No results'"
                              />
                            </div>
                          </div>
                        </div>

                        <div  class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 input_wrapper_right">
                          <div class="row dialog_separator">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">{{$language('D0163')}}<!--Price Type--></span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <SelectFilter
                              :readonly="false"
                              :no_label="true"
                              v-model:pass_value="json.price_type"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.select"
                              :options="price_type_options"
                              v-on:receiveChange="handleChange"
                              :result_message ="'No results'"
                              />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 input_wrapper_right">
                          <div class="row dialog_separator">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">{{$language('D0211')}}<!--Yield Ratio--></span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="true"
                              :readonly="false"
                              v-on:change="handleChange"
                              v-model="json.YieldRatio"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.input_number : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div  class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 input_wrapper_right">
                          <div class="row dialog_separator">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">{{ $language('D0212') }}<!--Old Code--></span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                                :autofocusclick="true"
                                :no_label="true"
                                :readonly="true"
                                v-on:change="handleChange"
                                v-model="json.ItemBarcode "
                                :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.text : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div  class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 input_wrapper_right">
                          <div class="row dialog_separator">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Tax (SST)</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <SelectFilter
                              :readonly="false"
                              :no_label="true"
                              v-model:pass_value="json.TaxCode"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.select"
                              :options="tax_options"
                              v-on:receiveChange="handleChange"
                              :result_message ="'No results'"
                              />
                            </div>
                          </div>
                        </div>

                        <div  class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 input_wrapper_right">
                          <div class="row dialog_separator">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Tax Purchase</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <SelectFilter
                              :readonly="false"
                              :no_label="true"
                              v-model:pass_value="json.tax_code_purchase"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.select"
                              :options="tax_purchase_options"
                              v-on:receiveChange="handleChange"
                              :result_message ="'No results'"
                              />
                            </div>
                          </div>
                        </div>

                        <div  class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 input_wrapper_right">
                          <div class="row dialog_separator">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Tax Supply</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <SelectFilter
                              :readonly="false"
                              :no_label="true"
                              v-model:pass_value="json.tax_code_supply"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.select"
                              :options="tax_supply_options"
                              v-on:receiveChange="handleChange"
                              :result_message ="'No results'"
                              />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 input_wrapper_right">
                          <div class="row dialog_separator">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">RSP Inc Tax</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="true"
                              :readonly="page_function == 'EditItemmaster' ? true: false"
                              v-on:change="handleChange"
                              v-model="json.RSP_inc_tax"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.input_number : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 input_wrapper_right">
                          <div class="row dialog_separator">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">StdCost</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="true"
                              :readonly="page_function == 'EditItemmaster' ? true: false"
                              v-on:change="handleChange"
                              v-model="json.StdCost"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.input_number : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>


                      </div>

                      <div class="row" v-if="item_calculation" style="padding-top: 12px;">

                        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                          <div class="row">

                            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" style="padding-bottom: 10px; padding-right: 10px;">
                              <Input
                              :autofocusclick="true"
                              :label="'Carton Cost (newly added) H.PriceList'"
                              :no_label="false"
                              :readonly="false"
                              v-on:change="handleChangeCalculation('carton_cost')"
                              v-model="json.carton_cost"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.input_number : oridbComponentBehavior.number" />
                            </div>

                            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" style="padding-bottom: 10px; padding-right: 10px;">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              :label="'Ctn Price (H.Karton)'"
                              :readonly="true"
                              v-on:change="handleChangeCalculation"
                              v-model="json.cartonprice"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.input_number : oridbComponentBehavior.number" />
                            </div>

                            <!-- <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" style="padding-bottom: 10px;padding-left: 10px;">
                              <Input
                              :autofocusclick="true"
                              :label="'Carton Price each unit (newly added) H.Karton'"
                              :no_label="false"
                              :readonly="true"
                              v-on:change="handleChangeCalculation"
                              v-model="json.carton_price"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.input_number : oridbComponentBehavior.number" />
                            </div> -->

                            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" style="padding-bottom: 10px; padding-right: 10px;">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              :label="'Ctn Qty (Isi Karton)'"
                              :readonly="false"
                              v-on:change="handleChangeCalculation"
                              v-model="json.BulkQty"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.input_number : oridbComponentBehavior.number" />
                            </div>

                            <!-- <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" style="padding-bottom: 10px; padding-right: 10px;">
                              <Input
                              :autofocusclick="true"
                              :label="'Carton Qty (newly added) Isi Karton'"
                              :no_label="false"
                              :readonly="true"
                              v-on:change="handleChangeCalculation"
                              v-model="json.carton_qty"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.input_number : oridbComponentBehavior.number" />
                            </div> -->

                            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" style="padding-bottom: 10px; padding-right: 10px;">
                              <Input
                              :autofocusclick="true"
                              :label="'Disc 1 (newly added) Disc.Reg 1'"
                              :no_label="false"
                              :readonly="false"
                              v-on:change="handleChangeCalculation"
                              v-model="json.disc_1"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.input_number : oridbComponentBehavior.number" />
                            </div>

                            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" style="padding-bottom: 10px; padding-right: 10px;">
                              <Input
                              :autofocusclick="true"
                              :label="'Disc 2 (newly added) Disc.Reg 1'"
                              :no_label="false"
                              :readonly="false"
                              v-on:change="handleChangeCalculation"
                              v-model="json.disc_2"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.input_number : oridbComponentBehavior.number" />
                            </div>


                            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" style="padding-bottom: 10px; padding-right: 10px;">
                              <Input
                              :autofocusclick="true"
                              :label="'Discount By Amount (newly added) Disc RP'"
                              :no_label="false"
                              :readonly="false"
                              v-on:change="handleChangeCalculation"
                              v-model="json.disc_by_amount"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.input_number : oridbComponentBehavior.number" />
                            </div>

                            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" style="padding-bottom: 10px; padding-right: 10px;">
                              <Input
                              :autofocusclick="true"
                              :label="'Price Per Unit (newly added) Harga Beli/Unit'"
                              :no_label="false"
                              :readonly="true"
                              v-on:change="handleChangeCalculation"
                              v-model="json.price_per_unit"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.input_number : oridbComponentBehavior.number" />
                            </div>

                            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" style="padding-bottom: 10px; padding-right: 10px;">
                              <Input
                              :autofocusclick="true"
                              :label="'Without tax (newly added) DPP'"
                              :no_label="false"
                              :readonly="true"
                              v-on:change="handleChangeCalculation"
                              v-model="json.without_tax"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.input_number : oridbComponentBehavior.number" />
                            </div>

                            <div class="col-xs-12 col-sm-12 col-md-1 col-lg-1 col-xl-1" style="padding-bottom: 10px; padding-right: 10px;">
                              <Input
                              :autofocusclick="true"
                              :label="'Tax (newly added) PPN'"
                              :no_label="false"
                              :readonly="false"
                              v-on:change="handleChangeCalculation"
                              v-model="json.tax"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.input_number : oridbComponentBehavior.number" />
                            </div>

                            <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5 col-xl-5" style="padding-bottom: 10px; padding-right: 10px;">
                              <Input
                              :autofocusclick="true"
                              :label="'Tax Amount (newly added)'"
                              :no_label="false"
                              :readonly="true"
                              v-on:change="handleChangeCalculation"
                              v-model="json.tax_amount"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.input_number : oridbComponentBehavior.number" />
                            </div>

                            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" style="padding-bottom: 10px; padding-right: 10px;">
                              <Input
                              :autofocusclick="true"
                              :label="'Amount with tax (newly added) Harga+PPN'"
                              :no_label="false"
                              :readonly="true"
                              v-on:change="handleChangeCalculation"
                              v-model="json.amount_with_tax"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.input_number : oridbComponentBehavior.number" />
                            </div>


                            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" style="padding-bottom: 10px; padding-right: 10px;">
                              <Input
                              :autofocusclick="true"
                              :label="'Margin (newly added) Margin'"
                              :no_label="false"
                              :readonly="false"
                              v-on:change="handleChangeCalculation"
                              v-model="json.margin"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.input_number : oridbComponentBehavior.number" />
                            </div>

                            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" style="padding-bottom: 10px; padding-right: 10px;">
                              <Input
                              :autofocusclick="true"
                              :label="'Rounding (newly added) Pembulatan'"
                              :no_label="false"
                              :readonly="false"
                              v-on:change="handleChangeCalculation"
                              v-model="json.rounding"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.input_number : oridbComponentBehavior.number" />
                            </div>


                            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" style="padding-bottom: 10px; padding-right: 10px;">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Selling Price (newly added) Harga Jual Standard"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="json.SellingPrice "
                              :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.input_number : oridbComponentBehavior.number" />
                            </div>
                            <!-- :readonly="page_function == 'EditItemmaster' ? true: false" -->

                            <!-- <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" style="padding-bottom: 10px; padding-right: 10px;">
                              <Input
                              :autofocusclick="true"
                              :label="'Selling Price each unit (newly added) Harga Jual Standard'"
                              :no_label="false"
                              :readonly="true"
                              v-on:change="handleChangeCalculation"
                              v-model="json.selling_price_each_unit"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.input_number : oridbComponentBehavior.number" />
                            </div> -->


                            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" style="padding-bottom: 10px; padding-right: 10px;">
                              <Input
                              :autofocusclick="true"
                              :label="'Amount Include Tax (newly added) Kalkulasi Include'"
                              :no_label="false"
                              :readonly="false"
                              v-on:change="handleChangeCalculationReverse"
                              v-model="json.amount_include_tax"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.input_number : oridbComponentBehavior.number" />
                            </div>

                            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                              <b>Receive (pending save to web trans c)</b>
                              <Checkbox size="xs" v-model="is_receiving" style="padding-bottom: 4px;" />
                            </div>

                          </div>
                        </div>

                      </div>
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 input_wrapper_right">
                          <div class="row dialog_separator">
                            <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font"><Remark</span>
                            </div> -->
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Textarea class="ignore_height" :no_label="false" :readonly="json.BillStatus==1" v-on:receiveChange="handleChange" v-model="json.remark"
                              :dbComponentBehavior="dbComponentBehavior.remark" :pass_label="$language('D0055')"/>
                            </div>
                          </div>
                        </div>
                      </div>




                      <div class="row dialog_separator">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <div class="row">
                            <!-- <div class="col-xs-6 col-sm-6 col-md-12 col-lg-12 col-xl-12 input_wrapper_right">
                              <div class="row">
                                <div class="col-xs-7 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                  <span class="dialog_font">{{ $language('D0056') }}In-kind</span>
                                </div>
                                <div class="col-xs-5 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                  <Checkbox size="xs" :disable="json.BillStatus == 1" v-model="json.in_kind" :true-value="1" :false-value="0" />
                                </div>
                              </div>
                            </div>

                            <div class="col-xs-6 col-sm-6 col-md-12 col-lg-12 col-xl-12 input_wrapper_right">
                              <div class="row">
                                <div class="col-xs-7 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                  <span class="dialog_font">{{ $language('D0147') }}Tax Inclusive</span>
                                </div>
                                <div class="col-xs-5 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                  <Checkbox size="xs" :disable="json.BillStatus == 1" v-model="json.tax_inclusive" :true-value="1" :false-value="0" />
                                </div>
                              </div>
                            </div>

                            <div v-if="page_function == 'EditItemmaster'" class="col-xs-6 col-sm-6 col-md-12 col-lg-12 col-xl-12 input_wrapper_right">
                              <div class="row">
                                <div class="col-xs-7 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                  <span class="dialog_font">{{ $language('D0061') }}Auto Close PO</span>
                                </div>
                                <div class="col-xs-5 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                  <Checkbox size="xs" :disable="true" v-model="json.AutoClosePO" :true-value="1" :false-value="0" />
                                </div>
                              </div>
                            </div> -->
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </q-step>
                <q-step
                  v-if="page_function == 'EditItemmaster'"
                  :name="2"
                  title="Barcode"
                  icon="create_new_folder"
                  :done="json.step > 2"
                >
                <div v-if="page_function == 'EditItemmaster'" class="row">
                  <div class="card_section_two col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <q-card v-if="results.length != 0" flat bordered class="card_design q-mb-sm"  style="width: 100%; border-radius:6px;">
                        <q-card-section v-for="(result,index) in results" :key="index" @click="handleAction(result)" style="padding: 5px; border-bottom: 1px solid rgba(0, 0, 0, 0.12);" >


                                <div class="row q-px-sm">
                                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-subtitle2" style="font-size:13.5px">
                                    {{ result.Barcode }}
                                  </div>

                                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-caption" style="color:grey; font-size:11px">
                                    {{ result.barDesc }}
                                  </div>
                                  <div class="q-pt-sm col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-right" style="font-size:13.5px">
                                    {{ currency_sign }} {{ result.barPrice }}
                                  </div>



                          </div>
                        </q-card-section>
                    </q-card>

                  </div>
                  </div>

                </q-step>
                <q-step
                  v-if="page_function == 'EditItemmaster'"
                  :name="3"
                  title="Branch Info"
                  icon="create_new_folder"
                  :done="json.step > 3"
                >
                <div v-if="page_function == 'EditItemmaster'" class="row">
                  <div class="card_section_two col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <q-card v-if="branch_results.length != 0" flat bordered class="card_design q-mb-sm"  style="width: 100%; border-radius:6px;">
                        <q-card-section v-for="(result,index) in branch_results" :key="index" @click="handleViewBranchDetail(result)" style="padding: 5px; border-bottom: 1px solid rgba(0, 0, 0, 0.12);" >
                                <div class="row q-px-sm">
                                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-subtitle2" style="font-size:13.5px">
                                    <div class="row items-center">
                                      <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                                         <q-icon name="store"  class="rounded-outline-icon"  size="3em" style="color: #8B8D8B;"/>
                                      </div>
                                      <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 q-pl-sm">
                                         <span style="font-size: 18px"> {{ result.branch }} </span>
                                      </div>
                                    </div>
                                  </div>
                                  <!-- <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-caption" style="color:grey; font-size:11px">
                                    {{ result.barDesc }}
                                  </div> -->
                          </div>
                        </q-card-section>
                    </q-card>
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


    <div v-if="json.step == 1" class="dialog_action_bottom" :style="page_function == 'EditItemmaster' ? 'height: 45px;' : 'height: 40px;'">
      <div v-if="page_function == 'EditItemmaster'" class="q-pl-sm q-pr-lg q-pt-xs text-right" style="font-size: 13px;">
        <!-- Total Amount: {{ json.total_include_tax }} -->
        <!-- {{ $language('D0032') }}: {{ currency_sign }} {{ json.total_include_tax }} -->
      </div>
      <div class="q-px-sm q-py-xs">
        <Button_icon :readonly="page_function.startsWith('Edit') && deepEqual(ori_json, json)" class="full-width" style="height: 30px;" :small_round="true" :text="page_function.startsWith('Create') ? 'Genarate Item Master' : 'Update Item Master'" :flat="false" :font_color="'white'" :color="'primary'" :outline="false" size="13px" @click="handleCreateIM"/>
      </div>
    </div>

    <div v-if="json.step == 2" class="dialog_action_bottom" style="height: 46px;">
<!--65px-->
      <div v-if="page_function == 'EditItemmaster'" class="row q-pl-lg q-pr-lg q-pt-xs" style="font-size: 13px;">
        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
          <!-- <div v-if="results.length != 0"  class="row justify-left items-center" >
          <span class="" style="color:#1976D2;" @click="show_summary_dialog">View Summary</span>
             <Button_icon class="q-pa-none" :flat="true" :icon="'expand_less'" v-on:receiveClick="show_summary_dialog" :font_color="'primary'" :color="'primary'" :outline="false" size="10px"/>
          </div> -->
        </div>
        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 text-right">
         <!-- {{ $language('D0032') }}:  {{ currency_sign }} {{ json.total_include_tax }} -->
        </div>
      </div>
      <div  class="row q-py-xs">
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" @click="addButtonBarcode">
                <div class="row justify-center items-center q-pr-md" style="width: 100%; height: 40px;">
                  <div class="q-px-xs">
                    <Button_icon style="border-radius: 15px;" :flat="false" :icon="'add'" v-on:receiveClick="addButtonBarcode" :font_color="'white'" :color="'primary'" :outline="false" size="10px"/>
                  </div>
                  <div>
                    Add Barcode
                    <!-- Add Item Details -->
                  </div>
                  </div>
              </div>

            </div>
       </div>
  </div>

  <q-dialog v-model="delete_child" persistent position="top">
    <q-card style="width: 700px; max-width: 98vw;text-align:center;margin-top: 5%;">

      <q-card-section class="row items-center" style="padding-top:1%;padding-bottom:1%;border-bottom: 1px solid #a7bbcb;">
        <div class="text-h6">{{ $language('D0115') }}<!--Confirmation--></div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup :disable="showAddLoading || showAddLoading2"/>
      </q-card-section>

      <q-card-section>
        <!-- <span class="q-ml-sm custom_selection_font">{{general_body}}</span> -->
        <span>Are you sure to delete this barcode?</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat :label="$language('D0116')" color="primary" v-close-popup /> <!-- CANCEL -->
        <q-btn flat :label="$language('D0117')" color="primary" @click="handleDeleteLine" /> <!-- OK -->
      </q-card-actions>

      <q-inner-loading
        :showing="deleteLoading"
        color="primary"
      />
    </q-card>
  </q-dialog>

  <q-dialog v-model="post_transmain" persistent position="top">
    <q-card style="width: 700px; max-width: 98vw;text-align:center;margin-top: 5%;">

      <q-card-section class="row items-center" style="padding-top:1%;padding-bottom:1%;border-bottom: 1px solid #a7bbcb;">
        <div class="text-h6">{{ $language('D0115') }}<!--Confirmation--></div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup :disable="showAddLoading || showAddLoading2"/>
      </q-card-section>

      <q-card-section>
        <!-- <span class="q-ml-sm custom_selection_font">{{general_body}}</span> -->
        <span v-if="json.BillStatus == 0">{{ $language('C0002') }}<!--Are you sure to post? --></span>
        <span v-if="json.BillStatus == 1">{{ $language('C0005') }}<!--Are you sure to unpost?--></span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat :label="$language('D0116')" color="primary" v-close-popup /> <!-- CANCEL -->
        <q-btn flat :label="$language('D0117')" color="primary" @click="handlePostTransmain" /> <!-- OK -->
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
          <div v-if="!edit_child" class="text-subtitle1 header_text" style="margin-top: 5px;">Add Barcode<br></div>
          <div v-else class="text-subtitle1 header_text" style="margin-top: 5px;">Edit Barcode<br></div>
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
                              <Radio size="xs" :disable="status" v-on:receiveChange="handleChangeEntryType" v-model="jsonChild.EntryType" :options="entry_type_options"  />
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
                              <Radio size="xs" :disable="status" v-on:receiveChange="handleChangePriceType" v-model="jsonChild.PriceType" :options="pricing_type_options"  />
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

                    <div class="col-xs-6 col-sm-6 col-md-2 col-lg-2 col-xl-2 four_column_left two_column_left">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">Barcode</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              v-if="edit_child"
                              :autofocusclick="true"
                              :no_label="true"
                              :readonly="status"
                              v-on:change="handleChange"
                              v-model="jsonChild.Barcode"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                              <Select
                              v-if="!edit_child"
                              :readonly="status"
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

                    <div class="col-xs-6 col-sm-6 col-md-2 col-lg-2 col-xl-2 four_column_left">
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
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row dialog_separator">
                    <div class="col-xs-6 col-sm-5 col-md-2 col-lg-2 col-xl-2 four_column_left">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                          <span class="mobile_font">Bulk Qty</span>
                        </div>
                        <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                          <Input
                          :autofocusclick="true"
                          :no_label="true"
                          :readonly="status"
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
                          :readonly="status"
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
                          :readonly="status ? true : jsonChild.PriceType=='FOC'"
                          v-on:change="handleChangeQtyfoc"
                          v-model="jsonChild.Qty_foc"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right_readonly : oridbComponentBehavior.text" />
                        </div>
                      </div>
                    </div>

                    <div class="col-xs-6 col-sm-3 col-md-2 col-lg-2 col-xl-2 four_column_left">
                      <div class="row" :class="page_function == 'EditItemmaster' ? 'dialog_separator': ''">
                        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                          <span class="mobile_font">Unit Price</span>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <Input
                          :autofocusclick="true"
                          :no_label="true"
                          :readonly="status ? true : jsonChild.PriceType=='FOC' ? true : unit ? false : true"
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
                          :readonly="status ? true : jsonChild.PriceType=='FOC' ? true : unit ? false : true"
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
                          :readonly="status ? true : jsonChild.PriceType=='FOC' ? true : unit ? jsonChild.DiscAmt != '0.00' : true"
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
                          :readonly="status ? true : jsonChild.PriceType=='FOC' ? true : unit ? false : true"
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
                          :readonly="status ? true : jsonChild.PriceType=='FOC' ? true : unit ? false : true"
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
                          :readonly="status ? true : jsonChild.PriceType=='FOC' ? true : unit ? false : true"
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
                          :readonly="status ? true : jsonChild.PriceType=='FOC' ? true : unit"
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
                        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                          <span class="mobile_font">Rebate Amount</span>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <Input
                          :autofocusclick="true"
                          :no_label="true"
                          :readonly="false"
                          v-on:change="handleChangeRebateAmount"
                          v-model="jsonChild.rebate_value"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
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
                          :readonly="false"
                          v-on:change="handleChangeFuturePrice"
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
        </q-form>
      </q-card-section>

      <q-card-actions v-if="!status" class="dialog_action" style="padding-left: 20px;">
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
          <div class="text-subtitle1 header_text" style="margin-top: 5px;">Purchase Order Detail<br></div>
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
                              <Radio size="xs" :disable="json.BillStatus==1" v-on:receiveChange="handleChangeEntryType" v-model="jsonChild.EntryType" :options="entry_type_options"  />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div v-if="edit_child && json.BillStatus == 0" class="col-xs-2 col-sm-1 col-md-12 col-lg-12 col-xl-12" align="right">
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
                              <Radio size="xs" :disable="json.BillStatus==1" v-on:receiveChange="handleChangePriceType" v-model="jsonChild.PriceType" :options="pricing_type_options"  />
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
                              <Input
                              v-if="edit_child"
                              :autofocusclick="true"
                              :no_label="false"
                              label="Barcode"
                              :readonly="json.BillStatus==1"
                              v-on:change="handleChange"
                              v-model="jsonChild.Barcode"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                              <Select
                              v-if="!edit_child"
                              :readonly="json.BillStatus==1"
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
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text" />
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
                          :readonly="json.BillStatus==1"
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
                          :readonly="json.BillStatus==1"
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
                          :readonly="json.BillStatus==1 || jsonChild.PriceType=='FOC'"
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
                          :readonly="json.BillStatus==1 || jsonChild.PriceType=='FOC' ? true : unit ? false : true"
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
                          :readonly="json.BillStatus==1 || jsonChild.PriceType=='FOC' ? true : unit ? false : true"
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

                    <div class="col-xs-6 col-sm-3 col-md-3 col-lg-3 col-xl-3 four_column_left" :class="$q.screen.width >599 ? 'two_column_left' : ''">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <Input
                          :autofocusclick="true"
                          :no_label="false"
                          label="Disc1Value"
                          :readonly="json.BillStatus==1 || jsonChild.PriceType=='FOC' ? true : unit ? false : true"
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

                    <div class="col-xs-6 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                      <div class="row" :class="$q.screen.width<599 ? 'dialog_separator': ''">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <Input
                          :autofocusclick="true"
                          :no_label="false"
                          label="Disc2Value"
                          :readonly="json.BillStatus==1 || jsonChild.PriceType=='FOC' ? true : unit ? false : true"
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
                          :readonly="json.BillStatus==1 || jsonChild.PriceType=='FOC' ? true : unit"
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
                          :readonly="json.BillStatus==1"
                          v-on:change="handleChangeRebateAmount"
                          v-model="jsonChild.rebate_value"
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
                          label="Future Price"
                          :readonly="json.BillStatus==1"
                          v-on:change="handleChangeFuturePrice"
                          v-model="jsonChild.price_future"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
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
                              <Radio size="xs" :disable="json.BillStatus==1" v-on:receiveChange="handleChangeEntryType" v-model="jsonChild.EntryType" :options="entry_type_options"  />
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
                              <Radio size="xs" :disable="json.BillStatus==1" v-on:receiveChange="handleChangePriceType" v-model="jsonChild.PriceType" :options="pricing_type_options"  />
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
                                  <Input
                                  v-if="edit_child"
                                  :autofocusclick="true"
                                  :no_label="false"
                                  label="Barcode"
                                  :readonly="json.BillStatus==1"
                                  v-on:change="handleChange"
                                  v-model="jsonChild.Barcode"
                                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                                  <Select
                                  v-if="!edit_child"
                                  :readonly="json.BillStatus==1"
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
                                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text" />
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
                                :readonly="json.BillStatus==1"
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
                                :readonly="json.BillStatus==1"
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
                                :readonly="json.BillStatus==1 || jsonChild.PriceType=='FOC'"
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
                                :readonly="json.BillStatus==1 || jsonChild.PriceType=='FOC' ? true : unit ? false : true"
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
                                :readonly="json.BillStatus==1 || jsonChild.PriceType=='FOC' ? true : unit ? false : true"
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

                          <div class="col-xs-6 col-sm-3 col-md-3 col-lg-3 col-xl-3 four_column_left" :class="$q.screen.width >599 ? 'two_column_left' : ''">
                            <div class="row dialog_separator">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <Input
                                :autofocusclick="true"
                                :no_label="false"
                                label="Disc1Value"
                                :readonly="json.BillStatus==1 || jsonChild.PriceType=='FOC' ? true : unit ? false : true"
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

                          <div class="col-xs-6 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                            <div class="row dialog_separator" :class="$q.screen.width<599 ? 'dialog_separator': ''">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <Input
                                :autofocusclick="true"
                                :no_label="false"
                                label="Disc2Value"
                                :readonly="json.BillStatus==1 || jsonChild.PriceType=='FOC' ? true : unit ? false : true"
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
                                :readonly="json.BillStatus==1 || jsonChild.PriceType=='FOC' ? true : unit"
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
                                :readonly="json.BillStatus==1"
                                v-on:change="handleChangeRebateAmount"
                                v-model="jsonChild.rebate_value"
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
                                label="Future Price"
                                :readonly="json.BillStatus==1"
                                v-on:change="handleChangeFuturePrice"
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

  <q-dialog v-model="supplier_item_list_popup" persistent :position="$q.screen.width > 599 ? 'top' : 'bottom'">
    <q-card style="width: 1200px; max-width: 98vw; margin-top: 5%;">
      <q-card-section v-if="$q.screen.width < 600" class="row header_top_mobile">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center">
          <div class="text-subtitle1 header_text" style="margin-top: 5px;">Supplier Item List<br></div>
        </div>
        <div class="custom_close_button">
          <q-btn icon="close" flat round dense @click="sil_close()" :disable="false"/>
        </div>
      </q-card-section>

      <q-card-section v-else class=" row theme_color dialog_header" style="padding: 0px;">
          <div class="text-subtitle1 header_text" style="margin-top: 5px;">Supplier Item List<br></div>
          <q-space />
          <q-btn icon="close" flat round dense @click="sil_close()" :disable="false"/>
      </q-card-section>

      <q-card-section class="upload_container">
        <q-form ref="save_bulk_edit_pochild_form">
          <div class="row upload_separator_first">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <div class="row input_wrapper_right">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <div class="row dialog_separator">
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

      <q-card-actions v-if="$q.screen.width < 600" class="dialog_action" style="padding-left: 20px;">
        <div class="row full-width">
          <Button_icon class="full-width" style="height: 30px;" :small_round="true" :text="'DONE'" :flat="false" :font_color="'white'" :color="'primary'" :outline="false" size="13px" @click="handleSilChild()"/>
        </div>
      </q-card-actions>

      <q-card-actions v-if="$q.screen.width > 599" class="dialog_action" style="padding-left: 20px;">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" align="right">
            <Button_icon :readonly="false" :flat="true" :font_color="'white'" :color="'#094161'" :text="'SAVE'" :outline="false" size="15px"
            v-on:receiveClick="handleSilChild()"/>
          </div>
      </q-card-actions>

      <q-inner-loading
        :showing="showAddLoading"
        color="primary"
      />
    </q-card>
  </q-dialog>

  <q-dialog v-model="show_barcode_dialog" persistent :position="$q.screen.width > 599 ? 'top' : 'bottom'">
    <q-card v-if="$q.screen.width < 600" style="width: 700px; max-width: 98vw; margin-top: 5%;">
      <q-card-section class="row header_top_mobile">
        <div v-if="!status && edit_barcode" class="custom_delete" @click="handleDelete(jsonBarcode)">
          Delete
          <!-- <Button_icon :disabled="readonly_delete" :icon="'delete'" :color="'negative'" :outline="false" size="12px" v-on:click="handleDelete(jsonChild)" class="q-mr-sm" /> -->
        </div>

        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center">
          <div v-if="!edit_barcode" class="text-subtitle1 header_text" style="margin-top: 5px;">Add Barcode<br></div>
          <div v-else class="text-subtitle1 header_text" style="margin-top: 5px;">Edit Barcode<br></div>
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


                      <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 four_column_left">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span v-if="!edit_barcode" class="mobile_font">Barcode</span>
                              <span v-else class="mobile_font">Old Barcode</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="true"
                              :readonly="edit_barcode ? true : false"
                              v-on:change="handleChange"
                              v-model="jsonBarcode.Barcode"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text_required" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div  v-if="edit_barcode" class="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
                      <div class="row">
                        <div class="dialog_separator" :class="edit_child ? 'col-xs-12' : 'col-xs-10'">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                              <span class="mobile_font">New Barcode</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="true"
                              :readonly="false"
                              v-on:change="handleChange"
                              v-model="jsonBarcode.NewBarcode"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text_required" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>


                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 four_column_left">
                            <div class="row dialog_separator">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                               <Textarea
                                 class="ignore_height"
                                 :no_label="false"
                                 :readonly="json.BillStatus==1"
                                 v-on:receiveChange="handleChange"
                                 v-model="jsonBarcode.barRemark"
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
        </q-form>
      </q-card-section>

      <q-card-actions  class="dialog_action" style="padding-left: 20px;">
        <div class="row full-width">

          <div class="full-width">
            <Button_icon class="full-width" style="height: 30px;" :small_round="true" :text="'ADD'" :flat="false" :font_color="'white'" :color="'primary'" :outline="false" size="13px" @click="handleAddBarcode"/>
          </div>

        </div>
      </q-card-actions>

      <q-inner-loading
        :showing="showAddLoading"
        color="primary"
      />
    </q-card>

    <q-card v-else style="width: 350px; max-width: 60vw; margin-top: 5%;">
      <q-card-section class=" row theme_color dialog_header" style="padding: 0px;">
          <div v-if="edit_barcode" class="text-subtitle1 header_text" style="margin-top: 5px;">Edit Barcode<br></div>
          <div v-else class="text-subtitle1 header_text" style="margin-top: 5px;">Add Barcode<br></div>
          <q-space />
          <q-btn icon="close" flat round dense @click="close()" :disable="false"/>
      </q-card-section>

      <q-card-section class="upload_container">
        <q-form ref="save_edit_pochild_form">
          <div class="row upload_separator_first">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <div class="row dialog_separator">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 four_column_left" :class="!edit_child ? 'two_column_left': ''">
                            <div class="row dialog_separator">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <!-- 'Old Barcode':'Barcode'-->
                                <Input
                                :autofocusclick="true"
                                :no_label="false"
                                :label="edit_barcode ? 'Old Barcode': $language('D0099')"
                                :readonly="edit_barcode ? true:false"
                                v-on:change="handleChangeBarcode"
                                v-model="jsonBarcode.Barcode"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text_required" />
                              </div>
                            </div>
                          </div>

                         <div v-if="edit_barcode" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 four_column_left" :class="!edit_child ? 'two_column_left': ''">
                            <div class="row dialog_separator">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <Input
                                :autofocusclick="true"
                                :no_label="false"
                                label="New Barcode"
                                :readonly="false"
                                v-on:change="handleChangeBarcode"
                                v-model="jsonBarcode.NewBarcode"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text_required" />
                              </div>
                            </div>
                          </div>

                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 four_column_left">
                            <div class="row dialog_separator">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">

                                <Textarea class="ignore_height" :no_label="false" :readonly="json.BillStatus==1" v-on:receiveChange="handleChange" v-model="jsonBarcode.barRemark"
                              :dbComponentBehavior="dbComponentBehavior.remark" :pass_label="$language('D0055')" />

                              </div>
                            </div>
                          </div>
                  </div>
            </div>
          </div>
        </q-form>
      </q-card-section>

      <q-card-actions class="dialog_action" style="padding-left: 20px;">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" align="right">
            <!-- ADD -->
            <Button_icon  :readonly="false" :flat="true" :font_color="'white'" :color="'#094161'" :text="$language('D0024')" :outline="false" size="15px"
            v-on:receiveClick="handleAddBarcode"/>
          </div>
      </q-card-actions>

      <q-inner-loading
        :showing="showAddLoading"
        color="primary"
      />
    </q-card>
  </q-dialog>

  <q-dialog v-model="show_branch_dialog" persistent :position="$q.screen.width > 599 ? 'top' : 'bottom'">
    <q-card v-if="$q.screen.width < 600" style="width: 700px; max-width: 98vw; margin-top: 5%;">
      <q-card-section class="row header_top_mobile">


        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center">
          <div class="text-subtitle1 header_text" style="margin-top: 5px;">Branch {{branch_details.branch}}<br></div>
        </div>
        <div class="custom_close_button">
          <q-btn icon="close" flat round dense @click="closeBranch()" :disable="false"/>
        </div>
      </q-card-section>

      <q-card-section class="upload_container">
        <q-form ref="save_edit_pochild_form">
          <div class="row upload_separator_first">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <div class="row dialog_separator">
                    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <div class="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
                      <div class="row justify-center">
                        <div class="dialog_separator col-xs-12">
                          <div class="row justify-center">
                            <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5">
                              <span style='font-size:15px;'>Price Inc Tax : {{branch_details.price_inc_tax}}</span>
                            </div>
                            <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5">
                              <span style='font-size:15px;'>Price Exc Tax : {{branch_details.sellingprice}}</span>
                            </div>

                            <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5">
                              <span style='font-size:15px;'>Listed Cost : {{branch_details.stdcost}}</span>
                            </div>
                            <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5">
                              <span style='font-size:15px;'>Avg Cost : {{branch_details.averagecost}}</span>
                            </div>
                            <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5">
                              <span style='font-size:15px;'>Last Cost : {{branch_details.lastcost}}</span>
                            </div>
                            <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5">
                              <span style='font-size:15px;'>FIFO Cost : {{branch_details.fifocost}}</span>
                            </div>
                            <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5">
                              <span style='font-size:15px;'>Last Cost GP %: {{branch_details.LastCostGP}}</span>
                            </div>
                            <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5">
                              <span style='font-size:15px;'>Today Prince Inc Tax: {{branch_details.price_today_na}}</span>
                            </div>
                            <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5">
                              <div class="row">
                                <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                                   <span style='font-size:15px;'>Today Memeber Price Inc Tax: </span>
                                </div>
                                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                                   {{branch_details.price_today_mb}}
                                </div>
                              </div>
                            </div>
                            <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5">
                              <span style='font-size:15px;'>Category Ranking: {{branch_details.rank_cat_qty}}</span>
                            </div>
                            <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5">
                              <span style='font-size:15px;'>Category Ranking ($): {{branch_details.rank_cat_amt}}</span>
                            </div>
                            <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5">
                              <span style='font-size:15px;'>Qty Promo: {{branch_details.qty_promo}}</span>
                            </div>
                            <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5">
                              <span style='font-size:15px;'>Replenis hment ADS: {{branch_details.ads_rep}}</span>
                            </div>
                            <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5">
                              <span style='font-size:15px;'>Item Type: {{branch_details.branch_itemtype}}</span>
                            </div>
                            <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5">
                              <span style='font-size:15px;'>Promo Day: {{branch_details.day_promo}}</span>
                            </div>
                            <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5">
                              <span style='font-size:15px;'>Transform Out: {{branch_details.qty_hp_out}}</span>
                            </div>
                            <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5">
                              <span style='font-size:15px;'>IBT Sales: {{branch_details.qty_ibt_sales}}</span>
                            </div>
                            <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5">
                              <span style='font-size:15px;'>IBT GRN: {{branch_details.qty_ibt_grn}}</span>
                            </div>
                            <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5">
                              <span style='font-size:15px;'>Branch: {{branch_details.branch}}</span>
                            </div>
                            <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5">
                              <span style='font-size:15px;'>Opn: {{branch_details.qty_opn}}</span>
                            </div>
                            <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5">
                              <span style='font-size:15px;'>Rec: {{branch_details.qty_rec}}</span>
                            </div>
                            <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5">
                              <span style='font-size:15px;'>POS: {{branch_details.qty_pos}}</span>
                            </div>
                            <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5">
                              <span style='font-size:15px;'>SI: {{branch_details.qty_si}}</span>
                            </div>
                            <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5">
                              <span style='font-size:15px;'>Other: {{branch_details.qty_other}}</span>
                            </div>
                            <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5">
                              <span style='font-size:15px;'>Pending Return: {{branch_details.qty_tbr}}</span>
                            </div>
                            <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5">
                              <span style='font-size:15px;'>Bal: {{branch_details.QOH}}</span>
                            </div>
                            <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5">
                              <span style='font-size:15px;'>DOH: {{branch_details.doh}}</span>
                            </div>
                            <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5">
                              <span style='font-size:15px;'>SO Qty: {{branch_details.qty_so}}</span>
                            </div>
                            <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5">
                              <span style='font-size:15px;'>Qty Avail: {{branch_details.qty_avail}}</span>
                            </div>
                            <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5">
                              <span style='font-size:15px;'>ADS: {{branch_details.ads}}</span>
                            </div>
                            <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5">
                              <span style='font-size:15px;'>AWS: {{branch_details.aws}}</span>
                            </div>
                            <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5">
                              <span style='font-size:15px;'>AMS: {{branch_details.ams}}</span>
                            </div>
                            <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5">
                              <span style='font-size:15px;'>PO Qty: {{branch_details.qty_po}}</span>
                            </div>
                            <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5">
                              <span style='font-size:15px;'>Req Qty: {{branch_details.qty_req}}</span>
                            </div>
                            <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5">
                              <span style='font-size:15px;'>Date Start: {{branch_details.date_start}}</span>
                            </div>
                            <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5">
                              <span style='font-size:15px;'>Date End: {{branch_details.date_stop}}</span>
                            </div>
                            <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5">
                              <span style='font-size:15px;'>1st GRN Date: {{branch_details.first_gr_date}}</span>
                            </div>
                            <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5">
                              <span style='font-size:15px;'>Days Analysed: {{branch_details.days}}</span>
                            </div>
                            <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5">
                              <span style='font-size:15px;'>Last GR Date: {{branch_details.last_gr_date}}</span>
                            </div>
                            <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5">
                              <span style='font-size:15px;'>Last GR Qty: {{branch_details.last_gr_qty}}</span>
                            </div>
                            <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5">
                              <span style='font-size:15px;'>Created at: {{branch_details.created_at}}</span>
                            </div>
                            <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5">
                              <span style='font-size:15px;'>Updated at: {{branch_details.updated_at}}</span>
                            </div>
                            <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5">
                              <span style='font-size:15px;'>Recalculate at: {{branch_details.recalc_at}}</span>
                            </div>
                            <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5">
                              <span style='font-size:15px;'></span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                             <!-- <Input
                              :autofocusclick="true"
                              :no_label="true"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="branch_details.price_inc_tax"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text_required" />-->
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

      <q-inner-loading
        :showing="showAddLoading"
        color="primary"
      />
    </q-card>
  </q-dialog>

  <q-dialog v-model="show_supplier_item_dialog" persistent :position="$q.screen.width > 599 ? 'top' : 'bottom'">
      <q-card  v-if="$q.screen.width < 600" style="width: 700px; max-width: 98vw; margin-top: 5%;">
        <q-card-section class="row header_top_mobile">
          <div v-if="json.BillStatus == 0 && this.edit_child" class="custom_delete" @click="handleDelete(jsonChild)">
            Delete
            <!-- <Button_icon :disabled="readonly_delete" :icon="'delete'" :color="'negative'" :outline="false" size="12px" v-on:click="handleDelete(jsonChild)" class="q-mr-sm" /> -->
          </div>

          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center">
            <div v-if="rtv" class="text-subtitle1 header_text" style="margin-top: 5px;">RTV - Return to Vendor<br></div>
            <div v-if="vfoc" class="text-subtitle1 header_text" style="margin-top: 5px;">Vendor FOC Item without PO<br></div>
          </div>
          <div class="custom_close_button">
            <q-btn icon="close" flat round dense @click="grnChildclose()" :disable="false"/>
          </div>
        </q-card-section>

        <q-card-section class="upload_container">
          <q-form ref="save_edit_pochild_form">
            <div class="row upload_separator_first">
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <div class="row input_wrapper_right">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div class="row dialog_separator">
                      <div class="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
                        <div class="row">
                          <div class="dialog_separator" :class="edit_child ? 'col-xs-12' : 'col-xs-10'">
                            <div class="row">
                              <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                <span class="mobile_font">{{ $language('D0097') }}</span><!--Item Code-->
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
                                <span class="mobile_font">Reason</span>
                              </div>
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <Select
                                :readonly="json.BillStatus ==1"
                                :no_label="true"
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
                                :readonly="json.BillStatus ==1"
                                v-on:change="handleChange"
                                v-model="jsonChild.Description"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>



                    </div>

                    <div v-if='rtv' class="row">

                      <div  class="col-xs-6 col-sm-6 col-md-2 col-lg-2 col-xl-2 four_column_left two_column_left dialog_separator">
                        <div class="row">
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <div class="row">
                              <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                <span class="mobile_font">Qty</span>
                              </div>
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                                :autofocusclick="true"
                                :no_label="true"
                                :readonly="json.BillStatus ==1"
                                v-on:change="handleChange"
                                v-model="jsonChild.Inv_Qty"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="col-xs-6 col-sm-6 col-md-2 col-lg-2 col-xl-2 dialog_separator">
                        <div class="row">
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <div class="row">
                              <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                <span class="mobile_font">Unit Price</span>
                              </div>
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <Input
                                :autofocusclick="true"
                                :no_label="true"
                                :readonly="json.BillStatus ==1"
                                v-on:change="handleChange"
                                v-model="jsonChild.Inv_UnitPrice"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="col-xs-6 col-sm-3 col-md-3 col-lg-3 col-xl-3 four_column_left two_column_left dialog_separator">
                        <div class="row">
                          <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                            <span class="mobile_font">Disc1Type</span>
                          </div>
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <Select
                            dir="rtl"
                            :readonly="json.BillStatus ==1"
                            :no_label="true"
                            v-model="jsonChild.Inv_Disc1Type"
                            :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.disc1type : oridbComponentBehavior.select"
                            :options="disctype_options"
                            v-on:receiveChange="handleChangeDiscType"
                            />
                          </div>
                        </div>
                      </div>

                      <div class="col-xs-6 col-sm-3 col-md-3 col-lg-3 col-xl-3   dialog_separator">
                        <div class="row">
                          <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                            <span class="mobile_font">Disc1Value</span>
                          </div>
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <Input
                            :autofocusclick="true"
                            :no_label="true"
                            :readonly="json.BillStatus ==1"
                            v-on:change="handleChangeDisc1Value"
                            v-model="jsonChild.Inv_Disc1Value"
                            :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                          </div>
                        </div>
                      </div>

                      <div class="col-xs-6 col-sm-3 col-md-3 col-lg-3 col-xl-3 four_column_left two_column_left dialog_separator">
                        <div class="row" :class="$q.screen.width<599 ? 'dialog_separator': ''">
                          <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                            <span class="mobile_font">Disc2Type</span>
                          </div>
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <Select
                            dir="rtl"
                            :readonly="json.BillStatus ==1"
                            :no_label="true"
                            v-model="jsonChild.Inv_Disc2Type"
                            :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.disc2type : oridbComponentBehavior.select"
                            :options="disctype_options"
                            v-on:receiveChange="handleChangeDiscType"
                            />
                          </div>
                        </div>
                      </div>

                      <div class="col-xs-6 col-sm-3 col-md-3 col-lg-3 col-xl-3 dialog_separator">
                        <div class="row" :class="$q.screen.width<599 ? 'dialog_separator': ''">
                          <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                            <span class="mobile_font">Disc2Value</span>
                          </div>
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <Input
                            :autofocusclick="true"
                            :no_label="true"
                            :readonly="json.BillStatus ==1"
                            v-on:change="handleChangeDisc2Value"
                            v-model="jsonChild.Inv_Disc2Value"
                            :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                          </div>
                        </div>
                      </div>

                      <div class="col-xs-6 col-sm-6 col-md-2 col-lg-2 col-xl-2 four_column_left two_column_left dialog_separator">
                        <div class="row">
                          <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                            <span class="mobile_font">Total Price</span>
                          </div>
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <Input
                            :autofocusclick="true"
                            :no_label="true"
                            :readonly="json.BillStatus ==1"
                            v-on:change="handleChange"
                            v-model="jsonChild.Inv_TotalPrice"
                            :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                          </div>
                        </div>
                      </div>

                      <div class="col-xs-6 col-sm-6 col-md-2 col-lg-2 col-xl-2  dialog_separator">
                        <div class="row">
                          <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                            <span class="mobile_font">Tax Code</span>
                          </div>
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <Select
                            :readonly="json.BillStatus ==1"
                            :no_label="true"
                            v-model="jsonChild.gst_tax_code"
                            :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.disc2type : oridbComponentBehavior.select"
                            :options="tax_options"
                            v-on:receiveChange="handleChangeDiscType"
                            />
                          </div>
                        </div>
                      </div>

                      <div class="col-xs-6 col-sm-6 col-md-2 col-lg-2 col-xl-2 dialog_separator">
                        <div class="row items-center">
                          <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4" style="padding-top:0.6%">
                            <span class="mobile_font">Group Cost</span>
                          </div>
                          <div class="col-xs-8 col-sm-8 col-md-12 col-lg-12 col-xl-12" style="padding-top:1.2%">
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
                          </div>
                        </div>
                      </div>

                    </div>
                    <div v-if='vfoc' class="row">

                      <div  class="col-xs-6 col-sm-6 col-md-2 col-lg-2 col-xl-2 four_column_left two_column_left dialog_separator">
                        <div class="row">
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <div class="row">
                              <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                <span class="mobile_font">Qty</span>
                              </div>
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                                :autofocusclick="true"
                                :no_label="true"
                                :readonly="json.BillStatus ==1"
                                v-on:change="handleChange"
                                v-model="jsonChild.SetQty"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>


                      <div class="col-xs-6 col-sm-6 col-md-2 col-lg-2 col-xl-2 dialog_separator">
                        <div class="row items-center" style="padding-top:8%">
                          <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4" style="padding-top:0.6%">
                            <span class="mobile_font">Group Cost</span>
                          </div>
                          <div class="col-xs-8 col-sm-8 col-md-12 col-lg-12 col-xl-12" style="padding-top:1.2%">
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
              <Button_icon class="full-width" style="height: 30px;" :small_round="true" :text="'ADD'" :flat="false" :font_color="'white'" :color="'primary'" :outline="false" size="13px" @click="handleSupplierItem('save&add')"/>
            </div>
            <div :class="!edit_child ? 'col-xs-6 q-pl-xs': 'full-width'">
              <Button_icon class="full-width" style="height: 30px;" :small_round="true" :text="'DONE'" :flat="false" :font_color="'white'" :color="'primary'" :outline="false" size="13px" @click="handleSupplierItem('save')"/>
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
            <div class="text-subtitle1 header_text" style="margin-top: 5px;">Supplier Item<br></div>
            <q-space />
            <q-btn icon="close" flat round dense :disable="false"  @click="close_supplier_item_Dialog"/>
        </q-card-section>

        <q-card-section class="upload_container">
          <q-form ref="save_edit_pochild_form">
            <div class="row upload_separator_first">
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <div v-if="$q.screen.width > 599 && $q.screen.width < 1024" class="row q-px-sm">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-pt-md">
                    <div class="row dialog_separator">
                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <div class="row">
                          <div :class="edit_child ? 'col-sm-6' : 'col-sm-5'">
                              <div class="row">
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
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

                      <div v-if="!edit_child" dir="rtl" class="four_column_left two_column_left col-xs-2 col-sm-1 col-md-2 col-lg-2 col-xl-2" style="padding-top: 5px;">

                        <Button_icon ref="searchButton" :flat="true" :font_color="'white'" :color="'#094161'" :icon="'search'" :outline="false" size="13px"
                        v-on:receiveClick="showSearchDialog()" :tooltip_message="'Search Item'" />
                      </div>

                          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 dialog_separator">
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

                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
                            <div class="row">
                              <div class="four_column_left col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
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

                          <div v-if='rtv' class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
                            <div class="row">
                              <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 two_column_left">
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
                          <div  v-if="rtv" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
                                <div class="row">
                                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 two_column_left">
                                    <div class="row">
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
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
                                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 ">
                                    <div class="row">
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
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
                          <div v-if='rtv' class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
                            <div class="row">
                                  <div  class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 two_column_left">
                                          <Input
                                              :autofocusclick="true"
                                              :no_label="false"
                                              :label="'Total Price'"
                                              :readonly="false"
                                              v-on:change="handleChange"
                                              v-model="jsonChild.TotalPrice"
                                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                                  </div>
                                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
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
                                  <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3" style="padding-top:2px;">
                                    <span style="font-size:13px;">Group Cost</span>
                                  </div>
                                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6" style="padding-top:5px;">
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
                                  </div>
                                </div>
                          </div>
                          <div v-if='vfoc' class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12  two_column_left">
                            <div class="row">
                              <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 dialog_separator two_column_left">
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
                                      <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3" style="padding-top:2px;" >
                                        <span style="font-size:13px;">Group Cost</span>
                                      </div>
                                      <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6" style="padding-top:5px;">
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

                <div v-if="$q.screen.width > 1023" class="row q-px-sm">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-pt-md">
                    <div class="row dialog_separator">
                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <div class="row">

                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <div class="row items-center">
                                  <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3" style="padding-top:2px;">
                                    <span style="font-size:13px;">Block</span>
                                  </div>
                                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6" style="padding-top:5px;">
                                    <Checkbox
                                      size="xs"
                                      :disable="false"
                                      :no_label="true"
                                      v-model="jsonChild.block_order"
                                      v-on:receiveChange="handleChange"
                                      :dbComponentBehavior="dbComponentBehavior.text"
                                      :true-value="1"
                                      :false-value="0"
                                      />
                                  </div>
                                </div>
                          </div>

                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <div class="row items-center">
                                  <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3" style="padding-top:2px;">
                                    <span style="font-size:13px;">Non Returnable</span>
                                  </div>
                                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6" style="padding-top:5px;">
                                    <Checkbox
                                      size="xs"
                                      :disable="false"
                                      :no_label="true"
                                      v-model="jsonChild.none_return"
                                      v-on:receiveChange="handleChange"
                                      :dbComponentBehavior="dbComponentBehavior.text"
                                      :true-value="1"
                                      :false-value="0"
                                      />
                                  </div>
                                </div>
                          </div>

                          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 dialog_separator four_column_left">
                            <div class="row">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                                <SelectFilter
                                        :readonly="edit_child ? true:false"
                                        :no_label="false"
                                        :label="$language('D0025')"
                                        v-model:pass_value="jsonChild.supplier"
                                        :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.select"
                                        :options="supplier_options"
                                        v-on:receiveChange="handleChangeSCode"
                                        />
                              </div>
                            </div>
                          </div>

                          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 dialog_separator">
                            <div class="row">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                                <SelectFilter
                                        :readonly="false"
                                        :no_label="false"
                                        :label="'Tax Code'"
                                        v-model:pass_value="jsonChild.TaxCode"
                                        :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.select"
                                        :options="tax_options"
                                        v-on:receiveChange="handleChangeSCode"
                                        />
                              </div>
                            </div>
                          </div>

                          <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 dialog_separator four_column_left">
                            <div class="row">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                                    <Input
                                    :autofocusclick="true"
                                    :no_label="false"
                                    label="Ordering Lot Size"
                                    :readonly="false"
                                    v-on:change="handleChange"
                                    v-model="jsonChild.OrderLotSize"
                                    :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                              </div>
                            </div>
                          </div>

                          <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 dialog_separator four_column_left">
                            <div class="row">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                                    <Input
                                    :autofocusclick="true"
                                    :no_label="false"
                                    label="Carton Qty"
                                    :readonly="false"
                                    v-on:change="handleChange"
                                    v-model="jsonChild.SupBulkQty"
                                    :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                              </div>
                            </div>
                          </div>

                          <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 dialog_separator">
                            <div class="row">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                                    <Input
                                    :autofocusclick="true"
                                    :no_label="false"
                                    label="Listed Cost"
                                    :readonly="edit_child ? true:false"
                                    v-on:change="handleChange"
                                    v-model="jsonChild.SupStdPrice"
                                    :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                              </div>
                            </div>
                          </div>

                          <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 dialog_separator four_column_left">
                            <div class="row">
                              <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 ">
                                <Select
                                  dir="rtl"
                                  :readonly="false"
                                  :no_label="false"
                                  v-model="jsonChild.Disc1Type"
                                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.disc1type : oridbComponentBehavior.select"
                                  :options="disctype_options"
                                  v-on:receiveChange="handleChangeDiscType"
                                  />
                              </div>
                              <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 ">
                                <Input
                                    :autofocusclick="true"
                                    :no_label="false"
                                    label="Disc1 Value"
                                    :readonly="false"
                                    v-on:change="handleChange"
                                    v-model="jsonChild.Disc1Value"
                                    :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                              </div>
                            </div>
                          </div>

                          <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 dialog_separator four_column_left">
                            <div class="row">
                              <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 ">
                                <Select
                                  dir="rtl"
                                  :readonly="false"
                                  :no_label="false"
                                  v-model="jsonChild.Disc2Type"
                                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.disc1type : oridbComponentBehavior.select"
                                  :options="disctype_options"
                                  v-on:receiveChange="handleChangeDiscType"
                                  />
                              </div>
                              <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 ">
                                <Input
                                    :autofocusclick="true"
                                    :no_label="false"
                                    label="Disc2 Value"
                                    :readonly="false"
                                    v-on:change="handleChange"
                                    v-model="jsonChild.Disc2Value"
                                    :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                              </div>
                            </div>
                          </div>


                          <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 dialog_separator">
                            <div class="row">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                                    <Input
                                    :autofocusclick="true"
                                    :no_label="false"
                                    label="Net Cost"
                                    :readonly="edit_child ? true:false"
                                    v-on:change="handleChange"
                                    v-model="jsonChild.NetUnitPrice"
                                    :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                              </div>
                            </div>
                          </div>
                          <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 dialog_separator four_column_left">
                            <div class="row">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                                    <Input
                                    :autofocusclick="true"
                                    :no_label="false"
                                    label="Carton Cost"
                                    :readonly="false"
                                    v-on:change="handleChange"
                                    v-model="jsonChild.cartonprice"
                                    :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                              </div>
                            </div>
                          </div>
                          <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 dialog_separator four_column_left">
                            <div class="row">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                                    <Input
                                    :autofocusclick="true"
                                    :no_label="false"
                                    label="Last Cost"
                                    :readonly="false"
                                    v-on:change="handleChange"
                                    v-model="jsonChild.SupLastPrice"
                                    :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                              </div>
                            </div>
                          </div>
                          <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 dialog_separator">
                            <div class="row">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                                    <Input
                                    :autofocusclick="true"
                                    :no_label="false"
                                    label="RSP After Tax"
                                    :readonly="false"
                                    v-on:change="handleChange"
                                    v-model="jsonChild.SupRSPAfterTax"
                                    :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                              </div>
                            </div>
                          </div>
                          <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 dialog_separator four_column_left">
                            <div class="row">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                                    <Input
                                    :autofocusclick="true"
                                    :no_label="false"
                                    label="RSP Before Tax"
                                    :readonly="false"
                                    v-on:change="handleChange"
                                    v-model="jsonChild.SupRSPBeforeTax"
                                    :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                              </div>
                            </div>
                          </div>
                          <div v-if='rtv' class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 dialog_separator four_column_left">
                            <div class="row">
                              <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 four_column_left">
                                    <Input
                                    :autofocusclick="true"
                                    :no_label="false"
                                    label="Qty"
                                    :readonly="false"
                                    v-on:change="handleChangeInvQty"
                                    v-model="jsonChild.Inv_Qty"
                                    :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                                  </div>
                                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 ">
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
                          <div  v-if="rtv" class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 dialog_separator">
                                <div class="row">
                                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 four_column_left">
                                    <div class="row">
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
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
                                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 ">
                                    <div class="row">
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
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

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </q-form>
        </q-card-section>

        <q-card-actions class="dialog_action" style="padding-left: 20px;">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" align="right">
              <Button_icon v-if="!edit_child" :readonly="false" :flat="true" :font_color="'white'" :color="'#094161'" :text="'ADD'" :outline="false" size="15px"
              v-on:receiveClick="handleSupplierItem('save&add')"/>

              <span class="q-pl-xs" />

              <Button_icon :readonly="false" :flat="true" :font_color="'white'" :color="'#094161'" :text="'SAVE'" :outline="false" size="15px"
              v-on:receiveClick="handleSupplierItem('save')"/>
            </div>
        </q-card-actions>

        <q-inner-loading
          :showing="showAddLoading"
          color="primary"
        />
      </q-card>
</q-dialog>

<q-dialog v-model="delete_child2" persistent position="top">
    <q-card style="width: 700px; max-width: 98vw;text-align:center;margin-top: 5%;">

      <q-card-section class="row items-center" style="padding-top:1%;padding-bottom:1%;border-bottom: 1px solid #a7bbcb;">
        <div class="text-h6">{{ $language('D0115') }}<!--Confirmation--></div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup :disable="showAddLoading || showAddLoading2"/>
      </q-card-section>

      <q-card-section>
        <!-- <span class="q-ml-sm custom_selection_font">{{general_body}}</span> -->
        <span>Are you sure to delete this Supplier?</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat :label="$language('D0116')" color="primary" v-close-popup /> <!-- CANCEL -->
        <q-btn flat :label="$language('D0117')" color="primary" @click="handleDeleteSupplierItemLine" /> <!-- OK -->
      </q-card-actions>

      <q-inner-loading
        :showing="deleteLoading"
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
import SupplierItemListTable from 'src/components/ERP/Purchase/SupplierItemListTable'
import Button_icon from 'src/components/ERP/Base/Button_icon'
import Radio from 'src/components/ERP/Base/Radio';
import { Notify } from "quasar";
import SelectFilter from 'src/components/ERP/Itemmaster/SelectFilter'
import ItemTable from 'src/components/ERP/Purchase/ItemTable'
import SearchPopUp from 'src/components/ERP/Purchase/SearchPopUp'
import SelectPlaceholder from 'src/components/ERP/Base/SelectPlaceholder'
import Textarea from'src/components/ERP/Base/Textarea' ;
import { StreamBarcodeReader } from "vue-barcode-reader";
import { get_department } from 'src/store/ERP/Itemmaster/getters'

export default{
  data() {
    return {
      last_enter_field: '',
      retailer_guid: sessionStorage.getItem("retailer_guid") != "" && sessionStorage.getItem("retailer_guid") != "null" && sessionStorage.getItem("retailer_guid") != null ? sessionStorage.getItem("retailer_guid") : [],
      user_name: sessionStorage.getItem("user_name") != "" && sessionStorage.getItem("user_name") != "null" && sessionStorage.getItem("user_name") != null ? sessionStorage.getItem("user_name") : [],
      language: sessionStorage.getItem("language") != "" && sessionStorage.getItem("language") != "null" && sessionStorage.getItem("language") != null ? sessionStorage.getItem("language") : [],
      currency_sign: sessionStorage.getItem("currency_sign") != "" && sessionStorage.getItem("currency_sign") != "null" && sessionStorage.getItem("currency_sign") != null ? sessionStorage.getItem("currency_sign") : [],
      session_outlet_guid: sessionStorage.getItem("session_outlet_guid") != "" && sessionStorage.getItem("session_outlet_guid") != "null" && sessionStorage.getItem("session_outlet_guid") != null ? sessionStorage.getItem("session_outlet_guid") : [],
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
      point_options:[
      {
          label: "Point*Amount",
          value: "pamount"
        },
        {
          label: "Point*Qty",
          value: "pqty"
        }
      ],
      status_options: [
        {
          label: "Active",
          value: "active"
        },
        {
          label: "Disable",
          value: "disable"
        },
        {
          label: "Delisted",
          value: "delisted"
        },
        {
          label: "Non-listed",
          value: "nonlisted"
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
      json: {
        step: 1,
        remark: "",
        Origin:"",
        ArticleNo:"",
        vendor_code:"",
        Itemcode:"",
        Dept:"",
        Manufacturer:"",
        PackSize:"1",
        BulkQty:"0",
        cartonprice:"0.00",
        YieldRatio:"0",
        Point:"0",
        Size:"",
        Colour:"",
        SellingPrice:"0.00",
        RSP_inc_tax:"0",
        StdCost:"0",
        // TaxCode:"NA",
        // tax_code_purchase:"TX-0",
        // tax_code_supply:"SR-0"
      },
      search: {
        options: [],
        type: "",
        value: "",
        showTable: false
      },
      jsonChild: {},
      jsonBarcode:{},
      all_supcus: {},
      all_location: {},
      status: false,
      page_function: this.$route.name,
      cardtype_guid: "",
      location_options: [],
      location_options2: [],
      active_delete_json: {},
      delete_child: false,
      delete_child2:false,
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
      dept_options:[],
      sub_dept_options:[],
      category_options:[],
      manufacturer_options:[],
      brand_options:[],
      origin_options:[],
      size_options:[],
      item_type_options:[],
      all_dept:[],
      all_sub_dept:[],
      all_category:[],
      loading_sub_dept:false,
      loading_category:false,
      loading_brand:false,
      um_options:[],
      um_options2:[],
      color_options:[],
      price_type_options:[],
      show_barcode_dialog:false,
      edit_barcode:false,
      prc_type_options:[
        {
            label:"%",
            value:"%"
        },
        {
            label:"$",
            value:"$"
        },
      ],
      ori_json: {},
      is_receiving: false,
      item_calculation: false,
      preference: sessionStorage.getItem("preference") != "" && sessionStorage.getItem("preference") != "null" && sessionStorage.getItem("preference") != null ? JSON.parse(sessionStorage.getItem("preference")) : [],
      tax_options:[],
      tax_purchase_options:[],
      tax_supply_options:[],
      action_change_selecting:false,
      all_manufacturer:[],
      all_brand: [],
      branch_table_column:[],
      branch_table_data:[],
      branch_ori_params:{},
      type: this.$route.query.type,
      branch_results: [],
      show_branch_dialog:false,
      branch_details:{},
      supplier_item_ori_params:{},
      supplier_item_table_data:[],
      supplier_item_table_column:[],
      show_supplier_item_dialog:false,
      delete_json:{}
    }
  },
  components:{
    Input,
    Select,
    // Datepicker,
    Checkbox,
    PurchaseTable,
    SupplierItemListTable,
    Button_icon,
    SelectFilter,
    Radio,
    // SelectPlaceholder,
    Textarea,
    SearchPopUp,
  },
  computed: {
    dbComponentBehavior() {
      return this.$store.getters['dbComponentBehavior/byLanguage']('erp')
    },
    categoryOptions() {
      if(this.all_category.length > 0){

       var option = this.all_category.map((item) => {
        return {
          label: item.Description,
          value: item.Code
        };
      });
      console.log('options',option);

      return option;
      }
      return [];
    },
  },
  async mounted()
  {
    this.showAddLoading = true;


    var processedResults = await this.fetchAllData();

    var um_results = processedResults.um.detail
    // console.log('um_results',um_results)
    var supcus_results = processedResults.supcus.data;
    var dept_results =processedResults.dept.detail ;
    var variant =  processedResults.variant;
    var item_size =  processedResults.item_size;
    var variant_results   = processedResults.variant.detail
    var item_size_results = item_size.detail;
    var item_type_results   = processedResults.item_type_results
    var price_type_results   = processedResults.price_type_results
    var tax_results = processedResults.Tax.detail
    var tax_purchase_results = processedResults.tax_purchase.detail
    var tax_supply_results = processedResults.tax_supply.detail
    var manufacturer_results = processedResults.manufacturer.detail
    var origin_results = processedResults.origin_results
    this.all_manufacturer = manufacturer_results
    this.all_supcus = supcus_results;
    this.all_dept = dept_results;

    var supcus_code = [];
    var supcus_name = [];
    var um_list = [];
    var dept_code = [];
    var dept_description = [];
    var mfr_code = [];
    var mfr_description = [];
    var origin_list = [];
    var variant_list   = [];
    var item_size_list = [];
    var item_type_list = [];
    var price_type_list = [];
    var tax_list = [
      {
        "label":"NA",
        "value":"NA",
      }
    ];
    var tax_purchase_list = [];
    var tax_supply_list = [];

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

    for(var i in um_results)
    {
    var sample = um_results[i];

    var obj = {
      label: sample.Description,
      value: sample.Code
    }

    um_list.push(obj);
    }

    for(var i in dept_results)
    {
    var sample = dept_results[i];

    var obj = {
      label: sample.Code+ ' - ' + sample.Description,
      value: sample.Code
    }

    var obj1 = {
      label: sample.Description,
      value: sample.Code
    }

    dept_code.push(obj);
    dept_description.push(obj1);
    }
    //   console.log('dept_results',dept_results)
    for(var i in manufacturer_results)
    {
    var sample = manufacturer_results[i];

    var obj = {
      label: sample.Code+ ' - ' + sample.description,
      value: sample.Code,
    }

    var obj1 = {
      label: sample.description,
      value: sample.Code,
    }

    mfr_code.push(obj);
    mfr_description.push(obj1);
    }
    mfr_code.sort((a, b) => (a.value < b.value ? -1 : 1));
    mfr_description.sort((a, b) => (a.value < b.value ? -1 : 1));
    for(var i in origin_results)
    {
    var sample = origin_results[i];

    var obj = {
      label: sample.code+ ' - ' + sample.name,
      value: sample.code
    }

    var obj1 = {
      label: sample.name,
      value: sample.code
    }
    origin_list.push(obj1);
    }
    //console.log('variant',variant)
    if(variant.total_row > 0){
    for(var i in variant_results)
    {
    var sample = variant_results[i];

    var obj = {
      label: sample.Description+ ' - ' + sample.Description,
      value: sample.Colour
    }

    var obj1 = {
      label: sample.Description,
      value: sample.Colour
    }
    variant_list.push(obj1);
    }
    }else{
    variant_results = []
    }
    // console.log('item_size',item_size)
    if(item_size.total_row > 0){
    for(var i in item_size_results)
    {
    var sample = item_size_results[i];

    var obj = {
      label: sample.Description+ ' - ' + sample.Description,
      value: sample.Size
    }

    var obj1 = {
      label: sample.Description,
      value: sample.Size
    }
    item_size_list.push(obj1);
    }
    }
    item_size_list.sort((a, b) => (a.value < b.value ? -1 : 1));

    for(var i in item_type_results)
    {
    var sample = item_type_results[i];


    var obj = {
      label: sample.ItemType,
      value: sample.ItemType
    }
    item_type_list.push(obj);
    }
    item_type_list.sort((a, b) => (a.value < b.value ? -1 : 1));

    for(var i in price_type_results)
    {
      var sample = price_type_results[i];
      var obj = {
        label: sample.CODE_DESC,
        value: sample.CODE_DESC
      }
      price_type_list.push(obj);
    }

    for(var i in tax_results)
    {
    var sample = tax_results[i];


    var obj = {
      label: sample.TaxDesc,
      value: sample.TaxCode
    }
    tax_list.push(obj);
    }



    for(var i in tax_purchase_results)
    {
    var sample = tax_purchase_results[i];

    var obj = {
      label: sample.description,
      value: sample.gst_tax_code
    }
    tax_purchase_list.push(obj);
    }

    for(var i in tax_supply_results)
    {
    var sample = tax_supply_results[i];


    var obj = {
      label: sample.description,
      value: sample.gst_tax_code
    }
    tax_supply_list.push(obj);
    }
    // var payloadCategory = {
    //       language : this.language,
    //       skip: 0,
    //       limit: 99999999,
    //       sort_by: "Description",
    //       sort_type: "ASC",
    //   }
    // var category = await this.getCategory(payloadCategory);
    var category_results =  processedResults.category.detail
    //   console.log('category_results',category_results);
    this.all_category = category_results
    var category_results_list = [];
    for(var i in category_results)
    {
    var sample = category_results[i];


    var obj = {
      label: sample.Description,
      value: sample.Code
    }
    category_results_list.push(obj);
    }

    var brand_results = processedResults.brand.detail
    this.all_brand = brand_results
    // console.log('brand_results',brand_results);
    var brand_list = [];
    for(var i in brand_results)
    {
      var sample = brand_results[i];

      var obj = {
        label: sample.Description,
        value: sample.Code,
        MCode: sample.MCode,
      }

      brand_list.push(obj);
    }
    this.brand_options = brand_list;

    this.supplier_options = supcus_code;
    // console.log('vendor_code',supcus_code);
    this.supplier_options2 = supcus_name;
    this.um_options = um_list
    this.dept_options = dept_code;
    this.manufacturer_options = mfr_description;
    this.origin_options = origin_list
    this.size_options = item_size_list
    this.item_type_options = item_type_list
    this.color_options = variant_list
    this.price_type_options = price_type_list
    this.tax_options = tax_list
    this.tax_purchase_options = tax_purchase_list
    this.tax_supply_options = tax_supply_list
    this.category_options = category_results_list

    if(this.page_function === 'EditItemmaster')
    {
    var itemcode_1 = this.$route.query.Itemcode;

    if(itemcode_1 == undefined || itemcode_1 == '')
    {
      this.$router.push('/ERP/purchase/Itemmaster')
      return;
    }

    var payload = {
      itemcode : itemcode_1
    }

    var data = await this.getFilterItem(payload);

    var dept_code =data.response.Dept
    var sub_dept_code = data.response.SubDept
    var manufacturer_code = data.response.Manufacturer

    var payloadSubDept = {
          language : this.language,
          skip: 0,
          limit: 99999999,
          MCode: dept_code
      }


    var sub_dept = await this.getSubDept(payloadSubDept);
    var sub_dept_results = sub_dept.detail

    var tem_manufacturer = this.manufacturer_options.filter((entry)=>{
       return entry.value == manufacturer_code
    })

    this.manufacturer_options = tem_manufacturer




    var sub_code = [];
    var sub_description = [];

    for(var i in sub_dept_results)
    {
      var sample = sub_dept_results[i];
      var obj = {
        label: sample.Code+ ' - ' + sample.Description,
        value: sample.Code
      }
      var obj1 = {
        label: sample.Description,
        value: sample.Code
      }

      sub_code.push(obj);
      sub_description.push(obj1);
    }

      this.sub_dept_options = sub_description

      var filtered_transmain = data.response;
      filtered_transmain.SellingPrice = this.formatAmount(filtered_transmain.SellingPrice, '$');
      filtered_transmain.cartonprice  = this.formatAmount(filtered_transmain.cartonprice,'$');
      filtered_transmain.AverageCost  = this.formatAmount(filtered_transmain.AverageCost,'$');
      filtered_transmain.LastCost  = this.formatAmount(filtered_transmain.LastCost,'$');
      filtered_transmain.FIFOCost  = this.formatAmount(filtered_transmain.FIFOCost,'$');
      filtered_transmain.RSP_inc_tax  = this.formatAmount(filtered_transmain.RSP_inc_tax,'$');
      filtered_transmain.StdCost  = this.formatAmount(filtered_transmain.StdCost,'$');
      filtered_transmain.price_include_tax  = this.formatAmount(filtered_transmain.price_include_tax,'$');

      this.json = filtered_transmain;

      this.json.step = this.$route.query.step ? Number(this.$route.query.step) : 1;
      this.ori_json = JSON.parse(JSON.stringify(this.json))
      this.json.remark = this.json.remark==null ? '' : this.json.remark;

    }
    else if (this.page_function === 'CreateItemmaster' && this.type === 'duplicate_item_link'){
      this.showNotify("info", "Record has been duplicate successfully.<br>Please remember to save the record after make changes.");
      const storedItem = sessionStorage.getItem('item');
      //console.log('storedItem',storedItem);
      if (storedItem) {
        const parsedItem = JSON.parse(storedItem);

        var dept_code =parsedItem.Dept
        var sub_dept_code = parsedItem.SubDept
        var manufacturer_code = parsedItem.Manufacturer

    var payloadSubDept = {
          language : this.language,
          skip: 0,
          limit: 99999999,
          MCode: dept_code
      }


    var sub_dept = await this.getSubDept(payloadSubDept);
    var sub_dept_results = sub_dept.detail

    var tem_manufacturer = this.manufacturer_options.filter((entry)=>{
       return entry.value == manufacturer_code
    })

    this.manufacturer_options = tem_manufacturer

    var sub_code = [];
    var sub_description = [];

    for(var i in sub_dept_results)
    {
      var sample = sub_dept_results[i];
      var obj = {
        label: sample.Code+ ' - ' + sample.Description,
        value: sample.Code
      }
      var obj1 = {
        label: sample.Description,
        value: sample.Code
      }

      sub_code.push(obj);
      sub_description.push(obj1);
    }

      this.sub_dept_options = sub_description


        parsedItem.SellingPrice =  this.formatAmount(parsedItem.SellingPrice,'$');
        parsedItem.cartonprice =  this.formatAmount(parsedItem.cartonprice,'$')
        this.json = parsedItem
        this.json.Itemcode = ''

        this.json.step = 1
       // console.log(parsedItem); // This will log the array
      //  console.log(this.json);
      }
    }
    else
    {
      // var payloadBrand = {
      //     skip: 0,
      //     language : 'EN',
      //     limit:99999999,
      //     sort_by: "Description",
      //     sort_type: "ASC",
      // }
      // var brand = await this.getBrand(payloadBrand);

      // this.json.carton_cost = '0.00';
      // this.json.carton_price = '0.00';
      // this.json.carton_qty = '12';
      // this.json.disc_1 = '0.00';
      // this.json.disc_2 = '0.00';
      // this.json.disc_by_amount = '0.00';
      // this.json.price_per_unit = '0.00';
      // this.json.without_tax = '0.00';
      // this.json.tax = '0.00';
      // this.json.tax_amount = '0.00';
      // this.json.amount_with_tax = '0.00';
      // this.json.margin = '0.00';
      // this.json.rounding = '0.00';
      // this.json.selling_price_each_unit = '0.00';
      // this.json.amount_include_tax = '0.00';
      this.json.TaxCode="NA";
      this.json.tax_code_purchase="TX-0";
      this.json.tax_code_supply="SR-0";
      this.json.SellingPrice ="0.00";
      this.json.cartonprice ="0.00";
      this.json.AverageCost ="0.00";
      this.json.LastCost ="0.00";
      this.json.FIFOCost ="0.00";
      this.json.RSP_inc_tax ="0.00";
      this.json.StdCost ="0.00";
    }
        this.json.carton_cost = '0.00';
        this.json.carton_price = '0.00';
        this.json.carton_qty = '12';
        this.json.disc_1 = '0.00';
        this.json.disc_2 = '0.00';
        this.json.disc_by_amount = '0.00';
        this.json.price_per_unit = '0.00';
        this.json.without_tax = '0.00';
        this.json.tax = '0.00';
        this.json.tax_amount = '0.00';
        this.json.amount_with_tax = '0.00';
        this.json.margin = '0.00';
        this.json.rounding = '0.00';
        this.json.selling_price_each_unit = '0.00';
        this.json.amount_include_tax = '0.00';
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
    //  console.log('json', this.json)


    var filter_item_calculation = this.preference.filter((entry)=>{
      return entry.module == 'item_calculation';
    });

    this.item_calculation = filter_item_calculation.length > 0 ? (filter_item_calculation[0].enable == 1 ? true : false) : false;
   setTimeout(()=>{
    this.showAddLoading = false;
    console.log('json',this.json);
   },2500)

  },
  async created () {


  },
  methods: {
    handleChangeCalculationNew()
    {
      // alert('handleOther than first field and last field = '+this.last_enter_field);
      // alert('pending do general calculation format based on last enter field');

      if(this.last_enter_field == "first")
      {
        this.handleChangeCalculation('')
      }
      else if(this.last_enter_field == "end")
      {
        this.handleChangeCalculationReverse('')
      }

    },
    async handleChangeCalculationReverse(type)
    {
      this.$nextTick(async ()=>{

        if(type == "carton_cost")
        {
          this.last_enter_field = 'first';
        }
        else if(type == "amount_include_tax")
        {
          this.last_enter_field = 'end';
        }

        this.json.carton_cost = (Number(this.json.carton_cost)).toFixed(2);

        /* this.json.cartonprice = (Number(this.json.cartonprice)).toFixed(2); */

        this.json.disc_1 = (Number(this.json.disc_1)).toFixed(2);
        this.json.disc_2 = (Number(this.json.disc_2)).toFixed(2);
        this.json.disc_by_amount = (Number(this.json.disc_by_amount)).toFixed(2);
        this.json.tax = (Number(this.json.tax)).toFixed(2);
        this.json.margin = (Number(this.json.margin)).toFixed(2);
        this.json.rounding = (Number(this.json.rounding)).toFixed(2);
        this.json.amount_include_tax = (Number(this.json.amount_include_tax)).toFixed(2);



        var calculate_carton_cost = (Number(this.json.amount_include_tax) / (1+(Number(this.json.tax)/100))).toFixed(2);

        this.json.carton_cost = calculate_carton_cost;


        this.json.cartonprice = (Number(this.json.carton_cost)).toFixed(2);

        var carton_cost = this.json.carton_cost ? this.json.carton_cost : 0;

        // var carton_price = this.json.carton_price ? this.json.carton_price : 0;

        var carton_qty = this.json.BulkQty ? this.json.BulkQty : 0;
        var disc_1 = this.json.disc_1 ? this.json.disc_1 : 0;

        var disc_2 = this.json.disc_2 ? this.json.disc_2 : 0;

        var disc_by_amount = this.json.disc_by_amount ? this.json.disc_by_amount : 0;

        var price_per_unit = this.json.price_per_unit ? this.json.price_per_unit : 0;
        var without_tax = this.json.without_tax ? this.json.without_tax : 0;
        var tax = this.json.tax ? this.json.tax : 0;

        var amount_with_tax = this.json.amount_with_tax ? this.json.amount_with_tax : 0;
        var margin = this.json.margin ? this.json.margin : 0;

        var rounding = this.json.rounding ? this.json.rounding : 0;

        var selling_price_each_unit = this.json.SellingPrice ? this.json.SellingPrice : 0;
        var amount_include_tax = this.json.amount_include_tax ? this.json.amount_include_tax : 0;
        // console.log(type)
        // if(type == 'carton_cost')
        // {


          var price_after_disc1 = ((Number(carton_cost)/Number(carton_qty)) * (1 - (Number(disc_1) / 100))).toFixed(2);

          var price_after_disc2 = (Number(price_after_disc1) * (1 - (Number(disc_2) / 100))).toFixed(2)

          var price_after_disc = (Number(price_after_disc2) - Number(disc_by_amount)).toFixed(2);

          this.json.without_tax = isFinite(price_after_disc) ? price_after_disc : 0;
          this.json.price_per_unit = isFinite(price_after_disc) ? price_after_disc : 0;

          var ftax = ((tax/100) * Number(price_after_disc)).toFixed(2);

          this.json.tax_amount = isFinite(ftax) ? ftax : 0;

          var price_after_tax = (Number(price_after_disc) + Number(ftax)).toFixed(2);

          this.json.amount_with_tax = isFinite(price_after_tax) ? price_after_tax : 0;

          var total_price_include_tax = (Number(carton_cost) * (1+(Number(tax)/100))).toFixed(2);

          // this.json.amount_include_tax = isFinite(total_price_include_tax) ? total_price_include_tax : 0 ;

          var after_margin = (Number(price_after_tax) * (1+(Number(margin)/100))).toFixed(2);

          if(rounding > 0)
          {
            var round_up = await this.roundUpToNearest(after_margin, rounding);
            var round_up = (Number(round_up)).toFixed(2);
          }
          else
          {
            var round_up = (Number(after_margin)).toFixed(2);
          }

          // this.json.selling_price_each_unit = isFinite(round_up) ? round_up : 0 ;
          this.json.SellingPrice = isFinite(round_up) ? round_up : 0 ;


        // }

      });
    },
    async roundUpToNearest(amount, roundBy) {
      // return Math.ceil(amount / roundBy) * roundBy;

      const remainder = Number(amount) % Number(roundBy);
      return remainder === 0 ? Number(amount) : Number(amount) + (Number(roundBy) - Number(remainder));

    },
    async handleChangeCalculation(type)
    {

      this.$nextTick(async ()=>{

        if(type == "carton_cost")
        {
          this.last_enter_field = 'first';
        }
        else if(type == "amount_include_tax")
        {
          this.last_enter_field = 'end';
        }

        this.json.carton_cost = (Number(this.json.carton_cost)).toFixed(2);

        /*this.json.cartonprice = (Number(this.json.cartonprice)).toFixed(2); */

        this.json.cartonprice = (Number(this.json.carton_cost)).toFixed(2);
        this.json.disc_1 = (Number(this.json.disc_1)).toFixed(2);
        this.json.disc_2 = (Number(this.json.disc_2)).toFixed(2);
        this.json.disc_by_amount = (Number(this.json.disc_by_amount)).toFixed(2);
        this.json.tax = (Number(this.json.tax)).toFixed(2);
        this.json.margin = (Number(this.json.margin)).toFixed(2);
        this.json.rounding = (Number(this.json.rounding)).toFixed(2);

        var carton_cost = this.json.carton_cost ? this.json.carton_cost : 0;



        // var carton_price = this.json.carton_price ? this.json.carton_price : 0;

        //all need to add in auto change fixed decimals 2 here. also need to do edit calculation.also need to do reverse calculation for amount include tax (kalkulasi include)

        var carton_qty = this.json.BulkQty ? this.json.BulkQty : 0;
        var disc_1 = this.json.disc_1 ? this.json.disc_1 : 0;

        var disc_2 = this.json.disc_2 ? this.json.disc_2 : 0;

        var disc_by_amount = this.json.disc_by_amount ? this.json.disc_by_amount : 0;

        var price_per_unit = this.json.price_per_unit ? this.json.price_per_unit : 0;
        var without_tax = this.json.without_tax ? this.json.without_tax : 0;
        var tax = this.json.tax ? this.json.tax : 0;

        var amount_with_tax = this.json.amount_with_tax ? this.json.amount_with_tax : 0;
        var margin = this.json.margin ? this.json.margin : 0;

        var rounding = this.json.rounding ? this.json.rounding : 0;

        var selling_price_each_unit = this.json.SellingPrice ? this.json.SellingPrice : 0;
        var amount_include_tax = this.json.amount_include_tax ? this.json.amount_include_tax : 0;
        // console.log(type)
        // if(type == 'carton_cost')
        // {

          var price_after_disc1 = ((Number(carton_cost)/Number(carton_qty)) * (1 - (Number(disc_1) / 100))).toFixed(2);

          var price_after_disc2 = (Number(price_after_disc1) * (1 - (Number(disc_2) / 100))).toFixed(2)

          var price_after_disc = (Number(price_after_disc2) - Number(disc_by_amount)).toFixed(2);

          this.json.without_tax = isFinite(price_after_disc) ? price_after_disc : 0;
          this.json.price_per_unit = isFinite(price_after_disc) ? price_after_disc : 0;

          var ftax = ((tax/100) * Number(price_after_disc)).toFixed(2);

          this.json.tax_amount = isFinite(ftax) ? ftax : 0;

          var price_after_tax = (Number(price_after_disc) + Number(ftax)).toFixed(2);

          this.json.amount_with_tax = isFinite(price_after_tax) ? price_after_tax : 0;

          var total_price_include_tax = (Number(carton_cost) * (1+(Number(tax)/100))).toFixed(2);


          this.json.amount_include_tax = isFinite(total_price_include_tax) ? total_price_include_tax : 0 ;


          var after_margin = (Number(price_after_tax) * (1+(Number(margin)/100))).toFixed(2);

          if(rounding > 0)
          {
            var round_up = await this.roundUpToNearest(after_margin, rounding);
            var round_up = (Number(round_up)).toFixed(2);
          }
          else
          {
            var round_up = (Number(after_margin)).toFixed(2);
          }

          // this.json.selling_price_each_unit = isFinite(round_up) ? round_up : 0 ;
          this.json.SellingPrice = isFinite(round_up) ? round_up : 0 ;


        // }

      });



    },
      async handleChangeGroup()
      {
        var row = this.table_data.data.results;

        var allSelectFalse = row.every(item => item.select === false);

        if (allSelectFalse) {
          this.showNotify('negative', 'No item select');
          return;
        }

        var RefNo = this.json.RefNo;
        var Line = [];

        for(var index in row)
        {
          if(row[index].select)
          {
            Line.push(row[index].Line);
          }
        }

        var payload = {
          RefNo: RefNo,
          Line: Line,
          language: this.language
        }

        var data = {};

        await this.$store.dispatch('purchase/trigger_item_tagging', payload).then(() => {
          data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_item_tagging']));
        });

        var status = data.status

        if(status == "success")
        {
          this.showAddLoading = false;
          this.showNotify("positive", data.response.msg);
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
      },
      async handleChangeUngroup()
      {
        var row = this.table_data.data.results;

        var allSelectFalse = row.every(item => item.select === false);

        if (allSelectFalse) {
          this.showNotify('negative', 'No item select');
        }

        var RefNo = this.json.RefNo;
        var Line = [];

        for(var index in row)
        {
          if(row[index].select)
          {
            Line.push(row[index].Line);
          }
        }

        var payload = {
          RefNo: RefNo,
          Line: Line,
          language: this.language
        }

        var data = {};

        await this.$store.dispatch('purchase/trigger_item_untagging', payload).then(() => {
          data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_item_untagging']));
        });

        var status = data.status;

        if(status == "success")
        {
          this.showAddLoading = false;
          this.showNotify("positive", data.response.msg);
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
      handleSilQuantity(element, index, Qty, FOCQty, BulkQty, BulkFOC)
      {
        // console.log(this.sil_table_data.data.results[index]);
        // console.log(index, Qty, FOCQty, BulkQty, BulkFOC)
        if(element == 'Qty')
        {
          if((Qty != 0 && Qty != '0') && (BulkQty != 0 && BulkQty != '0'))
          {
            this.showNotify('negative', 'Bulk Qty already has value.')
            Qty = 0;
          }
        }
        else if(element == 'FOCQty')
        {
          if((FOCQty != 0 && FOCQty != '0') && (BulkFOC != 0 && BulkFOC != '0'))
          {
            this.showNotify('negative', 'Bulk FOC already has value.')
            FOCQty = 0;
          }
        }
        else if(element == 'BulkQty')
        {
          if((Qty != 0 && Qty != '0') && (BulkQty != 0 && BulkQty != '0'))
          {
            this.showNotify('negative', 'Qty already has value.')
            BulkQty = 0;
          }
        }
        else if(element == 'BulkFOC')
        {
          if((FOCQty != 0 && FOCQty != '0') && (BulkFOC != 0 && BulkFOC != '0'))
          {
            this.showNotify('negative', 'FOC Qty already has value.')
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
        else if(this.json.BillStatus==1)
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
        // console.log(this.unformatAmount(this.jsonChild.UnitPrice));
        // console.log(this.jsonChild.DiscAmt)

        var discAmt = this.jsonChild.DiscAmt;

        if (!discAmt.match(/^[\d%.+\-]+$/)) {
          this.showNotify('negative', "Invalid Discount(+)/Surcharge(-)");
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
      handleChangeRebateAmount()
      {
        this.jsonChild.rebate_value = this.formatAmount(this.jsonChild.rebate_value,'$');
      },
      handleChangeFuturePrice()
      {
        this.jsonChild.price_future = this.formatAmount(this.jsonChild.price_future,'$');
      },
      handleChangeQty(newVal)
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
        this.edit_barcode = false;
        this.jsonBarcode = {};
        this.show_barcode_dialog = false;
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
            this.showNotify("negative","This Doc already posted.");
            this.deleteLoading = false;
            this.showAddLoading2 = false;
            return;
        }
        else
        {
          var payload = {
            Itemcode: this.active_delete_json.Itemcode,
            Barcode: this.active_delete_json.Barcode,
            user: this.user_name
          }

          var data = {};

          if(this.page_function == 'EditItemmaster')
          {
            payload.language = this.language;

            await this.$store.dispatch('itemmaster/trigger_delete_barcode', payload).then(() => {
              data = JSON.parse(JSON.stringify(this.$store.getters['itemmaster/get_barcode_status']));
            });
          }

          if(data.status == "success")
          {
            this.$nextTick(async ()=>{
              this.table_function(this.ori_params);
              this.showNotify("positive","Delete successfully");
              this.show_barcode_dialog = false;
              this.delete_child = false;
              this.deleteLoading = false;
              this.showAddLoading2 = false;
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
      async handleSilChild()
      {
        var results = this.sil_table_data.data.results;
        var hv_qty = false;

        for(var i in results)
        {
          var obj = results[i];
          if((obj.Qty != 0 && obj.Qty != '0') ||
          (obj.FOCQty != 0 && obj.FOCQty != '0') ||
          (obj.BulkQty != 0 && obj.BulkQty != '0') ||
          (obj.BulkFOC != 0 && obj.BulkFOC != '0'))
          {
            console.log('edit', obj)
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

            var payload = {
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

            payload.Description = obj.Description;

            var data = {};

            await this.$store.dispatch('purchase/trigger_create_pochild', payload).then(() => {
              data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_pochild_status']));
            });

            var status = data.status;


            if(status == "success")
            {
              this.showAddLoading = false;
              this.showNotify("positive", "Created Successfully.");

              this.jsonChild = {};
              this.search.showTable = false;
              this.modify_child = false;
              this.supplier_item_list_popup = false;
              this.table_function(this.ori_params);
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
                  console.log(payload)
                  temp_error = loop_index + " - " + payload.Itemcode + " - " + payload.Description + " - " + error_message + '<br>';
                  show_error += temp_error;
                }
              });//close foreach error message

              this.showNotify('negative', show_error);

              this.showAddLoading = false;
            }

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

        if(!hv_qty)
        {
          this.showNotify('negative', 'No qty key in.')
        }
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

            this.showAddLoading = false;
            this.showNotify("positive", "Updated Successfully.");
              this.table_function(this.ori_params);
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
       addButtonBarcode(){
        this.show_barcode_dialog = true;
         console.log('add Barcode');
         this.jsonBarcode.barRemark = '';
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
        if(Object.keys(this.selected_row).length == 0)
        {
          this.showNotify('negative', 'No item selected');
          return;
        }

        this.search_item = false;

        if(!this.search_supplier)
        {
          // this.modify_child = true;
          this.showAddLoading = true;
          this.edit_child = false;
       //   this.json.Itemcode = this.selected_row.Itemcode
          this.json.Dept = this.selected_row.Dept
          this.$nextTick(async()=>{
          var payload = {
            skip:0,
            limit: 999999,
            language:'EN'
          }
          var sub_dept = await this.getSubDept(payload)
          var sub_dept_result_list = sub_dept.detail
        //  console.log('sub_dept',sub_dept)
          var category = await this.getCategory(payload)
          var category_list = category.detail
          var sub_dept_results = sub_dept_result_list.filter((entry)=>{
          return entry.MCode == this.json.Dept
        })



        var sub_dept_name = [];
        var category_name = [];

        for(var i in sub_dept_results)
        {
          var sample = sub_dept_results[i];

          var obj = {
            label: sample.Description,
            value: sample.Code
          }
          sub_dept_name.push(obj);
        }
        this.sub_dept_options = sub_dept_name

        this.json.SubDept = this.selected_row.SubDept

            var category_results = category_list.filter((entry)=>{
              return entry.MCode == this.json.SubDept
            })
            for(var i in category_results)
            {
              var sample = category_results[i];

              var obj = {
                label: sample.Description,
                value: sample.Code
              }
              category_name.push(obj);
            }
           this.category_options = category_name
           this.json.Category = this.selected_row.Category
           this.json.ArticleNo = this.selected_row.ArticleNo
           this.json.Description = this.selected_row.Description
           this.json.StdCost = this.selected_row.StdCost
           this.json.SellingPrice = this.selected_row.SellingPrice
           console.log('selected_row',this.selected_row);
           console.log('json',this.json)
          })

          // this.jsonChild = {
          //   step: 1,
          //   type: 'Itemcode',
          //   EntryType: "Unit",
          //   PriceType: "Norm",
          //   group: 0,
          //   group_cost: 0,
          //   SetQty: "0",
          //   Qty_foc: "0",
          //   BulkQty: "0",
          //   TotalPrice: "0.00",
          //   rebate_value: "0.00",
          //   price_future: "0.00",
          //   OrderLotSize: 1,
          // }
          //this.handleChangeEntryType('Unit')



          // var itemcode = this.selected_row.Itmecode;
          // var supplier_code = this.json.SCode;
          // var po_date = this.json.PODate;
          // var outlet = this.json.loc_group;

          // var payload = {
          //   itemcode: itemcode,
          //   supplier_code: supplier_code,
          //   po_date: po_date,
          //   outlet: outlet,
          //   user: this.user_name,
          //   language: this.language
          // }

          // await this.$store.dispatch('purchase/trigger_get_item_by_itemcode_for_po', payload).then(() => {
          //   var data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_item_by_itemcode_for_po']));

          //   var response = data.response;

          //   response.Disc1value = this.formatAmount(response.Disc1value,'$');
          //   response.Disc2Value = this.formatAmount(response.Disc2Value,'$');
          //   response.UnitPrice = this.formatAmount(response.UnitPrice,'$');
          //   response.NetUnitPrice = parseFloat(response.NetUnitPrice).toFixed(4);
          //   response.NetUnitPrice = this.formatAmount(response.NetUnitPrice);
          //   response.TotalPrice = this.formatAmount('0.00','$');
          //   response.DiscAmt = this.formatAmount('0.00','$');
          //   response.rebate_value = this.formatAmount('0.00','$');
          //   response.price_future = this.formatAmount('0.00','$');
          //   response.EntryType = 'Unit';
          //   response.PriceType = 'Norm';
          //   response.Qty_foc = "0";
          //   response.SetQty = "0";
          //   response.BulkQty = '0';
          //   response.OrderLotSize = 1;


          //   this.jsonChild = response;
          //   this.jsonChild.SetQty = this.jsonChild.SetQty==0 ? '0' : this.jsonChild.SetQty;

          //   if(response.barcode.length > 0)
          //   {
          //     var ary = [];

          //     for(var i in response.barcode)
          //     {
          //       var bc = response.barcode[i];

          //       var obj = {
          //         label: bc,
          //         value: bc
          //       }

          //       ary.push(obj);
          //     }

          //     this.barcode_options = ary;
          //     this.jsonChild.Barcode = this.barcode_options[0].value;
          //   }
          //   else
          //   {
          //     this.jsonChild.Barcode = '';
          //   }
          // });

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
      handleDelete(payload){
        this.active_delete_json = payload;

        console.log('json',payload);
        this.delete_child = true;
      },
      async handleAction(payload){
        var mobile = this.$q.screen.width < 600
         console.log('payload',payload);
          // if(!mobile)
          // {
          //   if(this.json.BillStatus == 1)
          //   {
          //       this.showNotify("negative","This Doc already posted.");
          //       return;
          //   }
          // }

          this.show_barcode_dialog = true;
          this.edit_child = true;
          this.edit_barcode = true;
          this.showAddLoading = true;
          this.jsonBarcode = payload
          console.log('payload',payload);

          this.showAddLoading = false;

      },
      handleChangeSCode(payload)
      {
        console.log('payload',payload)
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
      async getUM(payload)
      {
        return await this.$store.dispatch('itemmaster/trigger_read_all_code', payload).then(() => {
          var data = JSON.parse(JSON.stringify(this.$store.getters['itemmaster/get_read_all_code']));
          return data;
        });
      },
      async getDepartment(payload)
      {
        return await this.$store.dispatch('itemmaster/trigger_read_department', payload).then(() => {
          var data = JSON.parse(JSON.stringify(this.$store.getters['itemmaster/get_department']));
          return data;
        });
      },
      async getSubDept(payload)
      {
        return await this.$store.dispatch('itemmaster/trigger_read_subdept', payload).then(() => {
          var data = JSON.parse(JSON.stringify(this.$store.getters['itemmaster/get_sub_dept']));
          return data;
        });
      },
      async getCategory(payload)
      {
        return await this.$store.dispatch('itemmaster/trigger_read_category', payload).then(() => {
          var data = JSON.parse(JSON.stringify(this.$store.getters['itemmaster/get_category']));
          return data;
        });
      },
      async getManufacturer(payload)
      {
        return await this.$store.dispatch('itemmaster/trigger_read_maufacturer', payload).then(() => {
          var data = JSON.parse(JSON.stringify(this.$store.getters['itemmaster/get_manufacturer']));
          return data;
        });
      },
      async getBrand(payload)
      {
        return await this.$store.dispatch('itemmaster/trigger_read_brand', payload).then(() => {
          var data = JSON.parse(JSON.stringify(this.$store.getters['itemmaster/get_brand']));
          return data;
        });
      },
      async getOrigin(payload)
      {
        return await this.$store.dispatch('itemmaster/trigger_read_origin', payload).then(() => {
          var data = JSON.parse(JSON.stringify(this.$store.getters['itemmaster/get_origin']));
          return data;
        });
      },
      async getVariant(payload)
      {
        return await this.$store.dispatch('itemmaster/trigger_read_item_color', payload).then(() => {
          var data = JSON.parse(JSON.stringify(this.$store.getters['itemmaster/get_item_color']));
          return data;
        });
      },
      async getItemSize(payload)
      {
        return await this.$store.dispatch('itemmaster/trigger_read_item_size', payload).then(() => {
          var data = JSON.parse(JSON.stringify(this.$store.getters['itemmaster/get_item_size']));
          return data;
        });
      },
      async getItemType(payload)
      {
        return await this.$store.dispatch('itemmaster/trigger_read_item_type', payload).then(() => {
          var data = JSON.parse(JSON.stringify(this.$store.getters['itemmaster/get_item_type']));
          return data;
        });
      },
      async getPriceType(payload)
      {
        return await this.$store.dispatch('itemmaster/trigger_read_master_code_by_trans_type', payload).then(() => {
          var data = JSON.parse(JSON.stringify(this.$store.getters['itemmaster/get_read_master_code_by_trans_type']));
          return data;
        });
      },
      async getTax(payload)
      {
        return await this.$store.dispatch('itemmaster/trigger_read_tax', payload).then(() => {
          var data = JSON.parse(JSON.stringify(this.$store.getters['itemmaster/get_tax']));
          return data;
        });
      },
      async getTaxPurchase(payload){
        return await this.$store.dispatch('itemmaster/trigger_read_gst', payload).then(() => {
          var data = JSON.parse(JSON.stringify(this.$store.getters['itemmaster/get_gst']));
          return data;
        });
      },
      async getTaxSupply(payload){
        return await this.$store.dispatch('itemmaster/trigger_read_gst', payload).then(() => {
          var data = JSON.parse(JSON.stringify(this.$store.getters['itemmaster/get_gst']));
          return data;
        });
      },
      async getFilterItem(payload)
      {
        return await this.$store.dispatch('itemmaster/trigger_read_item', payload).then(() => {
          var data = JSON.parse(JSON.stringify(this.$store.getters['itemmaster/get_read_item']));
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
      async getBarcode(payload)
      {
        return await this.$store.dispatch('itemmaster/trigger_read_barcode_by_itemcode', payload).then(() => {
            var data = JSON.parse(JSON.stringify(this.$store.getters['itemmaster/get_read_barcode_by_itemcode']));
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
        if(this.page_function.endsWith('Itemmaster'))
        {
          this.$router.push("Itemmaster");
        }
        else if(this.page_function.endsWith('GoodsReceiving'))
        {
          this.$router.push("GoodsReceiving");
        }

      },
      handleSupplierItemTableChange: function(newVal){
        var new_params = this.$pluginsTableParams(newVal)

          var payload = {
              params : new_params
          };

          this.supplier_item_ori_params = payload;
          this.supplier_item_table_function(payload);
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
                  name: 'action',
                  required: true,
                  label: 'Actions',
                  align: 'center',
                  sortable: true,
                  field: 'action',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
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
                  name: 'barDesc',
                  required: true,
                  label: 'Description',
                  align: 'left',
                  sortable: true,
                  field: 'barDesc',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
              },
              {
                  name: 'barPrice',
                  required: true,
                  label: 'Price',
                  align: 'right',
                  sortable: true,
                  field: 'barPrice',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
              },
              {
                  name: 'barRemark',
                  required: true,
                  label: 'Remark',
                  align: 'left',
                  sortable: true,
                  field: 'barRemark',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'ChangedBy',
                  required: true,
                  label: 'Updated By',
                  align: 'left',
                  sortable: true,
                  field: 'ChangedBy',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'LastStamp',
                  required: true,
                  label: 'Updated at',
                  align: 'center',
                  sortable: true,
                  field: 'LastStamp',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'IssueStamp',
                  required: true,
                  label: 'Created at',
                  align: 'center',
                  sortable: true,
                  field: 'IssueStamp',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'CreatedBy',
                  required: true,
                  label: 'Created By',
                  align: 'left',
                  sortable: true,
                  field: 'CreatedBy',
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

          if(this.json.BillStatus == 1)
          {
            table_column = table_column.filter((entry)=>{
              return entry.field != 'action' && entry.field != 'select';
            })
          }

          this.table_column = table_column;
          this.table_column1 = table_column1;

          this.$nextTick(async ()=>{
            payload.params.itemcode = this.$route.query.itemcode;
            payload.params.language = this.language;
            var data = {};

            if(this.page_function == 'CreateItemmaster')
            {
              data = {
                  "data": []
              };
            }
            else
            {
              var cpayload =
                {
                  params: {
                    itemcode : this.$route.query.Itemcode,
                    language :  this.language
                  }
                }

              data = await this.getBarcode(cpayload);
              var results = data.data;
              // console.log('results',results);
              // console.log('data',data);
             this.supplier_readonly = results.length > 0;

              for(var i in results)
              {
                var obj = results[i];
                obj.select = false;
                obj.barPrice = this.formatAmount(obj.barPrice,'$');

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
            this.results = data.data;
           // console.log('results',this.results);
          });
      },
      supplier_item_table_function(payload){
           var supplier_item_table_column = [
              {
                  name: 'action',
                  required: true,
                  label: 'Actions',
                  align: 'center',
                  sortable: true,
                  field: 'action',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
              },
              {
                  name: 'priority_vendor',
                  required: true,
                  label: 'Priority',
                  align: 'left',
                  sortable: true,
                  field: 'priority_vendor',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'

              },
              {
                  name: 'block_order',
                  required: true,
                  label: 'Block',
                  align: 'center',
                  sortable: true,
                  field: 'block_order',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
              },
              {
                  name: 'none_return',
                  required: true,
                  label: 'Non Returnable',
                  align: 'center',
                  sortable: true,
                  field: 'none_return',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
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
                  headerStyle: 'text-align: center;'
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
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'TaxCode',
                  required: true,
                  label: 'Tax Code',
                  align: 'center',
                  sortable: true,
                  field: 'TaxCode',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'OrderLotSize',
                  required: true,
                  label: 'Ordering Lot Size',
                  align: 'right',
                  sortable: true,
                  field: 'OrderLotSize',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'SupBulkQty',
                  required: true,
                  label: 'Carton Qty',
                  align: 'right',
                  sortable: true,
                  field: 'SupBulkQty',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
                 {
                  name: 'SupStdPrice',
                  required: true,
                  label: 'Listed Cost',
                  align: 'right',
                  sortable: true,
                  field: 'SupStdPrice',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
                 {
                  name: 'Disc1Type',
                  required: true,
                  label: 'Disc1 Type',
                  align: 'left',
                  sortable: true,
                  field: 'Disc1Type',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
                 {
                  name: 'Disc1Value',
                  required: true,
                  label: 'Disc1',
                  align: 'right',
                  sortable: true,
                  field: 'Disc1Value',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
                 {
                  name: 'Disc2Type',
                  required: true,
                  label: 'Disc2 Type',
                  align: 'left',
                  sortable: true,
                  field: 'Disc2Type',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
                {
                  name: 'Disc2Value',
                  required: true,
                  label: 'Disc2',
                  align: 'right',
                  sortable: true,
                  field: 'Disc2Value',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
                 {
                  name: 'NetUnitPrice',
                  required: true,
                  label: 'Net Cost',
                  align: 'right',
                  sortable: true,
                  field: 'NetUnitPrice',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'cartonprice',
                  required: true,
                  label: 'Carton Cost',
                  align: 'right',
                  sortable: true,
                  field: 'cartonprice',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
                {
                  name: 'SupLastPrice',
                  required: true,
                  label: 'Last Cost',
                  align: 'right',
                  sortable: true,
                  field: 'SupLastPrice',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'SupRSPAfterTax',
                  required: true,
                  label: 'RSP After Tax',
                  align: 'right',
                  sortable: true,
                  field: 'SupRSPAfterTax',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
               {
                  name: 'SupRSPBeforeTax',
                  required: true,
                  label: 'RSP Before Tax',
                  align: 'right',
                  sortable: true,
                  field: 'SupRSPBeforeTax',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
               {
                  name: 'Itemcode',
                  required: true,
                  label: 'Supplier Item Code',
                  align: 'left',
                  sortable: true,
                  field: 'Itemcode',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
                {
                  name: 'Created_at',
                  required: true,
                  label: 'Created At',
                  align: 'left',
                  sortable: true,
                  field: 'Created_at',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
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
                  headerStyle: 'text-align: center;'
              },
                {
                  name: 'Updated_at',
                  required: true,
                  label: 'Updated At',
                  align: 'left',
                  sortable: true,
                  field: 'Updated_at',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
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
                  headerStyle: 'text-align: center;'
              },



          ];



          if(this.json.BillStatus == 1)
          {
            supplier_item_table_column = supplier_item_table_column.filter((entry)=>{
              return entry.field != 'action' && entry.field != 'select';
            })
          }

          this.supplier_item_table_column = supplier_item_table_column;


          this.$nextTick(async ()=>{
            // payload.params.itemcode = this.$route.query.itemcode;
            // payload.params.language = this.language;
            var data = {};

            if(this.page_function == 'CreateItemmaster')
            {
              data = {
                  "data": []
              };
            }
            else
            {
                var payload = {
                    "pass_json": {
                      Itemcode: this.json.Itemcode,
                      language: this.language
                    }
                  };


              var object_pass = {
                "dispatch": 'itemmaster/trigger_post_itemmaster_itemmastersupcode',
                "getter": 'itemmaster/get_itemmaster_read_itemmastersupcode',
                "app": this,
                "payload": payload
            };

            var dispatch_response = await this.$dispatch(object_pass);
            console.log('dispatch_response',dispatch_response);

              if(dispatch_response.status)
            {
              //success condition
              data = dispatch_response.response
              var results = data.detail

              for(var i in results){
                 var obj = results[i]

                }

            }else
            {
              //fail condition
              data = {
                  "data": []
              };

              this.showNotify('negative', 'Please try again')
            }


            }




            this.supplier_item_table_data = {
              "data": {
                    "count": data.data.length,
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
            var supplier_code = this.json.vendor_code
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
          //  console.log('payload',payload);
            await this.$store.dispatch('itemmaster/trigger_search_item_for_po', payload).then(() => {
              data = JSON.parse(JSON.stringify(this.$store.getters['itemmaster/get_search_item_for_po']));
            });
          //  console.log('item_data',data)
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

            await this.$store.dispatch('itemmaster/trigger_search_supcus', payload).then(() => {
              data = JSON.parse(JSON.stringify(this.$store.getters['itemmaster/get_search_supcus']));
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
                  label: 'Article No',
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

          var payload = {
            "supplier_code": "9980",
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
      async handleCreateIM(){
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

        if(this.page_function == 'CreateItemmaster')
        {
            if(this.json.SellingPrice == 0)
            {
              this.showNotify("negative","Selling Price must greater than 0")
              this.showAddLoading = false;
              return;
            }
        }

        await this.saveIM();
      },
      async saveIM(){
          var step = this.json.step;

          // var currentdate = new Date();
          // var year = currentdate.getFullYear();
          // var month = ('0' + (currentdate.getMonth() + 1)).slice(-2);
          // var day = ('0' + currentdate.getDate()).slice(-2);
          // var hours = ('0' + currentdate.getHours()).slice(-2);
          // var minutes = ('0' + currentdate.getMinutes()).slice(-2);
          // var seconds = ('0' + currentdate.getSeconds()).slice(-2);
          // var milliseconds = currentdate.getMilliseconds();

          // var current_date_format = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;

          var vendor_code = this.json.vendor_code
          var itemcode = this.json.Itemcode;
          var ItemLink = this.json.ItemLink;
          var PackSize = this.json.PackSize;
          var UM = this.json.UM;
          var BulkQty = this.json.BulkQty;
          var UMBulk = this.json.UMBulk;
          var cartonprice = this.json.cartonprice;
          var Description = this.json.Description;
          var DesShort = this.json.DesShort;
          var Dept = this.json.Dept;
          var SubDept = this.json.SubDept;
          var Category = this.json.Category;
          var ArticleNo = this.json.ArticleNo;
          var Manufacturer = this.json.Manufacturer;
          var Brand = this.json.Brand;
          var Origin = this.json.Origin;
          var Point = this.json.Point;
          var Colour = this.json.Colour;
          var Size = this.json.Size;
          var ItemType = this.json.ItemType;
          var price_type = this.json.price_type;
          var YieldRatio = this.json.YieldRatio;
          var RSP_inc_tax  = this.json.RSP_inc_tax;
          var TaxCode =this.json.TaxCode;
          var tax_code_purchase = this.json.tax_code_purchase;
          var tax_code_supply = this.json.tax_code_supply
          var SellingPrice = this.json.SellingPrice;
          var StdCost = this.json.StdCost
          var remark = this.json.remark;
          var LastCost = this.json.LastCost;
          var AverageCost = this.json.AverageCost;
          var FIFOCost = this.json.FIFOCost;



          var payload = {
            "vendor_code":vendor_code,
            "itemcode":itemcode,
            "ItemLink":ItemLink,
            "PackSize":PackSize,
            "UM":UM,
            "BulkQty":BulkQty,
            "UMBulk":UMBulk,
            "cartonprice": cartonprice,
            "Description":Description,
            "DesShort": DesShort,
            "Dept": Dept,
            "SubDept": SubDept,
            "Category": Category,
            "ArticleNo": ArticleNo,
            "Manufacturer": Manufacturer,
            "Brand": Brand,
            "Origin": Origin,
            "Point": Point,
            "Size": Size,
            "ItemType": ItemType,
            "price_type": price_type,
            "YieldRatio": YieldRatio,
            "remark": remark,
            "Colour": Colour,
            "TaxCode":TaxCode,
            "RSP_inc_tax":RSP_inc_tax,
            "SellingPrice":SellingPrice,
            "StdCost":StdCost,
            "tax_code_purchase":tax_code_purchase,
            "tax_code_supply": tax_code_supply,
            "LastCost":LastCost,
            "AverageCost":AverageCost,
            "FIFOCost":FIFOCost

          };

          var data = {};

          if(this.page_function == 'CreateItemmaster')
          {
           // payload.IssueStamp = current_date_format;
            payload.language = this.language;
            console.log('payload',payload);
            await this.$store.dispatch('itemmaster/trigger_create_item', payload).then(() => {
              data = JSON.parse(JSON.stringify(this.$store.getters['itemmaster/get_item_status']));
            });
          }
          else if(this.page_function == 'EditItemmaster')
          {
            payload.itemcode = this.json.Itemcode;
            // payload.IssueStamp = IssueStamp;
            payload.language = this.language;
           //  console.log('PAYLOAD',payload);
            await this.$store.dispatch('itemmaster/trigger_update_item', payload).then(() => {
              data = JSON.parse(JSON.stringify(this.$store.getters['itemmaster/get_item_status']));
            });
          }

          var status = data.status

          if(status == "success")
          {
            this.showAddLoading = false;

            var mobile = this.$q.screen.width < 600

            var set_query = {
              "itemcode":data.response.Itemcode,
              "EUser":this.user_name,
              "getuser":this.user_name
            };

            var json_runtime_runscript_multi = {
                params:[
                {
                  "lookupdb_name": this.session_outlet_guid,
                  "trans_group": 'itemmaster',
                  "trans_type": 'itemmaster',
                  "set_query":set_query
                }
              ]
            };
            var payload_runtime_runscript_multi ={
              "pass_json": json_runtime_runscript_multi
            }
              var dispatch_response = await this.runscript_multi(payload_runtime_runscript_multi,'1')
            //  console.log('dispatch_response',dispatch_response);
              if(dispatch_response.status){
                console.log('Runscript :',dispatch_response.message);
              }else{
                    var error_response = dispatch_response.message || dispatch_response.response;
                    this.showNotify('negative', error_response);
                    this.showAddLoading = false;
                    console.log('Runscript Failed',dispatch_response);
              }

            if(this.page_function == 'CreateItemmaster')
            {
              this.showNotify("positive", "Created Successfully.");

              // if(mobile)
              // {
              //   this.$router.push({ name: 'IMConfirm', query: { Itemcode: data.response.Itemcode, header: 'IM', type:'create' }})
              // }
              // else
              // {
                console.log('success create data',data);
                this.$router.push({ name: 'EditItemmaster', query: { Itemcode: data.response.Itemcode, step: 1  } })
             // }
            }
            else if(this.page_function == 'EditItemmaster')
            {
              if(mobile)
              {
                this.$router.push({ name: 'IMConfirm', query: { Itemcode: data.response.Itemcode, header: 'IM', type:'update' }})
              }
              else
              {
                this.showNotify("positive", "Updated Successfully.");
                var Itemcode = data.response.Itemcode;

                // var cpayload =
                // {
                //   params: {
                //     Itemcode: this.$route.query.Itemcode
                //   }
                // }

               // var cdata = await this.getPochild(cpayload);
               // var cresults = cdata.data;

                var payload = {
                  itemcode: Itemcode
                }


                var data = await this.getFilterItem(payload);
                var filtered_transmain = data.response;

                filtered_transmain.SellingPrice = this.formatAmount(filtered_transmain.SellingPrice, '$');
                filtered_transmain.cartonprice  = this.formatAmount(filtered_transmain.cartonprice,'$');
                filtered_transmain.AverageCost  = this.formatAmount(filtered_transmain.AverageCost,'$');
                filtered_transmain.LastCost  = this.formatAmount(filtered_transmain.LastCost,'$');
                filtered_transmain.FIFOCost  = this.formatAmount(filtered_transmain.FIFOCost,'$');
                filtered_transmain.RSP_inc_tax  = this.formatAmount(filtered_transmain.RSP_inc_tax,'$');
                filtered_transmain.StdCost  = this.formatAmount(filtered_transmain.StdCost,'$');

                // if(filtered_transmain.stockday_min == 0.0)
                // {
                //   filtered_transmain.stockday_min = '0';
                // }
                // if(filtered_transmain.stockday_max == 0.0)
                // {
                //   filtered_transmain.stockday_max = '0';
                // }
                // if(filtered_transmain.pur_expiry_days == null || filtered_transmain.pur_expiry_days == 0)
                // {
                //   filtered_transmain.pur_expiry_days = '0';
                // }

                this.json = filtered_transmain;
               // this.status = this.json.BillStatus == 1;

                // var filter_outlet = this.location_options.filter((entry)=>{
                //   return entry.value == this.json.loc_group;
                // })

                // this.json.ChildNo = this.formatAmount(cresults.length,'qty');
               //  this.json.Branch = filter_outlet[0].label;
                this.json.step = step;
                this.json.remark = this.json.remark==null ? '' : this.json.remark;
              }
            }

          }
          else
          {
            var error_response = data.response.detail;
            var show_error = "";
           // var description = error_response.replace(/^\[Error Code \d+\]\s*/, '');
          //  console.log('error_response',error_response);
          //   Object.keys(error_response).forEach((loop_index)=>{
          //     if(loop_index !== 'status_code')
          //     {
          //       var temp_error = {};
          //       var error_message = "";
          //       Object.keys(error_response[loop_index]).forEach((header,cindex)=>{
          //           error_message = error_response[loop_index];
          //       });
          //       temp_error = loop_index + " - " + error_message;
          //       show_error += temp_error  +"<br />";
          //     }
          //   });
            //close foreach error message
           // console.log('show_error',show_error);
            this.showNotify('negative', error_response);

            this.showAddLoading = false;
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
      searchItemCode(){
        console.log('search')
        this.selected_row = {};
        this.search.value = '';
        this.search_item = true;
        this.search.type = 'Barcode'
        this.search.options =
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
        ]
      },
      async getAllCategoryOptions(){
              var payload = {
                    language : this.language,
                    skip: 0,
                    limit: 99999999,
                    sort_by: "Description",
                    sort_type: "ASC",
              }
              var category = await this.getCategory(payload)

              var category_results = category.detail

              var category_code = [];
              var category_name = [];

              for(var i in category_results)
              {
                var sample = category_results[i];

                var obj = {
                  label: sample.Code+ ' - ' + sample.Description,
                  value: sample.Code
                }

                var obj1 = {
                  label: sample.Description,
                  value: sample.Code
                }

                category_code.push(obj);
                category_name.push(obj1);
              }

              this.category_options = category_name
      },
      async handleChangeDept(newVal){
       // console.log('newVal',newVal);
        this.action_change_selecting = true
        this.loading_sub_dept = true
        this.json.SubDept = ""
        this.json.Category = ""
        this.$nextTick(async()=>{
        this.json.Dept =  newVal !== null ? this.json.Dept : ''
          if(this.json.Dept == ''){
            this.sub_dept_options = [];
            this.getAllCategoryOptions();
           // this.category_options = []
          }
          else{
            // console.log('json', this.json)
            this.json.Dept = newVal
           // console.log('Dept Change SubDept', this.json.SubDept)
            var Mcode = this.json.Dept
            var payload = {
                language : this.language,
                skip: 0,
                limit: 99999999,
                MCode: Mcode,
                sort_by: "Description",
                sort_type: "ASC",
            }

            var sub_dept = await this.getSubDept(payload);
             // console.log('sub_dept',sub_dept)
            var sub_dept_results =  sub_dept.detail
            this.getAllCategoryOptions()
          //  this.category_options =[]
            var sub_dept_code = [];
            var sub_dept_name = [];
            for(var i in sub_dept_results)
            {
              var sample = sub_dept_results[i];

              var obj = {
                label: sample.Code+ ' - ' + sample.Description,
                value: sample.Code
              }

              var obj1 = {
                label: sample.Description,
                value: sample.Code
              }

              sub_dept_code.push(obj);
              sub_dept_name.push(obj1);
            }
            this.sub_dept_options = sub_dept_name

           }
            this.loading_sub_dept = false;
            this.action_change_selecting = false;
         })

      },
      async handleChangeSubDept(newVal){
        this.json.Category = ''
        this.loading_category = true;
        this.action_change_selecting = true
        this.$nextTick(async()=>{
        this.json.SubDept =  newVal !== null ? this.json.SubDept : ''
        var Mcode = this.json.SubDept
        var dept_code = this.json.Dept
        if(this.json.SubDept == ''){
            console.log('subdept is empty');
            this.category_options = []

          }else{
            var payload = {
              language : this.language,
              skip: 0,
              limit: 99999999,
              MCode: Mcode,
              DeptCode: dept_code,
              sort_by: "Description",
              sort_type: "ASC",
        }

        var category = await this.getCategory(payload)
       // console.log('category',category);
        var category_results = category.detail
        // var category_results = category.filter((entry)=>{
        //   return entry.MCode == Mcode && entry.DeptCode  == dept_code
        // })


        var category_code = [];
        var category_name = [];

    for(var i in category_results)
    {
      var sample = category_results[i];

      var obj = {
        label: sample.Code+ ' - ' + sample.Description,
        value: sample.Code
      }

      var obj1 = {
        label: sample.Description,
        value: sample.Code
      }

      category_code.push(obj);
      category_name.push(obj1);
    }
       this.category_options = category_name
          }

         //  category_options
           this.loading_category = false;
           this.action_change_selecting = false;
        // console.log('Mcode', Mcode)
        // console.log('dept_code', dept_code)
        // console.log('category_results', category_results)
        // console.log('category', category)
      })
      },
    async handleChangeManufacturer(newVal){

      return;
              //console.log('mfr',newVal)
            // this.json.Brand = ''
            // this.loading_brand = true;
              this.$nextTick(async()=>{
              this.json.Manufacturer =  newVal !== null ? this.json.Manufacturer : ''
              var MCode = this.json.Manufacturer

              var payload = {
                skip: 0,
                limit: 99999999,
                MCode: MCode,
                language : 'EN',
                sort_by: "Description",
                sort_type: "ASC",
              }

              var brand = await this.getBrand(payload)
            //  console.log('brand',brand)
              var brand_results = brand.detail
          //     var brand_results = brand.filter((entry)=>{
          //       return entry.MCode == MCode
          //     })


              var brand_code = [];
              var brand_name = [];

          for(var i in brand_results)
          {
            var sample = brand_results[i];
            var obj = {
              label: sample.Code+ ' - ' + sample.Description,
              value: sample.Code,
              MCode: sample.MCode
            }

            var obj1 = {
              label: sample.Description,
              value: sample.Code,
              MCode: sample.MCode
            }

            brand_code.push(obj);
            brand_name.push(obj1);
          }

              this.brand_options= brand_name
              //  category_options
              this.loading_brand = false;

        })
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
      async handleAddBarcode(){
        this.showAddLoading = true;
        var edit_barcode = this.edit_barcode
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

        if(edit_barcode){
            var Itemcode = this.jsonBarcode.Itemcode
            var Barcode = this.jsonBarcode.Barcode
            var NewBarcode = this.jsonBarcode.NewBarcode
            var barRemark = this.jsonBarcode.barRemark
            var user = this.user_name
            var language = this.language

            var payload2 = {
              "Itemcode" : Itemcode,
              "Barcode_old":Barcode,
              "Barcode_new"  : NewBarcode,
              "barRemark": barRemark,
              "user"     : user,
              "language" : language
            }
            var data = {};
        // await this.$store.dispatch('itemmaster/trigger_update_barcode', payload).then(() => {
        //     data = JSON.parse(JSON.stringify(this.$store.getters['itemmaster/get_barcode_status']));
        //   });
        var payload ={
              "pass_json": payload2
            }
        var object_pass = {
              dispatch: 'itemmaster/trigger_update_barcode',
              getter: 'itemmaster/get_barcode_status',
              app: this,
              payload: payload,
         };
         var dispatch_response = await this.$dispatch(object_pass);
         data = dispatch_response
          console.log('dispatch_response',dispatch_response);
          console.log('data',data);


          if(dispatch_response.status)
          {

            var set_query = {
              "itemcode":Itemcode,
              "barcode":NewBarcode,
              "EUser":this.user_name,
              "getuser":this.user_name
            };


            var json_runtime_runscript_multi = {
                params:[
                {
                  "lookupdb_name": this.session_outlet_guid,
                  "trans_group": 'itemmaster',
                  "trans_type": 'itembarcode',
                  "set_query":set_query
                }
              ]
            };

            var payload_runtime_runscript_multi ={
              "pass_json": json_runtime_runscript_multi
            }

            var dispatch_response2 = await this.runscript_multi(payload_runtime_runscript_multi,'1')
            console.log('dispatch_response2',dispatch_response2);

            if(dispatch_response2.status){
              this.showAddLoading = false;
              this.showNotify("positive", "Updated Successfully.");
              this.edit_barcode = false,
              this.jsonBarcode = {};

              this.show_barcode_dialog = false;
              this.table_function(this.ori_params);
              console.log('Runscript :',dispatch_response2.message);
            }else{
                  var error_response = dispatch_response2.message || dispatch_response2.response;
                  this.showNotify('negative', error_response);
                  this.showAddLoading = false;
                  console.log('Runscript Failed',dispatch_response2);
            }

          }
          else
          {


            this.showNotify('negative','Please try again.')

            this.showAddLoading = false;
          }
            // console.log('edit barcode');


        }else{
        var Itemcode = this.json.Itemcode
        var Barcode = this.jsonBarcode.Barcode
        var barRemark = this.jsonBarcode.barRemark
        var user = this.user_name
        var language = this.language

        var payload = {
          "Itemcode" : Itemcode,
          "Barcode"  : Barcode,
          "barRemark": barRemark,
          "user"     : user,
          "language" : language
        }

        var data = {};
        await this.$store.dispatch('itemmaster/trigger_create_barcode', payload).then(() => {
            data = JSON.parse(JSON.stringify(this.$store.getters['itemmaster/get_barcode_status']));
          });

          console.log('data',data);
          var status = data.status

          if(status == "success")
          {
            var set_query = {
                "itemcode":Itemcode,
                "barcode":Barcode,
                "EUser":this.user_name,
                "getuser":this.user_name
              };

            var json_runtime_runscript_multi = {
                params:[
                {
                  "lookupdb_name": this.session_outlet_guid,
                  "trans_group": 'itemmaster',
                  "trans_type": 'itembarcode',
                  "set_query":set_query
                }
              ]
            };

            var payload_runtime_runscript_multi ={
              "pass_json": json_runtime_runscript_multi
            }

            var dispatch_response = await this.runscript_multi(payload_runtime_runscript_multi,'1')
            console.log('dispatch_response',dispatch_response);
            if(dispatch_response.status){
              console.log('Runscript :',dispatch_response.message);
            }else{
              var error_response = dispatch_response.message || dispatch_response.response;
              this.showNotify('negative', error_response);
              this.showAddLoading = false;
              console.log('Runscript Failed',dispatch_response);
            }



            this.showAddLoading = false;
            this.showNotify("positive", "Created Successfully.");
            this.jsonBarcode = {};
            this.show_barcode_dialog = false;
            this.table_function(this.ori_params);
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
    },
    handleChange(newVal){
     // console.log('newVal',newVal);
     // console.log('colour',this.color_options);
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
      async handleChangeStepper()
      {
           this.json.TaxCode = '';
           this.json.tax_code_purchase = '';
           this.json.tax_code_supply = '';
           this.json.UMBulk = '';
           this.json.UM = '';
           this.json.Dept = '';
           this.json.SubDept = '';
           this.json.Category = '';
           this.json.Manufacturer = '';
           this.json.Brand = '';
           this.json.Origin = '';
           this.json.vendor_code = '';
           this.json.Colour = '';
           this.json.Size = '';
           this.json.ItemType = '';
           this.json.price_type = '';

          var itemcode_1 = this.$route.query.Itemcode;

          if(itemcode_1 == undefined || itemcode_1 == '')
          {
            this.$router.push('/ERP/purchase/Itemmaster')
            return;
          }

          var payload = {
            itemcode : itemcode_1
          }

          var data = await this.getFilterItem(payload);
          var filtered_transmain = data.response;
          console.log('filtered_transmain',filtered_transmain);
          this.json.TaxCode = filtered_transmain.TaxCode;
          this.json.tax_code_purchase = filtered_transmain.tax_code_purchase;
          this.json.tax_code_supply = filtered_transmain.tax_code_supply;
          this.json.UMBulk =  filtered_transmain.UMBulk
          this.json.UM            = filtered_transmain.UM;
          this.json.Dept          = filtered_transmain.Dept ;
          this.json.SubDept       = filtered_transmain.SubDept ;
          this.json.Category      = filtered_transmain.Category;
          this.json.Manufacturer  = filtered_transmain.Manufacturer;
          this.json.Brand         = filtered_transmain.Brand;
          this.json.Origin        = filtered_transmain.Origin;
          this.json.vendor_code   = filtered_transmain.vendor_code;
          this.json.Colour        = filtered_transmain.Colour;
          this.json.Size          = filtered_transmain.Size;
          this.json.ItemType      = filtered_transmain.ItemType;
          this.json.price_type    = filtered_transmain.price_type;
          var mobile = this.$q.screen.width < 600
          if(this.json.step  == 3 && mobile){
              this.branch_table_info(this.ori_params);
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
    async handleChangeCategory(newVal){
      //console.log('newVal',newVal);
      this.json.Category = newVal;
      var category = this.json.Category;
      //console.log('category options',this.categoryOptions);
     // console.log('allSubDept',this.all_sub_dept);

      if(newVal){
        var get_dept_subdept = this.all_category.filter((entry) => entry.Code == newVal) // Filter based on your condition
        .map((entry) => { // Map to a new object with only the desired keys
          return {
              Code: entry.Code,
              DeptCode: entry.DeptCode,
              Description: entry.Description,
              MCode: entry.MCode
          };
        });
        // console.log('get_dept_subdept',get_dept_subdept);
        this.json.Dept = get_dept_subdept[0].DeptCode;

      var payloadSubDept = {
            language : this.language,
            skip: 0,
            limit: 99999999,
            MCode:  this.json.Dept
        }
      var sub_dept = await this.getSubDept(payloadSubDept);
      var sub_dept_results =  sub_dept.detail;
      var sub_dept_name = [];
            for(var i in sub_dept_results)
            {
              var sample = sub_dept_results[i];

              var obj = {
                label: sample.Code+ ' - ' + sample.Description,
                value: sample.Code
              }

              var obj1 = {
                label: sample.Description,
                value: sample.Code
              }
              sub_dept_name.push(obj1);
            }
            this.sub_dept_options = sub_dept_name
            this.json.SubDept = get_dept_subdept[0].MCode;
          //  console.log('category options',this.category_options);

            var category = this.all_category.filter((entry) =>  entry.DeptCode ==  this.json.Dept && entry.MCode == this.json.SubDept) // Filter based on your condition
            .map((entry) => { // Map to a new object with only the desired keys
              return {
                  label: entry.Description,
                  value: entry.Code,
              };
            });
              //   console.log('category',category);
                this.category_options = category
                console.log('category',category);

          }else{
             this.action_change_selecting= true;
             console.log('categor',this.all_category);
             var all_category= this.all_category.map((entry)=>{
              return{
                label: entry.Description,
                value: entry.Code
              }
             });
             this.category_options = all_category
             //  console.log('options category',this.category_options);
             //  console.log(' all_category',all_category);
             setTimeout(()=>{
              console.log('is.$refs.selectComponent;',this.$refs.selectComponent.$refs.mySelect);
              this.$refs.selectComponent.$refs.mySelect.hidePopup();
             },1000)
             setTimeout(()=>{
              this.$refs.selectComponent.$refs.mySelect.showPopup();

             },1200)
          }
      return;
      if(newVal){
        var get_dept_subdept = this.all_category.filter((entry) => entry.Code == newVal) // Filter based on your condition
        .map((entry) => { // Map to a new object with only the desired keys
          return {
              Code: entry.Code,
              DeptCode: entry.DeptCode,
              Description: entry.Description,
              MCode: entry.MCode
          };
        });
      this.json.Dept = get_dept_subdept[0].DeptCode;

      var payloadSubDept = {
            language : this.language,
            skip: 0,
            limit: 99999999,
            MCode:  this.json.Dept
        }
      var sub_dept = await this.getSubDept(payloadSubDept);
      var sub_dept_results =  sub_dept.detail;
      var sub_dept_name = [];
            for(var i in sub_dept_results)
            {
              var sample = sub_dept_results[i];

              var obj = {
                label: sample.Code+ ' - ' + sample.Description,
                value: sample.Code
              }

              var obj1 = {
                label: sample.Description,
                value: sample.Code
              }


              sub_dept_name.push(obj1);
            }
            this.sub_dept_options = sub_dept_name
            this.json.SubDept = get_dept_subdept[0].MCode;
       //    console.log('this',this.all_category);
            // var category = this.all_category.filter((entry)=>{
            //     return entry.DeptCode ==  this.json.Dept && entry.MCode == this.json.SubDept

            // })


      var category = this.all_category.filter((entry) =>  entry.DeptCode ==  this.json.Dept && entry.MCode == this.json.SubDept) // Filter based on your condition
            .map((entry) => { // Map to a new object with only the desired keys
              return {
                  label: entry.Description,
                  value: entry.Code,
              };
            });
        //   console.log('category',category);
           this.category_options = category
          // var payloadCategory = {
          //       language : this.language,
          //       skip: 0,
          //       limit: 99999999,
          //       sort_by: "Description",
          //       sort_type: "ASC",
          //       DeptCode: this.json.Dept,
          //       MCode: this.json.SubDept,
          //   }
          //   var category = await this.getCategory(payloadCategory);
          //   var category_results =  category.detail
          //  console.log('category_results',category_results);

      }else{
            console.log('empty');
            console.log('category',this.all_category);
            this.loading_category = true;
            var transformedArray = this.all_category.map((item) => {
              return {
                  label: item.Description,
                  value: item.Code
              };
            });
            setTimeout(()=>{
              this.category_options = transformedArray
              this.loading_category = false;
           console.log('category_options',this.category_options);
            },50)

      }

    },
   async handleChangeBrand(newVal){
      console.log('newVal',newVal);
      // console.log('brand_options',this.brand_options);

      var Manufacturer = this.brand_options.filter((entry)=>{
        return entry.value == newVal;
      });
     console.log('Manufacturer',Manufacturer);
      var code_mft = Manufacturer[0].MCode

      var payloadDept = {
      skip: 0,
      language : 'EN',
      limit:99999999,
      Code: code_mft,
      sort_by: "Code",
      sort_type: "ASC",
    };
   //console.log('manufacturer_results',this.all_manufacturer);
  //  var currentMfrArray =  this.all_manufacturer.filter((entry)=>{
  //   return entry.Code == code_mft ;
  //  })
  // console.log('currentMfr',currentMfrArray);
  // console.log('');

 var manufacturer = await this.getManufacturer(payloadDept);
  var manufacturer_results = manufacturer.detail
  //  var manufacturer_results = currentMfrArray
 // console.log('manufacturer_results',manufacturer_results);

    var mfr_description = [];


    for(var i in manufacturer_results)
    {
      var sample = manufacturer_results[i];

      var obj = {
        label: sample.description,
        value: sample.Code,
      }

      mfr_description.push(obj);
    }


 // console.log('mfr_description',mfr_description);
      this.manufacturer_options = mfr_description;

      this.json.Manufacturer = code_mft
    //console.log('Manufacturer',this.json.Manufacturer);
    },
    async fetchAllData(){
      var Spayload = {
        params: {
          type: 'S',
          skip: 0,
          limit: 99999999,
          language: this.language
        }
      };
      var payload = {
        language : 'EN'
      };
      var ppayload = {
        TRANS_TYPE:'PriceType ',
        language : 'EN'
      };
      var payloadDept = {
        skip: 0,
        language : 'EN',
        limit:99999999,
        sort_by: "Code",
        sort_type: "ASC",
      };

      var payloadVariant = {
        skip: 0,
        language : 'EN',
        limit:99999999,
        sort_by: "Colour",
        sort_type: "",
      };

      var payloadSize = {
        skip: 0,
        language : 'EN',
        limit:99999999,
        sort_by: "Size",
        sort_type: "",
      };
      var payloadTax = {
        skip: 0,
        language : 'EN',
        limit:99999999,
        sort_by: "TaxCode",
        sort_type: "ASC",
      };
      var payloadTaxP = {
        skip: 0,
        language : 'EN',
        limit:99999999,
        sort_by: "description",
        sort_type: "ASC",
        gst_trans_type: "P",
      };
      var payloadTaxS = {
        skip: 0,
        language : 'EN',
        limit:99999999,
        sort_by: "description",
        sort_type: "ASC",
        gst_trans_type: "S",
      };
      var payloadCategory = {
          language : this.language,
          skip: 0,
          limit: 99999999,
          sort_by: "Description",
          sort_type: "ASC",
      }

      var payloadBrand = {
          skip: 0,
          language : 'EN',
          limit:99999999,
          sort_by: "Description",
          sort_type: "ASC",
      }


      const requests = [
        this.getSupcus(Spayload),
        this.getUM(payload),
        this.getDepartment(payloadDept),
        this.getManufacturer(payloadDept),
        this.getOrigin(payload),
        this.getVariant(payloadVariant),
        this.getItemSize(payloadSize),
        this.getItemType(payload),
        this.getPriceType(ppayload),
        this.getTax(payloadTax),
        this.getTaxPurchase(payloadTaxP),
        this.getTaxSupply(payloadTaxS),
        this.getCategory(payloadCategory),
        this.getBrand(payloadBrand)
      ];
      const results = await Promise.all(requests.map(p => p.catch(error => ({ error }))));
      const [
        supcus,
        um,
        dept,
        manufacturer,
        origin_results,
        variant,
        item_size,
        item_type_results,
        price_type_results,
        Tax,
        tax_purchase,
        tax_supply,
        category,
        brand
      ] = results;

      const logAndProcess = (result, label) => {
        if (result && result.error) {
          console.error(`Error fetching ${label}:`, result.error);
          return null; // Return null for errors
        } else {
        //  console.log(result);
          return result;
        }
      };

      const processedResults = {
        supcus: logAndProcess(supcus, 'supcus'),
        um: logAndProcess(um, 'um'),
        dept: logAndProcess(dept, 'dept'),
        manufacturer: logAndProcess(manufacturer, 'manufacturer'),
        origin_results: logAndProcess(origin_results, 'origin_results'),
        variant: logAndProcess(variant, 'variant'),
        item_size: logAndProcess(item_size, 'item_size'),
        item_type_results: logAndProcess(item_type_results, 'item_type_results'),
        price_type_results: logAndProcess(price_type_results, 'price_type_results'),
        Tax: logAndProcess(Tax, 'Tax'),
        tax_purchase: logAndProcess(tax_purchase, 'tax_purchase'),
        tax_supply: logAndProcess(tax_supply, 'tax_supply'),
        category: logAndProcess(category, 'category'),
        brand: logAndProcess(brand, 'brand')
      };


    //  console.log('Processed Results:', processedResults);
      return processedResults;
    },
    handleBranchTableChange: function(newVal)
      {
            var new_params = this.$pluginsTableParams(newVal)

            var payload = {
                params : new_params
            };

            this.branch_ori_params = payload;
            this.branch_table_info(payload);
      },
    async branch_table_info(payload){
      var branch_table_column = [
              {
                  name: 'branch',
                  required: true,
                  label: 'Branch',
                  align: 'left',
                  sortable: true,
                  field: 'branch',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'

              },
              {
                  name: 'price_inc_tax',
                  required: true,
                  label: 'Price Inc Tax',
                  align: 'right',
                  sortable: true,
                  field: 'price_inc_tax',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
              },
              {
                  name: 'sellingprice',
                  required: true,
                  label: 'Price Exc Tax',
                  align: 'right',
                  sortable: true,
                  field: 'sellingprice',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'stdcost',
                  required: true,
                  label: 'Listed Cost',
                  align: 'right',
                  sortable: true,
                  field: 'stdcost',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'averagecost',
                  required: true,
                  label: 'Avg Cost',
                  align: 'right',
                  sortable: true,
                  field: 'averagecost',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'lastcost',
                  required: true,
                  label: 'Last Cost',
                  align: 'right',
                  sortable: true,
                  field: 'lastcost',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'fifocost',
                  required: true,
                  label: 'FIFO Cost',
                  align: 'right',
                  sortable: true,
                  field: 'fifocost',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'LastCostGP',
                  required: true,
                  label: 'Last Cost GP%',
                  align: 'right',
                  sortable: true,
                  field: 'LastCostGP',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'price_today_na',
                  required: true,
                  label: 'Today Price Inc Tax',
                  align: 'right',
                  sortable: true,
                  field: 'price_today_na',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'price_today_mb',
                  required: true,
                  label: 'Today Member Price Inc Tax',
                  align: 'right',
                  sortable: true,
                  field: 'price_today_mb',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'rank_cat_qty',
                  required: true,
                  label: 'Category Ranking',
                  align: 'left',
                  sortable: true,
                  field: 'rank_cat_qty',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'rank_cat_amt',
                  required: true,
                  label: 'Category Ranking ($)',
                  align: 'left',
                  sortable: true,
                  field: 'rank_cat_amt',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'qty_promo',
                  required: true,
                  label: 'Qty Promo',
                  align: 'right',
                  sortable: true,
                  field: 'qty_promo',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'ads_rep',
                  required: true,
                  label: 'Replenis hment ADS',
                  align: 'right',
                  sortable: true,
                  field: 'ads_rep',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'branch_itemtype',
                  required: true,
                  label: 'Item Type',
                  align: 'left',
                  sortable: true,
                  field: 'branch_itemtype',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'day_promo',
                  required: true,
                  label: 'Promo Day',
                  align: 'right',
                  sortable: true,
                  field: 'day_promo',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'qty_hp_out',
                  required: true,
                  label: 'Transform Out',
                  align: 'right',
                  sortable: true,
                  field: 'qty_hp_out',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'qty_ibt_sales',
                  required: true,
                  label: 'IBT Sales',
                  align: 'right',
                  sortable: true,
                  field: 'qty_ibt_sales',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'qty_ibt_grn',
                  required: true,
                  label: 'IBT GRN',
                  align: 'right',
                  sortable: true,
                  field: 'qty_ibt_grn',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'branch',
                  required: true,
                  label: 'Branch',
                  align: 'left',
                  sortable: true,
                  field: 'branch',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'qty_opn',
                  required: true,
                  label: 'Opn',
                  align: 'right',
                  sortable: true,
                  field: 'qty_opn',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'qty_rec',
                  required: true,
                  label: 'Rec',
                  align: 'right',
                  sortable: true,
                  field: 'qty_rec',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'qty_pos',
                  required: true,
                  label: 'POS',
                  align: 'right',
                  sortable: true,
                  field: 'qty_pos',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'qty_si',
                  required: true,
                  label: 'SI',
                  align: 'right',
                  sortable: true,
                  field: 'qty_si',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'qty_other',
                  required: true,
                  label: 'Other',
                  align: 'right',
                  sortable: true,
                  field: 'qty_other',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'qty_tbr',
                  required: true,
                  label: 'Pending Return',
                  align: 'right',
                  sortable: true,
                  field: 'qty_tbr',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'QOH',
                  required: true,
                  label: 'Bal',
                  align: 'right',
                  sortable: true,
                  field: 'QOH',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'doh',
                  required: true,
                  label: 'DOH',
                  align: 'right',
                  sortable: true,
                  field: 'doh',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'qty_so',
                  required: true,
                  label: 'SO Qty',
                  align: 'right',
                  sortable: true,
                  field: 'qty_so',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'qty_avail',
                  required: true,
                  label: 'Qty Avail',
                  align: 'right',
                  sortable: true,
                  field: 'qty_avail',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'ads',
                  required: true,
                  label: 'ADS',
                  align: 'right',
                  sortable: true,
                  field: 'ads',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'aws',
                  required: true,
                  label: 'AWS',
                  align: 'right',
                  sortable: true,
                  field: 'aws',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'ams',
                  required: true,
                  label: 'AMS',
                  align: 'right',
                  sortable: true,
                  field: 'ams',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'qty_po',
                  required: true,
                  label: 'PO Qty',
                  align: 'right',
                  sortable: true,
                  field: 'qty_po',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'qty_req',
                  required: true,
                  label: 'Req Qty',
                  align: 'right',
                  sortable: true,
                  field: 'qty_req',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
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
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'date_stop',
                  required: true,
                  label: 'Date End',
                  align: 'left',
                  sortable: true,
                  field: 'date_stop',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'first_gr_date',
                  required: true,
                  label: '1st GRN Date',
                  align: 'left',
                  sortable: true,
                  field: 'first_gr_date',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'days',
                  required: true,
                  label: 'Days Analysed',
                  align: 'right',
                  sortable: true,
                  field: 'days',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
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
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'last_gr_qty',
                  required: true,
                  label: 'Last GR Qty',
                  align: 'right',
                  sortable: true,
                  field: 'last_gr_qty',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'created_at',
                  required: true,
                  label: 'Created at',
                  align: 'left',
                  sortable: true,
                  field: 'created_at',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'updated_at',
                  required: true,
                  label: 'Updated at',
                  align: 'left',
                  sortable: true,
                  field: 'updated_at',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'recalc_at',
                  required: true,
                  label: 'Recalculate at',
                  align: 'left',
                  sortable: true,
                  field: 'recalc_at',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },

            ]

      this.branch_table_column  = branch_table_column;

      this.$nextTick(async ()=>{
          var payload = {
              "pass_json": {
                itemcode: this.json.Itemcode,
                language: this.language
              }
            };
          var data = {};
          var object_pass = {
                "dispatch": 'itemmaster/trigger_post_itemmaster_itemmaster_branch_stock',
                "getter": 'itemmaster/get_itemmaster_itemmaster_branch_stock',
                "app": this,
                "payload": payload
            };

            var dispatch_response = await this.$dispatch(object_pass);
            console.log('dispatch_response',dispatch_response);
            if(dispatch_response.status)
            {
              //success condition
              data = dispatch_response.response
              var results = data.detail

              for(var i in results){
                 var obj = results[i]
                 obj.price_inc_tax = this.formatAmount(obj.price_inc_tax, '$');
                 obj.sellingprice  = this.formatAmount(obj.sellingprice, '$');
                 obj.stdcost  = this.formatAmount(obj.stdcost, '$');
                 obj.averagecost  = this.formatAmount(obj.averagecost, '$');
                 obj.lastcost  = this.formatAmount(obj.lastcost, '$');
                 obj.fifocost  = this.formatAmount(obj.fifocost, '$');
                 obj.LastCostGP  = Number(obj.LastCostGP).toFixed(1);
                 obj.price_today_na  = this.formatAmount(obj.price_today_na, '$');
                 obj.price_today_mb  = this.formatAmount(obj.price_today_mb, '$');
                }

            }else
            {
              //fail condition
              data = {
                  "data": []
              };
              this.brand_results = []
              this.showNotify('negative', 'Please try again')
            }

            this.branch_table_data = {
              "data": {
                    "count": data.total_row,
                    "next": null,
                    "previous": null,
                    "results": data.detail
                }
            }
            this.branch_results = data.detail;
            console.log('branch results',this.branch_results);
        })
    },
    handleViewBranchDetail(obj){
    // console.log('obj',obj);
       this.show_branch_dialog = true;
       this.branch_details = obj;
    },
    closeBranch(){
      this.show_branch_dialog = false;
      this.branch_details = {};
    },
    addButtonSupplierItem(){
      console.log('add Supplier Item',this.json);
      this.show_supplier_item_dialog = true
      this.jsonChild={
         "block_order":0,
         "none_return":0,
         "OrderLotSize":"1",
         "SupBulkQty":"1",
         "SupStdPrice":"0.00",
         "Disc1Type":"%",
         "Disc1Value":"0.00",
         "Disc2Type":"%",
         "Disc2Value":"0.00",
         "NetUnitPrice":"0.00",
         "cartonprice":this.json.cartonprice,
         "SupLastPrice":"0.00",
         "SupRSPAfterTax": this.json.price_include_tax,
         "SupRSPBeforeTax":this.json.SellingPrice,

      }
    },
    handleEditSupplierItem(payload){
      console.log('edit Supplier Item');
      this.edit_child =true
      this.show_supplier_item_dialog = true
      this.jsonChild = payload;
      this.jsonChild.supplier = payload.Code + "-" + payload.Name
    },
    handleDeleteSupplierItem(payload){
   //   console.log('delete Supplier Item',payload);
      this.delete_json = payload;
      this.delete_child2 = true;

    },
   async handleDeleteSupplierItemLine(){
      this.deleteLoading = true;
      this.showAddLoading2 = true;
       var payload = {
        "pass_json":{
            Itemcode: this.delete_json.Itemcode,
            Code: this.delete_json.Code,
            language: this.language
          }
      }
            var object_pass = {
            "dispatch": 'itemmaster/trigger_delete_itemmastersupcode',
            "getter": 'itemmaster/get_itemmastersupcode_status',
            "app": this,
            "payload": payload
        };

        var dispatch_response = await this.$dispatch(object_pass);
        //  console.log('dispatch_response',dispatch_response);
        if(dispatch_response.status)
        {
                this.delete_child2= false;
                this.showNotify("positive","Delete successfully");
                this.showAddLoading = false;
                this.supplier_item_table_function(this.supplier_item_ori_params);
        } else{

        }
    },
    close_supplier_item_Dialog(){
      this.show_supplier_item_dialog = false;
      this.jsonChild ={};
      this.edit_child =false;
    },
  async handleSupplierItem(newVal){
       this.showAddLoading = true;
       console.log('jsonChild',this.jsonChild);

        if(!this.edit_child){
        var json_payload ={
        user:this.user_name,
        block_order:this.jsonChild.block_order,
        none_return:this.jsonChild.none_return,
        Itemcode:this.json.Itemcode,
        Code:this.jsonChild.supplier,
        Name:this.json.SName,
        ITEM_DESC:this.json.Description,
        TaxCode: this.jsonChild.TaxCode,
        OrderLotSize: this.jsonChild.OrderLotSize,
        SupBulkQty: this.jsonChild.SupBulkQty,
        SupStdPrice: this.jsonChild.SupStdPrice,
        Disc1Type: this.jsonChild.Disc1Type,
        Disc1Value: this.jsonChild.Disc1Value,
        Disc2Type: this.jsonChild.Disc2Type,
        Disc2Value: this.jsonChild.Disc2Value,
        NetUnitPrice: this.jsonChild.NetUnitPrice,
        cartonprice: this.unformatAmount(this.jsonChild.cartonprice),
        SupLastPrice: this.jsonChild.SupLastPrice,
        SupRSPAfterTax: this.jsonChild.SupRSPAfterTax,
      }
      var payload = {
        	"pass_json": json_payload
        };
        var object_pass = {
            "dispatch": 'itemmaster/trigger_create_itemmastersupcode',
            "getter": 'itemmaster/get_itemmastersupcode_status',
            "app": this,
          	"payload": payload
        };

        var dispatch_response = await this.$dispatch(object_pass);

        if(dispatch_response.status)
        {
          var result =dispatch_response.response
          this.showNotify("positive", "Created Successfully.");
          this.showAddLoading = false;

          if(newVal == 'save')
            {
              this.jsonChild = {};
              this.show_supplier_item_dialog = false
              this.supplier_item_table_function(this.supplier_item_ori_params);

            }
            else if(newVal == 'save&add')
            {
              this.jsonChild = {};
              this.show_supplier_item_dialog = false;
              this.$nextTick(async()=>{
                  this.supplier_item_table_function(this.supplier_item_ori_params);
                  this.addButtonSupplierItem();
              })

            }
        }else
        {
          this.showAddLoading = false;
          var dispatch_response = JSON.parse(dispatch_response.response);
          this.showNotify("negative",dispatch_response.detail);
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
      var json_payload ={
        user:this.user_name,
        block_order:this.jsonChild.block_order,
        none_return:this.jsonChild.none_return,
        Itemcode:this.json.Itemcode,
        Code:this.jsonChild.Code,
        TaxCode: this.jsonChild.TaxCode,
        OrderLotSize: this.jsonChild.OrderLotSize,
        SupBulkQty: this.jsonChild.SupBulkQty,
        Disc1Type: this.jsonChild.Disc1Type,
        Disc1Value: this.jsonChild.Disc1Value,
        Disc2Type: this.jsonChild.Disc2Type,
        Disc2Value: this.jsonChild.Disc2Value,
        cartonprice: this.unformatAmount(this.jsonChild.cartonprice),
        SupLastPrice: this.jsonChild.SupLastPrice,
        SupRSPAfterTax: this.jsonChild.SupRSPAfterTax,
      }
      var payload = {
        	"pass_json": json_payload
        };

        var object_pass = {
            "dispatch": 'itemmaster/trigger_update_itemmastersupcode',
            "getter": 'itemmaster/get_itemmastersupcode_status',
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

          if(newVal == 'save')
            {
              this.jsonChild = {};
              this.edit_child =false;
              this.show_supplier_item_dialog = false;
               this.supplier_item_table_function(this.supplier_item_ori_params);
            }
        }else
        {

        }

      }
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
    action_change_selecting(newVal){
      console.log('watch action_change_selecting',newVal);
    }
  },
}
</script>

<style scoped>
.rounded-outline-icon {
  border: 1px solid #8B8D8B; /* Change the color to your desired outline color */
  border-radius: 50%; /* Makes the border rounded */
  padding: 5%; /* Adjust the padding as needed */
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
