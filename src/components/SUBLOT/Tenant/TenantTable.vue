<template>
  <div class="q-pa-md">
    <q-table
      :loading="loading"
      title=""
      :rows="rows"
      :columns="columns"
      row-key="name"
      separator="cell"
      :flat="true"
    />
  </div>
</template>

<script>
export default {
  data()
  {
    return{
      columns: [],
      rows: [],
      loading: true,
    }
  },
  props:['table_column','table_data','forceLoading'],
  watch: {
        table_column(newVal)
        {
          this.columns = newVal;
        },
        table_data(newVal){

          this.rows = newVal
          this.loading = false

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
    /* padding: 10px; */
    border-radius: 0px;
}

* >>> .q-table__top {
  padding: 0px 0px;
  padding-bottom: 15px;

}

</style>