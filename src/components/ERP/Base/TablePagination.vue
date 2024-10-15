<template>

    <Table :button_no_outline="button_no_outline" :row_per_page="row_per_page" v-on:action="handleAction" v-on:edit="handleEdit" v-on:list="handleList" v-on:delete="handleDelete" :title="title" :table_data="table_data" :table_column="table_column"/>

</template>

<script>
import Table from 'src/components/Base/TablePagination';

export default {
    props:['title', 'table_column', 'table_data', 'row_per_page','button_no_outline'],
    created() {
    },
    components:{
        Table
    },
    computed: {
    },
    methods: {
        handleAction: function(payload)
        {
            this.$emit('main_action', payload)
        },
        handleEdit: function(payload)
        {
            this.$emit('main_edit', payload)
        },
        handleList: function(payload)
        {
            this.$emit('main_list', payload)
        },
        handleDelete: function(payload)
        {
            this.$emit('main_delete', payload)
        }
    }
}
</script>

<style scoped>
* >>> thead
{
    /* background-color: #dee1e6; */
    background-color: #f6f9fc;
}

* >>> tr, * >>> td
{
    height: 35px !important;
}

* >>> .q-table__container
{
    padding: 10px;
}

/* * >>> .q-table__bottom
{
    display: -webkit-box;
} */
</style>
