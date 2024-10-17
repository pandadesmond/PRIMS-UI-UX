<template>
  <div class="row col-12">
    <div v-if="title_section == 'GRN'" class=" col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
      <!-- <Label class="custom_label" :text="SectionTitle" /> -->
      <div class="row "> <!--card_border -->
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-pb-md">
        <span class="dialog_font">{{ SectionTableTitle }}</span>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <div class=" q-pb-md row items-center">
            <div class="input-container row col-12">
        <!-- <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 text-right q-pr-xs q-pt-xs">
          <span style="color:red">Gross</span>
          </div> -->
            <div class="div-container col-xs-12 col-sm-4 col-md-4 col-lg-4 col-xl-4 q-pr-md">
            <Input
                label="Gross"
                class="surcharge_custom"
                :autofocusclick="true"
                :no_label="true"
                :readonly="true"
                v-on:change="handleGrossAmountChange"
                v-model="gross_amount"
                :dbComponentBehavior="dbComponentBehavior.text_right" />
            </div><!-- GROSS -->
              <!-- <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div class="row justify-end">
          <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 text-right q-pr-xs q-pt-xs">
              <span style="color:red">Nett</span>
            </div> -->
            <div class="div-container col-xs-12 col-sm-4 col-md-4 col-lg-4 col-xl-4 q-pl-md">
            <Input
                class="surcharge_custom"
                label="Nett"
                :autofocusclick="true"
                :no_label="true"
                :readonly="true"
                v-on:change="handleNettAmountChange"
                v-model="nett_amount"
                :dbComponentBehavior="dbComponentBehavior.text_right" />
            </div> <!--Nett -->
        <!-- </div> -->
          
          <div class="div-container col-xs-12 col-sm-4 col-md-4 col-lg-4 col-xl-4 " align="right">
          <Button_icon :style="{ visibility: add_button ? 'visible' : 'hidden' }" :disabled="readonly_button" :flat="true" :icon="'add'" v-on:receiveClick="handleAdd()" :font_color="'white'" :color="'#069857'" :text="$language('D0024')" :outline="false" size="12px" class="add_custom q-pr-sm"/>
        </div>
        </div>
      </div>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <q-table
           style="height: 250px"
          :hide-bottom="hide_footer"
          separator="cell"
          :flat="flat_status"
          :bordered="bordered_status"
          class="main_table my_sticky_header_table"
          :title="title"
          :rows="rows"
          :columns="columns"
          row-key="name"
          :pagination="{ rowsPerPage: 999999 }"
          @request="onRequest"
          hide-pagination
          :loading="loading">

          <template v-if="top_button" v-slot:top-right>
            <Button_icon v-if="!top_button_dropdown" :disabled="readonly_button" :flat="true" :icon="'add'" v-on:receiveClick="handleAdd()" :font_color="'white'" :color="'green'" :text="'Add'" :outline="false" size="12px" class="q-pr-sm"/>

            <q-btn-dropdown
              v-if="top_button_dropdown"
              no-caps
              dense
              split
              icon="add"
              flat
              style="background-color: #228026; color: white"
              label="Add"
              size="12px"
              @click="handleAdd()"
            >
              <q-list>
                <q-item dense clickable v-close-popup @click="supplier_item_list">
                  <q-item-section>
                    <q-item-label>Supplier Item List</q-item-label>
                  </q-item-section>
                </q-item>

              </q-list>
            </q-btn-dropdown>
          </template>


          <template v-slot:body-cell-build_into_cost="props">
              <q-td :style="`text-align:${props.col.align}`">
                <Checkbox
                  size="xs"
                  :disable="true"
                  :no_label="true"
                  v-model="props.row.build_into_cost"
                  :dbComponentBehavior="dbComponentBehavior.text"
                  v-on:receiveChangenewVal="receiveChangetdCheckbox"
                  :table="true"
                  />
              </q-td>
          </template>

          <template v-slot:body-cell-code="props">
              <q-td :style="`text-align:${props.col.align}`">
                <div class="row">
                  <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 q-pl-xs">
                   <q-icon name="edit"  size="xs" style="margin-top:-3px"/>
                  </div>
                  <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                   {{ props.row.code }}
                  </div>
                </div>
                <q-popup-edit v-model="props.row.code" v-slot="scope" :disable="disableTdClick">
                  <Select
                    :readonly="disableTdCodeClick"
                    :no_label="true"
                    v-model="scope.value"
                    :dbComponentBehavior="dbComponentBehavior.text"
                    :options="optionsCode"
                    v-on:receiveChange="handleChangetdCodeSelect($event,'code',index,props, scope)"
                    @keyup.enter="scope.set"
                  />
                  <!-- <q-input  v-model="scope.value"  dense autofocus counter @keyup.enter="scope.set" /> -->
                </q-popup-edit>
                <!-- <Input
                  :autofocusclick="true"
                  :no_label="true"
                  :readonly="false"
                  v-on:change="handleChangetdInput"
                  v-model="props.row.code"
                  :dbComponentBehavior="dbComponentBehavior.text" /> -->

              </q-td>
          </template>

          <template v-slot:body-cell-dn="props">
              <q-td :style="`text-align:${props.col.align}`">
                <Checkbox
                  size="xs"
                  :disable="true"
                  :no_label="true"
                  v-model="props.row.dn"
                  :dbComponentBehavior="dbComponentBehavior.text"
                  v-on:receiveChangenewVal="receiveChangetdCheckbox"
                  :table="true"
                  />
              </q-td>
          </template>


          <template v-slot:body-cell-type="props">
              <q-td :style="`text-align:${props.col.align}`">
                <!-- <q-select filled  v-model="props.row.type" :options="options" dense denseOpts/> -->
                <Select
                    :readonly="disableTdClick"
                    :no_label="true"
                    v-model="props.row.type"
                    :dbComponentBehavior="dbComponentBehavior.text"
                    :options="optionsFn"
                    v-on:receiveChange="handleChangetdSelect"
                  />
                <!-- <Checkbox
                  size="xs"
                  :disable="true"
                  :no_label="true"
                  v-model="props.row.value"
                  :dbComponentBehavior="dbComponentBehavior.text"
                  v-on:receiveChangenewVal="receiveChangetdCheckbox"
                  :table="true"
                  :true-value="1"
                  :false-value="0"
                  /> -->
              </q-td>
          </template>


          <template v-slot:body-cell-value="props">
              <q-td :style="`text-align:${props.col.align}`"  @click="handleTdClick(props.row.value, header, props.row, 'xxinputRef')">
                <div class="row">
                  <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 q-pl-xs">
                    <q-icon name="edit"  size="xs" style="margin-top:-3px"/>
                  </div>
                  <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
                    {{ props.row.value }}
                  </div>
                </div>
                <q-popup-edit v-model="props.row.value" v-slot="scope" :disable="disableTdClick">

              <q-input type="number" input-style="text-align: right;" v-model="newValue" dense autofocus counter @keyup.enter="handlePopupSave(value,'value',index,props, scope)" />
            </q-popup-edit>

              </q-td>
          </template>
          <template v-slot:body-cell-value_after="props">
              <q-td :style="`text-align:${props.col.align}`">
                {{ calculateValueAfter(props.row) }}

              </q-td>
          </template>
          <template v-slot:body-cell-prorate_by_unit_volume="props">
              <q-td :style="`text-align:${props.col.align}`">
                <Checkbox
                  size="xs"
                  :disable="disableTdCheckbox"
                  :no_label="true"
                  v-model="props.row.prorate_by_unit_volume"
                  :dbComponentBehavior="dbComponentBehavior.text"
                  v-on:receiveChangenewVal="receiveChangetdCheckbox"
                  :table="true"
                  />
              </q-td>
          </template>
