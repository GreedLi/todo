<!--
 * @Description: Description
 * @Author: Li Zhenxing
 * @Date: 2020-07-09 10:06:51
 * @LastEditors: Li Zhenxing
 * @LastEditTime: 2020-07-17 11:24:29
--> 
<template>
  <el-upload
    class="gloable-upload-avatar-uploader"
    :action="actionUrl"
    :headers="headers"
    :show-file-list="false"
    :on-success="uploadSuccess"
    :on-error="uploadError"
    :before-upload="uploadBefore"
  >
    <el-button size="small" type="primary" :loading="uploadLoading">上传视频</el-button>
  </el-upload>
</template>

<script>
export default {
  name: 'GlobalUploadVideo',
  props: {
    actionUrl: {
      type: String,
      default: ''
    },
    imageUrl: {
      type: String,
      default: ''
    },
    canEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      headers: {
        'uid': this.$sessionObj.uid || '123',
        'userToken': this.$sessionObj.userToken || 'acadcdfefefeafeppooage123fd',
        'platform': this.$sessionObj.platform || 1,
        'deviceInfo': this.$sessionObj.deviceInfo || 'acadcdfefefeafeppooage123fd'
      },
      showDelet: false,
      uploadLoading: false
    }
  },
  created() {},
  mounted() {},
  methods: {
    uploadBefore(file) {
      this.uploadLoading = true
      // 图片格式是否正确
      let bool = null
      // 获取图片的后缀名
      const dotIndex = file.name.lastIndexOf('.')
      const suffixOfImage = file.name.slice(dotIndex + 1).toLowerCase()
      switch (suffixOfImage) {
        case 'mp4':
        case 'mpeg':
        case 'rmvb':
        case 'mov':
          bool = true
          break
        default:
          bool = false
      }
      if (bool) {
        return true
      } else {
        this.uploadLoading = false
        this.$message.warning('您上传的图片格式不正确!(仅支持mp4，mpeg，rmvb，mov)')
        return false
      }
    },
    uploadSuccess(res, file, fileList) {
      this.hide = true
      if (res.code === 200) {
        this.$emit('insertVideo', res.data[0])
        // this.$emit('update:imageSid', res.data[0].sid)
        // 激励方案3
      } else {
        this.$message.warning(res.message)
      }
      this.uploadLoading = false
    },
    uploadError(err, file, fileList) {
      this.$message.error(err)
      this.uploadLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.gloable-upload-avatar-uploader{
  position: absolute;
  right: 40px;
  transform: translateY(3px);
  z-index:2000;
}
</style>
