<template>
  <div v-if="$q.screen.width > 599" class="card_sides card_section">
    <div :class="page_function == 'CreateSystemAccessRight' ? 'chip-container_2' : 'chip-container_1'">
       <div v-if="page_function == 'CreateSystemAccessRight'" class="text-subtitle1 header_text">
         New System Access Right
        </div>
        <div v-if="page_function == 'EditSystemAccessRight'" class="text-subtitle1 header_text">
          Edit System Access Right > {{ $route.query.SystemAccessCode }}
        </div>
    </div>
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
              title="System Access Right"
              icon="settings"
              :done="done1"
              style="font-size: 10px; padding-left: 15px; padding-right: 15px;"
            >
            </q-step>
           </q-stepper>
          </div>

          <div class="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-xs-1" align = "right" style="padding-top: 10px; padding-left: 15px; padding-right: 15px;">
            <!-- <Button
              v-if="page_function == 'EditSystemAccessRight'"
              :disable="false"
              v-on:receiveClick="handleDelete"
              :pass_label="''"
              :pass_no_caps="true"
              :pass_square="true"
              :pass_dense="true"
              :pass_flat="true"
              :tooltip="true"
              :pass_tooltip="'Delete'"
              style="font-size: 12px; background-color: #C10015; color: white; margin-left: 0px; margin-right: 10px;"
              :pass_icon="'delete'"
            /> -->
          </div>

         </div>

          <div class="step-content" style="font-size: 10px; padding-left: 15px; padding-right: 15px;">
            <div class="row" style="align-items: center; width: 100%;">
              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-top: 10px; height: 100%;">

                <div class="row" style="margin-bottom: 10px;">
                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div class="row">

                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px;">
                        <div class="row" style="align-items: center;">
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                              <Label :pass_value="'Group Code'" />
                            </div>
                            <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                              <!-- <SelectFilter
                                ref="selectComponent"
                                :readonly="false"
                                :no_label="false"
                                v-model:pass_value="json.Code"
                                :dbComponentBehavior="action_change_selecting ? dbComponentBehavior.select : dbComponentBehavior.text"
                                :options="code_options"
                                v-on:receiveChange="handleChangeCode"
                                :text_italic = "false"
                              /> -->

                              <Input
                                  :autofocusclick="false"
                                  :no_label="false"
                                  :readonly="page_function == 'EditSystemAccessRight' ? true : false"
                                  v-on:change="handleChangeCode"
                                  v-model="json.code"
                                  :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.text_required2 : oridbComponentBehavior.text_required2" />
                            </div>
                          </div>
                      </div>

                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px;">
                        <div class="row" style="align-items: center;">
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                              <Label :pass_value="'Description'" />
                            </div>
                            <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                              <!--  :label="$language('D0098')" -->
                              <Input
                                  :autofocusclick="false"
                                  :no_label="false"
                                  :readonly="false"
                                  v-on:change="handleChangeDescription"
                                  v-model="json.description"
                                  :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.text : oridbComponentBehavior.text" />
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

              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" style="margin-top: 20px;">
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
                      </q-tabs>
                  </q-toolbar>

                  <q-separator />

                  <q-tab-panels v-model="tab" :animated="false" keep-alive >
                    <q-tab-panel name="Information" style="padding: 0px; padding-top: 10px; color: grey" class="no-scroll">

                      <div class="row">
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom: 10px;">
                          <Button v-on:receiveClick="handleActiveClickSection('Basic')"
                            :label="triggeruser == true ? 'Back To Module' : 'Module'"
                            :pass_no_caps="true"
                            :pass_square="true"
                            :pass_dense="true"
                            :class="[active_section == 'Basic' ? 'active_section_button' : 'inactive_section_button']"
                          />

                          <!-- v-on:receiveClick="handleActiveClickSection('Basic1')" -->
                          <Button
                            v-if="triggeruser"
                            :disable = "true"
                            :pass_label="'User'"
                            :pass_no_caps="true"
                            :pass_square="true"
                            :pass_dense="true"
                            :class="[active_section == 'Basic1' ? 'active_section_button' : 'inactive_section_button']"
                          />
                        </div>
                      </div>

                      <div class="row" v-if="active_section == 'Basic'">
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px;">

                          <!-- <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px;"> -->
                              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px;">
                              </div>

                              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 text-right" style="padding-right: 10px; padding-bottom: 10px;">
                                <Button
                                v-if="page_function == 'EditSystemAccessRight'"
                                v-on:receiveClick="addButtonSystemAccessRight"
                                :pass_label="'Create'"
                                :pass_no_caps="true"
                                :pass_square="true"
                                :pass_dense="true"
                                class="custom_button"
                                />
                                </div>
                          <!-- </div> -->

                          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom: 10px; padding-right: 10px;">
                          <!-- :row_per_page="[10,20,50,1000]" -->
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
                            :trigger_user="true"
                            v-on:receiveHandleAdd="handleReceiveHandleAdd"
                            v-on:receiveHandleEditDetails="handleReceiveHandleEdit"
                            v-on:receiveHandleDelete="handleReceiveHandleDelete"
                            v-on:receiveHandleUser="handleReceiveHandleUser"

                            :filter_mode_on="filter_mode_on"
                            v-on:receiveColumnRearrange="handleColumnRearrange"
                            v-on:filter_column="handleFilterColumn"
                            :forceLoading="forceLoading"
                            :column_reordering="false"
                            :row_reordering="false"
                            v-on:receiveHandleClearFilter="handleClearFilter"

                            :pass_visible_columns="visibleColumns"
                            />

                          </div>
                          </div>
                      </div>

                      <div class="row" v-if="active_section == 'Basic1'">

                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 text-bold" style="padding-right: 10px; font-size: 15px;">
                            Module: {{get_module}}
                        </div>

                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 text-right" style="padding-right: 10px; padding-bottom: 10px;">
                              <Button
                              v-if="page_function == 'EditSystemAccessRight'"
                              v-on:receiveClick="addButtonSystemAccessRight1"
                              :pass_label="'Create'"
                              :pass_no_caps="true"
                              :pass_square="true"
                              :pass_dense="true"
                              class="custom_button"
                              />
                              </div>

                      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom: 10px; padding-right: 10px;">

                        <!-- :row_per_page="[10,20,50,1000]" -->
                        <Table
                          :row_per_page="[5,10,20,50]"
                          :title="table_title1"
                          :table_data="table_data1"
                          :table_column="table_column1"
                          :flat_status="true"
                          :bordered_status="true"
                          v-on:receiveRequestTable="handleTableChange1"

                          :allow_add="false"
                          :allow_edit="true"
                          :allow_delete="true"
                          v-on:receiveHandleAdd="handleReceiveHandleAdd1"
                          v-on:receiveHandleEditDetails="handleReceiveHandleEdit1"
                          v-on:receiveHandleDelete="handleReceiveHandleDelete1"

                          :filter_mode_on="filter_mode_on"
                          v-on:receiveColumnRearrange="handleColumnRearrange1"
                          v-on:filter_column="handleFilterColumn1"
                          :forceLoading="forceLoading"
                          :column_reordering="false"
                          :row_reordering="false"
                          v-on:receiveHandleClearFilter="handleClearFilter1"

                          :pass_visible_columns="visibleColumns1"

                          />

 <!-- :handleActionColumn="'name'" -->
                      </div>
                      </div>

                    </q-tab-panel>

                  </q-tab-panels>

                </div>
              </div>

            </q-card-actions>
            <!-- <q-inner-loading
              :showing="showAddLoading"
              color="primary"
            /> -->
          </q-card-section>
        </q-card>
      </q-form>
      <q-card-actions class="dialog_action justify-between" style="padding-bottom: 10px;">
        <span class="q-pl-xs">
          <Button_icon :flat="true" :font_color="'black'" :color="'white'" :text="'BACK'" :outline="true" size="15px" class="custom_cancel_button" @click="back()" />
           </span>
          <span class="q-pl-xs">
              <Button_icon :flat="true" :font_color="'white'" :color="'#094161'" :text="'SAVE'" :outline="false" size="15px"
              v-on:receiveClick="handleCreateSystemAccessRight"/>
          </span>

      </q-card-actions>
      <!-- <q-inner-loading
        :showing="showAddLoading"
        color="primary"
      /> -->


  </div>

  <div v-else class="card_sides">

    <div :class="page_function == 'CreateSystemAccessRight' ? 'chip-container_2' : 'chip-container_1'">
          <Chip v-if="page_function == 'CreateSystemAccessRight'"  :label="$language('D0202')" :icon="'chevron_left'" text-color="grey-10" class="bold-font chip_sty back_chip_icon" @click="back()" />
          <Chip v-if="page_function == 'EditSystemAccessRight'" :icon="'chevron_left'" :square="true" :label="'Edit Module' +' / '+json.Itemcode" text-color="grey-10" class="bold-font chip_sty" v-on:receiveClick="handleNavigate('Itemmaster')"/>
      </div>
    <q-card class="card-container" style="min-height: 100vh;">
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
                  :name="1"
                  title="System Access Right"
                  prefix="1"
                  icon="settings"
                  :done="json.step > 1"
                >
                <!--Header-->
                  <div class="row col-12" style="gap:16px;padding-top:16px">
                    <!-- <div class="col-xs-12 col-sm-12 col-md-9 col-lg-9 col-xl-9"> -->
                    <div class="row col-12" style="gap:16px">
                      <div class="row col-12 mobile_section_font">General Information</div>
                        <!--Mobile Item Code -->
                        <div class="row col-12">
                          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-sm">
                            <div class="row">
                              <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                <span class="mobile_font">{{$language('D0203')}}</span>
                              </div> -->
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"><!--Item Code -->
                                <SelectFilter
                                  ref="selectComponent"
                                  :readonly="false"
                                  :no_label="false"
                                  v-model:pass_value="json.Code"
                                  :dbComponentBehavior="action_change_selecting ? dbComponentBehavior.select : dbComponentBehavior.text"
                                  :options="code_options"
                                  v-on:receiveChange="handleChangeCode"
                                  :text_italic = "false"
                                />
                              </div>
                            </div>
                          </div>

                          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pl-sm">
                            <div class="row">
                              <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                <span class="mobile_font">Item Link</span>
                              </div> -->
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <Input
                                  :autofocusclick="false"
                                  :no_label="false"
                                  :readonly="false"
                                  v-on:change="handleChange"
                                  v-model="json.Description "
                                  :dbComponentBehavior="dbComponentBehavior ?  dbComponentBehavior.text : oridbComponentBehavior.text" />
                              </div>
                            </div>
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
  </div>

  <q-dialog v-model="delete_child" persistent position="top">
    <q-card style="width: 864px; max-width: 98vw;text-align:center;margin-top: 5%;border-radius: 8px">

      <q-card-section class="theme_color row items-center" style="height:56px; padding: 8px 24px;border-bottom: 1px solid #a7bbcb;">
        <div class="confirm_title">{{ $language('D0115') }}<!--Confirmation--></div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup :disable="showAddLoading || showAddLoading2"/>
      </q-card-section>

      <q-card-section style="padding: 32px 24px">
        <!-- <span class="q-ml-sm custom_selection_font">{{general_body}}</span> -->
        <span class="confirmation_line_font">Are you sure to delete this?</span>
      </q-card-section>

      <q-card-actions align="right" style="padding-top:0px;padding-bottom:16px;padding-right:16px">
        <q-btn flat :label="$language('D0116')" font_color="#29292A" color="#29292A" v-close-popup size="12px" class="dialog_confirm_cancel_button"/> <!-- CANCEL -->
        <q-btn flat :label="$language('D0156')" size="12px" font_color="'white'" color="'#D81111'" class="confirm_delete_button" @click="handleDeleteModule" /> <!-- OK -->
      </q-card-actions>

      <q-inner-loading
        :showing="deleteLoading"
        color="primary"
      />
    </q-card>
  </q-dialog>

  <q-dialog v-model="delete_child1" persistent position="top">
    <q-card style="width: 864px; max-width: 98vw;text-align:center;margin-top: 5%;border-radius: 8px">

      <q-card-section class="theme_color row items-center" style="height:56px; padding: 8px 24px;border-bottom: 1px solid #a7bbcb;">
        <div class="confirm_title">{{ $language('D0115') }}<!--Confirmation--></div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup :disable="showAddLoading || showAddLoading2"/>
      </q-card-section>

      <q-card-section style="padding: 32px 24px">
        <!-- <span class="q-ml-sm custom_selection_font">{{general_body}}</span> -->
        <span class="confirmation_line_font">Are you sure to delete this?</span>
      </q-card-section>

      <q-card-actions align="right" style="padding-top:0px;padding-bottom:16px;padding-right:16px">
        <q-btn flat :label="$language('D0116')" font_color="#29292A" color="#29292A" v-close-popup size="12px" class="dialog_confirm_cancel_button"/> <!-- CANCEL -->
        <q-btn flat :label="$language('D0156')" size="12px" font_color="'white'" color="'#D81111'" class="confirm_delete_button" @click="handleDeleteUser" /> <!-- OK -->
      </q-card-actions>

      <q-inner-loading
        :showing="deleteLoading1"
        color="primary"
      />
    </q-card>
  </q-dialog>

  <q-dialog v-model="show_barcode_dialog" persistent :position="$q.screen.width > 599 ? 'top' : 'bottom'">
    <q-card v-if="$q.screen.width < 600" style="width: 700px; max-width: 98vw; margin-top: 5%;">
      <q-card-section class="row header_top_mobile" :style="{ textAlign: (!status && edit_barcode) ? 'center' : 'left' }">
        <div v-if="!status && edit_barcode" class="custom_delete" @click="handleDelete(jsonBarcode)">
          <!-- Delete -->
          <Button_icon :disabled="readonly_delete" :icon="'fas fa-trash-alt'" :flat="true" :color="''" :font-color="'black'" :outline="false" size="12px" v-on:click="handleDelete(jsonBarcode)" class="q-mr-sm text-red" />
          <!-- <Button_icon :disabled="readonly_delete" :icon="'delete'" :color="'negative'" :outline="false" size="12px" v-on:click="handleDelete(jsonChild)" class="q-mr-sm" /> -->
        </div>

        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div v-if="!edit_barcode" class="text-subtitle1 mobile_dialog_bottom" style="padding:16px 24px;margin-top: 0px;box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);">Add Module<br></div>
          <div v-else class="text-subtitle1 mobile_dialog_bottom" style="padding:16px 24px;margin-top: 0px;box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);">Edit Module<br></div>

        <div class="custom_close_button">
          <q-btn icon="close" flat round dense @click="close()" :disable="false"/>
        </div>
        </div>
      </q-card-section>

      <q-card-section class="upload_container">
        <q-form ref="save_edit_pochild_form">
          <div class="row upload_separator_first">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <div class="row input_wrapper_left_right">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <div class="row" style="gap:16px">
                    <!-- <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" style="gap:16px" :class="$q.screen.width > 1023 ? 'q-pl-sm': ''"> -->

                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                                :autofocusclick="true"
                                :no_label="false"
                                label="Module"
                                :readonly="false"
                                v-on:change="handleChangeModule"
                                v-model="json.module"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.number" />
                            </div>

                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-pt-md">
                              <Input
                                :autofocusclick="true"
                                :no_label="false"
                                :readonly="false"
                                v-on:change="handleChangeType"
                                v-model="json.type"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.number" />
                            </div>

                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-pt-md">
                              <Input
                                :autofocusclick="true"
                                :no_label="false"
                                label="Description"
                                :readonly="false"
                                v-on:change="handleChangeDescription1"
                                v-model="json.description1"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.number" />
                            </div>
                          </div>
                          </div>
                        </div>
                      </div>
                      </div>

                      <!-- edit barcode dialog -->
                      <div  v-if="edit_barcode" class="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
                        <div class="row">
                          <div class="" :class="edit_child ? 'col-xs-12' : 'col-xs-10'">
                            <div class="row">
                              <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                <span class="mobile_font">New Barcode</span>
                              </div> -->
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                                :autofocusclick="true"
                                :no_label="false"
                                :readonly="false"
                                v-on:change="handleChangeModule"
                                v-model="json.module"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.number" />
                            </div>

                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-pt-md">
                              <Input
                                :autofocusclick="true"
                                :no_label="false"
                                :readonly="false"
                                v-on:change="handleChangeType"
                                v-model="json.type"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.number" />
                            </div>

                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-pt-md">
                              <Input
                                :autofocusclick="true"
                                :no_label="false"
                                label="Description"
                                :readonly="false"
                                v-on:change="handleChangeDescription1"
                                v-model="json.description1"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.number" />
                            </div>
                            </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- </div> -->
                  </div>
                </div>
              </div>
        </q-form>
      </q-card-section>

      <q-card-actions  class="dialog_action" style="padding-right:24px; padding-left: 24px;">
        <div class="row full-width">
          <!-- add EDIT BARCODE -->
          <div class="full-width">
            <Button_icon class="full-width custom_primary_button" style="height: 30px;" :small_round="true" :text="'ADD'" :flat="false" :font_color="'white'" :color="'#1E90FF'" :outline="false" size="16px" @click="handleAddModule"/>
          </div>

        </div>
      </q-card-actions>

      <q-inner-loading
        :showing="showAddLoading"
        color="primary"
      />
    </q-card>


    <q-card v-else style="width: 95vw; max-width: 950px; max-height: 90vh; margin-top: 5%;">
      <q-card-section class="row items-center dialog_header_custom">
          <div v-if="edit_barcode" class="text-h6">Edit Module<br></div>
          <div v-else class="text-h6">Add Module<br></div>
          <q-space />
          <q-btn icon="close" flat round dense :disable="loading_dialog" v-close-popup />

      </q-card-section>

      <q-card-section class="row">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <q-form ref="save_form">
            <div class="row dialog_content">
              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 q-pl-xs">
                    <div class="row" style="height: 100%;">

                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 " :class="!edit_child ? '': ''">
                        <div class="row">
                          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div class="row" style="align-items: center;">
                              <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                  <Label :pass_value="'Module'" />
                              </div>

                              <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                <Input
                                  :autofocusclick="true"
                                  :no_label="false"
                                  :readonly="false"
                                  v-on:change="handleChangeModule"
                                  v-model="json.module"
                                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.number" />
                              </div>

                            </div>
                          </div>

                          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs">
                            <div class="row" style="align-items: center;">
                              <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                  <Label :pass_value="'Description'" />
                              </div>

                              <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                <Input
                                  :autofocusclick="true"
                                  :no_label="false"
                                  :readonly="false"
                                  v-on:change="handleChangeDescription1"
                                  v-model="json.description1"
                                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                              </div>

                            </div>
                          </div>
                        </div>
                      </div>
                  </div>
              </div>

              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 q-pl-xs">
                    <div class="row" style="height: 100%;">

                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 " :class="!edit_child ? '': ''">
                        <div class="row">

                          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div class="row" style="align-items: center;">
                              <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                  <Label :pass_value="'Type'" />
                              </div>

                              <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                <Input
                                  :autofocusclick="true"
                                  :no_label="false"
                                  :readonly="false"
                                  v-on:change="handleChangeType"
                                  v-model="json.type"
                                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.number" />
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


      <q-card-actions class="dialog_action" align="right">
            <q-btn flat label="Cancel" color="primary" v-close-popup/>
            <q-btn flat label="Confirm" color="primary" @click="handleAddModule" />
        </q-card-actions>

        <q-inner-loading
          :showing="loading_dialog"
          color="primary"
        />

      <q-inner-loading
        :showing="showAddLoading"
        color="primary"
      />
    </q-card>
  </q-dialog>

  <q-dialog v-model="show_barcode_dialog1" persistent :position="$q.screen.width > 599 ? 'top' : 'bottom'">
    <q-card v-if="$q.screen.width < 600" style="width: 700px; max-width: 98vw; margin-top: 5%;">
      <q-card-section class="row header_top_mobile" :style="{ textAlign: (!status && edit_barcode1) ? 'center' : 'left' }">
        <div v-if="!status && edit_barcode1" class="custom_delete" @click="handleDelete(jsonBarcode)">
          <!-- Delete -->
          <Button_icon :disabled="readonly_delete" :icon="'fas fa-trash-alt'" :flat="true" :color="''" :font-color="'black'" :outline="false" size="12px" v-on:click="handleDelete(jsonBarcode)" class="q-mr-sm text-red" />
          <!-- <Button_icon :disabled="readonly_delete" :icon="'delete'" :color="'negative'" :outline="false" size="12px" v-on:click="handleDelete(jsonChild)" class="q-mr-sm" /> -->
        </div>

        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div v-if="!edit_barcode1" class="text-subtitle1 mobile_dialog_bottom" style="padding:16px 24px;margin-top: 0px;box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);">Add User<br></div>
          <div v-else class="text-subtitle1 mobile_dialog_bottom" style="padding:16px 24px;margin-top: 0px;box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);">Edit User<br></div>

        <div class="custom_close_button">
          <q-btn icon="close" flat round dense @click="close1()" :disable="false"/>
        </div>
        </div>
      </q-card-section>

      <q-card-section class="upload_container">
        <q-form ref="save_edit_pochild_form">
          <div class="row upload_separator_first">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <div class="row input_wrapper_left_right">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <div class="row" style="gap:16px">
                    <!-- <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" style="gap:16px" :class="$q.screen.width > 1023 ? 'q-pl-sm': ''"> -->

                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                                :autofocusclick="true"
                                :no_label="false"
                                label="Name"
                                :readonly="false"
                                v-on:change="handleChangeName"
                                v-model="json.Name"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.number" />
                            </div>

                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-pt-md">
                              <div class="row" style="align-items: center;">
                                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                  <Label :pass_value="'Active'" />
                                </div>
                                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                  <!-- {{ json.active }} -->
                                  <Checkbox
                                    :btm_padding="true"
                                    size="xs"
                                    :disable="false"
                                    v-model="json.active"
                                    :true-value="1"
                                    :false-value="0"
                                    v-on:receiveChangenewVal="handleChangeActive"/>
                                </div>
                                </div>
                            </div>

                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-pt-md">
                              <Input
                                :autofocusclick="true"
                                :no_label="false"
                                label="Description"
                                :readonly="false"
                                v-on:change="handleChangeDescription"
                                v-model="json.description2"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                            </div>
                          </div>
                          </div>
                        </div>
                      </div>
                      </div>

                      <!-- edit barcode dialog -->
                      <div  v-if="edit_barcode" class="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
                        <div class="row">
                          <div class="" :class="edit_child ? 'col-xs-12' : 'col-xs-10'">
                            <div class="row">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                                :autofocusclick="true"
                                :no_label="false"
                                label="Name"
                                :readonly="false"
                                v-on:change="handleChangeName"
                                v-model="json.Name"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.number" />
                            </div>

                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-pt-md">
                              <div class="row" style="align-items: center;">
                                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                  <Label :pass_value="'Active'" />
                                </div>
                                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                  <!-- {{ json.active }} -->
                                  <Checkbox
                                    :btm_padding="true"
                                    size="xs"
                                    :disable="false"
                                    v-model="json.active"
                                    :true-value="1"
                                    :false-value="0"
                                    v-on:receiveChangenewVal="handleChangeActive"/>
                                </div>
                                </div>
                            </div>

                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-pt-md">
                              <Input
                                :autofocusclick="true"
                                :no_label="false"
                                label="Description"
                                :readonly="false"
                                v-on:change="handleChangeDescription"
                                v-model="json.description2"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                            </div>
                          </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- </div> -->
                  </div>
                </div>
              </div>
        </q-form>
      </q-card-section>

      <q-card-actions  class="dialog_action" style="padding-right:24px; padding-left: 24px;">
        <div class="row full-width">
          <!-- add EDIT BARCODE -->
          <div class="full-width">
            <Button_icon class="full-width custom_primary_button" style="height: 30px;" :small_round="true" :text="'ADD'" :flat="false" :font_color="'white'" :color="'#1E90FF'" :outline="false" size="16px" @click="handleAddModule"/>
          </div>

        </div>
      </q-card-actions>

      <q-inner-loading
        :showing="showAddLoading"
        color="primary"
      />
    </q-card>



    <q-card v-else style="width: 95vw; max-width: 950px; max-height: 90vh; margin-top: 5%;">
      <q-card-section class="row items-center dialog_header_custom">
          <div v-if="edit_barcode1" class="text-h6">Edit User<br></div>
          <div v-else class="text-h6">Add User<br></div>
          <q-space />
          <q-btn icon="close" flat round dense :disable="loading_dialog1" v-close-popup />

      </q-card-section>

      <q-card-section class="row">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <q-form ref="save_form">
            <div class="row dialog_content">
              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 q-pl-xs">
                    <div class="row" style="height: 100%;">

                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 " :class="!edit_child ? '': ''">
                        <div class="row">

                          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div class="row" style="align-items: center;">
                              <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                  <Label :pass_value="'Name'" />
                              </div>
                              <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                <Input
                                  :autofocusclick="true"
                                  :no_label="false"
                                  :readonly="false"
                                  v-on:change="handleChangeName"
                                  v-model="json.Name"
                                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                              </div>
                            </div>
                          </div>

                          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pt-xs">
                            <div class="row" style="align-items: center;">
                              <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                  <Label :pass_value="'Description'" />
                              </div>

                              <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                <Input
                                  :autofocusclick="true"
                                  :no_label="false"
                                  :readonly="false"
                                  v-on:change="handleChangeDescription2"
                                  v-model="json.description2"
                                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                              </div>
                            </div>

                          </div>
                            </div>
                      </div>
                  </div>
              </div>

              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 q-pl-xs">
                    <div class="row" style="height: 100%;">

                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 " :class="!edit_child ? '': ''">
                        <div class="row">

                          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pl-xs">
                            <div class="row" style="align-items: center;">
                              <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                  <Label :pass_value="'Active'" />
                              </div>
                              <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                <Checkbox
                                  :btm_padding="true"
                                  size="xs"
                                  :disable="false"
                                  v-model="json.active"
                                  :true-value="1"
                                  :false-value="0"
                                  v-on:receiveChangenewVal="handleChangeActive"/>
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


      <q-card-actions class="dialog_action" align="right">
            <q-btn flat label="Cancel" color="primary" v-close-popup/>
            <q-btn flat label="Confirm" color="primary" @click="handleAddUser" />
        </q-card-actions>

        <q-inner-loading
          :showing="loading_dialog1"
          color="primary"
        />

      <q-inner-loading
        :showing="showAddLoading"
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
import Datepicker from 'src/components/ERP/Base/Datepicker'
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
import Select from 'src/components/ERP/Main/Select'
import Table from 'src/components/ERP/Table/Table.vue';

