<!-- 分类，商品搜索，商品列表 -->
<template>
  <div class="mb-3 mt-3">
    <Card dis-hover v-if="loading">
      <Spin fix>加载中...</Spin>
    </Card>
    <Card dis-hover :bordered="false">
      <div class="float-right" style="margin: -10px;">
        <Page :total="count" :page-size="pageSize" :current.sync="current" simple @on-change="setPage" class="m-0 p-0" />
      </div>
    </Card>

    <Row :gutter="20">
      <Col class="ivu-col-wid20" span="5"
           v-for="(item, key) in value" :key="key">
        <goods-carousel :values="item" :loading="loading"></goods-carousel>
      </Col>
    </Row>

    <Card dis-hover :bordered="false" class="float-right">
      <Page :total="count" :page-size="pageSize" :current.sync="current" @on-change="setPage" />
    </Card>
  </div>
</template>

<script>
  import {
    Row,
    Col,
    Card,
    Page,
    Spin,
    Icon
  } from 'iview'
  import GoodsCarousel from '@/components/index/GoodsCarousel'

  export default {
    name: 'GoodsList',
    components: {
      Row,
      Col,
      Card,
      Page,
      Spin,
      Icon,
      'goods-carousel': GoodsCarousel
    },
    data: function () {
      return {
        current: 1
      }
    },
    props: {
      value: {
        type: Array
      },
      count: {
        type: [String, Number]
      },
      pageSize: {
        type: [Number, String],
        default: function () {
          return 20
        }
      },
      loading: {
        type: Boolean,
        default: function () {
          return false
        }
      }
    },
    methods: {
      setPage: function (page) {
        this.$emit('on-change', page)
      }
    }
  }
</script>

<style scoped>
  .ivu-col-wid20 {
    width: 20%;
    display: block;
  }
</style>
