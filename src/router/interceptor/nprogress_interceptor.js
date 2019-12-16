/*
* 加载顶部加载条的拦截器
* */
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

/*
* 进入路由之前的拦截器
* */
const beforeEach = function (to, from, next) {
    NProgress.start();
    next();
};
/*
* 离开路由页面的拦截器
* */
const afterEach = function (to, from) {
    NProgress.done();
};

export default {
    install(router){
        console.log("--- NProgress拦截器已加载");
        NProgress.configure({
            easing: 'ease',/*动画方式*/
            speed: 500,/*速度*/
            showSpinner: false,/*是否下士加载icon*/
            trickleSpeed: 200,/*自动递增间隔*/
            minimum: 0.3,/*初始化时的最小百分比*/
        });
        router.beforeEach(beforeEach);
        router.afterEach(afterEach);
    },
}