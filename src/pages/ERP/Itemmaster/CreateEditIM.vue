<template>
  <div style="font-size: 10px; padding-left: 15px; padding-right: 15px;">
    <div class="text-subtitle1 header_text header_top">
          Product Master
          <span v-if="page_function == 'edit'">
            >&nbsp;{{json.Itemcode}} - {{json.Description}}
          </span>
    </div>
<!-- {{last_enter_field}} -->
      <q-form ref="save_form">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div class="row col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 bg-white">
          <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
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
              title="Product"
              icon="settings"
              :done="done1"
              style="font-size: 10px; padding-left: 15px; padding-right: 15px;"
            >

            </q-step>

            <q-step
              :name="2"
              title="Barcode"
              caption=""
              icon="create_new_folder"
              :done="done2"
            >
            </q-step>

            <q-step
              :name="3"
              title="Supply Source"
              icon="add_comment"
              :done="done3"
            >
            </q-step>

          </q-stepper>
          </div>
          <div class="top_right_button justify-center col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4 " style="text-align: right;"> <!--align-content: end"-->
          <div class="" style="padding-right: 10px;">

            <q-btn-group class="btn_grp2" style="margin-right: 10px;">

              <q-btn-dropdown icon="build" rounded color="primary" split size="9px" no-caps>
                  <template v-slot:dropdown-trigger>
                    <q-btn flat>
                      <q-icon name="build"/>
                      <q-tooltip class="bg-accent">I'm a tooltip</q-tooltip>
                    </q-btn>
                  </template>

                <q-list padding style="" class="btn_qlist">
                  <q-item clickable style="padding: 0px">
                    <q-item-section>
                      <q-btn :disable="page_function != 'edit' " flat no-caps :label="'Duplicate Item Link'" color="primary" @click="handleDuplicateItemLink" class="btn_drp"/>
                    </q-item-section>
                  </q-item>

                </q-list>
              </q-btn-dropdown>

            </q-btn-group>

            <q-btn-group style="margin-right: 10px;" class="btn_grp2 hide_section" >
              <q-btn-dropdown auto-close round color="primary" icon="star" split size="9px" no-caps class="btn_drp"><!--label="Request"-->

                <q-list class="btn_qlist" padding style="">
                  <q-item clickable class="align-items-center" style="padding: 0px">
                    <q-item-section style="text-align: left;">
                      <q-btn flat no-caps :label="'Reassign UOM'" color="primary" :to="{ name: 'Reassign_all' , query: { TransType: 'UOM' } }"  class="btn_drp"/> <!--@click="handleGenerateReassignUOM"-->
                    </q-item-section>
                  </q-item>
                   <q-item class="align-items-center" clickable style="padding: 0px">
                    <q-item-section style="text-align: left;">
                      <q-btn flat no-caps :label="'Reassign Bulk UOM'" color="primary" :to="{ name: 'Reassign_all' , query: { TransType: 'BULK' } }" class="btn_drp"/> <!--:to="{ name: 'ReassignBulkUOM' }"-->
                    </q-item-section>
                  </q-item>
                  <q-separator  />
                  <q-item clickable style="padding: 0px">
                    <q-item-section>
                      <q-btn flat  :label="'Reassign Category'" color="primary" no-caps :to="{ name: 'Reassign_all', query: { TransType: 'Category' } }" class="btn_drp"/> <!--:to="{ name: 'ReassignCategory' }"-->
                    </q-item-section>
                  </q-item>
                   <q-item clickable style="padding: 0px">
                    <q-item-section>
                      <q-btn flat no-caps :label="'Reassign Brand'" color="primary" :to="{ name: 'Reassign_all', query: { TransType: 'Brand' } }" class="btn_drp"/> <!--:to="{ name: 'ReassignBrand' }"-->
                    </q-item-section>
                  </q-item>
                  <q-separator  />
                  <q-item clickable style="padding: 0px">
                    <q-item-section>
                      <q-btn  flat :label="'Reassign Color'" color="primary" no-caps :to="{ name: 'Reassign_all' , query: { TransType: 'Color' } }" class="btn_drp"/> <!--:to="{ name: 'ReassignColor' }"-->
                    </q-item-section>
                  </q-item>
                   <q-item clickable style="padding: 0px">
                    <q-item-section>
                      <q-btn  flat no-caps :label="'Reassign Size'" color="primary" :to="{ name: 'Reassign_all', query: { TransType: 'Size' } }" class="btn_drp"/> <!--:to="{ name: 'ReassignSize' }"-->
                    </q-item-section>
                  </q-item>
                  <q-separator  />
                  <q-item clickable style="padding: 0px">
                    <q-item-section>
                      <q-btn flat :label="'Reassign Item type'" color="primary" no-caps :to="{ name: 'Reassign_all', query: { TransType: 'IType' } }" class="btn_drp"/> <!--:to="{ name: 'ReassignItemType' }"-->
                    </q-item-section>
                  </q-item>
                  <q-separator  />
                  <q-item clickable style="padding: 0px">
                    <q-item-section>
                      <q-btn flat :label="'Reassign Price Type'" color="primary" :to="{ name: 'Reassign_all', query: { TransType: 'PType' } }" no-caps class="btn_drp"/> <!--:to="{ name: 'ReassignPriceType' }"-->
                    </q-item-section>
                  </q-item>

                </q-list>
              </q-btn-dropdown>
            </q-btn-group>

            <q-btn-group style="margin-right: 10px;" class="btn_grp2 hide_section">
              <q-btn-dropdown auto-close rounded color="primary" icon="send_and_archive" split size="9px" no-caps>

                <q-list padding style="" class="btn_qlist">
                  <q-item clickable style="padding: 0px">
                    <q-item-section>
                      <q-btn flat no-caps :label="'Post'" color="primary" @click="handlePostTransmain" class="btn_drp_action"/>
                    </q-item-section>
                  </q-item>
                  <q-separator  />
                  <q-item clickable style="padding: 0px">
                    <q-item-section>
                      <q-btn flat :label="'Unpost'" color="primary" @click="handlePostTransmain" no-caps class="btn_drp_action"/>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </q-btn-group>

              <Button :disable="false" v-on:receiveClick="handleShowCreateItemMaster"
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
              <Button :disable="page_function == 'view' || page_function == 'create'" v-on:receiveClick="handleDelete"
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

              <Button :disable="page_function == 'create' || page_function == 'edit' " v-on:receiveClick="handleEditIM"
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
              
              <Button :disable="page_function == 'view'" v-on:receiveClick="handleCreateIM"
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

              <Button :disable="false" @click="back()"
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
              <Button :disable="disable_previous_button || this.page_function != 'view'" v-on:receiveClick="handlePagination('previous')"
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
              <Button :disable="disable_next_button || this.page_function != 'view'" v-on:receiveClick="handlePagination('next')"
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

          <div class="step-content" style="font-size: 10px; padding-left: 10px; padding-right: 10px;">
            <div class="row" style="align-items: center; width: 100%;">
              <div class="col-xl-10 col-lg-10 col-md-10 col-sm-10 col-xs-10" style="margin-bottom: 10px; padding-right: 10px;padding-top: 10px;">
                <div class="row" style="align-items: center;">

                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-bottom: 10px; padding-right: 2px;">
                    <div class="row" style="align-items: center;">
                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-bottom: 10px;padding-right: 10px;">
                        <div class="row" style="align-items: center;">
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                              <!-- <b>Item Link</b> -->
                              <Label :pass_value="'Item Link'" />
                            </div>
                            <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                              <Input
                              :class="page_function == 'create' ? 'cursor_pointer' : ''"
                              :readonly="page_function == 'view'"
                              :disable="page_function == 'edit'"
                                :autofocusclick="true"
                                v-model:pass_value="json.ItemLink"
                                v-on:receiveChange="handleChange"
                                @click="showSearchDialog"
                                :dbComponentBehavior="dbComponentBehavior.text" />
                            </div>
                          </div>
                      </div>

                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-bottom: 10px;padding-right: 10px;">
                        <div class="row" style="align-items: center;">
                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3">
                              <!-- <b>Barcode</b> -->
                              <Label :pass_value="'Barcode'" />
                            </div>
                            <div class="col-xl-9 col-lg-9 col-md-9 col-sm-9 col-xs-9">
                              <!-- <q-input class="new_input" outlined v-model="pending_wording" :dense="dense" input-class="text-right"/> -->
                              <Input :readonly="page_function == 'view'"
                              :disable="page_function != 'view'"
                                :autofocusclick="true"
                                v-model="json.ItemBarcode"
                                v-on:change="handleChange"
                                :dbComponentBehavior="dbComponentBehavior.text" />
                            </div>
                          </div>
                      </div>
                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-bottom: 10px;padding-right: 10px;">
                        <div class="row" style="align-items: center;">
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                              <!-- <b>Item Code</b> -->
                              <Label :pass_value="'Item Code'" />
                            </div>
                            <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                              <!-- <q-input class="new_input" outlined v-model="json.Itemcode" :dense="dense" /> -->
                              <Input
                                :readonly="page_function == 'view'"
                                :disable="page_function != 'view'"
                                :autofocusclick="true"
                                v-model:pass_value="json.Itemcode"
                                v-on:receiveChange="handleChange"
                                :dbComponentBehavior="dbComponentBehavior.text_left" />
                            </div>
                          </div>
                      </div>

                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-bottom: 10px;padding-right: 10px;">
                        <div class="row" style="align-items: center;">
                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3">
                              <!-- <b>Article No</b> -->
                              <Label :pass_value="'Article No'" />
                            </div>
                            <div class="col-xl-9 col-lg-9 col-md-9 col-sm-9 col-xs-9">
                              <!-- <q-input class="new_input" outlined v-model="json.ArticleNo" :dense="dense" /> -->
                              <Input :readonly="page_function == 'view'"
                                :autofocusclick="true"
                                v-model:pass_value="json.ArticleNo"
                                v-on:receiveChange="handleChange"
                                :dbComponentBehavior="dbComponentBehavior.text" />
                            </div>
                          </div>
                      </div>
                      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-bottom: 10px;padding-right: 10px;">
                    <div class="row" style="align-items: center;">
                        <div style="width: 16.4%;">
                          <!-- <b>Description</b> -->
                          <Label :pass_value="'Description'" />
                        </div>
                        <div style="width: 83.6%;" >
                          <!-- <q-input class="new_input" outlined v-model="pending_wording" :dense="dense" /> -->
                          <Input :readonly="page_function == 'view'"
                            :autofocusclick="true"
                            v-model:pass_value="json.Description"
                            v-on:receiveChange="handleChange"
                            :dbComponentBehavior="dbComponentBehavior.text_desc" />
                        </div>
                      </div>
                      </div>
                      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-bottom: 10px;padding-right: 10px;">
                        <div class="row" style="align-items: center;">
                            <div style="width: 16.4%;">
                              <!-- <b>Description 2</b> -->
                              <Label :pass_value="'Description 2'" />
                            </div>
                            <div style="width: 83.6%;" >
                              <!-- <q-input class="new_input" outlined v-model="json.DesShort" :dense="dense" /> -->
                              <Input :readonly="page_function == 'view'"
                                :autofocusclick="true"
                                v-model:pass_value="json.DesShort"
                                v-on:receiveChange="handleChange"
                                :dbComponentBehavior="dbComponentBehavior.text"/>
                            </div>
                          </div>
                      </div>

                    </div>
                  </div>

                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="margin-bottom: 10px; padding-right: 10px;">
                    <div class="row" style="align-items: center;">
                      <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5" style="padding-bottom: 10px;padding-right: 2px;">
                          <div class="row" style="align-items: center;">
                              <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3">
                                <!-- <b>Pack Size</b> -->
                                <Label :pass_value="'Pack Size'" />
                              </div>
                              <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3">
                                <!-- <q-input class="new_input" outlined v-model="json.PackSize" :dense="dense" style="border-top-right-radius: 0px;" input-class="text-right" /> -->
                                <Input :readonly="page_function == 'view'"
                                  :autofocusclick="true"
                                  v-model:pass_value="json.PackSize"
                                  v-on:receiveChange="handleChangePrice"
                                  :dbComponentBehavior="dbComponentBehavior.text_right" />
                              </div>
                              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-left: 3px;">
                              <!-- <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3" style="padding-left: 3px;"> -->
                                <!-- <q-input class="new_input" outlined v-model="json.UM" :dense="dense" /> -->
                                <!-- <Input :autofocusclick="true" v-model:pass_value="json.UM" v-on:receiveChange="handleChange" :dbComponentBehavior="dbComponentBehavior.text_right"/> -->
                                <Select
                                  :readonly="page_function == 'view'"
                                  v-model:pass_value="json.UM"
                                  v-on:receiveChange="handleChange"
                                  :dbComponentBehavior="dbComponentBehavior.select_required"
                                  label=""
                                  :options="um_options"
                                  :pass_overwrite_display="'value'"
                                  />
                              </div>
                              <!-- <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3" style="padding-left: 3px;">
                                <SelectFilter
                                :readonly="false"
                                :no_label="false"

                                v-model:pass_value="json.UM"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.select"
                                :options="um_options"
                                v-on:receiveChange="handleChange"
                                />
                              </div> -->
                            </div>
                      </div>

                      <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7" style="padding-bottom: 10px;padding-right: 2px; padding-left: 3px;">
                        <div class="row" style="align-items: center;">
                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3">
                              <!-- <b>Stock Type</b> -->
                              <Label :pass_value="'Stock Type'" />
                            </div>
                            <div class="col-xl-9 col-lg-9 col-md-9 col-sm-9 col-xs-9">
                              <div class="row">
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                  <!-- <q-input class="new_input" outlined v-model="pending_wording" :dense="dense" style="border-top-right-radius: 0px;" input-class="text-right" /> -->
                                  <!-- <Input :autofocusclick="true" v-model:pass_value="json.Stock" v-on:receiveChange="handleChange" :dbComponentBehavior="dbComponentBehavior.text" style="border-top-right-radius: 0px;"/> -->
                                  <Select
                                    :readonly="page_function == 'view'"
                                    v-model:pass_value="json.stock_type"
                                    v-on:receiveChange="handleChange"
                                    :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.select_required : oridbComponentBehavior.select"
                                    label=""
                                    :options="stock_options"
                                  />
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-left: 3px;">
                                  <!-- <q-input class="new_input" outlined v-model="pending_wording" :dense="dense" /> -->
                                  <!-- <Input :autofocusclick="true" v-model:pass_value="json.Stock_Type" v-on:receiveChange="handleChange" :dbComponentBehavior="dbComponentBehavior.text"/> -->
                                  <!-- <Select
                                    v-model:pass_value="json.basic_link"
                                    v-on:receiveChange="handleChange"
                                    :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.select"
                                    label=""
                                    :options="stock_type_options"
                                  /> -->
                                  <!--  :disable="isInputDisabled" :disable="json.stock_type !== '1'"-->

                                  <Input
                                    :readonly="page_function == 'view' "
                                    :disable="this.json.stock_type == '1' ? false : true"
                                    :autofocusclick="true"
                                    v-model:pass_value="json.basic_link"
                                    v-on:receiveChange="handleChange"
                                    :dbComponentBehavior="dbComponentBehavior.text" />

                                </div>
                              </div>
                            </div>
                          </div>
                      </div>

                      <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5" style="padding-bottom: 10px;padding-right: 2px;">
                        <div class="row" style="align-items: center;">
                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3">
                              <!-- <b>Case Qty</b> -->
                              <Label :pass_value="'Case Qty'" />
                            </div>
                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3">
                              <!-- <q-input class="new_input" outlined v-model="pending_wording" :dense="dense" /> -->
                             <Input
                                :readonly="page_function == 'view'"
                                :autofocusclick="true"
                                v-model:pass_value="json.BulkQty"
                                v-on:receiveChange="handleChangePrice"
                                :dbComponentBehavior="dbComponentBehavior.text_right" />
                            </div>
                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-left: 3px;">
                            <!-- <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3" style="padding-left: 3px;"> -->
                              <!-- <q-input class="new_input" outlined v-model="pending_wording" :dense="dense" /> -->
                              <!-- <Input :autofocusclick="true" v-model:pass_value="json.Case_qty" v-on:receiveChange="handleChange" :dbComponentBehavior="dbComponentBehavior.text"/> -->
                              <Select
                                  :readonly="page_function == 'view'"
                                  v-model:pass_value="json.UMBulk"
                                  v-on:receiveChange="handleChange"
                                  :dbComponentBehavior="dbComponentBehavior.select_required"
                                  label=""
                                  :options="um_options"
                                  :pass_overwrite_display="'value'"
                                />
                            </div>

                            <!-- <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3" style="padding-left: 3px;">
                              <SelectFilter
                              :readonly="false"
                              :no_label="false"

                              v-model:pass_value="json.UMBulk"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.select"
                              :options="um_options"
                              v-on:receiveChange="handleChange"
                              />
                            </div> -->
                          </div>
                      </div>

                      <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7" style="padding-bottom: 10px;padding-right: 2px; padding-left: 3px;">
                        <div class="row" style="align-items: center;">
                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3">
                              <!-- <b>Inventory</b> -->
                              <Label :pass_value="'Inventory'" class=""/>
                            </div>
                            <div class="col-xl-9 col-lg-9 col-md-9 col-sm-9 col-xs-9">
                              <div class="row">
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                  <!-- <q-input class="new_input" outlined v-model="pending_wording" :dense="dense" style="border-top-right-radius: 0px;" input-class="text-right" /> -->
                                  <!-- <Input :autofocusclick="true" v-model:pass_value="json.Consign" v-on:receiveChange="handleChange" :dbComponentBehavior="dbComponentBehavior.text" style="border-top-right-radius: 0px;"/> -->
                                  <Select
                                    :readonly="page_function == 'view'"
                                    v-model:pass_value="json.Consign"
                                    v-on:receiveChange="handleChange"
                                    :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.select"
                                    label=""
                                    :options="inventory_options"
                                  />
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-left: 3px;">
                                  <!-- <q-input class="new_input" outlined v-model="pending_wording" :dense="dense" /> -->
                                  <!-- <Input :autofocusclick="true" v-model:pass_value="json.Inventory_2" v-on:receiveChange="handleChange" :dbComponentBehavior="dbComponentBehavior.text"/> -->
                                  <Select
                                    :readonly="page_function == 'view'"
                                    :disable="false"
                                    v-model:pass_value="json.inv_type"
                                    v-on:receiveChange="handleChange"
                                    :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.select"
                                    label=""
                                    :options="non_inventory_type_options"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                      </div>

                      <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5" style="padding-bottom: 10px;padding-right: 2px;">
                        <div class="row" style="align-items: center;">
                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3">
                              <!-- <b>Status</b> -->
                              <Label :pass_value="'Status'" />
                            </div>
                            <div class="col-xl-9 col-lg-9 col-md-9 col-sm-9 col-xs-9">
                              <!-- <q-input class="new_input" outlined v-model="pending_wording" :dense="dense" /> -->
                              <!-- <Input :autofocusclick="true" :disable="false" v-model:pass_value="json.new_status" v-on:receiveChange="handleChange" :dbComponentBehavior="dbComponentBehavior.text"/> -->
                              <Select
                                :readonly="page_function == 'view'"
                                v-model:pass_value="json.Disable"
                                v-on:receiveChange="handleChange"
                                :dbComponentBehavior="dbComponentBehavior.text"
                                label=""
                                :options="new_status_options"
                              />
                            </div>
                          </div>
                      </div>
                      <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7" style="padding-bottom: 10px;padding-right: 2px; padding-left: 3px;">
                        <div class="row" style="align-items: center;">
                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3">
                              <!-- <b>Item Type</b> -->
                              <Label :pass_value="'Item Type'"/>
                            </div>
                            <!-- <div class="col-xl-9 col-lg-9 col-md-9 col-sm-9 col-xs-9"> -->
                            <!-- <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3" > -->
                              <!-- <q-input class="new_input" outlined v-model="json.ItemType" :dense="dense" /> -->
                              <!-- <Input :autofocusclick="true" v-model:pass_value="json.ItemType" v-on:receiveChange="handleChange" :dbComponentBehavior="dbComponentBehavior.text"/> -->
                            <!-- </div> -->
                            <div class="col-xl-9 col-lg-9 col-md-9 col-sm-9 col-xs-9">
                              <Select
                                  :readonly="page_function == 'view'"
                                  v-model:pass_value="json.ItemType"
                                   v-on:receiveChange="handleItemTypeChange"
                                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.select_required"
                                  label=""
                                  :options="item_type_options"
                                />
                              <!-- <SelectFilter
                              :readonly="false"
                              :no_label="false"

                              v-model:pass_value="json.ItemType"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.select"
                              :options="item_type_options"
                              v-on:receiveChange="handleChange"
                              :result_message ="'No results'"
                              /> -->
                            </div>
                          </div>
                      </div>

                      <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5" style="padding-bottom: 10px;padding-right: 2px;">
                        <div class="row" style="align-items: center;">
                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3">
                              <!-- <b>Price Type</b> -->
                              <Label :pass_value="'Price Type'"/>
                            </div>
                            <div class="col-xl-9 col-lg-9 col-md-9 col-sm-9 col-xs-9">
                              <!-- <q-input class="new_input" outlined v-model="json.price_type" :dense="dense" /> -->
                              <!-- <Input :autofocusclick="true" v-model:pass_value="json.price_type" v-on:receiveChange="handleChange" :dbComponentBehavior="dbComponentBehavior.text"/> -->
                              <Select
                                  :readonly="page_function == 'view'"
                                  v-model:pass_value="json.price_type"
                                  v-on:receiveChange="handleChange"
                                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.select"
                                  label=""
                                  :options="price_type_options"
                                />
                              <!-- <SelectFilter
                              :readonly="false"
                              :no_label="false"
                              :label="$language('D0163')"
                              v-model:pass_value="json.price_type"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.select"
                              :options="price_type_options"
                              v-on:receiveChange="handleChange"
                              :result_message ="'No results'"
                              /> -->
                            </div>
                          </div>
                      </div>

                      <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7" style="padding-bottom: 10px;padding-right: 2px; padding-left: 3px;">
                        <div class="row" style="align-items: center;">
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                              <!-- <b>Catch Weight</b> -->
                              <Label :pass_value="'Catch Weight'" />
                            </div>

                            <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                              <div class="row">
                                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                  <!-- <q-input class="new_input" outlined v-model="json.Itemcode" :dense="dense" /> -->
                                  <!-- color="green" -->
                                  <q-toggle
                                    style="margin-left: -10%;"
                                    :false-value="0"
                                    :true-value="1"
                                    v-model="SoldByWeight"
                                    :color="SoldByWeight === 1 ? 'green' : ''"
                                    :disable="true"
                                  />

                                </div>

                                <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                  <!-- <q-select class="new_input_select" outlined dense v-model="cost_value" :options="cost_options" /> -->
                                  <Select
                                  :readonly="page_function == 'view'"
                                  v-model:pass_value="json.BarcodeType"
                                  v-on:receiveChange="handleReceiveChangePriceIncTax"
                                  :dbComponentBehavior="dbComponentBehavior.number"
                                  label=""
                                  :options="cost_options"
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

              <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2" style="text-align:center; height: 100%;">

                  <!-- <div><b>Image Details</b></div> -->
                  <div style="padding-top: 10px;">
                  <q-img
                    src="product_1.png"
                    spinner-color="white"
                    style="height: 120px; max-width: 120px;"
                  />
                  </div>
                  <div style="padding-top: 10px;">
                  <!-- <q-btn unelevated square dense push style="background-color: white; color: black; font-size: 10px;" label="upload" @click="refresh" /> -->
                  <q-btn no-caps dense color="white" text-color="black" @click="showUploadPhoto" label="upload photo" style="font-size: 10px; color: black; font-weight: bold;" />
                  </div>
              </div>
            </div>
          </div>
        </div>

        <q-card flat class="card-container" style="max-height: 100%; padding: 10px;border-radius: 0px; padding-top: 0px;padding-left: 0px;">
          <q-card-section class="upload_container" style="font-size: 10px;">

            <q-card-actions class="dialog_action justify-between row" style="padding-left: 10px; padding-right: 0px;">

              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" style="margin-top: 0px;">

                  <div class="row">
                  <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
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
                        @update:model-value="handleTabClick"
                      >
                          <q-tab content-class="custom_tab_font" name="Information" label="Information"></q-tab>
                          <q-tab content-class="custom_tab_font" name="Configuration" :disable="false" label="Configuration"/>
                          <q-tab content-class="custom_tab_font" name="Replenishment" :disable="false" label="Replenishment"/>
                          <!-- <q-tab content-class="custom_tab_font" name="Price & Cost" :disable="false" label="Price & Cost"/> -->
                          <q-tab content-class="custom_tab_font" name="Purchase" :disable="false" label="Purchase"/>
                          <q-tab content-class="custom_tab_font" name="Sales Info" :disable="false" label="Sales Info"/>
                          <q-tab content-class="custom_tab_font" name="Promotion" :disable="false" label="Promotion"/>
                          <q-tab content-class="custom_tab_font" name="Inventory" :disable="false" label="Inventory"/>
                          <q-tab content-class="custom_tab_font" name="Change Log" :disable="false" label="Change Log"/>
                      </q-tabs>
                  </q-toolbar>
                  </div>
                  <div v-if="page_function == 'edit'" class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                        <q-toolbar class="bg-white q-pl-sm custom_toolbar">
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" align="right">
                            <Button v-on:receiveClick="addButtonBarcode"
                            v-if="tab == 'Information' && active_section === 'Barcode'"
                            :pass_label="'Create'"
                            :pass_no_caps="true"
                            :pass_square="true"
                            :pass_dense="true"
                            class="custom_button"
                            />
                            <Button v-on:receiveClick="addButtonMiscellaneous"
                            v-if="tab == 'Information' && active_section === 'Miscellaneous'"
                            :pass_label="'Create'"
                            :pass_no_caps="true"
                            :pass_square="true"
                            :pass_dense="true"
                            class="custom_button"
                            />
                            <Button v-on:receiveClick="handleShowCreateAttribute"
                              v-if="tab == 'Information' && active_section === 'Attribute'"
                              :pass_label="'Create'"
                              :pass_no_caps="true"
                              :pass_square="true"
                              :pass_dense="true"
                              class="custom_button"
                              />
                            <!-- <Button v-on:receiveClick="addButtonAssorted"
                              v-if="tab == 'Information' && active_section === 'Assortment'"
                              :pass_label="'Create'"
                              :pass_no_caps="true"
                              :pass_square="true"
                              :pass_dense="true"
                              class="custom_button"
                              /> -->
                            <Button v-on:receiveClick="addButtonListedBranch"
                              v-if="tab == 'Configuration' && active_section2 === 'Status'"
                              :pass_label="'Create'"
                              :pass_no_caps="true"
                              :pass_square="true"
                              :pass_dense="true"
                              class="custom_button"
                              />
                              <Button v-on:receiveClick="addButtonRestriction"
                              v-if="tab == 'Configuration' && active_section2 === 'Restriction'"
                              :pass_label="'Create'"
                              :pass_no_caps="true"
                              :pass_square="true"
                              :pass_dense="true"
                              class="custom_button"
                              />
                              <Button v-on:receiveClick="addButtonReplenishment"
                              v-if="tab == 'Replenishment' && active_section3 === 'Banner/Site'"
                              :pass_label="'Create'"
                              :pass_no_caps="true"
                              :pass_square="true"
                              :pass_dense="true"
                              class="custom_button"
                              />
                              <Button v-on:receiveClick="handleShowCreateSupplierItem"
                              v-if="tab == 'Purchase' && active_section6 === 'Supplier'"
                              :pass_label="'Create'"
                              :pass_no_caps="true"
                              :pass_square="true"
                              :pass_dense="true"
                              class="custom_button"
                              />
                              <Button v-on:receiveClick="addButtonPriceBreak"
                              v-if="tab == 'Promotion' && active_section5 === 'Price Break'"
                              :pass_label="'Create'"
                              :pass_no_caps="true"
                              :pass_square="true"
                              :pass_dense="true"
                              class="custom_button"
                              />
                              <Button v-on:receiveClick="addButtonPermanentDiscount"
                              v-if="tab == 'Promotion' && active_section5 === 'Permanent Discount'"
                              :pass_label="'Create'"
                              :pass_no_caps="true"
                              :pass_square="true"
                              :pass_dense="true"
                              class="custom_button"
                              />

                          </div>
                        </q-toolbar>
                  </div>
                  </div>
                  <q-separator />
                  <div class="">

                  <q-tab-panels v-model="tab" :animated="false" keep-alive >
                    <q-tab-panel name="Information" style="padding: 0px; padding-top: 10px; color: grey; overflow: hidden">

                      <div class="row">
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom: 10px;">
                          <div class="row ">
                          <div class="col-xl-10 col-lg-10 col-md-10 col-sm-10 col-xs-10">

                          <Button v-on:receiveClick="handleActiveClickSection('Basic')"
                            :pass_label="'Basic Info'"
                            :pass_no_caps="true"
                            :pass_square="true"
                            :pass_dense="true"
                            :class="[active_section == 'Basic' ? 'active_section_button' : 'inactive_section_button']"
                          />
                          <Button v-on:receiveClick="handleActiveClickSection('Additional')"
                            :pass_label="'Additional'"
                            :pass_no_caps="true"
                            :pass_square="true"
                            :pass_dense="true"
                            :class="[active_section == 'Additional' ? 'active_section_button' : 'inactive_section_button']"
                          />
                          <Button v-on:receiveClick="handleActiveClickSection('Barcode')"
                            :pass_label="'Barcode'"
                            :pass_no_caps="true"
                            :pass_square="true"
                            :pass_dense="true"
                            :class="[active_section == 'Barcode' ? 'active_section_button' : 'inactive_section_button']"
                          />
                          <Button v-on:receiveClick="handleActiveClickSection('Attribute')"
                            :pass_label="'Attribute'"
                            :pass_no_caps="true"
                            :pass_square="true"
                            :pass_dense="true"
                            :class="[active_section == 'Attribute' ? 'active_section_button' : 'inactive_section_button']"
                          />
                          <Button v-on:receiveClick="handleActiveClickSection('Miscellaneous')"
                            :pass_label="'Miscellaneous'"
                            :pass_no_caps="true"
                            :pass_square="true"
                            :pass_dense="true"
                            :class="[active_section == 'Miscellaneous' ? 'active_section_button' : 'inactive_section_button']"
                          />
                          <Button v-on:receiveClick="handleActiveClickSection('Parent & Child')"
                            :pass_label="'Parent & Child'"
                            :pass_no_caps="true"
                            :pass_square="true"
                            :pass_dense="true"
                            :class="[active_section == 'Parent & Child' ? 'active_section_button' : 'inactive_section_button']"
                          />
                          <Button v-on:receiveClick="handleActiveClickSection('Assortment')"
                            :pass_label="'Assortment'"
                            :pass_no_caps="true"
                            :pass_square="true"
                            :pass_dense="true"
                            :class="[active_section == 'Assortment' ? 'active_section_button' : 'inactive_section_button']"
                          />
                          </div>

                          <!-- <Button v-on:receiveClick="handleActiveClickSection('Assortment')"
                            :pass_label="'Assortment'"
                            :pass_no_caps="true"
                            :pass_square="true"
                            :pass_dense="true"
                            :class="[active_section == 'Assortment' ? 'active_section_button' : 'inactive_section_button']"
                          /> -->

                          <!-- <div v-if="active_section === 'Barcode'" class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2" align="right">

                          <Button_icon :disabled="readonly_button" :flat="true" :icon="'add'" v-on:receiveClick="addButtonBarcode()" :font_color="'white'" :color="'#069857'" :text="$language('D0024')" :outline="false" size="12px" class="justify-end button_add_1" />
                          </div> -->
                          <!-- <div v-if="active_section === 'Miscellaneous'" class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2" align="right">

                          <Button_icon :disabled="readonly_button" :flat="true" v-on:receiveClick="addButtonMiscellaneous" :font_color="'white'" :color="'#069857'" :text="'Create'" :outline="false" size="12px" class="justify-end button_add_1" />
                          </div>
                          <div v-if="active_section === 'Assortment'" class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2" align="right">

                          <Button_icon  :disabled="readonly_button" :flat="true" v-on:receiveClick="addButtonAssorted" :font_color="'white'" :color="'#069857'" :text="'Create'" :outline="false" size="12px" class="justify-end button_add_1" />
                          </div> -->
                          </div>
                          </div>
                      </div>

                      <div :class="['row', active_section != 'Basic' && 'hide_section']">
                        <div class="row col-12">
                        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                          <div class="row">
                          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4" style="margin-bottom: 10px; padding-right: 10px;">
                            <div class="row" style="align-items: center;">

                              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <!-- <b>Price Inc Tax</b>
                                <q-input class="new_input" outlined v-model="json.price_include_tax" :dense="dense" input-class="text-right"/> -->

                                <LabelInputVerticalGeneral
                                :readonly="page_function == 'view'"
                                :autofocusclick="true"
                                  v-model:pass_value="json.price_include_tax"
                                  :pass_label_value="'Price Inc Tax'"
                                  v-on:receiveChange="handleChangePrice"
                                  :dbComponentBehavior="dbComponentBehavior.text_right"
                                  label="test"
                                />
                                <!-- <LabelSelectVerticalGeneral
                                v-model:pass_value="json.price_include_tax"
                                :pass_label_value="'Price Inc Tax'"
                                v-on:receiveChange="handleReceiveChangePriceIncTax"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.number : oridbComponentBehavior.select"
                                label=""
                                :options="cost_options"
                              /> -->

                              </div>

                              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <!-- <b>Price Exc Tax</b>
                                <q-input class="new_input" outlined v-model="pending_wording" :dense="dense" input-class="text-right"/> -->
                                <LabelInputVerticalGeneral
                                :readonly="page_function == 'view'"
                                :autofocusclick="true"
                                  v-model:pass_value="json.SellingPrice"
                                  :pass_label_value="'Price Exc Tax'"
                                  v-on:receiveChange="handleChangePrice"
                                  :dbComponentBehavior="dbComponentBehavior.text_right"
                                  label="test"
                                />

                              </div>

                              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <!-- <b>Recommend Price</b>
                                <q-input class="new_input" outlined v-model="json.SellingPrice" :dense="dense" input-class="text-right"/> -->
                                <LabelInputVerticalGeneral
                                :readonly="page_function == 'view'"
                                :autofocusclick="true"
                                  v-model:pass_value="json.RSP_inc_tax"
                                  :pass_label_value="'Recommend Price'"
                                  v-on:receiveChange="handleChangePrice"
                                  :dbComponentBehavior="dbComponentBehavior.text_right"
                                  label="test"
                                />

                              </div>

                              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <!-- <b>Minimum Price</b>
                                <q-input class="new_input" outlined v-model="pending_wording" :dense="dense" input-class="text-right"/> -->

                                <LabelInputVerticalGeneral
                                :readonly="page_function == 'view'"
                                :autofocusclick="true"
                                  v-model:pass_value="json.MinPrice"
                                  :pass_label_value="'Minimum Price'"
                                  v-on:receiveChange="handleChangePrice"
                                  :dbComponentBehavior="dbComponentBehavior.text_right"
                                  label="test"
                                />
                              </div>

                            </div>
                          </div>

                          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4" style="margin-bottom: 10px; padding-right: 10px;">
                            <div class="row" style="align-items: center;">

                              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <!-- <b>Listed Cost</b>
                                <q-input class="new_input" outlined v-model="ajsonhild.SupStdPrice" :dense="dense" input-class="text-right"/> -->

                                <LabelInputVerticalGeneral
                                :readonly="page_function == 'view'"
                                :autofocusclick="true"
                                  v-model:pass_value="json.StdCost"
                                  :pass_label_value="'Listed Cost'"
                                  v-on:receiveChange="handleChangePrice"
                                  :dbComponentBehavior="dbComponentBehavior.text_right"
                                  label="test"
                                />
                              </div>

                              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <!-- <b>Moving Avg Cost</b>
                                <q-input class="new_input" outlined v-model="json.AverageCost" :dense="dense" input-class="text-right"/> -->

                                <LabelInputVerticalGeneral
                                :readonly="page_function == 'view'"
                                :autofocusclick="true"
                                  v-model:pass_value="json.AverageCost"
                                  :pass_label_value="'Moving Avg Cost'"
                                  v-on:receiveChange="handleChangePrice"
                                  :dbComponentBehavior="dbComponentBehavior.text_right"
                                  label="test"
                                />
                              </div>


                              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <!-- <b>Last GR Cost</b>
                                <q-input class="new_input" outlined v-model="pending_wording" :dense="dense" input-class="text-right"/> -->

                                <LabelInputVerticalGeneral
                                :readonly="page_function == 'view'"
                                :autofocusclick="true"
                                  v-model:pass_value="json.LastCost"
                                  :pass_label_value="'Last GR Cost'"
                                  v-on:receiveChange="handleChangePrice"
                                  :dbComponentBehavior="dbComponentBehavior.text_right"
                                  label="test"
                                />
                              </div>



                              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <!-- <b>FIFO Cost</b>
                                <q-input class="new_input" outlined v-model="json.FIFOCost" :dense="dense" input-class="text-right"/> -->
                                <LabelInputVerticalGeneral
                                :readonly="page_function == 'view'"
                                :autofocusclick="true"
                                  v-model:pass_value="json.FIFOCost"
                                  :pass_label_value="'FIFO Cost'"
                                  v-on:receiveChange="handleChangePrice"
                                  :dbComponentBehavior="dbComponentBehavior.text_right"
                                  label="test"
                                />
                              </div>
                            </div>
                          </div>

                          <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2" style="margin-bottom: 10px; padding-right: 10px;">
                            <div class="row" style="align-items: center;">



                              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-left: 3px;">
                                <!-- <b>GP %</b>
                                <q-input class="new_input" outlined v-model="pending_wording" :dense="dense" input-class="text-right"/> -->

                                <LabelInputVerticalGeneral
                                :readonly="page_function == 'view'"
                                :autofocusclick="true"
                                  v-model:pass_value="json.ListCostGP"
                                  :pass_label_value="'GP %'"
                                  v-on:receiveChange="handleChangePrice"
                                  :dbComponentBehavior="dbComponentBehavior.text_right"
                                  label="test"
                                />
                              </div>



                              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-left: 3px;">
                                <!-- <b>GP %</b>
                                <q-input class="new_input" outlined v-model="pending_wording" :dense="dense" input-class="text-right"/> -->

                                <LabelInputVerticalGeneral
                                :readonly="page_function == 'view'"
                                :autofocusclick="true"
                                  v-model:pass_value="json.MovingAvgCostGP"
                                  :pass_label_value="'GP %'"
                                  v-on:receiveChange="handleChangePrice"
                                  :dbComponentBehavior="dbComponentBehavior.text_right"
                                  label="test"
                                />
                              </div>


                              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-left: 3px;">
                                <!-- <b>GP %</b>
                                <q-input class="new_input" outlined v-model="pending_wording" :dense="dense" input-class="text-right"/> -->

                                <LabelInputVerticalGeneral
                                :readonly="page_function == 'view'"
                                :autofocusclick="true"
                                  v-model:pass_value="json.LastGRCostGP"
                                  :pass_label_value="'GP %'"
                                  v-on:receiveChange="handleChangePrice"
                                  :dbComponentBehavior="dbComponentBehavior.text_right"
                                  label="test"
                                />
                              </div>


                              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-left: 3px;">
                                <!-- <b>GP %</b>
                                <q-input class="new_input" outlined v-model="pending_wording" :dense="dense" input-class="text-right"/> -->

                                <LabelInputVerticalGeneral
                                :readonly="page_function == 'view'"
                                :autofocusclick="true"
                                  v-model:pass_value="json.FifoCostGP"
                                  :pass_label_value="'GP %'"
                                  v-on:receiveChange="handleChangePrice"
                                  :dbComponentBehavior="dbComponentBehavior.text_right"
                                  label="test"
                                />
                              </div>

                            </div>
                          </div>

                          <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2" style="margin-bottom: 10px; padding-right: 10px;">
                            <div class="row" style="align-items: center;">

                              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <!-- <b>Target GP %</b>
                                <q-input class="new_input" outlined v-model="pending_wording" :dense="dense"/> -->
                                <LabelInputVerticalGeneral
                                :readonly="page_function == 'view'"
                                :autofocusclick="true"
                                  v-model:pass_value="json.margin"
                                  :pass_label_value="'Target GP %'"
                                  v-on:receiveChange="handleChangePrice"
                                  :dbComponentBehavior="dbComponentBehavior.text_right"
                                  label="test"
                                />
                              </div>

                              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <!-- <b>GST Purchase</b>
                                <q-input class="new_input" outlined v-model="json.tax_code_purchase" :dense="dense"/> -->
                                <!-- <LabelInputVerticalGeneral
                                :readonly="page_function == 'view'"
                                :autofocusclick="true"
                                  v-model:pass_value="json.tax_code_purchase"
                                  :pass_label_value="'GST Input'"
                                  v-on:receiveChange="handleChange"
                                  :dbComponentBehavior="dbComponentBehavior.text"
                                  label="test"
                                /> -->
                                <LabelSelectVerticalGeneral
                                :readonly="page_function == 'view'"
                                v-model:pass_value="json.tax_code_purchase"
                                :pass_label_value="'GST Input'"
                                v-on:receiveChange="handleChange"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.select"
                                label=""
                                :options="tax_purchase_options"

                                />
                              </div>

                              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <!-- <b>GST Supply</b>
                                <q-input class="new_input" outlined v-model="json.tax_code_supply" :dense="dense"/> -->
                                <!-- <LabelInputVerticalGeneral
                                :readonly="page_function == 'view'"
                                :autofocusclick="true"
                                  v-model:pass_value="json.tax_code_supply"
                                  :pass_label_value="'GST Output'"
                                  v-on:receiveChange="handleChange"
                                  :dbComponentBehavior="dbComponentBehavior.text"
                                  label="test"
                                /> -->
                                <LabelSelectVerticalGeneral
                                :readonly="page_function == 'view'"
                                v-model:pass_value="json.tax_code_supply"
                                :pass_label_value="'GST Output'"
                                v-on:receiveChange="handleChange"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.select"
                                label=""
                                :options="tax_supply_options"

                                />
                              </div>

                              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <!-- <b>SST Tax Code</b>
                                <q-input class="new_input" outlined v-model="pending_wording" :dense="dense"/> -->
                                <!-- <LabelInputVerticalGeneral
                                :readonly="page_function == 'view'"
                                :autofocusclick="true"
                                  v-model:pass_value="json.TaxCode"
                                  :pass_label_value="'SST Code'"
                                  v-on:receiveChange="handleChange"
                                  :dbComponentBehavior="dbComponentBehavior.text"
                                  label="test"
                                /> -->
                                <LabelSelectVerticalGeneral
                                :readonly="page_function == 'view'"
                                v-model:pass_value="json.TaxCode"
                                :pass_label_value="'SST Code'"
                                v-on:receiveChange="handleChange"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.select"
                                label=""
                                :options="tax_options"

                                />
                              </div>

                            </div>
                          </div>
                          </div>

                        </div>
                        <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                          <div class="row">
<!-- division -->
                        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4" style="margin-bottom: 10px; padding-right: 10px;">
                          <div class="row" style="align-items: center;">
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              <!-- <b>Division</b>
                              <q-input class="new_input" outlined v-model="pending_wording" :dense="dense" /> -->
                              <!-- <LabelInputVerticalGeneral
                              :autofocusclick="true"
                                v-model:pass_value="json.Division"
                                :pass_label_value="'Division'"
                                v-on:receiveChange="handleChangeDivision"
                                :dbComponentBehavior="dbComponentBehavior.text"
                                label="test"
                              /> -->
                              <!-- :readonly="page_function == 'view'" -->
                              <LabelSelectVerticalGeneral                
                              :readonly="page_function == 'view'"
                              v-model:pass_value="json.Division"
                              :pass_label_value="'Division'"
                              v-on:receiveChange="handleChangeDivision"
                              :dbComponentBehavior="action_change_selecting ? dbComponentBehavior.select : dbComponentBehavior.text"
                              label=""
                              :options="division_options"
                            />
                            </div>

                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              <!-- <b>Department</b>
                              <q-input class="new_input" outlined v-model="json.Dept" :dense="dense" /> -->
                              <!-- <LabelInputVerticalGeneral
                              :autofocusclick="true"
                                v-model:pass_value="json.Dept"
                                :pass_label_value="'Department'"
                                v-on:receiveChange="handleChange"
                                :dbComponentBehavior="dbComponentBehavior.text"
                                label="test"
                              /> -->
                              <LabelSelectVerticalGeneral
                              :readonly="page_function == 'view'"
                              v-model:pass_value="json.Dept"
                              :pass_label_value="'Department'"
                              v-on:receiveChange="handleChangeDept"
                              :dbComponentBehavior="action_change_selecting ? dbComponentBehavior.select_required : dbComponentBehavior.text_required"
                              label=""
                              :options="dept_options"
                            />
                              <!-- <b>Department</b> -->
                              <!-- <SelectFilter
                              :readonly="false"
                              :no_label="false"

                              v-model:pass_value="json.Dept"
                              :dbComponentBehavior="action_change_selecting ? dbComponentBehavior.select : dbComponentBehavior.text_required"
                              :options="dept_options"
                              v-on:receiveChange="handleChangeDept"
                              /> -->
                            </div>

                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              <!-- <b>Sub-Department</b>
                              <q-input class="new_input" outlined v-model="json.SubDept" :dense="dense" /> -->
                              <!-- SubDeparment -->
                              <!-- <LabelInputVerticalGeneral
                              :autofocusclick="true"
                                v-model:pass_value="json.SubDept"
                                :pass_label_value="'Sub-Department'"
                                v-on:receiveChange="handleChange"
                                :dbComponentBehavior="dbComponentBehavior.text"
                                label="test"
                              /> -->
                              <LabelSelectVerticalGeneral
                              :readonly="page_function == 'view'"
                              v-model:pass_value="json.SubDept"
                              :pass_label_value="'Sub-Department'"
                              v-on:receiveChange="handleChangeSubDept"
                              :dbComponentBehavior="action_change_selecting ? dbComponentBehavior.select_required : dbComponentBehavior.text_required"
                              label=""
                              :options="sub_dept_options"
                              :result_message = "json.Dept == '' ? 'Please Select Department First': 'No results'"
                            />
                              <!-- <b>Sub-Department</b> -->
                              <!-- <SelectFilter
                                  :readonly="false"
                                  :no_label="false"

                                  v-model:pass_value="json.SubDept"
                                  :dbComponentBehavior="action_change_selecting ? dbComponentBehavior.select : dbComponentBehavior.text_required"
                                  :options="sub_dept_options"
                                  v-on:receiveChange="handleChangeSubDept"
                                  :text_italic = "true"
                                  :result_message = "json.Dept == '' ? 'Please Select Department First': 'No results'"
                                  /> -->
                            </div>

                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              <!-- <b>Category</b>
                              <q-input class="new_input" outlined v-model="json.Category" :dense="dense" /> -->
                              <!-- <LabelInputVerticalGeneral
                              :autofocusclick="true"
                                v-model:pass_value="json.Category"
                                :pass_label_value="'Category'"
                                v-on:receiveChange="handleChange"
                                :dbComponentBehavior="dbComponentBehavior.text"
                                label="test"
                              /> -->
                              <LabelSelectVerticalGeneral
                              :readonly="page_function == 'view'"
                              v-model:pass_value="json.Category"
                              :pass_label_value="'Category'"
                              v-on:receiveChange="handleChangeCategory"
                              :dbComponentBehavior="action_change_selecting ? dbComponentBehavior.select_required : dbComponentBehavior.text_required"
                              label=""
                              :options="category_options"
                              :result_message = "json.Dept == '' ||  json.SubDept == ''  ? 'Please select Department and Sub-Department First':'No results'"
                            />
                              <!-- <b>Category</b> -->
                              <!-- <SelectFilter
                                      ref="selectComponent"
                                      :readonly="false"
                                      :no_label="false"

                                      v-model:pass_value="json.Category"
                                      :dbComponentBehavior="action_change_selecting ? dbComponentBehavior.select : dbComponentBehavior.text_required"
                                      :options="category_options"
                                      v-on:receiveChange="handleChangeCategory"
                                      :text_italic = "true"
                                      :result_message = "json.Dept == '' ||  json.SubDept == ''  ? 'Please select Department and Sub-Department First':'No results'"
                                    /> -->
                            </div>
                          </div>
                        </div>

                        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4" style="margin-bottom: 10px; padding-right: 10px;">
                          <div class="row" style="align-items: center;">
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">

                              <LabelSelectVerticalGeneral
                              :readonly="page_function == 'view'"
                                v-model:pass_value="json.Manufacturer"
                                :pass_label_value="'Manufacturer'"
                                v-on:receiveChange="handleChangeManufacturer"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.select_required"
                                label=""
                                :options="manufacturer_options"
                              />
                            </div>

                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              <!-- <b>Brand</b>
                              <q-input class="new_input" outlined v-model="json.Brand" :dense="dense" /> -->
                              <!-- <LabelInputVerticalGeneral
                              :autofocusclick="true"
                                v-model:pass_value="json.Brand"
                                :pass_label_value="'Brand'"
                                v-on:receiveChange="handleChange"
                                :dbComponentBehavior="dbComponentBehavior.text"
                                label="test"
                              /> -->
                              <LabelSelectVerticalGeneral
                              :readonly="page_function == 'view'"
                              v-model:pass_value="json.Brand"
                              :pass_label_value="'Brand'"
                              v-on:receiveChange="handleChangeBrand"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.select_required"
                              label=""
                              :options="brand_options"

                            />
                              <!-- <b>Brand</b> -->
                              <!-- <SelectFilter
                                      :readonly="false"
                                      :no_label="false"

                                      v-model:pass_value="json.Brand"
                                      :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.select"
                                      :options="brand_options"
                                      v-on:receiveChange="handleChangeBrand"
                                      :text_italic = "true"
                                      :result_message = "json.Manufacturer == '' ? 'Please select Manufacturer First':'No results'"
                                      /> -->
                            </div>

                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              <!-- <b>Supplier</b>
                              <q-input class="new_input" outlined v-model="json.vendor_code" :dense="dense" /> -->
                              <!-- <LabelInputVerticalGeneral
                              :autofocusclick="true"
                                v-model:pass_value="json.vendor_code"
                                :pass_label_value="'Supplier'"
                                v-on:receiveChange="handleChangeVCode"
                                :dbComponentBehavior="dbComponentBehavior.text"
                                label="test"
                              /> -->
                              <LabelSelectVerticalGeneral
                              :readonly="page_function == 'view'"
                              v-model:pass_value="json.vendor_code"
                              :pass_label_value="'Supplier'"
                              v-on:receiveChange="handleChangeSCode"
                              :dbComponentBehavior="dbComponentBehavior.text_required"
                              label=""
                              :options="supplier_dropdown_options"

                            />
                              <!-- <SelectFilter
                              :readonly="page_function=='EditItemmaster' ? true: false"
                              :no_label="false"

                              v-model:pass_value="json.vendor_code"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.select"
                              :options="supplier_options"
                              v-on:receiveChange="handleChangeVCode"
                              /> -->
                            </div>

                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              <!-- <b>Principle</b>
                              <q-input class="new_input" outlined v-model="json.vendor_code" :dense="dense" /> -->
                              <LabelInputVerticalGeneral
                              :readonly="page_function == 'view'"
                              :disable="page_function != 'view'"
                                :autofocusclick="true"
                                v-model:pass_value="json.Principle"
                                :pass_label_value="'Principle'"
                                v-on:receiveChange="handleChange"
                                :dbComponentBehavior="dbComponentBehavior.text"
                                label="test"
                              />
                            </div>
                          </div>
                        </div>

                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2" style="margin-bottom: 10px; padding-right: 10px;">
                          <div class="row" style="align-items: center;">

                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              <!-- <b>Country Of Origin</b>
                              <q-input class="new_input" outlined v-model="pending_wording" :dense="dense" /> -->
                              <!-- <LabelInputVerticalGeneral
                              :autofocusclick="true"
                                v-model:pass_value="json.Origin"
                                :pass_label_value="'Country Of Origin'"
                                v-on:receiveChange="handleChange"
                                :dbComponentBehavior="dbComponentBehavior.text"
                                label="test"
                              /> -->
                              <LabelSelectVerticalGeneral
                              :readonly="page_function == 'view'"
                              v-model:pass_value="json.Origin"
                              :pass_label_value="'Country Of Origin'"
                              v-on:receiveChange="handleChange"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.select : oridbComponentBehavior.select"
                              label=""
                              :options="origin_options"

                            />
                              <!-- <b>Country Of Origin</b> -->
                              <!-- <SelectFilter
                              :readonly="false"
                              :no_label="false"

                              v-model:pass_value="json.Origin"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.select : oridbComponentBehavior.select"
                              :options="origin_options"
                              v-on:receiveChange="handleChange"
                              /> -->
                            </div>

                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              <!-- <b>Colour</b>
                              <q-input class="new_input" outlined v-model="pending_wording" :dense="dense" /> -->
                              <!-- <LabelInputVerticalGeneral
                              :autofocusclick="true"
                                v-model:pass_value="json.colour"
                                :pass_label_value="'Colour'"
                                v-on:receiveChange="handleChange"
                                :dbComponentBehavior="dbComponentBehavior.text"
                                label="test"
                              /> -->
                              <LabelSelectVerticalGeneral
                              :readonly="page_function == 'view'"
                              v-model:pass_value="json.Colour"
                              :pass_label_value="'Colour'"
                              v-on:receiveChange="handleChange"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.select"
                              label=""
                              :options="color_options"

                            />
                              <!-- :label="'Variant'" -->
                              <!-- <SelectFilter
                                :readonly="false"
                                :no_label="false"

                                v-model:pass_value="json.Colour"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.select"
                                :options="color_options"
                                v-on:receiveChange="handleChange"
                                :result_message = "'No results'"
                                /> -->
                            </div>

                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              <!-- <b>Size</b>
                              <q-input class="new_input" outlined v-model="pending_wording" :dense="dense" /> -->
                              <!-- <LabelInputVerticalGeneral
                              :autofocusclick="true"
                                v-model:pass_value="json.size"
                                :pass_label_value="'Size'"
                                v-on:receiveChange="handleChange"
                                :dbComponentBehavior="dbComponentBehavior.text"
                                label="test"
                              /> -->
                              <LabelSelectVerticalGeneral
                              :readonly="page_function == 'view'"
                              v-model:pass_value="json.Size"
                              :pass_label_value="'Size'"
                              v-on:receiveChange="handleChange"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.select"
                              label=""
                              :options="size_options"

                            />
                              <!-- <SelectFilter
                              :readonly="false"
                              :no_label="false"

                              v-model:pass_value="json.Size"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.select"
                              :options="size_options"
                              v-on:receiveChange="handleChange"
                              :result_message ="'No results'"
                              /> -->
                            </div>

                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              <!-- <b>Purchase Group</b>
                              <q-input class="new_input" outlined v-model="pending_wording" :dense="dense" /> -->
                              <!-- <LabelInputVerticalGeneral
                              :autofocusclick="true"
                                v-model:pass_value="json.po_group"
                                :pass_label_value="'Purchase Group'"
                                v-on:receiveChange="handleChange"
                                :dbComponentBehavior="dbComponentBehavior.text"
                                label="test"
                              /> -->
                              <LabelSelectVerticalGeneral
                              :readonly="page_function == 'view'"
                              v-model:pass_value="json.im_pur_group"
                              :pass_label_value="'Purchase Group'"
                              v-on:receiveChange="handleChange"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.select"
                              label=""
                              :options="poGroup_options"
                            />
                            </div>
                          </div>
                        </div>

                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2" style="margin-bottom: 10px;">
                          <div class="row" style="align-items: center;">

                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              <!-- <b>Created On</b>
                              <q-input class="new_input" outlined v-model="json.IssueStamp" :dense="dense" /> -->
                              <LabelInputVerticalGeneral
                                :autofocusclick="true"
                                v-model:pass_value="json.IssueStamp"
                                :pass_label_value="'Created On'"
                                v-on:receiveChange="handleChange"
                                :dbComponentBehavior="dbComponentBehavior.text"
                                label="test"
                                :readonly="page_function == 'view'"
                                :disable="page_function != 'view'"
                              />
                            </div>

                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              <!-- <b>Created By</b>
                              <q-input class="new_input" outlined v-model="pending_wording" :dense="dense" /> -->
                              <LabelInputVerticalGeneral
                                :autofocusclick="true"
                                v-model:pass_value="json.im_created_by"
                                :pass_label_value="'Created By'"
                                v-on:receiveChange="handleChange"
                                :dbComponentBehavior="dbComponentBehavior.text"
                                label="test"
                                :readonly="page_function == 'view'"
                                :disable="page_function != 'view'"
                              />
                            </div>

                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              <!-- <b>Updated On</b>
                              <q-input class="new_input" outlined v-model="json.LastStamp" :dense="dense" /> -->
                              <LabelInputVerticalGeneral
                                :autofocusclick="true"
                                v-model:pass_value="json.LastStamp"
                                :pass_label_value="'Updated On'"
                                v-on:receiveChange="handleChange"
                                :dbComponentBehavior="dbComponentBehavior.text"
                                label="test"
                                :readonly="page_function == 'view'"
                                :disable="page_function != 'view'"
                              />
                            </div>

                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              <!-- <b>Updated By</b>
                              <q-input class="new_input" outlined v-model="pending_wording" :dense="dense" /> -->
                              <LabelInputVerticalGeneral
                                :autofocusclick="true"
                                v-model:pass_value="json.im_updated_by"
                                :pass_label_value="'Updated By'"
                                v-on:receiveChange="handleChange"
                                :dbComponentBehavior="dbComponentBehavior.text"
                                label="test"
                                :readonly="page_function == 'view'"
                                :disable="page_function != 'view'"
                              />
                            </div>

                          </div>
                        </div>
                        </div>
                        </div>
                        </div>

                      </div>
                      <div :class="['row', active_section != 'Attribute' && 'hide_section']">

                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom: 10px; padding-right: 10px;">


                          <Table
                          :row_per_page="[5,10,20,50]"
                          :title="table_title27"
                          :table_data="table_data27"
                          :table_column="table_column27"
                          :flat_status="true"
                          :bordered_status="true"
                          v-on:receiveRequestTable="handleTableChange27"

                          :allow_add="false"
                          :allow_edit="true"
                          :allow_delete="true"
                          v-on:receiveHandleAdd="handleReceiveHandleAdd27"
                          v-on:receiveHandleEditDetails="handleReceiveHandleEditAttribute"
                          v-on:receiveHandleDelete="handleReceiveHandleDelete27"

                          :filter_mode_on="filter_mode_on"
                          v-on:receiveColumnRearrange="handleColumnRearrange27"
                          v-on:filter_column="handleFilterColumn27"
                          :forceLoading="forceLoading"
                          :column_reordering="false"
                          :row_reordering="false"
                          v-on:receiveHandleClearFilter="handleClearFilter27"

                          :pass_visible_columns="visibleColumns27"
                          />

                        </div>
                      </div>
                      <div :class="['row', active_section != 'Miscellaneous' && 'hide_section']">

                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom: 10px; padding-right: 10px;">


                          <Table
                          :row_per_page="[5,10,20,50]"
                          :title="table_title1"
                          :table_data="table_data2"
                          :table_column="table_column2"
                          :flat_status="true"
                          :bordered_status="true"
                          v-on:receiveRequestTable="handleTableChange2"

                          :allow_add="false"
                          :allow_edit="true"
                          :allow_delete="true"
                          v-on:receiveHandleAdd="handleReceiveHandleAdd2"
                          v-on:receiveHandleEditDetails="handleReceiveHandleEdit2"
                          v-on:receiveHandleDelete="handleReceiveHandleDelete2"

                          :filter_mode_on="filter_mode_on"
                          v-on:receiveColumnRearrange="handleColumnRearrange2"
                          v-on:filter_column="handleFilterColumn2"
                          :forceLoading="forceLoading"
                          :column_reordering="false"
                          :row_reordering="false"
                          v-on:receiveHandleClearFilter="handleClearFilter2"

                          :pass_visible_columns="visibleColumns2"
                          />

                        </div>
                      </div>

                      <div :class="['row', active_section != 'Additional' && 'hide_section']">

                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2" style="margin-bottom: 10px; padding-right: 10px;">
                          <div class="row" style="align-items: center;">

                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              <div class="row">
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                  <div>
                                    <b>Open Item</b>
                                  </div>
                                  <div>
                                    <q-toggle
                                      dense
                                      style="padding-top: 7px; padding-bottom: 7px;"
                                      :false-value="0"
                                      :true-value="1"
                                      color="green"
                                      v-model="json.OpenItem"
                                    />
                                  </div>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                  <div>
                                    <b>Zero Price</b>
                                  </div>
                                  <div>
                                    <q-toggle
                                      dense
                                      style="padding-top: 7px; padding-bottom: 7px;"
                                      :false-value="0"
                                      :true-value="1"
                                      color="green"
                                      v-model="json.zero_price"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              <div class="row">
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                  <div>
                                    <b>BOM Item</b>
                                  </div>
                                  <div>
                                    <q-toggle
                                      dense
                                      style="padding-top: 7px; padding-bottom: 7px;"
                                      :false-value="0"
                                      :true-value="1"
                                      color="green"
                                      v-model="json.BOM"
                                    />
                                  </div>
                                </div>

                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                  <div>
                                    <b>Item Package</b>
                                  </div>
                                  <div>
                                    <q-toggle
                                      dense
                                      style="padding-top: 7px; padding-bottom: 7px;"
                                      :false-value="0"
                                      :true-value="1"
                                      color="green"
                                      v-model="json.item_package"
                                    />
                                  </div>
                                </div>

                              </div>
                            </div>

                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              <div class="row">
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                  <div>
                                    <b>Non Inventory</b>
                                  </div>
                                  <div>
                                    <q-toggle
                                      dense
                                      style="padding-top: 7px; padding-bottom: 7px;"
                                      :false-value="0"
                                      :true-value="1"
                                      color="green"
                                      v-model="json.non_inventory"
                                    />
                                  </div>
                                </div>

                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                  <div>
                                    <b>Non Promotion</b>
                                  </div>
                                  <div>
                                    <q-toggle
                                      dense
                                      style="padding-top: 7px; padding-bottom: 7px;"
                                      :false-value="0"
                                      :true-value="1"
                                      color="green"
                                      v-model="json.BestBuy"
                                    />
                                  </div>
                                </div>

                              </div>
                            </div>

                          </div>
                        </div>


                        <div class="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-xs-1" style="margin-bottom: 10px; padding-right: 10px;">
                          <div class="row" style="align-items: center;">

                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              <!-- <b>Shelf Life (Days)</b>
                              <q-input class="new_input" outlined v-model="pending_wording" :dense="dense" /> -->
                              <LabelInputVerticalGeneral
                              :readonly="page_function == 'view'"
                              :autofocusclick="true"
                                v-model:pass_value="json.usedate"
                                :pass_label_value="'Shelf Life (Days)'"
                                v-on:receiveChange="handleChangePrice"
                                :dbComponentBehavior="dbComponentBehavior.text_right"
                                label="test"
                              />
                            </div>

                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              <!-- <b>Yield Ratio</b>
                              <q-input class="new_input" outlined v-model="json.YieldRatio" :dense="dense" input-class="text-right"/> -->
                              <LabelInputVerticalGeneral
                              :readonly="page_function == 'view'"
                              :autofocusclick="true"
                                v-model:pass_value="json.YieldRatio"
                                :pass_label_value="'Yield Ratio'"
                                v-on:receiveChange="handleChangePrice"
                                :dbComponentBehavior="dbComponentBehavior.text_right"
                                label="test"
                              />
                            </div>

                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              <!-- <b>Weight-Trace Qty</b>
                              <q-input class="new_input" outlined v-model="json.unit_weight" :dense="dense" input-class="text-right"/> -->
                              <LabelInputVerticalGeneral
                              :readonly="page_function == 'view'"
                              :autofocusclick="true"
                                v-model:pass_value="json.WeightTraceQtyUOM"
                                :pass_label_value="'Weight-Trace Qty'"
                                v-on:receiveChange="handleChangePrice"
                                :dbComponentBehavior="dbComponentBehavior.text_right"
                                label="test"
                              />
                            </div>

                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              <!-- <b>Weight Tolerence</b>
                              <q-input class="new_input" outlined v-model="json.unit_weight" :dense="dense" input-class="text-right"/> -->
                              <LabelInputVerticalGeneral
                              :readonly="page_function == 'view'"
                              :autofocusclick="true"
                                v-model:pass_value="json.WeightTraceQty"
                                :pass_label_value="'Weight Tolerence'"
                                v-on:receiveChange="handleChangePrice"
                                :dbComponentBehavior="dbComponentBehavior.text_right"
                                label="test"
                              />
                            </div>

                          </div>
                        </div>

                        <div class="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-xs-1" style="margin-bottom: 10px; padding-right: 10px;">
                          <div class="row" style="align-items: center;">

                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              <!-- <b>Volume (M3)</b>
                              <q-input class="new_input" outlined v-model="json.unit_volume" :dense="dense" input-class="text-right"/> -->
                              <LabelInputVerticalGeneral
                              :readonly="page_function == 'view'"
                              :autofocusclick="true"
                                v-model:pass_value="json.unit_volume"
                                :pass_label_value="'Volume (M3)'"
                                v-on:receiveChange="handleChangePrice"
                                :dbComponentBehavior="dbComponentBehavior.text_right"
                                label="test"
                              />
                            </div>

                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              <!-- <b>Length</b>
                              <q-input class="new_input" outlined v-model="json.unit_length" :dense="dense" input-class="text-right"/> -->
                              <LabelInputVerticalGeneral
                              :readonly="page_function == 'view'"
                              :autofocusclick="true"
                                v-model:pass_value="json.unit_length"
                                :pass_label_value="'Length'"
                                v-on:receiveChange="handleChangePrice"
                                :dbComponentBehavior="dbComponentBehavior.text_right"
                                label="test"
                              />
                            </div>

                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              <!-- <b>Width</b>
                              <q-input class="new_input" outlined v-model="json.unit_width" :dense="dense" input-class="text-right"/> -->
                              <LabelInputVerticalGeneral
                              :readonly="page_function == 'view'"
                              :autofocusclick="true"
                                v-model:pass_value="json.unit_width"
                                :pass_label_value="'Width'"
                                v-on:receiveChange="handleChangePrice"
                                :dbComponentBehavior="dbComponentBehavior.text_right"
                                label="test"
                              />
                            </div>

                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              <!-- <b>Height</b>
                              <q-input class="new_input" outlined v-model="json.unit_height" :dense="dense" input-class="text-right"/> -->
                              <LabelInputVerticalGeneral
                              :readonly="page_function == 'view'"
                              :autofocusclick="true"
                                v-model:pass_value="json.unit_height"
                                :pass_label_value="'Height'"
                                v-on:receiveChange="handleChangePrice"
                                :dbComponentBehavior="dbComponentBehavior.text_right"
                                label="test"
                              />
                            </div>

                          </div>
                        </div>

                        <div class="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-xs-1" style="margin-bottom: 10px; padding-right: 10px;">
                          <div class="row" style="align-items: center;">


                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              <!-- <b>Weight</b>
                              <q-input class="new_input" outlined v-model="json.unit_weight" :dense="dense" input-class="text-right"/> -->
                              <LabelInputVerticalGeneral
                              :readonly="page_function == 'view'"
                              :autofocusclick="true"
                                v-model:pass_value="json.unit_weight"
                                :pass_label_value="'Weight'"
                                v-on:receiveChange="handleChangePrice"
                                :dbComponentBehavior="dbComponentBehavior.text_right"
                                label="test"
                              />
                            </div>

                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              <!-- <b>Option</b>
                              <q-input class="new_input" outlined v-model="pending_wording" :dense="dense" /> -->
                              <!-- <LabelInputVerticalGeneral
                              :autofocusclick="true"
                                v-model:pass_value="json.option"
                                :pass_label_value="'Option'"
                                v-on:receiveChange="handleChangePrice"
                                :dbComponentBehavior="dbComponentBehavior.text"
                                label="test"
                              /> -->

                              <LabelSelectVerticalGeneral
                              :readonly="page_function == 'view'"
                                v-model:pass_value="json.trace_sn"
                                :pass_label_value="'Option'"
                                v-on:receiveChange="handleChangePrice"
                                :dbComponentBehavior="dbComponentBehavior.select"
                                label=""
                                :options="trace_sn_options"
                              />
                            </div>

                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              <!-- <b>Member Point</b>
                              <q-input class="new_input" outlined v-model="json.mempoint_base_on_qty" :dense="dense" input-class="text-right"/> -->
                              <LabelInputVerticalGeneral
                              :readonly="page_function == 'view'"
                              :autofocusclick="true"
                                v-model:pass_value="json.Point"
                                :pass_label_value="'Member Point'"
                                v-on:receiveChange="handleChangePrice"
                                :dbComponentBehavior="dbComponentBehavior.text_right"
                                label="test"
                              />
                            </div>

                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              <!-- <b>Point Multiplier</b>
                              <q-input class="new_input" outlined v-model="json.Itemcode" :dense="dense" input-class="text-right"/> -->

                              <LabelSelectVerticalGeneral
                              :readonly="page_function == 'view'"
                                v-model:pass_value="json.mempoint_base_on_qty"
                                :pass_label_value="'Point Multiplier'"
                                v-on:receiveChange="handleChangePrice"
                                :dbComponentBehavior="dbComponentBehavior.select"
                                label=""
                                :options="mempoint_base_on_qty_options"
                              />
                            </div>

                            <!-- <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              <b>GST Supply</b>
                              <q-input class="new_input" outlined v-model="json.Itemcode" :dense="dense" />
                            </div>

                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              <b>SST Tax Code</b>
                              <q-input class="new_input" outlined v-model="json.Itemcode" :dense="dense" />
                            </div> -->

                          </div>
                        </div>

                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2" style="margin-bottom: 10px;">
                          <div class="row" style="height: 100%;">

                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              <b>Remark</b>
                              <q-input :readonly="page_function == 'view'" class="new_input_custom" outlined v-model="json.remark" :dense="dense" />
                              <!-- <q-input class="new_input_custom" outlined v-model="json.remark" :dense="dense" /> -->
                              <!-- <LabelInputVerticalGeneral
                              :autofocusclick="true"
                                v-model:pass_value="pending_wording"
                                :pass_label_value="'Remark'"
                                v-on:receiveChange="handleReceiveChange"
                                :dbComponentBehavior="dbComponentBehavior.text"
                                label="test"
                                class="new_input_custom"
                              /> -->
                            </div>

                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              <b>Label Info</b>
                              <q-input :readonly="page_function == 'view'" class="new_input_custom" outlined v-model="json.label_info" :dense="dense" />
                              <!-- <LabelInputVerticalGeneral
                              :autofocusclick="true"
                                v-model:pass_value="pending_wording"
                                :pass_label_value="'label Info'"
                                v-on:receiveChange="handleReceiveChange"
                                :dbComponentBehavior="dbComponentBehavior.text"
                                label="test"
                                class="new_input_custom"
                              /> -->
                            </div>



                          </div>
                        </div>

                      </div>

                      <div :class="['row', active_section != 'Barcode' && 'hide_section']">

                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom: 10px; padding-right: 10px;">

                          <Table
                          :row_per_page="[5,10,20,50]"
                          :title="table_title"
                          :table_data="table_data1"
                          :table_column="table_column1"
                          :flat_status="true"
                          :bordered_status="true"
                          v-on:receiveRequestTable="handleTableChange1"
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
                          :pass_visible_columns="visibleColumns1"
                          />

                        </div>
                      </div>

                      <div :class="['row', active_section != 'Parent & Child' && 'hide_section']">

                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom: 10px; padding-right: 10px;">


                         <Table
                          :row_per_page="[5,10,20,50]"
                          :title="table_title1"
                          :table_data="table_data28"
                          :table_column="table_column28"
                          :flat_status="true"
                          :bordered_status="true"
                          v-on:receiveRequestTable="handleTableChange28"

                          :allow_add="false"
                          :allow_edit="true"
                          :allow_delete="true"
                          v-on:receiveHandleAdd="handleReceiveHandleAdd28"
                          v-on:receiveHandleEditDetails="handleReceiveHandleEdit28"
                          v-on:receiveHandleDelete="handleReceiveHandleDelete28"

                          :filter_mode_on="filter_mode_on"
                          v-on:receiveColumnRearrange="handleColumnRearrange28"
                          v-on:filter_column="handleFilterColumn28"
                          :forceLoading="forceLoading"
                          :column_reordering="false"
                          :row_reordering="false"
                          v-on:receiveHandleClearFilter="handleClearFilter28"

                          :pass_visible_columns="visibleColumns28"
                          />
                          </div>
                      </div>

                      <div :class="['row', active_section != 'Assortment' && 'hide_section']">

                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom: 10px; padding-right: 10px;">

                          <Table
                          :row_per_page="[5,10,20,50]"
                          :title="table_title24"
                          :table_data="table_data24"
                          :table_column="table_column24"
                          :flat_status="true"
                          :bordered_status="true"
                          v-on:receiveRequestTable="handleTableChange24"

                          :allow_add="false"
                          :allow_edit="true"
                          :allow_delete="true"
                          v-on:receiveHandleAdd="handleReceiveHandleAdd24"
                          v-on:receiveHandleEditDetails="handleReceiveHandleEditAssortment"
                          v-on:receiveHandleDelete="handleReceiveHandleDelete24"

                          :filter_mode_on="filter_mode_on"
                          v-on:receiveColumnRearrange="handleColumnRearrange24"
                          v-on:filter_column="handleFilterColumn24"
                          :forceLoading="forceLoading"
                          :column_reordering="false"
                          :row_reordering="false"
                          v-on:receiveHandleClearFilter="handleClearFilter24"

                          :pass_visible_columns="visibleColumns24"
                          />

                        </div>
                      </div>


                    </q-tab-panel>

                    <q-tab-panel name="Configuration" style="padding: 0px; padding-top: 10px; color: grey;overflow: hidden">
                      <div class="row">
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom: 10px;">
                          <div class="row ">
                          <div class="col-xl-10 col-lg-10 col-md-10 col-sm-10 col-xs-10">

                          <Button v-on:receiveClick="handleActiveClickSection2('Status')"
                            :pass_label="'Status'"
                            :pass_no_caps="true"
                            :pass_square="true"
                            :pass_dense="true"
                            :class="[active_section2 == 'Status' ? 'active_section_button' : 'inactive_section_button']"
                          />
                          <Button v-on:receiveClick="handleActiveClickSection2('Item Type')"
                            :pass_label="'Item Type'"
                            :pass_no_caps="true"
                            :pass_square="true"
                            :pass_dense="true"
                            :class="[active_section2 == 'Item Type' ? 'active_section_button' : 'inactive_section_button']"
                          />
                          <Button v-on:receiveClick="handleActiveClickSection2('Price Type')"
                            :pass_label="'Price Type'"
                            :pass_no_caps="true"
                            :pass_square="true"
                            :pass_dense="true"
                            :class="[active_section2 == 'Price Type' ? 'active_section_button' : 'inactive_section_button']"
                          />
                          <Button v-on:receiveClick="handleActiveClickSection2('Restriction')"
                            :pass_label="'Restriction'"
                            :pass_no_caps="true"
                            :pass_square="true"
                            :pass_dense="true"
                            :class="[active_section2 == 'Restriction' ? 'active_section_button' : 'inactive_section_button']"
                          />
                          </div>
                          <!-- <div v-if="active_section2 === 'Status'" class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2" align="right">

                          <Button_icon :disabled="readonly_button" :flat="true" :icon="'add'" v-on:receiveClick="addButtonListedBranch" :font_color="'white'" :color="'#069857'" :text="$language('D0024')" :outline="false" size="12px" class="justify-end button_add_1" />
                          </div>
                          <div v-if="active_section2 === 'Item Type'" class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2" align="right">

                          <Button_icon :disabled="readonly_button" :flat="true" :icon="'add'" v-on:receiveClick="addButtonItemType" :font_color="'white'" :color="'#069857'" :text="$language('D0024')" :outline="false" size="12px" class="justify-end button_add_1" />
                          </div>
                          <div v-if="active_section2 === 'Price Type'" class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2" align="right">

                          <Button_icon :disabled="readonly_button" :flat="true" :icon="'add'" v-on:receiveClick="addButtonPriceType" :font_color="'white'" :color="'#069857'" :text="$language('D0024')" :outline="false" size="12px" class="justify-end button_add_1" />
                          </div>
                          <div v-if="active_section2 === 'Restriction'" class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2" align="right">

                          <Button_icon :disabled="readonly_button" :flat="true" :icon="'add'" v-on:receiveClick="addButtonRestriction" :font_color="'white'" :color="'#069857'" :text="$language('D0024')" :outline="false" size="12px" class="justify-end button_add_1" />
                          </div> -->
                          </div>

                        </div>
                      </div>
                      <div :class="['row', active_section2 != 'Status' && 'hide_section']">

                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom: 10px; padding-right: 10px;">


                          <Table
                          :row_per_page="[5,10,20,50]"
                          :title="table_title3"
                          :table_data="table_data3"
                          :table_column="table_column3"
                          :flat_status="true"
                          :bordered_status="true"
                          v-on:receiveRequestTable="handleTableChange3"

                          :allow_add="false"
                          :allow_edit="true"
                          :allow_delete="true"
                          v-on:receiveHandleAdd="handleReceiveHandleAdd3"
                          v-on:receiveHandleEditDetails="handleReceiveHandleEditListedBranch"
                          v-on:receiveHandleDelete="handleReceiveHandleDelete3"

                          :filter_mode_on="filter_mode_on"
                          v-on:receiveColumnRearrange="handleColumnRearrange3"
                          v-on:filter_column="handleFilterColumn3"
                          :forceLoading="forceLoading"
                          :column_reordering="false"
                          :row_reordering="false"
                          v-on:receiveHandleClearFilter="handleClearFilter3"

                          :pass_visible_columns="visibleColumns3"
                          />

                        </div>
                      </div>
                      <div :class="['row', active_section2 != 'Item Type' && 'hide_section']">

                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom: 10px; padding-right: 10px;">


                          <Table
                          :row_per_page="[5,10,20,50]"
                          :title="table_title4"
                          :table_data="table_data4"
                          :table_column="table_column4"
                          :flat_status="true"
                          :bordered_status="true"
                          v-on:receiveRequestTable="handleTableChange4"

                          :allow_add="false"
                          :allow_edit="true"
                          :allow_delete="true"
                          v-on:receiveHandleAdd="handleReceiveHandleAdd4"
                          v-on:receiveHandleEditDetails="handleReceiveHandleEdit4"
                          v-on:receiveHandleDelete="handleReceiveHandleDelete4"

                          :filter_mode_on="filter_mode_on"
                          v-on:receiveColumnRearrange="handleColumnRearrange4"
                          v-on:filter_column="handleFilterColumn4"
                          :forceLoading="forceLoading"
                          :column_reordering="false"
                          :row_reordering="false"
                          v-on:receiveHandleClearFilter="handleClearFilter4"

                          :pass_visible_columns="visibleColumns4"
                          />

                        </div>
                      </div>
                      <div :class="['row', active_section2 != 'Price Type' && 'hide_section']">

                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom: 10px; padding-right: 10px;">


                          <Table
                          :row_per_page="[5,10,20,50]"
                          :title="table_title5"
                          :table_data="table_data5"
                          :table_column="table_column5"
                          :flat_status="true"
                          :bordered_status="true"
                          v-on:receiveRequestTable="handleTableChange5"

                          :allow_add="false"
                          :allow_edit="true"
                          :allow_delete="true"
                          v-on:receiveHandleAdd="handleReceiveHandleAdd5"
                          v-on:receiveHandleEditDetails="handleReceiveHandleEdit5"
                          v-on:receiveHandleDelete="handleReceiveHandleDelete5"

                          :filter_mode_on="filter_mode_on"
                          v-on:receiveColumnRearrange="handleColumnRearrange5"
                          v-on:filter_column="handleFilterColumn5"
                          :forceLoading="forceLoading"
                          :column_reordering="false"
                          :row_reordering="false"
                          v-on:receiveHandleClearFilter="handleClearFilter5"

                          :pass_visible_columns="visibleColumns5"
                          />

                        </div>
                      </div>
                      <div :class="['row', active_section2 != 'Restriction' && 'hide_section']">

                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom: 10px; padding-right: 10px;">


                          <Table
                          :row_per_page="[5,10,20,50]"
                          :title="table_title7"
                          :table_data="table_data7"
                          :table_column="table_column7"
                          :flat_status="true"
                          :bordered_status="true"
                          v-on:receiveRequestTable="handleTableChange7"

                          :allow_add="false"
                          :allow_edit="true"
                          :allow_delete="true"
                          v-on:receiveHandleAdd="handleReceiveHandleAdd7"
                          v-on:receiveHandleEditDetails="handleReceiveHandleEditRestriction"
                          v-on:receiveHandleDelete="handleReceiveHandleDelete7"

                          :filter_mode_on="filter_mode_on"
                          v-on:receiveColumnRearrange="handleColumnRearrange7"
                          v-on:filter_column="handleFilterColumn5"
                          :forceLoading="forceLoading"
                          :column_reordering="false"
                          :row_reordering="false"
                          v-on:receiveHandleClearFilter="handleClearFilter7"

                          :pass_visible_columns="visibleColumns7"
                          />

                        </div>
                      </div>

                    </q-tab-panel>

                    <q-tab-panel name="Replenishment" style="padding: 0px; padding-top: 10px; color: grey;overflow: hidden">
                      <div class="row">
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom: 10px;">
                          <div class="row ">
                          <div class="col-xl-10 col-lg-10 col-md-10 col-sm-10 col-xs-10">

                          <Button v-on:receiveClick="handleActiveClickSection3('Product')"
                            :pass_label="'Product'"
                            :pass_no_caps="true"
                            :pass_square="true"
                            :pass_dense="true"
                            :class="[active_section3 == 'Product' ? 'active_section_button' : 'inactive_section_button']"
                          />
                          <Button v-on:receiveClick="handleActiveClickSection3('Banner/Site')"
                            :pass_label="'Banner/Site'"
                            :pass_no_caps="true"
                            :pass_square="true"
                            :pass_dense="true"
                            :class="[active_section3 == 'Banner/Site' ? 'active_section_button' : 'inactive_section_button']"
                          />

                          </div>
                          
                          </div>
                        </div>
                      </div>

                      <div :class="['row', active_section3 != 'Product' && 'hide_section']">

                        <div class="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-xs-1" style="margin-bottom: 10px; padding-right: 10px;">
                          <div class="row" style="align-items: center;">

                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              <!-- <b>Auto SOQ</b>
                              <q-input class="new_input" outlined v-model="json.price_include_tax" :dense="dense" input-class="text-right"/> -->
                              <!-- <LabelInputVerticalGeneral
                              :autofocusclick="true"
                                v-model:pass_value="json.manual_soq"
                                :pass_label_value="'Auto SOQ'"
                                v-on:receiveChange="handleChange"
                                :dbComponentBehavior="dbComponentBehavior.text_right"
                                label="test"
                              /> -->
                              <div>
                                <b>Manual SOQ</b>
                              </div>
                              <div>
                                <q-toggle
                                  dense
                                  style="padding-top: 7px; padding-bottom: 7px;"
                                  :false-value="0"
                                  :true-value="1"
                                  color="green"
                                  v-model="json.im_manual_soq"
                                />
                              </div>
                            </div>

                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              <!-- <b>Auto Ordering</b>
                              <q-input class="new_input" outlined v-model="pending_wording" :dense="dense" input-class="text-right"/> -->
                              <!-- <LabelInputVerticalGeneral
                              :autofocusclick="true"
                                v-model:pass_value="json.manual_order"
                                :pass_label_value="'Auto Ordering'"
                                v-on:receiveChange="handleChange"
                                :dbComponentBehavior="dbComponentBehavior.text_right"
                                label="test"
                              /> -->
                              <div>
                                <b>Manual Ordering</b>
                              </div>
                              <div>
                                <q-toggle
                                  dense
                                  style="padding-top: 7px; padding-bottom: 7px;"
                                  :false-value="0"
                                  :true-value="1"
                                  color="green"
                                  v-model="json.im_manual_order"
                                />
                              </div>
                            </div>


                          </div>
                        </div>

                        <div class="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-xs-1" style="margin-bottom: 10px; padding-right: 10px;">
                          <div class="row" style="align-items: center;">

                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              <!-- <b>Min Qty</b>
                              <q-input class="new_input" outlined v-model="pending_wording" :dense="dense" input-class="text-right"/> -->
                              <LabelInputVerticalGeneral
                              :autofocusclick="true"
                                v-model:pass_value="json.SafetyLevel"
                                :pass_label_value="'Min Qty'"
                                v-on:receiveChange="handleChange"
                                :dbComponentBehavior="dbComponentBehavior.text_right"
                                label="test"
                              />
                            </div>

                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              <!-- <b>Max Qty</b>
                              <q-input class="new_input" outlined v-model="pending_wording" :dense="dense" input-class="text-right"/> -->
                              <LabelInputVerticalGeneral
                              :autofocusclick="true"
                                v-model:pass_value="json.MaxLevel"
                                :pass_label_value="'Max Qty'"
                                v-on:receiveChange="handleChange"
                                :dbComponentBehavior="dbComponentBehavior.text_right"
                                label="test"
                              />
                            </div>
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              <!-- <b>Display Qty</b>
                              <q-input class="new_input" outlined v-model="pending_wording" :dense="dense" input-class="text-right"/> -->
                              <LabelInputVerticalGeneral
                              :autofocusclick="true"
                                v-model:pass_value="json.ReorderQty"
                                :pass_label_value="'Display Qty'"
                                v-on:receiveChange="handleChange"
                                :dbComponentBehavior="dbComponentBehavior.text_right"
                                label="test"
                              />
                            </div>

                          </div>
                        </div>
                        <div class="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-xs-1" style="margin-bottom: 10px; padding-right: 10px;">
                          <div class="row" style="align-items: center;">

                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              <!-- <b>Min Day</b>
                              <q-input class="new_input" outlined v-model="json.price_include_tax" :dense="dense" input-class="text-right"/> -->
                              <LabelInputVerticalGeneral
                              :autofocusclick="true"
                                v-model:pass_value="json.im_min_day"
                                :pass_label_value="'Min Day'"
                                v-on:receiveChange="handleChange"
                                :dbComponentBehavior="dbComponentBehavior.text_right"
                                label="test"
                              />
                            </div>

                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              <!-- <b>Max Day</b>
                              <q-input class="new_input" outlined v-model="json.SellingPrice" :dense="dense" input-class="text-right"/> -->
                              <LabelInputVerticalGeneral
                              :autofocusclick="true"
                                v-model:pass_value="json.im_max_day"
                                :pass_label_value="'Max Day'"
                                v-on:receiveChange="handleChange"
                                :dbComponentBehavior="dbComponentBehavior.text_right"
                                label="test"
                              />
                            </div>


                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              <!-- <b>Lead Time</b>
                              <q-input class="new_input" outlined v-model="json.price_include_tax" :dense="dense" input-class="text-right"/> -->
                              <LabelInputVerticalGeneral
                              :autofocusclick="true"
                                v-model:pass_value="json.im_lead_time"
                                :pass_label_value="'Lead Time (Days)'"
                                v-on:receiveChange="handleChange"
                                :dbComponentBehavior="dbComponentBehavior.text_right"
                                label="test"
                              />
                            </div>

                          </div>
                        </div>

                        <div class="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-xs-1" style="margin-bottom: 10px; padding-right: 10px;">
                          <div class="row" style="align-items: center;">
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              <!-- <b>Stock days</b>
                              <q-input class="new_input" outlined v-model="json.SellingPrice" :dense="dense" input-class="text-right"/> -->
                              <LabelInputVerticalGeneral
                              :autofocusclick="true"
                                v-model:pass_value="json.im_stock_day"
                                :pass_label_value="'Stock days'"
                                v-on:receiveChange="handleChange"
                                :dbComponentBehavior="dbComponentBehavior.text_right"
                                label="test"
                              />
                            </div>
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              <!-- <b>Buffer Stock Days</b>
                              <q-input class="new_input" outlined v-model="pending_wording" :dense="dense" input-class="text-right"/> -->
                              <LabelInputVerticalGeneral
                              :autofocusclick="true"
                                v-model:pass_value="json.im_buffer_stock_day"
                                :pass_label_value="'Buffer Stock Days'"
                                v-on:receiveChange="handleChange"
                                :dbComponentBehavior="dbComponentBehavior.text_right"
                                label="test"
                              />
                            </div>

                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              <!-- <b>Top Sales Buffer</b>
                              <q-input class="new_input" outlined v-model="pending_wording" :dense="dense" input-class="text-right"/> -->
                              <LabelInputVerticalGeneral
                              :autofocusclick="true"
                                v-model:pass_value="json.im_top_sales_buffer"
                                :pass_label_value="'Top Sales Buffer'"
                                v-on:receiveChange="handleChange"
                                :dbComponentBehavior="dbComponentBehavior.text_right"
                                label="test"
                              />
                            </div>

                          </div>
                        </div>


                      </div>
                      <div :class="['row', active_section3 != 'Banner/Site' && 'hide_section']">

                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom: 10px; padding-right: 10px;">


                          <Table
                          :row_per_page="[5,10,20,50]"
                          :title="table_title6"
                          :table_data="table_data6"
                          :table_column="table_column6"
                          :flat_status="true"
                          :bordered_status="true"
                          v-on:receiveRequestTable="handleTableChange6"

                          :allow_add="false"
                          :allow_edit="true"
                          :allow_delete="true"
                          v-on:receiveHandleAdd="handleReceiveHandleAdd6"
                          v-on:receiveHandleEditDetails="handleReceiveHandleEditReplenishment"
                          v-on:receiveHandleDelete="handleReceiveHandleDelete6"

                          :filter_mode_on="filter_mode_on"
                          v-on:receiveColumnRearrange="handleColumnRearrange6"
                          v-on:filter_column="handleFilterColumn6"
                          :forceLoading="forceLoading"
                          :column_reordering="false"
                          :row_reordering="false"
                          v-on:receiveHandleClearFilter="handleClearFilter6"

                          :pass_visible_columns="visibleColumns6"
                          />

                        </div>
                      </div>



                    </q-tab-panel>

                    <q-tab-panel name="Purchase" style="padding: 0px; padding-top: 10px; color: grey;overflow: hidden">
                      <div class="row">
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom: 10px;">
                          <div class="row ">
                          <div class="col-xl-10 col-lg-10 col-md-10 col-sm-10 col-xs-10">

                          <Button v-on:receiveClick="handleActiveClickSection6('Supplier')"
                            :pass_label="'Supplier'"
                            :pass_no_caps="true"
                            :pass_square="true"
                            :pass_dense="true"
                            :class="[active_section6 == 'Supplier' ? 'active_section_button' : 'inactive_section_button']"
                          />
                          <Button v-on:receiveClick="handleActiveClickSection6('Cost Change')"
                            :pass_label="'Cost Change'"
                            :pass_no_caps="true"
                            :pass_square="true"
                            :pass_dense="true"
                            :class="[active_section6 == 'Cost Change' ? 'active_section_button' : 'inactive_section_button']"
                          />
                          <Button v-on:receiveClick="handleActiveClickSection6('Purchase Promo')"
                            :pass_label="'Purchase Promo'"
                            :pass_no_caps="true"
                            :pass_square="true"
                            :pass_dense="true"
                            :class="[active_section6 == 'Purchase Promo' ? 'active_section_button' : 'inactive_section_button']"
                          />
                          <Button v-on:receiveClick="handleActiveClickSection6('Purchase Order')"
                            :pass_label="'Purchase Order'"
                            :pass_no_caps="true"
                            :pass_square="true"
                            :pass_dense="true"
                            :class="[active_section6 == 'Purchase Order' ? 'active_section_button' : 'inactive_section_button']"
                          />
                          <Button v-on:receiveClick="handleActiveClickSection6('Goods Receiving')"
                            :pass_label="'Goods Receiving'"
                            :pass_no_caps="true"
                            :pass_square="true"
                            :pass_dense="true"
                            :class="[active_section6 == 'Goods Receiving' ? 'active_section_button' : 'inactive_section_button']"
                          />
                          <Button v-on:receiveClick="handleActiveClickSection6('IBT Purchase')"
                            :pass_label="'IBT Purchase'"
                            :pass_no_caps="true"
                            :pass_square="true"
                            :pass_dense="true"
                            :class="[active_section6 == 'IBT Purchase' ? 'active_section_button' : 'inactive_section_button']"
                          />
                          </div>
                          <!-- <div v-if="active_section6 === 'Cost Change'" class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2" align="right">

                          <Button_icon :disabled="readonly_button" :flat="true" :icon="'add'" v-on:receiveClick="addButtonBarcode()" :font_color="'white'" :color="'#069857'" :text="$language('D0024')" :outline="false" size="12px" class="justify-end button_add_1" />
                          </div>
                          <div v-if="active_section6 === 'Purchase Order'" class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2" align="right">

                          <Button_icon :disabled="readonly_button" :flat="true" :icon="'add'" v-on:receiveClick="handleAddPurchaseOrder()" :font_color="'white'" :color="'#069857'" :text="$language('D0024')" :outline="false" size="12px" class="justify-end button_add_1" />
                          </div> -->
                          </div>


                        </div>
                      </div>

                      <div :class="['row', active_section6 != 'Supplier' && 'hide_section']">

                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom: 10px; padding-right: 10px;">
                          <div style="width: 100%; overflow-y: auto;">
                            <table cell style="width: 100%; border-collapse: collapse; color: black; font-size: 11px;" class="custom_table">
                              <thead>
                                <tr>
                                  <th style="cursor: pointer; padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; background-color: #D7E2E9;">No</th>
                                  <th style="cursor: pointer; padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; background-color: #D7E2E9;">Priority</th>
                                  <th style="cursor: pointer; padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; background-color: #D7E2E9;">Type</th>
                                  <th style="cursor: pointer; padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; background-color: #D7E2E9;">Code</th>
                                  <th style="cursor: pointer; padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; background-color: #D7E2E9;">Name</th>
                                  <th style="cursor: pointer; padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; background-color: #D7E2E9;">
                                    Cur
                                    <q-tooltip anchor="top middle" self="center middle">
                                      Currency
                                    </q-tooltip>

                                  </th>
                                  <th style="cursor: pointer; padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; background-color: #D7E2E9;">Ordering UOM</th>
                                  <th style="cursor: pointer; padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; background-color: #D7E2E9;">UOM</th>

                                  <th style="cursor: pointer; padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; background-color: #D7E2E9;">Cost</th>
                                  <th style="cursor: pointer; padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; background-color: #D7E2E9;">Disc1</th>
                                  <th style="cursor: pointer; padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; background-color: #D7E2E9;">Disc2</th>
                                  <th style="cursor: pointer; padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; background-color: #D7E2E9;">Listed Cost</th>

                                  <th style="cursor: pointer; padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; background-color: #D7E2E9;">
                                    Min Order Qty
                                    <q-tooltip anchor="top middle" self="center middle">
                                      Min Order Qty
                                    </q-tooltip>
                                  </th>
                                  <th style="cursor: pointer; padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; background-color: #D7E2E9;">Order Lot Size</th>

                                  <th style="cursor: pointer; padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; background-color: #D7E2E9;">External Code</th>
                                  <th style="cursor: pointer; padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; background-color: #D7E2E9;">RSP Inc Tax</th>
                                  <th style="cursor: pointer; padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; background-color: #D7E2E9;">RSP Exc Tax</th>

                                  <th style="cursor: pointer; padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; background-color: #D7E2E9;">Updated On</th>
                                  <th style="cursor: pointer; padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; background-color: #D7E2E9;">Updated By</th>

                                  <th style="cursor: pointer; padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; background-color: #D7E2E9;">Created On</th>
                                  <th style="cursor: pointer; padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; background-color: #D7E2E9;">Created By</th>

                                  <th style="cursor: pointer; padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; background-color: #D7E2E9;">Effective Date</th>
                                  <th style="cursor: pointer; padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; background-color: #D7E2E9;">UOM</th>
                                  <th style="cursor: pointer; padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; background-color: #D7E2E9;">Expected Cost</th>
                                  <th style="cursor: pointer; padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; background-color: #D7E2E9;">Disc 1</th>
                                  <th style="cursor: pointer; padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; background-color: #D7E2E9;">Disc 2</th>
                                  <th style="cursor: pointer; padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; background-color: #D7E2E9;">Listed Cost</th>

                                </tr>
                              </thead>
                              <tbody>
                                <template v-for="(row, index) in supplier_table_data.data.results" :key="index">
                                  <tr>
                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">{{ row.unit.no }}</td>
                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">{{ row.unit.priority }}</td>
                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">{{ row.unit.type }}</td>
                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">{{ row.unit.Itemcode }}</td>
                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">{{ row.unit.ITEM_DESC }}</td>
                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">{{ row.unit.imsc_currency_code }}</td>
                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">{{ row.unit.order_uom }}</td>
                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">{{ row.unit.uom }}</td>

                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">{{ row.unit.cost }}</td>
                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">{{ row.unit.Disc1Value }}</td>
                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">{{ row.unit.Disc2Value }}</td>
                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">{{ row.unit.SupStdPrice }}</td>

                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">{{ row.unit.min_order_unit }}</td>
                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">{{ row.unit.OrderLotSize }}</td>

                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">{{ row.unit.external_code }}</td>
                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">{{ row.unit.SupRSPAfterTax }}</td>
                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">{{ row.unit.SupRSPBeforeTax }}</td>

                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">{{ row.unit.Updated_at }}</td>
                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">{{ row.unit.Updated_by }}</td>

                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">{{ row.unit.Created_at }}</td>
                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">{{ row.unit.Created_by }}</td>

                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">{{ row.unit.effective_date }}</td><!--Effective Date-->
                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">{{ row.unit.uom }}</td><!--UOM-->
                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">{{ row.unit.cost }}</td><!--Expected Cost-->
                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">{{ row.unit.Disc1Value }}</td><!--Disc 1-->
                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">{{ row.unit.Disc2Value }}</td><!--Disc 2-->
                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">{{ row.unit.SupStdPrice }}</td><!--Listed Cost-->

                                </tr>

                                <tr :style="(supplier_table_data.length !== 1 && index !== supplier_table_data.length - 1) ?
                                  'border-bottom: 2px solid #273655;' : ''">
                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px;" colspan="3"></td>
                                  <!-- <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px;"></td>
                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px;"></td> -->
                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; border-right: 0px;">
                                    Block Order
                                    <q-toggle
                                          size="30px"
                                          dense
                                          :false-value="0"
                                          :true-value="1"
                                          color="green"
                                          v-model="row.case.block_order"
                                        />
                                  </td>
                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; border-left: 0px; border-right: 0px;">
                                    Non Returnable
                                    <q-toggle
                                          size="30px"
                                          dense
                                          :false-value="0"
                                          :true-value="1"
                                          color="green"
                                          v-model="row.case.none_return"
                                        />
                                  </td>
                                  <!-- <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; border-left: 0px; border-right: 0px;"></td> -->
                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right; border-left: 0px;" colspan="2"> Case Qty = {{ row.case.order_uom }}</td>
                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">{{ row.case.uom }}</td>

                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">{{ row.case.cost }}</td>
                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">{{ row.case.disc1value_case }}</td>
                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">{{ row.case.disc2value_case }}</td>
                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">{{ row.case.SupStdPrice }}</td>

                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">{{ row.case.min_order_case }}</td>
                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">{{ row.case.orderlot_case }}</td>

                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px;" colspan="7"></td> <!-- This replaces the 8 blank cells -->


                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px;">{{ row.unit.effective_date }}</td><!--Effective Date-->
                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">Case Qty = {{ row.case.order_uom }}</td><!--UOM-->
                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">{{ row.case.cost }}</td><!--Expected Cost-->
                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">{{ row.case.disc1value_case }}</td><!--Disc 1-->
                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">{{ row.case.disc2value_case }}</td><!--Disc 2-->
                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">{{ row.case.SupStdPrice }}</td><!--Listed Cost-->

                                </tr>

                                <!-- <tr style="border-top: 2px solid #273655;">
                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">2</td>
                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">Priority</td>
                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">Type</td>
                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">A002</td>
                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">Test Supplier 2</td>
                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">RM</td>
                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">Unit/Case</td>
                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">Unit</td>

                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">0</td>
                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">0</td>
                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">0</td>
                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">0</td>

                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">0</td>
                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">0</td>

                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">0</td>
                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">0</td>
                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">0</td>

                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">2024-08-29 10:00:00</td>
                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">test user</td>

                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">2024-08-29 10:00:00</td>
                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">test user</td>

                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">2024-08-30</td>
                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">Unit/Case</td>
                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">0</td>
                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">0</td>
                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">0</td>
                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">0</td>

                                </tr>

                                <tr>
                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px;"></td>
                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px;"></td>
                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px;"></td>
                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; border-right: 0px;">
                                    Block Order
                                    <q-toggle
                                          size="30px"
                                          dense
                                          :false-value="true"
                                          :true-value="false"
                                          color="green"
                                          v-model="redModel"
                                        />
                                  </td>
                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; border-left: 0px; border-right: 0px;">
                                    Non Returnable
                                    <q-toggle
                                          size="30px"
                                          dense
                                          :false-value="true"
                                          :true-value="false"
                                          color="green"
                                          v-model="redModel"
                                        />
                                  </td>
                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; border-left: 0px; border-right: 0px;"></td>
                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right; border-left: 0px;">Case Qty = 12</td>
                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">Unit</td>

                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">0</td>
                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">0</td>
                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">0</td>
                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">0</td>

                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">0</td>
                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">0</td>

                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px;"></td>
                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px;"></td>
                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px;"></td>

                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px;;"></td>
                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px;;"></td>

                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px;;"></td>
                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px;;"></td>

                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px;"></td>
                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">Case Qty = 1</td>
                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">0</td>
                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">0</td>
                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">0</td>
                                  <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">0</td>

                                </tr> -->
                                </template>


                              </tbody>
                            </table>
                          </div>
                        </div>

                        <q-inner-loading
                          :showing="SupplierForceLoading"
                          color="primary"
                        />
                      </div>
                      <div :class="['row', active_section6 != 'Cost Change' && 'hide_section']">
                        Cost Change By Item
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom: 10px; padding-right: 10px;">


                          <Table
                          :row_per_page="[5,10,20,50]"
                          :title="table_title9"
                          :table_data="table_data9"
                          :table_column="table_column9"
                          :flat_status="true"
                          :bordered_status="true"
                          v-on:receiveRequestTable="handleTableChange9"

                          :allow_add="false"
                          :allow_edit="true"
                          :allow_delete="true"
                          v-on:receiveHandleAdd="handleReceiveHandleAdd9"
                          v-on:receiveHandleEditDetails="handleReceiveHandleEdit9"
                          v-on:receiveHandleDelete="handleReceiveHandleDelete9"

                          :filter_mode_on="filter_mode_on"
                          v-on:receiveColumnRearrange="handleColumnRearrange9"
                          v-on:filter_column="handleFilterColumn9"
                          :forceLoading="forceLoading"
                          :column_reordering="false"
                          :row_reordering="false"
                          v-on:receiveHandleClearFilter="handleClearFilter9"

                          :pass_visible_columns="visibleColumns9"
                          />

                        </div>
                        Cost Change By Supplier
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom: 10px; padding-right: 10px;">

                          <Table
                          :row_per_page="[5,10,20,50]"
                          :title="table_title10"
                          :table_data="table_data10"
                          :table_column="table_column10"
                          :flat_status="true"
                          :bordered_status="true"
                          v-on:receiveRequestTable="handleTableChange10"

                          :allow_add="false"
                          :allow_edit="false"
                          :allow_delete="true"
                          v-on:receiveHandleAdd="handleReceiveHandleAdd10"
                          v-on:receiveHandleEditDetails="handleReceiveHandleEdit10"
                          v-on:receiveHandleDelete="handleReceiveHandleDelete10"

                          :filter_mode_on="filter_mode_on"
                          v-on:receiveColumnRearrange="handleColumnRearrange10"
                          v-on:filter_column="handleFilterColumn10"
                          :forceLoading="forceLoading"
                          :column_reordering="false"
                          :row_reordering="false"
                          v-on:receiveHandleClearFilter="handleClearFilter10"

                          :pass_visible_columns="visibleColumns10"
                          />

                        </div>
                      </div>

                      <!-- 28th septermber -->
                       <div :class="['row', active_section6 != 'Purchase Order' && 'hide_section']">

                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom: 10px; padding-right: 10px;">


                          <Table
                          :row_per_page="[5,10,20,50]"
                          :title="table_title26"
                          :table_data="table_data26"
                          :table_column="table_column26"
                          :flat_status="true"
                          :bordered_status="true"
                          v-on:receiveRequestTable="handleTableChange26"

                          :allow_add="false"
                          :allow_edit="true"
                          :allow_delete="true"
                          v-on:receiveHandleAdd="handleReceiveHandleAdd26"
                          v-on:receiveHandleEditDetails="handleReceiveHandleEdit26"
                          v-on:receiveHandleDelete="handleReceiveHandleDelete26"

                          :filter_mode_on="filter_mode_on"
                          v-on:receiveColumnRearrange="handleColumnRearrange26"
                          v-on:filter_column="handleFilterColumn26"
                          :forceLoading="forceLoading"
                          :column_reordering="false"
                          :row_reordering="false"
                          v-on:receiveHandleClearFilter="handleClearFilter26"

                          :pass_visible_columns="visibleColumns26"
                          />

                        </div>

                      </div>

                      <div :class="['row', active_section6 != 'Purchase Promo' && 'hide_section']">

                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom: 10px; padding-right: 10px;">


                          <Table
                          :row_per_page="[5,10,20,50]"
                          :title="table_title18"
                          :table_data="table_data18"
                          :table_column="table_column18"
                          :flat_status="true"
                          :bordered_status="true"
                          v-on:receiveRequestTable="handleTableChange18"

                          :allow_add="false"
                          :allow_edit="true"
                          :allow_delete="true"
                          v-on:receiveHandleAdd="handleReceiveHandleAdd18"
                          v-on:receiveHandleEditDetails="handleReceiveHandleEdit18"
                          v-on:receiveHandleDelete="handleReceiveHandleDelete18"

                          :filter_mode_on="filter_mode_on"
                          v-on:receiveColumnRearrange="handleColumnRearrange18"
                          v-on:filter_column="handleFilterColumn18"
                          :forceLoading="forceLoading"
                          :column_reordering="false"
                          :row_reordering="false"
                          v-on:receiveHandleClearFilter="handleClearFilter18"

                          :pass_visible_columns="visibleColumns18"
                          />

                        </div>

                      </div>

                      <div :class="['row', active_section6 != 'Goods Receiving' && 'hide_section']">

                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom: 10px; padding-right: 10px;">


                          <Table
                          :row_per_page="[5,10,20,50]"
                          :title="table_title11"
                          :table_data="table_data11"
                          :table_column="table_column11"
                          :flat_status="true"
                          :bordered_status="true"
                          v-on:receiveRequestTable="handleTableChange11"

                          :allow_add="false"
                          :allow_edit="true"
                          :allow_delete="true"
                          v-on:receiveHandleAdd="handleReceiveHandleAdd11"
                          v-on:receiveHandleEditDetails="handleReceiveHandleEdit11"
                          v-on:receiveHandleDelete="handleReceiveHandleDelete11"

                          :filter_mode_on="filter_mode_on"
                          v-on:receiveColumnRearrange="handleColumnRearrange11"
                          v-on:filter_column="handleFilterColumn11"
                          :forceLoading="forceLoading"
                          :column_reordering="false"
                          :row_reordering="false"
                          v-on:receiveHandleClearFilter="handleClearFilter11"

                          :pass_visible_columns="visibleColumns11"
                          />

                        </div>

                      </div>
                      <div :class="['row', active_section6 != 'IBT Purchase' && 'hide_section']">

                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom: 10px; padding-right: 10px;">


                          <Table
                          :row_per_page="[5,10,20,50]"
                          :title="table_title14"
                          :table_data="table_data14"
                          :table_column="table_column14"
                          :flat_status="true"
                          :bordered_status="true"
                          v-on:receiveRequestTable="handleTableChange14"

                          :allow_add="false"
                          :allow_edit="true"
                          :allow_delete="true"
                          v-on:receiveHandleAdd="handleReceiveHandleAdd14"
                          v-on:receiveHandleEditDetails="handleReceiveHandleEdit14"
                          v-on:receiveHandleDelete="handleReceiveHandleDelete14"

                          :filter_mode_on="filter_mode_on"
                          v-on:receiveColumnRearrange="handleColumnRearrange14"
                          v-on:filter_column="handleFilterColumn14"
                          :forceLoading="forceLoading"
                          :column_reordering="false"
                          :row_reordering="false"
                          v-on:receiveHandleClearFilter="handleClearFilter14"

                          :pass_visible_columns="visibleColumns14"
                          />

                        </div>

                      </div>
                    </q-tab-panel>

                    <q-tab-panel name="Sales Info" style="padding: 0px; padding-top: 10px; color: grey;overflow: hidden">
                      <div class="row">
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom: 10px;">
                          <div class="row ">
                          <div class="col-xl-10 col-lg-10 col-md-10 col-sm-10 col-xs-10">

                          <Button v-on:receiveClick="handleActiveClickSection7(`Today's Price`)"
                            :pass_label="`Today's Price`"
                            :pass_no_caps="true"
                            :pass_square="true"
                            :pass_dense="true"
                            :class="[active_section7 == `Today's Price` ? 'active_section_button' : 'inactive_section_button']"
                          />
                          <Button v-on:receiveClick="handleActiveClickSection7('Price Change')"
                            :pass_label="'Price Change'"
                            :pass_no_caps="true"
                            :pass_square="true"
                            :pass_dense="true"
                            :class="[active_section7 == 'Price Change' ? 'active_section_button' : 'inactive_section_button']"
                          />
                          <Button v-on:receiveClick="handleActiveClickSection7('3+1 Month')"
                            :pass_label="'3+1 Month'"
                            :pass_no_caps="true"
                            :pass_square="true"
                            :pass_dense="true"
                            :class="[active_section7 == '3+1 Month' ? 'active_section_button' : 'inactive_section_button']"
                          />
                          <Button v-on:receiveClick="handleActiveClickSection7('Monthly')"
                            :pass_label="'Monthly'"
                            :pass_no_caps="true"
                            :pass_square="true"
                            :pass_dense="true"
                            :class="[active_section7 == 'Monthly' ? 'active_section_button' : 'inactive_section_button']"
                          />
                          <Button v-on:receiveClick="handleActiveClickSection7('Weekly')"
                            :pass_label="'Weekly'"
                            :pass_no_caps="true"
                            :pass_square="true"
                            :pass_dense="true"
                            :class="[active_section7 == 'Weekly' ? 'active_section_button' : 'inactive_section_button']"
                          />
                          <Button v-on:receiveClick="handleActiveClickSection7('Daily')"
                            :pass_label="'Daily'"
                            :pass_no_caps="true"
                            :pass_square="true"
                            :pass_dense="true"
                            :class="[active_section7 == 'Daily' ? 'active_section_button' : 'inactive_section_button']"
                          />
                          <Button v-on:receiveClick="handleActiveClickSection7('POS Sales')"
                            :pass_label="'POS Sales'"
                            :pass_no_caps="true"
                            :pass_square="true"
                            :pass_dense="true"
                            :class="[active_section7 == 'POS Sales' ? 'active_section_button' : 'inactive_section_button']"
                          />
                          <Button v-on:receiveClick="handleActiveClickSection7('AR Sales')"
                            :pass_label="'AR Sales'"
                            :pass_no_caps="true"
                            :pass_square="true"
                            :pass_dense="true"
                            :class="[active_section7 == 'AR Sales' ? 'active_section_button' : 'inactive_section_button']"
                          />
                          <Button v-on:receiveClick="handleActiveClickSection7('IBT Sales')"
                            :pass_label="'IBT Sales'"
                            :pass_no_caps="true"
                            :pass_square="true"
                            :pass_dense="true"
                            :class="[active_section7 == 'IBT Sales' ? 'active_section_button' : 'inactive_section_button']"
                          />
                          </div>
                          </div>
                          <!-- <div v-if="active_section7 === 'Price Change'" class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2" align="right">

                          <Button_icon :disabled="readonly_button" :flat="true" :icon="'add'" v-on:receiveClick="addButtonBarcode()" :font_color="'white'" :color="'#069857'" :text="$language('D0024')" :outline="false" size="12px" class="justify-end button_add_1" />
                          </div> -->

                        </div>
                      </div>

                      <div :class="['row', active_section7 != `Today's Price` && 'hide_section']">

                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom: 10px; padding-right: 10px;">


                          <Table
                          :row_per_page="[5,10,20,50]"
                          :title="table_title15"
                          :table_data="table_data15"
                          :table_column="table_column15"
                          :flat_status="true"
                          :bordered_status="true"
                          v-on:receiveRequestTable="handleTableChange15"

                          :allow_add="false"
                          :allow_edit="true"
                          :allow_delete="true"
                          v-on:receiveHandleAdd="handleReceiveHandleAdd15"
                          v-on:receiveHandleEditDetails="handleReceiveHandleEdit15"
                          v-on:receiveHandleDelete="handleReceiveHandleDelete15"

                          :filter_mode_on="filter_mode_on"
                          v-on:receiveColumnRearrange="handleColumnRearrange15"
                          v-on:filter_column="handleFilterColumn15"
                          :forceLoading="forceLoading"
                          :column_reordering="false"
                          :row_reordering="false"
                          v-on:receiveHandleClearFilter="handleClearFilter15"

                          :pass_visible_columns="visibleColumns15"
                          />

                        </div>
                      </div>

                      <div :class="['row', active_section7 != 'Price Change' && 'hide_section']">

                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom: 10px; padding-right: 10px;">


                          <Table
                          :row_per_page="[5,10,20,50]"
                          :title="table_title8"
                          :table_data="table_data8"
                          :table_column="table_column8"
                          :flat_status="true"
                          :bordered_status="true"
                          v-on:receiveRequestTable="handleTableChange8"

                          :allow_add="false"
                          :allow_edit="false"
                          :allow_delete="true"
                          v-on:receiveHandleAdd="handleReceiveHandleAdd8"
                          v-on:receiveHandleEditDetails="handleReceiveHandleEdit8"
                          v-on:receiveHandleDelete="handleReceiveHandleDelete8"

                          :filter_mode_on="filter_mode_on"
                          v-on:receiveColumnRearrange="handleColumnRearrange8"
                          v-on:filter_column="handleFilterColumn8"
                          :forceLoading="forceLoading"
                          :column_reordering="false"
                          :row_reordering="false"
                          v-on:receiveHandleClearFilter="handleClearFilter8"

                          :pass_visible_columns="visibleColumns8"
                          />

                        </div>
                      </div>

                      <div :class="['row', active_section7 != '3+1 Month' && 'hide_section']">

                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom: 10px; padding-right: 10px;">


                          <Table
                          :row_per_page="[5,10,20,50]"
                          :title="table_title16"
                          :table_data="table_data16"
                          :table_column="table_column16"
                          :flat_status="true"
                          :bordered_status="true"
                          v-on:receiveRequestTable="handleTableChange16"

                          :allow_add="false"
                          :allow_edit="true"
                          :allow_delete="true"
                          v-on:receiveHandleAdd="handleReceiveHandleAdd16"
                          v-on:receiveHandleEditDetails="handleReceiveHandleEdit16"
                          v-on:receiveHandleDelete="handleReceiveHandleDelete16"

                          :filter_mode_on="filter_mode_on"
                          v-on:receiveColumnRearrange="handleColumnRearrange16"
                          v-on:filter_column="handleFilterColumn16"
                          :forceLoading="forceLoading"
                          :column_reordering="false"
                          :row_reordering="false"
                          v-on:receiveHandleClearFilter="handleClearFilter16"

                          :pass_visible_columns="visibleColumns16"
                          />

                        </div>
                      </div>

                      <div :class="['row', active_section7 != 'POS Sales' && 'hide_section']">

                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom: 10px; padding-right: 10px;">


                          <Table
                          :row_per_page="[5,10,20,50]"
                          :title="table_title19"
                          :table_data="table_data19"
                          :table_column="table_column19"
                          :flat_status="true"
                          :bordered_status="true"
                          v-on:receiveRequestTable="handleTableChange19"

                          :allow_add="false"
                          :allow_edit="false"
                          :allow_delete="true"
                          v-on:receiveHandleAdd="handleReceiveHandleAdd19"
                          v-on:receiveHandleEditDetails="handleReceiveHandleEdit19"
                          v-on:receiveHandleDelete="handleReceiveHandleDelete19"

                          :filter_mode_on="filter_mode_on"
                          v-on:receiveColumnRearrange="handleColumnRearrange19"
                          v-on:filter_column="handleFilterColumn19"
                          :forceLoading="forceLoading"
                          :column_reordering="false"
                          :row_reordering="false"
                          v-on:receiveHandleClearFilter="handleClearFilter19"

                          :pass_visible_columns="visibleColumns19"
                          />

                        </div>
                      </div>

                      <div :class="['row', active_section7 != 'AR Sales' && 'hide_section']">

                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom: 10px; padding-right: 10px;">


                          <Table
                          :row_per_page="[5,10,20,50]"
                          :title="table_title17"
                          :table_data="table_data17"
                          :table_column="table_column17"
                          :flat_status="true"
                          :bordered_status="true"
                          v-on:receiveRequestTable="handleTableChange17"

                          :allow_add="false"
                          :allow_edit="false"
                          :allow_delete="true"
                          v-on:receiveHandleAdd="handleReceiveHandleAdd17"
                          v-on:receiveHandleEditDetails="handleReceiveHandleEdit17"
                          v-on:receiveHandleDelete="handleReceiveHandleDelete17"

                          :filter_mode_on="filter_mode_on"
                          v-on:receiveColumnRearrange="handleColumnRearrange17"
                          v-on:filter_column="handleFilterColumn17"
                          :forceLoading="forceLoading"
                          :column_reordering="false"
                          :row_reordering="false"
                          v-on:receiveHandleClearFilter="handleClearFilter17"

                          :pass_visible_columns="visibleColumns17"
                          />

                        </div>
                      </div>
                      <div :class="['row', active_section7 != 'IBT Sales' && 'hide_section']">

                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom: 10px; padding-right: 10px;">


                          <Table
                          :row_per_page="[5,10,20,50]"
                          :title="table_title25"
                          :table_data="table_data25"
                          :table_column="table_column25"
                          :flat_status="true"
                          :bordered_status="true"
                          v-on:receiveRequestTable="handleTableChange25"

                          :allow_add="false"
                          :allow_edit="false"
                          :allow_delete="true"
                          v-on:receiveHandleAdd="handleReceiveHandleAdd25"
                          v-on:receiveHandleEditDetails="handleReceiveHandleEdit25"
                          v-on:receiveHandleDelete="handleReceiveHandleDelete25"

                          :filter_mode_on="filter_mode_on"
                          v-on:receiveColumnRearrange="handleColumnRearrange25"
                          v-on:filter_column="handleFilterColumn25"
                          :forceLoading="forceLoading"
                          :column_reordering="false"
                          :row_reordering="false"
                          v-on:receiveHandleClearFilter="handleClearFilter25"

                          :pass_visible_columns="visibleColumns25"
                          />

                        </div>
                      </div>
                    </q-tab-panel>

                    <q-tab-panel name="Promotion" style="padding: 0px; padding-top: 10px; color: grey;overflow: hidden">
                      <div class="row">
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom: 10px;">
                           <div class="row ">
                          <div class="col-xl-10 col-lg-10 col-md-10 col-sm-10 col-xs-10">

                          <Button v-on:receiveClick="handleActiveClickSection5('Promo Discount')"
                            :pass_label="'Promo Discount'"
                            :pass_no_caps="true"
                            :pass_square="true"
                            :pass_dense="true"
                            :class="[active_section5 == 'Promo Discount' ? 'active_section_button' : 'inactive_section_button']"
                          />
                          <Button v-on:receiveClick="handleActiveClickSection5('Multi Buy')"
                            :pass_label="'Multi Buy'"
                            :pass_no_caps="true"
                            :pass_square="true"
                            :pass_dense="true"
                            :class="[active_section5 == 'Multi Buy' ? 'active_section_button' : 'inactive_section_button']"
                          />
                          <Button v-on:receiveClick="handleActiveClickSection5('Mix & Match')"
                            :pass_label="'Mix & Match'"
                            :pass_no_caps="true"
                            :pass_square="true"
                            :pass_dense="true"
                            :class="[active_section5 == 'Mix & Match' ? 'active_section_button' : 'inactive_section_button']"
                          />
                          <Button v-on:receiveClick="handleActiveClickSection5('Price Break')"
                            :pass_label="'Price Break'"
                            :pass_no_caps="true"
                            :pass_square="true"
                            :pass_dense="true"
                            :class="[active_section5 == 'Price Break' ? 'active_section_button' : 'inactive_section_button']"
                          />
                          <Button v-on:receiveClick="handleActiveClickSection5('Permanent Discount')"
                            :pass_label="'Permanent Discount'"
                            :pass_no_caps="true"
                            :pass_square="true"
                            :pass_dense="true"
                            :class="[active_section5 == 'Permanent Discount' ? 'active_section_button' : 'inactive_section_button']"
                          />
                          </div>
                          <!-- <div v-if="active_section5 === 'Promo Discount'" class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2" align="right">

                          <Button_icon :disabled="readonly_button" :flat="true" v-on:receiveClick="addButtonPromoDisc" :font_color="'white'" :color="'#069857'" :text="'Create'" :outline="false" size="12px" class="justify-end button_add_1" />
                          </div>
                          <div v-if="active_section5 === 'Price Break'" class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2" align="right">

                          <Button_icon :disabled="readonly_button" :flat="true" :icon="'add'" v-on:receiveClick="addButtonPriceBreakC()" :font_color="'white'" :color="'#069857'" :text="$language('D0024')" :outline="false" size="12px" class="justify-end button_add_1" />
                          </div>
                          <div v-if="active_section5 === 'Permanent Discount'" class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2" align="right">

                          <Button_icon :disabled="readonly_button" :flat="true" :icon="'add'" v-on:receiveClick="addButtonPermanentDiscount()" :font_color="'white'" :color="'#069857'" :text="$language('D0024')" :outline="false" size="12px" class="justify-end button_add_1" />
                          </div> -->
                           </div>

                        </div>
                      </div>

                      <div :class="['row', active_section5 != 'Mix & Match' && 'hide_section']">

                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom: 10px; padding-right: 10px;">


                          <Table
                          :row_per_page="[5,10,20,50]"
                          :title="table_title20"
                          :table_data="table_data20"
                          :table_column="table_column20"
                          :flat_status="true"
                          :bordered_status="true"
                          v-on:receiveRequestTable="handleTableChange20"

                          :allow_add="false"
                          :allow_edit="true"
                          :allow_delete="true"
                          v-on:receiveHandleAdd="handleReceiveHandleAdd20"
                          v-on:receiveHandleEditDetails="handleReceiveHandleEdit20"
                          v-on:receiveHandleDelete="handleReceiveHandleDelete20"

                          :filter_mode_on="filter_mode_on"
                          v-on:receiveColumnRearrange="handleColumnRearrange20"
                          v-on:filter_column="handleFilterColumn20"
                          :forceLoading="forceLoading"
                          :column_reordering="false"
                          :row_reordering="false"
                          v-on:receiveHandleClearFilter="handleClearFilter20"

                          :pass_visible_columns="visibleColumns20"
                          />

                        </div>
                      </div>
                      <div :class="['row', active_section5 != 'Multi Buy' && 'hide_section']">

                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom: 10px; padding-right: 10px;">


                          <Table
                          :row_per_page="[5,10,20,50]"
                          :title="table_title21"
                          :table_data="table_data21"
                          :table_column="table_column21"
                          :flat_status="true"
                          :bordered_status="true"
                          v-on:receiveRequestTable="handleTableChange21"

                          :allow_add="false"
                          :allow_edit="true"
                          :allow_delete="true"
                          v-on:receiveHandleAdd="handleReceiveHandleAdd21"
                          v-on:receiveHandleEditDetails="handleReceiveHandleEdit21"
                          v-on:receiveHandleDelete="handleReceiveHandleDelete21"

                          :filter_mode_on="filter_mode_on"
                          v-on:receiveColumnRearrange="handleColumnRearrange21"
                          v-on:filter_column="handleFilterColumn21"
                          :forceLoading="forceLoading"
                          :column_reordering="false"
                          :row_reordering="false"
                          v-on:receiveHandleClearFilter="handleClearFilter21"

                          :pass_visible_columns="visibleColumns21"
                          />

                        </div>
                      </div>
                      <div :class="['row', active_section5 != 'Promo Discount' && 'hide_section']">

                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom: 10px; padding-right: 10px;">


                          <Table
                          :row_per_page="[5,10,20,50]"
                          :title="table_title22"
                          :table_data="table_data22"
                          :table_column="table_column22"
                          :flat_status="true"
                          :bordered_status="true"
                          v-on:receiveRequestTable="handleTableChange22"

                          :allow_add="false"
                          :allow_edit="true"
                          :allow_delete="true"
                          v-on:receiveHandleAdd="handleReceiveHandleAdd22"
                          v-on:receiveHandleEditDetails="handleReceiveHandleEdit22"
                          v-on:receiveHandleDelete="handleReceiveHandleDelete22"

                          :filter_mode_on="filter_mode_on"
                          v-on:receiveColumnRearrange="handleColumnRearrange22"
                          v-on:filter_column="handleFilterColumn22"
                          :forceLoading="forceLoading"
                          :column_reordering="false"
                          :row_reordering="false"
                          v-on:receiveHandleClearFilter="handleClearFilter22"

                          :pass_visible_columns="visibleColumns22"
                          />

                        </div>
                      </div>
                      <div :class="['row', active_section5 != 'Permanent Discount' && 'hide_section']">

                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom: 10px; padding-right: 10px;">


                          <Table
                          :row_per_page="[5,10,20,50]"
                          :title="table_title12"
                          :table_data="table_data12"
                          :table_column="table_column12"
                          :flat_status="true"
                          :bordered_status="true"
                          v-on:receiveRequestTable="handleTableChange12"

                          :allow_add="false"
                          :allow_edit="true"
                          :allow_delete="true"
                          v-on:receiveHandleAdd="handleReceiveHandleAdd12"
                          v-on:receiveHandleEditDetails="handleReceiveHandleEdit12"
                          v-on:receiveHandleDelete="handleReceiveHandleDelete12"

                          :filter_mode_on="filter_mode_on"
                          v-on:receiveColumnRearrange="handleColumnRearrange12"
                          v-on:filter_column="handleFilterColumn12"
                          :forceLoading="forceLoading"
                          :column_reordering="false"
                          :row_reordering="false"
                          v-on:receiveHandleClearFilter="handleClearFilter12"

                          :pass_visible_columns="visibleColumns12"
                          />

                        </div>
                      </div>
                      <div :class="['row', active_section5 != 'Price Break' && 'hide_section']">

                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom: 10px; padding-right: 10px;">


                          <Table
                          :row_per_page="[5,10,20,50]"
                          :title="table_title13"
                          :table_data="table_data13"
                          :table_column="table_column13"
                          :flat_status="true"
                          :bordered_status="true"
                          v-on:receiveRequestTable="handleTableChange13"

                          :allow_add="false"
                          :allow_edit="true"
                          :allow_delete="true"
                          v-on:receiveHandleAdd="handleReceiveHandleAdd13"
                          v-on:receiveHandleEditDetails="handleReceiveHandleEdit13"
                          v-on:receiveHandleDelete="handleReceiveHandleDelete13"

                          :filter_mode_on="filter_mode_on"
                          v-on:receiveColumnRearrange="handleColumnRearrange13"
                          v-on:filter_column="handleFilterColumn13"
                          :forceLoading="forceLoading"
                          :column_reordering="false"
                          :row_reordering="false"
                          v-on:receiveHandleClearFilter="handleClearFilter13"

                          :pass_visible_columns="visibleColumns13"
                          />

                        </div>
                      </div>
                    </q-tab-panel>

                    <q-tab-panel name="Inventory" style="padding: 0px; padding-top: 10px; color: grey;overflow: hidden">
                      <div class="row">
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom: 10px;">

                          <Button v-on:receiveClick="handleActiveClickSection8('QOH by Site')"
                            :pass_label="'QOH by Site'"
                            :pass_no_caps="true"
                            :pass_square="true"
                            :pass_dense="true"
                            :class="[active_section8 == 'QOH by Site' ? 'active_section_button' : 'inactive_section_button']"
                          />
                          <Button v-on:receiveClick="handleActiveClickSection8('Movement by Site')"
                            :pass_label="'Movement by Site'"
                            :pass_no_caps="true"
                            :pass_square="true"
                            :pass_dense="true"
                            :class="[active_section8 == 'Movement by Site' ? 'active_section_button' : 'inactive_section_button']"
                          />
                          <Button v-on:receiveClick="handleActiveClickSection8('Movement by Location')"
                            :pass_label="'Movement by Location'"
                            :pass_no_caps="true"
                            :pass_square="true"
                            :pass_dense="true"
                            :class="[active_section8 == 'Movement by Location' ? 'active_section_button' : 'inactive_section_button']"
                          />

                        </div>
                      </div>

                      <div :class="['row', active_section8 != 'QOH by Site' && 'hide_section']">

                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom: 10px; padding-right: 10px;">


                          <Table
                          :row_per_page="[5,10,20,50]"
                          :title="table_title23"
                          :table_data="table_data23"
                          :table_column="table_column23"
                          :flat_status="true"
                          :bordered_status="true"
                          v-on:receiveRequestTable="handleTableChange23"

                          :allow_add="false"
                          :allow_edit="true"
                          :allow_delete="true"
                          v-on:receiveHandleAdd="handleReceiveHandleAdd23"
                          v-on:receiveHandleEditDetails="handleReceiveHandleEdit23"
                          v-on:receiveHandleDelete="handleReceiveHandleDelete23"

                          :filter_mode_on="filter_mode_on"
                          v-on:receiveColumnRearrange="handleColumnRearrange23"
                          v-on:filter_column="handleFilterColumn23"
                          :forceLoading="forceLoading"
                          :column_reordering="false"
                          :row_reordering="false"
                          v-on:receiveHandleClearFilter="handleClearFilter23"

                          :pass_visible_columns="visibleColumns23"
                          />

                        </div>
                      </div>

                      <div :class="['row', active_section8 != 'Movement by Site' && 'hide_section']">

                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom: 10px; padding-right: 10px;">


                          <Table
                          :row_per_page="[5,10,20,50]"
                          :title="table_title29"
                          :table_data="table_data29"
                          :table_column="table_column29"
                          :flat_status="true"
                          :bordered_status="true"
                          v-on:receiveRequestTable="handleTableChange29"

                          :allow_add="false"
                          :allow_edit="true"
                          :allow_delete="true"
                          v-on:receiveHandleAdd="handleReceiveHandleAdd29"
                          v-on:receiveHandleEditDetails="handleReceiveHandleEdit29"
                          v-on:receiveHandleDelete="handleReceiveHandleDelete29"

                          :filter_mode_on="filter_mode_on"
                          v-on:receiveColumnRearrange="handleColumnRearrange29"
                          v-on:filter_column="handleFilterColumn29"
                          :forceLoading="forceLoading"
                          :column_reordering="false"
                          :row_reordering="false"
                          v-on:receiveHandleClearFilter="handleClearFilter29"

                          :pass_visible_columns="visibleColumns29"
                          />

                        </div>
                      </div>

                      <div :class="['row', active_section8 != 'Movement by Location' && 'hide_section']">

                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom: 10px; padding-right: 10px;">


                          <Table
                          :row_per_page="[5,10,20,50]"
                          :title="table_title30"
                          :table_data="table_data30"
                          :table_column="table_column30"
                          :flat_status="true"
                          :bordered_status="true"
                          v-on:receiveRequestTable="handleTableChange30"

                          :allow_add="false"
                          :allow_edit="true"
                          :allow_delete="true"
                          v-on:receiveHandleAdd="handleReceiveHandleAdd30"
                          v-on:receiveHandleEditDetails="handleReceiveHandleEdit30"
                          v-on:receiveHandleDelete="handleReceiveHandleDelete30"

                          :filter_mode_on="filter_mode_on"
                          v-on:receiveColumnRearrange="handleColumnRearrange30"
                          v-on:filter_column="handleFilterColumn30"
                          :forceLoading="forceLoading"
                          :column_reordering="false"
                          :row_reordering="false"
                          v-on:receiveHandleClearFilter="handleClearFilter30"

                          :pass_visible_columns="visibleColumns30"
                          />

                        </div>
                      </div>
                    </q-tab-panel>

                    <q-tab-panel name="Change Log" style="padding: 0px; padding-top: 10px; color: grey;overflow: hidden">
                    </q-tab-panel>

                  </q-tab-panels>

                </div>
              </div>

            </q-card-actions>

          </q-card-section>
        </q-card>
      </q-form>
      <q-inner-loading
        :showing="showAddLoading"
        color="primary"
      />
  </div>

      <q-dialog v-model="generateDialog_RUOM" persistent position="top">
        <q-card style="width: 95vw; max-width: 950px; max-height: 90vh; margin-top: 5%;">

          <q-card-section class="row items-center dialog_header_custom">
              <div class="text-h6">Reassign UOM</div>
              <q-space />
              <q-btn icon="close" flat round dense :disable="loading_dialog" v-close-popup />
          </q-card-section>

          <q-card-section class="row">
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <q-form ref="save_form_dialog">
                <div class="row dialog_content">

                  <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12">

                      <div class="row">

                          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">

                              <div class="row">

                                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                      <div class="row" style="align-items: center;">
                                          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                              <Label :pass_value="'Ref No'" />
                                          </div>
                                          <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                            <Input
                                            :autofocusclick="true"
                                            :no_label="true"
                                            v-on:change="handleChange"
                                            v-model="json.RefNo"
                                            :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text_required" />
                                          </div>
                                      </div>
                                  </div>

                              </div>

                          </div>

                          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">

                              <div class="row">

                                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                      <div class="row" style="align-items: center;">
                                          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                              <Label :pass_value="'UOM From'" />
                                          </div>
                                          <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                              <Select
                                              v-model:pass_value="json.stock_type"
                                              v-on:receiveChange="handleChange"
                                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.select_required : oridbComponentBehavior.select"
                                              label=""
                                              :options="stock_options"
                                            />
                                          </div>
                                      </div>
                                  </div>

                              </div>

                          </div>
                          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">

                              <div class="row">

                                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                      <div class="row" style="align-items: center;">
                                          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                              <Label :pass_value="'UOM From'" />
                                          </div>
                                          <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                              <Select
                                              v-model:pass_value="json.stock_type"
                                              v-on:receiveChange="handleChange"
                                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.select_required : oridbComponentBehavior.select"
                                              label=""
                                              :options="stock_options"
                                            />
                                          </div>
                                      </div>
                                  </div>

                              </div>

                          </div>

                          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">

                              <div class="row">

                                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                      <div class="row" style="align-items: center;">
                                          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                              <Label :pass_value="'Effective Date'" />
                                          </div>
                                          <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                              <Datepicker class="new_input" v-on:receiveChange="handleChangeedate" :daterange="json.effective_date"
                                              :componentBehavior="dbComponentBehavior.text" :autoclose="true"/>
                                          </div>
                                      </div>
                                  </div>

                              </div>

                          </div>

                      </div>

                  </div>

                  <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12">
                    <div class="row">

                      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">

                          <div class="row">

                              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                  <div class="row" style="align-items: center;">
                                      <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                          <Label :pass_value="'Send'" />
                                      </div>
                                      <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                          <Button :disable="false" v-on:receiveClick="handleShowSendUOM"
                                            :pass_label="'Send'"
                                            :pass_no_caps="true"
                                            :pass_square="true"
                                            :pass_dense="true"
                                            :pass_flat="true"
                                            style="font-size: 12px; background-color: #26A69A; color: white; margin-left: 0px; margin-right: 10px;"
                                            />
                                      </div>
                                  </div>
                              </div>

                          </div>

                      </div>

                      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">

                          <div class="row">

                              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                  <div class="row" style="align-items: center;">
                                      <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                          <Label :pass_value="'Send By'" />
                                      </div>
                                      <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                          <Input
                                            :autofocusclick="true"
                                            :no_label="true"
                                            v-on:change="handleChange"
                                            v-model="json.send_by"
                                            :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text_required" />
                                      </div>
                                  </div>
                              </div>

                          </div>

                      </div>

                      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">

                          <div class="row">

                              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                  <div class="row" style="align-items: center;">
                                      <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                          <Label :pass_value="'Send At'" />
                                      </div>
                                      <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                          <Datepicker class="new_input" v-on:receiveChange="handleChange" :daterange="json.send_at"
                                          :componentBehavior="dbComponentBehavior.text" :autoclose="true"/>
                                      </div>
                                  </div>
                              </div>

                          </div>

                      </div>

                    </div>
                  </div>

                  <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12">
                    <div class="row">

                      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">

                          <div class="row">

                              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                  <div class="row" style="align-items: center;">
                                      <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                          <Label :pass_value="'Approved'" />
                                      </div>
                                      <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                          <Button :disable="false" v-on:receiveClick="handleShowSendUOM"
                                            :pass_label="'Approved'"
                                            :pass_no_caps="true"
                                            :pass_square="true"
                                            :pass_dense="true"
                                            :pass_flat="true"
                                            style="font-size: 12px; background-color: #26A69A; color: white; margin-left: 0px; margin-right: 10px;"
                                            />
                                      </div>
                                  </div>
                              </div>

                          </div>

                      </div>

                      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">

                          <div class="row">

                              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                  <div class="row" style="align-items: center;">
                                      <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                          <Label :pass_value="'Approved By'" />
                                      </div>
                                      <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                          <Input
                                            :autofocusclick="true"
                                            :no_label="true"
                                            v-on:change="handleChange"
                                            v-model="json.approved_by"
                                            :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text_required" />
                                      </div>
                                  </div>
                              </div>

                          </div>

                      </div>

                      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">

                          <div class="row">

                              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                  <div class="row" style="align-items: center;">
                                      <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                          <Label :pass_value="'Approved At'" />
                                      </div>
                                      <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                          <Datepicker class="new_input" v-on:receiveChange="handleChange" :daterange="json.approved_at"
                                          :componentBehavior="dbComponentBehavior.text" :autoclose="true"/>
                                      </div>
                                  </div>
                              </div>

                          </div>

                      </div>

                    </div>
                  </div>

                  <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12">
                    <div class="row">

                      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">

                          <div class="row">

                              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                  <div class="row" style="align-items: center;">
                                      <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                          <Label :pass_value="'Posted'" />
                                      </div>
                                      <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                          <Button :disable="false" v-on:receiveClick="handleShowSendUOM"
                                            :pass_label="'Posted'"
                                            :pass_no_caps="true"
                                            :pass_square="true"
                                            :pass_dense="true"
                                            :pass_flat="true"
                                            style="font-size: 12px; background-color: #26A69A; color: white; margin-left: 0px; margin-right: 10px;"
                                            />
                                      </div>
                                  </div>
                              </div>

                          </div>

                      </div>

                      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">

                          <div class="row">

                              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                  <div class="row" style="align-items: center;">
                                      <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                          <Label :pass_value="'Posted By'" />
                                      </div>
                                      <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                          <Input
                                            :autofocusclick="true"
                                            :no_label="true"
                                            v-on:change="handleChange"
                                            v-model="json.posted_by"
                                            :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text_required" />
                                      </div>
                                  </div>
                              </div>

                          </div>

                      </div>

                      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">

                          <div class="row">

                              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px; margin-bottom: 10px;">
                                  <div class="row" style="align-items: center;">
                                      <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                          <Label :pass_value="'Posted At'" />
                                      </div>
                                      <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                          <Datepicker class="new_input" v-on:receiveChange="handleChange" :daterange="json.posted_at"
                                          :componentBehavior="dbComponentBehavior.text" :autoclose="true"/>
                                      </div>
                                  </div>
                              </div>

                          </div>

                      </div>

                    </div>
                  </div>



                </div>
              </q-form>
            </div>
          </q-card-section>

          <q-card-actions class="dialog_action_reassign" align="right">
              <q-btn flat label="Cancel" color="primary" v-close-popup/>
              <q-btn flat label="Confirm" color="primary" @click="confirmFilter" />
          </q-card-actions>

          <q-inner-loading
          :showing="loading_dialog"
          color="primary"
          />
        </q-card>
      </q-dialog>

      <q-dialog v-model="show_barcode_dialog" persistent :position="$q.screen.width > 599 ? 'top' : 'bottom'">

        <q-card style="width: 95vw; max-width: 500px; max-height: 90vh; margin-top: 5%;">
          <q-card-section class="row items-center dialog_header_custom">
              <div v-if="edit_barcode" class="text-h6">Edit Barcode</div>
              <div v-else class="text-h6">Add Barcode</div>
              <q-space />
              <q-btn icon="close" flat round dense @click="close()" :disable="barcode.loading"/>
          </q-card-section>

          <q-card-section class="upload_container">
            <q-form ref="save_barcode_form">
              <div class="row upload_separator_first">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                      <div class="row dialog_content">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 four_column_left" :class="!edit_child ? 'two_column_left': ''">
                                <div class="row dialog_separator">
                                  <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                    <Label :pass_value="$language('D0099')" />
                                  </div>
                                  <!-- :label="edit_barcode ? 'Old Barcode': $language('D0099')" -->
                                  <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                    <Input
                                    :autofocusclick="true"
                                    :readonly="page_function === 'view'"
                                    :disable="edit_barcode"
                                    :no_label="false"
                                    v-on:change="handleChangeBarcode"
                                    v-model="jsonBarcode.Barcode"
                                    :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text_required" />
                                  </div>
                                </div>
                        </div>

                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 four_column_left" :class="!edit_child ? 'two_column_left': ''">
                                <div class="row dialog_separator">

                                    <!-- v-on:change="handleChangeBarcode" -->
                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                    <Label :pass_value="'Description'" />
                                  </div>
                                  <!-- :label="edit_barcode ? 'Old Barcode': $language('D0099')" -->
                                  <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                    <Input
                                    :autofocusclick="true"
                                    :no_label="false"
                                    :readonly="page_function == 'view'"
                                    v-on:change="handleChange"
                                    v-model="jsonBarcode.barDesc"
                                    :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text_required" />
                                  </div>

                              </div>
                            </div>

                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 four_column_left">
                                <div class="row dialog_separator">
                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                    <Label :pass_value="'Remark'" />
                                  </div>
                                  <!-- :label="edit_barcode ? 'Old Barcode': $language('D0099')" -->
                                  <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                    <Textarea :autofocusclick="true" class="ignore_height" :readonly="page_function == 'view'" :no_label="false" v-on:receiveChange="handleChange" v-model="jsonBarcode.barRemark"
                                  :dbComponentBehavior="dbComponentBehavior.remark" />
                                  </div>
                                  </div>

                              </div>

                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 four_column_left">
                                <div class="row dialog_separator">
                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                    <Label :pass_value="'Primary'" />
                                  </div>
                                  <!-- :label="edit_barcode ? 'Old Barcode': $language('D0099')" -->
                                  <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                    <q-toggle
                                      dense
                                      style="padding-top: 7px; padding-bottom: 7px;"
                                      :false-value="0"
                                      :true-value="1"
                                      color="green"
                                      v-model="jsonBarcode.primary_barcode"
                                    />
                                  </div>
                                  </div>

                              </div>


                      </div>
                </div>
              </div>
            </q-form>
          </q-card-section>

          <q-card-actions class="dialog_action" align="right">
            <Button v-on:receiveClick="close"
              v-if="page_function != 'view'"
              :pass_label="'Cancel'"
              :pass_no_caps="true"
              :pass_square="true"
              :pass_dense="true"
              v-close-popup
            />
            <Button v-on:receiveClick="handleAddBarcode"
              v-if="page_function != 'view'"
              :pass_label="'Save'"
              :pass_no_caps="true"
              :pass_square="true"
              :pass_dense="true"
              class="custom_button"
            />

          </q-card-actions>


          <q-inner-loading
            :showing="barcode.loading"
            color="primary"
          />
        </q-card>

      </q-dialog>

      <q-dialog v-model="show_miscellaneous_dialog" persistent position="top">
        <q-card style="width: 95vw; max-width: 950px; max-height: 90vh; margin-top: 5%;">

          <q-card-section class="row items-center dialog_header_custom">
              <div v-if="miscellaneous_dialog_action == 'edit'" class="text-h6">Edit Miscellaneous</div>
              <div v-else class="text-h6">Add Miscellaneous</div>
              <q-space />
              <q-btn icon="close" flat round dense :disable="miscellaneous_dialog_loading" @click="close" />
          </q-card-section>

          <q-card-section>
            <q-form ref="save_child_form">
              <div class="row dialog_content">
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div class="row">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6">
                      <div class="row">
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                        <div class="row" style="align-items: center;">
                            <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                                <Label :pass_value="'Active'" />
                            </div>
                            <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                              <q-toggle
                                dense
                                style="padding-top: 7px; padding-bottom: 7px;"
                                :false-value="0"
                                :true-value="1"
                                color="green"
                                v-model="miscjson.set_active"
                              />
                            </div>
                        </div>
                        </div>
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="padding-right: 10px;min-height: 36px;">
                          <div class="row" style="align-items: center;">
                              <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                                  <Label :pass_value="'Group'" />
                              </div>
                              <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                                <Select
                                :readonly="page_function == 'view'"
                                v-model:pass_value="miscjson.misc_group"
                                v-on:receiveChange="handleChange"
                                :dbComponentBehavior="dbComponentBehavior.select"
                                label=""
                                :options="miscellaneousGroup_options"
                                :pass_overwrite_display="'value'"
                                />
                              </div>
                          </div>
                        </div>
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="padding-right: 10px;min-height: 36px;">
                          <div class="row" style="align-items: center;">
                              <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                                  <Label :pass_value="'Text 1'" />
                              </div>
                              <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                                <Input :readonly="page_function == 'view'" :autofocusclick="true"
                                v-model:pass_value="miscjson.text1"
                                v-on:receiveChange="handleChange"
                                :dbComponentBehavior="dbComponentBehavior.text"/>
                              </div>
                          </div>
                        </div>
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="padding-right: 10px;min-height: 36px;">
                    <div class="row" style="align-items: center;">
                        <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                            <Label :pass_value="'Value 1'" />
                        </div>
                        <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                          <Input :readonly="page_function == 'view'" :autofocusclick="true"
                          v-model:pass_value="miscjson.value1"
                          v-on:receiveChange="handleChange"
                          :dbComponentBehavior="dbComponentBehavior.text"/>
                        </div>
                    </div>
                        </div>
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="padding-right: 10px;min-height: 36px;">
                    <div class="row" style="align-items: center;">
                        <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                            <Label :pass_value="'Text 2'" />
                        </div>
                        <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                          <Input :readonly="page_function == 'view'" :autofocusclick="true"
                          v-model:pass_value="miscjson.text2"
                          v-on:receiveChange="handleChange"
                          :dbComponentBehavior="dbComponentBehavior.text"/>
                        </div>
                    </div>
                        </div>
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="padding-right: 10px;min-height: 36px;">
                            <div class="row" style="align-items: center;">
                                <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                                    <Label :pass_value="'Value 2'" />
                                </div>
                                <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                                  <Input :readonly="page_function == 'view'" :autofocusclick="true"
                                  v-model:pass_value="miscjson.value2"
                                  v-on:receiveChange="handleChange"
                                  :dbComponentBehavior="dbComponentBehavior.text"/>
                                </div>
                            </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6">
                      <div class="row">
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="padding-right: 10px;min-height: 36px;">
                        <div class="row" style="align-items: center;">
                            <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                                <Label :pass_value="'Seq'" />
                            </div>
                            <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                              <Input :readonly="page_function == 'view'" :autofocusclick="true"
                              v-model:pass_value="miscjson.seq"
                              v-on:receiveChange="handleChange"
                              :dbComponentBehavior="dbComponentBehavior.text_right"/>
                            </div>
                        </div>
                        </div>
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="padding-right: 10px;min-height: 36px;">
                        <div class="row" style="align-items: center;">
                            <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                                <Label :pass_value="'Remarks'" />
                            </div>
                            <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                              <Input :readonly="page_function == 'view'" :autofocusclick="true"
                              v-model:pass_value="miscjson.remark"
                              v-on:receiveChange="handleChange"
                              :dbComponentBehavior="dbComponentBehavior.text"/>
                            </div>
                        </div>
                        </div>
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="padding-right: 10px;min-height: 36px;">
                        <div class="row" style="align-items: center;">
                            <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                                <Label :pass_value="'Created At'" />
                            </div>
                            <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                              <Input :autofocusclick="true"
                              :disable="page_function != 'view'"
                              :readonly="page_function == 'view'"
                              v-model:pass_value="miscjson.created_at"
                              v-on:receiveChange="handleChange"
                              :dbComponentBehavior="dbComponentBehavior.text_required"/>
                            </div>
                        </div>
                        </div>
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="padding-right: 10px;min-height: 36px;">
                            <div class="row" style="align-items: center;">
                                <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                                    <Label :pass_value="'Created By'" />
                                </div>
                                <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                                  <Input :autofocusclick="true"
                                  :disable="page_function != 'view'"
                                  :readonly="page_function == 'view'"
                                  v-model:pass_value="miscjson.created_by"
                                  v-on:receiveChange="handleChange"
                                  :dbComponentBehavior="dbComponentBehavior.text_required"/>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="padding-right: 10px;min-height: 36px;">
                            <div class="row" style="align-items: center;">
                                <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                                    <Label :pass_value="'Updated At'" />
                                </div>
                                <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                                  <Input :autofocusclick="true"
                                  :disable="page_function != 'view'"
                                  :readonly="page_function == 'view'"
                                  v-model:pass_value="miscjson.updated_at"
                                  v-on:receiveChange="handleChange"
                                  :dbComponentBehavior="dbComponentBehavior.text_required"/>
                                </div>
                            </div>
                        </div>                       
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="padding-right: 10px;min-height: 36px;">
                            <div class="row" style="align-items: center;">
                                <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                                    <Label :pass_value="'Updated By'" />
                                </div>
                                <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                                  <Input :autofocusclick="true"
                                  :disable="page_function != 'view'"
                                  :readonly="page_function == 'view'"
                                  v-model:pass_value="miscjson.updated_by"
                                  v-on:receiveChange="handleChange"
                                  :dbComponentBehavior="dbComponentBehavior.text_required"/>
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

          <q-card-actions class="dialog_action" align="right">
            <Button v-on:receiveClick="close"
              v-if="page_function != 'view'"
              :pass_label="'Cancel'"
              :pass_no_caps="true"
              :pass_square="true"
              :pass_dense="true"
            />

            <Button v-on:receiveClick="handleAddMiscellaneous"
              v-if="page_function != 'view'"
              :pass_label="'Save'"
              :pass_no_caps="true"
              :pass_square="true"
              :pass_dense="true"
              class="custom_button"
            />
          </q-card-actions>

          <q-inner-loading
            :showing="miscellaneous_dialog_loading"
            color="primary"
          />
        </q-card>
      </q-dialog>

      <q-dialog v-model="show_assortment_dialog" persistent :position="$q.screen.width > 599 ? 'top' : 'bottom'">

        <q-card style="width: 95vw; max-width: 950px; max-height: 90vh; margin-top: 5%;">
          <q-card-section class=" row dialog_header_custom" style="padding: 0px;">
              <div v-if="edit_assortment" class="text-h6" style="margin-top: 5px;">Edit Assortment<br></div>
              <div v-else class="text-h6" style="margin-top: 5px;">Add Assortment<br></div>
              <q-space />
              <q-btn icon="close" flat round dense @click="close()" :disable="assortment.loading"/>
          </q-card-section>

          <q-card-section class="upload_container">
            <q-form ref="save_edit_pochild_form">
              <div class="row upload_separator_first">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                      <div class="row input_wrapper_left_right" style="gap:16px;padding-top:16px">

                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 " :class="!edit_child ? '': ''">
                          <div class="row">
                            <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8" style="padding-right: 10px;">
                                  <div class="row" style="align-items: center;">
                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                      <Label :pass_value="'Assorted Item Description'" />
                                    </div>
                                    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                      <Input
                                          :autofocusclick="false"
                                          :no_label="false"
                                          :readonly="page_function == 'view'"
                                          v-on:change="handleChange"
                                          v-model="ajson.assorted_desc"

                                          :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.text : oridbComponentBehavior.text" />
                                    </div>
                                    </div>
                            </div>
                            <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8" style="padding-right: 10px;">
                                  <div class="row" style="align-items: center;">
                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                      <Label :pass_value="'Assorted Item Description C'" />
                                    </div>
                                    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                      <Input
                                          :autofocusclick="false"
                                          :no_label="false"
                                          :readonly="page_function == 'view'"
                                          v-on:change="handleChange"
                                          v-model="ajson.set_assorted_item__assorted_desc"

                                          :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.text : oridbComponentBehavior.text" />
                                    </div>
                                    </div>
                            </div>
                            <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8" style="padding-right: 10px;padding-top:10px">
                                  <div class="row" style="align-items: center;">
                                      <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                        <Label :pass_value="'Itemcode'" />
                                      </div>
                                      <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                        <SelectFilter
                                          :readonly="page_function == 'view'"
                                          :no_label="true"
                                          v-model:pass_value="ajson.Itemcode"
                                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.select"
                                          :options="itemcode_options"
                                          v-on:receiveChange="handleChange"
                                          :result_message ="'No results'"
                                          />
                                      </div>
                                    </div>
                            </div>
                            <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8" style="padding-right: 10px;padding-top:10px">
                                  <div class="row" style="align-items: center;">
                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                      <Label :pass_value="'Description'" />
                                    </div>
                                    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                      <Input
                                          :autofocusclick="false"
                                          :no_label="false"
                                          :readonly="page_function == 'view'"
                                          v-on:change="handleChange"
                                          v-model="ajson.description"
                                          :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.text : oridbComponentBehavior.text" />
                                    </div>
                                    </div>
                            </div>

                            <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8" style="padding-right: 10px; padding-top: 10px;">
                              <div class="row" style="align-items: center;">
                                  <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                    <Label :pass_value="'Remark'" />
                                  </div>
                                  <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                    <Input
                                      :autofocusclick="false"
                                      :no_label="false"
                                      :readonly="page_function == 'view'"
                                      v-on:change="handleChange"
                                      v-model="ajson.remark"
                                      :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.text : oridbComponentBehavior.text" />                        </div>
                                </div>
                            </div>


                          </div>
                        </div>
                    </div>
                </div>
              </div>
            </q-form>
          </q-card-section>


          <!-- EDIT BARCODE ADD BUTTON -->
          <!-- <q-card-actions class="dialog_action" style="padding-bottom: 16px;padding-right:16px;padding-top:0px" >
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-pt-md" align="right">

              <Button_icon
                :readonly="false"
                :flat="false"
                :font_color="'primary'"
                :color="'primary'"
                :text="$language('D0024')"
                :outline="false"
                size="16px"
                v-on:receiveClick="handleAddMiscellaneous"
                class="custom_primary_button" />
            </div>
          </q-card-actions> -->
          <q-card-actions class="dialog_action" align="right">
              <Button v-on:receiveClick="close"
                v-if="page_function != 'view'"
                :pass_label="'Cancel'"
                :pass_no_caps="true"
                :pass_square="true"
                :pass_dense="true"
              />

              <Button v-on:receiveClick="handleAddAssortment"
                v-if="page_function != 'view'"
                :pass_label="'Save'"
                :pass_no_caps="true"
                :pass_square="true"
                :pass_dense="true"
                class="custom_button"
              />
          <!-- <span class="q-pl-xs">
         <q-btn flat label="Cancel" color="primary" v-close-popup/>
          </span>
          <span class="q-pl-xs">
              <Button_icon  :readonly="false" :flat="true" :text="'Confirm'" size="15px"
                v-on:receiveClick="handleAddAssortment"/>
          </span> -->

          </q-card-actions>

          <q-inner-loading
            :showing="assortment.loading"
            color="primary"
          />
        </q-card>
      </q-dialog>

      <q-dialog v-model="show_promoDiscount_dialog" persistent :position="$q.screen.width > 599 ? 'top' : 'bottom'">

        <q-card style="width: 95vw; max-width: 950px; max-height: 90vh; margin-top: 5%;">
          <q-card-section class=" row dialog_header_custom" style="padding: 0px;">
              <div v-if="edit_promodiscount" class="text-h6" style="margin-top: 5px;">Edit Promo Discount<br></div>
              <div v-else class="text-h6" style="margin-top: 5px;">Add Promo Discount<br></div>
              <q-space />
              <q-btn icon="close" flat round dense @click="close()" :disable="false"/>
          </q-card-section>

          <q-card-section class="upload_container">
            <q-form ref="save_edit_pochild_form">
              <div class="row upload_separator_first">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                      <div class="row input_wrapper_left_right" style="gap:16px;padding-top:16px">

                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 " :class="!edit_child ? '': ''">
                          <div class="row">

                            <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7" style="padding-right: 10px;">
                                  <div class="row" style="align-items: center;">
                                      <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                        <Label :pass_value="'Assorted Item Description'" />
                                      </div>
                                      <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                        <Input
                                          :autofocusclick="false"
                                          :no_label="false"
                                          :readonly="false"
                                          v-on:change="handleChange"
                                          v-model="json.set_assorted_item__assorted_desc"
                                          :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.text : oridbComponentBehavior.text" />                        </div>
                                    </div>
                            </div>
                            <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5" style="padding-right: 10px;">
                                  <div class="row" style="align-items: center;">
                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                      <Label :pass_value="'Description'" />
                                    </div>
                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                      <Input
                                          :autofocusclick="false"
                                          :no_label="false"
                                          :readonly="false"
                                          v-on:change="handleChange"
                                          v-model="json.description"

                                          :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.text : oridbComponentBehavior.text" />
                                    </div>
                                    </div>
                            </div>

                            <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7" style="padding-right: 10px; padding-top: 10px;">
                              <div class="row" style="align-items: center;">
                                  <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                    <Label :pass_value="'Remark'" />
                                  </div>
                                  <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                    <Input
                                      :autofocusclick="false"
                                      :no_label="false"
                                      :readonly="false"
                                      v-on:change="handleChange"
                                      v-model="json.remark"
                                      :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.text : oridbComponentBehavior.text" />                        </div>
                                </div>
                            </div>


                          </div>
                        </div>
                    </div>
                </div>
              </div>
            </q-form>
          </q-card-section>


          <!-- EDIT BARCODE ADD BUTTON -->
          <!-- <q-card-actions class="dialog_action" style="padding-bottom: 16px;padding-right:16px;padding-top:0px" >
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-pt-md" align="right">

              <Button_icon
                :readonly="false"
                :flat="false"
                :font_color="'primary'"
                :color="'primary'"
                :text="$language('D0024')"
                :outline="false"
                size="16px"
                v-on:receiveClick="handleAddMiscellaneous"
                class="custom_primary_button" />
            </div>
          </q-card-actions> -->
          <q-card-actions class="dialog_action justify-between">
          <span class="q-pl-xs">
         <q-btn flat label="Cancel" color="primary" v-close-popup/>
          </span>
          <span class="q-pl-xs">
              <Button_icon  :readonly="false" :flat="true" :text="'Confirm'" size="15px"
                v-on:receiveClick="handleAddPromoDisc"/>
          </span>

          </q-card-actions>

          <q-inner-loading
            :showing="showAddLoading"
            color="primary"
          />
        </q-card>
      </q-dialog>

      <q-dialog v-model="show_listed_branch_dialog" persistent :position="$q.screen.width > 599 ? 'top' : 'bottom'">


      <q-card style="width: 95vw; max-width: 500px; max-height: 90vh; margin-top: 5%;">
      <q-card-section class="row items-center dialog_header_custom">
          <div v-if="edit_listed_branch" class="text-h6">Edit Banner/Site</div>
          <div v-else class="text-h6">Add Banner/Site</div>
          <q-space />
          <q-btn icon="close" flat round dense @click="close()" :disable="branch.loading"/>
      </q-card-section>

      <q-card-section>
        <q-form ref="save_edit_pochild_form">
          <div class="row dialog_content">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <div class="row">

                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 " :class="!edit_child ? '': ''">
                      <div class="row" style="align-items: center;">
                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                          <Label :pass_value="'Banner/Site'" />
                        </div>
                        <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                          <SelectFilter
                            :readonly="page_function == 'view'"
                            :no_label="true"
                            v-model:pass_value="bjson.branch"
                            :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.select"
                            :options="listedBranch_options"
                            v-on:receiveChange="handleChangelistedBranchConcept"
                            :result_message ="'No results'"
                            />
                        </div>
                      </div>
                    </div>
                    <!-- <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-top: 5px;">
                      <div class="row" style="align-items: center;">
                          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                            <Label :pass_value="'Item Type'" />
                          </div>
                          <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                              <Select
                              :readonly="page_function == 'view'"
                              v-model:pass_value="bjson.ItemType"
                                v-on:receiveChange="null"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.select : oridbComponentBehavior.select"
                              label=""
                              :options="item_type_options"
                              />

                            </div>
                        </div>
                    </div> -->
                </div>
            </div>
          </div>
        </q-form>
      </q-card-section>

      <!-- <q-card-actions class="dialog_action" style="padding-bottom: 16px;padding-right:16px;padding-top:0px">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-pt-md" align="right">
          <Button_icon  :readonly="false" :flat="false" :font_color="'primary'" :color="'primary'" :text="$language('D0024')" :outline="false" size="16px"
          v-on:receiveClick="handleAddListedBranch" class="custom_primary_button"/>
        </div>
      </q-card-actions> -->
      <q-card-actions class="dialog_action" align="right">
        <Button v-on:receiveClick="close"
          v-if="page_function != 'view'"
          :pass_label="'Cancel'"
          :pass_no_caps="true"
          :pass_square="true"
          :pass_dense="true"
        />
        <Button v-on:receiveClick="handleAddListedBranch"
          v-if="page_function != 'view'"
          :pass_label="'Save'"
          :pass_no_caps="true"
          :pass_square="true"
          :pass_dense="true"
          class="custom_button"
        />
          <!-- <span class="q-pl-xs">
         <q-btn flat label="Cancel" color="primary" v-close-popup/>
          </span>
          <span class="q-pl-xs">
              <Button_icon  :readonly="false" :flat="true" :text="'Confirm'" size="15px"
                v-on:receiveClick="handleAddListedBranch"/>
          </span> -->

          </q-card-actions>

      <q-inner-loading
      :showing="branch.loading"
      color="primary"
    />
      </q-card>

      </q-dialog>

      <q-dialog v-model="show_itemtype_dialog" persistent :position="$q.screen.width > 599 ? 'top' : 'bottom'">
        <q-card style="width: 95vw; max-width: 950px; max-height: 90vh; margin-top: 5%;">
          <q-card-section class=" row dialog_header_custom" style="padding: 0px;">
              <div v-if="edit_itemtype" class="text-h6" style="margin-top: 5px;">Edit ItemType<br></div>
              <div v-else class="text-h6" style="margin-top: 5px;">Add ItemType<br></div>
              <q-space />
              <q-btn icon="close" flat round dense @click="close()" :disable="false"/>
          </q-card-section>

          <q-card-section class="upload_container">
            <q-form ref="save_edit_pochild_form">
              <div class="row upload_separator_first">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                      <div class="row input_wrapper_left_right" style="gap:16px;padding-top:16px">

                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 " :class="!edit_itemtype ? '': ''">
                          <div class="row">
                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px;">
                                  <div class="row" style="align-items: center;">
                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                      <Label :pass_value="'Concept'" />
                                    </div>
                                    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                      <Input
                                          :autofocusclick="false"
                                          :no_label="false"
                                          :readonly="false"
                                          v-on:change="handleChangeConcept"
                                          v-model="json.concept"
                                          type="number"
                                          :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.text : oridbComponentBehavior.text" />
                                    </div>
                                    </div>
                            </div>
                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px;">
                                  <div class="row" style="align-items: center;">
                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                      <Label :pass_value="'Item Type'" />
                                    </div>
                                    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                      <Input
                                          :autofocusclick="false"
                                          :no_label="false"
                                          :readonly="false"
                                          v-on:change="handleChangeItemtype"
                                          v-model="json.itemtype"
                                          type="number"
                                          :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.text : oridbComponentBehavior.text" />
                                    </div>
                                    </div>
                            </div>

                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px; padding-top:10px">
                              <div class="row" style="align-items: center;">
                                  <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                    <Label :pass_value="'Date From'" />
                                  </div>
                                  <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                    <!-- <Input
                                      :autofocusclick="false"
                                      :no_label="false"
                                      :readonly="false"
                                      v-on:change="handleChangeDayFrom"
                                      v-model="json.date_from"
                                      :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.input_number : oridbComponentBehavior.input_number" /> -->
                                    <Datepicker
                                      :clickableInput="true"
                                      :no_label="false"
                                      :disable="false"
                                      :autoclose="true"

                                      v-on:receiveChange="handleChangeDayFrom"
                                      :daterange="date_from"
                                      :componentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text" />
                                      </div>
                                      </div>
                            </div>
                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px; padding-top:10px">
                              <div class="row" style="align-items: center;">
                                  <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                    <Label :pass_value="'Date To'" />
                                  </div>
                                  <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                    <!-- <Input
                                      :autofocusclick="false"
                                      :no_label="false"
                                      :readonly="false"
                                      v-on:change="handleChangeDayTo"
                                      v-model="json.date_to"
                                      :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.input_number : oridbComponentBehavior.input_number" /> -->
                                      <Datepicker
                                      :clickableInput="true"
                                      :no_label="false"
                                      :disable="false"
                                      :autoclose="true"

                                      v-on:receiveChange="handleChangeDayTo"
                                      :daterange="date_to"
                                      :componentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text" />                       </div>
                                </div>
                            </div>

                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px; padding-top:10px">
                              <div class="row" style="align-items: center;">
                                  <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                    <Label :pass_value="'Cancelled'" />
                                  </div>
                                  <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                    <Input
                                      :autofocusclick="false"
                                      :no_label="false"
                                      :readonly="false"
                                      v-on:change="handleChangeCancelled"
                                      v-model="json.cancel"
                                      :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.input_number : oridbComponentBehavior.input_number" />                        </div>
                                </div>
                            </div>

                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px; padding-top:10px">
                              <div class="row" style="align-items: center;">
                                  <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                    <Label :pass_value="'Cancelled At'" />
                                  </div>
                                  <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                    <Input
                                      :autofocusclick="false"
                                      :no_label="false"
                                      :readonly="false"
                                      v-on:change="handleChangeCancelledAt"
                                      v-model="json.cancel_at"
                                      :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.text : oridbComponentBehavior.text" />                        </div>
                                </div>
                            </div>
                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px; padding-top:10px">
                              <div class="row" style="align-items: center;">
                                  <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                    <Label :pass_value="'Last Ref No'" />
                                  </div>
                                  <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                    <Input
                                      :autofocusclick="false"
                                      :no_label="false"
                                      :readonly="false"
                                      v-on:change="handleChangelast_refno"
                                      v-model="json.last_refno"
                                      :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.input_number : oridbComponentBehavior.input_number" />                        </div>
                                </div>
                            </div>

                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px; padding-top:10px">
                              <div class="row" style="align-items: center;">
                                  <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                    <Label :pass_value="'FutureEffectiveDate'" />
                                  </div>
                                  <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                    <!-- <Input
                                      :autofocusclick="false"
                                      :no_label="false"
                                      :readonly="false"
                                      v-on:change="handleChangeFutureEffectiveDate"
                                      v-model="json.future_eff_date"
                                      :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.text : oridbComponentBehavior.text" /> -->
                                      <Datepicker
                                      :clickableInput="true"
                                      :no_label="false"
                                      :disable="false"
                                      :autoclose="true"

                                      v-on:receiveChange="handleChangeDayTo"
                                      :daterange="future_eff_date"
                                      :componentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text" />                        </div>
                                </div>
                            </div>


                          </div>
                        </div>
                    </div>
                </div>
              </div>
            </q-form>
          </q-card-section>


          <!-- EDIT BARCODE ADD BUTTON -->
          <!-- <q-card-actions class="dialog_action" style="padding-bottom: 16px;padding-right:16px;padding-top:0px" >
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-pt-md" align="right">

              <Button_icon
                :readonly="false"
                :flat="false"
                :font_color="'primary'"
                :color="'primary'"
                :text="$language('D0024')"
                :outline="false"
                size="16px"
                v-on:receiveClick="handleAddPaymentTermC"
                class="custom_primary_button" />
            </div>
          </q-card-actions> -->

          <q-card-actions class="dialog_action justify-between">
          <span class="q-pl-xs">
         <q-btn flat label="Cancel" color="primary" v-close-popup/>
          </span>
          <span class="q-pl-xs">
              <Button_icon  :readonly="false" :flat="true" :text="'Confirm'" size="15px"
                v-on:receiveClick="handleAddPaymentTermC"/>
          </span>

          </q-card-actions>

          <q-inner-loading
            :showing="showAddLoading"
            color="primary"
          />
        </q-card>
      </q-dialog>

      <q-dialog v-model="show_pricetype_dialog" persistent :position="$q.screen.width > 599 ? 'top' : 'bottom'">
        <q-card style="width: 95vw; max-width: 950px; max-height: 90vh; margin-top: 5%;">
          <q-card-section class=" row dialog_header_custom" style="padding: 0px;">
              <div v-if="edit_itemtype" class="text-h6" style="margin-top: 5px;">Edit PriceType<br></div>
              <div v-else class="text-h6" style="margin-top: 5px;">Add PriceType<br></div>
              <q-space />
              <q-btn icon="close" flat round dense @click="close()" :disable="false"/>
          </q-card-section>

          <q-card-section class="upload_container">
            <q-form ref="save_edit_pochild_form">
              <div class="row upload_separator_first">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                      <div class="row input_wrapper_left_right" style="gap:16px;padding-top:16px">

                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 " :class="!edit_pricetype ? '': ''">
                          <div class="row">
                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px;">
                                  <div class="row" style="align-items: center;">
                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                      <Label :pass_value="'Concept'" />
                                    </div>
                                    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                      <Input
                                          :autofocusclick="false"
                                          :no_label="false"
                                          :readonly="false"
                                          v-on:change="handleChangeConcept"
                                          v-model="json.concept"
                                          :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.text : oridbComponentBehavior.text" />
                                    </div>
                                    </div>
                            </div>
                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px;">
                                  <div class="row" style="align-items: center;">
                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                      <Label :pass_value="'Price Type'" />
                                    </div>
                                    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                      <Input
                                          :autofocusclick="false"
                                          :no_label="false"
                                          :readonly="false"
                                          v-on:change="handleChangePricetype"
                                          v-model="json.pricetype"
                                          :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.text : oridbComponentBehavior.text" />
                                    </div>
                                    </div>
                            </div>

                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px; padding-top: 10px;">
                                  <div class="row" style="align-items: center;">
                                      <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                        <Label :pass_value="'Date From'" />
                                      </div>
                                      <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                        <Input
                                          :autofocusclick="false"
                                          :no_label="false"
                                          :readonly="false"
                                          v-on:change="handleChangeDayFrom"
                                          v-model="json.date_from"
                                          :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.input_number : oridbComponentBehavior.input_number" />                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px; padding-top: 10px;">
                                  <div class="row" style="align-items: center;">
                                      <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                        <Label :pass_value="'Date To'" />
                                      </div>
                                      <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                        <Input
                                          :autofocusclick="false"
                                          :no_label="false"
                                          :readonly="false"
                                          v-on:change="handleChangeDayTo"
                                          v-model="json.date_to"
                                          :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.input_number : oridbComponentBehavior.input_number" />                        </div>
                                    </div>
                                </div>

                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm6 col-xs-6" style="padding-right: 10px; padding-top: 10px;">
                                  <div class="row" style="align-items: center;">
                                      <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                        <Label :pass_value="'Cancelled'" />
                                      </div>
                                      <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                        <Input
                                          :autofocusclick="false"
                                          :no_label="false"
                                          :readonly="false"
                                          v-on:change="handleChangeCancelled"
                                          v-model="json.cancel"
                                          :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.input_number : oridbComponentBehavior.input_number" />                        </div>
                                    </div>
                                </div>

                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px; padding-top: 10px;">
                                  <div class="row" style="align-items: center;">
                                      <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                        <Label :pass_value="'Cancelled At'" />
                                      </div>
                                      <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                        <Input
                                          :autofocusclick="false"
                                          :no_label="false"
                                          :readonly="false"
                                          v-on:change="handleChangeCancelledAt"
                                          v-model="json.cancel_at"
                                          :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.text : oridbComponentBehavior.text" />                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px; padding-top: 10px;">
                                  <div class="row" style="align-items: center;">
                                      <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                        <Label :pass_value="'Last Ref No'" />
                                      </div>
                                      <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                        <Input
                                          :autofocusclick="false"
                                          :no_label="false"
                                          :readonly="false"
                                          v-on:change="handleChangelast_refno"
                                          v-model="json.last_refno"
                                          :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.input_number : oridbComponentBehavior.input_number" />                        </div>
                                    </div>
                                </div>

                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px; padding-top: 10px;">
                                  <div class="row" style="align-items: center;">
                                      <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                        <Label :pass_value="'FutureEffectiveDate'" />
                                      </div>
                                      <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                        <Input
                                          :autofocusclick="false"
                                          :no_label="false"
                                          :readonly="false"
                                          v-on:change="handleChangeFutureEffectiveDate"
                                          v-model="json.future_eff_date"
                                          :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.text : oridbComponentBehavior.text" />                        </div>
                                    </div>
                                </div>


                          </div>
                        </div>
                    </div>
                </div>
              </div>
            </q-form>
          </q-card-section>


          <!-- EDIT BARCODE ADD BUTTON -->
          <!-- <q-card-actions class="dialog_action" style="padding-bottom: 16px;padding-right:16px;padding-top:0px" >
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-pt-md" align="right">

              <Button_icon
                :readonly="false"
                :flat="false"
                :font_color="'primary'"
                :color="'primary'"
                :text="$language('D0024')"
                :outline="false"
                size="16px"
                v-on:receiveClick="handleAddPaymentTermC"
                class="custom_primary_button" />
            </div>
          </q-card-actions> -->
          <q-card-actions class="dialog_action justify-between">
          <span class="q-pl-xs">
         <q-btn flat label="Cancel" color="primary" v-close-popup/>
          </span>
          <span class="q-pl-xs">
              <Button_icon  :readonly="false" :flat="true" :text="'Confirm'" size="15px"
                v-on:receiveClick="handleAddPriceType"/>
          </span>

          </q-card-actions>

          <q-inner-loading
            :showing="showAddLoading"
            color="primary"
          />
        </q-card>
      </q-dialog>

      <q-dialog v-model="show_restriction_dialog" persistent :position="$q.screen.width > 599 ? 'top' : 'bottom'">


      <q-card style="width: 95vw; max-width: 950px; max-height: 90vh; margin-top: 5%;">
      <q-card-section class="row items-center dialog_header_custom">
          <div v-if="edit_restriction" class="text-h6">Edit Restriction</div>
          <div v-else class="text-h6">Add Restriction</div>
          <q-space />
          <q-btn icon="close" flat round dense @click="close()" :disable="restriction.loading"/>
      </q-card-section>

      <q-card-section>
        <q-form ref="save_edit_pochild_form">
          <div class="row dialog_content">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <div class="row">

                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 " :class="!edit_child ? '': ''">
                      <div class="row" style="align-items: center;">
                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                          <Label :pass_value="'Concept'" />
                        </div>
                        <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                          <SelectFilter
                            :readonly="page_function == 'view'"
                            :no_label="true"
                            v-model:pass_value="resjson.branch"
                            :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.select"
                            :options="listedBranch_options"
                            v-on:receiveChange="handleChangelistedBranchConcept"
                            :result_message ="'No results'"
                            />
                        </div>
                      </div>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4" style="padding-top: 5px;">
                      <div class="row" style="align-items: center;">
                          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                            <Label :pass_value="'Sales Order'" />
                          </div>
                          <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                            <q-toggle
                                dense
                                style="padding-top: 7px; padding-bottom: 7px;"
                                :false-value="0"
                                :true-value="1"
                                color="green"
                                v-model="resjson.sales_order"
                              />

                            </div>
                        </div>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4" style="padding-top: 5px;">
                      <div class="row" style="align-items: center;">
                          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                            <Label :pass_value="'Purchase Order'" />
                          </div>
                          <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                            <q-toggle
                                dense
                                style="padding-top: 7px; padding-bottom: 7px;"
                                :false-value="0"
                                :true-value="1"
                                color="green"
                                v-model="resjson.purchase_order"
                              />

                            </div>
                        </div>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4" style="padding-top: 5px;">
                      <div class="row" style="align-items: center;">
                          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                            <Label :pass_value="'Ibt'" />
                          </div>
                          <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                            <q-toggle
                                dense
                                style="padding-top: 7px; padding-bottom: 7px;"
                                :false-value="0"
                                :true-value="1"
                                color="green"
                                v-model="resjson.ibt"
                              />

                            </div>
                        </div>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4" style="padding-top: 5px;">
                      <div class="row" style="align-items: center;">
                          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                            <Label :pass_value="'CN'" />
                          </div>
                          <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                            <q-toggle
                                dense
                                style="padding-top: 7px; padding-bottom: 7px;"
                                :false-value="0"
                                :true-value="1"
                                color="green"
                                v-model="resjson.cn"
                              />

                            </div>
                        </div>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4" style="padding-top: 5px;">
                      <div class="row" style="align-items: center;">
                          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                            <Label :pass_value="'DN'" />
                          </div>
                          <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                            <q-toggle
                                dense
                                style="padding-top: 7px; padding-bottom: 7px;"
                                :false-value="0"
                                :true-value="1"
                                color="green"
                                v-model="resjson.dn"
                              />

                            </div>
                        </div>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4" style="padding-top: 5px;">
                      <div class="row" style="align-items: center;">
                          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                            <Label :pass_value="'CPO'" />
                          </div>
                          <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                            <q-toggle
                                dense
                                style="padding-top: 7px; padding-bottom: 7px;"
                                :false-value="0"
                                :true-value="1"
                                color="green"
                                v-model="resjson.cpo"
                              />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </q-form>
      </q-card-section>
      <q-card-actions class="dialog_action" align="right">
        <Button v-on:receiveClick="close"
          v-if="page_function != 'view'"
          :pass_label="'Cancel'"
          :pass_no_caps="true"
          :pass_square="true"
          :pass_dense="true"
        />
        <Button v-on:receiveClick="handleAddRestriction"
          v-if="page_function != 'view'"
          :pass_label="'Save'"
          :pass_no_caps="true"
          :pass_square="true"
          :pass_dense="true"
          class="custom_button"
        />
          <!-- <span class="q-pl-xs">
         <q-btn flat label="Cancel" color="primary" v-close-popup/>
          </span>
          <span class="q-pl-xs">
              <Button_icon  :readonly="false" :flat="true" :text="'Confirm'" size="15px"
                v-on:receiveClick="handleAddListedBranch"/>
          </span> -->

          </q-card-actions>

      <q-inner-loading
      :showing="restriction.loading"
      color="primary"
    />
      </q-card>

      </q-dialog>
      <q-dialog v-model="show_replenishment_dialog" persistent :position="$q.screen.width > 599 ? 'top' : 'bottom'">


      <q-card style="width: 95vw; max-width: 550px; max-height: 90vh; margin-top: 5%;">
      <q-card-section class="row items-center dialog_header_custom">
          <div v-if="edit_replenishment" class="text-h6">Edit Replenishment</div>
          <div v-else class="text-h6">Add Replenishment</div>
          <q-space />
          <q-btn icon="close" flat round dense @click="close()" :disable="replenishment.loading"/>
      </q-card-section>

      <q-card-section>
        <q-form ref="save_edit_pochild_form">
          <div class="row dialog_content">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <div class="row">
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 " style="padding-right: 10px;">
                          <div class="row" style="align-items: center;">
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                              <Label :pass_value="'Banner/Site'" />
                            </div>
                            <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                              <SelectFilter
                                :readonly="page_function == 'view'"
                                :no_label="true"
                                v-model:pass_value="repjson.concept"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.select"
                                :options="listedBranch_options"
                                v-on:receiveChange="handleChangelistedBranchConcept"
                                :result_message ="'No results'"
                                />
                            </div>
                          </div>
                        </div>
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right:10px;padding-top: 5px;">
                          <div class="row" style="align-items: center;">
                              <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                <Label :pass_value="'Min Qty'" />
                              </div>
                              <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                <Input
                                  :autofocusclick="false"
                                  :readonly="page_function == 'view'"
                                  :no_label="false"
                                  v-on:change="handleChange"
                                  v-model="repjson.min_qty"
                                  :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                                

                                </div>
                            </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                      <div class="row">
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px;">
                          <div class="row" style="align-items: center;">
                              <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                <Label :pass_value="'Max Qty'" />
                              </div>
                              <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                <Input
                                  :autofocusclick="false"
                                  :readonly="page_function == 'view'"
                                  :no_label="false"
                                  v-on:change="handleChange"
                                  v-model="repjson.max_qty"
                                  :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                                

                                </div>
                            </div>
                        </div>
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right:10px;padding-top: 5px;">
                          <div class="row" style="align-items: center;">
                              <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                <Label :pass_value="'Display Qty'" />
                              </div>
                              <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                <Input
                                  :autofocusclick="false"
                                  :readonly="page_function == 'view'"
                                  :no_label="false"
                                  v-on:change="handleChange"
                                  v-model="repjson.display_qty"
                                  :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                                

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
      <q-card-actions class="dialog_action" align="right">
        <Button v-on:receiveClick="close"
          v-if="page_function != 'view'"
          :pass_label="'Cancel'"
          :pass_no_caps="true"
          :pass_square="true"
          :pass_dense="true"
        />
        <Button v-on:receiveClick="handleAddReplenishment"
          v-if="page_function != 'view'"
          :pass_label="'Save'"
          :pass_no_caps="true"
          :pass_square="true"
          :pass_dense="true"
          class="custom_button"
        />
          <!-- <span class="q-pl-xs">
         <q-btn flat label="Cancel" color="primary" v-close-popup/>
          </span>
          <span class="q-pl-xs">
              <Button_icon  :readonly="false" :flat="true" :text="'Confirm'" size="15px"
                v-on:receiveClick="handleAddListedBranch"/>
          </span> -->

          </q-card-actions>

      <q-inner-loading
      :showing="replenishment.loading"
      color="primary"
    />
      </q-card>

      </q-dialog>

      <q-dialog v-model="show_pricebreak_dialog" persistent :position="$q.screen.width > 599 ? 'top' : 'bottom'">


      <q-card style="width: 95vw; max-width: 950px; max-height: 90vh; margin-top: 5%;">
      <q-card-section class="row items-center dialog_header_custom">
          <div v-if="edit_pricebreak" class="text-h6">Edit Price Break</div>
          <div v-else class="text-h6">Add Price Break</div>
          <q-space />
          <q-btn icon="close" flat round dense @click="close()" :disable="pricebreak_loading"/>
      </q-card-section>

      <q-card-section>
        <q-form ref="save_edit_pochild_form">
          <div class="row dialog_content">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <div class="row">

                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4" style="padding-right: 10px;padding-top: 5px;">
                      <div class="row" style="align-items: center;">
                          <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2">
                            <Label :pass_value="'Qty'" />
                          </div>
                          <div class="col-xl-9 col-lg-9 col-md-9 col-sm-9 col-xs-9">
                            <Input
                              :autofocusclick="false"
                              :readonly="page_function == 'view'"
                              :no_label="false"
                              v-on:change="handleChange"
                              v-model="pbjson.qty"
                              :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                            

                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3" style="padding-right: 10px;padding-top: 5px;">
                      <div class="row" style="align-items: center;">
                          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                            <Label :pass_value="'Type'" />
                          </div>
                          <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                            <!-- <Input
                              :autofocusclick="false"
                              :readonly="page_function == 'view'"
                              :no_label="false"
                              v-on:change="handleChange"
                              v-model="pbjson.break_type"
                              :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.text : oridbComponentBehavior.text" /> -->
                              <Select
                                  :readonly="page_function == 'view'"
                                  v-model:pass_value="pbjson.break_type"
                                  v-on:receiveChange="handleChange"
                                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.select"
                                  label=""
                                  :options="pbType_options"
                                />
                            

                            </div>
                        </div>
                    </div>
                      <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5" style="padding-top: 5px;">
                      <div class="row" style="align-items: center;">
                          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                            <Label :pass_value="'Value'" />
                          </div>
                          <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                            <Input
                              :autofocusclick="false"
                              :readonly="page_function == 'view'"
                              :no_label="false"
                              v-on:change="handleChange"
                              v-model="pbjson.break_price"
                              :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                            

                            </div>
                        </div>
                    </div>
                    
                    
                </div>
            </div>
          </div>
        </q-form>
      </q-card-section>
      <q-card-actions class="dialog_action" align="right">
        <Button v-on:receiveClick="close"
          v-if="page_function != 'view'"
          :pass_label="'Cancel'"
          :pass_no_caps="true"
          :pass_square="true"
          :pass_dense="true"
        />
        <Button v-on:receiveClick="handleAddPriceBreak"
          v-if="page_function != 'view'"
          :pass_label="'Save'"
          :pass_no_caps="true"
          :pass_square="true"
          :pass_dense="true"
          class="custom_button"
        />
          

          </q-card-actions>

      <q-inner-loading
      :showing="pricebreak_loading"
      color="primary"
    />
      </q-card>

      </q-dialog>

      <q-dialog v-model="show_permanentDiscount_dialog" persistent :position="$q.screen.width > 599 ? 'top' : 'bottom'">


      <q-card style="width: 95vw; max-width: 950px; max-height: 90vh; margin-top: 5%;">
      <q-card-section class="row items-center dialog_header_custom">
          <div v-if="edit_permanentDiscount" class="text-h6">Edit Permanent Discount</div>
          <div v-else class="text-h6">Add Permanent Discount</div>
          <q-space />
          <q-btn icon="close" flat round dense @click="close()" :disable="permanentdisc_loading"/>
      </q-card-section>

      <q-card-section>
        <q-form ref="save_edit_pochild_form">
          <div class="row dialog_content">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <div class="row">

                    <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5" style="padding-right: 10px;padding-top: 5px;">
                      <div class="row" style="align-items: center;">
                          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                            <Label :pass_value="'Card Type'" />
                          </div>
                          <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                            <!-- <Input
                              :autofocusclick="false"
                              :readonly="page_function == 'view'"
                              :no_label="false"
                              v-on:change="handleChange"
                              v-model="pdiscjson.CardType"
                              :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.text : oridbComponentBehavior.text" /> -->
                            <Select
                                  :readonly="page_function == 'view'"
                                  v-model:pass_value="pdiscjson.CardType"
                                  v-on:receiveChange="handleChange"
                                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.select"
                                  label=""
                                  :options="price_type_options"
                                />

                            </div>
                        </div>
                    </div>
                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2" style="padding-right:10px;padding-top: 5px;">
                      <div class="row" style="align-items: center;">
                          <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6">
                            <Label :pass_value="'Disc1 Type'" />
                          </div>
                          <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6">
                            <!-- <Input
                              :autofocusclick="false"
                              :readonly="page_function == 'view'"
                              :no_label="false"
                              v-on:change="handleChange"
                              v-model="pdiscjson.Disc1Type"
                              :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.text : oridbComponentBehavior.text" /> -->
                            <Select
                                  :readonly="page_function == 'view'"
                                  v-model:pass_value="pdiscjson.Disc1Type"
                                  v-on:receiveChange="handleChange"
                                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.select"
                                  label=""
                                  :options="discType_options"
                                />

                            </div>
                        </div>
                    </div>
                      <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5" style="padding-right:10px;padding-top: 5px;">
                      <div class="row" style="align-items: center;">
                          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                            <Label :pass_value="'Disc 1'" />
                          </div>
                          <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                            <Input
                              :autofocusclick="false"
                              :readonly="page_function == 'view'"
                              :no_label="false"
                              v-on:change="handleChange"
                              v-model="pdiscjson.Disc1Value"
                              :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.text_right : oridbComponentBehavior.text_right" />
                            

                            </div>
                        </div>
                    </div>
                     <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5" style="padding-right:10px;padding-top: 5px;">
                      <div class="row" style="align-items: center;">
                          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                            <Label :pass_value="'Net Price'" />
                          </div>
                          <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                            <Input
                              :autofocusclick="false"
                              :readonly="page_function == 'view'"
                              :no_label="false"
                              v-on:change="handleChange"
                              v-model="pdiscjson.net_price"
                              :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.text_right : oridbComponentBehavior.text_right" />
                            

                            </div>
                        </div>
                    </div>
                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2" style="padding-right: 10px;padding-top: 5px;">
                      <div class="row" style="align-items: center;">
                          <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6">
                            <Label :pass_value="'Disc2 Type '" />
                          </div>
                          <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6">
                            <!-- <Input
                              :autofocusclick="false"
                              :readonly="page_function == 'view'"
                              :no_label="false"
                              v-on:change="handleChange"
                              v-model="pdiscjson.Disc2Type"
                              :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.text : oridbComponentBehavior.text" /> -->
                            <Select
                                  :readonly="page_function == 'view'"
                                  v-model:pass_value="pdiscjson.Disc2Type"
                                  v-on:receiveChange="handleChange"
                                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.select"
                                  label=""
                                  :options="discType_options"
                                />

                            </div>
                        </div>
                    </div>
                      <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5" style="padding-right:10px;padding-top: 5px;">
                      <div class="row" style="align-items: center;">
                          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                            <Label :pass_value="'Disc 2'" />
                          </div>
                          <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                            <Input
                              :autofocusclick="false"
                              :readonly="page_function == 'view'"
                              :no_label="false"
                              v-on:change="handleChange"
                              v-model="pdiscjson.Disc2Value"
                              :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.text_right : oridbComponentBehavior.text_right" />
                            

                            </div>
                        </div>
                    </div>

                    
                    
                </div>
            </div>
          </div>
        </q-form>
      </q-card-section>
      <q-card-actions class="dialog_action" align="right">
        <Button v-on:receiveClick="close"
          v-if="page_function != 'view'"
          :pass_label="'Cancel'"
          :pass_no_caps="true"
          :pass_square="true"
          :pass_dense="true"
        />
        <Button v-on:receiveClick="handleAddPermanentDiscount"
          v-if="page_function != 'view'"
          :pass_label="'Save'"
          :pass_no_caps="true"
          :pass_square="true"
          :pass_dense="true"
          class="custom_button"
        />
          

          </q-card-actions>

      <q-inner-loading
      :showing="permanentdisc_loading"
      color="primary"
    />
      </q-card>

      </q-dialog>

      <q-dialog v-model="supplier_dialog" persistent position="top">
        <q-card style="width: 95vw; max-width: 950px; max-height: 90vh; margin-top: 5%;">

          <q-card-section class="row items-center dialog_header_custom">
              <div v-if="supplier_action == 'edit'" class="text-h6">Edit Supplier Item</div>
              <div v-else class="text-h6">Add Supplier Item</div>
              <q-space />
              <q-btn icon="close" flat round dense :disable="supplier_loading" @click="closeSupplierDialog" />
          </q-card-section>

          <q-card-section>
            <q-form ref="save_child_form">
              <div class="row dialog_content">
                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 q-pl-xs">
                  <div class="row">
                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                        <div class="row" style="align-items: center;">
                            <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                                <Label :pass_value="'Priority'" />
                            </div>
                            <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                              <Input :autofocusclick="true"
                              :readonly="page_function == 'view'"
                              v-model:pass_value="sup_json.priority_vendor"
                              v-on:receiveChange="handleChange"
                              :dbComponentBehavior="dbComponentBehavior.text_required"/>
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                      <div class="row" style="align-items: center;">
                        <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                            <Label :pass_value="'Code'" />
                        </div>
                        <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                          <Select
                          :readonly="page_function == 'view'"
                          v-model:pass_value="sup_json.Code"
                          v-on:receiveChange="handleChangeCode"
                          :dbComponentBehavior="dbComponentBehavior.select"
                          label=""
                          :options="supplier_code_options"
                          :pass_overwrite_display="'value'"
                          />
                        </div>
                      </div>
                    </div>

                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                      <div class="row" style="align-items: center;">
                        <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                            <Label :pass_value="'Name'" />
                        </div>
                        <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                          <Select
                          :readonly="page_function == 'view'"
                          v-model:pass_value="sup_json.Name"
                          v-on:receiveChange="handleChangeName"
                          :dbComponentBehavior="dbComponentBehavior.select"
                          label=""
                          :options="supplier_name_options"
                          :pass_overwrite_display="'value'"
                          />
                        </div>
                      </div>
                    </div>

                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                      <div class="row" style="align-items: center;">
                        <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                            <Label :pass_value="'Tax Code'" />
                        </div>
                        <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                          <Input :autofocusclick="true"
                          :readonly="page_function == 'view'"
                          v-model:pass_value="sup_json.TaxCode"
                          v-on:receiveChange="handleChange"
                          :dbComponentBehavior="dbComponentBehavior.text"/>
                        </div>
                      </div>
                    </div>

                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                        <div class="row" style="align-items: center;">
                            <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                                <Label :pass_value="'Ordering Lot Size'" />
                            </div>
                            <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                              <Input :autofocusclick="true"
                              :readonly="page_function == 'view'"
                              v-model:pass_value="sup_json.OrderLotSize"
                              v-on:receiveChange="handleChange"
                              :dbComponentBehavior="dbComponentBehavior.input_number"/>
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                        <div class="row" style="align-items: center;">
                            <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                                <Label :pass_value="'Carton Qty'" class="unknown_field" />
                            </div>
                            <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                              <Input :autofocusclick="true"
                              :readonly="page_function == 'view'"
                              v-model:pass_value="sup_json.carton_qty"
                              v-on:receiveChange="handleChange"
                              :dbComponentBehavior="dbComponentBehavior.input_number"/>
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                        <div class="row" style="align-items: center;">
                            <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                                <Label :pass_value="'Listed Cost'" />
                            </div>
                            <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                              <Input :autofocusclick="true"
                              :readonly="page_function == 'view'"
                              v-model:pass_value="sup_json.SupStdPrice"
                              v-on:receiveChange="handleChange"
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
                              v-model:pass_value="sup_json.Disc1Type"
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
                              v-model:pass_value="sup_json.Disc1Value"
                              v-on:receiveChange="handleChangeDisc1Value"
                              :dbComponentBehavior="dbComponentBehavior.input_number"/>
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                        <div class="row" style="align-items: center;">
                            <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                                <Label :pass_value="'Disc2Type'" class="unknown_field" />
                            </div>
                            <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                              <Select
                              :readonly="page_function == 'view'"
                              v-model:pass_value="sup_json.Disc2Type"
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
                                <Label :pass_value="'Disc2Value'" class="unknown_field" />
                            </div>
                            <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                              <Input :autofocusclick="true"
                              :readonly="page_function == 'view'"
                              v-model:pass_value="sup_json.Disc2Value"
                              v-on:receiveChange="handleChangeDisc2Value"
                              :dbComponentBehavior="dbComponentBehavior.input_number"/>
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                        <div class="row" style="align-items: center;">
                            <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                                <Label :pass_value="'Net Cost'" class="unknown_field" />
                            </div>
                            <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                              <Input :autofocusclick="true"
                              :readonly="page_function == 'view'"
                              v-model:pass_value="sup_json.net_cost"
                              v-on:receiveChange="handleChange"
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
                                <Label :pass_value="'Carton Cost'" />
                            </div>
                            <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                              <Input :autofocusclick="true"
                              :readonly="page_function == 'view'"
                              v-model:pass_value="sup_json.cartonprice"
                              v-on:receiveChange="handleChange"
                              :dbComponentBehavior="dbComponentBehavior.input_number"/>
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                        <div class="row" style="align-items: center;">
                            <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                                <Label :pass_value="'Last Cost'" class="unknown_field" />
                            </div>
                            <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                              <Input :autofocusclick="true"
                              :readonly="page_function == 'view'"
                              v-model:pass_value="sup_json.last_cost"
                              v-on:receiveChange="handleChange"
                              :dbComponentBehavior="dbComponentBehavior.input_number"/>
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                        <div class="row" style="align-items: center;">
                            <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                                <Label :pass_value="'RSP After Tax'" />
                            </div>
                            <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                              <Input :autofocusclick="true"
                              :readonly="page_function == 'view'"
                              v-model:pass_value="sup_json.SupRSPAfterTax"
                              v-on:receiveChange="handleChange"
                              :dbComponentBehavior="dbComponentBehavior.input_number"/>
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                        <div class="row" style="align-items: center;">
                            <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                                <Label :pass_value="'RSP Before Tax'" />
                            </div>
                            <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                              <Input :autofocusclick="true"
                              :readonly="page_function == 'view'"
                              v-model:pass_value="sup_json.SupRSPBeforeTax"
                              v-on:receiveChange="handleChangeTotalPrice"
                              :dbComponentBehavior="dbComponentBehavior.input_number"/>
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                        <div class="row" style="align-items: center;">
                            <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                                <Label :pass_value="'Supplier Item Code'" />
                            </div>
                            <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                              <Input :autofocusclick="true"
                              :readonly="page_function == 'view'"
                              v-model:pass_value="sup_json.SupItemCode"
                              v-on:receiveChange="handleChange"
                              :dbComponentBehavior="dbComponentBehavior.text"/>
                            </div>
                        </div>
                    </div>


                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                        <div class="row" style="align-items: center;">
                            <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                                <Label :pass_value="'Block'" />
                            </div>
                            <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                              <q-toggle
                              :disable="page_function == 'view'"
                              dense
                              style="padding-top: 7px; padding-bottom: 7px;"
                              :false-value="0"
                              :true-value="1"
                              color="green"
                              v-model="sup_json.block_order"
                              />
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                        <div class="row" style="align-items: center;">
                            <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                                <Label :pass_value="'Non Returnable'" />
                            </div>
                            <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                              <q-toggle
                              :disable="page_function == 'view'"
                              dense
                              style="padding-top: 7px; padding-bottom: 7px;"
                              :false-value="0"
                              :true-value="1"
                              color="green"
                              v-model="sup_json.none_return"
                              />
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                      <div class="row" style="align-items: center;">
                          <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                              <Label :pass_value="'Created On'" />
                          </div>
                          <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                            <Input :autofocusclick="true"
                            :disable="page_function != 'view'"
                            :readonly="page_function == 'view'"
                            v-model:pass_value="sup_json.Created_at"
                            v-on:receiveChange="handleChange"
                            :dbComponentBehavior="dbComponentBehavior.text"
                            />
                          </div>
                      </div>
                    </div>

                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                      <div class="row" style="align-items: center;">
                          <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                              <Label :pass_value="'Created By'" />
                          </div>
                          <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                            <Input :autofocusclick="true"
                            :disable="page_function != 'view'"
                            :readonly="page_function == 'view'"
                            v-model:pass_value="sup_json.Created_by"
                            v-on:receiveChange="handleChange"
                            :dbComponentBehavior="dbComponentBehavior.text"
                            />
                          </div>
                      </div>
                    </div>

                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                      <div class="row" style="align-items: center;">
                          <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                              <Label :pass_value="'Updated On'" />
                          </div>
                          <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                            <Input :autofocusclick="true"
                            :disable="page_function != 'view'"
                            :readonly="page_function == 'view'"
                            v-model:pass_value="sup_json.Updated_at"
                            v-on:receiveChange="handleChange"
                            :dbComponentBehavior="dbComponentBehavior.text"
                            />
                          </div>
                      </div>
                    </div>

                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                      <div class="row" style="align-items: center;">
                          <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                              <Label :pass_value="'Updated By'" />
                          </div>
                          <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                            <Input :autofocusclick="true"
                            :disable="page_function != 'view'"
                            :readonly="page_function == 'view'"
                            v-model:pass_value="sup_json.Updated_by"
                            v-on:receiveChange="handleChange"
                            :dbComponentBehavior="dbComponentBehavior.text"
                            />
                          </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </q-form>
          </q-card-section>

          <q-card-actions class="dialog_action" align="right">
              <Button v-on:receiveClick="closeSupplierDialog"
                v-if="page_function != 'view'"
                :pass_label="'Cancel'"
                :pass_no_caps="true"
                :pass_square="true"
                :pass_dense="true"
              />

              <Button v-on:receiveClick="saveSupplierItem"
                v-if="page_function != 'view'"
                :pass_label="'Save'"
                :pass_no_caps="true"
                :pass_square="true"
                :pass_dense="true"
                class="custom_button"
              />
          </q-card-actions>

          <q-inner-loading
            :showing="supplier_loading"
            color="primary"
          />
        </q-card>
      </q-dialog>

      <q-dialog  v-model="delete_dialog" persistent position="top">
        <q-card class="dialog-content" style="width: 700px; max-width: 80vw;margin-top: 2%;">
          <q-card-section class="row button_save q-pa-sm">
            <Label text="Delete"
                  class="text-subtitle1 text-bold"
                  style="background-color:transparent;"/>
            <q-space/>
            <q-btn icon="close" size="sm" flat round @click="handleCancelDelete"/>
          </q-card-section>

          <q-card-section>
            <q-icon name="warning" size="xl" style="color: #E82F53;"/>
            <span style="font-size:18px;">Are you sure you want to delete?</span>
          </q-card-section>

            <q-card-actions align="right" class="q-pb-md">
              <q-btn  label="Cancel" flat color="white" class="text-black button_cancel" @click="handleCancelDelete" />
              <q-btn  label="Ok" flat class="button_save" @click="generate_delete" />
            </q-card-actions>

        </q-card>
      </q-dialog>

      <q-dialog v-model="upload_photo_dialog" persistent position="top">
        <q-card style="width: 95vw; max-width: 500px; max-height: 90vh; margin-top: 5%;">

          <q-card-section class="row items-center dialog_header_custom">
              <div class="text-h6">Upload Photo</div>
              <q-space />
              <q-btn icon="close" flat round dense :disable="upload_photo_dialog_loading" @click="closeUploadPhotoDialog" />
          </q-card-section>

          <q-card-section>
            <q-form ref="save_photo_form">
              <div class="row dialog_content">
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pl-xs">
                  <div class="row">
                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                        <div class="row" style="align-items: center;">
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              <q-uploader
                                ref="uploader"
                                hide-upload-btn
                                style="width:100%;"
                                accept=".jpg, image/*"
                                @added="handleFileUpload"
                              >
                              <template v-slot:header="scope">
                                <div class="row no-wrap items-center q-pa-sm q-gutter-xs">
                                  <q-btn v-if="scope.queuedFiles.length > 0" icon="clear_all" ref="clearAllButton" @click="scope.removeQueuedFiles" round dense flat >
                                    <q-tooltip>Clear All</q-tooltip>
                                  </q-btn>
                                  <div v-if="scope.canAddFiles" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" align="right">
                                    <q-btn type="a" icon="add_box" @click="scope.pickFiles" round dense flat>
                                      <q-uploader-add-trigger />
                                      <q-tooltip>Pick Files</q-tooltip>
                                    </q-btn>
                                  </div>
                                </div>
                              </template>
                            </q-uploader>
                            </div>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </q-form>
          </q-card-section>

          <q-card-actions class="dialog_action" align="right">
            <Button v-on:receiveClick="closeUploadPhotoDialog"
              v-if="page_function != 'view'"
              :pass_label="'Cancel'"
              :pass_no_caps="true"
              :pass_square="true"
              :pass_dense="true"
            />

            <Button v-on:receiveClick="saveUploadPhoto"
              v-if="page_function != 'view'"
              :pass_label="'Save'"
              :pass_no_caps="true"
              :pass_square="true"
              :pass_dense="true"
              class="custom_button"
            />
          </q-card-actions>

          <q-inner-loading
            :showing="upload_photo_dialog_loading"
            color="primary"
          />
        </q-card>
      </q-dialog>

      <q-dialog v-model="attribute_dialog" persistent position="top">
        <q-card style="width: 95vw; max-width: 950px; max-height: 90vh; margin-top: 5%;">

          <q-card-section class="row items-center dialog_header_custom">
              <div v-if="attribute_dialog_action == 'edit'" class="text-h6">Edit Attribute</div>
              <div v-else class="text-h6">Add Attribute</div>
              <q-space />
              <q-btn icon="close" flat round dense :disable="attribute_dialog_loading" @click="closeAttributeDialog" />
          </q-card-section>

          <q-card-section>
            <q-form ref="save_child_form">
              <div class="row dialog_content">
                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 q-pl-xs">
                  <div class="row">
                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                        <div class="row" style="align-items: center;">
                            <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                                <Label :pass_value="'Product Size'" />
                            </div>
                            <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                              <Input :readonly="page_function == 'view'" :autofocusclick="true"
                              v-model:pass_value="attrjson.Product_Size"
                              v-on:receiveChange="handleChange"
                              :dbComponentBehavior="dbComponentBehavior.input_number"/>
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                        <div class="row" style="align-items: center;">
                            <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                                <Label :pass_value="'Product UOM'" />
                            </div>
                            <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                              <Input :readonly="page_function == 'view'" :autofocusclick="true"
                              v-model:pass_value="attrjson.Product_UOM"
                              v-on:receiveChange="handleChange"
                              :dbComponentBehavior="dbComponentBehavior.attribute"/>
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                        <div class="row" style="align-items: center;">
                            <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                                <Label :pass_value="'Serve Size'" />
                            </div>
                            <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                              <Input :readonly="page_function == 'view'" :autofocusclick="true"
                              v-model:pass_value="attrjson.Serve_Size"
                              v-on:receiveChange="handleChange"
                              :dbComponentBehavior="dbComponentBehavior.input_number"/>
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                        <div class="row" style="align-items: center;">
                            <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                                <Label :pass_value="'Serve Size UOM'" />
                            </div>
                            <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                              <Input :readonly="page_function == 'view'" :autofocusclick="true"
                              v-model:pass_value="attrjson.Serve_Size_UOM"
                              v-on:receiveChange="handleChange"
                              :dbComponentBehavior="dbComponentBehavior.attribute"/>
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                        <div class="row" style="align-items: center;">
                            <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                                <Label :pass_value="'Per Serving'" />
                            </div>
                            <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                              <Input :readonly="page_function == 'view'" :autofocusclick="true"
                              v-model:pass_value="attrjson.Per_Serving"
                              v-on:receiveChange="handleChange"
                              :dbComponentBehavior="dbComponentBehavior.input_number"/>
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                        <div class="row" style="align-items: center;">
                            <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                                <Label :pass_value="'Denominator'" />
                            </div>
                            <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                              <Input :readonly="page_function == 'view'" :autofocusclick="true"
                              v-model:pass_value="attrjson.Denominator"
                              v-on:receiveChange="handleChange"
                              :dbComponentBehavior="dbComponentBehavior.input_number"/>
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                        <div class="row" style="align-items: center;">
                            <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                                <Label :pass_value="'Average Weight'" />
                            </div>
                            <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                              <Input :readonly="page_function == 'view'" :autofocusclick="true"
                              v-model:pass_value="attrjson.Avg_Weight"
                              v-on:receiveChange="handleChange"
                              :dbComponentBehavior="dbComponentBehavior.input_number"/>
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                        <div class="row" style="align-items: center;">
                            <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                                <Label :pass_value="'Average Weight UOM'" />
                            </div>
                            <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                              <Input :readonly="page_function == 'view'" :autofocusclick="true"
                              v-model:pass_value="attrjson.Avg_Weight_UOM"
                              v-on:receiveChange="handleChange"
                              :dbComponentBehavior="dbComponentBehavior.attribute"/>
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
                                <Label :pass_value="'Weight Denominator'" />
                            </div>
                            <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                              <Input :readonly="page_function == 'view'" :autofocusclick="true"
                              v-model:pass_value="attrjson.Avg_Weight_Denominator"
                              v-on:receiveChange="handleChange"
                              :dbComponentBehavior="dbComponentBehavior.input_number"/>
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                        <div class="row" style="align-items: center;">
                            <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                                <Label :pass_value="'Average Price'" />
                            </div>
                            <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                              <Input :readonly="page_function == 'view'" :autofocusclick="true"
                              v-model:pass_value="attrjson.Avg_Weight_Price"
                              v-on:receiveChange="handleChange"
                              :dbComponentBehavior="dbComponentBehavior.input_number"/>
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                        <div class="row" style="align-items: center;">
                            <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                                <Label :pass_value="'EStore Available Qty'" />
                            </div>
                            <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                              <Input :autofocusclick="true"
                              :readonly="page_function == 'view'"
                              v-model:pass_value="attrjson.EStore_Qty"
                              v-on:receiveChange="handleChange"
                              :dbComponentBehavior="dbComponentBehavior.input_number"/>
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                        <div class="row" style="align-items: center;">
                            <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                                <Label :pass_value="'Created At'" />
                            </div>
                            <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                              <Input :autofocusclick="true"
                              :disable="page_function != 'view'"
                              :readonly="page_function == 'view'"
                              v-model:pass_value="attrjson.created_at"
                              v-on:receiveChange="handleChange"
                              :dbComponentBehavior="dbComponentBehavior.text_required"/>
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                        <div class="row" style="align-items: center;">
                            <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                                <Label :pass_value="'Created By'" />
                            </div>
                            <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                              <Input :autofocusclick="true"
                              :disable="page_function != 'view'"
                              :readonly="page_function == 'view'"
                              v-model:pass_value="attrjson.created_by"
                              v-on:receiveChange="handleChange"
                              :dbComponentBehavior="dbComponentBehavior.text_required"/>
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                        <div class="row" style="align-items: center;">
                            <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                                <Label :pass_value="'Updated At'" />
                            </div>
                            <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                              <Input :autofocusclick="true"
                              :disable="page_function != 'view'"
                              :readonly="page_function == 'view'"
                              v-model:pass_value="attrjson.updated_at"
                              v-on:receiveChange="handleChange"
                              :dbComponentBehavior="dbComponentBehavior.text_required"/>
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                        <div class="row" style="align-items: center;">
                            <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                                <Label :pass_value="'Updated By'" />
                            </div>
                            <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                              <Input :autofocusclick="true"
                              :disable="page_function != 'view'"
                              :readonly="page_function == 'view'"
                              v-model:pass_value="attrjson.updated_by"
                              v-on:receiveChange="handleChange"
                              :dbComponentBehavior="dbComponentBehavior.text_required"/>
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                        <div class="row" style="align-items: center;">
                            <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                                <Label :pass_value="'Remarks'" />
                            </div>
                            <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
                              <Input :autofocusclick="true"
                              :disable="page_function != 'view'"
                              :readonly="page_function == 'view'"
                              v-model:pass_value="attrjson.remarks"
                              v-on:receiveChange="handleChange"
                              :dbComponentBehavior="dbComponentBehavior.text"/>
                            </div>
                        </div>
                    </div>
                  </div>
                </div>
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pl-xs">
                  <div class="row">
                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                        <div class="row" style="align-items: center;">
                            <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                <Label :pass_value="'Organic Certified'" />
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                              <q-toggle
                                dense
                                style="padding-top: 7px; padding-bottom: 7px;"
                                :false-value="0"
                                :true-value="1"
                                color="green"
                                v-model="attrjson.Organic_Certified"
                              />
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                        <div class="row" style="align-items: center;">
                            <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                <Label :pass_value="'Non-GMO'" />
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                              <q-toggle
                                dense
                                style="padding-top: 7px; padding-bottom: 7px;"
                                :false-value="0"
                                :true-value="1"
                                color="green"
                                v-model="attrjson.Non_GMO"
                              />
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                        <div class="row" style="align-items: center;">
                            <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                <Label :pass_value="'No Artificial Flavor & Coloring'" />
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                              <q-toggle
                                dense
                                style="padding-top: 7px; padding-bottom: 7px;"
                                :false-value="0"
                                :true-value="1"
                                color="green"
                                v-model="attrjson.No_Colouring"
                              />
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                        <div class="row" style="align-items: center;">
                            <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                <Label :pass_value="'Gluten Free'" />
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                              <q-toggle
                                dense
                                style="padding-top: 7px; padding-bottom: 7px;"
                                :false-value="0"
                                :true-value="1"
                                color="green"
                                v-model="attrjson.Gluten_Free"
                              />
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                        <div class="row" style="align-items: center;">
                            <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                <Label :pass_value="'Plant Based'" />
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                              <q-toggle
                                dense
                                style="padding-top: 7px; padding-bottom: 7px;"
                                :false-value="0"
                                :true-value="1"
                                color="green"
                                v-model="attrjson.Plant_Based"
                              />
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                        <div class="row" style="align-items: center;">
                            <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                <Label :pass_value="'Pesticide Free'" />
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                              <q-toggle
                                dense
                                style="padding-top: 7px; padding-bottom: 7px;"
                                :false-value="0"
                                :true-value="1"
                                color="green"
                                v-model="attrjson.Pesticide_Free"
                              />
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                        <div class="row" style="align-items: center;">
                            <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                <Label :pass_value="'Direct From Farm'" />
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                              <q-toggle
                                dense
                                style="padding-top: 7px; padding-bottom: 7px;"
                                :false-value="0"
                                :true-value="1"
                                color="green"
                                v-model="attrjson.Direct_from_Farm"
                              />
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                        <div class="row" style="align-items: center;">
                            <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                <Label :pass_value="'Free Range'" />
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                              <q-toggle
                                dense
                                style="padding-top: 7px; padding-bottom: 7px;"
                                :false-value="0"
                                :true-value="1"
                                color="green"
                                v-model="attrjson.Free_Range"
                              />
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                        <div class="row" style="align-items: center;">
                            <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                <Label :pass_value="'Lactose Free'" />
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                              <q-toggle
                                dense
                                style="padding-top: 7px; padding-bottom: 7px;"
                                :false-value="0"
                                :true-value="1"
                                color="green"
                                v-model="attrjson.Lactose_Free"
                              />
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                        <div class="row" style="align-items: center;">
                            <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                <Label :pass_value="'Keto Friendly'" />
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                              <q-toggle
                                dense
                                style="padding-top: 7px; padding-bottom: 7px;"
                                :false-value="0"
                                :true-value="1"
                                color="green"
                                v-model="attrjson.Keto_Friendly"
                              />
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                        <div class="row" style="align-items: center;">
                            <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                <Label :pass_value="'Vegan'" />
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                              <q-toggle
                                dense
                                style="padding-top: 7px; padding-bottom: 7px;"
                                :false-value="0"
                                :true-value="1"
                                color="green"
                                v-model="attrjson.Vegan"
                              />
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                        <div class="row" style="align-items: center;">
                            <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                <Label :pass_value="'Festive'" />
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                              <q-toggle
                                dense
                                style="padding-top: 7px; padding-bottom: 7px;"
                                :false-value="0"
                                :true-value="1"
                                color="green"
                                v-model="attrjson.Festive"
                              />
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                        <div class="row" style="align-items: center;">
                            <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                <Label :pass_value="'Non-Halal'" />
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                              <q-toggle
                                dense
                                style="padding-top: 7px; padding-bottom: 7px;"
                                :false-value="0"
                                :true-value="1"
                                color="green"
                                v-model="attrjson.Non_Halal"
                              />
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                        <div class="row" style="align-items: center;">
                            <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                <Label :pass_value="'EStore Item'" />
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                              <q-toggle
                                dense
                                style="padding-top: 7px; padding-bottom: 7px;"
                                :false-value="0"
                                :true-value="1"
                                color="green"
                                v-model="attrjson.EStore_Tag"
                              />
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 q-pt-xs" style="min-height: 36px;">
                        <div class="row" style="align-items: center;">
                            <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                <Label :pass_value="'EStore Always Available'" />
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                              <q-toggle
                                dense
                                style="padding-top: 7px; padding-bottom: 7px;"
                                :false-value="0"
                                :true-value="1"
                                color="green"
                                v-model="attrjson.EStore_Available"
                              />
                            </div>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </q-form>
          </q-card-section>

          <q-card-actions class="dialog_action" align="right">
            <Button v-on:receiveClick="closeAttributeDialog"
              v-if="page_function != 'view'"
              :pass_label="'Cancel'"
              :pass_no_caps="true"
              :pass_square="true"
              :pass_dense="true"
            />

            <Button v-on:receiveClick="handleAddAttribute"
              v-if="page_function != 'view'"
              :pass_label="'Save'"
              :pass_no_caps="true"
              :pass_square="true"
              :pass_dense="true"
              class="custom_button"
            />
          </q-card-actions>

          <q-inner-loading
            :showing="attribute_dialog_loading"
            color="primary"
          />
        </q-card>
      </q-dialog>

<q-dialog v-model="general_search" persistent position="top">
  <q-card style="width: 95vw; max-width: 95vw; max-height: 90vh; margin-top: 5%;">

    <q-card-section class="row items-center theme_color dialog_header">
      <div class="text-h6">General Search</div>
      <q-space />
      <q-btn icon="close" flat round dense @click="general_search = false" />
    </q-card-section>

    <q-form ref="save_form_second">
      <q-card-section class="row">

        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <div class="row">

          </div>
        </div>

      </q-card-section>
    </q-form>

    <q-card-actions class="dialog_action" align="right">
      <q-btn flat label="Cancel" color="primary" v-close-popup />
      <q-btn flat label="Confirm" color="primary" @click="handleConfirmGeneralSearch" />
    </q-card-actions>

    <q-inner-loading
      :showing="general_search_loading"
      color="primary"
    />
  </q-card>
</q-dialog>

<q-dialog  v-model="showDuplicateConfirmation" persistent position="top">
  <q-card class="dialog-content" style="width: 700px; max-width: 80vw;margin-top: 2%;">
    <q-card-section class="row items-center  dialog_header_custom">
      <div class="text-h6">Confirmation</div>
      <q-space />
      <q-btn icon="close" size="sm" flat round v-close-popup/>
    </q-card-section>

    <q-card-section>
      <!-- <q-icon name="warning" size="xl" style="color: #E82F53;"/> -->
      <span>Are you sure to duplicate records?</span>
    </q-card-section>

      <q-card-actions align="right" class="q-pb-md">
        <Button v-on:receiveClick="showDuplicateConfirmation = false"
            v-if="page_function != 'view'"
            :pass_label="'Cancel'"
            :pass_no_caps="true"
            :pass_square="true"
            :pass_dense="true"
          />

          <Button v-on:receiveClick="handleConfirmDuplicateItemlink"
            v-if="page_function != 'view'"
            :pass_label="'OK'"
            :pass_no_caps="true"
            :pass_square="true"
            :pass_dense="true"
            class="custom_button"
          />
        <!-- <q-btn  label="Cancel" flat color="white" class="text-black button_cancel" v-close-popup />
        <q-btn  label="Ok" flat class="button_save" @click="handleConfirmDuplicateItemlink" /> -->
      </q-card-actions>

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

</template>
<script>
import ImageUploader from 'src/components/ERP/Base/ImageUploader'
import Chip from 'src/components/ERP/Base/Chip'
import ButtonMobile from 'src/components/ERP/Itemmaster/ButtonMobile'
// import Input from 'src/components/ERP/Base/Input'
// import Select from 'src/components/ERP/Base/Select'
import Datepicker from 'src/components/ERP/Main/Datepicker'
import Checkbox from 'src/components/ERP/Base/Checkbox'
import Toggle from 'src/components/ERP/Base/Toggle'
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

import Label from 'src/components/ERP/Main/Label';
import Input from 'src/components/ERP/Main/Input';
import LabelInputVerticalGeneral from 'src/components/ERP/Main/LabelInputVerticalGeneral';
import LabelSelectVerticalGeneral from 'src/components/ERP/Main/LabelSelectVerticalGeneral';
import Button from 'src/components/ERP/Main/Button';
import Select from 'src/components/ERP/Main/Select';
// import Select from 'src/components/ERP/Main/Select'
import Table from 'src/components/ERP/Table/Table.vue';
import MultipleSelect from 'src/components/ERP/Main/MultipleSelect';
import { calendarFormat } from 'moment'

export default{
  data() {
    return {
      first_run_search: true,
      show_table: false,
      item_loading: false,
      itemForceLoading: false,
      item_dialog: false,
      search_supplier: false,
      search_value: '',
      search_type: '',
      getuser: sessionStorage.getItem("getuser") != "" && sessionStorage.getItem("getuser") != "null" && sessionStorage.getItem("getuser") != null ? sessionStorage.getItem("getuser") : [],
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
      item_table_data: [],
      item_table_column: [],
      item_ori_params: {},
      photo: null,
      attribute_dialog: false,
      attribute_dialog_loading: false,
      attribute_dialog_action: null,
      miscellaneous_dialog_loading: false,
      show_miscellaneous_dialog: false,
      miscellaneous_dialog_action: null,
      showDuplicateConfirmation: false,
      fileselected: null,
      upload_photo_dialog: false,
      upload_photo_dialog_loading: false,
      supplier_action: 'create',
      supplier_loading: false,
      supplier_dialog: false,
      sup_json: {},
      branch: {
      dialog: false,
      loading: false,
      // action: null,
    },
    restriction: {
      dialog: false,
      loading: false,
      // action: null,
    },
    replenishment: {
      dialog: false,
      loading: false,
      // action: null,
    },
    assortment: {
      dialog: false,
      loading: false,
      // action: null,
    },
    barcode: {
      dialog: false,
      loading: false,
      // action: null,
    },
    miscellaneous: {
      dialog: false,
      loading: false,
      // action: null,
    },

    attribute: {
      dialog: false,
      loading: false,
      // action: null,
    },
      generateDialog_RUOM : false,
      loading_dialog: false,
      get_text1: '',
      get_value1: '',
      get_text2:'',
       get_value2: '',
       get_remark:'',
       get_mis_guid:'',
       get_misc_group:'',
      get_barcode:'',
      get_ItemType:'',
      get_listed_branch: '',
      get_assorted: '',
      get_miscellaneous: '',
        filter_mode_on: false,
        rearrange_column: [],
        forceLoading: false,
        filter_options: [],
        filter_value: [],
        visibleColumns: [],
        visibleColumns1:[],
        visibleColumns2:[],
        visibleColumns3:[],
        visibleColumns4:[],
        visibleColumns5:[],
        visibleColumns6:[],
        visibleColumns7:[],
        visibleColumns8:[],
        visibleColumns9:[],
        visibleColumns10:[],
        visibleColumns11:[],
        visibleColumns12:[],
        visibleColumns13:[],
        visibleColumns14:[],
        visibleColumns15:[],
        visibleColumns16:[],
        visibleColumns17:[],
        visibleColumns18:[],
        visibleColumns19:[],
        visibleColumns20:[],
        visibleColumns21:[],
        visibleColumns22:[],
        visibleColumns23:[],
        visibleColumns24:[],
        visibleColumns25:[],
        visibleColumns26:[],
        visibleColumns27:[],
        visibleColumns28:[],
        visibleColumns29:[],
        visibleColumns30:[],
        new_status_options: [
        {
          "label": "Active",
          "value": "0",
        },
        {
          "label": "Disable",
          "value": "1",
        },
        {
          "label": "Delisted",
          "value": "2",
        },
        {
          "label": "Non-listed",
          "value": "3",
        },

      ],
      general_search_loading: false,
      general_search: false,
      mempoint_base_on_qty_options: [
        {
          "label": "Point x Amt",
          "value": "0",
        },
        {
          "label": "Point x Qty",
          "value": "0",
        },
      ],
      non_inventory_type_options: [
        {
          "label": "Finished Goods",
          "value": "0",
        },
        {
          "label": "Semi-Finished Goods",
          "value": "1",
        },
        {
          "label": "Raw Material",
          "value": "2",
        },
        {
          "label": "Services",
          "value": "3",
        }
      ],
      trace_sn_options: [
        {
          "label": "NA",
          "value": "0",
        },
        {
          "label": "Serial Number",
          "value": "1",
        },
        {
          "label": "Prompt Remark",
          "value": "2",
        },
      ],
      inventory_options: [
        {
          "label": "Consign",
          "value": "1",
        },
        {
          "label": "Outright",
          "value": "0",
        }
      ],
      stock_options: [
        {
          "label": "Basic",
          "value": "0",
        },
        {
          "label": "Promo",
          "value": "1",
        },
        {
          "label": "House Brand",
          "value": "2",
        },
      ],
      discType_options: [
        {
          "label": "$",
          "value": "0",
        },
        {
          "label": "%",
          "value": "1",
        },
      ],
      pbType_options: [
        {
          "label": "$",
          "value": "$",
        },
        {
          "label": "%",
          "value": "%",
        },
      ],
      stock_type_options: [
        {
          "label": "Free 50g",
          "value": "1",
        },
      ],
      active_section2:'Status',
      active_section3:'Product',
      active_section4:'Site Info',
      active_section5:'Promo Discount',
      active_section6:'Supplier',
      active_section7:`Today's Price`,
      active_section8:'QOH by Site',
      cost_options: [
        {
          "label": "By Weight",
          "value": "P"
        },
        {
          "label": "By Qty",
          "value": "Q"
        }
      ],
      cost_value: "By Weight",
      pending_wording: 'KIV',
      active_section: 'Basic',
      step: 1,
      done1: false,
      done2: false,
      done3: false,
      redModel: false,
      tab: 'Information',
      receiving_methods: false,
      selectedCardIndex: null,
      last_enter_field: '',
      Itemcode: null,
      bjson: {
      branch: '',
      ItemType: '',
    },
    resjson: {
      branch: '',
      sales_order: '',
      purchase_order: '',
      ibt: '',
      cn: '',
      dn: '',
      cpo:'',
    },
    pdiscjson: {
      CardType: '',
      Disc1Type: '',
      Disc1Value: 0,
      Disc2Type: '',
      Disc2Value: 0,
    },
    pbjson: {
      qty:0,
      break_type: '',
      break_price: 0,
      
    },
    repjson: {
      concept: '',
      min_qty: 0,
      max_qty: 0,
      display_qty: 0,
    },
    ajson: {
      assorted_desc: '',
      set_assorted_item__assorted_desc: '',
      Itemcode: '',
      description: '',
      remark: '',
    },
    miscjson: {
      seq: 0,
      misc_group: '',
      text1: '',
      value1: 0,
      text2: '',
      value2: 0,
      remark: '',
    },
      attrjson: {
      Organic_Certified: 0,
      Non_GMO: 0,
      No_Colouring: 0,
      Gluten_Free: 0,
      Plant_Based: 0,
      Pesticide_Free: 0,
      Direct_from_Farm: 0,
      Lactose_Free: 0,
      Free_Range: 0,
      Keto_Friendly: 0,
      Vegan: 0,
      Festive: 0,
      Non_Halal: 0,
      Product_Size: 0,
      Product_UOM: '',
      Denominator: 0,
      Per_Serving: 0,
      Serve_Size: 0,
      Serve_Size_UOM: '',
      Avg_Weight: 0,
      Avg_Weight_UOM: '',
      Avg_Weight_Denominator: 0,
      Avg_Weight_Price: 0,
      EStore_Tag: 0,
      EStore_Available: 0,
      EStore_Qty: 0,
      remarks: '',
      // itemcode:'',
    },
      retailer_guid: sessionStorage.getItem("retailer_guid") != "" && sessionStorage.getItem("retailer_guid") != "null" && sessionStorage.getItem("retailer_guid") != null ? sessionStorage.getItem("retailer_guid") : [],
      user_name: sessionStorage.getItem("user_name") != "" && sessionStorage.getItem("user_name") != "null" && sessionStorage.getItem("user_name") != null ? sessionStorage.getItem("user_name") : [],
      language: sessionStorage.getItem("language") != "" && sessionStorage.getItem("language") != "null" && sessionStorage.getItem("language") != null ? sessionStorage.getItem("language") : [],
      currency_sign: sessionStorage.getItem("currency_sign") != "" && sessionStorage.getItem("currency_sign") != "null" && sessionStorage.getItem("currency_sign") != null ? sessionStorage.getItem("currency_sign") : [],
      session_outlet_guid: sessionStorage.getItem("session_outlet_guid") != "" && sessionStorage.getItem("session_outlet_guid") != "null" && sessionStorage.getItem("session_outlet_guid") != null ? sessionStorage.getItem("session_outlet_guid") : [],
      session_user_guid: sessionStorage.getItem("getuser") != "" && sessionStorage.getItem("getuser") != "null" && sessionStorage.getItem("getuser") != null ? sessionStorage.getItem("getuser") : [],
      supcus_guid: '',
      outlet_options: [],
      supplier_code_options: [],
      miscellaneousGroup_options: [],
      supplier_name_options: [],
      supplier_dropdown_options: [],
      supcus_guid_options: [],
      itemcode_options:[],
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
      supplier_table_data: {
        "data": {
            "count": 0,
            "next": null,
            "previous": null,
            "results": []
        }
    },
      SupplierForceLoading: false,
      barcode_options: [],
      listedBranch_options:[],
      supplier_options2: [],
      table_column: [],
      table_data: [],
      table_column1: [],
      table_data1: [],
      table_column2: [],
      table_data2: [],
      table_column3: [],
      table_data3: [],
      table_column4: [],
      table_data4: [],
      table_column5: [],
      table_data5: [],
      table_column6: [],
      table_data6: [],
      table_column7: [],
      table_data7: [],
      table_column8: [],
      table_data8: [],
      table_column9: [],
      table_data9: [],
      table_column10: [],
      table_data10: [],
      table_column11: [],
      table_data11: [],
      table_column12: [],
      table_data12: [],
      table_column13: [],
      table_data13: [],
      table_column14: [],
      table_data14: [],
      table_column15: [],
      table_data15: [],
      table_column16: [],
      table_data16: [],
      table_column17: [],
      table_data17: [],
      table_column18: [],
      table_data18: [],
      table_column19: [],
      table_data19: [],
      table_column20: [],
      table_data20: [],
      table_column21: [],
      table_data21: [],
      table_column22: [],
      table_data22: [],
      table_column23: [],
      table_data23: [],
      table_column24: [],
      table_data24: [],
      table_column25: [],
      table_data25: [],
      table_column26: [],
      table_data26: [],
      table_column27: [],
      table_data27: [],
      table_column28: [],
      table_data28: [],
      table_column29: [],
      table_data29: [],
      table_column30: [],
      table_data30: [],
      sil_table_data: [],
      sil_table_column: [],
      showAddLoading: false,
      showAddLoading2: false,
      json: {
        Description:'',
        DesShort: '',
        description: '',
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
        stock_type: '', // Make sure this is set correctly
        basic_link: '',
        ItemType:'',
        // TaxCode:"NA",
        // tax_code_purchase:"TX-0",
        // tax_code_supply:"SR-0"
      },
      newColumns: [
        'Item_Type',
        'Pack_Size',
        'Department',
        'SubDeparment',
        'supplier',
        'Barcode',
        'Status',
        'Case_qty',
        'Case',
        'Stock',
        'Stock_Type',
        'Inventory',
        'Inventory_2',
        'cost_value',
        'price_include_tax',
        'Minimum_price',
        'ListCostGP',
        'MovingAvgCost',
        'MovingAvgCostGP',
        'LastGRCost',
        'LastGRCostGP',
        'FifoCostGP',
        'TargetGP',
        'sstTaxCode',
        'Division',
        'Principle',
        'Colour',
        'Size',
        'PurchaseGroup',
        'IssueStamp',
        'createdBy',
        'LastStamp',
        'updateBy',
        'shelflife',
        'unit_weight',
        'weight_tolerance',
        'unit_volume',
        'unit_length',
        'unit_width',
        'unit_height',
        'weight',
        'option',
        'mempoint_base_on_qty',
        'Point_Multiplier',
        'labelInfo',
        'auto_soq',
        'auto_ordering',
        'ibtict_type',
        'minqty',
        'max_qty',
        'display_qty',
        'min_day',
        'max_day',
        'leadtime',
        'buffer_stock',
        'stock_days',
        'top_sales_buffer',
      ],
      search: {
        options: [],
        type: "",
        value: "",
        showTable: false
      },
      ajsonhild: {},
      jsonBarcode:{},
      resjson: {},
      jsonListedBranch:{},
      all_supcus: {},
      all_location: {},
      status: false,
      // page_function: this.$route.name,
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
      supplier_ori_params: {},
      item_ori_params: {},
      barcode_ori_params: {},
      miscellaneous_ori_params: {},
      status_ori_params: {},
      itemtype_ori_params: {},
      pricetype_ori_params: {},
      bannersite_ori_params: {},
      restriction_ori_params: {},
      pricechange_ori_params: {},
      costchangeItem_ori_params: {},
      costchangeSupplier_ori_params: {},
      goodreceiving_ori_params: {},
      permanentdiscount_ori_params: {},
      priceBreak_ori_params: {},
      ibtpurchase_ori_params: {},
      todayprice_ori_params: {},
      threePlusOne_ori_params: {},
      arsales_ori_params: {},
      purchasepromo_ori_params: {},
      possales_ori_params: {},
      po_ori_params: {},
      attribute_ori_params: {},
      parentchild_ori_params: {},
      ibtsales_ori_params: {},
      assortment_ori_params: {},
      qoh_ori_params: {},
      movementSite_ori_params: {},
      movementLocation_ori_params: {},
      promodiscount_ori_params: {},
      multibuy_ori_params: {},
      mixmatch_ori_params:{},
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
      division_options:[],
      sub_dept_options:[],
      category_options:[],
      manufacturer_options:[],
      brand_options:[],
      origin_options:[],
      size_options:[],
      poGroup_options: [],
      item_type_options:[],
      SoldByWeight: false,
      all_dept:[],
      all_sub_dept:[],
      all_category:[],
      all_division:[],
      loading_sub_dept:false,
      loading_dept:false,
      loading_category:false,
      loading_brand:false,
      loading_division:false,
      um_options:[],
      um_options2:[],
      color_options:[],
      price_type_options:[],
      show_barcode_dialog:false,
      show_listed_branch_dialog:false,
      edit_barcode:false,
      edit_listed_branch:false,
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
      show_assortment_dialog: false,
      show_promoDiscount_dialog: false,
      show_itemtype_dialog: false,
      show_pricetype_dialog: false,
      show_restriction_dialog: false,
      show_replenishment_dialog: false,
      show_pricebreak_dialog: false,
      edit_pricebreak:false,
      pricebreak_loading: false,
      show_permanentDiscount_dialog: false,
      edit_permanentDiscount: false,
      permanentdisc_loading: false,
      branch_details:{},
      supplier_item_ori_params:{},
      supplier_item_table_data:[],
      supplier_item_table_column:[],
      show_supplier_item_dialog:false,
      delete_json:{},
      offset: 0,
      total_row: 0,
      disable_previous_button: false,
      disable_next_button: false,
    }
  },
  components:{
    Label,
    LabelInputVerticalGeneral,
    LabelSelectVerticalGeneral,
    Button,
    ImageUploader,
    Chip,
    ButtonMobile,
    Input,
    Select,
    Datepicker,
    Checkbox,
    Toggle,
    PurchaseTable,
    // SupplierItemListTable,
    Button_icon,
    SelectFilter,
    // Radio,
    // SelectPlaceholder,
    Textarea,
    SearchPopUp,
    Table,
    Button,
    MultipleSelect,
  },
  computed: {
    // isInputDisabled() {
    //   return this.json.stock_type !== '1';
    // },
    
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
    divisionOptions() {
      if(this.all_division.length > 0){

       var option = this.all_division.map((item) => {
        return {
          label: item.GROUP_CODE,
          value: item.GROUP_CODE
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
    // this.updateInputDisabledState(this.json.stock_type);
    this.showAddLoading = true;
    // await this.getTableTotalRow()
    // await this.get_listed_branch_options()
    // await this.get_poGroup_options()
    // await this.getSupcusDropdown()
    // await this.getItemcodeDropdown()
    // await this.getBrandDropdown();
    // await this.getManufacturerDropdown();
    // await this.getOriginDropdown();
    // await this.getItemSizeDropdown();
    // await this.getItemTypeDropdown();
    // await this.getColorDropdown();
    // await this.getPriceTypeDropdown();
    var concept_branch_code = await this.call_concept_branch_code();

    this.listedBranch_options = concept_branch_code;

    await this.getCustomDropdownAll();
    // await this.getAllCategoryOptions();

    // var processedResults = await this.fetchAllData();

    // var subdept_results =processedResults.subdept.detail ;
    // var tax_results = processedResults.Tax.detail;
    // var tax_purchase_results = processedResults.tax_purchase.detail;
    // var tax_supply_results = processedResults.tax_supply.detail;
    // this.all_sub_dept = subdept_results

    // var subdept_code = [];
    // var subdept_description = [];
    // var tax_list = [
    //   {
    //     "label":"NA",
    //     "value":"NA",
    //   }
    // ];
    // var tax_purchase_list = [];
    // var tax_supply_list = [];

    // for(var i in tax_results)
    // {
    //   var sample = tax_results[i];


    //   var obj = {
    //     label: sample.TaxDesc,
    //     value: sample.TaxCode
    //   }
    //   tax_list.push(obj);
    // }

    // for(var i in tax_purchase_results)
    // {
    //   var sample = tax_purchase_results[i];

    //   var obj = {
    //     label: sample.description,
    //     value: sample.gst_tax_code
    //   }
    //   tax_purchase_list.push(obj);
    // }

    // for(var i in tax_supply_results)
    // {
    //   var sample = tax_supply_results[i];


    //   var obj = {
    //     label: sample.description,
    //     value: sample.gst_tax_code
    //   }
    //   tax_supply_list.push(obj);
    // }

    // this.tax_options = tax_list
    // this.tax_purchase_options = tax_purchase_list
    // this.tax_supply_options = tax_supply_list

    this.json.price_include_tax = '0.00';
    this.json.MinPrice = '0.00';
    this.json.ListCostGP = '0.00';
    this.json.MovingAvgCostGP = '0.00';
    this.json.LastGRCostGP = '0.00';
    this.json.FifoCostGP = '0.00';

    this.json.usedate = '0';
    this.json.YieldRatio = '0';
    this.json.WeightTraceQtyUOM = '0';
    this.json.WeightTraceQty = '0';
    this.json.unit_weight = '0.000000';
    this.json.unit_volume = '0.000000';
    this.json.unit_length = '0.000000';
    this.json.unit_width = '0.000000';
    this.json.unit_height = '0.000000';
    this.json.Point = '0';

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
    this.json.margin = '0.00';


    if(this.page_function == 'view' || this.page_function == 'edit')
    {
      // this.photo = await this.getPhoto();
      await this.trigger_read_item_all();
    }
    else if (this.page_function == 'create' && this.type === 'duplicate_item_link')
    {
      this.showNotify("info", "Record has been duplicate successfully.<br>Please remember to save the record after make changes.");
      var storedItem = JSON.parse(sessionStorage.getItem('item'));
      console.log('storedItem')
      console.log(storedItem);
      if (storedItem) {
        this.json = storedItem;
        this.json.Itemcode = '';
        this.handleChangeDept(this.json.Dept)
      }
    }



    setTimeout(()=>{
      this.showAddLoading = false;
      console.log('json',this.json);
    },2500)

    var offset = Number(this.$route.query.offset);
    var total_row = Number(this.$route.query.total_row);

    if(offset !== null && offset !== undefined && offset !== '' && total_row !== null && total_row !== undefined && total_row !== '')
    {
        this.offset = offset;
        this.total_row = total_row;

        this.disable_previous_button = offset <= '0';
        this.disable_next_button = offset >= total_row;
    }

  },
  async created()
  {
    var Itemcode = this.$route.query.Itemcode;

    if(Itemcode)
    {
      if(this.$route.name == 'ItemmasterView')
      {
        this.page_function = 'view'

        var json = {
          name: this.$route.name,
          query: this.$route.query,
        };

        sessionStorage.setItem("original_route", JSON.stringify(json));
      }
      else if(this.$route.name == 'EditItemmaster')
      {
        this.page_function = 'edit'
      }

      this.Itemcode = Itemcode;

    }
    else
    {
      if(this.$route.name == 'CreateItemmaster')
      {
        this.page_function = 'create'
        this.showAddLoading = false;
      }
      else
      {
        alert('Parameter incorrect');
        this.$router.push("Itemmaster");
        return;
      }
    }

    

  },

  methods: {
    handleCancel()
    {
      var route = JSON.parse(sessionStorage.getItem("original_route"));
      
      this.$router.push({
        name: route.name,
        query: route.query
      });
      
    },
    // updateInputDisabledState(stockType) {
      
    //   this.isInputDisabled = stockType !== '1';
    // },
    async call_concept_branch_code()
    {
      var payload = {
        "pass_json": {
          "outlet_guid": this.session_outlet_guid,
          "language": this.language,
          // "SET_SUPPLIER_CODE": this.json.Code,
          "limit": 99999999
        }//pass_json should be the field or data wish to be created.
      };

      var object_pass = {
        "dispatch": 'setup/trigger_post_get_set_concept_set_branch', //refer to path/function_name in store actions.js
        "getter": 'setup/get_get_set_concept_set_branch', //refer to path/function_name in store getters.js
        "app": this, //compulsory passed variable
        "payload": payload //payload that needed to use in store actions.js
      };

      var dispatch_response = await this.$dispatch(object_pass);

      var array = [];

      if(dispatch_response.status)
      {
        var results = dispatch_response.response.detail;

        for (const index in results) {

          var object = {
            "label": results[index].BRANCH_CODE,
            "value": results[index].BRANCH_CODE
          };

          array.push(object);
        }

      }

      return array;

    },
    async addItem()
    {

      if(!this.item_table_data.data)
      {
        this.showNotify('negative', 'Please select row to continue');
        return;
      }

      var selected_row = JSON.parse(JSON.stringify(this.item_table_data.data.results.find(row => row.select === true)));

      if(!selected_row)
      {
        this.showNotify('negative', 'Please select row to continue');
        return;

      }

      this.item_loading = true;

      this.json.ItemLink = selected_row.ItemLink;
      this.json.vendor_code = selected_row.vendor_code;
      this.json.ItemLink = selected_row.ItemLink;
      this.json.PackSize = selected_row.PackSize;
      this.json.UM = selected_row.UM;
      this.json.BulkQty = selected_row.BulkQty;
      this.json.UMBulk = selected_row.UMBulk;
      this.json.cartonprice = selected_row.cartonprice;
      this.json.Description = selected_row.Description;
      this.json.DesShort = selected_row.DesShort;
      this.json.Dept = selected_row.Dept;
      this.json.SubDept = selected_row.SubDept;
      this.json.Category = selected_row.Category;
      this.json.ArticleNo = selected_row.ArticleNo;
      this.json.Manufacturer = selected_row.Manufacturer;
      this.json.Brand = selected_row.Brand;
      this.json.Origin = selected_row.Origin;
      this.json.Colour = selected_row.Colour;
      this.json.Size = selected_row.Size;
      this.json.ItemType = selected_row.ItemType;
      this.json.price_type = selected_row.price_type;
      this.json.TaxCode = selected_row.TaxCode;
      this.json.tax_code_purchase = selected_row.tax_code_purchase;
      this.json.tax_code_suppl = selected_row.tax_code_suppl;
      this.json.remark = selected_row.remark;
      this.json.SafetyLevel = selected_row.SafetyLevel;
      this.json.ReorderQty = selected_row.ReorderQty;
      this.json.MaxLevel = selected_row.MaxLevel;
      this.json.Disable = selected_row.Disable;
      this.json.mempoint_base_on_qty = selected_row.mempoint_base_on_qty;
      this.json.stock_type = selected_row.stock_type;
      this.json.basic_link = selected_row.basic_link;
      this.json.new_status = selected_row.new_status;
      this.json.cost_value = selected_row.cost_value;
      this.json.ListCostGP = selected_row.ListCostGP;
      this.json.MovingAvgCostGP = selected_row.MovingAvgCostGP;
      this.json.LastGRCostGP = selected_row.LastGRCostGP;
      this.json.FifoCostGP = selected_row.FifoCostGP;
      this.json.im_pur_group = selected_row.im_pur_group;
      this.json.usedate = selected_row.usedate;
      this.json.WeightTraceQtyUOM = selected_row.WeightTraceQtyUOM;
      this.json.WeightTraceQty = selected_row.WeightTraceQty;
      this.json.trace_sn = selected_row.trace_sn;
      this.json.label_info = selected_row.label_info;
      this.json.im_stock_day = selected_row.im_stock_day;
      this.json.im_min_day = selected_row.im_min_day;
      this.json.im_max_day = selected_row.im_max_day;
      this.json.im_lead_time = selected_row.im_lead_time;
      this.json.im_buffer_stock_day = selected_row.im_buffer_stock_day;
      this.json.im_top_sales_buffer = selected_row.im_top_sales_buffer;
      this.json.Consign = selected_row.Consign;
      this.json.im_manual_soq = selected_row.im_manual_soq;
      this.json.im_manual_order = selected_row.im_manual_order;
      this.json.BarcodeType = selected_row.BarcodeType;
      this.json.inv_type = selected_row.inv_type;
      this.json.non_inventory = selected_row.non_inventory;
      this.json.zero_price = selected_row.zero_price;
      this.json.OpenItem = selected_row.OpenItem;
      this.json.BOM = selected_row.BOM;
      this.json.item_package = selected_row.item_package;
      this.json.BestBuy = selected_row.BestBuy;
      this.json.price_include_tax = this.formatAmount(selected_row.price_include_tax, '$')
      this.json.Point = this.formatAmount(selected_row.Point, '$')
      this.json.YieldRatio = this.formatAmount(selected_row.YieldRatio, '$')
      this.json.RSP_inc_tax = this.formatAmount(selected_row.RSP_inc_tax, '$')
      this.json.SellingPrice = selected_row.SellingPrice //got show in table, just take formatted value
      this.json.StdCost = this.formatAmount(selected_row.StdCost, '$')
      this.json.LastCost = this.formatAmount(selected_row.LastCost, '$')
      this.json.AverageCost = this.formatAmount(selected_row.AverageCost, '$')
      this.json.FIFOCost = this.formatAmount(selected_row.FIFOCost, '$')
      this.json.MinPrice = this.formatAmount(selected_row.MinPrice, '$')
      this.json.unit_weight = this.formatAmount(selected_row.unit_weight, '$')
      this.json.unit_length = this.formatAmount(selected_row.unit_length, '$')
      this.json.unit_width = this.formatAmount(selected_row.unit_width, '$')
      this.json.unit_height = this.formatAmount(selected_row.unit_height, '$')
      this.json.unit_volume = this.formatAmount(selected_row.unit_volume, '$')
      this.json.margin = this.formatAmount(selected_row.margin, '$')
      this.json.Itemcode = '';
      this.handleChangeDept(this.json.Dept);
      this.handleChangePrice();

      this.item_loading = false;
      this.item_dialog = false;
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
    showSearchTable()
    {
      
      if(!this.search_value)
      {
        this.showNotify('negative', 'Please enter search value.')
        this.show_table = false;
        return;
      }

      this.show_table = true;
    },
    showSearchDialog()
    {
      if(this.page_function != 'create')
      {
        return;
      }

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
            console.log(dispatch_response.response.detail)

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
            console.log(this.item_table_data)
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

        // }

        this.item_table_column = table_column;
        this.itemForceLoading = false;
    },
    async getPhoto()
    {
      var payload = {
        "params": {
          "Itemcode" : this.Itemcode,
          "outlet_guid": this.session_outlet_guid
        },
      };

      var object_pass = {
          "dispatch": 'itemmaster/trigger_get_get_photo',
          "getter": 'itemmaster/get_get_photo',
          "app": this,
          "payload": payload,
      };

      var dispatch_response = await this.$dispatch(object_pass);

      if(dispatch_response.status)
      {
        console.log(dispatch_response)
      }
      else
      {
        var error_message = 'Failed. Please try again.';

        var isValidJSON = this.isValidJSON(data.response);

        if(isValidJSON)
        {
          var json_message = JSON.parse(data.response);
          var error_message = json_message.detail ? json_message.detail : error_message;
        }
        else
        {
          var error_message = data.response;
        }

        var show_error = "";

        show_error = error_message;

        this.showNotify('negative', show_error);
        this.showAddLoading = false;
      }
    },
    handleTabClick()
    {
      if(this.tab == 'Purchase')
      {
        if(this.active_section6 == 'Supplier')
        {
          this.supplier_table_function(this.supplier_ori_params)
        }
      }
    },
    async handleConfirmDuplicateItemlink()
    {
      this.$nextTick(async ()=>{
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
            return;
        }

        this.showAddLoading = true;

        sessionStorage.setItem('item', JSON.stringify(this.json))

        this.$router.push({
          name: 'CreateItemmaster',
          query: { total_row: this.total_row, type: 'duplicate_item_link' }
        })

        this.page_function = 'create'

        this.showAddLoading = false;
      })
    },
    async handleDuplicateItemLink()
    {
      this.showDuplicateConfirmation = true;
    },
    async saveUploadPhoto()
    {
      this.upload_photo_dialog_loading = true;

      if(this.fileselected == ""){
        this.showNotify("negative","No file chosen.");
        this.upload_photo_dialog_loading = false;
        return;
      }

      this.upload_photo_dialog_loading = true;
      var formData = new FormData();
      formData.append("file", this.fileselected[0]);

      var payload = {
        pass_json: formData,
        params: {
          "outlet_guid": this.session_outlet_guid,
          "language": this.language,
          "Itemcode": this.Itemcode,
        },
        headers: {
          "Content-Type": "multipart/form-data",
        }
      }

      var object_pass = {
          "dispatch": 'itemmaster/trigger_post_upload_photo',
          "getter": 'itemmaster/get_upload_photo_status',
          "app": this,
          "payload": payload,

      };

      var dispatch_response = await this.$dispatch(object_pass);

      if(dispatch_response.status)
      {
        this.upload_photo_dialog = false;
        this.upload_photo_dialog_loading = false;
        this.$refs.uploader.removeQueuedFiles();
        this.fileselected = '';
        this.showNotify('positive', dispatch_response.response.message)
      }
      else
      {
        var error_message = 'Please update the necessary information and try again.';

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
        this.$refs.uploader.removeQueuedFiles();
        this.fileselected = '';
        this.upload_photo_dialog_loading = false;
        return;
      }
    },
    handleFileUpload(file)
    {
      this.fileselected = file;
    },
    showUploadPhoto()
    {
      this.upload_photo_dialog = true;
      this.fileselected = null;
    },
    closeUploadPhotoDialog()
    {
      this.upload_photo_dialog = false;
      this.fileselected = null;
    },
    async editHeaderBarcode(barcode)
    {
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
      var Point = this.unformatAmount(this.json.Point);
      var Colour = this.json.Colour;
      var Size = this.json.Size;
      var ItemType = this.json.ItemType;
      var price_type = this.json.price_type;
      var YieldRatio = this.unformatAmount(this.json.YieldRatio);
      var RSP_inc_tax  = this.unformatAmount(this.json.RSP_inc_tax,'$','2');
      var TaxCode =this.json.TaxCode;
      var tax_code_purchase = this.json.tax_code_purchase;
      var tax_code_supply = this.json.tax_code_supply
      var SellingPrice = this.unformatAmount(this.json.SellingPrice,'$','2');
      var StdCost = this.unformatAmount(this.json.StdCost,'$','2')
      var remark = this.json.remark;
      var LastCost = this.unformatAmount(this.json.LastCost,'$','2');
      var AverageCost = this.unformatAmount(this.json.AverageCost,'$','2');
      var FIFOCost = this.unformatAmount(this.json.FIFOCost,'$','2');
      var SafetyLevel = this.json.SafetyLevel;
      var ReorderQty= this.json.ReorderQty;
      var MaxLevel= this.json.MaxLevel;
      var MinPrice= this.unformatAmount(this.json.MinPrice,'$','2');
      var Disable= this.json.Disable;
      var unit_weight= this.unformatAmount(this.json.unit_weight,'$','6');
      var unit_length= this.unformatAmount(this.json.unit_length,'$','6');
      var unit_width= this.unformatAmount(this.json.unit_width,'$','6');
      var unit_height= this.unformatAmount(this.json.unit_height,'$','6');
      var unit_volume= this.unformatAmount(this.json.unit_volume,'$','6');
      var margin= this.unformatAmount(this.json.margin);
      var non_inventory= this.json.non_inventory ? 1 : 0;
      var zero_price= this.json.zero_price ? 1 : 0;
      var OpenItem= this.json.OpenItem ? 1 : 0;
      var mempoint_base_on_qty= this.json.mempoint_base_on_qty;
      var stock_type= this.json.stock_type;
      var basic_link= this.json.basic_link;
      var new_status= this.json.new_status;
      var cost_value= this.json.cost_value;
      var price_include_tax= this.json.price_include_tax;
      var ListCostGP= this.json.ListCostGP;
      var MovingAvgCostGP= this.json.MovingAvgCostGP;
      var LastGRCostGP= this.json.LastGRCostGP;
      var FifoCostGP= this.json.FifoCostGP;
      var im_pur_group= this.json.im_pur_group;
      var BOM= this.json.BOM ? 1 : 0;
      var item_package= this.json.item_package ? 1 : 0;
      var BestBuy= this.json.BestBuy ? 1 : 0;
      var usedate= this.json.usedate;
      var WeightTraceQtyUOM= this.json.WeightTraceQtyUOM;
      var WeightTraceQty= this.json.WeightTraceQty;
      var trace_sn= this.json.trace_sn;
      var label_info= this.json.label_info;
      var im_stock_day= this.json.im_stock_day;
      var im_min_day= this.json.im_min_day;
      var im_max_day= this.json.im_max_day;
      var im_lead_time= this.json.im_lead_time;
      var im_buffer_stock_day= this.json.im_buffer_stock_day;
      var im_top_sales_buffer= this.json.im_top_sales_buffer;
      var Consign= this.json.Consign;
      var im_manual_soq = this.json.im_manual_soq;
      var im_manual_order = this.json.im_manual_order;
      var BarcodeType = this.json.BarcodeType;
      var outlet_guid= this.session_outlet_guid;
      var inv_type = this.json.inv_type;
      var language= this.language;
      var im_updated_by= this.session_user_guid;

      var payload = {
        "pass_json": {
          "vendor_code":vendor_code,
          "itemcode":itemcode,
          "ItemLink":ItemLink,
          "PackSize":PackSize,
          "UM": UM,
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
          "FIFOCost":FIFOCost,
          "SafetyLevel":SafetyLevel,
          "ReorderQty":ReorderQty,
          "MaxLevel":MaxLevel,
          "MinPrice":MinPrice,
          "Disable":Disable,
          "unit_weight":unit_weight,
          "unit_length":unit_length,
          "unit_width":unit_width,
          "unit_height":unit_height,
          "unit_volume":unit_volume,
          "margin":margin,
          "non_inventory":non_inventory,
          "zero_price":zero_price,
          "OpenItem":OpenItem,
          "mempoint_base_on_qty":mempoint_base_on_qty,
          "stock_type": stock_type,
          "basic_link": basic_link,
          "new_status": new_status,
          "cost_value": cost_value,
          "price_include_tax": price_include_tax,
          "ListCostGP": ListCostGP,
          "MovingAvgCostGP": MovingAvgCostGP,
          "LastGRCostGP": LastGRCostGP,
          "FifoCostGP": FifoCostGP,
          "im_pur_group": im_pur_group,
          "im_updated_by": im_updated_by,
          "BOM": BOM,
          "item_package": item_package,
          "BestBuy": BestBuy,
          "usedate": usedate,
          "WeightTraceQtyUOM": WeightTraceQtyUOM,
          "WeightTraceQty": WeightTraceQty,
          "trace_sn": trace_sn,
          "label_info": label_info,
          "im_stock_day": im_stock_day,
          "im_min_day": im_min_day,
          "im_max_day": im_max_day,
          "im_lead_time": im_lead_time,
          "im_buffer_stock_day": im_buffer_stock_day,
          "im_top_sales_buffer": im_top_sales_buffer,
          "im_manual_soq": im_manual_soq,
          "im_manual_order": im_manual_order,
          "Consign" : Consign,
          "inv_type" : inv_type,
          "BarcodeType" : BarcodeType,
          "outlet_guid":outlet_guid,
          "language":language,
          "ItemBarcode": barcode,
        },//pass_json should be the field or data wish to be created.
        "params": {}
      };

      var object_pass = {
        "dispatch": 'itemmaster/trigger_post_update_item_new', //refer to path/function_name in store actions.js
        "getter": 'itemmaster/get_create_item_new', //refer to path/function_name in store getters.js
        "app": this, //compulsory passed variable
        "payload": payload //payload that needed to use in store actions.js
      };

      var data = await this.$dispatch(object_pass);

      if(data.status)
      {
          this.trigger_read_item_all(this.ori_payload)
      }else
      {
        var error_message = 'Failed. Please try again.';

        var isValidJSON = this.isValidJSON(data.response);

        if(isValidJSON)
        {
          var json_message = JSON.parse(data.response);
          var error_message = json_message.detail ? json_message.detail : error_message;
        }
        else
        {
          var error_message = data.response;
        }

        var show_error = "";

        show_error = error_message;

        this.showNotify('negative', show_error);
        this.showAddLoading = false;
      }
    },
    handleChangeCode(code)
    {
      var filter = this.supplier_code_options.filter((entry)=>{
        return entry.value == code
      })
      this.sup_json.Name = filter[0].name;
    },
    handleChangeName(name)
    {
      var filter = this.supplier_name_options.filter((entry)=>{
        return entry.value == name
      })
      this.sup_json.Code = filter[0].code;
    },
    async getSupplier()
    {
      var payload = {
        "pass_json": {
            "type": 'S',
            "outlet_guid": this.session_outlet_guid,
            "language": this.language,
            "limit": 9999999,
            "sort_by": "Code",
            "sort_type": "asc",
        },
      };

      var object_pass = {
        "dispatch": 'itemmaster/trigger_post_get_supcus_dropdown',
        "getter": 'itemmaster/get_supcus_dropdown',
        "app": this,
        "payload": payload,
      };

      var dispatch_response = await this.$dispatch(object_pass);
      var ary = [];
      var ary2 = [];

      if(dispatch_response.status){
        if(dispatch_response.response.detail && dispatch_response.response.detail.length > 0)
        {
          for(var i in dispatch_response.response.detail)
          {
          var new_row = dispatch_response.response.detail[i]
          var obj = {
              label: new_row.Code + ' - ' + new_row.Name,
              value: new_row.Code,
              name: new_row.Name
          }
          var obj2 = {
              label: new_row.Code + ' - ' + new_row.Name,
              value: new_row.Name,
              code: new_row.Code
          }

          ary.push(obj)
          ary2.push(obj2)
          }
        }
      }
      else
      {
        var error_message = 'Failed to get supplier. Please try again.';
        this.showNotify("negative", error_message);
      }

      return {
        "code_array": ary,
        "name_array": ary2
      };

    },
    async saveSupplierItem()
    {
        var validate = await this.validate_form("save_child_form");

        if(!validate)
        {
            this.showNotify("negative","Please make sure all field is correct.");
            this.showAddLoading = false;
            return;
        }

        this.showAddLoading = true;
        this.supplier_loading = true;

        var priority_vendor = this.sup_json.priority_vendor;
        var Code = this.sup_json.Code;
        var Name = this.sup_json.Name;
        var TaxCode = this.sup_json.TaxCode;
        var OrderLotSize = this.sup_json.OrderLotSize;
        var carton_qty = this.sup_json.carton_qty;
        var SupStdPrice = this.sup_json.SupStdPrice;
        var Disc1Type = this.sup_json.Disc1Type;
        var Disc1Value = this.sup_json.Disc1Value;
        var Disc2Type = this.sup_json.Disc2Type;
        var Disc2Value = this.sup_json.Disc2Value;
        var net_cost = this.sup_json.net_cost;
        var cartonprice = this.sup_json.cartonprice;
        var last_cost = this.sup_json.last_cost;
        var SupRSPAfterTax = this.sup_json.SupRSPAfterTax;
        var SupRSPBeforeTax = this.sup_json.SupRSPBeforeTax;
        var SupItemCode = this.sup_json.SupItemCode;
        var block_order = this.sup_json.block_order;
        var none_return = this.sup_json.none_return;
        var Updated_by = this.session_user_guid;

        var payload = {
          pass_json: {
            imsc_currency_code: 'NA', //hardcode
            um_case: 'NA', //hardcode
            Itemcode: this.json.Itemcode,
            ITEM_DESC: this.json.Description,
            user: this.session_user_guid,
            RefNo: this.RefNo,
            language: this.language,
            outlet_guid: this.outlet_guid,
            priority_vendor: priority_vendor,
            Code: Code,
            Name: Name,
            TaxCode: TaxCode,
            OrderLotSize: OrderLotSize,
            carton_qty: carton_qty,
            SupStdPrice: SupStdPrice,
            Disc1Type: Disc1Type,
            Disc1Value: Disc1Value,
            Disc2Type: Disc2Type,
            Disc2Value: Disc2Value,
            net_cost: net_cost,
            cartonprice: cartonprice,
            last_cost: last_cost,
            SupRSPAfterTax: SupRSPAfterTax,
            SupRSPBeforeTax: SupRSPBeforeTax,
            SupItemCode: SupItemCode,
            block_order: block_order,
            none_return: none_return,
            Updated_by: Updated_by,
          }
        }

        var object_pass = {};

        if(this.supplier_action == 'create')
        {
          payload.pass_json.Created_by = this.session_user_guid;

          object_pass = {
            "dispatch": 'itemmaster/trigger_create_itemmastersupcode',
            "getter": 'itemmaster/get_itemmastersupcode_status',
            "app": this,
            "payload": payload,
          };
        }
        // else if(this.supplier_action == 'edit')
        // {
        //   payload.pass_json.Qty_foc = '0'; //hardcode
        //   payload.pass_json.Line = JSON.stringify(this.ajson.Line);

        //   object_pass = {
        //     "dispatch": 'purchase/trigger_update_pochild_general',
        //     "getter": 'purchase/get_pochild_status',
        //     "app": this,
        //     "payload": payload,
        //   };
        // }

        var dispatch_response = await this.$dispatch(object_pass);

        if (dispatch_response.status) {
            // success condition
            var success_message = this.supplier_action == 'create' ? 'Created Successfully.' : 'Edited Successfully.';
            this.showNotify("positive", success_message);
            this.supplier_table_function(this.supplier_ori_params);
            this.showAddLoading = false;
            this.supplier_loading = false;
            this.supplier_action = null;
            this.supplier_dialog = false;
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
            this.supplier_loading = false;
        }
    },
    handleShowCreateSupplierItem()
    {
      this.supplier_dialog = true;
      this.supplier_action = 'create';
      this.sup_json = {
        priority_vendor: '',
        Code: '',
        Name: '',
        TaxCode: '',
        OrderLotSize: '',
        carton_qty: '',
        SupStdPrice: '',
        Disc1Type: '',
        Disc1Value: '',
        Disc2Type: '',
        Disc2Value: '',
        net_cost: '',
        cartonprice: '',
        last_cost: '',
        SupRSPAfterTax: '',
        SupRSPBeforeTax: '',
        SupItemCode: '',
        block_order: 0,
        none_return: 0,
      }
    },

    closeSupplierDialog()
    {
        this.supplier_dialog = false;
        this.supplier_action = null;
        this.sup_json = {};
    },
   
  //   handleItemTypeChange_Old(selectedItemType) {
  //   const selectedItem = this.item_type_options.find(entry => entry.value === selectedItemType);
  //   console.log('Selected Item:', selectedItem);

  //   if (selectedItem) {
      
  //     console.log()
  //     this.SoldByWeight = selectedItem.SoldbyWeight === 1;
  //     console.log('SoldByWeight set to:', this.SoldByWeight); // true if 1, false if 0
  //   }
  // },
  
  handleItemTypeChange(selectedItemType) {
    // Find the selected item in item_type_options
    const selectedItem = this.item_type_options.find(entry => entry.value === selectedItemType);
    // console.log('Selected Item:', selectedItem);

    if (selectedItem) {
      
      // console.log()
      this.SoldByWeight = selectedItem.SoldbyWeight === 1 ? 1 : 0;
      // console.log('SoldByWeight set to:', this.SoldByWeight); // true if 1, false if 0
    }
  },
    handleEditIM()
  {
    var offset = this.$route.query.offset;
    var total_row = this.$route.query.total_row;

    this.$router.push({
        name: "EditItemmaster",
        query: { Itemcode: this.Itemcode, offset: offset, total_row: total_row}
    });

  },

    async handlePagination(action)
    {

      this.showAddLoading = true;

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
        // await this.trigger_read_item_all(payload);

        var new_Itemcode = await this.getItemcode(payload);

        //here should call api and refetch data

        this.offset = offset;
        this.disable_previous_button = this.offset <= '0';
        this.disable_next_button = this.offset >= this.total_row;

        if(this.page_function == 'edit')
        {
          this.$router.push({
            name: 'EditItemmaster',
            query: { Itemcode: new_Itemcode, offset: offset, total_row: this.total_row }
          })
        }
        else if(this.page_function == 'view')
        {
          this.$router.push({
            name: 'ItemmasterView',
            query: { Itemcode: new_Itemcode, offset: offset, total_row: this.total_row }
          })
        }
    },
    handleGenerateReassignUOM()
    {
        this.generateDialog_RUOM = true;
    },
   runTableFunctionInformation() {
    // if (this.tab == 'Information') {
      if (this.active_section == 'Attribute') {
        this.table_function27(this.attribute_ori_params);
      } else if (this.active_section == 'Barcode') {

        this.barcode_table_function(this.barcode_ori_params);
      } else if (this.active_section == 'Miscellaneous') {

        this.table_function2(this.miscellaneous_ori_params);
      } else if (this.active_section == 'Parent & Child') {

        this.table_function28(this.parentchild_ori_params);
      } else if (this.active_section == 'Assortment') {

        this.table_function24(this.assortment_ori_params);
      }
    // }
   },
   runTableFunctionConfiguration() {
    // else if (this.tab == 'Configuration') {
      if (this.active_section2 == 'Status') {

        this.table_function3(this.status_ori_params)
      } else if (this.active_section2 == 'Item Type') {

        this.table_function4(this.itemtype_ori_params)
      }
      else if (this.active_section2 == 'Price Type') {

        this.table_function5(this.pricetype_ori_params)
      }
      else if (this.active_section2 == 'Restriction') {

        this.table_function7(this.restriction_ori_params)
      }
    // }
   },
   runTableFunctionReplenishment() {
    // else if (this.tab == 'Replenishment') {
     if (this.active_section3 == 'Banner/Site') {

        this.table_function6(this.bannersite_ori_params)
      }
    // }
   },
   runTableFunctionPurchase() {
    // else if (this.tab == 'Purchase') {
     if (this.active_section6 == 'Supplier') {

        this.supplier_table_function(this.supplier_ori_params)
      }
      else if (this.active_section6 == 'Cost Change') {

        this.table_function9(this.costchangeItem_ori_params)
        this.table_function10(this.costchangeSupplier_ori_params)
      }
      else if (this.active_section6 == 'Purchase Promo') {

        this.table_function18(this.purchasepromo_ori_params)
      }
      else if (this.active_section6 == 'Purchase Order') {

        this.table_function26(this.po_ori_params)
      }
      else if (this.active_section6 == 'Goods Receiving') {

        this.table_function11(this.goodreceiving_ori_params)
      }
      else if (this.active_section6 == 'IBT Purchase') {

        this.table_function14(this.ibtpurchase_ori_params)
      }
    // }
   },
   runTableFunctionSalesinfo() {
    // else if (this.tab == 'Sales Info') {
     if (this.active_section7 == `Today's Price`) {

        this.table_function15(this.todayprice_ori_params)
      }
      else if (this.active_section7 == 'Price Change') {

        this.table_function8(this.pricechange_ori_params)
      }
      else if (this.active_section7 == '3+1 Month') {

        this.table_function16(this.threePlusOne_ori_params);
      }
      else if (this.active_section7 == 'POS Sales') {

        this.table_function19(this.possales_ori_params);
      }
      else if (this.active_section7 == 'AR Sales') {

        this.table_function17(this.arsales_ori_params);
      }
      else if (this.active_section7 == 'IBT Sales') {

        this.table_function25(this.ibtsales_ori_params);
      }
    // }
   },
   runTableFunctionPromo() {
    // else if (this.tab == 'Promotion') {
      if (this.active_section5 == 'Promo Discount') {

          this.table_function22(this.promodiscount_ori_params);
        }
        else if (this.active_section5 == 'Multi Buy') {

          this.table_function21(this.multibuy_ori_params);
        }
        else if (this.active_section5 == 'Mix & Match') {

          this.table_function20(this.mixmatch_ori_params);
        }
        else if (this.active_section5 == 'Price Break') {

          this.table_function13(this.priceBreak_ori_params);
        }
        else if (this.active_section5 == 'Permanent Discount') {

          this.table_function12(this.permanentdiscount_ori_params);
        }
    // }
   },
   runTableFunctionInventory() {
    // else if (this.tab == 'Inventory') {
     if (this.active_section8 == 'QOH by Site') {

        this.table_function23(this.qoh_ori_params);
      }
      else if (this.active_section8 == 'Movement by Site') {

        this.table_function29(this.movementSite_ori_params);
      }
      else if (this.active_section8 == 'Movement by Location') {

        this.table_function30(this.movementLocation_ori_params);
      }
    // }
   },
  async getItemcode(payload)
  {
    var object_pass = {
        "dispatch": 'itemmaster/trigger_post_read_item_all', //refer to path/function_name in store actions.js
        "getter": 'itemmaster/get_read_item_all', //refer to path/function_name in store getters.js
        "app": this, //compulsory passed variable
        "payload": payload //payload that needed to use in store actions.js
    };

    var dispatch_response = await this.$dispatch(object_pass);
    // console.log('dispatch_response', dispatch_response);

    if(dispatch_response.status){
      if(dispatch_response.response.detail)
      {
        return dispatch_response.response.detail[0].Itemcode
      }else
      {
        this.showNotify('negative', 'Failed to get itemmaster result')
        this.$router.push('Itemmaster')
        return '';
      }
    }
    else
    {
      this.showNotify('negative', 'Failed to get itemmaster result')
      this.$router.push('Itemmaster')
      return '';
    }
  },
  async trigger_read_item_all(payload){

    this.showAddLoading = true;


    if(payload)
    {
      // alert('why if')
      // alert('if payload')
      var payload = payload;

    }
    else
    {
      // alert('else payload')
      var payload = {
        "pass_json": {
          "hierarchy": 0,
          "skip": 0,
          "limit": 1,
          "language": this.language,
          "Itemcode" : this.Itemcode,
          // "Itemcode" : this.Itemcode,
          "outlet_guid": this.session_outlet_guid
        },
        // "params": {}
      };
    }
    this.ori_payload = JSON.parse(JSON.stringify(payload))
    var object_pass = {
      "dispatch": 'itemmaster/trigger_post_read_item_all',
      "getter": 'itemmaster/get_read_item_all',
      "app": this,
      "payload": payload,
    };

    var dispatch_response_read_itemmaster_all = await this.$dispatch(object_pass);


    if(dispatch_response_read_itemmaster_all.status){
      var Itemcode = this.Itemcode;
      if(dispatch_response_read_itemmaster_all.response.detail.length > 0)
      {
        var filter = dispatch_response_read_itemmaster_all.response.detail[0]
        // this.json.Itemcode = filter.Itemcode
        // this.json.ItemLink = filter.ItemLink,
        // this.jsonBarcode.Barcode = filter.Barcode,
        // this.json.ArticleNo = filter.ArticleNo,
        // this.json.Description = filter.Description,
        // this.json.DesShort = filter.DesShort,
        // this.json.PackSize = filter.PackSize,
        // this.json.UM = filter.UM,
        //     this.json.UMBulk = filter.UMBulk,
        //     this.json.BulkQty = filter.BulkQty,
        //     this.json.cartonprice = filter.cartonprice,
        //     this.json.Dept = filter.Dept,
        //     this.json.SubDept = filter.SubDept,
        //     this.json.Category = filter.Category,
        //     this.json.Manufacturer = filter.Manufacturer,
        //     this.json.Brand = filter.Brand,
        //     this.json.Origin = filter.Origin,
        //     this.json.Point = filter.Point,
        //     this.json.Colour = filter.Colour,
        //     this.json.Size = filter.Size,
        //     this.json.ItemType = filter.ItemType,
        //     this.json.price_type = filter.price_type,
        //     this.json.YieldRatio = filter.YieldRatio,
        //     this.json.RSP_inc_tax = filter.RSP_inc_tax;
        //     this.json.TaxCode = filter.TaxCode;
        //     this.json.tax_code_purchase = filter.tax_code_purchase;
        //     this.json.tax_code_supply = filter.tax_code_supply;
        //     this.json.SellingPrice = filter.SellingPrice;
        //     this.json.StdCost = filter.StdCost;
        //     this.json.remark = filter.remark;
        //     this.json.LastCost = filter.LastCost;
        //     this.json.AverageCost = filter.AverageCost;
        //     this.json.FIFOCost = filter.FIFOCost;
        //     this.json.SafetyLevel = filter.SafetyLevel;
        //     this.json.ReorderQty = filter.ReorderQty;
        //     this.json.MaxLevel = filter.MaxLevel;
        //     this.json.MinPrice = filter.MinPrice;
        //     this.json.unit_length = filter.unit_length;
        //     this.json.unit_weight = filter.unit_weight;
        //     this.json.unit_width = filter.unit_width;
        //     this.json.unit_height = filter.unit_height;
        //     this.json.unit_volume = filter.unit_volume;
        //     this.json.margin = filter.margin,
        //     this.json.non_inventory = filter.non_inventory,
        //     this.json.zero_price = filter.zero_price;
        //     this.json.OpenItem = filter.OpenItem;
        //     this.json.mempoint_base_on_qty = filter.mempoint_base_on_qty;
        //     this.json.stock_type = filter.stock_type;
        //     this.json.basic_link = filter.basic_link;
        //     this.json.new_status = filter.new_status;
        //     this.json.cost_value = filter.cost_value;
        //     this.json.price_include_tax = filter.price_include_tax;
        //     this.json.ListCostGP = filter.ListCostGP;
        //     this.json.MovingAvgCostGP = filter.MovingAvgCostGP;
        //     this.json.LastGRCostGP = filter.LastGRCostGP;
        //     this.json.FifoCostGP = filter.FifoCostGP;
        //     this.json.po_group = filter.po_group;
        //     this.json.IssueStamp = filter.IssueStamp;
        //     this.json.LastStamp = filter.LastStamp;

        //     this.json.BOM = filter.BOM;

        //     this.json.item_package = filter.item_package;
        //     this.json.BestBuy = filter.BestBuy;

        //     this.json.usedate = filter.usedate
        //     this.json.WeightTraceQtyUOM = filter.WeightTraceQtyUOM
        //     this.json.WeightTraceQty = filter.WeightTraceQty
        //     this.json.trace_sn = filter.trace_sn
        //     this.json.label_info = filter.label_info
        //     this.json.imrep_stock_day = filter.imrep_stock_day;
        //     this.json.imrep_min_day = filter.imrep_min_day;
        //     this.json.imrep_max_day = filter.imrep_max_day;
        //     this.json.imrep_lead_time = filter.imrep_lead_time;
        //     this.json.imrep_buffer_stock_day = filter.imrep_buffer_stock_day;

        //     this.json.imrep_top_sales_buffer = filter.imrep_top_sales_buffer;
        //     this.json.Consign = filter.Consign;
        //     this.json.imrep_manual_soq = filter.imrep_manual_soq;
        //     this.json.imrep_manual_order = filter.imrep_manual_order;
        //     this.json.BarcodeType = filter.BarcodeType;
        //     this.json.inv_type = filter.inv_type;
        //     this.json.im_created_by = filter.im_created_by;
        //     this.json.im_updated_by = filter.im_updated_by;

        var payloadDept = {
          skip: 0,
          language : 'EN',
          limit:99999999,
          sort_by: "Code",
          sort_type: "ASC",
          MCode:  filter.Dept,
        };

        var subdept_results = await this.getSubDept(payloadDept);
        var subdept_code = [];
        for(var i in subdept_results.detail)
        {
          var sample = subdept_results.detail[i];
          var obj = {
            label: sample.Code+ ' - ' + sample.Description,
            value: sample.Code
          }
          subdept_code.push(obj);
        }

        this.sub_dept_options = subdept_code;

        //category options
        var payloadCategory = {
          language : this.language,
          skip: 0,
          limit: 99999999,
          MCode: filter.SubDept,
          sort_by: "Description",
          sort_type: "ASC",
        }

        var category = await this.getCategory(payloadCategory)
        var category_code = [];

        for(var i in category.detail)
        {
          var sample = category.detail[i];

          var obj = {
            label: sample.Code+ ' - ' + sample.Description,
            value: sample.Code
          }

          category_code.push(obj);
        }

        this.category_options = category_code
        console.log(filter)
        this.json = filter;

        this.handleChangePrice();

        this.Itemcode = filter.Itemcode;
        this.showAddLoading = false;
        // }
        }
      else
        {
          this.showNotify('negative', 'Failed to get itemmaster result')
          this.showAddLoading = false;
        }
    }
    this.showAddLoading = false;
  },
    
    addButtonMiscellaneous(){
      this.show_miscellaneous_dialog = true;
      this.miscellaneous_dialog_action = 'create';
      },
    handleShowCreateAttribute()
    {
      var table = JSON.parse(JSON.stringify(this.table_data27.data.results))
      if(table.length > 0)
      {
        this.showNotify("negative","Only one attribute is allowed.");
        return;
      }

      this.attribute_dialog = true;
      this.attribute_dialog_action = 'create';
      this.attrjson = {
        Organic_Certified: 0,
        Non_GMO: 0,
        No_Colouring: 0,
        Gluten_Free: 0,
        Plant_Based: 0,
        Pesticide_Free: 0,
        Direct_from_Farm: 0,
        Lactose_Free: 0,
        Free_Range: 0,
        Keto_Friendly: 0,
        Vegan: 0,
        Festive: 0,
        Non_Halal: 0,
        Product_Size: 0,
        Product_UOM: '',
        Denominator: 0,
        Per_Serving: 0,
        Serve_Size: 0,
        Serve_Size_UOM: '',
        Avg_Weight: 0,
        Avg_Weight_UOM: '',
        Avg_Weight_Denominator: 0,
        Avg_Weight_Price: 0,
        EStore_Tag: 0,
        EStore_Available: 0,
        EStore_Qty: 0,
        remarks: '',
      };
    },
    closeAttributeDialog()
    {
      this.attribute_dialog = false;
      this.attribute_dialog_action = null;
    },
    addButtonPromoDisc(payload){
      this.show_promoDiscount_dialog = true
      this.edit_promodiscount = false

      if(!this.edit_promodiscount){
        this.json.set_assorted_item__assorted_desc = ''
        this.json.description = ''
        this.json.remark = ''
      }

    },

    addButtonItemType(payload){
      this.show_itemtype_dialog = true
      this.edit_itemtype = false

      if(!this.edit_itemtype){
        this.json.itemtype = ''
        this.json.date_from = 0
        this.json.date_to = ''
        this.json.cancel = ''
        this.json.cancel_at = ''
        this.json.concept = ''
        this.json.last_refno = ''
        this.future_eff_date = ''
      }

    },
    addButtonPriceType(payload){
      this.show_pricetype_dialog = true
      this.edit_pricetype = false

      if(!this.edit_pricetype){
        this.json.pricetype = ''
        this.json.date_from = 0
        this.json.date_to = ''
        this.json.cancel = ''
        this.json.cancel_at = ''
        this.json.concept = ''
        this.json.last_refno = ''
        this.future_eff_date = ''
      }

    },
    

    handleChangeSetActive(newVal){
      this.$nextTick(()=>{
        this.json.set_active = newVal;
      });
    },
    handleChangeText1(newVal){
      this.$nextTick(()=>{
        this.json.text1 = newVal;
      });
    },
    handleChangeText2(newVal){
      this.$nextTick(()=>{
        this.json.text2 = newVal;
      });
    },
    handleChangeValue1(newVal){
      this.$nextTick(()=>{
        this.json.value1 = newVal;
      });
    },
    handleChangeValue2(newVal){
      this.$nextTick(()=>{
        this.json.value2 = newVal;
      });
    },
    handleChangeRemark(newVal){
      this.$nextTick(()=>{
        this.json.remark = newVal;
      });
    },
    handleChangeSeq(newVal){
      this.$nextTick(()=>{
        this.json.seq = newVal;
      });
    },
    handleChangeGroup(newVal){
      this.$nextTick(()=>{
        this.json.misc_group = newVal;
      });
    },


    // async genarateAddButton(){
    //   if(!this.edit_listed_branch){
    //     var payload = {
    //       "pass_json":{
    //         "outlet_guid": this.session_outlet_guid,
    //         "language": this.language,
    //         "branch": this.json.branch,
    //         "itemcode": this.Itemcode
    //       }
    //     }

    //     var object_pass = {
    //       "dispatch": 'itemmaster/trigger_post_create_itemmaster_listed_branch',
    //       "getter": 'itemmaster/get_itemmaster_listed_branch',
    //       "app": this,
    //       "payload": payload,
    //     };

    //     var dispatch_response_create_itemmaster_listed_branch = await this.$dispatch(object_pass);

    //     var status = dispatch_response_create_itemmaster_listed_branch.status
    //     if(status){

    //           this.showNotify('positive', 'Created Successfully')
    //           this.show_listed_branch_dialog = false;
    //           this.table_function3()

    //     }else{
    //       var get_error_message = JSON.parse(dispatch_response_create_itemmaster_listed_branch.response)
    //       if(get_error_message){
    //         this.showNotify('negative', get_error_message.detail);
    //       }else{
    //         this.showNotify('nagative', 'Created Failed')
    //       }
    //     }
    //   }else{

    //     var payload = {
    //       "pass_json":{
    //         "outlet_guid": this.session_outlet_guid,
    //         "language": this.language,
    //         // "Code": this.json.Code,
    //         "branch": this.get_listed_branch,
    //       }
    //     }

    //     var object_pass = {
    //       "dispatch": 'itemmaster/trigger_post_update_itemmaster_listed_branch',
    //       "getter": 'itemmaster/get_itemmaster_listed_branch',
    //       "app": this,
    //       "payload": payload,
    //     };

    //     var dispatch_response_update_itemmaster_listed_branch = await this.$dispatch(object_pass);
    //     var status = dispatch_response_update_itemmaster_listed_branch.status
    //     if(status){
    //         this.showNotify('positive', 'Updated Successfully')
    //         this.show_listed_branch_dialog = false;
    //         this.table_function3()
    //     }else{
    //       var get_error_message = JSON.parse(dispatch_response_update_itemmaster_listed_branch.response)
    //       if(get_error_message){
    //         this.showNotify('negative', get_error_message.detail);
    //       }else{
    //         this.showNotify('nagative', 'Updated Failed')
    //       }
    //     }
    //   }
    // },
    handleShowCreateItemMaster(){
      this.$router.push({ name: "CreateItemmaster" });

      this.table_data1 = {
        "data": {
            "count": 0,
            "next": null,
            "previous": null,
            "results": []
        }
    };
    this.table_data2 = {
        "data": {
            "count": 0,
            "next": null,
            "previous": null,
            "results": []
        }
    };
    this.table_data3 = {
        "data": {
            "count": 0,
            "next": null,
            "previous": null,
            "results": []
        }
    };
    this.table_data4 = {
        "data": {
            "count": 0,
            "next": null,
            "previous": null,
            "results": []
        }
    };
    this.table_data5 = {
        "data": {
            "count": 0,
            "next": null,
            "previous": null,
            "results": []
        }
    };
    this.table_data6 = {
        "data": {
            "count": 0,
            "next": null,
            "previous": null,
            "results": []
        }
    };
    this.table_data7 = {
        "data": {
            "count": 0,
            "next": null,
            "previous": null,
            "results": []
        }
    };
    this.table_data8 = {
        "data": {
            "count": 0,
            "next": null,
            "previous": null,
            "results": []
        }
    };
    this.table_data9 = {
        "data": {
            "count": 0,
            "next": null,
            "previous": null,
            "results": []
        }
    };
    this.table_data10 = {
        "data": {
            "count": 0,
            "next": null,
            "previous": null,
            "results": []
        }
    };
    this.table_data11 = {
        "data": {
            "count": 0,
            "next": null,
            "previous": null,
            "results": []
        }
    };
    this.table_data12 = {
        "data": {
            "count": 0,
            "next": null,
            "previous": null,
            "results": []
        }
    };
    this.table_data13 = {
        "data": {
            "count": 0,
            "next": null,
            "previous": null,
            "results": []
        }
    };
    this.table_data14 = {
        "data": {
            "count": 0,
            "next": null,
            "previous": null,
            "results": []
        }
    };
    this.table_data15 = {
        "data": {
            "count": 0,
            "next": null,
            "previous": null,
            "results": []
        }
    };
    this.table_data16 = {
        "data": {
            "count": 0,
            "next": null,
            "previous": null,
            "results": []
        }
    };
    this.table_data17 = {
        "data": {
            "count": 0,
            "next": null,
            "previous": null,
            "results": []
        }
    };
    this.table_data18 = {
        "data": {
            "count": 0,
            "next": null,
            "previous": null,
            "results": []
        }
    };
    this.table_data19 = {
        "data": {
            "count": 0,
            "next": null,
            "previous": null,
            "results": []
        }
    };
    this.table_data20 = {
        "data": {
            "count": 0,
            "next": null,
            "previous": null,
            "results": []
        }
    };
    this.table_data21 = {
        "data": {
            "count": 0,
            "next": null,
            "previous": null,
            "results": []
        }
    };
    this.table_data22 = {
        "data": {
            "count": 0,
            "next": null,
            "previous": null,
            "results": []
        }
    };
    this.table_data23 = {
        "data": {
            "count": 0,
            "next": null,
            "previous": null,
            "results": []
        }
    };
    this.table_data24 = {
        "data": {
            "count": 0,
            "next": null,
            "previous": null,
            "results": []
        }
    };
    this.table_data25 = {
        "data": {
            "count": 0,
            "next": null,
            "previous": null,
            "results": []
        }
    };
    this.table_data26 = {
        "data": {
            "count": 0,
            "next": null,
            "previous": null,
            "results": []
        }
    };
    this.table_data27 = {
        "data": {
            "count": 0,
            "next": null,
            "previous": null,
            "results": []
        }
    };

    },
    productHandleTableChange: function(newVal)
  {
      var new_params = this.$pluginsTableParams(newVal)

      var payload = {
          params : new_params
      };

      this.supplier_ori_params = payload;

      this.supplier_table_function(payload);
    },
    async supplier_table_function(ori_payload){
      // alert()
    this.SupplierForceLoading = true;

    // var payload = ori_payload.params
    var payload = {};
    // payload.skip = '0';
    // payload.limit = '5';
    // payload.outlet_guid = this.session_outlet_guid;//session
    // payload.language = this.language;
    // payload.Itemcode = this.Itemcode;

    // if(payload.ordering == "")
    // {
    //     payload.ordering = "Updated_at"
    // }
    var payload = {
        "pass_json": {
          "Itemcode": this.Itemcode,
          "outlet_guid": this.session_outlet_guid,
          "language": this.language,
          "sort_by" : "Updated_at",
          "limit" : 5,
          "skip": 0,
        },
      };
    // var payload = {
    //     "pass_json": payload//pass_json should be the field or data wish to be created.
    // };

    var object_pass = {
        "dispatch": 'itemmaster/trigger_post_itemmaster_itemmastersupcode', //refer to path/function_name in store actions.js
        "getter": 'itemmaster/get_itemmaster_read_itemmastersupcode', //refer to path/function_name in store getters.js
        "app": this, //compulsory passed variable
        "payload": payload //payload that needed to use in store actions.js
    };

    var dispatch_response = await this.$dispatch(object_pass);

    if(dispatch_response.status)
    {
        //success condition
        var results = dispatch_response.response.data;
        if(results.length > 0)
        {
          for(var i in results)
          {
              results[i].unit = {
                no: Number(i) + 1,
                priority: 'Priority',
                type: 'Type',
                Itemcode: results[i].Itemcode,
                ITEM_DESC: results[i].ITEM_DESC,
                imsc_currency_code: results[i].imsc_currency_code,
                order_uom: results[i].order_uom == 0 ? 'Unit' : 'Case',
                uom: 'Unit',
                cost: '0',
                Disc1Value: this.formatAmount(results[i].Disc1Value, '$'),
                Disc2Value: this.formatAmount(results[i].Disc2Value, '$'),
                listed_cost: '0',
                min_order_unit: this.formatAmount(results[i].min_order_unit, 'qty'),
                OrderLotSize: this.formatAmount(results[i].OrderLotSize, '$'),
                external_code: '0',
                SupRSPAfterTax: this.formatAmount(results[i].SupRSPAfterTax, '$'),
                SupRSPBeforeTax: this.formatAmount(results[i].SupRSPBeforeTax, '$'),
                // dept_code: results[i].itemmaster && results[i].itemmaster.Dept ? results[i].itemmaster.Dept : ' - ',
                // dept_description: results[i].itemmaster && results[i].itemmaster.dept_description ? results[i].itemmaster.dept_description : ' - ',
                // subdept_code: results[i].itemmaster && results[i].itemmaster.SubDept ? results[i].itemmaster.SubDept : ' - ',
                // subdept_description: results[i].itemmaster && results[i].itemmaster.subdept_description ? results[i].itemmaster.subdept_description : ' - ',
                // cat_code: results[i].itemmaster && results[i].itemmaster.Category ? results[i].itemmaster.Category : ' - ',
                // category_description: results[i].itemmaster && results[i].itemmaster.category_description ? results[i].itemmaster.category_description : ' - ',
                Updated_at: results[i].Updated_at,
                Updated_by: results[i].Updated_by,
                Created_at: results[i].Created_at,
                Created_by: results[i].Created_by,
                effective_date: '2024-08-30',
                uom2: 'Unit/Case',
                expected_cost: '0',
                disc12: '0',
                disc22: '0',
                listed_cost2: '0',
              };
              results[i].case = {
                block_order: results[i].block_order,
                none_return: results[i].none_return,
                order_uom: '1',
                uom_case: 'Unit',
                cost: '0',
                disc1value_case: this.formatAmount(results[i].disc1value_case, '$'),
                disc2value_case: this.formatAmount(results[i].disc2value_case, '$'),
                listed_cost: '0',
                min_order_case: this.formatAmount(results[i].min_order_case, 'qty'),
                orderlot_case: this.formatAmount(results[i].orderlot_case, '$'),
                uom2: '1',
                expected_cost: '0',
                disc12: '0',
                disc22: '0',
                listed_cost2: '0',
              };
            }
        }

        this.supplier_table_data =
        {
            "data": {
                "count": dispatch_response.response.rows,
                "next": null,
                "previous": null,
                "results": results
            }
        };

    }else
    {
        this.showNotify('negative', 'Failed to get supplier. Please try again.')
        //fail condition
        this.supplier_table_data = {
            "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
            }
        };
    }

    var table_column = [
        {
            name: 'block_order',
            required: true,
            label: 'Block Order',
            align: 'left',
            sortable: false,
            field: 'block_order',
            format_child: '',
            tooltip: '',
            headerStyle: 'text-align: center; width: 1%;',
            filter_type: 'input',
            filter_options: [],
            filter_value: '',
        },
        {
            name: 'none_return',
            required: true,
            label: 'None Returnable',
            align: 'left',
            sortable: false,
            field: 'none_return',
            format_child: '',
            tooltip: '',
            headerStyle: 'text-align: center; width: 1%;',
            filter_type: 'input',
            filter_options: [],
            filter_value: '',
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
            headerStyle: 'text-align: center; width: 1%;',
            filter_type: 'input',
            filter_options: [],
            filter_value: '',
        },
        {
            name: 'item_type',
            required: true,
            label: 'Item Type',
            align: 'left',
            sortable: true,
            field: 'item_type',
            format_child: '',
            tooltip: '',
            headerStyle: 'text-align: center; width: 1%;',
            filter_type: 'input',
            filter_options: [],
            filter_value: '',
        },
        {
            name: 'Itemcode',
            required: true,
            label: 'Item Code',
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
            name: 'ITEM_DESC',
            required: true,
            label: 'Description',
            align: 'left',
            sortable: true,
            field: 'ITEM_DESC',
            format_child: '',
            tooltip: '',
            headerStyle: 'text-align: center; width: 1%;',
            filter_type: 'input',
            filter_options: [],
            filter_value: '',
        },
        {
            name: 'supplier_item_code',
            required: true,
            label: 'Supplier Item Code',
            align: 'left',
            sortable: true,
            field: 'supplier_item_code',
            format_child: '',
            tooltip: '',
            headerStyle: 'text-align: center; width: 1%;',
            filter_type: 'input',
            filter_options: [],
            filter_value: '',
        },
        {
            name: 'listed_cost',
            required: true,
            label: 'Listed Cost',
            align: 'left',
            sortable: true,
            field: 'listed_cost',
            format_child: '',
            tooltip: '',
            headerStyle: 'text-align: center; width: 1%;',
            filter_type: 'input',
            filter_options: [],
            filter_value: '',
        },
        {
            name: 'percentage',
            required: true,
            label: '',
            align: 'left',
            sortable: true,
            field: 'percentage',
            format_child: '',
            tooltip: '',
            headerStyle: 'text-align: center; width: 1%;',
            filter_type: 'input',
            filter_options: [],
            filter_value: '',
        },
        {
            name: 'discount_1',
            required: true,
            label: 'Discount 1',
            align: 'left',
            sortable: true,
            field: 'discount_1',
            format_child: '',
            tooltip: '',
            headerStyle: 'text-align: center; width: 1%;',
            filter_type: 'input',
            filter_options: [],
            filter_value: '',
        },
        {
            name: 'percentage',
            required: true,
            label: '',
            align: 'left',
            sortable: true,
            field: 'percentage',
            format_child: '',
            tooltip: '',
            headerStyle: 'text-align: center; width: 1%;',
            filter_type: 'input',
            filter_options: [],
            filter_value: '',
        },
        {
            name: 'discount_2',
            required: true,
            label: 'Discount 2',
            align: 'left',
            sortable: true,
            field: 'discount_2',
            format_child: '',
            tooltip: '',
            headerStyle: 'text-align: center; width: 1%;',
            filter_type: 'input',
            filter_options: [],
            filter_value: '',
        },
        {
            name: 'percentage',
            required: true,
            label: '',
            align: 'left',
            sortable: true,
            field: 'percentage',
            format_child: '',
            tooltip: '',
            headerStyle: 'text-align: center; width: 1%;',
            filter_type: 'input',
            filter_options: [],
            filter_value: '',
        },
        {
            name: 'net_cost',
            required: true,
            label: 'Net Cost',
            align: 'right',
            sortable: true,
            field: 'net_cost',
            format_child: '',
            tooltip: '',
            headerStyle: 'text-align: center; width: 1%;',
            filter_type: 'input',
            filter_options: [],
            filter_value: '',
        },
        {
            name: 'carton_price',
            required: true,
            label: 'Carton Price',
            align: 'left',
            sortable: true,
            field: 'carton_price',
            format_child: '',
            tooltip: '',
            headerStyle: 'text-align: center; width: 1%;',
            filter_type: 'input',
            filter_options: [],
            filter_value: '',
        },
        {
            name: 'last_cost',
            required: true,
            label: 'Last Cost',
            align: 'left',
            sortable: true,
            field: 'last_cost',
            format_child: '',
            tooltip: '',
            headerStyle: 'text-align: center; width: 1%;',
            filter_type: 'input',
            filter_options: [],
            filter_value: '',
        },
        {
            name: 'carton_qty',
            required: true,
            label: 'Carton Qty',
            align: 'left',
            sortable: true,
            field: 'carton_qty',
            format_child: '',
            tooltip: '',
            headerStyle: 'text-align: center; width: 1%;',
            filter_type: 'input',
            filter_options: [],
            filter_value: '',
        },
        {
            name: 'rsp_after_tax',
            required: true,
            label: 'RSP After Tax',
            align: 'left',
            sortable: true,
            field: 'rsp_after_tax',
            format_child: '',
            tooltip: '',
            headerStyle: 'text-align: center; width: 1%;',
            filter_type: 'input',
            filter_options: [],
            filter_value: '',
        },
        {
            name: 'rsp_before_tax',
            required: true,
            label: 'RSP Before Tax',
            align: 'left',
            sortable: true,
            field: 'rsp_before_tax',
            format_child: '',
            tooltip: '',
            headerStyle: 'text-align: center; width: 1%;',
            filter_type: 'input',
            filter_options: [],
            filter_value: '',
        },

        {
            name: 'Created_at',
            required: true,
            label: 'Created at',
            align: 'left',
            sortable: true,
            field: 'Created_at',
            format_child: '',
            tooltip: '',
            headerStyle:'text-align: center; width: 1%;',
            filter_type: 'input',
            filter_options: [],
            filter_value: '',
        },
        {
            name: 'Created_by',
            required: true,
            label: 'Created by',
            align: 'left',
            sortable: true,
            field: 'Created_by',
            format_child: '',
            tooltip: '',
            headerStyle:'text-align: center; width: 1%;',
            filter_type: 'input',
            filter_options: [],
            filter_value: '',
        },
        {
            name: 'Updated_at',
            required: true,
            label: 'Updated at',
            align: 'left',
            sortable: true,
            field: 'Updated_at',
            format_child: '',
            tooltip: '',
            headerStyle:'text-align: center; width: 1%;',
            filter_type: 'input',
            filter_options: [],
            filter_value: '',
        },
        {
            name: 'Updated_by',
            required: true,
            label: 'Updated by',
            align: 'left',
            sortable: true,
            field: 'Updated_by',
            format_child: '',
            tooltip: '',
            headerStyle:'text-align: center; width: 1%;',
            filter_type: 'input',
            filter_options: [],
            filter_value: '',
        },
    ];

    if(this.page_function == 'create')
    {
        table_column = table_column.filter((entry)=>{
            return entry.name != 'action'
        })
    }

    this.supplier_table_column = table_column;
    this.SupplierForceLoading = false;
    },
    handleTableChange1: function(newVal)
    {


          var new_params = this.$pluginsTableParams(newVal)

          var payload = {
              params : new_params
          };

          this.barcode_ori_params = payload;

          if(this.tab != 'Information' || this.active_section != 'Barcode')
          {
            return;
          }
          this.barcode_table_function(payload);
    },
    async barcode_table_function(ori_payload){
        var payload = ori_payload.params

        // payload.Itemcode = this.Itemcode;
        // payload.Itemcode = this.Itemcode;
        // payload.outlet_guid = this.session_outlet_guid;//session
        // payload.language = this.language;

        var table_column1 = [
            {
                name: 'action',
                required: true,
                label: this.$language('D0028'),
                header_align: 'center',
                align: 'center',
                sortable: false,
                field: 'action',
                format_child: '',
                tooltip: '',
                headerStyle:'text-align: center; width: 1%;',
                filter_type: 'input',
                filter_options: [],
                filter_value: '',
            },
            // {
            //     name: 'Itemcode',
            //     required: true,
            //     label: 'Itemcode',
            //     align: 'left',
            //     sortable: true,
            //     field: 'Itemcode',
            //     format_child: '',
            //     tooltip: '',
            //     headerStyle: 'text-align: center;',
            // },
            {
                name: 'barcode_type',
                required: true,
                label: 'Type',
                align: 'center',
                sortable: true,
                field: 'barcode_type_display',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;',
            },
            {
                name: 'primary_barcode',
                required: true,
                label: 'Primary',
                align: 'center',
                sortable: true,
                field: 'primary_barcode',
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
                name: 'LastStamp',
                required: true,
                label: 'Updated At',
                align: 'left',
                sortable: true,
                field: 'LastStamp',
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
                name: 'IssueStamp',
                required: true,
                label: 'Created At',
                align: 'left',
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
        this.table_column1 = table_column1;
        //put return here
        if(this.page_function == 'create' || this.page_function == 'view')
          {
            // alert('barcode')
              table_column1 = table_column1.filter((entry)=>{
                  return entry.name != 'action'
              })
          }

        if(this.page_function == 'create'){
              this.table_data1 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
            return;
          }

        var payload = {
        "pass_json": {
          "Itemcode": this.Itemcode,
          "outlet_guid": this.session_outlet_guid,
          "language": this.language,
        },
      };

        this.ori_payload = JSON.parse(JSON.stringify(payload))
        var object_pass = {
            "dispatch": 'itemmaster/trigger_read_barcode_by_itemcode_new', //refer to path/function_name in store actions.js
            "getter": 'itemmaster/get_read_barcode_by_itemcode_new', //refer to path/function_name in store getters.js
            "app": this, //compulsory passed variable
            "payload": payload //payload that needed to use in store actions.js
          };

        var dispatch_response_barcode = await this.$dispatch(object_pass);

        var status = dispatch_response_barcode.status

        if(status == "failed"){
          this.table_data1 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
        }else{
          var results = dispatch_response_barcode.response.detail;
          
          for (const index in dispatch_response_barcode.response.detail)
          {

            if(dispatch_response_barcode.response.detail[index].barcode_type == '0')
            {
              var barcode_type_display = 'Code 128';              
            }
            else if(dispatch_response_barcode.response.detail[index].barcode_type == '1')
            {
              var barcode_type_display = 'EAN 8';              
            }
            else if(dispatch_response_barcode.response.detail[index].barcode_type == '2')
            {
              var barcode_type_display = 'EAN 13';              
            }
            else if(dispatch_response_barcode.response.detail[index].barcode_type == '3')
            {
              var barcode_type_display = 'UPC A - 12 digits';              
            }
            else if(dispatch_response_barcode.response.detail[index].barcode_type == '8')
            {
              var barcode_type_display = 'Weighing Code';              
            }
            else if(dispatch_response_barcode.response.detail[index].barcode_type == '9')
            {
              var barcode_type_display = 'Internal Code';              
            }
            else
            {
              var barcode_type_display = 'Not Found';  
            }

            dispatch_response_barcode.response.detail[index].barcode_type_display = barcode_type_display;

          }

          // else if(this.page_function == 'EditItemmaster'){
              this.table_data1 = {
              "data": {
                "count": dispatch_response_barcode.response.total_row,
                "next": null,
                "previous": null,
                "results": dispatch_response_barcode.response.detail
              }
            };
          // }


          this.results = dispatch_response_barcode.response.detail;
        }
    },
    addButtonBarcode(){
      this.show_barcode_dialog = true;
      this.edit_barcode = false;
      var barDesc = JSON.parse(JSON.stringify(this.json.Description));
      this.jsonBarcode = {
        barDesc: barDesc,
      };
    },
    async handleReceiveHandleEditBarcode(row)
    {
    this.show_barcode_dialog = true;
    this.edit_barcode = true;
    this.barcode.loading = true;
    this.edit_child = true;

    var result = JSON.parse(JSON.stringify(row.row));
    this.barcode.loading = false;
    this.jsonBarcode = result;
    },
    async handleAddBarcodeV1(){
      return;
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
            var Itemcode = this.json.Itemcode
            var Barcode = this.jsonBarcode.Barcode
            var NewBarcode = this.jsonBarcode.NewBarcode
            var barRemark = this.jsonBarcode.barRemark
            // var primary_barcode = this.jsonBarcode.primary_barcode
            // var barcode_type = this.jsonBarcode.barcode_type
            var user = this.user_name
            var language = this.language

            var payload2 = {
              "Itemcode" : Itemcode,
              "Barcode_old":Barcode,
              "Barcode_new"  : NewBarcode,
              "barRemark": barRemark,
              // "primary_barcode"  : primary_barcode,
              // "barcode_type": barcode_type,
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




          if(dispatch_response.status)
          {

            var set_query = {
              "itemcode":Itemcode,
              "barcode":NewBarcode,
              "barRemark": barRemark,
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
              this.barcode_table_function(this.ori_params);
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



        }else{
          console.log("Itemcode:", Itemcode);
          console.log("Barcode:", Barcode);
          console.log("NewBarcode:", NewBarcode);
        var Itemcode = this.json.Itemcode
        var Barcode = this.jsonBarcode.Barcode
        var primary_barcode = this.jsonBarcode.primary_barcode
        var barcode_type = this.jsonBarcode.barcode_type
        var barRemark = this.jsonBarcode.barRemark
        var user = this.user_name
        var language = this.language

        var payload = {
          "Itemcode" : Itemcode,
          "Barcode"  : Barcode,
          "barRemark": barRemark,
          "primary_barcode"  : primary_barcode,
          "barcode_type": barcode_type,
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
            this.barcode_table_function(this.ori_params);
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
    async handleAddBarcode()
    {

      if(this.json.BillStatus == 1)
      {
          this.showNotify("negative","This Doc already posted.");
          return;
      }

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
          this.showNotify("negative","Please make sure all field in product master is correct.");
          this.showAddLoading = false;
          return;
      }

      var validate = await this.validate_form("save_barcode_form");

      if(!validate)
      {
          this.showNotify("negative","Please make sure all field is correct.");
          return;
      }

      this.showAddLoading = true;
      this.barcode.loading = true;


      var bpayload = {
        "pass_json": {
          "Itemcode": this.Itemcode,
          "outlet_guid": this.session_outlet_guid,
          "language": this.language,
          "primary_barcode": 1,
        },
      };

      var object_pass = {
          "dispatch": 'itemmaster/trigger_read_barcode_by_itemcode_new', //refer to path/function_name in store actions.js
          "getter": 'itemmaster/get_read_barcode_by_itemcode_new', //refer to path/function_name in store getters.js
          "app": this, //compulsory passed variable
          "payload": bpayload //payload that needed to use in store actions.js
        };


      var dispatch_response_barcode = await this.$dispatch(object_pass);

      if(this.jsonBarcode.primary_barcode === 1) {
        if (dispatch_response_barcode.response.total_row > 0) {
          if(dispatch_response_barcode.response.detail[0].Barcode != this.jsonBarcode.Barcode)
          {
            this.showNotify('negative', 'Primary barcode has been set before, please disable to continue.');
            this.showAddLoading = false;
            this.barcode.loading = false;
            return;
          }
        }
      }
      else if(this.jsonBarcode.primary_barcode === 0) {
        if (dispatch_response_barcode.response.total_row > 0) {
          if(dispatch_response_barcode.response.detail[0].Barcode == this.jsonBarcode.Barcode)
          {
            this.editHeaderBarcode('');
          }
        }
      }

      var Itemcode = this.json.Itemcode
      var Barcode = this.jsonBarcode.Barcode
      var primary_barcode = this.jsonBarcode.primary_barcode
      var barcode_type = this.jsonBarcode.barcode_type
      var barRemark = this.jsonBarcode.barRemark
      var barDesc = this.jsonBarcode.barDesc

      //create barcode
      var NewBarcode = this.jsonBarcode.NewBarcode
      var Barcode_old = this.jsonBarcode.Barcode
      var Barcode_new = this.jsonBarcode.NewBarcode

      var payload = {
          pass_json: {
            Itemcode: Itemcode,
            Barcode: Barcode,
            language: this.language,
            barRemark: barRemark,
            user: this.user_name,
            primary_barcode: primary_barcode,
            barDesc: barDesc,
          }
      }

      var payload_update = {
          pass_json: {
            ChangedBy: this.session_user_guid,
            Itemcode: Itemcode,
            Barcode_new: Barcode_new,
            language: this.language,
            Barcode_old: Barcode_old,
            barRemark: barRemark,
            user: this.user_name,
            primary_barcode: primary_barcode,
            barDesc: barDesc,
          }
      }

      var object_pass = {};

      if(!this.edit_barcode)
      {
        // payload.pass_json.user = this.session_user_guid;

        object_pass = {
            "dispatch": 'itemmaster/trigger_create_barcode',  // endpoint hardcoded
            "getter": 'itemmaster/get_barcode_status',             // getter hardcoded
            "app": this,
            "payload": payload,
        };
        var dispatch_response = await this.$dispatch(object_pass);
        if (dispatch_response.status) {
            // success condition


            var set_query = {
              "Itemcode":Itemcode,
              "Barcode":Barcode,
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
              if(dispatch_response2.status){
                console.log('Runscript :',dispatch_response2.message);
                this.barcode.loading = false;
              }else{
                var error_response = dispatch_response2.message || dispatch_response2.response;
                this.showNotify('negative', error_response);
                this.barcode.loading = false;
                console.log('Runscript Failed',dispatch_response2);
              }
            var success_message = 'Barcode Created Successfully.';
            this.showNotify("positive", success_message);
            this.barcode_table_function(this.ori_params);
            if(dispatch_response.response.primary_barcode == 1)
            {
              //edit header barcode
              this.editHeaderBarcode(dispatch_response.response.Barcode);
            }
            else
            {
              this.showAddLoading = false;
            }
            this.barcode.loading = false;
            this.edit_barcode = null;
            this.show_barcode_dialog = false;
            this.jsonBarcode = {};
        }

      }
      else if(this.edit_barcode)
      {
        // payload.pass_json.branch_guid = this.bjson.branch_guid;
        // payload.pass_json.user = this.session_user_guid;

        object_pass = {
          "dispatch": 'itemmaster/trigger_update_barcode',  // endpoint hardcoded
          "getter": 'itemmaster/get_barcode_status',             // getter hardcoded
          "app": this,
          "payload": payload_update,
        };


      var dispatch_response = await this.$dispatch(object_pass);

        if (dispatch_response.status) {
            // success condition

            var set_query = {
                "Itemcode":Itemcode,
                "Barcode":NewBarcode,
                "barRemark": barRemark,
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
              if(dispatch_response2.status){
                var success_message = 'Barcode Edited Successfully.';
                this.showNotify("positive", success_message);
                this.barcode_table_function(this.ori_params);
                this.barcode.loading = false;
                this.edit_barcode = null;
                this.show_barcode_dialog = false;
                this.jsonBarcode = {};
              }
              else{
                  var error_response = dispatch_response2.message || dispatch_response2.response;
                  this.showNotify('negative', error_response);
                  this.barcode_table_function(this.ori_params);
                  this.showAddLoading = false;
                  this.barcode.loading = false;
                  console.log('Runscript Failed',dispatch_response2);
                  this.edit_barcode = null;
                  this.show_barcode_dialog = false;
                  this.jsonBarcode = {};
              }

              if(dispatch_response.response.primary_barcode == 1)
              {
                //edit header barcode
                this.editHeaderBarcode(dispatch_response.response.Barcode);
              }
              else
              {
                this.showAddLoading = false;
              }
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
          this.barcode.loading = false;
        }
      }
      else {
        this.showNotify('negative', show_error);
        this.showAddLoading = false;
        this.branch.loading = false;
      }
    },
    handleTableChange2: function(newVal)
    {

          var new_params = this.$pluginsTableParams(newVal)

          var payload = {
              params : new_params
          };

          this.miscellaneous_ori_params = payload;
          if(this.tab != 'Information' || this.active_section != 'Miscellaneous')
          {
            return;
          }
          this.table_function2(payload);
    },
    async table_function2(ori_payload){
        var payload = ori_payload.params

        var table_column2 = [
            {
                name: 'action',
                required: true,
                label: this.$language('D0028'),
                header_align: 'center',
                align: 'center',
                sortable: false,
                field: 'action',
                format_child: '',
                tooltip: '',
                headerStyle:'text-align: center; width: 1%;',
                filter_type: 'input',
                filter_options: [],
                filter_value: '',
            },
            {
                name: 'set_active',
                required: true,
                label: 'Active',
                align: 'left',
                sortable: true,
                field: 'set_active',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'seq',
                required: true,
                label: 'Seq',
                align: 'left',
                sortable: true,
                field: 'seq',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'misc_group',
                required: true,
                label: 'Group',
                align: 'left',
                sortable: true,
                field: 'misc_group',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'text1',
                required: true,
                label: 'Text 1',
                align: 'left',
                sortable: true,
                field: 'text1',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'value1',
                required: true,
                label: 'Value 1',
                align: 'center',
                sortable: true,
                field: 'value1',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;',
            },
            {
                name: 'text2',
                required: true,
                label: 'Text 2',
                align: 'left',
                sortable: true,
                field: 'text2',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'value2',
                required: true,
                label: 'Value 2',
                align: 'left',
                sortable: true,
                field: 'value2',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },

            {
                name: 'remark',
                required: true,
                label: 'Remarks',
                align: 'left',
                sortable: true,
                field: 'remark',
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
                name: 'updated_by',
                required: true,
                label: 'Updated By',
                align: 'left',
                sortable: true,
                field: 'updated_by',
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
                name: 'created_by',
                required: true,
                label: 'Created By',
                align: 'left',
                sortable: true,
                field: 'created_by',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            

        ];

        if(this.page_function == 'create' || this.page_function == 'view')
          {
            // alert('barcode')
              table_column2 = table_column2.filter((entry)=>{
                  return entry.name != 'action'
              })
          }

        this.table_column2 = table_column2;

        if(this.page_function == 'create'){
              this.table_data2 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
            return;
          }



        var payload = {
          "pass_json": {
            "itemcode" : this.Itemcode,
            "sort_by": "created_at",
            "sort_type": "Asc",
            "outlet_guid": this.session_outlet_guid,
            "language": this.language
          }//pass_json should be the field or data wish to be created.
        };


        this.ori_payload = JSON.parse(JSON.stringify(payload))
        var object_pass = {
            "dispatch": 'itemmaster/trigger_post_get_itemmaster_miscellaneous', //refer to path/function_name in store actions.js
            "getter": 'itemmaster/get_itemmaster_miscellaneous', //refer to path/function_name in store getters.js
            "app": this, //compulsory passed variable
            "payload": payload //payload that needed to use in store actions.js
          };


        var dispatch_response_miscell = await this.$dispatch(object_pass);

        var status = dispatch_response_miscell.status

        if(status == "failed"){
          this.table_data1 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
        }else{
          var results = dispatch_response_miscell.response.detail;


          // else if(this.page_function == 'EditItemmaster'){
              this.table_data2 = {
              "data": {
                "count": dispatch_response_miscell.response.total_row,
                "next": null,
                "previous": null,
                "results": dispatch_response_miscell.response.detail
              }
            };
          // }


          this.results = dispatch_response_miscell.response.detail;


        }


    },
    handleTableChange3: function(newVal)
    {
          var new_params = this.$pluginsTableParams(newVal)

          var payload = {
              params : new_params
          };

          this.status_ori_params = payload;
          this.table_function3(payload);
    },
    async table_function3(ori_payload){
        var payload = ori_payload.params


        var table_column3 = [
            {
              name: 'action',
              required: true,
              label: this.$language('D0028'),
              header_align: 'center',
              align: 'center',
              sortable: false,
              field: 'action',
              format_child: '',
              tooltip: '',
              headerStyle:'text-align: center; width: 1%;',
              filter_type: 'input',
              filter_options: [],
              filter_value: '',
          },
            {
                name: 'branch',
                required: true,
                label: 'Banner/Site',
                align: 'left',
                sortable: true,
                field: 'branch',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'imlb_status',
                required: true,
                label: 'Status',
                align: 'left',
                sortable: true,
                field: 'imlb_status',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color:red'

            },
            {
                name: 'updated_at',
                required: true,
                label: 'Updated At',
                align: 'left',
                sortable: true,
                field: 'updated_at',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            {
                name: 'updated_by',
                required: true,
                label: 'Updated By',
                align: 'left',
                sortable: true,
                field: 'updated_by',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            {
                name: 'created_at',
                required: true,
                label: 'Created At',
                align: 'left',
                sortable: true,
                field: 'created_at',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;',
            },
            {
                name: 'created_by',
                required: true,
                label: 'Created By',
                align: 'left',
                sortable: true,
                field: 'created_by',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            

        ];

        if(this.page_function == 'create' || this.page_function == 'view')
          {
            // alert('barcode')
              table_column3 = table_column3.filter((entry)=>{
                  return entry.name != 'action'
              })
          }

        this.table_column3 = table_column3;

        if(this.page_function == 'create'){
              this.table_data3 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
            return
          }

        var payload = {
        "pass_json": {
          "itemcode": this.Itemcode,
          "outlet_guid": this.session_outlet_guid,
          "language": this.language,
          "skip": 0,
          "limit": payload.limit,
        },
      };

        var object_pass = {
          "dispatch": 'itemmaster/trigger_post_get_itemmaster_listed_branch',
          "getter": 'itemmaster/get_itemmaster_listed_branch',
          "app": this,
          "payload": payload,
        };


        var dispatch_response_listed_branch = await this.$dispatch(object_pass);

        var status = dispatch_response_listed_branch.status

        if(status == "failed"){
          this.table_data3 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
        }else{
          var results = dispatch_response_listed_branch.response.detail;

          // else if(this.page_function == 'EditItemmaster'){
              this.table_data3 = {
              "data": {
                "count": dispatch_response_listed_branch.response.total_row,
                "next": null,
                "previous": null,
                "results": dispatch_response_listed_branch.response.detail
              }
            };
          // }
          this.results = dispatch_response_listed_branch.response.detail;

        }

    },
    async handleAddListedBranch()
    {
    if(this.json.BillStatus == 1)
    {
        this.showNotify("negative","This Doc already posted.");
        return;
    }

    var validate = await this.validate_form("save_edit_pochild_form");

    if(!validate)
    {
        this.showNotify("negative","Please make sure all field is correct.");
        this.showAddLoading = false;
        return;
    }

    this.showAddLoading = true;
    this.branch.loading = true;

    var branch = this.bjson.branch;

    var ItemType = this.bjson.ItemType;
    var payload = {
        pass_json: {
          updated_by: this.session_user_guid,
          itemcode: this.Itemcode,
          branch: branch,
          language: this.language,
          // ItemType: ItemType,
        }
    }

      var object_pass = {};

      if(!this.edit_listed_branch)
      {
        payload.pass_json.created_by = this.session_user_guid;

        object_pass = {
            "dispatch": 'itemmaster/trigger_post_create_itemmaster_listed_branch',  // endpoint hardcoded
            "getter": 'itemmaster/get_itemmaster_listed_branch',             // getter hardcoded
            "app": this,
            "payload": payload,
        };
      }
      else if(this.edit_listed_branch)
      {
        payload.pass_json.branch_guid = this.bjson.branch_guid;

        object_pass = {
          "dispatch": 'itemmaster/trigger_post_update_itemmaster_listed_branch',  // endpoint hardcoded
          "getter": 'itemmaster/get_itemmaster_listed_branch',             // getter hardcoded
          "app": this,
          "payload": payload,
        };
      }

      var dispatch_response = await this.$dispatch(object_pass);

      if (dispatch_response.status) {
          // success condition
          this.forceLoading = true;
          var success_message = !this.edit_listed_branch == 'create' ? 'Listed Branch Created Successfully.' : 'Listed Branch Edited Successfully.';
          this.showNotify("positive", success_message);
          
          this.showAddLoading = false;
          this.branch.loading = false;
          this.edit_listed_branch = null;
          this.show_listed_branch_dialog = false;
          this.bjson = {
            branch: '',
            ItemType: '',
          };

          await this.table_function3(this.status_ori_params);
          this.forceLoading = false;
          
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
        this.branch.loading = false;
      }
    },
    async handleReceiveHandleEditListedBranch(row)
    {
    this.show_listed_branch_dialog = true;
    this.edit_listed_branch = true;
    this.branch.loading = true;
    this.edit_child = true;

    var result = JSON.parse(JSON.stringify(row.row));
    this.branch.loading = false;
    this.bjson = result;
    },
    addButtonListedBranch(){
    this.show_listed_branch_dialog = true;
    this.edit_listed_branch = false;
    },
    addButtonRestriction(){
    this.show_restriction_dialog = true;
    this.edit_restriction = false;
    },
    addButtonReplenishment(){
    this.show_replenishment_dialog = true;
    this.edit_replenishment = false;
    },
    
    async handleReceiveHandleEditReplenishment(row)
    {
    this.show_replenishment_dialog = true;
    this.edit_replenishment = true;
    this.replenishment.loading = true;
    this.edit_child = true;

    var result = JSON.parse(JSON.stringify(row.row));
    this.replenishment.loading = false;
    this.repjson = result;
    },
    async handleReceiveHandleEditRestriction(row)
    {
    this.show_restriction_dialog = true;
    this.edit_restriction = true;
    this.restriction.loading = true;
    this.edit_child = true;

    var result = JSON.parse(JSON.stringify(row.row));
    this.restriction.loading = false;
    this.resjson = result;
    },
    async handleAddRestriction()
    {
    if(this.json.BillStatus == 1)
    {
        this.showNotify("negative","This Doc already posted.");
        return;
    }

    var validate = await this.validate_form("save_edit_pochild_form");

    if(!validate)
    {
        this.showNotify("negative","Please make sure all field is correct.");
        this.showAddLoading = false;
        return;
    }

    this.showAddLoading = true;
    this.restriction.loading = true;

    var branch = this.resjson.branch;

    var sales_order = this.resjson.sales_order;
    var purchase_order = this.resjson.purchase_order;
    var ibt = this.resjson.ibt;
    var cn = this.resjson.cn;
    var dn = this.resjson.dn;
    var cpo = this.resjson.cpo;
    var payload = {
        pass_json: {
          updated_by: this.session_user_guid,
          itemcode: this.Itemcode,
          branch: branch,
          sales_order: sales_order,
          ibt: ibt,
          cn: cn,
          dn: dn,
          purchase_order: purchase_order,
          cpo: cpo,
          language: this.language,
        }
    }

      var object_pass = {};

      if(!this.edit_restriction)
      {
        payload.pass_json.created_by = this.session_user_guid;

        object_pass = {
            "dispatch": 'itemmaster/trigger_post_create_itemmaster_block_by_branch',  // endpoint hardcoded
            "getter": 'itemmaster/get_itemmaster_block_by_branch',             // getter hardcoded
            "app": this,
            "payload": payload,
        };
      }
      else if(this.edit_restriction)
      {
        // payload.pass_json.branch_guid = this.resjson.branch_guid;

        object_pass = {
          "dispatch": 'itemmaster/trigger_post_update_itemmaster_block_by_branch',  // endpoint hardcoded
          "getter": 'itemmaster/get_itemmaster_block_by_branch',             // getter hardcoded
          "app": this,
          "payload": payload,
        };
      }

      var dispatch_response = await this.$dispatch(object_pass);

      if (dispatch_response.status) {
          // success condition
          var success_message = !this.edit_listed_branch == 'create' ? 'Restriction Created Successfully.' : 'Restriction Edited Successfully.';
          this.showNotify("positive", success_message);
          this.table_function7(this.restriction_ori_params);
          this.showAddLoading = false;
          this.restriction.loading = false;
          this.edit_restriction = null;
          this.show_restriction_dialog = false;
          this.resjson = {};
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
        this.restriction.loading = false;
      }
    },
    async handleAddReplenishment()
    {
    if(this.json.BillStatus == 1)
    {
        this.showNotify("negative","This Doc already posted.");
        return;
    }

    var validate = await this.validate_form("save_edit_pochild_form");

    if(!validate)
    {
        this.showNotify("negative","Please make sure all field is correct.");
        this.showAddLoading = false;
        return;
    }

    this.showAddLoading = true;
    this.replenishment.loading = true;

    var concept = this.repjson.concept;

    var min_qty = this.repjson.min_qty;
    var max_qty = this.repjson.max_qty;
    var display_qty = this.repjson.display_qty;
    
    var payload = {
        pass_json: {
          updated_by: this.session_user_guid,
          itemcode: this.Itemcode,
          concept: concept,
          min_qty: min_qty,
          max_qty: max_qty,
          display_qty: display_qty,
          language: this.language,
        }
    }

      var object_pass = {};

      if(!this.edit_replenishment)
      {
        payload.pass_json.created_by = this.session_user_guid;

        object_pass = {
            "dispatch": 'itemmaster/trigger_post_create_itemmaster_replenishment',  // endpoint hardcoded
            "getter": 'itemmaster/get_itemmaster_replenishment',             // getter hardcoded
            "app": this,
            "payload": payload,
        };
      }
      else if(this.edit_replenishment)
      {
        payload.pass_json.im_rep_guid = this.repjson.im_rep_guid;
        payload.pass_json.updated_by = this.session_user_guid;

        object_pass = {
          "dispatch": 'itemmaster/trigger_post_update_itemmaster_replenishment',  // endpoint hardcoded
          "getter": 'itemmaster/get_itemmaster_replenishment',             // getter hardcoded
          "app": this,
          "payload": payload,
        };
      }

      var dispatch_response = await this.$dispatch(object_pass);

      if (dispatch_response.status) {
          // success condition
          var success_message = !this.edit_replenishment == 'create' ? 'Replenishment Created Successfully.' : 'Replenishment Edited Successfully.';
          this.showNotify("positive", success_message);
          this.table_function6(this.bannersite_ori_params);
          this.showAddLoading = false;
          this.replenishment.loading = false;
          this.edit_replenishment = null;
          this.show_replenishment_dialog = false;
          this.repjson = {
            concept: '',
            min_qty: '',
            max_qty:'',
            display_qty: '',
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
        this.replenishment.loading = false;
      }
    },

    handleTableChange4: function(newVal)
    {
          var new_params = this.$pluginsTableParams(newVal)

          var payload = {
              params : new_params
          };

          this.itemtype_ori_params = payload;
          this.table_function4(payload);
    },
    async table_function4(ori_payload){
        var payload = ori_payload.params



        var table_column4 = [
            {
                name: 'concept',
                required: true,
                label: 'Banner/Site',
                align: 'left',
                sortable: true,
                field: 'concept',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'itemtype',
                required: true,
                label: 'Item Type',
                align: 'left',
                sortable: true,
                field: 'itemtype',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },

            {
                name: 'date_from',
                required: true,
                label: 'Date From',
                align: 'left',
                sortable: true,
                field: 'date_from',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'date_to',
                required: true,
                label: 'Date To',
                align: 'left',
                sortable: true,
                field: 'date_to',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },

            {
                name: 'cancel',
                required: true,
                label: 'Cancelled',
                align: 'center',
                sortable: true,
                field: 'cancel',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            {
                name: 'cancel_at',
                required: true,
                label: 'Cancelled At',
                align: 'left',
                sortable: true,
                field: 'cancel_at',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            {
                name: 'last_refno',
                required: true,
                label: 'Last Ref No',
                align: 'left',
                sortable: true,
                field: 'last_refno',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            {
                name: 'future_eff_date',
                required: true,
                label: 'Future Effective Date',
                align: 'left',
                sortable: true,
                field: 'future_eff_date',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            {
                name: 'updated_at',
                required: true,
                label: 'Updated At',
                align: 'left',
                sortable: true,
                field: 'updated_at',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            {
                name: 'updated_by',
                required: true,
                label: 'Updated By',
                align: 'left',
                sortable: true,
                field: 'updated_by',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },

            {
                name: 'created_at',
                required: true,
                label: 'Created At',
                align: 'left',
                sortable: true,
                field: 'created_at',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            {
                name: 'created_by',
                required: true,
                label: 'Created By',
                align: 'left',
                sortable: true,
                field: 'created_by',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            
            

        ];


        if(this.page_function == 'create' || this.page_function == 'view')
          {
            // alert('barcode')
              table_column4 = table_column4.filter((entry)=>{
                  return entry.name != 'action'
              })
          }
        this.table_column4 = table_column4;
        if(this.page_function == 'create'){
              this.table_data4 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
            return;
          }

        var payload = {
          "pass_json": {
            "itemcode": this.Itemcode,
            "outlet_guid": this.session_outlet_guid,
            "language": this.language,
            "skip": 0,
            "limit": payload.limit,
            "sort_by": "created_at",
            "sort_type": "Asc",
            // payload.branch = payload.branch,
          },
        };

        var object_pass = {
          "dispatch": 'itemmaster/trigger_post_get_itemmaster_itemtype',
          "getter": 'itemmaster/get_itemmaster_itemtype',
          "app": this,
          "payload": payload,
        };


        var dispatch_response_item_type = await this.$dispatch(object_pass);

        var status = dispatch_response_item_type.status

        if(status == "failed"){
          this.table_data4 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
        }else{
          var results = dispatch_response_item_type.response.detail;

          // else if(this.page_function == 'EditItemmaster'){
              this.table_data4 = {
              "data": {
                "count": dispatch_response_item_type.response.total_row,
                "next": null,
                "previous": null,
                "results": dispatch_response_item_type.response.detail
              }
            };
          // }


          this.results = dispatch_response_item_type.response.detail;


        }


    },
    handleTableChange5: function(newVal)
    {
          var new_params = this.$pluginsTableParams(newVal)

          var payload = {
              params : new_params
          };

          this.pricetype_ori_params = payload;
          this.table_function5(payload);
    },
    async table_function5(ori_payload){
        var payload = ori_payload.params


        var table_column5 = [
            {
                name: 'concept',
                required: true,
                label: 'Banner/Site',
                align: 'left',
                sortable: true,
                field: 'concept',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'pricetype',
                required: true,
                label: 'Price Type',
                align: 'left',
                sortable: true,
                field: 'pricetype',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },

            {
                name: 'date_from',
                required: true,
                label: 'Date From',
                align: 'left',
                sortable: true,
                field: 'date_from',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'date_to',
                required: true,
                label: 'Date To',
                align: 'left',
                sortable: true,
                field: 'date_to',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },

            {
                name: 'cancel',
                required: true,
                label: 'Cancelled',
                align: 'center',
                sortable: true,
                field: 'cancel',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            {
                name: 'cancel_at',
                required: true,
                label: 'Cancelled At',
                align: 'left',
                sortable: true,
                field: 'cancel_at',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            {
                name: 'last_refno',
                required: true,
                label: 'Last Ref No',
                align: 'left',
                sortable: true,
                field: 'last_refno',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            {
                name: 'future_eff_date',
                required: true,
                label: 'Future Effective Date',
                align: 'left',
                sortable: true,
                field: 'future_eff_date',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            {
                name: 'updated_at',
                required: true,
                label: 'Updated At',
                align: 'left',
                sortable: true,
                field: 'updated_at',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            {
                name: 'updated_by',
                required: true,
                label: 'Updated By',
                align: 'left',
                sortable: true,
                field: 'updated_by',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            {
                name: 'created_at',
                required: true,
                label: 'Created At',
                align: 'left',
                sortable: true,
                field: 'created_at',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            {
                name: 'created_by',
                required: true,
                label: 'Created By',
                align: 'left',
                sortable: true,
                field: 'created_by',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
        
        ];

        if(this.page_function == 'create' || this.page_function == 'view')
          {
            // alert('barcode')
              table_column5 = table_column5.filter((entry)=>{
                  return entry.name != 'action'
              })
          }
        this.table_column5 = table_column5;

        if(this.page_function == 'create'){
              this.table_data5 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
            return;
          }


        var payload = {
          "pass_json": {
            "itemcode": this.Itemcode,
            "outlet_guid": this.session_outlet_guid,
            "language": this.language,
            "skip": 0,
            "limit": payload.limit,
            "sort_by": "created_at",
            "sort_type": "Asc",
          },
        };

        var object_pass = {
          "dispatch": 'itemmaster/trigger_post_get_itemmaster_pricetype',
          "getter": 'itemmaster/get_itemmaster_pricetype',
          "app": this,
          "payload": payload,
        };


        var dispatch_response_pricetype = await this.$dispatch(object_pass);

        var status = dispatch_response_pricetype.status

        if(status == "failed"){
          this.table_data5 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
        }else{
          var results = dispatch_response_pricetype.response;



          // else if(this.page_function == 'EditItemmaster'){
              this.table_data5 = {
              "data": {
                "count": dispatch_response_pricetype.response.total_row,
                "next": null,
                "previous": null,
                "results": dispatch_response_pricetype.response.detail
                // "results": dispatch_response_pricetype.response
              }
            };
          // }


          // this.results = dispatch_response_pricetype.response.detail;
          this.results = dispatch_response_pricetype.response;


        }


    },
    handleTableChange6: function(newVal)
    {
          var new_params = this.$pluginsTableParams(newVal)

          var payload = {
              params : new_params
          };

          this.bannersite_ori_params = payload;
          this.table_function6(payload);
    },
    async table_function6(ori_payload){
        var payload = ori_payload.params


        var table_column6 = [
          {
                name: 'action',
                required: true,
                label: this.$language('D0028'),
                header_align: 'center',
                align: 'center',
                sortable: false,
                field: 'action',
                format_child: '',
                tooltip: '',
                headerStyle:'text-align: center; width: 1%;',
                filter_type: 'input',
                filter_options: [],
                filter_value: '',
            },
            {
                name: 'concept',
                required: true,
                label: 'Banner/Site',
                align: 'left',
                sortable: true,
                field: 'concept',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'min_qty',
                required: true,
                label: 'Min Qty',
                align: 'right',
                sortable: true,
                field: 'min_qty',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'max_qty',
                required: true,
                label: 'Max Qty',
                align: 'right',
                sortable: true,
                field: 'max_qty',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'display_qty',
                required: true,
                label: 'Display Qty',
                align: 'right',
                sortable: true,
                field: 'display_qty',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'last_refno',
                required: true,
                label: 'Last Ref No',
                align: 'left',
                sortable: true,
                field: 'last_refno',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'updated_at',
                required: true,
                label: 'Updated At',
                align: 'left',
                sortable: true,
                field: 'updated_at',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            {
                name: 'updated_by',
                required: true,
                label: 'Updated By',
                align: 'left',
                sortable: true,
                field: 'updated_by',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },

            {
                name: 'created_at',
                required: true,
                label: 'Created At',
                align: 'left',
                sortable: true,
                field: 'created_at',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            {
                name: 'created_by',
                required: true,
                label: 'Created By',
                align: 'left',
                sortable: true,
                field: 'created_by',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            
            
        ];

        if(this.page_function == 'create' || this.page_function == 'view')
          {
            // alert('barcode')
              table_column6 = table_column6.filter((entry)=>{
                  return entry.name != 'action'
              })
          }
        this.table_column6 = table_column6;

        if(this.page_function == 'create'){
              this.table_data6 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
            return;
          }


        var payload = {
          "pass_json": {
            "itemcode": this.Itemcode,
            "outlet_guid": this.session_outlet_guid,
            "language": this.language,
            "skip": 0,
            "limit": payload.limit,
            "sort_by": "created_at",
            "sort_type": "Asc",
          },
        };

        var object_pass = {
          "dispatch": 'itemmaster/trigger_post_get_itemmaster_replenishment',
          "getter": 'itemmaster/get_itemmaster_replenishment',
          "app": this,
          "payload": payload,
        };


        var dispatch_response_itemmaster_replenishment = await this.$dispatch(object_pass);

        var status = dispatch_response_itemmaster_replenishment.status

        if(status == "failed"){
          this.table_data6 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
        }else{
          var results = dispatch_response_itemmaster_replenishment.response.detail;



          // else if(this.page_function == 'EditItemmaster'){
              this.table_data6 = {
              "data": {
                "count": dispatch_response_itemmaster_replenishment.response.total_row,
                "next": null,
                "previous": null,
                "results": dispatch_response_itemmaster_replenishment.response.detail
                // "results": dispatch_response_pricetype.response
              }
            };
          // }


          // this.results = dispatch_response_pricetype.response.detail;
          this.results = dispatch_response_itemmaster_replenishment.response;


        }


    },
    handleTableChange7: function(newVal)
    {
          var new_params = this.$pluginsTableParams(newVal)

          var payload = {
              params : new_params
          };

          this.restriction_ori_params = payload;
          this.table_function7(payload);
    },
    async table_function7(ori_payload){
        var payload = ori_payload.params


        var table_column7 = [
            {
                name: 'action',
                required: true,
                label: this.$language('D0028'),
                header_align: 'center',
                align: 'center',
                sortable: false,
                field: 'action',
                format_child: '',
                tooltip: '',
                headerStyle:'text-align: center; width: 1%;',
                filter_type: 'input',
                filter_options: [],
                filter_value: '',
            },
            {
                name: 'branch',
                required: true,
                label: 'Banner/Site',
                align: 'left',
                sortable: true,
                field: 'branch',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

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
                headerStyle: 'text-align: center;'

            },
            {
                name: 'purchase_order',
                required: true,
                label: 'Purchase Order',
                align: 'left',
                sortable: true,
                field: 'purchase_order',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'cpo',
                required: true,
                label: 'Central PO',
                align: 'left',
                sortable: true,
                field: 'cpo',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'ibt',
                required: true,
                label: 'IBT',
                align: 'left',
                sortable: true,
                field: 'ibt',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color:red'

            },
            {
                name: 'dn',
                required: true,
                label: 'DN',
                align: 'center',
                sortable: true,
                field: 'dn',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'cn',
                required: true,
                label: 'CN',
                align: 'left',
                sortable: true,
                field: 'cn',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'updated_at',
                required: true,
                label: 'Updated At',
                align: 'left',
                sortable: true,
                field: 'updated_at',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            {
                name: 'updated_by',
                required: true,
                label: 'Updated By',
                align: 'left',
                sortable: true,
                field: 'updated_by',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            
            {
                name: 'created_at',
                required: true,
                label: 'Created At',
                align: 'left',
                sortable: true,
                field: 'created_at',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            {
                name: 'created_by',
                required: true,
                label: 'Created By',
                align: 'left',
                sortable: true,
                field: 'created_by',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            
        ];

        if(this.page_function == 'create' || this.page_function == 'view')
          {
            // alert('barcode')
              table_column7 = table_column7.filter((entry)=>{
                  return entry.name != 'action'
              })
          }
        this.table_column7 = table_column7;

        if(this.page_function == 'create'){
              this.table_data7 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
            return;
          }

        var payload = {
          "pass_json": {
            "itemcode": this.Itemcode,
            "outlet_guid": this.session_outlet_guid,
            "language": this.language,
            "skip": 0,
            "limit": payload.limit,
            "sort_by": "created_at",
            "sort_type": "Asc",
          },
        };

        var object_pass = {
          "dispatch": 'itemmaster/trigger_post_get_itemmaster_block_by_branch',
          "getter": 'itemmaster/get_itemmaster_block_by_branch',
          "app": this,
          "payload": payload,
        };


        var dispatch_response_itemmaster_block_by_branch = await this.$dispatch(object_pass);

        var status = dispatch_response_itemmaster_block_by_branch.status

        if(status == "failed"){
          this.table_data7 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
        }else{
          var results = dispatch_response_itemmaster_block_by_branch.response.detail;



          // else if(this.page_function == 'EditItemmaster'){
              this.table_data7 = {
              "data": {
                "count": dispatch_response_itemmaster_block_by_branch.response.total_row,
                "next": null,
                "previous": null,
                "results": dispatch_response_itemmaster_block_by_branch.response.detail
                // "results": dispatch_response_pricetype.response
              }
            };
          // }


          // this.results = dispatch_response_pricetype.response.detail;
          this.results = dispatch_response_itemmaster_block_by_branch.response;


        }


    },
    handleTableChange8: function(newVal)
    {
          var new_params = this.$pluginsTableParams(newVal)

          var payload = {
              params : new_params
          };

          this.pricechange_ori_params = payload;
          this.table_function8(payload);
    },
    async table_function8(ori_payload){
        var payload = ori_payload.params



        var table_column8 = [
            // {
            //     name: 'action',
            //     required: true,
            //     label: this.$language('D0028'),
            //     header_align: 'center',
            //     align: 'center',
            //     sortable: false,
            //     field: 'action',
            //     format_child: '',
            //     tooltip: '',
            //     headerStyle:'text-align: center; width: 1%;',
            //     filter_type: 'input',
            //     filter_options: [],
            //     filter_value: '',
            // },
            {
                name: 'LocGroup',
                required: true,
                label: 'Branch',
                align: 'left',
                sortable: true,
                field: 'LocGroup',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'EffectiveDate',
                required: true,
                label: 'Effective Date',
                align: 'left',
                sortable: true,
                field: 'EffectiveDate',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'Post_Req',
                required: true,
                label: 'Post',
                align: 'center',
                sortable: true,
                field: 'Post_Req',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'posted_at',
                required: true,
                label: 'Post At',
                align: 'left',
                sortable: true,
                field: 'posted_at',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'posted_by',
                required: true,
                label: 'Posted By',
                align: 'left',
                sortable: true,
                field: 'posted_by',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'Approved',
                required: true,
                label: 'Approved',
                align: 'left',
                sortable: true,
                field: 'Approved',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'Rejected',
                required: true,
                label: 'Rejected',
                align: 'left',
                sortable: true,
                field: 'Rejected',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;',


            },
            {
                name: 'Approved_Sell',
                required: true,
                label: 'App.Price',
                align: 'left',
                sortable: true,
                field: 'Approved_Sell',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'approved_vendor',
                required: true,
                label: 'App.Vendor',
                align: 'left',
                sortable: true,
                field: 'approved_vendor',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },

            {
                name: 'Send_Approved',
                required: true,
                label: 'Send Approved',
                align: 'center',
                sortable: true,
                field: 'Send_Approved',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            {
                name: 'Current_Sell',
                required: true,
                label: 'Curr.Price',
                align: 'right',
                sortable: true,
                field: 'Current_Sell',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            {
                name: 'current_vendor',
                required: true,
                label: 'Curr.Vendor',
                align: 'left',
                sortable: true,
                field: 'current_vendor',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            {
                name: 'Suggest_Sell',
                required: true,
                label: 'Sugg.Price',
                align: 'right',
                sortable: true,
                field: 'Suggest_Sell',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            {
                name: 'suggest_vendor',
                required: true,
                label: 'Sugg.Vendor',
                align: 'left',
                sortable: true,
                field: 'suggest_vendor',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            {
                name: 'RefNo',
                required: true,
                label: 'Refno',
                align: 'left',
                sortable: true,
                field: 'RefNo',
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
            
        ];
        if(this.page_function == 'create' || this.page_function == 'view')
          {
            // alert('barcode')
              table_column8 = table_column8.filter((entry)=>{
                  return entry.name != 'action'
              })
          }
        this.table_column8 = table_column8;

        if(this.page_function == 'create'){
              this.table_data8 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
            return;
          }


        var payload = {
          "pass_json": {
            "Itemcode": this.Itemcode,
            "outlet_guid": this.session_outlet_guid,
            "language": this.language,
            "skip": 0,
            "limit": payload.limit,
            "sort_by": "posted_at",
            "sort_type": "Asc",
          },
        };

        var object_pass = {
          "dispatch": 'itemmaster/trigger_post_get_price_change_req1loc',
          "getter": 'itemmaster/get_price_change_req1loc',
          "app": this,
          "payload": payload,
        };


        var dispatch_response_itemmaster_price_change_req1loc = await this.$dispatch(object_pass);

        var status = dispatch_response_itemmaster_price_change_req1loc.status

        if(status == "failed"){
          this.table_data8 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
        }else{
          var results = dispatch_response_itemmaster_price_change_req1loc.response.detail;


          // var extractedResults = results.map(result => {
          //   return {
          //     "Send_Approved": result.price_change_req.Send_Approved,
          //     "RefNo": result.price_change_req.RefNo,
          //     "Updated_at": result.price_change_req.Updated_at,
          //     "Updated_by": result.price_change_req.Updated_by,
          //     "Created_at": result.price_change_req.Created_at,
          //     "Created_by": result.price_change_req.Created_by,
          //     "EffectiveDate": result.price_change_req.EffectiveDate,
          //     "Post_Req": result.price_change_req.Post_Req,
          //     "LocGroup": result.LocGroup,
          //     "posted_at": result.posted_at,
          //     "posted_by": result.posted_by,
          //   };
          // });


          // else if(this.page_function == 'EditItemmaster'){
              this.table_data8 = {
              "data": {
                "count": dispatch_response_itemmaster_price_change_req1loc.response.total_row,
                "next": null,
                "previous": null,
                "results":results
                // "results": dispatch_response_pricetype.response
              }
            };
          // }


          // this.results = dispatch_response_pricetype.response.detail;
          this.results = dispatch_response_itemmaster_price_change_req1loc.response;


        }


    },
    handleTableChange9: function(newVal)
    {
          var new_params = this.$pluginsTableParams(newVal)

          var payload = {
              params : new_params
          };

          this.costchange_ori_params = payload;
          this.table_function9(payload);
    },
    async table_function9(ori_payload){
        var payload = ori_payload.params


         var table_column9 = [
            {
                name: 'Issued',
                required: true,
                label: 'Issued',
                align: 'left',
                sortable: true,
                field: 'Issued',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'posted',
                required: true,
                label: 'Posted',
                align: 'center',
                sortable: true,
                field: 'posted',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'packsize',
                required: true,
                label: 'Pack Size',
                align: 'left',
                sortable: true,
                field: 'packsize',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'date_effective',
                required: true,
                label: 'Effective Date',
                align: 'left',
                sortable: true,
                field: 'date_effective',
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
                name: 'NetUnitPrice_c',
                required: true,
                label: 'Net Cost (New)',
                align: 'right',
                sortable: true,
                field: 'NetUnitPrice_c',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'CartonPrice_c',
                required: true,
                label: 'Carton Cost',
                align: 'right',
                sortable: true,
                field: 'CartonPrice_c',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'CartonPrice_new',
                required: true,
                label: 'Carton Cost (New)',
                align: 'right',
                sortable: true,
                field: 'CartonPrice_new',
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
                headerStyle: 'text-align: center;'

            },
            {
                name: 'block_order_new',
                required: true,
                label: 'Block (New)',
                align: 'left',
                sortable: true,
                field: 'block_order_new',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

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
                name: 'priority_vendor_new',
                required: true,
                label: 'Priority (New)',
                align: 'left',
                sortable: true,
                field: 'priority_vendor_new',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'refno',
                required: true,
                label: 'Ref No',
                align: 'left',
                sortable: true,
                field: 'refno',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'vendor_code',
                required: true,
                label: 'Code',
                align: 'left',
                sortable: true,
                field: 'vendor_code',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'vendor_name',
                required: true,
                label: 'Name',
                align: 'left',
                sortable: true,
                field: 'vendor_name',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },

            {
                name: 'proposed_effective_date',
                required: true,
                label: 'Date',
                align: 'left',
                sortable: true,
                field: 'proposed_effective_date',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'remark',
                required: true,
                label: 'Remarks',
                align: 'left',
                sortable: true,
                field: 'remark',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            
            {
                name: 'posted_at',
                required: true,
                label: 'Posted At',
                align: 'left',
                sortable: true,
                field: 'posted_at',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'posted_by',
                required: true,
                label: 'Posted By',
                align: 'left',
                sortable: true,
                field: 'posted_by',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'updated_at',
                required: true,
                label: 'Updated At',
                align: 'left',
                sortable: true,
                field: 'updated_at',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            {
                name: 'updated_by',
                required: true,
                label: 'Updated By',
                align: 'left',
                sortable: true,
                field: 'updated_by',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            {
                name: 'created_at',
                required: true,
                label: 'Created At',
                align: 'left',
                sortable: true,
                field: 'created_at',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },

            {
                name: 'created_by',
                required: true,
                label: 'Created By',
                align: 'left',
                sortable: true,
                field: 'created_by',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            


        ];


        if(this.page_function == 'create' || this.page_function == 'view')
          {
            // alert('barcode')
              table_column9 = table_column9.filter((entry)=>{
                  return entry.name != 'action'
              })
          }
        this.table_column9 = table_column9;
        if(this.page_function == 'create'){
              this.table_data9 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
            return;
          }
        var payload = {
          "pass_json": {
            "itemcode": this.Itemcode,
            "outlet_guid": this.session_outlet_guid,
            "language": this.language,
            "skip": 0,
            "limit": payload.limit,
            "sort_by": "created_at",
            "sort_type": "Asc",
          },
        };

        var object_pass = {
          "dispatch": 'itemmaster/trigger_post_get_cost_price_change_item',
          "getter": 'itemmaster/get_cost_price_change_item',
          "app": this,
          "payload": payload,
        };

        var dispatch_response_cost_price_change_item = await this.$dispatch(object_pass);

        var status = dispatch_response_cost_price_change_item.status

        if(status == "failed"){
          this.table_data9 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
        }else{
          var results = dispatch_response_cost_price_change_item.response.detail;



          // else if(this.page_function == 'EditItemmaster'){
              this.table_data9 = {
              "data": {
                "count": dispatch_response_cost_price_change_item.response.total_row,
                "next": null,
                "previous": null,
                "results": dispatch_response_cost_price_change_item.response.detail
                // "results": dispatch_response_pricetype.response
              }
            };
          // }


          // this.results = dispatch_response_pricetype.response.detail;
          this.results = dispatch_response_cost_price_change_item.response;


        }

    },
    handleTableChange10: function(newVal)
    {
          var new_params = this.$pluginsTableParams(newVal)

          var payload = {
              params : new_params
          };

          this.costchangeSupplier_ori_params = payload;
          this.table_function10(payload);
    },
    async table_function10(ori_payload){
        var payload = ori_payload.params


        var table_column10 = [
            {
                name: 'Issued',
                required: true,
                label: 'Issued',
                align: 'left',
                sortable: true,
                field: 'Issued',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'posted',
                required: true,
                label: 'Posted',
                align: 'center',
                sortable: true,
                field: 'posted',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'packsize',
                required: true,
                label: 'Pack Size',
                align: 'left',
                sortable: true,
                field: 'packsize',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'date_effective',
                required: true,
                label: 'Effective Date',
                align: 'left',
                sortable: true,
                field: 'date_effective',
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
                name: 'CartonPrice',
                required: true,
                label: 'Carton Cost',
                align: 'right',
                sortable: true,
                field: 'CartonPrice',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },

            {
                name: 'SupBulkQty',
                required: true,
                label: 'SupBulkQty',
                align: 'left',
                sortable: true,
                field: 'SupBulkQty',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'CartonPriceMultiplyUnit',
                required: true,
                label: 'Carton Multiply Unit',
                align: 'left',
                sortable: true,
                field: 'CartonPriceMultiplyUnit',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'ItemType',
                required: true,
                label: 'ItemType',
                align: 'left',
                sortable: true,
                field: 'ItemType',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },

            {
                name: 'refno',
                required: true,
                label: 'Ref No',
                align: 'left',
                sortable: true,
                field: 'refno',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'vendor_code',
                required: true,
                label: 'Code',
                align: 'left',
                sortable: true,
                field: 'vendor_code',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'vendor_name',
                required: true,
                label: 'Name',
                align: 'left',
                sortable: true,
                field: 'vendor_name',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },

            {
                name: 'proposed_effective_date',
                required: true,
                label: 'Date',
                align: 'left',
                sortable: true,
                field: 'proposed_effective_date',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'remark',
                required: true,
                label: 'Remarks',
                align: 'left',
                sortable: true,
                field: 'remark',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            
            {
                name: 'posted_at',
                required: true,
                label: 'Posted At',
                align: 'left',
                sortable: true,
                field: 'posted_at',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'posted_by',
                required: true,
                label: 'Posted By',
                align: 'left',
                sortable: true,
                field: 'posted_by',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            
            {
                name: 'updated_at',
                required: true,
                label: 'Updated At',
                align: 'left',
                sortable: true,
                field: 'updated_at',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            {
                name: 'updated_by',
                required: true,
                label: 'Updated By',
                align: 'left',
                sortable: true,
                field: 'updated_by',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            {
                name: 'created_at',
                required: true,
                label: 'Created At',
                align: 'left',
                sortable: true,
                field: 'created_at',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },

            {
                name: 'created_by',
                required: true,
                label: 'Created By',
                align: 'left',
                sortable: true,
                field: 'created_by',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },


        ];

        if(this.page_function == 'create' || this.page_function == 'view')
          {
            // alert('barcode')
              table_column10 = table_column10.filter((entry)=>{
                  return entry.name != 'action'
              })
          }
        this.table_column10 = table_column10;

        if(this.page_function == 'create'){
              this.table_data10 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
            return;
          }

        var payload = {
          "pass_json": {
            "itemcode": this.Itemcode,
            "outlet_guid": this.session_outlet_guid,
            "language": this.language,
            "skip": 0,
            "limit": payload.limit,
            "sort_by": "created_at",
            "sort_type": "Asc",
          },
        };

        var object_pass = {
          "dispatch": 'itemmaster/trigger_post_get_cost_price_change_item_vendor',
          "getter": 'itemmaster/get_cost_price_change_item_vendor',
          "app": this,
          "payload": payload,
        };


        var dispatch_response_cost_price_change_item_vendor = await this.$dispatch(object_pass);

        var status = dispatch_response_cost_price_change_item_vendor.status

        if(status == "failed"){
          this.table_data10 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
        }else{
          var results = dispatch_response_cost_price_change_item_vendor.response.detail;



          // else if(this.page_function == 'EditItemmaster'){
              this.table_data10 = {
              "data": {
                "count": dispatch_response_cost_price_change_item_vendor.response.total_row,
                "next": null,
                "previous": null,
                "results": dispatch_response_cost_price_change_item_vendor.response.detail
                // "results": dispatch_response_pricetype.response
              }
            };
          // }


          // this.results = dispatch_response_pricetype.response.detail;
          this.results = dispatch_response_cost_price_change_item_vendor.response;


        }


    },
    handleTableChange11: function(newVal)
    {
          var new_params = this.$pluginsTableParams(newVal)

          var payload = {
              params : new_params
          };

          this.goodreceiving_ori_params = payload;
          this.table_function11(payload);
    },
    async table_function11(ori_payload){
        var payload = ori_payload.params


        var table_column11 = [
            {
                name: 'grdate',
                required: true,
                label: 'Mth',
                align: 'left',
                sortable: true,
                field: row => row.grmain.GRDate,
                format: val => val ? val.slice(0, 7) : '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
             {
                name: 'grmain.GRDate',
                required: true,
                label: 'GR. Date',
                align: 'left',
                sortable: true,
                field: row => row.grmain.GRDate,
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'Posted',
                required: true,
                label: 'Posted',
                align: 'left',
                sortable: true,
                field: 'Posted',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'barcode',
                required: true,
                label: 'Code',
                align: 'left',
                sortable: true,
                field: 'barcode',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'grmain.Name',
                required: true,
                label: 'Name',
                align: 'left',
                sortable: true,
                field: row => row.grmain.Name,
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center'

            },
             {
                name: 'RefNo',
                required: true,
                label: 'Ref #',
                align: 'left',
                sortable: true,
                field: 'RefNo',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

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
                name: 'Qty',
                required: true,
                label: 'Single Stock',
                align: 'left',
                sortable: true,
                field: 'Qty',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

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
                headerStyle: 'text-align: center;'

            },
            {
                name: 'grmain.UM',
                required: true,
                label: 'UOM',
                align: 'left',
                sortable: true,
                field: row => row.grmain.UM,
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'Inv_UnitPrice',
                required: true,
                label: 'Unit Price',
                align: 'left',
                sortable: true,
                field: 'Inv_UnitPrice',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'UnitPrice',
                required: true,
                label: 'Actual Cost',
                align: 'left',
                sortable: true,
                field: 'UnitPrice',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'TotalPrice',
                required: true,
                label: 'Total Price',
                align: 'left',
                sortable: true,
                field: 'TotalPrice',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'grmain.Location',
                required: true,
                label: 'Location',
                align: 'left',
                sortable: true,
                field: row => row.grmain.Location,
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'cost_manual',
                required: true,
                label: 'Manual Cost',
                align: 'left',
                sortable: true,
                field: 'cost_manual',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },


            {
                name: 'rebate_value',
                required: true,
                label: 'Rebate',
                align: 'center',
                sortable: true,
                field: row => row.grmain.rebate,
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
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
                name: 'Disc1Type',
                required: true,
                label: 'Disc1Type',
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
                label: 'Disc1Value',
                align: 'left',
                sortable: true,
                field: 'Disc1Value',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'Disc2Type',
                required: true,
                label: 'Disc2Type',
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
                label: 'Disc2Value',
                align: 'left',
                sortable: true,
                field: 'Disc2Value',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'NetUnitPrice',
                required: true,
                label: 'Net UnitPrice',
                align: 'left',
                sortable: true,
                field: 'NetUnitPrice',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },

            {
                name: 'InvActCost',
                required: true,
                label: 'Invoice Act Cost',
                align: 'left',
                sortable: true,
                field: 'InvActCost',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

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
                name: 'PORefNo',
                required: true,
                label: 'PO REF#',
                align: 'left',
                sortable: true,
                field: 'PORefNo',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

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
                headerStyle: 'text-align: center;'

            },

            {
                name: 'grmain.DONo',
                required: true,
                label: 'DO',
                align: 'left',
                sortable: true,
                field: row => row.grmain.DONo,
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'grmain.InvNo',
                required: true,
                label: 'Invoice',
                align: 'left',
                sortable: true,
                field: row => row.grmain.InvNo,
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'grmain.postby',
                required: true,
                label: 'Posted By',
                align: 'left',
                sortable: true,
                field: row => row.grmain.postby,
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'postdatetime',
                required: true,
                label: 'PostDateTime',
                align: 'left',
                sortable: true,
                field: 'postdatetime',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            {
                name: 'grmain.unpostby',
                required: true,
                label: 'Unpost By',
                align: 'center',
                sortable: true,
                field: row => row.grmain.unpostby,
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            {
                name: 'grmain.unpostdatetime',
                required: true,
                label: 'UnpostDateTime',
                align: 'left',
                sortable: true,
                field: row => row.grmain.unpostdatetime,
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },



        ];

        if(this.page_function == 'create' || this.page_function == 'view')
          {
            // alert('barcode')
              table_column11 = table_column11.filter((entry)=>{
                  return entry.name != 'action'
              })
          }
        this.table_column11 = table_column11;

        if(this.page_function == 'create'){
              this.table_data11 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
            return;
          }

        var payload = {
          "pass_json": {
            "Itemcode": this.Itemcode,
            "outlet_guid": this.session_outlet_guid,
            "language": this.language,
            "skip": 0,
            "ibt_or": [0,2]
          },
        };

        var object_pass = {
          "dispatch": 'itemmaster/trigger_post_get_read_grchild',
          "getter": 'itemmaster/get_read_grchild',
          "app": this,
          "payload": payload,
        };

        var dispatch_response_get_read_grchild = await this.$dispatch(object_pass);

        var status = dispatch_response_get_read_grchild.status

        if(status == "failed"){
          this.table_data11 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
        }else{
          var results = dispatch_response_get_read_grchild.response.detail;
          // var filteredResults = results.filter(item => item.grmain && (item.grmain.ibt === 0 || item.grmain.ibt === 2));
          var filteredResults = results;



          // else if(this.page_function == 'EditItemmaster'){
              this.table_data11 = {
              "data": {
                // "count": dispatch_response_get_read_grchild.response.total_row,
                "count": filteredResults.length,
                "next": null,
                "previous": null,
                // "results": dispatch_response_get_read_grchild.response.detail
                "results": filteredResults
              }
            };
          // }


          // this.results = dispatch_response_pricetype.response.detail;
          this.results = dispatch_response_get_read_grchild.response;


        }


    },
    handleTableChange12: function(newVal)
    {
          var new_params = this.$pluginsTableParams(newVal)

          var payload = {
              params : new_params
          };

          this.permanentdiscount_ori_params = payload;
          this.table_function12(payload);
    },
    async table_function12(ori_payload){
        var payload = ori_payload.params


        var table_column12 = [
            {
                name: 'action',
                required: true,
                label: this.$language('D0028'),
                header_align: 'center',
                align: 'center',
                sortable: false,
                field: 'action',
                format_child: '',
                tooltip: '',
                headerStyle:'text-align: center; width: 1%;',
                filter_type: 'input',
                filter_options: [],
                filter_value: '',
            },
            {
                name: 'CardType',
                required: true,
                label: 'Card Type',
                align: 'left',
                sortable: true,
                field: 'CardType',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'Disc1Type',
                required: true,
                label: 'Disc1 Type',
                align: 'right',
                sortable: true,
                field: 'Disc1Type',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
             {
                name: 'Disc1Value',
                required: true,
                label: 'Disc1 Value',
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
                align: 'right',
                sortable: true,
                field: 'Disc2Type',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            
            {
                name: 'Disc2Value',
                required: true,
                label: 'Disc2 Value',
                align: 'right',
                sortable: true,
                field: 'Disc2Value',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            
             {
                name: 'NetPrice',
                required: true,
                label: 'Net Price',
                align: 'left',
                sortable: true,
                field: 'NetPrice',
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
            

        ];

        if(this.page_function == 'create' || this.page_function == 'view')
          {
            // alert('barcode')
              table_column12 = table_column12.filter((entry)=>{
                  return entry.name != 'action'
              })
          }
        this.table_column12 = table_column12;

        if(this.page_function == 'create'){
              this.table_data12 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
            return;
          }

        var payload = {
          "pass_json": {
            "Itemcode": this.Itemcode,
            "outlet_guid": this.session_outlet_guid,
            "language": this.language,
            "skip": 0,
            "limit": payload.limit,
            "sort_by": "Created_at",
            "sort_type": "Asc",
          },
        };


        var object_pass = {
          "dispatch": 'itemmaster/trigger_post_get_itemmaster_discount',
          "getter": 'itemmaster/get_itemmaster_discount',
          "app": this,
          "payload": payload,
        };


        var dispatch_response_get_itemmaster_discount = await this.$dispatch(object_pass);

        var status = dispatch_response_get_itemmaster_discount.status

        if(status == "failed"){
          this.table_data12 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
        }else{
          var results = dispatch_response_get_itemmaster_discount.response.detail;



          // else if(this.page_function == 'EditItemmaster'){
              this.table_data12 = {
              "data": {
                "count": dispatch_response_get_itemmaster_discount.response.total_row,
                "next": null,
                "previous": null,
                "results": dispatch_response_get_itemmaster_discount.response.detail
                // "results": dispatch_response_get_itemmaster_discount.response
              }
            };
          // }


          // this.results = dispatch_response_get_itemmaster_discount.response.detail;
          this.results = dispatch_response_get_itemmaster_discount.response;


        }


    },
    addButtonPermanentDiscount(){
    this.show_permanentDiscount_dialog = true;
    this.edit_permanentDiscount = false;
    },
    async handleAddPermanentDiscount()
    {
    if(this.json.BillStatus == 1)
    {
        this.showNotify("negative","This Doc already posted.");
        return;
    }

    var validate = await this.validate_form("save_edit_pochild_form");

    if(!validate)
    {
        this.showNotify("negative","Please make sure all field is correct.");
        this.showAddLoading = false;
        return;
    }

    this.showAddLoading = true;
    this.permanentdisc_loading = true;

    var CardType = this.pdiscjson.CardType;
    var Disc1Type = this.pdiscjson.Disc1Type;
    var Disc1Value = this.pdiscjson.Disc1Value;
    var Disc2Type = this.pdiscjson.Disc2Type;
    var Disc2Value = this.pdiscjson.Disc2Value;
    var net_price = this.pdiscjson.net_price;
    
    var payload = {
        pass_json: {
          updated_by: this.session_user_guid,
          Itemcode: this.Itemcode,
          CardType: CardType,
          Disc1Type: Disc1Type,
          Disc1Value: Disc1Value,
          Disc2Type: Disc2Type,
          Disc2Value: Disc2Value,
          net_price: net_price,
          language: this.language,
        }
    }

      var object_pass = {};

      if(!this.edit_permanentDiscount)
      {
        payload.pass_json.Created_by = this.session_user_guid;

        object_pass = {
            "dispatch": 'itemmaster/trigger_post_create_itemmaster_discount',  // endpoint hardcoded
            "getter": 'itemmaster/get_itemmaster_discount',             // getter hardcoded
            "app": this,
            "payload": payload,
        };
      }
      else if(this.edit_permanentDiscount)
      {
        payload.pass_json.ItemDisc_Guid = this.pdiscjson.ItemDisc_Guid;
        payload.pass_json.Updated_by = this.session_user_guid;

        object_pass = {
          "dispatch": 'itemmaster/trigger_post_update_itemmaster_discount',  // endpoint hardcoded
          "getter": 'itemmaster/get_itemmaster_discount',             // getter hardcoded
          "app": this,
          "payload": payload,
        };
      }

      var dispatch_response = await this.$dispatch(object_pass);

      if (dispatch_response.status) {
          // success condition
          var success_message = !this.edit_permanentDiscount == 'create' ? 'Permanent Discount Created Successfully.' : 'Permanent Discount Edited Successfully.';
          this.showNotify("positive", success_message);
          this.table_function12(this.permanentdiscount_ori_params);
          this.showAddLoading = false;
          this.permanentdisc_loading = false;
          this.edit_permanentDiscount = null;
          this.show_permanentDiscount_dialog = false;
          this.pdiscjson = {};
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
        this.permanentdisc_loading = false;
      }
    },
    async handleReceiveHandleEdit12(row)
    {
    this.show_permanentDiscount_dialog = true;
    this.edit_permanentDiscount = true;
    this.permanentdisc_loading = true;
    this.edit_child = true;

    var result = JSON.parse(JSON.stringify(row.row));
    this.permanentdisc_loading = false;
    this.pdiscjson = result;
    },
    handleTableChange13: function(newVal)
    {
          var new_params = this.$pluginsTableParams(newVal)

          var payload = {
              params : new_params
          };

          this.priceBreak_ori_params = payload;
          this.table_function13(payload);
    },
    async table_function13(ori_payload){
        var payload = ori_payload.params


        var table_column13 = [
          {
                name: 'action',
                required: true,
                label: this.$language('D0028'),
                header_align: 'center',
                align: 'center',
                sortable: false,
                field: 'action',
                format_child: '',
                tooltip: '',
                headerStyle:'text-align: center; width: 1%;',
                filter_type: 'input',
                filter_options: [],
                filter_value: '',
            },
            {
                name: 'qty',
                required: true,
                label: 'Qty',
                align: 'left',
                sortable: true,
                field: 'qty',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'break_type',
                required: true,
                label: 'Type',
                align: 'left',
                sortable: true,
                field: 'break_type',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'break_price',
                required: true,
                label: 'Value',
                align: 'left',
                sortable: true,
                field: 'break_price',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },

            {
                name: 'updated_by',
                required: true,
                label: 'updated By',
                align: 'left',
                sortable: true,
                field: 'updated_by',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'updated_at',
                required: true,
                label: 'updated At',
                align: 'left',
                sortable: true,
                field: 'updated_at',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'created_by',
                required: true,
                label: 'created By',
                align: 'left',
                sortable: true,
                field: 'created_by',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'created_at',
                required: true,
                label: 'created At',
                align: 'left',
                sortable: true,
                field: 'created_at',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },




        ];

        if(this.page_function == 'create' || this.page_function == 'view')
          {
            // alert('barcode')
              table_column13 = table_column13.filter((entry)=>{
                  return entry.name != 'action'
              })
          }
        this.table_column13 = table_column13;

        if(this.page_function == 'create'){
              this.table_data13 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
            return;
          }

        var payload = {
          "pass_json": {
            "itemcode": this.Itemcode,
            "outlet_guid": this.session_outlet_guid,
            "language": this.language,
            "skip": 0,
            "limit": payload.limit,
            "sort_by": "updated_at",
            "sort_type": "Asc",
          },
        };

        var xpayload = {
        "pass_json":{}
        }



        var object_pass = {
          "dispatch": 'itemmaster/trigger_post_get_itemmaster_price_break_c',
          "getter": 'itemmaster/get_itemmaster_price_break_c',
          "app": this,
          "payload": payload,
        };


        var dispatch_response_priceBreak = await this.$dispatch(object_pass);

        var status = dispatch_response_priceBreak.status

        if(status == "failed"){
          this.table_data13 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
        }else{
          var results = dispatch_response_priceBreak.response.detail;





          // else if(this.page_function == 'EditItemmaster'){
              this.table_data13 = {
              "data": {
                "count": dispatch_response_priceBreak.response.total_row,
                "next": null,
                "previous": null,
                "results": results
                // "results": dispatch_response_priceBreak.response
              }
            };
          // }


          // this.results = dispatch_response_priceBreak.response.detail;
          this.results = dispatch_response_priceBreak.response;


        }


    },
    addButtonPriceBreak(){
    this.show_pricebreak_dialog = true;
    this.edit_pricebreak = false;
    },
    async handleAddPriceBreak()
    {
    if(this.json.BillStatus == 1)
    {
        this.showNotify("negative","This Doc already posted.");
        return;
    }

    var validate = await this.validate_form("save_edit_pochild_form");

    if(!validate)
    {
        this.showNotify("negative","Please make sure all field is correct.");
        this.showAddLoading = false;
        return;
    }

    this.showAddLoading = true;
    this.pricebreak_loading = true;

    var qty = this.pbjson.qty;
    var break_type = this.pbjson.break_type;
    var break_price = this.pbjson.break_price;
  
    var payload = {
        pass_json: {
          updated_by: this.session_user_guid,
          itemcode: this.Itemcode,
          qty: qty,
          break_type: break_type,
          break_price: break_price,
          language: this.language,
        }
    }

      var object_pass = {};

      if(!this.edit_pricebreak)
      {
        payload.pass_json.pricebreak_guid = this.pbjson.pricebreak_guid;
        payload.pass_json.created_by = this.session_user_guid;

        object_pass = {
            "dispatch": 'itemmaster/trigger_post_create_itemmaster_price_break_c',  // endpoint hardcoded
            "getter": 'itemmaster/get_itemmaster_price_break_c',             // getter hardcoded
            "app": this,
            "payload": payload,
        };
      }
      else if(this.edit_pricebreak)
      {
        
        payload.pass_json.pricebreak_guid = this.pbjson.pricebreak_guid;
        payload.pass_json.pricebreak_guid_c = this.pbjson.pricebreak_guid_c;
        payload.pass_json.updated_by = this.session_user_guid;

        object_pass = {
          "dispatch": 'itemmaster/trigger_post_update_itemmaster_price_break_c',  // endpoint hardcoded
          "getter": 'itemmaster/get_itemmaster_price_break_c',             // getter hardcoded
          "app": this,
          "payload": payload,
        };
      }

      var dispatch_response = await this.$dispatch(object_pass);

      if (dispatch_response.status) {
          // success condition
          var success_message = !this.edit_listed_branch == 'create' ? 'Price Break Created Successfully.' : 'Price break Edited Successfully.';
          this.showNotify("positive", success_message);
          this.table_function13(this.priceBreak_ori_params);
          this.showAddLoading = false;
          this.pricebreak_loading = false;
          this.edit_pricebreak = null;
          this.show_pricebreak_dialog = false;
          this.pbjson = {};
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
        this.pricebreak_loading = false;
      }
    },
    async handleReceiveHandleEdit13(row)
    {
    this.show_pricebreak_dialog = true;
    this.edit_pricebreak = true;
    this.pricebreak_loading = true;
    this.edit_child = true;

    var result = JSON.parse(JSON.stringify(row.row));
    this.pricebreak_loading = false;
    this.pbjson = result;
    },
    
    handleTableChange14: function(newVal)
    {
          var new_params = this.$pluginsTableParams(newVal)

          var payload = {
              params : new_params
          };

          this.ibtpurchase_ori_params = payload;
          this.table_function14(payload);
    },
    async table_function14(ori_payload){
        var payload = ori_payload.params


        var table_column14 = [
            {
                name: 'grdate',
                required: true,
                label: 'Mth',
                align: 'left',
                sortable: true,
                field: row => row.grmain.GRDate,
                format: val => val ? val.slice(0, 7) : '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
             {
                name: 'grmain.GRDate',
                required: true,
                label: 'GR. Date',
                align: 'left',
                sortable: true,
                field: row => row.grmain.GRDate,
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'Posted',
                required: true,
                label: 'Posted',
                align: 'left',
                sortable: true,
                field: 'Posted',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'barcode',
                required: true,
                label: 'Code',
                align: 'left',
                sortable: true,
                field: 'barcode',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'grmain.Name',
                required: true,
                label: 'Name',
                align: 'left',
                sortable: true,
                field: row => row.grmain.Name,
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center'

            },
             {
                name: 'RefNo',
                required: true,
                label: 'Ref #',
                align: 'left',
                sortable: true,
                field: 'RefNo',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

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
                name: 'Qty',
                required: true,
                label: 'Single Stock',
                align: 'left',
                sortable: true,
                field: 'Qty',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

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
                headerStyle: 'text-align: center;'

            },
            {
                name: 'grmain.UM',
                required: true,
                label: 'UOM',
                align: 'left',
                sortable: true,
                field: row => row.grmain.UM,
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'Inv_UnitPrice',
                required: true,
                label: 'Unit Price',
                align: 'left',
                sortable: true,
                field: 'Inv_UnitPrice',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'UnitPrice',
                required: true,
                label: 'Actual Cost',
                align: 'left',
                sortable: true,
                field: 'UnitPrice',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'TotalPrice',
                required: true,
                label: 'Total Price',
                align: 'left',
                sortable: true,
                field: 'TotalPrice',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'grmain.Location',
                required: true,
                label: 'Location',
                align: 'left',
                sortable: true,
                field: row => row.grmain.Location,
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'cost_manual',
                required: true,
                label: 'Manual Cost',
                align: 'left',
                sortable: true,
                field: 'cost_manual',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },


            {
                name: 'rebate_value',
                required: true,
                label: 'Rebate',
                align: 'center',
                sortable: true,
                field: row => row.grmain.rebate,
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
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
                name: 'Disc1Type',
                required: true,
                label: 'Disc1Type',
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
                label: 'Disc1Value',
                align: 'left',
                sortable: true,
                field: 'Disc1Value',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'Disc2Type',
                required: true,
                label: 'Disc2Type',
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
                label: 'Disc2Value',
                align: 'left',
                sortable: true,
                field: 'Disc2Value',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'NetUnitPrice',
                required: true,
                label: 'Net UnitPrice',
                align: 'left',
                sortable: true,
                field: 'NetUnitPrice',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },

            {
                name: 'InvActCost',
                required: true,
                label: 'Invoice Act Cost',
                align: 'left',
                sortable: true,
                field: 'InvActCost',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

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
                name: 'PORefNo',
                required: true,
                label: 'PO REF#',
                align: 'left',
                sortable: true,
                field: 'PORefNo',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

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
                headerStyle: 'text-align: center;'

            },

            {
                name: 'grmain.DONo',
                required: true,
                label: 'DO',
                align: 'left',
                sortable: true,
                field: row => row.grmain.DONo,
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'grmain.InvNo',
                required: true,
                label: 'Invoice',
                align: 'left',
                sortable: true,
                field: row => row.grmain.InvNo,
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'grmain.postby',
                required: true,
                label: 'Posted By',
                align: 'left',
                sortable: true,
                field: row => row.grmain.postby,
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'postdatetime',
                required: true,
                label: 'PostDateTime',
                align: 'left',
                sortable: true,
                field: 'postdatetime',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            {
                name: 'grmain.unpostby',
                required: true,
                label: 'Unpost By',
                align: 'center',
                sortable: true,
                field: row => row.grmain.unpostby,
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            {
                name: 'grmain.unpostdatetime',
                required: true,
                label: 'UnpostDateTime',
                align: 'left',
                sortable: true,
                field: row => row.grmain.unpostdatetime,
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },



        ];


        if(this.page_function == 'create' || this.page_function == 'view')
          {
            // alert('barcode')
              table_column14 = table_column14.filter((entry)=>{
                  return entry.name != 'action'
              })
          }
        this.table_column14 = table_column14;

        if(this.page_function == 'create'){
              this.table_data14 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
            return;
          }

        var payload = {
          "pass_json": {
            "Itemcode": this.Itemcode,
            "outlet_guid": this.session_outlet_guid,
            "language": this.language,
            "skip": 0,
            "ibt_or": [1],
          },
        };

        var object_pass = {
          "dispatch": 'itemmaster/trigger_post_get_read_grchild',
          "getter": 'itemmaster/get_read_grchild',
          "app": this,
          "payload": payload,
        };

        var dispatch_response_get_read_ibt = await this.$dispatch(object_pass);

        var status = dispatch_response_get_read_ibt.status

        if(status == "failed"){
          this.table_data11 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
        }else{
          var results = dispatch_response_get_read_ibt.response.detail;
          // var filteredResults = results.filter(item => item.grmain && item.grmain.ibt === 1);
          var filteredResults = results;




          // else if(this.page_function == 'EditItemmaster'){
              this.table_data14 = {
              "data": {
                // "count": dispatch_response_get_read_ibt.response.total_row,
                "count": filteredResults.length,
                "next": null,
                "previous": null,
                // "results": dispatch_response_get_read_ibt.response.detail
                "results": filteredResults
              }
            };
          // }


          // this.results = dispatch_response_get_read_ibt.response.detail;
          this.results = dispatch_response_get_read_ibt.response;


        }


    },
    handleTableChange15: function(newVal)
    {
          var new_params = this.$pluginsTableParams(newVal)

          var payload = {
              params : new_params
          };

          this.todayprice_ori_params = payload;
          this.table_function15(payload);
    },
    async table_function15(ori_payload){
        var payload = ori_payload.params


        var table_column15 = [
            // {
            //     name: 'action',
            //     required: true,
            //     label: this.$language('D0028'),
            //     header_align: 'center',
            //     align: 'center',
            //     sortable: false,
            //     field: 'action',
            //     format_child: '',
            //     tooltip: '',
            //     headerStyle:'text-align: center; width: 1%;',
            //     filter_type: 'input',
            //     filter_options: [],
            //     filter_value: '',
            // },
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
                headerStyle: 'text-align: center;'

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
                label: 'Fifo Cost',
                align: 'right',
                sortable: true,
                field: 'fifocost',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'lastcost',
                required: true,
                label: 'Last Cost GP%',
                align: 'right',
                sortable: true,
                field: 'lastcost',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            // {
            //     name: 'price_today_na',
            //     required: true,
            //     label: 'Today Price Inc Tax',
            //     align: 'right',
            //     sortable: true,
            //     field: 'price_today_na',
            //     format_child: '',
            //     tooltip: '',
            //     headerStyle: 'text-align: center;'

            // },
            // {
            //     name: 'price_today_mb',
            //     required: true,
            //     label: 'Today Member Price Inc Tax',
            //     align: 'right',
            //     sortable: true,
            //     field: 'price_today_mb',
            //     format_child: '',
            //     tooltip: '',
            //     headerStyle: 'text-align: center;'

            // },
            // {
            //     name: 'rank_cat_qty',
            //     required: true,
            //     label: 'Category Ranking',
            //     align: 'left',
            //     sortable: true,
            //     field: 'rank_cat_qty',
            //     format_child: '',
            //     tooltip: '',
            //     headerStyle: 'text-align: center;'

            // },
            // {
            //     name: 'rank_cat_amt',
            //     required: true,
            //     label: 'Category Ranking ($)',
            //     align: 'left',
            //     sortable: true,
            //     field: 'rank_cat_amt',
            //     format_child: '',
            //     tooltip: '',
            //     headerStyle: 'text-align: center;'

            // },
            // {
            //     name: 'qty_promo',
            //     required: true,
            //     label: 'Qty Promo',
            //     align: 'right',
            //     sortable: true,
            //     field: 'qty_promo',
            //     format_child: '',
            //     tooltip: '',
            //     headerStyle: 'text-align: center;'

            // },
            // {
            //     name: 'ads_rep',
            //     required: true,
            //     label: 'Replenishment ADS',
            //     align: 'left',
            //     sortable: true,
            //     field: 'ads_rep',
            //     format_child: '',
            //     tooltip: '',
            //     headerStyle: 'text-align: center;'

            // },
            // {
            //     name: 'branch_itemtype',
            //     required: true,
            //     label: 'Item Type',
            //     align: 'left',
            //     sortable: true,
            //     field: 'branch_itemtype',
            //     format_child: '',
            //     tooltip: '',
            //     headerStyle: 'text-align: center;'

            // },
            // {
            //     name: 'day_promo',
            //     required: true,
            //     label: 'Promo Day',
            //     align: 'left',
            //     sortable: true,
            //     field: 'day_promo',
            //     format_child: '',
            //     tooltip: '',
            //     headerStyle: 'text-align: center;'

            // },
            // {
            //     name: 'qty_hp_out',
            //     required: true,
            //     label: 'Transform Out',
            //     align: 'left',
            //     sortable: true,
            //     field: 'qty_hp_out',
            //     format_child: '',
            //     tooltip: '',
            //     headerStyle: 'text-align: center;'

            // },
            // {
            //     name: 'qty_ibt_sales',
            //     required: true,
            //     label: 'IBT Sales',
            //     align: 'left',
            //     sortable: true,
            //     field: 'qty_ibt_sales',
            //     format_child: '',
            //     tooltip: '',
            //     headerStyle: 'text-align: center;'

            // },{
            //     name: 'qty_ibt_grn',
            //     required: true,
            //     label: 'IBT GRN',
            //     align: 'left',
            //     sortable: true,
            //     field: 'qty_ibt_grn',
            //     format_child: '',
            //     tooltip: '',
            //     headerStyle: 'text-align: center;'

            // },{
            //     name: 'branch',
            //     required: true,
            //     label: 'Branch',
            //     align: 'left',
            //     sortable: true,
            //     field: 'branch',
            //     format_child: '',
            //     tooltip: '',
            //     headerStyle: 'text-align: center;'

            // },


        ];

        if(this.page_function == 'create' || this.page_function == 'view')
          {
            // alert('barcode')
              table_column15 = table_column15.filter((entry)=>{
                  return entry.name != 'action'
              })
          }
        this.table_column15 = table_column15;

        if(this.page_function == 'create'){
              this.table_data15 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
            return;
          }

        var payload = {
          "pass_json": {
            "itemcode": this.Itemcode,
            "outlet_guid": this.session_outlet_guid,
            "language": this.language,
            "skip": 0,
            "limit": payload.limit,
            "sort_by": "created_at",
            "sort_type": "Asc",
          },
        };

        var object_pass = {
          "dispatch": 'itemmaster/trigger_post_get_itemmaster_branch_stock',
          "getter": 'itemmaster/get_itemmaster_branch_stock',
          "app": this,
          "payload": payload,
        };


        var dispatch_response_get_itemmaster_branch_stock = await this.$dispatch(object_pass);

        var status = dispatch_response_get_itemmaster_branch_stock.status

        if(status == "failed"){
          this.table_data15 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
        }else{
          var results = dispatch_response_get_itemmaster_branch_stock.response.detail;


          // else if(this.page_function == 'EditItemmaster'){
              this.table_data15 = {
              "data": {
                "count": dispatch_response_get_itemmaster_branch_stock.response.total_row,
                "next": null,
                "previous": null,
                "results": dispatch_response_get_itemmaster_branch_stock.response.detail
                // "results": dispatch_response_get_itemmaster_branch_stock.response
              }
            };
          // }


          // this.results = dispatch_response_get_itemmaster_branch_stock.response.detail;
          this.results = dispatch_response_get_itemmaster_branch_stock.response;


        }


    },
    handleTableChange16: function(newVal)
    {
          var new_params = this.$pluginsTableParams(newVal)

          var payload = {
              params : new_params
          };

          this.threePlusOne_ori_params = payload;
          this.table_function16(payload);
    },
    async table_function16(ori_payload){
        var payload = ori_payload.params


        var table_column16 = [
            // {
            //     name: 'action',
            //     required: true,
            //     label: this.$language('D0028'),
            //     header_align: 'center',
            //     align: 'center',
            //     sortable: false,
            //     field: 'action',
            //     format_child: '',
            //     tooltip: '',
            //     headerStyle:'text-align: center; width: 1%;',
            //     filter_type: 'input',
            //     filter_options: [],
            //     filter_value: '',
            // },
            {
                name: 'qty_opn',
                required: true,
                label: 'Opn',
                align: 'left',
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
                align: 'left',
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
                align: 'left',
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
                align: 'left',
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
                align: 'left',
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
                align: 'left',
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
                align: 'left',
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
                align: 'left',
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
                align: 'left',
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
                align: 'left',
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
                align: 'left',
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
                align: 'left',
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
                align: 'left',
                sortable: true,
                field: 'ams',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },



        ];

        if(this.page_function == 'create' || this.page_function == 'view')
          {
            // alert('barcode')
              table_column16 = table_column16.filter((entry)=>{
                  return entry.name != 'action'
              })
          }
        this.table_column16 = table_column16;

        if(this.page_function == 'create'){
              this.table_data16 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
            return;
          }

        var payload = {
          "pass_json": {
            "itemcode": this.Itemcode,
            "outlet_guid": this.session_outlet_guid,
            "language": this.language,
            "skip": 0,
            "limit": payload.limit,
            "sort_by": "created_at",
            "sort_type": "Asc",
          },
        };

        var object_pass = {
          "dispatch": 'itemmaster/trigger_post_get_itemmaster_branch_stock',
          "getter": 'itemmaster/get_itemmaster_branch_stock',
          "app": this,
          "payload": payload,
        };


        var dispatch_response_get_itemmaster_branch_stock = await this.$dispatch(object_pass);

        var status = dispatch_response_get_itemmaster_branch_stock.status

        if(status == "failed"){
          this.table_data16 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
        }else{
          var results = dispatch_response_get_itemmaster_branch_stock.response.detail;


          // else if(this.page_function == 'EditItemmaster'){
              this.table_data16 = {
              "data": {
                "count": dispatch_response_get_itemmaster_branch_stock.response.total_row,
                "next": null,
                "previous": null,
                "results": dispatch_response_get_itemmaster_branch_stock.response.detail
                // "results": dispatch_response_get_itemmaster_branch_stock.response
              }
            };
          // }


          // this.results = dispatch_response_get_itemmaster_branch_stock.response.detail;
          this.results = dispatch_response_get_itemmaster_branch_stock.response;


        }


    },
    handleTableChange17: function(newVal)
    {
          var new_params = this.$pluginsTableParams(newVal)

          var payload = {
              params : new_params
          };

          this.arsales_ori_params = payload;
          this.table_function17(payload);
    },
    async table_function17(ori_payload){
        var payload = ori_payload.params


        var table_column17 = [
            // {
            //     name: 'action',
            //     required: true,
            //     label: this.$language('D0028'),
            //     header_align: 'center',
            //     align: 'center',
            //     sortable: false,
            //     field: 'action',
            //     format_child: '',
            //     tooltip: '',
            //     headerStyle:'text-align: center; width: 1%;',
            //     filter_type: 'input',
            //     filter_options: [],
            //     filter_value: '',
            // },
            {
                name: 'Mth',
                required: true,
                label: 'Mth',
                align: 'left',
                sortable: true,
                field: 'Mth',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
             {
                name: 'posted',
                required: true,
                label: 'Posted',
                align: 'center',
                sortable: true,
                field: 'posted',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'InvoiceDate',
                required: true,
                label: 'Inv.Date',
                align: 'left',
                sortable: true,
                field: 'InvoiceDate',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'DeliverDate',
                required: true,
                label: 'Del.Date',
                align: 'left',
                sortable: true,
                field: 'DeliverDate',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

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
                headerStyle: 'text-align: center'

            },
            {
                name: 'SubDept',
                required: true,
                label: 'Dept',
                align: 'left',
                sortable: true,
                field: 'SubDept',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

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
                headerStyle: 'text-align: center;'

            },
            {
                name: 'DiscAmt',
                required: true,
                label: 'Disc',
                align: 'right',
                sortable: true,
                field: 'DiscAmt',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

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
                headerStyle: 'text-align: center;'

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
                name: 'Disc1Type',
                required: true,
                label: 'Discount1Type',
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
                label: 'Disc2',
                align: 'right',
                sortable: true,
                field: 'Disc2Value',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'Disc2Type',
                required: true,
                label: 'Discount2 Type',
                align: 'right',
                sortable: true,
                field: 'Disc2Type',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },

            {
                name: 'postby',
                required: true,
                label: 'Post By',
                align: 'left',
                sortable: true,
                field: 'postby',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'postdatetime',
                required: true,
                label: 'Post Date Time',
                align: 'left',
                sortable: true,
                field: 'postdatetime',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'RefNo',
                required: true,
                label: 'Ref #',
                align: 'left',
                sortable: true,
                field: 'RefNo',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },



        ];


        if(this.page_function == 'create' || this.page_function == 'view')
          {
            // alert('barcode')
              table_column17 = table_column17.filter((entry)=>{
                  return entry.name != 'action'
              })
          }
        this.table_column17 = table_column17;

        if(this.page_function == 'create'){
              this.table_data17 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
            return;
          }

        if(payload.ordering == "" || !payload.ordering)
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
            payload.sort_type = "asc"
        }

        var payload = {
          "pass_json": {
            "Itemcode": this.Itemcode,
            "outlet_guid": this.session_outlet_guid,
            "language": this.language,
            "skip": 0,
            "limit": payload.limit,
            "sort_by": payload.sort_by,
            "sort_type": payload.sort_type,
            "ibt_or": [0,2]
          },
        };

        var object_pass = {
          "dispatch": 'itemmaster/trigger_post_get_get_sichild',
          "getter": 'itemmaster/get_sichild',
          "app": this,
          "payload": payload,
        };


        var dispatch_response_get_itemmaster_arSales = await this.$dispatch(object_pass);

        var status = dispatch_response_get_itemmaster_arSales.status

        if(status == "failed"){
          this.table_data17 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
        }else{
          var results = dispatch_response_get_itemmaster_arSales.response.detail;


          // else if(this.page_function == 'EditItemmaster'){
              this.table_data17 = {
              "data": {
                "count": dispatch_response_get_itemmaster_arSales.response.total_row,
                "next": null,
                "previous": null,
                "results": dispatch_response_get_itemmaster_arSales.response.detail
                // "results": dispatch_response_get_itemmaster_arSales.response
              }
            };
          // }


          // this.results = dispatch_response_get_itemmaster_arSales.response.detail;
          this.results = dispatch_response_get_itemmaster_arSales.response;


        }


    },
    handleTableChange18: function(newVal)
    {
          var new_params = this.$pluginsTableParams(newVal)

          var payload = {
              params : new_params
          };

          this.purchasepromo_ori_params = payload;
          this.table_function18(payload);
    },
    async table_function18(ori_payload){
        var payload = ori_payload.params



        var table_column18 = [
              // {
              //     name: 'action',
              //     required: true,
              //     label: this.$language('D0028'),
              //     header_align: 'center',
              //     align: 'center',
              //     sortable: false,
              //     field: 'action',
              //     format_child: '',
              //     tooltip: '',
              //     headerStyle:'text-align: center; width: 1%;',
              //     filter_type: 'input',
              //     filter_options: [],
              //     filter_value: '',
              // },
              {
                name: 'refno',
                required: true,
                label: 'Ref No',
                align: 'left',
                sortable: true,
                field: 'refno',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

              },
            {
                name: 'assorted',
                required: true,
                label: 'Assorted',
                align: 'left',
                sortable: true,
                field: 'assorted',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
             {
                name: 'foc_group',
                required: true,
                label: 'Foc group',
                align: 'left',
                sortable: true,
                field: 'foc_group',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'to_mandatory',
                required: true,
                label: 'Mandatory',
                align: 'left',
                sortable: true,
                field: 'to_mandatory',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'is_itemlink',
                required: true,
                label: 'With Item Link',
                align: 'left',
                sortable: true,
                field: 'is_itemlink',
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
                headerStyle: 'text-align: center'

            },
            {
                name: 'BulkQty',
                required: true,
                label: 'Bulk_Qty',
                align: 'right',
                sortable: true,
                field: 'BulkQty',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'OrderLotSize',
                required: true,
                label: 'Lot_size',
                align: 'right',
                sortable: true,
                field: 'OrderLotSize',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'UnitPrice',
                required: true,
                label: 'Unit Cost',
                align: 'right',
                sortable: true,
                field: 'UnitPrice',
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
                name: 'Disc1Type',
                required: true,
                label: 'Disc1Type',
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
                label: 'Disc2',
                align: 'right',
                sortable: true,
                field: 'Disc2Value',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'Disc2Type',
                required: true,
                label: 'Disc2Type',
                align: 'right',
                sortable: true,
                field: 'Disc2Type',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'NetPrice',
                required: true,
                label: 'NetCost',
                align: 'right',
                sortable: true,
                field: 'NetPrice',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'RebateUnitAmount',
                required: true,
                label: 'Unit Rebate Amount by cn',
                align: 'right',
                sortable: true,
                field: 'RebateUnitAmount',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'QtyMin',
                required: true,
                label: 'Minimum Qty',
                align: 'right',
                sortable: true,
                field: 'QtyMin',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'SetQty',
                required: true,
                label: 'qty',
                align: 'right',
                sortable: true,
                field: 'SetQty',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'SetFOCQty',
                required: true,
                label: 'foc',
                align: 'right',
                sortable: true,
                field: 'SetFOCQty',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'foc_mandatory',
                required: true,
                label: 'Mandatory FOC',
                align: 'left',
                sortable: true,
                field: 'foc_mandatory',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'updated_at',
                required: true,
                label: 'Updated At',
                align: 'left',
                sortable: true,
                field: 'updated_at',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'updated_by',
                required: true,
                label: 'Updated By',
                align: 'left',
                sortable: true,
                field: 'updated_by',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'created_at',
                required: true,
                label: 'Created At',
                align: 'left',
                sortable: true,
                field: 'created_at',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },

            {
                name: 'created_by',
                required: true,
                label: 'Created By',
                align: 'left',
                sortable: true,
                field: 'created_by',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
           
        ];

        if(this.page_function == 'create' || this.page_function == 'view')
          {
            // alert('barcode')
              table_column18 = table_column18.filter((entry)=>{
                  return entry.name != 'action'
              })
          }
        this.table_column18 = table_column18;

        if(this.page_function == 'create'){
              this.table_data18 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
            return;
          }

        var payload = {
          "pass_json": {
            "Itemcode": this.Itemcode,
            "outlet_guid": this.session_outlet_guid,
            "language": this.language,
            "skip": 0,
            "limit": payload.limit,
            "sort_by": "created_at",
            "sort_type": "Asc",
          },
        };

        var object_pass = {
          "dispatch": 'itemmaster/trigger_post_get_purchase_promo_c',
          "getter": 'itemmaster/get_purchase_promo_c',
          "app": this,
          "payload": payload,
        };


        var dispatch_response_get_purchase_promo_c = await this.$dispatch(object_pass);

        var status = dispatch_response_get_purchase_promo_c.status

        if(status == "failed"){
          this.table_data18 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
        }else{
          var results = dispatch_response_get_purchase_promo_c.response.detail;


          // else if(this.page_function == 'EditItemmaster'){
              this.table_data18 = {
              "data": {
                "count": dispatch_response_get_purchase_promo_c.response.total_row,
                "next": null,
                "previous": null,
                "results": dispatch_response_get_purchase_promo_c.response.detail
                // "results": dispatch_response_get_itemmaster_arSales.response
              }
            };
          // }


          // this.results = dispatch_response_get_itemmaster_arSales.response.detail;
          this.results = dispatch_response_get_purchase_promo_c.response;


        }


    },
    handleTableChange19: function(newVal)
    {
          var new_params = this.$pluginsTableParams(newVal)

          var payload = {
              params : new_params
          };

          this.possales_ori_params = payload;
          this.table_function19(payload);
    },
    async table_function19(ori_payload){
        var payload = ori_payload.params


        var table_column19 = [
            // {
            //   name: 'action',
            //   required: true,
            //   label: this.$language('D0028'),
            //   header_align: 'center',
            //   align: 'center',
            //   sortable: false,
            //   field: 'action',
            //   format_child: '',
            //   tooltip: '',
            //   headerStyle:'text-align: center; width: 1%;',
            //   filter_type: 'input',
            //   filter_options: [],
            //   filter_value: '',
            // },
            {
                name: 'Mth',
                required: true,
                label: 'Month',
                align: 'left',
                sortable: true,
                field: 'Mth',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'Location',
                required: true,
                label: 'Location',
                align: 'left',
                sortable: true,
                field: 'Location',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'BizDate',
                required: true,
                label: 'BizDate',
                align: 'left',
                sortable: true,
                field: 'BizDate',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
             {
                name: 'SysTime',
                required: true,
                label: 'Time',
                align: 'left',
                sortable: true,
                field: 'SysTime',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'RefNo',
                required: true,
                label: 'Ref No',
                align: 'left',
                sortable: true,
                field: 'RefNo',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

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
                headerStyle: 'text-align: center;'

            },
            {
                name: 'Price',
                required: true,
                label: 'Price',
                align: 'right',
                sortable: true,
                field: 'Price',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
             {
                name: 'DisValue',
                required: true,
                label: 'Discount',
                align: 'right',
                sortable: true,
                field: 'DisValue',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'QtyDiscount',
                required: true,
                label: 'QtyDisc',
                align: 'right',
                sortable: true,
                field: 'QtyDiscount',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'Amount',
                required: true,
                label: 'Total',
                align: 'right',
                sortable: true,
                field: 'Amount',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'weightvalue',
                required: true,
                label: 'Weight',
                align: 'right',
                sortable: true,
                field: 'weightvalue',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'WeightPrice',
                required: true,
                label: 'Weight $',
                align: 'right',
                sortable: true,
                field: 'WeightPrice',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'averagecost',
                required: true,
                label: 'Avg. Cost',
                align: 'right',
                sortable: true,
                field: 'averagecost',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'TTLCost',
                required: true,
                label: 'Totalcost',
                align: 'right',
                sortable: true,
                field: 'TTLCost',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'packsize',
                required: true,
                label: 'Pack Size',
                align: 'right',
                sortable: true,
                field: 'packsize',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'User',
                required: true,
                label: 'User',
                align: 'left',
                sortable: true,
                field: 'User',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'POSID',
                required: true,
                label: 'POSID',
                align: 'left',
                sortable: true,
                field: 'POSID',
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
                name: 'SysDate',
                required: true,
                label: 'SysDate',
                align: 'left',
                sortable: true,
                field: 'SysDate',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'Point',
                required: true,
                label: 'Point',
                align: 'right',
                sortable: true,
                field: 'Point',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'Itemrefund',
                required: true,
                label: 'Item Refund',
                align: 'left',
                sortable: true,
                field: 'Itemrefund',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'AccountNo',
                required: true,
                label: 'Account No',
                align: 'left',
                sortable: true,
                field: 'AccountNo',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },

            {
                name: 'CardNo',
                required: true,
                label: 'Card No',
                align: 'left',
                sortable: true,
                field: 'CardNo',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'CardName',
                required: true,
                label: 'Card Name',
                align: 'left',
                sortable: true,
                field: 'CardName',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'CardType',
                required: true,
                label: 'Card Type',
                align: 'left',
                sortable: true,
                field: 'CardType',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },



        ];

        if(this.page_function == 'create' || this.page_function == 'view')
          {
            // alert('barcode')
              table_column19 = table_column19.filter((entry)=>{
                  return entry.name != 'action'
              })
          }
        this.table_column19 = table_column19;

        if(this.page_function == 'create'){
              this.table_data19 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
            return;
          }


        var payload = {
          "pass_json": {
            // "Itemcode": this.Itemcode,
            "outlet_guid": this.session_outlet_guid,
            "language": this.language,
            "skip": 0,
            "limit": payload.limit,
            "sort_by": "RefNo",
            "sort_type": "Asc",
            "itemcode": this.$route.query.Itemcode,
          },
        };

        var object_pass = {
          "dispatch": 'itemmaster/trigger_post_get_poschild',
          "getter": 'itemmaster/get_get_poschild',
          "app": this,
          "payload": payload,
        };


        var dispatch_response_get_pos_sales = await this.$dispatch(object_pass);

        var status = dispatch_response_get_pos_sales.status

        if(status == "failed"){
          this.table_data19 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
        }else{
          var results = dispatch_response_get_pos_sales.response.detail;



          // else if(this.page_function == 'EditItemmaster'){
              this.table_data19 = {
              "data": {
                "count": dispatch_response_get_pos_sales.response.total_row,
                "next": null,
                "previous": null,
                "results": dispatch_response_get_pos_sales.response.detail
                // "results": dispatch_response_get_pos_sales.response
              }
            };
          // }


          // this.results = dispatch_response_get_pos_sales.response.detail;
          this.results = dispatch_response_get_pos_sales.response;


        }


    },
    handleTableChange20: function(newVal)
    {
          var new_params = this.$pluginsTableParams(newVal)

          var payload = {
              params : new_params
          };

          this.mixmatch_ori_params = payload;
          this.table_function20(payload);
    },
    async table_function20(ori_payload){
        var payload = ori_payload.params


        var table_column20 = [
            // {
            //     name: 'action',
            //     required: true,
            //     label: this.$language('D0028'),
            //     header_align: 'center',
            //     align: 'center',
            //     sortable: false,
            //     field: 'action',
            //     format_child: '',
            //     tooltip: '',
            //     headerStyle:'text-align: center; width: 1%;',
            //     filter_type: 'input',
            //     filter_options: [],
            //     filter_value: '',

            // },
            {
                name: 'trans_type',
                required: true,
                label: 'Type',
                align: 'left',
                sortable: true,
                field: 'trans_type',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'Posted',
                required: true,
                label: 'Posted',
                align: 'center',
                sortable: true,
                field: 'Posted',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'refno',
                required: true,
                label: 'Ref #',
                align: 'left',
                sortable: true,
                field: 'refno',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
             {
                name: 'Set_Disable',
                required: true,
                label: 'Disable',
                align: 'center',
                sortable: true,
                field: 'Set_Disable',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'CancelPromo',
                required: true,
                label: 'Cancel',
                align: 'center',
                sortable: true,
                field: 'CancelPromo',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'DateFrom',
                required: true,
                label: 'Date From',
                align: 'left',
                sortable: true,
                field: 'DateFrom',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'DateTo',
                required: true,
                label: 'Date To',
                align: 'left',
                sortable: true,
                field: 'DateTo',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
             {
                name: 'TimeFrom',
                required: true,
                label: 'Time From',
                align: 'left',
                sortable: true,
                field: 'TimeFrom',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'TimeTo',
                required: true,
                label: 'Time To',
                align: 'left',
                sortable: true,
                field: 'TimeTo',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'set_type',
                required: true,
                label: 'Type',
                align: 'left',
                sortable: true,
                field: 'set_type',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'CardType',
                required: true,
                label: 'CardType',
                align: 'left',
                sortable: true,
                field: 'CardType',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'sepecial',
                required: true,
                label: 'Special',
                align: 'left',
                sortable: true,
                field: 'sepecial',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'set_limit',
                required: true,
                label: 'Qty limit',
                align: 'left',
                sortable: true,
                field: 'set_limit',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'set_target_price',
                required: true,
                label: 'Target Price',
                align: 'right',
                sortable: true,
                field: 'set_target_price',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'Disc1Type',
                required: true,
                label: 'Disc1 Type',
                align: 'right',
                sortable: true,
                field: 'Disc1Type',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'disc1value',
                required: true,
                label: 'Disc1',
                align: 'right',
                sortable: true,
                field: 'disc1value',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'Disc2Type',
                required: true,
                label: 'Disc2 Type',
                align: 'right',
                sortable: true,
                field: 'Disc2Type',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'disc2value',
                required: true,
                label: 'Disc2',
                align: 'right',
                sortable: true,
                field: 'disc2value',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'price_net',
                required: true,
                label: 'NetPrice',
                align: 'right',
                sortable: true,
                field: 'price_net',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'bare_supplier',
                required: true,
                label: 'Sup.Bare',
                align: 'left',
                sortable: true,
                field: 'bare_supplier',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'bare_company',
                required: true,
                label: 'Cust.Bare',
                align: 'left',
                sortable: true,
                field: 'bare_company',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'Created_by',
                required: true,
                label: 'Created by',
                align: 'left',
                sortable: true,
                field: 'Created_by',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },

            {
                name: 'Set_Disable_at',
                required: true,
                label: 'Disable at',
                align: 'left',
                sortable: true,
                field: 'Set_Disable_at',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'Cancel_by',
                required: true,
                label: 'Disable by',
                align: 'left',
                sortable: true,
                field: 'Cancel_by',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'Posted_by',
                required: true,
                label: 'Posted by',
                align: 'left',
                sortable: true,
                field: 'Posted_by',
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
                name: 'itemcode',
                required: true,
                label: 'Itemcode',
                align: 'left',
                sortable: true,
                field: 'itemcode',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },



        ];

        if(this.page_function == 'create' || this.page_function == 'view')
          {
            // alert('barcode')
              table_column20 = table_column20.filter((entry)=>{
                  return entry.name != 'action'
              })
          }
        this.table_column20 = table_column20;

        if(this.page_function == 'create'){
              this.table_data20 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
            return;
          }

          if(payload.ordering == "" || !payload.ordering)
          {
              payload.ordering = "-Created_at"
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
            "pass_json": {
              "itemcode": this.Itemcode,
              "outlet_guid": this.session_outlet_guid,
              "language": this.language,
              "skip": 0,
              "limit": payload.limit,
              "sort_by": payload.sort_by,
              "sort_type": payload.sort_type,
              "trans_type_not_equal": [],
              "trans_type_or": ["MIX","MIXGR"],
            },
          };

          var object_pass = {
            "dispatch": 'itemmaster/trigger_post_get_promo_supplier_c',
            "getter": 'itemmaster/get_promo_supplier_c',
            "app": this,
            "payload": payload,
          };


        var dispatch_response_promo_mixmatch = await this.$dispatch(object_pass);

        var status = dispatch_response_promo_mixmatch.status

        if(status == "failed"){
          this.table_data20 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
        }else{
          var results = dispatch_response_promo_mixmatch.response.detail;


          // Filter results to include only 'MIX' and 'MIXGR'
          // var filteredResults = results.filter(item => item.trans_type === 'MIX' || item.trans_type === 'MIXGR');


          // else if(this.page_function == 'EditItemmaster'){
              this.table_data20 = {
              "data": {
                "count": results.length,
                "next": null,
                "previous": null,
                "results": results
                // "results": dispatch_response_promo_mixmatch.response
              }
            };
          // }


          // this.results = dispatch_response_promo_mixmatch.response.detail;
          this.results = dispatch_response_promo_mixmatch.response;


        }


    },
    handleTableChange21: function(newVal)
    {
          var new_params = this.$pluginsTableParams(newVal)

          var payload = {
              params : new_params
          };

          this.multibuy_ori_params = payload;
          this.table_function21(payload);
    },
     async table_function21(ori_payload){
        var payload = ori_payload.params

        var table_column21 = [
            // {
            //     name: 'action',
            //     required: true,
            //     label: this.$language('D0028'),
            //     header_align: 'center',
            //     align: 'center',
            //     sortable: false,
            //     field: 'action',
            //     format_child: '',
            //     tooltip: '',
            //     headerStyle:'text-align: center; width: 1%;',
            //     filter_type: 'input',
            //     filter_options: [],
            //     filter_value: '',
            // },
            {
                name: 'trans_type',
                required: true,
                label: 'Type',
                align: 'left',
                sortable: true,
                field: 'trans_type',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'Posted',
                required: true,
                label: 'Posted',
                align: 'center',
                sortable: true,
                field: 'Posted',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'refno',
                required: true,
                label: 'Ref #',
                align: 'left',
                sortable: true,
                field: 'refno',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
             {
                name: 'Set_Disable',
                required: true,
                label: 'Disable',
                align: 'center',
                sortable: true,
                field: 'Set_Disable',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'CancelPromo',
                required: true,
                label: 'Cancel',
                align: 'center',
                sortable: true,
                field: 'CancelPromo',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'DateFrom',
                required: true,
                label: 'Date From',
                align: 'left',
                sortable: true,
                field: 'DateFrom',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'DateTo',
                required: true,
                label: 'Date To',
                align: 'left',
                sortable: true,
                field: 'DateTo',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
             {
                name: 'TimeFrom',
                required: true,
                label: 'Time From',
                align: 'left',
                sortable: true,
                field: 'TimeFrom',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'TimeTo',
                required: true,
                label: 'Time To',
                align: 'left',
                sortable: true,
                field: 'TimeTo',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'set_type',
                required: true,
                label: 'Type',
                align: 'left',
                sortable: true,
                field: 'set_type',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'CardType',
                required: true,
                label: 'CardType',
                align: 'left',
                sortable: true,
                field: 'CardType',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'sepecial',
                required: true,
                label: 'Special',
                align: 'left',
                sortable: true,
                field: 'sepecial',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'set_limit',
                required: true,
                label: 'Qty limit',
                align: 'left',
                sortable: true,
                field: 'set_limit',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'set_target_price',
                required: true,
                label: 'Target Price',
                align: 'right',
                sortable: true,
                field: 'set_target_price',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'Disc1Type',
                required: true,
                label: 'Disc1 Type',
                align: 'right',
                sortable: true,
                field: 'Disc1Type',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'disc1value',
                required: true,
                label: 'Disc1',
                align: 'right',
                sortable: true,
                field: 'disc1value',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'Disc2Type',
                required: true,
                label: 'Disc2 Type',
                align: 'right',
                sortable: true,
                field: 'Disc2Type',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'disc2value',
                required: true,
                label: 'Disc2',
                align: 'right',
                sortable: true,
                field: 'disc2value',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'price_net',
                required: true,
                label: 'NetPrice',
                align: 'right',
                sortable: true,
                field: 'price_net',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'bare_supplier',
                required: true,
                label: 'Sup.Bare',
                align: 'left',
                sortable: true,
                field: 'bare_supplier',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'bare_company',
                required: true,
                label: 'Cust.Bare',
                align: 'left',
                sortable: true,
                field: 'bare_company',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'Created_by',
                required: true,
                label: 'Created by',
                align: 'left',
                sortable: true,
                field: 'Created_by',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },

            {
                name: 'Set_Disable_at',
                required: true,
                label: 'Disable at',
                align: 'left',
                sortable: true,
                field: 'Set_Disable_at',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'Cancel_by',
                required: true,
                label: 'Disable by',
                align: 'left',
                sortable: true,
                field: 'Cancel_by',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'Posted_by',
                required: true,
                label: 'Posted by',
                align: 'left',
                sortable: true,
                field: 'Posted_by',
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
                name: 'itemcode',
                required: true,
                label: 'Itemcode',
                align: 'left',
                sortable: true,
                field: 'itemcode',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },



        ];
        if(this.page_function == 'create' || this.page_function == 'view')
          {
            // alert('barcode')
              table_column21 = table_column21.filter((entry)=>{
                  return entry.name != 'action'
              })
          }

        this.table_column21 = table_column21;

        if(this.page_function == 'create'){
              this.table_data21 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
            return;
          }

          if(payload.ordering == "" || !payload.ordering)
          {
              payload.ordering = "-Created_at"
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
            "pass_json": {
              "itemcode": this.Itemcode,
              "outlet_guid": this.session_outlet_guid,
              "language": this.language,
              "skip": 0,
              "limit": payload.limit,
              "sort_by": payload.sort_by,
              "sort_type": payload.sort_type,
              "trans_type_not_equal": [],
              "trans_type_or": ["QTY","GREAT"],
            },
          };

          var object_pass = {
            "dispatch": 'itemmaster/trigger_post_get_promo_supplier_c',
            "getter": 'itemmaster/get_promo_supplier_c',
            "app": this,
            "payload": payload,
          };

        var dispatch_response_promo_multibuy = await this.$dispatch(object_pass);

        var status = dispatch_response_promo_multibuy.status

        if(status == "failed"){
          this.table_data21 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
        }else{
          var results = dispatch_response_promo_multibuy.response.detail;


          // Filter results to include only 'MIX' and 'MIXGR'
          // var filteredResults = results.filter(item => item.trans_type === 'QTY' || item.trans_type === 'GREAT');


          // else if(this.page_function == 'EditItemmaster'){
              this.table_data21 = {
              "data": {
                "count": results.length,
                "next": null,
                "previous": null,
                "results": results
                // "results": dispatch_response_promo_mixmatch.response
              }
            };
          // }


          // this.results = dispatch_response_promo_mixmatch.response.detail;
          this.results = dispatch_response_promo_multibuy.response;


        }


    },
    handleTableChange22: function(newVal)
    {
          var new_params = this.$pluginsTableParams(newVal)

          var payload = {
              params : new_params
          };

          this.promodiscount_ori_params = payload;
          this.table_function22(payload);
    },
    async table_function22(ori_payload){
        var payload = ori_payload.params


        var table_column22 = [
            // {
            //   name: 'action',
            //   required: true,
            //   label: this.$language('D0028'),
            //   header_align: 'center',
            //   align: 'center',
            //   sortable: false,
            //   field: 'action',
            //   format_child: '',
            //   tooltip: '',
            //   headerStyle:'text-align: center; width: 1%;',
            //   filter_type: 'input',
            //   filter_options: [],
            //   filter_value: '',
            // },
            {
                name: 'trans_type',
                required: true,
                label: 'Type',
                align: 'left',
                sortable: true,
                field: 'trans_type',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'Posted',
                required: true,
                label: 'Posted',
                align: 'center',
                sortable: true,
                field: 'Posted',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'refno',
                required: true,
                label: 'Ref #',
                align: 'left',
                sortable: true,
                field: 'refno',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
             {
                name: 'Set_Disable',
                required: true,
                label: 'Disable',
                align: 'center',
                sortable: true,
                field: 'Set_Disable',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'CancelPromo',
                required: true,
                label: 'Cancel',
                align: 'center',
                sortable: true,
                field: 'CancelPromo',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'DateFrom',
                required: true,
                label: 'Date From',
                align: 'left',
                sortable: true,
                field: 'DateFrom',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'DateTo',
                required: true,
                label: 'Date To',
                align: 'left',
                sortable: true,
                field: 'DateTo',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
             {
                name: 'TimeFrom',
                required: true,
                label: 'Time From',
                align: 'left',
                sortable: true,
                field: 'TimeFrom',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'TimeTo',
                required: true,
                label: 'Time To',
                align: 'left',
                sortable: true,
                field: 'TimeTo',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'set_type',
                required: true,
                label: 'Type',
                align: 'left',
                sortable: true,
                field: 'set_type',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'CardType',
                required: true,
                label: 'CardType',
                align: 'left',
                sortable: true,
                field: 'CardType',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'sepecial',
                required: true,
                label: 'Special',
                align: 'left',
                sortable: true,
                field: 'sepecial',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'set_limit',
                required: true,
                label: 'Qty limit',
                align: 'left',
                sortable: true,
                field: 'set_limit',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'set_target_price',
                required: true,
                label: 'Target Price',
                align: 'right',
                sortable: true,
                field: 'set_target_price',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'Disc1Type',
                required: true,
                label: 'Disc1 Type',
                align: 'right',
                sortable: true,
                field: 'Disc1Type',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'disc1value',
                required: true,
                label: 'Disc1',
                align: 'right',
                sortable: true,
                field: 'disc1value',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'Disc2Type',
                required: true,
                label: 'Disc2 Type',
                align: 'right',
                sortable: true,
                field: 'Disc2Type',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'disc2value',
                required: true,
                label: 'Disc2',
                align: 'right',
                sortable: true,
                field: 'disc2value',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'price_net',
                required: true,
                label: 'NetPrice',
                align: 'right',
                sortable: true,
                field: 'price_net',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'bare_supplier',
                required: true,
                label: 'Sup.Bare',
                align: 'left',
                sortable: true,
                field: 'bare_supplier',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'bare_company',
                required: true,
                label: 'Cust.Bare',
                align: 'left',
                sortable: true,
                field: 'bare_company',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'Created_by',
                required: true,
                label: 'Created by',
                align: 'left',
                sortable: true,
                field: 'Created_by',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },

            {
                name: 'Set_Disable_at',
                required: true,
                label: 'Disable at',
                align: 'left',
                sortable: true,
                field: 'Set_Disable_at',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'Cancel_by',
                required: true,
                label: 'Disable by',
                align: 'left',
                sortable: true,
                field: 'Cancel_by',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'Posted_by',
                required: true,
                label: 'Posted by',
                align: 'left',
                sortable: true,
                field: 'Posted_by',
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
                name: 'itemcode',
                required: true,
                label: 'Itemcode',
                align: 'left',
                sortable: true,
                field: 'itemcode',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },



        ];


        if(this.page_function == 'create' || this.page_function == 'view')
          {
            // alert('barcode')
              table_column22 = table_column22.filter((entry)=>{
                  return entry.name != 'action'
              })
          }
        this.table_column22 = table_column22;
        if(this.page_function == 'create'){
              this.table_data22 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
            return;
          }

        if(payload.ordering == "" || !payload.ordering)
        {
            payload.ordering = "-Created_at"
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
          "pass_json": {
            "itemcode": this.Itemcode,
            "outlet_guid": this.session_outlet_guid,
            "language": this.language,
            "skip": 0,
            "limit": payload.limit,
            "sort_by": payload.sort_by,
            "sort_type": payload.sort_type,
            "trans_type_not_equal": ["MIX","MIXGR","QTY","GREAT"],
            "trans_type_or": [],
          },
        };

        var object_pass = {
          "dispatch": 'itemmaster/trigger_post_get_promo_supplier_c',
          "getter": 'itemmaster/get_promo_supplier_c',
          "app": this,
          "payload": payload,
        };


        var dispatch_response_promo_discount = await this.$dispatch(object_pass);

        var status = dispatch_response_promo_discount.status

        if(status == "failed"){
          this.table_data22 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
        }else{
          var results = dispatch_response_promo_discount.response.detail;


          // Filter results to include only 'MIX' and 'MIXGR'
          var filteredResults = results.filter(item =>
            item.trans_type !== 'MIXGR' &&
            item.trans_type !== 'MIX' &&
            item.trans_type !== 'QTY' &&
            item.trans_type !== 'GREAT'
          );


          // else if(this.page_function == 'EditItemmaster'){
              this.table_data22 = {
              "data": {
                "count": filteredResults.length,
                "next": null,
                "previous": null,
                "results": filteredResults
                // "results": dispatch_response_promo_mixmatch.response
              }
            };
          // }


          // this.results = dispatch_response_promo_mixmatch.response.detail;
          this.results = dispatch_response_promo_discount.response;


        }

    },
    handleTableChange23: function(newVal)
    {
          var new_params = this.$pluginsTableParams(newVal)

          var payload = {
              params : new_params
          };

          this.qoh_ori_params = payload;
          this.table_function23(payload);
    },
    async table_function23(ori_payload){
        var payload = ori_payload.params


        // payload.PeriodCode =""; //filter current period

        var table_column23 = [
          {
                name: 'Itemcode',
                required: true,
                label: 'ItemCode',
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
                name: 'packsize',
                required: true,
                label: 'P/Size',
                align: 'left',
                sortable: true,
                field: 'packsize',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'OnHandQty',
                required: true,
                label: 'QoH',
                align: 'left',
                sortable: true,
                field: 'OnHandQty',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'TotalOnHandQty',
                required: true,
                label: 'Total QoH',
                align: 'left',
                sortable: true,
                field: 'TotalOnHandQty',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

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
                headerStyle: 'text-align: center;'

            },
        ];


        if(this.page_function == 'create' || this.page_function == 'view')
          {
            // alert('barcode')
              table_column23 = table_column23.filter((entry)=>{
                  return entry.name != 'action'
              })
          }
        this.table_column23 = table_column23;

        if(this.page_function == 'create'){
              this.table_data23 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
            return;
          }

        var payload = {
          "pass_json": {
            "Itemcode": this.Itemcode,
            "outlet_guid": this.session_outlet_guid,
            "language": this.language,
            "skip": 0,
            "limit": payload.limit,
            "sort_by": "CREATED_AT",
            "sort_type": "Asc",
          },
        };

        var object_pass = {
          "dispatch": 'itemmaster/trigger_post_get_locationstock_period',
          "getter": 'itemmaster/get_locationstock_period',
          "app": this,
          "payload": payload,
        };


        var dispatch_response_get_qohsite = await this.$dispatch(object_pass);

        var status = dispatch_response_get_qohsite.status

        if(status == "failed"){
          this.table_data23 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
        }else{
          var results = dispatch_response_get_qohsite.response.detail;



          // else if(this.page_function == 'EditItemmaster'){
              this.table_data23 = {
              "data": {
                "count": dispatch_response_get_qohsite.response.total_row,
                "next": null,
                "previous": null,
                "results": dispatch_response_get_qohsite.response.detail
                // "results": dispatch_response_get_qohsite.response
              }
            };
          // }


          // this.results = dispatch_response_get_qohsite.response.detail;
          this.results = dispatch_response_get_qohsite.response;


        }

    },
    handleTableChange24: function(newVal)
    {



          var new_params = this.$pluginsTableParams(newVal)

          var payload = {
              params : new_params
          };

          this.assortment_ori_params = payload;

          if(this.tab != 'Information' || this.active_section != 'Assortment')
          {
            return;
          }
          this.table_function24(payload);
    },
    async table_function24(ori_payload){
        var payload = ori_payload.params


        var table_column24 = [
            {
                name: 'itemcode',
                required: true,
                label: 'Itemcode',
                align: 'left',
                sortable: true,
                field: 'itemcode',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'set_assorted_item__assorted_desc',
                required: true,
                label: 'Assorted Item Description C',
                align: 'left',
                sortable: true,
                field: 'set_assorted_item__assorted_desc',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'description',
                required: true,
                label: 'Description',
                align: 'left',
                sortable: true,
                field: 'description',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'remark',
                required: true,
                label: 'Remarks',
                align: 'left',
                sortable: true,
                field: 'remark',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'updated_at',
                required: true,
                label: 'Updated At',
                align: 'left',
                sortable: true,
                field: 'updated_at',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'updated_by',
                required: true,
                label: 'Updated By',
                align: 'left',
                sortable: true,
                field: 'updated_by',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'created_at',
                required: true,
                label: 'Create At',
                align: 'left',
                sortable: true,
                field: 'created_at',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'created_by',
                required: true,
                label: 'Created By',
                align: 'left',
                sortable: true,
                field: 'created_by',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            


        ];


        if(this.page_function == 'create' || this.page_function == 'view')
          {
            // alert('barcode')
              table_column24 = table_column24.filter((entry)=>{
                  return entry.name != 'action'
              })
          }
        this.table_column24 = table_column24;
        if(this.page_function == 'create'){
              this.table_data24 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
            return;
          }

        var payload = {
          "pass_json": {
            "itemcode": this.Itemcode,
            "outlet_guid": this.session_outlet_guid,
            "language": this.language,
            "skip": 0,
            "limit": payload.limit,
            "sort_by": "created_at",
            "sort_type": "Asc",
          },
        };

        var object_pass = {
          "dispatch": 'itemmaster/trigger_post_get_set_assorted_item_c',
          "getter": 'itemmaster/get_set_assorted_item_c',
          "app": this,
          "payload": payload,
        };


        var dispatch_response_assorted = await this.$dispatch(object_pass);

        var status = dispatch_response_assorted.status

        if(status == "failed"){
          this.table_data24 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
        }else{
          var results = dispatch_response_assorted.response.detail;



          // else if(this.page_function == 'EditItemmaster'){
              this.table_data24 = {
              "data": {
                "count": dispatch_response_assorted.response.total_row,
                "next": null,
                "previous": null,
                "results": dispatch_response_assorted.response.detail
                // "results": dispatch_response_get_qohsite.response
              }
            };
          // }


          // this.results = dispatch_response_get_qohsite.response.detail;
          this.results = dispatch_response_assorted.response;


        }

    },
    async handleAddAssortment()
  {
    if(this.json.BillStatus == 1)
    {
        this.showNotify("negative","This Doc already posted.");
        return;
    }

    var validate = await this.validate_form("save_edit_pochild_form");

    if(!validate)
    {
        this.showNotify("negative","Please make sure all field is correct.");
        this.showAddLoading = false;
        return;
    }

    this.showAddLoading = true;
    this.assortment.loading = true;
    var assorted_desc = this.ajson.assorted_desc;
    var set_assorted_item__assorted_desc = this.ajson.set_assorted_item__assorted_desc;
    var description = this.ajson.description;
    var remark = this.ajson.remark;
    // var outlet_guid = this.session_outlet_guid;

    var payload = {
        pass_json: {
          updated_by: this.session_user_guid,
          itemcode: this.Itemcode,
          set_assorted_item__assorted_desc: set_assorted_item__assorted_desc,
          assorted_desc: assorted_desc,
          language: this.language,
          description: description,
          remark: remark,
          outlet_guid: this.session_outlet_guid
        }
    }

      var object_pass = {};

      if(!this.edit_assortment)
      {
        payload.pass_json.created_by = this.session_user_guid;
        // payload.pass_json.assorted_guid = this.ajson.assorted_guid;
        // payload.pass_json.item_guid = this.ajson.item_guid;
        object_pass = {
            "dispatch": 'itemmaster/trigger_post_create_set_assorted_item',  // endpoint hardcoded
            "getter": 'itemmaster/get_set_assorted_item',             // getter hardcoded
            "app": this,
            "payload": payload,
        };
      }
      else if(this.edit_assortment)
      {
        payload.pass_json.assorted_guid = this.ajson.assorted_guid;
        payload.pass_json.item_guid = this.ajson.item_guid;

        object_pass = {
          "dispatch": 'itemmaster/trigger_post_update_set_assorted_item_c',  // endpoint hardcoded
          "getter": 'itemmaster/get_set_assorted_item_c',             // getter hardcoded
          "app": this,
          "payload": payload,
        };
      }

      var dispatch_response = await this.$dispatch(object_pass);

      if (dispatch_response.status) {
          // success condition
          var success_message = !this.edit_assortment == 'create' ? 'Assorted Created Successfully.' : 'Assorted Edited Successfully.';
          this.showNotify("positive", success_message);
          this.table_function24(this.ori_params);
          this.showAddLoading = false;
          this.assortment.loading = false;
          this.edit_assortment = null;
          this.show_assortment_dialog = false;
          this.ajson = {
            set_assorted_item__assorted_desc: '',
            description: '',
            remark: '',
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
        this.branch.loading = false;
      }
    },

    async handleReceiveHandleEditAssortment(row)
    {
      this.show_assortment_dialog = true;
      this.edit_assortment = true;
      this.assortment.loading = true;
      this.edit_child = true;

      var result = JSON.parse(JSON.stringify(row.row));
      this.assortment.loading = false;
      this.ajson = result;
      },
      addButtonAssorted(){
      this.show_assortment_dialog = true;
      this.edit_assortment = false;
      },

    handleTableChange25: function(newVal)
    {
          var new_params = this.$pluginsTableParams(newVal)

          var payload = {
              params : new_params
          };

          this.ibtsales_ori_params = payload;
          this.table_function25(payload);
    },
    async table_function25(ori_payload){
        var payload = ori_payload.params

        var table_column25 = [
            // {
            //     name: 'action',
            //     required: true,
            //     label: this.$language('D0028'),
            //     header_align: 'center',
            //     align: 'center',
            //     sortable: false,
            //     field: 'action',
            //     format_child: '',
            //     tooltip: '',
            //     headerStyle:'text-align: center; width: 1%;',
            //     filter_type: 'input',
            //     filter_options: [],
            //     filter_value: '',
            // },
            {
                name: 'Mth',
                required: true,
                label: 'Mth',
                align: 'left',
                sortable: true,
                field: 'Mth',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
             {
                name: 'posted',
                required: true,
                label: 'Posted',
                align: 'center',
                sortable: true,
                field: 'posted',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'InvoiceDate',
                required: true,
                label: 'Inv.Date',
                align: 'left',
                sortable: true,
                field: 'InvoiceDate',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'DeliverDate',
                required: true,
                label: 'Del.Date',
                align: 'left',
                sortable: true,
                field: 'DeliverDate',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

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
                headerStyle: 'text-align: center'

            },
            {
                name: 'SubDept',
                required: true,
                label: 'Dept',
                align: 'left',
                sortable: true,
                field: 'SubDept',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

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
                headerStyle: 'text-align: center;'

            },
            {
                name: 'DiscAmt',
                required: true,
                label: 'Disc',
                align: 'right',
                sortable: true,
                field: 'DiscAmt',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

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
                headerStyle: 'text-align: center;'

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
                name: 'Disc1Type',
                required: true,
                label: 'Discount1Type',
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
                label: 'Disc2',
                align: 'right',
                sortable: true,
                field: 'Disc2Value',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'Disc2Type',
                required: true,
                label: 'Discount2 Type',
                align: 'right',
                sortable: true,
                field: 'Disc2Type',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },

            {
                name: 'postby',
                required: true,
                label: 'Post By',
                align: 'left',
                sortable: true,
                field: 'postby',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'postdatetime',
                required: true,
                label: 'Post Date Time',
                align: 'left',
                sortable: true,
                field: 'postdatetime',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'RefNo',
                required: true,
                label: 'Ref #',
                align: 'left',
                sortable: true,
                field: 'RefNo',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },

        ];


        if(this.page_function == 'create' || this.page_function == 'view')
          {
            // alert('barcode')
              table_column25 = table_column25.filter((entry)=>{
                  return entry.name != 'action'
              })
          }
        this.table_column25 = table_column25;

        if(this.page_function == 'create'){
              this.table_data25 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
            return;
          }

          if(payload.ordering == "" || !payload.ordering)
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
              payload.sort_type = "asc"
          }

        var payload = {
          "pass_json": {
            "Itemcode": this.Itemcode,
            "outlet_guid": this.session_outlet_guid,
            "language": this.language,
            "skip": 0,
            "limit": payload.limit,
            "sort_by": payload.sort_by,
            "sort_type": payload.sort_type,
            "ibt_or": [1]
          },
        };

        var object_pass = {
          "dispatch": 'itemmaster/trigger_post_get_get_sichild',
          "getter": 'itemmaster/get_sichild',
          "app": this,
          "payload": payload,
        };

        var dispatch_response_get_itemmaster_IBTSales = await this.$dispatch(object_pass);
        var status = dispatch_response_get_itemmaster_IBTSales.status

        if(status == "failed"){
          this.table_data17 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
        }else{
          var results = dispatch_response_get_itemmaster_IBTSales.response.detail;


          // else if(this.page_function == 'EditItemmaster'){
              this.table_data25 = {
              "data": {
                "count": dispatch_response_get_itemmaster_IBTSales.response.total_row,
                "next": null,
                "previous": null,
                "results": dispatch_response_get_itemmaster_IBTSales.response.detail
                // "results": dispatch_response_get_itemmaster_IBTSales.response
              }
            };
          // }


          // this.results = dispatch_response_get_itemmaster_IBTSales.response.detail;
          this.results = dispatch_response_get_itemmaster_IBTSales.response;


        }


    },
    handleTableChange26: function(newVal)
    {
          var new_params = this.$pluginsTableParams(newVal)

          var payload = {
              params : new_params
          };

          this.po_ori_params = payload;
          this.table_function26(payload);
    },
    async table_function26(ori_payload){
        var payload = ori_payload.params

        var table_column26 = [
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
                label: 'G. Seq',
                align: 'left',
                sortable: true,
                field: 'GroupNo',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

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
                headerStyle: 'text-align: center;'
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
                name: 'Barcode',
                required: true,
                label: 'BarCode',
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
                headerStyle: 'text-align: center;'
            },
            {
                name: 'Qty',
                required: true,
                label: 'Ord',
                align: 'left',
                sortable: true,
                field: 'Qty',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
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
                headerStyle: 'text-align: center;'
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
                headerStyle: 'text-align: center;'
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
                headerStyle: 'text-align: center;'
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
                headerStyle: 'text-align: center;'
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
                name: 'Disc1Type',
                required: true,
                label: 'Disc1 Type',
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
                label: 'Disc2',
                align: 'right',
                sortable: true,
                field: 'Disc2Value',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            {
                name: 'Disc2Type',
                required: true,
                label: 'Disc2 Type',
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
                headerStyle: 'text-align: center;'
            },
            {
                name: 'price_future',
                required: true,
                label: 'FuturePrice',
                align: 'right',
                sortable: true,
                field: 'price_future',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            {
                name: 'TaxIntNo',
                required: true,
                label: 'SST',
                align: 'left',
                sortable: true,
                field: 'TaxIntNo',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            {
                name: 'TaxValue',
                required: true,
                label: 'SST Value',
                align: 'right',
                sortable: true,
                field: 'TaxValue',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            {
                name: 'TaxAmount',
                required: true,
                label: 'SST Amount',
                align: 'right',
                sortable: true,
                field: 'TaxAmount',
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
                headerStyle: 'text-align: center;'
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
                name: 'gst_tax_amount',
                required: true,
                label: 'GST',
                align: 'right',
                sortable: true,
                field: 'gst_tax_amount',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
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
                headerStyle: 'text-align: center;'
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
                headerStyle: 'text-align: center;'
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
                headerStyle: 'text-align: center;'
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
                headerStyle: 'text-align: center;'
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
                headerStyle: 'text-align: center;'
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
                name: 'SysQOH',
                required: true,
                label: 'SysQOH',
                align: 'left',
                sortable: true,
                field: 'SysQOH',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
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
                headerStyle: 'text-align: center;'
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
                label: 'ManualCost',
                align: 'right',
                sortable: true,
                field: 'cost_manual',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            {
                name: 'cost_manual_value',
                required: true,
                label: 'ManualCostValue',
                align: 'right',
                sortable: true,
                field: 'cost_manual_value',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },

        ];

        if(this.page_function == 'create' || this.page_function == 'view')
          {
            // alert('barcode')
              table_column26 = table_column26.filter((entry)=>{
                  return entry.name != 'action'
              })
          }
        this.table_column26 = table_column26;

         if(this.page_function == 'create'){
              this.table_data26 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
            return;
          }

        var payload = {
          "pass_json": {
            "Itemcode": this.Itemcode,
            "outlet_guid": this.session_outlet_guid,
            "language": this.language,
            "skip": 0,
            "limit": payload.limit,
            "sort_by": "Line",
            "sort_type": "ASC",
          },
        };

        var object_pass = {
          "dispatch": 'itemmaster/trigger_post_read_pochild',
          "getter": 'itemmaster/get_read_po',
          "app": this,
          "payload": payload,
        };


        var dispatch_response_po = await this.$dispatch(object_pass);

        var status = dispatch_response_po.status

        if(status == "failed"){
          this.table_data26 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
        }else{
          var results = dispatch_response_po.response.detail;


          // else if(this.page_function == 'EditItemmaster'){
              this.table_data26 = {
              "data": {
                "count": dispatch_response_po.response.total_row,
                "next": null,
                "previous": null,
                "results": dispatch_response_po.response.detail
              }
            };
          // }


          this.results = dispatch_response_po.response.detail;


        }


    },
    handleTableChange27: function(newVal)
    {


          var new_params = this.$pluginsTableParams(newVal)

          var payload = {
              params : new_params
          };
          this.attribute_ori_params = payload;

          if(this.tab != 'Information' || this.active_section != 'Attribute')
          {
            return;
          }

          this.table_function27(payload);
    },
    async table_function27(ori_payload){
        var payload = ori_payload.params

        var table_column27 = [
            {
                name: 'action',
                required: true,
                label: this.$language('D0028'),
                header_align: 'center',
                align: 'center',
                sortable: false,
                field: 'action',
                format_child: '',
                tooltip: '',
                headerStyle:'text-align: center; width: 1%;',
                filter_type: 'input',
                filter_options: [],
                filter_value: '',
            },
            {
                name: 'Product_Size',
                required: true,
                label: 'Product Size',
                align: 'right',
                sortable: true,
                field: 'Product_Size',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            {
                name: 'Product_UOM',
                required: true,
                label: 'Product UOM',
                align: 'left',
                sortable: true,
                field: 'Product_UOM',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            {
                name: 'Serve_Size',
                required: true,
                label: 'Serve Size',
                align: 'right',
                sortable: true,
                field: 'Serve_Size',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            {
                name: 'Serve_Size_UOM',
                required: true,
                label: 'Serve Size Uom',
                align: 'left',
                sortable: true,
                field: 'Serve_Size_UOM',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            {
                name: 'Per_Serving',
                required: true,
                label: 'Per Serving',
                align: 'right',
                sortable: true,
                field: 'Per_Serving',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            {
                name: 'Denominator',
                required: true,
                label: 'Denominator',
                align: 'right',
                sortable: true,
                field: 'Denominator',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            {
                name: 'Avg_Weight',
                required: true,
                label: 'Average Weight',
                align: 'right',
                sortable: true,
                field: 'Avg_Weight',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            {
                name: 'Avg_Weight_UOM',
                required: true,
                label: 'Average Weight UOM',
                align: 'left',
                sortable: true,
                field: 'Avg_Weight_UOM',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            {
                name: 'Avg_Weight_Denominator',
                required: true,
                label: 'Weight Denominator',
                align: 'right',
                sortable: true,
                field: 'Avg_Weight_Denominator',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            {
                name: 'Avg_Weight_Price',
                required: true,
                label: 'Average Price',
                align: 'right',
                sortable: true,
                field: 'Avg_Weight_Price',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            {
                name: 'Organic_Certified',
                required: true,
                label: 'Organic Certified',
                align: 'center',
                sortable: true,
                field: 'Organic_Certified',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            {
                name: 'Non_GMO',
                required: true,
                label: 'Non-GMO',
                align: 'center',
                sortable: true,
                field: 'Non_GMO',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            {
                name: 'No_Colouring',
                required: true,
                label: 'No-Artificial Flavor & Coloring',
                align: 'center',
                sortable: true,
                field: 'No_Colouring',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            {
                name: 'Gluten_Free',
                required: true,
                label: 'GlutenFree',
                align: 'center',
                sortable: true,
                field: 'Gluten_Free',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            {
                name: 'Plant_Based',
                required: true,
                label: 'Plant Based',
                align: 'center',
                sortable: true,
                field: 'Plant_Based',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            {
                name: 'Pesticide_Free',
                required: true,
                label: 'Pesticide Free',
                align: 'center',
                sortable: true,
                field: 'Pesticide_Free',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            {
                name: 'Direct_from_Farm',
                required: true,
                label: 'Direct From Farm',
                align: 'center',
                sortable: true,
                field: 'Direct_from_Farm',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            {
                name: 'Free_Range',
                required: true,
                label: 'Free Range',
                align: 'center',
                sortable: true,
                field: 'Free_Range',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            {
                name: 'Lactose_Free',
                required: true,
                label: 'Lactose Free',
                align: 'center',
                sortable: true,
                field: 'Lactose_Free',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            {
                name: 'Keto_Friendly',
                required: true,
                label: 'Keto Friendly',
                align: 'center',
                sortable: true,
                field: 'Keto_Friendly',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            {
                name: 'Vegan',
                required: true,
                label: 'Vegan',
                align: 'center',
                sortable: true,
                field: 'Vegan',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            {
                name: 'Festive',
                required: true,
                label: 'Festive',
                align: 'center',
                sortable: true,
                field: 'Festive',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            {
                name: 'Non_Halal',
                required: true,
                label: 'Non-Halal',
                align: 'center',
                sortable: true,
                field: 'Non_Halal',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            {
                name: 'EStore_Tag',
                required: true,
                label: 'Estore Item',
                align: 'center',
                sortable: true,
                field: 'EStore_Tag',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            {
                name: 'EStore_Available',
                required: true,
                label: 'EStore Always Available',
                align: 'center',
                sortable: true,
                field: 'EStore_Available',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            {
                name: 'EStore_Qty',
                required: true,
                label: 'EStore Available Qty',
                align: 'right',
                sortable: true,
                field: 'EStore_Qty',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            {
                name: 'remarks',
                required: true,
                label: 'Remarks',
                align: 'left',
                sortable: true,
                field: 'remarks',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            {
                name: 'updated_at',
                required: true,
                label: 'Updated At',
                align: 'left',
                sortable: true,
                field: 'updated_at',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            {
                name: 'updated_by',
                required: true,
                label: 'Updated By',
                align: 'left',
                sortable: true,
                field: 'updated_by',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            {
                name: 'created_at',
                required: true,
                label: 'Created At',
                align: 'left',
                sortable: true,
                field: 'created_at',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            {
                name: 'created_by',
                required: true,
                label: 'Created By',
                align: 'left',
                sortable: true,
                field: 'created_by',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            

        ];

        if(this.page_function == 'create' || this.page_function == 'view')
          {
            // alert('barcode')
              table_column27 = table_column27.filter((entry)=>{
                  return entry.name != 'action'
              })
          }
        this.table_column27 = table_column27;

        if(this.page_function == 'create'){
            this.table_data27 = {
            "data": {
              "count": 0,
              "next": null,
              "previous": null,
              "results": []
            }
          };
          return;
        }

       var n_payload = {
          "pass_json": {
            "itemcode": this.Itemcode,
            "outlet_guid": this.session_outlet_guid,
            "language": this.language,
            "skip": 0,
            "limit": payload.limit,
            "sort_by": "created_at",
            "sort_type": "ASC",
          },
        };

        var object_pass = {
          "dispatch": 'itemmaster/trigger_post_get_itemmaster_othersinfo',
          "getter": 'itemmaster/get_itemmaster_othersinfo',
          "app": this,
          "payload": n_payload,
        };


        var dispatch_response_ItemAttributes = await this.$dispatch(object_pass);

        var status = dispatch_response_ItemAttributes.status

        if(status == "failed"){
          this.table_data27 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
        }else{
          var results = dispatch_response_ItemAttributes.response.detail;




          // else if(this.page_function == 'EditItemmaster'){
              this.table_data27 = {
              "data": {
                "count": dispatch_response_ItemAttributes.response.total_row,
                "next": null,
                "previous": null,
                "results": dispatch_response_ItemAttributes.response.detail
              }
            };
          // }


          this.results = dispatch_response_ItemAttributes.response.detail;


        }


    },
    handleTableChange28: function(newVal)
    {


          var new_params = this.$pluginsTableParams(newVal)

          var payload = {
              params : new_params
          };

          this.parentchild_ori_params = payload;

          if(this.tab != 'Information' || this.active_section != 'Parent & Child')
          {
            return;
          }

          this.table_function28(payload);
    },
    async table_function28(ori_payload){
        var payload = ori_payload.params

        var table_column28 = [
            {
                name: 'ItemLink',
                required: true,
                label: 'Item Link',
                align: 'left',
                sortable: true,
                field: 'ItemLink',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
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
                name: 'DesShort',
                required: true,
                label: 'Description 2',
                align: 'left',
                sortable: true,
                field: 'DesShort',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
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
                label: 'ArticleNo',
                align: 'left',
                sortable: true,
                field: 'ArticleNo',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            {
                name: 'PackSize',
                required: true,
                label: 'PackSize',
                align: 'left',
                sortable: true,
                field: 'PackSize',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            {
                name: 'BulkQty',
                required: true,
                label: 'Case',
                align: 'left',
                sortable: true,
                field: 'Case',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            {
                name: 'UMBulk',
                required: true,
                label: 'Qty',
                align: 'left',
                sortable: true,
                field: 'UMBulk',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            {
                name: 'Disable',
                required: true,
                label: 'Status',
                align: 'left',
                sortable: true,
                field: 'Disable',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            {
                name: 'price_type',
                required: true,
                label: 'Price Type',
                align: 'left',
                sortable: true,
                field: 'price_type',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            {
                name: 'stock_type',
                required: true,
                label: 'Stock Type',
                align: 'left',
                sortable: true,
                field: 'stock_type',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            {
                name: 'basic_link',
                required: true,
                label: 'Stock Link',
                align: 'left',
                sortable: true,
                field: 'basic_link',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            {
                name: 'Consign',
                required: true,
                label: 'Inventory',
                align: 'left',
                sortable: true,
                field: 'Consign',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            {
                name: 'inv_type',
                required: true,
                label: 'Inventory Type',
                align: 'left',
                sortable: true,
                field: 'inv_type',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            {
                name: 'ItemType',
                required: true,
                label: 'ItemType',
                align: 'left',
                sortable: true,
                field: 'ItemType',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            {
                name: 'SoldByWeight',
                required: true,
                label: 'Catch Weight',
                align: 'center',
                sortable: true,
                field: 'SoldByWeight',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            {
                name: 'BarcodeType',
                required: true,
                label: 'Weight Type',
                align: 'left',
                sortable: true,
                field: 'BarcodeType',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },

        ];

        if(this.page_function == 'create' || this.page_function == 'view')
          {
            // alert('barcode')
              table_column28 = table_column28.filter((entry)=>{
                  return entry.name != 'action'
              })
          }
        this.table_column28 = table_column28;

          if(this.page_function == 'create'){
              this.table_data28 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
            return;
          }

        var payload = {
          "pass_json": {
            "Itemcode": this.Itemcode,
            // "ItemLink": this.Itemcode,
            "outlet_guid": this.session_outlet_guid,
            "language": this.language,
            "skip": 0,
            "limit": payload.limit,
            "sort_by": "IssueStamp",
            "sort_type": "Asc",
          },
        };

        var object_pass = {
          "dispatch": 'itemmaster/trigger_post_read_item_all',
          "getter": 'itemmaster/get_read_item_all',
          "app": this,
          "payload": payload,
        };


        var dispatch_response_parent = await this.$dispatch(object_pass);

        var status = dispatch_response_parent.status

        if(status == "failed"){
          this.table_data27 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
        }else{
          var results = dispatch_response_parent.response.detail;


          // else if(this.page_function == 'EditItemmaster'){
              this.table_data28 = {
              "data": {
                "count": dispatch_response_parent.response.total_row,
                "next": null,
                "previous": null,
                "results": dispatch_response_parent.response.detail
              }
            };
          // }


          this.results = dispatch_response_parent.response.detail;


        }


    },
    handleTableChange29: function(newVal)
    {
          var new_params = this.$pluginsTableParams(newVal)

          var payload = {
              params : new_params
          };

          this.movementSite_ori_params = payload;
          this.table_function29(payload);
    },
    async table_function29(ori_payload){
        var payload = ori_payload.params


        // payload.PeriodCode =""; //filter current period

        var table_column29 = [
          {
                name: 'location_group',
                required: true,
                label: 'Location',
                align: 'left',
                sortable: true,
                field: 'location_group',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'packsize',
                required: true,
                label: 'P/Size',
                align: 'left',
                sortable: true,
                field: 'packsize',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'OnHandQty',
                required: true,
                label: 'QoH',
                align: 'left',
                sortable: true,
                field: 'OnHandQty',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'TotalOnHandQty',
                required: true,
                label: 'Total QoH',
                align: 'left',
                sortable: true,
                field: 'TotalOnHandQty',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
        ];


        if(this.page_function == 'create' || this.page_function == 'view')
          {
            // alert('barcode')
              table_column29 = table_column29.filter((entry)=>{
                  return entry.name != 'action'
              })
          }
        this.table_column29 = table_column29;

        if(this.page_function == 'create'){
              this.table_data29 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
            return;
          }

        var payload = {
          "pass_json": {
            "Itemcode": this.Itemcode,
            "outlet_guid": this.session_outlet_guid,
            "language": this.language,
            "skip": 0,
          },
        };

        var object_pass = {
          "dispatch": 'itemmaster/trigger_post_get_locationstock_groupby_location_group',
          "getter": 'itemmaster/get_locationstock_groupby_location_group',
          "app": this,
          "payload": payload,
        };


        var dispatch_response_get_movementSite = await this.$dispatch(object_pass);

        var status = dispatch_response_get_movementSite.status

        if(status == "failed"){
          this.table_data29 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
        }else{
          var results = dispatch_response_get_movementSite.response.detail;



          // else if(this.page_function == 'EditItemmaster'){
              this.table_data29 = {
              "data": {
                "count": dispatch_response_get_movementSite.response.total_row,
                "next": null,
                "previous": null,
                "results": dispatch_response_get_movementSite.response.detail
                // "results": dispatch_response_get_movementSite.response
              }
            };
          // }


          // this.results = dispatch_response_get_movementSite.response.detail;
          this.results = dispatch_response_get_movementSite.response;


        }

    },
    handleTableChange30: function(newVal)
    {
          var new_params = this.$pluginsTableParams(newVal)

          var payload = {
              params : new_params
          };

          this.movementLocation_ori_params = payload;
          this.table_function30(payload);
    },
    async table_function30(ori_payload){
        var payload = ori_payload.params


        // payload.PeriodCode =""; //filter current period

        var table_column30 = [
          {
                name: 'Location',
                required: true,
                label: 'Location',
                align: 'left',
                sortable: true,
                field: 'Location',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            // {
            //     name: 'Itemcode',
            //     required: true,
            //     label: 'ItemCode',
            //     align: 'left',
            //     sortable: true,
            //     field: 'Itemcode',
            //     format_child: '',
            //     tooltip: '',
            //     headerStyle: 'text-align: center;'

            // },
            // {
            //     name: 'Description',
            //     required: true,
            //     label: 'Description',
            //     align: 'left',
            //     sortable: true,
            //     field: 'Description',
            //     format_child: '',
            //     tooltip: '',
            //     headerStyle: 'text-align: center;'

            // },
            {
                name: 'packsize',
                required: true,
                label: 'P/Size',
                align: 'left',
                sortable: true,
                field: 'packsize',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'OnHandQty',
                required: true,
                label: 'QoH',
                align: 'left',
                sortable: true,
                field: 'OnHandQty',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'TotalOnHandQty',
                required: true,
                label: 'Total QoH',
                align: 'left',
                sortable: true,
                field: 'TotalOnHandQty',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
        ];


        if(this.page_function == 'create' || this.page_function == 'view')
          {
            // alert('barcode')
              table_column30 = table_column30.filter((entry)=>{
                  return entry.name != 'action'
              })
          }
        this.table_column30 = table_column30;

        if(this.page_function == 'create'){
              this.table_data30 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
            return;
          }

        var payload = {
          "pass_json": {
            "Itemcode": this.Itemcode,
            "outlet_guid": this.session_outlet_guid,
            "language": this.language,
            "skip": 0,
          },
        };

        var object_pass = {
          "dispatch": 'itemmaster/trigger_post_get_locationstock_groupby_location',
          "getter": 'itemmaster/get_locationstock_groupby_location',
          "app": this,
          "payload": payload,
        };

        var dispatch_response_get_movementLocation = await this.$dispatch(object_pass);

        var status = dispatch_response_get_movementLocation.status

        if(status == "failed"){
          this.table_data30 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
        }else{
          var results = dispatch_response_get_movementLocation.response.detail;



          // else if(this.page_function == 'EditItemmaster'){
              this.table_data30 = {
              "data": {
                "count": dispatch_response_get_movementLocation.response.total_row,
                "next": null,
                "previous": null,
                "results": dispatch_response_get_movementLocation.response.detail
                // "results": dispatch_response_get_movementLocation.response
              }
            };
          // }


          // this.results = dispatch_response_get_movementLocation.response.detail;
          this.results = dispatch_response_get_movementLocation.response;


        }

    },

    async handleAddAttribute()
    {
      var validate = await this.validate_form("save_edit_pochild_form");

      if(!validate)
      {
          this.showNotify("negative","Please make sure all field is correct.");
          return;
      }

      this.showAddLoading = true;
      this.attribute_dialog_loading = true;

      var Product_Size = this.attrjson.Product_Size;
      var Product_UOM = this.attrjson.Product_UOM;
      var Serve_Size = this.attrjson.Serve_Size;
      var Serve_Size_UOM = this.attrjson.Serve_Size_UOM;
      var Per_Serving = this.attrjson.Per_Serving;
      var Denominator = this.attrjson.Denominator;
      var Avg_Weight = this.attrjson.Avg_Weight;
      var Avg_Weight_UOM = this.attrjson.Avg_Weight_UOM;
      var Avg_Weight_Denominator = this.attrjson.Avg_Weight_Denominator;
      var Avg_Weight_Price = this.attrjson.Avg_Weight_Price;
      var EStore_Qty = this.attrjson.EStore_Qty;
      var remarks = this.attrjson.remarks;
      var Organic_Certified = this.attrjson.Organic_Certified;
      var Non_GMO = this.attrjson.Non_GMO;
      var No_Colouring = this.attrjson.No_Colouring;
      var Gluten_Free = this.attrjson.Gluten_Free;
      var Plant_Based = this.attrjson.Plant_Based;
      var Pesticide_Free = this.attrjson.Pesticide_Free;
      var Direct_from_Farm = this.attrjson.Direct_from_Farm;
      var Free_Range = this.attrjson.Free_Range;
      var Non_Halal = this.attrjson.Non_Halal;
      var Lactose_Free = this.attrjson.Lactose_Free;
      var Keto_Friendly = this.attrjson.Keto_Friendly;
      var Vegan = this.attrjson.Vegan;
      var Festive = this.attrjson.Festive;
      var Non_Halal = this.attrjson.Non_Halal;
      var EStore_Tag = this.attrjson.EStore_Tag;
      var EStore_Available = this.attrjson.EStore_Available;

      var payload = {
        pass_json: {
          updated_by: this.session_user_guid,
          outlet_guid: this.session_outlet_guid,
          language: this.language,
          itemcode: this.Itemcode,
          Product_Size: Product_Size,
          Product_UOM: Product_UOM,
          Serve_Size: Serve_Size,
          Serve_Size_UOM: Serve_Size_UOM,
          Per_Serving: Per_Serving,
          Denominator: Denominator,
          Avg_Weight: Avg_Weight,
          Avg_Weight_UOM: Avg_Weight_UOM,
          Avg_Weight_Denominator: Avg_Weight_Denominator,
          Avg_Weight_Price: Avg_Weight_Price,
          EStore_Qty: EStore_Qty,
          remarks: remarks,
          Organic_Certified: Organic_Certified,
          Non_GMO: Non_GMO,
          No_Colouring: No_Colouring,
          Gluten_Free: Gluten_Free,
          Plant_Based: Plant_Based,
          Pesticide_Free: Pesticide_Free,
          Direct_from_Farm: Direct_from_Farm,
          Free_Range: Free_Range,
          Non_Halal: Non_Halal,
          Lactose_Free: Lactose_Free,
          Keto_Friendly: Keto_Friendly,
          Vegan: Vegan,
          Festive: Festive,
          Non_Halal: Non_Halal,
          EStore_Tag: EStore_Tag,
          EStore_Available: EStore_Available,
        }
      }

      var object_pass = {};

      if(this.attribute_dialog_action == 'create')
      {
        payload.pass_json.created_by = this.session_user_guid;

        object_pass = {
          "dispatch": 'itemmaster/trigger_post_create_itemmaster_othersinfo',  // endpoint hardcoded
          "getter": 'itemmaster/get_itemmaster_othersinfo',             // getter hardcoded
          "app": this,
          "payload": payload,
        };
      }
      else if(this.attribute_dialog_action == 'edit')
      {
        payload.pass_json.oinfo_guid = this.attrjson.oinfo_guid;

        object_pass = {
          "dispatch": 'itemmaster/trigger_post_update_itemmaster_othersinfo',  // endpoint hardcoded
          "getter": 'itemmaster/get_itemmaster_othersinfo',             // getter hardcoded
          "app": this,
          "payload": payload,
        };
      }

      var dispatch_response = await this.$dispatch(object_pass);

      if (dispatch_response.status) {
          // success condition
          var success_message = this.attribute_dialog_action == 'create' ? 'Attribute Created Successfully.' : 'Attribute Edited Successfully.';
          this.showNotify("positive", success_message);
          this.table_function27(this.attribute_ori_params);
          this.showAddLoading = false;
          this.attribute_dialog_loading = false;
          this.attribute_dialog_action = null;
          this.attribute_dialog = false;
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
        this.attribute_dialog_loading = false;
      }
    },
    async handleReceiveHandleEditAttribute(row)
    {
      this.attribute_dialog = true;
      this.attribute_dialog_action = 'edit';
      this.attribute_dialog_loading = true;
      var result = JSON.parse(JSON.stringify(row.row));
      this.attrjson = result;
      this.attribute_dialog_loading = false;
    },
    close()
      {
        this.edit_barcode = false;
        // this.jsonBarcode = {};
        this.show_barcode_dialog = false;
        this.edit_listed_branch = false;
        // this.jsonListedBranch = {};
        this.show_listed_branch_dialog = false;
        this.show_miscellaneous_dialog = false;
        this.attribute_dialog = false;
        this.show_assortment_dialog = false;
        this.show_itemtype_dialog = false;
        this.show_pricetype_dialog = false;
        this.show_restriction_dialog = false;
        this.show_replenishment_dialog = false;
        this.show_permanentDiscount_dialog = false;
        this.show_pricebreak_dialog = false;
        
        
      },

    addListedBranch(){
        this.show_config_status_dialog3 = true;

        //  this.jsonListedBranch.branch = '';
      },

    // handleReceiveHandleEditBarcode(pass_payload)
    // {
    //   this.show_barcode_dialog = true;
    //   this.edit_child = true;
    //   this.edit_barcode = true;
    //   this.barcode_dialog_action = 'edit'
    //   this.ibt_json = JSON.parse(JSON.stringify(row.row))

    // },

  async handleReceiveHandleEdit2(row)
    {
      this.show_miscellaneous_dialog = true;
      this.miscellaneous_dialog_action = 'edit';
      this.miscellaneous_dialog_loading = true;
      
      var result = JSON.parse(JSON.stringify(row.row));
      this.miscellaneous_dialog_loading = false;
      this.miscjson = result;
  },
    // async handleAddMiscellaneous(){
    //     if(!this.edit_miscellaneous){
    //       var payload = {
    //         "pass_json":{
    //           "outlet_guid": this.session_outlet_guid,
    //           "language": this.language,
    //           "itemcode": this.Itemcode,
    //           "mis_guid": this.json.mis_guid,
    //           "seq": this.json.seq,
    //           "text1": this.json.text1,
    //           "value1": this.json.value1,
    //           "text2": this.json.text2,
    //           "value2": this.json.value2,
    //           "remark": this.json.remark,
    //           "set_active": this.json.set_active,
    //           "misc_group": this.json.misc_group,
    //         }
    //       }

    //       var object_pass = {
    //         "dispatch": 'itemmaster/trigger_post_create_itemmaster_miscellaneous',
    //         "getter": 'itemmaster/get_itemmaster_miscellaneous',
    //         "app": this,
    //         "payload": payload,
    //       };

    //       var dispatch_response_create_itemmaster_miscellaneous = await this.$dispatch(object_pass);
    //       var status = dispatch_response_create_itemmaster_miscellaneous.status

    //       if(status){
    //         this.showNotify('positive', 'Created Successfully')
    //         this.table_function2(this.ori_payload)
    //       }else{
    //         var get_error_message = JSON.parse(dispatch_response_create_itemmaster_miscellaneous.response)
    //           if(get_error_message){
    //             this.showNotify('negative', get_error_message.detail);
    //           }else{
    //             this.showNotify('nagative', 'Created Failed')
    //           }
    //       }
    //     }else{
    //       var payload = {
    //         "pass_json":{
    //           "outlet_guid": this.session_outlet_guid,
    //           "language": this.language,
    //           "itemcode": this.Itemcode,
    //           "mis_guid": this.json.mis_guid,
    //           "seq": this.json.seq,
    //           "text1": this.json.text1,
    //           "value1": this.json.value1,
    //           "text2": this.json.text2,
    //           "value2": this.json.value2,
    //           "remark": this.json.remark,
    //           "set_active": this.json.set_active,
    //           "misc_group": this.json.misc_group,
    //         }
    //       }

    //       var object_pass = {
    //         "dispatch": 'itemmaster/trigger_post_update_itemmaster_miscellaneous',
    //         "getter": 'itemmaster/get_itemmaster_miscellaneous',
    //         "app": this,
    //         "payload": payload,
    //       };

    //       var dispatch_response_update_itemmaster_miscellaneous = await this.$dispatch(object_pass);
    //       var status = dispatch_response_update_itemmaster_miscellaneous.status

    //       if(status){
    //         this.showNotify('positive', 'Updated Successfully')
    //         this.table_function2(this.ori_payload);
    //       }else{
    //         var get_error_message = JSON.parse(dispatch_response_update_itemmaster_miscellaneous.response)
    //           if(get_error_message){
    //             this.showNotify('negative', get_error_message.detail);
    //           }else{
    //             this.showNotify('nagative', 'Updated Failed')
    //           }
    //         }
    //     }


    //     this.show_miscellaneous_dialog = false
    // },
    async handleAddMiscellaneous()
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
    var set_active = this.miscjson.set_active;
    var seq = this.miscjson.seq;
    var text1 = this.miscjson.text1;
    var value1 = this.miscjson.value1;
    var text2 = this.miscjson.text2;
    var value2 = this.miscjson.value2;
    var misc_group = this.miscjson.misc_group;
    var remark = this.miscjson.remark;
    

    var payload = {
        pass_json: {
          itemcode: this.Itemcode,
          set_active: set_active,
          language: this.language,
          seq: seq,
          text1: text1,
          value1: value1,
          text2: text2,
          value2: value2,
          misc_group: misc_group,
          remark: remark,
        }
    }

      var object_pass = {};

      if(this.miscellaneous_dialog_action == 'create')
      {
        payload.pass_json.created_by = this.session_user_guid;

        var object_pass = {
            "dispatch": 'itemmaster/trigger_post_create_itemmaster_miscellaneous',
            "getter": 'itemmaster/get_itemmaster_miscellaneous',
            "app": this,
            "payload": payload,
          };
      }
      else if(this.miscellaneous_dialog_action == 'edit')
      {
        payload.pass_json.mis_guid = this.miscjson.mis_guid;
        payload.pass_json.updated_by = this.session_user_guid;

        var object_pass = {
            "dispatch": 'itemmaster/trigger_post_update_itemmaster_miscellaneous',
            "getter": 'itemmaster/get_itemmaster_miscellaneous',
            "app": this,
            "payload": payload,
          };
      }

      var dispatch_response = await this.$dispatch(object_pass);

      if (dispatch_response.status) {
          // success condition
          var success_message = this.miscellaneous_dialog_action == 'create' ? 'Miscellaneous Created Successfully.' : 'Miscellaneous Successfully.';
          this.showNotify("positive", success_message);
          this.table_function2(this.miscellaneous_ori_params);
          this.showAddLoading = false;
          this.miscellaneous_dialog_loading = false;
          this.miscellaneous_dialog_action = null;
          this.show_miscellaneous_dialog = false;
          this.miscjson = {};
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
        this.miscellaneous_dialog_loading = false;
      }
  },


    handleReceiveHandleEdit4(pass_payload){
      this.showAddLoading = true;

      this.json.itemtype_guid = pass_payload.row.itemtype_guid
      this.json.concept = pass_payload.row.concept
      this.json.itemtype = pass_payload.row.itemtype
      this.json.date_from = pass_payload.row.date_from
      this.json.date_to = pass_payload.row.date_to
      this.json.cancel = pass_payload.row.cancel
      this.json.cancel_at = pass_payload.row.cancel_at
      this.json.cancel_at = pass_payload.row.cancel_at
      this.json.last_refno = pass_payload.row.last_refno
      this.json.future_eff_date = pass_payload.row.future_eff_date

      var mobile = this.$q.screen.width < 600

      this.show_itemtype_dialog = true;
      this.edit_child = true;
      this.edit_itemtype = true;
      // this.jsonBarcode = payload

      setTimeout(()=>{
          this.showAddLoading = false;
        },2500)
    },
    handleReceiveHandleEdit5(pass_payload){
      this.showAddLoading = true;

      this.json.pricetype_guid = pass_payload.row.pricetype_guid
      this.json.concept = pass_payload.row.concept
      this.json.pricetype = pass_payload.row.pricetype
      this.json.itemtype = pass_payload.row.itemtype
      this.json.date_from = pass_payload.row.date_from
      this.json.date_to = pass_payload.row.date_to
      this.json.cancel = pass_payload.row.cancel
      this.json.cancel_at = pass_payload.row.cancel_at
      this.json.cancel_at = pass_payload.row.cancel_at
      this.json.last_refno = pass_payload.row.last_refno
      this.json.future_eff_date = pass_payload.row.future_eff_date

      var mobile = this.$q.screen.width < 600

      this.show_pricetype_dialog = true;
      this.edit_child = true;
      this.edit_pricetype = true;
      // this.jsonBarcode = payload

      setTimeout(()=>{
          this.showAddLoading = false;
        },2500)
    },
    
    handleReceiveHandleEdit7(pass_payload){
      this.showAddLoading = true;

      this.json.itemcode = pass_payload.row.Itemcode
      this.json.branch = pass_payload.row.branch
      this.json.purchase_order = pass_payload.row.purchase_order
      this.json.dn = pass_payload.row.dn
      this.json.cn = pass_payload.row.cn
      this.json.sales_order = pass_payload.row.sales_order
      this.json.ibt = pass_payload.row.ibt
      this.json.cpo = pass_payload.row.cpo


      var mobile = this.$q.screen.width < 600

      this.show_restriction_dialog = true;
      this.edit_child = true;
      this.edit_restriction = true;
      // this.jsonBarcode = payload

      setTimeout(()=>{
          this.showAddLoading = false;
        },2500)
    },
    
    

    // handleReceiveHandleEdit1(pass_payload){
    //   console.log('pass_payload', pass_payload);

    //   // this.effective_date = pass_payload.row.effective_date
    //   // this.currency_rate = pass_payload.row.currency_rate
    //   // this.detail_guid = pass_payload.row.detail_guid

    //   var mobile = this.$q.screen.width < 600

    //   this.show_barcode_dialog1 = true;
    //   this.edit_child = true;
    //   this.edit_barcode1 = true;
    //   this.showAddLoading = true;
    //   // this.jsonBarcode = payload

    //   this.showAddLoading = false;
    // },

    handleClickGeneralSearch()
    {
      this.general_search = true;
    },
    // handleChangeSCode () {

    // },
    handleChangePrice()
    {
      this.$nextTick(()=>{

        this.json.price_include_tax = this.formatAmount(this.unformatAmount(this.json.price_include_tax, '$'), '$');
        this.json.SellingPrice = this.formatAmount(this.unformatAmount(this.json.SellingPrice, '$'), '$');
        this.json.RSP_inc_tax = this.formatAmount(this.unformatAmount(this.json.RSP_inc_tax, '$'), '$');
        this.json.MinPrice = this.formatAmount(this.unformatAmount(this.json.MinPrice, '$'), '$');

        this.json.StdCost = this.formatAmount(this.unformatAmount(this.json.StdCost,'$'),'$');
        this.json.AverageCost = this.formatAmount(this.unformatAmount(this.json.AverageCost,'$'),'$');
        this.json.LastCost = this.formatAmount(this.unformatAmount(this.json.LastCost,'$'),'$');
        this.json.FIFOCost = this.formatAmount(this.unformatAmount(this.json.FIFOCost,'$'),'$');
        this.json.SellingPrice = this.formatAmount(this.unformatAmount(this.json.SellingPrice,'$'),'$');

        this.json.margin = this.formatAmount(this.unformatAmount(this.json.margin,'%'),'%');

        var StdCost = this.unformatAmount(this.json.StdCost,'$');
        var AverageCost = this.unformatAmount(this.json.AverageCost,'$');
        var LastCost = this.unformatAmount(this.json.LastCost,'$');
        var FIFOCost = this.unformatAmount(this.json.FIFOCost,'$');
        var SellingPrice = this.unformatAmount(this.json.SellingPrice,'$');

        var ListCostGP = ((Number(SellingPrice) - Number(StdCost)) / Number(SellingPrice)) * 100;
        var MovingAvgCostGP = ((Number(SellingPrice) - Number(AverageCost)) / Number(SellingPrice)) * 100;
        var LastGRCostGP = ((Number(SellingPrice) - Number(LastCost)) / Number(SellingPrice)) * 100;
        var FifoCostGP = ((Number(SellingPrice) - Number(FIFOCost)) / Number(SellingPrice)) * 100;

        this.json.ListCostGP = isNaN(ListCostGP) || ListCostGP === Infinity || ListCostGP === -Infinity ? '0.00' : this.formatAmount(ListCostGP, '%', '2');
        this.json.MovingAvgCostGP = isNaN(MovingAvgCostGP) || MovingAvgCostGP === Infinity || MovingAvgCostGP === -Infinity ? '0.00' : this.formatAmount(MovingAvgCostGP, '%', '2');
        this.json.LastGRCostGP = isNaN(LastGRCostGP) || LastGRCostGP === Infinity || LastGRCostGP === -Infinity ? '0.00' : this.formatAmount(LastGRCostGP, '%', '2');
        this.json.FifoCostGP = isNaN(FifoCostGP) || FifoCostGP === Infinity || FifoCostGP === -Infinity ? '0.00' : this.formatAmount(FifoCostGP, '%', '2');

        this.json.usedate = this.formatAmount(this.unformatAmount(this.json.usedate, '$', '0'), '$', '0');
        this.json.YieldRatio = this.formatAmount(this.unformatAmount(this.json.YieldRatio));
        this.json.WeightTraceQtyUOM = this.formatAmount(this.unformatAmount(this.json.WeightTraceQtyUOM, '$', '0'), '$', '0');
        this.json.WeightTraceQty = this.formatAmount(this.unformatAmount(this.json.WeightTraceQty, '$', '0'), '$', '0');
        this.json.unit_weight = this.formatAmount(this.unformatAmount(this.json.unit_weight, '$', '6'), '$', '6');;
        this.json.unit_volume = this.formatAmount(this.unformatAmount(this.json.unit_volume, '$', '6'), '$', '6');;
        this.json.unit_length = this.formatAmount(this.unformatAmount(this.json.unit_length, '$', '6'), '$', '6');;
        this.json.unit_width = this.formatAmount(this.unformatAmount(this.json.unit_width, '$', '6'), '$', '6');;
        this.json.unit_height = this.formatAmount(this.unformatAmount(this.json.unit_height, '$', '6'), '$', '6');;
        this.json.Point = this.formatAmount(this.unformatAmount(this.json.Point));

        // this.json.PackSize = this.formatAmount(this.unformatAmount(this.json.PackSize, '$', '0'), '$', '0');
        // this.json.BulkQty = this.formatAmount(this.unformatAmount(this.json.BulkQty, '$', '0'), '$', '0');

      });

    },
    handleChangeFormatting(value, variable_name, type)
    {
      this.json[variable_name] = this.formatAmount(value, type);
      this.calculation();
    },
    initializeDefaultFields() {
      // Loop through all new columns and set default value if undefined
      this.newColumns.forEach((column) => {
        if (this.json[column] === undefined) {
           this.json[column] = 1;  // Ensures reactivity
        }
      });
    },
    handleReceiveChange(value) {
    },
    handleChangeItemcode(pass_payload)
    {
    },
    handleStepClick(newVal)
    {
      this.$nextTick(()=>{
        if(this.step == '1')
        {
          this.tab = 'Information';
          this.active_section = 'Basic';
        }
        if(this.step == '2')
        {
          this.tab = 'Information';
          this.active_section = 'Barcode';
        }


        if(this.step == '3')
        {
          this.tab = 'Purchase'
          this.active_section6 = 'Supplier';
        }
      });

    },
    handleActiveClickSection(section)
    {
      this.active_section = section;
    //   if (section) {
    //   this.active_section = section;
    // }
      this.runTableFunctionInformation();
      if (this.active_section === 'Basic') {
        this.$nextTick(() => {
            this.$refs.stepper.goTo(1); // Move to step 1
            this.tab = 'Information';   // Set the tab to 'Information'

        });
    }
    else if (this.active_section === 'Barcode') {
        this.$nextTick(() => {
            this.$refs.stepper.goTo(2); // Move to step 1
            this.tab = 'Information';   // Set the tab to 'Information'

        });
    }
    },
    handleActiveClickSection2(section)
    {
      this.active_section2 = section;
      this.runTableFunctionConfiguration();
    },
    handleActiveClickSection3(section)
    {
      this.active_section3 = section;
      this.runTableFunctionReplenishment();
    },
    handleActiveClickSection4(section)
    {
      this.active_section4 = section;
      // this.runTableFunction();
    },
    handleActiveClickSection5(section)
    {
      this.active_section5 = section;
      this.runTableFunctionPromo();
    },
    handleActiveClickSection6(section)
    {
      this.active_section6 = section;
      this.runTableFunctionPurchase()
      /**if (section === 'Supplier') {
        // this.$nextTick(() => {
        this.step = '3'; // Set to Supply Source step
        this.tab = 'Purchase'; // Set to Purchase tab
    // });
      }**/
      if (this.active_section6 == 'Supplier') {
        setTimeout(() => {
          this.$refs.stepper.goTo(3);//this.step = '3'; // Set to Supply Source step
          this.tab = 'Purchase'; // Set to Purchase tab
        }, 0); // Adding a small delay
      }

    },
    handleActiveClickSection7(section)
    {
      this.active_section7 = section;
      this.runTableFunctionSalesinfo();
    },
    handleActiveClickSection8(section)
    {
      this.active_section8 = section;
      this.runTableFunctionInventory();
    },
    async getTableTotalRow (payload)
    {
      var payload = {
        "pass_json": {
          "tablename": "itemmaster",
          "language": this.language,
          "outlet_guid": this.session_outlet_guid
        },
      };

      var object_pass = {
        "dispatch": 'itemmaster/trigger_post_table_total_row',
        "getter": 'itemmaster/get_table_total_row',
        "app": this,
        "payload": payload,
      };

      var dispatch_response_get_totalrow = await this.$dispatch(object_pass);

      if(dispatch_response_get_totalrow.status){
        this.total_row  = dispatch_response_get_totalrow.response.total_row

      }
    },
    async getCustomDropdownAll () {
      var payload = {
        "pass_json": {
          "skip": 0,
          "outlet_guid": this.session_outlet_guid,
          "language": this.language,
        },
      };

      var object_pass = {
        "dispatch": 'itemmaster/trigger_post_get_custom_dropdown_all',
        "getter": 'itemmaster/get_custom_dropdown_all',
        "app": this,
        "payload": payload,
      };

      var dispatch_response = await this.$dispatch(object_pass);

      if(dispatch_response.status){

        var department_results = dispatch_response.response.DEPARTMENT.detail
        var dept_code = [];
        var dept_description = [];
        for(var i in department_results)
        {
          var sample = department_results[i];

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
        this.dept_options = dept_code;
        //price type
        var pricetype_results = dispatch_response.response.pricetype.detail
          var price_type_list = [];
          for(var i in pricetype_results)
          {
            var sample = pricetype_results[i];

            var obj = {
              label: sample.CODE_DESC,
              value: sample.CODE_DESC
            }
            price_type_list.push(obj);
          }
          this.price_type_options = price_type_list;

        var ITEMTYPE_results = dispatch_response.response.ITEMTYPE.detail
        var item_type_list = [];
          for(var i in ITEMTYPE_results)
          {
            var sample = ITEMTYPE_results[i];


            var obj = {
              label: sample.ItemType,
              value: sample.ItemType,
              SoldbyWeight: sample.SoldbyWeight
            }
            item_type_list.push(obj);
            // Update SoldByWeight field for the q-toggle
            // if (sample.SoldbyWeight === 1) {
            //   this.SoldbyWeight = true;  // Turns the toggle to green
            // } else {
            //   this.SoldbyWeight = false; // Keeps the toggle off
            // }
          }
          item_type_list.sort((a, b) => (a.value < b.value ? -1 : 1));
          this.item_type_options = item_type_list;

        var Size_results = dispatch_response.response.Size.detail
        var size_list = [];
          if(dispatch_response.response.Size.total_row > 0){
            for(var i in Size_results)
            {
              var sample = Size_results[i];

              var obj = {
                label: sample.Size+ ' - ' + sample.Description,
                value: sample.Size
              }

              var obj1 = {
                label: sample.Description,
                value: sample.Size
              }
              size_list.push(obj);
              }
            }
            size_list.sort((a, b) => (a.value < b.value ? -1 : 1));
            this.size_options = size_list;

      var brand_results = dispatch_response.response.Brand.detail
      var brand_list = [];
          for(var i in brand_results)
          {
            var sample = brand_results[i];

            var obj = {
              label: sample.Code+ ' - ' + sample.Description,
              value: sample.Code,
              MCode: sample.MCode,
            }

            brand_list.push(obj);
          }
          this.brand_options = brand_list;

        var Manufacturer_results = dispatch_response.response.Manufacturer.detail

            var mfr_code = [];
            var mfr_description = [];
            for(var i in Manufacturer_results)
            {
              var sample = Manufacturer_results[i];

              var obj = {
                label: sample.Code+ ' - ' + sample.description,
                value: sample.Code,
              }

              var obj1 = {
                label: sample.description,
                value: sample.Code,
              }

              mfr_code.push(obj);
              mfr_description.push(obj1); //should be obj1
            }

            mfr_code.sort((a, b) => (a.value < b.value ? -1 : 1));
            mfr_description.sort((a, b) => (a.value < b.value ? -1 : 1));
            this.manufacturer_options = mfr_code;

          var supplier_results = dispatch_response.response.Supplier.detail
          var supcus_code = [];
          var supcus_name = [];
          var supcus_guid = [];
          var supcus_guid_map = {}; // Create a mapping for supplier_code to supcus_guid

          for (var i in supplier_results){
            var obj = {
              label: supplier_results[i].Code + ' - ' + supplier_results[i].Name,
              value: supplier_results[i].Code
            }
            var obj1 = {
              label: supplier_results[i].Name,
              value: supplier_results[i].Code
            }
            var obj2 = {
              // label: supplier_results[i].Name,
              value: supplier_results[i].supcus_guid
            }
            supcus_code.push(obj);
            supcus_name.push(obj);
            supcus_guid.push(obj2);
            supcus_guid_map[supplier_results[i].Code] = supplier_results[i].supcus_guid; // Map supplier_code to its supcus_guid
            // this.supplier_dropdown_options.push(obj)
          }
          this.supplier_dropdown_options = supcus_code;
          this.supcus_guid_options = supcus_guid;
          this.supcus_guid_map = supcus_guid_map;

          // var supplier_options =  await this.getSupplier();
          var ary = [];
          var ary2 = [];

          for(var i in supplier_results)
          {
            var new_row = supplier_results[i]
            var obj = {
                label: new_row.Code + ' - ' + new_row.Name,
                value: new_row.Code,
                name: new_row.Name
            }
            var obj2 = {
                label: new_row.Code + ' - ' + new_row.Name,
                value: new_row.Name,
                code: new_row.Code
            }

            ary.push(obj)
            ary2.push(obj2)
          }

          this.supplier_code_options = ary;
          this.supplier_name_options = ary2;


        var origin_results = dispatch_response.response.Origin.detail
          var origin_list = [];
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
            origin_list.push(obj);
          }

          this.origin_options = origin_list;

        var Color_results = dispatch_response.response.Color.detail

          var variant_list = [];
          if(dispatch_response.response.Color.total_row > 0){
            for(var i in Color_results)
            {
              var sample = Color_results[i];

              var obj = {
                label: sample.Colour+ ' - ' + sample.Description,
                value: sample.Colour
              }

              var obj1 = {
                label: sample.Description,
                value: sample.Colour
              }
              variant_list.push(obj);
              // console.log('haha',variant_list)
            }

            this.color_options = variant_list;
          }

        var purchase_group_results = dispatch_response.response.purchase_group.detail
          for (var i in purchase_group_results){
          var obj = {
            "label": purchase_group_results[i].CODE_DESC,
            "value": purchase_group_results[i].CODE_DESC
          }
          this.poGroup_options.push(obj)
        }

        var UM_results = dispatch_response.response.UM.detail
          var um_list = [];
          for(var i in UM_results)
              {
                var sample = UM_results[i];

                var obj = {
                  label: sample.Code+ " - " +sample.Description,
                  value: sample.Code
                }

                um_list.push(obj);
          }
          this.um_options = um_list

        var tax_results = dispatch_response.response.tax.detail
        var tax_list = [];
        for(var i in tax_results)
        {
          var sample = tax_results[i];


          var obj = {
            label: sample.TaxCode,
            value: sample.TaxCode
          }
          tax_list.push(obj);
        }

        this.tax_options = tax_list

        var tax_purchase_results = dispatch_response.response.gst.detail.filter((entry)=>{ return entry.gst_trans_type == 'P' });
        var tax_purchase_list = [];

        for(var i in tax_purchase_results)
        {
          var sample = tax_purchase_results[i];

          var obj = {
            label: sample.gst_tax_code + '-' + sample.description,
            value: sample.gst_tax_code
          }
          tax_purchase_list.push(obj);
        }

        this.tax_purchase_options = tax_purchase_list;

        var tax_supply_results = dispatch_response.response.gst.detail.filter((entry)=>{ return entry.gst_trans_type == 'S' });
        var tax_supply_list = [];

        for(var i in tax_supply_results)
        {
          var sample = tax_supply_results[i];

          var obj = {
            label: sample.gst_tax_code + '-' + sample.description,
            value: sample.gst_tax_code
          }
          tax_supply_list.push(obj);
        }

        this.tax_supply_options = tax_supply_list;

        var miscgroup_results = dispatch_response.response.ItemMisc.detail.filter((entry)=>{ return entry.TRANS_TYPE == 'ITMMisc' });
          var miscgroup_list = [];
          for(var i in miscgroup_results)
          {
            var sample = miscgroup_results[i];

            var obj = {
              label: sample.CODE_DESC,
              value: sample.CODE_DESC
            }
            miscgroup_list.push(obj);
          }

          this.miscellaneousGroup_options = miscgroup_list;

    }
    },
    async get_listed_branch_options(){
      var payload = {
        "pass_json": {
          "BRANCH_CODE": "",
          "outlet_guid": this.session_outlet_guid,
          "language": this.language
        },
      };

      var object_pass = {
        "dispatch": 'itemmaster/trigger_post_cp_set_branch',
        "getter": 'itemmaster/get_cp_set_branch',
        "app": this,
        "payload": payload,
      };

      var dispatch_response_cp_set_branch = await this.$dispatch(object_pass);

      if(dispatch_response_cp_set_branch.status){
        var get_cp_set_branch = dispatch_response_cp_set_branch.response.detail

        var arr = []
        for (var i in get_cp_set_branch){
          var obj = {
            "label": get_cp_set_branch[i].BRANCH_CODE + ' - ' + get_cp_set_branch[i].BRANCH_NAME,
            "value": get_cp_set_branch[i].BRANCH_CODE
          }
          this.listedBranch_options.push(obj)
        }
        // this.hqloc_options = arr
      }
    },
    // async get_poGroup_options(){
    //   var payload = {
    //     "pass_json": {
    //       "TRANS_TYPE": "PUR_GROUP",
    //       "outlet_guid": this.session_outlet_guid,
    //       "language": this.language
    //     },
    //   };

    //   var object_pass = {
    //     "dispatch": 'itemmaster/trigger_post_read_master_code_transtype',
    //     "getter": 'itemmaster/get_read_master_code_transtype',
    //     "app": this,
    //     "payload": payload,
    //   };

    //   var dispatch_response_read_master_code_transtype_poGroup = await this.$dispatch(object_pass);

    //   if(dispatch_response_read_master_code_transtype_poGroup.status){
    //     var get_read_master_code_transtype = dispatch_response_read_master_code_transtype_poGroup.response.detail

    //     var arr = []
    //     for (var i in get_read_master_code_transtype){
    //       var obj = {
    //         "label": get_read_master_code_transtype[i].CODE_DESC,
    //         "value": get_read_master_code_transtype[i].CODE_GUID
    //       }
    //       this.poGroup_options.push(obj)
    //     }
    //     // this.hqloc_options = arr
    //   }
    // },
    // async getSupcusDropdown(payload)
    // {
    //   var payload = {
    //     "pass_json": {
    //       "Type": "S",
    //       "language": this.language,
    //       "outlet_guid": this.session_outlet_guid,
    //       "limit": '9999999',
    //       "sort_by": "Code",
    //       "sort_type": "asc"
    //     },
    //   };

    //   var object_pass = {
    //     "dispatch": 'itemmaster/trigger_post_get_supcus_dropdown',
    //     "getter": 'itemmaster/get_supcus_dropdown',
    //     "app": this,
    //     "payload": payload,
    //   };

    //   var dispatch_response_get_supcus_dropdown = await this.$dispatch(object_pass);

    //   if(dispatch_response_get_supcus_dropdown.status){
    //     var get_supcus_dropdown = dispatch_response_get_supcus_dropdown.response.detail

    //     var arr = []
    //     var supcus_code = [];
    //     var supcus_name = [];
    //     for (var i in get_supcus_dropdown){
    //       var obj = {
    //         label: get_supcus_dropdown[i].Code + ' - ' + get_supcus_dropdown[i].Name,
    //         value: get_supcus_dropdown[i].Code
    //       }
    //       var obj1 = {
    //         label: get_supcus_dropdown[i].Name,
    //         value: get_supcus_dropdown[i].Code
    //       }
    //       supcus_code.push(obj);
    //       supcus_name.push(obj);
    //       // this.supplier_dropdown_options.push(obj)
    //     }

    //     this.supplier_dropdown_options = supcus_code;
    //     // this.supplier_options2 = supcus_name;

    //   }
    // },
    // async getOriginDropdown(payload)
    // {
    //   var payload = {
    //     "pass_json": {
    //       "outlet_guid": this.session_outlet_guid,
    //       "language": this.language,
    //     },
    //   };

    //   var object_pass = {
    //     "dispatch": 'itemmaster/trigger_read_origin',
    //     "getter": 'itemmaster/get_origin',
    //     "app": this,
    //     "payload": payload,
    //   };

    //   var dispatch_response_get_origin_dropdown = await this.$dispatch(object_pass);

    //   if(dispatch_response_get_origin_dropdown.status){
    //     // var origin_all_dropdown = dispatch_response_get_origin_dropdown.response.detail
    //     var origin_all_dropdown = dispatch_response_get_origin_dropdown.response

    //     var arr = []
    //       var origin_list = [];
    //       for(var i in origin_all_dropdown)
    //       {
    //         var sample = origin_all_dropdown[i];

    //         var obj = {
    //           label: sample.code+ ' - ' + sample.name,
    //           value: sample.code
    //         }

    //         var obj1 = {
    //           label: sample.name,
    //           value: sample.code
    //         }
    //         origin_list.push(obj);
    //       }

    //       this.origin_options = origin_list;
    //   }
    // },
    // async getColorDropdown(payload)
    // {
    //   var payload = {
    //     "pass_json": {
    //       "outlet_guid": this.session_outlet_guid,
    //       "language": this.language,
    //     },
    //   };

    //   var object_pass = {
    //     "dispatch": 'itemmaster/trigger_read_item_color',
    //     "getter": 'itemmaster/get_item_color',
    //     "app": this,
    //     "payload": payload,
    //   };

    //   var dispatch_response_get_color_dropdown = await this.$dispatch(object_pass);

    //   if(dispatch_response_get_color_dropdown.status){
    //     var variant_results = dispatch_response_get_color_dropdown.response.detail

    //     var arr = []
    //     var variant_list = [];
    //     if(dispatch_response_get_color_dropdown.response.total_row > 0){
    //       for(var i in variant_results)
    //       {
    //         var sample = variant_results[i];

    //         var obj = {
    //           label: sample.Colour+ ' - ' + sample.Description,
    //           value: sample.Colour
    //         }

    //         var obj1 = {
    //           label: sample.Description,
    //           value: sample.Colour
    //         }
    //         variant_list.push(obj);

    //       }

    //       this.color_options = variant_list;
    //     }else{
    //       variant_results = []
    //     }
    //     }
    // },
    // async getItemSizeDropdown(payload)
    // {
    //   var payload = {
    //     "pass_json": {
    //       "outlet_guid": this.session_outlet_guid,
    //       "language": this.language,
    //       // sort_by: "Size",
    //       // sort_type: "",
    //     },
    //   };

    //   var object_pass = {
    //     "dispatch": 'itemmaster/trigger_read_item_size',
    //     "getter": 'itemmaster/get_item_size',
    //     "app": this,
    //     "payload": payload,
    //   };

    //   var dispatch_response_get_size_dropdown = await this.$dispatch(object_pass);

    //   if(dispatch_response_get_size_dropdown.status){
    //     var item_size_results = dispatch_response_get_size_dropdown.response.detail

    //     var arr = []
    //     var item_size_list = [];
    //     if(dispatch_response_get_size_dropdown.response.total_row > 0){
    //       for(var i in item_size_results)
    //       {
    //         var sample = item_size_results[i];

    //         var obj = {
    //           label: sample.Size+ ' - ' + sample.Description,
    //           value: sample.Size
    //         }

    //         var obj1 = {
    //           label: sample.Description,
    //           value: sample.Size
    //         }
    //         item_size_list.push(obj);
    //         }
    //       }
    //       item_size_list.sort((a, b) => (a.value < b.value ? -1 : 1));
    //       this.size_options = item_size_list;
    //     }
    // },

    /**async getItemTypeDropdown(payload)
    {
      var payload = {
        "pass_json": {
          "outlet_guid": this.session_outlet_guid,
          "language": this.language,
          // sort_by: "Size",
          // sort_type: "",
        },
      };

      var object_pass = {
        "dispatch": 'itemmaster/trigger_read_item_type',
        "getter": 'itemmaster/get_item_type',
        "app": this,
        "payload": payload,
      };

      var dispatch_response_get_itemtype_dropdown = await this.$dispatch(object_pass);

      if(dispatch_response_get_itemtype_dropdown.status){
        // var item_type_results = dispatch_response_get_itemtype_dropdown.response.detail
        var item_type_results = dispatch_response_get_itemtype_dropdown.response

        var arr = []
        var item_type_list = [];
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
        this.item_type_options = item_type_list;
        }
    }, **/

    /**async getPriceTypeDropdown(payload)
    {
      var payload = {
        "pass_json": {
          "outlet_guid": this.session_outlet_guid,
          "language": this.language,
          "TRANS_TYPE": 'PriceType'
          // "Type": 'S'
          // TRANS_TYPE:'PriceType ',
          // sort_by: "Size",
          // sort_type: "",
        },
      };
      var object_pass = {
        "dispatch": 'itemmaster/trigger_read_master_code_by_trans_type',
        "getter": 'itemmaster/get_read_master_code_by_trans_type',
        "app": this,
        "payload": payload,
      };

      var dispatch_response_get_pricetype_dropdown = await this.$dispatch(object_pass);

      if(dispatch_response_get_pricetype_dropdown.status){
        var price_type_results = dispatch_response_get_pricetype_dropdown.response.detail

        var arr = []
        var price_type_list = [];
        for(var i in price_type_results)
        {
          var sample = price_type_results[i];

          var obj = {
            label: sample.CODE_DESC,
            value: sample.CODE_DESC
          }
          price_type_list.push(obj);
        }
        this.price_type_options = price_type_list;
        }


    },**/
    // async getBrandDropdown(payload)
    // {
    //   var payload = {
    //     "pass_json": {
    //       "outlet_guid": this.session_outlet_guid,
    //       "language": this.language,
    //       // sort_by: "Size",
    //       // sort_type: "",
    //     },
    //   };

    //   var object_pass = {
    //     "dispatch": 'itemmaster/trigger_read_brand',
    //     "getter": 'itemmaster/get_brand',
    //     "app": this,
    //     "payload": payload,
    //   };

    //   var dispatch_response_get_brand_dropdown = await this.$dispatch(object_pass);

    //   if(dispatch_response_get_brand_dropdown.status){
    //     var brand_results = dispatch_response_get_brand_dropdown.response.detail

    //     var arr = []
    //     var brand_list = [];
    //     for(var i in brand_results)
    //     {
    //       var sample = brand_results[i];

    //       var obj = {
    //         label: sample.Code+ ' - ' + sample.Description,
    //         value: sample.Code,
    //         MCode: sample.MCode,
    //       }

    //       brand_list.push(obj);
    //     }
    //     this.brand_options = brand_list;
    //     }
    // },
    // async getManufacturerDropdown(payload)
    // {
    //   var payload = {
    //     "pass_json": {
    //       "outlet_guid": this.session_outlet_guid,
    //       "language": this.language,
    //       // sort_by: "Size",
    //       // sort_type: "",
    //     },
    //   };

    //   var object_pass = {
    //     "dispatch": 'itemmaster/trigger_read_maufacturer',
    //     "getter": 'itemmaster/get_manufacturer',
    //     "app": this,
    //     "payload": payload,
    //   };

    //   var dispatch_response_get_manufacturer_dropdown = await this.$dispatch(object_pass);

    //   if(dispatch_response_get_manufacturer_dropdown.status){
    //     var manufacturer_results = dispatch_response_get_manufacturer_dropdown.response.detail

    //     var arr = []
    //     var mfr_code = [];
    //     var mfr_description = [];
    //     for(var i in manufacturer_results)
    //     {
    //       var sample = manufacturer_results[i];

    //       var obj = {
    //         label: sample.Code+ ' - ' + sample.description,
    //         value: sample.Code,
    //       }

    //       var obj1 = {
    //         label: sample.description,
    //         value: sample.Code,
    //       }

    //       mfr_code.push(obj);
    //       mfr_description.push(obj); //should be obj1
    //     }

    //     mfr_code.sort((a, b) => (a.value < b.value ? -1 : 1));
    //     mfr_description.sort((a, b) => (a.value < b.value ? -1 : 1));
    //     this.manufacturer_options = mfr_code;
    //     }
    // },
    handleChangeAssorted() {
    if (this.selectedItem) {
      this.json.Itemcode = this.selectedItem.value; // Assign selected itemcode
      this.json.description = this.selectedItem.description; // Assign description from the selected item
    }
  },
    /**async getItemcodeDropdown(payload)
    {
      var payload = {
        "pass_json": {
          "Itemcode": "",
          "outlet_guid": this.session_outlet_guid,
          "language": this.language,

        },
      };

      var object_pass = {
        "dispatch": 'itemmaster/trigger_post_read_item_all',
        "getter": 'itemmaster/get_read_item_all',
        "app": this,
        "payload": payload,
      };

      var dispatch_response_get_read_item_all_dropdown = await this.$dispatch(object_pass);

      if(dispatch_response_get_read_item_all_dropdown.status){
        var get_read_item_all_dropdown = dispatch_response_get_read_item_all_dropdown.response.detail

        var arr = []
        for (var i in get_read_item_all_dropdown){
          var obj = {
            label: get_read_item_all_dropdown[i].Itemcode + ' - ' + get_read_item_all_dropdown[i].Description + '-' + get_read_item_all_dropdown[i].PackSize,
            value: get_read_item_all_dropdown[i].Itemcode,
            description: get_read_item_all_dropdown[i].Description,
          }
          var obj1 = {
            label: get_read_item_all_dropdown[i].Description,
            value: get_read_item_all_dropdown[i].Itemcode
          }
          this.itemcode_options.push(obj)
        }
        // this.hqloc_options = arr
      }
    },**/
    // async getSupcus(payload)
    //   {
    //     return await this.$store.dispatch('purchase/trigger_read_supcus_all', payload).then(() => {
    //       var data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_read_supcus_all']));
    //       return data;
    //     });
    // },
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
    // async getDepartment(payload)
    // {
    //   return await this.$store.dispatch('itemmaster/trigger_read_department', payload).then(() => {
    //     var data = JSON.parse(JSON.stringify(this.$store.getters['itemmaster/get_department']));
    //     return data;
    //   });
    // },
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
    // async getManufacturer(payload)
    // {
    //   return await this.$store.dispatch('itemmaster/trigger_read_maufacturer', payload).then(() => {
    //     var data = JSON.parse(JSON.stringify(this.$store.getters['itemmaster/get_manufacturer']));
    //     return data;
    //   });
    // },




    // async getBrand(payload)
    // {
    //   return await this.$store.dispatch('itemmaster/trigger_read_brand', payload).then(() => {
    //     var data = JSON.parse(JSON.stringify(this.$store.getters['itemmaster/get_brand']));
    //     return data;
    //   });
    // },
    // async getOrigin(payload)
    // {
    //   return await this.$store.dispatch('itemmaster/trigger_read_origin', payload).then(() => {
    //     var data = JSON.parse(JSON.stringify(this.$store.getters['itemmaster/get_origin']));
    //     return data;
    //   });
    // },
    // async getVariant(payload)
    // {
    //   return await this.$store.dispatch('itemmaster/trigger_read_item_color', payload).then(() => {
    //     var data = JSON.parse(JSON.stringify(this.$store.getters['itemmaster/get_item_color']));
    //     return data;
    //   });
    // },
    // async getItemSize(payload)
    // {
    //   return await this.$store.dispatch('itemmaster/trigger_read_item_size', payload).then(() => {
    //     var data = JSON.parse(JSON.stringify(this.$store.getters['itemmaster/get_item_size']));
    //     return data;
    //   });
    // },
    // async getItemType(payload)
    // {
    //   return await this.$store.dispatch('itemmaster/trigger_read_item_type', payload).then(() => {
    //     var data = JSON.parse(JSON.stringify(this.$store.getters['itemmaster/get_item_type']));
    //     return data;
    //   });
    // },
    // async getPriceType(payload)
    // {
    //   return await this.$store.dispatch('itemmaster/trigger_read_master_code_by_trans_type', payload).then(() => {
    //     var data = JSON.parse(JSON.stringify(this.$store.getters['itemmaster/get_read_master_code_by_trans_type']));
    //     return data;
    //   });
    // },
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
      // if(this.$route.name.endsWith('Itemmaster'))
      // {
      //   this.$router.push("Itemmaster");
      // }
      // else if(this.$route.name.endsWith('GoodsReceiving'))
      // {
      //   this.$router.push("GoodsReceiving");
      // }
      this.$router.push("Itemmaster");

    },

    unformatAmount(value,type, decimal = null)
    {

      if(value === undefined || value == null)
      {
          return value;
      }

      var value = value.toString();

      var value = value.replaceAll(',','')

      if(type == "$")
      {
        var decimal = decimal ? decimal : 2;
        var value = Number(value).toFixed(decimal);
      }
      else if(type == "%")
      {
        var decimal = decimal ? decimal : 1;
        var value = Number(value).toFixed(1);
      }
      else if(type == "qty")
      {
        var decimal = decimal ? decimal : 0;
        var value = Number(value).toFixed(decimal);
      }
      else
      {
          var value = value;
      }

      return Number(value)
    },
    formatAmount(value, type, decimal = null)
    {
      if(value !== undefined)
      {
          var value = value;
      }
      else
      {
          var value = '';
      }

        if(type == "$")
        {
          var decimal = decimal ? decimal : 2;
          var value = Number(value).toFixed(decimal);
        }
        else if(type == "%")
        {
          var decimal = decimal ? decimal : 1;
          var value = Number(value).toFixed(1);
        }
        else if(type == "qty")
        {
          var decimal = decimal ? decimal : 0;
          var value = Number(value).toFixed(decimal);
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

      if(this.page_function == 'create')
      {
          if(this.json.SellingPrice == 0)
          {
            this.showNotify("negative","Selling Price must greater than 0")
            this.showAddLoading = false;
            return;
          }
      }
      // if (this.json.DesShort === this.json.Description) {
      //   this.showNotify("negative", "Description 2 cannot be the same as the Description");
      //   this.showAddLoading = false;
      //   return;
      // }

      await this.saveIM();
    },
    async saveIM(){
          var vendor_code = this.json.vendor_code
          var itemcode = this.json.Itemcode;
          var ItemLink = this.json.ItemLink;
          var PackSize = this.unformatAmount(this.json.PackSize);
          var UM = this.json.UM;
          var BulkQty = this.unformatAmount(this.json.BulkQty);
          var UMBulk = this.json.UMBulk;
          var cartonprice = this.unformatAmount(this.json.cartonprice);
          var Description = this.json.Description;
          var DesShort = this.json.DesShort;
          var Dept = this.json.Dept;
          var SubDept = this.json.SubDept;
          var Category = this.json.Category;
          var ArticleNo = this.json.ArticleNo;
          var Manufacturer = this.json.Manufacturer;
          var Brand = this.json.Brand;
          var Origin = this.json.Origin;
          var Point = this.unformatAmount(this.json.Point);
          var Colour = this.json.Colour;
          var Size = this.json.Size;
          var ItemType = this.json.ItemType;
          var price_type = this.json.price_type;
          var YieldRatio = this.unformatAmount(this.json.YieldRatio);
          var RSP_inc_tax  = this.unformatAmount(this.json.RSP_inc_tax);
          var TaxCode =this.json.TaxCode;
          var tax_code_purchase = this.json.tax_code_purchase;
          var tax_code_supply = this.json.tax_code_supply
          var SellingPrice = this.unformatAmount(this.json.SellingPrice);
          var StdCost = this.unformatAmount(this.json.StdCost)
          var remark = this.json.remark;
          var LastCost = this.unformatAmount(this.json.LastCost);
          var AverageCost = this.unformatAmount(this.json.AverageCost);
          var FIFOCost = this.unformatAmount(this.json.FIFOCost);
          var SafetyLevel = this.unformatAmount(this.json.SafetyLevel);
          var  ReorderQty= this.unformatAmount(this.json.ReorderQty);
          var  MaxLevel= this.unformatAmount(this.json.MaxLevel);
          var  MinPrice= this.unformatAmount(this.json.MinPrice);
          var  Disable= this.json.Disable;
          var  unit_weight= this.unformatAmount(this.json.unit_weight);
          var  unit_length= this.unformatAmount(this.json.unit_length);
          var  unit_width= this.unformatAmount(this.json.unit_width);
          var  unit_height= this.unformatAmount(this.json.unit_height);
          var  unit_volume= this.unformatAmount(this.json.unit_volume);
          var  margin= this.unformatAmount(this.json.margin);
          var  non_inventory= this.json.non_inventory ? 1 : 0;
          var  zero_price= this.json.zero_price ? 1 : 0;
          var  OpenItem= this.json.OpenItem ? 1 : 0;
          var  mempoint_base_on_qty= this.unformatAmount(this.json.mempoint_base_on_qty);
          var stock_type= this.json.stock_type;
          var basic_link= this.json.basic_link;
          var new_status= this.json.new_status;
          var cost_value= this.unformatAmount(this.json.cost_value);
          var price_include_tax= this.unformatAmount(this.json.price_include_tax);
          var ListCostGP= this.unformatAmount(this.json.ListCostGP);
          var MovingAvgCostGP= this.unformatAmount(this.json.MovingAvgCostGP);
          var LastGRCostGP= this.unformatAmount(this.json.LastGRCostGP);
          var FifoCostGP= this.unformatAmount(this.json.FifoCostGP);
          var im_pur_group= this.json.im_pur_group;
          var BOM= this.json.BOM ? 1 : 0;
          var item_package= this.json.item_package ? 1 : 0;
          var BestBuy= this.json.BestBuy ? 1 : 0;
          var usedate= this.json.usedate;
          var WeightTraceQtyUOM= this.json.WeightTraceQtyUOM;
          var WeightTraceQty= this.unformatAmount(this.json.WeightTraceQty);
          var trace_sn= this.json.trace_sn;
          var label_info= this.json.label_info;
          var im_stock_day= this.unformatAmount(this.json.im_stock_day);
          var im_min_day= this.unformatAmount(this.json.im_min_day);
          var im_max_day= this.unformatAmount(this.json.im_max_day);
          var im_lead_time= this.unformatAmount(this.json.im_lead_time);
          var im_buffer_stock_day= this.unformatAmount(this.json.im_buffer_stock_day);
          var im_top_sales_buffer= this.unformatAmount(this.json.im_top_sales_buffer);
          var Consign= this.json.Consign;
          var im_manual_soq = this.unformatAmount(this.json.im_manual_soq);
          var im_manual_order = this.unformatAmount(this.json.im_manual_order);
          var BarcodeType = this.json.BarcodeType;
          var outlet_guid= this.session_outlet_guid;
          var inv_type = this.json.inv_type;
          var language= this.language;
          var im_created_by= this.session_user_guid;
          var im_updated_by= this.session_user_guid;

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
          "FIFOCost":FIFOCost,
          "SafetyLevel":SafetyLevel,
          "ReorderQty":ReorderQty,
          "MaxLevel":MaxLevel,
          "MinPrice":MinPrice,
          "Disable":Disable,
          "unit_weight":unit_weight,
          "unit_length":unit_length,
          "unit_width":unit_width,
          "unit_height":unit_height,
          "unit_volume":unit_volume,
          "margin":margin,
          "non_inventory":non_inventory,
          "zero_price":zero_price,
          "OpenItem":OpenItem,
          "mempoint_base_on_qty":mempoint_base_on_qty,
          "stock_type": stock_type,
          "basic_link": basic_link,
          "new_status": new_status,
          "cost_value": cost_value,
          "price_include_tax": price_include_tax,
          "ListCostGP": ListCostGP,
          "MovingAvgCostGP": MovingAvgCostGP,
          "LastGRCostGP": LastGRCostGP,
          "FifoCostGP": FifoCostGP,
          "im_pur_group": im_pur_group,
          "im_created_by": im_created_by,
          "im_updated_by": im_updated_by,
          "BOM": BOM,
          "item_package": item_package,
          "BestBuy": BestBuy,
          "usedate": usedate,
          "WeightTraceQtyUOM": WeightTraceQtyUOM,
          "WeightTraceQty": WeightTraceQty,
          "trace_sn": trace_sn,
          "label_info": label_info,
          "im_stock_day": im_stock_day,
          "im_min_day": im_min_day,
          "im_max_day": im_max_day,
          "im_lead_time": im_lead_time,
          "im_buffer_stock_day": im_buffer_stock_day,
          "im_top_sales_buffer": im_top_sales_buffer,
          "im_manual_soq": im_manual_soq,
          "im_manual_order": im_manual_order,
          "Consign" : Consign,
          "inv_type" : inv_type,
          "BarcodeType" : BarcodeType,
          "outlet_guid":outlet_guid,
          "language":language,
        };

        var payloadUpdate = {
            // "SCode":SCode,
            // "SName":SName,
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
            "FIFOCost":FIFOCost,
            "SafetyLevel":SafetyLevel,
            // "ReorderLevel":ReorderLevel,
            "ReorderQty":ReorderQty,
            "MaxLevel":MaxLevel,
            "MinPrice":MinPrice,
            // "MaxOff":MaxOff,
            "Disable":Disable,
            "unit_weight":unit_weight,
            "unit_length":unit_length,
            "unit_width":unit_width,
            "unit_height":unit_height,
            "unit_volume":unit_volume,
            "margin":margin,
            "non_inventory":non_inventory,
            "zero_price":zero_price,
            "OpenItem":OpenItem,
            "mempoint_base_on_qty":mempoint_base_on_qty,
            // "CostRatio":CostRatio,
            "stock_type": stock_type,
            "basic_link": basic_link,
            "new_status": new_status,
            "cost_value": cost_value,
            "price_include_tax": price_include_tax,
            "ListCostGP": ListCostGP,
            "MovingAvgCostGP": MovingAvgCostGP,
            "LastGRCostGP": LastGRCostGP,
            "FifoCostGP": FifoCostGP,
            // "Division": Division,
            "im_pur_group": im_pur_group,
            // "Principle": Principle,
            // "created_by": created_by,
            "im_updated_by": im_updated_by,
            "BOM": BOM,
            "item_package": item_package,
            "BestBuy": BestBuy,
            "usedate": usedate,
            "WeightTraceQtyUOM": WeightTraceQtyUOM,
            "WeightTraceQty": WeightTraceQty,
            "trace_sn": trace_sn,
            "label_info": label_info,
            "im_stock_day": im_stock_day,
            "im_min_day": im_min_day,
            "im_max_day": im_max_day,
            "im_lead_time": im_lead_time,
            "im_buffer_stock_day": im_buffer_stock_day,
            "im_top_sales_buffer": im_top_sales_buffer,
            "im_manual_soq": im_manual_soq,
            "im_manual_order": im_manual_order,
            "Consign" : Consign,
            "inv_type" : inv_type,
            "BarcodeType" : BarcodeType,
            "outlet_guid":outlet_guid,
            "language":language,
            // "user_guid":user_guid


          };

        // return

        var data = {};

        if(this.page_function == 'create')
        {
          var payload = {
            "pass_json": payload,//pass_json should be the field or data wish to be created.
            "params": {}
          };

          var object_pass = {
            "dispatch": 'itemmaster/trigger_post_create_item_new', //refer to path/function_name in store actions.js
            "getter": 'itemmaster/get_create_item_new', //refer to path/function_name in store getters.js
            "app": this, //compulsory passed variable
            "payload": payload //payload that needed to use in store actions.js
          };

          var data = await this.$dispatch(object_pass);

          if(data.status)
          {
            this.showAddLoading = true;
          }else
          {
            var error_message = 'Failed. Please try again.';

            var isValidJSON = this.isValidJSON(data.response);

            if(isValidJSON)
            {
              var json_message = JSON.parse(data.response);
              console.log(json_message)
              var error_message = json_message.detail ? json_message.detail : error_message;
              console.log(error_message)
            }
            else
            {
              var error_message = data.response;
            }
            var show_error = "";

            show_error = error_message;

            this.showNotify('negative', show_error);

            this.showAddLoading = false;
          }
            //run time script see after this
        }
        else if(this.page_function == 'edit')
        {
          var payload = {
            "pass_json": payloadUpdate,
            "params": {}
          };

          var object_pass = {
            "dispatch": 'itemmaster/trigger_post_update_item_new',
            "getter": 'itemmaster/get_create_item_new',
            "app": this,
            "payload": payload
          };

          var data = await this.$dispatch(object_pass);
          if(data.status)
          {
            this.showAddLoading = true;
          }else
          {
            var error_message = 'Failed. Please try again.';

            var isValidJSON = this.isValidJSON(data.response);

            if(isValidJSON)
            {
              var json_message = JSON.parse(data.response);
              var error_message = json_message.detail ? json_message.detail : error_message;
            }
            else
            {
              var error_message = data.response;
            }

            var show_error = "";

            show_error = error_message;

            this.showNotify('negative', show_error);

            this.showAddLoading = false;
          }
        }

        // var status = dispatch_response.status
        var status = data.status

        if(status)
        {
          // alert('success');
          if(this.page_function == 'create') {
          this.showAddLoading = true;
          }

          var mobile = this.$q.screen.width < 600

          var set_query = {
            "itemcode":this.Itemcode,
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

            if(dispatch_response.status){
              console.log('Runscript :',dispatch_response.message);
              this.showAddLoading = true;
            }else{
                  var error_response = dispatch_response.message || dispatch_response.response;
                  this.showNotify('negative', error_response);
                  this.showAddLoading = false;
                  console.log('Runscript Failed',dispatch_response);
            }

          if(this.page_function == 'create')
          {
            // alert('2');



            await this.getTableTotalRow();//call api to get the totalrow
            this.showNotify("positive", "Created Successfully.");
            this.$router.push({
            // name: 'CreateEditIM_new',
            name: "ItemmasterView",
            query: { Itemcode: data.response.Itemcode, offset: 0, total_row: this.total_row}

          });

          this.showAddLoading = false;
          // this.$router.push({ name: 'EditItemmaster', query: { Itemcode: data.response.Itemcode, step: 1  } })
        // }
          }
          else if(this.page_function == 'edit')
          {
            if(mobile)
            {
              this.$router.push({ name: 'IMConfirm', query: { Itemcode: data.response.Itemcode, header: 'IM', type:'update' }})
            }
            else
            {
              this.trigger_read_item_all(this.ori_payload);
              this.showNotify("positive", "Updated Successfully.");
              var Itemcode = this.Itemcode;
              this.showAddLoading = false;



              var payload = {
                Itemcode: Itemcode
              }


              // var data = await this.getFilterItem(payload);
              // var filtered_transmain = data.response;


              // filtered_transmain.cartonprice  = this.formatAmount(filtered_transmain.cartonprice,'$');
            }
          }

        }
        else
        {
          // var error_response = data.response.detail;
          // var show_error = "";
          // var description = error_response.replace(/^\[Error Code \d+\]\s*/, '');

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

          // this.showNotify('negative', JSON.stringify(error_response));

          this.showAddLoading = false;
        }
    },
    async validate_form(form_name)
    {
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
    searchItemCode(){
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
      var Mcode = this.json.SubDept
            var payload = {
                  language : this.language,
                  skip: 0,
                  limit: 99999999,
                  MCode: Mcode,
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

            this.category_options = category_code
    },
    async getDivision()
    {
      // if (!this.json.Dept) {
      //   return; // No department selected, exit early
      // }
      var payload = {}

      payload.outlet_guid= this.session_outlet_guid;
      payload.language= this.language;
      payload.sort_by= "DEPT_CODE";
      payload.sort_type= "asc";
      // payload.DEPT_GUID= "";
      // payload.GROUP_CODE="";
      payload.DEPT_CODE= this.json.Dept;
      // payload.DEPT_DESC= "";
      // payload.CREATED_AT= "", //2024-09-18T13:33:08.331Z
      // payload.CREATED_BY= "";
      // payload.UPDATED_AT= ""; //2024-09-18T13:33:08.331Z
      // payload.UPDATED_BY= "";


        var payload = {
          "pass_json": payload//pass_json should be the field or data wish to be created.
        };


        var object_pass = {
        "dispatch": 'itemmaster/trigger_post_get_set_group_dept', //refer to path/function_name instore actions.js
        "getter": 'itemmaster/get_set_group_dept', //refer to path/function_name in storegetters.js
        "app": this, //compulsory passed variable
        "payload": payload //payload that needed to use in store actions.js
        };
        var dispatch_response = await this.$dispatch(object_pass);
        if(dispatch_response.status)
          {


            // this.showNotify("positive", "updated Successfully.");
            var division_results = dispatch_response.response.detail
            if (dispatch_response.length === 0) {
              this.showNotify("negative", "No divisions found.");
              return;
            }

            var division_code = [];
            // var division_name = [];

            for(var i in division_results)
            {
              var sample = division_results[i];

              var obj = {
                label: sample.GROUP_CODE+'-'+sample.GROUP_DESC,
                value: sample.GROUP_CODE
              }

              // var obj1 = {
              //   label: sample.DEPT_DESC,
              //   value: sample.DEPT_CODE
              // }

              division_code.push(obj);
              // division_name.push(obj1);
            }

            this.division_options = division_code

            if (division_code.length > 0) {
              this.json.Division = division_code[0].value;  // Auto-fill with the first division found
            }
          }
          else
          {
              console.log('haha wrong',dispatch_response.status)
          }
    },
    handleChangeSCode(value) {


      this.json.vendor_code = value; // Update vendor_code with selected value
      // Find the supcus_guid corresponding to the selected supplier
      let selectedGuid = this.supcus_guid_map[value];


      if (selectedGuid) {
        this.supcus_guid = selectedGuid; // Update supcus_guid based on supplier_code
        this.getPrinciple(); // Fetch principle details using the supcus_guid
      }
    },
    async getPrinciple()
    {

      // var payload = {}
        var payload = {
          pass_json: {
                "outlet_guid": this.session_outlet_guid,
                "language": this.language,
                "ordering": "-created_at",
                "sort_by": "created_at",
                "sort_type": "Desc",
                "supcus_guid": this.supcus_guid,

            }
        };

        var object_pass = {
        "dispatch": 'itemmaster/trigger_post_get_supcus_link', //refer to path/function_name instore actions.js
        "getter": 'itemmaster/get_supcus_link', //refer to path/function_name in storegetters.js
        "app": this, //compulsory passed variable
        "payload": payload //payload that needed to use in store actions.js
        };
        var dispatch_response = await this.$dispatch(object_pass);

        if(dispatch_response.status)
          {


            // this.showNotify("positive", "updated Successfully.");
            var principle_results = dispatch_response.response.detail
            if (dispatch_response.length === 0) {
              this.showNotify("negative", "No principle found.");
              return;
            }

            var principle_code = [];
            // var division_name = [];

            for(var i in principle_results)
            {
              var sample = principle_results[i].supcus_details[i];

              var obj = {
                label: sample.Code + '-' + sample.Name,
                value: sample.Code
              }

              principle_code.push(obj);

            }

            if (principle_code.length > 0) {
              this.json.Principle = principle_code[0].value;
            }

            }

          else
          {
              console.log('principle failed to fetch',dispatch_response.status)
          }
    },
    // async handleChangeDept_without_firstdata_col_category_subdepartment(newVal){

    //   this.action_change_selecting = true
    //   this.loading_sub_dept = true
    //   this.json.SubDept = ""
    //   this.json.Category = ""
    //   this.$nextTick(async()=>{
    //   this.json.Dept =  newVal !== null ? this.json.Dept : ''
    //     if(this.json.Dept == ''){
    //       this.sub_dept_options = [];
    //       this.getAllCategoryOptions();
    //       this.category_options = []
    //     }
    //     else{

    //       this.json.Dept = newVal

    //       var Mcode = this.json.Dept
    //       var payload = {
    //           language : this.language,
    //           skip: 0,
    //           limit: 99999999,
    //           MCode: Mcode,
    //           sort_by: "Description",
    //           sort_type: "ASC",
    //       }

    //       var sub_dept = await this.getSubDept(payload);

    //       var sub_dept_results =  sub_dept.detail
    //       this.getAllCategoryOptions()
    //       this.getDivision()
    //     //  this.category_options =[]
    //       var sub_dept_code = [];
    //       var sub_dept_name = [];
    //       for(var i in sub_dept_results)
    //       {
    //         var sample = sub_dept_results[i];

    //         var obj = {
    //           label: sample.Code+ ' - ' + sample.Description,
    //           value: sample.Code
    //         }

    //         var obj1 = {
    //           label: sample.Description,
    //           value: sample.Code
    //         }

    //         sub_dept_code.push(obj);
    //         sub_dept_name.push(obj1);
    //       }
    //       this.sub_dept_options = sub_dept_code

    //       }
    //       this.loading_sub_dept = false;
    //       this.action_change_selecting = false;
    //     })

    // },
    async handleChangeDept(newVal){

  this.action_change_selecting = true
  this.loading_sub_dept = true
  this.json.SubDept = ""
  this.json.Category = ""
  this.json.Division = "";
  this.$nextTick(async()=>{
  this.json.Dept =  newVal !== null ? this.json.Dept : ''
    if(this.json.Dept == ''){
      this.sub_dept_options = [];
      // this.getAllCategoryOptions();
      this.category_options = [];
      this.division_options = [];
      // this.category_options = []
    }
    else{

      this.json.Dept = newVal

      var Mcode = this.json.Dept
      var payload = {
          language : this.language,
          skip: 0,
          limit: 99999999,
          MCode: Mcode,
          sort_by: "Description",
          sort_type: "ASC",
      }
      //fetch the first department options
      var sub_dept = await this.getSubDept(payload);

      var sub_dept_results =  sub_dept.detail
      var sub_dept_code = [];
      for(var i in sub_dept_results)
      {
        var sample = sub_dept_results[i];

        var obj = {
          label: sample.Code+ ' - ' + sample.Description,
          value: sample.Code
        }
        sub_dept_code.push(obj);
      }
      this.sub_dept_options = sub_dept_code
      if (this.sub_dept_options.length > 0) {
      this.json.SubDept = this.sub_dept_options[0].value;
      }
      // Fetch category and division options
      await this.getAllCategoryOptions();
      // await this.getDivision();

      // Automatically select the first category
        if (this.category_options.length > 0) {
          this.json.Category = this.category_options[0].value;
        }

        // Automatically select the first division
        if (this.division_options.length > 0) {
          this.json.Division = this.division_options[0].value;
        }
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
      this.category_options = category_code
      if (this.category_options.length > 0) {
        this.json.Category = this.category_options[0].value;
      }
        }

        //  category_options
          this.loading_category = false;
          this.action_change_selecting = false;




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


    // async handleAddlistedBranch(){
    //     this.showAddLoading = true;
    //     var edit_listed_branch = this.edit_listed_branch
    //     var form_name = 'save_edit_pochild_form';
    //         var error = 0;
    //         await this.$refs[form_name].validate().then(valid => {
    //             if (!valid) {
    //                 error = 1;
    //             }
    //         });

    //         var validated = error == 1 ? false : true;

    //         if(!validated)
    //         {
    //             this.showNotify("negative","Please make sure all field is correct.");
    //             this.showAddLoading = false;
    //             return;
    //         }

    //     if(edit_listed_branch){
    //         var Itemcode = this.json.Itemcode
    //         var branch = this.jsonListedBranch.branch
    //         var updated_at = this.jsonBarcode.updated_at
    //         var updated_by = this.user_name


    //         var payload2 = {
    //           "Itemcode" : Itemcode,
    //           "updated_at":updated_at,
    //           "updated_by"  : updated_by,
    //           "branch"  : branch,
    //         }
    //         var data = {};
    //     // await this.$store.dispatch('itemmaster/trigger_update_barcode', payload).then(() => {
    //     //     data = JSON.parse(JSON.stringify(this.$store.getters['itemmaster/get_barcode_status']));
    //     //   });
    //     var payload ={
    //           "pass_json": payload2,
    //           "params": {}
    //         }
    //     var object_pass = {
    //           dispatch: 'itemmaster/trigger_post_update_itemmaster_listed_branch',
    //           getter: 'itemmaster/get_itemmaster_listed_branch',
    //           app: this,
    //           payload: payload,
    //      };
    //      var dispatch_response = await this.$dispatch(object_pass);
    //      data = dispatch_response
    //       console.log('dispatch_response',dispatch_response.response);
    //       console.log('data',data);


    //       if(dispatch_response.status)
    //       {
    //           this.showAddLoading = false;
    //           this.showNotify("positive", "Updated Successfully.");
    //           this.edit_listed_branch = false,
    //           this.jsonListedBranch = {};

    //           this.show_config_status_dialog3 = false;
    //           this.table_function3(this.ori_params);

    //       }
    //       else
    //       {


    //         this.showNotify('negative','Please try again.')

    //         this.showAddLoading = false;
    //       }



    //     }else{
    //       console.log("Itemcode:", Itemcode);
    //       console.log("branch:", branch);
    //     var Itemcode = this.json.Itemcode
    //     var branch = this.jsonListedBranch.branch
    //     var created_by = this.user_name

    //     var payload = {
    //       "Itemcode" : Itemcode,
    //       "branch"  : branch,
    //       "created_by"     : created_by,
    //     }

    //     var data = {};
    //     await this.$store.dispatch('itemmaster/trigger_post_create_itemmaster_listed_branch', payload).then(() => {
    //         data = JSON.parse(JSON.stringify(this.$store.getters['itemmaster/get_barcode_status']));
    //       });

    //       console.log('data',data);
    //       var status = data.status

    //       if(status == "success")
    //       {

    //         this.showAddLoading = false;
    //         this.showNotify("positive", "Created Successfully.");
    //         this.jsonListedBranch = {};
    //         this.show_config_status_dialog3 = false;
    //         this.table_function3(this.ori_params);
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
    //             temp_error = loop_index + " - " + error_message + '<br>';
    //             show_error += temp_error;
    //           }
    //         });//close foreach error message

    //         this.showNotify('negative', show_error);

    //         this.showAddLoading = false;
    //       }
    //   }
    // },

    handleChange(newVal){


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

        var itemcode_1 = this.Itemcode;

        if(itemcode_1 == undefined || itemcode_1 == '')
        {
          this.$router.push('/ERP/purchase/Itemmaster')
          return;
        }

        var payload = {
          Itemcode : itemcode_1
        }

        var data = await this.getFilterItem(payload);
        var filtered_transmain = data.response;

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
              sub_dept_name.push(obj);
            }
            this.sub_dept_options = sub_dept_name
            this.json.SubDept = get_dept_subdept[0].MCode;


            var category = this.all_category.filter((entry) =>  entry.DeptCode ==  this.json.Dept && entry.MCode == this.json.SubDept) // Filter based on your condition
            .map((entry) => { // Map to a new object with only the desired keys
              return {
                  label: entry.Code+ ' - ' + entry.Description,
                  value: entry.Code,
              };
            });

                this.category_options = category;

          }else{
             this.action_change_selecting= true;
             var all_category= this.all_category.map((entry)=>{
              return{
                label: entry.Code+ ' - ' + entry.Description,
                value: entry.Code,
              }
             });
             this.category_options = all_category


             setTimeout(()=>{
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


      }else{
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
            },50)

      }

    },
    async handleChangeBrand(newVal){

      return;
      var Manufacturer = this.brand_options.filter((entry)=>{
        return entry.value == newVal;
      });

      var code_mft = Manufacturer[0].MCode

      var payloadDept = {
        skip: 0,
        language : 'EN',
        limit:99999999,
        Code: code_mft,
        sort_by: "Code",
        sort_type: "ASC",
      };

      var manufacturer = await this.getManufacturer(payloadDept);
      var manufacturer_results = manufacturer.detail
      //  var manufacturer_results = currentMfrArray


      var mfr_description = [];


      for(var i in manufacturer_results.detail)
      {
        var sample = manufacturer_results.detail[i];

        var obj = {
          label: sample.Code+ ' - ' + sample.description,
          value: sample.Code,
        }

        mfr_description.push(obj);
      }


      this.manufacturer_options = mfr_description;

      this.json.Manufacturer = code_mft
      //console.log('Manufacturer',this.json.Manufacturer);
    },
    async handleChangeDivision(newVal){

      // this.action_change_selecting = true
      // this.loading_division = true
      // this.json.Dept = ""
      // this.json.SubDept = ""
      // this.json.Category = ""
      // this.dept_options = [];
      // this.sub_dept_options = [];
      // this.getDivision();
      // var DeptCode = this.json.Dept

    },

    async fetchAllData(){

      var payload = {
        language : 'EN'
      };
      var payloadDept = {
        skip: 0,
        language : 'EN',
        limit:99999999,
        sort_by: "Code",
        sort_type: "ASC",
        MCode:  this.json.Dept,
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

      const requests = [
        this.getSubDept(payloadDept),
        this.getTax(payloadTax),
        this.getTaxPurchase(payloadTaxP),
        this.getTaxSupply(payloadTaxS),

      ];
      const results = await Promise.all(requests.map(p => p.catch(error => ({ error }))));
      const [
        subdept,
        Tax,
        tax_purchase,
        tax_supply,
      ] = results;

      const logAndProcess = (result, label) => {
        if (result && result.error) {
          console.error(`Error fetching ${label}:`, result.error);
          return null; // Return null for errors
        } else {

          return result;
        }
      };

      const processedResults = {
        subdept: logAndProcess(subdept, 'subdept'),
        Tax: logAndProcess(Tax, 'Tax'),
        tax_purchase: logAndProcess(tax_purchase, 'tax_purchase'),
        tax_supply: logAndProcess(tax_supply, 'tax_supply'),
      };


      return processedResults;
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
  },

  watch:{
    'json.ItemType': function (newValue) {
      if (newValue) {
      this.handleItemTypeChange(newValue)
    }
    },
    'ajson.Itemcode': function(newItemcode) {
      if (this.show_assortment_dialog) { // Check if the assort dialog is open
        const selectedOption = this.itemcode_options.find(option => option.value === newItemcode);
        if (selectedOption) {
          this.ajson.description = selectedOption.description;
        } else {
          this.ajson.description = '';
        }
      }
    },
    'json.Dept': async function(newDept) {
      if (newDept) {
        await this.getDivision();
      }
    },
    // 'json.vendor_code': async function(newDept) {
    //   if (newDept) {
    //     await this.getPrinciple();
    //   }
    // },
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
.q-btn.disabled {
    opacity: 0.2 !important;
}

* >>> .cursor_pointer.q-field--readonly.q-field--float .q-field__native
{
  cursor: pointer;
}

.hide_section
{
  display: none;
}

.custom_button
{
font-size: 14px;
background-color: #273655;
color: white;
margin-left: 5px;
}
* >>> .q-field--outlined.q-field--readonly .q-field__control:before {
    border-style: solid;
}
.top_right_button
{
    text-align: right;
    padding-top: 5px;
}
.height_98
{
  height: 98%;
}

.unknown_field
{
  color: red;
}

.hide_section
{
  display: none;
}

.btn_qlist.q-list.q-list--padding {
  padding: 3px 0px !important;
}

.btn_qlist >>>.q-item
{
  min-height: 30px !important;
  height: 10px;
}
.btn_drp >>>.q-btn__content
{
  justify-content: left;
  font-size: 12px;
}
.btn_drp .q-btn__content .q-btn {
  font-size: 12px !important;
}

*>>>.btn_grp2.q-btn-group {
  box-shadow: none !important;
}
.btn_grp2 >>>.q-btn {
  padding: 0px 3px
}
/* .btn_grp2 >>>.q-btn >>>.q-btn-item
{
  padding: 3px 8px !important;
} */
*>>>.btn_drp.q-btn.q-btn-item
{
  padding: 3px 8px !important;
}
.btn_drp_action >>>.q-btn__content
{
  justify-content: left;
  font-size: 12px;
  padding-left: 10px;
}








.no-scroll {
  overflow: hidden;
}
.step-content {
  background: white;

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
  padding: 5px 10px !important;
}
.BarcodeTable >>>.q-table th
{
  white-space: nowrap;
}
.BarcodeTable >>> .q-table thead tr
{
  height:0px;
}
.BarcodeTable >>>.q-table tbody td
{
  height:0px;
}
.BarcodeTable >>>.scroll
{
  overflow: visible;
}
* >>> .BarcodeTable > .q-table__container > .q-table__middle > .q-table > tbody > tr > td
{
  padding: 5px 10px !important;
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
  border-bottom: 0px;
  padding-left: 10px;
  padding-right: 40%;
}

* >>> .custom_step > .q-stepper__tab
{
  padding: 5px;
  padding-top: 10px;
}

* >>> .custom_step > .q-stepper__tab > .q-stepper__label > .q-stepper__title
{
  font-size: 12px;
}

* >>> input[type="text"]
{
  font-size: 12px;
}


* >>> .custom_tab_font > .q-tab__label
{
  font-size: 12px;
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
  padding: 11px; /* Adjust the padding as needed */
  /* border-radius: 8px; */
  background: #FFF !important;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  height: 10px;
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
  /* padding-bottom: 16px; */
}
.first-dialog_separator {
  padding-top: 16px;
  padding-bottom: 16px;
  gap: 40px;
}
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
  width: 300px; /* 55%; Adjust the desired width */
  height: 60px; /* 40px; Adjust the desired height */
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
  margin-bottom: 24px;
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
    position: sticky;
    top: 50px;
    z-index: 2;
    padding:0px;
    /* background-color: white;
    position: sticky;
    z-index: 2;
    top: 0px; */
    /* height: 57px; */
    /* text-align: center; */
    /* padding-left: 10px; */
    /* padding-right: 10px; */
    /* padding-top: 0px; */
    /* padding-bottom: 0px; */
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
  .dialog_action_reassign {
    position: static;
    padding:0px;
    padding-right: 20px;
    padding-left: 20px;
    padding-bottom: 20px;
    bottom: 0px;
    background-color: white;
  }
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
  padding-left: 15px;
  padding-right: 15px;
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
  padding: 10px 10px;
  align-items: center;
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
