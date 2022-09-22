<template>
  <el-upload
    :action="baseUrl+'/api/upload/files'"
    :headers="headers"
    :file-list="fileList"
    :on-success="handleSuccess"
    :on-change="handleChange"
    :show-file-list="showFileList"
    :before-upload="beforeUpload"
    :on-remove="handleRemove"
    list-type="picture"
    accept=".jpg,.jpeg"
    class="upload-demo"
  >
    <el-button size="small" type="primary">点击上传</el-button>
    <div slot="tip" class="el-upload__tip">只能上传jpg/jpeg文件,且不超过500kb</div>
  </el-upload>
</template>
<script>
import { getToken } from '@/utils/auth'
export default {
  props: { fileCount: {
    type: Number,
    default: 1
  },
  defalutValue: {
    type: String,
    default() {
      return ''
    }
  },
  imgName: {
    type: String,
    default() {
      return '组合图片'
    }
  },
  showFileList: {
    type: Boolean,
    default: false
  }}, // 需要上传的文件个数
  data() {
    return {
      headers: {
        Authorization: 'Bearer ' + getToken()
      },
      fileList: [],
      baseUrl: process.env.BASE_API
    }
  },
  watch: {
    defalutValue(val) {
      this.fileList = val ? [{ name: this.imgName, url: val }] : []
    }
  },
  mounted() {
    this.fileList = this.defalutValue ? [{ name: this.imgName, url: this.defalutValue }] : []
  },
  methods: {
    handleSuccess(response) {
      if (response.iRet === -1) {
        this.$message.error(response.message)
      } else {
        this.$emit('update:defalutValue', response.files[0].url || '')
        this.$emit('input', response.files[0]) // {name,url}
      }
    },
    handleChange(file, fileList) {
      if (file.status !== 'ready') {
        const fileRes = fileList.filter(item => item.response && item.response.iRet === 0)
        this.fileList =
        fileRes.length > 1 ? fileRes.splice(-this.fileCount) : fileRes
      }
    },
    handleRemove(file, fileList) {
      this.fileList = fileList
      this.$emit('update:defalutValue', fileList[0] ? fileList[0].url : '')
      this.$emit('input', fileList[0])
    },
    beforeUpload(file) {
      const fileName = file.name
      const suffixName = fileName.substring(fileName.lastIndexOf('.') + 1)
      if (['jpeg', 'jpg'].includes(suffixName)) {
        if (file.size / 1024 > 500) {
          this.$message.error('上传文件大小不能超过 5OOKB!')
          return false
        }
        return true
      } else {
        this.$message.error(`非法图片格式${suffixName}，不允许上传`)
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-demo {
display: flex;
  flex-wrap: wrap;
  align-content: space-between;
  line-height: 40px;
  .el-upload__tip {
    margin-left: 7px;
    margin-top: 0px;
    line-height: 20px;
    display: flex;
    align-items: center;
  }
}
</style>
