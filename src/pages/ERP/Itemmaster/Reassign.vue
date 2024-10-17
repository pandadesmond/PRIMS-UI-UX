<template>

    <div class="row main_container">

        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">

            Reassign UOM
            
            <div class="row top_row">
                
                <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-xs-12">
                    <MultipleSelect
                    v-model:pass_value="filter_value"
                    v-on:receiveChange="handleChangeFilterShowColumn"
                    :dbComponentBehavior="dbComponentBehavior.text"
                    label=""
                    :options="filter_options"
                    />
                </div>

                <div class="col-xl-10 col-lg-10 col-md-10 col-sm-12 col-xs-12 text_right">
                    <Button v-on:receiveClick="handleShowCreateItemMaster"
                    :pass_label="'Create'"
                    :pass_no_caps="true"
                    :pass_square="true"
                    :pass_dense="true"
                    class="custom_button"
                    />

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

            :pass_visible_columns="visibleColumns"
            />

        </div>

    </div>

</template>

<script>
import Table from 'src/components/ERP/Table/Table.vue';
import Button from 'src/components/ERP/Main/Button';
import MultipleSelect from 'src/components/ERP/Main/MultipleSelect';

export default {
    data(){
        return{
            session_outlet_guid: sessionStorage.getItem("session_outlet_guid") != "" && sessionStorage.getItem("session_outlet_guid") != "null" && sessionStorage.getItem("session_outlet_guid") != null ? sessionStorage.getItem("session_outlet_guid") : [],
            table_column_UOM: [],
            table_column_BulkUom: [],
            table_column_Category: [],
            table_data: [],
            filter_mode_on: false,
            rearrange_column: [],
            forceLoading: false,
            filter_options: [],
            filter_value: [],
            visibleColumns: [],
        }
    },
    components: {
        Table,
        Button,
        MultipleSelect,
    },
    computed: {
        dbComponentBehavior() {
            return this.$store.getters['dbComponentBehavior/byLanguage']('erp')
        },
    },
    watch: {
    // React to transType changes if the query changes dynamically
    '$route.query.TransType': {
      immediate: true,
    //   handler() {
    //     this.table_function();
    //   }
    }
  },
    methods:{
        handleChangeFilterShowColumn(value)
        {
            this.$nextTick(()=>{

                var visibleColumns = [];
                console.log(this.filter_value);

                for (const index in this.filter_value) {
                    visibleColumns.push(this.filter_value[index]);
                }
console.log(visibleColumns);
                this.visibleColumns = visibleColumns;
            });

        },
        handleShowCreateItemMaster(){
          this.$router.push({ name: "CreateReassignUOM" });
        },
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
        async table_function(){

            // var payload = ori_payload.params
            var payload = {}
            payload.outlet_guid = this.session_outlet_guid;
            payload.skip = payload.offset;
            // payload.RefNo = '';
            // payload.TransGuid = '';
            payload.TransType = this.$route.query.TransType || 'UOM';
            payload.language = this.language;

            // await this.$store.dispatch('itemmaster/trigger_post_get_req_chg_category', payload).then(() => {
            //    data = JSON.parse(JSON.stringify(this.$store.getters['itemmaster/get_req_chg_category']));

            // });

           var payload = {
              "pass_json": payload,
              "params": {}
        };

        var object_pass = {
            "dispatch": 'itemmaster/trigger_post_get_req_chg_category', //refer to path/function_name in store actions.js
            "getter": 'itemmaster/get_req_chg_category', //refer to path/function_name in store getters.js
            "app": this, //compulsory passed variable
            "payload": payload //payload that needed to use in store actions.js
          };
        // console.log('object_pass_barcode', object_pass);

        var dispatch_response_reassign = await this.$dispatch(object_pass);
        console.log('dispatch_response_reassign', dispatch_response_reassign);
        var status = dispatch_response_reassign.status

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
          var results = dispatch_response_reassign.response.detail;
          console.log('results_Reassign', results);
          for(var index in results)
            {
              var obj = results[index];
              
                obj.Category_From = obj.Category_From + ' - ' + obj.CatFrom_Desc;
                obj.Category_To = obj.Category_To + ' - ' + obj.CatTo_Desc;
            }
          
            this.table_data = {
            "data": {
            "count": dispatch_response_reassign.response.total_row,
            "next": null,
            "previous": null,
            "results": dispatch_response_reassign.response.detail
            }
        };

        this.results = dispatch_response_reassign.response.detail;
        this.showNext = this.ori_params.params.offset + this.ori_params.params.limit >= this.table_data.data.count;
        // this.filter.total_row = this.table_data.data.count;
        var from = this.ori_params.params.offset+1;
        var to = this.ori_params.params.offset + this.table_data.data.results.length;
        // this.filter.from = from;
        // this.filter.to = to;
            }

        var table_column_UOM = [
            {
                name: 'action',
                required: true,
                label: this.$language('D0028'),
                header_align: 'center',
                align: 'center',
                sortable: false,
                field: 'action',
                format_child: '',
                tooltip: '',
                headerStyle:'text-align: center; width: 1%;',
            // "headerStyle": "max-width: 50px; text-align: center;",
                filter_type: 'input',
                filter_options: [],
                filter_value: '',
            },
            {
                name: 'send',
                required: true,
                label: 'send',
                align: 'center',
                sortable: true,
                field: 'send',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;',
            },
            {
                name: 'approved',
                required: true,
                label: 'approved',
                align: 'center',
                sortable: true,
                field: 'approved',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;',
            },
            {
                name: 'posted',
                required: true,
                label: 'posted',
                align: 'left',
                sortable: true,
                field: 'posted',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'RefNo',
                required: true,
                label: 'RefNo',
                align: 'left',
                sortable: true,
                field: 'RefNo',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'EffectiveDate',
                required: true,
                label: 'EffectiveDate',
                align: 'left',
                sortable: true,
                field: 'EffectiveDate',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'Category_From',
                required: true,
                label: 'UOM From',
                align: 'left',
                sortable: true,
                field: 'Category_From',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'Category_To',
                required: true,
                label: 'UOM To',
                align: 'left',
                sortable: true,
                field: 'Category_To',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
           
            // {
            //     name: 'Category_To',
            //     required: true,
            //     label: 'Category_To',  
            //     header_align: 'center',
            //     align: 'left',
            //     sortable: true,
            //     field: 'Category_To', //CatTo_Desc
            //     format_child: '',
            //     tooltip: '',
            //     filter_type: 'input',
            //     filter_options: [],
            //     filter_value: '',
            // },
           {
                name: 'send_by',
                required: true,
                label: 'send_by',
                align: 'left',
                sortable: true,
                field: 'send_by',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'send_at',
                required: true,
                label: 'send_at',
                align: 'left',
                sortable: true,
                field: 'send_at',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'send_rmk',
                required: true,
                label: 'send_rmk',
                align: 'left',
                sortable: true,
                field: 'send_rmk',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'approved_by',
                required: true,
                label: 'approved_by',
                align: 'left',
                sortable: true,
                field: 'approved_by',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'approved_at',
                required: true,
                label: 'approved_at',
                align: 'left',
                sortable: true,
                field: 'approved_at',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'approved_rmk',
                required: true,
                label: 'approved_rmk',
                align: 'left',
                sortable: true,
                field: 'approved_rmk',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'posted_by',
                required: true,
                label: 'posted_by',
                align: 'left',
                sortable: true,
                field: 'posted_by',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'posted_at',
                required: true,
                label: 'posted_at',
                align: 'left',
                sortable: true,
                field: 'posted_at',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'created_at',
                required: true,
                label: 'created_at',
                align: 'left',
                sortable: true,
                field: 'created_at',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'created_by',
                required: true,
                label: 'created_by',
                align: 'left',
                sortable: true,
                field: 'created_by',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'updated_at',
                required: true,
                label: 'updated_at',
                align: 'left',
                sortable: true,
                field: 'updated_at',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'updated_by',
                required: true,
                label: 'updated_by',
                align: 'left',
                sortable: true,
                field: 'updated_by',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            // {
            //     name: 'updated_by',
            //     required: true,
            //     label: 'Updated By', //  Colour
            //     header_align: 'center',
            //     align: 'left',
            //     sortable: true,
            //     field: 'updated_by',
            //     format_child: '',
            //     tooltip: '',
            //     filter_type: 'input',
            //     filter_options: [],
            //     filter_value: '',
            // }
        ];

        var table_column_BulkUom = [
            {
                name: 'action',
                required: true,
                label: this.$language('D0028'),
                header_align: 'center',
                align: 'center',
                sortable: false,
                field: 'action',
                format_child: '',
                tooltip: '',
                headerStyle:'text-align: center; width: 1%;',
            // "headerStyle": "max-width: 50px; text-align: center;",
                filter_type: 'input',
                filter_options: [],
                filter_value: '',
            },
            {
                name: 'send',
                required: true,
                label: 'send',
                align: 'center',
                sortable: true,
                field: 'send',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;',
            },
            {
                name: 'approved',
                required: true,
                label: 'approved',
                align: 'center',
                sortable: true,
                field: 'approved',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;',
            },
            {
                name: 'posted',
                required: true,
                label: 'posted',
                align: 'left',
                sortable: true,
                field: 'posted',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'RefNo',
                required: true,
                label: 'RefNo',
                align: 'left',
                sortable: true,
                field: 'RefNo',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'EffectiveDate',
                required: true,
                label: 'EffectiveDate',
                align: 'left',
                sortable: true,
                field: 'EffectiveDate',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'Category_From',
                required: true,
                label: 'Bulk UOM From',
                align: 'left',
                sortable: true,
                field: 'Category_From',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'Category_To',
                required: true,
                label: 'Bulk UOM To',
                align: 'left',
                sortable: true,
                field: 'Category_To',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
           
            // {
            //     name: 'Category_To',
            //     required: true,
            //     label: 'Category_To',  
            //     header_align: 'center',
            //     align: 'left',
            //     sortable: true,
            //     field: 'Category_To', //CatTo_Desc
            //     format_child: '',
            //     tooltip: '',
            //     filter_type: 'input',
            //     filter_options: [],
            //     filter_value: '',
            // },
           {
                name: 'send_by',
                required: true,
                label: 'send_by',
                align: 'left',
                sortable: true,
                field: 'send_by',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'send_at',
                required: true,
                label: 'send_at',
                align: 'left',
                sortable: true,
                field: 'send_at',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'send_rmk',
                required: true,
                label: 'send_rmk',
                align: 'left',
                sortable: true,
                field: 'send_rmk',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'approved_by',
                required: true,
                label: 'approved_by',
                align: 'left',
                sortable: true,
                field: 'approved_by',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'approved_at',
                required: true,
                label: 'approved_at',
                align: 'left',
                sortable: true,
                field: 'approved_at',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'approved_rmk',
                required: true,
                label: 'approved_rmk',
                align: 'left',
                sortable: true,
                field: 'approved_rmk',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'posted_by',
                required: true,
                label: 'posted_by',
                align: 'left',
                sortable: true,
                field: 'posted_by',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'posted_at',
                required: true,
                label: 'posted_at',
                align: 'left',
                sortable: true,
                field: 'posted_at',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'created_at',
                required: true,
                label: 'created_at',
                align: 'left',
                sortable: true,
                field: 'created_at',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'created_by',
                required: true,
                label: 'created_by',
                align: 'left',
                sortable: true,
                field: 'created_by',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'updated_at',
                required: true,
                label: 'updated_at',
                align: 'left',
                sortable: true,
                field: 'updated_at',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'updated_by',
                required: true,
                label: 'updated_by',
                align: 'left',
                sortable: true,
                field: 'updated_by',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            // {
            //     name: 'updated_by',
            //     required: true,
            //     label: 'Updated By', //  Colour
            //     header_align: 'center',
            //     align: 'left',
            //     sortable: true,
            //     field: 'updated_by',
            //     format_child: '',
            //     tooltip: '',
            //     filter_type: 'input',
            //     filter_options: [],
            //     filter_value: '',
            // }
        ];

        var table_column_Category = [
            {
                name: 'action',
                required: true,
                label: this.$language('D0028'),
                header_align: 'center',
                align: 'center',
                sortable: false,
                field: 'action',
                format_child: '',
                tooltip: '',
                headerStyle:'text-align: center; width: 1%;',
            // "headerStyle": "max-width: 50px; text-align: center;",
                filter_type: 'input',
                filter_options: [],
                filter_value: '',
            },
            {
                name: 'send',
                required: true,
                label: 'send',
                align: 'center',
                sortable: true,
                field: 'send',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;',
            },
            {
                name: 'approved',
                required: true,
                label: 'approved',
                align: 'center',
                sortable: true,
                field: 'approved',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;',
            },
            {
                name: 'posted',
                required: true,
                label: 'posted',
                align: 'left',
                sortable: true,
                field: 'posted',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'RefNo',
                required: true,
                label: 'RefNo',
                align: 'left',
                sortable: true,
                field: 'RefNo',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'EffectiveDate',
                required: true,
                label: 'EffectiveDate',
                align: 'left',
                sortable: true,
                field: 'EffectiveDate',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'Category_From',
                required: true,
                label: 'Category From',
                align: 'left',
                sortable: true,
                field: 'Category_From',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'Category_To',
                required: true,
                label: 'Category To',
                align: 'left',
                sortable: true,
                field: 'Category_To',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
           
            // {
            //     name: 'Category_To',
            //     required: true,
            //     label: 'Category_To',  
            //     header_align: 'center',
            //     align: 'left',
            //     sortable: true,
            //     field: 'Category_To', //CatTo_Desc
            //     format_child: '',
            //     tooltip: '',
            //     filter_type: 'input',
            //     filter_options: [],
            //     filter_value: '',
            // },
           {
                name: 'send_by',
                required: true,
                label: 'send_by',
                align: 'left',
                sortable: true,
                field: 'send_by',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'send_at',
                required: true,
                label: 'send_at',
                align: 'left',
                sortable: true,
                field: 'send_at',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'send_rmk',
                required: true,
                label: 'send_rmk',
                align: 'left',
                sortable: true,
                field: 'send_rmk',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'approved_by',
                required: true,
                label: 'approved_by',
                align: 'left',
                sortable: true,
                field: 'approved_by',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'approved_at',
                required: true,
                label: 'approved_at',
                align: 'left',
                sortable: true,
                field: 'approved_at',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'approved_rmk',
                required: true,
                label: 'approved_rmk',
                align: 'left',
                sortable: true,
                field: 'approved_rmk',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'posted_by',
                required: true,
                label: 'posted_by',
                align: 'left',
                sortable: true,
                field: 'posted_by',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'posted_at',
                required: true,
                label: 'posted_at',
                align: 'left',
                sortable: true,
                field: 'posted_at',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'created_at',
                required: true,
                label: 'created_at',
                align: 'left',
                sortable: true,
                field: 'created_at',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'created_by',
                required: true,
                label: 'created_by',
                align: 'left',
                sortable: true,
                field: 'created_by',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'updated_at',
                required: true,
                label: 'updated_at',
                align: 'left',
                sortable: true,
                field: 'updated_at',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            {
                name: 'updated_by',
                required: true,
                label: 'updated_by',
                align: 'left',
                sortable: true,
                field: 'updated_by',
                format_child: '',
                tooltip: '',
                headerStyle: 'text-align: center;'

            },
            // {
            //     name: 'updated_by',
            //     required: true,
            //     label: 'Updated By', //  Colour
            //     header_align: 'center',
            //     align: 'left',
            //     sortable: true,
            //     field: 'updated_by',
            //     format_child: '',
            //     tooltip: '',
            //     filter_type: 'input',
            //     filter_options: [],
            //     filter_value: '',
            // }
        ];

             this.table_column = this.TransType == 'UOM' ? table_column_UOM : this.TransType == 'BULK' ? table_column_BulkUom : this.TransType == 'Category'? table_column_Category : table_column_Category;

            this.forceLoading = false;
        },
    },
    mounted()
    {
        this.filter_options = [
            {
                label: 'send',
                value: 'send',
            },
            {
                label: 'approved',
                value: 'approved',
            },
            {
                label: 'posted',
                value: 'posted',
            },
            {
                label: 'RefNo',
                value: 'RefNo',
                filter_value: '',
            },
            {
                label: 'EffectiveDate',
                value: 'EffectiveDate',
            },
            {
                label: 'Category_From',
                value: 'Category_From',
            },
            {
                label: 'Category_To',
                value: 'Category_To',
            },
            {
                label: 'send_by',
                value: 'send_by',
            },
            {
                label: 'send_at',
                value: 'send_at',
            },
            {
                label: 'send_rmk',
                value: 'send_rmk',
            },
            {
                label: 'approved_by',
                value: 'approved_by',
            },
            {
                label: 'approved_at',
                value: 'approved_at',
            },
            {
                label: 'approved_rmk',
                value: 'approved_rmk',
            },
            {
                label: 'posted_by',
                value: 'posted_by',
            },
            {
                label: 'posted_at',
                value: 'posted_at',
            },
            {
                label: 'created_at',
                value: 'created_at',
            },
            {
                label: 'created_by',
                value: 'created_by',
            },
            {
                label: 'updated_at',
                value: 'updated_at',
            },
            {
                label: 'updated_by',
                value: 'updated_by',
            }
        ];

        var visibleColumns = [];

        for (const index in this.filter_options) {
            visibleColumns.push(this.filter_options[index].value);
        }

        this.visibleColumns = visibleColumns;
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
    /* padding-top: 10px; */
    padding-bottom: 10px;
    padding-right: 0px;
}

.text_right
{
    text-align: right;
}

.custom_button
{
  font-size: 14px;
  background-color: #273655;
  color: white;
  margin-left: 5px;
}

.active_section_button
{
  font-size: 14px;
  background-color: #e37a05;
  color: white;
  margin-left: 5px;
}

.inactive_section_button
{
  font-size: 14px;
  background-color: #273655;
  color: white;
  margin-left: 5px;
}

</style>