<!--
 * @Description: Description
 * @Author: Li Zhenxing
 * @Date: 2020-11-04 15:52:17
 * @LastEditors: Li Zhenxing
 * @LastEditTime: 2020-11-04 16:26:46
-->
<template>
  <div class="base-content">
      <p class="base-title">活动基础信息</p>
      <el-form ref="activeParams" :model="activeParams" :rules="ruleInfo" label-width="120px" label-position="left">
        <!-- 活动标题 -->
          <el-form-item label="活动标题" prop="activityName">
              <el-input v-model.trim="activeParams.activityName" maxlength="20" :show-word-limit="true" class="labelWidth" placeholder="请输入活动标题"></el-input>
          </el-form-item>
          <!-- 活动有效期 -->
          <el-form-item label="活动有效期" prop="startTime">
              <el-date-picker
                v-model="activeTime"
                class="labelWidth"
                type="datetimerange"
                range-separator="-"
                :clearable="false"
                :editable="false"
                start-placeholde="请选择开始时间"
                end-placeholde="请选择结束时间"
                value-format="yyyy-MM-dd HH:mm:ss"
                :picker-options="{disabledDate:setDisabledDate}"
                :disabled="$route.query.status>=2"
                @change="handleActiveTime"
              >
              </el-date-picker>
          </el-form-item>
      </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
     
    }
  },
  created(){
    
  },
  methods: {
  },
}
</script>

<style lang="scss" scoped>

</style>