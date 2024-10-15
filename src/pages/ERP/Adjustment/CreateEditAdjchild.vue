<template>
  <div class="card_sides">
    <q-card style="max-height: 100%;">
      <q-card-section class="theme_color dialog_header header_top">
          <div class="intermediate"/>
          <div v-if="page_function.endsWith('AdjustmentDetails')" class="text-subtitle1 header_text">Adj Detail<br>
            [ Refno: {{ json.RefNo }} ]
          </div>
          <div v-if="page_function.endsWith('GoodsReceivingDetails')" class="text-subtitle1 header_text">GR Detail<br>
            [ Refno: {{ json.RefNo }} ]</div>

          <div v-if="page_function.endsWith('InterbranchTransferDetails')" class="text-subtitle1 header_text">IBT Detail<br>
          [ Refno: {{ json.RefNo }} ]</div>
      </q-card-section>

      <q-card-section class="upload_container content_body_dialog">
        <q-form ref="save_edit_pochild_form">
          <div class="row upload_separator_first">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <q-stepper
                flat
                header-nav
                v-model="jsonChild.step"
                color="primary"
                animated
              >
                <q-step
                  v-if="page_function.startsWith('Create')"
                  :name="1"
                  :title="page_function.endsWith('AdjustmentDetails') ? 'Adj Detail' : page_function.endsWith('InterbranchTransferDetails') ? 'IBT Detail' : 'GR Detail'"
                  icon="settings"
                  :done="jsonChild.step > 1"
                >

                  <div class="row input_wrapper_right">
                    <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5 col-xl-5">
                      <div class="row dialog_separator">
                        <div class="col-xs-4 col-sm-5 col-md-4 col-lg-4 col-xl-4 q-pr-sm">
                          <Select
                          :readonly="false"
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
                          :readonly="false"
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
                        :table_data="table_data"
                        :table_column="table_column"
                        :action_button="true"
                        :edit_button="false"
                        :view_button="false"
                        :delete_button="false"
                        :flat_status="true"
                        :bordered_status="true"
                        v-on:receiveRequestTable="handleTableChange"
                        style="padding: 0px;"
                        />
                      </div>
                    </div>

                    <div v-if="searchItem" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                      <div class="row dialog_separator" dir="rtl">
                          <Button_icon :readonly="status==1? true : false" :flat="true" :font_color="'white'" :color="'#094161 '" :text="'ENTER'" :outline="false" size="15px" @click="handleModifyItemcode()"/>
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

                  <q-stepper-navigation>
                    <!-- <q-btn @click="jsonChild.step = 2" color="primary" label="Next" /> -->

                    <Button_icon :flat="false" :font_color="'black'" :color="'white'" :text="'NEXT'" :outline="true" size="15px"
                    @click="jsonChild.step = 2"/>
                  </q-stepper-navigation>
                </q-step>

                <q-step
                  :name="2"
                  title="Item Details"
                  icon="create_new_folder"
                  :done="jsonChild.step > 2"
                >

                  <div class="row input_wrapper_right">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                      <div class="row dialog_separator">
                        <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5 col-xl-5" :class="$q.screen.width > 1023 ? 'q-pl-sm': ''">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
                              <div class="row">
                                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                                  <span class="dialog_font">Entry Type</span>
                                </div>
                                <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                                  <Radio size="xs" :disable="false" v-on:receiveChange="handleChangeEntryType" v-model="jsonChild.EntryType" :options="entry_type_options"  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5 col-xl-5" :class="$q.screen.width > 1023 ? 'q-pl-sm': ''">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
                              <div class="row">
                                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                                  <span class="dialog_font">Pricing Type</span>
                                </div>
                                <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                                  <Radio size="xs" :disable="false" v-on:receiveChange="handleChangePriceType" v-model="jsonChild.PriceType" :options="pricing_type_options"  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div v-if="page_function == 'EditAdjustmentDetails'" class="col-xs-6 col-sm-4 col-md-2 col-lg-2 col-xl-2" :class="$q.screen.width > 1023 ? 'q-pl-sm': ''">
                          <div class="row">
                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
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
                            <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9 col-xl-9" style="margin-top: 3px">
                              <span class="dialog_font">Group Cost</span>
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 four_column_left">
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


                        <div v-if="page_function=='EditAdjustmentDetails' || this.page_function == 'EditGoodsReceivingDetails'" class="col-xs-6 col-sm-6 col-md-2 col-lg-2 col-xl-2 four_column_left two_column_left">
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
                                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.number : oridbComponentBehavior.text" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-2 col-lg-2 col-xl-2 four_column_left" :class="page_function == 'CreateAdjustmentDetails' ? 'two_column_left': ''">
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

                        <div class="col-xs-6 col-sm-6 col-md-2 col-lg-2 col-xl-2 four_column_left" :class="page_function.startsWith('Edit') ? 'two_column_left' : ''">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
                              <div class="row">
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                  <Input
                                  v-if="page_function.startsWith('Edit')"
                                  :autofocusclick="true"
                                  :no_label="false"
                                  label="Barcode"
                                  :readonly="false"
                                  v-on:change="handleChange"
                                  v-model="jsonChild.Barcode"
                                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                                  <Select
                                  v-if="page_function.startsWith('Create')"
                                  :readonly="false"
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

                        <div class="col-xs-6 col-sm-6 col-md-2 col-lg-2 col-xl-2" :class="page_function == 'CreateAdjustmentDetails' ? 'two_column_left' : ''">
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
                        <div v-if="page_function=='EditAdjustmentDetails' || this.page_function == 'EditGoodsReceivingDetails'" class="col-xs-6 col-sm-5 col-md-2 col-lg-2 col-xl-2 four_column_left">
                          <div class="row">
                            <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Bulk Qty"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="jsonChild.BulkQty"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.number : oridbComponentBehavior.text" />
                            </div>
                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 q-pl-sm">
                              <span style="font-size: 13px;">x 1</span>
                            </div>
                          </div>
                        </div>

                        <div v-if="this.page_function == 'CreateInterbranchTransferDetails' || this.page_function == 'EditInterbranchTransferDetails'" class="col-xs-6 col-sm-5 col-md-2 col-lg-2 col-xl-2 four_column_left">
                          <div class="row">
                            <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                              <Input
                              :autofocusclick="true"
                              :no_label="true"
                              label="Bulk Qty"
                              :readonly="false"
                              v-on:change="handleChange"
                              v-model="jsonChild.BulkQty"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.number : oridbComponentBehavior.text" />
                            </div>
                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 q-pl-sm">
                              <span style="font-size: 13px;">x 1</span>
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-2 col-md-1 col-lg-1 col-xl-1 four_column_left" :class="$q.screen.width>599 && $q.screen.width<1024 ? 'two_column_left' : page_function=='CreateAdjustmentDetails' ? 'two_column_left' : ''">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Qty"
                              :readonly="false"
                              v-on:change="handleChangeQty"
                              v-model="jsonChild.SetQty"
                              :dbComponentBehavior="dbComponentBehavior ? (status==1? dbComponentBehavior.text_right_readonly : dbComponentBehavior.text_right) : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div v-if="page_function.endsWith('AdjustmentDetails')" class="col-xs-6 col-sm-2 col-md-2 col-lg-2 col-xl-2 four_column_left two_column_left">
                          <div class="row" :class="$q.screen.width<599 && page_function!='CreateAdjustmentDetails' ? 'dialog_separator': ''">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="FOC"
                              :readonly="jsonChild.PriceType=='FOC'"
                              v-on:change="handleChangeQtyfoc"
                              v-model="jsonChild.Qty_foc"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right_readonly : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-3 col-md-2 col-lg-2 col-xl-2 four_column_left" :class="page_function == 'CreateAdjustmentDetails' ? 'two_column_left': ''">
                          <div class="row" :class="$q.screen.width<599 ? 'dialog_separator' : ''">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Unit Price"
                              :readonly="unit ? false : true"
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
                              :readonly="unit ? false : true"
                              v-on:change="handleChangeDiscAmt"
                              v-model="jsonChild.DiscAmt"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <!-- TBC -->
                        <!-- <div class="col-xs-4 col-sm-5 col-md-2 col-lg-2 col-xl-2">
                          <div class="row" :class="$q.screen.width<1024 ? 'dialog_separator': ''">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Discount $"
                              :readonly="status>=1? true : false"
                              v-on:change="handleChangePrice"
                              v-model="jsonChild.price"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right_readonly : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div> -->
                      </div>

                      <div class="row dialog_separator">
                        <div class="col-xs-6 col-sm-3 col-md-3 col-lg-3 col-xl-3 four_column_left two_column_left">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Select
                              dir="rtl"
                              :readonly="unit ? false : true"
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
                              :readonly="unit ? false : true"
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
                              :readonly="unit ? false : true"
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
                              :readonly="status==1? true : (unit ? false : true)"
                              v-on:change="handleChangeDisc2Value"
                              v-model="jsonChild.Disc2Value"
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
                              v-model="jsonChild.NetUnitPrice"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <!-- TBC -->
                        <!-- <div class="col-xs-6 col-sm-4 col-md-2 col-lg-2 col-xl-2 four_column_left" :class="$q.screen.width>599 && $q.screen.width<1024 ? 'two_column_left' : ''">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Gross"
                              :readonly="false"
                              v-on:change="handleChange"
                              v-model="jsonChild.gross"
                              :dbComponentBehavior="dbComponentBehavior ? (status==1? dbComponentBehavior.text_right_readonly : dbComponentBehavior.text_right) : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div> -->

                        <div class="col-xs-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 four_column_left">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Total before Tax"
                              :readonly="unit"
                              v-on:change="handleChangeTotalPrice"
                              v-model="jsonChild.TotalPrice"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <!-- TBC -->
                        <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                          <div class="row" :class="$q.screen.width<1024 ? 'dialog_separator': ''">
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 q-pr-sm">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="GST Type"
                              :readonly="false"
                              v-on:change="handleChange"
                              v-model="jsonChild.gross"
                              :dbComponentBehavior="dbComponentBehavior ? (status==1? dbComponentBehavior.text_right_readonly : dbComponentBehavior.text_right) : oridbComponentBehavior.text" />
                            </div>
                            <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="GST"
                              :readonly="false"
                              v-on:change="handleChange"
                              v-model="jsonChild.gross"
                              :dbComponentBehavior="dbComponentBehavior ? (status==1? dbComponentBehavior.text_right_readonly : dbComponentBehavior.text_right) : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div> -->

                        <!-- TBC -->
                        <!-- <div class="col-xs-6 col-sm-6 col-md-2 col-lg-2 col-xl-2 four_column_left two_column_left">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Total after Tax"
                              :readonly="false"
                              v-on:change="handleChange"
                              v-model="jsonChild.total_after_tax"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.number : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div> -->

                        <div v-if="page_function=='EditAdjustmentDetails' || this.page_function == 'EditGoodsReceivingDetails'" class="col-xs-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 four_column_left two_column_left">
                          <div class="row" :class="$q.screen.width<1024 ? 'dialog_separator': ''">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Rebate Amount"
                              :readonly="true"
                              v-on:change="handleChange"
                              v-model="jsonChild.rebate_value"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div v-if="page_function=='EditAdjustmentDetails' || this.page_function == 'EditGoodsReceivingDetails'" class="col-xs-6 col-sm-6 col-md-3 col-lg-3 col-xl-3">
                          <div class="row" :class="$q.screen.width<1024 ? 'dialog_separator': ''">
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

                          <!-- TBC -->
                          <!-- <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <div class="row" :class="$q.screen.width<1024 ? 'dialog_separator': ''">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <Input
                                :autofocusclick="true"
                                :no_label="false"
                                label="Remarks"
                                :readonly="false"
                                v-on:change="handleChange"
                                v-model="jsonChild.gross"
                                :dbComponentBehavior="dbComponentBehavior ? (status==1? dbComponentBehavior.text_right_readonly : dbComponentBehavior.text_right) : oridbComponentBehavior.text" />
                              </div>
                            </div>
                          </div>
                        </div> -->

                        <!-- TBC -->
                        <!-- <div class="row dialog_separator">
                          <div class="col-xs-6 col-sm-6 col-md-2 col-lg-2 col-xl-2 four_column_left two_column_left">
                            <div class="row">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <Input
                                :autofocusclick="true"
                                :no_label="false"
                                label="Target Weight"
                                :readonly="false"
                                v-on:change="handleChange"
                                v-model="jsonChild.target_weight"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.number : oridbComponentBehavior.text" />
                              </div>
                            </div>
                          </div>
                        </div> -->
                      </div>

                      <div v-if="page_function == 'EditGoodsReceivingDetails'" class="upload_separator">
                        <span class="text-subtitle1">Invoice</span>

                        <div class="row dialog_separator">
                          <div class="col-xs-6 col-sm-2 col-md-1 col-lg-1 col-xl-1 four_column_left two_column_left">
                            <div class="row">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <Input
                                :autofocusclick="true"
                                :no_label="false"
                                label="Qty"
                                :readonly="false"
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
                                :readonly="unit ? false : true"
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
                                :readonly="unit ? false : true"
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
                                :readonly="unit ? false : true"
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
                                :readonly="unit ? false : true"
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
                                :readonly="status==1? true : (unit ? false : true)"
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
                                :readonly="unit"
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

                  <q-stepper-navigation>
                    <Button_icon :flat="true" :font_color="'white'" :color="'#094161'" :text="'SAVE'" :outline="false" size="15px"
                    v-on:receiveClick="handleChild"/>

                    <span class="q-pl-xs">
                      <Button_icon v-if="page_function=='CreateAdjustmentDetails'" :flat="false" :font_color="'black'" :color="'white'" :text="'BACK'" :outline="true" size="15px"
                      @click="jsonChild.step = 1"/>
                    </span>

                    <!-- <q-btn color="primary" label="SAVE" @click="handleChild" />
                    <q-btn v-if="page_function=='CreateAdjustmentDetails'" flat @click="jsonChild.step = 1" color="primary" label="Back" class="q-ml-sm" /> -->

                  </q-stepper-navigation>
                </q-step>

                <!-- <q-step
                  :name="3"
                  title="Item Analysis"
                  icon="add_comment"
                  :done="jsonChild.step > 3"
                >

                  <div class="row input_wrapper_right">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                      <div class="row dialog_separator">
                        <div class="col-xs-6 col-sm-6 col-md-2 col-lg-2 col-xl-2 four_column_left two_column_left">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Curr.QOH"
                              :readonly="false"
                              v-on:change="handleChange"
                              v-model="jsonChild.current_qoh"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.number : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-2 col-lg-2 col-xl-2 four_column_left">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Min Stock Days"
                              :readonly="false"
                              v-on:change="handleChange"
                              v-model="jsonChild.qty"
                              :dbComponentBehavior="dbComponentBehavior ? (status==1? dbComponentBehavior.text_right_readonly : dbComponentBehavior.text_right) : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-2 col-lg-2 col-xl-2 four_column_left two_column_left">
                          <div class="row" :class="$q.screen.width<1024 ? 'dialog_separator': ''">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Max Stock Days"
                              :readonly="false"
                              v-on:change="handleChange"
                              v-model="jsonChild.qty"
                              :dbComponentBehavior="dbComponentBehavior ? (status==1? dbComponentBehavior.text_right_readonly : dbComponentBehavior.text_right) : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-2 col-lg-2 col-xl-2 four_column_left">
                          <div class="row" :class="$q.screen.width<1024 ? 'dialog_separator': ''">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Avg.Sales/Days"
                              :readonly="false"
                              v-on:change="handleChangePrice"
                              v-model="jsonChild.price"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-2 col-lg-2 col-xl-2 four_column_left two_column_left">
                          <div class="row" :class="$q.screen.width<1024 ? 'dialog_separator': ''">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="SO Qty"
                              :readonly="status>=1? true : false"
                              v-on:change="handleChangePrice"
                              v-model="jsonChild.so_qty"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right_readonly : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-2 col-lg-2 col-xl-2 four_column_left">
                          <div class="row" :class="$q.screen.width<1024 ? 'dialog_separator': ''">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="PO Qty"
                              :readonly="false"
                              v-on:change="handleChangePrice"
                              v-model="jsonChild.po_qty"
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
                              label="Price After Tax"
                              :readonly="false"
                              v-on:change="handleChange"
                              v-model="jsonChild.net_price"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.number : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-2 col-lg-2 col-xl-2 four_column_left">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              label="Price Before Tax"
                              :readonly="false"
                              v-on:change="handleChange"
                              v-model="jsonChild.gross"
                              :dbComponentBehavior="dbComponentBehavior ? (status==1? dbComponentBehavior.text_right_readonly : dbComponentBehavior.text_right) : oridbComponentBehavior.text" />
                            </div>
                          </div>
                        </div>

                        <div class="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2 four_column_left two_column_left">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
                              <div class="row">
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                  <div class="row justify-center">
                                    <span class="text-h6">Margin</span>
                                  </div>
                                </div>
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-subtitle1">
                                  <div class="row justify-center">
                                    0.00
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <span class="dialog_font">Margin</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <span class="dialog_font">0.00</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <q-stepper-navigation>
                    <q-btn @click="jsonChild.step = 4" color="primary" label="Next" />
                    <q-btn flat @click="jsonChild.step = 2" color="primary" label="Back" class="q-ml-sm" />
                  </q-stepper-navigation>
                </q-step>

                <q-step
                  :name="4"
                  title="Registered Info"
                  icon="add_comment"
                  :done="jsonChild.step > 4"
                >

                  <div class="row input_wrapper_right">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
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
                        </div>
                      </div>
                    </div>
                  </div>

                  <q-stepper-navigation>
                    <q-btn @click="jsonChild.step = 5" color="primary" label="Next" />
                    <q-btn flat @click="jsonChild.step = 3" color="primary" label="Back" class="q-ml-sm" />
                  </q-stepper-navigation>
                </q-step>

                <q-step
                  :name="5"
                  title="Pending PO"
                  icon="add_comment"
                >

                  <div class="row input_wrapper_right">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
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
                      </div>
                    </div>
                  </div>

                  <q-stepper-navigation>
                    <q-btn color="primary" label="SAVE" @click="handleChild" />

                    <q-btn flat @click="jsonChild.step = 4" color="primary" label="Back" class="q-ml-sm" />
                  </q-stepper-navigation>
                </q-step> -->
              </q-stepper>
            </div>
          </div>
        </q-form>
      </q-card-section>

      <q-card-actions :class="!page_function.startsWith('Edit') ? 'dialog_action_higher' : 'dialog_action'" style="padding-left: 20px;">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" dir="rtl">
            <!-- <Button_icon :readonly="status>=1? true : false" :flat="true" :font_color="'white'" :color="'#094161'" :text="'SAVE'" :outline="false" size="15px"
            v-on:receiveClick="handleChild()"/> -->

            <span class="q-pr-sm">
              <Button_icon :flat="true" :font_color="'black'" :color="'white'" :text="'BACK'" :outline="true" size="15px" class="custom_cancel_button" @click="back()" />
            </span>
          </div>

          <!-- <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" dir="rtl" v-if="!page_function.startsWith('Edit')" >
            <Checkbox
            :checkbox="true"
            :disable="status==1? true : false"
            :no_label="true"
            v-model="addNewAfterSave"
            v-on:receiveChange="handleChange"
            :dbComponentBehavior="dbComponentBehavior.text"
            :true-value="'save&add'"
            :false-value="'save'"
            />
            <span style="padding-right: 5px; font-size:smaller;">
              Add new after save
            </span>
          </div> -->
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
import Radio from 'src/components/ERP/Base/Radio';
import ItemTable from 'src/components/ERP/Purchase/ItemTable'
import PurchaseTable from 'src/components/ERP/Purchase/PurchaseTable'
import Button_icon from 'src/components/ERP/Base/Button_icon'
import SelectFilter from 'src/components/ERP/Base/SelectFilter'
import SelectPlaceholder from 'src/components/ERP/Base/SelectPlaceholder'
import { StreamBarcodeReader } from "vue-barcode-reader";

