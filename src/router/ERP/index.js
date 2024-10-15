import setup_route from 'src/router/ERP/Setup/routes.js'
import login_route from 'src/router/ERP/Login/routes.js'
import item_route from 'src/router/ERP/Item/routes.js'
import location_route from 'src/router/ERP/Location/routes.js'
import purchase_route from 'src/router/ERP/Purchase/routes.js'
import sales_route from 'src/router/ERP/Sales/routes.js'
import adjust_route from 'src/router/ERP/Adjustment/routes.js'
import itemmaster_route from 'src/router/ERP/Itemmaster/routes.js'
import document_route from 'src/router/ERP/Document/routes.js'


var routes = [
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('src/pages/ERP/Login/Login.vue')
  }
]

routes = routes.concat(setup_route);
routes = routes.concat(login_route);
routes = routes.concat(item_route);
routes = routes.concat(location_route);
routes = routes.concat(purchase_route);
routes = routes.concat(sales_route);
routes = routes.concat(adjust_route);
routes = routes.concat(itemmaster_route);
routes = routes.concat(document_route);

export default routes
