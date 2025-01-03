import { boot } from 'quasar/wrappers'


import pluginsTableParams from 'src/plugins/PRIMS/pluginsTableParams';
import pluginsRimsFormatNumber from 'src/plugins/PRIMS/pluginsRimsFormatNumber.js';
import pluginsRimsFormatNumberKeyup from 'src/plugins/PRIMS/pluginsRimsFormatNumberKeyup.js';

//VUEX
import dispatch from 'src/plugins/VUEX/dispatch.js';
import actions from 'src/plugins/VUEX/actions.js';

//LANGUAGE
import language from 'src/plugins/LANGUAGE/language.js';

export default boot(async ({app}/* { app, router, ... } */) => {
  // something to do
  // app.use(foo);

  app.config.globalProperties.$pluginsTableParams = pluginsTableParams
  app.config.globalProperties.$pluginsRimsFormatNumber = pluginsRimsFormatNumber
  app.config.globalProperties.$pluginsRimsFormatNumberKeyup = pluginsRimsFormatNumberKeyup


  //IMS
  app.config.globalProperties.$dispatch = dispatch
  app.config.globalProperties.$actions = actions

  app.config.globalProperties.$language = language

})
