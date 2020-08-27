<template>
  <div>
    <div class="crumbs crumbs-register">
      <el-breadcrumb separator="/" class="register-title">
        <el-breadcrumb-item>
          <i class="el-icon-setting"></i>注册成功
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="userContent">
      <div class="eidt-success">
        <div class="show-success">
          <i class="el-icon-check"></i>&nbsp;&nbsp;
          <span>恭喜您，注册成功</span>
        </div>
        <div class="click-login">
          <a href="#" @click="handleCommand()">跳转登录</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {}
    };
  },
  methods: {
    handleCommand() {
      this.$router.push("/login");
    }
  }
};
</script>

<style>
.crumbs {
  margin-bottom: 0;
}
.crumbs-register {
  background-color: #324157;
  height: 50px;
  line-height: 50px;
}
.register-title {
  line-height: 50px;
  margin: 0 auto;
  width: 100px;
  font-size: 16px;
}
.userContent {
  width: 100%;
  margin: 0 auto;
  height: 500px;
}
.eidt-success {
  margin: 0 auto;
}
.eidt-success .show-success {
  width: 100%;
  height: 100%;
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  align-items: center;
}
.click-login {
  width: 100%;
  height: 100%;
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  align-items: center;
}
.eidt-success i {
  color: #67c23a;
}
.eidt-success i,
.eidt-success span {
  font-size: 30px;
  font-family: Microsoft YaHei;
}
</style>