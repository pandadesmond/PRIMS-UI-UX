<template>
  <div class="">
    <q-table :hide-bottom="hide_footer" :separator="no_separator ? 'none' : 'cell'" :flat="flat_status" :bordered="bordered_status" class="main_table" :title="title" :row_per_page="row_per_page"
    :rows="rows" :columns="columns" rows-per-page-label="Entries" :pagination-label="getPaginationLabel"
    :rows-per-page-options="row_per_page"
    :row-key="row_key"
    @request="onRequest"
      :filter="filter"
      v-model:pagination="pagination"
      binary-state-sort
      :loading="loading"
      >

      <template v-if="top_button" v-slot:top-left>
        <Button_icon :disabled="readonly_button" :flat="true" :icon="'add'" v-on:receiveClick="add_button()" :font_color="'white'" :color="'green'" :text="'Add'" :outline="false" size="12px" class="q-pr-sm q-mr-sm"/>

        <Button_icon :loading="loading_button" :disabled="readonly_button ? true : update_weight_readonly" :flat="false" v-on:receiveClick="update_weight()" :font_color="'black'" :color="'white'" :text="'Update SN'" :outline="true" size="12px" class="q-pr-sm q-mr-sm" v-if="update_weight_button" />

        <Button_icon :disabled="readonly_button ? true : generate_sn_readonly" :flat="true" v-on:receiveClick="sn()" :font_color="'white'" :color="'#094161'" :text="'Generate SN'" :outline="false" size="12px" class="q-pr-sm q-mr-sm" v-if="sn_button" />
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
              <div v-else>
                <Checkbox
                size="sm"
                :disable="false"
                :no_label="true"
                v-model="select_all"
                :dbComponentBehavior="dbComponentBehavior.text"
                v-on:receiveChangenewVal="receiveChangethCheckbox"
                :table="true"
                />
              </div>
          </q-th>
          </q-tr>
      </template>

      <template v-slot:body-cell-select="props">
          <q-td :style="`text-align:${props.col.align}`">
            <Checkbox
              v-if="props.row.sn == 1"
              size="sm"
              :disable="false"
              :no_label="true"
              v-model="props.row.select"
              :dbComponentBehavior="dbComponentBehavior.text"
              v-on:receiveChangenewVal="receiveChangetdCheckbox"
              :table="true"
              />
          </q-td>
      </template>

      <template v-slot:body-cell-posted="props">
          <q-td :style="`text-align:${props.col.align}`">
            <Checkbox
              :disable="true"
              :no_label="true"
              v-model="props.row.posted"
              :dbComponentBehavior="dbComponentBehavior.text"
              :true-value="1"
              :false-value="0"
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
              <Button_icon :disabled="readonly_action" :icon="'edit_note'" :color="'#094161'" :outline="false" size="12px" v-on:click="action(props.row)" v-if="action_button" class="q-mr-sm" />

              <q-btn icon="visibility" color="primary" dense outline ripple class="q-mr-sm" v-on:click="edit(props.row)"
              v-if="edit_button">
                  <q-tooltip>
                      Edit
                  </q-tooltip>
              </q-btn>

              <q-btn icon="view_list" color="positive" dense outline ripple class="q-mr-sm" v-on:click="list(props.row)"
              v-if="view_button">
                  <q-tooltip>
                      View
                  </q-tooltip>
              </q-btn>
              <Button_icon :disabled="readonly_delete" :icon="'delete'" :color="'negative'" :outline="false" size="12px" v-on:click="remove(props.row)" v-if="delete_button" class="q-mr-sm" />

              <Button_icon :disabled="readonly_button" icon="print" color="primary" :outline="false" size="12px" dense ripple :disable="showAddLoading" v-if="print_button" class="q-mr-sm" v-on:click="handlePrint(props.row)"
              @click.stop="btnclick"/>

              <q-btn-dropdown
                v-if="print_btn_dropdown"
                class="q-mr-sm"
                split
                square
                dense
                icon="print"
                text-color="white"
                style="background-color:#1976D2;"
                size="12px"
                @click="handlePrintDropdown(props.row,'GR')"
              >
              <q-list dense>
                <q-item clickable class="print_select">
                  <q-item-section thumbnail>
                    <q-icon name="arrow_right" color="grey"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label @click="handlePrintDropdown(props.row,'TI')">Trade In</q-item-label>
                  </q-item-section>
                </q-item>
                </q-list>
              </q-btn-dropdown>

              <Button_icon :icon="'clear'" :color="'#FFD580'" :outline="false" size="12px" v-on:click="cancel(props.row)" v-if="cancel_button" class="q-mr-sm" />

              <q-btn-dropdown
                v-if="(props.row.sn==1 || props.row.posted==1) && props.row.print_qr"
                class="q-mr-sm"
                flat
                square
                dense
                text-color="white"
                style="background-color:#e0c270;"
                icon="qr_code_2"
                size="12px"
              >
                <q-list dense>
                  <q-item clickable style="border: 1px solid #e0c270; background-color:white; color: grey;">
                    <q-item-section thumbnail>
                      <q-icon name="arrow_right"/>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label @click="receivePrintSn(3, props.row)">3 Cols</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable style="border: 1px solid #e0c270; background-color:white; color: grey;">
                    <q-item-section thumbnail>
                      <q-icon name="arrow_right"/>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label @click="receivePrintSn(2, props.row)">2 Cols</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable style="border: 1px solid #e0c270; background-color:white; color: grey;">
                    <q-item-section thumbnail>
                      <q-icon name="arrow_right"/>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label @click="receivePrintSn(1, props.row)">1 Cols</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>

          </q-td>
      </template>
    </q-table>
  </div>
  </template>

  <script>
  import Button_icon from 'src/components/IMS/Base/Button_icon'
  import Checkbox from 'src/components/IMS/Base/Checkbox'
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
        }
      },
      props: ['title', 'table_column', 'table_data','top_button', 'hide_footer', 'row_per_page','table_footer',"flat_status", "bordered_status", 'action_button','edit_button', 'view_button', 'delete_button','cancel_button','print_button', 'table_type','readonly_button','readonly_action','readonly_delete', 'sn_button'
      ,"pass_row_key",'forceLoading','update_weight_button','loading_button','update_weight_readonly','select_all','generate_sn_readonly','no_separator','print_btn_dropdown'],
      components: {
        Button_icon,
        Checkbox,
      },
      mounted(){
        this.onRequest({
          pagination: this.pagination,
          filter: undefined
        })
      },
      created() {
      },
      computed: {
        dbComponentBehavior() {
          return this.$store.getters['dbComponentBehavior/byLanguage']('erp')
        },
      },
      methods: {
          receivePrintSn(col, props)
          {
            this.$emit('onPrintSn',col,props);
          },
          receiveChangetdCheckbox(newVal)
          {
            this.$emit('receiveChangeCheckbox', newVal)
          },
          update_weight()
          {
            this.$emit('receiveChangeUpdateWeight');
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
          add_button : function()
          {
              this.$emit('add_button')
          },
          sn : function()
          {
              this.$emit('sn')
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
              // this.loading = false;

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

  <style scoped>
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

  * >>> tr, * >>> td
  {
      height: 35px !important;
  }

  * >>> .q-table__container
  {
      padding: 10px;
  }
  </style>

