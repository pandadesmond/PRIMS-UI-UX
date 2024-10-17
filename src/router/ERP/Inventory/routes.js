const base_url = "/ERP";

const routes = [
{
    path: base_url+'/inventory',
    component: () => import('src/layouts/ERP/Main.vue'),
    // beforeEnter: (to, from, next) => {
    //     if(sessionStorage.getItem('authenticated')){
    //         next()
    //     } else {
    //         next('/rda/login')
    //     }
    // },
    children: [
        { path: 'FlowThrough', name: 'FlowThrough', component: () => import('src/pages/ERP/Inventory/FlowThrough.vue') }, // Master
        { path: 'FlowThroughEdit', name: 'FlowThroughEdit', component: () => import('src/pages/ERP/Inventory/FlowThroughDetail.vue') }, // AP Supplier (Vendor page)
        { path: 'FlowThroughView', name: 'FlowThroughView', component: () => import('src/pages/ERP/Inventory/FlowThroughDetail.vue') }, // AP Supplier (Vendor page)
        { path: 'FlowThroughCreate', name: 'FlowThroughCreate', component: () => import('src/pages/ERP/Inventory/FlowThroughDetail.vue') }, // AP Supplier (Vendor page)

    ]
}
]

export default routes
