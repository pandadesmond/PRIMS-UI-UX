<template>
  <div style="font-size: 10px; padding-left: 15px; padding-right: 15px;">
  <!-- {{last_enter_field}} -->

      <div class="text-subtitle1 header_text header_top">
          {{ title }} - {{page_function}}
      </div>

      <q-form ref="save_form" style="background-color:white;">
          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">

          <div class="row">
            <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-xs-12">
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
                  title="Information"
                  icon="edit"
                  :done="done1"
                  style="font-size: 10px; padding-left: 15px; padding-right: 15px;"
                  >
                  </q-step>
                  
              </q-stepper>
            </div>
            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
            </div>
            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 top_right_button">
              <div class="custom_disabled">
                  <Button :disable="page_function == 'create' || page_function == 'edit'" v-on:receiveClick="handleAdd"
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
                  
                  <Button :disable="page_function == 'create' || page_function == 'edit'  ? true : false" v-on:receiveClick="handleEdit"
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
                  
                  <Button :disable="page_function == 'view' ? true : false" v-on:receiveClick="handleCreateVendor"
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

                  <Button :disable="false" v-on:receiveClick="back()"
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

          <div class="step-content">
              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div style="align-items: center; width: 100%;">
                      <div class="col-xl-10 col-lg-10 col-md-10 col-sm-10 col-xs-10" style="padding-top: 10px; height: 100%;">
                        <div class="row" style="margin-bottom: 10px;">

                          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-12" style="padding-right: 10px;">
                            <div class="row">

                              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <div class="row">       

                                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pb-sm">
                                    <div class="row" style="align-items: center;">
                                      <div class="col-xl-5 col-lg-5 col-md-5 col-sm-3 col-xs-3">
                                          <Label :pass_value="'RefNo'" v-on:receiveClick="openDialog_SupplierLink"/>
                                      </div>
                                      <div class="col-xl-7 col-lg-7 col-md-7 col-sm-9 col-xs-9">
                                          <Input :readonly="page_function == 'view' ? true : false" :autofocusclick="true" 
                                          :disable="page_function == 'edit' || page_function == 'create'"
                                          v-model:pass_value="json.RefNo" 
                                          v-on:receiveChange="handleChange"
                                          :dbComponentBehavior="dbComponentBehavior.text"/>
                                      </div>
                                    </div>
                                  </div>

                                </div>
                              </div>

                              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12" :class="$q.screen.width > 1023 ? 'q-pl-xs' : ''">
                                <div class="row">

                                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pb-sm">
                                    <div class="row" style="align-items: center;">
                                      <div class="col-xl-5 col-lg-5 col-md-5 col-sm-3 col-xs-3">
                                          <Label :pass_value="'Effective Date'" v-on:receiveClick="openDialog_SupplierLink"/>
                                      </div>
                                      <div class="col-xl-7 col-lg-7 col-md-7 col-sm-9 col-xs-9">
                                        <Datepicker class="custom_datepicker" :disable="page_function == 'view' ? true : false" v-on:receiveChange="handleChangeEinvStartDate" :daterange="json.EffectiveDate" 
                                        :componentBehavior="dbComponentBehavior.date_required" :autoclose="true"/>
                                      </div>
                                    </div>
                                  </div>

                                </div>
                              </div>
                            </div>

                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="align-items: center; padding-bottom: 8px;">

                              <div class="row">
                                <div :style="$q.screen.width > 1024 ? 'width: 20.7%;' : 'width: 25%'">
                                  <Label :pass_value="'Item Type From'"/>
                                </div>
                                <div :style="$q.screen.width > 1024 ? 'width: 79.3%;' : 'width: 75%'">
                                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" >
                                    <Select
                                    :readonly="page_function == 'view' ? true : false"
                                    v-model:pass_value="json.Category_From"
                                    v-on:receiveChange="handleChange"
                                    :dbComponentBehavior="dbComponentBehavior.select"
                                    label=""
                                    :options="Category_From_options"
                                    />
                                  </div>
                                </div>
                              </div>

                            </div>

                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="align-items: center; padding-bottom: 8px;">
                              <div class="row">
                                <div :style="$q.screen.width > 1024 ? 'width: 20.7%;' : 'width: 25%'">
                                  <Label :pass_value="'Item Type To'"/>
                                </div>
                                <div :style="$q.screen.width > 1024 ? 'width: 79.3%;' : 'width: 75%'">
                                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" >
                                    <Select
                                    :readonly="page_function == 'view' ? true : false"
                                    v-model:pass_value="json.Category_To"
                                    v-on:receiveChange="handleChange"
                                    :dbComponentBehavior="dbComponentBehavior.select"
                                    label=""
                                    :options="Category_To_options"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>

                          </div>

                          <div class="col-xl-8 col-lg-8 col-md-8 col-sm-6 col-xs-12" style="padding-right: 10px;">

                            <div class="row" style="padding-bottom: 8px;">
                              
                              <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                <div class="row">
                                  <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12" style="padding-right: 10px;">

                                    <div class="row" style="align-items: center; height: 100%;">
                                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                        <Label :pass_value="'Send'" />
                                      </div>
                                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12" style="text-align: right;">
                                        <q-toggle
                                          dense
                                          :false-value="0"
                                          :true-value="1"
                                          color="green"
                                          v-model="json.send"
                                          :disable="page_function == 'view' || page_function == 'edit'"
                                        />
                                      </div>
                                    </div>

                                  </div>

                                  <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12" style="padding-right: 10px;">
                                    
                                    <Button v-on:receiveClick="handleShowCreateBranch"
                                      :pass_label="'Send'"
                                      :pass_no_caps="true"
                                      :pass_square="true"
                                      :pass_dense="true"
                                      :pass_flat="true"
                                      class="custom_button_reassign"
                                      :disable="page_function == 'view' || page_function == 'edit'"
                                    />

                                  </div>
                                </div>
                              </div>

                              <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12" style="padding-right: 10px;">
                                
                                <div class="row" style="align-items: center;">
                                  <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                      <Label :pass_value="'Send By'" v-on:receiveClick="openDialog_SupplierLink"/>
                                  </div>
                                  <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                      <Input :readonly="page_function == 'view' ? true : false" :autofocusclick="true" 
                                      :disable="page_function == 'edit'"
                                      v-model:pass_value="json.send_by" 
                                      v-on:receiveChange="handleChange"
                                      :dbComponentBehavior="dbComponentBehavior.text"/>
                                  </div>
                                </div>

                              </div>
                              
                              <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12" style="padding-right: 10px;">
                                
                                <div class="row" style="align-items: center;">
                                  <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                      <Label :pass_value="'Send At'" v-on:receiveClick="openDialog_SupplierLink"/>
                                  </div>
                                  <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                      <Input :readonly="page_function == 'view' ? true : false" :autofocusclick="true" 
                                      :disable="page_function == 'edit'"
                                      v-model:pass_value="json.send_at" 
                                      v-on:receiveChange="handleChange"
                                      :dbComponentBehavior="dbComponentBehavior.text"/>
                                  </div>
                                </div>

                              </div>
                            
                            </div>

                            <div class="row" style="padding-bottom: 8px;">

                              <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                <div class="row">

                                  <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12" style="padding-right: 10px;">
                                    
                                    <div class="row" style="align-items: center; height: 100%;">
                                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                        <Label :pass_value="'Approved'" />
                                      </div>
                                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12" style="text-align: right;">
                                        <q-toggle
                                          dense
                                          :false-value="0"
                                          :true-value="1"
                                          color="green"
                                          v-model="json.approved"
                                          :disable="page_function == 'view' || page_function == 'edit'"
                                        />
                                      </div>
                                    </div>

                                  </div>

                                  <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12" style="padding-right: 10px;">
                                    
                                    <Button v-on:receiveClick="handleShowCreateBranch"
                                      :pass_label="'Approved'"
                                      :pass_no_caps="true"
                                      :pass_square="true"
                                      :pass_dense="true"
                                      :pass_flat="true"
                                      class="custom_button_reassign"
                                      :disable="page_function == 'view' || page_function == 'edit'"
                                    />

                                  </div>

                                </div>
                              </div>

                              <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12" style="padding-right: 10px;">
                                
                                <div class="row" style="align-items: center;">
                                  <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                      <Label :pass_value="'Approved By'" v-on:receiveClick="openDialog_SupplierLink"/>
                                  </div>
                                  <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                      <Input :readonly="page_function == 'view' ? true : false" :autofocusclick="true" 
                                      :disable="page_function == 'edit'"
                                      v-model:pass_value="json.approved_by" 
                                      v-on:receiveChange="handleChange"
                                      :dbComponentBehavior="dbComponentBehavior.text"/>
                                  </div>
                                </div>

                              </div>
                              
                              <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12" style="padding-right: 10px;">
                                
                                <div class="row" style="align-items: center;">
                                  <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                      <Label :pass_value="'Approved At'" v-on:receiveClick="openDialog_SupplierLink"/>
                                  </div>
                                  <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                      <Input :readonly="page_function == 'view' ? true : false" :autofocusclick="true" 
                                      :disable="page_function == 'edit'"
                                      v-model:pass_value="json.approved_at" 
                                      v-on:receiveChange="handleChange"
                                      :dbComponentBehavior="dbComponentBehavior.text"/>
                                  </div>
                                </div>

                              </div>
                            
                            </div>

                            <div class="row" style="padding-bottom: 8px;">

                              <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                <div class="row">

                                  <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12" style="padding-right: 10px;">
                                    
                                    <div class="row" style="align-items: center; height: 100%;">
                                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                        <Label :pass_value="'Posted'" />
                                      </div>
                                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12" style="text-align: right;">
                                        <q-toggle
                                          dense
                                          :false-value="0"
                                          :true-value="1"
                                          color="green"
                                          v-model="json.posted"
                                          :disable="page_function == 'view' || page_function == 'edit'"
                                        />
                                      </div>
                                    </div>

                                  </div>

                                  <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12" style="padding-right: 10px;">
                                    
                                    <Button v-on:receiveClick="handleShowCreateBranch"
                                      :pass_label="'Posted'"
                                      :pass_no_caps="true"
                                      :pass_square="true"
                                      :pass_dense="true"
                                      :pass_flat="true"
                                      class="custom_button_reassign"
                                      :disable="page_function == 'view' || page_function == 'edit'"
                                    />

                                  </div>

                                </div>
                              </div>

                              <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12" style="padding-right: 10px;">
                                
                                <div class="row" style="align-items: center;">
                                  <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                      <Label :pass_value="'Posted By'" v-on:receiveClick="openDialog_SupplierLink"/>
                                  </div>
                                  <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                      <Input :readonly="page_function == 'view' ? true : false" :autofocusclick="true" 
                                      :disable="page_function == 'edit'"
                                      v-model:pass_value="json.posted_by" 
                                      v-on:receiveChange="handleChange"
                                      :dbComponentBehavior="dbComponentBehavior.text"/>
                                  </div>
                                </div>

                              </div>
                              
                              <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12" style="padding-right: 10px;">
                                
                                <div class="row" style="align-items: center;">
                                  <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                      <Label :pass_value="'Posted At'" v-on:receiveClick="openDialog_SupplierLink"/>
                                  </div>
                                  <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                      <Input :readonly="page_function == 'view' ? true : false" :autofocusclick="true" 
                                      :disable="page_function == 'edit'"
                                      v-model:pass_value="json.posted_at" 
                                      v-on:receiveChange="handleChange"
                                      :dbComponentBehavior="dbComponentBehavior.text"/>
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

          <q-card flat class="card-container" style="max-height: 100%; padding: 10px;border-radius: 0px; padding-top: 0px;padding-left: 0px;">
              <q-card-section class="upload_container" style="font-size: 10px;">
  
              <q-card-actions class="dialog_action justify-between row" style="padding-left: 10px; padding-right: 0px;">
  
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" style="margin-top: 5px;">
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
                            @update:model-value="handleChangeTab"
                            >
                                <q-tab content-class="custom_tab_font" name="Information" label="Information"/> 
                            </q-tabs>
                        </q-toolbar>
                      </div>

                      
                      <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                        <q-toolbar class="bg-white custom_toolbar_tab">
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" align="right">

                            <Button v-on:receiveClick="handleAddCategoryC"
                            v-if="tab == 'Information' && page_function == 'edit'"
                            :pass_label="'Create'"
                            :pass_no_caps="true"
                            :pass_square="true"
                            :pass_dense="true"
                            class="custom_button"
                            />

                          </div>

                        </q-toolbar>
                      </div>

                      <q-separator />
  
                      <q-tab-panels v-model="tab" :animated="false" keep-alive ref="tabs">
                        
                        <q-tab-panel name="Information" style="padding: 0px; padding-top: 10px; color: grey; overflow: hidden">
                          
                          <div class="row">
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom: 10px; padding-right: 10px;">

                              <Table
                              :row_per_page="[5,10,20,50]"
                              :title="table_title"
                              :table_data="table_data"
                              :table_column="table_column"
                              :flat_status="true"
                              :bordered_status="true"
                              v-on:receiveRequestTable="handleTableChange"
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
                              :pass_visible_columns="visibleColumns"
                              />

                            </div>
                          </div>
                            
                        </q-tab-panel>
    
                      </q-tab-panels>
                    </div>
                  </div>
  
              </q-card-actions>
              
              </q-card-section>
          </q-card>

          </div>
          
      </q-form>

      <!-- <q-card-actions class="dialog_action justify-between">
          <span class="q-pl-xs">
          <Button_icon :flat="true" :font_color="'black'" :color="'white'" :text="'BACK'" :outline="true" size="15px" class="custom_cancel_button" @click="back()" />
          </span>
          <span v-if="$route.name != 'VendorView'" class="q-pl-xs">
              <Button_icon :flat="true" :font_color="'white'" :color="'#094161'" :text="'SAVE'" :outline="false" size="15px"
              v-on:receiveClick="handleCreateVendor"/>
          </span>
  
      </q-card-actions>  -->

      <q-inner-loading
          :showing="showAddLoading"
          color="primary"
      />
  </div>


