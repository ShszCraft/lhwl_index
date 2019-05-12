<template>
  <div class="container-width pl-3 pr-3 pt-3">
    <Row :gutter="12">
      <Col span="10">
        <Swipers :value="goodsImage"></Swipers>
      </Col>
      <Col span="14">
        <GoodsInfo :title="name" :value="goodsMeal"></GoodsInfo>
      </Col>
      <Col span="24">
        <div class="text-center p-3" style="color: #9ea7b4; font-size: 12px;">温馨提示 ·支持7天无理由退货，15天免费换货</div>
      </Col>
      <Col span="24">
        <GoodsContext :content="content" :tables="goodsTables"></GoodsContext>
      </Col>
    </Row>
  </div>
</template>

<script>
  import {
    Row,
    Col
  } from 'iview'
  import Swipers from '@/components/goods/Swipers'
  import GoodsInfo from '@/components/goods/goodsInfo'
  import GoodsContext from '@/components/goods/goodsContext'

  import axios from '@/axios/index'

  export default {
    name: 'goods',
    data () {
      return {
        id: null,
        name: null,
        money: 0,
        content: '商品介绍',
        goodsMeal: [],
        goodsImage: [],
        goodsTables: []
      }
    },
    created: function () {
      axios.modelsGoods('GET', {}, this.goodsId).then(response => {
        this.id = response.data.id
        this.name = response.data.name
        this.money = Number(response.data.money)
        this.content = response.data.connet
        this.goodsImage = response.data.images_set
        this.goodsTables = response.data.with_info.meal
        this.goodsMeal = response.data.lease_set
      }).catch(error => {
        console.log('error', error)
      })
    },
    props: {
      goodsId: {
        type: [String, Number]
      }
    },
    components: {
      Row,
      Col,
      GoodsInfo,
      Swipers,
      GoodsContext
    },
    computed: {}
  }
</script>

<style scoped>
</style>
