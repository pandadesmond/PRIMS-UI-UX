const base_url = "/ERP";

const routes = [
{
    path: base_url+'/Login/',
    component: () => import('src/pages/ERP/Login/Login.vue'),
    // beforeEnter: (to, from, next) => {
    //     if(sessionStorage.getItem('authenticated')){
    //         next('/honda/dashboard/main')
    //     } else {
    //         next()
    //     }
    // },
}
]

export default routes
