<template>
  <div class="border-container">
    <q-table :hide-bottom="hide_footer" :separator="no_separator ? 'none' : 'cell'" :flat="flat_status" :bordered="bordered_status" :class="sticky_column ? 'sticky_column' : ''" :title="title" :row_per_page="row_per_page"
    :rows="rows" :columns="columns" rows-per-page-label="Entries" :pagination-label="getPaginationLabel"
    :rows-per-page-options="row_per_page"
    :row-key="row_key"
    @request="onRequest"
    :filter="filter"
    v-model:pagination="pagination"
    binary-state-sort
    :loading="loading"
    :visible-columns="visibleColumns"
    >


        <template v-slot:header="props" >

            <q-tr v-if="column_reordering" :props="props">

                <template v-for="(col, index) in props.cols" :key="col.name">

                    <q-th
                        :rowspan="col.rowspan > 0 ? col.rowspan : null"
                        style="white-space: pre-wrap;"
                        :colspan="col.colspan"
                        :draggable="true"
                        @dragstart="dragStartColumn(col)" @dragover.prevent="dragOverColumn(col.index)"
                        @drop.prevent="dropColumn(col)" @touchstart="touchStartColumn(col.index)"
                        @touchmove.prevent="touchMoveColumn(col.index)" @touchend="touchEndColumn(col.index)"
                        :class="[col.index === dropColumnIndex && 'drop-target', 'cursor_table_header', `text_${col.header_align}`, !visibleColumns.includes(col.name) && visibleColumns.length != 0 && 'hide_columns', !col.main_column && 'hide_columns']"
                        :props='props'
                    >
                        <!-- {{col.rowspan}} -->
                        <template v-if="col.colspan > 0">
                            {{col.colspan_name}}
                        </template>

                        <template v-else>
                            {{col.label}}
                        </template>

                        <!-- start -
                        {{col.start_index}}
                        end -
                        {{col.end_index}} -->


                        <!-- {{index}} -->
                    </q-th>

                </template>
            </q-tr>

            <q-tr v-if="column_reordering" :props="props">
                <template v-for="(col, index) in props.cols" :key="col.name">
                    <q-th v-if="col.rowspan <=0 "
                        :class="['cursor_table_header', `text_${col.header_align}`, !visibleColumns.includes(col.name) && !visibleColumns.includes(col.main_column_name) && visibleColumns.length != 0 && 'hide_columns', col.rowspan > 0 && 'hide_columns']"
                    >
                        {{col.label}}
                    </q-th>

                </template>


            </q-tr>

            <q-tr v-else :props="props">
                <template v-for="(col, index) in props.cols" :key="col.name">
                    <q-th
                        :class="['cursor_table_header', `text_${col.header_align}`, !visibleColumns.includes(col.name) && !visibleColumns.includes(col.main_column_name) && visibleColumns.length != 0 && 'hide_columns']"

                    >
                        {{ col.label }}
                    </q-th>
                </template>
            </q-tr>


            <!-- <q-tr :props="props" class="filter_tr" v-if="filter_mode_on">
                <q-th
                    v-for="(col, col_index) in props.cols"
                    :key="col.field"
                    :props="props"
                    class="filter_th"
                >
                    <Input v-if="col.filter_type == 'input'" v-model:pass_value="columns[col_index].filter_value" v-on:receiveChange="handleInputFilter(col, columns[col_index].filter_value)" :dbComponentBehavior="dbComponentBehavior.text"/>
                    <Select v-if="col.filter_type == 'select'"
                        v-model:pass_value="columns[col_index].filter_value"
                        v-on:receiveChange="handleInputFilter(col, columns[col_index].filter_value)"
                        :dbComponentBehavior="dbComponentBehavior.select"
                        label=""
                        :options="col.filter_options"
                    />
                </q-th>
            </q-tr> -->

            <q-tr class="filter_tr" v-if="filter_mode_on">
                <template v-for="(col, col_index) in columns" :key="col.field">

                    <q-th v-if="col.name == 'action'"
                    :class="[!visibleColumns.includes(col.name) && !visibleColumns.includes(col.main_column_name) && visibleColumns.length != 0 && 'hide_columns']"
                    >
                        <q-btn color="red" icon="close" size="10px" square class="close_filter_button" @click="handleClearFilter"/>
                    </q-th>

                    <q-th v-else :class="['filter_th', !visibleColumns.includes(col.name) && !visibleColumns.includes(col.main_column_name) && visibleColumns.length != 0 && 'hide_columns']">
                        <Input v-if="col.filter_type == 'input'" v-model:pass_value="columns[col_index].filter_value" v-on:receiveChange="handleInputFilter(col, columns[col_index].filter_value)" :dbComponentBehavior="dbComponentBehavior.text"/>

                        <Select v-if="col.filter_type == 'select'"
                            v-model:pass_value="columns[col_index].filter_value"
                            v-on:receiveChange="handleInputSelect(col)"
                            :dbComponentBehavior="dbComponentBehavior.select"
                            label=""
                            :options="col.filter_options"
                        />

                        <!-- <Button v-if="col.filter_type == 'range'" v-on:receiveClick="handleRange(col)"
                            :pass_label="'Filter'"
                            :pass_no_caps="true"
                            :pass_square="true"
                            :pass_dense="true"
                            :class="[filter_mode_on ? 'active_section_button' : 'inactive_section_button', 'full_width_button']"
                        /> -->

                        <Input :readonly="true" v-if="col.filter_type == 'range'" v-model:pass_value="columns[col_index].filter_value" v-on:receiveClick="handleRange(col)" :dbComponentBehavior="dbComponentBehavior.text"/>


                    </q-th>
                </template>
            </q-tr>

        </template>

        <template v-slot:body="props">

            <q-tr @click="handleEdit(props)" v-if="row_reordering" :draggable="true"
            @dragstart="dragStartRow(props.rowIndex)" @dragover.prevent="dragOverRow(props.rowIndex)"
            @drop.prevent="dropRow(props.rowIndex)" @touchstart="touchStartRow(props.rowIndex)"
            @touchmove.prevent="touchMoveRow(props.rowIndex)" @touchend="touchEndRow(props.rowIndex)"
            :class="{ 'dragging': props.rowIndex === dragRowIndex && !forceRemoveDragging }">

                <template v-for="(col, colIndex) in props.cols" :key="colIndex">

                    <q-td :class="[`text_${col.align}`, !visibleColumns.includes(col.name) && !visibleColumns.includes(col.main_column_name) && visibleColumns.length != 0 && 'hide_columns']" v-if="col.name == 'action'">

                        <q-btn @click.stop="null" color="primary" icon="edit" size="10px" square class="edit_button">
                            <q-menu square>
                                <q-list dense class="custom_list">

                                    <q-item clickable v-close-popup class="item_list" v-if="allow_add" @click="handleAdd(props)">
                                        <q-item-section>
                                            Add
                                        </q-item-section>
                                    </q-item>
                                    <q-separator />
                                    <q-item clickable v-close-popup class="item_list" v-if="allow_edit" @click="handleEditDetails(props)">
                                        <q-item-section>
                                            Edit
                                        </q-item-section>
                                    </q-item>
                                    <q-separator />
                                    <q-item clickable v-close-popup class="item_list" v-if="allow_view" @click="handleView(props)">
                                        <q-item-section>
                                            View
                                        </q-item-section>
                                    </q-item>
                                    <q-separator />
                                    <q-item clickable v-close-popup class="item_list" v-if="allow_delete" @click="handleDelete(props)">
                                        <q-item-section>
                                            Delete
                                        </q-item-section>
                                    </q-item>
                                </q-list>
                            </q-menu>
                        </q-btn>

                    </q-td>

                    <q-td :class="[`text_${col.align}`, !visibleColumns.includes(col.name) && !visibleColumns.includes(col.main_column_name) && visibleColumns.length != 0 && 'hide_columns']" v-else>
                        {{col.value}}
                    </q-td>
                </template>

            </q-tr>

            <q-tr v-else @click="handleEdit(props)" :style="allow_select && props.row.select ? 'background-color: #e8eaee' : ''">

                <template v-for="(col, colIndex) in props.cols" :key="colIndex">

                    <q-td :class="[!visibleColumns.includes(col.name) && !visibleColumns.includes(col.main_column_name) && visibleColumns.length != 0 && 'hide_columns']" :style="`text-align: ${col.align}`" v-if="col.name == 'action'">

                        <q-btn @click.stop="null" color="primary" icon="edit" size="10px" square class="edit_button">
                            <q-menu square>
                                <q-list dense class="custom_list">

                                    <q-item clickable v-close-popup class="item_list" v-if="allow_add" @click="handleAdd(props)">
                                        <q-item-section>
                                            Add
                                        </q-item-section>
                                    </q-item>
                                    <q-separator />
                                    <q-item clickable v-close-popup class="item_list" v-if="allow_edit" @click="handleEditDetails(props)">
                                        <q-item-section>
                                            Edit
                                        </q-item-section>
                                    </q-item>
                                    <q-separator />
                                    <q-item clickable v-close-popup class="item_list" v-if="allow_view" @click="handleView(props)">
                                        <q-item-section>
                                            View
                                        </q-item-section>
                                    </q-item>
                                    <q-separator />
                                    <q-item clickable v-close-popup class="item_list" v-if="allow_delete" @click="handleDelete(props)">
                                        <q-item-section>
                                            Delete
                                        </q-item-section>
                                    </q-item>
                                    <q-separator />
                                    <q-item clickable v-close-popup class="item_list" v-if="trigger_user" @click="handleUser(props)">
                                        <q-item-section>
                                           User
                                        </q-item-section>
                                    </q-item>
                                </q-list>
                            </q-menu>
                        </q-btn>


                    </q-td>

                    <q-td :class="[!visibleColumns.includes(col.name) && !visibleColumns.includes(col.main_column_name) && visibleColumns.length != 0 && 'hide_columns']" :style="`text-align: ${col.align}`" v-else-if="col.name == 'Approved' || col.name == 'Rejected' || col.name == 'Consign' || col.name == 'SoldbyWeight'">
                      <q-toggle
                        :disable="true"
                        dense
                        style="padding-top: 7px; padding-bottom: 7px;"
                        color="green"
                        v-model="col.value"
                        :true-value="1"
                        :false-value="0"
                      />
                    </q-td>

                    <q-td :class="[!visibleColumns.includes(col.name) && !visibleColumns.includes(col.main_column_name) && visibleColumns.length != 0 && 'hide_columns']" :style="`text-align: ${col.align}`" v-else-if="col.name == 'Dept'" @click="handleClickTableData(props, col.name)">
                      {{col.value}}
                      <q-tooltip v-if="props.row.dept_desc">
                        {{props.row.dept_desc}}
                      </q-tooltip>
                    </q-td>

                    <q-td :class="[!visibleColumns.includes(col.name) && !visibleColumns.includes(col.main_column_name) && visibleColumns.length != 0 && 'hide_columns']" :style="`text-align: ${col.align}`" v-else-if="col.name == 'SubDept'" @click="handleClickTableData(props, col.name)">
                      {{col.value}}
                      <q-tooltip v-if="props.row.subdept_desc">
                        {{props.row.subdept_desc}}
                      </q-tooltip>
                    </q-td>

                    <q-td :class="[!visibleColumns.includes(col.name) && !visibleColumns.includes(col.main_column_name) && visibleColumns.length != 0 && 'hide_columns']" :style="`text-align: ${col.align}`" v-else-if="col.name == 'Category'" @click="handleClickTableData(props, col.name)">
                      {{col.value}}
                      <q-tooltip v-if="props.row.category_desc">
                        {{props.row.category_desc}}
                      </q-tooltip>
                    </q-td>

                    <q-td :class="[!visibleColumns.includes(col.name) && !visibleColumns.includes(col.main_column_name) && visibleColumns.length != 0 && 'hide_columns']" :style="`text-align: ${col.align}`" v-else-if="allow_modify && (col.name == 'Qty' || col.name == 'Qty_foc' || col.name == 'BulkQty' || col.name == 'BulkFOC')">
                      <Input :autofocusclick="true"
                      v-model:pass_value="props.row[col.name]"
                      v-on:receiveChange="handleModify($event, col.name, props.row)"
                      :dbComponentBehavior="dbComponentBehavior.text"/>
                    </q-td>

                    <q-td :class="[!visibleColumns.includes(col.name) && !visibleColumns.includes(col.main_column_name) && visibleColumns.length != 0 && 'hide_columns']" :style="`text-align: ${col.align}`" v-else>
                      {{col.value}}
                    </q-td>
                </template>

            </q-tr>



        </template>

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
            boundary-links
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

      <!--<template v-slot:body-cell-group_status="props">
          <q-td :style="`text-align:${props.col.align}`" >
          </q-td>
      </template> -->

    </q-table>
  </div>
