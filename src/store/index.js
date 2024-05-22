import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
export default createStore({
  state: {
    isGetterRouter: false,
    isCollapsed: false
  },
  getters: {},
  mutations: {
    changeGetterRouter(state, value) {
      state.isGetterRouter = value
    },
    //控制侧偏栏的状态
    changeCollapsed(state, value) {
      state.isCollapsed = !state.isCollapsed
    }
  },
  actions: {},
  modules: {},
  plugins: [createPersistedState({
    paths:["isCollapsed"]
  })]
})
