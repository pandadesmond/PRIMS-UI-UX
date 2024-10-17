import dbFrontendEn from 'src/store/componentBehavior/frontend/en'
import dbComponentBehavior from 'src/store/componentBehavior'
import setup from 'src/store/ERP/Setup'
import item from 'src/store/ERP/Item'
import location from 'src/store/ERP/Location'
import purchase from 'src/store/ERP/Purchase'
import sales from 'src/store/ERP/Sales'
import adjustment from 'src/store/ERP/Adjustment'
import itemmaster from 'src/store/ERP/Itemmaster'
import login from 'src/store/ERP/Login'

// setup2
import setup2_companyprofile from 'src/store/ERP/Setup2_CompanyProfile'
import setup2_currency from 'src/store/ERP/Setup2_Currency'
import setup2_weighingtypemoduleassignment from 'src/store/ERP/Setup2_WeighingTypeModuleAssignment'
import setup2_paymentterm from 'src/store/ERP/Setup2_PaymentTerm'
import setup2_surchargecodediscount from 'src/store/ERP/Setup2_SurchargeCodeDiscount'
import setup2_transactionreasoncode from 'src/store/ERP/Setup2_TransactionReasonCode'
import setup2_systemaccessright from 'src/store/ERP/Setup2_SystemAccessRight'
import setup2_branch from 'src/store/ERP/Setup2_Branch'
import setup2_gsttaxcode from 'src/store/ERP/Setup2_GSTTaxCode'
import setup2_pogroup from 'src/store/ERP/Setup2_POGroup'

import product from 'src/store/ERP/Product'
import configuration from 'src/store/ERP/Configuration'
import inventory from 'src/store/ERP/Inventory'
/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

var modules = {
    modules: {
        // example
        dbFrontendEn,
        dbComponentBehavior,
        setup,
        item,
        location,
        purchase,
        sales,
        adjustment,
        itemmaster,
        login,

        // setup2
        setup2_companyprofile,
        setup2_currency,
        setup2_weighingtypemoduleassignment,
        setup2_paymentterm,
        setup2_surchargecodediscount,
        setup2_transactionreasoncode,
        setup2_systemaccessright,
        setup2_branch,
        setup2_gsttaxcode,
        setup2_pogroup,
        product,
        configuration,
        inventory
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
}

export default modules