<q-dialog v-model="item_dialog" persistent position="top">
  <q-card style="width: 95vw; max-width: 1100px; max-height: 90vh; margin-top: 5%;">

    <q-card-section class="row items-center dialog_header_custom">
        <div class="text-h6">List By IType</div>
        <q-space />
        <q-btn icon="close" flat round dense :disable="item_loading" v-close-popup/>
    </q-card-section>

    <q-card-section>


      <div class="row dialog_content">

        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pl-xs">
          <div style="width: 100%;">
            <Table
            :row_per_page="[5,10,20,50,1000]"
            :title="item_table_title"
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

    </q-card-section>

    <q-card-actions class="dialog_action" align="right">
        <Button v-close-popup
          v-if="page_function != 'view'"
          :pass_label="'Cancel'"
          :pass_no_caps="true"
          :pass_square="true"
          :pass_dense="true"
        />

        <Button v-on:receiveClick="handleSaveDialogItem"
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
import Chip from 'src/components/ERP/Base/Chip'
import ButtonMobile from 'src/components/ERP/Itemmaster/ButtonMobile'
import PurchaseTable from 'src/components/ERP/Purchase/PurchaseTable'
import SupplierItemListTable from 'src/components/ERP/Purchase/SupplierItemListTable'
import Button_icon from 'src/components/ERP/Base/Button_icon'
import { Notify } from "quasar";
import SelectFilter from 'src/components/ERP/Itemmaster/SelectFilter'
import Textarea from'src/components/ERP/Base/Textarea' ;
import Label from 'src/components/ERP/Main/Label';
import Input from 'src/components/ERP/Main/Input';
import LabelSelectVerticalGeneral from 'src/components/ERP/Main/LabelSelectVerticalGeneral';
import LabelInputVerticalGeneral from 'src/components/ERP/Main/LabelInputVerticalGeneral';
import Button from 'src/components/ERP/Main/Button';
import Select from 'src/components/ERP/Main/Select'
import Table from 'src/components/ERP/Table/Table.vue';
import Checkbox from 'src/components/ERP/Base/Checkbox'
import Datepicker from 'src/components/ERP/Main/Datepicker'