</template>

<script>
import Input from 'src/components/ERP/Main/Input';
import Select from 'src/components/ERP/Main/Select'
import Checkbox from 'src/components/ERP/Base/Checkbox'
import Button from 'src/components/ERP/Main/Button';
import { getCssVar } from 'quasar';

export default {
    data(){
        return{
            forceRemoveDragging: false,
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
            dragRowIndex: null,
            dragColumnIndex: null,
            dragColumnColspan: null,
            dropRowIndex: null,
            dropColumnIndex: null,
            visibleColumns: this.pass_visible_columns,
            table_data_tooltip: '',
            dragColumnStartIndex: null,
            dragColumnEndIndex: null,
        }
    },
    props: ['table_column', 'table_data', 'hide_footer', 'row_per_page',"flat_status", "bordered_status","pass_row_key",'forceLoading','no_separator','filter_mode_on','column_reordering','row_reordering','allow_add','allow_edit','allow_view','allow_delete','pass_visible_columns', 'trigger_user', 'handleActionColumn', 'allow_select','allow_modify','sticky_column'],
    components: {
        Input,
        Select,
        Checkbox,
        Button
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
        rowRange() {
            const start = (this.pagination.page - 1) * this.pagination.rowsPerPage + 1;
            const end = Math.min(this.pagination.page * this.pagination.rowsPerPage, this.pagination.rowsNumber);
            return `${start} - ${end} of ${this.pagination.rowsNumber}`;
        }
    },
    methods: {
        handleClickTableData(pass_payload, col_name)
        {
            this.$nextTick(()=>{
                this.$emit('receivehandleClickTableData', pass_payload, col_name);
            });
        },
        handleClearFilter()
        {
            this.$nextTick(()=>{
                this.$emit('receiveHandleClearFilter');
            });
        },
        handleAdd(pass_payload)
        {
            this.$nextTick(()=>{
                this.$emit('receiveHandleAdd', pass_payload);
            });
        },
        handleModify(pass_payload, col_name, row)
        {
          this.$nextTick(()=>{
              this.$emit('receiveHandleModify', pass_payload, col_name, row);
          });
        },
        handleEdit(pass_payload)
        {
            this.$nextTick(()=>{
                this.$emit('receiveHandleEdit', pass_payload);
            });
        },
        handleEditDetails(pass_payload)
        {
            this.$nextTick(()=>{
                this.$emit('receiveHandleEditDetails', pass_payload);
            });
        },
        handleView(pass_payload)
        {
            this.$nextTick(()=>{
                this.$emit('receiveHandleView', pass_payload);
            });
        },
        handleDelete(pass_payload)
        {
            this.$nextTick(()=>{
                this.$emit('receiveHandleDelete', pass_payload);
            });
        },
        handleUser(pass_payload){
          this.$nextTick(()=>{
              this.$emit('receiveHandleUser', pass_payload);
          });
        },
        handleInputFilter(pass_payload, value)
        {
          console.log('pass_payload', pass_payload);
            this.$nextTick(()=>{
                pass_payload.filter_value = value;
                this.$emit('filter_column', pass_payload);
            });
        },
        handleInputSelect(pass_payload)
        {
            this.$nextTick(()=>{
                this.$emit('filter_column', pass_payload);
            });
        },
        handleRange(pass_payload)
        {
            this.$nextTick(()=>{
                this.$emit('filter_column_range', pass_payload);
            });
        },
        dragStartColumn(payload) {

            this.dragColumnIndex = payload.index;
            this.dragColumnColspan = payload.colspan;

            this.dragColumnStartIndex = payload.start_index;
            this.dragColumnEndIndex = payload.end_index;
        },
        dragOverColumn(index) {
            if (index !== this.dragColumnIndex) {
                this.dropColumnIndex = index;
            }
        },
        dropColumn(payload) {

            var index = payload.index
            var start_index = payload.start_index
            var end_index = payload.end_index

            if (index !== this.dragColumnIndex) {
                // const draggedColumn = this.columns.splice(this.dragColumnIndex, 1)[0];

                var dragColumnIndex = this.dragColumnIndex;
                var type = this.dragColumnIndex < index ? 'right' : 'left';

                if(type == "right")
                {
                    var targetIndex = end_index
                }
                else
                {
                    var targetIndex = start_index
                }

                var dragColumnColspan = this.dragColumnColspan <= 0 ? 1 : this.dragColumnColspan;

                var itemsToMove = this.columns.splice(this.dragColumnStartIndex, dragColumnColspan); // Removes 2 elements

                this.columns.splice(targetIndex, 0, ...itemsToMove);

                var index = 0
                var child_index = 0;

                for (const key in this.columns) {

                    this.columns[key].index = index;

                    if(this.columns[key].main_column)
                    {
                        index++;
                    }

                    this.columns[key].start_index = child_index;

                    if(this.columns[key].colspan > 0)
                    {
                        // alert(this.columns[key].field+ this.columns[key].colspan);
                        this.columns[key].end_index = Number(child_index) + Number(this.columns[key].colspan) -1;
                    }
                    else
                    {
                        this.columns[key].end_index = child_index;
                    }

                    child_index++;

                }

                this.dragColumnIndex = null;
                this.dropColumnIndex = null;

                this.$nextTick(()=>{
                    this.$emit('receiveColumnRearrange', this.columns);
                });
            }
        },
        dragStartRow(index) {
            if(this.row_reordering)
            {
                this.forceRemoveDragging =false
                this.dragRowIndex = index;
            }
        },
        dragOverRow(index) {
            if(this.row_reordering)
            {
                if (index !== this.dragRowIndex) {
                    this.dropRowIndex = index;
                }
            }
        },
        dropRow(index) {

            if(this.row_reordering)
            {
                if (index !== this.dragRowIndex) {
                    const draggedRow = this.rows.splice(this.dragRowIndex, 1)[0];
                    this.rows.splice(index, 0, draggedRow);
                    this.dragRowIndex = null;
                    this.dropRowIndex = null;
                }
                this.forceRemoveDragging = true;
            }
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
        },
        pass_visible_columns(newVal)
        {
            this.visibleColumns = newVal;
        },
    }
}
</script>

