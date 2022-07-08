import defaultPage from '../pages/default/index.vue'
import Login from '../pages/login/index.vue'
import Error403 from '../pages/403/index.vue'
import Error404 from '../pages/404/index.vue'
import Error500 from '../pages/500/index.vue'

export default [
  {
    path: '/',
    name: 'home',
    component: defaultPage,
    meta: {
      inFrame: true,
      enablePermissionVerify: true,
    },
  },
  {
    // 登录页
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      cache: false,
      inFrame: false,
      enablePermissionVerify: false,
    },
  },
  {
    // 403
    path: '/error/403',
    name: 'error403',
    component: Error403,
    meta: {
      title: 'Error 403',
      cache: false,
      inFrame: false,
      enablePermissionVerify: false,
    },
  },
  {
    // 404
    path: '/error/404',
    name: 'error404',
    component: Error404,
    meta: {
      title: 'Error 404',
      cache: false,
      inFrame: false,
      enablePermissionVerify: false,
    },
  },
  {
    // 404
    path: '/error/500',
    name: 'error500',
    component: Error500,
    meta: {
      title: 'Error 500',
      cache: false,
      inFrame: false,
      enablePermissionVerify: false,
    },
  },
  { path: '/:pathMatch(.*)*', redirect: '/error/404' },
]
