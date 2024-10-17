import { get_ml_company, get_supplier } from 'src/store/ERP/Setup/getters';

const base_url = "/ERP";

const routes = [
{
    path: base_url+'/setup2',
    component: () => import('src/layouts/ERP/Main.vue'),
    // beforeEnter: (to, from, next) => {
    //     if(sessionStorage.getItem('authenticated')){
    //         next()
    //     } else {
    //         next('/rda/login')
    //     }
    // },
    children: [
        { path: 'companyprofile', name:'companyprofile', component: () => import('src/pages/ERP/Setup2/CompanyProfile.vue') },

        { path: 'currency', name:'currency', component: () => import('src/pages/ERP/Setup2/Currency.vue') },
        {
          path: 'createcurrency',
          name: 'CreateCurrency',
          component: () => import('src/pages/ERP/Setup2/CreateEditIMCurrency.vue'),
          meta: {
            breadcrumb: [
              { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' },
              { label: 'Item Master', icon: 'item_master', to: base_url + '/itemmaster/Itemmaster' },
              { label: 'New Item Master', to: base_url + '/itemmaster/createitemmaster' }
            ]
          }
        },
        {
          path: 'editcurrency',
          name: 'EditCurrency',
          component: () => import('src/pages/ERP/Setup2/CreateEditIMCurrency.vue'),
          meta: {
            breadcrumb: [
              { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' },
              { label: 'Item Master', icon: 'item_master', to: base_url + '/itemmaster/Itemmaster' },
              { label: 'Edit Item Master' }
            ]
          }
        },

        { path: 'weighingtypemoduleassignment', name:'weighingtypemoduleassignment', component: () => import('src/pages/ERP/Setup2/WeighingTypeModuleAssignment.vue') },
        {
          path: 'createweighingtypemoduleassignment',
          name: 'CreateWeighingTypeModuleAssignment',
          component: () => import('src/pages/ERP/Setup2/CreateEditIMWeighingTypeModuleAssignment.vue'),
          meta: {
            breadcrumb: [
              { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' },
              { label: 'Item Master', icon: 'item_master', to: base_url + '/itemmaster/Itemmaster' },
              { label: 'New Item Master', to: base_url + '/itemmaster/createitemmaster' }
            ]
          }
        },
        {
          path: 'editweighingtypemoduleassignment',
          name: 'EditWeighingTypeModuleAssignment',
          component: () => import('src/pages/ERP/Setup2/CreateEditIMWeighingTypeModuleAssignment.vue'),
          meta: {
            breadcrumb: [
              { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' },
              { label: 'Item Master', icon: 'item_master', to: base_url + '/itemmaster/Itemmaster' },
              { label: 'Edit Item Master' }
            ]
          }
        },

        { path: 'paymentterm', name:'paymentterm', component: () => import('src/pages/ERP/Setup2/PaymentTerm.vue') },
        {
          path: 'createpaymentterm',
          name: 'CreatePaymentTerm',
          component: () => import('src/pages/ERP/Setup2/CreateEditIMPaymentTerm.vue'),
          meta: {
            breadcrumb: [
              { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' },
              { label: 'Item Master', icon: 'item_master', to: base_url + '/itemmaster/Itemmaster' },
              { label: 'New Item Master', to: base_url + '/itemmaster/createitemmaster' }
            ]
          }
        },
        {
          path: 'editpaymentterm',
          name: 'EditPaymentTerm',
          component: () => import('src/pages/ERP/Setup2/CreateEditIMPaymentTerm.vue'),
          meta: {
            breadcrumb: [
              { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' },
              { label: 'Item Master', icon: 'item_master', to: base_url + '/itemmaster/Itemmaster' },
              { label: 'Edit Item Master' }
            ]
          }
        },

        { path: 'surchargecode', name:'surchargecode', component: () => import('src/pages/ERP/Setup2/SurchargeCode.vue') },
        {
          path: 'createsurchargecode',
          name: 'CreateSurchargeCode',
          component: () => import('src/pages/ERP/Setup2/CreateEditIMSurchargeCodeDiscount.vue'),
          meta: {
            breadcrumb: [
              { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' },
              { label: 'Item Master', icon: 'item_master', to: base_url + '/itemmaster/Itemmaster' },
              { label: 'New Item Master', to: base_url + '/itemmaster/createitemmaster' }
            ]
          }
        },
        {
          path: 'editsurchargecode',
          name: 'EditSurchargeCode',
          component: () => import('src/pages/ERP/Setup2/CreateEditIMSurchargeCodeDiscount.vue'),
          meta: {
            breadcrumb: [
              { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' },
              { label: 'Item Master', icon: 'item_master', to: base_url + '/itemmaster/Itemmaster' },
              { label: 'Edit Item Master' }
            ]
          }
        },

        { path: 'goodreceivenote', name:'goodreceivenote', component: () => import('src/pages/ERP/Setup2/TransactionReasonCodeCombine.vue')},
        {
          path: 'creategoodreceivenote',
          name: 'CreateGoodReceiveNote',
          component: () => import('src/pages/ERP/Setup2/CreateEditIMGRN.vue'),
          meta: {
            breadcrumb: [
              { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' },
              { label: 'Item Master', icon: 'item_master', to: base_url + '/itemmaster/Itemmaster' },
              { label: 'New Item Master', to: base_url + '/itemmaster/createitemmaster' }
            ]
          }
        },
        {
          path: 'editgoodreceivenote',
          name: 'EditGoodReceiveNote',
          component: () => import('src/pages/ERP/Setup2/CreateEditIMGRN.vue'),
          meta: {
            breadcrumb: [
              { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' },
              { label: 'Item Master', icon: 'item_master', to: base_url + '/itemmaster/Itemmaster' },
              { label: 'Edit Item Master' }
            ]
          }
        },

        { path: 'debitnote', name:'debitnote', component: () => import('src/pages/ERP/Setup2/TransactionReasonCodeCombine.vue')},
        {
          path: 'createdebitnote',
          name: 'CreateDebitNote',
          component: () => import('src/pages/ERP/Setup2/CreateEditIMDN.vue'),
          meta: {
            breadcrumb: [
              { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' },
              { label: 'Item Master', icon: 'item_master', to: base_url + '/itemmaster/Itemmaster' },
              { label: 'New Item Master', to: base_url + '/itemmaster/createitemmaster' }
            ]
          }
        },
        {
          path: 'editdebitnote',
          name: 'EditDebitNote',
          component: () => import('src/pages/ERP/Setup2/CreateEditIMDN.vue'),
          meta: {
            breadcrumb: [
              { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' },
              { label: 'Item Master', icon: 'item_master', to: base_url + '/itemmaster/Itemmaster' },
              { label: 'Edit Item Master' }
            ]
          }
        },

        { path: 'adjustment', name:'adjustment', component: () => import('src/pages/ERP/Setup2/Adjustment.vue')},
        {
          path: 'createadjustment',
          name: 'CreateAdjustment',
          component: () => import('src/pages/ERP/Setup2/CreateEditIMAdjustment.vue'),
          meta: {
            breadcrumb: [
              { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' },
              { label: 'Item Master', icon: 'item_master', to: base_url + '/itemmaster/Itemmaster' },
              { label: 'New Item Master', to: base_url + '/itemmaster/createitemmaster' }
            ]
          }
        },
        {
          path: 'editadjustment',
          name: 'EditAdjustment',
          component: () => import('src/pages/ERP/Setup2/CreateEditIMAdjustment.vue'),
          meta: {
            breadcrumb: [
              { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' },
              { label: 'Item Master', icon: 'item_master', to: base_url + '/itemmaster/Itemmaster' },
              { label: 'Edit Item Master' }
            ]
          }
        },

        { path: 'creditnote', name:'creditnote', component: () => import('src/pages/ERP/Setup2/TransactionReasonCodeCombine.vue')},
        {
          path: 'createcreditnote',
          name: 'CreateCreditNote',
          component: () => import('src/pages/ERP/Setup2/CreateEditIMCN.vue'),
          meta: {
            breadcrumb: [
              { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' },
              { label: 'Item Master', icon: 'item_master', to: base_url + '/itemmaster/Itemmaster' },
              { label: 'New Item Master', to: base_url + '/itemmaster/createitemmaster' }
            ]
          }
        },
        {
          path: 'editcreditnote',
          name: 'EditCreditNote',
          component: () => import('src/pages/ERP/Setup2/CreateEditIMCN.vue'),
          meta: {
            breadcrumb: [
              { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' },
              { label: 'Item Master', icon: 'item_master', to: base_url + '/itemmaster/Itemmaster' },
              { label: 'Edit Item Master' }
            ]
          }
        },

        { path: 'transform', name:'transform', component: () => import('src/pages/ERP/Setup2/TransactionReasonCodeCombine.vue')},
        {
          path: 'createtransform',
          name: 'CreateTransform',
          component: () => import('src/pages/ERP/Setup2/CreateEditIMTransform.vue'),
          meta: {
            breadcrumb: [
              { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' },
              { label: 'Item Master', icon: 'item_master', to: base_url + '/itemmaster/Itemmaster' },
              { label: 'New Item Master', to: base_url + '/itemmaster/createitemmaster' }
            ]
          }
        },
        {
          path: 'edittransform',
          name: 'EditTransform',
          component: () => import('src/pages/ERP/Setup2/CreateEditIMTransform.vue'),
          meta: {
            breadcrumb: [
              { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' },
              { label: 'Item Master', icon: 'item_master', to: base_url + '/itemmaster/Itemmaster' },
              { label: 'Edit Item Master' }
            ]
          }
        },

        { path: 'ibtpicking', name:'ibtpicking', component: () => import('src/pages/ERP/Setup2/TransactionReasonCodeCombine.vue')},
        {
          path: 'createibtpicking',
          name: 'CreateIBTPicking',
          component: () => import('src/pages/ERP/Setup2/CreateEditIMIBTPicking.vue'),
          meta: {
            breadcrumb: [
              { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' },
              { label: 'Item Master', icon: 'item_master', to: base_url + '/itemmaster/Itemmaster' },
              { label: 'New Item Master', to: base_url + '/itemmaster/createitemmaster' }
            ]
          }
        },
        {
          path: 'editibtpicking',
          name: 'EditIBTPicking',
          component: () => import('src/pages/ERP/Setup2/CreateEditIMIBTPicking.vue'),
          meta: {
            breadcrumb: [
              { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' },
              { label: 'Item Master', icon: 'item_master', to: base_url + '/itemmaster/Itemmaster' },
              { label: 'Edit Item Master' }
            ]
          }
        },

        { path: 'pocancellation', name:'pocancellation', component: () => import('src/pages/ERP/Setup2/TransactionReasonCodeCombine.vue')},
        {
          path: 'createpocancellation',
          name: 'CreatePOCancellation',
          component: () => import('src/pages/ERP/Setup2/CreateEditIMPOCancellation.vue'),
          meta: {
            breadcrumb: [
              { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' },
              { label: 'Item Master', icon: 'item_master', to: base_url + '/itemmaster/Itemmaster' },
              { label: 'New Item Master', to: base_url + '/itemmaster/createitemmaster' }
            ]
          }
        },
        {
          path: 'editpocancellation',
          name: 'EditPOCancellation',
          component: () => import('src/pages/ERP/Setup2/CreateEditIMPOCancellation.vue'),
          meta: {
            breadcrumb: [
              { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' },
              { label: 'Item Master', icon: 'item_master', to: base_url + '/itemmaster/Itemmaster' },
              { label: 'Edit Item Master' }
            ]
          }
        },

        { path: 'socancellation', name:'socancellation', component: () => import('src/pages/ERP/Setup2/TransactionReasonCodeCombine.vue')},
        {
          path: 'createsocancellation',
          name: 'CreateSOCancellation',
          component: () => import('src/pages/ERP/Setup2/CreateEditIMSOCancellation.vue'),
          meta: {
            breadcrumb: [
              { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' },
              { label: 'Item Master', icon: 'item_master', to: base_url + '/itemmaster/Itemmaster' },
              { label: 'New Item Master', to: base_url + '/itemmaster/createitemmaster' }
            ]
          }
        },
        {
          path: 'editsocancellation',
          name: 'EditSOCancellation',
          component: () => import('src/pages/ERP/Setup2/CreateEditIMSOCancellation.vue'),
          meta: {
            breadcrumb: [
              { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' },
              { label: 'Item Master', icon: 'item_master', to: base_url + '/itemmaster/Itemmaster' },
              { label: 'Edit Item Master' }
            ]
          }
        },

        { path: 'reducetoclear', name:'reducetoclear', component: () => import('src/pages/ERP/Setup2/TransactionReasonCodeCombine.vue')},
        {
          path: 'createreducetoclear',
          name: 'CreateReduceToClear',
          component: () => import('src/pages/ERP/Setup2/CreateEditIMReduceToClear.vue'),
          meta: {
            breadcrumb: [
              { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' },
              { label: 'Item Master', icon: 'item_master', to: base_url + '/itemmaster/Itemmaster' },
              { label: 'New Item Master', to: base_url + '/itemmaster/createitemmaster' }
            ]
          }
        },
        {
          path: 'editreducetoclear',
          name: 'EditReduceToClear',
          component: () => import('src/pages/ERP/Setup2/CreateEditIMReduceToClear.vue'),
          meta: {
            breadcrumb: [
              { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' },
              { label: 'Item Master', icon: 'item_master', to: base_url + '/itemmaster/Itemmaster' },
              { label: 'Edit Item Master' }
            ]
          }
        },

        // { path: 'transactionreasoncode', name:'transactionreasoncode', component: () => import('src/pages/ERP/Setup2/TransactionReasonCode.vue') },
        { path: 'systemaccessright', name:'systemaccessright', component: () => import('src/pages/ERP/Setup2/SystemAccessRight.vue')},
        {
          path: 'createsystemaccessright',
          name: 'CreateSystemAccessRight',
          component: () => import('src/pages/ERP/Setup2/CreateEditIMSystemAccessRight.vue'),
          meta: {
            breadcrumb: [
              { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' },
              { label: 'Item Master', icon: 'item_master', to: base_url + '/itemmaster/Itemmaster' },
              { label: 'New Item Master', to: base_url + '/itemmaster/createitemmaster' }
            ]
          }
        },
        {
          path: 'editsystemaccessright',
          name: 'EditSystemAccessRight',
          component: () => import('src/pages/ERP/Setup2/CreateEditIMSystemAccessRight.vue'),
          meta: {
            breadcrumb: [
              { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' },
              { label: 'Item Master', icon: 'item_master', to: base_url + '/itemmaster/Itemmaster' },
              { label: 'Edit Item Master' }
            ]
          }
        },

        { path: 'branch', name:'branch', component: () => import('src/pages/ERP/Setup2/Branch.vue')},
        {
          path: 'createbranch',
          name: 'CreateBranch',
          component: () => import('src/pages/ERP/Setup2/CreateEditIMBranch.vue'),
          meta: {
            breadcrumb: [
              { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' },
              { label: 'Item Master', icon: 'item_master', to: base_url + '/itemmaster/Itemmaster' },
              { label: 'New Item Master', to: base_url + '/itemmaster/createitemmaster' }
            ]
          }
        },
        {
          path: 'editbranch',
          name: 'EditBranch',
          component: () => import('src/pages/ERP/Setup2/CreateEditIMBranch.vue'),
          meta: {
            breadcrumb: [
              { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' },
              { label: 'Item Master', icon: 'item_master', to: base_url + '/itemmaster/Itemmaster' },
              { label: 'Edit Item Master' }
            ]
          }
        },

        { path: 'gsttaxcodepurchase', name:'gsttaxcodepurchase', component: () => import('src/pages/ERP/Setup2/GSTTaxCodeCombine.vue')},
        {
          path: 'creategsttaxcodepurchase',
          name: 'CreateGSTTaxCodePurchase',
          component: () => import('src/pages/ERP/Setup2/CreateEditIMGSTTaxCodeCombine.vue'),
          meta: {
            breadcrumb: [
              { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' },
              { label: 'Item Master', icon: 'item_master', to: base_url + '/itemmaster/Itemmaster' },
              { label: 'New Item Master', to: base_url + '/itemmaster/createitemmaster' }
            ]
          }
        },
        {
          path: 'editgsttaxcodepurchase',
          name: 'EditGSTTaxCodePurchase',
          component: () => import('src/pages/ERP/Setup2/CreateEditIMGSTTaxCodeCombine.vue'),
          meta: {
            breadcrumb: [
              { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' },
              { label: 'Item Master', icon: 'item_master', to: base_url + '/itemmaster/Itemmaster' },
              { label: 'Edit Item Master' }
            ]
          }
        },

        { path: 'gsttaxcodesupply', name:'gsttaxcodesupply', component: () => import('src/pages/ERP/Setup2/GSTTaxCodeCombine.vue')},
        {
          path: 'creategsttaxcodesupply',
          name: 'CreateGSTTaxCodeSupply',
          component: () => import('src/pages/ERP/Setup2/CreateEditIMGSTTaxCodeCombine.vue'),
          meta: {
            breadcrumb: [
              { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' },
              { label: 'Item Master', icon: 'item_master', to: base_url + '/itemmaster/Itemmaster' },
              { label: 'New Item Master', to: base_url + '/itemmaster/createitemmaster' }
            ]
          }
        },
        {
          path: 'editgsttaxcodesupply',
          name: 'EditGSTTaxCodeSupply',
          component: () => import('src/pages/ERP/Setup2/CreateEditIMGSTTaxCodeCombine.vue'),
          meta: {
            breadcrumb: [
              { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' },
              { label: 'Item Master', icon: 'item_master', to: base_url + '/itemmaster/Itemmaster' },
              { label: 'Edit Item Master' }
            ]
          }
        },

        { path: 'pogroup', name:'pogroup', component: () => import('src/pages/ERP/Setup2/POGroup.vue')},
        {
          path: 'createpogroup',
          name: 'CreatePOGroup',
          component: () => import('src/pages/ERP/Setup2/CreateEditPOGroup.vue'),
          meta: {
            breadcrumb: [
              { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' },
              { label: 'Item Master', icon: 'item_master', to: base_url + '/itemmaster/Itemmaster' },
              { label: 'New Item Master', to: base_url + '/itemmaster/createitemmaster' }
            ]
          }
        },
        {
          path: 'editpogroup',
          name: 'EditPOGroup',
          component: () => import('src/pages/ERP/Setup2/CreateEditPOGroup.vue'),
          meta: {
            breadcrumb: [
              { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' },
              { label: 'Item Master', icon: 'item_master', to: base_url + '/itemmaster/Itemmaster' },
              { label: 'Edit Item Master' }
            ]
          }
        },
        {
          path: 'deletepogroup',
          name: 'DeletePOGroup',
          component: () => import('src/pages/ERP/Setup2/CreateEditPOGroup.vue'),
          meta: {
            breadcrumb: [
              { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' },
              { label: 'Item Master', icon: 'item_master', to: base_url + '/itemmaster/Itemmaster' },
              { label: 'Edit Item Master' }
            ]
          }
        },
    ]
}
]

export default routes
