<!-- 搜索组件 -->
<template>
  <div class="mr-3">

    <Form ref="formInline" :model="formInline" :rules="ruleInline" inline style="margin-top: 15px;"
          @submit.native.prevent>
      <FormItem prop="search">
        <Input search
               type="text"
               class="mr-sm-4"
               @on-search="searchs"
               v-model="formInline.search"
               placeholder="搜索"
               :rules="ruleInline"
        />
      </FormItem>
    </Form>

  </div>
</template>

<script>
  import {
    Form,
    FormItem,
    Input,
    Button
  } from 'iview'

  export default {
    name: 'NavbarSearch',
    data () {
      return {
        formInline: {
          search: this.$route.query.q
        },
        ruleInline: {
          search: [
            { required: true, message: '您想要搜索什么？' }
          ]
        }
      }
    },
    methods: {
      searchs: function () {
        console.log(this.formInline.search)
        if (this.formInline.search) {
          this.$router.push({
            name: 'search',
            query: {
              q: this.formInline.search
            }
          })
        }
      }
    },
    components: {
      Form,
      FormItem,
      Input,
      Button
    }
  }
</script>

<style scoped>

</style>

