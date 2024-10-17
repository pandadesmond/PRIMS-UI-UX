<template>
  <div v-if="$q.screen.width > 599" class="row card_section card_section_second" style="padding-top:16px">
    <!-- <Title v-if="page_function == 'PurchaseOrder'" :text="$language('D0010')" :filter_status="filter_status" v-on:receiveFilter="handleReceiveFilter" /> -->
    <!-- <Title v-if="page_function == 'GoodsReceivedNote'" :text="$language('D0123')" :filter_status="filter_status" v-on:receiveFilter="handleReceiveFilter" />
    <Title v-if="page_function == 'DebitNote'" :text="$language('D0012')" :filter_status="filter_status" v-on:receiveFilter="handleReceiveFilter" />
    <Title v-if="page_function == 'SalesOrder'" :text="$language('D0015')" :filter_status="filter_status" v-on:receiveFilter="handleReceiveFilter" />
    <Title v-if="page_function == 'InterbranchTransfer'" :text="$language('D0013')" :filter_status="filter_status" v-on:receiveFilter="handleReceiveFilter" />
    <Title v-if="page_function == 'CreditNote'" :text="'Credit Note'" :filter_status="filter_status" v-on:receiveFilter="handleReceiveFilter" /> -->
    <!-- <div class="chip-container">
    <Chip v-if="page_function == 'PurchaseOrder'" :text="'Outlet'" v-on:receiveClick="handleNavigate('Outlet')" icon="fas fa-shopping-bag" color="grey-6" class="bold-font"/>
    <i v-if="page_function == 'PurchaseOrder'" class="fas fa-chevron-right chip-icon"></i>
    <Chip v-if="page_function == 'PurchaseOrder'" :text="$language('D0010')" icon="fas fa-shopping-bag" color="blue-grey-10" class="bold-font"/>
    </div> -->
    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
      <div class="row">
        <!-- <div class="col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10"> -->
          <!-- <div class="row"> -->
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

            <!-- <div class="col-xs-12 col-sm-12 col-md-1 col-lg-1 col-xl-1">
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
            </div> -->
          <!-- </div> -->
        <!-- </div> -->

        <!-- <div class=" col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2"></div> -->

        <div class="card_section_two col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div class="q-pr-xs row items-center" style="padding-bottom: 24px">
            <div class="input-container row col-12">
              <div class="div-container col-xs-12 col-sm-4 col-md-4 col-lg-4 col-xl-4 q-pr-md">
                <InputLabel
                :icon_append="'search'"
                :readonly="false"
                :no_label="true"
                :text="$language('D0030')"
                v-model:pass_value="search"
                :dbComponentBehavior="{ ...dbComponentBehavior.text, label: $language('D0030') }"
                v-on:receiveChange="handleChangeOptions"
                @iconClick="performSearch"
                class="input_icon_custom"
                />
              </div>
              <div class="div-container col-xs-12 col-sm-4 col-md-4 col-lg-4 col-xl-4 q-pl-md">
                <LabelSelectFilterHorizontal
                style="margin-left: 0px;"
                :readonly="false"
                :no_label="true"
                :label="$language('D0025')"
                v-model:pass_value="supcus"
                :dbComponentBehavior="dbComponentBehavior.text"
                :options="supcus_options"
                v-on:receiveChange="handleChangeOptions"
                class="label-font"
                />
              </div>

              <div class="div-container col-xs-12 col-sm-4 col-md-4 col-lg-4 col-xl-4 " align="right">
                <Button_icon v-if="page_function != 'GoodsReceivedNote'" :flat="false" :font_color="'white'" :color="'#1E90FF'" :text="page_function == 'PurchaseOrder' ? $language('D0027') :  page_function == 'InterbranchTransfer'  ? $language('D0124') :  page_function == 'DebitNote' ? $language('D0125'): 'New CN'" :outline="false" size="16px"
                v-on:receiveClick="handleShowCreatePurchaseOrder" icon="add" :border_radius="'8px'" :hoverColor="'linear-gradient(0deg, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.15) 100%), #1E90FF'" padding='6px' class="bold-font" style="width:120px;height:42px"/>

                <!-- <Button_icon v-if="page_function == 'GoodsReceivedNote'" :flat="false" :font_color="'white'" :color="'#2F3A4D'" :text="$language('D0039')" :outline="false" size="15px"
                v-on:receiveClick="handleConvert"/> -->

<!-- simple receive GRN -->
                <q-btn-dropdown class="grn_receive_button"  v-if="page_function == 'GoodsReceivedNote'" :flat="false" :outline="false" size="16px" no-caps label="Receive" > <!--dense -->
                  <q-list>
                    <q-item clickable v-close-popup @click="handleConvert" class="qlist-font" style="border-radius:8px;background-color: white; color: black;">
                      <q-item-section>
                        <q-item-label>{{$language('D0215')}}</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-item v-if="item_listing_receiving" clickable v-close-popup @click="handleItemListingReceive" style="background-color: #2F3A4D; color: white;">
                      <q-item-section>
                        <q-item-label>(x Excel) Item Listing Receive</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-btn-dropdown>
              </div>
            </div>
          </div>

            <PurchaseTable
            :row_per_page="[5,10,20,50,]"
            :search_input="true"
            :top_button="false"
            v-on:onClickRefno="handleClickRefno"
            v-on:add_button="handleShowCreatePurchaseOrder"
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

    <q-inner-loading
      :showing="showAddLoading"
      color="primary"
    />
  </div>

  <div v-else class="row card_section card_section_second">
    <div class="row col-12">
    <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 chip-container">
    <!-- <Chip v-if="page_function == 'PurchaseOrder'" :text="'Outlet'" v-on:receiveClick="handleNavigate('Outlet')" icon='img:icons/outlet.svg' color="grey-6" class="bold-font custom-chip-padding"/> -->
    <!-- <i v-if="page_function == 'PurchaseOrder'" class="fas fa-chevron-left chip-icon"></i>   icon="chevron_left" icon-right="img:/purchase.svg"-->
    <Chip v-if="page_function == 'PurchaseOrder'" :text="$language('D0010')" icon="img:purchase.svg" color="#273655" class="chip_sty bold-font" v-on:receiveClick="handleNavigate('Outlet')"/>
    <Chip v-if="page_function == 'GoodsReceivedNote'" :text="$language('D0123')" icon="img:purchase.svg" color="#273655" class="bold-font chip_sty" v-on:receiveClick="handleNavigate('Outlet')"/>
    <Chip v-if="page_function == 'DebitNote'" :text="$language('D0012')" icon="img:purchase.svg" color="#273655" class="bold-font chip_sty" v-on:receiveClick="handleNavigate('Outlet')"/>
    <Chip v-if="page_function == 'CreditNote'" :text="'Credit Note'" icon="img:purchase.svg" color="#273655" class="bold-font chip_sty" v-on:receiveClick="handleNavigate('Outlet')"/>
    </div>
    <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2" align="right" style="margin-top: 5px;">
          <Button_icon :icon="'filter_alt'" :flat="false" :border_radius="'8px;'" :font_color="'primary'" :color="'white'" :outline="true" size="15px"
          v-on:receiveClick="handleShowFilter" class="primary_button_font"/>
        </div>
    
  </div>
    <!-- <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-px-md" > 
      <div class="row col-12">
        <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 ">
          <Button_icon :icon="'sort'" :border_radius="'17px;'" :flat="true" :font_color="'#29292A'" :color="'transparent'" :outline="false" size="17px"
                  v-on:receiveClick="handleShowSidebar" class="sort_font"/>
        </div>
        <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
          <Title v-if="page_function == 'PurchaseOrder'" :text="$language('D0010')" :smaller_label="true" :noFilter="true" :filter_status="filter_status" v-on:receiveFilter="handleReceiveFilter" />
          <Title v-if="page_function == 'GoodsReceivedNote'" :text="$language('D0123')" :smaller_label="true" :noFilter="true" :filter_status="filter_status" v-on:receiveFilter="handleReceiveFilter" />
          <Title v-if="page_function == 'DebitNote'" :text="$language('D0012')" :noFilter="true" :smaller_label="true" :filter_status="filter_status" v-on:receiveFilter="handleReceiveFilter" />
          <Title v-if="page_function == 'SalesOrder'" :text="$language('D0015')" :noFilter="true" :smaller_label="true" :filter_status="filter_status" v-on:receiveFilter="handleReceiveFilter" />
          <Title v-if="page_function == 'InterbranchTransfer'" :text="$language('D0013')" :smaller_label="true" :noFilter="true" :filter_status="filter_status" v-on:receiveFilter="handleReceiveFilter" />
          <Title v-if="page_function == 'CreditNote'" :text="'Credit Note'"  :smaller_label="true" :noFilter="true" :filter_status="filter_status" v-on:receiveFilter="handleReceiveFilter" />
        </div>

        

      </div>
    </div> -->

    <div class="container_top col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center " style="font-size: 13px ; color:#757575; font-weight:700; font-family: InterfontBold; ">
          <q-icon name="fa fa-user" class="q-px-none" size="15px" :style="{ color: '#54656F !important' }"/>&nbsp;&nbsp;Supplier &nbsp;&nbsp;&nbsp;&nbsp;
          <q-icon name="location_on" :style="{ color: '#54656F !important' }" size="15px" />&nbsp;&nbsp;Branch&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <q-icon name="event" class="q-px-none" size="15px" :style="{ color: '#54656F !important' }"/>&nbsp;&nbsp;Date
          <!-- &nbsp;:&nbsp;Supplier &nbsp;&nbsp;&nbsp;&nbsp; -->
    </div>


    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
      <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" style="padding: 0px; padding-bottom: 24px">
          <div class="row" style="gap:10px">