<!--
          <template v-slot:body-cell-select="props">
              <q-td :style="`text-align:${props.col.align}`">
                <Checkbox
                  size="xs"
                  :disable="false"
                  :no_label="true"
                  v-model="props.row.select"
                  :dbComponentBehavior="dbComponentBehavior.text"
                  v-on:receiveChangenewVal="receiveChangetdCheckbox"
                  :table="true"
                  />
              </q-td>
          </template> -->

          <template v-slot:body-cell-action="props">
              <q-td style="text-align:center">
                <Button_icon :disabled="readonly_action_btn" :icon="'edit_note'" :color="'#094161'"  :outline="false" size="12px" v-on:click="edit(props.row)" v-if="edit_button" class="q-mr-sm" />
                <Button_icon :disabled="readonly_action_btn" :icon="'delete'" :color="'negative'" :outline="false" size="12px" v-on:click="remove(props.row)" v-if="delete_button" class="q-mr-xs" />
              </q-td>
          </template>
          <template v-slot:bottom-row="props">
            <q-tr v-if="rows.length <= 0 && !forceLoading">
                <q-td colspan="100%" class="text-center">
                    <span style="font-size:14px; color:#8B8D8B;">
                       No data to display
                    </span>
                </q-td>
            </q-tr>
            <q-tr  v-if="rows.length > 0" class="table_footer">
                <q-td v-for="table_footer_details in props.cols" :class="table_footer_details.classes" :style="'text-align:'+table_footer_details.align+';'" :key="table_footer_details" >
                  <div v-if="table_footer_details.name === 'surcharge_disc_value'">
                    <!-- {{ table_footer_details.value }} -->
                     Total Disc
                   </div>
                   <div v-if="table_footer_details.name === 'Value_Calculated'">
                    <!-- {{ table_footer_details.value }} -->
                    {{totalDisc}}
                    <!-- {{ calculateValueForBottomRow() }} -->
                   </div>
                </q-td>
            </q-tr>
        </template>
        </q-table>
      </div>
    </div>
    </div>
