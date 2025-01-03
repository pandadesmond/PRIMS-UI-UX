const base_url = "/PRIMS";

const routes = [
{
    path: base_url+'/TTA/',
    component: () => import('src/layouts/PRIMS/Main.vue'),
    children: [
        { path: '', name: 'tta', component: () => import('src/pages/PRIMS/TTA/TTA.vue') },
        { path: 'create', name: 'createTTA', component: () => import('src/pages/PRIMS/TTA/TTACreateEdit.vue') },
        { path: 'edit', name: 'editTTA', component: () => import('src/pages/PRIMS/TTA/TTACreateEdit.vue') },
        { path: 'print', name: 'printTTA', component: () => import('src/pages/PRIMS/TTA/PrintView.vue') },
    ],
}
]

export default routes
