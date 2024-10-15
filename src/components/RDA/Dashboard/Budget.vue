<template>
   <div class="q-pa-md test" style="overflow-x: auto;width: 100%;">
    <q-card class="bg-grey-3 relative-position">

    <q-card-section style="padding: 0px;">
<!-- {{outlet_value}} -->
    <!-- <span>{{formatAmount(json_data.Division_Total.Details_month_to_date.Sales.Sales_TY_amount,'%')}}</span> -->
    <q-table class="table_total_sales"
      :title="table_title"
      separator="vertical"
      :dense="true"
        :rows="rows"
      :columns="columns"
      virtual-scroll
      style="height: 82vh;"
    >

      <template v-slot:top>
        <div style="width: 100%;">
            <div class="row">

                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" style="display: flex;">
                
                    <span style="font-size: 20px; letter-spacing: 0.005em; font-weight: 400;">{{table_title}}</span>
                    
                    <!-- <div style="border: 1px solid black;margin-left: 10px;padding-left: 5px; padding-right: 5px;">
                        <span style="font-weight: bold;">$000s</span>
                        <Checkbox
                        :disable="false"
                        :no_label="true"
                        v-model="amount_type"
                        :dbComponentBehavior="dbComponentBehavior.text"
                        style="margin-left: -10px; margin-right: -6px;padding-left: 5px;" />
                    </div> -->
                </div>

                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" style="display: flex;">

                    <div style="border: 1px solid black;margin-left: auto;padding-left: 5px; padding-right: 5px; margin-right: 5px;">
                        <span style="font-weight: bold;">$000s</span>
                        <Checkbox
                        :disable="false"
                        :no_label="true"
                        v-model="amount_type"
                        :dbComponentBehavior="dbComponentBehavior.text"
                        style="margin-left: -10px; margin-right: -6px;padding-left: 5px;" />
                    </div>

                    <q-btn
                        color="primary"
                        icon-right="archive"
                        label="Export"
                        no-caps
                        @click="exportToExcel"
                        style="float: right;"
                    />
                </div>
            
            </div>

        </div>
      </template>

      <!-- <template v-slot:top-right>
        <q-btn
          color="primary"
          icon-right="archive"
          label="Export"
          no-caps
          @click="exportToExcel"
        />
      </template> -->

      <template v-slot:header="props">


        <q-tr :props="props" style="background-color: #295fbd; color: white;">
            <q-th colspan="2" style="background-color: white;position: sticky; left: 0; z-index: 120; background-color:white; color: black;"></q-th>
            <q-th colspan="3" style="background-color: white; background-color:white; color: black; border: 0px;"></q-th>
            <q-th style="padding: 0px;background-color: white;color: black;border: 0px;text-align: right;"><span v-if="amount_type">$000s</span></q-th>
            <!-- <q-th style="padding: 0px;background-color: white;border: 0px;"></q-th> -->

            <q-th style="padding: 0px;min-width: 5px;max-width: 5px;border:0px;background-color:white;text-align: center;"></q-th>
            <q-th colspan="7"  style="border-right: 1px solid black;">Day-to-Date {{ json_data.Day_to_Date ? `( ${json_data.Day_to_Date} )` : '' }}</q-th>

            <q-th style="padding: 0px;min-width: 5px;max-width: 5px;border:0px;background-color:white;text-align: center;"></q-th>
            <q-th colspan="7"  style="border-right: 1px solid black;background-color: #2f3a4d;">Week-to-Date {{ json_data.Week_to_Date ? `( ${json_data.Week_to_Date} )` : '' }}</q-th>

            <q-th style="padding: 0px;min-width: 5px;max-width: 5px;border:0px;background-color:white;text-align: center;"></q-th>
            <q-th colspan="7"  style="border-right: 1px solid black;">Month-to-Date</q-th>
            <!-- <q-th style="border-top:0px;border-bottom:0px;background-color: white;padding: 0px;"></q-th>
            <q-th style="border-right: 1px solid black;">Outlet</q-th>
            <q-th style="border-top:0px;border-bottom:0px;background-color: white;padding: 0px;"></q-th> -->
            <q-th style="padding: 0px;min-width: 5px;max-width: 5px;border:0px;background-color:white;text-align: center;"></q-th>
            <q-th colspan="7" style="border-right: 1px solid black;background-color: #2f3a4d;">Year-to-Date</q-th>
        </q-tr>



        <q-tr :props="props" style="background-color: #e0ebff; color:black;">

            <q-th style="min-width: 25px;max-width: 25px; width: 25px; position: sticky; left: 0px;z-index: 120;border-top: 1px solid black;">No</q-th>
            <q-th style="min-width: 60px; max-width: 60px; width: 60px; position: sticky; left: 25px;z-index:120;border-top: 1px solid black;text-align: center;cursor: pointer;">
                <!-- <div> -->
                    <!-- Outlet -->
                    Store
                    <q-popup-edit title="Filter">

                        <q-list bordered separator dense style="margin-bottom: 10px;">
                            <q-item @click="handleSorting('ascending', 'Outlet')" clickable v-ripple :active="active_sorting == 'ascending' && active_sorting_column == 'Outlet' ? true : false">
                                <q-item-section>Sort Ascending</q-item-section>
                            </q-item>

                            <q-item @click="handleSorting('descending', 'Outlet')" clickable v-ripple :active="active_sorting == 'descending' && active_sorting_column == 'Outlet' ? true : false">
                                <q-item-section>Sort Descending</q-item-section>
                            </q-item>
                        </q-list>

                        <MultiSelectFilter
                        :disable="false"
                        :readonly="false"
                        :no_label="true"
                        :text="'Supplier'"
                        v-model:pass_value="outlet_value"
                        :dbComponentBehavior="dbComponentBehavior.outlet_select_header"
                        :options="outlet_options"
                        v-on:receiveChange="handleChangeOptions"
                        />
                    </q-popup-edit>

                    <q-icon v-if="active_sorting != '' && active_sorting_column == 'Outlet'" style="font-size: 13px; color: #000000;" :class="[active_sorting == 'ascending' ? 'flip_down' : 'flip_up']" name="filter_list" />

                    <!-- <q-icon v-if="outlet_value.length > 0" name="filter_alt" color="green" style="font-size: 13px;"/> -->
                        
                    <q-btn v-if="outlet_value.length > 0" dense color="black" round icon="filter_alt" flat style="font-size: 10px;margin-top: 5px;">
                        <q-badge color="red" floating style="font-size: 8px;padding-top: 0px;padding-bottom: 0px;text-transform: none !important;">{{outlet_value.length == outlet_options.length ? 'All' : outlet_value.length}}</q-badge>
                    </q-btn>
                <!-- </div> -->

            </q-th>
            <q-th style="min-width: 110px; max-width: 110px; width: 110px; border-top: 1px solid black;text-align: center; cursor: pointer;">
                <!-- Outlet Name -->
                Name
                <q-popup-edit title="Filter">

                    <q-list bordered separator dense style="margin-bottom: 10px;">
                        <q-item @click="handleSorting('ascending', 'OutletName')" clickable v-ripple :active="active_sorting == 'ascending' && active_sorting_column == 'OutletName' ? true : false">
                            <q-item-section>Sort Ascending</q-item-section>
                        </q-item>

                        <q-item @click="handleSorting('descending', 'OutletName')" clickable v-ripple :active="active_sorting == 'descending' && active_sorting_column == 'OutletName' ? true : false">
                            <q-item-section>Sort Descending</q-item-section>
                        </q-item>
                    </q-list>

                    <MultiSelectFilter
                    :disable="false"
                    :readonly="false"
                    :no_label="true"
                    :text="'Supplier'"
                    v-model:pass_value="outlet_name_value"
                    :dbComponentBehavior="dbComponentBehavior.outlet_name_select_header"
                    :options="outlet_name_options"
                    v-on:receiveChange="handleChangeOptions"
                    />
                </q-popup-edit>

                <q-icon v-if="active_sorting != '' && active_sorting_column == 'OutletName'" style="font-size: 13px; color: #000000;" :class="[active_sorting == 'ascending' ? 'flip_down' : 'flip_up']" name="filter_list" />

                <!-- <q-icon v-if="outlet_name_value.length > 0" name="filter_alt" color="green" style="font-size: 13px;"/> -->
