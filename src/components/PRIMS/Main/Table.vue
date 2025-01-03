<template>
    <div class="border-container">
        <q-table :hide-bottom="hide_footer" :separator="no_separator ? 'none' : 'cell'" :flat="flat_status" :bordered="bordered_status" class="" :title="title" :row_per_page="row_per_page"
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
                            :draggable="true"
                            @dragstart="dragStartColumn(index)" @dragover.prevent="dragOverColumn(index)"
                            @drop.prevent="dropColumn(index)" @touchstart="touchStartColumn(index)"
                            @touchmove.prevent="touchMoveColumn(index)" @touchend="touchEndColumn(index)"
                            :class="[index === dropColumnIndex && 'drop-target', 'cursor_table_header', `text_${col.header_align}`, !visibleColumns.includes(col.name) && visibleColumns.length != 0 && 'hide_columns']"
                            :props="props"
                        >
                            <template v-if="col.data_type == 'select_all'">
                                <q-checkbox @click="handleSelectAll" v-model="selectAll" />
                            </template>
                            <template v-else>
                                {{ col.label }}
                            </template>
                            
                        </q-th>
                    </template>


                </q-tr>

                <q-tr v-else :props="props">
                    <template v-for="col in props.cols" :key="col.name">
                        <q-th
                            :class="['cursor_table_header', `text_${col.header_align}`, !visibleColumns.includes(col.name) && visibleColumns.length != 0 && 'hide_columns']"
                            :props="props"
                        >
                            {{ col.label }}
                        </q-th>
                    </template>
                </q-tr>

                <q-tr class="filter_tr" v-if="filter_mode_on">
                    <template v-for="(col, col_index) in columns" :key="col.field">

                        <q-th v-if="col.name == 'action'" :class="[!visibleColumns.includes(col.name) && visibleColumns.length != 0 && 'hide_columns']">
                            <q-btn color="red" icon="close" size="10px" square class="close_filter_button" @click="handleClearFilter"/>
                        </q-th>

                        <q-th v-else :class="['filter_th', !visibleColumns.includes(col.name) && visibleColumns.length != 0 && 'hide_columns']">
                            <Input v-if="col.filter_type == 'input'" v-model:pass_value="columns[col_index].filter_value" v-on:receiveChange="handleInputFilter(col, columns[col_index].filter_value)" :dbComponentBehavior="dbComponentBehavior.text"/>

                            <Select v-if="col.filter_type == 'select'"
                                v-model:pass_value="columns[col_index].filter_value"
                                v-on:receiveChange="handleInputSelect(col)"
                                :dbComponentBehavior="dbComponentBehavior.select"
                                label=""
                                :options="col.filter_options"
                            />

                            <Button v-if="col.filter_type == 'range'" v-on:receiveClick="handleRange(col)"
                                :pass_label="'Filter'"
                                :pass_no_caps="true"
                                :pass_square="true"
                                :pass_dense="true"
                                :class="[filter_mode_on ? 'active_section_button' : 'inactive_section_button']"
                            />
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

                        <q-td :class="[,`text_${col.align}`, !visibleColumns.includes(col.name) && visibleColumns.length != 0 && 'hide_columns']" v-if="col.name == 'action'" >

                            <q-btn v-if="allow_edit" @click="handleEditDetails(props)" @click.stop="null" color="primary" icon="edit" size="10px" square class="action_button">
                                <q-tooltip>
                                    Edit
                                </q-tooltip>
                            </q-btn>

                            <q-btn v-if="allow_add" @click="handleAdd(props)" @click.stop="null" color="positive" icon="add_box" size="10px" square class="action_button">
                                <q-tooltip>
                                    Add
                                </q-tooltip>
                            </q-btn>

                            <q-btn v-if="allow_view" @click="handleView(props)" @click.stop="null" color="green" icon="list" size="10px" square class="action_button">
                                <q-tooltip>
                                    View
                                </q-tooltip>
                            </q-btn>

                            <q-btn v-if="allow_history" @click="handleHistory(props)" @click.stop="null" color="warning" icon="history" size="10px" square class="action_button">
                                <q-tooltip>
                                    History
                                </q-tooltip>
                            </q-btn>

                            <q-btn v-if="allow_delete" @click="handleDelete(props)" @click.stop="null" color="negative" icon="delete" size="10px" square class="action_button">
                                <q-tooltip>
                                    Delete
                                </q-tooltip>
                            </q-btn>

                            <q-btn v-if="allow_remove" @click="handleRemove(props)" @click.stop="null" color="negative" icon="remove" size="10px" square class="action_button">
                                <q-tooltip>
                                    Remove
                                </q-tooltip>
                            </q-btn>

                            <q-btn v-if="allow_print" @click="handleprint(props)" @click.stop="null" color="blue" icon="print" size="10px" square class="action_button">
                                <q-tooltip>
                                    Print
                                </q-tooltip>
                            </q-btn>

                            <q-btn v-if="allow_print_tta" @click.stop="null" color="blue" icon="print" size="10px" square class="action_button">
                                <q-menu square>
                                    <q-list dense class="custom_list">
                                        <q-item clickable v-close-popup class="item_list" @click="handlePrintTTA(props,'proposal')">
                                            <q-item-section>
                                                Proposed TTA
                                            </q-item-section>
                                        </q-item>

                                        <q-separator />
                                        
                                        <q-item clickable v-close-popup class="item_list" @click="handlePrintTTA(props,'tta')">
                                            <q-item-section>
                                                TTA
                                            </q-item-section>
                                        </q-item>
                                    </q-list>
                                </q-menu>
                            </q-btn>
                            
                            <q-btn v-if="allow_upload" @click="handleUpload(props)" @click.stop="null" color="green" icon="file_upload" size="10px" square class="action_button">
                                <q-tooltip>
                                    Upload
                                </q-tooltip>
                            </q-btn>
                            
                            <q-btn v-if="allow_download" @click="handleDownload(props)" @click.stop="null" color="green" icon="download" size="10px" square class="action_button">
                                <q-tooltip>
                                    Download
                                </q-tooltip>
                            </q-btn>
                            
                            <q-btn v-if="allow_cancel && props.row.canceled == 0 && props.row.posted == 0" @click="handleCancel(props)" @click.stop="null" color="warning" icon="close" size="10px" square class="action_button">
                                <q-tooltip>
                                    Cancel
                                </q-tooltip>
                            </q-btn>

                            <q-btn v-if="allow_action" @click.stop="null" color="primary" icon="settings" size="10px" square class="action_button">
                                <q-menu square>
                                    <q-list dense class="custom_list">

                                        <q-item clickable v-close-popup class="item_list" v-if="permission.includes('authorised') && props.row.authorised == 0 && props.row.rejected == 0 && props.row.terminated == 0" @click="handleAuthorise(props)">
                                            <q-item-section>
                                                Authorise
                                            </q-item-section>
                                        </q-item>
                                        <q-separator />
                                        <q-item clickable v-close-popup class="item_list" v-if="permission.includes('approved') && props.row.authorised == 1 && props.row.approved == 0 && props.row.rejected == 0 && props.row.terminated == 0" @click="handleApprove(props)">
                                            <q-item-section>
                                                Approve
                                            </q-item-section>
                                        </q-item>
                                        <q-separator />
                                        <q-item clickable v-close-popup class="item_list" v-if="permission.includes('renewed') && props.row.authorised == 1 && props.row.approved == 1 && props.row.rejected == 0 && props.row.terminated == 0" @click="handleRenewal(props)">
                                            <q-item-section>
                                                Renew
                                            </q-item-section>
                                        </q-item>
                                        <q-separator />
                                        <q-item clickable v-close-popup class="item_list" v-if="permission.includes('rejected') && props.row.rejected == 0" @click="handleReject(props)">
                                            <q-item-section>
                                                Reject
                                            </q-item-section>
                                        </q-item>
                                        <q-separator />
                                        <q-item clickable v-close-popup class="item_list" v-if="permission.includes('terminated') && props.row.terminated == 0" @click="handleTerminate(props)">
                                            <q-item-section>
                                                Terminate
                                            </q-item-section>
                                        </q-item>
                                    </q-list>
                                </q-menu>
                            </q-btn>
                        </q-td>

                        <q-td :class="[`text_${col.align}`, !visibleColumns.includes(col.name) && visibleColumns.length != 0 && 'hide_columns']" v-else-if="col.name == 'select'">
                            <q-checkbox v-model="col.value" />
                            {{formatAmount(col.value, col.data_type, col.data_decimal)}}
                        </q-td>

                        <q-td :class="[!visibleColumns.includes(col.name) && visibleColumns.length != 0 && 'hide_columns']" :style="`text-align: ${col.align}`" v-else-if="col.name == 'set_active' || col.name == 'isapprove' || col.name == 'posted' || col.name == 'pip' || col.name == 'lhdn_validated' || col.name == 'canceled' || col.name == 'dn' || col.name == 'issue_cn' || col.name == 'system_generate' || col.name == 'landed_cost' || col.name == 'nontrade_as_stock' || col.name == 'is_dc' || col.name == 'rep_all_ads' || col.name == 'set_default' || col.name == 'IsExempted' || col.name == 'active' || col.name == 'inactive' || col.name == 'block_po' ||
                        col.name == 'none_return' || col.name == 'block_order' || col.name == 'rs_manual_soq' || col.name == 'rs_manual_order' || col.name == 'rs_ord_D1' || col.name == 'rs_ord_D2' || col.name == 'rs_ord_D3' || col.name == 'rs_ord_D4' || col.name == 'rs_ord_D5' || col.name == 'rs_ord_D6' || col.name == 'rs_ord_D7' || col.name == 'group_status' || col.name == 'TempItem' || col.name == 'Amendment' || col.name == 'cost_manual'
                        || col.name == 'Print_Req'  || col.name == 'ishq'  || col.name == 'Send_Req'  || col.name == 'Send_Approved' || col.name == 'Post_Req' || col.name == 'primary_barcode'
                        || col.name == 'Organic_Certified' || col.name == 'Non_GMO' || col.name == 'No_Colouring' || col.name == 'Gluten_Free' || col.name == 'Plant_Based' || col.name == 'Pesticide_Free' || col.name == 'Direct_from_Farm' || col.name == 'Free_Range' || col.name == 'Lactose_Free' || col.name == 'Keto_Friendly' || col.name == 'Vegan' || col.name == 'Festive' || col.name == 'Non_Halal' || col.name == 'EStore_Tag' || col.name == 'EStore_Available'
                        || col.name == 'SoldByWeight' || col.name == 'BillStatus' || col.name == 'posted' || col.name == 'Set_Disable' || col.name == 'CancelPromo' || col.name == 'Posted' || col.name == 'cancel'
                        ">
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

                        <q-td :class="[`text_${col.align}`, !visibleColumns.includes(col.name) && visibleColumns.length != 0 && 'hide_columns']" v-else>
                            {{formatAmount(col.value, col.data_type, col.data_decimal)}}
                        </q-td>
                    </template>

                </q-tr>


                <q-tr v-else @click="handleEdit(props)" :style="allow_select && props.row.select ? 'background-color: #e8eaee' : ''">

                    <template v-for="(col, colIndex) in props.cols" :key="colIndex">

                        <q-td :class="[!visibleColumns.includes(col.name) && visibleColumns.length != 0 && 'hide_columns']" :style="`text-align: ${col.align}`" v-if="col.name == 'action'" class="q-gutter-x-sm">

                            <q-btn v-if="allow_edit" @click="handleEditDetails(props)" @click.stop="null" color="primary" icon="edit" size="10px" square class="action_button">
                                <q-tooltip>
                                    Edit
                                </q-tooltip>
                            </q-btn>

                            <q-btn v-if="allow_add" @click="handleAdd(props)" @click.stop="null" color="positive" icon="add_box" size="10px" square class="action_button">
                                <q-tooltip>
                                    Add
                                </q-tooltip>
                            </q-btn>

                            <q-btn v-if="allow_view" @click="handleView(props)" @click.stop="null" color="green" icon="list" size="10px" square class="action_button">
                                <q-tooltip>
                                    View
                                </q-tooltip>
                            </q-btn>

                            <q-btn v-if="allow_history" @click="handleHistory(props)" @click.stop="null" color="warning" icon="history" size="10px" square class="action_button">
                                <q-tooltip>
                                    History
                                </q-tooltip>
                            </q-btn>

                            <q-btn v-if="allow_delete" @click="handleDelete(props)" @click.stop="null" color="negative" icon="delete" size="10px" square class="action_button">
                                <q-tooltip>
                                    Delete
                                </q-tooltip>
                            </q-btn>

                            <q-btn v-if="allow_remove" @click="handleRemove(props)" @click.stop="null" color="negative" icon="remove" size="10px" square class="action_button">
                                <q-tooltip>
                                    Remove
                                </q-tooltip>
                            </q-btn>

                            <q-btn v-if="allow_print" @click="handlePrint(props)" @click.stop="null" color="blue" icon="print" size="10px" square class="action_button">
                                <q-tooltip>
                                    Print
                                </q-tooltip>
                            </q-btn>

                            <q-btn v-if="allow_print_tta" @click.stop="null" color="blue" icon="print" size="10px" square class="action_button">
                                <q-menu square>
                                    <q-list dense class="custom_list">
                                        <q-item clickable v-close-popup class="item_list" @click="handlePrintTTA(props,'proposal')">
                                            <q-item-section>
                                                Proposed TTA
                                            </q-item-section>
                                        </q-item>

                                        <q-separator />
                                        
                                        <q-item clickable v-close-popup class="item_list" @click="handlePrintTTA(props,'tta')">
                                            <q-item-section>
                                                TTA
                                            </q-item-section>
                                        </q-item>
                                    </q-list>
                                </q-menu>
                            </q-btn>

                            <q-btn v-if="allow_upload" @click="handleUpload(props)" @click.stop="null" color="green" icon="file_upload" size="10px" square class="action_button">
                                <q-tooltip>
                                    Upload
                                </q-tooltip>
                            </q-btn>
                            
                            <q-btn v-if="allow_download" @click="handleDownload(props)" @click.stop="null" color="green" icon="download" size="10px" square class="action_button">
                                <q-tooltip>
                                    Download
                                </q-tooltip>
                            </q-btn>
                            
                            <q-btn v-if="allow_cancel && props.row.canceled == 0" @click="handleCancel(props)" @click.stop="null" color="warning" icon="close" size="10px" square class="action_button">
                                <q-tooltip>
                                    Cancel
                                </q-tooltip>
                            </q-btn>

                            <q-btn v-if="allow_action" @click.stop="null" color="primary" icon="settings" size="10px" square class="action_button">
                                <q-menu square>
                                    <q-list dense class="custom_list">
                                        <q-item clickable v-close-popup class="item_list" v-if="permission.includes('authorised') && props.row.authorised == 0 && props.row.rejected == 0 && props.row.terminated == 0" @click="handleAuthorise(props)">
                                            <q-item-section>
                                                Authorise
                                            </q-item-section>
                                        </q-item>
                                        <q-separator />
                                        <q-item clickable v-close-popup class="item_list" v-if="permission.includes('approved') && props.row.authorised == 1 && props.row.approved == 0 && props.row.rejected == 0 && props.row.terminated == 0" @click="handleApprove(props)">
                                            <q-item-section>
                                                Approve
                                            </q-item-section>
                                        </q-item>
                                        <q-separator />
                                        <q-item clickable v-close-popup class="item_list" v-if="permission.includes('renewed') && props.row.authorised == 1 && props.row.approved == 1 && props.row.renewed == 0 && props.row.rejected == 0 && props.row.terminated == 0" @click="handleRenewal(props)">
                                            <q-item-section>
                                                Renew
                                            </q-item-section>
                                        </q-item>
                                        <q-separator />
                                        <q-item clickable v-close-popup class="item_list" v-if="permission.includes('rejected') && props.row.rejected == 0 && props.row.terminated == 0" @click="handleReject(props)">
                                            <q-item-section>
                                                Reject
                                            </q-item-section>
                                        </q-item>
                                        <q-separator />
                                        <q-item clickable v-close-popup class="item_list" v-if="permission.includes('terminated') && props.row.terminated == 0 && props.row.rejected == 0" @click="handleTerminate(props)">
                                            <q-item-section>
                                                Terminate
                                            </q-item-section>
                                        </q-item>
                                    </q-list>
                                </q-menu>
                            </q-btn>
                        </q-td>

                        <q-td :class="[`text_${col.align}`, !visibleColumns.includes(col.name) && visibleColumns.length != 0 && 'hide_columns']" v-else-if="col.name == 'select'">
                            <q-checkbox v-show="props.row.hasOwnProperty('select')" v-model="props.row.select" />
                        </q-td>

                        <q-td :class="[!visibleColumns.includes(col.name) && visibleColumns.length != 0 && 'hide_columns']" :style="`text-align: ${col.align}`" v-else-if="col.name == 'set_active' || col.name == 'isapprove' || col.name == 'posted' || col.name == 'pip' || col.name == 'lhdn_validated' || col.name == 'canceled' || col.name == 'dn' || col.name == 'issue_cn' || col.name == 'system_generate' || col.name == 'landed_cost' || col.name == 'nontrade_as_stock' || col.name == 'is_dc' || col.name == 'rep_all_ads' || col.name == 'set_default' || col.name == 'IsExempted' || col.name == 'active' || col.name == 'inactive' || col.name == 'block_po' ||
                        col.name == 'none_return' || col.name == 'block_order' || col.name == 'rs_manual_soq' || col.name == 'rs_manual_order' || col.name == 'rs_ord_D1' || col.name == 'rs_ord_D2' || col.name == 'rs_ord_D3' || col.name == 'rs_ord_D4' || col.name == 'rs_ord_D5' || col.name == 'rs_ord_D6' || col.name == 'rs_ord_D7' || col.name == 'group_status' || col.name == 'TempItem' || col.name == 'Amendment' || col.name == 'cost_manual'
                        || col.name == 'Print_Req'  || col.name == 'ishq'  || col.name == 'Send_Req'  || col.name == 'Send_Approved' || col.name == 'Post_Req' || col.name == 'primary_barcode'
                        || col.name == 'Organic_Certified' || col.name == 'Non_GMO' || col.name == 'No_Colouring' || col.name == 'Gluten_Free' || col.name == 'Plant_Based' || col.name == 'Pesticide_Free' || col.name == 'Direct_from_Farm' || col.name == 'Free_Range' || col.name == 'Lactose_Free' || col.name == 'Keto_Friendly' || col.name == 'Vegan' || col.name == 'Festive' || col.name == 'Non_Halal' || col.name == 'EStore_Tag' || col.name == 'EStore_Available'
                        || col.name == 'SoldByWeight' || col.name == 'BillStatus' || col.name == 'posted' || col.name == 'Set_Disable' || col.name == 'CancelPromo' || col.name == 'Posted' || col.name == 'cancel'
                        ">
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

                        <q-td :class="[!visibleColumns.includes(col.name) && visibleColumns.length != 0 && 'hide_columns']" :style="`text-align: ${col.align}; ${col.style}`" v-else>
                            <template v-if="col.data_type == 'checkbox'">
                                <q-toggle
                                :disable="false"
                                dense
                                style="padding-top: 7px; padding-bottom: 7px;"
                                color="green"
                                v-model="props.row[col.field]"
                                :true-value="1"
                                :false-value="0"
                                />
                            </template>

                            <template v-else-if="col.data_type == 'input_number'">    
                                <Input :autofocusclick="true"
                                v-model:pass_value="props.row[col.field]"
                                v-on:receiveChange="handleChangeInputNumber(col, props.row)"
                                :dbComponentBehavior="col.prefix == '%' ? dbComponentBehavior.percent_right : col.prefix == '$' ? dbComponentBehavior.amount_right : dbComponentBehavior.number_right"/>                                
                            </template>

                            <template v-else-if="col.data_type == 'input_text'"> 
                                <div v-if="props.row[`readonly_${col.field}`]">
                                    {{props.row[col.field] == null ? "-" : props.row[col.field]}}
                                </div>
                                <div v-else>
                                    <Input :autofocusclick="true"
                                    v-model:pass_value="props.row[col.field]"
                                    v-on:receiveChange="handleChangeInputText(col, props.row)"
                                    :dbComponentBehavior="dbComponentBehavior.text"/>
                                </div>                             
                            </template>

                            <template v-else-if="col.data_type == 'select'">
                                <Select
                                    v-model:pass_value="props.row[col.field]"
                                    v-on:receiveChange="handleChangeSelect(col, props.row)"
                                    :dbComponentBehavior="dbComponentBehavior.select"
                                    label=""
                                    :options="col.input_options ? col.input_options : props.row[`input_options_${col.field}`]"
                                    :readonly="props.row[`readonly_${col.field}`]"
                                />                                
                            </template>

                            <template v-else>
                                {{formatAmount(col.value, col.data_type, col.data_decimal)}}
                            </template>

                        </q-td>
                    </template>
                </q-tr>
            </template>

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
        </q-table>
    </div>