<!-- PURCHASE ORDER SURCHARGE -->
    <div v-if="title_section == 'PO'" class="row col-12">
      <!-- <Label class="custom_label" :text="SectionTitle" /> -->
      <div class="row col-12 card_border" style="padding-top: 16px">
      
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <!-- <div class="bg-yellow row col-12"> -->
          <!-- <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 text-right q-pr-xs q-pt-xs">
            <span style="color:red">Gross</span>
            </div> -->
          <!-- <div class=" row bg-green col-12 justify-between"> -->
  <!-- Gross -->
            <div class="q-pr-xs row items-center">
            <div class="input-container row col-12">
              <div class="div-container col-xs-12 col-sm-4 col-md-4 col-lg-4 col-xl-4 q-pr-md">
              <!-- <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-md"> -->
                <Input
                    class="surcharge_custom"
                    label="Gross"
                    :label-style="{ color: 'red' }"
                    :autofocusclick="true"
                    :no_label="true"
                    :readonly="true"
                    v-on:change="handleGrossAmountChange"
                    v-model="gross_amount"
                    :dbComponentBehavior="dbComponentBehavior.text_right" />
              </div>
              <!-- Total (Exc) -->
              <!-- <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 text-right q-pr-xs q-pt-xs">
                  <span style="color:red">Total (Exc)</span>
                </div> -->
            <div class="div-container col-xs-12 col-sm-4 col-md-4 col-lg-4 col-xl-4 q-pl-md">
            <Input
                class="surcharge_custom"
                label="Total (Exc)"
                :label-style="{ color: 'red' }"
                :autofocusclick="true"
                :no_label="true"
                :readonly="true"
                v-on:change="handleNettAmountChange"
                v-model="nett_amount"
                :dbComponentBehavior="dbComponentBehavior.text_right" />
            </div>
            <div class="div-container col-xs-12 col-sm-4 col-md-4 col-lg-4 col-xl-4 " align="right">
            <Button_icon :style="{ visibility: add_button ? 'visible' : 'hidden' }" :disabled="readonly_button" :flat="true" :icon="'add'" v-on:receiveClick="handleAdd()" :font_color="'white'" :color="'#069857'" :text="$language('D0024')" :outline="false" size="12px" class="add_custom"/>
          <!-- </div> -->
            </div>
            </div>
            </div>
        </div>
        <!-- </div> -->

      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <q-table
          :hide-bottom="hide_footer"
          separator="cell"
          :flat="flat_status"
          :bordered="bordered_status"
          class="main_table my_sticky_header_table"
          :title="title"
          :rows="rows"
          :columns="columns"
          row-key="sequence"
          :pagination="{ rowsPerPage: 999999 }"
          @request="onRequest"
          hide-pagination
          :loading="loading">

          <template v-if="top_button" v-slot:top-right>
            <Button_icon v-if="!top_button_dropdown" :disabled="readonly_button" :flat="true" :icon="'add'" v-on:receiveClick="handleAdd()" :font_color="'white'" :color="'green'" :text="'Add'" :outline="false" size="12px" class="q-pr-sm"/>

            <q-btn-dropdown
              v-if="top_button_dropdown"
              no-caps
              dense
              split
              icon="add"
              flat
              style="background-color: #228026; color: white"
              label="Add"
              size="12px"
              @click="handleAdd()"
            >
              <q-list>
                <q-item dense clickable v-close-popup @click="supplier_item_list">
                  <q-item-section>
                    <q-item-label>Supplier Item List</q-item-label>
                  </q-item-section>
                </q-item>

              </q-list>
            </q-btn-dropdown>
          </template>


          <template v-slot:body-cell-build_into_cost="props">
              <q-td :style="`text-align:${props.col.align}`">
                <Checkbox
                  size="xs"
                  :disable="true"
                  :no_label="true"
                  v-model="props.row.build_into_cost"
                  :dbComponentBehavior="dbComponentBehavior.text"
                  v-on:receiveChangenewVal="receiveChangetdCheckbox"
                  :table="true"
                  />
              </q-td>
          </template>

          <!-- <template v-slot:body-cell-Code="props">
              <q-td :style="`text-align:${props.col.align}`">
                <div class='row'>
                  <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 q-pl-xs">
                    <q-icon name="edit"  size="xs" style="margin-top:-3px"/>
                  </div>
                  <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                    {{ props.row.Code }}
                  </div>
                </div> -->

                <!-- <q-popup-edit v-model="props.row.Code" v-slot="scope" :disable="disableTdClick" class="q-pa-md" style="width:18%">
                  <Select
                    :readonly="disableTdCodeClick"
                    :no_label="true"
                    v-model="scope.value"
                    :dbComponentBehavior="dbComponentBehavior.text"
                    :options="optionsCode"
                    v-on:receiveChange="handleChangetdCodeSelect($event,'code',index,props, scope)"
                    @keyup.enter="scope.set"
                  /> -->
                  <!-- <q-select outlined  v-model="scope.value" :options="optionsCode"  autofocus counter /> -->
                  <!-- <q-input  v-model="scope.value"  dense autofocus counter @keyup.enter="scope.set" /> -->
                <!-- </q-popup-edit> -->
                <!-- <Input
                  :autofocusclick="true"
                  :no_label="true"
                  :readonly="false"
                  v-on:change="handleChangetdInput"
                  v-model="props.row.code"
                  :dbComponentBehavior="dbComponentBehavior.text" /> -->

              <!-- </q-td>
          </template> -->

          <template v-slot:body-cell-dn="props">
              <q-td :style="`text-align:${props.col.align}`">
                <Checkbox
                  size="xs"
                  :disable="true"
                  :no_label="true"
                  v-model="props.row.dn"
                  :dbComponentBehavior="dbComponentBehavior.text"
                  v-on:receiveChangenewVal="receiveChangetdCheckbox"
                  :table="true"
                  />
              </q-td>
          </template>


          <template v-slot:body-cell-disctype="props">
              <q-td :style="`text-align:${props.col.align}`">
                 {{ props.row.disctype }}
                <!-- <q-select filled  v-model="props.row.type" :options="options" dense denseOpts/> -->
                <!-- <Input
                    :autofocusclick="true"
                    :no_label="true"
                    :readonly="false"
                    v-on:change="handleChangetdSelect"
                    v-model="props.row.disctype"
                    :dbComponentBehavior="dbComponentBehavior.text" /> -->
              </q-td>
          </template>

