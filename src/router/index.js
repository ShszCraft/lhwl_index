import Vue from 'vue'
import Router from 'vue-router'

const Index = () => import('@/page/index')
const AuthIndex = () => import('@/page/auth/index')
const Login = () => import('@/page/auth/login')
const Register = () => import('@/page/auth/register')
const PageIndex = () => import('@/page/Index/index')
const OrderIndex = () => import('@/page/order/index')

const Goods = () => import('@/page/goods/index')
const Searching = () => import('@/page/index/searching')
const SearchingList = () => import('@/page/index/searchingList')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Index,
      meta: {
        requiresAuth: false
      },
      children: [
        {
          path: '/',
          name: 'index',
          components: {
            index: PageIndex
          }
        },
        {
          path: '/list/:listId',
          name: 'list',
          components: {
            index: SearchingList
          },
          props: {
            index: true
          }
        },
        {
          path: '/search',
          name: 'search',
          components: {
            index: Searching
          }
        }
      ]
    },
    {
      path: '/auth',
      meta: {
        requiresAuth: false
      },
      component: AuthIndex,
      children: [
        {
          path: '/auth/login',
          name: 'login',
          components: {
            auth: Login
          }
        },
        {
          path: '/auth/register',
          name: 'register',
          components: {
            auth: Register
          }
        }
      ]
    },
    {
      path: '/order',
      component: Index,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '/order',
          name: 'order',
          components: {
            index: OrderIndex
          }
        }
      ]
    },
    {
      path: '/goods',
      component: Index,
      meta: {
        requiresAuth: false
      },
      children: [
        {
          path: '/goods/:goodsId',
          name: 'goods',
          components: {
            index: Goods
          },
          props: {
            index: true
          }
        }
      ]
    }
  ]
})