<!-- 
                <q-btn v-if="outlet_name_value.length > 0" dense color="black" round icon="filter_alt" flat style="font-size: 10px;margin-top: 5px;">
                    <q-badge color="red" floating style="font-size: 8px;padding-top: 0px;padding-bottom: 0px;">{{outlet_name_value.length}}</q-badge>
                </q-btn> -->

                <q-btn v-if="outlet_name_value.length > 0" dense color="black" round icon="filter_alt" flat style="font-size: 10px;margin-top: 5px;">
                    <q-badge color="red" floating style="font-size: 8px;padding-top: 0px;padding-bottom: 0px;text-transform: none !important;">{{outlet_name_value.length == outlet_name_options.length ? 'All' : outlet_name_value.length}}</q-badge>
                </q-btn>

            </q-th>
            <q-th style="min-width: 80px; max-width: 80px; width: 80px;border-top: 1px solid black; text-align: center; cursor: pointer;">
                Cohort
                <q-popup-edit title="Filter">

                    <q-list bordered separator dense style="margin-bottom: 10px;">
                        <q-item @click="handleSorting('ascending', 'Cohort')" clickable v-ripple :active="active_sorting == 'ascending' && active_sorting_column == 'Cohort' ? true : false">
                            <q-item-section>Sort Ascending</q-item-section>
                        </q-item>

                        <q-item @click="handleSorting('descending', 'Cohort')" clickable v-ripple :active="active_sorting == 'descending' && active_sorting_column == 'Cohort' ? true : false">
                            <q-item-section>Sort Descending</q-item-section>
                        </q-item>
                    </q-list>

                    <MultiSelectFilter
                    :disable="false"
                    :readonly="false"
                    :no_label="true"
                    :text="'Supplier'"
                    v-model:pass_value="cohort_value"
                    :dbComponentBehavior="dbComponentBehavior.cohort_select_header"
                    :options="cohort_options"
                    v-on:receiveChange="handleChangeOptions"
                    />
                </q-popup-edit>

                <q-icon v-if="active_sorting != '' && active_sorting_column == 'Cohort'" style="font-size: 13px; color: #000000;" :class="[active_sorting == 'ascending' ? 'flip_down' : 'flip_up']" name="filter_list" />
                
                <!-- <q-icon v-if="cohort_value.length > 0" name="filter_alt" color="green" style="font-size: 13px;"/> -->

                <!-- <q-btn v-if="cohort_value.length > 0" dense color="black" round icon="filter_alt" flat style="font-size: 10px;margin-top: 5px;">
                    <q-badge color="red" floating style="font-size: 8px;padding-top: 0px;padding-bottom: 0px;">{{cohort_value.length}}</q-badge>
                </q-btn> -->

                <q-btn v-if="cohort_value.length > 0" dense color="black" round icon="filter_alt" flat style="font-size: 10px;margin-top: 5px;">
                    <q-badge color="red" floating style="font-size: 8px;padding-top: 0px;padding-bottom: 0px;text-transform: none !important;">{{cohort_value.length == cohort_options.length ? 'All' : cohort_value.length}}</q-badge>
                </q-btn>
            </q-th>
            <q-th style="min-width: 80px; max-width: 80px; width: 80px; border-top: 1px solid black; border-top: 1px solid black;text-align: center;cursor: pointer;">
                State
                <q-popup-edit title="Filter">

                    <q-list bordered separator dense style="margin-bottom: 10px;">
                        <q-item @click="handleSorting('ascending', 'State')" clickable v-ripple :active="active_sorting == 'ascending' && active_sorting_column == 'State' ? true : false">
                            <q-item-section>Sort Ascending</q-item-section>
                        </q-item>

                        <q-item @click="handleSorting('descending', 'State')" clickable v-ripple :active="active_sorting == 'descending' && active_sorting_column == 'State' ? true : false">
                            <q-item-section>Sort Descending</q-item-section>
                        </q-item>
                    </q-list>

                    <MultiSelectFilter
                    :disable="false"
                    :readonly="false"
                    :no_label="true"
                    :text="'Supplier'"
                    v-model:pass_value="state_value"
                    :dbComponentBehavior="dbComponentBehavior.state_select_header"
                    :options="state_options"
                    v-on:receiveChange="handleChangeOptions"
                    />
                </q-popup-edit>

                <q-icon v-if="active_sorting != '' && active_sorting_column == 'State'" style="font-size: 13px; color: #000000;" :class="[active_sorting == 'ascending' ? 'flip_down' : 'flip_up']" name="filter_list" />

                <!-- <q-icon v-if="state_value.length > 0" name="filter_alt" color="green" style="font-size: 13px;"/> -->

                <!-- <q-btn v-if="state_value.length > 0" dense color="black" round icon="filter_alt" flat style="font-size: 10px;margin-top: 5px;">
                    <q-badge color="red" floating style="font-size: 8px;padding-top: 0px;padding-bottom: 0px;">{{state_value.length}}</q-badge>
                </q-btn> -->

                <q-btn v-if="state_value.length > 0" dense color="black" round icon="filter_alt" flat style="font-size: 10px;margin-top: 5px;">
                    <q-badge color="red" floating style="font-size: 8px;padding-top: 0px;padding-bottom: 0px;text-transform: none !important;">{{state_value.length == state_options.length ? 'All' : state_value.length}}</q-badge>
                </q-btn>

            </q-th>
            <q-th style="min-width: 100px; max-width: 100px; width: 100px; border-top: 1px solid black; border-top: 1px solid black;text-align: center;border-right: 1px solid black; cursor: pointer;">
                AM
                <q-popup-edit title="Filter">

                    <q-list bordered separator dense style="margin-bottom: 10px;">
                        <q-item @click="handleSorting('ascending', 'AM')" clickable v-ripple :active="active_sorting == 'ascending' && active_sorting_column == 'AM' ? true : false">
                            <q-item-section>Sort Ascending</q-item-section>
                        </q-item>

                        <q-item @click="handleSorting('descending', 'AM')" clickable v-ripple :active="active_sorting == 'descending' && active_sorting_column == 'AM' ? true : false">
                            <q-item-section>Sort Descending</q-item-section>
                        </q-item>
                    </q-list>

                    <MultiSelectFilter
                    :disable="false"
                    :readonly="false"
                    :no_label="true"
                    :text="'Supplier'"
                    v-model:pass_value="am_value"
                    :dbComponentBehavior="dbComponentBehavior.am_select_header"
                    :options="am_options"
                    v-on:receiveChange="handleChangeOptions"
                    />
                </q-popup-edit>

                <q-icon v-if="active_sorting != '' && active_sorting_column == 'AM'" style="font-size: 13px; color: #000000;" :class="[active_sorting == 'ascending' ? 'flip_down' : 'flip_up']" name="filter_list" />

                <!-- <q-icon v-if="am_value.length > 0" name="filter_alt" color="green" style="font-size: 13px;"/> -->

                <!-- <q-btn v-if="am_value.length > 0" dense color="black" round icon="filter_alt" flat style="font-size: 10px;margin-top: 5px;">
                    <q-badge color="red" floating style="font-size: 8px;padding-top: 0px;padding-bottom: 0px;">{{am_value.length}}</q-badge>
                </q-btn> -->

                <q-btn v-if="am_value.length > 0" dense color="black" round icon="filter_alt" flat style="font-size: 10px;margin-top: 5px;">
                    <q-badge color="red" floating style="font-size: 8px;padding-top: 0px;padding-bottom: 0px;text-transform: none !important;">{{am_value.length == am_options.length ? 'All' : am_value.length}}</q-badge>
                </q-btn>

                
            </q-th>

            <q-th style="padding: 0px;min-width: 5px;max-width: 5px;border:0px;background-color:white;text-align: center;"></q-th>

            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;text-align: center;" @click="handleSortingColumn('Details_to_date.Sales_TY_amount')">TY  <q-icon v-if="active_sorting_column == 'Details_to_date.Sales_TY_amount'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;text-align: center;" @click="handleSortingColumn('Details_to_date.Budget_TY_amount')">BUD  <q-icon v-if="active_sorting_column == 'Details_to_date.Budget_TY_amount'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th colspan="2" style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;text-align: center;" @click="handleSortingColumn('Details_to_date.vsBud')">vs Bud  <q-icon v-if="active_sorting_column == 'Details_to_date.vsBud'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;text-align: center;" @click="handleSortingColumn('Details_to_date.Sales_LY_amount')">LY  <q-icon v-if="active_sorting_column == 'Details_to_date.Sales_LY_amount'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th colspan="2" style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;border-right: 1px solid black;text-align: center;" @click="handleSortingColumn('Details_to_date.vsLY')">vs LY  <q-icon v-if="active_sorting_column == 'Details_to_date.vsLY'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>



            <q-th style="padding: 0px;min-width: 5px;max-width: 5px;border:0px;background-color:white;text-align: center;"></q-th>

            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;text-align: center;" @click="handleSortingColumn('Details_week_to_date.Sales_TY_amount')">TY  <q-icon v-if="active_sorting_column == 'Details_week_to_date.Sales_TY_amount'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;text-align: center;" @click="handleSortingColumn('Details_week_to_date.Budget_TY_amount')">BUD  <q-icon v-if="active_sorting_column == 'Details_week_to_date.Budget_TY_amount'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th colspan="2" style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;text-align: center;" @click="handleSortingColumn('Details_week_to_date.vsBud')">vs Bud  <q-icon v-if="active_sorting_column == 'Details_week_to_date.vsBud'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;text-align: center;" @click="handleSortingColumn('Details_week_to_date.Sales_LY_amount')">LY  <q-icon v-if="active_sorting_column == 'Details_week_to_date.Sales_LY_amount'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th colspan="2" style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;border-right: 1px solid black;text-align: center;" @click="handleSortingColumn('Details_week_to_date.vsLY')">vs LY  <q-icon v-if="active_sorting_column == 'Details_week_to_date.vsLY'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>



            <q-th style="padding: 0px;min-width: 5px;max-width: 5px;border:0px;background-color:white;text-align: center;"></q-th>

            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;text-align: center;" @click="handleSortingColumn('Details_month_to_date.Sales_TY_amount')">TY  <q-icon v-if="active_sorting_column == 'Details_month_to_date.Sales_TY_amount'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;text-align: center;" @click="handleSortingColumn('Details_month_to_date.Budget_TY_amount')">BUD  <q-icon v-if="active_sorting_column == 'Details_month_to_date.Budget_TY_amount'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th colspan="2" style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;text-align: center;" @click="handleSortingColumn('Details_month_to_date.vsBud')">vs Bud  <q-icon v-if="active_sorting_column == 'Details_month_to_date.vsBud'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;text-align: center;" @click="handleSortingColumn('Details_month_to_date.Sales_LY_amount')">LY  <q-icon v-if="active_sorting_column == 'Details_month_to_date.Sales_LY_amount'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th colspan="2" style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;border-right: 1px solid black;text-align: center;" @click="handleSortingColumn('Details_month_to_date.vsLY')">vs LY  <q-icon v-if="active_sorting_column == 'Details_month_to_date.vsLY'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>

            <q-th style="padding: 0px;min-width: 5px;max-width: 5px;border:0px;background-color:white;text-align: center;"></q-th>
            <!-- <q-th style="padding: 0px;min-width: 5px;max-width: 5px;border:0px;padding: 0px;text-align: center;background-color: white;"></q-th>
            <q-th  style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;text-align: center;border-right: 1px solid black;">Outlet</q-th>
            <q-th style="padding: 0px;min-width: 5px;max-width: 5px;padding: 0px;text-align: center;background-color: white;border: 0px;"></q-th> -->

            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;text-align: center;" @click="handleSortingColumn('Details_year_to_date.Sales_TY_amount')">TY <q-icon v-if="active_sorting_column == 'Details_year_to_date.Sales_TY_amount'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;text-align: center;" @click="handleSortingColumn('Details_year_to_date.Budget_TY_amount')">BUD <q-icon v-if="active_sorting_column == 'Details_year_to_date.Budget_TY_amount'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th colspan="2" style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;text-align: center;" @click="handleSortingColumn('Details_year_to_date.vsBud')">vs BUD <q-icon v-if="active_sorting_column == 'Details_year_to_date.vsBud'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;text-align: center;" @click="handleSortingColumn('Details_year_to_date.Sales_LY_amount')">LY <q-icon v-if="active_sorting_column == 'Details_year_to_date.Sales_LY_amount'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>
            <q-th colspan="2" style="min-width: 60px;border-top:1px solid black;border-bottom: 1px solid black;text-align: center;" @click="handleSortingColumn('Details_year_to_date.vsLY')">vs LY <q-icon v-if="active_sorting_column == 'Details_year_to_date.vsLY'" style="font-size: 13px;" :class="[active_sorting_column_asc ? 'flip_down' : 'flip_up']" name="filter_list" /></q-th>

        </q-tr>


      </template>


      <!-- <template v-slot:top-row>
        <q-tr>
          <q-td colspan="9">
            Top row
          </q-td>
        </q-tr>
      </template> -->

        <template v-slot:body="props">

            <template v-for="(store_details, index) in json_data.Stores" :key="store_details">
                
                <q-tr :class="[index+1 == json_data.Stores.length && 'last_row table_row', 'table_row']">

                    <template v-if="store_details.State">
                        <q-td style="min-width: 25px; max-width: 25px; position: sticky; left: 0px; z-index: 119; background-color: white; font-weight: bold;text-align: center;" >{{index+1}}</q-td>
                        <q-td style="min-width: 60px; max-width: 60px; position: sticky; left: 25px; z-index: 119; background-color: white; font-weight: bold;text-align:left;" >{{store_details.State.Outlet}}</q-td>
                        <q-td style="min-width: 110px; max-width: 110px; background-color: white; font-weight: bold;text-align:left;" >{{store_details.State.OutletName}}</q-td>
                        <q-td style="min-width: 80px; max-width: 80px; background-color: white; font-weight: bold;text-align:left;" >{{store_details.State.Cohort}}</q-td>
                        <q-td style="min-width: 80px; max-width: 80px; background-color: white; font-weight: bold;text-align:left;" >{{store_details.State.State}}</q-td>
                        <q-td style="min-width: 100px; max-width: 100px; background-color: white; font-weight: bold;text-align:left;border-right: 1px solid black;" >{{store_details.State.AM}}</q-td>
                        <q-td style="padding: 0px;border: 0px;"></q-td>
                    </template>



                    <template v-if="store_details.Details_to_date">
                        <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(store_details.Details_to_date.Sales_TY_amount,'$')}}</q-td>
                        <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(store_details.Details_to_date.Budget_TY_amount,'$')}}</q-td>
                        <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(store_details.Details_to_date.vsBud,'%')}}</q-td>
                        <q-td :style="['padding-left: 2px;padding-left: 2px;',store_details.Details_to_date.vsBud >= -1 && store_details.Details_to_date.vsBud <= 1 ? 'color: #f8db8f;' : (store_details.Details_to_date.vsBud  > 1 ? 'color: green;' : store_details.Details_to_date.vsBud < -1 && 'color:red;')]"><center><char style="font-size: 18pt;">&#x25CF;</char></center></q-td>
                        <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(store_details.Details_to_date.Sales_LY_amount,'$')}}</q-td>
                        <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(store_details.Details_to_date.vsLY,'%')}}</q-td>
                        <q-td :style="['padding-left: 2px;padding-left: 2px;border-right: 1px solid black;',store_details.Details_to_date.vsLY >= -1 && store_details.Details_to_date.vsLY <= 1 ? 'color: #f8db8f;' : (store_details.Details_to_date.vsLY  > 1 ? 'color: green;' : store_details.Details_to_date.vsLY < -1 && 'color:red;')]"><center><char style="font-size: 18pt;">&#x25CF;</char></center></q-td>
                        <q-td style="padding: 0px;border: 0px;"></q-td>
                    </template>



                    <template v-if="store_details.Details_week_to_date">
                        <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(store_details.Details_week_to_date.Sales_TY_amount,'$')}}</q-td>
                        <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(store_details.Details_week_to_date.Budget_TY_amount,'$')}}</q-td>
                        <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(store_details.Details_week_to_date.vsBud,'%')}}</q-td>
                        <q-td :style="['padding-left: 2px;padding-left: 2px;',store_details.Details_week_to_date.vsBud >= -1 && store_details.Details_week_to_date.vsBud <= 1 ? 'color: #f8db8f;' : (store_details.Details_week_to_date.vsBud  > 1 ? 'color: green;' : store_details.Details_week_to_date.vsBud < -1 && 'color:red;')]"><center><char style="font-size: 18pt;">&#x25CF;</char></center></q-td>
                        <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(store_details.Details_week_to_date.Sales_LY_amount,'$')}}</q-td>
                        <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(store_details.Details_week_to_date.vsLY,'%')}}</q-td>
                        <q-td :style="['padding-left: 2px;padding-left: 2px;border-right: 1px solid black;',store_details.Details_week_to_date.vsLY >= -1 && store_details.Details_week_to_date.vsLY <= 1 ? 'color: #f8db8f;' : (store_details.Details_week_to_date.vsLY  > 1 ? 'color: green;' : store_details.Details_week_to_date.vsLY < -1 && 'color:red;')]"><center><char style="font-size: 18pt;">&#x25CF;</char></center></q-td>
                        <q-td style="padding: 0px;border: 0px;"></q-td>
                    </template>



                    <template v-if="store_details.Details_month_to_date">
                        <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(store_details.Details_month_to_date.Sales_TY_amount,'$')}}</q-td>
                        <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(store_details.Details_month_to_date.Budget_TY_amount,'$')}}</q-td>
                        <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(store_details.Details_month_to_date.vsBud,'%')}}</q-td>
                        <q-td :style="['padding-left: 2px;padding-left: 2px;',store_details.Details_month_to_date.vsBud >= -1 && store_details.Details_month_to_date.vsBud <= 1 ? 'color: #f8db8f;' : (store_details.Details_month_to_date.vsBud  > 1 ? 'color: green;' : store_details.Details_month_to_date.vsBud < -1 && 'color:red;')]"><center><char style="font-size: 18pt;">&#x25CF;</char></center></q-td>
                        <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(store_details.Details_month_to_date.Sales_LY_amount,'$')}}</q-td>
                        <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(store_details.Details_month_to_date.vsLY,'%')}}</q-td>
                        <q-td :style="['padding-left: 2px;padding-left: 2px;border-right: 1px solid black;',store_details.Details_month_to_date.vsLY >= -1 && store_details.Details_month_to_date.vsLY <= 1 ? 'color: #f8db8f;' : (store_details.Details_month_to_date.vsLY  > 1 ? 'color: green;' : store_details.Details_month_to_date.vsLY < -1 && 'color:red;')]"><center><char style="font-size: 18pt;">&#x25CF;</char></center></q-td>
                        <q-td style="padding: 0px;border: 0px;"></q-td>
                    </template>

                    <!-- <q-td style="padding: 0px;border: 0px;"></q-td>
                        <template v-if="store_details.Outlet">
                            <q-td style="font-size: 13px; font-weight: bold; border-right: 1px solid black;text-align: left;" >{{store_details.Outlet.Outlet}}</q-td>
                        </template>
                    <q-td style="padding: 0px;border: 0px;"></q-td> -->

                    <template v-if="store_details.Details_year_to_date">
                        <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(store_details.Details_year_to_date.Sales_TY_amount,'$')}}</q-td>
                        <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(store_details.Details_year_to_date.Budget_TY_amount,'$')}}</q-td>
                        <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(store_details.Details_year_to_date.vsBud,'%')}}</q-td>
                        <q-td :style="['padding-left: 2px;padding-left: 2px;',store_details.Details_year_to_date.vsBud >= -1 && store_details.Details_year_to_date.vsBud <= 1 ? 'color: #f8db8f;' : (store_details.Details_year_to_date.vsBud  > 1 ? 'color: green;' : store_details.Details_year_to_date.vsBud < -1 && 'color:red;')]"><center><char style="font-size: 18pt;">&#x25CF;</char></center></q-td>
                        <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(store_details.Details_year_to_date.Sales_LY_amount,'$')}}</q-td>
                        <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(store_details.Details_year_to_date.vsLY,'%')}}</q-td>
                        <q-td :style="['padding-left: 2px;padding-left: 2px;',store_details.Details_year_to_date.vsLY >= -1 && store_details.Details_year_to_date.vsLY <= 1 ? 'color: #f8db8f;' : (store_details.Details_year_to_date.vsLY  > 1 ? 'color: green;' : store_details.Details_year_to_date.vsLY < -1 && 'color:red;')]"><center><char style="font-size: 18pt;">&#x25CF;</char></center></q-td>
                    </template>

                </q-tr>

            </template>
            
            <q-tr v-if="json_data.Closed_Stores.length > 0">
                <q-td colspan="7" style="position: sticky; left: 0px; z-index: 119; background-color: white;"></q-td>
                <q-td colspan="17" style="border: 0px;"></q-td>
            </q-tr>

            <q-tr v-if="json_data.Closed_Stores.length > 0">
                <q-td colspan="6" style="border-bottom: 1px solid black; background-color: white; position: sticky; left: 0px; z-index: 119; background-color: white;">Closed store</q-td>
                <q-td style="border: 0px; padding: 0px; background-color: white;"></q-td>
                <q-td colspan="7" style="border-bottom: 1px solid black; border-left: 0px; "></q-td>
                <q-td colspan="1" style="border: 0px; padding: 0px;"></q-td>
                <q-td colspan="7" style="border-bottom: 1px solid black; border-left: 0px; "></q-td>
                <q-td colspan="1" style="border: 0px; padding: 0px;"></q-td>
                <q-td colspan="7" style="border-bottom: 1px solid black; border-left: 0px; "></q-td>
                <q-td colspan="1" style="border: 0px; padding: 0px;"></q-td>
                <q-td colspan="7" style="border-bottom: 1px solid black; border-left: 0px; "></q-td>
            </q-tr>


            <template v-for="(closed_store_details, index) in json_data.Closed_Stores" :key="closed_store_details">

                <q-tr class="table_row_second">

                    <template v-if="closed_store_details.State">
                        <q-td style="position: sticky; left: 0px; z-index: 119; background-color: white; font-weight: bold;text-align: center;" ></q-td>
                        <q-td style="position: sticky; left: 25px; z-index: 119; background-color: white; font-weight: bold;text-align:center;" >{{closed_store_details.State.Outlet}}</q-td>
                        <q-td style="background-color: white; font-weight: bold;text-align:center;" >{{closed_store_details.State.OutletName}}</q-td>
                        <q-td style="background-color: white; font-weight: bold;text-align:center;" >{{closed_store_details.State.Cohort}}</q-td>
                        <q-td style="background-color: white; font-weight: bold;text-align:center;" >{{closed_store_details.State.State}}</q-td>
                        <q-td style="background-color: white; font-weight: bold;text-align:center;border-right: 1px solid black;" >{{closed_store_details.State.AM}}</q-td>
                        <q-td style="padding: 0px;border: 0px;background-color: white;"></q-td>
                    </template>


                    <template v-if="closed_store_details.Details_to_date">
                        <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(closed_store_details.Details_to_date.Sales_TY_amount,'$')}}</q-td>
                        <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(closed_store_details.Details_to_date.Budget_TY_amount,'$')}}</q-td>
                        <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(closed_store_details.Details_to_date.vsBud,'%')}}</q-td>
                        <q-td :style="['background-color: white;padding-left: 2px;padding-left: 2px;',closed_store_details.Details_to_date.vsBud >= -1 && closed_store_details.Details_to_date.vsBud <= 1 ? 'color: #f8db8f;' : (closed_store_details.Details_to_date.vsBud  > 1 ? 'color: green;' : closed_store_details.Details_to_date.vsBud < -1 && 'color:red;')]"><center><char style="font-size: 18pt;">&#x25CF;</char></center></q-td>
                        <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(closed_store_details.Details_to_date.Sales_LY_amount,'$')}}</q-td>
                        <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(closed_store_details.Details_to_date.vsLY,'%')}}</q-td>
                        <q-td :style="['background-color: white;padding-left: 2px;padding-left: 2px;border-right: 1px solid black;',closed_store_details.Details_to_date.vsLY >= -1 && closed_store_details.Details_to_date.vsLY <= 1 ? 'color: #f8db8f;' : (closed_store_details.Details_to_date.vsLY  > 1 ? 'color: green;' : closed_store_details.Details_to_date.vsLY < -1 && 'color:red;')]"><center><char style="font-size: 18pt;">&#x25CF;</char></center></q-td>
                        <q-td style="padding: 0px;border: 0px;background-color: white;"></q-td>
                    </template>


                    <template v-if="closed_store_details.Details_week_to_date">
                        <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(closed_store_details.Details_week_to_date.Sales_TY_amount,'$')}}</q-td>
                        <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(closed_store_details.Details_week_to_date.Budget_TY_amount,'$')}}</q-td>
                        <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(closed_store_details.Details_week_to_date.vsBud,'%')}}</q-td>
                        <q-td :style="['background-color: white;padding-left: 2px;padding-left: 2px;',closed_store_details.Details_week_to_date.vsBud >= -1 && closed_store_details.Details_week_to_date.vsBud <= 1 ? 'color: #f8db8f;' : (closed_store_details.Details_week_to_date.vsBud  > 1 ? 'color: green;' : closed_store_details.Details_week_to_date.vsBud < -1 && 'color:red;')]"><center><char style="font-size: 18pt;">&#x25CF;</char></center></q-td>
                        <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(closed_store_details.Details_week_to_date.Sales_LY_amount,'$')}}</q-td>
                        <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(closed_store_details.Details_week_to_date.vsLY,'%')}}</q-td>
                        <q-td :style="['background-color: white;padding-left: 2px;padding-left: 2px;border-right: 1px solid black;',closed_store_details.Details_week_to_date.vsLY >= -1 && closed_store_details.Details_week_to_date.vsLY <= 1 ? 'color: #f8db8f;' : (closed_store_details.Details_week_to_date.vsLY  > 1 ? 'color: green;' : closed_store_details.Details_week_to_date.vsLY < -1 && 'color:red;')]"><center><char style="font-size: 18pt;">&#x25CF;</char></center></q-td>
                        <q-td style="padding: 0px;border: 0px;background-color: white;"></q-td>
                    </template>
                    

                    <template v-if="closed_store_details.Details_month_to_date">
                        <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(closed_store_details.Details_month_to_date.Sales_TY_amount,'$')}}</q-td>
                        <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(closed_store_details.Details_month_to_date.Budget_TY_amount,'$')}}</q-td>
                        <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(closed_store_details.Details_month_to_date.vsBud,'%')}}</q-td>
                        <q-td :style="['background-color: white;padding-left: 2px;padding-left: 2px;',closed_store_details.Details_month_to_date.vsBud >= -1 && closed_store_details.Details_month_to_date.vsBud <= 1 ? 'color: #f8db8f;' : (closed_store_details.Details_month_to_date.vsBud  > 1 ? 'color: green;' : closed_store_details.Details_month_to_date.vsBud < -1 && 'color:red;')]"><center><char style="font-size: 18pt;">&#x25CF;</char></center></q-td>
                        <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(closed_store_details.Details_month_to_date.Sales_LY_amount,'$')}}</q-td>
                        <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(closed_store_details.Details_month_to_date.vsLY,'%')}}</q-td>
                        <q-td :style="['background-color: white;padding-left: 2px;padding-left: 2px;border-right: 1px solid black;',closed_store_details.Details_month_to_date.vsLY >= -1 && closed_store_details.Details_month_to_date.vsLY <= 1 ? 'color: #f8db8f;' : (closed_store_details.Details_month_to_date.vsLY  > 1 ? 'color: green;' : closed_store_details.Details_month_to_date.vsLY < -1 && 'color:red;')]"><center><char style="font-size: 18pt;">&#x25CF;</char></center></q-td>
                        <q-td style="padding: 0px;border: 0px;background-color: white;"></q-td>
                    </template>

                    <!-- <q-td style="padding: 0px;border: 0px;background-color: white;"></q-td>
                        <template v-if="closed_store_details.Outlet">
                            <q-td style="font-weight: bold; border-right: 1px solid black;" >{{closed_store_details.Outlet.Outlet}}</q-td>
                        </template>
                    <q-td style="padding: 0px;border: 0px;background-color: white;"></q-td> -->

                    <template v-if="closed_store_details.Details_year_to_date">
                        <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(closed_store_details.Details_year_to_date.Sales_TY_amount,'$')}}</q-td>
                        <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(closed_store_details.Details_year_to_date.Budget_TY_amount,'$')}}</q-td>
                        <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(closed_store_details.Details_year_to_date.vsBud,'%')}}</q-td>
                        <q-td :style="['background-color:white;padding-left: 2px;padding-left: 2px;',closed_store_details.Details_year_to_date.vsBud >= -1 && closed_store_details.Details_year_to_date.vsBud <= 1 ? 'color: #f8db8f;' : (closed_store_details.Details_year_to_date.vsBud  > 1 ? 'color: green;' : closed_store_details.Details_year_to_date.vsBud < -1 && 'color:red;')]"><center><char style="font-size: 18pt;">&#x25CF;</char></center></q-td>
                        <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(closed_store_details.Details_year_to_date.Sales_LY_amount,'$')}}</q-td>
                        <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(closed_store_details.Details_year_to_date.vsLY,'%')}}</q-td>
                        <q-td :style="['background-color: white;padding-left: 2px;padding-left: 2px;',closed_store_details.Details_year_to_date.vsLY >= -1 && closed_store_details.Details_year_to_date.vsLY <= 1 ? 'color: #f8db8f;' : (closed_store_details.Details_year_to_date.vsLY  > 1 ? 'color: green;' : closed_store_details.Details_year_to_date.vsLY < -1 && 'color:red;')]"><center><char style="font-size: 18pt;">&#x25CF;</char></center></q-td>
                    </template>

                </q-tr>
            
            </template>

            <q-tr  v-if="json_data.Total_Stores.length > 0">
                <q-td colspan="6" style="position: sticky; left: 0px; z-index: 119; background-color: white;"></q-td>
                <q-td style="border: 0px; padding: 0px;"></q-td>
                <q-td colspan="7" style="border-bottom: 1px solid black; border-left: 0px; "></q-td>
                <q-td colspan="1" style="border: 0px; padding: 0px;"></q-td>
                <q-td colspan="7" style="border-bottom: 1px solid black; border-left: 0px; "></q-td>
                <q-td colspan="1" style="border: 0px; padding: 0px;"></q-td>
                <q-td colspan="7" style="border-bottom: 1px solid black; border-left: 0px; "></q-td>
                <q-td colspan="1" style="border: 0px; padding: 0px;"></q-td>
                <q-td colspan="7" style="border-bottom: 1px solid black; border-left: 0px; "></q-td>
            </q-tr>

            <template v-for="(total_store_details, index) in json_data.Total_Stores" :key="total_store_details">

                <q-tr class="table_row_third">

                    <template v-if="total_store_details.State">
                        <q-td style="min-width: 25px; max-width: 25px; position: sticky; left: 0px; z-index: 119; background-color: white; font-weight: bold;text-align: center; border: 0px;" ></q-td>
                        <q-td style="min-width: 60px; max-width: 60px; position: sticky; left: 25px; z-index: 119; background-color: white; font-weight: bold;text-align:center; border: 0px; text-align: left;" >{{total_store_details.State.Outlet}}</q-td>
                        <q-td style="min-width: 110px; max-width: 110px; background-color: white; font-weight: bold;text-align:center; border: 0px;" >{{total_store_details.State.OutletName}}</q-td>
                        <q-td style="min-width: 80px; max-width: 80px; background-color: white; font-weight: bold;text-align:center; border: 0px;" >{{total_store_details.State.Cohort}}</q-td>
                        <q-td style="min-width: 80px; max-width: 80px; background-color: white; font-weight: bold;text-align:center; border: 0px;" >{{total_store_details.State.State}}</q-td>
                        <q-td style="min-width: 100px; max-width: 100px; background-color: white; font-weight: bold;text-align:center;border-right: 1px solid black; border: 0px;" >{{total_store_details.State.AM}}</q-td>
                        <q-td style="padding: 0px;border: 0px;background-color: white;"></q-td>
                    </template>


                    
                    <template v-if="total_store_details.Details_to_date">
                        <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_store_details.Details_to_date.Sales_TY_amount,'$')}}</q-td>
                        <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_store_details.Details_to_date.Budget_TY_amount,'$')}}</q-td>
                        <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_store_details.Details_to_date.vsBud,'%')}}</q-td>
                        <q-td :style="['background-color: white; padding-left: 2px;padding-left: 2px;',total_store_details.Details_to_date.vsBud >= -1 && total_store_details.Details_to_date.vsBud <= 1 ? 'color: #f8db8f;' : (total_store_details.Details_to_date.vsBud  > 1 ? 'color: green;' : total_store_details.Details_to_date.vsBud < -1 && 'color:red;')]"><center><char style="font-size: 18pt;">&#x25CF;</char></center></q-td>
                        <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_store_details.Details_to_date.Sales_LY_amount,'$')}}</q-td>
                        <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_store_details.Details_to_date.vsLY,'%')}}</q-td>
                        <q-td :style="['background-color: white; padding-left: 2px;padding-left: 2px;border-right: 1px solid black;',total_store_details.Details_to_date.vsLY >= -1 && total_store_details.Details_to_date.vsLY <= 1 ? 'color: #f8db8f;' : (total_store_details.Details_to_date.vsLY  > 1 ? 'color: green;' : total_store_details.Details_to_date.vsLY < -1 && 'color:red;')]"><center><char style="font-size: 18pt;">&#x25CF;</char></center></q-td>
                        <q-td style="padding: 0px;border: 0px;background-color: white;"></q-td>
                    </template>


                    <template v-if="total_store_details.Details_week_to_date">
                        <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_store_details.Details_week_to_date.Sales_TY_amount,'$')}}</q-td>
                        <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_store_details.Details_week_to_date.Budget_TY_amount,'$')}}</q-td>
                        <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_store_details.Details_week_to_date.vsBud,'%')}}</q-td>
                        <q-td :style="['background-color: white; padding-left: 2px;padding-left: 2px;',total_store_details.Details_week_to_date.vsBud >= -1 && total_store_details.Details_week_to_date.vsBud <= 1 ? 'color: #f8db8f;' : (total_store_details.Details_week_to_date.vsBud  > 1 ? 'color: green;' : total_store_details.Details_week_to_date.vsBud < -1 && 'color:red;')]"><center><char style="font-size: 18pt;">&#x25CF;</char></center></q-td>
                        <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_store_details.Details_week_to_date.Sales_LY_amount,'$')}}</q-td>
                        <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_store_details.Details_week_to_date.vsLY,'%')}}</q-td>
                        <q-td :style="['background-color: white; padding-left: 2px;padding-left: 2px;border-right: 1px solid black;',total_store_details.Details_week_to_date.vsLY >= -1 && total_store_details.Details_week_to_date.vsLY <= 1 ? 'color: #f8db8f;' : (total_store_details.Details_week_to_date.vsLY  > 1 ? 'color: green;' : total_store_details.Details_week_to_date.vsLY < -1 && 'color:red;')]"><center><char style="font-size: 18pt;">&#x25CF;</char></center></q-td>
                        <q-td style="padding: 0px;border: 0px;background-color: white;"></q-td>
                    </template>


                    <template v-if="total_store_details.Details_month_to_date">
                        <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_store_details.Details_month_to_date.Sales_TY_amount,'$')}}</q-td>
                        <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_store_details.Details_month_to_date.Budget_TY_amount,'$')}}</q-td>
                        <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_store_details.Details_month_to_date.vsBud,'%')}}</q-td>
                        <q-td :style="['background-color: white; padding-left: 2px;padding-left: 2px;',total_store_details.Details_month_to_date.vsBud >= -1 && total_store_details.Details_month_to_date.vsBud <= 1 ? 'color: #f8db8f;' : (total_store_details.Details_month_to_date.vsBud  > 1 ? 'color: green;' : total_store_details.Details_month_to_date.vsBud < -1 && 'color:red;')]"><center><char style="font-size: 18pt;">&#x25CF;</char></center></q-td>
                        <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_store_details.Details_month_to_date.Sales_LY_amount,'$')}}</q-td>
                        <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_store_details.Details_month_to_date.vsLY,'%')}}</q-td>
                        <q-td :style="['background-color: white; padding-left: 2px;padding-left: 2px;border-right: 1px solid black;',total_store_details.Details_month_to_date.vsLY >= -1 && total_store_details.Details_month_to_date.vsLY <= 1 ? 'color: #f8db8f;' : (total_store_details.Details_month_to_date.vsLY  > 1 ? 'color: green;' : total_store_details.Details_month_to_date.vsLY < -1 && 'color:red;')]"><center><char style="font-size: 18pt;">&#x25CF;</char></center></q-td>
                        <q-td style="padding: 0px;border: 0px;background-color: white;"></q-td>
                    </template>

                    <!-- <q-td style="padding: 0px;border: 0px;background-color: white;"></q-td>
                        <template v-if="total_store_details.Outlet">
                            <q-td style="font-weight: bold; border-right: 1px solid black;" >{{total_store_details.Outlet.Outlet}}</q-td>
                        </template>
                    <q-td style="padding: 0px;border: 0px;background-color: white;"></q-td> -->

                    <template v-if="total_store_details.Details_year_to_date">
                        <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_store_details.Details_year_to_date.Sales_TY_amount,'$')}}</q-td>
                        <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_store_details.Details_year_to_date.Budget_TY_amount,'$')}}</q-td>
                        <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_store_details.Details_year_to_date.vsBud,'%')}}</q-td>
                        <q-td :style="['background-color: white; padding-left: 2px;padding-left: 2px;',total_store_details.Details_year_to_date.vsBud >= -1 && total_store_details.Details_year_to_date.vsBud <= 1 ? 'color: #f8db8f;' : (total_store_details.Details_year_to_date.vsBud  > 1 ? 'color: green;' : total_store_details.Details_year_to_date.vsBud < -1 && 'color:red;')]"><center><char style="font-size: 18pt;">&#x25CF;</char></center></q-td>
                        <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_store_details.Details_year_to_date.Sales_LY_amount,'$')}}</q-td>
                        <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_store_details.Details_year_to_date.vsLY,'%')}}</q-td>
                        <q-td :style="['background-color: white;padding-left: 2px;padding-left: 2px;',total_store_details.Details_year_to_date.vsLY >= -1 && total_store_details.Details_year_to_date.vsLY <= 1 ? 'color: #f8db8f;' : (total_store_details.Details_year_to_date.vsLY  > 1 ? 'color: green;' : total_store_details.Details_year_to_date.vsLY < -1 && 'color:red;')]"><center><char style="font-size: 18pt;">&#x25CF;</char></center></q-td>
                    </template>

                </q-tr>
            
            </template>

            <q-tr v-if="json_data.Total_LFL_Stores.length > 0">
                <q-td colspan="7" style="border: 0px;position: sticky; left: 0px; z-index: 119;"></q-td>  
                <q-td colspan="7" style="border-bottom: 1px solid black; border-left: 0px;"></q-td>
                <q-td colspan="1" style="border: 0px;"></q-td>
                <q-td colspan="7" style="border-bottom: 1px solid black; border-left: 0px;"></q-td>
                <q-td colspan="1" style="border: 0px;"></q-td>
                <q-td colspan="7" style="border: 0px; border-bottom: 1px solid black;"></q-td>
                <q-td colspan="1" style="border: 0px;"></q-td>
                <q-td colspan="7" style="border: 0px; border-bottom: 1px solid black;"></q-td>
                
            </q-tr>

            <template v-for="(total_lfl_store_details, index) in json_data.Total_LFL_Stores" :key="total_lfl_store_details">

                <q-tr class="table_row_third">

                    <template v-if="total_lfl_store_details.State">
                        <q-td style="min-width: 25px; max-width: 25px; position: sticky; left: 0px; z-index: 119; background-color: white; font-weight: bold;text-align: center; border: 0px;" ></q-td>
                        <q-td style="min-width: 60px; max-width: 60px; position: sticky; left: 25px; z-index: 119; background-color: white; font-weight: bold;text-align:center; border: 0px; text-align: left;" >{{total_lfl_store_details.State.Outlet}}</q-td>
                        <q-td style="min-width: 110px; max-width: 110px; background-color: white; font-weight: bold;text-align:center; border: 0px;" >{{total_lfl_store_details.State.OutletName}}</q-td>
                        <q-td style="min-width: 80px; max-width: 80px; background-color: white; font-weight: bold;text-align:center; border: 0px;" >{{total_lfl_store_details.State.Cohort}}</q-td>
                        <q-td style="min-width: 80px; max-width: 80px; background-color: white; font-weight: bold;text-align:center; border: 0px;" >{{total_lfl_store_details.State.State}}</q-td>
                        <q-td style="min-width: 100px; max-width: 100px; background-color: white; font-weight: bold;text-align:center;border-right: 1px solid black; border: 0px;" >{{total_lfl_store_details.State.AM}}</q-td>
                        <q-td style="padding: 0px;border: 0px;background-color: white;"></q-td>
                    </template>

                    <!-- Details_month_to_date
                    Details_to_date
                    Details_week_to_date
                    Details_year_to_date -->
                    
                    <template v-if="total_lfl_store_details.Details_to_date">
                        <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_lfl_store_details.Details_to_date.Sales_TY_amount,'$')}}</q-td>
                        <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_lfl_store_details.Details_to_date.Budget_TY_amount,'$')}}</q-td>
                        <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_lfl_store_details.Details_to_date.vsBud,'%')}}</q-td>
                        <q-td :style="['background-color: white;padding-left: 2px;padding-left: 2px;',total_lfl_store_details.Details_to_date.vsBud >= -1 && total_lfl_store_details.Details_to_date.vsBud <= 1 ? 'color: #f8db8f;' : (total_lfl_store_details.Details_to_date.vsBud  > 1 ? 'color: green;' : total_lfl_store_details.Details_to_date.vsBud < -1 && 'color:red;')]"><center><char style="font-size: 18pt;">&#x25CF;</char></center></q-td>
                        <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_lfl_store_details.Details_to_date.Sales_LY_amount,'$')}}</q-td>
                        <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_lfl_store_details.Details_to_date.vsLY,'%')}}</q-td>
                        <q-td :style="['background-color: white;padding-left: 2px;padding-left: 2px;border-right: 1px solid black;',total_lfl_store_details.Details_to_date.vsLY >= -1 && total_lfl_store_details.Details_to_date.vsLY <= 1 ? 'color: #f8db8f;' : (total_lfl_store_details.Details_to_date.vsLY  > 1 ? 'color: green;' : total_lfl_store_details.Details_to_date.vsLY < -1 && 'color:red;')]"><center><char style="font-size: 18pt;">&#x25CF;</char></center></q-td>
                        <q-td style="padding: 0px;border: 0px;background-color: white;"></q-td>
                    </template>


                    <template v-if="total_lfl_store_details.Details_week_to_date">
                        <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_lfl_store_details.Details_week_to_date.Sales_TY_amount,'$')}}</q-td>
                        <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_lfl_store_details.Details_week_to_date.Budget_TY_amount,'$')}}</q-td>
                        <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_lfl_store_details.Details_week_to_date.vsBud,'%')}}</q-td>
                        <q-td :style="['background-color: white;padding-left: 2px;padding-left: 2px;',total_lfl_store_details.Details_week_to_date.vsBud >= -1 && total_lfl_store_details.Details_week_to_date.vsBud <= 1 ? 'color: #f8db8f;' : (total_lfl_store_details.Details_week_to_date.vsBud  > 1 ? 'color: green;' : total_lfl_store_details.Details_week_to_date.vsBud < -1 && 'color:red;')]"><center><char style="font-size: 18pt;">&#x25CF;</char></center></q-td>
                        <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_lfl_store_details.Details_week_to_date.Sales_LY_amount,'$')}}</q-td>
                        <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_lfl_store_details.Details_week_to_date.vsLY,'%')}}</q-td>
                        <q-td :style="['background-color: white;padding-left: 2px;padding-left: 2px;border-right: 1px solid black;',total_lfl_store_details.Details_week_to_date.vsLY >= -1 && total_lfl_store_details.Details_week_to_date.vsLY <= 1 ? 'color: #f8db8f;' : (total_lfl_store_details.Details_week_to_date.vsLY  > 1 ? 'color: green;' : total_lfl_store_details.Details_week_to_date.vsLY < -1 && 'color:red;')]"><center><char style="font-size: 18pt;">&#x25CF;</char></center></q-td>
                        <q-td style="padding: 0px;border: 0px;background-color: white;"></q-td>
                    </template>


                    <template v-if="total_lfl_store_details.Details_month_to_date">
                        <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_lfl_store_details.Details_month_to_date.Sales_TY_amount,'$')}}</q-td>
                        <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_lfl_store_details.Details_month_to_date.Budget_TY_amount,'$')}}</q-td>
                        <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_lfl_store_details.Details_month_to_date.vsBud,'%')}}</q-td>
                        <q-td :style="['background-color: white;padding-left: 2px;padding-left: 2px;',total_lfl_store_details.Details_month_to_date.vsBud >= -1 && total_lfl_store_details.Details_month_to_date.vsBud <= 1 ? 'color: #f8db8f;' : (total_lfl_store_details.Details_month_to_date.vsBud  > 1 ? 'color: green;' : total_lfl_store_details.Details_month_to_date.vsBud < -1 && 'color:red;')]"><center><char style="font-size: 18pt;">&#x25CF;</char></center></q-td>
                        <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_lfl_store_details.Details_month_to_date.Sales_LY_amount,'$')}}</q-td>
                        <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_lfl_store_details.Details_month_to_date.vsLY,'%')}}</q-td>
                        <q-td :style="['background-color: white;padding-left: 2px;padding-left: 2px;border-right: 1px solid black;',total_lfl_store_details.Details_month_to_date.vsLY >= -1 && total_lfl_store_details.Details_month_to_date.vsLY <= 1 ? 'color: #f8db8f;' : (total_lfl_store_details.Details_month_to_date.vsLY  > 1 ? 'color: green;' : total_lfl_store_details.Details_month_to_date.vsLY < -1 && 'color:red;')]"><center><char style="font-size: 18pt;">&#x25CF;</char></center></q-td>
                        <q-td style="padding: 0px;border: 0px;background-color: white;"></q-td>
                    </template>

                    <!-- <q-td style="padding: 0px;border: 0px;background-color: white;"></q-td>
                        <template v-if="total_lfl_store_details.Outlet">
                            <q-td style="font-weight: bold; border-right: 1px solid black; border: 0px; background-color: white;" >{{total_lfl_store_details.Outlet.Outlet}}</q-td>
                        </template>
                    <q-td style="padding: 0px;border: 0px;background-color: white;"></q-td> -->
                    
                    <template v-if="total_lfl_store_details.Details_year_to_date">
                        <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_lfl_store_details.Details_year_to_date.Sales_TY_amount,'$')}}</q-td>
                        <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_lfl_store_details.Details_year_to_date.Budget_TY_amount,'$')}}</q-td>
                        <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_lfl_store_details.Details_year_to_date.vsBud,'%')}}</q-td>
                        <q-td :style="['background-color: white;padding-left: 2px;padding-left: 2px;',total_lfl_store_details.Details_year_to_date.vsBud >= -1 && total_lfl_store_details.Details_year_to_date.vsBud <= 1 ? 'color: #f8db8f;' : (total_lfl_store_details.Details_year_to_date.vsBud  > 1 ? 'color: green;' : total_lfl_store_details.Details_year_to_date.vsBud < -1 && 'color:red;')]"><center><char style="font-size: 18pt;">&#x25CF;</char></center></q-td>
                        <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_lfl_store_details.Details_year_to_date.Sales_LY_amount,'$')}}</q-td>
                        <q-td style="font-style: normal; font-size: 13px; font-weight: bold; text-align: right;" >{{formatAmount(total_lfl_store_details.Details_year_to_date.vsLY,'%')}}</q-td>
                        <q-td :style="['background-color: white;padding-left: 2px;padding-left: 2px;border-right: 1px solid black;',total_lfl_store_details.Details_year_to_date.vsLY >= -1 && total_lfl_store_details.Details_year_to_date.vsLY <= 1 ? 'color: #f8db8f;' : (total_lfl_store_details.Details_year_to_date.vsLY  > 1 ? 'color: green;' : total_lfl_store_details.Details_year_to_date.vsLY < -1 && 'color:red;')]"><center><char style="font-size: 18pt;">&#x25CF;</char></center></q-td>
                        <q-td style="padding: 0px;border: 0px;background-color: white;"></q-td>
                    </template>

                    <!-- <template v-if="total_lfl_store_details.Details_year_to_date">

                        <q-td style="border: 0px; background-color: white;">g</q-td>
                        <q-td style="border: 0px; background-color: white;">g</q-td>
                        <q-td style="border: 0px; background-color: white;">g</q-td>
                        <q-td style="border: 0px; background-color: white;">g</q-td>
                        <q-td style="border: 0px; background-color: white;">g</q-td>
                        <q-td style="border: 0px; background-color: white;">g</q-td>
                        <q-td style="border: 0px; background-color: white;">g</q-td>
                    
                    </template> -->

                </q-tr>
            
            </template>
                

            <q-tr v-if="(json_data.Closed_Stores.length <= 0) && (json_data.Total_Stores.length <= 0) && (json_data.Total_LFL_Stores.length <= 0)">
                <q-td colspan="37" style="border: 1px solid black; text-align: center; font-weight: bold;">No data</q-td>
            </q-tr>

        </template>

      <!-- <template v-slot:bottom-row>
        <q-tr>
          <q-td colspan="100%">
            Bottom row
          </q-td>
        </q-tr>
      </template> -->

      <template v-slot:bottom>
        <!-- remove pagination -->
      </template>

    </q-table>

        </q-card-section>

      <q-inner-loading :showing="loading">
        <q-spinner-gears size="50px" color="primary" />
      </q-inner-loading>
    </q-card>

    
  </div>
