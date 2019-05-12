<!--
商品展示块
如果传入一个list，将会以走马灯方式播放

用于首页，搜索 展示的商品小板块

商品微标状态及相应指示：
values.badgeGoods = '[new|burst|scrap]'
new = '新品' 通常表示 最新添加的商品，将会以 新品标识
burst = '热卖' 通常表示 销售在某一段时间内达到一点阈值， 将会以 热卖标识
scrap = '下架' 通常表示 商品以下架， 将会以 下架标识
nothing = '无货' 通常表示 商品库存无货，或者商品库存设置商品为锁定状态， 将会以 无货标识

settings.bordered [true|false] 是否显示边框
settings.disHover [true|false] 禁用鼠标悬停显示阴影
-->
<template>
  <div class="mt-3">
    <router-link :to="to">
      <Card :bordered="setting.bordered"
            :dis-hover="setting.disHover">
        <div class="card-badge" v-if="badgeSetting">
          <Badge :text="badgeSetting.text" :type="badgeSetting.type">
            <a href="#" class="demo-badge"></a>
          </Badge>
        </div>
        <Carousel
          v-model="setting.value"
          :height="180"
          :loop="setting.loop"
          :autoplay="setting.autoplay"
          :autoplay-speed="setting.autoplaySpeed"
          :dots="setting.dots"
          :radius-dot="setting.radiusDot"
          :trigger="setting.trigger"
          :arrow="setting.arrow"
          :easing="setting.easing"
          @on-change="onChange">

          <CarouselItem v-for="(item, key) in values.image" :key="key">
            <vue-lazy-component :timeout="1" v-if="item.image">
              <img :src="item.image" class="card-image p-2">
            </vue-lazy-component>
            <vue-lazy-component :timeout="1" v-else>
              <img :src="item" class="card-image p-2" >
            </vue-lazy-component>
          </CarouselItem>
        </Carousel>
        <div class="card-info mt-1 text-center">
          <p class="card-info-title">{{ values.name }}</p>
          <p class="card-info-money">
            <currency :money="values.money"></currency>
          </p>
        </div>
      </Card>
    </router-link>
    <Spin v-if="loading" fix size="small"></Spin>
  </div>
</template>

<script>
  import {
    Card,
    Badge,
    Carousel,
    CarouselItem,
    Spin
  } from 'iview'
  import Link from 'iview/src/mixins/link'
  import currency from '@/components/currency'
  import { component as VueLazyComponent } from '@xunlei/vue-lazy-component'

  function random () {
    const max = 50
    const min = 10
    return Math.floor(Math.random() * (max - min + 1) + min) * 1000
  }

  export default {
    name: 'GoodsCarousel',
    data () {
      return {
        badgeSetting: {
          type: 'info',
          text: '新品'
        },
        to: {
          name: 'goods',
          params: {
            goodsId: this.values.id
          }
        },
        setting: this.settings,
        onImgError: 'this.src="' + require('@/assets/goods.png') + '"'
      }
    },
    created: function () {
      if (this.values.badgeGoods === 'new') {
        this.badgeSetting.type = 'info'
        this.badgeSetting.text = '新品'
      } else if (this.values.badgeGoods === 'burst') {
        this.badgeSetting.type = 'error'
        this.badgeSetting.text = '热卖'
      } else if (this.values.badgeGoods === 'scrap') {
        this.badgeSetting.type = 'warning'
        this.badgeSetting.text = '以下架'
      } else if (this.values.badgeGoods === 'nothing') {
        this.badgeSetting.type = 'warning'
        this.badgeSetting.text = '无货'
      } else {
        this.badgeSetting = null
      }

      if (this.settings.value === null) this.setting.value = 0
      if (this.settings.loop === null) this.setting.loop = true
      if (this.settings.autoplay === null) this.setting.autoplay = true
      if (this.settings.height === null) this.setting.height = '180'
      if (this.settings.autoplaySpeed === null) this.setting.autoplaySpeed = random()
      if (this.settings.dots === null) this.setting.dots = 'none'
      if (this.settings.radiusDot === null) this.setting.radiusDot = false
      if (this.settings.trigger === null) this.setting.trigger = 'hover'
      if (this.settings.arrow === null) this.setting.arrow = 'never'
      if (this.settings.easing === null) this.setting.easing = 'ease'
      if (this.settings.disHover === null) this.setting.disHover = false

      /* 只有一张图的时候 关闭轮询 */
      if (this.values.image.length === 1) {
        this.setting.autoplay = false
        this.setting.loop = false
      }
    },
    props: {
      settings: {
        type: Object,
        default: function () {
          return {
            value: 0,
            loop: true,
            autoplay: true,
            width: 180,
            height: 180,
            autoplaySpeed: random(),
            dots: 'none',
            radiusDot: false,
            trigger: 'hover',
            arrow: 'never',
            easing: 'ease',
            bordered: true,
            disHover: false
          }
        }
      },
      values: {
        type: Object,
        default: function () {
          return {
            id: 1620,
            name: '商品名称',
            image: [
              'http://dev.lhwill.com/media/images/15359587551367173639/head/2018-09-03%20151235-4287.jpg',
              'http://dev.lhwill.com/media/images/15359587551367173639/head/2018-09-03%20151235-3271.jpg',
              'http://dev.lhwill.com/media/images/15359587551367173639/head/2018-09-03%20151235-3496.jpg'
            ],
            to: {
              name: 'index'
            },
            money: 0.00,
            context: '',
            badgeGoods: 'new'
          }
        }
      },
      loading: {
        type: Boolean,
        default: function () {
          return false
        }
      }
    },
    components: {
      Link,
      Card,
      Badge,
      Carousel,
      CarouselItem,
      currency,
      Spin,
      'vue-lazy-component': VueLazyComponent
    },
    methods: {
      onChange: function (oldValue, value) {
        this.setting.autoplaySpeed = random()
        this.$emit('on-change', oldValue, value)
      }
    },
    computed: {
      getValueId: function () {
        return this.values.id
      }
    },
    watch: {
      getValueId: function (a, b) {
        this.to.params.goodsId = String(a)
      }
    }
  }
</script>

<style scoped>
  .card-image {
    width: 180px;
    height: 180px;
    /*margin: 0 auto;*/
    display: block;
  }

  .card-info {
    overflow: hidden;
  }

  .card-badge {
    padding: 0;
    margin-left: 5px;
    margin-top: -20px;
    position: absolute;
  }

  .card-info-title {
    color: #3a3a3a;
    font-size: 14px;
    font-weight: 400;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .card-info-money {
    font-size: 14px;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #ea0c0d;
  }

  a {
    text-decoration: none;
  }

</style>
