<!-- 商品信息 包含商品名称，套餐等 -->
<template>
  <Card :bordered="false" dis-hover>
    <template slot="title">
      <h5 class="name">{{ title }}</h5>
    </template>
    <Row>
      <Col>
        <div class="info">
          <div class="name">
            价格
          </div>
          <div class="context">
            <span class="money"><currency :money="price" /></span>
          </div>
        </div>
      </Col>
      <Divider orientation="left">
        <span style="color: #808695;">说明</span>
      </Divider>
      <Col>
        <div class="info">
          <div class="name">
          </div>
          <div class="context">
            <p>由 领航 发货, 并提供售后服务. 23:00前下单,成功订货后预计次日送达 <br>
              只限北京地区，成功订货后次日送达</p>
          </div>
        </div>
      </Col>
      <Divider/>
      <Col>
        <div class="info">
          <div class="name">
            套餐
          </div>
          <div class="context goodslist">
            <RadioGroup v-model="index" type="button" size="large" class="radio" @on-change="setRadioMeal">
              <Radio :label="key" v-for="(item, key) in value" :key="key" >
                {{ item.name }}
              </Radio>
            </RadioGroup>
          </div>
        </div>
      </Col>
      <Divider/>
      <Col>
        <div class="button-goods">
          <el-input-number v-model="num" controls-position="right" @change="" :min="1" :max="max"
                           style="width: 100px;"></el-input-number>
          <Button type="error">加入购物车</Button>
        </div>
      </Col>
    </Row>
  </Card>
</template>

<script>
  import {
    Card,
    Divider,
    RadioGroup,
    Radio,
    Button,
    Row,
    Col
  } from 'iview'
  import {
    InputNumber
  } from 'element-ui'
  import currency from '@/components/currency'

  export default {
    name: 'goodsInfo',
    data () {
      return {
        max: 5, // 库存数量 - 限制商品数量 [max >= num]
        num: 1, // 商品数量 - 添加购物车商品数量
        index: 1,
        price: this.money
      }
    },
    mounted () {
    },
    props: {
      title: {
        type: String,
        default () {
          return ''
        }
      },
      money: {
        type: [Number, String],
        default () {
          return 0
        }
      },
      value: {
        type: Array,
        default () {
          return [
            {
              id: 0,
              name: '24-70mmF2.8L II USM',
              defaule: false,
              money: 0
            },
            {
              id: 0,
              name: '70-200F2.8L IS II USM',
              defaule: true,
              money: 0
            },
            {
              id: 0,
              name: 'EF 50mm f/1.2L USM',
              defaule: false,
              money: 0
            },
            {
              id: 0,
              name: '佳能EF35mm f1.4L II USM 镜头',
              defaule: false,
              money: 0
            }
          ]
        }
      }
    },
    components: {
      Card,
      Divider,
      RadioGroup,
      Radio,
      Button,
      Row,
      Col,
      currency,
      'el-input-number': InputNumber
    },
    computed: {
      getPriceMeal: function () {
        return this.value
      }
    },
    watch: {
      getPriceMeal: function (a, b) {
        let goods = null
        for (let i = 0; a.length > i; i++) {
          if (a[i].defaule) {
            goods = a[i]
            this.price = goods.money
            this.index = i
            break
          }
        }
      }
    },
    methods: {
      setRadioMeal: function (a) {
        this.price = this.value[a].money
      }
    }
  }
</script>

<style scoped>
  h5.name, .info {
    font: 700 16px Arial, "microsoft yahei";
    color: #666;
    line-height: 28px;
    padding-top: 0;
  }

  .info {
    margin-top: 10px;
    position: relative;
    display: inline-block;
  }

  .info .name {
    float: left;
    display: block;
  }

  .info > .context .money {
    color: rgb(220, 9, 9);
    font-size: 36px;
    font-weight: 400;
    display: block;
    margin-top: -3px;
  }

  .info > .context > .money span {
    color: rgb(220, 9, 9);
    font-size: 26px;
    font-weight: 400;
  }

  .info .context {
    padding: 0;
    float: left;
    width: 600px;
    display: block;
    margin-left: 10px;
  }

  .info > .context.goodslist {
    margin-top: -15px;
  }

  .info > .context p {
    color: #808695;
    font-size: 15px;
    font-weight: 300;
    margin: -10px auto;
  }


  .radio .ivu-radio-wrapper {
    height: 45px;
    line-height: 47px;
    font-size: 14px;
    margin: 5px;
  }

  .radio .ivu-radio-wrapper:first-child {
    border-radius: initial !important;
  }

  .radio .ivu-radio-wrapper:last-child {
    border-radius: inherit;
  }

  .button-goods {
    display: flex;
  }

  .button-goods Button {
    width: 50%;
    margin-left: 10px;
  }

  >>> .button-goods .el-input__inner {
    padding-left: 5px;
    padding-right: 50px;
  }

</style>
