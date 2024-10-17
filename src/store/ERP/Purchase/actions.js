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
            // Object.keys(json_table_data).forEach(function(index, data) {
            //     json_table_data[index].actions = "";
            // });
            var new_response = response;
            new_response.data = json_table_data;
            commit('update_read_supcus_all', new_response)
          })
          .catch((error) => {
              console.log(error);
              var new_response = [];
              commit('update_read_supcus_all', new_response)
          })
  }

export function trigger_get_pomain ({ commit }, payload) {
  return axios
      .post('po/read_po/',  payload)
      .then((response) => {
          var json_table_data = response.data;
          // Object.keys(json_table_data).forEach(function(index, data) {
          //     json_table_data[index].actions = "";
          // });
          var new_response = response;
          new_response.data = json_table_data;
          commit('update_pomain', new_response)
        })
        .catch((error) => {
            console.log(error);
            var new_response = [];
            commit('update_pomain', new_response)
        })
}

// export function trigger_create_pomain ({ commit,state }, payload) {
//   return axios
//       .post('/po/create_po/', payload)
//       .then((response) => {
//           var json = {};
//           json.status = "success";
//           json.response = response.data;
//           commit('update_pomain_status', json)
//       })
//       .catch((error) => {
//           var json = {};
//           json.status = "failed";
//           json.response = error.response.data;
//           commit('update_pomain_status', json)
//       })
// }

export function trigger_create_pomain ({ commit,state }, payload) {
  var object_pass = {
      "url": '/po/create_po/',
      "update_path": 'update_pomain_status',
      "type": 'POST',
      "headers": {},
      "params": payload.payload.params,
      "body": payload.payload.pass_json
  };

  return payload.app.$actions({ commit,state }, object_pass);

}

// export function trigger_update_pomain ({ commit,state }, payload) {
//   return axios
//       .post('/po/update_po/', payload)
//       .then((response) => {
//           var json = {};
//           json.status = "success";
//           json.response = response.data;
//           commit('update_pomain_status', json)
//       })
//       .catch((error) => {
//           var json = {};
//           json.status = "failed";
//           json.response = error.response.data;
//           commit('update_pomain_status', json)
//       })
// }

export function trigger_update_pomain ({ commit,state }, payload) {
  var object_pass = {
      "url": '/po/update_po/',
      "update_path": 'update_pomain_status',
      "type": 'POST',
      "headers": {},
      "params": payload.payload.params,
      "body": payload.payload.pass_json
  };

  return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_delete_pomain ({ commit,state }, payload) {
  return axios
      .post('/po/delete_po/', payload)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_pomain_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_pomain_status', json)
      })
}

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

// export function trigger_read_location_list ({ commit }, payload) {
//   return axios
//       .get('/location/read_location_list/', {
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
//           commit('update_read_location_list', new_response)
//         })
//         .catch((error) => {
//             console.log(error);
//         })
// }


export function trigger_read_location_list ({ commit }, payload) {

    if(payload.params)
    {
        var payload = {
            ...payload,
            ...payload.params
        };

        delete payload.params;
    }

    return axios
        .post('/location/read_location_list/', payload)
        .then((response) => {
            var json_table_data = response.data;
            Object.keys(json_table_data).forEach(function(index, data) {
                json_table_data[index].actions = "";
            });
            var new_response = response;
            new_response.data = json_table_data;
            commit('update_read_location_list', new_response)
          })
          .catch((error) => {
              console.log(error);
              var new_response = [];
              commit('update_read_location_list', new_response)
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

    console.log(payload);

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
              var new_response = [];
              commit('update_pochild', new_response)
          })
  }


export function trigger_create_pochild ({ commit,state }, payload) {
  return axios
      .post('/po/create_pochild/', payload)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_pochild_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_pochild_status', json)
      })
}

export function trigger_update_pochild ({ commit,state }, payload) {
  return axios
      .post('/po/update_pochild/', payload)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_pochild_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_pochild_status', json)
      })
}

