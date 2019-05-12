import Vue from 'vue'
import Vuex from 'vuex'

import auth from './module/auth'
import index from './module/index'

import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    index,
    auth
  },
  actions: actions,
  mutations: mutations,
  strict: debug
})

/*
* 严格模式 strict
* https://vuex.vuejs.org/zh/guide/strict.html
* */

/*
store.state.auth // -> module auth 的状态
store.state.b // -> moduleB 的状态
*/

/*
* Vuex 当在严格模式中使用 Vuex 时，在属于 Vuex 的 state 上使用 v-model 会比较棘手
* https://vuex.vuejs.org/zh/guide/forms.html
* */
