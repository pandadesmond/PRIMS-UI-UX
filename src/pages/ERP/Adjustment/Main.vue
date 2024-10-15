<template>
  <div v-if="$q.screen.width > 599" class="row card_section card_section_second">
    <Title v-if="page_function == 'Adjustment'" :text="'Adjustment'" :filter_status="filter_status" v-on:receiveFilter="handleReceiveFilter" />
    <Title v-if="page_function == 'SalesInvoice'" :text="'Sales Invoice'" :filter_status="filter_status" v-on:receiveFilter="handleReceiveFilter" />
    <!--<Title v-if="page_function == 'DebitNote'" :text="'Debit Note'" :filter_status="filter_status" v-on:receiveFilter="handleReceiveFilter" /> -->


    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
      <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10">
          <div class="row">
            <!-- <div class="col-xs-12 col-sm-12 col-md-11 col-lg-11 col-xl-11">
              <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                  <div class="input_wrapper input_wrapper_right">
                      <LabelInputHorizontal
                      :readonly="false"
                      :no_label="true"
                      :text="'Search'"
                      v-model:pass_value="search"
                      :dbComponentBehavior="dbComponentBehavior.text"
                      v-on:receiveChange="handleChangeOptions"
                      />
                  </div>
                </div>
              </div>
            </div> -->

            <div class="col-xs-12 col-sm-12 col-md-1 col-lg-1 col-xl-1">
              <div class="input_wrapper input_wrapper_right">
                  <Button_icon
                  v-if="filter_options.length < select_options.length"
                  class="create_group_button"
                  :flat="true"
                  :font_color="'black'"
                  v-on:receiveClick="handleShowNextFilter(select_options.length, filter_options.length)"
                  :icon="'add'"
                  :color="'#DEE1E6'"
                  :outline="true"
                  size="13px"/>
              </div>
            </div>
          </div>
        </div>

        <div class="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2"></div>

        <div class="card_section_two card_section_second_content col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div class="q-pr-xs q-pt-xs q-pb-md row justify-end">
            <div class="row full-width">
              <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 col-xl-4 q-pl-xs">
                <LabelInputHorizontal
                :readonly="false"
                :no_label="true"
                :text="'RefNo'"
                v-model:pass_value="search"
                :dbComponentBehavior="dbComponentBehavior.text"
                v-on:receiveChange="handleChangeOptions"
                />
              </div>

              <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 col-xl-4 q-pl-xs">
                <LabelSelectFilterHorizontal
                style="margin-left: 0px;"
                :readonly="false"
                :no_label="true"
                :text="'Customer'"
                v-model:pass_value="supcus"
                :dbComponentBehavior="dbComponentBehavior.text"
                :options="supcus_options"
                v-on:receiveChange="handleChangeOptions"
                />
              </div>

              <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 col-xl-4" align="right">
                <Button_icon v-if="page_function != 'SalesInvoice'" :flat="false" :font_color="'white'" :color="'#2F3A4D'" :text="page_function == 'Adjustment' ? 'New Adj' : ''" :outline="false" size="15px"
                v-on:receiveClick="handleShowCreateAdjustment"/>

                <Button_icon v-if="page_function == 'SalesInvoice'" :flat="false" :font_color="'white'" :color="'#2F3A4D'" :text="'New SI'" :outline="false" size="15px"
                v-on:receiveClick="handleConvert"/>
              </div>
            </div>

          </div>

            <SalesTable
            :row_per_page="[5,10,20,50,0]"
            :top_button="false"
            v-on:onClickRefno="handleClickRefno"
            v-on:add_button="handleShowCreateAdjustment"
            v-on:main_action="handleAction"
            v-on:main_edit="handleEdit"
            v-on:main_list="handleList"
            v-on:main_delete="handleDelete"
            v-on:main_cancel="handleCancel"
            v-on:handlePrint="handlePrint"
            v-on:handlePrintDropdown="handlePrintDropdown"
            :title="table_title"
            :table_data="table_data"
            :table_column="table_column"
            :action_button="true"
            :edit_button="false"
            :view_button="false"
            :delete_button="false"
            :print_button="false"
            :print_btn_dropdown="false"
            :cancel_button="false"
            :flat_status="true"
            :bordered_status="true"
            v-on:receiveRequestTable="handleTableChange"
            v-on:onPrintSn="handlePrintSnMain"
            />
        </div>
      </div>
    </div>


  </div>

  <div v-else class="row card_section card_section_second">
    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-px-md">
      <div class="row">
        <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
          <Title v-if="page_function == 'Adjustment'" :text="'Adjustment'" :smaller_label="true" :noFilter="true" :filter_status="filter_status" v-on:receiveFilter="handleReceiveFilter" />

        </div>

        <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3" align="right" style="margin-top: 5px;">
          <Button_icon :icon="'filter_alt'" :flat="false" :border_radius="'15px;'" :font_color="'black'" :color="'white'" :outline="false" size="15px"
          v-on:receiveClick="handleShowFilter"/>
        </div>
      </div>
    </div>

    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center q-pb-xs" style="font-size: 11px ; padding:0px">
      <q-icon name="person" class="q-px-none" size="15px"/>&nbsp;:&nbsp;Supplier &nbsp;&nbsp;&nbsp;&nbsp;
      <q-icon name="location_city" class="q-px-none" size="15px"/>&nbsp;:&nbsp;Branch&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <q-icon name="event" class="q-px-none" size="15px"/>&nbsp;:&nbsp;Date
    </div>

    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
      <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" style="padding: 3px;">
          <div class="row">
            <div @click="handleAction(result)" v-for="(result,index) in results" :key="index" class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" style="padding-bottom: 5px;">
              <q-card flat class="card_design" style="width: 100%; overflow-wrap: break-word; border-radius:6px;">
                  <q-card-section style="padding: 5px;">
                    <div class="row">
                      <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9 col-xl-9 q-pl-sm">
                        <div class="row text-subtitle1">
                          {{ result.RefNo }}
                        </div>
                        <div v-if="page_function == 'Adjustment'" class="row q-pt-sm" style="font-size: 11px;">
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <q-icon name="person" class="q-pa-xs" size="15px"/>
                              {{ result.SCode }} - {{ result.SName }}
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <q-icon name="location_city" class="q-px-xs" size="15px"/>
                                {{ result.loc_group }} &nbsp;
                              <q-icon name="event" class="q-px-xs" size="15px"/>  {{ result.PODate }}
                            </div>
                        </div>

                      </div>
                      <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 q-pr-sm text-subtitle2" align="right">
                          <!-- <q-btn-dropdown flat dense icon="more_horiz" style="color: #cccccc;" color="#cccccc;">
                            <q-list>
                              <q-item clickable v-close-popup @click="handleAction(result)">
                                <q-item-section>
                                  <q-item-label>Edit</q-item-label>
                                </q-item-section>
                              </q-item>

                              <q-item clickable v-close-popup @click="handleDelete(result)">
                                <q-item-section>
                                  <q-item-label>Delete</q-item-label>
                                </q-item-section>
                              </q-item>

                            </q-list>
                          </q-btn-dropdown> -->

                        <!-- <div style="padding-top: 35px;">
                          <span v-if="page_function != 'DebitNote'">{{ result.Total }}</span>
                          <span v-else>{{ result.Amount }}</span>
                        </div> -->


                        <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" style="font-weight:  normal; font-size:12px; color:red" >{{ result.DocumentStatus }}</div>
                            <div v-if="page_function != 'DebitNote'" style="padding-top:20%" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">{{ currency_sign }} {{ result.Total }}</div>
                            <div v-else style="padding-top:20%" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">{{ currency_sign }} {{ result.Amount }}</div>
                        </div>
                      </div>
                    </div>
                  </q-card-section>
              </q-card>
            </div>

            <div style="padding-bottom: 40px;" class="col-xs-12" align="right">
              Entries: {{ filter.pagination }} || {{ filter.from }}- {{ filter.to }} of {{ filter.total_row }}
            </div>

            <div class="dialog_action1">
              <div class="row full-height items-center">
                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3" align="center">
                  <Button_icon :icon="'sort'" :border_radius="'17px;'" :flat="true" :font_color="'#928f8f'" :color="'white'" :outline="false" size="13px"
                  v-on:receiveClick="handleShowSidebar" />
                </div>

                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3" align="center" style="border-right: 1px solid rgb(146, 143, 143);">
                  <Button_icon v-if="page_function != 'GoodsReceiving'" :icon="'add'" :border_radius="'17px;'" :flat="false" :font_color="'white'" :color="'primary'" :outline="false" size="13px"
                  v-on:receiveClick="handleShowCreateAdjustment" />

                  <Button_icon v-if="page_function == 'GoodsReceiving'" :icon="'add'" :border_radius="'17px;'" :flat="false" :font_color="'white'" :color="'primary'" :outline="false" size="13px"
                  v-on:receiveClick="handleConvert"/>
                </div>

                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3" align="center">
                  <Button_icon :disable="ori_params.params.offset == 0 || showAddLoading" :icon="'chevron_left'" :border_radius="'17px;'" :flat="true" :font_color="'#928f8f'" :color="'white'" :outline="false" size="13px"
                  v-on:receiveClick="changePagination('back')" />
                </div>

                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3" align="center">
                  <Button_icon :disable="showNext || showAddLoading" :icon="'chevron_right'" :border_radius="'17px;'" :flat="true" :font_color="'#928f8f'" :color="'white'" :outline="false" size="13px"
                  v-on:receiveClick="changePagination('next')" />
                </div>
              </div>
            </div>

            <!-- <div class="row dialog_action1 items-center justify-center footer_left">
              <Button_icon v-if="page_function != 'GoodsReceiving'" :icon="'add'" :border_radius="'17px;'" :flat="false" :font_color="'white'" :color="'primary'" :outline="false" size="17px"
              v-on:receiveClick="handleShowCreateAdjustment" />

              <Button_icon v-if="page_function == 'GoodsReceiving'" :icon="'add'" :border_radius="'17px;'" :flat="false" :font_color="'white'" :color="'primary'" :outline="false" size="17px"
              v-on:receiveClick="handleConvert"/>
            </div> -->
          </div>
        </div>
      </div>
    </div>

    <q-inner-loading
      :showing="showAddLoading"
      color="primary"
    />
  </div>

  <q-dialog v-model="delete_confirmation" persistent position="top">
      <q-card style="width: 700px; max-width: 80vw;text-align:center;margin-top: 5%;">

        <q-card-section class="row items-center" style="padding-top:1%;padding-bottom:1%;border-bottom: 1px solid #a7bbcb;">
          <div class="text-h6">Confirmation</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup :disable="showAddLoading"/>
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

    <q-dialog v-model="filter_transmain" persistent position="top">
      <q-card style="width: 700px; max-width: 98vw; margin-top: 5%;">
        <q-card-section class=" row theme_color header_top_mobile dialog_header" style="padding: 0px;">
            <div class="text-subtitle1 header_text" style="margin-top: 5px;">Sort<br></div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup :disable="showAddLoading || showAddLoading2"/>
        </q-card-section>

        <q-card-section class="upload_container content_body_dialog">
          <q-form ref="save_edit_pochild_form">
            <div class="row">
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <div class="row input_wrapper_right">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div class="row dialog_separator">
                      <div class="offset-xs-1 col-xs-10 col-sm-10 col-md-6 col-lg-6 col-xl-6">
                        <div class="row">
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
                            <div class="row">
                              <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                                <span class="dialog_font">RefNo</span>
                              </div>
                              <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                                <Input
                                :autofocusclick="true"
                                :no_label="true"
                                :readonly="false"
                                v-on:change="handleChange"
                                v-model="search"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="offset-xs-1 col-xs-10 col-sm-10 col-md-6 col-lg-6 col-xl-6">
                        <div class="row">
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
                            <div class="row">
                              <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                                <span class="dialog_font">Customer</span>
                              </div>
                              <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                                <SelectFilter
                                :readonly="false"
                                :no_label="true"
                                v-model:pass_value="supcus"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.select"
                                :options="supcus_options"
                                v-on:receiveChange="handleChange"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="offset-xs-1 col-xs-10 col-sm-10 col-md-6 col-lg-6 col-xl-6">
                        <div class="row">
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
                            <div class="row">
                              <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                                <span class="dialog_font">Entries</span>
                              </div>
                              <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                                <Select
                                :readonly="false"
                                :no_label="true"
                                v-model="filter.pagination"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.sort_by : oridbComponentBehavior.select"
                                :options="filter.pagination_options"
                                v-on:receiveChange="handleChange"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="offset-xs-1 col-xs-10 col-sm-10 col-md-6 col-lg-6 col-xl-6">
                        <div class="row">
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
                            <div class="row">
                              <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                                <span class="dialog_font">Sort By</span>
                              </div>
                              <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                                <Select
                                :readonly="false"
                                :no_label="true"
                                v-model="filter.sort_by"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.sort_by : oridbComponentBehavior.select"
                                :options="sort_by_options"
                                v-on:receiveChange="handleChange"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="offset-xs-1 col-xs-10 col-sm-10 col-md-6 col-lg-6 col-xl-6">
                        <div class="row">
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
                            <div class="row">
                              <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                                <span class="dialog_font">Sort Type</span>
                              </div>
                              <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                                <Radio size="xs" :disable="false" v-on:receiveChange="handleChange" v-model="filter.sort_type" :options="sort_type_options"  />
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
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" dir="rtl">
              <Button_icon :readonly="false" :flat="true" :font_color="'white'" :color="'#094161'" :text="'FILTER'" :outline="false" size="15px"
              v-on:receiveClick="handleFilter()"/>
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
import Input from 'src/components/ERP/Base/Input'
import SelectFilter from 'src/components/ERP/Base/SelectFilter'
import LabelInputHorizontal from 'src/components/ERP/General/LabelInputHorizontal'
import SalesTable from 'src/components/ERP/Sales/SalesTable'
import Title from 'src/components/ERP/General/Title'
import LabelSelectHorizontal from 'src/components/ERP/General/LabelSelectHorizontal'
import LabelMultiSelectHorizontal from 'src/components/ERP/General/LabelMultiSelectHorizontal'
import LabelDatepickerHorizontal from 'src/components/ERP/General/LabelDatepickerHorizontal'
import LabelSelectFilterHorizontal from 'src/components/ERP/General/LabelSelectFilterHorizontal'
import Button_icon from 'src/components/ERP/Base/Button_icon'
import { Notify } from "quasar";
import Select from 'src/components/ERP/Base/Select'
import Radio from 'src/components/ERP/Base/Radio';