</template>

<script>
import $ from 'jquery';
import XLSX from 'xlsx';
import Checkbox from 'src/components/RDA/Base/Checkbox'
import SelectFilter from 'src/components/RDA/Base/SelectFilter';
import MultiSelectFilter from 'src/components/RDA/General/MultiSelectFilter';

export default {
    data()
    {
        return{
            loading: true,
            columns: [{}],
            rows:[{}],
            json_data: {
                Closed_Stores: [],
                Stores: [],
                Total_LFL_Stores: [],
                Total_Stores: [],
            },
            ori_json_data: {
                Closed_Stores: [],
                Stores: [],
                Total_LFL_Stores: [],
                Total_Stores: [],
            },
            colspan:{
                MonthToDate:
                { 
                    MonthToDate: 24,
                    Sales: 3,
                    SalesShow: true,
                    SalesIcon: 'remove',
                    ScanGP: 4,
                    ScanGPShow1: true,
                    ScanGPIcon1: 'remove',
                    ScanGPShow2: true,
                    ScanGPIcon2: 'remove',
                    Shrinkage: 4,
                    ShrinkageShow1: true,
                    ShrinkageIcon1: 'remove',
                    ShrinkageShow2: true,
                    ShrinkageIcon2: 'remove',
                    NetGP: 4,
                    NetGPShow1: true,
                    NetGPIcon1: 'remove',
                    NetGPShow2: true,
                    NetGPIcon2: 'remove',
                    Stock: 5,
                    StockShow: true,
                    StockIcon: 'remove',
                },
                YearToDate:
                { 
                    YearToDate: 24,
                    Sales: 3,
                    SalesShow: true,
                    SalesIcon: 'remove',
                    ScanGP: 4,
                    ScanGPShow1: true,
                    ScanGPIcon1: 'remove',
                    ScanGPShow2: true,
                    ScanGPIcon2: 'remove',
                    Shrinkage: 4,
                    ShrinkageShow1: true,
                    ShrinkageIcon1: 'remove',
                    ShrinkageShow2: true,
                    ShrinkageIcon2: 'remove',
                    NetGP: 4,
                    NetGPShow1: true,
                    NetGPIcon1: 'remove',
                    NetGPShow2: true,
                    NetGPIcon2: 'remove',
                    Stock: 5,
                    StockShow: true,
                    StockIcon: 'remove',
                }

            },
            first_height: '0',
            second_height: '0',
            third_height: '0',
            table_title: this.pass_table_title,
            amount_type: true,
            outlet_value: [],
            outlet_options: this.pass_outlet,
            outlet_name_value: [],
            outlet_name_options: this.pass_outlet_name,
            cohort_value: [],
            cohort_options: this.pass_cohort,
            state_value: [],
            state_options: this.pass_state,
            am_value: [],
            am_options: this.pass_am,
            show_expand: true,
            active_sorting: '',
            active_sorting_column: '',
            active_sorting_column_asc: true,
        }
    },
    computed: {
        dbComponentBehavior() {
            return this.$store.getters['dbComponentBehavior/byLanguage']('rda')
        },
    },
    components: {
        Checkbox,
        SelectFilter,
        MultiSelectFilter,
    },
    props: ['pass_data','forceLoading','pass_table_title', 'pass_outlet', 'pass_outlet_name', 'pass_cohort', 'pass_state','pass_am', 'filterStatus'],
    methods:{
        handleSortingColumn(key)
        {
            this.active_sorting = '';

            // this.active_sorting_column_asc = sorting;

            if(this.active_sorting_column == key)
            {
                this.active_sorting_column_asc = !this.active_sorting_column_asc;
            }
            else
            {
                this.active_sorting_column_asc = true;
            }

            this.active_sorting_column = key;

            var variable = this.active_sorting_column_asc ? '>' : '<';

            var new_seq = this.ori_json_data.Stores.sort((a, b) => {
                return eval(`a.${this.active_sorting_column} ${variable} b.${this.active_sorting_column} ? 1 : (a.${this.active_sorting_column} === b.${this.active_sorting_column} ? 0 : -1 )`);
            });

            var new_seq = new_seq.filter((entry)=>{
                return (this.outlet_value.length > 0 ? this.outlet_value.includes(entry.State.Outlet) : entry) && 
                (this.outlet_name_value.length > 0 ? this.outlet_name_value.includes(entry.State.OutletName) : entry) && 
                (this.cohort_value.length > 0 ? this.cohort_value.includes(entry.State.Cohort) : entry) && 
                (this.state_value.length > 0 ? this.state_value.includes(entry.State.State) : entry) && 
                (this.am_value.length > 0 ? this.am_value.includes(entry.State.AM) : entry);
            });

            this.json_data.Stores = new_seq;
            
            
            var new_seq = this.ori_json_data.Closed_Stores.sort((a, b) => {
                return eval(`a.${this.active_sorting_column} ${variable} b.${this.active_sorting_column} ? 1 : (a.${this.active_sorting_column} === b.${this.active_sorting_column} ? 0 : -1 )`);
            });

            var new_seq = new_seq.filter((entry)=>{
                return (this.outlet_value.length > 0 ? this.outlet_value.includes(entry.State.Outlet) : entry) && 
                (this.outlet_name_value.length > 0 ? this.outlet_name_value.includes(entry.State.OutletName) : entry) && 
                (this.cohort_value.length > 0 ? this.cohort_value.includes(entry.State.Cohort) : entry) && 
                (this.state_value.length > 0 ? this.state_value.includes(entry.State.State) : entry) && 
                (this.am_value.length > 0 ? this.am_value.includes(entry.State.AM) : entry);
            });

            this.json_data.Closed_Stores = new_seq;



            var new_seq = this.ori_json_data.Total_Stores.sort((a, b) => {
                return eval(`a.${this.active_sorting_column} ${variable} b.${this.active_sorting_column} ? 1 : (a.${this.active_sorting_column} === b.${this.active_sorting_column} ? 0 : -1 )`);
            });

            var new_seq = new_seq.filter((entry)=>{
                return (this.outlet_value.length > 0 ? this.outlet_value.includes(entry.State.Outlet) : entry) && 
                (this.outlet_name_value.length > 0 ? this.outlet_name_value.includes(entry.State.OutletName) : entry) && 
                (this.cohort_value.length > 0 ? this.cohort_value.includes(entry.State.Cohort) : entry) && 
                (this.state_value.length > 0 ? this.state_value.includes(entry.State.State) : entry) && 
                (this.am_value.length > 0 ? this.am_value.includes(entry.State.AM) : entry);
            });

            this.json_data.Total_Stores = new_seq;


            var new_seq = this.ori_json_data.Total_LFL_Stores.sort((a, b) => {
                return eval(`a.${this.active_sorting_column} ${variable} b.${this.active_sorting_column} ? 1 : (a.${this.active_sorting_column} === b.${this.active_sorting_column} ? 0 : -1 )`);
            });

            var new_seq = new_seq.filter((entry)=>{
                return (this.outlet_value.length > 0 ? this.outlet_value.includes(entry.State.Outlet) : entry) && 
                (this.outlet_name_value.length > 0 ? this.outlet_name_value.includes(entry.State.OutletName) : entry) && 
                (this.cohort_value.length > 0 ? this.cohort_value.includes(entry.State.Cohort) : entry) && 
                (this.state_value.length > 0 ? this.state_value.includes(entry.State.State) : entry) && 
                (this.am_value.length > 0 ? this.am_value.includes(entry.State.AM) : entry);
            });

            this.json_data.Total_LFL_Stores = new_seq;
            // Closed_Stores
            // Total_Stores
            // Total_LFL_Stores


        },
        handleSorting(sorting, key)
        {
            this.active_sorting_column = key;
            this.active_sorting = sorting;
            
            var new_seq = this.ori_json_data.Stores.sort((a, b) => {
                if(sorting == 'ascending')
                {
                    return a.State[this.active_sorting_column] > b.State[this.active_sorting_column] ? 1 : (a.State[this.active_sorting_column] === b.State[this.active_sorting_column] ? 0 : -1 );
                }
                else
                {
                    return a.State[this.active_sorting_column] < b.State[this.active_sorting_column] ? 1 : (a.State[this.active_sorting_column] === b.State[this.active_sorting_column] ? 0 : -1 );
                }
            });


            var new_seq = new_seq.filter((entry)=>{
                return (this.outlet_value.length > 0 ? this.outlet_value.includes(entry.State.Outlet) : entry) && 
                (this.outlet_name_value.length > 0 ? this.outlet_name_value.includes(entry.State.OutletName) : entry) && 
                (this.cohort_value.length > 0 ? this.cohort_value.includes(entry.State.Cohort) : entry) && 
                (this.state_value.length > 0 ? this.state_value.includes(entry.State.State) : entry) && 
                (this.am_value.length > 0 ? this.am_value.includes(entry.State.AM) : entry);
            });

            this.json_data.Stores = new_seq



            var new_seq = this.ori_json_data.Closed_Stores.sort((a, b) => {
                if(sorting == 'ascending')
                {
                    return a.State[this.active_sorting_column] > b.State[this.active_sorting_column] ? 1 : (a.State[this.active_sorting_column] === b.State[this.active_sorting_column] ? 0 : -1 );
                }
                else
                {
                    return a.State[this.active_sorting_column] < b.State[this.active_sorting_column] ? 1 : (a.State[this.active_sorting_column] === b.State[this.active_sorting_column] ? 0 : -1 );
                }
            });


            var new_seq = new_seq.filter((entry)=>{
                return (this.outlet_value.length > 0 ? this.outlet_value.includes(entry.State.Outlet) : entry) && 
                (this.outlet_name_value.length > 0 ? this.outlet_name_value.includes(entry.State.OutletName) : entry) && 
                (this.cohort_value.length > 0 ? this.cohort_value.includes(entry.State.Cohort) : entry) && 
                (this.state_value.length > 0 ? this.state_value.includes(entry.State.State) : entry) && 
                (this.am_value.length > 0 ? this.am_value.includes(entry.State.AM) : entry);
            });

            this.json_data.Closed_Stores = new_seq




            
            var new_seq = this.ori_json_data.Total_Stores.sort((a, b) => {
                if(sorting == 'ascending')
                {
                    return a.State[this.active_sorting_column] > b.State[this.active_sorting_column] ? 1 : (a.State[this.active_sorting_column] === b.State[this.active_sorting_column] ? 0 : -1 );
                }
                else
                {
                    return a.State[this.active_sorting_column] < b.State[this.active_sorting_column] ? 1 : (a.State[this.active_sorting_column] === b.State[this.active_sorting_column] ? 0 : -1 );
                }
            });


            var new_seq = new_seq.filter((entry)=>{
                return (this.outlet_value.length > 0 ? this.outlet_value.includes(entry.State.Outlet) : entry) && 
                (this.outlet_name_value.length > 0 ? this.outlet_name_value.includes(entry.State.OutletName) : entry) && 
                (this.cohort_value.length > 0 ? this.cohort_value.includes(entry.State.Cohort) : entry) && 
                (this.state_value.length > 0 ? this.state_value.includes(entry.State.State) : entry) && 
                (this.am_value.length > 0 ? this.am_value.includes(entry.State.AM) : entry);
            });

            this.json_data.Total_Stores = new_seq



            var new_seq = this.ori_json_data.Total_LFL_Stores.sort((a, b) => {
                if(sorting == 'ascending')
                {
                    return a.State[this.active_sorting_column] > b.State[this.active_sorting_column] ? 1 : (a.State[this.active_sorting_column] === b.State[this.active_sorting_column] ? 0 : -1 );
                }
                else
                {
                    return a.State[this.active_sorting_column] < b.State[this.active_sorting_column] ? 1 : (a.State[this.active_sorting_column] === b.State[this.active_sorting_column] ? 0 : -1 );
                }
            });


            var new_seq = new_seq.filter((entry)=>{
                return (this.outlet_value.length > 0 ? this.outlet_value.includes(entry.State.Outlet) : entry) && 
                (this.outlet_name_value.length > 0 ? this.outlet_name_value.includes(entry.State.OutletName) : entry) && 
                (this.cohort_value.length > 0 ? this.cohort_value.includes(entry.State.Cohort) : entry) && 
                (this.state_value.length > 0 ? this.state_value.includes(entry.State.State) : entry) && 
                (this.am_value.length > 0 ? this.am_value.includes(entry.State.AM) : entry);
            });

            this.json_data.Total_LFL_Stores = new_seq


            // Closed_Stores
            // Total_Stores
            // Total_LFL_Stores

        },
        handleChangeOptions()
        {
            console.log('fafafa');
            console.log(this.ori_json_data);

            this.active_sorting = '';
            this.active_sorting_column = '';
            this.active_sorting_column_asc = '';

            var filter_details = this.ori_json_data.Stores.filter((entry)=>{
                return (this.outlet_value.length > 0 ? this.outlet_value.includes(entry.State.Outlet) : entry) && 
                (this.outlet_name_value.length > 0 ? this.outlet_name_value.includes(entry.State.OutletName) : entry) && 
                (this.cohort_value.length > 0 ? this.cohort_value.includes(entry.State.Cohort) : entry) && 
                (this.state_value.length > 0 ? this.state_value.includes(entry.State.State) : entry) && 
                (this.am_value.length > 0 ? this.am_value.includes(entry.State.AM) : entry);
            });

            var object = {};
            var object_year = {};

            Object.keys(filter_details).forEach((index) => {

                object.Sales_TY_amount = Number(filter_details[index].Details_month_to_date.Sales_TY_amount) + (isNaN(object.Sales_TY_amount) ? Number(0) : Number(object.Sales_TY_amount));
                object.Budget_TY_amount = Number(filter_details[index].Details_month_to_date.Budget_TY_amount) + (isNaN(object.Budget_TY_amount) ? Number(0) : Number(object.Budget_TY_amount));
                object.vsBud = Number(filter_details[index].Details_month_to_date.vsBud) + (isNaN(object.vsBud) ? Number(0) : Number(object.vsBud));
                object.Sales_LY_amount = Number(filter_details[index].Details_month_to_date.Sales_LY_amount) + (isNaN(object.Sales_LY_amount) ? Number(0) : Number(object.Sales_LY_amount));
                object.vsLY = Number(filter_details[index].Details_month_to_date.vsLY) + (isNaN(object.vsLY) ? Number(0) : Number(object.vsLY));

                object_year.Sales_TY_amount = Number(filter_details[index].Details_year_to_date.Sales_TY_amount) + (isNaN(object.Sales_TY_amount) ? Number(0) : Number(object.Sales_TY_amount));
                object_year.Budget_TY_amount = Number(filter_details[index].Details_year_to_date.Budget_TY_amount) + (isNaN(object.Budget_TY_amount) ? Number(0) : Number(object.Budget_TY_amount));
                object_year.vsBud = Number(filter_details[index].Details_year_to_date.vsBud) + (isNaN(object.vsBud) ? Number(0) : Number(object.vsBud));
                object_year.Sales_LY_amount = Number(filter_details[index].Details_year_to_date.Sales_LY_amount) + (isNaN(object.Sales_LY_amount) ? Number(0) : Number(object.Sales_LY_amount));
                object_year.vsLY = Number(filter_details[index].Details_year_to_date.vsLY) + (isNaN(object.vsLY) ? Number(0) : Number(object.vsLY));

            });
            console.log(this.ori_json_data.Stores);
            console.log(filter_details);

            this.json_data.Stores = filter_details;
            this.json_data.Total_Stores[0].Details_month_to_date = object;
            this.json_data.Total_Stores[0].Details_year_to_date = object_year;

            this.json_data.Stores = filter_details;

            this.json_data.Total_LFL_Stores = [];
            

            if(filter_details.length != this.ori_json_data.Stores.length)
            {
                this.json_data.Total_LFL_Stores = [];
                this.json_data.Closed_Stores = [];
            }
            else
            {
                this.json_data.Total_LFL_Stores = this.json_data.Total_LFL_Stores;
                this.json_data.Closed_Stores = this.json_data.Closed_Stores;
            }


            // if(filter_details.length != this.ori_json_data.Division.length)
            // {
            //     this.json_data.Division_Total_LFL = {};
            //     this.json_data.Division_Total_New = {};
            // }
            // else
            // {
            //     this.json_data.Division_Total_LFL = this.ori_json_data.Division_Total_LFL;
            //     this.json_data.Division_Total_New = this.ori_json_data.Division_Total_New;
            // }

            if(this.outlet_value.length > 0 || this.outlet_name_value.length > 0 || this.cohort_value.length > 0 || this.state_value.length > 0 || this.am_value.length > 0)
            {
                var filter_status = true;
            }
            else
            {
                var filter_status = false;
            }

            this.$emit('receiveFilterStatus', filter_status);
        },
        exportToExcel() {

            var currentdate = new Date();
            var year = String(currentdate.getFullYear());
            var month = ('0' + (currentdate.getMonth()+1)).slice(-2);
            var date = ('0' + currentdate.getDate()).slice(-2);

            var final_date = year+"-"+month+"-"+date;

            this.loading = true;
            this.show_expand = false;
            

            setTimeout(()=>{

                let table = document.getElementById('table');

                /* convert the table to a string of HTML */
                let html = table.outerHTML;

                /* create a Blob from the HTML string */
                let blob = new Blob([html], { type: 'application/vnd.ms-excel' });

                /* create a URL for the Blob */
                let url = URL.createObjectURL(blob);

                /* create a link element and trigger a download */
                let a = document.createElement('a');
                a.href = url;
                a.download = this.table_title+"_"+final_date+'.xls';
                a.click();

                setTimeout(()=>{
                    this.show_expand = true;
                    this.loading = false;
                },300);
                
            },300);

            
        },
        formatAmount(value, type)
        {
            var ori_value = value;
            var amount_type = this.amount_type;

            if(amount_type)
            {
                // console.log('divide 1000');
                var decimal = 1;
                var value = Number(value)/1000;
            }
            else
            {
                // console.log('no divide');
                var decimal = 0;
                var value = Number(value);
            }

            if(type == "$")
            {
                var value = Number(value).toFixed(decimal);
            }
            else if(type == "%")
            {
                var value = Number(ori_value).toFixed(1);//curent change to value always decimal 1 for percent
            }
            else
            {
                var value = value;
            }
           
            var parts = value.toString().split(".");
            const numberPart = parts[0];
            const decimalPart = parts[1];
            const thousands = /\B(?=(\d{3})+(?!\d))/g;
    // return numberPart.replace(thousands, ",") + (decimalPart ? "." + decimalPart : "");

            return numberPart.replace(thousands, ",") + (decimalPart ? "." + decimalPart : "");
        },
        calculateMonthColspan()
        {
            var total = 24 - (this.colspan.MonthToDate.SalesShow ? 0 : 1) - (this.colspan.MonthToDate.ScanGPShow1 ? 0 : 1) - (this.colspan.MonthToDate.ScanGPShow2? 0 : 1) - (this.colspan.MonthToDate.ShrinkageShow1 ? 0 : 1) - (this.colspan.MonthToDate.ShrinkageShow2? 0 : 1) - (this.colspan.MonthToDate.NetGPShow1 ? 0 : 1) - (this.colspan.MonthToDate.NetGPShow2? 0 : 1) - (this.colspan.MonthToDate.StockShow? 0 : 1);
            this.colspan.MonthToDate.MonthToDate = total;
        },
        calculateYearColspan()
        {
            var total = 24 - (this.colspan.YearToDate.SalesShow ? 0 : 1) - (this.colspan.YearToDate.ScanGPShow1 ? 0 : 1) - (this.colspan.YearToDate.ScanGPShow2? 0 : 1) - (this.colspan.YearToDate.ShrinkageShow1 ? 0 : 1) - (this.colspan.YearToDate.ShrinkageShow2? 0 : 1) - (this.colspan.YearToDate.NetGPShow1 ? 0 : 1) - (this.colspan.YearToDate.NetGPShow2? 0 : 1) - (this.colspan.YearToDate.StockShow? 0 : 1);
            this.colspan.YearToDate.YearToDate = total;
        },
        SalesColumnButtonClick(){

            if(this.colspan.MonthToDate.SalesShow == true)
            {
                // this.colspan.MonthToDate.MonthToDate = 23;
                this.colspan.MonthToDate.Sales = 2;
                this.colspan.MonthToDate.SalesShow = false;
                this.colspan.MonthToDate.SalesIcon = 'add';
            }
            else
            {
                // this.colspan.MonthToDate.MonthToDate = 24;
                this.colspan.MonthToDate.Sales = 3;
                this.colspan.MonthToDate.SalesShow = true;
                this.colspan.MonthToDate.SalesIcon = 'remove';
            }

            this.calculateMonthColspan();
            
        },
        ScanGPColumnButtonClick1(){
            
            if(this.colspan.MonthToDate.ScanGPShow1 == true)
            {
                this.colspan.MonthToDate.ScanGPShow1 = false;
                this.colspan.MonthToDate.ScanGPIcon1 = 'add';
            }
            else
            {
                this.colspan.MonthToDate.ScanGPShow1 = true;
                this.colspan.MonthToDate.ScanGPIcon1 = 'remove';
            }

            var totalScanGP = 4 - (this.colspan.MonthToDate.ScanGPShow1 ? 0 : 1) - (this.colspan.MonthToDate.ScanGPShow2? 0 : 1);
            this.colspan.MonthToDate.ScanGP = totalScanGP;

            this.calculateMonthColspan();
        },
        ScanGPColumnButtonClick2(){
            
            if(this.colspan.MonthToDate.ScanGPShow2 == true)
            {
                this.colspan.MonthToDate.ScanGPShow2 = false;
                this.colspan.MonthToDate.ScanGPIcon2 = 'add';
            }
            else
            {
                this.colspan.MonthToDate.ScanGPShow2 = true;
                this.colspan.MonthToDate.ScanGPIcon2 = 'remove';
            }

            var totalScanGP = 4 - (this.colspan.MonthToDate.ScanGPShow1 ? 0 : 1) - (this.colspan.MonthToDate.ScanGPShow2? 0 : 1);
            this.colspan.MonthToDate.ScanGP = totalScanGP;

            this.calculateMonthColspan();
        },
        ShrinkageColumnButtonClick1(){
            
            if(this.colspan.MonthToDate.ShrinkageShow1 == true)
            {
                this.colspan.MonthToDate.ShrinkageShow1 = false;
                this.colspan.MonthToDate.ShrinkageIcon1 = 'add';
            }
            else
            {
                this.colspan.MonthToDate.ShrinkageShow1 = true;
                this.colspan.MonthToDate.ShrinkageIcon1 = 'remove';
            }

            var totalShrinkage = 4 - (this.colspan.MonthToDate.ShrinkageShow1 ? 0 : 1) - (this.colspan.MonthToDate.ShrinkageShow2? 0 : 1);
            this.colspan.MonthToDate.Shrinkage = totalShrinkage;

            this.calculateMonthColspan();
        },
        ShrinkageColumnButtonClick2(){
            
            if(this.colspan.MonthToDate.ShrinkageShow2 == true)
            {
                this.colspan.MonthToDate.ShrinkageShow2 = false;
                this.colspan.MonthToDate.ShrinkageIcon2 = 'add';
            }
            else
            {
                this.colspan.MonthToDate.ShrinkageShow2 = true;
                this.colspan.MonthToDate.ShrinkageIcon2 = 'remove';
            }

            var totalShrinkage = 4 - (this.colspan.MonthToDate.ShrinkageShow1 ? 0 : 1) - (this.colspan.MonthToDate.ShrinkageShow2? 0 : 1);
            this.colspan.MonthToDate.Shrinkage = totalShrinkage;

            this.calculateMonthColspan();
        },
        NetGPColumnButtonClick1(){
            
            if(this.colspan.MonthToDate.NetGPShow1 == true)
            {
                this.colspan.MonthToDate.NetGPShow1 = false;
                this.colspan.MonthToDate.NetGPIcon1 = 'add';
            }
            else
            {
                this.colspan.MonthToDate.NetGPShow1 = true;
                this.colspan.MonthToDate.NetGPIcon1 = 'remove';
            }

            var totalNetGP = 4 - (this.colspan.MonthToDate.NetGPShow1 ? 0 : 1) - (this.colspan.MonthToDate.NetGPShow2? 0 : 1);
            this.colspan.MonthToDate.NetGP = totalNetGP;

            this.calculateMonthColspan();
        },
        NetGPColumnButtonClick2(){
            
            if(this.colspan.MonthToDate.NetGPShow2 == true)
            {
                this.colspan.MonthToDate.NetGPShow2 = false;
                this.colspan.MonthToDate.NetGPIcon2 = 'add';
            }
            else
            {
                this.colspan.MonthToDate.NetGPShow2 = true;
                this.colspan.MonthToDate.NetGPIcon2 = 'remove';
            }

            var totalNetGP = 4 - (this.colspan.MonthToDate.NetGPShow1 ? 0 : 1) - (this.colspan.MonthToDate.NetGPShow2? 0 : 1);
            this.colspan.MonthToDate.NetGP = totalNetGP;

            this.calculateMonthColspan();
        },
        StockColumnButtonClick(){
            
            if(this.colspan.MonthToDate.StockShow == true)
            {
                this.colspan.MonthToDate.StockShow = false;
                this.colspan.MonthToDate.StockIcon = 'add';
            }
            else
            {
                this.colspan.MonthToDate.StockShow = true;
                this.colspan.MonthToDate.StockIcon = 'remove';
            }

            var totalStock = 5 - (this.colspan.MonthToDate.StockShow? 0 : 1);
            this.colspan.MonthToDate.Stock = totalStock;

            this.calculateMonthColspan();
        },
        SalesColumnYearButtonClick()
        {
            if(this.colspan.YearToDate.SalesShow == true)
            {
                // this.colspan.YearToDate.YearToDate = 23;
                this.colspan.YearToDate.Sales = 2;
                this.colspan.YearToDate.SalesShow = false;
                this.colspan.YearToDate.SalesIcon = 'add';
            }
            else
            {
                // this.colspan.YearToDate.YearToDate = 24;
                this.colspan.YearToDate.Sales = 3;
                this.colspan.YearToDate.SalesShow = true;
                this.colspan.YearToDate.SalesIcon = 'remove';
            }

            this.calculateYearColspan();
        },
        ScanGPColumnYearButtonClick1()
        {
            if(this.colspan.YearToDate.ScanGPShow1 == true)
            {
                this.colspan.YearToDate.ScanGPShow1 = false;
                this.colspan.YearToDate.ScanGPIcon1 = 'add';
            }
            else
            {
                this.colspan.YearToDate.ScanGPShow1 = true;
                this.colspan.YearToDate.ScanGPIcon1 = 'remove';
            }

            var totalScanGP = 4 - (this.colspan.YearToDate.ScanGPShow1 ? 0 : 1) - (this.colspan.YearToDate.ScanGPShow2? 0 : 1);
            this.colspan.YearToDate.ScanGP = totalScanGP;

            this.calculateYearColspan();
        },
        ScanGPColumnYearButtonClick2()
        {
            if(this.colspan.YearToDate.ScanGPShow2 == true)
            {
                this.colspan.YearToDate.ScanGPShow2 = false;
                this.colspan.YearToDate.ScanGPIcon2 = 'add';
            }
            else
            {
                this.colspan.YearToDate.ScanGPShow2 = true;
                this.colspan.YearToDate.ScanGPIcon2 = 'remove';
            }

            var totalScanGP = 4 - (this.colspan.YearToDate.ScanGPShow1 ? 0 : 1) - (this.colspan.YearToDate.ScanGPShow2? 0 : 1);
            this.colspan.YearToDate.ScanGP = totalScanGP;

            this.calculateYearColspan();
        },
        ShrinkageColumnYearButtonClick1(){
            
            if(this.colspan.YearToDate.ShrinkageShow1 == true)
            {
                this.colspan.YearToDate.ShrinkageShow1 = false;
                this.colspan.YearToDate.ShrinkageIcon1 = 'add';
            }
            else
            {
                this.colspan.YearToDate.ShrinkageShow1 = true;
                this.colspan.YearToDate.ShrinkageIcon1 = 'remove';
            }

            var totalShrinkage = 4 - (this.colspan.YearToDate.ShrinkageShow1 ? 0 : 1) - (this.colspan.YearToDate.ShrinkageShow2? 0 : 1);
            this.colspan.YearToDate.Shrinkage = totalShrinkage;

            this.calculateYearColspan();
        },
        ShrinkageColumnYearButtonClick2(){
            
            if(this.colspan.YearToDate.ShrinkageShow2 == true)
            {
                this.colspan.YearToDate.ShrinkageShow2 = false;
                this.colspan.YearToDate.ShrinkageIcon2 = 'add';
            }
            else
            {
                this.colspan.YearToDate.ShrinkageShow2 = true;
                this.colspan.YearToDate.ShrinkageIcon2 = 'remove';
            }

            var totalShrinkage = 4 - (this.colspan.YearToDate.ShrinkageShow1 ? 0 : 1) - (this.colspan.YearToDate.ShrinkageShow2? 0 : 1);
            this.colspan.YearToDate.Shrinkage = totalShrinkage;

            this.calculateYearColspan();
        },
        NetGPColumnYearButtonClick1(){
            
            if(this.colspan.YearToDate.NetGPShow1 == true)
            {
                this.colspan.YearToDate.NetGPShow1 = false;
                this.colspan.YearToDate.NetGPIcon1 = 'add';
            }
            else
            {
                this.colspan.YearToDate.NetGPShow1 = true;
                this.colspan.YearToDate.NetGPIcon1 = 'remove';
            }

            var totalNetGP = 4 - (this.colspan.YearToDate.NetGPShow1 ? 0 : 1) - (this.colspan.YearToDate.NetGPShow2? 0 : 1);
            this.colspan.YearToDate.NetGP = totalNetGP;

            this.calculateYearColspan();
        },
        NetGPColumnYearButtonClick2(){
            
            if(this.colspan.YearToDate.NetGPShow2 == true)
            {
                this.colspan.YearToDate.NetGPShow2 = false;
                this.colspan.YearToDate.NetGPIcon2 = 'add';
            }
            else
            {
                this.colspan.YearToDate.NetGPShow2 = true;
                this.colspan.YearToDate.NetGPIcon2 = 'remove';
            }

            var totalNetGP = 4 - (this.colspan.YearToDate.NetGPShow1 ? 0 : 1) - (this.colspan.YearToDate.NetGPShow2? 0 : 1);
            this.colspan.YearToDate.NetGP = totalNetGP;

            this.calculateYearColspan();
        },
        StockColumnYearButtonClick(){
            
            if(this.colspan.YearToDate.StockShow == true)
            {
                this.colspan.YearToDate.StockShow = false;
                this.colspan.YearToDate.StockIcon = 'add';
            }
            else
            {
                this.colspan.YearToDate.StockShow = true;
                this.colspan.YearToDate.StockIcon = 'remove';
            }

            var totalStock = 5 - (this.colspan.YearToDate.StockShow? 0 : 1);
            this.colspan.YearToDate.Stock = totalStock;

            this.calculateYearColspan();
        },
    },
    created () {
        // alert('gaga');
        // window.addEventListener('scroll', this.handleScroll);
    },
    mounted()
    {
        $('.q-table').attr('id','table');
        // window.document.body.onscroll = function() {
        //     console.log(123);
        //     var $el = $('.fixedElement'); 
        //     var isPositionFixed = ($el.css('position') == 'fixed');
        //     if ($(this).scrollTop() > 200 && !isPositionFixed){ 
        //         $el.css({'position': 'fixed', 'top': '0px'}); 
        //     }
        //     if ($(this).scrollTop() < 200 && isPositionFixed){
        //         $el.css({'position': 'static', 'top': '0px'}); 
        //     } 

        // }

        var $el = $('.table_total_sales').find('table').find('thead').find('tr:eq(0)'); 
        var $el2 = $('.table_total_sales').find('table').find('thead').find('tr:eq(1)'); 
        var $el3 = $('.table_total_sales').find('table').find('thead').find('tr:eq(2)'); 
        var $el4 = $('.table_total_sales').find('table').find('thead').find('tr:eq(3)'); 

        // var stickTop = $el.offset();
        
        // var headerHeight = $('.q-header').height();

        // var header_padding_top = $('.table_total_sales').find('.q-table__top').css('padding-top');
        // var header_padding_top = header_padding_top.replace('px','');
        // var header_padding_bottom = $('.table_total_sales').find('.q-table__top').css('padding-bottom');
        // var header_padding_bottom = header_padding_bottom.replace('px','');
        // var total_header_padding = Number(header_padding_top)+Number(header_padding_bottom)

        $('.q-table__middle.q-virtual-scroll').scroll((e)=>{ 
            
            this.first_height = $el.height()+'px' ;
            this.second_height = ($el.height()+$el2.height())+'px' ;
            this.third_height = ($el.height()+$el2.height()+$el3.height())+'px' ;
        //     var offset_value = $(this).scrollTop() - headerHeight - total_header_padding+2;

        //     if((($(this).scrollTop()+headerHeight) >= stickTop.top))
        //     {
        //         $el.css({'position': 'sticky', 'top': offset_value+'px', 'z-index': '110'});
        //         $el2.css({'position': 'sticky', 'top': offset_value+$el.height()+'px', 'z-index': '110'});
        //         $el3.css({'position': 'sticky', 'top': offset_value+$el.height()+$el2.height()+'px', 'z-index': '110'});
        //         $el4.css({'position': 'sticky', 'top': offset_value+$el.height()+$el2.height()+$el3.height()+'px', 'z-index': '110'}); 
        //     }

        //     if((($(this).scrollTop()+headerHeight) < stickTop.top))
        //     {
        //         $el.css({'position': 'static', 'top': '0', 'z-index': '0'}); 
        //         $el2.css({'position': 'static', 'top': '0', 'z-index': '0'});
        //         $el3.css({'position': 'sticky', 'top': '0', 'z-index': '0'});
        //         $el4.css({'position': 'sticky', 'top': '0', 'z-index': '0'}); 
        //     }

        });

    },
    watch: {
        pass_data(newVal)
        {
            this.json_data = newVal;
            this.ori_json_data = JSON.parse(JSON.stringify(newVal));
            this.loading = false;

            this.active_sorting = '';
            this.active_sorting_column = '';
            this.active_sorting_column_asc = '';

            this.outlet_value = [];
            this.outlet_name_value = [];
            this.cohort_value = [];
            this.state_value = [];
            this.am_value = [];

        },
        pass_outlet(newVal)
        {
            this.outlet_options = newVal;
            // this.loading = false;
        },
        pass_outlet_name(newVal)
        {
            this.outlet_name_options = newVal;
            // this.loading = false;
        },
        pass_cohort(newVal)
        {
            this.cohort_options = newVal;
            // this.loading = false;
        },
        pass_state(newVal)
        {
            this.state_options = newVal;
            // this.loading = false;
        },
        pass_am(newVal)
        {
            this.am_options = newVal;
            // this.loading = false;
        },
        forceLoading(newVal)
        {
            // if(newVal)
            // {
                this.loading = newVal;
            // }
        },
        pass_table_title(newVal)
        {
            this.table_title = newVal;
        },
        filterStatus(newVal)
        {
            if(!newVal)
            {
                this.outlet_value = [];
                this.outlet_name_value = [];
                this.cohort_value = [];
                this.state_value = [];
                this.am_value = [];

                this.json_data = JSON.parse(JSON.stringify(this.ori_json_data));
            }
        }
    }
}
</script>

