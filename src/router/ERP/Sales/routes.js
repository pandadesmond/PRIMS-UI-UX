import { get_ml_company, get_supplier } from 'src/store/ERP/Setup/getters';

const base_url = "/ERP";

const routes = [
{
    path: base_url+'/sales',
    component: () => import('src/layouts/ERP/Main.vue'),
    // beforeEnter: (to, from, next) => {
    //     if(sessionStorage.getItem('authenticated')){
    //         next()
    //     } else {
    //         next('/rda/login')
    //     }
    // },
    children: [
        { path: 'salesorder', name: 'SalesOrder', component: () => import('src/pages/ERP/Sales/Transmain.vue') },
        { path: 'createsalesorder', name: 'CreateSalesOrder', component: () => import('src/pages/ERP/Sales/CreateEditSO.vue') },
        { path: 'editsalesorder', name: 'EditSalesOrder', component: () => import('src/pages/ERP/Sales/CreateEditSO.vue') },
        { path: 'viewsalesorder', name: 'ViewSalesOrder', component: () => import('src/pages/ERP/Sales/ViewSO.vue') },
        { path: 'createsalesorderdetails', name: 'CreateSalesOrderDetails', component: () => import('src/pages/ERP/Sales/CreateEditSOchild.vue') },
        { path: 'editsalesorderdetails', name: 'EditSalesOrderDetails', component: () => import('src/pages/ERP/Sales/CreateEditSOchild.vue') },
        { path: 'salesinvoice', name: 'SalesInvoice', component: () => import('src/pages/ERP/Sales/Transmain.vue') },
        { path: 'simpleinvoice', name: 'SimpleInvoice', component: () => import('src/pages/ERP/Sales/SimpleInvoice.vue') },
        { path: 'createsalesinvoice', name: 'CreateSalesInvoice', component: () => import('src/pages/ERP/Sales/SimpleInvoice.vue') },
        { path: 'editsalesinvoice', name: 'EditSalesInvoice', component: () => import('src/pages/ERP/Sales/CreateEditInvoice.vue') },
        { path: 'createsalesinvoicedetails', name: 'CreateSalesInvoiceDetails', component: () => import('src/pages/ERP/Sales/CreateEditSIchild.vue') },
        { path: 'editsalesinvoicedetails', name: 'EditSalesInvoiceDetails', component: () => import('src/pages/ERP/Sales/CreateEditSIchild.vue') },
        { path: 'viewsalesinvoice', name: 'ViewSalesInvoice', component: () => import('src/pages/ERP/Sales/ViewSI.vue') },
        { path: 'salesconfirm', name: 'SalesConfirm', component: () => import('src/pages/ERP/Sales/Confirm.vue') },
    ]
}
]

export default routes
