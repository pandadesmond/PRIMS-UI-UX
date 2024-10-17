const base_url = "/ERP";

const productRoutes = [
  {
    path: base_url + '/product',
    component: () => import('src/layouts/ERP/Main.vue'),
    children: [
      {
        path: 'PriceChange',
        name: 'PriceChange',
        component: () => import('src/pages/ERP/Product/PriceChange.vue'),
      },
      {
        path: 'PriceChangeDetails',
        name: 'PriceChangeDetails',
        component: () => import('src/pages/ERP/Product/PriceChangeDetails.vue'),
      },
      {
        path: 'PriceChangeDetailsView',
        name: 'PriceChangeDetailsView',
        component: () => import('src/pages/ERP/Product/PriceChangeDetails.vue'),
      },
      {
        path: 'CostChange',
        name: 'CostChange',
        component: () => import('src/pages/ERP/Product/CostChange.vue'),
      },
      {
        path: 'CostChangeDetailsView',
        name: 'CostChangeDetailsView',
        component: () => import('src/pages/ERP/Product/CostChangeDetails.vue'),
      },
      {
        path: 'CostChangeDetails',
        name: 'CostChangeDetails',
        component: () => import('src/pages/ERP/Product/CostChangeDetails.vue'),
      },


    ]
  }
];

export default productRoutes;
