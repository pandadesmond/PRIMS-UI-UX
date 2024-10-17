<template>
  <div>
    <div style="padding-left: 15px; padding-right: 15px;" class="q-pt-sm text-bold">Company Profile</div>

    <q-card-section class="content_body_dialog">
      <q-form ref="save_form">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div class="step-content" style="font-size: 10px; padding-left: 15px; padding-right: 15px;">
              <div class="row" style="align-items: center; width: 100%;">
                <!-- <div class="col-xl-10 col-lg-10 col-md-10 col-sm-10 col-xs-10" style="padding-top: 10px; height: 100%;"> -->
                  <div class="row" style="margin-bottom: 10px; margin-top: 10px;">
                      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div class="row main_container">
                          <div class="row">

                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px;">
                              <div class="row" style="align-items: center;">
                                  <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                    <Label :pass_value="'Company Name'" />
                                  </div>
                                  <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                    <Input v-model:pass_value="json.CompanyName" v-on:change="handleChange" :dbComponentBehavior="dbComponentBehavior.text"/>
                                  </div>
                                </div>
                            </div>

                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px; padding-top: 10px;">
                              <div class="row" style="align-items: center;">
                                  <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                    <Label :pass_value="'Address1'" />
                                  </div>
                                  <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                    <Input v-model:pass_value="json.Address1" v-on:receiveChange="handleChange" :dbComponentBehavior="dbComponentBehavior.text"/>
                                  </div>
                                </div>
                            </div>

                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px; padding-top: 10px;">
                              <div class="row" style="align-items: center;">
                                  <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                    <Label :pass_value="'Address2'" />
                                  </div>
                                  <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                    <Input v-model:pass_value="json.Address2" v-on:change="handleChange" :dbComponentBehavior="dbComponentBehavior.text"/>
                                  </div>
                                </div>
                            </div>

                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px; padding-top: 10px;">
                              <div class="row" style="align-items: center;">
                                  <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                    <Label :pass_value="'Address3'" />
                                  </div>
                                  <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                    <Input v-model:pass_value="json.Address3" v-on:change="handleChange" :dbComponentBehavior="dbComponentBehavior.text"/>
                                  </div>
                                </div>
                            </div>

                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px; padding-top: 10px;">
                              <div class="row" style="align-items: center;">
                                  <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                    <Label :pass_value="'City'" />
                                  </div>
                                  <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                    <Input v-model:pass_value="json.City" v-on:change="handleChange" :dbComponentBehavior="dbComponentBehavior.text"/>
                                  </div>
                                </div>
                            </div>

                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px; padding-top: 10px;">
                              <div class="row" style="align-items: center;">
                                  <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                    <Label :pass_value="'Postal Code'" />
                                  </div>
                                  <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                    <Input v-model:pass_value="json.postalcode" v-on:change="handleChange" :dbComponentBehavior="dbComponentBehavior.text"/>
                                  </div>
                                </div>
                            </div>

                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px; padding-top: 10px;">
                              <div class="row" style="align-items: center;">
                                  <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                    <Label :pass_value="'State'" />
                                  </div>
                                  <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                    <Input v-model:pass_value="json.state" v-on:change="handleChange" :dbComponentBehavior="dbComponentBehavior.text"/>
                                  </div>
                                </div>
                            </div>

                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px; padding-top: 10px;">
                              <div class="row" style="align-items: center;">
                                  <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                    <Label :pass_value="'Country'" />
                                  </div>
                                  <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                    <Input v-model:pass_value="json.country" v-on:change="handleChange" :dbComponentBehavior="dbComponentBehavior.text"/>
                                  </div>
                                </div>
                            </div>

                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px; padding-top: 10px;">
                              <div class="row" style="align-items: center;">
                                  <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                    <Label :pass_value="'Tel'" />
                                  </div>
                                  <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                    <Input v-model:pass_value="json.Tel" v-on:change="handleChange" :dbComponentBehavior="dbComponentBehavior.text"/>
                                  </div>
                                </div>
                            </div>

                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px; padding-top: 10px;">
                              <div class="row" style="align-items: center;">
                                  <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                    <Label :pass_value="'Fax'" />
                                  </div>
                                  <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                    <Input v-model:pass_value="json.Fax" v-on:change="handleChange" :dbComponentBehavior="dbComponentBehavior.text"/>
                                  </div>
                                </div>
                            </div>

                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px; padding-top: 10px;">
                              <div class="row" style="align-items: center;">
                                  <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                    <Label :pass_value="'Reg.No'" />
                                  </div>
                                  <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                    <Input v-model:pass_value="json.comp_reg_no" v-on:change="handleChange" :dbComponentBehavior="dbComponentBehavior.text"/>
                                  </div>
                                </div>
                            </div>

                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px; padding-top: 10px;">
                              <div class="row" style="align-items: center;">
                                  <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                    <Label :pass_value="'Branch Location Group'" />
                                  </div>
                                  <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                    <SelectFilter
                                      :readonly="false"
                                      :no_label="true"
                                      v-model:pass_value="json.locgroup_branch"
                                      :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.select"
                                      :options="locgroup_branch_options"
                                      v-on:receiveChange="handleChangeBranchLocationGroup"
                                      :result_message ="'No results'"
                                      />
                                  </div>
                                </div>
                            </div>

                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px; padding-top: 10px;">
                              <div class="row" style="align-items: center;">
                                  <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                    <Label :pass_value="'DC Location Group'" />
                                  </div>
                                  <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                    <SelectFilter
                                      :readonly="false"
                                      :no_label="true"
                                      v-model:pass_value="json.locgroup_dc"
                                      :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.select"
                                      :options="locgroup_dc_options"
                                      v-on:receiveChange="handleChangeDCLocationGroup"
                                      :result_message ="'No results'"
                                      />
                                  </div>
                                </div>
                            </div>

                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px; padding-top: 10px;">
                              <div class="row" style="align-items: center;">
                                  <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                    <Label :pass_value="'Custom Report Code'" />
                                  </div>
                                  <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                    <Input v-model:pass_value="json.comp_code" v-on:change="handleChange" :dbComponentBehavior="dbComponentBehavior.text"/>
                                  </div>
                                </div>
                            </div>

                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px; padding-top: 10px;">
                              <div class="row" style="align-items: center;">
                                  <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                    <Label :pass_value="'GST Effective Date'" />
                                  </div>
                                  <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                    <!-- <Input v-model:pass_value="json.gst_start_date" v-on:change="handleChange" :dbComponentBehavior="dbComponentBehavior.text"/> -->
                                    <Datepicker
                                      :clickableInput="true"
                                      :no_label="false"
                                      :disable="false"
                                      :autoclose="true"
                                      v-on:receiveChange="handleChangeGSTEffectiveDate"
                                      :daterange="json.gst_start_date"
                                      :componentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text" />
                                  </div>
                                </div>
                            </div>

                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px; padding-top: 10px;">
                              <div class="row" style="align-items: center;">
                                  <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                    <Label :pass_value="'Tax Inclusive'" />
                                  </div>
                                  <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                    <Checkbox
                                      :btm_padding="true"
                                      size="xs"
                                      :disable="false"
                                      v-model="json.tax_inclusive"
                                      :true-value="1"
                                      :false-value="0"
                                      v-on:receiveChangenewVal="handleChangetaxInclusive"/>
                                  </div>
                                </div>
                            </div>

                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px; padding-top: 10px;">
                              <div class="row" style="align-items: center;">
                                  <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                    <Label :pass_value="'GST Submission Cycle Month'" /><span class="text-red text-bold">*</span>
                                  </div>
                                  <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                    <SelectFilter
                                      :readonly="false"
                                      :no_label="true"
                                      v-model:pass_value="json.gst_submission_cycle"
                                      :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.select"
                                      :options="gst_submission_cycle_options"
                                      v-on:receiveChange="handleChangeGSTSubmissionCycle"
                                      :result_message ="'No results'"
                                      />
                                  </div>
                                </div>
                            </div>

                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px; padding-top: 10px;">
                              <div class="row" style="align-items: center;">
                                  <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                    <Label :pass_value="'GST No'" />
                                  </div>
                                  <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                    <Input v-model:pass_value="json.gst_no" v-on:change="handleChange" :dbComponentBehavior="dbComponentBehavior.text"/>
                                  </div>
                                </div>
                            </div>

                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px; padding-top: 10px;">
                              <div class="row" style="align-items: center;">
                                  <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                    <Label :pass_value="'SST Effective Date'" />
                                  </div>
                                  <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                    <!-- <Input v-model:pass_value="json.sst_start_date" v-on:change="handleChange" :dbComponentBehavior="dbComponentBehavior.text"/> -->
                                    <Datepicker
                                      :clickableInput="true"
                                      :no_label="false"
                                      :disable="false"
                                      :autoclose="true"
                                      v-on:receiveChange="handleChangeSSTEffectiveDate"
                                      :daterange="json.sst_start_date"
                                      :componentBehavior="dbComponentBehavior ? dbComponentBehavior.text_required : oridbComponentBehavior.text" />
                                  </div>
                                </div>
                            </div>

                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px; padding-top: 10px;">
                              <div class="row" style="align-items: center;">
                                  <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                    <Label :pass_value="'SST No'" />
                                  </div>
                                  <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                    <Input v-model:pass_value="json.sst_no" v-on:change="handleChange" :dbComponentBehavior="dbComponentBehavior.text"/>
                                  </div>
                                </div>
                            </div>
                          </div>
                        </div>

                        <div class="q-pt-md"><q-separator/></div>


                        <!-- <div class="row top_row"> -->

                        <!-- <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-xs-12"> -->
                            <!-- <MultipleSelect
                            v-model:pass_value="filter_value"
                            v-on:receiveChange="handleChangeFilterShowColumn"
                            :dbComponentBehavior="dbComponentBehavior.text"
                            label=""
                            :options="filter_options"
                            /> -->
                        <!-- </div> -->

                        <!-- <div class="col-xl-10 col-lg-10 col-md-10 col-sm-12 col-xs-12 text_right"> -->
                            <!-- <Button v-on:receiveClick="handleAction"
                            :pass_label="'Create'"
                            :pass_no_caps="true"
                            :pass_square="true"
                            :pass_dense="true"
                            class="custom_button"
                            /> -->

                            <!-- <Button v-on:receiveClick="handleClickFilter"
                            :pass_label="'Filter'"
                            :pass_no_caps="true"
                            :pass_square="true"
                            :pass_dense="true"
                            :class="[filter_mode_on ? 'active_section_button' : 'inactive_section_button']"
                            /> -->
                        <!-- </div> -->
                        <!-- </div> -->

                        <div class="row">
                          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div class="row">
                              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px;">
                                <Label :pass_value="'HQ'" class="text-h6"/>
                              </div>


                              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 text-right" style="padding-right: 0px; padding-top: 10px;">

                                <Button v-on:receiveClick="handleAction"
                                :pass_label="'Create'"
                                :pass_no_caps="true"
                                :pass_square="true"
                                :pass_dense="true"
                                class="custom_button"
                                />
                                <!-- <Button v-on:receiveClick="handleAction"
                                  :pass_label="'Create'"
                                  :pass_no_caps="true"
                                  :pass_square="true"
                                  :pass_dense="true"
                                  class="custom_button"
                                /> -->

                                <!-- <Button v-on:receiveClick="handleClickFilter"
                                  :pass_label="'Filter'"
                                  :pass_no_caps="true"
                                  :pass_square="true"
                                  :pass_dense="true"
                                  :class="[filter_mode_on ? 'active_section_button' : 'inactive_section_button']"
                                /> -->
                                </div>
                          </div>
                         </div>
                        </div>

                        <div class="row">
                          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px;">
                            <div class="row">
                              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px;">
                                <div class="row" style="align-items: center;">
                                  <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                    <Label :pass_value="'Set as HQ'" />
                                  </div>
                                  <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                    <Checkbox
                                      :btm_padding="true"
                                      size="xs"
                                      :disable="false"
                                      v-model="json.asHQ"
                                      :true-value="1"
                                      :false-value="0"
                                      v-on:receiveChangenewVal="handleChangeasHQ"/>
                                  </div>
                                </div>
                                </div>
                          </div>
                         </div>
                        </div>

                        <!-- <div class="row">
                          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px;">
                            <div class="row">
                              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-right: 10px;">
                                <div class="row" style="align-items: center;">
                                  <PurchaseTable
                                    class="BasicTable"
                                    hide_footer
                                    :group_button="false"
                                    :select_all="false"
                                    :readonly_button="false"
                                    :row_per_page="[0]"
                                    :top_button="false"
                                    :top_button_dropdown="false"
                                    v-on:main_supplier_item_list="supplierItemlist()"
                                    v-on:add_button="addButtonBarcode"
                                    v-on:receiveChangeSelectAll="handleChangeSelectAll"
                                    v-on:receiveChangeCheckbox="handleChangeCheckbox"
                                    v-on:receiveChangeGroup="handleChangeGroup"
                                    v-on:receiveChangeUngroup="handleChangeUngroup"
                                    v-on:main_action="handleAction1"
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
                          </div>
                         </div>
                        </div> -->

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
                          v-on:receiveHandleAdd="handleReceiveHandleAdd"
                          v-on:receiveHandleEdit="handleReceiveHandleEdit"
                          v-on:receiveHandleDelete="handleReceiveHandleDelete"

                          :filter_mode_on="filter_mode_on"
                          v-on:receiveColumnRearrange="handleColumnRearrange"
                          v-on:filter_column="handleFilterColumn"
                          :forceLoading="forceLoading"
                          :column_reordering="true"
                          :row_reordering="false"
                          v-on:receiveHandleClearFilter="handleClearFilter"

                          :pass_visible_columns="visibleColumns"
                          :handleActionColumn="'HQLoc'"

                          />


                        <div class="row">
                          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div class="row">
                              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 10px;">
                              </div>
                              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 text-right" style="padding-right: 0px; padding-top: 10px;">

                                  <!-- <Button v-on:receiveClick="handleAddBarcode"
                                  :pass_label="'Cancel'"
                                  :pass_no_caps="true"
                                  :pass_square="true"
                                  :pass_dense="true"
                                  style="background-color: white; color: black"
                                /> -->

                                <Button v-on:receiveClick="handleUpdateCompanyProfile"
                                  :pass_label="'Save'"
                                  :pass_no_caps="true"
                                  :pass_square="true"
                                  :pass_dense="true"
                                  :class="[filter_mode_on ? 'active_section_button' : 'inactive_section_button']"
                                />
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

    <q-inner-loading
      :showing="showAddLoading"
      color="primary"
    />
  </div>

  <q-dialog v-model="show_hq_dialog" persistent :position="$q.screen.width > 599 ? 'top' : 'bottom'">
      <q-card v-if="$q.screen.width < 600" style="width: 700px; max-width: 98vw; margin-top: 5%;">
        <q-card-section class="row header_top_mobile" :style="{ textAlign: (!status && edit_hq) ? 'center' : 'left' }">
          <div v-if="!status && edit_hq" class="custom_delete" @click="handleDelete(jsonHQ)">
          <Button_icon :disabled="readonly_delete" :icon="'fas fa-trash-alt'" :flat="true" :color="''" :font-color="'black'" :outline="false" size="12px" v-on:click="handleDelete(jsonBarcode)" class="q-mr-sm text-red" />
        </div>

        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div v-if="!edit_hq" class="text-subtitle1 mobile_dialog_bottom" style="padding:16px 24px;margin-top: 0px;box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);">Add HQ Location<br></div>
          <div v-else class="text-subtitle1 mobile_dialog_bottom" style="padding:16px 24px;margin-top: 0px;box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);">Edit HQ Location<br></div>

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
                                <SelectFilter
                                  :readonly="false"
                                  :no_label="true"
                                  v-model:pass_value="json.Code"
                                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.select"
                                  :options="hqloc_options"
                                  v-on:receiveChange="handleChangeHQLocation"
                                  :result_message ="'No results'"
                                  />
                              </div>
                            </div>
                            </div>
                          </div>
                        </div>
                    </div>

                    <!-- edit barcode dialog -->
                    <div  v-if="edit_hq" class="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
                      <div class="row">
                        <div class="" :class="edit_child ? 'col-xs-12' : 'col-xs-10'">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <SelectFilter
                              :readonly="false"
                              :no_label="true"
                              v-model:pass_value="json.Code"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.select"
                              :options="hqloc_options"
                              v-on:receiveChange="handleChangeHQLocation"
                              :result_message ="'No results'"
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
          </q-form>
        </q-card-section>

        <q-card-actions  class="dialog_action" style="padding-right:24px; padding-left: 24px;">
        <div class="row full-width">
          <div class="full-width">
            <Button_icon class="full-width custom_primary_button" style="height: 30px;" :small_round="true" :text="'ADD'" :flat="false" :font_color="'white'" :color="'#1E90FF'" :outline="false" size="16px" @click="genarateAddButton"/>
          </div>
        </div>
      </q-card-actions>

      </q-card>

      <q-card v-else style="width: 95vw; max-width: 950px; max-height: 90vh; margin-top: 5%;">

      <q-card-section class="row items-center dialog_header_custom">
          <div v-if="edit_hq" class="text-h6">Edit HQ Location<br></div>
          <div v-else class="text-h6">Add HQ Location<br></div>
          <q-space />
          <q-btn icon="close" flat round dense :disable="loading_dialog" v-close-popup />
      </q-card-section>

      <q-card-section class="upload_container">
        <q-form ref="save_form">
          <div class="row upload_separator_first">
            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <div class="row input_wrapper_left_right" style="gap:16px;">

                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 " :class="!edit_child ? '': ''">
                      <div class="row">
                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12 q-pt-xs">
                          <Label :pass_value="'HQ Location'" />
                        </div>
                        <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-xs-12">
                          <SelectFilter
                            :readonly="false"
                            :no_label="true"
                            v-model:pass_value="json.Code"
                            :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.select"
                            :options="hqloc_options"
                            v-on:receiveChange="handleChangeHQLocation"
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
          <Button_icon  :readonly="false" :flat="true" :font_color="'white'" :color="'#1E90FF'" :text="$language('D0024')" :outline="false" size="16px"
          v-on:receiveClick="genarateAddButton" class="custom_primary_button"/>
        </div>
      </q-card-actions> -->
      <q-card-actions class="dialog_action" align="right">
            <q-btn flat label="Cancel" color="primary" v-close-popup/>
            <q-btn flat label="Confirm" color="primary" @click="genarateAddButton" />
        </q-card-actions>


        <q-inner-loading
          :showing="loading_dialog"
          color="primary"
        />

        <!-- <q-inner-loading
        :showing="showAddLoading"
        color="primary"
      /> -->

    </q-card>

    </q-dialog>

    <q-dialog v-model="delete_hq_dialog" persistent position="top">
    <q-card style="width: 864px; max-width: 98vw;text-align:center;margin-top: 5%;border-radius: 8px">

      <q-card-section class="theme_color row items-center" style="height:56px; padding: 8px 24px;border-bottom: 1px solid #a7bbcb;">
        <div class="confirm_title">{{ $language('D0115') }}<!--Confirmation--></div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup :disable="showAddLoading || showAddLoading2"/>
      </q-card-section>

      <q-card-section style="padding: 32px 24px">
        <span class="confirmation_line_font">Are you sure to delete this?</span>
      </q-card-section>

      <q-card-actions align="right" style="padding-top:0px;padding-bottom:16px;padding-right:16px">
        <q-btn flat :label="$language('D0116')" font_color="#29292A" color="#29292A" v-close-popup size="12px" class="dialog_confirm_cancel_button"/> <!-- CANCEL -->
        <q-btn flat :label="$language('D0156')" size="12px" font_color="'white'" color="'#D81111'" class="confirm_delete_button" @click="handleDeleteHQLoc" /> <!-- OK -->
      </q-card-actions>

      <q-inner-loading
        :showing="deleteLoading"
        color="primary"
      />
    </q-card>
  </q-dialog>

