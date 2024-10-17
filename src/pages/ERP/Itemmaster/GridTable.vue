<template>

            <div style="height: 500px;">
                <ag-grid-vue
                :rowData="rowData"
                :columnDefs="colDefs"
                :pagination="pagination"
                :paginationPageSize="paginationPageSize"
                :paginationPageSizeSelector="paginationPageSizeSelector"
                :defaultColDef="defaultColDef"
                style="width: 100%; height: 100%;"
                class="ag-theme-quartz"
                :suppressRowClickSelection="true"
                v-on:receiveClick="handleReceiveClick"
                @grid-ready="onGridReady"
                :rowModelType="rowModelType"
                >
                </ag-grid-vue>
                
                <!-- <div class="row"> -->
                    
                    <!-- <div class="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-xs-12">
                    </div> -->

                    <!-- <div class="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-xs-12"> -->

                        <div class="custom_grid">

                            <div class="align_center margin_container">
                                <div class="flex_center">
                                    Page Size:
                                    <q-select class="new_input_select_dropdown margin_left" @update:model-value="handleChangePageSize" outlined v-model="pagination_page_size" :options="pagination_page_size_options" />
                                </div>
                            </div>

                            <div class="align_center margin_container">
                                {{start}} to {{end}} of {{total_records}}
                            </div>

                            <div class="align_center margin_container">
                                <q-pagination
                                style="height: 32px;"
                                v-model="current"
                                :max="total_page_division"
                                input
                                @update:model-value="handleClickPage"
                                />
                            </div>

                        
                        </div>


                    <!-- </div> -->
                
                <!-- </div> -->


               

            </div>

</template>

<script>

import { ref } from 'vue';
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { AgGridVue } from "ag-grid-vue3"; // Vue Data Grid Component


import Action from 'src/components/ERP/AgGridVue/Action'
import { FakeServer } from "src/fakeServer.js";

export default {
    data(){
        return{
            start: 1,
            end: 5,
            current: 1,
            total_records: 33,
            total_page_division: 7,
            pagination_page_size: 5,
            pagination_page_size_options: [5, 10, 20, 500],

            rowModelType: "clientSide",
            defaultColDef:{
                flex: 1,
            },
            pagination: true,
            paginationPageSize: 5,
            paginationPageSizeSelector: [5, 50, 100, 500],
            rowData: [
                { make: "1Tesla", model: "1Model Y", price: 64950, electric: true },
                { make: "Ford", model: "F-Series", price: 33850, electric: false },
                { make: "Toyota", model: "Corolla", price: 29600, electric: false },
                { make: "Tesla", model: "Model Y", price: 64950, electric: true },
                { make: "Ford", model: "F-Series", price: 33850, electric: false },
                { make: "Toyota", model: "Corolla", price: 29600, electric: false },
                { make: "Tesla", model: "Model Y", price: 64950, electric: true },
                { make: "Ford", model: "F-Series", price: 33850, electric: false },
                { make: "Toyota", model: "Corolla", price: 29600, electric: false },
                { make: "Tesla", model: "Model Y", price: 64950, electric: true },
                { make: "Ford", model: "F-Series", price: 33850, electric: false },
                { make: "Toyota", model: "Corolla", price: 29600, electric: false },
                { make: "Tesla", model: "Model Y", price: 64950, electric: true },
                { make: "Ford", model: "F-Series", price: 33850, electric: false },
                { make: "Toyota", model: "Corolla", price: 29600, electric: false },
                { make: "Toyota", model: "Corolla", price: 29600, electric: false },
                { make: "Tesla", model: "Model Y", price: 64950, electric: true },
                { make: "Ford", model: "F-Series", price: 33850, electric: false },
                { make: "Toyota", model: "Corolla", price: 29600, electric: false },
                { make: "Tesla", model: "Model Y", price: 64950, electric: true },
                { make: "Ford", model: "F-Series", price: 33850, electric: false },
                { make: "Toyota", model: "Corolla", price: 29600, electric: false },
                { make: "Tesla", model: "Model Y", price: 64950, electric: true },
                { make: "Ford", model: "F-Series", price: 33850, electric: false },
                { make: "Toyota", model: "Corolla", price: 29600, electric: false },
                { make: "Tesla", model: "Model Y", price: 64950, electric: true },
                { make: "Ford", model: "F-Series", price: 33850, electric: false },
                { make: "Toyota", model: "Corolla", price: 29600, electric: false },
                { make: "Tesla", model: "Model Y", price: 64950, electric: true },
                { make: "Ford", model: "F-Series", price: 33850, electric: false },
                { make: "Toyota", model: "Corolla", price: 29600, electric: false },
                { make: "Tesla", model: "Model Y", price: 64950, electric: true },
                { make: "Ford", model: "F-Series", price: 33850, electric: false },
            ],
            colDefs: [
                { field: "make",
                    cellRenderer: "Action",
                    cellClass: "logoCell",
                    cellRendererParams: {
                        // action : this.handleReceiveClick.bind(this),
                        action : this.handleReceiveClick,
                        // label: 'Click 2'
                    },
                    headerComponent: 'Action',
                    headerComponentParams: {
                        action : this.handleReceiveClickHeader
                        // label: 'Click 2'
                    },
                    filter: true
                 },
                { field: "model", filter: true, floatingFilter: true },
                { field: "price", filter: true },
                { field: "electric", filter: true }
            ],
        }
    },
    components: {
        AgGridVue,
        Action
    },
    methods:{
        recalculate_table(reset = null)
        {
            if(reset)
            {
                this.current = 1;
            }

            var total_page_division = Number(this.total_records) / Number(this.pagination_page_size);

            var start = ((Number(this.current)-1) * Number(this.pagination_page_size)) + 1
            var end = ((Number(this.current)-1) * Number(this.pagination_page_size)) + Number(this.pagination_page_size);

            if(end > this.total_records)
            {
                var end = this.total_records
            }//when end is over total numbers need to use last page

            this.start = start;
            this.end = end;

            this.total_page_division = Math.round(total_page_division);
        },
        handleChangePageSize()
        {
            this.$nextTick(()=>{
                this.recalculate_table(true);
            });
        },
        handleClickPage(pass_payload)
        {
            this.$nextTick(()=>{
                this.recalculate_table();
            });
        },
        onGridReady(grid_params)
        {
            console.log('tabkew');
            console.log(grid_params);
            console.log(grid_params.api);
        },
        handleReceiveClick(payload)
        {
            alert('gaga');
            console.log('gaga');
            console.log(payload.data);
        },
        handleReceiveClickHeader(payload)
        {
            alert('header click hahahaha');

            for (const index in this.rowData) {
                this.rowData[index].electric = true;
            }
            

        }
    }
}
</script>

<style scoped>
.new_input_select_dropdown >>> .q-field__inner, .new_input_select_dropdown >>> .q-field__inner > .q-field__control, .new_input_select_dropdown >>> .q-field__inner > .q-field__control > .q-field__append{
  height: 32px;
  min-height: 32px;
}

.flex_center{
    display: flex;
    align-items: center;
}

.align_center
{
    text-align: center;
}

.margin_left
{
    margin-left: 10px;
}

.custom_grid
{
    align-items: center;
    display: flex;
    justify-content: flex-end;
}

.margin_container
{
    margin-left: 10px;
    margin-right: 10px;
}
</style>