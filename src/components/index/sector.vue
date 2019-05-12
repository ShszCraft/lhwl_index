<!--
 央采十八类分类大板块
 -->
<template>
  <div class="container-width p-3 mt-3">
    <div class="channel" v-if="setting.title">
      <h2 class="channel-title">{{ values.label }}</h2>
      <ul class="channel-nav" v-if="setting.nav">
        <li v-for="(item, key) in values.nav" :key="key">
          <router-link :to="item.to" :target="item.target">{{ item.name }}</router-link>
        </li>
      </ul>
      <div class="channel-more" v-if="setting.more">
        <router-link :to="values.more.to" :target="values.more.target">{{ values.more.name }}</router-link>
      </div>
    </div>


    <Row :gutter="20">

      <Col class="ivu-col-wid20" span="5"
           v-for="(item, key) in values.children" :key="key">
        <goods-carousel :values="item"></goods-carousel>
      </Col>

    </Row>
  </div>
</template>

<script>
  import {
    Row,
    Col
  } from 'iview'

  import GoodsCarousel from '@/components/index/GoodsCarousel'

  export default {
    name: 'sector',
    data: function () {
      return {
        setting: {
          title: false,
          nav: false,
          more: false
        }
      }
    },
    created: function () {
      if (this.values.label) this.setting.title = true
      if (this.values.nav) this.setting.nav = true
      if (this.values.more) this.setting.more = true
    },
    props: {
      values: {
        type: Object,
        default: function () {
          return {
            label: '标题',
            nav: [
              {
                name: '子栏目',
                target: '_blank',
                to: {
                  name: 'index'
                }
              },
              {
                name: '子栏目',
                target: '_blank',
                to: {
                  name: 'index'
                }
              }
            ],
            more: {
              name: '查看更多',
              target: '_blank',
              to: {
                name: 'index'
              }
            },
            children: [
              {
                id: 1623,
                name: '商品名称商品名称商品名称',
                image: [
                  'http://dev.lhwill.com/media/images/15359587551367173639/head/2018-09-03%20151235-4287.jpg',
                  'http://dev.lhwill.com/media/images/15359587551367173639/head/2018-09-03%20151235-3271.jpg',
                  'http://dev.lhwill.com/media/images/15359587551367173639/head/2018-09-03%20151235-3496.jpg'
                ],
                to: {
                  name: 'index'
                },
                money: 1515,
                context: '',
                badgeGoods: 'new'
              }, {
                id: 1622,
                name: '商品名称商品名称商品名称',
                image: [
                  'http://dev.lhwill.com/media/images/15359587551367173639/head/2018-09-03%20151235-4287.jpg',
                  'http://dev.lhwill.com/media/images/15359587551367173639/head/2018-09-03%20151235-3271.jpg',
                  'http://dev.lhwill.com/media/images/15359587551367173639/head/2018-09-03%20151235-3496.jpg'
                ],
                to: {
                  name: 'index'
                },
                money: 0.00,
                context: '商品名称商品名称商品名称',
                badgeGoods: 'new'
              }, {
                id: 1621,
                name: '商品名称商品名称商品名称',
                image: [
                  'http://dev.lhwill.com/media/images/15359587551367173639/head/2018-09-03%20151235-4287.jpg',
                  'http://dev.lhwill.com/media/images/15359587551367173639/head/2018-09-03%20151235-3271.jpg',
                  'http://dev.lhwill.com/media/images/15359587551367173639/head/2018-09-03%20151235-3496.jpg'
                ],
                to: {
                  name: 'index'
                },
                money: 0.00,
                context: '商品名称商品名称商品名称',
                badgeGoods: 'new'
              }, {
                id: 1620,
                name: '商品名称商品名称商品名称',
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
            ]
          }
        }
      }
    },
    components: {
      Row,
      Col,
      'goods-carousel': GoodsCarousel
    }
  }
</script>

<style scoped>
  .channel {

    overflow: hidden;
    margin: 22px 0 0;
    line-height: 32px;
    position: relative;
  }

  .channel h2 {
    font-size: 26px;
    color: #333;
    float: left;
  }

  .channel .channel-nav {
    margin-left: 28px;
    max-width: 950px;
    height: 32px;
    overflow: hidden;
    float: left;
    list-style: none;
  }

  .channel .channel-nav a {
    font-size: 14px;
    color: #999;
    margin-left: 0;
    margin-right: 24px;
    line-height: 32px;
  }

  .channel .channel-nav a {
    display: inline-block;
    font-size: 16px;
    margin: 0 10px;
    color: #a4a4a4;
    position: relative;
    text-decoration: none;
  }

  .channel .channel-nav a:hover {
    color: #795da3;
    font-weight: 600;
  }

  .channel .channel-nav li {
    float: left;
    font-size: 12px;
  }

  .channel .channel-more {
    height: 32px;
    float: right;
    text-align: center;
  }

  .channel .channel-more a {
    font-size: 14px;
    font-weight: 500;
    color: #333;
    text-decoration: none;
  }

  .channel .channel-more a:hover {
    color: red;
    font-weight: 700;
  }

  .ivu-col-wid20 {
    width: 20%;
    display: block;
  }
</style>
