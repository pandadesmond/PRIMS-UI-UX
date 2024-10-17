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
                <!-- dropdown content goes here -->
                <q-list padding style="" class="btn_qlist">
                  <q-item clickable style="padding: 0px">                        
                    <q-item-section>
                      <q-btn flat no-caps :label="'Duplicate Item Link'" color="primary" @click="handlePostTransmain" class="btn_drp"/>
                    </q-item-section>
                  </q-item>
                  
                </q-list>
              </q-btn-dropdown>
              
            </q-btn-group>

            <q-btn-group style="margin-right: 10px;" class="btn_grp2" > 
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
            
            <q-btn-group style="margin-right: 10px;" class="btn_grp2"> 
              <q-btn-dropdown auto-close rounded color="primary" icon="send_and_archive" split size="9px" no-caps>
               
                <q-list padding style="" class="btn_qlist"> <!--width: 100px;height:120px-->
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
              <Button :disable="page_function == 'create' || page_function == 'edit'  ? true : false" v-on:receiveClick="handleEditIM"
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
              <Button :disable="page_function == 'view' || page_function == 'create' ? true : false" v-on:receiveClick="handleDelete"
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
              <Button :disable="page_function == 'view' ? true : false" v-on:receiveClick="handleCreateIM"
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
                              <Input :readonly="page_function == 'view' ? true : false"
                                :autofocusclick="true"
                                v-model:pass_value="json.ItemLink"
                                v-on:receiveChange="handleChange"
                                :dbComponentBehavior="dbComponentBehavior.number_left" />      
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
                              <Input :readonly="page_function == 'view' ? true : false"
                                :autofocusclick="true"
                                v-model="jsonBarcode.Barcode"
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
                              <Input :readonly="page_function == 'view' ? true : false"
                                :autofocusclick="true"
                                :disable="true"
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
                              <Input :readonly="page_function == 'view' ? true : false"
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
                          <Input :readonly="page_function == 'view' ? true : false"
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
                              <Input :readonly="page_function == 'view' ? true : false"
                                :autofocusclick="true"
                                v-model:pass_value="json.DesShort"
                                v-on:receiveChange="handleChange"
                                :dbComponentBehavior="dbComponentBehavior.text" />
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
                                <Input :readonly="page_function == 'view' ? true : false"
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
                                  :readonly="page_function == 'view' ? true : false"
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
                                    :readonly="page_function == 'view' ? true : false"
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

                                  <Input
                                    :readonly="page_function == 'view' ? true : false"
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
                                :readonly="page_function == 'view' ? true : false"
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
                                  :readonly="page_function == 'view' ? true : false"
                                  v-model:pass_value="json.UMBulk"
                                  v-on:receiveChange="handleChange"
                                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.select_required : oridbComponentBehavior.select"
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
                                    :readonly="page_function == 'view' ? true : false"
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
                                    :readonly="page_function == 'view' ? true : false"
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
                                :readonly="page_function == 'view' ? true : false"
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
                                  :readonly="page_function == 'view' ? true : false"
                                  v-model:pass_value="json.ItemType"
                                  v-on:receiveChange="handleChange"
                                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.select"
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
                                  :readonly="page_function == 'view' ? true : false"
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

                                  <q-toggle
                                    style="margin-left: -10%;"
                                    :false-value="true"
                                    :true-value="false"
                                    color="green"
                                    v-model="SoldByWeight"
                                  />
                                  
                                </div>

                                <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                  <!-- <q-select class="new_input_select" outlined dense v-model="cost_value" :options="cost_options" /> -->
                                  <Select
                                  :readonly="page_function == 'view' ? true : false"
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
                  <q-btn no-caps dense color="white" text-color="black" label="upload photo" style="font-size: 10px; color: black; font-weight: bold;" />
                  </div>
              </div>
            </div>
          </div>
        </div>

        <q-card flat class="card-container" style="max-height: 100%; padding: 10px;border-radius: 0px; padding-top: 0px;padding-left: 0px;">
          <q-card-section class="upload_container" style="font-size: 10px;">

            <q-card-actions class="dialog_action justify-between row" style="padding-left: 10px; padding-right: 0px;">

              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" style="margin-top: 0px;">
                <div class="component_div2">
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
                  <q-separator />

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
                          <div v-if="active_section === 'Barcode'" class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2" align="right">
                           <!-- <q-space></q-space> -->
                          <Button_icon :disabled="readonly_button" :flat="true" :icon="'add'" v-on:receiveClick="addButtonBarcode()" :font_color="'white'" :color="'#069857'" :text="$language('D0024')" :outline="false" size="12px" class="justify-end button_add_1" />
                          </div>
                          <div v-if="active_section === 'Miscellaneous'" class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2" align="right">
                           <!-- <q-space></q-space> -->
                          <Button_icon :disabled="readonly_button" :flat="true" v-on:receiveClick="addButtonMiscellaneous" :font_color="'white'" :color="'#069857'" :text="'Create'" :outline="false" size="12px" class="justify-end button_add_1" />
                          </div>
                          <div v-if="active_section === 'Assortment'" class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2" align="right">
                           <!-- <q-space></q-space> -->
                          <Button_icon  :disabled="readonly_button" :flat="true" v-on:receiveClick="addButtonAssorted" :font_color="'white'" :color="'#069857'" :text="'Create'" :outline="false" size="12px" class="justify-end button_add_1" />
                          </div>
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
                                :readonly="page_function == 'view' ? true : false"
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
                                :readonly="page_function == 'view' ? true : false"
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
                                :readonly="page_function == 'view' ? true : false"
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
                                :readonly="page_function == 'view' ? true : false"
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
                                <q-input class="new_input" outlined v-model="jsonChild.SupStdPrice" :dense="dense" input-class="text-right"/> -->

                                <LabelInputVerticalGeneral
                                :readonly="page_function == 'view' ? true : false"
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
                                :readonly="page_function == 'view' ? true : false"
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
                                :readonly="page_function == 'view' ? true : false"
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
                                :readonly="page_function == 'view' ? true : false"
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
                                :readonly="page_function == 'view' ? true : false"
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
                                :readonly="page_function == 'view' ? true : false"
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
                                :readonly="page_function == 'view' ? true : false"
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
                                :readonly="page_function == 'view' ? true : false"
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
                                :readonly="page_function == 'view' ? true : false"
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
                                <LabelInputVerticalGeneral
                                :readonly="page_function == 'view' ? true : false"
                                :autofocusclick="true"
                                  v-model:pass_value="json.tax_code_purchase"
                                  :pass_label_value="'GST Input'"
                                  v-on:receiveChange="handleChange"
                                  :dbComponentBehavior="dbComponentBehavior.text"
                                  label="test"
                                />
                              </div>

                              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <!-- <b>GST Supply</b>
                                <q-input class="new_input" outlined v-model="json.tax_code_supply" :dense="dense"/> -->
                                <LabelInputVerticalGeneral
                                :readonly="page_function == 'view' ? true : false"
                                :autofocusclick="true"
                                  v-model:pass_value="json.tax_code_supply"
                                  :pass_label_value="'GST Output'"
                                  v-on:receiveChange="handleChange"
                                  :dbComponentBehavior="dbComponentBehavior.text"
                                  label="test"
                                />
                              </div>

                              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <!-- <b>SST Tax Code</b>
                                <q-input class="new_input" outlined v-model="pending_wording" :dense="dense"/> -->
                                <LabelInputVerticalGeneral
                                :readonly="page_function == 'view' ? true : false"
                                :autofocusclick="true"
                                  v-model:pass_value="json.TaxCode"
                                  :pass_label_value="'SST Code'"
                                  v-on:receiveChange="handleChange"
                                  :dbComponentBehavior="dbComponentBehavior.text"
                                  label="test"
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
                              <LabelSelectVerticalGeneral
                              :readonly="page_function == 'view' ? true : false"
                              v-model:pass_value="json.Division"
                              :pass_label_value="'Division'"
                              v-on:receiveChange="handleChangeDivision"
                              :dbComponentBehavior="action_change_selecting ? dbComponentBehavior.select_required : dbComponentBehavior.text_required"
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
                              :readonly="page_function == 'view' ? true : false"
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
                              :readonly="page_function == 'view' ? true : false"
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
                              :readonly="page_function == 'view' ? true : false"
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
                              :readonly="page_function == 'view' ? true : false"
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
                              :readonly="page_function == 'view' ? true : false"
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
                              :readonly="page_function == 'view' ? true : false"
                              v-model:pass_value="json.vendor_code"
                              :pass_label_value="'Supplier'"
                              v-on:receiveChange="handleChangeSCode"
                              :dbComponentBehavior="dbComponentBehavior.text"
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
                              :readonly="page_function == 'view' ? true : false"
                                :autofocusclick="true"
                                :disable="true"
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
                              :readonly="page_function == 'view' ? true : false"
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
                              :readonly="page_function == 'view' ? true : false"
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
                              :readonly="page_function == 'view' ? true : false"
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
                              :readonly="page_function == 'view' ? true : false"
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
                                :disable="true"
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
                                :disable="true"
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
                                :disable="true"
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
                                :disable="true"
                              />
                            </div>

                          </div>
                        </div>
                        </div>
                        </div>
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
                          v-on:receiveHandleEdit="handleReceiveHandleEdit2"
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
                              :readonly="page_function == 'view' ? true : false"
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
                              :readonly="page_function == 'view' ? true : false"
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
                              :readonly="page_function == 'view' ? true : false"
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
                              :readonly="page_function == 'view' ? true : false"
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
                              :readonly="page_function == 'view' ? true : false"
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
                              :readonly="page_function == 'view' ? true : false"
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
                              :readonly="page_function == 'view' ? true : false"
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
                              :readonly="page_function == 'view' ? true : false"
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
                              :readonly="page_function == 'view' ? true : false"
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
                              :readonly="page_function == 'view' ? true : false"
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
                              :readonly="page_function == 'view' ? true : false"
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
                              :readonly="page_function == 'view' ? true : false"
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
                              <q-input :readonly="page_function == 'view' ? true : false" class="new_input_custom" outlined v-model="json.remark" :dense="dense" />
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
                              <q-input :readonly="page_function == 'view' ? true : false" class="new_input_custom" outlined v-model="json.label_info" :dense="dense" />
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
                          v-on:receiveHandleEdit="handleReceiveHandleEdit1"
                          v-on:receiveHandleDelete="handleReceiveHandleDelete"

                          :filter_mode_on="filter_mode_on"
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
                          v-on:receiveHandleEdit="handleReceiveHandleEdit24"
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
                          <div v-if="active_section2 === 'Status'" class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2" align="right">
                           <!-- <q-space></q-space> -->
                          <Button_icon :disabled="readonly_button" :flat="true" :icon="'add'" v-on:receiveClick="handleActionListedBranch" :font_color="'white'" :color="'#069857'" :text="$language('D0024')" :outline="false" size="12px" class="justify-end button_add_1" />
                          </div>
                          <div v-if="active_section2 === 'Item Type'" class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2" align="right">
                           <!-- <q-space></q-space> -->
                          <Button_icon :disabled="readonly_button" :flat="true" :icon="'add'" v-on:receiveClick="addButtonItemType" :font_color="'white'" :color="'#069857'" :text="$language('D0024')" :outline="false" size="12px" class="justify-end button_add_1" />
                          </div>
                          <div v-if="active_section2 === 'Price Type'" class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2" align="right">
                           <!-- <q-space></q-space> -->
                          <Button_icon :disabled="readonly_button" :flat="true" :icon="'add'" v-on:receiveClick="addButtonPriceType" :font_color="'white'" :color="'#069857'" :text="$language('D0024')" :outline="false" size="12px" class="justify-end button_add_1" />
                          </div>
                          <div v-if="active_section2 === 'Restriction'" class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2" align="right">
                           <!-- <q-space></q-space> -->
                          <Button_icon :disabled="readonly_button" :flat="true" :icon="'add'" v-on:receiveClick="addButtonRestriction" :font_color="'white'" :color="'#069857'" :text="$language('D0024')" :outline="false" size="12px" class="justify-end button_add_1" />
                          </div>
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
                          v-on:receiveHandleEdit="handleReceiveHandleEdit3"
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
                          v-on:receiveHandleEdit="handleReceiveHandleEdit4"
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
                          v-on:receiveHandleEdit="handleReceiveHandleEdit5"
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
                          v-on:receiveHandleEdit="handleReceiveHandleEdit7"
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
                          <div v-if="active_section3 === 'Banner/Site'" class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2" align="right">
                           <!-- <q-space></q-space> -->
                          <Button_icon :disabled="readonly_button" :flat="true" :icon="'add'" v-on:receiveClick="addButtonReplenishmentConcept()" :font_color="'white'" :color="'#069857'" :text="$language('D0024')" :outline="false" size="12px" class="justify-end button_add_1" />
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
                                  v-model="json.imrep_manual_soq"
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
                                  v-model="json.imrep_manual_order"
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
                                v-model:pass_value="json.imrep_min_day"
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
                                v-model:pass_value="json.imrep_max_day"
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
                                v-model:pass_value="json.imrep_lead_time"
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
                                v-model:pass_value="json.imrep_stock_day"
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
                                v-model:pass_value="json.imrep_buffer_stock_day"
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
                                v-model:pass_value="json.imrep_top_sales_buffer"
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
                          v-on:receiveHandleEdit="handleReceiveHandleEdit6"
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
                          <div v-if="active_section6 === 'Cost Change'" class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2" align="right">
                           <!-- <q-space></q-space> -->
                          <Button_icon :disabled="readonly_button" :flat="true" :icon="'add'" v-on:receiveClick="addButtonBarcode()" :font_color="'white'" :color="'#069857'" :text="$language('D0024')" :outline="false" size="12px" class="justify-end button_add_1" />
                          </div>
                          <div v-if="active_section6 === 'Purchase Order'" class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2" align="right">
                           <!-- <q-space></q-space> -->
                          <Button_icon :disabled="readonly_button" :flat="true" :icon="'add'" v-on:receiveClick="handleAddPurchaseOrder()" :font_color="'white'" :color="'#069857'" :text="$language('D0024')" :outline="false" size="12px" class="justify-end button_add_1" />
                          </div>
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

                                                      <tr>
                                                        <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">1</td>
                                                        <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">Priority</td>
                                                        <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">Type</td>
                                                        <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">A001</td>
                                                        <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">123456789 223456789 323456789 423456789 523456789 623456789</td>
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

                                                        <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">2024-08-30</td><!--Effective Date-->
                                                        <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">Unit/Case</td><!--UOM-->
                                                        <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">0</td><!--Expected Cost-->
                                                        <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">0</td><!--Disc 1-->
                                                        <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">0</td><!--Disc 2-->
                                                        <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">0</td><!--Listed Cost-->
                                                        
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
                                                        <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right; border-left: 0px;"> Case Qty = 1</td>
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

                                                        <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px;"></td>
                                                        <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px;"></td>

                                                        <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px;"></td>
                                                        <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px;"></td>

                                                        
                                                        <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px;"></td><!--Effective Date-->
                                                        <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">Case Qty = 1</td><!--UOM-->
                                                        <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">0</td><!--Expected Cost-->
                                                        <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">0</td><!--Disc 1-->
                                                        <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">0</td><!--Disc 2-->
                                                        <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">0</td><!--Listed Cost-->

                                                      </tr>

                                                      <tr style="border-top: 2px solid #273655;">
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

                                                        <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">2024-08-30</td><!--Effective Date-->
                                                        <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">Unit/Case</td><!--UOM-->
                                                        <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">0</td><!--Expected Cost-->
                                                        <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">0</td><!--Disc 1-->
                                                        <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">0</td><!--Disc 2-->
                                                        <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">0</td><!--Listed Cost-->
                                                        
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

                                                        <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px;"></td><!--Effective Date-->
                                                        <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">Case Qty = 1</td><!--UOM-->
                                                        <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">0</td><!--Expected Cost-->
                                                        <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">0</td><!--Disc 1-->
                                                        <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">0</td><!--Disc 2-->
                                                        <td style="padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">0</td><!--Listed Cost-->
                                                        
                                                      </tr>
                                                      

                                                    </tbody>
                                                  </table>
                          </div>
                        </div>
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
                          v-on:receiveHandleEdit="handleReceiveHandleEdit9"
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
                          :allow_edit="true"
                          :allow_delete="true"
                          v-on:receiveHandleAdd="handleReceiveHandleAdd10"
                          v-on:receiveHandleEdit="handleReceiveHandleEdit10"
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
                          v-on:receiveHandleEdit="handleReceiveHandleEdit26"
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
                          v-on:receiveHandleEdit="handleReceiveHandleEdit18"
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
                          v-on:receiveHandleEdit="handleReceiveHandleEdit11"
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
                          v-on:receiveHandleEdit="handleReceiveHandleEdit14"
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
                          <div v-if="active_section7 === 'Price Change'" class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2" align="right">
                           <!-- <q-space></q-space> -->
                          <Button_icon :disabled="readonly_button" :flat="true" :icon="'add'" v-on:receiveClick="addButtonBarcode()" :font_color="'white'" :color="'#069857'" :text="$language('D0024')" :outline="false" size="12px" class="justify-end button_add_1" />
                          </div>
                      
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
                          v-on:receiveHandleEdit="handleReceiveHandleEdit15"
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
                          :allow_edit="true"
                          :allow_delete="true"
                          v-on:receiveHandleAdd="handleReceiveHandleAdd8"
                          v-on:receiveHandleEdit="handleReceiveHandleEdit8"
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
                          v-on:receiveHandleEdit="handleReceiveHandleEdit16"
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
                          :allow_edit="true"
                          :allow_delete="true"
                          v-on:receiveHandleAdd="handleReceiveHandleAdd19"
                          v-on:receiveHandleEdit="handleReceiveHandleEdit19"
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
                          :allow_edit="true"
                          :allow_delete="true"
                          v-on:receiveHandleAdd="handleReceiveHandleAdd17"
                          v-on:receiveHandleEdit="handleReceiveHandleEdit17"
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
                          :allow_edit="true"
                          :allow_delete="true"
                          v-on:receiveHandleAdd="handleReceiveHandleAdd25"
                          v-on:receiveHandleEdit="handleReceiveHandleEdit25"
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
                          <div v-if="active_section5 === 'Promo Discount'" class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2" align="right">
                           <!-- <q-space></q-space> -->
                          <Button_icon :disabled="readonly_button" :flat="true" v-on:receiveClick="addButtonPromoDisc" :font_color="'white'" :color="'#069857'" :text="'Create'" :outline="false" size="12px" class="justify-end button_add_1" />
                          </div>
                          <div v-if="active_section5 === 'Price Break'" class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2" align="right">
                           <!-- <q-space></q-space> -->
                          <Button_icon :disabled="readonly_button" :flat="true" :icon="'add'" v-on:receiveClick="addButtonPriceBreakC()" :font_color="'white'" :color="'#069857'" :text="$language('D0024')" :outline="false" size="12px" class="justify-end button_add_1" />
                          </div>
                          <div v-if="active_section5 === 'Permanent Discount'" class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2" align="right">
                           <!-- <q-space></q-space> -->
                          <Button_icon :disabled="readonly_button" :flat="true" :icon="'add'" v-on:receiveClick="addButtonPermanentDiscount()" :font_color="'white'" :color="'#069857'" :text="$language('D0024')" :outline="false" size="12px" class="justify-end button_add_1" />
                          </div>
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
                          v-on:receiveHandleEdit="handleReceiveHandleEdit20"
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
                          v-on:receiveHandleEdit="handleReceiveHandleEdit21"
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
                          v-on:receiveHandleEdit="handleReceiveHandleEdit22"
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
                          v-on:receiveHandleEdit="handleReceiveHandleEdit12"
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
                          v-on:receiveHandleEdit="handleReceiveHandleEdit13"
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
                          v-on:receiveHandleEdit="handleReceiveHandleEdit23"
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
                    </q-tab-panel>

                    <q-tab-panel name="Change Log" style="padding: 0px; padding-top: 10px; color: grey;overflow: hidden">
                    </q-tab-panel>

                  </q-tab-panels>

                </div>
              </div>

            </q-card-actions>
            <q-inner-loading
              :showing="showAddLoading"
              color="primary"
            />
          </q-card-section>
        </q-card>
      </q-form>

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
        
        <q-card style="width: 95vw; max-width: 950px; max-height: 90vh; margin-top: 5%;">
          <q-card-section class=" row dialog_header_custom" style="padding: 0px;">
              <div v-if="edit_barcode" class="text-h6" style="margin-top: 5px;">Edit Barcode<br></div>
              <div v-else class="text-h6" style="margin-top: 5px;padding-left: 10px">Add Barcode<br></div>
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
                                  <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-xs-12">
                                    <Label :pass_value="edit_barcode ? 'Old Barcode': $language('D0099')" />
                                  </div>
                                  <!-- :label="edit_barcode ? 'Old Barcode': $language('D0099')" -->
                                  <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                    <Input
                                    :autofocusclick="true"
                                    :no_label="false"
                                    
                                    :readonly="edit_barcode ? true:false"
                                    v-on:change="handleChangeBarcode"
                                    v-model="jsonBarcode.Barcode"
                                    :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text_required" />
                                  </div>
                                </div>
                        </div>

                            <div v-if="edit_barcode" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 four_column_left" :class="!edit_child ? 'two_column_left': ''">
                                <div class="row dialog_separator">
                                  
                                    <!-- v-on:change="handleChangeBarcode" -->
                                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-xs-12">
                                    <Label :pass_value="'New Barcode'" />
                                  </div>
                                  <!-- :label="edit_barcode ? 'Old Barcode': $language('D0099')" -->
                                  <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                    <Input
                                    :autofocusclick="true"
                                    :no_label="false"
                                    
                                    :readonly="false"
                                    v-on:change="handleChangeBarcode"
                                    v-model="jsonBarcode.NewBarcode"
                                    :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text_required" />
                                  </div>
                                
                              </div>
                            </div>

                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 four_column_left">
                                <div class="row dialog_separator">
                                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-xs-12">
                                    <Label :pass_value="'Remark'" />
                                  </div>
                                  <!-- :label="edit_barcode ? 'Old Barcode': $language('D0099')" -->
                                  <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                    <Textarea class="ignore_height" :no_label="false" :readonly="json.BillStatus==1" v-on:receiveChange="handleChange" v-model="jsonBarcode.barRemark"
                                  :dbComponentBehavior="dbComponentBehavior.remark" />
                                  </div>
                                  </div>
                                
                              </div>
                      </div>
                </div>
              </div>
            </q-form>
          </q-card-section>

          <q-card-actions class="dialog_action justify-between">
          <span class="q-pl-xs">
         <q-btn flat label="Cancel" color="primary" v-close-popup/>
          </span>
          <span class="q-pl-xs">
              <Button_icon  :readonly="false" :flat="true" :text="'Confirm'" size="15px"
                v-on:receiveClick="handleAddBarcode"/>
          </span>

          </q-card-actions>
              

          <q-inner-loading
            :showing="showAddLoading"
            color="primary"
          />
        </q-card>

      </q-dialog>

      <q-dialog v-model="show_miscellaneous_dialog" persistent :position="$q.screen.width > 599 ? 'top' : 'bottom'">
    
        <q-card style="width: 95vw; max-width: 950px; max-height: 90vh; margin-top: 5%;">
          <q-card-section class=" row dialog_header_custom" style="padding: 0px;">
              <div v-if="edit_miscellaneous" class="text-h6" style="margin-top: 5px;">Edit Miscellaneous<br></div>
              <div v-else class="text-h6" style="margin-top: 5px;">Add Miscellaneous<br></div>
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
                                        <Label :pass_value="'Group'" />
                                      </div>
                                      <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                        <Input
                                          :autofocusclick="false"
                                          :no_label="false"
                                          :readonly="false"
                                          v-on:change="handleChangeGroup"
                                          v-model="json.misc_group"
                                          :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.text : oridbComponentBehavior.text" />                        </div>
                                    </div>
                            </div>
                            <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5" style="padding-right: 10px;">
                                  <div class="row" style="align-items: center;">
                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                      <Label :pass_value="'Seq'" />
                                    </div>
                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                      <Input
                                          :autofocusclick="false"
                                          :no_label="false"
                                          :readonly="false"
                                          v-on:change="handleChangeSeq"
                                          v-model="json.seq"
                                          type="number"
                                          :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.input_number : oridbComponentBehavior.input_number" />
                                    </div>
                                    </div>
                            </div>

                            <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7" style="padding-right: 10px; padding-top: 10px;">
                              <div class="row" style="align-items: center;">
                                  <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                    <Label :pass_value="'text1'" />
                                  </div>
                                  <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                    <Input
                                      :autofocusclick="false"
                                      :no_label="false"
                                      :readonly="false"
                                      v-on:change="handleChangeText1"
                                      v-model="json.text1"
                                      :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.text : oridbComponentBehavior.text" />                        </div>
                                </div>
                            </div>

                            <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5" style="padding-right: 10px; padding-top: 10px;">
                              <div class="row" style="align-items: center;">
                                  <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                    <Label :pass_value="'Value1'" />
                                  </div>
                                  <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                    <Input
                                      :autofocusclick="false"
                                      :no_label="false"
                                      :readonly="false"
                                      v-on:change="handleChangeValue1"
                                      v-model="json.value1"
                                      :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.input_number : oridbComponentBehavior.input_number" />                        </div>
                                </div>
                            </div>

                            <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7" style="padding-right: 10px; padding-top: 10px;">
                              <div class="row" style="align-items: center;">
                                  <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                    <Label :pass_value="'text2'" />
                                  </div>
                                  <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                    <Input
                                      :autofocusclick="false"
                                      :no_label="false"
                                      :readonly="false"
                                      v-on:change="handleChangeText2"
                                      v-model="json.text2"
                                      :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.text : oridbComponentBehavior.text" />                        </div>
                                </div>
                            </div>
                            <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5" style="padding-right: 10px; padding-top: 10px;">
                              <div class="row" style="align-items: center;">
                                  <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                    <Label :pass_value="'Value2'" />
                                  </div>
                                  <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                    <Input
                                      :autofocusclick="false"
                                      :no_label="false"
                                      :readonly="false"
                                      v-on:change="handleChangeValue2"
                                      v-model="json.value2"
                                      :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.input_number : oridbComponentBehavior.input_number" />                        </div>
                                </div>
                            </div>

                            <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7" style="padding-right: 10px; padding-top: 10px;">
                              <div class="row" style="align-items: center;">
                                  <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                    <Label :pass_value="'Remarks'" />
                                  </div>
                                  <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                    <Input
                                      :autofocusclick="false"
                                      :no_label="false"
                                      :readonly="false"
                                      v-on:change="handleChangeRemark"
                                      v-model="json.remark"
                                      :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.text : oridbComponentBehavior.text" />                        </div>
                                </div>
                            </div>
                            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                              <div class="row" style="align-items: center; padding-top: 10px;" >
                                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                  <Label :pass_value="'Active'" />
                                </div>
                                <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8 q-pt-xs">
                                <Checkbox
                                  :btm_padding="true"
                                  size="xs"
                                  :disable="false"
                                  v-model="json.set_active"
                                  :true-value="1"
                                  :false-value="0"
                                  v-on:receiveChangenewVal="handleChangeSetActive" />
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
                v-on:receiveClick="handleAddMiscellaneous"/>
          </span>

          </q-card-actions>

          <q-inner-loading
            :showing="showAddLoading"
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
              <q-btn icon="close" flat round dense @click="close()" :disable="false"/>
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
                                          :readonly="false"
                                          v-on:change="handleChange"
                                          v-model="json.set_assorted_item__assorted_desc"
                                          
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
                                          :readonly="false"
                                          :no_label="true"
                                          v-model:pass_value="json.Itemcode"
                                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.select"
                                          :options="itemcode_options"
                                          v-on:receiveChange="handleChangeAssorted"
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
                                          :readonly="false"
                                          v-on:change="handleChangeAssorted"
                                          v-model="json.description"  
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
                v-on:receiveClick="handleAddAssortment"/>
          </span>

          </q-card-actions>

          <q-inner-loading
            :showing="showAddLoading"
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
      

      <q-card style="width: 95vw; max-width: 950px; max-height: 90vh; margin-top: 5%;">
      <q-card-section class=" row dialog_header_custom" style="padding: 0px;">
          <div v-if="edit_listed_branch" class="text-h6" style="margin-top: 5px;">Edit Concept<br></div>
          <div v-else class="text-h6" style="margin-top: 5px;">Add Concept<br></div>
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
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <Label :pass_value="'Concept'" />
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <SelectFilter
                            :readonly="false"
                            :no_label="true"
                            v-model:pass_value="json.branch"
                            :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.select"
                            :options="listedBranch_options"
                            v-on:receiveChange="handleChangelistedBranchConcept"
                            :result_message ="'No results'"
                            />
                        </div>
                      </div>
                    </div>
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
      <q-card-actions class="dialog_action justify-between">
          <span class="q-pl-xs">
         <q-btn flat label="Cancel" color="primary" v-close-popup/>
          </span>
          <span class="q-pl-xs">
              <Button_icon  :readonly="false" :flat="true" :text="'Confirm'" size="15px"
                v-on:receiveClick="handleAddListedBranch"/>
          </span>

          </q-card-actions>

      <q-inner-loading
        :showing="showAddLoading"
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
          
          <q-card style="width: 500px; max-width: 60vw; margin-top: 5%; border-radius:8px">
            <q-card-section class=" row dialog_header_custom" style="padding: 0px;">
                <div v-if="edit_restriction" class="text-h6" style="margin-top: 5px;">Edit Restriction By Concept<br></div>
                <div v-else class="text-h6" style="margin-top: 5px;">Add Restriction By Concept<br></div>
                <q-space />
                <q-btn icon="close" flat round dense @click="close()" :disable="false"/>
            </q-card-section>

            <q-card-section class="upload_container">
              <q-form ref="save_edit_pochild_form">
                <div class="row upload_separator_first">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <div class="row input_wrapper_left_right" style="gap:16px;padding-top:16px">

                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 " :class="!edit_restriction ? '': ''">
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
                                        <Label :pass_value="'Sales Order'" />
                                      </div>
                                      <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                        <Input
                                            :autofocusclick="false"
                                            :no_label="false"
                                            :readonly="false"
                                            v-on:change="handleChangesalesorder"
                                            v-model="json.sales_order"
                                            :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.text : oridbComponentBehavior.text" />
                                      </div>
                                      </div>
                              </div>

                              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px; padding-top: 10px;">
                                <div class="row" style="align-items: center;">
                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                      <Label :pass_value="'Purchase Order'" />
                                    </div>
                                    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                      <Input
                                        :autofocusclick="false"
                                        :no_label="false"
                                        :readonly="false"
                                        v-on:change="handleChangePo"
                                        v-model="json.purchase_order"
                                        :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.input_number : oridbComponentBehavior.input_number" />                        </div>
                                  </div>
                              </div>
                              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px; padding-top: 10px;">
                                <div class="row" style="align-items: center;">
                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                      <Label :pass_value="'IBT'" />
                                    </div>
                                    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                      <Input
                                        :autofocusclick="false"
                                        :no_label="false"
                                        :readonly="false"
                                        v-on:change="handleChangeIbt"
                                        v-model="json.ibt"
                                        :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.input_number : oridbComponentBehavior.input_number" />                        </div>
                                  </div>
                              </div>

                              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px; padding-top: 10px;">
                                <div class="row" style="align-items: center;">
                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                      <Label :pass_value="'CN'" />
                                    </div>
                                    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                      <Input
                                        :autofocusclick="false"
                                        :no_label="false"
                                        :readonly="false"
                                        v-on:change="handleChangeCN"
                                        v-model="json.cn"
                                        :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.input_number : oridbComponentBehavior.input_number" />                        </div>
                                  </div>
                              </div>

                              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px; padding-top: 10px;">
                                <div class="row" style="align-items: center;">
                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                      <Label :pass_value="'DN'" />
                                    </div>
                                    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                      <Input
                                        :autofocusclick="false"
                                        :no_label="false"
                                        :readonly="false"
                                        v-on:change="handleChangeDN"
                                        v-model="json.dn"
                                        :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.text : oridbComponentBehavior.text" />                        </div>
                                  </div>
                              </div>
                              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px; padding-top: 10px;">
                                <div class="row" style="align-items: center;">
                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                      <Label :pass_value="'CPO'" />
                                    </div>
                                    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                      <Input
                                        :autofocusclick="false"
                                        :no_label="false"
                                        :readonly="false"
                                        v-on:change="handleChangeCPO"
                                        v-model="json.cpo"
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
          <q-card-actions class="dialog_action justify-between">
            <span class="q-pl-xs">
            <q-btn flat label="Cancel" color="primary" v-close-popup/>
              </span>
              <span class="q-pl-xs">
                <Button_icon  :readonly="false" :flat="true" :text="'Confirm'" size="15px"
                  v-on:receiveClick="handleAddRestriction"/>
              </span>

          </q-card-actions>

            <q-inner-loading
              :showing="showAddLoading"
              color="primary"
            />
          </q-card>
      </q-dialog>

      <q-dialog v-model="show_replenishmentConcept_dialog" persistent :position="$q.screen.width > 599 ? 'top' : 'bottom'">
          <q-card style="width: 500px; max-width: 60vw; margin-top: 5%; border-radius:8px">
            <q-card-section class=" row dialog_header_custom" style="padding: 0px;">
                <div v-if="edit_replenishmentConcept" class="text-h6" style="margin-top: 5px;">Edit Replenishment By Concept<br></div>
                <div v-else class="text-h6" style="margin-top: 5px;">Add Replenishment By Concept<br></div>
                <q-space />
                <q-btn icon="close" flat round dense @click="close()" :disable="false"/>
            </q-card-section>

            <q-card-section class="upload_container">
              <q-form ref="save_edit_pochild_form">
                <div class="row upload_separator_first">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <div class="row input_wrapper_left_right" style="gap:16px;padding-top:16px">

                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 " :class="!edit_replenishmentConcept ? '': ''">
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
                                        <Label :pass_value="'Min Qty'" />
                                      </div>
                                      <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                        <Input
                                            :autofocusclick="false"
                                            :no_label="false"
                                            :readonly="false"
                                            v-on:change="handleChangeMinqty"
                                            v-model="json.min_qty"
                                            :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.text : oridbComponentBehavior.text" />
                                      </div>
                                      </div>
                              </div>

                              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px; padding-top: 10px;">
                                <div class="row" style="align-items: center;">
                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                      <Label :pass_value="'Max Qty'" />
                                    </div>
                                    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                      <Input
                                        :autofocusclick="false"
                                        :no_label="false"
                                        :readonly="false"
                                        v-on:change="handleChangeMaxqty"
                                        v-model="json.max_qty"
                                        :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.input_number : oridbComponentBehavior.input_number" />                        </div>
                                  </div>
                              </div>
                              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px; padding-top: 10px;">
                                <div class="row" style="align-items: center;">
                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                      <Label :pass_value="'Display QTY'" />
                                    </div>
                                    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                      <Input
                                        :autofocusclick="false"
                                        :no_label="false"
                                        :readonly="false"
                                        v-on:change="handleChangeDisplayqty"
                                        v-model="json.display_qty"
                                        :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.input_number : oridbComponentBehavior.input_number" />                        </div>
                                  </div>
                              </div>
                              
                            </div>
                          </div>
                      </div>
                  </div>
                </div>
              </q-form>
            </q-card-section>


            <!-- EDIT Replenishment ADD BUTTON -->
            <q-card-actions class="dialog_action justify-between">
            <span class="q-pl-xs">
            <q-btn flat label="Cancel" color="primary" v-close-popup/>
              </span>
              <span class="q-pl-xs">
                <Button_icon  :readonly="false" :flat="true" :text="'Confirm'" size="15px"
                  v-on:receiveClick="handleAddReplenishment"/>
              </span>

          </q-card-actions>

            <q-inner-loading
              :showing="showAddLoading"
              color="primary"
            />
          </q-card>
      </q-dialog>

      <q-dialog v-model="show_priceBreakC_dialog" persistent :position="$q.screen.width > 599 ? 'top' : 'bottom'">
        <q-card style="width: 500px; max-width: 60vw; margin-top: 5%; border-radius:8px">
          <q-card-section class=" row dialog_header_custom" style="padding: 0px;">
              <div v-if="edit_priceBreakC" class="text-h6" style="margin-top: 5px;">Edit Price Break<br></div>
              <div v-else class="text-h6" style="margin-top: 5px;">Add Price Break<br></div>
              <q-space />
              <q-btn icon="close" flat round dense @click="close()" :disable="false"/>
          </q-card-section>

          <q-card-section class="upload_container">
            <q-form ref="save_edit_pochild_form">
              <div class="row upload_separator_first">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                      <div class="row input_wrapper_left_right" style="gap:16px;padding-top:16px">

                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 " :class="!edit_priceBreakC ? '': ''">
                          <div class="row">
                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px;">
                                  <div class="row" style="align-items: center;">
                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                      <Label :pass_value="'Qty'" />
                                    </div>
                                    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                      <Input
                                          :autofocusclick="false"
                                          :no_label="false"
                                          :readonly="false"
                                          v-on:change="handleChangeQty"
                                          v-model="json.qty"
                                          :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.text : oridbComponentBehavior.text" />
                                    </div>
                                    </div>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px;padding-top: 10px;">
                                  <div class="row" style="align-items: center;">
                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                      <Label :pass_value="'Break Type'" />
                                    </div>
                                    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                      <Input
                                          :autofocusclick="false"
                                          :no_label="false"
                                          :readonly="false"
                                          v-on:change="handleChangeBreaktype"
                                          v-model="json.break_type"
                                          :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.text : oridbComponentBehavior.text" />
                                    </div>
                                    </div>
                                </div>

                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px; padding-top: 10px;">
                                  <div class="row" style="align-items: center;">
                                      <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                        <Label :pass_value="'Break Price'" />
                                      </div>
                                      <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                        <Input
                                          :autofocusclick="false"
                                          :no_label="false"
                                          :readonly="false"
                                          v-on:change="handleChangeBreakprice"
                                          v-model="json.break_price"
                                          :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.input_number : oridbComponentBehavior.input_number" />                        </div>
                                    </div>
                                </div>
                            
                          </div>
                        </div>
                    </div>
                </div>
              </div>
            </q-form>
          </q-card-section>
          <q-card-actions class="dialog_action justify-between">
            <span class="q-pl-xs">
            <q-btn flat label="Cancel" color="primary" v-close-popup/>
              </span>
              <span class="q-pl-xs">
                <Button_icon  :readonly="false" :flat="true" :text="'Confirm'" size="15px"
                  v-on:receiveClick="handleAddPriceBreakC"/>
              </span>

          </q-card-actions>

          <q-inner-loading
            :showing="showAddLoading"
            color="primary"
          />
        </q-card>
      </q-dialog>
      
      <q-dialog v-model="show_permanentDiscount_dialog" persistent :position="$q.screen.width > 599 ? 'top' : 'bottom'">
      
          <q-card style="width: 500px; max-width: 60vw; margin-top: 5%; border-radius:8px">
            <q-card-section class=" row dialog_header_custom" style="padding: 0px;">
                <div v-if="edit_priceBreakC" class="text-h6" style="margin-top: 5px;">Edit Permanent Discount<br></div>
                <div v-else class="text-h6" style="margin-top: 5px;">Add Permanent Discount<br></div>
                <q-space />
                <q-btn icon="close" flat round dense @click="close()" :disable="false"/>
            </q-card-section>

            <q-card-section class="upload_container">
              <q-form ref="save_edit_pochild_form">
                <div class="row upload_separator_first">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <div class="row input_wrapper_left_right" style="gap:16px;padding-top:16px">

                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 " :class="!edit_permanentDiscount ? '': ''">
                            <div class="row">
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
                                            v-on:change="handleChangeCardType"
                                            v-model="json.CardType"
                                            :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.text : oridbComponentBehavior.text" />
                                      </div>
                                      </div>
                              </div>
                              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px;padding-top: 10px;">
                                <div class="row" style="align-items: center;">
                                  <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                    <Label :pass_value="'Disc1 Type'" />
                                  </div>
                                  <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                    <Input
                                        :autofocusclick="false"
                                        :no_label="false"
                                        :readonly="false"
                                        v-on:change="handleChangeDisc1Type"
                                        v-model="json.Disc1Type"
                                        :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.text : oridbComponentBehavior.text" />
                                  </div>
                                  </div>
                              </div>
 
                              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px; padding-top: 10px;">
                                <div class="row" style="align-items: center;">
                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                      <Label :pass_value="'Disc1 Value'" />
                                    </div>
                                    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                      <Input
                                        :autofocusclick="false"
                                        :no_label="false"
                                        :readonly="false"
                                        v-on:change="handleChangeDisc1Value"
                                        v-model="json.Disc1Value"
                                        :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.input_number : oridbComponentBehavior.input_number" />                        </div>
                                  </div>
                              </div>
                              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px; padding-top: 10px;">
                                <div class="row" style="align-items: center;">
                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                      <Label :pass_value="'Disc2 Type'" />
                                    </div>
                                    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                      <Input
                                        :autofocusclick="false"
                                        :no_label="false"
                                        :readonly="false"
                                        v-on:change="handleChangeDisc2Type"
                                        v-model="json.Disc2Type"
                                        :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.text : oridbComponentBehavior.text" />                        </div>
                                  </div>
                              </div>
                              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px; padding-top: 10px;">
                                <div class="row" style="align-items: center;">
                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                      <Label :pass_value="'Disc2 Value'" />
                                    </div>
                                    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                      <Input
                                        :autofocusclick="false"
                                        :no_label="false"
                                        :readonly="false"
                                        v-on:change="handleChangeDisc2Value"
                                        v-model="json.Disc2Value"
                                        :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.input_number : oridbComponentBehavior.input_number" />                        </div>
                                  </div>
                              </div>
                              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px; padding-top: 10px;">
                                <div class="row" style="align-items: center;">
                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                      <Label :pass_value="'Net Price'" />
                                    </div>
                                    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                      <Input
                                        :autofocusclick="false"
                                        :no_label="false"
                                        :readonly="false"
                                        v-on:change="handleChangeNetPrice"
                                        v-model="json.net_price"
                                        :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.input_number : oridbComponentBehavior.input_number" />                        </div>
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
            <q-card-actions class="dialog_action justify-between">
            <span class="q-pl-xs">
            <q-btn flat label="Cancel" color="primary" v-close-popup/>
              </span>
              <span class="q-pl-xs">
                <Button_icon  :readonly="false" :flat="true" :text="'Confirm'" size="15px"
                  v-on:receiveClick="handleAddPermanentDiscount"/>
              </span>

          </q-card-actions>

            <q-inner-loading
              :showing="showAddLoading"
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


  </div>


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

