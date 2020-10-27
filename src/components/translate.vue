<!--
 * @Description: Description
 * @Author: Li Zhenxing
 * @Date: 2020-07-09 10:02:10
 * @LastEditors: Li Zhenxing
 * @LastEditTime: 2020-07-09 10:02:22
--> 
<template>
   <div id="article-hot">
       <el-tabs type="card" @tab-click="handTable">
         <el-tab-pane label="热门咨询置顶"></el-tab-pane>
         <el-tab-pane label="热门海报置顶"></el-tab-pane>
       </el-tabs>
       <!-- table -->
       <section class="hot_list" :style="{'height':tabLength*tabHeight + 180 + 'px'}">
         <div class="header_nav_title">
           <div class="left">
             <div>序号</div>
             <div>咨询ID</div>
           </div>
           <div class="right">
             <div>取消置顶时间</div>
             <div>操作</div>
           </div>
           <div class="middle">预览</div>
         </div>
         <ul class="hot_body">
           <!-- 编辑态 -->
           <li v-for="(item,index) in articleHotTopAddList" :key="index" :class="['change']" :style="{'transform':'translateY('+(item.seqNo -1 )*tabHeight+'px','height':tabHeight+'px'}">
             <div class="left">
               <div class="index_container">
                 <el-input v-model="item.seqNo" size="small" disabled class="num_input"></el-input>
                 <div class="icon_num">
                   <i class="el-icon-caret-top" @click="upNum(item)"></i>
                   <i class="el-icon-caret-bottom" @click="downNum(item)"></i>
                 </div>
               </div>
               <el-input v-model="item.articleId"></el-input>
             </div>
             <div class="right">
               <div v-if="!delSign">{{item.topCancelTime}}</div>
               <div v-else>
                 <el-date-picker
                  v-model="item.topCancelTime"
                  type="datetime"
                  prefix-icon="el-icon-date"
                  size="small"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="选择日期时间"
                  :clearable="false"
                 >
                 </el-date-picker>
               </div>
               <div>
                 <el-button v-if="!delSign" type="text" @click="handleCancel(item)">取消置顶</el-button>
                 <el-button v-if="delSign" type="text" @click="handleDelete(item)">删除</el-button>
               </div>
             </div>
             <div class="middle" v-if="item.title">{{item.sourceName}}|{{item.releaseTime}}|<img :src="item.img"></div>
           </li>
         </ul>
       </section>
   </div>
</template>

<script>
export default {  
data(){
  return {
    tabLength:0,
    delSign:false,
    articleHotTopAddList:[
      {seqNo:1,articleId:30058,articleType:1,topCancelTime:'2020-06-20 16:34:16',sourceName:'内部',title:'迁安市',releaseTime:null,img:''},
      {seqNo:2,articleId:30058,articleType:1,topCancelTime:'2020-06-20 16:34:16',sourceName:'外部',title:'迁安市',releaseTime:null,img:''},
      {seqNo:3,articleId:30058,articleType:1,topCancelTime:'2020-06-20 16:34:16',sourceName:'微信',title:'迁安市',releaseTime:null,img:''}
    ],
    tabHeight:50,
    tabLength:0
    }
  },
  methods:{
    // getList(){
    //   searchTop({
    //     articleType:this.articleType
    //   }).then(res=>{
    //     this.articleHotTopAddList = res.response
    //根据列表是否有数据调整高度
    //     this.tabLength = this.articleHotTopAddList.length || 0
    //根据articleType类型调整表格高度
    //     this.tabHeight = this.articleType === 1 ? 50 : 100
    //   })
    // },
    //删除
    handleDelete(val){
      const needDelArr = this.articleHotTopAddList.filter((vall)=>{
        return vall.seqNo > val.seqNo
      })
      // val.seqNo = val.seqNo -10000 假删除
      needDelArr.forEach((val)=>{
        val.seqNo = val.seqNo -1 
      })
      this.tabLength--
    },
    upNum(val){
      if (val.seqNo > 1) {
        const indexb = this.articleHotTopAddList.findIndex(vall=>vall.seqNo === val.seqNo-1)
        val.seqNo = val.seqNo -1
        this.articleHotTopAddList[indexb].seqNo = this.articleHotTopAddList[indexb].seqNo+1
      }
    },
    downNum(val){
      if (val.seqNo < this.articleHotTopAddList.length) {
        const indexd = this.articleHotTopAddList.findIndex(vall => vall.seqNo === val.seqNo + 1) 
        val.seqNo = val.seqNo + 1
        this.articleHotTopAddList[indexd].seqNo = this.articleHotTopAddList[indexd].seqNo - 1
      }
    },
    handTable(){

    }
  }
}
</script>

<style>
  #article-hot .el-tabs__header {
    margin: 0;
  }
  .num_input .el-input__inner{
    width: 60px;
    text-align: center
  }
</style>
<style scoped >
  .hot_list{
    font-size: 16px;
    position: relative;
  }
  .hot_body{
    position: relative;
  }
  .change{
    position: absolute;
    transition: transform .3s;
    top: 20px;
    left: 0;
    width: 100%;
    padding: 0 50px;
    overflow: hidden;
  }
  .id_input{
    width: 100px;
    text-align: center;
  }
  .index_container{
    position: relative;
  }
  .el-icon-caret-top,.el-icon-caret-botom{
    cursor: pointer;
  }
  .icon_num{
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 1px;
    right: 3px;
  }
  .header_nav_title{
    overflow: hidden;
    text-align: center;
    height: 60px;
    padding: 0 50px
  }
  .left{
    float: left;
    width: 200px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 100%;
  }
  .right{
    float: right;
    width: 400px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 100%;
  }
  .middle{
    margin-left: 200px;
    margin-right: 400px;
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
  }
</style>