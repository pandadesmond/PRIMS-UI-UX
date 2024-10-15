import axios from 'axios'

export function trigger_get_mc_currency ({ commit }, payload) {
  return axios
      .get('_mc_currency/McCurrency/', {
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
          commit('update_mc_currency', new_response)
        })
        .catch((error) => {
            console.log(error);
        })
}

export function trigger_create_mc_currency ({ commit,state }, payload) {
  return axios
      .post('/_mc_currency/McCurrency/', payload)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_mc_currency_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_mc_currency_status', json)
      })
}

export function trigger_update_mc_currency ({ commit,state }, payload) {
  return axios
      .patch('/_mc_currency/McCurrency/'+payload.cur_guid+'/', payload.pass_json)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_mc_currency_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_mc_currency_status', json)
      })
}

export function trigger_delete_mc_currency ({ commit,state }, payload) {
  return axios
      .delete('/_mc_currency/McCurrency/'+payload.cur_guid+'/')
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_mc_currency_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_mc_currency_status', json)
      })
}

export function trigger_get_mc_continent ({ commit }, payload) {
  return axios
      .get('_mc_continent/McContinent/', {
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
          commit('update_mc_continent', new_response)
        })
        .catch((error) => {
            console.log(error);
        })
}

export function trigger_create_mc_continent ({ commit,state }, payload) {
  return axios
      .post('/_mc_continent/McContinent/', payload)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_mc_continent_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_mc_continent_status', json)
      })
}

export function trigger_update_mc_continent ({ commit,state }, payload) {
  return axios
      .patch('/_mc_continent/McContinent/'+payload.con_guid+'/', payload.pass_json)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_mc_continent_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_mc_continent_status', json)
      })
}

export function trigger_delete_mc_continent ({ commit,state }, payload) {
  return axios
      .delete('/_mc_continent/McContinent/'+payload.con_guid+'/')
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_mc_continent_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_mc_continent_status', json)
      })
}

export function trigger_get_mc_country ({ commit }, payload) {
  return axios
      .get('_mc_country/McCountry_parent/', {
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
          commit('update_mc_country', new_response)
        })
        .catch((error) => {
            console.log(error);
        })
}

export function trigger_create_mc_country ({ commit,state }, payload) {
  return axios
      .post('/_mc_country/McCountry/', payload)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_mc_country_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_mc_country_status', json)
      })
}

export function trigger_update_mc_country ({ commit,state }, payload) {
  return axios
      .patch('/_mc_country/McCountry/'+payload.country_guid+'/', payload.pass_json)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_mc_country_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_mc_country_status', json)
      })
}

export function trigger_delete_mc_country ({ commit,state }, payload) {
  return axios
      .delete('/_mc_country/McCountry/'+payload.country_guid+'/')
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_mc_country_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_mc_country_status', json)
      })
}

export function trigger_get_mc_region ({ commit }, payload) {
  return axios
      .get('_mc_region/McRegion_parent/', {
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
          commit('update_mc_region', new_response)
        })
        .catch((error) => {
            console.log(error);
        })
}

export function trigger_create_mc_region ({ commit,state }, payload) {
  return axios
      .post('/_mc_region/McRegion/', payload)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_mc_region_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_mc_region_status', json)
      })
}

export function trigger_update_mc_region ({ commit,state }, payload) {
  return axios
      .patch('/_mc_region/McRegion/'+payload.region_guid+'/', payload.pass_json)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_mc_region_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_mc_region_status', json)
      })
}

export function trigger_delete_mc_region ({ commit,state }, payload) {
  return axios
      .delete('/_mc_region/McRegion/'+payload.region_guid+'/')
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_mc_region_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_mc_region_status', json)
      })
}

export function trigger_get_mc_state ({ commit }, payload) {
  return axios
      .get('_mc_state/McState_parent/', {
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
          commit('update_mc_state', new_response)
        })
        .catch((error) => {
            console.log(error);
        })
}

export function trigger_create_mc_state ({ commit,state }, payload) {
  return axios
      .post('/_mc_state/McState/', payload)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_mc_state_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_mc_state_status', json)
      })
}

export function trigger_update_mc_state ({ commit,state }, payload) {
  return axios
      .patch('/_mc_state/McState/'+payload.state_guid+'/', payload.pass_json)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_mc_state_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_mc_state_status', json)
      })
}

export function trigger_delete_mc_state ({ commit,state }, payload) {
  return axios
      .delete('/_mc_state/McState/'+payload.state_guid+'/')
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_mc_state_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_mc_state_status', json)
      })
}

export function trigger_get_mc_district ({ commit }, payload) {
  return axios
      .get('_mc_district/McDistrict_parent/', {
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
          commit('update_mc_district', new_response)
        })
        .catch((error) => {
            console.log(error);
        })
}

export function trigger_create_mc_district ({ commit,state }, payload) {
  return axios
      .post('/_mc_district/McDistrict/', payload)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_mc_district_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_mc_district_status', json)
      })
}

export function trigger_update_mc_district ({ commit,state }, payload) {
  return axios
      .patch('/_mc_district/McDistrict/'+payload.district_guid+'/', payload.pass_json)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_mc_district_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_mc_district_status', json)
      })
}

export function trigger_delete_mc_district ({ commit,state }, payload) {
  return axios
      .delete('/_mc_district/McDistrict/'+payload.district_guid+'/')
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_mc_district_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_mc_district_status', json)
      })
}

export function trigger_get_cp_set_branch ({ commit,state }, payload) {

    var folder_path = payload.this.$global_config.folder_path;
    var url = payload.this.$global_config.center_url;

    return axios({
        method: "POST",
        url: `${url}${folder_path}sysuser/cp_set_branch`,
        data: payload.pass_json,
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // },
    })
    .then((response) => {
        var json = {};
        json.status = "success";
        json.response = response.data;
        commit('update_cp_set_branch', json)
    })
    .catch((error) => {
        var json = {};
        json.status = "failed";
        json.response = error.response ? error.response.data : '';
        commit('update_cp_set_branch', json)
    })
}