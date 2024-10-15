import axios from 'axios'

export function trigger_get_ml_itemmaster ({ commit }, payload) {
  return axios
      .get('ml_item_master/MlItemMaster_parent/', {
              params: payload.params
          }
      )
      .then((response) => {
          var json_table_data = response.data.results;
          Object.keys(json_table_data).forEach(function(index, data) {
              json_table_data[index].actions = "";
          });
          var new_response = response;
          new_response.data.results = json_table_data;
          commit('update_ml_itemmaster', new_response)
        })
        .catch((error) => {
            console.log(error);
        })
}

export function trigger_create_ml_itemmaster ({ commit,state }, payload) {
  return axios
      .post('/ml_item_master/MlItemMaster/', payload)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_ml_itemmaster_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_ml_itemmaster_status', json)
      })
}

export function trigger_update_ml_itemmaster ({ commit,state }, payload) {
  return axios
      .patch('/ml_item_master/MlItemMaster/'+payload.item_guid+'/', payload.pass_json)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_ml_itemmaster_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_ml_itemmaster_status', json)
      })
}

export function trigger_delete_ml_itemmaster ({ commit,state }, payload) {
  return axios
      .delete('/ml_item_master/MlItemMaster/'+payload.item_guid+'/')
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_ml_itemmaster_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_ml_itemmaster_status', json)
      })
}

export function trigger_get_ml_item_barcode ({ commit }, payload) {
  return axios
      .get('ml_item_barcode/MlItemBarcode/', {
              params: payload.params
          }
      )
      .then((response) => {
          var json_table_data = response.data.results;
          Object.keys(json_table_data).forEach(function(index, data) {
              json_table_data[index].actions = "";
          });
          var new_response = response;
          new_response.data.results = json_table_data;
          commit('update_ml_item_barcode', new_response)
        })
        .catch((error) => {
            console.log(error);
        })
}

export function trigger_create_ml_item_barcode ({ commit,state }, payload) {
  return axios
      .post('/ml_item_barcode/MlItemBarcode/', payload)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_ml_item_barcode_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_ml_item_barcode_status', json)
      })
}

export function trigger_update_ml_item_barcode ({ commit,state }, payload) {
  return axios
      .patch('/ml_item_barcode/MlItemBarcode/'+payload.barcode_guid+'/', payload.pass_json)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_ml_item_barcode_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_ml_item_barcode_status', json)
      })
}

export function trigger_delete_ml_item_barcode ({ commit,state }, payload) {
  return axios
      .delete('/ml_item_barcode/MlItemBarcode/'+payload.barcode_guid+'/')
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_ml_item_barcode_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_ml_item_barcode_status', json)
      })
}

export function trigger_get_ml_item_pricing ({ commit }, payload) {
  return axios
      .get('ml_item_pricing/MlItemPricing/', {
              params: payload.params
          }
      )
      .then((response) => {
          var json_table_data = response.data.results;
          Object.keys(json_table_data).forEach(function(index, data) {
              json_table_data[index].actions = "";
          });
          var new_response = response;
          new_response.data.results = json_table_data;
          commit('update_ml_item_pricing', new_response)
        })
        .catch((error) => {
            console.log(error);
        })
}

export function trigger_create_ml_item_pricing ({ commit,state }, payload) {
  return axios
      .post('/ml_item_pricing/MlItemPricing/', payload)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_ml_item_pricing_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_ml_item_pricing_status', json)
      })
}

export function trigger_update_ml_item_pricing ({ commit,state }, payload) {
  return axios
      .patch('/ml_item_pricing/MlItemPricing/'+payload.pricing_guid+'/', payload.pass_json)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_ml_item_pricing_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_ml_item_pricing_status', json)
      })
}

export function trigger_delete_ml_item_pricing ({ commit,state }, payload) {
  return axios
      .delete('/ml_item_pricing/MlItemPricing/'+payload.pricing_guid+'/')
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_ml_item_pricing_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_ml_item_pricing_status', json)
      })
}

export function trigger_get_ml_item_assorted_main ({ commit }, payload) {
  return axios
      .get('ml_item_assorted_main/MlItemAssortedMain/', {
              params: payload.params
          }
      )
      .then((response) => {
          var json_table_data = response.data.results;
          Object.keys(json_table_data).forEach(function(index, data) {
              json_table_data[index].actions = "";
          });
          var new_response = response;
          new_response.data.results = json_table_data;
          commit('update_ml_item_assorted_main', new_response)
        })
        .catch((error) => {
            console.log(error);
        })
}

export function trigger_create_ml_item_assorted_main ({ commit,state }, payload) {
  return axios
      .post('/ml_item_assorted_main/MlItemAssortedMain/', payload)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_ml_item_assorted_main_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_ml_item_assorted_main_status', json)
      })
}

export function trigger_update_ml_item_assorted_main ({ commit,state }, payload) {
  return axios
      .patch('/ml_item_assorted_main/MlItemAssortedMain/'+payload.assorted_main_guid+'/', payload.pass_json)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_ml_item_assorted_main_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_ml_item_assorted_main_status', json)
      })
}

export function trigger_delete_ml_item_assorted_main ({ commit,state }, payload) {
  return axios
      .delete('/ml_item_assorted_main/MlItemAssortedMain/'+payload.assorted_main_guid+'/')
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_ml_item_assorted_main_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_ml_item_assorted_main_status', json)
      })
}

export function trigger_get_ml_item_assorted_child ({ commit }, payload) {
  return axios
      .get('ml_item_assorted_child/MlItemAssortedChild_parent/', {
              params: payload.params
          }
      )
      .then((response) => {
          var json_table_data = response.data.results;
          Object.keys(json_table_data).forEach(function(index, data) {
              json_table_data[index].actions = "";
          });
          var new_response = response;
          new_response.data.results = json_table_data;
          commit('update_ml_item_assorted_child', new_response)
        })
        .catch((error) => {
            console.log(error);
        })
}

export function trigger_create_ml_item_assorted_child ({ commit,state }, payload) {
  return axios
      .post('/ml_item_assorted_child/MlItemAssortedChild/', payload)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_ml_item_assorted_child_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_ml_item_assorted_child_status', json)
      })
}

export function trigger_update_ml_item_assorted_child ({ commit,state }, payload) {
  return axios
      .patch('/ml_item_assorted_child/MlItemAssortedChild/'+payload.assorted_child_guid+'/', payload.pass_json)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_ml_item_assorted_child_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_ml_item_assorted_child_status', json)
      })
}

export function trigger_delete_ml_item_assorted_child ({ commit,state }, payload) {
  return axios
      .delete('/ml_item_assorted_child/MlItemAssortedChild/'+payload.assorted_child_guid+'/')
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_ml_item_assorted_child_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_ml_item_assorted_child_status', json)
      })
}
