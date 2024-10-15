<template>

    <q-table
    :title="pass_title"
    :rows="rows"
    :columns="columns"
    :row-key="pass_key"
    :pagination="{ rowsPerPage: 999999 }"
    hide-pagination
    @row-click="handleRowClick"
    >
      <template v-slot:header="props">
        <q-tr :props="props">
          
          <template v-for="col in props.cols" :key="col.name">
            <q-th :props="props">
              <!-- <q-tooltip v-if="col.tooltip" anchor="top middle" self="center middle" style="font-size: 13px;">
              {{ col.tooltip }}
              </q-tooltip> -->
              {{ col.label }}
            </q-th>
          </template>
          

        </q-tr>
      </template>

      <template v-slot:body-cell-code="props">
        <q-td :style="['text-align:'+props.col.align+';', props.row.selected && 'background-color:#d9d7d7;']">
          {{props.row.code}}
        </q-td>
      </template>

      <template v-slot:body-cell-name="props">
        <q-td :style="['text-align:'+props.col.align+';', props.row.selected && 'background-color:#d9d7d7;']">
          {{props.row.name}}
        </q-td>
      </template>

      <template v-slot:body-cell-active="props">
          <q-td :style="['text-align:'+props.col.align+';', props.row.selected && 'background-color:#d9d7d7;']">
            <q-checkbox :disable="props.row.disable" v-model="props.row.active" :true-value="1" :false-value="0" @click="handleClickCheckbox($event, props)"/>
          </q-td>
      </template>


    </q-table>
</template>

<script>
export default {
    rows: [],
    columns: [],
    props: ["table_data", "table_column", "pass_title", "pass_key"],
    mounted()
    {

    },
    methods : {
      handleRowClick(evt, row, index)
      {
        for (const key in this.rows) {
          this.rows[key].selected = false;
        }
        
        this.rows[index].selected = true;
        this.$nextTick(()=>{
          this.$emit('receiveTableClick',row);
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

<style>

</style>