<style scoped>
/* 
html::-webkit-scrollbar {
    display: none;
}

body::-webkit-scrollbar {
    display: none;
} */

.table_total_sales > .q-table__middle > .q-table > thead > tr:nth-child(2) > th, 
.table_total_sales > .q-table__middle > .q-table > thead > tr:nth-child(3) > th, 
.table_total_sales > .q-table__middle > .q-table > thead > tr:nth-child(4) > th
{
    font-size: 11px;
    font-weight: bold;
    padding-top: 0px;
    padding-bottom: 0px;
    border-color: black;
}

.table_total_sales > .q-table__middle > .q-table > thead > tr:nth-child(5) > th
{
    font-size: 11px;
    padding-top: 0px;
    padding-bottom: 0px;
    border-color: black;
}

.table_total_sales > .q-table__middle > .q-table > tbody > tr > td
{
    padding-top: 0px;
    padding-bottom: 0px;
    padding-right: 3px;
    font-size: 11px;
    border-color: black;
}

.table_total_sales > .q-table__middle > .q-table > tbody > tr > td:nth-child(n+4) {
    text-align: right;
}

/* * >>> .q-table > thead > tr:nth-child(1) > th:nth-child(4)
{
  border: 1px solid black !important;
  min-width: 30px !important;
  max-width: 30px !important;
  overflow: hidden;
}

* >>> .q-table > thead > tr:nth-child(2) > th:nth-child(8)
{
  border: 1px solid black !important;
  min-width: 30px !important;
  max-width: 30px !important;
  overflow: hidden;
}

* >>> .q-table > thead > tr:nth-child(3) > th:nth-child(23)
{
  border: 1px solid blue !important;
  min-width: 30px !important;
  max-width: 30px !important;
  overflow: hidden;
}

* >>> .q-table > thead > tr:nth-child(4) > th:nth-child(22)
{
  border: 5px solid orange !important;
  min-width: 30px !important;
  max-width: 30px !important;
  overflow: hidden;
}



* >>> .q-table > tbody > tr > td:nth-child(23) {
  border: 1px solid yellow !important;
  width: 100px;
  overflow: hidden;
} */

