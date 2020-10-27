<!--
 * @Description: Description
 * @Author: Li Zhenxing
 * @Date: 2020-05-25 10:43:17
 * @LastEditors: Li Zhenxing
 * @LastEditTime: 2020-08-20 09:59:28
-->
<template>
<div>
  <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview"
            :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="3" 
            :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
  </div>
</template>

<script>

export default {  
data(){
  return {
fileList:[]
    }
  },
  methods:{
  handleRemove(){

  },
  beforeRemove(){
    console.log(q);
    // return false
  },
   handlePreview(file) {
                    var a = document.createElement('a');
                    
                    a.download = file.name;
                    const blob = new Blob([file.response], {
                            type: 'application/x-msdownload;charset=UTF-8'
                        });
                        a.href = URL.createObjectURL(blob);

                  document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
   }
  }
}
</script>

<style>
 
</style>
<style scoped >
 #article-hot{
   width: 500px;
 }
</style>