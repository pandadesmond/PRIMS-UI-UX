// invoice actions
export function trigger_get_invoice_list ({ commit,state }, payload) {
  var object_pass = {
      "url": '/ts_invoice/ts_invoice/',
      "update_path": 'update_invoice',
      "type": 'GET',
      "headers": {},
      "params": payload.payload.params,
      "body": {},
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_get_invoice ({ commit,state }, payload) {
  var object_pass = {
      "url": `/ts_invoice/ts_invoice/${payload.payload.invoice_guid}/`,
      "update_path": 'update_invoice',
      "type": 'GET',
      "headers": {},
      "params": payload.payload.params,
      "body": {},
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_update_invoice ({ commit,state }, payload) {
  var object_pass = {
      "url": `/ts_invoice/ts_invoice/${payload.payload.invoice_guid}/`,
      "update_path": 'update_invoice',
      "type": 'PATCH',
      "headers": {},
      "params": payload.payload.params,
      "body": payload.payload.pass_json,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_create_invoice_bulk ({ commit,state }, payload) {
  var object_pass = {
      "url": `/ts_invoice/bulk/`,
      "update_path": 'update_invoice',
      "type": 'POST',
      "headers": {},
      "params": payload.payload.params,
      "body": payload.payload.pass_json,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_update_invoice_bulk ({ commit,state }, payload) {
  var object_pass = {
      "url": `/ts_invoice/bulk/`,
      "update_path": 'update_invoice',
      "type": 'PUT',
      "headers": {},
      "params": payload.payload.params,
      "body": payload.payload.pass_json,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_post_invoice ({ commit,state }, payload) {
  var object_pass = {
      "url": `/ts_invoice/post/`,
      "update_path": 'update_invoice',
      "type": 'POST',
      "headers": {},
      "params": payload.payload.params,
      "body": payload.payload.pass_json,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_post_invoice_bulk ({ commit,state }, payload) {
  var object_pass = {
      "url": `/ts_invoice/post_multiple/`,
      "update_path": 'update_invoice',
      "type": 'POST',
      "headers": {},
      "params": payload.payload.params,
      "body": payload.payload.pass_json,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_cancel_invoice_bulk ({ commit,state }, payload) {
  var object_pass = {
      "url": `/ts_invoice/cancel/`,
      "update_path": 'update_invoice',
      "type": 'POST',
      "headers": {},
      "params": payload.payload.params,
      "body": payload.payload.pass_json,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

// invoice child actions
export function trigger_get_invoice_child_list ({ commit,state }, payload) {
  var object_pass = {
      "url": '/ts_invoice_child/ts_invoice_child/',
      "update_path": 'update_invoice_child',
      "type": 'GET',
      "headers": {},
      "params": payload.payload.params,
      "body": {},
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_delete_invoice_child ({ commit,state }, payload) {
  var object_pass = {
      "url": `/ts_invoice_child/ts_invoice_child/${payload.payload.invoice_child_guid}/`,
      "update_path": 'update_invoice_child',
      "type": 'DELETE',
      "headers": {},
      "params": payload.payload.params,
      "body": {},
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

// credit/debit note actions
export function trigger_get_cndn_list ({ commit,state }, payload) {
  var object_pass = {
      "url": '/ts_cndn/ts_cndn/',
      "update_path": 'update_cndn_note',
      "type": 'GET',
      "headers": {},
      "params": payload.payload.params,
      "body": {},
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_get_cndn_invoice_list ({ commit,state }, payload) {
  var object_pass = {
      "url": '/ts_cndn_invoice/ts_cndn_invoice/',
      "update_path": 'update_cndn_note',
      "type": 'GET',
      "headers": {},
      "params": payload.payload.params,
      "body": {},
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_get_cndn ({ commit,state }, payload) {
  var object_pass = {
      "url": `/ts_cndn/ts_cndn/${payload.payload.cndn_guid}/`,
      "update_path": 'update_cndn_note',
      "type": 'GET',
      "headers": {},
      "params": payload.payload.params,
      "body": {},
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_update_cndn ({ commit,state }, payload) {
  var object_pass = {
      "url": `/ts_cndn/ts_cndn/${payload.payload.cndn_guid}/`,
      "update_path": 'update_cndn_note',
      "type": 'PATCH',
      "headers": {},
      "params": payload.payload.params,
      "body": payload.payload.pass_json,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_create_cndn_bulk ({ commit,state }, payload) {
  var object_pass = {
      "url": `/ts_cndn/bulk_cndn/`,
      "update_path": 'update_cndn_note',
      "type": 'POST',
      "headers": {},
      "params": payload.payload.params,
      "body": payload.payload.pass_json,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_update_cndn_bulk ({ commit,state }, payload) {
  var object_pass = {
      "url": `/ts_cndn/bulk_cndn/`,
      "update_path": 'update_cndn_note',
      "type": 'PUT',
      "headers": {},
      "params": payload.payload.params,
      "body": payload.payload.pass_json,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_post_cndn_bulk ({ commit,state }, payload) {
  var object_pass = {
      "url": `ts_cndn/post_multiple/`,
      "update_path": 'update_cndn_note',
      "type": 'POST',
      "headers": {},
      "params": payload.payload.params,
      "body": payload.payload.pass_json,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_post_cndn ({ commit,state }, payload) {
  var object_pass = {
      "url": `ts_cndn/post/`,
      "update_path": 'update_cndn_note',
      "type": 'POST',
      "headers": {},
      "params": payload.payload.params,
      "body": payload.payload.pass_json,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_cancel_cndn_bulk ({ commit,state }, payload) {
  var object_pass = {
      "url": `/ts_cndn/cancel/`,
      "update_path": 'update_cndn_note',
      "type": 'POST',
      "headers": {},
      "params": payload.payload.params,
      "body": payload.payload.pass_json,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

// credit/debit child note actions
export function trigger_get_cndn_child_list ({ commit,state }, payload) {
  var object_pass = {
      "url": '/ts_cndn_child/ts_cndn_child/',
      "update_path": 'update_cndn_child_note',
      "type": 'GET',
      "headers": {},
      "params": payload.payload.params,
      "body": {},
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_delete_cndn_child ({ commit,state }, payload) {
  var object_pass = {
      "url": `/ts_cndn_child/ts_cndn_child/${payload.payload.cndn_child_guid}/`,
      "update_path": 'update_cndn_child_note',
      "type": 'DELETE',
      "headers": {},
      "params": payload.payload.params,
      "body": {},
  };

  return payload.app.$actions({ commit,state }, object_pass);
}