<!--
          <template v-slot:body-cell-surcharge_disc_value="props">
              <q-td  style="cursor: pointer;" :style="`text-align:${props.col.align}`">
                <div class='row'>
                  <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 q-pl-xs">
                    <q-icon name="edit"  size="xs" style="margin-top:-3px"/>
                  </div>
                  <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
                   {{ props.row.surcharge_disc_value }}
                  </div>
                </div>
                <q-popup-edit v-model="props.row.surcharge_disc_value" v-slot="scope" :disable="disableTdClick" buttons >
                   <q-input type="number" min="0" fill-mask="0" mask="#.##" reverse-fill-mask input-style="text-align: right;" v-model.number="props.row.surcharge_disc_value" dense autofocus  @change="handleChangeInputValue" @keyup.enter="scope.set" />
                </q-popup-edit>

              </q-td>
          </template> -->



          <template v-slot:body-cell-action="props">
              <q-td style="text-align:center">
                <Button_icon :disabled="readonly_action_btn" :icon="'edit_note'" :color="'#094161'"  :outline="false" size="12px" v-on:click="edit(props.row)" v-if="edit_button" class="q-mr-sm" />
                <Button_icon :disabled="readonly_action_btn" :icon="'delete'" :color="'negative'" :outline="false" size="12px" v-on:click="remove(props.row)" v-if="delete_button" class="q-mr-xs" />
              </q-td>
          </template>
          <template v-slot:bottom-row="props" >
            <q-tr v-if="rows.length <= 0 && !forceLoading">
                <q-td colspan="100%" class="text-center">

                    <span style="font-size:14px; color:#8B8D8B;">
                       No data to display
                    </span>
                </q-td>
            </q-tr>
            <q-tr class="table_footer" v-if="rows.length > 0">
                <q-td v-for="table_footer_details in props.cols" :class="table_footer_details.classes" :style="'text-align:'+table_footer_details.align+';'" :key="table_footer_details">
                  <div v-if="table_footer_details.name === 'surcharge_disc_value'">
                    <!-- {{ table_footer_details.value }} -->
                     Total Disc
                   </div>
                  <div v-if="table_footer_details.name === 'Value_Calculated'">
                    <!-- {{ table_footer_details.value }} -->
                    {{ totalDisc }}
                    <!-- {{ calculateValueForBottomRow() }} -->
                   </div>
                </q-td>
            </q-tr>
          </template>
        <!-- <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Reset</v-btn>
       </template> -->


        </q-table>
      </div>
    </div>
    </div>
  </div>
  </template>

  <script>
  import Button_icon from 'src/components/ERP/Base/Button_icon'
  import Checkbox from 'src/components/ERP/Base/Checkbox'
  import Label from 'src/components/ERP/Base/Label';
  import Input from 'src/components/ERP/Base/Input';
  import Select from 'src/components/ERP/Base/Select';
  export default {
      data(){
        return{
          columns: [],
          rows: [],
          loading: true,
          permission: sessionStorage.getItem("permission") != "" && sessionStorage.getItem("permission") != "null" && sessionStorage.getItem("permission") != null ? sessionStorage.getItem("permission").split(',') : [],
          amount: false,
          forfeited: false,
          page_function: this.$route.name,
          newValue: "",
          newValueCode:""
        }
      },
      props: ['optionsFn','title', 'title_section', 'SectionTableTitle','gross_amount', 'nett_amount','table_column', 'table_data','top_button', 'top_button_dropdown', 'hide_footer', 'row_per_page','table_footer',"flat_status", "bordered_status", 'action_button','edit_button', 'view_button', 'delete_button','cancel_button','print_button', 'table_type','readonly_button','readonly_action','readonly_delete'
      ,'group_button',"optionsCode","totalDisc","readonly_action_btn","disableTdCheckbox","disableTdClick","pass_row_key",'forceLoading','loading_button','update_weight_readonly','select_all','generate_sn_readonly','no_separator','print_btn_dropdown','add_button'],
      components: {
        Button_icon,
        Checkbox,
        Label,
        Input,
        Select
      },
      mounted(){
      },
      created() {
      },
      computed: {
        dbComponentBehavior() {
          return this.$store.getters['dbComponentBehavior/byLanguage']('erp')
        },

      },
      methods: {
        calculateValueForBottomRow() {
          // Perform calculation based on row values

          console.log(' this.rows', this.rows);
          var sum = 0;
          if(this.title_section == 'GRN'){
            for (var i = 0; i < this.rows.length; i++) {
              var amount = this.rows[i].Value_Calculated * this.rows[i].Value_Factor
             sum += parseFloat(amount);
            }
          }else if(this.title_section == 'PO'){
            for (var i = 0; i < this.rows.length; i++) {
              // console.log('row value',this.rows[i].Value_Calculated);
              if(this.rows[i].value !== ''){
                var amount = this.rows[i].Value_Calculated * this.rows[i].Value_Factor
                sum += parseFloat(amount);
               }

            }
          }


          // console.log('sum',sum);
          var total_sub = parseFloat(sum).toFixed(2);
          // console.log('total_sub',total_sub);
          this.$emit('receiveTotalCalculatedValue',total_sub);
          return total_sub;
          var row = this.rows

        },
        handleChangeInputValue(newVal){

           if(newVal == ''){
              newVal  = 0;
              console.log('new Value',newVal);
           }
        },
        calculateValueAfter(row) {
          // console.log('rows',row);
          var value_after =""
            // Calculate the value for the Value After column
          if (row.value_after === null) {
            // For the first row, use the initial value directly
            value_after= row.calculated;
          } else {
            if(row.no == '1'){
              // For subsequent rows, use the previous row's Value After value
              value_after= row.value_after;
            }else{
              var previousValueAfter = this.rows.filter((prevRow) => {return parseInt(prevRow.no) === parseInt(row.no) - 1});
              var total = parseFloat(previousValueAfter[0].value_after) + parseFloat(row.calculated);
              // console.log('previousValueAfter',previousValueAfter);
              // console.log('row',row);
              value_after = total.toFixed(2);
              row.value_after =  value_after
              // console.log('row',row);
              //return row.value_after + row.calculated;
            }

          }
          // this.$emit('receiveChangeCalculateValueAfter',row);
          return row.value_after
          // this.$emit('receiveChangeCalculateValueAfter',row);
        },
          supplier_item_list()
          {
            this.$emit('main_supplier_item_list');
          },

          handleRefno(refno)
          {
            this.$emit('onClickRefno', refno);
          },

          handleTdClick(value, header, payload, component)
      {
          // this.formattedValue = this.formatValue(value);
          var newValue = value.toString().replace(',','');
          this.newValue = newValue;

          this.$nextTick(() => {
              setTimeout(()=>{


                if(this.$refs[component] != undefined && this.$refs[component] != "undefined")
                {
                  this.$refs[component].select()
                }


              },100);
          });
      },
          handleGrossAmountChange(newVal)
          {
            this.$emit('receiveChangeGrossAmount', newVal);
          },
          handleNettAmountChange(newVal)
          {
            this.$emit('receiveChangeNettAmount', newVal);
          },
          receivePrintSn(col, props)
          {
            this.$emit('onPrintSn',col,props);
          },
          receiveChangetdCheckbox(newVal)
          {
            this.$emit('receiveChangeCheckbox', newVal)
          },
          group : function()
          {
            this.$emit('receiveChangeGroup')
          },
          ungroup()
          {
            this.$emit('receiveChangeUngroup');
          },
          receiveChangethCheckbox(newVal)
          {
            this.$emit('receiveChangeSelectAll', newVal)
          },
          btnclick(){

          },
          handlePrint(props)
          {
            this.$emit('handlePrint',props);
          },
          handlePrintDropdown(props,value)
          {
            console.log(props,value)
            this.$emit('handlePrintDropdown',props, value);
          },
          action : function(payload)
          {
              this.$emit('main_action', payload)
          },
          edit : function(payload)
          {
              this.$emit('main_edit', payload)
          },
          list : function(payload)
          {
              this.$emit('main_list', payload)
          },
          remove : function(payload)
          {
              this.$emit('main_delete', payload)
          },
          cancel : function(payload)
          {
              this.$emit('main_cancel', payload)
          },
          onRowClick : function (event, row, index)
          {
            this.$emit('onRowClick', row)
          },
          // getPaginationLabel: function(firstRowIndex,endRowIndex,totalRowsNumber )
          // {
          //     return 'Showing '+firstRowIndex +' to '+endRowIndex+' of '+totalRowsNumber;
          // },
          // map_isactive: function(payload)
          // {
          //     return payload.isactive == '1' ? 'Yes' : 'No';
          // }
          onRequest (props) {
            this.$emit("receiveRequestTable",props);

            this.pagination.sortBy = props.pagination.sortBy;
            this.pagination.descending = props.pagination.descending;
            this.pagination.page = props.pagination.page;
            this.pagination.rowsPerPage = props.pagination.rowsPerPage;
            this.loading = true
          },
          handleAdd : function()
          {
              this.$emit('receiveAdd',this.table_data)
          },
          handlePopupSave(value,header,column_index,payload, event)
          {
              var row = payload.rowIndex;
              var column = column_index;

              var newValue = this.newValue;

              // console.log(this.formatAmount(newValue,'$'));

              // this.rows[row][header] = newValue;

              var main_json = {
                  value:newValue,
                  payload,
                  event,
                  header,
              }

              this.$emit('receiveSave',main_json);
          },
          handleChangetdCodeSelect(value,header,column_index,payload, event){
            var row = payload.rowIndex;
              var column = column_index;

              var newValue = value;

              // console.log(this.formatAmount(newValue,'$'));

              // this.rows[row][header] = newValue;

              var main_json = {
                  value,
                  payload,
                  event,
                  header,
              }
            this.$emit('receiveChangeCodeSelect',main_json)
          }
      },
      watch:{
          table_column(newVal)
          {
              this.columns = newVal;
              if(this.pass_row_key)
              {
                  this.row_key = this.pass_row_key;
              }
              else
              {
                  this.row_key = newVal[0].name;
              }
          },
          table_data(newVal){
              // this.rows = newVal;
              // this.loading = false;)
              this.rows = newVal.data.results;
              // this.pagination.rowsNumber = newVal.data.count;
              this.loading = false;


              if(this.forceLoading == false)
              {
                this.loading = false;
              }
          },
          forceLoading(newVal)
          {
              if(newVal)
              {
                  this.loading = true;
              }
          },

      }
  }
  </script>

  <style scoped>
  .custom_link
  {
    color: blue;
    text-decoration: none; /* Remove underline by default */
    transition: text-decoration 0.3s;
  }
  .custom_link:hover {
    cursor: pointer;
    text-decoration: underline; /* Underline on hover */
  }
  .print_select
  {
    border: 1px solid #1976D2;
    background-color:white;
    color: grey;
  }
  .q-btn
  {
      border-radius: 0px;
  }

  * >>> thead
  {
      background-color: dee1e6;;
  }

  * >>> th
  {
      padding: 10px !important;
  }

  * >>> tr, * >>> td
  {
      padding: 0px !important;
      height: 20px !important;
  }


  .table_footer, td{
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  }

  * >>> td
  {
      padding: 3px !important;
      padding-left: 5px !important;
      padding-right: 5px !important;
      font-size: 12px !important;
      height: 20px !important;
  }

  * >>> .q-table__container
  {
      padding: 0px;
      border-radius: 16px; /* Adjust the value for more or less rounded corners */
      overflow: hidden; /* Ensures content stays within the rounded border */
  }
