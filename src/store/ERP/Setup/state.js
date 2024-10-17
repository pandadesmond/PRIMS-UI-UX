export default function () {
  return {
    search_supcus: [],

    read_branch_list: {},
    read_location_list: {},

    read_master_code_by_trans_type:[],

    surcharge_discount_list:[],
    surcharge_discount:[],
    surcharge_discount_status:{},

    read_gst:[],
    read_supcus_all: {},
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

    search_supcus_new: {},
    edit_supcus: {},
    new_supcus: {},
    supcus_branch: [],
    supcus_branch_status: {},
    country: {},
    itemmastersupcode: {},
    set_rep_freq: {},
    sup_rep_site: [],
    sup_ibt: [],
    sup_ibt_site: [],
    log: [],
    read_department: {},
    read_subdept: {},
    read_category: {},
    create_sup_rep_site_status: {},
    update_sup_rep_site_status: {},
    create_sup_ibt_status: {},
    update_sup_ibt_status: {},
    cp_set_branch: {},
    get_set_concept_set_branch: {},
    create_sup_ibt_site_status: {},
    get_supcusgroup: {},
    supcus_dropdown: {},
    update_sup_ibt_site_status: {},
    set_einv_msic: {},
    set_pay_term: {},
    set_einv_state: {},
  }
}
