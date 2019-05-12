<!-- 商品分类展示商品 -->
<template>
  <div class="container-width pl-3 pr-3 pt-3">

    <Breadcrumb class="tag-bread">
      <BreadcrumbItem to="/">首页</BreadcrumbItem>
      <BreadcrumbItem to="">商品分类</BreadcrumbItem>
      <!--<BreadcrumbItem>-->
        <!--<Tag type="border" closable>品牌： 京瓷</Tag>-->
      <!--</BreadcrumbItem>-->
      <!--<BreadcrumbItem>-->
        <!--<Tag type="border" closable>价格： 1-699</Tag>-->
      <!--</BreadcrumbItem>-->
    </Breadcrumb>

    <!-- 商品筛选器 -->
    <Sizer :count="results.count" :value="prefix" :search="name"></Sizer>
    <!-- 商品筛选器 -->

    <!-- 商品列表 -->
    <GoodsList :value="values" :count="results.count" :loading="loading" :pageSize="pagination.pageSize" @on-change="setPage"></GoodsList>
    <!-- 商品列表 -->

  </div>
</template>

<script>
  import {
    Table,
    TableColumn
  } from 'element-ui'
  import {
    Row,
    Col,
    Tag,
    Card,
    Divider,
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Page
  } from 'iview'
  import GoodsCarousel from '@/components/index/GoodsCarousel'
  import axios from '@/axios/index'
  import Sizer from '@/components/search/Sizer'
  import GoodsList from '@/components/search/GoodsList'

  export default {
    name: 'searchingList',
    data () {
      return {
        name: null,
        loading: true,
        prefix: [
          {
            'label': '品牌',
            'children': [
              {
                'id': 15,
                'name': '京瓷'
              },
              {
                'id': 17,
                'name': 'PANTUM'
              },
              {
                'id': 19,
                'name': '理光'
              },
              {
                'id': 21,
                'name': '爱普生'
              },
              {
                'id': 95,
                'name': '惠普'
              },
              {
                'id': 97,
                'name': '兄弟'
              }
            ]
          },
          {
            'label': '价格',
            'children': [
              {
                'id': 57,
                'name': '1-699'
              },
              {
                'id': 59,
                'name': '700-1499'
              },
              {
                'id': 61,
                'name': '1500-3999'
              },
              {
                'id': 63,
                'name': '4000-6999'
              },
              {
                'id': 65,
                'name': '7000-19999'
              },
              {
                'id': 67,
                'name': '20000以上'
              }
            ]
          },
          {
            'label': ' 使用场景 ',
            'children': [
              {
                'id': 63,
                'name': '家庭打印'
              },
              {
                'id': 65,
                'name': '照片打印'
              },
              {
                'id': 67,
                'name': '家庭办公'
              },
              {
                'id': 69,
                'name': '小型商用'
              },
              {
                'id': 71,
                'name': '大型办公'
              },
              {
                'id': 73,
                'name': '发票快递单'
              },
              {
                'id': 75,
                'name': '其他'
              }
            ]
          },
          {
            'label': '技术类型',
            'children': [
              {
                'id': 59,
                'name': '墨仓/加墨式打印'
              },
              {
                'id': 61,
                'name': '喷墨'
              },
              {
                'id': 63,
                'name': '黑白激光'
              },
              {
                'id': 65,
                'name': '彩色激光'
              }
            ]
          },
          {
            'label': '耗材类型',
            'children': [
              {
                'id': 67,
                'name': '墨水'
              },
              {
                'id': 69,
                'name': '墨盒'
              },
              {
                'id': 71,
                'name': '鼓粉分离式硒鼓'
              },
              {
                'id': 73,
                'name': '一体式硒鼓'
              },
              {
                'id': 183,
                'name': '其他'
              }
            ]
          }
        ],
        values: [],
        results: {},
        pagination: {
          index: 1,
          count: 1,
          pageSize: 60,
          next: null,
          previous: null
        }
      }
    },
    created () {
      axios.modelsSearchingList('GET', {}, this.listId).then(response => {
        this.name = response.data.name
        this.prefix = response.data.prefix
        this.values = response.data.search.results
        this.pagination.count = response.data.search.results.count
        this.pagination.next = response.data.search.results.next
        this.pagination.previous = response.data.search.results.previous
        this.results = response.data.search
        this.loading = false
      })
    },
    props: {
      listId: {
        type: [Number, String]
      }
    },
    methods: {
      setPage: function (page) {
        this.loading = true
        this.pagination.index = page
        axios.modelsSearchingList('GET', {}, this.listId, this.pagination).then(response => {
          this.values = []
          this.$nextTick(() => {
            this.values = response.data.search.results
            this.loading = false
          })
          this.results = response.data.search
        })
      }
    },
    components: {
      'el-table': Table,
      'el-table-column': TableColumn,
      'goods-carousel': GoodsCarousel,
      Row,
      Col,
      Tag,
      Card,
      Button,
      Divider,
      Breadcrumb,
      BreadcrumbItem,
      Page,

      Sizer,
      GoodsList
    }
  }
</script>

<style scoped>
  .tag-bread {
    padding-bottom: 5px;
  }
  >>> .ivu-card {
    border-radius: 0;
  }
  >>> .card-prep .ivu-divider-horizontal {
    margin: 0 0 !important;
  }
  >>> .tag-bread .ivu-tag-border {
    font-size: 12px;
    line-height: 20px;
    margin-top: -1px;
  }
</style>
