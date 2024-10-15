<template>
<div class="q-pa-md table_wrapper">
    <!-- {{tta_list}} -->
    <q-table :flat="flat_status" :bordered="bordered_status" :class="`main_table ${pass_class != undefined ? pass_class : ''}`" v-if="hide_footer" :title="title" :rows="rows" :columns="columns" row-key="name" rows-per-page-label="Entries" :pagination-label="getPaginationLabel" hide-bottom :rows-per-page-options="[row_per_page]"
    @row-click="handleRowClick">
        <template v-slot:top-right v-if="top_button" >

            <!-- <q-btn v-on:click="header_button()"  style="background: green; color: white;font-size:11px;padding-left:10px;padding-right:10px;" dense :type="type" class="full-width">
                Create
            </q-btn> -->

            <q-btn v-if="top_button" v-on:click="header_button()" icon="add" color="green" dense outline ripple class="q-mr-sm" >
                <q-tooltip>
                    Create
                </q-tooltip>
            </q-btn>
            <!-- <q-input borderless dense debounce="300"  placeholder="Search">
                <template v-slot:append>
                    <q-icon name="search" />
                </template>
            </q-input> -->

            <!-- <q-btn icon="add" color="primary" dense outline class="float-right q-ma-sm" @click="addRecordClick"></q-btn> -->
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

                <!-- <q-btn icon="delete_outline" color="negative" dense outline ripple class="q-mr-sm" @click="testdeleteRecordClick(props.row)">
                    <q-tooltip>
                        Delete
                    </q-tooltip>
                </q-btn> -->

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

    <q-table :flat="flat_status" :bordered="bordered_status" :class="`main_table ${pass_class != undefined ? pass_class : ''}`" v-else :title="title" :rows="rows" :columns="columns" row-key="name" rows-per-page-label="Entries" :pagination-label="getPaginationLabel" :rows-per-page-options="row_per_page"
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

        <template v-slot:top-right v-if="top_button">

            <!-- <q-btn v-on:click="header_button()"  style="background: green; color: white;font-size:11px;padding-left:10px;padding-right:10px;" dense :type="type" class="full-width">
                Create
            </q-btn> -->

            <q-btn v-if="top_button" v-on:click="header_button()" icon="add" color="green" dense outline ripple class="q-mr-sm" >
                <q-tooltip>
                    Create
                </q-tooltip>
            </q-btn>
            <!-- <q-input borderless dense debounce="300"  placeholder="Search">
                <template v-slot:append>
                    <q-icon name="search" />
                </template>
            </q-input> -->

            <!-- <q-btn icon="add" color="primary" dense outline class="float-right q-ma-sm" @click="addRecordClick"></q-btn> -->
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

                <!-- <q-btn icon="delete_outline" color="negative" dense outline ripple class="q-mr-sm" @click="testdeleteRecordClick(props.row)">
                    <q-tooltip>
                        Delete
                    </q-tooltip>
                </q-btn> -->

            </q-td>
        </template>
        <!-- <template v-slot:body-cell-edit="props">
            <q-td>
                <q-btn icon="edit_note" color="primary" dense outline ripple class="q-mr-sm" v-on:click="edit(props.row)" >
                    <q-tooltip>
                        Edit
                    </q-tooltip>
                </q-btn>

            </q-td>
        </template> -->
        <template v-slot:body-cell-isactive="props">
            <q-td>
                {{map_isactive(props.row)}}
            </q-td>
        </template>

        <template v-slot:bottom-row v-if="table_footer">
            <q-tr class="table_footer">
                <!-- <q-td colspan="100%">
                    Bottom row
                    {{table_footer}}
                </q-td> -->

                <q-td :class="table_footer_details.classes" :style="'text-align:'+table_footer_details.align+';'" :key="table_footer_details" v-for="table_footer_details in table_footer">
                    {{table_footer_details.value}}
                </q-td>

            </q-tr>
        </template>
    </q-table>
</div>
</template>

<script>
// hide_footer="true" (hide table footer)
//row_per_page="0" (row show per page of table)
export default {
    data(){
        return{
            columns: this.table_column,
            rows: this.table_data
        }
    },
    props: ['title', 'table_column', 'table_data','top_button', 'hide_footer', 'row_per_page','table_footer', "action_button", "edit_button",
    "view_button","delete_button", "flat_status", "bordered_status","pass_class"],
    components: {
    },
    created() {
    },
    computed: {
    },
    methods: {
        action : function(payload)
        {
            this.$emit('action', payload)
        },
        edit : function(payload)
        {
            this.$emit('edit', payload)
        },
        list : function(payload)
        {
            this.$emit('list', payload)
        },
        delete : function(payload)
        {
            this.$emit('delete', payload)
        },
        header_button : function(payload)
        {
            this.$emit('head_button', payload)
        },
        getPaginationLabel: function(firstRowIndex,endRowIndex,totalRowsNumber )
        {
            return 'Showing '+firstRowIndex +' to '+endRowIndex+' of '+totalRowsNumber;
        },
        map_isactive: function(payload)
        {
            return payload.isactive == '1' ? 'Yes' : 'No';
        },
        handleRowClick(evt, row, index)
        {
            this.$emit('receiveRowClick',row)
        }
    },
    watch: {
        table_data(newVal)
        {
            this.rows = newVal
        },
        table_column(newVal)
        {
            this.columns = newVal
        },
    }
}
</script>

<style scoped>
.q-btn
{
    border-radius: 0px;
}
</style>

