import axios from 'axios'

// export function trigger_read_supcus_all ({ commit }, payload) {
//   return axios
//       .get('supcus/read_supcus_all', {
//               params: payload.params
//           }
//       )
//       .then((response) => {
//           var json_table_data = response.data;
//           Object.keys(json_table_data).forEach(function(index, data) {
//               json_table_data[index].actions = "";
//           });
//           var new_response = response;
//           new_response.data = json_table_data;
//           commit('update_read_supcus_all', new_response)
//         })
//         .catch((error) => {
//             console.log(error);
//         })
// }


export function trigger_read_supcus_all ({ commit }, payload) {

    if(payload.params)
    {
        var payload = {
            ...payload,
            ...payload.params
        };

        delete payload.params;
    }

    return axios
        .post('supcus/read_supcus_all/', payload)
        .then((response) => {

            var json_table_data = response.data;
            // Object.keys(json_table_data).forEach(function(index, data) {
            //     json_table_data[index].actions = "";
            // });
            var new_response = response;
            new_response.data = json_table_data;
            commit('update_read_supcus_all', new_response)
          })
          .catch((error) => {
              console.log(error);
          })
  }



// export function trigger_read_item_all ({ commit }, payload) {
//   return axios
//       .post('itemmaster/read_item_all/',  payload)
//       .then((response) => {
//           var json_table_data = response.data;
//           // Object.keys(json_table_data).forEach(function(index, data) {
//           //     json_table_data[index].actions = "";
//           // });
//           var new_response = response;
//           new_response.data = json_table_data;
//           commit('update_itemmaster', new_response)
//         })
//         .catch((error) => {
//             console.log(error);
//             var new_response = {};
//             new_response.status = "failed";
//             new_response.data = error.response.data;
//             commit('update_itemmaster', new_response)
//             console.log(' error.response.data', error.response.data);
//         })
// }

export function trigger_read_all_code ({ commit }, payload) {
  return axios
      .post('all_code/read_all_code/', payload)
      .then((response) => {
          var json = response.data;
          commit('update_read_all_code', json)
        })
        .catch((error) => {
            console.log(error);
        })
}


export function trigger_read_department ({ commit }, payload) {
  return axios
      .post('dept_heirarchy/read_department/', payload)
      .then((response) => {
          var json = response.data;
          commit('update_department', json)
        })
        .catch((error) => {
            console.log(error);
        })
}

export function trigger_read_subdept ({ commit }, payload) {
  return axios
      .post('dept_heirarchy/read_subdept/', payload)
      .then((response) => {
          var json = response.data;
          commit('update_sub_dept', json)
        })
        .catch((error) => {
            console.log(error);
        })
}

export function trigger_read_category ({ commit }, payload) {
  return axios
      .post('dept_heirarchy/read_category/', payload)
      .then((response) => {
          var json = response.data;
          commit('update_category', json)
        })
        .catch((error) => {
            console.log(error);
        })
}

// export function trigger_read_maufacturer ({ commit }, payload) {
//   return axios
//       .post('manufacturer/read_manufacturer/', payload)
//       .then((response) => {
//           var json = response.data;
//           commit('update_manufacturer', json)
//         })
//         .catch((error) => {
//             console.log(error);
//         })
// }
export function trigger_read_maufacturer ({ commit,state }, payload) {
    var object_pass = {
    "url": 'manufacturer/read_manufacturer/', //api request url
    "update_path": 'update_manufacturer', //function name use in store mutations.js to mutate state to store data in variable
    "type": 'POST', //type of api request
    "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
    "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
    "body": payload.payload.pass_json //field that used by api to create data
};
return payload.app.$actions({ commit,state }, object_pass);
}

