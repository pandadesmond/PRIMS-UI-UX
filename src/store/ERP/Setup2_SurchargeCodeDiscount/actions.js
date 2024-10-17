import axios from 'axios'

export function trigger_get_set_surcharge_discount_surcharge_discount_list ({ commit,state }, payload) {

  var object_pass = {
      "url": `set_surcharge_discount/surcharge_discount_list/`,  //api request url
      "update_path": 'update_set_surcharge_discount_surcharge_discount_list', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'POST', //type of api request
      "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
      "body": payload.payload.pass_json //field that used by api to create data
  };

  return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_get_specific_set_surcharge_discount_surcharge_discount_list ({ commit,state }, payload) {

console.log('payload', payload);

  var object_pass = {
      "url": `set_surcharge_discount/surcharge_discount_list/?surcharge_disc_guid=${payload.payload.surcharge_disc_guid}`,  //api request url
      "update_path": 'update_set_surcharge_discount_surcharge_discount_list', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'POST', //type of api request
      "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
      "body": payload.payload.pass_json //field that used by api to create data
  };

  console.log('object_pass', object_pass);

  return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_create_set_surcharge_discount_surcharge_discount_list ({ commit,state }, payload) {

    var object_pass = {
        "url": `set_surcharge_discount/create_surcharge_discount/`,  //api request url
        "update_path": 'update_set_surcharge_discount_surcharge_discount_list', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };

    console.log('object_pass', object_pass);

    return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_patch_set_surcharge_discount_surcharge_discount_list ({ commit,state }, payload) {

  var object_pass = {
      "url": `set_surcharge_discount/update_surcharge_discount/`,  //api request url
      "update_path": 'update_set_surcharge_discount_surcharge_discount_list', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'POST', //type of api request
      "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
      "body": payload.payload.pass_json //field that used by api to create data
  };

  console.log('object_pass', object_pass);

  return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_delete_set_surcharge_discount_surcharge_discount_list ({ commit,state }, payload) {

  var object_pass = {
      "url": `set_surcharge_discount/delete_surcharge_discount/`,  //api request url
      "update_path": 'update_set_surcharge_discount_surcharge_discount_list', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'POST', //type of api request
      "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
      "body": payload.payload.pass_json //field that used by api to create data
  };

  console.log('object_pass', object_pass);

  return payload.app.$actions({ commit,state }, object_pass);

}
