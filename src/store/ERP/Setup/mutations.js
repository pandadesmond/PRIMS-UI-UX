export const update_search_supcus = (state, payload) => {
  state.search_supcus = payload
}

export const update_read_supplier = (state, payload) => {
  state.read_supplier = payload
}
export const update_read_supcus_all = (state, payload) => {
  state.read_supcus_all = payload
}

// location -> added from purchase mutations.js
export const update_read_location_list = (state, payload) => {
  state.read_location_list = payload
}


export const update_read_branch = (state, payload) => {
  state.read_branch_list = payload
}

//transaction reason code - Farah
export const update_post_master_code_read_master_code_by_trans_type = (state, payload) => {
  state.read_master_code_by_trans_type = payload
}

//Surcharge code / Discount
export const update_surcharge_discount_list = (state, payload) => {
  state.surcharge_discount_list = payload
}
export const update_create_surcharge_discount_status = (state, payload) => {
  state.surcharge_discount_status = payload
}
export const update_edit_surcharge_discount_status = (state, payload) => {
  state.surcharge_discount_status = payload
}
export const update_get_surcharge_discount = (state, payload) => {
  state.surcharge_discount = payload
}
export const update_delete_surcharge_discount_status = (state, payload) => {
  state.surcharge_discount_status = payload
}

//gst
export const update_read_gst = (state, payload) => {
  state.read_gst = payload
}

export const update_banner_list = (state, payload) => {
    state.banner_list = payload
}

export const update_companyprofile = (state, payload) => {
    state.CompanyProfile = payload
}

export const update_companyprofile_table_data = (state, payload) => {
    state.CompanyProfileTableData = payload
}

export const update_branch_table_data = (state, payload) => {
  state.BranchTableData = payload
}

export const update_dept_table_data = (state, payload) => {
    state.DeptTableData = payload
}

export const update_group_table_data = (state, payload) => {
  state.GroupTableData = payload
}

// for supplier
export const update_supplier = (state, payload) => {
    state.Supplier = payload
}

export const update_supplier_table_data_browser = (state, payload) => {
  state. SupplierTableDataBrowser = payload
}

export const update_supplier_table_data = (state, payload) => {
    state.SupplierTableData = payload
}

export const update_supplier_table_search_data = (state, payload) => {
  state.SupplierTableSearchData = payload
}


export const update_system_user_table_data = (state, payload) => {
  state.SystemUserTableData = payload

}

export const update_companyprofile_status = (state, payload) => {
  state.CompanyProfileStatus = payload
}

export const update_companyprofile_status_table = (state, payload) => {
  state.CompanyProfileStatusTable = payload
}



// for supplier

export const update_supplier_status_table = (state, payload) => {
  state.SupplierDataStatusTable = payload
}

export const update_systemuser_data_status = (state, payload) => {
  state.SystemUserTableDataStatus = payload
}

export const update_branchtabledata_status = (state, payload) => {
  state.BranchTableDataStatus = payload
}

export const update_depttabledata_status = (state, payload) => {
  state.DeptTableDataStatus = payload
}

export const update_grouptabledata_status = (state, payload) => {
  state.GroupTableDataStatus = payload
}

export const update_branch_table_data_server_side = (state, payload) => {
  state.BranchTableDataServerSide = payload
}


// for supplier table server
export const update_supplier_table_data_server_side = (state, payload) => {
  state.SupplierDataStatusTableServerSide = payload
}

export const update_dept_table_data_server_side = (state, payload) => {
  state.DeptTableDataServerSide = payload
}

export const update_group_table_data_server_side = (state, payload) => {
  state.GroupTableDataServerSide = payload
}



export const update_systemuser_table_data_server_side = (state, payload) => {
  state.SystemUserDataServerSide = payload
}

// NEW
export const update_ml_company = (state, payload) => {
  state.ml_company = payload
}

export const update_ml_company_status = (state, payload) => {
  state.ml_company_status = payload
}

export const update_mc_division = (state, payload) => {
  state.mc_division = payload
}

export const update_mc_division_status = (state, payload) => {
  state.mc_division_status = payload
}

export const update_mc_department = (state, payload) => {
  state.mc_department = payload
}

export const update_mc_department_status = (state, payload) => {
  state.mc_department_status = payload
}

