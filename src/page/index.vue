<!-- 入口 页面主体模板框架 -->
<template>
  <Layout>
    <header-index></header-index>
    <header-column></header-column>
    <Content>
      <router-view name="index"></router-view>
    </Content>
    <Footer>Footer</Footer>
  </Layout>
</template>

<script>
  import {
    Layout,
    Footer,
    Content,
    Card,
    Breadcrumb,
    BreadcrumbItem,
    Avatar,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    MenuGroup
  } from 'iview'
  import Search from '@/components/NavbarSearch'
  import HeaderIndex from '@/components/index/Header-Index'
  import HeaderColumn from '@/components/index/HeaderColumn'
  export default {
    name: 'index',
    components: {
      'header-index': HeaderIndex,
      'header-column': HeaderColumn,
      Layout,
      Footer,
      Content,
      Card,

      Breadcrumb,
      BreadcrumbItem,

      Avatar,
      Search,
      Dropdown,
      DropdownMenu,
      DropdownItem,
      MenuGroup
    }
  }
</script>

<style scoped>

  >>> .ivu-layout-content {
    background: #fff;
  }
  >>> .container-width.pl-3.pr-3 .ivu-menu-light {
    background: #f5f7f9;
  }
  >>> .ivu-layout-header {
    background: #f5f7f9;
    padding: 0 15px;
    height: 60px;
    line-height: 50px;
    font-size: 12px;
    border-bottom: 1px solid #dcdee2;
  }

  .navbar-light {
    color: rgba(0, 0, 0, .5);
    text-decoration: none;
  }
</style>

<style>
  .container-width {
    width: 1200px;
    margin: auto;
  }

  .container-width > .width {
    width: 100%;
  }

  .ivu-layout {
    background: #ffffff !important;
  }
</style>