export default{
  data() {
    return {
      generateDialog_RUOM : false,
      loading_dialog: false,
      page_count: 1,
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
        miscellaneousGroup_options: [],
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
          "label": "House Brand",
          "value": "1",
        },
        {
          "label": "Premium",
          "value": "2",
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
      retailer_guid: sessionStorage.getItem("retailer_guid") != "" && sessionStorage.getItem("retailer_guid") != "null" && sessionStorage.getItem("retailer_guid") != null ? sessionStorage.getItem("retailer_guid") : [],
      user_name: sessionStorage.getItem("user_name") != "" && sessionStorage.getItem("user_name") != "null" && sessionStorage.getItem("user_name") != null ? sessionStorage.getItem("user_name") : [],
      language: sessionStorage.getItem("language") != "" && sessionStorage.getItem("language") != "null" && sessionStorage.getItem("language") != null ? sessionStorage.getItem("language") : [],
      currency_sign: sessionStorage.getItem("currency_sign") != "" && sessionStorage.getItem("currency_sign") != "null" && sessionStorage.getItem("currency_sign") != null ? sessionStorage.getItem("currency_sign") : [],
      session_outlet_guid: sessionStorage.getItem("session_outlet_guid") != "" && sessionStorage.getItem("session_outlet_guid") != "null" && sessionStorage.getItem("session_outlet_guid") != null ? sessionStorage.getItem("session_outlet_guid") : [],
      session_user_guid: sessionStorage.getItem("getuser") != "" && sessionStorage.getItem("getuser") != "null" && sessionStorage.getItem("getuser") != null ? sessionStorage.getItem("getuser") : [],
      outlet_options: [],
      supplier_options: [],
      supplier_dropdown_options: [],
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
      item_table_column: [],
      item_table_data: [],
      sil_table_data: [],
      sil_table_column: [],
      showAddLoading: false,
      showAddLoading2: false,
      json: {
        description:'',
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
      jsonChild: {},
      jsonBarcode:{},
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
      ibtsales_ori_params: {},
      assortment_ori_params: {},
      qoh_ori_params: {},
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
      show_miscellaneous_dialog: false,
      show_assortment_dialog: false,
      show_promoDiscount_dialog: false,
      show_itemtype_dialog: false,
      show_pricetype_dialog: false,
      show_restriction_dialog: false,
      show_replenishmentConcept_dialog: false,
      show_priceBreakC_dialog: false,
      show_permanentDiscount_dialog: false,
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
    this.showAddLoading = true;

    var processedResults = await this.fetchAllData();

    var um_results = processedResults.um.detail
    // console.log('um_results',um_results)
    var supcus_results = processedResults.supcus;
    // var supcus_results = processedResults.supcus.data;
    var dept_results =processedResults.dept.detail ;
    var variant =  processedResults.variant;
    var item_size =  processedResults.item_size;
    var variant_results   = processedResults.variant;
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
        label: sample.Code+ " - " +sample.Description,
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
      mfr_description.push(obj);
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
      origin_list.push(obj);
    }

    //console.log('variant',variant)
    if(variant.total_row > 0){
    for(var i in variant_results.detail)
    {
      var sample = variant_results.detail[i];

      var obj = {
        label: sample.Colour+ ' - ' + sample.Description,
        value: sample.Colour
      }

      var obj1 = {
        label: sample.Description,
        value: sample.Colour
      }
      variant_list.push(obj);
      console.log('haha',variant_list)
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
        label: sample.Size+ ' - ' + sample.Description,
        value: sample.Size
      }

      var obj1 = {
        label: sample.Description,
        value: sample.Size
      }
      item_size_list.push(obj);
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

    for(var i in price_type_results.detail)
    {
      var sample = price_type_results.detail[i];

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
      label: sample.Code+ ' - ' + sample.Description,
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
        label: sample.Code+ ' - ' + sample.Description,
        value: sample.Code,
        MCode: sample.MCode,
      }

      brand_list.push(obj);
    }
    this.brand_options = brand_list;

    this.supplier_options = supcus_code;
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
    var Itemcode = this.$route.query.Itemcode;
    if(Itemcode)
    {
      if(this.$route.name == 'ItemmasterView')
      {
        this.page_function = 'view'
      }
      else if(this.$route.name == 'EditItemmaster')
      {
        this.page_function = 'edit'
        var itemcode_1 = this.$route.query.Itemcode;

        if(itemcode_1 == undefined || itemcode_1 == '')
        {
          this.$router.push('/ERP/purchase/Itemmaster')
          return;
        }

        var payload = {
          itemcode : itemcode_1
        }

        await this.trigger_read_item_all(payload);
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

        //comment by desmond why need fix option
        // var tem_manufacturer = this.manufacturer_options.filter((entry)=>{
        //   return entry.value == manufacturer_code
        // })

        // this.manufacturer_options = tem_manufacturer




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
          sub_description.push(obj); 
          // sub_description.push(obj1);
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


        this.json.ListCostGP = this.formatAmount(((Number(this.json.SellingPrice) - Number(this.json.StdCost)) / Number(this.json.SellingPrice)) * 100, '%', 2);
        this.json.MovingAvgCostGP = this.formatAmount(((Number(this.json.SellingPrice) - Number(this.json.AverageCost)) / Number(this.json.SellingPrice)) * 100, '%', 2);
        this.json.LastGRCostGP = this.formatAmount(((Number(this.json.SellingPrice) - Number(this.json.LastCost)) / Number(this.json.SellingPrice)) * 100, '%', 2);
        this.json.FifoCostGP = this.formatAmount(((Number(this.json.SellingPrice) - Number(this.json.FIFOCost)) / Number(this.json.SellingPrice)) * 100, '%', 2);
        
        this.json.unit_length = Number(this.json.unit_length).toFixed(6);
        this.json.unit_width = Number(this.json.unit_width).toFixed(6);
        this.json.unit_height = Number(this.json.unit_height).toFixed(6);
        this.json.weight = Number(this.json.weight).toFixed(6);
        this.json.MinPrice = this.formatAmount(filtered_transmain.MinPrice,'$');


        //wait api add in 20240917
        // this.json.stock_type = 0;
        // this.json.basic_link = 'wait api add in this field';
        // this.json.po_group = 'wait api add in this field';
        // this.json.created_by = 'wait api add in this field';
        // this.json.updated_by = 'wait api add in this field';
        // this.json.label_info = 'wait api add in this field';
        // this.json.Principle = 'wait api add in this field';
        // this.json.Division = 'wait api add in this field';
        // this.json.usedate = 'wait api add in this field';
        
        // this.json.manual_soq = 'wait api add in this field';
        // this.json.manual_order = 'wait api add in this field';
        // this.json.ibt_type = 'wait api add in this field';
        // this.json.min_day = 'wait api add in this field';
        // this.json.max_day = 'wait api add in this field';
        // this.json.lead_time = 'wait api add in this field';
        // this.json.buffer_stock_day = 'wait api add in this field';
        this.json.imrep_stock_day = 0;
        // this.json.top_sales_buffer = 'wait api add in this field';


        // var new_status = '-';

        // if(this.json.Disable == '0')
        // {
        //   var new_status = 'Active';
        // }
        // else if(this.json.Disable == '1')
        // {
        //   var new_status = 'Disable';
        // }
        // else if(this.json.Disable == '2')
        // {
        //   var new_status = 'Delisted';
        // }
        // else if(this.json.Disable == '3')
        // {
        //   var new_status = 'Non-listed';
        // }
        
        // this.json.new_status = new_status;

      }
      
    }
    else if (this.$route.name === 'CreateItemmaster' && this.type === 'duplicate_item_link'){
      this.page_function = 'create'
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

    // this.handleTableChange(table_newVal);
    // this.handleBarcodeTableChange(table_newVal);
    
    //  console.log('json', this.json)


    var filter_item_calculation = this.preference.filter((entry)=>{
      return entry.module == 'item_calculation';
    });

    this.item_calculation = filter_item_calculation.length > 0 ? (filter_item_calculation[0].enable == 1 ? true : false) : false;

    setTimeout(()=>{
      this.showAddLoading = false;
      console.log('json',this.json);
    },2500)

  //query
  var Itemcode = this.$route.query.Itemcode;
  if(Itemcode)
  {
    this.$route.name == 'EditItemmaster'
    this.Itemcode = Itemcode;
    await this.trigger_read_item_all()
  }
  else
  {
    this.$route.name == 'CreateItemmaster'
  }

    var offset = this.$route.query.offset;
    var total_row = this.$route.query.total_row;
    if(offset !== null && offset !== undefined && offset !== '' && total_row !== null && total_row !== undefined && total_row !== '')
    {
        this.offset = offset;
        this.total_row = total_row;

        this.disable_previous_button = offset <= '0' ? true : false;
        this.disable_next_button = offset >= total_row ? true : false;
    }
    await this.get_listed_branch_options()
    await this.get_poGroup_options()
    await this.getSupcusDropdown()
    await this.getItemcodeDropdown()
  },
  async created () {


  },
  created() {
    // this.initializeDefaultFields();
  },
  methods: {

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
      alert()
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
               
            }
        };
        await this.trigger_read_item_all(payload);

        //here should call api and refetch data

        this.offset = offset;
        this.disable_previous_button = this.offset <= '0' ? true : false;
        this.disable_next_button = this.offset >= this.total_row ? true : false;
    },
    handleGenerateReassignUOM()
    {
        this.generateDialog_RUOM = true;
    },
  async trigger_read_item_all(payload){

    this.showAddLoading = true;

    if(payload)
    {
      alert('1')
      var payload = payload;
    }
    else
    {
      alert('2')
      var payload = {
        "pass_json": {
          "skip": this.offset,
          "limit": 1,  
          "language": this.language,
          "Itemcode": this.Itemcode,
          "outlet_guid": this.session_outlet_guid,
          

        },
        "params": {}
      };
    }

    var object_pass = {
      "dispatch": 'itemmaster/trigger_post_read_item_all',
      "getter": 'itemmaster/get_read_item_all',
      "app": this,
      "payload": payload,
    };

    var dispatch_response_read_itemmaster_all = await this.$dispatch(object_pass);
    // console.log('dispatch_response_read_itemmaster_all', dispatch_response_read_itemmaster_all);

    if(dispatch_response_read_itemmaster_all.status){
      var Itemcode = this.$route.query.Itemcode;
      if(dispatch_response_read_itemmaster_all.response.detail.length == 1)
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
        this.json = filter;

        this.handleChangePrice();
        
        this.$route.query.Itemcode = filter.Itemcode;

        if(this.page_count > 1)
        {
          this.barcode_table_function(this.barcode_ori_params)
          this.table_function2(this.miscellaneous_ori_params)
          this.table_function3(this.status_ori_params)
          this.table_function4(this.itemtype_ori_params)
          this.table_function5(this.pricetype_ori_params)
          this.table_function6(this.bannersite_ori_params)
          this.table_function7(this.restriction_ori_params)
          this.table_function8(this.pricechange_ori_params)
          this.table_function9(this.costchangeItem_ori_params)
          this.table_function10(this.costchangeSupplier_ori_params)
          this.table_function11(this.goodreceiving_ori_params)
          this.table_function12(this.permanentdiscount_ori_params)
          this.table_function13(this.priceBreak_ori_params)
          this.table_function14(this.ibtpurchase_ori_params)
          this.table_function15(this.todayprice_ori_params)
          this.table_function16(this.threePlusOne_ori_params)
          this.table_function17(this.arsales_ori_params)
          this.table_function18(this.purchasepromo_ori_params)
          this.table_function19(this.possales_ori_params)
          this.table_function20(this.mixmatch_ori_params)
          this.table_function21(this.multibuy_ori_params)
          this.table_function22(this.promodiscount_ori_params)
          this.table_function23(this.qoh_ori_params)
          this.table_function24(this.assortment_ori_params)
          this.table_function25(this.ibtsales_ori_params)
          this.table_function26(this.po_ori_params);
        }
        this.page_count += 1;
        this.showAddLoading = false;
        }
      else
        {
          this.showNotify('negative', 'Failed to get itemmaster result')
          this.showAddLoading = false;
        }
    }

  },
    addButtonMiscellaneous(payload){
      this.show_miscellaneous_dialog = true
      this.edit_miscellaneous = false

      if(!this.edit_miscellaneous){
        this.json.set_active = 0
        this.json.seq = 0
        this.json.misc_group = ''
        this.json.text1 = ''
        this.json.value1 = 0
        this.json.text2 = ''
        this.json.value2 = 0
        this.json.remark = ''
      }

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
    addButtonAssorted(payload){
      this.show_assortment_dialog = true
      this.edit_assortment = false

      if(!this.edit_assortment){
        // this.json.set_assorted_item__assorted_desc = ''
        this.json.description = ''
        this.json.remark = ''
        this.json.Itemcode=''
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
    addButtonRestriction(payload){
      this.show_restriction_dialog = true
      this.edit_restriction = false

      if(!this.edit_restriction){
        this.json.branch = ''
        this.json.sales_order = 0
        this.json.purchase_order = ''
        this.json.dn = ''
        this.json.cn = ''
        this.json.ibt = ''
        this.json.cpo = ''

      }

    },
    addButtonReplenishmentConcept(payload){
      this.show_replenishmentConcept_dialog = true
      this.edit_replenishmentConcept = false

      if(!this.edit_replenishmentConcept){
        this.json.concept = ''
        this.json.min_qty = 0
        this.json.max_qty = 0
        this.json.display_qty = 0
        this.json.last_refno = ''

      }

    },
     addButtonPriceBreakC(payload){
      this.show_priceBreakC_dialog = true
      this.edit_priceBreakC = false

      if(!this.edit_priceBreakC){
        this.json.qty = 0
        this.json.break_type = ''
        this.json.break_price = 0
        

      }

    },
    
    addButtonPermanentDiscount(payload){
      this.show_permanentDiscount_dialog = true
      this.edit_permanentDiscount = false

      if(!this.edit_permanentDiscount){
        this.json.CardType = ''
        this.json.Disc1Type = ''
        this.json.Disc1Value = 0
        this.json.Disc2Type = ''
        this.json.Disc2Value = 0
        this.json.net_price = 0
        

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
  


    //23/09 sep listedbranch_options
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
        // console.log('branch',dispatch_response_cp_set_branch)
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
    async get_poGroup_options(){
      var payload = {
        "pass_json": {
          "TRANS_TYPE": "",
          "outlet_guid": this.session_outlet_guid,
          "language": this.language
        },
      };

      var object_pass = {
        "dispatch": 'itemmaster/trigger_post_read_master_code_transtype',
        "getter": 'itemmaster/get_read_master_code_transtype',
        "app": this,
        "payload": payload,
      };

      var dispatch_response_read_master_code_transtype_poGroup = await this.$dispatch(object_pass);

      if(dispatch_response_read_master_code_transtype_poGroup.status){
        var get_read_master_code_transtype = dispatch_response_read_master_code_transtype_poGroup.response.detail
        // console.log('branch',dispatch_response_read_master_code_transtype_poGroup)
        var arr = []
        for (var i in get_read_master_code_transtype){
          var obj = {
            "label": get_read_master_code_transtype[i].CODE_DESC,
            "value": get_read_master_code_transtype[i].CODE_GUID
          }
          this.poGroup_options.push(obj)
        }
        // this.hqloc_options = arr
      }
    },
    async genarateAddButton(){
      if(!this.edit_listed_branch){
        var payload = {
          "pass_json":{
            "outlet_guid": this.session_outlet_guid,
            "language": this.language,
            "branch": this.json.branch,
            "itemcode": this.$route.query.Itemcode
          }
        }

        var object_pass = {
          "dispatch": 'itemmaster/trigger_post_create_itemmaster_listed_branch',
          "getter": 'itemmaster/get_itemmaster_listed_branch',
          "app": this,
          "payload": payload,
        };

        var dispatch_response_create_itemmaster_listed_branch = await this.$dispatch(object_pass);

        var status = dispatch_response_create_itemmaster_listed_branch.status
        if(status){
            
              this.showNotify('positive', 'Created Successfully')
              this.show_listed_branch_dialog = false;
              this.table_function3()
            
        }else{
          var get_error_message = JSON.parse(dispatch_response_create_itemmaster_listed_branch.response)
          if(get_error_message){
            this.showNotify('negative', get_error_message.detail);
          }else{
            this.showNotify('nagative', 'Created Failed')
          }
        }
      }else{
        
        var payload = {
          "pass_json":{
            "outlet_guid": this.session_outlet_guid,
            "language": this.language,
            // "Code": this.json.Code,
            "branch": this.get_listed_branch,
          }
        }

        var object_pass = {
          "dispatch": 'itemmaster/trigger_post_update_itemmaster_listed_branch',
          "getter": 'itemmaster/get_itemmaster_listed_branch',
          "app": this,
          "payload": payload,
        };

        var dispatch_response_update_itemmaster_listed_branch = await this.$dispatch(object_pass);
        var status = dispatch_response_update_itemmaster_listed_branch.status
        if(status){
            this.showNotify('positive', 'Updated Successfully')
            this.show_listed_branch_dialog = false;
            this.table_function3()
        }else{
          var get_error_message = JSON.parse(dispatch_response_update_itemmaster_listed_branch.response)
          if(get_error_message){
            this.showNotify('negative', get_error_message.detail);
          }else{
            this.showNotify('nagative', 'Updated Failed')
          }
        }
      }
    },  
    handleShowCreateItemMaster(){
      this.$router.push({ name: "CreateItemmaster" });
    },
    handleTableChange1: function(newVal)
    {
          var new_params = this.$pluginsTableParams(newVal)

          var payload = {
              params : new_params
          };

          this.barcode_ori_params = payload;
          this.barcode_table_function(payload);
    },
    handleTableChange2: function(newVal)
    {
          var new_params = this.$pluginsTableParams(newVal)

          var payload = {
              params : new_params
          };

          this.miscellaneous_ori_params = payload;
          this.table_function2(payload);
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
    handleTableChange4: function(newVal)
    {
          var new_params = this.$pluginsTableParams(newVal)

          var payload = {
              params : new_params
          };

          this.itemtype_ori_params = payload;
          this.table_function4(payload);
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
    handleTableChange6: function(newVal)
    {
          var new_params = this.$pluginsTableParams(newVal)

          var payload = {
              params : new_params
          };

          this.bannersite_ori_params = payload;
          this.table_function6(payload);
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
    handleTableChange8: function(newVal)
    {
          var new_params = this.$pluginsTableParams(newVal)

          var payload = {
              params : new_params
          };

          this.pricechange_ori_params = payload;
          this.table_function8(payload);
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
    handleTableChange10: function(newVal)
    {
          var new_params = this.$pluginsTableParams(newVal)

          var payload = {
              params : new_params
          };

          this.costchangeSupplier_ori_params = payload;
          this.table_function10(payload);
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
    handleTableChange12: function(newVal)
    {
          var new_params = this.$pluginsTableParams(newVal)

          var payload = {
              params : new_params
          };

          this.permanentdiscount_ori_params = payload;
          this.table_function12(payload);
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
    handleTableChange14: function(newVal)
    {
          var new_params = this.$pluginsTableParams(newVal)

          var payload = {
              params : new_params
          };

          this.ibtpurchase_ori_params = payload;
          this.table_function14(payload);
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
    handleTableChange16: function(newVal)
    {
          var new_params = this.$pluginsTableParams(newVal)

          var payload = {
              params : new_params
          };

          this.threePlusOne_ori_params = payload;
          this.table_function16(payload);
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
    handleTableChange18: function(newVal)
    {
          var new_params = this.$pluginsTableParams(newVal)

          var payload = {
              params : new_params
          };

          this.purchasepromo_ori_params = payload;
          this.table_function18(payload);
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
    handleTableChange20: function(newVal)
    {
          var new_params = this.$pluginsTableParams(newVal)

          var payload = {
              params : new_params
          };

          this.mixmatch_ori_params = payload;
          this.table_function20(payload);
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
    handleTableChange22: function(newVal)
    {
          var new_params = this.$pluginsTableParams(newVal)

          var payload = {
              params : new_params
          };

          this.promodiscount_ori_params = payload;
          this.table_function22(payload);
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
    handleTableChange24: function(newVal)
    {
          var new_params = this.$pluginsTableParams(newVal)

          var payload = {
              params : new_params
          };

          this.assortment_ori_params = payload;
          this.table_function24(payload);
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
    handleTableChange26: function(newVal)
    {
          var new_params = this.$pluginsTableParams(newVal)

          var payload = {
              params : new_params
          };

          this.po_ori_params = payload;
          this.table_function26(payload);
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
    close()
      {
        this.edit_barcode = false;
        // this.jsonBarcode = {};
        this.show_barcode_dialog = false;
        this.edit_listed_branch = false;
        // this.jsonListedBranch = {};
        this.show_listed_branch_dialog = false;
        this.show_miscellaneous_dialog = false;
        this.show_assortment_dialog = false;
        this.show_itemtype_dialog = false;
        this.show_pricetype_dialog = false;
        this.show_restriction_dialog = false;
        this.show_replenishmentConcept_dialog = false;
        this.show_priceBreakC_dialog = false;
        this.show_permanentDiscount_dialog = false;
        
      },
    addButtonBarcode(){
      // this.handleAddBarcode();
        this.show_barcode_dialog = true;
         console.log('add Barcode');
         this.jsonBarcode.barRemark = '';
      },
    addListedBranch(){      
        this.show_config_status_dialog3 = true;
         console.log('add Listed Branch');
        //  this.jsonListedBranch.branch = '';
      },
    async handleChangeSCode (newval) {
      this.action_change_selecting = true

      await this.getPrinciple();

    },
    
    handleReceiveHandleEdit1(pass_payload)
    {
      // console.log('pass_payload', pass_payload);
      
      // this.jsonBarcode.Barcode = pass_payload.row.Barcode
      // this.json.NewBarcode = pass_payload.row.Barcode_new
      // this.show_barcode_dialog = true;
      //  this.edit_child = true;
      // this.edit_barcode = true;
      // this.showAddLoading = true;
      // this.showAddLoading = false;

      // var mobile = this.$q.screen.width < 600
      //  console.log('pass_payload',payload);
        
        this.show_barcode_dialog = true;
        this.jsonBarcode.Barcode = pass_payload.row.Barcode
        this.jsonBarcode.barRemark = pass_payload.row.barRemark
        // this.jsonBarcode.NewBarcode = this.jsonBarcode.Barcode
        this.edit_child = true;
        this.edit_barcode = true;
        this.showAddLoading = true;
        // this.jsonBarcode = pass_payload
        console.log('payload',pass_payload);

        this.showAddLoading = false;

    },
    handleReceiveHandleEdit2(pass_payload){
      this.showAddLoading = true;

      this.json.mis_guid = pass_payload.row.mis_guid
      this.json.seq = pass_payload.row.seq
      this.json.set_active = pass_payload.row.set_active
      this.json.misc_group = pass_payload.row.misc_group
      this.json.text1 = pass_payload.row.text1
      this.json.text2 = pass_payload.row.text2
      this.json.value1 = pass_payload.row.value1
      this.json.value2 = pass_payload.row.value2
      this.json.remark = pass_payload.row.remark

      var mobile = this.$q.screen.width < 600

      this.show_miscellaneous_dialog = true;
      this.edit_child = true;
      this.edit_miscellaneous = true;
      // this.jsonBarcode = payload

      setTimeout(()=>{
          this.showAddLoading = false;
        },2500)
    },
    async handleAddMiscellaneous(){
        if(!this.edit_miscellaneous){
          var payload = {
            "pass_json":{
              "outlet_guid": this.session_outlet_guid,
              "language": this.language,
              "itemcode": this.$route.query.Itemcode,
              "mis_guid": this.json.mis_guid,
              "seq": this.json.seq,
              "text1": this.json.text1,
              "value1": this.json.value1,
              "text2": this.json.text2,
              "value2": this.json.value2,
              "remark": this.json.remark,
              "set_active": this.json.set_active,
              "misc_group": this.json.misc_group,
            }
          }

          var object_pass = {
            "dispatch": 'itemmaster/trigger_post_create_itemmaster_miscellaneous',
            "getter": 'itemmaster/get_itemmaster_miscellaneous',
            "app": this,
            "payload": payload,
          };

          var dispatch_response_create_itemmaster_miscellaneous = await this.$dispatch(object_pass);
          var status = dispatch_response_create_itemmaster_miscellaneous.status

          if(status){
            this.showNotify('positive', 'Created Successfully')
            this.table_function2(this.ori_params)
          }else{
            var get_error_message = JSON.parse(dispatch_response_create_itemmaster_miscellaneous.response)
              if(get_error_message){
                this.showNotify('negative', get_error_message.detail);
              }else{
                this.showNotify('nagative', 'Created Failed')
              }
          }
        }else{
          var payload = {
            "pass_json":{
              "outlet_guid": this.session_outlet_guid,
              "language": this.language,
              "itemcode": this.$route.query.itemcode,
              "mis_guid": this.json.mis_guid,
              "seq": this.json.seq,
              "text1": this.json.text1,
              "value1": this.json.value1,
              "text2": this.json.text2,
              "value2": this.json.value2,
              "remark": this.json.remark,
              "set_active": this.json.set_active,
              "misc_group": this.json.misc_group,
            }
          }

          var object_pass = {
            "dispatch": 'itemmaster/trigger_post_update_itemmaster_miscellaneous',
            "getter": 'itemmaster/get_itemmaster_miscellaneous',
            "app": this,
            "payload": payload,
          };

          var dispatch_response_update_itemmaster_miscellaneous = await this.$dispatch(object_pass);
          var status = dispatch_response_update_itemmaster_miscellaneous.status

          if(status){
            this.showNotify('positive', 'Updated Successfully')
            this.table_function2(this.ori_params)
          }else{
            var get_error_message = JSON.parse(dispatch_response_update_itemmaster_miscellaneous.response)
              if(get_error_message){
                this.showNotify('negative', get_error_message.detail);
              }else{
                this.showNotify('nagative', 'Updated Failed')
              }
            }
        }
        

        this.show_miscellaneous_dialog = false
    },
    
    async handleAddAssortment(){
        if(!this.edit_assortment){
          var payload = {
            "pass_json":{
              "outlet_guid": this.session_outlet_guid,
              "language": this.language,
              "itemcode": this.$route.query.Itemcode,
              "assorted_guid": this.assorted_guid,
              "item_guid": this.item_guid,
              "set_assorted_item__assorted_desc": this.set_assorted_item__assorted_desc,
              "description": this.json.description,
              "remark": this.json.remark,
            }
          }

          var object_pass = {
            "dispatch": 'itemmaster/trigger_post_create_set_assorted_item',
            "getter": 'itemmaster/get_set_assorted_item',
            "app": this,
            "payload": payload,
          };

          var dispatch_response_create_set_assorted_item = await this.$dispatch(object_pass);
          var status = dispatch_response_create_set_assorted_item.status

          if(status){
            this.showNotify('positive', 'Created Successfully')
            this.table_function24(this.ori_params)
          }else{
            var get_error_message = JSON.parse(dispatch_response_create_set_assorted_item.response)
              if(get_error_message){
                this.showNotify('negative', get_error_message.detail);
              }else{
                this.showNotify('nagative', 'Created Failed')
              }
          }
        }else{
          var payload = {
            "pass_json":{
              "outlet_guid": this.session_outlet_guid,
              "language": this.language,
              "itemcode": this.$route.query.itemcode,
              "set_assorted_item__assorted_desc": this.set_assorted_item__assorted_desc,
              "description": this.json.description,
              "remark": this.json.remark,
            }
          }

          var object_pass = {
            "dispatch": 'itemmaster/trigger_post_update_set_assorted_item',
            "getter": 'itemmaster/get_set_assorted_item',
            "app": this,
            "payload": payload,
          };

          var dispatch_response_update_set_assorted_item = await this.$dispatch(object_pass);
          var status = dispatch_response_update_set_assorted_item.status

          if(status){
            this.showNotify('positive', 'Updated Successfully')
            this.table_function24(this.ori_params)
          }else{
            var get_error_message = JSON.parse(dispatch_response_update_set_assorted_item.response)
              if(get_error_message){
                this.showNotify('negative', get_error_message.detail);
              }else{
                this.showNotify('nagative', 'Updated Failed')
              }
            }
        }
        

        this.show_assortment_dialog = false
    },
    async handleAddPromoDisc(){
        if(!this.edit_promodiscount){
          var payload = {
            "pass_json":{
              "outlet_guid": this.session_outlet_guid,
              "language": this.language,
              "itemcode": this.$route.query.Itemcode,
              "assorted_guid": this.json.assorted_guid,
              "item_guid": this.json.item_guid,
              "set_assorted_item__assorted_desc": this.json.set_assorted_item__assorted_desc,
              "description": this.json.description,
              "remark": this.json.remark,
            }
          }

          var object_pass = {
            "dispatch": 'itemmaster/trigger_post_create_set_assorted_item',
            "getter": 'itemmaster/get_set_assorted_item',
            "app": this,
            "payload": payload,
          };

          var dispatch_response_create_set_assorted_item = await this.$dispatch(object_pass);
          var status = dispatch_response_create_set_assorted_item.status

          if(status){
            this.showNotify('positive', 'Created Successfully')
            this.table_function24(this.ori_params)
          }else{
            var get_error_message = JSON.parse(dispatch_response_create_set_assorted_item.response)
              if(get_error_message){
                this.showNotify('negative', get_error_message.detail);
              }else{
                this.showNotify('nagative', 'Created Failed')
              }
          }
        }else{
          var payload = {
            "pass_json":{
              "outlet_guid": this.session_outlet_guid,
              "language": this.language,
              "itemcode": this.$route.query.itemcode,
              "set_assorted_item__assorted_desc": this.json.set_assorted_item__assorted_desc,
              "description": this.json.description,
              "remark": this.json.remark,
            }
          }

          var object_pass = {
            "dispatch": 'itemmaster/trigger_post_update_set_assorted_item',
            "getter": 'itemmaster/get_set_assorted_item',
            "app": this,
            "payload": payload,
          };

          var dispatch_response_update_set_assorted_item = await this.$dispatch(object_pass);
          var status = dispatch_response_update_set_assorted_item.status

          if(status){
            this.showNotify('positive', 'Updated Successfully')
            this.table_function24(this.ori_params)
          }else{
            var get_error_message = JSON.parse(dispatch_response_update_set_assorted_item.response)
              if(get_error_message){
                this.showNotify('negative', get_error_message.detail);
              }else{
                this.showNotify('nagative', 'Updated Failed')
              }
            }
        }
        

        this.show_promoDiscount_dialog = false
    },
    async handleAddPriceBreakC(){
        if(!this.edit_priceBreakC){
          var payload = {
            "pass_json":{
              "outlet_guid": this.session_outlet_guid,
              "language": this.language,
              "itemcode": this.$route.query.Itemcode,
              "break_price": this.json.break_price,
              "break_type": this.json.break_type,
              "qty": this.json.qty,
            }
          }

          var object_pass = {
            "dispatch": 'itemmaster/trigger_post_create_itemmaster_miscellaneous',
            "getter": 'itemmaster/get_itemmaster_miscellaneous',
            "app": this,
            "payload": payload,
          };

          var dispatch_response_create_itemmaster_miscellaneous = await this.$dispatch(object_pass);
          var status = dispatch_response_create_itemmaster_miscellaneous.status

          if(status){
            this.showNotify('positive', 'Created Successfully')
            this.table_function2(this.ori_params)
          }else{
            var get_error_message = JSON.parse(dispatch_response_create_itemmaster_miscellaneous.response)
              if(get_error_message){
                this.showNotify('negative', get_error_message.detail);
              }else{
                this.showNotify('nagative', 'Created Failed')
              }
          }
        }else{
          var payload = {
            "pass_json":{
              "outlet_guid": this.session_outlet_guid,
              "language": this.language,
              "itemcode": this.$route.query.itemcode,
              "pricebreak_guid": this.json.pricebreak_guid,
              "break_type": this.json.break_type,
              "break_price": this.json.break_price,
              "pricebreak_guid_c": this.json.pricebreak_guid_c,
            }
          }

          var object_pass = {
            "dispatch": 'itemmaster/trigger_post_update_itemmaster_miscellaneous',
            "getter": 'itemmaster/get_itemmaster_miscellaneous',
            "app": this,
            "payload": payload,
          };

          var dispatch_response_update_itemmaster_miscellaneous = await this.$dispatch(object_pass);
          var status = dispatch_response_update_itemmaster_miscellaneous.status

          if(status){
            this.showNotify('positive', 'Updated Successfully')
            this.table_function2(this.ori_params)
          }else{
            var get_error_message = JSON.parse(dispatch_response_update_itemmaster_miscellaneous.response)
              if(get_error_message){
                this.showNotify('negative', get_error_message.detail);
              }else{
                this.showNotify('nagative', 'Updated Failed')
              }
            }
        }
        

        this.show_miscellaneous_dialog = false
    },
    
    async handleAddListedBranch(){
        if(!this.edit_listed_branch){
          var payload = {
            "pass_json":{
              "outlet_guid": this.session_outlet_guid,
              "language": this.language,
              "itemcode": this.$route.query.Itemcode,
              "branch": this.json.branch,
            }
          }

          var object_pass = {
            "dispatch": 'itemmaster/trigger_post_create_itemmaster_listed_branch',
            "getter": 'itemmaster/get_itemmaster_listed_branch',
            "app": this,
            "payload": payload,
          };

          var dispatch_response_create_itemmaster_listed_branch = await this.$dispatch(object_pass);
          var status = dispatch_response_create_itemmaster_listed_branch.status

          if(status){
            this.showNotify('positive', 'Created Successfully')
            this.table_function3(this.ori_params)
          }else{
            var get_error_message = JSON.parse(dispatch_response_create_itemmaster_listed_branch.response)
              if(get_error_message){
                this.showNotify('negative', get_error_message.detail);
              }else{
                this.showNotify('negative', 'Created Failed')
              }
          }
        }else{
          var payload = {
            "pass_json":{
              "outlet_guid": this.session_outlet_guid,
              "language": this.language,
              "itemcode": this.$route.query.itemcode,
              "branch": this.json.branch,
              
            }
          }

          var object_pass = {
            "dispatch": 'itemmaster/trigger_post_update_itemmaster_listed_branch',
            "getter": 'itemmaster/get_itemmaster_listed_branch',
            "app": this,
            "payload": payload,
          };

          var dispatch_response_update_itemmaster_listed_branch = await this.$dispatch(object_pass);
          var status = dispatch_response_update_itemmaster_listed_branch.status

          if(status){
            this.showNotify('positive', 'Updated Successfully')
            this.table_function3(this.ori_params)
          }else{
            var get_error_message = JSON.parse(dispatch_response_update_itemmaster_listed_branch.response)
              if(get_error_message){
                this.showNotify('negative', get_error_message.detail);
              }else{
                this.showNotify('negative', 'Updated Failed')
              }
            }
        }
        

        this.show_miscellaneous_dialog = false
    },
    handleReceiveHandleEdit3(pass_payload)
    {
      this.showAddLoading = true;

     
        this.get_listed_branch = pass_payload.row.branch
      
        this.show_listed_branch_dialog = true;
        this.edit_listed_branch = true
        this.edit_child = true;

        var test = this.listedBranch_options.filter((entry)=>{
          return entry.value == pass_payload.row.branch
        })
        this.json.Code = test[0].label

        setTimeout(()=>{
          this.showAddLoading = false;
        },2000)

      
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
    handleReceiveHandleEdit6(pass_payload){
      this.showAddLoading = true;

      this.json.im_rep_guid = pass_payload.row.im_rep_guid
      this.json.concept = pass_payload.row.concept
      this.json.min_qty = pass_payload.row.min_qty
      this.json.max_qty = pass_payload.row.max_qty
      this.json.display_qty = pass_payload.row.display_qty
    
      var mobile = this.$q.screen.width < 600

      this.show_replenishmentConcept_dialog = true;
      this.edit_child = true;
      this.edit_replenishmentConcept = true;
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
    handleReceiveHandleEdit13(pass_payload){
      this.showAddLoading = true;

      this.json.pricebreak_guid_c = pass_payload.row.pricebreak_guid_c
      this.json.break_type = pass_payload.row.break_type
      this.json.qty = pass_payload.row.qty
      this.json.break_price = pass_payload.row.break_price
    
      var mobile = this.$q.screen.width < 600

      this.show_priceBreakC_dialog = true;
      this.edit_child = true;
      this.edit_priceBreakC = true;
      // this.jsonBarcode = payload

      setTimeout(()=>{
          this.showAddLoading = false;
        },2500)
    },
    handleReceiveHandleEdit12(pass_payload){
      this.showAddLoading = true;

      this.json.ItemDisc_Guid = pass_payload.row.ItemDisc_Guid
      this.json.CardType = pass_payload.row.CardType
      this.json.Disc1Type = pass_payload.row.Disc1Type
      this.json.net_price = pass_payload.row.net_price
      this.json.Disc1Value = pass_payload.row.Disc1Value
      this.json.Disc2Type = pass_payload.row.Disc2Type
      this.json.Disc2Value = pass_payload.row.Disc2Value
    
      var mobile = this.$q.screen.width < 600

      this.show_permanentDiscount_dialog = true;
      this.edit_child = true;
      this.edit_permanentDiscount = true;
      // this.jsonBarcode = payload

      setTimeout(()=>{
          this.showAddLoading = false;
        },2500)
    },
    handleReceiveHandleEdit24(pass_payload)
    {
      this.showAddLoading = true;

     
        this.get_assorted = pass_payload.row.assorted_guid
      
        this.show_assortment_dialog = true;
        this.edit_assortment = true
        this.edit_child = true;

        // var test = this.itemcode_options.filter((entry)=>{
        //   return entry.value == pass_payload.row.assorted_guid
        // })
        // this.json.itemcode_options = test[0].label

        setTimeout(()=>{
          this.showAddLoading = false;
        },2000)

      
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

        this.json.ListCostGP = isNaN(ListCostGP) ? '0.00' : this.formatAmount(ListCostGP, '%', '2');
        this.json.MovingAvgCostGP = isNaN(MovingAvgCostGP) ? '0.00' : this.formatAmount(MovingAvgCostGP, '%', '2');
        this.json.LastGRCostGP = isNaN(LastGRCostGP) ? '0.00' : this.formatAmount(LastGRCostGP, '%', '2');
        this.json.FifoCostGP = isNaN(FifoCostGP) ? '0.00' : this.formatAmount(FifoCostGP, '%', '2');

        this.json.usedate = this.formatAmount(this.unformatAmount(this.json.usedate, '$', '0'), '$', '0');
        this.json.YieldRatio = this.formatAmount(this.unformatAmount(this.json.YieldRatio, '$', '0'), '$', '0');
        this.json.WeightTraceQtyUOM = this.formatAmount(this.unformatAmount(this.json.WeightTraceQtyUOM, '$', '0'), '$', '0');
        this.json.WeightTraceQty = this.formatAmount(this.unformatAmount(this.json.WeightTraceQty, '$', '0'), '$', '0');
        this.json.unit_weight = this.formatAmount(this.unformatAmount(this.json.unit_weight, '$', '6'), '$', '6');;
        this.json.unit_volume = this.formatAmount(this.unformatAmount(this.json.unit_volume, '$', '6'), '$', '6');;
        this.json.unit_length = this.formatAmount(this.unformatAmount(this.json.unit_length, '$', '6'), '$', '6');;
        this.json.unit_width = this.formatAmount(this.unformatAmount(this.json.unit_width, '$', '6'), '$', '6');;
        this.json.unit_height = this.formatAmount(this.unformatAmount(this.json.unit_height, '$', '6'), '$', '6');;
        this.json.Point = this.formatAmount(this.unformatAmount(this.json.Point, '$', '0'), '$', '0');

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
      console.log('Received change:', value);
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
          this.active_section = 'Supplier';
        }
      });
      
    },
    handleActiveClickSection(section)
    {
      this.active_section = section;
    //   if (section) {
    //   this.active_section = section;
    // }
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
    async getSupcusDropdown(payload)
    {
      var payload = {
        "pass_json": {
          "Code": "",
          "outlet_guid": this.session_outlet_guid,
          "language": this.language,
          "Type": 'S'
        },
      };

      var object_pass = {
        "dispatch": 'itemmaster/trigger_post_get_supcus_dropdown',
        "getter": 'itemmaster/get_supcus_dropdown',
        "app": this,
        "payload": payload,
      };

      var dispatch_response_get_supcus_dropdown = await this.$dispatch(object_pass);

      if(dispatch_response_get_supcus_dropdown.status){
        var get_supcus_dropdown = dispatch_response_get_supcus_dropdown.response.detail
        console.log('supcus_all_dropdown',dispatch_response_get_supcus_dropdown)
        var arr = []
        for (var i in get_supcus_dropdown){
          var obj = {
            "label": get_supcus_dropdown[i].Code + ' - ' + get_supcus_dropdown[i].Name,
            "value": get_supcus_dropdown[i].Code
          }
          this.supplier_dropdown_options.push(obj)
        }
        // this.hqloc_options = arr
      }
    },
    handleChangeAssorted() {
    if (this.selectedItem) {
      this.json.Itemcode = this.selectedItem.value; // Assign selected itemcode
      this.json.description = this.selectedItem.description; // Assign description from the selected item
    }
  },
    async getItemcodeDropdown(payload)
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
        console.log('get_read_item_all_dropdown',dispatch_response_get_read_item_all_dropdown)
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
    async getDivision()
    { 
      var payload = {}
      // console.log(payload)
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
        // console.log(payload) //check which payload pass
        
        var object_pass = {
        "dispatch": 'itemmaster/trigger_post_get_set_group_dept', //refer to path/function_name instore actions.js
        "getter": 'itemmaster/get_set_group_dept', //refer to path/function_name in storegetters.js
        "app": this, //compulsory passed variable
        "payload": payload //payload that needed to use in store actions.js
        };
        var dispatch_response = await this.$dispatch(object_pass);
        if(dispatch_response.status)
          {
            // console.log('reponse',dispatch_response)
              
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
            // console.log('div' ,division_code)
            this.division_options = division_code
          }else
          {
              console.log('haha wrong',dispatch_response.status)
          }
    },
    async getPrinciple()
    {
      // console.log('Fetching division options for department:', this.json.Dept); 
      var payload = {}
      // console.log(payload)
      payload.outlet_guid= this.session_outlet_guid;
      payload.language= this.language;
      payload.sort_type= "asc";
      // payload.link_guid= "";
      payload.supcus_guid= this.supcus_guid;
      

        var payload = {
          "pass_json": payload//pass_json should be the field or data wish to be created.
        };
        // console.log(payload) //check which payload pass
        
        var object_pass = {
        "dispatch": 'itemmaster/trigger_post_get_supcus_link', //refer to path/function_name instore actions.js
        "getter": 'itemmaster/get_supcus_link', //refer to path/function_name in storegetters.js
        "app": this, //compulsory passed variable
        "payload": payload //payload that needed to use in store actions.js
        };
        var dispatch_response = await this.$dispatch(object_pass);
        if(dispatch_response.status)
          {
            console.log('reponse',dispatch_response)
              
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
            // console.log('div' ,division_code)
            
             console.log('principle options set:', this.principle_code);
            }
           
          else
          {
              console.log('haha wrong',dispatch_response.status)
          }
    },
 
    
    async getManufacturer_new(payload)
    { 
      payload.Code= "";
      payload.Description="";
      payload.outlet_guid= this.session_outlet_guid;
      payload.language= this.language


        var payload = {
          "pass_json": payload//pass_json should be the field or data wish to be created.
        };
            var object_pass = {
        "dispatch": 'itemmaster/trigger_read_manufacturer_new', //refer to path/function_name instore actions.js
        "getter": 'itemmaster/get_manufacturer_new', //refer to path/function_name in storegetters.js
        "app": this, //compulsory passed variable
        "payload": payload //payload that needed to use in store actions.js
        };
        var dispatch_response = await this.$dispatch(object_pass);
        if(dispatch_response.status)
          {
                //success condition
          }else
          {
              //fail condition
          }
      // return await this.$store.dispatch('itemmaster/trigger_read_maufacturer', payload).then(() => {
      //   var data = JSON.parse(JSON.stringify(this.$store.getters['itemmaster/get_manufacturer']));
      //   return data;
      // });

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
      if(this.$route.name.endsWith('Itemmaster'))
      {
        this.$router.push("Itemmaster");
      }
      else if(this.$route.name.endsWith('GoodsReceiving'))
      {
        this.$router.push("GoodsReceiving");
      }

    },
    
    async barcode_table_function(ori_payload){
        var payload = ori_payload.params
        console.log('barcode payload', payload);
        
       
        // payload.skip = payload.offset;  
        payload.itemcode = this.$route.query.Itemcode
        payload.outlet_guid = this.session_outlet_guid;//session
        payload.language = this.language;  
               
        var payload = {
              "pass_json": payload,
              "params": {}
        };

        var xpayload = {
        "pass_json":{}
        }
        // console.log('xpayload', xpayload);
        // console.log('payload', payload)

        var object_pass = {
            "dispatch": 'itemmaster/trigger_read_barcode_by_itemcode_new', //refer to path/function_name in store actions.js
            "getter": 'itemmaster/get_read_barcode_by_itemcode_new', //refer to path/function_name in store getters.js
            "app": this, //compulsory passed variable
            "payload": payload //payload that needed to use in store actions.js
          };
        // console.log('object_pass_barcode', object_pass);

        var dispatch_response_barcode = await this.$dispatch(object_pass);
        // console.log('dispatch_response_barcode', dispatch_response_barcode);
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
          console.log('results_barcode', results);
          // if (Array.isArray(results) && results.includes('someValue')) {
          //   console.log('The value is in the results array');
          // }

          if(this.$route.name == 'CreateItemmaster'){
              this.table_data1 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
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
                    // "headerStyle": "max-width: 50px; text-align: center;",
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
            {
                name: 'Itemcode',
                required: true,
                label: 'Itemcode',
                align: 'center',
                sortable: true,
                field: 'Itemcode',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;',
            },
            {
                name: 'barcode_type',
                required: true,
                label: 'Type',
                align: 'center',
                sortable: true,
                field: 'barcode_type',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;',
            },
            {
                name: 'primary_barcode',
                required: true,
                label: 'Primary',
                align: 'left',
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

        this.table_column1 = table_column1;
    },
    async table_function2(ori_payload){
        var payload = ori_payload.params

        // console.log('miscellaneous payload', payload);
        payload.outlet_guid= this.session_outlet_guid;
        payload.language= this.language;
        payload.skip=payload.offset;

        
        payload.language = this.language;
        
        payload.itemcode = this.$route.query.Itemcode;
        if(payload.ordering == "")
        {
            payload.ordering = "-created_at"
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

        // payload.branch = "";
        // payload.ItemType= "";
          
        // payload.text1= "";
        // payload.value1= 0;
        // payload.text2= "";
        // payload.value2= 0;
        // payload.remark= "";
          // payload.mis_guid=this.mis_guid;
          // payload.misc_group= "";

        var payload = {
              "pass_json": payload,//pass_json should be the field or data wish to be created.
              "params": {}
        };

        var xpayload = {
        "pass_json":{}
        }
        // console.log('xpayload', xpayload);
        // console.log('miscellaneous payload', payload)

        var object_pass = {
          "dispatch": 'itemmaster/trigger_post_get_itemmaster_miscellaneous',
          "getter": 'itemmaster/get_itemmaster_miscellaneous',
          "app": this,
          "payload": payload,
        };
        // console.log('miscellaneous_object_pass', object_pass);

        var dispatch_response_get_itemmaster_miscellaneous = await this.$dispatch(object_pass);
        // console.log('dispatch_response_get_itemmaster_miscellaneous', dispatch_response_get_itemmaster_miscellaneous);
        var status = dispatch_response_get_itemmaster_miscellaneous.status

        if(status == "failed"){
          this.table_data2 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
        }else{
          var results = dispatch_response_get_itemmaster_miscellaneous.response.detail;
          console.log('miscellaneous results', results);
          // if (Array.isArray(results) && results.includes('someValue')) {
          //   console.log('The value is in the results array');
          // }

          if(this.$route.name == 'CreateItemmaster'){
              this.table_data2 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
          }
          // else if(this.page_function == 'EditItemmaster'){
              this.table_data2 = {
              "data": {
                "count": dispatch_response_get_itemmaster_miscellaneous.response.total_row,
                "next": null,
                "previous": null,
                "results": dispatch_response_get_itemmaster_miscellaneous.response.detail
              }
            };
          // }


          this.results = dispatch_response_get_itemmaster_miscellaneous.response.detail;

          
        }

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
                    // "headerStyle": "max-width: 50px; text-align: center;",
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
                name: 'created_at',
                required: true,
                label: 'Created at',
                align: 'center',
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
            {
                name: 'updated_at',
                required: true,
                label: 'Updated at',
                align: 'center',
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
            
        ];

        this.table_column2 = table_column2;
    },  
    async table_function3(ori_payload){
        var payload = ori_payload.params
        // console.log('status_listedBranch payload', payload);
        
        payload.outlet_guid = this.session_outlet_guid;//session
        payload.language= this.language;
        payload.skip = payload.offset;  
        payload.itemcode = this.$route.query.Itemcode;
        
       
        payload.branch= payload.branch;
        payload.ItemType = payload.ItemType;
        payload.imlb_status = payload.imlb_status;
       
        

        var payload = {
              "pass_json": payload,//pass_json should be the field or data wish to be created.
              "params": {}
        };

        var xpayload = {
        "pass_json":{}
        }
        // console.log('xpayload', xpayload);
        // console.log('status_listed_branch_payload', payload)

        var object_pass = {
          "dispatch": 'itemmaster/trigger_post_get_itemmaster_listed_branch',
          "getter": 'itemmaster/get_itemmaster_listed_branch',
          "app": this,
          "payload": payload,
        };
        // console.log('status_listed_branch_object_pass', object_pass);

        var dispatch_response_listed_branch = await this.$dispatch(object_pass);
        // console.log('dispatch_response_listed_branch', dispatch_response_listed_branch);
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
          console.log('listed_branch_results', results);
          // if (Array.isArray(results) && results.includes('someValue')) {
          //   console.log('The value is in the results array');
          // }

          if(this.$route.name == 'CreateItemmaster'){
              this.table_data3 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
          }
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
                    // "headerStyle": "max-width: 50px; text-align: center;",
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
            {
                name: 'branch',
                required: true,
                label: 'Concept',
                align: 'left',
                sortable: true,
                field: 'branch',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'created_at',
                required: true,
                label: 'Created at',
                align: 'center',
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
            {
                name: 'updated_at',
                required: true,
                label: 'Updated at',
                align: 'center',
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
           
        ];

        this.table_column3 = table_column3;
    },
    async table_function4(ori_payload){
        var payload = ori_payload.params
        console.log('Item Type payload', payload);
        console.log('session',this.session_outlet_guid)
        payload.outlet_guid= this.session_outlet_guid;
        payload.language= this.language;
        payload.skip = payload.offset;
  
        // payload.itemcode = payload.Itemcode;
        payload.itemcode = this.$route.query.Itemcode;
        payload.branch = payload.branch;
        
        if(payload.ordering == "")
        {
            payload.ordering = "-created_at"
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
              "pass_json": payload,//pass_json should be the field or data wish to be created.
              "params": {}
        };

        var xpayload = {
        "pass_json":{}
        }
        // console.log('xpayload', xpayload);
        // console.log('payload', payload)

        var object_pass = {
          "dispatch": 'itemmaster/trigger_post_get_itemmaster_itemtype',
          "getter": 'itemmaster/get_itemmaster_itemtype',
          "app": this,
          "payload": payload,
        };
        // console.log('itemtype_object_pass', object_pass);

        var dispatch_response_item_type = await this.$dispatch(object_pass);
        // console.log('dispatch_response_item_type', dispatch_response_item_type);
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
          console.log('itemtype_results', results);
          // if (Array.isArray(results) && results.includes('someValue')) {
          //   console.log('The value is in the results array');
          // }

          if(this.$route.name == 'CreateItemmaster'){
              this.table_data4 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
          }
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

        var table_column4 = [
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
                    // "headerStyle": "max-width: 50px; text-align: center;",
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
            {
                name: 'concept',
                required: true,
                label: 'Concept',
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
                name: 'created_at',
                required: true,
                label: 'created at',
                align: 'center',
                sortable: true,
                field: 'created_at',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;',
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
                align: 'left',
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
                name: 'created_at',
                required: true,
                label: 'Created at',
                align: 'center',
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
            {
                name: 'updated_at',
                required: true,
                label: 'Updated at',
                align: 'center',
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
            
        ];

        this.table_column4 = table_column4;
    },
    async table_function5(ori_payload){
        var payload = ori_payload.params
        // console.log('PriceType payload', payload);
        
        payload.outlet_guid= this.session_outlet_guid;
        payload.language= this.language;
        payload.skip = payload.offset;
  
        // payload.itemcode = payload.Itemcode;
        payload.itemcode = this.$route.query.Itemcode;

        if(payload.ordering == "")
        {
            payload.ordering = "-created_at"
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
              "pass_json": payload,//pass_json should be the field or data wish to be created.
              "params": {}
        };

        var xpayload = {
        "pass_json":{}
        }
        // console.log('xpayload', xpayload);
        // console.log('payload', payload)

        var object_pass = {
          "dispatch": 'itemmaster/trigger_post_get_itemmaster_pricetype',
          "getter": 'itemmaster/get_itemmaster_pricetype',
          "app": this,
          "payload": payload,
        };
        // console.log('price_type_object_pass', object_pass);

        var dispatch_response_pricetype = await this.$dispatch(object_pass);
        // console.log('dispatch_response_pricetype', dispatch_response_pricetype);
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
          
          console.log('price_type_results', results);
          // if (Array.isArray(results) && results.includes('someValue')) {
          //   console.log('The value is in the results array');
          // }

          if(this.$route.name == 'CreateItemmaster'){
              this.table_data5 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
          }
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

        var table_column5 = [
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
                    // "headerStyle": "max-width: 50px; text-align: center;",
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
            {
                name: 'concept',
                required: true,
                label: 'Concept',
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
                align: 'left',
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
                name: 'created_at',
                required: true,
                label: 'Created at',
                align: 'center',
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
            {
                name: 'updated_at',
                required: true,
                label: 'Updated at',
                align: 'center',
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
            
        ];

        this.table_column5 = table_column5;
    },
    async table_function6(ori_payload){
        var payload = ori_payload.params
        // console.log('Itemmaster_Replenishement payload', payload);
        
        payload.outlet_guid= this.session_outlet_guid;
        payload.language= this.language;
        payload.skip = payload.offset;
        payload.itemcode = this.$route.query.Itemcode;
        
        //stop at here justnow 1pm
        if(payload.ordering == "")
        {
            payload.ordering = "-created_at"
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
              "pass_json": payload,//pass_json should be the field or data wish to be created.
              "params": {}
        };

        var xpayload = {
        "pass_json":{}
        }
        // console.log('xpayload', xpayload);
        // console.log('payload', payload)

        var object_pass = {
          "dispatch": 'itemmaster/trigger_post_get_itemmaster_replenishment',
          "getter": 'itemmaster/get_itemmaster_replenishment',
          "app": this,
          "payload": payload,
        };
        // console.log('itemaster_replenishment_object_pass', object_pass);

        var dispatch_response_itemmaster_replenishment = await this.$dispatch(object_pass);
        // console.log('dispatch_response_itemmaster_replenishment', dispatch_response_itemmaster_replenishment);
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
          
          console.log('itemmaster_replenishment_results', results);
          // if (Array.isArray(results) && results.includes('someValue')) {
          //   console.log('The value is in the results array');
          // }

          if(this.$route.name == 'CreateItemmaster'){
              this.table_data6 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
          }
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
                    // "headerStyle": "max-width: 50px; text-align: center;",
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
            {
                name: 'concept',
                required: true,
                label: 'Concept',
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
                align: 'left',
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
                align: 'left',
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
                align: 'left',
                sortable: true,
                field: 'display_qty',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            

            {
                name: 'created_at',
                required: true,
                label: 'Created at',
                align: 'center',
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
            {
                name: 'updated_at',
                required: true,
                label: 'Updated at',
                align: 'center',
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
                name: 'last_refno',
                required: true,
                label: 'Last Ref No',
                align: 'left',
                sortable: true,
                field: 'last_refno',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color:red'
            },
            
            
        ];

        this.table_column6 = table_column6;
    },
    async table_function7(ori_payload){
        var payload = ori_payload.params
        // console.log('itemmaster_block_by_branch_payload', payload);
        
        payload.outlet_guid= this.session_outlet_guid;
        payload.language= this.language;
        payload.skip = payload.offset;
        payload.itemcode = this.$route.query.Itemcode;
        
        if(payload.ordering == "")
        {
            payload.ordering = "-created_at"
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
              "pass_json": payload,//pass_json should be the field or data wish to be created.
              "params": {}
        };

        var xpayload = {
        "pass_json":{}
        }
        // console.log('xpayload', xpayload);
        // console.log('payload', payload)

        var object_pass = {
          "dispatch": 'itemmaster/trigger_post_get_itemmaster_block_by_branch',
          "getter": 'itemmaster/get_itemmaster_block_by_branch',
          "app": this,
          "payload": payload,
        };
        // console.log('itemmaster_block_by_branch_object_pass', object_pass);

        var dispatch_response_itemmaster_block_by_branch = await this.$dispatch(object_pass);
        // console.log('dispatch_response_itemmaster_block_by_branch', dispatch_response_itemmaster_block_by_branch);
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
          
          console.log('itemmaster_block_by_branch results', results);
          

          if(this.$route.name == 'CreateItemmaster'){
              this.table_data7 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
          }
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
                    // "headerStyle": "max-width: 50px; text-align: center;",
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
            {
                name: 'branch',
                required: true,
                label: 'Concept',
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
                name: 'ibt',
                required: true,
                label: 'IBT',
                align: 'left',
                sortable: true,
                field: 'ibt',
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
                name: 'dn',
                required: true,
                label: 'DN',
                align: 'left',
                sortable: true,
                field: 'dn',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'cpo',
                required: true,
                label: 'CPO',
                align: 'left',
                sortable: true,
                field: 'cpo',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            

            {
                name: 'created_at',
                required: true,
                label: 'Created at',
                align: 'center',
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
            {
                name: 'updated_at',
                required: true,
                label: 'Updated at',
                align: 'center',
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
            
        ];

        this.table_column7 = table_column7;
    },
    async table_function8(ori_payload){
        var payload = ori_payload.params
        // console.log('price_change_req2item_payload', payload);
        
        payload.outlet_guid= this.session_outlet_guid;
        payload.language= this.language;
        payload.skip = payload.offset;
        payload.Itemcode = this.$route.query.Itemcode;

        if(payload.ordering == "")
        {
            payload.ordering = "-posted_at"
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
              "pass_json": payload,//pass_json should be the field or data wish to be created.
              "params": {}
        };

        var object_pass = {
          "dispatch": 'itemmaster/trigger_post_get_price_change_req1loc',
          "getter": 'itemmaster/get_price_change_req1loc',
          "app": this,
          "payload": payload,
        };
        // console.log('price_change_req_payload_object_pass', object_pass);

        var dispatch_response_itemmaster_price_change_req1loc = await this.$dispatch(object_pass);
        // console.log('dispatch_response_itemmaster_price_change_req1loc', dispatch_response_itemmaster_price_change_req1loc);
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
          
          console.log('itemmaster_price_change_req1loc results', results);
          var extractedResults = results.map(result => {
            return {
              "Send_Approved": result.price_change_req.Send_Approved,
              "RefNo": result.price_change_req.RefNo,
              "Updated_at": result.price_change_req.Updated_at,
              "Updated_by": result.price_change_req.Updated_by,
              "Created_at": result.price_change_req.Created_at,
              "Created_by": result.price_change_req.Created_by,
              "EffectiveDate": result.price_change_req.EffectiveDate,
              "Post_Req": result.price_change_req.Post_Req,
              "LocGroup": result.LocGroup,
              "posted_at": result.posted_at,
              "posted_by": result.posted_by,
            };
          });    
          console.log('Extracted Results:', extractedResults);


          if(this.$route.name == 'CreateItemmaster'){
              this.table_data8 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
          }
          // else if(this.page_function == 'EditItemmaster'){
              this.table_data8 = {
              "data": {
                "count": dispatch_response_itemmaster_price_change_req1loc.response.total_row,
                "next": null,
                "previous": null,
                "results":extractedResults
                // "results": dispatch_response_pricetype.response
              }
            };
          // }


          // this.results = dispatch_response_pricetype.response.detail;
          this.results = dispatch_response_itemmaster_price_change_req1loc.response;

          
        }

        var table_column8 = [
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
                    // "headerStyle": "max-width: 50px; text-align: center;",
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
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
                align: 'left',
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
                headerStyle: 'text-align: center;color:red'

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
                headerStyle: 'text-align: center;color:red',
                

            },
            {
                name: 'app_price',
                required: true,
                label: 'App.Price',
                align: 'left',
                sortable: true,
                field: 'app_price',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color: red;'

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
                name: 'Created_at',
                required: true,
                label: 'Created at',
                align: 'center',
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
                label: 'Updated at',
                align: 'center',
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
                name: 'Send_Approved',
                required: true,
                label: 'Send Approved',
                align: 'left',
                sortable: true,
                field: 'Send_Approved',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            {
                name: 'Curr_Price',
                required: true,
                label: 'Curr.Price',
                align: 'left',
                sortable: true,
                field: 'Curr_Price',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color: red;'
            },
            {
                name: 'Curr_Vendor',
                required: true,
                label: 'Curr.Vendor',
                align: 'left',
                sortable: true,
                field: 'Curr_Vendor',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color: red;'
            },
            {
                name: 'Sugg_Price',
                required: true,
                label: 'Sugg.Price',
                align: 'left',
                sortable: true,
                field: 'Sugg_Price',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color: red;'
            },
            {
                name: 'Sugg_Vendor',
                required: true,
                label: 'Sugg.Vendor',
                align: 'left',
                sortable: true,
                field: 'Sugg_Vendor',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color: red;'
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
            
        ];

        this.table_column8 = table_column8;
    },
    async table_function9(ori_payload){
        var payload = ori_payload.params
        // console.log('cost_price_change_item payload', payload);
        
        payload.outlet_guid= this.session_outlet_guid;
        payload.language= this.language;
        payload.skip = payload.offset;

        if(payload.ordering == "")
        {
            payload.ordering = "-created_at"
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
  
        
        payload.itemcode = this.$route.query.Itemcode;
        

        var payload = {
              "pass_json": payload,//pass_json should be the field or data wish to be created.
              "params": {}
        };

        var xpayload = {
        "pass_json":{}
        }
        // console.log('xpayload', xpayload);
        // console.log('payload', payload)

        var object_pass = {
          "dispatch": 'itemmaster/trigger_post_get_cost_price_change_item',
          "getter": 'itemmaster/get_cost_price_change_item',
          "app": this,
          "payload": payload,
        };
        // console.log('itemaster_replenishment_object_pass', object_pass);

        var dispatch_response_cost_price_change_item = await this.$dispatch(object_pass);
        // console.log('dispatch_response_cost_price_change_item', dispatch_response_cost_price_change_item);
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
          
          console.log('cost_price_change_item_results', results);
          // if (Array.isArray(results) && results.includes('someValue')) {
          //   console.log('The value is in the results array');
          // }

          if(this.$route.name == 'CreateItemmaster'){
              this.table_data9 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
          }
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

        var table_column9 = [
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
                    // "headerStyle": "max-width: 50px; text-align: center;",
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
            {
                name: 'issued',
                required: true,
                label: 'Issued',
                align: 'left',
                sortable: true,
                field: 'issued',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color: red;'

            },
            {
                name: 'posted',
                required: true,
                label: 'Posted',
                align: 'left',
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
                align: 'center',
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
                align: 'left',
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
                align: 'left',
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
                align: 'left',
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
                align: 'left',
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
                headerStyle: 'text-align: center;color: red;'

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
                headerStyle: 'text-align: center;color: red;'

            },
            {
                name: 'barcode',
                required: true,
                label: 'Ref No',
                align: 'left',
                sortable: true,
                field: 'barcode',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color: red;'

            },
            {
                name: 'SupItemCode',
                required: true,
                label: 'Code',
                align: 'left',
                sortable: true,
                field: 'SupItemCode',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color: red;'

            },
            {
                name: 'name',
                required: true,
                label: 'Name',
                align: 'left',
                sortable: true,
                field: 'name',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color: red;'

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
            {
                name: 'posted_at',
                required: true,
                label: 'Posted At',
                align: 'left',
                sortable: true,
                field: 'posted_at',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color: red;'

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
                headerStyle: 'text-align: center;color: red;'

            },
            {
                name: 'updated_at',
                required: true,
                label: 'Updated at',
                align: 'center',
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
            
            
        ];

        this.table_column9 = table_column9;
    },
    async table_function10(ori_payload){
        var payload = ori_payload.params
        // console.log('cost_price_change_vendor payload', payload);
        
        payload.outlet_guid= this.session_outlet_guid;
        payload.language= this.language;
        payload.skip = payload.offset;
  
        payload.itemcode = this.$route.query.Itemcode;

        if(payload.ordering == "")
        {
            payload.ordering = "-created_at"
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
              "pass_json": payload,//pass_json should be the field or data wish to be created.
              "params": {}
        };

        var xpayload = {
        "pass_json":{}
        }
        // console.log('xpayload', xpayload);
        // console.log('payload', payload)

        var object_pass = {
          "dispatch": 'itemmaster/trigger_post_get_cost_price_change_item_vendor',
          "getter": 'itemmaster/get_cost_price_change_item_vendor',
          "app": this,
          "payload": payload,
        };
        // console.log('itemaster_replenishment_object_pass', object_pass);

        var dispatch_response_cost_price_change_item_vendor = await this.$dispatch(object_pass);
        // console.log('dispatch_response_cost_price_change_item_vendor', dispatch_response_cost_price_change_item_vendor);
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
          
          console.log('cost_price_change_item_vendor_results', results);
          

          if(this.$route.name == 'CreateItemmaster'){
              this.table_data10 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
          }
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

        var table_column10 = [
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
                    // "headerStyle": "max-width: 50px; text-align: center;",
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
            {
                name: 'issued',
                required: true,
                label: 'Issued',
                align: 'left',
                sortable: true,
                field: 'issued',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color: red;'

            },
            {
                name: 'posted',
                required: true,
                label: 'Posted',
                align: 'left',
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
                align: 'center',
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
                align: 'left',
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
                name: 'barcode', //refno
                required: true,
                label: 'Ref No',
                align: 'left',
                sortable: true,
                field: 'barcode',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color:red'

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
                headerStyle: 'text-align: center;color:red;'

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
                headerStyle: 'text-align: center;color:red;'

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
            {
                name: 'posted_at',
                required: true,
                label: 'Posted At',
                align: 'left',
                sortable: true,
                field: 'posted_at',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color:red;'

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
                headerStyle: 'text-align: center;color:red;'

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
                align: 'center',
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
            
            
            
        ];

        this.table_column10 = table_column10;
    },
    async table_function11(ori_payload){
        var payload = ori_payload.params
        console.log('get_read_grchild payload', payload);
        
        payload.outlet_guid= this.session_outlet_guid;
        payload.language= this.language;
        payload.skip = payload.offset;
       
        // payload.RefNo = "";
        payload.Itemcode = this.$route.query.Itemcode;
        

        var payload = {
              "pass_json": payload,//pass_json should be the field or data wish to be created.
              "params": {}
        };

        var object_pass = {
          "dispatch": 'itemmaster/trigger_post_get_read_grchild',
          "getter": 'itemmaster/get_read_grchild',
          "app": this,
          "payload": payload,
        };

        var dispatch_response_get_read_grchild = await this.$dispatch(object_pass);
        // console.log('dispatch_response_get_read_grchild', dispatch_response_get_read_grchild);
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
          var filteredResults = results.filter(item => item.grmain && (item.grmain.ibt === 0 || item.grmain.ibt === 2));
          // console.log('Filtered get_read_grchild_results', filteredResults);
          
          // console.log('get_read_grchild_results', results);
          

          if(this.$route.name == 'CreateItemmaster'){
              this.table_data11 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
          }
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

        var table_column11 = [
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
                    // "headerStyle": "max-width: 50px; text-align: center;",
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
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
            // {
            //     name: 'grmain.ibt',
            //     required: true,
            //     label: 'IBT Type',
            //     align: 'left',
            //     sortable: true,
            //     field: row => row.grmain.ibt,
            //     format_child: '',
            //     tooltip: '',
            //     headerStyle: 'text-align: center;'

            // },
            // {
            //     name: 'Itemcode',
            //     required: true,
            //     label: 'Itemcode',
            //     align: 'left',
            //     sortable: true,
            //     field: 'Itemcode',
            //     format_child: '',
            //     tooltip: '',
            //     headerStyle: 'text-align: center;'

            // },
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

        this.table_column11 = table_column11;
    },
    async table_function12(ori_payload){
        var payload = ori_payload.params
        // console.log('itemaster_master payload', payload);
        
        payload.outlet_guid= this.session_outlet_guid;
        payload.language= this.language;
        payload.skip=payload.offset;
        payload.language = this.language;       
        payload.Itemcode = this.$route.query.Itemcode;

        if(payload.ordering == "")
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
              "pass_json": payload,//pass_json should be the field or data wish to be created.
              "params": {}
        };

        var xpayload = {
        "pass_json":{}
        }
        // console.log('xpayload', xpayload);
        // console.log('payload', payload)

        var object_pass = {
          "dispatch": 'itemmaster/trigger_post_get_itemmaster_discount',
          "getter": 'itemmaster/get_itemmaster_discount',
          "app": this,
          "payload": payload,
        };
        // console.log('itemaster_master_object_pass', object_pass);

        var dispatch_response_get_itemmaster_discount = await this.$dispatch(object_pass);
        console.log('dispatch_response_get_itemmaster_discount', dispatch_response_get_itemmaster_discount);
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
          
          console.log('get_itemmaster_discount_results', results);
          

          if(this.$route.name == 'CreateItemmaster'){
              this.table_data12 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
          }
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
                    // "headerStyle": "max-width: 50px; text-align: center;",
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
            {
                name: 'CardType',
                required: true,
                label: 'Price Type',
                align: 'left',
                sortable: true,
                field: 'CardType',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
             {
                name: 'Disc1Value',
                required: true,
                label: 'Disc1 Value',
                align: 'left',
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
                align: 'left',
                sortable: true,
                field: 'Disc1Type',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'Disc2Value',
                required: true,
                label: 'Disc2 Value',
                align: 'left',
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
                align: 'left',
                sortable: true,
                field: 'Disc2Type',
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
            
            
            
            
        ];

        this.table_column12 = table_column12;
    },
    async table_function13(ori_payload){
        var payload = ori_payload.params
        // console.log('req1LOC payload', payload);
        
        payload.outlet_guid= this.session_outlet_guid;
        payload.language= this.language;
        payload.skip=payload.offset;
        payload.language = this.language;       
        payload.itemcode = this.$route.query.Itemcode;

        if(payload.ordering == "")
        {
          payload.ordering = "-itemcode"
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
              "pass_json": payload,//pass_json should be the field or data wish to be created.
              "params": {}
        };

        var xpayload = {
        "pass_json":{}
        }
        // console.log('xpayload', xpayload);
        // console.log('payload', payload)

        var object_pass = {
          "dispatch": 'itemmaster/trigger_post_get_itemmaster_price_break',
          "getter": 'itemmaster/get_itemmaster_price_break',
          "app": this,
          "payload": payload,
        };
        // console.log('itemaster_master_object_pass', object_pass);

        var dispatch_response_priceBreak = await this.$dispatch(object_pass);
        console.log('dispatch_response_priceBreak', dispatch_response_priceBreak);
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
          
          var extractedResults = results.map(result => {
            return {
              "qty": result.itemmaster_price_break_c.qty,
              "break_type": result.itemmaster_price_break_c.break_type,
              "break_price": result.itemmaster_price_break_c.break_price,
              "Updated_by": result.itemmaster_price_break_c.Updated_by,
              "updated_by": result.itemmaster_price_break_c.updated_by,
              "Created_by": result.itemmaster_price_break_c.Created_by,
              "created_at": result.itemmaster_price_break_c.created_at,
            };
          });
             
          console.log('Extracted Results:', extractedResults);
          
          console.log('get_pricebreak', results);
          

          if(this.$route.name == 'CreateItemmaster'){
              this.table_data13 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
          }
          // else if(this.page_function == 'EditItemmaster'){
              this.table_data13 = {
              "data": {
                "count": dispatch_response_priceBreak.response.total_row,
                "next": null,
                "previous": null,
                "results": extractedResults
                // "results": dispatch_response_priceBreak.response
              }
            };
          // }


          // this.results = dispatch_response_priceBreak.response.detail;
          this.results = dispatch_response_priceBreak.response;

          
        }

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
            // "headerStyle": "max-width: 50px; text-align: center;",
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

        this.table_column13 = table_column13;
    },
    async table_function13_old(ori_payload){
        var payload = ori_payload.params
        // console.log('cost_price_change_item payload', payload);
        
        payload.outlet_guid= this.session_outlet_guid;
        payload.language= this.language;
        payload.skip = payload.offset;        
        payload.itemcode = this.$route.query.Itemcode;
        // payload.pricebreak_guid = payload.pricebreak_guid;

        if(payload.ordering == "")
        {
          payload.ordering = "-created_at"
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
        

        var priceBreakPayload = {
        pass_json: payload,  // This will pass the payload to the first API
        params: {}
      };

        var itemmaster_object_pass = {
          "dispatch": 'itemmaster/trigger_post_get_itemmaster_price_break',
          "getter": 'itemmaster/get_itemmaster_price_break',
          "app": this,
          "payload": priceBreakPayload,
        };
        // console.log('itemaster_replenishment_object_pass', object_pass);

        var dispatch_response_get_itemmaster_price_break = await this.$dispatch(itemmaster_object_pass);
        console.log('dispatch_response_get_itemmaster_price_break', dispatch_response_get_itemmaster_price_break);
        var status = dispatch_response_get_itemmaster_price_break.status

        if(status == "failed"){
          console.error("Failed to fetch itemmaster price break");
          this.table_data13 = {
            data: {
                count: 0,
                next: null,
                previous: null,
                results: []
            }
        };
        return;  // Exit early if the first fetch failed
        }
        
        // var price_break_guid = dispatch_response_get_itemmaster_price_break.response.detail.pricebreak_guid;
        // if (!price_break_guid) {
        //     console.error("pricebreak_guid not found in response");
        //     return;
        // }
        // console.log('price_break_guid', price_break_guid);
        // var priceBreakCPayload = {
        //     pass_json: { pricebreak_guid: price_break_guid },
        //     params: {}
        // };
        // var itemmaster_price_break_c_object_pass = {
        // dispatch: 'itemmaster/trigger_post_get_itemmaster_price_break_c',
        // getter: 'itemmaster/get_itemmaster_price_break_c',
        // app: this,
        // payload: priceBreakCPayload
        // };
        // var dispatch_response_get_itemmaster_price_break_c = await this.$dispatch(itemmaster_price_break_c_object_pass);
        // // Step 3: Handle the response for get_itemmaster_price_break_c
        // if (dispatch_response_get_itemmaster_price_break_c.status === "failed") {
        //     this.table_data13 = {
        //         data: {
        //             count: 0,
        //             next: null,
        //             previous: null,
        //             results: []
        //         }
        //     };
        // } 
        else {
          var results = []
            var parent_data = dispatch_response_get_itemmaster_price_break.response.detail;

            parent_data.forEach(parent => {
        // Iterate over the child records in itemmaster_price_break_c
            parent.itemmaster_price_break_c.forEach(child => {
                // Flatten the child data including 'qty'
                results.push({
                    pricebreak_guid: parent.pricebreak_guid,
                    itemcode: parent.itemcode,
                    CardType: parent.CardType,
                    qty: child.qty,  // Extracting 'qty' from child
                    break_type: child.break_type,
                    break_price: child.break_price,
                    updated_by: child.updated_by,
                    updated_at: child.updated_at,
                    created_by: child.created_by,
                    created_at: child.created_at,
                });
            });
        });

            var total_row = results.length;
            
            console.log('get_itemmaster_price_break_c_results', results);
            
            this.table_data13 = {
                data: {
                    count: total_row,
                    next: null,
                    previous: null,
                    results: results
                }
            };
        }

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
                    // "headerStyle": "max-width: 50px; text-align: center;",
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

        this.table_column13 = table_column13;
    },
    async table_function14(ori_payload){
        var payload = ori_payload.params
        console.log('get_read_ibt payload', payload);
        
        payload.outlet_guid= this.session_outlet_guid;
        payload.language= this.language;
        payload.skip = payload.offset;
       
        // payload.RefNo = "";
        payload.Itemcode = this.$route.query.Itemcode;
        

        var payload = {
              "pass_json": payload,//pass_json should be the field or data wish to be created.
              "params": {}
        };

        var object_pass = {
          "dispatch": 'itemmaster/trigger_post_get_read_grchild',
          "getter": 'itemmaster/get_read_grchild',
          "app": this,
          "payload": payload,
        };

        var dispatch_response_get_read_ibt = await this.$dispatch(object_pass);
        // console.log('dispatch_response_get_read_ibt', dispatch_response_get_read_ibt);
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
          var filteredResults = results.filter(item => item.grmain && item.grmain.ibt === 1);
          console.log('Filtered get_read_ibt_results', filteredResults);
          
          // console.log('get_read_ibt_results', results);
          

          if(this.$route.name == 'CreateItemmaster'){
              this.table_data14 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
          }
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

        var table_column14 = [
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
                    // "headerStyle": "max-width: 50px; text-align: center;",
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
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
            // {
            //     name: 'grmain.ibt',
            //     required: true,
            //     label: 'IBT Type 1',
            //     align: 'left',
            //     sortable: true,
            //     field: row => row.grmain.ibt,
            //     format_child: '',
            //     tooltip: '',
            //     headerStyle: 'text-align: center;'

            // },
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

        this.table_column14 = table_column14;
    },
    async table_function15(ori_payload){
        var payload = ori_payload.params
        // console.log('get_itemmaster_branch_stock payload', payload);
        
        payload.outlet_guid= this.session_outlet_guid;
        payload.language= this.language;
        payload.skip=payload.offset;
        payload.language = this.language;       
        payload.itemcode = this.$route.query.Itemcode;

        if(payload.ordering == "")
        {
            payload.ordering = "-created_at"
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
              "pass_json": payload,//pass_json should be the field or data wish to be created.
              "params": {}
        };

        var object_pass = {
          "dispatch": 'itemmaster/trigger_post_get_itemmaster_branch_stock',
          "getter": 'itemmaster/get_itemmaster_branch_stock',
          "app": this,
          "payload": payload,
        };
        // console.log('itemaster_master_object_pass', object_pass);

        var dispatch_response_get_itemmaster_branch_stock = await this.$dispatch(object_pass);
        console.log('dispatch_response_get_itemmaster_branch_stock', dispatch_response_get_itemmaster_branch_stock);
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
          
          console.log('get_itemmaster_branch_stock', results);
          

          if(this.$route.name == 'CreateItemmaster'){
              this.table_data15 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
          }
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

        var table_column15 = [
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
                    // "headerStyle": "max-width: 50px; text-align: center;",
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
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
                name: 'price_inc_tax',
                required: true,
                label: 'Price Inc Tax',
                align: 'left',
                sortable: true,
                field: 'price_inc_tax',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'PriceExcTax',
                required: true,
                label: 'Price Exc Tax',
                align: 'left',
                sortable: true,
                field: 'PriceExcTax',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color:red'

            },
            {
                name: 'ListedCost',
                required: true,
                label: 'Listed Cost',
                align: 'left',
                sortable: true,
                field: 'ListedCost',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color:red'

            },
            {
                name: 'averagecost',
                required: true,
                label: 'Avg Cost',
                align: 'left',
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
                align: 'left',
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
                align: 'left',
                sortable: true,
                field: 'fifocost',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'LastCostGP%',
                required: true,
                label: 'Last Cost GP%',
                align: 'left',
                sortable: true,
                field: 'LastCostGP',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color:red'

            },
            {
                name: 'price_today_na',
                required: true,
                label: 'Today Price Inc Tax',
                align: 'left',
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
                align: 'left',
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
                align: 'left',
                sortable: true,
                field: 'qty_promo',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'ads_rep',
                required: true,
                label: 'Replenishment ADS',
                align: 'left',
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
                align: 'left',
                sortable: true,
                field: 'day_promo',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'TransformOut',
                required: true,
                label: 'Transform Out',
                align: 'left',
                sortable: true,
                field: 'TransformOut',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color:red'

            },
            {
                name: 'qty_ibt_sales',
                required: true,
                label: 'IBT Sales',
                align: 'left',
                sortable: true,
                field: 'qty_ibt_sales',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },{
                name: 'qty_ibt_grn',
                required: true,
                label: 'IBT GRN',
                align: 'left',
                sortable: true,
                field: 'qty_ibt_grn',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },{
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
            
            
        ];

        this.table_column15 = table_column15;
    },
    async table_function16(ori_payload){
        var payload = ori_payload.params
        // console.log('get_itemmaster_branch_stock payload', payload);
        
        payload.outlet_guid= this.session_outlet_guid;
        payload.language= this.language;
        payload.skip=payload.offset;
        payload.language = this.language;       
        payload.itemcode = this.$route.query.Itemcode;

        if(payload.ordering == "")
        {
            payload.ordering = "-created_at"
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
              "pass_json": payload,//pass_json should be the field or data wish to be created.
              "params": {}
        };

        var object_pass = {
          "dispatch": 'itemmaster/trigger_post_get_itemmaster_branch_stock',
          "getter": 'itemmaster/get_itemmaster_branch_stock',
          "app": this,
          "payload": payload,
        };
        // console.log('itemaster_master_object_pass', object_pass);

        var dispatch_response_get_itemmaster_branch_stock = await this.$dispatch(object_pass);
        console.log('dispatch_response_get_itemmaster_branch_stock', dispatch_response_get_itemmaster_branch_stock);
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
          
          console.log('get_itemmaster_branch_stock', results);
          

          if(this.$route.name == 'CreateItemmaster'){
              this.table_data16 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
          }
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

        var table_column16 = [
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
                    // "headerStyle": "max-width: 50px; text-align: center;",
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
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
                headerStyle: 'text-align: center;color:red'

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
                headerStyle: 'text-align: center;color:red'

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
                headerStyle: 'text-align: center;color:red'

            },
             {
                name: 'PendingReturn',
                required: true,
                label: 'Pending Return',
                align: 'left',
                sortable: true,
                field: 'PendingReturn',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color:red'

            },
            {
                name: 'Bal',
                required: true,
                label: 'Bal',
                align: 'left',
                sortable: true,
                field: 'Bal',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color:red'

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
                headerStyle: 'text-align: center;color:red'

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

        this.table_column16 = table_column16;
    },
    async table_function17(ori_payload){
        var payload = ori_payload.params
        // console.log('get_itemmaster_branch_stock payload', payload);
        
        payload.outlet_guid= this.session_outlet_guid;
        payload.language= this.language;
        payload.skip=payload.offset;
        payload.language = this.language;       
        payload.RefNo = this.RefNo;

        if(payload.ordering == "")
        {
            payload.ordering = "-IssueStamp"
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
              "pass_json": payload,//pass_json should be the field or data wish to be created.
              "params": {}
        };

        var object_pass = {
          "dispatch": 'itemmaster/trigger_post_get_get_simain',
          "getter": 'itemmaster/get_simain',
          "app": this,
          "payload": payload,
        };
        // console.log('itemaster_master_object_pass', object_pass);

        var dispatch_response_get_itemmaster_arSales = await this.$dispatch(object_pass);
        console.log('dispatch_response_get_itemmaster_arSales', dispatch_response_get_itemmaster_arSales);
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
          
          console.log('get_simain_results', results);
          

          if(this.$route.name == 'CreateItemmaster'){
              this.table_data17 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
          }
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

        var table_column17 = [
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
                    // "headerStyle": "max-width: 50px; text-align: center;",
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
            {
                name: 'qty_opn',
                required: true,
                label: 'Mth',
                align: 'left',
                sortable: true,
                field: 'qty_opn',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color:red'

            },
             {
                name: 'qty_rec',
                required: true,
                label: 'Posted',
                align: 'left',
                sortable: true,
                field: 'qty_rec',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color:red'

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
                name: 'Bal',
                required: true,
                label: 'Dept',
                align: 'left',
                sortable: true,
                field: 'Bal',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color:red'

            },
            {
                name: 'doh',
                required: true,
                label: 'Qty',
                align: 'left',
                sortable: true,
                field: 'doh',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color:red'

            },
            {
                name: 'qty_so',
                required: true,
                label: 'Price',
                align: 'left',
                sortable: true,
                field: 'qty_so',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color:red'

            },
            {
                name: 'qty_avail',
                required: true,
                label: 'Disc',
                align: 'left',
                sortable: true,
                field: 'qty_avail',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color:red'

            },
            {
                name: 'SubTotal1',
                required: true,
                label: 'Net Price',
                align: 'left',
                sortable: true,
                field: 'SubTotal1',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'Total',
                required: true,
                label: 'Total',
                align: 'left',
                sortable: true,
                field: 'Total',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'Discount1',
                required: true,
                label: 'Disc1',
                align: 'left',
                sortable: true,
                field: 'Discount1',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'Discount1Type',
                required: true,
                label: 'Discount1Type',
                align: 'left',
                sortable: true,
                field: 'Discount1Type',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'Discount2',
                required: true,
                label: 'Disc2',
                align: 'left',
                sortable: true,
                field: 'Discount2',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'Discount2Type',
                required: true,
                label: 'Discount2 Type',
                align: 'left',
                sortable: true,
                field: 'Discount2Type',
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

        this.table_column17 = table_column17;
    },
    async table_function18(ori_payload){
        var payload = ori_payload.params
        // console.log('get_itemmaster_branch_stock payload', payload);
        
        payload.outlet_guid= this.session_outlet_guid;
        payload.language= this.language;
        payload.skip=payload.offset;
        payload.language = this.language;       
        payload.Itemcode = this.Itemcode;

        if(payload.ordering == "")
        {
            payload.ordering = "-created_at"
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
              "pass_json": payload,//pass_json should be the field or data wish to be created.
              "params": {}
        };

        var object_pass = {
          "dispatch": 'itemmaster/trigger_post_get_purchase_promo_c',
          "getter": 'itemmaster/get_purchase_promo_c',
          "app": this,
          "payload": payload,
        };
        // console.log('itemaster_master_object_pass', object_pass);

        var dispatch_response_get_purchase_promo_c = await this.$dispatch(object_pass);
        console.log('dispatch_response_get_purchase_promo_c', dispatch_response_get_purchase_promo_c);
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
          
          console.log('get_purchase_promo', results);
          

          if(this.$route.name == 'CreateItemmaster'){
              this.table_data18 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
          }
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

        var table_column18 = [
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
                    // "headerStyle": "max-width: 50px; text-align: center;",
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
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
                headerStyle: 'text-align: center;color:red'

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
                headerStyle: 'text-align: center'

            },
            {
                name: 'Bulk_Qty',
                required: true,
                label: 'Bulk_Qty',
                align: 'left',
                sortable: true,
                field: 'Bulk_Qty',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color:red'

            },
            {
                name: 'Lot_size',
                required: true,
                label: 'Lot_size',
                align: 'left',
                sortable: true,
                field: 'Lot_size',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color:red'

            },
            {
                name: 'UnitPrice',
                required: true,
                label: 'Unit Cost',
                align: 'left',
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
                align: 'left',
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
                align: 'left',
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
                align: 'left',
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
                align: 'left',
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
                align: 'left',
                sortable: true,
                field: 'NetPrice',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'RebateUnitAmount',
                required: true,
                label: 'Unit Rebate Amoount by cn',
                align: 'left',
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
                align: 'left',
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
                align: 'left',
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
                align: 'left',
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
                label: 'Updated by',
                align: 'left',
                sortable: true,
                field: 'updated_by',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            
            
            
        ];

        this.table_column18 = table_column18;
    },
    async table_function19(ori_payload){
        var payload = ori_payload.params
        // console.log('get_itemmaster_branch_stock payload', payload);
        
        payload.outlet_guid= this.session_outlet_guid;
        payload.language= this.language;
        payload.skip=payload.offset;
        payload.language = this.language;       
        // payload.POSID = this.POSID;


        if(payload.ordering == "")
        {
            payload.ordering = "-RefNo"
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
              "pass_json": payload,//pass_json should be the field or data wish to be created.
              "params": {}
        };

        var object_pass = {
          "dispatch": 'itemmaster/trigger_post_get_posmain',
          "getter": 'itemmaster/get_posmain',
          "app": this,
          "payload": payload,
        };
        // console.log('itemaster_master_object_pass', object_pass);

        var dispatch_response_get_pos_sales = await this.$dispatch(object_pass);
        console.log('dispatch_response_get_pos_sales', dispatch_response_get_pos_sales);
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
          
          console.log('get_purchase_promo', results);
          

          if(this.$route.name == 'CreateItemmaster'){
              this.table_data19 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
          }
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

        var table_column19 = [
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
                    // "headerStyle": "max-width: 50px; text-align: center;",
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
            
            },
            {
                name: 'Month',
                required: true,
                label: 'Month',
                align: 'left',
                sortable: true,
                field: 'Month',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color:red'

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
                align: 'left',
                sortable: true,
                field: 'Qty',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color:red'

            },
            {
                name: 'PricingValue',
                required: true,
                label: 'Price',
                align: 'left',
                sortable: true,
                field: 'PricingValue',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
             {
                name: 'Discount',
                required: true,
                label: 'Discount',
                align: 'left',
                sortable: true,
                field: 'Discount',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color:red'

            },
            {
                name: 'QtyDisc',
                required: true,
                label: 'QtyDisc',
                align: 'left',
                sortable: true,
                field: 'QtyDisc',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color:red'

            },
            {
                name: 'Total',
                required: true,
                label: 'Total',
                align: 'left',
                sortable: true,
                field: 'Total',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color:red'

            },
            {
                name: 'Weight',
                required: true,
                label: 'Weight',
                align: 'left',
                sortable: true,
                field: 'Weight',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color:red'

            },
            {
                name: 'Weight',
                required: true,
                label: 'Weight $',
                align: 'left',
                sortable: true,
                field: 'Weight',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color:red'

            },
            {
                name: 'Avgcost',
                required: true,
                label: 'Avg. Cost',
                align: 'left',
                sortable: true,
                field: 'Avgcost',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color:red'

            },
            {
                name: 'Totalcost',
                required: true,
                label: 'Totalcost',
                align: 'left',
                sortable: true,
                field: 'Totalcost',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color:red'

            },
            {
                name: 'Packsize',
                required: true,
                label: 'Pack Size',
                align: 'left',
                sortable: true,
                field: 'Packsize',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color:red'

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
                name: 'Barcode',
                required: true,
                label: 'Barcode',
                align: 'left',
                sortable: true,
                field: 'Barcode',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color:red'

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
                name: 'Points',
                required: true,
                label: 'Point',
                align: 'left',
                sortable: true,
                field: 'Points',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'ItemRefund',
                required: true,
                label: 'Item Refund',
                align: 'left',
                sortable: true,
                field: 'ItemRefund',
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
                headerStyle: 'text-align: center;color:red'

            },
            
            
            
        ];

        this.table_column19 = table_column19;
    },
    
    async table_function20(ori_payload){
        var payload = ori_payload.params
        // console.log('get_itemmaster_branch_stock payload', payload);
        
        payload.outlet_guid= this.session_outlet_guid;
        payload.language= this.language;
        payload.skip=payload.offset;
        payload.language = this.language;
        //  payload.trans_type = payload.useItem ? 'MIX' : 'MIXGR';       
        // payload.POSID = this.POSID;


        if(payload.ordering == "")
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
              "pass_json": payload,//pass_json should be the field or data wish to be created.
              "params": {}
        };

        var object_pass = {
          "dispatch": 'itemmaster/trigger_post_get_promo_supplier',
          "getter": 'itemmaster/get_promo_supplier',
          "app": this,
          "payload": payload,
        };
        // console.log('itemaster_master_object_pass', object_pass);

        var dispatch_response_promo_mixmatch = await this.$dispatch(object_pass);
        console.log('dispatch_response_promo_mixmatch', dispatch_response_promo_mixmatch);
        
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
          
          console.log('get_purchase_promo_mixmatch', results);
          // Filter results to include only 'MIX' and 'MIXGR'
          var filteredResults = results.filter(item => item.trans_type === 'MIX' || item.trans_type === 'MIXGR');

          if(this.$route.name == 'CreateItemmaster'){
              this.table_data20 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
          }
          // else if(this.page_function == 'EditItemmaster'){
              this.table_data20 = {
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
          this.results = dispatch_response_promo_mixmatch.response;

          
        }

        var table_column20 = [
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
                    // "headerStyle": "max-width: 50px; text-align: center;",
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
            
            },
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
                align: 'left',
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
                name: 'Disable',
                required: true,
                label: 'Disable',
                align: 'left',
                sortable: true,
                field: 'Disable',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color:red'

            },
            {
                name: 'Cancel',
                required: true,
                label: 'Cancel',
                align: 'left',
                sortable: true,
                field: 'Cancel',
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
                headerStyle: 'text-align: center;color:red'

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
                headerStyle: 'text-align: center;color:red'

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
                headerStyle: 'text-align: center;color:red'

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
                headerStyle: 'text-align: center;color:red'

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
                name: 'Special',
                required: true,
                label: 'Special',
                align: 'left',
                sortable: true,
                field: 'Special',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color:red'

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
                align: 'left',
                sortable: true,
                field: 'set_target_price',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'set_disc1Type',
                required: true,
                label: 'Disc1 Type',
                align: 'left',
                sortable: true,
                field: 'set_disc1Type',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'set_disc1Value',
                required: true,
                label: 'Disc1',
                align: 'left',
                sortable: true,
                field: 'set_disc1Value',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'set_disc2Type',
                required: true,
                label: 'Disc2',
                align: 'left',
                sortable: true,
                field: 'set_disc2Type',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'set_disc2Value',
                required: true,
                label: 'Disc2',
                align: 'left',
                sortable: true,
                field: 'set_disc2Value',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'NetPrice',
                required: true,
                label: 'NetPrice',
                align: 'left',
                sortable: true,
                field: 'NetPrice',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color:red'

            },
            {
                name: 'Sup.Bare',
                required: true,
                label: 'Sup.Bare',
                align: 'left',
                sortable: true,
                field: 'Sup.Bare',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color:red'

            },
            {
                name: 'Cust.Bare',
                required: true,
                label: 'Cust.Bare',
                align: 'left',
                sortable: true,
                field: 'Cust.Bare',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color:red'

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
                name: 'Cancel_at',
                required: true,
                label: 'Disable at',
                align: 'left',
                sortable: true,
                field: 'Cancel_at',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color:red'

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
                headerStyle: 'text-align: center;color:red'

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
            
            
            
        ];

        this.table_column20 = table_column20;
    },
    async table_function21(ori_payload){
        var payload = ori_payload.params
        // console.log('get_itemmaster_branch_stock payload', payload);
        
        payload.outlet_guid= this.session_outlet_guid;
        payload.language= this.language;
        payload.skip=payload.offset;
        payload.language = this.language;
        //  payload.trans_type = payload.useItem ? 'MIX' : 'MIXGR';       
        // payload.POSID = this.POSID;


        if(payload.ordering == "")
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
              "pass_json": payload,//pass_json should be the field or data wish to be created.
              "params": {}
        };

        var object_pass = {
          "dispatch": 'itemmaster/trigger_post_get_promo_supplier',
          "getter": 'itemmaster/get_promo_supplier',
          "app": this,
          "payload": payload,
        };
        // console.log('itemaster_master_object_pass', object_pass);

        var dispatch_response_promo_multibuy = await this.$dispatch(object_pass);
        console.log('dispatch_response_promo_multibuy', dispatch_response_promo_multibuy);
        
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
          
          console.log('get_purchase_promo_multibuy', results);
          // Filter results to include only 'MIX' and 'MIXGR'
          var filteredResults = results.filter(item => item.trans_type === 'QTY' || item.trans_type === 'GREAT');

          if(this.$route.name == 'CreateItemmaster'){
              this.table_data21 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
          }
          // else if(this.page_function == 'EditItemmaster'){
              this.table_data21 = {
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
          this.results = dispatch_response_promo_multibuy.response;

          
        }

        var table_column21 = [
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
                    // "headerStyle": "max-width: 50px; text-align: center;",
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
            
            },
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
                align: 'left',
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
                name: 'Disable',
                required: true,
                label: 'Disable',
                align: 'left',
                sortable: true,
                field: 'Disable',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color:red'

            },
            {
                name: 'Cancel',
                required: true,
                label: 'Cancel',
                align: 'left',
                sortable: true,
                field: 'Cancel',
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
                headerStyle: 'text-align: center;color:red'

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
                headerStyle: 'text-align: center;color:red'

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
                headerStyle: 'text-align: center;color:red'

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
                headerStyle: 'text-align: center;color:red'

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
                name: 'Special',
                required: true,
                label: 'Special',
                align: 'left',
                sortable: true,
                field: 'Special',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color:red'

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
                align: 'left',
                sortable: true,
                field: 'set_target_price',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'set_disc1Type',
                required: true,
                label: 'Disc1 Type',
                align: 'left',
                sortable: true,
                field: 'set_disc1Type',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'set_disc1Value',
                required: true,
                label: 'Disc1',
                align: 'left',
                sortable: true,
                field: 'set_disc1Value',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'set_disc2Type',
                required: true,
                label: 'Disc2',
                align: 'left',
                sortable: true,
                field: 'set_disc2Type',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'set_disc2Value',
                required: true,
                label: 'Disc2',
                align: 'left',
                sortable: true,
                field: 'set_disc2Value',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'NetPrice',
                required: true,
                label: 'NetPrice',
                align: 'left',
                sortable: true,
                field: 'NetPrice',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color:red'

            },
            {
                name: 'Sup.Bare',
                required: true,
                label: 'Sup.Bare',
                align: 'left',
                sortable: true,
                field: 'Sup.Bare',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color:red'

            },
            {
                name: 'Cust.Bare',
                required: true,
                label: 'Cust.Bare',
                align: 'left',
                sortable: true,
                field: 'Cust.Bare',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color:red'

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
                name: 'Cancel_at',
                required: true,
                label: 'Disable at',
                align: 'left',
                sortable: true,
                field: 'Cancel_at',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color:red'

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
                headerStyle: 'text-align: center;color:red'

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
            
            
            
        ];

        this.table_column21 = table_column21;
    },
    async table_function22(ori_payload){
        var payload = ori_payload.params
        // console.log('get_itemmaster_branch_stock payload', payload);
        
        payload.outlet_guid= this.session_outlet_guid;
        payload.language= this.language;
        payload.skip=payload.offset;
        payload.language = this.language;
        //  payload.trans_type = payload.useItem ? 'MIX' : 'MIXGR';       
        // payload.POSID = this.POSID;


        if(payload.ordering == "")
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
              "pass_json": payload,//pass_json should be the field or data wish to be created.
              "params": {}
        };

        var object_pass = {
          "dispatch": 'itemmaster/trigger_post_get_promo_supplier',
          "getter": 'itemmaster/get_promo_supplier',
          "app": this,
          "payload": payload,
        };
        // console.log('itemaster_master_object_pass', object_pass);

        var dispatch_response_promo_discount = await this.$dispatch(object_pass);
        // console.log('dispatch_response_promo_discount', dispatch_response_promo_discount);
        
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
          
          // console.log('get_purchase_promo_discount', results);
          // Filter results to include only 'MIX' and 'MIXGR'
          var filteredResults = results.filter(item => 
            item.trans_type !== 'MIXGR' && 
            item.trans_type !== 'MIX' && 
            item.trans_type !== 'QTY' && 
            item.trans_type !== 'GREAT'
          );
          console.log('promo discount',filteredResults)


          if(this.$route.name == 'CreateItemmaster'){
              this.table_data22 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
          }
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

        var table_column22 = [
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
                    // "headerStyle": "max-width: 50px; text-align: center;",
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
            
            },
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
                align: 'left',
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
                name: 'Disable',
                required: true,
                label: 'Disable',
                align: 'left',
                sortable: true,
                field: 'Disable',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color:red'

            },
            {
                name: 'Cancel',
                required: true,
                label: 'Cancel',
                align: 'left',
                sortable: true,
                field: 'Cancel',
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
                headerStyle: 'text-align: center;color:red'

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
                headerStyle: 'text-align: center;color:red'

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
                headerStyle: 'text-align: center;color:red'

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
                headerStyle: 'text-align: center;color:red'

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
                name: 'Special',
                required: true,
                label: 'Special',
                align: 'left',
                sortable: true,
                field: 'Special',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color:red'

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
                align: 'left',
                sortable: true,
                field: 'set_target_price',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'set_disc1Type',
                required: true,
                label: 'Disc1 Type',
                align: 'left',
                sortable: true,
                field: 'set_disc1Type',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'set_disc1Value',
                required: true,
                label: 'Disc1',
                align: 'left',
                sortable: true,
                field: 'set_disc1Value',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'set_disc2Type',
                required: true,
                label: 'Disc2',
                align: 'left',
                sortable: true,
                field: 'set_disc2Type',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'set_disc2Value',
                required: true,
                label: 'Disc2',
                align: 'left',
                sortable: true,
                field: 'set_disc2Value',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'NetPrice',
                required: true,
                label: 'NetPrice',
                align: 'left',
                sortable: true,
                field: 'NetPrice',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color:red'

            },
            {
                name: 'Sup.Bare',
                required: true,
                label: 'Sup.Bare',
                align: 'left',
                sortable: true,
                field: 'Sup.Bare',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color:red'

            },
            {
                name: 'Cust.Bare',
                required: true,
                label: 'Cust.Bare',
                align: 'left',
                sortable: true,
                field: 'Cust.Bare',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color:red'

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
                name: 'Cancel_at',
                required: true,
                label: 'Disable at',
                align: 'left',
                sortable: true,
                field: 'Cancel_at',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color:red'

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
                headerStyle: 'text-align: center;color:red'

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
            
            
            
        ];

        this.table_column22 = table_column22;
    },
    async table_function23(ori_payload){
        var payload = ori_payload.params
        // console.log('get_itemmaster_branch_stock payload', payload);
        
        payload.outlet_guid= this.session_outlet_guid;
        payload.language= this.language;
        payload.skip=payload.offset;
        payload.language = this.language;
        payload.Itemcode = this.$route.query.Itemcode;
        
        // payload.PeriodCode =""; //filter current period     
        


        if(payload.ordering == "")
        {
            payload.ordering = "-CREATED_AT"
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
              "pass_json": payload,//pass_json should be the field or data wish to be created.
              "params": {}
        };

        var object_pass = {
          "dispatch": 'itemmaster/trigger_post_get_locationstock_period',
          "getter": 'itemmaster/get_locationstock_period',
          "app": this,
          "payload": payload,
        };
        // console.log('itemaster_master_object_pass', object_pass);

        var dispatch_response_get_qohsite = await this.$dispatch(object_pass);
        console.log('dispatch_response_get_qohsite', dispatch_response_get_qohsite);
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
          
          console.log('get_purchase_promo', results);
          

          if(this.$route.name == 'CreateItemmaster'){
              this.table_data23 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
          }
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

        var table_column23 = [
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
                    // "headerStyle": "max-width: 50px; text-align: center;",
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
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
                headerStyle: 'text-align: center;color:red'

            },
             {
                name: 'price_inc_tax',
                required: true,
                label: 'Price Inc Tax',
                align: 'left',
                sortable: true,
                field: 'price_inc_tax',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color:red'

            },
            {
                name: 'PriceExcTax',
                required: true,
                label: 'Price Exc Tax',
                align: 'left',
                sortable: true,
                field: 'PriceExcTax',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color:red'

            },
            {
                name: 'ListedCost',
                required: true,
                label: 'Listed Cost',
                align: 'left',
                sortable: true,
                field: 'ListedCost',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color:red'

            },
            {
                name: 'averagecost',
                required: true,
                label: 'Avg Cost',
                align: 'left',
                sortable: true,
                field: 'averagecost',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color:red'

            },
             {
                name: 'lastcost',
                required: true,
                label: 'Last Cost',
                align: 'left',
                sortable: true,
                field: 'lastcost',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color:red'

            },
            {
                name: 'fifocost',
                required: true,
                label: 'Fifo Cost',
                align: 'left',
                sortable: true,
                field: 'fifocost',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color:red'

            },
            {
                name: 'LastCostGP%',
                required: true,
                label: 'Last Cost GP%',
                align: 'left',
                sortable: true,
                field: 'LastCostGP',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color:red'

            },
            {
                name: 'price_today_na',
                required: true,
                label: 'Today Price Inc Tax',
                align: 'left',
                sortable: true,
                field: 'price_today_na',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color:red'

            },
            {
                name: 'price_today_mb',
                required: true,
                label: 'Today Member Price Inc Tax',
                align: 'left',
                sortable: true,
                field: 'price_today_mb',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color:red'

            },
            {
                name: 'rank_cg_qty',
                required: true,
                label: 'Category Ranking',
                align: 'left',
                sortable: true,
                field: 'rank_cg_qty',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'rank_cg_amt',
                required: true,
                label: 'Category Ranking ($)',
                align: 'left',
                sortable: true,
                field: 'rank_cg_amt',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'lsp_qty_promo',
                required: true,
                label: 'Qty Promo',
                align: 'left',
                sortable: true,
                field: 'lsp_qty_promo',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'ads_rep',
                required: true,
                label: 'Replenishment ADS',
                align: 'left',
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
                headerStyle: 'text-align: center;color:red'

            },
            {
                name: 'day_promo',
                required: true,
                label: 'Promo Day',
                align: 'left',
                sortable: true,
                field: 'day_promo',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color:red'

            },
            {
                name: 'TransOutQty',
                required: true,
                label: 'Transform Out',
                align: 'left',
                sortable: true,
                field: 'TransOutQty',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color:red'

            },
            {
                name: 'sales_ibt_qty',
                required: true,
                label: 'IBT Sales',
                align: 'left',
                sortable: true,
                field: 'sales_ibt_qty',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },{
                name: 'grn_ibt_qty',
                required: true,
                label: 'IBT GRN',
                align: 'left',
                sortable: true,
                field: 'grn_ibt_qty',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },{
                name: 'branch',
                required: true,
                label: 'Branch',
                align: 'left',
                sortable: true,
                field: 'branch',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color:red'

            },
            {
                name: 'POQTY',
                required: true,
                label: 'POQTY',
                align: 'left',
                sortable: true,
                field: 'POQTY',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color:red'

            },
            {
                name: 'reqqty',
                required: true,
                label: 'reqqty',
                align: 'left',
                sortable: true,
                field: 'reqqty',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color:red'

            },
            {
                name: 'DateStart',
                required: true,
                label: 'Date Start',
                align: 'left',
                sortable: true,
                field: 'DateStart',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'DateStop',
                required: true,
                label: 'Date End',
                align: 'left',
                sortable: true,
                field: 'DateStop',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'first_grdate',
                required: true,
                label: '1st GRN Date',
                align: 'left',
                sortable: true,
                field: 'first_grdate',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'daysanalysed',
                required: true,
                label: 'Days Analysed',
                align: 'left',
                sortable: true,
                field: 'daysanalysed',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color:red'

            },
            {
                name: 'lastgrdate',
                required: true,
                label: 'Last GR Date',
                align: 'left',
                sortable: true,
                field: 'lastgrdate',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'Lastcost',
                required: true,
                label: 'Last GR Qty',
                align: 'left',
                sortable: true,
                field: 'lastgrqty',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color:red'

            },
            {
                name: 'CREATED_AT',
                required: true,
                label: 'Create Date',
                align: 'left',
                sortable: true,
                field: 'CREATED_AT',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'UPDATED_AT',
                required: true,
                label: 'Updatedat',
                align: 'left',
                sortable: true,
                field: 'UPDATED_AT',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'RecalculateAt',
                required: true,
                label: 'Recalculate at',
                align: 'left',
                sortable: true,
                field: 'RecalculateAt',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color:red'

            },
            
            
        ];

        this.table_column23 = table_column23;
    },
    async table_function24(ori_payload){
        var payload = ori_payload.params
        // console.log('get_itemmaster_branch_stock payload', payload);
        
        payload.outlet_guid= this.session_outlet_guid;
        payload.language= this.language;
        payload.skip=payload.offset;
        payload.language = this.language;
        // payload.itemcode = this.$route.query.Itemcode;
        
        // payload.PeriodCode =""; //filter current period     
        


        if(payload.ordering == "")
        {
            payload.ordering = "-created_at"
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
              "pass_json": payload,//pass_json should be the field or data wish to be created.
              "params": {}
        };

        var object_pass = {
          "dispatch": 'itemmaster/trigger_post_get_set_assorted_item_c',
          "getter": 'itemmaster/get_set_assorted_item_c',
          "app": this,
          "payload": payload,
        };
        // console.log('itemaster_master_object_pass', object_pass);

        var dispatch_response_assorted = await this.$dispatch(object_pass);
        console.log('dispatch_response_assorted', dispatch_response_assorted);
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
          
          console.log('get_assorted', results);
          

          if(this.$route.name == 'CreateItemmaster'){
              this.table_data24 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
          }
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

        var table_column24 = [
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
                    // "headerStyle": "max-width: 50px; text-align: center;",
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
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
                headerStyle: 'text-align: center;color:red'

            },
            {
                name: 'set_assorted_item__assorted_desc',
                required: true,
                label: 'Assorted Item Description',
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
                label: 'Createdby',
                align: 'left',
                sortable: true,
                field: 'created_by',
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
                label: 'Updatedby',
                align: 'left',
                sortable: true,
                field: 'updated_by',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            
            
        ];

        this.table_column24 = table_column24;
    },
    async table_function25(ori_payload){
        var payload = ori_payload.params
        // console.log('get_itemmaster_branch_stock payload', payload);
        
        payload.outlet_guid= this.session_outlet_guid;
        payload.language= this.language;
        payload.skip=payload.offset;
        payload.language = this.language;       
        payload.RefNo = this.RefNo;

        if(payload.ordering == "")
        {
            payload.ordering = "IssueStamp"
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
              "pass_json": payload,//pass_json should be the field or data wish to be created.
              "params": {}
        };

        var object_pass = {
          "dispatch": 'itemmaster/trigger_post_get_get_simain',
          "getter": 'itemmaster/get_simain',
          "app": this,
          "payload": payload,
        };
        // console.log('itemaster_master_object_pass', object_pass);

        var dispatch_response_get_itemmaster_IBTSales = await this.$dispatch(object_pass);
        console.log('dispatch_response_get_itemmaster_IBTSales', dispatch_response_get_itemmaster_IBTSales);
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
          var filteredResults = results.filter(item => item.ibt === 1);
          console.log('get_simain_results', results);
          

          if(this.$route.name == 'CreateItemmaster'){
              this.table_data25 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
          }
          // else if(this.page_function == 'EditItemmaster'){
              this.table_data25 = {
              "data": {
                "count": filteredResults.length,
                "next": null,
                "previous": null,
                "results": filteredResults
                // "results": dispatch_response_get_itemmaster_IBTSales.response
              }
            };
          // }


          // this.results = dispatch_response_get_itemmaster_IBTSales.response.detail;
          this.results = dispatch_response_get_itemmaster_IBTSales.response;

          
        }

        var table_column25 = [
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
                    // "headerStyle": "max-width: 50px; text-align: center;",
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
            {
                name: 'qty_opn',
                required: true,
                label: 'Mth',
                align: 'left',
                sortable: true,
                field: 'qty_opn',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color:red'

            },
             {
                name: 'qty_rec',
                required: true,
                label: 'Posted',
                align: 'left',
                sortable: true,
                field: 'qty_rec',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color:red'

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
                name: 'Bal',
                required: true,
                label: 'Dept',
                align: 'left',
                sortable: true,
                field: 'Bal',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color:red'

            },
            {
                name: 'doh',
                required: true,
                label: 'Qty',
                align: 'left',
                sortable: true,
                field: 'doh',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color:red'

            },
            {
                name: 'qty_so',
                required: true,
                label: 'Price',
                align: 'left',
                sortable: true,
                field: 'qty_so',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color:red'

            },
            {
                name: 'qty_avail',
                required: true,
                label: 'Disc',
                align: 'left',
                sortable: true,
                field: 'qty_avail',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color:red'

            },
            {
                name: 'SubTotal1',
                required: true,
                label: 'Net Price',
                align: 'left',
                sortable: true,
                field: 'SubTotal1',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'Total',
                required: true,
                label: 'Total',
                align: 'left',
                sortable: true,
                field: 'Total',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'Discount1',
                required: true,
                label: 'Disc1',
                align: 'left',
                sortable: true,
                field: 'Discount1',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'Discount1Type',
                required: true,
                label: 'Discount1Type',
                align: 'left',
                sortable: true,
                field: 'Discount1Type',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'Discount2',
                required: true,
                label: 'Disc2',
                align: 'left',
                sortable: true,
                field: 'Discount2',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'Discount2Type',
                required: true,
                label: 'Discount2 Type',
                align: 'left',
                sortable: true,
                field: 'Discount2Type',
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

        this.table_column25 = table_column25;
    },
    async table_function26(ori_payload){
        var payload = ori_payload.params
        // console.log('Item Type payload', payload);
        
        payload.outlet_guid= this.session_outlet_guid;
        payload.language= this.language;
        payload.skip = payload.offset;
        // payload.RefNo = this.RefNo;
  
        // payload.itemcode = payload.Itemcode;
        payload.Itemcode = this.$route.query.Itemcode;
        // payload.branch = payload.branch;
        
        if(payload.ordering == "")
        {
            payload.ordering = "-Line"
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
              "pass_json": payload,//pass_json should be the field or data wish to be created.
              "params": {}
        };

        var xpayload = {
        "pass_json":{}
        }
        // console.log('xpayload', xpayload);
        // console.log('payload', payload)

        var object_pass = {
          "dispatch": 'itemmaster/trigger_post_read_pochild',
          "getter": 'itemmaster/get_read_po',
          "app": this,
          "payload": payload,
        };
        // console.log('itemtype_object_pass', object_pass);

        var dispatch_response_po = await this.$dispatch(object_pass);
        // console.log('dispatch_response_po', dispatch_response_po);
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
          console.log('po_results', results);
          

          if(this.$route.name == 'CreateItemmaster'){
              this.table_data26 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
          }
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

        var table_column26 = [
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
                    // "headerStyle": "max-width: 50px; text-align: center;",
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
            {
                name: 'group_status',
                required: true,
                label: 'G',
                align: 'left',
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
                align: 'center',
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
                align: 'left',
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
                align: 'left',
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
                align: 'left',
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
                align: 'center',
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
                align: 'center',
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
                align: 'left',
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
                align: 'left',
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
                align: 'left',
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
                align: 'left',
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
                align: 'left',
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
                align: 'left',
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
                align: 'left',
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
                align: 'left',
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
                align: 'left',
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
                align: 'left',
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
                align: 'left',
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
                align: 'left',
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
                headerStyle: 'text-align: center;color:RED'
            },
            {
                name: 'TaxValue',
                required: true,
                label: 'SST Value',
                align: 'left',
                sortable: true,
                field: 'TaxValue',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color:red'
            },
            {
                name: 'TaxAmount',
                required: true,
                label: 'SST Amount',
                align: 'left',
                sortable: true,
                field: 'TaxAmount',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color:red'
            },
            {
                name: 'TotalPrice',
                required: true,
                label: 'Total (Exc)',
                align: 'left',
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
                align: 'left',
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
                align: 'left',
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
                align: 'left',
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
                align: 'left',
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
                align: 'left',
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
                align: 'left',
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
                align: 'left',
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
                align: 'left',
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
                align: 'left',
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
                align: 'left',
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
                name: 'OnHandQty',
                required: true,
                label: 'QOH',
                align: 'left',
                sortable: true,
                field: 'QOH',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;color:red'
            },
            {
                name: 'SellingPrice',
                required: true,
                label: 'S/Price',
                align: 'left',
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
                align: 'left',
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
                align: 'left',
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
                align: 'left',
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
                align: 'left',
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
                align: 'left',
                sortable: true,
                field: 'cost_manual_value',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'
            },
            
        ];

        this.table_column26 = table_column26;
    },
    
    


    
    unformatAmount(value,type, decimal = null)
    {
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

      if(this.$route.name == 'CreateItemmaster')
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
          var SafetyLevel = this.json.SafetyLevel;
          // var  ReorderLevel= this.json.ReorderLevel;
          var  ReorderQty= this.json.ReorderQty;
          var  MaxLevel= this.json.MaxLevel;
          var  MinPrice= this.json.MinPrice;
          // var  MaxOff= this.json.MaxOff;
          // var  Disable= this.json.Disable;
          var  unit_weight= this.json.unit_weight;
          var  unit_length= this.json.unit_length;
          var  unit_width= this.json.unit_width;
          var  unit_height= this.json.unit_height;
          var  unit_volume= this.json.unit_volume;
          var  margin= this.json.margin;
          var  non_inventory= this.json.non_inventory;
          var  zero_price= this.json.zero_price;
          var  OpenItem= this.json.OpenItem;
          var  mempoint_base_on_qty= this.json.mempoint_base_on_qty;
          // var  CostRatio= this.json.CostRatio;
          var stock_type= this.json.stock_type;
          var basic_link= this.json.basic_link;
          var new_status= this.json.new_status;
          var cost_value= this.json.cost_value;
          var price_include_tax= this.json.price_include_tax;
          var ListCostGP= this.json.ListCostGP;
          var MovingAvgCostGP= this.json.MovingAvgCostGP;
          var LastGRCostGP= this.json.LastGRCostGP;
          var FifoCostGP= this.json.FifoCostGP;
          // var Division= this.json.Division;
          var im_pur_group= this.json.im_pur_group;
          // var Principle= this.json.Principle;
          
          var BOM= this.json.BOM;
          var item_package= this.json.item_package;
          var BestBuy= this.json.BestBuy;
          var usedate= this.json.usedate;
          var WeightTraceQtyUOM= this.json.WeightTraceQtyUOM;
          var WeightTraceQty= this.json.WeightTraceQty;
          var trace_sn= this.json.trace_sn;
          var label_info= this.json.label_info;
          var imrep_stock_day= this.json.imrep_stock_day;
          var imrep_min_day= this.json.imrep_min_day;
          var imrep_max_day= this.json.imrep_max_day;
          var imrep_lead_time= this.json.imrep_lead_time;
          var imrep_buffer_stock_day= this.json.imrep_buffer_stock_day;
          var imrep_top_sales_buffer= this.json.imrep_top_sales_buffer;
          var Consign= this.json.Consign; //inventory
          var imrep_manual_soq = this.json.imrep_manual_soq;
          var imrep_manual_order = this.json.imrep_manual_order;
          var BarcodeType = this.json.BarcodeType;
          var outlet_guid= this.session_outlet_guid;
          var inv_type = this.json.inv_type;
          var  language= this.language;
          var im_created_by= this.session_user_guid;
          var im_updated_by= this.session_user_guid;



        var payload = {
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
            // "Disable":Disable,
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
            "imrep_stock_day": imrep_stock_day,
            "imrep_min_day": imrep_min_day,
            "imrep_max_day": imrep_max_day,
            "imrep_lead_time": imrep_lead_time,
            "imrep_buffer_stock_day": imrep_buffer_stock_day,
            "imrep_top_sales_buffer": imrep_top_sales_buffer,
            "imrep_manual_soq": imrep_manual_soq,
            "imrep_manual_order": imrep_manual_order,
            "Consign" : Consign,
            "inv_type" : inv_type,
            "BarcodeType" : BarcodeType,
            "outlet_guid":outlet_guid,
            "language":language,
            // "user_guid":user_guid


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
            // "Disable":Disable,
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
            "imrep_stock_day": imrep_stock_day,
            "imrep_min_day": imrep_min_day,
            "imrep_max_day": imrep_max_day,
            "imrep_lead_time": imrep_lead_time,
            "imrep_buffer_stock_day": imrep_buffer_stock_day,
            "imrep_top_sales_buffer": imrep_top_sales_buffer,
            "imrep_manual_soq": imrep_manual_soq,
            "imrep_manual_order": imrep_manual_order,
            "Consign" : Consign,
            "inv_type" : inv_type,
            "BarcodeType" : BarcodeType,
            "outlet_guid":outlet_guid,
            "language":language,
            // "user_guid":user_guid


          };
        // console.log(payload)
        // return

        var data = {};

        if(this.$route.name == 'CreateItemmaster')
        {
          
          console.log('payload',payload);
          // await this.$store.dispatch('itemmaster/trigger_create_item', payload).then(() => {
          //   data = JSON.parse(JSON.stringify(this.$store.getters['itemmaster/get_item_status']));
          // });
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
                  this.showAddLoading = false;
                  this.showNotify("positive", "Created Successfully.");
            }else
            {
                var error_response = data.detail;
                var show_error = "";
                this.showNotify('negative', JSON.stringify(error_response));

                this.showAddLoading = false;
            }
            //run time script see after this
        }
        else if(this.$route.name == 'EditItemmaster')
        {
          // payload.itemcode = this.json.Itemcode;
          // payload.language = this.language;
          // console.log('PAYLOAD',payload);
          // await this.$store.dispatch('itemmaster/trigger_update_item', payload).then(() => {
          //   data = JSON.parse(JSON.stringify(this.$store.getters['itemmaster/get_item_status']));
          // });
          

          var payload = {
              "pass_json": payloadUpdate,//pass_json should be the field or data wish to be created.
              "params": {}
              };
          var object_pass = {
            "dispatch": 'itemmaster/trigger_post_update_item_new', //refer to path/function_name in store actions.js
            "getter": 'itemmaster/get_create_item_new', //refer to path/function_name in store getters.js
            "app": this, //compulsory passed variable
            "payload": payload //payload that needed to use in store actions.js
            };
            var dispatch_response = await this.$dispatch(object_pass);
            if(dispatch_response.status)
            {
                  console.log('reponse',dispatch_response.status)
                  
                  this.showNotify("positive", "updated Successfully.");
                  this.showAddLoading = false;
            }else
            {
                console.log('haha wrong',dispatch_response.status)
                var error_response = dispatch_response.detail;
                var show_error = "";
                this.showNotify('negative', JSON.stringify(error_response));

                this.showAddLoading = false;
            }
        }

        var status = dispatch_response.status

        if(status)
        {
          alert('success');
          this.showAddLoading = false;

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
          //  console.log('dispatch_response',dispatch_response);
            if(dispatch_response.status){
              console.log('Runscript :',dispatch_response.message);
            }else{
                  var error_response = dispatch_response.message || dispatch_response.response;
                  this.showNotify('negative', error_response);
                  this.showAddLoading = false;
                  console.log('Runscript Failed',dispatch_response);
            }

          if(this.$route.name == 'CreateItemmaster')
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
          else if(this.$route.name == 'EditItemmaster')
          {
            if(mobile)
            {
              this.$router.push({ name: 'IMConfirm', query: { Itemcode: data.response.Itemcode, header: 'IM', type:'update' }})
            }
            else
            {
              this.showNotify("positive", "Updated Successfully.");
              var Itemcode = this.Itemcode;

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
          // var error_response = data.response.detail;
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
          this.showNotify('negative', JSON.stringify(error_response));

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
    async handleChangeDept_without_firstdata_col_category_subdepartment(newVal){
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
          this.getDivision()
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
          this.sub_dept_options = sub_dept_code

          }
          this.loading_sub_dept = false;
          this.action_change_selecting = false;
        })

    },
    async handleChangeDept(newVal){
      // console.log('newVal',newVal);
      this.action_change_selecting = true
      this.loading_sub_dept = true
      this.json.SubDept = ""
      this.json.Category = ""
      this.json.Division = "";
      this.$nextTick(async()=>{
      this.json.Dept =  newVal !== null ? this.json.Dept : ''
        if(this.json.Dept == ''){
          this.sub_dept_options = [];
          this.getAllCategoryOptions();
          this.category_options = [];
          this.division_options = [];
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
          //fetch the first department options
          var sub_dept = await this.getSubDept(payload);
            // console.log('sub_dept',sub_dept)
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
          await this.getDivision();

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
      this.category_options = category_code
      if (this.category_options.length > 0) {
        this.json.Category = this.category_options[0].value;
      }
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
          console.log('dispatch_response',dispatch_response.response);
          console.log('data',data);


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
              this.table_function3(this.ori_params);
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
    async handleActionListedBranch(payload){
        // }

        this.showAddLoading = true;
        this.show_listed_branch_dialog = true;
        this.edit_child = true;
        this.edit_listed_branch = false

        setTimeout(()=>{
          this.showAddLoading = false;
        },2000)

        this.json.branch = ''

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
    //         // console.log('edit barcode');


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
              sub_dept_name.push(obj);
            }
            this.sub_dept_options = sub_dept_name
            this.json.SubDept = get_dept_subdept[0].MCode;
          //  console.log('category options',this.category_options);

            var category = this.all_category.filter((entry) =>  entry.DeptCode ==  this.json.Dept && entry.MCode == this.json.SubDept) // Filter based on your condition
            .map((entry) => { // Map to a new object with only the desired keys
              return {
                  label: entry.Code+ ' - ' + entry.Description,
                  value: entry.Code,
              };
            });
                // console.log('category',category);
                this.category_options = category;
                console.log('Here category',this.category_options);

          }else{
             this.action_change_selecting= true;
             console.log('categor',this.all_category);
             var all_category= this.all_category.map((entry)=>{
              return{
                label: entry.Code+ ' - ' + entry.Description,
                value: entry.Code,
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
      // console.log('manufacturer_results',manufacturer_results);

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

      // console.log('mfr_description',mfr_description);
      this.manufacturer_options = mfr_description;

      this.json.Manufacturer = code_mft
      //console.log('Manufacturer',this.json.Manufacturer);
    },
    async handleChangeDivision(newVal){
      // console.log('newVal',newVal);
      // this.action_change_selecting = true
      // this.loading_division = true
      // this.json.Dept = ""
      // this.json.SubDept = ""
      // this.json.Category = ""
      // this.dept_options = [];
      // this.sub_dept_options = [];
      // this.getDivision();
      // var DeptCode = this.json.Dept
      
      // this.json.Division = newVal;
      // var division = this.json.Division;
      // if(newVal){
      //   var get_dept_subdept = this.all_division.filter((entry) => entry.Code == newVal) // Filter based on your condition
      //   .map((entry) => { // Map to a new object with only the desired keys
      //     return {
      //         Code: entry.Code,
      //         DeptCode: entry.DeptCode,
      //         Description: entry.Description,
      //         MCode: entry.MCode,
      //         CategoryCode: entry.Code
      //     };
      //   });
      //   // console.log('get_dept_subdept',get_dept_subdept);
      //   this.json.Dept = get_dept_subdept[0].DeptCode;

      // var payloadSubDept = {
      //       language : this.language,
      //       skip: 0,
      //       limit: 99999999,
      //       MCode:  this.json.Dept
      //   }
      // var sub_dept = await this.getSubDept(payloadSubDept);
      // var sub_dept_results =  sub_dept.detail;
      // var sub_dept_name = [];
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
      //         sub_dept_name.push(obj);
      //       }
      //       this.sub_dept_options = sub_dept_name
      //       this.json.SubDept = get_dept_subdept[0].MCode;
      //     //  console.log('category options',this.category_options);
      // var payloadCategory = {
      //         language : this.language,
      //         skip: 0,
      //         limit: 99999999,
      //         sort_by: "Description",
      //         sort_type: "ASC",
      //   }
      //       var category = await this.getCategory(payloadCategory)
      //       var category_results = category.detail

      //       var category_code = [];
      //       for(var i in category_results)
      //       {
      //         var sample = category_results[i];

      //         var obj = {
      //           label: sample.Code+ ' - ' + sample.Description,
      //           value: sample.Code
      //         }
      //         category_code.push(obj);
              
      //       }
      //     this.category_options = category_code
      //     this.json.SubDept = get_dept_subdept[0].CategoryCode;

      
      // }
        
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
        // this.getSupcus(Spayload),
        this.getSupcusDropdown(),
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
   
    
  },
  watch:{
    'json.Itemcode': function(newItemcode) {
      if (this.show_assortment_dialog) { // Check if the assort dialog is open
        const selectedOption = this.itemcode_options.find(option => option.value === newItemcode);
        if (selectedOption) {
          this.json.description = selectedOption.description;
        } else {
          this.json.description = '';
        }
      }
    },
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
  /* margin-bottom: 20px; */
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
