<template>
  <Header>
    <div class="container-width pl-3 pr-3">
      <Menu mode="horizontal" theme="light" active-name="1" @on-select="onMenu">
        <MenuItem name="1" to="/"> 首页</MenuItem>
        <div class="float-right">
          <span v-if="!user.verify">
            <MenuItem name="2" :to="{name: 'login'}">
              请登录
            </MenuItem>
            <MenuItem name="3" :to="{name: 'register'}">
              注册
            </MenuItem>
          </span>
          <span v-else>
            <Submenu name="2-1">
              <template slot="title">
                {{ user.username }}
              </template>
              <MenuItem name="2-1" disabled>用户中心</MenuItem>
              <MenuItem name="2-2" v-on:click="outLogin">登出</MenuItem>
            </Submenu>
          </span>

          <MenuItem name="4" :to="{name: 'order'}">
            我的订单
          </MenuItem>

          <Submenu name="5">
            <template slot="title">
              客户服务
            </template>

            <MenuItem name="5-1" disabled>帮助中心</MenuItem>

            <MenuItem name="5-2">联系客服</MenuItem>

          </Submenu>
          <MenuItem name="6">
            <Icon type="md-cart"/>
            购物车(0)
          </MenuItem>
        </div>
      </Menu>
    </div>
  </Header>
</template>

<script>
  import {
    Header,
    Menu,
    MenuItem,
    Icon,
    Submenu
  } from 'iview'

  export default {
    name: 'Header-Index',
    // 注入reload, AppVue中注册
    inject: ['reload'],
    data: function () {
      return {
        activeName: '',
        user: {
          verify: false, // 登录状态
          username: null // 用户名
        }
      }
    },
    created () {
      this.user.verify = this.$store.getters['auth/getVerify']
      this.user.username = this.$store.getters['auth/getUser']
    },
    methods: {
      onMenu: function (name) {
        if (name === '2-2') this.outLogin()
      },
      outLogin: function () {
        this.$store.commit('auth/clearAutherization')
        this.reload()
      }
    },
    components: {
      Header,
      Menu,
      MenuItem,
      Icon,
      Submenu
    },
    computed: {
      getMenuActives: function () {
        return this.$store.getters['index/getMenuActive']
      },

      getVerify: function () {
        return this.$store.getters['auth/getVerify']
      },

      getUsername: function () {
        return this.$store.getters['auth/getUser']
      }
    },
    watch: {
      getMenuActives: function (a, b) {
        this.activeName = a
      },
      getVerify: function (a, b) {
        this.user.verify = a
      },
      getUsername: function (a, b) {
        this.user.username = a
      }
    }
  }
</script>

<style scoped>
  .container-width {
    width: 1200px;
    margin: auto;
  }
</style>
