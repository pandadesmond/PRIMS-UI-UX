import axios from 'axios'

export function trigger_get_payterm_get_pay_term ({ commit,state }, payload) {

  var object_pass = {
      "url": `payterm/get_pay_term/`,  //api request url
      "update_path": 'update_payterm_get_pay_term', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'POST', //type of api request
      "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
      "body": payload.payload.pass_json //field that used by api to create data
  };

  return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_create_payterm_get_pay_term ({ commit,state }, payload) {

  var object_pass = {
      "url": `payterm/create_pay_term/`,  //api request url
      "update_path": 'update_payterm_get_pay_term', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'POST', //type of api request
      "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
      "body": payload.payload.pass_json //field that used by api to create data
  };

  return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_patch_payterm_get_pay_term ({ commit,state }, payload) {

  var object_pass = {
      "url": `payterm/update_pay_term/`,  //api request url
      "update_path": 'update_payterm_get_pay_term', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'POST', //type of api request
      "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
      "body": payload.payload.pass_json //field that used by api to create data
  };

  return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_delete_payterm_get_pay_term ({ commit,state }, payload) {

  var object_pass = {
      "url": `payterm/delete_pay_term/`,  //api request url
      "update_path": 'update_payterm_get_pay_term', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'POST', //type of api request
      "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
      "body": payload.payload.pass_json //field that used by api to create data
  };

  return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_get_payterm_get_pay_term_child ({ commit,state }, payload) {

  var object_pass = {
      "url": `payterm/get_pay_term_child/`,  //api request url
      "update_path": 'update_payterm_get_pay_term_child', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'POST', //type of api request
      "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
      "body": payload.payload.pass_json //field that used by api to create data
  };

  return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_create_payterm_get_pay_term_child ({ commit,state }, payload) {

  var object_pass = {
      "url": `payterm/create_pay_term_child/`,  //api request url
      "update_path": 'update_payterm_get_pay_term_child', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'POST', //type of api request
      "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
      "body": payload.payload.pass_json //field that used by api to create data
  };

  return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_patch_payterm_get_pay_term_child ({ commit,state }, payload) {

  var object_pass = {
      "url": `payterm/update_pay_term_child/`,  //api request url
      "update_path": 'update_payterm_get_pay_term_child', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'POST', //type of api request
      "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
      "body": payload.payload.pass_json //field that used by api to create data
  };

  return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_delete_payterm_get_pay_term_child ({ commit,state }, payload) {

  var object_pass = {
      "url": `payterm/delete_pay_term_child/`,  //api request url
      "update_path": 'update_payterm_get_pay_term_child', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'POST', //type of api request
      "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
      "body": payload.payload.pass_json //field that used by api to create data
  };

  return payload.app.$actions({ commit,state }, object_pass);

}
