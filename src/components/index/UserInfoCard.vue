<!--
用户信息及商城信息板块
包含用户登录， 网站快捷地址， 公告等
 -->
<template>
  <div class="container-width">
    <Card :padding="20" shadow class="card-container ml-3 mr-3">
      <Row>
        <Col span="5">
          <Col span="8">
            <Avatar icon="ios-contact" size="large" class="avatar-item ml-3"/>
          </Col>
          <Col class="white-space">

            <div class="font-9ea7b4" v-if="username">
              <span>您好！ {{ username }}</span>
            </div>
            <div class="font-9ea7b4" v-else>
              <span>您好！请</span>
              <router-link :to="{name: 'login'}">登录</router-link>
              <span>&nbsp;/&nbsp;</span>
              <router-link :to="{name: 'register'}">注册</router-link>
            </div>

            <div class="font-657180">

              <Tag type="border" color="primary">
                <div v-on:click="goOrder">我的订单</div>
              </Tag>

              &nbsp;&nbsp;
              <Tag type="border" color="error">购物车</Tag>
            </div>
          </Col>
        </Col>
        <Col span="14" class="white-space col-item border-left-e8eaec">

          <div class="avatar-icons font-657180 ml-5 mr-4">
            <Avatar size="large" style="background: #2db7f5;">
              <i class="icon-tubiaozhizuomoban-copy"></i>
            </Avatar>
            <br>
            <span>央采商城</span>
          </div>

          <div class="avatar-icons font-657180 ml-5 mr-4">
            <Avatar icon="ios-sync" size="large" style="background: #f56a00;"/>
            <br>
            <span>以旧换新</span>
          </div>

          <div class="avatar-icons font-657180 ml-5 mr-4">
            <Avatar icon="md-add" size="large"/>
            <br>
            <span>即将开放</span>
          </div>

          <div class="avatar-icons font-657180 ml-5 mr-4">
            <Avatar icon="md-add" size="large"/>
            <br>
            <span>即将开放</span>
          </div>

          <div class="avatar-icons font-657180 ml-5 mr-4">
            <Avatar icon="md-add" size="large"/>
            <br>
            <span>即将开放</span>
          </div>

        </Col>
        <Col span="5" class="white-space border-left-e8eaec">
          <p class="p-1 m-0">公告</p>
          <p class="p-1 pb-0 m-0">公告</p>
        </Col>
      </Row>
    </Card>
  </div>
</template>

<script>
  import {
    Card,
    Cell,
    CellGroup,
    Badge,
    Avatar,
    Divider,
    Row,
    Col,
    Tag
  } from 'iview'
  // import Link from 'iview/src/mixins/link'

  export default {
    name: 'UserInfoCard',
    data () {
      return {
        username: ''
      }
    },
    components: {
      Card,
      Avatar,
      Cell,
      CellGroup,
      Badge,
      Divider,
      Row,
      Col,
      Tag
    },
    created () {
      this.username = this.$store.getters['auth/getUser']
    },
    methods: {
      goOrder: function () {
        console.log('adasdad')
        this.$router.push({
          name: 'order'
        })
      }
    },
    computed: {
      getUsername: function () {
        return this.$store.getters['auth/getUser']
      }
    },
    watch: {
      getUsername: function (a, b) {
        this.username = a
      }
    }
  }
</script>

<style scoped>

  /* 调整图标大小 */
  >>> .ivu-avatar-large {
    width: 35px;
    height: 35px;
    font-size: 20px;
    line-height: 32px;
    border-radius: 45px;
  }

  /* 调整央采图标 */
  >>> .ivu-avatar-string {
    font-size: 22px;
    margin-top: -5px;
  }


  >>> .avatar-item i {
    font-size: 64px;
    padding: 0;
    margin: 7px -7px;
  }

  .container-width {
    width: 1200px;
    margin: auto;
  }

  .font-657180 {
    color: #848484;
  }

  .font-657180 a {
    color: #848484;
  }

  .border-left-e8eaec {
    border-left: 1px solid #e8eaec;
  }

  .col-item {
    display: inline-flex;
  }

  .avatar-icons {
    text-align: center;
    width: max-content;
  }

  .avatar-item {
    width: 50px;
    height: 50px;
    line-height: 45px;
    border-radius: 45px;
  }

  .card-container {
    margin-top: -35px;
    position: relative;
    z-index: 1;
  }

  .white-space {
    white-space: nowrap;
  }


</style>
