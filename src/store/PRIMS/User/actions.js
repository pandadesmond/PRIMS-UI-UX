// user info actions
export function trigger_get_user_info_list ({ commit,state }, payload) {
  var object_pass = {
      "url": '/user_info/user_info/',
      "update_path": 'update_user_info',
      "type": 'GET',
      "headers": {},
      "params": payload.payload.params,
      "body": {},
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_get_user_info ({ commit,state }, payload) {
  var object_pass = {
      "url": `/user_info/user_info/${payload.payload.user_info_guid}/`,
      "update_path": 'update_user_info',
      "type": 'GET',
      "headers": {},
      "params": payload.payload.params,
      "body": {},
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_create_user_info ({ commit,state }, payload) {
  var object_pass = {
      "url": '/user_info/user_info/',
      "update_path": 'update_user_info',
      "type": 'POST',
      "headers": {},
      "params": payload.payload.params,
      "body": payload.payload.pass_json,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_update_user_info ({ commit,state }, payload) {
  var object_pass = {
      "url": `/user_info/user_info/${payload.payload.user_info_guid}/`,
      "update_path": 'update_user_info',
      "type": 'PATCH',
      "headers": {},
      "params": payload.payload.params,
      "body": payload.payload.pass_json,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_delete_user_info ({ commit,state }, payload) {
  var object_pass = {
      "url": `/user_info/user_info/${payload.payload.user_info_guid}/`,
      "update_path": 'update_user_info',
      "type": 'DELETE',
      "headers": {},
      "params": payload.payload.params,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

// user group actions
export function trigger_get_user_group_list ({ commit,state }, payload) {
  var object_pass = {
      "url": '/user_group/user_group/',
      "update_path": 'update_user_group',
      "type": 'GET',
      "headers": {},
      "params": payload.payload.params,
      "body": {},
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_get_user_group ({ commit,state }, payload) {
  var object_pass = {
      "url": `/user_group/user_group/${payload.payload.user_group_guid}/`,
      "update_path": 'update_user_group',
      "type": 'GET',
      "headers": {},
      "params": payload.payload.params,
      "body": {},
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_create_user_group ({ commit,state }, payload) {
  var object_pass = {
      "url": `/user_group/user_group/`,
      "update_path": 'update_user_group',
      "type": 'POST',
      "headers": {},
      "params": payload.payload.params,
      "body": payload.payload.pass_json,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_update_user_group ({ commit,state }, payload) {
  var object_pass = {
      "url": `/user_group/user_group/${payload.payload.user_group_guid}/`,
      "update_path": 'update_user_group',
      "type": 'PATCH',
      "headers": {},
      "params": payload.payload.params,
      "body": payload.payload.pass_json,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_delete_user_group ({ commit,state }, payload) {
  var object_pass = {
      "url": `/user_group/user_group/${payload.payload.user_group_guid}/`,
      "update_path": 'update_user_group',
      "type": 'DELETE',
      "headers": {},
      "params": payload.payload.params,
      "body": {},
  };

  return payload.app.$actions({ commit,state }, object_pass);
}


// designation actions
export function trigger_get_designation_list ({ commit,state }, payload) {
  var object_pass = {
      "url": '/ml_designation/ml_designation/',
      "update_path": 'update_designation',
      "type": 'GET',
      "headers": {},
      "params": payload.payload.params,
      "body": {},
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_get_designation ({ commit,state }, payload) {
  var object_pass = {
      "url": `/ml_designation/ml_designation/${payload.payload.designation_guid}/`,
      "update_path": 'update_designation',
      "type": 'GET',
      "headers": {},
      "params": payload.payload.params,
      "body": {},
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_create_designation ({ commit,state }, payload) {
  var object_pass = {
      "url": '/ml_designation/ml_designation/',
      "update_path": 'update_designation',
      "type": 'POST',
      "headers": {},
      "params": payload.payload.params,
      "body": payload.payload.pass_json,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_update_designation ({ commit,state }, payload) {
  var object_pass = {
      "url": `/ml_designation/ml_designation/${payload.payload.designation_guid}/`,
      "update_path": 'update_designation',
      "type": 'PATCH',
      "headers": {},
      "params": payload.payload.params,
      "body": payload.payload.pass_json,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_delete_designation ({ commit,state }, payload) {
  var object_pass = {
      "url": `/ml_designation/ml_designation/${payload.payload.designation_guid}/`,
      "update_path": 'update_designation',
      "type": 'DELETE',
      "headers": {},
      "params": payload.payload.params,
      "body": {},
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

// user department actions
export function trigger_get_user_department_list ({ commit,state }, payload) {
  var object_pass = {
      "url": '/user_department/user_department/',
      "update_path": 'update_user_department',
      "type": 'GET',
      "headers": {},
      "params": payload.payload.params,
      "body": {},
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_create_user_department ({ commit,state }, payload) {
  var object_pass = {
      "url": '/user_department/user_department/',
      "update_path": 'update_user_department',
      "type": 'POST',
      "headers": {},
      "params": payload.payload.params,
      "body": payload.payload.pass_json,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_delete_user_department ({ commit,state }, payload) {
  var object_pass = {
      "url": `/user_department/user_department/${payload.payload.user_department_guid}/`,
      "update_path": 'update_user_department',
      "type": 'DELETE',
      "headers": {},
      "params": payload.payload.params,
  };

  return payload.app.$actions({ commit,state }, object_pass);
}
