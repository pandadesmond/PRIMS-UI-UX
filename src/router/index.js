import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'

import routes from './PRIMS'

import store from 'src/store'
import axios from 'axios'
/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE)
  })

  //checking for force logout for HONDA only
  //checking for force logout for HONDA only
  Router.beforeEach(async (to, from, next) => {
    // console.log(to.path);
    if(to.path.includes('/PRIMS/Login') || to.path == '/')
    {
      next();
      return;
    }
    else
    {
      var authenticated = localStorage.getItem("authenticated") != "" && localStorage.getItem("authenticated") != "null" && localStorage.getItem("authenticated") != null ? (localStorage.getItem("authenticated") == 1 ? true : false) : false;
      // var company_guid = localStorage.getItem("company_guid") != "" && localStorage.getItem("company_guid") != "null" && localStorage.getItem("company_guid") != null ? true : false;
      if(authenticated)
      {
        console.log('authenticated user');
        if(to.path.includes('/Transaction/') || to.path.includes('/Setting/'))
        {
          if(sessionStorage.getItem('tta_payload'))
          {
            sessionStorage.removeItem('tta_payload')
          }
        }
        next();
      }
      else
      {
        console.log('unauthenticated user');
        await store().dispatch('login/logout')
        
        next('/');
      }
      return;
    }

  //   var online_version = '';

  //   var payload = {
  //       params: {
  //           setting_key__in: 'web_version'
  //       }
  //   };

  //   await store().dispatch('login/trigger_get_setting_return', payload).then(async (response) => {

  //     var data = response;
  //     var status = response.status;

  //     if(status == "success")
  //     {
  //     //   var results = data.response.data.setting.filter((entry)=>{
  //     //     return entry.setting_key == 'web_version';
  //     //   });
  //       var results = data.response.data.results.filter((entry)=>{
  //         return entry.setting_module == 'version';
  //       });

  //       if(results.length > 0)
  //       {
  //         // current_version = results[0].setting_value;
  //         // console.log(results[0].setting_value);
  //         online_version = results[0].setting_value;
  //       }
  //       else
  //       {
  //         alert('Cannot check version. Please try again.');
  //         await store().dispatch('login/logout')
  //         sessionStorage.setItem('forceReload', 1);
  //         next('/sublot/login')
  //         return;
  //       }

  //     }

  //   });

  //   var current_version = '1.0.0';
  //   sessionStorage.setItem('current_version', current_version);
  //   sessionStorage.setItem('online_version', online_version);
  //   var current_module = 'sublot';
    
   
  //   if(current_version != online_version)
  //   {
  //     next();
  //     location.reload();

  //     return;
  //   }
  //   else
  //   {
  //     next();
  //     // var authenticated = localStorage.getItem("authenticated") != "" && localStorage.getItem("authenticated") != "null" && localStorage.getItem("authenticated") != null ? (localStorage.getItem("authenticated") == 1 ? true : false) : false;
  //     // if(authenticated)
  //     // {
  //     //   console.log('hha');
  //     //   next();
  //     // }
  //     // else
  //     // {

  //     //   if(to.path.includes('/sublot/Overview/AgreementList'))
  //     //   {
  //     //     next();
  //     //     return;
  //     //   }

  //     //   await store().dispatch('login/logout')
  //     //   next('/sublot/login');
  //     // }
  //   }//close if else checking

    return;

  })


  return Router
})
