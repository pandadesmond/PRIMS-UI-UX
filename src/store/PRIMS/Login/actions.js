import axios from 'axios'

export function logout({ commit }) {
  sessionStorage.clear();
  localStorage.clear();
}

export function trigger_login ({ commit,state }, payload) {
  return axios
    .post('/user/token/', payload)
    .then((response) => {
        var json = {};
        // console.log('response',response);
        if(response.data == null){
          json.status = "failed";
          json.response = response.data;
        }else{
          json.status = "success";
          json.response = response.data;
          sessionStorage.setItem('refresh_token', response.data.refresh);
          sessionStorage.setItem('access_token', response.data.access);
        }
        // console.log('json action',json);
        commit('update_user', json)
    })
    .catch((error) => {
        var json = {};
        json.status = "failed";
        // json.response = error.response.data;
        json.response = error.response ? error.response.data : (error.message ? error.message : 'Unable to Connect. Please contact administrator.');
        commit('update_user', json)
    })
}

export async function refreshtoken ({ commit }){
  console.log('trigger refresh token');
  if(sessionStorage.getItem('refresh_token')){
      console.log('start run refresh');
      const refreshUrl = "user/token/refresh/";
      return axios
      .post(refreshUrl,{ refresh: sessionStorage.getItem('refresh_token') })
      .then((response) => {
          console.log('done run refresh token');
          if (response.status === 200) {
              sessionStorage.setItem('access_token', response.data.access);
          }
      })
      .catch((error) => {
          console.log('error refresh token');
          showNotify("negative", "Something went wrong when retrieving new token.", true);
      })
  }
}
