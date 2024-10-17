<template>
    <div v-if="$q.screen.width > 599" class="row card_section card_section_second" style="padding-top:16px">
      <!-- Item Master -->

      <!-- <Title :text="$language('D0202')" :filter_status="filter_status" v-on:receiveFilter="handleReceiveFilter" /> -->
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <div class="row">
          <!-- <div class="col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10">
            <div class="row">
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
          </div> -->

          <div class="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2"></div>
          <div class="card_section_two card_section_second_content col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div class="q-pr-xs row items-center" style="padding-bottom: 24px;">
              <div class="input-container row col-12">
              <div class="div-container col-xs-12 col-sm-4 col-md-4 col-lg-4 col-xl-4 q-pr-md">
                <!-- Item Code -->
                <InputLabel
                :readonly="false"
                :icon_append="'search'"
                :no_label="true"
                :text="$language('D0203')"
                v-model:pass_value="search"
                :dbComponentBehavior="{ ...dbComponentBehavior.text, label: $language('D0203') }"
                @iconClick="performSearch"
                v-on:receiveChange="handleChangeOptions"
                />
              </div>
              <div class="div-container col-xs-12 col-sm-4 col-md-4 col-lg-4 col-xl-4 q-pl-md">
                <!-- Description -->
                <InputLabel
                :icon_append="'search'"
                :readonly="false"
                :no_label="true"
                :text="$language('D0098')"
                v-model:pass_value="desc"
                :dbComponentBehavior="{ ...dbComponentBehavior.text, label: $language('D0098') }"
                @iconClick="performSearch"
                v-on:receiveChange="handleChangeOptions"
                />
              </div>


              <!-- <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 col-xl-4 q-pl-xs">
                <LabelSelectFilterHorizontal
                  style="margin-left: 0px;"
                  :readonly="false"
                  :no_label="true"
                  :text="'SubDept'"
                  v-model:pass_value="subDept"
                  :dbComponentBehavior="dbComponentBehavior.text"
                  :options="sub_dept_options"
                  v-on:receiveChange="handleChangeOptions"
                />
              </div> -->
<!-- SINI -->
              <div class="div-container col-xs-12 col-sm-4 col-md-4 col-lg-4 col-xl-4 " align="right">
                <Button_icon 
                :flat="false" 
                :font_color="'white'" 
                :color="'#1E90FF'" 
                :text="'Vendor'" 
                :outline="false" 
                size="16px"
                @receiveClick="navigateToVendor" 
                :border_radius="'8px'" 
                :hoverColor="'linear-gradient(0deg, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.15) 100%), #1E90FF'" 
                padding="6px" 
                style="width:120px;height:42px" 
                class="bold-font"
              />

                  <!-- <Button_icon :flat="false" :font_color="'white'" :color="'#2F3A4D'" :text="page_function == 'Itemmaster' ? 'Duplicate Item Link' : ''" :outline="false" size="15px"
                   v-on:receiveClick="handleShowDialogSelectItem" class="q-mr-sm"/> -->
                   <!-- <q-btn-dropdown class="q-mr-sm"  style="text-transform: none; background-color: #2F3A4D; color: white; border-radius: 0px;"  :flat="false" :outline="false" size="15px" label="Tools" dense>
                      <q-list dense>
                        <q-item clickable v-close-popup @click="handleConvert">
                          <q-item-section>
                            <q-item-label>Duplicate Item Link</q-item-label>
                          </q-item-section>
                        </q-item>


                      </q-list>
                    </q-btn-dropdown> -->
                    

              </div>

              </div>
            </div>
            <!-- <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom: 10px; padding-right: 10px;">
