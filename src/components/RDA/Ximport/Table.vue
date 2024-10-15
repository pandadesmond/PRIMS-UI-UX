<template>
  <div class="expand_table_wrapper" style="position:relative;">
    <!-- <Table 
    :pass_class="pass_class"
    :title="title" 
    :table_data="json_container" 
    :table_footer="table_footer" 
    :table_column="table_column" 
    :row_per_page="row_per_page" 
    :hide_footer="hide_footer"
    :action_button="action_button"
    :edit_button="edit_button"
    :view_button="view_button"
     v-on:action="handleAction" v-on:edit="handleEdit" v-on:list="handleList" v-on:delete="handleDelete"
     /> -->

    <div class="q-pa-md table_wrapper">
      <q-table :flat="flat_status" :bordered="bordered_status" :class="`main_table ${pass_class != undefined ? pass_class : ''}`" v-if="hide_footer" :title="title" :rows="rows" :columns="columns" row-key="name" rows-per-page-label="Entries" :pagination-label="getPaginationLabel" hide-bottom :rows-per-page-options="[row_per_page]"
      @row-click="handleRowClick">
          <template v-slot:top-right v-if="top_button" >

              <q-btn v-if="top_button" v-on:click="header_button()" icon="add" color="green" dense outline ripple class="q-mr-sm" >
                  <q-tooltip>
                      Create
                  </q-tooltip>
              </q-btn>

          </template>

          <template v-slot:body-cell-action="props">
              <q-td>

                  <q-btn icon="edit_note" color="info" dense outline ripple class="q-mr-sm" v-on:click="action(props.row)"
                  v-if="action_button">
                      <q-tooltip>
                          Action
                      </q-tooltip>
                  </q-btn>

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

                  <q-btn icon="delete" color="negative" dense outline ripple class="q-mr-sm" v-on:click="delete(props.row)"
                  v-if="delete_button">
                      <q-tooltip>
                          Delete
                      </q-tooltip>
                  </q-btn>

              </q-td>
          </template>
          <template v-slot:body-cell-edit="props">
              <q-td>
                  <q-btn icon="edit_note" color="primary" dense outline ripple class="q-mr-sm" v-on:click="edit(props.row)" >
                      <q-tooltip>
                          Edit
                      </q-tooltip>
                  </q-btn>

              </q-td>
          </template>

          <template v-slot:bottom-row v-if="rows.length <= 0">
              <q-tr>
                  <q-td colspan="100%">
                      <q-icon size="1.9em" name="warning" />
                      <span>
                          No data available
                      </span>
                  </q-td>
              </q-tr>
          </template>

      </q-table>

      <q-table :filter="filter" :flat="flat_status" :bordered="bordered_status" :class="`main_table ${pass_class != undefined ? pass_class : ''}`" v-else :title="title" :rows="rows" :columns="columns" row-key="name" rows-per-page-label="Entries" :pagination-label="getPaginationLabel" :rows-per-page-options="row_per_page"
      @row-click="handleRowClick">

          <template v-slot:header="props">
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

          <template v-slot:top-right v-if="search_button || top_button">

                <q-input v-if="search_button" borderless dense debounce="300" v-model="filter" placeholder="Search">
                    <template v-slot:append>
                        <q-icon name="search" />
                    </template>
                </q-input>

              <q-btn v-if="top_button" v-on:click="header_button()" icon="add" color="green" dense outline ripple class="q-mr-sm" >
                  <q-tooltip>
                      Create
                  </q-tooltip>
              </q-btn>

          </template>

          <template v-slot:body-cell-action="props">
              <q-td>

                  <q-btn icon="edit_note" color="info" dense outline ripple class="q-mr-sm" v-on:click="handleAction(props.row)"
                  v-if="action_button">
                      <q-tooltip>
                          Action
                      </q-tooltip>
                  </q-btn>

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

                  <q-btn icon="delete" color="negative" dense outline ripple class="q-mr-sm" v-on:click="delete(props.row)"
                  v-if="delete_button">
                      <q-tooltip>
                          Delete
                      </q-tooltip>
                  </q-btn>

              </q-td>
          </template>

           <template v-slot:body-cell-Store="props">
            <q-td :style="[props.row.UpdateStat > 0 ? '' : '']">
              <!-- <q-td :style="[props.row.UpdateStat > 0 ? 'color:red;' : '']">//need to add back -->
                <!-- {{props.value}} -->
                <div v-if="props.row.UpdateStat > 0">
                  <label style="font-weight:bold;">
                    <!-- *  //need to add back-->
                    {{props.value}}
                    <!-- Last update  -->
                    <!-- {{props.row.LastUpdatedDate}} -->
                  </label>
                </div>

                <span v-else>{{props.value}}</span>

                <q-tooltip anchor="top right" v-if="props.row.UpdateStat > 0" :style="`font-size:13px;font-weight:bold;`">
                    * Last update {{props.row.LastUpdatedDate}}
                </q-tooltip>

              </q-td>
            </template>

          <template v-slot:body-cell-isactive="props">
              <q-td>
                  <!-- {{map_isactive(props.row)}} -->
                  <!-- {{props.value}} -->
                  <q-checkbox disable v-model="props.value" true-value="1" false-value="0" />
              </q-td>
          </template>

          <template v-slot:bottom-row v-if="table_footer">
              <q-tr class="table_footer">

                  <q-td :class="table_footer_details.classes" :style="'text-align:'+table_footer_details.align+';'" :key="table_footer_details" v-for="table_footer_details in table_footer">
                      {{table_footer_details.value}}
                  </q-td>

              </q-tr>
          </template>
      </q-table>
    </div>
    <Loading :loading="loading" />
  </div>
</template>

<script>
import Table from 'src/components/Base/Table';
import Loading from 'src/components/Base/Loading';

export default {
    data () {
      return {
        json_container: this.table_data,
        loading: true,
        rows: [],
        columns: [],
        filter:"",
      }
    },
    props:['title', 'table_column', 'table_data', 'row_per_page', 'hide_footer', 'forceLoading','table_footer','action_button','edit_button','view_button','pass_class', 'search_button','multiple_json','closeLoading','index'],
    created() {
    },
    mounted(){

        this.$nextTick(()=>{

            if(this.multiple_json)
            {
                this.columns = this.multiple_json.table_column;
                this.rows = this.multiple_json.table_data;
                // this.ori_json_data = JSON.parse(JSON.stringify(this.multiple_json.pass_data));

                setTimeout(()=>{
                    this.loading = false;
                },300);

            }


        });


    },
    components:{
        Table,
        Loading
    },
    computed: {
    },
    methods: {
      handleAction: function(payload)
      {
          this.$emit('main_action', payload)
      },
      handleEdit: function(payload)
      {
          this.$emit('main_edit', payload)
      },
      handleList: function(payload)
      {
          this.$emit('main_list', payload)
      },
      handleDelete: function(payload)
      {
          this.$emit('main_delete', payload)
      }
    },
    watch: {
      forceLoading(newVal)
      {
        if(newVal)
        {
          this.loading = true;
        }
      },
      table_column(newVal)
      {
        this.columns = newVal;
      },
      table_data(newVal)
      {
        this.json_container = newVal;
        this.loading = false;
        this.rows = newVal;
      },
    }
}
</script>

<style scoped>
* >>> .table_footer
{
  font-weight: bold;
  background-color: #ededed;
}

.table_footer
{
  font-weight: bold;
  background-color: #ededed;
}
</style>