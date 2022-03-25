import { createRouter, createWebHashHistory } from 'vue-router'

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
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: () => ({ y: 0 }),
  routes: routes
})


export default router
