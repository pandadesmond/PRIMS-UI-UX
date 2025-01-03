import dbFrontendEn from 'src/store/componentBehavior/frontend/en'
import dbComponentBehavior from 'src/store/componentBehavior'
import login from 'src/store/PRIMS/Login'
import tta from 'src/store/PRIMS/TTA'
import general from 'src/store/PRIMS/General'
import user from 'src/store/PRIMS/User'
import transaction from 'src/store/PRIMS/Transaction'
import maintenance from 'src/store/PRIMS/Maintenance'
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
        login,
        tta,
        general,
        user,
        transaction,
        maintenance,
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
}

export default modules
