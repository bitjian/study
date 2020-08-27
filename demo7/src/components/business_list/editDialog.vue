<template>
 <div class="editdialog">
    <el-dialog :title="dialog.title" :visible.sync="dialog.show"
      :modal-append-to-body="false"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
    >  
    <!-- 外层dialog -->
      <el-form :model="foodInfo" status-icon label-width="100px">
        
        <el-form-item label="店铺名称">
            <el-input  v-model="foodInfo.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="详细地址">
            <el-input  v-model="foodInfo.satisfy_count" autocomplete="off"></el-input>
            <div style="fontSize:14px">当前城市:{{city.name}}</div>
        </el-form-item>

        <el-form-item label="店铺介绍">
            <el-input  v-model="foodInfo.satisfy" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="联系电话">
            <el-input  v-model="foodInfo.pheon" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="店铺分类">
            <el-select v-model="foodInfo.satisfy_rate" @visible-change="handlechange" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.name"
                :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        
        <el-form-item label="商铺图片">
             <el-upload
                class="avatar-uploader"
                :show-file-list="false"
                 action="https://jsonplaceholder.typicode.com/posts/"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="foodInfo.image_path" :src="foodInfo.image_path" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
             </el-upload>
        </el-form-item>

        <el-form-item style="text-align:right;">
            <el-button  @click="submitForm(foodInfo)">取消</el-button>
            <el-button type="primary" @click="submitForm(foodInfo)">确定</el-button>
        </el-form-item>
    </el-form>
  </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Dialog',
  data() {
      return {
         options: [{value: '选项1',label: '黄金糕'}],
         foodInfo:{
            name:'',
            satisfy_count:'',
            satisfy:'',
            satisfy_rate:'',
            pheon:'',
            image_path:''
         }
      }
    },
    computed:{
        ...mapState(['city'])
    },
    props:{
       dialog:Object,
    },
    methods:{
      //提交
      submitForm (foodInfo) {
       console.log(foodInfo)
        // console.log(res)
     },
     //下拉框的请求
      handlechange (e) {
         console.log(e)
      },
         // 上传头像函数
        handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
    //    上传头像限制尺寸函数
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    }
  }
</script>

<style lang="stylus" scoped>
 .editdialog >>> .avatar-uploader .el-upload 
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        .avatar
          width: 120px;
          height: 120px;
          display: block;
        .avatar-uploader-icon 
          font-size: 28px;
          color: #8c939d;
          width: 120px;
          height: 120px;
          line-height:120px;
          text-align:center;
</style>