export function trigger_delete_pochild ({ commit,state }, payload) {
  return axios
      .post('/po/delete_pochild/', payload)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_pochild_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_pochild_status', json)
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

export function trigger_get_grmain ({ commit }, payload) {
  return axios
      .post('grn/read_gr/',  payload)
      .then((response) => {
          var json_table_data = response.data;
          var new_response = response;
          new_response.data = json_table_data;
          commit('update_grmain', new_response)
        })
        .catch((error) => {
            console.log(error);
        })
}

export function trigger_create_grmain ({ commit,state }, payload) {
  return axios
      .post('/grn/create_gr/', payload)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_grmain_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_grmain_status', json)
      })
}

export function trigger_update_grmain ({ commit,state }, payload) {
  return axios
      .post('/grn/update_gr/', payload)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_grmain_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_grmain_status', json)
      })
}

export function trigger_delete_grmain ({ commit,state }, payload) {
  return axios
      .post('/grn/delete_gr/', payload)
      .then((response) => {
        console.log(response)
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_grmain_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_grmain_status', json)
      })
}

export function trigger_read_gr_by_refno ({ commit,state }, payload) {
  return axios
      .post('/grn/read_gr_by_refno/', payload)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_read_gr_by_refno', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_read_gr_by_refno', json)
      })
}

// export function trigger_get_grchild ({ commit }, payload) {
//   return axios
//       .get('grn/read_grchild/', {
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
//           commit('update_grchild', new_response)
//         })
//         .catch((error) => {
//             console.log(error);
//         })
// }


export function trigger_get_grchild ({ commit }, payload) {

    if(payload.params)
    {
        var payload = {
            ...payload,
            ...payload.params
        };

        delete payload.params;

        if(payload.refno)
        {
            payload.RefNo = payload.refno
        }
    }

    return axios
        .post('grn/read_grchild/', payload)
        .then((response) => {
            var json_table_data = response.data;
            Object.keys(json_table_data).forEach(function(index, data) {
                json_table_data[index].actions = "";
            });
            var new_response = response;
            new_response.data = json_table_data;
            commit('update_grchild', new_response)
          })
          .catch((error) => {
              console.log(error);
          })
  }


export function trigger_create_grchild ({ commit,state }, payload) {
  return axios
      .post('/grn/create_grchild/', payload)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_grchild_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_grchild_status', json)
      })
}

export function trigger_update_grchild ({ commit,state }, payload) {
  return axios
      .post('/grn/update_grchild/', payload)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_grchild_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_grchild_status', json)
      })
}

export function trigger_delete_grchild ({ commit,state }, payload) {
  return axios
      .post('/grn/delete_grchild/', payload)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_grchild_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_grchild_status', json)
      })
}

// export function trigger_read_po_list_for_convert_gr ({ commit }, payload) {
//   return axios
//       .get('po/read_po_list_for_convert_gr/', {
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
//           commit('update_read_po_list_for_convert_gr', new_response)
//         })
//         .catch((error) => {
//             console.log(error);
//         })
// }

export function trigger_read_po_list_for_convert_gr ({ commit }, payload) {

    if(payload.params)
    {
        var payload = {
            ...payload,
            ...payload.params
        };

        delete payload.params;
    }

    return axios
        .post('po/read_po_list_for_convert_gr/', payload)
        .then((response) => {
            var json_table_data = response.data;
            Object.keys(json_table_data).forEach(function(index, data) {
                json_table_data[index].actions = "";
            });
            var new_response = response;
            new_response.data = json_table_data;
            commit('update_read_po_list_for_convert_gr', new_response)
          })
          .catch((error) => {
              console.log(error);
          })
  }


export function trigger_simple_receive ({ commit,state }, payload) {
  return axios
      .post('/grn/receive_method/simple_receive/', payload)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_simple_receive', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_simple_receive', json)
      })
}

