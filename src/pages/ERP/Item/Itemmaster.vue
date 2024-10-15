<template>
    <q-form ref="submit_form">
    <div class="row row_section" style="padding: 0px; margin-bottom: 10px; margin-left: 12px;">
        <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <Chip text="Item" icon="sell" /> / <Chip text="Itemmaster" icon="storage" />
        </div>

        <Title :text="'Itemmaster'" :noFilter="true" :filter_status="filter_status" v-on:receiveFilter="handleReceiveFilter" />
    </div>

    <!-- <q-card style="background-color: white; padding: 10px; margin-left: 10px; margin-right: 10px; margin-bottom: 10px;">
        <q-card-section> -->
        <!-- HQ Table -->
        <!--
        <div class="row row_section">
            <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div class="component_div">
                <Table
                :row_per_page="[20,40,60,80,100,0]"
                :top_button="true"
                :button_no_outline="true"
                v-on:head_button="addButton"
                v-on:main_action="handleAction"
                v-on:main_edit="handleEdit"
                v-on:main_list="handleList"
                v-on:main_delete="handleDelete"
                :title="table_title"
                :table_data="table_data_companyprofile"
                :table_column="table_column"
                :action_button="true"
                :edit_button="true"
                :view_button="true"
                :delete_button="true"
                />
            </div>
            </div>
        </div>
        -->

        <div class="row row_section">
            <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div class="component_div">
                <TablePagination
                :row_per_page="[20,40,60,80,100,0]"
                :top_button="true"
                v-on:receiveRequestTable="handleTableChange"
                v-on:head_button="addButton"
                v-on:main_action="handleAction"
                v-on:main_edit="handleEdit"
                v-on:main_list="handleList"
                v-on:main_delete="handleDelete"
                :table_data="test_data"
                :table_column="test_column"
                :action_button="true"
                :edit_button="false"
                :view_button="false"
                :delete_button="true"
                :button_no_outline="true"
                />
            </div>
            </div>
        </div>

        <q-dialog v-model="showAddTask" >
        <q-card style="width: 850px; max-width: 80vw;">
            <q-card-section class="row bg-primary text-white">
            <Label
                :text="is_update ? 'Edit item' : 'Add item'"
                class="text-subtitle1"
                style="background-color: transparent;"
            />
            <q-space />
            <q-btn v-close-popup flat round dense icon="close" />
            </q-card-section>

            <q-card-section>
              <div class="upload_separator_first">
                <div class="row row_section text-h6">
                      Item Information
                </div>

                <div class="row row_section">
                    <div class="card_section col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <div class="component_div">
                        <LabelInputHorizontal
                        :long_label="true"
                        :readonly="false"
                        :no_label="true"
                        :text="'Itemcode'"
                        v-model:pass_value="json_new.itemcode"
                        :dbComponentBehavior="dbComponentBehavior.text_required"
                        />
                    </div>
                    </div>

                    <div class="card_section col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <div class="component_div">
                        <LabelInputHorizontal
                        :long_label="true"
                        :readonly="false"
                        :no_label="true"
                        :text="'Itemlink'"
                        v-model:pass_value="json_new.itemlink"
                        :dbComponentBehavior="dbComponentBehavior.text_required"
                        />
                    </div>
                    </div>
                </div>

                <div class="row row_section">
                    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div class="component_div">
                        <LabelInputHorizontal
                        :readonly="false"
                        :no_label="true"
                        :text="'Description'"
                        v-model:pass_value="json_new.description_short"
                        :dbComponentBehavior="dbComponentBehavior.text_required"
                        />
                    </div>
                    </div>
                </div>

                <div class="row row_section">
                    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div class="component_div">
                        <LabelInputHorizontal
                        :readonly="false"
                        :no_label="true"
                        :text="'Detail Description'"
                        v-model:pass_value="json_new.description"
                        :dbComponentBehavior="dbComponentBehavior.text_required"
                        />
                    </div>
                    </div>
                </div>

                <div class="row row_section">
                    <div class="card_section col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <div class="component_div">
                        <LabelInputHorizontal
                        :long_label="true"
                        :readonly="false"
                        :no_label="true"
                        :text="'Pack Size'"
                        v-on:receiveChange="handleChangepacksize"
                        v-model:pass_value="json_new.packsize"
                        :dbComponentBehavior="dbComponentBehavior.text_right"
                        />
                    </div>
                    </div>

                    <div class="card_section col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <div class="component_div">
                        <LabelInputHorizontal
                        :long_label="true"
                        :readonly="false"
                        :no_label="true"
                        :text="'Pack Size(Ctn)'"
                        v-on:receiveChange="handleChangepacksize_ctn"
                        v-model:pass_value="json_new.packsize_ctn"
                        :dbComponentBehavior="dbComponentBehavior.text_right"
                        />
                    </div>
                    </div>
                </div>

                <div class="row row_section">
                    <div class="card_section col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <div class="component_div">
                        <LabelInputHorizontal
                        :long_label="true"
                        :readonly="false"
                        :no_label="true"
                        :text="'Article No'"
                        v-model:pass_value="json_new.article_no"
                        :dbComponentBehavior="dbComponentBehavior.text_required"
                        />
                    </div>
                    </div>

                    <div class="card_section col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <div class="component_div">
                        <LabelInputHorizontal
                        :long_label="true"
                        :readonly="false"
                        :no_label="true"
                        :text="'Barcode'"
                        v-model:pass_value="json_new.barcode"
                        :dbComponentBehavior="dbComponentBehavior.text_required"
                        />
                    </div>
                    </div>
                </div>

                <div v-if="$q.screen.width > 599" class="row row_section">
                    <div class="card_section col-xs-6 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                    <div class="component_div">
                        <LabelInputHorizontal
                        :longer_label="true"
                        :readonly="false"
                        :no_label="true"
                        :text="'Min Price'"
                        v-on:receiveChange="handleChangeminprice"
                        v-model:pass_value="json_new.min_price"
                        :dbComponentBehavior="dbComponentBehavior.text_right"
                        />
                    </div>
                    </div>

                    <div class="card_section col-xs-6 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                    <div class="component_div">
                        <LabelInputHorizontal
                        :longer_label="true"
                        :readonly="false"
                        :no_label="true"
                        :text="'Selling Price'"
                        v-on:receiveChange="handleChangesellingprice"
                        v-model:pass_value="json_new.selling_price"
                        :dbComponentBehavior="dbComponentBehavior.text_right"
                        />
                    </div>
                    </div>

                    <div class="card_section col-xs-6 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                    <div class="component_div">
                        <LabelInputHorizontal
                        :longer_label="true"
                        :readonly="false"
                        :no_label="true"
                        :text="'Listed Cost'"
                        v-on:receiveChange="handleChangelistedcost"
                        v-model:pass_value="json_new.listed_cost"
                        :dbComponentBehavior="dbComponentBehavior.text_right"
                        />
                    </div>
                    </div>
                </div>

                <div v-if="$q.screen.width > 599" class="row row_section">
                    <div class="card_section col-xs-6 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                    <div class="component_div">
                        <LabelInputHorizontal
                        :longer_label="true"
                        :readonly="false"
                        :no_label="true"
                        :text="'Average Cost'"
                        v-on:receiveChange="handleChangeaveragecost"
                        v-model:pass_value="json_new.average_cost"
                        :dbComponentBehavior="dbComponentBehavior.text_right"
                        />
                    </div>
                    </div>

                    <div class="card_section col-xs-6 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                    <div class="component_div">
                        <LabelInputHorizontal
                        :longer_label="true"
                        :readonly="false"
                        :no_label="true"
                        :text="'Last Cost'"
                        v-on:receiveChange="handleChangelastcost"
                        v-model:pass_value="json_new.last_cost"
                        :dbComponentBehavior="dbComponentBehavior.text_right"
                        />
                    </div>
                    </div>

                    <div class="card_section col-xs-6 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                    <div class="component_div">
                        <LabelInputHorizontal
                        :longer_label="true"
                        :readonly="false"
                        :no_label="true"
                        :text="'FIFO Cost'"
                        v-on:receiveChange="handleChangefifocost"
                        v-model:pass_value="json_new.fifo_cost"
                        :dbComponentBehavior="dbComponentBehavior.text_right"
                        />
                    </div>
                    </div>
                </div>

                <div v-if="$q.screen.width < 600" class="row row_section">
                    <div class="card_section col-xs-6 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                    <div class="component_div">
                        <LabelInputHorizontal
                        :longer_label="true"
                        :readonly="false"
                        :no_label="true"
                        :text="'Min Price'"
                        v-on:receiveChange="handleChangeminprice"
                        v-model:pass_value="json_new.min_price"
                        :dbComponentBehavior="dbComponentBehavior.text_right"
                        />
                    </div>
                    </div>

                    <div class="card_section col-xs-6 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                    <div class="component_div">
                        <LabelInputHorizontal
                        :longer_label="true"
                        :readonly="false"
                        :no_label="true"
                        :text="'Selling Price'"
                        v-on:receiveChange="handleChangesellingprice"
                        v-model:pass_value="json_new.selling_price"
                        :dbComponentBehavior="dbComponentBehavior.text_right"
                        />
                    </div>
                    </div>
                </div>

                <div v-if="$q.screen.width < 600" class="row row_section">
                    <div class="card_section col-xs-6 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                    <div class="component_div">
                        <LabelInputHorizontal
                        :longer_label="true"
                        :readonly="false"
                        :no_label="true"
                        :text="'Listed Cost'"
                        v-on:receiveChange="handleChangelistedcost"
                        v-model:pass_value="json_new.listed_cost"
                        :dbComponentBehavior="dbComponentBehavior.text_right"
                        />
                    </div>
                    </div>

                    <div class="card_section col-xs-6 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                    <div class="component_div">
                        <LabelInputHorizontal
                        :longer_label="true"
                        :readonly="false"
                        :no_label="true"
                        :text="'Average Cost'"
                        v-on:receiveChange="handleChangeaveragecost"
                        v-model:pass_value="json_new.average_cost"
                        :dbComponentBehavior="dbComponentBehavior.text_right"
                        />
                    </div>
                    </div>
                </div>

                <div v-if="$q.screen.width < 600" class="row row_section">
                    <div class="card_section col-xs-6 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                    <div class="component_div">
                        <LabelInputHorizontal
                        :longer_label="true"
                        :readonly="false"
                        :no_label="true"
                        :text="'Last Cost'"
                        v-on:receiveChange="handleChangelastcost"
                        v-model:pass_value="json_new.last_cost"
                        :dbComponentBehavior="dbComponentBehavior.text_right"
                        />
                    </div>
                    </div>

                    <div class="card_section col-xs-6 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                    <div class="component_div">
                        <LabelInputHorizontal
                        :longer_label="true"
                        :readonly="false"
                        :no_label="true"
                        :text="'FIFO Cost'"
                        v-on:receiveChange="handleChangefifocost"
                        v-model:pass_value="json_new.fifo_cost"
                        :dbComponentBehavior="dbComponentBehavior.text_right"
                        />
                    </div>
                    </div>
                </div>
              </div>

              <div class="upload_separator_first">
                <div class="row row_section text-h6">
                    Division Hierarchy
                </div>

                <div class="row row_section">
                    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div class="component_div">
                        <LabelSelectFilterHorizontal
                        style="margin-left: 0px;"
                        :readonly="false"
                        :no_label="true"
                        :text="'Division'"
                        v-model:pass_value="json_new.division_id"
                        :dbComponentBehavior="dbComponentBehavior.text_required"
                        :options="division_options"
                        v-on:receiveChange="handleChangeDivision"
                        />
                    </div>
                    </div>
                </div>

                <div class="row row_section">
                    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div class="component_div">
                        <LabelSelectFilterHorizontal
                        style="margin-left: 0px;"
                        :readonly="false"
                        :no_label="true"
                        :text="'Department'"
                        v-model:pass_value="json_new.department_id"
                        :dbComponentBehavior="dbComponentBehavior.text_required"
                        :options="department_options"
                        v-on:receiveChange="handleChangeDepartment"
                        />
                    </div>
                    </div>
                </div>

                <div class="row row_section">
                    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div class="component_div">
                        <LabelSelectFilterHorizontal
                        style="margin-left: 0px;"
                        :readonly="false"
                        :no_label="true"
                        :text="'Subdept'"
                        v-model:pass_value="json_new.subdept_id"
                        :dbComponentBehavior="dbComponentBehavior.text_required"
                        :options="subdept_options"
                        v-on:receiveChange="handleChangeSubdept"
                        />
                    </div>
                    </div>
                </div>

                <div class="row row_section">
                    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div class="component_div">
                        <LabelSelectFilterHorizontal
                        style="margin-left: 0px;"
                        :readonly="false"
                        :no_label="true"
                        :text="'Category'"
                        v-model:pass_value="json_new.category_id"
                        :dbComponentBehavior="dbComponentBehavior.text_required"
                        :options="category_options"
                        v-on:receiveChange="handleChangeCategory"
                        />
                    </div>
                    </div>
                </div>
              </div>

              <div class="upload_separator_second">
                <div class="row row_section text-h6">
                    Other Details
                </div>

                <div class="row row_section">
                    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div class="component_div">
                        <LabelSelectFilterHorizontal
                        style="margin-left: 0px;"
                        :readonly="false"
                        :no_label="true"
                        :text="'Manufacturer'"
                        v-model:pass_value="json_new.manufacturer_id"
                        :dbComponentBehavior="dbComponentBehavior.text_required"
                        :options="manufacturer_options"
                        v-on:receiveChange="handleChangeManufacturer"
                        />
                    </div>
                    </div>
                </div>

                <div class="row row_section">
                    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div class="component_div">
                        <LabelSelectFilterHorizontal
                        style="margin-left: 0px;"
                        :readonly="false"
                        :no_label="true"
                        :text="'Brand'"
                        v-model:pass_value="json_new.brand_id"
                        :dbComponentBehavior="dbComponentBehavior.text_required"
                        :options="brand_options"
                        v-on:receiveChange="handleChangeBrand"
                        />
                    </div>
                    </div>
                </div>

                <div class="row row_section">
                    <div class="card_section col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <div class="component_div">
                        <LabelSelectFilterHorizontal
                        :long_label="true"
                        style="margin-left: 0px;"
                        :readonly="false"
                        :no_label="true"
                        :text="'Weight Type'"
                        v-model:pass_value="json_new.weight_type_id"
                        :dbComponentBehavior="dbComponentBehavior.text_required"
                        :options="weight_type_options"
                        v-on:receiveChange="handleChangeWeightType"
                        />
                    </div>
                    </div>

                    <div class="card_section col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <div class="component_div">
                        <LabelSelectFilterHorizontal
                        :long_label="true"
                        style="margin-left: 0px;"
                        :readonly="false"
                        :no_label="true"
                        :text="'UOM'"
                        v-model:pass_value="json_new.uom_id"
                        :dbComponentBehavior="dbComponentBehavior.text_required"
                        :options="uom_options"
                        v-on:receiveChange="handleChangeUOM"
                        />
                    </div>
                    </div>
                </div>

                <div class="row row_section">
                  <div class="card_section col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <div class="component_div">
                        <LabelSelectFilterHorizontal
                        :long_label="true"
                        style="margin-left: 0px;"
                        :readonly="false"
                        :no_label="true"
                        :text="'Variant'"
                        v-model:pass_value="json_new.variant_id"
                        :dbComponentBehavior="dbComponentBehavior.text_required"
                        :options="variant_options"
                        v-on:receiveChange="handleChangeVariant"
                        />
                    </div>
                    </div>

                    <div class="card_section col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <div class="component_div">
                        <LabelSelectFilterHorizontal
                        :long_label="true"
                        style="margin-left: 0px;"
                        :readonly="false"
                        :no_label="true"
                        :text="'Size'"
                        v-model:pass_value="json_new.size_id"
                        :dbComponentBehavior="dbComponentBehavior.text_required"
                        :options="size_options"
                        v-on:receiveChange="handleChangeSize"
                        />
                    </div>
                    </div>
                </div>

                <div class="row row_section">
                    <div class="card_section col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <div class="component_div">
                        <LabelSelectFilterHorizontal
                        :long_label="true"
                        style="margin-left: 0px;"
                        :readonly="false"
                        :no_label="true"
                        :text="'Origin'"
                        v-model:pass_value="json_new.origin_id"
                        :dbComponentBehavior="dbComponentBehavior.text_required"
                        :options="origin_options"
                        v-on:receiveChange="handleChangeOrigin"
                        />
                    </div>
                    </div>
                </div>
              </div>

            </q-card-section>

            <q-card-actions align="right" class="q-pr-lg dialog_action">
                <!-- <Button
                class="button_save"
                v-close-popup
                :text="'CANCEL'"
                :type="'button'"
                /> -->
                <Button_icon :flat="true" :font_color="'black'" :color="'white'" :text="'CANCEL'" :outline="true" size="15px" class="custom_cancel_button" v-close-popup />

                <!-- <Button
                class="button_save"
                v-on:receiveChange="callUpdate()"
                :text="'SAVE'"
                :type="'button'"
                /> -->
                <Button_icon :flat="true" :font_color="'white'" :color="'#094161 '" :text="'SAVE'" :outline="false" size="15px" @click="callUpdate()"/>
            </q-card-actions>
        </q-card>
        </q-dialog>

        <q-dialog v-model="delete_confirmation" persistent position="top">
        <q-card style="width: 700px; max-width: 80vw;text-align:center;margin-top: 5%;">

            <q-card-section class="row items-center" style="padding-top:1%;padding-bottom:1%;border-bottom: 1px solid #a7bbcb;">
            <div class="text-h6">Confirmation</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup :disable="showAddLoading || showAddLoading2"/>
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

        <!-- save button (bottom-right) -->
        <!-- <div class="row row_section justify-end">
            <div class="card_section col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
            <div class="component_div text-right">
                <Button
                class="button_save"
                v-on:receiveChange="callUpdate()"
                :text="'APPLY'"
                :type="'button'"
                />
            </div>
            </div>
        </div> -->
        <!-- </q-card-section>
    </q-card> -->
    </q-form>
