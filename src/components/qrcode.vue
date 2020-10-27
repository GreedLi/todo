<!--
 * @Description: Description
 * @Author: Li Zhenxing
 * @Date: 2020-08-10 19:32:19
 * @LastEditors: Li Zhenxing
 * @LastEditTime: 2020-10-27 17:13:06
-->
<template>
  <div class="datetime">
<el-form-item label="日报日期" prop="dailyDate">
    <el-date-picker
        v-model="artcleForm.dailyDate"
        type="date"
        value-format="yyyy-MM-dd"
        :disabled="canEdit"
        :picker-options="{disabledDate:setDisabledDate}"
        placeholder="选择日期"
        @change="changeImgUrl"
    >
    </el-date-picker>
</el-form-item>
<div id="preview-time" class="preview-time">
    <p>{{articleForm.dailyDate.split("-")[1]|month}}</p>
</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articleForm:{
        dailyType:1
      }
    }
  },
  methods: {
    kk() {
      this.a.forEach((item) => {
        // console.log(item,'1212');
        this.b.forEach((i) => {
          if (i.id !== item && i.age > 3) {
            this.arr.push(i)
          }
        })
      })
      console.log(this.arr, 'arr')
    },
  },
}
</script>

<style scoped >

</style>