export function trigger_posting_po ({ commit,state }, payload) {
  return axios
      .post('/po/posting_po/', payload)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_posting_po', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_posting_po', json)
      })
}

export function trigger_unposting_po ({ commit,state }, payload) {
  return axios
      .post('/po/unposting_po/', payload)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_unposting_po', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_unposting_po', json)
      })
}

export function trigger_posting_gr ({ commit,state }, payload) {
  return axios
      .post('/grn/posting_gr/', payload)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_posting_gr', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_posting_gr', json)
      })
}

export function trigger_unposting_gr ({ commit,state }, payload) {
  return axios
      .post('/grn/unposting_gr/', payload)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_unposting_gr', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_unposting_gr', json)
      })
}

export function trigger_posting_dn ({ commit,state }, payload) {
  return axios
      .post('/debit_note/posting_dn/', payload)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_posting_dn', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_posting_dn', json)
      })
}

export function trigger_unposting_dn ({ commit,state }, payload) {
  return axios
      .post('/debit_note/unposting_dn/', payload)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_unposting_dn', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_unposting_dn', json)
      })
}

// export function trigger_get_dn ({ commit }, payload) {
//   return axios
//       .get('debit_note/read_dn/', {
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
//           commit('update_dn', new_response)
//         })
//         .catch((error) => {
//             console.log(error);
//         })
// }

export function trigger_get_dn ({ commit }, payload) {

    if(payload.params)
    {
        var payload = {
            ...payload,
            ...payload.params
        };

        delete payload.params;
    }

    return axios
        .post('debit_note/read_dn/', payload)
        .then((response) => {
            var json_table_data = response.data;
            Object.keys(json_table_data).forEach(function(index, data) {
                json_table_data[index].actions = "";
            });
            var new_response = response;
            new_response.data = json_table_data;
            commit('update_dn', new_response)
          })
          .catch((error) => {
              console.log(error);
          })
  }

export function trigger_get_dn_v2 ({ commit,state }, payload) {
  return axios
      .post('/debit_note/get_dn_v2/', payload)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.data = response.data;
          commit('update_get_dn_v2', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_get_dn_v2', json)
      })
}

export function trigger_create_dn ({ commit,state }, payload) {
  return axios
      .post('/debit_note/create_dn/', payload)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_dn_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_dn_status', json)
      })
}

export function trigger_update_dn ({ commit,state }, payload) {
  return axios
      .post('/debit_note/update_dn/', payload)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_dn_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_dn_status', json)
      })
}

export function trigger_delete_dn ({ commit,state }, payload) {
  return axios
      .post('/debit_note/delete_dn/', payload)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_dn_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_dn_status', json)
      })
}

export function trigger_read_dn_by_refno ({ commit,state }, payload) {
  return axios
      .post('/debit_note/read_dn_by_refno/', payload)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_read_dn_by_refno', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_read_dn_by_refno', json)
      })
}

export function trigger_get_dnchild ({ commit }, payload) {
  return axios
  .post('/debit_note/read_dnchild/', payload)
  .then((response) => {
      var json = {};
      json.status = "success";
      json.response = response.data;
      commit('update_dnchild', json)
  })
  .catch((error) => {
      var json = {};
      json.status = "failed";
      json.response = error.response.data;
      commit('update_dnchild', json)
  })
}

export function trigger_create_dnchild ({ commit,state }, payload) {
  return axios
      .post('/debit_note/create_dnchild/', payload)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_dnchild_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_dnchild_status', json)
      })
}

export function trigger_update_dnchild ({ commit,state }, payload) {
  return axios
      .post('/debit_note/update_dnchild/', payload)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_dnchild_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_dnchild_status', json)
      })
}

export function trigger_delete_dnchild ({ commit,state }, payload) {
  return axios
      .post('/debit_note/delete_dnchild/', payload)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_dnchild_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_dnchild_status', json)
      })
}

