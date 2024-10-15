import { boot } from 'quasar/wrappers'
import axios from 'axios'
import store from "../store";
import router from "../router";

var url = '';

// fetch('config.json')
//   .then(response => {
//     if (!response.ok) {
//       return response.text().then(errorText => {
//         var status = false;
//         var new_response = {
//           status: status,
//           responseText: response.statusText, // Store the response text in a property
//         };
//         return new_response;
//       });
//     } else {
//       return response.text().then(data => {
//         var status = true;
//         var new_response = {
//           status: status,
//           responseText: data, // Store the response text in a property
//         };
//         return new_response;
//       });
//     }
//   })
//   .then(data => {
//     // Check the status property to determine success or failure
//     if (data.status) {
//       console.log(data.responseText); // Access the response text here
//       var string = data.responseText;
//       var json = JSON.parse(string);

//       if(json.url)
//       {
//         url = json.url;
//       }
      

//     } else {
//       alert(data.responseText);
//     }
//   })
//   .catch(error => {
//     alert('Error reading text file:', error);
//   });
async function setAxiosBaseURL() {
  try {
    const response = await fetch('config.json'); // Assuming 'config.json' contains the URL
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json(); // Assuming the URL is stored as a JSON property

    if (data && data.url) {
      axios.defaults.baseURL = data.url;
      console.log('axios.defaults.baseURL set to:', data.url);
    } else {
      console.error('URL not found in JSON data');
    }
  } catch (error) {
    console.error('Error reading config file:', error);
  }
}


// axios.defaults.baseURL = 'http://52.163.59.83:8000/';//RIMS cloud server
// axios.defaults.baseURL = 'https://bi.panda-eco.com:53009/';//RDA graph server
// axios.defaults.baseURL = 'http://localhost:8001/backend_rims/';
// axios.defaults.baseURL = 'http://office.panda-eco.com:53032/api/';//HONDA API testing 53032
// axios.defaults.baseURL = 'http://office.panda-eco.com:53033/api/';//HONDA API testing 53032
// axios.defaults.baseURL = 'http://office.panda-eco.com:53003/';//ERP API
// axios.defaults.baseURL = 'http://bi.panda-eco.com:53012/';//CRMDASH API
//  axios.defaults.baseURL = 'http://192.168.10.235/';//SQPQOH API
// axios.defaults.baseURL = 'http://bwycloudhq.dyndns.biz/';//SQPQOH API
// axios.defaults.baseURL = 'https://pandahq.bakewithyen.my/';//SQPQOH API
// axios.defaults.baseURL = 'https://honda.panda-eco.com:9443/';//HONDA API testing 53032
// axios.defaults.baseURL = 'https://192.168.9.45:82/';//honda nginx server
// axios.defaults.baseURL = 'https://office.panda-eco.com:9444/api/';
// axios.defaults.baseURL = 'https://104.215.158.72/api/';
// axios.defaults.baseURL = 'https://eds.honda.net.my/api/';
// axios.defaults.baseURL = 'http://office.panda-eco.com:53007/';//IMS API server
// axios.defaults.baseURL = 'http://office.panda-eco.com:53013/';//SUBLOT API
// axios.defaults.baseURL = 'http://office.panda-eco.com:53061/';//SUBLOT API
// axios.defaults.baseURL = 'http://office.panda-eco.com:53062/';//SUBLOT API
  //  axios.defaults.baseURL = 'http://office.panda-eco.com:53009/'; // CTSDASH API
// axios.defaults.baseURL = 'https://crm103.panda-eco.com/'; // PROMO API
  //  axios.defaults.baseURL = 'https://crm.panda-eco.com/'; // PROMO API


// axios.defaults.baseURL = 'http://office.panda-eco.com:53001'; //STPL API

// axios.defaults.baseURL = 'http://192.168.8.185:8000/';//RDA graph server
// axios.defaults.baseURL = 'http://bi.panda-eco.com:53014/';//RDA graph server
// axios.defaults.baseURL = 'http://192.168.9.246:53006/';//WRP graph server
// axios.defaults.baseURL = 'http://office.panda-eco.com:53006/';//WRP graph server
// axios.defaults.baseURL = 'http://batarasazure.dyndns.biz:53301/';//WRP graph server

//------------------------------------------------------------------------------function for FNB//
// var original_ip = "192.168.9.61:8085";
// var text_ip = original_ip;

// function setIP()
// {
//   var original_ip = "192.168.9.61:8085";
//   var ipconfig = sessionStorage.getItem("set_IP");

//   if(!ipconfig)
//   {
//     var text_ip = "";
//     var ipconfig_set = prompt("Please enter your IP:", text_ip);

