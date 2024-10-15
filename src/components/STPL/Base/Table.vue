<template>
<!-- <div class="table_wrapper"> -->

     <!-- style="height: 250px" -->
    <q-table :flat="flat_status" class='tableclass' ref="table" :style="tableStyle" :bordered="bordered_status" :class="`main_table ${pass_class != undefined ? pass_class : ''}`"  :title="title" :rows="rows" :columns="columns" :pagination="false"
    @row-click="handleRowClick"   header-align="left"  hide-bottom  :rows-per-page-options="row_per_page" :loading="loading">

        <template v-slot:header="props">
            <q-tr :props="props" style="background-color: #34495E; color: white;">
            <q-th
                v-for="col in props.cols"
                :key="col.name"
                :props="props"

            >
              <!-- :style="getHeaderStyle(col)" -->
                <q-tooltip v-if="col.tooltip" anchor="top middle" self="center middle" style="font-size: 13px;">
                {{ col.tooltip }}
                </q-tooltip>
                {{ col.label }}
            </q-th>
            </q-tr>
        </template>

        <template v-slot:top-right v-if="top_button">

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

                <!-- <q-btn icon="delete_outline" color="negative" dense outline ripple class="q-mr-sm" @click="testdeleteRecordClick(props.row)">
                    <q-tooltip>
                        Delete
                    </q-tooltip>
                </q-btn> -->

            </q-td>
        </template>

        <!-- <template v-slot:body-cell-total_ticket="props">
          <q-td style="text-align:right; min-width: 20px;">

              {{props.row.total_ticket}}
          </q-td>
        </template>

            <template v-slot:body-cell-self_assign="props">
          <q-td style="text-align:right; min-width: 20px;">

              {{props.row.self_assign}}
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

        <template v-slot:loading>
          <q-inner-loading showing color="primary" />
        </template>
    </q-table>
<!-- </div> -->
</template>

<script>
import { ref } from 'vue'

export default {
    data(){
        return{
            columns: this.table_column,
            rows: this.table_data,
            loading: this.loadingStatus,
        }
    },
    props: ['title', 'table_column', 'table_data','loadingStatus','top_button', 'row_per_page','table_footer', "action_button", "edit_button",
    "view_button","delete_button", "flat_status", "bordered_status","pass_class", 'tableStyle'],
    components: {
    },
    created() {

    },
    computed: {

    },
    mounted(){
      this.$nextTick(()=>{

      //  console.log(this.$refs.tables);
      })
    },
    methods: {
        getHeaderStyle(column){
           var widthstyle = {
              'min-width': column.minWidth
            };
            if (this.$q.screen.width >= 1707.50) {
              widthstyle['min-width'] = column.minWidthExtraLarge;
            }
            else if (this.$q.screen.width >= 1517.78) {
              widthstyle['min-width'] = column.minWidthLarge;
            } else if (this.$q.screen.width >= 1366) {
              widthstyle['min-width'] = column.minWidthMedium;
            } else {
              widthstyle['min-width'] = column.minWidthSmall;
            }
            return widthstyle;
          }
        ,
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
        // getPaginationLabel: function(firstRowIndex,endRowIndex,totalRowsNumber )
        // {
        //     return 'Showing '+firstRowIndex +' to '+endRowIndex+' of '+totalRowsNumber;
        // },
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
        loadingStatus(newVal){
            this.loading = newVal
        }
    },
    updated(){

    }
}
</script>

<style scoped>
* >>> thead
{
background-color: #dee1e6;
}

* >>> tr, * >>> td
{
height: 32px !important;
padding: 4px 10px;
}

* >>>tbody td
{
font-size:16px;
}
 * >>> th
{
 font-size:16px;
 padding: 4px 10px;
 /* font-weight: bold; */
}
* >>> .q-table__container
{
padding: 8px;
}

.q-table{
  max-height: 100%;
}

*>>> .scroll {
overflow: hidden;
}

.q-table--no-wrap th{
  white-space: pre-wrap;
}
/* * >>> .q-table__bottom
{
display: -webkit-box;
} */

*>>>tr:nth-child(even) {
  background-color: #DBE9FA;
}

@media screen and (max-width: 1134px) {

* >>> tr, * >>> td
{
 white-space: pre-wrap;
}

* >>> tr, * >>> th
{
 font-size: 12px;
}

* >>>tbody td
{
font-size: 12px;
}
}

@media screen and (min-width: 1175px) {
* >>> tr, * >>> td
{
height: 32px !important;
padding: 2px 4px;
}

 * >>> th
{
 font-size: 12px;
 padding: 2px 0px;
}

* >>>tbody td
{
font-size: 13px;
}
}
/* @media screen and (min-width: 1366px) {

* >>> tr, * >>> td
{
height: 32px !important;
padding: 2px 4px;
}

* >>>tbody td
{
font-size: 14px;
}
 * >>> th
{
 font-size: 14px;
 padding: 2px 0px;
}
}

@media screen and (min-width: 1517.78px) {
* >>> tr, * >>> td
{
height: 32px !important;
padding: 2px 4px;
}

 * >>> th
{
 font-size: 16px;
 padding: 2px 0px;
}

* >>>tbody td
{
font-size: 16px;
}
}
@media screen and (min-width: 1707.50px) {

* >>> tr, * >>> td
{
height: 32px !important;
padding: 4px 6px;
}

* >>>tbody td
{
font-size: 20px;
}
 * >>> th
{
 font-size: 18px;
 padding: 2px 0px;
}
} */
</style>

