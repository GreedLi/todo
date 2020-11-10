<!--
 * @Description: Description
 * @Author: Li Zhenxing
 * @Date: 2020-10-30 15:17:19
 * @LastEditors: Li Zhenxing
 * @LastEditTime: 2020-11-04 15:51:51
-->
<template>
  <div class="add-active">
    <div class="add-header">
      <p class="add-title">创建拼团活动</p>
      <el-button
        v-if="activeParams.activityId"
        type="text"
        class="add-preview"
        @click="handlePreview"
        >当前活动预览</el-button
      >
    </div>
    <!-- 步骤条 -->
    <el-steps
      :active="activeStep"
      finish-status="success"
      align-center
      class="el-steps"
    >
      <el-step title="活动基本信息"></el-step>
      <el-step title="商品基本信息"></el-step>
      <el-step title="拼团信息"></el-step>
      <el-step title="分享设置"></el-step>
      <el-step title="发布"></el-step>
    </el-steps>
    <!-- 步骤内容 -->
    <section class="content-box">
      <!-- 基础信息 -->
      <baseInfo
        v-show="activeStep === 0"
        ref="baseInfoDom"
        :active-params.sync="activeParams"
        :active-step.sync="activeStep"
      ></baseInfo>
      <!-- 商品价格及商品信息 -->
     <goodsInfo  v-show="activeStep === 1" ref="goodsInfoDom" :goods-params.sync="goodsParams" :active-step.sync="activeStep" @getGoodsInfo="getGoodsInfo"></goodsInfo>
     <!-- 拼团信息 -->
     <group-info v-show="activeStep === 2" ref="groupInfoDom" :group-form.sync="groupForm" :active-step.sync="activeStep" :active-params.sync="activeParams" :goods-params.sync="goodsParams"></group-info>
     <!-- 分享配置 -->
     <share-info v-show="activeStep === 3" ref="shareInfoDom" :share-form.sync="shareForm" :active-params.sync="activeParams" :active-step.sync="activeStep"></share-info>
     <!-- 发布 -->
     <publish-info v-if="activeStep === 4" :actived-id="activeParams.activityId"></publish-info>
    </section>
    <!-- 按钮 -->
    <div class="add-bottom">
      <el-button v-if="activeStep !== 0" @click="handlePrev">上一步</el-button>
      <el-button v-if="activeStep <= 2" type="primary" @click="handleNext">下一步</el-button>
      <el-button v-if="activeStep!==4" type="primary" plain @click="handleNext(false)">保存并退出</el-button>
      <el-button v-if="activeStep===3" type="primary" @click="publish(false)">发布</el-button>
      <el-button v-if="activeStep!==4" @click="cancel">取消</el-button>
      <el-button v-else type="primary" @click="offProcess">关闭</el-button>
    </div>
    <!-- 预览 -->
    <activity-code v-if="isShowPreview" :is-show-preview.sync="isShowPreview" :actived-id="activeParams.activityId"></activity-code>
  </div>
</template>

