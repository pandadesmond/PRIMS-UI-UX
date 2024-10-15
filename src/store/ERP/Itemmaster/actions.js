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
        .post('supcus/read_supcus_all', payload)
        .then((response) => {
            var json_table_data = response.data;
            Object.keys(json_table_data).forEach(function(index, data) {
                json_table_data[index].actions = "";
            });
            var new_response = response;
            new_response.data = json_table_data;
            commit('update_read_supcus_all', new_response)
          })
          .catch((error) => {
              console.log(error);
          })
  }



export function trigger_read_item_all ({ commit }, payload) {
  return axios
      .post('itemmaster/read_item_all/',  payload)
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

export function trigger_read_maufacturer ({ commit }, payload) {
  return axios
      .post('manufacturer/read_manufacturer/', payload)
      .then((response) => {
          var json = response.data;
          commit('update_manufacturer', json)
        })
        .catch((error) => {
            console.log(error);
        })
}

export function trigger_read_brand ({ commit }, payload) {
  return axios
      .post('manufacturer/read_brand/', payload)
      .then((response) => {
          var json = response.data;
          commit('update_brand', json)
        })
        .catch((error) => {
            console.log(error);
        })
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


export function trigger_read_origin ({ commit }, payload) {

    if(payload.params)
    {
        var payload = {
            ...payload,
            ...payload.params
        };

        delete payload.params;
    }

    return axios
        .post('origin/read_origin/', payload)
        .then((response) => {
            var json = response.data;
            commit('update_origin', json)
          })
          .catch((error) => {
              console.log(error);
          })
  }


export function trigger_read_item_color ({ commit }, payload) {
  return axios
      .post('set_item_color/read_item_color/', payload)
      .then((response) => {
          var json = response.data;
          commit('update_item_color', json)
        })
        .catch((error) => {
            console.log(error);
        })
}

export function trigger_read_item_size ({ commit }, payload) {
  return axios
      .post('set_item_size/read_item_size/', payload)
      .then((response) => {
          var json = response.data;
          commit('update_item_size', json)
        })
        .catch((error) => {
            console.log(error);
        })
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

export function trigger_read_item_type ({ commit }, payload) {

    if(payload.params)
    {
        var payload = {
            ...payload,
            ...payload.params
        };

        delete payload.params;
    }

    return axios
        .post('set_item_type/read_item_type/', payload)
        .then((response) => {
            var json = response.data;
            commit('update_item_type', json)
          })
          .catch((error) => {
              console.log(error);
          })
  }


export function trigger_read_master_code_by_trans_type ({ commit }, payload) {
  return axios
      .post('master_code/read_master_code_by_trans_type/', payload)
      .then((response) => {
          var json = response.data;
          commit('update_read_master_code_by_trans_type', json)
        })
        .catch((error) => {
            console.log(error);
        })
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

export function trigger_create_barcode ({ commit,state }, payload) {
  return axios
      .post('itemmaster/create_barcode/', payload)
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