export function trigger_get_invoice ({ commit }, payload) {
  return axios
  .post('/grn/get_invoice/', payload)
  .then((response) => {
      var json = {};
      json.status = "success";
      json.response = response.data;
      commit('update_invoice', json)
  })
  .catch((error) => {
      var json = {};
      json.status = "failed";
      json.response = error.response.data;
      commit('update_invoice', json)
  })
}

export function trigger_get_ibt ({ commit }, payload) {
  return axios
      .post('po/read_po/', payload)
      .then((response) => {
          var json_table_data = response.data;
          var new_response = response;
          new_response.data = json_table_data;
          commit('update_ibt', new_response)
        })
        .catch((error) => {
            console.log(error);
        })
}


export function trigger_create_ibt ({ commit,state }, payload) {
  return axios
      .post('/po/create_po/', payload)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;


          commit('update_ibt_status', json)

      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_ibt_status', json)
      })
}

export function trigger_update_ibt ({ commit,state }, payload) {
  return axios
      .post('/po/update_po/', payload)

      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;

          commit('update_ibt_status', json)

      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_ibt_status', json)
      })
}

export function trigger_delete_ibt ({ commit,state }, payload) {
  return axios
      .post('/po/delete_po/', payload)

      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;

          commit('update_ibt_status', json)

      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;

          commit('update_ibt_status', json)
      })
}


export function trigger_read_ibt_by_refno ({ commit,state }, payload) {
  return axios
      .post('/po/read_po_by_refno/', payload)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_read_ibt_by_refno', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_read_ibt_by_refno', json)
      })
}

// export function trigger_get_ibtchild ({ commit }, payload) {
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
//           commit('update_ibtchild', new_response)
//         })
//         .catch((error) => {
//             console.log(error);
//         })
// }


export function trigger_get_ibtchild ({ commit }, payload) {

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
            commit('update_ibtchild', new_response)
          })
          .catch((error) => {
              console.log(error);
          })
  }



export function trigger_create_ibtchild ({ commit,state }, payload) {
  return axios
      .post('/po/create_pochild/', payload)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_ibtchild_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_ibtchild_status', json)
      })
}

export function trigger_update_ibtchild ({ commit,state }, payload) {
  return axios
      .post('/po/update_pochild/', payload)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_ibtchild_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_ibtchild_status', json)
      })
}

export function trigger_delete_ibtchild ({ commit,state }, payload) {
  return axios
      .post('/po/delete_pochild/', payload)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_ibtchild_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_ibtchild_status', json)
      })
}

export function trigger_search_supcus ({ commit }, payload) {
  return axios
  .post('/supcus/search_supcus/' + '?skip=' + payload.params.skip + '&limit=' + payload.params.limit, payload)
  .then((response) => {
      var json = {};
      json.status = "success";
      json.response = response.data;
      commit('update_search_supcus', json)
  })
  .catch((error) => {
      var json = {};
      json.status = "failed";
      json.response = error.response.data;
      commit('update_search_supcus', json)
  })
}

export function trigger_read_po_supplier_itemlist ({ commit,state }, payload) {
  return axios
      .post('/itemmsater/read_po_supplier_itemlist/', payload)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_read_po_supplier_itemlist', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_read_po_supplier_itemlist', json)
      })
}

// export function trigger_item_tagging ({ commit,state }, payload) {
//   return axios
//       .post('/po/item_tagging/', payload)
//       .then((response) => {
//           var json = {};
//           json.status = "success";
//           json.response = response.data;
//           commit('update_item_tagging', json)
//       })
//       .catch((error) => {
//           var json = {};
//           json.status = "failed";
//           json.response = error.response.data;
//           commit('update_item_tagging', json)
//       })
// }

