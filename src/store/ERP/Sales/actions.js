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

export function trigger_get_somain ({ commit }, payload) {
  return axios
      .post('po/read_po/', payload)
      .then((response) => {
          var json_table_data = response.data;
          // Object.keys(json_table_data).forEach(function(index, data) {
          //     json_table_data[index].actions = "";
          // });
          var new_response = response;
          new_response.data = json_table_data;
          commit('update_somain', new_response)
        })
        .catch((error) => {
            console.log(error);
        })
}

export function trigger_create_somain ({ commit,state }, payload) {
  return axios
      .post('/po/create_po/', payload)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_somain_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_somain_status', json)
      })
}

export function trigger_update_somain ({ commit,state }, payload) {
  return axios
      .post('/po/update_po/', payload)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_somain_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_somain_status', json)
      })
}

export function trigger_delete_somain ({ commit,state }, payload) {
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

export function trigger_read_so_by_refno ({ commit,state }, payload) {
  return axios
      .post('/po/read_po_by_refno/', payload)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_read_so_by_refno', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_read_so_by_refno', json)
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
          })
  }

// export function trigger_get_sochild ({ commit }, payload) {
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
//           commit('update_sochild', new_response)
//         })
//         .catch((error) => {
//             console.log(error);
//         })
// }


export function trigger_get_sochild ({ commit }, payload) {

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
            commit('update_sochild', new_response)
          })
          .catch((error) => {
              console.log(error);
          })
  }


export function trigger_create_sochild ({ commit,state }, payload) {
  return axios
      .post('/po/create_pochild/', payload)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_sochild_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_sochild_status', json)
      })
}

export function trigger_update_sochild ({ commit,state }, payload) {
  return axios
      .post('/po/update_pochild/', payload)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_sochild_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_sochild_status', json)
      })
}

export function trigger_delete_sochild ({ commit,state }, payload) {
  return axios
      .post('/po/delete_pochild/', payload)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_sochild_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_sochild_status', json)
      })
}

export function trigger_search_item_for_po ({ commit,state }, payload) {
  return axios
      .post('/itemmaster/search_item_for_po/', payload)
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

export function trigger_get_simain ({ commit }, payload) {
  return axios
      .post('grn/read_gr/',  payload)
      .then((response) => {
          var json_table_data = response.data;

          var new_response = response;
          new_response.data = json_table_data;
          commit('update_simain', new_response)
        })
        .catch((error) => {
            console.log(error);
        })
}

export function trigger_create_simain ({ commit,state }, payload) {
  return axios
      .post('/grn/create_gr/', payload)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_simain_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_simain_status', json)
      })
}

export function trigger_update_simain ({ commit,state }, payload) {
  return axios
      .post('/grn/update_gr/', payload)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_simain_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_simain_status', json)
      })
}

export function trigger_delete_simain ({ commit,state }, payload) {
  return axios
      .post('/grn/delete_gr/', payload)
      .then((response) => {
        console.log(response)
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_simain_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_simain_status', json)
      })
}

export function trigger_read_si_by_refno ({ commit,state }, payload) {
  return axios
      .post('/grn/read_gr_by_refno/', payload)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_read_si_by_refno', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_read_si_by_refno', json)
      })
}

// export function trigger_get_sichild ({ commit }, payload) {
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
//           commit('update_sichild', new_response)
//         })
//         .catch((error) => {
//             console.log(error);
//         })
// }

export function trigger_get_sichild ({ commit }, payload) {

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
            commit('update_sichild', new_response)
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

export function trigger_delete_sichild ({ commit,state }, payload) {
  return axios
      .post('/grn/delete_grchild/', payload)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_sichild_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_sichild_status', json)
      })
}

// export function trigger_read_so_list_for_convert_si ({ commit }, payload) {
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
//           commit('update_read_so_list_for_convert_si', new_response)
//         })
//         .catch((error) => {
//             console.log(error);
//         })
// }

export function trigger_read_so_list_for_convert_si ({ commit }, payload) {

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
            commit('update_read_so_list_for_convert_si', new_response)
          })
          .catch((error) => {
              console.log(error);
          })
  }

export function trigger_simple_receive ({ commit,state }, payload) {
  console.log(payload.params)
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

export function trigger_post_read_item_all ({ commit,state }, payload) {
  return axios
      .post('/itemmaster/read_item_all/', payload)
      .then((response) => {
        console.log('response',response);
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_post_read_item_all', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_post_read_item_all', json)
      })
}

export function trigger_post_read_barcode_by_itemcode ({ commit,state }, payload) {
  return axios
      .post('/itemmaster/read_barcode_by_itemcode/', payload)
      .then((response) => {
        console.log('response',response);
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_post_read_barcode_by_itemcode', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_post_read_barcode_by_itemcode', json)
      })
}