// export function trigger_read_brand ({ commit }, payload) {
//   return axios
//       .post('manufacturer/read_brand/', payload)
//       .then((response) => {
//           var json = response.data;
//           commit('update_brand', json)
//         })
//         .catch((error) => {
//             console.log(error);
//         })
// }
export function trigger_read_brand ({ commit,state }, payload) {

    var object_pass = {
        "url": 'manufacturer/read_brand/', //api request url
        "update_path": 'update_brand', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}

// export function trigger_read_origin ({ commit }, payload) {
//   return axios
//       .get('origin/read_origin/', payload)
//       .then((response) => {
//           var json = response.data;
//           commit('update_origin', json)
//         })
//         .catch((error) => {
//             console.log(error);
//         })
// }


// export function trigger_read_origin ({ commit }, payload) {

//     if(payload.params)
//     {
//         var payload = {
//             ...payload,
//             ...payload.params
//         };

//         delete payload.params;
//     }

//     return axios
//         .post('origin/read_origin/', payload)
//         .then((response) => {
//             var json = response.data;
//             commit('update_origin', json)
//           })
//           .catch((error) => {
//               console.log(error);
//           })
//   }

export function trigger_read_origin ({ commit,state }, payload) {

    var object_pass = {
        "url": 'origin/read_origin/', //api request url
        "update_path": 'update_origin', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}


// export function trigger_read_item_color ({ commit }, payload) {
//   return axios
//       .post('set_item_color/read_item_color/', payload)
//       .then((response) => {
//           var json = response.data;
//           commit('update_item_color', json)
//         })
//         .catch((error) => {
//             console.log(error);
//         })
// }
export function trigger_read_item_color ({ commit,state }, payload) {

    var object_pass = {
        "url": 'set_item_color/read_item_color/', //api request url
        "update_path": 'update_item_color', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}

// export function trigger_read_item_size ({ commit }, payload) {
//   return axios
//       .post('set_item_size/read_item_size/', payload)
//       .then((response) => {
//           var json = response.data;
//           commit('update_item_size', json)
//         })
//         .catch((error) => {
//             console.log(error);
//         })
// }
export function trigger_read_item_size ({ commit,state }, payload) {

    var object_pass = {
        "url": 'set_item_size/read_item_size/', //api request url
        "update_path": 'update_item_size', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
// export function trigger_read_item_type ({ commit }, payload) {
//   return axios
//       .get('set_item_type/read_item_type/', payload)
//       .then((response) => {
//           var json = response.data;
//           commit('update_item_type', json)
//         })
//         .catch((error) => {
//             console.log(error);
//         })
// }

// export function trigger_read_item_type ({ commit }, payload) {

//     if(payload.params)
//     {
//         var payload = {
//             ...payload,
//             ...payload.params
//         };

//         delete payload.params;
//     }

//     return axios
//         .post('set_item_type/read_item_type/', payload)
//         .then((response) => {
//             var json = response.data;
//             commit('update_item_type', json)
//           })
//           .catch((error) => {
//               console.log(error);
//           })
//   }
export function trigger_read_item_type ({ commit,state }, payload) {

    var object_pass = {
        "url": 'set_item_type/read_item_type/', //api request url
        "update_path": 'update_item_type', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}


// export function trigger_read_master_code_by_trans_type ({ commit }, payload) {
//   return axios
//       .post('master_code/read_master_code_by_trans_type/', payload)
//       .then((response) => {
//           var json = response.data;
//           commit('update_read_master_code_by_trans_type', json)
//         })
//         .catch((error) => {
//             console.log(error);
//         })
// }
export function trigger_read_master_code_by_trans_type ({ commit,state }, payload) {

    var object_pass = {
        "url": 'master_code/read_master_code_by_trans_type/', //api request url
        "update_path": 'update_read_master_code_by_trans_type', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_create_item ({ commit,state }, payload) {
  return axios
      .post('itemmaster/create_item/', payload)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_item_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_item_status', json)
      })
}

export function trigger_update_item ({ commit,state }, payload) {
  return axios
      .post('/itemmaster/update_item/', payload)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_item_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_item_status', json)
      })
}


// export function trigger_read_item ({ commit,state }, payload) {
//   return axios
//       .get('itemmaster/read_item/?itemcode='+payload.itemcode)
//       .then((response) => {
//           var json = {};
//           json.status = "success";
//           json.response = response.data;
//           commit('update_read_item', json)
//       })
//       .catch((error) => {
//           var json = {};
//           json.status = "failed";
//           json.response = error.response.data;
//           commit('update_read_item', json)
//       })
// }


export function trigger_read_item ({ commit,state }, payload) {
    return axios
        .post('itemmaster/read_item/', payload)
        .then((response) => {
            var json = {};
            json.status = "success";
            json.response = response.data;
            commit('update_read_item', json)
        })
        .catch((error) => {
            var json = {};
            json.status = "failed";
            json.response = error.response.data;
            commit('update_read_item', json)
        })
  }

// export function trigger_read_barcode_by_itemcode ({ commit }, payload) {
//   return axios
//       .get('itemmaster/read_barcode_by_itemcode/', {
//               params: payload.params
//           }
//       )
//       .then((response) => {
//           var json_table_data = response.data;
//           Object.keys(json_table_data).forEach(function(index, data) {
//               json_table_data[index].actions = "";
//           });
//           var new_response = response;
//           new_response.data = json_table_data;
//           commit('update_read_barcode_by_itemcode', new_response)
//         })
//         .catch((error) => {
//             console.log(error);
//         })
// }


export function trigger_read_barcode_by_itemcode ({ commit }, payload) {

    if(payload.params)
    {
        var payload = {
            ...payload,
            ...payload.params
        };

        delete payload.params;
    }

    return axios
        .post('itemmaster/read_barcode_by_itemcode/', payload)
        .then((response) => {
            var json_table_data = response.data;
            Object.keys(json_table_data).forEach(function(index, data) {
                json_table_data[index].actions = "";
            });
            var new_response = response;
            new_response.data = json_table_data;
            commit('update_read_barcode_by_itemcode', new_response)
          })
          .catch((error) => {
              console.log(error);
          })
  }

// export function trigger_read_barcode_by_itemcode ({ commit,state }, payload) {
//   return axios
//       .get('itemmaster/read_barcode_by_itemcode/', payload)
//       .then((response) => {
//           var json = {};
//           json.status = "success";
//           json.response = response.data;
//           commit('update_read_barcode_by_itemcode', json)
//       })
//       .catch((error) => {
//           var json = {};
//           json.status = "failed";
//           json.response = error.response.data;
//           commit('update_read_barcode_by_itemcode', json)
//       })
// }

export function trigger_read_po_by_refno ({ commit,state }, payload) {
  return axios
      .post('/po/read_po_by_refno/', payload)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_read_po_by_refno', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_read_po_by_refno', json)
      })
}

// export function trigger_get_pochild ({ commit }, payload) {
//   return axios
//       .get('po/read_pochild/', {
//               params: payload.params
//           }
//       )
//       .then((response) => {
//           var json_table_data = response.data;
//           Object.keys(json_table_data).forEach(function(index, data) {
//               json_table_data[index].actions = "";
//           });
//           var new_response = response;
//           new_response.data = json_table_data;
//           commit('update_pochild', new_response)
//         })
//         .catch((error) => {
//             console.log(error);
//         })
// }


export function trigger_get_pochild ({ commit }, payload) {

    if(payload.params)
    {
        var payload = {
            ...payload,
            ...payload.params
        };

        delete payload.params;

        if(payload.refno)
        {
            payload.RefNo = payload.refno;
        }
    }

    return axios
        .post('po/read_pochild/', payload)
        .then((response) => {
            var json_table_data = response.data;
            Object.keys(json_table_data).forEach(function(index, data) {
                json_table_data[index].actions = "";
            });
            var new_response = response;
            new_response.data = json_table_data;
            commit('update_pochild', new_response)
          })
          .catch((error) => {
              console.log(error);
          })
  }

// export function trigger_create_barcode ({ commit,state }, payload) {
//   return axios
//       .post('itemmaster/create_barcode/', payload)
//       .then((response) => {
//           var json = {};
//           json.status = "success";
//           json.response = response.data;
//           commit('update_barcode_status', json)
//       })
//       .catch((error) => {
//           var json = {};
//           json.status = "failed";
//           json.response = error.response.data;
//           commit('update_barcode_status', json)
//       })
// }
export function trigger_create_barcode ({ commit,state }, payload) {

    var object_pass = {
        "url": 'itemmaster/create_barcode/', //api request url
        "update_path": 'update_barcode_status', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}

// export function trigger_update_barcode ({ commit,state }, payload) {
//   return axios
//       .post('itemmaster/update_barcode/', payload)
//       .then((response) => {
//           var json = {};
//           json.status = "success";
//           json.response = response.data;
//           commit('update_barcode_status', json)
//       })
//       .catch((error) => {
//           var json = {};
//           json.status = "failed";
//           json.response = error.response.data;
//           commit('update_barcode_status', json)
//       })
// }
export function trigger_update_barcode ({ commit,state }, payload) {

  // console.log(payload.app.$actions);

  var object_pass = {
      url: 'itemmaster/update_barcode/',
      update_path: 'update_barcode_status',
      type: 'POST',
      headers: {},
      params: {},
      body:  payload.payload.pass_json
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_delete_barcode ({ commit,state }, payload) {
  return axios
      .post('/itemmaster/delete_barcode/', payload)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_barcode_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_barcode_status', json)
      })
}

export function trigger_search_item_for_po ({ commit,state }, payload) {
  return axios
      .post('/itemmaster/search_item_for_po/' + '?skip=' + payload.params.skip + '&limit=' + payload.params.limit, payload)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_search_item_for_po', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_search_item_for_po', json)
      })
}

