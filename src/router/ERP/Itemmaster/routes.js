const base_url = "/ERP";

const itemMasterRoutes = [
  {
    path: base_url + '/itemmaster',
    component: () => import('src/layouts/ERP/Main.vue'),
    children: [
      { 
        path: 'Itemmaster', 
        name: 'Itemmaster', 
        component: () => import('src/pages/ERP/Itemmaster/Itemmaster.vue'),
        meta: {
          breadcrumb: [
            { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' },
            { label: 'Item Master', icon: 'item_master', to: base_url + '/itemmaster/Itemmaster' }
          ]
        }
      },
      { 
        path: 'createitemmaster', 
        name: 'CreateItemmaster', 
        component: () => import('src/pages/ERP/Itemmaster/CreateEditIM.vue'),
        meta: {
          breadcrumb: [
            { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' },
            { label: 'Item Master', icon: 'item_master', to: base_url + '/itemmaster/Itemmaster' },
            { label: 'New Item Master', to: base_url + '/itemmaster/createitemmaster' }
          ]
        }
      },
      { 
        path: 'edititemmaster', 
        name: 'EditItemmaster', 
        component: () => import('src/pages/ERP/Itemmaster/CreateEditIM.vue'),
        meta: {
          breadcrumb: [
            { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' },
            { label: 'Item Master', icon: 'item_master', to: base_url + '/itemmaster/Itemmaster' },
            { label: 'Edit Item Master' }
          ]
        }
      },
      { 
        path: 'ItemmasterView', 
        name: 'ItemmasterView', 
        component: () => import('src/pages/ERP/Itemmaster/CreateEditIM.vue'),
        meta: {
          breadcrumb: [
            { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' },
            { label: 'Item Master', icon: 'item_master', to: base_url + '/itemmaster/Itemmaster' },
            { label: 'Edit Item Master' }
          ]
        }
      },
      { 
        path: 'imjconfirm', 
        name: 'IMConfirm', 
        component: () => import('src/pages/ERP/Itemmaster/Confirm.vue'),
        meta: {
          breadcrumb: [
            { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' },
            { label: 'Item Master', icon: 'item_master', to: base_url + '/itemmaster/Itemmaster' },
            { label: 'New Item Master', to: base_url + '/itemmaster/imjconfirm' }
          ]
        }
      },
      { 
        path: 'CreateEditIM_new', 
        name: 'CreateEditIM_new', 
        component: () => import('src/pages/ERP/Itemmaster/CreateEditIM_new.vue'),
        meta: {
          breadcrumb: [
            { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' },
            { label: 'Item Master', icon: 'item_master', to: base_url + '/itemmaster/CreateEditIM_new' }
          ]
        }
      },
      { 
        path: 'GridTable', 
        name: 'GridTable', 
        component: () => import('src/pages/ERP/Itemmaster/GridTable.vue'),
        meta: {
          breadcrumb: [
            { label: 'GridTable', icon: 'item_master', to: base_url + '/itemmaster/GridTable' }
          ]
        }
      },
      { 
        path: 'ExampleTable', 
        name: 'ExampleTable', 
        component: () => import('src/pages/ERP/Itemmaster/ExampleTable.vue'),
        meta: {
          breadcrumb: [
            { label: 'ExampleTable', icon: 'item_master', to: base_url + '/itemmaster/ExampleTable' }
          ]
        }
      },
      { 
        path: 'Reassign', 
        name: 'Reassign', 
        component: () => import('src/pages/ERP/Itemmaster/Reassign.vue'),
        meta: {
          breadcrumb: [
            { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' },
            { label: 'Item Master', icon: 'item_master', to: base_url + '/itemmaster/Reassign' }
          ]
        }
      },
      { 
        path: 'Reassign_all', 
        name: 'Reassign_all', 
        component: () => import('src/pages/ERP/Itemmaster/Reassign_all.vue'),
        meta: {
          breadcrumb: [
            { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' },
            { label: 'Item Master', icon: 'item_master', to: base_url + '/itemmaster/Reassign_all' }
          ]
        }
      },
      
      { 
        path: 'CreateReassignUOM', 
        name: 'CreateReassignUOM', 
        component: () => import('src/pages/ERP/Itemmaster/CreateReassignUOM.vue'),
        meta: {
          breadcrumb: [
            { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' }
          ]
        }
      },
      
      { 
        path: 'CreateReassignBulkUOM', 
        name: 'CreateReassignBulkUOM', 
        component: () => import('src/pages/ERP/Itemmaster/CreateReassignBulkUOM.vue'),
        meta: {
          breadcrumb: [
            { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' }
          ]
        }
      },
      
      { 
        path: 'CreateReassignCategory', 
        name: 'CreateReassignCategory', 
        component: () => import('src/pages/ERP/Itemmaster/CreateReassignCategory.vue'),
        meta: {
          breadcrumb: [
            { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' }
          ]
        }
      },
      
      { 
        path: 'CreateReassignBrand', 
        name: 'CreateReassignBrand', 
        component: () => import('src/pages/ERP/Itemmaster/CreateReassignBrand.vue'),
        meta: {
          breadcrumb: [
            { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' }
          ]
        }
      },
      
      { 
        path: 'CreateReassignColor', 
        name: 'CreateReassignColor', 
        component: () => import('src/pages/ERP/Itemmaster/CreateReassignColor.vue'),
        meta: {
          breadcrumb: [
            { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' }
          ]
        }
      },
      
      { 
        path: 'CreateReassignSize', 
        name: 'CreateReassignSize', 
        component: () => import('src/pages/ERP/Itemmaster/CreateReassignSize.vue'),
        meta: {
          breadcrumb: [
            { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' }
          ]
        }
      },
      
      { 
        path: 'CreateReassignItemType', 
        name: 'CreateReassignItemType', 
        component: () => import('src/pages/ERP/Itemmaster/CreateReassignItemType.vue'),
        meta: {
          breadcrumb: [
            { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' }
          ]
        }
      },
      
      { 
        path: 'CreateReassignPriceType', 
        name: 'CreateReassignPriceType', 
        component: () => import('src/pages/ERP/Itemmaster/CreateReassignPriceType.vue'),
        meta: {
          breadcrumb: [
            { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' }
          ]
        }
      },
    ]
  }
];

export default itemMasterRoutes;