export default{
  data(){
    return{
      filter_status: false,
      search: "",
      supcus: "",
      status: "",
      status_options: [
        {
          label: "All",
          value: [1,0]
        },
        {
          label: "Posted",
          value: [1]
        },
        {
          label: "Pending",
          value: [0]
        },
      ],
      sort_type_options: [
        {
          label: "Ascending",
          value: "Asc"
        },
        {
          label: "Descending",
          value: "Desc"
        }
      ],
      sort_by_options: [],
      outlet_options: [],
      outlet_guid: [],
      select_options: [],
      filter_options: [],
      filter: {
        pagination: 5,
      },
      retailer_guid: sessionStorage.getItem("retailer_guid") != "" && sessionStorage.getItem("retailer_guid") != "null" && sessionStorage.getItem("retailer_guid") != null ? sessionStorage.getItem("retailer_guid") : [],
      user_name: sessionStorage.getItem("user_name") != "" && sessionStorage.getItem("user_name") != "null" && sessionStorage.getItem("user_name") != null ? sessionStorage.getItem("user_name") : [],
      language: sessionStorage.getItem("language") != "" && sessionStorage.getItem("language") != "null" && sessionStorage.getItem("language") != null ? sessionStorage.getItem("language") : [],
      currency_sign: sessionStorage.getItem("currency_sign") != "" && sessionStorage.getItem("currency_sign") != "null" && sessionStorage.getItem("currency_sign") != null ? sessionStorage.getItem("currency_sign") : [],
      table_column: [],
      table_data: [],
      active_delete_json: {},
      delete_confirmation: false,
      deleteLoading: false,
      page_function: this.$route.name,
      results: [],
      filter_transmain: false,
      miniState_main: false,
      showNext: true,
      supcus_options: [],
    }
  },
  components:{
      Input,
      SelectFilter,
      LabelInputHorizontal,
      SalesTable,
      Title,
      // LabelSelectHorizontal,
      // LabelMultiSelectHorizontal,
      // LabelDatepickerHorizontal,
      LabelSelectFilterHorizontal,
      Button_icon,
      Select,
      Radio,
  },
  computed: {
    dbComponentBehavior() {
      return this.$store.getters['dbComponentBehavior/byLanguage']('erp')
    },
  },
  methods: {
    handleShowSidebar()
      {
        this.miniState_main = !this.miniState_main;
        this.$emit("clickSidebar", this.miniState_main);
      },
      handleShowFilter()
      {
        this.filter_transmain = true;
        this.filter = {
          pagination: this.filter.pagination,
          sort_type: this.ori_params.params.sort_type,
          sort_by: this.ori_params.params.sort_by,
          total_row: this.table_data.data.count,
          from: this.ori_params.params.offset + 1,
          to: this.ori_params.params.offset + this.table_data.data.results.length,
          pagination_options: [
            {
              label: 5,
              value: 5,
            },
            {
              label: 10,
              value: 10,
            },
            {
              label: 20,
              value: 20,
            },
            {
              label: 50,
              value: 50,
            },
            {
              label: 'All',
              value: 9999999,
            },
          ],
        }
      },
      handleClickRefno(refno)
      {
        console.log('page_function',this.page_function)
        this.$router.push({
            name: "View" + this.page_function,
            query: {  refno: refno  },
        });
      },
      handleList(newVal)
      {
        this.$router.push({
            name: "View" + this.page_function,
            // query: {  header_id: payload.transmain_guid  },
        });
      },
      async handlePrintSnMain(col, props)
      {
        var main_id = props.transmain_guid;
        var outlet_guid = props.outlet_guid.outlet_guid;

        var payload = {
          params: {
            outlet_guid: outlet_guid,
            trans_main: main_id,
            complete: 0
          }
        }

        var row = await this.getSn(payload);

        if(row.length == 0)
        {
          this.showNotify('negative', 'No SN under this itemcode')
          return;
        }

        var lot_numbers = [];

        for(var index in row)
        {
            lot_numbers.push(row[index].lot_number)
        }

        this.$router.push({
          name: "PrintSn",
          query: {
            from: 'gr',
            id: lot_numbers,
            col: col
          }
        });
      },
      handleCancel(){
        console.log('handleCancel');
      },
      async handleDeleteLine(){
        this.deleteLoading = true;

        var payload = {
          RefNo: this.active_delete_json.RefNo,
          language: this.language
        }

        var data = {};

        if(this.page_function == 'Adjustment')
        {

          await this.$store.dispatch('adjustment/trigger_delete_adj', payload).then(() => {
            data = JSON.parse(JSON.stringify(this.$store.getters['adjustment/get_adj_status']));
          });
        }
        else if(this.page_function == 'SalesInvoice')
        {
          await this.$store.dispatch('purchase/trigger_delete_grmain', payload).then(() => {
            data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_grmain_status']));
          });
        }
        else if(this.page_function == 'DebitNote')
        {
          await this.$store.dispatch('purchase/trigger_delete_dn', payload).then(() => {
            data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_dn_status']));
          });
        }

        if(data.status == "success")
        {
          this.table_function(this.ori_params);
          this.showNotify("positive","Delete successfully");
          this.delete_confirmation = false;
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
          this.deleteLoading = false;
        }
      },
      handleDelete(payload){
        this.active_delete_json = payload;
        this.delete_confirmation = true;
      },
      handlePrint(newVal){
        this.$router.push({
          name: "Print",
          query: {
            from: 'Header',
            type: (this.page_function == 'Adjustment' ? 'SO' : this.page_function == 'SalesInvoice' ? 'SI' : this.page_function == 'Adjustment' ? 'SO' : this.page_function == 'SalesInvoice' ? 'SI' : 'IS'),
            id: newVal.transmain_guid
          }
        });
      },
      handlePrintDropdown(newVal,value)
      {
        this.$router.push({
          name: "Print",
          query: {
            from: 'Header',
            type: value,
            id: newVal.transmain_guid
          }
        });
      },
      handleConvert(){

        if(this.page_function == 'SalesInvoice')
        {
          this.$router.push("CreateSalesInvoice");
        }
        else if(this.page_function == 'SalesInvoice')
        {
          if(newVal == 'SO')
          {
            this.$router.push({ name: "ConvertSOtoSI" });
          }
          else if(newVal == 'IS')
          {
            this.$router.push({ name: "ConvertIStoSI" });
          }
        }
      },
      handleShowCreateAdjustment(){
        this.$router.push({ name: "Create" + this.page_function });
      },

      handleAction: function(payload)
      {
        this.$router.push({
            name: "Edit" + this.page_function,
            query: {  refno: payload.RefNo  },
        });
      },
      handleFilter()
      {
        if(this.filter.sort_type=='Desc')
        {
          this.ori_params.params.ordering = '-' + this.filter.sort_by;
        }
        else
        {
          this.ori_params.params.ordering = this.filter.sort_by;
        }

        this.table_function(this.ori_params);
        this.filter_transmain = false;
      },
      changePagination(newVal)
      {
        var offset = this.ori_params.params.offset;
        var limit = this.ori_params.params.limit;

        if(newVal == 'next')
        {
          offset = offset + limit;
        }
        else if(newVal == 'back')
        {
          offset = offset - limit;
        }

        if(offset < 0)
        {
          offset = 0;
        }

        this.showNext = this.ori_params.params.offset + this.ori_params.params.limit >= this.table_data.data.count

        this.ori_params.params.offset = offset;
        this.ori_params.params.limit = limit;

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
          this.showAddLoading = true;
          var payload = ori_payload.params;
          var offset = payload.offset;
          payload.skip = offset;
          payload.RefNo = this.search;
          payload.language = this.language;

          var mobile = this.$q.screen.width < 600;

          if(mobile){
            payload.limit = this.filter.pagination;
          }
          if(this.page_function == 'Adjustment')
          {
            payload.SCode = this.supcus;

            if(payload.ordering == "")
            {
              payload.ordering = "-laststamp"
            }
          }
          else if(this.page_function == 'GoodsReceiving' || this.page_function == 'DebitNote')
          {
            if(payload.ordering == "")
            {
              payload.ordering = "-LastStamp"
            }
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

          if(payload.RefNo != "" || this.supcus != "")
          {
            this.filter_status = true;
          }
          else
          {
            this.filter_status = false;
          }

          var table_column_adj = [
              {
                  name: 'action',
                  required: true,
                  label: 'Action',
                  align: 'center',
                  sortable: false,
                  field: 'action',
                  format_child: '',
                  tooltip: '',
                  "headerStyle": "max-width: 70px; text-align: center;",
              },
              // {
              //     name: 'BillStatus',
              //     required: true,
              //     label: 'Posted',
              //     align: 'center',
              //     sortable: true,
              //     field: 'BillStatus',
              //     format_child: '',
              //     tooltip: '',
              //     "headerStyle": "max-width: 70px; text-align: center;",
              // },
              // {
              //     name: 'month',
              //     required: true,
              //     label: 'Mth',
              //     align: 'center',
              //     sortable: false,
              //     field: 'month',
              //     format_child: '',
              //     tooltip: '',
              //     headerStyle: 'text-align: center;'
              // },
              {
                  name: 'RefNo',
                  required: true,
                  label: 'Refno',
                  align: 'left',
                  sortable: false,
                  field: 'RefNo',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'PODate',
                  required: true,
                  label: 'P/O Date',
                  align: 'left',
                  sortable: false,
                  field: 'PODate',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'DeliverDate',
                  required: true,
                  label: 'Delv Date',
                  align: 'left',
                  sortable: true,
                  field: 'DeliverDate',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'Total',
                  required: true,
                  label: 'Total Amount',
                  align: 'right',
                  sortable: true,
                  field: 'Total',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
              },
              {
                  name: 'Supplier',
                  required: true,
                  label: 'Customer',
                  align: 'left',
                  sortable: false,
                  field: 'Supplier',
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
                  name: 'Remark',
                  required: true,
                  label: 'Remark',
                  align: 'left',
                  sortable: true,
                  field: 'Remark',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'laststamp',
                  required: true,
                  label: 'Last Stamp',
                  align: 'left',
                  sortable: true,
                  field: 'laststamp',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              // {
              //     name: 'created_at',
              //     required: true,
              //     label: 'Created At',
              //     align: 'left',
              //     sortable: true,
              //     field: 'created_at',
              //     format_child: '',
              //     tooltip: '',
              //     headerStyle: 'text-align: center;'
              // },
              // {
              //     name: 'created_by',
              //     required: true,
              //     label: 'Created By',
              //     align: 'left',
              //     sortable: true,
              //     field: 'created_by',
              //     format_child: '',
              //     tooltip: '',
              //     headerStyle: 'text-align: center;'
              // },
              // {
              //     name: 'updated_at',
              //     required: true,
              //     label: 'Updated At',
              //     align: 'left',
              //     sortable: true,
              //     field: 'updated_at',
              //     format_child: '',
              //     tooltip: '',
              //     headerStyle: 'text-align: center;'
              // },
              // {
              //     name: 'updated_by',
              //     required: true,
              //     label: 'Updated By',
              //     align: 'left',
              //     sortable: true,
              //     field: 'updated_by',
              //     format_child: '',
              //     tooltip: '',
              //     headerStyle: 'text-align: center;'
              // },
          ];

          var table_column_si = [
              {
                  name: 'action',
                  required: true,
                  label: 'Action',
                  align: 'center',
                  sortable: false,
                  field: 'action',
                  format_child: '',
                  tooltip: '',
                  "headerStyle": "max-width: 70px; text-align: center;",
              },
              // {
              //     name: 'month',
              //     required: true,
              //     label: 'Mth',
              //     align: 'center',
              //     sortable: false,
              //     field: 'month',
              //     format_child: '',
              //     tooltip: '',
              //     headerStyle: 'text-align: center;'
              // },
              {
                  name: 'RefNo',
                  required: true,
                  label: 'RefNo',
                  align: 'center',
                  sortable: false,
                  field: 'RefNo',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'SIDate',
                  required: true,
                  label: 'SIDate',
                  align: 'left',
                  sortable: false,
                  field: 'GRDate',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'DocDate',
                  required: true,
                  label: 'Doc Date',
                  align: 'left',
                  sortable: true,
                  field: 'DocDate',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'Total',
                  required: true,
                  label: 'Total Amount',
                  align: 'right',
                  sortable: true,
                  field: 'Total',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
              },
              {
                  name: 'Code',
                  required: true,
                  label: 'Customer Code',
                  align: 'left',
                  sortable: false,
                  field: 'Code',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'Name',
                  required: true,
                  label: 'Customer Name',
                  align: 'left',
                  sortable: false,
                  field: 'Name',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'InvNo',
                  required: true,
                  label: 'InvNo',
                  align: 'left',
                  sortable: true,
                  field: 'InvNo',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'DONo',
                  required: true,
                  label: 'DONo',
                  align: 'left',
                  sortable: true,
                  field: 'DONo',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'CalcCost',
                  required: true,
                  label: 'CalcCost',
                  align: 'center',
                  sortable: true,
                  field: 'CalcCost',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'consign',
                  required: true,
                  label: 'consign',
                  align: 'center',
                  sortable: true,
                  field: 'consign',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'InvRefno',
                  required: true,
                  label: 'InvRefno',
                  align: 'left',
                  sortable: true,
                  field: 'InvRefno',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },              {
                  name: 'SubDeptCode',
                  required: true,
                  label: 'SubDeptCode',
                  align: 'left',
                  sortable: true,
                  field: 'SubDeptCode',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'Remark',
                  required: true,
                  label: 'Remark',
                  align: 'left',
                  sortable: true,
                  field: 'Remark',
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
                  name: 'Receivedby',
                  required: true,
                  label: 'Received by',
                  align: 'left',
                  sortable: true,
                  field: 'Receivedby',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'postby',
                  required: true,
                  label: 'Posted by',
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
                  label: 'Posted on',
                  align: 'left',
                  sortable: true,
                  field: 'postdatetime',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              // {
              //     name: 'created_at',
              //     required: true,
              //     label: 'Created At',
              //     align: 'left',
              //     sortable: true,
              //     field: 'created_at',
              //     format_child: '',
              //     tooltip: '',
              //     headerStyle: 'text-align: center;'
              // },
              // {
              //     name: 'created_by',
              //     required: true,
              //     label: 'Created By',
              //     align: 'left',
              //     sortable: true,
              //     field: 'created_by',
              //     format_child: '',
              //     tooltip: '',
              //     headerStyle: 'text-align: center;'
              // },
              // {
              //     name: 'updated_at',
              //     required: true,
              //     label: 'Updated At',
              //     align: 'left',
              //     sortable: true,
              //     field: 'updated_at',
              //     format_child: '',
              //     tooltip: '',
              //     headerStyle: 'text-align: center;'
              // },
              // {
              //     name: 'updated_by',
              //     required: true,
              //     label: 'Updated By',
              //     align: 'left',
              //     sortable: true,
              //     field: 'updated_by',
              //     format_child: '',
              //     tooltip: '',
              //     headerStyle: 'text-align: center;'
              // },
          ]

          var table_column_dn = [
              {
                  name: 'action',
                  required: true,
                  label: 'Action',
                  align: 'center',
                  sortable: false,
                  field: 'action',
                  format_child: '',
                  tooltip: '',
                  "headerStyle": "max-width: 70px; text-align: center;",
              },
              // {
              //     name: 'month',
              //     required: true,
              //     label: 'Mth',
              //     align: 'center',
              //     sortable: false,
              //     field: 'month',
              //     format_child: '',
              //     tooltip: '',
              //     headerStyle: 'text-align: center;'
              // },
              {
                  name: 'RefNo',
                  required: true,
                  label: 'Refno',
                  align: 'left',
                  sortable: false,
                  field: 'RefNo',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'SubDeptCode',
                  required: true,
                  label: 'SubDept Code',
                  align: 'left',
                  sortable: false,
                  field: 'SubDeptCode',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'DocDate',
                  required: true,
                  label: 'Doc Date',
                  align: 'left',
                  sortable: false,
                  field: 'DocDate',
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
                  name: 'Amount',
                  required: true,
                  label: 'Amount',
                  align: 'right',
                  sortable: true,
                  field: 'Amount',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
              },
              {
                  name: 'Code',
                  required: true,
                  label: 'Customer Code',
                  align: 'left',
                  sortable: false,
                  field: 'Code',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'Name',
                  required: true,
                  label: 'Customer Name',
                  align: 'left',
                  sortable: false,
                  field: 'Name',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'DocNo',
                  required: true,
                  label: 'Doc No',
                  align: 'left',
                  sortable: true,
                  field: 'DocNo',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'sup_cn_no',
                  required: true,
                  label: 'CN #',
                  align: 'left',
                  sortable: true,
                  field: 'sup_cn_no',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'sup_cn_date',
                  required: true,
                  label: 'CN Date',
                  align: 'left',
                  sortable: true,
                  field: 'sup_cn_date',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'Remark',
                  required: true,
                  label: 'Remark',
                  align: 'left',
                  sortable: true,
                  field: 'Remark',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'Issuedby',
                  required: true,
                  label: 'Issued by',
                  align: 'left',
                  sortable: true,
                  field: 'Issuedby',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'postby',
                  required: true,
                  label: 'Posted by',
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
                  label: 'Posted on',
                  align: 'left',
                  sortable: true,
                  field: 'postdatetime',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              // {
              //     name: 'created_at',
              //     required: true,
              //     label: 'Created At',
              //     align: 'left',
              //     sortable: true,
              //     field: 'created_at',
              //     format_child: '',
              //     tooltip: '',
              //     headerStyle: 'text-align: center;'
              // },
              // {
              //     name: 'created_by',
              //     required: true,
              //     label: 'Created By',
              //     align: 'left',
              //     sortable: true,
              //     field: 'created_by',
              //     format_child: '',
              //     tooltip: '',
              //     headerStyle: 'text-align: center;'
              // },
              // {
              //     name: 'updated_at',
              //     required: true,
              //     label: 'Updated At',
              //     align: 'left',
              //     sortable: true,
              //     field: 'updated_at',
              //     format_child: '',
              //     tooltip: '',
              //     headerStyle: 'text-align: center;'
              // },
              // {
              //     name: 'updated_by',
              //     required: true,
              //     label: 'Updated By',
              //     align: 'left',
              //     sortable: true,
              //     field: 'updated_by',
              //     format_child: '',
              //     tooltip: '',
              //     headerStyle: 'text-align: center;'
              // },
          ];

          this.table_column = this.page_function == 'Adjustment' ? table_column_adj : this.page_function == 'SalesInvoice' ? table_column_si : table_column_dn;

          var data = {};
          if(this.page_function == 'Adjustment')
          {
            payload.language = this.language;

            await this.$store.dispatch('sales/trigger_get_somain', payload).then(() => {
                data = JSON.parse(JSON.stringify(this.$store.getters['sales/get_somain']));
              //  console.log('data',data)
            });
          }
          else if(this.page_function == 'SalesInvoice')
          {
            await this.$store.dispatch('sales/trigger_get_simain', payload).then(() => {
                data = JSON.parse(JSON.stringify(this.$store.getters['sales/get_simain']));
              });
          }
          else if(this.page_function == 'DebitNote')
          {
            await this.$store.dispatch('purchase/trigger_get_dn', payload).then(() => {
                data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_dn']));
            });
          }

          var results = data.data.detail;

          for(var index in results)
          {
              var obj = results[index];
              if(this.page_function == 'Adjustment')
              {
                obj.Supplier = obj.SCode + ' - ' + obj.SName;
                obj.DocumentStatus = obj.send == 1 ? 'Send' : obj.approved == 1 ? 'Approved' : obj.rejected == 1 ? 'Rejected' : obj.BillStatus == 1 ? 'Posted' : obj.unpost == 1 ? 'Unpost' : obj.cancel == 1 ? 'Cancelled' : obj.Amendment == 1 ? 'Amended' : obj.Completed == 1 ? 'Completed' : 'New';
              }
              else if(this.page_function == 'GoodsReceivedNote')
              {
                obj.Supplier = obj.Code + ' - ' + obj.Name;
                obj.DocumentStatus = obj.BillStatus == 1 ? 'Posted' : obj.unpostby != null && obj.unpostby != 'null' ? 'Unpost' : 'New';
              }
              obj.Total = this.formatAmount(obj.Total, "$");
              obj.Amount = this.formatAmount(obj.Amount, "$");
          }


          this.table_data = {
              "data": {
                    "count": data.data.total_row,
                    "next": null,
                    "previous": null,
                    "results": data.data.detail
                }
            };

            this.results = data.data.detail;
            this.showNext = this.ori_params.params.offset + this.ori_params.params.limit >= this.table_data.data.count;
            this.filter.total_row = this.table_data.data.count;
            var from = this.ori_params.params.offset+1;
            var to = this.ori_params.params.offset + this.table_data.data.results.length;
            this.filter.from = from;
            this.filter.to = to;
            this.showAddLoading = false;


      },
      async getSn(payload)
      {
        return await this.$store.dispatch('masterfile/trigger_ts_sn_parent', payload).then(() => {
          var data = JSON.parse(JSON.stringify(this.$store.getters['masterfile/get_ts_sn_parent']));
          var results = data.data.results;
          return results;
        });
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
      handleReceiveFilter(newVal)
      {
        if(!newVal)
        {
            this.search = "";
            this.supcus = "";

            this.filter_status = false;

            this.table_function(this.ori_params);
        }
      },
      handleChangeOptions(){
        this.table_function(this.ori_params);
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
  async created() {
    var sort_by_options = [];

    if(this.page_function == 'Adjustment')
    {
      sort_by_options = [
        {
          label: 'Posted',
          value: 'BillStatus'
        },
        {
          label: 'RefNo',
          value: 'RefNo'
        },
        {
          label: 'P/O Date',
          value: 'PODate'
        },
        {
          label: 'Delv Date',
          value: 'DeliverDate'
        },
        {
          label: 'Total Amount',
          value: 'Total'
        },
        {
          label: 'Supplier Code',
          value: 'SCode'
        },
        {
          label: 'Supplier Name',
          value: 'SName'
        },
        {
          label: 'Location',
          value: 'Location'
        },
        {
          label: 'Remark',
          value: 'Remark'
        },
        {
          label: 'Last Stamp',
          value: this.page_function == 'PurchaseOrder' ? 'laststamp' : 'LastStamp'
        },
      ]
    }
    else if(this.page_function == 'GoodsReceiving')
    {
      sort_by_options = [
        {
          label: 'RefNo',
          value: 'RefNo'
        },
        {
          label: 'GRDate',
          value: 'GRDate'
        },
        {
          label: 'Doc Date',
          value: 'DocDate'
        },
        {
          label: 'Total Amount',
          value: 'Total'
        },
        {
          label: 'Supplier Code',
          value: 'Code'
        },
        {
          label: 'Supplier Name',
          value: 'Name'
        },
        {
          label: 'InvNo',
          value: 'InvNo'
        },
        {
          label: 'DONo',
          value: 'DONo'
        },
        {
          label: 'CalcCost',
          value: 'CalcCost'
        },
        {
          label: 'consign',
          value: 'consign'
        },
        {
          label: 'InvRefno',
          value: 'InvRefno'
        },
        {
          label: 'SubDeptCode',
          value: 'SubDeptCode'
        },
        {
          label: 'Remark',
          value: 'Remark'
        },
        {
          label: 'Location',
          value: 'Location'
        },
        {
          label: 'Received by',
          value: 'Receivedby'
        },
        {
          label: 'Posted by',
          value: 'postby'
        },
        {
          label: 'Posted on',
          value: 'postdatetime'
        },
        {
          label: 'Last Stamp',
          value: 'LastStamp'
        }
      ]
    }
    else if(this.page_function == 'DebitNote')
    {
      sort_by_options = [
        {
          label: 'RefNo',
          value: 'RefNo'
        },
        {
          label: 'SubDeptCode',
          value: 'SubDeptCode'
        },
        {
          label: 'Doc Date',
          value: 'DocDate'
        },
        {
          label: 'Location',
          value: 'Location'
        },
        {
          label: 'Amount',
          value: 'Amount'
        },
        {
          label: 'Supplier Code',
          value: 'Code'
        },
        {
          label: 'Supplier Name',
          value: 'Name'
        },
        {
          label: 'Doc No',
          value: 'DocNo'
        },
        {
          label: 'CN #',
          value: 'sup_cn_no'
        },
        {
          label: 'CN Date',
          value: 'sup_cn_date'
        },
        {
          label: 'Remark',
          value: 'Remark'
        },
        {
          label: 'Issued by',
          value: 'Issued by'
        },
        {
          label: 'Posted by',
          value: 'postby'
        },
        {
          label: 'Posted on',
          value: 'postdatetime'
        },
        {
          label: 'Last Stamp',
          value: 'LastStamp'
        }
      ]
    }

    this.sort_by_options = sort_by_options;

    var mobile = this.$q.screen.width < 600;

    if(mobile)
    {
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
    }

    var supcus_ary = [];

    var payload = {
      params: {
        type: 'S',
        skip: '0',
        limit: 999999,
        language: this.language,
      }
    }

    await this.$store.dispatch('purchase/trigger_read_supcus_all', payload).then(() => {
      var data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_read_supcus_all']));

      console.log(data)

      for(var i in data.data)
      {
        var result = data.data[i];

        var obj = {
          label: result.Code + ' - ' + result.Name,
          value: result.Code,
          type: payload.params.type
        }

        supcus_ary.push(obj)
      }

      this.supcus_options = supcus_ary;
    });
  }
}

</script>


<style scoped>
.dialog_action1
{
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 55%; /* Adjust the desired width */
  height: 40px; /* Adjust the desired height */
  border-radius: 15px;
  background-color: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}
.header_text
{
  padding-left: 16px;
  padding-right: 16px;
  font-weight: bold;
}

* >>> .q-btn-dropdown__arrow
{
  display: none;
}

.card_design
{
  height: 100px;
  background-color: white;
  color:black;
}

@media all and (max-width: 1023px) {
  .card_design
  {
    min-width: 100%;
  }
}
.button_upload_wrapper
{
    margin-top: 1px;
    float: right;
}

.create_group_button
{
    padding-left: 10px;
    padding-right: 10px;
}

.upload_container
{
    padding: 10px;
    padding-top: 0px;
}

.card_section_two
{
    margin-top: 10px;
}

@media all and (min-width: 600px) {
  .card_section_second
  {
      padding-left: 20px;
      padding-right: 20px;
  }
}

@media all and (max-width: 599px) {
  .card_section_second
  {
      padding: 10px;
  }
}

.card_section_second_content
{
    border: 2px solid #ababab;
    /* height: 60vh; */
    min-height: 60vh;
    /* overflow-y: scroll; */
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

.table_wrapper
{
    padding: 18px;
}

* >>> .q-table__container
{
    padding: 0px;
    border-radius: 0px;
    padding: 0px !important;
}

/* .q-form
{
  width: 100%;
} */

.q-card
{
  width: 700px;
  max-width: 80vw;
}

@media all and (min-width: 1023px) {

    .custom_dialog
    {
        margin-top: 30px !important;
    }
}

.input_wrapper
{
  margin-top:2px;
}

.input_wrapper_right
{
  padding-right: 5px;
}

.dialog_font
{
  font-weight: bold;
  font-size: 15px;
}

.dialog_separator
{
  padding-top: 10px;
}

.upload
{
    margin: 10px;
    padding-top: 10px;
    padding-bottom: 0px;
}

.upload_separator_first
{
    border-bottom: 1px solid #DEE1E6;
    margin: 10px;
    padding-top: 10px;
    padding-bottom: 0px;
}

.upload_separator
{
    border-bottom: 1px solid #DEE1E6;
    margin: 10px;
    padding-top: 10px;
    padding-bottom: 30px;
}

.custom_cancel_button
{
    border: 1px solid black;
}
</style>
