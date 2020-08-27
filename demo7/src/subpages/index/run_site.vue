<template>
  <div class="runsite">
        <div class="title">
          <i class="el-icon-user-solid"></i>
           <span>管理员信息</span>
        </div>
        <div class="nametable">
            <ul>
              <li class="item">
                  <p class="name">姓名 :</p>
                  <span class="info">陈乔峰</span>
              </li>
              <li class="item">
                  <p class="name">注册时间 :</p>
                  <span class="info">2019-10-10</span>
              </li>
              <li class="item">
                  <p class="name">管理员权限 :</p>
                  <span class="info">高级管理员</span>
              </li>
              <li class="item">
                  <p class="name">管理员ID :</p>
                  <span class="info">1010110</span>
              </li>
              <li class="item">
                  <p class="name">更改头像 :</p>
              </li>
            </ul>
             <el-row>
               <el-col :span="24">
                    <el-upload
                      class="avatar-uploader"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload">
                      <img v-if="imageUrl" :src="imageUrl" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
               </el-col>
             </el-row>
             <el-row>
               <el-col :span="24" class="box">
                      <i class="el-icon-platform-eleme"></i>
                     <span>广东省汕头市牛逼有限公司@版权：最高人民机构</span>
               </el-col>
             </el-row>
        </div>
  </div>
</template>

<script>
export default {
  name: 'runsite',
   data() {
      return {
        imageUrl: ''
      };
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
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
 .runsite >>> .avatar-uploader .el-upload
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    left:25%;
    top:0;
    .avatar-uploader-icon
      font-size: 20px;
      color: #8c939d;
      width: 100px;
      height: 100px;
      line-height: 100px;
      text-align: center;
    .avatar
      width: 100px;
      height: 100px;
      display: block;
  .runsite  
    padding:20px;
    width:50%;
    margin:50px auto;
    background-color:#fff;
    border-radius:6px;
    box-shadow:0 0 3px;
    .title
      text-align:center;
      line-height:40px;
      font-size:20px;
    .nametable 
      padding:10px;
      width:500px;
      height:450px;
      margin:20px 0 0 50px;
      border-radius:5px;
      .box
        color:#909399;
        font-size:8px;
        text-align:center;
        margin-top:50px;
      .item 
        height:60px;
        display:flex;
        line-height:50px;
        .name 
          width:100px;
          padding: 0 10px;
          font-size:15px;
          text-align:right;
          color:#303133;
        .info 
          font-size:13px;
          color:#606266;
</style>