export const update_mc_subdept = (state, payload) => {
  state.mc_subdept = payload
}

export const update_mc_subdept_status = (state, payload) => {
  state.mc_subdept_status = payload
}

export const update_mc_category = (state, payload) => {
  state.mc_category = payload
}

export const update_mc_category_status = (state, payload) => {
  state.mc_category_status = payload
}

export const update_mc_uom = (state, payload) => {
  state.mc_uom = payload
}

export const update_mc_uom_status = (state, payload) => {
  state.mc_uom_status = payload
}

export const update_mc_manufacturer = (state, payload) => {
  state.mc_manufacturer = payload
}

export const update_mc_manufacturer_status = (state, payload) => {
  state.mc_manufacturer_status = payload
}

export const update_mc_brand = (state, payload) => {
  state.mc_brand = payload
}

export const update_mc_brand_status = (state, payload) => {
  state.mc_brand_status = payload
}

export const update_mc_variant = (state, payload) => {
  state.mc_variant = payload
}

export const update_mc_variant_status = (state, payload) => {
  state.mc_variant_status = payload
}

export const update_mc_size = (state, payload) => {
  state.mc_size = payload
}

export const update_mc_size_status = (state, payload) => {
  state.mc_size_status = payload
}

export const update_mc_origin = (state, payload) => {
  state.mc_origin = payload
}

export const update_mc_origin_status = (state, payload) => {
  state.mc_origin_status = payload
}

export const update_mc_weighing_type = (state, payload) => {
  state.mc_weighing_type = payload
}

export const update_mc_weighing_type_status = (state, payload) => {
  state.mc_weighing_type_status = payload
}

export const update_search_supcus_new = (state, payload) => {
  state.search_supcus_new = payload
}

export const update_edit_supcus = (state, payload) => {
  state.edit_supcus = payload
}

export const create_supcus = (state, payload) => {
  state.new_supcus = payload
}

export const update_supcus_branch = (state, payload) => {
  state.supcus_branch = payload
}

export const update_supcus_branch_status = (state, payload) => {
  state.supcus_branch_status = payload
}

export const update_country = (state, payload) => {
  state.country = payload
}

export const update_itemmastersupcode = (state, payload) => {
  state.itemmastersupcode = payload
}

export const update_set_rep_freq = (state, payload) => {
  state.set_rep_freq = payload
}

export const update_sup_rep_site = (state, payload) => {
  state.sup_rep_site = payload
}

export const update_sup_ibt = (state, payload) => {
  state.sup_ibt = payload
}

export const update_sup_ibt_site = (state, payload) => {
  state.sup_ibt_site = payload
}

export const update_log = (state, payload) => {
  state.log = payload
}

export const update_read_department = (state, payload) => {
  state.read_department = payload
}

export const update_read_subdept = (state, payload) => {
  state.read_subdept = payload
}

export const update_read_category = (state, payload) => {
  state.read_category = payload
}

export const update_create_sup_rep_site_status = (state, payload) => {
  state.create_sup_rep_site_status = payload
}

export const update_update_sup_rep_site_status = (state, payload) => {
  state.update_sup_rep_site_status = payload
}

export const update_create_sup_ibt_status = (state, payload) => {
  state.create_sup_ibt_status = payload
}

export const update_update_sup_ibt_status = (state, payload) => {
  state.update_sup_ibt_status = payload
}

export const update_cp_set_branch = (state, payload) => {
  state.cp_set_branch = payload
}

export const update_get_set_concept_set_branch = (state, payload) => {
  state.get_set_concept_set_branch = payload
}

export const update_create_sup_ibt_site_status = (state, payload) => {
  state.create_sup_ibt_site_status = payload
}

export const update_get_supcusgroup = (state, payload) => {
  state.get_supcusgroup = payload
}

export const update_supcus_dropdown = (state, payload) => {
  state.supcus_dropdown = payload
}

export const update_update_sup_ibt_site_status = (state, payload) => {
  state.update_sup_ibt_site_status = payload
}

export const update_get_set_einv_msic = (state, payload) => {
  state.set_einv_msic = payload
}

export const update_get_pay_term = (state, payload) => {
  state.set_pay_term = payload
}

export const update_get_set_einv_state = (state, payload) => {
  state.set_einv_state = payload
}