<div style="width: 100%; overflow-y: auto;">
                        <table cell style="width: 100%; border-collapse: collapse; color: black; font-size: 11px;" class="custom_table">
                          <thead>
                            <tr>
                              <th style="cursor: pointer; padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; background-color: #D7E2E9;">Code</th>
                              <th style="cursor: pointer; padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; background-color: #D7E2E9;">Name</th>
                              <th style="cursor: pointer; padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; background-color: #D7E2E9;">Mobile</th>
                              <th style="cursor: pointer; padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; background-color: #D7E2E9;">Fax</th>
                              <th style="cursor: pointer; padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; background-color: #D7E2E9;">Email</th>
                              <th style="cursor: pointer; padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; background-color: #D7E2E9;">
                                Address 1
                                

                              </th>
                              <th style="cursor: pointer; padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; background-color: #D7E2E9;">Address 2</th>
                              <th style="cursor: pointer; padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; background-color: #D7E2E9;">Address 3</th>
                              
                              <th style="cursor: pointer; padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; background-color: #D7E2E9;">Address 4</th>
                              
                              
                            </tr>
                          </thead>
                          <tbody>

                            <tr>
                              <td style="background: white;padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">10600271</td>
                              <td style="background: white;padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">THE ITALIAN BAKER SDN BHD</td>
                              <td style="background: white;padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">60122006187</td>
                              <td style="background: white;padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">60361457878</td>
                              <td style="background: white;padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">Kaadmin@ffmb.com.my</td>
                              <td style="background: white;padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">PT 45125, BATU 15 1/2,</td>
                              <td style="background: white;padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">SUNGAI PELONG</td>
                              <td style="background: white;padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;"></td>
                              <td style="background: white;padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;"></td>
                              
                              
                            </tr>
                            <tr>
                              
                              <td style="background: white;padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">10600271</td>
                              <td style="background: white;padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">THE ITALIAN BAKER SDN BHD</td>
                              <td style="background: white;padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">60122006187</td>
                              <td style="background: white;padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">60355692100</td>
                              <td style="background: white;padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">rohayu@mokayachocolates.com.my</td>
                              <td style="background: white;padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">NO 41, UI/32</td>
                              <td style="background: white;padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">JALAN PENGETUA</td>
                              <td style="background: white;padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">GLENMARIE INDUSTRIAL PARK</td>
                              <td style="background: white;padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;"></td>
                              
                            </tr>
                            <tr>
                              <td style="background: white;padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">10600750</td>
                              <td style="background: white;padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">THE ITALIAN BAKER SDN BHD</td>
                              <td style="background: white;padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">60122006187</td>
                              <td style="background: white;padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">60361457878</td>
                              <td style="background: white;padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">cheehoon@ffmb.com.my</td>
                              <td style="background: white;padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">PT 45125, BATU 15 1/2,</td>
                              <td style="background: white;padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">SUNGAI PELONG</td>

                              <td style="background: white;padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;"></td>
                              <td style="background: white;padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;"></td>
                              
                            </tr>
                            <tr>
                              <td style="background: white;padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">10602122</td>
                              <td style="background: white;padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">MYKUALI MANUFACTURING SDN BHD</td>

                              <td style="background: white;padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">60362076719</td>
                              <td style="background: white;padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">s.mykuali@yahoo.com.my</td>
                              <td style="background: white;padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">18&20, JALAN IKS BUKIT TENGAH</td>
                              <td style="background: white;padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">TAMAN IKS BUKIT TENGAH</td>
                              <td style="background: white;padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;"></td>
                              <td style="background: white;padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;"></td>
                              <td style="background: white;padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;"></td>
                              
                            </tr>
                            <tr>
                              <td style="background: white;padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca; text-align: right;">10602333</td>
                              <td style="background: white;padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">AHZALIMO</td>
                              <td style="background: white;padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">LOT A-6-3, ALPINE VILLAGE</td>
                              <td style="background: white;padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">6055455512</td>
                              <td style="background: white;padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">ahzalimo@gmail.com</td>
                              <td style="background: white;padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;">SUNWAY CITY TAMBUN</td>
                              <td style="background: white;padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;"></td>
                              <td style="background: white;padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;"></td>
                              <td style="background: white;padding: 10px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbcaca;"></td>
                              
                            </tr>

                            
                            

                          </tbody>
                        </table>
