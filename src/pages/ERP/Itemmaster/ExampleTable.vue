<template>

    <div class="row main_container">

        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">

            <div class="row top_row">
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 text_right">
                    <Button v-on:receiveClick="handleClickFilter"
                    :pass_label="'Filter'"
                    :pass_no_caps="true"
                    :pass_square="true"
                    :pass_dense="true"
                    :class="[filter_mode_on ? 'active_section_button' : 'inactive_section_button']"
                    />
                </div>
            </div>

            <Table
            :row_per_page="[5,10,20,50]"
            :title="table_title"
            :table_data="table_data"
            :table_column="table_column"
            :flat_status="true"
            :bordered_status="true"
            v-on:receiveRequestTable="handleTableChange"

            :allow_add="false"
            :allow_edit="true"
            :allow_delete="true"
            v-on:receiveHandleAdd="handleReceiveHandleAdd"
            v-on:receiveHandleEdit="handleReceiveHandleEdit"
            v-on:receiveHandleDelete="handleReceiveHandleDelete"

            :filter_mode_on="filter_mode_on"
            v-on:receiveColumnRearrange="handleColumnRearrange"
            v-on:filter_column="handleFilterColumn"
            :forceLoading="forceLoading"
            :column_reordering="true"
            :row_reordering="false"
            v-on:receiveHandleClearFilter="handleClearFilter"
            />

        </div>

    </div>

</template>

<script>
import Table from 'src/components/ERP/Table/Table.vue';
import Button from 'src/components/ERP/Main/Button';