<script>
import ActivityCode from '@/view/actives/components/activityCode'
import baseInfo from '@/views/actives/components/baseInfo'
import goodsInfo from '@/views/actives/components/goodsInfo'
import groupInfo from '@/views/actives/components/groupInfo'
import shareInfo from '@/views/actives/components/shareInfo'
import publishInfo from '@/views/actives/components/publishInfo'
import { getGoods,getGroup,getActiveInfo} from '@/api/active'
export default {
  name:'Add',
  components:{
    baseInfo,
    goodsInfo,
    groupInfo,
    shareInfo,
    publishInfo,
    ActivityCode
  },
  data() {
    return {
      activeStep: 0,
      isShowPreview:false,//预览是否显示
      activeParams:{
          activityName:'',
          startTime:'',//活动开始时间
          endTime:'',//活动结束时间
          activityId:''
      },
      goodsParams:{
          title:'',
          subTitle:'',
          huiId:'',//惠汇ID
          skuId:'',
          spuId:'',
          tpEmployeePrice:'',//代理人单价
          salePrice:'',//商品原价
          inventoryCount:0,//库存
          inventory:0,//剩余库存
          spuImg:[],//轮播图列表
          description:[],//商品详情页列表
          spuSummary:''//商品小图
      },
      groupForm:{
          groupId:'',
          spuId:0,
          groupPeopleNumber:'',//成团人数
          groupGapTime:'',
          leadOrgan:[],//分公司
          groupNum:'',//拼团个数
          leadEmployeeType:[2],
          memNumber:'',
          memMobileFlag:'1',
          memNameFlag:'1',
          memAddressFlag:'0'
      },
      shareForm:{
          shareTxt:'',//分享文案配置
          shareImg:''
      }
    }
  },
  watch: {
      activeStep(newValue,oldValue){
          if (newValue>oldValue) {
              if (newValue === 1 && this.goodsParams.spuId) this.getGoodsInfo()
              if (newValue === 2 && this.goodsParams.groupId) this.getGroupInfo()
          }
      }
  },
  created(){
      this.activeParams.activityId = this.$route.query.activityId || ''
      this.goodsParams.spuId = this.$route.query.spuId || ''
      this.groupForm.groupId = this.$route.query.groupId || ''
      if (this.activeParams.activityId) this.getActiveParams()
  },
  methods: {
    handlePrev() {
      this.activeStep--
    },
    getActiveParams(){
        getActiveInfo({activityId:this.activeParams.activityId}).then(res=>{
            const result = res.response
            this.activeParams.activityName = result.activityName
            this.activeParams.startTime = result.startTime
            this.activeParams.endTime = result.endTime
            this.shareForm.shareTxt = result.shareTxt
            this.shareForm.shareImg = result.shareImg
        })
    }
  },
  handleNext(next){
    if (this.activeStep === 0) this.$refs.baseInfoDom.nextFn(next)
    if (this.activeStep === 1) this.$refs.goodsInfoDom.nextFn(next)
    if (this.activeStep === 2) this.$refs.groupInfoDom.nextFn(next)
    if (this.activeStep === 3) this.publish(true)
  },
  // 取消
  cancel(){
    this.$router.push('/tp_active/list')
  },
  offProcess(){
    this.$router.push('/tp_active/list')
  },
  handlePreview(url){
    this.isShowPreview = true
  },
  publish(back){
    this.$refs.shareInfoDom.publish(back)
  },
  // 获取商品信息
  getGoodsInfo(){
    getGoods({spuId:this.goodsParams.spuId}).then(res=>{
      this.goodsParams = res.response
      this.goodsParams.spuImg = JSON.parse(res.response.spuImg)
      this.goodsParams.description = JSON.parse(res.response.description)
      this.goodsParams.tpEmployeePrice = (res.response.tpEmployeePrice*1000/1000000).toFixed(2)||0
      this.goodsParams.salePrice = (res.response.salePrice*1000/1000000).toFixed(2)||0
    })
  },
  // 获取拼团信息
    getGroupInfo(){
    getGroup({groupId:this.goodsParams.groupId}).then(res=>{
      this.groupForm = res.response
      if (res.response.leadEmployeeType === 4) this.groupForm.leadEmployeeType = [2,3]
      else this.groupForm.leadEmployeeType = [res.response.leadEmployeeType]
      this.groupForm.leadOrgan = res.response.leadOrgan.split(',')
    })
  },
}
</script>

<style lang="scss" scoped>
.add-active{
  padding-bottom: 50px;
  height: 100%;
  .add-header{
    text-align: left;
    display: flex;
    .add-title{
      font-size: 24px;
      color: #343434;
      margin-right: 12px;
    }
  }
  .el-steps{
    width: 70%;
    margin: 50p auto;
  }
  .add-bottom{
    position: absolute;
    height: 50px;
    line-height: 50px;
    bottom: 20;
    left: 50%;
    transform: translateX(-50%);
  }
  .content-box{
    width: 80%;
    margin: 0 auto;
  }
}
</style>