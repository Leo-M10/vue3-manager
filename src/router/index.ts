import {createRouter, createWebHashHistory} from "vue-router";
import {constantRoutes} from "@/router/routes";
import {storage} from "@/config/storageConfig";
let router = createRouter({
    //路由模式
    history: createWebHashHistory(),
    //路由规则
    routes: constantRoutes,
    //滚动行为
    scrollBehavior() {
        return {
            left:0,
            top:0
        }
    }
});
router.beforeEach((to, from, next) => {
    const token = storage.getCache('token')
    if (to.path !== '/login' && !token) {
        // ElMessage({
        //     type: "warning",
        //     message: '请先登录!'
        // })
        next('/login')
    }
    else next()
})

export default router;