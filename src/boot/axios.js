import { boot } from 'quasar/wrappers'
import axios from 'axios'
import store from "../store";
import router from "../router";

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: 'https://api.example.com' })

export default boot(async({ app, router, store }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  axios.defaults.baseURL = app.config.globalProperties.$global_config.url;

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API

  axios.interceptors.request.use(
    function(config) {
      // console.log(config);
      // console.log(config.method);
      //to ensure if have any new url changes in the middle will get the latest url
      axios.defaults.baseURL = app.config.globalProperties.$global_config.url;
      config.baseURL = app.config.globalProperties.$global_config.url;

      // Do something before request is sent

      // var customer_guid = "EFC5E5ABFC4B11E99950DED0BD1483FD";//crmdashboard bataras

      var customer_guid = sessionStorage.getItem('customer_guid');
      var user_guid = sessionStorage.getItem('user_guid');

      //sublot
      var company_guid = sessionStorage.getItem('company_guid');

      // ERP
      var EUser = sessionStorage.getItem('EUser');
      var getuser = sessionStorage.getItem('getuser');

      if(config.data == undefined)
      {
        config.data = {
          "SetPath": customer_guid,
          "user_guid": user_guid,
          "chosen_outlet": [],
          "sub_dept_code": [],
          "company_guid": [],
          "outlet_guid": [],//use for ERP only
        };

      }
      else
      {

        if(typeof config.data === "string")
        {
          config.data = JSON.parse(config.data);
        }

        config.data.SetPath = customer_guid;
        // config.data.user_guid = user_guid;

        if(!config.data.user_guid)
        {
          config.data.user_guid = user_guid;
        }

        if(!config.data.chosen_outlet)
        {
          config.data.chosen_outlet = [];
        }

        if(!config.data.sub_dept_code)
        {
          config.data.sub_dept_code = [];
        }

        if(!config.data.company_guid)
        {
          if(config.url != "mc_setcompany/mc_SetCompany/")
          {
            config.data.company_guid = company_guid;
          }
        }

        if(sessionStorage.getItem("session_outlet_guid"))
        {
          config.data.outlet_guid = sessionStorage.getItem("session_outlet_guid");
        }

      }

      //session user_guid for HONDA
      if(config.data instanceof FormData)
      {
        config.data.append('company_guid', company_guid);
        // for (var pair of config.data.entries()) {
        //     console.log(pair[0]+ ', ' + pair[1]);
        // }
      }

      if(config.params)
      {
        //other than get method
        config.params.company_guid = company_guid;
      }
      else
      {
        //special detect for get method
        config.params = {
          company_guid: company_guid
        }
      }//close else

      // EUser and getuser for ERP Run Time
      if( config.data.params){
         var params =  config.data.params
         for (var i = 0; i < params.length; i++){
          if (params[i].set_query) {
           var set_query = params[i].set_query
              if (!set_query.EUser) {
                set_query.EUser = EUser
              }

              if (!set_query.getuser) {
                set_query.getuser = getuser
              }
            }
         }
      }



      const token = sessionStorage.getItem('access_token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    function(error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );
  var run = 0;
  // Add a response interceptor
  axios.interceptors.response.use(
    function(response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    async function(error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      const originalRequest = error.config;
      console.log('another');
      console.log(error);

      if (!error.response) {
        // Network error occurred (e.g., server is unreachable)
        console.error('Network Error:', error.message); // Log the network error message
        // Handle other network-related properties if needed (e.g., error.code for error codes)
        // Display a general network error message to the user
        return Promise.reject(error);
      }


      if (
        error.response.status === 401 &&
        originalRequest._retry == true
      ) {
        store.dispatch('login/logout').then(() => {
          // router.push('/backend_rims/login')
        });
        return Promise.reject(error);
      } else if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        console.log('get refresh token');
        console.log(error.response);
        run++;
        console.log(run);
        if(run >= 4)
        {
          var redirect_directory = app.config.globalProperties.$global_config.module;

          store.dispatch('login/logout').then(() => {
            router.push('/'+redirect_directory+'/login');
          });

        }//because cross date access token run to long already

        console.log('pre refresh token');
        await store.dispatch('login/refreshtoken')
        console.log(run)
        console.log('finish refresh token');
        // run++;

        run = 0;
        return axios(originalRequest);

      }
      return Promise.reject(error);
    }
  );

})

export { api }
