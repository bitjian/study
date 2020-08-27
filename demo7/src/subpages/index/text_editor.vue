<template>
  <div class="texteditor">
      <!-- 头部面包屑组件 -->
       <texteditor-bread>
        <template v-slot:dataManage>
             <el-breadcrumb-item>编辑</el-breadcrumb-item>
             <el-breadcrumb-item>文本编辑</el-breadcrumb-item>
        </template>
       </texteditor-bread>
       <div class="quill">
         <div>
           <quill-editor
              style="height:400px;"
              v-model="content"
               placeholder="请输入内容"
              :options="editorOption"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @ready="onEditorReady($event)">
            </quill-editor>
          </div>
            <el-row :inline="true">
            <el-col :span="24">
              <el-button class="submitbtn" type="primary">提交</el-button>
            </el-col>
            </el-row>
       </div>
  </div>
</template>

<script>
import TexteditorBread from '../../components/common/Bread'
export default {
  name: 'texteditor',
  data () {
    return{
       content:'',
       editorOption:{
        //  modules:{
        //     toolbar:[
        //     ['bold','italic','underline','strike'], // 加粗、倾斜、下划线、删除线
      
        //     [{'header':1},{'header':2}], // 标题一、标题二
        //     [{'list':'ordered'},{'list':'bullet'}], // 列表
      
        //     [{'color':[]},{'background':[]}], // 字体颜色、背景颜色
        //     ]
        //   }
    
       }
    }
  },
  components:{
     TexteditorBread
  },
   methods: {
     //失去焦点事件
    onEditorBlur(editor) {
      console.log('editor blur!', editor)
    },
      //获得焦点事件
    onEditorFocus(editor) {
      console.log('editor focus!', editor)
    },
    onEditorReady(ditor){ // 富文本准备时的事件
      console.log('editor focus!', editor)
    }, 
    // 内容改变事件
    // onEditorChange({ editor, html, text }) {
    //   // console.log('editor change!', editor, html, text)
    //   this.content = html
    // }
  },
}
</script>

<style lang="stylus" scoped>
   .quill 
     width:80%;
     margin:0 auto;
     padding:20px;
     .el-col
       text-align:center;
       margin-top:100px;
</style>