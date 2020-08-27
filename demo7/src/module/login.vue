<template>
  <div class="login">
       <div class="logintable">
         <div class="title">elm后台管理系统</div>
         <div class="content">
      <el-form :model="loginForm" status-icon :rules="rules" ref="ruleForm" label-width="60px">
        <el-form-item label="账号" prop="user_name">
            <el-input v-model="loginForm.user_name" autocomplete="off" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="loginForm.password" autocomplete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')" class="submitbtn">提交</el-button>
        </el-form-item>
    </el-form>
       </div>
     </div>
  </div>
</template>

<script>
export default {
  name: 'login',
   data() {
      return {
        loginForm: {
          user_name: '',
          password: '',
        },
        rules: {
          user_name: [
            {required:true,message:'账号不能为空',trigger:'blur'},
            { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
          ],
          password: [
            {required:true,message:'密码不能为空',trigger:'blur'},
            { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
       submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
             this.submitloginInfo()
          }
        });
      },
      async submitloginInfo () {
        let res = await this.$axios.loginInfo(this.loginForm)
        console.log(res)
         if (res.data.status == 1) {
              this.$message({
                 type:'success',
                 message:'登录成功'
              })
              this.$store.commit('getUserInfo',this.loginForm.user_name)
              this.$router.push('/index')
         }else{
            this.$message({
                 type:'warning',
                 message:'网络异常，请稍后重试'
             })
         }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .login 
    width:100%;
    height:100%;
    background-color:rgb(50,64,87);
    padding-top:200px;        
    .logintable 
      width:400px;
      height:300px;
      text-align:center;
      margin:0 auto;
      .title 
         color:#fff;
         font-size:25px;
         margin-bottom:20px;
      .content 
        width:360px;
        background-color:#fff;
        padding:20px;
        border-radius:5px;
        .submitbtn
          width:100%;
</style>