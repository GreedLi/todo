<!--
 * @Description: Description
 * @Author: Li Zhenxing
 * @Date: 2020-05-25 10:43:17
 * @LastEditors: Li Zhenxing
 * @LastEditTime: 2020-06-09 14:03:37
--> 
<template>
<div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column   prop="date"  label="日期"  ></el-table-column>
      <el-table-column   prop="name"  label="姓名" ></el-table-column>
      <el-table-column  width="100px" >
         <div id="toTop" @click="clickTop"></div>
          <div id="toDown" @click="clickDown"></div>
      </el-table-column>
 </el-table>
</div>
</template>

<script>
export default {
  data() {
    return {
      tableData:[
        {id:1,date:'1212',name:'12121'},
        {id:2,date:'1212',name:'12121'},
      ]
    }
  },
  filters: {
  },
  computed: {
  },
  watch:{

  },
  mounted() {

  },
  methods: {
    clickTop(){
      console.log('top');
    },
    clickDown(){
      console.log('down');
    }
  },
}
</script>
<style>
#toTop{
  border: 10px solid #FFF;
  border-bottom-color:#000;
  width:1px;
  margin-bottom: 5px;
}
#toDown{
  border: 10px solid #FFF;
  border-top-color:#000;
  width:1px;
  margin-top: 5px;
}
</style>
