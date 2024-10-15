<template>

  <div>
    <q-table
    separator="cell"
    flat
    bordered
    dense
    :rows="rows"
    :columns="columns"
    row-key="name"
    :pagination="{ rowsPerPage: 999999 }"
    hide-pagination
    >
    <template v-if="rows.length > 0" v-slot:top-row>
        
        <template v-for="details_table_footer in table_footer" :key="details_table_footer">
            <q-tr>
                <template v-for="(value, header, index) in details_table_footer" :key="index">
                    <q-td :style="['text-align:'+columns[index].align]">
                        <b>{{ value }}</b>
                    </q-td>
                </template>
            </q-tr>
        </template>

  </template>
  
    <!-- <template v-if="rows.length > 0" v-slot:bottom-row>
        
            <template v-for="details_table_footer in table_footer" :key="details_table_footer">
                <q-tr>
                    <template v-for="(value, header, index) in details_table_footer" :key="index">
                        <q-td :style="['text-align:'+columns[index].align]">
                            <b>{{ value }}</b>
                        </q-td>
                    </template>
                </q-tr>
            </template>

      </template> -->
    </q-table>
  </div>
</template>
  
<script>


export default {
  data() {
    return {
      columns: this.table_column,
      rows: this.table_data,
      footers: this.table_footer,
    };
  },
  props: ['title','table_column','table_data','table_footer'],
  watch: {
        table_column(newVal)
        {
            this.columns = newVal;
        },
        table_data(newVal){
            this.rows = newVal;
            // this.loading = false;
        },
        table_footer(newVal){
            this.footers = newVal;
            // this.loading = false;
        },
    }
};
</script>

<style scoped>

>>> thead{
    background-color: #dee1e6 !important;
}
>>> .q-table__container{
    border-radius: 0px;
}
</style>