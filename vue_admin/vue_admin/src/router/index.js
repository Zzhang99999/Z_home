import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/index',
    name: 'index',
    component: () => import('../views/index.vue'),
    redirect: '/hello',
    children:[
     
      {
        path: '/hello',
        name: 'hello',
        component: () => import('../views/hello.vue')
      },
      {
        path: '/users',
        name: 'users',
        component: () => import('../views/users.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to,from,next)=>{
  //  console.log(to) 
   const flag=to.matched.some(item=>{
      return  item.meta.auth
   })
   if(flag){
       const token=sessionStorage.getItem("token")
       if(!token){
           return next({
              path:'/login'
           })
       }
   }
   next() 
})



export default router