export function trigger_get_item_by_itemcode_for_po ({ commit,state }, payload) {
  return axios
      .post('/itemmaster/get_item_by_itemcode_for_po/', payload)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_get_item_by_itemcode_for_po', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_get_item_by_itemcode_for_po', json)
      })
}

export function trigger_read_tax ({ commit }, payload) {
  return axios
      .post('set_tax/read_tax/', payload)
      .then((response) => {
          var json = response.data;
          commit('update_read_tax', json)
        })
        .catch((error) => {
          console.log(error);
          json.status = "failed";
          json.response = error.response.data;
          commit('update_read_tax', json)
        })
}

export function trigger_read_gst ({ commit }, payload) {
  return axios
      .post('gst/read_gst/', payload)
      .then((response) => {
          var json = response.data;
          commit('update_read_gst', json)
        })
        .catch((error) => {
            console.log(error);
            json.status = "failed";
          json.response = error.response.data;
          commit('update_read_gst', json)
        })
}

export function trigger_post_itemmaster_itemmaster_branch_stock ({ commit,state }, payload) {

  // console.log(payload.app.$actions);

  var object_pass = {
      url: 'itemmaster/itemmaster_branch_stock/',
      update_path: 'update_itemmaster_itemmaster_branch_stock',
      type: 'POST',
      headers: {},
      params: {},
      body:  payload.payload.pass_json
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_post_itemmaster_itemmastersupcode ({ commit,state }, payload) {

  // console.log(payload.app.$actions);

  var object_pass = {
      url: 'itemmaster/read_itemmastersupcode_by_itemcode/',
      update_path: 'update_itemmaster_read_itemmastersupcode',
      type: 'POST',
      headers: {},
      params: {},
      body:  payload.payload.pass_json
  };

  return payload.app.$actions({ commit,state }, object_pass);
}


export function trigger_create_itemmastersupcode ({ commit,state }, payload) {

  // console.log(payload.app.$actions);

  var object_pass = {
      url: 'itemmaster/create_itemmastersupcode/',
      update_path: 'update_itemmastersupcode_status',
      type: 'POST',
      headers: {},
      params: {},
      body:  payload.payload.pass_json
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_update_itemmastersupcode ({ commit,state }, payload) {

  // console.log(payload.app.$actions);

  var object_pass = {
      url: 'itemmaster/update_itemmastersupcode/',
      update_path: 'update_itemmastersupcode_status',
      type: 'POST',
      headers: {},
      params: {},
      body:  payload.payload.pass_json
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_delete_itemmastersupcode ({ commit,state }, payload) {

  // console.log(payload.app.$actions);

  var object_pass = {
      url: 'itemmaster/delete_itemmastersupcode/',
      update_path: 'update_itemmastersupcode_status',
      type: 'POST',
      headers: {},
      params: {},
      body:  payload.payload.pass_json
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_post_create_item_new ({ commit,state }, payload) {
    var object_pass = {
    "url": 'itemmaster/create_item/', //api request url
    "update_path": 'update_create_item_new', //function name use in store mutations.js to mutate state to store data in variable
    "type": 'POST', //type of api request
    "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
    "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
    "body": payload.payload.pass_json //field that used by api to create data
};
return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_update_item_new ({ commit,state }, payload) {
    var object_pass = {
    "url": 'itemmaster/update_item/', //api request url
    "update_path": 'update_create_item_new', //function name use in store mutations.js to mutate state to store data in variable
    "type": 'POST', //type of api request
    "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
    "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
    "body": payload.payload.pass_json //field that used by api to create data
};
return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_read_barcode_by_itemcode_new ({ commit,state }, payload) {

    var object_pass = {
        "url": 'itemmaster/read_barcode_by_itemcode/', //api request url
        "update_path": 'update_read_barcode_by_itemcode_new', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_get_set_group_dept ({ commit,state }, payload) {
    // alert()
    var object_pass = {
        "url": 'set_group_dept/get_set_group_dept/', //api request url
        "update_path": 'update_get_set_group_dept', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_get_supcus_link ({ commit,state }, payload) {
    // alert()
    var object_pass = {
        "url": 'supcus/get_supcus_link/', //api request url
        "update_path": 'update_get_supcus_link', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_get_itemmaster_miscellaneous ({ commit,state }, payload) {

    var object_pass = {
        "url": 'itemmaster_miscellaneous/get_itemmaster_miscellaneous/', //api request url
        "update_path": 'update_get_itemmaster_miscellaneous', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_create_itemmaster_miscellaneous ({ commit,state }, payload) {

    var object_pass = {
        "url": 'itemmaster_miscellaneous/create_itemmaster_miscellaneous/', //api request url
        "update_path": 'update_get_itemmaster_miscellaneous', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_update_itemmaster_miscellaneous ({ commit,state }, payload) {

    var object_pass = {
        "url": 'itemmaster_miscellaneous/update_itemmaster_miscellaneous/', //api request url
        "update_path": 'update_get_itemmaster_miscellaneous', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_delete_itemmaster_miscellaneous ({ commit,state }, payload) {

    var object_pass = {
        "url": 'itemmaster_miscellaneous/delete_itemmaster_miscellaneous/', //api request url
        "update_path": 'update_get_itemmaster_miscellaneous', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_post_get_itemmaster_listed_branch ({ commit,state }, payload) {

    var object_pass = {
        "url": 'itemmaster_listed_branch/get_itemmaster_listed_branch/', //api request url
        "update_path": 'update_get_itemmaster_listed_branch', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_create_itemmaster_listed_branch ({ commit,state }, payload) {

    var object_pass = {
        "url": 'itemmaster_listed_branch/create_itemmaster_listed_branch/', //api request url
        "update_path": 'update_get_itemmaster_listed_branch', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_update_itemmaster_listed_branch ({ commit,state }, payload) {

    var object_pass = {
        "url": 'itemmaster_listed_branch/update_itemmaster_listed_branch/', //api request url
        "update_path": 'update_get_itemmaster_listed_branch', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_delete_itemmaster_listed_branch ({ commit,state }, payload) {

    var object_pass = {
        "url": 'itemmaster_listed_branch/delete_itemmaster_listed_branch/', //api request url
        "update_path": 'update_get_itemmaster_listed_branch', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_get_itemmaster_itemtype ({ commit,state }, payload) {

    var object_pass = {
        "url": 'itemmaster_itemtype/get_itemmaster_itemtype/', //api request url
        "update_path": 'update_get_itemmaster_itemtype', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_get_itemmaster_pricetype ({ commit,state }, payload) {

    var object_pass = {
        "url": 'itemmaster_pricetype/get_itemmaster_pricetype/', //api request url
        "update_path": 'update_get_itemmaster_pricetype', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_get_itemmaster_replenishment ({ commit,state }, payload) {

    var object_pass = {
        "url": 'itemmaster_replenishment/get_itemmaster_replenishment/', //api request url
        "update_path": 'update_get_itemmaster_replenishment', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_create_itemmaster_replenishment ({ commit,state }, payload) {

    var object_pass = {
        "url": 'itemmaster_replenishment/create_itemmaster_replenishment/', //api request url
        "update_path": 'update_get_itemmaster_replenishment', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_update_itemmaster_replenishment ({ commit,state }, payload) {

    var object_pass = {
        "url": 'itemmaster_replenishment/update_itemmaster_replenishment/', //api request url
        "update_path": 'update_get_itemmaster_replenishment', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_delete_itemmaster_replenishment ({ commit,state }, payload) {

    var object_pass = {
        "url": 'itemmaster_replenishment/delete_itemmaster_replenishment/', //api request url
        "update_path": 'update_get_itemmaster_replenishment', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_get_itemmaster_block_by_branch ({ commit,state }, payload) {

    var object_pass = {
        "url": 'itemmaster_block_by_branch/get_itemmaster_block_by_branch/', //api request url
        "update_path": 'update_get_itemmaster_block_by_branch', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_create_itemmaster_block_by_branch ({ commit,state }, payload) {

    var object_pass = {
        "url": 'itemmaster_block_by_branch/create_itemmaster_block_by_branch/', //api request url
        "update_path": 'update_get_itemmaster_block_by_branch', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_update_itemmaster_block_by_branch ({ commit,state }, payload) {

    var object_pass = {
        "url": 'itemmaster_block_by_branch/update_itemmaster_block_by_branch/', //api request url
        "update_path": 'update_get_itemmaster_block_by_branch', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_delete_itemmaster_block_by_branch ({ commit,state }, payload) {

    var object_pass = {
        "url": 'itemmaster_block_by_branch/delete_itemmaster_block_by_branch/', //api request url
        "update_path": 'update_get_itemmaster_block_by_branch', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_get_price_change_req ({ commit,state }, payload) {

    var object_pass = {
        "url": 'price_change/get_price_change_req/', //api request url
        "update_path": 'update_get_price_change_req', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_get_price_change_req2item ({ commit,state }, payload) {

    var object_pass = {
        "url": 'price_change/get_price_change_req2item/', //api request url
        "update_path": 'update_get_price_change_req2item', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_get_cost_price_change_item ({ commit,state }, payload) {

    var object_pass = {
        "url": 'cost_price_change_item/get_cost_price_change_item/', //api request url
        "update_path": 'update_get_cost_price_change_item', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_get_cost_price_change_item_vendor ({ commit,state }, payload) {

    var object_pass = {
        "url": 'cost_price_change_item_vendor/get_cost_price_change_item_vendor/', //api request url
        "update_path": 'update_get_cost_price_change_item_vendor', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_get_read_grchild ({ commit,state }, payload) {

    var object_pass = {
        "url": 'grn/read_grchild/', //api request url
        "update_path": 'update_read_grchild', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_get_read_gr ({ commit,state }, payload) {

    var object_pass = {
        "url": 'grn/read_gr/', //api request url
        "update_path": 'update_read_gr', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_create_gr ({ commit,state }, payload) {

    var object_pass = {
        "url": 'grn/create_gr/', //api request url
        "update_path": 'update_read_gr', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_update_gr ({ commit,state }, payload) {

    var object_pass = {
        "url": 'grn/update_gr/', //api request url
        "update_path": 'update_read_gr', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_delete_gr ({ commit,state }, payload) {

    var object_pass = {
        "url": 'grn/delete_gr/', //api request url
        "update_path": 'update_read_gr', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_post_get_itemmaster_discount ({ commit,state }, payload) {

    var object_pass = {
        "url": 'itemmaster_discount/get_itemmaster_discount/', //api request url
        "update_path": 'update_get_itemmaster_discount', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_create_itemmaster_discount ({ commit,state }, payload) {

    var object_pass = {
        "url": 'itemmaster_discount/create_itemmaster_discount/', //api request url
        "update_path": 'update_get_itemmaster_discount', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_update_itemmaster_discount ({ commit,state }, payload) {

    var object_pass = {
        "url": 'itemmaster_discount/update_itemmaster_discount/', //api request url
        "update_path": 'update_get_itemmaster_discount', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_delete_itemmaster_discount ({ commit,state }, payload) {

    var object_pass = {
        "url": 'itemmaster_discount/delete_itemmaster_discount/', //api request url
        "update_path": 'update_get_itemmaster_discount', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_post_get_itemmaster_price_break ({ commit,state }, payload) {

    var object_pass = {
        "url": 'itemmaster_price_break/get_itemmaster_price_break/', //api request url
        "update_path": 'update_get_itemmaster_price_break', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_get_itemmaster_price_break_c ({ commit,state }, payload) {

    var object_pass = {
        "url": 'itemmaster_price_break/get_itemmaster_price_break_c/', //api request url
        "update_path": 'update_get_itemmaster_price_break_c', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_create_itemmaster_price_break_c ({ commit,state }, payload) {

    var object_pass = {
        "url": 'itemmaster_price_break/create_itemmaster_price_break_c/', //api request url
        "update_path": 'update_get_itemmaster_price_break_c', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_update_itemmaster_price_break_c ({ commit,state }, payload) {

    var object_pass = {
        "url": 'itemmaster_price_break/update_itemmaster_price_break_c/', //api request url
        "update_path": 'update_get_itemmaster_price_break_c', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_delete_itemmaster_price_break_c ({ commit,state }, payload) {

    var object_pass = {
        "url": 'itemmaster_price_break/delete_itemmaster_price_break_c/', //api request url
        "update_path": 'update_get_itemmaster_price_break_c', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_post_cp_set_branch ({ commit,state }, payload) {

    var object_pass = {
        "url": 'cp_set_branch/cp_set_branch/', //api request url
        "update_path": 'update_cp_set_branch', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_read_master_code_transtype ({ commit,state }, payload) {

    var object_pass = {
        "url": 'master_code/read_master_code/', //api request url
        "update_path": 'update_read_master_code_transtype', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_read_item_all ({ commit,state }, payload) {

    var object_pass = {
        "url": 'itemmaster/read_item_all/', //api request url
        "update_path": 'update_read_item_all', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_read_item_all_new ({ commit,state }, payload) {
    if (!payload.params) {
        payload.params = {}; // Initialize params if undefined
    }

    if (typeof payload.params.offset === 'undefined') {
        payload.params.offset = 0; // Provide a default value for offset
    }
    var object_pass = {
        "url": 'itemmaster/read_item_all/?skip=?' + payload.params.offset + '&limit=' + payload.params.limit,  //api request url
        "update_path": 'update_read_item_all', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };

    return payload.app.$actions({ commit,state }, object_pass);

}
export function trigger_read_item_all ({ commit }, payload) {
    if (!payload.params) {
        payload.params = {}; // Initialize params if undefined
    }

    if (typeof payload.params.offset === 'undefined') {
        payload.params.offset = 0; // Provide a default value for offset
    }
    console.log('payload',payload)
  return axios
      .post('itemmaster/read_item_all/'+ '?skip=' + payload.offset + '&limit=' + payload.limit,  payload)
      .then((response) => {
          var json_table_data = response.data;
          // Object.keys(json_table_data).forEach(function(index, data) {
          //     json_table_data[index].actions = "";
          // });
          var new_response = response;
          new_response.data = json_table_data;
          commit('update_itemmaster', new_response)
        })
        .catch((error) => {
            console.log(error);
            var new_response = {};
            new_response.status = "failed";
            new_response.data = error.response.data;
            commit('update_itemmaster', new_response)
            console.log(' error.response.data', error.response.data);
        })
}

export function trigger_post_get_req_chg_category ({ commit,state }, payload) {

    var object_pass = {
        "url": 'req_chg_category/get_req_chg_category/', //api request url
        "update_path": 'update_get_req_chg_category', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_create_req_chg_category ({ commit,state }, payload) {

    var object_pass = {
        "url": 'req_chg_category/create_req_chg_category/', //api request url
        "update_path": 'update_get_req_chg_category', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_update_req_chg_category ({ commit,state }, payload) {

    var object_pass = {
        "url": 'req_chg_category/update_req_chg_category/', //api request url
        "update_path": 'update_get_req_chg_category', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_delete_req_chg_category ({ commit,state }, payload) {

    var object_pass = {
        "url": 'req_chg_category/delete_req_chg_category/', //api request url
        "update_path": 'update_get_req_chg_category', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_get_req_chg_category_c ({ commit,state }, payload) {

    var object_pass = {
        "url": 'req_chg_category/get_req_chg_category_c/', //api request url
        "update_path": 'update_get_req_chg_category_c', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_post_create_req_chg_category_c ({ commit,state }, payload) {

    var object_pass = {
        "url": 'req_chg_category/create_req_chg_category_c/', //api request url
        "update_path": 'update_get_req_chg_category_c', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_update_req_chg_category_c ({ commit,state }, payload) {

    var object_pass = {
        "url": 'req_chg_category/update_req_chg_category_c/', //api request url
        "update_path": 'update_get_req_chg_category_c', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_delete_req_chg_category_c ({ commit,state }, payload) {

    var object_pass = {
        "url": 'req_chg_category/delete_req_chg_category_c/', //api request url
        "update_path": 'update_get_req_chg_category_c', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_post_get_itemmaster_branch_stock ({ commit,state }, payload) {

    var object_pass = {
        "url": 'itemmaster/get_itemmaster_branch_stock/', //api request url
        "update_path": 'update_get_itemmaster_branch_stock', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_create_itemmaster_branch_stock ({ commit,state }, payload) {

    var object_pass = {
        "url": 'itemmaster/create_itemmaster_branch_stock/', //api request url
        "update_path": 'update_get_itemmaster_branch_stock', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_update_itemmaster_branch_stock ({ commit,state }, payload) {

    var object_pass = {
        "url": 'itemmaster/update_itemmaster_branch_stock/', //api request url
        "update_path": 'update_get_itemmaster_branch_stock', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_delete_itemmaster_branch_stock ({ commit,state }, payload) {

    var object_pass = {
        "url": 'itemmaster/delete_itemmaster_branch_stock/', //api request url
        "update_path": 'update_get_itemmaster_branch_stock', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_get_get_simain ({ commit,state }, payload) {

    var object_pass = {
        "url": 'simain/get_simain/', //api request url
        "update_path": 'update_get_simain', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_create_simain ({ commit,state }, payload) {

    var object_pass = {
        "url": 'simain/create_simain/', //api request url
        "update_path": 'update_get_simain', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_update_simain ({ commit,state }, payload) {

    var object_pass = {
        "url": 'simain/update_simain/', //api request url
        "update_path": 'update_get_simain', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_delete_simain ({ commit,state }, payload) {

    var object_pass = {
        "url": 'simain/delete_simain/', //api request url
        "update_path": 'update_get_simain', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_post_get_get_sichild ({ commit,state }, payload) {

  var object_pass = {
      "url": 'simain/get_sichild/', //api request url
      "update_path": 'update_get_sichild', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'POST', //type of api request
      "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
      "body": payload.payload.pass_json //field that used by api to create data
  };
  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_post_get_supcus_dropdown ({ commit,state }, payload) {

    var object_pass = {
        "url": 'supcus/supcus_dropdown/', //api request url
        "update_path": 'update_supcus_dropdown', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_get_purchase_promo ({ commit,state }, payload) {

    var object_pass = {
        "url": 'purchase_promo/get_purchase_promo/', //api request url
        "update_path": 'update_get_purchase_promo', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_get_purchase_promo_c ({ commit,state }, payload) {

    var object_pass = {
        "url": 'purchase_promo/get_purchase_promo_c/', //api request url
        "update_path": 'update_get_purchase_promo_c', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_excel_download_itemmaster ({ commit,state }, payload) {

  var object_pass = {
      "url": 'itemmaster/excel_download_itemmaster/', //api request url
      "update_path": 'update_excel_download_itemmaster', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'POST', //type of api request
      "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
      "body": payload.payload.pass_json //field that used by api to create data
  };
  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_post_excel_upload_itemmaster ({ commit,state }, payload) {
  console.log(payload)
  var object_pass = {
      "url": 'itemmaster/excel_upload_itemmaster/', //api request url
      "update_path": 'update_excel_upload_itemmaster', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'POST', //type of api request
      "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
      "body": payload.payload.pass_json //field that used by api to create data
  };
  return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_get_posmain ({ commit,state }, payload) {

    var object_pass = {
        "url": 'posmain/get_posmain/', //api request url
        "update_path": 'update_get_posmain', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_create_posmain ({ commit,state }, payload) {

    var object_pass = {
        "url": 'posmain/create_posmain/', //api request url
        "update_path": 'update_get_posmain', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_update_posmain ({ commit,state }, payload) {

    var object_pass = {
        "url": 'posmain/update_posmain/', //api request url
        "update_path": 'update_get_posmain', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_delete_posmain ({ commit,state }, payload) {

    var object_pass = {
        "url": 'posmain/delete_posmain/', //api request url
        "update_path": 'update_get_posmain', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_get_promo_supplier ({ commit,state }, payload) {

    var object_pass = {
        "url": 'promo/get_promo_supplier/', //api request url
        "update_path": 'update_get_promo_supplier', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_create_promo_supplier ({ commit,state }, payload) {

    var object_pass = {
        "url": 'promo/create_promo_supplier/', //api request url
        "update_path": 'update_get_promo_supplier', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_update_promo_supplier ({ commit,state }, payload) {

    var object_pass = {
        "url": 'promo/update_promo_supplier/', //api request url
        "update_path": 'update_get_promo_supplier', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_delete_promo_supplier ({ commit,state }, payload) {

    var object_pass = {
        "url": 'promo/delete_promo_supplier/', //api request url
        "update_path": 'update_get_promo_supplier', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_get_locationstock_period ({ commit,state }, payload) {

    var object_pass = {
        "url": 'locationstock/get_locationstock_period/', //api request url
        "update_path": 'update_get_locationstock_period', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_create_locationstock_period ({ commit,state }, payload) {

    var object_pass = {
        "url": 'locationstock/create_locationstock_period/', //api request url
        "update_path": 'update_get_locationstock_period', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_update_locationstock_period ({ commit,state }, payload) {

    var object_pass = {
        "url": 'locationstock/update_locationstock_period/', //api request url
        "update_path": 'update_get_locationstock_period', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_delete_locationstock_period ({ commit,state }, payload) {

    var object_pass = {
        "url": 'locationstock/delete_locationstock_period/', //api request url
        "update_path": 'update_get_locationstock_period', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_get_set_assorted_item ({ commit,state }, payload) {

    var object_pass = {
        "url": 'set_assorted_item/get_set_assorted_item/', //api request url
        "update_path": 'update_set_assorted_item', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_create_set_assorted_item ({ commit,state }, payload) {

    var object_pass = {
        "url": 'set_assorted_item/create_set_assorted_item/', //api request url
        "update_path": 'update_set_assorted_item', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_update_set_assorted_item ({ commit,state }, payload) {

    var object_pass = {
        "url": 'set_assorted_item/update_set_assorted_item/', //api request url
        "update_path": 'update_set_assorted_item', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_delete_set_assorted_item ({ commit,state }, payload) {

    var object_pass = {
        "url": 'set_assorted_item/delete_set_assorted_item/', //api request url
        "update_path": 'update_set_assorted_item', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_get_set_assorted_item_c ({ commit,state }, payload) {

    var object_pass = {
        "url": 'set_assorted_item/get_set_assorted_item_c/', //api request url
        "update_path": 'update_set_assorted_item_c', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_create_set_assorted_item_c ({ commit,state }, payload) {

    var object_pass = {
        "url": 'set_assorted_item/create_set_assorted_item_c/', //api request url
        "update_path": 'update_set_assorted_item_c', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_update_set_assorted_item_c ({ commit,state }, payload) {

    var object_pass = {
        "url": 'set_assorted_item/update_set_assorted_item_c/', //api request url
        "update_path": 'update_set_assorted_item_c', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_delete_set_assorted_item_c ({ commit,state }, payload) {

    var object_pass = {
        "url": 'set_assorted_item/delete_set_assorted_item_c/', //api request url
        "update_path": 'update_set_assorted_item_c', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_get_price_change_req1loc ({ commit,state }, payload) {

    var object_pass = {
        "url": 'price_change/get_price_change_req1loc/', //api request url
        "update_path": 'update_get_price_change_req1loc', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_create_price_change_req1loc ({ commit,state }, payload) {

    var object_pass = {
        "url": 'price_change/create_price_change_req1loc/', //api request url
        "update_path": 'update_get_price_change_req1loc', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_update_price_change_req1loc ({ commit,state }, payload) {

    var object_pass = {
        "url": 'price_change/update_price_change_req1loc/', //api request url
        "update_path": 'update_get_price_change_req1loc', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_delete_price_change_req1loc ({ commit,state }, payload) {

    var object_pass = {
        "url": 'price_change/delete_price_change_req1loc/', //api request url
        "update_path": 'update_get_price_change_req1loc', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
// export function trigger_post_read_po ({ commit,state }, payload) {

//     var object_pass = {
//         "url": 'po/read_po/', //api request url
//         "update_path": 'update_read_po', //function name use in store mutations.js to mutate state to store data in variable
//         "type": 'POST', //type of api request
//         "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
//         "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
//         "body": payload.payload.pass_json //field that used by api to create data
//     };
//     return payload.app.$actions({ commit,state }, object_pass);
// }
export function trigger_post_get_po_by_itemcode ({ commit,state }, payload) {

    var object_pass = {
        "url": 'po/get_po_by_itemcode/', //api request url
        "update_path": 'update_get_po_by_itemcode', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_read_pochild ({ commit,state }, payload) {

    var object_pass = {
        "url": 'po/read_pochild/', //api request url
        "update_path": 'update_read_po', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_get_itemmaster_othersinfo ({ commit,state }, payload) {

    var object_pass = {
        "url": 'itemmaster_othersinfo/get_itemmaster_othersinfo/', //api request url
        "update_path": 'update_get_itemmaster_othersinfo', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_create_itemmaster_othersinfo ({ commit,state }, payload) {

  var object_pass = {
      "url": 'itemmaster_othersinfo/create_itemmaster_othersinfo', //api request url
      "update_path": 'update_get_itemmaster_othersinfo_status', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'POST', //type of api request
      "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
      "body": payload.payload.pass_json //field that used by api to create data
  };
  return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_update_itemmaster_othersinfo ({ commit,state }, payload) {

    var object_pass = {
        "url": 'itemmaster_othersinfo/update_itemmaster_othersinfo', //api request url
        "update_path": 'update_get_itemmaster_othersinfo_status', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_table_total_row ({ commit,state }, payload) {

    var object_pass = {
        "url": 'custom_api/table_total_row/', //api request url
        "update_path": 'update_table_total_row', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_get_locationstock_groupby_location ({ commit,state }, payload) {

    var object_pass = {
        "url": 'locationstock/get_locationstock_groupby_location/', //api request url
        "update_path": 'update_get_locationstock_groupby_location', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_get_locationstock_groupby_location_group ({ commit,state }, payload) {

    var object_pass = {
        "url": 'locationstock/get_locationstock_groupby_location_group/', //api request url
        "update_path": 'update_get_locationstock_groupby_location_group', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}
export function trigger_post_get_promo_supplier_c ({ commit,state }, payload) {

    var object_pass = {
        "url": 'promo/get_promo_supplier_c/', //api request url
        "update_path": 'update_get_promo_supplier_c', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_post_get_custom_dropdown_all ({ commit,state }, payload) {

    var object_pass = {
        "url": 'itemmaster/get_custom_dropdown_all/', //api request url
        "update_path": 'update_get_custom_dropdown_all', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_get_get_photo ({ commit,state }, payload) {

  var object_pass = {
      "url": 'itemmaster/get_photo/{filename}', //api request url
      "update_path": 'update_get_photo', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'GET', //type of api request
      "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params, //params will auto convert as url request on url in ?parameter=first&parameter_second=second
      "body": null //field that used by api but GET methods doesn't have body
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_post_upload_photo ({ commit,state }, payload) {

  var object_pass = {
      "url": 'itemmaster/upload_photo/', //api request url
      "update_path": 'update_upload_photo_status', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'POST', //type of api request
      "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
      "body": payload.payload.pass_json //field that used by api to create data
  };
  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_post_get_poschild ({ commit,state }, payload) {

    var object_pass = {
        "url": 'poschild/get_poschild/', //api request url
        "update_path": 'update_get_poschild', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {}, // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params, //params will auto convert as url request on url in?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };
    return payload.app.$actions({ commit,state }, object_pass);
  }
