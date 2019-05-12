'use strict'

const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  zycgBaseUrl: 'http://mall-api.zycg.gov.cn/mall_ysd/ysd?ysd_code=',
  API: {
    BASE_URL: 'http://127.0.0.1:8000/api/v2/',
    TIMEOUT: 5000,
    WITHCREDENTIALS: false,
    XSRFCOOKIENAME: 'csrftoken',
    XSRFHEADERNAME: 'X-CSRFToken',
    TOKENPREFIX: 'JWT'
  }
})
