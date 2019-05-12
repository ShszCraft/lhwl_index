<!--
props.state 自定义状态
  all: 全部订单
  receiving: 待收货
  complete: 已完成
  cancel: 已取消
    : 传入一个自定义状态，每次操作会返回此状态，已达到记录某种操作。

props.dropdown 操作按钮
  dropdown.name String 主按钮名称
  dropdown.to [String|Object] 主按钮路由
  dropdown.href String 跳转的地址
  dropdown.target String
    dropdown.item Array 下拉按钮组
       .name String 名称
       .to [String|Object] 路由
       .href String 跳转的地址
       .target String

event.onClickDropdown 主按钮操作回调，如果存在to，href，不触发回调
  Event Return Data: { scope: scope, state: state, dropdown: dropdown }
    scope: slot-scope 数据
    state: 自定义状态 传入一个自定义状态，每次操作会返回此状态，已达到记录某种操作。
    dropdown: 操作按钮相关数据，来源于props.dropdown

event.onClickDropdownCommand 下拉按钮组操作回调，如果存在to，href，不触发回调
  Event Return Data: { scope: scope, state: state, item: item }
    scope: slot-scope 数据
    state: 自定义状态 传入一个自定义状态，每次操作会返回此状态，已达到记录某种操作。
    item: 下拉按钮相关数据，来源于props.dropdown.item