export function trigger_item_tagging ({ commit,state }, payload) {
  // console.log(payload.app.$actions);
  var object_pass = {
      url: 'po/item_tagging/',
      update_path: 'update_item_tagging',
      type: 'POST',
      headers: {},
      params: {},
      body:  payload.payload.pass_json
  };
  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_item_untagging ({ commit,state }, payload) {
  // console.log(payload.app.$actions);
  var object_pass = {
      url: '/po/item_untagging/',
      update_path: 'update_item_untagging',
      type: 'POST',
      headers: {},
      params: {},
      body:  payload.payload.pass_json
  };
  return payload.app.$actions({ commit,state }, object_pass);
}


// export function trigger_item_untagging ({ commit,state }, payload) {
//   return axios
//       .post('/po/item_untagging/', payload)
//       .then((response) => {
//           var json = {};
//           json.status = "success";
//           json.response = response.data;
//           commit('update_item_untagging', json)
//       })
//       .catch((error) => {
//           var json = {};
//           json.status = "failed";
//           json.response = error.response.data;
//           commit('update_item_untagging', json)
//       })
// }

// export function trigger_read_barcode_by_itemcode ({ commit }, payload) {
//   return axios
//       .get('itemmaster/read_barcode_by_itemcode', {
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
        .post('itemmaster/read_barcode_by_itemcode', payload)
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


export function trigger_get_cn ({ commit,state }, payload) {
  return axios
      .post('/credit_note/get_cn/', payload)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.data = response.data;
          commit('update_get_cn', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
        //   json.response = error.response.data;
        json.response = error.response ? JSON.stringify(error.response.data) : (error.message ? error.message : 'Unable to Connect. Please contact administrator.');
          commit('update_get_cn', json)
      })
}

export function trigger_read_cn_by_refno ({ commit,state }, payload) {
  return axios
      .post('credit_note/read_cn_by_refno', payload)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_read_cn_by_refno', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_read_cn_by_refno', json)
      })
}


export function trigger_create_cn ({ commit,state }, payload) {
  return axios
      .post('/credit_note/create_cn/', payload)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_cn_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_cn_status', json)
      })
}

export function trigger_update_cn ({ commit,state }, payload) {
  return axios
      .post('/credit_note/update_cn/', payload)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_cn_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_cn_status', json)
      })
}

export function trigger_delete_cn ({ commit,state }, payload) {
  return axios
      .post('/credit_note/delete_cn/', payload)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_cn_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_cn_status', json)
      })
}

export function trigger_posting_cn ({ commit,state }, payload) {
  return axios
      .post('/credit_note/posting_cn/', payload)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_posting_cn', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_posting_cn', json)
      })
}

export function trigger_unposting_cn ({ commit,state }, payload) {
  return axios
      .post('/credit_note/unposting_cn/', payload)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_unposting_cn', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_unposting_cn', json)
      })
}

export function trigger_read_cnchild ({ commit }, payload) {
  return axios
  .post('/credit_note/read_cnchild/', payload)
  .then((response) => {
      var json = {};
      json.status = "success";
      json.response = response.data;
      commit('update_cnchild', json)
  })
  .catch((error) => {
      var json = {};
      json.status = "failed";
      json.response = error.response.data;
      commit('update_cnchild', json)
  })
}

export function trigger_create_cnchild ({ commit,state }, payload) {
console.log('payload',payload);
  return axios
      .post('/credit_note/create_cnchild/', payload)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_cnchild_status', json)
      })
      .catch((error) => {
        console.log('error',error);
          var json = {};
          json.status = "failed";

          json.response = error.response.data;
          commit('update_cnchild_status', json)
      })
}

export function trigger_update_cnchild ({ commit,state }, payload) {
  return axios
      .post('/credit_note/update_cnchild/', payload)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_cnchild_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_cnchild_status', json)
      })
}

export function trigger_delete_cnchild ({ commit,state }, payload) {
  return axios
      .post('/credit_note/delete_cnchild/', payload)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_cnchild_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_cnchild_status', json)
      })
}