.table_total_sales > .q-table__middle > .q-table > thead > tr:nth-child(2) > th:nth-child(4),
.table_total_sales > .q-table__middle > .q-table > thead > tr:nth-child(2) > th:nth-child(6)
{
  /* border-top: 1px solid black !important; */
}

* >>> .table_total_sales > .q-table__top
{
    border-bottom:0px;
}

.negative_value
{
    color: red;
}

.rotate {
  -webkit-transform: rotate(-90deg);
  transform: rotate(-90deg);
  width: 1%;
}

/* table thead tr:nth-child(1) {
    position: sticky;
    top: 0px;
} */

/* table thead tr:nth-child(1) {
    background-color: #c0c0c0;
    position:fixed;
    top:60px;
    width:100%;
    z-index:100;
} */
.table_total_sales > .q-table__middle > .q-table > thead > tr > th:nth-child(1),
.table_total_sales > .q-table__middle > .q-table > tbody > tr > td:nth-child(1)
{
    min-width: 20px;
    max-width: 20px;
    padding: 0px;
}

/* 
.table_total_sales > .q-table__middle > .q-table > tbody > tr > td:nth-child(1)
{
    background-color: red !important;
    left: 0;
    position: sticky;
}

.table_total_sales > .q-table__middle > .q-table > tbody > tr > td:nth-child(2)
{
    background-color: yellow !important;
    left: 20px;
    position: sticky;
} */

