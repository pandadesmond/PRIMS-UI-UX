import { get_ml_company, get_supplier } from 'src/store/ERP/Setup/getters';

const base_url = "/ERP";

const routes = [
{
    path: base_url+'/itemmaster',
    component: () => import('src/layouts/ERP/Main.vue'),
    // beforeEnter: (to, from, next) => {
    //     if(sessionStorage.getItem('authenticated')){
    //         next()
    //     } else {
    //         next('/rda/login')
    //     }
    // },
    children: [
        { path: 'Itemmaster', name: 'Itemmaster', component: () => import('src/pages/ERP/Itemmaster/Itemmaster.vue') },
        { path: 'createitemmaster', name: 'CreateItemmaster', component: () => import('src/pages/ERP/Itemmaster/CreateEditIM.vue') },
        { path: 'edititemmaster', name: 'EditItemmaster', component: () => import('src/pages/ERP/Itemmaster/CreateEditIM.vue') },
        { path: 'imjconfirm', name: 'IMConfirm', component: () => import('src/pages/ERP/Itemmaster/Confirm.vue') },
      ]
}
]

export default routes