<style scoped>
.sticky_column
{
  font-size: 20px !important;
}
* >>> input[type="text"] {
    font-size: 11px;
}


.q-table--vertical-separator td:first-child, .q-table--vertical-separator th:first-child, .q-table--cell-separator td:first-child, .q-table--cell-separator th:first-child {
    border-left: 1px solid #0000001f;
}

* >>> .q-field--outlined.q-field--readonly .q-field__control:before {
    border-style: solid;
}

.full_width_button
{
    width: 100%;
    background-color: #e37a05;
    color: white;
}

.action_column
{
    color: #e37a05;
    text-decoration: underline;
}

* >>> .q-table__bottom > .q-table__control > .q-field, * >>> .q-table__bottom > .q-table__control > .q-field > .q-field__inner > .q-field__control, * >>> .q-table__bottom > .q-table__control > .q-field > .q-field__inner > .q-field__control > .q-field__append
{
    height: 24px;
}


    .q-table__container
    {
        border: 2px solid#5351514d
    }

    .hide_columns
    {
        display: none;
    }

    .custom_list
    {
        min-width: 100px;
    }

    .close_filter_button
    {
        padding: 8px 10px;
    }

    .edit_button
    {
        padding: 8px 10px;
    }

    .text_left
    {
        text-align: left;
    }

    .text_center
    {
        text-align: center;
    }

    .text_middle
    {
        text-align: middle;
    }

    .item_list {
        padding: 0px;
        border-radius: 0;
        text-align: center;
    }

    .dragging {
        opacity: 0.5;
        touch-action: none;
    }

    .drop-target {
        background-color: lightblue;
        touch-action: none;
    }

    * >>> thead > tr:nth-child(1)
    {
        background-color: #dee1e6;
    }

    * >>> thead > tr:nth-child(2)
    {
        background-color: #dee1e6;
    }

    .filter_tr
    {
        background-color: #f4f4f4;
    }

    .filter_th >>> .q-table__sort-icon
    {
        display: none;
    }

    * >>> thead tr
    {
        height: 32px;
    }

    *>>>.q-table th:not(.filter_th) {
        font-weight: bold;
        font-size: 11px;
        -webkit-user-select: none;
        user-select: none;
        font-family: Poppins;
        color: black;
        /* text-align: center !important; */
        padding-top: 0;
        padding-bottom: 0;
    }

    .filter_th
    {
        padding: 5px;
    }

    .cursor_table_header
    {
        cursor: pointer;
    }

    * >>> tbody tr
    {
        height: 32px;
    }

    * >>> .q-table td
    {

        padding: 3px  3px !important;
        font-size: 11px !important;
        font-weight: 500;
        padding-top: 0;
        padding-bottom: 0;
        height: 32px;
        cursor: pointer;
    }

    .border-container {
        /*border: 1px solid #ababab;
        border-radius: 8px;*/
        /*padding-top: 24px;*/
        width: 100%;
        gap: 16px;
    }

    .round-button-custom >>>.q-btn--round {
        border-radius: 50%;
        padding: 0;
        min-width: 2em !important;
        min-height: 25px;
    }

</style>