export default {
  data() {
    return{
      itemForceLoading: false,
      item_table_title: '',
      item_table_data: [],
      item_table_column: [],
      item_dialog: false,
      item_loading: false,
      Category_From_options: [],
      Category_To_options: [],
      step: 1,
      visibleColumns: [],
      active_tab: 'Information',
      ori_params: {},
      table_title: '',
      table_data: [],
      table_column: [],
      route_path_edit: null,
      title: '',
      TransType: null,
      TransGuid: null,
      active_section: 'Supplier',
      tab: 'Information',
      json:{},
      language: sessionStorage.getItem("language") != "" && sessionStorage.getItem("language") != "null" && sessionStorage.getItem("language") != null ? sessionStorage.getItem("language") : [],
      session_outlet_guid: sessionStorage.getItem("session_outlet_guid") != "" && sessionStorage.getItem("session_outlet_guid") != "null" && sessionStorage.getItem("session_outlet_guid") != null ? sessionStorage.getItem("session_outlet_guid") : [],
      getuser: sessionStorage.getItem("getuser") != "" && sessionStorage.getItem("getuser") != "null" && sessionStorage.getItem("getuser") != null ? sessionStorage.getItem("getuser") : [],
      DC_CODE: sessionStorage.getItem("DC_CODE") != "" && sessionStorage.getItem("DC_CODE") != "null" && sessionStorage.getItem("DC_CODE") != null ? sessionStorage.getItem("DC_CODE") : [],
    }
  },
  components:{
    // Chip,
    // ButtonMobile,
    Input,
    Select,
    Checkbox,
    // PurchaseTable,
    // SupplierItemListTable,
    Button_icon,
    // SelectFilter,
    // Radio,
    // SelectPlaceholder,
    Textarea,
    // SearchPopUp,
    Label,
    LabelSelectVerticalGeneral,
    LabelInputVerticalGeneral,
    Button,
    Table,
    Datepicker,
  },
  computed: {
    dbComponentBehavior() {
    return this.$store.getters['dbComponentBehavior/byLanguage']('erp')
    },
    rowRange() {
        const start = (this.pagination.page - 1) * this.rows_per_page + 1;
        const end = Math.min(this.pagination.page * this.rows_per_page, this.pagination.rowsNumber);
        return `${start} - ${end} of ${this.pagination.rowsNumber}`;
    },
  },
  async created()
  {

      var TransGuid = this.$route.query.TransGuid;

      if(TransGuid)
      {
        if(this.$route.name == 'ReassignItemTypeView')
        {
          this.page_function = 'view';
          
          var json = {
            name: this.$route.name,
            query: this.$route.query,
          };

          sessionStorage.setItem("original_route", JSON.stringify(json));
        }
        else
        {
          this.page_function = 'edit';
        }

          this.TransGuid = TransGuid;
      }
      else
      {

        if(this.$route.name == 'ReassignItemTypeCreate')
        {
          this.page_function = 'create'
          this.showAddLoading = false;
        }
        else
        {
          alert('Parameter incorrect');
          this.goBack();
          return;
        }

      }

      if(this.$route.name == "ReassignItemTypeView")
      {
        this.TransType = 'IType';
        this.title = 'Reassign Item Type'
        this.route_path_edit = 'ReassignItemTypeEdit';
      }

      var offset = Number(this.$route.query.offset);
      var total_row = Number(this.$route.query.total_row);

      if(offset !== null && offset !== undefined && offset !== '' && total_row !== null && total_row !== undefined && total_row !== '')
      {
          this.offset = offset;
          this.total_row = total_row;
          this.disable_previous_button = offset <= '0' ? true : false;
          this.disable_next_button = offset >= total_row ? true : false;
      }



  },
  async mounted(){

    this.first_run = true;

    this.$nextTick(async ()=>{
      this.showAddLoading = true;

  
      var active_tab = JSON.parse(JSON.stringify(this.tab));
      
      await this.discoverTabs(active_tab, 'hide');

      var ItemTypeOptions  = await this.callItemType();

      this.Category_From_options = ItemTypeOptions;
      this.Category_To_options = ItemTypeOptions;
      
      if(this.page_function == 'view' || this.page_function == 'edit')
      {
        await this.callDetails();
      }

      this.showAddLoading = false;

      this.first_run = false;
    })

  },
  methods:{
    handleAdd(){
      this.$router.push({ name: "ReassignItemTypeCreate" });
    },
    handleCancel()
    {
      var route = JSON.parse(sessionStorage.getItem("original_route"));
      
      this.$router.push({
        name: route.name,
        query: route.query
      });
      
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
    async handleSaveDialogItem()
    {
      alert('wait api');
      var array = this.item_table_data.data.results.filter((entry)=>{
        return entry.select;
      });
      
      var payload = {
          "pass_json": payload//pass_json should be the field or data wish to be created.
      };

      var object_pass = {
          "dispatch": 'configuration/trigger_post_create_req_chg_category_c_bulk', //refer to path/function_name in store actions.js
          "getter": 'configuration/get_create_req_chg_category_c_bulk', //refer to path/function_name in store getters.js
          "app": this, //compulsory passed variable
          "payload": payload //payload that needed to use in store actions.js
      };

      var dispatch_response = await this.$dispatch(object_pass);

      if(dispatch_response.status)
      {
          //success conditi
      }

    },
    itemHandleTableChange(newVal)
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

        payload.ItemType_or = [this.json.Category_From, this.json.Category_To];

        // if(this.rearrange_column.length > 0)
        // {
        //     var table_column = this.rearrange_column;
        // }
        // else
        // {
            var table_column = [
              {
                name: 'select',
                required: true,
                label: 'Select',
                align: 'left',
                sortable: true,
                field: 'select',
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
                label: 'Brand Code',
                align: 'left',
                sortable: true,
                field: 'Brand',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center; width: 1%; color: red;',
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
                name: 'PackSize',
                required: true,
                label: 'Pack Size',
                align: 'left',
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
                name: 'ArticleNo',
                required: true,
                label: 'ArticleNo',
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
                name: 'ItemType',
                required: true,
                label: 'ItemType',
                align: 'left',
                sortable: true,
                field: 'ItemType',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center; width: 1%;',
                filter_type: 'input',
                filter_options: [],
                filter_value: '',
              },
              {
                name: 'vendor_code',
                required: true,
                label: 'Vendor',
                align: 'left',
                sortable: true,
                field: 'vendor_code',
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

        if(this.page_function != "create")
        {
          this.itemForceLoading = true;
          return;
        }

        for (const index in this.table_column) {

          var is_array = Array.isArray(this.table_column[index].filter_value);

          if(is_array)
          {
            var value = '';

            for (const value_index in this.table_column[index].filter_value) {
                value += this.table_column[index].filter_value[value_index]+",";
            }

            value = value.replace(/,\s*$/, "");

            payload[this.table_column[index].name] = value
          }
          else
          {
            if(this.table_column[index].filter_value)
            {
                payload[this.table_column[index].name] = this.table_column[index].filter_value
            }
            else
            {
                delete payload[this.table_column[index].name]
            }
          }
        }

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
            "dispatch": 'configuration/trigger_post_read_item_all', //refer to path/function_name in store actions.js
            "getter": 'configuration/get_read_item_all', //refer to path/function_name in store getters.js
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
            }

            this.item_table_data =
            {
                "data": {
                    "count": dispatch_response.response.total_row,
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


        this.itemForceLoading = false;
    },
    handleAddCategoryC()
    {
      this.item_dialog = true;
    },
    handleEdit()
    {
      var offset = this.$route.query.offset;
      var total_row = this.$route.query.total_row;
      
      this.$router.push({
          name: this.route_path_edit,
          query: { TransGuid: this.TransGuid, offset: offset, total_row: total_row}
      });
    },
    async callItemType()
    {
      var payload = {
        "pass_json":{
          "language": this.language,
          "TransGuid": this.TransGuid
        }
      };

      var object_pass = {
        "dispatch": 'configuration/trigger_post_read_item_type', //refer to path/function_name in store actions.js
        "getter": 'configuration/get_read_item_type', //refer to path/function_name in store getters.js
        "app": this, //compulsory passed variable
        "payload": payload //payload that needed to use in store actions.js
      };

      var dispatch_response = await this.$dispatch(object_pass);

      var array = [];

      if(dispatch_response.status)
      {
        if(dispatch_response.response.length > 0)
        {
          array = dispatch_response.response;

          for (const index in dispatch_response.response) {
            var object = {
              "label": dispatch_response.response[index].ItemType,
              "value": dispatch_response.response[index].ItemType,
            };

            array.push(object);
          }

          array = array.sort(function(a, b){
            return a.label > b.label ? 1 : (a.label === b.label ? 0 : -1 );
          });

        }
      }

      return array;
    },
    async callDetails()
    {
      
      var payload = {
        "pass_json":{
          "outlet_guid": this.session_outlet_guid,
          "language": this.language,
          "TransGuid": this.TransGuid
        }
      };

      var object_pass = {
        "dispatch": 'configuration/trigger_post_get_req_chg_category', //refer to path/function_name in store actions.js
        "getter": 'configuration/get_get_req_chg_category', //refer to path/function_name in store getters.js
        "app": this, //compulsory passed variable
        "payload": payload //payload that needed to use in store actions.js
      };

      var dispatch_response = await this.$dispatch(object_pass);

      console.log('dispatch_response');
      console.log(dispatch_response);

      if(dispatch_response.status)
      {
        if(dispatch_response.response.detail.length > 0)
        {
          this.json = dispatch_response.response.detail[0];
        }
      }

    },
    async discoverTabs(active_tab = null, hide_loading = null) {
      // traverse the tabs to discover its content
      var tabNames = ["Information"];

      let traversal = tabNames.reduce((promiseChain, item) => {
          return promiseChain.then(() => new Promise(resolve => {
              // console.log("done with", item)
              resolve()
            //   console.log(item);
              this.$refs.tabs.goTo(item)
              })
          )
      }, Promise.resolve())

      traversal.then(() => {
        // console.log("done")
        if(active_tab == null)
        {
          this.$refs.tabs.goTo(tabNames[0])
        }
        else
        {
          this.$refs.tabs.goTo(active_tab)
        }

        if(hide_loading == 'hide')
        {
          this.loading = false;
        }

      })

      return true;
    },
    handleTableChange: function(newVal)
    {


          var new_params = this.$pluginsTableParams(newVal)

          var payload = {
              params : new_params
          };

          this.ori_params = payload;

          if(this.tab != 'Information')
          {
            return;
          }
          this.table_function(payload);
    },
    async table_function(ori_payload){
        // var payload = ori_payload.params

        // payload.Itemcode = this.Itemcode;
        // payload.Itemcode = '';
        // payload.outlet_guid = this.session_outlet_guid;//session
        // payload.language = this.language;

        var table_column = [
          {
            name: 'Department',
            required: true,
            label: 'Department',
            align: 'left',
            sortable: true,
            field: 'Department',
            format_child: '',
            tooltip: '',
            headerStyle: 'text-align: center;',
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
            headerStyle: 'text-align: center;',
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
            headerStyle: 'text-align: center;',
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
            headerStyle: 'text-align: center;',
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
            headerStyle: 'text-align: center;',
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
            headerStyle: 'text-align: center;',
          },        
          {
            name: 'SellingPriceCurrent',
            required: true,
            label: 'SellingPriceCurrent',
            align: 'left',
            sortable: true,
            field: 'SellingPriceCurrent',
            format_child: '',
            tooltip: '',
            headerStyle: 'text-align: center;',
          },        
          {
            name: 'ItemTypeCurrent',
            required: true,
            label: 'ItemTypeCurrent',
            align: 'left',
            sortable: true,
            field: 'ItemTypeCurrent',
            format_child: '',
            tooltip: '',
            headerStyle: 'text-align: center;',
          },        
          {
            name: 'vendor_code',
            required: true,
            label: 'vendor_code',
            align: 'left',
            sortable: true,
            field: 'vendor_code',
            format_child: '',
            tooltip: '',
            headerStyle: 'text-align: center;',
          }
        ];

        this.table_column = table_column;

        //put return here
        if(this.page_function == 'create' || this.page_function == 'view')
        {
          // alert('barcode')
            table_column = table_column.filter((entry)=>{
                return entry.name != 'action'
            })
        }

        if(this.page_function == 'create'){
            this.table_data = {
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
          "pass_json": ori_payload.params,
        };

        payload.pass_json.TransGuid = this.TransGuid;
        payload.pass_json.outlet_guid = this.session_outlet_guid;//session
        payload.pass_json.language = this.language;


        this.ori_payload = JSON.parse(JSON.stringify(payload))
        var object_pass = {
          "dispatch": 'configuration/trigger_post_get_req_chg_category_c', //refer to path/function_name in store actions.js
          "getter": 'configuration/get_get_req_chg_category_c', //refer to path/function_name in store getters.js
          "app": this, //compulsory passed variable
          "payload": payload //payload that needed to use in store actions.js
        };

        var dispatch_response_barcode = await this.$dispatch(object_pass);

        var status = dispatch_response_barcode.status

        if(status == "failed"){
          this.table_data = {
            "data": {
              "count": 0,
              "next": null,
              "previous": null,
              "results": []
            }
          };
        }else{
          var results = dispatch_response_barcode.response.detail;

          // else if(this.page_function == 'EditItemmaster'){
              this.table_data = {
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

  },
  watch: {

  },
}
</script>

<style scoped>
.custom_disabled >>> .q-btn.disabled {
  opacity: 0.2 !important;
}

.custom_button_reassign{
  background-color: #ebebeb;
  width: 100%;
  font-size: 12px;
  height: 32px;
}

* >>> .q-field--outlined.q-field--readonly .q-field__control:before {
    border-style: solid;
}
* >>> .custom_select.q-field--standard .q-field__control:before {
  display: none !important;
}

* >>> .custom_select.q-field--standard .q-field__control:after {
  display: none !important;
}

* >>> .custom_select.q-field--standard.q-field--dense .q-field__control .q-field__append.q-field__marginal {
  height: 40px !important;
  align-items: center;
}

* >>> .custom_select.q-field--standard.q-field--dense .q-field__control {
  height: 24px !important;
}

* >>> .custom_select.q-field--standard.q-field--dense .q-field__control .q-field__control-container {
    height: 40px !important;
}

.weekdays_container
{
    border: 1px solid #cfcfcf;
    height: 100%;
}

.q-tab-panels
{
  width: 100%;
}

.header_top
{
  /* background-color: white; */
  position: sticky;
  z-index: 2;
  top: 0px;
  background-color: #F4F7FE;
  /* height: 57px;
  text-align: center;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 0px;
  padding-bottom: 0px; */
}

.top_right_button
{
    text-align: right;
    padding-top: 5px;
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

.step-content{
padding-left: 10px;
padding-right: 10px
}
.unknown_field
{
color: red;
}

.hide_section
{
display: none;
}

.q-textarea >>>.q-field__control {
min-height: 81px !important;

}

.rem_size >>> .q-field__inner, .rem_size >>> .q-field__inner > .q-field__control {
height: 56px !important;
}
.no-scroll {
overflow: hidden;
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
padding: 10px !important;
}

* >>> .BarcodeTable > .q-table__container > .q-table__middle > .q-table > tbody > tr > td
{
padding: 5px !important;
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
display:flex;
}



* >>> .custom_step > .q-stepper__tab > .q-stepper__label > .q-stepper__title
{
font-size: 12px;
width:100%
}

* >>> input[type="text"]
{
font-size: 12px;
}

* >>> .q-field__control
{
/* padding-left: 6px; */
padding-right: 6px;
padding-top: 0px;
padding-bottom: 0px;
}

* >>> .custom_tab_font > .q-tab__label
{
font-size: 12px;
overflow: hidden;
}

.custom_toolbar_tab
{
  padding-right: 0px;
  padding-left: 0px;
  height: 37px;
  min-height: 37px;
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
padding: 11px; 
border-radius: 8px;
background: #FFF !important;
box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
height: 43px;
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
padding-bottom: 16px;
}
.first-dialog_separator {
padding-top: 16px;
padding-bottom: 16px;
gap: 40px;
}
.rounded-outline-icon {
border: 1px solid #8B8D8B; 
border-radius: 50%; 
padding: 5%; 
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
width: 300px; 
height: 60px; 
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
  position: static;
  z-index: 2;
  top: 123px;
  

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
text-decoration: none; 
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
text-decoration: underline; 
}

.custom_close_button
{
color: #928f8f;
position: absolute;
padding: 0;
padding-left: 10px;
top: 1px;
right: 12px;
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
right: 12px; 
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
padding-left: 24px;
padding-right: 24px;
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
} */
/* *>>>.q-field--outlined.q-field--readonly .q-field__control:before {
  border-style: none;
} */
* >>> .q-field--outlined.q-field--readonly .q-field__control:before {
    border-style: solid;
}

* >>> .q-field--disabled.custom_datepicker > .q-field__inner
{
  cursor: text;
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