.table_total_sales > .q-table__middle > .q-table > thead > tr:nth-child(1) > th
{
    top: 0;
    position: sticky;
    z-index: 110;
}

.table_total_sales > .q-table__middle > .q-table > thead > tr:nth-child(2) > th
{
    top: v-bind(first_height);
    position: sticky;
    z-index: 110;
}

/* .table_total_sales > .q-table__middle > .q-table > thead > tr:nth-child(3) > th
{
    top: v-bind(second_height);
    position: sticky;
    z-index: 110;
} */

.table_total_sales > .q-table__middle > .q-table > thead > tr:nth-child(4) > th
{
    top: v-bind(third_height);
    position: sticky;
    z-index: 110;
}

.q-inner-loading
{
    z-index: 200;
}

/* tr.table_row:nth-last-child(5) > td
{
    background-color: red;
    border-bottom: 1px solid black;
} */

/* .last_row > td
{
    border-bottom: 1px solid black;
} */

.table_row > td
{
    border-bottom: 1px solid black;
}

.table_row_second > td
{
    border-bottom: 1px solid black;
    background-color: yellow;
}

.table_row_third > td
{
    border-bottom: 1px solid black;
    background-color: yellow;
}


.flip_up {
  transform: scaleY(1);
}

.flip_down {
  transform: scaleY(-1);
}

* >>> thead > tr:nth-child(2) > th
{
    cursor: pointer;
}

</style>