// export function trigger_get_read_pochild ({ commit }, payload) {
//     return axios
//         .get('po/read_pochild/', {
//                 params: payload.params
//             }
//         )
//         .then((response) => {
//             var json = {};
//             json.status = "success";
//             json.response = response.data;
//             commit('update_read_pochild', json)
//         })
//         .catch((error) => {
//             var json = {};
//             json.status = "failed";
//             json.response = error.response ? error.response.data : error.message;
//             commit('update_read_pochild', json)
//         })
// }

export function trigger_get_read_pochild ({ commit }, payload) {

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
            var json = {};
            json.status = "success";
            json.response = response.data;
            commit('update_read_pochild', json)
        })
        .catch((error) => {
            var json = {};
            json.status = "failed";
            json.response = error.response ? error.response.data : error.message;
            commit('update_read_pochild', json)
        })
}

export function trigger_runtime_runscript_multi ({ commit,state }, payload) {

  // console.log(payload.app.$actions);

  var object_pass = {
      url: 'runtime/runscript_multi/',
      update_path: 'update_runscript_multi_status',
      type: 'POST',
      headers: {},
      params: {},
      body:  payload.payload.pass_json
  };

  return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_get_surcharge_discount_list ({ commit,state }, payload) {

  var object_pass = {
      url: 'set_surcharge_discount/surcharge_discount_list/',
      update_path: 'update_surcharge_discount_list',
      type: 'POST',
      headers: {},
      params: {},
      body:  payload.payload.pass_json
  };

  return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_get_search_item_for_dn ({ commit,state }, payload) {

  var object_pass = {
      url: 'itemmaster/search_item_for_dn/',
      update_path: 'update_search_item_for_dn',
      type: 'POST',
      headers: {},
      params: {},
      body:  payload.payload.pass_json
  };

  return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_get_search_item_for_cn ({ commit,state }, payload) {

  var object_pass = {
      url: 'itemmaster/search_item_for_cn/',
      update_path: 'update_search_item_for_cn',
      type: 'POST',
      headers: {},
      params: {},
      body:  payload.payload.pass_json
  };

  return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_post_grn_item_tagging ({ commit,state }, payload) {

  var object_pass = {
      url: 'grn/item_tagging/',
      update_path: 'update_grn_item_tagging_status',
      type: 'POST',
      headers: {},
      params: {},
      body:  payload.payload.pass_json
  };

  return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_post_grn_item_untagging ({ commit,state }, payload) {

  var object_pass = {
      url: 'grn/item_untagging/',
      update_path: 'update_grn_item_untagging_status',
      type: 'POST',
      headers: {},
      params: {},
      body:  payload.payload.pass_json
  };

  return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_post_create_surcharge_discount ({ commit,state }, payload) {

  var object_pass = {
      url: 'trans_surcharge_discount/create_surcharge_discount/',
      update_path: 'update_create_surcharge_discount_status',
      type: 'POST',
      headers: {},
      params: {},
      body:  payload.payload.pass_json
  };

  return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_post_edit_surcharge_discount ({ commit,state }, payload) {

  var object_pass = {
      url: 'trans_surcharge_discount/edit_surcharge_discount/',
      update_path: 'update_edit_surcharge_discount_status',
      type: 'POST',
      headers: {},
      params: {},
      body:  payload.payload.pass_json
  };

  return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_post_get_surcharge_discount ({ commit,state }, payload) {

  var object_pass = {
      url: 'trans_surcharge_discount/get_surcharge_discount/',
      update_path: 'update_get_surcharge_discount',
      type: 'POST',
      headers: {},
      params: {},
      body:  payload.payload.pass_json
  };

  return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_post_delete_surcharge_discount ({ commit,state }, payload) {

  var object_pass = {
      url: "trans_surcharge_discount/delete_surcharge_discount/",
      update_path: 'update_delete_surcharge_discount_status',
      type: 'POST',
      headers: {},
      params: {},
      body:  payload.payload.pass_json
  };

  return payload.app.$actions({ commit,state }, object_pass);

}
export function trigger_post_grn_read_grchild ({ commit,state }, payload) {

    var object_pass = {
        url: "grn/read_grchild/",
        update_path: 'update_post_grn_grchild_status',
        type: 'POST',
        headers: {},
        params: {},
        body:  payload.payload.pass_json
    };
  
    return payload.app.$actions({ commit,state }, object_pass);
  
  }
export function trigger_post_grn_create_grchild ({ commit,state }, payload) {

  var object_pass = {
      url: "grn/create_grchild/",
      update_path: 'update_post_grn_grchild_status',
      type: 'POST',
      headers: {},
      params: {},
      body:  payload.payload.pass_json
  };

  return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_post_grn_update_grchild ({ commit,state }, payload) {

  var object_pass = {
      url: "grn/update_grchild/",
      update_path: 'update_post_grn_grchild_status',
      type: 'POST',
      headers: {},
      params: {},
      body:  payload.payload.pass_json
  };

  return payload.app.$actions({ commit,state }, object_pass);

}
export function trigger_post_gst_read_gst ({ commit,state }, payload) {

  var object_pass = {
      url: "gst/read_gst/",
      update_path: 'update_post_gst_read_gst',
      type: 'POST',
      headers: {},
      params: {},
      body:  payload.payload.pass_json
  };

  return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_post_master_code_read_master_code_by_trans_type ({ commit,state }, payload) {

  var object_pass = {
      url: "master_code/read_master_code_by_trans_type/",
      update_path: 'update_post_master_code_read_master_code_by_trans_type',
      type: 'POST',
      headers: {},
      params: {},
      body:  payload.payload.pass_json
  };

  return payload.app.$actions({ commit,state }, object_pass);

}


export function trigger_get_po_read_po ({ commit,state }, payload) {

    var object_pass = {
        "url": 'po/read_po/',  //api request url
        "update_path": 'update_po_read_po', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };

    return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_post_read_pochild_general ({ commit,state }, payload) {

  var object_pass = {
      "url": 'po/read_pochild/',  //api request url
      "update_path": 'update_pochild', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'POST', //type of api request
      "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
      "body": payload.payload.pass_json //field that used by api to create data
  };

  return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_create_pochild_general ({ commit,state }, payload) {
  var object_pass = {
      "url": 'po/create_pochild/',  //api request url
      "update_path": 'update_pochild_status', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'POST', //type of api request
      "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
      "body": payload.payload.pass_json //field that used by api to create data
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_update_pochild_general ({ commit,state }, payload) {
  var object_pass = {
      "url": 'po/update_pochild/',  //api request url
      "update_path": 'update_pochild_status', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'POST', //type of api request
      "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
      "body": payload.payload.pass_json //field that used by api to create data
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_get_po_ex ({ commit,state }, payload) {

  var object_pass = {
      "url": 'po_ex/get_po_ex/',  //api request url
      "update_path": 'update_po_ex', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'POST', //type of api request
      "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
      "body": payload.payload.pass_json //field that used by api to create data
  };

  return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_post_get_price_change_req ({ commit,state }, payload) {

  var object_pass = {
      "url": 'price_change/get_price_change_req/',  //api request url
      "update_path": 'update_price_change_req', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'POST', //type of api request
      "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
      "body": payload.payload.pass_json //field that used by api to create data
  };

  return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_create_price_change_req ({ commit,state }, payload) {
  var object_pass = {
      "url": 'price_change/create_price_change_req/',  //api request url
      "update_path": 'update_price_change_req_status', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'POST', //type of api request
      "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
      "body": payload.payload.pass_json //field that used by api to create data
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_update_price_change_req ({ commit,state }, payload) {
  var object_pass = {
      "url": 'price_change/update_price_change_req/',  //api request url
      "update_path": 'update_price_change_req_status', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'POST', //type of api request
      "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
      "body": payload.payload.pass_json //field that used by api to create data
  };

  return payload.app.$actions({ commit,state }, object_pass);
}

export function trigger_post_get_price_change_req2item ({ commit,state }, payload) {

  var object_pass = {
      "url": 'price_change/get_price_change_req2item/',  //api request url
      "update_path": 'update_price_change_req2item', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'POST', //type of api request
      "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
      "body": payload.payload.pass_json //field that used by api to create data
  };

  return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_post_search_item_for_po ({ commit,state }, payload) {

  var object_pass = {
      "url": 'itemmaster/search_item_for_po/',  //api request url
      "update_path": 'update_search_item_for_po', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'POST', //type of api request
      "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
      "body": payload.payload.pass_json //field that used by api to create data
  };

  return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_post_read_po_supplier_list ({ commit,state }, payload) {

  var object_pass = {
      "url": 'itemmsater/read_po_supplier_itemlist/',  //api request url
      "update_path": 'update_po_supplier_list', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'POST', //type of api request
      "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
      "body": payload.payload.pass_json //field that used by api to create data
  };

  return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_post_get_item_by_itemcode_for_po ({ commit,state }, payload) {

  var object_pass = {
      "url": 'itemmaster/get_item_by_itemcode_for_po/',  //api request url
      "update_path": 'update_item_by_itemcode_for_po', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'POST', //type of api request
      "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
      "body": payload.payload.pass_json //field that used by api to create data
  };

  return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_post_read_barcode_by_itemcode ({ commit,state }, payload) {

  var object_pass = {
      "url": 'itemmaster/read_barcode_by_itemcode/',  //api request url
      "update_path": 'update_barcode_by_itemcode', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'POST', //type of api request
      "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
      "body": payload.payload.pass_json //field that used by api to create data
  };

  return payload.app.$actions({ commit,state }, object_pass);

}

export function trigger_post_bulk_create_pochild ({ commit,state }, payload) {

  var object_pass = {
      "url": 'po/bulk_create_pochild/',  //api request url
      "update_path": 'update_bulk_create_pochild_status', //function name use in store mutations.js to mutate state to store data in variable
      "type": 'POST', //type of api request
      "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
      "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
      "body": payload.payload.pass_json //field that used by api to create data
  };

  return payload.app.$actions({ commit,state }, object_pass);

}
export function trigger_post_read_gr_by_refno ({ commit,state }, payload) {

    var object_pass = {
        "url": 'grn/read_gr_by_refno/',  //api request url
        "update_path": 'update_read_gr_by_refno', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };

    return payload.app.$actions({ commit,state }, object_pass);

}
export function trigger_post_get_read_grmain_new ({ commit,state }, payload) {

    var object_pass = {
        "url": 'grn/read_gr/',  //api request url
        "update_path": 'update_grn_read_grmain', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };

    return payload.app.$actions({ commit,state }, object_pass);

}
export function trigger_post_create_grmain_new ({ commit,state }, payload) {

    var object_pass = {
        "url": 'grn/create_gr/',  //api request url
        "update_path": 'update_grn_read_grmain', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };

    return payload.app.$actions({ commit,state }, object_pass);

}
export function trigger_post_update_grmain_new ({ commit,state }, payload) {

    var object_pass = {
        "url": 'grn/update_gr/',  //api request url
        "update_path": 'update_grn_read_grmain', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };

    return payload.app.$actions({ commit,state }, object_pass);

}
export function trigger_post_delete_gr ({ commit,state }, payload) {

    var object_pass = {
        "url": 'grn/delete_gr/',  //api request url
        "update_path": 'update_grn_read_grmain', //function name use in store mutations.js to mutate state to store data in variable
        "type": 'POST', //type of api request
        "headers": {},  // declare to define what data type used such as JSON or multipart/form-data
        "params": payload.payload.params,  //params will auto convert as url request on url in ?parameter=first&parameter_second=second
        "body": payload.payload.pass_json //field that used by api to create data
    };

    return payload.app.$actions({ commit,state }, object_pass);

}
