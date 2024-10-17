const base_url = "/ERP";

const routes = [
{
    path: base_url+'/configuration',
    component: () => import('src/layouts/ERP/Main.vue'),
    // beforeEnter: (to, from, next) => {
    //     if(sessionStorage.getItem('authenticated')){
    //         next()
    //     } else {
    //         next('/rda/login')
    //     }
    // },
    children: [
        { path: 'ReassignItemType', name: 'ReassignItemType', component: () => import('src/pages/ERP/Configuration/ReassignMaster.vue') }, // Master
        { path: 'ReassignItemTypeEdit', name: 'ReassignItemTypeEdit', component: () => import('src/pages/ERP/Configuration/ReassignDetail.vue') }, // AP Supplier (Vendor page)
        { path: 'ReassignItemTypeView', name: 'ReassignItemTypeView', component: () => import('src/pages/ERP/Configuration/ReassignDetail.vue') }, // AP Supplier (Vendor page)
        { path: 'ReassignItemTypeCreate', name: 'ReassignItemTypeCreate', component: () => import('src/pages/ERP/Configuration/ReassignDetail.vue') }, // AP Supplier (Vendor page)

    ]
}
]

export default routes
