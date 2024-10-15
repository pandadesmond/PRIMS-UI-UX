<template>
  <div class="">
    <q-table separator="cell" :flat="flat_status" :bordered="bordered_status" class="main_table" :title="title" :row_per_page="row_per_page"
    :rows="rows" :columns="columns" rows-per-page-label="Entries" :pagination-label="getPaginationLabel"
    :rows-per-page-options="row_per_page"
    :row-key="row_key"
    @request="onRequest"
      :filter="filter"
      v-model:pagination="pagination"
      binary-state-sort
      :loading="loading"
      >

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
              {{ col.label }}
          </q-th>
          </q-tr>
      </template>

      <template v-if="top_button" v-slot:top-right>
        <Button_icon :disabled="readonly_button" :flat="true" :icon="'add'" v-on:receiveClick="add_button()" :font_color="'white'" :color="'green'" :text="'Add'" :outline="false" size="12px" class="q-pr-sm q-mr-sm"/>

        <Button_icon :loading="loading_button" :disabled="readonly_button ? true : update_weight_readonly" :flat="false" v-on:receiveClick="update_weight()" :font_color="'black'" :color="'white'" :text="'Update SN'" :outline="true" size="12px" class="q-pr-sm q-mr-sm" v-if="update_weight_button" />

        <Button_icon :disabled="readonly_button ? true : generate_sn_readonly" :flat="true" v-on:receiveClick="sn()" :font_color="'white'" :color="'#094161'" :text="'Generate SN'" :outline="false" size="12px" class="q-pr-sm q-mr-sm" v-if="sn_button" />
      </template>

      <template v-slot:body="props">
        <q-tr :props="props"  style="cursor: pointer;">
          <!-- <q-td auto-width>
            <q-btn  size="sm" style="background-color:#58cf54;color:white;" round dense @click="props.expand = !props.expand" :icon="props.expand ? 'remove' : 'add'" />
          </q-td> -->
          <template
          v-for="col in props.cols"
          :key="col.name"
          :props="props"
          >
            <q-td
            v-if="col.name == 'item_desc'"
            @click="props.row.expand!=undefined ? props.row.expand = !props.row.expand : ''"
            :style="[col.name == 'job_status' ? `background-color:${props.row.status_color}` : '', col.style, `text-align:${col.align}`]">
              {{col.value}}
              <Button_icon v-if="props.row.expand!=undefined" :icon="!props.row.expand ? 'add' : 'remove'" :flat="false" :font_color="!props.row.expand ? 'green' : 'red'" :color="'white'" :outline="true" size="12px"
            v-on:receiveClick="handlePrint"/>
            </q-td>

            <q-td
            v-else
            @click="props.row.expand!=undefined ? props.row.expand = !props.row.expand : ''"
            :style="[col.name == 'job_status' ? `background-color:${props.row.status_color}` : '', col.style, `text-align:${col.align}`]">
              {{col.value}}
            </q-td>
          </template>
        </q-tr>

        <q-tr v-show="props.row.expand" :props="props" v-if="props.row.json_expand.length != 0"
        :key="row_header">
          <q-td
            colspan="100%"
          >

          <q-table
          :columns="props.row.json_column"
          :rows="props.row.json_expand"
          binary-state-sort
          hide-bottom
          >
          </q-table>


            <!-- <table style="width: 100%;border: 1px solid #094161;padding: 10px;"  cellspacing="0" cellpadding="0">
                <thead>
                    <tr v-show="props.row.expand" :props="props">
                        <th
                            v-for="(col,header, index) in props.row.json_column"
                            :key="index"
                            :style="[col.headerStyle]"
                            class="theme_color"
                        >
                            <span>{{col.label}}</span>
                        </th>

                    </tr>
                </thead>
                <tbody>
                    <tr v-show="props.row.expand" :props="props" v-for="(row,row_header) in props.row.json_expand"
                    :key="row_header">

                        <td
                        v-for="(col,header, index) in row"
                        :key="header"
                        :style="[`text-align:${props.row.json_column[index].align}`, 'border: 1px solid #e0e0e0;']"
                        >
                            <span>{{col}}</span>
                        </td>

                    </tr>
                </tbody>
            </table> -->
          </q-td>
        </q-tr>

      </template>
    </q-table>
  </div>
  </template>

  <script>
  import Button_icon from 'src/components/ERP/Base/Button_icon'
  import Checkbox from 'src/components/ERP/Base/Checkbox'
  export default {
      data(){
        return{
          columns: this.table_column,
          rows: this.table_data,
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
        }
      },
      props: ['title', 'table_column', 'table_data','top_button', 'hide_footer', 'row_per_page','table_footer',"flat_status", "bordered_status", 'action_button','edit_button', 'view_button', 'delete_button','table_type'
      ,"pass_row_key"],
      components: {
        Button_icon,
        // Checkbox
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
  .new_div{
    padding-left: 5px;
    padding-right: 5px;
    background-color: #90EE90;
    border-radius: 5px;
  }
  .ordering_div{
    padding-left: 5px;
    padding-right: 5px;
    background-color: #0D98BA;
    border-radius: 5px;
  }
  .preparing_div{
    padding-left: 5px;
    padding-right: 5px;
    background-color: #df9e9c;
    border-radius: 5px;
  }
  .completed_div{
    padding-left: 5px;
    padding-right: 5px;
    background-color: #9c9cdf;
    border-radius: 5px;
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

