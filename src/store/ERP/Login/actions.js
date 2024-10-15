import axios from 'axios'

export function logout({ commit }) {
  // commit('logout');

  sessionStorage.removeItem('authenticated')
  sessionStorage.removeItem('user_name')
  sessionStorage.removeItem('userlist')
  sessionStorage.removeItem('company_guid')
  sessionStorage.removeItem('language')
  sessionStorage.removeItem('currency_sign')
  sessionStorage.removeItem('currency_format')

  sessionStorage.clear();

}
export function trigger_get_user ({ commit,state }, payload) {
  return axios
      .post('/sysuser/get_user/', payload)
      .then((response) => {
          var json = {};
         // console.log('response',response);
          if(response.data == null){
            json.status = "failed";
            json.response = response.data;
          }else{
            json.status = "success";
            json.response = response.data;

          }
         // console.log('json action',json);
          commit('update_user', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          // json.response = error.response.data;
          json.response = error.response ? JSON.stringify(error.response.data) : (error.message ? error.message : 'Unable to Connect. Please contact administrator.');
          commit('update_user', json)
      })
}

export function trigger_get_language ({ commit,state }, payload) {
    return axios
        .post('/locale/locale_ui/', payload)
        .then((response) => {
            var json = {};
            json.status = "success";
            json.response = response.data;
            commit('update_language', json)
        })
        .catch((error) => {
            var json = {};
            json.status = "failed";
            json.response = error.response.data;
            commit('update_language', json)
        })
  }

  
export function trigger_get_preference ({ commit,state }, payload) {
  return axios
      .post('/web_backend_preference/get_preference/', payload)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_preference', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_preference', json)
      })
}

export function reset_state({ commit, rootState }, payload) {
  // commit('logout');
  const headers = Object.keys(payload._mutations);

  for (const index in headers) {
      commit(headers[index], null, { root: true })
  }
  // for (const index in rootState) {
  //     console.log(index);
  // }

  

  // commit('basket/update_basket_n_transaction_by_day', null, { root: true })
  return;
}
