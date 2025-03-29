// supplier actions
export function trigger_get_supplier_list ({ commit,state }, payload) {
  var object_pass = {
      "url": '/ml_supplier/ml_supplier/',
      "update_path": 'update_supplier',
      "type": 'GET',
      "headers": {},
      "params": payload.payload.params,
      "body": {},
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_get_supplier ({ commit,state }, payload) {
  var object_pass = {
      "url": `/ml_supplier/ml_supplier/${payload.payload.supplier_guid}/`,
      "update_path": 'update_supplier',
      "type": 'GET',
      "headers": {},
      "params": payload.payload.params,
      "body": {},
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

// company actions
export function trigger_get_company_list ({ commit,state }, payload) {
  var object_pass = {
      "url": `/mc_company/mc_company/`,
      "update_path": 'update_company',
      "type": 'GET',
      "headers": {},
      "params": payload.payload.params,
      "body": {},
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_get_company ({ commit,state }, payload) {
  var object_pass = {
      "url": `/mc_company/mc_company/${payload.payload.company_guid}/`,
      "update_path": 'update_company',
      "type": 'GET',
      "headers": {},
      "params": payload.payload.params,
      "body": {},
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_update_company ({ commit,state }, payload) {
  var object_pass = {
      "url": `/mc_company/mc_company/${payload.payload.company_guid}/`,
      "update_path": 'update_company',
      "type": 'PATCH',
      "headers": {},
      "params": payload.payload.params,
      "body": payload.payload.pass_json,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

// company info actions
export function trigger_get_company_info_list ({ commit,state }, payload) {
  var object_pass = {
      "url": `mc_company_info/mc_company_info/`,
      "update_path": 'update_company_info',
      "type": 'GET',
      "headers": {},
      "params": payload.payload.params,
      "body": {},
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_get_company_info ({ commit,state }, payload) {
  var object_pass = {
      "url": `mc_company_info/mc_company_info/${payload.payload.company_info_guid}/`,
      "update_path": 'update_company_info',
      "type": 'GET',
      "headers": {},
      "params": payload.payload.params,
      "body": {},
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_update_company_info ({ commit,state }, payload) {
  var object_pass = {
      "url": `mc_company_info/mc_company_info/${payload.payload.company_info_guid}/`,
      "update_path": 'update_company_info',
      "type": 'PATCH',
      "headers": {},
      "params": payload.payload.params,
      "body": payload.payload.pass_json,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

// retailer actions
export function trigger_get_retailer_list ({ commit,state }, payload) {
  var object_pass = {
      "url": '/ml_retailer/ml_retailer/',
      "update_path": 'update_retailer',
      "type": 'GET',
      "headers": {},
      "params": payload.payload.params,
      "body": {},
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

// retailer outlet actions
export function trigger_get_retailer_outlet_list ({ commit,state }, payload) {
  var object_pass = {
      "url": '/ml_retailer_outlet/ml_retailer_outlet/',
      "update_path": 'update_retailer_outlet',
      "type": 'GET',
      "headers": {},
      "params": payload.payload.params,
      "body": {},
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

// banner actions
export function trigger_get_banner_list ({ commit,state }, payload) {
  var object_pass = {
      "url": '/ml_concept/ml_concept/',
      "update_path": 'update_banner',
      "type": 'GET',
      "headers": {},
      "params": payload.payload.params,
      "body": {},
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_get_banner ({ commit,state }, payload) {
  var object_pass = {
      "url": `/ml_concept/ml_concept/${payload.payload.concept_guid}/`,
      "update_path": 'update_banner',
      "type": 'GET',
      "headers": {},
      "params": payload.payload.params,
      "body": {},
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_update_banner ({ commit,state }, payload) {
  var object_pass = {
      "url": `/ml_concept/ml_concept/${payload.payload.concept_guid}/`,
      "update_path": 'update_banner',
      "type": 'PATCH',
      "headers": {},
      "params": payload.payload.params,
      "body": payload.payload.pass_json,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_create_banner ({ commit,state }, payload) {
  var object_pass = {
      "url": '/ml_concept/ml_concept/',
      "update_path": 'update_banner',
      "type": 'POST',
      "headers": {},
      "params": payload.payload.params,
      "body": payload.payload.pass_json,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_delete_banner ({ commit,state }, payload) {
  var object_pass = {
      "url": `/ml_concept/ml_concept/${payload.payload.concept_guid}/`,
      "update_path": 'update_banner',
      "type": 'DELETE',
      "headers": {},
      "params": payload.payload.params,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_update_banner_bulk ({ commit,state }, payload) {
  var object_pass = {
      "url": `/ml_concept/bulk/`,
      "update_path": 'update_banner',
      "type": 'PUT',
      "headers": {},
      "params": payload.payload.params,
      "body": payload.payload.pass_json,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

// banner outlet actions
export function trigger_get_banner_outlet_list ({ commit,state }, payload) {
  var object_pass = {
      "url": '/ml_concept_retailer_outlet/ml_concept_retailer_outlet/',
      "update_path": 'update_banner_outlet',
      "type": 'GET',
      "headers": {},
      "params": payload.payload.params,
      "body": {},
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_create_banner_outlet ({ commit,state }, payload) {
  var object_pass = {
      "url": '/ml_concept_retailer_outlet/ml_concept_retailer_outlet/',
      "update_path": 'update_banner_outlet',
      "type": 'POST',
      "headers": {},
      "params": payload.payload.params,
      "body": payload.payload.pass_json,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_delete_banner_outlet ({ commit,state }, payload) {
  var object_pass = {
      "url": `/ml_concept_retailer_outlet/ml_concept_retailer_outlet/${payload.payload.concept_outlet_guid}/`,
      "update_path": 'update_banner_outlet',
      "type": 'DELETE',
      "headers": {},
      "params": payload.payload.params,
      "body": {},
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

// division actions
export function trigger_get_division_list ({ commit,state }, payload) {
  delete payload.payload.params.company_guid;
  var object_pass = {
      "url": '/mc_division/mc_division/',
      "update_path": 'update_division',
      "type": 'GET',
      "headers": {},
      "params": payload.payload.params,
      "body": {},
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

// department actions
export function trigger_get_dept_list ({ commit,state }, payload) {
  delete payload.payload.params.company_guid;
  var object_pass = {
      "url": '/mc_department/mc_department/',
      "update_path": 'update_division',
      "type": 'GET',
      "headers": {},
      "params": payload.payload.params,
      "body": {},
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

// subdept actions
export function trigger_get_subdept_list ({ commit,state }, payload) {
  delete payload.payload.params.company_guid;
  var object_pass = {
      "url": '/mc_subdepartment/mc_subdepartment/',
      "update_path": 'update_division',
      "type": 'GET',
      "headers": {},
      "params": payload.payload.params,
      "body": {},
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

// category actions
export function trigger_get_category_list ({ commit,state }, payload) {
  delete payload.payload.params.company_guid;
  var object_pass = {
      "url": '/mc_category/mc_category/',
      "update_path": 'update_division',
      "type": 'GET',
      "headers": {},
      "params": payload.payload.params,
      "body": {},
  };

  return payload.app.$actions({ commit,state }, object_pass);
}


// condition of trade actions
export function trigger_get_cot_list ({ commit,state }, payload) {
  var object_pass = {
      "url": '/ml_retailer_conditiontrade/ml_retailer_conditiontrade/',
      "update_path": 'update_cot',
      "type": 'GET',
      "headers": {},
      "params": payload.payload.params,
      "body": {},
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_get_cot ({ commit,state }, payload) {
  var object_pass = {
      "url": `/ml_retailer_conditiontrade/ml_retailer_conditiontrade/${payload.payload.cot_guid}/`,
      "update_path": 'update_cot',
      "type": 'GET',
      "headers": {},
      "params": payload.payload.params,
      "body": {},
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_update_cot ({ commit,state }, payload) {
  var object_pass = {
      "url": `/ml_retailer_conditiontrade/ml_retailer_conditiontrade/${payload.payload.cot_guid}/`,
      "update_path": 'update_cot',
      "type": 'PATCH',
      "headers": {},
      "params": payload.payload.params,
      "body": payload.payload.pass_json,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_create_cot ({ commit,state }, payload) {
  var object_pass = {
      "url": '/ml_retailer_conditiontrade/ml_retailer_conditiontrade/',
      "update_path": 'update_cot',
      "type": 'POST',
      "headers": {},
      "params": payload.payload.params,
      "body": payload.payload.pass_json,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_delete_cot ({ commit,state }, payload) {
  var object_pass = {
      "url": `/ml_retailer_conditiontrade/ml_retailer_conditiontrade/${payload.payload.cot_guid}/`,
      "update_path": 'update_cot',
      "type": 'DELETE',
      "headers": {},
      "params": payload.payload.params,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

// tab actions
export function trigger_get_tab_list ({ commit,state }, payload) {
  var object_pass = {
      "url": '/ml_tab/ml_tab/',
      "update_path": 'update_tab',
      "type": 'GET',
      "headers": {},
      "params": payload.payload.params,
      "body": {},
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_get_tab ({ commit,state }, payload) {
  var object_pass = {
      "url": `/ml_tab/ml_tab/${payload.payload.tab_guid}/`,
      "update_path": 'update_tab',
      "type": 'GET',
      "headers": {},
      "params": payload.payload.params,
      "body": {},
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_update_tab ({ commit,state }, payload) {
  var object_pass = {
      "url": `/ml_tab/ml_tab/${payload.payload.tab_guid}/`,
      "update_path": 'update_tab',
      "type": 'PATCH',
      "headers": {},
      "params": payload.payload.params,
      "body": payload.payload.pass_json,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_create_tab ({ commit,state }, payload) {
  var object_pass = {
      "url": '/ml_tab/ml_tab/',
      "update_path": 'update_tab',
      "type": 'POST',
      "headers": {},
      "params": payload.payload.params,
      "body": payload.payload.pass_json,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_delete_tab ({ commit,state }, payload) {
  var object_pass = {
      "url": `/ml_tab/ml_tab/${payload.payload.tab_guid}/`,
      "update_path": 'update_tab',
      "type": 'DELETE',
      "headers": {},
      "params": payload.payload.params,
      "body": {},
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

// tab article actions
export function trigger_get_tab_article_list ({ commit,state }, payload) {
  var object_pass = {
      "url": '/ml_tab_article/ml_tab_article/',
      "update_path": 'update_tab_article',
      "type": 'GET',
      "headers": {},
      "params": payload.payload.params,
      "body": {},
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_update_tab_article ({ commit,state }, payload) {
  var object_pass = {
      "url": `/ml_tab_article/ml_tab_article/${payload.payload.tab_article_guid}/`,
      "update_path": 'update_tab_article',
      "type": 'PATCH',
      "headers": {},
      "params": payload.payload.params,
      "body": payload.payload.pass_json,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_create_tab_article ({ commit,state }, payload) {
  var object_pass = {
      "url": '/ml_tab_article/ml_tab_article/',
      "update_path": 'update_tab_article',
      "type": 'POST',
      "headers": {},
      "params": payload.payload.params,
      "body": payload.payload.pass_json,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_delete_tab_article ({ commit,state }, payload) {
  var object_pass = {
      "url": `/ml_tab_article/ml_tab_article/${payload.payload.tab_article_guid}/`,
      "update_path": 'update_tab_article',
      "type": 'DELETE',
      "headers": {},
      "params": payload.payload.params,
      "body": {},
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

// gl code actions
export function trigger_get_glcode_list ({ commit,state }, payload) {
  var object_pass = {
      "url": '/ml_glcode/ml_glcode/',
      "update_path": 'update_glcode',
      "type": 'GET',
      "headers": {},
      "params": payload.payload.params,
      "body": {},
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_get_glcode ({ commit,state }, payload) {
  var object_pass = {
      "url": `/ml_glcode/ml_glcode/${payload.payload.glcode_guid}/`,
      "update_path": 'update_glcode',
      "type": 'GET',
      "headers": {},
      "params": payload.payload.params,
      "body": {},
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_create_glcode ({ commit,state }, payload) {
  var object_pass = {
      "url": '/ml_glcode/ml_glcode/',
      "update_path": 'update_glcode',
      "type": 'POST',
      "headers": {},
      "params": payload.payload.params,
      "body": payload.payload.pass_json,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_update_glcode ({ commit,state }, payload) {
  var object_pass = {
      "url": `/ml_glcode/ml_glcode/${payload.payload.glcode_guid}/`,
      "update_path": 'update_glcode',
      "type": 'PATCH',
      "headers": {},
      "params": payload.payload.params,
      "body": payload.payload.pass_json,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_delete_glcode ({ commit,state }, payload) {
  var object_pass = {
      "url": `/ml_glcode/ml_glcode/${payload.payload.glcode_guid}/`,
      "update_path": 'update_glcode',
      "type": 'DELETE',
      "headers": {},
      "params": payload.payload.params,
      "body": {},
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

// report actions
export function trigger_generate_report ({ commit,state }, payload) {
  var object_pass = {
      "url": '/generate_report/',
      "update_path": 'update_results',
      "type": 'GET',
      "headers": {},
      "params": payload.payload.params,
      "body": {},
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

// setting actions
export function trigger_get_setting ({ commit,state }, payload) {
  var object_pass = {
      "url": '/setting/setting/',
      "update_path": 'update_setting',
      "type": 'GET',
      "headers": {},
      "params": payload.payload.params,
      "body": {},
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

// Item master actions
export function trigger_get_itemcode_list ({ commit,state }, payload) {
  var object_pass = {
      "url": '/backend_itemmaster/backend_itemmaster/',
      "update_path": 'update_itemcode',
      "type": 'GET',
      "headers": {},
      "params": payload.payload.params,
      "body": {},
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

// document actions
export function trigger_get_document_list ({ commit,state }, payload) {
  var object_pass = {
      "url": '/ml_document/ml_document/',
      "update_path": 'update_document',
      "type": 'GET',
      "headers": {},
      "params": payload.payload.params,
      "body": {},
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_get_document ({ commit,state }, payload) {
  var object_pass = {
      "url": `/ml_document/ml_document/${payload.payload.document_guid}/`,
      "update_path": 'update_document',
      "type": 'GET',
      "headers": {},
      "params": payload.payload.params,
      "body": {},
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_create_document ({ commit,state }, payload) {
  var object_pass = {
      "url": '/ml_document/ml_document/',
      "update_path": 'update_document',
      "type": 'POST',
      "headers": {},
      "params": payload.payload.params,
      "body": payload.payload.pass_json,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_update_document ({ commit,state }, payload) {
  var object_pass = {
      "url": `/ml_document/ml_document/${payload.payload.document_guid}/`,
      "update_path": 'update_document',
      "type": 'PATCH',
      "headers": {},
      "params": payload.payload.params,
      "body": payload.payload.pass_json,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_delete_document ({ commit,state }, payload) {
  var object_pass = {
      "url": `/ml_document/ml_document/${payload.payload.document_guid}/`,
      "update_path": 'update_document',
      "type": 'DELETE',
      "headers": {},
      "params": payload.payload.params,
      "body": {},
  };

  return payload.app.$actions({ commit,state }, object_pass);
}