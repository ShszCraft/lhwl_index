export default {
  namespaced: true,
  state: {
    activeName: '',
    isRouterAlive: false // isRouterAlive控制显示，提供reload方法刷新App视图
  },
  mutations: {
    setMenuActive: function (state, value) {
      state.activeName = value
    },
    // 设置App视图开关状态[用于刷新App视图]
    setIsRouterAlive: function (state, value) {
      console.log('set', value)
      state.isRouterAlive = value
    }
  },
  actions: {},
  getters: {
    getMenuActive: function (state) {
      return state.activeName
    },
    // 获取App视图开关状态[用于刷新App视图]
    getIsRouterAlive: function (state) {
      return state.isRouterAlive
    }
  }
}