</template>

<script>
import Label from 'src/components/ERP/Main/Label';
import Input from 'src/components/ERP/Main/Input';
import Checkbox from 'src/components/ERP/Base/Checkbox'
import SelectFilter from 'src/components/ERP/Base/SelectFilter'
// import Datepicker from 'src/components/ERP/Base/Datepicker'
import Datepicker from 'src/components/ERP/Main/Datepicker'

import Table from 'src/components/ERP/Table/Table.vue';
import Button_icon from 'src/components/ERP/Base/Button_icon'
import Button from 'src/components/ERP/Main/Button';
import PurchaseTable from 'src/components/ERP/Purchase/PurchaseTable'
import MultipleSelect from 'src/components/ERP/Main/MultipleSelect';

import { Notify } from "quasar";

export default {
  data() {
    return{
      json:{
        Address1: '',
        comp_code: '',
        gst_start_date: '',
        gst_end_date: '',
        Address2: '',
        system_start_date: '',
        comp_reg_no: '',
        Address3: '',
        gst_no: '',
        sales_start_date: '',
        sst_no:'',
        Tel:'',
        City: '',
        tax_inclusive: 0,
        sst_end_date: '',
        Fax: '',
        postalcode: '',
        gst_submission_cycle: [],
        SSTRegNo: '',
        CompanyName: '',
        asHQ: 0,
        state: '',
        item_runningno_type: '',
        sst_start_date: '',
        locgroup_branch: '',

        country: '',
        item_runningno_digit: '',
        item_runningno_itemlinkrunno: '',
        locgroup_dc: '',
        sst_start_date: '',
        regno: '',
        customreportcode:'',
        gst_start_date:'',
        // hqloc:[],
        Code:''
      },

      gst_submission_cycle_options:[],
      locgroup_branch_options:[],
      locgroup_dc_options:[],
      hqloc_options:[],

      filter_options: [],
      filter_value: [],
      visibleColumns: [],

      table_column: [],
      table_data: [],
      filter_mode_on: false,
      rearrange_column: [],
      forceLoading: false,
      deleteLoading: false,
      loading_dialog: false,

      get_HQLoc: '',

      show_hq_dialog: false,
      delete_hq_dialog: false,
      edit_hq:false,

      showAddLoading: false,
      loading_dialog: false,

      language: sessionStorage.getItem("language") != "" && sessionStorage.getItem("language") != "null" && sessionStorage.getItem("language") != null ? sessionStorage.getItem("language") : [],
      session_outlet_guid: sessionStorage.getItem("session_outlet_guid") != "" && sessionStorage.getItem("session_outlet_guid") != "null" && sessionStorage.getItem("session_outlet_guid") != null ? sessionStorage.getItem("session_outlet_guid") : [],
    }
  },
  components: {
    Label,
    Input,
    Checkbox,
    SelectFilter,
    Datepicker,
    Table,
    Button,
    Button_icon,
    PurchaseTable,
    MultipleSelect
  },
  computed: {
    dbComponentBehavior() {
     return this.$store.getters['dbComponentBehavior/byLanguage']('erp')
    },
  },
  async mounted(){
    this.showAddLoading = true;

    this.gst_submission_cycle_options = [
      {
        "label": 1,
        "value": 1
      },
      // {
      //   "label": 2,
      //   "value": 2
      // },
      {
        "label": 3,
        "value": 3
      }
    ]

    await this.get_branch_location_group_options()
    await this.get_hq_location_options()

    await this.trigger_company_profile()

    this.filter_options = [
          {
              label: 'action',
              value: 'action',
          },
          {
              label: 'HQ Location',
              value: 'HQLoc',
          }
    ];

    var visibleColumns = [];

    for (const index in this.filter_options) {
        visibleColumns.push(this.filter_options[index].value);
    }

    this.visibleColumns = visibleColumns;

    setTimeout(()=>{
    this.showAddLoading = false;
   },1000)

  },
  methods:{
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
    },

    async get_branch_location_group_options(){
      var payload = {
        "pass_json": {
          "outlet_guid": this.session_outlet_guid,
          "language": this.language
        },
      };


      var object_pass = {
        "dispatch": 'setup2_companyprofile/trigger_get_cp_set_branch',
        "getter": 'setup2_companyprofile/get_cp_set_branch',
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
          this.locgroup_branch_options.push(obj)
          this.locgroup_dc_options.push(obj)
        }
        // this.locgroup_branch_options = arr
      }
    },
    async get_hq_location_options(){
      var payload = {
        "pass_json": {
          "LocGroup": "",
          "outlet_guid": this.session_outlet_guid,
          "language": this.language
        },
      };

      var object_pass = {
        "dispatch": 'setup2_companyprofile/trigger_get_location_read_location_list',
        "getter": 'setup2_companyprofile/get_location_read_location_list',
        "app": this,
        "payload": payload,
      };

      var dispatch_response_location_read_location_list = await this.$dispatch(object_pass);

      if(dispatch_response_location_read_location_list.status){
        var get_location_read_location_list = dispatch_response_location_read_location_list.response
        var arr = []
        for (var i in get_location_read_location_list){
          var obj = {
            "label": get_location_read_location_list[i].Code + ' - ' + get_location_read_location_list[i].Description,
            "value": get_location_read_location_list[i].Code
          }
          this.hqloc_options.push(obj)
        }
        // this.hqloc_options = arr
      }
    },
    async trigger_company_profile(){
      var payload = {
        "pass_json": {
          "outlet_guid": this.session_outlet_guid,
          "language": this.language
        },
      };


      var object_pass = {
        "dispatch": 'setup2_companyprofile/trigger_get_company_profile_read_company_profile',
        "getter": 'setup2_companyprofile/get_company_profile_read_company_profile',
        "app": this,
        "payload": payload,
      };

      var dispatch_response_company_profile_read_company_profile = await this.$dispatch(object_pass);

      if(dispatch_response_company_profile_read_company_profile.status){
        this.json.Address1 = dispatch_response_company_profile_read_company_profile.response[0].Address1,
        this.json.comp_code = dispatch_response_company_profile_read_company_profile.response[0].comp_code,
        this.json.gst_start_date = dispatch_response_company_profile_read_company_profile.response[0].gst_start_date,
        this.json.gst_end_date = dispatch_response_company_profile_read_company_profile.response[0].gst_end_date,
        this.json.Address2 = dispatch_response_company_profile_read_company_profile.response[0].Address2,
        this.json.system_start_date = dispatch_response_company_profile_read_company_profile.response[0].system_start_date,
        this.json.comp_reg_no = dispatch_response_company_profile_read_company_profile.response[0].comp_reg_no,
        this.json.Address3 = dispatch_response_company_profile_read_company_profile.response[0].Address3,
        this.json.gst_no = dispatch_response_company_profile_read_company_profile.response[0].gst_no,
        this.json.sales_start_date = dispatch_response_company_profile_read_company_profile.response[0].sales_start_date,
        this.json.sst_no = dispatch_response_company_profile_read_company_profile.response[0].sst_no,
        this.json.Tel = dispatch_response_company_profile_read_company_profile.response[0].Tel,
        this.json.City = dispatch_response_company_profile_read_company_profile.response[0].City,
        this.json.tax_inclusive = dispatch_response_company_profile_read_company_profile.response[0].tax_inclusive,
        this.json.sst_end_date = dispatch_response_company_profile_read_company_profile.response[0].sst_end_date,
        this.json.Fax = dispatch_response_company_profile_read_company_profile.response[0].Fax,
        this.json.postalcode = dispatch_response_company_profile_read_company_profile.response[0].postalcode,
        this.json.gst_submission_cycle = dispatch_response_company_profile_read_company_profile.response[0].gst_submission_cycle,
        this.json.SSTRegNo = dispatch_response_company_profile_read_company_profile.response[0].SSTRegNo,
        this.json.CompanyName = dispatch_response_company_profile_read_company_profile.response[0].CompanyName,
        this.json.asHQ = dispatch_response_company_profile_read_company_profile.response[0].asHQ,
        this.json.state = dispatch_response_company_profile_read_company_profile.response[0].state,
        this.json.item_runningno_type = dispatch_response_company_profile_read_company_profile.response[0].item_runningno_type,
        this.json.sst_start_date = dispatch_response_company_profile_read_company_profile.response[0].sst_start_date,
        this.json.locgroup_branch = dispatch_response_company_profile_read_company_profile.response[0].locgroup_branch,
        this.json.country = dispatch_response_company_profile_read_company_profile.response[0].country,
        this.json.item_runningno_digit = dispatch_response_company_profile_read_company_profile.response[0].item_runningno_digit,
        this.json.item_runningno_itemlinkrunno = dispatch_response_company_profile_read_company_profile.response[0].item_runningno_itemlinkrunno,
        this.json.locgroup_dc = dispatch_response_company_profile_read_company_profile.response[0].locgroup_dc,
        this.json.sst_start_date = dispatch_response_company_profile_read_company_profile.response[0].sst_start_date
      }

    },

    handleChangeFilterShowColumn(value)
      {
          this.$nextTick(()=>{

              var visibleColumns = [];

              for (const index in this.filter_value) {
                  visibleColumns.push(this.filter_value[index]);
              }
              this.visibleColumns = visibleColumns;
          });

    },
    handleShowCreateItemMaster(){
      this.show_hq_dialog = true
      this.edit_hq = false

      this.Description = ''
      this.inactive = 0

      //this.$router.push({ name: "CreateItemmaster" });
    },
    async clearFilterInput()
    {
        for (const index in this.table_column) {

            var is_array = Array.isArray(this.table_column[index].filter_value);
            if(is_array)
            {
                this.table_column[index].filter_value = [];
            }
            else
            {
                this.table_column[index].filter_value = '';
            }

        }

        return;

    },
    async handleClearFilter()
    {
        await this.clearFilterInput();
        this.rearrange_column = this.table_column;

        this.table_function(this.ori_params);
    },
    handleReceiveHandleAdd(pass_payload)
    {
        // console.log('handleReceiveHandleAdd');
        // console.log(pass_payload);
    },
    handleReceiveHandleEdit(pass_payload)
    {
      this.loading_dialog = true;

      // if(!this.edit_hq){
      //   this.show_hq_dialog = true;
      //   this.edit_child = true;
      //   this.edit_hq = false
      //   this.showAddLoading = true;

      //   this.showAddLoading = false;

      //   this.json.Code = ''
      // }else{
        this.get_HQLoc = pass_payload.row.HQLoc
      // if(this.edit_hq){
        this.show_hq_dialog = true;
        this.edit_hq = true
        this.edit_child = true;

        var test = this.hqloc_options.filter((entry)=>{
          return entry.value == pass_payload.row.HQLoc
        })
        this.json.Code = test[0].label

        setTimeout(()=>{
          this.loading_dialog = false;
        },2000)

      // }

        // this.$router.push({
        //     // name: 'CreateEditIM_new',
        //     name: "EditItemmaster",
        //     query: { Itemcode: pass_payload.row.Itemcode}
        // });
    },
    handleReceiveHandleDelete(pass_payload)
    {
        this.get_HQLoc = pass_payload.row.HQLoc
        // this.delete_hq_dialog = true
    },
    async handleDeleteHQLoc(){
      this.deleteLoading = true

      var payload = {
        "pass_json":{
          "outlet_guid": this.session_outlet_guid,
          "language": this.language,
          "HQLoc": this.get_HQLoc,
        }
      }

      var object_pass = {
        "dispatch": 'setup2_companyprofile/trigger_delete_location_get_location_hq',
        "getter": 'setup2_companyprofile/get_location_get_location_hq',
        "app": this,
        "payload": payload,
      };

      var dispatch_response_delete_location_get_location_hq = await this.$dispatch(object_pass);

      var status = dispatch_response_delete_location_get_location_hq.status

      if(status){
        this.showNotify('positive', 'Deleted Successfully')
        this.delete_hq_dialog = false
        this.deleteLoading = false
        this.table_function(this.ori_params)
      }else{
        var get_error_message = JSON.parse(dispatch_response_delete_location_get_location_hq.response)
        if(get_error_message){
          this.showNotify('negative', get_error_message.detail);
          this.deleteLoading = false
        }else{
          this.showNotify('negative', 'Deleted Failed')
          this.deleteLoading = false
        }
      }

    },
    async handleClickFilter()
    {
        this.filter_mode_on = !this.filter_mode_on;

        if(!this.filter_mode_on)
        {

            await this.clearFilterInput();

            this.rearrange_column = this.table_column;

        }

        this.table_function(this.ori_params);

    },
    handleColumnRearrange(pass_payload)
    {
        this.rearrange_column = pass_payload;
    },
    handleFilterColumn(pass_payload)
    {
        this.rearrange_column = this.table_column;
        this.table_function(this.ori_params);
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
    async table_function(ori_payload){

    console.log('');

      var payload = ori_payload.params

      payload.skip = payload.offset;

      if(payload.ordering == "")
      {
        payload.ordering = "-HQLoc"
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
        "pass_json":{
          "outlet_guid": this.session_outlet_guid,
          "language": this.language,
          "limit": this.ori_params.params.limit,
          "skip": this.ori_params.params.skip,
          "sort_by": payload.sort_by == "" ? "HQLoc"  : payload.sort_by,
          "sort_type": payload.sort_type == "" ? "Desc" : payload.sort_type
        }
      }

      var object_pass = {
        "dispatch": 'setup2_companyprofile/trigger_get_location_get_location_hq',
        "getter": 'setup2_companyprofile/get_location_get_location_hq',
        "app": this,
        "payload": payload,
      };

      var dispatch_response_get_location_get_location_hq = await this.$dispatch(object_pass);
      var status = dispatch_response_get_location_get_location_hq.status

      if(status){
        var table_column = [
            // {
            //     name: 'action',
            //     required: true,
            //     label: 'Actions',
            //     align: 'center',
            //     sortable: false,
            //     field: 'action',
            //     format_child: '',
            //     tooltip: '',
            //     headerStyle: 'text-align: center; width: 1%',
            // },
            {
                name: 'HQLoc',
                required: true,
                label: 'HQ Location',
                align: 'center',
                sortable: true,
                field: 'HQLoc',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;',
            },
        ];

        this.table_column = table_column

        var results = dispatch_response_get_location_get_location_hq.response.detail;
        this.table_data = {
          "data": {
            "count": dispatch_response_get_location_get_location_hq.response.total_row,
            "next": null,
            "previous": null,
            "results": dispatch_response_get_location_get_location_hq.response.detail
          }
        };

        this.results = dispatch_response_get_location_get_location_hq.response.detail;

      }else{
        this.table_data = {
          "data": {
            "count": 0,
            "next": null,
            "previous": null,
            "results": []
          }
        };
      }
    },
    handleChangetaxInclusive(newVal){
      this.$nextTick(()=>{
        this.json.tax_inclusive = newVal;
      });
    },
    handleChangeasHQ(newVal){
      this.$nextTick(()=>{
        this.json.asHQ = newVal;
      });
    },
    handleChangeSSTEffectiveDate(payload){
      this.json.sst_start_date = payload
    },
    handleChangeGSTEffectiveDate(payload){
      this.json.gst_start_date = payload
    },
    // handleDelete(payload){
    //     this.active_delete_json = payload;

    //     console.log('json',payload);
    //     this.delete_child = true;
    // },
    async handleAction(payload){
        // }

        this.loading_dialog = true;
        this.show_hq_dialog = true;
        this.edit_child = true;
        this.edit_hq = false

        setTimeout(()=>{
          this.loading_dialog = false;
        },2000)

        this.json.Code = ''

    },
    handleAction1(payload){
      this.get_HQLoc = payload.HQLoc
      // if(this.edit_hq){
        this.show_hq_dialog = true;
        this.edit_hq = true
        this.edit_child = true;

        var test = this.hqloc_options.filter((entry)=>{
          return entry.value == payload.HQLoc
        })
        this.json.Code = test[0].label

      // }

    },
    handleDelete(payload){
      console.log('payload', payload);
    //   this.get_HQLoc = payload.HQLoc
    //   this.delete_hq_dialog = true
    // },
    // async generate_delete(){
    //   this.loading = true

    //   var payload = {
    //     "pass_json":{
    //       "outlet_guid": this.session_outlet_guid,
    //       "language": this.language,
    //       "HQLoc": this.json.Code,
    //     }
    //   }

    //   var object_pass = {
    //       "dispatch": 'setup2_companyprofile/trigger_delete_location_get_location_hq',
    //       "getter": 'setup2_companyprofile/get_location_get_location_hq',
    //       "app": this,
    //       "payload": payload
    //   };

    //   var dispatch_response_delete_location_get_location_hq = await this.$dispatch(object_pass);

    //   if(dispatch_response_delete_location_get_location_hq.status){
    //     this.showNotify('positive', 'Deleted Successfully')
    //     await this.table_function()
    //     this.delete_hq_dialog = false
    //   }else{
    //     this.showNotify('negative', 'Deleted Failed')
    //   }
    },
    close(){
      this.show_hq_dialog = false;
      // this.jsonBarcode = {};
      // this.show_barcode_dialog = false;
    },
    async genarateAddButton(){
      if(!this.edit_hq){
        var payload = {
          "pass_json":{
            "outlet_guid": this.session_outlet_guid,
            "language": this.language,
            "HQLoc": this.json.Code,
          }
        }

        var object_pass = {
          "dispatch": 'setup2_companyprofile/trigger_create_location_get_location_hq',
          "getter": 'setup2_companyprofile/get_location_get_location_hq',
          "app": this,
          "payload": payload,
        };

        var dispatch_response_create_location_get_location_hq = await this.$dispatch(object_pass);

        var status = dispatch_response_create_location_get_location_hq.status
        if(status){
            if(dispatch_response_create_location_get_location_hq.response.details && dispatch_response_create_location_get_location_hq.response.details.includes('Duplicated HQ Location')){
              this.showNotify('negative', dispatch_response_create_location_get_location_hq.response.details);
            }else{
              this.showNotify('positive', 'Created Successfully')
              this.show_hq_dialog = false;
              this.table_function(this.ori_params)
            }
        }else{
          var get_error_message = JSON.parse(dispatch_response_create_location_get_location_hq.response)
          if(get_error_message){
            this.showNotify('negative', get_error_message.detail);
          }else{
            this.showNotify('nagative', 'Created Failed')
          }
        }
      }else{
        if(typeof(this.json.Code) === "string"){
          var test = this.hqloc_options.filter((entry)=>{
            return entry.label == this.json.Code || entry.value == this.json.Code
          })

          this.json.Code = test[0].value
        }

        var payload = {
          "pass_json":{
            "outlet_guid": this.session_outlet_guid,
            "language": this.language,
            "Code": this.json.Code,
            "HQLoc": this.get_HQLoc,
          }
        }

        var object_pass = {
          "dispatch": 'setup2_companyprofile/trigger_patch_location_get_location_hq',
          "getter": 'setup2_companyprofile/get_location_get_location_hq',
          "app": this,
          "payload": payload,
        };

        var dispatch_response_patch_location_get_location_hq = await this.$dispatch(object_pass);
        var status = dispatch_response_patch_location_get_location_hq.status
        if(status){
            this.showNotify('positive', 'Updated Successfully')
            this.show_hq_dialog = false;
            this.table_function(this.ori_params)
        }else{
          var get_error_message = JSON.parse(dispatch_response_patch_location_get_location_hq.response)
          if(get_error_message){
            this.showNotify('negative', get_error_message.detail);
          }else{
            this.showNotify('nagative', 'Updated Failed')
          }
        }
      }
    },
    async handleUpdateCompanyProfile(){
      var payload = {
        "pass_json": {
          "outlet_guid": this.session_outlet_guid,
          "language": this.language,
          "CompanyName": this.json.CompanyName,
          "Address1": this.json.Address1,
          "Address2": this.json.Address2,
          "Address3": this.json.Address3,
          "City": this.json.City,
          "postalcode": this.json.postalcode,
          "state": this.json.state,
          "country": this.json.country,
          "Tel": this.json.Tel,
          "Fax": this.json.Fax,
          "comp_reg_no": this.json.comp_reg_no,
          "locgroup_branch": this.json.locgroup_branch,
          "locgroup_dc": this.json.locgroup_dc,
          "comp_code": this.json.comp_code,
          "gst_start_date": this.json.gst_start_date,
          "tax_inclusive": this.json.tax_inclusive ? 1 : 0,
          "gst_submission_cycle": this.json.gst_submission_cycle,
          "gst_no": this.json.gst_no,
          "sst_start_date": this.json.sst_start_date,
          "sst_no": this.json.sst_no,
          "asHQ": this.json.asHQ ? 1 : 0,
        }
      }

      var object_pass = {
          "dispatch": 'setup2_companyprofile/trigger_patch_company_profile_update_company_profile',
          "getter": 'setup2_companyprofile/get_company_profile_update_company_profile',
          "app": this,
          "payload": payload,
        };

        var dispatch_response_patch_company_profile_update_company_profile = await this.$dispatch(object_pass);

        var status = dispatch_response_patch_company_profile_update_company_profile.status

        if(status){
          this.showNotify('positive', 'Updated Successfully')
          this.trigger_company_profile()
        }else{
          var get_error_message = JSON.parse(dispatch_response_patch_company_profile_update_company_profile.response)
          if(get_error_message){
            this.showNotify('negative', get_error_message.detail);
          }else{
            this.showNotify('nagative', 'Updated Failed')
          }
        }
    },
  }
}
</script>

<style scoped>
.step-content {
  background: white;
}

.main_container
{
  padding: 10px;
}

.top_row
{
  /* padding-top: 10px; */
  padding-bottom: 10px;
  padding-right: 0px;
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
.custom_primary_button {
  padding: 0px 30px;
  border-radius: 8px;
  box-shadow: 0px 1px 3.6px 0px rgba(0, 0, 0, 0.25);
  font-weight: 700;
  font-family: InterfontBold;
  width: 112px;
  height: 48px;
}

.main_container
{
  padding: 10px;
}

.top_row
{
  /* padding-top: 10px; */
  padding-bottom: 10px;
  padding-right: 0px;
}

.text_right
{
  text-align: right;
}

.custom_button
{
font-size: 14px;
background-color: #273655;
color: white;
margin-left: 5px;
}

.active_section_button
{
font-size: 14px;
background-color: #e37a05;
color: white;
margin-left: 5px;
}

.inactive_section_button
{
font-size: 14px;
background-color: #273655;
color: white;
margin-left: 5px;
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
.custom_cancel_button
{
    border: 1px solid black;
}
</style>