<!-- expanded card @click="expanded = !expanded"-->
            <div @click="selectCard(index)" v-for="(result,index) in results" :key="index" class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" > <!-- style="padding-bottom: 8px;"-->
              <q-card flat class="card_design" style="width: 100%; overflow-wrap: break-word; border-radius:8px;" :class="{'selected-card': selectedCardIndex === index}"> 
                  <q-card-section style="padding: 5px;">
                    <div class="row">
                      <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9 col-xl-9 q-pl-sm">
                        <div class="row text_1">
                            {{ result.RefNo }}
                        </div>
                        <!-- <div v-if="page_function == 'PurchaseOrder'" class="row q-pt-md" style="font-size: 11px;">
                          {{ result.SCode }} - {{ result.SName }} |<br> {{ result.loc_group }} | {{ result.PODate }}
                        </div> -->
                        <div v-if="page_function == 'PurchaseOrder'" id="detail_show" ref="detail_show"  class="row q-pt-sm" style="font-size: 11px;">
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                             <q-icon name="fa fa-user" class="q-pa-xs" size="15px" :style="{ color: '#54656F !important' }">
                              <!-- <q-tooltip anchor="top middle" self="bottom middle"  :hide-delay="300" :offset="[10, 10]">
                                <strong>Supplier</strong>
                               </q-tooltip> -->
                             </q-icon>
                             <span class="text_2">{{ result.SCode }} - {{ result.SName }}</span>
                            </div>
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                             <q-icon name="location_on" class="q-px-xs" size="15px" :style="{ color: '#54656F !important' }">
                              <!-- <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" :hide-delay="300">
                                <strong>Branch</strong>
                               </q-tooltip> -->
                             </q-icon>
                              <span class="text_2">{{ result.loc_group }}</span> &nbsp;
                             <q-icon name="event" class="q-px-xs" size="15px" :style="{ color: '#54656F !important' }">
                              <!-- <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" :hide-delay="300">
                                <strong>Date</strong>
                               </q-tooltip> -->
                              </q-icon>
                              <span class="text_2">{{ result.PODate }}</span>

                          </div>
                        </div>

                        <div v-if="page_function == 'GoodsReceivedNote'" class="row q-pt-sm" style="font-size: 11px;">
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                             <q-icon name="fa fa-user" class="q-pa-xs" size="15px" color="primary"/>
                              <span class="text_2">{{ result.Code }} - {{ result.Name }}</span>
                            </div>
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                             <q-icon name="location_on" class="q-px-xs" size="15px" :style="{ color: '#54656F !important' }"/>
                              <span class="text_2">{{ result.loc_group }}</span> &nbsp;
                             <q-icon name="event" class="q-px-xs" size="15px" :style="{ color: '#54656F !important' }"/>
                              <span class="text_2">{{ result.GRDate }}</span>
                          </div>
                        </div>
                        <!-- <div v-if="page_function == 'GoodsReceivedNote'" class="row q-pt-md" style="font-size: 11px;">
                          {{ result.Code }} - {{ result.Name }} |<br> {{ result.loc_group }} | {{ result.GRDate }}
                        </div> -->

                        <div v-if="page_function == 'DebitNote'" class="row q-pt-sm" style="font-size: 11px;">
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                             <q-icon name="fa fa-user" class="q-pa-xs" size="15px" color="primary"/><span class="text_2">{{ result.Code }} - {{ result.Name }}</span>
                            </div>
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                             <q-icon name="location_on" class="q-px-xs" size="15px" :style="{ color: '#54656F !important' }"/><span class="text_2">{{ result.locgroup }}</span> &nbsp;
                             <q-icon name="event" class="q-px-xs" size="15px" :style="{ color: '#54656F !important' }"/> <span class="text_2" >{{ result.DocDate }}</span>

                          </div>
                        </div>

                        <!-- <div v-if="page_function == 'DebitNote'" class="row q-pt-md" style="font-size: 11px;">
                          {{ result.Code }} - {{ result.Name }} |<br> {{ result.locgroup }} | {{ result.DocDate }}
                        </div> -->
                        <div v-if="page_function == 'InterbranchTransfer'" class="row q-pt-sm" style="font-size: 11px;">
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                             <q-icon name="fa fa-user" class="q-pa-xs" size="15px"/>
                             <span class="text_2">{{ result.SCode }} - {{ result.SName }}</span>
                            </div>
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                             <q-icon name="location_on" class="q-px-xs" size="15px" color="teal"/>
                              <span class="text_2" >{{ result.loc_group }}</span> &nbsp;
                             <q-icon name="event" class="q-px-xs" size="15px" color="purple"/> <span class="text_2"> {{ result.PODate }} </span>
                          </div>
                        </div>

                        <div v-if="page_function == 'CreditNote'" class="row q-pt-sm" style="font-size: 11px;">
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                             <q-icon name="fa fa-user" class="q-pa-xs" size="15px" color="primary"/><span class="text_2">{{ result.Code }} - {{ result.Name }} </span>
                            </div>
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                             <q-icon name="location_on" class="q-px-xs" size="15px" :style="{ color: '#54656F !important' }"/><span class="text_2">{{ result.locgroup }}</span> &nbsp;
                             <q-icon name="event" class="q-px-xs" size="15px" :style="{ color: '#54656F !important' }"/><span class="text_2"> {{ result.DocDate }}</span>

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
                          <span v-if="page_function != 'DebitNote'">$ {{ result.Total }}</span>
                          <span v-else>$ {{ result.Amount }}</span>
                        </div> -->

                        <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" style="font-weight:  normal; font-size:12px; color:red" >
                              <!-- {{ result.DocumentStatus }} --><!--textTransform:'uppercase'-->
                              <Badge
                                :text="result.DocumentStatus"
                                :color="getBadgeColor(result.DocumentStatus)"
                                :transparent="false"
                                :rounded="true"
                                :textColor="getBadgeTextColor(result.DocumentStatus)"
                                :style="{ padding: '10px', borderRadius: '19px',fontSize: '12px', fontFamily:'InterfontMedium', fontWeight: '500', }"
                              />
                            </div>
                            <div v-if="page_function != 'DebitNote' && page_function != 'CreditNote'" style="padding-top:20%" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text_1">{{ currency_sign }} {{ result.Total }}</div>
                            <div v-if="page_function == 'DebitNote'" style="padding-top:20%" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text_1">{{ currency_sign }} {{ result.Amount }}</div>
                            <div v-if="page_function == 'CreditNote'" style="padding-top:20%" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text_1">{{ currency_sign }} {{ result.SubTotal1 }}</div>
                        </div>
                      </div>
                    </div>
                  </q-card-section>
                  <q-card-section v-show="selectedCardIndex === index">
                    <q-separator /><!--"'#B22222'" -->
                    <q-card-section class="text-subtitle2" align="right">
                      <q-btn no-caps flat color="primary" label="Edit" @click="handleAction(result)" style="font-family:InterfontSemiBold; font-size: 14px;font-weight: 600;"/>
                      <q-btn no-caps flat color="red-7" label="Delete" @click="handleDelete(result)" style="font-family:InterfontSemiBold; font-size: 14px;font-weight: 600;"/>
                    </q-card-section>
                  </q-card-section>
              </q-card>
            </div>

            <div style="padding-bottom: 40px;" class="col-xs-12 text_2" align="right">
              Entries: {{ filter.pagination }} || {{ filter.from }}- {{ filter.to }} of {{ filter.total_row }}
            </div>

            <div class="dialog_action1">
              <div class="row full-height items-center">
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4" align="center"> <!--change from 3 to 4 -->
                  <!-- <Button_icon :icon="'sort'" :border_radius="'17px;'" :flat="true" :font_color="'#928f8f'" :color="'white'" :outline="false" size="13px"
                  v-on:receiveClick="handleShowSidebar" /> -->
                  <Button_icon :disable="ori_params.params.offset == 0 || showAddLoading" :icon="'chevron_left'" :border_radius="'17px;'" :flat="true" :color="'white'" :outline="false" size="13px"
                  v-on:receiveClick="changePagination('back')" class="right_left_button" :font_color="ori_params.params.offset == 0 ? '#928f8f' : '#094161'"/>
                </div>

                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4" align="center" > <!--style="border-right: 1px solid rgb(146, 143, 143);" -->
                  <Button_icon v-if="page_function != 'GoodsReceivedNote'" :icon="'add'" :border_radius="'30px;'" :flat="false" :font_color="'white'" :color="'#094161'" :outline="false"
                  v-on:receiveClick="handleShowCreatePurchaseOrder" class="menu_add"  :icon-size="'2.9em'" style="width:48px; height:48px"/>

                  <!-- <Button_icon v-if="page_function == 'GoodsReceivedNote'" :icon="'add'" :border_radius="'17px;'" :flat="false" :font_color="'white'" :color="'primary'" :outline="false" size="13px"
                  v-on:receiveClick="handleConvert"/> -->

                  <Button_icon v-if="page_function == 'GoodsReceivedNote'" :icon="'add'" :border_radius="'30px;'" :flat="false" :font_color="'white'" :color="'#094161'" :outline="false"
                  v-on:receiveClick="handleConvertNew" class="menu_add" style="width:48px; height:48px;"/>
                </div>

                <!-- <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3" align="center">
                  <Button_icon :disable="ori_params.params.offset == 0 || showAddLoading" :icon="'chevron_left'" :border_radius="'17px;'" :flat="true" :font_color="'#928f8f'" :color="'white'" :outline="false" size="13px"
                  v-on:receiveClick="changePagination('back')" />
                </div> -->

                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4" align="center">
                  <Button_icon :disable="showNext || showAddLoading" :icon="'chevron_right'" :border_radius="'17px;'" :flat="true" :color="'white'" :outline="false" size="13px"
                  v-on:receiveClick="changePagination('next')" class="right_left_button primary_button_font"
                  :font_color="ori_params.params.offset + ori_params.params.limit >= filter.total_row ? '#928f8f' : '#094161'"/>
                  <!--:font_color="'#1E90FF'" :font_color="ori_params.params.offset + ori_params.params.limit >= filter.total_row ? '#928f8f' : '#1E90FF'" -->
                </div>
              </div>
            </div>

            <!-- <div class="row dialog_action1 items-center justify-center footer_left">
              <Button_icon v-if="page_function != 'GoodsReceivedNote'" :icon="'add'" :border_radius="'17px;'" :flat="false" :font_color="'white'" :color="'primary'" :outline="false" size="17px"
              v-on:receiveClick="handleShowCreatePurchaseOrder" />

              <Button_icon v-if="page_function == 'GoodsReceivedNote'" :icon="'add'" :border_radius="'17px;'" :flat="false" :font_color="'white'" :color="'primary'" :outline="false" size="17px"
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
    <q-card style="width: 700px; max-width: 80vw;text-align:center;margin-top: 5%;border-radius:8px">

      <q-card-section class="theme_color row items-center" style="padding: 8px 24px;border-bottom: 1px solid #a7bbcb;">
        <div class="text-h6">{{ $language('D0115') }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup :disable="showAddLoading"/>
      </q-card-section>

      <q-card-section style="padding: 32px 24px">
        <!-- <span class="q-ml-sm custom_selection_font">{{general_body}}</span> -->
        <span class="dialog_confirmation_question_font">{{ $language('C0001') }}</span>
      </q-card-section>

      <q-card-actions align="right" style="padding: 0px 24px 16px 24px">
        <q-btn flat :label="$language('D0116')" font_color="#29292A" color="#29292A" v-close-popup class="dialog_confirm_cancel_button"/>
        <q-btn flat :label="$language('D0117')" color="white" style="backgroundColor: #EF4444" class="dialog_confirm_print_button" @click="handleDeleteLine" />
      </q-card-actions>

      <q-inner-loading
        :showing="deleteLoading"
        color="primary"
      />
    </q-card>
  </q-dialog>
<!-- mobile filter -->
  <q-dialog v-model="filter_transmain" persistent :position="$q.screen.width > 1023 ? 'top' : 'standard'">
    <q-card style="width: 450px; max-width: 98vw; margin-top: 2%; border-radius:8px">
      <q-card-section v-if="$q.screen.width > 1023" class=" row theme_color header_top_mobile dialog_header" style="padding: 16px;padding: 0px;">
          <div class="text-subtitle1 header_text" style="margin-top: 5px;">{{ $language('D0126') }}<br></div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup :disable="showAddLoading || showAddLoading2"/>
      </q-card-section>

      <q-card-section v-if="$q.screen.width < 1024" class="theme_color row items-center header_top_mobile dialog_header" style="height:56px;padding: 16px 24px;border-bottom: 1px solid #A7BBCB;">
        <div class="font_filter_sort">{{ $language('D0126') }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup :disable="showAddLoading || showAddLoading2"/>
      </q-card-section>

      <q-card-section class="upload_container content_body_dialog">
        <q-form ref="save_edit_pochild_form" >
          <div class="row col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" style="padding: 16px">
            <!-- <div class="q-pr-lg q-pl-lg"> -->
              <div class="row col-12" style="gap:10px;">
                
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <div class="row">
                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                              <span class="dialog_font">{{ $language('D0129') }}</span>
                            </div>
                            <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                              <Radio class="radio_font" size="xs" :disable="false" v-on:receiveChange="handleChange" v-model="filter.sort_type" :options="sort_type_options"  />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  <div style="border-top: 1px solid #BFBFBF; width: 100%;" />
                  
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" style="padding-bottom:8px">
                    <span class="dialog_font">CATEGORY</span>
                  </div>
                </div>
                  <div class="row col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" style="gap:16px">
                    
                    <div class="row col-12" style=" gap:16px">
                              <!-- <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                                <span class="dialog_font">{{ $language('D0030') }}</span>
                              </div> -->
                              <div class="col-12"><!-- refno -->
                                <InputLabel
                                class="custom-input"
                                :icon_append="'search'"
                                :autofocusclick="true"
                                :label= "$language('D0030') "
                                :no_label="false"
                                :readonly="false"
                                v-on:change="handleChange"
                                v-model="search"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />

                                <!-- <InputLabel
                                :icon_append="'search'"
                                :readonly="false"
                                :no_label="true"
                                :text="$language('D0030')"
                                v-model:pass_value="search"
                                :dbComponentBehavior="{ ...dbComponentBehavior.text, label: $language('D0030') }"
                                v-on:receiveChange="handleChangeOptions"
                                /> -->
                              </div>
                            
                          

                              <!-- <div class="offset-xs-1 col-xs-10 col-sm-10 col-md-6 col-lg-6 col-xl-6">
                                <div class="row">
                                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
                                    <div class="row"> -->
                                      <!-- <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                                        <span class="dialog_font">{{ $language('D0128') }}</span>
                                      </div> -->
                                      <div class="col-12"><!-- sortby -->
                                        <Select
                                        class="custom-input custom-select"
                                        :readonly="false"
                                        :no_label="false"
                                        :label= "$language('D0128') "
                                        v-model="filter.sort_by"
                                        :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.sort_by : oridbComponentBehavior.select"
                                        :options="sort_by_options"
                                        v-on:receiveChange="handleChange"
                                        />
                                      </div>
                                    <!-- </div>
                                  </div>
                                </div>
                              </div> -->

                      
                      <!-- <div class="offset-xs-1 col-xs-10 col-sm-10 col-md-6 col-lg-6 col-xl-6">
                        <div class="row">
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
                            <div class="row">
                              <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                                <span class="dialog_font">{{ $language('D0025') }}</span>
                              </div> -->
                              <div class="col-12"><!-- supplier -->
                                <SelectFilter
                              
                                :readonly="false"
                                :no_label="false"
                                :label= "$language('D0025') "
                                v-model:pass_value="supcus"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.select"
                                :options="supcus_options"
                                v-on:receiveChange="handleChange"
                                />
                              </div>
                            <!-- </div>
                          </div>
                        </div>
                      </div> -->

                      <!-- <div class="offset-xs-1 col-xs-10 col-sm-10 col-md-6 col-lg-6 col-xl-6">
                        <div class="row">
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
                            <div class="row">
                              <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                                <span class="dialog_font">{{ $language('D0127') }}</span>
                              </div> -->
                              <div class="col-12"><!-- sortby -->
                                <Select
                                class="custom-input custom-select"
                                :readonly="false"
                                :no_label="false"
                                :label= "$language('D0127')"
                                v-model="filter.pagination"
                                :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.sort_by : oridbComponentBehavior.select"
                                :options="filter.pagination_options"
                                v-on:receiveChange="handleChange"
                                />
                              </div>
                            <!-- </div>
                          </div>
                        </div>
                      </div> -->
                    </div>
                  </div>
                    
                    
                  
                
              
            <!-- </div> -->
          </div>
        </q-form>
      </q-card-section>

      <q-card-actions class="dialog_action3" style="padding: 0px 16px 16px 16px" > <!--style="justify-content:center; align-items:center; " -->
          <div class="row col-12">
            <Button_icon :readonly="false" :flat="true" :font_color="'white'" :color="'#094161'" :text="$language('D0130')" :outline="false" size="16px"
            v-on:receiveClick="handleFilter()" class="full-width font_filter_button primary_button_font"/>
          </div>
      </q-card-actions>

      <q-inner-loading
        :showing="showAddLoading"
        color="primary"
      />
    </q-card>
  </q-dialog>

  <q-dialog v-model="receiving_methods" persistent :position="$q.screen.width > 599 ? 'top' : 'bottom'">
    <q-card style="text-align:left;margin-top: 5%;">
      <q-card-section class="header_top_mobile">
        <!-- <Button_icon :disable="showAddLoading" :big_round="true" :flat="true" :font_color="'#928f8f'" :color="'rgba(255, 255, 255, 0.5)'" :icon="'arrow_back_ios'" :outline="true" size="12px" class="custom_back_button" @click="back()" /> -->
      <div class="text-right">
        <q-btn icon="close" flat round dense v-close-popup :disable="showAddLoading || showAddLoading2"/>
      </div>

      </q-card-section>

      <q-card-section class="q-pt-none card_sides ">
        <div class="row justify-center items-center q-mb-md" style="width: 100%; height: 60px;">
        <Button_icon :readonly="false" :flat="true" :font_color="'white'" :color="'#1E90FF'" :text="$language('D0215')" :outline="false" size="16px"
        v-on:receiveClick="handleRedirect('SimpleReceive');" class="justify-center items-center dialog_detail_add_button"/><!--SAVE-->
        </div>

        <Button_icon v-if="item_listing_receiving" style="width: 100%;" :readonly="false" :flat="true" :font_color="'white'" :color="'#094161'" :text="'(x Excel) Item Listing Receive'" :outline="false" size="15px"
        v-on:receiveClick="handleRedirect('ItemListingReceive')"/>

      </q-card-section>

      <q-inner-loading
        :showing="showAddLoading"
        color="primary"
      />
    </q-card>

  </q-dialog>
</template>

<script>
import Input from 'src/components/ERP/Base/Input'
import Badge from 'src/components/ERP/Base/Badge'
import Chip from 'src/components/ERP/Base/Chip'
import LabelInputHorizontal from 'src/components/ERP/General/LabelInputHorizontal'
import InputLabel from 'src/components/ERP/Base/InputLabel'
import LabelSelectFilterHorizontal from 'src/components/ERP/General/LabelSelectFilterHorizontal'
import PurchaseTable from 'src/components/ERP/Purchase/PurchaseTable'
import Title from 'src/components/ERP/General/Title'
import LabelSelectHorizontal from 'src/components/ERP/General/LabelSelectHorizontal'
import LabelMultiSelectHorizontal from 'src/components/ERP/General/LabelMultiSelectHorizontal'
import LabelDatepickerHorizontal from 'src/components/ERP/General/LabelDatepickerHorizontal'
import Button_icon from 'src/components/ERP/Base/Button_icon'
import { Notify } from "quasar";
import Select from 'src/components/ERP/Base/Select'
import Radio from 'src/components/ERP/Base/Radio';
import SelectFilter from 'src/components/ERP/Base/SelectFilter'
import { Loading, QSpinnerTail} from 'quasar'
export default{
  data(){
    return{
      selectedCardIndex: null,
      expanded: false,
      session_outlet_guid: sessionStorage.getItem("session_outlet_guid") != "" && sessionStorage.getItem("session_outlet_guid") != "null" && sessionStorage.getItem("session_outlet_guid") != null ? sessionStorage.getItem("session_outlet_guid") : [],
      filter_status: false,
      search: "",
      supcus: '',
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
          label: this.$language('D0131'),
          value: "Asc"
        },
        {
          label: this.$language('D0132'),
          value: "Desc"
        }
      ],
      sort_by_options: [],
      filter: {
        pagination: 5,
      },
      outlet_options: [],
      outlet_guid: [],
      select_options: [],
      filter_options: [],
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
      showAddLoading: false,
      supcus_options: [],
      module: '',
      receiving_methods: false,
      item_listing_receiving: false,
      preference: sessionStorage.getItem("preference") != "" && sessionStorage.getItem("preference") != "null" && sessionStorage.getItem("preference") != null ? JSON.parse(sessionStorage.getItem("preference")) : [],
    }
  },
  props: ['miniState'],
  components:{
      Badge,
      Input,
      LabelInputHorizontal,
      LabelSelectFilterHorizontal,
      PurchaseTable,
      Title,
      Chip,
      InputLabel,
      // LabelSelectHorizontal,
      // LabelMultiSelectHorizontal,
      // LabelDatepickerHorizontal,
      Button_icon,
      Select,
      Radio,
      SelectFilter,
  },
  computed: {
    dbComponentBehavior() {
      return this.$store.getters['dbComponentBehavior/byLanguage']('erp')
    },
  },
  methods: {
    performSearch() {
      // This method will be triggered when the search icon is clicked
      if (this.search) {
        // Call handleChangeOptions with the current search input
        this.handleChangeOptions(this.search);
      } else {
        console.log('Please enter a search term.');
      }
    },
    selectCard(index) {
      this.selectedCardIndex = this.selectedCardIndex === index ? null : index;
    },
    handleRedirect(type)
    {
      if(type == "SimpleReceive")
      {
        this.$router.push("SimpleReceive");
      }
      else if(type == "ItemListingReceive")
      {
        this.$router.push("itemlistingreceive");
      }

    },
    handleConvertNew()
    {
      this.receiving_methods = true;
    },
      handleItemListingReceive()
      {
        var module = this.module != '' ? `/${this.module}` : '';
        this.$router.push(module+"/purchase/itemlistingreceive");
      },
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
          this.showNotify('negative', $language('C0003'))
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
          user: this.user_name,
          language: this.language
        }

        var data = {};

        if(this.page_function == 'PurchaseOrder')
        {

          await this.$store.dispatch('purchase/trigger_delete_pomain', payload).then(() => {
            data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_pomain_status']));
          });
        }
        else if(this.page_function == 'GoodsReceivedNote')
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
        else if(this.page_function == 'InterbranchTransfer')
        {
          payload.language = this.language;

          await this.$store.dispatch('purchase/trigger_delete_ibt', payload).then(() => {
            data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_ibt_status']));
          });
        }

        if(data.status == "success")
        {
          this.table_function(this.ori_params);
          this.showNotify("positive", $language('C0004'));
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
          this.delete_confirmation = false;
          this.deleteLoading = false;
        }
      },
      handleDelete(payload){
        this.active_delete_json = payload;
        this.delete_confirmation = true;
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
     async handlePrint(payload){
        // this.$router.push({
        //   name: "Print",
        //   query: {
        //     from: 'Header',
        //     type: (this.page_function == 'PurchaseOrder' ? 'PO' : this.page_function == 'GoodsReceivedNote' ? 'GR' : this.page_function == 'SalesOrder' ? 'SO' : this.page_function == 'SalesInvoice' ? 'SI' : 'IS'),
        //     id: newVal.transmain_guid
        //   }
        // });
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
      handleConvert(newVal){
        if(this.page_function == 'GoodsReceivedNote')
        {
          this.$router.push("SimpleReceive");
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
      handleShowCreatePurchaseOrder(){
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
        this.showAddLoading = true;

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
          var payload = ori_payload.params
          var offset = payload.offset;
          payload.skip = offset;
          payload.RefNo = this.search;
          payload.language = this.language;

          var mobile = this.$q.screen.width < 600;
          if(mobile)
          {
            payload.limit = this.filter.pagination;
          }

          if(this.page_function == 'PurchaseOrder' || this.page_function == 'InterbranchTransfer')
          {
            payload.SCode = this.supcus;

            if(payload.ordering == "")
            {
              payload.ordering = "-laststamp"
            }
            else if(payload.ordering == "Supplier")
            {
              payload.ordering = "SCode"
            }
            else if(payload.ordering == "-Supplier")
            {
              payload.ordering = "-SCode"
            }
          }
          else if(this.page_function == 'GoodsReceivedNote' || this.page_function == 'DebitNote' || this.page_function == 'CreditNote')
          {
            payload.Code = this.supcus;

            if(payload.ordering == "")
            {
              payload.ordering = "-LastStamp"
            }
            else if(payload.ordering == "Supplier")
            {
              payload.ordering = "Code"
            }
            else if(payload.ordering == "-Supplier")
            {
              payload.ordering = "-Code"
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

          var table_column_po = [
              {
                  name: 'action',
                  required: true,
                  label: this.$language('D0028'),
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
                  name: 'DocumentStatus',
                  required: true,
                  label: this.$language('D0029'),
                  align: 'left',
                  sortable: false,
                  field: 'DocumentStatus',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'RefNo',
                  required: true,
                  label: this.$language('D0030'),
                  align: 'center',
                  sortable: true,
                  field: 'RefNo',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'loc_group',
                  required: true,
                  label: this.$language('D0026'),
                  align: 'left',
                  sortable: true,
                  field: 'loc_group',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'PODate',
                  required: true,
                  label: this.$language('D0043'),
                  align: 'left',
                  sortable: true,
                  field: 'PODate',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'DeliverDate',
                  required: true,
                  label: this.$language('D0031'),
                  align: 'left',
                  sortable: true,
                  field: 'DeliverDate',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'expiry_date',
                  required: true,
                  label: this.$language('D0050'),
                  align: 'left',
                  sortable: true,
                  field: 'expiry_date',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'Supplier',
                  required: true,
                  label: this.$language('D0025'),
                  align: 'left',
                  sortable: true,
                  field: 'Supplier',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  classes: 'supplier-column'  
              },
              // {
              //     name: 'SName',
              //     required: true,
              //     label: 'Supplier Name',
              //     align: 'left',
              //     sortable: true,
              //     field: 'SName',
              //     format_child: '',
              //     tooltip: '',
              //     headerStyle: 'text-align: center;'
              // },
              {
                  name: 'Total',
                  required: true,
                  label: this.$language('D0032'),
                  align: 'right',
                  sortable: true,
                  field: 'Total',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
              },
              // {
              //     name: 'Location',
              //     required: true,
              //     label: 'Location',
              //     align: 'left',
              //     sortable: true,
              //     field: 'Location',
              //     format_child: '',
              //     tooltip: '',
              //     headerStyle: 'text-align: center;'
              // },
              // {
              //     name: 'Remark',
              //     required: true,
              //     label: 'Remark',
              //     align: 'left',
              //     sortable: true,
              //     field: 'Remark',
              //     format_child: '',
              //     tooltip: '',
              //     headerStyle: 'text-align: center;'
              // },
              {
                  name: 'IssueStamp',
                  required: true,
                  label: this.$language('D0033'),
                  align: 'left',
                  sortable: true,
                  field: 'IssueStamp',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'IssuedBy',
                  required: true,
                  label: this.$language('D0045'),
                  align: 'left',
                  sortable: true,
                  field: 'IssuedBy',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'laststamp',
                  required: true,
                  label: this.$language('D0034'),
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

          var table_column_gr = [
              {
                  name: 'action',
                  required: true,
                  label: this.$language('D0028'),
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
                  name: 'DocumentStatus',
                  required: true,
                  label: this.$language('D0029'),
                  align: 'left',
                  sortable: false,
                  field: 'DocumentStatus',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'RefNo',
                  required: true,
                  label: this.$language('D0030'),
                  align: 'center',
                  sortable: true,
                  field: 'RefNo',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'loc_group',
                  required: true,
                  label: this.$language('D0026'),
                  align: 'left',
                  sortable: true,
                  field: 'loc_group',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'InvNo',
                  required: true,
                  label: this.$language('D0035'),
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
                  label: this.$language('D0036'),
                  align: 'left',
                  sortable: true,
                  field: 'DONo',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'GRDate',
                  required: true,
                  label: this.$language('D0037'),
                  align: 'left',
                  sortable: true,
                  field: 'GRDate',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'DocDate',
                  required: true,
                  label: this.$language('D0038'),
                  align: 'left',
                  sortable: true,
                  field: 'DocDate',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'Supplier',
                  required: true,
                  label: this.$language('D0025'),
                  align: 'left',
                  sortable: true,
                  field: 'Supplier',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  classes: 'supplier-column'
              },
              {
                  name: 'Total',
                  required: true,
                  label: this.$language('D0032'),
                  align: 'right',
                  sortable: true,
                  field: 'Total',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
              },
              {
                  name: 'IssueStamp',
                  required: true,
                  label: this.$language('D0033'),
                  align: 'left',
                  sortable: true,
                  field: 'IssueStamp',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'Receivedby',
                  required: true,
                  label: this.$language('D0045'),
                  align: 'left',
                  sortable: true,
                  field: 'Receivedby',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              // {
              //     name: 'CalcCost',
              //     required: true,
              //     label: 'CalcCost',
              //     align: 'center',
              //     sortable: true,
              //     field: 'CalcCost',
              //     format_child: '',
              //     tooltip: '',
              //     headerStyle: 'text-align: center;'
              // },
              // {
              //     name: 'consign',
              //     required: true,
              //     label: 'consign',
              //     align: 'center',
              //     sortable: true,
              //     field: 'consign',
              //     format_child: '',
              //     tooltip: '',
              //     headerStyle: 'text-align: center;'
              // },
              // {
              //     name: 'InvRefno',
              //     required: true,
              //     label: 'InvRefno',
              //     align: 'left',
              //     sortable: true,
              //     field: 'InvRefno',
              //     format_child: '',
              //     tooltip: '',
              //     headerStyle: 'text-align: center;'
              // },              {
              //     name: 'SubDeptCode',
              //     required: true,
              //     label: 'SubDeptCode',
              //     align: 'left',
              //     sortable: true,
              //     field: 'SubDeptCode',
              //     format_child: '',
              //     tooltip: '',
              //     headerStyle: 'text-align: center;'
              // },
              // {
              //     name: 'Remark',
              //     required: true,
              //     label: 'Remark',
              //     align: 'left',
              //     sortable: true,
              //     field: 'Remark',
              //     format_child: '',
              //     tooltip: '',
              //     headerStyle: 'text-align: center;'
              // },
              // {
              //     name: 'Location',
              //     required: true,
              //     label: 'Location',
              //     align: 'left',
              //     sortable: true,
              //     field: 'Location',
              //     format_child: '',
              //     tooltip: '',
              //     headerStyle: 'text-align: center;'
              // },
              // {
              //     name: 'Receivedby',
              //     required: true,
              //     label: 'Received by',
              //     align: 'left',
              //     sortable: true,
              //     field: 'Receivedby',
              //     format_child: '',
              //     tooltip: '',
              //     headerStyle: 'text-align: center;'
              // },
              // {
              //     name: 'postby',
              //     required: true,
              //     label: 'Posted by',
              //     align: 'left',
              //     sortable: true,
              //     field: 'postby',
              //     format_child: '',
              //     tooltip: '',
              //     headerStyle: 'text-align: center;'
              // },
              // {
              //     name: 'postdatetime',
              //     required: true,
              //     label: 'Posted on',
              //     align: 'left',
              //     sortable: true,
              //     field: 'postdatetime',
              //     format_child: '',
              //     tooltip: '',
              //     headerStyle: 'text-align: center;'
              // },
              {
                  name: 'LastStamp',
                  required: true,
                  label: this.$language('D0034'),
                  align: 'left',
                  sortable: true,
                  field: 'LastStamp',
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

          var table_column_ibt = [
              {
                  name: 'action',
                  required: true,
                  label: this.$language('D0028'),
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
                  label: this.$language('D0030'),
                  align: 'left',
                  sortable: true,
                  field: 'RefNo',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'PODate',
                  required: true,
                  label: this.$language('D0043'),
                  align: 'left',
                  sortable: true,
                  field: 'PODate',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'DeliverDate',
                  required: true,
                  label: this.$language('D0031'),
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
                  label: this.$language('D0032'),
                  align: 'right',
                  sortable: true,
                  field: 'Total',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
              },
              {
                  name: 'SCode',
                  required: true,
                  label: this.page_function == 'PurchaseOrder' || this.page_function == 'GoodsReceivedNote' ? this.$language('D0133') : this.$language('D0134'),
                  align: 'left',
                  sortable: true,
                  field: 'SCode',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'SName',
                  required: true,
                  label: this.page_function == 'PurchaseOrder' || this.page_function == 'GoodsReceivedNote' ? this.$language('D0135') : this.$language('D0136'),
                  align: 'left',
                  sortable: true,
                  field: 'SName',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  classes: 'supplier-column'
              },
              {
                  name: 'Location',
                  required: true,
                  label: this.$language('D0090'),
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
                  label: this.$language('D0055'),
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
                  label: this.$language('D0034'),
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

          var table_column_dn = [
              {
                  name: 'action',
                  required: true,
                  label: this.$language('D0028'),
                  align: 'center',
                  sortable: false,
                  field: 'action',
                  format_child: '',
                  tooltip: '',
                  "headerStyle": "max-width: 70px; text-align: center;",
              },
              {
                  name: 'DocumentStatus',
                  required: true,
                  label: this.$language('D0029'),
                  align: 'left',
                  sortable: false,
                  field: 'DocumentStatus',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
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
                  label: this.$language('D0030'),
                  align: 'left',
                  sortable: true,
                  field: 'RefNo',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'SubDeptCode',
                  required: true,
                  label: this.$language('D0137'),
                  align: 'left',
                  sortable: true,
                  field: 'SubDeptCode',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'DocDate',
                  required: true,
                  label: this.$language('D0087'),
                  align: 'left',
                  sortable: true,
                  field: 'DocDate',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'Location',
                  required: true,
                  label: this.$language('D0090'),
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
                  label: this.$language('D0138'),
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
                  label: this.$language('D0133'),
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
                  label: this.$language('D0135'),
                  align: 'left',
                  sortable: true,
                  field: 'Name',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  class:'supplier-column'
              },
              {
                  name: 'DocNo',
                  required: true,
                  label: this.$language('D0086'),
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
                  label: this.$language('D0139'),
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
                  label: this.$language('D0089'),
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
                  label: this.$language('D0055'),
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
                  label: this.$language('D0045'),
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
                  label: this.$language('D0140'),
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
                  label: this.$language('D0141'),
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
              {
                  name: 'LastStamp',
                  required: true,
                  label: this.$language('D0034'),
                  align: 'left',
                  sortable: true,
                  field: 'LastStamp',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
          ];

          var table_column_cn = [
              {
                  name: 'action',
                  required: true,
                  label: this.$language('D0028'),
                  align: 'center',
                  sortable: false,
                  field: 'action',
                  format_child: '',
                  tooltip: '',
                  "headerStyle": "max-width: 70px; text-align: center;",
              },
              {
                  name: 'DocumentStatus',
                  required: true,
                  label: this.$language('D0029'),
                  align: 'left',
                  sortable: false,
                  field: 'DocumentStatus',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'RefNo',
                  required: true,
                  label: this.$language('D0030'),
                  align: 'left',
                  sortable: true,
                  field: 'RefNo',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'subdeptcode',
                  required: true,
                  label: this.$language('D0137'),
                  align: 'left',
                  sortable: true,
                  field: 'subdeptcode',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'DocDate',
                  required: true,
                  label: this.$language('D0087'),
                  align: 'left',
                  sortable: true,
                  field: 'DocDate',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'Location',
                  required: true,
                  label: this.$language('D0090'),
                  align: 'left',
                  sortable: true,
                  field: 'Location',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'amount',
                  required: true,
                  label: this.$language('D0138'),
                  align: 'right',
                  sortable: true,
                  field: 'amount',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;',
                  sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
              },
              {
                  name: 'Code',
                  required: true,
                  label: this.$language('D0133'),
                  align: 'right',
                  sortable: true,
                  field: 'Code',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'Name',
                  required: true,
                  label: this.$language('D0135'),
                  align: 'left',
                  sortable: true,
                  field: 'Name',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
              {
                  name: 'DocNo',
                  required: true,
                  label: this.$language('D0086'),
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
                  label: 'DN#', //this.$language('D0227')
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
                  label: 'DN Date', //this.$language('D0226')
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
                  label: this.$language('D0055'),
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
                  label: this.$language('D0045'),
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
                  label: this.$language('D0140'),
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
                  label: this.$language('D0141'),
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
              {
                  name: 'LastStamp',
                  required: true,
                  label: this.$language('D0034'),
                  align: 'left',
                  sortable: true,
                  field: 'LastStamp',
                  format_child: '',
                  tooltip: '',
                  headerStyle: 'text-align: center;'
              },
          ];

          this.table_column = this.page_function == 'PurchaseOrder' ? table_column_po : this.page_function == 'GoodsReceivedNote' ? table_column_gr : this.page_function == 'InterbranchTransfer' ? table_column_ibt :  this.page_function == 'DebitNote'? table_column_dn : table_column_cn;

          var data = {};

          if(this.page_function == 'PurchaseOrder')
          {
            await this.$store.dispatch('purchase/trigger_get_pomain', payload).then(() => {
                data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_pomain']));
            });
          }
          else if(this.page_function == 'GoodsReceivedNote')
          {
            await this.$store.dispatch('purchase/trigger_get_grmain', payload).then(() => {
                data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_grmain']));
            });
          }
          else if(this.page_function == 'DebitNote')
          {
            // await this.$store.dispatch('purchase/trigger_get_dn', payload).then(() => {
            //     data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_dn']));
            // });

            await this.$store.dispatch('purchase/trigger_get_dn_v2', payload).then(() => {
                data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_dn_v2']));
            });
          }
          else if(this.page_function == 'InterbranchTransfer')
          {
            await this.$store.dispatch('purchase/trigger_get_ibt', payload).then(() => {
                data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_ibt']));
            });
          }else if(this.page_function == 'CreditNote')
          {
            await this.$store.dispatch('purchase/trigger_get_cn', payload).then(() => {
                data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_cn']));
            });
          }

          if(!data.data)
          {
            alert('Network Error');
            this.table_data =
            {
              "data": {
                "count": 0,
                "next": null,
                "previous": null,
                "results": []
              }
            };

            this.showAddLoading = false;
            return;
          }
            var results = data.data.detail;

            for(var index in results)
            {
              var obj = results[index];
              if(this.page_function == 'PurchaseOrder' || this.page_function == 'InterbranchTransfer')
              {
                obj.Supplier = obj.SCode + ' - ' + obj.SName;
                obj.DocumentStatus = obj.send == 1 ? 'Send' : obj.approved == 1 ? 'Approved' : obj.rejected == 1 ? 'Rejected' : obj.BillStatus == 1 ? 'Posted' : obj.unpost == 1 ? 'Unpost' : obj.cancel == 1 ? 'Cancelled' : obj.Amendment == 1 ? 'Amended' : obj.Completed == 1 ? 'Completed' : 'New';
              }
              else if(this.page_function == 'GoodsReceivedNote')
              {
                obj.Supplier = obj.Code + ' - ' + obj.Name;
                obj.DocumentStatus = obj.BillStatus == 1 ? 'Posted' : obj.unpostby != null && obj.unpostby != 'null' ? 'Unpost' : 'New';
              }
              else if(this.page_function == 'DebitNote'){
               // obj.Supplier = obj.SCode + ' - ' + obj.SName;
                obj.DocumentStatus = obj.send == 1 ? 'Send' : obj.approved == 1 ? 'Approved' : obj.rejected == 1 ? 'Rejected' : obj.BillStatus == 1 ? 'Posted' : obj.unpost == 1 ? 'Unpost' : obj.cancel == 1 ? 'Cancelled' : obj.Amendment == 1 ? 'Amended' : obj.Completed == 1 ? 'Completed' : 'New';
              }
              else if(this.page_function == 'CreditNote'){
               // obj.Supplier = obj.SCode + ' - ' + obj.SName;
                obj.DocumentStatus = obj.send == 1 ? 'Send' : obj.approved == 1 ? 'Approved' : obj.rejected == 1 ? 'Rejected' : obj.BillStatus == 1 ? 'Posted' : obj.unpost == 1 ? 'Unpost' : obj.cancel == 1 ? 'Cancelled' : obj.Amendment == 1 ? 'Amended' : obj.Completed == 1 ? 'Completed' : 'New';
                //  obj.Code = obj.Code.substring(2);

              }
              obj.Total = this.formatAmount(obj.Total, "$");
              obj.Amount = this.formatAmount(obj.Amount, "$");
            }

            this.table_data =
            {
              "data": {
                "count": data.data.total_row,
                "next": null,
                "previous": null,
                "results": data.data.detail
              }
            };

            this.results = data.data.detail;
          // }
          // else
          // {
          //   var results = data.data;

          //   for(var index in results)
          //   {
          //     var obj = results[index];

          //     obj.Total = this.formatAmount(obj.Total, "$");
          //     obj.Amount = this.formatAmount(obj.Amount, "$");
          //   }

          //   this.table_data =
          //   {
          //     "data": {
          //       "count": 20,
          //       "next": null,
          //       "previous": null,
          //       "results": data.response
          //     }
          //   };

          //   this.results = data.data;
          // }

          // console.log(this.table_data.data.results.length)
          // console.log(this.ori_params.params)

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
              // timeout: 1000,
              position: 'center',
              html: true,
              actions: [
                { label: this.$language('D0117'), color: 'white', handler: () => { } }//OK
              ]
          })
      },
//new method added for chip
      handleNavigate (type) {
        if(type == "Outlet")
      {
        this.$router.push("/erp/location/outletlocation");
        // this.$router.push({ name: "Create" + this.page_function });
      }
      else if(type == "ItemListingReceive")
      {
        this.$router.push("itemlistingreceive");
      }
      },
      getBadgeColor(status) {
            switch (status) {
              case 'Posted':
                return 'green-2';
              case 'Unpost':
                return 'red-2';
              case 'New':
                return 'light-blue-1';
              case 'Completed':
                return 'light-green-2';
              case 'Cancelled':
                return 'blue-grey-2';
              case 'Send':
                return 'orange-1';
              case 'Approved':
                return 'teal-2';
              case 'Rejected':
                return 'brown-2';
              case 'Amended':
                return 'light-blue-2';
              default:
                return 'black'; // default color if status doesn't match any case
            }
    },
          getBadgeTextColor(status) {
            switch (status) {
              case 'Posted':
                return 'green-10';
              case 'Unpost':
                return 'red-13';
              case 'New':
                return 'blue-8';
              case 'Completed':
                return 'light-green-9';
              case 'Cancelled':
                return 'blue-grey-8';
              case 'Send':
                return 'orange-8';
              case 'Approved':
                return 'teal-8';
              case 'Rejected':
                return 'brown-9';
              case 'Amended':
                return 'blue-8';                 
              default:
                return 'white'; // default text color if status doesn't match any case
            }
          },
          
  
  
  },

  async created() {
    var sort_by_options = [];
  //   setTimeout(async()=>{
  //     var click = document.getElementById("detail_show")
  // //  console.log(click)
  //   click.addEventListener("click", function(e){
  //     e.stopPropagation();
  //   });
  //   },1000)

    if(this.page_function == 'PurchaseOrder')
    {

      sort_by_options = [
        {
          label: this.$language('D0057'),
          value: 'BillStatus'
        },
        {
          label: this.$language('D0030'),
          value: 'RefNo'
        },
        {
          label: this.$language('D0043'),
          value: 'PODate'
        },
        {
          label: this.$language('D0031'),
          value: 'DeliverDate'
        },
        {
          label: this.$language('D0032'),
          value: 'Total'
        },
        {
          label: this.$language('D0133'),
          value: 'SCode'
        },
        {
          label: this.$language('D0135'),
          value: 'SName'
        },
        {
          label: this.$language('D0090'),
          value: 'Location'
        },
        {
          label: this.$language('D0055'),
          value: 'Remark'
        },
        {
          label: this.$language('D0034'),
          value: this.page_function == 'PurchaseOrder' ? 'laststamp' : 'LastStamp'
        },
      ]
    }
    else if(this.page_function == 'GoodsReceivedNote')
    {
      sort_by_options = [
        {
          label: this.$language('D0030'),
          value: 'RefNo'
        },
        {
          label: this.$language('D0142'),
          value: 'GRDate'
        },
        {
          label: this.$language('D0087'),
          value: 'DocDate'
        },
        {
          label: this.$language('D0032'),
          value: 'Total'
        },
        {
          label: this.$language('D0133'),
          value: 'Code'
        },
        {
          label: this.$language('D0135'),
          value: 'Name'
        },
        {
          label: this.$language('D0035'),
          value: 'InvNo'
        },
        {
          label: this.$language('D0036'),
          value: 'DONo'
        },
        {
          label: this.$language('D0143'),
          value: 'CalcCost'
        },
        {
          label: this.$language('D0082'),
          value: 'consign'
        },
        {
          label: this.$language('D0144'),
          value: 'InvRefno'
        },
        {
          label: this.$language('D0137'),
          value: 'SubDeptCode'
        },
        {
          label: this.$language('D0055'),//'Remark'
          value: 'Remark'
        },
        {
          label: this.$language('D0090'),//'Location'
          value: 'Location'
        },
        {
          label: this.$language('D0072'),//'Received by'
          value: 'Receivedby'
        },
        {
          label: this.$language('D0140'),//'Posted by'
          value: 'postby'
        },
        {
          label: this.$language('D0141'),//'Posted on'
          value: 'postdatetime'
        },
        {
          label: this.$language('D0034'),//'Last Stamp'
          value: 'LastStamp'
        }
      ]
    }
    else if(this.page_function == 'DebitNote')
    {
      sort_by_options = [
        {
          label: this.$language('D0030'),//'RefNo'
          value: 'RefNo'
        },
        {
          label: this.$language('D0137'),//'SubDeptCode'
          value: 'SubDeptCode'
        },
        {
          label: this.$language('D0087'),//'Doc Date'
          value: 'DocDate'
        },
        {
          label: this.$language('D0090'),//'Location'
          value: 'Location'
        },
        {
          label: this.$language('D0138'),//'Amount'
          value: 'Amount'
        },
        {
          label: this.$language('D0090'),//'Supplier Code'
          value: 'Code'
        },
        {
          label: this.$language('D0135'),//'Supplier Name'
          value: 'Name'
        },
        {
          label: this.$language('D0086'),//'Doc No'
          value: 'DocNo'
        },
        {
          label: this.$language('D0139'),//'CN #'
          value: 'sup_cn_no'
        },
        {
          label: this.$language('D0089'),//'CN Date'
          value: 'sup_cn_date'
        },
        {
          label: this.$language('D0055'),//'Remark'
          value: 'Remark'
        },
        {
          label: this.$language('D0045'),//'Issued by'
          value: 'Issued by'
        },
        {
          label: this.$language('D0140'),//'Posted by'
          value: 'postby'
        },
        {
          label: this.$language('D0141'),//'Posted on'
          value: 'postdatetime'
        },
        {
          label: this.$language('D0034'),//'Last Stamp'
          value: 'LastStamp'
        }
      ]
    }
    else if(this.page_function == 'InterbranchTransfer')
    {
      sort_by_options = [
        {
          label: this.$language('D0057'),//'Posted'
          value: 'BillStatus'
        },
        {
          label: this.$language('D0030'),//'RefNo'
          value: 'RefNo'
        },
        {
          label: this.$language('D0043'),//'P/O Date'
          value: 'PODate'
        },
        {
          label: this.$language('D0031'),//'Delv Date'
          value: 'DeliverDate'
        },
        {
          label: this.$language('D0032'),//'Total Amount'
          value: 'Total'
        },
        {
          label: this.$language('D0133'),//'Supplier Code'
          value: 'SCode'
        },
        {
          label: this.$language('D0135'),//'Supplier Name'
          value: 'SName'
        },
        {
          label: this.$language('D0090'),//'Location'
          value: 'Location'
        },
        {
          label: this.$language('D0055'),//'Remark'
          value: 'Remark'
        },
        {
          label: this.$language('D0034'),//'Last Stamp'
          value: this.page_function == 'InterbramchTransfer' ? 'laststamp' : 'LastStamp'
        },
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
        type:'S',
        // type: this.page_function == 'CreditNote' ? 'C' : 'S',
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
  },
  async mounted()
  {
    console.log('in');
    console.log(this.$language('D0001'));

    this.module = this.$global_config.module;

    var filter_item_listing_receiving = this.preference.filter((entry)=>{
      return entry.module == 'item_listing_receiving';
    });

    this.item_listing_receiving = filter_item_listing_receiving.length > 0 ? (filter_item_listing_receiving[0].enable == 1 ? true : false) : false;

  },
  watch: {
      miniState(newVal) {
        this.miniState_main = newVal;
      }
  },
}

</script>

<style scoped>
.separator-style {
  border-top: 2px solid #943a3a !important;
  width: 100%;
}
.input_icon_custom >>> .q-field__append {
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.input_icon_custom >>> .q-field__append .q-icon {
  background: none;
  transition: background-color 0.3s ease;
}

.input_icon_custom >>> .q-field__append .q-icon:hover {
  background-color: rgba(132, 132, 132, 0.5);
  color: white;
  border-radius: 50%; /* optional: to make the background round */
  transition: background-color 0.3s ease;
}
.dialog_action1
{
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 320px; /* 55%; Adjust the desired width */
  height: 60px; /* 40px; Adjust the desired height */
  padding: 8px 32px;
  justify-content: center;
  align-items: center;
  border-radius: 24px;
  background-color: white;
  box-shadow: 0px 0px 11px 0px rgba(0, 0, 0, 0.40);
}
.dialog_action3 {
  /* display: flex;
  justify-content: center;
  align-items: center; */
}
.font_filter_button {
  display: inline-block;
}
.header_text
{
  padding-left: 16px;
  padding-right: 16px;
  font-weight: bold;
}

/*hide due to new button dropdown want to show arrow desmond*/
/* * >>> .q-btn-dropdown__arrow
{
  display: none;
} */

.card_design
{
  /* height: 120px; */
  background-color: white;
  color:black;
  padding: 16px;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.30) !important;

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
    padding: 24px;
    /* padding-top: 0px; */
}
.button_container {
  padding-left: 24px;
  padding-right: 24px;
}

.card_section {
  background: #F4F7FE;
}
.card_section_two
{
    /* margin-top: 10px; */
}

@media all and (min-width: 600px) {
  .card_section_second
  {
      /* padding-top: 8px; */
      padding-left:24px;
      padding-right:24px;
      padding-bottom:24px;
     
  }
}

@media all and (max-width: 599px) {
  .no-scroll {
    overflow: hidden;
  }
  .card_section_second
  {
      padding: 10px;
  }
}
 *>>>.q-separator--horizontal {
    display: none;
    height: 0px;
 }
.card_section_second_content
{
    border: 2px solid #ababab;
    /* height: 60vh; */
    min-height: 60vh;
    /* overflow-y: scroll; */
    padding: 10px;
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
    border-radius: 3px;
    justify-content: center;
    /* align-items: center; */
    
    /* padding: 0px !important; */

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
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  font-family: InterfontSemiBold;
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

.input-container {
  /* width: 100%; */
  /* padding-top: 10px; */
  /* padding-bottom: 24px; */
  justify-content: space-between;
  align-items: center;
  height: 100%;
  
  /* padding-right: none; */
  
}
.div-container {
  height: 100%;
  
}
@media screen and (min-width: 600px) {
    .q-field__append {
        min-height: 26px !important;
        /* height: 26px !important; */
    }
}
/* *>>>.q-table th {
    font-weight: 700;
    font-size: 12px;
    -webkit-user-select: none;
    user-select: none;
    font-family: InterfontBold;
    color: black;
    text-align: center !important;
    background-color: #d7e2e9;
} */
/* * >>> .q-table td
  {
      padding: 10px !important;
      padding-left: 20px !important;
      padding-right:  20px !important;
      font-size: 12px !important;
      height: 24px !important;
       text-align: center !important;
      font-family: InterfontMedium;
      font-weight: 500;
  } */
  /* nth-child(2) */
* >>> .q-table td.supplier-column
  {
    text-align: left !important;
  }
* >>> .q-field__label
{
  /* top: 5px; */
  color: #72777A;
  /* background-color: antiquewhite; */
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  font-family: InterfontMedium;
}
*.label-font >>>.q-field__native{
    /* min-height: 50px !important;
    height: 50px !important;
    padding-top: 28px !important; */
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    font-family: InterfontMedium;
    color: black;
    /* background-color: forestgreen; */
}

.bold-font {
  font-family: InterfontBold;
  font-weight: 700;
  font-size: 16px;
}
.custom-chip-padding {
  padding: 11px; /* Adjust the padding as needed */
  border-radius: 8px;
  background: #FFF !important;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
}
*[data-v-123da5ba] .q-chip--outline {
    background: #ffffff;
    box-shadow: 0px 0px 3.6px 0px rgba(0, 0, 0, 0.25);
}
.chip-container {
  display: flex;
  align-items: center;
}
.chip-icon {
  margin: 0 8px;
  font-size: 16px; /* Adjust the size as needed */
}
.text-align-left {
    text-align: left;
}
.q-pr-xs {
    /* padding-right: 4px; */
}
.grn_receive_button {
  justify-content: center;  
  background-color: #1E90FF; 
  color: white; 
  border-radius: 8px;
  box-shadow: 0px 1px 3.6px 0px rgba(0, 0, 0, 0.25);  
  padding: 16px !important;
  font-size: 16px;
  font-family: InterfontBold;
  font-weight: 700;
  width: 120px;
  height: 42px;

}
.qlist-font {
  font-family: InterfontMedium;
  font-size: 13px;
  font-weight: 500px;
  padding: 14px 16px;
  width: 241px;
  height: 42px;
}
.q-field--outlined {
    /* overflow: hidden; Add this to clip the background */
    /* border-radius: 8px; Ensure the background is applied to the right element */
    /* background: white; */
}

*>>>.q-btn--outline:before {
    background-color: white;
}
.text_1 {
  font-size: 16px;
  font-family: InterfontBold;
  font-weight: 700;
  color: #29292A;
}
.text_2 {
  font-size: 11px;
  font-family: InterfontSemiBold;
  font-weight: 600;
  color: #29292A;
}
.sort_font {
  width: 29px;
  height: 33px;
  font-size: 29px; /* Adjust font-size to fit within the dimensions */
}
.container_top {
  border-radius: 8px;
  background: #FFF;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  width: 100%;
  padding: 8px 32px;
  margin-bottom: 16px;
  margin-top: 16px;
}
.font_filter_sort {
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  font-family: InterfontSemiBold;
}
.font_filter_button {
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  font-family: InterfontBold;
  border-radius: 8px;
  box-shadow: 0px 1px 3.6px 0px rgba(0, 0, 0, 0.25);
  padding: 10px;
  /* width: 329px; */
  display: inline-block;
}

@media screen and (max-width: 599px) {
  .input_wrapper_right
{
  padding-right: 2%;
  padding-left: 2%;
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
  .q-field__control {
        /* border-radius: 5px; */
        padding: 0px !important;
        padding-top: 0px !important;
        /* min-height: 35px !important; */
        height: 60px !important;
    }
  .custom-select >>>.q-field__native {
    /* min-height: 50px !important; */
    /* height: 50px !important; */
    /* height: 150px; */
    padding-top: 0px !important;
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    font-family: InterfontMedium;
    /* background-color: #ffc6cd; */
  }
  .custom-selectfilter >>> .q-field__control {
    padding: 0 16px;
    border-radius: 8px;
    
}

  .q-field__append {
        min-height: 35px !important;
        height: 0px !important;
    }
    /* *>>>.q-field--dense .q-field__control, .q-field--dense .q-field__marginal {
    height: -2px !important;
} */
    /* *>>>.q-field--dense .q-field__marginal {
        height: 0px;
    } */
  *>>>.q-card__section--vert {
    padding: 0px;
}
.selected-card {
  border-radius: 8px;
  border: 2px solid #90A8D6;
  background: #FFF;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.30);
}

}
.radio-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.radio-container >>> .q-radio {
  margin-bottom: 0px; /* Optional: add spacing between items */
}
.radio_font {
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  font-family: InterfontMedium;
}
/* .menu_add.q-btn .q-icon, 
.menu_add.q-btn .q-spinner {
    font-size: 2.9em !important; Use !important as a last resort
} */
 .menu_add.q-btn >>>.q-icon {
  font-size: 2.3em;
 }
.menu_add[data-v-123da5ba] .q-icon {
    font-size: 2.2em !important;
    width: 35px;
    height: 35px;
}
.right_left_button >>>.q-icon {
  font-size: 2.0em !important;
}
.right_left_button.disabled {
  color: #928f8f;
}
</style>

<style lang="sass">
@media screen and (max-width: 599px)
  .q-field--dense .q-field__control
    height: auto !important

  .q-field--dense .q-field__marginal
    height: auto !important
</style>
