import Vue from 'vue'
import App from './App'
import store from './store/index'
import router from './router'
import auth from '@/utils/auth'
import { locale } from 'iview'
import lang from 'iview/dist/locale/en-US'

import 'iview/dist/styles/iview.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)

locale(lang)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!auth.IsLogin()) {
      next({
        path: '/auth/login'
      })
      // query: { redirect: to.fullPath }
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  mounted () {
    document.dispatchEvent(new Event('render-event'))
  }
})