//     if (ipconfig_set == null || ipconfig_set == "")
//     {
//       var text_ip = original_ip;
//       setIP();
//       return;
//     }
//     else
//     {
//       var text_ip = ipconfig_set;
//     }
//   }
//   else
//   {
//     var text_ip = ipconfig;
//   }

//   sessionStorage.setItem("set_IP",text_ip);
//   axios.defaults.baseURL = 'http://'+text_ip+'/';
// }

// setIP();
//------------------------------------------------------------------------------//

//FNB API testing
// axios.defaults.baseURL = 'http://192.168.43.154:8085/';//FNB API testing

// axios.defaults.baseURL = 'http://172.168.40.46:8085/';//FNB API QRA


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
      // sessionStorage.setItem('access_token', 'dfs');
      // sessionStorage.setItem('refresh_token', 'dfs');
      // Do something before request is sent

      //currently doesnt have login authetication yet
      // if(config.url != "http://bi.panda-eco.com:53010/update_user")
      // {

          // var customer_guid = "user_connection";
          // var customer_guid = sessionStorage.getItem('customer_guid');
          // var user_guid = sessionStorage.getItem('user_guid');

          // if(config.data == undefined)
          // {
          //   config.data = {
          //     "SetPath": customer_guid,
          //     "user_guid": user_guid,
          //     "chosen_outlet": [],
          //   };
          // }
          // else
          // {
          //   config.data.SetPath = customer_guid;
          //   config.data.user_guid = user_guid;
          //   config.data.chosen_outlet = [];
          // }

          // var customer_guid = "user_connection";
          // var customer_guid = "EFC5E5ABFC4B11E99950DED0BD1483FD";//crmdashboard bataras
          var customer_guid = sessionStorage.getItem('customer_guid');
          var user_guid = sessionStorage.getItem('user_guid');

          if(config.data == undefined)
          {
            config.data = {
              "SetPath": customer_guid,
              "user_guid": user_guid,
              "chosen_outlet": [],
              "sub_dept_code": [],
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

          }

      // }
      // console.log(config);
      // config.headers.test = 'fafa';

      //session user_guid for HONDA

      // if(config.data instanceof FormData)
      // {
      //   config.data.append('Triggerby', user_guid);
      //   // for (var pair of config.data.entries()) {
      //   //     console.log(pair[0]+ ', ' + pair[1]);
      //   // }
      // }

      // const user_guid = sessionStorage.getItem('user_guid')
      // if(config.params)
      // {
      //   //other than get method
      //   config.params.Triggerby = user_guid;
      // }
      // else
      // {
      //   //special detect for get method
      //   config.params = {
      //     Triggerby: user_guid
      //   }
      // }//close else


    //  config.headers['X-API-key'] = '5d5b5c8b38fb6b3d3e14d1202b90c919'; // FOR STPL API



      const token = sessionStorage.getItem('access_token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        //request body for RDA
        // if(config.data == undefined)
        // {
        //   config.data = {
        //     "SetPath": "user_connection"
        //   };
        // }
        // else
        // {
        //   config.data.SetPath = "user_connection";
        // }

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
           var redirect_directory = 'rda';
            // var redirect_directory = 'crmdash';
              // var redirect_directory = 'backend_rims';
            // var redirect_directory = 'honda';
            // var redirect_directory = 'sublot';
            // var redirect_directory = 'ims';
            // var redirect_directory = 'generaltp';
            //  var redirect_directory = 'ctsdash'
            // var redirect_directory = 'promo';
            // var redirect_directory = 'stpl';
            store.dispatch('login/logout').then(() => {
              router.push('/'+redirect_directory+'/login');
            });

        }//because cross date access token run to long already

        // if(error.response.code || error.response.data)
        // {
        //   console.log('gg');
        //   if(error.response.code == "token_not_valid" || error.response.data.code == "token_not_valid")
        //   {
        //     // var redirect_directory = 'crmdash';
        //     var redirect_directory = 'backend_rims';
        //     // var redirect_directory = 'honda';
        //     // var redirect_directory = 'sublot';
        //     // var redirect_directory = 'ims';
        //     // var redirect_directory = 'generaltp';
        //     store.dispatch('login/logout').then(() => {
        //       router.push('/'+redirect_directory+'/login');
        //     });
        //     return;
        //   }
        //   else
        //   {
        //     await store.dispatch('login/refreshtoken')
        //     return axios(originalRequest);
        //   }
        // }
        // else
        // {
          console.log('pre refresh token');
          await store.dispatch('login/refreshtoken')
          console.log(run)
          console.log('finish refresh token');
          // run++;

          run = 0;
          return axios(originalRequest);
        // }


        // return axios(originalRequest);
      }
      return Promise.reject(error);
    }
  );
  
  // Call the function to set Axios base URL
  // await setAxiosBaseURL();
})

export { api }
