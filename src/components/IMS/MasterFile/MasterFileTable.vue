<template>
<div class="">
  <q-table separator="cell" :flat="flat_status" :bordered="bordered_status" class="main_table" :title="title" :row_per_page="row_per_page"
  :rows="rows" :columns="columns" rows-per-page-label="Entries" :pagination-label="getPaginationLabel"
  :rows-per-page-options="row_per_page"
  :row-key="row_key"
  @request="onRequest"
    :filter="filter"
    v-model:pagination="pagination"
    :loading="loading"
    binary-state-sort
    >

    <template v-slot:header="props" >
        <q-tr :props="props">
        <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
            @click="sortBy(col)"
        >
            <q-tooltip v-if="col.tooltip" anchor="top middle" self="center middle" style="font-size: 13px;">
            {{ col.tooltip }}
            </q-tooltip>
            <!-- {{ col.label }} -->
            <span v-if="col.label !== 'Select'">{{ col.label }}</span>
            <!-- <div v-if="col.label !== 'Select'">{{ col.label }}</div> -->
            <div v-else>
            <Checkbox
            v-if="showSelectAll"
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

    <template v-slot:body-cell-active="props">
        <q-td :style="`text-align:${props.col.align}`">
          <Checkbox
            :disable="true"
            :no_label="true"
            v-model="props.row.active"
            :dbComponentBehavior="dbComponentBehavior.text"
            :true-value="1"
            :false-value="0"
            />
        </q-td>
    </template>

    <template v-slot:body-cell-action="props">
        <q-td style="padding-right: 0px;">
            <Button_icon :icon="'edit_note'" :color="'#094161'" :outline="false" size="12px" v-on:click="action(props.row)" v-if="action_button" class="q-mr-sm" />

            <q-btn icon="visibility" color="primary" dense outline ripple class="q-mr-sm" v-on:click="edit(props.row)"
            v-if="edit_button">
                <q-tooltip>
                    Edit
                </q-tooltip>
            </q-btn>

            <q-btn icon="visibility" size="12px" color="positive" dense outline ripple class="q-mr-sm" v-on:click="list(props.row)"
            v-if="view_button">
                <q-tooltip>
                    View
                </q-tooltip>
            </q-btn>

            <Button_icon :disabled="readonly_button" icon="print" color="primary" :outline="false" size="12px" dense ripple :disable="showAddLoading" v-if="print_button" class="q-mr-sm" v-on:click="handlePrint(props.row)"/>

            <Button_icon :icon="'delete'" :color="'negative'" :outline="false" size="12px" v-on:click="remove(props.row)" v-if="delete_button" class="q-mr-sm" />

            <q-btn-dropdown
              v-if="props.row.sn==1 && props.row.print_qr"
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
                    <q-item-label @click="receivePrintSn(3, props.row.item_guid)">3 Cols</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable style="border: 1px solid #e0c270; background-color:white; color: grey;">
                  <q-item-section thumbnail>
                    <q-icon name="arrow_right"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label @click="receivePrintSn(2, props.row.item_guid)">2 Cols</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable style="border: 1px solid #e0c270; background-color:white; color: grey;">
                  <q-item-section thumbnail>
                    <q-icon name="arrow_right"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label @click="receivePrintSn(1, props.row.item_guid)">1 Cols</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
        </q-td>
    </template>

    <template v-slot:body-cell-sn="props">
        <q-td :style="`text-align:${props.col.align}`">
          <Checkbox
            :disable="true"
            :no_label="true"
            v-model="props.row.sn"
            :dbComponentBehavior="dbComponentBehavior.text"
            :true-value="1"
            :false-value="0"
            />
        </q-td>
    </template>

    <template v-slot:body-cell-complete="props">
        <q-td :style="`text-align:${props.col.align}`">
          <Checkbox
            :disable="true"
            :no_label="true"
            v-model="props.row.complete"
            :dbComponentBehavior="dbComponentBehavior.text"
            :true-value="1"
            :false-value="0"
            />
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
        showSelectAll: false,
      }
    },
    props: ['title', 'table_column', 'table_data','top_button', 'hide_footer', 'row_per_page','table_footer',"flat_status", "bordered_status", 'action_button','edit_button', 'view_button', 'delete_button','table_type'
    ,"pass_row_key", "forceLoading",'select_all', 'print_button'],
    components: {
      Button_icon,
      Checkbox
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
        sortBy(props)
        {
          this.$emit('onSort',props);
        },
        handlePrint(props)
        {
            this.$emit('handlePrint',props);
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
        receiveChangethCheckbox(newVal)
        {
            this.$emit('receiveChangeSelectAll', newVal)
        },
        receiveChangetdCheckbox(newVal)
        {
            this.$emit('receiveChangeCheckbox', newVal)
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
            this.rows = newVal.data == undefined ? newVal : newVal.data.results;
            this.pagination.rowsNumber = newVal.data == undefined ? newVal.length : newVal.data.count;
            this.loading = false;
              this.showSelectAll = true;

            this.$emit("adjForceLoading");

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

