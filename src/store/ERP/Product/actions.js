import axios from 'axios'

export function trigger_post_get_price_change_req1loc ({ commit,state }, payload) {

  var object_pass = {
      "url": 'price_change/get_price_change_req1loc/',  //api request url
      "update_path": 'update_price_change_req1loc', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'POST', //type of api request
      "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
      "body": payload.payload.pass_json //field that used by api to create data
  };

  return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_post_create_price_change_req1loc ({ commit,state }, payload) {

  var object_pass = {
      "url": 'price_change/create_price_change_req1loc/',  //api request url
      "update_path": 'update_price_change_req1loc_status', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'POST', //type of api request
      "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
      "body": payload.payload.pass_json //field that used by api to create data
  };

  return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_post_update_price_change_req1loc ({ commit,state }, payload) {

  var object_pass = {
      "url": 'price_change/update_price_change_req1loc/',  //api request url
      "update_path": 'update_price_change_req1loc_status', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'POST', //type of api request
      "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
      "body": payload.payload.pass_json //field that used by api to create data
  };

  return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_post_create_price_change_req2item ({ commit,state }, payload) {

  var object_pass = {
      "url": 'price_change/create_price_change_req2item/',  //api request url
      "update_path": 'update_price_change_req2item_status', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'POST', //type of api request
      "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
      "body": payload.payload.pass_json //field that used by api to create data
  };

  return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_post_update_price_change_req2item ({ commit,state }, payload) {

  var object_pass = {
      "url": 'price_change/update_price_change_req2item/',  //api request url
      "update_path": 'update_price_change_req2item_status', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'POST', //type of api request
      "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
      "body": payload.payload.pass_json //field that used by api to create data
  };

  return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_post_get_cost_price_change ({ commit,state }, payload) {

  var object_pass = {
      "url": 'cost_price_change/get_cost_price_change/',  //api request url
      "update_path": 'update_cost_price_change', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'POST', //type of api request
      "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
      "body": payload.payload.pass_json //field that used by api to create data
  };

  return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_post_get_cost_price_change_item ({ commit,state }, payload) {

  var object_pass = {
      "url": 'cost_price_change_item/get_cost_price_change_item/',  //api request url
      "update_path": 'update_cost_price_change_item', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'POST', //type of api request
      "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
      "body": payload.payload.pass_json //field that used by api to create data
  };

  return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_post_create_cost_price_change_item ({ commit,state }, payload) {

  var object_pass = {
      "url": 'cost_price_change_item/create_cost_price_change_item/',  //api request url
      "update_path": 'update_cost_price_change_item_status', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'POST', //type of api request
      "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
      "body": payload.payload.pass_json //field that used by api to create data
  };

  return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_post_update_cost_price_change_item ({ commit,state }, payload) {

  var object_pass = {
      "url": 'cost_price_change_item/update_cost_price_change_item/',  //api request url
      "update_path": 'update_cost_price_change_item_status', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'POST', //type of api request
      "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
      "body": payload.payload.pass_json //field that used by api to create data
  };

  return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_get_supcus_dropdown ({ commit,state }, payload) {

  var object_pass = {
      "url": 'supcus/supcus_dropdown/',  //api request url
      "update_path": 'update_supcus_dropdown', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'POST', //type of api request
      "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
      "body": payload.payload.pass_json //field that used by api to create data
  };

  return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_post_create_cost_price_change ({ commit,state }, payload) {

  var object_pass = {
      "url": 'cost_price_change/create_cost_price_change/',  //api request url
      "update_path": 'update_cost_price_change_status', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'POST', //type of api request
      "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
      "body": payload.payload.pass_json //field that used by api to create data
  };

  return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_post_update_cost_price_change ({ commit,state }, payload) {

  var object_pass = {
      "url": 'cost_price_change/update_cost_price_change/',  //api request url
      "update_path": 'update_cost_price_change_status', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'POST', //type of api request
      "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
      "body": payload.payload.pass_json //field that used by api to create data
  };

  return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_post_get_price_change_req3bar ({ commit,state }, payload) {

  var object_pass = {
      "url": 'price_change/get_price_change_req3bar/',  //api request url
      "update_path": 'update_price_change_req3bar', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'POST', //type of api request
      "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
      "body": payload.payload.pass_json //field that used by api to create data
  };

  return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_post_create_price_change_req3bar ({ commit,state }, payload) {

  var object_pass = {
      "url": 'price_change/create_price_change_req3bar/',  //api request url
      "update_path": 'update_price_change_req3bar_status', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'POST', //type of api request
      "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
      "body": payload.payload.pass_json //field that used by api to create data
  };

  return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_post_update_price_change_req3bar ({ commit,state }, payload) {

  var object_pass = {
      "url": 'price_change/update_price_change_req3bar/',  //api request url
      "update_path": 'update_price_change_req3bar_status', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'POST', //type of api request
      "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
      "body": payload.payload.pass_json //field that used by api to create data
  };

  return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_post_get_price_change_req4disc ({ commit,state }, payload) {

  var object_pass = {
      "url": 'price_change/get_price_change_req4disc/',  //api request url
      "update_path": 'update_price_change_req4disc', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'POST', //type of api request
      "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
      "body": payload.payload.pass_json //field that used by api to create data
  };

  return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_post_create_price_change_req4disc ({ commit,state }, payload) {

  var object_pass = {
      "url": 'price_change/create_price_change_req4disc/',  //api request url
      "update_path": 'update_price_change_req4disc_status', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'POST', //type of api request
      "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
      "body": payload.payload.pass_json //field that used by api to create data
  };

  return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_post_update_price_change_req4disc ({ commit,state }, payload) {

  var object_pass = {
      "url": 'price_change/update_price_change_req4disc/',  //api request url
      "update_path": 'update_price_change_req4disc_status', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'POST', //type of api request
      "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
      "body": payload.payload.pass_json //field that used by api to create data
  };

  return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_post_get_itemmaster_for_price_change ({ commit,state }, payload) {

  var object_pass = {
      "url": 'itemmaster/get_itemmaster_for_price_change/',  //api request url
      "update_path": 'update_itemmaster_for_price_change', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'POST', //type of api request
      "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
      "body": payload.payload.pass_json //field that used by api to create data
  };

  return payload.app.$actions({ commit,state }, object_pass);

}
