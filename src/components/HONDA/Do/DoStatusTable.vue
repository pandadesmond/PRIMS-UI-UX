<template>

  <div class="q-pa-md table_wrapper expand_table_wrapper" style="position:relative;">
    <q-table separator="cell"
      :flat="flat_status" :bordered="bordered_status"
      :rows="rows"
      :columns="columns"
      @request="onRequest"
      :loading="loading"
    >
    </q-table>
  </div>

</template>

<script>
// import Loading from 'src/components/Base/Loading';

export default {
    data(){
      return{
        columns: this.table_column,
        rows: this.table_data,
        row_key: "",
        loading: true,
        filter:"",
      }
    },
    props: ['title', 'table_column', 'table_data',"forceLoading","table_footer","flat_status","bordered_status","pass_row_key"],
    components: {
      // Loading
    },
    created() {
    },
    computed: {
      columns_rows() {
        return [this.columns && this.rows];
      },
    },
    mounted(){
      this.onRequest({
        // pagination: this.pagination,
        // filter: undefined
      })
    },
    methods: {
      onRequest (props) {
        this.$emit("receiveRequestTable",props);
        // this.pagination.sortBy = props.pagination.sortBy;
        // this.pagination.descending = props.pagination.descending;
        // this.pagination.page = props.pagination.page;
        // this.pagination.rowsPerPage = props.pagination.rowsPerPage;
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
        this.rows = newVal;
        this.loading = false;
      },
      columns_rows()
      {
        var _this = this;
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
.table_footer
{
  font-weight: bold;
  background-color: #ededed;
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

* >>> .q-table__bottom
{
   padding: 0px;
   height: 35px !important;
   min-height: 35px !important;
}

</style>