-->
<template>
  <el-table
          ref="multipleTable"
          :data="data"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
    <el-table-column type="expand">
      <template slot-scope="scope">
        <!--<Row :gutter="20">-->
        <!--<Col :span="12">-->
        <!--<Card title="配送地址">-->
        <!--姓名：{{ scope.row.consignee.consigneeName }} <br>-->
        <!--所在地区： {{ scope.row.consignee.province }} {{ scope.row.consignee.area }} {{ scope.row.consignee.city }}<br>-->
        <!--地址: {{ scope.row.consignee.consigneeAddress }}<br>-->
        <!--手机: {{ scope.row.consignee.consigneeMobile }} <br>-->
        <!--</Card>-->
        <!--</Col>-->
        <!--<Col :span="12">-->
        <!--<Card title="发票">-->
        <!--单位名称：{{ scope.row.bill.unitName }} <br>-->
        <!--纳税人识别码：{{ scope.row.bill.taxpayer }} <br>-->
        <!--注册地址：{{ scope.row.bill.registeredAddress }} <br>-->
        <!--注册电话：{{ scope.row.bill.registeredTelephone }} <br>-->
        <!--开户银行：{{ scope.row.bill.accountOpening }} <br>-->
        <!--银行账户：{{ scope.row.bill.account }} <br>-->
        <!--</Card>-->
        <!--</Col>-->
        <!--</Row>-->
        <!--<Card class="m-0 p-0 mt-3">-->
        <!--<el-table-->
        <!--ref="goodsList"-->
        <!--:data="scope.row.goodsList"-->
        <!--tooltip-effect="dark"-->
        <!--style="width: 100%"-->
        <!--@selection-change="handleSelectionChange">-->
        <!--<el-table-column-->
        <!--label="商品"-->
        <!--show-overflow-tooltip>-->
        <!--<template slot-scope="scope">-->
        <!--<img :src="scope.row.image"-->
        <!--:alt="scope.row.name"-->
        <!--width="60" height="60">-->
        <!--<span>{{ scope.row.name }}</span>-->
        <!--</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
        <!--prop="quantity"-->
        <!--label="数量"-->
        <!--width="120">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
        <!--prop="price"-->
        <!--label="单价"-->
        <!--width="120">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
        <!--prop="money"-->
        <!--label="金额"-->
        <!--width="120">-->
        <!--</el-table-column>-->
        <!--</el-table>-->
        <!--</Card>-->
      </template>
    </el-table-column>

    <el-table-column
            type="selection"
            width="55">
    </el-table-column>
    <el-table-column
            label="订单"
            show-overflow-tooltip>
      <template slot-scope="scope">
        {{ scope.row.orderid }}
      </template>
    </el-table-column>
    <el-table-column
            label="收货人"
            width="120">
      <template slot-scope="scope">
        <el-popover
                placement="left-start"
                trigger="hover">
          <template slot="reference">
            <div>{{ scope.row.linkman }}</div>
          </template>

          <div class="m-0 p-1">
            <span style="font-weight: bolder">{{ scope.row.linkman }}</span> <br>
            <span>{{ scope.row.province }} {{ scope.row.city }} {{ scope.row.area }} {{ scope.row.deliveryaddress }} </span>
            <br>
            <span>{{ scope.row.linkmobile }}</span> <br>
          </div>

        </el-popover>
      </template>
    </el-table-column>
    <el-table-column
            prop="total"
            label="总计"
            width="120">
    </el-table-column>
    <el-table-column
      label="结账"
      width="70">
      <template slot-scope="scope">
        <div v-if="scope.row.ispaid === 0">
          <el-popover
            placement="left-start"
            trigger="hover">
            <template slot="reference">
              <Tag type="border" color="warning">否</Tag>
            </template>
            <div class="m-0 p-0">
              订单未结账
            </div>
          </el-popover>
        </div>
        <div v-else>
          <el-popover
            placement="left-start"
            trigger="hover">
            <template slot="reference">
              <Tag type="border" color="success">是</Tag>
            </template>
            <div class="m-0 p-0">
              <span>订单已结账</span>
            </div>
          </el-popover>
        </div>
      </template>
    </el-table-column>
    <el-table-column
            label="状态"
            width="120">
      <template slot-scope="scope">
        <div v-if="scope.row.state === -1">
          <Tag type="border" color="primary">待发货</Tag>
        </div>
        <div v-else-if="scope.row.state === 0">
          <div v-if="scope.row.ispaid === 0">
            <el-popover
              placement="left-start"
              trigger="hover">
              <template slot="reference">
                <Tag type="border" color="success">待结账</Tag>
              </template>
              <div class="m-0 p-0">
                订单已收货，但是订单并未结账，请联系商家结账
              </div>
            </el-popover>
          </div>
          <div v-else>
            <Tag type="border" color="success">以完成</Tag>
          </div>
        </div>
        <div v-else-if="scope.row.state === 1">
          <Tag type="border" color="warning">以收货-待付款</Tag>
        </div>
        <div v-else-if="scope.row.state === 2">
          <Tag type="border" color="warning">待收货</Tag>
        </div>
        <div v-else-if="scope.row.state === 5">
          <Tag type="border" color="volcano">以取消</Tag>
        </div>
        <div v-else>无此状态：{{ scope.row.state }}</div>
      </template>
    </el-table-column>
    <el-table-column
            label="操作"
            width="150">
      <template slot-scope="scope">
        <div v-if="scope.row.state === 0">
          <el-dropdown
            v-if="usercode"
            split-button
            size="small"
            v-on:click="onClickPrintContract({ scope: scope, state: state, dropdown: false })"
            @command="onClickDropdownCommand">
            打印合同
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                :command="{ scope: scope, state: state, command: onClickPrintAcceptance, dropdown: true }">
                打印验收单
              </el-dropdown-item>
              <el-dropdown-item divided
                                :command="{ scope: scope, state: state, command: onClickRemove, dropdown: true }">
                删除订单
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <Button v-else v-on:click="onClickRemove({ scope: scope, state: state, dropdown: false })">
            删除订单
          </Button>
        </div>
        <div v-else-if="scope.row.state === -1">
          <el-dropdown
            split-button size="small"
            v-on:click="onClickCollection({ scope: scope, state: state, dropdown: false })"
            @command="onClickDropdownCommand">
            订单收货
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-if="usercode"
                :command="{ scope: scope, state: state, command: onClickPrintAcceptance, dropdown: true }">
                打印验收单
              </el-dropdown-item>
              <el-dropdown-item
                v-if="usercode"
                :command="{ scope: scope, state: state, command: onClickPrintContract, dropdown: true }">
                打印合同
              </el-dropdown-item>
              <el-dropdown-item
                divided
                :command="{ scope: scope, state: state, command: onClickCloneOrder, dropdown: true }">
               取消订单
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div v-else-if="scope.row.state === 2">
          <el-dropdown
            split-button size="small"
            v-on:click="onClickCollection({ scope: scope, state: state, dropdown: false })"
            @command="onClickDropdownCommand">
            订单收货
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-if="usercode"
                :command="{ scope: scope, state: state, command: onClickPrintAcceptance, dropdown: true }">
                打印验收单
              </el-dropdown-item>
              <el-dropdown-item
                divided
                v-if="usercode"
                :command="{ scope: scope, state: state, command: onClickPrintContract, dropdown: true }">
                打印合同
              </el-dropdown-item>
              <el-dropdown-item
                divided
                :command="{ scope: scope, state: state, command: onClickCloneOrder, dropdown: true }">
                取消订单
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div v-else-if="scope.row.state === 5">
          <Button v-on:click="onClickRemove({ scope: scope, state: state, dropdown: false })">
            删除订单
          </Button>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
  import {
    Table,
    TableColumn,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    Popover,
    MessageBox
  } from 'element-ui'
  import {
    Icon,
    Card,
    Row,
    Col,
    Button,
    Tag,
    Message
  } from 'iview'

  export default {
    name: 'Tables',
    data () {
      return {
        usercode: null,
        multipleSelection: []
      }
    },
    props: {
      state: {
        type: String,
        default: function () {
          return 'all' // 传入一个自定义状态，每次操作会返回此状态，已达到记录某种操作。[all, receiving, complete, cancel]
        }
      },
      dropdown: {
        type: Object,
        default: function () {
          return {
            name: '更多操作',
            href: null,
            target: null,
            to: null,
            item: [
              {
                name: '打印验收单',
                href: null,
                target: null,
                to: null
              },
              {
                name: '打印合同',
                href: null,
                target: null,
                to: null
              }
            ]
          }
        }
      },
      data: {
        type: Array,
        default: function () {
          return [
            {
              id: 2,
              usercode: 'GC-PU1527585660319', // 采购人唯一识别码[普通用户空]
              state: -1, // 交易状态 [0 以完成， 2 待收货， 5 以取消， -1 待发货]
              ordispaid: 0, // 订单是否生成验收单 [0 未生成验收单, 2 以成验收单， -1 验收单作废]
              ordContract: 1, // 是否生成了电子合同 [0 未生成, 1 以生成, -1 以作废]
              invoice: 0, // 发票类型 [0 不开发票, 1 普通发票, 2 增值税发票]
              isgotuaddress: false, // 订单是否被取消
              province: '北京', // 省份简称
              city: '西城', // 城市简称
              area: null, // 所在地区 详细地址
              linkman: '采购人1', // 购买人姓名
              linkmobile: '13511112222', // 购买人联系方式
              deliveryaddress: '北京市西城区西直门内大街西章胡同9号院', // 收货地址
              paymethod: 4, // 付款方式 [1 公务卡, 2 支票, 3 转账汇款, 4 现金结算, 9 账期, 5 在线支付]
              ispaid: 0, // 是否完成支付 [0 未结账, 1 已结账]
              createtime: '2018-12-08T19:42:30.621868+08:00', // 订单起草时间
              ordtype: -1, // 订单发货状态 [-1 未发货, 0 以发货, 1 以收货]
              orderid: '0318121321371211125',
              total: 1024.00, // 订单商品总价,
              suborderlist: [
                {
                  id: 25,
                  goodslist: [
                    {
                      id: 73,
                      'goodsclassguid_set': {
                        name: '多功能一体机',
                        uid: 3,
                        a1: 2.0,
                        a2: 3.0,
                        a3: 4.0,
                        a4: 5.0,
                        defaule: false
                      },
                      goodsname: '惠普（HP）打印机181fw A 4彩色多功能一体机（有线网络+无线网络）四合一',
                      goodsid: '2-1503-0318121321371216892',
                      spu: '惠普（HP）打印机181fw A 4彩色多功能一体机（有线网络+无线网络）四合一 官方标配',
                      sku: '181fw 多功能一体机 白',
                      model: '181fw 多功能一体机',
                      taoc: '官方标配',
                      goodsclassguid: 3,
                      goodsclassname: '多功能一体机',
                      goodsbrandname: '惠普',
                      qty: 1,
                      total: '3719.00',
                      price: '3719.00',
                      originalprice: '3719.00',
                      imgurl: 'http://127.0.0.1:8000/media/images/15312801051451987420/head/200x200/2018-07-11 113505-6995-200x200.png',
                      goodsurl: '/details/1503/',
                      key: 25
                    },
                    {
                      id: 74,
                      'goodsclassguid_zycg': {
                        name: '多功能一体机',
                        uid: 3,
                        a1: 2.0,
                        a2: 3.0,
                        a3: 4.0,
                        a4: 5.0,
                        defaule: false
                      },
                      goodsname: '理光 SP320SN A4黑白激光四合一多功能一体机',
                      goodsid: '1-251-5118121321371213633',
                      spu: '理光 SP320SN A4黑白激光四合一多功能一体机 标配',
                      sku: 'SP320SN A4 多功能一体机 黑白',
                      model: 'SP320SN A4 多功能一体机',
                      taoc: '标配',
                      goodsclassguid: 3,
                      goodsclassname: '多功能一体机',
                      goodsbrandname: '理光',
                      qty: 1,
                      total: '2160.00',
                      price: '2160.00',
                      originalprice: '2160.00',
                      imgurl: 'http://127.0.0.1:8000/media/images/1176894139/head/200x200/2018-06-04 122552-8854-200x200.jpg',
                      goodsurl: '/details/251/',
                      key: 25
                    },
                    {
                      id: 75,
                      'goodsclassguid_zycg': {
                        name: '碎纸机',
                        uid: 13,
                        a1: 3.0,
                        a2: 4.0,
                        a3: 6.0,
                        a4: 8.0,
                        defaule: false
                      },
                      goodsname: '碎乐 AF500 自动碎纸机 24小时碎纸',
                      goodsid: '3-365-6518121321371214598',
                      spu: '碎乐 AF500 自动碎纸机 24小时碎纸 4.5×30',
                      sku: ' AF500 碎纸机 白色',
                      model: ' AF500 碎纸机',
                      taoc: '4.5×30',
                      goodsclassguid: 13,
                      goodsclassname: '碎纸机',
                      goodsbrandname: '碎乐',
                      qty: 1,
                      total: '32974.00',
                      price: '32974.00',
                      originalprice: '32974.00',
                      imgurl: 'http://127.0.0.1:8000/media/images/1265385536/head/200x200/2018-06-06 105055-3024-200x200.jpg',
                      goodsurl: '/details/365/',
                      key: 25
                    }
                  ],
                  suborderid: '0318121321371211125',
                  url: null,
                  total: '38853.00',
                  key: 25
                }
              ]
            }
          ]
        }
      }
    },
    created () {
    },
    methods: {
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      /* 实现 Dropdown 下拉菜单 事件触发 */
      onClickDropdownCommand: function (command) {
        this.$nextTick(next => {
          command.command({
            scope: command.scope,
            state: command.state,
            dropdown: command.dropdown
          })
        })
      },
      /* 打印合同 */
      onClickPrintContract: function (value) {
        this.$emit('print-contract-order', value)
      },
      /* 打印验收单 */
      onClickPrintAcceptance: function (value) {
        this.$emit('print-acceptance-order', value)
      },
      /* 订单收货处理 */
      onClickCollection: function (value) {
        MessageBox.confirm('确认收货吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$emit('collection-order', value)
        })
      },
      /* 订单删除处理 */
      onClickRemove: function (value) {
        MessageBox.confirm('此操作将永久删除该订单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (value.scope.row.ispaid === 0) {
            Message.warning('订单未结账，不能删除哦！')
          } else {
            this.$emit('remove-order', value)
          }
        })
      },
      /* 取消订单操作 */
      onClickCloneOrder: function (value) {
        MessageBox.confirm('此操作将取消该订单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$emit('clone-order', value)
        })
      }
    },
    components: {
      'el-table': Table,
      'el-table-column': TableColumn,
      'el-dropdown': Dropdown,
      'el-dropdown-menu': DropdownMenu,
      'el-dropdown-item': DropdownItem,
      'el-popover': Popover,
      Icon,
      Button,
      Card,
      Row,
      Col,
      Tag
    },
    computed: {
      getUserCode: function () {
        return this.$store.getters['auth/getUserCode']
      }
    },
    watch: {
      getUserCode: function (a, b) {
        this.usercode = a
      }
    }
  }
</script>

<style scoped>
  >>> .el-table__expanded-cell[class*=cell] {
    padding: 20px 10px;
  }

  /* 修复在element和iView兼容 */
  >>> .el-button--small {
    font-size: 14px;
    border-radius: 3px;
  }
</style>