export default {
    data(){
        return{
            table_column: [],
            table_data: [],
            filter_mode_on: false,
            rearrange_column: [],
            forceLoading: false,
        }
    },
    components: {
        Table,
        Button,
    },
    methods:{
        async clearFilterInput()
        {
            for (const index in this.table_column) {
                
                var is_array = Array.isArray(this.table_column[index].filter_value);
                if(is_array)
                {
                    this.table_column[index].filter_value = [];
                }
                else
                {
                    this.table_column[index].filter_value = '';
                }
                
            }

            return;

        },
        async handleClearFilter()
        {
            await this.clearFilterInput();
            this.rearrange_column = this.table_column;

            this.table_function(this.ori_params);
        },
        handleReceiveHandleAdd(pass_payload)
        {
            console.log('handleReceiveHandleAdd');
            console.log(pass_payload);
        },
        handleReceiveHandleEdit(pass_payload)
        {
            this.$router.push({
                // name: 'CreateEditIM_new',
                name: "EditItemmaster",
                query: { Itemcode: pass_payload.row.Itemcode}
            });
        },
        handleReceiveHandleDelete(pass_payload)
        {
            console.log('handleReceiveHandleDelete');
            console.log(pass_payload);
        },
        async handleClickFilter()
        {
            this.filter_mode_on = !this.filter_mode_on;

            if(!this.filter_mode_on)
            {

                await this.clearFilterInput();

                this.rearrange_column = this.table_column;

            }

            this.table_function(this.ori_params);
            
        },
        handleColumnRearrange(pass_payload)
        {
            this.rearrange_column = pass_payload;
        },
        handleFilterColumn(pass_payload)
        {
            this.rearrange_column = this.table_column;
            this.table_function(this.ori_params);
        },
        handleTableChange: function(newVal)
        {
            var new_params = this.$pluginsTableParams(newVal)

            var payload = {
                params : new_params
            };

            this.ori_params = payload;

            this.table_function(payload);
        },
        async table_function(ori_payload){

            this.forceLoading = true;
            var payload = ori_payload.params

            payload.skip = payload.offset;
            payload.Itemcode = '';
            payload.vendor_code = '';
            payload.Description = '';
            payload.Dept = '';

            for (const index in this.table_column) {

                var is_array = Array.isArray(this.table_column[index].filter_value);
                if(is_array)
                {
                    var value = '';

                    for (const value_index in this.table_column[index].filter_value) {
                        value += this.table_column[index].filter_value[value_index]+",";
                    }

                    value = value.replace(/,\s*$/, "");

                    payload[this.table_column[index].field] = value
                }
                else
                {
                    payload[this.table_column[index].field] = this.table_column[index].filter_value
                }
            }
        
            var mobile = this.$q.screen.width < 600;
            // if(mobile)
            // {
            //   payload.limit = this.filter.pagination;
            // }

            if(payload.ordering == "")
            {
              payload.ordering = "-LastStamp"
            }


            if(payload.ordering[0] == "-")
            {
              payload.sort_by = payload.ordering.slice(1);
              payload.sort_type = "Desc"
            }
            else
            {
              payload.sort_by = payload.ordering
              payload.sort_type = "Asc"
            }



            var data = {};

            payload.language = this.language;

            await this.$store.dispatch('itemmaster/trigger_read_item_all', payload).then(() => {
               data = JSON.parse(JSON.stringify(this.$store.getters['itemmaster/get_itemmaster']));

            });

            // if(this.page_function != 'DebitNote')
            // {
            var status = data.status
           // var results = data.data.detail;
            if(status == "failed"){
              this.table_data = {
                "data": {
                    "count": 0,
                    "next": null,
                    "previous": null,
                    "results": []
                }
            };

            }else{
                var results = data.data.detail;

                this.table_data =
                {
                    "data": {
                        "count": data.data.total_row,
                        "next": null,
                        "previous": null,
                        "results": data.data.detail
                    }
                };

                this.results = data.data.detail;
                
                this.showNext = this.ori_params.params.offset + this.ori_params.params.limit >= this.table_data.data.count;
                // this.filter.total_row = this.table_data.data.count;
                var from = this.ori_params.params.offset+1;
                var to = this.ori_params.params.offset + this.table_data.data.results.length;
                // this.filter.from = from;
                // this.filter.to = to;
            }

            if(this.rearrange_column.length > 0)
            {
                var table_column = this.rearrange_column;
            }
            else
            {
                var table_column = [
                    {
                        name: 'action',
                        required: true,
                        label: this.$language('D0028'),
                        header_align: 'center',
                        align: 'center',
                        sortable: false,
                        field: 'Itemcode',
                        format_child: '',
                        tooltip: '',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    {
                        name: 'Itemcode',
                        required: true,
                        label: this.$language('D0097'),
                        header_align: 'center',
                        align: 'left',
                        sortable: true,
                        field: 'Itemcode',
                        format_child: '',
                        tooltip: '',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                    {
                        name: 'ItemLink',
                        required: true,
                        label: 'Item Link',
                        header_align: 'center',
                        align: 'left',
                        sortable: true,
                        field: 'ItemLink',
                        format_child: '',
                        tooltip: '',
                        filter_type: 'select',
                        filter_options: [
                            {
                                "value": "test 1",
                                "label": "test 1"
                            },
                            {
                                "value": "test 2",
                                "label": "test 2"
                            }
                        ],
                        filter_value: '',
                    },
                    {
                        name: 'Description',
                        required: true,
                        label: 'Description',
                        header_align: 'center',
                        align: 'left',
                        sortable: true,
                        field: 'Description',
                        format_child: '',
                        tooltip: '',
                        filter_type: 'input',
                        filter_options: [],
                        filter_value: '',
                    },
                ];
            }
            

            this.table_column = table_column;

            this.forceLoading = false;
        },
    },
    mounted()
    {
        
    }
}
</script>

<style scoped>
.main_container
{
    padding: 10px;
}

.top_row
{
    padding-top: 10px;
    padding-bottom: 10px;
    padding-right: 0px;
}

.text_right
{
    text-align: right;
}

.active_section_button
{
  font-size: 14px;
  background-color: #e37a05;
  color: white;
}

.inactive_section_button
{
  font-size: 14px;
  background-color: #273655;
  color: white;
}

</style>