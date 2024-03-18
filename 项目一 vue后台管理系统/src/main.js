import Vue from 'vue';
import App from './App.vue';
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
import router from './router'
import store from './store'
import "./api/mock.js"
import Cookie from 'js-cookie'

Vue.use(ElementUI);
Vue.config.productionTip = false

Vue.config.warnHandler = function (msg, vm, trace) {
  // `trace` 是组件的继承关系追踪  
  if (msg.indexOf('undefined prop') > -1 || msg.indexOf('undefined method') > -1) {
    // 忽略关于未定义的属性或方法的警告  
    return
  }
  // 对于其他警告，你可以保持默认行为  
  console.error(`[Vue warn]: ${msg}${trace}`)
}


//添加全局前置导航守卫
router.beforeEach((to, from, next) => {
  const token = Cookie.get('token')
  //token不存在，说明当前用户是未登陆，应该跳转至登录页
  if (!token && to.name !== 'login') {
    next({ name: 'login' })
  } else if (token && to.name === 'login') {
    //如果token存在，说明用户登录，此时跳转至首页
    next({ name: 'Home' })
  } else {
    next()
  }
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
}).$mount('#app')
