<template>
<div>

    <q-table
     separator="cell"
    :flat="flat_status"
    :bordered="bordered_status"
    class="main_table"
    :title="title"
    :rows="rows"
    :columns="columns"
    :row-key="pass_key"
    :pagination="{ rowsPerPage: 999999 }"
    hide-pagination
    @row-click="handleRowClick"
    :filter="filter"
    >
      <template v-slot:header="props">
        <q-tr :props="props">

            <template v-for="col in props.cols"
            :key="col.name"
            :props="props">

            <q-th v-if="col.name == 'action'">
                <Checkbox
                size="sm"
                :disable="false"
                :no_label="true"
                v-model="select_all"
                :dbComponentBehavior="dbComponentBehavior.text"
                v-on:receiveChangenewVal="receiveChangethCheckbox"
                />
            </q-th>

            <q-th v-else >
                {{col.label}}
            </q-th>

            </template>
          
        </q-tr>
      </template>

      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template v-slot:body-cell-code="props">
        <q-td :style="['text-align:'+props.col.align+';', props.row.selected && 'background-color:#d9d7d7;']">
          {{props.row.code}}
        </q-td>
      </template>


        <template v-slot:body-cell-action="props">

            <q-td :style="['text-align:'+props.col.align]">

                <Checkbox
                size="sm"
                :disable="false"
                :no_label="true"
                v-model="props.row.selected"
                :dbComponentBehavior="dbComponentBehavior.text"
                v-on:receiveChangenewVal="handleCheckbox"
                />

            </q-td>
        </template>


      <template v-slot:body-cell-name="props">
        <q-td :style="['text-align:'+props.col.align+';', props.row.selected && '']">
          {{props.row.name}}
        </q-td>
      </template>

      <template v-slot:body-cell-active="props">
          <q-td :style="['text-align:'+props.col.align+';', props.row.selected && '']">
            <q-checkbox :disable="props.row.disable" v-model="props.row.active" :true-value="1" :false-value="0" @click="handleClickCheckbox($event, props)"/>
          </q-td>
      </template>


    </q-table>
</div>
</template>

<script>
import Checkbox from 'src/components/SUBLOT/Invoice/Checkbox'

export default {
    data(){
      return {
        filter: '',
      }
    },
    rows: [],
    columns: [],
    props: [
      'title',
      'table_column',
      'table_data',
      'table_column_inside',
      'table_data_inside',
      'top_button',
      'top_button2',
      'hide_footer',
      'row_per_page',
      'table_footer',
      'flat_status',
      'bordered_status',
      'print_button',
      'edit_button',
      'list_button',
      'view_button',
      'delete_button',
      'pass_row_key',
      'select_all',
      'showExpand',
      'printListingButton',
      "forceReload",
    ],
    components: {
        // Button_icon,
        Checkbox,
        // Toggle
    },
    computed: {
      dbComponentBehavior() {
        return this.$store.getters['dbComponentBehavior/byLanguage']('sublot')
      },
      // pagesNumber() {
      //  return Math.ceil(this.rows.length / this.pagination.rowsPerPage);
      // }
    },
    mounted()
    {

    },
    methods : {
        receiveChangethCheckbox(newVal)
        {
          this.$emit('receiveChangeSelectAll', newVal)
        },
        receiveChangetdCheckbox(newVal)
        {
          this.$emit('receiveChangeCheckbox', newVal)
        },
      handleRowClick(evt, row, index)
      {
        // for (const key in this.rows) {
        //   this.rows[key].selected = false;
        // }
        
        // this.rows[index].selected = true;
        // this.$nextTick(()=>{
        //   this.$emit('receiveTableClick',row);
        // });
      },
      handleCheckbox(){
        
        this.$nextTick(()=>{
          this.$emit('receiveTableCheckboxClick');
        });
      },
      handleClickCheckbox(evt,row)
      {
        if(this.rows[row.rowIndex].disable)
        {
          return;
        }

        for (const key in this.rows) {
          this.rows[key].selected = false;
        }
        
        this.rows[row.rowIndex].selected = true;

        this.$nextTick(()=>{
          this.$emit('receiveTableCheckboxClick',row);
        });

        
        // this.$emit('receiveTableCheckboxClick',payload);
      }
    },
    watch:{
      table_column(newVal)
      {
        this.columns = newVal;
        this.row_key = newVal[0].name;
      },
      table_data(newVal){
        this.rows = newVal;
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
.table_wrapper{
  padding-top: 2px;
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
.top_button {
  width:65px;
}
* >>> .q-table__top {
    padding: 0px 0px;
    padding-bottom: 15px;

}
.button{
  background-color: #273655;
  color: white;
}

/* tr td:first-child{
  width: 80px;

} */
</style>
