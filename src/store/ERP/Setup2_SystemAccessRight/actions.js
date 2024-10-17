import axios from 'axios'

export function trigger_get_xgmain_get_xgmain ({ commit,state }, payload) {

  var object_pass = {
      "url": `xgmain/get_xgmain/`,  //api request url
      "update_path": 'update_xgmain_get_xgmain', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'POST', //type of api request
      "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
      "body": payload.payload.pass_json //field that used by api to create data
  };

  return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_create_xgmain_get_xgmain ({ commit,state }, payload) {

  var object_pass = {
      "url": `xgmain/create_xgmain/`,  //api request url
      "update_path": 'update_xgmain_get_xgmain', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'POST', //type of api request
      "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
      "body": payload.payload.pass_json //field that used by api to create data
  };

  return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_patch_xgmain_get_xgmain ({ commit,state }, payload) {

  var object_pass = {
      "url": `xgmain/update_xgmain/`,  //api request url
      "update_path": 'update_xgmain_get_xgmain', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'POST', //type of api request
      "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
      "body": payload.payload.pass_json //field that used by api to create data
  };

  return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_delete_xgmain_get_xgmain ({ commit,state }, payload) {

  var object_pass = {
      "url": `xgmain/delete_xgmain/`,  //api request url
      "update_path": 'update_xgmain_get_xgmain', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'POST', //type of api request
      "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
      "body": payload.payload.pass_json //field that used by api to create data
  };

  return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_get_xgmod_get_xgmod ({ commit,state }, payload) {

  var object_pass = {
      "url": `xgmod/get_xgmod/`,  //api request url
      "update_path": 'update_xgmod_get_xgmod', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'POST', //type of api request
      "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
      "body": payload.payload.pass_json //field that used by api to create data
  };

  return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_create_xgmod_get_xgmod ({ commit,state }, payload) {

  var object_pass = {
      "url": `xgmod/create_xgmod/`,  //api request url
      "update_path": 'update_xgmod_get_xgmod', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'POST', //type of api request
      "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
      "body": payload.payload.pass_json //field that used by api to create data
  };

  return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_patch_xgmod_get_xgmod ({ commit,state }, payload) {

  var object_pass = {
      "url": `xgmod/update_xgmod/`,  //api request url
      "update_path": 'update_xgmod_get_xgmod', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'POST', //type of api request
      "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
      "body": payload.payload.pass_json //field that used by api to create data
  };

  return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_delete_xgmod_get_xgmod ({ commit,state }, payload) {

  var object_pass = {
      "url": `xgmod/delete_xgmod/`,  //api request url
      "update_path": 'update_xgmod_get_xgmod', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'POST', //type of api request
      "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
      "body": payload.payload.pass_json //field that used by api to create data
  };

  return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_get_xgmodchild_get_xgmodchild ({ commit,state }, payload) {

  var object_pass = {
      "url": `xgmodchild/get_xgmodchild/`,  //api request url
      "update_path": 'update_xgmodchild_get_xgmodchild', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'POST', //type of api request
      "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
      "body": payload.payload.pass_json //field that used by api to create data
  };

  return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_create_xgmodchild_get_xgmodchild ({ commit,state }, payload) {

  var object_pass = {
      "url": `xgmodchild/create_xgmodchild/`,  //api request url
      "update_path": 'update_xgmodchild_get_xgmodchild', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'POST', //type of api request
      "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
      "body": payload.payload.pass_json //field that used by api to create data
  };

  return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_patch_xgmodchild_get_xgmodchild ({ commit,state }, payload) {

  var object_pass = {
      "url": `xgmodchild/update_xgmodchild/`,  //api request url
      "update_path": 'update_xgmodchild_get_xgmodchild', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'POST', //type of api request
      "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
      "body": payload.payload.pass_json //field that used by api to create data
  };

  return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_delete_xgmodchild_get_xgmodchild ({ commit,state }, payload) {

  var object_pass = {
      "url": `xgmodchild/delete_xgmodchild/`,  //api request url
      "update_path": 'update_xgmodchild_get_xgmodchild', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'POST', //type of api request
      "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
      "body": payload.payload.pass_json //field that used by api to create data
  };

  return payload.app.$actions({ commit,state }, object_pass);

}