</template>

<script>
import Input from 'src/components/PRIMS/Main/Input';
import Select from 'src/components/PRIMS/Main/Select'
import Checkbox from 'src/components/PRIMS/Base/Checkbox'
import Button from 'src/components/PRIMS/Main/Button';
import Datepicker from 'src/components/PRIMS/Main/Datepicker';

export default {
    data(){
        return{
            selectAll: false,
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
            permission: localStorage.getItem("permission") != "" && localStorage.getItem("permission") != "null" && localStorage.getItem("permission") != null ? localStorage.getItem("permission") : "",
            page_function: this.$route.name,
            dragRowIndex: null,
            dragColumnIndex: null,
            dropRowIndex: null,
            dropColumnIndex: null,
            visibleColumns: this.pass_visible_columns
        }
    },
    props: ['table_column', 'table_data', 'hide_footer', 'row_per_page',"flat_status", "bordered_status","pass_row_key",'pass_visible_columns', 
    'trigger_user', 'forceLoading','no_separator','filter_mode_on','column_reordering','row_reordering',
    'allow_add','allow_edit','allow_view','allow_delete', 'allow_select', 'allow_print', 'allow_remove', 'allow_upload','allow_action','allow_cancel',
    'allow_history','allow_download','allow_print_tta'],
    components: {
        Input,
        Select,
        Checkbox,
        Button,
        Datepicker,
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
            return this.$store.getters['dbComponentBehavior/byLanguage']('tta')
        },
        rowRange() {
            const start = (this.pagination.page - 1) * this.pagination.rowsPerPage + 1;
            const end = Math.min(this.pagination.page * this.pagination.rowsPerPage, this.pagination.rowsNumber);
            return `${start} - ${end} of ${this.pagination.rowsNumber}`;
        }
    },
    methods: {
        handleSelectAll()
        {
            this.$emit('receiveSelectAll', this.selectAll);
        },
        formatAmount(value, type = null, decimal = null)
        {
            if(value !== undefined)
            {
                var value = value;
            }
            else
            {
                var value = '-';
            }

            if(type == "number")
            {
                if(decimal)
                {
                    var value = Number(value).toFixed(decimal);
                }
                else
                {
                    var value = Number(value);
                }

                var parts = value.toString().split(".");
                const numberPart = parts[0];
                const decimalPart = parts[1];
                const thousands = /\B(?=(\d{3})+(?!\d))/g;

                return numberPart.replace(thousands, ",") + (decimalPart ? "." + decimalPart : "");

            }
            else
            {
                var value = value;

                return value;
            }
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
        handleSelect(pass_payload)
        {
          this.$nextTick(()=>{
              this.$emit('receiveHandleSelect', pass_payload);
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
        handleHistory(pass_payload)
        {
            this.$nextTick(()=>{
                this.$emit('receiveHandleHistory', pass_payload);
            });
        },
        handleUpload(pass_payload)
        {
            this.$nextTick(()=>{
                this.$emit('receiveHandleUpload', pass_payload);
            });
        },
        handleDownload(pass_payload)
        {
            this.$nextTick(()=>{
                this.$emit('receiveHandleDownload', pass_payload);
            });
        },
        handleDelete(pass_payload)
        {
            this.$nextTick(()=>{
                this.$emit('receiveHandleDelete', pass_payload);
            });
        },
        handleRemove(pass_payload)
        {
            this.$nextTick(()=>{
                this.$emit('receiveHandleRemove',pass_payload);
            });
        },
        handleRenewal(pass_payload){
            this.$nextTick(()=>{
                this.$emit('receiveHandleRenewal', pass_payload)
            })
        },
        handleReject(pass_payload){
            this.$nextTick(()=>{
                this.$emit('receiveHandleReject', pass_payload)
            })
        },
        handleApprove(pass_payload){
            this.$nextTick(()=>{
                this.$emit('receiveHandleApprove', pass_payload)
            })
        },
        handleAuthorise(pass_payload){
            this.$nextTick(()=>{
                this.$emit('receiveHandleAuthorise', pass_payload)
            })
        },
        handleTerminate(pass_payload){
            this.$nextTick(()=>{
                this.$emit('receiveHandleTerminate', pass_payload)
            })
        },
        handlePrint(pass_payload){
            this.$nextTick(()=>{
                this.$emit('receiveHandlePrint', pass_payload)
            })
        },
        handlePrintTTA(pass_payload,type){
            pass_payload.type = type;
            this.$nextTick(()=>{
                this.$emit('receiveHandlePrint', pass_payload)
            })
        },
        handleCancel(pass_payload){
            this.$nextTick(()=>{
                this.$emit('receiveHandleCancel', pass_payload)
            })
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
        handleChangeInputNumber(col,row)
        {
            var pass_payload = {
                col: col,
                row: row,
            }
            this.$nextTick(()=>{
                this.$emit('change_input_number', pass_payload);
            });
        },
        handleChangeInputText(col,row)
        {
            var pass_payload = {
                col: col,
                row: row,
            }
            this.$nextTick(()=>{
                this.$emit('change_input_text', pass_payload);
            });
        },
        handleChangeSelect(col,row)
        {
            var pass_payload = {
                col: col,
                row: row,
            }
            this.$nextTick(()=>{
                this.$emit('change_select', pass_payload);
            });
        },
        dragStartColumn(index) {
            this.dragColumnIndex = index;
        },
        dragOverColumn(index) {
            if (index !== this.dragColumnIndex) {
                this.dropColumnIndex = index;
            }
        },
        dropColumn(index) {

            if (index !== this.dragColumnIndex) {
                const draggedColumn = this.columns.splice(this.dragColumnIndex, 1)[0];

                this.columns.splice(index, 0, draggedColumn);

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
            console.log(this.pagination)
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
            this.rows = newVal.data.results;
            this.pagination.rowsNumber = newVal.data.count;
            this.loading = false;
            this.selectAll = false;

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
        pass_visible_columns(newVal)
        {
            this.visibleColumns = newVal;
        }
    }
}
</script>

<style scoped>
* >>> .q-table__sort-icon
{
    display: none;
}

* >>> input[type="text"] {
    font-size: 11px;
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

.action_button
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

* >>> .q-td
{
    min-width: 100px;
    overflow: hidden; 
    text-overflow: ellipsis; 
    white-space: nowrap;
}

.q-field__input >>>.q-field__control {
    max-width: 200px !important;
    cursor: text;
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