import axios from 'axios'

export function trigger_get_company_profile_read_company_profile ({ commit,state }, payload) {

  var object_pass = {
      "url": `company_profile/read_company_profile/`,  //api request url
      "update_path": 'update_company_profile_read_company_profile', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'POST', //type of api request
      "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
      "body": payload.payload.pass_json //field that used by api to create data
  };

  return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_patch_company_profile_update_company_profile({ commit,state }, payload) {

  var object_pass = {
      "url": `company_profile/update_company_profile/`,  //api request url
      "update_path": 'update_company_profile_update_company_profile', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'POST', //type of api request
      "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
      "body": payload.payload.pass_json //field that used by api to create data
  };

  return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_get_cp_set_branch({ commit,state }, payload) {

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

export function trigger_get_location_get_location_hq({ commit,state }, payload) {

  var object_pass = {
      "url": `location/get_location_hq/`,  //api request url
      "update_path": 'update_location_get_location_hq', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'POST', //type of api request
      "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
      "body": payload.payload.pass_json //field that used by api to create data
  };

  return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_create_location_get_location_hq({ commit,state }, payload) {

  var object_pass = {
      "url": `location/create_location_hq/`,  //api request url
      "update_path": 'update_location_get_location_hq', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'POST', //type of api request
      "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
      "body": payload.payload.pass_json //field that used by api to create data
  };

  return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_patch_location_get_location_hq({ commit,state }, payload) {

  var object_pass = {
      "url": `location/update_location_hq/`,  //api request url
      "update_path": 'update_location_get_location_hq', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'POST', //type of api request
      "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
      "body": payload.payload.pass_json //field that used by api to create data
  };

  return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_delete_location_get_location_hq({ commit,state }, payload) {

  var object_pass = {
      "url": `location/delete_location_hq/`,  //api request url
      "update_path": 'update_location_get_location_hq', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'POST', //type of api request
      "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
      "body": payload.payload.pass_json //field that used by api to create data
  };

  return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_get_location_read_location_list({ commit,state }, payload) {

  var object_pass = {
      "url": `location/read_location_list/`,  //api request url
      "update_path": 'update_location_read_location_list', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'POST', //type of api request
      "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
      "body": payload.payload.pass_json //field that used by api to create data
  };

  return payload.app.$actions({ commit,state }, object_pass);

}
