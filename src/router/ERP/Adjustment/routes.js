import { get_ml_company, get_supplier } from 'src/store/ERP/Setup/getters';

const base_url = "/ERP";

const routes = [
{
    path: base_url+'/adjustment',
    component: () => import('src/layouts/ERP/Main.vue'),
    // beforeEnter: (to, from, next) => {
    //     if(sessionStorage.getItem('authenticated')){
    //         next()
    //     } else {
    //         next('/rda/login')
    //     }
    // },
    children: [
        { path: 'adjustment', name: 'Adjustment', component: () => import('src/pages/ERP/Adjustment/Main.vue') },
        { path: 'createadjustment', name: 'CreateAdjustment', component: () => import('src/pages/ERP/Adjustment/CreateEditAdjust.vue') },
        { path: 'editadjustment', name: 'EditAdjustment', component: () => import('src/pages/ERP/Adjustment/CreateEditAdjust.vue') },
        { path: 'viewadjustment', name: 'ViewAdjustment', component: () => import('src/pages/ERP/Adjustment/ViewAdjustment.vue') },
        { path: 'createadjustmentdetails', name: 'CreateAdjustmentDetails', component: () => import('src/pages/ERP/Adjustment/CreateEditAdjchild.vue') },
        { path: 'editadjustmentdetails', name: 'EditAdjustmentDetails', component: () => import('src/pages/ERP/Adjustment/CreateEditAdjchild.vue') },
        { path: 'adjconfirm', name: 'AdjConfirm', component: () => import('src/pages/ERP/Adjustment/Confirm.vue') },
      ]
}
]

export default routes
