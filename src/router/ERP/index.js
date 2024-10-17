import setup_route from 'src/router/ERP/Setup/routes.js'
import login_route from 'src/router/ERP/Login/routes.js'
import item_route from 'src/router/ERP/Item/routes.js'
import location_route from 'src/router/ERP/Location/routes.js'
import purchase_route from 'src/router/ERP/Purchase/routes.js'
import sales_route from 'src/router/ERP/Sales/routes.js'
import adjust_route from 'src/router/ERP/Adjustment/routes.js'
import itemmaster_route from 'src/router/ERP/Itemmaster/routes.js'
import document_route from 'src/router/ERP/Document/routes.js'
import product_route from 'src/router/ERP/Product/routes.js'

// setup2
import setup2_route from 'src/router/ERP/Setup2/routes.js'

import configuration_route from 'src/router/ERP/Configuration/routes.js'
import inventory_route from 'src/router/ERP/Inventory/routes.js'

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

// setup2
routes = routes.concat(setup2_route);
routes = routes.concat(product_route);
routes = routes.concat(configuration_route);
routes = routes.concat(inventory_route);

export default routes
