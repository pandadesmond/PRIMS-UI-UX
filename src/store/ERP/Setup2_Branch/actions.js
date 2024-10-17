import axios from 'axios'

export function trigger_get_cp_set_branch ({ commit,state }, payload) {

  var object_pass = {
      "url": `cp_set_branch/cp_set_branch/`,  //api request url
      "update_path": 'update_cp_set_branch', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'POST', //type of api request
      "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
      "body": payload.payload.pass_json //field that used by api to create data
  };

  return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_create_cp_set_branch ({ commit,state }, payload) {

  var object_pass = {
      "url": `cp_set_branch/create_cp_set_branch/`,  //api request url
      "update_path": 'update_cp_set_branch', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'POST', //type of api request
      "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
      "body": payload.payload.pass_json //field that used by api to create data
  };

  return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_patch_cp_set_branch ({ commit,state }, payload) {

  var object_pass = {
      "url": `cp_set_branch/update_cp_set_branch/`,  //api request url
      "update_path": 'update_cp_set_branch', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'POST', //type of api request
      "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
      "body": payload.payload.pass_json //field that used by api to create data
  };

  return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_delete_cp_set_branch ({ commit,state }, payload) {

  var object_pass = {
      "url": `cp_set_branch/delete_cp_set_branch/`,  //api request url
      "update_path": 'update_cp_set_branch', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'POST', //type of api request
      "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
      "body": payload.payload.pass_json //field that used by api to create data
  };

  return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_get_supcus_read_supcus_all ({ commit,state }, payload) {

  var object_pass = {
      "url": `supcus/supcus_dropdown/`,  //api request url
      "update_path": 'update_supcus_read_supcus_all', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'POST', //type of api request
      "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
      "body": payload.payload.pass_json //field that used by api to create data
  };

  return payload.app.$actions({ commit,state }, object_pass);

}
