import axios from 'axios'

export default function ({ commit,state }, payload) {

    if(payload.type == "GET")
    {
        return axios
        .get(`${payload.url}`, {params:payload.params})
        .then((response) => {

            var json = {};
            json.status = "success";
            json.response = response;

            commit(`${payload.update_path}`, json)
        })
        .catch((error) => {
            console.log(error);
            var json = {};
            json.status = "failed";
            json.response = error.response ? JSON.stringify(error.response.data) : (error.message ? error.message : 'Unable to Connect. Please contact administrator.');
            commit(`${payload.update_path}`, json)
        })
    }
    else if(payload.type == "POST")
    {
        return axios({
            method: "POST",
            url: `${payload.url}`,
            data: payload.body,
            headers: payload.headers,
        })
        .then((response) => {
            var json = {};
            json.status = "success";
            json.response = response.data;
            commit(`${payload.update_path}`, json)
        })
        .catch((error) => {
            var json = {};
            json.status = "failed";
            json.response = error.response ? JSON.stringify(error.response.data) : (error.message ? error.message : 'Unable to Connect. Please contact administrator.');
            console.log( json.response);
            commit(`${payload.update_path}`, json)
        })
    }
    else if(payload.type == "DELETE")
    {
        return axios
        .delete(`${payload.url}`)
        .then((response) => {
            var json = {};
            json.status = "success";
            json.response = response.data;
            commit(`${payload.update_path}`, json)
        })
        .catch((error) => {
  
            var json = {};
            json.status = "failed";
            json.response = error.response ? JSON.stringify(error.response.data) : (error.message ? error.message : 'Unable to Connect. Please contact administrator.');
            console.log(error);
            console.log(json);
            commit(`${payload.update_path}`, json)
        })
    }
    else if(payload.type == "PATCH")
    {
        return axios({
        method: "PATCH",
        url: `${payload.url}`,
        data: payload.body,
        headers: payload.headers,
        })
        .then((response) => {
            var json = {};
            json.status = "success";
            json.response = response.data;
            commit(`${payload.update_path}`, json)
        })
        .catch((error) => {
            var json = {};
            json.status = "failed";
            json.response = error.response ? JSON.stringify(error.response.data) : (error.message ? error.message : 'Unable to Connect. Please contact administrator.');
            commit(`${payload.update_path}`, json)
        })
    }

    

}
