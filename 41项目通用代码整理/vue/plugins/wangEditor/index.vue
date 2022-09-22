<template lang="html">
  <div class="editor">
    <div ref="toolbar" class="toolbar"/>
    <div ref="editor" class="text"/>
  </div>
</template>

<script>
import E from 'wangeditor'
import { getToken } from '@/utils/auth'
import compressImg from './config'
import { uploadImg } from '@/api/uploadImg'
export default {
  name: 'Editoritem',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    isClear: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // uploadPath,
      editor: null,
      info_: null,
      baseUrl: process.env.BASE_API
    }
  },
  watch: {
    isClear(val) {
      // 触发清除文本域内容
      if (val) {
        this.editor.txt.clear()
        this.info_ = null
      }
    },
    value: function(value) {
      if (value !== this.editor.txt.html()) {
        this.editor.txt.html(this.value)
      }
    }
    // value为编辑框输入的内容，这里我监听了一下值，当父组件调用得时候，如果给value赋值了，子组件将会显示父组件赋给的值
  },
  mounted() {
    this.seteditor()
    this.editor.txt.html(this.value)
    this.disabled && this.editor.disable()
  },
  methods: {
    // 上传前压缩图片
    async beforeRead(file) { // async await 解决异步问题，
      var formData = new FormData()// 创建新的form
      // file.length为真的时候说明是多图上传  要循环多图将file对象放进form中
      if (file.length > 1) {
        for (let i = 0; i < file.length; i++) {
          var f = await compressImg(file[i])
          formData.set('file' + i, f)
        }
      } else {
        const f = await compressImg(file[0])
        formData.set('file', f)
      }
      return formData
    },
    seteditor() {
      // http://192.168.2.125:8080/admin/storage/create
      this.editor = new E(this.$refs.toolbar, this.$refs.editor)
      this.editor.config.uploadImgShowBase64 = false // base 64 存储图片
      this.editor.config.uploadImgServer = this.baseUrl + '/api/upload/files'// 配置服务器端地址
      this.editor.config.uploadImgHeaders = {
        Authorization: 'Bearer ' + getToken()
      }// 自定义 header
      this.editor.config.uploadFileName = 'file' // 后端接受上传文件的参数名
      this.editor.config.uploadImgMaxSize = 2 * 1024 * 1024 // 将图片大小限制为 2M
      this.editor.config.uploadImgMaxLength = 1 // 限制一次最多上传 1 张图片
      this.editor.config.uploadImgTimeout = 1 * 60 * 1000 // 设置超时时间
      this.editor.config.pasteIgnoreImg = true
      // 设置自定义提示
      this.editor.config.customAlert = (s, t) => {
        switch (t) {
          case 'success':
            this.$message({
              message: s,
              type: 'success'
            })
            break
          case 'info':
            this.$message({
              message: s
            })
            break
          case 'warning':
            this.$message({
              message: s,
              type: 'warning'
            })
            break
          case 'error':
            if (s === '插入图片错误') {
              this.$message.error('访问图片链接超时')
            } else {
              this.$message.error(s)
            }
            // window.alert('访问图片远程连接超时')
            break
          default:
            this.$message({
              message: s
            })
            break
        }
      }

      // 配置菜单
      this.editor.config.menus = [
        'head', // 标题
        'bold', // 粗体
        'fontSize', // 字号
        'fontName', // 字体
        'italic', // 斜体
        'underline', // 下划线
        'strikeThrough', // 删除线
        'foreColor', // 文字颜色
        'backColor', // 背景颜色
        'link', // 插入链接
        'list', // 列表
        'justify', // 对齐方式
        'quote', // 引用
        // 'emoticon', // 表情
        'image', // 插入图片
        'table', // 表格
        // 'video', // 插入视频
        // 'code', // 插入代码
        'undo', // 撤销
        'redo' // 重复
        // 'fullscreen' // 全屏
      ]
      this.editor.config.customUploadImg = async(resultFiles, insertImgFn) => {
        // 上传前压缩图片
        const formData = await this.beforeRead(resultFiles)
        const { data: result } = await uploadImg(formData)
        // resultFiles 是 input 中选中的文件列表
        // insertImgFn 是获取图片 url 后，插入到编辑器的方法

        // 上传图片，返回结果，将图片插入到编辑器中
        if (result.iRet === 0) {
          const url = result.files[0].url
          insertImgFn(url)
        }
      }

      this.editor.config.uploadImgHooks = {
        fail: (xhr, editor, result) => {
          // console.log('fail', xhr, editor, result)
          // 插入图片失败回调
        },
        success: (xhr, editor, result) => {
          // console.log('success', xhr, editor, result)
          // 图片上传成功回调
        },
        timeout: (xhr, editor) => {
          // console.log('timeout', xhr, editor)
          // 网络超时的回调
        },
        error: (xhr, editor) => {
          // console.log('error', xhr, editor)
          // 图片上传错误的回调
        },
        customInsert: (insertImg, result, editor) => {
          // 图片上传成功，插入图片的回调
          // result为上传图片成功的时候返回的数据，这里我打印了一下发现后台返回的是data：[{url:"路径的形式"},...]
          // console.log(result.data[0].url)
          // insertImg()为插入图片的函数
          // 循环插入图片
          // for (let i = 0; i < 1; i++) {
          // const url = ''
          if (result.iRet === 0) {
            const url = result.files[0].url
            insertImg(url)
          }
          // }
        }
      }
      this.editor.config.onchange = (html) => {
        this.info_ = html // 绑定当前逐渐地值
        this.$emit('change', this.info_) // 将内容同步到父组件中
      }
      // 创建富文本编辑器
      this.editor.create()
    }
  }
}
</script>

<style lang="css">
.editor {
  width: 100%;
  margin: 0 auto;
  position: relative;
  z-index: 0;
}
.toolbar {
  border: 1px solid #ccc;
}
.text {
  border: 1px solid #ccc;
  min-height: 500px;
}
</style>