</template>

<script>
import Input from 'src/components/ERP/Base/Input';
import Label from 'src/components/ERP/Base/Label';
import LabelSelectVertical from'src/components/ERP/General/LabelSelectVertical' ;
import LabelInputHorizontal from'src/components/ERP/General/LabelInputHorizontal' ;
import Button_icon from 'src/components/ERP/Base/Button_icon'
import LabelSelectFilterHorizontal from'src/components/ERP/General/LabelSelectFilterHorizontal';
import LabelSelectHorizontal from'src/components/ERP/General/LabelSelectHorizontal' ;
import Table from 'src/components/ERP/Base/Table';
import TablePagination from 'src/components/ERP/Base/TablePagination';
import Select from 'src/components/ERP/Base/Select';
import Checkbox from 'src/components/ERP/Base/Checkbox';
import Button from 'src/components/Base/Button';
import Chip from 'src/components/ERP/Base/Chip';
import { Notify } from "quasar"
import { Loading, QSpinnerTail } from 'quasar'
import Title from 'src/components/ERP/General/Title'

export default{
    data(){
        return{
            company_guid: sessionStorage.getItem("company_guid") != "" && sessionStorage.getItem("company_guid") != "null" && sessionStorage.getItem("company_guid") != null ? sessionStorage.getItem("company_guid") : '',
            json_new: {},
            test_data: [],
            table_data_companyprofile: [],
            table_title:"HQ Location",
            table_data: [
                {
                    "action":"",
                    "Outlet":""
                }
            ],
            table_column: [
                {
                    name: 'action',
                    required: true,
                    label: 'Actions',
                    align: 'left',
                    sortable: false
                },
                {
                    "align": "center",
                    "field": "Outlet",
                    "sortable": true,
                    "name": "Outlet",
                    "label": "Location",
                    "format_child": "$",
                }
            ],
            test_column: [
                {
                    name: 'action',
                    required: true,
                    label: 'Action',
                    align: 'left',
                    sortable: false,
                    field: 'action',
                    format_child: '',
                    tooltip: '',
                    "headerStyle": "max-width: 70px; text-align: center;",
                },
                // {
                //     align: "left",
                //     sortable: false,
                //     name: "division_code",
                //     label: "Division Code",
                //     format_child: "",
                //     field: 'division_code',
                //     format_child: '',
                //     tooltip: '',
                //     headerStyle: 'text-align: center;'
                // },
                // {
                //     align: "left",
                //     sortable: false,
                //     name: "division_desc",
                //     label: "Division Desc",
                //     format_child: "",
                //     field: 'division_desc',
                //     format_child: '',
                //     tooltip: '',
                //     headerStyle: 'text-align: center;'
                // },
                // {
                //     align: "left",
                //     sortable: false,
                //     name: "dept_code",
                //     label: "Dept Code",
                //     format_child: "",
                //     field: 'dept_code',
                //     format_child: '',
                //     tooltip: '',
                //     headerStyle: 'text-align: center;'
                // },
                // {
                //     align: "left",
                //     sortable: false,
                //     name: "dept_desc",
                //     label: "Dept Desc",
                //     format_child: "",
                //     field: 'dept_desc',
                //     format_child: '',
                //     tooltip: '',
                //     headerStyle: 'text-align: center;'
                // },
                // {
                //     align: "left",
                //     sortable: false,
                //     name: "subdept_code",
                //     label: "Subdept Code",
                //     format_child: "",
                //     field: 'subdept_code',
                //     format_child: '',
                //     tooltip: '',
                //     headerStyle: 'text-align: center;'
                // },
                // {
                //     align: "left",
                //     sortable: false,
                //     name: "subdept_desc",
                //     label: "Subdept Desc",
                //     format_child: "",
                //     field: 'subdept_desc',
                //     format_child: '',
                //     tooltip: '',
                //     headerStyle: 'text-align: center;'
                // },
                // {
                //     align: "left",
                //     sortable: false,
                //     name: "category_code",
                //     label: "Category Code",
                //     format_child: "",
                //     field: 'category_code',
                //     format_child: '',
                //     tooltip: '',
                //     headerStyle: 'text-align: center;'
                // },
                // {
                //     align: "left",
                //     sortable: false,
                //     name: "category_desc",
                //     label: "Category Desc",
                //     format_child: "",
                //     field: 'category_desc',
                //     format_child: '',
                //     tooltip: '',
                //     headerStyle: 'text-align: center;'
                // },
                // {
                //     align: "left",
                //     sortable: false,
                //     name: "uom_code",
                //     label: "UOM Code",
                //     format_child: "",
                //     field: 'uom_code',
                //     format_child: '',
                //     tooltip: '',
                //     headerStyle: 'text-align: center;'
                // },
                // {
                //     align: "left",
                //     sortable: false,
                //     name: "uom_desc",
                //     label: "UOM Desc",
                //     format_child: "",
                //     field: 'uom_desc',
                //     format_child: '',
                //     tooltip: '',
                //     headerStyle: 'text-align: center;'
                // },
                // {
                //     align: "left",
                //     sortable: false,
                //     name: "manufacturer_code",
                //     label: "Manufacturer Code",
                //     format_child: "",
                //     field: 'manufacturer_code',
                //     format_child: '',
                //     tooltip: '',
                //     headerStyle: 'text-align: center;'
                // },
                // {
                //     align: "left",
                //     sortable: false,
                //     name: "manufacturer_desc",
                //     label: "Manufacturer Desc",
                //     format_child: "",
                //     field: 'manufacturer_desc',
                //     format_child: '',
                //     tooltip: '',
                //     headerStyle: 'text-align: center;'
                // },
                // {
                //     align: "left",
                //     sortable: false,
                //     name: "brand_code",
                //     label: "Brand Code",
                //     format_child: "",
                //     field: 'brand_code',
                //     format_child: '',
                //     tooltip: '',
                //     headerStyle: 'text-align: center;'
                // },
                // {
                //     align: "left",
                //     sortable: false,
                //     name: "brand_desc",
                //     label: "Brand Desc",
                //     format_child: "",
                //     field: 'brand_desc',
                //     format_child: '',
                //     tooltip: '',
                //     headerStyle: 'text-align: center;'
                // },
                // {
                //     align: "left",
                //     sortable: false,
                //     name: "variant_code",
                //     label: "Variant Code",
                //     format_child: "",
                //     field: 'variant_code',
                //     format_child: '',
                //     tooltip: '',
                //     headerStyle: 'text-align: center;'
                // },
                // {
                //     align: "left",
                //     sortable: false,
                //     name: "variant_desc",
                //     label: "Variant Desc",
                //     format_child: "",
                //     field: 'variant_desc',
                //     format_child: '',
                //     tooltip: '',
                //     headerStyle: 'text-align: center;'
                // },
                // {
                //     align: "left",
                //     sortable: false,
                //     name: "size_code",
                //     label: "Size Code",
                //     format_child: "",
                //     field: 'size_code',
                //     format_child: '',
                //     tooltip: '',
                //     headerStyle: 'text-align: center;'
                // },
                // {
                //     align: "left",
                //     sortable: false,
                //     name: "size_desc",
                //     label: "Size Desc",
                //     format_child: "",
                //     field: 'size_desc',
                //     format_child: '',
                //     tooltip: '',
                //     headerStyle: 'text-align: center;'
                // },
                // {
                //     align: "left",
                //     sortable: false,
                //     name: "origin_code",
                //     label: "Origin Code",
                //     format_child: "",
                //     field: 'origin_code',
                //     format_child: '',
                //     tooltip: '',
                //     headerStyle: 'text-align: center;'
                // },
                // {
                //     align: "left",
                //     sortable: false,
                //     name: "origin_desc",
                //     label: "Origin Desc",
                //     format_child: "",
                //     field: 'origin_desc',
                //     format_child: '',
                //     tooltip: '',
                //     headerStyle: 'text-align: center;'
                // },
                // {
                //     align: "left",
                //     sortable: false,
                //     name: "weight_type_code",
                //     label: "Weight Type Code",
                //     format_child: "",
                //     field: 'weight_type_code',
                //     format_child: '',
                //     tooltip: '',
                //     headerStyle: 'text-align: center;'
                // },
                // {
                //     align: "left",
                //     sortable: false,
                //     name: "weight_type_desc",
                //     label: "Weight Type Desc",
                //     format_child: "",
                //     field: 'weight_type_desc',
                //     format_child: '',
                //     tooltip: '',
                //     headerStyle: 'text-align: center;'
                // },
                {
                    align: "left",
                    sortable: true,
                    name: "itemcode",
                    label: "Itemcode",
                    format_child: "",
                    field: 'itemcode',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;'
                },
                {
                    align: "left",
                    sortable: false,
                    name: "itemlink",
                    label: "Itemlink",
                    format_child: "",
                    field: 'itemlink',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;'
                },
                {
                    align: "left",
                    sortable: false,
                    name: "description_short",
                    label: "Description",
                    format_child: "",
                    field: 'description_short',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;'
                },
                {
                    align: "left",
                    sortable: true,
                    name: "description",
                    label: "Detail Description",
                    format_child: "",
                    field: 'description',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;'
                },
                {
                    align: "left",
                    sortable: false,
                    name: "article_no",
                    label: "Article No",
                    format_child: "",
                    field: 'article_no',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;'
                },
                {
                    name: 'packsize',
                    required: true,
                    label: 'Pack Size',
                    align: 'right',
                    sortable: false,
                    field: 'packsize',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
                },
                {
                    name: 'packsize_ctn',
                    required: true,
                    label: 'Pack Size(Ctn)',
                    align: 'right',
                    sortable: false,
                    field: 'packsize_ctn',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                    sort: (a,b) => parseInt(a.replace(/[,.]/g, '')) -  parseInt(b.replace(/[,.]/g, ''))
                },
                {
                    name: 'created_at',
                    required: true,
                    label: 'Created At',
                    align: 'left',
                    sortable: false,
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
                    sortable: false,
                    field: 'created_by',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
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
                    headerStyle: 'text-align: center;',
                },
                {
                    name: 'updated_by',
                    required: true,
                    label: 'Updated By',
                    align: 'left',
                    sortable: false,
                    field: 'updated_by',
                    format_child: '',
                    tooltip: '',
                    headerStyle: 'text-align: center;',
                },
            ],
            showAddTask: false,
            ori_params: {},
            is_update: false,
            active_delete_json: {},
            delete_confirmation: false,
            path: this.$route.name,
            division_options: [],
            department_options: [],
            subdept_options: [],
            category_options: [],
            manufacturer_options: [],
            brand_options: [],
            weight_type_options: [],
            uom_options: [],
            variant_options: [],
            size_options: [],
            origin_options: [],
        }
    },
    components:{
        // Input,
        Label,
        // LabelSelectVertical,
        LabelInputHorizontal,
        LabelSelectFilterHorizontal,
        // LabelSelectHorizontal,
        // LabelDatepickerHorizontal,
        // LabelCheckboxHorizontal,
        // Table,
        // Select,
        // Checkbox,
        // Button,
        Button_icon,
        TablePagination,
        Chip,
        Title,
    },
    computed: {
        dbComponentBehavior() {
        return this.$store.getters['dbComponentBehavior/byLanguage']('erp')
        },
    },
    methods: {
        handleChangepacksize(newVal)
        {
          this.json_new.packsize = this.formatAmount(newVal,'$');
        },
        handleChangepacksize_ctn(newVal)
        {
          this.json_new.packsize_ctn = this.formatAmount(newVal,'qty');
        },
        handleChangeminprice(newVal)
        {
          this.json_new.min_price = this.formatAmount(newVal,'$');
        },
        handleChangesellingprice(newVal)
        {
          this.json_new.selling_price = this.formatAmount(newVal,'$');
        },
        handleChangelistedcost(newVal)
        {
          this.json_new.listed_cost = this.formatAmount(newVal,'$');
        },
        handleChangeaveragecost(newVal)
        {
          this.json_new.average_cost = this.formatAmount(newVal,'$');
        },
        handleChangelastcost(newVal)
        {
          this.json_new.last_cost = this.formatAmount(newVal,'$');
        },
        handleChangefifocost(newVal)
        {
          this.json_new.fifo_cost = this.formatAmount(newVal,'$');
        },
        handleChangeDivision()
        {
          this.json_new.department_id = '';
          this.json_new.subdept_id = '';
          this.json_new.category_id = '';
          this.getDepartmentoptions(this.json_new.division_id);
          this.subdept_options = [];
          this.category_options = [];
        },
        handleChangeDepartment()
        {
          this.json_new.subdept_id = '';
          this.json_new.category_id = '';
          this.getSubdeptoptions(this.json_new.department_id);
          this.subdept_options = [];
          this.category_options = [];
        },
        handleChangeSubdept()
        {
          this.json_new.category_id = '';
          this.getCategoryoptions(this.json_new.subdept_id);
          this.category_options = [];
        },
        handleChangeManufacturer()
        {
          this.json_new.brand_id = '';
          this.getBrandoptions(this.json_new.manufacturer_id);
          this.brand_options = [];
        },
        async getDivisionoptions(newVal)
        {
            var payload =
            {
                params: {
                    ordering: '-updated_at',
                    company_guid: this.company_guid
                }
            }

            await this.$store.dispatch('setup/trigger_get_mc_division', payload).then(() => {
                var data = JSON.parse(JSON.stringify(this.$store.getters['setup/get_mc_division']));
                var results = data.data.results;
                var ary = [];

                for(var i in results)
                {
                    var division = results[i];
                    var obj = {
                        label: division.code + ' - ' + division.description,
                        value: division.division_guid
                    }
                    ary.push(obj);
                }

                this.division_options = ary;
            });
        },
        async getDepartmentoptions(newVal)
        {
            var payload =
            {
                params: {
                    ordering: '-updated_at',
                    division_guid: newVal
                }
            }

            await this.$store.dispatch('setup/trigger_get_mc_department', payload).then(() => {
                var data = JSON.parse(JSON.stringify(this.$store.getters['setup/get_mc_department']));
                var results = data.data.results;
                var ary = [];

                for(var i in results)
                {
                    var department = results[i];
                    var obj = {
                        label: department.code + ' - ' + department.description,
                        value: department.department_guid
                    }
                    ary.push(obj);
                }

                this.department_options = ary;
            });
        },
        async getSubdeptoptions(newVal)
        {
            var payload =
            {
                params: {
                    ordering: '-updated_at',
                    department_guid: newVal
                }
            }

            await this.$store.dispatch('setup/trigger_get_mc_subdept', payload).then(() => {
                var data = JSON.parse(JSON.stringify(this.$store.getters['setup/get_mc_subdept']));
                var results = data.data.results;
                var ary = [];

                for(var i in results)
                {
                    var subdept = results[i];
                    var obj = {
                        label: subdept.code + ' - ' + subdept.description,
                        value: subdept.subdept_guid
                    }
                    ary.push(obj);
                }

                this.subdept_options = ary;
            });
        },
        async getCategoryoptions(newVal)
        {
            var payload =
            {
                params: {
                    ordering: '-updated_at',
                    subdept_guid: newVal
                }
            }

            await this.$store.dispatch('setup/trigger_get_mc_category', payload).then(() => {
                var data = JSON.parse(JSON.stringify(this.$store.getters['setup/get_mc_category']));
                var results = data.data.results;
                var ary = [];

                for(var i in results)
                {
                    var category = results[i];
                    var obj = {
                        label: category.code + ' - ' + category.description,
                        value: category.category_guid
                    }
                    ary.push(obj);
                }

                this.category_options = ary;
            });
        },
        async getManufactureroptions()
        {
            var payload =
            {
                params: {
                    ordering: '-updated_at',
                    company_guid: this.company_guid
                }
            }

            await this.$store.dispatch('setup/trigger_get_mc_manufacturer', payload).then(() => {
                var data = JSON.parse(JSON.stringify(this.$store.getters['setup/get_mc_manufacturer']));
                var results = data.data.results;
                var ary = [];

                for(var i in results)
                {
                    var manufacturer = results[i];
                    var obj = {
                        label: manufacturer.code + ' - ' + manufacturer.description,
                        value: manufacturer.manufacturer_guid
                    }
                    ary.push(obj);
                }

                this.manufacturer_options = ary;
            });
        },
        async getBrandoptions(newVal)
        {
            var payload =
            {
                params: {
                    ordering: '-updated_at',
                    manufacturer_guid: newVal
                }
            }

            await this.$store.dispatch('setup/trigger_get_mc_brand', payload).then(() => {
                var data = JSON.parse(JSON.stringify(this.$store.getters['setup/get_mc_brand']));
                var results = data.data.results;
                var ary = [];

                for(var i in results)
                {
                    var brand = results[i];
                    var obj = {
                        label: brand.code + ' - ' + brand.description,
                        value: brand.brand_guid
                    }
                    ary.push(obj);
                }

                this.brand_options = ary;
            });
        },
        async getWeightTypeoptions()
        {
            var payload =
            {
                params: {
                    ordering: '-updated_at',
                    company_guid: this.company_guid
                }
            }

            await this.$store.dispatch('setup/trigger_get_mc_weighing_type', payload).then(() => {
                var data = JSON.parse(JSON.stringify(this.$store.getters['setup/get_mc_weighing_type']));
                var results = data.data.results;
                var ary = [];

                for(var i in results)
                {
                    var weight_type = results[i];
                    var obj = {
                        label: weight_type.code + ' - ' + weight_type.description,
                        value: weight_type.weight_type_guid
                    }
                    ary.push(obj);
                }

                this.weight_type_options = ary;
            });
        },
        async getUOMoptions()
        {
            var payload =
            {
                params: {
                    ordering: '-updated_at',
                    company_guid: this.company_guid
                }
            }

            await this.$store.dispatch('setup/trigger_get_mc_uom', payload).then(() => {
                var data = JSON.parse(JSON.stringify(this.$store.getters['setup/get_mc_uom']));
                var results = data.data.results;
                var ary = [];

                for(var i in results)
                {
                    var uom = results[i];
                    var obj = {
                        label: uom.code + ' - ' + uom.description,
                        value: uom.uom_guid
                    }
                    ary.push(obj);
                }

                this.uom_options = ary;
            });
        },
        async getVariantoptions()
        {
            var payload =
            {
                params: {
                    ordering: '-updated_at',
                    company_guid: this.company_guid
                }
            }

            await this.$store.dispatch('setup/trigger_get_mc_variant', payload).then(() => {
                var data = JSON.parse(JSON.stringify(this.$store.getters['setup/get_mc_variant']));
                var results = data.data.results;
                var ary = [];

                for(var i in results)
                {
                    var variant = results[i];
                    var obj = {
                        label: variant.code + ' - ' + variant.description,
                        value: variant.variant_guid
                    }
                    ary.push(obj);
                }

                this.variant_options = ary;
            });
        },
        async getSizeoptions()
        {
            var payload =
            {
                params: {
                    ordering: '-updated_at',
                    company_guid: this.company_guid
                }
            }

            await this.$store.dispatch('setup/trigger_get_mc_size', payload).then(() => {
                var data = JSON.parse(JSON.stringify(this.$store.getters['setup/get_mc_size']));
                var results = data.data.results;
                var ary = [];

                for(var i in results)
                {
                    var size = results[i];
                    var obj = {
                        label: size.code + ' - ' + size.description,
                        value: size.size_guid
                    }
                    ary.push(obj);
                }

                this.size_options = ary;
            });
        },
        async getOriginoptions()
        {
            var payload =
            {
                params: {
                    ordering: '-updated_at',
                    company_guid: this.company_guid
                }
            }

            await this.$store.dispatch('setup/trigger_get_mc_origin', payload).then(() => {
                var data = JSON.parse(JSON.stringify(this.$store.getters['setup/get_mc_origin']));
                var results = data.data.results;
                var ary = [];

                for(var i in results)
                {
                    var origin = results[i];
                    var obj = {
                        label: origin.code + ' - ' + origin.description,
                        value: origin.origin_guid
                    }
                    ary.push(obj);
                }

                this.origin_options = ary;
            });
        },
        addButton: function(payload)
        {
            this.json_new = {};
            this.showAddTask = true;
            this.division_options = [];
            this.manufacturer_options = [];
            this.weight_type_options = [];
            this.uom_options = [];
            this.variant_options = [];
            this.size_options = [];
            this.origin_options = [];
            this.is_update = false;

            this.json_new.division_id = '';
            this.json_new.department_id = '';
            this.json_new.subdept_id = '';
            this.json_new.category_id = '';
            this.json_new.manufacturer_id = '';
            this.json_new.brand_id = '';
            this.json_new.weight_type_id = '';
            this.json_new.uom_id = '';
            this.json_new.size_id = '';
            this.json_new.variant_id = '';
            this.json_new.origin_id = '';
            this.getManufactureroptions(this.company_guid);
            this.getDivisionoptions(this.company_guid);
            this.getWeightTypeoptions(this.company_guid);
            this.getUOMoptions(this.company_guid);
            this.getVariantoptions(this.company_guid);
            this.getSizeoptions(this.company_guid);
            this.getOriginoptions(this.company_guid);
            this.department_options = [];
            this.subdept_options = [];
            this.category_options = [];
            this.brand_options = [];
        },
        async handleAction(payload){
            this.showLoading();
            this.json_new = {};

            var npayload = JSON.parse(JSON.stringify(payload));

            npayload.company_id = npayload.company_guid.company_guid;
            this.getDivisionoptions(npayload.company_id)
            npayload.division_id = npayload.category_guid.subdept_guid.department_guid.division_guid.division_guid;
            this.getDepartmentoptions(npayload.division_id)
            npayload.department_id = npayload.category_guid.subdept_guid.department_guid.department_guid;
            this.getSubdeptoptions(npayload.department_id)
            npayload.subdept_id = npayload.category_guid.subdept_guid.subdept_guid;
            this.getCategoryoptions(npayload.subdept_id)
            npayload.category_id = npayload.category_guid.category_guid;
            this.getManufactureroptions(npayload.company_id)
            npayload.manufacturer_id = npayload.brand_guid.manufacturer_guid.manufacturer_guid;
            this.getBrandoptions(npayload.manufacturer_id)
            npayload.brand_id = npayload.brand_guid.brand_guid;
            this.getWeightTypeoptions(npayload.company_id)
            npayload.weight_type_id = npayload.weight_type_guid.weight_type_guid;
            this.getUOMoptions(npayload.uom_id)
            npayload.uom_id = npayload.uom_guid.uom_guid;
            this.getVariantoptions(npayload.company_id)
            npayload.variant_id = npayload.variant_guid.variant_guid;
            this.getSizeoptions(npayload.company_id)
            npayload.size_id = npayload.size_guid.size_guid;
            this.getOriginoptions(npayload.company_id)
            npayload.origin_id = npayload.origin_guid.origin_guid;
            npayload.packsize = this.unformatAmount(npayload.packsize);
            npayload.packsize_ctn = this.unformatAmount(npayload.packsize_ctn);
            npayload.packsize = this.formatAmount(npayload.packsize,'$');
            npayload.packsize_ctn = this.formatAmount(npayload.packsize_ctn,'qty');

            var bpayload = {
              params:{
                item_guid: npayload.item_guid
              }
            }

            await this.$store.dispatch('item/trigger_get_ml_item_barcode', bpayload).then(async () => {
               var bdata = JSON.parse(JSON.stringify(this.$store.getters['item/get_ml_item_barcode']));
               npayload.barcode_guid = bdata.data.results[0].barcode_guid;
               npayload.barcode = bdata.data.results[0].barcode;
            });

            var ppayload = {
              params:{
                item_guid: npayload.item_guid
              }
            }

            await this.$store.dispatch('item/trigger_get_ml_item_pricing', ppayload).then(async () => {
               var pdata = JSON.parse(JSON.stringify(this.$store.getters['item/get_ml_item_pricing']));
               npayload.pricing_guid = pdata.data.results[0].pricing_guid;
               npayload.min_price = this.formatAmount(pdata.data.results[0].min_price,'$');
               npayload.selling_price = this.formatAmount(pdata.data.results[0].selling_price,'$');
               npayload.listed_cost = this.formatAmount(pdata.data.results[0].listed_cost,'$');
               npayload.average_cost = this.formatAmount(pdata.data.results[0].average_cost,'$');
               npayload.last_cost = this.formatAmount(pdata.data.results[0].last_cost,'$');
               npayload.fifo_cost = this.formatAmount(pdata.data.results[0].fifo_cost,'$');
            });

            this.showAddTask = true;
            setTimeout(()=>{
                this.json_new = npayload;
                this.hideLoading();
            },500)
            this.is_update = true;
        },
        async handleDelete(payload){
            var bpayload = {
              params:{
                item_guid: payload.item_guid
              }
            }

            await this.$store.dispatch('item/trigger_get_ml_item_barcode', bpayload).then(async () => {
                var bdata = JSON.parse(JSON.stringify(this.$store.getters['item/get_ml_item_barcode']));
                payload.barcode_guid = bdata.data.results[0].barcode_guid;
                payload.barcode = bdata.data.results[0].barcode;
            });

            await this.$store.dispatch('item/trigger_get_ml_item_pricing', bpayload).then(async () => {
                var bdata = JSON.parse(JSON.stringify(this.$store.getters['item/get_ml_item_pricing']));
                payload.pricing_guid = bdata.data.results[0].pricing_guid;
            });

            this.active_delete_json = payload;
            this.delete_confirmation = true;
        },
        async handleDeleteLine(){
            this.deleteLoading = true;

            var bdata = {};

            var bpayload = {
              barcode_guid: this.active_delete_json.barcode_guid
            }

            await this.$store.dispatch('item/trigger_delete_ml_item_barcode', bpayload).then(() => {
                bdata = JSON.parse(JSON.stringify(this.$store.getters['item/get_ml_item_barcode_status']));
            });

            var bstatus = bdata.status;

            if(bstatus == 'success')
            {
              var pdata = {};

              var ppayload = {
                pricing_guid: this.active_delete_json.pricing_guid
              }

              await this.$store.dispatch('item/trigger_delete_ml_item_pricing', ppayload).then(() => {
                  pdata = JSON.parse(JSON.stringify(this.$store.getters['item/get_ml_item_pricing_status']));
              });

              var pstatus = pdata.status;

              if(pstatus == 'success')
              {
                var data = {};

                var payload = {
                    item_guid: this.active_delete_json.item_guid
                }

                await this.$store.dispatch('item/trigger_delete_ml_itemmaster', payload).then(async () => {
                    data = JSON.parse(JSON.stringify(this.$store.getters['item/get_ml_itemmaster_status']));
                });

                var status = data.status;

                if(status == 'success')
                {
                  this.table_function(this.ori_params);
                  this.showNotify("positive","Delete successfully");
                  this.delete_confirmation = false;
                  this.deleteLoading = false;
                }
                else
                {
                  var error_response = data.response;
                  var show_error = "";

                  if(typeof error_response == 'object')
                  {
                      Object.keys(error_response).forEach((loop_index)=>{
                      if(loop_index !== 'status_code')
                      {
                          var temp_error = {};
                          var error_message = "";
                          Object.keys(error_response[loop_index]).forEach((header,cindex)=>{
                              error_message = error_response[loop_index][header];
                          });
                          temp_error = loop_index + " - " + error_message;
                          show_error += temp_error;
                      }
                      });//close foreach error message
                  }
                  else if(typeof error_response == 'string')
                  {
                      show_error = error_response
                  }

                  this.showNotify('negative', show_error);
                  this.deleteLoading = false;
                }
              }
              else
              {
                var error_response = data.response;
                var show_error = "";

                if(typeof error_response == 'object')
                {
                    Object.keys(error_response).forEach((loop_index)=>{
                    if(loop_index !== 'status_code')
                    {
                        var temp_error = {};
                        var error_message = "";
                        Object.keys(error_response[loop_index]).forEach((header,cindex)=>{
                            error_message = error_response[loop_index][header];
                        });
                        temp_error = loop_index + " - " + error_message;
                        show_error += temp_error;
                    }
                    });//close foreach error message
                }
                else if(typeof error_response == 'string')
                {
                    show_error = error_response
                }

                this.showNotify('negative', show_error);
                this.deleteLoading = false;
              }
            }
            else
            {
                var error_response = data.response;
                var show_error = "";

                if(typeof error_response == 'object')
                {
                    Object.keys(error_response).forEach((loop_index)=>{
                    if(loop_index !== 'status_code')
                    {
                        var temp_error = {};
                        var error_message = "";
                        Object.keys(error_response[loop_index]).forEach((header,cindex)=>{
                            error_message = error_response[loop_index][header];
                        });
                        temp_error = loop_index + " - " + error_message;
                        show_error += temp_error;
                    }
                    });//close foreach error message
                }
                else if(typeof error_response == 'string')
                {
                    show_error = error_response
                }

                this.showNotify('negative', show_error);
                this.deleteLoading = false;
            }
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
        showLoading()
        {
            // default options
            Loading.show()

            // fully customizable
            Loading.show({
                spinner: QSpinnerTail,
            // other props
            })
        },
        hideLoading()
        {
            setTimeout(function(){
                Loading.hide();
            },300);
        },
        callUpdate: function()
        {
            //do form verification before submit the form
            this.$refs['submit_form'].validate().then(valid => {

                if (!valid) {
                    //got field thats not fullfill standard
                    this.showNotify('negative', 'Please make sure all field is filled in.')
                }
                else
                {
                    //show loading icon
                    this.showLoading();
                    //already verified all the field than call save value
                    this.handleSave();
                }
            })
        },
        async handleSave()
        {
            this.showLoading();

            var itemcode = this.json_new.itemcode;
            var itemlink = this.json_new.itemlink;
            var description = this.json_new.description;
            var description_short = this.json_new.description_short;
            var article_no = this.json_new.article_no;
            var packsize = this.unformatAmount(this.json_new.packsize);
            var packsize_ctn = this.unformatAmount(this.json_new.packsize_ctn);
            var company_guid = this.company_guid;
            var category_guid = this.json_new.category_id;
            var brand_guid = this.json_new.brand_id;
            var weight_type_guid = this.json_new.weight_type_id;
            var uom_guid = this.json_new.uom_id;
            var variant_guid = this.json_new.variant_id;
            var size_guid = this.json_new.size_id;
            var origin_guid = this.json_new.origin_id;
            var barcode_guid = this.json_new.barcode_guid;
            var barcode = this.json_new.barcode;
            var min_price = this.unformatAmount(this.json_new.min_price);
            var selling_price = this.unformatAmount(this.json_new.selling_price);
            var listed_cost = this.unformatAmount(this.json_new.listed_cost);
            var average_cost = this.unformatAmount(this.json_new.average_cost);
            var last_cost = this.unformatAmount(this.json_new.last_cost);
            var fifo_cost = this.unformatAmount(this.json_new.fifo_cost);
            var updated_by = 'test';

            var template = {
                itemcode: itemcode,
                itemlink: itemlink,
                description: description,
                description_short: description_short,
                article_no: article_no,
                packsize: packsize,
                packsize_ctn: packsize_ctn,
                company_guid: company_guid,
                category_guid: category_guid,
                brand_guid: brand_guid,
                weight_type_guid: weight_type_guid,
                uom_guid: uom_guid,
                variant_guid: variant_guid,
                size_guid: size_guid,
                origin_guid: origin_guid,
                updated_by: updated_by,
            };

            var payload = {};
            var data = {};

            if(!this.is_update)
            {
                payload = template;

                await this.$store.dispatch('item/trigger_create_ml_itemmaster', payload).then(() => {
                    data = JSON.parse(JSON.stringify(this.$store.getters['item/get_ml_itemmaster_status']));
                });
            }
            else if(this.is_update)
            {
                var pass_json = template;

                payload = {
                    item_guid: this.json_new.item_guid,
                    pass_json: pass_json
                }

                await this.$store.dispatch('item/trigger_update_ml_itemmaster', payload).then(() => {
                    data = JSON.parse(JSON.stringify(this.$store.getters['item/get_ml_itemmaster_status']));
                });
            }

            var status = data.status;
            var bpayload = {};
            var bdata = {};

            if(status == 'success')
            {
                var ppayload = {};
                var pdata = {};

                if(!this.is_update)
                {
                  bpayload = {
                    item_guid: data.response.item_guid,
                    barcode: barcode,
                    updated_by: updated_by
                  }

                  await this.$store.dispatch('item/trigger_create_ml_item_barcode', bpayload).then(() => {
                      bdata = JSON.parse(JSON.stringify(this.$store.getters['item/get_ml_item_barcode_status']));
                  });

                  var bstatus = bdata.status;

                  if(bstatus == 'success')
                  {
                    ppayload = {
                      item_guid: data.response.item_guid,
                      min_price: min_price,
                      selling_price: selling_price,
                      listed_cost: listed_cost,
                      average_cost: average_cost,
                      last_cost: last_cost,
                      fifo_cost: fifo_cost,
                      updated_by: updated_by
                    }

                    await this.$store.dispatch('item/trigger_create_ml_item_pricing', ppayload).then(() => {
                        pdata = JSON.parse(JSON.stringify(this.$store.getters['item/get_ml_item_pricing_status']));
                    });

                    var pstatus = pdata.status;

                    if(pstatus == 'success')
                    {
                      this.showNotify('positive', 'Create Successfully.');
                    }
                    else
                    {
                      var error_response = data.response;
                      var show_error = "";

                      if(typeof error_response == 'object')
                      {
                          Object.keys(error_response).forEach((loop_index)=>{
                          if(loop_index !== 'status_code')
                          {
                              var temp_error = {};
                              var error_message = "";
                              Object.keys(error_response[loop_index]).forEach((header,cindex)=>{
                                  error_message = error_response[loop_index][header];
                              });
                              temp_error = loop_index + " - " + error_message;
                              show_error += temp_error;
                          }
                          });//close foreach error message
                      }
                      else if(typeof error_response == 'string')
                      {
                          show_error = error_response
                      }

                      this.showNotify('negative', show_error);
                      this.hideLoading();
                    }
                  }
                  else
                  {
                      var error_response = data.response;
                      var show_error = "";

                      if(typeof error_response == 'object')
                      {
                          Object.keys(error_response).forEach((loop_index)=>{
                          if(loop_index !== 'status_code')
                          {
                              var temp_error = {};
                              var error_message = "";
                              Object.keys(error_response[loop_index]).forEach((header,cindex)=>{
                                  error_message = error_response[loop_index][header];
                              });
                              temp_error = loop_index + " - " + error_message;
                              show_error += temp_error;
                          }
                          });//close foreach error message
                      }
                      else if(typeof error_response == 'string')
                      {
                          show_error = error_response
                      }

                      this.showNotify('negative', show_error);
                      this.hideLoading();
                  }
                }
                else if(this.is_update)
                {
                  var bpass_json = {
                    item_guid: this.json_new.item_guid,
                    barcode: barcode,
                    updated_by: updated_by
                  };

                  bpayload = {
                    barcode_guid: barcode_guid,
                    pass_json: bpass_json,
                  }

                  await this.$store.dispatch('item/trigger_update_ml_item_barcode', bpayload).then(() => {
                      bdata = JSON.parse(JSON.stringify(this.$store.getters['item/get_ml_item_barcode_status']));
                  });

                  var bstatus = bdata.status;

                  if(bstatus == 'success')
                  {
                    var ppass_json = {
                      min_price: min_price,
                      selling_price: selling_price,
                      listed_cost: listed_cost,
                      average_cost: average_cost,
                      last_cost: last_cost,
                      fifo_cost: fifo_cost,
                      updated_by: updated_by
                    }

                    ppayload = {
                      pricing_guid: this.json_new.pricing_guid,
                      pass_json: ppass_json
                    }

                    await this.$store.dispatch('item/trigger_update_ml_item_pricing', ppayload).then(() => {
                        pdata = JSON.parse(JSON.stringify(this.$store.getters['item/get_ml_item_pricing_status']));
                    });

                    var pstatus = pdata.status;

                    if(pstatus == 'success')
                    {
                      this.showNotify('positive', 'Update Successfully.');
                    }
                    else
                    {
                      var error_response = data.response;
                      var show_error = "";

                      if(typeof error_response == 'object')
                      {
                          Object.keys(error_response).forEach((loop_index)=>{
                          if(loop_index !== 'status_code')
                          {
                              var temp_error = {};
                              var error_message = "";
                              Object.keys(error_response[loop_index]).forEach((header,cindex)=>{
                                  error_message = error_response[loop_index][header];
                              });
                              temp_error = loop_index + " - " + error_message;
                              show_error += temp_error;
                          }
                          });//close foreach error message
                      }
                      else if(typeof error_response == 'string')
                      {
                          show_error = error_response
                      }

                      this.showNotify('negative', show_error);
                      this.hideLoading();
                    }
                  }
                  else
                  {
                      var error_response = data.response;
                      var show_error = "";

                      if(typeof error_response == 'object')
                      {
                          Object.keys(error_response).forEach((loop_index)=>{
                          if(loop_index !== 'status_code')
                          {
                              var temp_error = {};
                              var error_message = "";
                              Object.keys(error_response[loop_index]).forEach((header,cindex)=>{
                                  error_message = error_response[loop_index][header];
                              });
                              temp_error = loop_index + " - " + error_message;
                              show_error += temp_error;
                          }
                          });//close foreach error message
                      }
                      else if(typeof error_response == 'string')
                      {
                          show_error = error_response
                      }

                      this.showNotify('negative', show_error);
                      this.hideLoading();
                  }
                }
                this.showAddTask = false;
                this.table_function(this.ori_params);
                this.hideLoading();
            }
            else
            {
                var error_response = data.response;
                var show_error = "";

                if(typeof error_response == 'object')
                {
                    Object.keys(error_response).forEach((loop_index)=>{
                    if(loop_index !== 'status_code')
                    {
                        var temp_error = {};
                        var error_message = "";
                        Object.keys(error_response[loop_index]).forEach((header,cindex)=>{
                            error_message = error_response[loop_index][header];
                        });
                        temp_error = loop_index + " - " + error_message;
                        show_error += temp_error;
                    }
                    });//close foreach error message
                }
                else if(typeof error_response == 'string')
                {
                    show_error = error_response
                }

                this.showNotify('negative', show_error);
                this.hideLoading();
            }
        },
        // table server side
        handleTableChange: function(newVal)
        {
            var new_params = this.$pluginsTableParams(newVal)

            var payload = {
                params : new_params
            };

            this.ori_params = payload;

            this.table_function(payload);
        },
        async table_function(payload){
            if(payload.params.ordering == "")
            {
                payload.params.ordering = "-updated_at"
            }

            payload.params.company_guid = this.company_guid;

            await this.$store.dispatch('item/trigger_get_ml_itemmaster', payload).then(() => {
                var data = JSON.parse(JSON.stringify(this.$store.getters['item/get_ml_itemmaster']));
                var results = data.data.results;
                for(var i in results)
                {
                  var obj = results[i];
                  obj.division_code = obj.category_guid.subdept_guid.department_guid.division_guid.code;
                  obj.division_desc = obj.category_guid.subdept_guid.department_guid.division_guid.description;
                  obj.dept_code = obj.category_guid.subdept_guid.department_guid.code;
                  obj.dept_desc = obj.category_guid.subdept_guid.department_guid.description;
                  obj.subdept_code = obj.category_guid.subdept_guid.code;
                  obj.subdept_desc = obj.category_guid.subdept_guid.description;
                  obj.category_code = obj.category_guid.code;
                  obj.category_desc = obj.category_guid.description;
                  obj.uom_code = obj.uom_guid.code;
                  obj.uom_desc = obj.uom_guid.description;
                  obj.manufacturer_code = obj.brand_guid.manufacturer_guid.code;
                  obj.manufacturer_desc = obj.brand_guid.manufacturer_guid.description;
                  obj.brand_code = obj.brand_guid.code;
                  obj.brand_desc = obj.brand_guid.description;
                  obj.variant_code = obj.variant_guid.code;
                  obj.variant_desc = obj.variant_guid.description;
                  obj.size_code = obj.size_guid.code;
                  obj.size_desc = obj.size_guid.description;
                  obj.origin_code = obj.origin_guid.code;
                  obj.origin_desc = obj.origin_guid.description;
                  obj.weight_type_code = obj.weight_type_guid.code;
                  obj.weight_type_desc = obj.weight_type_guid.description;
                  obj.packsize = this.formatAmount(obj.packsize,'$');
                  obj.packsize_ctn = this.formatAmount(obj.packsize_ctn,'qty');
                }

                this.test_data = data;
            });
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
    },
    async created() {}
}


</script>

<style scoped>
.upload_separator_first
{
    border-bottom: 1px solid #DEE1E6;
    margin: 10px;
    /* padding-top: 10px; */
    padding-bottom: 10px;
}

.upload_separator_second
{
    margin: 10px;
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
.custom_cancel_button
{
    border: 1px solid black;
}
.card_section {
    padding: 0px 0px 0px 0px;
}

.row_section
{
    padding-left: 10px;
    right: 10px;
}

.row_section_dialog
{
    padding: 10px;
    right: 10px;
}
.table_wrapper
{
    padding-left: 0px;
    padding-right: 5px;
}
</style>
