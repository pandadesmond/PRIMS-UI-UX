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
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
}

export default modules
