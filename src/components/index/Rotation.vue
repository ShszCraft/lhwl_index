<!--
轮播图
及画圆角

首页轮播图 props.value
  value[I].label 一级分类名称
  value[I].children 子分类
    value[I].children[I].label 子分类名称

轮播图 props.wheel
  wheel[I].image 图片地址

-->
<template>
  <div class="category" style="width: 100%;">
    <Carousel
      :autoplay="setting.autoplay"
      :autoplay-speed="setting.autoplaySpeed"
      :dots="setting.dots"
      :radius-dot="setting.radiusDot"
      :trigger="setting.trigger"
      :arrow="setting.arrow">

      <CarouselItem v-for="(item, key) in wheel" :key="key">
        <div class="demo-carouse">
          <vue-lazy-component>
            <img :src="item.image" height="669px">
          </vue-lazy-component>
        </div>
      </CarouselItem>

    </Carousel>
    <div class="container-width">
      <category :value="value"></category>
    </div>
    <div class="mask">
      <span class="bg-left float-left"> </span>
      <span class="bg-right float-right"> </span>
    </div>
  </div>
</template>

<script>
  import {
    Carousel,
    CarouselItem
  } from 'iview'
  import category from '@/components/category'
  import { component as VueLazyComponent } from '@xunlei/vue-lazy-component'

  export default {
    name: 'Rotation',
    data () {
      return {
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
        }
      }
    },
    props: {
      value: {
        type: Array,
        default: function () {
          return [
            {
              label: '办公设备',
              children: [
                {
                  label: '打印机'
                },
                {
                  label: '复合机'
                },
                {
                  label: '一体机'
                }
              ]
            }
          ]
        }
      },
      wheel: {
        type: Array,
        default: function () {
          return [
            {
              image: 'https://res.vmallres.com/pimages//sale/2019-01/1mmojwOUIBpuLn8pGsP2.jpg'
            }
          ]
        }
      }
    },
    created: function () {
    },
    components: {
      Carousel,
      CarouselItem,
      category,
      'vue-lazy-component': VueLazyComponent
    }
  }
</script>

<style scoped>
  /* 首页大图指示器 */
  >>> .ivu-carousel-dots-inside {
    bottom: 20px;
  }

  .category {
    position: relative;
  }

  .container-width {
    width: 1200px;
    margin: auto;
  }

  >>> .ivu-carousel {
    height: 670px;
  }

  .mask {
    max-width: 2335px;
    min-width: 1450px;
    display: block;
    position: absolute;
    overflow: hidden;
    bottom: 0;
    z-index: 1;
    margin: auto;
    left: 0;
    right: 0;
  }

  .mask > .bg-left {
    height: 72px;
    width: 717px;
    background: url("../../assets/left.png") no-repeat;
  }

  .mask > .bg-right {
    height: 72px;
    width: 717px;
    background: url("../../assets/right.png") no-repeat;
  }

  .demo-carouse img {
    vertical-align: middle;
    display: table-cell;
    text-align: center;
    margin: 0 auto;
    width: 2335px;
    height: 670px;
  }
</style>
