<!--
 * @Description: Description
 * @Author: Li Zhenxing
 * @Date: 2020-06-09 14:26:11
 * @LastEditors: Li Zhenxing
 * @LastEditTime: 2020-06-09 14:31:57
--> 
<template>
<div>
<el-table :data="URLModles" :show-header="false"  highlight-current-row   style="width: 100%">
  <el-table-column type="selection"  width="55px"> </el-table-column>
  <el-table-column  type="index"  width="55px"></el-table-column>
  <el-table-column prop="expressCode" label="快递代码" width="100px"></el-table-column>
  <el-table-column    prop="expressName"  label="快递名称"  width="100px"></el-table-column>
  <el-table-column label="操作" >
   <template slot-scope="scope">
      <el-button  size="mini" :disabled="scope.$index===0"  @click="moveUp(scope.$index,scope.row)">
        <i class="el-icon-arrow-up"></i>
      </el-button>
      <el-button  size="mini" :disabled="scope.$index===(URLModles.length-1)"  @click="moveDown(scope.$index,scope.row)">
        <i class="el-icon-arrow-down"></i>
      </el-button>
    </template>
  </el-table-column>
</el-table>
</div>
</template>
<script>
  export default {
    data() {
      return {
        URLModles: [{
          index: '1',
          expressCode: 'SF',
          expressName: '顺丰快递',
          status: true,
        }, {
          index: '2',
          expressCode: 'YTO',
          expressName: '圆通快递',
          status: true,
        }, {
          index: '3',
          expressCode: 'UC',
          expressName: '优速快递',
          status: true,
        }],
        multipleSelection: []
      }
    },
    methods: {
      //上移
      moveUp(index,row){
        var that = this;
        console.log('上移',index,row);
        console.log(that.URLModles[index]);
        if (index > 0) {
          let upDate = that.URLModles[index - 1];
          that.URLModles.splice(index - 1, 1);
          that.URLModles.splice(index,0, upDate);
        } else {
          alert('已经是第一条，不可上移');
        }
      },
      //下移
      moveDown(index,row){
        var that = this;
        console.log('下移',index,row);
        if ((index + 1) === that.URLModles.length){
          alert('已经是最后一条，不可下移');
        } else {
          console.log(index);
          let downDate = that.URLModles[index + 1];
          that.URLModles.splice(index + 1, 1);
          that.URLModles.splice(index,0, downDate);
        }
      }
    }
  }
</script>