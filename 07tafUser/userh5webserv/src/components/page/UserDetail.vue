<template>
  <div>
    <h3>用户详情</h3>
    <div class="info">
      <el-card class="box-card">
        <div
          v-for="userkey in Object.keys(userInfo)"
          :key="userkey"
          class="text item"
        >{{`${userkey}:${userInfo[userkey]}`}}</div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uid: "",
      userInfo: {}
    };
  },
  created() {
    this.uid = this.$route.query.uid;
    console.log(this.uid);
  },
  mounted() {
    this.init(this.uid);
  },
  methods: {
    init(uid) {
      this.$http
        .get("/api/user/getUserDetail", { params: { uid } })
        .then(res => {
          console.log(res);
          if (res.data.iRet === 0) {
            this.userInfo = res.data.userinfo;
            console.log(this.userInfo);
          } else {
            alert("获取用户信息失败");
          }
        })
        .then(err => {
          console.log(err);
          return false;
        });
    }
  }
};
</script>

<style scoped>
h3 {
  width: 100px;
  margin: 10px auto;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
.info {
  margin: 50px auto;
  width: 90%;
}

</style>>