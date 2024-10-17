import axios from 'axios'

export function trigger_post_get_req_chg_category ({ commit,state }, payload) {

  var object_pass = {
      "url": 'req_chg_category/get_req_chg_category/',  //api request url
      "update_path": 'update_get_req_chg_category', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'POST', //type of api request
      "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
      "body": payload.payload.pass_json //field that used by api to create data
  };

  return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_post_read_item_type ({ commit,state }, payload) {

    var object_pass = {
        "url": 'set_item_type/read_item_type/',  //api request url
        "update_path": 'update_read_item_type', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
  
    return payload.app.$actions({ commit,state }, object_pass);
  
}


export function trigger_post_get_req_chg_category_c ({ commit,state }, payload) {

    var object_pass = {
        "url": 'req_chg_category/get_req_chg_category_c/',  //api request url
        "update_path": 'update_get_req_chg_category_c', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
  
    return payload.app.$actions({ commit,state }, object_pass);
  
}

export function trigger_post_read_item_all ({ commit,state }, payload) {

    var object_pass = {
        "url": 'itemmaster/read_item_all/',  //api request url
        "update_path": 'update_read_item_all', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
  
    return payload.app.$actions({ commit,state }, object_pass);
  
}