<!--
二级栏目，通常用于首页二级栏目亦或二级导航条

用于实现 快捷导航， 商品搜索功能实现
-->

<template>
  <div class="container-width batcg">
    <b-navbar :toggleable="true" type="light" variant="" class="width m-auto">
      <b-navbar-brand href="#">
        <img src="@/assets/logo.png" alt="logo" width="200">
      </b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item href="#">促销专区</b-nav-item>
          <b-nav-item href="#">导航专区</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" style="margin-right: -15px;">
          <Search></Search>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
  import Search from '@/components/NavbarSearch'
  import HeaderIndex from '@/components/index/Header-Index'

  export default {
    name: 'Header-Column',
    components: {
      'header-index': HeaderIndex,
      Search
    }
  }
</script>

<style scoped>
.batcg {
  background: #ffffff;
}

</style>
