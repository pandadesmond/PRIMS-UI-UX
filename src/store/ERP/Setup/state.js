export default function () {
  return {
    CompanyProfile:{},
    CompanyProfileTableData:[],
    BranchTableData: [],    //Default
    DeptTableData:[],
    GroupTableData:[],
    BranchTableDataStatus:{},     //Edit=Patch
    DeptTableDataStatus:{},
    GroupTableDataStatus:{},
    DeptTableDataServerSide:{},     //Pagination matched with server side
    GroupTableDataServerSide:{},

    // for supplier
    SupplierData:{},
    SupplierTableDataBrowser:[],
    SupplierTableData:[],
    SupplierTableSearchData:[],
    LocationData:[],



    LocationTableData:[],
    LocationTableData2:[],
    SystemUserTableData:[],
    LocationTableDataStatus:{},
    LocationTableDataStatus2:{},
    SystemUserTableDataStatus:{},

    CompanyProfileStatus:{},
    CompanyProfileStatusTable:{},
    // for supplier(table)
    SupplierDataStatusTable: {},
    BranchTableDataServerSide:{},

    // for supplier table server
    SupplierDataStatusTableServerSide: {},

    LocationGroupTableDataServerSide:{},
    LocationTableDataServerSide:{},
    SystemUserDataServerSide:{},


    // NEW
    ml_company: [],
    ml_company_status: {},
    mc_division: [],
    mc_division_status: {},
    mc_department: [],
    mc_department_status: {},
    mc_subdept: [],
    mc_subdept_status: {},
    mc_category: [],
    mc_category_status: {},
    mc_uom: [],
    mc_uom_status: {},
    mc_manufacturer: [],
    mc_manufacturer_status: {},
    mc_brand: [],
    mc_brand_status: {},
    mc_variant: [],
    mc_variant_status: {},
    mc_size: [],
    mc_size_status: {},
    mc_origin: [],
    mc_origin_status: {},
    mc_weighing_type: [],
    mc_weighing_type_status: {},
  }
}
