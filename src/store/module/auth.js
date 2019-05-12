import Cookies from '@/utils/Cookie'
import router from '@/router/index'

const autherization = Cookies.getCookieAutherization()
const pk = autherization.pk
const token = autherization.token
const user = autherization.username
const usercode = autherization.usercode
let verify = false
if (token && user) verify = true
console.log('token', token)
console.log('user', verify)

export default {
  namespaced: true,
  state: {
    auth: {
      pk: pk,
      verify: verify,
      token: token,
      user: user,
      usercode: usercode
    }
  },
  mutations: {
    /* 储重用户登录信息 */
    setAutherization: function (state, data) {
      state.auth.pk = data.pk
      state.auth.token = data.token
      state.auth.user = data.user
      state.auth.usercode = data.usercode
      state.auth.verify = data.verify
      console.log('state', state)
      // 存储token
      Cookies.setCookieAutherization({
        pk: data.pk,
        token: data.token,
        user: data.user,
        usercode: data.usercode
      })
    },
    /* 清除关于Autherizatiuon认证令牌存储信息， 将其重置 */
    clearAutherization: function (state) {
      state.auth.token = null
      state.auth.user = null
      state.auth.verify = false
      Cookies.clearCookieAutherization()
      console.log('out')
      router.push({
        name: 'index'
      })
    },
    /* 清除关于Autherizatiuon认证令牌存储信息， 将其重置 */
    clearMotAutherization: function (state) {
      state.auth.token = null
      state.auth.user = null
      state.auth.verify = false
      Cookies.clearCookieAutherization()
      console.log('clear')
    }
  },
  actions: {},
  getters: {
    getVerify: function (state) {
      return state.auth.verify
    },
    getUser: function (state) {
      return state.auth.user
    },
    getUserCode: function (state) {
      return state.auth.usercode
    },
    getUserPk: function (state) {
      return state.auth.pk
    }
  }
}