import { Notify } from "quasar";

export default{
  data() {
    return {
      forceLoading: false,
      retailer_guid: sessionStorage.getItem("retailer_guid") != "" && sessionStorage.getItem("retailer_guid") != "null" && sessionStorage.getItem("retailer_guid") != null ? sessionStorage.getItem("retailer_guid") : [],
      outlet_guid: sessionStorage.getItem("outlet_guid") != "" && sessionStorage.getItem("outlet_guid") != "null" && sessionStorage.getItem("outlet_guid") != null ? sessionStorage.getItem("outlet_guid") : [],
      user_name: sessionStorage.getItem("user_name") != "" && sessionStorage.getItem("user_name") != "null" && sessionStorage.getItem("user_name") != null ? sessionStorage.getItem("user_name") : '',
      language: sessionStorage.getItem("language") != "" && sessionStorage.getItem("language") != "null" && sessionStorage.getItem("language") != null ? sessionStorage.getItem("language") : [],
      transmain_guid: this.$route.query.header_id,
      transchild_guid : this.$route.query.details_id,
      item_options: [],
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
      barcode_options: [],
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
      supplier_options: [],
      table_column: [],
      table_data: [],
      table_column1: [],
      table_data1: [],
      showAddLoading: false,
      jsonChild: {
        step: 1,
        type: 'Itemcode',
        EntryType: "Unit",
        PriceType: "Norm",
        group: 0,
        group_cost: 0,
        TotalPrice: "0.00",
      },
      unit: true,
      searchItem: false,
      search: "",
      selected_row: "",
      ori_params: {},
      status: "",
      by_weight: true,
      disctype_options: [
        {
          label: "%",
          value: "%",
        },
        {
          label: "$",
          value: "$",
        },
      ],
      original_item_guid: "",
      page_function: this.$route.name,
      addNewAfterSave: 'save',
      json_scan: "",
      td_by: "",
      code_scanner: false,
      filter_status: false,
      ori_barcode: "",
      ori_ori_params: {},
      cardtype_guid: "",
      json: {},
    }
  },
  components:{
    Input,
    Select,
    // Datepicker,
    Checkbox,
    Radio,
    ItemTable,
    // PurchaseTable,
    Button_icon,
    // SelectFilter,
    // SelectPlaceholder,
    // StreamBarcodeReader,
  },
  computed: {
    dbComponentBehavior() {
      return this.$store.getters['dbComponentBehavior/byLanguage']('erp')
    },
  },
  async created () {
    this.showAddLoading = true;

    var payload = {
      RefNo: this.$route.query.refno,
      user: this.user_name,
      language: this.language
    }

    var data = await this.getFilterPomain(payload);

    this.json = data.response;

    if(this.page_function == 'EditAdjustmentDetails' || this.page_function == 'EditGoodsReceivingDetails' || this.page_function == 'EditInterbranchTransferDetails')
    {
      var cpayload = {
        params: {
          refno: this.$route.query.refno,
          language: this.language
        }
      }

      var cdata = {};

      if(this.page_function.endsWith('AdjustmentDetails'))
      {
        await this.$store.dispatch('purchase/trigger_get_pochild', cpayload).then(() => {
          cdata = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_pochild']));
        });
      }
      else if(this.page_function.endsWith('GoodsReceivingDetails'))
      {
        await this.$store.dispatch('purchase/trigger_get_grchild', cpayload).then(() => {
          cdata = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_grchild']));
        });
      }
      else if(this.page_function.endsWith('EditInterbranchTransferDetails'))
      {
        await this.$store.dispatch('purchase/trigger_get_ibtchild', cpayload).then(() => {
          cdata = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_ibtchild']));
          console.log('data',data)
        });
      }

      var line = this.$route.query.line;

      var filterPochild = cdata.data.filter((entry)=>{
        return entry.Line == line;
      })

      this.jsonChild = filterPochild[0];
      this.jsonChild.UnitPrice = this.formatAmount(this.jsonChild.UnitPrice,'$');
      this.jsonChild.DiscAmt = this.formatAmount(this.jsonChild.DiscAmt,'$');
      this.jsonChild.Disc1value = this.formatAmount(this.jsonChild.Disc1Value,'$');
      this.jsonChild.Disc2Value = this.formatAmount(this.jsonChild.Disc2Value,'$');
      this.jsonChild.NetUnitPrice = Number(this.jsonChild.NetUnitPrice).toFixed(4);
      this.jsonChild.TotalPrice = this.formatAmount(this.jsonChild.TotalPrice,'$');
      this.jsonChild.PackSize = this.formatAmount(this.jsonChild.PackSize,'$');
      this.jsonChild.BulkQty = this.formatAmount(this.jsonChild.BulkQty,'$');
      this.jsonChild.rebate_value = this.formatAmount(this.jsonChild.rebate_value,'$');
      this.jsonChild.price_future = this.formatAmount(this.jsonChild.price_future,'$');
      this.jsonChild.SetQty = this.formatAmount(this.jsonChild.Qty,'qty');

      this.jsonChild.step = 2;

      if(this.page_function.endsWith('GoodsReceivingDetails'))
      {
        this.jsonChild.Barcode = this.jsonChild.barcode;
        this.jsonChild.Inv_Qty = this.formatAmount(this.jsonChild.Inv_Qty,'qty');
        this.jsonChild.Inv_UnitPrice = this.formatAmount(this.jsonChild.Inv_UnitPrice,'$');
        this.jsonChild.Inv_Disc1Value = this.formatAmount(this.jsonChild.Inv_Disc1Value,'$');
        this.jsonChild.Inv_Disc2Value = this.formatAmount(this.jsonChild.Inv_Disc2Value,'$');
        this.jsonChild.Inv_NetUnitPrice = Number(this.jsonChild.Inv_NetUnitPrice).toFixed(4);
        this.jsonChild.Inv_TotalPrice = this.formatAmount(this.jsonChild.Inv_TotalPrice,'$');
      }
    }

    this.showAddLoading = false;
  },
  methods: {
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
      handleChangeType()
      {
        this.jsonChild.value = '';
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
      async getItem(payload)
      {
        payload.params.retailer_guid = this.retailer_guid;

        return await this.$store.dispatch('purchase/trigger_ml_itemmaster', payload).then(() => {
            var data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_ml_itemmaster']));
            return data;
        });
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
              var NetUnitPrice = (parseFloat(TotalPrice/ parameter)).toFixed(0);
              var calculate_total_price = (parseFloat(NetUnitPrice* parameter)).toFixed(2);
              this.jsonChild.UnitPrice = this.formatAmount(UnitPrice,'$');
              this.jsonChild.NetUnitPrice = this.formatAmount(NetUnitPrice);
              // var round_adj = (parseFloat(TotalPrice - calculate_total_price)).toFixed(2);
              // this.jsonChild.round_adj = this.formatAmount(round_adj);

              if(this.jsonChild.UnitPrice == 'NaN' || this.jsonChild.UnitPrice == 'Infinity')
              {
                this.jsonChild.UnitPrice = '0.00'
              }

              if(this.jsonChild.NetUnitPrice == 'NaN' || this.jsonChild.NetUnitPrice == 'Infinity')
              {
                this.jsonChild.NetUnitPrice = '0.00'
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
      async getFilterPomain(payload)
      {
        if(this.page_function.endsWith('AdjustmentDetails'))
        {
          // payload.RefNo required field
          return await this.$store.dispatch('adjustment/trigger_read_adj_by_refno', payload).then(() => {
            var data = JSON.parse(JSON.stringify(this.$store.getters['adjustment/get_read_adj_by_refno']));
            return data;
          });
        }
        else if(this.page_function.endsWith('GoodsReceivingDetails'))
        {
          // payload.RefNo required field
          return await this.$store.dispatch('purchase/trigger_read_gr_by_refno', payload).then(() => {
            var data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_read_gr_by_refno']));
            return data;
          });
        }  else if(this.page_function.endsWith('InterbranchTransferDetails'))
        {
          // payload.RefNo required field
          return await this.$store.dispatch('purchase/trigger_read_ibt_by_refno', payload).then(() => {
            var data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_read_ibt_by_refno']));
            return data;
          });
        }
      },
      async handleModifyItemcode(){
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

          if(data.status == "success")
          {
            var response = data.response;

            response.Disc1value = this.formatAmount(response.Disc1value,'$');
            response.Disc2Value = this.formatAmount(response.Disc2Value,'$');
            response.UnitPrice = this.formatAmount(response.UnitPrice,'$');
            response.NetUnitPrice = this.formatAmount(response.NetUnitPrice,'$');
            response.TotalPrice = this.formatAmount('0.00','$');
            response.DiscAmt = this.formatAmount('0.00','$');
            response.EntryType = 'Unit';
            response.PriceType = 'Norm';
            response.Qty_foc = "0";

            if(response.barcode.length != 0)
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
              this.jsonChild = response;
              this.jsonChild.Barcode = this.barcode_options[0].value;
            }
            else
            {
              this.barcode_options = [];
              this.jsonChild = response;
              this.jsonChild.Barcode = '';
            }

            this.jsonChild.SetQty = this.jsonChild.SetQty==0 ? '0' : this.jsonChild.SetQty;
            this.jsonChild.step = 2;
            this.searchItem = false;
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
          }
        });

        this.showAddLoading = false;
      },
      async handleRowClick(payload){
        var requests = this.table_data.data.results.map(async(row, index)=>{
          row.selected = false;
        });

        await Promise.all(requests);

        payload.selected = true;

        this.selected_row = payload;
      },
      handleChangeOptions(){
        this.table_function();
      },
      handleTableChange: function(newVal)
      {
            var new_params = this.$pluginsTableParams(newVal)

            var payload = {
                params : new_params
            };

            this.ori_params = payload;
            this.table_function();
      },
      handleTableChange1: function(newVal)
      {
            var new_params = this.$pluginsTableParams(newVal)

            var payload = {
                params : new_params
            };

            this.ori_params1 = payload;
            this.table_function1();
      },
      async table_function(){
          this.forceLoading = true;

          var table_column = [
              {
                  name: 'Itmecode',
                  required: true,
                  label: 'Itemcode',
                  align: 'left',
                  sortable: true,
                  field: 'Itmecode',
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
                  name: 'Sellingprice',
                  required: true,
                  label: 'Selling Price',
                  align: 'right',
                  sortable: true,
                  field: 'Sellingprice',
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

          var type = this.jsonChild.type;
          var value = this.jsonChild.value;
          var user = this.user_name;

          var payload = {
            type: type,
            value: value,
            user: user,
            language: this.language
          }

          var data = {};

          await this.$store.dispatch('purchase/trigger_search_item_for_po', payload).then(() => {
            data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_search_item_for_po']));
          });

          this.table_column = table_column;

          if(data.status == 'success')
          {
            var results = data.response;

            for(var i in results)
            {
              var obj = results[i];
              obj.Sellingprice = this.formatAmount(obj.Sellingprice,'$');
              obj.StdCost = this.formatAmount(obj.StdCost,'$');
              obj.LastCost = this.formatAmount(obj.LastCost,'$');
              obj.selected = false;
            }

            var json2 = {};
            json2.results = data.response;
            var json3 = {};
            json3.data = json2;

            this.table_data = json3;
          }
          else
          {
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
      async table_function1(){
          this.forceLoading = true;

          var table_column = [
              {
                  name: 'po_no',
                  required: true,
                  label: 'PO No',
                  align: 'left',
                  sortable: true,
                  field: 'po_no',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center; width: 1%;',
              },
              {
                  name: 'po_date',
                  required: true,
                  label: 'PO Date',
                  align: 'left',
                  sortable: true,
                  field: 'po_date',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center; width: 2%;',
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
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'order',
                  required: true,
                  label: 'Order',
                  align: 'right',
                  sortable: true,
                  field: 'order',
                  format_child: '',
                  tooltip: '',
                  headerStyle:'text-align: center; width: 1%;',
              },
              {
                  name: 'balance',
                  required: true,
                  label: 'Balance',
                  align: 'right',
                  sortable: true,
                  field: 'balance',
                  format_child: '',
                  tooltip: '',
                  headerStyle:'text-align: center; width: 1%;',
              },
              {
                  name: 'UM',
                  required: true,
                  label: 'UM',
                  align: 'right',
                  sortable: true,
                  field: 'UM',
                  format_child: '',
                  tooltip: '',
                  headerStyle:'text-align: center; width: 1%;',
              },
              {
                  name: 'unit_price',
                  required: true,
                  label: 'Unit Price',
                  align: 'right',
                  sortable: true,
                  field: 'unit_price',
                  format_child: '',
                  tooltip: '',
                  headerStyle:'text-align: center; width: 1%;',
              },
              {
                  name: 'discount',
                  required: true,
                  label: 'Discount',
                  align: 'right',
                  sortable: true,
                  field: 'discount',
                  format_child: '',
                  tooltip: '',
                  headerStyle:'text-align: center; width: 1%;',
              },
              {
                  name: 'net_price',
                  required: true,
                  label: 'Net Price',
                  align: 'right',
                  sortable: true,
                  field: 'net_price',
                  format_child: '',
                  tooltip: '',
                  headerStyle:'text-align: center; width: 1%;',
              },
              {
                  name: 'total',
                  required: true,
                  label: 'Total',
                  align: 'right',
                  sortable: true,
                  field: 'total',
                  format_child: '',
                  tooltip: '',
                  headerStyle:'text-align: center; width: 1%;',
              },
          ];

          this.table_column1 = table_column;

          this.table_data1 = {
              "data": {
                  "count": 0,
                  "next": null,
                  "previous": null,
                  "results": []
              }
          };

          this.forceLoading = false;
      },
      showSearchDialog(){
        if(this.jsonChild.value != null && this.jsonChild.value != '' && this.jsonChild.value != undefined)
        {
          this.searchItem = true;
          this.table_function();
        }
        else
        {
          this.showNotify('negative', 'Please enter search value.')
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
      handleNewForm(){

        if(this.page_function =='CreateAdjustmentDetails')
        {
          this.$router.push({
            name: "CreateAdjustmentDetails",
            query: {header_id: this.transmain_guid  }
          });
        }
        else if(this.page_function =='CreateGoodsReceivingDetails')
        {
          this.$router.push({
            name: "CreateGoodsReceivingDetails",
            query: {header_id: this.transmain_guid  }
          });
        }
        else if(this.page_function =='CreateSalesOrderDetails')
        {
          this.$router.push({
            name: "CreateSalesOrderDetails",
            query: {header_id: this.transmain_guid  }
          });
        }
        else if(this.page_function =='CreateSalesInvoiceDetails')
        {
          this.$router.push({
            name: "CreateSalesInvoiceDetails",
            query: {header_id: this.transmain_guid  }
          });
        }
        else if(this.page_function =='CreateInstalmentDetails')
        {
          this.$router.push({
            name: "CreateInstalmentDetails",
            query: {header_id: this.transmain_guid  }
          });
        }

        this.jsonChild = {
          barcode: "",
          by_weight: 0,
          EntryType: "Unit",
          weight: "0.00",
          weight_gainloss: "0.00",
          SetQty: "0",
          price: '0.00',
          Disc1Type: "%",
          Disc1value: '0.00',
          Disc2Type: "%",
          Disc2Value: "0.00",
          round_adj: "0.00",
          DiscAmt: "0.00",
          total_price: "0.00",
          sst_rate: "0.0",
          ws_cost: "0.00",
          ws_cost_ori: "0.00",
          price_ori: "0.00",
          sn: 0,
          remark: "",
        }

        this.unit = true;
        this.by_weight = true;
        this.addNewAfterSave = 'save';

        this.$nextTick(()=>{
          this.$refs.save_edit_pochild_form.resetValidation()
        });

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
            var validated = await this.validate_form('save_edit_pochild_form');

            if(!validated)
            {
                this.showNotify("negative","Please make sure all field is correct.");
                this.showAddLoading = false;
                return;
            }

            // if(this.by_weight == false)
            // {
            //   if(this.jsonChild.weight <= 0 )
            //   {
            //     this.showAddLoading = false;
            //     this.showNotify("negative", "Weight cannot less than or equal to 0.");
            //     return;
            //   }
            // }

            if(this.jsonChild.SetQty <= 0 ){
              this.showAddLoading = false;
              this.showNotify("negative", "Qty cannot less than or equal to 0.");
              return;
            }

            if(this.page_function.endsWith('AdjustmentDetails'))
            {
              if(this.jsonChild.PriceType =='Norm' && this.jsonChild.UnitPrice <= 0 )
              {
                this.showAddLoading = false;
                this.showNotify("negative", "Price cannot less than or equal to 0.");
                return;
              }
            }
            else
            {
              if(this.jsonChild.UnitPrice <= 0 )
              {
                this.showAddLoading = false;
                this.showNotify("negative", "Price cannot less than or equal to 0.");
                return;
              }
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

            if(this.page_function.endsWith('AdjustmentDetails'))
            {
              if(this.jsonChild.PriceType =='Norm' && this.jsonChild.TotalPrice <= 0 )
              {
                this.showAddLoading = false;
                this.showNotify("negative", "Total Price cannot less than or equal to 0.");
                return;
              }
            }
            else
            {
              if(this.jsonChild.TotalPrice <= 0 )
              {
                this.showAddLoading = false;
                this.showNotify("negative", "Total Price cannot less than or equal to 0.");
                return;
              }
            }

            // if(this.jsonChild.sst_rate < 0 ){
            //   this.showAddLoading = false;
            //   this.showNotify("negative", "SST Rate cannot less than 0.");
            //   return;
            // }

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
        var BulkQty = this.unformatAmount(this.jsonChild.BulkQty);
        var Qty = this.unformatAmount(this.jsonChild.SetQty);
        var UnitPrice = this.unformatAmount(this.jsonChild.UnitPrice);
        var Disc1Type = this.jsonChild.Disc1Type;
        var Disc1value = this.unformatAmount(this.jsonChild.Disc1value);
        var Disc2Type = this.jsonChild.Disc2Type;
        var Disc2Value = this.unformatAmount(this.jsonChild.Disc2Value);
        var NetUnitPrice = this.unformatAmount(this.jsonChild.NetUnitPrice);
        var DiscAmt = this.unformatAmount(this.jsonChild.DiscAmt);
        var TotalPrice = this.unformatAmount(this.jsonChild.TotalPrice);

        if(this.page_function.startsWith('Create'))
        {
          var payload = {
            "RefNo": RefNo,
            "EntryType": EntryType,
            "PriceType": PriceType,
            "Barcode": Barcode,
            "Itemcode": Itemcode,
            "BulkQty" : BulkQty,
            "Qty": Qty,
            "UnitPrice": UnitPrice,
            "Disc1Type": Disc1Type,
            "Disc1Value": Disc1value,
            "Disc2Type": Disc2Type,
            "Disc2Value": Disc2Value,
            "NetUnitPrice": NetUnitPrice,
            "DiscAmt": DiscAmt,
            "TotalPrice": TotalPrice,
            "user": this.user_name,
            "language": this.language
          }

          payload.Qty_foc = this.unformatAmount(this.jsonChild.Qty_foc);

          var data = {};

          if(this.page_function == 'CreateAdjustmentDetails')
          {
            await this.$store.dispatch('/trigger_create_adj', payload).then(() => {
              data = JSON.parse(JSON.stringify(this.$store.getters['adjustment/get_adj_status']));
            });
          } if(this.page_function == 'CreateInterbranchTransferDetails')
          {
            await this.$store.dispatch('purchase/trigger_create_ibtchild', payload).then(() => {
              data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_ibtchild_status']));
            });
          }

          console.log(data)
          var status = data.status

          if(status == "success")
          {
            // this.jsonChild.barcode = "99";//refer bong side whether need pass from client side
            this.showAddLoading = false;
            this.showNotify("positive", "Created Successfully.");

            if(newVal == 'save')
            {
              if(this.page_function == 'CreateAdjustmentDetails')
              {
                this.$router.push({
                    name: "EditAdjustmentDetails",
                    query: {  refno: this.json.RefNo, line: data.response.Line  },
                });
              }
              else if(this.page_function == 'CreateGoodsReceivingDetails')
              {
                this.$router.push({
                    name: "EditGoodsReceiving",
                    query: {  header_id: this.transmain_guid  },
                });
              }
              if(this.page_function == 'CreateInterbranchTransferDetails')
              {
                this.$router.push({
                    name: "EditAdjustmentDetails",
                    query: {  refno: this.json.RefNo, line: data.response.Line  },
                });
              }
            }
            else if(newVal == 'save&add')
            {
              this.handleNewForm();
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
        else if(this.page_function.startsWith('Edit'))
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
            "Disc1Value": Disc1value,
            "Disc2Type": Disc2Type,
            "Disc2Value": Disc2Value,
            "NetUnitPrice": NetUnitPrice,
            "DiscAmt": DiscAmt,
            "TotalPrice": TotalPrice,
            "user": this.user_name
          }

          var data = {};

          if(this.page_function == 'EditAdjustmentDetails')
          {
            payload.Qty_foc = this.unformatAmount(this.jsonChild.Qty_foc);
            payload.Barcode = this.jsonChild.Barcode;
            payload.language = this.language;

            await this.$store.dispatch('adjustment/trigger_update_adjchild', payload).then(() => {
              data = JSON.parse(JSON.stringify(this.$store.getters['adjustment/get_adjchild_status']));
            });
          }
          else if(this.page_function == 'EditGoodsReceivingDetails')
          {
            payload.barcode = this.jsonChild.Barcode;
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
          }else if(this.page_function == 'EditInterbranchTransferDetails'){
              payload.Qty_foc = this.unformatAmount(this.jsonChild.Qty_foc);
              payload.Barcode = this.jsonChild.Barcode;
              payload.language = this.language;

              await this.$store.dispatch('purchase/trigger_update_ibtchild', payload).then(() => {
                data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_ibtchild_status']));
              });
          }

          var status = data.status;
          var response = data.response;

          if(status == "success")
          {
            var Disc1Type = response.Disc1Type;
            var Disc1Value = this.formatAmount(response.Disc1Value,'$')
            var Disc2Type = response.Disc2Type;
            var Disc2Value = this.formatAmount(response.Disc2Value,'$')
            var DiscAmt = this.formatAmount(response.DiscAmt,'$')
            var TotalPrice = this.formatAmount(response.TotalPrice,'$')
            var UnitPrice = this.formatAmount(response.UnitPrice,'$')
            var NetUnitPrice = Number(response.NetUnitPrice).toFixed(4);
            var Qty = this.formatAmount(response.Qty,'qty');


            this.jsonChild.Disc1Type = Disc1Type;
            this.jsonChild.Disc1Value = Disc1Value;
            this.jsonChild.Disc2Type = Disc2Type;
            this.jsonChild.Disc2Value = Disc2Value;
            this.jsonChild.DiscAmt = DiscAmt;
            this.jsonChild.TotalPrice = TotalPrice;
            this.jsonChild.UnitPrice = UnitPrice;
            this.jsonChild.NetUnitPrice = NetUnitPrice;
            this.jsonChild.SetQty = Qty;

            if(this.page_function == 'EditAdjustmentDetails' || this.page_function == 'EditGoodsReceivingDetails' ||  this.page_function == 'EditInterbranchTransferDetails' )
            {
              this.showAddLoading = false;
              this.showNotify("positive", "Updated Successfully.");
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
      back(){
        if(this.page_function.endsWith('AdjustmentDetails'))
        {
          this.$router.push({
              name: "EditAdjustment",
              query: {  refno: this.$route.query.refno  },
          });
        }
        else if(this.page_function.endsWith('GoodsReceivingDetails'))
        {
          this.$router.push({
              name: "EditGoodsReceiving",
              query: {  refno: this.$route.query.refno  },
          });
        }
        else if(this.page_function.endsWith('SalesOrderDetails'))
        {
          this.$router.push({
              name: "EditSalesOrder",
              query: {  header_id: this.transmain_guid  },
          });
        }
        else if(this.page_function.endsWith('SalesInvoiceDetails'))
        {
          this.$router.push({
              name: "EditSalesInvoice",
              query: {  header_id: this.transmain_guid  },
          });
        }
        else if(this.page_function.endsWith('InstalmentDetails'))
        {
          this.$router.push({
              name: "EditInstalment",
              query: {  header_id: this.transmain_guid  },
          });
        }
        else if(this.page_function.endsWith('InterbranchTransferDetails'))
        {
          this.$router.push({
              name: "EditInterbranchTransfer",
              query: {  refno: this.$route.query.refno  },
          });
        }
      },
      async handleChangeItem(item_guid){

        var item_id = item_guid.item_guid == undefined ? item_guid : item_guid.item_guid;

        var payload = {
          params: {
            item_guid: item_id
          }
        }

        var data = await this.getItem(payload);
        var item = data.data.results[0];

        this.jsonChild.disc1type = '%';
        this.jsonChild.Disc1value = "0.00";
        this.jsonChild.Disc2Type = '%';
        this.jsonChild.Disc2Value = "0.00";
        this.jsonChild.DiscAmt = "0.00";
        this.jsonChild.EntryType = "Unit";
        this.jsonChild.net_price = "0.0000";
        this.jsonChild.price = "0.00";
        this.jsonChild.SetQty = "0";
        this.jsonChild.remark = "";
        this.jsonChild.round_adj = "0.00";
        this.jsonChild.sst = "0.00";
        this.jsonChild.sst_rate = "0.0";
        this.jsonChild.total_amt = "0.00";
        this.jsonChild.total_price = "0.00";
        this.jsonChild.weight_gainloss = "0.00";
        this.jsonChild.ws_cost = "0.00";

        this.jsonChild.itemcode = item.itemcode;
        this.jsonChild.description = item.description;
        this.jsonChild.sn = item.sn;
        this.jsonChild.by_weight = item.by_weight;
        this.jsonChild.purity_guid = item.purity_guid.purity_guid;
        this.handleChangeByWeight(item.by_weight);
        this.json_scan = "";

        if(!this.page_function.endsWith('SalesInvoiceDetails') && !this.page_function.endsWith('InstalmentDetails'))
        {
          if(item.sn == 0)
          {
            var payload = {
              params: {
                item_guid: item.item_guid,
              }
            }

            var data = await this.getItembarcode(payload);
            var results = data.data.results[0];

            this.jsonChild.barcode = results.barcode;
          }
        }

        this.filter_status = false

        this.showAddLoading = false;
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
  },
}
</script>

<style scoped>
* >>> tr
{
  cursor: pointer;
}
* >>> .q-stepper__step-inner
{
  padding: 0px;
  padding-left: 5px;
  padding-right: 5px;
}
* >>> .q-radio__label
{
  font-size: 13px;
}

@media screen and (min-width: 1024px) {
  .to_the_right{
    padding-left: 5.6%;
  }
}
.custom_icon
{
    margin-top: -8px;
    cursor: pointer;
    color: grey;
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
    padding-right: 1%;
  }
}
.dialog_action
{
  height: 55px;
  position: sticky;
  padding:0px;
  padding-right: 20px;
  bottom: 0px;
  background-color: white;
}
.dialog_action_higher
{
  height: 80px;
  position: sticky;
  padding:0px;
  padding-top:10px;
  padding-bottom:4px;
  padding-right: 20px;
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
.button_upload_wrapper
{
    margin-top: 1px;
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

.input_wrapper_right
{
  padding-right: 5px;
}

.dialog_font
{
  font-weight: bold;
}

.dialog_separator
{
  padding-top: 5px;
}

.upload_separator_first
{
    border-bottom: 1px solid #DEE1E6;
    margin: 10px;
    padding-top: 0px;
    padding-bottom: 10px;
}

.upload_separator_second
{
    border-bottom: 1px solid #DEE1E6;
    margin: 10px;
    /* padding-top: 10px; */
    padding-bottom: 10px;
}

.upload_separator_third
{
    /* border-bottom: 1px solid #DEE1E6; */
    margin: 10px;
    /* padding-top: 10px; */
    padding-bottom: 10px;
}

.upload_separator
{
    border-top: 1px solid #DEE1E6;
    margin-top: 5px;
    padding-top: 0px;
    padding-bottom: 30px;
}

.upload_separator_dialog
{
    /* border-bottom: 1px solid #DEE1E6; */
    margin: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
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

