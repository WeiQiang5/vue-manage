import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import http from 'axios'
import '@/api/mock'
//引入样式
import './scss/index.scss'

//引入elementui组件
import '../demand.js'

// //引入elementui
// import {Button} from 'element-ui';
//引入elementui的样式
import 'element-ui/lib/theme-chalk/index.css';


Vue.config.productionTip = false


//将elementui需要引入的组件挂载到vue原型上面
// Vue.prototype.$button = Button;
Vue.prototype.$http = http

//导航守卫
router.beforeEach((to,form,next) => {
  store.commit('getToken');
  let token = store.state.user.token;
  if(!token && to.name !== 'login'){
    next({ name:'login' })
  }else if(token && to.name === 'login'){
    next({name:'home'})
  }else{
    next()
  }
})

new Vue({
  store,
  router,
  created () {
    store.commit('addMenu',router)
  },
  render: h => h(App)
}).$mount('#app')
