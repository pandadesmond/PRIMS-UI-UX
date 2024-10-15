import { get_ml_company, get_supplier } from 'src/store/ERP/Setup/getters';

const base_url = "/ERP";

const routes = [
{
    path: base_url+'/item',
    component: () => import('src/layouts/ERP/Main.vue'),
    // beforeEnter: (to, from, next) => {
    //     if(sessionStorage.getItem('authenticated')){
    //         next()
    //     } else {
    //         next('/rda/login')
    //     }
    // },
    children: [
        { path: 'itemmaster', component: () => import('src/pages/ERP/Item/Itemmaster.vue') },
        { path: 'assorted', name: 'assorted', component: () => import('src/pages/ERP/Item/AssortedMainChild.vue') },
    ]
}
]

export default routes
