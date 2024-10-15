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
      <!-- division -->
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
        <q-input class="q-pr-md" borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <!-- <Button_icon :disabled="readonly_button" :flat="true" :icon="'add'" v-on:receiveClick="add_button()" :font_color="'white'" :color="'green'" :text="'Add'" :outline="false" size="12px" class="q-pr-sm q-mr-sm"/> -->

        <q-btn-dropdown
          split
          square
          dense
          icon="add"
          label="Add"
          no-caps
          text-color="white"
          style="background-color:green;"
          size="12px"
          @click="path=='divisionhierarchy' ? add_button('division') : add_button('manufacturer')"
        >
        <q-list dense>
          <q-item clickable class="print_select">
            <q-item-section thumbnail>
              <q-icon name="arrow_right" color="grey"/>
            </q-item-section>
            <q-item-section>
              <q-item-label v-if="path=='divisionhierarchy'" @click="add_button('department')">Department</q-item-label>
              <q-item-label v-if="path=='manufacturerhierarchy'" @click="add_button('brand')">Brand</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-if="path=='divisionhierarchy'" class="print_select">
            <q-item-section thumbnail>
              <q-icon name="arrow_right" color="grey"/>
            </q-item-section>
            <q-item-section>
              <q-item-label @click="add_button('subdept')">Sub - Dept</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-if="path=='divisionhierarchy'" class="print_select">
            <q-item-section thumbnail>
              <q-icon name="arrow_right" color="grey"/>
            </q-item-section>
            <q-item-section>
              <q-item-label @click="add_button('category')">Category</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
        </q-btn-dropdown>
      </template>

      <template v-slot:body="props">
        <q-tr
        :props="props"
        style="cursor: pointer;"
        >
          <!-- <q-td auto-width>
            <q-btn  size="sm" style="background-color:#58cf54;color:white;" round dense @click="props.expand = !props.expand" :icon="props.expand ? 'remove' : 'add'" />
          </q-td> -->
          <template
          v-for="col in props.cols"
          :key="col.name"
          >
            <q-td
            @click="col.name!='action' ? props.row.expand = !props.row.expand : ''; closeExpand('division', props, props.row.expand)"
            :style="[col.name == 'job_status' ? `background-color:${props.row.status_color}` : '', col.style, `text-align:${col.align}`]"
            >
              <q-btn v-if="col.name=='action'" icon="edit_note" color="info" dense :outline="button_no_outline" ripple class="q-mr-sm" v-on:click="path=='divisionhierarchy'? action('division',props.row) : action('manufacturer',props.row)">
                  <q-tooltip>
                      Action
                  </q-tooltip>
              </q-btn>

              <q-btn v-if="col.name=='action'" icon="delete" color="negative" dense :outline="button_no_outline" ripple class="q-mr-sm" v-on:click="path=='divisionhierarchy'? remove('division',props.row) : remove('manufacturer',props.row)">
                  <q-tooltip>
                      Delete
                  </q-tooltip>
              </q-btn>

              <span v-show="col.name!='action'">{{col.value}}</span>
            </q-td>
          </template>
        </q-tr>

        <!-- department -->
        <q-tr
        v-show="props.row.expand"
        :props="props"
        v-if="props.row.json_expand.length != 0"
        :key="row_header"
        >
          <q-td
            colspan="100%"
          >

            <table style="width: 100%;border: 1px solid #094161;padding: 10px;"  cellspacing="0" cellpadding="0">
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
                    <template v-for="(dept_td, j) in props.row.json_expand" :key="j">
                      <q-tr :props="props" style="cursor: pointer;">
                        <q-td v-for="(variable, k) in dept_td" :key="k" v-show="k!='expand'" @click="k!='action' ? dept_td.expand = !dept_td.expand : ''; closeExpand('department',j, dept_td.expand)" :style="[variable.name == 'job_status' ? `background-color:${props.row.status_color}` : '', variable.style, `text-align:${variable.align}`]">
                          <q-btn v-if="k=='action'" icon="edit_note" color="info" dense :outline="button_no_outline" ripple class="q-mr-sm" v-on:click="path=='divisionhierarchy'? action('department',props.row.dept[j]) : action('brand',props.row.brand[j])">
                              <q-tooltip>
                                  Action
                              </q-tooltip>
                          </q-btn>

                          <q-btn v-if="k=='action'" icon="delete" color="negative" dense :outline="button_no_outline" ripple class="q-mr-sm" v-on:click="path=='divisionhierarchy'? remove('department',props.row.dept[j]) : remove('brand',props.row.brand[j])">
                              <q-tooltip>
                                  Delete
                              </q-tooltip>
                          </q-btn>

                          <span v-if="k!='action'">{{ variable }}</span>
                        </q-td>
                      </q-tr>

                      <!-- subdept -->
                      <q-tr
                      v-for="(dept, j) in props.row.dept" :key="j"
                      v-show="dept_td.dept_code == dept.code && dept.subdept.length!=0 && dept_td.expand"
                      >
                        <q-td colspan="100%">
                          <table style="width: 100%; border: 1px solid #094161; padding: 10px;" cellspacing="0" cellpadding="0">
                            <thead>
                              <tr v-show="props.row.expand" :props="props">
                                <th v-for="(subdept_th, k) in dept.json_column" :key="k" :style="[dept.headerStyle]" class="theme_color">
                                  <span>{{ subdept_th.label }}</span>
                                </th>
                              </tr>
                            </thead>

                            <tbody>
                              <template v-for="(subdept_td, j) in dept.json_expand" :key="j">
                              <q-tr :props="props" style="cursor: pointer;">
                                <q-td v-for="(variable, k) in subdept_td" :key="k" v-show="k!='expand'" @click="k!='action' ? subdept_td.expand = !subdept_td.expand : ''; closeExpand('subdept',j, subdept_td.expand)" :style="[variable.name == 'job_status' ? `background-color:${props.row.status_color}` : '', variable.style, `text-align:${variable.align}`]">
                                  <q-btn v-if="k=='action'" icon="edit_note" color="info" dense :outline="button_no_outline" ripple class="q-mr-sm" v-on:click="action('subdept',dept.subdept[j])">
                                      <q-tooltip>
                                          Action
                                      </q-tooltip>
                                  </q-btn>

                                  <q-btn v-if="k=='action'" icon="delete" color="negative" dense :outline="button_no_outline" ripple class="q-mr-sm" v-on:click="remove('subdept',dept.subdept[j])">
                                      <q-tooltip>
                                          Delete
                                      </q-tooltip>
                                  </q-btn>

                                  <span v-if="k!='action'">{{ variable }}</span>
                                </q-td>
                              </q-tr>

                              <!-- category -->
                              <q-tr
                              v-for="(subdept, j) in dept.subdept" :key="j"
                              v-show="subdept_td.subdept_code == subdept.code && subdept.category.length!=0 && subdept_td.expand"
                              >
                                <q-td colspan="100%">
                                  <table style="width: 100%; border: 1px solid #094161; padding: 10px;" cellspacing="0" cellpadding="0">
                                    <thead>
                                      <tr v-show="props.row.expand" :props="props">
                                        <th v-for="(category_th, k) in subdept.json_column" :key="k" :style="[subdept.headerStyle]" class="theme_color">
                                          <span>{{ category_th.label }}</span>
                                        </th>
                                      </tr>
                                    </thead>

                                    <tbody>
                                        <q-tr v-for="(category_td, k) in subdept.json_expand" :key="k" :props="props" style="cursor: pointer;">
                                          <td v-for="(variable, l) in category_td" :key="l" v-show="l!='expand'" >
                                            <q-btn v-if="l=='action'" icon="edit_note" color="info" dense :outline="button_no_outline" ripple class="q-mr-sm" v-on:click="action('category',subdept.category[k])">
                                                <q-tooltip>
                                                    Action
                                                </q-tooltip>
                                            </q-btn>

                                            <q-btn v-if="l=='action'" icon="delete" color="negative" dense :outline="button_no_outline" ripple class="q-mr-sm" v-on:click="remove('category',subdept.category[k])">
                                                <q-tooltip>
                                                    Delete
                                                </q-tooltip>
                                            </q-btn>

                                            <span v-if="l!='action'">{{ variable }}</span>
                                          </td>
                                        </q-tr>
                                    </tbody>
                                  </table>
                                </q-td>
                              </q-tr>
                            </template>
                            </tbody>
                          </table>
                        </q-td>
                      </q-tr>
                    </template>
                </tbody>
            </table>
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
          path: this.$route.name,
        }
      },
      props: ['title', 'table_column', 'table_data','top_button', 'hide_footer', 'row_per_page','table_footer',"flat_status", "bordered_status", 'action_button','edit_button', 'view_button', 'delete_button','table_type'
      ,"pass_row_key",'button_no_outline'],
      components: {
        // Button_icon,
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
          closeExpand : function(payload, index, expand)
          {
              this.$emit('main_close_expand', payload, index, expand)
          },
          action : function(newVal,payload)
          {
              this.$emit('main_action', newVal, payload)
          },
          edit : function(payload)
          {
              this.$emit('main_edit', payload)
          },
          list : function(payload)
          {
              this.$emit('main_list', payload)
          },
          remove : function(newVal, payload)
          {
              this.$emit('main_delete', newVal, payload)
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
          add_button : function(newVal)
          {
              this.$emit('add_button', newVal)
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