</div>
                      </div> -->

              <PurchaseTable
              :row_per_page="[5,10,20,50]"
              :search_input="true"
              :top_button="false"
              v-on:onClickRefno="handleClickRefno"
              v-on:add_button="handleShowCreateItemMaster"
              v-on:main_action="handleAction"
              v-on:main_edit="handleEdit"
              v-on:main_list="handleList"
              v-on:main_delete="handleDelete"
              v-on:main_cancel="handleCancel"
              v-on:handlePrint="handlePrint"
              v-on:handlePrintDropdown="handlePrintDropdown"
              v-on:main_duplicate = "handleShowDuplicateDialog"
              :title="table_title"
              :table_data="table_data"
              :table_column="table_column"
              :action_button="true"
              :duplicate_button ="true"
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
    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" >     <!-- :class="page_function == 'DebitNote' ? '' :'q-pb-sm'" -->
      <div class="row">
        <!-- <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                  <Button_icon :icon="'sort'" :border_radius="'17px;'" :flat="true" :font_color="'#29292A'" :color="'transparent'" :outline="false" size="17px"
                  v-on:receiveClick="handleShowSidebar" class="sort_font"/>
        </div> -->
        <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
          <!-- <Title v-if="page_function == 'Itemmaster'" :text="$language('D0202')" :smaller_label="true" :noFilter="true" :filter_status="filter_status" v-on:receiveFilter="handleReceiveFilter" /> -->
          <Chip v-if="page_function == 'Itemmaster'" :text="'Item Master'" icon="img:item_master.svg" color="#273655" class="chip_sty" v-on:receiveClick="handleNavigate('Outlet')"/>
        </div>

        <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2" align="right" style="margin-top: 5px;">
          <Button_icon :icon="'filter_alt'" :flat="false" :border_radius="'8px;'" :font_color="'primary'" :color="'white'" :outline="true" size="15px"
          v-on:receiveClick="handleShowFilter" class="primary_button_font" style="background-color:white !important;" />
          
        </div>

      </div>
    </div>

    <div class="container_top col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center" style="padding: 8px; font-size: 10px ; color:#757575; font-weight:700; font-family: InterfontBold; ">
          <q-icon name="img:icons/group.svg" class="q-px-none" size="15px" style="filter: invert(52%) sepia(8%) saturate(250%) hue-rotate(166deg) brightness(90%) contrast(95%);"/>&nbsp;&nbsp;{{$language('D0098')}}&nbsp;&nbsp;
          <q-icon name="img:icons/department.svg" class="q-px-none" size="15px" style="filter: invert(52%) sepia(8%) saturate(250%) hue-rotate(166deg) brightness(90%) contrast(95%);"/>&nbsp;&nbsp;Department&nbsp;&nbsp;
          <q-icon name="img:icons/group_subdepartment.svg" class="q-px-none" size="15px" style="filter: invert(52%) sepia(8%) saturate(250%) hue-rotate(166deg) brightness(90%) contrast(95%);"/>&nbsp;&nbsp;Sub-Department&nbsp;&nbsp;
          <q-icon name="img:icons/category_item.svg" class="q-px-none" size="15px" style="filter: invert(52%) sepia(8%) saturate(250%) hue-rotate(166deg) brightness(90%) contrast(95%);"/>&nbsp;&nbsp;{{ $language('D0196') }} <!--Category-->
        </div>


    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"> 
      <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" style="padding: 0px;padding-bottom: 24px">
          <div class="row" style="gap:10px"> <!--@click="handleAction(result)"-->
            <div @click="selectCard(index)" v-for="(result,index) in results" :key="index" class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
              <q-card flat class="card_design" style="width: 100%; overflow-wrap: break-word; border-radius:8px;" :class="{'selected-card': selectedCardIndex === index}">
                  <q-card-section style="padding: 5px;">
                    <div class="row">
                      <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9 col-xl-9 q-pl-sm">
                        <div class="row text_1">
                            {{ result.Itemcode }}
                        </div>
                      </div>
                      <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 text-subtitle2 text-right">
                        <div class="row justify-center items-center">
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 align-items-center">
                            <q-btn flat round color="primary" dense icon="content_copy" size="13px" @click.stop="handleShowDuplicateDialog(result)"/>
                          </div>
                        </div>
                      </div>
                        <!-- <div v-if="page_function == 'PurchaseOrder'" class="row q-pt-md" style="font-size: 11px;">
                          {{ result.SCode }} - {{ result.SName }} |<br> {{ result.loc_group }} | {{ result.PODate }}
                        </div> -->
                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-pl-sm">
                        <div v-if="page_function == 'Itemmaster'" id="detail_show" ref="detail_show"  class="row" style="font-size: 11px;">
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                             <q-icon name="img:icons/group.svg" class="" size="16px" style="filter: invert(52%) sepia(8%) saturate(250%) hue-rotate(166deg) brightness(90%) contrast(95%);"> <!--q-pa-xs-->
                              <!-- <q-tooltip anchor="top middle" self="bottom middle"  :hide-delay="300" :offset="[10, 10]">
                                <strong>Supplier</strong>
                               </q-tooltip> -->
                             </q-icon>&nbsp;
                             <span class="text_2">{{ result.Description }}</span>
                            </div>
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" style="padding-top:8px">
                             <q-icon name="img:icons/department.svg" class="" size="16px" style="filter: invert(52%) sepia(8%) saturate(250%) hue-rotate(166deg) brightness(90%) contrast(95%);">
                              <!-- <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" :hide-delay="300">
                                <strong>Branch</strong>
                               </q-tooltip> -->
                             </q-icon>&nbsp;
                              <span class="text_2">{{ result.Dept }}</span> &nbsp;&nbsp;
                             <q-icon name="img:icons/group_subdepartment.svg" class="" size="16px" style="filter: invert(52%) sepia(8%) saturate(250%) hue-rotate(166deg) brightness(90%) contrast(95%);">
                              <!-- <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" :hide-delay="300">
                                <strong>Date</strong>
                               </q-tooltip> -->
                              </q-icon>&nbsp;
                              <span class="text_2">{{ result.SubDept }}</span>&nbsp;&nbsp;
                              <q-icon name="img:icons/category_item.svg" class="" size="16px" style="filter: invert(52%) sepia(8%) saturate(250%) hue-rotate(166deg) brightness(90%) contrast(95%);">
                              <!-- <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" :hide-delay="300">
                                <strong>Date</strong>
                               </q-tooltip> -->
                              </q-icon>&nbsp;
                              <span class="text_2">{{ result.Category }}</span>
                          </div>
                        </div>

                        <div v-if="page_function == 'GoodsReceivedNote'" class="row q-pt-sm" style="font-size: 11px;">
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                             <q-icon name="person" class="q-pa-xs" size="15px" style="filter: invert(52%) sepia(8%) saturate(250%) hue-rotate(166deg) brightness(90%) contrast(95%);"/>
                             {{ result.Code }} - {{ result.Name }}
                            </div>
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                             <q-icon name="location_city" class="q-px-xs" size="15px" style="filter: invert(52%) sepia(8%) saturate(250%) hue-rotate(166deg) brightness(90%) contrast(95%);"/>
                              {{ result.loc_group }} &nbsp;
                             <q-icon name="event" class="q-px-xs" size="15px" style="filter: invert(52%) sepia(8%) saturate(250%) hue-rotate(166deg) brightness(90%) contrast(95%);"/>
                              {{ result.GRDate }}
                          </div>
                        </div>
                        <!-- <div v-if="page_function == 'GoodsReceivedNote'" class="row q-pt-md" style="font-size: 11px;">
                          {{ result.Code }} - {{ result.Name }} |<br> {{ result.loc_group }} | {{ result.GRDate }}
                        </div> -->

                        <div v-if="page_function == 'DebitNote'" class="row q-pt-md" style="font-size: 11px;">
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                             <q-icon name="person" class="q-pa-xs" size="15px"/>{{ result.Code }} - {{ result.Name }}
                            </div>
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                             <q-icon name="location_city" class="q-px-xs" size="15px"/>{{ result.locgroup }} &nbsp;
                             <q-icon name="event" class="q-px-xs" size="15px"/> {{ result.DocDate }}
                          </div>
                        </div>

                        <!-- <div v-if="page_function == 'DebitNote'" class="row q-pt-md" style="font-size: 11px;">
                          {{ result.Code }} - {{ result.Name }} |<br> {{ result.locgroup }} | {{ result.DocDate }}
                        </div> -->
                        <div v-if="page_function == 'InterbranchTransfer'" class="row q-pt-md" style="font-size: 11px;">
                          {{ result.SCode }} - {{ result.SName }} |<br> {{ result.loc_group }} | {{ result.PODate }}
                        </div>
                      </div>
                      
                    </div>
                  </q-card-section>
                  <q-card-section v-show="selectedCardIndex === index">
                    <!-- <q-separator />"'#B22222'" -->
                    <q-card-section class="text-subtitle2" align="right">
                      <q-btn no-caps flat color="primary" label="Edit" @click="handleAction(result)" style="font-family:InterfontSemiBold; font-size: 14px;font-weight: 600;"/>
                      <!-- <q-btn no-caps flat color="red-7" label="Delete" @click="handleDelete(result)" style="font-family:InterfontSemiBold; font-size: 14px;font-weight: 600;"/> -->
                    </q-card-section>
                  </q-card-section>
              </q-card>
            </div>

            <div style="padding-bottom: 40px;" class="col-xs-12 text_entries" align="right">
              Entries: {{ filter.pagination }} || {{ filter.from }}- {{ filter.to }} of {{ filter.total_row }}
            </div>

            <div class="dialog_action1">
              <div class="row full-height items-center">   

                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4" align="center">
                  <Button_icon :disable="ori_params.params.offset == 0 || showAddLoading" :icon="'chevron_left'" :border_radius="'17px;'" :flat="true" :color="'white'" :outline="false" size="13px"
                  v-on:receiveClick="changePagination('back')" class="right_left_button" :font_color="ori_params.params.offset == 0 ? '#928f8f' : '#1E90FF'"/>
                </div>

                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4" align="center">
                  <Button_icon v-if="page_function != 'GoodsReceivedNote'" :icon="'add'" :border_radius="'30px;'" :flat="false" :font_color="'white'" :color="'primary'" :outline="false" size="13px"
                  v-on:receiveClick="handleShowCreateItemMaster" class="menu_add" :icon-size="'2.9em'"/>

                  <Button_icon v-if="page_function == 'GoodsReceivedNote'" :icon="'add'" :border_radius="'30px;'" :flat="false" :font_color="'white'" :color="'primary'" :outline="false" size="13px"
                  v-on:receiveClick="handleConvert" class="menu_add" :icon-size="'2.9em'"/>
                </div>

                

                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4" align="center">
                  <Button_icon :disable="showNext || showAddLoading" :icon="'chevron_right'" :border_radius="'17px;'" :flat="true" :color="'white'" :outline="false" size="13px"
                  v-on:receiveClick="changePagination('next')" class="right_left_button primary_button_font"
                  :font_color="ori_params.params.offset + ori_params.params.limit >= filter.total_row ? '#928f8f' : '#1E90FF'"/>
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


  <q-dialog v-model="duplicate_dialog" persistent position="top">
    <q-card style="width: 700px; max-width: 98vw;text-align:center;margin-top: 5%;">

      <q-card-section class="row items-center" style="padding-top:1%;padding-bottom:1%;border-bottom: 1px solid #a7bbcb;">
        <div class="text-h6">{{ $language('D0115') }}<!--Confirmation--></div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup :disable="showAddLoading || showAddLoading2"/>
      </q-card-section>

      <q-card-section>
        <!-- <span class="q-ml-sm custom_selection_font">{{general_body}}</span> -->
        <span>Are you sure to duplicate this record?</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat :label="$language('D0116')" color="primary" v-close-popup /> <!-- CANCEL -->
        <q-btn flat :label="$language('D0117')" color="primary" @click="handleDuplicateItemLink" /> <!-- OK -->
      </q-card-actions>

      <q-inner-loading
        :showing="deleteLoading"
        color="primary"
      />
    </q-card>
  </q-dialog>


  <q-dialog v-model="filter_transmain" persistent :position="$q.screen.width > 1023 ? 'top' : 'standard'">
    <q-card style="width: 700px; max-width: 98vw; margin-top: 5%;">
      <q-card-section v-if="$q.screen.width > 1023" class=" row theme_color header_top_mobile dialog_header" style="padding: 0px;">
          <div class="text-subtitle1 header_text" style="margin-top: 5px;">{{ $language('D0126') }}<br></div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup :disable="showAddLoading || showAddLoading2"/>
      </q-card-section>

      <q-card-section v-if="$q.screen.width < 1024" class="row theme_color items-center header_top_mobile dialog_header" style="height: 56px;padding: 16px;border-bottom: 1px solid #A7BBCB;">
        <div class="text-h6">{{ $language('D0126') }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup :disable="showAddLoading || showAddLoading2"/>
      </q-card-section>

      <q-card-section class="upload_container content_body_dialog">
        <q-form ref="save_edit_pochild_form">
          <div class="row col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" style="padding: 16px">
            <!-- <div class="q-pr-lg q-pl-lg"> -->
              <div class="row col-12" style="gap:10px;">
                <!-- <div class="row col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" style="gap:8px">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <span class="dialog_font">{{ $language('D0129') }}</span>
                  </div>
                  <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                    <Radio class="radio_font radio-container" size="xs" :disable="false" v-on:receiveChange="handleChange" v-model="filter.sort_type" :options="sort_type_options"  />
                  </div>
                </div> -->
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
                <q-separator class="separator-style"></q-separator>
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" style="padding-bottom: 8px">
                            <span class="dialog_font">CATEGORY</span>
                </div>
                </div>    
                  <div class="row col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" style="gap:16px">
                    <!-- <div class="offset-xs-1 col-xs-10 col-sm-10 col-md-6 col-lg-6 col-xl-6"> -->
                      <!-- <div class="row"> -->
                        <!-- <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator"> -->
                          
                          <div class="row col-12">
                            <!-- <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                              <span class="dialog_font">{{ $language('D0203') }}</span>
                            </div> -->
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Input
                              :autofocusclick="true"
                              :no_label="false"
                              :label="$language('D0203')"
                              :readonly="false"
                              v-on:change="handleChange"
                              v-model="search"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />

                            </div>
                          </div>
                        
                      <!-- </div> -->
                    <!-- </div> -->

                    <!-- <div class="offset-xs-1 col-xs-10 col-sm-10 col-md-6 col-lg-6 col-xl-6"> -->
                      <!-- <div class="row"> -->
                        <!-- <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator"> -->
                          <!-- <div class="row"> -->
                            <!-- <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                              <span class="dialog_font">{{ $language('D0025') }}</span>
                            </div> -->
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <SelectFilter
                              :readonly="false"
                              :no_label="false"
                              :label="$language('D0025')"
                              v-model:pass_value="supcus"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.select"
                              :options="supcus_options"
                              v-on:receiveChange="handleChange"
                              />
                            </div>
                          <!-- </div> -->
                        <!-- </div> -->
                      <!-- </div> -->
                    <!-- </div> -->

                    <!-- <div class="offset-xs-1 col-xs-10 col-sm-10 col-md-6 col-lg-6 col-xl-6"> -->
                      <!-- <div class="row"> -->
                        <!-- <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator"> -->
                          <!-- <div class="row"> -->
                            <!-- <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                              <span class="dialog_font">{{ $language('D0127') }}</span>
                            </div> -->
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Select
                              :readonly="false"
                              :no_label="false"
                              :label="$language('DO127')"
                              v-model="filter.pagination"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.sort_by : oridbComponentBehavior.select"
                              :options="filter.pagination_options"
                              v-on:receiveChange="handleChange"
                              />
                            </div>
                          <!-- </div> -->
                        <!-- </div> -->
                      <!-- </div> -->
                    <!-- </div> -->

                    <!-- <div class="offset-xs-1 col-xs-10 col-sm-10 col-md-6 col-lg-6 col-xl-6"> -->
                      <!-- <div class="row"> -->
                        <!-- <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator"> -->
                          <!-- <div class="row"> -->
                            <!-- <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                              <span class="dialog_font">{{ $language('D0128') }}</span>
                            </div> -->
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <Select
                              :readonly="false"
                              :label="$language('D0128')"
                              :no_label="false"
                              v-model="filter.sort_by"
                              :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.sort_by : oridbComponentBehavior.select"
                              :options="sort_by_options"
                              v-on:receiveChange="handleChange"
                              />

                            </div>
                          <!-- </div> -->
                        <!-- </div> -->
                      <!-- </div> -->
                    <!-- </div> -->

                    
                  </div>
                
              
            <!-- </div> -->
          </div>
        </q-form>
      </q-card-section>

      <q-card-actions class="button_container dialog_action" style="padding: 0px 16px 16px 16px;">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" dir="rtl">
            <Button_icon :readonly="false" :flat="true" :font_color="'white'" :color="'#1E90FF'" :text="$language('D0130')" :outline="false" size="16px"
            v-on:receiveClick="handleFilter()" class="full-width font_filter_button primary_button_font"/>
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
  import Chip from 'src/components/ERP/Base/Chip'
  import LabelInputHorizontal from 'src/components/ERP/General/LabelInputHorizontal'
  import PurchaseTable from 'src/components/ERP/Purchase/PurchaseTable'
  import Title from 'src/components/ERP/General/Title'
  import LabelSelectHorizontal from 'src/components/ERP/General/LabelSelectHorizontal'
  import LabelMultiSelectHorizontal from 'src/components/ERP/General/LabelMultiSelectHorizontal'
  import LabelDatepickerHorizontal from 'src/components/ERP/General/LabelDatepickerHorizontal'
  import Button_icon from 'src/components/ERP/Base/Button_icon'
  import { Notify } from "quasar";
  import Select from 'src/components/ERP/Base/Select'
  import Radio from 'src/components/ERP/Base/Radio';
  import InputLabel from 'src/components/ERP/Base/InputLabel'
  import LabelSelectFilterHorizontal from 'src/components/ERP/General/LabelSelectFilterHorizontal'
  import Input from 'src/components/ERP/Base/Input'
  import SelectFilter from 'src/components/ERP/Base/SelectFilter'

  export default{
    data(){
      return{
        selectedCardIndex: null,
        filter_status: false,
        search: "",
        dept:"",
        desc:"",
        status: "",
        status_options: [],
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
        filter: {
          pagination: 5,
        },
        outlet_options: [],
        // outlet_guid: [],
        select_options: [],
        filter_options: [],
        retailer_guid: sessionStorage.getItem("retailer_guid") != "" && sessionStorage.getItem("retailer_guid") != "null" && sessionStorage.getItem("retailer_guid") != null ? sessionStorage.getItem("retailer_guid") : [],
        getuser: sessionStorage.getItem("getuser") != "" && sessionStorage.getItem("getuser") != "null" && sessionStorage.getItem("getuser") != null ? sessionStorage.getItem("getuser") : [],
        user_name: sessionStorage.getItem("user_name") != "" && sessionStorage.getItem("user_name") != "null" && sessionStorage.getItem("user_name") != null ? sessionStorage.getItem("user_name") : [],
        language: sessionStorage.getItem("language") != "" && sessionStorage.getItem("language") != "null" && sessionStorage.getItem("language") != null ? sessionStorage.getItem("language") : [],
        session_outlet_guid: sessionStorage.getItem("session_outlet_guid") != "" && sessionStorage.getItem("session_outlet_guid") != "null" && sessionStorage.getItem("session_outlet_guid") != null ? sessionStorage.getItem("session_outlet_guid") : [],
        branch_list: sessionStorage.getItem("branch_list") != "" && sessionStorage.getItem("branch_list") != "null" && sessionStorage.getItem("branch_list") != null ? sessionStorage.getItem("branch_list") : [],
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
        dept_options:[],
        duplicate_dialog:false,
        duplicate_json:[],
        ori_params:{},
        supcus_options:[]
      }
    },
    props: ['miniState'],
    components:{
        Chip,
        LabelInputHorizontal,
        PurchaseTable,
        Title,
        // LabelSelectHorizontal,
        // LabelMultiSelectHorizontal,
        // LabelDatepickerHorizontal,
        Button_icon,
        LabelSelectFilterHorizontal,
        Select,
        Radio,
        Input,
        SelectFilter,
        InputLabel
    },
    computed: {
      dbComponentBehavior() {
        return this.$store.getters['dbComponentBehavior/byLanguage']('erp')
      },
    },
    methods: {
        
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
      navigateToVendor() {
      // Navigate to Vendor.vue when button is clicked
      this.$router.push({ path: '/erp/Setup/Vendor' });
    },
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
        handleShowCreateItemMaster(){
          this.$router.push({ name: "Create" + this.page_function });
        },
        handleShowSidebar()
        {
          this.miniState_main = !this.miniState_main;
          this.$emit("clickSidebar", this.miniState_main);
        },
        handleShowFilter()
        {
          console.log('ori_params',this.ori_params);
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
              // {
              //   label: 'All',
              //   value: 9999999,
              // },
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
          console.log('addItemMaster')
          this.$router.push({
              name: "View" + this.page_function,
              // query: {  header_id: payload.transmain_guid  },
          });
        },
        handleCancel(){
          console.log('handleCancel');
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
          console.log('this.ori_params',this.ori_params);

          this.table_function(this.ori_params);
          this.filter_transmain = false;
        },
        changePagination(newVal)
        {
          this.showAddLoading = true;
         console.log('newVal',newVal);
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
            console.log('payload',payload);
              this.ori_params = payload;

              this.table_function(payload);
        },
        async table_function(ori_payload){
          
            this.showAddLoading = true;

            var payload = ori_payload.params
            
            payload.type= "S";
            payload.returnable = '0';
            // payload.branch = this.branch_list;
            // payload.active = '0';
            // payload.block = '0';
            payload.skip = payload.offset;
            payload.limit = payload.limit;
            payload.outlet_guid = this.session_outlet_guid;//session
            payload.language = this.language;
            // payload.Code =  payload.Code;
            payload.Name = payload.Name;
            // payload.Mobile = payload.Mobile;
            // payload.Fax = payload.Fax;
            // payload.email = payload.email;
            // payload.Add1 = payload.Add1;
            // payload.Add2 = payload.Add2;
            // payload.Add3 = payload.Add3;
            // payload.Add4 = payload.Add4;
            payload.supcus_guid = payload.supcus_guid;
            // payload.sort_by = "IssuedStamp";
            // payload.sort_type = "Desc";
            // payload.search_type= "Name";
            // payload.user = "panda";//session
            
            console.log(payload);
            // return;

            // if(payload.ordering[0] == "-")
            // {
            //   payload.sort_by = payload.ordering.slice(1);
            //   payload.sort_type = "Desc"
            // }
            // else
            // {
            //   payload.sort_by = payload.ordering
            //   payload.sort_type = "Asc"
            // }

            var table_column = [
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

            this.table_column = table_column;

            var data = {};
                    
            var payload = {
              "pass_json": payload,//pass_json should be the field or data wish to be created.
              "params": {}
            };
            alert()
            var object_pass = {
              "dispatch": 'setup/trigger_post_read_supcus_all', //refer to path/function_name in store actions.js
              "getter": 'setup/get_read_supcus_all', //refer to path/function_name in store getters.js
              "app": this, //compulsory passed variable
              "payload": payload //payload that needed to use in store actions.js
            };

            var dispatch_response = await this.$dispatch(object_pass);

            console.log('dispatch',dispatch_response);

            if(dispatch_response.status)
            {
              //success condition

              var results = dispatch_response.response;
              console.log('result', results)
              this.table_data = {
                  "data": {
                      "count": results.total_row,
                      "next": null,
                      "previous": null,
                      "results": results.detail
                  }
              };
              console.log('table-data', this.table_data)

            }else
            {
              //fail condition
              this.table_data = {
                  "data": {
                      "count": 0,
                      "next": null,
                      "previous": null,
                      "results": []
                  }
              };
            }

            this.showAddLoading = false;
            alert()
            return;

            // await this.$store.dispatch('setup/trigger_search_supcus', payload).then(() => {
            //   data = JSON.parse(JSON.stringify(this.$store.getters['setup/get_search_supcus']));
            // });

            // var payload = {
            //   "pass_json": {
            //     "type": "S",
            //     "returnable": 0,
            //     "branch": 'HQ',
            //     "active":0,
            //     "block": 0,
            //     "skip": 0,



            //   }
            //   //pass_json should be the field or data wish to be created.
            // };
            // var object_pass = {
            //   "dispatch": 'setup/trigger_read_supcus_all', //refer to path/function_name in store actions.js
            //   "getter": 'setup/get_read_supcus_all', //refer to path/function_name in storegetters.js
            //   "app": this, //compulsory passed variable
            //     "payload": payload //payload that needed to use in store actions.js
            //   };
            // var  = await this.$dispatch(object_pass);

            // if(this.page_function != 'DebitNote')
            // {

            if(data.status == 'success')
            {
              var results = data.response;

              for(var i in results.detail)
              {
                var obj = results.detail[i];
                obj.selected = false;
              }

              this.table_data = {
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
              this.table_data = {
                  "data": {
                      "count": 0,
                      "next": null,
                      "previous": null,
                      "results": []
                  }
              };
            }

            var status = data.status
           // var results = data.data.detail;
            // if(status == "failed"){
            //   this.table_data = {
            //     "data": {
            //         "count": 0,
            //         "next": null,
            //         "previous": null,
            //         "results": []
            //     }
            // };

            // }else{
            //   console.log('data', data)
            //   var results = data.data.detail;
            //   this.table_data =
            // {
            //     "data": {
            //         "count": data.data.total_row,
            //         "next": null,
            //         "previous": null,
            //         "results": data.data.detail
            //     }
            // };

            // this.results = data.data.detail;
            // console.log('results',this.results);
            // console.log(' this.ori_params', this.ori_params);

            // this.showNext = this.ori_params.params.offset + this.ori_params.params.limit >= this.table_data.data.count;
            // this.filter.total_row = this.table_data.data.count;
            // var from = this.ori_params.params.offset+1;
            // var to = this.ori_params.params.offset + this.table_data.data.results.length;
            // this.filter.from = from;
            // this.filter.to = to;

            // }
            console.log('data',data)
      //       var payload2 = {
      //         limit: 99999999,
      //         language: this.language
      //       }

      // var dept = await this.get_dept(payload2);

      // console.log('dept',dept)
            // for(var index in results)
            // {
            //   var object = results[index];
            //   var filter = dept.filter((entry)=>{return entry.Code == object.Dept})
            //   object.DeptDescription = filter[0].Description
            //   console.log('filter',filter)

            // }


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
                this.dept = "";
                this.status = "";
                this.desc = ""
                this.outlet_guid = [];

                this.filter_status = false;

                this.table_function(this.ori_params);
            }
        },
        handleChangeOptions(newVal){
            // if(newVal == null){
            //     newVal = newVal == null ? '' : newVal
            //     this.dept = newVal
            // }

              //  console.log('newVal',newVal);
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
                  { label: 'OK', color: 'white', handler: () => { } }
                ]
            })
        },
        handleAction: function(payload)
      {
        // console.log('payload',payload)
        // console.log('page',this.page_function)
        // this.$router.push({
        //     name: "Edit" + this.page_function,
        //     query: {  Itemcode: payload.Itemcode},
        // });

        this.$router.push({
          // name: "Edit" + this.page_function,
          name: "Vendor",
          query: { supcus_guid: payload.supcus_guid}
        });

      },
       async get_dept(payload){
        //  var payload = {}
        //  payload.language = this.language;
         return await this.$store.dispatch('itemmaster/trigger_read_department', payload).then(() => {
               var data = JSON.parse(JSON.stringify(this.$store.getters['itemmaster/get_department']));
               return data
            });
        },
        handleShowDialogSelectItem(){
          console.log('SHOW DIALOG');
        },
        handleDuplicateItemLink(){
          // this.$router.push({ name: "Create" + this.page_function })
          sessionStorage.setItem('item', JSON.stringify(this.duplicate_json));
          this.$router.push({ name:"Create" + this.page_function, query: { type:'duplicate_item_link' }})
        },
        handleShowDuplicateDialog(payload){
          this.duplicate_json = payload;

          this.duplicate_dialog = true;
        }
    },
    async created() {
      var sort_by_options = [];

      if(this.page_function == 'PurchaseOrder')
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
      else if(this.page_function == 'GoodsReceivedNote')
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
      }else if(this.page_function == 'InterbranchTransfer')
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
            value: this.page_function == 'InterbramchTransfer' ? 'laststamp' : 'LastStamp'
          },
        ]
      }else if(this.page_function == 'Itemmaster'){

        sort_by_options = [
          {
            label: 'Item Code',
            value: 'Itemcode'
          },
          {
            label: 'ItemLink',
            value: 'ItemLink'
          },
          {
            label: 'Description',
            value: 'Description'
          },
          {
            label: 'Dept',
            value: 'Dept'
          },
          {
            label: 'SubDept',
            value: 'SubDept'
          },
          {
            label: 'Category',
            value: 'Category'
          },
          {
            label: 'Supplier Code',
            value: 'vendor_code'
          },
          {
            label: 'ItemType',
            value: 'ItemType'
          },
          {
            label: 'Last Stamp',
            value: 'LastStamp'
          },
          {
            label: 'Issue Stamp',
            value: 'IssueStamp'
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
        };


       // console.log('table_newVal',table_newVal);

        // this.handleTableChange(table_newVal);
       console.log('ori_params',this.ori_params);
       console.log('table_newVal',table_newVal);

      }

      var dept_list = [];
      var payloadDept = {
      skip: 0,
      language : 'EN',
      limit:99999999,
      sort_by: "Code",
      sort_type: "ASC",
    }
      var dept = await this.get_dept(payloadDept);
      console.log('dept',dept);
      var dept_results = dept.detail ;
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
      dept_list.push(obj);

    }
    this.dept_options = dept_list


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
    async mounted(){

    },
    watch: {
        miniState(newVal) {
          this.miniState_main = newVal;
        }
    },
  }

  </script>

  <style scoped>
  .td {
  background: white;
  }
    .separator-style {
      
      border-top: 1px solid #BFBFBF;
      width: 100%;
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
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}
  .menu_add >>>.q-icon {
    font-size: 2.9em !important;
}
  .right_left_button >>>.q-icon {
    font-size: 2.0em !important;
}
  .right_left_button.disabled {
    color: #928f8f;
}
  .sort_font {
    width: 29px;
    height: 33px;
    font-size: 29px; /* Adjust font-size to fit within the dimensions */
}
  .text_entries {
    font-size: 11px;
    font-family: InterfontSemiBold;
    font-weight: 600;
    color: #29292A;
}
  .text_1 {
    font-size: 16px;
    font-family: InterfontBold;
    font-weight: 700;
    color: #29292A;
}
.text_2 {
  font-size: 13px;
  font-family: InterfontSemiBold;
  font-weight: 600;
  color: #757575;
}
  .container_top {
    border-radius: 8px;
    background: #FFF;
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
    width: 100%;
    padding: 8px 0px;
    margin-bottom: 16px;
    margin-top: 16px;
}
  /* .dialog_action1
  {
    position: fixed;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    width: 320px; 
    height: 60px; 
    border-radius: 15px;
    background-color: white;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  } */
  .header_text
  {
    padding-left: 16px;
    padding-right: 16px;
    font-weight: bold;
  }


  /* .card_design
  {
    height: 100px;
    background-color: white;
    color:black;
  } */


  .q-btn-dropdown__arrow{
    margin-left: 0px;
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

 
  @media all and (min-width: 600px) {
    .card_section_second
    {
        padding-left: 24px;
        padding-right: 24px;
        padding-bottom: 24px;
    }
  }

  @media all and (max-width: 599px) {
    .button_container {
  padding-left: 24px;
  padding-right: 24px;
}
    .font_filter_button {
  display: inline-block;
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
    *>>>.q-card__section--vert {
    padding: 0px;
}
    .card_design
{
  /* height: 120px; */
  background-color: white;
  color:black;
  padding: 16px;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.30) !important;

}
    .selected-card {
      border-radius: 8px;
      border: 2px solid #90A8D6;
      background: #FFF;
      box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.30);
}
    .card_section_second
    {
        padding: 16px;
    }
  }

  .card_section_second_content
  {
      /*border: 2px solid #ababab;*/
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
    font-size: 14px !important;
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
  /*padding-top: 10px;*/
  /*padding-bottom: 24px;*/
  justify-content: space-between;
  align-items: center;
  height: 100%;
  
  /* padding-right: none; */
  
}
.bold-font {
  font-family: InterfontBold;
  font-weight: 700;
  font-size: 16px;
}
.card_section {
  background: #F4F7FE;
}

  </style>
