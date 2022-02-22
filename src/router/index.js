import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: () => import('../views/Main.vue'),
    redirect: '/home',
    children:[
      
    ]
  },
  {
    path:'/login',
    name:'login',
    component:() => import('../views/login')
  }
]

const VueRouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(to){
  return VueRouterPush.call(this,to).catch(err=>err)
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