.q-table--bordered {
    border: 1px solid rgba(0, 0, 0, 0.12);
}
  .card_border{
    /*border: 1px solid #D3D3D3;*/
    /*background-color: antiquewhite;*/
    gap: 16px;
  }

  * >>> .q-field__native
  {
    margin-top: 0px !important;
  }

  .dialog_font
{
  font-family: InterfontBold;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
}
.text-red {
  color: red;
}
.add_custom {
  padding: 16px;
  justify-content: center;
  align-items: center;
  font-size: 16px !important;
  font-style: normal;
  font-weight: 700;
  font-family: InterfontBold;
  border-radius: 8px;
  /*background: #069857;*/
  box-shadow: 0px 1px 3.6px 0px rgba(0, 0, 0, 0.25);
  width: 112px;
  height: 42px;
}
.main_table.q-table thead,
.main_table.q-table tr,
.main_table.q-table th,
.main_table.q-table td {
   background-color: #f0f0f0;
  border-color: rgba(83, 81, 81, 0.30) !important;
}
*.surcharge_custom >>> .q-field__label {
  top: 10px !important;
  /*background-color: #D81111 !important;*/
}
*>>>.q-table th {
    font-weight: 700;
    font-size: 12px;
    -webkit-user-select: none;
    user-select: none;
    font-family: InterfontBold;
    color: black;
    text-align: center !important;
}
* >>> .q-table td
  {
      padding: 10px !important;
      padding-left: 20px !important;
      padding-right:  20px !important;
      font-size: 12px !important;
      height: 24px !important;
       text-align: center !important;
      font-family: InterfontMedium;
      font-weight: 500;
  }
  </style>

<style lang="sass">
.my_sticky_header_table
  /* height or max-height is important */
  max-height: 400px

  thead tr:first-child th
    background-color: #d7e2e9     /*the color of th of the table change here*/

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px

  /* prevent scrolling behind sticky top row on focus */
  tbody
    /* height of all previous header rows */
    scroll-margin-top: 48px
</style>
