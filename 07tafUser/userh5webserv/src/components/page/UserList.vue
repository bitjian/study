<template>
  <div class="userbox">
    <h3>用户列表</h3>
    <div
      class="userlist"
      v-infinite-scroll="load"
      infinite-scroll-disabled="loading"
      style="overflow:auto"
    >
      <div class="userinfo" @click="showInfo(u.uid)" v-for="u in userData" :key="u.uid">
        <span>用户名：{{u.username}}</span>
        <span>修改时间：{{u.updateTime}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Util from "../../utils/utils";
export default {
  data() {
    return {
      loading: false,
      userData: [], //所有用户信息数组
      userInfo: {},
      page: {
        // 分页属性
        pageSize: 10, //每页条数,  默认10条
        pageNum: 1
      }
    };
  },
  created() {},
  mounted() {
    this.init(); //页面内初始化数据
  },
  methods: {
    init() {
      this.userData = [];
      let { pageNum, pageSize } = this.page;
      // 获取用户列表
      this.$http
        .get("/api/user/getUserList", { params: { pageNum, pageSize } })
        .then(res => {
          let { iRet, message, data } = res.data;
          this.page.totalRecords = data.total; //总条数
          if (iRet === 0) {
            const userArray = data.list;
            this.userData = userArray;
            console.log(this.userData);
          } else {
            alert(message);
          }
        });
    },
    load() {
      this.loading = true;
      setTimeout(() => {
        this.page.pageNum++;
        this.getUserList(true);
      }, 500);
    },
    showInfo(uid) {
      this.$router.push({ path: "/userDetail", query: { uid } });
    },
    getUserList(flag) {
      // this.loading = false;
      const { pageSize, pageNum } = this.page;
      var params = {
        pageNum,
        pageSize
      };
      this.$http.get("/api/user/getUserList", { params }).then(res => {
        let { iRet, message, data } = res.data;
        this.page.totalRecords = data.total; //总条数
        if (flag) {
          if (iRet === 0) {
            const userArray = data.list;
            this.userData = this.userData.concat(userArray);
          } else {
            alert(message);
          }
          if (data.total === 0) {
            console.log("禁用");
            this.loading = true;
          } else {
            console.log("不禁用");
            this.loading = false;
          }
        } else {
          this.goodList = res.result.list;
          this.busy = false;
        }
      });
    }
  }
};
</script>


<style scoped>
.userbox {
  width: 100%;
  height: 100%;
}
h3 {
  width: 100px;
  height: 30px;
  margin: 0 auto;
}
.userinfo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  border: 1px solid #ccc;
  margin: 5px;
  padding: 0 5px;
  line-height: 30px;
  height: 80px;
}
.userlist {
  width: 100%;
  height: calc(100vh - 30px);
  /* height: 100%; */
}
.userinfo:hover {
  background-color: #f55;
}
</style>