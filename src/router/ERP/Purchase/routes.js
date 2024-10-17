const base_url = "/ERP";

const purchaseOrderRoutes = [
  {
    path: base_url + '/purchase',
    component: () => import('src/layouts/ERP/Main.vue'),
    children: [
      {
        path: 'purchaseorder',
        name: 'PurchaseOrder',
        component: () => import('src/pages/ERP/Purchase/PurchaseOrder.vue'),
        meta: {
          breadcrumb: [
            { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' },
            { label: 'Purchase Order', icon: 'purchase', to: base_url + '/purchase/purchaseorder' }
          ]
        }
      },
      {
        path: 'PurchaseOrderDetails',
        name: 'PurchaseOrderDetails',
        component: () => import('src/pages/ERP/Purchase/PurchaseOrderDetails.vue'),
        meta: {
          breadcrumb: [
            { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' },
            { label: 'Purchase Order', icon: 'purchase', to: base_url + '/purchase/purchaseorder' }
          ]
        }
      },
      {
        path: 'PurchaseOrderDetailsView',
        name: 'PurchaseOrderDetailsView',
        component: () => import('src/pages/ERP/Purchase/PurchaseOrderDetails.vue'),
        meta: {
          breadcrumb: [
            { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' },
            { label: 'Purchase Order', icon: 'purchase', to: base_url + '/purchase/purchaseorder' }
          ]
        }
      },
      {
        path: 'Goodsreceivednote',
        name: 'GoodsReceivedNote',
        component: () => import('src/pages/ERP/Purchase/GoodsReceivedNote.vue'),
        meta: {
          breadcrumb: [
            { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' },
            { label: 'Purchase Order', icon: 'purchase', to: base_url + '/purchase/Goodsreceivednote' }
          ]
        }
      },
      {
        path: 'GoodsReceivedNoteDetails',
        name: 'GoodsReceivedNoteDetails',
        component: () => import('src/pages/ERP/Purchase/GoodsReceivedNoteDetails.vue'),
        meta: {
          breadcrumb: [
            { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' },
            { label: 'Purchase Order', icon: 'purchase', to: base_url + '/purchase/Goodsreceivednote' }
          ]
        }
      },
      {
        path: 'GoodsReceivedNoteDetailsView',
        name: 'GoodsReceivedNoteDetailsView',
        component: () => import('src/pages/ERP/Purchase/GoodsReceivedNoteDetails.vue'),
        meta: {
          breadcrumb: [
            { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' },
            { label: 'Purchase Order', icon: 'purchase', to: base_url + '/purchase/Goodsreceivednote' }
          ]
        }
      },
      {
        path: 'AutoOrdering',
        name: 'AutoOrdering',
        component: () => import('src/pages/ERP/Purchase/AutoOrdering.vue'),
        meta: {
          breadcrumb: [
            { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' },
            { label: 'Auto Ordering', icon: 'purchase', to: base_url + '/purchase/AutoOrdering' }
          ]
        }
      },
      {
        path: 'AutoOrderingDetails',
        name: 'AutoOrderingDetails',
        component: () => import('src/pages/ERP/Purchase/AutoOrderingDetails.vue'),
        meta: {
          breadcrumb: [
            { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' },
            { label: 'Auto Ordering Details', icon: 'purchase', to: base_url + '/purchase/AutoOrderingDetails' }
          ]
        }
      },
      {
        path: 'createpurchaseorder',
        name: 'CreatePurchaseOrder',
        component: () => import('src/pages/ERP/Purchase/CreateEditPO.vue'),
        meta: {
          breadcrumb: [
            { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' },
            { label: 'Purchase Order', icon: 'purchase', to: base_url + '/purchase/purchaseorder' },
            { label: 'New Purchase Order', to: base_url + '/purchase/createpurchaseorder' }
          ]
        }
      },
      {
        path: 'editpurchaseorder',
        name: 'EditPurchaseOrder',
        component: () => import('src/pages/ERP/Purchase/CreateEditPO.vue'),
        meta: {
          breadcrumb: [
            { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' },
            { label: 'Purchase Order', icon: 'purchase', to: base_url + '/purchase/purchaseorder' },
            { label: 'Edit Purchase Order' }
          ]
        }
      },
      {
        path: 'viewpurchaseorder',
        name: 'ViewPurchaseOrder',
        component: () => import('src/pages/ERP/Purchase/CreateEditPO.vue'),
        meta: {
          breadcrumb: [
            { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' },
            { label: 'Purchase Order', icon: 'purchase', to: base_url + '/purchase/purchaseorder' },
            { label: 'View Purchase Order', to: base_url + '/purchase/viewpurchaseorder' }
          ]
        }
      },
      {
        path: 'createpurchaseorderdetails',
        name: 'CreatePurchaseOrderDetails',
        component: () => import('src/pages/ERP/Purchase/CreateEditPOchild.vue'),
        meta: {
          breadcrumb: [
            { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' },
            { label: 'Purchase Order', icon: 'purchase', to: base_url + '/purchase/purchaseorder' },
            { label: 'New Purchase Order Details', to: base_url + '/purchase/createpurchaseorderdetails' }
          ]
        }
      },
      {
        path: 'editpurchaseorderdetails',
        name: 'EditPurchaseOrderDetails',
        component: () => import('src/pages/ERP/Purchase/CreateEditPOchild.vue'),
        meta: {
          breadcrumb: [
            { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' },
            { label: 'Purchase Order', icon: 'purchase', to: base_url + '/purchase/purchaseorder' },
            { label: 'Edit Purchase Order Details', to: base_url + '/purchase/editpurchaseorderdetails' }
          ]
        }
      },
      // {
      //   path: 'goodsreceivednote',
      //   name: 'GoodsReceivedNote',
      //   component: () => import('src/pages/ERP/Purchase/Transmain.vue'),
      //   meta: {
      //     breadcrumb: [
      //       { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' },
      //       { label: 'Goods Received Note', icon: 'purchase', to: base_url + '/purchase/goodsreceivednote' }
      //     ]
      //   }
      // },
      {
        path: 'creategoodsreceivednote',
        name: 'CreateGoodsReceivedNote',
        component: () => import('src/pages/ERP/Purchase/CreateEditGR.vue'),
        meta: {
          breadcrumb: [
            { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' },
            { label: 'Goods Received Note', to: base_url + '/purchase/goodsreceivednote' },
            { label: 'New Goods Received Note', to: base_url + '/purchase/creategoodsreceivednote' }
          ]
        }
      },
      {
        path: 'editgoodsreceivednote',
        name: 'EditGoodsReceivedNote',
        component: () => import('src/pages/ERP/Purchase/CreateEditGR.vue'),
        meta: {
          breadcrumb: [
            { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' },
            { label: 'Goods Received Note', icon: 'purchase', to: base_url + '/purchase/goodsreceivednote' },
            { label: 'Edit Goods Received Note' }
          ]
        }
      },
      {
        path: 'creategoodsreceivednotedetails',
        name: 'CreateGoodsReceivedNoteDetails',
        component: () => import('src/pages/ERP/Purchase/CreateEditPOchild.vue'),
        meta: {
          breadcrumb: [
            { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' },
            { label: 'Goods Received Note', icon: 'purchase', to: base_url + '/purchase/goodsreceivednote' },
            { label: 'New Goods Received Note Details', to: base_url + '/purchase/creategoodsreceivednotedetails' }
          ]
        }
      },
      {
        path: 'editgoodsreceivednotedetails',
        name: 'EditGoodsReceivedNoteDetails',
        component: () => import('src/pages/ERP/Purchase/CreateEditPOchild.vue'),
        meta: {
          breadcrumb: [
            { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' },
            { label: 'Goods Received Note', icon: 'purchase', to: base_url + '/purchase/goodsreceivednote' },
            { label: 'Edit Goods Received Note Details', to: base_url + '/purchase/editgoodsreceivednotedetails' }
          ]
        }
      },
      {
        path: 'simplereceive',
        name: 'SimpleReceive',
        component: () => import('src/pages/ERP/Purchase/SimpleReceive.vue'),
        meta: {
          breadcrumb: [
            { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' },
            { label: 'Goods Received Note', icon: 'purchase', to: base_url + '/purchase/goodsreceivednote' },
            { label: 'Simple Receive', to: base_url + '/purchase/simplereceive' }
          ]
        }
      },
      {
        path: 'viewgoodsreceivednote',
        name: 'ViewGoodsReceivedNote',
        component: () => import('src/pages/ERP/Purchase/CreateEditGR.vue'),
        meta: {
          breadcrumb: [
            { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' },
            { label: 'Goods Received Note', icon: 'purchase', to: base_url + '/purchase/goodsreceivednote' },
            { label: 'View Goods Received Note', to: base_url + '/purchase/viewgoodsreceivednote' }
          ]
        }
      },
      {
        path: 'printgoodsreceivednotewarning',
        name: 'PrintWarningMessage',
        component: () => import('src/pages/ERP/Purchase/PrintGRNWarningMessage.vue'),
        meta: {
          breadcrumb: [
            { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' },
            { label: 'Print Warning Message', to: base_url + '/purchase/printgoodsreceivednotewarning' }
          ]
        }
      },
      {
        path: 'debitnote',
        name: 'DebitNote',
        component: () => import('src/pages/ERP/Purchase/Transmain.vue'),
        meta: {
          breadcrumb: [
            { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' },
            { label: 'Debit Note', icon: 'purchase', to: base_url + '/purchase/debitnote' }
          ]
        }
      },
      {
        path: 'createdebitnote',
        name: 'CreateDebitNote',
        component: () => import('src/pages/ERP/Purchase/CreateEditDN.vue'),
        meta: {
          breadcrumb: [
            { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' },
            { label: 'Debit Note', icon: 'purchase', to: base_url + '/purchase/debitnote' },
            { label: 'New Debit Note', to: base_url + '/purchase/createdebitnote' }
          ]
        }
      },
      {
        path: 'editdebitnote',
        name: 'EditDebitNote',
        component: () => import('src/pages/ERP/Purchase/CreateEditDN.vue'),
        meta: {
          breadcrumb: [
            { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' },
            { label: 'Debit Note', icon: 'purchase', to: base_url + '/purchase/debitnote' },
            { label: 'Edit Debit Note' }
          ]
        }
      },
      {
        path: 'viewdebitnote',
        name: 'ViewDebitNote',
        component: () => import('src/pages/ERP/Purchase/CreateEditDN.vue'),
        meta: {
          breadcrumb: [
            { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' },
            { label: 'Debit Note', icon: 'purchase', to: base_url + '/purchase/debitnote' },
            { label: 'View Debit Note', to: base_url + '/purchase/viewdebitnote' }
          ]
        }
      },
      {
        path: 'createdebitnotedetails',
        name: 'CreateDebitNoteDetails',
        component: () => import('src/pages/ERP/Purchase/CreateEditPOchild.vue'),
        meta: {
          breadcrumb: [
            { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' },
            { label: 'Debit Note', icon: 'purchase', to: base_url + '/purchase/debitnote' },
            { label: 'New Debit Note Details', to: base_url + '/purchase/createdebitnotedetails' }
          ]
        }
      },
      {
        path: 'editdebitnotedetails',
        name: 'EditDebitNoteDetails',
        component: () => import('src/pages/ERP/Purchase/CreateEditPOchild.vue'),
        meta: {
          breadcrumb: [
            { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' },
            { label: 'Debit Note', icon: 'purchase', to: base_url + '/purchase/debitnote' },
            { label: 'Edit Debit Note Details', to: base_url + '/purchase/editdebitnotedetails' }
          ]
        }
      },
      {
        path: 'confirm',
        name: 'confirm',
        component: () => import('src/pages/ERP/Purchase/Confirm.vue'),
        meta: {
          breadcrumb: [
            { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' },
            { label: 'Confirm', to: base_url + '/purchase/confirm' }
          ]
        }
      },
      {
        path: 'interbranchtransfer',
        name: 'InterbranchTransfer',
        component: () => import('src/pages/ERP/Purchase/Transmain.vue'),
        meta: {
          breadcrumb: [
            { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' },
            { label: 'Interbranch Transfer', icon: 'purchase', to: base_url + '/purchase/interbranchtransfer' }
          ]
        }
      },
      {
        path: 'createinterbranchtransfer',
        name: 'CreateInterbranchTransfer',
        component: () => import('src/pages/ERP/Purchase/CreateEditIBT.vue'),
        meta: {
          breadcrumb: [
            { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' },
            { label: 'Interbranch Transfer', icon: 'purchase', to: base_url + '/purchase/interbranchtransfer' },
            { label: 'New Interbranch Transfer', to: base_url + '/purchase/createinterbranchtransfer' }
          ]
        }
      },
      {
        path: 'editinterbranchtransfer',
        name: 'EditInterbranchTransfer',
        component: () => import('src/pages/ERP/Purchase/CreateEditIBT.vue'),
        meta: {
          breadcrumb: [
            { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' },
            { label: 'Interbranch Transfer', icon: 'purchase', to: base_url + '/purchase/interbranchtransfer' },
            { label: 'Edit Interbranch Transfer', to: base_url + '/purchase/editinterbranchtransfer' }
          ]
        }
      },
      {
        path: 'createinterbranchtransferdetails',
        name: 'CreateInterbranchTransferDetails',
        component: () => import('src/pages/ERP/Purchase/CreateEditPOchild.vue'),
        meta: {
          breadcrumb: [
            { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' },
            { label: 'Interbranch Transfer', icon: 'purchase', to: base_url + '/purchase/interbranchtransfer' },
            { label: 'New Interbranch Transfer Details', to: base_url + '/purchase/createinterbranchtransferdetails' }
          ]
        }
      },
      {
        path: 'editinterbranchtransferdetails',
        name: 'EditInterbranchTransferDetails',
        component: () => import('src/pages/ERP/Purchase/CreateEditPOchild.vue'),
        meta: {
          breadcrumb: [
            { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' },
            { label: 'Interbranch Transfer', icon: 'purchase', to: base_url + '/purchase/interbranchtransfer' },
            { label: 'Edit Interbranch Transfer Details', to: base_url + '/purchase/editinterbranchtransferdetails' }
          ]
        }
      },
      {
        path: 'creditnote',
        name: 'CreditNote',
        component: () => import('src/pages/ERP/Purchase/Transmain.vue'),
        meta: {
          breadcrumb: [
            { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' },
            { label: 'Credit Note', icon: 'purchase', to: base_url + '/purchase/creditnote' }
          ]
        }
      },
      {
        path: 'createcreditnote',
        name: 'CreateCreditNote',
        component: () => import('src/pages/ERP/Purchase/CreateEditCN.vue'),
        meta: {
          breadcrumb: [
            { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' },
            { label: 'Credit Note', icon: 'purchase', to: base_url + '/purchase/creditnote' },
            { label: 'New Credit Note', to: base_url + '/purchase/createcreditnote' }
          ]
        }
      },
      {
        path: 'editcreditnote',
        name: 'EditCreditNote',
        component: () => import('src/pages/ERP/Purchase/CreateEditCN.vue'),
        meta: {
          breadcrumb: [
            { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' },
            { label: 'Credit Note', icon: 'purchase', to: base_url + '/purchase/creditnote' },
            { label: 'Edit Credit Note' }
          ]
        }
      },
      {
        path: 'itemlistingreceive',
        name: 'ItemListingReceive',
        component: () => import('src/pages/ERP/Purchase/ItemListingReceive.vue'),
        meta: {
          breadcrumb: [
            { label: 'Outlet', icon: 'outlet', to: base_url + '/location/outletlocation' },
            { label: 'Item Listing Receive', to: base_url + '/purchase/itemlistingreceive' }
          ]
        }
      },
    ]
  }
];

export default purchaseOrderRoutes;
