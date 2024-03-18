import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home'
import User from '../views/User'
import Main from '../views/Main'
import Mall from '../views/Mall'
import PageOne from '../views/PageOne'
import PageTwo from '../views/PageTwo'
import Login from '../views/Login'
//创建路由组件
Vue.use(VueRouter)
const routes = [
    {
        path: '/',
        component: Main,
        redirect: '/home',//重定向
        children: [
            { path: 'home', component: Home, name: 'Home' },// 首页
            { path: 'user', component: User, name: 'user' },//用户管理
            { path: 'mall', component: Mall, name: 'mall' },//商品管理
            { path: 'page1', component: PageOne, name: 'page1' },//商品管理
            { path: 'page2', component: PageTwo, name: 'page2' },//商品管理
        ]
    },
    {
        path: '/login',
        component: Login,
        name: 'login'
    }
]
//创建router实例
const router = new VueRouter({
    routes // (缩写) 相当于 routes: routes
})
router.onError((error) => {
    if (error.name !== 'NavigationDuplicated') {
        // 如果错误不是导航重复的错误，则将其抛出  
        throw error;
    }
});
export default router
