const base_url = "/PRIMS";

const routes = [
{
    path: base_url+'/Claim/',
    component: () => import('src/layouts/PRIMS/Main.vue'),
    children: [
        { path: 'EDC', name: 'edc', component: () => import('src/pages/PRIMS/Claim/Claim.vue') },
        { path: 'EDC/create', name: 'createEDC', component: () => import('src/pages/PRIMS/Claim/ClaimCreateEdit.vue') },
        { path: 'EDC/edit', name: 'editEDC', component: () => import('src/pages/PRIMS/Claim/ClaimCreateEdit.vue') },
        { path: 'PD', name: 'pd', component: () => import('src/pages/PRIMS/Claim/Claim.vue') },
        { path: 'PD/create', name: 'createPD', component: () => import('src/pages/PRIMS/Claim/ClaimCreateEdit.vue') },
        { path: 'PD/edit', name: 'editPD', component: () => import('src/pages/PRIMS/Claim/ClaimCreateEdit.vue') },
        { 
            path: 'print', 
            children: [
                { path: 'agreement', name: 'printAgreement', component: () => import('src/pages/PRIMS/Claim/AgreementPrintView.vue') },
                { path: 'invoice', name: 'printClaimInvoice', component: () => import('src/pages/PRIMS/Claim/InvoicePrintView.vue') },
            ]
        },
    ],
}
]

export default routes
