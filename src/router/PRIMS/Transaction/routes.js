const base_url = "/PRIMS";

const routes = [
{
    path: base_url+'/Transaction/',
    component: () => import('src/layouts/PRIMS/Main.vue'),
    children: [
        { path: 'Invoice', name: 'invoice', component: () => import('src/pages/PRIMS/Transaction/Invoice.vue') },
        { path: 'Invoice/create', name: 'createInvoice', component: () => import('src/pages/PRIMS/Transaction/InvoiceCreateEdit.vue')},
        { path: 'Invoice/edit', name: 'editInvoice', component: () => import('src/pages/PRIMS/Transaction/InvoiceCreateEdit.vue')},
        { path: 'Invoice/print', name: 'printInvoice', component: () => import('src/pages/PRIMS/Transaction/InvoicePrint.vue') },
        { path: 'CN', name: 'cn', component: () => import('src/pages/PRIMS/Transaction/CNDN.vue') },
        { path: 'CN/create', name: 'createCN', component: () => import('src/pages/PRIMS/Transaction/CNDNCreateEdit.vue') },
        { path: 'CN/edit', name: 'editCN', component: () => import('src/pages/PRIMS/Transaction/CNDNCreateEdit.vue') },
        { path: 'CN/print', name: 'printCN', component: () => import('src/pages/PRIMS/Transaction/CNDNPrint.vue') },
        { path: 'DN', name: 'dn', component: () => import('src/pages/PRIMS/Transaction/CNDN.vue') },
        { path: 'DN/create', name: 'createDN', component: () => import('src/pages/PRIMS/Transaction/CNDNCreateEdit.vue') },
        { path: 'DN/edit', name: 'editDN', component: () => import('src/pages/PRIMS/Transaction/CNDNCreateEdit.vue') },
        { path: 'DN/print', name: 'printDN', component: () => import('src/pages/PRIMS/Transaction/CNDNPrint.vue') },
    ],
}
]

export default routes
