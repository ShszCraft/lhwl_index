<!-- 首页分类 -->
<template>
  <div class="category-left ml-3">

    <Card>
      <div class="category-relat"
           v-for="(item, key) in value" :key="key">
        <div class="category-info">
          <span class="category-title">{{ item.label }}</span>
          <div class="category-link">
            <router-link to="" v-for="(items, keys) in getChildren(item.children)" :key="keys" class="category-link-a">{{ items.label }}</router-link>
          </div>
        </div>
        <div class="category-panels">

          <div class="panels-text"
               v-for="(itemx, keyIndex) in item.children" :key="keyIndex">
            <router-link :to="getRuoter(itemx.id)">
              <vue-lazy-component>
                <img width="64" height="64" :src="itemx.image">
              </vue-lazy-component>
              <span>{{ itemx.label }}</span>
            </router-link>
          </div>

        </div>
      </div>

    </Card>

  </div>
</template>

<script>
  import {
    Card
  } from 'iview'
  import { component as VueLazyComponent } from '@xunlei/vue-lazy-component'

  export default {
    name: 'category',
    data () {
      return {
        children: []
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
      }
    },
    methods: {
      getChildren: function (value) {
        if (value) return value.slice(0, 5)
      },
      getRuoter: function (router) {
        return {
          name: 'list',
          params: {
            listId: router
          }
        }
      }
    },
    components: {
      Card,
      'vue-lazy-component': VueLazyComponent
    }
  }
</script>

<style scoped>

  /* 分类卡片 背景颜色 */
  .ivu-card {
    background: rgba(255, 255, 255, 0.9);
  }

  /* 分类卡片 边框 */
  >>> .ivu-card-bordered {
    border: unset;
  }

  /* 分类卡片 边距偏移 */
  >>> .ivu-card-body {
    padding: 0;
  }

  .category-relat {
    padding: 5px 15px 5px 15px;
  }

  /* 卡片分类相关 */
  .category-left {
    position: absolute;
    top: -5px;
    margin: 15px 10px 10px 0px;
    width: 200px;
  }

  .category-info {
    height: 45px;
    color: #0077aa;
    overflow: hidden;
    position: relative;
  }

  .category-panels {
    top: 0;
    z-index: 1;
    left: 198px;
    display: none;
    height: 605px;
    padding: 15px;
    overflow: hidden;
    max-width: 970px;
    background: #FFF;
    width: max-content;
    position: absolute;
    border-radius: 0 10px 10px 0;
    box-shadow: 0 0 46px rgba(0, 0, 0, 0.1);
  }


  /* 触发分类信息面板 将其展开 */
  .category-relat:hover .category-panels {
    display: unset;
    border-radius: 0 4px 4px 0;
  }

  /* 改变被Hover激活的DIV颜色 */
  .category-relat:hover {
    border: 0px solid;
    background-color: #fff;
    border-radius: 15px 0 15px 0;
  }

  /* 分类title */
  .category-relat .category-info .category-title {
    font-size: 15px;
    color: #848484;
    /*margin-top: -10px;*/
  }

  /* 分类SubTitle */
  .category-relat .category-info .category-link, .category-link a {
    color: #a6a6a6;
    font-size: 12px;
    padding-right: 5px;
    display: inline-block;
    margin: 2px;
  }


  /* 三级分类相关 */
  .panels-text {
    width: 235px;
    height: 90px;
    text-align: left;
    padding: 13px;
    display: inline-block;
  }

  .panels-text img {
    width: 64px;
    height: 64px;
  }

  .panels-text span {
    color: #777;
    font-size: 14px;
    margin-left: 10px;
  }

  .panels-text:hover {
    border-radius: 10px;
    background-color: #f6f6f6;
  }

  .panels-text a {
    width: 235px;
    height: 90px;
    display: block;
  }

  .panels-text a:hover {
    text-decoration: none;
  }

  >>> .ivu-card-head p, >>> .ivu-card-head-inner {
    margin-bottom: 0 !important;
  }

</style>
