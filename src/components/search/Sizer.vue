<!-- 商品筛选器 商品筛选 -->
<template>
  <div class="card-prep">
    <div class="preparation">
      <div v-if="heading">
        <span class="red">{{ search }}</span> 商品筛选 &nbsp;&nbsp;&nbsp;&nbsp; <span class="goods">共 {{ count }}个商品</span>
      </div>
      <div v-else>
        “<span class="red">{{ search }}</span>” 搜索结果 &nbsp;&nbsp;&nbsp;&nbsp; <span class="goods">共 {{ count }}个商品</span>
      </div>
    </div>
    <div v-if="heading">
      <Divider/>
      <div v-for="(item, key) in value" :key="key" class="filter">
        <div class="content">
          <div class="label">{{ item.label }}：</div>
          <div class="children">
            <ul>
              <li v-for="(i, key) in item.children" :key="key">{{ i.name }}</li>
            </ul>
          </div>
        </div>
        <Divider :dashed="true" v-if="value.length - 1 > key"/>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    Divider
  } from 'iview'

  export default {
    name: 'Sizer',
    components: {
      Divider
    },
    props: {
      value: {
        type: Array
      },
      count: {
        type: [String, Number]
      },
      heading: {
        type: Boolean,
        default () {
          return true
        }
      },
      search: {
        type: String
      }
    }
  }
</script>

<style scoped>
  ul {
    margin: 0;
  }

  .filter .label {
    width: 10%;
    float: left;
    color: #808695;
    background: #fafbfc;
    padding: 7px 7px 9.5px 7px;
  }

  .filter .children {
    width: 90%;
    float: left;
    padding: 4.5px;
  }

  .filter .content {
    display: flex;
    color: #515a6e;
    font-size: 14px;
    /*line-height: 14px;*/
    /*padding: 0 10px;*/
  }

  .filter ul {
    color: #808695;
    font-weight: normal;
    list-style: none;
  }

  .children > ul li {
    float: left;
    width: 105px;
    margin: 3px 10px;
    padding: 0 15px;
    overflow: hidden;
    white-space: nowrap
  }

  .card-prep {
    padding-bottom: 0;
    background: #ebf5ff12;
    border-top: 1px solid #e8eaec;
    border-left: 1px solid rgba(232, 234, 236, 0.76);
    border-bottom: 1px solid #e8eaec;
  }

  .preparation {
    padding: 5px;
    color: #515a6e;
    font-weight: bold;
    background: rgba(245, 247, 249, 0.48);
  }

  .preparation .red {
    color: #ed4014;
    font-weight: lighter;
  }

  .preparation .goods {
    color: #808695;
    font-weight: lighter;
  }

  >>> .ivu-breadcrumb {
    padding: 5px 0;
    font-size: 17px;
  }

  >>> .ivu-breadcrumb span:last-child {
    font-weight: 500;
  }
</style>
