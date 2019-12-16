import Vue from 'vue'
import VueRouter from 'vue-router'
import system_router from './route_module/system_routes'
import nprogress_intercept from './interceptor/nprogress_interceptor'
Vue.use(VueRouter);

const routes = [
    ...system_router,
];
/*创建router对象，加载router路由目录数组*/
const router = new VueRouter({
  routes
});

nprogress_intercept.install(router);/*安装顶部加载进度条拦截器*/

export default router
