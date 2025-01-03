const base_url = "/PRIMS";

const routes = [
{
    path: base_url+'/Login/',
    component: () => import('src/pages/PRIMS/Login/Login.vue'),
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
