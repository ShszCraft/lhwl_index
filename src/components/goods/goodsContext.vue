<!-- 商品图文描述 规格，评价等 -->
<template>
  <div>
    <Tabs size="small">
      <TabPane label="商品介绍">
        <Card :bordered="false" dis-hover class="goods-info">
          <div v-html="content"></div>
        </Card>
      </TabPane>
      <TabPane label="规格与包装">
        <Card :bordered="false" dis-hover class="goods-info">
          <el-table
            :data="tables"
            style="width: 100%">
            <el-table-column
              prop="label"
              label="规格与包装"
              width="180">
            </el-table-column>
            <el-table-column
              prop="value"
              width="180">
            </el-table-column>
          </el-table>
        </Card>
      </TabPane>
      <TabPane label="商品评价(4)" disabled>
        <Card :bordered="false" dis-hover class="goods-info">
          商品评价
        </Card>
      </TabPane>
    </Tabs>
    <Divider orientation="left">
      <span style="color: #808695;">售后保障</span>
    </Divider>
  </div>
</template>

<script>
  import {
    Tabs,
    TabPane,
    Card,
    Divider
  } from 'iview'
  import {
    Table,
    TableColumn
  } from 'element-ui'

  export default {
    name: 'goodsContext',
    components: {
      Tabs,
      TabPane,
      Card,
      Divider,
      'el-table': Table,
      'el-table-column': TableColumn
    },
    props: {
      content: {
        type: String,
        default () {
          return ''
        }
      },
      tables: {
        type: Array,
        default () {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .goods-info {
    margin-top: -15px;
  }
</style>
