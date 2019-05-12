<template>
  <div id="app">
    <router-view name="default" v-if="isRouterAlive"></router-view>
  </div>
</template>
<script>
  export default {
    name: 'App',
    // 提供reload方法
    provide: function () {
      return {
        reload: this.reload
      }
    },
    // isRouterAlive控制显示
    data: function () {
      return {
        isRouterAlive: true
      }
    },
    methods: {
      // 刷新方法
      reload: function () {
        this.isRouterAlive = false
        // 该方法会在dom更新后执行
        this.$nextTick(function () {
          this.isRouterAlive = true
        })
      }
    },
    computed: {
      getIsRouterAlive: function () {
        return this.$store.getters['index/getIsRouterAlive']
      }
    },
    watch: {
      getIsRouterAlive: function (a, b) {
        console.log('reload', a)
        this.$nextTick(() => {
          this.$store.commit('index/setIsRouterAlive', false)
          // this.reload()
        })
        // this.reload()
      }
    }
  }
</script>

<style>
  #app {

  }

  label, a {
    color: #515a6e;
  }

  a:hover {
    color: #515a6e;
    text-decoration: none;
  }
</style>
