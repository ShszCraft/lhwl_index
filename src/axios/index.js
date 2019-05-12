/*
 * [*] 必填 否则查询不到
 * [x] 不存在的参数，不能填 */
import 'es6-promise/auto'
import axios from 'axios'
import Cookies from '@/utils/Cookie'
import config from '@/../config/dev.env'
import store from '../store/index'

import {
  authorization,
  authorizationRefresh,
  authorizationVerify,
  methodIndex,
  methodOrder,
  modelPrivateUser,
  modelsIndexWheel,
  modelsIndexSector,
  modelsGoods,
  modelsSearchingList,
  modelsSearching
} from './restful'

axios.defaults.baseURL = config.API.BASE_URL
axios.defaults.timeout = config.API.TIMEOUT
axios.defaults.withCredentials = config.API.WITHCREDENTIALS
axios.defaults.xsrfCookieName = config.API.XSRFCOOKIENAME
axios.defaults.xsrfHeaderName = config.API.XSRFHEADERNAME

/* 接口请求拦截器 */
axios.interceptors.request.use(requset => {
  const Autherization = Cookies.getCookieAutherization()
  if (Autherization.token) {
    requset.headers.Authorization = config.API.TOKENPREFIX + ' ' + Autherization.token
  }
  return requset
}, error => {
  return Promise.reject(error.response)
})
/* 请求数据返回拦截器 */
axios.interceptors.response.use(response => {
  return response
}, error => {
  console.log('error', error.response)
  return Promise.reject(error.response)
})
export default {
  /*
   * 拼接data/pagination数据部分
   * @param {Object} data 用户请求数据
   * @param {Object} pagination 分页器，实现数据条目分页处理
   *     pagination.index 分页索引
   *     pagination.pageSize 分页大小(一个分页多少条数据)
   *     pagination.count 分页总数(接口数据集合条目)
   *     pagination.next 下一页(没有数据为null)
   *     pagination.previous 上一页(没有数据为null) */
  Data: function (data, pagination = {}) {
    if (pagination) {
      let offset = pagination.index
      const limit = pagination.pageSize
      if (offset && limit) {
        offset = Math.round(limit * (offset - 1) + 0.4)
        data['offset'] = offset
        data['limit'] = limit
      }
    }
    return data
  },
  /* 获取JwtToken令牌
   * @param {String} username 用户名 [*]
   * @param {String} password 密码 [*] */
  authorization: function (username, password) {
    return Axios(authorization(), 'POST', this.Data({
      username: username,
      password: password
    }))
  },
  /* 刷新JwtToken令牌过期时间
   * @param {String} token JwtToken令牌 [*] */
  authorizationRefresh: function (token) {
    return Axios(authorizationRefresh(), 'POST', this.Data({
      token: token
    }, {}))
  },
  /* 验证JwtToken令牌是否有效
   * @param {String} token JwtToken令牌 [*] */
  authorizationVerify: function (token) {
    return Axios(authorizationVerify(), 'POST', this.Data({
      token: token
    }, {}))
  },
  /* 用户User接口
   * @param {String} method [GET|POST|PUT|PATCH|DELETE|OPTIONS] 等请求方式
   * @param {Object} data 请求数据
   * @param {Number} index 请求数据索引ID，比如获取某条数据，修改某条数据
   * @param {Object} pagination 分页器，实现数据条目分页处理
   *     pagination.index 分页索引
   *     pagination.pageSize 分页大小(一个分页多少条数据)
   *     pagination.count 分页总数(接口数据集合条目)
   *     pagination.next 下一页(没有数据为null)
   *     pagination.previous 上一页(没有数据为null) */
  modelPrivateUser: function (method = 'GET', data = {}, index = null, pagination = {}) {
    return Axios(modelPrivateUser(index), method, this.Data(data, pagination))
  },
  /* 首页Index接口， 板块信息商品信息
   * @param {String} method [GET] 等请求方式
   * @param {Object} data 请求数据  [不可用]
   * @param {Number} index 索引ID [不可用]
   * @param {Object} pagination 分页器，实现数据条目分页处理  [不可用]
   *     @param pagination.index 分页索引
   *     @param pagination.pageSize 分页大小(一个分页多少条数据)
   *     @param pagination.count 分页总数(接口数据集合条目)
   *     @param pagination.next 下一页(没有数据为null)
   *     @param pagination.previous 上一页(没有数据为null) */
  modelsIndexSector: function (method = 'GET', data = {}, index = null, pagination = {}) {
    return Axios(modelsIndexSector(index), method, this.Data(data, pagination))
  },
  /* 首页Index接口， 包含首页分类及板块信息商品信息等
   * @param {String} method [GET] 等请求方式
   * @param {Object} data 请求数据  [不可用]
   * @param {Number} index 索引ID [不可用]
   * @param {Object} pagination 分页器，实现数据条目分页处理  [不可用]
   *     @param pagination.index 分页索引
   *     @param pagination.pageSize 分页大小(一个分页多少条数据)
   *     @param pagination.count 分页总数(接口数据集合条目)
   *     @param pagination.next 下一页(没有数据为null)
   *     @param pagination.previous 上一页(没有数据为null) */
  modelsIndexWheel: function (method = 'GET', data = {}, index = null, pagination = {}) {
    return Axios(modelsIndexWheel(index), method, this.Data(data, pagination))
  },
  /* 首页Index接口， 包含首页分类及板块信息商品信息等
   * @param {String} method [GET] 等请求方式
   * @param {Object} data 请求数据  [不可用]
   * @param {Number} index 索引ID [不可用]
   * @param {Object} pagination 分页器，实现数据条目分页处理  [不可用]
   *     @param pagination.index 分页索引
   *     @param pagination.pageSize 分页大小(一个分页多少条数据)
   *     @param pagination.count 分页总数(接口数据集合条目)
   *     @param pagination.next 下一页(没有数据为null)
   *     @param pagination.previous 上一页(没有数据为null) */
  methodIndex: function (method = 'GET', data = {}, index = null, pagination = {}) {
    return Axios(methodIndex(index), method, this.Data(data, pagination))
  },
  /* 订单Order接口， 查询订单信息接口
   * @param {String} method [GET] 等请求方式
   * @param {Object} data 请求数据
   * @param {Number} index 索引ID
   * @param {Object} pagination 分页器，实现数据条目分页处理
   *     @param pagination.index 分页索引
   *     @param pagination.pageSize 分页大小(一个分页多少条数据)
   *     @param pagination.count 分页总数(接口数据集合条目)
   *     @param pagination.next 下一页(没有数据为null)
   *     @param pagination.previous 上一页(没有数据为null) */
  methodOrder: function (method = 'GET', data = {}, index = null, pagination = {}) {
    return Axios(methodOrder(index), method, this.Data(data, pagination))
  },
  /* 商品Goods接口， 获取商品实例信息
   * @param {String} method [GET] 等请求方式
   * @param {Object} data 请求数据
   * @param {Number} index 索引ID
   * @param {Object} pagination 分页器，实现数据条目分页处理
   *     @param pagination.index 分页索引
   *     @param pagination.pageSize 分页大小(一个分页多少条数据)
   *     @param pagination.count 分页总数(接口数据集合条目)
   *     @param pagination.next 下一页(没有数据为null)
   *     @param pagination.previous 上一页(没有数据为null) */
  modelsGoods: function (method = 'GET', data = {}, index = null, pagination = {}) {
    return Axios(modelsGoods(index), method, this.Data(data, pagination))
  },
  /* 商品子分类SearchingList接口， 获取子分类筛选及商品信息
   * @param {String} method [GET] 等请求方式
   * @param {Object} data 请求数据
   * @param {Number} index 索引ID [*]
   * @param {Object} pagination 分页器，实现数据条目分页处理
   *     @param pagination.index 分页索引
   *     @param pagination.pageSize 分页大小(一个分页多少条数据)
   *     @param pagination.count 分页总数(接口数据集合条目)
   *     @param pagination.next 下一页(没有数据为null)
   *     @param pagination.previous 上一页(没有数据为null) */
  modelsSearchingList: function (method = 'GET', data = {}, index = null, pagination = {}) {
    return Axios(modelsSearchingList(index), method, this.Data(data, pagination))
  },
  /* 搜索商品Searching接口， 搜索关键字获取商品信息
   * @param {String} method [GET] 等请求方式
   * @param {Object} data 请求数据
   * @param {Number} index 索引ID [x]
   * @param {Object} pagination 分页器，实现数据条目分页处理
   *     @param pagination.index 分页索引
   *     @param pagination.pageSize 分页大小(一个分页多少条数据)
   *     @param pagination.count 分页总数(接口数据集合条目)
   *     @param pagination.next 下一页(没有数据为null)
   *     @param pagination.previous 上一页(没有数据为null) */
  modelsSearching: function (method = 'GET', data = {}, index = null, pagination = {}) {
    return Axios(modelsSearching(index), method, this.Data(data, pagination))
  }
  /*
   * 请按照以下规范来完成后端接口对接
   * Dome: function (method = 'GET', data = {}, index = null, pagination = {}) {
   *    return Axios(Dome(index), method, this.Data(data, pagination))
   * }
   */
}

import {
  InterfaceSignatureExpiredExist
} from '@/axios/Exception'
// import router from '@/router/index'

/* 封装好的请求方法
 * @param {String} url 请求接口地址，不带http://xxx.xxx.xxx
 * @param {String} method 请求方式[GET|POST|PUT|PATCH|DELETE|...], restful有的method方法都支持，只需传入即可
 * @param {Object} data 用户接口请求的data数据 */
export function Axios (url, method = 'GET', data = {}) {
  return new Promise((resolve, reject) => {
    let params = null
    if (method.toUpperCase() === 'GET') {
      params = data
      data = null
    }
    const validateStatus = status => {
      /* 定义接口有效状态码范围 */
      return status >= 200 && status < 300
    }
    axios({
      url: url,
      data: data,
      params: params,
      method: method,
      validateStatus: validateStatus
    }).then(response => {
      return resolve(response)
    }).catch(error => {
      InterfaceSignatureExpiredExist(error).then(reject => {
        store.commit('auth/clearMotAutherization')
        store.commit('index/setIsRouterAlive', true)
      })
      return reject(error)
    })
  })
}
