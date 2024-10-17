import axios from 'axios'

export function trigger_get_master_code_read_master_code ({ commit,state }, payload) {

  var object_pass = {
      "url": `master_code/read_master_code/`,  //api request url
      "update_path": 'update_master_code_read_master_code', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'POST', //type of api request
      "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
      "body": payload.payload.pass_json //field that used by api to create data
  };

  return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_get_master_code_read_master_code_by_trans_type ({ commit,state }, payload) {

  var object_pass = {
      "url": `master_code/read_master_code_by_trans_type/`,  //api request url
      "update_path": 'update_master_code_read_master_code_by_trans_type', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'POST', //type of api request
      "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
      "body": payload.payload.pass_json //field that used by api to create data
  };

  return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_create_master_code_read_master_code_by_trans_type ({ commit,state }, payload) {

  var object_pass = {
      "url": `master_code/create_master_code/`,  //api request url
      "update_path": 'update_master_code_read_master_code_by_trans_type', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'POST', //type of api request
      "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
      "body": payload.payload.pass_json //field that used by api to create data
  };

  return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_update_master_code_read_master_code_by_trans_type ({ commit,state }, payload) {

  var object_pass = {
      "url": `master_code/update_master_code/`,  //api request url
      "update_path": 'update_master_code_read_master_code_by_trans_type', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'POST', //type of api request
      "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
      "body": payload.payload.pass_json //field that used by api to create data
  };

  return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_delete_master_code_read_master_code_by_trans_type ({ commit,state }, payload) {

  var object_pass = {
      "url": `master_code/delete_master_code/`,  //api request url
      "update_path": 'update_master_code_read_master_code_by_trans_type', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'POST', //type of api request
      "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
      "body": payload.payload.pass_json //field that used by api to create data
  };

  return payload.app.$actions({ commit,state }, object_pass);

}

