import Vue from 'vue';
import Router from 'vue-router';

const originalReplace = Router.prototype.replace;
Router.prototype.replace = function replace(location) {
    return originalReplace.call(this, location).catch(err => err);
};
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/index'
        },
        {
            path: '/index',
            component: () => import('../components/page/index.vue'),
            meta: {title: 'YAOYAO二手商城'}
        },
        {
            path: '/search',
            component: () => import('../components/page/search.vue'),
            meta: {title: '闲置搜索 | YAOYAO二手商城'}
        },
        {
            path: '/me',
            component: () => import('../components/page/me.vue'),
            meta: {title: '个人中心 | YAOYAO二手商城'}
        },
        {
            path: '/message',
            component: () => import('../components/page/message.vue'),
            meta: {title: '消息 | YAOYAO二手商城'}
        },
        {
            path: '/release',
            component: () => import('../components/page/release.vue'),
            meta: {title: '发布闲置 | YAOYAO二手商城'}
        },
        {
            path: '/details',
            component: () => import('../components/page/idle-details.vue'),
            meta: {title: '闲置详情 | YAOYAO二手商城'}
        },
        {
            path: '/order',
            component: () => import('../components/page/order.vue'),
            meta: {title: '订单详情 | YAOYAO二手商城'}
        },
        {
            path: '/login',
            component: () => import('../components/page/login.vue'),
            meta: {title: '登录 | YAOYAO二手商城'}
        },
        {
            path: '/sign-in',
            component: () => import('../components/page/sign-in.vue'),
            meta: {title: '注册 | YAOYAO二手商城'}
        },
        {
            path: '/login-admin',
            component: () => import('../components/page/login-admin.vue'),
            meta: {title: '后台登陆'}
        },
        {
            path: '/platform-admin',
            component: () => import('../components/page/platform-admin.vue'),
            meta: {title: '后台管理'}
        },
        {
            path: '*',
            component: () => import('../components/page/404.vue'),
        }
    ]
});
