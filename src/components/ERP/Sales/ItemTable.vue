<template>
<div class="q-pa-md table_wrapper">
  <q-table separator="cell" :flat="flat_status" :bordered="bordered_status" class="main_table my_sticky_header_table" :title="title" :row_per_page="row_per_page"
  :rows="rows" :columns="columns" rows-per-page-label="Entries" :pagination-label="getPaginationLabel"
  :rows-per-page-options="row_per_page"
  :row-key="row_key"
  @request="onRequest"
  @row-click="onRowClick"
    :filter="filter"
    v-model:pagination="pagination"
    binary-state-sort
    :loading="loading"
    >

    <template v-slot:top-right v-if="top_button">
      <Button_icon :disabled="readonly_button" :flat="true" :icon="'add'" v-on:receiveClick="add_button()" :font_color="'white'" :color="'green'" :text="'Add'" :outline="false" size="12px" class="q-pr-sm q-mr-sm"/>
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
            <span class="line_break" v-html="col.label" />
        </q-th>
        </q-tr>
    </template>

    <template v-slot:body="props">
      <q-tr @click="onRowClick(props.row)" :props="props"  :style="[props.row.selected ? 'background-color: #eeeeee;' : '']">
        <q-td v-for="col in props.cols"
              :key="col.name"
              :props="props">
          <!-- <span v-if="col.field=='Barcode'">{{col}}{{ col.value }}</span>
          <span v-else>{{ col.value }}</span> -->
          {{ col.value }}
        </q-td>
      </q-tr>
    </template>

    <!-- <template v-slot:body-cell-action="props">
        <q-td>
            <Button_icon :icon="'edit_note'" :color="'#094161'" :outline="false" size="12px" v-on:click="action(props.row)" v-if="action_button" class="q-mr-sm" />

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
            <Button_icon :icon="'delete'" :color="'negative'" :outline="false" size="12px" v-on:click="remove(props.row)" v-if="delete_button && (table_type == 'supplier' ? (permission.includes('DS') ? true : false): (permission.includes('DDLT') ? true: false))" class="q-mr-sm" />
        </q-td>
    </template> -->
  </q-table>
</div>
</template>

<script>
import set from 'vue'
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
        state: {
          selectedRow: ""
        },
      }
    },
    props: ['title', 'table_column', 'table_data','top_button', 'hide_footer', 'row_per_page','table_footer',"flat_status", "bordered_status", 'action_button','edit_button', 'view_button', 'delete_button','table_type'
    ,"pass_row_key", 'forceLoading'],
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
        onRowClick : function (row)
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

<style lang="sass">
.my_sticky_header_table
  /* height or max-height is important */
  max-height: 380px

  thead tr:first-child th
    background-color: #dee1e6

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
