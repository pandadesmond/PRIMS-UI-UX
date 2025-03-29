// EDC actions
export function trigger_get_edc_list ({ commit,state }, payload) {
  var object_pass = {
      "url": '/ts_edc/ts_edc/',
      "update_path": 'update_edc',
      "type": 'GET',
      "headers": {},
      "params": payload.payload.params,
      "body": {},
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_get_edc ({ commit,state }, payload) {
  var object_pass = {
      "url": `/ts_edc/ts_edc/${payload.payload.edc_guid}/`,
      "update_path": 'update_edc',
      "type": 'GET',
      "headers": {},
      "params": payload.payload.params,
      "body": {},
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_create_edc ({ commit,state }, payload) {
  var object_pass = {
      "url": `/ts_edc/ts_edc/`,
      "update_path": 'update_edc',
      "type": 'POST',
      "headers": {},
      "params": payload.payload.params,
      "body": payload.payload.pass_json,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_update_edc ({ commit,state }, payload) {
  var object_pass = {
      "url": `/ts_edc/ts_edc/${payload.payload.edc_guid}/`,
      "update_path": 'update_edc',
      "type": 'PATCH',
      "headers": {},
      "params": payload.payload.params,
      "body": payload.payload.pass_json,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

// EDC upload actions
export function trigger_get_edc_upload ({ commit,state }, payload) {
  var object_pass = {
      "url": `/ts_edc_upload/ts_edc_upload/`,
      "update_path": 'update_edc',
      "type": 'GET',
      "headers": {},
      "params": payload.payload.params,
      "body": {},
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_create_edc_upload ({ commit,state }, payload) {
  var object_pass = {
      "url": `/ts_edc_upload/ts_edc_upload/`,
      "update_path": 'update_edc',
      "type": 'POST',
      "headers": {},
      "params": payload.payload.params,
      "body": payload.payload.pass_json,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_delete_edc_upload ({ commit,state }, payload) {
  var object_pass = {
      "url": `/ts_edc_upload/ts_edc_upload/${payload.payload.edc_upload_guid}/`,
      "update_path": 'update_edc',
      "type": 'DELETE',
      "headers": {},
      "params": payload.payload.params,
      "body": payload.payload.pass_json,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

// EDC child actions
export function trigger_get_edc_child_list ({ commit,state }, payload) {
  var object_pass = {
      "url": '/ts_edc_child/ts_edc_child/',
      "update_path": 'update_edc_child',
      "type": 'GET',
      "headers": {},
      "params": payload.payload.params,
      "body": {},
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_create_edc_child ({ commit,state }, payload) {
  var object_pass = {
      "url": `/ts_edc_child/ts_edc_child/`,
      "update_path": 'update_edc_child',
      "type": 'POST',
      "headers": {},
      "params": payload.payload.params,
      "body": payload.payload.pass_json,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_update_edc_child ({ commit,state }, payload) {
  var object_pass = {
      "url": `/ts_edc_child/ts_edc_child/${payload.payload.edc_child_guid}/`,
      "update_path": 'update_edc_child',
      "type": 'PUT',
      "headers": {},
      "params": payload.payload.params,
      "body": payload.payload.pass_json,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_delete_edc_child ({ commit,state }, payload) {
  var object_pass = {
      "url": `/ts_edc_child/ts_edc_child/${payload.payload.edc_child_guid}/`,
      "update_path": 'update_edc_child',
      "type": 'DELETE',
      "headers": {},
      "params": payload.payload.params,
      "body": {},
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

// EDC child ratio actions
export function trigger_get_edc_child_ratio_list ({ commit,state }, payload) {
  var object_pass = {
      "url": '/ts_edc_child_ratio/ts_edc_child_ratio/',
      "update_path": 'update_edc_child_ratio',
      "type": 'GET',
      "headers": {},
      "params": payload.payload.params,
      "body": {},
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_create_edc_child_ratio_bulk ({ commit,state }, payload) {
  var object_pass = {
      "url": `/ts_edc_child_ratio/bulk/`,
      "update_path": 'update_edc_child_ratio',
      "type": 'POST',
      "headers": {},
      "params": payload.payload.params,
      "body": payload.payload.pass_json,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_update_edc_child_ratio_bulk ({ commit,state }, payload) {
  var object_pass = {
      "url": `/ts_edc_child_ratio/bulk/`,
      "update_path": 'update_edc_child_ratio',
      "type": 'PUT',
      "headers": {},
      "params": payload.payload.params,
      "body": payload.payload.pass_json,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_delete_edc_child_ratio_bulk ({ commit,state }, payload) {
  var object_pass = {
      "url": `/ts_edc_child_ratio/bulk/`,
      "update_path": 'update_edc_child_ratio',
      "type": 'DELETE',
      "headers": {},
      "params": payload.payload.params,
      "body": payload.payload.pass_json,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

// EDC child allocation actions
export function trigger_get_edc_child_allocation_list ({ commit,state }, payload) {
  var object_pass = {
      "url": '/ts_edc_child_allocation/ts_edc_child_allocation/',
      "update_path": 'update_edc_child_allocation',
      "type": 'GET',
      "headers": {},
      "params": payload.payload.params,
      "body": {},
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_create_edc_child_allocation_bulk ({ commit,state }, payload) {
  var object_pass = {
      "url": `/ts_edc_child_allocation/bulk/`,
      "update_path": 'update_edc_child_allocation',
      "type": 'POST',
      "headers": {},
      "params": payload.payload.params,
      "body": payload.payload.pass_json,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_update_edc_child_allocation_bulk ({ commit,state }, payload) {
  var object_pass = {
      "url": `/ts_edc_child_allocation/bulk/`,
      "update_path": 'update_edc_child_allocation',
      "type": 'PUT',
      "headers": {},
      "params": payload.payload.params,
      "body": payload.payload.pass_json,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_delete_edc_child_allocation_bulk ({ commit,state }, payload) {
  var object_pass = {
      "url": `/ts_edc_child_allocation/bulk/`,
      "update_path": 'update_edc_child_allocation',
      "type": 'DELETE',
      "headers": {},
      "params": payload.payload.params,
      "body": payload.payload.pass_json,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

// PD actions
export function trigger_get_pd_list ({ commit,state }, payload) {
  var object_pass = {
      "url": '/ts_pd/ts_pd/',
      "update_path": 'update_pd',
      "type": 'GET',
      "headers": {},
      "params": payload.payload.params,
      "body": {},
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_get_pd ({ commit,state }, payload) {
  var object_pass = {
      "url": `/ts_pd/ts_pd/${payload.payload.pd_guid}/`,
      "update_path": 'update_pd',
      "type": 'GET',
      "headers": {},
      "params": payload.payload.params,
      "body": {},
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_create_pd ({ commit,state }, payload) {
  var object_pass = {
      "url": `/ts_pd/ts_pd/`,
      "update_path": 'update_pd',
      "type": 'POST',
      "headers": {},
      "params": payload.payload.params,
      "body": payload.payload.pass_json,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_update_pd ({ commit,state }, payload) {
  var object_pass = {
      "url": `/ts_pd/ts_pd/${payload.payload.pd_guid}/`,
      "update_path": 'update_pd',
      "type": 'PATCH',
      "headers": {},
      "params": payload.payload.params,
      "body": payload.payload.pass_json,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

// PD upload actions
export function trigger_get_pd_upload ({ commit,state }, payload) {
  var object_pass = {
      "url": `/ts_pd_upload/ts_pd_upload/`,
      "update_path": 'update_pd',
      "type": 'GET',
      "headers": {},
      "params": payload.payload.params,
      "body": {},
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_create_pd_upload ({ commit,state }, payload) {
  var object_pass = {
      "url": `/ts_pd_upload/ts_pd_upload/`,
      "update_path": 'update_pd',
      "type": 'POST',
      "headers": {},
      "params": payload.payload.params,
      "body": payload.payload.pass_json,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_delete_pd_upload ({ commit,state }, payload) {
  var object_pass = {
      "url": `/ts_pd_upload/ts_pd_upload/${payload.payload.pd_upload_guid}/`,
      "update_path": 'update_pd',
      "type": 'DELETE',
      "headers": {},
      "params": payload.payload.params,
      "body": payload.payload.pass_json,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

// PD child actions
export function trigger_get_pd_child_list ({ commit,state }, payload) {
  var object_pass = {
      "url": '/ts_pd_child/ts_pd_child/',
      "update_path": 'update_pd_child',
      "type": 'GET',
      "headers": {},
      "params": payload.payload.params,
      "body": {},
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_create_pd_child_bulk ({ commit,state }, payload) {
  var object_pass = {
      "url": `/ts_pd_child/bulk/`,
      "update_path": 'update_pd_child',
      "type": 'POST',
      "headers": {},
      "params": payload.payload.params,
      "body": payload.payload.pass_json,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_update_pd_child ({ commit,state }, payload) {
  var object_pass = {
      "url": `/ts_pd_child/ts_pd_child/${payload.payload.pd_child_guid}/`,
      "update_path": 'update_pd_child',
      "type": 'PATCH',
      "headers": {},
      "params": payload.payload.params,
      "body": payload.payload.pass_json,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_delete_pd_child ({ commit,state }, payload) {
  var object_pass = {
      "url": `/ts_pd_child/ts_pd_child/${payload.payload.pd_child_guid}/`,
      "update_path": 'update_pd_child',
      "type": 'DELETE',
      "headers": {},
      "params": payload.payload.params,
      "body": {},
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

