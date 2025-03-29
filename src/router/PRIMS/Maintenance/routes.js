const base_url = "/PRIMS";

const routes = [
{
    path: base_url+'/Setting/',
    component: () => import('src/layouts/PRIMS/Main.vue'),
    children: [
        { path: 'ConditionTrade', name: 'cot', component: () => import('src/pages/PRIMS/Maintenance/COT.vue') },
        { path: 'ConditionTrade/create', name: 'createCot', component: () => import('src/pages/PRIMS/Maintenance/COTCreateEdit.vue') },
        { path: 'ConditionTrade/edit', name: 'editCot', component: () => import('src/pages/PRIMS/Maintenance/COTCreateEdit.vue') },

        { path: 'Banner', name: 'banner', component: () => import('src/pages/PRIMS/Maintenance/Banner.vue') },
        { path: 'Banner/create', name: 'createBanner', component: () => import('src/pages/PRIMS/Maintenance/BannerCreateEdit.vue') },
        { path: 'Banner/edit', name: 'editBanner', component: () => import('src/pages/PRIMS/Maintenance/BannerCreateEdit.vue') },

        { path: 'Company', name: 'company', component: () => import('src/pages/PRIMS/Maintenance/Company.vue') },

        { path: 'GLCode', name: 'glcode', component: () => import('src/pages/PRIMS/Maintenance/GLCode.vue') },
        { path: 'GLCode/create', name: 'createGLCode', component: () => import('src/pages/PRIMS/Maintenance/GLCodeCreateEdit.vue') },
        { path: 'GLCode/edit', name: 'editGLCode', component: () => import('src/pages/PRIMS/Maintenance/GLCodeCreateEdit.vue') },

        { path: 'User', name: 'user', component: () => import('src/pages/PRIMS/Maintenance/User.vue') },
        { path: 'User/create', name: 'createUser', component: () => import('src/pages/PRIMS/Maintenance/UserCreateEdit.vue') },
        { path: 'User/edit', name: 'editUser', component: () => import('src/pages/PRIMS/Maintenance/UserCreateEdit.vue') },

        { path: 'UserDesignation', name: 'userDesignation', component: () => import('src/pages/PRIMS/Maintenance/UserDesignation.vue') },
        { path: 'UserDesignation/create', name: 'createUserDesignation', component: () => import('src/pages/PRIMS/Maintenance/UserDesignationCreateEdit.vue') },
        { path: 'UserDesignation/edit', name: 'editUserDesignation', component: () => import('src/pages/PRIMS/Maintenance/UserDesignationCreateEdit.vue') },

        { path: 'UserGroup', name: 'userGroup', component: () => import('src/pages/PRIMS/Maintenance/UserGroup.vue') },
        { path: 'UserGroup/create', name: 'createUserGroup', component: () => import('src/pages/PRIMS/Maintenance/UserGroupCreateEdit.vue') },
        { path: 'UserGroup/edit', name: 'editUserGroup', component: () => import('src/pages/PRIMS/Maintenance/UserGroupCreateEdit.vue') },

        { path: 'Tab', name: 'tab', component: () => import('src/pages/PRIMS/Maintenance/Tab.vue') },
        { path: 'Tab/create', name: 'createTab', component: () => import('src/pages/PRIMS/Maintenance/TabCreateEdit.vue') },
        { path: 'Tab/edit', name: 'editTab', component: () => import('src/pages/PRIMS/Maintenance/TabCreateEdit.vue') },

        { path: 'Document', name: 'document', component: () => import('src/pages/PRIMS/Maintenance/Document.vue') },
        { path: 'Document/create', name: 'createDocument', component: () => import('src/pages/PRIMS/Maintenance/DocumentCreateEdit.vue') },
        { path: 'Document/edit', name: 'editDocument', component: () => import('src/pages/PRIMS/Maintenance/DocumentCreateEdit.vue') },
    ],
}
]

export default routes
