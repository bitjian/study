<template>
  <div class="index">
     <el-container style= "border: 1px solid #eee">
        <!-- 左边导航  -->
  <el-aside width="230px">
    <el-menu
     background-color="rgb(50,64,87)"
     text-color="#fff"
     router
    >
      <el-menu-item index="/home">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>

      <el-submenu index="1">
        <template slot="title"><i class="el-icon-document"></i>数据管理</template>
          <el-menu-item index="/userlist">用户列表</el-menu-item>
          <el-menu-item index="/businesslist">商家列表</el-menu-item>
          <el-menu-item index="/foodlist">食品列表</el-menu-item>
          <el-menu-item index="/orderlist">订单列表</el-menu-item>
          <el-menu-item index="/runlist">管理员列表</el-menu-item>
      </el-submenu>


      <el-submenu index="2">
        <template slot="title"><i class="el-icon-plus"></i>添加数据</template>
          <el-menu-item index="/addshop">添加商铺</el-menu-item>
          <el-menu-item index="/addcommodity">添加商品</el-menu-item>
      </el-submenu>

      <el-submenu index="3">
        <template slot="title"><i class="el-icon-star-on"></i>图标</template>
          <el-menu-item index="userdistributed">用户分布</el-menu-item>
      </el-submenu>
      
      <el-submenu index="4">
        <template slot="title"><i class="el-icon-edit"></i>编辑</template>
          <el-menu-item index="/texteditor">文本编辑</el-menu-item>
      </el-submenu>

      <el-submenu index="5">
        <template slot="title"><i class="el-icon-s-tools"></i>设置</template>
          <el-menu-item index="/runsite">管理员设置</el-menu-item>
      </el-submenu>

      <el-submenu index="6">
        <template slot="title"><i class="el-icon-warning"></i>说明</template>
          <el-menu-item index="/explain">说明</el-menu-item>
      </el-submenu>

    </el-menu>
  </el-aside>
        <!-- 右边内容 -->
  <el-container>
     <div class="content">
       <keep-alive>
         <router-view></router-view>
       </keep-alive>
     </div>
  </el-container>

  </el-container> 
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return{
        index:''
    }
  },
  methods:{
    async getcurrent () {
       let res = await this.$axios.getCurrentCity()
          this.$store.commit('CurrentCity',{
              name:res.data.name,
              latitude:res.data.latitude,
              longitude:res.data.longitude
          })    
    }
  },
  mounted () {
     this.getcurrent()
  }
}
</script>

<style lang="stylus" scoped>
.index{
    width:100%;
    height:100%;
    .el-container{
      overflow-y:hidden
      height:100%;
      .el-aside{
        background-color:rgb(50,64,87);
        .el-menu{
          border-right:0 
          .el-menu-item:focus, .el-menu-item:hover{
            background-color:#eee !important;
           }      
         }
       }
   }
    .content{
        width:100%;
        height:100%;
        overflow:auto;
    }
}
</style>
