import axios from 'axios'

export function trigger_get_gst_read_gst({ commit,state }, payload) {

  var object_pass = {
      "url": `gst/read_gst/`,  //api request url
      "update_path": 'update_gst_read_gst', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'POST', //type of api request
      "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
      "body": payload.payload.pass_json //field that used by api to create data
  };

  return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_create_gst_read_gst({ commit,state }, payload) {

  var object_pass = {
      "url": `gst/create_gst/`,  //api request url
      "update_path": 'update_gst_read_gst', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'POST', //type of api request
      "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
      "body": payload.payload.pass_json //field that used by api to create data
  };

  return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_patch_gst_read_gst({ commit,state }, payload) {

  var object_pass = {
      "url": `gst/update_gst/`,  //api request url
      "update_path": 'update_gst_read_gst', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'POST', //type of api request
      "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
      "body": payload.payload.pass_json //field that used by api to create data
  };

  return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_delete_gst_read_gst({ commit,state }, payload) {

  var object_pass = {
      "url": `gst/delete_gst/`,  //api request url
      "update_path": 'update_gst_read_gst', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'POST', //type of api request
      "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
      "body": payload.payload.pass_json //field that used by api to create data
  };

  return payload.app.$actions({ commit,state }, object_pass);

}
