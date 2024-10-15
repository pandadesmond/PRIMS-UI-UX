import { get_ml_company, get_supplier } from 'src/store/ERP/Setup/getters';

const base_url = "/ERP";

const routes = [
{
    path: base_url+'/document',
    component: () => import('src/layouts/ERP/Main.vue'),
    // beforeEnter: (to, from, next) => {
    //     if(sessionStorage.getItem('authenticated')){
    //         next()
    //     } else {
    //         next('/rda/login')
    //     }
    // },
    children: [
        { path: 'outlet', name: 'Outlet', component: () => import('src/pages/ERP/Document/Outlet.vue') },
      ]
}
]

export default routes
