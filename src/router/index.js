import { createRouter, createWebHashHistory } from 'vue-router'
import { store } from '@/store'

const routes = [
  {
    path: '/',
    name: '首页',
    component: () => import('../components/list'),
    meta: {
      title: 'home'
    }
  },
  {
    path: '/project_detail',
    name: '项目详情',
    component: () => import('../components/detail'),
    meta: {
      title: 'projectDetail'
    }
  },
  {
    path: '/login',
    name: '登录',
    component: () => import('../components/login'),
    meta: {
      title: 'login'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: () => ({ y: 0 }),
  routes: routes
})

router.beforeEach((to, from, next) => {
  const isLogin = store.state.isLogin
  if (to.path == '/login' && !isLogin) {
    // 登录或者注册才可以往下进行
    next();
  } else {
    // 获取 登录状态
    // token 不存在
    if (!isLogin) {
      next('/login');
    } else if (to.path === '/login') {
      next('/');
    } else {
      next()
    }
  }
})

export default router
