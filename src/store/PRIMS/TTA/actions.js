// tta actions
export function trigger_get_tta_list ({ commit,state }, payload) {
  var object_pass = {
      "url": '/ts_tta/ts_tta/',
      "update_path": 'update_tta',
      "type": 'GET',
      "headers": {},
      "params": payload.payload.params,
      "body": {},
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_get_tta ({ commit,state }, payload) {
  var object_pass = {
      "url": `/ts_tta/ts_tta/${payload.payload.tta_guid}/`,
      "update_path": 'update_tta',
      "type": 'GET',
      "headers": {},
      "params": payload.payload.params,
      "body": {},
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_create_tta ({ commit,state }, payload) {
  var object_pass = {
      "url": '/ts_tta/ts_tta/',
      "update_path": 'update_tta',
      "type": 'POST',
      "headers": {},
      "params": payload.payload.params,
      "body": payload.payload.pass_json,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_update_tta ({ commit,state }, payload) {
  var object_pass = {
      "url": `/ts_tta/ts_tta/${payload.payload.tta_guid}/`,
      "update_path": 'update_tta',
      "type": 'PATCH',
      "headers": {},
      "params": payload.payload.params,
      "body": payload.payload.pass_json,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

// tab actions
export function trigger_get_tta_tab_list ({ commit,state }, payload) {
  var object_pass = {
      "url": '/ts_tta_tab/ts_tta_tab/',
      "update_path": 'update_tab',
      "type": 'GET',
      "headers": {},
      "params": payload.payload.params,
      "body": {},
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_create_tta_tab ({ commit,state }, payload) {
  var object_pass = {
      "url": '/ts_tta_tab/ts_tta_tab/',
      "update_path": 'update_tab',
      "type": 'POST',
      "headers": {},
      "params": payload.payload.params,
      "body": payload.payload.pass_json,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_update_tta_tab ({ commit,state }, payload) {
  var object_pass = {
      "url": `/ts_tta_tab/ts_tta_tab/${payload.payload.tta_tab_guid}/`,
      "update_path": 'update_tab',
      "type": 'PATCH',
      "headers": {},
      "params": payload.payload.params,
      "body": payload.payload.pass_json,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_delete_tta_tab ({ commit,state }, payload) {
  var object_pass = {
      "url": `/ts_tta_tab/ts_tta_tab/${payload.payload.tta_tab_guid}/`,
      "update_path": 'update_tab',
      "type": 'DELETE',
      "headers": {},
      "params": payload.payload.params,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

// tab article actions
export function trigger_get_tta_tab_article_list ({ commit,state }, payload) {
  var object_pass = {
      "url": '/ts_tta_tab_article/ts_tta_tab_article/',
      "update_path": 'update_article',
      "type": 'GET',
      "headers": {},
      "params": payload.payload.params,
      "body": {},
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_create_tta_tab_article ({ commit,state }, payload) {
  var object_pass = {
      "url": '/ts_tta_tab_article/ts_tta_tab_article/',
      "update_path": 'update_article',
      "type": 'POST',
      "headers": {},
      "params": payload.payload.params,
      "body": payload.payload.pass_json,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_update_tta_tab_article ({ commit,state }, payload) {
  var object_pass = {
      "url": `/ts_tta_tab_article/ts_tta_tab_article/${payload.payload.tta_tab_article_guid}/`,
      "update_path": 'update_article',
      "type": 'PATCH',
      "headers": {},
      "params": payload.payload.params,
      "body": payload.payload.pass_json,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_delete_tta_tab_article ({ commit,state }, payload) {
  var object_pass = {
      "url": `/ts_tta_tab_article/ts_tta_tab_article/${payload.payload.tta_tab_article_guid}/`,
      "update_path": 'update_article',
      "type": 'DELETE',
      "headers": {},
      "params": payload.payload.params,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_create_tta_tab_article_bulk ({ commit,state }, payload) {
  var object_pass = {
      "url": '/ts_tta_tab_article/bulk/',
      "update_path": 'update_article',
      "type": 'POST',
      "headers": {},
      "params": payload.payload.params,
      "body": payload.payload.pass_json,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_update_tta_tab_article_bulk ({ commit,state }, payload) {
  var object_pass = {
      "url": '/ts_tta_tab_article/bulk/',
      "update_path": 'update_article',
      "type": 'PUT',
      "headers": {},
      "params": payload.payload.params,
      "body": payload.payload.pass_json,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_delete_tta_tab_article_bulk ({ commit,state }, payload) {
  var object_pass = {
      "url": '/ts_tta_tab_article/bulk/',
      "update_path": 'update_article',
      "type": 'DELETE',
      "headers": {},
      "params": payload.payload.params,
      "body": payload.payload.pass_json,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

// tir actions
export function trigger_get_tta_tir_list ({ commit,state }, payload) {
  var object_pass = {
      "url": '/ts_tta_targetincentiverebates/ts_tta_targetincentiverebates/',
      "update_path": 'update_tir',
      "type": 'GET',
      "headers": {},
      "params": payload.payload.params,
      "body": {},
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_create_tta_tir_bulk ({ commit,state }, payload) {
  var object_pass = {
      "url": '/ts_tta_targetincentiverebates/bulk/',
      "update_path": 'update_tir',
      "type": 'POST',
      "headers": {},
      "params": payload.payload.params,
      "body": payload.payload.pass_json,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_update_tta_tir_bulk ({ commit,state }, payload) {
  console.log(payload)
  var object_pass = {
      "url": '/ts_tta_targetincentiverebates/bulk/',
      "update_path": 'update_tir',
      "type": 'PUT',
      "headers": {},
      "params": payload.payload.params,
      "body": payload.payload.pass_json,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_delete_tta_tir_bulk ({ commit,state }, payload) {
  console.log(payload)
  var object_pass = {
      "url": '/ts_tta_targetincentiverebates/bulk/',
      "update_path": 'update_tir',
      "type": 'DELETE',
      "headers": {},
      "params": payload.payload.params,
      "body": payload.payload.pass_json,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

// audit trail actions
export function trigger_get_audit_trail_list ({ commit,state }, payload) {
  var object_pass = {
      "url": '/ts_tta_audittrail/ts_tta_audittrail/',
      "update_path": 'update_audit_trail',
      "type": 'GET',
      "headers": {},
      "params": payload.payload.params,
      "body": {},
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

// tta history
export function trigger_get_tta_history_list ({ commit,state }, payload) {
  var object_pass = {
      "url": '/ts_tta_history/ts_tta_history/',
      "update_path": 'update_history',
      "type": 'GET',
      "headers": {},
      "params": payload.payload.params,
      "body": {},
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

// distributor actions
export function trigger_get_tta_distributor_list ({ commit,state }, payload) {
  var object_pass = {
      "url": '/ts_tta_distributor/ts_tta_distributor/',
      "update_path": 'update_distributor',
      "type": 'GET',
      "headers": {},
      "params": payload.payload.params,
      "body": {},
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_create_tta_distributor ({ commit,state }, payload) {
  var object_pass = {
      "url": '/ts_tta_distributor/ts_tta_distributor/',
      "update_path": 'update_distributor',
      "type": 'POST',
      "headers": {},
      "params": payload.payload.params,
      "body": payload.payload.pass_json,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_update_tta_distributor ({ commit,state }, payload) {
  var object_pass = {
      "url": `/ts_tta_distributor/ts_tta_distributor/${payload.payload.tta_distributor_guid}/`,
      "update_path": 'update_distributor',
      "type": 'PATCH',
      "headers": {},
      "params": payload.payload.params,
      "body": payload.payload.pass_json,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_delete_tta_distributor ({ commit,state }, payload) {
  var object_pass = {
      "url": `/ts_tta_distributor/ts_tta_distributor/${payload.payload.tta_distributor_guid}/`,
      "update_path": 'update_distributor',
      "type": 'DELETE',
      "headers": {},
      "params": payload.payload.params,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_create_tta_distributor_bulk ({ commit,state }, payload) {
  var object_pass = {
      "url": '/ts_tta_distributor/bulk/',
      "update_path": 'update_distributor',
      "type": 'POST',
      "headers": {},
      "params": payload.payload.params,
      "body": payload.payload.pass_json,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_update_tta_distributor_bulk ({ commit,state }, payload) {
  var object_pass = {
      "url": '/ts_tta_distributor/bulk/',
      "update_path": 'update_distributor',
      "type": 'PUT',
      "headers": {},
      "params": payload.payload.params,
      "body": payload.payload.pass_json,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_delete_tta_distributor_bulk ({ commit,state }, payload) {
  var object_pass = {
      "url": '/ts_tta_distributor/bulk/',
      "update_path": 'update_distributor',
      "type": 'DELETE',
      "headers": {},
      "params": payload.payload.params,
      "body": payload.payload.pass_json,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

// division actions
export function trigger_get_tta_division_list ({ commit,state }, payload) {
  var object_pass = {
      "url": '/ts_tta_tradinggroup/ts_tta_tradinggroup/',
      "update_path": 'update_division',
      "type": 'GET',
      "headers": {},
      "params": payload.payload.params,
      "body": {},
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_create_tta_division ({ commit,state }, payload) {
  var object_pass = {
      "url": '/ts_tta_tradinggroup/ts_tta_tradinggroup/',
      "update_path": 'update_division',
      "type": 'POST',
      "headers": {},
      "params": payload.payload.params,
      "body": payload.payload.pass_json,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_delete_tta_division ({ commit,state }, payload) {
  var object_pass = {
      "url": `/ts_tta_tradinggroup/ts_tta_tradinggroup/${payload.payload.tta_group_guid}/`,
      "update_path": 'update_division',
      "type": 'DELETE',
      "headers": {},
      "params": payload.payload.params,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_create_tta_division_bulk ({ commit,state }, payload) {
  var object_pass = {
      "url": '/ts_tta_tradinggroup/bulk/',
      "update_path": 'update_division',
      "type": 'POST',
      "headers": {},
      "params": payload.payload.params,
      "body": payload.payload.pass_json,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_delete_tta_division_bulk ({ commit,state }, payload) {
  var object_pass = {
      "url": '/ts_tta_tradinggroup/bulk/',
      "update_path": 'update_division',
      "type": 'DELETE',
      "headers": {},
      "params": payload.payload.params,
      "body": payload.payload.pass_json,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}


// condition of trade actions
export function trigger_get_tta_cot_list ({ commit,state }, payload) {
  var object_pass = {
      "url": '/ts_tta_conditiontrade/ts_tta_conditiontrade/',
      "update_path": 'update_cot',
      "type": 'GET',
      "headers": {},
      "params": payload.payload.params,
      "body": {},
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_create_tta_cot_list ({ commit,state }, payload) {
  var object_pass = {
      "url": '/ts_tta_conditiontrade/ts_tta_conditiontrade/',
      "update_path": 'update_cot',
      "type": 'POST',
      "headers": {},
      "params": payload.payload.params,
      "body": payload.payload.pass_json,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_update_tta_cot_list ({ commit,state }, payload) {
  var object_pass = {
      "url": `/ts_tta_conditiontrade/ts_tta_conditiontrade/${payload.payload.tta_cot_guid}/`,
      "update_path": 'update_cot',
      "type": 'PATCH',
      "headers": {},
      "params": payload.payload.params,
      "body": payload.payload.pass_json,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

// concept (banner) actions
export function trigger_get_tta_banner_list ({ commit,state }, payload) {
  var object_pass = {
      "url": '/ts_tta_concept/ts_tta_concept/',
      "update_path": 'update_banner',
      "type": 'GET',
      "headers": {},
      "params": payload.payload.params,
      "body": {},
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_create_tta_banner ({ commit,state }, payload) {
  var object_pass = {
      "url": '/ts_tta_concept/ts_tta_concept/',
      "update_path": 'update_banner',
      "type": 'POST',
      "headers": {},
      "params": payload.payload.params,
      "body": payload.payload.pass_json,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_delete_tta_banner ({ commit,state }, payload) {
  var object_pass = {
      "url": `/ts_tta_concept/ts_tta_concept/${payload.payload.tta_concept_guid}/`,
      "update_path": 'update_banner',
      "type": 'DELETE',
      "headers": {},
      "params": payload.payload.params,
      "body": {},
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_create_tta_banner_bulk ({ commit,state }, payload) {
  var object_pass = {
      "url": '/ts_tta_concept/bulk/',
      "update_path": 'update_banner',
      "type": 'POST',
      "headers": {},
      "params": payload.payload.params,
      "body": payload.payload.pass_json,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_delete_tta_banner_bulk ({ commit,state }, payload) {
  var object_pass = {
      "url": '/ts_tta_concept/bulk/',
      "update_path": 'update_banner',
      "type": 'DELETE',
      "headers": {},
      "params": payload.payload.params,
      "body": payload.payload.pass_json,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

// tta upload
export function trigger_get_tta_upload_list ({ commit,state }, payload) {
  var object_pass = {
      "url": '/ts_tta_upload/ts_tta_upload/',
      "update_path": 'update_upload',
      "type": 'GET',
      "headers": {},
      "params": payload.payload.params,
      "body": {},
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_create_tta_upload ({ commit,state }, payload) {
  var object_pass = {
      "url": '/ts_tta_upload/ts_tta_upload/',
      "update_path": 'update_upload',
      "type": 'POST',
      "headers": {},
      "params": payload.payload.params,
      "body": payload.payload.pass_json,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_delete_tta_upload ({ commit,state }, payload) {
  var object_pass = {
      "url": `/ts_tta_upload/ts_tta_upload/${payload.payload.tta_upload_guid}/`,
      "update_path": 'update_upload',
      "type": 'DELETE',
      "headers": {},
      "params": payload.payload.params,
      "body": {},
  };

  return payload.app.$actions({ commit,state }, object_pass);
}
