<template>
  <div>


    <Rotation :value="category" :wheel="wheel"></Rotation>
    <user-info-card></user-info-card>

    <div  v-loading="verify" element-loading-text="拼命加载中" v-if="verify" class="m-3 p-3 mb-5"></div>

    <sector v-for="(item, key) in sector" :key="key" :values="item"></sector>

  </div>
</template>

<script>
  import '@/assets/icon-zycg/iconfont.css'
  import {
    Card,
    Cell,
    CellGroup,
    Badge,
    Avatar,
    Divider,
    Row,
    Col,
    Tag,
    Spin,
    Icon
  } from 'iview'
  import {
    Loading
  } from 'element-ui'
  import Link from 'iview/src/mixins/link'

  import Rotation from '@/components/index/Rotation'
  import UserInfoCard from '@/components/index/UserInfoCard'
  import sector from '@/components/index/sector'
  import HeaderColumn from '@/components/index/HeaderColumn'
  import axios from '@/axios/index'
  import Vue from 'vue'
  // import HeaderColumn from '@/components/index/HeaderColumn'
  Vue.use(Loading.directive)

  export default {
    name: 'index',
    data () {
      return {
        verify: true,
        setting: {
          autoplay: true, // 自动切换
          autoplaySpeed: 5000,
          dots: 'inside',
          radiusDot: false, // 圆形指示器
          trigger: 'click',
          /* 切换箭头
           * hover:  悬停时显示
           * always:  一直显示
           * never:  不显示 */
          arrow: 'never'
        },
        wheel: [],
        sector: [],
        category: []
      }
    },
    created: function () {
      const loading = Loading.service({
        lock: true,
        text: '加载中...',
        spinner: 'el-icon-loading'
      })
      axios.modelsIndexWheel().then(response => {
        this.wheel = response.data.wheel
      })
      axios.methodIndex().then(response => {
        this.category = response.data.category
        loading.close()
      })
      axios.modelsIndexSector().then(response => {
        this.sector = response.data.sector
        this.verify = false
      })
      this.$store.commit('index/setMenuActive', '1')
    },
    components: {
      Link,
      Card,
      Avatar,
      Cell,
      CellGroup,
      Badge,
      Divider,
      Row,
      Col,
      Tag,
      Rotation,
      Spin,
      Icon,
      'sector': sector,
      'user-info-card': UserInfoCard,
      'header-column': HeaderColumn
    }
  }
</script>

<style scoped>
  >>> .container-width {
    width: 1200px;
    margin: auto;
  }

  .demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
  }
</style>

