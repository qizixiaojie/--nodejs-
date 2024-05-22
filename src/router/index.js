import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import MainBox from '@/views/MainBox.vue'
import RoutesConfig from '@/router/config'
import store from '@/store/index.js'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/MainBox',
    name: 'MainBox',
    component: MainBox
  }
  // MainBox 的嵌套路由，后面根据权限动态添加
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 配置路由守卫
router.beforeEach((to, from, next) => {
  if (to.name === 'login') {
    next()
  } else {
    // 否则要进行身份的认证，也就是 token 的字符串
    // 未授权直接到 Login
    if (!localStorage.getItem('token')) {
      next({
        path: '/login'
      })
      
    } else {
      // 进行二次判断是否动态渲染了路由
      if (!store.state.isGetterRouter) {
        // 执行动态路由的渲染的函数
        ConfigRouter()
        // 需要继续放行
        next({
          path: to.fullPath
        })
      } else {
        next()
      }
    }
  }
})

const ConfigRouter = () => {
  // 动态路由渲染
  RoutesConfig.forEach(item => {
    router.addRoute('MainBox', item)
  })
  // 改变全局是否动态渲染了动态路由
  store.commit("changeGetterRouter", true)
}

export default router
