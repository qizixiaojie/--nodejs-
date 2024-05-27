import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
export default createStore({
  state: {
    isGetterRouter: false,
    isCollapsed: false,
    userInfo: {
      //用户信息
    }
  },
  getters: {},
  mutations: {
    changeGetterRouter(state, value) {
      state.isGetterRouter = value
    },
    //控制侧偏栏的状态
    changeCollapsed(state, value) {
      state.isCollapsed = !state.isCollapsed
    },
    //进行数据的持久化存储
    changeUserInfo(state, value) {
      state.userInfo = {
        //老的进行展开，新的进行合并
        ...state.userInfo,
        ...value
      }
    },
    clearUserInfo(state,value){
      state.userInfo ={}
    }

  },
  actions: {},
  modules: {},
  //持久化控制
  plugins: [
    createPersistedState({
      paths: ['isCollapsed','userInfo']
    })
  ]
})