export default{
  data() {
    return {

      json:{
        code: '',
        description: '',
        module:'',
        original_module: '',
        type:'',
        original_type: '',
        description1:'',
        Name:'',
        original_name: '',
        active: 0,
        description2: '',
        step: 1,
      },
      EffectiveDate:'',
      Rate:'',
      code_options:[],
      visibleColumns:[],
      visibleColumns1:[],

      triggeruser: false,
      get_code: '',
      get_module: '',
      get_type:'',

      get_code_child: '',
      get_module_child: '',
      get_type_child: '',

      get_code_grandcchild: '',
      get_module_grandcchild: '',
      get_name_grandcchild: '',
      get_type_grandcchild: '',

      loading_dialog: false,
      loading_dialog1: false,
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
      retailer_guid: sessionStorage.getItem("retailer_guid") != "" && sessionStorage.getItem("retailer_guid") != "null" && sessionStorage.getItem("retailer_guid") != null ? sessionStorage.getItem("retailer_guid") : [],
      user_name: sessionStorage.getItem("user_name") != "" && sessionStorage.getItem("user_name") != "null" && sessionStorage.getItem("user_name") != null ? sessionStorage.getItem("user_name") : [],
      language: sessionStorage.getItem("language") != "" && sessionStorage.getItem("language") != "null" && sessionStorage.getItem("language") != null ? sessionStorage.getItem("language") : [],
      currency_sign: sessionStorage.getItem("currency_sign") != "" && sessionStorage.getItem("currency_sign") != "null" && sessionStorage.getItem("currency_sign") != null ? sessionStorage.getItem("currency_sign") : [],
      session_outlet_guid: sessionStorage.getItem("session_outlet_guid") != "" && sessionStorage.getItem("session_outlet_guid") != "null" && sessionStorage.getItem("session_outlet_guid") != null ? sessionStorage.getItem("session_outlet_guid") : [],

      table_column: [],
      table_data: [],
      table_column1: [],
      table_data1: [],
      showAddLoading: false,
      showAddLoading2: false,

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
      all_supcus: {},
      all_location: {},
      status: false,
      page_function: this.$route.name,
      cardtype_guid: "",
      location_options: [],
      location_options2: [],
      active_delete_json: {},
      delete_child: false,
      delete_child1: false,
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
      deleteLoading1: false,
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
      show_barcode_dialog1:false,
      edit_barcode:false,
      edit_barcode1: false,
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
    SupplierItemListTable,
    Button_icon,
    SelectFilter,
    Radio,
    // SelectPlaceholder,
    Textarea,
    SearchPopUp,
    Table
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

      return option;
      }
      return [];
    },
  },
  async mounted()
  {
    this.showAddLoading = true;

    if(this.page_function === 'EditSystemAccessRight'){
      await this.fetchAllData()
    }

   setTimeout(()=>{
    this.showAddLoading = false;
   },2500)

  },
  async created () {},
  created() {
    this.initializeDefaultFields();
  },
  methods: {
    handleActiveClickSection(section)
    {
      this.active_section = section;

      if(this.active_section == 'Basic'){
        this.triggeruser = false
      }
    },

    async fetchAllData(){
      var payload = {
        "pass_json":{
          "outlet_guid": this.session_outlet_guid,
          "language": this.language,
          "code": this.$route.query.SystemAccessCode
        }
      }

      var object_pass = {
        "dispatch": 'setup2_systemaccessright/trigger_get_xgmain_get_xgmain',
        "getter": 'setup2_systemaccessright/get_xgmain_get_xgmain',
        "app": this,
        "payload": payload,
      };

      var dispatch_response_get_xgmain_get_xgmain = await this.$dispatch(object_pass);
      var status = dispatch_response_get_xgmain_get_xgmain.status

        if(status){
          this.json.code = dispatch_response_get_xgmain_get_xgmain.response.detail[0].code,
          this.json.description = dispatch_response_get_xgmain_get_xgmain.response.detail[0].description
        }
    },

    async handleCreateSystemAccessRight(){
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


      if(this.page_function == 'CreateSystemAccessRight'){
        var payload = {
        "pass_json":{
          "outlet_guid": this.session_outlet_guid,
          "language": this.language,
          "code": this.json.code,
          "description": this.json.description
        }
      }

      var object_pass = {
          "dispatch": 'setup2_systemaccessright/trigger_create_xgmain_get_xgmain',
          "getter": 'setup2_systemaccessright/get_xgmain_get_xgmain',
          "app": this,
          "payload": payload,
        };

        var dispatch_response_create_xgmain_get_xgmain= await this.$dispatch(object_pass);
        var status = dispatch_response_create_xgmain_get_xgmain.status

        if(status){
          this.showNotify('positive', 'Created Successfully')
          this.$router.push({
              name: "EditSystemAccessRight",
              query: { SystemAccessCode: dispatch_response_create_xgmain_get_xgmain.response.code}
          });
        }else{
          var get_error_message = JSON.parse(dispatch_response_create_xgmain_get_xgmain.response)
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
          "code": this.$route.query.SystemAccessCode,
          "description": this.json.description,
          "update_code": this.json.code
        }
      }

      var object_pass = {
          "dispatch": 'setup2_systemaccessright/trigger_patch_xgmain_get_xgmain',
          "getter": 'setup2_systemaccessright/get_xgmain_get_xgmain',
          "app": this,
          "payload": payload,
        };

        var dispatch_response_patch_xgmain_get_xgmain= await this.$dispatch(object_pass);
        var status = dispatch_response_patch_xgmain_get_xgmain.status

        if(status){
          this.showNotify('positive', 'Updated Successfully')
        }else{
          var get_error_message = JSON.parse(dispatch_response_patch_xgmain_get_xgmain.response)
          if(get_error_message){
            this.showNotify('negative', get_error_message.detail);
          }else{
            this.showNotify('nagative', 'Updated Failed')
          }
        }

        // this.table_function()
      }


    },


    handleChangeCode(newVal){
      this.$nextTick(()=>{
        this.json.code = newVal;
      });
    },
    handleChangeDescription(newVal){
      this.$nextTick(()=>{
        this.json.description = newVal;
      });
    },
    handleChangeModule(newVal){
      this.$nextTick(()=>{
        this.json.module = newVal;
      });
    },
    handleChangeType(newVal){
      this.$nextTick(()=>{
        this.json.type = newVal;
      });
    },
    handleChangeDescription1(newVal){
      this.$nextTick(()=>{
        this.json.description1 = newVal;
      });
    },
    handleChangeName(newVal){
      this.$nextTick(()=>{
        this.json.Name = newVal;
      });
    },
    handleChangeActive(newVal){
      this.$nextTick(()=>{
        this.json.active = newVal;
      });
    },
    handleChangeDescription2(newVal){
      this.$nextTick(()=>{
        this.json.description2 = newVal;
      });
    },

    addButtonSystemAccessRight(payload){
      this.showAddLoading = true;

      this.show_barcode_dialog = true
      this.edit_barcode = false

      this.json.module = ''
      this.json.type = ''
      this.json.description1 = ''

      setTimeout(()=>{
        this.showAddLoading = false;
      },1000)
    },
    addButtonSystemAccessRight1(payload){
      this.showAddLoading = true;

      this.show_barcode_dialog1 = true
      this.edit_barcode1 = false

      this.json.Name = ''
      this.json.active = 0
      this.json.description2 = ''

      setTimeout(()=>{
        this.showAddLoading = false;
      },1000)
    },

    handleDelete(pass_payload){
      // this.delete_pogroup = true
    },
    async handleDeletePOGroup(){
      this.deleteLoading = true

      var payload = {
        "pass_json":{
          "outlet_guid": this.session_outlet_guid,
          "language": this.language,
          "code": this.get_code,
        }
      }

      var object_pass = {
        "dispatch": 'setup2_systemaccessright/trigger_delete_xgmain_get_xgmain',
        "getter": 'setup2_systemaccessright/get_xgmain_get_xgmain',
        "app": this,
        "payload": payload,
      };

      var dispatch_response_delete_xgmain_get_xgmain = await this.$dispatch(object_pass);

      var status = dispatch_response_delete_xgmain_get_xgmain.status

      if(status){
        this.showNotify('positive', 'Deleted Successfully')
        this.delete_system = false
        this.deleteLoading = false
        this.table_function(this.ori_params)
      }else{
        var get_error_message = JSON.parse(dispatch_response_delete_xgmain_get_xgmain.response)
        if(get_error_message){
          this.showNotify('negative', get_error_message.detail);
          this.deleteLoading = false
        }else{
          this.showNotify('negative', 'Deleted Failed')
          this.deleteLoading = false
        }
      }
    },

    handleReceiveHandleEdit(pass_payload){
      this.showAddLoading = true;

      this.json.original_module = pass_payload.row.module
      this.json.original_type = pass_payload.row.type

      this.json.module = pass_payload.row.module
      this.json.type = pass_payload.row.type
      this.json.description1 = pass_payload.row.description

      var mobile = this.$q.screen.width < 600

      this.show_barcode_dialog = true;
      this.edit_child = true;
      this.edit_barcode = true;
      // this.jsonBarcode = payload

      setTimeout(()=>{
        this.showAddLoading = false;
      }, 1000)
    },
    handleReceiveHandleDelete(pass_payload){
      this.get_code_child = pass_payload.row.code
      this.get_module_child = pass_payload.row.module
      this.get_type_child = pass_payload.row.type

      // this.delete_child = true

    },
    async handleDeleteModule(){
      this.deleteLoading = true

      var payload = {
        "pass_json":{
          "outlet_guid": this.session_outlet_guid,
          "language": this.language,
          "code": this.get_code_child,
          "module": this.get_module_child,
          "type": this.get_type_child
        }
      }

      var object_pass = {
        "dispatch": 'setup2_systemaccessright/trigger_delete_xgmod_get_xgmod',
        "getter": 'setup2_systemaccessright/get_xgmod_get_xgmod',
        "app": this,
        "payload": payload,
      };

      var dispatch_response_delete_xgmod_get_xgmod = await this.$dispatch(object_pass);

      var status = dispatch_response_delete_xgmod_get_xgmod.status

      if(status){
        this.showNotify('positive', 'Deleted Successfully')
        this.delete_child = false
        this.deleteLoading = false
        this.table_function(this.ori_params)
      }else{
        var get_error_message = JSON.parse(dispatch_response_delete_xgmod_get_xgmod.response)
        if(get_error_message){
          this.showNotify('negative', get_error_message.detail);
          this.deleteLoading = false
        }else{
          this.showNotify('negative', 'Deleted Failed')
          this.deleteLoading = false
        }
      }
    },
    handleReceiveHandleUser(pass_payload){
      this.triggeruser = true
      this.active_section = 'Basic1';

      this.get_code = pass_payload.row.code
      this.get_module = pass_payload.row.module
      this.get_type = pass_payload.row.type

      // this.table_data1 = pass_payload;

    },
    handleReceiveHandleEdit1(pass_payload){
      this.showAddLoading = true;

      this.json.original_name = pass_payload.row.name
      this.json.Name = pass_payload.row.name
      this.json.active = pass_payload.row.active ? 1 : 0
      this.json.description2 = pass_payload.row.description

      var mobile = this.$q.screen.width < 600

      this.show_barcode_dialog1 = true;
      this.edit_child = true;
      this.edit_barcode1 = true;
      // this.jsonBarcode = payload

      setTimeout(()=>{
        this.showAddLoading = false;
      },1000)
    },
    handleReceiveHandleDelete1(pass_payload){
      this.get_code_grandcchild = pass_payload.row.code
      this.get_module_grandcchild = pass_payload.row.module
      this.get_name_grandcchild = pass_payload.row.name
      this.get_type_grandcchild = pass_payload.row.type

      // this.delete_child1 = true
    },
    async handleDeleteUser(){
      this.deleteLoading1 = true

      var payload = {
        "pass_json":{
          "outlet_guid": this.session_outlet_guid,
          "language": this.language,
          "code": this.get_code_grandcchild,
          "module": this.get_module_grandcchild,
          "type": this.get_type_grandcchild,
          "name": this.get_name_grandcchild
        }
      }

      var object_pass = {
        "dispatch": 'setup2_systemaccessright/trigger_delete_xgmodchild_get_xgmodchild',
        "getter": 'setup2_systemaccessright/get_xgmodchild_get_xgmodchild',
        "app": this,
        "payload": payload,
      };

      var dispatch_response_delete_xgmodchild_get_xgmodchild = await this.$dispatch(object_pass);

      var status = dispatch_response_delete_xgmodchild_get_xgmodchild.status

      if(status){
        this.showNotify('positive', 'Deleted Successfully')
        this.delete_child1 = false
        this.deleteLoading1 = false
        this.table_function1(this.ori_params)
      }else{
        var get_error_message = JSON.parse(dispatch_response_delete_xgmodchild_get_xgmodchild.response)
        if(get_error_message){
          this.showNotify('negative', get_error_message.detail);
          this.deleteLoading1 = false
        }else{
          this.showNotify('negative', 'Deleted Failed')
          this.deleteLoading1 = false
        }
      }
    },

    async handleAddModule(){
      // if(this.page_function == 'CreateSystemAccessRight'){
      //   var payload = {
      //     "pass_json":{
      //       "outlet_guid": this.session_outlet_guid,
      //       "language": this.language,
      //       "currency_guid": this.$route.query.CurrencyCode,
      //       "effective_date": this.effective_date,
      //       "currency_rate": this.currency_rate,
      //     }
      //   }

      //   var object_pass = {
      //     "dispatch": 'setup2_currency/trigger_create_currency_read_currency_c',
      //     "getter": 'setup2_currency/get_currency_read_currency_c',
      //     "app": this,
      //     "payload": payload,
      //   };

      //   var dispatch_response_create_currency_read_currency_c = await this.$dispatch(object_pass);
      //   console.log('dispatch_response_create_currency_read_currency_c', dispatch_response_create_currency_read_currency_c);

      //   var status = dispatch_response_create_currency_read_currency_c.status

      //   if(status){

      //   }
      // }else
      if(this.page_function == 'EditSystemAccessRight'){
        if(!this.edit_barcode){
          var payload = {
            "pass_json":{
              "outlet_guid": this.session_outlet_guid,
              "language": this.language,
              "code": this.$route.query.SystemAccessCode,
              "module": this.json.module,
              "type": this.json.type,
              "description": this.json.description1
            }
          }

          var object_pass = {
            "dispatch": 'setup2_systemaccessright/trigger_create_xgmod_get_xgmod',
            "getter": 'setup2_systemaccessright/get_xgmod_get_xgmod',
            "app": this,
            "payload": payload,
          };

          var dispatch_response_create_xgmod_get_xgmod = await this.$dispatch(object_pass);
          var status = dispatch_response_create_xgmod_get_xgmod.status

          if(status){
            this.showNotify('positive', 'Created Successfully')
            this.table_function(this.ori_params)
          }else{
            var get_error_message = JSON.parse(dispatch_response_create_xgmod_get_xgmod.response)
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
              "code": this.$route.query.SystemAccessCode,
              "module": this.json.original_module,
              "type": this.json.original_type,
              "description": this.json.description1,
              "update_module": this.json.module,
              "update_type": this.json.type
            }
          }

          var object_pass = {
            "dispatch": 'setup2_systemaccessright/trigger_patch_xgmod_get_xgmod',
            "getter": 'setup2_systemaccessright/get_xgmod_get_xgmod',
            "app": this,
            "payload": payload,
          };

          var dispatch_response_patch_xgmod_get_xgmod = await this.$dispatch(object_pass);
          var status = dispatch_response_patch_xgmod_get_xgmod.status

          if(status){
            this.showNotify('positive', 'Updated Successfully')
            this.table_function(this.ori_params)
          }else{
            var get_error_message = JSON.parse(dispatch_response_patch_xgmod_get_xgmod.response)
            if(get_error_message){
              this.showNotify('negative', get_error_message.detail);
            }else{
              this.showNotify('nagative', 'Updated Failed')
            }
          }
        }
      }

        this.show_barcode_dialog = false
    },
    async handleAddUser(){
      if(this.page_function == 'EditSystemAccessRight'){
        if(!this.edit_barcode1){
          var payload = {
            "pass_json":{
              "outlet_guid": this.session_outlet_guid,
              "language": this.language,
              "code": this.$route.query.SystemAccessCode,
              "module": this.get_module,
              "type": this.get_type,
              "name": this.json.Name,
              "active": this.json.active ? 1 : 0,
              "description": this.json.description2
            }
          }

          var object_pass = {
            "dispatch": 'setup2_systemaccessright/trigger_create_xgmodchild_get_xgmodchild',
            "getter": 'setup2_systemaccessright/get_xgmodchild_get_xgmodchild',
            "app": this,
            "payload": payload,
          };

          var dispatch_response_create_xgmodchild_get_xgmodchild = await this.$dispatch(object_pass);
          var status = dispatch_response_create_xgmodchild_get_xgmodchild.status

          if(status){
            this.showNotify('positive', 'Created Successfully')
            this.table_function1(this.ori_params)
          }else{
            var get_error_message = JSON.parse(dispatch_response_create_xgmodchild_get_xgmodchild.response)
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
              "code": this.$route.query.SystemAccessCode,
              "module": this.get_module,
              "type": this.get_type,
              "update_name": this.json.Name,
              "name": this.json.original_name,
              "active": this.json.active ? 1 : 0,
              "description": this.json.description2
            }
          }

          var object_pass = {
            "dispatch": 'setup2_systemaccessright/trigger_patch_xgmodchild_get_xgmodchild',
            "getter": 'setup2_systemaccessright/get_xgmodchild_get_xgmodchild',
            "app": this,
            "payload": payload,
          };

          var dispatch_response_patch_xgmodchild_get_xgmodchild = await this.$dispatch(object_pass);
          var status = dispatch_response_patch_xgmodchild_get_xgmodchild.status

          if(status){
            this.showNotify('positive', 'Updated Successfully')
            this.table_function1(this.ori_params)
          }else{
            var get_error_message = JSON.parse(dispatch_response_patch_xgmodchild_get_xgmodchild.response)
            if(get_error_message){
              this.showNotify('negative', get_error_message.detail);
            }else{
              this.showNotify('nagative', 'Updated Failed')
            }
          }
        }
      }

        this.show_barcode_dialog1 = false
    },

    async handleEditModule(){
      // if(this.page_function == 'EditSystemAccessRight'){
      //   console.log('this.$route.query.CurrencyCode', this.$route.query.CurrencyCode);

      //   var payload = {
      //     "pass_json":{
      //       "outlet_guid": this.session_outlet_guid,
      //       "language": this.language,
      //       "detail_guid": this.detail_guid,
      //       "currency_guid": this.$route.query.CurrencyCode,
      //       "effective_date": this.effective_date,
      //       "currency_rate": this.currency_rate,
      //       "created_by":  this.user_name,
      //       "updated_by":  this.user_name
      //     }
      //   }

      //   console.log('payload', payload);

      //   var object_pass = {
      //     "dispatch": 'setup2_currency/trigger_patch_currency_read_currency_c',
      //     "getter": 'setup2_currency/get_currency_read_currency_c',
      //     "app": this,
      //     "payload": payload,
      //   };

      //   var dispatch_response_patch_currency_read_currency_c = await this.$dispatch(object_pass);
      //   var status = dispatch_response_patch_currency_read_currency_c.status

      //   if(status){
      //     this.showNotify('positive', 'Updated Successfully')
      //     this.table_function(this.ori_params)
      //   }else{
      //     this.showNotify('negative', 'Updated Failed')
      //   }
      // }


      this.show_barcode_dialog = false
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
      // console.log('Received change:', value);
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

      this.delete_child = true;
    },
    async handleAction(payload){
      // if(this.page_function == 'CreateSystemAccessRight'){

      // }else
        if(this.page_function == 'EditSystemAccessRight'){
          this.module = payload.module
          this.type = payload.type
        }

      var mobile = this.$q.screen.width < 600

        this.show_barcode_dialog = true;
        this.edit_child = true;
        this.edit_barcode = true;
        this.showAddLoading = true;
        this.jsonBarcode = payload

        this.showAddLoading = false;

    },

    back(){
      this.$router.push("systemaccessright");
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

          this.ori_params = payload;
          this.table_function1(payload);
    },

    async table_function(ori_payload){
        var payload = ori_payload.params

        payload.skip = payload.offset;

        if(payload.ordering == "")
        {
          payload.ordering = "-code"
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


        var xpayload = {
        "pass_json":{
          "outlet_guid": this.session_outlet_guid,
          "language": this.language,
          "limit": this.ori_params.params.limit,
          "skip": this.ori_params.params.skip,
          "sort_by": payload.sort_by == "" ? "code" : payload.sort_by,
          "sort_type": payload.sort_type == "" ? "Desc" : payload.sort_type,
          "code": this.$route.query.SystemAccessCode
        }
        }

        var object_pass = {
          "dispatch": 'setup2_systemaccessright/trigger_get_xgmod_get_xgmod',
          "getter": 'setup2_systemaccessright/get_xgmod_get_xgmod',
          "app": this,
          "payload": xpayload,
        };

        var dispatch_response_get_xgmod_get_xgmod = await this.$dispatch(object_pass);
        var status = dispatch_response_get_xgmod_get_xgmod.status

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
          var results = dispatch_response_get_xgmod_get_xgmod.response.detail;

          if(this.page_function == 'CreateSystemAccessRight'){
              this.table_data = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
          }else if(this.page_function == 'EditSystemAccessRight'){
              this.table_data = {
              "data": {
                "count": dispatch_response_get_xgmod_get_xgmod.response.total_row,
                "next": null,
                "previous": null,
                "results": dispatch_response_get_xgmod_get_xgmod.response.detail
              }
            };
          }


          this.results = dispatch_response_get_xgmod_get_xgmod.response.detail;

          // this.showNext = this.ori_params.params.offset + this.ori_params.params.limit >= this.table_data.data.count;
          // // this.filter.total_row = this.table_data.data.count;
          // var from = this.ori_params.params.offset+1;
          // var to = this.ori_params.params.offset + this.table_data.data.results.length;
          // // this.filter.from = from;
          // // this.filter.to = to;
        }

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
                name: 'module',
                required: true,
                label: 'Module',
                align: 'left',
                sortable: true,
                field: 'module',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;',
            },
            {
                name: 'type',
                required: true,
                label: 'Type',
                align: 'left',
                sortable: true,
                field: 'type',
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
            }
        ];

        this.table_column = table_column;
    },
    async table_function1(ori_payload){
        var payload = ori_payload.params

        payload.skip = payload.offset;

        if(payload.ordering == "")
        {
          payload.ordering = "-code"
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


        var xpayload = {
        "pass_json":{
          "outlet_guid": this.session_outlet_guid,
          "language": this.language,
          "limit": this.ori_params.params.limit,
          "skip": this.ori_params.params.skip,
          "sort_by": payload.sort_by == "" ? "code" : payload.sort_by,
          "sort_type": payload.sort_type == "" ? "Desc" : payload.sort_type,
          "code": this.get_code,
          "module": this.get_module,
          "type": this.get_type
        }
        }

        var object_pass = {
          "dispatch": 'setup2_systemaccessright/trigger_get_xgmodchild_get_xgmodchild',
          "getter": 'setup2_systemaccessright/get_xgmodchild_get_xgmodchild',
          "app": this,
          "payload": xpayload,
        };

        var dispatch_response_get_xgmodchild_get_xgmodchild = await this.$dispatch(object_pass);
        var status = dispatch_response_get_xgmodchild_get_xgmodchild.status

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
          var results = dispatch_response_get_xgmodchild_get_xgmodchild.response.detail;

          if(this.page_function == 'CreateSystemAccessRight'){
              this.table_data1 = {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };
          }else if(this.page_function == 'EditSystemAccessRight'){

            // for(var i in results){
            //     results[i].active = results[i].active == 1;
            //   }

              this.table_data1 = {
              "data": {
                "count": dispatch_response_get_xgmodchild_get_xgmodchild.response.total_row,
                "next": null,
                "previous": null,
                "results": dispatch_response_get_xgmodchild_get_xgmodchild.response.detail
              }
            };
          }


          this.results = dispatch_response_get_xgmodchild_get_xgmodchild.response.detail;

          // this.showNext = this.ori_params.params.offset + this.ori_params.params.limit >= this.table_data.data.count;
          // // this.filter.total_row = this.table_data.data.count;
          // var from = this.ori_params.params.offset+1;
          // var to = this.ori_params.params.offset + this.table_data.data.results.length;
          // // this.filter.from = from;
          // // this.filter.to = to;
        }

        var table_column1 = [
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
                name: 'name',
                required: true,
                label: 'Name',
                align: 'left',
                sortable: true,
                field: 'name',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;',
            },
            {
                name: 'active',
                required: true,
                label: 'Active',
                align: 'center',
                sortable: true,
                field: 'active',
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
            }
        ];

        this.table_column1 = table_column1;
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
          // console.log('enter');
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
          this.close1()
        }
      }
    },
    close(){
      this.show_barcode_dialog = false
    },
    close1(){
      this.show_barcode_dialog1 = false
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
.btn_grp2 >>>.q-btn >>>.q-btn-item
{
  padding: 3px 8px !important;
}
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
  padding-right: 82%;
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

* >>> .q-field__control
{
  padding-left: 6px;
  padding-right: 6px;
  padding-top: 0px;
  padding-bottom: 0px;
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
  position: sticky;
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

* >>> .q-field--disabled > .q-field__inner > .q-field__control
{
  background-color: #cccccc !important;
}
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
* >>> .q-field--readonly > .q-field__inner > .q-field__control
{
  background-color: #E8E8E8 !important;
  border-radius: 8px !important;
  border: 2px solid #BABABA;
}
*>>>.q-field--outlined.q-field--readonly .q-field__control:before {
    border-style: none;
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

.custom_button
{
font-size: 14px;
background-color: #273655;
color: white;
margin-left: 5px;
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
}
</style>
