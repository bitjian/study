<template>
  <div class="userlist">
      <!-- 头部面包屑组件 -->
       <user-bread>
        <template v-slot:dataManage>
             <el-breadcrumb-item>数据管理</el-breadcrumb-item>
             <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </template>
       </user-bread>
       <div class="usertable">
           <el-table
            :data="tableData"
            size="mini"
            max-height="614px"
            style="width: 100%;border:1px solid #eee;"
            :highlight-current-row ="true"
            >

            <el-table-column
              label="序号"
              align="center"
              width="50">
              <template slot-scope="scope">
                   {{ scope.$index+1 }}
              </template>
            </el-table-column>

             <el-table-column
              prop="user_id"
              label="用户ID"
              align="center"
              width="100">
            </el-table-column>

            <el-table-column
              prop="registe_time"
              label="注册日期"
              align="center"
              width="180">
            </el-table-column>
            
            <el-table-column
              prop="username"
              label="用户姓名"
              align="center"
              width="180">
            </el-table-column>
            
            <el-table-column
              prop="city"
              align="center"
              label="注册地址">
            </el-table-column>
          </el-table>
          <el-row>
            <el-col :span="24">
                <el-pagination
                  class="pagination"
                  :small="true"
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page.sync="pagination.page_index"
                  :page-sizes="pagination.pagesizes"
                  :page-size="pagination.pageSize"
                  :layout="pagination.pagelayout"
                  :total="pagination.pagetotal">
                </el-pagination>
            </el-col>
          </el-row>
       </div>
  </div>
</template>

<script>
import UserBread from '../../components/common/Bread'
export default {
  name: 'userlist',
   data() {
        return {
          tableData: [],
          tableDataArr:[],
          pagination:{
             page_index:1,
             pageSize:20,
             pagesizes:[5,10,15,20],
             pagelayout:"total, sizes, prev,pager,next,jumper",
             pagetotal:0
          }
        }
      },
   mounted () {
      this.getUserlist()
   },
   components:{
      UserBread
  },
  methods:{
      // 发送阿贾克斯
     async getUserlist () {
          let res = await this.$axios.getDataboard()
          this.tableDataArr = res.data
          this.getpagination()
        },
    getpagination() {
       this.pagination.page_index = 1;
       this.pagination.pageSize = 20;
       this.pagination.pagetotal = this.tableDataArr.length;
       this.tableData = this.tableDataArr.filter((item,index)=>{
           return index < this.pagination.pageSize
       })
    },
    //每一页显示多少条
    handleSizeChange(pagesize) {
        this.pagination.page_index = 1;
        this.pagination.pageSize = pagesize
        this.tableData = this.tableDataArr.filter((item,index)=>{
            return index < pagesize
        })
    },
    //当前第几页
    handleCurrentChange (page) {
        const index = this.pagination.pageSize * (page-1);
        const num = this.pagination.pageSize * page;
        const lable = [];
        for (let i = index; i < num; i++) {
            if (this.tableDataArr[i]) {
                lable.push(this.tableDataArr[i])
            }
        }
        this.tableData = lable;
    },
  }
}
</script>

<style lang="stylus" scoped>
  .userlist  >>> .el-table th
    background-color:#eee;
  .usertable >>> .el-table thead
    font-size:14px;
    color:#000;
    font-weight:bold;
   .usertable
    padding:20px;
    height:100%;
    .pagination 
     text-align:right;
     margin-top:10px;
</style>