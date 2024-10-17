<template>
  <div class="border-container">
      <div v-if="showTopButton" class="" style="padding-top: 0px;padding-bottom:10px">
      <template v-if="showTopButton">
        <div v-if="!top_button_dropdown" class="row col-12 justify-end">
        <Button_icon  :disabled="readonly_button" :flat="true" :icon="'add'" v-on:receiveClick="add_button()" :font_color="'white'" :color="'#069857'" :text="$language('D0024')" :outline="false" size="12px" class="justify-end button_add_1" />
        </div>
        <div v-else class="row col-12 justify-between">
        <div class="container-button q-gutter-x-md" style="height:100%">
          <Button_icon :disabled="readonly_button ? true : generate_sn_readonly" :flat="true" v-on:receiveClick="group()" :font_color="'#54656F'" :color="''" :text="'Group'" :outline="false" size="14px" class="button_group" v-if="group_button" />
          <Button_icon :loading="loading_button" :disabled="readonly_button ? true : update_weight_readonly" :flat="true" v-on:receiveClick="ungroup()" :font_color="'#54656F'" :color="''" :text="'Ungroup'" :outline="false" size="14px" class="button_group" v-if="group_button" />
        </div>
        <div>
          <q-btn-dropdown
            v-if="top_button_dropdown && page_function != 'EditGoodsReceivedNote'"
            no-caps
            dense
            split
            icon="add"
            flat
            style="background-color: #069857; color: white;border-radius: 8px;"
            :label="$language('D0024')"
            size="14px"
            @click="add_button()"
            class="button_add_2 button_add_dropdown"
          >
            <q-list>
              <q-item dense clickable v-close-popup @click="supplier_item_list">
                <q-item-section>
                  <q-item-label class="qlist-font">Supplier Item List</q-item-label>
                </q-item-section>
              </q-item>

            </q-list>
          </q-btn-dropdown>
          <q-btn-dropdown
            v-if="top_button_dropdown && page_function == 'EditGoodsReceivedNote'"
            no-caps
            dense
            ref="dropdown"
            split
            flat
            icon="add"
            style="background-color: #069857; color: white; border-radius:8px"
            label="GR Tools"
            size="14px"
            @click="add_button()"
            class="button_add_3 button_add_dropdown"
          >
            <q-list v-for="item in btndropdownList" :key="item">
              <q-item dense clickable v-close-popup @click="onItemClick(item.section)">
                <q-item-section>
                  <q-item-label>{{ item.title }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
            <!-- <q-list>
              <q-item dense clickable v-close-popup @click="onItemClick('RTV')">
                <q-item-section>
                  <q-item-label>RTV (Return To Vendor)</q-item-label>
                </q-item-section>
              </q-item>

              <q-item dense clickable v-close-popup @click="onItemClick('VFOC')">
                <q-item-section>
                  <q-item-label>Vendor FOC Item without PO</q-item-label>
                </q-item-section>
              </q-item>

            </q-list> -->
          </q-btn-dropdown>
          </div>
          </div>
      </template>
      </div>

    <q-table :hide-bottom="hide_footer" :separator="no_separator ? 'none' : 'cell'" :flat="flat_status" :bordered="bordered_status" class="" :title="title" :row_per_page="row_per_page"
    :rows="rows" :columns="columns" rows-per-page-label="Entries" :pagination-label="getPaginationLabel"
    :rows-per-page-options="row_per_page"
    :row-key="row_key"
    @request="onRequest"
      :filter="filter"
      v-model:pagination="pagination"
      binary-state-sort
      :loading="loading"

      >
<!-- button pagination -->
<!--:boundary-numbers="true"     function: adjust the first page and last page visibilty -->
      <template v-slot:pagination>
        <div class="col-auto">
          <span style="padding-right: 32px;">{{ rowRange }}</span>
        </div>
        <q-pagination
          v-model="pagination.page"
          :max="Math.ceil(pagination.rowsNumber / pagination.rowsPerPage)"
          direction-links
          @update:model-value="onPagination"
          :max-pages="5"
          :ellipses="false"
          :boundary-numbers="false"
          color="grey-9"
          active-color="light-blue-1"
          active-text-color = "primary"
          round
          :label="getPaginationLabel"
          gutter="8px"
          size="12px"
          class="round-button-custom"
        />
      </template>

      <template v-slot:header="props" >
          <q-tr :props="props">
          <q-th
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
          >
              <q-tooltip v-if="col.tooltip" anchor="top middle" self="center middle" style="font-size: 13px;">
              {{ col.tooltip }}
              </q-tooltip>
              <!-- {{ col.label }} -->
              <span v-if="col.label !== 'Select'">{{ col.label }}</span>
              <!-- <div v-if="col.label !== 'Select'">{{ col.label }}</div> -->
              <div v-if="col.label=='Select'">
                <Checkbox
                size="xs"
                :disable="false"
                :no_label="true"
                v-model="select_all"
                :dbComponentBehavior="dbComponentBehavior.text"
                v-on:receiveChangenewVal="receiveChangethCheckbox"
                />
              </div>
          </q-th>
          </q-tr>
      </template>
<!-- edit purchase - detail - g -->
      <template v-slot:body-cell-group_status="props">
          <q-td :style="`text-align:${props.col.align}`" >
            <Checkbox
              size="xs"
              :disable="true"
              :no_label="true"
              v-model="props.row.group_status"
              :dbComponentBehavior="dbComponentBehavior.text"
              v-on:receiveChangenewVal="receiveChangetdCheckbox"
              :table="true"
              :true-value="1"
              :false-value="0"
              />
          </q-td>
      </template>

      <template v-if="page_function == 'EditItemmaster'" v-slot:body-cell-block_order="props">
          <q-td :style="`text-align:${props.col.align}`">
            <Checkbox
              size="xs"
              :disable="true"
              :no_label="true"
              v-model="props.row.block_order"
              :dbComponentBehavior="dbComponentBehavior.text"
              v-on:receiveChangenewVal="receiveChangetdCheckbox"
              :table="true"
              :true-value="1"
              :false-value="0"
              />
          </q-td>
      </template>

      <template  v-if="page_function == 'EditItemmaster'" v-slot:body-cell-none_return="props">
          <q-td :style="`text-align:${props.col.align}`">
            <Checkbox
              size="xs"
              :disable="true"
              :no_label="true"
              v-model="props.row.none_return"
              :dbComponentBehavior="dbComponentBehavior.text"
              v-on:receiveChangenewVal="receiveChangetdCheckbox"
              :table="true"
              :true-value="1"
              :false-value="0"
              />
          </q-td>
      </template>

      <template v-slot:body-cell-TempItem="props">
          <q-td :style="`text-align:${props.col.align}`">
            <Checkbox
              size="xs"
              :disable="true"
              :no_label="true"
              v-model="props.row.TempItem"
              :dbComponentBehavior="dbComponentBehavior.text"
              v-on:receiveChangenewVal="receiveChangetdCheckbox"
              :table="true"
              :true-value="1"
              :false-value="0"
              />
          </q-td>
      </template>

      <!-- <template v-if="page_function=='PurchaseOrder' || page_function == 'GoodsReceiving' || page_function == 'DebitNote'" v-slot:body-cell-RefNo="props">
        <td>
          <span class="custom_link" @click="handleRefno(props.row.RefNo)">{{ props.row.RefNo }}</span>
        </td>
      </template> -->

      <template v-slot:body-cell-Amendment="props">
          <q-td :style="`text-align:${props.col.align}`">
            <Checkbox
              size="xs"
              :disable="true"
              :no_label="true"
              v-model="props.row.Amendment"
              :dbComponentBehavior="dbComponentBehavior.text"
              v-on:receiveChangenewVal="receiveChangetdCheckbox"
              :table="true"
              :true-value="1"
              :false-value="0"
              />
          </q-td>
      </template>

      <template v-slot:body-cell-cost_manual="props">
          <q-td :style="`text-align:${props.col.align}`">
            <Checkbox
              size="xs"
              :disable="true"
              :no_label="true"
              v-model="props.row.cost_manual"
              :dbComponentBehavior="dbComponentBehavior.text"
              v-on:receiveChangenewVal="receiveChangetdCheckbox"
              :table="true"
              :true-value="1"
              :false-value="0"
              />
          </q-td>
      </template>

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
      </template>

      <template v-slot:body-cell-CalcCost="props">
          <q-td :style="`text-align:${props.col.align}`">
            <Checkbox
              size="xs"
              :disable="true"
              :no_label="true"
              v-model="props.row.CalcCost"
              :dbComponentBehavior="dbComponentBehavior.text"
              v-on:receiveChangenewVal="receiveChangetdCheckbox"
              :table="true"
              :true-value="1"
              :false-value="0"
              />
          </q-td>
      </template>

      <template v-slot:body-cell-consign="props">
          <q-td :style="`text-align:${props.col.align}`">
            <Checkbox
              size="xs"
              :disable="true"
              :no_label="true"
              v-model="props.row.consign"
              :dbComponentBehavior="dbComponentBehavior.text"
              v-on:receiveChangenewVal="receiveChangetdCheckbox"
              :table="true"
              :true-value="1"
              :false-value="0"
              />
          </q-td>
      </template>

      <template v-slot:body-cell-gst_manual="props">
          <q-td :style="`text-align:${props.col.align}`">
            <Checkbox
              size="xs"
              :disable="true"
              :no_label="true"
              v-model="props.row.gst_manual"
              :dbComponentBehavior="dbComponentBehavior.text"
              v-on:receiveChangenewVal="receiveChangetdCheckbox"
              :table="true"
              />
          </q-td>
      </template>

      <template v-slot:body-cell-posted="props">
          <q-td :style="`text-align:${props.col.align}`">
            <Checkbox
              size="xs"
              :disable="true"
              :no_label="true"
              v-model="props.row.posted"
              :dbComponentBehavior="dbComponentBehavior.text"
              />
          </q-td>
      </template>

      <template v-slot:body-cell-auto_close_po="props">
          <q-td :style="`text-align:${props.col.align}`">
            <Checkbox
              size="xs"
              :disable="true"
              :no_label="true"
              v-model="props.row.auto_close_po"
              :dbComponentBehavior="dbComponentBehavior.text"
              />
          </q-td>
      </template>

      <template v-slot:body-cell-canceled="props">
          <q-td :style="`text-align:${props.col.align}`">
            <Checkbox
              :disable="true"
              :no_label="true"
              v-model="props.row.canceled"
              :dbComponentBehavior="dbComponentBehavior.text"
              :true-value="1"
              :false-value="0"
              />
          </q-td>
      </template>

      <template v-slot:body-cell-converted="props">
          <q-td :style="`text-align:${props.col.align}`">
            <Checkbox
              v-if="props.row.converted == 0 || props.row.converted == 1"
              :disable="true"
              :no_label="true"
              v-model="props.row.converted"
              :dbComponentBehavior="dbComponentBehavior.text"
              :true-value="1"
              :false-value="0"
              />

            <Checkbox
              v-if="props.row.converted == 2"
              :disable="true"
              :no_label="true"
              v-model="props.row.converted"
              :dbComponentBehavior="dbComponentBehavior.text"
              :false-value="2"
              />
          </q-td>
      </template>

      <template v-slot:body-cell-forfeited="props">
          <q-td :style="`text-align:${props.col.align}`">
            <Checkbox
              v-if="props.row.forfeited == 0 || props.row.forfeited == 1"
              :disable="true"
              :no_label="true"
              v-model="forfeited"
              :dbComponentBehavior="dbComponentBehavior.text"
              />

            <Checkbox
              v-if="props.row.forfeited == 2"
              :disable="true"
              :no_label="true"
              v-model="props.row.forfeited"
              :dbComponentBehavior="dbComponentBehavior.text"
              :true-value="2"
              />
          </q-td>
      </template>

      <template v-slot:body-cell-trade_in="props">
          <q-td :style="`text-align:${props.col.align}`">
            <Checkbox
              :disable="true"
              :no_label="true"
              v-model="props.row.trade_in"
              :dbComponentBehavior="dbComponentBehavior.text"
              :true-value="1"
              :false-value="0"
              />
          </q-td>
      </template>

      <template v-slot:body-cell-by_weight="props">
          <q-td :style="`text-align:${props.col.align}`">
            <Checkbox
              :disable="true"
              :no_label="true"
              v-model="props.row.by_weight"
              :dbComponentBehavior="dbComponentBehavior.text"
              :true-value="1"
              :false-value="0"
              />
          </q-td>
      </template>

      <template v-slot:body-cell-action="props">
          <q-td style="padding-right: 0px;">
              <Button_icon :disabled="readonly_action" icon="far fa-edit" class="q-mr-sm text-blue" :color="''" :flat="true" :outline="false" size="12px" v-on:click="action(props.row)" v-if="action_button" :tooltip_message="'Edit'"
              style="border-radius: 16px;transition: all 0.3s; padding: 10px" @mouseover="isHovered = true" @mouseleave="isHovered = false" :class="{ 'hover-style': isHovered }"/>

              <q-btn icon="visibility" color="primary" dense outline ripple class="q-mr-sm" v-on:click="edit(props.row)"
              v-if="edit_button">
                  <q-tooltip>
                      Edit
                  </q-tooltip>
              </q-btn>

              <!-- <q-btn icon="view_list" color="positive" dense outline ripple class="q-mr-sm" v-on:click="list(props.row)"
              v-if="view_button">
                  <q-tooltip>
                      View
                  </q-tooltip>
              </q-btn> -->

              <Button_icon :icon="'view_list'" :color="'positive'" :outline="false" size="12px" v-on:click="list(props.row)" v-if="view_button" class="q-mr-sm" />
              <!-- <i class="fas fa-trash-alt"></i> -->
              <Button_icon :disabled="readonly_delete" :icon="'fas fa-trash-alt'" :flat="true" :color="''" :outline="false" size="12px" v-on:click="remove(props.row)" v-if="delete_button" class="q-mr-sm text-red"
              style="border-radius: 16px;transition: all 0.3s; padding: 10px" @mouseover="isHovered = true" @mouseleave="isHovered = false" :class="{ 'hover-style': isHovered }"/>

              <Button_icon :disabled="readonly_button" icon="print" color="primary" :outline="false" size="12px" dense ripple :disable="showAddLoading" v-if="print_button" class="q-mr-sm" v-on:click="handlePrint(props.row)"
              @click.stop="btnclick"/>

              <Button_icon :icon="'content_copy'" class="q-mr-sm text-teal" :color="''" :flat="true" :outline="false" size="12px" v-on:click="duplicate(props.row)" v-if="duplicate_button"  :tooltip_message="'Duplicate Item Link'"
              style="border-radius: 16px;transition: all 0.3s; padding: 10px" @mouseover="isHovered = true" @mouseleave="isHovered = false" :class="{ 'hover-style': isHovered }"/>
              <!-- <q-btn icon="content_copy" size="12px" color="teal" dense  ripple class="q-mr-sm" v-on:click="duplicate(props.row)"
              v-if="duplicate_button">
                  <q-tooltip>
                    Duplicate Item Link
                  </q-tooltip>
              </q-btn> -->

              <Button_icon :icon="'clear'" :color="'#FFD580'" :outline="false" size="12px" v-on:click="cancel(props.row)" v-if="cancel_button" class="q-mr-sm" />

          </q-td>
      </template>

      <template v-slot:body-cell-DocumentStatus="props">
        <q-td>   <!-- :style="`text-align:${props.col.align}`" --><!---textTransform:'uppercase'-->
          <Badge
            :text="props.row.DocumentStatus"
            :color="getBadgeColor(props.row.DocumentStatus)"
            :text-color="getBadgeTextColor(props.row.DocumentStatus)"
            :style="{ padding: '10px', borderRadius: '19px',fontSize: '12px', fontWeight: '500'}"
          >
            {{ props.row.DocumentStatus }}
          </Badge>
          </q-td>
      </template>

      <template v-slot:body-cell-primary="props">
          <q-td :style="`text-align:${props.col.align}`" >
            <Checkbox
              size="xs"
              :disable="true"
              :no_label="true"
              v-model="props.row.primary"
              :dbComponentBehavior="dbComponentBehavior.text"
              v-on:receiveChangenewVal="receiveChangetdCheckbox"
              :table="true"
              />
          </q-td>
      </template>

    </q-table>
  </div>
</template>

  <script>
  import Button_icon from 'src/components/ERP/Base/Button_icon'
  import Checkbox from 'src/components/ERP/Base/Checkbox'
  import Badge from 'src/components/ERP/Base/Badge'
  export default {
      data(){
        return{
          columns: [],
          rows: [],
          row_key: "",
          loading: true,
          filter:"",
          pagination: {
            sortBy: '',
            descending: '',
            page: 1,
          //   rowsPerPage: 5,
          rowsPerPage: this.row_per_page[0] === undefined ? this.row_per_page : this.row_per_page[0],
            rowsNumber: 0
          },
          permission: sessionStorage.getItem("permission") != "" && sessionStorage.getItem("permission") != "null" && sessionStorage.getItem("permission") != null ? sessionStorage.getItem("permission").split(',') : [],
          amount: false,
          forfeited: false,
          page_function: this.$route.name,
          isDropdownOpen: false,
          showTopButton: false
        }
      },
      props: ['title','btndropdownList', 'table_column', 'table_data','top_button', 'top_button_dropdown', 'hide_footer', 'row_per_page','table_footer',"flat_status", "bordered_status", 'action_button','edit_button', 'view_button', 'delete_button','cancel_button','print_button', 'table_type','readonly_button','readonly_action','readonly_delete'
      ,'group_button',"pass_row_key",'forceLoading','loading_button','update_weight_readonly','select_all','generate_sn_readonly','no_separator','print_btn_dropdown','duplicate_button', 'selective_display'],
      components: {
        Button_icon,
        Checkbox,
        Badge
      },
      mounted(){
        this.onRequest({
          pagination: this.pagination,
          filter: undefined
        })

        this.show_top_button()
      },
      created() {
      },
      computed: {
        dbComponentBehavior() {
          return this.$store.getters['dbComponentBehavior/byLanguage']('erp')
        },
        rowRange() {
          const start = (this.pagination.page - 1) * this.pagination.rowsPerPage + 1;
          const end = Math.min(this.pagination.page * this.pagination.rowsPerPage, this.pagination.rowsNumber);
          return `${start} - ${end} of ${this.pagination.rowsNumber}`;
        }
      },
      methods: {
          show_top_button(){
            var showTopButton = false;
            if(this.top_button){
             if(this.selective_display){
              if(this.page_function == 'CreateCurrency'){
                showTopButton = false
              }else if(this.page_function == 'EditCurrency'){
                showTopButton = true
              }else if(this.page_function == 'CreatePaymentTerm'){
                showTopButton = false
              }else if(this.page_function == 'EditPaymentTerm'){
                showTopButton = true
              }else if(this.page_function == 'CreateWeighingTypeModuleAssignment'){
                showTopButton = false
              }else if(this.page_function == 'EditWeighingTypeModuleAssignment'){
                showTopButton = true
              }
             }else{
              showTopButton = true
             }
            }else{
              showTopButton = false
            }

            this.showTopButton = showTopButton;
          },
          supplier_item_list()
          {
            this.$emit('main_supplier_item_list');
          },
          onItemClick(val)
          {
            this.$emit('main_onItemClick',val);
          },
          handleRefno(refno)
          {
            this.$emit('onClickRefno', refno);
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
          duplicate: function(payload){
              this.$emit('main_duplicate',payload)
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
          onPagination(page) {
            this.pagination.page = page;
            this.onRequest({ pagination: this.pagination });
          },
          add_button : function()
          {
            if(this.page_function !== "EditGoodsReceivedNote"){
              this.$emit('add_button')
            }else if(this.page_function == "EditGoodsReceivedNote"){

                  // Get the reference to the dropdown component
                var dropdown = this.$refs.dropdown;
                  // Check if the dropdown is currently open
                 // Toggle the dropdown state
                this.isDropdownOpen = !this.isDropdownOpen;

                // Open or close the dropdown based on its current state
                if (this.isDropdownOpen) {
                  dropdown.show();
                } else {
                  dropdown.hide();
                }

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
                return 'blue-5';
              default:
                return 'white'; // default text color if status doesn't match any case
            }
          },

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
              this.pagination.rowsNumber = newVal.data.count;
              this.loading = false;

              if(this.forceLoading == false)
              {
                this.loading = false;
              }
          },
          columns_rows()
          {
              var _this = this;
              setTimeout(function(){
                  _this.loading = false;
              },150);
          },
          forceLoading(newVal)
          {
              if(newVal)
              {
                  this.loading = true;
              }
          }
      }
  }
  </script>

<!--   * >>> td
  {
      padding: 10px !important;
      padding-left: 20px !important;
      padding-right:  20px !important;
      font-size: 16px !important;
      height: 24px !important;
      text-align: center;
      font-family: InterMedium;
      font-weight: 500;
  } -->
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
      background-color: #dee1e6;
  }
/*
  * >>> th
  {
      padding: 5px 5px !important;
      text-align: center !important;
      background-color: #D7E2E9;

  }

  * >>> tr
  {
      padding: 0px !important;
       height: 20px !important;
  }
  */



  * >>> .q-table__container
  {

      /* Adjust the width and height as needed */
    width: 100%; /* Example: Make it full-width */

  }
  *>>>.q-table th {
    font-weight: bold;
    font-size: 11px;
    -webkit-user-select: none;
    user-select: none;
    font-family: Poppins;
    color: black;
    text-align: center !important;
}
* >>> .q-table td
  {

      /* padding:5px  5px !important; */
      font-size: 11px !important;

      font-weight: 500;
  }
  .border-container {
    /*border: 1px solid #ababab;
    border-radius: 8px;*/
    /*padding-top: 24px;*/
    width: 100%;
    gap: 16px;
  }

  .text-blue {
    color: #1E90FF;
  }
  .text-red {
    color: #B22222;
  }
  .hover-style {
    background: rgba(215, 232, 250, 0.50);
  }
  *[data-v-c8f6ecca] .q-table__container {
    padding: 0px;
    width: 100%;
    /* height: 350px; */
    /*max-height: 800px;*/
    text-align: center;
    /*border: 2px solid rgba(185, 14, 185, 0.3);*/
    border-radius: 8px;
}
.q-table__container {
  border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    border: 2px solid rgba(83, 81, 81, 0.30);
    border-radius: 8px;
}
*.q-table__flat {
    /* box-shadow: none; */
}
.button_group {
  padding: 2px 9px;
  border-radius: 8px;
  border: 1px solid #54656F;
  background: #FFFFFF;
  font-family: InterfontSemiBold;
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  text-align: center;
  width: 72px;
  height: 32px;
}
.button_add_1 {
  text-align: center;
  font-family: Poppins;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  /* padding: 0px 15px; */
  width: 70px;
  height: 30px;
  align-items: center;
}
.button_add_2 >>>.q-btn {
  text-align: center;
  font-family: Poppins;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  padding: 10px;
  width: 90px;
  height: 36px;
  justify-content: center;

}
.button_add_3 >>>.q-btn {
  text-align: center;
  font-family: Poppins;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  /*padding: 20px; */
  width: 130px;
  height: 34px;
  justify-content: center;

}
.button_add_dropdown >>> .q-btn-dropdown__arrow-container  {
  width: 46px;
  height: 36px;
}
*>>>.q-btn-dropdown--split .q-btn-dropdown__arrow-container:not(.q-btn--outline) {
    border-left: 1px solid #FFF;
}
.container-button {
  gap: 10px;
}
.qlist-font {

  font-size: 13px;
  font-weight: 500px;
  padding: 14px 16px;
  width: 241px;
  height: 42px;
}
*>>>.q-table__bottom {
    min-height: 50px;
    padding: 4px 14px 4px 16px;
    font-size: 12px;

    font-weight: 500;
}
*>>>.q-table__bottom-item {
    margin-right: 20px;
}
*>>>.q-field--auto-height .q-field__control, .q-field--auto-height .q-field__native {
    align-items: center;
}

.round-button-custom >>>.q-btn--round {
    border-radius: 50%;
    padding: 0;
    min-width: 2em !important;
    min-height: 25px;
}
  </style>

<style lang="sass">
.my_sticky_header_table
  /* height or max-height is important */
  max-height: 400px

  thead tr:first-child th
    background-color: #d7e2e9

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
