import axios from 'axios'

export function trigger_post_get_ibt_consolidate ({ commit,state }, payload) {

  var object_pass = {
    "url": 'ibt_consolidate/get_ibt_consolidate/',  //api request url
    "update_path": 'update_ibt_consolidate', //function name use in store mutations.js to mutate state to store data in variable
    "type": 'POST', //type of api request
    "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
    "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
    "body": payload.payload.pass_json //field that used by api to create data
  };

  return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_post_get_supcus_dropdown ({ commit,state }, payload) {

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
  
export function trigger_post_get_location ({ commit,state }, payload) {

    var object_pass = {
        "url": 'location/get_location/',  //api request url
        "update_path": 'update_get_location', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };

    return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_post_get_locationgroup ({ commit,state }, payload) {

    var object_pass = {
        "url": 'location/get_locationgroup/',  //api request url
        "update_path": 'update_get_locationgroup', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };

    return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_post_update_ibt_consolidate ({ commit,state }, payload) {

    var object_pass = {
        "url": 'ibt_consolidate/update_ibt_consolidate/',  //api request url
        "update_path": 'update_update_ibt_consolidate', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };

    return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_post_get_ibt_consolidate_c ({ commit,state }, payload) {

    var object_pass = {
        "url": 'ibt_consolidate/get_ibt_consolidate_c/',  //api request url
        "update_path": 'update_get_ibt_consolidate_c', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };

    return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_post_get_dc_req_child ({ commit,state }, payload) {

    var object_pass = {
        "url": 'dc_req/get_dc_req_child/',  //api request url
        "update_path": 'update_get_dc_req_child', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };

    return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_post_bulk_create_ibt_consolidate_c ({ commit,state }, payload) {

    var object_pass = {
        "url": 'ibt_consolidate/bulk_create_ibt_consolidate_c/',  //api request url
        "update_path": 'update_bulk_create_ibt_consolidate_c', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };

    return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_post_create_ibt_consolidate ({ commit,state }, payload) {

    var object_pass = {
        "url": 'ibt_consolidate/create_ibt_consolidate/',  //api request url
        "update_path": 'update_create_ibt_consolidate', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };

    return payload.app.$actions({ commit,state }, object_pass);

}