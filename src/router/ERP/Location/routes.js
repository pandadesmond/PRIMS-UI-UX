import { get_ml_company, get_supplier } from 'src/store/ERP/Setup/getters';

const base_url = "/ERP";

const routes = [
{
    path: base_url+'/location',
    component: () => import('src/layouts/ERP/Main.vue'),
    // beforeEnter: (to, from, next) => {
    //     if(sessionStorage.getItem('authenticated')){
    //         next()
    //     } else {
    //         next('/rda/login')
    //     }
    // },
    children: [
        { path: 'continent', name: 'continent', component: () => import('src/pages/ERP/Location/ContinentCurrency.vue') },
        { path: 'currency', name: 'currency', component: () => import('src/pages/ERP/Location/ContinentCurrency.vue') },
        { path: 'countryhierarchy', name: 'countryhierarchy', component: () => import('src/pages/ERP/Location/CountryHierarchy.vue') },
        { path: 'outletlocation', name: 'outletlocation', component: () => import('src/pages/ERP/Location/OutletLocation.vue') },
    ]
}
]

export default routes
