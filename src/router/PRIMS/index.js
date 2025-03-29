import login_route from 'src/router/PRIMS/Login/routes.js'
import tta_route from 'src/router/PRIMS/TTA/routes.js'
import maintenance_route from 'src/router/PRIMS/Maintenance/routes.js'
import transaction_route from 'src/router/PRIMS/Transaction/routes.js'
import edc_route from 'src/router/PRIMS/Claim/routes.js'

var routes = [
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('src/pages/PRIMS/Login/Login.vue')
  }
]

routes = routes.concat(login_route);
routes = routes.concat(tta_route);
routes = routes.concat(maintenance_route);
routes = routes.concat(transaction_route);
routes = routes.concat(edc_route);

export default routes
