<!--
 * @Description: Description
 * @Author: Li Zhenxing
 * @Date: 2020-09-11 11:29:09
 * @LastEditors: Li Zhenxing
 * @LastEditTime: 2020-10-27 16:21:59
-->

<template>
  <div class="content">
    <el-button  type="primary" @click="click">确定</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },

  methods: {
    click() {
      clearTimeout(timer)
      let timer = setTimeout(() => {
        this.$message.success('复制成功')
      }, 1000)
      
    },
  },
}
</script>

<style scoped>
.content{
  text-align: center;
}
</style>
