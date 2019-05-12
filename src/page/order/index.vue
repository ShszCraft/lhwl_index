<template>
  <div class="container-width">
    <HeaderColumn class="mt-3"></HeaderColumn>
    <div class="m-3" dis-hover>
      <Row>
        <Col class="mt-3 pr-3" :span="4">
          <Menu theme="light" active-name="1" width="auto">
            <MenuGroup title="订单中心">
              <MenuItem name="1">
                <Icon type="md-document"/>
                我的订单
              </MenuItem>
            </MenuGroup>
          </Menu>
        </Col>
        <Col class="mt-3 pl-3" :span="20">
          <Card title="我的订单" class="mb-3">
            <Tabs style="height: 100%">
              <TabPane label="全部订单">
                <Tables state="all"
                        :data="order.all.data"
                        @print-contract-order="onClickAllPrintContract"
                        @print-acceptance-order="onClickAllPrintAcceptance"
                        @collection-order="onClickAllCollection"
                        @remove-order="onClickAllRemove"
                        @clone-order="onClickAllCloneOrder">
                </Tables>
              </TabPane>
              <TabPane label="待收货">
                <Tables state="receiving"
                        :data="order.receiving.data"
                        @print-contract-order="onClickReceivingPrintContract"
                        @print-acceptance-order="onClickReceivingPrintAcceptance"
                        @collection-order="onClickReceivingCollection"
                        @clone-order="onClickReceivingCloneOrder"></Tables>
              </TabPane>
              <TabPane label="已完成">
                <Tables state="complete"
                        :data="order.complete.data"
                        @print-contract-order="onClickCompletePrintContract"
                        @print-acceptance-order="onClickCompletePrintAcceptance"
                        @remove-order="onClickCompleteRemove"></Tables>
              </TabPane>
              <TabPane label="已取消">
                <Tables state="cancel"
                        :data="order.cancel.data"
                        @remove-order="onClickCancelRemove"></Tables>
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
  import {
    Row,
    Col,
    Card,
    Icon,
    Menu,
    MenuItem,
    MenuGroup,
    Tabs,
    TabPane,
    Message
  } from 'iview'
  import {
    Alert
  } from 'element-ui'
  import '@/assets/Icon-order/iconfont.css'

  import Tables from '../../components/order/Tables'
  import axios from '@/axios/index'

  import dev from '../../../config/dev.env'

  export default {
    name: 'orderIndex',
    // 注入reload, AppVue中注册
    // inject: ['reload'],
    data () {
      return {
        pk: null,
        order: {
          all: {
            data: [
            ]
          },
          receiving: {
            data: [
            ]
          },
          complete: {
            data: [
            ]
          },
          cancel: {
            data: [
            ]
          }
        }
      }
    },
    created () {
      /* 初始化用户ID */
      this.pk = this.$store.getters['auth/getUserPk']
      /* 全部订单 */
      console.log('pk', this.pk)
      axios.methodOrder('GET', {
        key: this.pk
      }).then(response => {
        this.order.all.data = response.data.results
      })
      /* 待收货 */
      axios.methodOrder('GET', {
        key: this.pk,
        state: 2
      }).then(response => {
        this.order.receiving.data = response.data.results
      })
      /* 已完成 */
      axios.methodOrder('GET', {
        key: this.pk,
        state: 0
      }).then(response => {
        this.order.complete.data = response.data.results
      })
      /* 已取消 */
      axios.methodOrder('GET', {
        key: this.pk,
        state: 5
      }).then(response => {
        this.order.cancel.data = response.data.results
      })
    },
    components: {
      Row,
      Col,
      Card,
      Icon,
      Menu,
      MenuItem,
      MenuGroup,
      Tabs,
      TabPane,
      'el-alert': Alert,
      'Tables': Tables
    },
    methods: {
      /* Axios 接口相关操作 */
      Receiving: function (value) {
        // 订单收货处理
        return axios.methodOrder('PATCH', {
          ordtype: 1
        }, value.scope.row.id)
      },
      Delete: function (value) {
        // 订单删除处理
        return axios.methodOrder('DELETE', {}, value.scope.row.id)
      },
      Cancel: function (value) {
        // 取消订单处理
        return axios.methodOrder('PATCH', {
          isgotuaddress: true
        }, value.scope.row.id)
      },
      /* ==== 全部订单 ==== */
      onClickAllPrintContract: function (value) {
        // 打印合同
        console.log('打印合同', value)
      },
      onClickAllPrintAcceptance: function (value) {
        // 打印验收单
        console.log('打印验收单', value)
        window.open(dev.zycgBaseUrl + value.scope.row.acceptance.ysd_code, '_blank')
      },
      onClickAllCollection: function (value) {
        // 订单收货处理
        this.Receiving(value).then(response => {
          this.order.all.data[value.scope.$index].state = response.data.state
          this.order.all.data[value.scope.$index].ordtype = response.data.ordtype
        })
        Message.success('操作成功，您的订单以收货')
      },
      onClickAllRemove: function (value) {
        // 订单删除处理
        this.Delete().then(reponse => {
          this.order.all.data.splice(value.scope.$index, 1)
          Message.success('订单以删除')
        })
      },
      onClickAllCloneOrder: function (value) {
        // 取消订单处理
        this.Cancel(value).then(response => {
          this.order.all.data[value.scope.$index].state = 5
          Message.success('操作成功，您的订单以取消')
        })
      },
      /* ==== 待收货 ==== */
      onClickReceivingPrintContract: function (value) {
        // 打印合同
        console.log('打印合同', value)
      },
      onClickReceivingPrintAcceptance: function (value) {
        // 打印验收单
        window.open(dev.zycgBaseUrl + value.scope.row.acceptance.ysd_code, '_blank')
      },
      onClickReceivingCollection: function (value) {
        // 订单收货处理
        this.Receiving(value).then(response => {
          this.order.receiving.data[value.scope.$index].state = 0
          this.order.complete.data.unshift(this.order.receiving.data[value.scope.$index])
          this.order.receiving.data.splice(value.scope.$index, 1)
          Message.success('操作成功，您的订单以收货')
        })
      },
      onClickReceivingCloneOrder: function (value) {
        // 订单取消处理
        this.Cancel(value).then(response => {
          this.order.receiving.data[value.scope.$index].state = 5
          this.order.cancel.data.unshift(this.order.receiving.data[value.scope.$index])
          this.order.receiving.data.splice(value.scope.$index, 1)
          Message.success('操作成功，您的订单以取消')
        })
      },
      /* ==== 已完成订单 ==== */
      onClickCompletePrintContract: function (value) {
        // 打印合同
        console.log('打印合同', value)
      },
      onClickCompletePrintAcceptance: function (value) {
        // 打印验收单
        console.log('打印验收单', value)
      },
      onClickCompleteRemove: function (value) {
        // 订单删除处理
        console.log('订单删除处理', value)
        this.Delete().then(reponse => {
          this.order.complete.data.splice(value.scope.$index, 1)
          Message.success('订单以删除')
        })
      },
      /* 订单删除处理 */
      onClickCancelRemove: function (value) {
        this.Delete().then(reponse => {
          this.order.cancel.data.splice(value.scope.$index, 1)
          Message.success('订单以删除')
        })
      }
      /* ==== 已取消订单 ==== */
    },
    computed: {
      getUserPk: function () {
        return this.$store.getters['auth/getUserPk']
      }
    },
    watch: {
      getUserPk: function (a, b) {
        this.pk = a
      }
    }
  }
</script>

<style scoped>
  >>> .ivu-card-head > p {
    margin-bottom: 0;
  }

</style>
