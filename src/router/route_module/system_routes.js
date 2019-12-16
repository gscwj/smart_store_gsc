/*
* 系统路由目录配置文件
* */
const Home = r=>require.ensure([],() =>r(require('@/views/Home')));
const mainPage = r=>require.ensure([],() =>r(require('@/views/main_page/mainPage')));
const store = r=>require.ensure([],() =>r(require('@/views/store/store')));
const forum = r=>require.ensure([],() =>r(require('@/views/forum/forum')));
const corner = r=>require.ensure([],() =>r(require('@/views/corner/corner')));

const system_router = [
    {
        path: '/',
        name: 'home',
        component: Home,
        redirect: '/main_page',
        children:[
            {
                path: '/main_page',
                name: 'main-page',
                component: mainPage,
            },
            {
                path: '/store',
                name: 'store',
                component: store,
            },
            {
                path: '/forum',
                name: 'forum',
                component: forum,
            },
            {
                path: '/corner',
                name: 'corner',
                component: corner,
            },
        ]
    },
];
export default system_router;