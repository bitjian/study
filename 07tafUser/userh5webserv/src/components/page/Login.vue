<template>
  <div class="login-wrap">
    <div class="ms-title">登录管理系统</div>
    <div class="ms-login">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="0px"
        class="demo-ruleForm"
      >
        <div v-if="errorInfo">
          <span>{{errInfo}}</span>
        </div>
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="密码"
            v-model="ruleForm.password"
            @keyup.enter.native="submitForm('ruleForm')"
          ></el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </div>
        <p class="register" @click="handleCommand()">注册</p>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      errorInfo: false,
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  mounted() {},
  methods: {
    submitForm(formName) {
      const self = this;
      self.$refs[formName].validate(valid => {
        if (valid) {
          console.log(JSON.stringify(self.ruleForm));
          self.$http
            .post("/api/user/login", self.ruleForm)
            .then(response => {
              console.log(response);
              const { data } = response;
              console.log(data);
              if (data.iRet == -3) {
                self.errorInfo = true;
                self.errInfo = "该用户不存在";
                console.log("该用户不存在");
              } else if (data.iRet == 1) {
                console.log("密码错误");
                self.errorInfo = true;
                self.errInfo = data.message;
              } else if (data.iRet == 0) {
                sessionStorage.setItem("ms_username", self.ruleForm.username);
                self.$router.push("/userList");
              }
            })
            .then(error => {
              console.log(error);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleCommand() {
      this.$router.push("/register");
    }
  }
};
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
}
.ms-title {
  position: absolute;
  top: 50%;
  width: 100%;
  margin-top: -230px;
  text-align: center;
  font-size: 30px;
  color: #fff;
}
.ms-login {
  position: absolute;
  width: 80%;
  height: 235px;
  left: 0;
  bottom: 0;
  right: 0;
  top: 0;
  margin: auto;
  border-radius: 5px;
}
.ms-login span {
  color: red;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
}
.code {
  width: 112px;
  height: 35px;
  border: 1px solid #ccc;
  float: right;
  border-radius: 2px;
}
.validate-code {
  width: 136px;
  float: left;
}
.register {
  font-size: 14px;
  line-height: 30px;
  color: #999;
  cursor: pointer;
  float: right;
}
</style>