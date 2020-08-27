<template>
  <div class="bread">
 <el-row>
    <el-col :span="21">
   <el-breadcrumb class="breadcrumb">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <slot name="dataManage"></slot>
   </el-breadcrumb>
   </el-col>
   <el-col :span="3">
       <div class="user_img">
         <el-avatar icon="el-icon-user-solid"></el-avatar>
       </div>
       <el-dropdown class="down" @command= "handleclick" trigger="click">
          <span class="el-dropdown-link">
            {{ username }}<i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="home">首页</el-dropdown-item>
            <el-dropdown-item command ="out">退出</el-dropdown-item>
          </el-dropdown-menu>
         </el-dropdown>
   </el-col>
   </el-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'bread',
  computed:{
     ...mapState(['username'])
  },
  methods:{
    handleclick (name) {
        switch(name) {
          case'home':
          this.gotoHome()
          break;
          case'out':
          this.gotoOut()
        }
    },
    //退到首页
    gotoHome() {
      this.$router.push('/home')
    },
    //退出系统
     gotoOut() {
      this.$confirm('此操作将退出系统, 是否继续?',  {
          title:'温馨提示',
          type: 'warning'
        }).then(() => {
           this.outStstem()
           this.$message({
           type: 'success',
            message:'退出成功'
          });
       }) 
     },
     async outStstem(){
       let res = await this.$axios.exitSystem()
       if (res.data.status == 1) {
           localStorage.removeItem('userinfo')
           localStorage.removeItem('cityinfo')
           this.$router.push('/login') 
       }
     }  
  }
}
</script>

<style lang="stylus" scoped>
  .bread
    height:100%;
    width:100%;
    .el-row
      padding:5px 0;
      overflow:hidden;
      background-color:rgb(239,242,247);
      .el-col
         height:50px;
         padding:5px 0;
         display:flex;
         .breadcrumb
          line-height:40px;
          padding:0 20px;
          font-size:14px;
          .user_img
            width:40px;
            height:40px;
            border-radius:50%;       
         .down 
           margin-left:10px; 
           line-height:40px;
           .el-dropdown-link
             cursor:pointer;
             font-size:12px;
           .el-icon--right
             font-size:14px;
</style>