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
