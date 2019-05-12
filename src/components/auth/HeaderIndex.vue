<template>
  <Menu mode="horizontal" theme="light" class="login-menu-color" :active-name="activeName">
    <Menu mode="horizontal" theme="light"
          class="login-menu-context login-menu-color">
      <MenuItem name="1" :to="{name: 'index'}">
        首页
      </MenuItem>
      <div class="float-right">
        <MenuItem name="2" :to="{name: 'login'}">
          登录
        </MenuItem>
        <MenuItem name="3" :to="{name: 'register'}">
          注册账户
        </MenuItem>
        <MenuItem name="4">
          找回密码
        </MenuItem>
      </div>
    </Menu>
  </Menu>
</template>

<script>
  import {
    Menu,
    MenuItem
  } from 'iview'

  export default {
    name: 'HeaderIndex',
    props: {
      activeName: {
        type: Number,
        default: function () {
          return 2
        }
      }
    },
    components: {
      Menu,
      MenuItem
    }
  }
</script>

<style scoped>

</style>
