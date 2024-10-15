import { boot } from 'quasar/wrappers'


import pluginsTableParams from 'src/plugins/ERP/pluginsTableParams';

//VUEX
import dispatch from 'src/plugins/VUEX/dispatch.js';
import actions from 'src/plugins/VUEX/actions.js';

//LANGUAGE
import language from 'src/plugins/LANGUAGE/language.js';

export default boot(async ({app}/* { app, router, ... } */) => {
  // something to do
  // app.use(foo);

  app.config.globalProperties.$pluginsTableParams = pluginsTableParams


  //IMS
  app.config.globalProperties.$dispatch = dispatch
  app.config.globalProperties.$actions = actions

  app.config.globalProperties.$language = language

})
