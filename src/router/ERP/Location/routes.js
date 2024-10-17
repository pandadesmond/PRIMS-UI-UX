import { get_ml_company, get_supplier } from 'src/store/ERP/Setup/getters';

const base_url = "/ERP";

const locationRoutes = [
  {
    path: base_url + '/location',
    component: () => import('src/layouts/ERP/Main.vue'),
    children: [
      { 
        path: 'continent', 
        name: 'continent', 
        component: () => import('src/pages/ERP/Location/ContinentCurrency.vue'),
        meta: {
          // breadcrumb: [
          //   { label: 'Home', to: '/' },
          //   { label: 'Location', to: base_url + '/location' },
          //   { label: 'Continent', to: base_url + '/location/continent' }
          // ]
        }
      },
      { 
        path: 'currency', 
        name: 'currency', 
        component: () => import('src/pages/ERP/Location/ContinentCurrency.vue'),
        meta: {
          // breadcrumb: [
          //   { label: 'Home', to: '/' },
          //   { label: 'Location', to: base_url + '/location' },
          //   { label: 'Currency', to: base_url + '/location/currency' }
          // ]
        }
      },
      { 
        path: 'countryhierarchy', 
        name: 'countryhierarchy', 
        component: () => import('src/pages/ERP/Location/CountryHierarchy.vue'),
        meta: {
          // breadcrumb: [
          //   { label: 'Home', to: '/' },
          //   { label: 'Location', to: base_url + '/location' },
          //   { label: 'Country Hierarchy', to: base_url + '/location/countryhierarchy' }
          // ]
        }
      },
      { 
        path: 'outletlocation', 
        name: 'outletlocation', 
        component: () => import('src/pages/ERP/Location/OutletLocation.vue'),
        meta: {
          breadcrumb: [
            { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' }
          ]
        }
      },
    ]
  }
]

export default locationRoutes;