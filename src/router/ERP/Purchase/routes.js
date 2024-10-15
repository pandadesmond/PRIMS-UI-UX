import { get_ml_company, get_supplier } from 'src/store/ERP/Setup/getters';

const base_url = "/ERP";

const routes = [
{
    path: base_url+'/purchase',
    component: () => import('src/layouts/ERP/Main.vue'),
    // beforeEnter: (to, from, next) => {
    //     if(sessionStorage.getItem('authenticated')){
    //         next()
    //     } else {
    //         next('/rda/login')
    //     }
    // },
    children: [
        { path: 'purchaseorder', name: 'PurchaseOrder', component: () => import('src/pages/ERP/Purchase/Transmain.vue') },
        { path: 'createpurchaseorder', name: 'CreatePurchaseOrder', component: () => import('src/pages/ERP/Purchase/CreateEditPO.vue') },
        { path: 'editpurchaseorder', name: 'EditPurchaseOrder', component: () => import('src/pages/ERP/Purchase/CreateEditPO.vue') },
        { path: 'viewpurchaseorder', name: 'ViewPurchaseOrder', component: () => import('src/pages/ERP/Purchase/CreateEditPO.vue') },
        { path: 'createpurchaseorderdetails', name: 'CreatePurchaseOrderDetails', component: () => import('src/pages/ERP/Purchase/CreateEditPOchild.vue') },
        { path: 'editpurchaseorderdetails', name: 'EditPurchaseOrderDetails', component: () => import('src/pages/ERP/Purchase/CreateEditPOchild.vue') },
        { path: 'goodsreceivednote', name: 'GoodsReceivedNote', component: () => import('src/pages/ERP/Purchase/Transmain.vue') },
        { path: 'creategoodsreceivednote', name: 'CreateGoodsReceivedNote', component: () => import('src/pages/ERP/Purchase/CreateEditGR.vue') },
        { path: 'editgoodsreceivednote', name: 'EditGoodsReceivedNote', component: () => import('src/pages/ERP/Purchase/CreateEditGR.vue') },
        // { path: 'creategoodsreceivednotedetails', name: 'CreateGoodsReceivedNoteDetails', component: () => import('src/pages/ERP/Purchase/CreateEditGRchild.vue') },
        { path: 'creategoodsreceivednotedetails', name: 'CreateGoodsReceivedNoteDetails', component: () => import('src/pages/ERP/Purchase/CreateEditPOchild.vue') },
        { path: 'editgoodsreceivednotedetails', name: 'EditGoodsReceivedNoteDetails', component: () => import('src/pages/ERP/Purchase/CreateEditPOchild.vue') },
        { path: 'simplereceive', name: 'SimpleReceive', component: () => import('src/pages/ERP/Purchase/SimpleReceive.vue') },
        { path: 'viewgoodsreceivednote', name: 'ViewGoodsReceivedNote', component: () => import('src/pages/ERP/Purchase/CreateEditGR.vue') },
        { path: 'printgoodsreceivednotewarning', name: 'PrintWarningMessage', component: () => import('src/pages/ERP/Purchase/PrintGRNWarningMessage.vue') },
        { path: 'debitnote', name: 'DebitNote', component: () => import('src/pages/ERP/Purchase/Transmain.vue') },
        { path: 'createdebitnote', name: 'CreateDebitNote', component: () => import('src/pages/ERP/Purchase/CreateEditDN.vue') },
        { path: 'editdebitnote', name: 'EditDebitNote', component: () => import('src/pages/ERP/Purchase/CreateEditDN.vue') },
        { path: 'viewdebitnote', name: 'ViewDebitNote', component: () => import('src/pages/ERP/Purchase/CreateEditDN.vue') },
        { path: 'createdebitnotedetails', name: 'CreateDebitNoteDetails', component: () => import('src/pages/ERP/Purchase/CreateEditPOchild.vue') },
        { path: 'editdebitnotedetails', name: 'EditDebitNoteDetails', component: () => import('src/pages/ERP/Purchase/CreateEditPOchild.vue') },
        { path: 'confirm', name: 'confirm', component: () => import('src/pages/ERP/Purchase/Confirm.vue') },

        { path: 'interbranchtransfer', name: 'InterbranchTransfer', component: () => import('src/pages/ERP/Purchase/Transmain.vue') },
        { path: 'createinterbranchtransfer', name: 'CreateInterbranchTransfer', component: () => import('src/pages/ERP/Purchase/CreateEditIBT.vue') },
        { path: 'editinterbranchtransfer', name: 'EditInterbranchTransfer', component: () => import('src/pages/ERP/Purchase/CreateEditIBT.vue') },
        { path: 'createinterbranchtransferdetails', name: 'CreateInterbranchTransferDetails', component: () => import('src/pages/ERP/Purchase/CreateEditPOchild.vue') },
        { path: 'editinterbranchtransferdetails', name: 'EditInterbranchTransferDetails', component: () => import('src/pages/ERP/Purchase/CreateEditPOchild.vue') },
        { path: 'creditnote', name: 'CreditNote', component: () => import('src/pages/ERP/Purchase/Transmain.vue') },
        { path: 'createcreditnote', name: 'CreateCreditNote', component: () => import('src/pages/ERP/Purchase/CreateEditCN.vue') },
        { path: 'editcreditnote', name: 'EditCreditNote', component: () => import('src/pages/ERP/Purchase/CreateEditCN.vue') },
        { path: 'itemlistingreceive', name: 'itemlistingreceive', component: () => import('src/pages/ERP/Purchase/ItemListingReceive.vue') },
      ]
}
]

export default routes
