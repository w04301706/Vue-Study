import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../components/Login'
import home from '../components/Home'
import welcome from '../components/Welcome'
import users from '../components/user/Users'
import rights from '../components/power/Rights'
import roles from '../components/power/Roles'
import cate from '../components/goods/Cate'
import params from '../components/goods/Params'
import goodsList from '../components/goods/List'
import add from '../components/goods/Add'
import order from '../components/order/Order'
import report from '../components/report/Report'

Vue.use(VueRouter)

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: login },
  {
    path: "/home",
    component: home,
    redirect: '/welcome',
    children: [
      { path: "/welcome", component: welcome },
      { path: "/users", component: users },
      { path: "/rights", component: rights },
      { path: "/roles", component: roles },
      { path: "/categories", component: cate },
      { path: "/params", component: params },
      { path: "/goods", component: goodsList },
      { path: "/goods/add", component: add },
      { path: "/orders", component: order },
      { path: "/reports", component: report }
    ]
  }
]

const router = new VueRouter({
  routes
})

//挂载路由守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next();
  const tokenstr = window.sessionStorage.getItem('token');
  if (!tokenstr) return next('/login');
  next();
});

export default router
