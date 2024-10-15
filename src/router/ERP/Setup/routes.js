import { get_ml_company, get_supplier } from 'src/store/ERP/Setup/getters';

const base_url = "/ERP";

const routes = [
{
    path: base_url+'/setup',
    component: () => import('src/layouts/ERP/Main.vue'),
    // beforeEnter: (to, from, next) => {
    //     if(sessionStorage.getItem('authenticated')){
    //         next()
    //     } else {
    //         next('/rda/login')
    //     }
    // },
    children: [
        { path: 'Component', component: () => import('src/pages/ERP/Setup/Component.vue') },


        { path: 'PaymentTerm', component: () => import('src/pages/ERP/Setup/PaymentTerm.vue') },
        { path: 'ReasonCode', component: () => import('src/pages/ERP/Setup/ReasonCode.vue') },
        { path: 'SurchargeDiscountCode', component: () => import('src/pages/ERP/Setup/SurchargeDiscountCode.vue') },
        { path: 'Location', component: () => import('src/pages/ERP/Setup/Location.vue') },
        { path: 'Location/Details', name:'Location/Details',component: () => import('src/pages/ERP/Setup/LocationDetails.vue') },
        { path: 'SystemUser', component: () => import('src/pages/ERP/Setup/SystemUser.vue') },
        { path: 'SystemUser/Details', name:'SystemUser/Details', component: () => import('src/pages/ERP/Setup/SystemUserDetails.vue') },

        { path: 'CompanyProfileBackup', component: () => import('src/pages/ERP/Setup/CompanyProfileBackup.vue') },
        { path: 'CompanyProfileBackup_2', component: () => import('src/pages/ERP/Setup/CompanyProfileBackup_2.vue') },
        { path: 'CompanyProfileBackup_3', component: () => import('src/pages/ERP/Setup/CompanyProfileBackup_3.vue') },
        { path: 'CompanyProfileBackup_4', component: () => import('src/pages/ERP/Setup/CompanyProfileBackup_4.vue') },
        { path: 'CompanyProfile/details', name:"CompanyProfile/details", component: () => import('src/pages/ERP/Setup/CompanyProfileDetails.vue') },
        { path: 'CompanyProfileBackup/details', name:"CompanyProfileBackup/details", component: () => import('src/pages/ERP/Setup/CompanyProfileDetails.vue') },
        { path: 'CompanyProfileBackup_2/details', name:"CompanyProfileBackup_2/details", component: () => import('src/pages/ERP/Setup/CompanyProfileDetails.vue') },
        { path: 'CompanyProfileBackup_3/details', name:"CompanyProfileBackup_3/details", component: () => import('src/pages/ERP/Setup/CompanyProfileDetails.vue') },
        { path: 'Currency', component: () => import('src/pages/ERP/Setup/Currency.vue') },
        { path: 'Weighing', component: () => import('src/pages/ERP/Setup/Weighing.vue') },
        { path: 'Supplier', name: "Supplier", component: () => import('src/pages/ERP/Setup/Supplier.vue') },
        { path: 'Supplier/details/2', name:"Supplier/details/2", component: () => import('src/pages/ERP/Setup/SupplierDetails2.vue') },
        { path: 'Supplier/view/details', name:"Supplier/view/details", component: () => import('src/pages/ERP/Setup/SupplierViewDetails.vue') },
        { path: 'Supplier/details', name:"Supplier/details", component: () => import('src/pages/ERP/Setup/SupplierDetails.vue') },

        { path: 'Branch', component: () => import('src/pages/ERP/Setup/Branch.vue') },
        { path: 'Branch/Details',name: "BranchDetails", component: () => import('src/pages/ERP/Setup/BranchDetails.vue') },
        { path: 'GstTaxCode', component: () => import('src/pages/ERP/Setup/GstTaxCode.vue') },
        { path: 'GstTaxCode_2', component: () => import('src/pages/ERP/Setup/GstTaxCode_2.vue') },
        { path: 'SystemAccessRight', component: () => import('src/pages/ERP/Setup/SystemAccessRight.vue') },
        { path: 'SystemAccessRight_2', component: () => import('src/pages/ERP/Setup/SystemAccessRight_2.vue') },
        { path: 'Division/Details',name: "DivisionDetails", component: () => import('src/pages/ERP/Setup/DivisionDetails.vue') },

        // New
        { path: 'companylist', component: () => import('src/pages/ERP/SetupNew/CompanyList.vue') },
        { path: 'companyprofile', component: () => import('src/pages/ERP/SetupNew/CompanyProfile.vue') },
        { path: 'divisionhierarchy', name: 'divisionhierarchy', component: () => import('src/pages/ERP/SetupNew/DivisionHierarchy.vue') },
        { path: 'uom', name: 'uom', component: () => import('src/pages/ERP/SetupNew/UOMVariantSizeOriginWeightType.vue') },
        { path: 'variant', name: 'variant', component: () => import('src/pages/ERP/SetupNew/UOMVariantSizeOriginWeightType.vue') },
        { path: 'manufacturerhierarchy', name: 'manufacturerhierarchy', component: () => import('src/pages/ERP/SetupNew/ManufacturerHierarchyNew.vue') },
        { path: 'size', name: 'size', component: () => import('src/pages/ERP/SetupNew/UOMVariantSizeOriginWeightType.vue') },
        { path: 'origin', name: 'origin', component: () => import('src/pages/ERP/SetupNew/UOMVariantSizeOriginWeightType.vue') },
        { path: 'weight_type', name: 'weight_type', component: () => import('src/pages/ERP/SetupNew/UOMVariantSizeOriginWeightType.vue') },
    ]
}
]

export default routes
